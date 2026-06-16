import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/ui/controls_v3.js', 'r') as f:
    content = f.read()

# Add window.toggleAudioSync
if 'window.toggleAudioSync =' not in content:
    old_code = '''window.toggleMouseSync = function(isSync) {
    window.cymaticsMouseSync = isSync ? 1.0 : 0.0;
    window.dispatchEvent(new CustomEvent('cymaticsToggleMouseSync', {
        detail: { sync: window.cymaticsMouseSync }
    }));
};'''

    new_code = old_code + '''

window.toggleAudioSync = function(isSync) {
    window.cymaticsAudioSync = isSync;
    // Dispatch event just in case any other system wants to listen, though visualizer polls the variable directly
    window.dispatchEvent(new CustomEvent('cymaticsToggleAudioSync', {
        detail: { sync: window.cymaticsAudioSync }
    }));
};'''

    content = content.replace(old_code, new_code)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/ui/controls_v3.js', 'w') as f:
    f.write(content)
