#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

/**
 * Extracts ZK component list from zul.xsd and cross-references with component documentation.
 *
 * This script:
 * 1. Downloads and parses the ZUL XSD schema from zkoss.org
 * 2. Extracts all component element names
 * 3. Categorizes components into:
 *    - UI Components: Visual components for display
 *    - Non-UI Elements: Logic, control flow, and configuration elements
 *    - Deprecated: Components no longer recommended for use
 *    - Internal/Abstract: Base classes not directly usable in ZUL
 * 4. Cross-references with existing component documentation
 * 5. Handles special cases (addons, tablet components with separate docs)
 * 6. Outputs a sorted alphabetical list in Markdown or JSON format
 *
 * Usage: node extract-zul-components.js [options]
 *
 * Options:
 *   --output <file>  Output file path (default: zul-components-list.md or .json)
 *   --json           Output as JSON instead of Markdown
 *   --scan-docs      Scan documentation files to verify component docs (slower, default: skip)
 *   --verbose        Show detailed processing information including undocumented components
 *   --help           Show this help message
 *
 * Performance Note:
 *   By default, this script uses built-in lists and skips scanning documentation files.
 *   This makes it much faster. Use --scan-docs only when documentation has changed.
 */

// Built-in list of internal/abstract components that are not directly usable in ZUL
const INTERNAL_ABSTRACT_COMPONENTS = [
  // Abstract base classes
  'abstractComponent',
  'htmlBasedComponent',
  'xulElement',
  'labelElement',
  'labelImageElement',
  'inputElement',
  'headerElement',
  'footerElement',
  'headerselement',
  'meshElement',

  // Internal/system components
  'component',

  // Deprecated or rarely used directly
  'server',
  'client',
  'variable-resolver',
  'xel-method',

  // Abstract event classes
  'event',
  'abstractEvent',
];

// Non-UI elements: Logic, control flow, and configuration elements
const NON_UI_ELEMENTS = [
  // Configuration and attributes
  'attribute',
  'custom-attributes',
  'variables',
  'template',
  'zk',
  'zscript',

  // Control flow and logic
  'choose',
  'when',
  'otherwise',
  'if',
  'foreach',

  // Special scope control
  'idspace',

  // Code application
  'apply',
  'style',
];

// Deprecated components (no longer recommended for use)
const DEPRECATED_COMPONENTS = [
  'applet',      // obsolete
  'fckeditor',   // Replaced by ckeditor
  'flash',       // Flash technology is obsolete
  'flashchart',  // Replaced by modern chart components
  'fusionchart',
  'fragment',
  'hbox',        // suggest hlayout
  'vbox',        // suggest vlayout
];

// Components that have separate documentation (addons, special guides)
const SEPARATE_DOC_COMPONENTS = [
  'calendars',   // ZK Calendar addon - has its own documentation
  'charts',      // ZK Charts addon - has its own documentation
  'pivottable',  // ZK Pivottable addon - has its own documentation
  'scrollview',  // Tablet device component - documented in tablet_devices section
];

/**
 * Downloads content from a URL
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Parses XSD content and extracts element names
 */
function parseXsdElements(xsdContent) {
  const elements = [];

  // Match xs:element with name attribute
  const elementRegex = /<xs:element\s+name="([^"]+)"/g;
  let match;

  while ((match = elementRegex.exec(xsdContent)) !== null) {
    elements.push(match[1]);
  }

  return elements;
}

/**
 * Gets list of components documented in zk_component_ref/
 */
async function getDocumentedComponents() {
  const componentRefDir = path.join(__dirname, '../zk_component_ref');
  const files = await glob('*.md', { cwd: componentRefDir });

  // Extract component names from filenames (remove .md extension)
  const documented = files
    .filter(f => !f.startsWith('_')) // Ignore system files
    .map(f => path.basename(f, '.md'))
    .filter(name => {
      // Filter out common non-component docs
      const nonComponents = [
        'introduction',
        'supporting_classes',
        'supplementary',
        'layouts',
        'input',
        'xhtml_components',
        'xul_components',
        'xml_components',
        'multimedia_and_miscellaneous',
        'the_difference_between_xul_and_xhtml_components',
        'in_pure_java',
        'idspace',
        'htmlbasedcomponent',
        'htmlmacrocomponent',
        'labelimageelement',
        'labelelement',
        'inputelement',
        'headerelement',
        'headerselement',
        'footerelement',
        'xulelement',
        'layoutregion',
        'rendererctrl',
      ];
      return !nonComponents.includes(name);
    });

  return new Set(documented);
}

