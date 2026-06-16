const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'binaural-assets/js/visuals/CymaticsCore.js');
let code = fs.readFileSync(targetPath, 'utf8');

// 1. Add Palettes
const palettesToAdd = `
    11: [ // Sacred Runes (10)
        [0xffa500, 0x8b0000], [0x00ffff, 0x00008b], [0xff1493, 0x4b0082], [0x32cd32, 0x006400],
        [0xffd700, 0x2f4f4f], [0xff00ff, 0x191970], [0x00fa9a, 0x008080], [0xff4500, 0x8b4513],
        [0x1e90ff, 0x000000], [0xffff00, 0xb8860b]
    ],
    12: [ // Wireframe Topologies (10)
        [0x00ff00, 0x000000], [0xff00ff, 0x000000], [0x00ffff, 0x000000], [0xffff00, 0x000000],
        [0xff0000, 0x000000], [0x0000ff, 0x000000], [0xffa500, 0x000000], [0x1e90ff, 0x000000],
        [0x32cd32, 0x000000], [0xff1493, 0x000000]
    ],
    13: [ // Ethereal Plasma & Smoke (10)
        [0xe6e6fa, 0x4b0082], [0xffb6c1, 0x8b0000], [0xe0ffff, 0x008080], [0xfffacd, 0x8b4513],
        [0xdda0dd, 0x483d8b], [0x98fb98, 0x2e8b57], [0x87cefa, 0x191970], [0xffdab9, 0xd2691e],
        [0xf08080, 0x800000], [0x20b2aa, 0x00008b]
    ]
`;

code = code.replace(/    \]\n\};\n/g, '    ],\n' + palettesToAdd + '\n};\n');

// 2. Class 11 Shader (Sacred Runes / Cyber Glyphs)
const class11Shader = `
    } else if (classId === 11) {
        return \`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float manhattan(vec2 p) { return abs(p.x) + abs(p.y); }

        void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            if (var == 0) {
                // Diamond Matrix
                vec2 q = fract(p * 5.0) - 0.5;
                f = smoothstep(0.05, 0.02, abs(manhattan(q) - 0.3));
            } else if (var == 1) {
                // Cyber Maze
                vec2 q = p * 4.0;
                vec2 i = floor(q); vec2 fr = fract(q);
                float h = hash(i);
                if (h > 0.5) f = smoothstep(0.05, 0.0, abs(fr.x - fr.y));
                else f = smoothstep(0.05, 0.0, abs(fr.x + fr.y - 1.0));
                f *= sin(t + length(i));
            } else if (var == 2) {
                // Radial Runes
                float a = atan(p.y, p.x);
                float r = length(p);
                float stepA = floor(a * 10.0) / 10.0;
                float rune = hash(vec2(stepA, floor(r * 5.0 - t)));
                f = (rune > 0.6) ? smoothstep(0.05, 0.0, abs(fract(r * 5.0 - t) - 0.5)) : 0.0;
            } else if (var == 3) {
                // Geometric Stepping
                vec2 q = floor(p * 8.0) / 8.0;
                f = smoothstep(0.05, 0.0, abs(manhattan(p) - length(q) - sin(t)*0.2));
            } else if (var == 4) {
                // Alien Circuit
                vec2 q = p * vec2(8.0, 4.0);
                vec2 fq = fract(q) - 0.5;
                f = smoothstep(0.05, 0.0, min(abs(fq.x), abs(fq.y)));
                f *= hash(floor(q)) > 0.5 ? 1.0 : 0.0;
            } else if (var == 5) {
                // Chevron Sigils
                float y = p.y + abs(p.x)*2.0;
                f = smoothstep(0.05, 0.0, abs(fract(y*4.0 - t) - 0.5));
            } else if (var == 6) {
                // Techno Rings
                float r = max(abs(p.x), abs(p.y));
                float rStep = floor(r * 10.0);
                f = (hash(vec2(rStep)) > 0.3) ? smoothstep(0.05, 0.0, abs(fract(r * 10.0 - t) - 0.5)) : 0.0;
            } else if (var == 7) {
                // Glyph Cluster
                vec2 q = fract(p * 3.0) - 0.5;
                float d = manhattan(q);
                f = smoothstep(0.02, 0.0, abs(d - 0.3)) + smoothstep(0.02, 0.0, abs(d - 0.15));
            } else if (var == 8) {
                // Diagonal Tech Lines
                float d = p.x + p.y;
                f = smoothstep(0.05, 0.0, abs(fract(d * 10.0 + t) - 0.5)) * sign(sin(p.x*20.0));
            } else {
                // Core Sigil
                float d = manhattan(p);
                f = smoothstep(0.02, 0.0, abs(d - 0.5)) + smoothstep(0.02, 0.0, abs(d - 0.4 + sin(t*5.0)*0.05));
                float a = atan(p.y, p.x);
                f *= sin(a*8.0);
            }
            
            vec3 col = mix(uColor1, uColor2, abs(p.x)) * abs(f) * uIntensity * 1.5;
            gl_FragColor = vec4(col, 1.0);
        }
        \`;
`;

