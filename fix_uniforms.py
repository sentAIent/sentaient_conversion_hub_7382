import sys

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r', encoding='utf-8') as f:
    js = f.read()

target = '''        u.uN.value = data.n;
        u.uM.value = data.m;
        
        // Map category to pattern type
        // Type is ALWAYS explicit. Default: 0 (simple Chladni standing wave).
        // The 'cat' field is organizational only — it does NOT route to shader type.
        u.uType.value = (data.type !== undefined) ? data.type : 0.0;

        u.uEnergy.value = data.energy || 0.5;'''

replacement = '''        u.uN.value = data.n;
        u.uM.value = data.m;
        
        // Map category to pattern type
        // Type is ALWAYS explicit. Default: 0 (simple Chladni standing wave).
        // The 'cat' field is organizational only — it does NOT route to shader type.
        u.uType.value = (data.type !== undefined) ? data.type : 0.0;

        u.uEnergy.value = data.energy || 0.5;
        
        // Pass Advanced Geometry Parameters for Level 3 and Level 4
        if (u.uFractalType) u.uFractalType.value = (data.fractalType !== undefined) ? data.fractalType : 1.0;
        if (u.uFluidity) u.uFluidity.value = (data.fluidity !== undefined) ? data.fluidity : 0.5;'''

if target in js:
    js = js.replace(target, replacement)
    with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("SUCCESS: Fixed uFractalType and uFluidity uniform mapping.")
else:
    print("FAILED TO FIND TARGET BLOCK")
