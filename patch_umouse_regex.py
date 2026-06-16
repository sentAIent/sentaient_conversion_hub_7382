import os

files = [
    'binaural-assets/js/visuals/CymaticsCore.js',
    'public/binaural-assets/js/visuals/CymaticsCore.js'
]

orig = """            // Universal Mouse Sync Injection
            if (!injectedShader.includes('uniform float uMouseSync;')) {
                let injectStr = '';
                if (!injectedShader.includes('uniform vec2 uMouse;')) {
                    injectStr += 'uniform vec2 uMouse;\\n        ';
                }
                injectStr += 'uniform float uMouseSync;\\n        void main() {';
                
                injectedShader = injectedShader.replace(
                    'void main() {', 
                    injectStr
                );
            }"""

replacement = """            // Universal Mouse Sync Injection
            if (!injectedShader.includes('uniform float uMouseSync;')) {
                let injectStr = '';
                if (!/uniform\\s+vec2\\s+uMouse\\s*;/.test(injectedShader)) {
                    injectStr += 'uniform vec2 uMouse;\\n        ';
                }
                injectStr += 'uniform float uMouseSync;\\n        void main() {';
                
                injectedShader = injectedShader.replace(
                    'void main() {', 
                    injectStr
                );
            }"""

for fpath in files:
    if os.path.exists(fpath):
        with open(fpath, 'r') as f:
            content = f.read()
        
        if orig in content:
            content = content.replace(orig, replacement)
            with open(fpath, 'w') as f:
                f.write(content)
            print(f"Patched {fpath}")
        else:
            print(f"Could not find original block in {fpath}")
