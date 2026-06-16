const fs = require('fs');
let html = fs.readFileSync('mindwave.html', 'utf8');

const startIndex = html.indexOf('<!-- THE ULTIMATE CYMATICS UI LIBRARY -->');
const endIndex = html.indexOf('<!-- TAB: VISUALS -->');

if (startIndex === -1 || endIndex === -1) {
    console.error("Markers not found in mindwave.html");
    process.exit(1);
}

const beautifulUI = fs.readFileSync('scratch/beautiful_ui.html', 'utf8');

html = html.substring(0, startIndex) + beautifulUI + html.substring(endIndex);

fs.writeFileSync('mindwave.html', html);
console.log("Beautiful UI restored successfully!");
