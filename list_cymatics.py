import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    content = f.read()

classes = re.findall(r'<div class="cymatics-class-container[^>]*>(.*?)</div>\s*</div>(?=\s*<div class="cymatics-class-container|<div id="tab-controls)', content, re.DOTALL)

if not classes:
    # Try a simpler split
    classes = content.split('<div class="cymatics-class-container')

print("EXTRACTED CYMATICS:")
for c in classes[1:]:
    header_match = re.search(r'<h4[^>]*>([^<]+)</h4>', c)
    if header_match:
        print(f"\n{header_match.group(1).strip()}")
    
    # Extract labels from buttons
    buttons = re.findall(r'<button class="cymatics-pattern-btn[^>]*>(.*?)</button>', c, re.DOTALL)
    for b in buttons:
        label_match = re.search(r'<div class="absolute bottom-[^>]*>([^<]+)</div>', b)
        if label_match:
            print(f"  - {label_match.group(1).strip()}")

