/**
 * ZK Documentation Alt-Text Remediation
 *
 * Purpose: Fill missing `alt` text on Markdown images across the docs.
 *   Kramdown renders `![](path)` as `<img src="..." alt="">`, an accessibility
 *   (WCAG) defect. This script derives an alt from context and writes it into
 *   the `.md` source, turning `![](path)` into `![Derived alt](path)`.
 *
 * Alt is derived by a local heuristic (no API cost):
 *   1. Humanize the image filename (primary, most image-specific signal).
 *   2. Fall back to the nearest preceding heading when the filename is
 *      non-descriptive (numeric / generic like "screenshot").
 *   3. Give up gracefully (leave untouched, record for manual review) if neither
 *      yields usable text. The ZK003 lint rule still flags those.
 *
 * The parenthesised path is preserved byte-for-byte (including {{site.baseurl}}
 * and any "title"), so only the alt slot changes.
 *
 * Usage:
 *   node fix-alt-text.js            # dry-run (default): writes tool/alt-text-report.txt, no edits
 *   node fix-alt-text.js --apply    # apply edits in place
 *
 * Scans the shared docs directory list (tool/lint/rules/docs-dirs.js) plus
 * _includes/ (shared fragments embed images too).
 */

const fs = require('fs');
const path = require('path');
const { DOCS_DIRECTORIES } = require('./lint/rules/docs-dirs');

const REPO_ROOT = path.resolve(__dirname, '..');
const REPORT_FILE = path.join(__dirname, 'alt-text-report.txt');

const apply = process.argv.includes('--apply');

// Image with empty or whitespace-only alt; group 1 = full parenthesised path (kept verbatim).
const EMPTY_ALT_IMAGE = /!\[\s*\]\(([^)]+)\)/g;

// Filenames whose humanized stem is not descriptive enough to be a useful alt.
const GENERIC_STEMS = new Set([
    'image', 'images', 'img', 'screenshot', 'screen', 'untitled',
    'picture', 'pic', 'snapshot', 'capture', 'result', 'output',
]);

function isFenceStart(line) {
    return line && /^```/.test(line.trimStart());
}

// Pull the bare filename stem out of a Markdown image target such as
// `images/foo.png`, `{{site.baseurl}}/x/images/foo.png`, or `foo.png "title"`.
function filenameStem(target) {
    let p = target.trim();
    p = p.replace(/\s+["'].*$/, '');        // drop optional "title"/'title'
    const base = p.split('/').pop().split(/[?#]/)[0];
    return base.replace(/\.[a-z0-9]+$/i, ''); // strip extension
}

function humanizeStem(stem) {
    let s = stem;
    // Strip doc-internal book-code prefixes (noise): ZKCompRef_, ZKComRef_, ZKComDevEss_, ZKDevRef_, ZKEss_ ...
    s = s.replace(/^zk\s*com(p?\s*ref|\s*dev\s*ess)[-_ ]*/i, '');
    s = s.replace(/^zk\s*(dev\s*ref|ess)[-_ ]*/i, '');
    // Strip leading chapter/edition prefixes: ze-ch8-, zk-ch2-, zss-ch1-, ...
    s = s.replace(/^[a-z]{1,6}-ch\d+[-_]/i, '');
    // Strip a leading numeric sequence index: 01_, 12-, ...
    s = s.replace(/^\d+[-_]/, '');
    // Split camelCase boundaries, then separators, into spaced words.
    s = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    s = s.replace(/[-_]+/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function isNonDescriptive(humanized, stem) {
    if (!humanized || humanized.length < 3) return true;
    const lower = humanized.toLowerCase();
    if (GENERIC_STEMS.has(lower)) return true;
    if (/^\d+$/.test(stem)) return true;        // pure number
    if (/^[0-9a-f]{16,}$/i.test(stem)) return true; // MediaWiki hash filename (long hex)
    if (/^img\d*$/i.test(stem)) return true;    // img, img1, img02
    return false;
}

// Clean heading text into plain alt: drop markdown links/emphasis/code and
// kramdown attribute blocks / anchors.
function cleanHeading(text) {
    let t = text;
    t = t.replace(/\{[:#][^}]*\}\s*$/, '');       // {#anchor} / {: .class}
    t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'); // [label](url) -> label
    t = t.replace(/[*_`]/g, '');                   // emphasis / code ticks
    t = t.replace(/#+\s*$/, '');                    // trailing ###
    return t.replace(/\s+/g, ' ').trim();
}

