const fs = require('fs');
const path = require('path');

const targetDir = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/binaural-assets/images/cymatics/constellations';
const htmlFile = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/mindwave.html';
const jsFile = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/binaural-assets/js/visuals/CymaticsCore.js';

const missingAnimals = [
    "penguin", "horse", "dog", "cat", "elephant", "shark", "whale", "orca", 
    "swordfish", "salmon", "turtle", "alligator", "leopard", "panther", 
    "cheetah", "mongoose", "koala", "kangaroo", "panda", "polarbear", 
    "lizard", "snake", "rat", "ox", "rabbit", "monkey", "rooster", "pig"
];

// 1. Copy dummy images
const baseLines = "bear_constellation_1780366809582.png";
const baseAura = "aura_bear_1780367397307.png";

let newLinesImages = [];
let newAuraImages = [];

missingAnimals.forEach(animal => {
    const linesName = `${animal}_constellation_dummy.png`;
    const auraName = `aura_${animal}_dummy.png`;
    
    fs.copyFileSync(path.join(targetDir, baseLines), path.join(targetDir, linesName));
    fs.copyFileSync(path.join(targetDir, baseAura), path.join(targetDir, auraName));
    
    newLinesImages.push(linesName);
    newAuraImages.push(auraName);
});

console.log("Mock images cloned.");

// 2. Generate HTML Buttons
let htmlLines = '';
let htmlAuras = '';
let currentLinesIndex = 3; // We have 3 existing
let currentAuraIndex = 5; // We have 5 existing

missingAnimals.forEach((animal, i) => {
    htmlLines += `
                    <button class="cymatics-pattern-btn aspect-square rounded-lg overflow-hidden border border-cyan-500/40 hover:border-cyan-400 transition-all group relative shadow-[0_0_15px_rgba(6,182,212,0.2)] c24-layer2-btn bg-black" onclick="setConstellationUI('Lines', ${currentLinesIndex + i}, this)">
                        <img loading="lazy" src="binaural-assets/images/cymatics/constellations/${animal}_constellation_dummy.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-screen">
                        <div class="absolute bottom-1 left-1 text-[8px] text-white font-bold tracking-wider uppercase">${animal}</div>
                    </button>`;
                    
    htmlAuras += `
                <button class="cymatics-pattern-btn aspect-square rounded-lg overflow-hidden border border-cyan-500/40 hover:border-cyan-400 transition-all group relative shadow-[0_0_15px_rgba(6,182,212,0.2)] c24-layer3-btn bg-black" onclick="setConstellationUI('Aura', ${currentAuraIndex + i}, this)">
                    <img loading="lazy" src="binaural-assets/images/cymatics/constellations/aura_${animal}_dummy.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-screen">
                    <div class="absolute bottom-1 left-1 text-[8px] text-white font-bold tracking-wider uppercase">${animal}</div>
                </button>`;
});

// Append to HTML
let html = fs.readFileSync(htmlFile, 'utf8');
html = html.replace('<!-- INJECT_LINES_HERE -->', htmlLines); // Wait, I don't have this marker. I will do string insertion.
const linesEndIndex = html.indexOf('</div>\n            </div>\n\n            <h5 class="text-[10px] text-cyan-400/80');
if (linesEndIndex !== -1) {
    html = html.slice(0, linesEndIndex) + htmlLines + '\n                ' + html.slice(linesEndIndex);
}

const auraEndIndex = html.indexOf('</div>\n        </div>\n\n        <!-- Settings Pane -->');
if (auraEndIndex !== -1) {
    html = html.slice(0, auraEndIndex) + htmlAuras + '\n                ' + html.slice(auraEndIndex);
}
fs.writeFileSync(htmlFile, html);
console.log("HTML Updated.");

// 3. Update JS Arrays
let js = fs.readFileSync(jsFile, 'utf8');

const jsAuraArrayAdditions = missingAnimals.map(a => `'binaural-assets/images/cymatics/constellations/aura_${a}_dummy.png'`).join(',\n                    ');
js = js.replace(
    "'binaural-assets/images/cymatics/constellations/aura_eagle_1780367474180.png'",
    "'binaural-assets/images/cymatics/constellations/aura_eagle_1780367474180.png',\n                    " + jsAuraArrayAdditions
);

const jsLinesArrayAdditions = missingAnimals.map(a => `'binaural-assets/images/cymatics/constellations/${a}_constellation_dummy.png'`).join(',\n                    ');
js = js.replace(
    "'binaural-assets/images/cymatics/constellations/dragon_constellation_1780366861569.png'",
    "'binaural-assets/images/cymatics/constellations/dragon_constellation_1780366861569.png',\n                    " + jsLinesArrayAdditions
);

fs.writeFileSync(jsFile, js);
console.log("JS Updated.");
