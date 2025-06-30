const fs = require('fs');
const yaml = require('js-yaml');
const axios = require('axios');

const BASE_URL = 'https://docs.zkoss.org';
const NAVIGATION_FILE = '_data/navigation.yml';

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

// Function to check if a URL returns 404
async function checkUrl(url) {
    try {
        const fullUrl = `${BASE_URL}${url}`;
        // Use HEAD instead of GET for faster checking
        const response = await axios.head(fullUrl);
        return {
            url,
            status: response.status,
            is404: false
        };
    } catch (error) {
        const status = error.response && error.response.status ? error.response.status : 'ERROR';
        return {
            url,
            status: status,
            is404: status === 404
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
        console.log(`Found ${urls.length} URLs to check...`);
        
        // Check each URL
        const results = [];
        for (const url of urls) {
            const result = await checkUrl(url);
            results.push(result);
            if (result.is404) {
                console.log(`404 Error: ${url}`);
            }
        }
        
        // Print summary
        const brokenLinks = results.filter(r => r.is404);
        console.log('\nSummary:');
        console.log(`Total URLs checked: ${results.length}`);
        console.log(`Broken links (404): ${brokenLinks.length}`);
        
        if (brokenLinks.length > 0) {
            console.log('\nBroken links:');
            brokenLinks.forEach(link => console.log(`- ${link.url}`));
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();