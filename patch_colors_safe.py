import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/visuals/CymaticsCore.js', 'r') as f:
    content = f.read()

# Pattern for Variation 0
content = re.sub(
    r'vec3 baseTint = mix\(activeColor1, activeColor2, luma\);\n\s*vec3 tintedTex = mix\(texColor\.rgb, baseTint \* luma \* 2\.5, uIntensity \* 0\.85\);\n\s*vec3 finalColor = tintedTex \* \(1\.0 \- depletion \* 0\.5 \* uIntensity\);',
    r'vec3 baseTint = mix(activeColor1, activeColor2, luma);\n            vec3 targetColor = baseTint * (luma * 2.5);\n            float blendFactor = clamp(uIntensity * 0.85, 0.0, 1.0);\n            vec3 tintedTex = mix(texColor.rgb, targetColor, blendFactor);\n            vec3 finalColor = tintedTex * max(0.0, 1.0 - depletion * 0.5 * uIntensity);',
    content
)

# Pattern for Variation 1
content = re.sub(
    r'vec3 baseTint = mix\(activeColor1, activeColor2, luma\);\n\s*vec3 tintedTex = mix\(texColor\.rgb, baseTint \* luma \* 2\.5, uIntensity \* 0\.85\);\n\s*vec3 finalColor = tintedTex \* \(1\.0 \+ fluidAccumulation \* 1\.5 \* uIntensity\);',
    r'vec3 baseTint = mix(activeColor1, activeColor2, luma);\n            vec3 targetColor = baseTint * (luma * 2.5);\n            float blendFactor = clamp(uIntensity * 0.85, 0.0, 1.0);\n            vec3 tintedTex = mix(texColor.rgb, targetColor, blendFactor);\n            vec3 finalColor = tintedTex * max(0.0, 1.0 + fluidAccumulation * 1.5 * uIntensity);',
    content
)

# Pattern for Variation 2
content = re.sub(
    r'vec3 baseTint = mix\(activeColor1, activeColor2, luma\);\n\s*vec3 tintedTex = mix\(texColor\.rgb, baseTint \* luma \* 2\.5, uIntensity \* 0\.85\);\n\s*vec3 finalColor = tintedTex \* \(1\.0 \- swarmDepletion \* 0\.6 \* uIntensity\);',
    r'vec3 baseTint = mix(activeColor1, activeColor2, luma);\n            vec3 targetColor = baseTint * (luma * 2.5);\n            float blendFactor = clamp(uIntensity * 0.85, 0.0, 1.0);\n            vec3 tintedTex = mix(texColor.rgb, targetColor, blendFactor);\n            vec3 finalColor = tintedTex * max(0.0, 1.0 - swarmDepletion * 0.6 * uIntensity);',
    content
)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/visuals/CymaticsCore.js', 'w') as f:
    f.write(content)
