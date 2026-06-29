import re

file_path = "binaural-assets/js/visuals/visualizer_v4.js"
with open(file_path, "r") as f:
    content = f.read()

# 1. Replace initTsunami
new_init = """    initTsunami() {
        if (!this.tsunamiGroup) return;
        this.tsunamiGroup.clear();

        // Kanagawa Great Wave Geometry
        const geometry = new THREE.PlaneGeometry(200, 150, 400, 400);
        
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
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ; m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            // Stylized Gerstner Wave with strong forward curl
            vec3 kanagawaWave(vec2 position, float time, float steepness, float amplitude, float frequency, vec2 direction) {
                vec2 d = normalize(direction);
                float f = steepness * amplitude;
                float phase = frequency * dot(d, position) + time;
                
                // Base audio amp
                float amp = amplitude * (1.0 + uNormBass * 1.5) * uAmplitude;
                
                // Kanagawa Hook effect: As height increases, pull heavily in direction of travel
                float hook = steepness * uCurl;
                
                return vec3(
                    d.x * (amp * hook * cos(phase)),
                    d.y * (amp * hook * cos(phase)),
                    amp * sin(phase)
                );
            }

            // Cymatics structural ripples
            float cymatics(vec2 pos, float time) {
                float d1 = length(pos - vec2(15.0, 15.0));
                float d2 = length(pos - vec2(-15.0, -15.0));
                float freq = 0.8 + uNormBass * 1.5;
                float w1 = sin(d1 * freq - time * 2.0);
                float w2 = sin(d2 * freq - time * 2.2);
                return (w1 + w2) * 0.5 * uNormBass;
            }

            void main() {
                vUv = uv;
                vec3 pos = position;
                float time = uTime * 2.0; // speed up base
                
                // Base swells
                vec3 w1 = kanagawaWave(pos.xy, time * 0.8, 1.2, 3.5, 0.1, vec2(1.0, 0.3));
                vec3 w2 = kanagawaWave(pos.xy, time * 0.9, 1.4, 2.0, 0.15, vec2(-0.2, 1.0));
                vec3 w3 = kanagawaWave(pos.xy, time * 1.1, 1.6, 1.5, 0.25, vec2(0.5, 0.8));
                
                pos += w1 + w2 + w3;
                
                // Massive Kanagawa Great Wave structure
                float greatWaveNoise = snoise(pos.xy * 0.03 - vec2(time * 0.4, time * 0.2));
                // Creates sharp crests
                float crest = smoothstep(-0.3, 1.0, greatWaveNoise) * (12.0 + uNormBass * 20.0) * uAmplitude;
                pos.z += crest;
                
                // Sharp forward leaning curl
                pos.x += smoothstep(0.5, 1.0, greatWaveNoise) * 8.0 * uCurl;
                
                // Cymatics ripples
                float cymRipple = cymatics(pos.xy, time);
                pos.z += cymRipple * 4.0;

                // Micro texture for stylistic lines
                float lines = snoise(pos.xy * 2.0 + time) * 0.3;
                pos.z += lines;

                vElevation = pos.z;
                
                // Foam pre-calculation for claws
                // Higher elevations with specific noise patterns get foam
                float foamNoise = snoise(pos.xy * 1.5 - vec2(time));
                vFoamFactor = smoothstep(4.0, 8.0 + uAmplitude * 2.0, pos.z) + foamNoise * 0.2;
                
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

            // Simple noise for mist and claw tearing
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
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                // Flat normals for stylized look
                vec3 dx = dFdx(vWorldPosition);
                vec3 dy = dFdy(vWorldPosition);
                vec3 normal = normalize(cross(dx, dy));
                
                vec3 lightDir = normalize(vec3(0.3, 1.0, 0.5));
                float diff = max(dot(normal, lightDir), 0.0);
                
                // Color Mapping - Stylized Kanagawa palette
                vec3 waterColor = mix(uDeepColor, uColor, smoothstep(-3.0, 4.0, vElevation));
                waterColor = mix(waterColor, uSecondaryColor, smoothstep(2.0, 8.0, vElevation));
                
                // Foam Claw generation
                // Hard threshold for graphic style
                float foamThr = 0.5 - (uNormBass * 0.15);
                float isFoam = step(foamThr, vFoamFactor);
                
                // Claws at the edge of foam
                float clawNoise = snoise(vUv * 80.0 - uTime * 2.0);
                if (vFoamFactor > foamThr - 0.1 && vFoamFactor < foamThr && clawNoise > 0.4) {
                    isFoam = 1.0; // Draw claw drips
                }
                
                vec3 finalColor = mix(waterColor, uFoamColor, isFoam);
                
                // Stylized rim lighting rather than realistic specularity
                float rim = 1.0 - max(dot(normalize(vViewPosition), normal), 0.0);
                rim = smoothstep(0.6, 1.0, rim);
                finalColor += uSecondaryColor * rim * 0.5;

                // Kanagawa Sea Mist (Fog)
                float dist = length(vViewPosition);
                
                // Dynamic mist that curls up
                float mistNoise = snoise(vWorldPosition.xy * 0.05 + vec2(uTime * 0.2)) * 0.5 + 0.5;
                float mistDensity = uMist * 0.015;
                float fogFactor = 1.0 - exp(-dist * mistDensity * (0.5 + mistNoise * 0.5));
                
                // Warm, faded paper/mist color
                vec3 mistColor = mix(vec3(0.95, 0.93, 0.88), uColor, 0.2);
                
                finalColor = mix(finalColor, mistColor, fogFactor);

                gl_FragColor = vec4(finalColor, 1.0 - (fogFactor * 0.5));
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
        mesh.position.y = -20; // lower to act as ocean floor
        mesh.position.z = -40; // push further back
        
        this.tsunamiGroup.add(mesh);
    }
"""

start_idx = content.find("initTsunami() {")
end_idx = content.find("initSnowflake() {")

if start_idx == -1 or end_idx == -1:
    print("Could not find initTsunami or initSnowflake.")
    exit(1)

content = content[:start_idx] + new_init + "    " + content[end_idx:]

# 2. Add slider methods
methods_str = """
    // --- Tsunami Controls ---
    setTsunamiAmplitude(val) {
        if (this.tsunamiMaterial && this.tsunamiMaterial.uniforms) {
            this.tsunamiMaterial.uniforms.uAmplitude.value = parseFloat(val);
        }
    }
    setTsunamiCurl(val) {
        if (this.tsunamiMaterial && this.tsunamiMaterial.uniforms) {
            this.tsunamiMaterial.uniforms.uCurl.value = parseFloat(val);
        }
    }
    setTsunamiMist(val) {
        if (this.tsunamiMaterial && this.tsunamiMaterial.uniforms) {
            this.tsunamiMaterial.uniforms.uMist.value = parseFloat(val);
        }
    }
"""

if "setTsunamiAmplitude" not in content:
    idx = content.find("setTsunamiMode")
    if idx != -1:
        content = content[:idx] + methods_str + content[idx:]
    else:
        # Fallback, add before initTsunami
        idx = content.find("initTsunami() {")
        content = content[:idx] + methods_str + content[idx:]

with open(file_path, "w") as f:
    f.write(content)

print("Patch applied successfully.")
