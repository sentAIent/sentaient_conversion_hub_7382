import re
import os

def clean_controls():
    path = 'binaural-assets/js/ui/controls_v3.js'
    with open(path, 'r') as f:
        c = f.read()
    
    # Remove window.toggleCymaticsPanel
    c = re.sub(r'window\.toggleCymaticsPanel = function\(\) \{.*?\n    \};\n', '', c, flags=re.DOTALL)
    # Remove window.setCymaticMedium
    c = re.sub(r'window\.setCymaticMedium = function\(mediumIdx\) \{.*?\n    \};\n', '', c, flags=re.DOTALL)
    # Remove window.selectCymaticPattern
    c = re.sub(r'window\.selectCymaticPattern = function\(idx\) \{.*?\n    \};\n', '', c, flags=re.DOTALL)
    # Remove cymatics panel toggle logic
    c = re.sub(r'const cymaticsPanel = document\.getElementById\(\'cymaticsPanel\'\);\s*if \(cymaticsPanel\).*?\n        }', '', c, flags=re.DOTALL)
    # Remove cymatics setting from beat slider
    c = re.sub(r'// Sync binaural beat Hz to cymatics shader\s*if \(viz\?\.setCymaticFreq\) viz\.setCymaticFreq\(parseFloat\(els\.beatSlider\.value\)\);', '', c, flags=re.DOTALL)
    # Remove ice medium auto-set
    c = re.sub(r'if \(window\.setCymaticMedium\) window\.setCymaticMedium\(3\); // Auto-set to ICE medium', '', c, flags=re.DOTALL)
    
    with open(path, 'w') as f:
        f.write(c)

def clean_persistence():
    path = 'binaural-assets/js/services/persistence.js'
    if os.path.exists(path):
        with open(path, 'r') as f:
            c = f.read()
        # Remove renderCymaticProPatterns
        c = re.sub(r'export function renderCymaticProPatterns\(\) \{.*?\n\}\n?', '', c, flags=re.DOTALL)
        with open(path, 'w') as f:
            f.write(c)

def clean_visualizer():
    path = 'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js'
    with open(path, 'r') as f:
        c = f.read()
    
    # Remove cymatics methods inside Visualizer class
    c = re.sub(r'    initCymatics\(\) \{.*?\n    \}', '', c, flags=re.DOTALL)
    c = re.sub(r'    setCymaticPatternByIndex\(idx\) \{\}', '', c)
    c = re.sub(r'    setCymaticIntensity\(val\) \{\}', '', c)
    c = re.sub(r'    setCymaticHarmonics\(val\) \{\}', '', c)
    c = re.sub(r'    setCymaticColor[23]?\(hex\) \{\}', '', c)
    c = re.sub(r'    setCymaticFreq\(hz\) \{\}', '', c)
    c = re.sub(r'    setCymaticTimer\(seconds\) \{\}', '', c)
    c = re.sub(r'    applyCymatic\(p\) \{\}', '', c)
    c = re.sub(r'    nextCymatic\(\) \{\}', '', c)
    c = re.sub(r'    prevCymatic\(\) \{\}', '', c)
    c = re.sub(r'    static get CYMATIC_PATTERNS\(\) \{ return \[\]; \}', '', c)
    
    with open(path, 'w') as f:
        f.write(c)

clean_controls()
clean_persistence()
clean_visualizer()
print("Deep clean completed")
