/**
 * ZK Edition Comments Injector
 * 
 * MOTIVATION:
 * ZK Framework has 3 editions (CE, PE, EE) with different feature availability.
 * The documentation uses Jekyll includes like {% include edition-availability.html edition="pe" %}
 * to show visual badges, but these are not easily parseable by AI systems for understanding
 * which features require which editions.
 * 
 * PURPOSE:
 * This script automatically adds semantic HTML comments before each edition-availability include
 * to make edition requirements explicit and machine-readable:
 * 
 * Before: {% include edition-availability.html edition="pe" %}
 * After:  <!--REQUIRED ZK EDITION: PE -->
 *         {% include edition-availability.html edition="pe" %}
 * 
 * BENEFITS:
 * - AI can easily parse edition requirements from raw markdown
 * - Maintains backward compatibility with existing visual badges
 * - Improves documentation accessibility and automated processing
 * - Enables better tooling for edition-specific feature analysis
 * 
 * USAGE:
 * Run this script from the tool directory: node add-edition-comments.js
 * It will scan all *.md files and add comments where missing.
 */

const fs = require('fs');
const path = require('path');

// Define edition mappings for comment generation
const editionMapping = {
    'ce': 'CE',
    'pe': 'PE', 
    'ee': 'EE'
};

function getAllMdFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            results = results.concat(getAllMdFiles(filePath));
        } else if (file.endsWith('.md')) {
            results.push(path.relative(path.join(__dirname, '..'), filePath));
        }
    });
    
    return results;
}

function addEditionComments() {
    console.log('Scanning for *.md files with edition-availability includes...');
    
    // Find all markdown files
    const mdFiles = getAllMdFiles(path.join(__dirname, '..'));
    
    let processedFiles = 0;
    let totalMatches = 0;
    
    mdFiles.forEach(file => {
        const fullPath = path.join(__dirname, '..', file);
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        let fileMatches = 0;
        
        // Pattern to match edition-availability includes
        const pattern = /{% include edition-availability\.html edition="(ce|pe|ee)"( inline=true)? %}/g;
        
        // Replace each match with commented version
        content = content.replace(pattern, (match, edition, inline) => {
            // Check if comment already exists before this include
            const beforeMatch = content.substring(0, content.indexOf(match));
            const commentPattern = new RegExp(`<!--REQUIRED ZK EDITION: ${editionMapping[edition]} -->\\s*$`);
            
            if (!commentPattern.test(beforeMatch)) {
                modified = true;
                fileMatches++;
                totalMatches++;
                
                const comment = `<!--REQUIRED ZK EDITION: ${editionMapping[edition]} -->`;
                return `${comment}\n${match}`;
            }
            
            return match;
        });
        
        if (modified) {
            fs.writeFileSync(fullPath, content, 'utf8');
            processedFiles++;
            console.log(`✓ ${file} - Added ${fileMatches} edition comment(s)`);
        }
    });
    
    console.log(`\nCompleted! Processed ${processedFiles} files, added ${totalMatches} edition comments.`);
}

// Run the script
addEditionComments();