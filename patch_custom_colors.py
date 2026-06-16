import re
import json

# ==========================================
# 1. Update mindwave.html UI
# ==========================================
with open('mindwave.html', 'r') as f:
    html = f.read()

# We need to insert the Color Pickers UI inside the "Cymatics Lab (Advanced Parameters)"
# which is located near "cymaticsHarmonicsSlider" or "cymaticAiBtn".
# Let's find: `<!-- End Cymatic AI Sync -->` or `<!-- Cymatics Header/Controls -->`
ui_injection = '''
                        <!-- Custom Palette Overrides for Level 3/4 -->
                        <div class="mt-4 p-3 bg-black/40 border border-white/10 rounded-xl relative overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <h4 class="text-[10px] text-white/50 uppercase tracking-widest mb-3 relative z-10 flex justify-between">
                                <span>Advanced Color Matrix</span>
                                <span class="text-[8px] text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">(Level 3/4 Only)</span>
                            </h4>
                            <div class="flex items-center justify-between relative z-10">
                                <input type="color" id="cymCol1" value="#0a84ff" class="w-8 h-8 rounded-full cursor-pointer bg-transparent border-none p-0 shadow-[0_0_10px_rgba(10,132,255,0.4)] transition-transform hover:scale-110">
                                <input type="color" id="cymCol2" value="#ff2a9d" class="w-8 h-8 rounded-full cursor-pointer bg-transparent border-none p-0 shadow-[0_0_10px_rgba(255,42,157,0.4)] transition-transform hover:scale-110">
                                <input type="color" id="cymCol3" value="#ffcc00" class="w-8 h-8 rounded-full cursor-pointer bg-transparent border-none p-0 shadow-[0_0_10px_rgba(255,204,0,0.4)] transition-transform hover:scale-110">
                                <input type="color" id="cymCol4" value="#00ffcc" class="w-8 h-8 rounded-full cursor-pointer bg-transparent border-none p-0 shadow-[0_0_10px_rgba(0,255,204,0.4)] transition-transform hover:scale-110">
                            </div>
                        </div>
'''

# Find a good spot in mindwave.html to inject the UI, preferably after the Cymatics Lab sliders.
# Let's place it right before `<!-- Simple Cymatics (Chladni) -->`
html = html.replace('                        <!-- Simple Cymatics (Chladni) -->', ui_injection + '\n                        <!-- Simple Cymatics (Chladni) -->')

# Let's also add the JS listener code into mindwave.html script tags or just at the end of the file.
# The user can change the colors, so we need event listeners.
js_listener = '''
<script>
document.addEventListener("DOMContentLoaded", () => {
    const updateCymaticCustomColor = (idx, hex) => {
        if(window.gameEngine && window.gameEngine.visualizer && window.gameEngine.visualizer.cymaticMaterial) {
            const m = window.gameEngine.visualizer.cymaticMaterial;
            if(m.uniforms[`uCymaticCol${idx}`]) {
                m.uniforms[`uCymaticCol${idx}`].value.set(hex);
            }
        }
    };
    const c1 = document.getElementById('cymCol1');
    const c2 = document.getElementById('cymCol2');
    const c3 = document.getElementById('cymCol3');
    const c4 = document.getElementById('cymCol4');
    if(c1) c1.addEventListener('input', e => updateCymaticCustomColor(1, e.target.value));
    if(c2) c2.addEventListener('input', e => updateCymaticCustomColor(2, e.target.value));
    if(c3) c3.addEventListener('input', e => updateCymaticCustomColor(3, e.target.value));
    if(c4) c4.addEventListener('input', e => updateCymaticCustomColor(4, e.target.value));
});
</script>
</body>
'''
html = html.replace('</body>', js_listener)

with open('mindwave.html', 'w') as f:
    f.write(html)
print("mindwave.html updated with Color Pickers UI and JS listener.")


# ==========================================
# 2. Update visualizer_vGOLD_SYNC.js
# ==========================================
with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    js = f.read()

