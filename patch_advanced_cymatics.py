import re

# 1. Update mindwave.html
with open('mindwave.html', 'r') as f:
    html = f.read()

type8_buttons = [
    {"name": "Plasma Interference", "idx": 45},
    {"name": "Opal Lattice", "idx": 46},
    {"name": "Bioluminescent Fold", "idx": 47},
    {"name": "Neon Geometria", "idx": 48},
    {"name": "Ethereal Web", "idx": 49},
    {"name": "Quantum Foam", "idx": 50},
    {"name": "Holographic Matrix", "idx": 51},
    {"name": "Sacred Pulse", "idx": 52}
]

type9_buttons = [
    {"name": "Cosmic Symphony", "idx": 53},
    {"name": "Nebula Core", "idx": 54},
    {"name": "Stellar Fracture", "idx": 55},
    {"name": "Golden Supernova", "idx": 56},
    {"name": "Void Blossoms", "idx": 57},
    {"name": "Event Horizon", "idx": 58},
    {"name": "Kleinian Bloom", "idx": 59},
    {"name": "Apollonian Depth", "idx": 60}
]

def build_btn(p, col):
    return f'''                            <button class="cymatics-pattern-btn p-2 rounded-lg bg-black/30 border border-{col}-500/30 text-[9px] font-bold uppercase text-white shadow-lg shadow-{col}-500/20 hover:shadow-xl hover:shadow-{col}-400/50 hover:border-{col}-400 transition-all group relative overflow-hidden" onclick="selectCymaticPattern({p['idx']})">
                                <canvas class="cymatic-gen-art absolute inset-0 w-full h-full opacity-50 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" data-idx="{p['idx']}" width="200" height="200"></canvas>
                                <span class="relative z-10 group-hover:text-{col}-200 transition-colors tracking-wider drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">{p["name"]}</span>
                                <div class="absolute inset-0 bg-gradient-to-r from-{col}-600/0 via-{col}-500/10 to-{col}-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </button>'''

html_level3 = ""
for b in type8_buttons:
    html_level3 += build_btn(b, "sky") + "\n"

html_level4 = ""
for b in type9_buttons:
    html_level4 += build_btn(b, "rose") + "\n"

injection = f'''                        <!-- Level 3: Quantum Plasma -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-sky-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.5)]"></span>
                                Level 3: Quantum Plasma (Ethereal)
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
{html_level3}                            </div>
                        </div>

                        <!-- Level 4: Cosmic Symphony -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-rose-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse shadow-[0_0_8px_rgba(251,113,133,0.5)]"></span>
                                Level 4: Cosmic Symphony (Master)
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
{html_level4}                            </div>
                        </div>
'''

target_marker = "<!-- TAB: VISUALS -->"
lines = html.split('\n')
for i, line in enumerate(lines):
    if target_marker in line:
        insert_idx = i - 3
        lines = lines[:insert_idx] + injection.split('\n') + lines[insert_idx:]
        break

with open('mindwave.html', 'w') as f:
    f.write('\n'.join(lines))
print("mindwave.html updated.")

# 2. Update visualizer_vGOLD_SYNC.js
with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    js = f.read()

# JS CYMATIC_PATTERNS insertion
js_patterns = '''            { name: "Plasma Interference", n: 12, m: 18, type: 8, cat: "quantum" },
            { name: "Opal Lattice", n: 7, m: 21, type: 8, cat: "quantum" },
            { name: "Bioluminescent Fold", n: 14, m: 3, type: 8, cat: "quantum" },
            { name: "Neon Geometria", n: 19, m: 7, type: 8, cat: "quantum" },
            { name: "Ethereal Web", n: 5, m: 25, type: 8, cat: "quantum" },
            { name: "Quantum Foam", n: 22, m: 11, type: 8, cat: "quantum" },
            { name: "Holographic Matrix", n: 8, m: 28, type: 8, cat: "quantum" },
            { name: "Sacred Pulse", n: 15, m: 15, type: 8, cat: "quantum" },
            { name: "Cosmic Symphony", n: 21, m: 34, type: 9, cat: "cosmic" },
            { name: "Nebula Core", n: 13, m: 8, type: 9, cat: "cosmic" },
            { name: "Stellar Fracture", n: 28, m: 12, type: 9, cat: "cosmic" },
            { name: "Golden Supernova", n: 33, m: 21, type: 9, cat: "cosmic" },
            { name: "Void Blossoms", n: 9, m: 30, type: 9, cat: "cosmic" },
            { name: "Event Horizon", n: 17, m: 23, type: 9, cat: "cosmic" },
            { name: "Kleinian Bloom", n: 24, m: 16, type: 9, cat: "cosmic" },
            { name: "Apollonian Depth", n: 31, m: 9, type: 9, cat: "cosmic" },
        ];'''

js = js.replace('        ];\n    }\n\n    initCymatics', js_patterns + '\n    }\n\n    initCymatics')

