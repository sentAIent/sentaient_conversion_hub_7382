const fs = require('fs');
const goldHtml = fs.readFileSync('mindwave-CYMATICS-RESTORED-GOLD.html', 'utf8');

const startMarker = '<!-- Pattern grid (Fractal buttons) -->';
const endMarker = '<!-- TAB: VISUALS -->';

const startIndexGold = goldHtml.indexOf(startMarker);
const endIndexGold = goldHtml.indexOf(endMarker);

const goldChunk = goldHtml.substring(startIndexGold, endIndexGold);
fs.writeFileSync('scratch/gold_chunk.html', goldChunk);
console.log("Extracted gold chunk:", goldChunk.length, "bytes");

// Now let's put it into mindwave.html
let html = fs.readFileSync('mindwave.html', 'utf8');

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

// Also remove the advanced cymatics accordion I injected
const accordionMarker = '<!-- THE ULTIMATE CYMATICS UI LIBRARY -->';
const accordionStart = html.indexOf(accordionMarker);

if (startIndex !== -1 && accordionStart !== -1) {
    // Delete everything from startMarker to endIndex, AND my accordion
    // Actually, accordionStart is AFTER startIndex. Wait.
    // In my previous script, I inserted accordion right before endMarker.
    html = html.substring(0, startIndex) + goldChunk + html.substring(endMarker);
    
    // Oh wait, if accordion is BEFORE endMarker, replacing from startIndex to endMarker 
    // will naturally DELETE the accordion too!
} else {
    console.error("Markers not found");
}

fs.writeFileSync('mindwave.html', html);
console.log("Restored gold chunk to mindwave.html");
