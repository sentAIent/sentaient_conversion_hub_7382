import re
import os

HTML_FILE = 'mindwave.html'
JS_FILE = 'binaural-assets/js/ui/controls_v3.js'
STATE_FILE = 'binaural-assets/js/state.js'

# --- 1. Update State.js (BRAINWAVE_VISUALS) ---
with open(STATE_FILE, 'r') as f:
    state_content = f.read()

# We don't strictly need to add all to BRAINWAVE_VISUALS if we handle them dynamically in applyPreset, 
# but let's add them to be safe.
new_visuals = """
    // Custom Deep Dive Frequencies
    'freq-0.5': ['nebula'],
    'freq-1.5': ['nebula'],
    'freq-2.5': ['zengarden'],
    'freq-3.0': ['particles'],
    'freq-4.5': ['tesseract'],
    'freq-5.5': ['zengarden'],
    'freq-6.5': ['rainforest'],
    'freq-7.83': ['rainforest'],
    'freq-8.5': ['particles'],
    'freq-10.0': ['matrix'],
    'freq-11.5': ['tesseract'],
    'freq-12.0': ['zengarden'],
    'freq-14.0': ['matrix'],
    'freq-16.0': ['matrix'],
    'freq-18.0': ['tesseract'],
    'freq-20.0': ['tesseract'],
    'freq-30.0': ['galaxy'],
    'freq-40.0': ['galaxy'],
    'freq-50.0': ['galaxy'],
    'freq-200.0': ['galaxy'],
"""
state_content = state_content.replace('    delta: [', new_visuals + '\n    delta: [')
with open(STATE_FILE, 'w') as f:
    f.write(state_content)

# --- 2. Update controls_v3.js (applyPreset) ---
with open(JS_FILE, 'r') as f:
    js_content = f.read()

# Inject the massive switch logic
new_cases = """
        // --- CUSTOM DEEP DIVE FREQUENCIES ---
        case 'freq-0.5': base = 100; beat = 0.5; color = '#8b0000'; window.setCymaticState?.(9, 0); break;
        case 'freq-1.5': base = 105; beat = 1.5; color = '#0000cd'; window.setCymaticState?.(3, 1); break;
        case 'freq-2.5': base = 110; beat = 2.5; color = '#2e8b57'; window.setCymaticState?.(20, 1); break;
        case 'freq-3.0': base = 111; beat = 3.0; color = '#8b0000'; window.setCymaticState?.(22, 10); break;
        case 'freq-4.5': base = 120; beat = 4.5; color = '#191970'; window.setCymaticState?.(13, 6); break;
        case 'freq-5.5': base = 130; beat = 5.5; color = '#ff4500'; window.setCymaticState?.(5, 4); break;
        case 'freq-6.5': base = 140; beat = 6.5; color = '#006400'; window.setCymaticState?.(11, 3); break;
        case 'freq-7.83': base = 144; beat = 7.83; color = '#00ff7f'; window.setCymaticState?.(22, 9); break;
        case 'freq-8.5': base = 150; beat = 8.5; color = '#00ced1'; window.setCymaticState?.(8, 7); break;
        case 'freq-10.0': base = 160; beat = 10.0; color = '#ffb6c1'; window.setCymaticState?.(19, 4); break;
        case 'freq-11.5': base = 170; beat = 11.5; color = '#39ff14'; window.setCymaticState?.(6, 8); break;
        case 'freq-12.0': base = 180; beat = 12.0; color = '#8b4513'; window.setCymaticState?.(14, 9); break;
        case 'freq-14.0': base = 190; beat = 14.0; color = '#ffffff'; window.setCymaticState?.(1, 0); break;
        case 'freq-16.0': base = 200; beat = 16.0; color = '#ffd700'; window.setCymaticState?.(10, 2); break;
        case 'freq-18.0': base = 210; beat = 18.0; color = '#ffff00'; window.setCymaticState?.(15, 4); break;
        case 'freq-20.0': base = 220; beat = 20.0; color = '#1e90ff'; window.setCymaticState?.(12, 7); break;
        case 'freq-30.0': base = 250; beat = 30.0; color = '#172554'; window.setCymaticState?.(4, 5); break;
        case 'freq-40.0': base = 300; beat = 40.0; color = '#ff00ff'; window.setCymaticState?.(17, 0); break;
        case 'freq-50.0': base = 400; beat = 50.0; color = '#60a9ff'; window.setCymaticState?.(25, 0); break;
        case 'freq-200.0': base = 800; beat = 200.0; color = '#adff2f'; window.setCymaticState?.(18, 9); break;
"""

