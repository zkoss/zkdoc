/**
 * ZK Documentation Image Checker
 * 
 * Purpose: Validates all images referenced in the ZK documentation site by:
 * - Extracting all page URLs from navigation.yml
 * - Crawling each page to find image references (img tags and background-image styles)
 * - Testing each image URL to verify it's accessible
 * - Generating a detailed report of broken images
 * 
 * Usage:
 *   node check-images.js
 * 
 * Prerequisites:
 *   - Jekyll development server running on localhost:4000
 *   - npm dependencies installed (js-yaml, axios, cheerio)
 * 
 * Output:
 *   - Console output with real-time progress
 *   - Detailed report saved to 'image-check-report.txt'
 */

const fs = require('fs');
const yaml = require('js-yaml');
const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'http://localhost:4000';
const NAVIGATION_FILE = '_data/navigation.yml';
const REPORT_FILE = 'image-check-report.txt';

// Function to extract all URLs from navigation data
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

// Function to check if an image URL is valid
async function checkImageUrl(imageUrl) {
    try {
        // Handle relative URLs
        const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;
        const response = await axios.get(fullUrl, { responseType: 'arraybuffer' });
        return {
            url: imageUrl,
            status: response.status,
            isBroken: false
        };
    } catch (error) {
        const status = error.response && error.response.status ? error.response.status : 'ERROR';
        return {
            url: imageUrl,
            status: status,
            isBroken: true
        };
    }
}

// Function to extract and check all images from a page
async function checkPageImages(pageUrl) {
    try {
        const fullUrl = `${BASE_URL}${pageUrl}`;
        const response = await axios.get(fullUrl);
        const $ = cheerio.load(response.data);
        
        const imageUrls = new Set();
        
        // Find all img tags
        $('img').each((i, elem) => {
            const src = $(elem).attr('src');
            if (src) imageUrls.add(src);
        });
        
        // Find all background images in style attributes
        $('[style*="background-image"]').each((i, elem) => {
            const style = $(elem).attr('style');
            const match = style.match(/url\(['"]?([^'"()]+)['"]?\)/);
            if (match && match[1]) imageUrls.add(match[1]);
        });
        
        const results = [];
        for (const imageUrl of imageUrls) {
            const result = await checkImageUrl(imageUrl);
            results.push(result);
            if (result.isBroken) {
                console.log(`Broken image on ${pageUrl}: ${imageUrl}`);
            }
        }
        
        return {
            pageUrl,
            totalImages: results.length,
            brokenImages: results.filter(r => r.isBroken)
        };
    } catch (error) {
        console.error(`Error checking page ${pageUrl}:`, error.message);
        return {
            pageUrl,
            totalImages: 0,
            brokenImages: [],
            error: error.message
        };
    }
}

// Function to generate detailed report content
function generateReport(results, pagesWithBrokenImages, totalBrokenImages) {
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
            report += `Page: ${page.pageUrl}\n`;
            report += `Broken images: ${page.brokenImages.length}\n`;
            page.brokenImages.forEach(img => {
                report += `  - ${img.url} (Status: ${img.status})\n`;
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
    
    // Pages with errors
    const pagesWithErrors = results.filter(r => r.error);
    if (pagesWithErrors.length > 0) {
        report += `\nPAGES WITH ERRORS:\n`;
        report += `${'='.repeat(20)}\n`;
        pagesWithErrors.forEach(page => {
            report += `${page.pageUrl}: ${page.error}\n`;
        });
    }
    
    return report;
}

// Main function
async function main() {
    try {
        // Read and parse navigation.yml
        const navigationData = yaml.load(fs.readFileSync(NAVIGATION_FILE, 'utf8'));
        
        // Extract all URLs
        const urls = extractUrls(navigationData);
        console.log(`Found ${urls.length} pages to check...`);
        
        // Check images on each page
        const results = [];
        for (const url of urls) {
            const result = await checkPageImages(url);
            results.push(result);
        }
        
        // Generate summary data
        const pagesWithBrokenImages = results.filter(r => r.brokenImages.length > 0);
        const totalBrokenImages = results.reduce((sum, r) => sum + r.brokenImages.length, 0);
        
        // Generate report content
        const reportContent = generateReport(results, pagesWithBrokenImages, totalBrokenImages);
        
        // Save report to file
        fs.writeFileSync(REPORT_FILE, reportContent);
        
        // Print summary to console
        console.log('\nSummary:');
        console.log(`Total pages checked: ${results.length}`);
        console.log(`Pages with broken images: ${pagesWithBrokenImages.length}`);
        console.log(`Total broken images found: ${totalBrokenImages}`);
        console.log(`\nDetailed report saved to: ${REPORT_FILE}`);
        
        if (pagesWithBrokenImages.length > 0) {
            console.log('\nPages with broken images:');
            pagesWithBrokenImages.forEach(page => {
                console.log(`\n${page.pageUrl}:`);
                page.brokenImages.forEach(img => console.log(`  - ${img.url} (Status: ${img.status})`));
            });
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main(); 