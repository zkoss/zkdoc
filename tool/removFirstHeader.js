const fs = require('fs').promises;
const path = require('path');

function isMatch(headerText, fileName) {
    const normalize = str => str.replace(/\s+/g, '').toLowerCase();
    return normalize(headerText) === normalize(fileName);
}

async function processMarkdownFile(filePath, fileName) {
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split('\n');
    const titleIndex = lines.findIndex(line => /^#\s+\S/.test(line));
    if (titleIndex !== -1) {
        const headerText = lines[titleIndex].replace(/^#\s+/, '');
        if (isMatch(headerText, fileName)) {
            const newLines = [
                ...lines.slice(0, titleIndex).filter(line => line.trim()),
                ...lines.slice(titleIndex + 1)
            ];
            await fs.writeFile(filePath, newLines.join('\n'));
            console.log(`Processed: ${fileName}.md`);
        }
    }
}

async function removeFirstTitle(folderPath) {
    try {
        const files = await fs.readdir(folderPath);
        const mdFiles = files.filter(file => path.extname(file) === '.md');
        for (const file of mdFiles) {
            const filePath = path.join(folderPath, file);
            const fileName = path.basename(file, '.md');
            await processMarkdownFile(filePath, fileName);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const folderPath = process.argv[2];
if (!folderPath) {
    console.error('Please provide a folder path');
    process.exit(1);
}

removeFirstTitle(folderPath);