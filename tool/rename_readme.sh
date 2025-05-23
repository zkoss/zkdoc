#!/bin/bash

# Check if the script receives the path parameter
if [ -z "$1" ]; then
  echo "Usage: $0 /path/to/directory"
  exit 1
fi

# Assign the first argument to the variable 'path'
path="$1"

# Check if the provided path exists and is a directory
if [ ! -d "$path" ]; then
  echo "Error: Directory '$path' does not exist."
  exit 1
fi

# Find all README.md files and rename them to index.md
find "$path" -type f -name "README.md" | while read file; do
    # Get the directory of the current file
    dir=$(dirname "$file")
    # Rename README.md to index.md
    mv "$file" "$dir/index.md"
    echo "Renamed $file to $dir/index.md"
done
