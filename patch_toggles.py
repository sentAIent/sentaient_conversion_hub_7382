import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    content = f.read()

# Replace tiny dots with perfectly sized w-3 h-3 dots
content = content.replace(
    '<div class="dot absolute left-1 top-1 bg-gray-500 w-2 h-2 rounded-full transition-transform duration-300"></div>',
    '<div class="dot absolute left-1 top-0.5 bg-gray-400 w-3 h-3 rounded-full transition-transform duration-300 shadow-md"></div>'
)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(content)