// Strip characters that would break Markdown image syntax or table cells.
function sanitizeAlt(alt) {
    return alt.replace(/[\[\]]/g, '').replace(/\|/g, '-').replace(/\s+/g, ' ').trim();
}

function deriveAlt(target, currentHeading) {
    const stem = filenameStem(target);
    const humanized = humanizeStem(stem);
    if (!isNonDescriptive(humanized, stem)) {
        return sanitizeAlt(humanized);
    }
    if (currentHeading) {
        return sanitizeAlt(currentHeading);
    }
    return '';
}

function findMarkdownFiles(dirPath) {
    const out = [];
    if (!fs.existsSync(dirPath)) return out;
    for (const item of fs.readdirSync(dirPath)) {
        const p = path.join(dirPath, item);
        const stat = fs.statSync(p);
        if (stat.isDirectory()) out.push(...findMarkdownFiles(p));
        else if (item.endsWith('.md')) out.push(p);
    }
    return out;
}

function processFile(file) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const rel = path.relative(REPO_ROOT, file);

    const filled = [];   // { line, target, alt }
    const skipped = [];  // { line, target }

    let inFence = false;
    let currentHeading = '';
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (isFenceStart(line)) {
            inFence = !inFence;
            continue;
        }
        if (inFence) continue;

        const headingMatch = line.match(/^#{1,6}\s+(.+)$/);
        if (headingMatch) {
            const h = cleanHeading(headingMatch[1]);
            if (h) currentHeading = h;
            continue;
        }

        if (!EMPTY_ALT_IMAGE.test(line)) continue;
        EMPTY_ALT_IMAGE.lastIndex = 0;

        const newLine = line.replace(EMPTY_ALT_IMAGE, (full, target) => {
            const alt = deriveAlt(target, currentHeading);
            if (!alt) {
                skipped.push({ line: i + 1, target: target.trim() });
                return full;
            }
            filled.push({ line: i + 1, target: target.trim(), alt });
            return `![${alt}](${target})`;
        });

        if (newLine !== line) {
            lines[i] = newLine;
            changed = true;
        }
    }

    if (apply && changed) {
        fs.writeFileSync(file, lines.join('\n'), 'utf8');
    }

    return { rel, filled, skipped };
}

function main() {
    // docs-dirs.js paths are relative to tool/lint/ (e.g. '../../get_started').
    const LINT_DIR = path.join(__dirname, 'lint');
    const dirs = [...DOCS_DIRECTORIES, '../../_includes'];
    const files = [];
    for (const dir of dirs) {
        files.push(...findMarkdownFiles(path.resolve(LINT_DIR, dir)));
    }

    let totalFilled = 0;
    let totalSkipped = 0;
    let filesChanged = 0;
    const reportLines = [];
    const skippedLines = [];

    for (const file of files) {
        const { rel, filled, skipped } = processFile(file);
        if (filled.length === 0 && skipped.length === 0) continue;
        if (filled.length > 0) filesChanged++;

        for (const f of filled) {
            totalFilled++;
            reportLines.push(`${rel}:${f.line}  (${f.target})  ->  ![${f.alt}]`);
        }
        for (const s of skipped) {
            totalSkipped++;
            skippedLines.push(`${rel}:${s.line}  (${s.target})`);
        }
    }

    const header = [
        'ZK Documentation Alt-Text Remediation Report',
        `Generated: ${new Date().toISOString()}`,
        `Mode: ${apply ? 'APPLY (files written)' : 'DRY-RUN (no files changed)'}`,
        '='.repeat(60),
        '',
        `Markdown files scanned:     ${files.length}`,
        `Alt text filled:            ${totalFilled} image(s) in ${filesChanged} file(s)`,
        `Skipped (need manual alt):  ${totalSkipped} image(s)`,
        '',
        'FILLED (source:line  (path)  ->  ![alt])',
        '-'.repeat(60),
    ];

    const report = [
        ...header,
        ...reportLines,
        '',
        'SKIPPED — no descriptive filename or heading; add alt manually',
        '-'.repeat(60),
        ...skippedLines,
        '',
    ].join('\n');

    fs.writeFileSync(REPORT_FILE, report, 'utf8');

    console.log(`Alt text ${apply ? 'filled' : 'to fill'}: ${totalFilled} in ${filesChanged} file(s).`);
    console.log(`Skipped (manual): ${totalSkipped}.`);
    console.log(`Report: ${path.relative(REPO_ROOT, REPORT_FILE)}`);
    if (!apply) {
        console.log('Dry-run only — re-run with --apply to write changes.');
    }
}

main();
