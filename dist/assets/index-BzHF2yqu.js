import{l as a,_ as K,k as e,a as pe,H as Me}from"./vendor-B9LTvCOU.js";import{H as we}from"./Header-B5dYvHz-.js";import{u as x,e as be,a as N,C as ze}from"./react-three-fiber.esm-ByO88Anx.js";import{E as Se,B as Te,N as Re,V as Pe}from"./Vignette-BPpHqtnC.js";import{a3 as oe,O as V,ar as z,o as se,G as ke,k as _,P as Ce,M as Ie,ak as C,a9 as E,a as F,K as L,n as U,B as R,a8 as O,Y as D,E as xe,h as ge,l as Le,ag as _e,ad as Ge,q as Ee,i as Fe}from"./three-CBDkq3Sm.js";import{u as A,F as Ae,a as Be,S as Ue}from"./Float-DJU-fsLN.js";import{T as w}from"./Text-CQXerAwR.js";import{S as ee}from"./Sparkles-Bi7C7Hzy.js";import"./main-DbWUsp6s.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";import"./constants-Dmc5HAgA.js";const ve=a.forwardRef(function({children:r,follow:t=!0,lockX:s=!1,lockY:n=!1,lockZ:i=!1,...c},f){const l=a.useRef(null),u=a.useRef(null),d=new oe;return x(({camera:h})=>{if(!t||!u.current)return;const g=u.current.rotation.clone();u.current.updateMatrix(),u.current.updateWorldMatrix(!1,!1),u.current.getWorldQuaternion(d),h.getWorldQuaternion(l.current.quaternion).premultiply(d.invert()),s&&(u.current.rotation.x=g.x),n&&(u.current.rotation.y=g.y),i&&(u.current.rotation.z=g.z)}),a.useImperativeHandle(f,()=>u.current,[]),a.createElement("group",K({ref:u},c),a.createElement("group",{ref:l},r))}),ne=(o,r)=>{"updateRanges"in o?o.updateRanges[0]=r:o.updateRange=r};function We(o){return typeof o=="function"}const ae=new V,ie=new V,X=[],H=new Ce;class He extends ke{constructor(){super(),this.color=new _("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var r;return(r=this.instance.current)==null?void 0:r.geometry}raycast(r,t){const s=this.instance.current;if(!s||!s.geometry||!s.material)return;H.geometry=s.geometry;const n=s.matrixWorld,i=s.userData.instances.indexOf(this.instanceKey);if(!(i===-1||i>s.count)){s.getMatrixAt(i,ae),ie.multiplyMatrices(n,ae),H.matrixWorld=ie,s.material instanceof Ie?H.material.side=s.material.side:H.material.side=s.material[0].side,H.raycast(r,X);for(let c=0,f=X.length;c<f;c++){const l=X[c];l.instanceId=i,l.object=this,t.push(l)}X.length=0}}}const ye=a.createContext(null),ce=new V,le=new V,Oe=new V,fe=new z,ue=new oe,de=new z,De=o=>o.isInstancedBufferAttribute,je=a.forwardRef(({context:o,children:r,...t},s)=>{a.useMemo(()=>be({PositionMesh:He}),[]);const n=a.useRef();a.useImperativeHandle(s,()=>n.current,[]);const{subscribe:i,getParent:c}=a.useContext(o||ye);return a.useLayoutEffect(()=>i(n),[]),a.createElement("positionMesh",K({instance:c(),instanceKey:n,ref:n},t),r)}),Ne=a.forwardRef(({context:o,children:r,range:t,limit:s=1e3,frames:n=1/0,...i},c)=>{const[{localContext:f,instance:l}]=a.useState(()=>{const p=a.createContext(null);return{localContext:p,instance:a.forwardRef((v,T)=>a.createElement(je,K({context:p},v,{ref:T})))}}),u=a.useRef(null);a.useImperativeHandle(c,()=>u.current,[]);const[d,h]=a.useState([]),[[g,y]]=a.useState(()=>{const p=new Float32Array(s*16);for(let v=0;v<s;v++)Oe.identity().toArray(p,v*16);return[p,new Float32Array([...new Array(s*3)].map(()=>1))]});a.useEffect(()=>{u.current.instanceMatrix.needsUpdate=!0});let b=0,j=0;const M=a.useRef([]);a.useLayoutEffect(()=>{M.current=Object.entries(u.current.geometry.attributes).filter(([p,v])=>De(v))}),x(()=>{if(n===1/0||b<n){u.current.updateMatrix(),u.current.updateMatrixWorld(),ce.copy(u.current.matrixWorld).invert(),j=Math.min(s,t!==void 0?t:s,d.length),u.current.count=j,ne(u.current.instanceMatrix,{offset:0,count:j*16}),ne(u.current.instanceColor,{offset:0,count:j*3});for(let p=0;p<d.length;p++){const v=d[p].current;v.matrixWorld.decompose(fe,ue,de),le.compose(fe,ue,de).premultiply(ce),le.toArray(g,p*16),u.current.instanceMatrix.needsUpdate=!0,v.color.toArray(y,p*3),u.current.instanceColor.needsUpdate=!0}b++}});const S=a.useMemo(()=>({getParent:()=>u,subscribe:p=>(h(v=>[...v,p]),()=>h(v=>v.filter(T=>T.current!==p.current)))}),[]);return a.createElement("instancedMesh",K({userData:{instances:d,limit:s,frames:n},matrixAutoUpdate:!1,ref:u,args:[null,null,0],raycast:()=>null},i),a.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:g.length/16,array:g,itemSize:16,usage:se}),a.createElement("instancedBufferAttribute",{attach:"instanceColor",count:y.length/3,array:y,itemSize:3,usage:se}),We(r)?a.createElement(f.Provider,{value:S},r(l)):o?a.createElement(o.Provider,{value:S},r):a.createElement(ye.Provider,{value:S},r))}),Ve=({position:o})=>{const r=a.useRef();A();const[t,s]=a.useState(null);return a.useEffect(()=>{new C().load("/assets/images/digital_fire.jpg",n=>{n.colorSpace=E,s(n)})},[]),x(n=>{if(r.current){const i=window.icebreakerThaw||0;r.current.material.opacity=i*.9;const c=1+Math.sin(n.clock.elapsedTime*5)*.1;r.current.scale.setScalar(c)}}),t?e.jsx("group",{position:o,children:e.jsx(ve,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{ref:r,position:[0,20,0],children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:F})]})})}):null},Xe=`
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
`,Ze=({position:o,angle:r,delay:t})=>{const s=a.useRef(),n=a.useRef();A();const i=a.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new _("#44aaff")},uPartyColor:{value:new _("#ff8844")}}),[]);return x(c=>{if(!s.current||!n.current)return;i.uTime.value=c.clock.elapsedTime;const f=window.icebreakerThaw||0,l=L.clamp((f-t)*2,0,1);i.uState.value=l;const u=Math.sin(c.clock.elapsedTime*8+t*10)*l;if(s.current.position.y=o[1]+(u>0?u*2:0)+15,l>0){const d=0-o[0],h=0-(o[2]- -200),g=Math.sqrt(d*d+h*h)||1;s.current.position.x=o[0]+d/g*(l*20),s.current.position.z=o[2]+h/g*(l*20)}else s.current.position.x=o[0],s.current.position.z=o[2]}),e.jsx("group",{ref:s,position:[o[0],o[1]+15,o[2]],children:e.jsx(ve,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{children:[e.jsx("planeGeometry",{args:[20,30]}),e.jsx("shaderMaterial",{ref:n,vertexShader:Xe,fragmentShader:Ye,uniforms:i,transparent:!0,side:U,depthWrite:!1})]})})})},qe=({position:o})=>{const t=a.useMemo(()=>{const s=[];for(let n=0;n<60;n++){const i=Math.random()*Math.PI*2,c=30+Math.random()*80;s.push({position:[o[0]+Math.cos(i)*c,o[1],o[2]+Math.sin(i)*c],angle:i,delay:Math.random()*.5})}return s},[60,o]);return e.jsx("group",{children:t.map((s,n)=>e.jsx(Ze,{...s},n))})},re=({appId:o,position:r})=>e.jsx("group",{position:r}),Qe=({position:o})=>{const r=a.useRef(),[t,s]=a.useState(null);return A(),a.useEffect(()=>{new C().load("/icebreaker_logo.png",n=>{n.colorSpace=E,s(n)})},[]),x(n=>{if(r.current&&(r.current.rotation.y=n.clock.elapsedTime*.5,r.current.position.y=o[1]+Math.sin(n.clock.elapsedTime*2)*5,r.current.material)){const i=window.icebreakerThaw||0;r.current.material.opacity=i*.9,r.current.scale.setScalar(.01+i)}}),t?e.jsxs("mesh",{ref:r,position:o,children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:F,side:U})]}):null},Ke=({numTrees:o=30,radius:r=50,centerZ:t=-500})=>{const s=a.useRef(),n=a.useRef();A();const i=a.useMemo(()=>new D,[]),c=a.useMemo(()=>{const f=[];for(let l=0;l<o;l++){const u=l/o*Math.PI*2+Math.random()*.5,d=r+Math.random()*20;f.push({position:new z(Math.cos(u)*d,-18,Math.sin(u)*d+t),rotation:new xe(0,u+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return f},[o,r,t]);return x(()=>{if(!s.current||!n.current)return;const f=window.icebreakerThaw||0;for(let l=0;l<o;l++){const u=c[l],d=Math.max(0,(f-u.delay)*2),h=L.clamp(d,0,1)*u.scale;i.position.copy(u.position),i.rotation.copy(u.rotation),i.scale.setScalar(h),i.updateMatrix(),s.current.setMatrixAt(l,i.matrix),i.position.y+=18*h,i.updateMatrix(),n.current.setMatrixAt(l,i.matrix)}s.current.instanceMatrix.needsUpdate=!0,n.current.instanceMatrix.needsUpdate=!0}),e.jsxs("group",{children:[e.jsxs("instancedMesh",{ref:s,args:[null,null,o],children:[e.jsx("cylinderGeometry",{args:[.5,1,20,8]}),e.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),e.jsxs("instancedMesh",{ref:n,args:[null,null,o],children:[e.jsx("sphereGeometry",{args:[8,4,4]}),e.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},$e=`
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
`,et=({startZ:o,endZ:r})=>{const t=a.useRef(),s=a.useRef(),[n,i]=a.useState(null),c=Math.abs(r-o),f=(o+r)/2,l=a.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return a.useEffect(()=>{new C().load("/assets/images/ice_cavern.jpg",u=>{u.wrapS=O,u.wrapT=O,u.repeat.set(4,2),u.colorSpace=E,i(u),l.tMap.value=u})},[l]),x(u=>{if(s.current){const d=window.icebreakerThaw||0;l.uThaw.value=d,l.uTime.value=u.clock.elapsedTime}}),n?e.jsxs("mesh",{ref:t,position:[0,0,f],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[120,120,c,128,128,!0]}),e.jsx("shaderMaterial",{ref:s,vertexShader:$e,fragmentShader:Je,uniforms:l,transparent:!0,side:R})]}):null},tt=({position:o})=>{const r=a.useRef();return x(t=>{if(r.current){const s=window.icebreakerThaw||0,n=L.lerp(.01,50,Math.pow(s,2));r.current.scale.setScalar(n),r.current.visible=s>0}}),e.jsxs("mesh",{ref:r,position:[o[0],o[1]+1,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[20,64]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},ot=({position:o})=>{const r=a.useRef();return x(t=>{if(r.current){const s=window.icebreakerThaw||0;r.current.scale.setScalar(s>0?1:.001)}}),e.jsxs("mesh",{ref:r,position:[o[0],o[1]+1.5,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[96,64]}),e.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},rt=({position:o})=>{const r=a.useRef();return x(()=>{if(r.current){const t=window.icebreakerThaw||0;r.current.opacity=1-Math.pow(t,2),r.current.transparent=!0}}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:o,children:[e.jsx("planeGeometry",{args:[1e3,3e3]}),e.jsx("meshStandardMaterial",{ref:r,color:"#001133",roughness:.1,metalness:.8})]})},st=({centerZ:o})=>{const r=a.useRef(),t=a.useRef(),s=a.useMemo(()=>({uColorBottom:{value:new _("#ffaa55")},uColorTop:{value:new _("#00f3ff")},uOpacity:{value:0}}),[]);return x(()=>{const n=window.icebreakerThaw||0;r.current&&(r.current.uniforms.uOpacity.value=n),t.current&&(t.current.intensity=n*.6)}),e.jsxs("group",{children:[e.jsxs("mesh",{scale:2e3,children:[e.jsx("sphereGeometry",{args:[1,32,32]}),e.jsx("shaderMaterial",{ref:r,side:R,transparent:!0,depthWrite:!1,uniforms:s,vertexShader:`
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
          `})]}),e.jsx("directionalLight",{ref:t,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),e.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},nt=()=>{const o=A(),[r,t]=a.useState(!1),[s,n]=a.useState(!1),[i,c]=a.useState(!1),f=a.useRef({triggered:!1,timer:0}),l=a.useRef({triggered:!1,timer:0});return a.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),x((u,d)=>{const h=o.offset;!l.current.triggered&&h>=.22&&(l.current.triggered=!0,c(!0),window.icebreakerCaveLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerCaveLocked&&(o.el&&(o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight)),l.current.timer+=d,l.current.timer>1.5&&(window.icebreakerCaveLocked=!1,c(!1),o.el&&(o.el.style.overflow="auto"))),!r&&h>=.265&&window.icebreakerThaw<1&&(t(!0),window.icebreakerThawLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerThawLocked?(o.el&&(o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight)),window.icebreakerThaw+=d*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,o.el&&!s&&(o.el.style.overflow="auto"),t(!1))):h<.2&&(window.icebreakerThaw=0),!f.current.triggered&&h>=.285&&window.icebreakerThaw>=1&&(f.current.triggered=!0,n(!0),window.icebreakerTextLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerTextLocked&&(o.el&&(o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight)),f.current.timer+=d,f.current.timer>1.5&&(window.icebreakerTextLocked=!1,n(!1),o.el&&(o.el.style.overflow="auto")))}),null},at=({position:o,rotation:r,visible:t=!0})=>e.jsxs("group",{position:o,rotation:r,visible:t,children:[e.jsx(nt,{}),e.jsx(st,{centerZ:0}),e.jsx(et,{startZ:1e3,endZ:-1e3}),e.jsx(rt,{position:[0,-20,0]}),e.jsx(tt,{position:[0,-20,0]}),e.jsx(ot,{position:[0,-20,0]}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),e.jsx(Ve,{position:[0,-20,0]}),e.jsx(Qe,{position:[0,30,0]}),e.jsx(Ke,{radius:60,centerZ:0}),e.jsx(qe,{position:[0,-20,0]}),e.jsx(re,{appId:"icebreaker",position:[-80,20,-200]})]}),Y=({position:o,speed:r=2,direction:t=1,color:s="#00ffcc"})=>{const n=a.useRef();return x((i,c)=>{n.current&&n.current.children.forEach((f,l)=>{l!==0&&(f.position.z+=r*t*c*100,f.position.z>1e3&&(f.position.z=-1e3),f.position.z<-1e3&&(f.position.z=1e3))})}),e.jsxs("group",{position:o,ref:n,children:[e.jsxs("mesh",{position:[0,-5,0],children:[e.jsx("boxGeometry",{args:[60,4,2e3]}),e.jsx("meshStandardMaterial",{color:"#111",metalness:.9,roughness:.1}),e.jsx("meshBasicMaterial",{color:"#333",wireframe:!0})]}),Array.from({length:20}).map((i,c)=>e.jsxs("mesh",{position:[0,10,-1e3+c*100],children:[e.jsx("boxGeometry",{args:[30,20,40]}),e.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:2,transparent:!0,opacity:.8,wireframe:!0})]},c))]})},Z=({position:o,color:r="#ff00ff"})=>{const t=a.useRef();return x(s=>{t.current&&(t.current.rotation.x=s.clock.elapsedTime*.5,t.current.rotation.y=s.clock.elapsedTime*.3)}),e.jsxs("group",{position:o,children:[e.jsxs("mesh",{position:[0,-100,0],children:[e.jsx("boxGeometry",{args:[100,200,100]}),e.jsx("meshStandardMaterial",{color:"#000",metalness:1,roughness:0}),e.jsx("meshBasicMaterial",{color:r,wireframe:!0})]}),e.jsxs("mesh",{position:[0,100,0],ref:t,children:[e.jsx("icosahedronGeometry",{args:[50,1]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:1,wireframe:!0})]})]})},it=({position:o,rotation:r,visible:t})=>{const[s,n]=a.useState(null),i=A(),[c,f]=a.useState(!1);return x(()=>{t&&(i.offset>.575&&i.offset<.595&&!c&&!window.autopilotLocked&&(window.autopilotLocked=!0,f(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(i.offset<.55||i.offset>.62)&&c&&(f(!1),window.autopilotLocked=!1))}),a.useEffect(()=>{new C().load("/autopilot_logo.png",u=>{u.colorSpace=E,n(u)})},[]),e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:R})]}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[4e3,4e3]}),e.jsx("meshBasicMaterial",{color:"#001122",transparent:!0,opacity:.8})]}),e.jsx("gridHelper",{args:[4e3,100,"#00ffcc","#003344"],position:[0,-199,0]}),e.jsx(Y,{position:[-400,-150,0],speed:4,direction:1,color:"#00ffcc"}),e.jsx(Y,{position:[400,-150,0],speed:5,direction:-1,color:"#ff00ff"}),e.jsx(Y,{position:[-800,-150,0],speed:3,direction:-1,color:"#0088ff"}),e.jsx(Y,{position:[800,-150,0],speed:6,direction:1,color:"#ffaa00"}),e.jsx(Z,{position:[-200,-50,-1e3],color:"#00ffcc"}),e.jsx(Z,{position:[200,-50,-800],color:"#ff00ff"}),e.jsx(Z,{position:[-600,-50,-600],color:"#0088ff"}),e.jsx(Z,{position:[600,-50,-400],color:"#ffaa00"}),e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{color:"#00ffcc",intensity:3,distance:2e3,position:[-500,500,-500]}),e.jsx("pointLight",{color:"#ff00ff",intensity:3,distance:2e3,position:[500,500,500]}),e.jsxs("group",{position:[0,0,-300],children:[s&&e.jsxs("mesh",{position:[0,100,0],children:[e.jsx("planeGeometry",{args:[250,250]}),e.jsx("meshBasicMaterial",{map:s,transparent:!0,depthWrite:!1,blending:F})]}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-40,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ffcc",anchorX:"center",anchorY:"middle",children:"AUTOPILOT"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-100,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#003344",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"Fully autonomous marketing pipelines. Generates content, schedules campaigns, and optimizes spend."})]})]})},ct=`
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
`,lt=`
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
`,ft=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,ut=({position:o,visible:r})=>e.jsxs("group",{visible:r,position:o,children:[e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),dt=({position:o,visible:r})=>{const t=A(),s=a.useRef(),n=a.useRef(),i=a.useRef(),[c,f]=a.useState(null),[l,u]=a.useState(null),[d,h]=a.useState(!1),g=a.useRef({triggered:!1,timer:0});a.useEffect(()=>{window.mindwaveLocked=!1,new C().load("/mindwave-logo.png",j=>{j.colorSpace=E,f(j)}),new C().load("/tribal-sun.png",j=>{j.colorSpace=E,u(j)})},[]);const y=o?o[2]:0,b=a.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return x((j,M)=>{if(!r)return;const S=t.offset;!g.current.triggered&&S>=.075&&(g.current.triggered=!0,h(!0),window.mindwaveLocked=!0,t.el&&(t.el.style.overflow="hidden",t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight))),window.mindwaveLocked&&(t.el&&(t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight)),g.current.timer+=M,g.current.timer>1.5&&(window.mindwaveLocked=!1,h(!1),t.el&&(t.el.style.overflow="auto")));const p=j.clock.elapsedTime;if(s.current){s.current.uniforms.uTime.value=p;const v=Math.abs(j.camera.position.z-y);let P=1-Math.min(v/1e3,1);P=Math.pow(P,2),s.current.uniforms.uScrollProgress.value=P}if(n.current){n.current.position.y=-7+Math.sin(p*2)*2;const v=1+Math.sin(p*4)*.05;n.current.scale.set(v,v,1),n.current.rotation.y=0}if(i.current){i.current.position.y=125+Math.sin(p*2)*2,i.current.rotation.z=p*.1;const v=1+Math.sin(p*3)*.05;i.current.scale.set(v,v,1)}}),e.jsxs("group",{visible:r,position:o,children:[e.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[e.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),e.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:ft,side:R,depthWrite:!1})]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[e.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),e.jsx("shaderMaterial",{ref:s,vertexShader:ct,fragmentShader:lt,uniforms:b,transparent:!0,side:U,wireframe:!1})]}),l&&e.jsxs("mesh",{ref:i,position:[0,-10,-85],children:[e.jsx("planeGeometry",{args:[140,140]}),e.jsx("meshBasicMaterial",{map:l,transparent:!0,side:U,depthWrite:!1,blending:F,color:"#00ffff",opacity:.6})]}),c&&e.jsxs("mesh",{ref:n,position:[0,-10,-80],children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0,side:U,depthWrite:!1,blending:F})]}),e.jsx(ut,{position:[0,-5,-80],visible:!0}),e.jsx(re,{appId:"mindwave",position:[40,0,-40]})]})},mt=({position:o})=>{const r=a.useRef(),[t,s]=a.useState(null);return a.useEffect(()=>{new C().load("/legal_eagle_logo.png",n=>{n.colorSpace=E,s(n)})},[]),x(n=>{r.current&&(r.current.position.y=o[1]+Math.sin(n.clock.elapsedTime*1.5)*1.5)}),t?e.jsxs("group",{position:o,children:[e.jsxs("mesh",{ref:r,children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:1,depthWrite:!1,side:U})]}),e.jsx("pointLight",{color:"#ffffff",intensity:2,distance:100,position:[0,0,20]})]}):null},ht=()=>{const[o,r]=a.useState(null);return a.useEffect(()=>{new C().load("/legal_eagle_courtroom_bg.jpg",t=>{t.colorSpace=E,r(t)})},[]),o?e.jsxs("mesh",{position:[0,0,-600],children:[e.jsx("planeGeometry",{args:[1600,900]}),e.jsx("meshBasicMaterial",{map:o,side:U,toneMapped:!1})]}):null},J=({position:o,text:r,color:t})=>{const s=a.useRef();return x(n=>{s.current&&(s.current.position.y=o[1]+Math.sin(n.clock.elapsedTime*2+o[0])*2)}),e.jsxs("group",{ref:s,position:o,children:[e.jsxs(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],fontSize:12,color:t,maxWidth:120,textAlign:"center",anchorX:"center",anchorY:"middle",children:[r,e.jsx("meshBasicMaterial",{color:t,transparent:!0,opacity:.9})]}),e.jsx("pointLight",{color:t,intensity:1,distance:100})]})},pt=()=>{const r=a.useRef([]),t=a.useRef(document.createElement("canvas")),s=a.useMemo(()=>{t.current.width=512,t.current.height=1024;const i=t.current.getContext("2d");i.fillStyle="#010a15",i.fillRect(0,0,512,1024),i.strokeStyle="#004488",i.lineWidth=2;for(let f=0;f<1024;f+=32)i.beginPath(),i.moveTo(0,f),i.lineTo(512,f),i.stroke(),f<512&&(i.beginPath(),i.moveTo(f,0),i.lineTo(f,1024),i.stroke());i.fillStyle="#0088ff",i.fillRect(40,40,432,60),i.fillStyle="#00ffff",i.font="24px monospace",i.fillText("CLASSIFIED // AI REVIEW",60,78),i.fillStyle="#003366";for(let f=0;f<30;f++){let l=140+f*28;i.fillRect(40,l,432-Math.random()*200,12)}i.strokeStyle="#ff0033",i.lineWidth=5,i.beginPath(),i.arc(400,850,60,0,Math.PI*2),i.stroke(),i.beginPath(),i.arc(400,850,50,0,Math.PI*2),i.stroke();const c=new ge(t.current);return c.colorSpace=E,c},[]),n=a.useMemo(()=>Array.from({length:50}).map((i,c)=>({delay:c*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-400+Math.random()*200})),[50]);return x((i,c)=>{const f=i.clock.elapsedTime;n.forEach((l,u)=>{const d=r.current[u];d&&(f>l.delay&&(l.state==="waiting"&&(l.state="approaching"),l.state==="approaching"&&(l.x-=8e3*c,l.x<=0&&(l.x=0,l.state="scanning",l.scanTimer=f)),l.state==="scanning"&&f-l.scanTimer>.05&&(l.state="approved"),l.state==="approved"&&(l.x-=8e3*c,l.x<-3e3&&(l.x=3e3+Math.random()*500,l.state="approaching",l.y=(Math.random()-.5)*150-50))),d.position.set(l.x,l.y,l.z),l.state==="scanning"?(d.rotation.set(0,0,0),d.scale.setScalar(1.2)):l.state==="approved"?(d.rotation.set(0,.4,0),d.scale.setScalar(1)):(d.rotation.set(0,-.4,0),d.scale.setScalar(1)),l.state==="scanning"?d.color.set("#ffffff"):l.state==="approved"?d.color.set("#00ff66"):d.color.set("#0088ff"))})}),e.jsxs(Ne,{limit:50,range:50,children:[e.jsx("planeGeometry",{args:[100,200]}),e.jsx("meshBasicMaterial",{map:s,side:U,transparent:!0,opacity:.9,blending:F,depthWrite:!1}),n.map((i,c)=>e.jsx(je,{ref:f=>r.current[c]=f,position:[i.x,i.y,i.z]},c))]})},xt=({position:o,rotation:r,visible:t})=>e.jsxs("group",{position:o,rotation:r,visible:t,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx(ht,{}),e.jsx(pt,{}),e.jsx(mt,{position:[0,20,-200]}),e.jsx(J,{position:[-140,-20,-100],text:"AI Contract\\nCreation",color:"#00ffcc"}),e.jsx(J,{position:[140,-20,-100],text:"Intelligent\\nContract Review",color:"#ff00ff"}),e.jsx(J,{position:[0,-50,-50],text:"Real-Time\\nEdits & Formatting",color:"#d4af37"})]}),te=o=>{const t=new Ge;o==="interceptor"?(t.moveTo(1*1.8,0),t.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),t.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),t.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),t.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):o==="viper"?(t.moveTo(1*1.2,1*.3),t.lineTo(1*.4,1*.4),t.lineTo(-1*.8,1*1.2),t.lineTo(-1*1.2,1*.8),t.lineTo(-1*.8,0),t.lineTo(-1*1.2,-1*.8),t.lineTo(-1*.8,-1*1.2),t.lineTo(1*.4,-1*.4),t.lineTo(1*1.2,-1*.3),t.lineTo(1*.6,0)):o==="bulwark"&&(t.moveTo(1*1.5,0),t.lineTo(1*.8,1*1.2),t.lineTo(-1*.5,1*1.5),t.lineTo(-1*1.5,1*.8),t.lineTo(-1*1.5,-1*.8),t.lineTo(-1*.5,-1*1.5),t.lineTo(1*.8,-1*1.2));const s={steps:1,depth:o==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},n=new Ee(t,s);return n.center(),n.rotateY(-Math.PI/2),n.rotateZ(-Math.PI/2),n},gt=({position:o})=>{const r=a.useRef();return x((t,s)=>{r.current&&(r.current.rotation.z-=s*.1,r.current.rotation.x=Math.sin(t.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:r,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,300,32]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[400,40,32,64]}),e.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((t,s)=>e.jsxs("mesh",{position:[Math.cos(t)*200,0,Math.sin(t)*200],rotation:[0,-t,Math.PI/2],children:[e.jsx("cylinderGeometry",{args:[20,20,300,16]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},s)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((t,s)=>e.jsxs("mesh",{position:[Math.cos(t)*400,0,Math.sin(t)*400],rotation:[Math.PI/2,0,-t],children:[e.jsx("boxGeometry",{args:[60,60,90]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${s}`))]})},vt=({position:o})=>{const r=a.useRef(),t=a.useMemo(()=>te("bulwark"),[]);return x((s,n)=>{r.current&&(r.current.position.y=Math.sin(s.clock.elapsedTime*.2)*40,r.current.rotation.y+=n*.05,r.current.rotation.z=Math.sin(s.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:r,scale:[120,120,120],children:[e.jsx("mesh",{geometry:t,children:e.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),e.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),e.jsxs("mesh",{position:[0,0,1.5],children:[e.jsx("sphereGeometry",{args:[.2,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},yt=({position:o})=>{const i=a.useMemo(()=>new D,[]),c=a.useMemo(()=>new D,[]),f=a.useRef(),l=a.useRef(),u=a.useRef(),d=a.useRef(),h=a.useMemo(()=>te("interceptor"),[]),g=a.useMemo(()=>te("viper"),[]),y=a.useMemo(()=>{const v=new Le(.5,.5,20,4);return v.rotateX(Math.PI/2),v},[]),b=a.useMemo(()=>Array.from({length:80},(v,T)=>{const P=T>=40;return{pos:new z((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new z,target:new z,team:P?1:0,meshIndex:P?T-40:T,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),j=a.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new z,vel:new z,color:new _,life:0})),[60]),M=a.useMemo(()=>new z,[]),S=a.useMemo(()=>new z,[]),p=a.useMemo(()=>new _,[]);return x((v,T)=>{if(!f.current||!l.current||!u.current||!d.current)return;let P=0;b.forEach(m=>{if(m.state===0){if(Math.random()<.02||m.target.lengthSq()===0){const I=b[Math.floor(Math.random()*80)];I&&I.team!==m.team&&I.state===0?(m.target.copy(I.pos),m.target.x+=(Math.random()-.5)*200,m.target.y+=(Math.random()-.5)*200,m.target.z+=(Math.random()-.5)*200):m.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}M.subVectors(m.target,m.pos);const G=M.length();if(G>150&&G<800&&Math.random()<.03){const I=j.find($=>!$.active);I&&(I.active=!0,I.pos.copy(m.pos),I.vel.copy(M).normalize().multiplyScalar(2500),I.color.set(m.team===0?"#00ffff":"#ff3300"),I.life=.8)}const k=M.normalize().multiplyScalar(400*T);m.vel.add(k),m.vel.clampLength(0,600),m.pos.addScaledVector(m.vel,T),m.trail.push(m.pos.clone()),m.trail.length>5&&m.trail.shift(),i.position.copy(m.pos);const W=i.position.clone().add(m.vel);i.lookAt(W),S.copy(k).cross(m.vel),i.rotateZ(S.y*.01),i.scale.set(30,30,30)}else{m.explosionTimer+=T,i.position.copy(m.pos),i.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const G=30*Math.max(.1,1-m.explosionTimer*2);i.scale.set(G,G,G),m.explosionTimer>.5&&(m.state=0,m.health=100,m.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),m.vel.set(0,0,0),m.trail=[])}i.updateMatrix(),m.team===0?(f.current.setMatrixAt(m.meshIndex,i.matrix),p.set(m.state===0?"#00aaff":"#ffaa00"),f.current.setColorAt(m.meshIndex,p)):(l.current.setMatrixAt(m.meshIndex,i.matrix),p.set(m.state===0?"#ff0033":"#ffaa00"),l.current.setColorAt(m.meshIndex,p)),m.trail.forEach((G,k)=>{if(P<400){i.position.copy(G),i.rotation.set(0,0,0);const W=k/5*10;i.scale.set(W,W,W),i.updateMatrix(),d.current.setMatrixAt(P,i.matrix),p.set(m.team===0?"#00ffff":"#ff5500"),d.current.setColorAt(P,p),P++}})});for(let m=P;m<400;m++)i.position.set(0,9999,0),i.scale.set(0,0,0),i.updateMatrix(),d.current.setMatrixAt(m,i.matrix);j.forEach((m,G)=>{m.active?(m.pos.addScaledVector(m.vel,T),m.life-=T,b.forEach(k=>{k.state===0&&m.pos.distanceTo(k.pos)<50&&(k.health-=50,m.active=!1,k.health<=0&&(k.state=1,k.explosionTimer=0))}),m.life<=0&&(m.active=!1),c.position.copy(m.pos),c.lookAt(c.position.clone().add(m.vel)),c.scale.set(1,1,1)):(c.position.set(0,9999,0),c.scale.set(0,0,0)),c.updateMatrix(),u.current.setMatrixAt(G,c.matrix),u.current.setColorAt(G,m.color)}),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),d.current.instanceMatrix.needsUpdate=!0,d.current.instanceColor&&(d.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0)}),e.jsxs("group",{position:o,children:[e.jsx("instancedMesh",{ref:f,args:[h,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:l,args:[g,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:u,args:[y,null,60],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:F})}),e.jsx("instancedMesh",{ref:d,args:[new _e(1,4,4),null,400],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:F,depthWrite:!1})})]})},jt=({position:o,rotation:r,visible:t})=>{const s=N(C,"/interstellar_logo_final.png");s.colorSpace=E;const n=A(),i=a.useRef({triggered:!1});return x(()=>{n&&n.offset>=.41&&n.offset<=.43&&!i.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,i.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),e.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),e.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:R})]}),e.jsx(gt,{position:[0,-200,-800]}),e.jsx(vt,{position:[0,-120,-100]}),e.jsx(yt,{position:[0,-50,0]}),e.jsxs("group",{position:[0,120,200],children:[e.jsxs("mesh",{position:[0,50,0],children:[e.jsx("planeGeometry",{args:[180,180]}),e.jsx("meshBasicMaterial",{map:s,transparent:!0,depthWrite:!1})]}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),e.jsx(re,{appId:"interstellar",position:[-150,100,200]})]})},Mt=({position:o})=>{const r=a.useRef(),t=a.useMemo(()=>({uTime:{value:0},uColor:{value:new _("#00ffff")}}),[]);return x(s=>{r.current&&(r.current.uniforms.uTime.value=s.clock.elapsedTime)}),e.jsxs("mesh",{position:o,children:[e.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),e.jsx("shaderMaterial",{ref:r,transparent:!0,side:U,blending:F,depthWrite:!1,uniforms:t,vertexShader:`
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
        `})]})},wt=()=>{const o=a.useRef(),r=a.useMemo(()=>({uTime:{value:0},uColor:{value:new _("#0044ff")},uHighlight:{value:new _("#00ffff")}}),[]);return x(t=>{o.current&&(o.current.uniforms.uTime.value=t.clock.elapsedTime)}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),e.jsx("shaderMaterial",{ref:o,transparent:!0,wireframe:!0,uniforms:r,vertexShader:`
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
        `})]})},bt=({position:o,rotation:r,visible:t})=>{const[s,n]=a.useState(null);return a.useEffect(()=>{new C().load("/cloveh2o_logo.png",c=>{c.colorSpace=E,n(c)})},[]),e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:R})]}),e.jsx(wt,{}),e.jsx(Mt,{position:[0,1800,-800]}),e.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),e.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),e.jsxs("group",{position:[0,0,-300],children:[s&&e.jsxs("mesh",{position:[0,80,0],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:s,transparent:!0,depthWrite:!1,blending:F})]}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},q=({color:o,number:r,groupRef:t,armRef:s})=>e.jsxs("group",{ref:t,children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.3,roughness:.4})]}),e.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("group",{position:[0,17,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2.8,32,32]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.8,metalness:.5})]}),e.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[e.jsx("boxGeometry",{args:[3.5,2,2]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),e.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:s,children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsxs("mesh",{position:[-1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),e.jsxs("mesh",{position:[1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),r&&e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:r})]}),zt=({position:o})=>{const r=a.useRef(),t=a.useRef(),s=a.useRef(),n=a.useRef(),i=a.useRef(),c=a.useRef(),f=a.useMemo(()=>new z(100,0,0),[]),l=a.useMemo(()=>new z(100,0,20),[]),u=a.useMemo(()=>new z(30,0,100),[]),d=a.useMemo(()=>new z(0,0,-20),[]),h=a.useMemo(()=>new z(20,0,220),[]),g=a.useMemo(()=>new z,[]),y=a.useMemo(()=>new z,[]);return a.useMemo(()=>new z,[]),x(b=>{const j=b.clock.elapsedTime%6;if(s.current&&s.current.rotation.set(0,0,-.3),j<.5)t.current&&t.current.position.copy(f),n.current&&n.current.position.copy(l),i.current&&i.current.position.copy(u),r.current&&r.current.position.copy(d),c.current&&c.current.position.copy(d).add(g.set(4.5,12,2));else if(j<4){const M=(j-.5)/3.5;if(t.current&&(M<.5?t.current.position.lerpVectors(f,g.set(100,0,110),M*2):t.current.position.lerpVectors(y.set(100,0,110),h,(M-.5)*2)),n.current&&t.current&&n.current.position.lerpVectors(l,g.set(h.x+8,0,h.z-8),M),i.current&&i.current.position.lerpVectors(u,g.set(h.x-8,0,h.z+8),M),c.current)if(j<1.5)c.current.position.copy(d).add(g.set(4.5,12,2));else{const S=(j-1.5)/2.5,p=Math.sin(S*Math.PI)*45;c.current.position.lerpVectors(d,h,S),c.current.position.y+=p+18}}else if(j<5)t.current&&t.current.position.lerpVectors(h,g.set(20,0,240),j-4),c.current&&t.current&&c.current.position.copy(t.current.position).add(g.set(0,12,3)),n.current&&(n.current.position.y=0),i.current&&(i.current.position.y=0);else if(j<5.5)s.current&&s.current.rotation.set(Math.PI,0,0),c.current&&t.current&&c.current.position.copy(t.current.position).add(g.set(4.5,20,0));else if(s.current&&s.current.rotation.set(-Math.PI/4,0,0),c.current&&t.current){const M=j-5.5,S=Math.abs(Math.cos(M*8))*10;c.current.position.copy(t.current.position).add(g.set(4.5,S,4))}}),e.jsxs("group",{position:o,children:[e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),e.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[e.jsx("planeGeometry",{args:[400,40]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),e.jsx(q,{color:"#0088ff",number:"QB",groupRef:r}),e.jsx(q,{color:"#00ffff",number:"80",groupRef:t,armRef:s}),e.jsx(q,{color:"#ff0044",number:"CB",groupRef:n}),e.jsx(q,{color:"#ff0044",number:"S",groupRef:i}),e.jsxs("mesh",{ref:c,children:[e.jsx("sphereGeometry",{args:[2,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},St=()=>e.jsxs("group",{position:[0,300,-300],rotation:[.1,0,0],children:[e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("boxGeometry",{args:[800,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[0,0,10.1],children:[e.jsx("planeGeometry",{args:[790,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-580,0,150],rotation:[0,Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-571,0,155],rotation:[0,Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[580,0,150],rotation:[0,-Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[571,0,155],rotation:[0,-Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsxs("mesh",{position:[390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsx("gridHelper",{args:[800,80,"#00ff00","#004400"],position:[0,0,11],rotation:[Math.PI/2,0,0]}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,80,15],fontSize:70,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ff00",anchorX:"center",anchorY:"middle",children:"FANTASY QUANT"}),e.jsxs(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,15],fontSize:35,color:"#00ffff",outlineWidth:.01,outlineColor:"#0088ff",anchorX:"center",anchorY:"middle",children:["PREDICTING: 42 YD PASS ","->"," TOUCHDOWN"]}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,15],fontSize:22,color:"#ffffff",maxWidth:750,textAlign:"center",lineHeight:1.5,anchorX:"center",anchorY:"middle",children:'"This is going to Rice, WR #80, post route contested catch in traffic over the safety and cornerback... TOUCHDOWN!!"'}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-580,40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"WIN PROB: 94%"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-580,-40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"EXPECTED PTS: +6.0"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[580,40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"DEF COVERAGE: COVER 2"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[580,-40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"MISMATCH DETECTED"})]}),Tt=()=>{const r=[];for(let n=0;n<20;n++){const i=600+n*80,c=n*40-100;r.push(e.jsxs("mesh",{position:[0,c,0],rotation:[Math.PI/2,0,0],children:[e.jsx("torusGeometry",{args:[i,20,16,100,Math.PI*1.5]}),e.jsx("meshStandardMaterial",{color:"#222222",roughness:.9})]},`ring-${n}`))}const t=a.useRef(),s=1e4;return useEffect(()=>{if(!t.current)return;const n=new D,i=new _,c=["#ff0044","#0044ff","#ffffff","#00ff00","#ffaa00"];let f=0;for(let l=0;l<20;l++){const u=600+l*80,d=l*40-100,h=Math.floor(u*Math.PI*1.5/10);for(let g=0;g<h&&!(f>=s);g++){const y=g/h*Math.PI*1.5;n.position.set(Math.cos(y)*u,d+15,Math.sin(y)*u),n.position.x+=(Math.random()-.5)*5,n.position.z+=(Math.random()-.5)*5,n.updateMatrix(),t.current.setMatrixAt(f,n.matrix),i.set(c[Math.floor(Math.random()*c.length)]),t.current.setColorAt(f,i),f++}}t.current.instanceMatrix.needsUpdate=!0,t.current.instanceColor&&(t.current.instanceColor.needsUpdate=!0)},[]),e.jsxs("group",{rotation:[0,Math.PI*1.25,0],children:[r,e.jsxs("instancedMesh",{ref:t,args:[null,null,s],children:[e.jsx("boxGeometry",{args:[8,15,8]}),e.jsx("meshStandardMaterial",{roughness:.8})]})]})},Rt=({position:o,rotation:r,visible:t})=>{const s=N(C,"/fantasy_quant_stadium.jpg");return s.colorSpace=E,s.wrapS=O,s.repeat.set(-1,1),e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[3e3,32,32]}),e.jsx("meshBasicMaterial",{map:s,side:R})]}),e.jsx(Tt,{}),e.jsx(zt,{position:[0,-200,100]}),e.jsx("ambientLight",{intensity:.5,color:"#00ff00"}),e.jsx("pointLight",{color:"#00ff00",intensity:3,distance:2e3,position:[0,500,500]}),e.jsx("pointLight",{color:"#0088ff",intensity:2,distance:2e3,position:[0,500,-500]}),e.jsx(St,{})]})},Pt=()=>e.jsxs("group",{position:[0,-20,-1e3],children:[e.jsxs("mesh",{position:[-15,0,0],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[1.5,1.5,4e3,8]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:1,wireframe:!0})]}),e.jsxs("mesh",{position:[15,0,0],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[1.5,1.5,4e3,8]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:1,wireframe:!0})]}),Array.from({length:200}).map((o,r)=>e.jsxs("mesh",{position:[0,0,-2e3+r*20],children:[e.jsx("boxGeometry",{args:[32,1,2]}),e.jsx("meshStandardMaterial",{color:"#0044ff",emissive:"#0044ff",emissiveIntensity:.5})]},r))]}),kt=()=>{const o=a.useRef(),r=a.useMemo(()=>Array.from({length:150}).map(()=>({x:(Math.random()-.5)*400,y:(Math.random()-.5)*400,z:Math.random()*2e3,speed:10+Math.random()*20})),[]);return x(()=>{o.current&&o.current.children.forEach((t,s)=>{t.position.z+=r[s].speed,t.position.z>500&&(t.position.z-=2e3)})}),e.jsx("group",{ref:o,children:r.map((t,s)=>e.jsxs("mesh",{position:[t.x,t.y,t.z],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[.2,.2,100,4]}),e.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.3})]},s))})},Ct=({worldPosition:o})=>{const r=a.useRef(),t=N(C,"/assets/images/contango_logo.png");return x(s=>{if(r.current){const i=s.camera.position.clone().sub(new z(...o));r.current.position.copy(i),r.current.rotation.copy(s.camera.rotation);const c=Math.sin(s.clock.elapsedTime*15)*.5,f=Math.cos(s.clock.elapsedTime*12)*.2;r.current.position.y+=c,r.current.position.z+=f}}),e.jsxs("group",{ref:r,children:[e.jsxs("group",{position:[0,-15,0],children:[e.jsxs("mesh",{position:[0,-2,-15],rotation:[.2,0,0],children:[e.jsx("boxGeometry",{args:[40,5,2]}),e.jsx("meshStandardMaterial",{color:"#111",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-20,2,-10],rotation:[0,Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[20,2,-10],rotation:[0,-Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[0,-5,10],children:[e.jsx("boxGeometry",{args:[38,20,2]}),e.jsx("meshStandardMaterial",{color:"#0a0a0a",roughness:.8})]})]}),e.jsxs("group",{position:[0,5,-50],children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("planeGeometry",{args:[40,20]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:.9,depthWrite:!1})]}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-30,20,0],fontSize:4,color:"#00ff00",anchorX:"left",children:"BTC/USD  +5.42%"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-30,14,0],fontSize:3,color:"#ffffff",anchorX:"left",children:"VOL: 1.2M"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-30,9,0],fontSize:3,color:"#00ff00",anchorX:"left",children:"SIGNAL: STRONG BUY"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[30,20,0],fontSize:4,color:"#ff0044",anchorX:"right",children:"ETH/USD  -1.12%"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[30,14,0],fontSize:3,color:"#ffffff",anchorX:"right",children:"VOL: 840K"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[30,9,0],fontSize:3,color:"#ff0044",anchorX:"right",children:"SIGNAL: SELL"}),e.jsx(w,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-5,0],fontSize:2,color:"#00ffff",anchorX:"center",opacity:.7,transparent:!0,children:"ALGO > EXECUTING ORDER BATCH > LATENCY 1.2ms"})]})]})},It=({worldPosition:o})=>{const r=a.useRef(),t=a.useMemo(()=>Array.from({length:300}).map(()=>{const s=Math.random()>.5,n=20+Math.random()*80,i=n+Math.random()*40,c=Math.random()*Math.PI*2,f=60+Math.random()*200;return{x:Math.cos(c)*f,y:Math.sin(c)*f,z:(Math.random()-.5)*6e3,isGreen:s,height:n,wickHeight:i,speed:15+Math.random()*25}}),[]);return x(s=>{if(r.current){const i=s.camera.position.clone().sub(new z(...o));r.current.position.copy(i),r.current.children.forEach((c,f)=>{c.position.z+=t[f].speed,c.position.z>1e3&&(c.position.z-=6e3)})}}),e.jsx("group",{ref:r,children:t.map((s,n)=>e.jsxs("group",{position:[s.x,s.y,s.z],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[1,1,s.wickHeight,4]}),e.jsx("meshStandardMaterial",{color:s.isGreen?"#00ff00":"#ff0044",emissive:s.isGreen?"#00ff00":"#ff0044",emissiveIntensity:2})]}),e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[8,s.height,8]}),e.jsx("meshStandardMaterial",{color:s.isGreen?"#00ff00":"#ff0044",transparent:!0,opacity:.9,emissive:s.isGreen?"#00aa00":"#aa0022",emissiveIntensity:.8})]})]},n))})},Lt=({position:o,rotation:r,visible:t})=>e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000205",side:R})]}),e.jsx(Pt,{}),e.jsx(kt,{}),t&&e.jsx(It,{worldPosition:o}),t&&e.jsx(Ct,{worldPosition:o}),e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[0,50,-100],intensity:2,color:"#00ffcc",distance:500})]}),_t=({position:o,rotation:r,visible:t})=>{const s=a.useRef(),n=a.useRef(),i=N(C,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return x(c=>{s.current&&(s.current.position.y=Math.sin(c.clock.elapsedTime*1.5)*5),n.current&&(n.current.rotation.y+=.005,n.current.rotation.z+=.002)}),e.jsxs("group",{visible:t,position:o,rotation:r,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1500,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:R})]}),e.jsxs("group",{children:[e.jsx(Ae,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:e.jsxs("mesh",{ref:s,position:[0,0,-500],children:[e.jsx("planeGeometry",{args:[400,100]})," ",e.jsx("meshBasicMaterial",{map:i,transparent:!0,opacity:1,side:U,depthWrite:!1})]})}),e.jsx(ee,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),e.jsx(ee,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),e.jsx("ambientLight",{intensity:.5,color:"#002244"}),e.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},Gt=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Et=`
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
`,Ft=({startZ:o=10,endZ:r=-500,visible:t=!0})=>{const s=a.useRef(),n=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);x(c=>{s.current&&t&&(s.current.uniforms.uTime.value=c.clock.elapsedTime,s.current.uniforms.uOpacity.value=L.lerp(s.current.uniforms.uOpacity.value,t?1:0,.05))});const i=a.useMemo(()=>{const c=[],l=o-r;for(let u=0;u<=100;u++){const d=o-u/100*l;c.push(new z(Math.sin(u*.1)*2,Math.cos(u*.05)*2,d))}return new Fe(c)},[o,r]);return e.jsxs("mesh",{visible:t,children:[e.jsx("tubeGeometry",{args:[i,200,15,32,!1]}),e.jsx("shaderMaterial",{ref:s,vertexShader:Gt,fragmentShader:Et,uniforms:n,side:R,transparent:!0,blending:F})]})},At=`
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
`,Bt=`
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
`,Ut=({position:o,rotation:r=[0,0,0],length:t=4e3,visible:s=!0})=>{const n=a.useRef(),i=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:t}}),[t]);return x(c=>{n.current&&(n.current.uniforms.uTime.value=c.clock.elapsedTime,n.current.uniforms.uOpacity.value=s?1:0)}),e.jsx("group",{position:o,rotation:r,visible:s,children:e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[60,400,t+200,32,64,!0]}),e.jsx("shaderMaterial",{ref:n,vertexShader:At,fragmentShader:Bt,uniforms:i,transparent:!0,side:R,wireframe:!1})]})})},Q=({position:o,rotation:r,length:t=4e3,radius:s=200,color:n="#ffffff",speed:i=20,visible:c=!0})=>{const f=a.useRef(),l=a.useMemo(()=>({uTime:{value:0},uColor:{value:new _(n)}}),[n]);return x(u=>{f.current&&(f.current.uniforms.uTime.value=u.clock.elapsedTime)}),e.jsxs("mesh",{visible:c,position:o,rotation:r,children:[e.jsx("cylinderGeometry",{args:[s,s,t,32,1,!0]}),e.jsx("shaderMaterial",{ref:f,transparent:!0,side:R,blending:F,depthWrite:!1,uniforms:l,vertexShader:`
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
        `})]})},Wt=()=>{const o=[],r=(t,s,n)=>{o.push({x:t,y:s,z:0,rot:[Math.PI/2,0,0],color:n,bodyHeight:40+Math.random()*40})};for(let t=Math.PI*.25;t<Math.PI*1.75;t+=.2)r(-100+Math.cos(t)*80,Math.sin(t)*80,"#00ff00");for(let t=0;t<Math.PI*2;t+=.2)r(100+Math.cos(t)*80,Math.sin(t)*80,"#ff0044");return r(140,-40,"#ff0044"),r(160,-60,"#ff0044"),r(180,-80,"#ff0044"),o},Ht=({position:o,rotation:r=[0,0,0],length:t=6e3,radius:s=250,visible:n})=>{const i=a.useRef(),c=a.useRef(),f=a.useRef(),l=N(C,"/assets/images/contango_logo.png"),u=a.useMemo(()=>{const y=[],b=Math.floor(t/5);for(let M=0;M<b;M++){const S=-(M/b)*t,p=M*.1,v=Math.cos(p)*s,T=Math.sin(p)*s,P=Math.cos(p+Math.PI)*s,m=Math.sin(p+Math.PI)*s,k=Math.random()>.5?"#00ff00":"#ff0044",W=20+Math.random()*60,I=[0,0,p+Math.PI/2],$=[0,0,p+Math.PI+Math.PI/2];y.push({x:v,y:T,z:S,rot:I,color:k,bodyHeight:W}),y.push({x:P,y:m,z:S,rot:$,color:k,bodyHeight:W})}return Wt().forEach(M=>{y.push({x:M.x,y:M.y,z:-t-500,rot:M.rot,color:M.color,bodyHeight:M.bodyHeight})}),y},[t,s]),d=u.length,h=a.useMemo(()=>new D,[]),g=a.useMemo(()=>new _,[]);return a.useEffect(()=>{if(!(!c.current||!f.current)){for(let y=0;y<d;y++){const b=u[y];h.position.set(b.x,b.y,b.z),h.rotation.set(b.rot[0],b.rot[1],b.rot[2]),h.scale.set(1,b.bodyHeight+40,1),h.updateMatrix(),c.current.setMatrixAt(y,h.matrix),g.set(b.color),c.current.setColorAt(y,g),h.scale.set(1,b.bodyHeight,1),h.updateMatrix(),f.current.setMatrixAt(y,h.matrix),f.current.setColorAt(y,g)}c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0)}},[u,d]),x(y=>{i.current&&n&&(i.current.rotation.z=y.clock.elapsedTime*.5)}),e.jsxs("group",{position:o,rotation:r,visible:n,children:[e.jsxs("group",{ref:i,children:[e.jsxs("instancedMesh",{ref:c,args:[null,null,d],children:[e.jsx("cylinderGeometry",{args:[2,2,1,8]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),e.jsxs("instancedMesh",{ref:f,args:[null,null,d],children:[e.jsx("boxGeometry",{args:[10,1,10]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),e.jsxs("mesh",{position:[0,0,-t-500],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:l,transparent:!0})]}),e.jsxs("mesh",{position:[0,0,-t/2],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[s*.8,s*.8,t,32,1,!0]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:R})]})]})},Ot=({position:o,rotation:r,length:t=8e3,visible:s=!0})=>{const n=a.useRef(),i=a.useRef();x(f=>{if(!s||!n.current)return;const l=f.clock.getElapsedTime();n.current.map.offset.y=-l*3,i.current&&(i.current.rotation.y=l*2)});const c=pe.useMemo(()=>{const f=document.createElement("canvas");f.width=512,f.height=512;const l=f.getContext("2d"),u=l.createLinearGradient(0,0,0,512);u.addColorStop(0,"#001a33"),u.addColorStop(.5,"#00ccff"),u.addColorStop(1,"#001a33"),l.fillStyle=u,l.fillRect(0,0,512,512),l.fillStyle="#ffffff";for(let h=0;h<200;h++)l.globalAlpha=Math.random()*.5,l.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const d=new ge(f);return d.wrapS=O,d.wrapT=O,d.repeat.set(4,20),d},[]);return e.jsxs("group",{position:o,rotation:r,visible:s,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,t,32,1,!0]}),e.jsx("meshStandardMaterial",{ref:n,map:c,color:"#0044ff",emissive:"#0044ff",emissiveIntensity:3,side:R,transparent:!0,opacity:.9})]}),e.jsxs("mesh",{ref:i,children:[e.jsx("cylinderGeometry",{args:[140,140,t,16,40,!0]}),e.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.4,side:R})]})]})},B=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10550,rx:0,ry:0},{p:.51,x:0,y:-3980,z:-10550,rx:0,ry:0},{p:.53,x:0,y:-3980,z:-11550,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-12550,rx:0,ry:0},{p:.57,x:0,y:-3980,z:-13550,rx:0,ry:0},{p:.6,x:0,y:-3980,z:-13550,rx:0,ry:0},{p:.62,x:0,y:-3980,z:-14550,rx:0,ry:0},{p:.64,x:0,y:-3980,z:-15550,rx:0,ry:0},{p:.66,x:0,y:-4e3,z:-16550,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16550,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],Dt=o=>{if(o<=B[0].p)return B[0];if(o>=B[B.length-1].p)return B[B.length-1];for(let r=0;r<B.length-1;r++){const t=B[r],s=B[r+1];if(o>=t.p&&o<=s.p){const n=(o-t.p)/(s.p-t.p);return{x:L.lerp(t.x,s.x,n),y:L.lerp(t.y,s.y,n),z:L.lerp(t.z,s.z,n),rx:L.lerp(t.rx,s.rx,n),ry:L.lerp(t.ry,s.ry,n)}}}return B[0]},me=new oe,he=new xe,Nt=()=>{const o=A(),r=a.useRef();return x(t=>{let s=o.offset;window.icebreakerCaveLocked?s=.22:window.icebreakerThawLocked?s=.27:window.icebreakerTextLocked?s=.29:window.mindwaveLocked?s=.08:window.interstellarLocked?s=.42:window.autopilotLocked?s=.585:window.contangoLocked&&(s=.93);const n=Dt(s);t.camera.position.x=L.lerp(t.camera.position.x,n.x,.2),t.camera.position.y=L.lerp(t.camera.position.y,n.y,.2),t.camera.position.z=L.lerp(t.camera.position.z,n.z,.2),he.set(n.rx,n.ry,0),me.setFromEuler(he),t.camera.quaternion.slerp(me,.15);const i=o.delta*10;t.camera.rotateZ(L.lerp(0,i*2,.2)),r.current&&r.current.position.copy(t.camera.position)}),e.jsxs("group",{children:[e.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),e.jsx("pointLight",{ref:r,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),e.jsx("ambientLight",{intensity:.2})]})},Vt=()=>{const o=A(),[r,t]=a.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),s=a.useRef(r);return x(()=>{const n=o.offset,i={intro:n<.08,mindwave:n>.04&&n<.18,wormhole_ice:n>.1&&n<.25,icebreaker:n>.18&&n<.35,wormhole_sound:n>.28&&n<.42,interstellar:n>.28&&n<.48,w_legal:n>.43&&n<.54,legal:n>.46&&n<.55,w_autopilot:n>.52&&n<.59,autopilot:n>.55&&n<.63,w_clove:n>.61&&n<.67,clove:n>.64&&n<.76,w_fantasy:n>.71&&n<.83,fantasy:n>.73&&n<.88,w_contango:n>.84&&n<.91,contango:n>.89&&n<.96,sentaient:n>.94};let c=!1;for(const f in i)s.current[f]!==i[f]&&(c=!0);c&&(s.current=i,t(i))}),e.jsxs("group",{children:[e.jsx(Ft,{startZ:10,endZ:-250,visible:r.intro}),e.jsx(dt,{position:[0,0,-1350],visible:r.mindwave}),e.jsx(Ut,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:r.wormhole_ice}),e.jsx(at,{position:[0,-4e3,-2550],visible:r.icebreaker}),e.jsx(Q,{position:[0,-4e3,-5050],rotation:[Math.PI/2,0,0],length:3500,color:"#ff00ff",speed:20,visible:r.wormhole_sound}),e.jsx(jt,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:r.interstellar}),e.jsx(Q,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:r.w_legal}),e.jsx(xt,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:r.legal}),e.jsx(Q,{position:[0,-4e3,-12050],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffff",speed:40,visible:r.w_autopilot}),e.jsx(it,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:r.autopilot}),e.jsx(Q,{position:[0,-4e3,-15050],rotation:[Math.PI/2,0,0],length:2e3,color:"#ff00ff",speed:40,visible:r.w_clove}),e.jsx(bt,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:r.clove}),e.jsx(Ot,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:r.w_fantasy}),e.jsx(Rt,{position:[0,-11700,-17500],rotation:[0,0,0],visible:r.fantasy}),e.jsx(Ht,{position:[0,-11750,-20550],length:4e3,visible:r.w_contango}),e.jsx(Lt,{position:[0,-11750,-24800],rotation:[0,0,0],visible:r.contango}),e.jsx(_t,{position:[0,-11750,-29350],rotation:[0,0,0],visible:r.sentaient})]})},Xt=()=>{const o=A(),r=a.useRef(),t=a.useRef();return a.useRef(),a.useRef(),a.useRef(),x(()=>{const s=o.offset;if(r.current){const n=s<.03?1:0;r.current.style.opacity=n}if(t.current){const n=s>.2&&s<.28?1:0;t.current.style.opacity=n}}),e.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[e.jsxs("div",{ref:r,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[e.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),e.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),e.jsxs("div",{ref:t,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[e.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[e.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:e.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),e.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),e.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),e.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},Yt=()=>e.jsxs(ze,{gl:{antialias:!1,alpha:!0},children:[e.jsxs(Be,{pages:10,damping:.2,distance:1.2,children:[e.jsxs(pe.Suspense,{fallback:null,children:[e.jsx(Nt,{}),e.jsx(Vt,{})]}),e.jsx(ee,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),e.jsx(Ue,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:e.jsx(Xt,{})})]}),e.jsxs(Se,{disableNormalPass:!0,children:[e.jsx(Te,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),e.jsx(Re,{opacity:.05}),e.jsx(Pe,{eskil:!1,offset:.1,darkness:1.1})]})]}),ao=()=>e.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[e.jsxs(Me,{children:[e.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),e.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),e.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),e.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:e.jsx(we,{})}),e.jsx("div",{className:"absolute inset-0 z-0",children:e.jsx(Yt,{})})]});export{ao as default};
//# sourceMappingURL=index-BzHF2yqu.js.map
