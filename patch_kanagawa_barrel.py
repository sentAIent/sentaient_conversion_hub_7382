import re

js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

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
            
            uniform float uTime;
            uniform float uNormBass;
            uniform float uAmplitude;
            uniform float uCurl;
            uniform float uReactivity;
            uniform float uLoopActive;
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
                
                // If the user's bass levels are tiny, we use a huge multiplier to ensure ANY bass causes massive visual reactions
                float react = max(uNormBass * 10.0 * uReactivity, snoise(vec2(time * 0.5)) * uReactivity * 0.2); 
                
                float phase = 0.0;
                float waveX = pos.x; 
                
                if (uLoopActive > 0.5) {
                    float loopLen = 200.0;
                    float cycle = mod(time * 30.0, loopLen);
                    phase = cycle / loopLen; 
                    waveX = pos.x - 100.0 + cycle; 
                }
                
                // Massive base height
                float baseHeight = 45.0 * uAmplitude * (1.0 + react * 0.3);
                
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
                
                pos.z += (baseHeight * envelope);
                
                // Reactivity adds chaotic violent spikes
                if (uReactivity > 0.1) {
                    float chaos = snoise(vec2(pos.x * 0.2, pos.y * 0.2 + time));
                    pos.z += (chaos * 20.0 * react * envelope); 
                }
                
                // --- TRUE SURFING BARREL CURL ---
                // Instead of just shifting X, we will rotate the top of the wave around a pivot point to form a tube.
                // The higher the Z (elevation), the more it rotates forward (X) and down (-Z)
                float curlFactor = uCurl * 0.4; // Max 4.0 means 1.6 radians of rotation (past 90 degrees, forming a full tube)
                if (uLoopActive > 0.5) {
                    curlFactor += smoothstep(0.4, 0.8, phase) * 0.8; 
                    curlFactor *= breakCrush; 
                }
                
                // We only curl the portion of the wave above a certain height
                float curlStartHeight = 15.0;
                if (pos.z > curlStartHeight) {
                    float heightAbovePivot = pos.z - curlStartHeight;
                    // How much to bend based on envelope and curl setting
                    float bendAngle = heightAbovePivot * 0.03 * curlFactor * envelope; 
                    
                    // Rotate the vertex around the pivot (X-axis, Z-axis)
                    float originalX = pos.x;
                    float originalZ = pos.z;
                    
                    // The crest pushes forward (X) and curls down (Z)
                    pos.x = originalX + sin(bendAngle) * heightAbovePivot * 2.0;
                    pos.z = curlStartHeight + cos(bendAngle) * heightAbovePivot;
                }

                vElevation = pos.z;
                
                // Simple smooth foam factor
                float foamNoise = snoise(pos.xy * 0.2 - vec2(time));
                vFoamFactor = smoothstep(baseHeight * 0.5, baseHeight, pos.z) + foamNoise * 0.3;
                
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
                // Color Mapping - PERMANENT Buttery Smooth Gradients
                float midWeight = smoothstep(2.0, 15.0, vElevation);
                float highWeight = smoothstep(12.0, 35.0, vElevation);
                
                vec3 waterColor = mix(uDeepColor, uSecondaryColor, midWeight);
                waterColor = mix(waterColor, uColor, highWeight);
                
                // Graphic Foam Claws - isolated strictly to elevation > 10.0
                float foamThr = 0.5 - (max(uNormBass, 0.05) * uReactivity * 0.5);
                float isFoam = step(foamThr, vFoamFactor);
                
                float floorMask = smoothstep(10.0, 15.0, vElevation);
                isFoam *= floorMask;
                
                vec3 finalColor = mix(waterColor, uFoamColor, isFoam);
                
                // STYLIZATION REWRITE: Great Wave Cartoon Tendrils
                // Instead of color banding, uStyle adds sharp, dark blue claw outlines around the foam (like the Ukiyo-e painting)
                if (vStyle > 0.1 && floorMask > 0.5) {
                    // Find the very edge of the foam
                    float foamEdge = smoothstep(foamThr - 0.1, foamThr, vFoamFactor) - smoothstep(foamThr, foamThr + 0.05, vFoamFactor);
                    if (foamEdge > 0.5) {
                        // Blend a dark navy ink outline at the foam boundary
                        finalColor = mix(finalColor, uDeepColor, vStyle * 0.8);
                    }
                    
                    // Add graphic contour lines inside the foam to simulate Ukiyo-e woodblock printing strokes
                    if (isFoam > 0.5) {
                        float woodblockLines = snoise(vWorldPosition.xy * 0.8);
                        float lineThr = 0.6 - (vStyle * 0.2);
                        if (woodblockLines > lineThr) {
                            finalColor = mix(finalColor, uSecondaryColor, vStyle * 0.6);
                        }
                    }
                }
                
                // Stylized Ukiyo-e Mist Clouds
                float dist = length(vViewPosition);
                float cloudNoise = snoise(vec2(vWorldPosition.x * 0.01 + uTime * 0.02, vWorldPosition.y * 0.005));
                float cloudMask = (1.0 - smoothstep(-10.0, 20.0, vElevation)) * (uMist * 1.5);
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