/**
 * Filters components list
 * @param {Array} xsdElements - Array of component names from XSD
 * @param {Set|null} documentedComponents - Set of documented component names, or null to skip checking
 * @param {boolean} verbose - Whether to show verbose output
 */
function filterComponents(xsdElements, documentedComponents, verbose) {
  const filtered = {
    usable: [],
    internal: [],
    nonUI: [],
    deprecated: [],
    undocumented: [],
  };

  xsdElements.forEach(component => {
    const lowerComponent = component.toLowerCase();

    // Check if it's internal/abstract
    if (INTERNAL_ABSTRACT_COMPONENTS.includes(lowerComponent)) {
      filtered.internal.push(component);
      return;
    }

    // Check if it's a non-UI element
    if (NON_UI_ELEMENTS.includes(lowerComponent)) {
      filtered.nonUI.push(component);
      return;
    }

    // Check if it's deprecated
    if (DEPRECATED_COMPONENTS.includes(lowerComponent)) {
      filtered.deprecated.push(component);
      return;
    }

    // If not scanning docs, add all remaining components to usable list
    if (!documentedComponents) {
      filtered.usable.push(component);
      return;
    }

    // Check if documented (including components with separate documentation)
    if (documentedComponents.has(lowerComponent) || SEPARATE_DOC_COMPONENTS.includes(lowerComponent)) {
      filtered.usable.push(component);
    } else {
      // Component in XSD but not documented - might be internal or newly added
      if (verbose) {
        filtered.undocumented.push(component);
      }
      // Still add to usable list as it's in the XSD
      filtered.usable.push(component);
    }
  });

  return filtered;
}

/**
 * Formats output as Markdown
 */
function formatMarkdown(filtered, stats) {
  let output = '# ZK ZUL Components Reference\n\n';
  output += `*Generated on ${new Date().toISOString().split('T')[0]}*\n\n`;
  output += `Total UI components: **${filtered.usable.length}**\n\n`;
  output += `Total non-UI elements: **${filtered.nonUI.length}**\n\n`;
  output += '---\n\n';
  output += '## UI Components\n\n';
  output += '*Visual components that can be used in ZUL files:*\n\n';

  filtered.usable.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  filtered.usable.forEach(comp => {
    output += `- [ ] ${comp}\n`;
  });

  output += '\n---\n\n';
  output += '## Non-UI Elements\n\n';
  output += '*Logic, control flow, and configuration elements:*\n\n';

  filtered.nonUI.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  filtered.nonUI.forEach(comp => {
    output += `- [ ] ${comp}\n`;
  });

  if (filtered.deprecated.length > 0) {
    output += '\n---\n\n';
    output += '## Deprecated Components\n\n';
    output += '*Components that are deprecated and no longer recommended for use:*\n\n';

    filtered.deprecated.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    filtered.deprecated.forEach(comp => {
      output += `- ~~${comp}~~\n`;
    });
  }

  if (filtered.undocumented.length > 0) {
    output += '\n---\n\n';
    output += '## Undocumented Components\n\n';
    output += '*Components found in XSD but not in documentation (may be internal or newly added):*\n\n';

    filtered.undocumented.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    filtered.undocumented.forEach(comp => {
      output += `- ${comp}\n`;
    });
  }

  if (filtered.internal.length > 0) {
    output += '\n---\n\n';
    output += '## Internal/Abstract Components\n\n';
    output += '*Components filtered out (not directly usable in ZUL):*\n\n';

    filtered.internal.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    filtered.internal.forEach(comp => {
      output += `- ${comp}\n`;
    });
  }

  return output;
}

/**
 * Formats output as JSON
 */
