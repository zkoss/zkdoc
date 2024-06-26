#!/bin/bash

# Input file containing the titles
inputFile="titles.txt"

# Read each line from the file
while IFS= read -r line; do
  # Count the number of slashes to determine the level
  slashCount=$(grep -o "/" <<< "$line" | wc -l)

  # Proceed if there are exactly 2 slashes indicating 3 levels
  if [ "$slashCount" -eq 2 ]; then
    # Extract the 2nd level title
    folderName=$(echo "$line" | cut -d'/' -f2)

    # Convert to lowercase and replace spaces with underscores
    folderName=$(echo "$folderName" | tr '[:upper:]' '[:lower:]' | tr ' ' '_')

    # Create the folder if it doesn't exist
    if [ ! -d "$folderName" ]; then
      echo "Creating folder: $folderName"
      mkdir "$folderName"
    else
      echo "Folder already exists: $folderName"
    fi
  fi
done < "$inputFile"