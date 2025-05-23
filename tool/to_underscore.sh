#!/bin/bash

# Check if a directory path is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <path>"
  exit 1
fi

# Traverse the given path and its subdirectories
find "$1" -type f -name "*.md" | while read -r file; do
  # Get directory and filename
  dir=$(dirname "$file")
  base=$(basename "$file")

  # Replace hyphen with underscore in the filename
  new_base=$(echo "$base" | tr '-' '_')

  # If the filename has changed, rename the file
  if [ "$base" != "$new_base" ]; then
    mv "$file" "$dir/$new_base"
    echo "Renamed: $file -> $dir/$new_base"
  fi
done