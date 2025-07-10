#!/usr/bin/env node

/**
 * LOWERCASE LINKS CONVERTER & NORMALIZER
 * ======================================
 * 
 * A Node.js tool that automatically converts and normalizes internal links in Markdown files.
 * This tool helps maintain consistent URL formatting across Jekyll documentation sites.
 * 
 * FEATURES:
 * --------
 * • Recursively processes all .md files in the project directory
 * • Converts baseurl links to lowercase: {{site.baseurl}}/Path/To/Page → {{site.baseurl}}/path/to/page
 * • Converts internal page links to lowercase: /Path/To/Page → /path/to/page
 * • Normalizes internal links by replacing dashes and dots with underscores
 * • Preserves relative path navigation (../ and ./) in relative links
 * • Removes single quotes from internal links
 * • Handles both formats: {{site.baseurl}}/path and /{{site.baseurl}}/path
 * • Ignores external URLs (http://, https://, ftp://, mailto:, etc.)
 * • Ignores image links (.png, .jpg, .gif, .svg, etc.)
 * • Dry-run mode for previewing changes without modifying files
 * • Detailed logging of all conversions performed
 * • Optional report generation for audit trails
 * • Smart directory filtering (skips node_modules, .git, etc.)
 * 
 * USAGE:
 * ------
 * Basic usage (converts links and modifies files):
 *   node tool/normalize-links.js
 * 
 * Preview mode (shows what would be changed without modifying files):
 *   node tool/normalize-links.js --dry-run
 *   node tool/normalize-links.js -d
 * 
 * Generate detailed report file:
 *   node tool/normalize-links.js --save-report
 *   node tool/normalize-links.js -s
 * 
 * Combined options:
 *   node tool/normalize-links.js --dry-run --save-report
 * 
 * NPM SCRIPTS (if configured):
 * ----------------------------
 * Preview changes (dry-run mode):
 *   npm run lowercase-links-dry
 * 
 * Apply changes to files:
 *   npm run lowercase-links
 * 
 * Apply changes and save detailed report:
 *   npm run lowercase-links-save
 * 
 * EXAMPLES:
 * ---------
 * Baseurl links:
 * Before: [ZK Developer Guide]({{site.baseurl}}/ZK_Developer_Guide/Introduction)
 * After:  [ZK Developer Guide]({{site.baseurl}}/zk_developer_guide/introduction)
 * 
 * Before: [Calendar]({{site.baseurl}}/ZK_Component-Reference/Essential.Components/Calendar)
 * After:  [Calendar]({{site.baseurl}}/zk_component_reference/essential_components/calendar)
 * 
 * Internal page links:
 * Before: [Getting Started](/ZK_Developer_Guide/Getting_Started)
 * After:  [Getting Started](/zk_developer_guide/getting_started)
 * 
 * Before: [Button Component](/ZK_Component-Reference/Input/Button.html)
 * After:  [Button Component](/zk_component_reference/input/button_html)
 * 
 * Before: [User's Guide](/docs/User's-Guide.md)
 * After:  [User's Guide](/docs/users_guide)
 * 
 * Relative links (preserve path navigation):
 * Before: [Components](../Essential-Components/Button.md)
 * After:  [Components](../essential_components/button)
 * 
 * Before: [Header](./Header-Element.md)
 * After:  [Header](./header_element)
 * 
 * Normalization features:
 * Before: /Some-Page.With-Dots/file.html → /some_page_with_dots/file_html
 * Before: /User's-Manual/intro.md → /users_manual/intro
 * 
 * Ignored (images):
 * ![Screenshot](/Images/Screenshot.PNG) - left unchanged
 * [Download Image](/assets/diagrams/Architecture.png) - left unchanged
 * 
 * OUTPUT:
 * -------
 * • Console output shows progress and summary statistics
 * • Optional detailed report file: tool/lowercase-conversion-report.txt
 * • Files are backed up automatically by git (use git diff to review changes)
 * 
 * EXAMPLE OUTPUT:
 * ---------------
 * 🔤 Converting internal links to lowercase...
 * 📁 Root directory: /path/to/zkdoc
 * 🔍 Mode: DRY RUN (preview only)
 * 
 * 🔍 zk_component_ref/Grid.md: 4 link(s) converted
 * 🔍 zk_dev_ref/Performance.md: 12 link(s) converted
 * 
 * 📊 CONVERSION SUMMARY
 * ===================
 * Files processed: 1,247
 * Total links converted: 3,892
 * 
 * 📝 DETAILED CHANGES:
 * ==================
 * 
 * 📄 zk_component_ref/Grid.md
 *   🏠 [baseurl] {{site.baseurl}}/ZK_Component_Reference/Group
 *   ➡️  {{site.baseurl}}/zk_component_reference/group
 * 
 * ⚠️  DRY RUN MODE - No files were modified
 *    Run without --dry-run to apply changes
 * 
 * SAFETY:
 * -------
 * • Use --dry-run first to preview changes
 * • Commit your work before running to enable easy rollback
 * • Only processes .md files, ignores other file types
 * • Skips common directories like node_modules, .git, _site
 * 
 * REQUIREMENTS:
 * ------------
 * • Node.js (any recent version)
 * • Write permissions to the project directory (unless using --dry-run)
 */