// 3. Class 12 Shader (Wireframe Topologies)
const class12Shader = `
    } else if (classId === 12) {
        return \`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            float lw = 0.03; // Line width
            
            if (var == 0) {
                // 3D Perspective Grid
                vec2 q = vec2(p.x / (abs(p.y) + 0.1), 1.0 / (abs(p.y) + 0.1) - t);
                f = smoothstep(lw, 0.0, abs(fract(q.x) - 0.5)) + smoothstep(lw, 0.0, abs(fract(q.y) - 0.5));
                f *= p.y < 0.0 ? 1.0 : 0.0; // Only bottom half
            } else if (var == 1) {
                // Spherical Grid
                float r = length(p);
                vec2 uvSphere = p / sqrt(1.0 - r*r);
                if(r < 1.0) {
                    f = smoothstep(lw, 0.0, abs(fract(uvSphere.x * 5.0 + t) - 0.5)) + 
                        smoothstep(lw, 0.0, abs(fract(uvSphere.y * 5.0) - 0.5));
                }
            } else if (var == 2) {
                // Torus Illusion
                float r = length(p);
                float a = atan(p.y, p.x);
                float dist = abs(r - 0.5);
                f = smoothstep(lw, 0.0, abs(fract(dist * 10.0) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(a * 5.0 / 3.1415 + t) - 0.5));
            } else if (var == 3) {
                // Wavy Retro Grid
                vec2 q = p;
                q.y += sin(q.x * 5.0 + t) * 0.2;
                f = smoothstep(lw, 0.0, abs(fract(q.x * 10.0) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y * 10.0) - 0.5));
            } else if (var == 4) {
                // Polar Grid
                float r = length(p);
                float a = atan(p.y, p.x);
                f = smoothstep(lw, 0.0, abs(fract(r * 10.0 - t) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(a * 4.0 / 3.1415) - 0.5));
            } else if (var == 5) {
                // Hyperspace Tunnel
                float r = length(p);
                float a = atan(p.y, p.x);
                vec2 q = vec2(a / 3.1415, 0.1 / r - t);
                f = smoothstep(lw, 0.0, abs(fract(q.x * 10.0) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y * 5.0) - 0.5));
            } else if (var == 6) {
                // Isometric Cubes
                vec2 q = vec2(p.x + p.y*0.5, p.x - p.y*0.5) * 5.0;
                f = smoothstep(lw, 0.0, abs(fract(q.x + t) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y - t) - 0.5));
            } else if (var == 7) {
                // Spiral Web
                float r = length(p);
                float a = atan(p.y, p.x);
                f = smoothstep(lw, 0.0, abs(fract(r * 10.0 - a - t) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(r * 10.0 + a + t) - 0.5));
            } else if (var == 8) {
                // Folding Plane
                vec2 q = p;
                q.x = abs(q.x);
                q.y += q.x * 0.5;
                f = smoothstep(lw, 0.0, abs(fract(q.x * 8.0 - t) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y * 8.0) - 0.5));
            } else {
                // Magnetic Field Grid
                vec2 q = p;
                float d = length(q - vec2(sin(t)*0.5, 0.0));
                f = smoothstep(lw, 0.0, abs(fract(q.x * 10.0 + d) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y * 10.0 + d) - 0.5));
            }
            
            f = clamp(f, 0.0, 1.0);
            vec3 col = mix(uColor1, uColor2, length(p)) * f * uIntensity * 1.2;
            gl_FragColor = vec4(col, 1.0);
        }
        \`;
`;

