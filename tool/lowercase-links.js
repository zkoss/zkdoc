#!/usr/bin/env node

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
      
      // Convert path to lowercase
      const lowercasePath = pathPart.toLowerCase();
      
      // Reconstruct the full link
      const prefix = match.startsWith('/') ? '/{{site.baseurl}}/' : '{{site.baseurl}}/';
      const newLink = prefix + lowercasePath;
      
      if (match !== newLink) {
        changes++;
        this.changesLog.push({
          file: relativePath,
          original: match,
          converted: newLink
        });
      }
      
      return newLink;
    });
    
    return { content: newContent, changes };
  }

  // Process a single markdown file
  processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const result = this.convertBaseurlLinksToLowercase(content, filePath);
      
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
          console.log(`  🔗 ${change.original}`);
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
      console.log('\n✅ No baseurl links needed conversion');
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
  
  console.log('🔤 Converting baseurl links to lowercase...');
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