import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    content = f.read()

# Fix Class 17 and 18 Intensity slider labels
content = content.replace(
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(17, \'intensity\', this.value)" title="Intensity">',
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(17, \'intensity\', this.value)" title="Intensity"> <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-2">Intensity</span>'
)

content = content.replace(
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(18, \'intensity\', this.value)" title="Intensity">',
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(18, \'intensity\', this.value)" title="Intensity"> <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-2">Intensity</span>'
)

# And check for Class 19? Wait, there is no Class 19 in my regex output above! Let's just fix 17 and 18.

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(content)

print("Class 17 and 18 sliders fixed.")
