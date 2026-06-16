import re

files = [
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js',
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC_RESTORED_GOLD.js'
]

for f in files:
    try:
        with open(f, 'r') as file:
            content = file.read()
            
        content = content.replace("Visualizer3D.CYMATIC_PATTERNS = [", "static CYMATIC_PATTERNS = [")
        
        with open(f, 'w') as file:
            file.write(content)
        print(f"Fixed static syntax in {f}")
    except Exception as e:
        print(f"Failed {f}: {e}")
