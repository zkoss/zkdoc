#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class JavadocReplacer {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.processedFiles = 0;
    this.totalReplacements = 0;
    this.replacementsLog = [];
    this.dryRun = false;
    this.javadocBaseUrl = 'https://www.zkoss.org/javadoc/latest/zk/';
  }

  // Convert javadoc tags to markdown links
  replaceJavadocTags(content, filePath) {
    const relativePath = path.relative(this.rootDir, filePath);
    let replacements = 0;
    
    // Pattern to match <javadoc>className</javadoc>
    const javadocRegex = /<javadoc>(.*?)<\/javadoc>/g;
    
    const newContent = content.replace(javadocRegex, (match, className) => {
      // Clean up the class name (trim whitespace)
      const cleanClassName = className.trim();
      
      if (!cleanClassName) {
        return match; // Skip empty javadoc tags
      }
      
      // Convert class name to URL path
      // e.g., org.zkoss.zul.ChartModel -> org/zkoss/zul/ChartModel.html
      const urlPath = cleanClassName.replace(/\./g, '/') + '.html';
      const fullUrl = this.javadocBaseUrl + urlPath;
      
      // Create markdown link with the class name as link text
      const markdownLink = `[${cleanClassName}](${fullUrl})`;
      
      replacements++;
      this.replacementsLog.push({
        file: relativePath,
        original: match,
        className: cleanClassName,
        converted: markdownLink,
        url: fullUrl
      });
      
      return markdownLink;
    });
    
    return { content: newContent, replacements };
  }

  // Process a single markdown file
  processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const result = this.replaceJavadocTags(content, filePath);
      
      if (result.replacements > 0) {
        if (!this.dryRun) {
          fs.writeFileSync(filePath, result.content, 'utf-8');
        }
        this.totalReplacements += result.replacements;
        
        const relativePath = path.relative(this.rootDir, filePath);
        console.log(`${this.dryRun ? '🔍' : '✏️ '} ${relativePath}: ${result.replacements} javadoc tag(s) replaced`);
      }
      
      this.processedFiles++;
    } catch (error) {
      console.error(`Error processing file ${filePath}: ${error.message}`);
    }
  }

  // Process a single specific file
  processSingleFile(filePath) {
    console.log(`🔍 Processing single file: ${path.relative(this.rootDir, filePath)}`);
    this.processFile(filePath);
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
          if (!['node_modules', '.git', '.github', '_site', 'tool'].includes(file)) {
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
    console.log('\n📊 JAVADOC REPLACEMENT SUMMARY');
    console.log('=============================');
    console.log(`Files processed: ${this.processedFiles}`);
    console.log(`Total javadoc tags replaced: ${this.totalReplacements}`);
    
    if (this.replacementsLog.length > 0) {
      console.log('\n📝 DETAILED CHANGES:');
      console.log('==================');
      
      // Group by file
      const changesByFile = {};
      for (const change of this.replacementsLog) {
        if (!changesByFile[change.file]) {
          changesByFile[change.file] = [];
        }
        changesByFile[change.file].push(change);
      }
      
      const sortedFiles = Object.keys(changesByFile).sort();
      for (const file of sortedFiles) {
        console.log(`\n📄 ${file}`);
        for (const change of changesByFile[file]) {
          console.log(`  📎 ${change.original}`);
          console.log(`  ➡️  ${change.converted}`);
          console.log(`  🔗 ${change.url}`);
        }
      }
    }
    
    if (this.dryRun) {
      console.log('\n⚠️  DRY RUN MODE - No files were modified');
      console.log('   Run without --dry-run to apply changes');
    } else if (this.totalReplacements > 0) {
      console.log('\n✅ All javadoc tags have been replaced with markdown links');
    } else {
      console.log('\n✅ No javadoc tags found to replace');
    }
  }

  // Save detailed report to file
  saveReportToFile() {
    if (this.replacementsLog.length === 0) {
      return;
    }
    
    const reportPath = path.join(__dirname, 'javadoc-replacement-report.txt');
    let report = `JAVADOC REPLACEMENT REPORT\n`;
    report += `Generated: ${new Date().toISOString()}\n`;
    report += `==========================\n\n`;
    report += `Files processed: ${this.processedFiles}\n`;
    report += `Total javadoc tags replaced: ${this.totalReplacements}\n`;
    report += `Javadoc base URL: ${this.javadocBaseUrl}\n\n`;
    
    // Group by file
    const changesByFile = {};
    for (const change of this.replacementsLog) {
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
        report += `  Original:   ${change.original}\n`;
        report += `  Class:      ${change.className}\n`;
        report += `  Converted:  ${change.converted}\n`;
        report += `  URL:        ${change.url}\n\n`;
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
  const singleFile = process.argv.find(arg => arg.startsWith('--file='));
  
  console.log('📎 Replacing javadoc tags with markdown links...');
  console.log(`📁 Root directory: ${rootDir}`);
  console.log(`🔍 Mode: ${dryRun ? 'DRY RUN (preview only)' : 'LIVE (will modify files)'}`);
  
  if (singleFile) {
    const filePath = singleFile.split('=')[1];
    const fullPath = path.resolve(rootDir, filePath);
    console.log(`📄 Single file mode: ${filePath}\n`);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${fullPath}`);
      process.exit(1);
    }
    
    const replacer = new JavadocReplacer(rootDir);
    replacer.dryRun = dryRun;
    replacer.processSingleFile(fullPath);
    replacer.generateReport();
    
    if (saveReport) {
      replacer.saveReportToFile();
    }
  } else {
    console.log(`🔄 Processing all markdown files\n`);
    
    const replacer = new JavadocReplacer(rootDir);
    replacer.dryRun = dryRun;
    
    replacer.processAllFiles();
    replacer.generateReport();
    
    if (saveReport) {
      replacer.saveReportToFile();
    }
  }
  
  // Exit with code 0 since this is not an error condition
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = JavadocReplacer;