var Te=Object.defineProperty;var Ie=(u,e,t)=>e in u?Te(u,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[e]=t;var le=(u,e,t)=>Ie(u,typeof e!="symbol"?e+"":e,t);import{h as w,T as ce,e as U}from"./controls_v3-BYEsZ5hu.js";import{P as Y,S as E,A as G,C as A,M as P,G as I,a as Ae,b as Pe,W as Le,I as J,c as _,B as k,d as O,e as W,E as te,f as ie,L as Z,g as Q,O as Fe,h as he,i as ae,j as ee,F as H,k as oe,D as X,l as De,T as fe,m as qe,n as ue,o as de,p as $,R as Re,q as _e,V as me,r as Ve,s as Ee,t as Be,u as Ue,N as pe,v as Oe,w as ke,x as ve,y as ge}from"./three-pSY9FxVT.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";const se={1:[[2282478,8490232],[3462041,366185],[16494871,14753096],[16020150,9133302],[6334975,11032055],[16436245,15381256],[4906624,959977],[9741240,4674921],[16281969,10033947],[12616956,4988309],[3718648,223649],[16486972,12730636],[10741301,5078031],[15235577,8788367]],2:[[1357990,1013358],[6514417,4405450],[16007006,12456508],[11032055,8266446],[8702998,5078031],[959977,223649],[16096779,11817737],[1096065,292951],[15485081,12458077],[9133302,7153881],[15381256,10576391],[440020,561586]],3:[[3900150,1981066],[1096065,413243],[9133302,4988309],[16347926,8138002],[440020,1461859],[14239471,7346805],[15381256,7421714],[1357990,1265226],[16007006,8917815],[6514417,3223169]],4:[[16777215,0],[2282478,1973067],[16020150,4850766],[16569165,4528643],[7268279,142370],[9684477,1516884],[16557477,4524554],[12891645,3018853]],5:[[16766720,12092939],[16738740,13047173],[65535,35723],[8190976,2263842],[16753920,16729344],[12211667,4915330],[64154,3050327],[16716947,9109504],[2003199,139],[16775885,9142272]],6:[[65280,13056],[65535,51],[16711935,3342387],[13434624,3355392],[65484,13107],[16724838,3342336],[3394815,4403],[13369599,1114163],[6750003,1127168],[16763904,3346688]],7:[[16777215,16766720],[16729344,9109504],[65535,255],[16716947,4915330],[8388352,25600],[16711935,9055202],[2003199,1644912],[16737095,8388608],[64154,32896],[16775885,16747520]],8:[[16737095,4620980],[16766720,9055202],[64154,16716947],[16729344,3050327],[65535,13458524],[16711935,8087790],[3329330,16747520],[52945,9109504],[16758465,205],[11403055,4915330]],9:[[9109504,0],[3100495,16747520],[1644912,16777215],[4915330,3329330],[5597999,16711935],[8388608,65535],[128,16766720],[3050327,16716947],[4734347,16729344],[9127187,64154]],10:[[65280,16711935],[65535,16729344],[16766720,255],[16716947,3329330],[8388352,9055202],[16747520,52945],[64154,16711680],[2003199,16758465],[16711935,65280],[16776960,9109504]]},We=`
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    // Bypass camera matrices to draw a perfect full-screen quad behind other elements
    gl_Position = vec4(position.xy, 0.99, 1.0);
}
`,He=u=>u===1?`
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
        `:u===2?`
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
        `:u===3?`
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
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix( mix( hash( i + vec2(0.0,0.0) ), hash( i + vec2(1.0,0.0) ), u.x),
                        mix( hash( i + vec2(0.0,1.0) ), hash( i + vec2(1.0,1.0) ), u.x), u.y);
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
        `:u===4?`
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
        `:u===5?`
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
            
            for(float i=0.0; i<12.0; i++) {
                if (i >= nodes) break;
                float angle = i * 6.28318 / nodes + t * 0.5;
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
        `:u===6?`
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
        `:u===8?`
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
        `:u===9?`
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
        `:u===10?`
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
        `:u===11?`
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
        `:u===12?`
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
        `:u===13?`
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
        `:u===14?`
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
        `:u===15?`
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
        `:u===16?`
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
        `:u===17?`
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
        `:u===18?`
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
        `:`
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
        `;class Ne{constructor(e){this.group=e,this.meshes=[],this.activeClassId=1,this.activeVariationId=0,this.materials={};const t=new Y(2,2);for(let i=1;i<=18;i++){this.materials[i]=new E({vertexShader:We,fragmentShader:He(i),uniforms:{uTime:{value:0},uAspect:{value:1},uColor1:{value:new A(6334975)},uColor2:{value:new A(11032055)},uIntensity:{value:1},uVariation:{value:0}},transparent:!0,depthWrite:!1,blending:G});const a=new P(t,this.materials[i]);a.visible=!1,a.position.z=-1,this.meshes.push(a),this.group.add(a)}}setPattern(e,t){if(this.activeClassId=e,this.activeVariationId=t,this.meshes.forEach((i,a)=>{i.visible=a+1===e}),this.materials[e]&&(this.materials[e].uniforms.uVariation.value=t,se[e]&&se[e][t])){const i=se[e][t];this.materials[e].uniforms.uColor1.value.setHex(i[0]),this.materials[e].uniforms.uColor2.value.setHex(i[1]);try{window.dispatchEvent(new CustomEvent("cymaticColorSync",{detail:{classId:e,color1:"#"+i[0].toString(16).padStart(6,"0"),color2:"#"+i[1].toString(16).padStart(6,"0")}}))}catch{}}}setColor(e,t,i){if(this.materials[e]){const a=t===1?"uColor1":"uColor2";this.materials[e].uniforms[a].value.set(i)}}setParam(e,t,i){this.materials[e]&&t==="intensity"&&(this.materials[e].uniforms.uIntensity.value=i)}update(e){this.materials[this.activeClassId]&&(this.materials[this.activeClassId].uniforms.uTime.value=e,this.materials[this.activeClassId].uniforms.uAspect.value=window.innerWidth/window.innerHeight)}dispose(){this.meshes.forEach(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose(),this.group.remove(e)})}}let p=null;class ye{constructor(e,t={}){this.canvas=e,this.activeModes=t.activeModes||new Set,this.mode=t.mode||"none",this.mindWaveMode=t.mindWaveMode!==void 0?t.mindWaveMode:!0,this.galaxySunStyle=t.galaxySunStyle||"sun",this.currentCymaticData={name:"Fundamental Zenith",n:1,m:1,energy:.2},this.cymaticsHistory=[],this.cymaticsHistoryIndex=-1,this._cymaticDriftOffset=Math.random()*1e3,this.cyberConfig={logicMode:t.cyberLogicMode||"matrix",customText:t.cyberCustomText||"WELCOME",angle:t.cyberAngle||0,speed:t.cyberSpeedMultiplier||1,length:1,color:"#00FF41",rainbow:!0},this.matrixConfig={logicMode:t.matrixLogicMode||"interstellar",customText:t.matrixCustomText||"MINDWAVE",angle:0,speed:1,length:1,color:"#00FF41",rainbow:!1},this.initialized=!1,this._rainbowEnabled=t.rainbowEnabled||!1,this.isVisualizer3D=!0,this.overlayCanvas=document.getElementById("cyberCanvas"),this.overlayCtx=this.overlayCanvas?this.overlayCanvas.getContext("2d",{alpha:!0}):null,this.overlayCanvas&&(this.resizeOverlayCanvas(),window.addEventListener("resize",()=>this.resizeOverlayCanvas())),this.matrixCyberStreams=[],this.currentCyberAngle=t.cyberAngle!==void 0?t.cyberAngle:0,this.cyberColorCustomized=!1;try{const a=localStorage.getItem("cyberThemeHistory");this.themeHistory=a?JSON.parse(a):[],this.lastCyberFamily=localStorage.getItem("cyberLastFamily")||""}catch{this.themeHistory=[],this.lastCyberFamily=""}this.currentLogoOpacity=.8,this.targetLogoOpacity=.8,p=this,this.themeType=document.body.dataset.themeType||"dark";const i=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);this.batterySaver=t.batterySaver!==void 0?t.batterySaver:i,this.isLowPower=this.batterySaver||localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode"),this.lastFrameRenderTime=0,this.targetFPS=this.isLowPower?30:60,this.vibrationEnabled=typeof w<"u"&&w.visualVibration!==void 0?w.visualVibration:t.visualVibration!==void 0?t.visualVibration:!1,this._fpsRingBuffer=new Float64Array(60),this._fpsRingIndex=0,this._fpsRingCount=0,this.lastLodDegradation=0,this.currentLodLevel="high",this._tempColor=new A,this._logoRenderCanvas=null,this.sphereGroup=new I,this.particleGroup=new I,this.lightspeedGroup=new I,this.lavaGroup=new I,this.fireplaceGroup=new I,this.rainforestGroup=new I,this.zenGardenGroup=new I,this.oceanGroup=new I,this.wavesGroup=new I,this.cyberGroup=new I,this.boxGroup=new I,this.dragonGroup=new I,this.galaxyGroup=new I,this.mandalaGroup=new I,this.cymaticsGroup=new I,this.snowflakeGroup=new I,this._snowData=null;try{this.scene=new Ae,this.cymaticsCore=new Ne(this.cymaticsGroup),[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup].forEach(o=>this.scene.add(o)),this.camera=new Pe(75,e.width/e.height,.1,1e3),this.renderer=new Le({canvas:e,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(0,0),this.renderer.setSize(e.clientWidth,e.clientHeight);const s=this.isLowPower?1:2;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,s)),this.textures={},this.customColors={},this.customColor=null,this._isRendering=!1,this._freqDataArray=null,this.initEnvironment(),this.camera.position.z=5,this.handleLayoutChange=this.handleLayoutChange.bind(this),window.addEventListener("resize",()=>{this.resize(),this.handleLayoutChange()}),window.addEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode=()=>{this.currentLodLevel!=="low"&&(this.degradeLOD(),this.degradeLOD())},window.addEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange=()=>{document.hidden||(this.lastTime=performance.now()*.001,this.active!==!1&&this.initialized&&this.render(w.analyserLeft,w.analyserRight))},document.addEventListener("visibilitychange",this._boundVisibilityChange),this._boundContextLost=o=>{o.preventDefault(),this.active=!1,w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null)},e.addEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored=()=>{try{this.initialized=!1,this._freqDataArray=null,this.initEnvironment(),this.updateVisibility(),this.initialized=!0,this.active=!0,this.lastTime=performance.now()*.001,w.animationId&&cancelAnimationFrame(w.animationId),this._isRendering=!1,this.render(w.analyserLeft,w.analyserRight)}catch{}},e.addEventListener("webglcontextrestored",this._boundContextRestored),this._boundCymaticPointer=o=>{const r=o.touches?o.touches[0].clientX:o.clientX,n=o.touches?o.touches[0].clientY:o.clientY;this.mouseX=r/window.innerWidth*2-1,this.mouseY=-(n/window.innerHeight)*2+1},window.addEventListener("mousemove",this._boundCymaticPointer),window.addEventListener("touchmove",this._boundCymaticPointer,{passive:!0}),this.resize(),setTimeout(this.handleLayoutChange,100),this._boundThemeChange=o=>{if(o.detail&&o.detail.type){const r=o.detail.type;this.themeType!==r&&(this.themeType=r,this.updateLogoTexture())}},window.addEventListener("themeChanged",this._boundThemeChange),this.speedMultiplier=1,this.brightnessMultiplier=1,this.lastTime=performance.now()*.001,this.simTime=0,this.targetFPS=60,this.lastFrameRenderTime=0,this.active=!0,this.updateVisibility(),this.initialized=!0,this.initOverlayLogo(),window.viz3D=this}catch{this.initialized=!1}}resize(){if(!this.renderer||!this.canvas||!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.handleLayoutChange()}handleLayoutChange(){!this.renderer||!this.camera||this.camera.clearViewOffset()}resizeOverlayCanvas(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight)}generateCyberStyle(){const e=this.overlayCanvas,t=this.overlayCtx;if(!e||!t)return;this.matrixCyberStreams=[];const i=Math.max(11,Math.min(21,Math.floor(e.width/50)));this.isLowPower=localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode");let a=Math.ceil(e.width/i);this.isLowPower||(a*=1.5);let s=window.getCurrentTheme?window.getCurrentTheme():{color:"#2dd4bf"};this.resizeOverlayCanvas(),this.cyberColorCustomized=!1;const o=[{name:"System Yellow",color:"#FFFF00",family:"yellow"},{name:"Neon Pink",color:"#FF1493",family:"pink"},{name:"Chrome Static",color:"#C0C0C0",family:"mono"},{name:"Royal Data",color:"#4169E1",family:"blue"},{name:"White Noise",color:"#FFFFFF",family:"mono"},{name:"Cyan Future",color:"#00FFFF",family:"blue"},{name:"Lime Access",color:"#32CD32",family:"green"},{name:"Purple Haze",color:"#800080",family:"purple"},{name:"Emerald Link",color:"#50C878",family:"green"},{name:"Ice Blue",color:"#A5F2F3",family:"blue"},{name:"sentAIent Blue",color:"#60A9FF",family:"blue"},{name:"Rainbow Surge",color:"rainbow",family:"rainbow"}],r=this.lastCyberFamily||"";let n=o.filter(c=>!this.themeHistory.includes(c.name));const d=n.filter(c=>c.family!==r);d.length>0&&(n=d);let h=n;if(h.length===0){const c=this.themeHistory[this.themeHistory.length-1];h=o.filter(y=>y.name!==c)}const l=h[Math.floor(Math.random()*h.length)];this.themeHistory.push(l.name),this.themeHistory.length>5&&this.themeHistory.shift(),this.lastCyberFamily=l.family;try{localStorage.setItem("cyberThemeHistory",JSON.stringify(this.themeHistory)),localStorage.setItem("cyberLastFamily",this.lastCyberFamily)}catch{}this.cyberSpeedMultiplier===void 0&&(this.cyberSpeedMultiplier=.2),this.cyberLengthMultiplier===void 0&&(this.cyberLengthMultiplier=.7);const v=document.getElementById("cyberRainbowToggle");if(v&&this.cyberRainbowMode===void 0&&(this.cyberRainbowMode=!0,this.cyberConfig.rainbow=!0,v.checked=!0),!this.cyberRainbowMode&&s.color!=="rainbow"){this.cyberColor=s.color;const c=document.getElementById("cyberColorPicker");c&&(c.value=this.cyberColor)}for(let c=0;c<a;c++){const y=Math.random(),m=Math.floor(8+y*11),g=(2+y*8+Math.random()*2)*this.cyberSpeedMultiplier;this.matrixCyberStreams.push({x:c*i,y:Math.random()*this.overlayCanvas.height*1.5-this.overlayCanvas.height*.5,baseSpeed:g,opacity:.2+y*.8,size:m,chars:[],color:s.color!=="rainbow"?s.color:"#FFFFFF"})}this.updateCyberStrings(),this.matrixCyberStreams.sort((c,y)=>c.size-y.size)}renderCyberCyber(){const e=this.activeModes.has("cyber");if(!this.overlayCtx||!this.matrixCyberStreams||!e)return;const t=this.overlayCtx,i=this.overlayCanvas;t.clearRect(0,0,i.width,i.height);const a=this.activeModes.size>1;t.fillStyle=a?"rgba(0, 0, 0, 0.4)":"rgba(0, 0, 0, 0.85)",t.fillRect(0,0,i.width,i.height),t.save(),t.textAlign="center";const s=this.cyberConfig,o=s.speed||1,r=s.length||1;s.angle!==0&&(t.translate(i.width/2,i.height/2),t.rotate(s.angle*Math.PI/180),t.translate(-i.width/2,-i.height/2));const n=20,d=Date.now()*.1;t.textBaseline="middle";let h=-1;this.matrixCyberStreams.forEach((l,v)=>{l.y+=l.baseSpeed*o;let c=Math.max(3,Math.floor(n*r));(this.isLowPower||this.currentLodLevel==="low")&&(c=Math.floor(c*.4)),l.y-c*l.size>i.height*1.5&&(l.y=0);const y="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";l.size!==h&&(t.font=`${l.size}px monospace`,h=l.size);const m=this.isLowPower&&this.currentLodLevel==="low"?2:1;for(let g=0;g<c&&g<l.chars.length;g+=m){!l.isTextMode&&Math.random()<.02&&(l.chars[g]=y.charAt(Math.floor(Math.random()*y.length)));const L=l.chars[g],F=l.y-g*l.size;if(F<-l.size*2||F>i.height*1.5)continue;const S=1-g/c,D=Math.pow(S,.4)*(l.opacity*1.2);if(t.globalAlpha=Math.min(1,D),this.cyberRainbowMode){const T=(d+v*15+g*5)%360;t.fillStyle=`hsl(${T}, 100%, 60%)`}else t.fillStyle=l.color||this.cyberColor;t.fillText(L,l.x,F)}}),t.shadowBlur=0,t.globalAlpha=1,t.restore()}initSphere(){var o;const e=new J(2,2),t=new _({color:6334975,wireframe:!0,transparent:!0,opacity:.5});this.sphere=new P(e,t);const i=new J(1.8,1),a=new _({color:6334975,transparent:!0,opacity:.1,blending:G});this.core=new P(i,a),this.sphereGroup.add(this.sphere),this.sphereGroup.add(this.core),this.sphereGroup.visible=!1;const s=((o=this.customColors)==null?void 0:o.sphere)||this.customColor;s&&(this.sphere.material.color.copy(s),this.core.material.color.copy(s))}initLightspeed(){const t=new k,i=new Float32Array(2e3*3);for(let a=0;a<2e3*3;a++)i[a]=(Math.random()-.5)*80;t.setAttribute("position",new O(i,3)),this.lightspeedMaterial=new E({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new A(3003583)},uTexture:{value:this.createCircleTexture()}},vertexShader:`
                uniform float uTime, uSpeed;
                void main() {
                    vec3 pos = position;
                    pos.z = mod(pos.z + uTime * uSpeed * 20.0 + 40.0, 80.0) - 40.0;
                    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = 15.0 / -mv.z;
                }
            `,fragmentShader:`
                uniform vec3 uColor;
                uniform sampler2D uTexture;
                void main() {
                    vec4 tex = texture2D(uTexture, gl_PointCoord);
                    if (tex.a < 0.1) discard;
                    gl_FragColor = vec4(uColor, tex.a * 0.8);
                }
            `,transparent:!0,blending:G,depthWrite:!1}),this.lightspeed=new W(t,this.lightspeedMaterial),this.lightspeedGroup.add(this.lightspeed)}initParticles(){const e=this.batterySaver?400:1e3,t=new k,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let s=0;s<e;s++){const o=s*3;i[o]=(Math.random()-.5)*60,i[o+1]=(Math.random()-.5)*60,i[o+2]=(Math.random()-.5)*80;const r=Math.random();r<.3?(a[o]=.4,a[o+1]=.7,a[o+2]=1):r<.6?(a[o]=.3,a[o+1]=.9,a[o+2]=.95):r<.85?(a[o]=.6,a[o+1]=.4,a[o+2]=1):(a[o]=.9,a[o+1]=.9,a[o+2]=1)}t.setAttribute("position",new O(i,3)),t.setAttribute("color",new O(a,3)),this.particleMaterial=new E({uniforms:{uTime:{value:0},uSpeed:{value:1},uSize:{value:.4},uTexture:{value:this.createCircleTexture()}},vertexShader:`
                varying vec3 vColor;
                uniform float uTime, uSpeed;
                attribute vec3 color;
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    // Move in Z direction and wrap
                    pos.z = mod(pos.z + uTime * uSpeed * 20.0 + 40.0, 80.0) - 40.0;
                    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = 40.0 / -mv.z;
                }
            `,fragmentShader:`
                varying vec3 vColor;
                uniform sampler2D uTexture;
                void main() {
                    vec4 tex = texture2D(uTexture, gl_PointCoord);
                    if (tex.a < 0.1) discard;
                    gl_FragColor = vec4(vColor, tex.a);
                }
            `,transparent:!0,blending:G,depthWrite:!1}),this.particles=new W(t,this.particleMaterial),this.particleGroup.add(this.particles),this.particleGroup.visible=!1}initBox(){var h;this.boxOuter=new I;const e=new te(new ie(3,3,3)),t=new Z({color:16777215,transparent:!0,opacity:.9,blending:G}),i=new Z({color:3900150,transparent:!0,opacity:.5,blending:G});this.boxOuter.add(new Q(e,t));for(let l=1;l<=3;l++){const v=new Q(e,i);v.scale.setScalar(1+l*.012),this.boxOuter.add(v)}const a=new te(new ie(2,2,2)),s=new Z({color:14742270,transparent:!0,opacity:.8,blending:G}),o=new Z({color:6333946,transparent:!0,opacity:.4,blending:G});this.boxInner=new I,this.boxInner.add(new Q(a,s));for(let l=1;l<=2;l++){const v=new Q(a,o);v.scale.setScalar(1+l*.015),this.boxInner.add(v)}const r=new te(new ie(3.05,3.05,3.05)),n=new Z({color:9684477,transparent:!0,opacity:.8,blending:G});this.boxEdges=new Q(r,n),this.boxGroup.add(this.boxOuter),this.boxGroup.add(this.boxInner),this.boxGroup.add(this.boxEdges),this.boxGroup.visible=!1;const d=((h=this.customColors)==null?void 0:h.box)||this.customColor;d&&(this.boxOuter.children.forEach(l=>l.material.color.copy(d)),this.boxInner.children.forEach(l=>l.material.color.copy(d)),this.boxEdges&&this.boxEdges.material&&this.boxEdges.material.color.copy(d))}initDragon(){var v;this.dragonDummy=new Fe,this.dragonLength=80;const e=new J(.8,1),t=new _({color:15680580,wireframe:!0,transparent:!0,opacity:.8,blending:G}),i=new J(.5,1),a=new _({color:16096779,wireframe:!1,transparent:!0,opacity:.6,blending:G});this.dragonBodyInstanced=new he(e,t,this.dragonLength),this.dragonGlowInstanced=new he(i,a,this.dragonLength);const s=new ae(1.5,3.5,5);s.rotateX(Math.PI/2);const o=new _({color:16638023,wireframe:!0,transparent:!0,opacity:.9,blending:G});this.dragonHead=new P(s,o),this.dragonPearlGroup=new I;const r=new ee(1,16,16),n=new _({color:3718648,wireframe:!1,transparent:!0,opacity:.9,blending:G}),d=new ee(1.3,16,16),h=new _({color:8246268,wireframe:!0,transparent:!0,opacity:.5,blending:G});this.dragonPearl=new P(r,n),this.dragonPearlHalo=new P(d,h),this.dragonPearlGroup.add(this.dragonPearl),this.dragonPearlGroup.add(this.dragonPearlHalo),this.dragonGroup.add(this.dragonBodyInstanced),this.dragonGroup.add(this.dragonGlowInstanced),this.dragonGroup.add(this.dragonHead),this.dragonGroup.add(this.dragonPearlGroup),this.dragonGroup.visible=!1;const l=((v=this.customColors)==null?void 0:v.dragon)||this.customColor;l&&this.updateDragonColor(l)}updateGalaxyColor(e){if(this.galaxySunMesh&&this.galaxySunMesh.traverse(t=>{t.isMesh&&t.material&&t.material.color.copy(e)}),this.galaxyStars&&this.galaxyStars.geometry){const t={};e.getHSL(t);const i=(t.h+.5)%1,a=this.galaxyStars.geometry.getAttribute("color");if(a){const s=a.count,o=this._tempColor;for(let r=0;r<s;r++){const n=r/s,d=n<.2?.8:n<.5?.6:.4+Math.random()*.15,h=.6+Math.random()*.3;o.setHSL(i,h,d),a.setXYZ(r,o.r,o.g,o.b)}a.needsUpdate=!0}}}updateDragonColor(e){if(!this.dragonBodyInstanced)return;this.dragonBodyInstanced.material.color.copy(e),this.dragonHead.material.color.copy(e);const t={};e.getHSL(t);const i=(t.h+.5)%1,a=new A().setHSL(i,t.s,t.l);this.dragonGlowInstanced.material.color.copy(a)}initGalaxy(){const e=this.batterySaver?500:1500,t=new k,i=[],a=[],s=[];for(let n=0;n<e;n++){const d=n/e*Math.PI*10,h=2.5+n/e*20+Math.random()*2,l=n%4*(Math.PI*2/4),v=Math.max(.5,n/e*4),c=Math.cos(d+l)*h+(Math.random()-.5)*v,y=(Math.random()-.5)*1.5,m=Math.sin(d+l)*h+(Math.random()-.5)*v;i.push(c,y,m);const g=n/e;g<.2?a.push(1,.95,.7):g<.5?a.push(.7+Math.random()*.3,.8,1):a.push(.4+Math.random()*.2,.3+Math.random()*.3,.8+Math.random()*.2),s.push(Math.random()<.05?.4+Math.random()*.3:.08+Math.random()*.15)}t.setAttribute("position",new H(i,3)),t.setAttribute("color",new H(a,3)),t.setAttribute("size",new H(s,1));const o=this.createStarTexture(),r=new oe({size:.25,vertexColors:!0,map:o,transparent:!0,opacity:.9,blending:G,depthWrite:!1,sizeAttenuation:!0});this.galaxyStars=new W(t,r),this.galaxyGroup.add(this.galaxyStars),this.galaxySunStyle=this.galaxySunStyle||"sun",this.createGalaxySun(this.galaxySunStyle),this.galaxyGroup.visible=!1}createGalaxySun(e){this.galaxySunMesh&&(this.galaxyGroup.remove(this.galaxySunMesh),this.galaxySunMesh=null),this.galaxySunMesh=new I;const t=new _({color:4892415,transparent:!0,opacity:.85,blending:G,depthWrite:!1,side:X}),i=new I;if(e==="sun2"){const a=t.clone();a.side=De;const s=new fe(1.5,.25,16,64);i.add(new P(s,a));const o=8,r=new ae(.4,2.7,4);r.translate(0,2.7/2,0);const n=new ae(.2,1.7,4);n.translate(0,1.7/2,0);for(let d=0;d<o;d++){const h=d/o*Math.PI*2,l=new P(r,a);l.rotation.z=-h,l.position.set(Math.sin(h)*1.5,Math.cos(h)*1.5,0),i.add(l);const v=h+Math.PI/o,c=new P(n,a);c.rotation.z=-v,c.position.set(Math.sin(v)*1.5,Math.cos(v)*1.5,0),i.add(c)}}else if(e==="sun3"){const a={uTime:{value:0},uColor:{value:t.color},uBassIntt:{value:0}};this.galaxySunUniforms=a;const s=`
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vViewPosition = -mvPosition.xyz;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,o=`
                uniform float uTime;
                uniform vec3 uColor;
                uniform float uBassIntt;
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                
                vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
                vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
                float snoise(vec3 v){ 
                  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                  vec3 i  = floor(v + dot(v, C.yyy) );
                  vec3 x0 = v - i + dot(i, C.xxx) ;
                  vec3 g = step(x0.yzx, x0.xyz);
                  vec3 l = 1.0 - g;
                  vec3 i1 = min( g.xyz, l.zxy );
                  vec3 i2 = max( g.xyz, l.zxy );
                  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
                  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
                  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
                  i = mod(i, 289.0 ); 
                  vec4 p = permute( permute( permute( 
                             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                  float n_ = 1.0/7.0;
                  vec3  ns = n_ * D.wyz - D.xzx;
                  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
                  vec4 x_ = floor(j * ns.z);
                  vec4 y_ = floor(j - 7.0 * x_ );
                  vec4 x = x_ *ns.x + ns.yyyy;
                  vec4 y = y_ *ns.x + ns.yyyy;
                  vec4 h = 1.0 - abs(x) - abs(y);
                  vec4 b0 = vec4( x.xy, y.xy );
                  vec4 b1 = vec4( x.zw, y.zw );
                  vec4 s0 = floor(b0)*2.0 + 1.0;
                  vec4 s1 = floor(b1)*2.0 + 1.0;
                  vec4 sh = -step(h, vec4(0.0));
                  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                  vec3 p0 = vec3(a0.xy,h.x);
                  vec3 p1 = vec3(a0.zw,h.y);
                  vec3 p2 = vec3(a1.xy,h.z);
                  vec3 p3 = vec3(a1.zw,h.w);
                  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                  p0 *= norm.x;
                  p1 *= norm.y;
                  p2 *= norm.z;
                  p3 *= norm.w;
                  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                  m = m * m;
                  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
                }

                void main() {
                    vec3 normal = normalize(vNormal);
                    vec3 viewDir = normalize(vViewPosition);

                    // Multi-octave 3D sphere noise
                    vec3 spherePos = vec3(vUv * 5.0, uTime * 0.3);
                    float n = snoise(spherePos);
                    n += 0.5 * snoise(spherePos * 2.0 - vec3(0.0, 0.0, uTime * 0.5));
                    n += 0.25 * snoise(spherePos * 4.0 + vec3(uBassIntt));
                    
                    n = smoothstep(0.0, 1.0, (n * 0.5 + 0.5) + uBassIntt * 0.6);

                    // Edge Rim
                    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
                    rim = smoothstep(0.5 - uBassIntt * 0.2, 1.0, rim);

                    float corona = pow(rim, 2.5);

                    vec3 coreColor = mix(vec3(1.0, 1.0, 1.0), uColor, clamp(n, 0.0, 1.0));
                    vec3 finalColor = coreColor + uColor * corona * 2.5;

                    float alpha = min(max(n * 1.5, rim * 1.2), 1.0);
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,r=new E({vertexShader:s,fragmentShader:o,uniforms:a,transparent:!0,blending:G,depthWrite:!1,side:X}),n=new ee(2,64,64),d=new P(n,r);i.add(d);const h=new _({color:t.color,transparent:!0,opacity:.15,blending:G,depthWrite:!1,side:qe}),l=new ee(3,32,32);i.add(new P(l,h))}else{const a=new fe(1.5,.12,8,64);i.add(new P(a,t));const s=8;for(let o=0;o<s;o++){const r=o/s*Math.PI*2,n=new ue;n.moveTo(-.4,0),n.lineTo(.4,0),n.lineTo(0,2.7),n.lineTo(-.4,0);const d=new de(n),h=new P(d,t);h.rotation.z=-r,h.position.set(Math.sin(r)*1.5,Math.cos(r)*1.5,0),i.add(h);const l=r+Math.PI/s,v=new ue;v.moveTo(-.2,0),v.lineTo(.2,0),v.lineTo(0,1.7),v.lineTo(-.2,0);const c=new de(v),y=new P(c,t);y.rotation.z=-l,y.position.set(Math.sin(l)*1.5,Math.cos(l)*1.5,0),i.add(y)}}this.galaxySunMesh.add(i),this.galaxySunMesh.position.set(0,0,.1),this.galaxyGroup.add(this.galaxySunMesh)}setGalaxySunStyle(e){e!=="sun"&&e!=="sun2"&&e!=="sun3"||(this.galaxySunStyle=e,this.galaxyGroup&&this.galaxyGroup.children.length>0&&this.createGalaxySun(e))}setGalaxySunRotation(e,t){e==="x"&&(this.sunRotationSpeedX=parseFloat(t)),e==="y"&&(this.sunRotationSpeedY=parseFloat(t)),e==="z"&&(this.sunRotationSpeedZ=parseFloat(t))}createStarTexture(){if(this.textures.star)return this.textures.star;const e=64,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),a=e/2,s=e/2;i.clearRect(0,0,e,e);const o=i.createRadialGradient(a,s,0,a,s,e/2);return o.addColorStop(0,"rgba(255, 255, 255, 1.0)"),o.addColorStop(.1,"rgba(255, 255, 240, 0.8)"),o.addColorStop(.25,"rgba(255, 255, 200, 0.3)"),o.addColorStop(.5,"rgba(200, 200, 255, 0.1)"),o.addColorStop(1,"rgba(100, 100, 255, 0)"),i.fillStyle=o,i.fillRect(0,0,e,e),i.fillStyle="rgba(255, 255, 255, 0.6)",i.beginPath(),i.moveTo(0,s-1),i.lineTo(a,s-.5),i.lineTo(e,s-1),i.lineTo(e,s+1),i.lineTo(a,s+.5),i.lineTo(0,s+1),i.closePath(),i.fill(),i.beginPath(),i.moveTo(a-1,0),i.lineTo(a-.5,s),i.lineTo(a-1,e),i.lineTo(a+1,e),i.lineTo(a+.5,s),i.lineTo(a+1,0),i.closePath(),i.fill(),i.beginPath(),i.arc(a,s,2,0,Math.PI*2),i.fillStyle="rgba(255, 255, 255, 1.0)",i.fill(),this.textures.star=new $(t),this.textures.star}initMandala(){var s;this.mandalaRings=[];const e=[2450411,15357964,3900150,16347926,12573694];for(let o=0;o<5;o++){const r=1.2+o*.8,n=6+o*6,d=new Re(r-.05,r+.05,n),h=new _({color:e[o],side:X,transparent:!0,opacity:.4-o*.05,blending:G}),l=new P(d,h);l.userData={speed:(.01+o*.005)*(o%2===0?1:-1),segments:n},this.mandalaRings.push(l),this.mandalaGroup.add(l)}const t=new _e(.3,32),i=new _({color:16347926,transparent:!0,opacity:.6,blending:G});this.mandalaCenter=new P(t,i),this.mandalaGroup.add(this.mandalaCenter),this.mandalaGroup.visible=!1;const a=(s=this.customColors)==null?void 0:s.mandala;a&&(this.mandalaRings.forEach(o=>o.material.color.copy(a)),this.mandalaCenter.material.color.copy(a))}createSnowflakeTexture(){if(this.textures.snowflake)return this.textures.snowflake;const e=128,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),a=e/2,s=e/2;i.clearRect(0,0,e,e);const o=i.createRadialGradient(a,s,0,a,s,e*.5);o.addColorStop(0,"rgba(200,230,255,0.5)"),o.addColorStop(.4,"rgba(180,220,255,0.15)"),o.addColorStop(1,"rgba(150,200,255,0)"),i.fillStyle=o,i.fillRect(0,0,e,e),i.strokeStyle="rgba(220,240,255,1.0)",i.lineCap="round";for(let r=0;r<6;r++){const n=r/6*Math.PI*2;i.save(),i.translate(a,s),i.rotate(n),i.lineWidth=2.5,i.beginPath(),i.moveTo(0,0),i.lineTo(0,-52),i.stroke();const d=[{d:18,len:14,angle:Math.PI/4},{d:32,len:20,angle:Math.PI/4},{d:46,len:10,angle:Math.PI/5}];i.lineWidth=1.5,d.forEach(({d:h,len:l,angle:v})=>{[1,-1].forEach(c=>{i.beginPath(),i.moveTo(0,-h),i.lineTo(c*l*Math.cos(Math.PI/2-v),-h-l*Math.sin(Math.PI/2-v)),i.stroke()})}),i.restore()}i.beginPath();for(let r=0;r<6;r++){const n=r/6*Math.PI*2-Math.PI/6,d=a+Math.cos(n)*4,h=s+Math.sin(n)*4;r===0?i.moveTo(d,h):i.lineTo(d,h)}return i.closePath(),i.fillStyle="rgba(255, 255, 255, 0.8)",i.fill(),this.textures.snowflake=new $(t),this.textures.snowflake}initSnowflake(){for(;this.snowflakeGroup.children.length>0;){const c=this.snowflakeGroup.children[0];this.snowflakeGroup.remove(c),c.geometry&&c.geometry.dispose(),c.material&&c.material.dispose()}this._snowData=null;const e=700,t=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e),s=new Float32Array(e),o=new Float32Array(e),r=new Float32Array(e),n=new Float32Array(e);for(let c=0;c<e;c++){const y=c*3;t[y]=(Math.random()-.5)*80,t[y+1]=(Math.random()-.5)*60,t[y+2]=-40+Math.random()*35;const m=(t[y+2]+40)/35;i[c]=1.5+m*8,a[c]=.2+m*.6,s[c]=Math.random()*Math.PI*2,o[c]=.015+Math.random()*.04+m*.03,r[c]=.01+Math.random()*.02,n[c]=.4+Math.random()*.8}const d=new k;d.setAttribute("position",new O(t,3)),d.setAttribute("aSize",new O(i,1)),d.setAttribute("aOpacity",new O(a,1));const h=this.createSnowflakeTexture(),l=new E({uniforms:{uTexture:{value:h},uColor:{value:this.customColor?this.customColor.clone():new A(10875883)},uIntensity:{value:0},uSizeMultiplier:{value:1},uGlowAmount:{value:.5}},vertexShader:`
                attribute float aSize;
                attribute float aOpacity;
                uniform float uSizeMultiplier;
                varying float vOpacity;
                void main() {
                    vOpacity = aOpacity;
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = aSize * uSizeMultiplier * (300.0 / -mv.z);
                }
            `,fragmentShader:`
                uniform sampler2D uTexture;
                uniform vec3 uColor;
                uniform float uIntensity;
                uniform float uGlowAmount;
                varying float vOpacity;
                void main() {
                    vec4 tex = texture2D(uTexture, gl_PointCoord);
                    if (tex.a < 0.02) discard;
                    // Dynamically tinted base color
                    vec3 baseCol = mix(uColor, vec3(1.0), clamp(uIntensity, 0.0, 1.0));
                    float glowAlpha = tex.a * vOpacity * (0.5 + uGlowAmount * 1.2);
                    vec3 finalCol = baseCol * (1.0 + uGlowAmount * uIntensity * 1.5);
                    gl_FragColor = vec4(finalCol, clamp(glowAlpha, 0.0, 1.0));
                }
            `,transparent:!0,depthWrite:!1,blending:G}),v=new W(d,l);this.snowflakeGroup.add(v),this._snowData={count:e,positions:t,phases:s,speeds:o,drifts:r,driftFreqs:n,points:v,material:l,spinMeshes:[],spinSpeeds:[]}}setSnowSize(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uSizeMultiplier.value=Math.max(.2,Math.min(4,e)))}setSnowGlow(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uGlowAmount.value=Math.max(0,Math.min(1,e)))}initLava(){var o;this.lavaBlobs=[];const e=16;this.lavaUniforms={uBlobs:{value:[]},uColor:{value:new A(((o=w.visualColors)==null?void 0:o.lava)||16737792)},uSecondaryColor:{value:new A(16755200)},uTime:{value:0},uIntensity:{value:0},uResolution:{value:new me(window.innerWidth,window.innerHeight)}};for(let r=0;r<e;r++)this.lavaUniforms.uBlobs.value.push(new Ve(0,-100,0,0));const t=new E({uniforms:this.lavaUniforms,vertexShader:`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,fragmentShader:`
                varying vec2 vUv;
                uniform vec4 uBlobs[16];
                uniform vec3 uColor;
                uniform vec3 uSecondaryColor;
                uniform float uTime;
                uniform float uIntensity;

                void main() {
                    // Center UV coordinates (-1 to 1) and extend bounds
                    // The plane is large, so vUv spans the entire background.
                    vec2 uv = (vUv - 0.5) * 50.0; // scale up to coordinate space of physics (-25 to +25)

                    float sum = 0.0;
                    vec2 grad = vec2(0.0);

                    // Compute Metaball density and gradient (pseudo-normals)
                    for(int i = 0; i < 16; i++) {
                        vec2 pos = uBlobs[i].xy;
                        float radius = uBlobs[i].w * 1.5; // Scale up impact
                        if(radius < 0.1) continue;

                        vec2 d = uv - pos;
                        float distSq = dot(d, d) + 0.1; // avoid divide by zero
                        float density = (radius * radius) / distSq;
                        sum += density;
                        
                        // Accumulate gradient for fake 3D normal
                        grad -= d * (2.0 * density / distSq);
                    }

                    // Threshold and smoothing
                    float threshold = 1.0;
                    // Outer glow / smoothing band
                    float f = smoothstep(threshold - 0.4, threshold + 0.1, sum);
                    
                    if (f <= 0.0) {
                        gl_FragColor = vec4(0.0);
                        return;
                    }

                    // Fake 3D Normal from gradient
                    vec3 normal = normalize(vec3(grad * 1.5, 1.0));
                    
                    // Height-based temperature mapping
                    float yNorm = clamp((uv.y + 15.0) / 30.0, 0.0, 1.0);
                    vec3 baseCol = mix(uSecondaryColor, uColor, yNorm);

                    // Lighting
                    vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
                    vec3 viewDir = vec3(0.0, 0.0, 1.0);
                    vec3 halfDir = normalize(lightDir + viewDir);

                    float diff = max(dot(normal, lightDir), 0.0);
                    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
                    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);

                    // Color combination
                    vec3 col = baseCol * (0.3 + 0.7 * diff);
                    col += vec3(1.0) * spec * (0.5 + uIntensity);
                    col += baseCol * fresnel * 2.0;

                    gl_FragColor = vec4(col, f * 0.95);
                }
            `,transparent:!0,blending:G,depthWrite:!1,side:X}),i=new Y(100,100),a=new P(i,t);a.position.z=-5,[{count:5,minSize:1,maxSize:1.5},{count:7,minSize:1.5,maxSize:2.2},{count:4,minSize:2.2,maxSize:3.5}].forEach(r=>{for(let n=0;n<r.count;n++){const d=r.minSize+Math.random()*(r.maxSize-r.minSize),h=["heating","rising","cooling","falling"],l=h[Math.floor(Math.random()*h.length)],v=-18+Math.random()*4,c=18+Math.random()*4;let y=0,m=.5;l==="heating"?(y=v,m=Math.random()*.5):l==="rising"?(y=v+Math.random()*(c-v),m=.8+Math.random()*.2):l==="cooling"?(y=c,m=1-Math.random()*.3):l==="falling"&&(y=c-Math.random()*(c-v),m=.2+Math.random()*.3),this.lavaBlobs.push({position:new Ee((Math.random()-.5)*12,y,(Math.random()-.5)*6),material:{uniforms:{uTemp:{value:0},uIntensity:{value:0},uTime:{value:0}}},userData:{baseSize:d,state:l,temperature:m,floatMin:v,floatMax:c,heatRate:.15+Math.random()*.3,coolRate:.15+Math.random()*.3,riseSpeed:(.04+Math.random()*.05)/(d*.5),fallSpeed:(.05+Math.random()*.05)/(d*.5),driftPhase:Math.random()*Math.PI*2,driftSpeed:.01+Math.random()*.02}})}}),this.lavaGroup.add(a),this.lavaGroup.visible=!1}initFireplace(){const i=new Y(100,80);this.fireMaterial=this.createFireShader(),this.fireMesh=new P(i,this.fireMaterial),this.fireMesh.position.set(0,0,-15),this.fireMesh.renderOrder=10,this.fireplaceGroup.add(this.fireMesh),this.fireLight=new Be(16737792,5,200),this.fireLight.position.set(0,0,30),this.fireplaceGroup.add(this.fireLight);const a=650,s=new k,o=[];for(let r=0;r<a;r++)o.push((Math.random()-.5)*100,-20+Math.random()*40,-15+(Math.random()-.5)*20);s.setAttribute("position",new H(o,3)),this.emberMat=new oe({color:16763904,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.8,blending:G,depthWrite:!1}),this.embers=new W(s,this.emberMat),this.fireplaceGroup.add(this.embers),this.emberVelocities=new Float32Array(a);for(let r=0;r<a;r++)this.emberVelocities[r]=.02+Math.random()*.05;this.fireplaceGroup.position.set(0,0,0),this.fireplaceGroup.visible=!1}createFireShader(){return new E({uniforms:{uTime:{value:0},uColor:{value:new A(16729088)},uSpeed:{value:1},uIntensity:{value:1}},vertexShader:`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,fragmentShader:`
                uniform float uTime;
                uniform float uIntensity;
                uniform vec3 uColor;
                varying vec2 vUv;

                // Simplex Noise 2D (Standard GLSL noise)
                vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
                float snoise(vec2 v){
                    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                    vec2 i  = floor(v + dot(v, C.yy) );
                    vec2 x0 = v - i + dot(i, C.xx);
                    vec2 i1;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;
                    i = mod(i, 289.0);
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

                void main() {
                    vec2 uv = vUv;
                    
                    // ORGANIC FLOW NOISE - INCREASED DENSITY
                    float n1 = snoise(uv * 2.5 - vec2(0, uTime * 1.5));
                    float n2 = snoise(uv * 5.5 - vec2(0, uTime * 2.8));
                    
                    // Atmospheric Heat (Lower focus)
                    float shape = 1.2 - uv.y; 
                    shape = pow(shape, 1.4); 
                    
                    float fire = n1 * 0.7 + n2 * 0.5;
                    
                    // Denser thresholds
                    float alpha = smoothstep(-0.2, 0.6, fire + shape * 0.7);
                    float core = smoothstep(0.0, 0.8, fire + shape * 0.5);
                    
                    // Brighter, more intense colors
                    vec3 red = vec3(1.0, 0.1, 0.0);
                    vec3 yellow = vec3(1.0, 0.9, 0.0);
                    vec3 white = vec3(1.0, 1.0, 0.9);
                    
                    vec3 finalColor = mix(red, yellow, core);
                    finalColor = mix(finalColor, white, core * 0.4);
                    
                    // Edge fade removed - Fill edges edge-to-edge
                    gl_FragColor = vec4(finalColor * uIntensity, alpha * min(1.0, uIntensity));
                }
            `,transparent:!0,side:X,blending:G,depthWrite:!1})}initRainforest(){const e=this.batterySaver?400:1e3,t=new k,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let s=0;s<e;s++){const o=s*3;i[o]=(Math.random()-.5)*60,i[o+1]=(Math.random()-.5)*40,i[o+2]=(Math.random()-.5)*40,a[o]=Math.random(),a[o+1]=Math.random(),a[o+2]=.08+Math.random()*.12}t.setAttribute("position",new O(i,3)),t.setAttribute("aRandom",new O(a,3)),this.rainMaterial=new E({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new A(8965375)},uIntensity:{value:.6}},vertexShader:`
                attribute vec3 aRandom;
                uniform float uTime, uSpeed;
                varying float vAlpha;
                void main() {
                    vec3 pos = position;
                    float velocity = aRandom.z * uSpeed;
                    
                    // Vertical fall with wrap
                    pos.y = mod(pos.y - uTime * velocity * 100.0 + 20.0, 40.0) - 20.0;
                    
                    // Subtle drift
                    pos.x += sin(uTime * 0.5 + aRandom.x * 10.0) * 0.5;
                    
                    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = 2.0 * (300.0 / -mv.z);
                    vAlpha = 1.0;
                }
            `,fragmentShader:`
                uniform vec3 uColor;
                uniform float uIntensity;
                varying float vAlpha;
                void main() {
                    // Simple drop shape
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    float dist = length(coord);
                    if (dist > 0.5) discard;
                    gl_FragColor = vec4(uColor, uIntensity * (1.0 - dist * 2.0));
                }
            `,transparent:!0,depthWrite:!1,blending:G}),this.raindrops=new W(t,this.rainMaterial),this.rainforestGroup.add(this.raindrops),this.rainforestGroup.visible=!1}initZenGarden(){const e=this.batterySaver?200:500,t=new k,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let o=0;o<e;o++){const r=o*3;i[r]=(Math.random()-.5)*40,i[r+1]=(Math.random()-.5)*20,i[r+2]=(Math.random()-.5)*40,a[r]=Math.random(),a[r+1]=Math.random(),a[r+2]=Math.random()*Math.PI*2}t.setAttribute("position",new O(i,3)),t.setAttribute("aRandom",new O(a,3)),this.petalMaterial=new E({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new A(16758725)},uIntensity:{value:.8}},vertexShader:`
                attribute vec3 aRandom;
                uniform float uTime, uSpeed;
                varying float vAlpha;
                void main() {
                    vec3 pos = position;
                    float t = uTime * uSpeed;
                    
                    // Falling with drift
                    pos.y = mod(pos.y - t * 2.0 + 10.0, 20.0) - 10.0;
                    pos.x += sin(t + aRandom.z) * 2.0;
                    pos.z += cos(t * 0.8 + aRandom.x) * 2.0;
                    
                    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = 4.0 * (300.0 / -mv.z);
                    vAlpha = 1.0;
                }
            `,fragmentShader:`
                uniform vec3 uColor;
                uniform float uIntensity;
                void main() {
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    float dist = length(coord);
                    if (dist > 0.5) discard;
                    gl_FragColor = vec4(uColor, uIntensity * (1.0 - dist * 2.0));
                }
            `,transparent:!0,depthWrite:!1}),this.petals=new W(t,this.petalMaterial),this.zenGardenGroup.add(this.petals);const s=new Y(40,40,32,32);this.zenWaterMaterial=new _({color:2245734,transparent:!0,opacity:.3,side:X}),this.zenWater=new P(s,this.zenWaterMaterial),this.zenWater.rotation.x=-Math.PI/2,this.zenWater.position.y=-5,this.zenGardenGroup.add(this.zenWater),this.zenGardenGroup.visible=!1}initOcean(){var r;const e=new Y(300,100,128,64);this.oceanWave=new P(e,new E({uniforms:{uTime:{value:0},uColor:{value:this.customColor?this.customColor.clone():new A(43775)},uNormBass:{value:0},uBeatPulse:{value:0}},vertexShader:`
                varying float vDist;
                uniform float uTime, uNormBass, uBeatPulse;
                void main() {
                    vec3 pos = position;
                    float dist = length(pos.xy);
                    vDist = dist;
                    float amp = 1.0 + (uNormBass * 2.5) + (uBeatPulse * 0.8);
                    pos.z = sin(dist * 0.2 - uTime * 0.8) * amp + cos(pos.x * 0.15 + uTime * 0.6) * (amp * 0.5);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,fragmentShader:`
                varying float vDist;
                uniform vec3 uColor;
                uniform float uNormBass;
                void main() {
                    float edge = 1.0 - smoothstep(100.0, 150.0, vDist);
                    gl_FragColor = vec4(uColor, 0.4 * edge);
                }
            `,wireframe:!0,transparent:!0,side:X})),this.oceanWave.rotation.x=-Math.PI/3,this.oceanWave.position.y=-2,this.oceanGroup.add(this.oceanWave);const t=300,i=new k,a=[];for(let n=0;n<t;n++)a.push((Math.random()-.5)*50),a.push(-2.5+Math.random()*.5),a.push((Math.random()-.5)*40);i.setAttribute("position",new H(a,3));const s=new oe({color:16777215,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.5,blending:G,depthWrite:!1});this.oceanFoam=new W(i,s),this.oceanGroup.add(this.oceanFoam),this.oceanGroup.visible=!1;const o=((r=this.customColors)==null?void 0:r.ocean)||this.customColor;o&&(this.oceanWave&&this.oceanWave.material.color.copy(o),this.oceanFoam&&this.oceanFoam.material.color.copy(o))}createCyberTexture(e=this.matrixConfig){const i=document.createElement("canvas");i.width=1024,i.height=1024;const a=i.getContext("2d");a.fillStyle="rgba(0,0,0,0)",a.fillRect(0,0,1024,1024),a.shadowBlur=12,a.shadowColor="rgba(255, 255, 255, 0.4)",a.font='bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace',a.fillStyle="#ffffff",a.textAlign="center",a.textBaseline="middle";const s=8,o=8,r=1024/s,n=1024/o;let d="🪷MINDWAVE";const h=e.logicMode,l=e.customText;h==="custom"||h==="txt"?d="🪷"+(l&&l.length>0?l:"WELCOME TO MINDWAVE"):(h==="random"||h==="rnd"||h==="matrix"||h==="int"||h==="interstellar")&&(d="");const v=h==="matrix"||h==="int"||h==="interstellar"?[]:["LOGO",...d],c=v.length;for(let m=0;m<64;m++){const g=m%8,L=Math.floor(m/8);a.fillStyle="rgba(0,0,0,0)",a.fillRect(g*r,L*n,r,n),a.save(),a.translate(g*r+r/2,L*n+n/2);let F="",S=!1;if(m<c){const D=v[m];D==="LOGO"?S=!0:F=D}else{const T="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";F=T.charAt(Math.floor(Math.random()*T.length)),Math.random()>.5&&(a.save(),a.scale(-1,1),a.fillStyle="#ffffff",a.font="bold 80px monospace",a.fillText(F,0,0),a.restore(),F="")}if(F||S)if(a.fillStyle="#ffffff",a.font="bold 80px monospace",a.textAlign="center",a.textBaseline="middle",a.shadowBlur=16,a.shadowColor="rgba(255, 255, 255, 0.6)",S)if(this.logoImage){const M=document.createElement("canvas");M.width=100,M.height=100;const q=M.getContext("2d");q.imageSmoothingEnabled=!0,q.imageSmoothingQuality="high",q.drawImage(this.logoImage,0,0,100,100);const j=q.getImageData(0,0,100,100),R=j.data;for(let V=0;V<R.length;V+=4){const B=180+(R[V]+R[V+1]+R[V+2])/3/255*75;R[V]=B,R[V+1]=B,R[V+2]=B}q.putImageData(j,0,0),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(M,-50,-50,100,100)}else!this.logoLoading&&!this.logoFailed&&(this.logoLoading=!0,new Ue().load("./mindwave-logo-icon.png",T=>{if(this.logoImage=T,this.logoLoading=!1,this.cyberMaterial){const M=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=M}},void 0,T=>{this.logoFailed=!0,this.logoLoading=!1})),a.font="bold 80px monospace",a.fillStyle="#2dd4bf",a.fillText("🪷",0,0);else a.fillText(F,0,0);a.restore()}const y=new $(i);return y.magFilter=pe,y.minFilter=pe,y}createCyberShader(e,t=this.matrixConfig){return new E({uniforms:{uTexture:{value:e},uColor:{value:new A(t.color||65345)},uHeadColor:{value:new A(15794160)},uTime:{value:0},uSpeed:{value:t.speed||1},uTailLength:{value:t.length||1},uRainbow:{value:t.rainbow?1:0},uBrightness:{value:this.brightnessMultiplier||1}},vertexShader:`
                attribute float aCharIndex;
                attribute float aSpawnTime;
                attribute float aSpeed;
                uniform float uTime;
                uniform float uSpeed;
                uniform float uTailLength;
                varying float vBrightness;
                varying float vCharIndex;
                varying float vAlpha;
                varying vec3 vPos;
                
                void main() {
                    vCharIndex = aCharIndex;
                    vPos = position;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    // FIXED: uTime already includes multipliers, avoid squaring speed in shader
                    float columnHeadY = 80.0 - mod(uTime * 5.0 * aSpeed + aSpawnTime, 160.0);
                    // FIXED: The trail is ABOVE the head (higher Y value). So position.y > columnHeadY.
                    // To get a positive distance for the trail, we need position.y - columnHeadY.
                    float dist = position.y - columnHeadY;
                    float trailLen = 160.0 * uTailLength;
                    if (dist >= 0.0 && dist < trailLen) {
                         vAlpha = 1.0 - (dist / trailLen);
                         vBrightness = 1.0 - (dist / trailLen);
                    } else {
                         vAlpha = 0.0;
                         vBrightness = 0.0;
                    }
                    gl_Position = projectionMatrix * mvPosition;
                    gl_Position.z -= 0.01; // Avoid flickering
                    gl_PointSize = 384.0 / -mvPosition.z; // Reduced from 480.0 to match 20% shrink
                }

            `,fragmentShader:`
                uniform sampler2D uTexture;
                uniform vec3 uColor;
                uniform vec3 uHeadColor;
                uniform float uRainbow;
                uniform float uBrightness;
                uniform float uTime;
                varying float vAlpha;
                varying float vCharIndex;
                varying float vBrightness;
                varying vec3 vPos;
                float hue2rgb(float p, float q, float t) {
                    if(t < 0.0) t += 1.0;
                    if(t > 1.0) t -= 1.0;
                    if(t < 1.0/6.0) return p + (q - p) * 6.0 * t;
                    if(t < 1.0/2.0) return q;
                    if(t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
                    return p;
                }
                vec3 hslToRgb(float h, float s, float l) {
                    float r, g, b;
                    if(s == 0.0) { r = g = b = l; } else {
                        float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
                        float p = 2.0 * l - q;
                        r = hue2rgb(p, q, h + 1.0/3.0); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1.0/3.0);
                    }
                    return vec3(r, g, b);
                }
                void main() {
                    float rawIndex = floor(vCharIndex + 0.5);
                    if (rawIndex > 8.5) {
                        float timeStep = floor(uTime * 0.5); 
                        rawIndex = 9.0 + mod((rawIndex - 9.0) + timeStep, 55.0);
                    }
                    float index = floor(rawIndex + 0.5);
                    float col = mod(index, 8.0);
                    float row = 7.0 - floor(index / 8.0);
                    vec2 uv = gl_PointCoord;
                    uv.y = 1.0 - uv.y;
                    vec2 atlasUV = (uv + vec2(col, row)) / 8.0;
                    vec4 texColor = texture2D(uTexture, atlasUV);
                    if (texColor.a < 0.1) discard;
                    if (vAlpha < 0.05) discard;
                    vec3 finalColor;
                    if (uRainbow > 0.5) {
                        float hue = fract(vPos.x * 0.05 + uTime * 0.1);
                        finalColor = hslToRgb(hue, 1.0, 0.6);
                        if (vBrightness >= 0.95) finalColor = mix(finalColor, vec3(1.0), 0.5);
                    } else {
                        finalColor = (vBrightness >= 0.95) ? uHeadColor : uColor;
                    }
                    // Apply global brightness multiplier
                    gl_FragColor = vec4(finalColor * uBrightness, vAlpha * texColor.a * uBrightness);
                }
            `,transparent:!0,depthWrite:!1,blending:G})}initEnvironment(){this.sunLight=new Oe(16774625,1.2),this.sunLight.position.set(50,100,50),this.scene.add(this.sunLight),this.ambientLight=new ke(4210752,.6),this.scene.add(this.ambientLight)}ensureInitialized(e){const t=`[VizInit] ${e}`;e==="sphere"&&(!this.sphereGroup||this.sphereGroup.children.length===0)&&this.initSphere(),e==="particles"&&(!this.particleGroup||this.particleGroup.children.length===0)&&this.initParticles(),e==="lightspeed"&&(!this.lightspeedGroup||this.lightspeedGroup.children.length===0)&&this.initLightspeed(),e==="waves"&&(!this.wavesGroup||this.wavesGroup.children.length===0)&&this.initWaves(),e==="lava"&&(!this.lavaGroup||this.lavaGroup.children.length===0)&&this.initLava(),e==="fireplace"&&(!this.fireplaceGroup||this.fireplaceGroup.children.length===0)&&this.initFireplace(),e==="rainforest"&&(!this.rainforestGroup||this.rainforestGroup.children.length===0)&&this.initRainforest(),e==="zengarden"&&(!this.zenGardenGroup||this.zenGardenGroup.children.length===0)&&this.initZenGarden(),e==="ocean"&&(!this.oceanGroup||this.oceanGroup.children.length===0)&&this.initOcean(),(e==="cyber"||e==="matrix")&&(!this.cyberGroup||this.cyberGroup.children.length===0)&&this.initCyber(),e==="box"&&(!this.boxGroup||this.boxGroup.children.length===0)&&this.initBox(),e==="dragon"&&(!this.dragonGroup||this.dragonGroup.children.length===0)&&this.initDragon(),e==="galaxy"&&(!this.galaxyGroup||this.galaxyGroup.children.length===0)&&this.initGalaxy(),e==="mandala"&&(!this.mandalaGroup||this.mandalaGroup.children.length===0)&&this.initMandala(),e==="snowflake"&&(!this.snowflakeGroup||this.snowflakeGroup.children.length===0)&&this.initSnowflake()}initCyber(){for(;this.cyberGroup.children.length>0;){const c=this.cyberGroup.children[0];this.cyberGroup.remove(c),c.material&&(c.material.map&&c.material.map.dispose(),c.material.dispose()),c.children&&c.traverse(y=>{y.geometry&&y.geometry.dispose(),y.material&&(y.material.map&&y.material.map.dispose(),y.material.dispose())})}this.cyberRotationGroup=null,this.cyberPoints=null;const e=80,t=120,i=new k,a=[],s=[],o=[],r=[],n=240,d=160,h=n/e,l=d/t;for(let c=0;c<e;c++){const y=c*h-n/2+Math.random()*.8*h,m=-20-Math.random()*2,g=.5+Math.random()*.5,L=this.matrixConfig,F=L.logicMode==="mindwave"||L.logicMode==="mw"||L.logicMode==="custom"||L.logicMode==="txt",S=L.logicMode==="matrix"||L.logicMode==="int"||L.logicMode==="interstellar",T=((L.logicMode==="custom"||L.logicMode==="txt")&&L.customText?"🪷"+L.customText:"MINDWAVE").length,M=S?Math.random()*100:0,q=S?.5+Math.random()*1.5:1,j=Math.random()*100+M;for(let R=0;R<t;R++){const V=d/2-R*l;a.push(y,V,m),F?s.push(R%(T+1)):S?s.push(Math.floor(Math.random()*64)):s.push(9+Math.floor(Math.random()*55)),o.push(j),r.push(g*q)}}i.setAttribute("position",new H(a,3)),i.setAttribute("aCharIndex",new H(s,1)),i.setAttribute("aSpawnTime",new H(o,1)),i.setAttribute("aSpeed",new H(r,1)),this.cyberGeometry=i;const v=this.createCyberTexture(this.matrixConfig);this.cyberMaterial=this.createCyberShader(v,this.matrixConfig),this.cyberRain=new W(i,this.cyberMaterial),this.cyberRain.frustumCulled=!1,this.cyberRain.renderOrder=-1,this.cyberRotationGroup=new I,this.cyberRotationGroup.add(this.cyberRain),this.cyberGroup.add(this.cyberRotationGroup),this.currentCyberAngle!==void 0&&(this.cyberRotationGroup.rotation.z=ve.degToRad(-this.currentCyberAngle))}setCyberMode(e){if(this.mindWaveMode!==e)if(this.mindWaveMode=e,this.cyberLogicMode=e?"mindwave":"classic",e&&this.cyberMaterial){const t=this.cyberMaterial.uniforms.uTexture.value,i=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=i,this.cyberMaterial.needsUpdate=!0,t&&t.dispose()}else this.initCyber()}setMode(e){const t=this.mapMode(e);this.activeModes.clear(),this.activeModes.add(t),this.mode=t,this.updateVisibility(),this.updateLabel(t)}mapMode(e){return{cube:"box",flow:"particles",zen:"zengarden",rain:"rainforest",interstellar:"matrix",ocean:"waves"}[e]||e}toggleMode(e){const t=this.mapMode(e);t==="matrix"&&!this.activeModes.has("matrix")&&(this.matrixConfig.logicMode||(this.matrixConfig.logicMode="interstellar")),t==="cyber"&&!this.activeModes.has("cyber")&&(this.cyberConfig.logicMode||(this.cyberConfig.logicMode="matrix"));const i=this.activeModes.has("cyber");this.activeModes.has(t)?this.activeModes.delete(t):this.activeModes.add(t),this.active=this.activeModes.size>0,this.updateVisibility(),this.updateLabel(t),this.activeModes.forEach(a=>this.ensureInitialized(a)),this.initialized&&this.active&&!this._isRendering&&(w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null),this.render()),this.mode=t,this.updateVisibility(),this.activeModes.size===0&&!i&&(this.active=!1,this.renderer&&(this.renderer.autoClearColor=!0,this.renderer.clear(),this.renderer.render(this.scene,this.camera))),this.activeModes.size===1?this.updateLabel(Array.from(this.activeModes)[0]):this.activeModes.size>1?this.updateLabel("multi"):this.updateLabel("none"),window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}})),this.updateCyberStrings&&this.updateCyberStrings()}toggleGalaxySunStyle(){const e=this.galaxySunStyle==="sun"?"sun2":this.galaxySunStyle==="sun2"?"sun3":"sun";return this.setGalaxySunStyle(e),e}updateVisibility(){if(this.activeModes.forEach(e=>this.ensureInitialized(e)),this.sphereGroup&&(this.sphereGroup.visible=this.activeModes.has("sphere")),this.particleGroup&&(this.particleGroup.visible=this.activeModes.has("particles")),this.lightspeedGroup&&(this.lightspeedGroup.visible=this.activeModes.has("lightspeed")),this.wavesGroup&&(this.wavesGroup.visible=this.activeModes.has("waves")),this.oceanGroup&&(this.oceanGroup.visible=this.activeModes.has("ocean")),this.lavaGroup&&(this.lavaGroup.visible=this.activeModes.has("lava")),this.fireplaceGroup&&(this.fireplaceGroup.visible=this.activeModes.has("fireplace")),this.rainforestGroup&&(this.rainforestGroup.visible=this.activeModes.has("rainforest")),this.zenGardenGroup&&(this.zenGardenGroup.visible=this.activeModes.has("zengarden")),this.boxGroup&&(this.boxGroup.visible=this.activeModes.has("box")),this.dragonGroup&&(this.dragonGroup.visible=this.activeModes.has("dragon")),this.galaxyGroup&&(this.galaxyGroup.visible=this.activeModes.has("galaxy")),this.mandalaGroup&&(this.mandalaGroup.visible=this.activeModes.has("mandala")),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics")),this.snowflakeGroup){const e=this.cymaticMaterial&&Math.abs(this.cymaticMaterial.uniforms.uMedium.value-3)<.1;this.snowflakeGroup.visible=this.activeModes.has("snowflake")||this.activeModes.has("cymatics")&&e}this.cyberGroup&&(this.cyberGroup.visible=this.activeModes.has("matrix")),this.overlayCanvas&&(this.activeModes.has("cyber")?(this.overlayCanvas.classList.remove("hidden"),this.activeModes.has("matrix")?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1):this.activeModes.size>1?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:.7}})),this.wasAutoDimmed=!0):(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1),(!this.matrixCyberStreams||this.matrixCyberStreams.length===0)&&this.generateCyberStyle()):(this.overlayCanvas.classList.add("hidden"),this.wasAutoDimmed&&(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1))),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics"),this.cymaticsGroup.position.z=2),this.updateUIPanels()}updateUIPanels(){typeof window.updateConfigPanel=="function"&&window.updateConfigPanel()}updateLabel(e){const t=document.getElementById("visualLabel");t&&(e==="sphere"?t.textContent="BIO-RESONANCE":e==="particles"?t.textContent="NEURAL FLOW":e==="lightspeed"?t.textContent="WARP":e==="waves"||e==="ocean"?t.textContent="OCEAN":e==="lava"?t.textContent="LAVA LAMP":e==="fireplace"?t.textContent="FIREPLACE":e==="rainforest"?t.textContent="RAINFOREST":e==="zengarden"?t.textContent="ZEN GARDEN":e==="cymatics"?t.textContent="CYMATICS":e==="cyber"?t.textContent="CYBER":e==="matrix"?t.textContent="MATRIX":e==="snowflake"?t.textContent="SNOWFALL":e==="multi"?t.textContent="MULTI-SENSORY":t.textContent="")}initWaves(){for(this.wavesGroup||(this.wavesGroup=new I,this.scene.add(this.wavesGroup));this.wavesGroup.children.length>0;){const t=this.wavesGroup.children[0];this.wavesGroup.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}const e=new Y(80,80,160,160);this.wavesMaterial=new E({uniforms:{uTime:{value:0},uColor:{value:this.customColor?new A(this.customColor):new A(26367)},uSecondaryColor:{value:new A(62207)},uIntensity:{value:1},uNormBass:{value:0},uResolution:{value:new me(window.innerWidth,window.innerHeight)}},vertexShader:`
                varying vec2 vUv;
                varying float vElevation;
                varying vec3 vViewPosition;
                uniform float uTime, uNormBass;
                
                float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
                float noise(vec2 p) {
                    vec2 i = floor(p); vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
                }

                // Gerstner Wave implementation for sharp crests
                vec3 gWave(vec2 p, float t, float a, float s, float w, vec2 d) {
                    float f = w * dot(d, p) + t * s;
                    return vec3(d.x * a * cos(f), d.y * a * cos(f), a * sin(f));
                }

                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    
                    // Layer 1: Fundamental Tides
                    pos += gWave(pos.xy, uTime * 1.2, 1.2, 1.5, 0.25, vec2(1, 0));
                    pos += gWave(pos.xy, uTime * 0.8, 1.0, 1.2, 0.18, vec2(0, 1));
                    
                    // Layer 2: Audio-Reactive Ripples
                    float audioDisp = noise(pos.xy * 0.4 + uTime) * (1.5 + uNormBass * 3.5);
                    pos.z += audioDisp;

                    vElevation = pos.z;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    vViewPosition = -mvPosition.xyz;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,fragmentShader:`
                varying vec2 vUv;
                varying float vElevation;
                varying vec3 vViewPosition;
                uniform vec3 uColor, uSecondaryColor;
                uniform float uNormBass, uTime;

                void main() {
                    // Derive normal from view position derivatives
                    vec3 fNormal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));
                    
                    // Deep sea gradient
                    float depth = smoothstep(-2.0, 4.0, vElevation);
                    vec3 deepCol = mix(uColor * 0.2, uColor, depth);
                    vec3 shallowCol = mix(uSecondaryColor, vec3(1.0), uNormBass * 0.4);
                    
                    vec3 col = mix(deepCol, shallowCol, depth);
                    
                    // Specular Highlights (Bioluminescent cresting)
                    float spec = pow(max(fNormal.z, 0.0), 32.0);
                    col += spec * (0.4 + uNormBass * 0.8) * uSecondaryColor;
                    
                    // Dynamic Foam / Bioluminescence
                    float foam = smoothstep(2.5, 4.5, vElevation + uNormBass * 2.0);
                    col = mix(col, vec3(0.8, 1.0, 1.0), foam);
                    
                    // Cinematic Vignette
                    float vig = 1.0 - length(vUv - 0.5) * 1.2;

                    gl_FragColor = vec4(col * vig, 0.75 + uNormBass * 0.2);
                }
            `,transparent:!0,wireframe:!1,side:X,extensions:{derivatives:!0}}),this.wavesMesh=new P(e,this.wavesMaterial),this.wavesMesh.rotation.x=-Math.PI/2.2,this.wavesMesh.position.y=-5,this.wavesMesh.position.z=-10,this.wavesGroup.add(this.wavesMesh)}setSpeed(e){this.speedMultiplier=e}setIntent(e){this.currentIntent=e,e==="delta"||e==="theta"?this.particles&&this.particles.material&&(this.particles.material.size=.3,this.particles.material.opacity=.5):e==="gamma"||e==="hyper-gamma"?(this.particles&&this.particles.material&&(this.particles.material.size=.08,this.particles.material.opacity=.9),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(16777215),this.cyberMaterial.uniforms.uTailLength.value=.4)):(this.particles&&this.particles.material&&(this.particles.material.size=.15,this.particles.material.opacity=.8),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(15794160),this.cyberMaterial.uniforms.uTailLength.value=1)),this.renderSingleFrame()}setColor(e,t=null){var i,a,s,o;this.customColors||(this.customColors={}),!t||t==="all"?(this.customColors={},this.customColor=new A(e)):this.customColors[t]=new A(e);try{const r=n=>{n&&(n.color&&typeof n.color.set=="function"?n.color.set(e):n.uniforms&&n.uniforms.uColor&&n.uniforms.uColor.value.set(e))};this.particles&&this.particles.material&&r(this.particles.material),this.lightspeed&&this.lightspeed.material&&r(this.lightspeed.material),this.sphere&&this.sphere.material&&(r(this.sphere.material),this.core&&this.core.material&&r(this.core.material)),(t==="box"||!t||t==="all")&&(this.boxOuter&&this.boxOuter.children.forEach(n=>r(n.material)),this.boxInner&&this.boxInner.children.forEach(n=>r(n.material)),this.boxEdges&&this.boxEdges.material&&r(this.boxEdges.material)),t==="mandala"&&(this.mandalaRings&&this.mandalaRings.forEach(n=>r(n.material)),this.mandalaCenter&&this.mandalaCenter.material&&r(this.mandalaCenter.material)),this.wavesMesh&&this.wavesMesh.material&&r(this.wavesMesh.material),this.lavaBlobs&&this.lavaBlobs.forEach(n=>r(n.material)),this.lavaGlow&&this.lavaGlow.material&&r(this.lavaGlow.material),this.flames&&this.flames.material&&r(this.flames.material),this.raindrops&&this.raindrops.material&&r(this.raindrops.material),this.petals&&this.petals.material&&r(this.petals.material),this.zenWater&&this.zenWater.material&&r(this.zenWater.material),this.oceanWave&&this.oceanWave.material&&r(this.oceanWave.material),this.oceanFoam&&this.oceanFoam.material&&r(this.oceanFoam.material),this.cyberRain&&this.cyberRain.material&&this.cyberRain.material.uniforms&&this.cyberRain.material.uniforms.uColor&&this.cyberRain.material.uniforms.uColor.value.set(e),this.logoMesh&&this.originalLogoImg&&this.updateLogoTexture(),this.dragonGroup&&this.updateDragonColor&&this.updateDragonColor(new A(e)),(this.galaxyStars||this.galaxySunMesh)&&this.updateGalaxyColor(new A(e)),this.cymaticMaterial&&((i=this.cymaticMaterial.uniforms)!=null&&i.uColor)&&this.cymaticMaterial.uniforms.uColor.value.set(e),(t==="snowflake"||!t||t==="all")&&this.setSnowColor(e),(o=(s=(a=this._snowData)==null?void 0:a.material)==null?void 0:s.uniforms)!=null&&o.uColor&&this._snowData.material.uniforms.uColor.value.set(e)}catch{}this.renderSingleFrame()}renderSingleFrame(){!this.renderer||!this.scene||!this.camera||(this.renderer.clear(),this.renderer.render(this.scene,this.camera))}createCircleTexture(){if(this.textures.circle)return this.textures.circle;const e=32,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d");return i.beginPath(),i.arc(e/2,e/2,e/2,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),this.textures.circle=new $(t),this.textures.circle}render(e,t){var i,a,s,o,r,n,d,h,l;if(!this.initialized||!this.renderer||document.hidden||!this.active){this._isRendering=!1;return}if(!(this._isRendering&&typeof e=="number")){this._isRendering=!0;try{(typeof e=="number"||!e&&w.analyserLeft)&&(e=w.analyserLeft,t=w.analyserRight);let v=0,c=0,y=0;if(e){const f=e.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==f)&&(this._freqDataArray=new Uint8Array(f)),e.getByteFrequencyData(this._freqDataArray);let b=0;for(let C=0;C<15;C++)b+=this._freqDataArray[C];v=Math.pow(b/15/255,.8);let z=0;for(let C=10;C<100;C++)z+=this._freqDataArray[C];c=z/90/255;let x=0;for(let C=100;C<300;C++)x+=this._freqDataArray[C];y=x/200/255}const m=Math.max(.001,this.speedMultiplier||1),g=performance.now()*.001;if(this.activeModes.has("cymatics")&&this.cymaticsCore){const f=window.cymaticsAudioSync!==!1?{bass:v||0,mids:c||0,highs:y||0}:{bass:0,mids:0,highs:0},b=window.cymaticsMouseSync!==!1?{x:this.mouseX||0,y:this.mouseY||0}:null;this.cymaticsCore.update(g*m,f,b)}this.lastTime||(this.lastTime=g);const L=Math.min(.1,g-this.lastTime);this.lastTime=g;const F=w.visualSpeedAuto?w.beatFrequency||10:m*10,S=Math.sin(g*Math.PI*2*F)*.5+.5,D=this.vibrationEnabled?1:0,T=(S||0)*D,M=(v||0)*D,q=D*(.02+M*.15+T*.08),j=Math.sin(g*47.3)*Math.cos(g*31.7)*q,R=Math.cos(g*53.1)*Math.sin(g*29.3)*q,V=Math.sin(g*37.9)*Math.cos(g*43.1)*q,ne=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];for(const f of ne)f&&f.position.set(j,R,V);if(this.activeModes.has("galaxy")&&this.galaxyGroup){const f=this.sunRotationSpeedY||.002,b=this.sunRotationSpeedZ||5e-4;if(this.galaxyStars&&(this.galaxyStars.rotation.y+=f*m*.5,this.galaxyStars.rotation.z+=b*m*.5),this.galaxySunMesh){this.galaxySunMesh.rotation.z-=b*m*1.5,this.galaxySunMesh.rotation.y+=f*m*2;const z=1+M*.15*(this.galaxySunStyle==="sun3"?2.5:1);this.galaxySunMesh.scale.setScalar(z)}this.galaxySunUniforms&&(this.galaxySunUniforms.uTime.value=g*m,this.galaxySunUniforms.uBassIntt.value=M,this._cymaticV2&&this._cymaticV2.shiver>.5&&(this.galaxySunUniforms.uTime.value+=this._cymaticV2.shiver*.05))}if(this.activeModes.has("sphere")&&this.sphere&&(this.sphere.scale.setScalar(1+M*.15),this.sphere.rotation.y+=.005*m),this.activeModes.has("particles")&&this.particleMaterial){const f=((a=(i=window.MindWaveState)==null?void 0:i.envIntensities)==null?void 0:a.flow)??1,b=(.015*m+M*.08+T*.05)*f;this.particleMaterial.uniforms.uTime.value=g,this.particleMaterial.uniforms.uSpeed.value=b*10,this.particleGroup.rotation.z+=(.001*m+M*.005)*f}if(this.activeModes.has("lightspeed")&&this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uTime.value=g,this.lightspeedMaterial.uniforms.uSpeed.value=m),this.activeModes.has("matrix")&&this.cyberMaterial&&(this.cyberMaterial.uniforms.uTime.value=g*m),this.activeModes.has("waves")&&this.wavesMaterial){const f=((o=(s=window.MindWaveState)==null?void 0:s.envIntensities)==null?void 0:o.ocean)??1;this.wavesMaterial.uniforms.uTime.value=g*m*.5,this.wavesMaterial.uniforms.uNormBass.value=M*f,this.wavesMaterial.uniforms.uIntensity&&(this.wavesMaterial.uniforms.uIntensity.value=f)}if(this.activeModes.has("ocean")&&this.oceanWave&&this.oceanWave.material.uniforms){const f=((n=(r=window.MindWaveState)==null?void 0:r.envIntensities)==null?void 0:n.ocean)??1;this.oceanWave.material.uniforms.uTime.value=g*m,this.oceanWave.material.uniforms.uNormBass.value=M*f,this.oceanWave.material.uniforms.uBeatPulse.value=T*f,this.oceanFoam&&(this.oceanFoam.material.opacity=(.4+M*.3+T*.2)*(this.brightnessMultiplier||1)*f)}if(this.activeModes.has("box")&&this.boxOuter&&(this.boxOuter.rotation.x+=.008*m+M*.02,this.boxOuter.rotation.y+=.012*m,this.boxInner&&(this.boxInner.rotation.x-=.015*m,this.boxInner.rotation.y-=.01*m,this.boxInner.scale.setScalar(.95+M*.2)),this.boxOuter.scale.setScalar(1+M*.2),this.boxEdges&&this.boxEdges.rotation.copy(this.boxOuter.rotation)),this.activeModes.has("dragon")&&this.dragonBodyInstanced&&this.dragonDummy){this.dragonGroup.rotation.y+=.005*m;const f=g*m*2,b=1+M*.2;for(let z=0;z<this.dragonLength;z++){const x=f-z*.12,C=Math.sin(x)*8,N=Math.cos(x*1.5)*4+Math.sin(x*.5)*3,we=Math.cos(x*.8)*8;this.dragonDummy.position.set(C,N,we);const K=x+.1,Me=Math.sin(K)*8,Ce=Math.cos(K*1.5)*4+Math.sin(K*.5)*3,Se=Math.cos(K*.8)*8;this.dragonDummy.lookAt(Me,Ce,Se);const ze=1-z/this.dragonLength*.8,Ge=1+Math.sin(x*4)*.15*(.5+M);this.dragonDummy.scale.setScalar(ze*Ge*b),this.dragonDummy.updateMatrix(),this.dragonBodyInstanced.setMatrixAt(z,this.dragonDummy.matrix),this.dragonGlowInstanced&&this.dragonGlowInstanced.setMatrixAt(z,this.dragonDummy.matrix),z===0&&this.dragonHead&&(this.dragonHead.position.copy(this.dragonDummy.position),this.dragonHead.quaternion.copy(this.dragonDummy.quaternion),this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4))}if(this.dragonBodyInstanced.instanceMatrix.needsUpdate=!0,this.dragonGlowInstanced&&(this.dragonGlowInstanced.instanceMatrix.needsUpdate=!0),this.dragonPearlGroup){const z=f+.5;this.dragonPearlGroup.position.set(Math.sin(z)*9,Math.cos(z*1.5)*5+Math.sin(z*.5)*4,Math.cos(z*.8)*9),this.dragonPearlGroup.rotation.x+=.08*m,this.dragonPearlGroup.rotation.y+=.12*m}}if(this.activeModes.has("mandala")&&this.mandalaRings&&(this.mandalaRings.forEach((f,b)=>{f.userData&&f.userData.speed&&(f.rotation.z+=f.userData.speed*m+M*.005);const z=1+T*.1*(b+1)*.3;f.scale.setScalar(z)}),this.mandalaCenter&&(this.mandalaCenter.rotation.z-=.01*m,this.mandalaCenter.scale.setScalar(1+M*.3))),this.logoMesh){const f=w.lotusState||"auto";let b=.8;f==="faded"||f==="full"&&(b=1),this._lotusCurrentOpacity===void 0&&(this._lotusCurrentOpacity=.8),this._lotusCurrentOpacity+=(b-this._lotusCurrentOpacity)*.1,this.logoMesh.material.opacity=this._lotusCurrentOpacity,this.logoMesh.scale.setScalar(1+M*(.05+((d=this._cymaticV2)==null?void 0:d.shiver)*.1)+T*.02)}if(this.activeModes.has("lava")&&this.lavaBlobs&&this.lavaUniforms){const f=((l=(h=window.MindWaveState)==null?void 0:h.envIntensities)==null?void 0:l.lava)??1;this.lavaUniforms.uTime.value=g*m,this.lavaUniforms.uIntensity.value=M*f,this.lavaBlobs.forEach((b,z)=>{const x=b.userData,C=m*(1+M*.8);if(x.state==="heating"?(x.temperature+=x.heatRate*L*C,x.temperature>=1&&(x.temperature=1,x.state="rising")):x.state==="rising"?(b.position.y+=x.riseSpeed*C,b.position.y>=x.floatMax&&(x.state="cooling")):x.state==="cooling"?(x.temperature-=x.coolRate*L*C,x.temperature<=0&&(x.temperature=0,x.state="falling")):x.state==="falling"&&(b.position.y-=x.fallSpeed*C,b.position.y<=x.floatMin&&(x.state="heating")),b.position.x+=Math.sin(g*x.driftSpeed+x.driftPhase)*.02*C,this.lavaUniforms.uBlobs.value[z]){const N=x.baseSize*(.8+.5*x.temperature);this.lavaUniforms.uBlobs.value[z].set(b.position.x,b.position.y,b.position.z,N)}})}if(this.snowflakeGroup&&this.snowflakeGroup.visible&&this._snowData){const f=this._snowData,b=f.points.geometry.attributes.position.array,z=m*2;for(let x=0;x<f.count;x++){const C=x*3;b[C+1]-=f.speeds[x]*z;let N=Math.sin(g*f.driftFreqs[x]+f.phases[x])*f.drifts[x]*z;b[C]+=N,b[C+1]<-22&&(b[C+1]=22),b[C]>35&&(b[C]=-35),b[C]<-35&&(b[C]=35)}if(f.points.geometry.attributes.position.needsUpdate=!0,f.spinMeshes){const x=1+(M||0)*.15;f.spinMeshes.forEach((C,N)=>{C.rotation.z+=f.spinSpeeds[N]*z,C.position.y-=f.spinSpeeds[N]*.1*z,C.scale.setScalar(x),C.position.y<-25&&(C.position.y=25)})}f.material&&f.material.uniforms&&f.material.uniforms.uIntensity&&(f.material.uniforms.uIntensity.value=.2+M*.8)}if(this.activeModes.has("rainforest")&&this.rainMaterial){const f=m*.8*(1+T*.3);this.rainMaterial.uniforms.uTime.value=g,this.rainMaterial.uniforms.uSpeed.value=f,this.rainMaterial.uniforms.uIntensity.value=(.5+M*.2+T*.2)*(this.brightnessMultiplier||1)}if(this.activeModes.has("zengarden")&&this.petalMaterial){const f=m*.3*(1+T*.5);this.petalMaterial.uniforms.uTime.value=g,this.petalMaterial.uniforms.uSpeed.value=f,this.zenWater&&(this.zenWater.material.opacity=(.3+T*.2)*(this.brightnessMultiplier||1))}if(this.activeModes.has("fireplace")&&this.fireMesh&&this.fireMesh.material&&this.fireMesh.material.uniforms){const f=.8+.2*Math.sin(g*15)*Math.sin(g*7),b=this.fireMesh.material.uniforms;b.uTime&&(b.uTime.value=g*1.5*m),b.uIntensity&&(b.uIntensity.value=f+M*.5),this.fireLight&&(this.fireLight.intensity=(2+M*5)*f)}const B=performance.now(),xe=B-(this._lastFrameStartTime||B);if(this._lastFrameStartTime=B,this._fpsRingBuffer&&(this._fpsRingBuffer[this._fpsRingIndex]=xe,this._fpsRingIndex=(this._fpsRingIndex+1)%60,this._fpsRingCount=Math.min(60,this._fpsRingCount+1),this._fpsRingCount===60)){let f=0;for(let z=0;z<60;z++)f+=this._fpsRingBuffer[z];f/=60,1e3/f<35&&B-(this._lastLodDegradation||0)>3e3&&(this.degradeLOD(),this._lastLodDegradation=B,this._fpsRingCount=0)}const be=1e3/(this.targetFPS||60);B-this.lastFrameRenderTime>=be&&(this.renderer.autoClear=!this.activeModes.has("lightspeed"),this.renderer.autoClear&&this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.activeModes.has("cyber")&&this.renderCyberCyber(),this.lastFrameRenderTime=B)}catch(v){v.name==="TypeError"&&v.message.includes("uniforms")}finally{this._isRendering=!1}this.active&&!document.hidden?w.animationId=requestAnimationFrame(()=>this.render(w.analyserLeft,w.analyserRight)):w.animationId=null}}setCyberColor(e){this.cyberConfig.color=e,this.cyberConfig.rainbow=!1,this.cyberColorCustomized=!0,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.matrixConfig.rainbow=!1,this.cyberMaterial&&this.cyberMaterial.uniforms.uColor&&(this.cyberMaterial.uniforms.uColor.value.set(e),this._tempColor.set(e),this._tempColor.r+=(1-this._tempColor.r)*.8,this._tempColor.g+=(1-this._tempColor.g)*.8,this._tempColor.b+=(1-this._tempColor.b)*.8,this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor),this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=0))}getAverageFrequency(e,t){let i=w.analyserLeft||w.analyserRight;if(!i)return 0;const a=i.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==a)&&(this._freqDataArray=new Uint8Array(a));const s=this._freqDataArray;i.getByteFrequencyData(s),e===void 0&&(e=0),t===void 0&&(t=s.length);let o=0,r=0;for(let n=e;n<t&&n<s.length;n++)o+=s[n],r++;return r>0?o/r:0}setMouseInfluence(e){this.mouseInfluence=e}setGlobalSpeed(e){this.speedMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=1+(e-1)*.5)}setGlobalBrightness(e){this.brightnessMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberBrightness(e){this.cyberConfig.brightness=e}setMatrixBrightness(e){this.matrixConfig.brightness=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberSpeed(e){this.cyberConfig.speed=e}setCyberLength(e){this.cyberConfig.length=e}setMatrixSpeed(e){this.matrixConfig.speed=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=e)}setMatrixLength(e){this.matrixConfig.length=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uTailLength.value=e)}setCyberRainbow(e){if(this.cyberConfig.rainbow=e,this.cyberRainbowMode=e,!e){const t=this.cyberConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(i=>{i.color=t})}}setMatrixRainbow(e){this.matrixConfig.rainbow=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=e?1:0)}setBatterySaver(e){this.batterySaver=e,this.targetFPS=e?30:60;const t=e?1:2;this.renderer&&(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t)),this.resize())}degradeLOD(){this.renderer&&(this.currentLodLevel==="high"?(this.renderer.setPixelRatio(1),this.currentLodLevel="medium",this.resize()):this.currentLodLevel==="medium"&&(this.renderer.setPixelRatio(.75),this.currentLodLevel="low",this.resize()))}updateCyberStrings(){if(!this.matrixCyberStreams)return;let e=!1,t="MINDWAVE🪷";const i=this.cyberConfig;i.logicMode==="custom"||i.logicMode==="txt"?(e=!0,t="🪷"+(i.customText||"WELCOME TO MINDWAVE")):(i.logicMode==="mindwave"||i.logicMode==="mw")&&(e=!0,t="MINDWAVE🪷");const a="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",s="0123456789·:.-+x[]<>/\\∆ΣΩ∞",o=100;this.matrixCyberStreams.forEach(r=>{if(r.chars=[],r.isTextMode=e,e&&t.length>0){const n=[...t].reverse();for(let d=0;d<o;d++)r.chars.push(n[d%n.length])}else if(i.logicMode==="matrix"||i.logicMode==="interstellar"||i.logicMode==="int")for(let n=0;n<o;n++)r.chars.push(s.charAt(Math.floor(Math.random()*s.length)));else for(let n=0;n<o;n++)r.chars.push(a.charAt(Math.floor(Math.random()*a.length)))})}setCyberLogicMode(e,t){this.cyberConfig.logicMode=e,t!==void 0&&(this.cyberConfig.customText=t),this.updateCyberStrings()}setMatrixLogicMode(e,t){if(this.matrixConfig.logicMode=e,t!==void 0&&(this.matrixConfig.customText=t),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTexture){const i=this.cyberMaterial.uniforms.uTexture.value,a=this.createCyberTexture(this.matrixConfig);this.cyberMaterial.uniforms.uTexture.value=a,this.cyberMaterial.needsUpdate=!0,i&&i.dispose()}this.initCyber()}setCyberColor(e){this.cyberConfig.color=e,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uColor&&this.cyberMaterial.uniforms.uColor.value.set(e)}setCyberAngle(e){this.cyberConfig.angle=e}setMatrixAngle(e){this.matrixConfig.angle=e,this.currentCyberAngle=e,this.cyberRotationGroup&&(this.cyberRotationGroup.rotation.z=ve.degToRad(-e))}setVibrationEnabled(e){this.vibrationEnabled=e}updateLogoTexture(){if(!this.originalLogoImg)return;const e=512;this._logoRenderCanvas||(this._logoRenderCanvas=document.createElement("canvas"),this._logoRenderCanvas.width=e,this._logoRenderCanvas.height=e);const t=this._logoRenderCanvas,i=t.getContext("2d",{willReadFrequently:!0});i.clearRect(0,0,e,e),i.drawImage(this.originalLogoImg,0,0,e,e);const a=i.getImageData(0,0,t.width,t.height),s=a.data,o=document.body.dataset.theme||"default",r=ce[o]||ce.default,n=r.secondary||r.accent||"#ffffff",d=this.customColors&&this.customColors.mandala?this.customColors.mandala:this.customColor,h=d?d.getHex():parseInt(r.accent.replace("#",""),16),l=parseInt(n.replace("#",""),16),v=h>>16&255,c=h>>8&255,y=h&255,m=l>>16&255,g=l>>8&255,L=l&255;this.themeType=document.body.dataset.themeType||"dark",this.themeType;for(let S=0;S<s.length;S+=4){const D=s[S],T=s[S+1],M=s[S+2],q=s[S+3];q<10||(D>200&&T>200&&M>200?(s[S]=v,s[S+1]=c,s[S+2]=y,s[S+3]=255):(s[S]=m,s[S+1]=g,s[S+2]=L,s[S+3]=Math.min(255,q*1.5)))}i.putImageData(a,0,0);const F=new $(t);if(F.minFilter=ge,F.magFilter=ge,F.generateMipmaps=!0,this.renderer&&(F.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),this.logoMesh){const S=this.logoMesh.material.map;this.logoMesh.material.map=F,this.logoMesh.material.needsUpdate=!0,S&&S.dispose()}else{const S=new Y(5.625,4.78),D=new _({map:F,transparent:!0,opacity:.8,color:16777215,depthTest:!1,depthWrite:!1});this.logoMesh=new P(S,D),this.logoMesh.position.set(0,0,-10),this.logoMesh.renderOrder=-1,this.scene.add(this.logoMesh)}}initOverlayLogo(){if(this.logoMesh)return;const e=new Image;e.crossOrigin="anonymous",e.src="./mindwave-logo-icon.png",e.onload=()=>{this.originalLogoImg=e,this.updateLogoTexture(),this.targetLogoOpacity!==void 0?this.setLogoOpacity(this.targetLogoOpacity):this.setLogoOpacity(.8)},e.onerror=t=>{}}setLogoOpacity(e){this.targetLogoOpacity=e,this.logoMesh&&this.logoMesh.material?this.logoMesh.material.opacity=e*this.brightnessMultiplier:!this.logoMesh&&e>0&&this.initOverlayLogo()}applyCymaticClassAndVariation(e,t){this.cymaticsCore&&(this.cymaticsCore.setPattern(e,t),this.activeModes.has("cymatics")||this.toggleMode("cymatics"))}setCymaticColor(e,t,i){if(this.cymaticsCore){if(i!==void 0)this.cymaticsCore.setColor(e,t,i);else if(e!==void 0){const a=e,s=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(s,1,a)}}}setCymaticColor2(e){if(!this.cymaticsCore)return;const t=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(t,2,new A(e))}setCymaticColor3(e){if(!this.cymaticsCore)return;const t=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(t,3,new A(e))}setCymaticParam(e,t,i){this.cymaticsCore&&this.cymaticsCore.setParam(e,t,i)}dispose(){this.active=!1,w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null),window.removeEventListener("resize",this.resize),window.removeEventListener("resize",this.resizeOverlayCanvas),window.removeEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode&&window.removeEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange&&document.removeEventListener("visibilitychange",this._boundVisibilityChange),this._boundThemeChange&&window.removeEventListener("themeChanged",this._boundThemeChange),this.canvas&&(this._boundContextLost&&this.canvas.removeEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored&&this.canvas.removeEventListener("webglcontextrestored",this._boundContextRestored)),this._boundCymaticPointer&&(window.removeEventListener("mousemove",this._boundCymaticPointer),window.removeEventListener("touchmove",this._boundCymaticPointer),this._boundCymaticPointer=null);const e=i=>{if(i)for(;i.children.length>0;){const a=i.children[0];if(i.remove(a),a.geometry&&a.geometry.dispose(),a.material){if(a.material.map&&a.material.map.dispose(),a.material.uniforms)for(const s in a.material.uniforms){const o=a.material.uniforms[s];o&&o.value&&o.value.dispose&&o.value.dispose()}a.material.dispose()}a.children&&a.children.length&&a.traverse(s=>{s.geometry&&s.geometry.dispose(),s.material&&(s.material.map&&s.material.map.dispose(),s.material.dispose())})}},t=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];this._fpsRingBuffer=null,this._tempColor=null,this._logoRenderCanvas=null,t.forEach(e),this.cyberMaterial&&(this.cyberMaterial.dispose(),this.cyberMaterial=null),this.fireMaterial&&(this.fireMaterial.dispose(),this.fireMaterial=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.lightspeedMaterial&&(this.lightspeedMaterial.dispose(),this.lightspeedMaterial=null),this.rainMaterial&&(this.rainMaterial.dispose(),this.rainMaterial=null),this.petalMaterial&&(this.petalMaterial.dispose(),this.petalMaterial=null),this.logoMesh&&(this.logoMesh.material&&(this.logoMesh.material.map&&this.logoMesh.material.map.dispose(),this.logoMesh.material.dispose()),this.logoMesh.geometry&&this.logoMesh.geometry.dispose(),this.scene&&this.scene.remove(this.logoMesh),this.logoMesh=null);for(const i in this.textures)this.textures[i]&&this.textures[i].dispose&&this.textures[i].dispose();if(this.textures={},this._freqDataArray=null,this.renderer){try{this.renderer.forceContextLoss()}catch{}this.renderer.dispose(),this.renderer=null}this.scene=null,this.camera=null}setWarpSpeed(e){this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uSpeed.value=e)}setWarpFov(e){this.camera&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setWarpChromatic(e){this.lightspeedMaterial}}le(ye,"CYMATIC_PATTERNS",[{classId:22,variationId:0,name:"Fundamental Zenith",style:"fractal"},{classId:22,variationId:1,name:"Quantum Flower",style:"sacred"},{classId:22,variationId:2,name:"Sacred Sun Resonance",style:"complex"},{classId:22,variationId:3,name:"Ethereal Nexus",style:"geometry"},{classId:22,variationId:4,name:"Golden Ratio Spiral",style:"fractal"},{classId:22,variationId:5,name:"Obsidian Bloom",style:"sacred"},{classId:22,variationId:6,name:"Prismatic Core",style:"complex"},{classId:22,variationId:7,name:"Void Resonance",style:"geometry"},{classId:22,variationId:8,name:"Nebula Plasma",style:"fractal"},{classId:22,variationId:9,name:"Sacred Gold Obsidian",style:"sacred"},{classId:22,variationId:10,name:"Biolum Abyssal",style:"complex"},{classId:22,variationId:11,name:"Emerald Cyber Matrix",style:"geometry"},{classId:22,variationId:12,name:"Liquid Mercury Crimson",style:"fractal"},{classId:22,variationId:13,name:"Quantum Crystal Lattice",style:"sacred"},{classId:22,variationId:14,name:"Solar Flare Harmonics",style:"complex"},{classId:22,variationId:15,name:"Amethyst Hyperdimensional",style:"geometry"},{classId:22,variationId:16,name:"Neon Labyrinth",style:"fractal"},{classId:22,variationId:17,name:"Celestial Mandala",style:"sacred"},{classId:22,variationId:18,name:"Astral Lotus",style:"complex"},{classId:22,variationId:19,name:"Lunar Tides",style:"geometry"},{classId:22,variationId:20,name:"Cybernetic Lotus",style:"fractal"},{classId:22,variationId:21,name:"Bioluminescent Shroom",style:"sacred"},{classId:22,variationId:22,name:"Vortex of Time",style:"complex"},{classId:22,variationId:23,name:"Diamond Lattice",style:"geometry"},{classId:22,variationId:24,name:"Seraphim Wings",style:"fractal"},{classId:22,variationId:25,name:"Fractal Heart",style:"sacred"},{classId:22,variationId:26,name:"Particle Swarm",style:"complex"},{classId:22,variationId:27,name:"Fluid SDF",style:"geometry"},{classId:22,variationId:28,name:"Quantum Topology",style:"fractal"},{classId:22,variationId:29,name:"Ai Cymatic 15",style:"sacred"}]);function et(){return p?Promise.resolve(p):new Promise(u=>{Xe(),setTimeout(()=>u(p),10)})}function Xe(){if(!p&&U.canvas&&U.canvas.activeVisualizer&&U.canvas.activeVisualizer.isVisualizer3D&&(p=U.canvas.activeVisualizer),U.canvas&&U.canvas.activeVisualizer){if(p&&U.canvas.activeVisualizer===p)return p;U.canvas.activeVisualizer.dispose(),U.canvas.activeVisualizer=null,p=null}w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null);const u=U.canvas||document.getElementById("visualizer");if(!p&&u){const e=u&&u.activeVisualizer&&u.activeVisualizer.isVisualizer3D?{activeModes:u.activeVisualizer.activeModes,mode:u.activeVisualizer.mode,mindWaveMode:u.activeVisualizer.mindWaveMode,cyberLogicMode:u.activeVisualizer.cyberLogicMode,cyberCustomText:u.activeVisualizer.cyberCustomText,currentCyberAngle:u.activeVisualizer.currentCyberAngle,cyberSpeedMultiplier:u.activeVisualizer.cyberSpeedMultiplier,rainbowEnabled:u.activeVisualizer._rainbowEnabled}:{};p=new ye(u,e),u.activeVisualizer=p,setTimeout(()=>{p&&(p.updateVisibility(),Ye())},0)}return p}function tt(){return p}let re=!1;function it(){re=!0,p&&w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null,p.renderer&&p.scene&&p.camera&&p.renderer.render(p.scene,p.camera))}function Ye(){p&&!w.animationId&&(p.active=!0,p.render(w.analyserLeft,w.analyserRight),re=!1)}function at(){return re}function ot(u){p&&p.toggleMode(u)}function st(u){p&&(p.setGlobalSpeed(u),p.setCyberSpeed&&p.setCyberSpeed(u))}function rt(u,e=null){p&&(p.setVisualColor(u,e),p.setCyberColor&&(!e||e=="cyber")&&p.setCyberColor(u))}function nt(u){p&&p.setGlobalBrightness&&p.setGlobalBrightness(u)}function lt(u){p&&p.setLogoOpacity(u)}function ct(u){p&&p.setMouseInfluence(u)}window.toggleGalaxySun=function(){return p?p.toggleGalaxySunStyle():null};window.setCymaticPattern=function(u,e){p&&p.cymaticsCore?(p.cymaticsCore.setPattern(u,e),p.activeModes.has("cymatics")||(window.switchRightTab&&window.switchRightTab("active",document.querySelector('.tab-pill[title="Cymatics"]')),p.activeModes.add("cymatics"),p.cymaticsGroup.visible=!0)):(window.setVisualMode&&window.setVisualMode("cymatics"),setTimeout(()=>{p&&p.cymaticsCore&&p.cymaticsCore.setPattern(u,e)},500))};export{ye as Visualizer3D,tt as getVisualizer,Xe as initVisualizer,at as isVisualsPaused,it as pauseVisuals,et as preloadVisualizer,Ye as resumeVisuals,ct as setMouseInfluence,nt as setVisualBrightness,rt as setVisualColor,lt as setVisualLogoOpacity,st as setVisualSpeed,ot as toggleVisual};
//# sourceMappingURL=visualizer_vGOLD_SYNC-Bwvvvmdr.js.map
