import re

# 1. Fix controls_v3.js (Stop all cymatics logic)
controls_path = "binaural-assets/js/ui/controls_v3.js"
with open(controls_path, "r") as f:
    controls = f.read()

# Replace the handler for stopAllCymaticsBtn
old_handler = """            if (viz) {
                viz.activeModes.delete('cymatics');
                viz.updateVisibility();"""
new_handler = """            if (viz) {
                viz.activeModes.delete('cymatics');
                if (viz.activeModes.size === 0) {
                    // Fallback to particles so the screen doesn't just go black
                    if (window.setVisualMode) window.setVisualMode('particles', null, true);
                    else {
                        viz.activeModes.add('particles');
                        viz.updateVisibility();
                    }
                } else {
                    viz.updateVisibility();
                }"""

if old_handler in controls:
    controls = controls.replace(old_handler, new_handler)
    with open(controls_path, "w") as f:
        f.write(controls)
    print("Patched controls_v3.js")
else:
    print("Could not find old_handler in controls_v3.js")

# 2. Fix visualizer_v4.js (Tsunami camera/position issue)
viz_path = "binaural-assets/js/visuals/visualizer_v4.js"
with open(viz_path, "r") as f:
    viz = f.read()

# Adjust the tsunami mesh position
# mesh.position.y = -10; // floor level
# mesh.position.z = -50; // pushed back so the huge wave is visible
old_pos = """        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -10; // floor level
        mesh.position.z = -50; // pushed back so the huge wave is visible"""
new_pos = """        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -15; // floor level
        mesh.position.z = -120; // pushed back so the camera isn't inside it
        
        // Also adjust the wave peak to be more centered in the frustum
        // (Handled in shader by waveX = pos.x)"""

if old_pos in viz:
    viz = viz.replace(old_pos, new_pos)
    
    # Let's also adjust the waveX calculation to be centered
    old_waveX = "float waveX = pos.x - 10.0;"
    new_waveX = "float waveX = pos.x;"
    viz = viz.replace(old_waveX, new_waveX)
    
    with open(viz_path, "w") as f:
        f.write(viz)
    print("Patched visualizer_v4.js")
else:
    print("Could not find old_pos in visualizer_v4.js")

