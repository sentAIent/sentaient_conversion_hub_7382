import re

js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

# I will rewrite the vertex and fragment shader to completely remove ridges, massively amplify curl, and make reactivity/stylization undeniably obvious.
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
            
            uniform float uTime;
            uniform float uNormBass;
            uniform float uAmplitude;
            uniform float uCurl;
            uniform float uReactivity;
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
                vec3 pos = position;
                float time = uTime * 1.5;
                
                // Aggressive Reactivity: multiply the bass drastically
                float react = uNormBass * (1.0 + uReactivity * 5.0); 
                
                float phase = 0.0;
                float waveX = pos.x; 
                
                if (uLoopActive > 0.5) {
                    float loopLen = 200.0;
                    float cycle = mod(time * 30.0, loopLen);
                    phase = cycle / loopLen; 
                    waveX = pos.x - 100.0 + cycle; 
                }
                
                // Massive base height
                float baseHeight = 45.0 * uAmplitude * (1.0 + react * 0.5);
                
                // Asymmetric bell curve
                float envelope = 0.0;
                if (waveX < 0.0) {
                    envelope = exp(-pow(waveX * 0.015, 2.0)); // Back of wave
                } else {
                    envelope = exp(-pow(waveX * 0.04, 2.0)); // Front cliff
                }
                
                float breakCrush = 1.0;
                if (uLoopActive > 0.5) {
                    breakCrush = 1.0 - smoothstep(0.75, 1.0, phase);
                    envelope *= breakCrush;
                }
                
                // Pure smooth wave. NO MORE RIDGES OR STRIPES.
                pos.z += (baseHeight * envelope);
                
                // Reactivity adds chaotic violent spikes ONLY when bass drops
                if (uReactivity > 0.1) {
                    float chaos = snoise(vec2(pos.x * 0.2, pos.y * 0.2 + time));
                    pos.z += (chaos * 40.0 * react * envelope); 
                }
                
                // CURL MASSIVELY INCREASED. 
                // uCurl goes up to 4.0. We will multiply it by 40.0 so at max it's 160 units of hook (folding back into itself).
                float activeCurl = uCurl * 40.0; 
                
                if (uLoopActive > 0.5) {
                    activeCurl += smoothstep(0.4, 0.8, phase) * 40.0; 
                    activeCurl *= breakCrush; 
                }
                
                float curlAmount = pow(envelope, 3.0) * activeCurl * (1.0 + react * 0.5);
                pos.x += curlAmount;
                
                if (uLoopActive > 0.5) {
                   pos.x += curlAmount * 0.5;
                }

                vElevation = pos.z;
                
                // Simple smooth foam factor
                float foamNoise = snoise(pos.xy * 0.2 - vec2(time));
                vFoamFactor = smoothstep(baseHeight * 0.6, baseHeight, pos.z) + foamNoise * 0.3;
                
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
            
            uniform vec3 uColor;
            uniform vec3 uSecondaryColor;
            uniform vec3 uDeepColor;
            uniform vec3 uFoamColor;
            uniform float uNormBass;
            uniform float uTime;
            uniform float uMist;
            uniform float uReactivity;
            uniform float uStyle;

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
                // Color Mapping - Buttery Smooth Gradients
                float midWeight = smoothstep(2.0, 15.0, vElevation);
                float highWeight = smoothstep(12.0, 35.0, vElevation);
                
                vec3 waterColor = mix(uDeepColor, uSecondaryColor, midWeight);
                waterColor = mix(waterColor, uColor, highWeight);
                
                // Stylization completely overrides the gradient with harsh, comic-book cell banding if uStyle is > 0.0
                if (uStyle > 0.1) {
                    // Force the colors into 3 strict bands
                    if (vElevation < 10.0) waterColor = uDeepColor;
                    else if (vElevation < 25.0) waterColor = uSecondaryColor;
                    else waterColor = uColor;
                }
                
                // Graphic Foam Claws - isolated strictly to elevation > 10.0 so no flat ocean stripes exist
                float foamThr = 0.6 - (uNormBass * uReactivity * 0.5);
                float isFoam = step(foamThr, vFoamFactor);
                
                float floorMask = smoothstep(10.0, 15.0, vElevation);
                isFoam *= floorMask;
                
                vec3 finalColor = mix(waterColor, uFoamColor, isFoam);
                
                // Stylized Ukiyo-e Mist Clouds - no more stripes, just a single massive soft cloud bed
                float dist = length(vViewPosition);
                // Ultra soft, low frequency noise
                float cloudNoise = snoise(vec2(vWorldPosition.x * 0.01 + uTime * 0.02, vWorldPosition.y * 0.005));
                
                float cloudMask = (1.0 - smoothstep(-10.0, 20.0, vElevation)) * (uMist * 1.5);
                // No stripes, just a gentle fade based on noise
                float cloudShape = smoothstep(0.0, 0.8, cloudNoise) * cloudMask;
                
                vec3 cloudColor = vec3(0.98, 0.9, 0.8);
                
                float alpha = 1.0;
                if (uMist > 0.1) {
                    finalColor = mix(finalColor, cloudColor, cloudShape);
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

