#!/usr/bin/env node

/**
 * Check Missing "Since x.y.z" Version Marks
 *
 * Purpose: Cross-reference ZK Configuration Reference wiki pages with local
 * markdown files to find missing version marks.
 *
 * Process:
 * 1. Fetch the wiki index page to get all configuration reference URLs
 * 2. For each wiki page, fetch and extract "Since x.y.z" marks
 * 3. Map wiki URLs to corresponding local md files
 * 4. Check if md files have the same version marks
 * 5. Generate a report of missing marks
 *
 * Usage:
 *   node check-missing-since-marks.js [--save]
 *
 * Options:
 *   --save    Save results to JSON file
 *   --verbose Show detailed progress
 *
 * Dependencies:
 *   npm install axios cheerio
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const WIKI_BASE_URL = 'https://www.zkoss.org/wiki/';
const WIKI_INDEX_URL = WIKI_BASE_URL + 'ZK_Configuration_Reference';
const ZK_CONFIG_REF_DIR = path.join(__dirname, '..', 'zk_config_ref');

const SAVE_RESULTS = process.argv.includes('--save');
const VERBOSE = process.argv.includes('--verbose');

// Rate limiting
const REQUEST_DELAY = 500; // ms between requests
const MAX_RETRIES = 3;

/**
 * Sleep for a specified duration
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch a URL with retry logic
 */
async function fetchWithRetry(url, retries = MAX_RETRIES) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.get(url, {
                timeout: 15000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; ZK-DocChecker/1.0)'
                }
            });
            return response.data;
        } catch (error) {
            if (attempt === retries) {
                throw error;
            }
            console.log(`  Retry ${attempt}/${retries} for ${url}`);
            await sleep(1000 * attempt);
        }
    }
}

/**
 * Extract all configuration reference page links from the wiki index
 */
async function getWikiPageLinks() {
    console.log('Fetching wiki index page...');
    const html = await fetchWithRetry(WIKI_INDEX_URL);
    const $ = cheerio.load(html);

    const links = new Set();

    // Find all links in the page - wiki uses spaces in URLs
    $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href) {
            // Match both "/wiki/ZK Configuration Reference/" and "/wiki/ZK_Configuration_Reference/"
            if (href.startsWith('/wiki/ZK Configuration Reference/') ||
                href.startsWith('/wiki/ZK_Configuration_Reference/')) {
                // Convert to full URL, encoding spaces
                const fullUrl = 'https://www.zkoss.org' + href.replace(/ /g, '_');
                links.add(fullUrl);
            }
        }
    });

    console.log(`Found ${links.size} wiki pages to check\n`);
    return Array.from(links);
}

/**
 * Extract "Since x.y.z" version marks from wiki page content
 */
function extractSinceMarks(html) {
    const $ = cheerio.load(html);
    const marks = [];

    // Get text content from the main parser output
    const content = $('.mw-parser-output').text();

    // Match various patterns for "Since" marks
    // Pattern 1: "Since X.Y.Z" or "Since ZK X.Y.Z"
    const sincePattern = /Since\s+(?:ZK\s+)?(\d+\.\d+(?:\.\d+)?)/gi;
    let match;

    while ((match = sincePattern.exec(content)) !== null) {
        marks.push(match[1]);
    }

    // Pattern 2: Look in specific wiki markup patterns like [Since X.Y.Z]
    const bracketPattern = /\[Since\s+(?:ZK\s+)?(\d+\.\d+(?:\.\d+)?)\]/gi;
    while ((match = bracketPattern.exec(content)) !== null) {
        if (!marks.includes(match[1])) {
            marks.push(match[1]);
        }
    }

    return [...new Set(marks)]; // Remove duplicates
}

/**
 * Map wiki URL to local markdown file path
 */
function wikiUrlToMdFile(wikiUrl) {
    // Extract the path after ZK_Configuration_Reference/
    const urlPath = wikiUrl.replace('https://www.zkoss.org/wiki/ZK_Configuration_Reference/', '');

    // Get the last segment (the actual page name)
    const segments = urlPath.split('/');
    const pageName = segments[segments.length - 1];

    // Handle different naming patterns
    let mdFileName;

    if (pageName.startsWith('The_') && pageName.endsWith('_Element')) {
        // Element pages: The_xxx_Element -> the_xxx_element.md
        mdFileName = pageName.toLowerCase().replace(/-/g, '_') + '.md';
    } else if (pageName.includes('.')) {
        // Property pages: org.zkoss.xxx -> org_zkoss_xxx.md
        mdFileName = pageName.toLowerCase().replace(/\./g, '_') + '.md';
    } else {
        // Other pages
        mdFileName = pageName.toLowerCase().replace(/-/g, '_').replace(/ /g, '_') + '.md';
    }

    return mdFileName;
}

/**
 * Check if a markdown file contains a specific version mark
 */
