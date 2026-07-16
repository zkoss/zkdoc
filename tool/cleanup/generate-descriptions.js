#!/usr/bin/env node
/*
 * generate-descriptions.js — P2 of the GSC indexing improvement plan.
 *
 * Gives each page a UNIQUE front-matter `description:` so pages stop sharing
 * their book-level default (a near-duplicate-metadata signal that feeds
 * "Crawled - currently not indexed"). The theme's _includes/seo.html renders
 * page.description into <meta name="description"> / og:description /
 * twitter:description; without a page value it falls back to the book default
 * in _config.yml, so today ~all pages in a book share one description.
 *
 * The description is composed mechanically and deterministically:
 *   "<title>: <first real prose paragraph>", cleaned of Markdown/Liquid and
 *   trimmed to <= ~155 chars at a sentence or word boundary.
 * Pages that already have a `description:` are left untouched.
 *
 * Usage (run one book at a time so the tone can be reviewed):
 *   node tool/cleanup/generate-descriptions.js zk_config_ref            # dry-run
 *   node tool/cleanup/generate-descriptions.js zk_config_ref --write     # apply
 *   node tool/cleanup/generate-descriptions.js zk_config_ref --report <file.md>
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const bookArg = args.find((a) => !a.startsWith('--'));
const reportIdx = args.indexOf('--report');
const reportPath = reportIdx >= 0 ? args[reportIdx + 1] : null;

if (!bookArg) {
  console.error('Usage: node generate-descriptions.js <bookDir> [--write] [--report <file>]');
  process.exit(1);
}

const REPO = path.resolve(__dirname, '..', '..');
const bookDir = path.resolve(REPO, bookArg);
const MAX = 160;
const TARGET = 155;

// --- helpers ---------------------------------------------------------------

function parseFrontMatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---', 4);
  if (end < 0) return null;
  const block = text.slice(4, end + 1);
  const bodyStart = text.indexOf('\n', end + 4) + 1;
  return { block, bodyStart, endMarker: end };
}

function getTitle(block) {
  const m = /^title:\s*(.+)$/m.exec(block);
  if (!m) return null;
  return m[1].trim().replace(/^["']|["']$/g, '').trim();
}

// Strip Markdown/Liquid to plain prose.
function toPlainText(s) {
  return s
    .replace(/<!--[\s\S]*?-->/g, '')        // HTML comments
    .replace(/\{%[^%]*%\}/g, '')            // {% include ... %}
    .replace(/\{\{[^}]*\}\}/g, '')          // {{ site.baseurl }}
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // [text](url) -> text
    .replace(/<https?:\/\/[^>\s]+>/g, '')   // <url> autolinks (legacy wiki)
    .replace(/`([^`]*)`/g, '$1')            // `code` -> code
    .replace(/\*\*([^*]+)\*\*/g, '$1')      // bold
    .replace(/\*([^*]+)\*/g, '$1')          // italic
    .replace(/\\([|[\]<>])/g, '$1')         // unescape \| \[ \] \< \>
    .replace(/\s+/g, ' ')
    .trim();
}

