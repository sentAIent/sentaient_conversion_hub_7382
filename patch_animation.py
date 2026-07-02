import re

js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

# Replace in initTsunami
js = js.replace(
    'uTime: { value: 0 },',
    'uTime: { value: 0 },\n            uLoopTime: { value: 0.0 },'
)

js = js.replace(
    'uniform float uLoopActive;',
    'uniform float uLoopActive;\n            uniform float uLoopTime;'
)

# Fix the vertex shader animation logic
old_anim_logic = """                if (uLoopActive > 0.5) {
                    float progress = clamp(uTime / 12.0, 0.0, 1.0);
                    float ease = 1.0 - pow(1.0 - progress, 3.0);
                    activeCurl = mix(0.0, targetCurl, ease);
                    activeAmp = mix(uAmplitude * 0.4, uAmplitude, ease);
                }"""

new_anim_logic = """                if (uLoopActive > 0.5) {
                    float totalDur = 12.0;
                    float progress = clamp(uLoopTime / totalDur, 0.0, 1.0);
                    float ampProgress = clamp(progress * 2.0, 0.0, 1.0);
                    float curlProgress = clamp((progress - 0.5) * 2.0, 0.0, 1.0);
                    
                    float ampEase = 1.0 - pow(1.0 - ampProgress, 3.0);
                    float curlEase = 1.0 - pow(1.0 - curlProgress, 3.0);
                    
                    activeAmp = mix(uAmplitude * 0.1, uAmplitude, ampEase);
                    activeCurl = mix(0.0, targetCurl, curlEase);
                }"""
js = js.replace(old_anim_logic, new_anim_logic)

with open(js_file, "w") as f:
    f.write(js)
print("Patched shader")
