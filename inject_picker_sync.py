import sys

with open('binaural-assets/js/ui/controls_v3.js', 'r', encoding='utf-8') as f:
    js = f.read()

target = '''            // Small delay to ensure initCymatics completes before setting pattern
            const applyPattern = () => {
                if (viz.cymaticMaterial && typeof viz.setCymaticPatternByIndex === 'function') {
                    viz.setCymaticPatternByIndex(idx);
                } else {
                    // Retry once after initialization
                    setTimeout(() => {
                        if (typeof viz.setCymaticPatternByIndex === 'function') {
                            viz.setCymaticPatternByIndex(idx);
                        }
                    }, 200);
                }
            };'''

replacement = '''            // Small delay to ensure initCymatics completes before setting pattern
            const applyPattern = () => {
                if (viz.cymaticMaterial && typeof viz.setCymaticPatternByIndex === 'function') {
                    viz.setCymaticPatternByIndex(idx);
                    updateCymaticPickers(viz, idx);
                } else {
                    // Retry once after initialization
                    setTimeout(() => {
                        if (typeof viz.setCymaticPatternByIndex === 'function') {
                            viz.setCymaticPatternByIndex(idx);
                            updateCymaticPickers(viz, idx);
                        }
                    }, 200);
                }
            };
            
            function updateCymaticPickers(visualizer, index) {
                if (visualizer && visualizer.constructor && visualizer.constructor.CYMATIC_PATTERNS) {
                    const p = visualizer.constructor.CYMATIC_PATTERNS[index];
                    if (p && p.palette && p.palette.length >= 3) {
                        const cp1 = document.getElementById('cymaticsCol1Picker');
                        const cp2 = document.getElementById('cymaticsCol2Picker');
                        const cp3 = document.getElementById('cymaticsCol3Picker');
                        
                        function rgbToHex(rgbStr) {
                            if (rgbStr.startsWith('#')) return rgbStr;
                            return "#ffffff"; // fallback
                        }
                        
                        if (cp1) cp1.value = rgbToHex(p.palette[0]);
                        if (cp2) cp2.value = rgbToHex(p.palette[1]);
                        if (cp3) cp3.value = rgbToHex(p.palette[2]);
                    }
                }
            }'''

if target in js:
    js = js.replace(target, replacement)
    with open('binaural-assets/js/ui/controls_v3.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("SUCCESS")
else:
    print("FAILED TO FIND TARGET BLOCK")
