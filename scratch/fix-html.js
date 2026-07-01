const fs = require('fs');
const htmlFile = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/index.html';
const html = fs.readFileSync(htmlFile, 'utf8');

const lines = html.split('\n');

const startIndex = 1031; // 0-based for line 1032
const endIndex = 1146; // 0-based for line 1147

const modalLines = lines.slice(startIndex, endIndex + 1);

lines.splice(startIndex, endIndex - startIndex + 1); // remove them

// find body tag
const bodyIndex = lines.findIndex(l => l.includes('<body>'));
if (bodyIndex !== -1) {
    lines.splice(bodyIndex + 1, 0, ...modalLines);
}

fs.writeFileSync(htmlFile, lines.join('\n'));
console.log("Modal moved to body!");
