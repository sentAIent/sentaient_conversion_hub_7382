import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    html = f.read()

# We need to manually style Class 18
# First, replace the h4 tag
old_h4 = '<h4 class="text-[10px] text-gray-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">Class XVIII: Hyper-Complex 3D Entities</h4>'
new_h4 = '<h4 class="text-[12px] text-zinc-400 uppercase tracking-[0.2em] mb-3 border-b border-zinc-500/30 pb-1 font-extrabold">Class XVIII: Hyper-Complex 3D Entities</h4>'
html = html.replace(old_h4, new_h4)

# Replace the buttons
btn_pattern = re.compile(r'<button class="cymatics-pattern-btn aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all group relative" onclick="window\.setCymaticPattern\(18, (\d+)\)">(.*?)</button>', re.DOTALL)

names = [
    "TESSERACT FOLD", "HYPERSPHERE", "KLEIN BOTTLE", "CALABI-YAU",
    "MOBIUS STRIP", "STRANGE ATTRACTOR", "E8 LATTICE", "QUASICRYSTAL",
    "HILBERT CURVE", "PENROSE TILING"
]

def replace_btn(match):
    idx = int(match.group(1))
    content = match.group(2)
    
    # Extract the img src
    img_match = re.search(r'<img src="([^"]+)"', content)
    img_src = img_match.group(1) if img_match else ""
    
    name = names[idx] if idx < len(names) else f"ENTITY {idx}"
    
    return f'''<button class="cymatics-pattern-btn aspect-square rounded-lg overflow-hidden border border-zinc-500/40 hover:border-zinc-400 transition-all group relative shadow-[0_0_15px_rgba(161,161,170,0.2)] hover:shadow-[0_0_20px_rgba(161,161,170,0.6)]" onclick="window.setCymaticPattern(18, {idx})">
                    <img src="{img_src}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
                    <div class="absolute bottom-2 left-2 text-[9px] text-white font-black tracking-widest uppercase">{name}</div>
                </button>'''

html = btn_pattern.sub(replace_btn, html)

# Fix the controls for class 18
old_controls = '''<div class="mt-3 flex gap-2">
                <input type="color" class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" value="#ff00ff" onchange="window.setCymaticColor(18, 1, this.value)" title="Primary Color">
                <input type="color" class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" value="#00ffff" onchange="window.setCymaticColor(18, 2, this.value)" title="Secondary Color">
                <input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(18, 'intensity', this.value)" title="Intensity"> <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-2">Intensity</span>
            </div>'''

new_controls = '''<div class="mt-3 flex gap-3 p-3 bg-black/40 backdrop-blur-md rounded-xl border border-zinc-500/20 shadow-inner items-center">
                <input type="color" class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" value="#ff00ff" oninput="window.setCymaticColor(18, 1, this.value)" title="Primary Color">
                <input type="color" class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" value="#00ffff" oninput="window.setCymaticColor(18, 2, this.value)" title="Secondary Color">
                <input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(18, 'intensity', this.value)" title="Intensity"> <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-2">Intensity</span>
            </div>'''
            
# Note: Since I already appended the intensity span in the previous step, old_controls has it.
# Let's use regex to replace the controls cluster to be safe.

controls_pattern = re.compile(r'<div class="mt-3 flex gap-2">\s*<input type="color"[^>]*onchange="window\.setCymaticColor\(18, 1, this\.value\)"[^>]*>\s*<input type="color"[^>]*onchange="window\.setCymaticColor\(18, 2, this\.value\)"[^>]*>\s*<input type="range"[^>]*oninput="window\.setCymaticParam\(18, \'intensity\', this\.value\)"[^>]*>.*?</div>', re.DOTALL)

html = controls_pattern.sub(new_controls, html)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(html)

print("Class XVIII fixed.")
