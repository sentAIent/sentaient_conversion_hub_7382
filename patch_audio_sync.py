import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    content = f.read()

old_code = '''const audioData = { bass: normBass, mids: normMids, highs: normHighs };'''
new_code = '''const isAudioSync = window.cymaticsAudioSync !== false;
                const audioData = isAudioSync ? { bass: normBass, mids: normMids, highs: normHighs } : { bass: 0, mids: 0, highs: 0 };'''

content = content.replace(old_code, new_code)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w') as f:
    f.write(content)
