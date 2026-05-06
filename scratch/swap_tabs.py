import re

with open('public/mindwave.html', 'r') as f:
    html = f.read()

# 1. Extract DJ Studio block
dj_start = html.find('<!-- TAB: STUDIO (DJ PADS & UPLOADS) -->')
dj_end = html.find('</div>\n            </div>\n\n    </aside>', dj_start)
if dj_end == -1:
    print("Failed to find DJ end")
    exit(1)
dj_block = html[dj_start:dj_end]

# 2. Extract Pro Settings block
pro_start = html.find('<!-- TAB: PRO (CONTEXTUAL SETTINGS) -->')
pro_end = html.find('</div>\n\n            <!-- TAB: LIBRARY (PRESETS & THEMES) -->', pro_start)
if pro_end == -1:
    print("Failed to find Pro end")
    exit(1)
pro_block = html[pro_start:pro_end]

# 3. Extract Theme Engine block
theme_start = html.find('<!-- THEME ENGINE -->')
theme_end = html.find('</section>\n                \n                <div class="h-10"></div>', theme_start)
if theme_end == -1:
    print("Failed to find Theme end")
    exit(1)
theme_block = html[theme_start:theme_end+10]

# Now let's create the new Settings block for the left side
new_settings_block = """<!-- TAB: SETTINGS (PRO & THEMES) -->
                <div id="leftTabSettings" class="hidden p-6 space-y-8 tab-content">
""" + pro_block.replace('<!-- TAB: PRO (CONTEXTUAL SETTINGS) -->\n            <div id="rightTabPro" class="hidden tab-content p-6">\n', '').replace('</div>', '', 1) + "\n" + theme_block + "\n                </div>"

# And the new Studio block for the right side
new_studio_block = dj_block.replace('id="leftTabStudio"', 'id="rightTabStudio"')

# Remove Theme Engine from rightTabLibrary
html = html[:theme_start] + html[theme_end+10:]

# Replace Pro block with new Studio block
html = html.replace(pro_block, new_studio_block)

# Replace old Studio block with new Settings block
html = html.replace(dj_block, new_settings_block)

# Update the JS switch logic
html = html.replace("'studio': 'leftTabStudio'", "'settings': 'leftTabSettings'")
html = html.replace("'pro': 'rightTabPro'", "'studio': 'rightTabStudio'")

# Update Right Tabs buttons
old_right_buttons = """<button onclick="switchRightTab('pro')" id="tabBtnPro" class="flex-1 py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all text-white/40">Pro</button>"""
new_right_buttons = """<button onclick="switchRightTab('studio')" id="tabBtnStudioRight" class="flex-1 py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all text-white/40">Studio</button>"""
html = html.replace(old_right_buttons, new_right_buttons)

with open('public/mindwave.html', 'w') as f:
    f.write(html)
print("Swap successful")
