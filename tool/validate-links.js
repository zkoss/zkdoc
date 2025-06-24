#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Book folder names (based on the directory structure)
const BOOK_FOLDERS = [
  'get_started',
  'main',
  'zats_essentials',
  'zk_calendar_essentials',
  'zk_charts_essentials',
  'zk_client_side_ref',
  'zk_component_dev_essentials',
  'zk_component_ref',
  'zk_config_ref',
  'zk_dev_ref',
  'zk_essentials',
  'zk_installation_guide',
  'zk_jsp_tags_essentials',
  'zk_mvvm_ref',
  'zk_pivottable_essentials',
  'zk_spring_essentials',
  'zk_studio_essentials',
  'zk_style_customization_guide',
  'zuml_ref'
];

class LinkValidator {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.errors = [];
    this.allMarkdownFiles = new Set();
    this.allImageFiles = new Set();
    this.collectAllFiles();
  }

  // Collect all markdown and image files for reference
  collectAllFiles() {
    const walk = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walk(filePath);
        } else {
          const relativePath = path.relative(this.rootDir, filePath);
          if (file.endsWith('.md')) {
            this.allMarkdownFiles.add(relativePath);
          } else if (this.isImageFile(file)) {
            this.allImageFiles.add(relativePath);
          }
        }
      }
    };
    
    walk(this.rootDir);
  }

  isImageFile(filename) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  }

  // Check if a link is valid according to the rules
  isValidLink(link, currentFileDir) {
    // Rule 1: starts with {{site.baseurl}} or /{{site.baseurl}}
    if (link.startsWith('{{site.baseurl}}') || link.startsWith('/{{site.baseurl}}')) {
      return this.checkBaseurlLink(link);
    }

    // Rule 2: starts with /images
    if (link.startsWith('/images/')) {
      return this.checkImageLink(link.substring(1)); // remove leading slash
    }

    // Rule 3: starts with /book_folder_name/ (absolute paths)
    for (const bookFolder of BOOK_FOLDERS) {
      if (link.startsWith('/' + bookFolder + '/')) {
        return this.checkBookLink(link.substring(1)); // remove leading slash
      }
    }

    // Rule 4: starts with book folder name (relative paths)
    for (const bookFolder of BOOK_FOLDERS) {
      if (link.startsWith(bookFolder + '/') || link === bookFolder) {
        return this.checkBookLink(link);
      }
    }

    // Rule 5: ZK wiki links
    if (link.startsWith('http://books.zkoss.org/wiki/')) {
      return { valid: true };
    }

    // Rule 6: External links and anchors are considered valid
    if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('#')) {
      return { valid: true };
    }

    // Rule 7: relative links within the same book folder
    if (!link.startsWith('javascript:') && !link.startsWith('mailto:')) {
      return this.checkRelativeLink(link, currentFileDir);
    }

    return { valid: false, reason: 'Link format not recognized' };
  }

  checkBaseurlLink(link) {
    // Remove {{site.baseurl}} prefix and leading slash if present
    let cleanLink = link.replace(/^\/?{{site\.baseurl}}\//, '');
    if (cleanLink === '') {
      return { valid: true }; // Root link
    }
    
    // Remove page anchor/fragment if present for validation (e.g., #File_Download)
    // but keep the original link unchanged
    const linkWithoutAnchor = cleanLink.split('#')[0];
    
    // Check if it's an image
    if (linkWithoutAnchor.startsWith('images/')) {
      return this.checkImageLink(linkWithoutAnchor);
    }
    
    // Check if it's a markdown file
    if (linkWithoutAnchor.endsWith('.md') || !linkWithoutAnchor.includes('.')) {
      const targetFile = linkWithoutAnchor.endsWith('.md') ? linkWithoutAnchor : linkWithoutAnchor + '.md';
      if (this.allMarkdownFiles.has(targetFile)) {
        return { valid: true };
      }
      return { valid: false, reason: `Markdown file not found: ${targetFile}` };
    }
    
    return { valid: false, reason: `Baseurl link target not found: ${linkWithoutAnchor}` };
  }

  checkImageLink(link) {
    if (this.allImageFiles.has(link)) {
      return { valid: true };
    }
    return { valid: false, reason: `Image file not found: ${link}` };
  }

  checkBookLink(link) {
    // Remove page anchor/fragment if present for validation
    const linkWithoutAnchor = link.split('#')[0];
    
    // If it's just the book folder name, it's valid
    if (BOOK_FOLDERS.includes(linkWithoutAnchor)) {
      return { valid: true };
    }
    
    // Check if it's an image file
    if (this.isImageFile(linkWithoutAnchor)) {
      if (this.allImageFiles.has(linkWithoutAnchor)) {
        return { valid: true };
      }
      return { valid: false, reason: `Image file not found: ${linkWithoutAnchor}` };
    }
    
    // If it's a path within a book folder
    if (linkWithoutAnchor.endsWith('.md')) {
      if (this.allMarkdownFiles.has(linkWithoutAnchor)) {
        return { valid: true };
      }
      return { valid: false, reason: `Markdown file not found: ${linkWithoutAnchor}` };
    } else {
      // Assume it's a markdown file without .md extension
      const targetFile = linkWithoutAnchor + '.md';
      if (this.allMarkdownFiles.has(targetFile)) {
        return { valid: true };
      }
      return { valid: false, reason: `Markdown file not found: ${targetFile}` };
    }
  }

  checkRelativeLink(link, currentFileDir) {
    // Remove page anchor/fragment if present for validation
    const linkWithoutAnchor = link.split('#')[0];
    
    const fullPath = path.join(currentFileDir, linkWithoutAnchor);
    const normalizedPath = path.normalize(fullPath);
    const relativePath = path.relative(this.rootDir, path.resolve(this.rootDir, normalizedPath));
    
    // Check if it's an image
    if (this.isImageFile(linkWithoutAnchor)) {
      if (this.allImageFiles.has(relativePath)) {
        return { valid: true };
      }
      return { valid: false, reason: `Image file not found: ${relativePath}` };
    }
    
    // Check if it's a markdown file
    let targetFile = relativePath;
    if (!linkWithoutAnchor.endsWith('.md') && !linkWithoutAnchor.includes('.')) {
      targetFile = relativePath + '.md';
    }
    
    if (this.allMarkdownFiles.has(targetFile)) {
      return { valid: true };
    }
    
    return { valid: false, reason: `File not found: ${targetFile}` };
  }

  // Extract links from markdown content
  extractLinks(content) {
    const links = [];
    
    // Markdown link pattern: [text](url)
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const url = match[2].trim();
      // Skip mailto and javascript links
      if (!url.startsWith('mailto:') && !url.startsWith('javascript:')) {
        links.push({
          text: match[1],
          url: url,
          fullMatch: match[0],
          index: match.index
        });
      }
    }
    
    // Image pattern: ![alt](src)
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    while ((match = imageRegex.exec(content)) !== null) {
      const url = match[2].trim();
      links.push({
        text: match[1],
        url: url,
        fullMatch: match[0],
        index: match.index,
        isImage: true
      });
    }
    
    return links;
  }

  // Get line number from content and index
  getLineNumber(content, index) {
    const beforeMatch = content.substring(0, index);
    return beforeMatch.split('\n').length;
  }

  // Validate a single markdown file
  validateFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(this.rootDir, filePath);
      const fileDir = path.dirname(relativePath);
      
      const links = this.extractLinks(content);
      
      for (const link of links) {
        const validation = this.isValidLink(link.url, fileDir);
        
        if (!validation.valid) {
          const lineNumber = this.getLineNumber(content, link.index);
          this.errors.push({
            file: relativePath,
            line: lineNumber,
            link: link.url,
            text: link.text,
            reason: validation.reason,
            isImage: link.isImage || false
          });
        }
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}: ${error.message}`);
    }
  }

  // Validate markdown files in a specific book folder
  validateBook(bookFolder) {
    const bookErrors = [];
    const bookPath = path.join(this.rootDir, bookFolder);
    
    if (!fs.existsSync(bookPath)) {
      console.log(`⚠️  Book folder not found: ${bookFolder}`);
      return bookErrors;
    }
    
    const walk = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walk(filePath);
        } else if (file.endsWith('.md')) {
          const beforeCount = this.errors.length;
          this.validateFile(filePath);
          // Get errors added for this file
          const newErrors = this.errors.slice(beforeCount);
          bookErrors.push(...newErrors);
        }
      }
    };
    
    walk(bookPath);
    return bookErrors;
  }

  // Validate all markdown files
  validateAllFiles() {
    const walk = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walk(filePath);
        } else if (file.endsWith('.md')) {
          this.validateFile(filePath);
        }
      }
    };
    
    walk(this.rootDir);
  }

  // Generate report for specific book errors
  generateBookReport(bookFolder, bookErrors) {
    if (bookErrors.length === 0) {
      return `✅ ${bookFolder}: All links are valid!\n`;
    }

    // Group errors by file
    const errorsByFile = {};
    for (const error of bookErrors) {
      if (!errorsByFile[error.file]) {
        errorsByFile[error.file] = [];
      }
      errorsByFile[error.file].push(error);
    }
    
    // Sort files for consistent output
    const sortedFiles = Object.keys(errorsByFile).sort();
    
    let output = `📚 Book: ${bookFolder}\n`;
    output += `❌ Found ${bookErrors.length} invalid links:\n\n`;
    
    for (const file of sortedFiles) {
      output += `📄 ${file}\n`;
      const fileErrors = errorsByFile[file].sort((a, b) => a.line - b.line);
      
      for (const error of fileErrors) {
        const type = error.isImage ? '🖼️ ' : '🔗';
        output += `  ${type} Line ${error.line}: ${error.link}\n`;
        output += `     Text: "${error.text}"\n`;
        output += `     Reason: ${error.reason}\n\n`;
      }
    }
    
    output += `\nSummary: ${bookErrors.length} invalid links found across ${sortedFiles.length} files.\n`;
    return output;
  }

  // Generate overall summary report
  generateSummaryReport() {
    if (this.errors.length === 0) {
      return '✅ All links are valid across all books!\n';
    }

    // Group errors by book
    const errorsByBook = {};
    for (const error of this.errors) {
      const bookFolder = error.file.split('/')[0];
      if (!errorsByBook[bookFolder]) {
        errorsByBook[bookFolder] = [];
      }
      errorsByBook[bookFolder].push(error);
    }
    
    let output = `📊 OVERALL SUMMARY\n`;
    output += `==================\n\n`;
    output += `Total invalid links found: ${this.errors.length}\n\n`;
    
    output += `Breakdown by book:\n`;
    for (const bookFolder of BOOK_FOLDERS) {
      const bookErrors = errorsByBook[bookFolder] || [];
      const status = bookErrors.length === 0 ? '✅' : '❌';
      output += `  ${status} ${bookFolder}: ${bookErrors.length} invalid links\n`;
    }
    
    return output;
  }

  // Generate report
  generateReport(saveToFile = false) {
    if (this.errors.length === 0) {
      console.log('✅ All links are valid!');
      return;
    }

    // Group errors by file
    const errorsByFile = {};
    for (const error of this.errors) {
      if (!errorsByFile[error.file]) {
        errorsByFile[error.file] = [];
      }
      errorsByFile[error.file].push(error);
    }
    
    // Sort files for consistent output
    const sortedFiles = Object.keys(errorsByFile).sort();
    
    let output = `❌ Found ${this.errors.length} invalid links:\n\n`;
    
    for (const file of sortedFiles) {
      output += `📄 ${file}\n`;
      const fileErrors = errorsByFile[file].sort((a, b) => a.line - b.line);
      
      for (const error of fileErrors) {
        const type = error.isImage ? '🖼️ ' : '🔗';
        output += `  ${type} Line ${error.line}: ${error.link}\n`;
        output += `     Text: "${error.text}"\n`;
        output += `     Reason: ${error.reason}\n\n`;
      }
    }
    
    output += `\nSummary: ${this.errors.length} invalid links found across ${sortedFiles.length} files.`;
    
    if (saveToFile) {
      const reportPath = path.join(__dirname, 'link-validation-report.txt');
      fs.writeFileSync(reportPath, output);
      console.log(`Report saved to: ${reportPath}`);
    } else {
      console.log(output);
    }
  }

  // Validate books in order and generate separate reports
  validateBooksByOrder(saveToFile = false) {
    console.log('🔍 Validating books in order...');
    console.log('=====================================\n');
    
    let totalErrors = 0;
    const reportDir = path.join(__dirname, 'reports');
    
    // Create reports directory if it doesn't exist
    if (saveToFile && !fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir);
    }
    
    for (let i = 0; i < BOOK_FOLDERS.length; i++) {
      const bookFolder = BOOK_FOLDERS[i];
      console.log(`📚 [${i + 1}/${BOOK_FOLDERS.length}] Processing: ${bookFolder}`);
      
      // Reset errors for this book
      const startingErrors = this.errors.length;
      const bookErrors = this.validateBook(bookFolder);
      
      const report = this.generateBookReport(bookFolder, bookErrors);
      
      if (saveToFile) {
        const reportPath = path.join(reportDir, `${bookFolder}-report.txt`);
        fs.writeFileSync(reportPath, report);
      } else {
        console.log(report);
      }
      
      totalErrors += bookErrors.length;
      console.log(`   ${bookErrors.length === 0 ? '✅' : '❌'} ${bookErrors.length} invalid links found\n`);
    }
    
    // Generate summary report
    const summaryReport = this.generateSummaryReport();
    
    if (saveToFile) {
      const summaryPath = path.join(reportDir, 'summary-report.txt');
      fs.writeFileSync(summaryPath, summaryReport);
      console.log(`📊 Reports saved to: ${reportDir}`);
      console.log(`   - Individual book reports: ${BOOK_FOLDERS.length} files`);
      console.log(`   - Summary report: summary-report.txt`);
    } else {
      console.log(summaryReport);
    }
    
    console.log(`\n🏁 Validation complete: ${totalErrors} total invalid links found`);
    return totalErrors;
  }
}

// Main execution
function main() {
  const rootDir = path.resolve(__dirname, '..');
  const saveToFile = process.argv.includes('--save') || process.argv.includes('-s');
  const byBooks = process.argv.includes('--by-books') || process.argv.includes('-b');
  
  console.log('🔍 Validating markdown links...');
  console.log(`📁 Root directory: ${rootDir}\n`);
  
  const validator = new LinkValidator(rootDir);
  
  let totalErrors = 0;
  
  if (byBooks) {
    totalErrors = validator.validateBooksByOrder(saveToFile);
  } else {
    validator.validateAllFiles();
    validator.generateReport(saveToFile);
    totalErrors = validator.errors.length;
  }
  
  // Exit with error code if there are invalid links
  if (totalErrors > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = LinkValidator;