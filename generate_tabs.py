import re

# We will read visualizer_vGOLD_SYNC.js to get all 69 names
with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    js = f.read()

names = []
for line in js.split('\n'):
    if 'name:' in line and '{' in line:
        try:
            m = re.search(r"name:\s*'([^']+)'", line)
            if not m:
                m = re.search(r'name:\s*"([^"]+)"', line)
            if m:
                names.append(m.group(1))
        except:
            pass

# We only need exactly 69 names. If there are more, truncate.
names = names[:69]

# Button template
def make_btn(idx, name, color='fuchsia'):
    return f'''                            <button class="cymatics-pattern-btn p-2 rounded-lg bg-black/30 border border-{color}-500/30 text-[9px] font-bold uppercase text-white shadow-[0_0_12px_rgba(217,70,239,0.15)] hover:shadow-[0_0_22px_rgba(217,70,239,0.5)] hover:border-{color}-400 transition-all group relative overflow-hidden" onclick="selectCymaticPattern({idx})">
                                <canvas class="cymatic-gen-art absolute inset-0 w-full h-full opacity-50 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" data-idx="{idx}" width="200" height="200"></canvas>
                                <span class="relative z-10 group-hover:text-{color}-200 transition-colors tracking-wider drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">{name}</span>
                                <div class="absolute inset-0 bg-gradient-to-r from-{color}-600/0 via-{color}-500/10 to-{color}-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </button>'''

colors = ['cyan', 'fuchsia', 'violet', 'emerald', 'amber', 'rose', 'indigo', 'teal', 'pink', 'sky']

# Tab 1: Indices 0 to 58
tab1_btns = []
for i in range(59):
    if i < len(names):
        c = colors[i % len(colors)]
        tab1_btns.append(make_btn(i, names[i], c))

# Tab 2: Indices 59 to 68
tab2_btns = []
for i in range(59, 69):
    if i < len(names):
        c = colors[i % len(colors)]
        tab2_btns.append(make_btn(i, names[i], c))

html_file = 'mindwave.html'
with open(html_file, 'r') as f:
    html = f.read()

# Fix the navigation pills
nav_pattern = r'(<div class="tab-pill active flex-1"[^>]*>Cymatics</div>)'
new_nav = r'\1\n            <div class="tab-pill flex-1" onclick="switchRightTab(\'newcymatics\', this)" title="Advanced & New Cymatics">Cymatics II</div>'
html = re.sub(nav_pattern, new_nav, html)

# We need to replace the entire content of `<div id="tab-active" class="tab-panel active space-y-6">` up to `<!-- TAB: VISUALS -->`
start_tab_active = html.find('<div id="tab-active" class="tab-panel active space-y-6">')
end_tab_active = html.find('<!-- TAB: VISUALS -->')

new_tab_active = f'''<div id="tab-active" class="tab-panel active space-y-6">
                <div class="sidebar-section" data-section="cymatics">
                    <div class="sidebar-section-header cursor-pointer" onclick="toggleMixerSection('cymatics')">
                        <div class="flex items-center gap-4">
                            <h3 class="section-label m-0">Fractal Resonance</h3>
                            <div class="h-px bg-white/10 flex-1"></div>
                        </div>
                    </div>
                    <div class="sidebar-section-content mt-4" id="section-cymatics">
                        <div class="mt-2">
                            <div class="grid grid-cols-3 gap-2">
{chr(10).join(tab1_btns)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tab-newcymatics" class="tab-panel hidden space-y-6">
                <div class="sidebar-section" data-section="newcymatics">
                    <div class="sidebar-section-header cursor-pointer" onclick="toggleMixerSection('newcymatics')">
                        <div class="flex items-center gap-4">
                            <h3 class="section-label m-0">Advanced & New Cymatics</h3>
                            <div class="h-px bg-white/10 flex-1"></div>
                        </div>
                    </div>
                    <div class="sidebar-section-content mt-4" id="section-newcymatics">
                        <div class="mt-2">
                            <div class="grid grid-cols-2 gap-3">
{chr(10).join(tab2_btns)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            '''

html = html[:start_tab_active] + new_tab_active + html[end_tab_active:]

with open(html_file, 'w') as f:
    f.write(html)

print("Restored canvas buttons and split them into two tabs!")