# Update Uniforms
uniforms_injection = '''
                    uCymaticCol1: { value: new THREE.Color('#0a84ff') },
                    uCymaticCol2: { value: new THREE.Color('#ff2a9d') },
                    uCymaticCol3: { value: new THREE.Color('#ffcc00') },
                    uCymaticCol4: { value: new THREE.Color('#00ffcc') },
                    uFractalType: { value: 1.0 },
                    uFluidity: { value: 0.5 },
'''
js = js.replace('                    uShiver: { value: 0.0 },', uniforms_injection + '                    uShiver: { value: 0.0 },')

# Update Vertex Shader Signature
js = js.replace('uniform float uTime, uN, uM, uIntensity, uEnergy, uShiver, uType, uResonance, uEntropy, uFlow;', 
                'uniform float uTime, uN, uM, uIntensity, uEnergy, uShiver, uType, uResonance, uEntropy, uFlow, uFractalType, uFluidity;')

# Update Fragment Shader Signatures
js = js.replace('uniform float uBeatFreq, uTime, uIntensity, uType, uEnergy, uHarmonics, uShiver;',
                'uniform float uBeatFreq, uTime, uIntensity, uType, uEnergy, uHarmonics, uShiver;\n                    uniform vec3 uCymaticCol1, uCymaticCol2, uCymaticCol3, uCymaticCol4;\n                    uniform float uFractalType, uFluidity;')
js = js.replace('uniform float uBeatFreq, uType, uHarmonics, uNormHighs, uEntropy, uFlow, uResonance;',
                'uniform float uBeatFreq, uType, uHarmonics, uNormHighs, uEntropy, uFlow, uResonance;\n                    uniform vec3 uCymaticCol1, uCymaticCol2, uCymaticCol3, uCymaticCol4;\n                    uniform float uFractalType, uFluidity;')

# Update setCymaticPatternByIndex
js_logic = '''    setCymaticPatternByIndex(idx) {
        console.log(`[Cymatics] Setting pattern by index: ${idx}`);
        
        if (window.state && window.state.aiVisualsLocked) {
            window.state.aiVisualsLocked = false;
            const aiBtn = document.getElementById('cymaticAiBtn');
            if (aiBtn) aiBtn.style.borderColor = 'rgba(34, 211, 238, 0.2)'; 
        }

        const p = Visualizer3D.CYMATIC_PATTERNS[idx];
        if (p) {
            if (p.palette && p.palette.length >= 4 && this.cymaticMaterial) {
                if(this.cymaticMaterial.uniforms.uCymaticCol1) {
                    this.cymaticMaterial.uniforms.uCymaticCol1.value.set(p.palette[0]);
                    this.cymaticMaterial.uniforms.uCymaticCol2.value.set(p.palette[1]);
                    this.cymaticMaterial.uniforms.uCymaticCol3.value.set(p.palette[2]);
                    this.cymaticMaterial.uniforms.uCymaticCol4.value.set(p.palette[3]);
                }
                const cp1 = document.getElementById('cymCol1');
                const cp2 = document.getElementById('cymCol2');
                const cp3 = document.getElementById('cymCol3');
                const cp4 = document.getElementById('cymCol4');
                if(cp1) cp1.value = p.palette[0];
                if(cp2) cp2.value = p.palette[1];
                if(cp3) cp3.value = p.palette[2];
                if(cp4) cp4.value = p.palette[3];
            }
            if (p.fractalType !== undefined && this.cymaticMaterial && this.cymaticMaterial.uniforms.uFractalType) {
                this.cymaticMaterial.uniforms.uFractalType.value = p.fractalType;
            }
            if (p.fluidity !== undefined && this.cymaticMaterial && this.cymaticMaterial.uniforms.uFluidity) {
                this.cymaticMaterial.uniforms.uFluidity.value = p.fluidity;
            }

            this.cymaticsHistory.push(p);
            this.cymaticsHistoryIndex = this.cymaticsHistory.length - 1;
            this.applyCymatic(p);
            this.lastCymaticRotation = performance.now();
        }
    }'''
