import re

# 1. Patch mindwave.html
html_path = "mindwave.html"
with open(html_path, "r") as f:
    html_content = f.read()

btn_html = """
<!-- Stop All Cymatics Button -->
<button id="stopAllCymaticsBtn" class="w-full mb-4 bg-red-900/50 hover:bg-red-800/80 border border-red-500/50 text-red-200 text-[11px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]">
    <i class="fas fa-stop-circle mr-2"></i>Stop All Cymatics
</button>
"""

# Find Rainbow Morph Toggle block and insert right after it
target_str = "    </label>\n</div>"
idx = html_content.find("cymaticsRainbowToggle")
if idx != -1:
    end_idx = html_content.find(target_str, idx)
    if end_idx != -1:
        insert_pos = end_idx + len(target_str)
        if "stopAllCymaticsBtn" not in html_content:
            html_content = html_content[:insert_pos] + "\n" + btn_html + html_content[insert_pos:]
            with open(html_path, "w") as f:
                f.write(html_content)
            print("Patched mindwave.html")
        else:
            print("mindwave.html already patched")

# 2. Patch controls_v3.js
js_path = "binaural-assets/js/ui/controls_v3.js"
with open(js_path, "r") as f:
    js_content = f.read()

handler_code = """
    const stopAllCymaticsBtn = document.getElementById('stopAllCymaticsBtn');
    if (stopAllCymaticsBtn) {
        stopAllCymaticsBtn.addEventListener('click', () => {
            const viz = window.getVisualizer ? window.getVisualizer() : null;
            if (viz) {
                viz.activeModes.delete('cymatics');
                viz.updateVisibility();
                
                // Deselect all active cymatics buttons in UI
                document.querySelectorAll('.cymatic-btn').forEach(b => {
                    b.classList.remove('border-cyan-400', 'shadow-[0_0_15px_rgba(34,211,238,0.4)]');
                    b.classList.add('border-white/10');
                });
            }
        });
    }
"""

if "stopAllCymaticsBtn" not in js_content:
    # Insert near cymaticsRainbowToggle binding
    target = "els.cymaticsRainbowToggle = document.getElementById('cymaticsRainbowToggle');"
    idx = js_content.find(target)
    if idx != -1:
        insert_pos = idx + len(target)
        js_content = js_content[:insert_pos] + "\n" + handler_code + js_content[insert_pos:]
        with open(js_path, "w") as f:
            f.write(js_content)
        print("Patched controls_v3.js")
    else:
        print("Could not find cymaticsRainbowToggle in controls_v3.js")
else:
    print("controls_v3.js already patched")

