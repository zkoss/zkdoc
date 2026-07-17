#!/usr/bin/env node
/*
 * noindex-thin-children.js — P3 Option C (second half), scoped to zuml_ref.
 *
 * Adds `noindex: true` + `sitemap: false` to the genuinely-thin child pages of
 * the two enriched parent pages (Implicit Objects, Core Methods). Those parents
 * now carry the full, indexable overview table; the thin per-item detail pages
 * stay browsable + lunr-searchable but leave Google's "Crawled – not indexed"
 * bucket cleanly (→ "Excluded by noindex"). Matches the existing repo pattern
 * on zk_component_ref/supporting_classes.md.
 *
 * SURGICAL: only the two curated child lists below, and only files whose
 * meaningful prose word count is <= threshold. Substantial children (labels, zk,
 * each, event, new, formatDate…) are left indexable.
 *
 * Dry-run by default; pass --write to apply.
 *   node tool/cleanup/noindex-thin-children.js            # preview
 *   node tool/cleanup/noindex-thin-children.js --write
 *   node tool/cleanup/noindex-thin-children.js --threshold 100
 */

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const thrIdx = args.indexOf('--threshold');
const THRESHOLD = thrIdx >= 0 ? parseInt(args[thrIdx + 1], 10) : 100;

// Curated child lists (from navigation.yml, under the two enriched parents).
const IMPLICIT = ['applicationscope','arg','componentscope','cookie','desktop','desktopscope','each','event','execution','header','headervalues','foreachstatus','labels','page','pagecontext','pagescope','param','paramvalues','requestscope','self','session','sessionscope','spaceowner','spacescope','zk'];
const METHODS = ['attr','boolean','browser','cat','cat3','cat4','cat5','char','class','decimal','eatquot','encodethemeurl','encodeuricomponent','encodeurl','endswith','escapexml','formatdate','formatnumber','getcurrentlocale','indexof','int','isinstance','join','l','l2','lastindexof','length','new','new1','new2','new3','number','parsedate','parsenumber','property','render','replace','split','startswith','string','substring','testcurrentlocale','tolowercase','touppercase','trim'];
const SLUGS = [...IMPLICIT, ...METHODS];

function stripFm(text) {
  if (!text.startsWith('---\n')) return text;
  const e = text.indexOf('\n---', 4);
  return e < 0 ? text : text.slice(text.indexOf('\n', e + 4) + 1);
}

function proseWords(body) {
  const t = body
    .replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ').replace(/\{%[^%]*%\}/g, ' ').replace(/\{\{[^}]*\}\}/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/https?:\/\/\S+/g, ' ').replace(/[#>*_|`\-]/g, ' ');
  return t.split(/\s+/).filter((w) => /[a-zA-Z0-9]/.test(w) && w.length > 1).length;
}

// Insert noindex+sitemap into an existing FM block, or create a new FM block.
function addNoindex(text) {
  if (text.startsWith('---\n')) {
    const e = text.indexOf('\n---', 4);
    const block = text.slice(0, e + 1);          // includes leading '---\n' ... up to newline before closing ---
    if (/^\s*noindex\s*:/m.test(block)) return null; // already set
    const rest = text.slice(e + 1);              // '\n---' + body
    return block + 'noindex: true\nsitemap: false\n' + rest;
  }
  // no front matter → prepend a minimal block
  return '---\nnoindex: true\nsitemap: false\n---\n\n' + text;
}

const applied = [];
const skippedSubstantial = [];
const skippedAlready = [];
const missing = [];

for (const slug of SLUGS) {
  const abs = path.join(REPO, 'zuml_ref', slug + '.md');
  if (!fs.existsSync(abs)) { missing.push(slug); continue; }
  const text = fs.readFileSync(abs, 'utf8');
  const words = proseWords(stripFm(text));
  if (words > THRESHOLD) { skippedSubstantial.push(`${slug} (${words}w)`); continue; }
  const out = addNoindex(text);
  if (out === null) { skippedAlready.push(slug); continue; }
  applied.push(`${slug} (${words}w)`);
  if (WRITE) fs.writeFileSync(abs, out, 'utf8');
}

console.log(`${WRITE ? 'APPLIED' : 'DRY-RUN (pass --write to apply)'} — zuml_ref thin children, threshold ≤${THRESHOLD}w\n`);
console.log(`noindex ${WRITE ? 'added to' : 'would add to'}: ${applied.length}`);
applied.forEach((s) => console.log(`  + ${s}`));
console.log(`\nleft indexable (substantial, >${THRESHOLD}w): ${skippedSubstantial.length}`);
console.log(`  ${skippedSubstantial.join(', ')}`);
if (skippedAlready.length) console.log(`\nalready noindex: ${skippedAlready.join(', ')}`);
if (missing.length) console.log(`\nMISSING files: ${missing.join(', ')}`);
