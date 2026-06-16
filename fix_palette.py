import sys

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r', encoding='utf-8') as f:
    js = f.read()

target = '''        // Pass Advanced Geometry Parameters for Level 3 and Level 4
        if (u.uFractalType) u.uFractalType.value = (data.fractalType !== undefined) ? data.fractalType : 1.0;
        if (u.uFluidity) u.uFluidity.value = (data.fluidity !== undefined) ? data.fluidity : 0.5;'''

replacement = '''        // Pass Advanced Geometry Parameters for Level 3 and Level 4
        if (u.uFractalType) u.uFractalType.value = (data.fractalType !== undefined) ? data.fractalType : 1.0;
        if (u.uFluidity) u.uFluidity.value = (data.fluidity !== undefined) ? data.fluidity : 0.5;
        
        // Pass Default Palette Colors
        if (data.palette && data.palette.length >= 3) {
            if (u.uCymaticCol1) u.uCymaticCol1.value.set(data.palette[0]);
            if (u.uCymaticCol2) u.uCymaticCol2.value.set(data.palette[1]);
            if (u.uCymaticCol3) u.uCymaticCol3.value.set(data.palette[2]);
            if (data.palette.length >= 4 && u.uCymaticCol4) {
                u.uCymaticCol4.value.set(data.palette[3]);
            }
        }'''

if target in js:
    js = js.replace(target, replacement)
    with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("SUCCESS: Fixed palette uniform mapping.")
else:
    print("FAILED TO FIND TARGET BLOCK")
