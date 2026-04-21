#!/usr/bin/env node

/**
 * Fix Missing "Since x.y.z" Version Marks
 *
 * Purpose: Read the missing-since-marks.json report and automatically add
 * {% include supported-since.html version="x.y.z" %} to the corresponding
 * markdown files in zk_config_ref/.
 *
 * Process:
 * 1. Read missing-since-marks.json
 * 2. Group entries by md file
 * 3. For each file, determine the correct insertion point
 * 4. Insert the supported-since include
 * 5. Report changes and any entries needing manual review
 *
 * Usage:
 *   node fix-missing-since-marks.js [--dry-run] [--verbose]
 *
 * Options:
 *   --dry-run  Show what would be changed without modifying files
 *   --verbose  Show detailed progress
 */

const fs = require('fs');
const path = require('path');

const ZK_CONFIG_REF_DIR = path.join(__dirname, '..', 'zk_config_ref');
const JSON_FILE = path.join(__dirname, 'missing-since-marks.json');

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

/**
 * Check if a file already has a specific version mark
 */
function fileHasVersion(content, version) {
  const patterns = [
    new RegExp(`supported-since\\.html\\s+version=["']${escapeRegex(version)}["']`, 'i'),
    new RegExp(`\\[Since\\s+(?:ZK\\s+)?${escapeRegex(version)}\\]`, 'i'),
  ];
  return patterns.some(p => p.test(content));
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Find the insertion point for the supported-since include.
 * Returns {lineIndex, context} where lineIndex is the 0-based line index
 * AFTER which to insert.
 */
function findInsertionPoint(lines) {
  let frontMatterEnd = -1;
  let defaultLineIdx = -1;
  let globalScopeIdx = -1;
  let propertyNameIdx = -1;
  let syntaxBlockEnd = -1;
  let optionalLineIdx = -1;

  let inFrontMatter = false;
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Track front matter
    if (i === 0 && line === '---') {
      inFrontMatter = true;
      continue;
    }
    if (inFrontMatter && line === '---') {
      frontMatterEnd = i;
      inFrontMatter = false;
      continue;
    }

    // Track code blocks
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      if (!inCodeBlock) {
        syntaxBlockEnd = i;
      }
      continue;
    }
    if (inCodeBlock) continue;

    // Look for Default: pattern (various formats)
    if (/^`?(?:\[)?Default:/i.test(line) || /^Default:/i.test(line)) {
      defaultLineIdx = i;
    }

    // Look for global-scope-only include
    if (line.includes('global-scope-only.html')) {
      globalScopeIdx = i;
    }

    // Look for [Optional] pattern
    if (line === '`[Optional]`' || line === '[Optional]') {
      optionalLineIdx = i;
    }

    // Look for property/listener name in backticks (after **Property:** or **Listener:**)
    if (/^`[a-z]/i.test(line) && !line.includes('Default') && i > frontMatterEnd) {
      if (i > 0 && lines.slice(Math.max(0, i - 3), i).some(l =>
          /^\*\*(Property|Listener|Class):?\*\*/.test(l.trim()))) {
        propertyNameIdx = i;
      }
    }
  }

  // Determine the best insertion point
  // Priority: whichever of Default or global-scope-only comes later
  const metadataEnd = Math.max(defaultLineIdx, globalScopeIdx);

  if (metadataEnd >= 0) {
    return {lineIndex: metadataEnd, context: 'after metadata'};
  }

  if (optionalLineIdx >= 0) {
    return {lineIndex: optionalLineIdx, context: 'after [Optional]'};
  }

  if (propertyNameIdx >= 0) {
    return {lineIndex: propertyNameIdx, context: 'after property name'};
  }

  // Fall back to after front matter
  if (frontMatterEnd >= 0) {
    // Skip past any blank lines and **Property:** / **Syntax:** / **Listener:** header
    let insertIdx = frontMatterEnd;
    for (let i = frontMatterEnd + 1; i < lines.length && i < frontMatterEnd + 15; i++) {
      const line = lines[i].trim();
      if (line === '' || /^\*\*(Property|Syntax|Listener|Class):?\*\*/.test(line)) {
        insertIdx = i;
        continue;
      }
      // If we hit a code block or backtick property name, include it
      if (line.startsWith('```') || (line.startsWith('`') && !line.includes('Default'))) {
        // Skip the code block
        if (line.startsWith('```')) {
          let j = i + 1;
          while (j < lines.length && !lines[j].trim().startsWith('```')) j++;
          insertIdx = j;
          i = j;
          continue;
        }
        insertIdx = i;
        continue;
      }
      break;
    }
    return {lineIndex: insertIdx, context: 'after front matter block'};
  }

  return null;
}

/**
 * Insert the supported-since include at the computed position.
 * Also handles removing old "Version History" section entries if they match.
 */
