const fs = require('fs');

const classData = [
    { id: 1, name: "Fractal Interference", vars: 3 },
    { id: 2, name: "Particle Resonance", vars: 3 },
    { id: 3, name: "Fluid SDF", vars: 3 },
    { id: 4, name: "Quantum Topology", vars: 3 },
    { id: 5, name: "Sacred Geometry", vars: 3 },
    { id: 6, name: "Bioluminescent Neural", vars: 3 },
    { id: 7, name: "Starburst / Supernova", vars: 3 },
    { id: 8, name: "Asymmetrical Flow", vars: 3 },
    { id: 9, name: "Heavy Brutalism", vars: 3 },
    { id: 10, name: "Pixel Swarm", vars: 3 },
    { id: 11, name: "Sacred Runes", vars: 3 },
    { id: 12, name: "Wireframe Topologies", vars: 3 },
    { id: 13, name: "Ethereal Plasma", vars: 3 },
    { id: 14, name: "Golden Ratio", vars: 3 },
    { id: 15, name: "Celestial Spheres", vars: 3 },
    { id: 16, name: "Void Geometry", vars: 3 },
    { id: 17, name: "Infinite Tunnels", vars: 3 },
    { id: 18, name: "Hyper-Complex 3D", vars: 10 },
    { id: 19, name: "Premium 3D State of the Art", vars: 2 },
    { id: 20, name: "Sacred Reference Cymatics", vars: 6 },
    { id: 21, name: "True Reference Cymatics (3D Raymarched)", vars: 6 },
    { id: 22, name: "True Image-Based Cymatics", vars: 30 },
    { id: 23, name: "Ultra-Premium 3D Cymatics", vars: 5 },
    { id: 24, name: "Chladni Plate Simulator", vars: 6 },
    { id: 25, name: "Quantum Double-Slit", vars: 1 }
];

let ultimateUI = `\n<!-- THE ULTIMATE CYMATICS UI LIBRARY -->
                    <div class="mt-8 mb-4 border-t border-white/10 pt-4">
                        <h4 class="text-[12px] font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-3 cursor-pointer hover:text-cyan-400 transition-colors" onclick="document.getElementById('advancedCymaticsContainer').classList.toggle('hidden');">
                            <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.8)]"></span>
                            Advanced Cymatics Library (242 Variations)
                            <svg class="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </h4>
                        
                        <div id="advancedCymaticsContainer" class="hidden space-y-3 custom-scrollbar max-h-[600px] overflow-y-auto pr-2">
`;

