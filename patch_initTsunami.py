import re
import sys

file_path = "binaural-assets/js/visuals/visualizer_v4.js"

try:
    with open(file_path, "r") as f:
        content = f.read()
except Exception as e:
    print(f"Error reading file: {e}")
    sys.exit(1)

# The new initTsunami code based on all patches
new_init = """    initTsunami() {
        this.tsunamiGroup = new THREE.Group();
        this.tsunamiGroup.visible = false;
        
        const geometry = new THREE.PlaneGeometry(300, 200, 256, 128);
        
        const uniforms = {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(0x1a8cff) },
            uSecondaryColor: { value: new THREE.Color(0x004c99) },
            uDeepColor: { value: new THREE.Color(0x001a33) },
            uFoamColor: { value: new THREE.Color(0xffffff) },
            uNormBass: { value: 0 },
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
                vUv = uv;
                vec3 pos = position;
                float time = uTime * 1.5;
                
                vStyle = uStyle;
                // 1. Asymmetric bell curve for the main wave body
                // Left side (back of wave) is a long slope, right side (front) is a steep cliff
                float waveX = pos.x; 
                float reactivityFactor = 1.0 + (uNormBass * 0.4 * uReactivity);
                float baseHeight = 45.0 * uAmplitude * reactivityFactor;
                
                float envelope = 0.0;
                if (waveX < 0.0) {
                    envelope = exp(-pow(waveX * 0.015, 2.0)); 
                } else {
                    envelope = exp(-pow(waveX * 0.04, 2.0)); 
                }
                
                float fracturing = 0.0;
                if (waveX > 0.0) {
                    fracturing = snoise(vec2(pos.y * 0.05, time * 0.5)) * envelope * 2.0;
                    envelope -= smoothstep(0.5, 1.0, fracturing) * 0.2;
                }
                
                vEdgeNoise = fracturing;
                
                float ridges = snoise(vec2(pos.y * 0.05, time * 0.2)) * 5.0 * envelope;
                pos.z += (baseHeight * envelope) + ridges;
                
                // The higher the wave, the more it hooks to the right (positive X)
                float curlAmount = pow(envelope, 3.0) * 35.0 * uCurl * (1.0 + uNormBass * 0.3 * uReactivity);
                pos.x += curlAmount;
                
                // 4. Micro texture for stylistic lines flowing along the wave
                // uStyle controls how heavy the stylistic ridges and lines are
                float styleMultiplier = max(0.01, uStyle * 2.0);
                float lines = snoise(vec2(pos.x * 0.5 * styleMultiplier, pos.y * 0.2 - time)) * 1.5 * uStyle;
                pos.z += lines * envelope;

                if (uStyle > 0.5) {
                    float brushStrokes = step(0.5, snoise(vec2(pos.x * 0.1, pos.y * 0.05))) * 2.0 * uStyle;
                    pos.z += brushStrokes * envelope;
                }

                vElevation = pos.z;
                
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
                
                float midWeight = smoothstep(2.0, 15.0, vElevation);
                float highWeight = smoothstep(12.0, 35.0, vElevation);
                
                vec3 waterColor = mix(uDeepColor, uSecondaryColor, midWeight);
                waterColor = mix(waterColor, uColor, highWeight);
                
                // Foam Claws - stark graphic threshold
                float foamThr = 0.6 - (uNormBass * 0.2 * uReactivity);
                float isFoam = step(foamThr, vFoamFactor);
                
                float floorMask = smoothstep(8.0, 15.0, vElevation);
                isFoam *= floorMask;
                
                float clawNoise = snoise(vUv * 100.0 - uTime * 3.0);
                if (vFoamFactor > foamThr - 0.15 && vFoamFactor < foamThr && clawNoise > 0.4) {
                    isFoam = 1.0 * floorMask;
                }
                
                vec3 finalColor = mix(waterColor, uFoamColor, isFoam);
                
                if (vStyle > 0.1) {
                    float edge = length(fwidth(normal));
                    float inkThr = 0.5 - (vStyle * 0.2) + (vEdgeNoise * 0.1);
                    float inkLine = step(inkThr, edge);
                    float maskedInk = inkLine * vStyle * floorMask;
                    finalColor = mix(finalColor, vec3(0.0), maskedInk); 
                }
                
                float rim = 1.0 - max(dot(normalize(vViewPosition), normal), 0.0);
                float rimGlow = smoothstep(0.6, 1.0, rim);
                finalColor += uColor * rimGlow * 0.8;

                // Kanagawa Sea Mist (Fog)
                float dist = length(vViewPosition);
                float mistNoise = snoise(vWorldPosition.xy * 0.03 + vec2(uTime * 0.1)) * 0.5 + 0.5;
                float mistDensity = pow(uMist, 1.5) * 0.008; 
                float fogFactor = 1.0 - exp(-dist * mistDensity * (0.5 + mistNoise * 0.5));
                
                float cloudNoise = snoise(vec2(vWorldPosition.x * 0.02 + uTime * 0.05, vWorldPosition.y * 0.01 - uTime * 0.02));
                float cloudDetail = snoise(vec2(vWorldPosition.x * 0.05, vWorldPosition.y * 0.05));
                float cloudMask = (1.0 - smoothstep(0.0, 30.0, vElevation)) * uMist;
                float cloudShape = step(0.3, cloudNoise * 0.7 + cloudDetail * 0.3) * cloudMask;
                
                vec3 cloudColor = vec3(0.98, 0.9, 0.8);
                
                float alpha = 1.0;
                if (uMist > 0.1) {
                    finalColor = mix(finalColor, cloudColor, cloudShape * 0.85);
                }

                // Sun Glare
                if (uMist > 0.1) {
                    vec3 sunPos = vec3(0.0, 30.0, -300.0);
                    vec3 sunColor = vec3(1.0, 0.4, 0.0);
                    
                    vec3 lightDir = normalize(sunPos - vWorldPosition);
                    vec3 viewDir = normalize(vViewPosition);
                    
                    vec3 waterNormal = vec3(0.0, 0.0, 1.0);
                    float ripple = snoise(vWorldPosition.xy * 0.1 - vec2(0.0, uTime * 2.0));
                    waterNormal.x += ripple * 0.2;
                    waterNormal.y += ripple * 0.2;
                    waterNormal = normalize(waterNormal);
                    
                    vec3 halfVector = normalize(lightDir + viewDir);
                    float spec = pow(max(dot(waterNormal, halfVector), 0.0), 64.0);
                    
                    float glareMix = spec * (uMist / 1.5) * smoothstep(-20.0, 10.0, vElevation);
                    glareMix *= (1.0 - isFoam);
                    
                    finalColor += sunColor * glareMix;
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
        
        this.tsunamiWave = new THREE.Mesh(geometry, material);
        this.tsunamiWave.rotation.x = -Math.PI / 2;
        this.tsunamiWave.position.y = -50; 
        this.tsunamiWave.position.z = -120; 
        this.tsunamiWave.position.x = -70; 
        
        this.tsunamiGroup.add(this.tsunamiWave);
        
        this.tsunamiSun = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshBasicMaterial({ 
                color: 0xff5500, 
                transparent: true,
                opacity: 0.9,
                depthWrite: false
            })
        );
        this.tsunamiSun.position.set(0, 30, -300); 
        this.tsunamiSun.material.uniforms = { uMist: { value: 1.0 } };
        this.tsunamiGroup.add(this.tsunamiSun);
    }"""

start_pattern = re.compile(r'\s*initTsunami\(\)\s*\{')
end_pattern = re.compile(r'\s*initSnowflake\(\)\s*\{')
start_match = start_pattern.search(content)
end_match = end_pattern.search(content)

if start_match and end_match:
    content = content[:start_match.start()] + "\\n" + new_init + "\\n    initSnowflake() {" + content[end_match.end():]
    with open(file_path, "w") as f:
        f.write(content)
    print("Kanagawa replacement successful!")
else:
    print("Could not find initTsunami bounds")

