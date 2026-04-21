// ZK001 — liquid-in-table-cell
// Flags {% include X %} inside a Markdown table row when X is a block-level partial.

const path = require('path');
const { classifyIncludes } = require('./include-classifier');

const INCLUDE_RE = /\{%[-\s]*include\s+([^\s%]+)/g;

function check(lines, includesDir) {
    const classification = classifyIncludes(includesDir);
    const issues = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // A Markdown table row starts with |
        if (!line.trimStart().startsWith('|')) continue;

        let m;
        INCLUDE_RE.lastIndex = 0;
        while ((m = INCLUDE_RE.exec(line)) !== null) {
            const partial = path.basename(m[1]);
            const kind = classification[partial];
            if (kind === 'block') {
                issues.push({
                    lineNumber: i + 1,
                    column: m.index + 1,
                    message: `ZK001: block-level include '${partial}' inside table cell will break rendering`,
                    rule: 'liquid-in-table-cell',
                });
            }
        }
    }
    return issues;
}

module.exports = { check };
