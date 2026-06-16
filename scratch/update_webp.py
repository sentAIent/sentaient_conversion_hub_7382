import re

filepath = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/binaural-assets/js/visuals/CymaticsCore.js'

with open(filepath, 'r') as f:
    content = f.read()

# Replace any png file in the constellations directory with webp
new_content = re.sub(r'(binaural-assets/images/cymatics/constellations/.*?)\.png', r'\1.webp', content)

with open(filepath, 'w') as f:
    f.write(new_content)
    
print("Successfully replaced .png with .webp in CymaticsCore.js")
