#!/usr/bin/env python3
"""
Fix broken markdown tables with multi-line rows.

Standard markdown requires each table row to be on a single line.
Many pages in the ZK component reference have table cells that span
multiple lines, which causes the table to render incorrectly (the
content spills outside the table structure).

This script scans markdown files, detects multi-line table rows,
and joins them into single lines, preserving a space between the
joined fragments.

Usage:
    # Dry run (default) — show what would be changed
    python3 fix-multiline-tables.py [FILES_OR_DIRS...]

    # Apply changes
    python3 fix-multiline-tables.py --apply [FILES_OR_DIRS...]

    # If no files/dirs given, defaults to zk_component_ref/
"""

import argparse
import glob
import os
import re
import sys


def find_markdown_files(paths):
    """Resolve paths to a list of .md files."""
    files = []
    for p in paths:
        if os.path.isfile(p) and p.endswith('.md'):
            files.append(p)
        elif os.path.isdir(p):
            files.extend(sorted(glob.glob(os.path.join(p, '**', '*.md'), recursive=True)))
    return files


def is_table_separator(line):
    """Check if a line is a markdown table separator like |---|---|."""
    stripped = line.strip()
    return bool(re.match(r'^\|[\s\-:|]+\|$', stripped))


def is_table_row(line):
    """Check if a line starts a markdown table row (starts with |)."""
    return line.strip().startswith('|')


def fix_multiline_tables(content):
    """
    Fix multi-line markdown table rows by joining continuation lines
    into the preceding table row.

    A continuation line is any non-empty line that:
    - follows a table row (a line starting with |)
    - does NOT start with | itself
    - is not a blank line
    - is not a heading or list item

    Returns (fixed_content, list_of_changes) where each change is a
    dict describing what was fixed.
    """
    lines = content.split('\n')
    result = []
    changes = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Check if this line is a table row
        if is_table_row(line) and not is_table_separator(line):
            # Collect continuation lines
            joined = line.rstrip()
            continuation_count = 0
            j = i + 1

            while j < len(lines):
                next_line = lines[j].strip()

                # Stop if: empty line, another table row, heading, or
                # table separator
                if (not next_line or
                    is_table_row(lines[j]) or
                    is_table_separator(lines[j]) or
                    next_line.startswith('#')):
                    break

                # This is a continuation line — join it
                joined = joined.rstrip() + ' ' + next_line
                continuation_count += 1
                j += 1

            if continuation_count > 0:
                # Record the change
                original_lines = lines[i:j]
                changes.append({
                    'line': i + 1,
                    'original': '\n'.join(original_lines),
                    'fixed': joined,
                    'continuation_lines': continuation_count,
                })

            result.append(joined)
            i = j
        else:
            result.append(line)
            i += 1

    return '\n'.join(result), changes


def main():
    parser = argparse.ArgumentParser(
        description='Fix broken multi-line markdown table rows.')
    parser.add_argument(
        'paths', nargs='*', default=['zk_component_ref'],
        help='Files or directories to scan (default: zk_component_ref/)')
    parser.add_argument(
        '--apply', action='store_true',
        help='Apply fixes (default is dry-run)')
    args = parser.parse_args()

    files = find_markdown_files(args.paths)
    if not files:
        print('No markdown files found.')
        return

    total_files_fixed = 0
    total_rows_fixed = 0

    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        fixed_content, changes = fix_multiline_tables(content)

        if not changes:
            continue

        total_files_fixed += 1
        total_rows_fixed += len(changes)

        rel_path = os.path.relpath(filepath)
        print(f'\n📄 {rel_path} — {len(changes)} table row(s) to fix')

        for change in changes:
            original_preview = change['original'][:120].replace('\n', '\\n')
            print(f'   Line {change["line"]}: '
                  f'{change["continuation_lines"]} continuation line(s) '
                  f'joined')
            print(f'     Before: {original_preview}...')
            fixed_preview = change['fixed'][:120]
            print(f'     After:  {fixed_preview}...')

        if args.apply:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print(f'   ✅ Fixed!')

    print(f'\n{"=" * 60}')
    print(f'Summary: {total_rows_fixed} row(s) in '
          f'{total_files_fixed} file(s) '
          f'{"fixed" if args.apply else "would be fixed (dry run)"}')
    if not args.apply and total_files_fixed > 0:
        print('Run with --apply to apply the fixes.')


if __name__ == '__main__':
    main()
