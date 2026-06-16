import re

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

new_array = """    static get CYMATIC_PATTERNS() { return [
            // --- LEVEL 1: Simple 1-Color (Classic) ---
            { name: "Cosmic Knot", n: 12, m: 1, type: 0, cat: "complex", palette: ["#19c8e6", "#e633cc", "#ffe633", "#ffffff"] },
            { name: "Mystic Mandala", n: 16, m: 2, type: 0, cat: "complex", palette: ["#ff00ff", "#00ffff", "#ffff00", "#ffffff"] },
            { name: "Astral Bloom", n: 8, m: 3, type: 0, cat: "complex", palette: ["#00ffaa", "#ff00aa", "#aaff00", "#ffffff"] },
            { name: "Sacred Geometry", n: 24, m: 4, type: 0, cat: "complex", palette: ["#ff5500", "#0055ff", "#55ff00", "#ffffff"] },
            { name: "Ethereal Star", n: 10, m: 1, type: 0, cat: "complex", palette: ["#aa00ff", "#ffaa00", "#00aaff", "#ffffff"] },
            { name: "Infinity Loop", n: 6, m: 2, type: 0, cat: "complex", palette: ["#00aaff", "#ff0055", "#55ff00", "#ffffff"] },

            // --- LEVEL 2: Advanced Multi-Color ---
            { name: "Polygon", n: 12, m: 12, type: 7, palette: ["#ff0055", "#00ffcc", "#5500ff", "#ffcc00"] },
            { name: "Singularity", n: 25, m: 25, type: 7, palette: ["#00ffaa", "#0055ff", "#aa00ff", "#ff0055"] },
            { name: "Aura Genesis", n: 8, m: 16, type: 7, palette: ["#ff00ff", "#ffff00", "#00ffff", "#ffffff"] },
            { name: "Void Matrix", n: 19, m: 19, type: 7, palette: ["#aaff00", "#ff00aa", "#00aaff", "#ffaa00"] },
            { name: "Stellar Nexus", n: 24, m: 8, type: 7, palette: ["#55ff55", "#5555ff", "#ff5555", "#ffff55"] },
            { name: "Crystalline Pulse", n: 9, m: 18, type: 7, palette: ["#0000ff", "#00ffff", "#ffffff", "#ff00ff"] },

            // --- LEVEL 3: Quantum Plasma (type: 8) ---
            { name: "Quantum Knot", n: 16, m: 4, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.8, palette: ["#19c8e6", "#e633cc", "#ffe633", "#00ffcc"] },
            { name: "Quantum Flux", n: 10, m: 30, type: 8, cat: "quantum", fractalType: 2.0, fluidity: 0.6, palette: ["#ff0055", "#00ffcc", "#5500ff", "#ffcc00"] },
            { name: "Aetheric Weaver", n: 21, m: 21, type: 8, cat: "quantum", fractalType: 3.0, fluidity: 1.0, palette: ["#00ffaa", "#0055ff", "#aa00ff", "#ff0055"] },
            { name: "Astral", n: 8, m: 8, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.1, palette: ["#ff00ff", "#ffff00", "#00ffff", "#ffffff"] },
            { name: "Plasma Interference", n: 12, m: 18, type: 8, cat: "quantum", fractalType: 2.0, fluidity: 0.9, palette: ["#aaff00", "#ff00aa", "#00aaff", "#ffaa00"] },
            { name: "Opal Lattice", n: 7, m: 21, type: 8, cat: "quantum", fractalType: 3.0, fluidity: 0.5, palette: ["#55ff55", "#5555ff", "#ff5555", "#ffff55"] },
            { name: "Bioluminescent Fold", n: 14, m: 3, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.3, palette: ["#0000ff", "#00ffff", "#ffffff", "#ff00ff"] },
            { name: "Neon Geometria", n: 19, m: 7, type: 8, cat: "quantum", fractalType: 2.0, fluidity: 0.7, palette: ["#ff3333", "#33ff33", "#3333ff", "#ffff33"] },
            { name: "Ethereal Web", n: 5, m: 25, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.2, palette: ["#110033", "#7700ff", "#ff0077", "#00ffff"] },
            { name: "Sacred Pulse", n: 15, m: 15, type: 8, cat: "quantum", fractalType: 3.0, fluidity: 0.8, palette: ["#330011", "#ff0033", "#ff7700", "#ffff00"] },
            
            // --- LEVEL 4: Cosmic Symphony (type: 9) ---
            { name: "Cosmic Symphony", n: 21, m: 34, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.2, palette: ["#001133", "#0077ff", "#00ffff", "#ffffff"] },
            { name: "Nebula Core", n: 13, m: 8, type: 9, cat: "cosmic", fractalType: 2.0, fluidity: 0.8, palette: ["#442200", "#ff8800", "#ffff00", "#ffffff"] },
            { name: "Stellar Fracture", n: 28, m: 12, type: 9, cat: "cosmic", fractalType: 3.0, fluidity: 0.1, palette: ["#111111", "#ff00ff", "#00ffff", "#00ff00"] },
            { name: "Golden Supernova", n: 33, m: 21, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.9, palette: ["#220000", "#ff0000", "#ff5500", "#ffaa00"] },
            { name: "Void Blossoms", n: 9, m: 30, type: 9, cat: "cosmic", fractalType: 2.0, fluidity: 0.5, palette: ["#002200", "#00ff00", "#55ff55", "#aaffaa"] },
            { name: "Event Horizon", n: 17, m: 23, type: 9, cat: "cosmic", fractalType: 3.0, fluidity: 0.7, palette: ["#222222", "#888888", "#cccccc", "#ffffff"] },
            { name: "Kleinian Bloom", n: 24, m: 16, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.4, palette: ["#19c8e6", "#e633cc", "#ffe633", "#00ffcc"] },
            { name: "Apollonian Depth", n: 31, m: 9, type: 9, cat: "cosmic", fractalType: 2.0, fluidity: 0.2, palette: ["#ff0055", "#00ffcc", "#5500ff", "#ffcc00"] },
            { name: "Dark Matter", n: 22, m: 11, type: 9, cat: "cosmic", fractalType: 3.0, fluidity: 0.6, palette: ["#00ffaa", "#0055ff", "#aa00ff", "#ff0055"] },
            { name: "Galactic Spire", n: 15, m: 27, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.3, palette: ["#ff00ff", "#ffff00", "#00ffff", "#ffffff"] },
        ];
    }"""

