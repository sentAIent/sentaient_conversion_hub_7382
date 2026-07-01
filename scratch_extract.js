const fs = require('fs');

const scriptPath = 'public/interstellar-game/script.js';
const rendererPath = 'public/interstellar-game/js/systems/Renderer.js';

let scriptContent = fs.readFileSync(scriptPath, 'utf8');
let rendererContent = fs.readFileSync(rendererPath, 'utf8');

function extractMethod(methodName) {
    const regex = new RegExp(`^\\s*${methodName}\\([^)]*\\)\\s*\\{`, 'm');
    const match = scriptContent.match(regex);
    if (!match) {
        console.log(`Method ${methodName} not found.`);
        return;
    }

    const startIndex = match.index;
    let braceCount = 0;
    let endIndex = -1;
    let inString = false;
    let stringChar = '';
    let inSingleComment = false;
    let inMultiComment = false;

    for (let i = startIndex; i < scriptContent.length; i++) {
        const char = scriptContent[i];
        const nextChar = scriptContent[i + 1];

        // Handle comments and strings
        if (inSingleComment) {
            if (char === '\n') inSingleComment = false;
            continue;
        }
        if (inMultiComment) {
            if (char === '*' && nextChar === '/') {
                inMultiComment = false;
                i++;
            }
            continue;
        }
        if (inString) {
            if (char === '\\') { i++; continue; }
            if (char === stringChar) inString = false;
            continue;
        }

        if (char === '/' && nextChar === '/') { inSingleComment = true; i++; continue; }
        if (char === '/' && nextChar === '*') { inMultiComment = true; i++; continue; }
        if (char === '"' || char === "'" || char === '`') { inString = true; stringChar = char; continue; }

        // Count braces
        if (char === '{') {
            braceCount++;
        } else if (char === '}') {
            braceCount--;
            if (braceCount === 0) {
                endIndex = i;
                break;
            }
        }
    }

    if (endIndex === -1) {
        console.log(`Could not find end of method ${methodName}`);
        return;
    }

    const methodCode = scriptContent.substring(startIndex, endIndex + 1);
    
    // Add 'this.game' prefix to property accesses where needed
    // This is complex, so we'll just extract it as-is for now and do a regex replace
    // to map 'this.canvas' to 'this.game.canvas' or 'this.ctx'
    
    // Remove from script.js
    scriptContent = scriptContent.substring(0, startIndex) + scriptContent.substring(endIndex + 1);
    
    // Insert into Renderer.js just before the last closing brace
    const insertPos = rendererContent.lastIndexOf('}');
    rendererContent = rendererContent.substring(0, insertPos) + '\n    ' + methodCode + '\n' + rendererContent.substring(insertPos);
    
    console.log(`Successfully extracted ${methodName}`);
}

extractMethod('drawBackgroundElements');
extractMethod('drawPlanet');

fs.writeFileSync(scriptPath, scriptContent);
fs.writeFileSync(rendererPath, rendererContent);
console.log('Extraction complete.');
