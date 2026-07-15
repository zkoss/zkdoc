// ZK003 — missing-alt-text
// Flags Markdown images with empty or whitespace-only alt text:
//   ![](path)      -> empty alt
//   ![ ](path)     -> whitespace-only alt (renders as empty <img alt="">)
// These produce <img src="..." alt=""> on the site, an accessibility (WCAG) defect.
//
// Report-only. Remediation is handled separately by tool/fix-alt-text.js,
// which needs full-file context to derive a sensible alt from filename/heading.

function isFenceStart(line) {
    return line && /^```/.test(line.trimStart());
}

// Matches a Markdown image whose alt text is empty or whitespace only.
// Group is the path; alt (between the brackets) is empty/whitespace by construction.
const EMPTY_ALT_IMAGE = /!\[\s*\]\([^)]+\)/;

function check(lines) {
    const issues = [];
    let inFence = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (isFenceStart(line)) {
            inFence = !inFence;
            continue;
        }
        if (inFence) continue;

        if (EMPTY_ALT_IMAGE.test(line)) {
            issues.push({
                lineNumber: i + 1,
                message: 'ZK003: image has empty alt text',
                rule: 'missing-alt-text',
            });
        }
    }

    return issues;
}

module.exports = { check };