js_content = re.sub(r'    static get CYMATIC_PATTERNS\(\) \{ return \[.*?\];\n    \}', new_array, js_content, flags=re.DOTALL)

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w', encoding='utf-8') as f:
    f.write(js_content)


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

with open('mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'<!-- LEVEL 1 BUTTONS -->.*?</div>', f'<!-- LEVEL 1 BUTTONS -->\\n                            <div class="grid grid-cols-3 gap-1.5 w-full">\\n                                {level1_html}</div>', html, flags=re.DOTALL)
html = re.sub(r'<!-- LEVEL 2 BUTTONS -->.*?</div>', f'<!-- LEVEL 2 BUTTONS -->\\n                            <div class="grid grid-cols-3 gap-1.5 w-full">\\n                                {level2_html}</div>', html, flags=re.DOTALL)
html = re.sub(r'<!-- LEVEL 3 BUTTONS -->.*?</div>', f'<!-- LEVEL 3 BUTTONS -->\\n                            <div class="grid grid-cols-2 gap-2 w-full">\\n                                {level3_html}</div>', html, flags=re.DOTALL)
html = re.sub(r'<!-- LEVEL 4 BUTTONS -->.*?</div>', f'<!-- LEVEL 4 BUTTONS -->\\n                            <div class="grid grid-cols-2 gap-2 w-full">\\n                                {level4_html}</div>', html, flags=re.DOTALL)

with open('mindwave.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done generating patterns and HTML!")
