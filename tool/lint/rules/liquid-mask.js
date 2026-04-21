// Replace Liquid tags with same-length opaque placeholders so markdownlint
// rules see valid Markdown while custom rules operate on the original source.
// Placeholder char \x00 is never valid Markdown, so it won't trigger rules.

function maskLiquid(source) {
    // Match {% ... %} and {{ ... }} (including multi-line block tags)
    return source.replace(/(\{%-?[\s\S]*?-?%\}|\{\{[\s\S]*?\}\})/g, (match) => {
        // Preserve newlines so line numbers stay intact; mask everything else
        return match.replace(/[^\n]/g, '\x00');
    });
}

module.exports = { maskLiquid };
