// Scans _includes/ once per run and classifies each partial as:
//   'block'  — emits block-level HTML (div, p, table, ul, section, style, script)
//   'inline' — safe inside a table cell (single span or similar)

const fs = require('fs');
const path = require('path');

const BLOCK_TAGS = /<(div|p|table|ul|ol|section|style|script|figure|blockquote|pre|h[1-6])\b/i;

let cache = null;

function classifyIncludes(includesDir) {
    if (cache) return cache;

    cache = {};
    if (!fs.existsSync(includesDir)) return cache;

    const files = fs.readdirSync(includesDir).filter(f => /\.(html|md)$/.test(f));
    for (const file of files) {
        const content = fs.readFileSync(path.join(includesDir, file), 'utf8');
        // Strip Liquid comment blocks before checking tags
        const stripped = content.replace(/\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}/g, '');
        cache[file] = BLOCK_TAGS.test(stripped) ? 'block' : 'inline';
    }
    return cache;
}

module.exports = { classifyIncludes };
