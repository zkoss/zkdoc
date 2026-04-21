# tool/lint — Liquid-Aware Markdown Linter

Two-tier validation for the zkdoc Jekyll site (MediaWiki-converted pages).

## Quick start

```bash
cd tool
npm install
npm run lint-docs          # Tier 1: source-level report
npm run lint-docs-fix      # Tier 1: apply safe whitespace fixes
npm run lint-rendered      # Tier 2: rendered HTML check (needs jekyll build first)
```

## Tier 1 — Source lint (`lint-docs.js`)

Fast, runs on raw `.md` files. Custom rules understand Liquid syntax.

| Rule | ID | What it catches |
|------|----|-----------------|
| liquid-in-table-cell | ZK001 | `{% include X %}` inside a table cell where X emits block HTML |
| blank-line-issues | ZK002 | Blank lines inside tables, missing blanks around fences, 2+ consecutive blanks |

ZK001 is report-only. ZK002 supports `--fix` (whitespace only, never touches content).

## Tier 2 — Rendered validation (`lint-rendered.js`)

Thorough, post-build check. Walks `_site/**/*.html` with cheerio and checks:
- Column count consistency across table rows
- Stray `<div>`/`<p>` directly inside `<tr>` (block Liquid leaked in)

Maps HTML issues back to source `.md` via permalink front matter.

## Adding a rule

1. Create `rules/my-rule.js` exporting `check(lines, ...extras)` → `[{lineNumber, message, rule}]`.
2. Import and call it in `lint-docs.js`.