// 4. Class 13 Shader (Ethereal Plasma & Smoke)
const class13Shader = `
    } else if (classId === 13) {
        return \`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float noise(vec2 p) {
            vec2 i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),
                       mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
        }
        float fbm(vec2 p) {
            float f = 0.0; float w = 0.5;
            for(int i=0; i<5; i++) { f += w * noise(p); p *= 2.0; w *= 0.5; }
            return f;
        }

        void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * 0.2;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            if (var == 0) {
                // Ghost Nebula
                vec2 q = p;
                q.x += fbm(p*2.0 + t);
                f = fbm(q*3.0 - t);
            } else if (var == 1) {
                // Whispering Smoke
                float n = fbm(p*4.0 - vec2(0.0, t*2.0));
                f = smoothstep(0.2, 0.8, n) * exp(-length(p)*2.0);
            } else if (var == 2) {
                // Plasma Core
                vec2 q = p;
                q += vec2(sin(t), cos(t)) * 0.2;
                f = 0.1 / (abs(length(q) - fbm(p*5.0 + t)*0.5) + 0.05);
            } else if (var == 3) {
                // Deep Ink Cloud
                f = fbm(p*3.0 + fbm(p*2.0 - t));
            } else if (var == 4) {
                // Bioluminescent Plankton
                f = fbm(p*10.0 + t) * fbm(p*2.0 - t*0.5);
                f = pow(f, 3.0) * 10.0;
            } else if (var == 5) {
                // Spirit Vortex
                float a = atan(p.y, p.x);
                float r = length(p);
                f = fbm(vec2(a*2.0 + t, r*4.0 - t));
                f *= exp(-r*r*4.0);
            } else if (var == 6) {
                // Sheer Fabric
                float w = sin(p.x*3.0 + t) + cos(p.y*2.0 - t);
                f = fbm(p*2.0 + w);
            } else if (var == 7) {
                // Astral Projection
                f = fbm(p*4.0 + vec2(fbm(p*3.0+t), fbm(p*3.0-t)));
            } else if (var == 8) {
                // Phantom Ring
                float r = length(p);
                f = fbm(p*5.0) * exp(-pow(r - 0.5, 2.0)*10.0);
            } else {
                // Aether Drift
                vec2 dir = vec2(1.0, 0.5);
                f = fbm(p*3.0 - dir*t) * fbm(p*5.0 + dir*t*0.5);
            }
            
            f = clamp(f, 0.0, 1.0);
            vec3 col = mix(uColor1, uColor2, fbm(p+t)) * f * uIntensity * 1.5;
            gl_FragColor = vec4(col, 1.0);
        }
        \`;
`;

// Insert the new shaders
code = code.replace(/    \} else \{/g, class11Shader + class12Shader + class13Shader + '    } else {');

// Update loop limit from 10 to 13
code = code.replace(/for \(let i = 1; i <= 10; i\+\+\) \{/g, 'for (let i = 1; i <= 13; i++) {');

fs.writeFileSync(targetPath, code);
console.log("CymaticsCore.js patched with 30 unique, hard-branched shader formulas for Classes 11, 12, 13.");
