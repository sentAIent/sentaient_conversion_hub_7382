import sys

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r', encoding='utf-8') as f:
    js = f.read()

target = '''            { name: "Infinity Loop", n: 6, m: 2, type: 0, cat: "complex", palette: ["#00aaff", "#ff0055", "#55ff00", "#ffffff"] },
            { name: "Quantum Knot", n: 16, m: 4, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.8, palette: ["#19c8e6", "#e633cc", "#ffe633", "#00ffcc"] },'''

replacement = '''            { name: "Infinity Loop", n: 6, m: 2, type: 0, cat: "complex", palette: ["#00aaff", "#ff0055", "#55ff00", "#ffffff"] },
            // --- LEVEL 2: Advanced Cymatics (type: 1) ---
            { name: "Polygon", n: 3, m: 3, type: 1, cat: "organic", palette: ["#ff00ff", "#00ffff", "#ffff00", "#ffffff"] },
            { name: "Singularity", n: 5, m: 5, type: 1, cat: "organic", palette: ["#00ffaa", "#ff00aa", "#aaff00", "#ffffff"] },
            { name: "Aura Genesis", n: 7, m: 7, type: 1, cat: "organic", palette: ["#ff5500", "#0055ff", "#55ff00", "#ffffff"] },
            { name: "Void Matrix", n: 9, m: 9, type: 1, cat: "organic", palette: ["#aa00ff", "#ffaa00", "#00aaff", "#ffffff"] },
            { name: "Stellar Nexus", n: 11, m: 11, type: 1, cat: "organic", palette: ["#00aaff", "#ff0055", "#55ff00", "#ffffff"] },
            { name: "Crystalline Pulse", n: 13, m: 13, type: 1, cat: "organic", palette: ["#19c8e6", "#e633cc", "#ffe633", "#ffffff"] },
            // --- LEVEL 3: Quantum Cymatics (type: 8) ---
            { name: "Quantum Knot", n: 16, m: 4, type: 8, cat: "quantum", fractalType: 1.0, fluidity: 0.8, palette: ["#19c8e6", "#e633cc", "#ffe633", "#00ffcc"] },'''

if target in js:
    js = js.replace(target, replacement)
    with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("SUCCESS: Inserted Level 2 into CYMATIC_PATTERNS.")
else:
    print("FAILED TO FIND TARGET BLOCK")
