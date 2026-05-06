import re

with open('public/mindwave.html', 'r') as f:
    html = f.read()

with open('scratch/old_mindwave.html', 'r') as f:
    old_html = f.read()

dj_start = old_html.find('<!-- DJ PADS (Pioneer XDJ-style) -->')
dj_end = old_html.find('<!-- Soundscapes -->')
dj_content = old_html[dj_start:dj_end].strip()

# Target in public/mindwave.html
# We want to replace from <section class="mixer-section"> to </section> inside leftTabStudio
target_start = html.find('<section class="mixer-section">', html.find('<div id="leftTabStudio"'))
target_end = html.find('</section>', target_start) + len('</section>')

if target_start != -1 and dj_start != -1:
    new_html = html[:target_start] + dj_content + "\n" + html[target_end:]
    with open('public/mindwave.html', 'w') as f:
        f.write(new_html)
    print("DJ Pads patched successfully.")
else:
    print("Could not find targets.")
