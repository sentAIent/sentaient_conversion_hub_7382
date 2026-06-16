import sys

filepath = 'binaural-assets/js/visuals/CymaticsCore.js'
with open(filepath, 'r') as f:
    content = f.read()

# Find the start of class 17
start_idx = content.find('} else if (classId === 17) {')

# Find the end of the getFragmentShader function
end_idx = content.find('};\n\nexport class CymaticsCore')

if start_idx == -1 or end_idx == -1:
    print("COULD NOT FIND INDICES", start_idx, end_idx)
    sys.exit(1)

new_shaders = '''} else if (classId === 17) {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        #define MAX_STEPS 60
        #define MAX_DIST 10.0
        #define SURF_DIST 0.01

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }

        float sdSphere(vec3 p, float s) { return length(p) - s; }
        float sdBox(vec3 p, vec3 b) {
            vec3 q = abs(p) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }
        float sdTorus(vec3 p, vec2 t) {
            vec2 q = vec2(length(p.xz)-t.x,p.y);
            return length(q)-t.y;
        }

        float map(vec3 p, int var, float t) {
            float d = MAX_DIST;
            
            if (var == 0) {
                // 3D Fractal Heart
                p.xy *= rot(t*0.5); p.yz *= rot(t*0.3);
                vec3 q = p; q.y -= length(q.xz)*0.5; q.y += 0.2;
                d = length(q) - 0.5;
                p = abs(p)*1.5 - 0.5; p.xy *= rot(t*0.2); p.xz *= rot(t*0.4); d = smin(d, (length(p)-0.3)*0.66, 0.1);
                p = abs(p)*1.5 - 0.5; p.xy *= rot(t*0.2); p.xz *= rot(t*0.4); d = smin(d, (length(p)-0.3)*0.44, 0.1);
                p = abs(p)*1.5 - 0.5; p.xy *= rot(t*0.2); p.xz *= rot(t*0.4); d = smin(d, (length(p)-0.3)*0.29, 0.1);
            } 
            else if (var == 1) {
                // Quantum Topology
                p.xz *= rot(t*0.4); p.yz *= rot(t*0.2);
                float d1 = sdTorus(p, vec2(0.6, 0.05));
                vec3 p2 = p; p2.xy *= rot(1.57); p2.xz *= rot(1.57);
                float d2 = sdTorus(p2, vec2(0.6, 0.05));
                vec3 p3 = p; p3.yz *= rot(1.57); p3.xy *= rot(1.57);
                float d3 = sdTorus(p3, vec2(0.6, 0.05));
                d = min(min(d1, d2), d3);
                d = smin(d, sdSphere(p, 0.3 + sin(t*2.0)*0.1), 0.2);
            }
            else if (var == 2) {
                // Fluid SDF Core
                p.xz *= rot(t*0.5);
                float d1 = sdSphere(p - vec3(sin(t)*0.3, cos(t*1.3)*0.3, 0), 0.3);
                float d2 = sdSphere(p - vec3(cos(t*1.1)*0.3, sin(t*0.9)*0.3, sin(t)*0.2), 0.25);
                float d3 = sdSphere(p - vec3(sin(t*0.7)*0.4, cos(t*0.5)*0.4, cos(t)*0.3), 0.35);
                d = smin(smin(smin(d1, d2, 0.3), d3, 0.3), sdSphere(p, 0.2), 0.4);
            }
            else if (var == 3) {
                // Particle Swarm
                p.xz *= rot(t*0.3); p.xy *= rot(t*0.2);
                vec3 q = p * 4.0;
                float noise = sin(q.x + t)*sin(q.y - t)*sin(q.z + t);
                d = sdSphere(p, 0.6) + noise * 0.15;
            }
            else if (var == 4) {
                // Micro Pixel Stardust
                p.xz *= rot(t);
                p = abs(p) - 0.4;
                p = abs(p) - 0.2; p.xy *= rot(t*0.5); p.xz *= rot(t*0.5);
                p = abs(p) - 0.2; p.xy *= rot(t*0.5); p.xz *= rot(t*0.5);
                p = abs(p) - 0.2; p.xy *= rot(t*0.5); p.xz *= rot(t*0.5);
                d = length(p) - 0.05;
            }
            else if (var == 5) {
                // Harmonic Gradient
                p.xy *= rot(t); p.yz *= rot(t*0.5);
                float d1 = sdBox(p, vec3(0.4)) - 0.1;
                float d2 = sdSphere(p, 0.55 + sin(length(p)*10.0 - t*3.0)*0.05);
                d = mix(d1, d2, sin(t)*0.5+0.5);
            }
            else if (var == 6) {
                // Folding Hypercube
                p.xz *= rot(t*0.5); p.yz *= rot(t*0.3);
                vec3 q = abs(p) - 0.4; d = sdBox(q, vec3(0.1));
                q = abs(q) - 0.2; d = min(d, sdBox(q, vec3(0.05)));
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
                vec3 q = p; q.y += r*r*1.5;
                d = max(length(q) - 0.4 - petals*0.1, -sdSphere(p - vec3(0,0.5,0), 0.6));
            }
            else {
                // Cosmic DNA Helix
                p.yz *= rot(t*0.2);
                float a = p.y * 3.0 + t*2.0;
                vec3 p1 = vec3(p.x - cos(a)*0.3, p.y, p.z - sin(a)*0.3);
                vec3 p2 = vec3(p.x + cos(a)*0.3, p.y, p.z + sin(a)*0.3);
                float bridges = length(vec2(length(p.xz), mod(p.y, 0.4)-0.2)) - 0.05;
                d = max(smin(smin(length(p1)-0.1, length(p2)-0.1, 0.1), bridges, 0.05), sdSphere(p, 0.9));
            }
            return d;
        }

        vec3 getNormal(vec3 p, int var, float t) {
            vec2 e = vec2(0.001, 0);
            return normalize(map(p, var, t) - vec3(map(p-e.xyy, var, t), map(p-e.yxy, var, t), map(p-e.yyx, var, t)));
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0; uv.x *= uAspect;
            float t = uTime; int var = int(floor(uVariation));
            vec3 ro = vec3(0.0, 0.0, -2.5);
            vec3 rd = normalize(vec3(uv, 1.0));

            float dO = 0.0; vec3 p;
            float glow = 0.0;
            
            for(int i=0; i<MAX_STEPS; i++) {
                p = ro + rd * dO;
                float dS = map(p, var, t);
                glow += 0.01 / (0.01 + abs(dS)); // Neon glow accumulation
                dO += dS;
                if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
            }

            vec3 col = vec3(0.0);
            
            if(dO < MAX_DIST) {
                vec3 n = getNormal(p, var, t);
                float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 2.0); // X-Ray edge glow
                vec3 baseCol = mix(uColor1, uColor2, clamp(p.y*0.5+0.5, 0.0, 1.0));
                
                col = baseCol * fresnel * 2.5; // Emissive edges
                col += mix(uColor1, uColor2, n.x*0.5+0.5) * 0.5; // Iridescence
            } 
            
            col += uColor2 * glow * 0.05;
            
            col *= uIntensity * 1.5;
            col = pow(col, vec3(0.4545)); // Gamma
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
        varying vec2 vUv;
        
        #define MAX_STEPS 70
        #define MAX_DIST 15.0
        #define SURF_DIST 0.005

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }

        float sdMandelbulb(vec3 p, float t) {
            vec3 z = p; float dr = 1.0; float r = 0.0;
            float Power = 8.0 + sin(t*0.5)*2.0;
            
            r=length(z); if(r<1.5){ float th=acos(z.z/r); float ph=atan(z.y,z.x); dr=pow(r,Power-1.0)*Power*dr+1.0; float zr=pow(r,Power); th*=Power; ph*=Power; z=zr*vec3(sin(th)*cos(ph),sin(ph)*sin(th),cos(th))+p;}
            r=length(z); if(r<1.5){ float th=acos(z.z/r); float ph=atan(z.y,z.x); dr=pow(r,Power-1.0)*Power*dr+1.0; float zr=pow(r,Power); th*=Power; ph*=Power; z=zr*vec3(sin(th)*cos(ph),sin(ph)*sin(th),cos(th))+p;}
            r=length(z); if(r<1.5){ float th=acos(z.z/r); float ph=atan(z.y,z.x); dr=pow(r,Power-1.0)*Power*dr+1.0; float zr=pow(r,Power); th*=Power; ph*=Power; z=zr*vec3(sin(th)*cos(ph),sin(ph)*sin(th),cos(th))+p;}

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

        float map(vec3 p, int var, float t) {
            float d = MAX_DIST;
            
            if (var == 0) {
                p.xy *= rot(t*0.3); p.xz *= rot(t*0.5);
                d = sdMandelbulb(p, t);
            } 
            else if (var == 1) {
                p.xz *= rot(t*0.4); p.yz *= rot(t*0.2);
                float a = atan(p.z, p.x); float r = length(p.xz) - 0.6;
                vec2 torus1 = vec2(r, p.y) * rot(a * 3.0 + t);
                vec2 torus2 = vec2(r, p.y) * rot(a * -3.0 - t);
                d = smin(length(torus1) - 0.15, length(torus2) - 0.15, 0.2);
            }
            else if (var == 2) {
                p.xy *= rot(t*0.5); p.yz *= rot(t*0.3);
                vec3 q = p; q.y -= length(q.xz)*0.6; q.y += 0.2; d = length(q) - 0.5;
                p = abs(p)*1.6 - 0.4; p.xy *= rot(t*0.3); p.xz *= rot(t*0.5); d = smin(d, (length(p.xz)-0.1)*0.625, 0.05);
                p = abs(p)*1.6 - 0.4; p.xy *= rot(t*0.3); p.xz *= rot(t*0.5); d = smin(d, (length(p.xz)-0.1)*0.390, 0.05);
                p = abs(p)*1.6 - 0.4; p.xy *= rot(t*0.3); p.xz *= rot(t*0.5); d = smin(d, (length(p.xz)-0.1)*0.244, 0.05);
            }
            else if (var == 3) {
                p.xz *= rot(t*0.2); vec3 q = p;
                float a = atan(q.z, q.x); float r = length(q.xz); float seg = 8.0;
                a = mod(a, 6.28318/seg) - 3.14159/seg;
                q.x = r*cos(a) - 0.6; q.z = r*sin(a);
                q.xy *= rot(t*2.0); 
                d = max(min(sdBox(q, vec3(0.2, 0.05, 0.1)), length(p) - 0.4), -(length(p.xz) - 0.2));
            }
            else if (var == 4) {
                p.xz *= rot(t*0.4); p.yz *= rot(t*0.3);
                float r = length(p);
                d = r - 0.6 + sin(p.x*10.0)*sin(p.y*10.0)*sin(p.z*10.0)*0.1;
                p = abs(p) - 0.2; d = smin(d, length(p)-0.3, 0.2) + sin(r*40.0 - t*5.0)*0.02;
            }
            else if (var == 5) {
                p.xz *= rot(t*0.6); p.yz *= rot(t*0.4); p.xy *= rot(t*0.2);
                d = min(sdBox(abs(p)-0.5, vec3(0.05)), sdBox(abs(p)-0.25, vec3(0.05)));
                d = min(min(d, sdBox(p, vec3(0.02, 0.02, 0.6))), sdBox(p, vec3(0.6, 0.02, 0.02)));
                d = smin(d, sdBox(p, vec3(0.02, 0.6, 0.02)), 0.1);
            }
            else if (var == 6) {
                p.xz *= rot(t*0.2);
                p = abs(p) - 0.3; p.xy *= rot(0.5 + t*0.1); p.xz *= rot(0.5 - t*0.1);
                p = abs(p) - 0.3; p.xy *= rot(0.5 + t*0.1); p.xz *= rot(0.5 - t*0.1);
                p = abs(p) - 0.3; p.xy *= rot(0.5 + t*0.1); p.xz *= rot(0.5 - t*0.1);
                d = max(sdBox(p, vec3(0.1)), length(p)-0.15);
            }
            else if (var == 7) {
                p.xz *= rot(t*0.2); vec3 q = p * 3.0;
                d = min(max(length(p) - 0.6 + dot(sin(q), cos(q.zxy)) * 0.2, -sdSphere(p, 0.4)), length(p - vec3(sin(t)*0.3, cos(t)*0.3, 0)) - 0.1);
            }
            else if (var == 8) {
                p.xz *= rot(t*0.5); p.yz *= rot(t*0.2);
                d = sdTorus(p, vec2(0.6, 0.05));
                vec3 p2 = p; p2.xy *= rot(1.57); p2.xz *= rot(1.57); d = smin(d, sdTorus(p2, vec2(0.5, 0.05)), 0.1);
                vec3 p3 = p; p3.yz *= rot(1.57); p3.xy *= rot(1.57); d = smin(d, sdTorus(p3, vec2(0.4, 0.05)), 0.1);
                d = smin(d, max(length(mod(p*5.0 - t, 1.0) - 0.5) - 0.05, length(p)-0.8), 0.2);
            }
            else {
                p.xz *= rot(t*0.3); p.yz *= rot(t*0.1);
                d = max(max(abs(length(p) - 0.7) - 0.05, -(abs(p.y)-0.02)), -(abs(p.x)-0.02));
                vec3 p2 = p; p2.xy *= rot(-t*0.8); p2.xz *= rot(-t*0.5);
                d = min(min(d, sdBox(p2, vec3(0.3))), sdTorus(p2, vec2(0.4, 0.02)));
            }
            return d;
        }

        vec3 getNormal(vec3 p, int var, float t) {
            vec2 e = vec2(0.001, 0);
            return normalize(map(p, var, t) - vec3(map(p-e.xyy, var, t), map(p-e.yxy, var, t), map(p-e.yyx, var, t)));
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0; uv.x *= uAspect;
            float t = uTime; int var = int(floor(uVariation));
            vec3 ro = vec3(0.0, 0.0, -2.5);
            vec3 rd = normalize(vec3(uv, 1.0));

            float dO = 0.0; vec3 p;
            float glow = 0.0;
            
            for(int i=0; i<MAX_STEPS; i++) {
                p = ro + rd * dO;
                float dS = map(p, var, t);
                glow += 0.01 / (0.01 + abs(dS));
                dO += dS;
                if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
            }

            vec3 col = vec3(0.0);
            
            if(dO < MAX_DIST) {
                vec3 n = getNormal(p, var, t);
                float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 1.5); 
                vec3 baseCol = mix(uColor1, uColor2, clamp(p.y*0.5+0.5, 0.0, 1.0));
                
                col = baseCol * fresnel * 3.0; 
                col += mix(uColor1, uColor2, n.x*0.5+0.5) * 0.8; 
            } 
            
            col += uColor2 * glow * 0.08;
            
            col *= uIntensity * 1.5;
            col = pow(col, vec3(0.4545));
            gl_FragColor = vec4(col, 1.0);
        }
        `;
    } else {
        return `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        #define PI 3.14159265359
        
        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        float fbm(vec2 p) {
            float f = 0.0;
            float w = 0.5;
            for(int i = 0; i < 5; i++) {
                f += w * sin(p.x + p.y);
                p *= 2.0;
                w *= 0.5;
            }
            return f;
        }
        
        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            float t = uTime * 0.5;
            
            vec2 p = uv;
            float r = length(p);
            float a = atan(p.y, p.x);
            
            float f = 0.0;
            int var = int(floor(uVariation));
            
            float modParam = sin(t) * 0.5 + 0.5;
            int intMod = int(floor(modParam * 3.0));
            
            if (intMod == 0) {
                p.xy *= rot(t);
                f = smoothstep(0.01, 0.0, abs(r - 0.5 + sin(a*4.0)*0.1));
                f += smoothstep(0.05, 0.0, abs(r - 0.5 + sin(a*4.0)*0.1)) * 0.5;
            } else if (intMod == 1) {
                p.xy *= rot(-t*0.5);
                f = fbm(p*5.0) * exp(-pow(r - 0.5, 2.0)*10.0);
            } else {
                vec2 dir = vec2(1.0, 0.5);
                f = fbm(p*3.0 - dir*t) * fbm(p*5.0 + dir*t*0.5);
                f *= exp(-r*r*4.0);
            }
            
            vec3 col = mix(uColor1, uColor2, a/PI*0.5+0.5) * f * 2.0;
            col *= uIntensity;
            gl_FragColor = vec4(col, 1.0);
        }
        `;
'''

new_content = content[:start_idx] + new_shaders + content[end_idx:]

with open(filepath, 'w') as f:
    f.write(new_content)

print("PYTHON SCRIPT EXECUTED")
