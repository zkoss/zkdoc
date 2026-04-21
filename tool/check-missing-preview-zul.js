#!/usr/bin/env node

/**
 * Check Missing Preview ZUL Files
 *
 * This script checks which UI components from zul-components-list.md
 * are missing preview ZUL files in zkThemeTemplate project.
 *
 * Usage:
 *   node check-missing-preview-zul.js
 */

const fs = require('fs');
const path = require('path');

// Read the component list
const componentListPath = path.join(__dirname, 'zul-components-list.md');
const componentListContent = fs.readFileSync(componentListPath, 'utf-8');

// Extract UI components (excluding non-UI and deprecated)
const uiComponentsSection = componentListContent.match(/## UI Components\n\n[\s\S]*?\n\n---/);
if (!uiComponentsSection) {
  console.error('Could not find UI Components section');
  process.exit(1);
}

const uiComponents = [];
const lines = uiComponentsSection[0].split('\n');
for (const line of lines) {
  const match = line.match(/^- \[ \] (.+)$/);
  if (match) {
    uiComponents.push(match[1]);
  }
}

console.log(`Total UI components to check: ${uiComponents.length}\n`);

// Check zkThemeTemplate directory
const zulPreviewDir = '/Users/hawk/Documents/workspace/zkThemeTemplate/src/test/resources/web';

if (!fs.existsSync(zulPreviewDir)) {
  console.error(`Directory not found: ${zulPreviewDir}`);
  process.exit(1);
}

const existingZulFiles = fs.readdirSync(zulPreviewDir)
  .filter(file => file.endsWith('.zul'))
  .map(file => file.replace('.zul', ''));

const hasPreview = [];
const missingPreview = [];

// Component name variations/mappings
const componentMappings = {
  'a': 'anchor',  // <a> tag is usually named 'anchor' in ZUL files
};

for (const component of uiComponents) {
  const componentName = componentMappings[component] || component;

  // Check if there's a ZUL file for this component
  const hasExactMatch = existingZulFiles.includes(componentName);
  const hasVariation = existingZulFiles.some(file =>
    file.startsWith(componentName + '-') ||
    file.endsWith('-' + componentName)
  );

  if (hasExactMatch || hasVariation) {
    hasPreview.push(component);
  } else {
    missingPreview.push(component);
  }
}

// Print results
console.log('✓ Components WITH preview ZUL files:', hasPreview.length);
console.log('✗ Components MISSING preview ZUL files:', missingPreview.length);
console.log('📁 Total ZUL files in directory:', existingZulFiles.length);

if (missingPreview.length > 0) {
  console.log('\n\n=== MISSING PREVIEW ZUL FILES ===');
  missingPreview.forEach(comp => console.log(`  - ${comp}`));
}

// Save results to JSON
const results = {
  timestamp: new Date().toISOString(),
  totalComponents: uiComponents.length,
  hasPreview: hasPreview,
  missingPreview: missingPreview,
  existingZulFiles: existingZulFiles
};

const outputPath = path.join(__dirname, 'missing-preview-zul.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`\n\nResults saved to: ${outputPath}`);
