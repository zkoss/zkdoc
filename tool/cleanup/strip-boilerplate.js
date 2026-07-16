#!/usr/bin/env node
/*
 * strip-boilerplate.js — P1 of the GSC indexing improvement plan.
 *
 * Removes zero-information boilerplate from documentation Markdown that dilutes
 * page content and hurts indexability, WITHOUT touching real content:
 *   1. EMPTY "Version History" sections (heading + a table whose data rows are
 *      all blank). Sections with real version rows are preserved.
 *   2. EMPTY "Example" sections (heading whose body is only blank lines up to
 *      the next heading / EOF).
 *   3. Dead metadata bullets: "Demonstration: N/A", "JavaScript API: N/A", and
 *      empty "JavaScript API:" (no value). Bold (**...**) and plain variants.
 * After edits, 2+ consecutive blank lines are collapsed to one and trailing
 * blank lines are trimmed, keeping the tree lint-clean (see tool/lint/).
 *
 * Only the documentation books listed in tool/lint/rules/docs-dirs.js are
 * scanned (tasks/, _site/, theme, node_modules are excluded by construction).
 *
 * Usage:
 *   node tool/cleanup/strip-boilerplate.js            # dry-run (default): report only
 *   node tool/cleanup/strip-boilerplate.js --write     # apply changes in place
 *   node tool/cleanup/strip-boilerplate.js --verbose   # list every change
 */

const fs = require('fs');
const path = require('path');
const { DOCS_DIRECTORIES } = require('../lint/rules/docs-dirs');

const WRITE = process.argv.includes('--write');
const VERBOSE = process.argv.includes('--verbose');

const HEADING = /^#{1,6}\s/;
const VERSION_HISTORY = /^#{1,6}\s+Version History\s*$/;
const EXAMPLE = /^#{1,6}\s+Example\s*$/;
// Dead metadata bullets (bold or plain). Colon may sit inside the bold markers.
const DEAD_BULLET = [
  /^-\s*(\*\*)?Demonstration:?(\*\*)?\s*N\/A\s*$/i,
  /^-\s*(\*\*)?JavaScript API:?(\*\*)?\s*N\/A\s*$/i,
  /^-\s*(\*\*)?JavaScript API:?(\*\*)?\s*$/i, // empty value
];

// A table data row is "real" if, after stripping pipes/whitespace, it has
// content that isn't just the separator dashes or the "Version Date Content"
// header text.
function isRealTableRow(line) {
  if (!line.trimStart().startsWith('|')) return false;
  const cells = line.replace(/[|\s]/g, '');
  if (cells === '') return false;
  if (/^-+$/.test(cells)) return false; // separator ---|---
  if (/^VersionDateContent$/i.test(cells)) return false; // header echo
  return true;
}

function headingLevel(line) {
  const m = /^(#{1,6})\s/.exec(line);
  return m ? m[1].length : 0;
}

// Returns [endIndex, hasContent] for the section body starting at `start`
// (the line after the heading at level `level`), scanning until the next
// heading of the SAME OR HIGHER level (<= level) or EOF. Deeper subheadings
// (level > this heading's) are part of the body — a heading whose body is
// subsections is NOT empty.
function scanBody(lines, start, level, contentPredicate) {
  let i = start;
  let hasContent = false;
  for (; i < lines.length; i++) {
    const hl = headingLevel(lines[i]);
    if (hl > 0 && hl <= level) break;
    if (contentPredicate(lines[i])) hasContent = true;
  }
  return [i, hasContent];
}

function processFile(absPath) {
  const original = fs.readFileSync(absPath, 'utf8');
  const lines = original.split('\n');
  const out = [];
  const removed = { versionHistory: 0, example: 0, deadBullet: 0 };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (VERSION_HISTORY.test(line)) {
      // Empty only if the body's non-blank lines are all empty-table structure.
      // A real data row, prose, or a subheading counts as content → keep.
      const [end, hasReal] = scanBody(lines, i + 1, headingLevel(line), (l) => {
        if (l.trim() === '') return false;
        if (l.trimStart().startsWith('|')) return isRealTableRow(l);
        return true; // non-blank, non-table line (prose or subheading)
      });
      if (!hasReal) {
        removed.versionHistory++;
        i = end - 1; // skip heading + empty body
        continue;
      }
      out.push(line);
      continue;
    }

    if (EXAMPLE.test(line)) {
      const [end, hasContent] = scanBody(lines, i + 1, headingLevel(line), (l) => l.trim() !== '');
      if (!hasContent) {
        removed.example++;
        i = end - 1;
        continue;
      }
      out.push(line);
      continue;
    }

    if (DEAD_BULLET.some((re) => re.test(line))) {
      removed.deadBullet++;
      continue;
    }

    out.push(line);
  }

  const total = removed.versionHistory + removed.example + removed.deadBullet;
  // Nothing removed → leave the file byte-identical (stay surgical).
  if (total === 0) return { changed: false, removed, total, result: original };

  // Collapse 2+ consecutive blank lines to one, trim trailing blanks.
  const collapsed = [];
  for (const l of out) {
    if (l.trim() === '' && collapsed.length && collapsed[collapsed.length - 1].trim() === '') {
      continue;
    }
    collapsed.push(l);
  }
  while (collapsed.length && collapsed[collapsed.length - 1].trim() === '') collapsed.pop();
  let result = collapsed.join('\n');
  if (result.length) result += '\n'; // single trailing newline

  const changed = result !== original;
  return { changed, removed, total, result };
}

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (entry.isFile() && entry.name.endsWith('.md')) acc.push(p);
  }
}

function main() {
  const files = [];
  for (const rel of DOCS_DIRECTORIES) {
    const dir = path.resolve(__dirname, '..', 'lint', rel);
    if (fs.existsSync(dir)) walk(dir, files);
  }

  const totals = { files: 0, versionHistory: 0, example: 0, deadBullet: 0 };
  const cwd = process.cwd();

  for (const f of files) {
    const { changed, removed, result } = processFile(f);
    if (!changed) continue;
    totals.files++;
    totals.versionHistory += removed.versionHistory;
    totals.example += removed.example;
    totals.deadBullet += removed.deadBullet;
    if (WRITE) fs.writeFileSync(f, result, 'utf8');
    if (VERBOSE) {
      const parts = [];
      if (removed.versionHistory) parts.push(`vh:${removed.versionHistory}`);
      if (removed.example) parts.push(`ex:${removed.example}`);
      if (removed.deadBullet) parts.push(`bullet:${removed.deadBullet}`);
      console.log(`  ${path.relative(cwd, f)}  [${parts.join(' ')}]`);
    }
  }

  console.log('');
  console.log(`${WRITE ? 'APPLIED' : 'DRY-RUN (no files written; pass --write to apply)'}`);
  console.log(`Files changed:            ${totals.files}`);
  console.log(`Empty Version History:    ${totals.versionHistory}`);
  console.log(`Empty Example sections:   ${totals.example}`);
  console.log(`Dead metadata bullets:    ${totals.deadBullet}`);
}

main();
