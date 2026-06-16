import re

html_file = 'mindwave.html'
with open(html_file, 'r') as f:
    html = f.read()

# Get the pattern names from visualizer_vGOLD_SYNC.js
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

# Now iterate through data-idx="59" to "68" in HTML and replace the span text
for i in range(59, 69):
    if i < len(names):
        correct_name = names[i]
        
        # Regex to match the span for this specific index
        # The structure is: data-idx="59" ... </span> <span ...>OLD NAME</span>
        pattern = r'(data-idx="' + str(i) + r'".*?</canvas>\s*<span[^>]*>)([^<]+)(</span>)'
        
        def repl(match):
            return match.group(1) + correct_name + match.group(3)
        
        html = re.sub(pattern, repl, html, flags=re.DOTALL)

with open(html_file, 'w') as f:
    f.write(html)

print("Replaced names for indices 59-68.")
