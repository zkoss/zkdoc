#!/usr/bin/env node
/*
 * classify-thin.js — P3 Phase 0 of the GSC indexing improvement plan.
 *
 * READ-ONLY. Turns the misleading "N pages are thin" word-count into an honest,
 * structure-aware inventory so we target real stubs, not measurement artifacts.
 *
 * For every doc page it computes a meaningful prose word count AND structural
 * signals, then assigns exactly one category:
 *   nav-hub            index.md landing pages (rendered via nav_list)
 *   intentional-noindex  already has noindex:true or sitemap:false
 *   code-sample        little prose but a substantial code block (legit reference)
 *   structured-ref     config_ref-style entry: Property/Default/Syntax markers
 *   fragment-cluster   pages under eval_guide/ (the fragmentation problem)
 *   prose-stub         genuinely thin prose page — the real enrich/merge/noindex target
 *   ok                 clears the prose threshold; not a P3 concern
 *
 * Writes NOTHING except the report (default tasks/p3-inventory.md, under tasks/
 * which is untracked). It never touches any .md content or navigation.yml.
 *
 * Usage:
 *   node tool/cleanup/classify-thin.js                       # -> tasks/p3-inventory.md
 *   node tool/cleanup/classify-thin.js --report <file.md>
 *   node tool/cleanup/classify-thin.js --threshold 100       # prose-stub cutoff (default 100)
 */

const fs = require('fs');
const path = require('path');
const { DOCS_DIRECTORIES } = require('../lint/rules/docs-dirs.js');

const REPO = path.resolve(__dirname, '..', '..');
const args = process.argv.slice(2);
const reportIdx = args.indexOf('--report');
const reportPath = reportIdx >= 0 ? args[reportIdx + 1] : 'tasks/p3-inventory.md';
const thrIdx = args.indexOf('--threshold');
const THRESHOLD = thrIdx >= 0 ? parseInt(args[thrIdx + 1], 10) : 100;

// eval_guide is NOT in docs-dirs.js (P1/P2 never touched it) — include it here.
const EXTRA_DIRS = ['eval_guide'];

// --- helpers ---------------------------------------------------------------

function walk(dir, acc) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.isFile() && e.name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

function splitFrontMatter(text) {
  if (!text.startsWith('---\n')) return { fm: '', body: text, hasFm: false };
  const end = text.indexOf('\n---', 4);
  if (end < 0) return { fm: '', body: text, hasFm: false };
  const bodyStart = text.indexOf('\n', end + 4) + 1;
  return { fm: text.slice(4, end + 1), body: text.slice(bodyStart), hasFm: true };
}

// Meaningful prose words: strip code, liquid, comments, links->text, md punctuation.
function proseWords(body) {
  const t = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\{%[^%]*%\}/g, ' ')
    .replace(/\{\{[^}]*\}\}/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[#>*_|`\-]/g, ' ');
  return t.split(/\s+/).filter((w) => /[a-zA-Z0-9]/.test(w) && w.length > 1).length;
}

function largestCodeBlockLines(body) {
  let max = 0;
  const re = /```[\s\S]*?```/g;
  let m;
  while ((m = re.exec(body))) {
    const lines = m[0].split('\n').length - 2; // drop the two fence lines
    if (lines > max) max = lines;
  }
  return max;
}

function classify(file, text) {
  const { fm, body, hasFm } = splitFrontMatter(text);
  const words = proseWords(body);
  const rel = path.relative(REPO, file);
  const base = path.basename(file);

  const hasTable = /^\s*\|.*\|/m.test(body);
  const codeLines = largestCodeBlockLines(body);
  const isStructured = /^\s*\*\*(Property|Syntax|Default|Scope|Type)\s*:?\*\*/im.test(body)
    || /^\s*(Default|Range|Syntax|Property|Scope|Type)\s*:/im.test(body);
  const noindex = /^\s*noindex\s*:\s*true/im.test(fm) || /^\s*sitemap\s*:\s*false/im.test(fm);
  const inEvalGuide = rel.startsWith('eval_guide/') || rel.includes('/eval_guide/');

  let category;
  if (base === 'index.md') category = 'nav-hub';
  else if (noindex) category = 'intentional-noindex';
  else if (inEvalGuide) category = 'fragment-cluster';
  else if (words <= THRESHOLD && codeLines >= 8) category = 'code-sample';
  else if (words <= THRESHOLD && (isStructured || hasTable)) category = 'structured-ref';
  else if (words <= THRESHOLD) category = 'prose-stub';
  else category = 'ok';

  return { rel, words, codeLines, hasTable, isStructured, hasFm, category };
}