# Shader displacement
disp_target = "                        else { // HARMONIC GRADIENT (Type 7)"
disp_replacement = '''                        else if (uType < 7.5) { // HARMONIC GRADIENT (Type 7)
                            float base = chladniBase(p, n_eff * 0.15, m_eff * 0.15);
                            float secondary = chladniBase(p * 1.5, n_eff * 0.05, m_eff * 0.05);
                            f = base * 0.8 + secondary * 0.2;
                        }
                        else if (uType < 8.5) { // LEVEL 3: QUANTUM PLASMA INTERFERENCE
                            vec2 p8 = p * (0.5 + uEntropy * 0.5);
                            float r = length(p8);
                            float a = atan(p8.y, p8.x);
                            float fbm = noise(p8 * (n_eff * 0.2) + t * 0.1) * 0.5 + noise(p8 * (m_eff * 0.3) - t * 0.15) * 0.25;
                            float symmetry = cos(a * n_eff + fbm * 8.0) * sin(r * (10.0 + m_eff) - t * 2.0);
                            f = symmetry * (1.0 + fbm * 2.0) * 0.6;
                            f += sin(length(p) * 20.0 - t * 4.0) * 0.2 * uIntensity;
                        }
                        else { // LEVEL 4: COSMIC SYMPHONY FRACTALS
                            vec2 p9 = p * (0.8 + uIntensity * 0.4);
                            float t9 = t * 0.8;
                            for(int i=0; i<6; i++) {
                                p9 = abs(p9) / dot(p9, p9) - vec2(0.5 + uEntropy * 0.1, 0.5 + uResonance * 0.1);
                                float s = sin(t9 * 0.2), c = cos(t9 * 0.2);
                                p9 = vec2(p9.x * c - p9.y * s, p9.x * s + p9.y * c);
                            }
                            f = length(p9) * 0.15 * sin(length(p) * n_eff + t * 3.0);
                            f *= chladniBase(p, n_eff * 0.2, m_eff * 0.2);
                        }'''

# Replace exactly the Type 7 block
disp_block_regex = r"                        else \{ // HARMONIC GRADIENT \(Type 7\).*?f = base \* 0\.8 \+ secondary \* 0\.2;\n                        \}"
js = re.sub(disp_block_regex, disp_replacement, js, flags=re.DOTALL)

# Shader color
col_target = "} else if (uType > 6.5) { // TYPE 7: HARMONIC GRADIENT"
col_replacement = "} else if (uType > 6.5 && uType < 7.5) { // TYPE 7: HARMONIC GRADIENT"
js = js.replace(col_target, col_replacement)

# Append new color logic
color_block_regex = r"(baseCol \+= p2 \* peaks \* 3\.0;\s*\n                        \})"
color_injection = r'''\1 else if (uType > 7.5 && uType < 8.5) { // TYPE 8: LEVEL 3 QUANTUM PLASMA (Iridescent Opal)
                            float r = length(uv);
                            float a = atan(uv.y, uv.x);
                            vec3 opal1 = vec3(0.1, 0.8, 0.9);
                            vec3 opal2 = vec3(0.9, 0.2, 0.8);
                            vec3 opal3 = vec3(1.0, 0.9, 0.2);
                            float phase = sin(r * 15.0 - t * 3.0 + a * 4.0);
                            float glow = smoothstep(0.1, -0.1, f);
                            vec3 plasmaCol = mix(opal1, opal2, sin(a * 5.0 + t) * 0.5 + 0.5);
                            plasmaCol = mix(plasmaCol, opal3, cos(r * 20.0 - t * 2.0) * 0.5 + 0.5);
                            baseCol = plasmaCol * glow * 2.5;
                            baseCol += opal1 * (1.0 - smoothstep(0.0, 0.3, abs(f))) * 1.5;
                        } else if (uType > 8.5) { // TYPE 9: LEVEL 4 COSMIC SYMPHONY (Deep Nebula Fractals)
                            float r = length(uv);
                            float a = atan(uv.y, uv.x);
                            vec3 cos1 = vec3(0.05, 0.0, 0.15);
                            vec3 cos2 = vec3(0.4, 0.0, 0.8);
                            vec3 cos3 = vec3(1.0, 0.1, 0.5);
                            vec3 cos4 = vec3(0.0, 1.0, 0.8);
                            float energy = smoothstep(0.2, -0.05, f);
                            float core = smoothstep(0.02, 0.0, abs(f));
                            vec3 nebulaCol = mix(cos1, cos2, sin(r * 8.0 + t) * 0.5 + 0.5);
                            nebulaCol = mix(nebulaCol, cos3, energy);
                            baseCol = nebulaCol;
                            baseCol += cos4 * core * 3.5;
                            baseCol += cos3 * energy * 1.5;
                        }'''
js = re.sub(color_block_regex, color_injection, js)

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w') as f:
    f.write(js)
print("visualizer_vGOLD_SYNC.js updated.")

