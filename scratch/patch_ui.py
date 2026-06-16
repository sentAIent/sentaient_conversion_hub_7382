import re

html_file = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/mindwave.html'
with open(html_file, 'r') as f:
    content = f.read()

# 1. Fix Cymatics H4 labels
def replace_h4(match):
    text = match.group(2)
    return f'<h4 class="text-[10px] text-gray-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1 font-semibold">{text}</h4>'

# Only apply to the cymatics tab content
start_idx = content.find('<div id="tab-cymatics"')
end_idx = content.find('<div id="tab-studio"', start_idx)

if start_idx != -1 and end_idx != -1:
    cymatics_content = content[start_idx:end_idx]
    
    # Replace h4 labels
    cymatics_content = re.sub(r'<h4 class="([^"]+)">([^<]+)</h4>', replace_h4, cymatics_content)
    
    # 2. Fix onchange to oninput for setCymaticColor
    cymatics_content = cymatics_content.replace('onchange="window.setCymaticColor', 'oninput="window.setCymaticColor')
    
    # 3. Fix Audio Sync / Mouse Sync toggles
    old_toggles = """<div class="flex gap-4 items-center bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                <div class="flex items-center gap-2 group cursor-pointer" onclick="document.getElementById('audioSyncToggle').click()">
                    <span class="text-[10px] font-medium tracking-wider uppercase text-gray-400 group-hover:text-[var(--gold-primary)] transition-colors">Audio Sync</span>
                    <label class="premium-toggle toggle-gold" onclick="event.stopPropagation()">
                        <input type="checkbox" id="audioSyncToggle" onchange="window.toggleAudioSync(this.checked)" checked>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="w-px h-4 bg-white/10"></div>
                <div class="flex items-center gap-2 group cursor-pointer" onclick="document.getElementById('mouseSyncToggle').click()">
                    <span class="text-[10px] font-medium tracking-wider uppercase text-gray-400 group-hover:text-emerald-400 transition-colors">Mouse Sync</span>
                    <label class="premium-toggle" onclick="event.stopPropagation()">
                        <input type="checkbox" id="mouseSyncToggle" onchange="window.toggleMouseSync(this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>"""
            
    new_toggles = """<div class="flex gap-4 items-center bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                <label class="flex items-center gap-2 group cursor-pointer">
                    <span class="text-[10px] font-medium tracking-wider uppercase text-gray-400 group-hover:text-[var(--gold-primary)] transition-colors">Audio Sync</span>
                    <div class="premium-toggle toggle-gold">
                        <input type="checkbox" id="audioSyncToggle" onchange="window.toggleAudioSync(this.checked)" checked>
                        <span class="toggle-slider"></span>
                    </div>
                </label>
                <div class="w-px h-4 bg-white/10"></div>
                <label class="flex items-center gap-2 group cursor-pointer">
                    <span class="text-[10px] font-medium tracking-wider uppercase text-gray-400 group-hover:text-emerald-400 transition-colors">Mouse Sync</span>
                    <div class="premium-toggle">
                        <input type="checkbox" id="mouseSyncToggle" onchange="window.toggleMouseSync(this.checked)">
                        <span class="toggle-slider"></span>
                    </div>
                </label>
            </div>"""
    
    cymatics_content = cymatics_content.replace(old_toggles, new_toggles)
    
    content = content[:start_idx] + cymatics_content + content[end_idx:]
    
    with open(html_file, 'w') as f:
        f.write(content)
        print("mindwave.html updated successfully.")
else:
    print("Could not find cymatics tab bounds.")

# 4. Patch controls_v3.js
js_file = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/binaural-assets/js/ui/controls_v3.js'
with open(js_file, 'r') as f:
    js_content = f.read()

old_set_color = """window.setCymaticColor = function(classId, colorIndex, hex) {
    console.log(`[Cymatics] Set Color - Class: ${classId}, Index: ${colorIndex}, Hex: ${hex}`);
    const viz = getVisualizer();
    if (viz && viz.setCymaticColor) {
        viz.setCymaticColor(classId, colorIndex, hex);
    }
};"""

new_set_color = """window.setCymaticColor = function(classId, colorIndex, hex) {
    console.log(`[Cymatics] Set Color - Class: ${classId}, Index: ${colorIndex}, Hex: ${hex}`);
    const viz = getVisualizer();
    if (viz) {
        if (viz.cymaticsCore && viz.cymaticsCore.activeClassId !== classId) {
            if (viz.applyCymaticClassAndVariation) {
                viz.applyCymaticClassAndVariation(classId, 0);
            }
            const btns = document.querySelectorAll('.cymatics-pattern-btn');
            btns.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-400', 'ring-purple-400', 'ring-emerald-400', 'ring-fuchsia-400', 'ring-white', 'scale-95'));
            const clickStr = `window.setCymaticPattern(${classId}, 0)`;
            const activeBtn = Array.from(btns).find(btn => btn.getAttribute('onclick') === clickStr);
            if (activeBtn) {
                activeBtn.classList.add('ring-2', 'ring-white', 'scale-95');
            }
        }
        if (viz.setCymaticColor) {
            viz.setCymaticColor(classId, colorIndex, hex);
        }
    }
};"""

if old_set_color in js_content:
    js_content = js_content.replace(old_set_color, new_set_color)
    with open(js_file, 'w') as f:
        f.write(js_content)
        print("controls_v3.js updated successfully.")
else:
    print("Could not find old setCymaticColor in controls_v3.js.")
