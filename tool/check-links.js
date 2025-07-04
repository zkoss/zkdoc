/**
 * check links in markdown files and navigation.yml.
 * check the target the every link refers to exists or not.
 * if the target is external, check if it returns 404 with HEAD request.
 * if the target is internal (refer to the same website), check if it exists in the navigation.yml.
 * Finally, generate a report of broken links.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const axios = require('axios');

const WEBSITE_BASE_URL = 'https://docs.zkoss.org';
const NAVIGATION_FILE = '_data/navigation.yml';
const MARKDOWN_DIR = process.cwd(); // Use current working directory

// Get book paths from README.md
function getBookPaths() {
    const readmePath = path.join(process.cwd(), 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Extract paths from Books Overview section
    const pathRegex = /Path: (\/[^\/\n]+\/)/g;
    const paths = [];
    let match;
    
    while ((match = pathRegex.exec(readmeContent)) !== null) {
        paths.push(match[1].replace(/\/$/, '')); // Remove trailing slash
    }
    
    return paths;
}

// Function to find markdown files in specific book paths only
function findMarkdownFiles(dir) {
    const bookPaths = getBookPaths();
    let results = [];
    
    // Only search in book directories
    for (const bookPath of bookPaths) {
        const fullPath = path.join(dir, bookPath.substring(1)); // Remove leading slash
        
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
            results = results.concat(findMarkdownFilesRecursive(fullPath));
        }
    }
    
    return results;
}

// Helper function to recursively find markdown files in a directory
function findMarkdownFilesRecursive(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Recursively search directories
            results = results.concat(findMarkdownFilesRecursive(filePath));
        } else if (file.endsWith('.md')) {
            // Add markdown files to results
            results.push(filePath);
        }
    }
    
    return results;
}

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
        const fullUrl = `${WEBSITE_BASE_URL}${url}`;
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

// Function to check if a URL is external
function isExternalUrl(url) {
    return url.startsWith('http://') || url.startsWith('https://');
}

// Function to check if a URL is an image
function isImageUrl(url) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico'];
    const urlLower = url.toLowerCase();
    return imageExtensions.some(ext => urlLower.endsWith(ext));
}

// Function to check external URLs
async function checkExternalUrl(url) {
    try {
        const response = await axios.head(url);
        return {
            url,
            status: response.status,
            is404: false
        };
    } catch (error) {
        // Handle different types of errors
        const status = error.response ? error.response.status : 'CONNECTION_ERROR';
        return {
            url,
            status: status,
            is404: status === 404,
            error: error.message
        };
    }
}

// Function to extract links from markdown content
function extractLinksFromMarkdown(content) {
    const links = new Set();
    
    // Match markdown link syntax [text](url)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = markdownLinkRegex.exec(content)) !== null) {
        const url = match[2].split(' ')[0]; // Remove title if present
        if (!url.startsWith('#')) { // Ignore anchor links
            links.add(url);
        }
    }
    
    // Match plain URLs or URLs in angle brackets
    const plainUrlRegex = /(?:<|^)(https?:\/\/[^\s>]+)(?:>|$)/g;
    while ((match = plainUrlRegex.exec(content)) !== null) {
        links.add(match[1]);
    }
    
    return Array.from(links);
}

// Function to check if an internal URL exists in the valid URLs
function checkInternalUrl(url, validUrls) {
    // Remove any anchor part (#section) from the URL
    let urlWithoutAnchor = url.split('#')[0];
    
    // Remove {{site.baseurl}} if present since navigation.yml doesn't have this variable
    urlWithoutAnchor = urlWithoutAnchor.replace(/{{site\.baseurl}}\/?/, '');
    
    // Handle root-relative URLs (starting with /)
    const normalizedUrl = urlWithoutAnchor.startsWith('/') 
        ? urlWithoutAnchor 
        : '/' + urlWithoutAnchor;
    
    // Check if the normalized URL exists in valid URLs
    return validUrls.some(validUrl => {
        return normalizedUrl === validUrl;
    });
}

// validate all URLs in navigation.yml via HEAD request to official website
async function checkNavigationYml(brokenLinks, processedUrls) {
    console.log('Checking navigation.yml...');
    const navigationData = yaml.load(fs.readFileSync(NAVIGATION_FILE, 'utf8'));
    const validUrls = extractUrls(navigationData);
    
    for (const url of validUrls) {
        if (processedUrls.has(url)) continue;
        processedUrls.add(url);
        
        if (isExternalUrl(url)) {
            const result = await checkExternalUrl(url);
            // Only add if it's broken
            if (result.is404 || result.status !== 200) {
                brokenLinks.push({ ...result, type: 'external' });
            }
        }
        // Internal URLs in navigation.yml are assumed valid, so we don't add them
    }
}

// Function to check markdown pages
async function checkMarkdownPages(brokenLinks, processedUrls) {
    console.log('Checking markdown files...');
    const markdownFiles = findMarkdownFiles(MARKDOWN_DIR);
    console.log(`Found ${markdownFiles.length} markdown files`);

    // Get valid URLs from navigation for internal link checking
    const navigationData = yaml.load(fs.readFileSync(NAVIGATION_FILE, 'utf8'));
    const validUrls = extractUrls(navigationData);

    for (const file of markdownFiles) {
        const content = fs.readFileSync(file, 'utf8');
        const links = extractLinksFromMarkdown(content);
        
        for (const link of links) {
            if (processedUrls.has(link)) continue;
            processedUrls.add(link);

            if (isExternalUrl(link)) {
                const result = await checkExternalUrl(link);
                // Only add if it's broken
                if (result.is404 || result.status !== 200) {
                    brokenLinks.push({ ...result, file, type: 'external' });
                    console.log(`Broken: ${link} in ${file}`);
                }
            } else if (!isImageUrl(link)) {
                // Skip internal image URLs since they won't be in navigation.yml
                const exists = checkInternalUrl(link, validUrls);
                // Only add if it's broken
                if (!exists) {
                    brokenLinks.push({
                        url: link,
                        status: 404,
                        is404: true,
                        file,
                        type: 'internal'
                    });
                    console.log(`Broken: ${link} in ${file}`);
                }
            }
        }
    }
}

// Function to generate report of broken links
function generateReport(brokenLinks) {
    // brokenLinks already contain only broken links
    if (brokenLinks.length === 0) {
        console.log('\n✅ No broken links found!');
        return;
    }

    console.log(`\n❌ Found ${brokenLinks.length} broken links:`);
    
    // Generate report content
    const reportLines = [];
    reportLines.push('BROKEN LINKS REPORT');
    reportLines.push('===================');
    reportLines.push(`Generated: ${new Date().toISOString()}`);
    reportLines.push(`Total broken links: ${brokenLinks.length}`);
    reportLines.push('');

    // Group by type
    const externalBroken = brokenLinks.filter(link => link.type === 'external');
    const internalBroken = brokenLinks.filter(link => link.type === 'internal');

    if (externalBroken.length > 0) {
        reportLines.push('EXTERNAL BROKEN LINKS:');
        reportLines.push('-'.repeat(25));
        externalBroken.forEach(link => {
            reportLines.push(`URL: ${link.url}`);
            reportLines.push(`Status: ${link.status}`);
            if (link.file) reportLines.push(`Found in: ${link.file}`);
            if (link.error) reportLines.push(`Error: ${link.error}`);
            reportLines.push('');
        });
    }

    if (internalBroken.length > 0) {
        reportLines.push('INTERNAL BROKEN LINKS:');
        reportLines.push('-'.repeat(25));
        internalBroken.forEach(link => {
            reportLines.push(`URL: ${link.url}`);
            reportLines.push(`Status: ${link.status}`);
            if (link.file) reportLines.push(`Found in: ${link.file}`);
            reportLines.push('');
        });
    }

    // Write to file
    const reportContent = reportLines.join('\n');
    const reportFile = 'link_check_report.txt';
    fs.writeFileSync(reportFile, reportContent);
    
    console.log(`Report saved to: ${reportFile}`);
}

// Main function
async function main() {
    try {
        const mode = process.argv[2];
        if (mode && !['md', 'nav'].includes(mode)) {
            console.log('Invalid mode. Use: node check-links.js [md|nav]');
            process.exit(1);
        }

        const brokenLinks = [];
        const processedUrls = new Set();

        // Check navigation.yml URLs if no mode specified or mode is 'nav'
        if (!mode || mode === 'nav') {
            await checkNavigationYml(brokenLinks, processedUrls);
        }

        // Check markdown files if no mode specified or mode is 'md'
        if (!mode || mode === 'md') {
            await checkMarkdownPages(brokenLinks, processedUrls);
        }

        // Generate report
        generateReport(brokenLinks);
        
    } catch (error) {
        console.error('Error:', error.stack || error.message);
        process.exit(1);
    }
}

main();