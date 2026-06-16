const fs = require('fs');

const generateButtons = (count, prefix, thumb, tooltipPrefix) => {
    let html = '';
    for(let i=0; i<count; i++) {
        const isHeart = (prefix === 'c1' && i % 4 === 3);
        const tooltip = isHeart ? `Sacred Heart ${i+1}` : `${tooltipPrefix} ${i+1}`;
        html += `
            <button onclick="window.setCymaticPattern('${prefix}_${i}')" title="${tooltip}" class="relative w-full aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-sky-400/50 transition-all group cymatic-btn">
                <img src="/binaural-assets/images/cymatics/${thumb}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" style="filter: hue-rotate(${i * 20}deg) saturate(${100 + i*5}%);">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span class="absolute bottom-1 left-0 right-0 text-center text-[8px] font-bold text-white/90 uppercase tracking-widest">${i+1}</span>
            </button>
        `;
    }
    return html;
};

const html = `
                <!-- Class 1: Fractal Interference -->
                <div class="sidebar-section bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
                    <h4 class="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ff0055]"></span> Fractal Interference
                    </h4>
                    <div class="grid grid-cols-4 gap-2 mb-4">
                        ${generateButtons(16, 'c1', 'c1_thumb.png', 'Fractal Mandala')}
                    </div>
                    <div class="flex gap-2 mb-4 justify-between bg-black/30 p-2 rounded-lg">
                        <span class="text-[10px] uppercase text-white/50 self-center">Colors:</span>
                        <div class="flex gap-2">
                            <input type="color" id="color1_c1" onchange="window.setCymaticColor(1, this.value)" value="#ff0055" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                            <input type="color" id="color2_c1" onchange="window.setCymaticColor(2, this.value)" value="#00ffff" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                            <input type="color" id="color3_c1" onchange="window.setCymaticColor(3, this.value)" value="#ff00ff" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between mb-1"><label class="text-[9px] text-white/60 uppercase">Recursion Depth</label></div>
                            <input type="range" id="c1_recursion" min="1" max="10" step="0.1" value="3" oninput="window.setCymaticParam('uRecursion', this.value)" class="mw-slider w-full accent-pink-500">
                        </div>
                        <div>
                            <div class="flex justify-between mb-1"><label class="text-[9px] text-white/60 uppercase">Fold Symmetry</label></div>
                            <input type="range" id="c1_symmetry" min="0" max="12" step="1" value="2" oninput="window.setCymaticParam('uSymmetry', this.value)" class="mw-slider w-full accent-pink-500">
                        </div>
                    </div>
                </div>

                <!-- Class 2: Particle Resonance -->
                <div class="sidebar-section bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
                    <h4 class="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#ffaa00]"></span> Particle Swarm
                    </h4>
                    <div class="grid grid-cols-4 gap-2 mb-4">
                        ${generateButtons(12, 'c2', 'c2_thumb.png', 'Chladni Swarm')}
                    </div>
                    <div class="flex gap-2 mb-4 justify-between bg-black/30 p-2 rounded-lg">
                        <span class="text-[10px] uppercase text-white/50 self-center">Colors:</span>
                        <div class="flex gap-2">
                            <input type="color" id="color1_c2" onchange="window.setCymaticColor(1, this.value)" value="#ffffff" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                            <input type="color" id="color2_c2" onchange="window.setCymaticColor(2, this.value)" value="#00aaff" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                            <input type="color" id="color3_c2" onchange="window.setCymaticColor(3, this.value)" value="#ffaa00" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between mb-1"><label class="text-[9px] text-white/60 uppercase">Dispersion</label></div>
                            <input type="range" id="c2_dispersion" min="0" max="2" step="0.05" value="0.5" oninput="window.setCymaticParam('uDispersion', this.value)" class="mw-slider w-full accent-amber-500">
                        </div>
                    </div>
                </div>

                <!-- Class 3: Fluid SDF -->
                <div class="sidebar-section bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
                    <h4 class="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#00ffcc]"></span> Bioluminescent Fluid
                    </h4>
                    <div class="grid grid-cols-4 gap-2 mb-4">
                        ${generateButtons(10, 'c3', 'c3_thumb.png', 'Plasma Pool')}
                    </div>
                    <div class="flex gap-2 mb-4 justify-between bg-black/30 p-2 rounded-lg">
                        <span class="text-[10px] uppercase text-white/50 self-center">Colors:</span>
                        <div class="flex gap-2">
                            <input type="color" id="color1_c3" onchange="window.setCymaticColor(1, this.value)" value="#00ffcc" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                            <input type="color" id="color2_c3" onchange="window.setCymaticColor(2, this.value)" value="#0000ff" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                            <input type="color" id="color3_c3" onchange="window.setCymaticColor(3, this.value)" value="#aa00ff" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between mb-1"><label class="text-[9px] text-white/60 uppercase">Viscosity</label></div>
                            <input type="range" id="c3_viscosity" min="0.1" max="1.5" step="0.01" value="0.8" oninput="window.setCymaticParam('uViscosity', this.value)" class="mw-slider w-full accent-cyan-500">
                        </div>
                        <div>
                            <div class="flex justify-between mb-1"><label class="text-[9px] text-white/60 uppercase">Turbulence</label></div>
                            <input type="range" id="c3_turbulence" min="0" max="5" step="0.1" value="1.0" oninput="window.setCymaticParam('uTurbulence', this.value)" class="mw-slider w-full accent-cyan-500">
                        </div>
                    </div>
                </div>

                <!-- Class 4: Quantum Topology -->
                <div class="sidebar-section bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
                    <h4 class="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#ff5500]"></span> Quantum Topology
                    </h4>
                    <div class="grid grid-cols-4 gap-2 mb-4">
                        ${generateButtons(8, 'c4', 'c4_thumb.png', 'Seismic Terrain')}
                    </div>
                    <div class="flex gap-2 mb-4 justify-between bg-black/30 p-2 rounded-lg">
                        <span class="text-[10px] uppercase text-white/50 self-center">Colors:</span>
                        <div class="flex gap-2">
                            <input type="color" id="color1_c4" onchange="window.setCymaticColor(1, this.value)" value="#444444" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                            <input type="color" id="color2_c4" onchange="window.setCymaticColor(2, this.value)" value="#ff5500" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                            <input type="color" id="color3_c4" onchange="window.setCymaticColor(3, this.value)" value="#ff0000" class="w-6 h-6 rounded border-none cursor-pointer p-0">
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between mb-1"><label class="text-[9px] text-white/60 uppercase">Mesh Tension</label></div>
                            <input type="range" id="c4_tension" min="0.1" max="3" step="0.05" value="1.0" oninput="window.setCymaticParam('uTension', this.value)" class="mw-slider w-full accent-orange-500">
                        </div>
                        <div>
                            <div class="flex justify-between mb-1"><label class="text-[9px] text-white/60 uppercase">Peak Sharpness</label></div>
                            <input type="range" id="c4_sharpness" min="0.5" max="5" step="0.1" value="2.0" oninput="window.setCymaticParam('uPeakSharpness', this.value)" class="mw-slider w-full accent-orange-500">
                        </div>
                    </div>
                </div>
`;

let target = fs.readFileSync('mindwave.html', 'utf8');
target = target.replace('<!-- CYMATICS SECTION WILL BE REBUILT FROM SCRATCH -->', html);
fs.writeFileSync('mindwave.html', target, 'utf8');
console.log('UI Rebuild inserted into mindwave.html');
