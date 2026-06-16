import re
import os

html_path = 'mindwave.html'
with open(html_path, 'r') as f:
    content = f.read()

# 1. Add Tab Pill
pill_str = '<div class="tab-pill flex-1" onclick="switchRightTab(\'cymatics\', this)" title="Cymatics Engine">Cymatics</div>'
if 'switchRightTab(\'cymatics\'' not in content:
    content = content.replace(
        '<div class="tab-pill flex-1" onclick="switchRightTab(\'studio\', this)" title="DJ Studio">Studio</div>',
        pill_str + '\n            <div class="tab-pill flex-1" onclick="switchRightTab(\'studio\', this)" title="DJ Studio">Studio</div>'
    )

# 2. Build Tab Content
def get_image(cls, var):
    if cls == 1:
        # We have c1_0 through c1_12. Loop them if var > 12
        v = var if var <= 12 else (var % 13)
        # We need the exact filenames. Let's just use a wild-card match later, or read the directory.
        return f"binaural-assets/images/cymatics/c1_{v}_*.png"
    elif cls == 2:
        return "binaural-assets/images/cymatics/cymatics_particle_swarm*.png"
    elif cls == 3:
        return "binaural-assets/images/cymatics/cymatics_fluid_sdf*.png"
    elif cls == 4:
        return "binaural-assets/images/cymatics/cymatics_quantum_topology*.png"

# We'll just put generic src and fix it with JS at runtime or do a glob match here.
# Let's read the exact filenames from public/binaural-assets/images/cymatics/
import glob

image_files = os.listdir('public/binaural-assets/images/cymatics')

def find_exact_image(cls, var):
    if cls == 1:
        v = var if var <= 12 else (var % 13)
        matches = [f for f in image_files if f.startswith(f'c1_{v}_')]
        if matches: return 'binaural-assets/images/cymatics/' + matches[0]
    elif cls == 2:
        matches = [f for f in image_files if f.startswith('cymatics_particle_swarm')]
        if matches: return 'binaural-assets/images/cymatics/' + matches[0]
    elif cls == 3:
        matches = [f for f in image_files if f.startswith('cymatics_fluid_sdf')]
        if matches: return 'binaural-assets/images/cymatics/' + matches[0]
    elif cls == 4:
        matches = [f for f in image_files if f.startswith('cymatics_quantum_topology')]
        if matches: return 'binaural-assets/images/cymatics/' + matches[0]
    return 'binaural-assets/images/cymatics/placeholder.png'

classes_info = [
    (1, "Class I: Fractal Interference", 14),
    (2, "Class II: Particle Resonance", 12),
    (3, "Class III: Fluid SDF", 10),
    (4, "Class IV: Quantum Topology", 8)
]

tab_html = '<div id="tab-cymatics" class="tab-panel hidden space-y-8">\n'
tab_html += '    <div class="sidebar-section">\n'
tab_html += '        <div class="flex items-center justify-between mb-2">\n'
tab_html += '            <h3 class="text-xs font-bold text-gray-300 uppercase tracking-wider"><i class="fas fa-wave-square mr-2" style="color: #60a9ff;"></i>Cymatics Engine Engine</h3>\n'
tab_html += '        </div>\n'

for cls, name, count in classes_info:
    tab_html += f'        <div class="cymatics-class-container mb-6">\n'
    tab_html += f'            <h4 class="text-[10px] text-gray-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">{name}</h4>\n'
    tab_html += f'            <div class="grid grid-cols-4 gap-2">\n'
    for v in range(count):
        img_src = find_exact_image(cls, v)
        tab_html += f'                <button class="cymatics-pattern-btn aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all group relative" onclick="window.setCymaticPattern({cls}, {v})">\n'
        tab_html += f'                    <img src="{img_src}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">\n'
        tab_html += f'                    <div class="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors"></div>\n'
        tab_html += f'                    <div class="absolute bottom-1 right-1 text-[8px] text-white/50 bg-black/50 px-1 rounded">{v+1}</div>\n'
        tab_html += f'                </button>\n'
    tab_html += '            </div>\n'
    
    # Add Color Pickers for the class
    tab_html += f'            <div class="mt-3 flex gap-2">\n'
    tab_html += f'                <input type="color" class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" value="#60a9ff" onchange="window.setCymaticColor({cls}, 1, this.value)" title="Primary Color">\n'
    tab_html += f'                <input type="color" class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" value="#a855f7" onchange="window.setCymaticColor({cls}, 2, this.value)" title="Secondary Color">\n'
    tab_html += f'                <input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam({cls}, \'intensity\', this.value)" title="Intensity">\n'
    tab_html += '            </div>\n'
    tab_html += '        </div>\n'

tab_html += '    </div>\n</div>\n'

if 'id="tab-cymatics"' not in content:
    content = content.replace(
        '<!-- TAB: STUDIO -->',
        '<!-- TAB: CYMATICS -->\n            ' + tab_html + '\n            <!-- TAB: STUDIO -->'
    )

with open(html_path, 'w') as f:
    f.write(content)

print("Injected native HTML for Cymatics.")
