import re

# 1. Update HTML slider max
html_file = "mindwave.html"
with open(html_file, "r") as f:
    html = f.read()

old_curl = 'id="tsunamiCurlSlider" max="2.0" min="0.1" step="0.1" type="range"'
new_curl = 'id="tsunamiCurlSlider" max="3.0" min="0.1" step="0.1" type="range"'

if old_curl in html:
    html = html.replace(old_curl, new_curl)
    with open(html_file, "w") as f:
        f.write(html)
    print("Patched mindwave.html curl slider max to 3.0")
else:
    print("Could not find old_curl in HTML")

# 2. Update visualizer_v4.js
js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

# Add setTsunamiStyle and setTsunamiReactivity
methods_insert = """    setTsunamiMist(val) {
        if (this.tsunamiMaterial && this.tsunamiMaterial.uniforms) {
            this.tsunamiMaterial.uniforms.uMist.value = parseFloat(val);
        }
    }
    setTsunamiStyle(val) {
        if (this.tsunamiMaterial && this.tsunamiMaterial.uniforms) {
            this.tsunamiMaterial.uniforms.uStyle.value = parseFloat(val);
        }
    }
    setTsunamiReactivity(val) {
        if (this.tsunamiMaterial && this.tsunamiMaterial.uniforms) {
            this.tsunamiMaterial.uniforms.uReactivity.value = parseFloat(val);
        }
    }"""

old_mist_method = """    setTsunamiMist(val) {
        if (this.tsunamiMaterial && this.tsunamiMaterial.uniforms) {
            this.tsunamiMaterial.uniforms.uMist.value = parseFloat(val);
        }
    }"""

if old_mist_method in js:
    js = js.replace(old_mist_method, methods_insert)
    print("Added setTsunamiStyle and setTsunamiReactivity to visualizer_v4.js")
else:
    print("Could not find setTsunamiMist method in visualizer_v4.js")

# Update uniforms in initTsunami
old_uniforms = """            uAmplitude: { value: 1.0 },
            uCurl: { value: 1.0 },
            uMist: { value: 1.0 }"""
new_uniforms = """            uAmplitude: { value: 1.0 },
            uCurl: { value: 1.0 },
            uMist: { value: 1.0 },
            uStyle: { value: 1.0 },
            uReactivity: { value: 1.0 }"""

js = js.replace(old_uniforms, new_uniforms)

# Update vertex shader to use uReactivity (scale the audio impact) and uStyle (modify structural noise)
# And pass them to fragment shader if needed
old_vshader_decl = """            uniform float uTime;
            uniform float uNormBass;
            uniform float uAmplitude;
            uniform float uCurl;"""
new_vshader_decl = """            uniform float uTime;
            uniform float uNormBass;
            uniform float uAmplitude;
            uniform float uCurl;
            uniform float uReactivity;
            uniform float uStyle;
            varying float vStyle;"""

js = js.replace(old_vshader_decl, new_vshader_decl)

old_vmain = """                // 1. Asymmetric bell curve for the main wave body (peaks at x=20)
                // Left side (back of wave) is a long slope, right side (front) is a steep cliff
                float waveX = pos.x; 
                float baseHeight = 45.0 * uAmplitude * (1.0 + uNormBass * 0.4);"""
new_vmain = """                vStyle = uStyle;
                // 1. Asymmetric bell curve for the main wave body
                // Left side (back of wave) is a long slope, right side (front) is a steep cliff
                float waveX = pos.x; 
                float reactivityFactor = 1.0 + (uNormBass * 0.4 * uReactivity);
                float baseHeight = 45.0 * uAmplitude * reactivityFactor;"""

js = js.replace(old_vmain, new_vmain)

old_curl_calc = """                // The higher the wave, the more it hooks to the right (positive X)
                float curlAmount = pow(envelope, 3.0) * 35.0 * uCurl * (1.0 + uNormBass * 0.3);
                pos.x += curlAmount;
                
                // 4. Micro texture for stylistic lines flowing along the wave
                float lines = snoise(vec2(pos.x * 0.5, pos.y * 0.2 - time)) * 1.5;
                pos.z += lines * envelope;"""
new_curl_calc = """                // The higher the wave, the more it hooks to the right (positive X)
                float curlAmount = pow(envelope, 3.0) * 35.0 * uCurl * (1.0 + uNormBass * 0.3 * uReactivity);
                pos.x += curlAmount;
                
                // 4. Micro texture for stylistic lines flowing along the wave
                // uStyle controls how heavy the stylistic ridges and lines are
                float styleMultiplier = max(0.01, uStyle * 2.0);
                float lines = snoise(vec2(pos.x * 0.5 * styleMultiplier, pos.y * 0.2 - time)) * 1.5 * uStyle;
                pos.z += lines * envelope;"""

js = js.replace(old_curl_calc, new_curl_calc)

# Fix Mist in Fragment Shader and add Style logic
old_fshader_decl = """            uniform float uNormBass;
            uniform float uTime;
            uniform float uMist;"""
new_fshader_decl = """            uniform float uNormBass;
            uniform float uTime;
            uniform float uMist;
            uniform float uReactivity;
            varying float vStyle;"""

js = js.replace(old_fshader_decl, new_fshader_decl)

old_foam_thr = """                // Foam Claws - stark graphic threshold
                float foamThr = 0.6 - (uNormBass * 0.2);"""
new_foam_thr = """                // Foam Claws - stark graphic threshold
                float foamThr = 0.6 - (uNormBass * 0.2 * uReactivity);"""

js = js.replace(old_foam_thr, new_foam_thr)

old_mist_calc = """                // Kanagawa Sea Mist (Fog)
                float dist = length(vViewPosition);
                float mistNoise = snoise(vWorldPosition.xy * 0.03 + vec2(uTime * 0.1)) * 0.5 + 0.5;
                float mistDensity = uMist * 0.012;
                float fogFactor = 1.0 - exp(-dist * mistDensity * (0.5 + mistNoise * 0.5));"""
new_mist_calc = """                // Kanagawa Sea Mist (Fog)
                // We use an exponential mapping so uMist=3.0 makes it heavily foggy, and uMist=0 is totally clear
                float dist = length(vViewPosition);
                float mistNoise = snoise(vWorldPosition.xy * 0.03 + vec2(uTime * 0.1)) * 0.5 + 0.5;
                float mistDensity = pow(uMist, 1.5) * 0.008; 
                float fogFactor = 1.0 - exp(-dist * mistDensity * (0.5 + mistNoise * 0.5));"""

js = js.replace(old_mist_calc, new_mist_calc)

with open(js_file, "w") as f:
    f.write(js)
print("Patched shaders in visualizer_v4.js")

