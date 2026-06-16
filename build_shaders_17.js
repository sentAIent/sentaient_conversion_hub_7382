const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'binaural-assets/js/visuals/CymaticsCore.js');
let code = fs.readFileSync(targetPath, 'utf8');

// 1. Add Palettes
const palettesToAdd = `
    17: [ // 3D Fractal Entities (10)
        [0xff0055, 0x5500ff], // Fractal Heart
        [0x00ffff, 0xff00ff], // Quantum Topology
        [0xff4500, 0xffd700], // Fluid SDF Core
        [0xadff2f, 0x006400], // Particle Swarm
        [0xffffff, 0x0000ff], // Micro Pixel Stardust
        [0xff1493, 0x00ced1], // Harmonic Gradient
        [0x4b0082, 0xffa500], // Folding Hypercube
        [0x00fa9a, 0x191970], // Gyroid Labyrinth
        [0xff8c00, 0x2f4f4f], // Ethereal 3D Lotus
        [0x1e90ff, 0xffd700]  // Cosmic DNA Helix
    ]
`;

// Insert into palettes
code = code.replace(/    \]\n\};\n/g, '    ],\n' + palettesToAdd + '\n};\n');

// 2. Class 17 Shader (3D Fractal Entities & Reactive Swarms)
const class17Shader = `
    } else if (classId === 17) {
        return \`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        #define MAX_STEPS 64
        #define MAX_DIST 10.0
        #define SURF_DIST 0.01

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        // Polynomial smooth min
        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }

        float sdSphere(vec3 p, float s) {
            return length(p) - s;
        }

        float sdBox(vec3 p, vec3 b) {
            vec3 q = abs(p) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }

        float sdTorus(vec3 p, vec2 t) {
            vec2 q = vec2(length(p.xz)-t.x,p.y);
            return length(q)-t.y;
        }

        // Distance estimators for different variations
        float map(vec3 p, int var, float t) {
            float d = MAX_DIST;
            
            if (var == 0) {
                // 3D Fractal Heart
                p.xy *= rot(t*0.5);
                p.yz *= rot(t*0.3);
                vec3 q = p;
                q.y -= length(q.xz)*0.5; // pull down bottom
                q.y += 0.2;
                d = length(q) - 0.5;
                // Add fractal bumps
                for(int i=0; i<3; i++) {
                    p = abs(p)*1.5 - 0.5;
                    p.xy *= rot(t*0.2);
                    p.xz *= rot(t*0.4);
                    d = smin(d, (length(p)-0.3)*pow(1.5, -float(i+1)), 0.1);
                }
            } 
            else if (var == 1) {
                // Quantum Topology
                p.xz *= rot(t*0.4);
                p.yz *= rot(t*0.2);
                float d1 = sdTorus(p, vec2(0.6, 0.1));
                vec3 p2 = p; p2.xy *= rot(1.57); p2.xz *= rot(1.57);
                float d2 = sdTorus(p2, vec2(0.6, 0.1));
                vec3 p3 = p; p3.yz *= rot(1.57); p3.xy *= rot(1.57);
                float d3 = sdTorus(p3, vec2(0.6, 0.1));
                d = min(min(d1, d2), d3);
                // Add center knot
                d = smin(d, sdSphere(p, 0.3 + sin(t*2.0)*0.1), 0.2);
            }
            else if (var == 2) {
                // Fluid SDF Core
                p.xz *= rot(t*0.5);
                float d1 = sdSphere(p - vec3(sin(t)*0.3, cos(t*1.3)*0.3, 0), 0.3);
                float d2 = sdSphere(p - vec3(cos(t*1.1)*0.3, sin(t*0.9)*0.3, sin(t)*0.2), 0.25);
                float d3 = sdSphere(p - vec3(sin(t*0.7)*0.4, cos(t*0.5)*0.4, cos(t)*0.3), 0.35);
                float d4 = sdSphere(p, 0.2);
                d = smin(smin(smin(d1, d2, 0.3), d3, 0.3), d4, 0.4);
            }
            else if (var == 3) {
                // Particle Swarm (Volumetric approximation)
                p.xz *= rot(t*0.3);
                p.xy *= rot(t*0.2);
                vec3 q = p * 4.0;
                float noise = sin(q.x + t)*sin(q.y - t)*sin(q.z + t);
                d = sdSphere(p, 0.6) + noise * 0.15;
            }
            else if (var == 4) {
                // Micro Pixel Stardust
                p.xz *= rot(t);
                p = abs(p) - 0.4;
                for(int i=0; i<4; i++) {
                    p = abs(p) - 0.2;
                    p.xy *= rot(t*0.5);
                    p.xz *= rot(t*0.5);
                }
                d = length(p) - 0.05;
            }
            else if (var == 5) {
                // Harmonic Gradient
                p.xy *= rot(t);
                p.yz *= rot(t*0.5);
                float r = length(p);
                float d1 = sdBox(p, vec3(0.4)) - 0.1;
                float d2 = sdSphere(p, 0.55 + sin(r*10.0 - t*3.0)*0.05);
                d = mix(d1, d2, sin(t)*0.5+0.5);
            }
            else if (var == 6) {
                // Folding Hypercube
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.3);
                vec3 q = abs(p) - 0.4;
                d = sdBox(q, vec3(0.1));
                q = abs(q) - 0.2;
                d = min(d, sdBox(q, vec3(0.05)));
            }
            else if (var == 7) {
                // Gyroid Labyrinth
                p.xz *= rot(t*0.2);
                vec3 q = p * 5.0;
                float gyroid = dot(sin(q), cos(q.zxy));
                d = sdSphere(p, 0.8) + gyroid * 0.05;
            }
            else if (var == 8) {
                // Ethereal 3D Lotus
                p.xz *= rot(t*0.3);
                float a = atan(p.z, p.x);
                float r = length(p.xz);
                float petals = sin(a * 6.0 + t*2.0);
                vec3 q = p;
                q.y += r*r*1.5; // fold upwards
                d = length(q) - 0.4 - petals*0.1;
                d = max(d, -sdSphere(p - vec3(0,0.5,0), 0.6));
            }
            else {
                // Cosmic DNA Helix
                p.yz *= rot(t*0.2);
                float a = p.y * 3.0 + t*2.0;
                vec3 p1 = vec3(p.x - cos(a)*0.3, p.y, p.z - sin(a)*0.3);
                vec3 p2 = vec3(p.x + cos(a)*0.3, p.y, p.z + sin(a)*0.3);
                float d1 = length(p1) - 0.1;
                float d2 = length(p2) - 0.1;
                float bridges = length(vec2(length(p.xz), mod(p.y, 0.4)-0.2)) - 0.05;
                d = smin(smin(d1, d2, 0.1), bridges, 0.05);
                d = max(d, sdSphere(p, 0.9)); // bound
            }
            
            return d;
        }

        vec3 getNormal(vec3 p, int var, float t) {
            float d = map(p, var, t);
            vec2 e = vec2(0.001, 0);
            vec3 n = d - vec3(
                map(p-e.xyy, var, t),
                map(p-e.yxy, var, t),
                map(p-e.yyx, var, t)
            );
            return normalize(n);
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            float t = uTime;
            int var = int(floor(uVariation));

            // Camera setup
            vec3 ro = vec3(0.0, 0.0, -2.5); // Ray origin
            vec3 rd = normalize(vec3(uv, 1.0)); // Ray direction

            float dO = 0.0; // Distance origin
            vec3 p;
            
            // Raymarching loop
            for(int i=0; i<MAX_STEPS; i++) {
                p = ro + rd * dO;
                float dS = map(p, var, t); // Distance scene
                dO += dS;
                if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
            }

            vec3 col = vec3(0.0);
            
            if(dO < MAX_DIST) {
                // Hit something!
                vec3 n = getNormal(p, var, t);
                
                // Lighting
                vec3 lightDir = normalize(vec3(1.0, 2.0, -1.0));
                float dif = clamp(dot(n, lightDir), 0.0, 1.0);
                
                // Fresnel for glowing edges
                float fresnel = pow(1.0 + dot(rd, n), 2.0);
                
                // Add some fake ambient occlusion based on ray steps
                float ao = 1.0 - (float(MAX_STEPS) / 64.0)*0.5; // Mock
                
                // Color mapping
                vec3 baseCol = mix(uColor1, uColor2, clamp(p.y*0.5+0.5, 0.0, 1.0));
                
                col = baseCol * dif * 0.8 + baseCol * fresnel * 1.5;
                col += uColor1 * 0.2; // Ambient glow
            } else {
                // Background glow based on distance to center
                float glow = 1.0 / (1.0 + length(uv)*3.0);
                col = uColor2 * glow * 0.2;
            }
            
            // Post-processing
            col *= uIntensity * 1.2;
            
            // Gamma correction
            col = pow(col, vec3(0.4545));
            
            gl_FragColor = vec4(col, 1.0);
        }
        \`;
`;

// Insert the new shader SAFLY by splitting at the LAST occurrence of '    } else {'
const injection = class17Shader + '    } else {';
const parts = code.split('    } else {');

if (parts.length > 1) {
    let newCode = parts[0];
    for (let i = 1; i < parts.length - 1; i++) {
        newCode += '    } else {' + parts[i];
    }
    // Only replace the last occurrence
    newCode += injection + parts[parts.length - 1];
    
    // Update loop limit from 16 to 17
    newCode = newCode.replace(/for \(let i = 1; i <= 16; i\+\+\) \{/g, 'for (let i = 1; i <= 17; i++) {');
    // If it was somehow 13, fix it
    newCode = newCode.replace(/for \(let i = 1; i <= 13; i\+\+\) \{/g, 'for (let i = 1; i <= 17; i++) {');
    
    fs.writeFileSync(targetPath, newCode);
    console.log("CymaticsCore.js patched SAFELY with Class 17.");
} else {
    console.log("Error: Could not find '    } else {' to inject shaders.");
}
