import re

html_file = 'mindwave.html'
with open(html_file, 'r') as f:
    html = f.read()

colors = [
    'fuchsia-500/30', 'cyan-500/30', 'violet-500/30', 'emerald-500/30',
    'amber-500/30', 'rose-500/30', 'indigo-500/30', 'teal-500/30',
    'pink-500/30', 'sky-500/30', 'lime-500/30', 'orange-500/30', 'purple-500/30', 'yellow-500/30', 'blue-500/30'
]
border_colors = [c.replace('500/30', '400') for c in colors]
shadow_colors = [
    '217,70,239', '6,182,212', '139,92,246', '16,185,129',
    '245,158,11', '244,63,94', '99,102,241', '20,184,166',
    '236,72,153', '56,189,248', '132,204,22', '249,115,22', '168,85,247', '234,179,8', '59,130,246'
]

# Get the pattern names from visualizer_vGOLD_SYNC.js to put in the labels!
with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    js = f.read()

names = []
import json
for line in js.split('\n'):
    if 'name:' in line and '{' in line:
        try:
            m = re.search(r"name:\s*'([^']+)'", line)
            if m:
                names.append(m.group(1))
        except:
            pass

buttons_html = ''
for i in range(69):
    c_idx = i % len(colors)
    name = names[i] if i < len(names) else f"Pattern {i+1}"
    base_color = colors[c_idx].split('-')[0]
    buttons_html += f'''                            <button class="cymatics-pattern-btn p-2 rounded-lg bg-black/30 border border-{colors[c_idx]} text-[9px] font-bold uppercase text-white shadow-[0_0_12px_rgba({shadow_colors[c_idx]},0.15)] hover:shadow-[0_0_22px_rgba({shadow_colors[c_idx]},0.5)] hover:border-{border_colors[c_idx]} transition-all group relative overflow-hidden" onclick="selectCymaticPattern({i})">
                                <canvas class="cymatic-gen-art absolute inset-0 w-full h-full opacity-50 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" data-idx="{i}" width="200" height="200"></canvas>
                                <span class="relative z-10 group-hover:text-{base_color}-200 transition-colors tracking-wider drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">{name}</span>
                                <div class="absolute inset-0 bg-gradient-to-r from-{base_color}-600/0 via-{base_color}-500/10 to-{base_color}-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </button>\n'''

# find the grid start and end
start_marker = "<!-- Pattern Grid — Generative Cymatics -->"
end_marker = '</div>\n\n                <!-- SECTION: Visual Effects -->\n'

start_idx = html.find(start_marker)
# Find the start of the <div class="grid grid-cols-3 gap-3"> after the marker
div_start = html.find('<div class="grid', start_idx)
div_close = html.find('>', div_start) + 1

# find where this grid div closes
# Since there are buttons inside, the first </div> that aligns with <div class="grid..."> is right before <!-- SECTION: Visual Effects -->
# Actually let's just find the first "</div>\n\n                <!-- SECTION: Visual Effects -->"
end_idx = html.find('</div>\n\n                <!-- SECTION: Visual Effects -->', div_close)

if start_idx != -1 and end_idx != -1:
    new_html = html[:div_close] + '\n' + buttons_html + html[end_idx:]
    with open('mindwave.html', 'w') as f:
        f.write(new_html)
    print("Successfully replaced buttons grid!")
else:
    print("Could not find start or end index!")

