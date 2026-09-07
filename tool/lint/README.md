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
| missing-alt-text | ZK003 | Markdown image `![](path)` (or `![ ](path)`) with empty/whitespace alt text |
| anchor-case | ZK004 | Internal link fragment that kramdown's auto_ids never generates (MediaWiki leftovers like `#Model-Driven_Rendering`) |

ZK001, ZK003 and ZK004 are report-only. ZK002 supports `--fix` (whitespace only, never touches content).
Remediate ZK003 with `npm run fix-alt-text` (dry-run) / `npm run fix-alt-text-apply`.

ZK004 prints a `likely "#..."` suggestion, but it is derived from the fragment text rather
than from the heading it should point at, so verify before applying — grep the id in `_site/`.
It also has a blind spot by design: a fragment that is already lowercase-with-underscores has
a legal shape even when it is wrong (`#start_from_example_project` vs the real
`#start-from-example-project`). Catching those needs a build, i.e. Tier 2.

## Tier 2 — Rendered validation (`lint-rendered.js`)

Thorough, post-build check. Walks `_site/**/*.html` with cheerio and checks:
- Column count consistency across table rows
- Stray `<div>`/`<p>` directly inside `<tr>` (block Liquid leaked in)

Maps HTML issues back to source `.md` via permalink front matter.

## Adding a rule

1. Create `rules/my-rule.js` exporting `check(lines, ...extras)` → `[{lineNumber, message, rule}]`.
2. Import and call it in `lint-docs.js`.
