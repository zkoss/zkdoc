#!/usr/bin/env node
/**
 * lint-docs.js — Tier 1 source-level Markdown linter
 *
 * Usage:
 *   node lint/lint-docs.js [--fix] [file-or-dir ...]
 *
 * Without --fix: report only.
 * With --fix:    apply safe whitespace-only fixes (ZK002 only).
 *
 * Rules:
 *   ZK001  liquid-in-table-cell  — block-level {% include %} inside table row
 *   ZK002  blank-line-issues     — blank lines inside tables, missing around fences, 2+ consecutive blanks
 *   ZK003  missing-alt-text      — Markdown image with empty/whitespace alt text
 *   ZK004  anchor-case           — internal link fragment that kramdown never generates
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const { DOCS_DIRECTORIES } = require('./rules/docs-dirs');
const { check: checkZK001 } = require('./rules/liquid-in-table-cell');
const { check: checkZK002, fix: fixZK002 } = require('./rules/blank-line-issues');
const { check: checkZK003 } = require('./rules/missing-alt-text');
const { check: checkZK004, collectDeclaredIds } = require('./rules/anchor-case');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const INCLUDES_DIR = path.join(REPO_ROOT, '_includes');

const args = process.argv.slice(2);
const fixMode = args.includes('--fix');
const targets = args.filter(a => !a.startsWith('--'));

async function collectFiles(inputPaths) {
    if (inputPaths.length > 0) {
        const files = [];
        for (const p of inputPaths) {
            const abs = path.resolve(p);
            if (fs.existsSync(abs)) {
                const stat = fs.statSync(abs);
                if (stat.isDirectory()) {
                    const found = await glob('**/*.md', { cwd: abs, absolute: true });
                    files.push(...found);
                } else if (abs.endsWith('.md')) {
                    files.push(abs);
                }
            }
        }
        return files;
    }

    // Default: all docs directories, plus the shared content fragments they
    // pull in (same set fix-alt-text.js walks). docs-dirs.js is left alone
    // because tool/cleanup/ scripts mutate whatever is on that list.
    const files = [];
    for (const dir of [...DOCS_DIRECTORIES, '../../_includes']) {
        const abs = path.resolve(__dirname, dir);
        if (fs.existsSync(abs)) {
            const found = await glob('**/*.md', { cwd: abs, absolute: true });
            files.push(...found);
        }
    }
    return files;
}

async function main() {
    const files = await collectFiles(targets);
    if (files.length === 0) {
        console.log('No markdown files found.');
        process.exit(0);
    }

    const declaredIds = collectDeclaredIds(files);

    let totalIssues = 0;
    let filesWithIssues = 0;
    let fixedCount = 0;

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        const rel = path.relative(REPO_ROOT, file);

        const issues001 = checkZK001(lines, INCLUDES_DIR);
        const issues002 = checkZK002(lines);
        const issues003 = checkZK003(lines);
        const issues004 = checkZK004(lines, declaredIds);
        const allIssues = [...issues001, ...issues002, ...issues003, ...issues004].sort((a, b) => a.lineNumber - b.lineNumber);

        if (allIssues.length > 0) {
            filesWithIssues++;
            totalIssues += allIssues.length;
            for (const issue of allIssues) {
                const col = issue.column ? `:${issue.column}` : '';
                console.log(`${rel}:${issue.lineNumber}${col}  ${issue.message}`);
            }
        }

        if (fixMode && issues002.length > 0) {
            const fixed = fixZK002(content);
            if (fixed !== content) {
                fs.writeFileSync(file, fixed, 'utf8');
                console.log(`  → fixed: ${rel}`);
                fixedCount++;
            }
        }
    }

    console.log('');
    console.log(`Scanned ${files.length} file(s). Found ${totalIssues} issue(s) in ${filesWithIssues} file(s).`);
    if (fixMode) {
        console.log(`Fixed ${fixedCount} file(s).`);
    }

    process.exit(totalIssues > 0 && !fixMode ? 1 : 0);
}

main().catch(err => {
    console.error(err);
    process.exit(2);
});
