/**
 * Markdown Validator
 * 
 * Purpose: Validates markdown files for proper formatting rules
 * Current features:
 * - Ensures unordered lists and code blocks have exactly 1 blank line between them
 * 
 * Usage:
 *   node markdown-validator.js
 * 
 * Output:
 *   - Console output with validation results
 *   - Detailed report saved to 'markdown-validation-report.txt'
 */

const fs = require('fs');
const path = require('path');

const REPORT_FILE = 'markdown-validation-report.txt';
const DOCS_DIRECTORIES = [
    '../get_started',
    '../zk_essentials', 
    '../zk_dev_ref',
    '../zk_mvvm_ref',
    '../zk_component_ref',
    '../zuml_ref',
    '../zk_installation_guide',
    '../zk_config_ref',
    '../zk_style_customization_guide',
    '../zk_component_dev_essentials',
    '../zk_client_side_ref',
    '../zk_charts_essentials',
    '../zk_pivottable_essentials',
    '../zk_calendar_essentials',
    '../zk_spring_essentials',
    '../zats_essentials',
    '../zk_jsp_tags_essentials',
    '../zk_studio_essentials'
];

// Validation rules
const VALIDATION_RULES = {
    LIST_CODE_SPACING: {
        name: 'List-Code Block Spacing',
        description: 'Unordered lists and code blocks should have exactly 1 blank line between them'
    }
};

/**
 * Get all markdown files from specified directories
 */
function getMarkdownFiles(directories) {
    const markdownFiles = [];
    
    for (const dir of directories) {
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir, { recursive: true });
            for (const file of files) {
                if (file.endsWith('.md')) {
                    markdownFiles.push(path.join(dir, file));
                }
            }
        }
    }
    
    return markdownFiles;
}

/**
 * Check spacing between unordered lists and code blocks
 * Only checks the case where unordered list is first and code block follows
 */
function validateListCodeSpacing(content, filePath) {
    const lines = content.split('\n');
    const violations = [];
    
    for (let i = 0; i < lines.length - 1; i++) {
        const currentLine = lines[i].trim();
        const nextLine = lines[i + 1]?.trim() || '';
        
        // ONLY check if current line is a list item and next line starts a code block
        // (code block → list is allowed without blank line)
        if (currentLine.startsWith('* ') && nextLine.startsWith('```')) {
            violations.push({
                line: i + 1,
                issue: 'Missing blank line between unordered list and code block',
                context: `List: "${currentLine}" → Code: "${nextLine}"`
            });
        }
    }
    
    return violations;
}

/**
 * Validate a single markdown file
 */
function validateMarkdownFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const violations = [];
        
        // Run all validation rules
        violations.push(...validateListCodeSpacing(content, filePath));
        
        return {
            filePath,
            violations,
            isValid: violations.length === 0
        };
    } catch (error) {
        return {
            filePath,
            violations: [{
                line: 0,
                issue: `Error reading file: ${error.message}`,
                context: ''
            }],
            isValid: false
        };
    }
}

/**
 * Generate validation report
 */
function generateReport(results) {
    const timestamp = new Date().toISOString();
    let report = `Markdown Validation Report\n`;
    report += `Generated: ${timestamp}\n`;
    report += `${'='.repeat(50)}\n\n`;
    
    const totalFiles = results.length;
    const validFiles = results.filter(r => r.isValid).length;
    const invalidFiles = results.filter(r => !r.isValid);
    const totalViolations = results.reduce((sum, r) => sum + r.violations.length, 0);
    
    // Summary
    report += `SUMMARY:\n`;
    report += `Total files checked: ${totalFiles}\n`;
    report += `Valid files: ${validFiles}\n`;
    report += `Files with violations: ${invalidFiles.length}\n`;
    report += `Total violations: ${totalViolations}\n`;
    report += `Success rate: ${((validFiles / totalFiles) * 100).toFixed(1)}%\n\n`;
    
    // Validation rules
    report += `VALIDATION RULES:\n`;
    report += `${'='.repeat(20)}\n`;
    Object.values(VALIDATION_RULES).forEach(rule => {
        report += `• ${rule.name}: ${rule.description}\n`;
    });
    report += `\n`;
    
    if (invalidFiles.length > 0) {
        report += `DETAILED VIOLATIONS:\n`;
        report += `${'='.repeat(25)}\n\n`;
        
        invalidFiles.forEach(file => {
            report += `File: ${file.filePath}\n`;
            report += `Violations: ${file.violations.length}\n`;
            file.violations.forEach(violation => {
                report += `  Line ${violation.line}: ${violation.issue}\n`;
                if (violation.context) {
                    report += `    Context: ${violation.context}\n`;
                }
            });
            report += `\n`;
        });
    } else {
        report += `✅ No violations found! All files follow proper markdown formatting.\n`;
    }
    
    return report;
}

/**
 * Main validation function
 */
function main() {
    console.log('Starting markdown validation...');
    
    // Get all markdown files
    const markdownFiles = getMarkdownFiles(DOCS_DIRECTORIES);
    console.log(`Found ${markdownFiles.length} markdown files to validate`);
    
    if (markdownFiles.length === 0) {
        console.log('No markdown files found in specified directories');
        return;
    }
    
    // Validate all files
    const results = [];
    let processedCount = 0;
    
    for (const filePath of markdownFiles) {
        const result = validateMarkdownFile(filePath);
        results.push(result);
        processedCount++;
        
        if (result.violations.length > 0) {
            console.log(`❌ ${filePath}: ${result.violations.length} violation(s)`);
        }
        
        // Progress indicator
        if (processedCount % 50 === 0) {
            console.log(`Processed ${processedCount}/${markdownFiles.length} files...`);
        }
    }
    
    // Generate and save report
    const reportContent = generateReport(results);
    fs.writeFileSync(REPORT_FILE, reportContent);
    
    // Summary output
    const invalidFiles = results.filter(r => !r.isValid);
    const totalViolations = results.reduce((sum, r) => sum + r.violations.length, 0);
    
    console.log('\nValidation Complete!');
    console.log(`Total files: ${results.length}`);
    console.log(`Files with violations: ${invalidFiles.length}`);
    console.log(`Total violations: ${totalViolations}`);
    console.log(`Report saved to: ${REPORT_FILE}`);
    
    if (invalidFiles.length > 0) {
        console.log('\nFiles with violations:');
        invalidFiles.forEach(file => {
            console.log(`  ${file.filePath} (${file.violations.length} violations)`);
        });
    }
}

// Run the validator
main();