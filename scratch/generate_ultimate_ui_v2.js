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

let ultimateUI = `
                        <!-- THE ULTIMATE CYMATICS UI LIBRARY -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse shadow-[0_0_8px_rgba(217,70,239,0.5)]"></span>
                                The Ultimate Cymatics Library
                            </h4>
                            <div class="ultimate-cymatics-ui w-full flex flex-col gap-2 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
`;

classData.forEach((cls, idx) => {
    const isImageBased = cls.id <= 18;
    const isMasterwork = cls.id >= 19;
    
    let headerColor = isMasterwork ? 'text-amber-300' : 'text-cyan-300';
    let borderColor = isMasterwork ? 'border-amber-500/20' : 'border-cyan-500/20';
    let bgHover = isMasterwork ? 'hover:bg-amber-500/10' : 'hover:bg-cyan-500/10';
    let badgeBg = isMasterwork ? 'bg-amber-500/20 text-amber-200' : 'bg-cyan-500/20 text-cyan-200';
    let varBtnBorder = isMasterwork ? 'border-amber-500/30 hover:border-amber-400 text-amber-100 hover:text-white' : 'border-cyan-500/30 hover:border-cyan-400 text-cyan-100 hover:text-white';
    
    if (cls.id === 25) {
        headerColor = 'text-fuchsia-400';
        borderColor = 'border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.2)]';
        bgHover = 'hover:bg-fuchsia-500/20';
        badgeBg = 'bg-fuchsia-500/30 text-fuchsia-100';
        varBtnBorder = 'border-fuchsia-500/50 hover:border-fuchsia-300 text-fuchsia-100 hover:text-white shadow-[0_0_10px_rgba(217,70,239,0.4)] animate-pulse';
    }

    ultimateUI += `
                                <!-- CLASS ${cls.id} -->
                                <div class="accordion-item border ${borderColor} rounded-lg overflow-hidden bg-black/40 backdrop-blur-md transition-all duration-300 group">
                                    <button class="accordion-header w-full p-3 flex justify-between items-center text-left ${headerColor} font-bold text-[10px] uppercase tracking-wider ${bgHover} transition-all" onclick="const content = this.nextElementSibling; const isOpen = !content.classList.contains('hidden'); document.querySelectorAll('.accordion-content').forEach(c => c.classList.add('hidden')); document.querySelectorAll('.accordion-header svg').forEach(s => s.classList.remove('rotate-180')); if(!isOpen) { content.classList.remove('hidden'); this.querySelector('svg').classList.add('rotate-180'); }">
                                        <span class="truncate pr-4">${isMasterwork ? '★' : ''} Class ${cls.id}: ${cls.name}</span>
                                        <div class="flex items-center gap-2 shrink-0">
                                            <span class="text-[9px] ${badgeBg} px-1.5 py-0.5 rounded shadow-sm">${cls.vars} Vars</span>
                                            <svg class="w-4 h-4 transform transition-transform text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </button>
                                    <div class="accordion-content hidden p-3 border-t border-white/5 bg-black/60">
                                        <div class="grid grid-cols-4 gap-2">
`;
    
    for(let v = 0; v < cls.vars; v++) {
        const title = (cls.id === 25) ? "INITIATE QUANTUM INTERFERENCE" : `Variation ${v+1}`;
        let colSpan = (cls.id === 25) ? "col-span-4" : "";
        
        let clickHandler = `window.setCymaticPattern(${cls.id}, ${v})`;
        // For constellations we also trigger the visualizer sub-state update
        if (cls.id === 24) {
             clickHandler = `window.viz3D.cymaticsCore.activeVariationId=${v}; window.setCymaticPattern(24, ${v})`;
        }

        ultimateUI += `                                            <button class="pattern-btn ${colSpan} p-2 rounded-md bg-black/50 border ${varBtnBorder} text-[9px] font-bold uppercase transition-all overflow-hidden relative group/btn" onclick="${clickHandler}">
                                                <span class="relative z-10 drop-shadow-md">${title}</span>
                                                <div class="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                            </button>\n`;
    }

    ultimateUI += `                                        </div>\n`;
    
    // Inject the Spirit Animal toggle ONLY inside the Constellations accordion tab at the bottom!
    if (cls.id === 24) {
         ultimateUI += `
                                        <div class="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between">
                                            <span class="text-[9px] text-cyan-200/70 uppercase tracking-widest">Connect Stars</span>
                                            <label class="relative inline-flex items-center cursor-pointer group">
                                                <input type="checkbox" id="c24LinesToggle_Ultimate" class="sr-only peer" onchange="window.viz3D.cymaticsCore.setConstellationLinesToggle(this.checked)" checked>
                                                <div class="w-9 h-5 bg-black/50 border border-cyan-500/30 rounded-full peer peer-checked:bg-cyan-500/20 peer-checked:border-cyan-500/50 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-500 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-cyan-400 peer-checked:after:border-white"></div>
                                            </label>
                                        </div>
         `;
    }

    ultimateUI += `                                    </div>\n                                </div>\n`;
});

ultimateUI += `                            </div>\n                        </div>\n`;

const startMarker = '<!-- Pattern grid (Fractal buttons) -->';
const endMarker = '<!-- TAB: STUDIO -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    // We want to slice up to the last </div> before <!-- TAB: STUDIO -->
    const endSlice = html.lastIndexOf('</div>', endIndex - 10);
    // actually, let's just replace from startIndex up to endIndex and safely re-inject the closing divs.
    
    const replacement = ultimateUI + `                    </div>\n                </div>\n            \n            `;
    
    const newHtml = html.substring(0, startIndex) + replacement + html.substring(endIndex);
    fs.writeFileSync(htmlFile, newHtml);
    console.log("Successfully injected the Ultimate UI!");
} else {
    console.log("Markers not found");
}

