# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Jekyll-based documentation website for ZK framework, hosted on GitHub Pages. It contains comprehensive documentation across multiple "books" covering different aspects of ZK development.

## Architecture

### Jekyll Configuration
- Uses **Minimal Mistakes** theme (local development version)
- Configured for GitHub Pages deployment
- Custom skin: "zk" theme
- Google Analytics and Search enabled
- Multi-level navigation support (3 levels deep)

### Content Structure
The documentation is organized into themed "books", each in its own directory:
- `get_started/` - Beginner guides and quick start
- `zk_essentials/` - Core concepts and fundamentals
- `zk_dev_ref/` - Developer's reference and advanced topics
- `zk_mvvm_ref/` - MVVM pattern implementation
- `zk_component_ref/` - Complete component reference
- `zuml_ref/` - ZUML markup language reference
- `zk_installation_guide/` - Setup and installation
- `zk_config_ref/` - Configuration reference
- Plus additional specialized guides (Charts, Calendar, Spring, etc.)
- `small_talk/` - a collection of technical articles by ZK developers and contributors. It's a technical resource for the ZK community, covering topics like new releases, specific features, and experimental add-ons.


### Navigation System
- Main navigation defined in `_data/navigation.yml`
- Each book has its own navigation section
- Supports 3-level hierarchy with `nav_list` include
- URLs use permalinks to match sidebar highlighting

## Development Commands

### Local Development
```bash
# Install dependencies (one-time setup)
bundle install

# Start local development server
./preview.sh
# or manually:
bundle exec jekyll serve --incremental --config _config.yml
```

### Content Tools
The `tool/` directory contains Node.js utilities for content management:

```bash
# Install tool dependencies
cd tool && npm install

# Validate all links in documentation
npm run validate-links

# Save link validation results
npm run validate-links-save

# Validate links by individual books
npm run validate-by-books

# Convert navigation URLs to lowercase
npm run lowercase-nav-urls

# Extract ZK components from XSD (generate component checklist)
npm run extract-components

# Extract components as JSON format
npm run extract-components-json

# Extract components with verbose output
npm run extract-components-verbose

# Extract and verify against documentation (slower)
npm run extract-components-scan
```
All tool scripts should have header comments to explain their purpose and usage.

#### Component Extraction Tool
The `extract-zul-components.js` script extracts all usable ZK components from the official ZUL XSD schema:
- Downloads and parses `zul.xsd` from zkoss.org
- Uses built-in lists to categorize components (fast by default)
- Optional: Cross-references with `zk_component_ref/` documentation using `--scan-docs`
- Categorizes into: UI components, non-UI elements, deprecated, and internal/abstract
- Generates sorted alphabetical list in Markdown or JSON format
- Performance: Fast by default (skips doc scanning), use `--scan-docs` only when documentation changes

### Available Shell Scripts
- `preview.sh` - Start Jekyll development server
- `fix_links.sh` - Fix broken links across documentation
- `tool/create_folders.sh` - Create folder structure
- `tool/move_pages.sh` - Move pages between directories
- `tool/normalize_filename.sh` - Normalize file naming
- `tool/rename_readme.sh` - Rename README files

## Content Guidelines

### Page Structure
- Each page requires Jekyll front matter with `layout: single`
- Use `toc: true` for table of contents
- Navigation sidebar set via `defaults` in `_config.yml`
- Permalinks should match navigation URLs for proper highlighting

### Image Handling
- Books with 1 level: use relative paths for images
- Books with multiple levels: use absolute paths for images
- Image path replacement pattern: `![](images/$1)`

### Link Conventions
- Internal links should use permalinks
- External links to JavaDoc/JavaScript docs maintained in navigation
- Legacy API links preserved for backward compatibility

### Content Editing Notes
- Remove "Version History" sections from imported content
- Replace `versionsince` with `supported-since.html version=`
- Use absolute paths for multi-level book images
- Check page links using validation tools

## Deployment

- Hosted on GitHub Pages
- Automatic deployment on push to master branch
- Uses `github-pages` gem for consistent environment
- Custom 404 page available at `/404.html`

## Theme Customization

The site uses a customized version of Minimal Mistakes:
- Local theme path: Uses local development version
- Custom skin: "zk"
- Logo: `/assets/images/ZK-logo.svg`
- Search: Google Custom Search Engine integration
- Analytics: Google Analytics configured
- theme files are at /Users/hawk/Documents/workspace/KEIKAI-SPACE/minimal-mistakes
- all css files are in theme project

### CSS Best Practices

**PRIORITY: Always use `em` units instead of `px`** for:
- Font sizes
- Spacing (margin, padding)
- Element dimensions that should scale with text
- Border widths (except 1px hairlines)
- Box shadows (blur, spread values)

**Use standard Minimal Mistakes breakpoints** (defined in `_sass/minimal-mistakes/_variables.scss`):
- `$small`: 600px
- `$medium`: 768px
- `$medium-wide`: 900px
- `$large`: 1024px
- `$x-large`: 1280px

**Benefits of `em` units:**
- Scales with user font size preferences (accessibility)
- Maintains proportions across different contexts
- More maintainable and flexible
- Better responsive design