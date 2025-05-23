#!/bin/bash

# Check if path is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <path>"
  exit 1
fi

# Go to the specified path
path="$1"

# Loop through files in the specified path
for file in "$path"/*; do
  # Check if it's a file
  if [ -f "$file" ]; then
    # Get the file name and extension separately
    filename=$(basename "$file")
    dirname=$(dirname "$file")

    # Find the last dot position
    base="${filename%.*}"
    extension="${filename##*.}"

    # Replace inner dots with underscores
    new_base="${base//./_}"

    # Construct the new filename
    new_filename="${new_base}.${extension}"

    # Rename the file if it has changed
    if [ "$filename" != "$new_filename" ]; then
      mv "$file" "$dirname/$new_filename"
      echo "Renamed: $filename -> $new_filename"
    fi
  fi
done