with open('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/js/visuals/CymaticsCore_v4.js', 'r') as f:
    code = f.read()

# Replace blendFactor logic in class 22
code = code.replace("float blendFactor = clamp(uIntensity * 0.85, 0.0, 1.0);", "float blendFactor = 0.85;")

# Fix Variation 3: vec3 finalColor = mix(texColor.rgb * 0.1, glowCol * 1.5, uIntensity);
code = code.replace("vec3 finalColor = mix(texColor.rgb * 0.1, glowCol * 1.5, uIntensity);", "vec3 finalColor = mix(texColor.rgb * 0.1, glowCol * 1.5, 0.85);")

with open('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/js/visuals/CymaticsCore_v4.js', 'w') as f:
    f.write(code)
print("Color decoupling applied.")
