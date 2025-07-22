/**
 * ZK Documentation Image Checker
 * 
 * Purpose: Validates all images referenced in the ZK documentation site by:
 * - Reading all markdown files in the documentation directories
 * - Extracting image references from markdown content
 * - Checking file system existence for each image
 * - Generating a detailed report of broken images
 * 
 * Usage:
 *   node check-images.js
 * 
 * Prerequisites:
 *   - npm dependencies installed (js-yaml)
 * 
 * Output:
 *   - Console output with real-time progress
 *   - Detailed report saved to 'image-check-report.txt'
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DOCUMENTATION_ROOT = path.resolve(__dirname, '..');
const NAVIGATION_FILE = path.join(DOCUMENTATION_ROOT, '_data/navigation.yml');
const REPORT_FILE = 'image-check-report.txt';

// Documentation directories to scan for markdown files
const DOC_DIRECTORIES = [
    'get_started',
    'zk_essentials',
    'zk_dev_ref',
    'zk_mvvm_ref',
    'zk_component_ref',
    'zuml_ref',
    'zk_installation_guide',
    'zk_config_ref',
    'zk_studio_essentials',
    'zk_calendar_essentials',
    'zats_essentials',
    'zk_charts_essentials',
    'zk_pivottable_essentials',
    'zk_spreadsheet_essentials'
];

// Function to recursively find all markdown files in a directory
function findMarkdownFiles(dirPath) {
    const markdownFiles = [];
    
    if (!fs.existsSync(dirPath)) {
        return markdownFiles;
    }
    
    function scanDirectory(dir) {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
            const itemPath = path.join(dir, item);
            const stat = fs.statSync(itemPath);
            
            if (stat.isDirectory()) {
                scanDirectory(itemPath);
            } else if (item.endsWith('.md')) {
                markdownFiles.push(itemPath);
            }
        }
    }
    
    scanDirectory(dirPath);
    return markdownFiles;
}

// Function to extract image references from markdown content
function extractImageReferences(markdownContent) {
    const images = [];
    
    // Match markdown image syntax: ![alt text](image_path)
    const markdownImageRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
    
    // Match HTML img tags: <img src="image_path" ... />
    const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    
    let match;
    
    // Extract markdown images
    while ((match = markdownImageRegex.exec(markdownContent)) !== null) {
        const imagePath = match[1];
        // Skip external URLs and data URLs
        if (!imagePath.startsWith('http') && !imagePath.startsWith('data:')) {
            images.push(imagePath);
        }
    }
    
    // Extract HTML img tags
    while ((match = htmlImageRegex.exec(markdownContent)) !== null) {
        const imagePath = match[1];
        // Skip external URLs and data URLs
        if (!imagePath.startsWith('http') && !imagePath.startsWith('data:')) {
            images.push(imagePath);
        }
    }
    
    return images;
}

// Function to resolve image path relative to the documentation root
function resolveImagePath(imagePath, markdownFilePath) {
    // Clean the image path by removing Jekyll template variables
    let cleanPath = imagePath;
    let wasBaseUrlPath = false;
    
    // Remove {{site.baseurl}} prefix - this is a Jekyll template variable that gets replaced at build time
    if (cleanPath.startsWith('{{site.baseurl}}/')) {
        cleanPath = cleanPath.replace('{{site.baseurl}}/', '');
        wasBaseUrlPath = true;
    }
    
    // Remove any other Jekyll template variables that might interfere
    cleanPath = cleanPath.replace(/\{\{[^}]*\}\}/g, '');
    
    // If image path starts with / OR was a {{site.baseurl}} path, it's relative to documentation root
    if (cleanPath.startsWith('/') || wasBaseUrlPath) {
        const rootRelativePath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
        return path.join(DOCUMENTATION_ROOT, rootRelativePath);
    }
    
    // Otherwise, it's relative to the markdown file
    const markdownDir = path.dirname(markdownFilePath);
    return path.resolve(markdownDir, cleanPath);
}

// Function to check if an image file exists
function checkImageExists(imagePath) {
    try {
        return fs.existsSync(imagePath) && fs.statSync(imagePath).isFile();
    } catch (error) {
        return false;
    }
}

// Function to check images in a single markdown file
function checkImagesInFile(markdownFilePath) {
    const brokenImages = [];
    const allImages = [];
    
    try {
        const content = fs.readFileSync(markdownFilePath, 'utf8');
        const imageReferences = extractImageReferences(content);
        
        for (const imageRef of imageReferences) {
            const resolvedPath = resolveImagePath(imageRef, markdownFilePath);
            const exists = checkImageExists(resolvedPath);
            
            allImages.push({
                reference: imageRef,
                resolvedPath: resolvedPath,
                exists: exists
            });
            
            if (!exists) {
                brokenImages.push({
                    reference: imageRef,
                    resolvedPath: resolvedPath,
                    status: 'Not Found'
                });
                
                console.log(`Broken image in ${path.relative(DOCUMENTATION_ROOT, markdownFilePath)}: ${imageRef}`);
            }
        }
        
        return {
            filePath: markdownFilePath,
            relativeFilePath: path.relative(DOCUMENTATION_ROOT, markdownFilePath),
            totalImages: allImages.length,
            brokenImages: brokenImages,
            allImages: allImages
        };
        
    } catch (error) {
        console.error(`Error reading file ${markdownFilePath}:`, error.message);
        return {
            filePath: markdownFilePath,
            relativeFilePath: path.relative(DOCUMENTATION_ROOT, markdownFilePath),
            totalImages: 0,
            brokenImages: [],
            allImages: [],
            error: error.message
        };
    }
}

// Function to get page URL from file path for navigation matching
function getPageUrlFromFilePath(filePath) {
    const relativePath = path.relative(DOCUMENTATION_ROOT, filePath);
    const withoutExtension = relativePath.replace(/\.md$/, '');
    return '/' + withoutExtension.replace(/\\/g, '/');
}

// Function to extract all URLs from navigation data (for reference)
function extractUrls(data) {
    const urls = new Set();
    
    function processItem(item) {
        if (item.url) {
            urls.add(item.url);
        }
        if (item.children) {
            item.children.forEach(processItem);
        }
    }
    
    Object.values(data).forEach(section => {
        section.forEach(processItem);
    });
    
    return Array.from(urls);
}

// Function to generate detailed report content
function generateReport(results, pagesWithBrokenImages, totalBrokenImages, navigationUrls) {
    const timestamp = new Date().toISOString();
    let report = `ZK Documentation Image Check Report\n`;
    report += `Generated: ${timestamp}\n`;
    report += `${'='.repeat(50)}\n\n`;
    
    // Summary section
    report += `SUMMARY:\n`;
    report += `Total pages checked: ${results.length}\n`;
    report += `Pages with broken images: ${pagesWithBrokenImages.length}\n`;
    report += `Total broken images found: ${totalBrokenImages}\n`;
    report += `Success rate: ${((results.length - pagesWithBrokenImages.length) / results.length * 100).toFixed(1)}%\n\n`;
    
    if (pagesWithBrokenImages.length > 0) {
        report += `DETAILED BROKEN IMAGE REPORT:\n`;
        report += `${'='.repeat(30)}\n\n`;
        
        pagesWithBrokenImages.forEach(page => {
            const pageUrl = getPageUrlFromFilePath(page.filePath);
            report += `Page: ${pageUrl}\n`;
            report += `File: ${page.relativeFilePath}\n`;
            report += `Broken images: ${page.brokenImages.length}\n`;
            page.brokenImages.forEach(img => {
                report += `  - ${img.reference} (Status: ${img.status})\n`;
            });
            report += `\n`;
        });
    } else {
        report += `✅ No broken images found! All images are accessible.\n`;
    }
    
    // Additional statistics
    report += `\nSTATISTICS:\n`;
    report += `${'='.repeat(15)}\n`;
    const totalImages = results.reduce((sum, r) => sum + r.totalImages, 0);
    report += `Total images checked: ${totalImages}\n`;
    report += `Average images per page: ${(totalImages / results.length).toFixed(1)}\n`;
    
    // Files with errors
    const filesWithErrors = results.filter(r => r.error);
    if (filesWithErrors.length > 0) {
        report += `\nFILES WITH ERRORS:\n`;
        report += `${'='.repeat(20)}\n`;
        filesWithErrors.forEach(file => {
            report += `${file.relativeFilePath}: ${file.error}\n`;
        });
    }
    
    return report;
}

// Main function
async function main() {
    console.log('Starting ZK Documentation Image Check...\n');
    
    try {
        // Read navigation.yml for reference (optional)
        let navigationUrls = [];
        if (fs.existsSync(NAVIGATION_FILE)) {
            const navigationData = yaml.load(fs.readFileSync(NAVIGATION_FILE, 'utf8'));
            navigationUrls = extractUrls(navigationData);
            console.log(`Found ${navigationUrls.length} URLs in navigation.yml`);
        }
        
        // Find all markdown files in documentation directories
        const allMarkdownFiles = [];
        for (const docDir of DOC_DIRECTORIES) {
            const dirPath = path.join(DOCUMENTATION_ROOT, docDir);
            const markdownFiles = findMarkdownFiles(dirPath);
            allMarkdownFiles.push(...markdownFiles);
            console.log(`Found ${markdownFiles.length} markdown files in ${docDir}/`);
        }
        
        console.log(`\nTotal markdown files to check: ${allMarkdownFiles.length}\n`);
        
        // Check images in each markdown file
        const results = [];
        for (const filePath of allMarkdownFiles) {
            const relativeFilePath = path.relative(DOCUMENTATION_ROOT, filePath);
            console.log(`Checking: ${relativeFilePath}`);
            const result = checkImagesInFile(filePath);
            results.push(result);
        }
        
        // Generate summary data
        const pagesWithBrokenImages = results.filter(r => r.brokenImages.length > 0);
        const totalBrokenImages = results.reduce((sum, r) => sum + r.brokenImages.length, 0);
        
        // Generate report content
        const reportContent = generateReport(results, pagesWithBrokenImages, totalBrokenImages, navigationUrls);
        
        // Save report to file
        fs.writeFileSync(REPORT_FILE, reportContent);
        
        // Print summary to console
        console.log('\n' + '='.repeat(50));
        console.log('SUMMARY:');
        console.log(`Total files checked: ${results.length}`);
        console.log(`Files with broken images: ${pagesWithBrokenImages.length}`);
        console.log(`Total broken images found: ${totalBrokenImages}`);
        console.log(`Success rate: ${((results.length - pagesWithBrokenImages.length) / results.length * 100).toFixed(1)}%`);
        console.log(`\nDetailed report saved to: ${REPORT_FILE}`);
        
        if (pagesWithBrokenImages.length > 0) {
            console.log('\nFiles with broken images:');
            pagesWithBrokenImages.forEach(page => {
                console.log(`\n${page.relativeFilePath}:`);
                page.brokenImages.forEach(img => console.log(`  - ${img.reference} (${img.status})`));
            });
        } else {
            console.log('\n✅ No broken images found! All images are accessible.');
        }
        
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();