# Find and replace the setCymaticPatternByIndex block using regex
pattern = re.compile(r'    setCymaticPatternByIndex\(idx\)\s*\{.*?\n    \}', re.DOTALL)
js = re.sub(pattern, js_logic, js)

# 3. Update CYMATIC_PATTERNS definitions
new_patterns = '''            { name: "Plasma Interference", n: 12, m: 18, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.8, palette: ["#19c8e6", "#e633cc", "#ffe633", "#00ffcc"] },
            { name: "Opal Lattice", n: 7, m: 21, type: 8, cat: "quantum", fractalType: 2.0, fluidity: 0.6, palette: ["#ff0055", "#00ffcc", "#5500ff", "#ffcc00"] },
            { name: "Bioluminescent Fold", n: 14, m: 3, type: 8, cat: "quantum", fractalType: 3.0, fluidity: 1.0, palette: ["#00ffaa", "#0055ff", "#aa00ff", "#ff0055"] },
            { name: "Neon Geometria", n: 19, m: 7, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.1, palette: ["#ff00ff", "#ffff00", "#00ffff", "#ffffff"] },
            { name: "Ethereal Web", n: 5, m: 25, type: 8, cat: "quantum", fractalType: 2.0, fluidity: 0.9, palette: ["#aaff00", "#ff00aa", "#00aaff", "#ffaa00"] },
            { name: "Quantum Foam", n: 22, m: 11, type: 8, cat: "quantum", fractalType: 3.0, fluidity: 0.5, palette: ["#55ff55", "#5555ff", "#ff5555", "#ffff55"] },
            { name: "Holographic Matrix", n: 8, m: 28, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.3, palette: ["#0000ff", "#00ffff", "#ffffff", "#ff00ff"] },
            { name: "Sacred Pulse", n: 15, m: 15, type: 8, cat: "quantum", fractalType: 2.0, fluidity: 0.7, palette: ["#ff3333", "#33ff33", "#3333ff", "#ffff33"] },
            
            { name: "Cosmic Symphony", n: 21, m: 34, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.2, palette: ["#110033", "#7700ff", "#ff0077", "#00ffff"] },
            { name: "Nebula Core", n: 13, m: 8, type: 9, cat: "cosmic", fractalType: 2.0, fluidity: 0.8, palette: ["#330011", "#ff0033", "#ff7700", "#ffff00"] },
            { name: "Stellar Fracture", n: 28, m: 12, type: 9, cat: "cosmic", fractalType: 3.0, fluidity: 0.1, palette: ["#001133", "#0077ff", "#00ffff", "#ffffff"] },
            { name: "Golden Supernova", n: 33, m: 21, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.9, palette: ["#442200", "#ff8800", "#ffff00", "#ffffff"] },
            { name: "Void Blossoms", n: 9, m: 30, type: 9, cat: "cosmic", fractalType: 2.0, fluidity: 0.5, palette: ["#111111", "#ff00ff", "#00ffff", "#00ff00"] },
            { name: "Event Horizon", n: 17, m: 23, type: 9, cat: "cosmic", fractalType: 3.0, fluidity: 0.7, palette: ["#220000", "#ff0000", "#ff5500", "#ffaa00"] },
            { name: "Kleinian Bloom", n: 24, m: 16, type: 9, cat: "cosmic", fractalType: 1.0, fluidity: 0.4, palette: ["#002200", "#00ff00", "#55ff55", "#aaffaa"] },
            { name: "Apollonian Depth", n: 31, m: 9, type: 9, cat: "cosmic", fractalType: 2.0, fluidity: 0.2, palette: ["#222222", "#888888", "#cccccc", "#ffffff"] }'''

# We need to replace the old 16 entries in CYMATIC_PATTERNS with these.
# They are exactly the last 16 entries in the array.
old_patterns_regex = r'            \{ name: "Plasma Interference".*?\{ name: "Apollonian Depth".*?\}'
js = re.sub(old_patterns_regex, new_patterns, js, flags=re.DOTALL)

