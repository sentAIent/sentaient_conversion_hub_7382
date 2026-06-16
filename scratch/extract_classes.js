const fs = require('fs');
const code = fs.readFileSync('binaural-assets/js/visuals/CymaticsCore_v4.js', 'utf8');

const regex = /^\s*(\d+):\s*\[\s*\/\/\s*(.*?)(?:\s*\(\d+\))?\s*$/gm;
let match;
while ((match = regex.exec(code)) !== null) {
    console.log(`Class ${match[1]}: ${match[2]}`);
}
