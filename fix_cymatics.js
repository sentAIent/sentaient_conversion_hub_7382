const fs = require('fs');

// 1. DEFINE THE PERFECT PATTERNS
// The user wants Simple Cymatics (Chladni) including: Polygon, Singularity, Quantum Flux, Aetheric Weaver, Quantum Singularity.
// Resonance Class (Type 4/5)
// Pixel Stardust (Type 6)
// Harmonic Gradient (Type 7)

const patterns = [
    // --- SIMPLE CYMATICS (Chladni, Type 0) ---
    // (We give them type: 0 explicitly for clarity, though it defaults to 0 if omitted)
    { name: "Flower of Life", n: 4, m: 3, type: 0, cat: "sacred" },
    { name: "Metatron Cube", n: 5, m: 5, type: 0, cat: "sacred" },
    { name: "Fibonacci", n: 3, m: 8, type: 0, cat: "sacred" },
    { name: "Torus Field", n: 6, m: 2, type: 0, cat: "sacred" },
    { name: "Mandelbrot", n: 4, m: 7, type: 0, cat: "fractal" },
    { name: "Julia Loop", n: 5, m: 9, type: 0, cat: "fractal" },
    { name: "Polygon", n: 8, m: 5, type: 0, cat: "geometry" },
    { name: "Singularity", n: 9, m: 3, type: 0, cat: "complex" },
    { name: "Quantum Flux", n: 7, m: 7, type: 0, cat: "complex" },
    { name: "Golden Ratio", n: 1, m: 9, type: 0, cat: "sacred" },
    { name: "Aetheric Weaver", n: 11, m: 11, type: 0, cat: "advanced" }, // Removed type 4!
    { name: "Quantum Singularity", n: 17, m: 3, type: 0, cat: "simple" },
    { name: "Celestial", n: 8, m: 2, type: 0, cat: "radial" },
    { name: "Infinite", n: 3, m: 12, type: 0, cat: "fractal" },
    { name: "Prism Fold", n: 6, m: 9, type: 0, cat: "complex" },
    { name: "Cosmic Knot", n: 12, m: 1, type: 0, cat: "complex" },
    { name: "Zen Mandala", n: 5, m: 11, type: 0, cat: "sacred" },
    { name: "Astral", n: 8, m: 8, type: 0, cat: "complex" },
    { name: "Plasma Bloom", n: 4, m: 14, type: 0, cat: "fractal" },
    { name: "Synchronicity", n: 9, m: 9, type: 0, cat: "sacred" },
    { name: "Unified Field", n: 7, m: 12, type: 0, cat: "complex" },
    { name: "Omega Point", n: 15, m: 3, type: 0, cat: "complex" },
    { name: "Source Fold", n: 6, m: 13, type: 0, cat: "sacred" },
    
    // --- RESONANCE CLASS (Type 4/5) ---
    { name: "Aura Genesis", n: 8, m: 16, type: 4, cat: "advanced" },
    { name: "Neural Core", n: 21, m: 7, type: 5, cat: "live_shader" },
    { name: "Void Matrix", n: 19, m: 19, type: 4, cat: "advanced" },
    { name: "Omega Resonance", n: 22, m: 11, type: 5, cat: "live_shader" },
    { name: "Stellar Nexus", n: 24, m: 8, type: 4, cat: "advanced" },
    { name: "Chronos Weave", n: 14, m: 28, type: 5, cat: "live_shader" },
    { name: "Prime Prime", n: 13, m: 17, type: 4, cat: "advanced" },
    { name: "Metatron's Grid", n: 6, m: 12, type: 4, cat: "advanced" },
    { name: "Chronos Vortex", n: 7, m: 14, type: 4, cat: "advanced" },
    { name: "Void Fractal", n: 22, m: 22, type: 4, cat: "advanced" },
    { name: "Crystalline Pulse", n: 9, m: 18, type: 4, cat: "advanced" },
    { name: "Stellar Loom", n: 13, m: 3, type: 4, cat: "advanced" },

    // --- PIXEL STARDUST CLASS (Type 6) ---
    { name: "Pixel Nebula", n: 31, m: 13, type: 6, cat: "stardust" },
    { name: "Magnetic Stardust", n: 25, m: 21, type: 6, cat: "stardust" },
    { name: "Quantum Granules", n: 18, m: 33, type: 6, cat: "stardust" },
    { name: "Neon Sand", n: 27, m: 9, type: 6, cat: "stardust" },
    { name: "Chromatic Dust", n: 30, m: 15, type: 6, cat: "stardust" },

    // --- HARMONIC GRADIENT CLASS (Type 7) ---
    { name: "Royal Gradient", n: 11, m: 22, type: 7, cat: "harmonic" },
    { name: "Sunset Flow", n: 16, m: 24, type: 7, cat: "harmonic" },
    { name: "Oceanic Folds", n: 8, m: 28, type: 7, cat: "harmonic" },
    { name: "Auroral Waves", n: 15, m: 30, type: 7, cat: "harmonic" },
    { name: "Golden Ratio Flow", n: 21, m: 34, type: 7, cat: "harmonic" }
];

