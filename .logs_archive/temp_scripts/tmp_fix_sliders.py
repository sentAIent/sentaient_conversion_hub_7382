import sys

# Load beta HTML to get the perfect original panels
with open('public/mindwave-beta.html', 'r', encoding='utf-8') as f:
    beta_html = f.read()

# Load current HTML
with open('public/mindwave.html', 'r', encoding='utf-8') as f:
    curr_html = f.read()

# Grab original cyberSettingsPanel from beta
c_start = beta_html.find('<div id="cyberSettingsPanel"')
c_end = beta_html.find('<div id="matrixSettingsPanel"')
if c_start == -1 or c_end == -1:
    print("Failed to find beta cyber")
    sys.exit(1)
c_start = beta_html.rfind('<div', 0, c_start + 10)
c_end = beta_html.rfind('<div', 0, c_end + 10)
cyber_original = beta_html[c_start:c_end]

# Grab original matrixSettingsPanel from beta
m_start = beta_html.find('<div id="matrixSettingsPanel"')
m_end = beta_html.find('<!-- RIGHT: Recording & Mixer Toggle -->')
if m_start == -1 or m_end == -1:
    print("Failed to find beta matrix")
    sys.exit(1)
m_start = beta_html.rfind('<div', 0, m_start + 10)
m_end = beta_html.rfind('<!--', 0, m_end + 10)
matrix_original = beta_html[m_start:m_end]

# Process both panels identically!
def polish_panel(panel_html):
    # 1. Main outer wrapper: soften padding, gap, and allow fluid max-w-full
    panel_html = panel_html.replace(
        'w-auto max-w-4xl',
        'w-[95%] sm:w-auto max-w-full'
    )
    
    # 2. Fix the vertical alignment of the Color controls group (remove mt-2)
    panel_html = panel_html.replace('class="flex items-center gap-1 mt-2"', 'class="flex items-center gap-1"')

    # 3. Cleanly narrow the sliders from w-24 to w-20 to save horizontal space WITHOUT stacking them!
    panel_html = panel_html.replace('class="flex flex-col gap-0.5 w-24"', 'class="flex flex-col gap-0.5 w-20"')
    
    # 4. Cleanly narrow the custom text inputs
    panel_html = panel_html.replace('class="w-24 bg-white/5 border', 'class="w-20 bg-white/5 border')
    
    return panel_html

new_cyber = polish_panel(cyber_original)
new_matrix = polish_panel(matrix_original)

# Replace in current HTML
c_curr_idx = curr_html.find('<div id="cyberSettingsPanel"')
m_end_idx = curr_html.find('<!-- RIGHT: Recording & Mixer Toggle -->')

if c_curr_idx == -1 or m_end_idx == -1:
    print("Failed to find current boundaries")
    sys.exit(1)

c_curr_start = curr_html.rfind('<div', 0, c_curr_idx + 10)
full_end = curr_html.rfind('<!--', 0, m_end_idx + 10)

curr_html = curr_html[:c_curr_start] + new_cyber + new_matrix + curr_html[full_end:]

with open('public/mindwave.html', 'w', encoding='utf-8') as f:
    f.write(curr_html)
print("Panels perfectly identical and cleanly minimized without stacking sliders.")
