import re
import shutil

# Make a backup just in case
shutil.copyfile('mindwave-friday.html', 'mindwave-friday_backup_pre_cymatics.html')

with open('mindwave-friday.html', 'r', encoding='utf-8') as f:
    html = f.read()

level1_names = ["Cosmic Knot", "Mystic Mandala", "Astral Bloom", "Sacred Geometry", "Ethereal Star", "Infinity Loop"]
level1_html = ""
for i, name in enumerate(level1_names):
    level1_html += f'<button class="cymatics-pattern-btn p-1.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold uppercase text-purple-300/80 hover:border-purple-400/60 transition-all" onclick="selectCymaticPattern({i})">{name}</button>\\n                                '

level2_names = ["Polygon", "Singularity", "Aura Genesis", "Void Matrix", "Stellar Nexus", "Crystalline Pulse"]
level2_html = ""
for i, name in enumerate(level2_names):
    idx = 6 + i
    level2_html += f'<button class="cymatics-pattern-btn p-1.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold uppercase text-cyan-300/80 hover:border-cyan-400/60 transition-all" onclick="selectCymaticPattern({idx})">{name}</button>\\n                                '

level3_names = ["Quantum Knot", "Quantum Flux", "Aetheric Weaver", "Astral", "Plasma Interference", "Opal Lattice", "Bioluminescent Fold", "Neon Geometria", "Ethereal Web", "Sacred Pulse"]
level3_html = ""
for i, name in enumerate(level3_names):
    idx = 12 + i
    level3_html += f'''<button class="cymatics-pattern-btn p-2.5 rounded-lg bg-white/5 border border-indigo-500/40 text-[9px] font-bold uppercase text-white shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:bg-indigo-500/20 hover:border-indigo-400 transition-all group relative overflow-hidden" onclick="selectCymaticPattern({idx})">
    <div class="absolute inset-0 bg-cover bg-center opacity-35 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" style="background-image: url('binaural-assets/images/prime_prime.png');"></div>
    <span class="relative z-10 group-hover:text-indigo-200 transition-colors tracking-wider">{name}</span>
</button>\\n                                '''

level4_names = ["Cosmic Symphony", "Nebula Core", "Stellar Fracture", "Golden Supernova", "Void Blossoms", "Event Horizon", "Kleinian Bloom", "Apollonian Depth", "Dark Matter", "Galactic Spire"]
level4_html = ""
for i, name in enumerate(level4_names):
    idx = 22 + i
    level4_html += f'''<button class="cymatics-pattern-btn p-2.5 rounded-lg bg-white/5 border border-teal-500/40 text-[9px] font-bold uppercase text-white shadow-[0_0_10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.6)] hover:bg-teal-500/20 hover:border-teal-400 transition-all group relative overflow-hidden" onclick="selectCymaticPattern({idx})">
    <div class="absolute inset-0 bg-cover bg-center opacity-35 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" style="background-image: url('binaural-assets/images/prime_prime.png');"></div>
    <span class="relative z-10 group-hover:text-teal-200 transition-colors tracking-wider">{name}</span>
</button>\\n                                '''

html = re.sub(r'<!-- Pattern grid \(Fractal buttons\) -->\s*<div class="grid grid-cols-3 gap-5">.*?</div>', f'<!-- Pattern grid (Fractal buttons) -->\\n                        <div class="grid grid-cols-3 gap-5">\\n                            {level1_html}</div>', html, flags=re.DOTALL)

html = re.sub(r'<!-- Level 2 -->\s*<div class="mt-6 border-t border-white/5 pt-4">.*?<div class="grid grid-cols-3 gap-2">.*?</div>\s*</div>', f'<!-- Level 2 -->\\n                        <div class="mt-6 border-t border-white/5 pt-4">\\n                            <h4 class="text-[10px] font-bold text-cyan-300 uppercase tracking-widest mb-4 flex items-center gap-2">\\n                                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>\\n                                Level 2: Advanced Cymatics\\n                            </h4>\\n                            <div class="grid grid-cols-3 gap-2">\\n                                {level2_html}</div>\\n                        </div>', html, flags=re.DOTALL)

html = re.sub(r'<!-- Advanced Cymatics \(Level 3 - Quantum\) -->\s*<div class="mt-6 border-t border-white/5 pt-4">.*?<div class="grid grid-cols-2 gap-3">.*?</div>\s*</div>', f'<!-- Advanced Cymatics (Level 3 - Quantum) -->\\n                        <div class="mt-6 border-t border-white/5 pt-4">\\n                            <h4 class="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mb-4 flex items-center gap-2">\\n                                <span class="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]"></span>\\n                                Level 3: Quantum Cymatics\\n                            </h4>\\n                            <div class="grid grid-cols-2 gap-3">\\n                                {level3_html}</div>\\n                        </div>', html, flags=re.DOTALL)

html = re.sub(r'<!-- Advanced Cymatics \(Hyper-Resonance Series\) -->\s*<div class="mt-6 border-t border-white/5 pt-4">.*?<div class="grid grid-cols-2 gap-3">.*?</div>\s*</div>', f'<!-- Advanced Cymatics (Hyper-Resonance Series) -->\\n                        <div class="mt-6 border-t border-white/5 pt-4">\\n                            <h4 class="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mb-4 flex items-center gap-2">\\n                                <span class="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]"></span>\\n                                Level 4: Cosmic Symphony\\n                            </h4>\\n                            <div class="grid grid-cols-2 gap-3">\\n                                {level4_html}</div>\\n                        </div>', html, flags=re.DOTALL)

# Fix duplicate IDs
html = re.sub(r'<div id="cymaticsPanel" class="hidden absolute top-16 right-6', r'<div id="cymaticsFloatingPanel" class="hidden absolute top-16 right-6', html)
html = re.sub(r'<div id="snowflakeSettingsPanel" class="hidden absolute top-16 right-6', r'<div id="snowflakeSettingsFloatingPanel" class="hidden absolute top-16 right-6', html)
html = re.sub(r'<div id="binauralVisualizerPanel" class="hidden absolute top-16 right-6', r'<div id="binauralVisualizerFloatingPanel" class="hidden absolute top-16 right-6', html)

with open('mindwave-friday.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("SUCCESS: Patched mindwave-friday.html")
