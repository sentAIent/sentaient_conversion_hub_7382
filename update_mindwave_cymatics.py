import re
import json

patterns = [
    # --- SIMPLE CYMATICS (Chladni, Type 0) ---
    {"name": "Flower of Life", "n": 4, "m": 3, "type": 0, "cat": "sacred"},
    {"name": "Metatron Cube", "n": 5, "m": 5, "type": 0, "cat": "sacred"},
    {"name": "Fibonacci", "n": 3, "m": 8, "type": 0, "cat": "sacred"},
    {"name": "Torus Field", "n": 6, "m": 2, "type": 0, "cat": "sacred"},
    {"name": "Mandelbrot", "n": 4, "m": 7, "type": 0, "cat": "fractal"},
    {"name": "Julia Loop", "n": 5, "m": 9, "type": 0, "cat": "fractal"},
    {"name": "Polygon", "n": 8, "m": 5, "type": 0, "cat": "geometry"},
    {"name": "Singularity", "n": 9, "m": 3, "type": 0, "cat": "complex"},
    {"name": "Quantum Flux", "n": 7, "m": 7, "type": 0, "cat": "complex"},
    {"name": "Golden Ratio", "n": 1, "m": 9, "type": 0, "cat": "sacred"},
    {"name": "Aetheric Weaver", "n": 11, "m": 11, "type": 0, "cat": "advanced"},
    {"name": "Quantum Singularity", "n": 17, "m": 3, "type": 0, "cat": "simple"},
    {"name": "Celestial", "n": 8, "m": 2, "type": 0, "cat": "radial"},
    {"name": "Infinite", "n": 3, "m": 12, "type": 0, "cat": "fractal"},
    {"name": "Prism Fold", "n": 6, "m": 9, "type": 0, "cat": "complex"},
    {"name": "Cosmic Knot", "n": 12, "m": 1, "type": 0, "cat": "complex"},
    {"name": "Zen Mandala", "n": 5, "m": 11, "type": 0, "cat": "sacred"},
    {"name": "Astral", "n": 8, "m": 8, "type": 0, "cat": "complex"},
    {"name": "Plasma Bloom", "n": 4, "m": 14, "type": 0, "cat": "fractal"},
    {"name": "Synchronicity", "n": 9, "m": 9, "type": 0, "cat": "sacred"},
    {"name": "Unified Field", "n": 7, "m": 12, "type": 0, "cat": "complex"},
    {"name": "Omega Point", "n": 15, "m": 3, "type": 0, "cat": "complex"},
    {"name": "Source Fold", "n": 6, "m": 13, "type": 0, "cat": "sacred"},

    # --- RESONANCE CLASS (Type 4/5) ---
    {"name": "Aura Genesis", "n": 8, "m": 16, "type": 4, "cat": "advanced"},
    {"name": "Neural Core", "n": 21, "m": 7, "type": 5, "cat": "live_shader"},
    {"name": "Void Matrix", "n": 19, "m": 19, "type": 4, "cat": "advanced"},
    {"name": "Omega Resonance", "n": 22, "m": 11, "type": 5, "cat": "live_shader"},
    {"name": "Stellar Nexus", "n": 24, "m": 8, "type": 4, "cat": "advanced"},
    {"name": "Chronos Weave", "n": 14, "m": 28, "type": 5, "cat": "live_shader"},
    {"name": "Prime Prime", "n": 13, "m": 17, "type": 4, "cat": "advanced"},
    {"name": "Metatron's Grid", "n": 6, "m": 12, "type": 4, "cat": "advanced"},
    {"name": "Chronos Vortex", "n": 7, "m": 14, "type": 4, "cat": "advanced"},
    {"name": "Void Fractal", "n": 22, "m": 22, "type": 4, "cat": "advanced"},
    {"name": "Crystalline Pulse", "n": 9, "m": 18, "type": 4, "cat": "advanced"},
    {"name": "Stellar Loom", "n": 13, "m": 3, "type": 4, "cat": "advanced"},

    # --- PIXEL STARDUST CLASS (Type 6) ---
    {"name": "Pixel Nebula", "n": 31, "m": 13, "type": 6, "cat": "stardust"},
    {"name": "Magnetic Stardust", "n": 25, "m": 21, "type": 6, "cat": "stardust"},
    {"name": "Quantum Granules", "n": 18, "m": 33, "type": 6, "cat": "stardust"},
    {"name": "Neon Sand", "n": 27, "m": 9, "type": 6, "cat": "stardust"},
    {"name": "Chromatic Dust", "n": 30, "m": 15, "type": 6, "cat": "stardust"},

    # --- HARMONIC GRADIENT CLASS (Type 7) ---
    {"name": "Royal Gradient", "n": 11, "m": 22, "type": 7, "cat": "harmonic"},
    {"name": "Sunset Flow", "n": 16, "m": 24, "type": 7, "cat": "harmonic"},
    {"name": "Oceanic Folds", "n": 8, "m": 28, "type": 7, "cat": "harmonic"},
    {"name": "Auroral Waves", "n": 15, "m": 30, "type": 7, "cat": "harmonic"},
    {"name": "Golden Ratio Flow", "n": 21, "m": 34, "type": 7, "cat": "harmonic"}
]

