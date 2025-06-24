# ZK Documentation Tools

This directory contains Node.js tools for maintaining and validating the ZK documentation project.

## Tools Available

### 1. Link Validation Tool (`validate-links.js`)

Validates all image and page links in markdown files (*.md) within the ZK documentation project.

### 2. Lowercase Link Converter (`lowercase-links.js`)

Converts all `{{site.baseurl}}` page links to lowercase in markdown files.

## Usage

### Basic validation (output to console):
```bash
node validate-links.js
# or
npm run validate-links
```

### Save report to file:
```bash
node validate-links.js --save
# or
npm run validate-links-save
```

### Validate by books in order (console output):
```bash
node validate-links.js --by-books
# or
npm run validate-by-books
```

### Validate by books and save separate reports:
```bash
node validate-links.js --by-books --save
# or
npm run validate-by-books-save
```

## Lowercase Link Converter Usage

### Preview changes (dry-run mode):
```bash
node lowercase-links.js --dry-run
# or
npm run lowercase-links-dry
```

### Apply changes to files:
```bash
node lowercase-links.js
# or
npm run lowercase-links
```

### Apply changes and save detailed report:
```bash
node lowercase-links.js --save-report
# or
npm run lowercase-links-save
```

## Link Validation Rules

A valid link must meet one of the following criteria:

1. **Baseurl links**: Start with `{{site.baseurl}}` or `/{{site.baseurl}}`
   - Example: `{{site.baseurl}}/zk_component_ref/button`
   
2. **Image links**: Start with `/images/`
   - Example: `/images/sample.jpeg`
   
3. **Absolute book folder links**: Start with `/book_folder_name/`
   - Example: `/zk_component_ref/Button` or `/zk_component_ref/images/example.png`
   
4. **Relative book folder links**: Start with a book folder name
   - Valid book folders: `get_started`, `zats_essentials`, `zk_calendar_essentials`, etc.
   - Example: `zk_component_ref/Button`

5. **ZK Wiki links**: Start with `http://books.zkoss.org/wiki/`
   - Example: `http://books.zkoss.org/wiki/Small%20Talks`
   
6. **External links**: Start with `http://` or `https://`
   - Example: `https://www.zkoss.org`
   
7. **Anchor links**: Start with `#`
   - Example: `#section-title`
   
8. **Relative links**: Links relative to the current file location
   - Example: `../images/example.png`

## Output

The tool will output:
- ✅ Success message if all links are valid
- ❌ Detailed report of invalid links including:
  - File path and line number
  - The invalid link URL
  - Link text
  - Reason why the link is invalid

## Features

- Validates both markdown links `[text](url)` and image links `![alt](src)`
- Distinguishes between page links and image links in the output
- Groups errors by file for easy navigation
- Supports both console output and file output
- **Book-by-book validation**: Process books in the order defined in `BOOK_FOLDERS`
- **Separate reports**: Generate individual report files for each book
- **Summary report**: Overview of all validation results
- Returns appropriate exit codes for CI/CD integration

## Book-by-Book Validation

When using the `--by-books` flag, the tool:

1. Processes each book folder in the order defined in `BOOK_FOLDERS` array
2. Shows progress for each book during validation
3. When combined with `--save`, creates separate report files:
   - `reports/[book-name]-report.txt` for each book
   - `reports/summary-report.txt` with overall statistics

### Book Processing Order

The books are processed in this order:
1. `get_started`
2. `main` 
3. `zats_essentials`
4. `zk_calendar_essentials`
5. `zk_charts_essentials`
6. `zk_client_side_ref`
7. `zk_component_dev_essentials`
8. `zk_component_ref`
9. `zk_config_ref`
10. `zk_dev_ref`
11. `zk_essentials`
12. `zk_installation_guide`
13. `zk_jsp_tags_essentials`
14. `zk_mvvm_ref`
15. `zk_pivottable_essentials`
16. `zk_spring_essentials`
17. `zk_studio_essentials`
18. `zk_style_customization_guide`
19. `zuml_ref`

## Lowercase Link Converter

The `lowercase-links.js` tool automatically converts all `{{site.baseurl}}` page links to lowercase to ensure consistency across the documentation.

### What it converts:

- `{{site.baseurl}}/zk_component_ref/button` → `{{site.baseurl}}/zk_component_ref/button`
- `{{site.baseurl}}/zk_dev_ref/performance_tips/some_page` → `{{site.baseurl}}/zk_dev_ref/performance_tips/some_page`
- `/{{site.baseurl}}/zk_config_ref/the_element` → `/{{site.baseurl}}/zk_config_ref/the_element`

### Features:

- **Dry-run mode**: Preview all changes without modifying files
- **Batch processing**: Processes all `.md` files in the project
- **Detailed reporting**: Shows exactly what links were converted
- **Safe operation**: Only converts the path portion, preserves link structure
- **Progress tracking**: Shows which files are being processed

### Example Output:

```
🔤 Converting baseurl links to lowercase...
📁 Root directory: /path/to/zkdoc
🔍 Mode: DRY RUN (preview only)

🔍 zk_component_ref/Grid.md: 4 link(s) converted
🔍 zk_dev_ref/Performance.md: 12 link(s) converted

📊 CONVERSION SUMMARY
===================
Files processed: 1,247
Total links converted: 3,892

📝 DETAILED CHANGES:
==================

📄 zk_component_ref/Grid.md
  🔗 {{site.baseurl}}/zk_component_ref/group
  ➡️  {{site.baseurl}}/zk_component_ref/group
```

## Example Output

```
📄 zk_component_ref/Button.md
  🔗 Line 15: /invalid/path
     Text: "Invalid Link"
     Reason: File not found: invalid/path.md

  🖼️ Line 20: images/missing.png
     Text: "Missing Image"
     Reason: Image file not found: zk_component_ref/images/missing.png
```

# javadoc link replacement
## lowercase-nav-urls.js

Converts URLs to lowercase for a specified book in `_data/navigation.yml` while preserving titles.

### Usage
```bash
node lowercase-nav-urls.js <book-name>
```

### Example
```bash
node lowercase-nav-urls.js zk_dev_ref
```

### Features
- Automatically creates a backup of navigation.yml before making changes
- Shows all URL changes that were made
- Preserves all titles unchanged
- Lists available books if an invalid book name is provided
- Counts and reports the number of changes made

### Example Output
```
Backup created: /path/to/_data/navigation.yml.backup.1750413470926

Processing "zk_dev_ref" section...
URL changes:
  /zk_dev_ref/MVC/Template → /zk_dev_ref/mvc/template
  /zk_dev_ref/MVC/Listbox_Template → /zk_dev_ref/mvc/listbox_template
  ...

Completed! 181 URLs converted to lowercase in "zk_dev_ref" section.
Titles were preserved unchanged.
```

# javadoc link replacement
zk javadoc root: https://www.zkoss.org/javadoc/latest/zk/
e.g. a class ` org.zkoss.zul.ChartModel` is at https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ChartModel.html
old javadoc link from mediawiki: `<javadoc>org.zkoss.zul.ChartModel</javadoc>`