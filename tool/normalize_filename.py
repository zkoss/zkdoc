#!/usr/bin/env python3

"""
normalize_filename.py - Normalize filenames by converting to lowercase and replacing special characters

This script combines the functionality of dot2underscore.sh, lower_filename.sh, and to_underscore.sh
It recursively processes files to:
1. Convert filenames to lowercase
2. Replace dots (.) with underscores (_) in the filename (but preserve the file extension)
3. Replace hyphens (-) with underscores (_) in the filename

Usage: python3 normalize_filename.py <directory> [extension]
Example: python3 normalize_filename.py /path/to/dir .md
Default extension: .md
"""

import os
import sys
import argparse
from pathlib import Path


def normalize_filename(filepath):
    """
    Normalize a single filename by converting to lowercase and replacing special characters.
    
    Args:
        filepath (Path): Path object of the file to normalize
        
    Returns:
        Path: New normalized path, or original path if no changes needed
    """
    # Get the file name and extension separately
    base_name = filepath.stem
    extension = filepath.suffix
    
    # Step 1: Convert to lowercase
    lowercase_base = base_name.lower()
    
    # Step 2: Replace dots with underscores in the base filename
    dots_replaced = lowercase_base.replace('.', '_')
    
    # Step 3: Replace hyphens with underscores in the base filename
    normalized_base = dots_replaced.replace('-', '_')
    
    # Construct the new filename
    new_filename = f"{normalized_base}{extension}"
    
    return filepath.parent / new_filename


def process_directory(directory, extension='.md'):
    """
    Process all files in directory with given extension.
    
    Args:
        directory (str): Directory path to process
        extension (str): File extension to filter (default: .md)
    """
    dir_path = Path(directory)
    
    # Check if directory exists
    if not dir_path.exists() or not dir_path.is_dir():
        print(f"Error: Directory '{directory}' does not exist")
        return False
    
    print(f"Normalizing filenames in directory: {directory}")
    print(f"File extension filter: {extension}")
    print("Operations: lowercase + dots/hyphens to underscores")
    print("-" * 40)
    
    # Find all files with the specified extension recursively
    pattern = f"*{extension}"
    files_processed = 0
    files_renamed = 0
    
    for filepath in dir_path.rglob(pattern):
        if filepath.is_file():
            files_processed += 1
            new_filepath = normalize_filename(filepath)
            
            # Only rename if the normalized version is different
            if filepath.name != new_filepath.name:
                # Check if target file already exists (excluding the current file)
                if new_filepath.exists() and not filepath.samefile(new_filepath):
                    print(f"Warning: Target file already exists, skipping: {filepath.name} -> {new_filepath.name}")
                else:
                    try:
                        filepath.rename(new_filepath)
                        print(f"Renamed: {filepath.name} -> {new_filepath.name}")
                        files_renamed += 1
                    except OSError as e:
                        print(f"Error renaming {filepath.name}: {e}")
    
    print("-" * 40)
    print(f"Filename normalization complete for all {extension} files in {directory} and its subdirectories.")
    print(f"Files processed: {files_processed}, Files renamed: {files_renamed}")
    
    return True


def main():
    parser = argparse.ArgumentParser(
        description='Normalize filenames by converting to lowercase and replacing special characters',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 normalize_filename.py /path/to/dir .md
  python3 normalize_filename.py /path/to/images .png
  python3 normalize_filename.py . .jpg
        """
    )
    
    parser.add_argument('directory', help='Directory to process')
    parser.add_argument('extension', nargs='?', default='.md', 
                       help='File extension to filter (default: .md)')
    
    args = parser.parse_args()
    
    # Ensure extension starts with a dot
    if not args.extension.startswith('.'):
        args.extension = '.' + args.extension
    
    success = process_directory(args.directory, args.extension)
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()