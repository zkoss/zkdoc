#!/usr/bin/env node

/**
 * Check Missing ZUL Examples
 *
 * This script checks which UI components from zul-components-list.md
 * are missing ZUL code examples in their corresponding markdown files.
 *
 * Usage:
 *   node check-missing-zul-examples.js
 */

const fs = require('fs');
const path = require('path');

// Read the component list
const componentListPath = path.join(__dirname, 'zul-components-list.md');
const componentListContent = fs.readFileSync(componentListPath, 'utf-8');

// Extract UI components (excluding non-UI, deprecated, and addons)
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

// Check each component's documentation
const componentRefDir = path.join(__dirname, '..', 'zk_component_ref');
const missingZul = [];
const hasZul = [];
const noDocFile = [];

for (const component of uiComponents) {

  const docFilePath = path.join(componentRefDir, `${component}.md`);

  if (!fs.existsSync(docFilePath)) {
    noDocFile.push(component);
    continue;
  }

  const docContent = fs.readFileSync(docFilePath, 'utf-8');

  // Check if the doc contains ZUL code (```xml or ``` xml or ```zul)
  const hasZulCode = /```\s*(?:xml|zul)\n[\s\S]*?<[^>]*>/m.test(docContent);

  if (hasZulCode) {
    hasZul.push(component);
  } else {
    missingZul.push(component);
  }
}

// Print results
console.log('✓ Components WITH ZUL examples:', hasZul.length);
console.log('✗ Components MISSING ZUL examples:', missingZul.length);
console.log('⚠ Components WITHOUT doc files:', noDocFile.length);

if (missingZul.length > 0) {
  console.log('\n\n=== MISSING ZUL EXAMPLES ===');
  missingZul.forEach(comp => console.log(`  - ${comp}`));
}

if (noDocFile.length > 0) {
  console.log('\n\n=== NO DOC FILE ===');
  noDocFile.forEach(comp => console.log(`  - ${comp}`));
}

// Save results to JSON
const results = {
  timestamp: new Date().toISOString(),
  total: uiComponents.length,
  hasZul: hasZul,
  missingZul: missingZul,
  noDocFile: noDocFile
};

const outputPath = path.join(__dirname, 'missing-zul-examples.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`\n\nResults saved to: ${outputPath}`);
