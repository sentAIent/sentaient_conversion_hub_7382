import re

html_file = "mindwave.html"
with open(html_file, "r") as f:
    html = f.read()

# 1. Patch the Curl slider max
old_curl = 'id="tsunamiCurlSlider" max="3.0"'
new_curl = 'id="tsunamiCurlSlider" max="4.0"'
if old_curl in html:
    html = html.replace(old_curl, new_curl)

# 2. Add the Animate Loop toggle
# Let's find the Tsunami controls wrapper or append it after the Reactivity slider
reactivity_control = """<input class="mw-slider" id="tsunamiReactivitySlider" max="3.0" min="0.0" step="0.1" type="range" value="1.0" oninput="if(window.getVisualizer && window.getVisualizer() && window.getVisualizer().setTsunamiReactivity){ window.getVisualizer().setTsunamiReactivity(this.value); document.getElementById('tsunamiReactivityVal').textContent = parseFloat(this.value).toFixed(1); }"/>"""

loop_toggle = """<input class="mw-slider" id="tsunamiReactivitySlider" max="3.0" min="0.0" step="0.1" type="range" value="1.0" oninput="if(window.getVisualizer && window.getVisualizer() && window.getVisualizer().setTsunamiReactivity){ window.getVisualizer().setTsunamiReactivity(this.value); document.getElementById('tsunamiReactivityVal').textContent = parseFloat(this.value).toFixed(1); }"/>
        </div>
        
        <div class="control-group">
            <label>Animate Break Loop</label>
            <label class="toggle-switch">
                <input type="checkbox" id="tsunamiLoopToggle" onchange="if(window.getVisualizer && window.getVisualizer() && window.getVisualizer().setTsunamiLoop){ window.getVisualizer().setTsunamiLoop(this.checked); }">
                <span class="slider"></span>
            </label>"""

if reactivity_control in html:
    html = html.replace(reactivity_control, loop_toggle)
    with open(html_file, "w") as f:
        f.write(html)
    print("Patched mindwave.html successfully")
else:
    print("Could not find reactivity_control in mindwave.html")


# 3. Patch visualizer_v4.js
js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

# Add setTsunamiLoop method
loop_method = """    setTsunamiLoop(isLooping) {
        if (this.tsunamiMaterial && this.tsunamiMaterial.uniforms) {
            this.tsunamiMaterial.uniforms.uLoopActive.value = isLooping ? 1.0 : 0.0;
        }
    }"""

old_reactivity_method = """    setTsunamiReactivity(val) {
        if (this.tsunamiMaterial && this.tsunamiMaterial.uniforms) {
            this.tsunamiMaterial.uniforms.uReactivity.value = parseFloat(val);
        }
    }"""

if old_reactivity_method in js:
    js = js.replace(old_reactivity_method, old_reactivity_method + "\n" + loop_method)

