import re

with open('mindwave.html', 'r') as f:
    html = f.read()

delim = '<div class="cymatics-class-section bg-black/40 border border-cyan-500/20 rounded-xl p-4">'
indices = [m.start() for m in re.finditer(re.escape(delim), html)]

# Get end of section 25
# It ends right before the closing div of cymatics-library.
# Let's find the next tab to be safe.
next_tab_idx = html.find('<!-- TAB:', indices[-1])
if next_tab_idx == -1:
    next_tab_idx = html.find('<div class="tab-panel', indices[-1])

# The section 25 ends somewhere before `next_tab_idx`. Let's assume it ends at the last `</div>` before `next_tab_idx` that closes `cymatics-library`.
# Actually, `cymatics-library` is inside `tab-cymatics`.
# Let's find `</div>\n</div>\n<!-- TAB:`
end_lib_idx = html.rfind('</div>', indices[-1], next_tab_idx)
end_lib_idx = html.rfind('</div>', indices[-1], end_lib_idx)

# Let's extract the blocks.
sections = []
for i in range(len(indices)):
    start = indices[i]
    if i < len(indices) - 1:
        end = indices[i+1]
    else:
        end = end_lib_idx # roughly
    
    # Trim trailing whitespace
    block = html[start:end]
    sections.append(block)

print(f"Extracted {len(sections)} sections")

# Identify classes
idx_0 = -1
idx_22 = -1
idx_24 = -1
idx_25 = -1

for i, s in enumerate(sections):
    if '[0]' in s: idx_0 = i
    elif '[22]' in s: idx_22 = i
    elif '[24]' in s: idx_24 = i
    elif '[25]' in s: idx_25 = i

print(f"Indices: 0={idx_0}, 22={idx_22}, 24={idx_24}, 25={idx_25}")

# Process Class 24 to move buttons to 22
s24 = sections[idx_24]
buttons = re.findall(r'<button[\s\S]*?</button>', s24)
print(f"Found {len(buttons)} buttons in Class 24")

s22 = sections[idx_22]
# insert buttons before the last </div></div> in s22
insert_pos = s22.rfind('</div>\n</div>')
if insert_pos == -1: insert_pos = s22.rfind('</div></div>')
if insert_pos == -1: insert_pos = s22.rfind('</div>')

s22 = s22[:insert_pos] + '\n'.join(buttons) + '\n' + s22[insert_pos:]
sections[idx_22] = s22

# Remove Class 24
sections[idx_24] = ''

# Order: 25, 0, 22, then the rest
new_sections = []
new_sections.append(sections[idx_25])
new_sections.append(sections[idx_0])
new_sections.append(sections[idx_22])

for i, s in enumerate(sections):
    if i not in [idx_0, idx_22, idx_24, idx_25]:
        new_sections.append(s)

# Reassemble
prefix = html[:indices[0]]
suffix = html[end_lib_idx:]

new_html = prefix + "".join(new_sections) + suffix

with open('mindwave.html', 'w') as f:
    f.write(new_html)

print("Done fixing HTML!")
