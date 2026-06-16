import re

# Parse indices
with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    js = f.read()

# Find the list of all patterns to get indices
patterns_block = js.split('static get CYMATIC_PATTERNS() {')[1].split('];')[0]
names = re.findall(r'name:\s*"([^"]+)"', patterns_block)

name_to_idx = {name: idx for idx, name in enumerate(names)}
print(name_to_idx)

# Fix mindwave.html button indices
with open('mindwave.html', 'r') as f:
    html = f.read()

# E.g. find <button ... onclick="selectCymaticPattern(45)"> ... <span>Plasma Interference</span>
def replace_idx(match):
    full_str = match.group(0)
    onclick = match.group(1)
    name = match.group(2)
    
    if name in name_to_idx:
        real_idx = name_to_idx[name]
        return full_str.replace(f'selectCymaticPattern({onclick})', f'selectCymaticPattern({real_idx})').replace(f'data-idx="{onclick}"', f'data-idx="{real_idx}"')
    return full_str

# Match: button ... selectCymaticPattern(45) ... data-idx="45" ... <span>Plasma Interference</span>
regex = r'<button[^>]*?selectCymaticPattern\((\d+)\)[^>]*?>\s*<canvas[^>]*?>\s*</canvas>\s*<span[^>]*?>([^<]+)</span>'
html_fixed = re.sub(regex, replace_idx, html)

with open('mindwave.html', 'w') as f:
    f.write(html_fixed)

print("mindwave.html indices fixed.")
