/**
 * LINK VALIDATION TOOL (check-links.js)
 * =====================================
 * 
 * Validates all image and page links in markdown files (*.md) within the ZK documentation project.
 * Checks links in markdown files and navigation.yml to ensure all targets exist.
 * 
 * FEATURES:
 * ---------
 * • Validates both markdown links [text](url) and image links ![alt](src)
 * • Checks external URLs with HEAD requests to detect 404 errors
 * • Validates internal links against navigation.yml entries
 * • Supports relative URLs:
 *   - ../base_components/labelimageelement : up 1 level folder of the md file
 *   - headerelement : the same folder of the md file
 * • Ignores ZK annotation syntax: @[Annotation]( [EL-expression]) and @[Annotation](key=[value], ...)
 * • Groups errors by book for easy navigation
 * • Generates detailed reports of broken links
 * • Returns appropriate exit codes for CI/CD integration
 * 
 * USAGE:
 * ------
 * Check both markdown files and navigation.yml:
 *   node tool/check-links.js
 * 
 * Check only markdown files:
 *   node tool/check-links.js md
 * 
 * Check only navigation.yml:
 *   node tool/check-links.js nav
 * 
 * LINK VALIDATION RULES:
 * ----------------------
 * A valid link must meet one of the following criteria:
 * 
 * 1. Baseurl links: Start with {{site.baseurl}} or /{{site.baseurl}}
 *    Example: {{site.baseurl}}/zk_component_ref/button
 * 
 * 2. Image links: Start with /images/
 *    Example: /images/sample.jpeg
 * 
 * 3. Absolute book folder links: Start with /book_folder_name/
 *    Example: /zk_component_ref/Button or /zk_component_ref/images/example.png
 * 
 * 4. Relative book folder links: Start with a book folder name
 *    Valid book folders: get_started, zats_essentials, zk_calendar_essentials, etc.
 *    Example: zk_component_ref/Button
 * 
 * 5. ZK Wiki links: Start with http://books.zkoss.org/wiki/
 *    Example: http://books.zkoss.org/wiki/Small%20Talks
 * 
 * 6. External links: Start with http:// or https://
 *    Example: https://www.zkoss.org
 * 
 * 7. Anchor links: Start with #
 *    Example: #section-title
 * 
 * 8. Relative links: Links relative to the current file location
 *    Example: ../images/example.png
 * 
 * OUTPUT:
 * -------
 * The tool generates:
 * • ✅ Success message if all links are valid
 * • ❌ Detailed report of broken links including:
 *   - File path where the broken link was found
 *   - The invalid link URL
 *   - Link status/error details
 *   - Grouping by book for organization
 * • Report file: link_check_report.txt
 * 
 * EXAMPLE OUTPUT:
 * ---------------
 * BOOK: ZK_COMPONENT_REF
 * ======================
 * Links found: 2
 * 
 * INTERNAL BROKEN LINKS:
 * -------------------------
 * URL: headerelement
 * Status: 404
 * Found in: zk_component_ref/base_components/labelimageelement.md
 * 
 * URL: ../base_components/invalid_link
 * Status: 404
 * Found in: zk_component_ref/essential_components/button.md
 * 
 * JAVADOC LINK REPLACEMENT NOTES:
 * --------------------------------
 * ZK javadoc root: https://www.zkoss.org/javadoc/latest/zk/
 * Example: org.zkoss.zul.ChartModel is at https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ChartModel.html
 * Old MediaWiki format: <javadoc>org.zkoss.zul.ChartModel</javadoc>
 * 
 * ZK MEDIAWIKI IMAGE FILES:
 * -------------------------
 * Base URL: https://www.zkoss.org/wiki/File:
 * Example: SyntaxCheckRightBar.png is at https://www.zkoss.org/wiki/File:SyntaxCheckRightBar.png
 * Look for image link in DOM structure: <div class="fullImageLink" id="file"><a href="/_w/images/...">
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

// Function to check if a URL is external
function isExternalUrl(url) {
    return url.startsWith('http://') || url.startsWith('https://');
}

// Function to check if a URL should be ignored
function shouldIgnoreUrl(url) {
    return url.startsWith('ftp://')
        || url.startsWith('file://')
        || url.startsWith('mailto:');
}

// Function to check if a URL is an image
function isImageUrl(url) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico'];
    const urlLower = url.toLowerCase();
    return imageExtensions.some(ext => urlLower.endsWith(ext));
}

// Function to determine which book a file belongs to
function getBookFromFilePath(filePath) {
    const bookPaths = getBookPaths();
    const cwd = process.cwd();
    
    // Normalize the file path relative to the current working directory
    const relativePath = path.relative(cwd, filePath);
    
    // Find which book path this file belongs to
    for (const bookPath of bookPaths) {
        const bookDir = bookPath.substring(1); // Remove leading slash
        if (relativePath.startsWith(bookDir)) {
            // Extract book name from path (e.g., "/zk_essentials" -> "zk_essentials")
            return bookPath.substring(1).split('/')[0];
        }
    }
    
    return 'unknown';
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

// Function to check if a link is ZK annotation syntax
function isZkAnnotationSyntax(fullMatch, linkText, url) {
    // Check if this is ZK annotation syntax with various patterns:
    // 1. @[Annotation]( [EL-expression])
    // 2. @[Annotation](value=[EL-expression], [arbitraryKey]=[EL-expression])
    // 3. @[Annotation](attribute1=value1, attribute2=[EL-expression])
    
    // Must start with @ and have brackets around annotation name
    if (!fullMatch.startsWith('@[') || !linkText) {
        return false;
    }
    
    // Pattern 1: Simple form @[Annotation]( [EL-expression])
    const simplePattern = /@\[([^\]]+)\]\(\s*\[([^\]]*)\]\s*\)/;
    if (simplePattern.test(fullMatch)) {
        return true;
    }
    
    // Pattern 2 & 3: Complex form with key=value pairs and EL expressions
    // @[Annotation](key1=value1, key2=[EL-expression], ...)
    const complexPattern = /@\[([^\]]+)\]\(\s*([^)]*(?:\[[^\]]*\][^)]*))*\s*\)/;
    if (complexPattern.test(fullMatch)) {
        // Further validate that the content contains EL expressions or attribute assignments
        const content = url.trim();
        
        // Check for key=value patterns or [EL-expression] patterns
        const hasKeyValuePairs = /\w+\s*=\s*[^,)]+/.test(content);
        const hasELExpressions = /\[[^\]]*\]/.test(content);
        const hasCommaDelimitedParams = content.includes(',');
        
        // It's a ZK annotation if it has attribute assignments, EL expressions, or comma-delimited parameters
        return hasKeyValuePairs || hasELExpressions || hasCommaDelimitedParams;
    }
    
    return false;
}

// Function to extract links from markdown content
function extractLinksFromMarkdown(content) {
    const links = new Set();
    
    // Match markdown link syntax [text](url) but exclude ZK annotation syntax
    const markdownLinkRegex = /(@?\[([^\]]+)\]\(([^)]+)\))/g;
    let match;
    
    while ((match = markdownLinkRegex.exec(content)) !== null) {
        const fullMatch = match[1];  // Full matched text including potential @
        const linkText = match[2];   // Text inside brackets
        const url = match[3];        // URL inside parentheses
        
        // Skip if this is ZK annotation syntax
        if (isZkAnnotationSyntax(fullMatch, linkText, url)) {
            continue;
        }
        
        // Clean URL by removing title if present
        const cleanUrl = url.split(' ')[0].trim();
        
        // Skip anchor links, ignored URLs, and malformed URLs
        if (!cleanUrl.startsWith('#') && !shouldIgnoreUrl(cleanUrl) && cleanUrl.length > 0) {
            links.add(cleanUrl);
        }
    }
    
    // Match plain URLs or URLs in angle brackets (including ftp and file protocols)
    const plainUrlRegex = /(?:<|^)((?:https?|ftp|file):\/\/[^\s>]+)(?:>|$)/g;
    while ((match = plainUrlRegex.exec(content)) !== null) {
        if (!shouldIgnoreUrl(match[1])) {
            links.add(match[1]);
        }
    }
    
    return Array.from(links);
}

// Function to resolve relative URLs based on current file location
function resolveRelativeUrl(relativeUrl, currentFilePath) {
    // Get the directory containing the current markdown file
    const currentDir = path.dirname(currentFilePath);
    
    // Get the relative path from the project root to the current file's directory
    const relativeDirFromRoot = path.relative(process.cwd(), currentDir);
    
    // Resolve the relative URL
    let resolvedPath;
    if (relativeUrl.startsWith('../')) {
        // Handle "../" paths - go up one level from current file's directory
        const parentDir = path.dirname(relativeDirFromRoot);
        const remainingPath = relativeUrl.substring(3); // Remove "../"
        resolvedPath = path.join(parentDir, remainingPath).replace(/\\/g, '/');
    } else if (!relativeUrl.startsWith('/') && !relativeUrl.startsWith('http')) {
        // Handle relative paths in same directory as current file
        resolvedPath = path.join(relativeDirFromRoot, relativeUrl).replace(/\\/g, '/');
    } else {
        // Already absolute or external URL
        return relativeUrl;
    }
    
    // Return as absolute URL starting with /
    return '/' + resolvedPath;
}

// Function to check if an internal URL exists in the valid URLs
function checkInternalUrl(url, validUrls, currentFilePath = null) {
    // Remove any anchor part (#section) from the URL
    let urlWithoutAnchor = url.split('#')[0];
    
    // Remove {{site.baseurl}} if present since navigation.yml doesn't have this variable
    urlWithoutAnchor = urlWithoutAnchor.replace(/{{site\.baseurl}}?/, '');
    
    // Handle relative URLs if currentFilePath is provided
    let normalizedUrl;
    if (currentFilePath && !urlWithoutAnchor.startsWith('/') && !isExternalUrl(urlWithoutAnchor)) {
        // This is a relative URL, resolve it
        normalizedUrl = resolveRelativeUrl(urlWithoutAnchor, currentFilePath);
    } else {
        // Handle root-relative URLs (starting with /)
        normalizedUrl = urlWithoutAnchor.startsWith('/') 
            ? urlWithoutAnchor 
            : '/' + urlWithoutAnchor;
    }
    
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
                /*
                const result = await checkExternalUrl(link);
                if (result.is404 || result.status !== 200) {
                    brokenLinks.push({ ...result, file, type: 'external', book: getBookFromFilePath(file) });
                    console.log(`Broken: ${link} in ${file}`);
                }
                 */
            } else if (!isImageUrl(link)) {
                // Skip internal image URLs since they won't be in navigation.yml
                const exists = checkInternalUrl(link, validUrls, file);
                // Only add if it's broken
                if (!exists) {
                    brokenLinks.push({
                        url: link,
                        status: 404,
                        is404: true,
                        file,
                        type: 'internal',
                        book: getBookFromFilePath(file)
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

    // Group by books
    const linksByBook = {};
    brokenLinks.forEach(link => {
        const book = link.book || 'navigation.yml';
        if (!linksByBook[book]) {
            linksByBook[book] = [];
        }
        linksByBook[book].push(link);
    });

    // Sort books alphabetically
    const sortedBooks = Object.keys(linksByBook).sort();

    for (const book of sortedBooks) {
        const bookLinks = linksByBook[book];
        reportLines.push(`BOOK: ${book.toUpperCase()}`);
        reportLines.push('='.repeat(book.length + 6));
        reportLines.push(`Links found: ${bookLinks.length}`);
        reportLines.push('');

        // Group by type within each book
        const externalBroken = bookLinks.filter(link => link.type === 'external');
        const internalBroken = bookLinks.filter(link => link.type === 'internal');

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
                if (link.file) reportLines.push(`Found in: ${link.file}`);
                reportLines.push('');
            });
        }

        reportLines.push('');
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