function insertSinceMark(lines, insertionPoint, version) {
  const idx = insertionPoint.lineIndex;
  const sinceInclude = `{% include supported-since.html version="${version}" %}`;

  // Check if the next non-blank line already has content that should be separated
  const result = [...lines];

  // Determine if we need blank lines around the insertion
  const prevLine = result[idx] ? result[idx].trim() : '';
  const nextLine = result[idx + 1] ? result[idx + 1].trim() : '';

  // If the current line has content (not blank), insert after it with proper spacing
  if (prevLine !== '' && !prevLine.startsWith('```')) {
    // If the previous line is a Default line, append the since mark on the next line
    if (nextLine === '') {
      // There's already a blank line after, insert between
      result.splice(idx + 1, 0, sinceInclude);
    } else {
      // No blank line, insert with a blank line after
      result.splice(idx + 1, 0, sinceInclude, '');
    }
  } else {
    // Previous line is blank, just insert
    result.splice(idx + 1, 0, sinceInclude);
  }

  return result;
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60));
  console.log('Fix Missing "Since x.y.z" Version Marks');
  if (DRY_RUN) console.log('(DRY RUN MODE - no files will be modified)');
  console.log('='.repeat(60) + '\n');

  // Read the JSON report
  if (!fs.existsSync(JSON_FILE)) {
    console.error(`Report file not found: ${JSON_FILE}`);
    console.error('Run "node check-missing-since-marks.js --save" first.');
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));
  console.log(`Report timestamp: ${report.timestamp}`);
  console.log(`Entries to process: ${report.missingMarks.length}\n`);

  // Group by md file
  const byFile = {};
  for (const entry of report.missingMarks) {
    if (!byFile[entry.mdFile]) {
      byFile[entry.mdFile] = [];
    }
    byFile[entry.mdFile].push(entry);
  }

  const fixed = [];
  const skipped = [];
  const manualReview = [];
  const errors = [];

  for (const [mdFile, entries] of Object.entries(byFile)) {
    const filePath = path.join(ZK_CONFIG_REF_DIR, mdFile);

    if (!fs.existsSync(filePath)) {
      errors.push({mdFile, reason: 'File not found'});
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    let lines = content.split('\n');
    let modified = false;

    // Sort versions: earliest first
    const versions = entries
      .map(e => e.missingVersion)
      .filter((v, i, arr) => arr.indexOf(v) === i);

    // Check which versions are still missing
    const stillMissing = versions.filter(v => !fileHasVersion(content, v));

    if (stillMissing.length === 0) {
      skipped.push({mdFile, reason: 'All versions already present'});
      if (VERBOSE) console.log(`  SKIP: ${mdFile} - already has all versions`);
      continue;
    }

    // For the primary version (page-level), insert at standard position
    // Take the earliest version that would be "Since X.Y.Z" at page level
    const sortedVersions = stillMissing.sort((a, b) => {
      const pa = a.split('.').map(Number);
      const pb = b.split('.').map(Number);
      for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const va = pa[i] || 0;
        const vb = pb[i] || 0;
        if (va !== vb) return va - vb;
      }
      return 0;
    });

    // Check if the file has no front matter (special case - needs manual review)
    const hasFrontMatter = lines[0] && lines[0].trim() === '---';
    if (!hasFrontMatter) {
      manualReview.push({
        mdFile,
        versions: sortedVersions,
        reason: 'No front matter - complex page structure',
        wikiUrl: entries[0].wikiUrl,
      });
      continue;
    }

    const insertionPoint = findInsertionPoint(lines);
    if (!insertionPoint) {
      manualReview.push({
        mdFile,
        versions: sortedVersions,
        reason: 'Could not determine insertion point',
        wikiUrl: entries[0].wikiUrl,
      });
      continue;
    }

    // Insert the primary (earliest) version at the standard position
    const primaryVersion = sortedVersions[0];
    lines = insertSinceMark(lines, insertionPoint, primaryVersion);
    modified = true;

    fixed.push({
      mdFile,
      version: primaryVersion,
      position: insertionPoint.context,
      lineNumber: insertionPoint.lineIndex + 2, // 1-based, after insertion
    });

    if (VERBOSE) {
      console.log(`  FIX: ${mdFile} - Since ${primaryVersion} ` +
        `(${insertionPoint.context}, line ${insertionPoint.lineIndex + 2})`);
    }

    // If there are additional versions, flag them for manual review
    if (sortedVersions.length > 1) {
      const additionalVersions = sortedVersions.slice(1);
      manualReview.push({
        mdFile,
        versions: additionalVersions,
        reason: 'Additional feature-level versions need manual placement',
        wikiUrl: entries[0].wikiUrl,
        note: `Primary version ${primaryVersion} was auto-inserted`,
      });
    }

    // Write the modified file
    if (modified && !DRY_RUN) {
      fs.writeFileSync(filePath, lines.join('\n'));
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files fixed: ${fixed.length}`);
  console.log(`Files skipped (already done): ${skipped.length}`);
  console.log(`Files needing manual review: ${manualReview.length}`);
  console.log(`Errors: ${errors.length}`);

  if (fixed.length > 0) {
    console.log('\n--- Fixed Files ---\n');
    console.log('| MD File | Version | Position |');
    console.log('|---------|---------|----------|');
    for (const item of fixed) {
      console.log(`| ${item.mdFile} | ${item.version} | ${item.position} (line ${item.lineNumber}) |`);
    }
  }

  if (manualReview.length > 0) {
    console.log('\n--- Manual Review Needed ---\n');
    for (const item of manualReview) {
      console.log(`- ${item.mdFile}`);
      console.log(`  Versions: ${item.versions.join(', ')}`);
      console.log(`  Reason: ${item.reason}`);
      if (item.note) console.log(`  Note: ${item.note}`);
      console.log(`  Wiki: ${item.wikiUrl}`);
    }
  }

  if (skipped.length > 0 && VERBOSE) {
    console.log('\n--- Skipped Files ---\n');
    for (const item of skipped) {
      console.log(`- ${item.mdFile}: ${item.reason}`);
    }
  }

  if (errors.length > 0) {
    console.log('\n--- Errors ---\n');
    for (const item of errors) {
      console.log(`- ${item.mdFile}: ${item.reason}`);
    }
  }

  console.log(`\n${DRY_RUN ? '(No files were modified - dry run)' : 'Done!'}`);
}

main();
