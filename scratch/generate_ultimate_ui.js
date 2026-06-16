const fs = require('fs');
const htmlFile = 'mindwave.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const classData = [
    { id: 1, name: "Fractal Interference", vars: 4 },
    { id: 2, name: "Particle Resonance", vars: 3 },
    { id: 3, name: "Fluid SDF", vars: 3 },
    { id: 4, name: "Quantum Topology", vars: 2 },
    { id: 5, name: "Sacred Geometry", vars: 3 },
    { id: 6, name: "Bioluminescent Neural", vars: 3 },
    { id: 7, name: "Starburst / Supernova", vars: 3 },
    { id: 8, name: "Asymmetrical Flow", vars: 3 },
    { id: 9, name: "Heavy Brutalism", vars: 3 },
    { id: 10, name: "Pixel Swarm", vars: 3 },
    { id: 11, name: "Sacred Runes", vars: 3 },
    { id: 12, name: "Wireframe Topologies", vars: 3 },
    { id: 13, name: "Ethereal Plasma & Smoke", vars: 3 },
    { id: 14, name: "Sacred Geometry Vectors", vars: 3 },
    { id: 15, name: "Retro-Wave Topologies", vars: 3 },
    { id: 16, name: "Nano-Robotic Structures", vars: 3 },
    { id: 17, name: "Raymarched Infinite Tunnels", vars: 3 },
    { id: 18, name: "Hyper-Complex 3D Entities", vars: 10 },
    { id: 19, name: "Premium 3D State of the Art", vars: 2 },
    { id: 20, name: "Sacred Reference Cymatics", vars: 6 },
    { id: 21, name: "True Reference Cymatics (3D Raymarched)", vars: 6 },
    { id: 22, name: "True Image-Based Cymatics", vars: 30 },
    { id: 23, name: "Sacred Sun Resonance", vars: 4 },
    { id: 24, name: "Cosmic Constellations (3-Layer Modular)", vars: 5 },
    { id: 25, name: "Quantum Double-Slit", vars: 1 }
];

let ultimateUI = '<div class="ultimate-cymatics-ui w-full flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2" id="ultimateCymaticsContainer">\n';

classData.forEach(cls => {
    // Accordion Item
    ultimateUI += `
    <div class="accordion-item border border-white/10 rounded-lg overflow-hidden bg-black/40 backdrop-blur-md">
        <button class="accordion-header w-full p-3 flex justify-between items-center text-left text-fuchsia-300 font-bold uppercase text-xs hover:bg-white/5 transition-all" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180')">
            <span>CLASS ${cls.id}: ${cls.name}</span>
            <div class="flex items-center gap-2">
                <span class="text-[10px] opacity-60 bg-black/50 px-2 py-1 rounded">${cls.vars} Vars</span>
                <svg class="w-4 h-4 transform transition-transform text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </button>
        <div class="accordion-content hidden p-3 border-t border-white/5 bg-black/20">
            <div class="grid grid-cols-4 gap-2">
`;
    // Buttons for variations
    for(let v = 0; v < cls.vars; v++) {
        const isQuantum = (cls.id === 25) ? "animate-pulse border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.5)]" : "border-white/10 hover:border-cyan-400";
        ultimateUI += `                <button class="pattern-btn p-2 rounded-lg bg-black/40 border ${isQuantum} text-[9px] font-bold text-white/80 hover:text-white transition-all overflow-hidden relative group" onclick="window.setCymaticPattern(${cls.id}, ${v})">
                    <span class="relative z-10">VAR ${v+1}</span>
                    <div class="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>\n`;
    }

    ultimateUI += `            </div>\n        </div>\n    </div>\n`;
});

ultimateUI += '</div>\n';

// Replace the grid content in HTML
const startTag = '<!-- Pattern Grid — Generative Cymatics -->';
const endTag = '<!-- Extra Advanced Mode Link -->';

const startIndex = html.indexOf(startTag);
const endIndex = html.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
    const sectionStart = html.indexOf('<div', startIndex);
    const newHtml = html.substring(0, sectionStart) + ultimateUI + html.substring(endIndex);
    fs.writeFileSync(htmlFile, newHtml);
    console.log('Successfully injected Ultimate UI into mindwave.html');
} else {
    console.log('Could not find markers');
}
