#!/usr/bin/env node

/**
 * apply-gap-report.js  —  Stage 3 of the ZK Component Reference enrichment plan
 * (tasks/zk-component-ref-enrichment-plan.md).
 *
 * Deterministic, NO-LLM, gated, idempotent. Turns an annotated Gap Report
 * (tasks/component-gaps/<component>.md) into edits on zk_component_ref/<component>.md.
 *
 *   1. Parse front matter + every item: checkbox state, the <!-- gap/norm ... --> block,
 *      and the indented fenced snippet.
 *   2. Apply only items checked [x]; ignore [ ].
 *   2a. PROVENANCE GATE (Graphify enforcement): every checked `gap` of a factual type
 *       (property/event/mold) MUST carry a non-empty graphify= + resolved=. Missing →
 *       refuse to apply that item and list it under "blocked: no Graphify provenance".
 *   3. Patch the doc: insert each accepted snippet into its target section (creating the
 *      section in template order if absent); apply accepted `norm` items (rename headings
 *      to canonical H2 casing, remove forbidden sections, reorder to template order).
 *   4. Idempotent: record applied ids in .applied.json (skip on re-run), rejected (unchecked)
 *      ids in .rejected.json.
 *   5. Post-apply validation: run `npm run lint-docs` + `npm run validate-links` unless --no-validate.
 *
 * Usage:
 *   node apply-gap-report.js [--dry-run] [--component <name>] [--no-validate] [--report]
 *
 *   --dry-run       Show the unified diff without writing.
 *   --component <n> Apply only that component's report (default: all reports present).
 *   --no-validate   Skip the post-apply lint/link validation.
 *   --report        Print the per-item decision table (applied / skipped / blocked).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const REPORT_DIR = path.join(ROOT, 'tasks', 'component-gaps');
const DOC_DIR = path.join(ROOT, 'zk_component_ref');
const APPLIED = path.join(REPORT_DIR, '.applied.json');
const REJECTED = path.join(REPORT_DIR, '.rejected.json');
const PROGRESS = path.join(REPORT_DIR, '_progress.md');

// Canonical section order + casing (mirrors zk_component_ref/_TEMPLATE.md).
const CANON_ORDER = [
  'Employment/Purpose', 'Example', 'Properties', 'Supported Events',
  'Supported Molds', 'Supported Children', 'Inherited Functions',
];
const CANON_BY_LC = new Map(CANON_ORDER.map((s) => [s.toLowerCase(), s]));
const FORBIDDEN_SECTIONS = new Set(['version history']);

const FACTUAL = new Set(['property', 'event', 'mold']);

// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const a = { dryRun: false, component: null, validate: true, report: false };
  for (let i = 2; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--dry-run') a.dryRun = true;
    else if (t === '--component') a.component = argv[++i];
    else if (t === '--no-validate') a.validate = false;
    else if (t === '--report') a.report = true;
    else if (t === '--help' || t === '-h') { printHelp(); process.exit(0); }
  }
  return a;
}
function printHelp() {
  console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(2, 35).join('\n').replace(/^ \*?/gm, ''));
}

function loadJson(p) { return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {}; }
function saveJson(p, o) { fs.writeFileSync(p, JSON.stringify(o, null, 2)); }

// ---------------------------------------------------------------------------
// Gap-report parsing
// ---------------------------------------------------------------------------

function parseReport(text) {
  const fmM = /^---\n([\s\S]*?)\n---\n/.exec(text);
  const fm = {};
  if (fmM) for (const line of fmM[1].split('\n')) {
    const m = /^(\w+):\s*(.*)$/.exec(line);
    if (m) fm[m[1]] = m[2].trim();
  }
  const body = fmM ? text.slice(fmM[0].length) : text;
  const lines = body.split('\n');

  const items = [];
  for (let i = 0; i < lines.length; i++) {
    const cm = /^<!--\s*(gap|norm)\s+(.*?)\s*-->$/.exec(lines[i]);
    if (!cm) continue;
    const kind = cm[1];
    const attrs = parseAttrs(cm[2]);
    // next non-blank line should be the checkbox
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    const cbM = /^-\s*\[([ xX])\]\s*(.*)$/.exec(lines[j] || '');
    if (!cbM) continue;
    const checked = cbM[1].toLowerCase() === 'x';
    // snippet: subsequent indented (>=4 spaces) lines
    const snippetLines = [];
    let k = j + 1;
    for (; k < lines.length; k++) {
      if (/^<!--\s*(gap|norm)\s/.test(lines[k]) || /^##?\s/.test(lines[k])) break;
      if (lines[k].trim() === '') { snippetLines.push(''); continue; }
      if (/^ {4,}/.test(lines[k])) snippetLines.push(lines[k].replace(/^ {4,6}/, ''));
      else break;
    }
    const snippet = snippetLines.join('\n').trim();
    items.push({ kind, attrs, checked, label: cbM[2].trim(), snippet });
  }
  return { fm, items };
}

function parseAttrs(s) {
  const attrs = {};
  // Tolerate escaped quotes inside quoted values (e.g. graphify="jq '...id==\"x\"...'").
  const re = /(\w+)="((?:\\.|[^"\\])*)"|(\w+)=([^\s"]+)/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m[1] !== undefined) attrs[m[1]] = m[2].replace(/\\"/g, '"');
    else attrs[m[3]] = m[4];
  }
  return attrs;
}

// ---------------------------------------------------------------------------
// Doc model: split into a preamble + ordered sections by heading
// ---------------------------------------------------------------------------

function splitSections(doc) {
  const lines = doc.split('\n');
  // front matter passthrough
  let start = 0;
  let preamble = [];
  if (lines[0] === '---') {
    let e = 1; while (e < lines.length && lines[e] !== '---') e++;
    preamble = lines.slice(0, e + 1);
    start = e + 1;
  }
  const sections = []; // { level, title, body[] }
  let cur = { level: 0, title: null, body: [] }; // intro (API links etc.)
  for (let i = start; i < lines.length; i++) {
    // ONLY H1 (`# `) is a top-level section boundary; H2/H3 (property names,
    // sub-examples) stay inside their section body (CR-L1: keep current levels).
    const hM = /^#\s+(.*)$/.exec(lines[i]);
    if (hM && hM[1].trim()) {
      sections.push(cur);
      cur = { level: 1, title: hM[1].trim(), body: [] };
    } else {
      cur.body.push(lines[i]);
    }
  }
  sections.push(cur);
  return { preamble, sections };
}

function rebuild(model) {
  const out = [];
  if (model.preamble.length) out.push(model.preamble.join('\n'));
  for (const s of model.sections) {
    if (s.title === null) { out.push(s.body.join('\n')); continue; }
    out.push(`${'#'.repeat(s.level)} ${s.title}`);
    out.push(s.body.join('\n'));
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '') + '\n';
}

function findSection(model, canonTitle) {
  const lc = canonTitle.toLowerCase();
  return model.sections.find((s) => s.title && s.title.toLowerCase() === lc);
}

function ensureSection(model, canonTitle) {
  let sec = findSection(model, canonTitle);
  if (sec) return sec;
  sec = { level: 1, title: canonTitle, body: [''] }; // new top sections are H1 (CR-L1)
  // insert in template order
  const order = CANON_ORDER.indexOf(canonTitle);
  let insertAt = model.sections.length;
  for (let i = 0; i < model.sections.length; i++) {
    const t = model.sections[i].title;
    if (!t) continue;
    const oi = CANON_ORDER.indexOf(CANON_BY_LC.get(t.toLowerCase()) || t);
    if (oi > order && oi !== -1) { insertAt = i; break; }
  }
  model.sections.splice(insertAt, 0, sec);
  return sec;
}

// ---------------------------------------------------------------------------
// Norm operations (deterministic, conservative)
// ---------------------------------------------------------------------------

function applyNorms(model, norms) {
  const did = [];
  const checked = norms.filter((n) => n.checked);
  if (!checked.length) return did;
  // (1) Casing-only normalization of known section headings — NEVER change the level (CR-L1).
  for (const s of model.sections) {
    if (!s.title) continue;
    const canon = CANON_BY_LC.get(s.title.toLowerCase());
    if (canon && s.title !== canon) { s.title = canon; did.push(`normalize heading casing → ${canon}`); }
  }
  // (2) Remove forbidden sections (e.g. Version History).
  const before = model.sections.length;
  model.sections = model.sections.filter((s) => !(s.title && FORBIDDEN_SECTIONS.has(s.title.toLowerCase())));
  if (model.sections.length !== before) did.push('remove forbidden section(s) (e.g. Version History)');
  // (3) Reorder is NOT auto-applied: a blunt template-order sort would relocate optional
  //     feature sections (e.g. "File Upload") and risks mangling a hand-authored page.
  //     Report it as a manual action so the human reorders deliberately (CR-L1: keep format).
  const reorders = checked.filter((n) => n.attrs.type === 'reorder');
  if (reorders.length) did.push(`reorder requested (${reorders.length}) — NOT auto-applied, do manually`);
  return did;
}

// ---------------------------------------------------------------------------
// Apply one report
// ---------------------------------------------------------------------------

function applyReport(name, args, applied, rejected) {
  const reportPath = path.join(REPORT_DIR, `${name}.md`);
  const text = fs.readFileSync(reportPath, 'utf8');
  const { fm, items } = parseReport(text);
  const mdRel = fm.md_path || `zk_component_ref/${name}.md`;
  const mdPath = path.join(ROOT, mdRel);
  const decisions = [];
  const alreadyApplied = new Set(applied[name] || []);

  let doc = fs.existsSync(mdPath) ? fs.readFileSync(mdPath, 'utf8') : `---\ntitle: "${name}"\n---\n`;
  const model = splitSections(doc);

  const norms = [];
  for (const it of items) {
    const id = it.attrs.id || '(no-id)';
    if (it.kind === 'norm') { norms.push(it); continue; }

    if (!it.checked) { decisions.push({ id, status: 'skipped (unchecked)' }); rejected[name] = [...new Set([...(rejected[name] || []), id])]; continue; }
    if (alreadyApplied.has(id)) { decisions.push({ id, status: 'skipped (already applied)' }); continue; }

    // 2a. provenance gate
    if (FACTUAL.has(it.attrs.type)) {
      if (!it.attrs.graphify || !it.attrs.resolved) {
        decisions.push({ id, status: 'BLOCKED: no Graphify provenance' });
        continue;
      }
    }
    const canon = (it.attrs.section || '## Properties').replace(/^#+\s*/, '').trim();
    const sec = ensureSection(model, CANON_BY_LC.get(canon.toLowerCase()) || canon);
    // append snippet to section body
    const body = sec.body.join('\n').replace(/\s+$/, '');
    sec.body = (body + '\n\n' + it.snippet + '\n').split('\n');
    decisions.push({ id, status: 'applied', section: sec.title });
    applied[name] = [...new Set([...(applied[name] || []), id])];
  }

  const normDid = applyNorms(model, norms);
  for (const n of norms.filter((x) => x.checked)) applied[name] = [...new Set([...(applied[name] || []), n.attrs.id])];

  const newDoc = rebuild(model);
  const changed = newDoc !== doc;

  if (args.dryRun) {
    printDiff(mdRel, doc, newDoc);
  } else if (changed) {
    fs.mkdirSync(path.dirname(mdPath), { recursive: true });
    fs.writeFileSync(mdPath, newDoc);
  }
  return { decisions, normDid, changed };
}

