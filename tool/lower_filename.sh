#!/bin/bash

# Check if a path is provided
if [ -z "$1" ]; then
  echo "Please provide a directory path."
  exit 1
fi

# Navigate to the provided directory
cd "$1" || exit

# Find all .md files and rename them to lowercase
find . -type f -name "*.md" | while read -r file; do
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

echo "All .md files in $1 and its subdirectories have been renamed to lowercase."
