const fs = require('fs');
const html = fs.readFileSync('mindwave-CYMATICS-RESTORED-GOLD.html', 'utf8');

const startIndex = html.indexOf('<!-- Pattern grid (Fractal buttons) -->');
const endIndex = html.indexOf('<!-- TAB: VISUALS -->');

if (startIndex === -1 || endIndex === -1) {
    console.error("Markers not found"); process.exit(1);
}

// Backtrack endIndex so we don't accidentally grab closing tags of the whole app
let closingEnd = endIndex;
while (html.substring(closingEnd - 6, closingEnd) !== '</div>' && closingEnd > startIndex) {
    closingEnd--;
}
// Actually, in the Ultimate script I replaced everything up to <!-- TAB: VISUALS -->.
// Wait! If I replaced everything up to <!-- TAB: VISUALS -->, I need to restore exactly what was there up to <!-- TAB: VISUALS -->!
// So let's just grab the whole substring!
const beautifulUI = html.substring(startIndex, endIndex);
fs.writeFileSync('scratch/beautiful_ui.html', beautifulUI);
console.log("Extracted exactly what was replaced!");
