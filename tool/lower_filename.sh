#!/bin/bash

# Purpose: Recursively rename all files with the specified extension (default: .md) in a directory and its subdirectories to lowercase filenames.

# Usage: lower_filename.sh <directory> [extension]
# Example: lower_filename.sh /path/to/dir .txt

# Check if a path is provided
if [ $# -lt 1 ] || [ $# -gt 2 ]; then
  echo "Usage: $0 <directory> [extension]"
  exit 1
fi

DIR="$1"
EXT="${2:-.md}"

# Navigate to the provided directory
cd "$DIR" || exit

# Find all files with the specified extension and rename them to lowercase
find . -type f -name "*$EXT" | while read -r file; do
  # Extract the directory and the filename separately
  dir=$(dirname "$file")
  base=$(basename "$file")

  # Rename the file to lowercase
  lowercase_file=$(echo "$base" | tr '[:upper:]' '[:lower:]')

  # Only rename if the lowercase version is different
  if [ "$base" != "$lowercase_file" ]; then
    mv "$file" "$dir/$lowercase_file"
  fi
done

echo "All $EXT files in $DIR and its subdirectories have been renamed to lowercase."