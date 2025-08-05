#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const glob = require('glob');

/**
 * Node.js script to add page.title in front matter for pages that don't have a 1st-level header.
 * The title values reference _data/navigation.yml
 * Scans all *.md files in all books
 */

// Configuration
const ROOT_DIR = path.resolve(__dirname, '..');
const NAVIGATION_FILE = path.join(ROOT_DIR, '_data/navigation.yml');
const DRY_RUN = process.argv.includes('--dry-run');

console.log('ZK Documentation Page Title Updater');
console.log('====================================');
console.log(`Root directory: ${ROOT_DIR}`);
console.log(`Navigation file: ${NAVIGATION_FILE}`);
console.log(`Dry run mode: ${DRY_RUN ? 'ON' : 'OFF'}`);
console.log('');

/**
 * Load and parse navigation.yml
 */
function loadNavigation() {
    try {
        const content = fs.readFileSync(NAVIGATION_FILE, 'utf8');
        return yaml.load(content);
    } catch (error) {
        console.error(`Error loading navigation.yml: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Extract all navigation entries with their URLs and titles
 */
function extractNavigationEntries(nav, entries = []) {
    if (Array.isArray(nav)) {
        nav.forEach(item => {
            if (item.url && item.title) {
                // Normalize URL to match file path
                let url = item.url;
                if (url.startsWith('/')) url = url.substring(1);
                if (!url.endsWith('.md')) url += '.md';
                
                entries.push({
                    url: url,
                    title: item.title,
                    originalUrl: item.url
                });
            }
            if (item.children) {
                extractNavigationEntries(item.children, entries);
            }
        });
    } else if (typeof nav === 'object') {
        Object.values(nav).forEach(section => {
            extractNavigationEntries(section, entries);
        });
    }
    return entries;
}

/**
 * Check if a markdown file has a first-level header
 */
function hasFirstLevelHeader(content) {
    const lines = content.split('\n');
    
    // Skip front matter
    let inFrontMatter = false;
    let frontMatterEnd = false;
    
    for (const line of lines) {
        if (line.trim() === '---') {
            if (!inFrontMatter) {
                inFrontMatter = true;
                continue;
            } else if (inFrontMatter && !frontMatterEnd) {
                frontMatterEnd = true;
                continue;
            }
        }
        
        if (inFrontMatter && !frontMatterEnd) {
            continue;
        }
        
        // Check for first-level header
        if (line.trim().startsWith('# ') && line.trim().length > 2) {
            return true;
        }
        
        // Skip empty lines and comments
        if (line.trim() === '' || line.trim().startsWith('<!--')) {
            continue;
        }
        
        // If we reach non-empty content that's not a header, stop looking
        if (line.trim() !== '') {
            break;
        }
    }
    
    return false;
}

/**
 * Check if a markdown file already has a title in front matter
 */
function hasTitle(content) {
    const lines = content.split('\n');
    
    if (lines[0].trim() !== '---') {
        return false;
    }
    
    let inFrontMatter = true;
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.trim() === '---') {
            break;
        }
        
        if (line.startsWith('title:')) {
            return true;
        }
    }
    
    return false;
}

/**
 * Add title to front matter
 */
function addTitleToFrontMatter(content, title) {
    const lines = content.split('\n');
    
    // Check if there's existing front matter
    if (lines[0].trim() === '---') {
        // Find the end of front matter
        let frontMatterEnd = -1;
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                frontMatterEnd = i;
                break;
            }
        }
        
        if (frontMatterEnd > 0) {
            // Insert title before the closing ---
            lines.splice(frontMatterEnd, 0, `title: "${title}"`);
        }
    } else {
        // No front matter exists, create it
        lines.unshift('---', `title: "${title}"`, '---', '');
    }
    
    return lines.join('\n');
}

/**
 * Find title for a file path from navigation
 */
function findTitleForFile(filePath, navigationEntries) {
    // Convert file path to relative path from root
    const relativePath = path.relative(ROOT_DIR, filePath);
    
    // Try exact match first
    const exactMatch = navigationEntries.find(entry => entry.url === relativePath);
    if (exactMatch) {
        return exactMatch.title;
    }
    
    // Try without .md extension
    const withoutExtension = relativePath.replace(/\.md$/, '');
    const matchWithoutExt = navigationEntries.find(entry => 
        entry.url.replace(/\.md$/, '') === withoutExtension
    );
    if (matchWithoutExt) {
        return matchWithoutExt.title;
    }
    
    // Try matching just the filename
    const filename = path.basename(relativePath);
    const filenameMatch = navigationEntries.find(entry => 
        path.basename(entry.url) === filename
    );
    if (filenameMatch) {
        return filenameMatch.title;
    }
    
    return null;
}

/**
 * Process a single markdown file
 */
function processFile(filePath, navigationEntries) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if already has title
        if (hasTitle(content)) {
            return { status: 'skipped', reason: 'already has title' };
        }
        
        // Skip if has first-level header
        if (hasFirstLevelHeader(content)) {
            return { status: 'skipped', reason: 'has first-level header' };
        }
        
        // Find title from navigation
        const title = findTitleForFile(filePath, navigationEntries);
        if (!title) {
            return { status: 'skipped', reason: 'no title found in navigation' };
        }
        
        // Add title to front matter
        const newContent = addTitleToFrontMatter(content, title);
        
        if (!DRY_RUN) {
            fs.writeFileSync(filePath, newContent, 'utf8');
        }
        
        return { status: 'updated', title: title };
    } catch (error) {
        return { status: 'error', error: error.message };
    }
}

/**
 * Main function
 */
function main() {
    // Load navigation
    console.log('Loading navigation.yml...');
    const navigation = loadNavigation();
    const navigationEntries = extractNavigationEntries(navigation);
    console.log(`Found ${navigationEntries.length} navigation entries`);
    console.log('');
    
    // Find all markdown files
    console.log('Scanning for markdown files...');
    const markdownFiles = glob.sync('**/*.md', {
        cwd: ROOT_DIR,
        ignore: ['node_modules/**', '_site/**', '.git/**', 'tool/**', '_includes/**'],
        absolute: true
    });
    
    console.log(`Found ${markdownFiles.length} markdown files`);
    console.log('');
    
    // Process files
    console.log('Processing files...');
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    
    markdownFiles.forEach(filePath => {
        const relativePath = path.relative(ROOT_DIR, filePath);
        const result = processFile(filePath, navigationEntries);
        
        switch (result.status) {
            case 'updated':
                console.log(`✓ ${relativePath} -> "${result.title}"`);
                updated++;
                break;
            case 'skipped':
                console.log(`- ${relativePath} (${result.reason})`);
                skipped++;
                break;
            case 'error':
                console.log(`✗ ${relativePath} (${result.error})`);
                errors++;
                break;
        }
    });
    
    console.log('');
    console.log('Summary:');
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors: ${errors}`);
    
    if (DRY_RUN) {
        console.log('');
        console.log('This was a dry run. No files were modified.');
        console.log('Run without --dry-run to apply changes.');
    }
}

// Run the script
if (require.main === module) {
    main();
}