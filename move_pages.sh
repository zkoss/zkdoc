#!/bin/bash

# File containing the list of titles
inputFile="titles.txt"

# Process each line from the file
while IFS= read -r line; do
    # Extract the folder name (2nd level title) and the file name (last title)
    folderName=$(echo "$line" | cut -d'/' -f2)
    lastTitle=$(basename "$line")

    # Convert folder name to lowercase and replace spaces with underscores
    folderName=$(echo "$folderName" | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
    # Convert last title to filename in lowercase and replace spaces with underscores
    fileName=$(echo "$lastTitle" | tr '[:upper:]' '[:lower:]' | tr ' ' '_' | sed 's/$/.md/')

    # Create the folder if it does not exist
    if [ ! -d "$folderName" ]; then
        echo "Creating folder: $folderName"
        mkdir -p "$folderName"
    fi

    # Move the file to the folder, check if file exists before moving
    if [ -f "$fileName" ]; then
        echo "Moving $fileName to $folderName"
        mv "$fileName" "$folderName/"
    else
        echo "File does not exist: $fileName"
    fi
done < "$inputFile"
