import{l as i,_ as Y,k as e,a as $,H as xe}from"./vendor-B9LTvCOU.js";import{H as ge}from"./Header-DnIN_CLs.js";import{u as x,e as ve,a as U,C as ye}from"./react-three-fiber.esm-CJ63JJKB.js";import{E as je,B as we,N as Me,V as be}from"./Vignette-BdjRCYgM.js";import{a3 as J,O as V,as as j,o as te,G as ze,k as T,P as Te,M as Se,B as R,i as fe,al as Pe,h as ee,a8 as B,a as I,ak as L,a9 as A,K as C,n as F,Y as H,E as ue,l as Re,ag as ke,ad as Ce,q as Ie,a2 as Le}from"./three-DYa5Pume.js";import{u as _,F as O,L as _e,a as Ae,S as Ge}from"./Float-Dp6-wWWa.js";import{T as P,S as Ee}from"./Stars-LtGKJFRt.js";import{S as X}from"./Sparkles-DTz33Kqs.js";import"./main-B4z66bGw.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";import"./constants-Dy71ooXv.js";const de=i.forwardRef(function({children:s,follow:t=!0,lockX:r=!1,lockY:n=!1,lockZ:a=!1,...l},f){const c=i.useRef(null),u=i.useRef(null),m=new J;return x(({camera:p})=>{if(!t||!u.current)return;const h=u.current.rotation.clone();u.current.updateMatrix(),u.current.updateWorldMatrix(!1,!1),u.current.getWorldQuaternion(m),p.getWorldQuaternion(c.current.quaternion).premultiply(m.invert()),r&&(u.current.rotation.x=h.x),n&&(u.current.rotation.y=h.y),a&&(u.current.rotation.z=h.z)}),i.useImperativeHandle(f,()=>u.current,[]),i.createElement("group",Y({ref:u},l),i.createElement("group",{ref:c},s))}),oe=(o,s)=>{"updateRanges"in o?o.updateRanges[0]=s:o.updateRange=s};function Fe(o){return typeof o=="function"}const re=new V,se=new V,D=[],W=new Te;class Be extends ze{constructor(){super(),this.color=new T("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var s;return(s=this.instance.current)==null?void 0:s.geometry}raycast(s,t){const r=this.instance.current;if(!r||!r.geometry||!r.material)return;W.geometry=r.geometry;const n=r.matrixWorld,a=r.userData.instances.indexOf(this.instanceKey);if(!(a===-1||a>r.count)){r.getMatrixAt(a,re),se.multiplyMatrices(n,re),W.matrixWorld=se,r.material instanceof Se?W.material.side=r.material.side:W.material.side=r.material[0].side,W.raycast(s,D);for(let l=0,f=D.length;l<f;l++){const c=D[l];c.instanceId=a,c.object=this,t.push(c)}D.length=0}}}const me=i.createContext(null),ne=new V,ae=new V,Ue=new V,ie=new j,ce=new J,le=new j,We=o=>o.isInstancedBufferAttribute,pe=i.forwardRef(({context:o,children:s,...t},r)=>{i.useMemo(()=>ve({PositionMesh:Be}),[]);const n=i.useRef();i.useImperativeHandle(r,()=>n.current,[]);const{subscribe:a,getParent:l}=i.useContext(o||me);return i.useLayoutEffect(()=>a(n),[]),i.createElement("positionMesh",Y({instance:l(),instanceKey:n,ref:n},t),s)}),He=i.forwardRef(({context:o,children:s,range:t,limit:r=1e3,frames:n=1/0,...a},l)=>{const[{localContext:f,instance:c}]=i.useState(()=>{const v=i.createContext(null);return{localContext:v,instance:i.forwardRef((d,z)=>i.createElement(pe,Y({context:v},d,{ref:z})))}}),u=i.useRef(null);i.useImperativeHandle(l,()=>u.current,[]);const[m,p]=i.useState([]),[[h,b]]=i.useState(()=>{const v=new Float32Array(r*16);for(let d=0;d<r;d++)Ue.identity().toArray(v,d*16);return[v,new Float32Array([...new Array(r*3)].map(()=>1))]});i.useEffect(()=>{u.current.instanceMatrix.needsUpdate=!0});let g=0,y=0;const w=i.useRef([]);i.useLayoutEffect(()=>{w.current=Object.entries(u.current.geometry.attributes).filter(([v,d])=>We(d))}),x(()=>{if(n===1/0||g<n){u.current.updateMatrix(),u.current.updateMatrixWorld(),ne.copy(u.current.matrixWorld).invert(),y=Math.min(r,t!==void 0?t:r,m.length),u.current.count=y,oe(u.current.instanceMatrix,{offset:0,count:y*16}),oe(u.current.instanceColor,{offset:0,count:y*3});for(let v=0;v<m.length;v++){const d=m[v].current;d.matrixWorld.decompose(ie,ce,le),ae.compose(ie,ce,le).premultiply(ne),ae.toArray(h,v*16),u.current.instanceMatrix.needsUpdate=!0,d.color.toArray(b,v*3),u.current.instanceColor.needsUpdate=!0}g++}});const M=i.useMemo(()=>({getParent:()=>u,subscribe:v=>(p(d=>[...d,v]),()=>p(d=>d.filter(z=>z.current!==v.current)))}),[]);return i.createElement("instancedMesh",Y({userData:{instances:m,limit:r,frames:n},matrixAutoUpdate:!1,ref:u,args:[null,null,0],raycast:()=>null},a),i.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:h.length/16,array:h,itemSize:16,usage:te}),i.createElement("instancedBufferAttribute",{attach:"instanceColor",count:b.length/3,array:b,itemSize:3,usage:te}),Fe(s)?i.createElement(f.Provider,{value:M},s(c)):o?i.createElement(o.Provider,{value:M},s):i.createElement(me.Provider,{value:M},s))}),Oe=({position:o,rotation:s,speed:t})=>{i.useRef();const r=i.useMemo(()=>new fe([new j(-1e3,0,0),new j(-500,Math.random()*200-100,Math.random()*200-100),new j(0,0,0),new j(500,Math.random()*200-100,Math.random()*200-100),new j(1e3,0,0)]),[]),n=i.useMemo(()=>new Pe(r,64,4,8,!1),[r]),a=i.useRef();x(f=>{a.current&&(a.current.map.offset.x-=t)});const l=i.useMemo(()=>{const f=document.createElement("canvas");f.width=256,f.height=16;const c=f.getContext("2d");c.fillStyle="#000000",c.fillRect(0,0,256,16),c.fillStyle="#00ffff",c.fillRect(0,0,32,16),c.fillStyle="#ff00ff",c.fillRect(128,0,32,16);const u=new ee(f);return u.wrapS=B,u.wrapT=B,u},[]);return e.jsxs("group",{position:o,rotation:s,children:[e.jsx("mesh",{geometry:n,children:e.jsx("meshBasicMaterial",{ref:a,map:l,transparent:!0,opacity:.8,blending:I})}),e.jsx("mesh",{geometry:n,children:e.jsx("meshPhysicalMaterial",{transparent:!0,opacity:.3,roughness:.1,transmission:.9,thickness:5,color:"#0044ff"})})]})},Ve=({position:o})=>{const s=i.useRef(),t=i.useRef(),r=i.useRef();return x((n,a)=>{s.current&&(s.current.scale.setScalar(1+Math.sin(n.clock.elapsedTime*4)*.05),s.current.rotation.y+=a*.5,s.current.rotation.x+=a*.2),t.current&&(t.current.rotation.x+=a*1.2,t.current.rotation.y+=a*.8),r.current&&(r.current.rotation.x-=a*.9,r.current.rotation.z+=a*1.5)}),e.jsxs("group",{position:o,children:[e.jsxs("mesh",{ref:s,children:[e.jsx("icosahedronGeometry",{args:[100,2]}),e.jsx("meshStandardMaterial",{color:"#ffffff",emissive:"#00ffff",emissiveIntensity:2,wireframe:!0})]}),e.jsx("pointLight",{intensity:5,color:"#00ffff",distance:1e3}),e.jsxs("mesh",{ref:t,children:[e.jsx("torusGeometry",{args:[150,4,16,64]}),e.jsx("meshStandardMaterial",{color:"#ff00ff",emissive:"#ff00ff",emissiveIntensity:1})]}),e.jsxs("mesh",{ref:r,children:[e.jsx("torusGeometry",{args:[200,2,16,64]}),e.jsx("meshStandardMaterial",{color:"#00ff00",emissive:"#00ff00",emissiveIntensity:1})]})]})},Ne=({position:o,rotation:s,visible:t})=>{const r=_(),[n,a]=i.useState(!1);x(()=>{t&&(r.offset>.675&&r.offset<.69&&!n&&!window.autopilotLocked&&(window.autopilotLocked=!0,a(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(r.offset<.65||r.offset>.7)&&n&&(a(!1),window.autopilotLocked=!1))});const l=i.useMemo(()=>Array.from({length:15}).map((f,c)=>({pos:[(Math.random()-.5)*800,(Math.random()-.5)*800,(Math.random()-.5)*800],rot:[Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI],speed:.01+Math.random()*.04})),[]);return e.jsxs("group",{visible:t,position:o,rotation:s,children:[e.jsx("ambientLight",{intensity:.5}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[3e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#050510",side:R})]}),e.jsx(Ve,{position:[0,-200,-800]}),l.map((f,c)=>e.jsx(Oe,{position:f.pos,rotation:f.rot,speed:f.speed},c)),[[-600,200,-600],[600,100,-700],[0,300,-1e3],[-400,-300,-500],[400,-200,-600]].map((f,c)=>e.jsxs(O,{speed:2,rotationIntensity:.2,floatIntensity:1,position:f,children:[e.jsxs("mesh",{rotation:[0,f[0]>0?-Math.PI/6:Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[300,200]}),e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.1,wireframe:!0})]}),e.jsxs("mesh",{rotation:[0,f[0]>0?-Math.PI/6:Math.PI/6,0],position:[0,0,2],children:[e.jsx("planeGeometry",{args:[280,180]}),e.jsx("meshPhysicalMaterial",{transparent:!0,transmission:.9,roughness:.1,thickness:2,color:"#001133"})]})]},c)),e.jsx("group",{position:[0,300,-600],children:e.jsxs(O,{speed:2,rotationIntensity:.1,floatIntensity:1,children:[e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:70,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"AUTOPILOT"}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-120,0],fontSize:28,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Autonomous Business Agent"})]})})]})},De=({position:o})=>{const s=i.useRef();_();const[t,r]=i.useState(null);return i.useEffect(()=>{new L().load("/assets/images/digital_fire.jpg",n=>{n.colorSpace=A,r(n)})},[]),x(n=>{if(s.current){const a=window.icebreakerThaw||0;s.current.material.opacity=a*.9;const l=1+Math.sin(n.clock.elapsedTime*5)*.1;s.current.scale.setScalar(l)}}),t?e.jsx("group",{position:o,children:e.jsx(de,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{ref:s,position:[0,20,0],children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:I})]})})}):null},Ze=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ye=`
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
`,Xe=({position:o,angle:s,delay:t})=>{const r=i.useRef(),n=i.useRef();_();const a=i.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new T("#44aaff")},uPartyColor:{value:new T("#ff8844")}}),[]);return x(l=>{if(!r.current||!n.current)return;a.uTime.value=l.clock.elapsedTime;const f=window.icebreakerThaw||0,c=C.clamp((f-t)*2,0,1);a.uState.value=c;const u=Math.sin(l.clock.elapsedTime*8+t*10)*c;if(r.current.position.y=o[1]+(u>0?u*2:0)+15,c>0){const m=0-o[0],p=0-(o[2]- -200),h=Math.sqrt(m*m+p*p)||1;r.current.position.x=o[0]+m/h*(c*20),r.current.position.z=o[2]+p/h*(c*20)}else r.current.position.x=o[0],r.current.position.z=o[2]}),e.jsx("group",{ref:r,position:[o[0],o[1]+15,o[2]],children:e.jsx(de,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{children:[e.jsx("planeGeometry",{args:[20,30]}),e.jsx("shaderMaterial",{ref:n,vertexShader:Ze,fragmentShader:Ye,uniforms:a,transparent:!0,side:F,depthWrite:!1})]})})})},qe=({position:o})=>{const t=i.useMemo(()=>{const r=[];for(let n=0;n<60;n++){const a=Math.random()*Math.PI*2,l=30+Math.random()*80;r.push({position:[o[0]+Math.cos(a)*l,o[1],o[2]+Math.sin(a)*l],angle:a,delay:Math.random()*.5})}return r},[60,o]);return e.jsx("group",{children:t.map((r,n)=>e.jsx(Xe,{...r},n))})},q=({appId:o,position:s})=>e.jsx("group",{position:s}),Qe=({position:o})=>{const s=i.useRef(),[t,r]=i.useState(null);return _(),i.useEffect(()=>{new L().load("/icebreaker_logo.png",n=>{n.colorSpace=A,r(n)})},[]),x(n=>{if(s.current&&(s.current.rotation.y=n.clock.elapsedTime*.5,s.current.position.y=o[1]+Math.sin(n.clock.elapsedTime*2)*5,s.current.material)){const a=window.icebreakerThaw||0;s.current.material.opacity=a*.9,s.current.scale.setScalar(.01+a)}}),t?e.jsxs("mesh",{ref:s,position:o,children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:I,side:F})]}):null},Ke=({numTrees:o=30,radius:s=50,centerZ:t=-500})=>{const r=i.useRef(),n=i.useRef();_();const a=i.useMemo(()=>new H,[]),l=i.useMemo(()=>{const f=[];for(let c=0;c<o;c++){const u=c/o*Math.PI*2+Math.random()*.5,m=s+Math.random()*20;f.push({position:new j(Math.cos(u)*m,-18,Math.sin(u)*m+t),rotation:new ue(0,u+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return f},[o,s,t]);return x(()=>{if(!r.current||!n.current)return;const f=window.icebreakerThaw||0;for(let c=0;c<o;c++){const u=l[c],m=Math.max(0,(f-u.delay)*2),p=C.clamp(m,0,1)*u.scale;a.position.copy(u.position),a.rotation.copy(u.rotation),a.scale.setScalar(p),a.updateMatrix(),r.current.setMatrixAt(c,a.matrix),a.position.y+=18*p,a.updateMatrix(),n.current.setMatrixAt(c,a.matrix)}r.current.instanceMatrix.needsUpdate=!0,n.current.instanceMatrix.needsUpdate=!0}),e.jsxs("group",{children:[e.jsxs("instancedMesh",{ref:r,args:[null,null,o],children:[e.jsx("cylinderGeometry",{args:[.5,1,20,8]}),e.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),e.jsxs("instancedMesh",{ref:n,args:[null,null,o],children:[e.jsx("sphereGeometry",{args:[8,4,4]}),e.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},$e=`
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
`,Je=`
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
`,et=({startZ:o,endZ:s})=>{const t=i.useRef(),r=i.useRef(),[n,a]=i.useState(null),l=Math.abs(s-o),f=(o+s)/2,c=i.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return i.useEffect(()=>{new L().load("/assets/images/ice_cavern.jpg",u=>{u.wrapS=B,u.wrapT=B,u.repeat.set(4,2),u.colorSpace=A,a(u),c.tMap.value=u})},[c]),x(u=>{if(r.current){const m=window.icebreakerThaw||0;c.uThaw.value=m,c.uTime.value=u.clock.elapsedTime}}),n?e.jsxs("mesh",{ref:t,position:[0,0,f],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[120,120,l,128,128,!0]}),e.jsx("shaderMaterial",{ref:r,vertexShader:$e,fragmentShader:Je,uniforms:c,transparent:!0,side:R})]}):null},tt=({position:o})=>{const s=i.useRef();return x(t=>{if(s.current){const r=window.icebreakerThaw||0,n=C.lerp(.01,50,Math.pow(r,2));s.current.scale.setScalar(n),s.current.visible=r>0}}),e.jsxs("mesh",{ref:s,position:[o[0],o[1]+1,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[20,64]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},ot=({position:o})=>{const s=i.useRef();return x(t=>{if(s.current){const r=window.icebreakerThaw||0;s.current.scale.setScalar(r>0?1:.001)}}),e.jsxs("mesh",{ref:s,position:[o[0],o[1]+1.5,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[96,64]}),e.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},rt=({position:o})=>{const s=i.useRef();return x(()=>{if(s.current){const t=window.icebreakerThaw||0;s.current.opacity=1-Math.pow(t,2),s.current.transparent=!0}}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:o,children:[e.jsx("planeGeometry",{args:[1e3,3e3]}),e.jsx("meshStandardMaterial",{ref:s,color:"#001133",roughness:.1,metalness:.8})]})},st=({centerZ:o})=>{const s=i.useRef(),t=i.useRef(),r=i.useMemo(()=>({uColorBottom:{value:new T("#ffaa55")},uColorTop:{value:new T("#00f3ff")},uOpacity:{value:0}}),[]);return x(()=>{const n=window.icebreakerThaw||0;s.current&&(s.current.uniforms.uOpacity.value=n),t.current&&(t.current.intensity=n*.6)}),e.jsxs("group",{children:[e.jsxs("mesh",{scale:2e3,children:[e.jsx("sphereGeometry",{args:[1,32,32]}),e.jsx("shaderMaterial",{ref:s,side:R,transparent:!0,depthWrite:!1,uniforms:r,vertexShader:`
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
          `})]}),e.jsx("directionalLight",{ref:t,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),e.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},nt=()=>{const o=_(),[s,t]=i.useState(!1),[r,n]=i.useState(!1),[a,l]=i.useState(!1),f=i.useRef({triggered:!1,timer:0}),c=i.useRef({triggered:!1,timer:0});return i.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),x((u,m)=>{const p=o.offset;!c.current.triggered&&p>=.22&&(c.current.triggered=!0,l(!0),window.icebreakerCaveLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerCaveLocked&&(o.el&&(o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight)),c.current.timer+=m,c.current.timer>1.5&&(window.icebreakerCaveLocked=!1,l(!1),o.el&&(o.el.style.overflow="auto"))),!s&&p>=.265&&window.icebreakerThaw<1&&(t(!0),window.icebreakerThawLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerThawLocked?(o.el&&(o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight)),window.icebreakerThaw+=m*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,o.el&&!r&&(o.el.style.overflow="auto"),t(!1))):p<.2&&(window.icebreakerThaw=0),!f.current.triggered&&p>=.285&&window.icebreakerThaw>=1&&(f.current.triggered=!0,n(!0),window.icebreakerTextLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerTextLocked&&(o.el&&(o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight)),f.current.timer+=m,f.current.timer>1.5&&(window.icebreakerTextLocked=!1,n(!1),o.el&&(o.el.style.overflow="auto")))}),null},at=({position:o,rotation:s,visible:t=!0})=>e.jsxs("group",{position:o,rotation:s,visible:t,children:[e.jsx(nt,{}),e.jsx(st,{centerZ:0}),e.jsx(et,{startZ:1e3,endZ:-1e3}),e.jsx(rt,{position:[0,-20,0]}),e.jsx(tt,{position:[0,-20,0]}),e.jsx(ot,{position:[0,-20,0]}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),e.jsx(De,{position:[0,-20,0]}),e.jsx(Qe,{position:[0,30,0]}),e.jsx(Ke,{radius:60,centerZ:0}),e.jsx(qe,{position:[0,-20,0]}),e.jsx(q,{appId:"icebreaker",position:[-80,20,-200]})]}),it=`
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
`,ct=`
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
`,lt=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,ft=({position:o,visible:s})=>e.jsxs("group",{visible:s,position:o,children:[e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),ut=({position:o,visible:s})=>{const t=_(),r=i.useRef(),n=i.useRef(),a=i.useRef(),[l,f]=i.useState(null),[c,u]=i.useState(null),[m,p]=i.useState(!1),h=i.useRef({triggered:!1,timer:0});i.useEffect(()=>{window.mindwaveLocked=!1,new L().load("/mindwave-logo.png",y=>{y.colorSpace=A,f(y)}),new L().load("/tribal-sun.png",y=>{y.colorSpace=A,u(y)})},[]);const b=o?o[2]:0,g=i.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return x((y,w)=>{if(!s)return;const M=t.offset;!h.current.triggered&&M>=.075&&(h.current.triggered=!0,p(!0),window.mindwaveLocked=!0,t.el&&(t.el.style.overflow="hidden",t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight))),window.mindwaveLocked&&(t.el&&(t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight)),h.current.timer+=w,h.current.timer>1.5&&(window.mindwaveLocked=!1,p(!1),t.el&&(t.el.style.overflow="auto")));const v=y.clock.elapsedTime;if(r.current){r.current.uniforms.uTime.value=v;const d=Math.abs(y.camera.position.z-b);let S=1-Math.min(d/1e3,1);S=Math.pow(S,2),r.current.uniforms.uScrollProgress.value=S}if(n.current){n.current.position.y=-7+Math.sin(v*2)*2;const d=1+Math.sin(v*4)*.05;n.current.scale.set(d,d,1),n.current.rotation.y=0}if(a.current){a.current.position.y=125+Math.sin(v*2)*2,a.current.rotation.z=v*.1;const d=1+Math.sin(v*3)*.05;a.current.scale.set(d,d,1)}}),e.jsxs("group",{visible:s,position:o,children:[e.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[e.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),e.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:lt,side:R,depthWrite:!1})]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[e.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),e.jsx("shaderMaterial",{ref:r,vertexShader:it,fragmentShader:ct,uniforms:g,transparent:!0,side:F,wireframe:!1})]}),c&&e.jsxs("mesh",{ref:a,position:[0,-10,-85],children:[e.jsx("planeGeometry",{args:[140,140]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0,side:F,depthWrite:!1,blending:I,color:"#00ffff",opacity:.6})]}),l&&e.jsxs("mesh",{ref:n,position:[0,-10,-80],children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:l,transparent:!0,side:F,depthWrite:!1,blending:I})]}),e.jsx(ft,{position:[0,-5,-80],visible:!0}),e.jsx(q,{appId:"mindwave",position:[40,0,-40]})]})},dt=()=>{const s=i.useRef([]),t=i.useRef(document.createElement("canvas")),r=i.useMemo(()=>{t.current.width=512,t.current.height=1024;const a=t.current.getContext("2d");a.fillStyle="#010a15",a.fillRect(0,0,512,1024),a.strokeStyle="#004488",a.lineWidth=2;for(let f=0;f<1024;f+=32)a.beginPath(),a.moveTo(0,f),a.lineTo(512,f),a.stroke(),f<512&&(a.beginPath(),a.moveTo(f,0),a.lineTo(f,1024),a.stroke());a.fillStyle="#0088ff",a.fillRect(40,40,432,60),a.fillStyle="#00ffff",a.font="24px monospace",a.fillText("CLASSIFIED // AI REVIEW",60,78),a.fillStyle="#003366";for(let f=0;f<30;f++){let c=140+f*28;a.fillRect(40,c,432-Math.random()*200,12)}a.strokeStyle="#ff0033",a.lineWidth=5,a.beginPath(),a.arc(400,850,60,0,Math.PI*2),a.stroke(),a.beginPath(),a.arc(400,850,50,0,Math.PI*2),a.stroke();const l=new ee(t.current);return l.colorSpace=A,l},[]),n=i.useMemo(()=>Array.from({length:50}).map((a,l)=>({delay:l*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-400+Math.random()*200})),[50]);return x((a,l)=>{const f=a.clock.elapsedTime;n.forEach((c,u)=>{const m=s.current[u];m&&(f>c.delay&&(c.state==="waiting"&&(c.state="approaching"),c.state==="approaching"&&(c.x-=8e3*l,c.x<=0&&(c.x=0,c.state="scanning",c.scanTimer=f)),c.state==="scanning"&&f-c.scanTimer>.05&&(c.state="approved"),c.state==="approved"&&(c.x-=8e3*l,c.x<-3e3&&(c.x=3e3+Math.random()*500,c.state="approaching",c.y=(Math.random()-.5)*150-50))),m.position.set(c.x,c.y,c.z),c.state==="scanning"?(m.rotation.set(0,0,0),m.scale.setScalar(1.2)):c.state==="approved"?(m.rotation.set(0,.4,0),m.scale.setScalar(1)):(m.rotation.set(0,-.4,0),m.scale.setScalar(1)),c.state==="scanning"?m.color.set("#ffffff"):c.state==="approved"?m.color.set("#00ff66"):m.color.set("#0088ff"))})}),e.jsxs(He,{limit:50,range:50,children:[e.jsx("planeGeometry",{args:[100,200]}),e.jsx("meshBasicMaterial",{map:r,side:F,transparent:!0,opacity:.9,blending:I,depthWrite:!1}),n.map((a,l)=>e.jsx(pe,{ref:f=>s.current[l]=f,position:[a.x,a.y,a.z]},l))]})},mt=()=>{const o=U(L,"/legal_eagle_courtroom_bg.jpg");return o.colorSpace=A,e.jsxs("group",{children:[e.jsxs("mesh",{position:[0,0,-2500],children:[e.jsx("planeGeometry",{args:[8e3,4500]}),e.jsx("meshBasicMaterial",{map:o,depthWrite:!1,transparent:!0,opacity:.3})]}),[-1,1].map((s,t)=>e.jsxs("mesh",{position:[s*800,0,-1e3],children:[e.jsx("boxGeometry",{args:[400,4e3,400]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.2})]},t)),[-1,1].map((s,t)=>e.jsxs("mesh",{position:[s*1400,0,-1500],children:[e.jsx("boxGeometry",{args:[600,4e3,600]}),e.jsx("meshStandardMaterial",{color:"#030303",metalness:.9,roughness:.3})]},t+2))]})},pt=({logoTex:o})=>{const s=i.useMemo(()=>({uTime:{value:0}}),[]),t=i.useMemo(()=>({uTime:{value:0},uColor:{value:new T("#00ffff")}}),[]);return x(r=>{s.uTime.value=r.clock.elapsedTime,t.uTime.value=r.clock.elapsedTime}),e.jsxs("group",{position:[0,-100,-800],children:[e.jsxs("mesh",{position:[0,-200,0],children:[e.jsx("boxGeometry",{args:[1200,600,400]}),e.jsx("meshStandardMaterial",{color:"#020202",metalness:1,roughness:.1})]}),e.jsxs("mesh",{position:[0,150,0],children:[e.jsx("boxGeometry",{args:[800,100,300]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.8,roughness:.2})]}),e.jsxs(O,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[e.jsxs("mesh",{position:[0,400,0],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1,blending:I})]}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,150,0],fontSize:100,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"})]})]})},ht=({position:o,rotation:s,visible:t})=>{const r=U(L,"/legal_eagle_logo.png");return r.colorSpace=A,e.jsxs("group",{visible:t,position:o,rotation:s,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[0,1e3,1e3],intensity:1.5,color:"#00ffff"}),e.jsx("pointLight",{position:[0,500,-400],intensity:2,color:"#0044ff",distance:2e3}),e.jsx(mt,{}),e.jsx(pt,{logoTex:r}),e.jsx(dt,{}),e.jsx(q,{appId:"legaleagle",position:[200,100,-200]})]})},K=o=>{const t=new Ce;o==="interceptor"?(t.moveTo(1*1.8,0),t.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),t.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),t.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),t.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):o==="viper"?(t.moveTo(1*1.2,1*.3),t.lineTo(1*.4,1*.4),t.lineTo(-1*.8,1*1.2),t.lineTo(-1*1.2,1*.8),t.lineTo(-1*.8,0),t.lineTo(-1*1.2,-1*.8),t.lineTo(-1*.8,-1*1.2),t.lineTo(1*.4,-1*.4),t.lineTo(1*1.2,-1*.3),t.lineTo(1*.6,0)):o==="bulwark"&&(t.moveTo(1*1.5,0),t.lineTo(1*.8,1*1.2),t.lineTo(-1*.5,1*1.5),t.lineTo(-1*1.5,1*.8),t.lineTo(-1*1.5,-1*.8),t.lineTo(-1*.5,-1*1.5),t.lineTo(1*.8,-1*1.2));const r={steps:1,depth:o==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},n=new Ie(t,r);return n.center(),n.rotateY(-Math.PI/2),n.rotateZ(-Math.PI/2),n},xt=({position:o})=>{const s=i.useRef();return x((t,r)=>{s.current&&(s.current.rotation.z-=r*.1,s.current.rotation.x=Math.sin(t.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:s,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,300,32]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[400,40,32,64]}),e.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((t,r)=>e.jsxs("mesh",{position:[Math.cos(t)*200,0,Math.sin(t)*200],rotation:[0,-t,Math.PI/2],children:[e.jsx("cylinderGeometry",{args:[20,20,300,16]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},r)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((t,r)=>e.jsxs("mesh",{position:[Math.cos(t)*400,0,Math.sin(t)*400],rotation:[Math.PI/2,0,-t],children:[e.jsx("boxGeometry",{args:[60,60,90]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${r}`))]})},gt=({position:o})=>{const s=i.useRef(),t=i.useMemo(()=>K("bulwark"),[]);return x((r,n)=>{s.current&&(s.current.position.y=Math.sin(r.clock.elapsedTime*.2)*40,s.current.rotation.y+=n*.05,s.current.rotation.z=Math.sin(r.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:s,scale:[120,120,120],children:[e.jsx("mesh",{geometry:t,children:e.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),e.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),e.jsxs("mesh",{position:[0,0,1.5],children:[e.jsx("sphereGeometry",{args:[.2,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},vt=({position:o})=>{const a=i.useMemo(()=>new H,[]),l=i.useMemo(()=>new H,[]),f=i.useRef(),c=i.useRef(),u=i.useRef(),m=i.useRef(),p=i.useMemo(()=>K("interceptor"),[]),h=i.useMemo(()=>K("viper"),[]),b=i.useMemo(()=>{const w=new Re(.5,.5,20,4);return w.rotateX(Math.PI/2),w},[]),g=i.useMemo(()=>Array.from({length:80},(w,M)=>{const v=M>=40;return{pos:new j((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new j,target:new j,team:v?1:0,meshIndex:v?M-40:M,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),y=i.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new j,vel:new j,color:new T,life:0})),[60]);return x((w,M)=>{if(!f.current||!c.current||!u.current||!m.current)return;let v=0;g.forEach(d=>{if(d.state===0){if(Math.random()<.02||d.target.lengthSq()===0){const k=g[Math.floor(Math.random()*80)];k&&k.team!==d.team&&k.state===0?(d.target.copy(k.pos),d.target.x+=(Math.random()-.5)*200,d.target.y+=(Math.random()-.5)*200,d.target.z+=(Math.random()-.5)*200):d.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const z=new j().subVectors(d.target,d.pos),S=z.length();if(S>150&&S<800&&Math.random()<.03){const k=y.find(he=>!he.active);k&&(k.active=!0,k.pos.copy(d.pos),k.vel.copy(z).normalize().multiplyScalar(2500),k.color.set(d.team===0?"#00ffff":"#ff3300"),k.life=.8)}const G=z.normalize().multiplyScalar(400*M);d.vel.add(G),d.vel.clampLength(0,600),d.pos.addScaledVector(d.vel,M),d.trail.push(d.pos.clone()),d.trail.length>5&&d.trail.shift(),a.position.copy(d.pos);const N=a.position.clone().add(d.vel);a.lookAt(N);const Q=G.clone().cross(d.vel).y;a.rotateZ(Q*.01),a.scale.set(30,30,30)}else{d.explosionTimer+=M,a.position.copy(d.pos),a.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const z=30*Math.max(.1,1-d.explosionTimer*2);a.scale.set(z,z,z),d.explosionTimer>.5&&(d.state=0,d.health=100,d.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),d.vel.set(0,0,0),d.trail=[])}a.updateMatrix(),d.team===0?(f.current.setMatrixAt(d.meshIndex,a.matrix),f.current.setColorAt(d.meshIndex,d.state===0?new T("#00aaff"):new T("#ffaa00"))):(c.current.setMatrixAt(d.meshIndex,a.matrix),c.current.setColorAt(d.meshIndex,d.state===0?new T("#ff0033"):new T("#ffaa00"))),d.trail.forEach((z,S)=>{if(v<400){a.position.copy(z),a.rotation.set(0,0,0);const G=S/5*10;a.scale.set(G,G,G),a.updateMatrix(),m.current.setMatrixAt(v,a.matrix),m.current.setColorAt(v,d.team===0?new T("#00ffff"):new T("#ff5500")),v++}})});for(let d=v;d<400;d++)a.position.set(0,9999,0),a.scale.set(0,0,0),a.updateMatrix(),m.current.setMatrixAt(d,a.matrix);y.forEach((d,z)=>{d.active?(d.pos.addScaledVector(d.vel,M),d.life-=M,g.forEach(S=>{S.state===0&&d.pos.distanceTo(S.pos)<50&&(S.health-=50,d.active=!1,S.health<=0&&(S.state=1,S.explosionTimer=0))}),d.life<=0&&(d.active=!1),l.position.copy(d.pos),l.lookAt(l.position.clone().add(d.vel)),l.scale.set(1,1,1)):(l.position.set(0,9999,0),l.scale.set(0,0,0)),l.updateMatrix(),u.current.setMatrixAt(z,l.matrix),u.current.setColorAt(z,d.color)}),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),m.current.instanceMatrix.needsUpdate=!0,m.current.instanceColor&&(m.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0)}),e.jsxs("group",{position:o,children:[e.jsx("instancedMesh",{ref:f,args:[p,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:c,args:[h,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:u,args:[b,null,60],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:I})}),e.jsx("instancedMesh",{ref:m,args:[new ke(1,4,4),null,400],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:I,depthWrite:!1})})]})},yt=({position:o,rotation:s,visible:t})=>{const r=U(L,"/interstellar_logo_final.png");r.colorSpace=A;const n=_(),a=i.useRef({triggered:!1});return x(()=>{n&&n.offset>=.41&&n.offset<=.43&&!a.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,a.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),e.jsxs("group",{visible:t,position:o,rotation:s,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),e.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),e.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:R})]}),e.jsx(xt,{position:[0,-200,-800]}),e.jsx(gt,{position:[0,-120,-100]}),e.jsx(vt,{position:[0,-50,0]}),e.jsxs("group",{position:[0,120,200],children:[e.jsxs("mesh",{position:[0,50,0],children:[e.jsx("planeGeometry",{args:[180,180]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,depthWrite:!1})]}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),e.jsx(q,{appId:"interstellar",position:[-150,100,200]})]})},jt=({position:o})=>{const s=i.useRef(),t=i.useMemo(()=>({uTime:{value:0},uColor:{value:new T("#00ffff")}}),[]);return x(r=>{s.current&&(s.current.uniforms.uTime.value=r.clock.elapsedTime)}),e.jsxs("mesh",{position:o,children:[e.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),e.jsx("shaderMaterial",{ref:s,transparent:!0,side:F,blending:I,depthWrite:!1,uniforms:t,vertexShader:`
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
        `})]})},wt=()=>{const o=i.useRef(),s=i.useMemo(()=>({uTime:{value:0},uColor:{value:new T("#0044ff")},uHighlight:{value:new T("#00ffff")}}),[]);return x(t=>{o.current&&(o.current.uniforms.uTime.value=t.clock.elapsedTime)}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),e.jsx("shaderMaterial",{ref:o,transparent:!0,wireframe:!0,uniforms:s,vertexShader:`
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
        `})]})},Mt=({position:o,rotation:s,visible:t})=>{const[r,n]=i.useState(null);return i.useEffect(()=>{new L().load("/cloveh2o_logo.png",l=>{l.colorSpace=A,n(l)})},[]),e.jsxs("group",{visible:t,position:o,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:R})]}),e.jsx(wt,{}),e.jsx(jt,{position:[0,1800,-800]}),e.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),e.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),e.jsxs("group",{position:[0,0,-300],children:[r&&e.jsxs("mesh",{position:[0,80,0],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,depthWrite:!1,blending:I})]}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},Z=({color:o,number:s,groupRef:t,armRef:r})=>e.jsxs("group",{ref:t,children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.3,roughness:.4})]}),e.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("group",{position:[0,17,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2.8,32,32]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.8,metalness:.5})]}),e.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[e.jsx("boxGeometry",{args:[3.5,2,2]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),e.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:r,children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsxs("mesh",{position:[-1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),e.jsxs("mesh",{position:[1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),s&&e.jsx(P,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:s})]}),bt=({position:o})=>{const s=i.useRef(),t=i.useRef(),r=i.useRef(),n=i.useRef(),a=i.useRef(),l=i.useRef(),f=i.useMemo(()=>new j(100,0,0),[]),c=i.useMemo(()=>new j(100,0,20),[]),u=i.useMemo(()=>new j(30,0,100),[]),m=i.useMemo(()=>new j(0,0,-20),[]),p=i.useMemo(()=>new j(20,0,220),[]),h=i.useMemo(()=>new j,[]),b=i.useMemo(()=>new j,[]);return i.useMemo(()=>new j,[]),x(g=>{const y=g.clock.elapsedTime%6;if(r.current&&r.current.rotation.set(0,0,-.3),y<.5)t.current&&t.current.position.copy(f),n.current&&n.current.position.copy(c),a.current&&a.current.position.copy(u),s.current&&s.current.position.copy(m),l.current&&l.current.position.copy(m).add(h.set(4.5,12,2));else if(y<4){const w=(y-.5)/3.5;if(t.current&&(w<.5?t.current.position.lerpVectors(f,h.set(100,0,110),w*2):t.current.position.lerpVectors(b.set(100,0,110),p,(w-.5)*2)),n.current&&t.current&&n.current.position.lerpVectors(c,h.set(p.x+8,0,p.z-8),w),a.current&&a.current.position.lerpVectors(u,h.set(p.x-8,0,p.z+8),w),l.current)if(y<1.5)l.current.position.copy(m).add(h.set(4.5,12,2));else{const M=(y-1.5)/2.5,v=Math.sin(M*Math.PI)*45;l.current.position.lerpVectors(m,p,M),l.current.position.y+=v+18}}else if(y<5)t.current&&t.current.position.lerpVectors(p,h.set(20,0,240),y-4),l.current&&t.current&&l.current.position.copy(t.current.position).add(h.set(0,12,3)),n.current&&(n.current.position.y=0),a.current&&(a.current.position.y=0);else if(y<5.5)r.current&&r.current.rotation.set(Math.PI,0,0),l.current&&t.current&&l.current.position.copy(t.current.position).add(h.set(4.5,20,0));else if(r.current&&r.current.rotation.set(-Math.PI/4,0,0),l.current&&t.current){const w=y-5.5,M=Math.abs(Math.cos(w*8))*10;l.current.position.copy(t.current.position).add(h.set(4.5,M,4))}}),e.jsxs("group",{position:o,children:[e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),e.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[e.jsx("planeGeometry",{args:[400,40]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),e.jsx(Z,{color:"#0088ff",number:"QB",groupRef:s}),e.jsx(Z,{color:"#00ffff",number:"80",groupRef:t,armRef:r}),e.jsx(Z,{color:"#ff0044",number:"CB",groupRef:n}),e.jsx(Z,{color:"#ff0044",number:"S",groupRef:a}),e.jsxs("mesh",{ref:l,children:[e.jsx("sphereGeometry",{args:[2,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},zt=({position:o,rotation:s,visible:t})=>{const r=U(L,"/fantasy_quant_stadium.jpg");return r.colorSpace=A,r.wrapS=B,r.repeat.set(-1,1),e.jsxs("group",{visible:t,position:o,rotation:s,children:[e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[2500,64,64]}),e.jsx("meshBasicMaterial",{map:r,side:R})]}),e.jsx(bt,{position:[0,-125,0],rotation:[0,-Math.PI/2,0]}),e.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),e.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),e.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]})]})},Tt=({position:o})=>{const t=i.useRef(),r=i.useMemo(()=>{const a=[];for(let l=0;l<4e3;l++){const f=Math.random()*Math.PI*2,c=(Math.random()-.5)*150,u=400,m=(u+c*Math.cos(f/2))*Math.cos(f),p=c*Math.sin(f/2),h=(u+c*Math.cos(f/2))*Math.sin(f);a.push({pos:new j(m,p,h),u:f,v:c,speed:Math.random()*.5+.2,color:new T(Math.random()>.5?"#00f3ff":"#0077ff")})}return a},[]),n=i.useMemo(()=>new H,[]);return x(a=>{if(!t.current)return;const l=a.clock.elapsedTime;r.forEach((f,c)=>{const u=(f.u+l*f.speed)%(Math.PI*2),m=400,p=(m+f.v*Math.cos(u/2))*Math.cos(u),h=f.v*Math.sin(u/2),b=(m+f.v*Math.cos(u/2))*Math.sin(u);n.position.set(p,h,b);const g=1.5+Math.sin(l*f.speed*5+c)*.8;n.scale.set(g,g,g),n.updateMatrix(),t.current.setMatrixAt(c,n.matrix),t.current.setColorAt(c,f.color)}),t.current.instanceMatrix.needsUpdate=!0,t.current.instanceColor&&(t.current.instanceColor.needsUpdate=!0)}),e.jsx("group",{position:o,children:e.jsx("instancedMesh",{ref:t,args:[new Le(2,2),null,4e3],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:I,depthWrite:!1,side:F})})})},St=()=>{const o=i.useMemo(()=>Array.from({length:30}).map(()=>{const t=[],r=(Math.random()-.5)*800,n=600+Math.random()*400,a=Math.random()*Math.PI*2;for(let l=0;l<=50;l++){const f=a+l/50*Math.PI*1.5;t.push(new j(Math.cos(f)*n,r+Math.sin(f*8)*50,Math.sin(f)*n))}return{points:t,color:Math.random()>.5?"#00f3ff":"#ffffff"}}),[]),s=i.useRef();return x(t=>{s.current&&(s.current.rotation.y=t.clock.elapsedTime*.15)}),e.jsx("group",{ref:s,children:o.map((t,r)=>e.jsx(_e,{points:t.points,color:t.color,lineWidth:2,transparent:!0,opacity:.4},r))})},Pt=({position:o,rotation:s,visible:t})=>{const r=_(),[n,a]=i.useState(!1),l=i.useRef({triggered:!1,timer:0});return x((f,c)=>{if(!t)return;const u=r.offset;!l.current.triggered&&u>=.92&&(l.current.triggered=!0,a(!0),window.contangoLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.93*(r.el.scrollHeight-r.el.clientHeight))),window.contangoLocked&&(r.el&&(r.el.scrollTop=.93*(r.el.scrollHeight-r.el.clientHeight)),l.current.timer+=c,l.current.timer>1.5&&(window.contangoLocked=!1,a(!1),r.el&&(r.el.style.overflow="auto")))}),e.jsxs("group",{visible:t,position:o,rotation:s,children:[e.jsx("ambientLight",{intensity:.4}),e.jsx("directionalLight",{position:[0,500,500],intensity:1.5,color:"#ffffff"}),e.jsx("spotLight",{position:[-500,500,500],intensity:2,color:"#00f3ff",penumbra:1}),e.jsx("spotLight",{position:[500,-500,500],intensity:2,color:"#0077ff",penumbra:1}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[3e3,64,64]}),e.jsx("meshBasicMaterial",{color:"#010204",side:R})]}),e.jsx(St,{}),e.jsx(Ee,{radius:1500,depth:50,count:5e3,factor:4,saturation:0,fade:!0,speed:1}),e.jsxs(O,{speed:2,rotationIntensity:.2,floatIntensity:1,floatingRange:[-10,10],children:[e.jsx($.Suspense,{fallback:null}),e.jsx(P,{position:[0,250,-800],fontSize:100,anchorX:"center",anchorY:"middle",color:"#ffffff",children:"CONTANGO QUANT"}),e.jsx(P,{position:[0,120,-800],fontSize:35,color:"#00f3ff",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",children:"The physics of finance"})]}),e.jsx(Tt,{position:[0,-100,-800]}),e.jsx(X,{count:4e3,scale:3e3,size:25,speed:.6,opacity:.5,color:"#00f3ff",position:[0,0,-500]})]})},Rt=({position:o,rotation:s,visible:t})=>{const r=i.useRef(),n=i.useRef(),a=U(L,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return x(l=>{r.current&&(r.current.position.y=Math.sin(l.clock.elapsedTime*1.5)*5),n.current&&(n.current.rotation.y+=.005,n.current.rotation.z+=.002)}),e.jsxs("group",{visible:t,position:o,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1500,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:R})]}),e.jsxs("group",{children:[e.jsx(O,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:e.jsxs("mesh",{ref:r,position:[0,0,-500],children:[e.jsx("planeGeometry",{args:[400,100]})," ",e.jsx("meshBasicMaterial",{map:a,transparent:!0,opacity:1,side:F,depthWrite:!1})]})}),e.jsx(X,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),e.jsx(X,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),e.jsx("ambientLight",{intensity:.5,color:"#002244"}),e.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},kt=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ct=`
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
`,It=({startZ:o=10,endZ:s=-500,visible:t=!0})=>{const r=i.useRef(),n=i.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);x(l=>{r.current&&t&&(r.current.uniforms.uTime.value=l.clock.elapsedTime,r.current.uniforms.uOpacity.value=C.lerp(r.current.uniforms.uOpacity.value,t?1:0,.05))});const a=i.useMemo(()=>{const l=[],c=o-s;for(let u=0;u<=100;u++){const m=o-u/100*c;l.push(new j(Math.sin(u*.1)*2,Math.cos(u*.05)*2,m))}return new fe(l)},[o,s]);return e.jsxs("mesh",{visible:t,children:[e.jsx("tubeGeometry",{args:[a,200,15,32,!1]}),e.jsx("shaderMaterial",{ref:r,vertexShader:kt,fragmentShader:Ct,uniforms:n,side:R,transparent:!0,blending:I})]})},Lt=`
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
`,_t=`
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
`,At=({position:o,rotation:s=[0,0,0],length:t=4e3,visible:r=!0})=>{const n=i.useRef(),a=i.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:t}}),[t]);return x(l=>{n.current&&(n.current.uniforms.uTime.value=l.clock.elapsedTime,n.current.uniforms.uOpacity.value=r?1:0)}),e.jsx("group",{position:o,rotation:s,visible:r,children:e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[60,400,t+200,32,64,!0]}),e.jsx("shaderMaterial",{ref:n,vertexShader:Lt,fragmentShader:_t,uniforms:a,transparent:!0,side:R,wireframe:!1})]})})},Gt=()=>{const o=[],s=(t,r,n)=>{o.push({x:t,y:r,z:0,rot:[Math.PI/2,0,0],color:n,bodyHeight:40+Math.random()*40})};for(let t=Math.PI*.25;t<Math.PI*1.75;t+=.2)s(-100+Math.cos(t)*80,Math.sin(t)*80,"#00ff00");for(let t=0;t<Math.PI*2;t+=.2)s(100+Math.cos(t)*80,Math.sin(t)*80,"#ff0044");return s(140,-40,"#ff0044"),s(160,-60,"#ff0044"),s(180,-80,"#ff0044"),o},Et=({position:o,rotation:s=[0,0,0],length:t=6e3,radius:r=250,visible:n})=>{const a=i.useRef(),l=i.useRef(),f=i.useRef(),c=U(L,"/assets/images/contango_logo.png"),u=i.useMemo(()=>{const p=[],h=Math.floor(t/5);for(let g=0;g<h;g++){const y=-(g/h)*t,w=g*.1,M=Math.cos(w)*r,v=Math.sin(w)*r,d=Math.cos(w+Math.PI)*r,z=Math.sin(w+Math.PI)*r,G=Math.random()>.5?"#00ff00":"#ff0044",N=20+Math.random()*60,Q=[0,0,w+Math.PI/2],k=[0,0,w+Math.PI+Math.PI/2];p.push({x:M,y:v,z:y,rot:Q,color:G,bodyHeight:N}),p.push({x:d,y:z,z:y,rot:k,color:G,bodyHeight:N})}return Gt().forEach(g=>{p.push({x:g.x,y:g.y,z:-t-500,rot:g.rot,color:g.color,bodyHeight:g.bodyHeight})}),p},[t,r]),m=u.length;return i.useEffect(()=>{if(!l.current||!f.current)return;const p=new H,h=new T;for(let b=0;b<m;b++){const g=u[b];p.position.set(g.x,g.y,g.z),p.rotation.set(g.rot[0],g.rot[1],g.rot[2]),p.scale.set(1,g.bodyHeight+40,1),p.updateMatrix(),l.current.setMatrixAt(b,p.matrix),h.set(g.color),l.current.setColorAt(b,h),p.scale.set(1,g.bodyHeight,1),p.updateMatrix(),f.current.setMatrixAt(b,p.matrix),f.current.setColorAt(b,h)}l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0)},[u,m]),x(p=>{a.current&&n&&(a.current.rotation.z=p.clock.elapsedTime*.5)}),e.jsxs("group",{position:o,rotation:s,visible:n,children:[e.jsxs("group",{ref:a,children:[e.jsxs("instancedMesh",{ref:l,args:[null,null,m],children:[e.jsx("cylinderGeometry",{args:[2,2,1,8]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),e.jsxs("instancedMesh",{ref:f,args:[null,null,m],children:[e.jsx("boxGeometry",{args:[10,1,10]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),e.jsxs("mesh",{position:[0,0,-t-500],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0})]}),e.jsxs("mesh",{position:[0,0,-t/2],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[r*.8,r*.8,t,32,1,!0]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:R})]})]})},Ft=({position:o,rotation:s,length:t=8e3,visible:r=!0})=>{const n=i.useRef(),a=i.useRef();x(f=>{if(!r||!n.current)return;const c=f.clock.getElapsedTime();n.current.map.offset.y=-c*3,a.current&&(a.current.rotation.y=c*2)});const l=$.useMemo(()=>{const f=document.createElement("canvas");f.width=512,f.height=512;const c=f.getContext("2d"),u=c.createLinearGradient(0,0,0,512);u.addColorStop(0,"#001a33"),u.addColorStop(.5,"#00ccff"),u.addColorStop(1,"#001a33"),c.fillStyle=u,c.fillRect(0,0,512,512),c.fillStyle="#ffffff";for(let p=0;p<200;p++)c.globalAlpha=Math.random()*.5,c.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const m=new ee(f);return m.wrapS=B,m.wrapT=B,m.repeat.set(4,20),m},[]);return e.jsxs("group",{position:o,rotation:s,visible:r,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,t,32,1,!0]}),e.jsx("meshStandardMaterial",{ref:n,map:l,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:R,transparent:!0,opacity:.9})]}),e.jsxs("mesh",{ref:a,children:[e.jsx("cylinderGeometry",{args:[140,140,t,16,40,!0]}),e.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:R})]})]})},E=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-9950,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-9950,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.6,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.62,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.65,x:0,y:-4e3,z:-14550,rx:0,ry:0},{p:.705,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],Bt=o=>{if(o<=E[0].p)return E[0];if(o>=E[E.length-1].p)return E[E.length-1];for(let s=0;s<E.length-1;s++){const t=E[s],r=E[s+1];if(o>=t.p&&o<=r.p){const n=(o-t.p)/(r.p-t.p);return{x:C.lerp(t.x,r.x,n),y:C.lerp(t.y,r.y,n),z:C.lerp(t.z,r.z,n),rx:C.lerp(t.rx,r.rx,n),ry:C.lerp(t.ry,r.ry,n)}}}return E[0]},Ut=()=>{const o=_(),s=i.useRef();return x(t=>{let r=o.offset;window.icebreakerCaveLocked?r=.22:window.icebreakerThawLocked?r=.27:window.icebreakerTextLocked?r=.29:window.mindwaveLocked?r=.08:window.interstellarLocked?r=.42:window.contangoLocked&&(r=.93);const n=Bt(r);t.camera.position.x=C.lerp(t.camera.position.x,n.x,.2),t.camera.position.y=C.lerp(t.camera.position.y,n.y,.2),t.camera.position.z=C.lerp(t.camera.position.z,n.z,.2);const a=new J().setFromEuler(new ue(n.rx,n.ry,0));t.camera.quaternion.slerp(a,.15);const l=o.delta*10;t.camera.rotateZ(C.lerp(0,l*2,.2)),s.current&&s.current.position.copy(t.camera.position)}),e.jsxs("group",{children:[e.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),e.jsx("pointLight",{ref:s,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),e.jsx("ambientLight",{intensity:.2})]})},Wt=()=>{const o=_(),[s,t]=i.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),r=i.useRef(s);return x(()=>{const n=o.offset,a={intro:n<.08,mindwave:n>.04&&n<.18,wormhole_ice:n>.1&&n<.25,icebreaker:n>.18&&n<.35,wormhole_sound:n>.28&&n<.42,interstellar:n>.28&&n<.48,w_legal:n>.43&&n<.54,legal:n>.48&&n<.58,w_orbital:n>.53&&n<.65,orbital:n>.56&&n<.63,w_swarm:n>.59&&n<.67,swarm:n>.61&&n<.67,w_autopilot:n>.64&&n<.7,autopilot:n>.65&&n<.71,w_clove:n>.67&&n<.72,clove:n>.69&&n<.76,w_fantasy:n>.71&&n<.83,fantasy:n>.73&&n<.88,w_contango:n>.84&&n<.91,contango:n>.89&&n<.96,sentaient:n>.94};let l=!1;for(const f in a)r.current[f]!==a[f]&&(l=!0);l&&(r.current=a,t(a))}),e.jsxs("group",{children:[e.jsx(It,{startZ:10,endZ:-250,visible:s.intro}),e.jsx(ut,{position:[0,0,-1350],visible:s.mindwave}),e.jsx(At,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:s.wormhole_ice}),e.jsx(at,{position:[0,-4e3,-2550],visible:s.icebreaker}),e.jsx(yt,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:s.interstellar}),e.jsx(WormholeGeneric,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:s.w_legal}),e.jsx(ht,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:s.legal}),e.jsx(WormholeGeneric,{position:[0,-4e3,-12350],rotation:[Math.PI/2,0,0],length:2e3,color:"#ff00ff",speed:40,visible:s.w_clove}),e.jsx(Ne,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:!0}),e.jsx(WormholeGeneric,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#ff00ff",speed:40,visible:s.w_clove}),e.jsx(Mt,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:s.clove}),e.jsx(Ft,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:s.w_fantasy}),e.jsx(zt,{position:[0,-11700,-17500],rotation:[0,0,0],visible:s.fantasy}),e.jsx(Et,{position:[0,-11750,-20550],length:4e3,visible:s.w_contango}),e.jsx(Pt,{position:[0,-11750,-24800],rotation:[0,0,0],visible:s.contango}),e.jsx(Rt,{position:[0,-11750,-29350],rotation:[0,0,0],visible:s.sentaient})]})},Ht=()=>{const o=_(),s=i.useRef(),t=i.useRef();return i.useRef(),i.useRef(),i.useRef(),x(()=>{const r=o.offset;if(s.current){const n=r<.03?1:0;s.current.style.opacity=n}if(t.current){const n=r>.2&&r<.28?1:0;t.current.style.opacity=n}}),e.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[e.jsxs("div",{ref:s,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[e.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),e.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),e.jsxs("div",{ref:t,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[e.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[e.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:e.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),e.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),e.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),e.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},Ot=()=>e.jsxs(ye,{gl:{antialias:!1,alpha:!0},children:[e.jsxs(Ae,{pages:10,damping:.2,distance:1.2,children:[e.jsxs($.Suspense,{fallback:null,children:[e.jsx(Ut,{}),e.jsx(Wt,{})]}),e.jsx(X,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),e.jsx(Ge,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:e.jsx(Ht,{})})]}),e.jsxs(je,{disableNormalPass:!0,children:[e.jsx(we,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),e.jsx(Me,{opacity:.05}),e.jsx(be,{eskil:!1,offset:.1,darkness:1.1})]})]}),to=()=>e.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[e.jsxs(xe,{children:[e.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),e.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),e.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),e.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:e.jsx(ge,{})}),e.jsx("div",{className:"absolute inset-0 z-0",children:e.jsx(Ot,{})})]});export{to as default};
//# sourceMappingURL=index-BBu663PA.js.map
