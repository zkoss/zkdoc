#!/usr/bin/env node

/**
 * Generate Preview ZUL Files
 *
 * This script generates preview ZUL files for components that are missing them
 * by extracting examples from the markdown documentation.
 *
 * Usage:
 *   node generate-preview-zul-files.js
 */

const fs = require('fs');
const path = require('path');

// Read the missing components list
const resultsPath = path.join(__dirname, 'missing-preview-zul.json');
if (!fs.existsSync(resultsPath)) {
  console.error('Please run check-missing-preview-zul.js first');
  process.exit(1);
}

const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
const missingComponents = results.missingPreview;

console.log(`Generating preview ZUL files for ${missingComponents.length} components...\n`);

const componentRefDir = path.join(__dirname, '..', 'zk_component_ref');
const zulOutputDir = '/Users/hawk/Documents/workspace/zkThemeTemplate/src/test/resources/web';

let created = 0;
let skipped = 0;
const errors = [];

for (const component of missingComponents) {
  const docFilePath = path.join(componentRefDir, `${component}.md`);
  const zulOutputPath = path.join(zulOutputDir, `${component}.zul`);

  // Skip if ZUL file already exists
  if (fs.existsSync(zulOutputPath)) {
    skipped++;
    continue;
  }

  let zulContent = null;

  // Try to extract ZUL example from documentation
  if (fs.existsSync(docFilePath)) {
    const docContent = fs.readFileSync(docFilePath, 'utf-8');

    // Extract first ZUL/XML code block
    const codeBlockMatch = docContent.match(/```\s*(?:xml|zul)\n([\s\S]*?)```/);

    if (codeBlockMatch) {
      const example = codeBlockMatch[1].trim();

      // Wrap in proper ZUL structure if needed
      if (!example.includes('<?page') && !example.startsWith('<zk')) {
        zulContent = `<?page title="${component.charAt(0).toUpperCase() + component.slice(1)}" contentType="text/html;charset=UTF-8"?>\n<zk>\n\t${example.split('\n').join('\n\t')}\n</zk>\n`;
      } else {
        zulContent = example + '\n';
      }
    }
  }

  // If no example found in docs, create a simple default
  if (!zulContent) {
    const componentTitle = component.charAt(0).toUpperCase() + component.slice(1);
    zulContent = `<?page title="${componentTitle}" contentType="text/html;charset=UTF-8"?>\n<zk>\n\t<${component} />\n</zk>\n`;
  }

  try {
    fs.writeFileSync(zulOutputPath, zulContent);
    created++;
    console.log(`✓ Created: ${component}.zul`);
  } catch (error) {
    errors.push({ component, error: error.message });
    console.error(`✗ Failed: ${component}.zul - ${error.message}`);
  }
}

console.log(`\n\n=== SUMMARY ===`);
console.log(`Created: ${created}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('\n=== ERRORS ===');
  errors.forEach(e => console.log(`  - ${e.component}: ${e.error}`));
}
