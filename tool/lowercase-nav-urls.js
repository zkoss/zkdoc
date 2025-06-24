#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Converts URLs to lowercase for a specified book in navigation.yml while preserving titles
 * Usage: node lowercase-nav-urls.js <book-name>
 * Example: node lowercase-nav-urls.js zk_dev_ref
 */

function lowercaseUrls(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => lowercaseUrls(item));
    } else if (obj && typeof obj === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            if (key === 'url' && typeof value === 'string') {
                // Convert URL to lowercase, preserving the leading slash and structure
                result[key] = value.toLowerCase();
            } else {
                result[key] = lowercaseUrls(value);
            }
        }
        return result;
    }
    return obj;
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.error('Usage: node lowercase-nav-urls.js <book-name>');
        console.error('Example: node lowercase-nav-urls.js zk_dev_ref');
        process.exit(1);
    }
    
    const bookName = args[0];
    const navigationPath = path.join(__dirname, '../_data/navigation.yml');
    
    // Check if navigation.yml exists
    if (!fs.existsSync(navigationPath)) {
        console.error(`Error: navigation.yml not found at ${navigationPath}`);
        process.exit(1);
    }
    
    try {
        // Read and parse the YAML file
        const yamlContent = fs.readFileSync(navigationPath, 'utf8');
        const navigation = yaml.load(yamlContent);
        
        // Check if the specified book exists
        if (!navigation[bookName]) {
            console.error(`Error: Book "${bookName}" not found in navigation.yml`);
            console.log('Available books:', Object.keys(navigation).filter(key => Array.isArray(navigation[key])).join(', '));
            process.exit(1);
        }
        
        // Create a backup
        const backupPath = navigationPath + '.backup.' + Date.now();
        fs.copyFileSync(navigationPath, backupPath);
        console.log(`Backup created: ${backupPath}`);
        
        // Convert URLs to lowercase for the specified book
        const originalBook = JSON.parse(JSON.stringify(navigation[bookName])); // Deep copy
        navigation[bookName] = lowercaseUrls(navigation[bookName]);
        
        // Count changes
        let changeCount = 0;
        function countChanges(original, modified) {
            if (Array.isArray(original) && Array.isArray(modified)) {
                for (let i = 0; i < original.length; i++) {
                    if (original[i] && modified[i]) {
                        countChanges(original[i], modified[i]);
                    }
                }
            } else if (original && modified && typeof original === 'object' && typeof modified === 'object') {
                for (const key of Object.keys(original)) {
                    if (key === 'url' && original[key] !== modified[key]) {
                        changeCount++;
                        console.log(`  ${original[key]} → ${modified[key]}`);
                    } else if (key !== 'url') {
                        countChanges(original[key], modified[key]);
                    }
                }
            }
        }
        
        console.log(`\nProcessing "${bookName}" section...`);
        console.log('URL changes:');
        countChanges(originalBook, navigation[bookName]);
        
        // Write the updated YAML back to file
        const updatedYaml = yaml.dump(navigation, {
            indent: 2,
            lineWidth: -1,
            noRefs: true,
            quotingType: '"',
            forceQuotes: false
        });
        
        fs.writeFileSync(navigationPath, updatedYaml, 'utf8');
        
        console.log(`\nCompleted! ${changeCount} URLs converted to lowercase in "${bookName}" section.`);
        console.log(`Titles were preserved unchanged.`);
        
    } catch (error) {
        console.error('Error processing navigation.yml:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { lowercaseUrls };