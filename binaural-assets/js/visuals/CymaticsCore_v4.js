import * as THREE from '../vendor/three.module.js';
import { state, THEMES, els } from '../state.js';

const CYMATICS_PALETTES = {
    1: [ // Fractal Interference (14)
        [0x22d3ee, 0x818cf8], [0x34d399, 0x059669], [0xfbb117, 0xe11d48], [0xf472b6, 0x8b5cf6],
        [0x60a9ff, 0xa855f7], [0xfacc15, 0xeab308], [0x4ade80, 0x0ea5e9], [0x94a3b8, 0x475569],
        [0xf87171, 0x991b1b], [0xc084fc, 0x4c1d95], [0x38bdf8, 0x0369a1], [0xfb923c, 0xc2410c],
        [0xa3e635, 0x4d7c0f], [0xe879f9, 0x86198f]
    ],
    2: [ // Particle Resonance (12)
        [0x14b8a6, 0x0f766e], [0x6366f1, 0x4338ca], [0xf43f5e, 0xbe123c], [0xa855f7, 0x7e22ce],
        [0x84cc16, 0x4d7c0f], [0x0ea5e9, 0x0369a1], [0xf59e0b, 0xb45309], [0x10b981, 0x047857],
        [0xec4899, 0xbe185d], [0x8b5cf6, 0x6d28d9], [0xeab308, 0xa16207], [0x06b6d4, 0x0891b2]
    ],
    3: [ // Fluid SDF (10)
        [0x3b82f6, 0x1e3a8a], [0x10b981, 0x064e3b], [0x8b5cf6, 0x4c1d95], [0xf97316, 0x7c2d12],
        [0x06b6d4, 0x164e63], [0xd946ef, 0x701a75], [0xeab308, 0x713f12], [0x14b8a6, 0x134e4a],
        [0xf43f5e, 0x881337], [0x6366f1, 0x312e81]
    ],
    4: [ // Quantum Topology (8)
        [0xffffff, 0x000000], [0x22d3ee, 0x1e1b4b], [0xf472b6, 0x4a044e], [0xfcd34d, 0x451a03],
        [0x6ee7b7, 0x022c22], [0x93c5fd, 0x172554], [0xfca5a5, 0x450a0a], [0xc4b5fd, 0x2e1065]
    ],
    5: [ // Sacred Geometry (10)
        [0xffd700, 0xb8860b], [0xff69b4, 0xc71585], [0x00ffff, 0x008b8b], [0x7cfc00, 0x228b22],
        [0xffa500, 0xff4500], [0xba55d3, 0x4b0082], [0x00fa9a, 0x2e8b57], [0xff1493, 0x8b0000],
        [0x1e90ff, 0x00008b], [0xfffacd, 0x8b8000]
    ],
    6: [ // Bioluminescent Neural (10)
        [0x00ff00, 0x003300], [0x00ffff, 0x000033], [0xff00ff, 0x330033], [0xccff00, 0x333300],
        [0x00ffcc, 0x003333], [0xff3366, 0x330000], [0x33ccff, 0x001133], [0xcc00ff, 0x110033],
        [0x66ff33, 0x113300], [0xffcc00, 0x331100]
    ],
    7: [ // Starburst / Supernova (10)
        [0xffffff, 0xffd700], [0xff4500, 0x8b0000], [0x00ffff, 0x0000ff], [0xff1493, 0x4b0082],
        [0x7fff00, 0x006400], [0xff00ff, 0x8a2be2], [0x1e90ff, 0x191970], [0xff6347, 0x800000],
        [0x00fa9a, 0x008080], [0xfffacd, 0xff8c00]
    ],

    8: [ // Asymmetrical Flow (10)
        [0xff6347, 0x4682b4], [0xffd700, 0x8a2be2], [0x00fa9a, 0xff1493], [0xff4500, 0x2e8b57],
        [0x00ffff, 0xcd5c5c], [0xff00ff, 0x7b68ee], [0x32cd32, 0xff8c00], [0x00ced1, 0x8b0000],
        [0xffb6c1, 0x0000cd], [0xadff2f, 0x4b0082]
    ],
    9: [ // Heavy Brutalism (10)
        [0x8b0000, 0x000000], [0x2f4f4f, 0xff8c00], [0x191970, 0xffffff], [0x4b0082, 0x32cd32],
        [0x556b2f, 0xff00ff], [0x800000, 0x00ffff], [0x000080, 0xffd700], [0x2e8b57, 0xff1493],
        [0x483d8b, 0xff4500], [0x8b4513, 0x00fa9a]
    ],
    10: [ // Pixel Swarm (10)
        [0x00ff00, 0xff00ff], [0x00ffff, 0xff4500], [0xffd700, 0x0000ff], [0xff1493, 0x32cd32],
        [0x7fff00, 0x8a2be2], [0xff8c00, 0x00ced1], [0x00fa9a, 0xff0000], [0x1e90ff, 0xffb6c1],
        [0xff00ff, 0x00ff00], [0xffff00, 0x8b0000]
    ],

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
    ],
    14: [ // Sacred Geometry Vectors (10)
        [0xffd700, 0x000000], [0x00ffff, 0x000080], [0xff00ff, 0x4b0082], [0x00ff00, 0x006400],
        [0xff4500, 0x8b0000], [0x1e90ff, 0x191970], [0xff1493, 0x800080], [0x7fff00, 0x2e8b57],
        [0x00fa9a, 0x008080], [0xffa500, 0x8b4513]
    ],
    15: [ // Retro-Wave Topologies (10)
        [0xff00ff, 0x00ffff], [0xff1493, 0x1e90ff], [0xffa500, 0x800080], [0x00ff00, 0xff00ff],
        [0xffff00, 0xff4500], [0x00ffff, 0x4b0082], [0xff69b4, 0x00ced1], [0x7fff00, 0xff1493],
        [0x00fa9a, 0xff8c00], [0x1e90ff, 0xff0000]
    ],
    16: [ // Nano-Robotic Structures (10)
        [0xc0c0c0, 0x000000], [0x808080, 0x00ff00], [0xa9a9a9, 0x00ffff], [0x696969, 0xff00ff],
        [0x778899, 0xffa500], [0x708090, 0xff1493], [0x2f4f4f, 0x32cd32], [0x000000, 0xff0000],
        [0xdcdcdc, 0x0000ff], [0xd3d3d3, 0x8b0000]
    ],
    17: [ // Raymarched Infinite Tunnels (10)
        [0xff00ff, 0x00ffff], [0xff1493, 0x191970], [0x00ff00, 0x006400], [0xffa500, 0x8b0000],
        [0x00ffff, 0x000080], [0xff0000, 0x8b4513], [0x32cd32, 0x2e8b57], [0x1e90ff, 0x4b0082],
        [0xffff00, 0xd2691e], [0xff69b4, 0x800080]
    ],
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
    ],
    19: [ // Premium 3D State of the Art (6)
        [0xa855f7, 0x3b82f6], [0xec4899, 0x6366f1], [0x14b8a6, 0x0ea5e9],
        [0xf43f5e, 0x8b5cf6], [0xeab308, 0x10b981], [0x06b6d4, 0x3b82f6]
    ],
    20: [ // Sacred Reference Cymatics (6)
        [0xf43f5e, 0xbe123c], // Heart
        [0x3b82f6, 0x1e3a8a], // Fluid
        [0x10b981, 0x064e3b], // Swarm
        [0x8b5cf6, 0x4c1d95], // Topology
        [0xf97316, 0x7c2d12], // Prime
        [0xeab308, 0x713f12]  // Metatron
    ],
    21: [ // True Reference Cymatics (3D Raymarched)
        [0x00ffff, 0xff00ff], // Heart
        [0x3b82f6, 0x1e3a8a], // Fluid
        [0xffd700, 0xb8860b], // Swarm
        [0xff4500, 0x8b0000], // Topology
        [0xec4899, 0x8b5cf6], // Prime
        [0x06b6d4, 0x1d4ed8]  // Metatron
    ],
    22: [ // True Image-Based Cymatics
        [0x00ffff, 0xff00ff],
        [0x3b82f6, 0x1e3a8a],
        [0xffd700, 0xb8860b],
        [0xff4500, 0x8b0000],
        [0xec4899, 0x8b5cf6],
        [0x06b6d4, 0x1d4ed8],
        // --- High-End Class 22 Additions ---
        [0xffd700, 0x1a1a1a], // 6: Obsidian & Gold
        [0x00e5ff, 0x000033], // 7: Bioluminescent Abyssal Web
        [0xff00ff, 0xff8c00], // 8: Nebula Core Plasma
        [0x00ff7f, 0x002200], // 9: Sacred Emerald Matrix
        [0xc0c0c0, 0x8b0000], // 10: Liquid Mercury & Crimson
        [0xe0ffff, 0x0000cd], // 11: Quantum Crystal Lattice
        [0xffff00, 0xff4500], // 12: Solar Flare Harmonics
        [0x9400d3, 0xff1493], // 13: Hyper-dimensional Amethyst
        
        // --- 9 Newest Class 22 Additions ---
        [0xff69b4, 0x8a2be2], // 14: Astral Lotus
        [0xffd700, 0x00ffff], // 15: Celestial Mandala
        [0x4169e1, 0xffffff], // 16: Quantum Flower
        [0x20b2aa, 0xc0c0c0], // 17: Ethereal Nexus
        [0x39ff14, 0xff00ff], // 18: Neon Labyrinth
        [0xffffff, 0xff1493], // 19: Prismatic Core
        [0x000000, 0xdc143c], // 20: Obsidian Bloom
        [0x4b0082, 0x0a0a0a], // 21: Void Resonance
        [0xffa500, 0xffd700], // 22: Golden Ratio Spiral
        
        // --- Final 7 Masterworks ---
        [0xff4500, 0xffd700], // 23: Sacred Sun Resonance
        [0x00bfff, 0x191970], // 24: Lunar Tides
        [0xff1493, 0x00ff00], // 25: Cybernetic Lotus
        [0xadff2f, 0x800080], // 26: Bioluminescent Shroom
        [0x8a2be2, 0x000000], // 27: Vortex of Time
        [0xffffff, 0xe0ffff], // 28: Diamond Lattice
        [0xffd700, 0xffffff]  // 29: Seraphim Wings
    ],
    23: [
        [0xff00ff, 0x00ffff],
        [0xffd700, 0xb8860b],
        [0xff4500, 0x8b0000],
        [0xec4899, 0x8b5cf6]
    ],
    24: [ // Cosmic Constellations (3-Layer Modular)
        [0x00ffff, 0x1e3a8a], // 0: Bear
        [0xffd700, 0xb8860b], // 1: Lion
        [0x39ff14, 0x006400], // 2: Dragon
        [0xff4500, 0x8b0000], // 3: Tiger
        [0xffffff, 0xc0c0c0]  // 4: Eagle
    ],
    25: [ // Quantum Double-Slit (Class 25)
        [0x60a9ff, 0xa855f7]
    ]
};


