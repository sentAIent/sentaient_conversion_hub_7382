import re

js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

new_init = """    initTsunami() {
        if (!this.tsunamiGroup) return;
        this.tsunamiGroup.clear();

        // Massive geometry to support the huge overhang of a pipeline barrel without stretching
        const geometry = new THREE.PlaneGeometry(300, 200, 800, 500);
        
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
            varying float vPhaseWashout;
            
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
                vPhaseWashout = 0.0;
                
                float react = max(uNormBass * 10.0 * uReactivity, snoise(vec2(time * 0.5)) * uReactivity * 0.2); 
                
                // --- LIFECYCLE LOGIC ---
                float activeAmp = uAmplitude;
                float activeCurl = uCurl;
                float phase = 0.0;
                float waveX = pos.x; 
                
                if (uLoopActive > 0.5) {
                    float loopLen = 10.0; // 10 second cycle based on time
                    phase = fract(time / loopLen); // 0.0 to 1.0
                    
                    // Phase 0.0 to 0.3: Forming -> Swelling
                    // Amp goes from 0.1 to uAmplitude. Curl is 0.
                    float formProgress = smoothstep(0.0, 0.3, phase);
                    activeAmp = mix(0.1, uAmplitude, formProgress);
                    
                    // Phase 0.3 to 0.6: Pitching (Barrel forms)
                    // Curl goes from 0 to uCurl
                    float pitchProgress = smoothstep(0.3, 0.6, phase);
                    activeCurl = mix(0.0, uCurl, pitchProgress);
                    
                    // Phase 0.6 to 0.85: Holding the barrel
                    // Stable, massive tube.
                    
                    // Phase 0.85 to 0.95: Crashing
                    float crashProgress = smoothstep(0.85, 0.95, phase);
                    activeAmp = mix(activeAmp, 0.1, crashProgress);
                    activeCurl = mix(activeCurl, 0.0, crashProgress);
                    
                    // Phase 0.95 to 1.0: Washout (Fragment shader turns everything to foam)
                    vPhaseWashout = smoothstep(0.9, 1.0, phase);
                    
                    // Roll the wave forward continuously across the screen
                    waveX = pos.x - 100.0 + (phase * 150.0);
                }
                
                // Massive base height. A 100-foot pipeline needs to reach very high.
                float baseHeight = 60.0 * activeAmp * (1.0 + react * 0.3);
                
                // Asymmetric bell curve
                float envelope = 0.0;
                if (waveX < 0.0) {
                    envelope = exp(-pow(waveX * 0.012, 2.0)); // Back of wave slope
                } else {
                    envelope = exp(-pow(waveX * 0.04, 2.0)); // Front cliff
                }
                
                // Apply base height
                pos.z += (baseHeight * envelope);
                
                // Reactivity adds chaotic violent spikes
                if (uReactivity > 0.1) {
                    float chaos = snoise(vec2(pos.x * 0.2, pos.y * 0.2 + time));
                    pos.z += (chaos * 20.0 * react * envelope); 
                }
                
                // --- TRUE CYLINDER BARREL PHYSICS ---
                // We want the wave to curl completely over itself, forming a hollow tube.
                float curlStartHeight = 15.0; // Where the face of the wave starts bending
                float maxRotation = activeCurl * 0.8; // Max uCurl of 4.0 = 3.2 radians (approx 180 degrees, a full half-pipe)
                
                if (pos.z > curlStartHeight) {
                    float heightAbovePivot = pos.z - curlStartHeight;
                    
                    // Bending angle increases the higher up the face you go.
                    // We multiply by envelope so the flat parts of the ocean don't curl.
                    float bendAngle = (heightAbovePivot / baseHeight) * maxRotation * envelope; 
                    
                    // True rotation around the pivot (X, Z)
                    // The pivot is at (originalX, curlStartHeight).
                    // As the wave bends, it pushes forward in X, and arcs down in Z.
                    
                    // A larger radius creates a hollower tube.
                    float tubeRadius = baseHeight * 0.4;
                    
                    // Calculate the new curled position based on circular mapping
                    float currentArcLength = heightAbovePivot;
                    // Angle based on arc length around the tube radius
                    float angle = (currentArcLength / tubeRadius) * maxRotation * envelope;
                    
                    // Apply cylindrical mapping
                    // Sine moves it forward (X), Cosine drops it down (Z)
                    pos.x += sin(angle) * tubeRadius;
                    pos.z = curlStartHeight + tubeRadius - (cos(angle) * tubeRadius);
                }

                vElevation = pos.z;
                
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
            varying float vPhaseWashout;
            
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
                if (vStyle > 0.1 && floorMask > 0.5) {
                    float foamEdge = smoothstep(foamThr - 0.1, foamThr, vFoamFactor) - smoothstep(foamThr, foamThr + 0.05, vFoamFactor);
                    if (foamEdge > 0.5) {
                        finalColor = mix(finalColor, uDeepColor, vStyle * 0.8);
                    }
                    
                    if (isFoam > 0.5) {
                        float woodblockLines = snoise(vWorldPosition.xy * 0.8);
                        float lineThr = 0.6 - (vStyle * 0.2);
                        if (woodblockLines > lineThr) {
                            finalColor = mix(finalColor, uSecondaryColor, vStyle * 0.6);
                        }
                    }
                }
                
                // If the animation is in the final crashing phase, wash everything out into whitewater foam
                if (vPhaseWashout > 0.01) {
                    // Turn everything slightly white/foamy to simulate the massive crash
                    finalColor = mix(finalColor, uFoamColor, vPhaseWashout * 0.8);
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
        
        // Massive pipeline framing! Bring it extremely close to the camera.
        // The camera is at Z=5, Y=0.
        // We move the mesh to Z=-30 so the barrel throws its lip directly over our head.
        mesh.position.y = -25; 
        mesh.position.z = -30; 
        mesh.position.x = -40; 
        
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
    print("Kanagawa JS patched successfully for Pipeline.")
else:
    print("Could not find initTsunami bounds")