def get_color(t):
    if t == 0: return "cyan"
    if t in [4, 5]: return "fuchsia"
    if t == 6: return "emerald"
    if t == 7: return "amber"
    return "violet"

def build_button(p, idx):
    col = get_color(p["type"])
    return f'''                            <button class="cymatics-pattern-btn p-2 rounded-lg bg-black/30 border border-{col}-500/30 text-[9px] font-bold uppercase text-white shadow-lg shadow-{col}-500/20 hover:shadow-xl hover:shadow-{col}-400/50 hover:border-{col}-400 transition-all group relative overflow-hidden" onclick="selectCymaticPattern({idx})">
                                <canvas class="cymatic-gen-art absolute inset-0 w-full h-full opacity-50 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" data-idx="{idx}" width="200" height="200"></canvas>
                                <span class="relative z-10 group-hover:text-{col}-200 transition-colors tracking-wider drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">{p["name"]}</span>
                                <div class="absolute inset-0 bg-gradient-to-r from-{col}-600/0 via-{col}-500/10 to-{col}-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </button>'''

sections_html = {0: "", 4: "", 6: "", 7: ""}

for idx, p in enumerate(patterns):
    html_btn = build_button(p, idx)
    if p["type"] == 0: sections_html[0] += html_btn + "\n"
    elif p["type"] in [4, 5]: sections_html[4] += html_btn + "\n"
    elif p["type"] == 6: sections_html[6] += html_btn + "\n"
    elif p["type"] == 7: sections_html[7] += html_btn + "\n"

new_html = f'''                        <!-- Simple Cymatics (Chladni) -->
                        <div class="mt-6">
                            <h4 class="text-[10px] font-bold text-cyan-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
                                Simple Cymatics (Chladni)
                            </h4>
                            <div class="grid grid-cols-3 gap-3">
{sections_html[0]}                            </div>
                        </div>

                        <!-- Resonance Class -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-fuchsia-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse shadow-[0_0_8px_rgba(217,70,239,0.5)]"></span>
                                Resonance Class (Chaos & Aura)
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
{sections_html[4]}                            </div>
                        </div>

                        <!-- Pixel Stardust Class -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                Pixel Stardust Class (Sandy)
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
{sections_html[6]}                            </div>
                        </div>

                        <!-- Harmonic Gradient Class -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                                Harmonic Gradient Class
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
{sections_html[7]}                            </div>
                        </div>
'''

# Update mindwave.html
with open('mindwave.html', 'r') as f:
    html_content = f.read()

# We replace everything from <!-- Pattern grid (Fractal buttons) --> down to the closing tag of the cymatics section
start_marker = "<!-- Pattern grid (Fractal buttons) -->"
end_marker = "<!-- TAB: VISUALS -->"

start_idx = html_content.find(start_marker)
end_idx = html_content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    # Back up to the end of the div containing the buttons. We need to leave the outer divs closed.
    # The replacement text goes right after the Cymatics Header/Controls block.
    # The end marker should actually be just before the closing divs of tab-active.
    # Let's just find the exact block.
    pass

# Better approach for mindwave.html:
lines = html_content.split('\n')
start_line = -1
end_line = -1

for i, line in enumerate(lines):
    if "<!-- Pattern grid (Fractal buttons) -->" in line:
        start_line = i
    if "<!-- TAB: VISUALS -->" in line:
        # We need to preserve the closing divs for tab-cymatics
        end_line = i - 3 # Typical closing divs offset

if start_line != -1 and end_line != -1:
    new_lines = lines[:start_line] + new_html.split('\n') + lines[end_line:]
    with open('mindwave.html', 'w') as f:
        f.write('\n'.join(new_lines))
    print("mindwave.html successfully updated.")
else:
    print("Could not find replacement markers in mindwave.html")

# Update visualizer_vGOLD_SYNC.js
with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    js_content = f.read()

js_start = "static get CYMATIC_PATTERNS() { return ["
start_idx = js_content.find(js_start)
if start_idx != -1:
    end_idx = js_content.find("];", start_idx) + 2
    
    new_js_array = "static get CYMATIC_PATTERNS() { return [\n"
    for p in patterns:
        new_js_array += f'            {{ name: "{p["name"]}", n: {p["n"]}, m: {p["m"]}, type: {p["type"]}, cat: "{p["cat"]}" }},\n'
    new_js_array += "        ];"
    
    new_js = js_content[:start_idx] + new_js_array + js_content[end_idx:]
    with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w') as f:
        f.write(new_js)
    print("visualizer_vGOLD_SYNC.js successfully updated.")
else:
    print("Could not find CYMATIC_PATTERNS in js.")

