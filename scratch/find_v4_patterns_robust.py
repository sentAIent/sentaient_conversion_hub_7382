with open('public/binaural-assets/js/visuals/visualizer_nuclear_v4.js', 'r', errors='ignore') as f:
    content = f.read()

lines = content.split('\n')
for i, line in enumerate(lines):
    if 'CYMATIC_PATTERNS' in line:
        for idx in range(max(0, i - 2), min(len(lines), i + 40)):
            print(f"{idx+1}: {lines[idx]}")
        break
