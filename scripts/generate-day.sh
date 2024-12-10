#!/bin/bash

# Get the folder name from the first argument
folderName=$1

# Default if no argument is provided
if [ -z "$folderName" ]; then
  folderName="$RANDOM"
fi

# Extract day number from the folder name (before the first "-")
dayNumber=$(echo "$folderName" | grep -oE '^[0-9]+')
if [ -z "$dayNumber" ]; then
  echo "Error: Folder name must start with a number (e.g., '1-myFolder')."
  exit 1
fi

folderPath="src/$folderName"

configFilePath="src/config.ts"

indexFileName="index.ts"
inputFileName="input.txt"
testInputFileName="test-input.txt"

# Content for the files
indexFileContent="const readInput = async (file: string): Promise<string> => {
  const data = Bun.file(file);
  const text = await data.text();
  return text;
};

// MAIN
const main = async (file: string) => {
  const data = await readInput(file);
  console.log(data);
};

export default main;"

# Create the folder if it doesn't exist
if [ ! -d "$folderPath" ]; then
  mkdir "$folderPath"
  echo "Folder '$folderName' created."
else
  echo "Folder '$folderName' already exists."
fi

# Create index.ts
echo "$indexFileContent" > "$folderPath/$indexFileName"

# Create input files
touch "$folderPath/$inputFileName"
touch "$folderPath/$testInputFileName"

# Modify the config file
importStatement="import day$dayNumber from \"./$folderName/index\";"
daysEntry="  $dayNumber: { fn: day$dayNumber, path: \"src/$folderName\" },"

sed -i '' "1i\\
$importStatement
" "$configFilePath"

sed -i '' "/const days: Record/a\\
$daysEntry
" "$configFilePath"