const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    // Bypass camera matrices to draw a perfect full-screen quad behind other elements
    gl_Position = vec4(position.xy, 0.9, 1.0);
}
`;

const getFragmentShader = (classId) => {
    // 1: Fractal Interference, 2: Particle Resonance, 3: Fluid SDF, 4: Quantum Topology
    if (classId === 1) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        vec2 rotate(vec2 p, float a) {
            float c = cos(a), s = sin(a);
            return mat2(c, -s, s, c) * p;
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            p = rotate(p, uTime * 0.1);
            
            // Determine symmetry folds based on variation (3 to 16 folds)
            float sym = mod(floor(uVariation), 14.0);
            float folds = 3.0 + sym; 
            
            float a = atan(p.y, p.x);
            float r = length(p);
            
            // Apply symmetry folding
            float segment = 3.14159265359 * 2.0 / folds;
            a = mod(a, segment) - segment / 2.0;
            p = vec2(cos(a), sin(a)) * r;
            
            float fractal = 0.0;
            vec2 uv2 = p;
            for(int i=0; i<6; i++) {
                uv2 = abs(uv2) / dot(uv2,uv2) - (0.4 + sin(uTime * 0.2 + sym) * 0.1);
                uv2 = rotate(uv2, uTime * 0.05 + sym * 0.1);
                fractal += exp(-length(uv2) * (1.5 + sym * 0.1));
            }
            
            vec3 col = mix(uColor1, uColor2, fractal * uIntensity);
            
            // Unrotated vignette
            vec2 up = (vUv - 0.5) * 2.0;
            up.x *= uAspect;
            col *= smoothstep(1.2, 0.1, length(up)); 
            
            gl_FragColor = vec4(col, 1.0);
        }
        `;
    } else if (classId === 2) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            // Derive n and m from variation for diverse chladni resonances
            float n = 1.0 + mod(var, 5.0);
            float m = 2.0 + floor(var / 3.0) + mod(var, 4.0);
            
            float t = uTime * 0.5 * intMod;
            
            // True Chladni plate equation mapping
            float chladni = sin(n * 3.1415 * p.x) * sin(m * 3.1415 * p.y) 
                          - sin(m * 3.1415 * p.x) * sin(n * 3.1415 * p.y) * cos(t);
                          
            // Circular boundary resonance
            float r = length(p);
            float circ = cos(r * (10.0 + var*2.0) - t * 2.0) * sin(var + r * 5.0);
            
            // Combine with dynamic shifting
            float resonance = mix(chladni, circ, 0.5 + 0.5*sin(t*0.2 + var));
            resonance = smoothstep(0.0, 0.05 + 0.05 * sin(t), abs(resonance));
            
            // Particles representation (nodes)
            float particles = pow(1.0 - resonance, 8.0) * pow(intMod, 1.5) * 1.5;
            
            // Grid noise for sand effect
            float sand = fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            particles *= (0.5 + 0.5 * sand);
            
            vec3 col = mix(uColor1, uColor2, length(p) + chladni * 0.2) * particles;
            gl_FragColor = vec4(col, 1.0);
        }
        `;
    } else if (classId === 3) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;

        // Fluid-like SDF noise
        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        float noise(vec2 p) {
            vec2 p_i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix( mix( hash( p_i + vec2(0.0,0.0) ), hash( p_i + vec2(1.0,0.0) ), u.x),
                        mix( hash( p_i + vec2(0.0,1.0) ), hash( p_i + vec2(1.0,1.0) ), u.x), u.y);
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.2 * intMod;
            
            // Domain warping (FBM approach)
            vec2 q = vec2(noise(p * (2.0+var*0.5) + t), noise(p * (2.0+var*0.5) - t));
            vec2 r = vec2(noise(p + q * (1.0+var*0.2) + t*1.5), noise(p + q * (1.0+var*0.2) - t*1.5));
            
            float f = noise(p * (3.0+var*0.5) + r * 2.0);
            
            // Create fluid layers
            float fluid = smoothstep(0.1, 0.9, f);
            
            // Add some high-frequency ripples based on variation
            float ripples = sin(f * (20.0 + var * 5.0) - uTime * 5.0) * 0.5 + 0.5;
            fluid = mix(fluid, ripples, 0.3 + 0.1 * sin(t));
            
            vec3 col = mix(uColor1, uColor2, fluid) * pow(intMod, 1.5) * 1.5;
            
            // Vignette
            vec2 up = (vUv - 0.5) * 2.0;
            up.x *= uAspect;
            col *= smoothstep(1.5, 0.2, length(up));
            
            gl_FragColor = vec4(col, 1.0);
        }
        `;
    } else if (classId === 4) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.5 * intMod;
            
            // Möbius-like complex math inversion z -> 1/z
            float r2 = dot(p, p);
            if (var > 3.0) {
                p = p / (r2 + 0.1); 
            }
            if (mod(var, 2.0) == 0.0) {
                p = vec2(p.x * cos(t) - p.y * sin(t), p.x * sin(t) + p.y * cos(t)); // slow spin
            }
            
            // Fold space non-euclidean style
            for(int i=0; i<4; i++) {
                p = abs(p) / dot(p,p) - vec2(0.5 + sin(t*0.2 + var)*0.2);
            }
            
            float d = length(p);
            
            // Quantum Topology peaks
            float q = sin(d * (10.0 + var * 2.0) - t * 5.0) * cos(p.x * p.y * (10.0 + var));
            q = smoothstep(0.8, 1.0, abs(q));
            
            vec3 col = mix(uColor1, uColor2, d) * q * pow(intMod, 1.5) * 1.5;
            
            // Ambient topological glow
            vec2 up = (vUv - 0.5) * 2.0;
            up.x *= uAspect;
            vec3 glow = uColor2 * (1.0 - smoothstep(0.0, 1.0, length(up))) * 0.3;
            
            gl_FragColor = vec4(col + glow + (1.0-q)*0.1*uColor1, 1.0);
        }
        `;
    } else if (classId === 5) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;

        vec2 rotate(vec2 p, float a) {
            float c = cos(a), s = sin(a);
            return mat2(c, -s, s, c) * p;
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.3 * intMod;
            
            p = rotate(p, t * 0.1 * (mod(var, 2.0) == 0.0 ? 1.0 : -1.0));
            
            // Sacred Geometry: Overlapping circles / Flower of Life
            float d = length(p);
            float rings = 0.0;
            
            // Create a central cluster
            float nodes = 6.0 + mod(var, 4.0) * 2.0; // 6, 8, 10, 12 symmetry
            
            for(int i=0; i<12; i++) {
                float fi = float(i);
                if (fi >= nodes) break;
                float angle = fi * 6.28318 / nodes + t * 0.5;
                vec2 offset = vec2(cos(angle), sin(angle)) * (0.3 + var * 0.02);
                float dist = length(p - offset);
                // sharp concentric rings
                rings += smoothstep(0.02, 0.01, abs(fract(dist * (5.0 + var) - t) - 0.5));
            }
            
            // Add central mandala
            rings += smoothstep(0.05, 0.02, abs(fract(d * 10.0 - t*2.0) - 0.5)) * 0.5;
            
            rings = clamp(rings, 0.0, 1.0);
            
            vec3 col = mix(uColor2, uColor1, rings) * (rings + 0.2) * pow(intMod, 1.5) * 1.5;
            
            // Vignette
            col *= smoothstep(1.5, 0.2, length((vUv - 0.5) * 2.0));
            
            gl_FragColor = vec4(col, 1.0);
        }
        `;
    } else if (classId === 6) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;

        // Simple hash for Voronoi
        vec2 hash2(vec2 p) {
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return fract(sin(p) * 43758.5453);
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.5 * intMod;
            
            // Voronoi Neural Web
            vec2 uv = p * (3.0 + var * 0.5);
            vec2 i_uv = floor(uv);
            vec2 f_uv = fract(uv);
            
            float minDist = 1.0;
            float minDist2 = 1.0; // second closest for web lines
            
            for(int y=-1; y<=1; y++) {
                for(int x=-1; x<=1; x++) {
                    vec2 neighbor = vec2(float(x), float(y));
                    vec2 point = hash2(i_uv + neighbor);
                    point = 0.5 + 0.5 * sin(t + 6.2831 * point + var);
                    
                    vec2 diff = neighbor + point - f_uv;
                    float dist = length(diff);
                    
                    if(dist < minDist) {
                        minDist2 = minDist;
                        minDist = dist;
                    } else if(dist < minDist2) {
                        minDist2 = dist;
                    }
                }
            }
            
            // Create cellular borders (neurons)
            float edge = minDist2 - minDist;
            float neural = smoothstep(0.05, 0.0, edge) + smoothstep(0.1, 0.0, minDist);
            
            // Add bioluminescent glow
            vec3 col = mix(uColor2, uColor1, neural) * (neural + 0.3) * pow(intMod, 1.5) * 1.5;
            
            col *= smoothstep(1.5, 0.3, length((vUv - 0.5) * 2.0));
            gl_FragColor = vec4(col, 1.0);
        }
        `;
    } else if (classId === 7) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        void main() {
            float intMod = max(0.1, uIntensity);
            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * intMod;
            
            float r = length(p);
            float a = atan(p.y, p.x);
            
            // Starburst rays
            float rays = sin(a * (12.0 + var * 4.0) + t * 2.0) * cos(a * (7.0 + var * 3.0) - t);
            
            // Pulsing core
            float core = 0.08 / (r + 0.01);
            
            // Ejection rings
            float rings = sin(r * (20.0 + var * 5.0) - t * 5.0);
            
            float burst = (rays * 0.5 + 0.5) * smoothstep(1.0, 0.0, r);
            float intensity = core + burst * 2.0 + rings * 0.3 * smoothstep(0.8, 0.0, r);
            
            vec3 col = mix(uColor2, uColor1, burst) * intensity * pow(intMod, 1.2) * 1.2;
            
            // Vignette
            col *= smoothstep(1.5, 0.2, r);
            
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 8) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float noise(vec2 p) {
            vec2 p_i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(p_i+vec2(0.0,0.0)), hash(p_i+vec2(1.0,0.0)), u.x),
                       mix(hash(p_i+vec2(0.0,1.0)), hash(p_i+vec2(1.0,1.0)), u.x), u.y);
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * 0.5 * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            // Absolutely unique asymmetrical math for each
            if (var == 0) {
                // Nebula Sweep
                vec2 q = p + vec2(noise(p*2.0 + t), noise(p*2.0 - t));
                f = noise(q * 5.0 - vec2(t*2.0, t)) * smoothstep(1.5, 0.0, length(p - vec2(-0.5, 0.0)));
            } else if (var == 1) {
                // Vortex Pull
                vec2 c = vec2(0.5, 0.5);
                float a = atan(p.y-c.y, p.x-c.x);
                float d = length(p-c);
                f = sin(10.0*d - a*3.0 - t*5.0) * exp(-d*2.0);
            } else if (var == 2) {
                // Liquid Splatter
                vec2 sp = p * 3.0;
                sp += vec2(sin(t+sp.y), cos(t+sp.x)) * 0.5;
                f = smoothstep(0.4, 0.3, noise(sp*3.0) + length(p));
            } else if (var == 3) {
                // Solar Flare
                float ang = atan(p.y, p.x);
                f = noise(vec2(ang*4.0, length(p)*5.0 - t*3.0)) * exp(-length(p+vec2(0.0,0.5))*2.0);
            } else if (var == 4) {
                // Wind Ribbon
                float wave = sin(p.x*5.0 + t) * cos(p.x*3.0 - t*0.5) * 0.5;
                f = smoothstep(0.1, 0.0, abs(p.y - wave + p.x*0.2));
            } else if (var == 5) {
                // Core Breach
                vec2 offset = vec2(noise(vec2(t)), noise(vec2(t*1.1)))*0.5 - 0.25;
                f = 0.05 / (length(p - offset) + 0.01) * noise(p*10.0);
            } else if (var == 6) {
                // Aurora Veil
                vec2 q = p;
                q.x += sin(q.y*3.0 + t)*0.5;
                f = noise(q*vec2(10.0, 1.0) - vec2(t, 0.0)) * smoothstep(1.0, 0.0, abs(q.x));
            } else if (var == 7) {
                // Magnetic Anomaly
                float d1 = length(p - vec2(-0.5, 0.0));
                float d2 = length(p - vec2(0.5, 0.5));
                f = sin(d1*20.0 - t) * cos(d2*15.0 + t);
            } else if (var == 8) {
                // Tectonic Shift
                vec2 q = p;
                if (q.x > q.y) q += vec2(t*0.1, -t*0.1);
                f = smoothstep(0.02, 0.0, abs(q.x - q.y + noise(q*5.0)*0.2));
            } else {
                // Dimensional Tear
                float tear = noise(vec2(p.y*5.0, t));
                f = smoothstep(0.1, 0.0, abs(p.x + tear*0.5 - 0.25)) * noise(p*20.0);
            }
            
            vec3 col = mix(uColor1, uColor2, abs(f)) * abs(f) * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 9) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float sdBox(vec2 p, vec2 b) { vec2 d = abs(p)-b; return length(max(d,0.0)) + min(max(d.x,d.y),0.0); }
        float sdHexagon(vec2 p, float r) { const vec3 k = vec3(-0.866025404,0.5,0.577350269); p = abs(p); p -= 2.0*min(dot(k.xy,p),0.0)*k.xy; p -= vec2(clamp(p.x, -k.z*r, k.z*r), r); return length(p)*sign(p.y); }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            // Absolutely unique thick brutalist math
            if (var == 0) {
                // Interlocking Blocks
                float b1 = sdBox(p + vec2(sin(t)*0.2, 0.0), vec2(0.4, 0.4));
                float b2 = sdBox(p - vec2(sin(t)*0.2, 0.0), vec2(0.4, 0.4));
                f = smoothstep(0.02, 0.0, abs(max(b1, -b2)));
            } else if (var == 1) {
                // Massive Hexagon Ring
                float h = sdHexagon(p, 0.6 + sin(t)*0.1);
                f = smoothstep(0.1, 0.05, abs(h));
            } else if (var == 2) {
                // Cross Beams
                float v = sdBox(p, vec2(0.15, 1.0));
                float h = sdBox(p, vec2(1.0, 0.15));
                f = smoothstep(0.02, 0.0, min(v, h) + sin(p.x*20.0+t)*0.02);
            } else if (var == 3) {
                // Brutalist Pillars
                vec2 q = fract(p * 2.0) - 0.5;
                f = smoothstep(0.05, 0.0, sdBox(q, vec2(0.3, 0.8)));
            } else if (var == 4) {
                // Heavy Monolith
                float m = sdBox(p, vec2(0.5, 0.7));
                f = smoothstep(0.01, 0.0, m) * (0.5 + 0.5*sin(p.y*50.0 - t*5.0));
            } else if (var == 5) {
                // Tech Cutouts
                float b = sdBox(p, vec2(0.6));
                float c = length(p) - 0.4;
                f = smoothstep(0.02, 0.0, max(b, -c));
            } else if (var == 6) {
                // Thick Waves
                float w = sin(p.x*5.0 + t) * 0.3;
                f = smoothstep(0.15, 0.1, abs(p.y - w));
            } else if (var == 7) {
                // Geometric Maze
                vec2 q = fract(p * 3.0 + t*0.2) - 0.5;
                f = smoothstep(0.05, 0.0, abs(sdBox(q, vec2(0.4))) - 0.1);
            } else if (var == 8) {
                // Massive Orbit
                float r = length(p);
                f = smoothstep(0.2, 0.15, abs(r - 0.6 + sin(atan(p.y, p.x)*4.0 + t)*0.1));
            } else {
                // Concrete Gears
                float a = atan(p.y, p.x);
                float r = length(p);
                float gear = 0.5 + 0.1*sin(a*8.0 - t);
                f = smoothstep(0.02, 0.0, abs(r - gear) - 0.1);
            }
            
            vec3 col = mix(uColor1, uColor2, length(p)) * f * pow(intMod, 1.5) * 1.5;
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 10) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
            int var = int(floor(uVariation));
            
            // Pixel Swarm resolution
            float res = 60.0;
            vec2 pixelUv = floor(p * res) / res;
            
            float h = hash(pixelUv);
            // Twinkling effect
            float twink = 0.5 + 0.5 * sin(h * 100.0 + t * 5.0);
            
            float f = 0.0;
            
            // Absolutely unique pixel shapes
            if (var == 0) {
                // Pixel Galaxy Spiral
                float a = atan(pixelUv.y, pixelUv.x);
                float r = length(pixelUv);
                f = sin(r*20.0 - a*3.0 - t*2.0);
            } else if (var == 1) {
                // Pixel Bio-Cell
                float c1 = length(pixelUv - vec2(sin(t)*0.3, cos(t)*0.3));
                float c2 = length(pixelUv + vec2(sin(t)*0.3, cos(t)*0.3));
                f = smoothstep(0.5, 0.4, c1) + smoothstep(0.5, 0.4, c2);
            } else if (var == 2) {
                // Pixel Magnetic Field
                f = sin(pixelUv.x * 20.0 + t) * cos(pixelUv.y * 20.0 - t);
            } else if (var == 3) {
                // Pixel Black Hole
                float r = length(pixelUv);
                f = 0.1 / (r + 0.01) * sin(r*50.0 - t*10.0);
            } else if (var == 4) {
                // Pixel Matrix Rain
                f = sin(pixelUv.y * 30.0 + t*10.0 + hash(vec2(pixelUv.x))*100.0);
            } else if (var == 5) {
                // Pixel Shockwave
                float r = length(pixelUv);
                f = smoothstep(0.1, 0.0, abs(r - fract(t*0.5)));
            } else if (var == 6) {
                // Pixel DNA Double Helix
                float s = sin(pixelUv.y * 10.0 + t);
                float c = cos(pixelUv.y * 10.0 + t);
                f = smoothstep(0.1, 0.0, abs(pixelUv.x - s*0.3)) + smoothstep(0.1, 0.0, abs(pixelUv.x - c*0.3));
            } else if (var == 7) {
                // Pixel Quantum Foam
                f = hash(pixelUv + floor(t*5.0));
            } else if (var == 8) {
                // Pixel Target
                float r = length(pixelUv);
                f = sin(r * 50.0 - t*5.0);
            } else {
                // Pixel Explosion
                float a = atan(pixelUv.y, pixelUv.x);
                f = hash(vec2(a)) * smoothstep(1.0, 0.0, length(pixelUv) + t);
            }
            
            f = smoothstep(0.5, 1.0, f) * twink;
            
            // Only draw discrete pixels, hide background
            if (f < 0.1) discard;
            
            vec3 col = mix(uColor1, uColor2, h) * f * uIntensity * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 11) {
        return `
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
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
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
            
            vec3 col = mix(uColor1, uColor2, abs(p.x)) * abs(f) * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 12) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        

        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
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
        `;

    } else if (classId === 13) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float noise(vec2 p) {
            vec2 p_i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(p_i+vec2(0.0,0.0)), hash(p_i+vec2(1.0,0.0)), u.x),
                       mix(hash(p_i+vec2(0.0,1.0)), hash(p_i+vec2(1.0,1.0)), u.x), u.y);
        }
        float fbm(vec2 p) {
            float f = 0.0; float w = 0.5;
            for(int i=0; i<5; i++) { f += w * noise(p); p *= 2.0; w *= 0.5; }
            return f;
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * 0.2 * intMod;
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
            vec3 col = mix(uColor1, uColor2, fbm(p+t)) * f * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 14) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        #define PI 3.14159265359
        
        vec2 rotate(vec2 p, float a) {
            float s = sin(a), c = cos(a);
            return vec2(p.x*c - p.y*s, p.x*s + p.y*c);
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * 0.5 * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            float r = length(p);
            float a = atan(p.y, p.x);
            
            if (var == 0) {
                // Kaleidoscopic Star
                float segments = 8.0;
                float ma = mod(a, PI * 2.0 / segments);
                ma = abs(ma - PI / segments);
                vec2 q = r * vec2(cos(ma), sin(ma));
                f = smoothstep(0.02, 0.0, abs(q.x + q.y*2.0 - 0.5 + sin(t)*0.1));
                f += smoothstep(0.02, 0.0, abs(q.x - 0.3));
            } else if (var == 1) {
                // Lotus Unfolding
                float petals = 12.0;
                float d = r - 0.5 + sin(a * petals + t)*0.1 * sin(r*10.0 - t*2.0);
                f = smoothstep(0.02, 0.0, abs(d));
            } else if (var == 2) {
                // Geometric Seed
                for(int i=0; i<6; i++) {
                    vec2 center = vec2(cos(float(i)*PI/3.0), sin(float(i)*PI/3.0)) * 0.3 * sin(t);
                    f += smoothstep(0.02, 0.0, abs(length(p - center) - 0.3));
                }
            } else if (var == 3) {
                // Shattered Hexagon
                p = rotate(p, t*0.2);
                float ma = mod(atan(p.y, p.x), PI/3.0) - PI/6.0;
                vec2 q = length(p) * vec2(cos(ma), sin(ma));
                f = smoothstep(0.02, 0.0, abs(q.x - 0.4 + sin(q.y*20.0)*0.05));
            } else if (var == 4) {
                // Trippy Eye
                float petals = 5.0;
                float w = sin(a * petals + t);
                f = smoothstep(0.02, 0.0, abs(r - 0.4 - w*0.1)) + smoothstep(0.02, 0.0, abs(r - 0.2 + w*0.1));
            } else if (var == 5) {
                // Overlapping Octagons
                for(int i=0; i<3; i++) {
                    vec2 q = rotate(p, float(i)*PI/4.0 + t*float(i)*0.1);
                    float d = max(abs(q.x), abs(q.y));
                    f += smoothstep(0.02, 0.0, abs(d - 0.3 - float(i)*0.1));
                }
            } else if (var == 6) {
                // Fractal Crown
                p = rotate(p, t*0.1);
                float segments = 6.0;
                float ma = abs(mod(atan(p.y, p.x), PI*2.0/segments) - PI/segments);
                vec2 q = length(p) * vec2(cos(ma), sin(ma));
                f = smoothstep(0.01, 0.0, abs(q.y - q.x*0.5)) + smoothstep(0.01, 0.0, abs(q.y - 0.1));
            } else if (var == 7) {
                // Mandala Rings
                f = smoothstep(0.02, 0.0, abs(r - 0.3 + sin(a*16.0)*0.05));
                f += smoothstep(0.02, 0.0, abs(r - 0.5 + cos(a*24.0)*0.02));
                f += smoothstep(0.02, 0.0, abs(r - 0.7 + sin(a*32.0)*0.01));
            } else if (var == 8) {
                // Spiky Fractal
                float ma = mod(a, PI/4.0) - PI/8.0;
                float d = r * cos(ma);
                f = smoothstep(0.02, 0.0, abs(d - 0.4 + r*sin(r*20.0 - t*5.0)*0.2));
            } else {
                // Ancient Compass
                f = smoothstep(0.01, 0.0, abs(r - 0.4));
                for(int i=0; i<4; i++) {
                    vec2 q = rotate(p, float(i)*PI/4.0);
                    f += smoothstep(0.01, 0.0, abs(q.x)) * smoothstep(1.0, 0.0, abs(q.y));
                }
            }
            
            f = clamp(f, 0.0, 1.0);
            vec3 col = mix(uColor1, uColor2, sin(r*10.0 - t)*0.5+0.5) * f * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 15) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        

        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * 2.0 * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            if (var == 0) {
                // Twin Ripple Moire
                float d1 = length(p - vec2(-0.2, 0.0));
                float d2 = length(p - vec2(0.2, 0.0));
                f = sin(d1 * 40.0 - t) + sin(d2 * 40.0 - t);
            } else if (var == 1) {
                // Magnetic Dipole
                float d1 = length(p - vec2(0.0, -0.3));
                float d2 = length(p - vec2(0.0, 0.3));
                f = sin((d1 - d2) * 20.0 - t);
            } else if (var == 2) {
                // Tri-Wave Interference
                f = sin(p.x * 20.0 + t) + sin((p.x*0.5 + p.y*0.866) * 20.0 - t) + sin((p.x*0.5 - p.y*0.866) * 20.0 + t);
            } else if (var == 3) {
                // Liquid Grid
                f = sin(p.x * 30.0 + sin(p.y*10.0 + t)*2.0) * sin(p.y * 30.0 + cos(p.x*10.0 - t)*2.0);
            } else if (var == 4) {
                // Concentric Beats
                float r = length(p);
                f = sin(r * 30.0 - t) * cos(r * 25.0 + t*0.5);
            } else if (var == 5) {
                // Vortex Interference
                float r = length(p);
                float a = atan(p.y, p.x);
                f = sin(r * 40.0 - a * 5.0 - t) + sin(r * 40.0 + a * 5.0 + t);
            } else if (var == 6) {
                // Standing Waves
                f = sin(p.x * 20.0) * cos(t) + sin(p.y * 20.0) * sin(t);
            } else if (var == 7) {
                // Quad Poles
                float d1 = length(p - vec2(0.3, 0.3));
                float d2 = length(p - vec2(-0.3, 0.3));
                float d3 = length(p - vec2(0.3, -0.3));
                float d4 = length(p - vec2(-0.3, -0.3));
                f = sin(d1*20.0-t) + sin(d2*20.0-t) - sin(d3*20.0+t) - sin(d4*20.0+t);
            } else if (var == 8) {
                // Soundwave Topology
                f = sin(length(p)*30.0 - t) + sin(p.x*20.0 + t);
            } else {
                // Chaotic Basin
                float r = length(p);
                float a = atan(p.y, p.x);
                f = sin(r * 30.0 + sin(a*4.0)*2.0 - t) * sin(r * 20.0 - cos(a*3.0)*2.0 + t);
            }
            
            // Map from [-2, 2] roughly to [0, 1] softly
            f = smoothstep(0.5, 1.5, abs(f));
            
            vec3 col = mix(uColor1, uColor2, length(p)) * f * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 16) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        

        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            float r = length(p);
            float a = atan(p.y, p.x);
            
            if (var == 0) {
                // Sunburst Bloom
                float petals = 12.0;
                float d = r - 0.3 - sin(a * petals)*0.2 * abs(sin(t));
                f = 0.02 / (abs(d) + 0.01);
            } else if (var == 1) {
                // Bio-Flower
                float w = sin(a * 6.0 + r * 10.0 - t*2.0);
                f = smoothstep(0.05, 0.0, abs(r - 0.4 - w*0.1));
            } else if (var == 2) {
                // Layered Peony
                for(int i=0; i<4; i++) {
                    float fi = float(i);
                    float d = r - 0.2 - fi*0.1 - sin(a * (5.0+fi) + t)*0.05;
                    f += smoothstep(0.02, 0.0, abs(d));
                }
            } else if (var == 3) {
                // Electric Orchid
                float petals = sin(a*3.0) * cos(a*7.0);
                float d = r - 0.4 - petals*0.2;
                f = 0.03 / (abs(d) + 0.01) * (1.0 - r);
            } else if (var == 4) {
                // Spiral Rose
                float d = r - a*0.1 + t*0.2;
                f = smoothstep(0.05, 0.0, abs(fract(d*3.0) - 0.5));
                f *= smoothstep(0.8, 0.0, r);
            } else if (var == 5) {
                // Crystal Lily
                float ma = abs(mod(a, 3.1415/3.0) - 3.1415/6.0);
                float d = r * cos(ma) - 0.3 - sin(r*20.0 - t)*0.05;
                f = smoothstep(0.02, 0.0, abs(d));
            } else if (var == 6) {
                // Pulsing Anemone
                float w = sin(a * 20.0 + sin(r*10.0 - t*5.0));
                f = smoothstep(0.05, 0.0, abs(r - 0.4 - w*0.05));
            } else if (var == 7) {
                // Quantum Dahlia
                float petals = abs(sin(a * 8.0));
                f = 0.02 / (abs(r - petals*0.5 - 0.1) + 0.01);
            } else if (var == 8) {
                // Droplet Petals
                vec2 q = p;
                q.y += sin(q.x*10.0 + t)*0.1;
                float d = length(q) - 0.4 + sin(atan(q.y, q.x)*4.0)*0.1;
                f = smoothstep(0.02, 0.0, abs(d));
            } else {
                // Galactic Bloom
                float a2 = a + r*2.0 - t;
                float d = r - 0.4 - sin(a2*5.0)*0.1;
                f = smoothstep(0.05, 0.0, abs(d));
            }
            
            vec3 col = mix(uColor1, uColor2, r*2.0) * f * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 17) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uSpeed;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        #define MAX_STEPS 45
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
        float map(vec3 p, float time) {
            float t = time * max(0.1, uSpeed * 2.0);
            float d = MAX_DIST;
            
#if VARIATION == 0
                // PLATONIC SOLIDS (Octahedron)
                p.yz *= rot(t*0.5);
                p.xz *= rot(t*0.3);
                p = abs(p);
                d = (p.x + p.y + p.z - 0.6) * 0.57735027;
                // Add a wireframe effect by subtracting smaller octahedrons
                d = max(d, -(p.x + p.y + p.z - 0.5) * 0.57735027);
#elif VARIATION == 1
                // TESSERACT (Hypercube projection)
                p.xy *= rot(t*0.2);
                p.xz *= rot(t*0.4);
                vec3 q = abs(p) - 0.4;
                float outer = sdBox(q, vec3(0.05));
                vec3 q2 = abs(p) - 0.2;
                float inner = sdBox(q2, vec3(0.05));
                // Connecting struts
                float struts = min(length(p.xy), min(length(p.yz), length(p.zx))) - 0.05;
                d = min(min(outer, inner), struts);
#elif VARIATION == 2
                // SPHERE
                d = sdSphere(p, 0.5);
                // Pulse it
                d -= sin(t * 5.0) * 0.05;
#elif VARIATION == 3
                // TORUS
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.3);
                d = sdTorus(p, vec2(0.5, 0.2));
#elif VARIATION == 4
                // KNOT (Torus Knot)
                p.xy *= rot(t*0.2);
                float a = atan(p.y, p.x);
                float r = length(p.xy);
                vec3 p2 = vec3(r - 0.5, p.z, 0.0);
                p2.xy *= rot(a * 3.0 + t);
                d = length(vec2(length(p2.xy) - 0.15, p2.z)) - 0.05;
#elif VARIATION == 5
                // MOBIUS STRIP
                p.xz *= rot(t*0.5);
                float a = atan(p.z, p.x);
                float r = length(p.xz);
                vec2 q = vec2(r - 0.5, p.y);
                q *= rot(a * 0.5);
                d = sdBox(vec3(q, 0.0), vec3(0.2, 0.02, 0.1));
#elif VARIATION == 6
                // KLEIN BOTTLE (Simplified 3D projection)
                p.yz *= rot(t*0.5);
                p.xz *= rot(t*0.5);
                float r = length(p.xy);
                float a = atan(p.y, p.x);
                vec2 q = vec2(r - 0.4 - sin(a)*0.2, p.z);
                q *= rot(a * 0.5);
                d = sdTorus(vec3(q.x, p.z, 0.0), vec2(0.2, 0.05));
                d = min(d, sdSphere(p, 0.2)); // Intersecting core
#elif VARIATION == 7
                // CYLINDER
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.2);
                vec2 q = abs(vec2(length(p.xz), p.y)) - vec2(0.3, 0.5);
                d = min(max(q.x, q.y), 0.0) + length(max(q, 0.0));
#elif VARIATION == 8
                // CONE
                p.yz *= rot(t*0.5);
                p.xz *= rot(t*0.3);
                vec2 c = normalize(vec2(0.5, 0.5));
                float h = 0.5;
                vec2 q = vec2(length(p.xz), p.y);
                float d1 = -q.y - h;
                float d2 = max(dot(q, c), q.y);
                d = length(max(vec2(d1, d2), 0.0)) + min(max(d1, d2), 0.);
                // Add a small base thickness
                d = max(d, -p.y - 0.5);
                d = max(d, p.y - 0.5);
#else
                // MW LOTUS (Ethereal 3D Lotus)
                p.xz *= rot(t*0.3);
                float a = atan(p.z, p.x);
                float r_lotus = length(p.xz);
                float petals = sin(a * 6.0 + t*2.0);
                vec3 q = p;
                q.y += r_lotus*r_lotus*1.5; // fold upwards
                d = length(q) - 0.4 - petals*0.1;
                d = max(d, -sdSphere(p - vec3(0,0.5,0), 0.6));
#endif
            
            return d;
        }

        vec3 getNormal(vec3 p, float t) {
            float d = map(p, t);
            vec2 e = vec2(0.001, 0);
            vec3 n = d - vec3(
                map(p-e.xyy, t),
                map(p-e.yxy, t),
                map(p-e.yyx, t)
            );
            return normalize(n);
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            float t = uTime;

            // Camera setup
            vec3 ro = vec3(0.0, 0.0, -2.5); // Ray origin
            vec3 rd = normalize(vec3(uv, 1.0)); // Ray direction

            float dO = 0.0; // Distance origin
            vec3 p;
            
            // Raymarching loop
            for(int i=0; i<MAX_STEPS; i++) {
                p = ro + rd * dO;
                float dS = map(p, t); // Distance scene
                dO += dS;
                if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
            }

            vec3 col = vec3(0.0);
            
            if(dO < MAX_DIST) {
                // Hit something!
                vec3 n = getNormal(p, t);
                
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
        `;

    } else if (classId === 18) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        uniform float uSpeed;
        varying vec2 vUv;
        
        // OPTIMIZED for WebGL compilation speed
        #define MAX_STEPS 45
        #define MAX_DIST 12.0
        #define SURF_DIST 0.01

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }
        
        float sdMandelbulb(vec3 p, float t) {
            vec3 z = p;
            float dr = 1.0;
            float r = 0.0;
            float Power = 8.0 + sin(t*0.5)*2.0;
            // Reduced to 2 iterations to prevent shader compiler timeout
            for (int i = 0; i < 2; i++) {
                r = length(z);
                // convert to polar coordinates
                float rSafe = max(r, 0.00001);
                float theta = acos(z.z/rSafe);
                float phi = atan(z.y,z.x);
                dr = pow(r, Power-1.0)*Power*dr + 1.0;
                float zr = pow(r,Power);
                theta = theta*Power;
                phi = phi*Power;
                z = zr*vec3(sin(theta)*cos(phi), sin(phi)*sin(theta), cos(theta));
                z += p;
            }
            return 0.5*log(max(r, 0.00001))*r/dr;
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

        float map(vec3 p, float t) {
            float d = MAX_DIST;
            
#if VARIATION == 0
                p.xy *= rot(t*0.3);
                p.xz *= rot(t*0.5);
                d = sdMandelbulb(p, t);
#elif VARIATION == 1
                p.xz *= rot(t*0.4);
                p.yz *= rot(t*0.2);
                float a = atan(p.z, p.x);
                float r = length(p.xz) - 0.6;
                vec2 torus = vec2(r, p.y);
                torus *= rot(a * 3.0 + t);
                d = length(torus) - 0.15;
                torus = vec2(r, p.y);
                torus *= rot(a * -3.0 - t);
                float d2 = length(torus) - 0.15;
                d = smin(d, d2, 0.2);
#elif VARIATION == 2
                p.xy *= rot(t*0.5);
                p.yz *= rot(t*0.3);
                vec3 q = p;
                q.y -= length(q.xz)*0.6;
                q.y += 0.2;
                d = length(q) - 0.5;
                // Reduced from 4 to 2
                for(int i=0; i<2; i++) {
                    p = abs(p)*1.6 - 0.4;
                    p.xy *= rot(t*0.3);
                    p.xz *= rot(t*0.5);
                    float tube = length(p.xz) - 0.1;
                    d = smin(d, tube*0.39, 0.05); // pow(1.6, -2) approx 0.39
                }
#elif VARIATION == 3
                p.xz *= rot(t*0.2);
                vec3 q3 = p;
                float a3 = atan(q3.z, q3.x);
                float r3 = length(q3.xz);
                float segments = 8.0;
                a3 = mod(a3, 6.28318/segments) - 3.14159/segments;
                q3.x = r3*cos(a3); q3.z = r3*sin(a3);
                q3.x -= 0.6;
                q3.xy *= rot(t*2.0);
                d = sdBox(q3, vec3(0.2, 0.05, 0.1));
                d = min(d, length(p) - 0.4);
                d = max(d, -(length(p.xz) - 0.2));
#elif VARIATION == 4
                p.xz *= rot(t*0.4);
                p.yz *= rot(t*0.3);
                float r4 = length(p);
                d = r4 - 0.6;
                d += sin(p.x*10.0)*sin(p.y*10.0)*sin(p.z*10.0)*0.1;
                p = abs(p) - 0.2;
                d = smin(d, length(p)-0.3, 0.2);
#elif VARIATION == 5
                p.xz *= rot(t*0.6);
                p.yz *= rot(t*0.4);
                p.xy *= rot(t*0.2);
                vec3 q5 = abs(p) - 0.5;
                float box1 = sdBox(q5, vec3(0.05));
                q5 = abs(p) - 0.25;
                float box2 = sdBox(q5, vec3(0.05));
                d = min(box1, box2);
                float strut = sdBox(p, vec3(0.02, 0.02, 0.6));
                d = min(d, strut);
                strut = sdBox(p, vec3(0.6, 0.02, 0.02));
                d = min(d, strut);
                strut = sdBox(p, vec3(0.02, 0.6, 0.02));
                d = smin(d, strut, 0.1);
#elif VARIATION == 6
                p.xz *= rot(t*0.2);
                // Reduced from 4 to 2
                for(int i=0; i<2; i++) {
                    p = abs(p) - 0.3;
                    p.xy *= rot(0.5 + t*0.1);
                    p.xz *= rot(0.5 - t*0.1);
                }
                d = sdBox(p, vec3(0.1));
                d = max(d, length(p)-0.15);
#elif VARIATION == 7
                p.xz *= rot(t*0.2);
                vec3 q7 = p * 3.0;
                float noise = dot(sin(q7), cos(q7.zxy));
                d = length(p) - 0.6 + noise * 0.2;
                d = max(d, -sdSphere(p, 0.4));
                d = min(d, length(p - vec3(sin(t)*0.3, cos(t)*0.3, 0)) - 0.1);
#elif VARIATION == 8
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.2);
                d = sdTorus(p, vec2(0.6, 0.05));
                vec3 p2_8 = p; p2_8.xy *= rot(1.57); p2_8.xz *= rot(1.57);
                d = smin(d, sdTorus(p2_8, vec2(0.5, 0.05)), 0.1);
                vec3 p3_8 = p; p3_8.yz *= rot(1.57); p3_8.xy *= rot(1.57);
                d = smin(d, sdTorus(p3_8, vec2(0.4, 0.05)), 0.1);
                vec3 q8 = mod(p*5.0 - t, 1.0) - 0.5;
                float swarm = length(q8) - 0.05;
                d = smin(d, max(swarm, length(p)-0.8), 0.2);
#else
                p.xz *= rot(t*0.3);
                p.yz *= rot(t*0.1);
                float r9 = length(p);
                d = abs(r9 - 0.7) - 0.05;
                d = max(d, -(abs(p.y)-0.02)); 
                d = max(d, -(abs(p.x)-0.02));
                vec3 p2_9 = p;
                p2_9.xy *= rot(-t*0.8);
                p2_9.xz *= rot(-t*0.5);
                float core = sdBox(p2_9, vec3(0.3));
                d = min(d, core);
                d = min(d, sdTorus(p2_9, vec2(0.4, 0.02)));
#endif
            return d;
        }

        vec3 getNormal(vec3 p, float t) {
            float d = map(p, t);
            vec2 e = vec2(0.005, 0); // wider step for performance
            vec3 n = d - vec3(
                map(p-e.xyy, t),
                map(p-e.yxy, t),
                map(p-e.yyx, t)
            );
            return normalize(n);
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            float t = uTime;

            vec3 ro = vec3(0.0, 0.0, -2.5);
            vec3 rd = normalize(vec3(uv, 1.0));

            float dO = 0.0;
            vec3 p;
            
            for(int i=0; i<MAX_STEPS; i++) {
                p = ro + rd * dO;
                float dS = map(p, t);
                dO += dS;
                if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
            }

            vec3 col = vec3(0.0);
            
            if(dO < MAX_DIST) {
                vec3 n = getNormal(p, t);
                vec3 lightDir = normalize(vec3(1.0, 2.0, -1.0));
                float dif = clamp(dot(n, lightDir), 0.0, 1.0);
                float fresnel = pow(1.0 + dot(rd, n), 2.0);
                
                vec3 baseCol = mix(uColor1, uColor2, clamp(p.y*0.5+0.5 + n.x*0.2, 0.0, 1.0));
                
                col = baseCol * dif * 0.9 + baseCol * fresnel * 2.0;
                col += uColor1 * 0.3 * (1.0 - dif);
                
                vec3 ref = reflect(rd, n);
                float spec = pow(max(dot(ref, lightDir), 0.0), 32.0);
                col += vec3(1.0) * spec * 0.8;
            } else {
                float glow = 1.0 / (1.0 + length(uv)*2.5);
                col = uColor2 * glow * 0.3 + uColor1 * pow(glow, 3.0) * 0.5;
            }
            
            col *= uIntensity * 1.2;
            col = pow(col, vec3(0.4545)); // Gamma correction
            
            gl_FragColor = vec4(col, 1.0);
        }
        `;

    } else if (classId === 0) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 2.0 * intMod; // fast
            
            float d = length(p);
            float a = atan(p.y, p.x);
            
            // Starburst radial rays
            float rays = sin(a * (20.0 + var * 5.0) + t) * sin(a * (13.0 + var * 3.0) - t * 0.5);
            rays = smoothstep(0.5, 1.0, abs(rays));
            
            // Shockwave rings
            float shock = fract(d * (5.0 + var) - t);
            shock = smoothstep(0.0, 0.1, shock) * smoothstep(0.2, 0.1, shock);
            
            // Core explosion
            float core = 0.05 / (d + 0.01);
            
            float burst = rays * (1.0 - d) + shock + core;
            burst = clamp(burst, 0.0, 1.0);
            
            vec3 col = mix(uColor2, uColor1, burst) * burst * pow(intMod, 1.5) * 1.5;
            
            col *= smoothstep(1.2, 0.0, d); // steep falloff
            
            gl_FragColor = vec4(col, 1.0);
        }
        `;
    } else if (classId === 19) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uSpeed;
        uniform float uAspect;
        uniform float uHarmonics;
        uniform float uResonance;
        uniform float uEntropy;
        uniform float uFlow;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform vec2 uMouse;
        uniform float uSpawnTime;
        uniform float uAlpha;

        varying vec2 vUv;
        
        #define MAX_STEPS 32
        #define MAX_DIST 10.0
        #define SURF_DIST 0.015
        #define PI 3.14159265359

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        // --- SDF Primitives ---
        float sdSphere(vec3 p, float s) { return length(p) - s; }
        
        float sdBox(vec3 p, vec3 b) {
            vec3 q = abs(p) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }

        float sdTorus(vec3 p, vec2 t) {
            vec2 q = vec2(length(p.xz)-t.x,p.y);
            return length(q)-t.y;
        }

        float sdHexPrism( vec3 p, vec2 h ) {
            const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
            p = abs(p);
            p.xy -= 2.0*min(dot(k.xy, p.xy), 0.0)*k.xy;
            vec2 d = vec2(
                length(p.xy-vec2(clamp(p.x,-k.z*h.x,k.z*h.x), h.x))*sign(p.y-h.x),
                p.z-h.y );
            return min(max(d.x,d.y),0.0) + length(max(d,0.0));
        }

        // --- 3D Noise ---
        float hash(vec3 p) {
            p  = fract( p*0.3183099+.1 );
            p *= 17.0;
            return fract( p.x*p.y*p.z*(p.x+p.y+p.z) );
        }
        float noise( in vec3 x ) {
            vec3 p_i = floor(x);
            vec3 f = fract(x);
            f = f*f*(3.0-2.0*f);
            return mix(mix(mix( hash(p_i+vec3(0,0,0)), hash(p_i+vec3(1,0,0)),f.x),
                           mix( hash(p_i+vec3(0,1,0)), hash(p_i+vec3(1,1,0)),f.x),f.y),
                       mix(mix( hash(p_i+vec3(0,0,1)), hash(p_i+vec3(1,0,1)),f.x),
                           mix( hash(p_i+vec3(0,1,1)), hash(p_i+vec3(1,1,1)),f.x),f.y),f.z);
        }

        // --- 3D Voronoi / Cellular ---
        vec3 hash3( vec3 p ) {
            p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                      dot(p,vec3(269.5,183.3,246.1)),
                      dot(p,vec3(113.5,271.9,124.6)));
            return -1.0 + 2.0*fract(sin(p)*43758.5453123);
        }
        float voronoi( in vec3 x ) {
            vec3 p = floor( x );
            vec3 f = fract( x );
            float id = 0.0;
            vec2 res = vec2( 100.0 );
            for( int k=-1; k<=1; k++ )
            for( int j=-1; j<=1; j++ )
            for( int i=-1; i<=1; i++ ) {
                vec3 b = vec3( float(i), float(j), float(k) );
                vec3 r = vec3( b ) - f + 0.5 + 0.5*sin( uTime*0.5 + 6.2831*hash3( p + b ) );
                float d = dot( r, r );
                if( d < res.x ) {
                    id = dot( p+b, vec3(1.0,57.0,113.0 ) );
                    res = vec2( d, res.x );
                } else if( d < res.y ) {
                    res.y = d;
                }
            }
            return sqrt( res.x );
        }

        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }

        // --- Map Function (Where the magic happens) ---
        vec2 map(vec3 p) {
            float d = MAX_DIST;
            float matID = 0.0; // 0 = main, 1 = glow/energy
            
            float intMod = max(0.1, uIntensity);
            float t = uTime * uSpeed * intMod;
            float harm = uHarmonics > 0.0 ? uHarmonics : 1.0;
            float flow = uFlow > 0.0 ? uFlow : 1.0;
            float entropy = uEntropy > 0.0 ? uEntropy : 1.0;
            
            // Audio Sync Deformations
            float kick = uAudioLow * 2.0;
            float snare = uAudioMid * 2.0;
            float hat = uAudioHigh * 2.0;
            
            // Glitch Spawn Effect (Builds geometry slowly after switching patterns)
            float spawnScale = smoothstep(0.0, 2.0, uTime - uSpawnTime);
            p /= max(0.01, spawnScale); // Start tiny and expand
            
            float spawnDisp = (1.0 - spawnScale) * noise(p * 10.0 + t);
            
#if VARIATION == 0
            // 3D Fractal Heart
            vec3 q = p;
            q.y -= 0.5;
            // Physical Beating
            float beat = sin(t * 4.0) * 0.1 * harm + kick * 0.2;
            q *= 1.0 - beat;
            
            // Algebraic 3D Heart
            float x = q.x * 1.2;
            float y = q.y * 1.2;
            float z = q.z * 1.2;
            float a = x*x + 2.25*y*y + z*z - 1.0;
            float heart = a*a*a - x*x*z*z*z - 0.1125*y*y*z*z*z;
            d = heart * 0.3; // Scale distance field
            
            // Surface Displacement (Veins/Fractals)
            float disp = noise(q * 10.0 * entropy + t * flow) * 0.05 * hat;
            d += disp + spawnDisp;
            matID = 0.0;

#elif VARIATION == 1
            // Fluid SDF Core (Liquid Metal blob)
            vec3 q = p;
            q.yz *= rot(t * 0.2);
            q.xz *= rot(t * 0.3);
            
            float baseSphere = sdSphere(q, 1.5 + kick * 0.3);
            
            // Multi-octave FBM for fluid displacement
            float n = noise(q * 2.0 * entropy + t * flow);
            n += 0.5 * noise(q * 4.0 - t * 1.5);
            n += 0.25 * noise(q * 8.0 + t);
            
            d = baseSphere - n * 0.5 * harm * (1.0 + snare) + spawnDisp;
            matID = 1.0; // Highly reflective/fluid

#elif VARIATION == 2
            // Particle Swarm (3D Voronoi Lattice)
            vec3 q = p;
            q.xz *= rot(t * 0.1);
            q.xy *= rot(t * 0.15);
            
            // Hollow sphere bounds
            float bound = abs(sdSphere(q, 2.0 + kick*0.2)) - 0.2;
            
            // Cellular noise lattice
            float cell = voronoi(q * (2.0 + harm) * entropy - t * flow);
            float lattice = abs(cell - 0.5) - 0.1 * (1.0 + hat);
            
            d = max(bound, lattice) + spawnDisp;
            matID = 0.0;

#elif VARIATION == 3
            // Quantum Topology (Interlocking Torus Knots)
            vec3 q = p;
            q.xz *= rot(t * 0.4);
            q.yz *= rot(t * 0.2);
            
            float r1 = sdTorus(q, vec2(1.2 + kick*0.2, 0.1 + hat*0.05));
            vec3 q2 = q;
            q2.xy *= rot(PI/2.0);
            q2.xz *= rot(PI/4.0);
            float r2 = sdTorus(q2, vec2(1.2 + snare*0.2, 0.1 + hat*0.05));
            
            // Quantum Wave Interference
            float wave = sin(q.x * 10.0 * entropy + t * flow) * 0.05 * harm;
            
            d = smin(r1, r2, 0.5) + wave + spawnDisp;
            matID = 1.0;

#elif VARIATION == 4
            // Prime Prime (Extruded 3D Star)
            vec3 q = p;
            q.xz *= rot(t * 0.3);
            q.yz *= rot(t * 0.1);
            
            float a = atan(q.z, q.x);
            float r = length(q.xz);
            
            float arms = 7.0 + floor(harm * 4.0); // Prime
            float star = cos(a * arms) * 0.3 * entropy * (1.0 + kick);
            
            float cylinder = max(r - 1.5 + star, abs(q.y) - 0.5 - snare*0.2);
            
            // Inner core
            float core = sdSphere(q, 0.8 + hat*0.3);
            
            d = min(cylinder, core) + spawnDisp;
            matID = 0.0;

#else
            // Metatron's Grid (3D Crystal Lattice)
            vec3 q = p;
            q.xz *= rot(t * 0.2);
            q.yz *= rot(t * 0.15);
            
            // Central Hex Prism
            float hex = sdHexPrism(q, vec2(1.0 + kick*0.2, 1.0));
            
            // Nodes (Spheres)
            float spheres = MAX_DIST;
            for(int i=0; i<6; i++) {
                float ang = float(i) * PI / 3.0;
                vec3 pos = vec3(cos(ang)*1.2, 0.0, sin(ang)*1.2);
                spheres = min(spheres, sdSphere(q - pos, 0.3 + hat*0.2));
                
                vec3 posTop = vec3(cos(ang)*0.8, 1.2, sin(ang)*0.8);
                spheres = min(spheres, sdSphere(q - posTop, 0.2 + snare*0.2));
                
                vec3 posBot = vec3(cos(ang)*0.8, -1.2, sin(ang)*0.8);
                spheres = min(spheres, sdSphere(q - posBot, 0.2 + snare*0.2));
            }
            
            float grid = min(abs(hex)-0.05, spheres);
            d = grid + spawnDisp;
            matID = 1.0;
#endif

            // Re-scale distance field back
            d *= spawnScale;

            return vec2(d, matID);
        }

        // --- Raymarching Engine ---
        vec3 calcNormal(vec3 p) {
            vec2 e = vec2(0.001, 0.0);
            return normalize(vec3(
                map(p + e.xyy).x - map(p - e.xyy).x,
                map(p + e.yxy).x - map(p - e.yxy).x,
                map(p + e.yyx).x - map(p - e.yyx).x
            ));
        }

        float calcAO(vec3 p, vec3 n) {
            float occ = 0.0;
            float sca = 1.0;
            for(int i=0; i<5; i++) {
                float h = 0.01 + 0.12 * float(i)/4.0;
                float d = map(p + h*n).x;
                occ += (h-d)*sca;
                sca *= 0.95;
            }
            return clamp(1.0 - 1.5*occ, 0.0, 1.0);
        }

        float calcSoftShadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
            float res = 1.0;
            float t = mint;
            for(int i=0; i<16; i++) {
                float h = map(ro + rd*t).x;
                res = min(res, k*h/t);
                t += clamp(h, 0.02, 0.10);
                if(res<0.005 || t>maxt) break;
            }
            return clamp(res, 0.0, 1.0);
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            
            float spawnFade = smoothstep(0.0, 1.0, uTime - uSpawnTime);
            
            // Interactive Camera Physics
            vec3 ro = vec3(uMouse.x * 3.0, uMouse.y * 3.0 + 1.0, 6.0 - max(0.0, uAudioLow * 2.0)); // Zoom on kick
            vec3 ta = vec3(0.0, 0.0, 0.0);
            
            // Camera Matrix
            vec3 ww = normalize(ta - ro);
            vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
            vec3 vv = normalize(cross(uu, ww));
            vec3 rd = normalize(uv.x*uu + uv.y*vv + 1.5*ww);
            
            float dO = 0.0;
            vec2 d;
            vec3 p;
            
            // Raymarch loop
            for(int i=0; i<MAX_STEPS; i++) {
                p = ro + rd * dO;
                d = map(p);
                if(abs(d.x) < SURF_DIST || dO > MAX_DIST) break;
                dO += d.x * 0.8; // Safe stepping
            }
            
            vec3 col = vec3(0.0); // Background
            
            if(dO < MAX_DIST) {
                // We hit something!
                vec3 n = calcNormal(p);
                
                // Advanced PBR Lighting
                vec3 lig = normalize(vec3(1.0, 2.0, 2.0)); // Main Light
                vec3 hal = normalize(lig - rd);
                
                float dif = clamp(dot(n, lig), 0.0, 1.0);
                float bac = clamp(dot(n, normalize(vec3(-lig.x, 0.0, -lig.z))), 0.0, 1.0);
                float amb = 0.5 + 0.5 * dot(n, vec3(0.0, 1.0, 0.0));
                
                float ao = calcAO(p, n);
                float sha = calcSoftShadow(p, lig, 0.02, 2.5, 8.0);
                
                // Specular & Fresnel
                float spe = pow(clamp(dot(n, hal), 0.0, 1.0), 32.0);
                float fre = pow(clamp(1.0 + dot(n, rd), 0.0, 1.0), 4.0);
                
                // Base colors mixed with UI Colors
                vec3 albedo = mix(uColor1, uColor2, d.y); 
                
                // Subsurface Scattering Fake (Light bleeding through edges)
                float sss = pow(clamp(1.0 - dot(n, lig), 0.0, 1.0), 5.0) * 0.5;
                
                col = albedo * dif * sha;
                col += albedo * amb * ao * 0.3;
                col += albedo * bac * 0.2;
                col += vec3(1.0) * spe * sha;
                col += mix(uColor1, uColor2, 0.5) * fre * 2.0 * (1.0 + uAudioHigh); // Fresnel glow pulses on highs
                col += uColor1 * sss * (1.0 + uAudioLow); // SSS pulses on lows
                
                // Bloom / Emission
                if (d.y == 1.0) {
                    col += albedo * 1.5; // Emissive liquid/grid
                }
            }
            
            // Post-Processing / Fake Bloom
            col = pow(col, vec3(0.4545)); // Gamma correction
            
            gl_FragColor = vec4(col * uAlpha * spawnFade, uAlpha * spawnFade);
        }
        `;
    } else if (classId === 20) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform float uAlpha;
        varying vec2 vUv;

        #define PI 3.14159265359

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        // Heart SDF
        float sdHeart(vec2 p) {
            p.x = abs(p.x);
            if( p.y+p.x>1.0 ) return sqrt(dot(p-vec2(0.25,0.75),p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
            return sqrt(min(dot(p-vec2(0.00,1.00),p-vec2(0.00,1.00)),
                            dot(p-0.5*max(p.x+p.y,0.0),p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
        }
        
        // Hexagon SDF
        float sdHexagon(vec2 p, float r) {
            const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
            p = abs(p);
            p -= 2.0*min(dot(k.xy, p), 0.0)*k.xy;
            p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
            return length(p)*sign(p.y);
        }

        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        float voronoi(vec2 x) {
            vec2 n = floor(x);
            vec2 f = fract(x);
            float m = 8.0;
            for(int j=-1; j<=1; j++)
            for(int i=-1; i<=1; i++) {
                vec2 g = vec2(float(i),float(j));
                vec2 o = vec2(hash(n+g));
                vec2 r = g - f + o;
                float d = dot(r,r);
                if(d < m) m = d;
            }
            return sqrt(m);
        }

        void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.5;
            float bump = (uAudioLow + uAudioMid + uAudioHigh) * uIntensity;
            
            float pattern = 0.0;
            vec3 col = vec3(0.0);
            
            if (var == 0.0) {
                p *= 1.5; p.y += 0.5;
                float d = sdHeart(p);
                float n = 6.0 + bump * 2.0; float m = 4.0;
                float waves = cos(n*p.x)*cos(m*p.y) - cos(m*p.x)*cos(n*p.y);
                pattern = smoothstep(0.02, 0.0, abs(d + waves*0.1));
                pattern += smoothstep(0.01, 0.0, abs(d + 0.1));
            } else if (var == 1.0) {
                vec2 q = p;
                q.x += sin(q.y * 5.0 + t) * 0.1;
                q.y += cos(q.x * 5.0 - t) * 0.1;
                float d = length(q) - 0.5;
                float n = 8.0; float m = 8.0;
                float waves = sin(n*q.x)*sin(m*q.y);
                pattern = smoothstep(0.03, 0.0, abs(d * waves));
            } else if (var == 2.0) {
                // Fibonacci Spiral SDF
                float r = length(p);
                float a = atan(p.y, p.x);
                float phi = (1.0 + sqrt(5.0)) / 2.0; // Golden ratio
                float fib = a * phi + log(max(r, 0.00001)) * 10.0;
                float waves = sin(fib * 2.0 - t * 3.0);
                float node = smoothstep(0.1, 0.0, abs(waves));
                float v = sin(r * 20.0 - t * 2.0) * cos(a * 10.0 + t);
                pattern = smoothstep(0.05, 0.0, abs(v)) * node + node * 0.5;
            } else if (var == 3.0) {
                float r = length(p);
                float n = 7.0 + floor(bump*2.0); float m = 3.0;
                float waves = cos(n*p.x)*cos(m*p.y) - cos(m*p.x)*cos(n*p.y);
                float ring = sin(r * 20.0 - t * 2.0);
                pattern = smoothstep(0.05, 0.0, abs(waves * ring));
            } else if (var == 4.0) {
                float r = length(p); float a = atan(p.y, p.x);
                float f = sin(a * 7.0) * sin(a * 11.0);
                float waves = cos(f * 10.0 + r * 20.0 - t);
                pattern = smoothstep(0.1, 0.0, abs(waves));
            } else if (var == 5.0) {
                float d1 = sdHexagon(p, 0.5);
                float d2 = length(p) - 0.5;
                float pattern1 = smoothstep(0.02, 0.0, abs(d1));
                float pattern2 = smoothstep(0.02, 0.0, abs(d2));
                float circles = 0.0;
                for(int i=0; i<6; i++){
                    float fi = float(i);
                    float ang = fi * PI / 3.0;
                    vec2 cp = vec2(cos(ang), sin(ang)) * 0.5;
                    circles += smoothstep(0.02, 0.0, abs(length(p - cp) - 0.5));
                }
                pattern = clamp(pattern1 + pattern2 + circles, 0.0, 1.0);
                float n = 4.0; float m = 4.0;
                float waves = cos(n*p.x)*cos(m*p.y) - cos(m*p.x)*cos(n*p.y);
                pattern *= smoothstep(0.1, 0.0, abs(waves));
            }

            col = mix(uColor2, uColor1, pattern) * pattern;
            
            float alpha = pattern * uAlpha;
            gl_FragColor = vec4(col, alpha);
        }
        `;
    } else if (classId === 21) {
        return `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform vec2 uMouse;
        uniform float uAlpha;
        
        #define PI 3.14159265359
        #define MAX_STEPS 32
        #define MAX_DIST 50.0
        #define SURF_DIST 0.015
        
        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }
        
        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }
        
        float sdOctahedron(vec3 p, float s) {
            p = abs(p);
            return (p.x + p.y + p.z - s) * 0.57735027;
        }

        float sdBox(vec3 p, vec3 b) {
            vec3 q = abs(p) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }
        
        float sdTorus(vec3 p, vec2 t) {
            vec2 q = vec2(length(p.xz)-t.x,p.y);
            return length(q)-t.y;
        }
        
        float map(vec3 p) {
            float d = MAX_DIST;
            float var = float(VARIATION);
            
            float t = uTime * uIntensity;
            float pulse = uAudioLow + uAudioMid;
            
            if (var == 0.0) {
                // Fractal Heart + Star Tetrahedron
                vec3 q = p;
                q.y += 0.5;
                float x2 = q.x * q.x;
                float y2 = q.y * q.y;
                float z2 = q.z * q.z;
                float heart = (x2 + 2.25 * y2 + z2 - 1.0);
                heart = heart * heart * heart - x2 * z2 * z2 - 0.1125 * y2 * z2 * z2;
                heart *= 0.5; // Scale down SDF for safety
                
                vec3 oc = p;
                oc.xy *= rot(t*0.5);
                oc.xz *= rot(t*0.3);
                float oct = sdOctahedron(oc, 1.5 + pulse*0.2);
                
                // Wireframe effect for octahedron
                float octInner = sdOctahedron(oc, 1.4 + pulse*0.2);
                float octShell = max(oct, -octInner);
                
                d = min(heart, octShell);
                
            } else if (var == 1.0) {
                // Fluid SDF Mandala
                float r = length(p.xz);
                float a = atan(p.z, p.x);
                float ripple = sin(r * 15.0 - t * 3.0 + pulse*2.0) * 0.1;
                float petal = sin(a * 8.0) * 0.2 * cos(r * 5.0);
                
                float ground = p.y + 0.5 - ripple - petal;
                
                // Fluid drops
                vec3 dp = p;
                dp.y -= 1.0 + sin(t*2.0)*0.5;
                float drop = length(dp) - 0.2;
                
                d = smin(ground, drop, 0.5);
                
            } else if (var == 2.0) {
                // Particle Swarm (Domain repeated grid in a sphere)
                vec3 q = p;
                q.xz *= rot(t*0.2);
                q.yz *= rot(t*0.1);
                
                vec3 cell = fract(q * 4.0) - 0.5;
                float dots = length(cell) - 0.05 - pulse*0.05;
                
                float bounds = length(p) - 2.5;
                d = max(dots, bounds);
                
                // Add an inner glowing core
                float core = length(p) - 0.5 - pulse*0.2;
                d = min(d, core);
                
            } else if (var == 3.0) {
                // Quantum Topology (Volcanic terrain)
                float h = sin(p.x * 2.0 + t) * cos(p.z * 2.0 - t) * 0.5;
                h += sin(p.x * 5.0) * cos(p.z * 5.0) * 0.2 * (1.0+pulse);
                
                float terrain = p.y + 1.0 - h;
                
                // Spikes
                vec3 q = p;
                q.xz = mod(q.xz, 2.0) - 1.0;
                float spike = length(q.xz) - 0.1;
                spike = max(spike, p.y - 2.0);
                
                d = min(terrain, spike);
                
            } else if (var == 4.0) {
                // Prime Prime (Neon rings)
                d = MAX_DIST;
                for(int i=0; i<5; i++) {
                    float fi = float(i);
                    vec3 q = p;
                    q.xy *= rot(t*0.2 + fi);
                    q.xz *= rot(t*0.3 + fi*1.618);
                    float ring = sdTorus(q, vec2(1.5 + sin(fi)*0.2, 0.02));
                    d = min(d, ring);
                }
                float center = length(p) - 0.3 - pulse*0.2;
                d = min(d, center);
                
            } else if (var == 5.0) {
                // Metatron's Grid
                vec3 q = p;
                q.xz *= rot(t*0.5);
                q.yz *= rot(t*0.3);
                
                float outer = sdBox(q, vec3(1.2));
                float inner = sdBox(q, vec3(1.15));
                float frame = max(outer, -inner);
                
                float sphere = length(q) - 0.8 - pulse*0.2;
                
                // Add crossing cylinders for the grid
                float cx = length(q.yz) - 0.05;
                float cy = length(q.xz) - 0.05;
                float cz = length(q.xy) - 0.05;
                float cross = min(cx, min(cy, cz));
                
                d = min(frame, min(sphere, cross));
            }
            
            return d * 0.5; // Help raymarcher with deformed SDFs
        }
        
        vec3 calcNormal(vec3 p) {
            vec2 e = vec2(1.0, -1.0) * 0.5773 * 0.001;
            return normalize(e.xyy*map(p + e.xyy) + 
                             e.yyx*map(p + e.yyx) + 
                             e.yxy*map(p + e.yxy) + 
                             e.xxx*map(p + e.xxx));
        }
        
        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            
            vec3 ro = vec3(0.0, 1.0, 5.0);
            vec3 rd = normalize(vec3(uv, -1.0));
            
            // Mouse camera control
            ro.yz *= rot(-uMouse.y * PI * 0.5);
            ro.xz *= rot(uMouse.x * PI);
            rd.yz *= rot(-uMouse.y * PI * 0.5);
            rd.xz *= rot(uMouse.x * PI);
            
            float d0 = 0.0;
            float glow = 0.0;
            
            for(int i=0; i<MAX_STEPS; i++) {
                vec3 p = ro + rd * d0;
                float dS = map(p);
                
                // Emissive glow accumulation (neon effect)
                glow += 0.01 / (0.01 + abs(dS));
                
                if(dS < SURF_DIST || d0 > MAX_DIST) break;
                d0 += dS;
            }
            
            vec3 col = vec3(0.0);
            float var = float(VARIATION);
            
            if(d0 < MAX_DIST) {
                vec3 p = ro + rd * d0;
                vec3 n = calcNormal(p);
                vec3 l = normalize(vec3(1.0, 2.0, 3.0));
                
                // PBR-like Lighting
                float diff = max(dot(n, l), 0.0);
                float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
                float spec = pow(max(dot(reflect(-l, n), -rd), 0.0), 32.0);
                
                vec3 albedo = mix(uColor1, uColor2, sin(length(p)*5.0 + uTime)*0.5+0.5);
                
                col = albedo * (diff * 0.5 + 0.1) + uColor1 * fresnel * 2.0 + uColor2 * spec;
                
                // Wireframe effect for Topology
                if (var == 3.0) {
                    vec3 q = fract(p * 4.0);
                    float edge = min(min(q.x, q.y), q.z);
                    if(edge < 0.05) col += uColor2 * 2.0;
                }
            }
            
            // Add volumetric bloom
            col += mix(uColor1, uColor2, 0.5) * glow * 0.1 * uIntensity;
            
            // Background cosmic/dark space
            col += vec3(0.02, 0.0, 0.05) * length(uv);
            
            // Tone mapping for cinematic look
            col = col / (1.0 + col);
            col = pow(col, vec3(0.4545)); // Gamma correction
            
            gl_FragColor = vec4(col, uAlpha);
        }
        `;
    } else if (classId === 22) {
        return `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform vec2 uMouse;
        uniform float uAlpha;
        uniform float uMouseSync;
        uniform sampler2D uTexture;
        
        #define PI 3.14159265359
        
        vec2 rotate(vec2 p, float a) {
            float c = cos(a), s = sin(a);
            return mat2(c, -s, s, c) * p;
        }

        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
            vec2 p_i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(p_i + vec2(0.0,0.0)), hash(p_i + vec2(1.0,0.0)), u.x),
                       mix(hash(p_i + vec2(0.0,1.0)), hash(p_i + vec2(1.0,1.0)), u.x), u.y);
        }

        float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int k = 0; k < 4; ++k) {
                v += a * noise(p);
                p = rot * p * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        void main() {
            vec2 uv = vUv;
            float time = uTime;
            
            // Safe branchless interactive mouse sync or static center
            vec2 center = mix(vec2(0.5), vec2(0.5) + uMouse * 0.5, step(0.5, uMouseSync));
            vec2 p = uv - center;
            p.x *= uAspect;
            float r = length(p);
            
            // Safe, branchless angle calculation to prevent driver/watchdog lockups on Apple Metal atan(0,0)
            float angle = safe_atan(p.y, p.x);
            
            // Safe, branchless normalize vector for coordinate directions (prevents NaNs)
            vec2 pDir = safe_normalize(p);
            
            float lowPulse = uAudioLow * uIntensity;
            float midPulse = uAudioMid * uIntensity;
            float highPulse = uAudioHigh * uIntensity;
            
            // Compute texture gradient (finite differences) to warp along native image features
            vec2 eps = vec2(0.004, 0.0);
            float lumaL = dot(texture2D(uTexture, uv - eps.xy).rgb, vec3(0.299, 0.587, 0.114));
            float lumaR = dot(texture2D(uTexture, uv + eps.xy).rgb, vec3(0.299, 0.587, 0.114));
            float lumaD = dot(texture2D(uTexture, uv - eps.yx).rgb, vec3(0.299, 0.587, 0.114));
            float lumaU = dot(texture2D(uTexture, uv + eps.yx).rgb, vec3(0.299, 0.587, 0.114));
            vec2 grad = vec2(lumaR - lumaL, lumaU - lumaD);
            
            // Original luma at uv
            float baseLuma = dot(texture2D(uTexture, uv).rgb, vec3(0.299, 0.587, 0.114));
            
            // Boundary window to fade out displacements and prevent edge-streaking artifacts
            float window = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x) *
                           smoothstep(0.0, 0.05, uv.y) * smoothstep(1.0, 0.95, uv.y);
            
            // Spectrum-dependent color mapping (dynamic luminance blooming)
            vec3 activeColor1 = mix(uColor1, vec3(1.0, 1.0, 1.0), highPulse * 0.4);
            vec3 activeColor2 = mix(uColor2, vec3(1.0, 0.3, 0.6), lowPulse * 0.3);
            
            vec4 texColor = vec4(0.0);
            vec3 customColor = vec3(0.0);
            
#if VARIATION == 0
            // --- VARIATION 0: FRACTAL HEART ---
            vec2 pHeart = p * 1.2;
            pHeart.y += 0.1;
            
            float heartBeat = sin(time * 5.0) * 0.06 * (1.0 + lowPulse) + lowPulse * 0.12;
            pHeart *= (1.0 - heartBeat);
            
            float x2 = pHeart.x * pHeart.x;
            float yVal = pHeart.y - 0.3 - sqrt(abs(pHeart.x) + 0.0001) * 0.5;
            float heartSDF = x2 + yVal*yVal - 0.2;
            
            // Dynamic ripple frequency morphing based on audio spectral balance
            float spatialFreq = 18.0 + lowPulse * 15.0 + highPulse * 35.0;
            float ripples = sin(heartSDF * spatialFreq - time * (7.0 + highPulse * 10.0) + baseLuma * 10.0);
            
            vec2 warp = grad * ripples * 0.06 * (1.0 + lowPulse) + pDir * sin(heartSDF * 15.0 - time * 4.0) * 0.02 * lowPulse;
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Physical particle concentration & depletion
            float density = smoothstep(0.06, 0.0, abs(ripples));
            float depletion = smoothstep(0.0, 0.4, abs(ripples));
            
            vec3 baseTint = mix(activeColor1, activeColor2, luma);
            vec3 targetColor = baseTint * (luma * 2.5);
            float blendFactor = 0.85;
            vec3 tintedTex = mix(texColor.rgb, targetColor, blendFactor);
            vec3 finalColor = tintedTex * max(0.0, 1.0 - depletion * 0.5 * uIntensity);
            float antinode = smoothstep(0.0, 0.2, abs(ripples));
            customColor = mix(activeColor1, activeColor2, antinode * 0.8 + luma * 0.2);
            finalColor += customColor * density * 1.8 * uIntensity * luma + activeColor2 * lowPulse * 0.3;
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 1
            // --- VARIATION 1: FLUID SDF ---
            vec2 flowDir = vec2(-grad.y, grad.x);
            
            // Dynamic liquid flow velocity and turbulent vortex density driven by audio mids/highs
            float fluidSpeed = time * (1.5 + midPulse * 3.0) + lowPulse * 0.5;
            float fluidDensity = 3.0 + highPulse * 5.0;
            float flowVar = fbm(p * fluidDensity + fluidSpeed * 0.1);
            
            vec2 warp = flowDir * (0.05 + midPulse * 0.07) * sin(flowVar * 6.0 + time * 2.0);
            warp += grad * cos(baseLuma * 15.0 - time * 4.0) * 0.03 * (1.0 + midPulse);
            warp += vec2(cos(flowVar * 2.0 * PI), sin(flowVar * 2.0 * PI)) * 0.015 * (1.0 + midPulse);
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Physical fluid density accumulation along streams
            float speed = length(warp);
            float fluidAccumulation = smoothstep(0.0, 0.1, speed);
            
            vec3 baseTint = mix(activeColor1, activeColor2, luma);
            vec3 targetColor = baseTint * (luma * 2.5);
            float blendFactor = 0.85;
            vec3 tintedTex = mix(texColor.rgb, targetColor, blendFactor);
            vec3 finalColor = tintedTex * max(0.0, 1.0 + fluidAccumulation * 1.5 * uIntensity);
            vec3 glowCol = mix(activeColor1, activeColor2, speed * 10.0 + luma * 0.3);
            finalColor += glowCol * speed * 2.5 * luma * (1.0 + midPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 2
            // --- VARIATION 2: PARTICLE SWARM ---
            // Dynamic Chladni grid cell division driven by high/low frequencies (simulates acoustic mode morphing)
            float cellFreq = 8.0 + highPulse * 16.0 + lowPulse * 4.0;
            vec2 cell = sin(p * cellFreq + time * 0.5);
            float waveField = cell.x * cell.y;
            
            vec2 brownian = vec2(hash(uv + time), hash(uv - time * 1.3)) - 0.5;
            vec2 swarmPull = grad * (1.0 - abs(waveField)) * 0.08 * (1.0 + highPulse);
            vec2 vibration = grad * sin(waveField * 15.0 - time * 12.0) * 0.03 * highPulse + brownian * 0.008 * highPulse * baseLuma;
            vec2 warp = (swarmPull + vibration);
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Physical particle migration: swarm concentrates at zero-vibration nodes
            float swarmAccumulation = smoothstep(0.4, 0.0, abs(waveField));
            float swarmDepletion = smoothstep(0.0, 0.6, abs(waveField));
            
            vec3 baseTint = mix(activeColor1, activeColor2, luma);
            vec3 targetColor = baseTint * (luma * 2.5);
            float blendFactor = 0.85;
            vec3 tintedTex = mix(texColor.rgb, targetColor, blendFactor);
            vec3 finalColor = tintedTex * max(0.0, 1.0 - swarmDepletion * 0.6 * uIntensity);
            customColor = mix(activeColor1, activeColor2, swarmAccumulation);
            finalColor += customColor * swarmAccumulation * 5.0 * luma * (1.0 + highPulse * 1.5);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 3
            // --- VARIATION 3: TOPOLOGY ---
            float mouseDist = length(p);
            
            // Elevation frequency ripples morph dynamically based on audio mids/highs
            float ridgeDensity = 15.0 + lowPulse * 10.0 + highPulse * 30.0;
            float wave = sin(baseLuma * ridgeDensity - time * (3.0 + highPulse * 5.0) - mouseDist * 6.0 * uMouseSync);
            
            float contour = smoothstep(0.85, 0.98, wave) + smoothstep(0.85, 0.98, sin(baseLuma * 10.0 + time));
            contour = clamp(contour, 0.0, 1.0);
            
            vec2 warp = grad * contour * 0.06 * (1.0 + midPulse) + pDir * sin(mouseDist * 20.0 - time * 5.0) * 0.02 * uMouseSync;
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Topological ridge peak illumination and valley shading
            customColor = mix(activeColor1, activeColor2, sin(luma * 5.0 + time)*0.5+0.5);
            vec3 glowCol = customColor * contour * 4.0 * (1.0 + midPulse);
            
            vec3 finalColor = mix(texColor.rgb * 0.1, glowCol * 1.5, 0.85);
            finalColor += customColor * contour * midPulse * luma;
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 4
            // --- VARIATION 4: PRIME PRIME ---
            float sectors = 13.0;
            float sectorAngle = mod(angle, 2.0 * PI / sectors) - PI / sectors;
            
            // Dynamic radial wave frequencies reacting to low beats and sparkles
            float radialFreq = 15.0 + lowPulse * 10.0 + highPulse * 22.0;
            float radialWave = sin(r * radialFreq - time * (5.0 + highPulse * 8.0)) * cos(angle * sectors);
            
            vec2 tanDir = vec2(-pDir.y, pDir.x);
            vec2 polarWarp = pDir * radialWave * 0.04 * (1.0 + lowPulse);
            polarWarp += tanDir * sectorAngle * 0.02 * lowPulse;
            
            vec2 warp = grad * 0.04 * radialWave + polarWarp;
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float rayGlow = smoothstep(0.04, 0.0, abs(sectorAngle)) * (1.0 - r * 0.5);
            float ringGlow = smoothstep(0.1, 0.0, abs(radialWave));
            
            // Physical ring sector accumulation
            vec3 finalColor = texColor.rgb * (1.0 - rayGlow * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, ringGlow);
            finalColor += customColor * ringGlow * 5.0 * luma * (1.0 + highPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 5
            // --- VARIATION 5: METATRON ---
            float lattice = 0.0;
            
            // High frequency micro-vibrations across Metatron's circular lines driven by audio highs
            float rippleIntensity = 0.01 + highPulse * 0.03;
            float waveLattice = cos(angle * 12.0 + time * 5.0) * rippleIntensity;
            
            for(int i=0; i<6; i++) {
                float ang = float(i) * PI / 3.0 + time * 0.04;
                vec2 node = vec2(cos(ang), sin(ang)) * 0.35;
                float dNode = length(p - node);
                lattice += smoothstep(0.015, 0.0, abs(dNode - 0.25 - waveLattice)) * 0.5;
                lattice += smoothstep(0.02, 0.0, dNode - 0.04) * 0.5;
            }
            
            // Parallax multi-layered rotating outer waves
            float outerR1 = abs(r - 0.35 + sin(angle * 6.0 - time * 0.5) * 0.02);
            float outerR2 = abs(r - 0.6 + sin(angle * 3.0 + time * 0.3) * 0.03);
            lattice += smoothstep(0.02, 0.0, outerR1) * 0.4;
            lattice += smoothstep(0.015, 0.0, outerR2) * 0.3;
            
            vec2 warp = grad * (lattice + 0.5) * 0.05 * (1.0 + lowPulse);
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Physical Metatron lattice condensation
            vec3 finalColor = texColor.rgb * (1.0 - (1.0 - lattice) * 0.6 * uIntensity);
            customColor = mix(activeColor1, activeColor2, sin(r * 10.0 + angle - time * 2.0)*0.5+0.5);
            finalColor += customColor * lattice * 3.8 * luma * (1.0 + lowPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 6
            // --- VARIATION 6: OBSIDIAN GOLD ---
            // Sharp geometric resonance and dark stone texturing
            float hexLattice = sin(angle * 6.0) * cos(r * 20.0 - time * 2.0);
            float geoFreq = 25.0 + highPulse * 20.0;
            float obsidian = fbm(p * 15.0);
            
            vec2 warp = grad * (hexLattice * 0.05 + obsidian * 0.02) * (1.0 + lowPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float geoGlow = smoothstep(0.1, 0.0, abs(hexLattice));
            vec3 finalColor = texColor.rgb * (1.0 - geoGlow * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, luma + highPulse * 0.5);
            finalColor += customColor * geoGlow * 3.0 * luma * (1.0 + midPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 7
            // --- VARIATION 7: BIOLUMINESCENT ---
            // Abyssal web neon blue/cyan fractals
            float web = fbm(p * (10.0 + lowPulse * 5.0) - time);
            float tentacles = sin(angle * 8.0 + web * 10.0) * cos(r * 15.0 - time * 3.0);
            
            vec2 warp = grad * tentacles * 0.08 * (1.0 + midPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float biolum = smoothstep(0.2, 0.0, abs(tentacles - 0.5));
            vec3 finalColor = texColor.rgb * 0.8;
            customColor = mix(activeColor1, activeColor2, web);
            finalColor += customColor * biolum * 4.0 * luma * (1.0 + highPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 8
            // --- VARIATION 8: NEBULA PLASMA ---
            float plasma = fbm(p * 5.0 + vec2(sin(time), cos(time)));
            float cosmicWaves = sin(r * (20.0 + highPulse * 15.0) - time * 5.0 + plasma * 10.0);
            
            vec2 warp = pDir * cosmicWaves * 0.06 * (1.0 + lowPulse) + grad * plasma * 0.04;
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float energy = smoothstep(0.0, 0.5, plasma) * smoothstep(0.5, 0.0, abs(cosmicWaves));
            vec3 finalColor = texColor.rgb * (1.0 - energy * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, sin(r * 10.0 - time)*0.5+0.5);
            finalColor += customColor * energy * 5.0 * luma * (1.0 + lowPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 9
            // --- VARIATION 9: EMERALD MATRIX ---
            // Cybernetic lattice
            vec2 grid = fract(p * (30.0 + lowPulse * 10.0)) - 0.5;
            float lines = smoothstep(0.1, 0.0, abs(grid.x)) + smoothstep(0.1, 0.0, abs(grid.y));
            float dataStream = sin(p.y * 50.0 - time * 20.0);
            
            vec2 warp = grad * lines * 0.03 * (1.0 + midPulse) + vec2(0.0, dataStream * 0.02 * highPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            vec3 finalColor = texColor.rgb * (1.0 - lines * 0.8 * uIntensity);
            customColor = mix(activeColor1, activeColor2, dataStream * 0.5 + 0.5);
            finalColor += customColor * lines * 3.0 * luma * (1.0 + highPulse * 2.0);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 10
            // --- VARIATION 10: MERCURY CRIMSON ---
            float liquid = fbm(p * 8.0 - time * 0.5);
            float metalWaves = sin(r * 25.0 - time * 4.0 + liquid * 6.0);
            
            vec2 warp = grad * metalWaves * 0.07 * (1.0 + lowPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float reflect = smoothstep(0.3, 0.0, abs(metalWaves)) * liquid;
            vec3 finalColor = texColor.rgb * 0.7;
            customColor = mix(activeColor1, activeColor2, liquid);
            finalColor += customColor * reflect * 4.5 * luma * (1.0 + midPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 11
            // --- VARIATION 11: QUANTUM CRYSTAL ---
            float crys = abs(cos(angle * 4.0)) + abs(sin(angle * 4.0));
            float crystalGeo = sin(r * (30.0 + highPulse * 20.0) * crys - time * 2.0);
            
            vec2 warp = pDir * crystalGeo * 0.05 * (1.0 + midPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float shards = smoothstep(0.1, 0.0, abs(crystalGeo));
            vec3 finalColor = texColor.rgb * (1.0 - shards * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, crys * 0.5 + 0.5);
            finalColor += customColor * shards * 5.0 * luma * (1.0 + highPulse * 1.5);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 12
            // --- VARIATION 12: SOLAR FLARE ---
            float flares = fbm(vec2(angle * 5.0, r * 10.0 - time * 3.0));
            float sunburst = sin(angle * 12.0) * cos(r * 15.0 - time * 6.0 + flares * 5.0);
            
            vec2 warp = grad * sunburst * 0.06 * (1.0 + lowPulse) + pDir * flares * 0.03;
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float heat = smoothstep(0.4, 0.0, abs(sunburst)) * flares;
            vec3 finalColor = texColor.rgb * 0.6;
            customColor = mix(activeColor1, activeColor2, r + flares * 0.5);
            finalColor += customColor * heat * 6.0 * luma * (1.0 + lowPulse * 1.5);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 13
            // --- VARIATION 13: AMETHYST FRACTAL ---
            float frac = fbm(p * 20.0 + time);
            float interlocking = sin(p.x * 25.0 + frac * 10.0) * cos(p.y * 25.0 - time * 2.0);
            
            vec2 warp = grad * interlocking * 0.05 * (1.0 + midPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float edges = smoothstep(0.15, 0.0, abs(interlocking));
            vec3 finalColor = texColor.rgb * (1.0 - edges * 0.4 * uIntensity);
            customColor = mix(activeColor1, activeColor2, frac);
            finalColor += customColor * edges * 4.5 * luma * (1.0 + highPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#else
            // --- FALLBACK ---
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
#endif

            // Apply universal tint using uColor1/uColor2 so color pickers work even at low intensity
            float finalLuma = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
            vec3 globalTint = mix(uColor1, uColor2, finalLuma);
            gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * globalTint * 2.5, 0.5);
        }
        `;
    } else if (classId === 23) {
        return `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform vec2 uMouse;
        uniform sampler2D uTexture;
        uniform float uAlpha;
        uniform float uMouseSync; // Added missing uniform
        
        void main() {
            vec2 uv = vUv;
            
            // Audio react scales
            float lowPulse = uAudioLow * 0.2 * uIntensity;
            float midPulse = uAudioMid * 0.15 * uIntensity;
            float highPulse = uAudioHigh * 0.1 * uIntensity;
            
            // Smooth breathing scale centered on UV
            vec2 centeredUv = uv - 0.5;
            float scale = 1.0 - (lowPulse * 0.3) - (sin(uTime * 0.5) * 0.02 * uIntensity);
            
            // Mouse Sync Parallax Tilt
            if (uMouseSync > 0.5) {
                vec2 mouseDelta = (uMouse - 0.5) * 2.0; // -1 to 1
                // Inverse tilt based on mouse position to create parallax
                centeredUv += mouseDelta * 0.05 * uIntensity;
            }
            
            uv = (centeredUv * scale) + 0.5;
            
            // Ensure UV stays within bounds to prevent wrap-around artifacting
            if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
                gl_FragColor = vec4(0.0);
                return;
            }

            vec4 texColor = texture2D(uTexture, uv);
            
            // Preserve pristine aesthetic, only use color1/color2 as a subtle underlying ambient glow
            // based on the image's luminance
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Add subtle glow behind/on top of the geometry based on beat intensity
            vec3 glowColor = mix(uColor1, uColor2, sin(uTime + luma) * 0.5 + 0.5);
            vec3 finalColor = texColor.rgb + (glowColor * luma * highPulse * 2.0);
            
            // Subtle pulse
            finalColor *= 1.0 + (midPulse * 0.5);
            
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);
        }
        `;
    } else if (classId === 24) {
        return `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform vec3 uColor1; // Aura Color
        uniform vec3 uColor2; // Constellation Line Color
        uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform sampler2D uTexture;  // Layer 3: Animal Aura
        uniform sampler2D uTexture2; // Layer 1: Background
        uniform sampler2D uTexture3; // Layer 2: Constellation Lines
        uniform float uShowLines;
        uniform float uAlpha;
        uniform float uLayer2Type; // 0=None, 1=Procedural Constellation, 2=Sri Yantra, 3=Metatron's Cube

        // Basic SDF utilities
        float sdCircle(vec2 p, float r) {
            return length(p) - r;
        }
        float sdTriangle(vec2 p, float r) {
            const float k = sqrt(3.0);
            p.x = abs(p.x) - r;
            p.y = p.y + r / k;
            if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
            p.x -= clamp(p.x, -2.0 * r, 0.0);
            return -length(p) * sign(p.y);
        }
        float sdHexagon(vec2 p, float r) {
            const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
            p = abs(p);
            p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
            p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
            return length(p) * sign(p.y);
        }

        
        void main() {
            vec2 uv = vUv;
            
            // Cosmic Intensity Warp for Background
            float audioGlobal = (uAudioLow + uAudioMid + uAudioHigh) * 0.1;
            float warpScale = uIntensity * 0.1 + audioGlobal * 0.5;
            vec2 warp = vec2(sin(uv.y * 10.0 + uTime), cos(uv.x * 10.0 + uTime)) * warpScale;
            vec2 bgUv = uv + warp * 0.5;
            
            // Gentle breathing warp for Aura & Lines
            vec2 gentleWarp = vec2(sin(uv.y * 5.0 + uTime*0.5), cos(uv.x * 5.0 + uTime*0.5)) * (warpScale * 0.15);
            vec2 fgUv = uv + gentleWarp;
            
            // Sample layers
            vec4 bgColor = texture2D(uTexture2, clamp(bgUv, 0.0, 1.0));
            vec4 auraTex = texture2D(uTexture, fgUv);
            
            // Procedural Constellation Overlay (Sparse Lattice & Cutout Blending)
            float d = 0.01; // thicker edge
            float rawLum = dot(auraTex.rgb, vec3(0.333));
            float lumC = smoothstep(0.4, 0.6, rawLum); // Ignore ambient neon fog, only trigger on core animal
            
            float lumN = smoothstep(0.4, 0.6, dot(texture2D(uTexture, fgUv + vec2(0.0, d)).rgb, vec3(0.333)));
            float lumS = smoothstep(0.4, 0.6, dot(texture2D(uTexture, fgUv + vec2(0.0, -d)).rgb, vec3(0.333)));
            float lumE = smoothstep(0.4, 0.6, dot(texture2D(uTexture, fgUv + vec2(d, 0.0)).rgb, vec3(0.333)));
            float lumW = smoothstep(0.4, 0.6, dot(texture2D(uTexture, fgUv + vec2(-d, 0.0)).rgb, vec3(0.333)));
            
            // Perfect clean outline of the animal
            float edge = abs(lumN - lumC) + abs(lumS - lumC) + abs(lumE - lumC) + abs(lumW - lumC);
            edge = smoothstep(0.1, 0.8, edge);
            
            // Cybernetic geometric lattice (Sparse & thick for high visibility)
            vec2 latticeUv = vec2(
                fgUv.x * cos(0.5) - fgUv.y * sin(0.5),
                fgUv.x * sin(0.5) + fgUv.y * cos(0.5)
            ) * 12.0;
            
            float gridX = smoothstep(0.9, 1.0, sin(latticeUv.x));
            float gridY = smoothstep(0.9, 1.0, sin(latticeUv.y));
            float lattice = max(gridX, gridY) * lumC;
            
            // Glowing star nodes at intersections
            float nodes = gridX * gridY * lumC * 3.0; // bright stars
            
            float constellationIntensity = 0.0;
            
            if (uLayer2Type == 1.0) {
                // Combine outline, lattice, and stars
                constellationIntensity = max(edge * 1.5, max(lattice, nodes));
            } else if (uLayer2Type == 2.0) {
                // Sri Yantra (Simplified interlocking triangles)
                vec2 centerP = (uv - 0.5) * 2.0;
                float dTri1 = sdTriangle(centerP * 1.5 + vec2(0.0, -0.2), 0.5);
                float dTri2 = sdTriangle(vec2(centerP.x, -centerP.y) * 1.5 + vec2(0.0, -0.2), 0.5);
                float dTri3 = sdTriangle(centerP * 2.0 + vec2(0.0, -0.1), 0.4);
                float dTri4 = sdTriangle(vec2(centerP.x, -centerP.y) * 2.0 + vec2(0.0, -0.1), 0.4);
                
                float lines = smoothstep(0.02, 0.0, abs(dTri1)) + smoothstep(0.02, 0.0, abs(dTri2)) + 
                              smoothstep(0.02, 0.0, abs(dTri3)) + smoothstep(0.02, 0.0, abs(dTri4));
                float circles = smoothstep(0.02, 0.0, abs(sdCircle(centerP, 0.7))) + smoothstep(0.02, 0.0, abs(sdCircle(centerP, 0.8)));
                constellationIntensity = clamp(lines + circles, 0.0, 1.0);
            } else if (uLayer2Type == 3.0) {
                // Metatron's Cube (Simplified Hexagons and Circles)
                vec2 centerP = (uv - 0.5) * 2.0;
                float hex1 = smoothstep(0.02, 0.0, abs(sdHexagon(centerP, 0.5)));
                float hex2 = smoothstep(0.02, 0.0, abs(sdHexagon(centerP, 0.8)));
                float circle1 = smoothstep(0.03, 0.0, abs(sdCircle(centerP, 0.8)));
                
                // 6 Outer Circles
                float outerCircles = 0.0;
                for (int i = 0; i < 6; i++) {
                    float angle = float(i) * 1.04719755; // PI/3
                    vec2 pos = vec2(cos(angle), sin(angle)) * 0.5;
                    outerCircles += smoothstep(0.02, 0.0, abs(sdCircle(centerP - pos, 0.15)));
                }
                
                constellationIntensity = clamp(hex1 + hex2 + circle1 + outerCircles, 0.0, 1.0);
            }
            
            vec3 proceduralLines = vec3(constellationIntensity) * uColor2 * 2.0;
            
            // Tinting: Boost the original texture and add vibrant color overlay so it's clearly visible
            vec3 tintedAura = auraTex.rgb + (auraTex.rgb * uColor1 * 2.5);
            
            // Phase 3: Frequency-Separated Audio-Reactive Sync
            // Background pulses softly with Bass (uAudioLow)
            vec3 reactiveBg = bgColor.rgb * (1.0 + uAudioLow * 0.4);
            // Animal Aura breathes with Mid-tones (uAudioMid)
            vec3 reactiveAura = tintedAura * (1.0 + uAudioMid * 0.8);
            // Constellation Lines aggressively flash/sparkle with Treble (uAudioHigh)
            vec3 reactiveLines = proceduralLines * (1.0 + max(uAudioHigh, uAudioMid * 0.5) * 3.0) * uShowLines;
            
            // Cutout Blending: Constellation violently overwrites/cuts through the Aura
            vec3 finalColor = reactiveBg + mix(reactiveAura, reactiveLines, clamp(constellationIntensity * uShowLines, 0.0, 1.0));
            
            // Calculate final max alpha to prevent solid black squares
            float maxAlpha = max(bgColor.a, auraTex.a);
            
            gl_FragColor = vec4(finalColor, maxAlpha * uAlpha);
        }
        `;
    } else if (classId === 25) {
        return `
        uniform float uTime;
        uniform float uAspect;
        uniform vec3 uColor1;
        uniform float uIntensity;
        uniform float uAlpha;
        uniform float uObserver; // 0.0 = wave, 1.0 = particle

        varying vec2 vUv;

        // HSV conversion for dynamic complementary colors
        vec3 rgb2hsv(vec3 c) {
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }

        vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;

            // Compute dynamic perfect complement of uColor1
            vec3 hsv = rgb2hsv(uColor1);
            hsv.x = fract(hsv.x + 0.5); // shift hue 180 degrees
            vec3 dynamicColor2 = hsv2rgb(hsv);

            // Slit positions (bottom of screen)
            vec2 slit1 = vec2(-0.3, -0.8);
            vec2 slit2 = vec2(0.3, -0.8);

            float freq = 40.0;
            float speed = 2.0;
            float t = uTime * speed + uIntensity * 2.0;

            // Wave Function (Unobserved)
            float dist1 = length(uv - slit1);
            float dist2 = length(uv - slit2);
            float wave1 = sin(dist1 * freq - t);
            float wave2 = sin(dist2 * freq - t);
            
            // Constructive / Destructive Interference
            float interference = wave1 + wave2;
            float intensityWave = interference * interference * 0.25; // Normalize 0 to 1
            
            // Attenuate wave intensity by distance and direction (only propagates upward)
            float dirAtten1 = smoothstep(-1.0, 0.2, uv.y - slit1.y);
            float dirAtten2 = smoothstep(-1.0, 0.2, uv.y - slit2.y);
            float waveFalloff = exp(-0.8 * (dist1 + dist2) * 0.5);
            intensityWave *= waveFalloff * ((dirAtten1 + dirAtten2) * 0.5);

            // Particle Collapse (Observed)
            // Particles travel in straight probabilistic paths (Gaussian bands)
            float p1x = (uv.x - slit1.x) * 15.0;
            float particle1 = exp(-(p1x * p1x));
            float p2x = (uv.x - slit2.x) * 15.0;
            float particle2 = exp(-(p2x * p2x));
            float intensityParticle = particle1 + particle2;
            
            // Pulse the particles traveling upward
            float particlePulse1 = sin((uv.y - slit1.y) * 10.0 - t * 2.0) * 0.5 + 0.5;
            float particlePulse2 = sin((uv.y - slit2.y) * 10.0 - t * 2.0) * 0.5 + 0.5;
            intensityParticle *= (particlePulse1 + particlePulse2) * 0.5;
            
            // Attenuate particle intensity by vertical distance
            float particleFalloff = 1.0 - smoothstep(-0.8, 1.2, uv.y);
            intensityParticle *= particleFalloff;
            
            // Smoothly interpolate between Wave and Particle based on uObserver
            float finalIntensity = mix(intensityWave, intensityParticle, uObserver);
            
            // Create glowing slit sources
            float sourceGlow = 0.05 / (length(uv - slit1) + 0.01) + 0.05 / (length(uv - slit2) + 0.01);
            finalIntensity += sourceGlow;

            // Add audio reactive glow
            finalIntensity += uIntensity * 0.3 * exp(-length(uv) * 2.0);

            // Color mapping: interpolate from background (black) to Color1, then Complementary Color for high intensity
            vec3 col = mix(vec3(0.0), uColor1, smoothstep(0.0, 0.5, finalIntensity));
            col = mix(col, dynamicColor2, smoothstep(0.4, 1.0, finalIntensity));

            gl_FragColor = vec4(col, finalIntensity * uAlpha);
        }
        `;
    } else {
        return `void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }`;
    }
};