// Color mapping for HTML buttons based on category
function getColorStr(type) {
    if (type === 0) return "cyan";
    if (type === 4 || type === 5) return "fuchsia";
    if (type === 6) return "emerald"; // Pixel stardust
    if (type === 7) return "amber"; // Harmonic gradient
    return "violet";
}

// Generate HTML
let simpleHtml = "";
let advancedHtml = "";

patterns.forEach((p, idx) => {
    const col = getColorStr(p.type);
    const htmlSnippet = `
                            <button class="cymatics-pattern-btn p-2 rounded-lg bg-black/30 border border-${col}-500/30 text-[9px] font-bold uppercase text-white shadow-lg shadow-${col}-500/20 hover:shadow-xl hover:shadow-${col}-400/50 hover:border-${col}-400 transition-all group relative overflow-hidden" onclick="selectCymaticPattern(${idx})">
                                <canvas class="cymatic-gen-art absolute inset-0 w-full h-full opacity-50 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" data-idx="${idx}" width="200" height="200"></canvas>
                                <span class="relative z-10 group-hover:text-${col}-200 transition-colors tracking-wider drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">${p.name}</span>
                                <div class="absolute inset-0 bg-gradient-to-r from-${col}-600/0 via-${col}-500/10 to-${col}-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </button>`;
    
    if (p.type === 0) simpleHtml += htmlSnippet;
    else if (p.type === 4 || p.type === 5) advancedHtml += htmlSnippet;
    else if (p.type === 6) advancedHtml += htmlSnippet;
    else if (p.type === 7) advancedHtml += htmlSnippet;
});

// Update JS file
let jsStr = fs.readFileSync('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'utf8');
const jsStartStr = "static get CYMATIC_PATTERNS() { return [";
const jsStartIndex = jsStr.indexOf(jsStartStr);
const jsEndIndex = jsStr.indexOf("];", jsStartIndex) + 2;

let newJsArray = "static get CYMATIC_PATTERNS() { return [\n";
patterns.forEach(p => {
    newJsArray += `            { name: "${p.name}", n: ${p.n}, m: ${p.m}, type: ${p.type}, cat: "${p.cat}" },\n`;
});
newJsArray += "        ];";

jsStr = jsStr.substring(0, jsStartIndex) + newJsArray + jsStr.substring(jsEndIndex);
fs.writeFileSync('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', jsStr);

// Update HTML File
let htmlStr = fs.readFileSync('mindwave.html', 'utf8');

// We will replace the contents of Biological Resonance grid with simpleHtml
const bioStart = htmlStr.indexOf('<!-- SECTION: Biological Resonance -->');
const bioGridStart = htmlStr.indexOf('<div class="grid grid-cols-3 gap-2">', bioStart) + '<div class="grid grid-cols-3 gap-2">'.length;
const bioGridEnd = htmlStr.indexOf('</div>', bioGridStart);

htmlStr = htmlStr.substring(0, bioGridStart) + simpleHtml + "\n                        " + htmlStr.substring(bioGridEnd);

// For Cymatics II, we can wipe the entire content of tab-cymatics-ii and replace it
const advTabStart = htmlStr.indexOf('<div id="tab-cymatics-ii" class="tab-content hidden h-full flex flex-col">');
const advTabScrollStart = htmlStr.indexOf('<div class="grid grid-cols-3 gap-2 pb-4">', advTabStart) + '<div class="grid grid-cols-3 gap-2 pb-4">'.length;
const advTabScrollEnd = htmlStr.indexOf('</div>', advTabScrollStart);

// We need to just inject advancedHtml inside the grid
htmlStr = htmlStr.substring(0, advTabScrollStart) + advancedHtml + "\n                        " + htmlStr.substring(advTabScrollEnd);

fs.writeFileSync('mindwave.html', htmlStr);

console.log("SUCCESS: Synchronized", patterns.length, "patterns across HTML and JS.");
