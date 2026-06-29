import re

file_path = "binaural-assets/js/visuals/visualizer_v4.js"
with open(file_path, "r") as f:
    content = f.read()

new_init = """    initTsunami() {
        if (!this.tsunamiGroup) return;
        this.tsunamiGroup.clear();

        // Kanagawa Great Wave Geometry
        const geometry = new THREE.PlaneGeometry(300, 200, 500, 300);
        
        const uniforms = {
            uTime: { value: 0 },
            uNormBass: { value: 0 },
            uColor: { value: new THREE.Color(0x0a264a) }, // Deep Prussian Blue
            uSecondaryColor: { value: new THREE.Color(0x2d5b88) }, // Mid-tone blue
            uDeepColor: { value: new THREE.Color(0x020d1c) }, // Very dark navy abyss
            uFoamColor: { value: new THREE.Color(0xfffdf2) }, // Slightly warm Kanagawa paper white
            uAmplitude: { value: 1.0 },
            uCurl: { value: 1.0 },
            uMist: { value: 1.0 }
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
            
            // Simplex noise
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
                
                // NO OCEAN SWELLS - SINGLE MASSIVE WAVE
                
                // 1. Asymmetric bell curve for the main wave body (peaks at x=20)
                // Left side (back of wave) is a long slope, right side (front) is a steep cliff
                float waveX = pos.x - 10.0; 
                float baseHeight = 45.0 * uAmplitude * (1.0 + uNormBass * 0.4);
                
                // Create an asymmetric envelope
                float envelope = 0.0;
                if (waveX < 0.0) {
                    envelope = exp(-pow(waveX * 0.015, 2.0)); // long back
                } else {
                    envelope = exp(-pow(waveX * 0.04, 2.0)); // steep front
                }
                
                // 2. Add some structural ridges so it's not a perfect mathematical curve
                float ridges = snoise(vec2(pos.y * 0.05, time * 0.2)) * 5.0 * envelope;
                
                // Set the height (Z axis)
                pos.z += (baseHeight * envelope) + ridges;
                
                // 3. The Kanagawa Curl (Pull the X coordinate forward massively at the peak)
                // The higher the wave, the more it hooks to the right (positive X)
                float curlAmount = pow(envelope, 3.0) * 35.0 * uCurl * (1.0 + uNormBass * 0.3);
                pos.x += curlAmount;
                
                // 4. Micro texture for stylistic lines flowing along the wave
                float lines = snoise(vec2(pos.x * 0.5, pos.y * 0.2 - time)) * 1.5;
                pos.z += lines * envelope;

                vElevation = pos.z;
                
                // 5. Foam Calculation
                // Foam exists heavily on the curled lip and crest
                float foamNoise = snoise(pos.xy * 0.5 - vec2(time * 2.0));
                
                // If it's very high (near the peak) and severely curled, it's foam
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
                // Flat normals for stylized look
                vec3 dx = dFdx(vWorldPosition);
                vec3 dy = dFdy(vWorldPosition);
                vec3 normal = normalize(cross(dx, dy));
                
                vec3 lightDir = normalize(vec3(0.0, 1.0, 1.0)); // Light from top-front
                float diff = max(dot(normal, lightDir), 0.0);
                
                // Color Mapping - Kanagawa distinct stripes
                // Lower sections are deep color, mid sections are secondary, top is base color
                vec3 waterColor = mix(uDeepColor, uSecondaryColor, smoothstep(5.0, 15.0, vElevation));
                waterColor = mix(waterColor, uColor, smoothstep(20.0, 35.0, vElevation));
                
                // Foam Claws - stark graphic threshold
                float foamThr = 0.6 - (uNormBass * 0.2);
                float isFoam = step(foamThr, vFoamFactor);
                
                // Add claw tearing noise at the foam border
                float clawNoise = snoise(vUv * 100.0 - uTime * 3.0);
                if (vFoamFactor > foamThr - 0.15 && vFoamFactor < foamThr && clawNoise > 0.3) {
                    isFoam = 1.0;
                }
                
                vec3 finalColor = mix(waterColor, uFoamColor, isFoam);
                
                // Add subtle rim light for separation
                float rim = 1.0 - max(dot(normalize(vViewPosition), normal), 0.0);
                finalColor += uSecondaryColor * smoothstep(0.7, 1.0, rim) * 0.4;

                // Kanagawa Sea Mist (Fog)
                float dist = length(vViewPosition);
                float mistNoise = snoise(vWorldPosition.xy * 0.03 + vec2(uTime * 0.1)) * 0.5 + 0.5;
                float mistDensity = uMist * 0.012;
                float fogFactor = 1.0 - exp(-dist * mistDensity * (0.5 + mistNoise * 0.5));
                
                // Warm, faded paper/mist color
                vec3 mistColor = mix(vec3(0.95, 0.93, 0.88), uColor, 0.1);
                
                finalColor = mix(finalColor, mistColor, fogFactor);

                gl_FragColor = vec4(finalColor, 1.0 - (fogFactor * 0.3));
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
        mesh.position.y = -10; // floor level
        mesh.position.z = -50; // pushed back so the huge wave is visible
        
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
    print("Replaced initTsunami with Single Wave implementation.")
else:
    print("Could not find initTsunami bounds")