// Is this source line the start/continuation of real prose (not syntax,
// code, markers, tables, lists, headings, or Liquid)?
function isProse(line) {
  const t = line.trim();
  if (t === '') return false;
  if (/^#{1,6}\s/.test(t)) return false;   // heading
  if (t.startsWith('```')) return false;   // code fence
  if (t.startsWith('**')) return false;    // **Syntax:** / **Property:**
  if (t.startsWith('`')) return false;     // `[Required]`, property name
  if (t.startsWith('[')) return false;     // link-led line (e.g. wrapped Java/JS API bullet)
  if (/^[-*|>]/.test(t)) return false;     // list / table / quote
  if (t.startsWith('{%') || t.startsWith('{{')) return false; // Liquid
  if (t.startsWith('<!--')) return false;  // HTML comment
  if (/^\[(Required|Optional|Default)/i.test(t)) return false; // bare marker
  if (/^(Default|Range|Since|Property|Syntax|Scope|Type)\s*:/i.test(t)) return false; // metadata line
  return true;
}

// A started paragraph continues across hard-wrapped lines; it ends only at a
// blank line or a clear block boundary. Continuation is more permissive than
// start detection because a wrapped line may begin with inline code (`x`) or a
// link ([x]) mid-sentence — those must NOT end the paragraph.
function stopsParagraph(line) {
  const t = line.trim();
  if (t === '') return true;
  if (/^#{1,6}\s/.test(t)) return true;      // heading
  if (t.startsWith('```')) return true;      // code fence
  if (t.startsWith('**')) return true;       // **Label:**
  if (/^[|>]/.test(t)) return true;          // table / blockquote
  if (/^[-*]\s/.test(t)) return true;        // list item
  if (t.startsWith('{%') || t.startsWith('{{')) return true; // Liquid block
  if (/^(Default|Range|Since|Property|Syntax|Scope|Type)\s*:/i.test(t)) return true;
  return false;
}

// Collect the first prose paragraph from the body, skipping code fences.
function firstParagraph(body) {
  const lines = body.split('\n');
  let inFence = false;
  const para = [];
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('```')) { inFence = !inFence; continue; }
    if (inFence) continue;
    if (para.length === 0) {
      if (isProse(line)) para.push(t);
    } else {
      if (stopsParagraph(line)) break;
      para.push(t);
    }
  }
  return toPlainText(para.join(' '));
}

// Trim to <= MAX chars, preferring a sentence end, else a word boundary.
function trimTo(s) {
  if (s.length <= MAX) return s;
  const window = s.slice(0, TARGET);
  const lastStop = Math.max(window.lastIndexOf('. '), window.lastIndexOf('! '), window.lastIndexOf('? '));
  if (lastStop >= 60) return s.slice(0, lastStop + 1); // keep the punctuation
  const lastSpace = window.lastIndexOf(' ');
  return (lastSpace >= 60 ? s.slice(0, lastSpace) : window).replace(/[.,;:\s]+$/, '') + '…';
}

function compose(title, paraRaw) {
  const para = (paraRaw || '').replace(/^[^\w]+/, '').trim(); // drop leading stray symbols
  const meaningful = para.replace(/[^a-zA-Z0-9]/g, '').length;
  if (!para || meaningful < 20) return { text: `${title}.`, flag: 'NO_BODY' };
  // Residual markup (legacy MediaWiki links, URLs, Liquid) → don't ship garbage.
  if (/[[\]{}<>|]|https?:\/\//.test(para)) return { text: `${title}.`, flag: 'NEEDS_REVIEW' };
  // Avoid "Title: Title..." echo when the paragraph already opens with the title.
  const joined = para.toLowerCase().startsWith(title.toLowerCase())
    ? para
    : `${title}: ${para}`;
  return { text: trimTo(joined), flag: '' };
}

function yamlEscape(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// --- run -------------------------------------------------------------------

function walkMd(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMd(p, acc);
    else if (entry.isFile() && entry.name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

const files = walkMd(bookDir, []).map((p) => path.relative(bookDir, p)).sort();
const rows = [];
let skippedHave = 0;
let skippedNoFm = 0;

for (const name of files) {
  const abs = path.join(bookDir, name);
  const text = fs.readFileSync(abs, 'utf8');
  const fm = parseFrontMatter(text);
  if (!fm) { skippedNoFm++; continue; }
  if (/^description:\s*\S/m.test(fm.block)) { skippedHave++; continue; }
  const title = getTitle(fm.block);
  if (!title) { skippedNoFm++; continue; }

  const body = text.slice(fm.bodyStart);
  const { text: desc, flag } = compose(title, firstParagraph(body));
  rows.push({ name, abs, title, desc, len: desc.length, flag, fm, text });
}

// Apply — only clean, non-flagged descriptions are written; flagged pages
// (NO_BODY / NEEDS_REVIEW) are left on the book default for a manual pass.
if (WRITE) {
  for (const r of rows) {
    if (r.flag) continue;
    const line = `title: ${/^title:.*$/m.exec(r.fm.block)[0].replace(/^title:\s*/, '')}`;
    // Insert description right after the title line inside the front matter.
    const titleLine = /^title:.*$/m.exec(r.fm.block)[0];
    const newBlock = r.fm.block.replace(titleLine, `${titleLine}\ndescription: "${yamlEscape(r.desc)}"`);
    const out = '---\n' + newBlock + r.text.slice(r.fm.endMarker + 1);
    fs.writeFileSync(r.abs, out, 'utf8');
    void line;
  }
}

// Report
const flagged = rows.filter((r) => r.flag);
const overMax = rows.filter((r) => r.len > MAX);

let report = `# Description generation — ${bookArg}\n\n`;
report += `${WRITE ? 'APPLIED' : 'DRY-RUN'} · candidates: ${rows.length} · already have: ${skippedHave} · no/!title: ${skippedNoFm}\n`;
report += `NO_BODY (thin, title-only fallback): ${flagged.length} · over ${MAX} chars: ${overMax.length}\n\n`;
report += `| page | chars | description |\n|---|---|---|\n`;
for (const r of rows) {
  const d = r.desc.replace(/\|/g, '\\|');
  report += `| ${r.name}${r.flag ? ' ⚠️' : ''} | ${r.len} | ${d} |\n`;
}

if (reportPath) fs.writeFileSync(path.resolve(REPO, reportPath), report, 'utf8');

// stdout summary
console.log(`${WRITE ? 'APPLIED' : 'DRY-RUN (no files written; pass --write to apply)'}  [${bookArg}]`);
console.log(`Candidates (no description yet): ${rows.length}`);
console.log(`  ${WRITE ? 'Written' : 'Would write'} (clean):            ${rows.length - flagged.length}`);
console.log(`  Skipped (flagged, needs manual): ${flagged.length}`);
console.log(`Already have description:        ${skippedHave}`);
console.log(`Skipped (no front matter/title): ${skippedNoFm}`);
console.log(`Over ${MAX} chars:                    ${overMax.length}`);
if (reportPath) console.log(`Full review table written to:    ${reportPath}`);
console.log('\n--- sample (first 12) ---');
for (const r of rows.slice(0, 12)) {
  console.log(`[${String(r.len).padStart(3)}] ${r.name}${r.flag ? ' ⚠️' : ''}`);
  console.log(`      ${r.desc}`);
}
