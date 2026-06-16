import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    content = f.read()

# Append the intensity span to classes 20, 21, and 22
content = content.replace(
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(22, \'intensity\', this.value)" title="Intensity">',
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(22, \'intensity\', this.value)" title="Intensity"> <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-2">Intensity</span>'
)

content = content.replace(
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(21, \'intensity\', this.value)" title="Intensity">',
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(21, \'intensity\', this.value)" title="Intensity"> <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-2">Intensity</span>'
)

content = content.replace(
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(20, \'intensity\', this.value)" title="Intensity">',
    '<input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(20, \'intensity\', this.value)" title="Intensity"> <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-2">Intensity</span>'
)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(content)

print("Sliders fixed.")
