import sys

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r', encoding='utf-8') as f:
    js = f.read()

target = '''    setCymaticColor(hex) {
        this.currentCymaticColor = hex;
        
        // Sync UI if helper available
        if (window.renderCymaticProPatterns) {
            window.renderCymaticProPatterns();
        }

        if (this.cymaticMaterial)
            this.cymaticMaterial.uniforms.uColor.value.set(hex);
    }'''

replacement = '''    setCymaticColor(hex) {
        this.currentCymaticColor = hex;
        
        // Sync UI if helper available
        if (window.renderCymaticProPatterns) {
            window.renderCymaticProPatterns();
        }

        if (this.cymaticMaterial) {
            this.cymaticMaterial.uniforms.uColor.value.set(hex);
            if (this.cymaticMaterial.uniforms.uCymaticCol1) {
                this.cymaticMaterial.uniforms.uCymaticCol1.value.set(hex);
            }
        }
    }

    setCymaticColor2(hex) {
        if (this.cymaticMaterial && this.cymaticMaterial.uniforms.uCymaticCol2) {
            this.cymaticMaterial.uniforms.uCymaticCol2.value.set(hex);
        }
    }

    setCymaticColor3(hex) {
        if (this.cymaticMaterial && this.cymaticMaterial.uniforms.uCymaticCol3) {
            this.cymaticMaterial.uniforms.uCymaticCol3.value.set(hex);
        }
    }'''

if target in js:
    js = js.replace(target, replacement)
    with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("SUCCESS")
else:
    print("FAILED TO FIND TARGET BLOCK")
