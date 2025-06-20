const fs = require('fs');
const yaml = require('js-yaml');
const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'http://localhost:4000';
const NAVIGATION_FILE = '../_data/navigation.yml';

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
        
        // Print summary
        const pagesWithBrokenImages = results.filter(r => r.brokenImages.length > 0);
        const totalBrokenImages = results.reduce((sum, r) => sum + r.brokenImages.length, 0);
        
        console.log('\nSummary:');
        console.log(`Total pages checked: ${results.length}`);
        console.log(`Pages with broken images: ${pagesWithBrokenImages.length}`);
        console.log(`Total broken images found: ${totalBrokenImages}`);
        
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