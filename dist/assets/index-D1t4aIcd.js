import{k as a,_ as K,j as e,a as he,H as be}from"./vendor-JmSMlGGQ.js";import{H as ze}from"./Header-DXbBVJ_I.js";import{u as x,e as Se,a as H,C as Te}from"./constants-B1l2Kg3L.js";import{E as Pe,B as Re,N as ke,V as Ce}from"./Vignette-C40qjNqA.js";import{a3 as te,O as D,aq as w,o as oe,G as Ie,k as C,P as Le,M as _e,aj as I,a9 as E,a as G,K as _,n as W,B as T,a8 as N,Y as V,E as xe,h as ge,l as Ge,af as Ee,ad as Ae,q as Fe,i as Ue}from"./three-DSa_y4UV.js";import{u as A,F as ve,a as Be,S as We}from"./Float-DEpotcRd.js";import{T as M}from"./Text-Duu9tExd.js";import{S as J}from"./Sparkles-CEJFyKLM.js";import"./main-w5OI_WuV.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";const ye=a.forwardRef(function({children:s,follow:t=!0,lockX:o=!1,lockY:n=!1,lockZ:i=!1,...l},f){const c=a.useRef(null),u=a.useRef(null),d=new te;return x(({camera:h})=>{if(!t||!u.current)return;const p=u.current.rotation.clone();u.current.updateMatrix(),u.current.updateWorldMatrix(!1,!1),u.current.getWorldQuaternion(d),h.getWorldQuaternion(c.current.quaternion).premultiply(d.invert()),o&&(u.current.rotation.x=p.x),n&&(u.current.rotation.y=p.y),i&&(u.current.rotation.z=p.z)}),a.useImperativeHandle(f,()=>u.current,[]),a.createElement("group",K({ref:u},l),a.createElement("group",{ref:c},s))}),re=(r,s)=>{"updateRanges"in r?r.updateRanges[0]=s:r.updateRange=s};function He(r){return typeof r=="function"}const se=new D,ne=new D,Y=[],O=new Le;class Oe extends Ie{constructor(){super(),this.color=new C("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var s;return(s=this.instance.current)==null?void 0:s.geometry}raycast(s,t){const o=this.instance.current;if(!o||!o.geometry||!o.material)return;O.geometry=o.geometry;const n=o.matrixWorld,i=o.userData.instances.indexOf(this.instanceKey);if(!(i===-1||i>o.count)){o.getMatrixAt(i,se),ne.multiplyMatrices(n,se),O.matrixWorld=ne,o.material instanceof _e?O.material.side=o.material.side:O.material.side=o.material[0].side,O.raycast(s,Y);for(let l=0,f=Y.length;l<f;l++){const c=Y[l];c.instanceId=i,c.object=this,t.push(c)}Y.length=0}}}const je=a.createContext(null),ae=new D,ie=new D,Ne=new D,le=new w,ce=new te,fe=new w,Ve=r=>r.isInstancedBufferAttribute,Me=a.forwardRef(({context:r,children:s,...t},o)=>{a.useMemo(()=>Se({PositionMesh:Oe}),[]);const n=a.useRef();a.useImperativeHandle(o,()=>n.current,[]);const{subscribe:i,getParent:l}=a.useContext(r||je);return a.useLayoutEffect(()=>i(n),[]),a.createElement("positionMesh",K({instance:l(),instanceKey:n,ref:n},t),s)}),De=a.forwardRef(({context:r,children:s,range:t,limit:o=1e3,frames:n=1/0,...i},l)=>{const[{localContext:f,instance:c}]=a.useState(()=>{const v=a.createContext(null);return{localContext:v,instance:a.forwardRef((y,S)=>a.createElement(Me,K({context:v},y,{ref:S})))}}),u=a.useRef(null);a.useImperativeHandle(l,()=>u.current,[]);const[d,h]=a.useState([]),[[p,j]]=a.useState(()=>{const v=new Float32Array(o*16);for(let y=0;y<o;y++)Ne.identity().toArray(v,y*16);return[v,new Float32Array([...new Array(o*3)].map(()=>1))]});a.useEffect(()=>{u.current.instanceMatrix.needsUpdate=!0});let F=0,g=0;const z=a.useRef([]);a.useLayoutEffect(()=>{z.current=Object.entries(u.current.geometry.attributes).filter(([v,y])=>Ve(y))}),x(()=>{if(n===1/0||F<n){u.current.updateMatrix(),u.current.updateMatrixWorld(),ae.copy(u.current.matrixWorld).invert(),g=Math.min(o,t!==void 0?t:o,d.length),u.current.count=g,re(u.current.instanceMatrix,{offset:0,count:g*16}),re(u.current.instanceColor,{offset:0,count:g*3});for(let v=0;v<d.length;v++){const y=d[v].current;y.matrixWorld.decompose(le,ce,fe),ie.compose(le,ce,fe).premultiply(ae),ie.toArray(p,v*16),u.current.instanceMatrix.needsUpdate=!0,y.color.toArray(j,v*3),u.current.instanceColor.needsUpdate=!0}F++}});const b=a.useMemo(()=>({getParent:()=>u,subscribe:v=>(h(y=>[...y,v]),()=>h(y=>y.filter(S=>S.current!==v.current)))}),[]);return a.createElement("instancedMesh",K({userData:{instances:d,limit:o,frames:n},matrixAutoUpdate:!1,ref:u,args:[null,null,0],raycast:()=>null},i),a.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:p.length/16,array:p,itemSize:16,usage:oe}),a.createElement("instancedBufferAttribute",{attach:"instanceColor",count:j.length/3,array:j,itemSize:3,usage:oe}),He(s)?a.createElement(f.Provider,{value:b},s(c)):r?a.createElement(r.Provider,{value:b},s):a.createElement(je.Provider,{value:b},s))}),Ye=({position:r})=>{const s=a.useRef();A();const[t,o]=a.useState(null);return a.useEffect(()=>{new I().load("/assets/images/digital_fire.jpg",n=>{n.colorSpace=E,o(n)})},[]),x(n=>{if(s.current){const i=window.icebreakerThaw||0;s.current.material.opacity=i*.9;const l=1+Math.sin(n.clock.elapsedTime*5)*.1;s.current.scale.setScalar(l)}}),t?e.jsx("group",{position:r,children:e.jsx(ye,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{ref:s,position:[0,20,0],children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:G})]})})}):null},Xe=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ze=`
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
`,qe=({position:r,angle:s,delay:t})=>{const o=a.useRef(),n=a.useRef();A();const i=a.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new C("#44aaff")},uPartyColor:{value:new C("#ff8844")}}),[]);return x(l=>{if(!o.current||!n.current)return;i.uTime.value=l.clock.elapsedTime;const f=window.icebreakerThaw||0,c=_.clamp((f-t)*2,0,1);i.uState.value=c;const u=Math.sin(l.clock.elapsedTime*8+t*10)*c;if(o.current.position.y=r[1]+(u>0?u*2:0)+15,c>0){const d=0-r[0],h=0-(r[2]- -200),p=Math.sqrt(d*d+h*h)||1;o.current.position.x=r[0]+d/p*(c*20),o.current.position.z=r[2]+h/p*(c*20)}else o.current.position.x=r[0],o.current.position.z=r[2]}),e.jsx("group",{ref:o,position:[r[0],r[1]+15,r[2]],children:e.jsx(ye,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{children:[e.jsx("planeGeometry",{args:[20,30]}),e.jsx("shaderMaterial",{ref:n,vertexShader:Xe,fragmentShader:Ze,uniforms:i,transparent:!0,side:W,depthWrite:!1})]})})})},Qe=({position:r})=>{const t=a.useMemo(()=>{const o=[];for(let n=0;n<60;n++){const i=Math.random()*Math.PI*2,l=30+Math.random()*80;o.push({position:[r[0]+Math.cos(i)*l,r[1],r[2]+Math.sin(i)*l],angle:i,delay:Math.random()*.5})}return o},[60,r]);return e.jsx("group",{children:t.map((o,n)=>e.jsx(qe,{...o},n))})},$=({appId:r,position:s})=>e.jsx("group",{position:s}),Ke=({position:r})=>{const s=a.useRef(),[t,o]=a.useState(null);return A(),a.useEffect(()=>{new I().load("/icebreaker_logo.png",n=>{n.colorSpace=E,o(n)})},[]),x(n=>{if(s.current&&(s.current.rotation.y=n.clock.elapsedTime*.5,s.current.position.y=r[1]+Math.sin(n.clock.elapsedTime*2)*5,s.current.material)){const i=window.icebreakerThaw||0;s.current.material.opacity=i*.9,s.current.scale.setScalar(.01+i)}}),t?e.jsxs("mesh",{ref:s,position:r,children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:G,side:W})]}):null},$e=({numTrees:r=30,radius:s=50,centerZ:t=-500})=>{const o=a.useRef(),n=a.useRef();A();const i=a.useMemo(()=>new V,[]),l=a.useMemo(()=>{const f=[];for(let c=0;c<r;c++){const u=c/r*Math.PI*2+Math.random()*.5,d=s+Math.random()*20;f.push({position:new w(Math.cos(u)*d,-18,Math.sin(u)*d+t),rotation:new xe(0,u+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return f},[r,s,t]);return x(()=>{if(!o.current||!n.current)return;const f=window.icebreakerThaw||0;for(let c=0;c<r;c++){const u=l[c],d=Math.max(0,(f-u.delay)*2),h=_.clamp(d,0,1)*u.scale;i.position.copy(u.position),i.rotation.copy(u.rotation),i.scale.setScalar(h),i.updateMatrix(),o.current.setMatrixAt(c,i.matrix),i.position.y+=18*h,i.updateMatrix(),n.current.setMatrixAt(c,i.matrix)}o.current.instanceMatrix.needsUpdate=!0,n.current.instanceMatrix.needsUpdate=!0}),e.jsxs("group",{children:[e.jsxs("instancedMesh",{ref:o,args:[null,null,r],children:[e.jsx("cylinderGeometry",{args:[.5,1,20,8]}),e.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),e.jsxs("instancedMesh",{ref:n,args:[null,null,r],children:[e.jsx("sphereGeometry",{args:[8,4,4]}),e.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},ue=`
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
`,de=`
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
`,Je=({startZ:r,endZ:s})=>{const t=a.useRef(),o=a.useRef(),[n,i]=a.useState(null),l=Math.abs(s-r),f=(r+s)/2,c=a.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return a.useEffect(()=>{new I().load("/assets/images/ice_cavern.jpg",u=>{u.wrapS=N,u.wrapT=N,u.repeat.set(4,2),u.colorSpace=E,i(u),c.tMap.value=u})},[c]),x(u=>{if(o.current){const d=window.icebreakerThaw||0;c.uThaw.value=d,c.uTime.value=u.clock.elapsedTime}}),n?e.jsxs("group",{children:[e.jsxs("mesh",{ref:t,position:[0,0,f],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[120,120,l,128,128,!0]}),e.jsx("shaderMaterial",{ref:o,vertexShader:ue,fragmentShader:de,uniforms:c,transparent:!0,side:T})]}),e.jsxs("mesh",{position:[0,0,1300],children:[e.jsx("sphereGeometry",{args:[120,64,64]}),e.jsx("shaderMaterial",{vertexShader:ue,fragmentShader:de,uniforms:c,transparent:!0,side:T})]})]}):null},et=({position:r})=>{const s=a.useRef();return x(t=>{if(s.current){const o=window.icebreakerThaw||0,n=_.lerp(.01,50,Math.pow(o,2));s.current.scale.setScalar(n),s.current.visible=o>0}}),e.jsxs("mesh",{ref:s,position:[r[0],r[1]+1,r[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[20,64]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},tt=({position:r})=>{const s=a.useRef();return x(t=>{if(s.current){const o=window.icebreakerThaw||0;s.current.scale.setScalar(o>0?1:.001)}}),e.jsxs("mesh",{ref:s,position:[r[0],r[1]+1.5,r[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[96,64]}),e.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},ot=({position:r})=>{const s=a.useRef();return x(()=>{if(s.current){const t=window.icebreakerThaw||0;s.current.opacity=1-Math.pow(t,2),s.current.transparent=!0}}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:r,children:[e.jsx("planeGeometry",{args:[1e3,3e3]}),e.jsx("meshStandardMaterial",{ref:s,color:"#001133",roughness:.1,metalness:.8})]})},rt=({centerZ:r})=>{const s=a.useRef(),t=a.useRef(),o=a.useMemo(()=>({uColorBottom:{value:new C("#ffaa55")},uColorTop:{value:new C("#00f3ff")},uOpacity:{value:0}}),[]);return x(()=>{const n=window.icebreakerThaw||0;s.current&&(s.current.uniforms.uOpacity.value=n),t.current&&(t.current.intensity=n*.6)}),e.jsxs("group",{children:[e.jsxs("mesh",{scale:2e3,children:[e.jsx("sphereGeometry",{args:[1,32,32]}),e.jsx("shaderMaterial",{ref:s,side:T,transparent:!0,depthWrite:!1,uniforms:o,vertexShader:`
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
          `})]}),e.jsx("directionalLight",{ref:t,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),e.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},st=()=>{const r=A(),[s,t]=a.useState(!1),[o,n]=a.useState(!1),[i,l]=a.useState(!1),f=a.useRef({triggered:!1,timer:0}),c=a.useRef({triggered:!1,timer:0});return a.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),x((u,d)=>{const h=r.offset;!c.current.triggered&&h>=.22&&(c.current.triggered=!0,l(!0),window.icebreakerCaveLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.22*(r.el.scrollHeight-r.el.clientHeight))),window.icebreakerCaveLocked&&(r.el&&(r.el.scrollTop=.22*(r.el.scrollHeight-r.el.clientHeight)),c.current.timer+=d,c.current.timer>1.5&&(window.icebreakerCaveLocked=!1,l(!1),r.el&&(r.el.style.overflow="auto"))),!s&&h>=.265&&window.icebreakerThaw<1&&(t(!0),window.icebreakerThawLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.27*(r.el.scrollHeight-r.el.clientHeight))),window.icebreakerThawLocked?(r.el&&(r.el.scrollTop=.27*(r.el.scrollHeight-r.el.clientHeight)),window.icebreakerThaw+=d*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,r.el&&!o&&(r.el.style.overflow="auto"),t(!1))):h<.2&&(window.icebreakerThaw=0),!f.current.triggered&&h>=.285&&window.icebreakerThaw>=1&&(f.current.triggered=!0,n(!0),window.icebreakerTextLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.29*(r.el.scrollHeight-r.el.clientHeight))),window.icebreakerTextLocked&&(r.el&&(r.el.scrollTop=.29*(r.el.scrollHeight-r.el.clientHeight)),f.current.timer+=d,f.current.timer>1.5&&(window.icebreakerTextLocked=!1,n(!1),r.el&&(r.el.style.overflow="auto")))}),null},nt=({position:r,rotation:s,visible:t=!0})=>e.jsxs("group",{position:r,rotation:s,visible:t,children:[e.jsx(st,{}),e.jsx(rt,{centerZ:275}),e.jsx(Je,{startZ:1550,endZ:-1e3}),e.jsx(ot,{position:[0,-20,0]}),e.jsx(et,{position:[0,-20,275]}),e.jsx(tt,{position:[0,-20,275]}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-225],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-225],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),e.jsx(Ye,{position:[0,-20,275]}),e.jsx(Ke,{position:[0,30,275]}),e.jsx($e,{radius:60,centerZ:275}),e.jsx(Qe,{position:[0,-20,275]}),e.jsx($,{appId:"icebreaker",position:[-80,20,75]})]}),X=({position:r,speed:s=2,direction:t=1,color:o="#00ffcc"})=>{const n=a.useRef();return x((i,l)=>{n.current&&n.current.children.forEach((f,c)=>{c!==0&&(f.position.z+=s*t*l*100,f.position.z>1e3&&(f.position.z=-1e3),f.position.z<-1e3&&(f.position.z=1e3))})}),e.jsxs("group",{position:r,ref:n,children:[e.jsxs("mesh",{position:[0,-5,0],children:[e.jsx("boxGeometry",{args:[60,4,2e3]}),e.jsx("meshStandardMaterial",{color:"#111",metalness:.9,roughness:.1}),e.jsx("meshBasicMaterial",{color:"#333",wireframe:!0})]}),Array.from({length:20}).map((i,l)=>e.jsxs("mesh",{position:[0,10,-1e3+l*100],children:[e.jsx("boxGeometry",{args:[30,20,40]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:2,transparent:!0,opacity:.8,wireframe:!0})]},l))]})},Z=({position:r,color:s="#ff00ff"})=>{const t=a.useRef();return x(o=>{t.current&&(t.current.rotation.x=o.clock.elapsedTime*.5,t.current.rotation.y=o.clock.elapsedTime*.3)}),e.jsxs("group",{position:r,children:[e.jsxs("mesh",{position:[0,-100,0],children:[e.jsx("boxGeometry",{args:[100,200,100]}),e.jsx("meshStandardMaterial",{color:"#000",metalness:1,roughness:0}),e.jsx("meshBasicMaterial",{color:s,wireframe:!0})]}),e.jsxs("mesh",{position:[0,100,0],ref:t,children:[e.jsx("icosahedronGeometry",{args:[50,1]}),e.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:1,wireframe:!0})]})]})},at=({position:r,rotation:s,visible:t})=>{const[o,n]=a.useState(null),i=A(),[l,f]=a.useState(!1);return x(()=>{t&&(i.offset>.575&&i.offset<.595&&!l&&!window.autopilotLocked&&(window.autopilotLocked=!0,f(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(i.offset<.55||i.offset>.62)&&l&&(f(!1),window.autopilotLocked=!1))}),a.useEffect(()=>{new I().load("/autopilot_logo.png",u=>{u.colorSpace=E,n(u)})},[]),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:T})]}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[4e3,4e3]}),e.jsx("meshBasicMaterial",{color:"#001122",transparent:!0,opacity:.8})]}),e.jsx("gridHelper",{args:[4e3,100,"#00ffcc","#003344"],position:[0,-199,0]}),e.jsx(X,{position:[-400,-150,0],speed:4,direction:1,color:"#00ffcc"}),e.jsx(X,{position:[400,-150,0],speed:5,direction:-1,color:"#ff00ff"}),e.jsx(X,{position:[-800,-150,0],speed:3,direction:-1,color:"#0088ff"}),e.jsx(X,{position:[800,-150,0],speed:6,direction:1,color:"#ffaa00"}),e.jsx(Z,{position:[-200,-50,-1e3],color:"#00ffcc"}),e.jsx(Z,{position:[200,-50,-800],color:"#ff00ff"}),e.jsx(Z,{position:[-600,-50,-600],color:"#0088ff"}),e.jsx(Z,{position:[600,-50,-400],color:"#ffaa00"}),e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{color:"#00ffcc",intensity:3,distance:2e3,position:[-500,500,-500]}),e.jsx("pointLight",{color:"#ff00ff",intensity:3,distance:2e3,position:[500,500,500]}),e.jsxs("group",{position:[0,0,-300],children:[o&&e.jsxs("mesh",{position:[0,100,0],children:[e.jsx("planeGeometry",{args:[250,250]}),e.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1,blending:G})]}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-40,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ffcc",anchorX:"center",anchorY:"middle",children:"AUTOPILOT"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-100,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#003344",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"Fully autonomous marketing pipelines. Generates content, schedules campaigns, and optimizes spend."})]})]})},it=`
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
`,ct=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,ft=({position:r,visible:s})=>e.jsxs("group",{visible:s,position:r,children:[e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),ut=({position:r,visible:s})=>{const t=A(),o=a.useRef(),n=a.useRef(),i=a.useRef(),[l,f]=a.useState(null),[c,u]=a.useState(null),[d,h]=a.useState(!1),p=a.useRef({triggered:!1,timer:0});a.useEffect(()=>{window.mindwaveLocked=!1,new I().load("/mindwave-logo.png",g=>{g.colorSpace=E,f(g)}),new I().load("/tribal-sun.png",g=>{g.colorSpace=E,u(g)})},[]);const j=r?r[2]:0,F=a.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return x((g,z)=>{if(!s)return;const b=t.offset;!p.current.triggered&&b>=.075&&(p.current.triggered=!0,h(!0),window.mindwaveLocked=!0,t.el&&(t.el.style.overflow="hidden",t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight))),window.mindwaveLocked&&(t.el&&(t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight)),p.current.timer+=z,p.current.timer>1.5&&(window.mindwaveLocked=!1,h(!1),t.el&&(t.el.style.overflow="auto")));const v=g.clock.elapsedTime;if(o.current){o.current.uniforms.uTime.value=v;const y=Math.abs(g.camera.position.z-j);let P=1-Math.min(y/1e3,1);P=Math.pow(P,2),o.current.uniforms.uScrollProgress.value=P}if(n.current){n.current.position.y=-7+Math.sin(v*2)*2;const y=1+Math.sin(v*4)*.05;n.current.scale.set(y,y,1),n.current.rotation.y=0}if(i.current){i.current.position.y=125+Math.sin(v*2)*2,i.current.rotation.z=v*.1;const y=1+Math.sin(v*3)*.05;i.current.scale.set(y,y,1)}}),e.jsxs("group",{visible:s,position:r,children:[e.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[e.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),e.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:ct,side:T,depthWrite:!1})]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[e.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),e.jsx("shaderMaterial",{ref:o,vertexShader:it,fragmentShader:lt,uniforms:F,transparent:!0,side:W,wireframe:!1})]}),c&&e.jsxs("mesh",{ref:i,position:[0,-10,-85],children:[e.jsx("planeGeometry",{args:[140,140]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0,side:W,depthWrite:!1,blending:G,color:"#00ffff",opacity:.6})]}),l&&e.jsxs("mesh",{ref:n,position:[0,-10,-80],children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:l,transparent:!0,side:W,depthWrite:!1,blending:G})]}),e.jsx(ft,{position:[0,-5,-80],visible:!0}),e.jsx($,{appId:"mindwave",position:[40,0,-40]})]})},dt=()=>{const s=a.useRef([]),t=a.useRef(document.createElement("canvas")),o=a.useMemo(()=>{t.current.width=512,t.current.height=1024;const i=t.current.getContext("2d");i.fillStyle="#010a15",i.fillRect(0,0,512,1024),i.strokeStyle="#004488",i.lineWidth=2;for(let f=0;f<1024;f+=32)i.beginPath(),i.moveTo(0,f),i.lineTo(512,f),i.stroke(),f<512&&(i.beginPath(),i.moveTo(f,0),i.lineTo(f,1024),i.stroke());i.fillStyle="#0088ff",i.fillRect(40,40,432,60),i.fillStyle="#00ffff",i.font="24px monospace",i.fillText("CLASSIFIED // AI REVIEW",60,78),i.fillStyle="#003366";for(let f=0;f<30;f++){let c=140+f*28;i.fillRect(40,c,432-Math.random()*200,12)}i.strokeStyle="#ff0033",i.lineWidth=5,i.beginPath(),i.arc(400,850,60,0,Math.PI*2),i.stroke(),i.beginPath(),i.arc(400,850,50,0,Math.PI*2),i.stroke();const l=new ge(t.current);return l.colorSpace=E,l},[]),n=a.useMemo(()=>Array.from({length:50}).map((i,l)=>({delay:l*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-400+Math.random()*200})),[50]);return x((i,l)=>{const f=i.clock.elapsedTime;n.forEach((c,u)=>{const d=s.current[u];d&&(f>c.delay&&(c.state==="waiting"&&(c.state="approaching"),c.state==="approaching"&&(c.x-=8e3*l,c.x<=0&&(c.x=0,c.state="scanning",c.scanTimer=f)),c.state==="scanning"&&f-c.scanTimer>.05&&(c.state="approved"),c.state==="approved"&&(c.x-=8e3*l,c.x<-3e3&&(c.x=3e3+Math.random()*500,c.state="approaching",c.y=(Math.random()-.5)*150-50))),d.position.set(c.x,c.y,c.z),c.state==="scanning"?(d.rotation.set(0,0,0),d.scale.setScalar(1.2)):c.state==="approved"?(d.rotation.set(0,.4,0),d.scale.setScalar(1)):(d.rotation.set(0,-.4,0),d.scale.setScalar(1)),c.state==="scanning"?d.color.set("#ffffff"):c.state==="approved"?d.color.set("#00ff66"):d.color.set("#0088ff"))})}),e.jsxs(De,{limit:50,range:50,children:[e.jsx("planeGeometry",{args:[100,200]}),e.jsx("meshBasicMaterial",{map:o,side:W,transparent:!0,opacity:.9,blending:G,depthWrite:!1}),n.map((i,l)=>e.jsx(Me,{ref:f=>s.current[l]=f,position:[i.x,i.y,i.z]},l))]})},mt=()=>{const r=H(I,"/legal_eagle_courtroom_bg.jpg");return r.colorSpace=E,e.jsxs("group",{children:[e.jsxs("mesh",{position:[0,0,-2500],children:[e.jsx("planeGeometry",{args:[8e3,4500]}),e.jsx("meshBasicMaterial",{map:r,depthWrite:!1,transparent:!0,opacity:.3})]}),[-1,1].map((s,t)=>e.jsxs("mesh",{position:[s*800,0,-1e3],children:[e.jsx("boxGeometry",{args:[400,4e3,400]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.2})]},t)),[-1,1].map((s,t)=>e.jsxs("mesh",{position:[s*1400,0,-1500],children:[e.jsx("boxGeometry",{args:[600,4e3,600]}),e.jsx("meshStandardMaterial",{color:"#030303",metalness:.9,roughness:.3})]},t+2))]})},pt=({logoTex:r})=>{const s=a.useMemo(()=>({uTime:{value:0}}),[]),t=a.useMemo(()=>({uTime:{value:0},uColor:{value:new C("#00ffff")}}),[]);return x(o=>{s.uTime.value=o.clock.elapsedTime,t.uTime.value=o.clock.elapsedTime}),e.jsxs("group",{position:[0,-100,-800],children:[e.jsxs("mesh",{position:[0,-200,0],children:[e.jsx("boxGeometry",{args:[1200,600,400]}),e.jsx("meshStandardMaterial",{color:"#020202",metalness:1,roughness:.1})]}),e.jsxs("mesh",{position:[0,150,0],children:[e.jsx("boxGeometry",{args:[800,100,300]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.8,roughness:.2})]}),e.jsxs(ve,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[e.jsxs("mesh",{position:[0,400,0],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,depthWrite:!1,blending:G})]}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,150,0],fontSize:100,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"})]})]})},ht=({position:r,rotation:s,visible:t})=>{const o=H(I,"/legal_eagle_logo.png");return o.colorSpace=E,e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[0,1e3,1e3],intensity:1.5,color:"#00ffff"}),e.jsx("pointLight",{position:[0,500,-400],intensity:2,color:"#0044ff",distance:2e3}),e.jsx(mt,{}),e.jsx(pt,{logoTex:o}),e.jsx(dt,{}),e.jsx($,{appId:"legaleagle",position:[200,100,-200]})]})},ee=r=>{const t=new Ae;r==="interceptor"?(t.moveTo(1*1.8,0),t.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),t.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),t.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),t.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):r==="viper"?(t.moveTo(1*1.2,1*.3),t.lineTo(1*.4,1*.4),t.lineTo(-1*.8,1*1.2),t.lineTo(-1*1.2,1*.8),t.lineTo(-1*.8,0),t.lineTo(-1*1.2,-1*.8),t.lineTo(-1*.8,-1*1.2),t.lineTo(1*.4,-1*.4),t.lineTo(1*1.2,-1*.3),t.lineTo(1*.6,0)):r==="bulwark"&&(t.moveTo(1*1.5,0),t.lineTo(1*.8,1*1.2),t.lineTo(-1*.5,1*1.5),t.lineTo(-1*1.5,1*.8),t.lineTo(-1*1.5,-1*.8),t.lineTo(-1*.5,-1*1.5),t.lineTo(1*.8,-1*1.2));const o={steps:1,depth:r==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},n=new Fe(t,o);return n.center(),n.rotateY(-Math.PI/2),n.rotateZ(-Math.PI/2),n},xt=({position:r})=>{const s=a.useRef();return x((t,o)=>{s.current&&(s.current.rotation.z-=o*.1,s.current.rotation.x=Math.sin(t.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:r,ref:s,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,300,32]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[400,40,32,64]}),e.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((t,o)=>e.jsxs("mesh",{position:[Math.cos(t)*200,0,Math.sin(t)*200],rotation:[0,-t,Math.PI/2],children:[e.jsx("cylinderGeometry",{args:[20,20,300,16]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},o)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((t,o)=>e.jsxs("mesh",{position:[Math.cos(t)*400,0,Math.sin(t)*400],rotation:[Math.PI/2,0,-t],children:[e.jsx("boxGeometry",{args:[60,60,90]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${o}`))]})},gt=({position:r})=>{const s=a.useRef(),t=a.useMemo(()=>ee("bulwark"),[]);return x((o,n)=>{s.current&&(s.current.position.y=Math.sin(o.clock.elapsedTime*.2)*40,s.current.rotation.y+=n*.05,s.current.rotation.z=Math.sin(o.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:r,ref:s,scale:[120,120,120],children:[e.jsx("mesh",{geometry:t,children:e.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),e.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),e.jsxs("mesh",{position:[0,0,1.5],children:[e.jsx("sphereGeometry",{args:[.2,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},vt=({position:r})=>{const i=a.useMemo(()=>new V,[]),l=a.useMemo(()=>new V,[]),f=a.useRef(),c=a.useRef(),u=a.useRef(),d=a.useRef(),h=a.useMemo(()=>ee("interceptor"),[]),p=a.useMemo(()=>ee("viper"),[]),j=a.useMemo(()=>{const y=new Ge(.5,.5,20,4);return y.rotateX(Math.PI/2),y},[]),F=a.useMemo(()=>Array.from({length:80},(y,S)=>{const P=S>=40;return{pos:new w((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new w,target:new w,team:P?1:0,meshIndex:P?S-40:S,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),g=a.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new w,vel:new w,color:new C,life:0})),[60]),z=a.useMemo(()=>new w,[]),b=a.useMemo(()=>new w,[]),v=a.useMemo(()=>new C,[]);return x((y,S)=>{if(!f.current||!c.current||!u.current||!d.current)return;let P=0;F.forEach(m=>{if(m.state===0){if(Math.random()<.02||m.target.lengthSq()===0){const L=F[Math.floor(Math.random()*80)];L&&L.team!==m.team&&L.state===0?(m.target.copy(L.pos),m.target.x+=(Math.random()-.5)*200,m.target.y+=(Math.random()-.5)*200,m.target.z+=(Math.random()-.5)*200):m.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}z.subVectors(m.target,m.pos);const R=z.length();if(R>150&&R<800&&Math.random()<.03){const L=g.find(we=>!we.active);L&&(L.active=!0,L.pos.copy(m.pos),L.vel.copy(z).normalize().multiplyScalar(2500),L.color.set(m.team===0?"#00ffff":"#ff3300"),L.life=.8)}const k=z.normalize().multiplyScalar(400*S);m.vel.add(k),m.vel.clampLength(0,600),m.pos.addScaledVector(m.vel,S),m.trail.push(m.pos.clone()),m.trail.length>5&&m.trail.shift(),i.position.copy(m.pos);const B=i.position.clone().add(m.vel);i.lookAt(B),b.copy(k).cross(m.vel),i.rotateZ(b.y*.01),i.scale.set(30,30,30)}else{m.explosionTimer+=S,i.position.copy(m.pos),i.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const R=30*Math.max(.1,1-m.explosionTimer*2);i.scale.set(R,R,R),m.explosionTimer>.5&&(m.state=0,m.health=100,m.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),m.vel.set(0,0,0),m.trail=[])}i.updateMatrix(),m.team===0?(f.current.setMatrixAt(m.meshIndex,i.matrix),v.set(m.state===0?"#00aaff":"#ffaa00"),f.current.setColorAt(m.meshIndex,v)):(c.current.setMatrixAt(m.meshIndex,i.matrix),v.set(m.state===0?"#ff0033":"#ffaa00"),c.current.setColorAt(m.meshIndex,v)),m.trail.forEach((R,k)=>{if(P<400){i.position.copy(R),i.rotation.set(0,0,0);const B=k/5*10;i.scale.set(B,B,B),i.updateMatrix(),d.current.setMatrixAt(P,i.matrix),v.set(m.team===0?"#00ffff":"#ff5500"),d.current.setColorAt(P,v),P++}})});for(let m=P;m<400;m++)i.position.set(0,9999,0),i.scale.set(0,0,0),i.updateMatrix(),d.current.setMatrixAt(m,i.matrix);g.forEach((m,R)=>{m.active?(m.pos.addScaledVector(m.vel,S),m.life-=S,F.forEach(k=>{k.state===0&&m.pos.distanceTo(k.pos)<50&&(k.health-=50,m.active=!1,k.health<=0&&(k.state=1,k.explosionTimer=0))}),m.life<=0&&(m.active=!1),l.position.copy(m.pos),l.lookAt(l.position.clone().add(m.vel)),l.scale.set(1,1,1)):(l.position.set(0,9999,0),l.scale.set(0,0,0)),l.updateMatrix(),u.current.setMatrixAt(R,l.matrix),u.current.setColorAt(R,m.color)}),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),d.current.instanceMatrix.needsUpdate=!0,d.current.instanceColor&&(d.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0)}),e.jsxs("group",{position:r,children:[e.jsx("instancedMesh",{ref:f,args:[h,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:c,args:[p,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:u,args:[j,null,60],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:G})}),e.jsx("instancedMesh",{ref:d,args:[new Ee(1,4,4),null,400],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:G,depthWrite:!1})})]})},yt=({position:r,rotation:s,visible:t})=>{const o=H(I,"/interstellar_logo_final.png");o.colorSpace=E;const n=A(),i=a.useRef({triggered:!1});return x(()=>{n&&n.offset>=.41&&n.offset<=.43&&!i.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,i.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),e.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),e.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:T})]}),e.jsx(xt,{position:[0,-200,-800]}),e.jsx(gt,{position:[0,-120,-100]}),e.jsx(vt,{position:[0,-50,0]}),e.jsxs("group",{position:[0,120,200],children:[e.jsxs("mesh",{position:[0,50,0],children:[e.jsx("planeGeometry",{args:[180,180]}),e.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1})]}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),e.jsx($,{appId:"interstellar",position:[-150,100,200]})]})},jt=({position:r})=>{const s=a.useRef(),t=a.useMemo(()=>({uTime:{value:0},uColor:{value:new C("#00ffff")}}),[]);return x(o=>{s.current&&(s.current.uniforms.uTime.value=o.clock.elapsedTime)}),e.jsxs("mesh",{position:r,children:[e.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),e.jsx("shaderMaterial",{ref:s,transparent:!0,side:W,blending:G,depthWrite:!1,uniforms:t,vertexShader:`
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
        `})]})},Mt=()=>{const r=a.useRef(),s=a.useMemo(()=>({uTime:{value:0},uColor:{value:new C("#0044ff")},uHighlight:{value:new C("#00ffff")}}),[]);return x(t=>{r.current&&(r.current.uniforms.uTime.value=t.clock.elapsedTime)}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),e.jsx("shaderMaterial",{ref:r,transparent:!0,wireframe:!0,uniforms:s,vertexShader:`
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
        `})]})},wt=({position:r,rotation:s,visible:t})=>{const[o,n]=a.useState(null);return a.useEffect(()=>{new I().load("/cloveh2o_logo.png",l=>{l.colorSpace=E,n(l)})},[]),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:T})]}),e.jsx(Mt,{}),e.jsx(jt,{position:[0,1800,-800]}),e.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),e.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),e.jsxs("group",{position:[0,0,-300],children:[o&&e.jsxs("mesh",{position:[0,80,0],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1,blending:G})]}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},q=({color:r,number:s,groupRef:t,armRef:o})=>e.jsxs("group",{ref:t,children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.3,roughness:.4})]}),e.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("group",{position:[0,17,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2.8,32,32]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.8,metalness:.5})]}),e.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[e.jsx("boxGeometry",{args:[3.5,2,2]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),e.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.6})]})}),e.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:o,children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.6})]})}),e.jsxs("mesh",{position:[-1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.8})]}),e.jsxs("mesh",{position:[1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.8})]}),s&&e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:s})]}),bt=({position:r})=>{const s=a.useRef(),t=a.useRef(),o=a.useRef(),n=a.useRef(),i=a.useRef(),l=a.useRef(),f=a.useMemo(()=>new w(100,0,0),[]),c=a.useMemo(()=>new w(100,0,20),[]),u=a.useMemo(()=>new w(30,0,100),[]),d=a.useMemo(()=>new w(0,0,-20),[]),h=a.useMemo(()=>new w(20,0,220),[]),p=a.useMemo(()=>new w,[]),j=a.useMemo(()=>new w,[]);return a.useMemo(()=>new w,[]),x(F=>{const g=F.clock.elapsedTime%6;if(o.current&&o.current.rotation.set(0,0,-.3),g<.5)t.current&&t.current.position.copy(f),n.current&&n.current.position.copy(c),i.current&&i.current.position.copy(u),s.current&&s.current.position.copy(d),l.current&&l.current.position.copy(d).add(p.set(4.5,12,2));else if(g<4){const z=(g-.5)/3.5;if(t.current&&(z<.5?t.current.position.lerpVectors(f,p.set(100,0,110),z*2):t.current.position.lerpVectors(j.set(100,0,110),h,(z-.5)*2)),n.current&&t.current&&n.current.position.lerpVectors(c,p.set(h.x+8,0,h.z-8),z),i.current&&i.current.position.lerpVectors(u,p.set(h.x-8,0,h.z+8),z),l.current)if(g<1.5)l.current.position.copy(d).add(p.set(4.5,12,2));else{const b=(g-1.5)/2.5,v=Math.sin(b*Math.PI)*45;l.current.position.lerpVectors(d,h,b),l.current.position.y+=v+18}}else if(g<5)t.current&&t.current.position.lerpVectors(h,p.set(20,0,240),g-4),l.current&&t.current&&l.current.position.copy(t.current.position).add(p.set(0,12,3)),n.current&&(n.current.position.y=0),i.current&&(i.current.position.y=0);else if(g<5.5)o.current&&o.current.rotation.set(Math.PI,0,0),l.current&&t.current&&l.current.position.copy(t.current.position).add(p.set(4.5,20,0));else if(o.current&&o.current.rotation.set(-Math.PI/4,0,0),l.current&&t.current){const z=g-5.5,b=Math.abs(Math.cos(z*8))*10;l.current.position.copy(t.current.position).add(p.set(4.5,b,4))}}),e.jsxs("group",{position:r,children:[e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),e.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[e.jsx("planeGeometry",{args:[400,40]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),e.jsx(q,{color:"#0088ff",number:"QB",groupRef:s}),e.jsx(q,{color:"#00ffff",number:"80",groupRef:t,armRef:o}),e.jsx(q,{color:"#ff0044",number:"CB",groupRef:n}),e.jsx(q,{color:"#ff0044",number:"S",groupRef:i}),e.jsxs("mesh",{ref:l,children:[e.jsx("sphereGeometry",{args:[2,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},zt=()=>e.jsxs("group",{position:[0,300,-300],rotation:[.1,0,0],children:[e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("boxGeometry",{args:[800,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[0,0,10.1],children:[e.jsx("planeGeometry",{args:[790,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-580,0,150],rotation:[0,Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-571,0,155],rotation:[0,Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[580,0,150],rotation:[0,-Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[571,0,155],rotation:[0,-Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsxs("mesh",{position:[390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsx("gridHelper",{args:[800,80,"#00ff00","#004400"],position:[0,0,11],rotation:[Math.PI/2,0,0]}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,80,15],fontSize:70,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ff00",anchorX:"center",anchorY:"middle",children:"FANTASY QUANT"}),e.jsxs(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,15],fontSize:35,color:"#00ffff",outlineWidth:.01,outlineColor:"#0088ff",anchorX:"center",anchorY:"middle",children:["PREDICTING: 42 YD PASS ","->"," TOUCHDOWN"]}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,15],fontSize:22,color:"#ffffff",maxWidth:750,textAlign:"center",lineHeight:1.5,anchorX:"center",anchorY:"middle",children:'"This is going to Rice, WR #80, post route contested catch in traffic over the safety and cornerback... TOUCHDOWN!!"'}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-580,40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"WIN PROB: 94%"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-580,-40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"EXPECTED PTS: +6.0"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[580,40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"DEF COVERAGE: COVER 2"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[580,-40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"MISMATCH DETECTED"})]}),St=()=>{const s=[];for(let n=0;n<20;n++){const i=600+n*80,l=n*40-100;s.push(e.jsxs("mesh",{position:[0,l,0],rotation:[Math.PI/2,0,0],children:[e.jsx("torusGeometry",{args:[i,20,16,100,Math.PI*1.5]}),e.jsx("meshStandardMaterial",{color:"#222222",roughness:.9})]},`ring-${n}`))}const t=a.useRef(),o=1e4;return a.useEffect(()=>{if(!t.current)return;const n=new V,i=new C,l=["#ff0044","#0044ff","#ffffff","#00ff00","#ffaa00"];let f=0;for(let c=0;c<20;c++){const u=600+c*80,d=c*40-100,h=Math.floor(u*Math.PI*1.5/10);for(let p=0;p<h&&!(f>=o);p++){const j=p/h*Math.PI*1.5;n.position.set(Math.cos(j)*u,d+15,Math.sin(j)*u),n.position.x+=(Math.random()-.5)*5,n.position.z+=(Math.random()-.5)*5,n.updateMatrix(),t.current.setMatrixAt(f,n.matrix),i.set(l[Math.floor(Math.random()*l.length)]),t.current.setColorAt(f,i),f++}}t.current.instanceMatrix.needsUpdate=!0,t.current.instanceColor&&(t.current.instanceColor.needsUpdate=!0)},[]),e.jsxs("group",{rotation:[0,Math.PI*1.25,0],children:[s,e.jsxs("instancedMesh",{ref:t,args:[null,null,o],children:[e.jsx("boxGeometry",{args:[8,15,8]}),e.jsx("meshStandardMaterial",{roughness:.8})]})]})},Tt=({position:r,rotation:s,visible:t})=>{const o=H(I,"/fantasy_quant_stadium.jpg");return o.colorSpace=E,o.wrapS=N,o.repeat.set(-1,1),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[3e3,32,32]}),e.jsx("meshBasicMaterial",{map:o,side:T})]}),e.jsx(St,{}),e.jsx(bt,{position:[0,-120,100]}),e.jsx("ambientLight",{intensity:.5,color:"#00ff00"}),e.jsx("pointLight",{color:"#00ff00",intensity:3,distance:2e3,position:[0,500,500]}),e.jsx("pointLight",{color:"#0088ff",intensity:2,distance:2e3,position:[0,500,-500]}),e.jsx(zt,{})]})},Pt=()=>{const r=a.useRef(),s=a.useMemo(()=>Array.from({length:150}).map(()=>({x:(Math.random()-.5)*400,y:(Math.random()-.5)*400,z:Math.random()*2e3,speed:10+Math.random()*20})),[]);return x(()=>{r.current&&r.current.children.forEach((t,o)=>{t.position.z+=s[o].speed,t.position.z>500&&(t.position.z-=2e3)})}),e.jsx("group",{ref:r,children:s.map((t,o)=>e.jsxs("mesh",{position:[t.x,t.y,t.z],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[.2,.2,100,4]}),e.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.3})]},o))})},Rt=({worldPosition:r})=>{const s=a.useRef(),t=H(I,"/assets/images/contango_quant_logo_new.png");return x(o=>{if(s.current){const i=o.camera.position.clone().sub(new w(...r));s.current.position.copy(i),s.current.rotation.copy(o.camera.rotation)}}),e.jsxs("group",{ref:s,children:[e.jsxs("group",{position:[0,-15,0],children:[e.jsxs("mesh",{position:[0,-2,-15],rotation:[.2,0,0],children:[e.jsx("boxGeometry",{args:[40,5,2]}),e.jsx("meshStandardMaterial",{color:"#111",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-20,2,-10],rotation:[0,Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[20,2,-10],rotation:[0,-Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[0,-5,10],children:[e.jsx("boxGeometry",{args:[38,20,2]}),e.jsx("meshStandardMaterial",{color:"#0a0a0a",roughness:.8})]})]}),e.jsxs("group",{position:[0,5,-50],children:[e.jsxs("mesh",{position:[0,15,0],children:[e.jsx("planeGeometry",{args:[40,20]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:.9,depthWrite:!1})]}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-2,0],fontSize:6,color:"#ffffff",anchorX:"center",outlineWidth:.05,outlineColor:"#000000",children:"CONTANGO QUANT"}),e.jsx(M,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-9,0],fontSize:3,color:"#ffffff",anchorX:"center",opacity:.9,transparent:!0,children:"Quant Trading Systems"})]})]})},kt=({worldPosition:r})=>{const s=a.useRef(),t=a.useMemo(()=>Array.from({length:800}).map(()=>{const o=Math.random()>.5,n=20+Math.random()*80,i=n+Math.random()*40,l=Math.random()*Math.PI*2,f=60+Math.random()*200;return{x:Math.cos(l)*f,y:Math.sin(l)*f,z:(Math.random()-.5)*12e3,isGreen:o,height:n,wickHeight:i,speed:15+Math.random()*25}}),[]);return x(o=>{if(s.current){const i=o.camera.position.clone().sub(new w(...r));s.current.position.copy(i),s.current.children.forEach((l,f)=>{l.position.z+=t[f].speed,l.position.z>2e3&&(l.position.z-=12e3)})}}),e.jsx("group",{ref:s,children:t.map((o,n)=>e.jsxs("group",{position:[o.x,o.y,o.z],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[1,1,o.wickHeight,4]}),e.jsx("meshStandardMaterial",{color:o.isGreen?"#00ff00":"#ff0044",emissive:o.isGreen?"#00ff00":"#ff0044",emissiveIntensity:2})]}),e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[8,o.height,8]}),e.jsx("meshStandardMaterial",{color:o.isGreen?"#00ff00":"#ff0044",transparent:!0,opacity:.9,emissive:o.isGreen?"#00aa00":"#aa0022",emissiveIntensity:.8})]})]},n))})},Ct=({position:r,rotation:s,visible:t})=>{const o=A(),[n,i]=a.useState(!1);return x(()=>{t&&(o.offset>.925&&o.offset<.935&&!n&&!window.contangoLocked&&(window.contangoLocked=!0,i(!0),setTimeout(()=>{window.contangoLocked=!1},4e3)),(o.offset<.9||o.offset>.96)&&n&&(i(!1),window.contangoLocked=!1))}),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000205",side:T})]}),e.jsx(Pt,{}),t&&e.jsx(kt,{worldPosition:r}),t&&e.jsx(Rt,{worldPosition:r}),e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[0,50,-100],intensity:2,color:"#00ffcc",distance:500})]})},It=({position:r,rotation:s,visible:t})=>{const o=a.useRef(),n=a.useRef(),i=H(I,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return x(l=>{o.current&&(o.current.position.y=Math.sin(l.clock.elapsedTime*1.5)*5),n.current&&(n.current.rotation.y+=.005,n.current.rotation.z+=.002)}),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1500,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:T})]}),e.jsxs("group",{children:[e.jsx(ve,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:e.jsxs("mesh",{ref:o,position:[0,0,-500],children:[e.jsx("planeGeometry",{args:[400,100]})," ",e.jsx("meshBasicMaterial",{map:i,transparent:!0,opacity:1,side:W,depthWrite:!1})]})}),e.jsx(J,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),e.jsx(J,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),e.jsx("ambientLight",{intensity:.5,color:"#002244"}),e.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},Lt=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,_t=`
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
`,Gt=({startZ:r=10,endZ:s=-500,visible:t=!0})=>{const o=a.useRef(),n=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);x(l=>{o.current&&t&&(o.current.uniforms.uTime.value=l.clock.elapsedTime,o.current.uniforms.uOpacity.value=_.lerp(o.current.uniforms.uOpacity.value,t?1:0,.05))});const i=a.useMemo(()=>{const l=[],c=r-s;for(let u=0;u<=100;u++){const d=r-u/100*c;l.push(new w(Math.sin(u*.1)*2,Math.cos(u*.05)*2,d))}return new Ue(l)},[r,s]);return e.jsxs("mesh",{visible:t,children:[e.jsx("tubeGeometry",{args:[i,200,15,32,!1]}),e.jsx("shaderMaterial",{ref:o,vertexShader:Lt,fragmentShader:_t,uniforms:n,side:T,transparent:!0,blending:G})]})},Et=`
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
`,At=`
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
`,Ft=({position:r,rotation:s=[0,0,0],length:t=4e3,visible:o=!0})=>{const n=a.useRef(),i=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:t}}),[t]);return x(l=>{n.current&&(n.current.uniforms.uTime.value=l.clock.elapsedTime,n.current.uniforms.uOpacity.value=o?1:0)}),e.jsx("group",{position:r,rotation:s,visible:o,children:e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[120,120,t+200,32,64,!0]}),e.jsx("shaderMaterial",{ref:n,vertexShader:Et,fragmentShader:At,uniforms:i,transparent:!0,side:T,wireframe:!1})]})})},Q=({position:r,rotation:s,length:t=4e3,radius:o=200,color:n="#ffffff",speed:i=20,visible:l=!0})=>{const f=a.useRef(),c=a.useMemo(()=>({uTime:{value:0},uColor:{value:new C(n)}}),[n]);return x(u=>{f.current&&(f.current.uniforms.uTime.value=u.clock.elapsedTime)}),e.jsxs("mesh",{visible:l,position:r,rotation:s,children:[e.jsx("cylinderGeometry",{args:[o,o,t,32,1,!0]}),e.jsx("shaderMaterial",{ref:f,transparent:!0,side:T,blending:G,depthWrite:!1,uniforms:c,vertexShader:`
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
        `})]})},Ut=()=>{const r=[],s=(t,o,n)=>{r.push({x:t,y:o,z:0,rot:[Math.PI/2,0,0],color:n,bodyHeight:40+Math.random()*40})};for(let t=Math.PI*.25;t<Math.PI*1.75;t+=.2)s(-100+Math.cos(t)*80,Math.sin(t)*80,"#00ff00");for(let t=0;t<Math.PI*2;t+=.2)s(100+Math.cos(t)*80,Math.sin(t)*80,"#ff0044");return s(140,-40,"#ff0044"),s(160,-60,"#ff0044"),s(180,-80,"#ff0044"),r},Bt=({position:r,rotation:s=[0,0,0],length:t=6e3,radius:o=250,visible:n})=>{const i=a.useRef(),l=a.useRef(),f=a.useRef(),c=H(I,"/assets/images/contango_logo.png"),u=a.useMemo(()=>{const p=[],j=Math.floor(t/5);for(let g=0;g<j;g++){const z=-(g/j)*t,b=g*.1,v=Math.cos(b)*o,y=Math.sin(b)*o,S=Math.cos(b+Math.PI)*o,P=Math.sin(b+Math.PI)*o,R=Math.random()>.5?"#00ff00":"#ff0044",k=20+Math.random()*60,B=[0,0,b+Math.PI/2],L=[0,0,b+Math.PI+Math.PI/2];p.push({x:v,y,z,rot:B,color:R,bodyHeight:k}),p.push({x:S,y:P,z,rot:L,color:R,bodyHeight:k})}return Ut().forEach(g=>{p.push({x:g.x,y:g.y,z:-t-500,rot:g.rot,color:g.color,bodyHeight:g.bodyHeight})}),p},[t,o]),d=a.useMemo(()=>new V,[]),h=a.useMemo(()=>new C,[]);return a.useEffect(()=>{if(!(!l.current||!f.current)){for(let p=0;p<totalCount;p++){const j=u[p];d.position.set(j.x,j.y,j.z),d.rotation.set(j.rot[0],j.rot[1],j.rot[2]),d.scale.set(1,j.bodyHeight+40,1),d.updateMatrix(),l.current.setMatrixAt(p,d.matrix),h.set(j.color),l.current.setColorAt(p,h),d.scale.set(1,j.bodyHeight,1),d.updateMatrix(),f.current.setMatrixAt(p,d.matrix),f.current.setColorAt(p,h)}l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0)}},[u,totalCount]),x(p=>{i.current&&n&&(i.current.rotation.z=p.clock.elapsedTime*.5)}),e.jsxs("group",{position:r,rotation:s,visible:n,children:[e.jsxs("group",{ref:i,children:[e.jsxs("instancedMesh",{ref:l,args:[null,null,totalCount],children:[e.jsx("cylinderGeometry",{args:[2,2,1,8]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),e.jsxs("instancedMesh",{ref:f,args:[null,null,totalCount],children:[e.jsx("boxGeometry",{args:[10,1,10]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),e.jsxs("mesh",{position:[0,0,-t-500],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0})]}),e.jsxs("mesh",{position:[0,0,-t/2],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[o*.8,o*.8,t,32,1,!0]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:T})]})]})},Wt=({position:r,rotation:s,length:t=8e3,visible:o=!0})=>{const n=a.useRef(),i=a.useRef();x(f=>{if(!o||!n.current)return;const c=f.clock.getElapsedTime();n.current.map.offset.y=-c*3,i.current&&(i.current.rotation.y=c*2)});const l=he.useMemo(()=>{const f=document.createElement("canvas");f.width=512,f.height=512;const c=f.getContext("2d"),u=c.createLinearGradient(0,0,0,512);u.addColorStop(0,"#001a33"),u.addColorStop(.5,"#00ccff"),u.addColorStop(1,"#001a33"),c.fillStyle=u,c.fillRect(0,0,512,512),c.fillStyle="#ffffff";for(let h=0;h<200;h++)c.globalAlpha=Math.random()*.5,c.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const d=new ge(f);return d.wrapS=N,d.wrapT=N,d.repeat.set(4,20),d},[]);return e.jsxs("group",{position:r,rotation:s,visible:o,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,t,32,1,!0]}),e.jsx("meshStandardMaterial",{ref:n,map:l,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:T,transparent:!0,opacity:.9})]}),e.jsxs("mesh",{ref:i,children:[e.jsx("cylinderGeometry",{args:[140,140,t,16,40,!0]}),e.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:T})]})]})},U=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10550,rx:0,ry:0},{p:.51,x:0,y:-3980,z:-10550,rx:0,ry:0},{p:.53,x:0,y:-3980,z:-11550,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-12550,rx:0,ry:0},{p:.57,x:0,y:-3980,z:-13550,rx:0,ry:0},{p:.6,x:0,y:-3980,z:-13550,rx:0,ry:0},{p:.62,x:0,y:-3980,z:-14550,rx:0,ry:0},{p:.64,x:0,y:-3980,z:-15550,rx:0,ry:0},{p:.66,x:0,y:-4e3,z:-16550,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16550,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],Ht=r=>{if(r<=U[0].p)return U[0];if(r>=U[U.length-1].p)return U[U.length-1];for(let s=0;s<U.length-1;s++){const t=U[s],o=U[s+1];if(r>=t.p&&r<=o.p){const n=(r-t.p)/(o.p-t.p);return{x:_.lerp(t.x,o.x,n),y:_.lerp(t.y,o.y,n),z:_.lerp(t.z,o.z,n),rx:_.lerp(t.rx,o.rx,n),ry:_.lerp(t.ry,o.ry,n)}}}return U[0]},me=new te,pe=new xe,Ot=()=>{const r=A(),s=a.useRef();return x(t=>{let o=r.offset;window.icebreakerCaveLocked?o=.22:window.icebreakerThawLocked?o=.27:window.icebreakerTextLocked?o=.29:window.mindwaveLocked?o=.08:window.interstellarLocked?o=.42:window.autopilotLocked?o=.585:window.contangoLocked&&(o=.93);const n=Ht(o);t.camera.position.x=_.lerp(t.camera.position.x,n.x,.2),t.camera.position.y=_.lerp(t.camera.position.y,n.y,.2),t.camera.position.z=_.lerp(t.camera.position.z,n.z,.2),pe.set(n.rx,n.ry,0),me.setFromEuler(pe),t.camera.quaternion.slerp(me,.15);const i=r.delta*10;t.camera.rotateZ(_.lerp(0,i*2,.2)),s.current&&s.current.position.copy(t.camera.position)}),e.jsxs("group",{children:[e.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),e.jsx("pointLight",{ref:s,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),e.jsx("ambientLight",{intensity:.2})]})},Nt=()=>{const r=A(),[s,t]=a.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),o=a.useRef(s);return x(()=>{const n=r.offset,i={intro:n<.08,mindwave:n>.04&&n<.18,wormhole_ice:n>.1&&n<.25,icebreaker:n>.18&&n<.35,wormhole_sound:n>.28&&n<.42,interstellar:n>.28&&n<.48,w_legal:n>.43&&n<.54,legal:n>.46&&n<.55,w_autopilot:n>.52&&n<.59,autopilot:n>.55&&n<.63,w_clove:n>.61&&n<.67,clove:n>.64&&n<.76,w_fantasy:n>.71&&n<.83,fantasy:n>.73&&n<.88,w_contango:n>.84&&n<.91,contango:n>.89&&n<.96,sentaient:n>.94};let l=!1;for(const f in i)o.current[f]!==i[f]&&(l=!0);l&&(o.current=i,t(i))}),e.jsxs("group",{children:[e.jsx(Gt,{startZ:10,endZ:-250,visible:s.intro}),e.jsx(ut,{position:[0,0,-1350],visible:s.mindwave}),e.jsx(Ft,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:s.wormhole_ice}),e.jsx(nt,{position:[0,-4e3,-2550],visible:s.icebreaker}),e.jsx(Q,{position:[0,-4e3,-5050],rotation:[Math.PI/2,0,0],length:3500,color:"#ff00ff",speed:20,visible:s.wormhole_sound}),e.jsx(yt,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:s.interstellar}),e.jsx(Q,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:s.w_legal}),e.jsx(ht,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:s.legal}),e.jsx(Q,{position:[0,-4e3,-12050],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffff",speed:40,visible:s.w_autopilot}),e.jsx(at,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:s.autopilot}),e.jsx(Q,{position:[0,-4e3,-15050],rotation:[Math.PI/2,0,0],length:2e3,color:"#ff00ff",speed:40,visible:s.w_clove}),e.jsx(wt,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:s.clove}),e.jsx(Wt,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:s.w_fantasy}),e.jsx(Tt,{position:[0,-11700,-17500],rotation:[0,0,0],visible:s.fantasy}),e.jsx(Bt,{position:[0,-11750,-20550],length:4e3,visible:s.w_contango}),e.jsx(Ct,{position:[0,-11750,-24800],rotation:[0,0,0],visible:s.contango}),e.jsx(It,{position:[0,-11750,-29350],rotation:[0,0,0],visible:s.sentaient})]})},Vt=()=>{const r=A(),s=a.useRef(),t=a.useRef();return a.useRef(),a.useRef(),a.useRef(),x(()=>{const o=r.offset;if(s.current){const n=o<.03?1:0;s.current.style.opacity=n}if(t.current){const n=o>.2&&o<.28?1:0;t.current.style.opacity=n}}),e.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[e.jsxs("div",{ref:s,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[e.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),e.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),e.jsxs("div",{ref:t,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[e.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[e.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:e.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),e.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),e.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),e.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},Dt=()=>e.jsxs(Te,{dpr:[1,1.5],performance:{min:.5},gl:{antialias:!1,alpha:!0,powerPreference:"high-performance"},children:[e.jsxs(Be,{pages:10,damping:.2,distance:1.2,children:[e.jsxs(he.Suspense,{fallback:null,children:[e.jsx(Ot,{}),e.jsx(Nt,{})]}),e.jsx(J,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),e.jsx(We,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:e.jsx(Vt,{})})]}),e.jsxs(Pe,{disableNormalPass:!0,children:[e.jsx(Re,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),e.jsx(ke,{opacity:.05}),e.jsx(Ce,{eskil:!1,offset:.1,darkness:1.1})]})]}),ro=()=>e.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[e.jsxs(be,{children:[e.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),e.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),e.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),e.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:e.jsx(ze,{})}),e.jsx("div",{className:"absolute inset-0 z-0",children:e.jsx(Dt,{})})]});export{ro as default};
