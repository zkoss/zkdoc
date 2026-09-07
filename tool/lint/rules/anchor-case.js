// ZK004 — anchor-case
// Flags internal link fragments that kramdown could never have generated, so
// they silently land the reader at the top of the page instead of the section.
// Most are MediaWiki leftovers from the wiki import: #Model-Driven_Rendering,
// #EL_3.0_Support, #Desktop.2C_Page_and_Component, or a stray trailing space.
//
// The accepted shape below was measured, not assumed: all 8924 heading ids in
// a full _site build use only [a-z0-9_-]. kramdown keeps underscores and
// leading digits (`## 2DigitYearStart` -> `2digityearstart`, `### Step 2:
// Override bind_() ...` -> `step-2-override-bind_-and-register-event-listeners`)
// and drops everything outside that set, so uppercase letters, dots, colons,
// spaces and percent-encoding are the reliable tell.
//
// Known blind spot: a fragment that is already lowercase-with-underscores has
// a legal shape even when it is wrong (#start_from_example_project, where the
// real id is #start-from-example-project). Catching those needs the id to be
// resolved against a build — that is lint-rendered.js territory, not Tier 1.
//
// External links are skipped: javadoc and typedoc anchors are case-sensitive
// by design and are not kramdown ids.
//
// Report-only, and deliberately no --fix: the suggested id is derived from the
// fragment text, not from the heading it should point at, so treat it as a lead
// to verify (grep the id in _site/) rather than a safe rewrite.

const fs = require('fs');

const KRAMDOWN_AUTO_ID = /^[a-z0-9_-]+$/;

// [text](target#fragment) with an optional link title. Fragments containing
// parentheses (javadoc method signatures) are left alone.
const LINK_WITH_FRAGMENT = /\]\(\s*([^()\s]*)#([^()"]*?)\s*(?:"[^"]*")?\s*\)/g;

// Anything with a URI scheme, or a protocol-relative URL, lives off-site.
const EXTERNAL_TARGET = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

// Raw HTML ids written into the Markdown (e.g. <h3 id="file_structure">) are
// real anchor targets, so links pointing at them are correct as written.
const HTML_ID = /\bid="([^"]+)"/g;

function isFenceStart(line) {
    return line && /^```/.test(line.trimStart());
}

// Best-effort reconstruction of the id kramdown would emit. MediaWiki wrote
// spaces as underscores and percent-encoded punctuation as .XX, so undo both
// before applying kramdown's own transform.
function suggestId(fragment) {
    return fragment
        .trim()
        .replace(/\.([0-9A-F]{2})/g, (m, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/_/g, ' ')
        .trim()
        .replace(/[^a-zA-Z0-9 _-]/g, '')
        .replace(/ /g, '-')
        .toLowerCase();
}

// One pass over every file, so that a link may point at an explicit id
// declared in another page.
function collectDeclaredIds(files) {
    const ids = new Set();

    for (const file of files) {
        const lines = fs.readFileSync(file, 'utf8').split('\n');
        let inFence = false;

        for (const line of lines) {
            if (isFenceStart(line)) {
                inFence = !inFence;
                continue;
            }
            if (inFence) continue;

            for (const match of line.matchAll(HTML_ID)) {
                ids.add(match[1]);
            }
        }
    }

    return ids;
}

function check(lines, declaredIds = new Set()) {
    const issues = [];
    let inFence = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (isFenceStart(line)) {
            inFence = !inFence;
            continue;
        }
        if (inFence) continue;

        for (const match of line.matchAll(LINK_WITH_FRAGMENT)) {
            const [, target, fragment] = match;

            if (EXTERNAL_TARGET.test(target)) continue;
            if (fragment === '' || fragment.includes('{')) continue;
            if (KRAMDOWN_AUTO_ID.test(fragment)) continue;
            if (declaredIds.has(fragment.trim())) continue;

            const suggestion = suggestId(fragment);
            const hint = suggestion ? `; likely "#${suggestion}"` : '';
            issues.push({
                lineNumber: i + 1,
                column: match.index + 1,
                message: `ZK004: anchor "#${fragment}" is not a kramdown auto-id${hint}`,
                rule: 'anchor-case',
            });
        }
    }

    return issues;
}

module.exports = { check, collectDeclaredIds };
