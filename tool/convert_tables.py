#!/usr/bin/env python3
"""
Convert HTML tables to Markdown format in ZK documentation files.
Handles the specific patterns found in zk_component_ref directory.
"""

import re
import os
from pathlib import Path
from bs4 import BeautifulSoup, Tag

def clean_cell_content(content):
    """Clean HTML content from table cells while preserving important markup."""
    if not content:
        return ""
    
    # Parse with BeautifulSoup to handle HTML properly
    soup = BeautifulSoup(content, 'html.parser')
    
    # Remove center and p wrapper tags but keep their content
    for tag in soup.find_all(['center', 'p']):
        tag.unwrap()
    
    # Convert code tags to markdown backticks
    for code_tag in soup.find_all('code'):
        code_tag.replace_with(f"`{code_tag.get_text()}`")
    
    # Keep javadoc, strong, em tags as-is (markdown compatible)
    
    return str(soup).strip()

def convert_html_table_to_markdown(html_table):
    """Convert a single HTML table to markdown format."""
    soup = BeautifulSoup(html_table, 'html.parser')
    table = soup.find('table')
    
    if not table:
        return html_table
    
    rows = []
    headers = []
    
    # Extract headers from thead
    thead = table.find('thead')
    if thead:
        header_row = thead.find('tr')
        if header_row:
            for th in header_row.find_all(['th', 'td']):
                headers.append(clean_cell_content(str(th.get_text())).strip())
    
    # Extract data rows from tbody
    tbody = table.find('tbody')
    if tbody:
        for tr in tbody.find_all('tr'):
            row_data = []
            for td in tr.find_all(['td', 'th']):
                cell_content = clean_cell_content(str(td))
                # Remove outer td/th tags but keep inner content
                cell_soup = BeautifulSoup(cell_content, 'html.parser')
                cell_text = str(cell_soup).strip()
                # Clean up any remaining HTML artifacts
                cell_text = re.sub(r'</?td[^>]*>', '', cell_text)
                cell_text = re.sub(r'</?th[^>]*>', '', cell_text)
                row_data.append(cell_text.strip())
            if row_data:
                rows.append(row_data)
    
    # Build markdown table
    if not headers:
        return html_table
    
    markdown_lines = []
    
    # Header row
    markdown_lines.append("| " + " | ".join(headers) + " |")
    
    # Separator row
    separator = "|" + "|".join(["---"] * len(headers)) + "|"
    markdown_lines.append(separator)
    
    # Data rows
    for row in rows:
        # Pad row to match header count
        while len(row) < len(headers):
            row.append("")
        # Truncate if too long
        row = row[:len(headers)]
        
        markdown_lines.append("| " + " | ".join(row) + " |")
    
    return "\n".join(markdown_lines)

def process_file(file_path):
    """Process a single markdown file to convert HTML tables."""
    print(f"Processing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all HTML tables
        table_pattern = r'<table[^>]*>.*?</table>'
        tables = re.findall(table_pattern, content, re.DOTALL | re.IGNORECASE)
        
        if not tables:
            print(f"  No tables found in {file_path}")
            return False
        
        modified = False
        for table_html in tables:
            markdown_table = convert_html_table_to_markdown(table_html)
            if markdown_table != table_html:
                content = content.replace(table_html, markdown_table)
                modified = True
        
        if modified:
            # Write back to file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✓ Converted {len(tables)} table(s)")
            return True
        else:
            print(f"  No changes needed")
            return False
            
    except Exception as e:
        print(f"  ✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all files."""
    base_dir = Path("/Users/hawk/Documents/workspace/DOC/zkdoc/zk_component_ref")
    
    # Get list of all files containing HTML tables
    files_with_tables = []
    
    for md_file in base_dir.rglob("*.md"):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
                if '<table' in content.lower():
                    files_with_tables.append(md_file)
        except Exception as e:
            print(f"Error reading {md_file}: {e}")
    
    print(f"Found {len(files_with_tables)} files with HTML tables in zk_component_ref")
    
    converted_count = 0
    for file_path in files_with_tables:
        if process_file(file_path):
            converted_count += 1
    
    print(f"\nConversion complete: {converted_count}/{len(files_with_tables)} files modified")

if __name__ == "__main__":
    main()