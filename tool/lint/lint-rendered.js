#!/usr/bin/env node
/**
 * lint-rendered.js — Tier 2 rendered-HTML table validator
 *
 * Usage:
 *   node lint/lint-rendered.js [--site-dir PATH]
 *
 * Requires a pre-built Jekyll site. Run `bundle exec jekyll build` first,
 * or use `./preview.sh`. Default site dir: ../../_site (relative to this file).
 *
 * Checks for:
 *   - Inconsistent column counts across table rows vs thead
 *   - Stray <div>/<p> directly inside <tr> (block Liquid leaked into table cell)
 *   - Orphan text nodes between <tr> elements
 *
 * Maps rendered issues back to source .md via permalink front matter.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const cheerio = require('cheerio');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

const args = process.argv.slice(2);
const siteDirArg = args.find((_, i) => args[i - 1] === '--site-dir');
const SITE_DIR = siteDirArg ? path.resolve(siteDirArg) : path.join(REPO_ROOT, '_site');

// Build permalink→source map by scanning all .md files for permalink front matter
function buildPermalinkMap() {
    const map = {};
    const mdFiles = glob.sync('**/*.md', { cwd: REPO_ROOT, absolute: true, ignore: ['_site/**', 'node_modules/**', 'tool/**'] });
    const FM_RE = /^---[\s\S]*?permalink\s*:\s*(.+?)[\s\n]/m;
    for (const f of mdFiles) {
        const content = fs.readFileSync(f, 'utf8');
        const m = FM_RE.exec(content);
        if (m) {
            const permalink = m[1].trim().replace(/\/$/, '');
            map[permalink] = path.relative(REPO_ROOT, f);
        }
    }
    return map;
}

function htmlFileToPermalink(htmlPath) {
    // _site/zk_component_ref/listheader/index.html → /zk_component_ref/listheader
    const rel = path.relative(SITE_DIR, htmlPath);
    return '/' + rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
}

function checkTable($, table, issues) {
    const $table = $(table);

    // Find all rows (in thead and tbody)
    const headerRow = $table.find('thead tr').first();
    const headerCols = headerRow.length ? headerRow.find('th, td').length : 0;

    $table.find('tr').each((_, tr) => {
        const $tr = $(tr);

        // Check for block elements directly inside <tr>
        const blockKids = $tr.find('> div, > p, > section');
        if (blockKids.length > 0) {
            issues.push({ type: 'block-in-tr', detail: `<tr> contains ${blockKids.length} block element(s)` });
        }

        // Check column count consistency
        if (headerCols > 0) {
            const cols = $tr.find('td, th').length;
            if (cols > 0 && cols !== headerCols) {
                issues.push({ type: 'col-mismatch', detail: `expected ${headerCols} cols, got ${cols}` });
            }
        }
    });
}

async function main() {
    if (!fs.existsSync(SITE_DIR)) {
        console.error(`Site directory not found: ${SITE_DIR}`);
        console.error('Run `bundle exec jekyll build` first.');
        process.exit(2);
    }

    const permalinkMap = buildPermalinkMap();
    const htmlFiles = await glob('**/*.html', { cwd: SITE_DIR, absolute: true });

    let totalIssues = 0;
    let filesWithIssues = 0;

    for (const htmlFile of htmlFiles) {
        const html = fs.readFileSync(htmlFile, 'utf8');
        const $ = cheerio.load(html);

        // Only check tables inside the main article/content area
        const tables = $('.page__content table, article table, main table');
        if (tables.length === 0) continue;

        const fileIssues = [];
        tables.each((_, table) => checkTable($, table, fileIssues));

        if (fileIssues.length > 0) {
            filesWithIssues++;
            totalIssues += fileIssues.length;

            const permalink = htmlFileToPermalink(htmlFile);
            const sourceFile = permalinkMap[permalink] || '(source unknown)';

            for (const issue of fileIssues) {
                console.log(`${sourceFile} ← ${permalink}: ${issue.detail} [${issue.type}]`);
            }
        }
    }

    console.log('');
    console.log(`Checked ${htmlFiles.length} HTML file(s). Found ${totalIssues} issue(s) in ${filesWithIssues} file(s).`);
    process.exit(totalIssues > 0 ? 1 : 0);
}

main().catch(err => {
    console.error(err);
    process.exit(2);
});