classData.forEach(c => {
    let colorClass = "cyan";
    if (c.id >= 19) colorClass = "amber"; // Premium
    else if (c.id >= 14) colorClass = "pink";
    else if (c.id >= 9) colorClass = "yellow";
    else if (c.id >= 4) colorClass = "cyan";
    else colorClass = "purple";

    let premiumStar = c.id >= 19 ? "★ " : "";
    
    // Quantum Double-Slit specific styling
    if (c.id === 25) {
        ultimateUI += `
                            <!-- CLASS ${c.id} -->
                            <div class="accordion-item border border-fuchsia-500/40 rounded-lg overflow-hidden bg-black/50 backdrop-blur-md transition-all duration-300 group shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                                <button class="accordion-header w-full p-4 flex justify-between items-center text-left text-fuchsia-300 font-bold text-[11px] uppercase tracking-wider hover:bg-fuchsia-500/20 transition-all" onclick="const content = this.nextElementSibling; const isOpen = !content.classList.contains('hidden'); document.querySelectorAll('#advancedCymaticsContainer .accordion-content').forEach(c => c.classList.add('hidden')); document.querySelectorAll('#advancedCymaticsContainer .accordion-header svg').forEach(s => s.classList.remove('rotate-180')); if(!isOpen) { content.classList.remove('hidden'); this.querySelector('svg').classList.add('rotate-180'); }">
                                    <span class="truncate pr-4 flex items-center gap-2">
                                        <span class="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse"></span>
                                        Class ${c.id}: ${c.name}
                                    </span>
                                    <div class="flex items-center gap-2 shrink-0">
                                        <span class="text-[9px] bg-fuchsia-500/30 text-fuchsia-100 px-2 py-0.5 rounded shadow-sm border border-fuchsia-400/30">1 Var</span>
                                        <svg class="w-4 h-4 transform transition-transform text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </button>
                                <div class="accordion-content hidden p-3 border-t border-white/5 bg-black/60">
                                    <div class="grid grid-cols-4 gap-2">
                                        <button class="pattern-btn col-span-4 p-2 rounded-md bg-black/50 border border-fuchsia-500/50 hover:border-fuchsia-300 text-fuchsia-100 hover:text-white shadow-[0_0_10px_rgba(217,70,239,0.4)] animate-pulse text-[9px] font-bold uppercase transition-all overflow-hidden relative group/btn" onclick="window.setCymaticPattern(25, 0)">
                                            <span class="relative z-10 drop-shadow-md">INITIATE QUANTUM INTERFERENCE</span>
                                            <div class="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
`;
    } else {
        ultimateUI += `
                            <!-- CLASS ${c.id} -->
                            <div class="accordion-item border border-${colorClass}-500/20 rounded-lg overflow-hidden bg-black/40 backdrop-blur-md transition-all duration-300 group">
                                <button class="accordion-header w-full p-3 flex justify-between items-center text-left text-${colorClass}-300 font-bold text-[10px] uppercase tracking-wider hover:bg-${colorClass}-500/10 transition-all" onclick="const content = this.nextElementSibling; const isOpen = !content.classList.contains('hidden'); document.querySelectorAll('#advancedCymaticsContainer .accordion-content').forEach(c => c.classList.add('hidden')); document.querySelectorAll('#advancedCymaticsContainer .accordion-header svg').forEach(s => s.classList.remove('rotate-180')); if(!isOpen) { content.classList.remove('hidden'); this.querySelector('svg').classList.add('rotate-180'); }">
                                    <span class="truncate pr-4">${premiumStar}Class ${c.id}: ${c.name}</span>
                                    <div class="flex items-center gap-2 shrink-0">
                                        <span class="text-[9px] bg-${colorClass}-500/20 text-${colorClass}-200 px-1.5 py-0.5 rounded shadow-sm">${c.vars} Vars</span>
                                        <svg class="w-4 h-4 transform transition-transform text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </button>
                                <div class="accordion-content hidden p-3 border-t border-white/5 bg-black/60">
                                    <div class="grid grid-cols-4 gap-2">`;
        
        for (let i = 0; i < c.vars; i++) {
            ultimateUI += `
                                        <button class="pattern-btn p-2 rounded-md bg-black/50 border border-${colorClass}-500/30 hover:border-${colorClass}-400 text-${colorClass}-100 hover:text-white text-[9px] font-bold uppercase transition-all overflow-hidden relative group/btn" onclick="window.setCymaticPattern(${c.id}, ${i})">
                                            <span class="relative z-10 drop-shadow-md">Var ${i+1}</span>
                                            <div class="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                        </button>`;
        }
        ultimateUI += `
                                    </div>
                                </div>
                            </div>
`;
    }
});

ultimateUI += `
                        </div>
                    </div>\n`;

let htmlFile = 'mindwave.html';
let html = fs.readFileSync(htmlFile, 'utf8');

// Insert it right before <!-- TAB: VISUALS -->
const insertTarget = '<!-- TAB: VISUALS -->';
if (html.includes(insertTarget)) {
    // Check if it's already injected to prevent duplication
    if (!html.includes('Advanced Cymatics Library (242 Variations)')) {
        html = html.replace(insertTarget, ultimateUI + insertTarget);
        fs.writeFileSync(htmlFile, html);
        console.log("Ultimate UI successfully injected as an Advanced Library!");
    } else {
        console.log("Advanced Library is already present.");
    }
} else {
    console.error("Target marker not found.");
    process.exit(1);
}