export class CymaticsCore {
    constructor(group) {
        this.group = group;
        this.meshes = [];
        this.activeClassId = 22;
        this.activeVariationId = 0;
        this.materials = {};
        this.rainbowMode = false;
        
        // Safe 1x1 transparent dummy texture to prevent GPU address violations on strict Metal drivers
        const dummyTexture = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1, THREE.RGBAFormat);
        dummyTexture.needsUpdate = true;
        this.dummyTexture = dummyTexture;
        
        // Setup a full-screen quad for 2D cymatics rendering
        const geometry = new THREE.PlaneGeometry(2, 2);
        
        for (let i = 1; i <= 25; i++) {
            const rawFragmentShader = getFragmentShader(i);
            let injectedShader = rawFragmentShader;
            if (i <= 16) {
                injectedShader = injectedShader.replace(
                    'uniform float uIntensity;',
                    'uniform float uIntensity;\n        uniform float uAudioLow;\n        uniform float uAudioMid;\n        uniform float uAudioHigh;'
                );
                injectedShader = injectedShader.replace(
                    'float intMod = max(0.1, uIntensity);',
                    'float intMod = max(0.1, uIntensity * (1.0 + uAudioLow * 3.0 + uAudioMid * 1.5));'
                );
            }

            // Universal Mouse Sync Injection
            if (!injectedShader.includes('uniform float uMouseSync;')) {
                let injectStr = '';
                if (!/uniform\s+vec2\s+uMouse\s*;/.test(injectedShader)) {
                    injectStr += 'uniform vec2 uMouse;\n        ';
                }
                injectStr += 'uniform float uMouseSync;\n        void main() {';
                
                injectedShader = injectedShader.replace(
                    'void main() {', 
                    injectStr
                );
            }
            if (i <= 21) {
                // Add mouse warping vector to base coordinate logic
                if (injectedShader.includes('vec2 p = (vUv - 0.5) * 2.0;')) {
                    injectedShader = injectedShader.replace(
                        'vec2 p = (vUv - 0.5) * 2.0;',
                        'vec2 p = (vUv - 0.5) * 2.0;\n            p -= uMouse * uMouseSync * 0.5;'
                    );
                } else if (injectedShader.includes('vec2 uv = (vUv - 0.5) * 2.0;')) {
                    injectedShader = injectedShader.replace(
                        'vec2 uv = (vUv - 0.5) * 2.0;',
                        'vec2 uv = (vUv - 0.5) * 2.0;\n            uv -= uMouse * uMouseSync * 0.5;'
                    );
                } else if (injectedShader.includes('vec2 up = (vUv - 0.5) * 2.0;')) {
                    injectedShader = injectedShader.replace(
                        'vec2 up = (vUv - 0.5) * 2.0;',
                        'vec2 up = (vUv - 0.5) * 2.0;\n            up -= uMouse * uMouseSync * 0.5;'
                    );
                }
            }

            const safeFragmentShader = `
                float safe_atan(float y, float x) {
                    float isZero = step(abs(x) + abs(y), 1e-10);
                    return atan(y, x + isZero * 1e-5);
                }
                float safe_atan(float y_over_x) {
                    return atan(y_over_x);
                }
                vec2 safe_normalize(vec2 v) {
                    float len = length(v);
                    return v / (len + step(len, 1e-10) * 1e-5);
                }
                vec3 safe_normalize(vec3 v) {
                    float len = length(v);
                    return v / (len + step(len, 1e-10) * 1e-5);
                }
                vec4 safe_normalize(vec4 v) {
                    float len = length(v);
                    return v / (len + step(len, 1e-10) * 1e-5);
                }
                float safe_smoothstep(float edge0, float edge1, float x) {
                    if (edge0 > edge1) {
                        return 1.0 - smoothstep(edge1, edge0, x);
                    }
                    return smoothstep(edge0, edge1, x);
                }
                #define atan safe_atan
                #define normalize safe_normalize
                #define smoothstep safe_smoothstep
                
                ${injectedShader}
            `;

            this.materials[i] = new THREE.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: safeFragmentShader,
                defines: {
                    VARIATION: 0
                },
                uniforms: {
                    uTime: { value: 0 },
                    uAspect: { value: 1.0 },
                    uColor1: { value: new THREE.Color(0x60a9ff) },
                    uColor2: { value: new THREE.Color(0xa855f7) },
                    uIntensity: { value: 1.0 },
                    uSpeed: { value: 1.0 },
                    uHarmonics: { value: 0.0 },
                    uVariation: { value: 0.0 },
                    uLayer2Type: { value: 0.0 },
                    uAudioLow: { value: 0.0 },
                    uAudioMid: { value: 0.0 },
                    uAudioHigh: { value: 0.0 },
                    uMouse: { value: new THREE.Vector2(0, 0) },
                    uAlpha: { value: 1.0 },
                    uSpawnTime: { value: 0.0 },
                    uTexture: { value: this.dummyTexture },
                    uTexture2: { value: this.dummyTexture },
                    uTexture3: { value: this.dummyTexture },
                    uShowLines: { value: 1.0 },
                    uMouseSync: { value: 0.0 },
                    uObserver: { value: 0.0 }
                },
                transparent: true,
                depthWrite: false,
                depthTest: false,
                blending: THREE.AdditiveBlending
            });
            
            const mesh = new THREE.Mesh(geometry, this.materials[i]);
            mesh.visible = false;
            mesh.frustumCulled = false; // Prevent clipping on camera movement
            // Position it right in front of the camera
            mesh.position.z = -1; 

            this.meshes.push(mesh);
            this.group.add(mesh);
        }
        
        // Explicitly bind and store window listener to prevent detached memory leaks
        this._boundCymaticsToggleMouseSync = (e) => {
            for (let i = 1; i <= 25; i++) {
                if (this.materials[i] && this.materials[i].uniforms.uMouseSync) {
                    this.materials[i].uniforms.uMouseSync.value = e.detail.sync;
                }
            }
        };
        window.addEventListener('cymaticsToggleMouseSync', this._boundCymaticsToggleMouseSync);
        
        // Initial setup for the first class
        setTimeout(() => {
            this.setPattern(this.activeClassId, this.activeVariationId);
        }, 50);
    }

    setPattern(classId, variationId, skipColorReset = false) {
        // [MEMORY OPTIMIZATION] Clean up unused textures to prevent VRAM exhaustion
        if (this.activeClassId !== classId && this.textureCache) {
            console.log(`[CymaticsCore] Disposing textures for Class ${this.activeClassId} to free VRAM.`);
            for (const key in this.textureCache) {
                if (this.textureCache[key]) {
                    this.textureCache[key].dispose();
                }
            }
            this.textureCache = {};
            
            // Also reset dummy textures to ensure a clean slate
            if (this.dummyTexture) {
                for (let i = 1; i <= 25; i++) {
                    if (this.materials[i]) {
                        if (this.materials[i].uniforms.uTexture) this.materials[i].uniforms.uTexture.value = this.dummyTexture;
                        if (this.materials[i].uniforms.uTexture2) this.materials[i].uniforms.uTexture2.value = this.dummyTexture;
                        if (this.materials[i].uniforms.uTexture3) this.materials[i].uniforms.uTexture3.value = this.dummyTexture;
                    }
                }
            }
        }

        this.activeClassId = classId;
        this.activeVariationId = variationId;
        
        // Hide all, show active
        this.meshes.forEach((mesh, index) => {
            mesh.visible = (index + 1 === classId);
            
            // Fix Teahupo'o camera/mesh perspective so it looks like a wave on load
            if (index + 1 === 25) {
                mesh.rotation.x = -Math.PI / 3; 
                mesh.position.y = -2;
                mesh.position.z = -10;
            } else {
                mesh.rotation.x = 0;
                mesh.position.y = 0;
                mesh.position.z = -1;
            }
        });

        if (this.materials[classId]) {
            // Update variation uniform (always matches the actual index to load the right texture)
            this.materials[classId].uniforms.uVariation.value = variationId;
            
            // Map the shader logic index for Class 22 since we have more textures than unique shaders
            let shaderVariation = variationId;
            if (classId === 22) {
                shaderVariation = variationId % 14; // Safely wrap around to 0-13
            }
            
            // DEBOUNCE SHADER RECOMPILATION to prevent TDR crashes when rapidly clicking through variations
            if ((classId >= 17 && classId <= 23) && this.materials[classId].defines.VARIATION !== shaderVariation) {
                if (this._shaderCompileTimeout) clearTimeout(this._shaderCompileTimeout);
                
                this._shaderCompileTimeout = setTimeout(() => {
                    // Only recompile if the variation is still the active one after they stop clicking
                    if (this.activeVariationId === variationId && this.activeClassId === classId) {
                        this.materials[classId].defines.VARIATION = shaderVariation;
                        this.materials[classId].needsUpdate = true;
                        if (this.materials[classId].uniforms.uSpawnTime) {
                            this.materials[classId].uniforms.uSpawnTime.value = (performance.now() * 0.001) % (2000.0 * Math.PI);
                        }
                    }
                }, 300); // 300ms debounce
            }
            
            // Inject distinct colors automatically
            if (!skipColorReset && CYMATICS_PALETTES[classId] && CYMATICS_PALETTES[classId][variationId]) {
                const colors = CYMATICS_PALETTES[classId][variationId];
                this.materials[classId].uniforms.uColor1.value.setHex(colors[0]);
                this.materials[classId].uniforms.uColor2.value.setHex(colors[1]);
                
                // Dispatch event to sync UI color pickers
                try {
                    window.dispatchEvent(new CustomEvent('cymaticColorSync', { 
                        detail: { 
                            classId: classId, 
                            color1: '#' + colors[0].toString(16).padStart(6, '0'), 
                            color2: '#' + colors[1].toString(16).padStart(6, '0') 
                        } 
                    }));
                } catch(e) {}
            }
            
            // Handle specific Class 22 texture loading with caching to prevent GPU memory leaks
            if (classId === 22) {
                const texUrls = [
                    'binaural-assets/images/cymatics/cymatics_fractal_heart_1779756441610.png',
                    'binaural-assets/images/cymatics/cymatics_fluid_sdf_1779756501734.png',
                    'binaural-assets/images/cymatics/cymatics_particle_swarm_1779756471939.png',
                    'binaural-assets/images/cymatics/cymatics_quantum_topology_1779756531135.png',
                    'binaural-assets/images/cymatics/ai_cymatic_15_1779566362935.png',
                    'binaural-assets/images/cymatics/ai_cymatic_16_1779566377245.png',
                    'binaural-assets/images/cymatics/cymatic_sacred_gold_obsidian.png',
                    'binaural-assets/images/cymatics/cymatic_biolum_abyssal.png',
                    'binaural-assets/images/cymatics/ai_cymatic_0.png',
                    'binaural-assets/images/cymatics/ai_cymatic_1.png',
                    'binaural-assets/images/cymatics/ai_cymatic_2.png',
                    'binaural-assets/images/cymatics/ai_cymatic_3.png',
                    'binaural-assets/images/cymatics/ai_cymatic_4.png',
                    'binaural-assets/images/cymatics/ai_cymatic_5.png',
                    'binaural-assets/images/cymatics/ai_cymatic_6.png',
                    'binaural-assets/images/cymatics/ai_cymatic_7.png',
                    'binaural-assets/images/cymatics/ai_cymatic_8.png',
                    'binaural-assets/images/cymatics/ai_cymatic_9.png',
                    'binaural-assets/images/cymatics/ai_cymatic_10.png',
                    'binaural-assets/images/cymatics/ai_cymatic_11.png',
                    'binaural-assets/images/cymatics/ai_cymatic_12.png',
                    'binaural-assets/images/cymatics/ai_cymatic_13.png',
                    'binaural-assets/images/cymatics/ai_cymatic_14.png',
                    'binaural-assets/images/cymatics/ai_cymatic_15.png',
                    'binaural-assets/images/cymatics/ai_cymatic_16.png',
                    'binaural-assets/images/cymatics/ai_cymatic_0.png',
                    'binaural-assets/images/cymatics/ai_cymatic_1.png',
                    'binaural-assets/images/cymatics/ai_cymatic_2.png',
                    'binaural-assets/images/cymatics/ai_cymatic_3.png',
                    'binaural-assets/images/cymatics/ai_cymatic_4.png'
                ];
                
                if (texUrls[variationId]) {
                    if (!this.textureCache) {
                        this.textureCache = {};
                    }
                    if (this.textureCache[variationId]) {
                        this.materials[classId].uniforms.uTexture.value = this.textureCache[variationId];
                    } else {
                        const loader = new THREE.TextureLoader();
                        loader.load(texUrls[variationId], (tex) => {
                            tex.generateMipmaps = false;
                            tex.minFilter = THREE.LinearFilter;
                            this.textureCache[variationId] = tex;
                            // Only assign if the user is still active on this exact pattern to avoid async race conditions
                            if (this.activeClassId === classId && this.activeVariationId === variationId) {
                                this.materials[classId].uniforms.uTexture.value = tex;
                            }
                        });
                    }
                }
            } else if (classId === 23) {
                const texUrls23 = [
                    'binaural-assets/images/cymatics/ai_cymatic_5.png',
                    'binaural-assets/images/cymatics/ai_cymatic_6.png',
                    'binaural-assets/images/cymatics/ai_cymatic_7.png',
                    'binaural-assets/images/cymatics/ai_cymatic_8.png'
                ];
                if (texUrls23[variationId]) {
                    if (!this.textureCache) this.textureCache = {};
                    const cacheKey = "c23_" + variationId;
                    if (this.textureCache[cacheKey]) {
                        this.materials[classId].uniforms.uTexture.value = this.textureCache[cacheKey];
                    } else {
                        const loader = new THREE.TextureLoader();
                        loader.load(texUrls23[variationId], (tex) => {
                            tex.generateMipmaps = false;
                            tex.minFilter = THREE.LinearFilter;
                            tex.wrapS = THREE.RepeatWrapping;
                            tex.wrapT = THREE.RepeatWrapping;
                            this.textureCache[cacheKey] = tex;
                            if (this.activeClassId === classId && this.activeVariationId === variationId) {
                                this.materials[classId].uniforms.uTexture.value = tex;
                            }
                        });
                    }
                }
            } else if (classId === 24) {
                const animals = [
                    'binaural-assets/images/cymatics/ai_cymatic_9.png', // 0
                    'binaural-assets/images/cymatics/ai_cymatic_10.png', // 1
                    'binaural-assets/images/cymatics/ai_cymatic_11.png', // 2
                    'binaural-assets/images/cymatics/ai_cymatic_12.png', // 3
                    'binaural-assets/images/cymatics/ai_cymatic_13.png', // 4
                    'binaural-assets/images/cymatics/ai_cymatic_14.png',
                    'binaural-assets/images/cymatics/ai_cymatic_15.png',
                    'binaural-assets/images/cymatics/ai_cymatic_16.png',
                    'binaural-assets/images/cymatics/ai_cymatic_0.png',
                    'binaural-assets/images/cymatics/ai_cymatic_1.png',
                    'binaural-assets/images/cymatics/constellations/aura_shark_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_2.png',
                    'binaural-assets/images/cymatics/ai_cymatic_3.png',
                    'binaural-assets/images/cymatics/ai_cymatic_4.png',
                    'binaural-assets/images/cymatics/constellations/aura_salmon_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_5.png',
                    'binaural-assets/images/cymatics/ai_cymatic_6.png',
                    'binaural-assets/images/cymatics/constellations/aura_leopard_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_7.png',
                    'binaural-assets/images/cymatics/ai_cymatic_8.png',
                    'binaural-assets/images/cymatics/ai_cymatic_9.png',
                    'binaural-assets/images/cymatics/constellations/aura_koala_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_10.png',
                    'binaural-assets/images/cymatics/ai_cymatic_11.png',
                    'binaural-assets/images/cymatics/ai_cymatic_12.png',
                    'binaural-assets/images/cymatics/constellations/aura_lizard_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_13.png',
                    'binaural-assets/images/cymatics/ai_cymatic_14.png',
                    'binaural-assets/images/cymatics/ai_cymatic_15.png',
                    'binaural-assets/images/cymatics/ai_cymatic_16.png',
                    'binaural-assets/images/cymatics/ai_cymatic_0.png',
                    'binaural-assets/images/cymatics/ai_cymatic_1.png',
                    'binaural-assets/images/cymatics/ai_cymatic_2.png'
                ];
                const bgs = [
                    'binaural-assets/images/cymatics/ai_cymatic_3.png',
                    'binaural-assets/images/cymatics/ai_cymatic_4.png',
                    'binaural-assets/images/cymatics/ai_cymatic_5.png'
                ];
                const lineImages = [
                    'binaural-assets/images/cymatics/ai_cymatic_6.png', // 0
                    'binaural-assets/images/cymatics/ai_cymatic_7.png', // 1
                    'binaural-assets/images/cymatics/ai_cymatic_8.png', // 2
                    'binaural-assets/images/cymatics/ai_cymatic_9.png', // 3
                    'binaural-assets/images/cymatics/ai_cymatic_10.png', // 4
                    'binaural-assets/images/cymatics/ai_cymatic_11.png',
                    'binaural-assets/images/cymatics/constellations/horse_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_12.png',
                    'binaural-assets/images/cymatics/constellations/cat_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_13.png',
                    'binaural-assets/images/cymatics/constellations/shark_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_14.png',
                    'binaural-assets/images/cymatics/constellations/orca_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_15.png',
                    'binaural-assets/images/cymatics/constellations/salmon_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_16.png',
                    'binaural-assets/images/cymatics/constellations/alligator_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_0.png',
                    'binaural-assets/images/cymatics/constellations/panther_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_1.png',
                    'binaural-assets/images/cymatics/constellations/mongoose_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_2.png',
                    'binaural-assets/images/cymatics/constellations/panda_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_3.png',
                    'binaural-assets/images/cymatics/constellations/monkey_constellation_dummy.webp',
                    'binaural-assets/images/cymatics/ai_cymatic_4.png',
                    'binaural-assets/images/cymatics/constellations/dog_constellation_dummy.webp',
                ];


                let auraId = this.activeAuraId !== undefined ? this.activeAuraId : variationId;
                if (animals[auraId]) {
                    const cacheKeyAura = "c24_aura_" + auraId;
                    if (!this.textureCache) this.textureCache = {};
                    if (this.textureCache[cacheKeyAura]) {
                         this.materials[classId].uniforms.uTexture.value = this.textureCache[cacheKeyAura];
                    } else {
                        const loader = new THREE.TextureLoader();
                        loader.load(animals[auraId], (tex) => {
                            tex.generateMipmaps = false;
                            tex.minFilter = THREE.LinearFilter;
                            this.textureCache[cacheKeyAura] = tex;
                            // As long as the class is still 24 and the aura is still the one we requested, set it.
                            let currentAuraId = this.activeAuraId !== undefined ? this.activeAuraId : this.activeVariationId;
                            if (this.activeClassId === classId && currentAuraId === auraId) {
                                this.materials[classId].uniforms.uTexture.value = tex;
                            }
                        });
                    }
                }

                // If activeLinesId is set, use it. Otherwise fallback to auraId so they match.
                let lineId = this.activeLinesId !== undefined ? this.activeLinesId : auraId;
                if (lineImages[lineId]) {
                    const cacheKeyLines = "c24_lines_" + lineId;
                    if (!this.textureCache) this.textureCache = {};
                    if (this.textureCache[cacheKeyLines]) {
                         this.materials[classId].uniforms.uTexture3.value = this.textureCache[cacheKeyLines];
                    } else {
                        const loader = new THREE.TextureLoader();
                        loader.load(lineImages[lineId], (tex) => {
                            tex.generateMipmaps = false;
                            tex.minFilter = THREE.LinearFilter;
                            this.textureCache[cacheKeyLines] = tex;
                            
                            let currentLineId = this.activeLinesId !== undefined ? this.activeLinesId : (this.activeAuraId !== undefined ? this.activeAuraId : this.activeVariationId);
                            if (this.activeClassId === classId && currentLineId === lineId) {
                                this.materials[classId].uniforms.uTexture3.value = tex;
                            }
                        });
                    }
                } else {
                    this.materials[classId].uniforms.uTexture3.value = this.dummyTexture;
                }

                let bgId = this.activeBackgroundId || 0;
                if (bgs[bgId]) {
                    const cacheKeyBg = "c24_bg_" + bgId;
                    if (!this.textureCache) this.textureCache = {};
                    if (this.textureCache[cacheKeyBg]) {
                         this.materials[classId].uniforms.uTexture2.value = this.textureCache[cacheKeyBg];
                    } else {
                        const loader = new THREE.TextureLoader();
                        loader.load(bgs[bgId], (tex) => {
                            tex.generateMipmaps = false;
                            tex.minFilter = THREE.LinearFilter;
                            tex.wrapS = THREE.RepeatWrapping;
                            tex.wrapT = THREE.RepeatWrapping;
                            this.textureCache[cacheKeyBg] = tex;
                            
                            let currentBgId = this.activeBackgroundId || 0;
                            if (this.activeClassId === classId && currentBgId === bgId) {
                                this.materials[classId].uniforms.uTexture2.value = tex;
                            }
                        });
                    }
                }
            }
            
            // Sync the toggle state for all classes
            if (this.materials[classId] && this.materials[classId].uniforms.uMouseSync) {
                this.materials[classId].uniforms.uMouseSync.value = window.cymaticsMouseSync || 0.0;
            }
        }
    }

    setConstellationBackground(bgId) {
        this.activeBackgroundId = bgId;
        if (this.activeClassId === 24) {
            this.setPattern(24, this.activeVariationId, true);
        }
    }

    setConstellationLines(linesId) {
        this.activeLinesId = linesId;
        if (this.activeClassId === 24) {
            this.setPattern(24, this.activeVariationId, true);
        }
    }

    setConstellationAura(auraId) {
        this.activeAuraId = auraId;
        if (this.activeClassId === 24) {
            this.setPattern(24, this.activeVariationId, true);
        }
    }

    setConstellationLayer2Type(typeId) {
        // Obsolete, but kept for backwards compatibility if needed
        this.setConstellationLines(parseInt(typeId));
    }

    setColor(classId, colorIndex, hex) {
        if (this.materials[classId]) {
            const uniformName = colorIndex === 1 ? 'uColor1' : 'uColor2';
            this.materials[classId].uniforms[uniformName].value.set(hex);
        }
    }

    setParam(classId, paramName, value) {
        if (this.materials[classId]) {
            if (paramName === 'intensity') {
                this.materials[classId].uniforms.uIntensity.value = value;
            } else if (paramName === 'speed' && this.materials[classId].uniforms.uSpeed) {
                this.materials[classId].uniforms.uSpeed.value = value;
            } else if (paramName === 'harmonics' && this.materials[classId].uniforms.uHarmonics) {
                this.materials[classId].uniforms.uHarmonics.value = value;
            } else if (this.materials[classId].uniforms[`u${paramName.charAt(0).toUpperCase() + paramName.slice(1)}`]) {
                // Dynamically set other parameters (Resonance, Entropy, Flow) if uniform exists
                this.materials[classId].uniforms[`u${paramName.charAt(0).toUpperCase() + paramName.slice(1)}`].value = value;
            }
        }
    }

    update(time, audioData, mouseData) {
        if (this.materials[this.activeClassId]) {
            this.materials[this.activeClassId].uniforms.uTime.value = time;
            this.materials[this.activeClassId].uniforms.uAspect.value = window.innerWidth / (window.innerHeight || 1);
            
            if (audioData) {
                let audioSync = (window.cymaticsAudioSync !== undefined) ? window.cymaticsAudioSync : 1.0;
                this.materials[this.activeClassId].uniforms.uAudioLow.value = (audioData.bass || 0) * audioSync;
                this.materials[this.activeClassId].uniforms.uAudioMid.value = (audioData.mids || 0) * audioSync;
                this.materials[this.activeClassId].uniforms.uAudioHigh.value = (audioData.highs || 0) * audioSync;
            }
            if (mouseData) {
                this.materials[this.activeClassId].uniforms.uMouse.value.set(mouseData.x || 0, mouseData.y || 0);
            }

            if (this.rainbowMode) {
                const hue1 = (time * 0.1) % 1.0;
                const hue2 = (hue1 + 0.5) % 1.0;
                this.materials[this.activeClassId].uniforms.uColor1.value.setHSL(hue1, 1.0, 0.6);
                this.materials[this.activeClassId].uniforms.uColor2.value.setHSL(hue2, 1.0, 0.6);
            }
        }
        
        // Handle Ghosted Alpha Crossfade
        if (this.crossfadeData && this.crossfadeData.active) {
            let elapsed = time - this.crossfadeData.startTime;
            let progress = Math.min(1.0, elapsed / this.crossfadeData.duration);
            
            if (this.materials[this.crossfadeData.nextId]) {
                this.materials[this.crossfadeData.nextId].uniforms.uAlpha.value = progress;
            }
            if (this.materials[this.crossfadeData.prevId]) {
                this.materials[this.crossfadeData.prevId].uniforms.uAlpha.value = 1.0 - progress;
            }
            
            if (progress >= 1.0) {
                this.crossfadeData.active = false;
                this.activeClassId = this.crossfadeData.nextId;
            }
        }
    }

    dispose() {
        // Clean up window listener to prevent detached closure memory leaks
        if (this._boundCymaticsToggleMouseSync) {
            window.removeEventListener('cymaticsToggleMouseSync', this._boundCymaticsToggleMouseSync);
        }
        
        // Dispose safe dummy texture
        if (this.dummyTexture) {
            this.dummyTexture.dispose();
            this.dummyTexture = null;
        }

        this.meshes.forEach(mesh => {
            if (mesh.geometry) mesh.geometry.dispose();
            // We do NOT dispose mesh.material here because they are shared from this.materials
            this.group.remove(mesh);
        });
        
        // Proper Material Memory Leak Remediation: Dispose all cached ShaderMaterials
        if (this.materials) {
            for (const key in this.materials) {
                if (this.materials[key]) {
                    this.materials[key].dispose();
                }
            }
            this.materials = {};
        }
        
        // Dispose all cached texture objects to free GPU resources
        if (this.textureCache) {
            for (const key in this.textureCache) {
                if (this.textureCache[key]) {
                    this.textureCache[key].dispose();
                }
            }
            this.textureCache = {};
        }

        this.meshes = [];
        this.materials = {};
    }

    setConstellationLinesToggle(isOn) {
        if (this.materials[24]) {
            this.materials[24].uniforms.uShowLines.value = isOn ? 1.0 : 0.0;
        }
    }

    setRainbow(isRainbow) {
        this.rainbowMode = isRainbow;
        if (!isRainbow) {
            // Restore original colors for current pattern
            this.setPattern(this.activeClassId, this.activeVariationId, false);
        }
    }
}
