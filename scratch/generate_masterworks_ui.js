const fs = require('fs');

const masterworks = [
    { id: 19, name: "Premium 3D State of the Art", color: "amber", desc: "Raymarched Volumetrics" },
    { id: 20, name: "Sacred Reference Cymatics", color: "pink", desc: "Golden Ratio Formations" },
    { id: 21, name: "True Reference Cymatics", color: "fuchsia", desc: "3D Raymarched Resonance" },
    { id: 22, name: "True Image-Based", color: "purple", desc: "30+ Data-driven variations" },
    { id: 23, name: "Ultra-Premium 3D", color: "cyan", desc: "State of the art rendering" },
    { id: 24, name: "Chladni Plate Sim", color: "yellow", desc: "Real-world physics engine" },
    { id: 25, name: "Quantum Double-Slit", color: "white", desc: "Wave-Particle Interference", special: true }
];

let html = `
                        <!-- Procedural Masterworks (State of the Art) -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,1)]"></span>
                                Procedural Masterworks (Classes 19-25)
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
`;

masterworks.forEach(c => {
    if (c.special) {
        html += `
                                <button class="cymatics-pattern-btn col-span-2 p-3 rounded-lg bg-black/60 border border-${c.color}/40 text-left text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:bg-${c.color}/10 hover:border-${c.color} transition-all group relative overflow-hidden flex flex-col items-center justify-center text-center" onclick="window.setCymaticPattern(${c.id}, 0)">
                                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <span class="relative z-10 font-bold uppercase tracking-[0.2em] text-[11px] group-hover:text-white transition-colors mb-1 flex items-center gap-2">
                                        <svg class="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                        Class ${c.id}: ${c.name}
                                    </span>
                                    <span class="relative z-10 text-[9px] text-white/50 tracking-widest">${c.desc}</span>
                                </button>
`;
    } else {
        html += `
                                <button class="cymatics-pattern-btn p-2.5 rounded-lg bg-white/5 border border-${c.color}-500/30 text-left text-white shadow-[0_0_10px_rgba(var(--color-${c.color}-500),0.1)] hover:shadow-[0_0_20px_rgba(var(--color-${c.color}-500),0.3)] hover:bg-${c.color}-500/20 hover:border-${c.color}-400 transition-all group relative overflow-hidden" onclick="window.setCymaticPattern(${c.id}, 0)">
                                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-${c.color}-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <div class="relative z-10 font-bold uppercase tracking-wider text-[9px] text-${c.color}-300 group-hover:text-${c.color}-200 transition-colors mb-0.5">Class ${c.id}</div>
                                    <div class="relative z-10 text-[8px] text-white/60 tracking-wider truncate">${c.name}</div>
                                </button>
`;
    }
});

html += `
                            </div>
                        </div>
`;

let targetHtml = fs.readFileSync('mindwave.html', 'utf8');

// Insert the Masterworks HTML right before <!-- TAB: VISUALS -->
const endMarker = '<!-- TAB: VISUALS -->';
if (targetHtml.includes(endMarker)) {
    if (!targetHtml.includes('Procedural Masterworks (Classes 19-25)')) {
        targetHtml = targetHtml.replace(endMarker, html + '\n' + endMarker);
        fs.writeFileSync('mindwave.html', targetHtml);
        console.log("Masterworks UI injected successfully.");
    } else {
        console.log("Already injected.");
    }
} else {
    console.error("End marker not found.");
}
