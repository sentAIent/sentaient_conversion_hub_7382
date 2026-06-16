import re

with open('mindwave.html', 'r') as f:
    content = f.read()

# Remove the cymatics tab pill
content = re.sub(
    r'<div class="tab-pill active flex-1"[^>]*>Cymatics</div>',
    '',
    content
)

# Replace the active tab to visuals
content = re.sub(
    r'<div class="tab-pill flex-1" id="tour-visuals-tab" onclick="switchRightTab\(\'visuals\', this\)"',
    r'<div class="tab-pill active flex-1" id="tour-visuals-tab" onclick="switchRightTab(\'visuals\', this)"',
    content
)

# The injected cymatics UI from earlier is between `<div id="tab-active"` and the end of its div.
# We will find `<div id="tab-active"` and delete it and its contents entirely.
# The next tab is `<!-- TAB: VISUALS -->`
start_marker = '<div id="tab-active" class="tab-panel active space-y-6">'
start_idx = content.find(start_marker)

if start_idx != -1:
    next_tab_idx = content.find('<!-- TAB: VISUALS -->', start_idx)
    if next_tab_idx != -1:
        # We also want to remove the '<!-- TAB: CYMATICS' comment above it
        comment_idx = content.rfind('<!-- TAB: CYMATICS', 0, start_idx)
        if comment_idx != -1 and (start_idx - comment_idx) < 100:
            content = content[:comment_idx] + content[next_tab_idx:]
        else:
            content = content[:start_idx] + content[next_tab_idx:]

# Ensure tab-visuals is active now
content = content.replace('id="tour-visuals" class="tab-panel hidden space-y-6"', 'id="tour-visuals" class="tab-panel active space-y-6"')

with open('mindwave.html', 'w') as f:
    f.write(content)

print("Cymatics HTML removed.")
