import re
import os

files = [
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js',
    'binaural-assets/js/ui/controls_v3.js'
]

replacement = """
    // UI Highlighting Sync
    const btns = document.querySelectorAll('.cymatics-pattern-btn');
    btns.forEach(btn => {
        btn.classList.remove('ring-2', 'ring-blue-400', 'ring-purple-400', 'ring-emerald-400', 'ring-fuchsia-400', 'ring-white', 'scale-95');
    });
    
    const clickStr = `window.setCymaticPattern(${classId}, ${variationId})`;
    const activeBtn = Array.from(btns).find(btn => btn.getAttribute('onclick') === clickStr);
    if (activeBtn) {
        let ringColor = 'ring-white';
        if (classId === 19) ringColor = 'ring-purple-400';
        else if (classId === 22) ringColor = 'ring-emerald-400';
        else if (classId === 21) ringColor = 'ring-fuchsia-400';
        else if (classId === 20) ringColor = 'ring-blue-400';
        activeBtn.classList.add('ring-2', ringColor, 'scale-95');
    }
"""

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # We need to find the block:
        # const btns = document.querySelectorAll('.cymatics-pattern-btn');
        # btns.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-400', 'scale-95'));
        # 
        # const clickStr = `window.setCymaticPattern(${classId}, ${variationId})`;
        # const activeBtn = Array.from(btns).find(btn => btn.getAttribute('onclick') === clickStr);
        # if (activeBtn) {
        #     activeBtn.classList.add('ring-2', 'ring-blue-400', 'scale-95');
        # }
        
        pattern = re.compile(
            r'const btns = document.querySelectorAll\(\'\.cymatics-pattern-btn\'\);\s*'
            r'btns\.forEach\(btn => btn\.classList\.remove\(\'ring-2\', \'ring-blue-400\', \'scale-95\'\)\);\s*'
            r'const clickStr = `window\.setCymaticPattern\(\$\{classId\}, \$\{variationId\}\)`;\s*'
            r'const activeBtn = Array\.from\(btns\)\.find\(btn => btn\.getAttribute\(\'onclick\'\) === clickStr\);\s*'
            r'if \(activeBtn\) \{\s*'
            r'activeBtn\.classList\.add\(\'ring-2\', \'ring-blue-400\', \'scale-95\'\);\s*'
            r'\}'
            r'|'
            # Also handle if it's already slightly different or we need to match controls_v3 which might have it slightly different
            r'const btns = document\.querySelectorAll\(\'\.cymatics-pattern-btn\'\);[\s\S]*?activeBtn\.classList\.add\(\'ring-2\', \'ring-blue-400\', \'scale-95\'\);\s*\}'
        )
        
        new_content = pattern.sub(replacement.strip(), content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Patched {filepath}")