# 4. Modify Shader GLSL to use uFluidity, uFractalType, and custom colors
disp_target = r"                        else if \(uType < 8\.5\) \{.*?\} else \{"
disp_replacement = r'''                        else if (uType < 8.5) { // LEVEL 3: QUANTUM PLASMA INTERFERENCE
                            vec2 p8 = p * (0.5 + uEntropy * 0.5);
                            float r = length(p8);
                            float a = atan(p8.y, p8.x);
                            
                            // Mix between fluid noise and geometric symmetry
                            float fbm = noise(p8 * (n_eff * 0.2) + t * 0.1) * 0.5 + noise(p8 * (m_eff * 0.3) - t * 0.15) * 0.25;
                            float fluidSymmetry = cos(a * n_eff + fbm * 8.0) * sin(r * (10.0 + m_eff) - t * 2.0);
                            float geomSymmetry = cos(a * n_eff) * sin(r * (10.0 + m_eff) - t * (uFractalType * 2.0));
                            
                            float symmetry = mix(geomSymmetry, fluidSymmetry, uFluidity);
                            
                            f = symmetry * (1.0 + fbm * 2.0 * uFluidity) * 0.6;
                            f += sin(length(p) * (10.0 * uFractalType) - t * 4.0) * 0.2 * uIntensity;
                        }
                        else {'''
js = re.sub(disp_target, disp_replacement, js, flags=re.DOTALL)


color_target = r"\} else if \(uType > 7\.5 && uType < 8\.5\) \{.*?\} else if \(uType > 8\.5\) \{.*?\}"
color_replacement = r'''} else if (uType > 7.5 && uType < 8.5) { // TYPE 8: LEVEL 3 QUANTUM PLASMA (Customizable)
                            float r = length(uv);
                            float a = atan(uv.y, uv.x);
                            float phase = sin(r * (5.0 * uFractalType) - t * 3.0 + a * (2.0 + uFluidity * 2.0));
                            float glow = smoothstep(0.1, -0.1, f);
                            
                            vec3 plasmaCol = mix(uCymaticCol1, uCymaticCol2, sin(a * 5.0 + t) * 0.5 + 0.5);
                            plasmaCol = mix(plasmaCol, uCymaticCol3, cos(r * (10.0 + 10.0 * uFractalType) - t * 2.0) * 0.5 + 0.5);
                            
                            baseCol = plasmaCol * glow * 2.5;
                            baseCol += mix(uCymaticCol1, uCymaticCol4, uFluidity) * (1.0 - smoothstep(0.0, 0.3, abs(f))) * 1.5;
                            
                        } else if (uType > 8.5) { // TYPE 9: LEVEL 4 COSMIC SYMPHONY (Customizable)
                            float r = length(uv);
                            float a = atan(uv.y, uv.x);
                            
                            float energy = smoothstep(0.2, -0.05, f);
                            float core = smoothstep(0.02, 0.0, abs(f));
                            
                            vec3 nebulaCol = mix(uCymaticCol1, uCymaticCol2, sin(r * (4.0 + 4.0 * uFractalType) + t * (0.5 + uFluidity)) * 0.5 + 0.5);
                            nebulaCol = mix(nebulaCol, uCymaticCol3, energy);
                            
                            baseCol = mix(nebulaCol, uCymaticCol4, core * 0.5);
                            baseCol += uCymaticCol4 * core * (1.5 + 2.0 * uFluidity); // Sharp bright edges
                            baseCol += uCymaticCol3 * energy * (1.0 + 0.5 * uFractalType); // Glow halo
                        }'''
js = re.sub(color_target, color_replacement, js, flags=re.DOTALL)

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w') as f:
    f.write(js)
print("visualizer_vGOLD_SYNC.js updated with advanced hybrid fractal/fluid logic and multi-color support.")
