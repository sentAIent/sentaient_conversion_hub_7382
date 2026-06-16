import re

html_path = 'mindwave.html'
with open(html_path, 'r') as f:
    content = f.read()

# Generate the replacement HTML
classes = [
    {'id': 'c1', 'name': 'Class 1: Fractal Interference', 'count': 14, 'param': 'uRecursion', 'paramName': 'Recursion Depth', 'min': 1, 'max': 10, 'step': 1},
    {'id': 'c2', 'name': 'Class 2: Particle Resonance', 'count': 12, 'param': 'uCustom1', 'paramName': 'Dispersion', 'min': 0.1, 'max': 2.0, 'step': 0.1},
    {'id': 'c3', 'name': 'Class 3: Fluid SDF', 'count': 10, 'param': 'uTurbulence', 'paramName': 'Turbulence', 'min': 0.1, 'max': 5.0, 'step': 0.1},
    {'id': 'c4', 'name': 'Class 4: Quantum Topology', 'count': 8, 'param': 'uPeakSharpness', 'paramName': 'Peak Sharpness', 'min': 0.5, 'max': 5.0, 'step': 0.1}
]

new_html = '\n                <!-- INJECTED NATIVE CYMATICS UI -->\n'
new_html += '                <div style="margin-top:20px; border-top:1px solid #333; padding-top:20px;">\n'
new_html += '                    <h3 style="color:#fff; font-size:16px; margin-bottom:15px; text-transform:uppercase; letter-spacing:1px;">CYMATICS RESONATOR (44 MASTERPIECES)</h3>\n'

for cls in classes:
    new_html += '                    <div style="margin-bottom:20px; background:rgba(255,255,255,0.02); padding:10px; border-radius:8px;">\n'
    new_html += f'                        <h4 style="color:#00ffff; font-size:14px; margin-bottom:10px;">{cls["name"]}</h4>\n'
    
    # Param slider
    new_html += '                        <div style="margin-bottom:10px; display:flex; flex-direction:column;">\n'
    new_html += f'                            <label style="color:#aaa; font-size:12px; margin-bottom:5px;">{cls["paramName"]}</label>\n'
    mid_val = (cls["min"] + cls["max"]) / 2
    oninput = f"if(window.setCymaticParam) window.setCymaticParam('{cls['param']}', this.value); else {{ if(window.setVisualMode) window.setVisualMode('cymatics'); setTimeout(() => {{ if(window.setCymaticParam) window.setCymaticParam('{cls['param']}', this.value); }}, 1000); }}"
    new_html += f'                            <input type="range" min="{cls["min"]}" max="{cls["max"]}" step="{cls["step"]}" value="{mid_val}" oninput="{oninput}" style="width: 100%; cursor:pointer;">\n'
    new_html += '                        </div>\n'
    
    # Colors
    new_html += '                        <div style="display:flex; gap:10px; margin-bottom:10px;">\n'
    for i, (col, dcol) in enumerate([(1, '#ff0055'), (2, '#00ffff'), (3, '#ff00ff')]):
        onc = f"if(window.setCymaticColor) window.setCymaticColor({col}, this.value); else {{ if(window.setVisualMode) window.setVisualMode('cymatics'); setTimeout(() => {{ if(window.setCymaticColor) window.setCymaticColor({col}, this.value); }}, 1000); }}"
        new_html += f'                            <div style="flex:1"><label style="font-size:10px;color:#aaa">Color {col}</label><br><input type="color" value="{dcol}" style="width:100%" onchange="{onc}"></div>\n'
    new_html += '                        </div>\n'
    
    # Buttons
    new_html += '                        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(40px, 1fr)); gap:8px;">\n'
    for i in range(cls['count']):
        pid = f"{cls['id']}_{i}"
        onclk = f"if(window.setCymaticPattern) window.setCymaticPattern('{pid}'); else {{ if(window.setVisualMode) window.setVisualMode('cymatics'); setTimeout(() => {{ if(window.setCymaticPattern) window.setCymaticPattern('{pid}'); }}, 1000); }}"
        
        # We know we made artifacts in a previous step, but let's just use the fallback style background we used in inject_ui.js
        bg = f"url('/binaural-assets/images/cymatics/{pid}_thumb.png') center/cover"
        style = f"width:40px; height:40px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:{bg}; cursor:pointer; transition:transform 0.2s, border-color 0.2s;"
        
        new_html += f'                            <button style="{style}" title="Pattern {i+1}" onclick="{onclk}" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.borderColor=\'#00ffff\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.borderColor=\'rgba(255,255,255,0.1)\';"></button>\n'
    new_html += '                        </div>\n'
    new_html += '                    </div>\n'
new_html += '                </div>\n            '

# Find the start of tab-active and the start of the next tab-panel
start_marker = '<div id="tab-active" class="tab-panel active space-y-6">'
end_marker = '<div id="tour-visuals"' # Or the next tab panel

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Could not find start marker")
    exit(1)

# Find the closing div of tab-active.
# The next tab panel starts with `<!-- TAB: VISUALS -->`
next_tab_idx = content.find('<!-- TAB: VISUALS -->', start_idx)
if next_tab_idx == -1:
    print("Could not find end marker")
    exit(1)

# The content between start_idx + len(start_marker) and next_tab_idx is the tab-active body (plus its closing div).
# We want to replace everything inside `<div id="tab-active"...>` up to its closing `</div>` which is just before `<!-- TAB: VISUALS -->`.

# We will just replace everything between start_marker and next_tab_idx, and make sure we put back the closing div.
replaced = content[:start_idx + len(start_marker)] + new_html + '</div>\n\n            ' + content[next_tab_idx:]

with open(html_path, 'w') as f:
    f.write(replaced)

print("HTML injection complete!")
