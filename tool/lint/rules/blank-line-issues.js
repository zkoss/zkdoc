// ZK002 — blank-line-issues
// Detects MediaWiki-conversion blank-line artifacts:
//   a) Blank line inside a Markdown table (specifically after the separator row)
//   b) Missing blank line between list and following paragraph/table/code block
//   c) Missing blank line before or after a fenced code block
//   d) Two or more consecutive blank lines anywhere
//
// --fix mode applies safe whitespace-only normalization.

function isTableRow(line) {
    return line && line.trimStart().startsWith('|');
}

function isSeparatorRow(line) {
    return isTableRow(line) && /^[|\s\-—–:]+$/.test(line.trim()) && line.includes('-');
}

function isListItem(line) {
    return line && /^\s*[-*+]\s|^\s*\d+\.\s/.test(line);
}

function isFenceStart(line) {
    return line && /^```/.test(line.trimStart());
}

function isBlank(line) {
    return !line || line.trim() === '';
}

function check(lines) {
    const issues = [];

    let inTable = false;
    let inFence = false;
    let consecutiveBlanks = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const prev = i > 0 ? lines[i - 1] : null;
        const next = i < lines.length - 1 ? lines[i + 1] : null;

        // Track fenced code blocks
        if (isFenceStart(line)) {
            const wasInFence = inFence;
            inFence = !inFence;

            if (!wasInFence) {
                // Opening fence
                if (prev !== null && !isBlank(prev) && !isFenceStart(prev)) {
                    issues.push({
                        lineNumber: i + 1,
                        message: 'ZK002: missing blank line before fenced code block',
                        rule: 'blank-line-issues',
                    });
                }
            } else {
                // Closing fence
                if (next !== null && !isBlank(next) && !isFenceStart(next)) {
                    issues.push({
                        lineNumber: i + 1,
                        message: 'ZK002: missing blank line after fenced code block',
                        rule: 'blank-line-issues',
                    });
                }
            }
        }

        if (inFence) {
            consecutiveBlanks = 0;
            continue;
        }

        // Track table context
        if (isTableRow(line)) {
            inTable = true;
        } else if (inTable && isBlank(line)) {
            // Only flag if followed by another table row (MediaWiki artifact)
            // AND the previous line was a separator (e.g. |---|), meaning it's an accidental break in a single table
            if (next !== null && isTableRow(next) && isSeparatorRow(prev)) {
                issues.push({
                    lineNumber: i + 1,
                    message: 'ZK002: blank line inside Markdown table breaks rendering',
                    rule: 'blank-line-issues',
                });
            }
            inTable = false;
        } else if (!isBlank(line)) {
            inTable = false;
        }

        // Consecutive blank lines
        if (isBlank(line)) {
            consecutiveBlanks++;
            if (consecutiveBlanks >= 2) {
                issues.push({
                    lineNumber: i + 1,
                    message: 'ZK002: two or more consecutive blank lines',
                    rule: 'blank-line-issues',
                });
            }
        } else {
            consecutiveBlanks = 0;
        }

        // Missing blank line: list item followed immediately by non-list, non-blank
        if (prev !== null && isListItem(prev) && !isListItem(line) && !isBlank(line) && !isFenceStart(line)) {
            if (isTableRow(line) || /^\S/.test(line)) {
                issues.push({
                    lineNumber: i + 1,
                    message: 'ZK002: missing blank line between list and following block',
                    rule: 'blank-line-issues',
                });
            }
        }

        // Missing blank line: table row followed immediately by non-table, non-blank
        if (prev !== null && isTableRow(prev) && !isTableRow(line) && !isBlank(line) && !isFenceStart(line)) {
            issues.push({
                lineNumber: i + 1,
                message: 'ZK002: missing blank line after Markdown table',
                rule: 'blank-line-issues',
            });
        }
    }

    return issues;
}

function fix(content) {
    const lines = content.split('\n');
    const out = [];
    let inFence = false;
    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let prevLine = out.length > 0 ? out[out.length - 1] : null;

        if (isFenceStart(line)) {
            const wasInFence = inFence;
            inFence = !inFence;
            // Ensure blank line before opening fence
            if (!wasInFence && prevLine !== null && !isBlank(prevLine)) {
                out.push('');
                prevLine = '';
            }
        }

        if (!inFence) {
            // Remove blank lines inside tables (specifically after separator row - MediaWiki artifacts)
            if (isBlank(line) && inTable) {
                const nextLine = i < lines.length - 1 ? lines[i + 1] : null;
                // Only delete if it looks like it's within a single table structure
                // MediaWiki often leaves a blank line right after the header separator
                if (nextLine !== null && isTableRow(nextLine) && isSeparatorRow(prevLine)) {
                    continue; 
                }
            }

            // Collapse 2+ consecutive blank lines to 1
            if (isBlank(line) && prevLine !== null && isBlank(prevLine)) {
                continue;
            }

            // Fix missing blank line after table or closing fence
            if (prevLine !== null && !isBlank(prevLine) && !isBlank(line) && !isFenceStart(line)) {
                const prevWasClosingFence = i > 0 && isFenceStart(lines[i-1]) && !inFence;
                if ((isTableRow(prevLine) && !isTableRow(line)) || prevWasClosingFence) {
                    out.push('');
                    prevLine = '';
                    inTable = false;
                }
            }

            if (isTableRow(line)) {
                inTable = true;
            } else if (!isBlank(line)) {
                inTable = false;
            }
        }

        out.push(line);
    }

    return out.join('\n');
}

module.exports = { check, fix };
