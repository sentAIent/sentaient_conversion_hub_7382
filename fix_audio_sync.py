import re

# Update controls_v3.js
with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/ui/controls_v3.js', 'r') as f:
    js = f.read()

if 'window.toggleAudioSync' not in js:
    # insert it right after toggleMouseSync
    new_func = '''
window.toggleAudioSync = function(isSync) {
    console.log(`[Cymatics] Toggle Audio Sync: ${isSync}`);
    window.cymaticsAudioSync = isSync ? 1.0 : 0.0;
    
    // Dispatch event to inform CymaticsCore to update uniforms
    window.dispatchEvent(new CustomEvent('cymaticsToggleAudioSync', {
        detail: { sync: window.cymaticsAudioSync }
    }));
}
'''
    js = js.replace('window.toggleMouseSync = function(isSync) {', new_func + '\nwindow.toggleMouseSync = function(isSync) {')
    with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/ui/controls_v3.js', 'w') as f:
        f.write(js)
    print("Updated controls_v3.js")

# Update CymaticsCore.js
with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/visuals/CymaticsCore.js', 'r') as f:
    core = f.read()

old_audio_update = '''            if (audioData) {
                this.materials[this.activeClassId].uniforms.uAudioLow.value = audioData.bass || 0;
                this.materials[this.activeClassId].uniforms.uAudioMid.value = audioData.mids || 0;
                this.materials[this.activeClassId].uniforms.uAudioHigh.value = audioData.highs || 0;
            }'''

new_audio_update = '''            if (audioData) {
                let audioSync = (window.cymaticsAudioSync !== undefined) ? window.cymaticsAudioSync : 1.0;
                this.materials[this.activeClassId].uniforms.uAudioLow.value = (audioData.bass || 0) * audioSync;
                this.materials[this.activeClassId].uniforms.uAudioMid.value = (audioData.mids || 0) * audioSync;
                this.materials[this.activeClassId].uniforms.uAudioHigh.value = (audioData.highs || 0) * audioSync;
            }'''

if old_audio_update in core:
    core = core.replace(old_audio_update, new_audio_update)
    with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/visuals/CymaticsCore.js', 'w') as f:
        f.write(core)
    print("Updated CymaticsCore.js")