# Update existing standard cases to trigger cymatics
js_content = js_content.replace("case 'delta': base = 100; beat = 2.5; color = '#6366f1'; break;", "case 'delta': base = 100; beat = 2.5; color = '#6366f1'; window.setCymaticState?.(3, 1); break;")
js_content = js_content.replace("case 'theta': base = 144; beat = 5.5; color = '#a855f7'; break;", "case 'theta': base = 144; beat = 5.5; color = '#a855f7'; window.setCymaticState?.(5, 4); break;")
js_content = js_content.replace("case 'alpha': base = 120; beat = 10; color = '#60a5fa'; break;", "case 'alpha': base = 120; beat = 10; color = '#60a5fa'; window.setCymaticState?.(19, 4); break;")
js_content = js_content.replace("case 'beta': base = 200; beat = 20; color = '#facc15'; break;", "case 'beta': base = 200; beat = 20; color = '#facc15'; window.setCymaticState?.(1, 0); break;")
js_content = js_content.replace("case 'gamma': base = 200; beat = 40; color = '#f472b6'; break;", "case 'gamma': base = 200; beat = 40; color = '#f472b6'; window.setCymaticState?.(17, 0); break;")

# Healing mappings
healing_overrides = {
    'heal-174': 'window.setCymaticState?.(22, 14);',
    'heal-285': 'window.setCymaticState?.(21, 2);',
    'heal-396': 'window.setCymaticState?.(22, 20);',
    'heal-417': 'window.setCymaticState?.(22, 12);',
    'heal-432': 'window.setCymaticState?.(22, 22);',
    'heal-528': 'window.setCymaticState?.(22, 16);',
    'heal-639': 'window.setCymaticState?.(21, 0);',
    'heal-741': 'window.setCymaticState?.(22, 13);',
    'heal-852': 'window.setCymaticState?.(21, 5);',
    'heal-963': 'window.setCymaticState?.(22, 29);'
}
for key, cmd in healing_overrides.items():
    js_content = re.sub(rf"(case '{key}': .*? break;)", rf"\1 {cmd}", js_content)

js_content = js_content.replace("case 'delta':", new_cases + "\n        case 'delta':")

with open(JS_FILE, 'w') as f:
    f.write(js_content)

# --- 3. Update HTML Buttons ---
with open(HTML_FILE, 'r') as f:
    html_content = f.read()

# Generate the 20 new buttons HTML
new_btns_html = """
<div class="sidebar-section mt-6">
    <div class="flex items-center justify-between mb-2">
        <h3 class="section-label text-cyan-400">Deep Dive Custom Frequencies</h3>
        <div class="premium-value-badge border-cyan-500/30 text-cyan-400">PRO</div>
    </div>
    <div class="grid grid-cols-2 gap-2 w-full">
        <!-- Buttons injected here -->
"""

frequencies = [
    ("0.5", "Epsilon", "Extreme Deep State"),
    ("1.5", "Delta", "Deepest Healing"),
    ("2.5", "Delta", "Immune Support"),
    ("3.0", "Delta", "Anti-Aging"),
    ("4.5", "Theta", "REM Sleep"),
    ("5.5", "Theta", "Deep Meditation"),
    ("6.5", "Theta", "Memory Consolidation"),
    ("7.83", "Schumann", "Earth Resonance"),
    ("8.5", "Alpha", "Light Relaxation"),
    ("10.0", "Alpha", "Serotonin / Mood"),
    ("11.5", "Alpha", "Flow State"),
    ("12.0", "Alpha", "Centering"),
    ("14.0", "Beta", "Focused Attention"),
    ("16.0", "Beta", "Cognitive Enhance"),
    ("18.0", "Beta", "Alertness & Energy"),
    ("20.0", "Beta", "Peak Intel"),
    ("30.0", "Gamma", "Hyper-Focus"),
    ("40.0", "Gamma", "Advanced Insight"),
    ("50.0", "Gamma", "Universal Compassion"),
    ("200.0", "Lambda", "Mystical Conscious")
]

