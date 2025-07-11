#!/bin/bash

# normalize_filename.sh - Normalize filenames by converting to lowercase and replacing special characters
# 
# This script combines the functionality of dot2underscore.sh, lower_filename.sh, and to_underscore.sh
# It recursively processes files to:
# 1. Convert filenames to lowercase
# 2. Replace dots (.) with underscores (_) in the filename (but preserve the file extension)
# 3. Replace hyphens (-) with underscores (_) in the filename
#
# Usage: normalize_filename.sh <directory> [extension]
# Example: normalize_filename.sh /path/to/dir .md
# Default extension: .md

# Check if correct number of arguments provided
if [ $# -lt 1 ] || [ $# -gt 2 ]; then
  echo "Usage: $0 <directory> [extension]"
  echo "Example: $0 /path/to/dir .md"
  echo "Default extension: .md"
  exit 1
fi

DIR="$1"
EXT="${2:-.md}"

# Check if directory exists
if [ ! -d "$DIR" ]; then
  echo "Error: Directory '$DIR' does not exist"
  exit 1
fi

echo "Normalizing filenames in directory: $DIR"
echo "File extension filter: $EXT"
echo "Operations: lowercase + dots/hyphens to underscores"
echo "----------------------------------------"

# Navigate to the provided directory
cd "$DIR" || exit

# Find all files with the specified extension and normalize them
find . -type f -name "*$EXT" | while read -r file; do
  # Extract the directory and the filename separately
  dir=$(dirname "$file")
  filename=$(basename "$file")
  
  # Get the file name and extension separately
  base="${filename%.*}"
  extension="${filename##*.}"
  
  # Step 1: Convert to lowercase
  lowercase_base=$(echo "$base" | tr '[:upper:]' '[:lower:]')
  
  # Step 2: Replace dots with underscores in the base filename
  dots_replaced="${lowercase_base//./_}"
  
  # Step 3: Replace hyphens with underscores in the base filename
  normalized_base="${dots_replaced//-/_}"
  
  # Construct the new filename
  new_filename="${normalized_base}.${extension}"
  
  # Only rename if the normalized version is different
  if [ "$filename" != "$new_filename" ]; then
    # Check if target file already exists
    if [ -f "$dir/$new_filename" ]; then
      echo "Warning: Target file already exists, skipping: $filename -> $new_filename"
    else
      mv "$file" "$dir/$new_filename"
      echo "Renamed: $filename -> $new_filename"
    fi
  fi
done

echo "----------------------------------------"
echo "Filename normalization complete for all $EXT files in $DIR and its subdirectories."