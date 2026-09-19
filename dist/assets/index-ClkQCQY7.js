import{l as a,_ as re,k as e,a as J,H as se}from"./vendor-DUpYkZk-.js";import{H as ne}from"./Header-BcQEG4s9.js";import{u as p,a as V,C as ae}from"./react-three-fiber.esm-CoUpvIyf.js";import{E as ie,B as le,N as ce,V as fe}from"./Vignette-q0olvwjC.js";import{a1 as ee,ai as k,a7 as A,a as B,k as G,G as C,n as F,B as P,a6 as O,W as N,E as te,ap as b,l as ue,ae as de,ab as me,p as he,i as pe,h as xe}from"./three-Dpz2Zjqn.js";import{u as U,F as ge,a as ve,S as ye}from"./Float-7DCZruC-.js";import{T as v}from"./Text-Bg__TDv3.js";import{S as Z}from"./Sparkles-Cjf6l-cg.js";import"./main-BtB3osTm.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";import"./constants-Cm3b-C7f.js";const oe=a.forwardRef(function({children:r,follow:t=!0,lockX:n=!1,lockY:s=!1,lockZ:i=!1,...l},f){const c=a.useRef(null),u=a.useRef(null),m=new ee;return p(({camera:h})=>{if(!t||!u.current)return;const x=u.current.rotation.clone();u.current.updateMatrix(),u.current.updateWorldMatrix(!1,!1),u.current.getWorldQuaternion(m),h.getWorldQuaternion(c.current.quaternion).premultiply(m.invert()),n&&(u.current.rotation.x=x.x),s&&(u.current.rotation.y=x.y),i&&(u.current.rotation.z=x.z)}),a.useImperativeHandle(f,()=>u.current,[]),a.createElement("group",re({ref:u},l),a.createElement("group",{ref:c},r))}),je=({position:o})=>{const r=a.useRef();U();const[t,n]=a.useState(null);return a.useEffect(()=>{new k().load("/assets/images/digital_fire.jpg",s=>{s.colorSpace=A,n(s)})},[]),p(s=>{if(r.current){const i=window.icebreakerThaw||0;r.current.material.opacity=i*.9;const l=1+Math.sin(s.clock.elapsedTime*5)*.1;r.current.scale.setScalar(l)}}),t?e.jsx("group",{position:o,children:e.jsx(oe,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{ref:r,position:[0,20,0],children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:B})]})})}):null},Me=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,we=`
  varying vec2 vUv;
  uniform float uState; // 0.0 = isolated, 1.0 = party
  uniform vec3 uIsolatedColor;
  uniform vec3 uPartyColor;
  uniform float uTime;
  uniform float uSeed;

  // Signed distance to a capsule (line segment with radius)
  float sdCapsule(vec2 p, vec2 a, vec2 b, float r) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h ) - r;
  }
  
  // Signed distance to a circle
  float sdCircle(vec2 p, vec2 c, float r) {
    return length(p - c) - r;
  }

  void main() {
    vec2 uv = vUv;
    
    // Base animation speeds
    float t = uTime * 2.0 + uSeed * 10.0;
    
    // --- Body Parts ---
    // Head
    vec2 headPos = vec2(0.5, 0.85);
    
    // Spine
    vec2 spineTop = vec2(0.5, 0.7);
    vec2 spineBot = vec2(0.5, 0.4);
    
    // Arms (Dynamic based on state)
    // Isolated: Arms down, close to body
    vec2 armL_Iso = vec2(0.4, 0.45);
    vec2 armR_Iso = vec2(0.6, 0.45);
    
    // Party: Arms waving up in the air
    float waveL = sin(t * 3.0) * 0.1;
    float waveR = cos(t * 3.1) * 0.1;
    vec2 armL_Party = vec2(0.2, 0.8 + waveL);
    vec2 armR_Party = vec2(0.8, 0.8 + waveR);
    
    // Interpolate arm targets based on uState
    vec2 armL_Target = mix(armL_Iso, armL_Party, uState);
    vec2 armR_Target = mix(armR_Iso, armR_Party, uState);
    
    // Legs
    // Isolated: Standing still
    vec2 legL_Iso = vec2(0.45, 0.05);
    vec2 legR_Iso = vec2(0.55, 0.05);
    
    // Party: Dancing/jumping
    float jumpL = max(0.0, sin(t * 4.0)) * 0.1;
    float jumpR = max(0.0, cos(t * 4.0)) * 0.1;
    vec2 legL_Party = vec2(0.35, 0.1 + jumpL);
    vec2 legR_Party = vec2(0.65, 0.1 + jumpR);
    
    vec2 legL_Target = mix(legL_Iso, legL_Party, uState);
    vec2 legR_Target = mix(legR_Iso, legR_Party, uState);
    
    // Calculate distances
    float dHead = sdCircle(uv, headPos, 0.08);
    float dSpine = sdCapsule(uv, spineTop, spineBot, 0.07);
    float dArmL = sdCapsule(uv, spineTop, armL_Target, 0.04);
    float dArmR = sdCapsule(uv, spineTop, armR_Target, 0.04);
    float dLegL = sdCapsule(uv, spineBot, legL_Target, 0.05);
    float dLegR = sdCapsule(uv, spineBot, legR_Target, 0.05);
    
    // Union all parts
    float d = min(dHead, min(dSpine, min(dArmL, min(dArmR, min(dLegL, dLegR)))));
    
    // Anti-aliased alpha
    float alpha = smoothstep(0.01, -0.01, d);
    
    if (alpha <= 0.0) discard;
    
    // Color transition
    vec3 finalColor = mix(uIsolatedColor, uPartyColor, uState);
    
    // Add subtle hologram glow
    float glow = 0.8 + 0.2 * sin(t * 5.0);
    
    gl_FragColor = vec4(finalColor * glow, alpha);
  }
`,be=({position:o,angle:r,delay:t})=>{const n=a.useRef(),s=a.useRef();U();const i=a.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new G("#44aaff")},uPartyColor:{value:new G("#ff8844")}}),[]);return p(l=>{if(!n.current||!s.current)return;i.uTime.value=l.clock.elapsedTime;const f=window.icebreakerThaw||0,c=C.clamp((f-t)*2,0,1);i.uState.value=c;const u=Math.sin(l.clock.elapsedTime*8+t*10)*c;if(n.current.position.y=o[1]+(u>0?u*2:0)+15,c>0){const m=0-o[0],h=0-(o[2]- -200),x=Math.sqrt(m*m+h*h)||1;n.current.position.x=o[0]+m/x*(c*20),n.current.position.z=o[2]+h/x*(c*20)}else n.current.position.x=o[0],n.current.position.z=o[2]}),e.jsx("group",{ref:n,position:[o[0],o[1]+15,o[2]],children:e.jsx(oe,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{children:[e.jsx("planeGeometry",{args:[20,30]}),e.jsx("shaderMaterial",{ref:s,vertexShader:Me,fragmentShader:we,uniforms:i,transparent:!0,side:F,depthWrite:!1})]})})})},ze=({position:o})=>{const t=a.useMemo(()=>{const n=[];for(let s=0;s<60;s++){const i=Math.random()*Math.PI*2,l=30+Math.random()*80;n.push({position:[o[0]+Math.cos(i)*l,o[1],o[2]+Math.sin(i)*l],angle:i,delay:Math.random()*.5})}return n},[60,o]);return e.jsx("group",{children:t.map((n,s)=>e.jsx(be,{...n},s))})},Q=({appId:o,position:r})=>e.jsx("group",{position:r}),Te=({position:o})=>{const r=a.useRef(),[t,n]=a.useState(null);return U(),a.useEffect(()=>{new k().load("/icebreaker_logo.png",s=>{s.colorSpace=A,n(s)})},[]),p(s=>{if(r.current&&(r.current.rotation.y=s.clock.elapsedTime*.5,r.current.position.y=o[1]+Math.sin(s.clock.elapsedTime*2)*5,r.current.material)){const i=window.icebreakerThaw||0;r.current.material.opacity=i*.9,r.current.scale.setScalar(.01+i)}}),t?e.jsxs("mesh",{ref:r,position:o,children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:B,side:F})]}):null},Se=({numTrees:o=30,radius:r=50,centerZ:t=-500})=>{const n=a.useRef(),s=a.useRef();U();const i=a.useMemo(()=>new N,[]),l=a.useMemo(()=>{const f=[];for(let c=0;c<o;c++){const u=c/o*Math.PI*2+Math.random()*.5,m=r+Math.random()*20;f.push({position:new b(Math.cos(u)*m,-18,Math.sin(u)*m+t),rotation:new te(0,u+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return f},[o,r,t]);return p(()=>{if(!n.current||!s.current)return;const f=window.icebreakerThaw||0;for(let c=0;c<o;c++){const u=l[c],m=Math.max(0,(f-u.delay)*2),h=C.clamp(m,0,1)*u.scale;i.position.copy(u.position),i.rotation.copy(u.rotation),i.scale.setScalar(h),i.updateMatrix(),n.current.setMatrixAt(c,i.matrix),i.position.y+=18*h,i.updateMatrix(),s.current.setMatrixAt(c,i.matrix)}n.current.instanceMatrix.needsUpdate=!0,s.current.instanceMatrix.needsUpdate=!0}),e.jsxs("group",{children:[e.jsxs("instancedMesh",{ref:n,args:[null,null,o],children:[e.jsx("cylinderGeometry",{args:[.5,1,20,8]}),e.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),e.jsxs("instancedMesh",{ref:s,args:[null,null,o],children:[e.jsx("sphereGeometry",{args:[8,4,4]}),e.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},Pe=`
  uniform float uThaw;
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Dali melt effect:
    // Cylinder local Z corresponds to World Y (because of Math.PI/2 X-rotation).
    // We want it to sag downwards (negative local Z).
    
    float angle = atan(pos.y, pos.x);
    // Add organic variation based on angle and position along the cylinder
    float droopVariation = sin(angle * 8.0 + uTime * 2.0) * 0.5 + 0.5;
    droopVariation += sin(pos.y * 0.05) * 0.5 + 0.5;
    
    // Ensure the minimum melt amount is large enough to flatten the entire cave!
    // Top of the cave is pos.z = -120. Needs to reach +19. So meltAmount must be at least 140.
    float meltAmount = uThaw * 500.0 * (0.4 + droopVariation * 0.6);
    
    pos.z += meltAmount;
    
    // Pool outwards exactly at the ocean surface level (World Y = -19)
    // World Y = -19 means pos.z = 19.0
    if (pos.z > 19.0) {
       // Bulge outwards (local X and Y)
       float bulge = (pos.z - 19.0) * 0.5 * uThaw;
       vec2 dir = normalize(pos.xy);
       pos.xy += dir * bulge;
       // Clamp to ground level so it forms a puddle that blends into the ocean
       pos.z = 19.0;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,Re=`
  uniform sampler2D tMap;
  uniform float uThaw;
  varying vec2 vUv;
  
  void main() {
    // Distort UVs as it melts
    vec2 distortedUv = vUv;
    distortedUv.y -= uThaw * 0.5; // Texture slides down
    
    vec4 texColor = texture2D(tMap, distortedUv);
    
    // Fade to vibrant electric blue with greens
    vec3 waterColor = vec3(0.0, 0.95, 0.8);
    vec3 finalColor = mix(texColor.rgb, waterColor, clamp(uThaw * 1.5, 0.0, 1.0));
    
    // We KEEP alpha at 1.0 so it forms a permanent flat ocean layer on the ground
    float alpha = 1.0;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`,Ce=({startZ:o,endZ:r})=>{const t=a.useRef(),n=a.useRef(),[s,i]=a.useState(null),l=Math.abs(r-o),f=(o+r)/2,c=a.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return a.useEffect(()=>{new k().load("/assets/images/ice_cavern.jpg",u=>{u.wrapS=O,u.wrapT=O,u.repeat.set(4,2),u.colorSpace=A,i(u),c.tMap.value=u})},[c]),p(u=>{if(n.current){const m=window.icebreakerThaw||0;c.uThaw.value=m,c.uTime.value=u.clock.elapsedTime}}),s?e.jsxs("mesh",{ref:t,position:[0,0,f],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[120,120,l,128,128,!0]}),e.jsx("shaderMaterial",{ref:n,vertexShader:Pe,fragmentShader:Re,uniforms:c,transparent:!0,side:P})]}):null},ke=({position:o})=>{const r=a.useRef();return p(t=>{if(r.current){const n=window.icebreakerThaw||0,s=C.lerp(.01,50,Math.pow(n,2));r.current.scale.setScalar(s),r.current.visible=n>0}}),e.jsxs("mesh",{ref:r,position:[o[0],o[1]+1,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[20,64]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},Ie=({position:o})=>{const r=a.useRef();return p(t=>{if(r.current){const n=window.icebreakerThaw||0;r.current.scale.setScalar(n>0?1:.001)}}),e.jsxs("mesh",{ref:r,position:[o[0],o[1]+1.5,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[96,64]}),e.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},Le=({position:o})=>{const r=a.useRef();return p(()=>{if(r.current){const t=window.icebreakerThaw||0;r.current.opacity=1-Math.pow(t,2),r.current.transparent=!0}}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:o,children:[e.jsx("planeGeometry",{args:[1e3,3e3]}),e.jsx("meshStandardMaterial",{ref:r,color:"#001133",roughness:.1,metalness:.8})]})},_e=({centerZ:o})=>{const r=a.useRef(),t=a.useRef(),n=a.useMemo(()=>({uColorBottom:{value:new G("#ffaa55")},uColorTop:{value:new G("#00f3ff")},uOpacity:{value:0}}),[]);return p(()=>{const s=window.icebreakerThaw||0;r.current&&(r.current.uniforms.uOpacity.value=s),t.current&&(t.current.intensity=s*.6)}),e.jsxs("group",{children:[e.jsxs("mesh",{scale:2e3,children:[e.jsx("sphereGeometry",{args:[1,32,32]}),e.jsx("shaderMaterial",{ref:r,side:P,transparent:!0,depthWrite:!1,uniforms:n,vertexShader:`
            varying vec3 vPosition;
            void main() {
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,fragmentShader:`
            uniform vec3 uColorBottom;
            uniform vec3 uColorTop;
            uniform float uOpacity;
            varying vec3 vPosition;
            void main() {
              // Normalize local Y position to create a gradient
              float h = normalize(vPosition).y;
              // Map h from [-1, 1] to [0, 1], focusing the gradient on the horizon
              float mixVal = smoothstep(-0.2, 0.5, h);
              vec3 finalColor = mix(uColorBottom, uColorTop, mixVal);
              gl_FragColor = vec4(finalColor, uOpacity);
            }
          `})]}),e.jsx("directionalLight",{ref:t,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),e.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},Ge=()=>{const o=U(),[r,t]=a.useState(!1),[n,s]=a.useState(!1),[i,l]=a.useState(!1),f=a.useRef({triggered:!1,timer:0}),c=a.useRef({triggered:!1,timer:0});return a.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),p((u,m)=>{const h=o.offset;!c.current.triggered&&h>=.22&&(c.current.triggered=!0,l(!0),window.icebreakerCaveLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerCaveLocked&&(o.el&&(o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight)),c.current.timer+=m,c.current.timer>1.5&&(window.icebreakerCaveLocked=!1,l(!1),o.el&&(o.el.style.overflow="auto"))),!r&&h>=.265&&window.icebreakerThaw<1&&(t(!0),window.icebreakerThawLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerThawLocked?(o.el&&(o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight)),window.icebreakerThaw+=m*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,o.el&&!n&&(o.el.style.overflow="auto"),t(!1))):h<.2&&(window.icebreakerThaw=0),!f.current.triggered&&h>=.285&&window.icebreakerThaw>=1&&(f.current.triggered=!0,s(!0),window.icebreakerTextLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerTextLocked&&(o.el&&(o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight)),f.current.timer+=m,f.current.timer>1.5&&(window.icebreakerTextLocked=!1,s(!1),o.el&&(o.el.style.overflow="auto")))}),null},Ee=({position:o,rotation:r,visible:t=!0})=>e.jsxs("group",{position:o,rotation:r,visible:t,children:[e.jsx(Ge,{}),e.jsx(_e,{centerZ:0}),e.jsx(Ce,{startZ:1e3,endZ:-1e3}),e.jsx(Le,{position:[0,-20,0]}),e.jsx(ke,{position:[0,-20,0]}),e.jsx(Ie,{position:[0,-20,0]}),e.jsx(v,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),e.jsx(v,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),e.jsx(je,{position:[0,-20,0]}),e.jsx(Te,{position:[0,30,0]}),e.jsx(Se,{radius:60,centerZ:0}),e.jsx(ze,{position:[0,-20,0]}),e.jsx(Q,{appId:"icebreaker",position:[-80,20,-200]})]}),Fe=`
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScrollProgress; // 0 to 1 based on how close to center we are
  
  void main() {
    vUv = uv;
    
    // Distance from center of the plane
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    vec2 offset = vUv - center;
    
    // Create cymatic standing waves that intensify as user approaches center
    float wave1 = sin(dist * 100.0 - uTime * 2.0) * 0.5;
    float wave2 = sin(dist * 50.0 + uTime * 4.0) * 0.5;
    float angular = sin(atan(offset.y, offset.x + 0.000001) * 8.0 + uTime);
    
    // Combine waves for a geometric mandala-like ripple
    float elevation = (wave1 + wave2) * angular * uScrollProgress;
    
    vec3 pos = position;
    pos.z += elevation * 15.0; // Z is up because plane is rotated
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,Ae=`
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScrollProgress;
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Colors
    vec3 baseColor = vec3(0.125, 0.153, 0.2); // #202733
    vec3 highlightColor = vec3(0.376, 0.663, 1.0); // #60a9ff
    
    // Rings
    float rings = sin(dist * 100.0 - uTime * 2.0);
    vec2 offset = vUv - center;
    float angular = sin(atan(offset.y, offset.x + 0.000001) * 8.0 + uTime);
    
    float intensity = max(0.0, rings * angular) * uScrollProgress;
    
    // Sinkhole at the center
    // vPosition.xy gives us local plane coordinates
    float distFromCenter = length(vPosition.xy);
    
    if (distFromCenter < 80.0) {
      discard; // The physical hole
    }
    
    // Fade out edges into the hole
    float holeAlpha = smoothstep(80.0, 180.0, distFromCenter);
    
    vec3 color = mix(baseColor, highlightColor, intensity);
    
    // Add a glowing rim around the sinkhole
    float rimGlow = smoothstep(150.0, 80.0, distFromCenter);
    color += highlightColor * rimGlow * 1.5;
    
    gl_FragColor = vec4(color, holeAlpha);
  }
`,Be=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,Ue=({position:o,visible:r})=>e.jsxs("group",{visible:r,position:o,children:[e.jsx(v,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),e.jsx(v,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),e.jsx(v,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),We=({position:o,visible:r})=>{const t=U(),n=a.useRef(),s=a.useRef(),i=a.useRef(),[l,f]=a.useState(null),[c,u]=a.useState(null),[m,h]=a.useState(!1),x=a.useRef({triggered:!1,timer:0});a.useEffect(()=>{window.mindwaveLocked=!1,new k().load("/mindwave-logo.png",y=>{y.colorSpace=A,f(y)}),new k().load("/tribal-sun.png",y=>{y.colorSpace=A,u(y)})},[]);const M=o?o[2]:0,w=a.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return p((y,g)=>{if(!r)return;const I=t.offset;!x.current.triggered&&I>=.075&&(x.current.triggered=!0,h(!0),window.mindwaveLocked=!0,t.el&&(t.el.style.overflow="hidden",t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight))),window.mindwaveLocked&&(t.el&&(t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight)),x.current.timer+=g,x.current.timer>1.5&&(window.mindwaveLocked=!1,h(!1),t.el&&(t.el.style.overflow="auto")));const j=y.clock.elapsedTime;if(n.current){n.current.uniforms.uTime.value=j;const z=Math.abs(y.camera.position.z-M);let T=1-Math.min(z/1e3,1);T=Math.pow(T,2),n.current.uniforms.uScrollProgress.value=T}if(s.current){s.current.position.y=-7+Math.sin(j*2)*2;const z=1+Math.sin(j*4)*.05;s.current.scale.set(z,z,1),s.current.rotation.y=0}if(i.current){i.current.position.y=125+Math.sin(j*2)*2,i.current.rotation.z=j*.1;const z=1+Math.sin(j*3)*.05;i.current.scale.set(z,z,1)}}),e.jsxs("group",{visible:r,position:o,children:[e.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[e.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),e.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:Be,side:P,depthWrite:!1})]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[e.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),e.jsx("shaderMaterial",{ref:n,vertexShader:Fe,fragmentShader:Ae,uniforms:w,transparent:!0,side:F,wireframe:!1})]}),c&&e.jsxs("mesh",{ref:i,position:[0,-10,-85],children:[e.jsx("planeGeometry",{args:[140,140]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0,side:F,depthWrite:!1,blending:B,color:"#00ffff",opacity:.6})]}),l&&e.jsxs("mesh",{ref:s,position:[0,-10,-80],children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:l,transparent:!0,side:F,depthWrite:!1,blending:B})]}),e.jsx(Ue,{position:[0,-5,-80],visible:!0}),e.jsx(Q,{appId:"mindwave",position:[40,0,-40]})]})},He=({position:o})=>{const r=a.useRef(),[t,n]=a.useState(null);return a.useEffect(()=>{new k().load("/legal_eagle_logo.png",s=>{s.colorSpace=A,n(s)})},[]),p(s=>{r.current&&(r.current.position.y=o[1]+Math.sin(s.clock.elapsedTime*1.5)*1.5)}),t?e.jsxs("group",{position:o,children:[e.jsxs("mesh",{ref:r,children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:1,depthWrite:!1,side:F})]}),e.jsx("pointLight",{color:"#ffffff",intensity:2,distance:100,position:[0,0,20]})]}):null},Oe=()=>{const[o,r]=a.useState(null);return a.useEffect(()=>{new k().load("/legal_eagle_courtroom_bg.jpg",t=>{t.colorSpace=A,r(t)})},[]),o?e.jsxs("mesh",{position:[0,0,-600],children:[e.jsx("planeGeometry",{args:[1600,900]}),e.jsx("meshBasicMaterial",{map:o,side:F,toneMapped:!1})]}):null},Y=({position:o,text:r,color:t})=>{const n=a.useRef();return p(s=>{n.current&&(n.current.position.y=o[1]+Math.sin(s.clock.elapsedTime*2+o[0])*2)}),e.jsxs("group",{ref:n,position:o,children:[e.jsxs(v,{fontSize:12,color:t,maxWidth:120,textAlign:"center",anchorX:"center",anchorY:"middle",children:[r,e.jsx("meshBasicMaterial",{color:t,transparent:!0,opacity:.9})]}),e.jsx("pointLight",{color:t,intensity:1,distance:100})]})},Ne=({position:o})=>{const r=a.useRef();return p(t=>{r.current&&(r.current.position.y=Math.sin(t.clock.elapsedTime*2)*40)}),e.jsxs("group",{position:o,children:[e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("planeGeometry",{args:[60,80]}),e.jsx("meshBasicMaterial",{color:"#ffffff",side:F,transparent:!0,opacity:.8})]}),[...Array(10)].map((t,n)=>e.jsxs("mesh",{position:[0,30-n*6,.5],children:[e.jsx("planeGeometry",{args:[40+Math.random()*10,2]}),e.jsx("meshBasicMaterial",{color:"#00ffcc"})]},n)),e.jsxs("mesh",{ref:r,position:[0,0,1],children:[e.jsx("planeGeometry",{args:[70,2]}),e.jsx("meshBasicMaterial",{color:"#ff00ff",transparent:!0,opacity:.8})]}),e.jsx("pointLight",{color:"#ff00ff",intensity:2,distance:100,position:[0,0,5]})]})},Ve=({position:o,rotation:r,visible:t})=>e.jsxs("group",{position:o,rotation:r,visible:t,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx(Oe,{}),e.jsx(Ne,{position:[0,-50,-100]}),e.jsx(He,{position:[0,20,-200]}),e.jsx(Y,{position:[-140,-20,-100],text:"AI Contract\\nCreation",color:"#00ffcc"}),e.jsx(Y,{position:[140,-20,-100],text:"Intelligent\\nContract Review",color:"#ff00ff"}),e.jsx(Y,{position:[0,-50,-50],text:"Real-Time\\nEdits & Formatting",color:"#d4af37"})]}),q=o=>{const t=new me;o==="interceptor"?(t.moveTo(1*1.8,0),t.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),t.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),t.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),t.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):o==="viper"?(t.moveTo(1*1.2,1*.3),t.lineTo(1*.4,1*.4),t.lineTo(-1*.8,1*1.2),t.lineTo(-1*1.2,1*.8),t.lineTo(-1*.8,0),t.lineTo(-1*1.2,-1*.8),t.lineTo(-1*.8,-1*1.2),t.lineTo(1*.4,-1*.4),t.lineTo(1*1.2,-1*.3),t.lineTo(1*.6,0)):o==="bulwark"&&(t.moveTo(1*1.5,0),t.lineTo(1*.8,1*1.2),t.lineTo(-1*.5,1*1.5),t.lineTo(-1*1.5,1*.8),t.lineTo(-1*1.5,-1*.8),t.lineTo(-1*.5,-1*1.5),t.lineTo(1*.8,-1*1.2));const n={steps:1,depth:o==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},s=new he(t,n);return s.center(),s.rotateY(-Math.PI/2),s.rotateZ(-Math.PI/2),s},De=({position:o})=>{const r=a.useRef();return p((t,n)=>{r.current&&(r.current.rotation.z-=n*.1,r.current.rotation.x=Math.sin(t.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:r,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,300,32]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[400,40,32,64]}),e.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((t,n)=>e.jsxs("mesh",{position:[Math.cos(t)*200,0,Math.sin(t)*200],rotation:[0,-t,Math.PI/2],children:[e.jsx("cylinderGeometry",{args:[20,20,300,16]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},n)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((t,n)=>e.jsxs("mesh",{position:[Math.cos(t)*400,0,Math.sin(t)*400],rotation:[Math.PI/2,0,-t],children:[e.jsx("boxGeometry",{args:[60,60,90]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${n}`))]})},Xe=({position:o})=>{const r=a.useRef(),t=a.useMemo(()=>q("bulwark"),[]);return p((n,s)=>{r.current&&(r.current.position.y=Math.sin(n.clock.elapsedTime*.2)*40,r.current.rotation.y+=s*.05,r.current.rotation.z=Math.sin(n.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:r,scale:[120,120,120],children:[e.jsx("mesh",{geometry:t,children:e.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),e.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),e.jsxs("mesh",{position:[0,0,1.5],children:[e.jsx("sphereGeometry",{args:[.2,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},Ye=({position:o})=>{const i=a.useMemo(()=>new N,[]),l=a.useMemo(()=>new N,[]),f=a.useRef(),c=a.useRef(),u=a.useRef(),m=a.useRef(),h=a.useMemo(()=>q("interceptor"),[]),x=a.useMemo(()=>q("viper"),[]),M=a.useMemo(()=>{const z=new ue(.5,.5,20,4);return z.rotateX(Math.PI/2),z},[]),w=a.useMemo(()=>Array.from({length:80},(z,L)=>{const T=L>=40;return{pos:new b((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new b,target:new b,team:T?1:0,meshIndex:T?L-40:L,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),y=a.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new b,vel:new b,color:new G,life:0})),[60]),g=a.useMemo(()=>new b,[]),I=a.useMemo(()=>new b,[]),j=a.useMemo(()=>new G,[]);return p((z,L)=>{if(!f.current||!c.current||!u.current||!m.current)return;let T=0;w.forEach(d=>{if(d.state===0){if(Math.random()<.02||d.target.lengthSq()===0){const R=w[Math.floor(Math.random()*80)];R&&R.team!==d.team&&R.state===0?(d.target.copy(R.pos),d.target.x+=(Math.random()-.5)*200,d.target.y+=(Math.random()-.5)*200,d.target.z+=(Math.random()-.5)*200):d.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}g.subVectors(d.target,d.pos);const _=g.length();if(_>150&&_<800&&Math.random()<.03){const R=y.find(X=>!X.active);R&&(R.active=!0,R.pos.copy(d.pos),R.vel.copy(g).normalize().multiplyScalar(2500),R.color.set(d.team===0?"#00ffff":"#ff3300"),R.life=.8)}const S=g.normalize().multiplyScalar(400*L);d.vel.add(S),d.vel.clampLength(0,600),d.pos.addScaledVector(d.vel,L),d.trail.push(d.pos.clone()),d.trail.length>5&&d.trail.shift(),i.position.copy(d.pos);const W=i.position.clone().add(d.vel);i.lookAt(W),I.copy(S).cross(d.vel),i.rotateZ(I.y*.01),i.scale.set(30,30,30)}else{d.explosionTimer+=L,i.position.copy(d.pos),i.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const _=30*Math.max(.1,1-d.explosionTimer*2);i.scale.set(_,_,_),d.explosionTimer>.5&&(d.state=0,d.health=100,d.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),d.vel.set(0,0,0),d.trail=[])}i.updateMatrix(),d.team===0?(f.current.setMatrixAt(d.meshIndex,i.matrix),j.set(d.state===0?"#00aaff":"#ffaa00"),f.current.setColorAt(d.meshIndex,j)):(c.current.setMatrixAt(d.meshIndex,i.matrix),j.set(d.state===0?"#ff0033":"#ffaa00"),c.current.setColorAt(d.meshIndex,j)),d.trail.forEach((_,S)=>{if(T<400){i.position.copy(_),i.rotation.set(0,0,0);const W=S/5*10;i.scale.set(W,W,W),i.updateMatrix(),m.current.setMatrixAt(T,i.matrix),j.set(d.team===0?"#00ffff":"#ff5500"),m.current.setColorAt(T,j),T++}})});for(let d=T;d<400;d++)i.position.set(0,9999,0),i.scale.set(0,0,0),i.updateMatrix(),m.current.setMatrixAt(d,i.matrix);y.forEach((d,_)=>{d.active?(d.pos.addScaledVector(d.vel,L),d.life-=L,w.forEach(S=>{S.state===0&&d.pos.distanceTo(S.pos)<50&&(S.health-=50,d.active=!1,S.health<=0&&(S.state=1,S.explosionTimer=0))}),d.life<=0&&(d.active=!1),l.position.copy(d.pos),l.lookAt(l.position.clone().add(d.vel)),l.scale.set(1,1,1)):(l.position.set(0,9999,0),l.scale.set(0,0,0)),l.updateMatrix(),u.current.setMatrixAt(_,l.matrix),u.current.setColorAt(_,d.color)}),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),m.current.instanceMatrix.needsUpdate=!0,m.current.instanceColor&&(m.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0)}),e.jsxs("group",{position:o,children:[e.jsx("instancedMesh",{ref:f,args:[h,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:c,args:[x,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:u,args:[M,null,60],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:B})}),e.jsx("instancedMesh",{ref:m,args:[new de(1,4,4),null,400],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:B,depthWrite:!1})})]})},Ze=({position:o,rotation:r,visible:t})=>{const n=V(k,"/interstellar_logo_final.png");n.colorSpace=A;const s=U(),i=a.useRef({triggered:!1});return p(()=>{s&&s.offset>=.41&&s.offset<=.43&&!i.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,i.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),e.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),e.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:P})]}),e.jsx(De,{position:[0,-200,-800]}),e.jsx(Xe,{position:[0,-120,-100]}),e.jsx(Ye,{position:[0,-50,0]}),e.jsxs("group",{position:[0,120,200],children:[e.jsxs("mesh",{position:[0,50,0],children:[e.jsx("planeGeometry",{args:[180,180]}),e.jsx("meshBasicMaterial",{map:n,transparent:!0,depthWrite:!1})]}),e.jsx(v,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),e.jsx(v,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),e.jsx(Q,{appId:"interstellar",position:[-150,100,200]})]})},qe=({position:o})=>{const r=a.useRef(),t=a.useMemo(()=>({uTime:{value:0},uColor:{value:new G("#00ffff")}}),[]);return p(n=>{r.current&&(r.current.uniforms.uTime.value=n.clock.elapsedTime)}),e.jsxs("mesh",{position:o,children:[e.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),e.jsx("shaderMaterial",{ref:r,transparent:!0,side:F,blending:B,depthWrite:!1,uniforms:t,vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;
          
          float rand(vec2 co){
              return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
          }
          
          void main() {
            // Divide into vertical strips
            float stripX = floor(vUv.x * 80.0);
            
            // Each strip has a slightly different offset and speed
            float stripOffset = rand(vec2(stripX, 0.0)) * 100.0;
            float stripSpeed = 3.0 + rand(vec2(stripX, 1.0)) * 2.0;
            
            // Flow DOWN: vUv.y * freq + uTime * speed
            float yPos = vUv.y * 30.0 + (uTime * stripSpeed);
            
            // Create the falling water streaks
            float streak = sin(yPos + stripOffset);
            streak = smoothstep(0.5, 1.0, streak);
            
            // Fade out the edges horizontally
            float edgeFade = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
            
            // Fade out at the bottom where it hits the ocean
            float bottomFade = smoothstep(0.0, 0.2, vUv.y);
            
            float alpha = streak * edgeFade * bottomFade * 0.9;
            
            // Add a bright highlight to the core of the streaks
            vec3 finalColor = mix(uColor, vec3(1.0, 1.0, 1.0), streak * 0.5);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `})]})},Qe=()=>{const o=a.useRef(),r=a.useMemo(()=>({uTime:{value:0},uColor:{value:new G("#0044ff")},uHighlight:{value:new G("#00ffff")}}),[]);return p(t=>{o.current&&(o.current.uniforms.uTime.value=t.clock.elapsedTime)}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),e.jsx("shaderMaterial",{ref:o,transparent:!0,wireframe:!0,uniforms:r,vertexShader:`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Gentle ocean rolling waves
            float elevation = sin(pos.x * 0.005 + uTime * 0.5) * 50.0 
                            + sin(pos.y * 0.005 + uTime * 0.3) * 50.0;
                            
            // Massive ripple around the waterfall impact zone (assumed at 0,0)
            float dist = length(pos.xy);
            float ripple = sin(dist * 0.02 - uTime * 5.0) * 40.0;
            float rippleFade = smoothstep(1500.0, 200.0, dist); // Only near center
            
            pos.z += elevation + (ripple * rippleFade);
            vElevation = pos.z;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,fragmentShader:`
          uniform vec3 uColor;
          uniform vec3 uHighlight;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = smoothstep(-50.0, 50.0, vElevation);
            vec3 color = mix(uColor, uHighlight, mixFactor);
            
            float dist = length(vUv - 0.5);
            float fade = smoothstep(0.5, 0.2, dist);
            
            gl_FragColor = vec4(color, fade * 0.6);
          }
        `})]})},Ke=({position:o,rotation:r,visible:t})=>{const[n,s]=a.useState(null);return a.useEffect(()=>{new k().load("/cloveh2o_logo.png",l=>{l.colorSpace=A,s(l)})},[]),e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:P})]}),e.jsx(Qe,{}),e.jsx(qe,{position:[0,1800,-800]}),e.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),e.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),e.jsxs("group",{position:[0,0,-300],children:[n&&e.jsxs("mesh",{position:[0,80,0],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:n,transparent:!0,depthWrite:!1,blending:B})]}),e.jsx(v,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),e.jsx(v,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},D=({color:o,number:r,groupRef:t,armRef:n})=>e.jsxs("group",{ref:t,children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.3,roughness:.4})]}),e.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("group",{position:[0,17,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2.8,32,32]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.8,metalness:.5})]}),e.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[e.jsx("boxGeometry",{args:[3.5,2,2]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),e.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:n,children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsxs("mesh",{position:[-1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),e.jsxs("mesh",{position:[1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),r&&e.jsx(v,{position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:r})]}),$e=({position:o})=>{const r=a.useRef(),t=a.useRef(),n=a.useRef(),s=a.useRef(),i=a.useRef(),l=a.useRef(),f=a.useMemo(()=>new b(100,0,0),[]),c=a.useMemo(()=>new b(100,0,20),[]),u=a.useMemo(()=>new b(30,0,100),[]),m=a.useMemo(()=>new b(0,0,-20),[]),h=a.useMemo(()=>new b(20,0,220),[]),x=a.useMemo(()=>new b,[]),M=a.useMemo(()=>new b,[]);return a.useMemo(()=>new b,[]),p(w=>{const y=w.clock.elapsedTime%6;if(n.current&&n.current.rotation.set(0,0,-.3),y<.5)t.current&&t.current.position.copy(f),s.current&&s.current.position.copy(c),i.current&&i.current.position.copy(u),r.current&&r.current.position.copy(m),l.current&&l.current.position.copy(m).add(x.set(4.5,12,2));else if(y<4){const g=(y-.5)/3.5;if(t.current&&(g<.5?t.current.position.lerpVectors(f,x.set(100,0,110),g*2):t.current.position.lerpVectors(M.set(100,0,110),h,(g-.5)*2)),s.current&&t.current&&s.current.position.lerpVectors(c,x.set(h.x+8,0,h.z-8),g),i.current&&i.current.position.lerpVectors(u,x.set(h.x-8,0,h.z+8),g),l.current)if(y<1.5)l.current.position.copy(m).add(x.set(4.5,12,2));else{const I=(y-1.5)/2.5,j=Math.sin(I*Math.PI)*45;l.current.position.lerpVectors(m,h,I),l.current.position.y+=j+18}}else if(y<5)t.current&&t.current.position.lerpVectors(h,x.set(20,0,240),y-4),l.current&&t.current&&l.current.position.copy(t.current.position).add(x.set(0,12,3)),s.current&&(s.current.position.y=0),i.current&&(i.current.position.y=0);else if(y<5.5)n.current&&n.current.rotation.set(Math.PI,0,0),l.current&&t.current&&l.current.position.copy(t.current.position).add(x.set(4.5,20,0));else if(n.current&&n.current.rotation.set(-Math.PI/4,0,0),l.current&&t.current){const g=y-5.5,I=Math.abs(Math.cos(g*8))*10;l.current.position.copy(t.current.position).add(x.set(4.5,I,4))}}),e.jsxs("group",{position:o,children:[e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),e.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[e.jsx("planeGeometry",{args:[400,40]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),e.jsx(D,{color:"#0088ff",number:"QB",groupRef:r}),e.jsx(D,{color:"#00ffff",number:"80",groupRef:t,armRef:n}),e.jsx(D,{color:"#ff0044",number:"CB",groupRef:s}),e.jsx(D,{color:"#ff0044",number:"S",groupRef:i}),e.jsxs("mesh",{ref:l,children:[e.jsx("sphereGeometry",{args:[2,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},Je=()=>e.jsxs("group",{position:[0,300,-300],rotation:[.1,0,0],children:[e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("boxGeometry",{args:[800,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[0,0,10.1],children:[e.jsx("planeGeometry",{args:[790,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-580,0,150],rotation:[0,Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-571,0,155],rotation:[0,Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[580,0,150],rotation:[0,-Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[571,0,155],rotation:[0,-Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsxs("mesh",{position:[390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsx("gridHelper",{args:[800,80,"#00ff00","#004400"],position:[0,0,11],rotation:[Math.PI/2,0,0]}),e.jsx(v,{position:[0,80,15],fontSize:70,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ff00",anchorX:"center",anchorY:"middle",children:"FANTASY QUANT"}),e.jsxs(v,{position:[0,0,15],fontSize:35,color:"#00ffff",outlineWidth:.01,outlineColor:"#0088ff",anchorX:"center",anchorY:"middle",children:["PREDICTING: 42 YD PASS ","->"," TOUCHDOWN"]}),e.jsx(v,{position:[0,-60,15],fontSize:22,color:"#ffffff",maxWidth:750,textAlign:"center",lineHeight:1.5,anchorX:"center",anchorY:"middle",children:'"This is going to Rice, WR #80, post route contested catch in traffic over the safety and cornerback... TOUCHDOWN!!"'}),e.jsx(v,{position:[-580,40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"WIN PROB: 94%"}),e.jsx(v,{position:[-580,-40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"EXPECTED PTS: +6.0"}),e.jsx(v,{position:[580,40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"DEF COVERAGE: COVER 2"}),e.jsx(v,{position:[580,-40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"MISMATCH DETECTED"})]}),et=()=>{const r=a.useRef(),t=a.useMemo(()=>new N,[]),n=a.useMemo(()=>{const i=new Float32Array(9e3),l=new G,f=["#ff0000","#0000ff","#ffffff","#ffff00","#00ff00"];for(let c=0;c<3e3;c++)l.set(f[Math.floor(Math.random()*f.length)]),l.toArray(i,c*3);return i},[3e3]),s=a.useMemo(()=>{const i=[];for(let l=0;l<3e3;l++){const f=Math.random()*Math.PI*2,c=800+Math.random()*1e3,u=50+(c-800)*.5+Math.random()*50;i.push({x:Math.cos(f)*c,y:u,z:Math.sin(f)*c,offset:Math.random()*Math.PI*2})}return i},[3e3]);return p(i=>{if(!r.current)return;const l=i.clock.elapsedTime*5;s.forEach((f,c)=>{t.position.set(f.x,f.y+Math.sin(l+f.offset)*15,f.z),t.updateMatrix(),r.current.setMatrixAt(c,t.matrix)}),r.current.instanceMatrix.needsUpdate=!0}),e.jsxs("instancedMesh",{ref:r,args:[null,null,3e3],children:[e.jsx("boxGeometry",{args:[10,10,10],children:e.jsx("instancedBufferAttribute",{attach:"attributes-color",args:[n,3]})}),e.jsx("meshBasicMaterial",{vertexColors:!0})]})},tt=({position:o,rotation:r,visible:t})=>{const n=V(k,"/fantasy_quant_stadium.jpg");return n.colorSpace=A,n.wrapS=O,n.repeat.set(-1,1),e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[3e3,32,32]}),e.jsx("meshBasicMaterial",{map:n,side:P})]}),e.jsx(et,{}),e.jsx($e,{position:[0,-200,100]}),e.jsx("ambientLight",{intensity:.5,color:"#00ff00"}),e.jsx("pointLight",{color:"#00ff00",intensity:3,distance:2e3,position:[0,500,500]}),e.jsx("pointLight",{color:"#0088ff",intensity:2,distance:2e3,position:[0,500,-500]}),e.jsx(Je,{})]})},ot=()=>e.jsxs("group",{position:[0,-20,-1e3],children:[e.jsxs("mesh",{position:[-15,0,0],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[1.5,1.5,4e3,8]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:1,wireframe:!0})]}),e.jsxs("mesh",{position:[15,0,0],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[1.5,1.5,4e3,8]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:1,wireframe:!0})]}),Array.from({length:200}).map((o,r)=>e.jsxs("mesh",{position:[0,0,-2e3+r*20],children:[e.jsx("boxGeometry",{args:[32,1,2]}),e.jsx("meshStandardMaterial",{color:"#0044ff",emissive:"#0044ff",emissiveIntensity:.5})]},r))]}),rt=()=>{const o=a.useRef(),r=a.useMemo(()=>Array.from({length:150}).map(()=>({x:(Math.random()-.5)*400,y:(Math.random()-.5)*400,z:Math.random()*2e3,speed:10+Math.random()*20})),[]);return p(()=>{o.current&&o.current.children.forEach((t,n)=>{t.position.z+=r[n].speed,t.position.z>500&&(t.position.z-=2e3)})}),e.jsx("group",{ref:o,children:r.map((t,n)=>e.jsxs("mesh",{position:[t.x,t.y,t.z],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[.2,.2,100,4]}),e.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.3})]},n))})},st=({worldPosition:o})=>{const r=a.useRef(),t=V(k,"/assets/images/contango_logo.png");return p(n=>{if(r.current){const i=n.camera.position.clone().sub(new b(...o));r.current.position.copy(i),r.current.rotation.copy(n.camera.rotation);const l=Math.sin(n.clock.elapsedTime*15)*.5,f=Math.cos(n.clock.elapsedTime*12)*.2;r.current.position.y+=l,r.current.position.z+=f}}),e.jsxs("group",{ref:r,children:[e.jsxs("group",{position:[0,-15,0],children:[e.jsxs("mesh",{position:[0,-2,-15],rotation:[.2,0,0],children:[e.jsx("boxGeometry",{args:[40,5,2]}),e.jsx("meshStandardMaterial",{color:"#111",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-20,2,-10],rotation:[0,Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[20,2,-10],rotation:[0,-Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[0,-5,10],children:[e.jsx("boxGeometry",{args:[38,20,2]}),e.jsx("meshStandardMaterial",{color:"#0a0a0a",roughness:.8})]})]}),e.jsxs("group",{position:[0,5,-50],children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("planeGeometry",{args:[40,20]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:.9,depthWrite:!1})]}),e.jsx(v,{font:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",position:[-30,20,0],fontSize:4,color:"#00ff00",anchorX:"left",children:"BTC/USD  +5.42%"}),e.jsx(v,{font:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",position:[-30,14,0],fontSize:3,color:"#ffffff",anchorX:"left",children:"VOL: 1.2M"}),e.jsx(v,{font:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",position:[-30,9,0],fontSize:3,color:"#00ff00",anchorX:"left",children:"SIGNAL: STRONG BUY"}),e.jsx(v,{font:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",position:[30,20,0],fontSize:4,color:"#ff0044",anchorX:"right",children:"ETH/USD  -1.12%"}),e.jsx(v,{font:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",position:[30,14,0],fontSize:3,color:"#ffffff",anchorX:"right",children:"VOL: 840K"}),e.jsx(v,{font:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",position:[30,9,0],fontSize:3,color:"#ff0044",anchorX:"right",children:"SIGNAL: SELL"}),e.jsx(v,{font:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",position:[0,-5,0],fontSize:2,color:"#00ffff",anchorX:"center",opacity:.7,transparent:!0,children:"ALGO > EXECUTING ORDER BATCH > LATENCY 1.2ms"})]})]})},nt=({position:o,rotation:r,visible:t})=>e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000205",side:P})]}),e.jsx(ot,{}),e.jsx(rt,{}),t&&e.jsx(st,{worldPosition:o}),e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[0,50,-100],intensity:2,color:"#00ffcc",distance:500})]}),at=({position:o,rotation:r,visible:t})=>{const n=a.useRef(),s=a.useRef(),i=V(k,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return p(l=>{n.current&&(n.current.position.y=Math.sin(l.clock.elapsedTime*1.5)*5),s.current&&(s.current.rotation.y+=.005,s.current.rotation.z+=.002)}),e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1500,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:P})]}),e.jsxs("group",{children:[e.jsx(ge,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:e.jsxs("mesh",{ref:n,position:[0,0,-500],children:[e.jsx("planeGeometry",{args:[400,100]})," ",e.jsx("meshBasicMaterial",{map:i,transparent:!0,opacity:1,side:F,depthWrite:!1})]})}),e.jsx(Z,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),e.jsx(Z,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),e.jsx("ambientLight",{intensity:.5,color:"#002244"}),e.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},it=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,lt=`
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    
    // Create falling columns
    float columns = 60.0;
    vec2 gridId = vec2(floor(uv.x * columns), uv.y);
    
    // Vary falling speed per column
    float speed = random(vec2(gridId.x, 0.0)) * 0.5 + 0.2;
    float offset = uTime * speed;
    
    // Add grid lines
    float yPos = fract(uv.y * 20.0 + offset);
    float glow = smoothstep(0.1, 0.9, yPos);
    
    // Abstract characters logic (dots/dashes)
    float char = step(0.5, random(floor(uv * vec2(columns, 20.0) + vec2(0.0, offset))));
    
    vec3 color = vec3(0.0, 1.0, 0.2) * glow * char;
    
    // Base glass reflection
    float glass = pow(1.0 - abs(uv.x - 0.5) * 2.0, 3.0) * 0.3;
    color += vec3(0.0, 0.2, 0.0) * glass;

    gl_FragColor = vec4(color, uOpacity);
  }
`,ct=({startZ:o=10,endZ:r=-500,visible:t=!0})=>{const n=a.useRef(),s=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);p(l=>{n.current&&t&&(n.current.uniforms.uTime.value=l.clock.elapsedTime,n.current.uniforms.uOpacity.value=C.lerp(n.current.uniforms.uOpacity.value,t?1:0,.05))});const i=a.useMemo(()=>{const l=[],c=o-r;for(let u=0;u<=100;u++){const m=o-u/100*c;l.push(new b(Math.sin(u*.1)*2,Math.cos(u*.05)*2,m))}return new pe(l)},[o,r]);return e.jsxs("mesh",{visible:t,children:[e.jsx("tubeGeometry",{args:[i,200,15,32,!1]}),e.jsx("shaderMaterial",{ref:n,vertexShader:it,fragmentShader:lt,uniforms:s,side:P,transparent:!0,blending:B})]})},ft=`
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vElevation;

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
  float cnoise(vec3 P){
    vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x); vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z); vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x); vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z); vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
    float n000 = dot(g000, Pf0); float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z)); float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z)); float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz)); float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  void main() {
    vUv = uv;
    vec3 animatedPos = position;
    animatedPos.y += uTime * 200.0;
    float noise1 = cnoise(animatedPos * 0.05);
    float noise2 = cnoise(animatedPos * 0.15) * 0.5;
    float totalNoise = noise1 + noise2;
    float finalDisplacement = abs(totalNoise) * 20.0;
    vec3 newPosition = position - normal * finalDisplacement;
    vPosition = newPosition;
    vElevation = finalDisplacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`,ut=`
  uniform float uTime;
  uniform float uOpacity;
  uniform float uLength;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vElevation;

  void main() {
    vec3 coldLow = vec3(0.01, 0.05, 0.15);
    vec3 coldHigh = vec3(0.3, 0.8, 1.0);
    vec3 finalColor = mix(coldLow, coldHigh, smoothstep(0.0, 20.0, vElevation));
    float trueLength = uLength + 200.0;
    float zDist = abs(vPosition.y); 
    float fadeEdge = 1.0 - smoothstep(trueLength/2.0 - 100.0, trueLength/2.0, zDist);
    float alpha = uOpacity * fadeEdge;
    gl_FragColor = vec4(finalColor, alpha);
  }
`,dt=({position:o,rotation:r=[0,0,0],length:t=4e3,visible:n=!0})=>{const s=a.useRef(),i=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:t}}),[t]);return p(l=>{s.current&&(s.current.uniforms.uTime.value=l.clock.elapsedTime,s.current.uniforms.uOpacity.value=n?1:0)}),e.jsx("group",{position:o,rotation:r,visible:n,children:e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[60,400,t+200,32,64,!0]}),e.jsx("shaderMaterial",{ref:s,vertexShader:ft,fragmentShader:ut,uniforms:i,transparent:!0,side:P,wireframe:!1})]})})},H=({position:o,rotation:r,length:t=4e3,radius:n=200,color:s="#ffffff",speed:i=20,visible:l=!0})=>{const f=a.useRef(),c=a.useMemo(()=>({uTime:{value:0},uColor:{value:new G(s)}}),[s]);return p(u=>{f.current&&(f.current.uniforms.uTime.value=u.clock.elapsedTime)}),e.jsxs("mesh",{visible:l,position:o,rotation:r,children:[e.jsx("cylinderGeometry",{args:[n,n,t,32,1,!0]}),e.jsx("shaderMaterial",{ref:f,transparent:!0,side:P,blending:B,depthWrite:!1,uniforms:c,vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;
          
          void main() {
            // Flowing streaks
            float streaks = sin((vUv.x * 50.0) + sin(vUv.y * 10.0)) * sin((vUv.y * 100.0) - (uTime * ${i.toFixed(1)}));
            streaks = smoothstep(0.8, 1.0, streaks);
            
            // Fade at ends
            float edgeFade = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
            
            gl_FragColor = vec4(uColor, streaks * edgeFade);
          }
        `})]})},mt=()=>{const o=[],r=(t,n,s)=>{o.push({x:t,y:n,z:0,rot:[Math.PI/2,0,0],color:s,bodyHeight:40+Math.random()*40})};for(let t=Math.PI*.25;t<Math.PI*1.75;t+=.2)r(-100+Math.cos(t)*80,Math.sin(t)*80,"#00ff00");for(let t=0;t<Math.PI*2;t+=.2)r(100+Math.cos(t)*80,Math.sin(t)*80,"#ff0044");return r(140,-40,"#ff0044"),r(160,-60,"#ff0044"),r(180,-80,"#ff0044"),o},ht=({position:o,rotation:r=[0,0,0],length:t=6e3,radius:n=250,visible:s})=>{const i=a.useRef(),l=a.useRef(),f=a.useRef(),c=V(k,"/assets/images/contango_logo.png"),u=a.useMemo(()=>{const M=[],w=Math.floor(t/5);for(let g=0;g<w;g++){const I=-(g/w)*t,j=g*.1,z=Math.cos(j)*n,L=Math.sin(j)*n,T=Math.cos(j+Math.PI)*n,d=Math.sin(j+Math.PI)*n,S=Math.random()>.5?"#00ff00":"#ff0044",W=20+Math.random()*60,R=[0,0,j+Math.PI/2],X=[0,0,j+Math.PI+Math.PI/2];M.push({x:z,y:L,z:I,rot:R,color:S,bodyHeight:W}),M.push({x:T,y:d,z:I,rot:X,color:S,bodyHeight:W})}return mt().forEach(g=>{M.push({x:g.x,y:g.y,z:-t-500,rot:g.rot,color:g.color,bodyHeight:g.bodyHeight})}),M},[t,n]),m=u.length,h=a.useMemo(()=>new N,[]),x=a.useMemo(()=>new G,[]);return a.useEffect(()=>{if(!(!l.current||!f.current)){for(let M=0;M<m;M++){const w=u[M];h.position.set(w.x,w.y,w.z),h.rotation.set(w.rot[0],w.rot[1],w.rot[2]),h.scale.set(1,w.bodyHeight+40,1),h.updateMatrix(),l.current.setMatrixAt(M,h.matrix),x.set(w.color),l.current.setColorAt(M,x),h.scale.set(1,w.bodyHeight,1),h.updateMatrix(),f.current.setMatrixAt(M,h.matrix),f.current.setColorAt(M,x)}l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0)}},[u,m]),p(M=>{i.current&&s&&(i.current.rotation.z=M.clock.elapsedTime*.5)}),e.jsxs("group",{position:o,rotation:r,visible:s,children:[e.jsxs("group",{ref:i,children:[e.jsxs("instancedMesh",{ref:l,args:[null,null,m],children:[e.jsx("cylinderGeometry",{args:[2,2,1,8]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),e.jsxs("instancedMesh",{ref:f,args:[null,null,m],children:[e.jsx("boxGeometry",{args:[10,1,10]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),e.jsxs("mesh",{position:[0,0,-t-500],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0})]}),e.jsxs("mesh",{position:[0,0,-t/2],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[n*.8,n*.8,t,32,1,!0]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:P})]})]})},pt=({position:o,rotation:r,length:t=8e3,visible:n=!0})=>{const s=a.useRef(),i=a.useRef();p(f=>{if(!n||!s.current)return;const c=f.clock.getElapsedTime();s.current.map.offset.y=-c*3,i.current&&(i.current.rotation.y=c*2)});const l=J.useMemo(()=>{const f=document.createElement("canvas");f.width=512,f.height=512;const c=f.getContext("2d"),u=c.createLinearGradient(0,0,0,512);u.addColorStop(0,"#001a33"),u.addColorStop(.5,"#00ccff"),u.addColorStop(1,"#001a33"),c.fillStyle=u,c.fillRect(0,0,512,512),c.fillStyle="#ffffff";for(let h=0;h<200;h++)c.globalAlpha=Math.random()*.5,c.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const m=new xe(f);return m.wrapS=O,m.wrapT=O,m.repeat.set(4,20),m},[]);return e.jsxs("group",{position:o,rotation:r,visible:n,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,t,32,1,!0]}),e.jsx("meshStandardMaterial",{ref:s,map:l,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:P,transparent:!0,opacity:.9})]}),e.jsxs("mesh",{ref:i,children:[e.jsx("cylinderGeometry",{args:[140,140,t,16,40,!0]}),e.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:P})]})]})},E=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.56,x:0,y:-4e3,z:-11550,rx:0,ry:0},{p:.61,x:0,y:-4e3,z:-14e3,rx:0,ry:0},{p:.65,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],xt=o=>{if(o<=E[0].p)return E[0];if(o>=E[E.length-1].p)return E[E.length-1];for(let r=0;r<E.length-1;r++){const t=E[r],n=E[r+1];if(o>=t.p&&o<=n.p){const s=(o-t.p)/(n.p-t.p);return{x:C.lerp(t.x,n.x,s),y:C.lerp(t.y,n.y,s),z:C.lerp(t.z,n.z,s),rx:C.lerp(t.rx,n.rx,s),ry:C.lerp(t.ry,n.ry,s)}}}return E[0]},K=new ee,$=new te,gt=()=>{const o=U(),r=a.useRef();return p(t=>{let n=o.offset;window.icebreakerCaveLocked?n=.22:window.icebreakerThawLocked?n=.27:window.icebreakerTextLocked?n=.29:window.mindwaveLocked?n=.08:window.interstellarLocked?n=.42:window.contangoLocked&&(n=.93);const s=xt(n);t.camera.position.x=C.lerp(t.camera.position.x,s.x,.2),t.camera.position.y=C.lerp(t.camera.position.y,s.y,.2),t.camera.position.z=C.lerp(t.camera.position.z,s.z,.2),$.set(s.rx,s.ry,0),K.setFromEuler($),t.camera.quaternion.slerp(K,.15);const i=o.delta*10;t.camera.rotateZ(C.lerp(0,i*2,.2)),r.current&&r.current.position.copy(t.camera.position)}),e.jsxs("group",{children:[e.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),e.jsx("pointLight",{ref:r,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),e.jsx("ambientLight",{intensity:.2})]})},vt=()=>{const o=U(),[r,t]=a.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),n=a.useRef(r);return p(()=>{const s=o.offset,i={intro:s<.08,mindwave:s>.04&&s<.18,wormhole_ice:s>.1&&s<.25,icebreaker:s>.18&&s<.35,wormhole_sound:s>.28&&s<.42,interstellar:s>.28&&s<.48,w_legal:s>.43&&s<.54,legal:s>.48&&s<.58,w_orbital:s>.53&&s<.65,orbital:s>.56&&s<.63,w_swarm:s>.59&&s<.67,swarm:s>.61&&s<.67,w_autopilot:s>.64&&s<.7,autopilot:s>.65&&s<.71,w_clove:s>.67&&s<.72,clove:s>.69&&s<.76,w_fantasy:s>.71&&s<.83,fantasy:s>.73&&s<.88,w_contango:s>.84&&s<.91,contango:s>.89&&s<.96,sentaient:s>.94};let l=!1;for(const f in i)n.current[f]!==i[f]&&(l=!0);l&&(n.current=i,t(i))}),e.jsxs("group",{children:[e.jsx(ct,{startZ:10,endZ:-250,visible:r.intro}),e.jsx(We,{position:[0,0,-1350],visible:r.mindwave}),e.jsx(dt,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:r.wormhole_ice}),e.jsx(Ee,{position:[0,-4e3,-2550],visible:r.icebreaker}),e.jsx(Ze,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:r.interstellar}),e.jsx(H,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:r.w_legal}),e.jsx(Ve,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:r.legal}),e.jsx(H,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffcc",visible:r.w_orbital}),e.jsx(WorldOrbitalCommand,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:r.orbital}),e.jsx(H,{position:[2e3,-4e3,-13550],rotation:[Math.PI/2,-Math.PI/2,0],length:2e3,color:"#00ffff",speed:40,visible:r.w_swarm}),e.jsx(WorldDroneSwarm,{position:[5e3,-4e3,-13550],rotation:[0,0,0],visible:r.swarm}),e.jsx(H,{position:[5500,-4e3,-13550],rotation:[Math.PI/2,-Math.PI/2,0],length:1500,color:"#ff00ff",speed:40,visible:r.w_autopilot}),e.jsx(WorldAutopilot,{position:[7500,-4e3,-13550],rotation:[0,-Math.PI/2,0],visible:r.autopilot}),e.jsx(H,{position:[3500,-4e3,-14850],rotation:[Math.PI/2,Math.atan2(7e3,-2600),0],length:3800,color:"#ff00ff",speed:40,visible:r.w_clove}),e.jsx(Ke,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:r.clove}),e.jsx(pt,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:r.w_fantasy}),e.jsx(tt,{position:[0,-11700,-17500],rotation:[0,0,0],visible:r.fantasy}),e.jsx(ht,{position:[0,-11750,-20550],length:4e3,visible:r.w_contango}),e.jsx(nt,{position:[0,-11750,-24800],rotation:[0,0,0],visible:r.contango}),e.jsx(at,{position:[0,-11750,-29350],rotation:[0,0,0],visible:r.sentaient})]})},yt=()=>{const o=U(),r=a.useRef(),t=a.useRef();return a.useRef(),a.useRef(),a.useRef(),p(()=>{const n=o.offset;if(r.current){const s=n<.03?1:0;r.current.style.opacity=s}if(t.current){const s=n>.2&&n<.28?1:0;t.current.style.opacity=s}}),e.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[e.jsxs("div",{ref:r,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[e.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),e.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),e.jsxs("div",{ref:t,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[e.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[e.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:e.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),e.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),e.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),e.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},jt=()=>e.jsxs(ae,{gl:{antialias:!1,alpha:!0},children:[e.jsxs(ve,{pages:10,damping:.2,distance:1.2,children:[e.jsxs(J.Suspense,{fallback:null,children:[e.jsx(gt,{}),e.jsx(vt,{})]}),e.jsx(Z,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),e.jsx(ye,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:e.jsx(yt,{})})]}),e.jsxs(ie,{disableNormalPass:!0,children:[e.jsx(le,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),e.jsx(ce,{opacity:.05}),e.jsx(fe,{eskil:!1,offset:.1,darkness:1.1})]})]}),_t=()=>e.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[e.jsxs(se,{children:[e.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),e.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),e.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),e.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:e.jsx(ne,{})}),e.jsx("div",{className:"absolute inset-0 z-0",children:e.jsx(jt,{})})]});export{_t as default};
//# sourceMappingURL=index-ClkQCQY7.js.map