function mdFileHasVersion(mdFilePath, version) {
    if (!fs.existsSync(mdFilePath)) {
        return { exists: false, hasVersion: false };
    }

    const content = fs.readFileSync(mdFilePath, 'utf-8');

    // Check for Jekyll include pattern
    const includePattern = new RegExp(`supported-since\\.html\\s+version=["']${version}["']`, 'i');
    if (includePattern.test(content)) {
        return { exists: true, hasVersion: true };
    }

    // Check for inline pattern [Since ZK X.Y.Z]
    const inlinePattern = new RegExp(`\\[Since\\s+(?:ZK\\s+)?${version}\\]`, 'i');
    if (inlinePattern.test(content)) {
        return { exists: true, hasVersion: true };
    }

    // Check for plain "Since X.Y.Z" text
    const plainPattern = new RegExp(`Since\\s+(?:ZK\\s+)?${version}`, 'i');
    if (plainPattern.test(content)) {
        return { exists: true, hasVersion: true };
    }

    return { exists: true, hasVersion: false };
}

/**
 * Find the actual md file that might match (fuzzy matching)
 */
function findMatchingMdFile(mdFileName) {
    const files = fs.readdirSync(ZK_CONFIG_REF_DIR);

    // Exact match first
    if (files.includes(mdFileName)) {
        return mdFileName;
    }

    // Try variations
    const baseName = mdFileName.replace('.md', '');

    // Try with different separators
    const variations = [
        baseName + '.md',
        baseName.replace(/_/g, '-') + '.md',
        baseName.replace(/-/g, '_') + '.md',
    ];

    for (const variant of variations) {
        if (files.includes(variant)) {
            return variant;
        }
    }

    // Try partial match (for cases like "the_auto_resend_timeout_element" vs "the_auto-resend-timeout_element")
    const normalizedBase = baseName.replace(/[-_]/g, '');
    for (const file of files) {
        const normalizedFile = file.replace('.md', '').replace(/[-_]/g, '');
        if (normalizedFile === normalizedBase) {
            return file;
        }
    }

    return null;
}

/**
 * Main function to check all wiki pages
 */
async function main() {
    console.log('='.repeat(60));
    console.log('Checking Missing "Since x.y.z" Version Marks');
    console.log('='.repeat(60) + '\n');

    const wikiLinks = await getWikiPageLinks();
    const missingMarks = [];
    const noMatchFiles = [];
    let processed = 0;

    for (const wikiUrl of wikiLinks) {
        processed++;
        const progress = `[${processed}/${wikiLinks.length}]`;

        if (VERBOSE) {
            console.log(`${progress} Checking: ${wikiUrl}`);
        }

        try {
            // Fetch wiki page
            const html = await fetchWithRetry(wikiUrl);
            const wikiVersions = extractSinceMarks(html);

            if (wikiVersions.length === 0) {
                if (VERBOSE) {
                    console.log(`  No version marks found on wiki page`);
                }
                await sleep(REQUEST_DELAY);
                continue;
            }

            // Map to local file
            const expectedMdFile = wikiUrlToMdFile(wikiUrl);
            const actualMdFile = findMatchingMdFile(expectedMdFile);

            if (!actualMdFile) {
                noMatchFiles.push({
                    wikiUrl,
                    expectedMdFile,
                    wikiVersions
                });
                if (VERBOSE) {
                    console.log(`  No matching MD file found (expected: ${expectedMdFile})`);
                }
                await sleep(REQUEST_DELAY);
                continue;
            }

            const mdFilePath = path.join(ZK_CONFIG_REF_DIR, actualMdFile);

            // Check each version
            for (const version of wikiVersions) {
                const result = mdFileHasVersion(mdFilePath, version);

                if (result.exists && !result.hasVersion) {
                    missingMarks.push({
                        wikiUrl,
                        mdFile: actualMdFile,
                        missingVersion: version
                    });
                    console.log(`${progress} MISSING: ${actualMdFile} - Since ${version}`);
                }
            }

            await sleep(REQUEST_DELAY);

        } catch (error) {
            console.error(`${progress} ERROR: ${wikiUrl} - ${error.message}`);
        }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total wiki pages checked: ${processed}`);
    console.log(`Missing version marks: ${missingMarks.length}`);
    console.log(`Files with no MD match: ${noMatchFiles.length}`);

    if (missingMarks.length > 0) {
        console.log('\n--- Missing Version Marks ---\n');
        console.log('| Wiki Page | MD File | Missing Version |');
        console.log('|-----------|---------|-----------------|');
        for (const item of missingMarks) {
            const shortUrl = item.wikiUrl.replace('https://www.zkoss.org/wiki/', '');
            console.log(`| ${shortUrl} | ${item.mdFile} | Since ${item.missingVersion} |`);
        }
    }

    if (noMatchFiles.length > 0 && VERBOSE) {
        console.log('\n--- No Matching MD Files ---\n');
        for (const item of noMatchFiles) {
            console.log(`- ${item.wikiUrl}`);
            console.log(`  Expected: ${item.expectedMdFile}`);
            console.log(`  Wiki versions: ${item.wikiVersions.join(', ')}`);
        }
    }

    // Save results if requested
    if (SAVE_RESULTS) {
        const outputPath = path.join(__dirname, 'missing-since-marks.json');
        const results = {
            timestamp: new Date().toISOString(),
            summary: {
                totalChecked: processed,
                missingMarks: missingMarks.length,
                noMatchFiles: noMatchFiles.length
            },
            missingMarks,
            noMatchFiles
        };
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        console.log(`\nResults saved to: ${outputPath}`);
    }
}

// Run the main function
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
