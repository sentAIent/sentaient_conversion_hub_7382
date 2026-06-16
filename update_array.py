import re

with open("binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js", "r", encoding="utf-8") as f:
    code = f.read()

new_array = """    static get CYMATIC_PATTERNS() { return [
            // --- LEVEL 1: Simple 1-Color (Classic) ---
            { name: "Cosmic Knot", n: 12, m: 1, type: 0, cat: "complex" },
            { name: "Zenith", n: 2, m: 1, type: 0, cat: "complex" },
            { name: "Horizon", n: 1, m: 2, type: 0, cat: "complex" },
            { name: "Triple Axis", n: 3, m: 1, type: 0, cat: "complex" },
            { name: "Quad Core", n: 4, m: 1, type: 0, cat: "complex" },
            { name: "Harmony", n: 5, m: 2, type: 0, cat: "complex" },

            // --- LEVEL 2: Advanced Multi-Color ---
            { name: "Polygon", n: 12, m: 12, type: 7 },
            { name: "Singularity", n: 25, m: 25, type: 7 },
            { name: "Quantum Flux", n: 10, m: 30, type: 7 },
            { name: "Aetheric Weaver", n: 21, m: 21, type: 7 },
            { name: "Quantum Knot", n: 16, m: 4, type: 7 },
            { name: "Astral", n: 8, m: 8, type: 7 },
            { name: "Aura Genesis", n: 8, m: 16, type: 4, cat: "advanced" },
            { name: "Void Matrix", n: 19, m: 19, type: 4, cat: "advanced" },
            { name: "Stellar Nexus", n: 24, m: 8, type: 4, cat: "advanced" },
            { name: "Crystalline Pulse", n: 9, m: 18, type: 4, cat: "advanced" },

            // --- LEVEL 3: Quantum Plasma (type: 8) ---
            { name: "Plasma Interference", n: 12, m: 18, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.8, palette: ["#19c8e6", "#e633cc", "#ffe633", "#00ffcc"] },
            { name: "Opal Lattice", n: 7, m: 21, type: 8, cat: "quantum", fractalType: 2.0, fluidity: 0.6, palette: ["#ff0055", "#00ffcc", "#5500ff", "#ffcc00"] },
            { name: "Bioluminescent Fold", n: 14, m: 3, type: 8, cat: "quantum", fractalType: 3.0, fluidity: 1.0, palette: ["#00ffaa", "#0055ff", "#aa00ff", "#ff0055"] },
            { name: "Neon Geometria", n: 19, m: 7, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.1, palette: ["#ff00ff", "#ffff00", "#00ffff", "#ffffff"] },
            { name: "Ethereal Web", n: 5, m: 25, type: 8, cat: "quantum", fractalType: 2.0, fluidity: 0.9, palette: ["#aaff00", "#ff00aa", "#00aaff", "#ffaa00"] },
            { name: "Quantum Foam", n: 22, m: 11, type: 8, cat: "quantum", fractalType: 3.0, fluidity: 0.5, palette: ["#55ff55", "#5555ff", "#ff5555", "#ffff55"] },
            { name: "Holographic Matrix", n: 8, m: 28, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.3, palette: ["#0000ff", "#00ffff", "#ffffff", "#ff00ff"] },
            { name: "Sacred Pulse", n: 15, m: 15, type: 8, cat: "quantum", fractalType: 2.0, fluidity: 0.7, palette: ["#ff3333", "#33ff33", "#3333ff", "#ffff33"] },
            
            // --- LEVEL 4: Cosmic Symphony (type: 9) ---
            { name: "Cosmic Symphony", n: 21, m: 34, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.2, palette: ["#110033", "#7700ff", "#ff0077", "#00ffff"] },
            { name: "Nebula Core", n: 13, m: 8, type: 9, cat: "cosmic", fractalType: 2.0, fluidity: 0.8, palette: ["#330011", "#ff0033", "#ff7700", "#ffff00"] },
            { name: "Stellar Fracture", n: 28, m: 12, type: 9, cat: "cosmic", fractalType: 3.0, fluidity: 0.1, palette: ["#001133", "#0077ff", "#00ffff", "#ffffff"] },
            { name: "Golden Supernova", n: 33, m: 21, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.9, palette: ["#442200", "#ff8800", "#ffff00", "#ffffff"] },
            { name: "Void Blossoms", n: 9, m: 30, type: 9, cat: "cosmic", fractalType: 2.0, fluidity: 0.5, palette: ["#111111", "#ff00ff", "#00ffff", "#00ff00"] },
            { name: "Event Horizon", n: 17, m: 23, type: 9, cat: "cosmic", fractalType: 3.0, fluidity: 0.7, palette: ["#220000", "#ff0000", "#ff5500", "#ffaa00"] },
            { name: "Kleinian Bloom", n: 24, m: 16, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.4, palette: ["#002200", "#00ff00", "#55ff55", "#aaffaa"] },
            { name: "Apollonian Depth", n: 31, m: 9, type: 9, cat: "cosmic", fractalType: 2.0, fluidity: 0.2, palette: ["#222222", "#888888", "#cccccc", "#ffffff"] },
        ];
    }"""

pattern = re.compile(r'    static get CYMATIC_PATTERNS\(\) \{ return \[.*?\];\n    \}', re.DOTALL)
if pattern.search(code):
    new_code = pattern.sub(new_array, code)
    with open("binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js", "w", encoding="utf-8") as f:
        f.write(new_code)
    print("SUCCESS")
else:
    print("FAILED TO MATCH")