// --- run -------------------------------------------------------------------

const dirs = [...DOCS_DIRECTORIES.map((d) => path.resolve(__dirname, '../lint', d)), ...EXTRA_DIRS.map((d) => path.resolve(REPO, d))];
const rows = [];
for (const dir of dirs) for (const f of walk(dir, [])) rows.push(classify(f, fs.readFileSync(f, 'utf8')));
rows.sort((a, b) => a.rel.localeCompare(b.rel));

const ORDER = ['prose-stub', 'fragment-cluster', 'structured-ref', 'code-sample', 'nav-hub', 'intentional-noindex', 'ok'];
const byCat = {};
for (const r of rows) (byCat[r.category] = byCat[r.category] || []).push(r);

// --- report ----------------------------------------------------------------

let out = `# P3 thin-page inventory (READ-ONLY)\n\n`;
out += `Prose-stub threshold: ≤ ${THRESHOLD} meaningful words. Total pages scanned: ${rows.length}.\n\n`;
out += `## Summary by category\n\n| category | count | meaning |\n|---|---|---|\n`;
const MEANING = {
  'prose-stub': '**Real P3 target** — genuinely thin prose; enrich / merge / noindex',
  'fragment-cluster': '**Real P3 target** — eval_guide fragments to consolidate',
  'structured-ref': 'Concise-by-design reference (Property/Default/Syntax/table) — usually LEAVE',
  'code-sample': 'Little prose but a real code block — legitimate, leave',
  'nav-hub': 'index.md navigation gateway — leave',
  'intentional-noindex': 'Already noindex/sitemap:false — already handled',
  'ok': 'Clears the prose threshold — not a P3 concern',
};
for (const c of ORDER) if (byCat[c]) out += `| ${c} | ${byCat[c].length} | ${MEANING[c]} |\n`;

// per-book breakdown for the two real targets
out += `\n## Real targets by book\n\n| book | prose-stub | fragment-cluster |\n|---|---|---|\n`;
const bookOf = (rel) => rel.split('/')[0];
const books = {};
for (const r of rows) {
  if (r.category !== 'prose-stub' && r.category !== 'fragment-cluster') continue;
  books[bookOf(r.rel)] = books[bookOf(r.rel)] || { 'prose-stub': 0, 'fragment-cluster': 0 };
  books[bookOf(r.rel)][r.category]++;
}
for (const [b, s] of Object.entries(books).sort((a, c) => (c[1]['prose-stub'] + c[1]['fragment-cluster']) - (a[1]['prose-stub'] + a[1]['fragment-cluster']))) {
  out += `| ${b} | ${s['prose-stub'] || ''} | ${s['fragment-cluster'] || ''} |\n`;
}

// detailed listings for the actionable categories
for (const c of ['prose-stub', 'fragment-cluster']) {
  out += `\n## ${c} — ${(byCat[c] || []).length} pages\n\n| page | words | fm? | note |\n|---|---|---|---|\n`;
  for (const r of byCat[c] || []) {
    const note = [r.hasTable ? 'table' : '', r.codeLines ? `code:${r.codeLines}L` : '', r.hasFm ? '' : 'NO-FM'].filter(Boolean).join(' ');
    out += `| ${r.rel} | ${r.words} | ${r.hasFm ? 'y' : 'n'} | ${note} |\n`;
  }
}

fs.writeFileSync(path.resolve(REPO, reportPath), out, 'utf8');

// stdout summary
console.log(`READ-ONLY scan — wrote ${reportPath}`);
console.log(`Total pages: ${rows.length}  (prose-stub threshold ≤${THRESHOLD} words)\n`);
for (const c of ORDER) if (byCat[c]) console.log(`  ${c.padEnd(20)} ${String(byCat[c].length).padStart(4)}`);
console.log(`\nReal P3 targets: prose-stub=${(byCat['prose-stub'] || []).length}, fragment-cluster=${(byCat['fragment-cluster'] || []).length}`);
