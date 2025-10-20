#!/usr/bin/env python3
"""
create_legacy_posts.py - Create Jekyll posts for legacy Small Talk articles.

This script scrapes the ZK documentation page to generate markdown files
for legacy articles, populating the front matter with metadata from a table
and a link back to the original content.

Based on the plan in: _spec/small-talk-link-back.md

Usage: python3 tool/create_legacy_posts.py
"""

import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
import os
import unicodedata

SOURCE_URL = "https://www.zkoss.org/documentation"
POSTS_DIR = "_posts"

def format_date(date_str):
    """Format date from 'Month Day, Year' to 'YYYY-MM-DD'."""
    if not date_str:
        return None
    # Normalize month abbreviations (e.g., "Sep." -> "Sep")
    date_str = date_str.replace('.', '')
    try:
        # Try parsing with full month name
        dt = datetime.strptime(date_str, '%B %d, %Y')
    except ValueError:
        try:
            # Fallback for abbreviated month name
            dt = datetime.strptime(date_str, '%b %d, %Y')
        except ValueError:
            print(f"    - WARNING: Could not parse date '{date_str}'.")
            return None
    return dt.strftime('%Y-%m-%d')

def create_slug(title):
    """Create a URL-friendly slug from a title."""
    # Normalize to NFD (decompose characters)
    s = unicodedata.normalize('NFD', title)
    # Remove combining characters
    s = "".join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s) # Remove non-alphanumeric characters
    s = re.sub(r'[\s-]+', '-', s).strip('-') # Replace spaces and hyphens with a single hyphen
    return s

def main():
    """Main function to orchestrate the scraping and file creation."""
    if not os.path.exists(POSTS_DIR):
        print(f"Creating directory: {POSTS_DIR}")
        os.makedirs(POSTS_DIR)

    print(f"Fetching data from {SOURCE_URL}...")
    try:
        response = requests.get(SOURCE_URL)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"FATAL: Error fetching source page: {e}")
        return

    soup = BeautifulSoup(response.content, 'html.parser')
    table = soup.find('table', id='smalltalk-list')

    if not table:
        print("FATAL: Could not find table with id 'smalltalk-list'. Exiting.")
        return

    rows = table.find_all('tr')
    print(f"Found {len(rows)} articles in the table.")

    created_count = 0
    error_count = 0

    for row in rows:
        columns = row.find_all('td')
        if len(columns) < 7:
            continue  # Skip header or malformed rows

        try:
            title_tag = columns[0].find('a')
            if not title_tag:
                print(f"  - WARNING: Skipping row, could not find title link.")
                error_count += 1
                continue

            title = title_tag.get_text(strip=True)
            link = title_tag['href']
            author = columns[2].get_text(strip=True)
            date_str = columns[4].get_text(strip=True)
            version = columns[6].get_text(strip=True)

            formatted_date = format_date(date_str)
            if not formatted_date:
                error_count += 1
                continue

            slug = create_slug(title)
            filename = f"{formatted_date}-{slug}.md"
            filepath = os.path.join(POSTS_DIR, filename)

            front_matter = (
                f"---\n"
                f"title: \"{title.replace('"', '\"')}\"\n"
                f"date: {formatted_date}\n"
                f"author: \"{author}\"\n"
                f"version: \"{version}\"\n"
                f"category: small-talk\n"
                f"link: \"{link}\"\n"
                f"---\n"
            )

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(front_matter)
            
            print(f"  -> Created: {filename}")
            created_count += 1

        except Exception as e:
            print(f"  - ERROR: Could not process row. Details: {e}")
            error_count += 1

    print("\n--- Summary Report ---")
    print(f"Total articles found: {len(rows)}")
    print(f"Successfully created files: {created_count}")
    print(f"Skipped or failed articles: {error_count}")
    print("----------------------")

if __name__ == "__main__":
    main()