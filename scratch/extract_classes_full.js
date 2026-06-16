const fs = require('fs');
const code = fs.readFileSync('binaural-assets/js/visuals/CymaticsCore_v4.js', 'utf8');

// We will find the object literal `const CYMATIC_PALETTES = { ... }`
const startIdx = code.indexOf('const CYMATIC_PALETTES = {');
let endIdx = -1;
if (startIdx !== -1) {
    let braceCount = 0;
    for (let i = startIdx + 25; i < code.length; i++) {
        if (code[i] === '{') braceCount++;
        else if (code[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                endIdx = i + 1;
                break;
            }
        }
    }
}

if (startIdx !== -1 && endIdx !== -1) {
    const objStr = code.substring(startIdx + 25, endIdx);
    // Since it's not strictly JSON, we can parse it with eval if we assign it.
    try {
        const palettes = eval('(' + objStr + ')');
        for (let key in palettes) {
            console.log(`Class ${key}: ${palettes[key].length} variations`);
        }
    } catch(e) {
        console.error("Eval failed", e.message);
    }
}

// Let's also grab names from comments.
const regex = /^\s*(\d+):\s*\[\s*\/\/\s*(.*?)(?:\s*\(\d+\))?\s*$/gm;
let match;
console.log("\n--- Class Names ---");
while ((match = regex.exec(code)) !== null) {
    console.log(`Class ${match[1]}: ${match[2]}`);
}