function printDiff(label, before, after) {
  const a = before.split('\n'), b = after.split('\n');
  console.log(`\n--- ${label} (before) / +++ (after) ---`);
  // minimal line diff
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (j < b.length && !a.includes(b[j], i)) { console.log('+ ' + b[j]); j++; }
    else if (i < a.length) { console.log('- ' + a[i]); i++; }
    else { console.log('+ ' + b[j]); j++; }
  }
}

// ---------------------------------------------------------------------------
// Progress tracker update (Applied + Lint/links columns)
// ---------------------------------------------------------------------------

function updateProgress(appliedNames, lintPass) {
  if (!fs.existsSync(PROGRESS)) return;
  let txt = fs.readFileSync(PROGRESS, 'utf8');
  for (const name of appliedNames) {
    const rowRe = new RegExp(`^(\\|\\s*${name}\\s*\\|[^\\n]*)$`, 'm');
    txt = txt.replace(rowRe, (row) => {
      const cells = row.split('|');
      // columns: '' name batch facts gap annotated applied lint notes ''
      if (cells.length >= 9) {
        cells[6] = ' ✅ '; // Applied (S3)
        cells[7] = lintPass ? ' ✅ ' : ' ❌ ';
      }
      return cells.join('|');
    });
  }
  fs.writeFileSync(PROGRESS, txt);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = parseArgs(process.argv);
  if (!fs.existsSync(REPORT_DIR)) { console.error('No reports dir; run Stage 2 first.'); process.exit(1); }
  let names = args.component ? [args.component]
    : fs.readdirSync(REPORT_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_')).map((f) => f.replace(/\.md$/, ''));
  names = names.filter((n) => fs.existsSync(path.join(REPORT_DIR, `${n}.md`)));
  if (!names.length) { console.error('No gap reports found.'); process.exit(1); }

  const applied = loadJson(APPLIED);
  const rejected = loadJson(REJECTED);
  const touched = [];
  let blocked = 0;

  for (const name of names) {
    const { decisions, normDid, changed } = applyReport(name, args, applied, rejected);
    if (changed && !args.dryRun) touched.push(name);
    const blk = decisions.filter((d) => d.status.startsWith('BLOCKED'));
    blocked += blk.length;
    if (args.report || blk.length) {
      console.log(`\n## ${name}`);
      for (const d of decisions) console.log(`  - ${d.id}: ${d.status}${d.section ? ' → ' + d.section : ''}`);
      if (normDid.length) console.log(`  - norms: ${normDid.join('; ')}`);
    }
  }

  if (blocked) console.log(`\n⚠ ${blocked} item(s) blocked: no Graphify provenance (Stage 3 gate #2a).`);

  if (args.dryRun) { console.log('\n(dry-run: no files written)'); return; }

  saveJson(APPLIED, applied);
  saveJson(REJECTED, rejected);

  let lintPass = true;
  if (args.validate && touched.length) {
    try {
      console.log('\nRunning lint-docs…');
      execSync('npm run lint-docs', { cwd: ROOT, stdio: 'inherit' });
    } catch (e) { lintPass = false; }
    try {
      console.log('\nRunning validate-links…');
      execSync('npm run validate-links', { cwd: ROOT, stdio: 'inherit' });
    } catch (e) { lintPass = false; }
  }
  updateProgress(touched, lintPass);
  console.log(`\nApplied to ${touched.length} doc(s): ${touched.join(', ') || '(none)'}`);
}

main();