const fs = require('fs');
const path = require('path');

class LinkLowercaseConverter {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.processedFiles = 0;
    this.totalChanges = 0;
    this.changesLog = [];
    this.dryRun = false;
  }

  // Helper function to check if a URL is an image
  isImageUrl(url) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico', '.tiff', '.tif'];
    // Remove Unicode control characters (including LRM, RLM, etc.) and trim whitespace
    const urlLower = url.toLowerCase().replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '').trim();
    return imageExtensions.some(ext => urlLower.endsWith(ext));
  }

  // Helper function to check if a URL should be ignored
  shouldIgnoreUrl(url) {
    // Ignore external URLs, anchors, special protocols, and images
    return url.startsWith('http://') || 
           url.startsWith('https://') || 
           url.startsWith('ws://') ||
           url.startsWith('ftp://') ||
           url.startsWith('ftps://') ||
           url.startsWith('file://') ||
           url.startsWith('mailto:') ||
           url.startsWith('tel:') ||
           url.startsWith('javascript:') ||
           url.startsWith('#') ||
           url.includes('{{site.baseurl}}') || // Handled by separate method
           this.isImageUrl(url); // Ignore image links
  }

  // Normalize internal page links
  normalizeInternalLink(pathPart) {
    // Check if this is a relative path (starts with ../ or ./)
    const isRelativePath = pathPart.startsWith('../') || pathPart.startsWith('./');
    
    if (isRelativePath) {
      // For relative paths, preserve the path navigation dots but normalize the rest
      const pathSegments = pathPart.split('/');
      const normalizedSegments = pathSegments.map((segment, index) => {
        // Keep relative path indicators (.. and .) unchanged
        if (segment === '..' || segment === '.') {
          return segment;
        }
        // Normalize other segments
        return segment
          .toLowerCase()
          .replace(/\.md$/i, '')   // Remove .md extension
          .replace(/[-\.]/g, '_')  // Replace dashes and dots with underscores
          .replace(/'/g, '');      // Remove single quotes
      });
      return normalizedSegments.join('/');
    } else {
      // For absolute paths, apply full normalization
      return pathPart
        .toLowerCase()
        .replace(/\.md$/i, '')   // Remove .md extension first
        .replace(/[-\.]/g, '_')  // Replace remaining dashes and dots with underscores
        .replace(/'/g, '');      // Remove single quotes
    }
  }

  // Convert baseurl links to lowercase
  convertBaseurlLinksToLowercase(content, filePath) {
    const relativePath = path.relative(this.rootDir, filePath);
    let changes = 0;
    
    // Pattern to match {{site.baseurl}}/path and /{{site.baseurl}}/path
    const baseurlRegex = /({{site\.baseurl}}\/[^)\s#]+)|(\/{{site\.baseurl}}\/[^)\s#]+)/g;
    
    const newContent = content.replace(baseurlRegex, (match) => {
      // Extract the path part after {{site.baseurl}}/
      let pathPart;
      if (match.startsWith('/{{site.baseurl}}/')) {
        pathPart = match.substring('/{{site.baseurl}}/'.length);
      } else {
        pathPart = match.substring('{{site.baseurl}}/'.length);
      }
      pathPart = pathPart.trim(); // Remove any leading/trailing whitespace
      // Skip image links
      if (this.isImageUrl(pathPart)) {
        return match;
      }
      
      // Normalize the path (lowercase, replace dashes/dots with underscores, remove single quotes)
      const normalizedPath = this.normalizeInternalLink(pathPart);
      
      // Reconstruct the full link
      const prefix = match.startsWith('/') ? '/{{site.baseurl}}/' : '{{site.baseurl}}/';
      const newLink = prefix + normalizedPath;
      
      if (match !== newLink) {
        changes++;
        this.changesLog.push({
          file: relativePath,
          original: match,
          converted: newLink,
          type: 'baseurl'
        });
      }
      
      return newLink;
    });
    
    return { content: newContent, changes };
  }

  // Convert internal page links to lowercase
  convertInternalLinksToLowercase(content, filePath) {
    const relativePath = path.relative(this.rootDir, filePath);
    let changes = 0;
    
    // Pattern to match markdown links [text](url)
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    
    const newContent = content.replace(markdownLinkRegex, (match, linkText, url) => {
      // Skip URLs that should be ignored
      url = url.trim(); // Remove any leading/trailing whitespace
      if (this.shouldIgnoreUrl(url)) {
        return match;
      }
      
      // Only process internal links that start with / (absolute paths)
      // Skip image links even if they start with /
      if (this.isImageUrl(url)) {
        return match;
      }
      // Remove any fragment identifier (anchor) for processing
      const urlParts = url.split('#');
      const pathPart = urlParts[0];
      const fragment = urlParts[1] ? '#' + urlParts[1] : '';
      // Normalize the path (lowercase, replace dashes/dots with underscores, remove single quotes)
      const normalizedPath = this.normalizeInternalLink(pathPart);
      const newUrl = normalizedPath + fragment;
      if (url !== newUrl) {
        changes++;
        this.changesLog.push({
          file: relativePath,
          original: url,
          converted: newUrl,
          type: 'internal'
        });
        return `[${linkText}](${newUrl})`;
      }
      return match;
    });
    
    return { content: newContent, changes };
  }

  // Convert all links to lowercase
  convertAllLinksToLowercase(content, filePath) {
    // First convert baseurl links
    let result1 = this.convertBaseurlLinksToLowercase(content, filePath);
    
    // Then convert internal links
    let result2 = this.convertInternalLinksToLowercase(result1.content, filePath);
    
    return {
      content: result2.content,
      changes: result1.changes + result2.changes
    };
  }

  // Process a single markdown file
  processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const result = this.convertAllLinksToLowercase(content, filePath);
      
      if (result.changes > 0) {
        if (!this.dryRun) {
          fs.writeFileSync(filePath, result.content, 'utf-8');
        }
        this.totalChanges += result.changes;
        
        const relativePath = path.relative(this.rootDir, filePath);
        console.log(`${this.dryRun ? '🔍' : '✏️ '} ${relativePath}: ${result.changes} link(s) converted`);
      }
      
      this.processedFiles++;
    } catch (error) {
      console.error(`Error processing file ${filePath}: ${error.message}`);
    }
  }

  // Find and process all markdown files
  processAllFiles() {
    const walk = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // Skip node_modules and other common directories
          if (!['node_modules', '.git', '.github', '_site'].includes(file)) {
            walk(filePath);
          }
        } else if (file.endsWith('.md')) {
          this.processFile(filePath);
        }
      }
    };
    
    walk(this.rootDir);
  }

  // Generate summary report
  generateReport() {
    console.log('\n📊 CONVERSION SUMMARY');
    console.log('===================');
    console.log(`Files processed: ${this.processedFiles}`);
    console.log(`Total links converted: ${this.totalChanges}`);
    
    if (this.changesLog.length > 0) {
      console.log('\n📝 DETAILED CHANGES:');
      console.log('==================');
      
      // Group by file
      const changesByFile = {};
      for (const change of this.changesLog) {
        if (!changesByFile[change.file]) {
          changesByFile[change.file] = [];
        }
        changesByFile[change.file].push(change);
      }
      
      const sortedFiles = Object.keys(changesByFile).sort();
      for (const file of sortedFiles) {
        console.log(`\n📄 ${file}`);
        for (const change of changesByFile[file]) {
          const typeIcon = change.type === 'baseurl' ? '🏠' : '🔗';
          const typeLabel = change.type === 'baseurl' ? 'baseurl' : 'internal';
          console.log(`  ${typeIcon} [${typeLabel}] ${change.original}`);
          console.log(`  ➡️  ${change.converted}`);
        }
      }
    }
    
    if (this.dryRun) {
      console.log('\n⚠️  DRY RUN MODE - No files were modified');
      console.log('   Run without --dry-run to apply changes');
    } else if (this.totalChanges > 0) {
      console.log('\n✅ All links have been converted to lowercase');
    } else {
      console.log('\n✅ No links needed conversion');
    }
  }

  // Save detailed report to file
  saveReportToFile() {
    if (this.changesLog.length === 0) {
      return;
    }
    
    const reportPath = path.join(__dirname, 'lowercase-conversion-report.txt');
    let report = `LOWERCASE LINK CONVERSION REPORT\n`;
    report += `Generated: ${new Date().toISOString()}\n`;
    report += `==================================\n\n`;
    report += `Files processed: ${this.processedFiles}\n`;
    report += `Total links converted: ${this.totalChanges}\n\n`;
    
    // Group by file
    const changesByFile = {};
    for (const change of this.changesLog) {
      if (!changesByFile[change.file]) {
        changesByFile[change.file] = [];
      }
      changesByFile[change.file].push(change);
    }
    
    const sortedFiles = Object.keys(changesByFile).sort();
    for (const file of sortedFiles) {
      report += `FILE: ${file}\n`;
      report += '='.repeat(file.length + 6) + '\n';
      for (const change of changesByFile[file]) {
        const typeLabel = change.type === 'baseurl' ? 'baseurl' : 'internal';
        report += `  Type:      ${typeLabel}\n`;
        report += `  Original:  ${change.original}\n`;
        report += `  Converted: ${change.converted}\n\n`;
      }
      report += '\n';
    }
    
    fs.writeFileSync(reportPath, report);
    console.log(`\n📋 Detailed report saved to: ${reportPath}`);
  }
}

// Main execution
function main() {
  const rootDir = path.resolve(__dirname, '..');
  const dryRun = process.argv.includes('--dry-run') || process.argv.includes('-d');
  const saveReport = process.argv.includes('--save-report') || process.argv.includes('-s');
  
  console.log('🔤 Converting internal links to lowercase...');
  console.log(`📁 Root directory: ${rootDir}`);
  console.log(`🔍 Mode: ${dryRun ? 'DRY RUN (preview only)' : 'LIVE (will modify files)'}\n`);
  
  const converter = new LinkLowercaseConverter(rootDir);
  converter.dryRun = dryRun;
  
  converter.processAllFiles();
  converter.generateReport();
  
  if (saveReport) {
    converter.saveReportToFile();
  }
  
  // Exit with code 0 since this is not an error condition
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = LinkLowercaseConverter;