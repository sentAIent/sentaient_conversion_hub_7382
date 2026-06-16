import re

with open('mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

level1_names = ["Cosmic Knot", "Zenith", "Horizon", "Triple Axis", "Quad Core", "Harmony"]
level1_buttons = []
for i, name in enumerate(level1_names):
    level1_buttons.append(f'<button class="cymatics-pattern-btn p-1.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold uppercase text-purple-300/80 hover:border-purple-400/60 transition-all" onclick="selectCymaticPattern({i})">{name}</button>')

level2_names = ["Polygon", "Singularity", "Quantum Flux", "Aetheric Weaver", "Quantum Knot", "Astral", "Aura Genesis", "Void Matrix", "Stellar Nexus", "Crystalline Pulse"]
level2_buttons = []
for i, name in enumerate(level2_names):
    idx = 6 + i
    level2_buttons.append(f'<button class="cymatics-pattern-btn p-1.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold uppercase text-cyan-300/80 hover:border-cyan-400/60 transition-all" onclick="selectCymaticPattern({idx})">{name}</button>')

level3_names = ["Plasma Interference", "Opal Lattice", "Bioluminescent Fold", "Neon Geometria", "Ethereal Web", "Quantum Foam", "Holographic Matrix", "Sacred Pulse"]
level3_buttons = []
for i, name in enumerate(level3_names):
    idx = 16 + i
    level3_buttons.append(f'''<button class="cymatics-pattern-btn p-2.5 rounded-lg bg-white/5 border border-indigo-500/40 text-[9px] font-bold uppercase text-white shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:bg-indigo-500/20 hover:border-indigo-400 transition-all group relative overflow-hidden" onclick="selectCymaticPattern({idx})">
    <div class="absolute inset-0 bg-cover bg-center opacity-35 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" style="background-image: url('binaural-assets/images/prime_prime.png');"></div>
    <span class="relative z-10 group-hover:text-indigo-200 transition-colors tracking-wider">{name}</span>
    <div class="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-500/10 to-indigo-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
</button>''')

level4_names = ["Cosmic Symphony", "Nebula Core", "Stellar Fracture", "Golden Supernova", "Void Blossoms", "Event Horizon", "Kleinian Bloom", "Apollonian Depth"]
level4_buttons = []
for i, name in enumerate(level4_names):
    idx = 24 + i
    level4_buttons.append(f'''<button class="cymatics-pattern-btn p-2.5 rounded-lg bg-white/5 border border-teal-500/40 text-[9px] font-bold uppercase text-white shadow-[0_0_10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.6)] hover:bg-teal-500/20 hover:border-teal-400 transition-all group relative overflow-hidden" onclick="selectCymaticPattern({idx})">
    <div class="absolute inset-0 bg-cover bg-center opacity-35 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" style="background-image: url('binaural-assets/images/metatrons_grid.png');"></div>
    <span class="relative z-10 group-hover:text-teal-200 transition-colors tracking-wider">{name}</span>
    <div class="absolute inset-0 bg-gradient-to-r from-teal-600/0 via-teal-500/10 to-teal-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
</button>''')


replacement = f'''<!-- Pattern grid (Fractal buttons) -->
                        <div class="grid grid-cols-3 gap-5">
                            {chr(10).join(level1_buttons)}
                        </div>

                        <!-- Level 2 -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-cyan-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
                                Level 2: Advanced Cymatics
                            </h4>
                            <div class="grid grid-cols-3 gap-2">
                                {chr(10).join(level2_buttons)}
                            </div>
                        </div>

                        <!-- Advanced Cymatics (Level 3 - Quantum) -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]"></span>
                                Level 3: Quantum Cymatics
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
                                {chr(10).join(level3_buttons)}
                            </div>
                        </div>

                        <!-- Cosmic Cymatics (Level 4) -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-teal-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.5)]"></span>
                                Level 4: Cosmic Cymatics
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
                                {chr(10).join(level4_buttons)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB: VISUALS -->'''

pattern = re.compile(r'<!-- Pattern grid \(Fractal buttons\) -->.*?<!-- TAB: VISUALS -->', re.DOTALL)

if pattern.search(html):
    new_html = pattern.sub(replacement, html)
    with open('mindwave.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("SUCCESS")
else:
    print("COULD NOT FIND PATTERN")