# Now rewrite initTsunami entirely to fix all shader requests
new_init = """    initTsunami() {
        if (!this.tsunamiGroup) return;
        this.tsunamiGroup.clear();

        const geometry = new THREE.PlaneGeometry(300, 200, 600, 400);
        
        const uniforms = {
            uTime: { value: 0 },
            uNormBass: { value: 0 },
            uColor: { value: new THREE.Color(0x0bd3d3) },
            uSecondaryColor: { value: new THREE.Color(0x006994) },
            uDeepColor: { value: new THREE.Color(0x00132b) },
            uFoamColor: { value: new THREE.Color(0xffffff) },
            uAmplitude: { value: 1.0 },
            uCurl: { value: 1.0 },
            uMist: { value: 1.0 },
            uStyle: { value: 1.0 },
            uReactivity: { value: 1.0 },
            uLoopActive: { value: 0.0 }
        };
        
        const vertexShader = `
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vViewPosition;
            varying vec3 vWorldPosition;
            varying float vFoamFactor;
            varying float vStyle;
            varying float vEdgeNoise;
            
            uniform float uTime;
            uniform float uNormBass;
            uniform float uAmplitude;
            uniform float uCurl;
            uniform float uReactivity;
            uniform float uStyle;
            uniform float uLoopActive;
            
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ; m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vUv = uv;
                vStyle = uStyle;
                vec3 pos = position;
                float time = uTime * 1.5;
                
                // Aggressive Reactivity
                float react = uNormBass * uReactivity;
                
                // Breaking Loop Animation Logic
                float phase = 0.0;
                float waveX = pos.x; 
                
                if (uLoopActive > 0.5) {
                    // Slide the entire wave structure left to right continuously
                    float loopLen = 200.0;
                    float cycle = mod(time * 30.0, loopLen);
                    // Phase represents where we are in the breaking cycle (0.0 to 1.0)
                    phase = cycle / loopLen; 
                    waveX = pos.x - 100.0 + cycle; 
                }
                
                float baseHeight = 45.0 * uAmplitude * (1.0 + react * 0.8);
                
                // Asymmetric bell curve
                float envelope = 0.0;
                if (waveX < 0.0) {
                    envelope = exp(-pow(waveX * 0.015, 2.0)); // Back of wave
                } else {
                    envelope = exp(-pow(waveX * 0.04, 2.0)); // Front cliff
                }
                
                // If looping, the wave height drops drastically right before the loop resets (the crush/break)
                float breakCrush = 1.0;
                if (uLoopActive > 0.5) {
                    breakCrush = 1.0 - smoothstep(0.75, 1.0, phase); // Crash down at end of loop
                    envelope *= breakCrush;
                }
                
                // Vicious geometry fracturing when reactivity is high
                float spikes = snoise(vec2(pos.x * 0.1, pos.y * 0.1 + time)) * snoise(vec2(pos.y * 0.05, time * 0.2));
                float fracturing = spikes * 30.0 * react * envelope;
                
                // Add structural ridges
                float ridges = snoise(vec2(pos.y * 0.05, time * 0.2)) * 6.0 * envelope;
                
                pos.z += (baseHeight * envelope) + ridges + fracturing;
                
                // Scale curl to handle massive 4.0 hooks
                // Base curl factor was 35.0, increase its impact based on slider
                float curlScale = uCurl * 12.0; 
                float activeCurl = curlScale;
                
                // In loop mode, curl intensifies as it rolls forward and breaks
                if (uLoopActive > 0.5) {
                    activeCurl += smoothstep(0.4, 0.8, phase) * 30.0; // Hook sharply as it breaks
                    activeCurl *= breakCrush; // Then collapse
                }
                
                float curlAmount = pow(envelope, 3.0) * activeCurl * (1.0 + react * 1.5);
                
                // Apply curl to X axis
                pos.x += curlAmount;
                // Add a forward "pitch" for the breaking loop
                if (uLoopActive > 0.5) {
                   pos.x += curlAmount * 0.5;
                }
                
                // Edge noise for stylization ink lines
                vEdgeNoise = snoise(vec2(pos.x * 0.8, pos.y * 0.8));
                
                // Style brush strokes
                if (uStyle > 0.5) {
                    float brushStrokes = step(0.5, snoise(vec2(pos.x * 0.1, pos.y * 0.05))) * 2.0 * uStyle;
                    pos.z += brushStrokes * envelope;
                }

                vElevation = pos.z;
                
                // Foam is present at the lip and on jagged fractures
                float foamNoise = snoise(pos.xy * 0.5 - vec2(time * 2.0));
                vFoamFactor = smoothstep(baseHeight * 0.5, baseHeight, pos.z) + foamNoise * 0.3 + (fracturing * 0.1);
                
                vec4 worldPos = modelMatrix * vec4(pos, 1.0);
                vWorldPosition = worldPos.xyz;
                
                vec4 mvPosition = viewMatrix * worldPos;
                vViewPosition = -mvPosition.xyz;
                
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
        
        const fragmentShader = `
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vViewPosition;
            varying vec3 vWorldPosition;
            varying float vFoamFactor;
            varying float vStyle;
            varying float vEdgeNoise;
            
            uniform vec3 uColor;
            uniform vec3 uSecondaryColor;
            uniform vec3 uDeepColor;
            uniform vec3 uFoamColor;
            uniform float uNormBass;
            uniform float uTime;
            uniform float uMist;
            uniform float uReactivity;

            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m; m = m*m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                // Flat normals for cell shading
                vec3 dx = dFdx(vWorldPosition);
                vec3 dy = dFdy(vWorldPosition);
                vec3 normal = normalize(cross(dx, dy));
                
                // Color Mapping - Buttery Smooth Gradients
                // Calculate mixing weights based on elevation
                float midWeight = smoothstep(2.0, 15.0, vElevation);
                float highWeight = smoothstep(12.0, 35.0, vElevation);
                
                vec3 waterColor = mix(uDeepColor, uSecondaryColor, midWeight);
                waterColor = mix(waterColor, uColor, highWeight);
                
                // Graphic Foam Claws - only apply if we are actually somewhat elevated
                float foamThr = 0.6 - (uNormBass * 0.2 * uReactivity);
                float isFoam = step(foamThr, vFoamFactor);
                
                // Mask the foam so it physically cannot appear on the flat ocean floor
                // Only allow foam if elevation is above 10 units
                float floorMask = smoothstep(8.0, 15.0, vElevation);
                isFoam *= floorMask;
                
                // Add claw tearing noise
                float clawNoise = snoise(vUv * 100.0 - uTime * 3.0);
                if (vFoamFactor > foamThr - 0.15 && vFoamFactor < foamThr && clawNoise > 0.4) {
                    isFoam = 1.0 * floorMask;
                }
                
                vec3 finalColor = mix(waterColor, uFoamColor, isFoam);
                
                // Stylization: Comic Book Ink Lines
                // Apply ink lines ONLY to the wave crest, not the flat floor
                if (vStyle > 0.1) {
                    float edge = length(fwidth(normal));
                    // Add noisy ink bleeds
                    float inkThr = 0.5 - (vStyle * 0.2) + (vEdgeNoise * 0.1);
                    float inkLine = step(inkThr, edge);
                    
                    // Mask ink lines with the floorMask so they don't draw white/black stripes everywhere
                    float maskedInk = inkLine * vStyle * floorMask;
                    finalColor = mix(finalColor, vec3(0.0), maskedInk); 
                }
                
                // Ambient Rim Light to make it pop out of the background
                float rim = 1.0 - max(dot(normalize(vViewPosition), normal), 0.0);
                float rimGlow = smoothstep(0.6, 1.0, rim);
                finalColor += uColor * rimGlow * 0.8;

                // Stylized Ukiyo-e Mist Clouds
                float dist = length(vViewPosition);
                float cloudNoise = snoise(vec2(vWorldPosition.x * 0.02 + uTime * 0.05, vWorldPosition.y * 0.01 - uTime * 0.02));
                float cloudDetail = snoise(vec2(vWorldPosition.x * 0.05, vWorldPosition.y * 0.05));
                
                float cloudMask = (1.0 - smoothstep(0.0, 30.0, vElevation)) * uMist;
                float cloudShape = step(0.3, cloudNoise * 0.7 + cloudDetail * 0.3) * cloudMask;
                
                vec3 cloudColor = vec3(0.98, 0.9, 0.8);
                
                float alpha = 1.0;
                if (uMist > 0.1) {
                    finalColor = mix(finalColor, cloudColor, cloudShape * 0.85);
                }

                gl_FragColor = vec4(finalColor, alpha);
            }
        `;
        
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            transparent: true,
            side: THREE.DoubleSide,
            wireframe: false
        });
        
        material.extensions.derivatives = true;
        this.tsunamiMaterial = material;
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -50; 
        mesh.position.z = -120; 
        mesh.position.x = -70; 
        
        this.tsunamiGroup.add(mesh);
    }
"""

start_pattern = re.compile(r'\s*initTsunami\(\)\s*\{')
end_pattern = re.compile(r'\s*initSnowflake\(\)\s*\{')
start_match = start_pattern.search(js)
end_match = end_pattern.search(js)

if start_match and end_match:
    js = js[:start_match.start()] + "\n" + new_init + "\n" + js[end_match.start():]
    with open(js_file, "w") as f:
        f.write(js)
    print("Kanagawa JS patched successfully.")
else:
    print("Could not find initTsunami bounds")
