import{l as a,_ as Z,k as e,a as K,H as xe}from"./vendor-B9LTvCOU.js";import{H as ge}from"./Header-BFem06Hm.js";import{u as v,e as ve,a as U,C as ye}from"./react-three-fiber.esm-ByO88Anx.js";import{E as we,B as je,N as Me,V as be}from"./Vignette-BPpHqtnC.js";import{a3 as $,O as V,ar as b,o as ee,G as ze,k as T,P as Te,M as Se,ak as L,a9 as _,a as I,K as k,n as G,B as P,a8 as W,Y as H,E as ue,h as fe,l as Pe,ag as Re,ad as ke,q as Ce,a2 as Ie,i as Le}from"./three-CBDkq3Sm.js";import{u as E,F as J,L as _e,a as Ee,S as Ae}from"./Float-DrOAm854.js";import{T as C,S as Fe}from"./Stars-DynHiCLc.js";import{S as Y}from"./Sparkles-Bi7C7Hzy.js";import"./main-D-3pBYFo.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";import"./constants-Dmc5HAgA.js";const de=a.forwardRef(function({children:n,follow:t=!0,lockX:o=!1,lockY:s=!1,lockZ:i=!1,...l},u){const c=a.useRef(null),f=a.useRef(null),m=new $;return v(({camera:p})=>{if(!t||!f.current)return;const h=f.current.rotation.clone();f.current.updateMatrix(),f.current.updateWorldMatrix(!1,!1),f.current.getWorldQuaternion(m),p.getWorldQuaternion(c.current.quaternion).premultiply(m.invert()),o&&(f.current.rotation.x=h.x),s&&(f.current.rotation.y=h.y),i&&(f.current.rotation.z=h.z)}),a.useImperativeHandle(u,()=>f.current,[]),a.createElement("group",Z({ref:f},l),a.createElement("group",{ref:c},n))}),te=(r,n)=>{"updateRanges"in r?r.updateRanges[0]=n:r.updateRange=n};function Ge(r){return typeof r=="function"}const re=new V,oe=new V,N=[],B=new Te;class Ue extends ze{constructor(){super(),this.color=new T("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var n;return(n=this.instance.current)==null?void 0:n.geometry}raycast(n,t){const o=this.instance.current;if(!o||!o.geometry||!o.material)return;B.geometry=o.geometry;const s=o.matrixWorld,i=o.userData.instances.indexOf(this.instanceKey);if(!(i===-1||i>o.count)){o.getMatrixAt(i,re),oe.multiplyMatrices(s,re),B.matrixWorld=oe,o.material instanceof Se?B.material.side=o.material.side:B.material.side=o.material[0].side,B.raycast(n,N);for(let l=0,u=N.length;l<u;l++){const c=N[l];c.instanceId=i,c.object=this,t.push(c)}N.length=0}}}const me=a.createContext(null),se=new V,ne=new V,Be=new V,ae=new b,ie=new $,le=new b,We=r=>r.isInstancedBufferAttribute,pe=a.forwardRef(({context:r,children:n,...t},o)=>{a.useMemo(()=>ve({PositionMesh:Ue}),[]);const s=a.useRef();a.useImperativeHandle(o,()=>s.current,[]);const{subscribe:i,getParent:l}=a.useContext(r||me);return a.useLayoutEffect(()=>i(s),[]),a.createElement("positionMesh",Z({instance:l(),instanceKey:s,ref:s},t),n)}),He=a.forwardRef(({context:r,children:n,range:t,limit:o=1e3,frames:s=1/0,...i},l)=>{const[{localContext:u,instance:c}]=a.useState(()=>{const g=a.createContext(null);return{localContext:g,instance:a.forwardRef((d,z)=>a.createElement(pe,Z({context:g},d,{ref:z})))}}),f=a.useRef(null);a.useImperativeHandle(l,()=>f.current,[]);const[m,p]=a.useState([]),[[h,M]]=a.useState(()=>{const g=new Float32Array(o*16);for(let d=0;d<o;d++)Be.identity().toArray(g,d*16);return[g,new Float32Array([...new Array(o*3)].map(()=>1))]});a.useEffect(()=>{f.current.instanceMatrix.needsUpdate=!0});let x=0,y=0;const w=a.useRef([]);a.useLayoutEffect(()=>{w.current=Object.entries(f.current.geometry.attributes).filter(([g,d])=>We(d))}),v(()=>{if(s===1/0||x<s){f.current.updateMatrix(),f.current.updateMatrixWorld(),se.copy(f.current.matrixWorld).invert(),y=Math.min(o,t!==void 0?t:o,m.length),f.current.count=y,te(f.current.instanceMatrix,{offset:0,count:y*16}),te(f.current.instanceColor,{offset:0,count:y*3});for(let g=0;g<m.length;g++){const d=m[g].current;d.matrixWorld.decompose(ae,ie,le),ne.compose(ae,ie,le).premultiply(se),ne.toArray(h,g*16),f.current.instanceMatrix.needsUpdate=!0,d.color.toArray(M,g*3),f.current.instanceColor.needsUpdate=!0}x++}});const j=a.useMemo(()=>({getParent:()=>f,subscribe:g=>(p(d=>[...d,g]),()=>p(d=>d.filter(z=>z.current!==g.current)))}),[]);return a.createElement("instancedMesh",Z({userData:{instances:m,limit:o,frames:s},matrixAutoUpdate:!1,ref:f,args:[null,null,0],raycast:()=>null},i),a.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:h.length/16,array:h,itemSize:16,usage:ee}),a.createElement("instancedBufferAttribute",{attach:"instanceColor",count:M.length/3,array:M,itemSize:3,usage:ee}),Ge(n)?a.createElement(u.Provider,{value:j},n(c)):r?a.createElement(r.Provider,{value:j},n):a.createElement(me.Provider,{value:j},n))}),Ve=({position:r})=>{const n=a.useRef();E();const[t,o]=a.useState(null);return a.useEffect(()=>{new L().load("/assets/images/digital_fire.jpg",s=>{s.colorSpace=_,o(s)})},[]),v(s=>{if(n.current){const i=window.icebreakerThaw||0;n.current.material.opacity=i*.9;const l=1+Math.sin(s.clock.elapsedTime*5)*.1;n.current.scale.setScalar(l)}}),t?e.jsx("group",{position:r,children:e.jsx(de,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{ref:n,position:[0,20,0],children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:I})]})})}):null},Oe=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ne=`
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
`,De=({position:r,angle:n,delay:t})=>{const o=a.useRef(),s=a.useRef();E();const i=a.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new T("#44aaff")},uPartyColor:{value:new T("#ff8844")}}),[]);return v(l=>{if(!o.current||!s.current)return;i.uTime.value=l.clock.elapsedTime;const u=window.icebreakerThaw||0,c=k.clamp((u-t)*2,0,1);i.uState.value=c;const f=Math.sin(l.clock.elapsedTime*8+t*10)*c;if(o.current.position.y=r[1]+(f>0?f*2:0)+15,c>0){const m=0-r[0],p=0-(r[2]- -200),h=Math.sqrt(m*m+p*p)||1;o.current.position.x=r[0]+m/h*(c*20),o.current.position.z=r[2]+p/h*(c*20)}else o.current.position.x=r[0],o.current.position.z=r[2]}),e.jsx("group",{ref:o,position:[r[0],r[1]+15,r[2]],children:e.jsx(de,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{children:[e.jsx("planeGeometry",{args:[20,30]}),e.jsx("shaderMaterial",{ref:s,vertexShader:Oe,fragmentShader:Ne,uniforms:i,transparent:!0,side:G,depthWrite:!1})]})})})},Ze=({position:r})=>{const t=a.useMemo(()=>{const o=[];for(let s=0;s<60;s++){const i=Math.random()*Math.PI*2,l=30+Math.random()*80;o.push({position:[r[0]+Math.cos(i)*l,r[1],r[2]+Math.sin(i)*l],angle:i,delay:Math.random()*.5})}return o},[60,r]);return e.jsx("group",{children:t.map((o,s)=>e.jsx(De,{...o},s))})},X=({appId:r,position:n})=>e.jsx("group",{position:n}),Ye=({position:r})=>{const n=a.useRef(),[t,o]=a.useState(null);return E(),a.useEffect(()=>{new L().load("/icebreaker_logo.png",s=>{s.colorSpace=_,o(s)})},[]),v(s=>{if(n.current&&(n.current.rotation.y=s.clock.elapsedTime*.5,n.current.position.y=r[1]+Math.sin(s.clock.elapsedTime*2)*5,n.current.material)){const i=window.icebreakerThaw||0;n.current.material.opacity=i*.9,n.current.scale.setScalar(.01+i)}}),t?e.jsxs("mesh",{ref:n,position:r,children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:I,side:G})]}):null},Xe=({numTrees:r=30,radius:n=50,centerZ:t=-500})=>{const o=a.useRef(),s=a.useRef();E();const i=a.useMemo(()=>new H,[]),l=a.useMemo(()=>{const u=[];for(let c=0;c<r;c++){const f=c/r*Math.PI*2+Math.random()*.5,m=n+Math.random()*20;u.push({position:new b(Math.cos(f)*m,-18,Math.sin(f)*m+t),rotation:new ue(0,f+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return u},[r,n,t]);return v(()=>{if(!o.current||!s.current)return;const u=window.icebreakerThaw||0;for(let c=0;c<r;c++){const f=l[c],m=Math.max(0,(u-f.delay)*2),p=k.clamp(m,0,1)*f.scale;i.position.copy(f.position),i.rotation.copy(f.rotation),i.scale.setScalar(p),i.updateMatrix(),o.current.setMatrixAt(c,i.matrix),i.position.y+=18*p,i.updateMatrix(),s.current.setMatrixAt(c,i.matrix)}o.current.instanceMatrix.needsUpdate=!0,s.current.instanceMatrix.needsUpdate=!0}),e.jsxs("group",{children:[e.jsxs("instancedMesh",{ref:o,args:[null,null,r],children:[e.jsx("cylinderGeometry",{args:[.5,1,20,8]}),e.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),e.jsxs("instancedMesh",{ref:s,args:[null,null,r],children:[e.jsx("sphereGeometry",{args:[8,4,4]}),e.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},qe=`
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
`,Qe=`
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
`,Ke=({startZ:r,endZ:n})=>{const t=a.useRef(),o=a.useRef(),[s,i]=a.useState(null),l=Math.abs(n-r),u=(r+n)/2,c=a.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return a.useEffect(()=>{new L().load("/assets/images/ice_cavern.jpg",f=>{f.wrapS=W,f.wrapT=W,f.repeat.set(4,2),f.colorSpace=_,i(f),c.tMap.value=f})},[c]),v(f=>{if(o.current){const m=window.icebreakerThaw||0;c.uThaw.value=m,c.uTime.value=f.clock.elapsedTime}}),s?e.jsxs("mesh",{ref:t,position:[0,0,u],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[120,120,l,128,128,!0]}),e.jsx("shaderMaterial",{ref:o,vertexShader:qe,fragmentShader:Qe,uniforms:c,transparent:!0,side:P})]}):null},$e=({position:r})=>{const n=a.useRef();return v(t=>{if(n.current){const o=window.icebreakerThaw||0,s=k.lerp(.01,50,Math.pow(o,2));n.current.scale.setScalar(s),n.current.visible=o>0}}),e.jsxs("mesh",{ref:n,position:[r[0],r[1]+1,r[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[20,64]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},Je=({position:r})=>{const n=a.useRef();return v(t=>{if(n.current){const o=window.icebreakerThaw||0;n.current.scale.setScalar(o>0?1:.001)}}),e.jsxs("mesh",{ref:n,position:[r[0],r[1]+1.5,r[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[96,64]}),e.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},et=({position:r})=>{const n=a.useRef();return v(()=>{if(n.current){const t=window.icebreakerThaw||0;n.current.opacity=1-Math.pow(t,2),n.current.transparent=!0}}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:r,children:[e.jsx("planeGeometry",{args:[1e3,3e3]}),e.jsx("meshStandardMaterial",{ref:n,color:"#001133",roughness:.1,metalness:.8})]})},tt=({centerZ:r})=>{const n=a.useRef(),t=a.useRef(),o=a.useMemo(()=>({uColorBottom:{value:new T("#ffaa55")},uColorTop:{value:new T("#00f3ff")},uOpacity:{value:0}}),[]);return v(()=>{const s=window.icebreakerThaw||0;n.current&&(n.current.uniforms.uOpacity.value=s),t.current&&(t.current.intensity=s*.6)}),e.jsxs("group",{children:[e.jsxs("mesh",{scale:2e3,children:[e.jsx("sphereGeometry",{args:[1,32,32]}),e.jsx("shaderMaterial",{ref:n,side:P,transparent:!0,depthWrite:!1,uniforms:o,vertexShader:`
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
          `})]}),e.jsx("directionalLight",{ref:t,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),e.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},rt=()=>{const r=E(),[n,t]=a.useState(!1),[o,s]=a.useState(!1),[i,l]=a.useState(!1),u=a.useRef({triggered:!1,timer:0}),c=a.useRef({triggered:!1,timer:0});return a.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),v((f,m)=>{const p=r.offset;!c.current.triggered&&p>=.22&&(c.current.triggered=!0,l(!0),window.icebreakerCaveLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.22*(r.el.scrollHeight-r.el.clientHeight))),window.icebreakerCaveLocked&&(r.el&&(r.el.scrollTop=.22*(r.el.scrollHeight-r.el.clientHeight)),c.current.timer+=m,c.current.timer>1.5&&(window.icebreakerCaveLocked=!1,l(!1),r.el&&(r.el.style.overflow="auto"))),!n&&p>=.265&&window.icebreakerThaw<1&&(t(!0),window.icebreakerThawLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.27*(r.el.scrollHeight-r.el.clientHeight))),window.icebreakerThawLocked?(r.el&&(r.el.scrollTop=.27*(r.el.scrollHeight-r.el.clientHeight)),window.icebreakerThaw+=m*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,r.el&&!o&&(r.el.style.overflow="auto"),t(!1))):p<.2&&(window.icebreakerThaw=0),!u.current.triggered&&p>=.285&&window.icebreakerThaw>=1&&(u.current.triggered=!0,s(!0),window.icebreakerTextLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.29*(r.el.scrollHeight-r.el.clientHeight))),window.icebreakerTextLocked&&(r.el&&(r.el.scrollTop=.29*(r.el.scrollHeight-r.el.clientHeight)),u.current.timer+=m,u.current.timer>1.5&&(window.icebreakerTextLocked=!1,s(!1),r.el&&(r.el.style.overflow="auto")))}),null},ot=({position:r,rotation:n,visible:t=!0})=>e.jsxs("group",{position:r,rotation:n,visible:t,children:[e.jsx(rt,{}),e.jsx(tt,{centerZ:0}),e.jsx(Ke,{startZ:1e3,endZ:-1e3}),e.jsx(et,{position:[0,-20,0]}),e.jsx($e,{position:[0,-20,0]}),e.jsx(Je,{position:[0,-20,0]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),e.jsx(Ve,{position:[0,-20,0]}),e.jsx(Ye,{position:[0,30,0]}),e.jsx(Xe,{radius:60,centerZ:0}),e.jsx(Ze,{position:[0,-20,0]}),e.jsx(X,{appId:"icebreaker",position:[-80,20,-200]})]}),st=`
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
`,nt=`
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
`,at=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,it=({position:r,visible:n})=>e.jsxs("group",{visible:n,position:r,children:[e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),lt=({position:r,visible:n})=>{const t=E(),o=a.useRef(),s=a.useRef(),i=a.useRef(),[l,u]=a.useState(null),[c,f]=a.useState(null),[m,p]=a.useState(!1),h=a.useRef({triggered:!1,timer:0});a.useEffect(()=>{window.mindwaveLocked=!1,new L().load("/mindwave-logo.png",y=>{y.colorSpace=_,u(y)}),new L().load("/tribal-sun.png",y=>{y.colorSpace=_,f(y)})},[]);const M=r?r[2]:0,x=a.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return v((y,w)=>{if(!n)return;const j=t.offset;!h.current.triggered&&j>=.075&&(h.current.triggered=!0,p(!0),window.mindwaveLocked=!0,t.el&&(t.el.style.overflow="hidden",t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight))),window.mindwaveLocked&&(t.el&&(t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight)),h.current.timer+=w,h.current.timer>1.5&&(window.mindwaveLocked=!1,p(!1),t.el&&(t.el.style.overflow="auto")));const g=y.clock.elapsedTime;if(o.current){o.current.uniforms.uTime.value=g;const d=Math.abs(y.camera.position.z-M);let S=1-Math.min(d/1e3,1);S=Math.pow(S,2),o.current.uniforms.uScrollProgress.value=S}if(s.current){s.current.position.y=-7+Math.sin(g*2)*2;const d=1+Math.sin(g*4)*.05;s.current.scale.set(d,d,1),s.current.rotation.y=0}if(i.current){i.current.position.y=125+Math.sin(g*2)*2,i.current.rotation.z=g*.1;const d=1+Math.sin(g*3)*.05;i.current.scale.set(d,d,1)}}),e.jsxs("group",{visible:n,position:r,children:[e.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[e.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),e.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:at,side:P,depthWrite:!1})]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[e.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),e.jsx("shaderMaterial",{ref:o,vertexShader:st,fragmentShader:nt,uniforms:x,transparent:!0,side:G,wireframe:!1})]}),c&&e.jsxs("mesh",{ref:i,position:[0,-10,-85],children:[e.jsx("planeGeometry",{args:[140,140]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0,side:G,depthWrite:!1,blending:I,color:"#00ffff",opacity:.6})]}),l&&e.jsxs("mesh",{ref:s,position:[0,-10,-80],children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:l,transparent:!0,side:G,depthWrite:!1,blending:I})]}),e.jsx(it,{position:[0,-5,-80],visible:!0}),e.jsx(X,{appId:"mindwave",position:[40,0,-40]})]})},ct=()=>{const n=a.useRef([]),t=a.useRef(document.createElement("canvas")),o=a.useMemo(()=>{t.current.width=512,t.current.height=1024;const i=t.current.getContext("2d");i.fillStyle="#010a15",i.fillRect(0,0,512,1024),i.strokeStyle="#004488",i.lineWidth=2;for(let u=0;u<1024;u+=32)i.beginPath(),i.moveTo(0,u),i.lineTo(512,u),i.stroke(),u<512&&(i.beginPath(),i.moveTo(u,0),i.lineTo(u,1024),i.stroke());i.fillStyle="#0088ff",i.fillRect(40,40,432,60),i.fillStyle="#00ffff",i.font="24px monospace",i.fillText("CLASSIFIED // AI REVIEW",60,78),i.fillStyle="#003366";for(let u=0;u<30;u++){let c=140+u*28;i.fillRect(40,c,432-Math.random()*200,12)}i.strokeStyle="#ff0033",i.lineWidth=5,i.beginPath(),i.arc(400,850,60,0,Math.PI*2),i.stroke(),i.beginPath(),i.arc(400,850,50,0,Math.PI*2),i.stroke();const l=new fe(t.current);return l.colorSpace=_,l},[]),s=a.useMemo(()=>Array.from({length:50}).map((i,l)=>({delay:l*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-400+Math.random()*200})),[50]);return v((i,l)=>{const u=i.clock.elapsedTime;s.forEach((c,f)=>{const m=n.current[f];m&&(u>c.delay&&(c.state==="waiting"&&(c.state="approaching"),c.state==="approaching"&&(c.x-=8e3*l,c.x<=0&&(c.x=0,c.state="scanning",c.scanTimer=u)),c.state==="scanning"&&u-c.scanTimer>.05&&(c.state="approved"),c.state==="approved"&&(c.x-=8e3*l,c.x<-3e3&&(c.x=3e3+Math.random()*500,c.state="approaching",c.y=(Math.random()-.5)*150-50))),m.position.set(c.x,c.y,c.z),c.state==="scanning"?(m.rotation.set(0,0,0),m.scale.setScalar(1.2)):c.state==="approved"?(m.rotation.set(0,.4,0),m.scale.setScalar(1)):(m.rotation.set(0,-.4,0),m.scale.setScalar(1)),c.state==="scanning"?m.color.set("#ffffff"):c.state==="approved"?m.color.set("#00ff66"):m.color.set("#0088ff"))})}),e.jsxs(He,{limit:50,range:50,children:[e.jsx("planeGeometry",{args:[100,200]}),e.jsx("meshBasicMaterial",{map:o,side:G,transparent:!0,opacity:.9,blending:I,depthWrite:!1}),s.map((i,l)=>e.jsx(pe,{ref:u=>n.current[l]=u,position:[i.x,i.y,i.z]},l))]})},ut=()=>{const r=U(L,"/legal_eagle_courtroom_bg.jpg");return r.colorSpace=_,e.jsxs("group",{children:[e.jsxs("mesh",{position:[0,0,-2500],children:[e.jsx("planeGeometry",{args:[8e3,4500]}),e.jsx("meshBasicMaterial",{map:r,depthWrite:!1,transparent:!0,opacity:.3})]}),[-1,1].map((n,t)=>e.jsxs("mesh",{position:[n*800,0,-1e3],children:[e.jsx("boxGeometry",{args:[400,4e3,400]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.2})]},t)),[-1,1].map((n,t)=>e.jsxs("mesh",{position:[n*1400,0,-1500],children:[e.jsx("boxGeometry",{args:[600,4e3,600]}),e.jsx("meshStandardMaterial",{color:"#030303",metalness:.9,roughness:.3})]},t+2))]})},ft=({logoTex:r})=>{const n=a.useMemo(()=>({uTime:{value:0}}),[]),t=a.useMemo(()=>({uTime:{value:0},uColor:{value:new T("#00ffff")}}),[]);return v(o=>{n.uTime.value=o.clock.elapsedTime,t.uTime.value=o.clock.elapsedTime}),e.jsxs("group",{position:[0,-100,-800],children:[e.jsxs("mesh",{position:[0,-200,0],children:[e.jsx("boxGeometry",{args:[1200,600,400]}),e.jsx("meshStandardMaterial",{color:"#020202",metalness:1,roughness:.1})]}),e.jsxs("mesh",{position:[0,150,0],children:[e.jsx("boxGeometry",{args:[800,100,300]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.8,roughness:.2})]}),e.jsxs(J,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[e.jsxs("mesh",{position:[0,400,0],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,depthWrite:!1,blending:I})]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,150,0],fontSize:100,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"})]})]})},dt=({position:r,rotation:n,visible:t})=>{const o=U(L,"/legal_eagle_logo.png");return o.colorSpace=_,e.jsxs("group",{visible:t,position:r,rotation:n,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[0,1e3,1e3],intensity:1.5,color:"#00ffff"}),e.jsx("pointLight",{position:[0,500,-400],intensity:2,color:"#0044ff",distance:2e3}),e.jsx(ut,{}),e.jsx(ft,{logoTex:o}),e.jsx(ct,{}),e.jsx(X,{appId:"legaleagle",position:[200,100,-200]})]})},Q=r=>{const t=new ke;r==="interceptor"?(t.moveTo(1*1.8,0),t.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),t.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),t.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),t.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):r==="viper"?(t.moveTo(1*1.2,1*.3),t.lineTo(1*.4,1*.4),t.lineTo(-1*.8,1*1.2),t.lineTo(-1*1.2,1*.8),t.lineTo(-1*.8,0),t.lineTo(-1*1.2,-1*.8),t.lineTo(-1*.8,-1*1.2),t.lineTo(1*.4,-1*.4),t.lineTo(1*1.2,-1*.3),t.lineTo(1*.6,0)):r==="bulwark"&&(t.moveTo(1*1.5,0),t.lineTo(1*.8,1*1.2),t.lineTo(-1*.5,1*1.5),t.lineTo(-1*1.5,1*.8),t.lineTo(-1*1.5,-1*.8),t.lineTo(-1*.5,-1*1.5),t.lineTo(1*.8,-1*1.2));const o={steps:1,depth:r==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},s=new Ce(t,o);return s.center(),s.rotateY(-Math.PI/2),s.rotateZ(-Math.PI/2),s},mt=({position:r})=>{const n=a.useRef();return v((t,o)=>{n.current&&(n.current.rotation.z-=o*.1,n.current.rotation.x=Math.sin(t.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:r,ref:n,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,300,32]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[400,40,32,64]}),e.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((t,o)=>e.jsxs("mesh",{position:[Math.cos(t)*200,0,Math.sin(t)*200],rotation:[0,-t,Math.PI/2],children:[e.jsx("cylinderGeometry",{args:[20,20,300,16]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},o)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((t,o)=>e.jsxs("mesh",{position:[Math.cos(t)*400,0,Math.sin(t)*400],rotation:[Math.PI/2,0,-t],children:[e.jsx("boxGeometry",{args:[60,60,90]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${o}`))]})},pt=({position:r})=>{const n=a.useRef(),t=a.useMemo(()=>Q("bulwark"),[]);return v((o,s)=>{n.current&&(n.current.position.y=Math.sin(o.clock.elapsedTime*.2)*40,n.current.rotation.y+=s*.05,n.current.rotation.z=Math.sin(o.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:r,ref:n,scale:[120,120,120],children:[e.jsx("mesh",{geometry:t,children:e.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),e.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),e.jsxs("mesh",{position:[0,0,1.5],children:[e.jsx("sphereGeometry",{args:[.2,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},ht=({position:r})=>{const i=a.useMemo(()=>new H,[]),l=a.useMemo(()=>new H,[]),u=a.useRef(),c=a.useRef(),f=a.useRef(),m=a.useRef(),p=a.useMemo(()=>Q("interceptor"),[]),h=a.useMemo(()=>Q("viper"),[]),M=a.useMemo(()=>{const w=new Pe(.5,.5,20,4);return w.rotateX(Math.PI/2),w},[]),x=a.useMemo(()=>Array.from({length:80},(w,j)=>{const g=j>=40;return{pos:new b((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new b,target:new b,team:g?1:0,meshIndex:g?j-40:j,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),y=a.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new b,vel:new b,color:new T,life:0})),[60]);return v((w,j)=>{if(!u.current||!c.current||!f.current||!m.current)return;let g=0;x.forEach(d=>{if(d.state===0){if(Math.random()<.02||d.target.lengthSq()===0){const R=x[Math.floor(Math.random()*80)];R&&R.team!==d.team&&R.state===0?(d.target.copy(R.pos),d.target.x+=(Math.random()-.5)*200,d.target.y+=(Math.random()-.5)*200,d.target.z+=(Math.random()-.5)*200):d.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const z=new b().subVectors(d.target,d.pos),S=z.length();if(S>150&&S<800&&Math.random()<.03){const R=y.find(he=>!he.active);R&&(R.active=!0,R.pos.copy(d.pos),R.vel.copy(z).normalize().multiplyScalar(2500),R.color.set(d.team===0?"#00ffff":"#ff3300"),R.life=.8)}const A=z.normalize().multiplyScalar(400*j);d.vel.add(A),d.vel.clampLength(0,600),d.pos.addScaledVector(d.vel,j),d.trail.push(d.pos.clone()),d.trail.length>5&&d.trail.shift(),i.position.copy(d.pos);const O=i.position.clone().add(d.vel);i.lookAt(O);const q=A.clone().cross(d.vel).y;i.rotateZ(q*.01),i.scale.set(30,30,30)}else{d.explosionTimer+=j,i.position.copy(d.pos),i.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const z=30*Math.max(.1,1-d.explosionTimer*2);i.scale.set(z,z,z),d.explosionTimer>.5&&(d.state=0,d.health=100,d.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),d.vel.set(0,0,0),d.trail=[])}i.updateMatrix(),d.team===0?(u.current.setMatrixAt(d.meshIndex,i.matrix),u.current.setColorAt(d.meshIndex,d.state===0?new T("#00aaff"):new T("#ffaa00"))):(c.current.setMatrixAt(d.meshIndex,i.matrix),c.current.setColorAt(d.meshIndex,d.state===0?new T("#ff0033"):new T("#ffaa00"))),d.trail.forEach((z,S)=>{if(g<400){i.position.copy(z),i.rotation.set(0,0,0);const A=S/5*10;i.scale.set(A,A,A),i.updateMatrix(),m.current.setMatrixAt(g,i.matrix),m.current.setColorAt(g,d.team===0?new T("#00ffff"):new T("#ff5500")),g++}})});for(let d=g;d<400;d++)i.position.set(0,9999,0),i.scale.set(0,0,0),i.updateMatrix(),m.current.setMatrixAt(d,i.matrix);y.forEach((d,z)=>{d.active?(d.pos.addScaledVector(d.vel,j),d.life-=j,x.forEach(S=>{S.state===0&&d.pos.distanceTo(S.pos)<50&&(S.health-=50,d.active=!1,S.health<=0&&(S.state=1,S.explosionTimer=0))}),d.life<=0&&(d.active=!1),l.position.copy(d.pos),l.lookAt(l.position.clone().add(d.vel)),l.scale.set(1,1,1)):(l.position.set(0,9999,0),l.scale.set(0,0,0)),l.updateMatrix(),f.current.setMatrixAt(z,l.matrix),f.current.setColorAt(z,d.color)}),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),m.current.instanceMatrix.needsUpdate=!0,m.current.instanceColor&&(m.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0)}),e.jsxs("group",{position:r,children:[e.jsx("instancedMesh",{ref:u,args:[p,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:c,args:[h,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:f,args:[M,null,60],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:I})}),e.jsx("instancedMesh",{ref:m,args:[new Re(1,4,4),null,400],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:I,depthWrite:!1})})]})},xt=({position:r,rotation:n,visible:t})=>{const o=U(L,"/interstellar_logo_final.png");o.colorSpace=_;const s=E(),i=a.useRef({triggered:!1});return v(()=>{s&&s.offset>=.41&&s.offset<=.43&&!i.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,i.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),e.jsxs("group",{visible:t,position:r,rotation:n,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),e.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),e.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:P})]}),e.jsx(mt,{position:[0,-200,-800]}),e.jsx(pt,{position:[0,-120,-100]}),e.jsx(ht,{position:[0,-50,0]}),e.jsxs("group",{position:[0,120,200],children:[e.jsxs("mesh",{position:[0,50,0],children:[e.jsx("planeGeometry",{args:[180,180]}),e.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1})]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),e.jsx(X,{appId:"interstellar",position:[-150,100,200]})]})},gt=({position:r})=>{const n=a.useRef(),t=a.useMemo(()=>({uTime:{value:0},uColor:{value:new T("#00ffff")}}),[]);return v(o=>{n.current&&(n.current.uniforms.uTime.value=o.clock.elapsedTime)}),e.jsxs("mesh",{position:r,children:[e.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),e.jsx("shaderMaterial",{ref:n,transparent:!0,side:G,blending:I,depthWrite:!1,uniforms:t,vertexShader:`
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
        `})]})},vt=()=>{const r=a.useRef(),n=a.useMemo(()=>({uTime:{value:0},uColor:{value:new T("#0044ff")},uHighlight:{value:new T("#00ffff")}}),[]);return v(t=>{r.current&&(r.current.uniforms.uTime.value=t.clock.elapsedTime)}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),e.jsx("shaderMaterial",{ref:r,transparent:!0,wireframe:!0,uniforms:n,vertexShader:`
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
        `})]})},yt=({position:r,rotation:n,visible:t})=>{const[o,s]=a.useState(null);return a.useEffect(()=>{new L().load("/cloveh2o_logo.png",l=>{l.colorSpace=_,s(l)})},[]),e.jsxs("group",{visible:t,position:r,rotation:n,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:P})]}),e.jsx(vt,{}),e.jsx(gt,{position:[0,1800,-800]}),e.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),e.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),e.jsxs("group",{position:[0,0,-300],children:[o&&e.jsxs("mesh",{position:[0,80,0],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1,blending:I})]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},D=({color:r,number:n,groupRef:t,armRef:o})=>e.jsxs("group",{ref:t,children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.3,roughness:.4})]}),e.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("group",{position:[0,17,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2.8,32,32]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.8,metalness:.5})]}),e.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[e.jsx("boxGeometry",{args:[3.5,2,2]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),e.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.6})]})}),e.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:o,children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.6})]})}),e.jsxs("mesh",{position:[-1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.8})]}),e.jsxs("mesh",{position:[1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.8})]}),n&&e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:n})]}),wt=({position:r})=>{const n=a.useRef(),t=a.useRef(),o=a.useRef(),s=a.useRef(),i=a.useRef(),l=a.useRef(),u=a.useMemo(()=>new b(100,0,0),[]),c=a.useMemo(()=>new b(100,0,20),[]),f=a.useMemo(()=>new b(30,0,100),[]),m=a.useMemo(()=>new b(0,0,-20),[]),p=a.useMemo(()=>new b(20,0,220),[]),h=a.useMemo(()=>new b,[]),M=a.useMemo(()=>new b,[]);return a.useMemo(()=>new b,[]),v(x=>{const y=x.clock.elapsedTime%6;if(o.current&&o.current.rotation.set(0,0,-.3),y<.5)t.current&&t.current.position.copy(u),s.current&&s.current.position.copy(c),i.current&&i.current.position.copy(f),n.current&&n.current.position.copy(m),l.current&&l.current.position.copy(m).add(h.set(4.5,12,2));else if(y<4){const w=(y-.5)/3.5;if(t.current&&(w<.5?t.current.position.lerpVectors(u,h.set(100,0,110),w*2):t.current.position.lerpVectors(M.set(100,0,110),p,(w-.5)*2)),s.current&&t.current&&s.current.position.lerpVectors(c,h.set(p.x+8,0,p.z-8),w),i.current&&i.current.position.lerpVectors(f,h.set(p.x-8,0,p.z+8),w),l.current)if(y<1.5)l.current.position.copy(m).add(h.set(4.5,12,2));else{const j=(y-1.5)/2.5,g=Math.sin(j*Math.PI)*45;l.current.position.lerpVectors(m,p,j),l.current.position.y+=g+18}}else if(y<5)t.current&&t.current.position.lerpVectors(p,h.set(20,0,240),y-4),l.current&&t.current&&l.current.position.copy(t.current.position).add(h.set(0,12,3)),s.current&&(s.current.position.y=0),i.current&&(i.current.position.y=0);else if(y<5.5)o.current&&o.current.rotation.set(Math.PI,0,0),l.current&&t.current&&l.current.position.copy(t.current.position).add(h.set(4.5,20,0));else if(o.current&&o.current.rotation.set(-Math.PI/4,0,0),l.current&&t.current){const w=y-5.5,j=Math.abs(Math.cos(w*8))*10;l.current.position.copy(t.current.position).add(h.set(4.5,j,4))}}),e.jsxs("group",{position:r,children:[e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),e.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[e.jsx("planeGeometry",{args:[400,40]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),e.jsx(D,{color:"#0088ff",number:"QB",groupRef:n}),e.jsx(D,{color:"#00ffff",number:"80",groupRef:t,armRef:o}),e.jsx(D,{color:"#ff0044",number:"CB",groupRef:s}),e.jsx(D,{color:"#ff0044",number:"S",groupRef:i}),e.jsxs("mesh",{ref:l,children:[e.jsx("sphereGeometry",{args:[2,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},jt=({position:r,rotation:n,visible:t})=>{const o=U(L,"/fantasy_quant_stadium.jpg");return o.colorSpace=_,o.wrapS=W,o.repeat.set(-1,1),e.jsxs("group",{visible:t,position:r,rotation:n,children:[e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[2500,64,64]}),e.jsx("meshBasicMaterial",{map:o,side:P})]}),e.jsx(wt,{position:[0,-125,0],rotation:[0,-Math.PI/2,0]}),e.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),e.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),e.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]})]})},Mt=({position:r})=>{const t=a.useRef(),o=a.useMemo(()=>{const i=[];for(let l=0;l<4e3;l++){const u=Math.random()*Math.PI*2,c=(Math.random()-.5)*150,f=400,m=(f+c*Math.cos(u/2))*Math.cos(u),p=c*Math.sin(u/2),h=(f+c*Math.cos(u/2))*Math.sin(u);i.push({pos:new b(m,p,h),u,v:c,speed:Math.random()*.5+.2,color:new T(Math.random()>.5?"#00f3ff":"#0077ff")})}return i},[]),s=a.useMemo(()=>new H,[]);return v(i=>{if(!t.current)return;const l=i.clock.elapsedTime;o.forEach((u,c)=>{const f=(u.u+l*u.speed)%(Math.PI*2),m=400,p=(m+u.v*Math.cos(f/2))*Math.cos(f),h=u.v*Math.sin(f/2),M=(m+u.v*Math.cos(f/2))*Math.sin(f);s.position.set(p,h,M);const x=1.5+Math.sin(l*u.speed*5+c)*.8;s.scale.set(x,x,x),s.updateMatrix(),t.current.setMatrixAt(c,s.matrix),t.current.setColorAt(c,u.color)}),t.current.instanceMatrix.needsUpdate=!0,t.current.instanceColor&&(t.current.instanceColor.needsUpdate=!0)}),e.jsx("group",{position:r,children:e.jsx("instancedMesh",{ref:t,args:[new Ie(2,2),null,4e3],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:I,depthWrite:!1,side:G})})})},bt=()=>{const r=a.useMemo(()=>Array.from({length:30}).map(()=>{const t=[],o=(Math.random()-.5)*800,s=600+Math.random()*400,i=Math.random()*Math.PI*2;for(let l=0;l<=50;l++){const u=i+l/50*Math.PI*1.5;t.push(new b(Math.cos(u)*s,o+Math.sin(u*8)*50,Math.sin(u)*s))}return{points:t,color:Math.random()>.5?"#00f3ff":"#ffffff"}}),[]),n=a.useRef();return v(t=>{n.current&&(n.current.rotation.y=t.clock.elapsedTime*.15)}),e.jsx("group",{ref:n,children:r.map((t,o)=>e.jsx(_e,{points:t.points,color:t.color,lineWidth:2,transparent:!0,opacity:.4},o))})},zt=({position:r,rotation:n,visible:t})=>{const o=E(),[s,i]=a.useState(!1),l=a.useRef({triggered:!1,timer:0});return v((u,c)=>{if(!t)return;const f=o.offset;!l.current.triggered&&f>=.92&&(l.current.triggered=!0,i(!0),window.contangoLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.93*(o.el.scrollHeight-o.el.clientHeight))),window.contangoLocked&&(o.el&&(o.el.scrollTop=.93*(o.el.scrollHeight-o.el.clientHeight)),l.current.timer+=c,l.current.timer>1.5&&(window.contangoLocked=!1,i(!1),o.el&&(o.el.style.overflow="auto")))}),e.jsxs("group",{visible:t,position:r,rotation:n,children:[e.jsx("ambientLight",{intensity:.4}),e.jsx("directionalLight",{position:[0,500,500],intensity:1.5,color:"#ffffff"}),e.jsx("spotLight",{position:[-500,500,500],intensity:2,color:"#00f3ff",penumbra:1}),e.jsx("spotLight",{position:[500,-500,500],intensity:2,color:"#0077ff",penumbra:1}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[3e3,64,64]}),e.jsx("meshBasicMaterial",{color:"#010204",side:P})]}),e.jsx(bt,{}),e.jsx(Fe,{radius:1500,depth:50,count:5e3,factor:4,saturation:0,fade:!0,speed:1}),e.jsxs(J,{speed:2,rotationIntensity:.2,floatIntensity:1,floatingRange:[-10,10],children:[e.jsx(K.Suspense,{fallback:null}),e.jsx(C,{position:[0,250,-800],fontSize:100,anchorX:"center",anchorY:"middle",color:"#ffffff",children:"CONTANGO QUANT"}),e.jsx(C,{position:[0,120,-800],fontSize:35,color:"#00f3ff",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",children:"The physics of finance"})]}),e.jsx(Mt,{position:[0,-100,-800]}),e.jsx(Y,{count:4e3,scale:3e3,size:25,speed:.6,opacity:.5,color:"#00f3ff",position:[0,0,-500]})]})},Tt=({position:r,rotation:n,visible:t})=>{const o=a.useRef(),s=a.useRef(),i=U(L,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return v(l=>{o.current&&(o.current.position.y=Math.sin(l.clock.elapsedTime*1.5)*5),s.current&&(s.current.rotation.y+=.005,s.current.rotation.z+=.002)}),e.jsxs("group",{visible:t,position:r,rotation:n,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1500,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:P})]}),e.jsxs("group",{children:[e.jsx(J,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:e.jsxs("mesh",{ref:o,position:[0,0,-500],children:[e.jsx("planeGeometry",{args:[400,100]})," ",e.jsx("meshBasicMaterial",{map:i,transparent:!0,opacity:1,side:G,depthWrite:!1})]})}),e.jsx(Y,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),e.jsx(Y,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),e.jsx("ambientLight",{intensity:.5,color:"#002244"}),e.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},St=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Pt=`
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
`,Rt=({startZ:r=10,endZ:n=-500,visible:t=!0})=>{const o=a.useRef(),s=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);v(l=>{o.current&&t&&(o.current.uniforms.uTime.value=l.clock.elapsedTime,o.current.uniforms.uOpacity.value=k.lerp(o.current.uniforms.uOpacity.value,t?1:0,.05))});const i=a.useMemo(()=>{const l=[],c=r-n;for(let f=0;f<=100;f++){const m=r-f/100*c;l.push(new b(Math.sin(f*.1)*2,Math.cos(f*.05)*2,m))}return new Le(l)},[r,n]);return e.jsxs("mesh",{visible:t,children:[e.jsx("tubeGeometry",{args:[i,200,15,32,!1]}),e.jsx("shaderMaterial",{ref:o,vertexShader:St,fragmentShader:Pt,uniforms:s,side:P,transparent:!0,blending:I})]})},kt=`
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
`,Ct=`
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
`,It=({position:r,rotation:n=[0,0,0],length:t=4e3,visible:o=!0})=>{const s=a.useRef(),i=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:t}}),[t]);return v(l=>{s.current&&(s.current.uniforms.uTime.value=l.clock.elapsedTime,s.current.uniforms.uOpacity.value=o?1:0)}),e.jsx("group",{position:r,rotation:n,visible:o,children:e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[60,400,t+200,32,64,!0]}),e.jsx("shaderMaterial",{ref:s,vertexShader:kt,fragmentShader:Ct,uniforms:i,transparent:!0,side:P,wireframe:!1})]})})},ce=({position:r,rotation:n,length:t=4e3,radius:o=200,color:s="#ffffff",speed:i=20,visible:l=!0})=>{const u=a.useRef(),c=a.useMemo(()=>({uTime:{value:0},uColor:{value:new T(s)}}),[s]);return v(f=>{u.current&&(u.current.uniforms.uTime.value=f.clock.elapsedTime)}),e.jsxs("mesh",{visible:l,position:r,rotation:n,children:[e.jsx("cylinderGeometry",{args:[o,o,t,32,1,!0]}),e.jsx("shaderMaterial",{ref:u,transparent:!0,side:P,blending:I,depthWrite:!1,uniforms:c,vertexShader:`
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
        `})]})},Lt=()=>{const r=[],n=(t,o,s)=>{r.push({x:t,y:o,z:0,rot:[Math.PI/2,0,0],color:s,bodyHeight:40+Math.random()*40})};for(let t=Math.PI*.25;t<Math.PI*1.75;t+=.2)n(-100+Math.cos(t)*80,Math.sin(t)*80,"#00ff00");for(let t=0;t<Math.PI*2;t+=.2)n(100+Math.cos(t)*80,Math.sin(t)*80,"#ff0044");return n(140,-40,"#ff0044"),n(160,-60,"#ff0044"),n(180,-80,"#ff0044"),r},_t=({position:r,rotation:n=[0,0,0],length:t=6e3,radius:o=250,visible:s})=>{const i=a.useRef(),l=a.useRef(),u=a.useRef(),c=U(L,"/assets/images/contango_logo.png"),f=a.useMemo(()=>{const p=[],h=Math.floor(t/5);for(let x=0;x<h;x++){const y=-(x/h)*t,w=x*.1,j=Math.cos(w)*o,g=Math.sin(w)*o,d=Math.cos(w+Math.PI)*o,z=Math.sin(w+Math.PI)*o,A=Math.random()>.5?"#00ff00":"#ff0044",O=20+Math.random()*60,q=[0,0,w+Math.PI/2],R=[0,0,w+Math.PI+Math.PI/2];p.push({x:j,y:g,z:y,rot:q,color:A,bodyHeight:O}),p.push({x:d,y:z,z:y,rot:R,color:A,bodyHeight:O})}return Lt().forEach(x=>{p.push({x:x.x,y:x.y,z:-t-500,rot:x.rot,color:x.color,bodyHeight:x.bodyHeight})}),p},[t,o]),m=f.length;return a.useEffect(()=>{if(!l.current||!u.current)return;const p=new H,h=new T;for(let M=0;M<m;M++){const x=f[M];p.position.set(x.x,x.y,x.z),p.rotation.set(x.rot[0],x.rot[1],x.rot[2]),p.scale.set(1,x.bodyHeight+40,1),p.updateMatrix(),l.current.setMatrixAt(M,p.matrix),h.set(x.color),l.current.setColorAt(M,h),p.scale.set(1,x.bodyHeight,1),p.updateMatrix(),u.current.setMatrixAt(M,p.matrix),u.current.setColorAt(M,h)}l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0)},[f,m]),v(p=>{i.current&&s&&(i.current.rotation.z=p.clock.elapsedTime*.5)}),e.jsxs("group",{position:r,rotation:n,visible:s,children:[e.jsxs("group",{ref:i,children:[e.jsxs("instancedMesh",{ref:l,args:[null,null,m],children:[e.jsx("cylinderGeometry",{args:[2,2,1,8]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),e.jsxs("instancedMesh",{ref:u,args:[null,null,m],children:[e.jsx("boxGeometry",{args:[10,1,10]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),e.jsxs("mesh",{position:[0,0,-t-500],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0})]}),e.jsxs("mesh",{position:[0,0,-t/2],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[o*.8,o*.8,t,32,1,!0]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:P})]})]})},Et=({position:r,rotation:n,length:t=8e3,visible:o=!0})=>{const s=a.useRef(),i=a.useRef();v(u=>{if(!o||!s.current)return;const c=u.clock.getElapsedTime();s.current.map.offset.y=-c*3,i.current&&(i.current.rotation.y=c*2)});const l=K.useMemo(()=>{const u=document.createElement("canvas");u.width=512,u.height=512;const c=u.getContext("2d"),f=c.createLinearGradient(0,0,0,512);f.addColorStop(0,"#001a33"),f.addColorStop(.5,"#00ccff"),f.addColorStop(1,"#001a33"),c.fillStyle=f,c.fillRect(0,0,512,512),c.fillStyle="#ffffff";for(let p=0;p<200;p++)c.globalAlpha=Math.random()*.5,c.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const m=new fe(u);return m.wrapS=W,m.wrapT=W,m.repeat.set(4,20),m},[]);return e.jsxs("group",{position:r,rotation:n,visible:o,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,t,32,1,!0]}),e.jsx("meshStandardMaterial",{ref:s,map:l,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:P,transparent:!0,opacity:.9})]}),e.jsxs("mesh",{ref:i,children:[e.jsx("cylinderGeometry",{args:[140,140,t,16,40,!0]}),e.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:P})]})]})},F=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-9950,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-9950,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.705,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],At=r=>{if(r<=F[0].p)return F[0];if(r>=F[F.length-1].p)return F[F.length-1];for(let n=0;n<F.length-1;n++){const t=F[n],o=F[n+1];if(r>=t.p&&r<=o.p){const s=(r-t.p)/(o.p-t.p);return{x:k.lerp(t.x,o.x,s),y:k.lerp(t.y,o.y,s),z:k.lerp(t.z,o.z,s),rx:k.lerp(t.rx,o.rx,s),ry:k.lerp(t.ry,o.ry,s)}}}return F[0]},Ft=()=>{const r=E(),n=a.useRef();return v(t=>{let o=r.offset;window.icebreakerCaveLocked?o=.22:window.icebreakerThawLocked?o=.27:window.icebreakerTextLocked?o=.29:window.mindwaveLocked?o=.08:window.interstellarLocked?o=.42:window.contangoLocked&&(o=.93);const s=At(o);t.camera.position.x=k.lerp(t.camera.position.x,s.x,.2),t.camera.position.y=k.lerp(t.camera.position.y,s.y,.2),t.camera.position.z=k.lerp(t.camera.position.z,s.z,.2);const i=new $().setFromEuler(new ue(s.rx,s.ry,0));t.camera.quaternion.slerp(i,.15);const l=r.delta*10;t.camera.rotateZ(k.lerp(0,l*2,.2)),n.current&&n.current.position.copy(t.camera.position)}),e.jsxs("group",{children:[e.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),e.jsx("pointLight",{ref:n,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),e.jsx("ambientLight",{intensity:.2})]})},Gt=()=>{const r=E(),[n,t]=a.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),o=a.useRef(n);return v(()=>{const s=r.offset,i={intro:s<.08,mindwave:s>.04&&s<.18,wormhole_ice:s>.1&&s<.25,icebreaker:s>.18&&s<.35,wormhole_sound:s>.28&&s<.42,interstellar:s>.28&&s<.48,w_legal:s>.43&&s<.54,legal:s>.48&&s<.58,w_orbital:s>.53&&s<.65,orbital:s>.56&&s<.63,w_swarm:s>.59&&s<.67,swarm:s>.61&&s<.67,w_autopilot:s>.64&&s<.7,autopilot:s>.65&&s<.71,w_clove:s>.67&&s<.72,clove:s>.69&&s<.76,w_fantasy:s>.71&&s<.83,fantasy:s>.73&&s<.88,w_contango:s>.84&&s<.91,contango:s>.89&&s<.96,sentaient:s>.94};let l=!1;for(const u in i)o.current[u]!==i[u]&&(l=!0);l&&(o.current=i,t(i))}),e.jsxs("group",{children:[e.jsx(Rt,{startZ:10,endZ:-250,visible:n.intro}),e.jsx(lt,{position:[0,0,-1350],visible:n.mindwave}),e.jsx(It,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:n.wormhole_ice}),e.jsx(ot,{position:[0,-4e3,-2550],visible:n.icebreaker}),e.jsx(xt,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:n.interstellar}),e.jsx(ce,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:n.w_legal}),e.jsx(dt,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:n.legal}),e.jsx(ce,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#ff00ff",speed:40,visible:n.w_clove}),e.jsx(yt,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:n.clove}),e.jsx(Et,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:n.w_fantasy}),e.jsx(jt,{position:[0,-11700,-17500],rotation:[0,0,0],visible:n.fantasy}),e.jsx(_t,{position:[0,-11750,-20550],length:4e3,visible:n.w_contango}),e.jsx(zt,{position:[0,-11750,-24800],rotation:[0,0,0],visible:n.contango}),e.jsx(Tt,{position:[0,-11750,-29350],rotation:[0,0,0],visible:n.sentaient})]})},Ut=()=>{const r=E(),n=a.useRef(),t=a.useRef();return a.useRef(),a.useRef(),a.useRef(),v(()=>{const o=r.offset;if(n.current){const s=o<.03?1:0;n.current.style.opacity=s}if(t.current){const s=o>.2&&o<.28?1:0;t.current.style.opacity=s}}),e.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[e.jsxs("div",{ref:n,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[e.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),e.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),e.jsxs("div",{ref:t,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[e.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[e.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:e.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),e.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),e.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),e.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},Bt=()=>e.jsxs(ye,{gl:{antialias:!1,alpha:!0},children:[e.jsxs(Ee,{pages:10,damping:.2,distance:1.2,children:[e.jsxs(K.Suspense,{fallback:null,children:[e.jsx(Ft,{}),e.jsx(Gt,{})]}),e.jsx(Y,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),e.jsx(Ae,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:e.jsx(Ut,{})})]}),e.jsxs(we,{disableNormalPass:!0,children:[e.jsx(je,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),e.jsx(Me,{opacity:.05}),e.jsx(be,{eskil:!1,offset:.1,darkness:1.1})]})]}),$t=()=>e.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[e.jsxs(xe,{children:[e.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),e.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),e.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),e.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:e.jsx(ge,{})}),e.jsx("div",{className:"absolute inset-0 z-0",children:e.jsx(Bt,{})})]});export{$t as default};
//# sourceMappingURL=index-DCjiyBBC.js.map
