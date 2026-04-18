import re
import sys

with open('public/mindwave-beta.html', 'r', encoding='utf-8') as f:
    beta_html = f.read()

with open('public/mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Extract cyberSettingsPanel from beta
start_str = '            <div id="cyberSettingsPanel"'
end_str = '            <div id="matrixSettingsPanel"'
start_idx = beta_html.find(start_str)
end_idx = beta_html.find(end_str)

if start_idx == -1 or end_idx == -1:
    print("Could not find cyberSettingsPanel in beta HTML.")
    sys.exit(1)

cyber_panel_html = beta_html[start_idx:end_idx]

# 2. Inject cyberSettingsPanel before matrixSettingsPanel in current HTML
if 'id="cyberSettingsPanel"' not in html:
    insert_idx = html.find('                <div id="matrixSettingsPanel"')
    if insert_idx != -1:
        html = html[:insert_idx] + cyber_panel_html + "\n" + html[insert_idx:]
        print("Injected cyberSettingsPanel successfully.")
    else:
        print("Could not find matrixSettingsPanel to insert cyberSettingsPanel.")
        sys.exit(1)
else:
    print("cyberSettingsPanel already exists.")

# 3. Add dimmerOverlay to HTML right before visualizer canvas
dimmer_html = '\n    <!-- Global Dimmer Overlay -->\n    <div id="dimmerOverlay" class="fixed inset-0 bg-black pointer-events-none z-0" style="opacity: 0;"></div>\n'
if 'id="dimmerOverlay"' not in html:
    vis_idx = html.find('    <canvas id="visualizer"')
    if vis_idx != -1:
        html = html[:vis_idx] + dimmer_html + html[vis_idx:]
        print("Injected dimmerOverlay successfully.")
    else:
        print("Could not find visualizer to insert dimmerOverlay.")
        sys.exit(1)
else:
    print("dimmerOverlay already exists.")

# 4. Add Global Dimmer Slider next to Speed Slider
slider_container_html = """
                    <!-- Divider (Hidden on small screens) -->
                    <div class="hidden lg:block w-px h-6 bg-white/10 mx-2"></div>

                    <!-- Dimmer Controls in Center -->
                    <div class="flex items-center gap-2">
                        <div class="w-24 flex flex-col gap-0.5 opacity-50 hover:opacity-100 transition-opacity"
                            id="dimmerSliderContainer" title="Background Dimmer (0-100%)">
                            <div class="flex justify-between items-center px-0.5">
                                <label class="premium-label" style="font-size: 8px;">DIMMER</label>
                                <span id="dimmerValue" class="premium-value" style="font-size: 9px;">0%</span>
                            </div>
                            <input type="range" id="globalDimmerSlider" min="0" max="1" step="0.01" value="0"
                                class="premium-slider">
                        </div>
                    </div>
"""
if 'id="globalDimmerSlider"' not in html:
    # Find recordBtn area to insert before it
    record_idx = html.find('                    <!-- Record Controls in Center -->')
    if record_idx != -1:
        html = html[:record_idx] + slider_container_html + html[record_idx:]
        print("Injected globalDimmerSlider successfully.")
    else:
        print("Could not find Record Controls to insert Dimmer Slider.")
        sys.exit(1)
else:
    print("globalDimmerSlider already exists.")

with open('public/mindwave.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Saved mindwave.html updates.")
