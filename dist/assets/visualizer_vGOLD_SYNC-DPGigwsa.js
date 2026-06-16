import{h as w,T as ue,e as O}from"./controls_v3-CTreHwsI.js";import{D as Ae,R as ze,P as j,S as E,A as I,V as ne,C as G,M as q,T as Pe,L as le,G as P,a as Ge,b as qe,W as De,I as ee,c as L,B as k,d as U,e as N,E as ie,f as ae,g as Z,h as $,O as _e,i as he,j as oe,k as te,F as H,l as se,m as X,n as Fe,o as me,p as Re,q as de,r as pe,s as Q,t as Le,u as Ve,v as Ee,w as Be,x as Oe,y as Ue,N as ve,z as ke,H as Ne,J as xe}from"./three-Cwtylbie.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";const re={1:[[2282478,8490232],[3462041,366185],[16494871,14753096],[16020150,9133302],[6334975,11032055],[16436245,15381256],[4906624,959977],[9741240,4674921],[16281969,10033947],[12616956,4988309],[3718648,223649],[16486972,12730636],[10741301,5078031],[15235577,8788367]],2:[[1357990,1013358],[6514417,4405450],[16007006,12456508],[11032055,8266446],[8702998,5078031],[959977,223649],[16096779,11817737],[1096065,292951],[15485081,12458077],[9133302,7153881],[15381256,10576391],[440020,561586]],3:[[3900150,1981066],[1096065,413243],[9133302,4988309],[16347926,8138002],[440020,1461859],[14239471,7346805],[15381256,7421714],[1357990,1265226],[16007006,8917815],[6514417,3223169]],4:[[16777215,0],[2282478,1973067],[16020150,4850766],[16569165,4528643],[7268279,142370],[9684477,1516884],[16557477,4524554],[12891645,3018853]],5:[[16766720,12092939],[16738740,13047173],[65535,35723],[8190976,2263842],[16753920,16729344],[12211667,4915330],[64154,3050327],[16716947,9109504],[2003199,139],[16775885,9142272]],6:[[65280,13056],[65535,51],[16711935,3342387],[13434624,3355392],[65484,13107],[16724838,3342336],[3394815,4403],[13369599,1114163],[6750003,1127168],[16763904,3346688]],7:[[16777215,16766720],[16729344,9109504],[65535,255],[16716947,4915330],[8388352,25600],[16711935,9055202],[2003199,1644912],[16737095,8388608],[64154,32896],[16775885,16747520]],8:[[16737095,4620980],[16766720,9055202],[64154,16716947],[16729344,3050327],[65535,13458524],[16711935,8087790],[3329330,16747520],[52945,9109504],[16758465,205],[11403055,4915330]],9:[[9109504,0],[3100495,16747520],[1644912,16777215],[4915330,3329330],[5597999,16711935],[8388608,65535],[128,16766720],[3050327,16716947],[4734347,16729344],[9127187,64154]],10:[[65280,16711935],[65535,16729344],[16766720,255],[16716947,3329330],[8388352,9055202],[16747520,52945],[64154,16711680],[2003199,16758465],[16711935,65280],[16776960,9109504]],11:[[16753920,9109504],[65535,139],[16716947,4915330],[3329330,25600],[16766720,3100495],[16711935,1644912],[64154,32896],[16729344,9127187],[2003199,0],[16776960,12092939]],12:[[65280,0],[16711935,0],[65535,0],[16776960,0],[16711680,0],[255,0],[16753920,0],[2003199,0],[3329330,0],[16716947,0]],13:[[15132410,4915330],[16758465,9109504],[14745599,32896],[16775885,9127187],[14524637,4734347],[10025880,3050327],[8900346,1644912],[16767673,13789470],[15761536,8388608],[2142890,139]],14:[[16766720,0],[65535,128],[16711935,4915330],[65280,25600],[16729344,9109504],[2003199,1644912],[16716947,8388736],[8388352,3050327],[64154,32896],[16753920,9127187]],15:[[16711935,65535],[16716947,2003199],[16753920,8388736],[65280,16711935],[16776960,16729344],[65535,4915330],[16738740,52945],[8388352,16716947],[64154,16747520],[2003199,16711680]],16:[[12632256,0],[8421504,65280],[11119017,65535],[6908265,16711935],[7833753,16753920],[7372944,16716947],[3100495,3329330],[0,16711680],[14474460,255],[13882323,9109504]],17:[[16711935,65535],[16716947,1644912],[65280,25600],[16753920,9109504],[65535,128],[16711680,9127187],[3329330,3050327],[2003199,4915330],[16776960,13789470],[16738740,8388736]],18:[[16711935,65535],[16716947,16766720],[16711680,9109504],[64154,205],[9699539,3329330],[49151,16711935],[16777215,8900346],[4915330,16738740],[16729344,16776960],[1644912,11403055]],19:[[11032055,3900150],[15485081,6514417],[1357990,959977],[16007006,9133302],[15381256,1096065],[440020,3900150]],20:[[16007006,12456508],[3900150,1981066],[1096065,413243],[9133302,4988309],[16347926,8138002],[15381256,7421714]],21:[[65535,16711935],[3900150,1981066],[16766720,12092939],[16729344,9109504],[15485081,9133302],[440020,1920728]],22:[[65535,16711935],[3900150,1981066],[16766720,12092939],[16729344,9109504],[15485081,9133302],[440020,1920728],[16766720,1710618],[58879,51],[16711935,16747520],[65407,8704],[12632256,9109504],[14745599,205],[16776960,16729344],[9699539,16716947]]},He=`
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    // Bypass camera matrices to draw a perfect full-screen quad behind other elements
    gl_Position = vec4(position.xy, 0.99, 1.0);
}
`,We=d=>d===1?`
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
        `:d===2?`
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
        `:d===3?`
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
        `:d===4?`
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
        `:d===5?`
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
        `:d===6?`
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
        `:d===8?`
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
        `:d===9?`
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
        `:d===10?`
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
        `:d===11?`
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
        `:d===12?`
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
        `:d===13?`
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
        `:d===14?`
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
        `:d===15?`
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
        `:d===16?`
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
        `:d===17?`
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
                // 3D Fractal Heart (Cardioid Base + Radial recursive folds)
                p.y += 0.2;
                p.yz *= rot(t*0.2);
                p.xz *= rot(t*0.3);
                float r = length(p);
                // Cardioid equation
                float theta = atan(p.y, length(p.xz));
                float cardioid = r - 0.4 * (1.0 + sin(theta));
                d = cardioid;
                // Add recursive folding for fractal details
                vec3 p2 = p;
                for(int i=0; i<3; i++) {
                    p2 = abs(p2) - 0.1;
                    p2.xy *= rot(t*0.5);
                    d = smin(d, length(p2) - 0.1, 0.1);
                }
#elif VARIATION == 1
                // Fluid SDF Core (smoothmin metaballs merging and separating)
                p.xz *= rot(t*0.5);
                p.xy *= rot(t*0.3);
                float d1 = sdSphere(p - vec3(sin(t)*0.4, cos(t*1.2)*0.3, 0), 0.25);
                float d2 = sdSphere(p - vec3(cos(t*0.8)*0.3, sin(t*0.9)*0.4, sin(t)*0.2), 0.2);
                float d3 = sdSphere(p - vec3(sin(t*0.5)*0.3, cos(t*0.6)*0.2, cos(t*1.1)*0.4), 0.3);
                float d4 = sdSphere(p, 0.2);
                // High smoothing factor for fluid look
                d = smin(smin(smin(d1, d2, 0.4), d3, 0.4), d4, 0.4);
#elif VARIATION == 2
                // Particle Swarm (Volumetric noise/Voronoi clusters)
                p.xz *= rot(t*0.3);
                p.xy *= rot(t*0.2);
                vec3 q = p * 6.0;
                // Complex organic noise displacement
                float noise = sin(q.x + t)*sin(q.y - t)*sin(q.z + t*1.5);
                float noise2 = cos(q.x*2.0 - t)*sin(q.y*2.0 + t);
                d = sdSphere(p, 0.5) + noise * 0.15 + noise2 * 0.05;
                // Hollow out center to create swarm shell
                d = max(d, -(sdSphere(p, 0.3)));
#elif VARIATION == 3
                // Quantum Topology (Nested interlaced tori/knots)
                p.xz *= rot(t*0.4);
                p.yz *= rot(t*0.2);
                float d1 = sdTorus(p, vec2(0.5, 0.05));
                vec3 p2 = p; p2.xy *= rot(1.57); p2.xz *= rot(1.57 + t);
                float d2 = sdTorus(p2, vec2(0.5, 0.05));
                vec3 p3 = p; p3.yz *= rot(1.57); p3.xy *= rot(1.57 - t);
                float d3 = sdTorus(p3, vec2(0.5, 0.05));
                // Interlock them
                d = min(min(d1, d2), d3);
                // Add a quantum core
                d = smin(d, sdSphere(p, 0.15 + sin(t*4.0)*0.05), 0.3);
#elif VARIATION == 4
                // Prime Prime (Sacred geometry, overlapping circles)
                p.xy *= rot(t*0.1);
                d = sdSphere(p, 0.1); // center
                for(int i=0; i<6; i++) {
                    float a = float(i) * 1.047197; // 2 PI / 6
                    vec3 offset = vec3(cos(a)*0.4, sin(a)*0.4, 0.0);
                    // Pulsing radius
                    float r = 0.3 + sin(t*2.0 + a)*0.05;
                    d = min(d, sdTorus(p - offset, vec2(r, 0.02)));
                }
                // Wrap in outer ring
                d = min(d, sdTorus(p, vec2(0.7, 0.02)));
#elif VARIATION == 5
                // Metatron's Grid (Hexagonal symmetry, sharp edges)
                p.xz *= rot(t*0.2);
                p.xy *= rot(t*0.1);
                vec3 q = p;
                // Hexagonal folding
                float a = atan(q.y, q.x);
                float r = length(q.xy);
                a = mod(a, 1.047197) - 0.523598; // pi/3
                q.x = r * cos(a);
                q.y = r * sin(a);
                
                d = sdBox(q, vec3(0.4, 0.05, 0.05));
                d = min(d, sdBox(q - vec3(0.3, 0.3, 0), vec3(0.1)));
                d = min(d, sdSphere(p, 0.1)); // Center node
#elif VARIATION == 6
                // Folding Hypercube
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.3);
                vec3 q = abs(p) - 0.4;
                d = sdBox(q, vec3(0.1));
                q = abs(q) - 0.2;
                d = min(d, sdBox(q, vec3(0.05)));
#elif VARIATION == 7
                // Gyroid Labyrinth
                p.xz *= rot(t*0.2);
                vec3 q = p * 5.0;
                float gyroid = dot(sin(q), cos(q.zxy));
                d = sdSphere(p, 0.8) + gyroid * 0.05;
#elif VARIATION == 8
                // Ethereal 3D Lotus
                p.xz *= rot(t*0.3);
                float a = atan(p.z, p.x);
                float r = length(p.xz);
                float petals = sin(a * 6.0 + t*2.0);
                vec3 q = p;
                q.y += r*r*1.5; // fold upwards
                d = length(q) - 0.4 - petals*0.1;
                d = max(d, -sdSphere(p - vec3(0,0.5,0), 0.6));
#else
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
        `:d===18?`
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
                if (r>1.5) break;
                float theta = acos(z.z/r);
                float phi = atan(z.y,z.x);
                dr = pow(r, Power-1.0)*Power*dr + 1.0;
                float zr = pow(r,Power);
                theta = theta*Power;
                phi = phi*Power;
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
        `:d===0?`
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
        `:d===19?`
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
            vec3 i = floor(x);
            vec3 f = fract(x);
            f = f*f*(3.0-2.0*f);
            return mix(mix(mix( hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),
                           mix( hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
                       mix(mix( hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                           mix( hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
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
        `:d===20?`
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
                float v = voronoi(p * (10.0 + bump*5.0) + t);
                float n = 3.0; float m = 5.0;
                float waves = cos(n*p.x)*cos(m*p.y) - cos(m*p.x)*cos(n*p.y);
                float node = smoothstep(0.1, 0.0, abs(waves));
                pattern = smoothstep(0.05, 0.0, v) * node;
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
        `:d===21?`
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
        `:d===22?`
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
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }

        float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int i = 0; i < 4; ++i) {
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
            
            vec3 finalColor = texColor.rgb * (1.0 - depletion * 0.5 * uIntensity);
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
            
            vec3 finalColor = texColor.rgb * (1.0 + fluidAccumulation * 1.5 * uIntensity);
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
            
            vec3 finalColor = texColor.rgb * (1.0 - swarmDepletion * 0.6 * uIntensity);
            customColor = mix(activeColor1, activeColor2, swarmAccumulation * 0.8 + luma * 0.2);
            finalColor += customColor * swarmAccumulation * 2.2 * uIntensity * luma * (1.0 + highPulse);
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
            
            vec3 finalColor = mix(texColor.rgb * 0.1, glowCol * 1.5, uIntensity);
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
            vec3 finalColor = texColor.rgb * (1.0 - smoothstep(0.0, 0.5, abs(radialWave)) * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, sin(r * 8.0 - time)*0.5+0.5);
            finalColor += customColor * (rayGlow * 2.5 + ringGlow * 1.8) * luma * (1.0 + lowPulse);
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
        }
        `:"void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }";class ge{constructor(e){this.group=e,this.meshes=[],this.activeClassId=1,this.activeVariationId=0,this.materials={};const t=new Ae(new Uint8Array([0,0,0,0]),1,1,ze);t.needsUpdate=!0,this.dummyTexture=t;const i=new j(2,2);for(let a=1;a<=22;a++){let s=We(a);a<=16&&(s=s.replace("uniform float uIntensity;",`uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;`),s=s.replace("float intMod = max(0.1, uIntensity);","float intMod = max(0.1, uIntensity * (1.0 + uAudioLow * 3.0 + uAudioMid * 1.5));")),s.includes("uniform float uMouseSync;")||(s=s.replace("void main() {",`uniform vec2 uMouse;
        uniform float uMouseSync;
        void main() {`)),a!==22&&(s.includes("vec2 p = (vUv - 0.5) * 2.0;")?s=s.replace("vec2 p = (vUv - 0.5) * 2.0;",`vec2 p = (vUv - 0.5) * 2.0;
            p -= uMouse * uMouseSync * 0.5;`):s.includes("vec2 uv = (vUv - 0.5) * 2.0;")&&(s=s.replace("vec2 uv = (vUv - 0.5) * 2.0;",`vec2 uv = (vUv - 0.5) * 2.0;
            uv -= uMouse * uMouseSync * 0.5;`)));const r=`
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
                #define atan safe_atan
                #define normalize safe_normalize
                
                ${s}
            `;this.materials[a]=new E({vertexShader:He,fragmentShader:r,defines:{VARIATION:0},uniforms:{uTime:{value:0},uAspect:{value:1},uColor1:{value:new G(6334975)},uColor2:{value:new G(11032055)},uIntensity:{value:1},uSpeed:{value:1},uHarmonics:{value:0},uVariation:{value:0},uAudioLow:{value:0},uAudioMid:{value:0},uAudioHigh:{value:0},uMouse:{value:new ne(0,0)},uAlpha:{value:1},uSpawnTime:{value:0},uTexture:{value:this.dummyTexture},uMouseSync:{value:0}},transparent:!0,depthWrite:!1,blending:I});const n=new q(i,this.materials[a]);n.visible=!1,n.position.z=-1,this.meshes.push(n),this.group.add(n)}this._boundCymaticsToggleMouseSync=a=>{for(let o=1;o<=22;o++)this.materials[o]&&this.materials[o].uniforms.uMouseSync&&(this.materials[o].uniforms.uMouseSync.value=a.detail.sync)},window.addEventListener("cymaticsToggleMouseSync",this._boundCymaticsToggleMouseSync)}setPattern(e,t){if(this.activeClassId=e,this.activeVariationId=t,this.meshes.forEach((i,a)=>{i.visible=a+1===e}),this.materials[e]){if(this.materials[e].uniforms.uVariation.value=t,(e===17||e===18||e===19||e===20||e===21||e===22)&&this.materials[e].defines.VARIATION!==t&&(this.materials[e].defines.VARIATION=t,this.materials[e].needsUpdate=!0,this.materials[e].uniforms.uSpawnTime&&(this.materials[e].uniforms.uSpawnTime.value=performance.now()*.001%(2e3*Math.PI))),re[e]&&re[e][t]){const i=re[e][t];this.materials[e].uniforms.uColor1.value.setHex(i[0]),this.materials[e].uniforms.uColor2.value.setHex(i[1]);try{window.dispatchEvent(new CustomEvent("cymaticColorSync",{detail:{classId:e,color1:"#"+i[0].toString(16).padStart(6,"0"),color2:"#"+i[1].toString(16).padStart(6,"0")}}))}catch{}}if(e===22){const i=["binaural-assets/images/cymatics/cymatics_fractal_heart_1779756441610.png","binaural-assets/images/cymatics/cymatics_fluid_sdf_1779756501734.png","binaural-assets/images/cymatics/cymatics_particle_swarm_1779756471939.png","binaural-assets/images/cymatics/cymatics_quantum_topology_1779756531135.png","binaural-assets/images/cymatics/ai_cymatic_15_1779566362935.png","binaural-assets/images/cymatics/ai_cymatic_16_1779566377245.png","binaural-assets/images/cymatics/cymatic_sacred_gold_obsidian.png","binaural-assets/images/cymatics/cymatic_biolum_abyssal.png","binaural-assets/images/cymatics/cymatic_nebula_plasma.png","binaural-assets/images/cymatics/cymatic_emerald_cyber_matrix.png","binaural-assets/images/cymatics/cymatic_liquid_mercury_crimson.png","binaural-assets/images/cymatics/cymatic_quantum_crystal_lattice.png","binaural-assets/images/cymatics/cymatic_solar_flare_harmonics.png","binaural-assets/images/cymatics/cymatic_amethyst_hyperdimensional.png","binaural-assets/images/cymatics/cymatic_astral_lotus.png","binaural-assets/images/cymatics/cymatic_celestial_mandala.png","binaural-assets/images/cymatics/cymatic_quantum_flower.png","binaural-assets/images/cymatics/cymatic_ethereal_nexus.png","binaural-assets/images/cymatics/cymatic_neon_labyrinth.png","binaural-assets/images/cymatics/cymatic_prismatic_core.png","binaural-assets/images/cymatics/cymatic_obsidian_bloom.png","binaural-assets/images/cymatics/cymatic_void_resonance.png","binaural-assets/images/cymatics/cymatic_golden_ratio_spiral.png"];i[t]&&(this.textureCache||(this.textureCache={}),this.textureCache[t]?this.materials[e].uniforms.uTexture.value=this.textureCache[t]:new Pe().load(i[t],o=>{o.generateMipmaps=!1,o.minFilter=le,this.textureCache[t]=o,this.activeClassId===e&&this.activeVariationId===t&&(this.materials[e].uniforms.uTexture.value=o)}))}this.materials[e]&&this.materials[e].uniforms.uMouseSync&&(this.materials[e].uniforms.uMouseSync.value=window.cymaticsMouseSync||0)}}setColor(e,t,i){if(this.materials[e]){const a=t===1?"uColor1":"uColor2";this.materials[e].uniforms[a].value.set(i)}}setParam(e,t,i){this.materials[e]&&(t==="intensity"?this.materials[e].uniforms.uIntensity.value=i:t==="speed"&&this.materials[e].uniforms.uSpeed?this.materials[e].uniforms.uSpeed.value=i:t==="harmonics"&&this.materials[e].uniforms.uHarmonics?this.materials[e].uniforms.uHarmonics.value=i:this.materials[e].uniforms[`u${t.charAt(0).toUpperCase()+t.slice(1)}`]&&(this.materials[e].uniforms[`u${t.charAt(0).toUpperCase()+t.slice(1)}`].value=i))}update(e,t,i){if(this.materials[this.activeClassId]&&(this.materials[this.activeClassId].uniforms.uTime.value=e,this.materials[this.activeClassId].uniforms.uAspect.value=window.innerWidth/(window.innerHeight||1),t&&(this.materials[this.activeClassId].uniforms.uAudioLow.value=t.bass||0,this.materials[this.activeClassId].uniforms.uAudioMid.value=t.mids||0,this.materials[this.activeClassId].uniforms.uAudioHigh.value=t.highs||0),i&&this.materials[this.activeClassId].uniforms.uMouse.value.set(i.x||0,i.y||0)),this.crossfadeData&&this.crossfadeData.active){let a=e-this.crossfadeData.startTime,o=Math.min(1,a/this.crossfadeData.duration);this.materials[this.crossfadeData.nextId]&&(this.materials[this.crossfadeData.nextId].uniforms.uAlpha.value=o),this.materials[this.crossfadeData.prevId]&&(this.materials[this.crossfadeData.prevId].uniforms.uAlpha.value=1-o),o>=1&&(this.crossfadeData.active=!1,this.activeClassId=this.crossfadeData.nextId)}}dispose(){if(this._boundCymaticsToggleMouseSync&&window.removeEventListener("cymaticsToggleMouseSync",this._boundCymaticsToggleMouseSync),this.dummyTexture&&(this.dummyTexture.dispose(),this.dummyTexture=null),this.meshes.forEach(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose(),this.group.remove(e)}),this.textureCache){for(const e in this.textureCache)this.textureCache[e]&&this.textureCache[e].dispose();this.textureCache={}}}}let x=null;class K{static get CYMATIC_PATTERNS(){return[{name:"3D Fractal Heart",classId:19,variationId:0,cat:"advanced"},{name:"Fluid SDF Core",classId:19,variationId:1,cat:"advanced"},{name:"Particle Swarm",classId:19,variationId:2,cat:"advanced"},{name:"Quantum Topology",classId:19,variationId:3,cat:"advanced"},{name:"Prime Prime",classId:19,variationId:4,cat:"advanced"},{name:"Metatron's Grid",classId:19,variationId:5,cat:"advanced"},{name:"Sacred Resonance",classId:1,variationId:0,cat:"sacred"},{name:"Plasma Bloom",classId:2,variationId:1,cat:"fractal"},{name:"Neural Web",classId:3,variationId:2,cat:"complex"},{name:"Void Geometry",classId:4,variationId:3,cat:"geometry"},{name:"Mandelbrot Fold",classId:5,variationId:4,cat:"fractal"},{name:"Celestial",classId:6,variationId:5,cat:"radial"},{name:"Cosmic Knot",classId:7,variationId:6,cat:"complex"},{name:"Synchronicity",classId:8,variationId:7,cat:"sacred"},{name:"Aetheric Weaver",classId:9,variationId:8,cat:"advanced"}]}constructor(e,t={}){this.canvas=e,this.activeModes=t.activeModes||new Set,this.mode=t.mode||"none",this.mindWaveMode=t.mindWaveMode!==void 0?t.mindWaveMode:!0,this.galaxySunStyle=t.galaxySunStyle||"sun",this.currentCymaticData={name:"Fundamental Zenith",n:1,m:1,energy:.2},this.cymaticsHistory=[],this.cymaticsHistoryIndex=-1,this._cymaticDriftOffset=Math.random()*1e3,this.cyberConfig={logicMode:t.cyberLogicMode||"matrix",customText:t.cyberCustomText||"WELCOME",angle:t.cyberAngle||0,speed:t.cyberSpeedMultiplier||1,length:1,color:"#00FF41",rainbow:!0},this.matrixConfig={logicMode:t.matrixLogicMode||"interstellar",customText:t.matrixCustomText||"MINDWAVE",angle:0,speed:1,length:1,color:"#00FF41",rainbow:!1},this.initialized=!1,this._rainbowEnabled=t.rainbowEnabled||!1,this.isVisualizer3D=!0,this.overlayCanvas=document.getElementById("cyberCanvas"),this.overlayCtx=this.overlayCanvas?this.overlayCanvas.getContext("2d",{alpha:!0}):null,this.overlayCanvas&&(this.resizeOverlayCanvas(),this._boundResizeOverlayCanvas=()=>this.resizeOverlayCanvas(),window.addEventListener("resize",this._boundResizeOverlayCanvas)),this.matrixCyberStreams=[],this.currentCyberAngle=t.cyberAngle!==void 0?t.cyberAngle:0,this.cyberColorCustomized=!1;try{const a=localStorage.getItem("cyberThemeHistory");this.themeHistory=a?JSON.parse(a):[],this.lastCyberFamily=localStorage.getItem("cyberLastFamily")||""}catch{this.themeHistory=[],this.lastCyberFamily=""}this.currentLogoOpacity=.8,this.targetLogoOpacity=.8,x=this,this.themeType=document.body.dataset.themeType||"dark";const i=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);this.batterySaver=t.batterySaver!==void 0?t.batterySaver:i,this.isLowPower=this.batterySaver||localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode"),this.lastFrameRenderTime=0,this.targetFPS=this.isLowPower?30:60,this.vibrationEnabled=typeof w<"u"&&w.visualVibration!==void 0?w.visualVibration:t.visualVibration!==void 0?t.visualVibration:!1,this._fpsRingBuffer=new Float64Array(60),this._fpsRingIndex=0,this._fpsRingCount=0,this.lastLodDegradation=0,this.currentLodLevel="high",this._tempColor=new G,this._logoRenderCanvas=null,this.sphereGroup=new P,this.particleGroup=new P,this.lightspeedGroup=new P,this.lavaGroup=new P,this.fireplaceGroup=new P,this.rainforestGroup=new P,this.zenGardenGroup=new P,this.oceanGroup=new P,this.wavesGroup=new P,this.cyberGroup=new P,this.boxGroup=new P,this.dragonGroup=new P,this.galaxyGroup=new P,this.mandalaGroup=new P,this.cymaticsGroup=new P,this.snowflakeGroup=new P,this._snowData=null;try{this.scene=new Ge,this.cymaticsCore=new ge(this.cymaticsGroup),[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup].forEach(r=>this.scene.add(r)),this.camera=new qe(75,e.width/e.height,.1,1e3),this.renderer=new De({canvas:e,alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),this.renderer.autoClear=!1,this.renderer.setClearColor(0,0),this.renderer.setSize(e.clientWidth,e.clientHeight);const o=this.isLowPower?1:2;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,o)),this.textures={},this.customColors={},this.customColor=null,this._isRendering=!1,this._freqDataArray=null,this.initEnvironment(),this.camera.position.z=5,this.handleLayoutChange=this.handleLayoutChange.bind(this);let s=null;this._boundResize=()=>{s||(s=requestAnimationFrame(()=>{this.resize(),this.handleLayoutChange(),s=null}))},window.addEventListener("resize",this._boundResize),window.addEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode=()=>{this.currentLodLevel!=="low"&&(this.degradeLOD(),this.degradeLOD())},window.addEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange=()=>{document.hidden||(this.lastTime=performance.now()*.001%(2e3*Math.PI),this.active!==!1&&this.initialized&&this.render(w.analyserLeft,w.analyserRight))},document.addEventListener("visibilitychange",this._boundVisibilityChange),this._boundContextLost=r=>{r.preventDefault(),this.active=!1,w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null)},e.addEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored=()=>{try{for(this.initialized=!1,this._freqDataArray=null,this.cymaticsCore&&this.cymaticsCore.dispose();this.cymaticsGroup.children.length>0;)this.cymaticsGroup.remove(this.cymaticsGroup.children[0]);if(this.cymaticsCore=new ge(this.cymaticsGroup),this.currentCymaticData&&this.setCymaticByName(this.currentCymaticData.name),this.textures)for(const r in this.textures)this.textures[r]&&(this.textures[r].needsUpdate=!0);this.initEnvironment(),this.updateVisibility(),this.initialized=!0,this.active=!0,this.lastTime=performance.now()*.001%(2e3*Math.PI),w.animationId&&cancelAnimationFrame(w.animationId),this._isRendering=!1,this.render(w.analyserLeft,w.analyserRight)}catch{}},e.addEventListener("webglcontextrestored",this._boundContextRestored),this.resize(),setTimeout(this.handleLayoutChange,100),this._boundThemeChange=r=>{if(r.detail&&r.detail.type){const n=r.detail.type;this.themeType!==n&&(this.themeType=n,this.updateLogoTexture())}},window.addEventListener("themeChanged",this._boundThemeChange),this.speedMultiplier=1,this.brightnessMultiplier=1,this.lastTime=performance.now()*.001%(2e3*Math.PI),this.simTime=0,this.targetFPS=60,this.lastFrameRenderTime=0,this.active=!0,this.updateVisibility(),this.initialized=!0,this.initOverlayLogo(),window.viz3D=this}catch{this.initialized=!1}}resize(){if(!this.renderer||!this.canvas||!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/(t||1),this.camera.updateProjectionMatrix(),this.handleLayoutChange()}handleLayoutChange(){!this.renderer||!this.camera||this.camera.clearViewOffset()}resizeOverlayCanvas(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight)}generateCyberStyle(){const e=this.overlayCanvas,t=this.overlayCtx;if(!e||!t)return;this.matrixCyberStreams=[];const i=Math.max(11,Math.min(21,Math.floor(e.width/50)));this.isLowPower=localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode");let a=Math.ceil(e.width/i);this.isLowPower||(a*=1.5);let o=window.getCurrentTheme?window.getCurrentTheme():{color:"#2dd4bf"};this.resizeOverlayCanvas(),this.cyberColorCustomized=!1;const s=[{name:"System Yellow",color:"#FFFF00",family:"yellow"},{name:"Neon Pink",color:"#FF1493",family:"pink"},{name:"Chrome Static",color:"#C0C0C0",family:"mono"},{name:"Royal Data",color:"#4169E1",family:"blue"},{name:"White Noise",color:"#FFFFFF",family:"mono"},{name:"Cyan Future",color:"#00FFFF",family:"blue"},{name:"Lime Access",color:"#32CD32",family:"green"},{name:"Purple Haze",color:"#800080",family:"purple"},{name:"Emerald Link",color:"#50C878",family:"green"},{name:"Ice Blue",color:"#A5F2F3",family:"blue"},{name:"sentAIent Blue",color:"#60A9FF",family:"blue"},{name:"Rainbow Surge",color:"rainbow",family:"rainbow"}],r=this.lastCyberFamily||"";let n=s.filter(c=>!this.themeHistory.includes(c.name));const p=n.filter(c=>c.family!==r);p.length>0&&(n=p);let h=n;if(h.length===0){const c=this.themeHistory[this.themeHistory.length-1];h=s.filter(f=>f.name!==c)}const l=h[Math.floor(Math.random()*h.length)];this.themeHistory.push(l.name),this.themeHistory.length>5&&this.themeHistory.shift(),this.lastCyberFamily=l.family;try{localStorage.setItem("cyberThemeHistory",JSON.stringify(this.themeHistory)),localStorage.setItem("cyberLastFamily",this.lastCyberFamily)}catch{}this.cyberSpeedMultiplier===void 0&&(this.cyberSpeedMultiplier=.2),this.cyberLengthMultiplier===void 0&&(this.cyberLengthMultiplier=.7);const v=document.getElementById("cyberRainbowToggle");if(v&&this.cyberRainbowMode===void 0&&(this.cyberRainbowMode=!0,this.cyberConfig.rainbow=!0,v.checked=!0),!this.cyberRainbowMode&&o.color!=="rainbow"){this.cyberColor=o.color;const c=document.getElementById("cyberColorPicker");c&&(c.value=this.cyberColor)}for(let c=0;c<a;c++){const f=Math.random(),u=Math.floor(8+f*11),g=(2+f*8+Math.random()*2)*this.cyberSpeedMultiplier;this.matrixCyberStreams.push({x:c*i,y:Math.random()*this.overlayCanvas.height*1.5-this.overlayCanvas.height*.5,baseSpeed:g,opacity:.2+f*.8,size:u,chars:[],color:o.color!=="rainbow"?o.color:"#FFFFFF"})}this.updateCyberStrings(),this.matrixCyberStreams.sort((c,f)=>c.size-f.size)}renderCyberCyber(){const e=this.activeModes.has("cyber");if(!this.overlayCtx||!this.matrixCyberStreams||!e)return;const t=this.overlayCtx,i=this.overlayCanvas;t.clearRect(0,0,i.width,i.height);const a=this.activeModes.size>1;t.fillStyle=a?"rgba(0, 0, 0, 0.4)":"rgba(0, 0, 0, 0.85)",t.fillRect(0,0,i.width,i.height),t.save(),t.textAlign="center";const o=this.cyberConfig,s=o.speed||1,r=o.length||1;o.angle!==0&&(t.translate(i.width/2,i.height/2),t.rotate(o.angle*Math.PI/180),t.translate(-i.width/2,-i.height/2));const n=20,p=Date.now()*.1;t.textBaseline="middle";let h=-1;this.matrixCyberStreams.forEach((l,v)=>{l.y+=l.baseSpeed*s;let c=Math.max(3,Math.floor(n*r));(this.isLowPower||this.currentLodLevel==="low")&&(c=Math.floor(c*.4)),l.y-c*l.size>i.height*1.5&&(l.y=0);const f="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";l.size!==h&&(t.font=`${l.size}px monospace`,h=l.size);const u=this.isLowPower&&this.currentLodLevel==="low"?2:1;for(let g=0;g<c&&g<l.chars.length;g+=u){!l.isTextMode&&Math.random()<.02&&(l.chars[g]=f.charAt(Math.floor(Math.random()*f.length)));const A=l.chars[g],D=l.y-g*l.size;if(D<-l.size*2||D>i.height*1.5)continue;const S=1-g/c,_=Math.pow(S,.4)*(l.opacity*1.2);if(t.globalAlpha=Math.min(1,_),this.cyberRainbowMode){const z=(p+v*15+g*5)%360;t.fillStyle=`hsl(${z}, 100%, 60%)`}else t.fillStyle=l.color||this.cyberColor;t.fillText(A,l.x,D)}}),t.shadowBlur=0,t.globalAlpha=1,t.restore()}initSphere(){var s;const e=new ee(2,2),t=new L({color:6334975,wireframe:!0,transparent:!0,opacity:.5});this.sphere=new q(e,t);const i=new ee(1.8,1),a=new L({color:6334975,transparent:!0,opacity:.1,blending:I});this.core=new q(i,a),this.sphereGroup.add(this.sphere),this.sphereGroup.add(this.core),this.sphereGroup.visible=!1;const o=((s=this.customColors)==null?void 0:s.sphere)||this.customColor;o&&(this.sphere.material.color.copy(o),this.core.material.color.copy(o))}initLightspeed(){const t=new k,i=new Float32Array(2e3*3);for(let a=0;a<2e3*3;a++)i[a]=(Math.random()-.5)*80;t.setAttribute("position",new U(i,3)),this.lightspeedMaterial=new E({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new G(3003583)},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:I,depthWrite:!1}),this.lightspeed=new N(t,this.lightspeedMaterial),this.lightspeedGroup.add(this.lightspeed)}initParticles(){const e=this.batterySaver?400:1e3,t=new k,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let o=0;o<e;o++){const s=o*3;i[s]=(Math.random()-.5)*60,i[s+1]=(Math.random()-.5)*60,i[s+2]=(Math.random()-.5)*80;const r=Math.random();r<.3?(a[s]=.4,a[s+1]=.7,a[s+2]=1):r<.6?(a[s]=.3,a[s+1]=.9,a[s+2]=.95):r<.85?(a[s]=.6,a[s+1]=.4,a[s+2]=1):(a[s]=.9,a[s+1]=.9,a[s+2]=1)}t.setAttribute("position",new U(i,3)),t.setAttribute("color",new U(a,3)),this.particleMaterial=new E({uniforms:{uTime:{value:0},uSpeed:{value:1},uSize:{value:.4},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:I,depthWrite:!1}),this.particles=new N(t,this.particleMaterial),this.particleGroup.add(this.particles),this.particleGroup.visible=!1}initBox(){var h;this.boxOuter=new P;const e=new ie(new ae(3,3,3)),t=new Z({color:16777215,transparent:!0,opacity:.9,blending:I}),i=new Z({color:3900150,transparent:!0,opacity:.5,blending:I});this.boxOuter.add(new $(e,t));for(let l=1;l<=3;l++){const v=new $(e,i);v.scale.setScalar(1+l*.012),this.boxOuter.add(v)}const a=new ie(new ae(2,2,2)),o=new Z({color:14742270,transparent:!0,opacity:.8,blending:I}),s=new Z({color:6333946,transparent:!0,opacity:.4,blending:I});this.boxInner=new P,this.boxInner.add(new $(a,o));for(let l=1;l<=2;l++){const v=new $(a,s);v.scale.setScalar(1+l*.015),this.boxInner.add(v)}const r=new ie(new ae(3.05,3.05,3.05)),n=new Z({color:9684477,transparent:!0,opacity:.8,blending:I});this.boxEdges=new $(r,n),this.boxGroup.add(this.boxOuter),this.boxGroup.add(this.boxInner),this.boxGroup.add(this.boxEdges),this.boxGroup.visible=!1;const p=((h=this.customColors)==null?void 0:h.box)||this.customColor;p&&(this.boxOuter.children.forEach(l=>l.material.color.copy(p)),this.boxInner.children.forEach(l=>l.material.color.copy(p)),this.boxEdges&&this.boxEdges.material&&this.boxEdges.material.color.copy(p))}initDragon(){var v;this.dragonDummy=new _e,this.dragonLength=80;const e=new ee(.8,1),t=new L({color:15680580,wireframe:!0,transparent:!0,opacity:.8,blending:I}),i=new ee(.5,1),a=new L({color:16096779,wireframe:!1,transparent:!0,opacity:.6,blending:I});this.dragonBodyInstanced=new he(e,t,this.dragonLength),this.dragonGlowInstanced=new he(i,a,this.dragonLength);const o=new oe(1.5,3.5,5);o.rotateX(Math.PI/2);const s=new L({color:16638023,wireframe:!0,transparent:!0,opacity:.9,blending:I});this.dragonHead=new q(o,s),this.dragonPearlGroup=new P;const r=new te(1,16,16),n=new L({color:3718648,wireframe:!1,transparent:!0,opacity:.9,blending:I}),p=new te(1.3,16,16),h=new L({color:8246268,wireframe:!0,transparent:!0,opacity:.5,blending:I});this.dragonPearl=new q(r,n),this.dragonPearlHalo=new q(p,h),this.dragonPearlGroup.add(this.dragonPearl),this.dragonPearlGroup.add(this.dragonPearlHalo),this.dragonGroup.add(this.dragonBodyInstanced),this.dragonGroup.add(this.dragonGlowInstanced),this.dragonGroup.add(this.dragonHead),this.dragonGroup.add(this.dragonPearlGroup),this.dragonGroup.visible=!1;const l=((v=this.customColors)==null?void 0:v.dragon)||this.customColor;l&&this.updateDragonColor(l)}updateGalaxyColor(e){if(this.galaxySunMesh&&this.galaxySunMesh.traverse(t=>{t.isMesh&&t.material&&t.material.color.copy(e)}),this.galaxyStars&&this.galaxyStars.geometry){const t={};e.getHSL(t);const i=(t.h+.5)%1,a=this.galaxyStars.geometry.getAttribute("color");if(a){const o=a.count,s=this._tempColor;for(let r=0;r<o;r++){const n=r/o,p=n<.2?.8:n<.5?.6:.4+Math.random()*.15,h=.6+Math.random()*.3;s.setHSL(i,h,p),a.setXYZ(r,s.r,s.g,s.b)}a.needsUpdate=!0}}}updateDragonColor(e){if(!this.dragonBodyInstanced)return;this.dragonBodyInstanced.material.color.copy(e),this.dragonHead.material.color.copy(e);const t={};e.getHSL(t);const i=(t.h+.5)%1,a=new G().setHSL(i,t.s,t.l);this.dragonGlowInstanced.material.color.copy(a)}initGalaxy(){const e=this.batterySaver?500:1500,t=new k,i=[],a=[],o=[];for(let n=0;n<e;n++){const p=n/e*Math.PI*10,h=2.5+n/e*20+Math.random()*2,l=n%4*(Math.PI*2/4),v=Math.max(.5,n/e*4),c=Math.cos(p+l)*h+(Math.random()-.5)*v,f=(Math.random()-.5)*1.5,u=Math.sin(p+l)*h+(Math.random()-.5)*v;i.push(c,f,u);const g=n/e;g<.2?a.push(1,.95,.7):g<.5?a.push(.7+Math.random()*.3,.8,1):a.push(.4+Math.random()*.2,.3+Math.random()*.3,.8+Math.random()*.2),o.push(Math.random()<.05?.4+Math.random()*.3:.08+Math.random()*.15)}t.setAttribute("position",new H(i,3)),t.setAttribute("color",new H(a,3)),t.setAttribute("size",new H(o,1));const s=this.createStarTexture(),r=new se({size:.25,vertexColors:!0,map:s,transparent:!0,opacity:.9,blending:I,depthWrite:!1,sizeAttenuation:!0});this.galaxyStars=new N(t,r),this.galaxyGroup.add(this.galaxyStars),this.galaxySunStyle=this.galaxySunStyle||"sun",this.createGalaxySun(this.galaxySunStyle),this.galaxyGroup.visible=!1}createGalaxySun(e){this.galaxySunMesh&&(this.galaxyGroup.remove(this.galaxySunMesh),this.galaxySunMesh=null),this.galaxySunMesh=new P;const t=new L({color:4892415,transparent:!0,opacity:.85,blending:I,depthWrite:!1,side:X}),i=new P;if(e==="sun2"){const a=t.clone();a.side=Fe;const o=new me(1.5,.25,16,64);i.add(new q(o,a));const s=8,r=new oe(.4,2.7,4);r.translate(0,2.7/2,0);const n=new oe(.2,1.7,4);n.translate(0,1.7/2,0);for(let p=0;p<s;p++){const h=p/s*Math.PI*2,l=new q(r,a);l.rotation.z=-h,l.position.set(Math.sin(h)*1.5,Math.cos(h)*1.5,0),i.add(l);const v=h+Math.PI/s,c=new q(n,a);c.rotation.z=-v,c.position.set(Math.sin(v)*1.5,Math.cos(v)*1.5,0),i.add(c)}}else if(e==="sun3"){const a={uTime:{value:0},uColor:{value:t.color},uBassIntt:{value:0}};this.galaxySunUniforms=a;const o=`
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
            `,s=`
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
            `,r=new E({vertexShader:o,fragmentShader:s,uniforms:a,transparent:!0,blending:I,depthWrite:!1,side:X}),n=new te(2,64,64),p=new q(n,r);i.add(p);const h=new L({color:t.color,transparent:!0,opacity:.15,blending:I,depthWrite:!1,side:Re}),l=new te(3,32,32);i.add(new q(l,h))}else{const a=new me(1.5,.12,8,64);i.add(new q(a,t));const o=8;for(let s=0;s<o;s++){const r=s/o*Math.PI*2,n=new de;n.moveTo(-.4,0),n.lineTo(.4,0),n.lineTo(0,2.7),n.lineTo(-.4,0);const p=new pe(n),h=new q(p,t);h.rotation.z=-r,h.position.set(Math.sin(r)*1.5,Math.cos(r)*1.5,0),i.add(h);const l=r+Math.PI/o,v=new de;v.moveTo(-.2,0),v.lineTo(.2,0),v.lineTo(0,1.7),v.lineTo(-.2,0);const c=new pe(v),f=new q(c,t);f.rotation.z=-l,f.position.set(Math.sin(l)*1.5,Math.cos(l)*1.5,0),i.add(f)}}this.galaxySunMesh.add(i),this.galaxySunMesh.position.set(0,0,.1),this.galaxyGroup.add(this.galaxySunMesh)}setGalaxySunStyle(e){e!=="sun"&&e!=="sun2"&&e!=="sun3"||(this.galaxySunStyle=e,this.galaxyGroup&&this.galaxyGroup.children.length>0&&this.createGalaxySun(e))}setGalaxySunRotation(e,t){e==="x"&&(this.sunRotationSpeedX=parseFloat(t)),e==="y"&&(this.sunRotationSpeedY=parseFloat(t)),e==="z"&&(this.sunRotationSpeedZ=parseFloat(t))}createStarTexture(){if(this.textures.star)return this.textures.star;const e=64,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),a=e/2,o=e/2;i.clearRect(0,0,e,e);const s=i.createRadialGradient(a,o,0,a,o,e/2);return s.addColorStop(0,"rgba(255, 255, 255, 1.0)"),s.addColorStop(.1,"rgba(255, 255, 240, 0.8)"),s.addColorStop(.25,"rgba(255, 255, 200, 0.3)"),s.addColorStop(.5,"rgba(200, 200, 255, 0.1)"),s.addColorStop(1,"rgba(100, 100, 255, 0)"),i.fillStyle=s,i.fillRect(0,0,e,e),i.fillStyle="rgba(255, 255, 255, 0.6)",i.beginPath(),i.moveTo(0,o-1),i.lineTo(a,o-.5),i.lineTo(e,o-1),i.lineTo(e,o+1),i.lineTo(a,o+.5),i.lineTo(0,o+1),i.closePath(),i.fill(),i.beginPath(),i.moveTo(a-1,0),i.lineTo(a-.5,o),i.lineTo(a-1,e),i.lineTo(a+1,e),i.lineTo(a+.5,o),i.lineTo(a+1,0),i.closePath(),i.fill(),i.beginPath(),i.arc(a,o,2,0,Math.PI*2),i.fillStyle="rgba(255, 255, 255, 1.0)",i.fill(),this.textures.star=new Q(t),this.textures.star}initMandala(){var o;this.mandalaRings=[];const e=[2450411,15357964,3900150,16347926,12573694];for(let s=0;s<5;s++){const r=1.2+s*.8,n=6+s*6,p=new Le(r-.05,r+.05,n),h=new L({color:e[s],side:X,transparent:!0,opacity:.4-s*.05,blending:I}),l=new q(p,h);l.userData={speed:(.01+s*.005)*(s%2===0?1:-1),segments:n},this.mandalaRings.push(l),this.mandalaGroup.add(l)}const t=new Ve(.3,32),i=new L({color:16347926,transparent:!0,opacity:.6,blending:I});this.mandalaCenter=new q(t,i),this.mandalaGroup.add(this.mandalaCenter),this.mandalaGroup.visible=!1;const a=(o=this.customColors)==null?void 0:o.mandala;a&&(this.mandalaRings.forEach(s=>s.material.color.copy(a)),this.mandalaCenter.material.color.copy(a))}createSnowflakeTexture(){if(this.textures.snowflake)return this.textures.snowflake;const e=128,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),a=e/2,o=e/2;i.clearRect(0,0,e,e);const s=i.createRadialGradient(a,o,0,a,o,e*.5);s.addColorStop(0,"rgba(200,230,255,0.5)"),s.addColorStop(.4,"rgba(180,220,255,0.15)"),s.addColorStop(1,"rgba(150,200,255,0)"),i.fillStyle=s,i.fillRect(0,0,e,e),i.strokeStyle="rgba(220,240,255,1.0)",i.lineCap="round";for(let r=0;r<6;r++){const n=r/6*Math.PI*2;i.save(),i.translate(a,o),i.rotate(n),i.lineWidth=2.5,i.beginPath(),i.moveTo(0,0),i.lineTo(0,-52),i.stroke();const p=[{d:18,len:14,angle:Math.PI/4},{d:32,len:20,angle:Math.PI/4},{d:46,len:10,angle:Math.PI/5}];i.lineWidth=1.5,p.forEach(({d:h,len:l,angle:v})=>{[1,-1].forEach(c=>{i.beginPath(),i.moveTo(0,-h),i.lineTo(c*l*Math.cos(Math.PI/2-v),-h-l*Math.sin(Math.PI/2-v)),i.stroke()})}),i.restore()}i.beginPath();for(let r=0;r<6;r++){const n=r/6*Math.PI*2-Math.PI/6,p=a+Math.cos(n)*4,h=o+Math.sin(n)*4;r===0?i.moveTo(p,h):i.lineTo(p,h)}return i.closePath(),i.fillStyle="rgba(255, 255, 255, 0.8)",i.fill(),this.textures.snowflake=new Q(t),this.textures.snowflake}initSnowflake(){for(;this.snowflakeGroup.children.length>0;){const c=this.snowflakeGroup.children[0];this.snowflakeGroup.remove(c),c.traverse(f=>{if(f.geometry&&f.geometry.dispose(),f.material){if(f.material.map&&f.material.map.dispose(),f.material.uniforms)for(const u in f.material.uniforms)f.material.uniforms[u]&&f.material.uniforms[u].value&&f.material.uniforms[u].value.dispose&&f.material.uniforms[u].value.dispose();f.material.dispose()}})}this._snowData=null;const e=700,t=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e),o=new Float32Array(e),s=new Float32Array(e),r=new Float32Array(e),n=new Float32Array(e);for(let c=0;c<e;c++){const f=c*3;t[f]=(Math.random()-.5)*80,t[f+1]=(Math.random()-.5)*60,t[f+2]=-40+Math.random()*35;const u=(t[f+2]+40)/35;i[c]=1.5+u*8,a[c]=.2+u*.6,o[c]=Math.random()*Math.PI*2,s[c]=.015+Math.random()*.04+u*.03,r[c]=.01+Math.random()*.02,n[c]=.4+Math.random()*.8}const p=new k;p.setAttribute("position",new U(t,3)),p.setAttribute("aSize",new U(i,1)),p.setAttribute("aOpacity",new U(a,1));const h=this.createSnowflakeTexture(),l=new E({uniforms:{uTexture:{value:h},uColor:{value:this.customColor?this.customColor.clone():new G(10875883)},uIntensity:{value:0},uSizeMultiplier:{value:1},uGlowAmount:{value:.5}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:I}),v=new N(p,l);this.snowflakeGroup.add(v),this._snowData={count:e,positions:t,phases:o,speeds:s,drifts:r,driftFreqs:n,points:v,material:l,spinMeshes:[],spinSpeeds:[]}}setSnowSize(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uSizeMultiplier.value=Math.max(.2,Math.min(4,e)))}setSnowGlow(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uGlowAmount.value=Math.max(0,Math.min(1,e)))}initLava(){var s;this.lavaBlobs=[];const e=16;this.lavaUniforms={uBlobs:{value:[]},uColor:{value:new G(((s=w.visualColors)==null?void 0:s.lava)||16737792)},uSecondaryColor:{value:new G(16755200)},uTime:{value:0},uIntensity:{value:0},uResolution:{value:new ne(window.innerWidth,window.innerHeight)}};for(let r=0;r<e;r++)this.lavaUniforms.uBlobs.value.push(new Ee(0,-100,0,0));const t=new E({uniforms:this.lavaUniforms,vertexShader:`
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
            `,transparent:!0,blending:I,depthWrite:!1,side:X}),i=new j(100,100),a=new q(i,t);a.position.z=-5,[{count:5,minSize:1,maxSize:1.5},{count:7,minSize:1.5,maxSize:2.2},{count:4,minSize:2.2,maxSize:3.5}].forEach(r=>{for(let n=0;n<r.count;n++){const p=r.minSize+Math.random()*(r.maxSize-r.minSize),h=["heating","rising","cooling","falling"],l=h[Math.floor(Math.random()*h.length)],v=-18+Math.random()*4,c=18+Math.random()*4;let f=0,u=.5;l==="heating"?(f=v,u=Math.random()*.5):l==="rising"?(f=v+Math.random()*(c-v),u=.8+Math.random()*.2):l==="cooling"?(f=c,u=1-Math.random()*.3):l==="falling"&&(f=c-Math.random()*(c-v),u=.2+Math.random()*.3),this.lavaBlobs.push({position:new Be((Math.random()-.5)*12,f,(Math.random()-.5)*6),material:{uniforms:{uTemp:{value:0},uIntensity:{value:0},uTime:{value:0}}},userData:{baseSize:p,state:l,temperature:u,floatMin:v,floatMax:c,heatRate:.15+Math.random()*.3,coolRate:.15+Math.random()*.3,riseSpeed:(.04+Math.random()*.05)/(p*.5),fallSpeed:(.05+Math.random()*.05)/(p*.5),driftPhase:Math.random()*Math.PI*2,driftSpeed:.01+Math.random()*.02}})}}),this.lavaGroup.add(a),this.lavaGroup.visible=!1}initFireplace(){const i=new j(100,80);this.fireMaterial=this.createFireShader(),this.fireMesh=new q(i,this.fireMaterial),this.fireMesh.position.set(0,0,-15),this.fireMesh.renderOrder=10,this.fireplaceGroup.add(this.fireMesh),this.fireLight=new Oe(16737792,5,200),this.fireLight.position.set(0,0,30),this.fireplaceGroup.add(this.fireLight);const a=650,o=new k,s=[];for(let r=0;r<a;r++)s.push((Math.random()-.5)*100,-20+Math.random()*40,-15+(Math.random()-.5)*20);o.setAttribute("position",new H(s,3)),this.emberMat=new se({color:16763904,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.8,blending:I,depthWrite:!1}),this.embers=new N(o,this.emberMat),this.fireplaceGroup.add(this.embers),this.emberVelocities=new Float32Array(a);for(let r=0;r<a;r++)this.emberVelocities[r]=.02+Math.random()*.05;this.fireplaceGroup.position.set(0,0,0),this.fireplaceGroup.visible=!1}createFireShader(){return new E({uniforms:{uTime:{value:0},uColor:{value:new G(16729088)},uSpeed:{value:1},uIntensity:{value:1}},vertexShader:`
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
            `,transparent:!0,side:X,blending:I,depthWrite:!1})}initRainforest(){const e=this.batterySaver?400:1e3,t=new k,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let o=0;o<e;o++){const s=o*3;i[s]=(Math.random()-.5)*60,i[s+1]=(Math.random()-.5)*40,i[s+2]=(Math.random()-.5)*40,a[s]=Math.random(),a[s+1]=Math.random(),a[s+2]=.08+Math.random()*.12}t.setAttribute("position",new U(i,3)),t.setAttribute("aRandom",new U(a,3)),this.rainMaterial=new E({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new G(8965375)},uIntensity:{value:.6}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:I}),this.raindrops=new N(t,this.rainMaterial),this.rainforestGroup.add(this.raindrops),this.rainforestGroup.visible=!1}initZenGarden(){const e=this.batterySaver?200:500,t=new k,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let s=0;s<e;s++){const r=s*3;i[r]=(Math.random()-.5)*40,i[r+1]=(Math.random()-.5)*20,i[r+2]=(Math.random()-.5)*40,a[r]=Math.random(),a[r+1]=Math.random(),a[r+2]=Math.random()*Math.PI*2}t.setAttribute("position",new U(i,3)),t.setAttribute("aRandom",new U(a,3)),this.petalMaterial=new E({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new G(16758725)},uIntensity:{value:.8}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1}),this.petals=new N(t,this.petalMaterial),this.zenGardenGroup.add(this.petals);const o=new j(40,40,32,32);this.zenWaterMaterial=new L({color:2245734,transparent:!0,opacity:.3,side:X}),this.zenWater=new q(o,this.zenWaterMaterial),this.zenWater.rotation.x=-Math.PI/2,this.zenWater.position.y=-5,this.zenGardenGroup.add(this.zenWater),this.zenGardenGroup.visible=!1}initOcean(){var r;const e=new j(300,100,128,64);this.oceanWave=new q(e,new E({uniforms:{uTime:{value:0},uColor:{value:this.customColor?this.customColor.clone():new G(43775)},uNormBass:{value:0},uBeatPulse:{value:0}},vertexShader:`
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
            `,wireframe:!0,transparent:!0,side:X})),this.oceanWave.rotation.x=-Math.PI/3,this.oceanWave.position.y=-2,this.oceanGroup.add(this.oceanWave);const t=300,i=new k,a=[];for(let n=0;n<t;n++)a.push((Math.random()-.5)*50),a.push(-2.5+Math.random()*.5),a.push((Math.random()-.5)*40);i.setAttribute("position",new H(a,3));const o=new se({color:16777215,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.5,blending:I,depthWrite:!1});this.oceanFoam=new N(i,o),this.oceanGroup.add(this.oceanFoam),this.oceanGroup.visible=!1;const s=((r=this.customColors)==null?void 0:r.ocean)||this.customColor;s&&(this.oceanWave&&this.oceanWave.material.color.copy(s),this.oceanFoam&&this.oceanFoam.material.color.copy(s))}createCyberTexture(e=this.matrixConfig){const i=document.createElement("canvas");i.width=1024,i.height=1024;const a=i.getContext("2d");a.fillStyle="rgba(0,0,0,0)",a.fillRect(0,0,1024,1024),a.shadowBlur=12,a.shadowColor="rgba(255, 255, 255, 0.4)",a.font='bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace',a.fillStyle="#ffffff",a.textAlign="center",a.textBaseline="middle";const o=8,s=8,r=1024/o,n=1024/s;let p="🪷MINDWAVE";const h=e.logicMode,l=e.customText;h==="custom"||h==="txt"?p="🪷"+(l&&l.length>0?l:"WELCOME TO MINDWAVE"):(h==="random"||h==="rnd"||h==="matrix"||h==="int"||h==="interstellar")&&(p="");const v=h==="matrix"||h==="int"||h==="interstellar"?[]:["LOGO",...p],c=v.length;for(let u=0;u<64;u++){const g=u%8,A=Math.floor(u/8);a.fillStyle="rgba(0,0,0,0)",a.fillRect(g*r,A*n,r,n),a.save(),a.translate(g*r+r/2,A*n+n/2);let D="",S=!1;if(u<c){const _=v[u];_==="LOGO"?S=!0:D=_}else{const z="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";D=z.charAt(Math.floor(Math.random()*z.length)),Math.random()>.5&&(a.save(),a.scale(-1,1),a.fillStyle="#ffffff",a.font="bold 80px monospace",a.fillText(D,0,0),a.restore(),D="")}if(D||S)if(a.fillStyle="#ffffff",a.font="bold 80px monospace",a.textAlign="center",a.textBaseline="middle",a.shadowBlur=16,a.shadowColor="rgba(255, 255, 255, 0.6)",S)if(this.logoImage){const C=document.createElement("canvas");C.width=100,C.height=100;const F=C.getContext("2d");F.imageSmoothingEnabled=!0,F.imageSmoothingQuality="high",F.drawImage(this.logoImage,0,0,100,100);const Y=F.getImageData(0,0,100,100),R=Y.data;for(let V=0;V<R.length;V+=4){const B=180+(R[V]+R[V+1]+R[V+2])/3/255*75;R[V]=B,R[V+1]=B,R[V+2]=B}F.putImageData(Y,0,0),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(C,-50,-50,100,100)}else!this.logoLoading&&!this.logoFailed&&(this.logoLoading=!0,new Ue().load("./mindwave-logo-icon.png",z=>{if(this.logoImage=z,this.logoLoading=!1,this.cyberMaterial){const C=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=C}},void 0,z=>{this.logoFailed=!0,this.logoLoading=!1})),a.font="bold 80px monospace",a.fillStyle="#2dd4bf",a.fillText("🪷",0,0);else a.fillText(D,0,0);a.restore()}const f=new Q(i);return f.magFilter=ve,f.minFilter=ve,f}createCyberShader(e,t=this.matrixConfig){return new E({uniforms:{uTexture:{value:e},uColor:{value:new G(t.color||65345)},uHeadColor:{value:new G(15794160)},uTime:{value:0},uSpeed:{value:t.speed||1},uTailLength:{value:t.length||1},uRainbow:{value:t.rainbow?1:0},uBrightness:{value:this.brightnessMultiplier||1}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:I})}initEnvironment(){this.sunLight&&this.scene.remove(this.sunLight),this.ambientLight&&this.scene.remove(this.ambientLight),this.sunLight=new ke(16774625,1.2),this.sunLight.position.set(50,100,50),this.scene.add(this.sunLight),this.ambientLight=new Ne(4210752,.6),this.scene.add(this.ambientLight)}ensureInitialized(e){const t=`[VizInit] ${e}`;e==="sphere"&&(!this.sphereGroup||this.sphereGroup.children.length===0)&&this.initSphere(),e==="particles"&&(!this.particleGroup||this.particleGroup.children.length===0)&&this.initParticles(),e==="lightspeed"&&(!this.lightspeedGroup||this.lightspeedGroup.children.length===0)&&this.initLightspeed(),e==="waves"&&(!this.wavesGroup||this.wavesGroup.children.length===0)&&this.initWaves(),e==="lava"&&(!this.lavaGroup||this.lavaGroup.children.length===0)&&this.initLava(),e==="fireplace"&&(!this.fireplaceGroup||this.fireplaceGroup.children.length===0)&&this.initFireplace(),e==="rainforest"&&(!this.rainforestGroup||this.rainforestGroup.children.length===0)&&this.initRainforest(),e==="zengarden"&&(!this.zenGardenGroup||this.zenGardenGroup.children.length===0)&&this.initZenGarden(),e==="ocean"&&(!this.oceanGroup||this.oceanGroup.children.length===0)&&this.initOcean(),(e==="cyber"||e==="matrix")&&(!this.cyberGroup||this.cyberGroup.children.length===0)&&this.initCyber(),e==="box"&&(!this.boxGroup||this.boxGroup.children.length===0)&&this.initBox(),e==="dragon"&&(!this.dragonGroup||this.dragonGroup.children.length===0)&&this.initDragon(),e==="galaxy"&&(!this.galaxyGroup||this.galaxyGroup.children.length===0)&&this.initGalaxy(),e==="mandala"&&(!this.mandalaGroup||this.mandalaGroup.children.length===0)&&this.initMandala(),e==="snowflake"&&(!this.snowflakeGroup||this.snowflakeGroup.children.length===0)&&this.initSnowflake()}initCyber(){for(;this.cyberGroup.children.length>0;){const c=this.cyberGroup.children[0];this.cyberGroup.remove(c),c.traverse(f=>{if(f.geometry&&f.geometry.dispose(),f.material){if(f.material.map&&f.material.map.dispose(),f.material.uniforms)for(const u in f.material.uniforms)f.material.uniforms[u]&&f.material.uniforms[u].value&&f.material.uniforms[u].value.dispose&&f.material.uniforms[u].value.dispose();f.material.dispose()}})}this.cyberRotationGroup=null,this.cyberPoints=null;const e=80,t=120,i=new k,a=[],o=[],s=[],r=[],n=240,p=160,h=n/e,l=p/t;for(let c=0;c<e;c++){const f=c*h-n/2+Math.random()*.8*h,u=-20-Math.random()*2,g=.5+Math.random()*.5,A=this.matrixConfig,D=A.logicMode==="mindwave"||A.logicMode==="mw"||A.logicMode==="custom"||A.logicMode==="txt",S=A.logicMode==="matrix"||A.logicMode==="int"||A.logicMode==="interstellar",z=((A.logicMode==="custom"||A.logicMode==="txt")&&A.customText?"🪷"+A.customText:"MINDWAVE").length,C=S?Math.random()*100:0,F=S?.5+Math.random()*1.5:1,Y=Math.random()*100+C;for(let R=0;R<t;R++){const V=p/2-R*l;a.push(f,V,u),D?o.push(R%(z+1)):S?o.push(Math.floor(Math.random()*64)):o.push(9+Math.floor(Math.random()*55)),s.push(Y),r.push(g*F)}}i.setAttribute("position",new H(a,3)),i.setAttribute("aCharIndex",new H(o,1)),i.setAttribute("aSpawnTime",new H(s,1)),i.setAttribute("aSpeed",new H(r,1)),this.cyberGeometry=i;const v=this.createCyberTexture(this.matrixConfig);this.cyberMaterial=this.createCyberShader(v,this.matrixConfig),this.cyberRain=new N(i,this.cyberMaterial),this.cyberRain.frustumCulled=!1,this.cyberRain.renderOrder=-1,this.cyberRotationGroup=new P,this.cyberRotationGroup.add(this.cyberRain),this.cyberGroup.add(this.cyberRotationGroup),this.currentCyberAngle!==void 0&&(this.cyberRotationGroup.rotation.z=xe.degToRad(-this.currentCyberAngle))}setCyberMode(e){if(this.mindWaveMode!==e)if(this.mindWaveMode=e,this.cyberLogicMode=e?"mindwave":"classic",e&&this.cyberMaterial){const t=this.cyberMaterial.uniforms.uTexture.value,i=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=i,this.cyberMaterial.needsUpdate=!0,t&&t.dispose()}else this.initCyber()}setMode(e){const t=this.mapMode(e);this.activeModes.clear(),this.activeModes.add(t),this.mode=t,this.updateVisibility(),this.updateLabel(t)}mapMode(e){return{cube:"box",flow:"particles",zen:"zengarden",rain:"rainforest",interstellar:"matrix",ocean:"waves"}[e]||e}toggleMode(e){const t=this.mapMode(e);t==="matrix"&&!this.activeModes.has("matrix")&&(this.matrixConfig.logicMode||(this.matrixConfig.logicMode="interstellar")),t==="cyber"&&!this.activeModes.has("cyber")&&(this.cyberConfig.logicMode||(this.cyberConfig.logicMode="matrix"));const i=this.activeModes.has("cyber");this.activeModes.has(t)?this.activeModes.delete(t):(t==="cymatics"?this.activeModes.clear():this.activeModes.has("cymatics")&&this.activeModes.delete("cymatics"),this.activeModes.add(t)),this.active=this.activeModes.size>0,this.updateVisibility(),this.updateLabel(t),this.activeModes.forEach(a=>this.ensureInitialized(a)),this.initialized&&this.active&&!this._isRendering&&(w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null),this.render()),this.mode=t,this.updateVisibility(),this.activeModes.size===0&&!i&&(this.active=!1,this.renderer&&(this.renderer.autoClearColor=!0,this.renderer.clear(),this.renderer.render(this.scene,this.camera))),this.activeModes.size===1?this.updateLabel(Array.from(this.activeModes)[0]):this.activeModes.size>1?this.updateLabel("multi"):this.updateLabel("none"),window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}})),this.updateCyberStrings&&this.updateCyberStrings()}toggleGalaxySunStyle(){const e=this.galaxySunStyle==="sun"?"sun2":this.galaxySunStyle==="sun2"?"sun3":"sun";return this.setGalaxySunStyle(e),e}updateVisibility(){if(this.activeModes.forEach(e=>this.ensureInitialized(e)),this.sphereGroup&&(this.sphereGroup.visible=this.activeModes.has("sphere")),this.particleGroup&&(this.particleGroup.visible=this.activeModes.has("particles")),this.lightspeedGroup&&(this.lightspeedGroup.visible=this.activeModes.has("lightspeed")),this.wavesGroup&&(this.wavesGroup.visible=this.activeModes.has("waves")),this.oceanGroup&&(this.oceanGroup.visible=this.activeModes.has("ocean")),this.lavaGroup&&(this.lavaGroup.visible=this.activeModes.has("lava")),this.fireplaceGroup&&(this.fireplaceGroup.visible=this.activeModes.has("fireplace")),this.rainforestGroup&&(this.rainforestGroup.visible=this.activeModes.has("rainforest")),this.zenGardenGroup&&(this.zenGardenGroup.visible=this.activeModes.has("zengarden")),this.boxGroup&&(this.boxGroup.visible=this.activeModes.has("box")),this.dragonGroup&&(this.dragonGroup.visible=this.activeModes.has("dragon")),this.galaxyGroup&&(this.galaxyGroup.visible=this.activeModes.has("galaxy")),this.mandalaGroup&&(this.mandalaGroup.visible=this.activeModes.has("mandala")),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics")),this.snowflakeGroup){const e=this.cymaticMaterial&&Math.abs(this.cymaticMaterial.uniforms.uMedium.value-3)<.1;this.snowflakeGroup.visible=this.activeModes.has("snowflake")||this.activeModes.has("cymatics")&&e}this.cyberGroup&&(this.cyberGroup.visible=this.activeModes.has("matrix")),this.overlayCanvas&&(this.activeModes.has("cyber")?(this.overlayCanvas.classList.remove("hidden"),this.activeModes.has("matrix")?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1):this.activeModes.size>1?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:.7}})),this.wasAutoDimmed=!0):(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1),(!this.matrixCyberStreams||this.matrixCyberStreams.length===0)&&this.generateCyberStyle()):(this.overlayCanvas.classList.add("hidden"),this.wasAutoDimmed&&(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1))),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics"),this.cymaticsGroup.position.z=2),this.updateUIPanels()}updateUIPanels(){typeof window.updateConfigPanel=="function"&&window.updateConfigPanel()}updateLabel(e){const t=document.getElementById("visualLabel");t&&(e==="sphere"?t.textContent="BIO-RESONANCE":e==="particles"?t.textContent="NEURAL FLOW":e==="lightspeed"?t.textContent="WARP":e==="waves"||e==="ocean"?t.textContent="OCEAN":e==="lava"?t.textContent="LAVA LAMP":e==="fireplace"?t.textContent="FIREPLACE":e==="rainforest"?t.textContent="RAINFOREST":e==="zengarden"?t.textContent="ZEN GARDEN":e==="cymatics"?t.textContent="CYMATICS":e==="cyber"?t.textContent="CYBER":e==="matrix"?t.textContent="MATRIX":e==="snowflake"?t.textContent="SNOWFALL":e==="multi"?t.textContent="MULTI-SENSORY":t.textContent="")}initWaves(){for(this.wavesGroup||(this.wavesGroup=new P,this.scene.add(this.wavesGroup));this.wavesGroup.children.length>0;){const t=this.wavesGroup.children[0];this.wavesGroup.remove(t),t.traverse(i=>{if(i.geometry&&i.geometry.dispose(),i.material){if(i.material.map&&i.material.map.dispose(),i.material.uniforms)for(const a in i.material.uniforms)i.material.uniforms[a]&&i.material.uniforms[a].value&&i.material.uniforms[a].value.dispose&&i.material.uniforms[a].value.dispose();i.material.dispose()}})}const e=new j(80,80,160,160);this.wavesMaterial=new E({uniforms:{uTime:{value:0},uColor:{value:this.customColor?new G(this.customColor):new G(26367)},uSecondaryColor:{value:new G(62207)},uIntensity:{value:1},uNormBass:{value:0},uResolution:{value:new ne(window.innerWidth,window.innerHeight)}},vertexShader:`
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
            `,transparent:!0,wireframe:!1,side:X,extensions:{derivatives:!0}}),this.wavesMesh=new q(e,this.wavesMaterial),this.wavesMesh.rotation.x=-Math.PI/2.2,this.wavesMesh.position.y=-5,this.wavesMesh.position.z=-10,this.wavesGroup.add(this.wavesMesh)}setSpeed(e){this.speedMultiplier=e}setIntent(e){this.currentIntent=e,e==="delta"||e==="theta"?this.particles&&this.particles.material&&(this.particles.material.size=.3,this.particles.material.opacity=.5):e==="gamma"||e==="hyper-gamma"?(this.particles&&this.particles.material&&(this.particles.material.size=.08,this.particles.material.opacity=.9),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(16777215),this.cyberMaterial.uniforms.uTailLength.value=.4)):(this.particles&&this.particles.material&&(this.particles.material.size=.15,this.particles.material.opacity=.8),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(15794160),this.cyberMaterial.uniforms.uTailLength.value=1)),this.renderSingleFrame()}setColor(e,t=null){var i,a,o,s;this.customColors||(this.customColors={}),!t||t==="all"?(this.customColors={},this.customColor=new G(e)):this.customColors[t]=new G(e);try{const r=n=>{n&&(n.color&&typeof n.color.set=="function"?n.color.set(e):n.uniforms&&n.uniforms.uColor&&n.uniforms.uColor.value.set(e))};this.particles&&this.particles.material&&r(this.particles.material),this.lightspeed&&this.lightspeed.material&&r(this.lightspeed.material),this.sphere&&this.sphere.material&&(r(this.sphere.material),this.core&&this.core.material&&r(this.core.material)),(t==="box"||!t||t==="all")&&(this.boxOuter&&this.boxOuter.children.forEach(n=>r(n.material)),this.boxInner&&this.boxInner.children.forEach(n=>r(n.material)),this.boxEdges&&this.boxEdges.material&&r(this.boxEdges.material)),t==="mandala"&&(this.mandalaRings&&this.mandalaRings.forEach(n=>r(n.material)),this.mandalaCenter&&this.mandalaCenter.material&&r(this.mandalaCenter.material)),this.wavesMesh&&this.wavesMesh.material&&r(this.wavesMesh.material),this.lavaBlobs&&this.lavaBlobs.forEach(n=>r(n.material)),this.lavaGlow&&this.lavaGlow.material&&r(this.lavaGlow.material),this.flames&&this.flames.material&&r(this.flames.material),this.raindrops&&this.raindrops.material&&r(this.raindrops.material),this.petals&&this.petals.material&&r(this.petals.material),this.zenWater&&this.zenWater.material&&r(this.zenWater.material),this.oceanWave&&this.oceanWave.material&&r(this.oceanWave.material),this.oceanFoam&&this.oceanFoam.material&&r(this.oceanFoam.material),this.cyberRain&&this.cyberRain.material&&this.cyberRain.material.uniforms&&this.cyberRain.material.uniforms.uColor&&this.cyberRain.material.uniforms.uColor.value.set(e),this.logoMesh&&this.originalLogoImg&&this.updateLogoTexture(),this.dragonGroup&&this.updateDragonColor&&this.updateDragonColor(new G(e)),(this.galaxyStars||this.galaxySunMesh)&&this.updateGalaxyColor(new G(e)),this.cymaticMaterial&&((i=this.cymaticMaterial.uniforms)!=null&&i.uColor)&&this.cymaticMaterial.uniforms.uColor.value.set(e),(s=(o=(a=this._snowData)==null?void 0:a.material)==null?void 0:o.uniforms)!=null&&s.uColor&&this._snowData.material.uniforms.uColor.value.set(e)}catch{}this.renderSingleFrame()}renderSingleFrame(){!this.renderer||!this.scene||!this.camera||(this.renderer.clear(),this.renderer.render(this.scene,this.camera))}createCircleTexture(){if(this.textures.circle)return this.textures.circle;const e=32,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d");return i.beginPath(),i.arc(e/2,e/2,e/2,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),this.textures.circle=new Q(t),this.textures.circle}render(e,t){var i,a,o,s,r,n,p,h,l;if(!this.initialized||!this.renderer||document.hidden||!this.active){this._isRendering=!1;return}w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null),this._isRendering=!0;try{(typeof e=="number"||!e&&w.analyserLeft)&&(e=w.analyserLeft,t=w.analyserRight);let v=0,c=0,f=0;if(e){const m=e.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==m)&&(this._freqDataArray=new Uint8Array(m)),e.getByteFrequencyData(this._freqDataArray);let y=0;for(let M=0;M<15;M++)y+=this._freqDataArray[M]||0;v=Math.pow(y/15/255,.8);let T=0;for(let M=10;M<100;M++)T+=this._freqDataArray[M]||0;c=T/90/255;let b=0;for(let M=100;M<300;M++)b+=this._freqDataArray[M]||0;f=b/200/255,(isNaN(v)||!isFinite(v))&&(v=0),(isNaN(c)||!isFinite(c))&&(c=0),(isNaN(f)||!isFinite(f))&&(f=0)}const u=Math.max(.001,this.speedMultiplier||1),g=performance.now()*.001%(2e3*Math.PI);this.activeModes.has("cymatics")&&this.cymaticsCore&&(this.mouseData||(this.mouseData={x:0,y:0},this._boundCymaticPointer=y=>{y.touches&&y.touches.length>0?(this.mouseData.x=y.touches[0].clientX/window.innerWidth*2-1,this.mouseData.y=-(y.touches[0].clientY/window.innerHeight)*2+1):y.clientX!==void 0&&(this.mouseData.x=y.clientX/window.innerWidth*2-1,this.mouseData.y=-(y.clientY/window.innerHeight)*2+1)},window.addEventListener("mousemove",this._boundCymaticPointer),window.addEventListener("touchmove",this._boundCymaticPointer)),this.audioSyncToggleEl||(this.audioSyncToggleEl=document.getElementById("audioSyncToggle")),!this.audioSyncToggleEl||this.audioSyncToggleEl.checked||(v=0,c=0,f=0),this.reusableAudioData||(this.reusableAudioData={bass:0,mids:0,highs:0}),this.reusableAudioData.bass=v,this.reusableAudioData.mids=c,this.reusableAudioData.highs=f,this.cymaticsCore.update(g*u,this.reusableAudioData,this.mouseData)),this.lastTime||(this.lastTime=g);let A=g-this.lastTime;A<0&&(A=.016),A=Math.min(.1,A),this.lastTime=g;const D=w.visualSpeedAuto?w.beatFrequency||10:u*10,S=Math.sin(g*Math.PI*2*D)*.5+.5,_=this.vibrationEnabled?1:0,z=(S||0)*_,C=(v||0)*_,F=_*(.02+C*.15+z*.08),Y=Math.sin(g*47.3)*Math.cos(g*31.7)*F,R=Math.cos(g*53.1)*Math.sin(g*29.3)*F,V=Math.sin(g*37.9)*Math.cos(g*43.1)*F,fe=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];for(const m of fe)m&&m.position.set(Y,R,V);if(this.activeModes.has("galaxy")&&this.galaxyGroup){const m=this.sunRotationSpeedY||.002,y=this.sunRotationSpeedZ||5e-4;if(this.galaxyStars&&(this.galaxyStars.rotation.y+=m*u*.5,this.galaxyStars.rotation.z+=y*u*.5),this.galaxySunMesh){this.galaxySunMesh.rotation.z-=y*u*1.5,this.galaxySunMesh.rotation.y+=m*u*2;const T=1+C*.15*(this.galaxySunStyle==="sun3"?2.5:1);this.galaxySunMesh.scale.setScalar(T)}this.galaxySunUniforms&&(this.galaxySunUniforms.uTime.value=g*u,this.galaxySunUniforms.uBassIntt.value=C,this._cymaticV2&&this._cymaticV2.shiver>.5&&(this.galaxySunUniforms.uTime.value+=this._cymaticV2.shiver*.05))}if(this.activeModes.has("sphere")&&this.sphere&&(this.sphere.scale.setScalar(1+C*.15),this.sphere.rotation.y+=.005*u),this.activeModes.has("particles")&&this.particleMaterial){const m=((a=(i=window.MindWaveState)==null?void 0:i.envIntensities)==null?void 0:a.flow)??1,y=(.015*u+C*.08+z*.05)*m;this.particleMaterial.uniforms.uTime.value=g,this.particleMaterial.uniforms.uSpeed.value=y*10,this.particleGroup.rotation.z+=(.001*u+C*.005)*m}if(this.activeModes.has("lightspeed")&&this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uTime.value=g,this.lightspeedMaterial.uniforms.uSpeed.value=u),this.activeModes.has("matrix")&&this.cyberMaterial&&(this.cyberMaterial.uniforms.uTime.value=g*u),this.activeModes.has("waves")&&this.wavesMaterial){const m=((s=(o=window.MindWaveState)==null?void 0:o.envIntensities)==null?void 0:s.ocean)??1;this.wavesMaterial.uniforms.uTime.value=g*u*.5,this.wavesMaterial.uniforms.uNormBass.value=C*m,this.wavesMaterial.uniforms.uIntensity&&(this.wavesMaterial.uniforms.uIntensity.value=m)}if(this.activeModes.has("ocean")&&this.oceanWave&&this.oceanWave.material.uniforms){const m=((n=(r=window.MindWaveState)==null?void 0:r.envIntensities)==null?void 0:n.ocean)??1;this.oceanWave.material.uniforms.uTime.value=g*u,this.oceanWave.material.uniforms.uNormBass.value=C*m,this.oceanWave.material.uniforms.uBeatPulse.value=z*m,this.oceanFoam&&(this.oceanFoam.material.opacity=(.4+C*.3+z*.2)*(this.brightnessMultiplier||1)*m)}if(this.activeModes.has("box")&&this.boxOuter&&(this.boxOuter.rotation.x+=.008*u+C*.02,this.boxOuter.rotation.y+=.012*u,this.boxInner&&(this.boxInner.rotation.x-=.015*u,this.boxInner.rotation.y-=.01*u,this.boxInner.scale.setScalar(.95+C*.2)),this.boxOuter.scale.setScalar(1+C*.2),this.boxEdges&&this.boxEdges.rotation.copy(this.boxOuter.rotation)),this.activeModes.has("dragon")&&this.dragonBodyInstanced&&this.dragonDummy){this.dragonGroup.rotation.y+=.005*u;const m=g*u*2,y=1+C*.2;for(let T=0;T<this.dragonLength;T++){const b=m-T*.12,M=Math.sin(b)*8,W=Math.cos(b*1.5)*4+Math.sin(b*.5)*3,we=Math.cos(b*.8)*8;this.dragonDummy.position.set(M,W,we);const J=b+.1,Ce=Math.sin(J)*8,Me=Math.cos(J*1.5)*4+Math.sin(J*.5)*3,Se=Math.cos(J*.8)*8;this.dragonDummy.lookAt(Ce,Me,Se);const Te=1-T/this.dragonLength*.8,Ie=1+Math.sin(b*4)*.15*(.5+C);this.dragonDummy.scale.setScalar(Te*Ie*y),this.dragonDummy.updateMatrix(),this.dragonBodyInstanced.setMatrixAt(T,this.dragonDummy.matrix),this.dragonGlowInstanced&&this.dragonGlowInstanced.setMatrixAt(T,this.dragonDummy.matrix),T===0&&this.dragonHead&&(this.dragonHead.position.copy(this.dragonDummy.position),this.dragonHead.quaternion.copy(this.dragonDummy.quaternion),this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4))}if(this.dragonBodyInstanced.instanceMatrix.needsUpdate=!0,this.dragonGlowInstanced&&(this.dragonGlowInstanced.instanceMatrix.needsUpdate=!0),this.dragonPearlGroup){const T=m+.5;this.dragonPearlGroup.position.set(Math.sin(T)*9,Math.cos(T*1.5)*5+Math.sin(T*.5)*4,Math.cos(T*.8)*9),this.dragonPearlGroup.rotation.x+=.08*u,this.dragonPearlGroup.rotation.y+=.12*u}}if(this.activeModes.has("mandala")&&this.mandalaRings&&(this.mandalaRings.forEach((m,y)=>{m.userData&&m.userData.speed&&(m.rotation.z+=m.userData.speed*u+C*.005);const T=1+z*.1*(y+1)*.3;m.scale.setScalar(T)}),this.mandalaCenter&&(this.mandalaCenter.rotation.z-=.01*u,this.mandalaCenter.scale.setScalar(1+C*.3))),this.logoMesh){const m=w.lotusState||"auto";let y=.8;m==="faded"||m==="full"&&(y=1),this._lotusCurrentOpacity===void 0&&(this._lotusCurrentOpacity=.8),this._lotusCurrentOpacity+=(y-this._lotusCurrentOpacity)*.1,this.logoMesh.material.opacity=this._lotusCurrentOpacity,this.logoMesh.scale.setScalar(1+C*(.05+((p=this._cymaticV2)==null?void 0:p.shiver)*.1)+z*.02)}if(this.activeModes.has("lava")&&this.lavaBlobs&&this.lavaUniforms){const m=((l=(h=window.MindWaveState)==null?void 0:h.envIntensities)==null?void 0:l.lava)??1;this.lavaUniforms.uTime.value=g*u,this.lavaUniforms.uIntensity.value=C*m,this.lavaBlobs.forEach((y,T)=>{const b=y.userData,M=u*(1+C*.8);if(b.state==="heating"?(b.temperature+=b.heatRate*A*M,b.temperature>=1&&(b.temperature=1,b.state="rising")):b.state==="rising"?(y.position.y+=b.riseSpeed*M,y.position.y>=b.floatMax&&(b.state="cooling")):b.state==="cooling"?(b.temperature-=b.coolRate*A*M,b.temperature<=0&&(b.temperature=0,b.state="falling")):b.state==="falling"&&(y.position.y-=b.fallSpeed*M,y.position.y<=b.floatMin&&(b.state="heating")),y.position.x+=Math.sin(g*b.driftSpeed+b.driftPhase)*.02*M,this.lavaUniforms.uBlobs.value[T]){const W=b.baseSize*(.8+.5*b.temperature);this.lavaUniforms.uBlobs.value[T].set(y.position.x,y.position.y,y.position.z,W)}})}if(this.snowflakeGroup&&this.snowflakeGroup.visible&&this._snowData){const m=this._snowData,y=m.points.geometry.attributes.position.array,T=u*2;for(let b=0;b<m.count;b++){const M=b*3;y[M+1]-=m.speeds[b]*T;let W=Math.sin(g*m.driftFreqs[b]+m.phases[b])*m.drifts[b]*T;y[M]+=W,y[M+1]<-22&&(y[M+1]=22),y[M]>35&&(y[M]=-35),y[M]<-35&&(y[M]=35)}if(m.points.geometry.attributes.position.needsUpdate=!0,m.spinMeshes){const b=1+(C||0)*.15;m.spinMeshes.forEach((M,W)=>{M.rotation.z+=m.spinSpeeds[W]*T,M.position.y-=m.spinSpeeds[W]*.1*T,M.scale.setScalar(b),M.position.y<-25&&(M.position.y=25)})}m.material&&m.material.uniforms&&m.material.uniforms.uIntensity&&(m.material.uniforms.uIntensity.value=.2+C*.8)}if(this.activeModes.has("rainforest")&&this.rainMaterial){const m=u*.8*(1+z*.3);this.rainMaterial.uniforms.uTime.value=g,this.rainMaterial.uniforms.uSpeed.value=m,this.rainMaterial.uniforms.uIntensity.value=(.5+C*.2+z*.2)*(this.brightnessMultiplier||1)}if(this.activeModes.has("zengarden")&&this.petalMaterial){const m=u*.3*(1+z*.5);this.petalMaterial.uniforms.uTime.value=g,this.petalMaterial.uniforms.uSpeed.value=m,this.zenWater&&(this.zenWater.material.opacity=(.3+z*.2)*(this.brightnessMultiplier||1))}if(this.activeModes.has("fireplace")&&this.fireMesh&&this.fireMesh.material&&this.fireMesh.material.uniforms){const m=.8+.2*Math.sin(g*15)*Math.sin(g*7),y=this.fireMesh.material.uniforms;y.uTime&&(y.uTime.value=g*1.5*u),y.uIntensity&&(y.uIntensity.value=m+C*.5),this.fireLight&&(this.fireLight.intensity=(2+C*5)*m)}const B=performance.now(),ye=B-(this._lastFrameStartTime||B);if(this._lastFrameStartTime=B,this._fpsRingBuffer&&(this._fpsRingBuffer[this._fpsRingIndex]=ye,this._fpsRingIndex=(this._fpsRingIndex+1)%60,this._fpsRingCount=Math.min(60,this._fpsRingCount+1),this._fpsRingCount===60)){let m=0;for(let T=0;T<60;T++)m+=this._fpsRingBuffer[T];m/=60,1e3/m<35&&B-(this._lastLodDegradation||0)>3e3&&(this.degradeLOD(),this._lastLodDegradation=B,this._fpsRingCount=0)}const be=1e3/(this.targetFPS||60);B-this.lastFrameRenderTime>=be&&(this.renderer.autoClear=!this.activeModes.has("lightspeed"),this.renderer.autoClear&&this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.activeModes.has("cyber")&&this.renderCyberCyber(),this.lastFrameRenderTime=B)}catch(v){v.name==="TypeError"&&v.message.includes("uniforms")}finally{this._isRendering=!1}this.active&&!document.hidden?w.animationId=requestAnimationFrame(()=>this.render(w.analyserLeft,w.analyserRight)):w.animationId=null}setCyberColor(e){this.cyberConfig.color=e,this.cyberConfig.rainbow=!1,this.cyberColorCustomized=!0,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.matrixConfig.rainbow=!1,this.cyberMaterial&&this.cyberMaterial.uniforms.uColor&&(this.cyberMaterial.uniforms.uColor.value.set(e),this._tempColor.set(e),this._tempColor.r+=(1-this._tempColor.r)*.8,this._tempColor.g+=(1-this._tempColor.g)*.8,this._tempColor.b+=(1-this._tempColor.b)*.8,this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor),this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=0))}getAverageFrequency(e,t){let i=w.analyserLeft||w.analyserRight;if(!i)return 0;const a=i.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==a)&&(this._freqDataArray=new Uint8Array(a));const o=this._freqDataArray;i.getByteFrequencyData(o),e===void 0&&(e=0),t===void 0&&(t=o.length);let s=0,r=0;for(let n=e;n<t&&n<o.length;n++)s+=o[n],r++;return r>0?s/r:0}setMouseInfluence(e){this.mouseInfluence=e}setGlobalSpeed(e){this.speedMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=1+(e-1)*.5)}setGlobalBrightness(e){this.brightnessMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberBrightness(e){this.cyberConfig.brightness=e}setMatrixBrightness(e){this.matrixConfig.brightness=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberSpeed(e){this.cyberConfig.speed=e}setCyberLength(e){this.cyberConfig.length=e}setMatrixSpeed(e){this.matrixConfig.speed=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=e)}setMatrixLength(e){this.matrixConfig.length=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uTailLength.value=e)}setCyberRainbow(e){if(this.cyberConfig.rainbow=e,this.cyberRainbowMode=e,!e){const t=this.cyberConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(i=>{i.color=t})}}setMatrixRainbow(e){this.matrixConfig.rainbow=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=e?1:0)}setBatterySaver(e){this.batterySaver=e,this.targetFPS=e?30:60;const t=e?1:2;this.renderer&&(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t)),this.resize())}degradeLOD(){this.renderer&&(this.currentLodLevel==="high"?(this.renderer.setPixelRatio(1),this.currentLodLevel="medium",this.resize()):this.currentLodLevel==="medium"&&(this.renderer.setPixelRatio(.75),this.currentLodLevel="low",this.resize()))}updateCyberStrings(){if(!this.matrixCyberStreams)return;let e=!1,t="MINDWAVE🪷";const i=this.cyberConfig;i.logicMode==="custom"||i.logicMode==="txt"?(e=!0,t="🪷"+(i.customText||"WELCOME TO MINDWAVE")):(i.logicMode==="mindwave"||i.logicMode==="mw")&&(e=!0,t="MINDWAVE🪷");const a="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",o="0123456789·:.-+x[]<>/\\∆ΣΩ∞",s=100;this.matrixCyberStreams.forEach(r=>{if(r.chars=[],r.isTextMode=e,e&&t.length>0){const n=[...t].reverse();for(let p=0;p<s;p++)r.chars.push(n[p%n.length])}else if(i.logicMode==="matrix"||i.logicMode==="interstellar"||i.logicMode==="int")for(let n=0;n<s;n++)r.chars.push(o.charAt(Math.floor(Math.random()*o.length)));else for(let n=0;n<s;n++)r.chars.push(a.charAt(Math.floor(Math.random()*a.length)))})}setCyberLogicMode(e,t){this.cyberConfig.logicMode=e,t!==void 0&&(this.cyberConfig.customText=t),this.updateCyberStrings()}setMatrixLogicMode(e,t){if(this.matrixConfig.logicMode=e,t!==void 0&&(this.matrixConfig.customText=t),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTexture){const i=this.cyberMaterial.uniforms.uTexture.value,a=this.createCyberTexture(this.matrixConfig);this.cyberMaterial.uniforms.uTexture.value=a,this.cyberMaterial.needsUpdate=!0,i&&i.dispose()}this.initCyber()}setCyberColor(e){this.cyberConfig.color=e,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uColor&&this.cyberMaterial.uniforms.uColor.value.set(e)}setCyberAngle(e){this.cyberConfig.angle=e}setMatrixAngle(e){this.matrixConfig.angle=e,this.currentCyberAngle=e,this.cyberRotationGroup&&(this.cyberRotationGroup.rotation.z=xe.degToRad(-e))}setVibrationEnabled(e){this.vibrationEnabled=e}updateLogoTexture(){if(!this.originalLogoImg)return;const e=512;this._logoRenderCanvas||(this._logoRenderCanvas=document.createElement("canvas"),this._logoRenderCanvas.width=e,this._logoRenderCanvas.height=e);const t=this._logoRenderCanvas,i=t.getContext("2d",{willReadFrequently:!0});i.clearRect(0,0,e,e),i.drawImage(this.originalLogoImg,0,0,e,e);const a=i.getImageData(0,0,t.width,t.height),o=a.data,s=document.body.dataset.theme||"default",r=ue[s]||ue.default,n=r.secondary||r.accent||"#ffffff",p=this.customColors&&this.customColors.mandala?this.customColors.mandala:this.customColor,h=p?p.getHex():parseInt(r.accent.replace("#",""),16),l=parseInt(n.replace("#",""),16),v=h>>16&255,c=h>>8&255,f=h&255,u=l>>16&255,g=l>>8&255,A=l&255;this.themeType=document.body.dataset.themeType||"dark",this.themeType;for(let S=0;S<o.length;S+=4){const _=o[S],z=o[S+1],C=o[S+2],F=o[S+3];F<10||(_>200&&z>200&&C>200?(o[S]=v,o[S+1]=c,o[S+2]=f,o[S+3]=255):(o[S]=u,o[S+1]=g,o[S+2]=A,o[S+3]=Math.min(255,F*1.5)))}i.putImageData(a,0,0);const D=new Q(t);if(D.minFilter=le,D.magFilter=le,D.generateMipmaps=!0,this.renderer&&(D.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),this.logoMesh){const S=this.logoMesh.material.map;this.logoMesh.material.map=D,this.logoMesh.material.needsUpdate=!0,S&&S.dispose()}else{const S=new j(5.625,4.78),_=new L({map:D,transparent:!0,opacity:.8,color:16777215,depthTest:!1,depthWrite:!1});this.logoMesh=new q(S,_),this.logoMesh.position.set(0,0,-10),this.logoMesh.renderOrder=-1,this.scene.add(this.logoMesh)}}initOverlayLogo(){if(this.logoMesh)return;const e=new Image;e.crossOrigin="anonymous",e.src="./mindwave-logo-icon.png",e.onload=()=>{this.originalLogoImg=e,this.updateLogoTexture(),this.targetLogoOpacity!==void 0?this.setLogoOpacity(this.targetLogoOpacity):this.setLogoOpacity(.8)},e.onerror=t=>{}}setLogoOpacity(e){this.targetLogoOpacity=e,this.logoMesh&&this.logoMesh.material?this.logoMesh.material.opacity=e*this.brightnessMultiplier:!this.logoMesh&&e>0&&this.initOverlayLogo()}applyCymaticClassAndVariation(e,t){this.cymaticsCore&&(this.cymaticsCore.setPattern(e,t),this.activeModes.has("cymatics")||this.toggleMode("cymatics"))}nextCymatic(){if(window.state&&window.state.aiVisualsLocked){window.state.aiVisualsLocked=!1;const a=document.getElementById("cymaticAiBtn");a&&(a.style.borderColor="rgba(34, 211, 238, 0.2)")}const e=K.CYMATIC_PATTERNS;let t=0;this.currentCymaticData&&(t=e.findIndex(a=>a.name===this.currentCymaticData.name),t===-1&&(t=0));let i=(t+1)%e.length;this.cymaticsHistory.push(e[i]),this.cymaticsHistory.length>50&&this.cymaticsHistory.shift(),this.cymaticsHistoryIndex=this.cymaticsHistory.length-1,this.applyCymatic(e[i]),this.lastCymaticRotation=performance.now()}prevCymatic(){if(window.state&&window.state.aiVisualsLocked){window.state.aiVisualsLocked=!1;const a=document.getElementById("cymaticAiBtn");a&&(a.style.borderColor="rgba(34, 211, 238, 0.2)")}const e=K.CYMATIC_PATTERNS;let t=0;this.currentCymaticData&&(t=e.findIndex(a=>a.name===this.currentCymaticData.name),t===-1&&(t=0));let i=(t-1+e.length)%e.length;this.cymaticsHistory.push(e[i]),this.cymaticsHistory.length>50&&this.cymaticsHistory.shift(),this.cymaticsHistoryIndex=this.cymaticsHistory.length-1,this.applyCymatic(e[i]),this.lastCymaticRotation=performance.now()}setCymaticByName(e){const t=K.CYMATIC_PATTERNS.find(i=>i.name===e);t&&(this.applyCymatic(t),this.lastCymaticRotation=performance.now())}applyCymatic(e){if(!e||!this.cymaticsCore)return;this.currentCymaticData=e,window.renderCymaticProPatterns&&window.renderCymaticProPatterns();const t=e.classId||1,i=e.variationId||0;this.cymaticsCore.setPattern(t,i);const a=document.getElementById("cymaticPatternLabel");a&&e.name&&(a.textContent=e.name,a.style.textShadow="0 0 15px rgba(180, 120, 255, 1)",setTimeout(()=>{a.style.textShadow="0 0 5px rgba(255, 255, 255, 0.3)"},300))}setCymaticColor(e,t=null,i=1){if(!this.cymaticsCore)return;let a=i,o=t;typeof e=="string"&&t===null?o=this.currentCymaticData&&this.currentCymaticData.classId||1:typeof t=="number"&&(o=arguments[0],a=arguments[1],e=arguments[2]),this.cymaticsCore.setColor(o,a,new G(e))}setCymaticColor2(e){if(!this.cymaticsCore)return;const t=this.currentCymaticData&&this.currentCymaticData.classId||1;this.cymaticsCore.setColor(t,2,new G(e))}setCymaticColor3(e){}setCymaticParam(e,t,i){if(this.cymaticsCore){if(typeof e=="string"){const a=e,o=t,s=this.currentCymaticData&&this.currentCymaticData.classId||1;this.cymaticsCore.setParam(s,a,o);return}this.cymaticsCore.setParam(e,t,i)}}setCymaticTimer(e){this.cymaticsTimer=e;const t=document.getElementById("cymaticTimerLabel");t&&(e>300?t.textContent="INFINITE":e===0?t.textContent="OFF":t.textContent=e+"s")}dispose(){this.active=!1,w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null),this._boundResize&&window.removeEventListener("resize",this._boundResize),this._boundResizeOverlayCanvas&&window.removeEventListener("resize",this._boundResizeOverlayCanvas),window.removeEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode&&window.removeEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange&&document.removeEventListener("visibilitychange",this._boundVisibilityChange),this._boundThemeChange&&window.removeEventListener("themeChanged",this._boundThemeChange),this.canvas&&(this._boundContextLost&&this.canvas.removeEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored&&this.canvas.removeEventListener("webglcontextrestored",this._boundContextRestored)),this._boundCymaticPointer&&(window.removeEventListener("mousemove",this._boundCymaticPointer),window.removeEventListener("touchmove",this._boundCymaticPointer));const e=i=>{if(i)for(;i.children.length>0;){const a=i.children[0];i.remove(a),a.traverse(o=>{if(o.geometry&&o.geometry.dispose(),o.material){if(o.material.map&&o.material.map.dispose(),o.material.uniforms)for(const s in o.material.uniforms)o.material.uniforms[s]&&o.material.uniforms[s].value&&o.material.uniforms[s].value.dispose&&o.material.uniforms[s].value.dispose();o.material.dispose()}})}},t=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];this._fpsRingBuffer=null,this._tempColor=null,this._logoRenderCanvas=null,t.forEach(e),this.cyberMaterial&&(this.cyberMaterial.dispose(),this.cyberMaterial=null),this.fireMaterial&&(this.fireMaterial.dispose(),this.fireMaterial=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.lightspeedMaterial&&(this.lightspeedMaterial.dispose(),this.lightspeedMaterial=null),this.rainMaterial&&(this.rainMaterial.dispose(),this.rainMaterial=null),this.petalMaterial&&(this.petalMaterial.dispose(),this.petalMaterial=null),this.logoMesh&&(this.logoMesh.material&&(this.logoMesh.material.map&&this.logoMesh.material.map.dispose(),this.logoMesh.material.dispose()),this.logoMesh.geometry&&this.logoMesh.geometry.dispose(),this.scene&&this.scene.remove(this.logoMesh),this.logoMesh=null);for(const i in this.textures)this.textures[i]&&this.textures[i].dispose&&this.textures[i].dispose();if(this.textures={},this._freqDataArray=null,this.renderer){try{this.renderer.forceContextLoss()}catch{}this.renderer.dispose(),this.renderer=null}this.scene=null,this.camera=null}setWarpSpeed(e){this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uSpeed.value=e)}setWarpFov(e){this.camera&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setWarpChromatic(e){this.lightspeedMaterial}}function Je(){return x?Promise.resolve(x):new Promise(d=>{Xe(),setTimeout(()=>d(x),10)})}function Xe(){if(!x&&O.canvas&&O.canvas.activeVisualizer&&O.canvas.activeVisualizer.isVisualizer3D&&(x=O.canvas.activeVisualizer),O.canvas&&O.canvas.activeVisualizer){if(x&&O.canvas.activeVisualizer===x)return x;O.canvas.activeVisualizer.dispose(),O.canvas.activeVisualizer=null,x=null}w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null);const d=O.canvas||document.getElementById("visualizer");if(!x&&d){const e=d&&d.activeVisualizer&&d.activeVisualizer.isVisualizer3D?{activeModes:d.activeVisualizer.activeModes,mode:d.activeVisualizer.mode,mindWaveMode:d.activeVisualizer.mindWaveMode,cyberLogicMode:d.activeVisualizer.cyberLogicMode,cyberCustomText:d.activeVisualizer.cyberCustomText,currentCyberAngle:d.activeVisualizer.currentCyberAngle,cyberSpeedMultiplier:d.activeVisualizer.cyberSpeedMultiplier,rainbowEnabled:d.activeVisualizer._rainbowEnabled}:{};x=new K(d,e),d.activeVisualizer=x,setTimeout(()=>{x&&(x.updateVisibility(),je())},0)}return x}function et(){return x}let ce=!1;function tt(){ce=!0,x&&w.animationId&&(cancelAnimationFrame(w.animationId),w.animationId=null,x.renderer&&x.scene&&x.camera&&x.renderer.render(x.scene,x.camera))}function je(){x&&!w.animationId&&(x.active=!0,x.render(w.analyserLeft,w.analyserRight),ce=!1)}function it(){return ce}function at(d){x&&x.toggleMode(d)}function ot(d){x&&(x.setGlobalSpeed(d),x.setCyberSpeed&&x.setCyberSpeed(d))}function st(d,e=null){x&&(x.setVisualColor(d,e),x.setCyberColor&&(!e||e=="cyber")&&x.setCyberColor(d))}function rt(d){x&&x.setGlobalBrightness&&x.setGlobalBrightness(d)}function nt(d){x&&x.setLogoOpacity(d)}function lt(d){x&&x.setMouseInfluence(d)}window.toggleGalaxySun=function(){return x?x.toggleGalaxySunStyle():null};window.setCymaticPattern=function(d,e){if(window.setVisualMode&&window.setVisualMode("cymatics",!0,!0),x&&x.cymaticsCore){if(x.cymaticsCore.setPattern(d,e),!x.activeModes.has("cymatics")){if(window.switchRightTab){const o=document.querySelector('.tab-pill[title="Cymatics Engine"]');o&&window.switchRightTab("cymatics",o)}x.activeModes.add("cymatics"),x.cymaticsGroup.visible=!0}}else setTimeout(()=>{x&&x.cymaticsCore&&x.cymaticsCore.setPattern(d,e)},500);const t=document.querySelectorAll(".cymatics-pattern-btn");t.forEach(o=>o.classList.remove("ring-2","ring-blue-400","scale-95"));const i=`window.setCymaticPattern(${d}, ${e})`,a=Array.from(t).find(o=>o.getAttribute("onclick")===i);a&&a.classList.add("ring-2","ring-blue-400","scale-95")};export{K as Visualizer3D,et as getVisualizer,Xe as initVisualizer,it as isVisualsPaused,tt as pauseVisuals,Je as preloadVisualizer,je as resumeVisuals,lt as setMouseInfluence,rt as setVisualBrightness,st as setVisualColor,nt as setVisualLogoOpacity,ot as setVisualSpeed,at as toggleVisual};
//# sourceMappingURL=visualizer_vGOLD_SYNC-DPGigwsa.js.map
