import re

with open('mindwave_final.html', 'r', encoding='utf-8') as f:
    source_html = f.read()

with open('mindwave.html', 'r', encoding='utf-8') as f:
    target_html = f.read()

# Extract from source
source_pattern = re.compile(r'(<!-- TAB: CYMATICS -->.*?)(<!-- TAB: STUDIO -->)', re.DOTALL)
source_match = source_pattern.search(source_html)

if source_match:
    cymatics_block = source_match.group(1)
    
    # Replace in target
    target_html = source_pattern.sub(cymatics_block + r'\2', target_html)
    
    with open('mindwave.html', 'w', encoding='utf-8') as f:
        f.write(target_html)
    print("Successfully patched mindwave.html with cymatics tab from mindwave_final.html")
else:
    print("Could not find TAB: CYMATICS in mindwave_final.html")
