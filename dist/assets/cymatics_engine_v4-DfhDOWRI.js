import{B as v,a as l,S as s,A as f,C as r,P as p,b as d,V as g,M as C}from"./visualizer_vGOLD_SYNC-a3sq3Jk-.js";import"./persistence-CaT_mPe8.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";const a=3e5,c=`
#define PI 3.14159265359
float chladni(vec2 p, float n, float m) {
    return cos(n * PI * p.x) * cos(m * PI * p.y) - cos(m * PI * p.x) * cos(n * PI * p.y);
}
`;function x(o){const t=new v,n=new Float32Array(a*3),i=new Float32Array(a*2),u=new Float32Array(a);for(let e=0;e<a;e++)n[e*3+0]=(Math.random()-.5)*40,n[e*3+1]=(Math.random()-.5)*40,n[e*3+2]=(Math.random()-.5)*2,i[e*2+0]=Math.random(),i[e*2+1]=Math.random(),u[e]=Math.random();t.setAttribute("position",new l(n,3)),t.setAttribute("uv",new l(i,2)),t.setAttribute("aRandom",new l(u,1));const m=new s({uniforms:{uTime:{value:0},uN:{value:o.n||1},uM:{value:o.m||1},uColor1:{value:new r(o.color1||"#00ffff")},uColor2:{value:new r(o.color2||"#ff00ff")},uColor3:{value:new r(o.color3||"#ffff00")},uIntensity:{value:o.energy||1},uPatternType:{value:o.type||0}},vertexShader:`
            uniform float uTime;
            uniform float uN;
            uniform float uM;
            uniform float uIntensity;
            uniform float uPatternType;
            attribute float aRandom;
            varying vec3 vColor;
            varying float vAlpha;
            
            ${c}
            
            void main() {
                vec3 pos = position;
                vec2 p = pos.xy * 0.1; 
                
                // Rotation/Swirl
                float t = uTime * 0.2;
                mat2 rot = mat2(cos(t), -sin(t), sin(t), cos(t));
                vec2 rp = rot * p;
                
                // Calculate node distance (0 = node)
                float c = chladni(rp, uN, uM);
                
                if (uPatternType > 5.0) {
                    c = chladni(rp, uN, uM) * 0.5 + chladni(rp * 1.5, uN*0.5, uM*0.5) * 0.5;
                }
                
                float distToNode = abs(c);
                
                // Particles move towards nodes (distToNode = 0) over time
                float pull = smoothstep(1.0, 0.0, distToNode) * uIntensity * 10.0;
                
                pos.z += sin(uTime * 3.0 + aRandom * 10.0) * pull * 0.5;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_Position = projectionMatrix * mvPosition;
                gl_PointSize = (1.5 + pull * 2.0) * (100.0 / -mvPosition.z);
                
                vAlpha = smoothstep(0.5, 0.0, distToNode) * (0.5 + 0.5 * sin(uTime * 5.0 + aRandom));
                
                // Mix colors based on quadrant and distance
                float ang = atan(pos.y, pos.x);
                vColor = mix(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 1.0), sin(ang + uTime) * 0.5 + 0.5);
            }
        `,fragmentShader:`
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            varying vec3 vColor;
            varying float vAlpha;
            
            void main() {
                // Circular particle
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                
                // Soft edge glow
                float glow = smoothstep(0.5, 0.2, dist);
                
                vec3 finalColor = mix(uColor1, uColor2, vColor.x);
                finalColor = mix(finalColor, uColor3, vColor.y);
                
                gl_FragColor = vec4(finalColor * glow * 1.5, vAlpha * glow);
            }
        `,transparent:!0,blending:f,depthWrite:!1});return new p(t,m)}function A(o){const t=new d(100,100),n=new s({uniforms:{uTime:{value:0},uN:{value:o.n||1},uM:{value:o.m||1},uColor1:{value:new r(o.color1||"#00ffff")},uColor2:{value:new r(o.color2||"#ff00ff")},uColor3:{value:new r(o.color3||"#ffff00")},uIntensity:{value:o.energy||1},uPatternType:{value:o.type||0},uResolution:{value:new g(window.innerWidth,window.innerHeight)}},vertexShader:`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,fragmentShader:`
            uniform float uTime;
            uniform float uN;
            uniform float uM;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            uniform float uIntensity;
            uniform float uPatternType;
            varying vec2 vUv;
            
            ${c}
            
            void main() {
                vec2 p = (vUv - 0.5) * 4.0;
                
                // Swirl
                float t = uTime * 0.3;
                float r = length(p);
                float a = atan(p.y, p.x);
                p = vec2(cos(a + t * 0.5), sin(a + t * 0.5)) * r;
                
                float c = chladni(p, uN, uM);
                
                if (uPatternType > 10.0) {
                    c = abs(c) - 0.2;
                }
                
                float glow = 0.05 / (abs(c) + 0.01);
                glow *= uIntensity;
                
                // Dynamic colors based on SDF gradient
                vec3 col = mix(uColor1, uColor2, sin(c * 10.0 - uTime * 2.0) * 0.5 + 0.5);
                col = mix(col, uColor3, smoothstep(0.0, 1.0, glow * 0.5));
                
                // Add bioluminescence
                col += uColor1 * glow * 1.5;
                
                // Vignette
                float vig = 1.0 - smoothstep(1.0, 2.0, r);
                
                gl_FragColor = vec4(col * vig, 1.0);
            }
        `,transparent:!0,blending:f,depthWrite:!1});return new C(t,n)}export{x as createParticleCymatics,A as createSDFCymatics};
//# sourceMappingURL=cymatics_engine_v4-DfhDOWRI.js.map
