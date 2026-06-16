import re

file_path = 'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js'

with open(file_path, 'r') as file:
    content = file.read()

# 1. CYMATIC_PATTERNS
if 'Visualizer3D.CYMATIC_PATTERNS' not in content:
    cymatic_patterns_code = """
Visualizer3D.CYMATIC_PATTERNS = [
    { classId: 22, variationId: 0, name: "Fundamental Zenith", style: "fractal" },
    { classId: 22, variationId: 1, name: "Quantum Flower", style: "sacred" },
    { classId: 22, variationId: 2, name: "Sacred Sun Resonance", style: "complex" },
    { classId: 22, variationId: 3, name: "Ethereal Nexus", style: "geometry" },
    { classId: 22, variationId: 4, name: "Golden Ratio Spiral", style: "fractal" },
    { classId: 22, variationId: 5, name: "Obsidian Bloom", style: "sacred" },
    { classId: 22, variationId: 6, name: "Prismatic Core", style: "complex" },
    { classId: 22, variationId: 7, name: "Void Resonance", style: "geometry" },
    { classId: 22, variationId: 8, name: "Nebula Plasma", style: "fractal" },
    { classId: 22, variationId: 9, name: "Sacred Gold Obsidian", style: "sacred" },
    { classId: 22, variationId: 10, name: "Biolum Abyssal", style: "complex" },
    { classId: 22, variationId: 11, name: "Emerald Cyber Matrix", style: "geometry" },
    { classId: 22, variationId: 12, name: "Liquid Mercury Crimson", style: "fractal" },
    { classId: 22, variationId: 13, name: "Quantum Crystal Lattice", style: "sacred" },
    { classId: 22, variationId: 14, name: "Solar Flare Harmonics", style: "complex" },
    { classId: 22, variationId: 15, name: "Amethyst Hyperdimensional", style: "geometry" },
    { classId: 22, variationId: 16, name: "Neon Labyrinth", style: "fractal" },
    { classId: 22, variationId: 17, name: "Celestial Mandala", style: "sacred" },
    { classId: 22, variationId: 18, name: "Astral Lotus", style: "complex" },
    { classId: 22, variationId: 19, name: "Lunar Tides", style: "geometry" },
    { classId: 22, variationId: 20, name: "Cybernetic Lotus", style: "fractal" },
    { classId: 22, variationId: 21, name: "Bioluminescent Shroom", style: "sacred" },
    { classId: 22, variationId: 22, name: "Vortex of Time", style: "complex" },
    { classId: 22, variationId: 23, name: "Diamond Lattice", style: "geometry" },
    { classId: 22, variationId: 24, name: "Seraphim Wings", style: "fractal" },
    { classId: 22, variationId: 25, name: "Fractal Heart", style: "sacred" },
    { classId: 22, variationId: 26, name: "Particle Swarm", style: "complex" },
    { classId: 22, variationId: 27, name: "Fluid SDF", style: "geometry" },
    { classId: 22, variationId: 28, name: "Quantum Topology", style: "fractal" },
    { classId: 22, variationId: 29, name: "Ai Cymatic 15", style: "sacred" }
];
"""
    # Insert it right after export class Visualizer3D {
    content = content.replace("export class Visualizer3D {\n", "export class Visualizer3D {\n" + cymatic_patterns_code)

# 2. applyCymaticClassAndVariation
apply_patch = """    applyCymaticClassAndVariation(classId, variationId) {
        if (!this.cymaticsCore) return;
        
        const pattern = Visualizer3D.CYMATIC_PATTERNS.find(
            p => p.classId === classId && p.variationId === variationId
        );
        
        if (pattern) {
            this.applyCymatic(pattern);
            this.lastCymaticRotation = performance.now();
        } else {
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
content = content.replace("    applyCymatic(data) {", apply_patch)

# 3. Memory leak dispose()
dispose_patch = """    dispose() {
        this.active = false;
        if (state.animationId) { cancelAnimationFrame(state.animationId); state.animationId = null; }

        if (this._boundResize) window.removeEventListener('resize', this._boundResize);
        if (this._boundResizeOverlayCanvas) window.removeEventListener('resize', this._boundResizeOverlayCanvas);
        window.removeEventListener('mindwave:layout-change', this.handleLayoutChange);
        if (this._boundSafeMode) window.removeEventListener('mindwave:safe-mode-start', this._boundSafeMode);
        if (this._boundVisibilityChange) document.removeEventListener('visibilitychange', this._boundVisibilityChange);

        const safeDispose = (group) => {"""
content = re.sub(r"    dispose\(\) \{[\s\S]*?const safeDispose = \(group\) => \{", dispose_patch, content, count=1)

# 4. API Bridges
# Replace setCymaticColor to the END of setCymaticParam cleanly
# Let's find exactly where setCymaticColor begins and where setCymaticParam ends
start_idx = content.find("    setCymaticColor(hex) {")
end_idx = content.find("    setCyberColor(hex) {")

if start_idx != -1 and end_idx != -1:
    api_patch = """    setCymaticColor(hex, forceClassId=null, forceColorIndex=1) {
        if (!this.cymaticsCore) return;
        let colorIndex = forceColorIndex;
        let classId = forceClassId;
        if (typeof hex === 'string' && forceClassId === null) {
            classId = this.currentCymaticData ? (this.currentCymaticData.classId || 1) : 1;
        } else if (typeof forceClassId === 'number') {
            classId = arguments[0];
            colorIndex = arguments[1];
            hex = arguments[2];
        }
        this.cymaticsCore.setColor(classId, colorIndex, new THREE.Color(hex));
    }

    setCymaticColor2(hex) {
        if (!this.cymaticsCore) return;
        const classId = this.currentCymaticData ? (this.currentCymaticData.classId || 1) : 1;
        this.cymaticsCore.setColor(classId, 2, new THREE.Color(hex));
    }

    setCymaticColor3(hex) {}

    setCymaticParam(classId, paramName, value) {
        if (!this.cymaticsCore) return;
        if (typeof classId === 'string') {
            const actualParamName = classId;
            const actualValue = paramName;
            const actualClassId = this.currentCymaticData ? (this.currentCymaticData.classId || 1) : 1;
            this.cymaticsCore.setParam(actualClassId, actualParamName, actualValue);
            return;
        }
        this.cymaticsCore.setParam(classId, paramName, value);
    }

"""
    content = content[:start_idx] + api_patch + content[end_idx:]

with open(file_path, 'w') as file:
    file.write(content)

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC_RESTORED_GOLD.js', 'w') as file:
    file.write(content)

print("Mega patch complete.")
