import re

files = [
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js',
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC_RESTORED_GOLD.js'
]

patch_code = """    dispose() {
        this.active = false;
        if (state.animationId) { cancelAnimationFrame(state.animationId); state.animationId = null; }

        // Remove event listeners to prevent memory leaks
        if (this._boundResize) window.removeEventListener('resize', this._boundResize);
        if (this._boundResizeOverlayCanvas) window.removeEventListener('resize', this._boundResizeOverlayCanvas);
        window.removeEventListener('mindwave:layout-change', this.handleLayoutChange);
        if (this._boundSafeMode) window.removeEventListener('mindwave:safe-mode-start', this._boundSafeMode);
        if (this._boundVisibilityChange) document.removeEventListener('visibilitychange', this._boundVisibilityChange);

        const safeDispose = (group) => {
            if (!group) return;
            while (group.children.length > 0) {
                const child = group.children[0];
                group.remove(child);
                child.traverse((c) => {
                    if (c.geometry) c.geometry.dispose();
                    if (c.material) {
                        if (c.material.map) c.material.map.dispose();
                        if (c.material.uniforms) {
                            for (const key in c.material.uniforms) {
                                if (c.material.uniforms[key] && c.material.uniforms[key].value && c.material.uniforms[key].value.dispose) {
                                    c.material.uniforms[key].value.dispose();
                                }
                            }
                        }
                        c.material.dispose();
                    }
                });
            }
        };"""

for f in files:
    try:
        with open(f, 'r') as file:
            content = file.read()
            
        # We need to replace the dispose method start
        pattern = r"    dispose\(\) \{[\s\S]*?const safeDispose = \(group\) => \{[\s\S]*?\}\n        \};\n"
        content = re.sub(pattern, patch_code + "\n", content, count=1)
        
        with open(f, 'w') as file:
            file.write(content)
        print(f"Patched dispose in {f}")
    except Exception as e:
        print(f"Failed {f}: {e}")
