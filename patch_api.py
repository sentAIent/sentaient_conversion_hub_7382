import re

files = [
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js',
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC_RESTORED_GOLD.js'
]

patch_code = """    // Adapt the UI color picker calls to the new CymaticsCore API
    setCymaticColor(hex, forceClassId=null, forceColorIndex=1) {
        if (!this.cymaticsCore) return;
        
        // If called with single argument from controls_v3.js (cymaticsCol1Picker)
        let colorIndex = forceColorIndex;
        let classId = forceClassId;
        
        if (typeof hex === 'string' && forceClassId === null) {
            classId = this.currentCymaticData ? (this.currentCymaticData.classId || 1) : 1;
        } else if (typeof forceClassId === 'number') {
            // Direct call from internal code (classId, colorIndex, hex)
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

    setCymaticColor3(hex) {
        // Reserved for future 3-color shaders
    }

    setCymaticParam(classId, paramName, value) {
        if (!this.cymaticsCore) return;
        // If single string paramName is passed (from controls_v3), adapt it:
        if (typeof classId === 'string') {
            const actualParamName = classId;
            const actualValue = paramName;
            const actualClassId = this.currentCymaticData ? (this.currentCymaticData.classId || 1) : 1;
            this.cymaticsCore.setParam(actualClassId, actualParamName, actualValue);
            return;
        }
        this.cymaticsCore.setParam(classId, paramName, value);
    }"""

for f in files:
    try:
        with open(f, 'r') as file:
            content = file.read()
            
        # find where to inject it
        pattern = r"    setCymaticColor\(hex\) \{[\s\S]*?    setCymaticParam\(param, value\) \{[\s\S]*?        \}\n    \}"
        
        # Or just regex it based on the old signatures:
        if 'setCymaticColor2' in content:
            continue
            
        content = re.sub(r"    setCymaticColor\(hex\) \{[\s\S]*?    \}", "", content)
        content = re.sub(r"    setCymaticParam\(param, value\) \{[\s\S]*?    \}", patch_code, content)
        
        with open(f, 'w') as file:
            file.write(content)
        print(f"Patched API in {f}")
    except Exception as e:
        print(f"Failed {f}: {e}")