function formatJson(filtered) {
  return JSON.stringify({
    generated: new Date().toISOString(),
    ui_components: filtered.usable.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
    non_ui_elements: filtered.nonUI.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
    deprecated: filtered.deprecated.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
    internal: filtered.internal.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
    undocumented: filtered.undocumented.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
    stats: {
      total_ui_components: filtered.usable.length,
      total_non_ui_elements: filtered.nonUI.length,
      total_deprecated: filtered.deprecated.length,
      total_internal: filtered.internal.length,
      total_undocumented: filtered.undocumented.length,
    }
  }, null, 2);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  let outputFile = 'zul-components-list.md';
  let jsonOutput = false;
  let verbose = false;
  let scanDocs = false;

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && i + 1 < args.length) {
      outputFile = args[i + 1];
      i++;
    } else if (args[i] === '--json') {
      jsonOutput = true;
      if (outputFile === 'zul-components-list.md') {
        outputFile = 'zul-components-list.json';
      }
    } else if (args[i] === '--verbose') {
      verbose = true;
    } else if (args[i] === '--scan-docs') {
      scanDocs = true;
    } else if (args[i] === '--help') {
      console.log('Usage: node extract-zul-components.js [options]');
      console.log('');
      console.log('Options:');
      console.log('  --output <file>  Output file path (default: zul-components-list.md)');
      console.log('  --json           Output as JSON instead of Markdown');
      console.log('  --scan-docs      Scan documentation files (slower, use when docs change)');
      console.log('  --verbose        Show detailed processing information');
      console.log('  --help           Show this help message');
      process.exit(0);
    }
  }

  console.log('🔍 Extracting ZK ZUL components...\n');

  try {
    // Step 1: Download XSD
    console.log('📥 Downloading zul.xsd from zkoss.org...');
    const xsdUrl = 'https://www.zkoss.org/2005/zul/zul.xsd';
    const xsdContent = await fetchUrl(xsdUrl);
    console.log('✓ XSD downloaded successfully\n');

    // Step 2: Parse XSD elements
    console.log('🔍 Parsing XSD elements...');
    const xsdElements = parseXsdElements(xsdContent);
    console.log(`✓ Found ${xsdElements.length} elements in XSD\n`);

    // Step 3: Get documented components (optional)
    let documentedComponents = null;
    if (scanDocs) {
      console.log('📚 Scanning component documentation...');
      documentedComponents = await getDocumentedComponents();
      console.log(`✓ Found ${documentedComponents.size} documented components\n`);
    } else {
      console.log('📚 Using built-in component lists (skip --scan-docs for faster execution)\n');
    }

    // Step 4: Filter components
    console.log('🔧 Filtering components...');
    const filtered = filterComponents(xsdElements, documentedComponents, verbose);
    console.log(`✓ UI components: ${filtered.usable.length}`);
    console.log(`✓ Non-UI elements: ${filtered.nonUI.length}`);
    console.log(`✓ Deprecated components: ${filtered.deprecated.length}`);
    console.log(`✓ Internal components: ${filtered.internal.length}`);
    if (verbose) {
      console.log(`✓ Undocumented components: ${filtered.undocumented.length}`);
    }
    console.log('');

    // Step 5: Format output
    console.log('📝 Generating output...');
    const output = jsonOutput
      ? formatJson(filtered)
      : formatMarkdown(filtered, {
          total: xsdElements.length,
          documented: documentedComponents ? documentedComponents.size : 0,
        });

    // Step 6: Write to file
    const outputPath = path.join(__dirname, outputFile);
    fs.writeFileSync(outputPath, output, 'utf8');
    console.log(`✓ Output written to: ${outputPath}\n`);

    console.log('✨ Done!\n');

    // Show summary
    console.log('Summary:');
    console.log(`  UI components:       ${filtered.usable.length}`);
    console.log(`  Non-UI elements:     ${filtered.nonUI.length}`);
    console.log(`  Deprecated:          ${filtered.deprecated.length}`);
    console.log(`  Internal components: ${filtered.internal.length}`);
    if (verbose && filtered.undocumented.length > 0) {
      console.log(`  Undocumented:        ${filtered.undocumented.length}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (verbose) {
      console.error(error);
    }
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  parseXsdElements,
  filterComponents,
  INTERNAL_ABSTRACT_COMPONENTS,
  NON_UI_ELEMENTS,
  DEPRECATED_COMPONENTS,
  SEPARATE_DOC_COMPONENTS
};
