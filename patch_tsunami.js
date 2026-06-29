import fs from 'fs';

const TsunamiCode = `
    initTsunami() {
        if (!this.tsunamiGroup) return;
        this.tsunamiGroup.clear();

        // High resolution plane for breathtaking wave displacement
        const geometry = new THREE.PlaneGeometry(160, 100, 300, 300);
        
        const uniforms = {
            uTime: { value: 0 },
            uNormBass: { value: 0 },
            uColor: { value: new THREE.Color(0x003153) }, // Prussian Blue base
            uSecondaryColor: { value: new THREE.Color(0xFDF5E6) }, // Foam/Cream
            uDeepColor: { value: new THREE.Color(0x000080) } // Deep Navy
        };
        
        const vertexShader = \`
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vViewPosition;
            varying vec3 vWorldPosition;
            
            uniform float uTime;
            uniform float uNormBass;
            
            // Noise function
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
                m = m*m ;
                m = m*m ;
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

            // Gerstner Wave function
            vec3 gWave(vec2 position, float time, float steepness, float amplitude, float frequency, vec2 direction) {
                vec2 d = normalize(direction);
                float f = steepness * amplitude;
                float phase = frequency * dot(d, position) + time;
                
                // Audio reactive amplitude
                float amp = amplitude * (1.0 + uNormBass * 1.5);
                
                return vec3(
                    d.x * (amp * cos(phase)),
                    d.y * (amp * cos(phase)),
                    amp * sin(phase)
                );
            }

            // Cymatics interference pattern
            float cymatics(vec2 pos, float time) {
                float d1 = length(pos - vec2(10.0, 10.0));
                float d2 = length(pos - vec2(-10.0, -10.0));
                float d3 = length(pos - vec2(10.0, -10.0));
                float d4 = length(pos - vec2(-10.0, 10.0));
                
                float freq = 0.5 + uNormBass * 2.0;
                float w1 = sin(d1 * freq - time * 2.0);
                float w2 = sin(d2 * freq - time * 2.2);
                float w3 = sin(d3 * freq - time * 1.8);
                float w4 = sin(d4 * freq - time * 2.1);
                
                return (w1 + w2 + w3 + w4) * 0.25 * uNormBass;
            }

            void main() {
                vUv = uv;
                vec3 pos = position;
                
                // Base swell
                pos += gWave(pos.xy, uTime * 1.5, 1.2, 2.5, 0.15, vec2(1.0, 0.5));
                pos += gWave(pos.xy, uTime * 1.2, 1.5, 1.8, 0.25, vec2(-0.5, 1.0));
                
                // The Great Wave formulation (large central swell)
                float greatWave = snoise(pos.xy * 0.05 - vec2(uTime * 0.5, 0.0));
                // Audio reactivity pumps the crest
                float crest = smoothstep(-0.2, 1.0, greatWave) * (8.0 + uNormBass * 15.0);
                pos.z += crest;
                
                // High frequency Cymatics ripples on the surface
                float cymRipple = cymatics(pos.xy, uTime);
                pos.z += cymRipple * 5.0;

                // Micro surface noise for foam detail
                float micro = snoise(pos.xy * 0.8 + uTime) * 0.5;
                pos.z += micro;

                vElevation = pos.z;
                
                vec4 worldPos = modelMatrix * vec4(pos, 1.0);
                vWorldPosition = worldPos.xyz;
                
                vec4 mvPosition = viewMatrix * worldPos;
                vViewPosition = -mvPosition.xyz;
                
                gl_Position = projectionMatrix * mvPosition;
            }
        \`;
        
        const fragmentShader = \`
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vViewPosition;
            varying vec3 vWorldPosition;
            
            uniform vec3 uColor;
            uniform vec3 uSecondaryColor;
            uniform vec3 uDeepColor;
            uniform float uNormBass;
            uniform float uTime;

            void main() {
                // Compute flat normals using derivatives
                vec3 dx = dFdx(vWorldPosition);
                vec3 dy = dFdy(vWorldPosition);
                vec3 normal = normalize(cross(dx, dy));
                
                // Lighting
                vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
                float diff = max(dot(normal, lightDir), 0.0);
                
                // Specular reflection for wet water look
                vec3 viewDir = normalize(vViewPosition);
                vec3 halfVector = normalize(lightDir + viewDir);
                float spec = pow(max(dot(normal, halfVector), 0.0), 64.0); // high gloss
                
                // Color mapping based on elevation
                // Deep water
                vec3 waterColor = mix(uDeepColor, uColor, smoothstep(-5.0, 2.0, vElevation));
                
                // Foam / Crest
                // Bass pulses create more foam
                float foamThreshold = 4.0 - (uNormBass * 2.0);
                float foamFactor = smoothstep(foamThreshold, foamThreshold + 3.0, vElevation);
                
                // Add some noise to foam edge
                float fNoise = fract(sin(dot(vUv.xy, vec2(12.9898,78.233))) * 43758.5453);
                foamFactor *= (0.8 + 0.2 * fNoise);
                
                vec3 finalColor = mix(waterColor, uSecondaryColor, foamFactor);
                
                // Apply lighting
                finalColor = finalColor * (0.6 + 0.4 * diff) + (spec * 0.3 * vec3(1.0));
                
                // Glow/Fog fade out in distance
                float dist = length(vViewPosition);
                float fog = smoothstep(60.0, 120.0, dist);
                finalColor = mix(finalColor, vec3(0.0), fog);

                gl_FragColor = vec4(finalColor, 1.0 - fog);
            }
        \`;
        
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
        mesh.position.y = -15; // lower to act as an ocean floor/swell
        mesh.position.z = -30; // push back slightly
        
        this.tsunamiGroup.add(mesh);
    }
`;

const file = 'binaural-assets/js/visuals/visualizer_v4.js';
let content = fs.readFileSync(file, 'utf8');

if (content.includes('initTsunami() {')) {
    console.log("initTsunami already exists.");
} else {
    content = content.replace('initSnowflake() {', TsunamiCode + '\n    initSnowflake() {');
    fs.writeFileSync(file, content);
    console.log("Successfully injected initTsunami.");
}
