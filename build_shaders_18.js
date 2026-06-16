const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'binaural-assets/js/visuals/CymaticsCore.js');
let code = fs.readFileSync(targetPath, 'utf8');

// 1. Add Palettes for Class 18
const palettesToAdd = `
    18: [ // Hyper-Complex 3D Entities (10)
        [0xff00ff, 0x00ffff], // Mandelbulb Core
        [0xff1493, 0xffd700], // Symbiotic Möbius Knots
        [0xff0000, 0x8b0000], // Advanced Fractal Heart
        [0x00fa9a, 0x0000cd], // Infinite SDF Engine
        [0x9400d3, 0x32cd32], // Organic Alien Artifact
        [0x00bfff, 0xff00ff], // Quantum Tesseract
        [0xffffff, 0x87cefa], // Recursive Crystal Lattice
        [0x4b0082, 0xff69b4], // Ethereal 3D Neural Web
        [0xff4500, 0xffff00], // Hyper-Toroid Swarm
        [0x191970, 0xadff2f]  // The Chronos Sphere
    ]
`;

// Insert into palettes
code = code.replace(/    \]\n\};\n/g, '    ],\n' + palettesToAdd + '\n};\n');

// 2. Class 18 Shader (Hyper-Complex 3D Entities)
const class18Shader = `
    } else if (classId === 18) {
        return \`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        #define MAX_STEPS 80
        #define MAX_DIST 15.0
        #define SURF_DIST 0.005

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        // Polynomial smooth min
        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }
        
        // Mandelbulb distance estimator
        float sdMandelbulb(vec3 p, float t) {
            vec3 z = p;
            float dr = 1.0;
            float r = 0.0;
            float Power = 8.0 + sin(t*0.5)*2.0;
            for (int i = 0; i < 4; i++) {
                r = length(z);
                if (r>1.5) break;
                // convert to polar coordinates
                float theta = acos(z.z/r);
                float phi = atan(z.y,z.x);
                dr = pow(r, Power-1.0)*Power*dr + 1.0;
                
                // scale and rotate the point
                float zr = pow(r,Power);
                theta = theta*Power;
                phi = phi*Power;
                
                // convert back to cartesian coordinates
                z = zr*vec3(sin(theta)*cos(phi), sin(phi)*sin(theta), cos(theta));
                z += p;
            }
            return 0.5*log(r)*r/dr;
        }

        float sdBox(vec3 p, vec3 b) {
            vec3 q = abs(p) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }

        float sdSphere(vec3 p, float s) { return length(p) - s; }

        float sdTorus(vec3 p, vec2 t) {
            vec2 q = vec2(length(p.xz)-t.x,p.y);
            return length(q)-t.y;
        }

        // Distance estimators for different variations
        float map(vec3 p, int var, float t) {
            float d = MAX_DIST;
            
            if (var == 0) {
                // Mandelbulb Core
                p.xy *= rot(t*0.3);
                p.xz *= rot(t*0.5);
                d = sdMandelbulb(p, t);
            } 
            else if (var == 1) {
                // Symbiotic Möbius Knots
                p.xz *= rot(t*0.4);
                p.yz *= rot(t*0.2);
                float a = atan(p.z, p.x);
                float r = length(p.xz) - 0.6;
                vec2 torus = vec2(r, p.y);
                torus *= rot(a * 3.0 + t); // Twist
                d = length(torus) - 0.15;
                // Add second twisted ring
                torus = vec2(r, p.y);
                torus *= rot(a * -3.0 - t);
                float d2 = length(torus) - 0.15;
                d = smin(d, d2, 0.2);
            }
            else if (var == 2) {
                // Advanced Fractal Heart
                p.xy *= rot(t*0.5);
                p.yz *= rot(t*0.3);
                vec3 q = p;
                q.y -= length(q.xz)*0.6;
                q.y += 0.2;
                d = length(q) - 0.5;
                for(int i=0; i<4; i++) {
                    p = abs(p)*1.6 - 0.4;
                    p.xy *= rot(t*0.3);
                    p.xz *= rot(t*0.5);
                    float tube = length(p.xz) - 0.1;
                    d = smin(d, tube*pow(1.6, -float(i+1)), 0.05);
                }
            }
            else if (var == 3) {
                // Infinite SDF Engine
                p.xz *= rot(t*0.2);
                vec3 q = p;
                // Polar repetition
                float a = atan(q.z, q.x);
                float r = length(q.xz);
                float segments = 8.0;
                a = mod(a, 6.28318/segments) - 3.14159/segments;
                q.x = r*cos(a); q.z = r*sin(a);
                q.x -= 0.6;
                q.xy *= rot(t*2.0); // Spinning gears
                d = sdBox(q, vec3(0.2, 0.05, 0.1));
                // Center core
                d = min(d, length(p) - 0.4);
                // Subtractions
                d = max(d, -(length(p.xz) - 0.2));
            }
            else if (var == 4) {
                // Organic Alien Artifact
                p.xz *= rot(t*0.4);
                p.yz *= rot(t*0.3);
                float r = length(p);
                d = r - 0.6;
                d += sin(p.x*10.0)*sin(p.y*10.0)*sin(p.z*10.0)*0.1;
                // Fold space
                p = abs(p) - 0.2;
                d = smin(d, length(p)-0.3, 0.2);
                // Ribbing
                d += sin(r*40.0 - t*5.0)*0.02;
            }
            else if (var == 5) {
                // Quantum Tesseract (4D projection)
                p.xz *= rot(t*0.6);
                p.yz *= rot(t*0.4);
                p.xy *= rot(t*0.2);
                vec3 q = abs(p) - 0.5;
                float box1 = sdBox(q, vec3(0.05));
                q = abs(p) - 0.25;
                float box2 = sdBox(q, vec3(0.05));
                d = min(box1, box2);
                // Connecting struts
                float strut = sdBox(p, vec3(0.02, 0.02, 0.6));
                d = min(d, strut);
                strut = sdBox(p, vec3(0.6, 0.02, 0.02));
                d = min(d, strut);
                strut = sdBox(p, vec3(0.02, 0.6, 0.02));
                d = smin(d, strut, 0.1);
            }
            else if (var == 6) {
                // Recursive Crystal Lattice
                p.xz *= rot(t*0.2);
                for(int i=0; i<4; i++) {
                    p = abs(p) - 0.3;
                    p.xy *= rot(0.5 + t*0.1);
                    p.xz *= rot(0.5 - t*0.1);
                }
                d = sdBox(p, vec3(0.1));
                d = max(d, length(p)-0.15); // cut edges
            }
            else if (var == 7) {
                // Ethereal 3D Neural Web
                p.xz *= rot(t*0.2);
                vec3 q = p * 3.0;
                float noise = dot(sin(q), cos(q.zxy));
                d = length(p) - 0.6 + noise * 0.2;
                d = max(d, -sdSphere(p, 0.4)); // hollow out
                // add glowing nodes
                d = min(d, length(p - vec3(sin(t)*0.3, cos(t)*0.3, 0)) - 0.1);
            }
            else if (var == 8) {
                // Hyper-Toroid Swarm
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.2);
                d = sdTorus(p, vec2(0.6, 0.05));
                vec3 p2 = p; p2.xy *= rot(1.57); p2.xz *= rot(1.57);
                d = smin(d, sdTorus(p2, vec2(0.5, 0.05)), 0.1);
                vec3 p3 = p; p3.yz *= rot(1.57); p3.xy *= rot(1.57);
                d = smin(d, sdTorus(p3, vec2(0.4, 0.05)), 0.1);
                // Swarm
                vec3 q = mod(p*5.0 - t, 1.0) - 0.5;
                float swarm = length(q) - 0.05;
                d = smin(d, max(swarm, length(p)-0.8), 0.2);
            }
            else {
                // The Chronos Sphere
                p.xz *= rot(t*0.3);
                p.yz *= rot(t*0.1);
                float r = length(p);
                d = abs(r - 0.7) - 0.05; // outer shell
                // carve longitude/latitude
                d = max(d, -(abs(p.y)-0.02)); 
                d = max(d, -(abs(p.x)-0.02));
                // Inner rotating core
                vec3 p2 = p;
                p2.xy *= rot(-t*0.8);
                p2.xz *= rot(-t*0.5);
                float core = sdBox(p2, vec3(0.3));
                d = min(d, core);
                // Interlocking ring
                d = min(d, sdTorus(p2, vec2(0.4, 0.02)));
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
                
                // Ambient occlusion
                float ao = 1.0 - (float(MAX_STEPS) / 80.0)*0.7;
                
                // Advanced Color mapping based on position and normal
                vec3 baseCol = mix(uColor1, uColor2, clamp(p.y*0.5+0.5 + n.x*0.2, 0.0, 1.0));
                
                col = baseCol * dif * 0.9 + baseCol * fresnel * 2.0;
                col += uColor1 * 0.3 * (1.0 - dif); // Ambient glow in shadows
                
                // Specular highlight
                vec3 ref = reflect(rd, n);
                float spec = pow(max(dot(ref, lightDir), 0.0), 32.0);
                col += vec3(1.0) * spec * 0.8;
            } else {
                // Deep space volumetric glow
                float glow = 1.0 / (1.0 + length(uv)*2.5);
                col = uColor2 * glow * 0.3 + uColor1 * pow(glow, 3.0) * 0.5;
            }
            
            // Post-processing intensity
            col *= uIntensity * 1.2;
            
            // Gamma correction
            col = pow(col, vec3(0.4545));
            
            gl_FragColor = vec4(col, 1.0);
        }
        \`;
`;

// Insert the new shader SAFLY by splitting at the LAST occurrence of '    } else {'
const injection = class18Shader + '    } else {';
const parts = code.split('    } else {');

if (parts.length > 1) {
    let newCode = parts[0];
    for (let i = 1; i < parts.length - 1; i++) {
        newCode += '    } else {' + parts[i];
    }
    // Only replace the last occurrence
    newCode += injection + parts[parts.length - 1];
    
    // Update loop limit from 17 to 18
    newCode = newCode.replace(/for \(let i = 1; i <= 17; i\+\+\) \{/g, 'for (let i = 1; i <= 18; i++) {');
    
    fs.writeFileSync(targetPath, newCode);
    console.log("CymaticsCore.js patched SAFELY with Class 18.");
} else {
    console.log("Error: Could not find '    } else {' to inject shaders.");
}
