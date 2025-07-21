/**
 * ZK Wiki Image Retriever
 * 
 * Purpose: Downloads images from ZK Wiki by extracting the highest resolution
 * image URL from MediaWiki pages and downloading the actual image file.
 * 
 * Process:
 * 1. Accept a filename (e.g., ZK5DevRef_GridColumn_span.png)
 * 2. Visit https://www.zkoss.org/wiki/File:[filename]
 * 3. Parse the HTML to find the img element with srcset attribute
 * 4. Extract the full-resolution image URL from srcset
 * 5. Download and save the image locally
 * 
 * Usage:
 *   node wiki-image-retriever.js <filename>
 *   node wiki-image-retriever.js ZK5DevRef_GridColumn_span.png
 * 
 * Dependencies:
 *   npm install axios cheerio
 * 
 * Output:
 *   - Downloads images to ./images/ directory
 *   - Provides detailed progress and error reporting
 *   - Implements 3-attempt verification system
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const WIKI_BASE_URL = 'https://www.zkoss.org/wiki/File:';
const WIKI_IMAGE_BASE = 'https://www.zkoss.org';
const IMAGES_DIR = './images';
const MAX_ATTEMPTS = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Function to build wiki URL from filename
function buildWikiUrl(filename) {
    return WIKI_BASE_URL + encodeURIComponent(filename);
}

// Function to extract image URL from srcset attribute
function extractImageUrl(srcset) {
    if (!srcset) return null;
    
    // Parse srcset to find the highest resolution image
    // Format: "/_w/images/5/5a/ZK5DevRef_GridColumn_span.png 1.5x"
    const parts = srcset.split(',').map(s => s.trim());
    
    // Look for the entry without size suffix (highest resolution)
    for (const part of parts) {
        const match = part.match(/^([^\s]+)\s*$/);
        if (match) {
            return match[1];
        }
    }
    
    // Fallback: take the first URL if no plain URL found
    const firstMatch = parts[0].match(/^([^\s]+)/);
    return firstMatch ? firstMatch[1] : null;
}

// Function to scrape wiki page and extract image URL
async function scrapeWikiPage(filename) {
    const wikiUrl = buildWikiUrl(filename);
    console.log(`Fetching wiki page: ${wikiUrl}`);
    
    try {
        const response = await axios.get(wikiUrl, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; ZK-WikiImageRetriever/1.0)'
            }
        });
        
        const $ = cheerio.load(response.data);
        
        // Find the img element with srcset attribute
        let imgElements = $('img[srcset]');
        
        if (imgElements.length === 0) {
            imgElements = $('img[src]');
            
            if (imgElements.length === 0) {
                throw new Error('No img element with srcset or src found on the page');
            }
        }
        
        // Look for the specific image we want
        let targetImg = null;
        imgElements.each((i, elem) => {
            const alt = $(elem).attr('alt');
            const srcset = $(elem).attr('srcset');
            const src = $(elem).attr('src');
            
            if (alt && alt.includes(filename.replace(/\.[^/.]+$/, ""))) {
                targetImg = { alt, srcset, src };
                return false; // break
            }
        });
        
        if (!targetImg) {
            // Fallback: use the first image
            const firstImg = imgElements.first();
            targetImg = {
                alt: firstImg.attr('alt'),
                srcset: firstImg.attr('srcset'),
                src: firstImg.attr('src')
            };
        }
        
        console.log(`Found image: ${targetImg.alt}`);
        
        // Try to extract URL from srcset first, then fallback to src
        let imageUrl = null;
        if (targetImg.srcset) {
            imageUrl = extractImageUrl(targetImg.srcset);
        }
        
        if (!imageUrl && targetImg.src) {
            imageUrl = targetImg.src;
            console.log('Using src attribute as fallback');
        }
        
        if (!imageUrl) {
            throw new Error('Could not extract image URL from srcset or src');
        }
        
        // Make sure URL is absolute
        const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : WIKI_IMAGE_BASE + imageUrl;
        console.log(`Extracted image URL: ${fullImageUrl}`);
        
        return fullImageUrl;
        
    } catch (error) {
        if (error.response) {
            throw new Error(`HTTP ${error.response.status}: ${error.response.statusText}`);
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout');
        } else {
            throw new Error(`Network error: ${error.message}`);
        }
    }
}

// Function to download image
async function downloadImage(imageUrl, filename) {
    console.log(`Downloading image: ${imageUrl}`);
    
    try {
        const response = await axios.get(imageUrl, {
            responseType: 'stream',
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; ZK-WikiImageRetriever/1.0)'
            }
        });
        
        const outputPath = path.join(IMAGES_DIR, filename);
        const writer = fs.createWriteStream(outputPath);
        
        response.data.pipe(writer);
        
        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log(`Image saved to: ${outputPath}`);
                resolve(outputPath);
            });
            writer.on('error', reject);
        });
        
    } catch (error) {
        if (error.response) {
            throw new Error(`HTTP ${error.response.status}: ${error.response.statusText}`);
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('Download timeout');
        } else {
            throw new Error(`Download error: ${error.message}`);
        }
    }
}

// Function to verify downloaded file
function verifyDownload(outputPath) {
    if (!fs.existsSync(outputPath)) {
        throw new Error('Downloaded file does not exist');
    }
    
    const stats = fs.statSync(outputPath);
    if (stats.size === 0) {
        throw new Error('Downloaded file is empty');
    }
    
    console.log(`Verification successful: ${outputPath} (${stats.size} bytes)`);
    return true;
}

// Main function to retrieve image with retry logic
async function retrieveImage(filename) {
    let lastError = null;
    
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        console.log(`\n--- Attempt ${attempt}/${MAX_ATTEMPTS} ---`);
        
        try {
            // Step 1: Scrape wiki page to get image URL
            const imageUrl = await scrapeWikiPage(filename);
            
            // Step 2: Download the image
            const outputPath = await downloadImage(imageUrl, filename);
            
            // Step 3: Verify the download
            verifyDownload(outputPath);
            
            console.log(`\nSUCCESS: Image retrieved successfully in ${attempt} attempt(s)`);
            return outputPath;
            
        } catch (error) {
            lastError = error;
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt < MAX_ATTEMPTS) {
                console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            }
        }
    }
    
    console.error(`\nFAILED: All ${MAX_ATTEMPTS} attempts failed`);
    console.error(`Last error: ${lastError.message}`);
    throw lastError;
}

// Main execution
async function main() {
    const filename = process.argv[2];
    
    if (!filename) {
        console.error('Usage: node wiki-image-retriever.js <filename>');
        console.error('Example: node wiki-image-retriever.js ZK5DevRef_GridColumn_span.png');
        process.exit(1);
    }
    
    console.log('ZK Wiki Image Retriever');
    console.log('=====================');
    console.log(`Target file: ${filename}`);
    
    try {
        await retrieveImage(filename);
        process.exit(0);
    } catch (error) {
        console.error('\nPlease check the filename and try again.');
        process.exit(1);
    }
}

// Run the program
main();