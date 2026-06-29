import re

file_path = "binaural-assets/js/visuals/visualizer_v4.js"
with open(file_path, "r") as f:
    content = f.read()

new_init = """    initTsunami() {
        if (!this.tsunamiGroup) return;
        this.tsunamiGroup.clear();

        // High resolution for stylistic jagged edges
        const geometry = new THREE.PlaneGeometry(300, 200, 600, 400);
        
        const uniforms = {
            uTime: { value: 0 },
            uNormBass: { value: 0 },
            // Ultra vibrant Arcane/Spider-Verse Ukiyo-e Palette
            uColor: { value: new THREE.Color(0x0bd3d3) }, // Bright glowing cyan/aquamarine
            uSecondaryColor: { value: new THREE.Color(0x006994) }, // Rich mid-tone cerulean
            uDeepColor: { value: new THREE.Color(0x00132b) }, // Ink-black navy abyss
            uFoamColor: { value: new THREE.Color(0xffffff) }, // Stark white
            uAmplitude: { value: 1.0 },
            uCurl: { value: 1.0 },
            uMist: { value: 1.0 },
            uStyle: { value: 1.0 },
            uReactivity: { value: 1.0 }
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
                
                float waveX = pos.x; 
                
                // Audio reactivity dictates how violently the wave moves
                float react = uNormBass * uReactivity;
                float baseHeight = 45.0 * uAmplitude * (1.0 + react * 0.4);
                
                // Asymmetric bell curve 
                float envelope = 0.0;
                if (waveX < 0.0) {
                    envelope = exp(-pow(waveX * 0.015, 2.0)); // Back of wave
                } else {
                    envelope = exp(-pow(waveX * 0.04, 2.0)); // Front cliff
                }
                
                // Vicious geometry fracturing when reactivity is high
                float spikes = snoise(vec2(pos.x * 0.1, pos.y * 0.1 + time)) * snoise(vec2(pos.y * 0.05, time * 0.2));
                float fracturing = spikes * 15.0 * react * envelope;
                
                // Add structural ridges
                float ridges = snoise(vec2(pos.y * 0.05, time * 0.2)) * 6.0 * envelope;
                
                pos.z += (baseHeight * envelope) + ridges + fracturing;
                
                // Kanagawa Curl Hook
                float curlAmount = pow(envelope, 3.0) * 35.0 * uCurl * (1.0 + react * 0.5);
                pos.x += curlAmount;
                
                // Edge noise for stylization ink lines
                vEdgeNoise = snoise(vec2(pos.x * 0.8, pos.y * 0.8));
                
                // If style is high, add sharp jagged steps to the mesh to simulate brush strokes
                if (uStyle > 0.5) {
                    float brushStrokes = step(0.5, snoise(vec2(pos.x * 0.1, pos.y * 0.05))) * 2.0 * uStyle;
                    pos.z += brushStrokes * envelope;
                }

                vElevation = pos.z;
                
                // Foam is present at the lip and on jagged fractures
                float foamNoise = snoise(pos.xy * 0.5 - vec2(time * 2.0));
                vFoamFactor = smoothstep(baseHeight * 0.6, baseHeight, pos.z) + foamNoise * 0.3 + (fracturing * 0.1);
                
                vec4 worldPos = modelMatrix * vec4(pos, 1.0);
                vWorldPosition = worldPos.xyz;
                
                vec4 mvPosition = viewMatrix * worldPos;
                vViewPosition = -mvPosition.xyz;
                
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
        
        const fragmentShader = `
            #extension GL_OES_standard_derivatives : enable
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
                
                // Color Mapping - Crisp thresholds (Arcane style)
                vec3 waterColor = uDeepColor;
                if (vElevation > 5.0) waterColor = uSecondaryColor;
                if (vElevation > 15.0) waterColor = uColor;
                
                // Graphic Foam Claws
                float foamThr = 0.6 - (uNormBass * 0.2 * uReactivity);
                float isFoam = step(foamThr, vFoamFactor);
                
                // Add claw tearing noise
                float clawNoise = snoise(vUv * 100.0 - uTime * 3.0);
                if (vFoamFactor > foamThr - 0.15 && vFoamFactor < foamThr && clawNoise > 0.4) {
                    isFoam = 1.0;
                }
                
                vec3 finalColor = mix(waterColor, uFoamColor, isFoam);
                
                // Stylization: Comic Book Ink Lines
                // If stylization is high, draw black contour lines on the geometric edges
                if (vStyle > 0.1) {
                    float edge = length(fwidth(normal));
                    // Add noisy ink bleeds
                    float inkThr = 0.5 - (vStyle * 0.2) + (vEdgeNoise * 0.1);
                    float inkLine = step(inkThr, edge);
                    finalColor = mix(finalColor, vec3(0.0), inkLine * vStyle); // Black ink
                }
                
                // Ambient Rim Light to make it pop out of the background
                float rim = 1.0 - max(dot(normalize(vViewPosition), normal), 0.0);
                float rimGlow = smoothstep(0.6, 1.0, rim);
                finalColor += uColor * rimGlow * 0.8;

                // Stylized Ukiyo-e Mist Clouds
                // Instead of a screen-wide fog, these are localized swirling cloud puffs
                float dist = length(vViewPosition);
                float cloudNoise = snoise(vec2(vWorldPosition.x * 0.02 + uTime * 0.05, vWorldPosition.y * 0.01 - uTime * 0.02));
                float cloudDetail = snoise(vec2(vWorldPosition.x * 0.05, vWorldPosition.y * 0.05));
                
                // Clouds exist heavily at the bottom (low elevation) and near the camera
                float cloudMask = (1.0 - smoothstep(0.0, 30.0, vElevation)) * uMist;
                float cloudShape = step(0.3, cloudNoise * 0.7 + cloudDetail * 0.3) * cloudMask;
                
                // Add beautiful gold/peach tint to the mist for a magical Ukiyo-e dawn effect
                vec3 cloudColor = vec3(0.98, 0.9, 0.8);
                
                // Alpha masking
                float alpha = 1.0;
                
                // Only apply mist if the slider is actually up
                if (uMist > 0.1) {
                    // Blend the solid cloud shape over the water
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
        
        // Use gl extensions for fwidth
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

start_match = start_pattern.search(content)
end_match = end_pattern.search(content)

if start_match and end_match:
    content = content[:start_match.start()] + "\n" + new_init + "\n" + content[end_match.start():]
    with open(file_path, "w") as f:
        f.write(content)
    print("Kanagawa Overhaul injected successfully.")
else:
    print("Could not find initTsunami bounds")