for freq, name, desc in frequencies:
    new_btns_html += f'''
        <button class="preset-btn flex flex-col items-center justify-center glass-pill border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all group relative h-[50px]" onclick="applyPreset('freq-{freq}', this)" title="{desc}">
            <span class="text-xs font-bold text-cyan-400 text-opacity-80 group-hover:text-opacity-100">{freq} Hz</span>
            <span class="text-[9px] text-[var(--text-muted)] mt-0.5">{name}</span>
        </button>'''

new_btns_html += "\n    </div>\n</div>\n"

# Inject into HTML right after the brainwaves grid
html_content = html_content.replace('<!-- SECTION: Biological Resonance -->', new_btns_html + '\n<!-- SECTION: Biological Resonance -->')

# Generate the 25 Cymatic Master Classes buttons
cymatic_classes = [
    (1, "Fractal Interference", "Mathematical"),
    (2, "Particle Resonance", "Mathematical"),
    (3, "Fluid SDF", "Mathematical"),
    (4, "Quantum Topology", "Mathematical"),
    (5, "Sacred Geometry", "Mathematical"),
    (6, "Bioluminescent", "Mathematical"),
    (7, "Starburst", "Mathematical"),
    (8, "Asym Flow", "Mathematical"),
    (9, "Heavy Brutalism", "Mathematical"),
    (10, "Pixel Swarm", "Mathematical"),
    (11, "Sacred Runes", "Mathematical"),
    (12, "Wireframe", "Mathematical"),
    (13, "Ethereal Plasma", "Mathematical"),
    (14, "Vectors", "Mathematical"),
    (15, "Retro-Wave", "Mathematical"),
    (16, "Nano-Robotic", "Mathematical"),
    (17, "Infinite Tunnels", "Mathematical"),
    (18, "Hyper-Complex", "Mathematical"),
    (19, "Premium 3D", "Image-Based"),
    (20, "Sacred Ref", "Image-Based"),
    (21, "Raymarched Ref", "Image-Based"),
    (22, "Image-Based", "Image-Based"),
    (24, "Constellations", "Modular"),
    (25, "Double-Slit", "Quantum")
]

cymatics_html = """
<div class="sidebar-section mt-4">
    <h3 class="section-label text-purple-400">Master Classes Library</h3>
    <div class="grid grid-cols-2 gap-2 mt-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
"""

for c_id, name, type_ in cymatic_classes:
    cymatics_html += f'''
        <button class="flex flex-col items-center justify-center p-2 rounded-xl glass-lux border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-400 transition-all cursor-pointer h-16" onclick="window.setCymaticState?.({c_id}, 0)">
            <span class="text-[10px] font-bold text-purple-300 uppercase tracking-wider">{name}</span>
            <span class="text-[8px] text-purple-400/50 uppercase mt-1">Class {c_id}</span>
        </button>'''

cymatics_html += "\n    </div>\n</div>\n"

# Inject into cymatics tab
# Find <!-- TAB: CYMATICS -->
if '<!-- TAB: CYMATICS -->' in html_content:
    parts = html_content.split('<!-- TAB: CYMATICS -->')
    parts[1] = parts[1].replace('</div>\n</div>\n\n<!-- TAB: STUDIO -->', '</div>\n' + cymatics_html + '\n</div>\n\n<!-- TAB: STUDIO -->')
    html_content = '<!-- TAB: CYMATICS -->'.join(parts)

with open(HTML_FILE, 'w') as f:
    f.write(html_content)

print("Patching complete!")
