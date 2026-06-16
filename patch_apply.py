import re

files = [
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js',
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC_RESTORED_GOLD.js'
]

patch_code = """    applyCymaticClassAndVariation(classId, variationId) {
        if (!this.cymaticsCore) return;
        
        // Find matching pattern in CYMATIC_PATTERNS
        const pattern = Visualizer3D.CYMATIC_PATTERNS.find(
            p => p.classId === classId && p.variationId === variationId
        );
        
        if (pattern) {
            this.applyCymatic(pattern);
            this.lastCymaticRotation = performance.now();
        } else {
            // Fallback for custom combos
            this.currentCymaticData = { name: "Custom Resonance", classId, variationId };
            this.cymaticsCore.setPattern(classId, variationId);
            
            const label = document.getElementById('cymaticPatternLabel');
            if (label) {
                label.textContent = "Custom Resonance";
                label.style.textShadow = '0 0 15px rgba(180, 120, 255, 1)';
                setTimeout(() => {
                    label.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.3)';
                }, 300);
            }
        }
    }

    applyCymatic(data) {"""

for f in files:
    try:
        with open(f, 'r') as file:
            content = file.read()
        
        if 'applyCymaticClassAndVariation(' in content:
            print(f"Already patched {f}")
            continue
            
        content = content.replace('    applyCymatic(data) {', patch_code)
        
        with open(f, 'w') as file:
            file.write(content)
        print(f"Patched {f}")
    except Exception as e:
        print(f"Failed {f}: {e}")
