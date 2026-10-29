import{k as a,h as mt,_ as ae,j as e,a as Ye,H as ht}from"./vendor-JmSMlGGQ.js";import{H as pt}from"./Header-KRgvAWsR.js";import{b as xt,u as g,e as gt,a as J,C as yt}from"./constants-B1l2Kg3L.js";import{E as vt,B as jt,N as Mt,V as wt}from"./Vignette-C40qjNqA.js";import{aq as b,n as Y,ap as Pt,a1 as qe,_ as Ze,a3 as Te,O as ce,o as _e,G as bt,k as F,P as zt,M as St,aj as W,a9 as V,a as L,K as U,B as E,a8 as ie,Y as X,E as Xe,h as $e,l as Tt,af as Rt,ad as Ct,q as kt,g as It,f as Gt,i as Lt}from"./three-DSa_y4UV.js";import{u as H,F as Qe,a as _t,S as Et}from"./Float-DEpotcRd.js";import{T as C}from"./Text-Duu9tExd.js";import{S as se}from"./Sparkles-CEJFyKLM.js";import"./main-DW5ef-If.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";const le=new b,Re=new b,At=new b,Ee=new Pt;function Ft(r,s,t){const n=le.setFromMatrixPosition(r.matrixWorld);n.project(s);const o=t.width/2,i=t.height/2;return[n.x*o+o,-(n.y*i)+i]}function Wt(r,s){const t=le.setFromMatrixPosition(r.matrixWorld),n=Re.setFromMatrixPosition(s.matrixWorld),o=t.sub(n),i=s.getWorldDirection(At);return o.angleTo(i)>Math.PI/2}function Bt(r,s,t,n){const o=le.setFromMatrixPosition(r.matrixWorld),i=o.clone();i.project(s),Ee.set(i.x,i.y),t.setFromCamera(Ee,s);const l=t.intersectObjects(n,!0);if(l.length){const f=l[0].distance;return o.distanceTo(t.ray.origin)<f}return!0}function Ut(r,s){if(s instanceof Ze)return s.zoom;if(s instanceof qe){const t=le.setFromMatrixPosition(r.matrixWorld),n=Re.setFromMatrixPosition(s.matrixWorld),o=s.fov*Math.PI/180,i=t.distanceTo(n);return 1/(2*Math.tan(o/2)*i)}else return 1}function Ht(r,s,t){if(s instanceof qe||s instanceof Ze){const n=le.setFromMatrixPosition(r.matrixWorld),o=Re.setFromMatrixPosition(s.matrixWorld),i=n.distanceTo(o),l=(t[1]-t[0])/(s.far-s.near),f=t[1]-l*s.far;return Math.round(l*i+f)}}const ze=r=>Math.abs(r)<1e-10?0:r;function Ke(r,s,t=""){let n="matrix3d(";for(let o=0;o!==16;o++)n+=ze(s[o]*r.elements[o])+(o!==15?",":")");return t+n}const Ot=(r=>s=>Ke(s,r))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),Vt=(r=>(s,t)=>Ke(s,r(t),"translate(-50%,-50%)"))(r=>[1/r,1/r,1/r,1,-1/r,-1/r,-1/r,-1,1/r,1/r,1/r,1,1,1,1,1]);function Dt(r){return r&&typeof r=="object"&&"current"in r}const Nt=a.forwardRef(({children:r,eps:s=.001,style:t,className:n,prepend:o,center:i,fullscreen:l,portal:f,distanceFactor:c,sprite:d=!1,transform:u=!1,occlude:m,onOcclude:p,castShadow:x,receiveShadow:j,material:w,geometry:M,zIndexRange:S=[16777271,0],calculatePosition:y=Ft,as:v="div",wrapperClass:R,pointerEvents:I="auto",...h},_)=>{const{gl:k,camera:P,scene:G,size:T,raycaster:Me,events:rt,viewport:ot}=xt(),[A]=a.useState(()=>document.createElement(v)),we=a.useRef(),O=a.useRef(null),Ce=a.useRef(0),fe=a.useRef([0,0]),re=a.useRef(null),Pe=a.useRef(null),ee=f?.current||rt.connected||k.domElement.parentNode,Z=a.useRef(null),de=a.useRef(!1),ue=a.useMemo(()=>m&&m!=="blending"||Array.isArray(m)&&m.length&&Dt(m[0]),[m]);a.useLayoutEffect(()=>{const B=k.domElement;m&&m==="blending"?(B.style.zIndex=`${Math.floor(S[0]/2)}`,B.style.position="absolute",B.style.pointerEvents="none"):(B.style.zIndex=null,B.style.position=null,B.style.pointerEvents=null)},[m]),a.useLayoutEffect(()=>{if(O.current){const B=we.current=mt(A);if(G.updateMatrixWorld(),u)A.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const z=y(O.current,P,T);A.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${z[0]}px,${z[1]}px,0);transform-origin:0 0;`}return ee&&(o?ee.prepend(A):ee.appendChild(A)),()=>{ee&&ee.removeChild(A),B.unmount()}}},[ee,u]),a.useLayoutEffect(()=>{R&&(A.className=R)},[R]);const ke=a.useMemo(()=>u?{position:"absolute",top:0,left:0,width:T.width,height:T.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:i?"translate3d(-50%,-50%,0)":"none",...l&&{top:-T.height/2,left:-T.width/2,width:T.width,height:T.height},...t},[t,i,l,T,u]),nt=a.useMemo(()=>({position:"absolute",pointerEvents:I}),[I]);a.useLayoutEffect(()=>{if(de.current=!1,u){var B;(B=we.current)==null||B.render(a.createElement("div",{ref:re,style:ke},a.createElement("div",{ref:Pe,style:nt},a.createElement("div",{ref:_,className:n,style:t,children:r}))))}else{var z;(z=we.current)==null||z.render(a.createElement("div",{ref:_,style:ke,className:n,children:r}))}});const te=a.useRef(!0);g(B=>{if(O.current){P.updateMatrixWorld(),O.current.updateWorldMatrix(!0,!1);const z=u?fe.current:y(O.current,P,T);if(u||Math.abs(Ce.current-P.zoom)>s||Math.abs(fe.current[0]-z[0])>s||Math.abs(fe.current[1]-z[1])>s){const $=Wt(O.current,P);let q=!1;ue&&(Array.isArray(m)?q=m.map(Q=>Q.current):m!=="blending"&&(q=[G]));const oe=te.current;if(q){const Q=Bt(O.current,P,Me,q);te.current=Q&&!$}else te.current=!$;oe!==te.current&&(p?p(!te.current):A.style.display=te.current?"block":"none");const me=Math.floor(S[0]/2),at=m?ue?[S[0],me]:[me-1,0]:S;if(A.style.zIndex=`${Ht(O.current,P,at)}`,u){const[Q,Ge]=[T.width/2,T.height/2],be=P.projectionMatrix.elements[5]*Ge,{isOrthographicCamera:Le,top:it,left:ct,bottom:lt,right:ft}=P,dt=Ot(P.matrixWorldInverse),ut=Le?`scale(${be})translate(${ze(-(ft+ct)/2)}px,${ze((it+lt)/2)}px)`:`translateZ(${be}px)`;let K=O.current.matrixWorld;d&&(K=P.matrixWorldInverse.clone().transpose().copyPosition(K).scale(O.current.scale),K.elements[3]=K.elements[7]=K.elements[11]=0,K.elements[15]=1),A.style.width=T.width+"px",A.style.height=T.height+"px",A.style.perspective=Le?"":`${be}px`,re.current&&Pe.current&&(re.current.style.transform=`${ut}${dt}translate(${Q}px,${Ge}px)`,Pe.current.style.transform=Vt(K,1/((c||10)/400)))}else{const Q=c===void 0?1:Ut(O.current,P)*c;A.style.transform=`translate3d(${z[0]}px,${z[1]}px,0) scale(${Q})`}fe.current=z,Ce.current=P.zoom}}if(!ue&&Z.current&&!de.current)if(u){if(re.current){const z=re.current.children[0];if(z!=null&&z.clientWidth&&z!=null&&z.clientHeight){const{isOrthographicCamera:$}=P;if($||M)h.scale&&(Array.isArray(h.scale)?h.scale instanceof b?Z.current.scale.copy(h.scale.clone().divideScalar(1)):Z.current.scale.set(1/h.scale[0],1/h.scale[1],1/h.scale[2]):Z.current.scale.setScalar(1/h.scale));else{const q=(c||10)/400,oe=z.clientWidth*q,me=z.clientHeight*q;Z.current.scale.set(oe,me,1)}de.current=!0}}}else{const z=A.children[0];if(z!=null&&z.clientWidth&&z!=null&&z.clientHeight){const $=1/ot.factor,q=z.clientWidth*$,oe=z.clientHeight*$;Z.current.scale.set(q,oe,1),de.current=!0}Z.current.lookAt(B.camera.position)}});const Ie=a.useMemo(()=>({vertexShader:u?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[u]);return a.createElement("group",ae({},h,{ref:O}),m&&!ue&&a.createElement("mesh",{castShadow:x,receiveShadow:j,ref:Z},M||a.createElement("planeGeometry",null),w||a.createElement("shaderMaterial",{side:Y,vertexShader:Ie.vertexShader,fragmentShader:Ie.fragmentShader})))}),Je=a.forwardRef(function({children:s,follow:t=!0,lockX:n=!1,lockY:o=!1,lockZ:i=!1,...l},f){const c=a.useRef(null),d=a.useRef(null),u=new Te;return g(({camera:m})=>{if(!t||!d.current)return;const p=d.current.rotation.clone();d.current.updateMatrix(),d.current.updateWorldMatrix(!1,!1),d.current.getWorldQuaternion(u),m.getWorldQuaternion(c.current.quaternion).premultiply(u.invert()),n&&(d.current.rotation.x=p.x),o&&(d.current.rotation.y=p.y),i&&(d.current.rotation.z=p.z)}),a.useImperativeHandle(f,()=>d.current,[]),a.createElement("group",ae({ref:d},l),a.createElement("group",{ref:c},s))}),Ae=(r,s)=>{"updateRanges"in r?r.updateRanges[0]=s:r.updateRange=s};function Yt(r){return typeof r=="function"}const Fe=new ce,We=new ce,he=[],ne=new zt;class qt extends bt{constructor(){super(),this.color=new F("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var s;return(s=this.instance.current)==null?void 0:s.geometry}raycast(s,t){const n=this.instance.current;if(!n||!n.geometry||!n.material)return;ne.geometry=n.geometry;const o=n.matrixWorld,i=n.userData.instances.indexOf(this.instanceKey);if(!(i===-1||i>n.count)){n.getMatrixAt(i,Fe),We.multiplyMatrices(o,Fe),ne.matrixWorld=We,n.material instanceof St?ne.material.side=n.material.side:ne.material.side=n.material[0].side,ne.raycast(s,he);for(let l=0,f=he.length;l<f;l++){const c=he[l];c.instanceId=i,c.object=this,t.push(c)}he.length=0}}}const et=a.createContext(null),Be=new ce,Ue=new ce,Zt=new ce,He=new b,Oe=new Te,Ve=new b,Xt=r=>r.isInstancedBufferAttribute,tt=a.forwardRef(({context:r,children:s,...t},n)=>{a.useMemo(()=>gt({PositionMesh:qt}),[]);const o=a.useRef();a.useImperativeHandle(n,()=>o.current,[]);const{subscribe:i,getParent:l}=a.useContext(r||et);return a.useLayoutEffect(()=>i(o),[]),a.createElement("positionMesh",ae({instance:l(),instanceKey:o,ref:o},t),s)}),$t=a.forwardRef(({context:r,children:s,range:t,limit:n=1e3,frames:o=1/0,...i},l)=>{const[{localContext:f,instance:c}]=a.useState(()=>{const y=a.createContext(null);return{localContext:y,instance:a.forwardRef((v,R)=>a.createElement(tt,ae({context:y},v,{ref:R})))}}),d=a.useRef(null);a.useImperativeHandle(l,()=>d.current,[]);const[u,m]=a.useState([]),[[p,x]]=a.useState(()=>{const y=new Float32Array(n*16);for(let v=0;v<n;v++)Zt.identity().toArray(y,v*16);return[y,new Float32Array([...new Array(n*3)].map(()=>1))]});a.useEffect(()=>{d.current.instanceMatrix.needsUpdate=!0});let j=0,w=0;const M=a.useRef([]);a.useLayoutEffect(()=>{M.current=Object.entries(d.current.geometry.attributes).filter(([y,v])=>Xt(v))}),g(()=>{if(o===1/0||j<o){d.current.updateMatrix(),d.current.updateMatrixWorld(),Be.copy(d.current.matrixWorld).invert(),w=Math.min(n,t!==void 0?t:n,u.length),d.current.count=w,Ae(d.current.instanceMatrix,{offset:0,count:w*16}),Ae(d.current.instanceColor,{offset:0,count:w*3});for(let y=0;y<u.length;y++){const v=u[y].current;v.matrixWorld.decompose(He,Oe,Ve),Ue.compose(He,Oe,Ve).premultiply(Be),Ue.toArray(p,y*16),d.current.instanceMatrix.needsUpdate=!0,v.color.toArray(x,y*3),d.current.instanceColor.needsUpdate=!0}j++}});const S=a.useMemo(()=>({getParent:()=>d,subscribe:y=>(m(v=>[...v,y]),()=>m(v=>v.filter(R=>R.current!==y.current)))}),[]);return a.createElement("instancedMesh",ae({userData:{instances:u,limit:n,frames:o},matrixAutoUpdate:!1,ref:d,args:[null,null,0],raycast:()=>null},i),a.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:p.length/16,array:p,itemSize:16,usage:_e}),a.createElement("instancedBufferAttribute",{attach:"instanceColor",count:x.length/3,array:x,itemSize:3,usage:_e}),Yt(s)?a.createElement(f.Provider,{value:S},s(c)):r?a.createElement(r.Provider,{value:S},s):a.createElement(et.Provider,{value:S},s))}),Qt=({position:r})=>{const s=a.useRef();H();const[t,n]=a.useState(null);return a.useEffect(()=>{new W().load("/assets/images/digital_fire.jpg",o=>{o.colorSpace=V,n(o)})},[]),g(o=>{if(s.current){const i=window.icebreakerThaw||0;s.current.material.opacity=i*.9;const l=1+Math.sin(o.clock.elapsedTime*5)*.1;s.current.scale.setScalar(l)}}),t?e.jsx("group",{position:r,children:e.jsx(Je,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{ref:s,position:[0,20,0],children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:L})]})})}):null},Kt=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Jt=`
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
`,es=({position:r,angle:s,delay:t})=>{const n=a.useRef(),o=a.useRef();H();const i=a.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new F("#44aaff")},uPartyColor:{value:new F("#ff8844")}}),[]);return g(l=>{if(!n.current||!o.current)return;i.uTime.value=l.clock.elapsedTime;const f=window.icebreakerThaw||0,c=U.clamp((f-t)*2,0,1);i.uState.value=c;const d=Math.sin(l.clock.elapsedTime*8+t*10)*c;if(n.current.position.y=r[1]+(d>0?d*2:0)+15,c>0){const u=0-r[0],m=0-(r[2]- -200),p=Math.sqrt(u*u+m*m)||1;n.current.position.x=r[0]+u/p*(c*20),n.current.position.z=r[2]+m/p*(c*20)}else n.current.position.x=r[0],n.current.position.z=r[2]}),e.jsx("group",{ref:n,position:[r[0],r[1]+15,r[2]],children:e.jsx(Je,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{children:[e.jsx("planeGeometry",{args:[20,30]}),e.jsx("shaderMaterial",{ref:o,vertexShader:Kt,fragmentShader:Jt,uniforms:i,transparent:!0,side:Y,depthWrite:!1})]})})})},ts=({position:r})=>{const t=a.useMemo(()=>{const n=[];for(let o=0;o<60;o++){const i=Math.random()*Math.PI*2,l=30+Math.random()*80;n.push({position:[r[0]+Math.cos(i)*l,r[1],r[2]+Math.sin(i)*l],angle:i,delay:Math.random()*.5})}return n},[60,r]);return e.jsx("group",{children:t.map((n,o)=>e.jsx(es,{...n},o))})},je=({appId:r,position:s})=>e.jsx("group",{position:s}),ss=({position:r})=>{const s=a.useRef(),[t,n]=a.useState(null);return H(),a.useEffect(()=>{new W().load("/icebreaker_logo.png",o=>{o.colorSpace=V,n(o)})},[]),g(o=>{if(s.current&&(s.current.rotation.y=o.clock.elapsedTime*.5,s.current.position.y=r[1]+Math.sin(o.clock.elapsedTime*2)*5,s.current.material)){const i=window.icebreakerThaw||0;s.current.material.opacity=i*.9,s.current.scale.setScalar(.01+i)}}),t?e.jsxs("mesh",{ref:s,position:r,children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:0,depthWrite:!1,blending:L,side:Y})]}):null},rs=({numTrees:r=30,radius:s=50,centerZ:t=-500})=>{const n=a.useRef(),o=a.useRef();H();const i=a.useMemo(()=>new X,[]),l=a.useMemo(()=>{const f=[];for(let c=0;c<r;c++){const d=c/r*Math.PI*2+Math.random()*.5,u=s+Math.random()*20;f.push({position:new b(Math.cos(d)*u,-18,Math.sin(d)*u+t),rotation:new Xe(0,d+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return f},[r,s,t]);return g(()=>{if(!n.current||!o.current)return;const f=window.icebreakerThaw||0;for(let c=0;c<r;c++){const d=l[c],u=Math.max(0,(f-d.delay)*2),m=U.clamp(u,0,1)*d.scale;i.position.copy(d.position),i.rotation.copy(d.rotation),i.scale.setScalar(m),i.updateMatrix(),n.current.setMatrixAt(c,i.matrix),i.position.y+=18*m,i.updateMatrix(),o.current.setMatrixAt(c,i.matrix)}n.current.instanceMatrix.needsUpdate=!0,o.current.instanceMatrix.needsUpdate=!0}),e.jsxs("group",{children:[e.jsxs("instancedMesh",{ref:n,args:[null,null,r],children:[e.jsx("cylinderGeometry",{args:[.5,1,20,8]}),e.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),e.jsxs("instancedMesh",{ref:o,args:[null,null,r],children:[e.jsx("sphereGeometry",{args:[8,4,4]}),e.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},De=`
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
`,Ne=`
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
`,os=({startZ:r,endZ:s})=>{const t=a.useRef(),n=a.useRef(),[o,i]=a.useState(null),l=Math.abs(s-r),f=(r+s)/2,c=a.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return a.useEffect(()=>{new W().load("/assets/images/ice_cavern.jpg",d=>{d.wrapS=ie,d.wrapT=ie,d.repeat.set(4,2),d.colorSpace=V,i(d),c.tMap.value=d})},[c]),g(d=>{if(n.current){const u=window.icebreakerThaw||0;c.uThaw.value=u,c.uTime.value=d.clock.elapsedTime}}),o?e.jsxs("group",{children:[e.jsxs("mesh",{ref:t,position:[0,0,f],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[120,120,l,128,128,!0]}),e.jsx("shaderMaterial",{ref:n,vertexShader:De,fragmentShader:Ne,uniforms:c,transparent:!0,side:E})]}),e.jsxs("mesh",{position:[0,0,1300],children:[e.jsx("sphereGeometry",{args:[120,64,64]}),e.jsx("shaderMaterial",{vertexShader:De,fragmentShader:Ne,uniforms:c,transparent:!0,side:E})]})]}):null},ns=({position:r})=>{const s=a.useRef();return g(t=>{if(s.current){const n=window.icebreakerThaw||0,o=U.lerp(.01,50,Math.pow(n,2));s.current.scale.setScalar(o),s.current.visible=n>0}}),e.jsxs("mesh",{ref:s,position:[r[0],r[1]+1,r[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[20,64]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},as=({position:r})=>{const s=a.useRef();return g(t=>{if(s.current){const n=window.icebreakerThaw||0;s.current.scale.setScalar(n>0?1:.001)}}),e.jsxs("mesh",{ref:s,position:[r[0],r[1]+1.5,r[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[96,64]}),e.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},is=({position:r})=>{const s=a.useRef();return g(()=>{if(s.current){const t=window.icebreakerThaw||0;s.current.opacity=1-Math.pow(t,2),s.current.transparent=!0}}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:r,children:[e.jsx("planeGeometry",{args:[1e3,3e3]}),e.jsx("meshStandardMaterial",{ref:s,color:"#001133",roughness:.1,metalness:.8})]})},cs=({centerZ:r})=>{const s=a.useRef(),t=a.useRef(),n=a.useMemo(()=>({uColorBottom:{value:new F("#ffaa55")},uColorTop:{value:new F("#00f3ff")},uOpacity:{value:0}}),[]);return g(()=>{const o=window.icebreakerThaw||0;s.current&&(s.current.uniforms.uOpacity.value=o),t.current&&(t.current.intensity=o*.6)}),e.jsxs("group",{children:[e.jsxs("mesh",{scale:2e3,children:[e.jsx("sphereGeometry",{args:[1,32,32]}),e.jsx("shaderMaterial",{ref:s,side:E,transparent:!0,depthWrite:!1,uniforms:n,vertexShader:`
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
          `})]}),e.jsx("directionalLight",{ref:t,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),e.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},ls=()=>{const r=H(),[s,t]=a.useState(!1),[n,o]=a.useState(!1),[i,l]=a.useState(!1),f=a.useRef({triggered:!1,timer:0}),c=a.useRef({triggered:!1,timer:0});return a.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),g((d,u)=>{const m=r.offset;!c.current.triggered&&m>=.133&&(c.current.triggered=!0,l(!0),window.icebreakerCaveLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.135*(r.el.scrollHeight-r.el.clientHeight))),window.icebreakerCaveLocked&&(r.el&&(r.el.scrollTop=.135*(r.el.scrollHeight-r.el.clientHeight)),c.current.timer+=u,c.current.timer>1.5&&(window.icebreakerCaveLocked=!1,l(!1),r.el&&(r.el.style.overflow="auto"))),!s&&m>=.138&&window.icebreakerThaw<1&&(t(!0),window.icebreakerThawLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.14*(r.el.scrollHeight-r.el.clientHeight))),window.icebreakerThawLocked?(r.el&&(r.el.scrollTop=.14*(r.el.scrollHeight-r.el.clientHeight)),window.icebreakerThaw+=u*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,r.el&&!n&&(r.el.style.overflow="auto"),t(!1))):m<.13&&(window.icebreakerThaw=0),!f.current.triggered&&m>=.143&&window.icebreakerThaw>=1&&(f.current.triggered=!0,o(!0),window.icebreakerTextLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.145*(r.el.scrollHeight-r.el.clientHeight))),window.icebreakerTextLocked&&(r.el&&(r.el.scrollTop=.145*(r.el.scrollHeight-r.el.clientHeight)),f.current.timer+=u,f.current.timer>1.5&&(window.icebreakerTextLocked=!1,o(!1),r.el&&(r.el.style.overflow="auto")))}),null},fs=({position:r,rotation:s,visible:t=!0})=>e.jsxs("group",{position:r,rotation:s,visible:t,children:[e.jsx(ls,{}),e.jsx(cs,{centerZ:275}),e.jsx(os,{startZ:1550,endZ:-1e3}),e.jsx(is,{position:[0,-20,0]}),e.jsx(ns,{position:[0,-20,275]}),e.jsx(as,{position:[0,-20,275]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-225],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-225],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),e.jsx(Qt,{position:[0,-20,275]}),e.jsx(ss,{position:[0,30,275]}),e.jsx(rs,{radius:60,centerZ:275}),e.jsx(ts,{position:[0,-20,275]}),e.jsx(je,{appId:"icebreaker",position:[-80,20,75]})]}),pe=({position:r,speed:s=2,direction:t=1,color:n="#00ffcc"})=>{const o=a.useRef();return g((i,l)=>{o.current&&o.current.children.forEach((f,c)=>{c!==0&&(f.position.z+=s*t*l*100,f.position.z>1e3&&(f.position.z=-1e3),f.position.z<-1e3&&(f.position.z=1e3))})}),e.jsxs("group",{position:r,ref:o,children:[e.jsxs("mesh",{position:[0,-5,0],children:[e.jsx("boxGeometry",{args:[60,4,2e3]}),e.jsx("meshStandardMaterial",{color:"#111",metalness:.9,roughness:.1}),e.jsx("meshBasicMaterial",{color:"#333",wireframe:!0})]}),Array.from({length:20}).map((i,l)=>e.jsxs("mesh",{position:[0,10,-1e3+l*100],children:[e.jsx("boxGeometry",{args:[30,20,40]}),e.jsx("meshStandardMaterial",{color:n,emissive:n,emissiveIntensity:2,transparent:!0,opacity:.8,wireframe:!0})]},l))]})},xe=({position:r,color:s="#ff00ff"})=>{const t=a.useRef();return g(n=>{t.current&&(t.current.rotation.x=n.clock.elapsedTime*.5,t.current.rotation.y=n.clock.elapsedTime*.3)}),e.jsxs("group",{position:r,children:[e.jsxs("mesh",{position:[0,-100,0],children:[e.jsx("boxGeometry",{args:[100,200,100]}),e.jsx("meshStandardMaterial",{color:"#000",metalness:1,roughness:0}),e.jsx("meshBasicMaterial",{color:s,wireframe:!0})]}),e.jsxs("mesh",{position:[0,100,0],ref:t,children:[e.jsx("icosahedronGeometry",{args:[50,1]}),e.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:1,wireframe:!0})]})]})},ds=({position:r,rotation:s,visible:t})=>{const[n,o]=a.useState(null),i=H(),[l,f]=a.useState(!1);return g(()=>{t&&(i.offset>.29&&i.offset<.31&&!l&&!window.autopilotLocked&&(window.autopilotLocked=!0,f(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(i.offset<.27||i.offset>.33)&&l&&(f(!1),window.autopilotLocked=!1))}),a.useEffect(()=>{new W().load("/autopilot_logo.png",d=>{d.colorSpace=V,o(d)})},[]),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:E})]}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[4e3,4e3]}),e.jsx("meshBasicMaterial",{color:"#001122",transparent:!0,opacity:.8})]}),e.jsx("gridHelper",{args:[4e3,100,"#00ffcc","#003344"],position:[0,-199,0]}),e.jsx(pe,{position:[-400,-150,0],speed:4,direction:1,color:"#00ffcc"}),e.jsx(pe,{position:[400,-150,0],speed:5,direction:-1,color:"#ff00ff"}),e.jsx(pe,{position:[-800,-150,0],speed:3,direction:-1,color:"#0088ff"}),e.jsx(pe,{position:[800,-150,0],speed:6,direction:1,color:"#ffaa00"}),e.jsx(xe,{position:[-200,-50,-1e3],color:"#00ffcc"}),e.jsx(xe,{position:[200,-50,-800],color:"#ff00ff"}),e.jsx(xe,{position:[-600,-50,-600],color:"#0088ff"}),e.jsx(xe,{position:[600,-50,-400],color:"#ffaa00"}),e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{color:"#00ffcc",intensity:3,distance:2e3,position:[-500,500,-500]}),e.jsx("pointLight",{color:"#ff00ff",intensity:3,distance:2e3,position:[500,500,500]}),e.jsxs("group",{position:[0,0,-300],children:[n&&e.jsxs("mesh",{position:[0,100,0],children:[e.jsx("planeGeometry",{args:[250,250]}),e.jsx("meshBasicMaterial",{map:n,transparent:!0,depthWrite:!1,blending:L})]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-40,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ffcc",anchorX:"center",anchorY:"middle",children:"AUTOPILOT"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-100,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#003344",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"Fully autonomous marketing pipelines. Generates content, schedules campaigns, and optimizes spend."})]})]})},us=`
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
`,ms=`
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
`,hs=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,ps=({position:r,visible:s})=>e.jsxs("group",{visible:s,position:r,children:[e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),xs=({position:r,visible:s})=>{const t=H(),n=a.useRef(),o=a.useRef(),i=a.useRef(),[l,f]=a.useState(null),[c,d]=a.useState(null),[u,m]=a.useState(!1),p=a.useRef({triggered:!1,timer:0});a.useEffect(()=>{window.mindwaveLocked=!1,new W().load("/mindwave-logo.png",w=>{w.colorSpace=V,f(w)}),new W().load("/tribal-sun.png",w=>{w.colorSpace=V,d(w)})},[]);const x=r?r[2]:0,j=a.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return g((w,M)=>{if(!s)return;const S=t.offset;!p.current.triggered&&S>=.075&&(p.current.triggered=!0,m(!0),window.mindwaveLocked=!0,t.el&&(t.el.style.overflow="hidden",t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight))),window.mindwaveLocked&&(t.el&&(t.el.scrollTop=.08*(t.el.scrollHeight-t.el.clientHeight)),p.current.timer+=M,p.current.timer>1.5&&(window.mindwaveLocked=!1,m(!1),t.el&&(t.el.style.overflow="auto")));const y=w.clock.elapsedTime;if(n.current){n.current.uniforms.uTime.value=y;const v=Math.abs(w.camera.position.z-x);let I=1-Math.min(v/1e3,1);I=Math.pow(I,2),n.current.uniforms.uScrollProgress.value=I}if(o.current){o.current.position.y=-7+Math.sin(y*2)*2;const v=1+Math.sin(y*4)*.05;o.current.scale.set(v,v,1),o.current.rotation.y=0}if(i.current){i.current.position.y=125+Math.sin(y*2)*2,i.current.rotation.z=y*.1;const v=1+Math.sin(y*3)*.05;i.current.scale.set(v,v,1)}}),e.jsxs("group",{visible:s,position:r,children:[e.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[e.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),e.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:hs,side:E,depthWrite:!1})]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[e.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),e.jsx("shaderMaterial",{ref:n,vertexShader:us,fragmentShader:ms,uniforms:j,transparent:!0,side:Y,wireframe:!1})]}),c&&e.jsxs("mesh",{ref:i,position:[0,-10,-85],children:[e.jsx("planeGeometry",{args:[140,140]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0,side:Y,depthWrite:!1,blending:L,color:"#00ffff",opacity:.6})]}),l&&e.jsxs("mesh",{ref:o,position:[0,-10,-80],children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:l,transparent:!0,side:Y,depthWrite:!1,blending:L})]}),e.jsx(ps,{position:[0,-5,-80],visible:!0}),e.jsx(je,{appId:"mindwave",position:[40,0,-40]})]})},gs=()=>{const s=a.useRef([]),t=a.useRef(document.createElement("canvas")),n=a.useMemo(()=>{t.current.width=512,t.current.height=1024;const i=t.current.getContext("2d");i.fillStyle="#010a15",i.fillRect(0,0,512,1024),i.strokeStyle="#004488",i.lineWidth=2;for(let f=0;f<1024;f+=32)i.beginPath(),i.moveTo(0,f),i.lineTo(512,f),i.stroke(),f<512&&(i.beginPath(),i.moveTo(f,0),i.lineTo(f,1024),i.stroke());i.fillStyle="#0088ff",i.fillRect(40,40,432,60),i.fillStyle="#00ffff",i.font="24px monospace",i.fillText("CLASSIFIED // AI REVIEW",60,78),i.fillStyle="#003366";for(let f=0;f<30;f++){let c=140+f*28;i.fillRect(40,c,432-Math.random()*200,12)}i.strokeStyle="#ff0033",i.lineWidth=5,i.beginPath(),i.arc(400,850,60,0,Math.PI*2),i.stroke(),i.beginPath(),i.arc(400,850,50,0,Math.PI*2),i.stroke();const l=new $e(t.current);return l.colorSpace=V,l},[]),o=a.useMemo(()=>Array.from({length:50}).map((i,l)=>({delay:l*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-400+Math.random()*200})),[50]);return g((i,l)=>{const f=i.clock.elapsedTime;o.forEach((c,d)=>{const u=s.current[d];u&&(f>c.delay&&(c.state==="waiting"&&(c.state="approaching"),c.state==="approaching"&&(c.x-=8e3*l,c.x<=0&&(c.x=0,c.state="scanning",c.scanTimer=f)),c.state==="scanning"&&f-c.scanTimer>.05&&(c.state="approved"),c.state==="approved"&&(c.x-=8e3*l,c.x<-3e3&&(c.x=3e3+Math.random()*500,c.state="approaching",c.y=(Math.random()-.5)*150-50))),u.position.set(c.x,c.y,c.z),c.state==="scanning"?(u.rotation.set(0,0,0),u.scale.setScalar(1.2)):c.state==="approved"?(u.rotation.set(0,.4,0),u.scale.setScalar(1)):(u.rotation.set(0,-.4,0),u.scale.setScalar(1)),c.state==="scanning"?u.color.set("#ffffff"):c.state==="approved"?u.color.set("#00ff66"):u.color.set("#0088ff"))})}),e.jsxs($t,{limit:50,range:50,children:[e.jsx("planeGeometry",{args:[100,200]}),e.jsx("meshBasicMaterial",{map:n,side:Y,transparent:!0,opacity:.9,blending:L,depthWrite:!1}),o.map((i,l)=>e.jsx(tt,{ref:f=>s.current[l]=f,position:[i.x,i.y,i.z]},l))]})},ys=()=>{const r=J(W,"/legal_eagle_courtroom_bg.jpg");return r.colorSpace=V,e.jsxs("group",{children:[e.jsxs("mesh",{position:[0,0,-2500],children:[e.jsx("planeGeometry",{args:[8e3,4500]}),e.jsx("meshBasicMaterial",{map:r,depthWrite:!1,transparent:!0,opacity:.3})]}),[-1,1].map((s,t)=>e.jsxs("mesh",{position:[s*800,0,-1e3],children:[e.jsx("boxGeometry",{args:[400,4e3,400]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.2})]},t)),[-1,1].map((s,t)=>e.jsxs("mesh",{position:[s*1400,0,-1500],children:[e.jsx("boxGeometry",{args:[600,4e3,600]}),e.jsx("meshStandardMaterial",{color:"#030303",metalness:.9,roughness:.3})]},t+2))]})},vs=({logoTex:r})=>{const s=a.useMemo(()=>({uTime:{value:0}}),[]),t=a.useMemo(()=>({uTime:{value:0},uColor:{value:new F("#00ffff")}}),[]);return g(n=>{s.uTime.value=n.clock.elapsedTime,t.uTime.value=n.clock.elapsedTime}),e.jsxs("group",{position:[0,-100,-800],children:[e.jsxs("mesh",{position:[0,-200,0],children:[e.jsx("boxGeometry",{args:[1200,600,400]}),e.jsx("meshStandardMaterial",{color:"#020202",metalness:1,roughness:.1})]}),e.jsxs("mesh",{position:[0,150,0],children:[e.jsx("boxGeometry",{args:[800,100,300]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.8,roughness:.2})]}),e.jsxs(Qe,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[e.jsxs("mesh",{position:[0,400,0],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,depthWrite:!1,blending:L})]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,150,0],fontSize:100,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"})]})]})},js=({position:r,rotation:s,visible:t})=>{const n=J(W,"/legal_eagle_logo.png");return n.colorSpace=V,e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[0,1e3,1e3],intensity:1.5,color:"#00ffff"}),e.jsx("pointLight",{position:[0,500,-400],intensity:2,color:"#0044ff",distance:2e3}),e.jsx(ys,{}),e.jsx(vs,{logoTex:n}),e.jsx(gs,{}),e.jsx(je,{appId:"legaleagle",position:[200,100,-200]})]})},Se=r=>{const t=new Ct;r==="interceptor"?(t.moveTo(1*1.8,0),t.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),t.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),t.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),t.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):r==="viper"?(t.moveTo(1*1.2,1*.3),t.lineTo(1*.4,1*.4),t.lineTo(-1*.8,1*1.2),t.lineTo(-1*1.2,1*.8),t.lineTo(-1*.8,0),t.lineTo(-1*1.2,-1*.8),t.lineTo(-1*.8,-1*1.2),t.lineTo(1*.4,-1*.4),t.lineTo(1*1.2,-1*.3),t.lineTo(1*.6,0)):r==="bulwark"&&(t.moveTo(1*1.5,0),t.lineTo(1*.8,1*1.2),t.lineTo(-1*.5,1*1.5),t.lineTo(-1*1.5,1*.8),t.lineTo(-1*1.5,-1*.8),t.lineTo(-1*.5,-1*1.5),t.lineTo(1*.8,-1*1.2));const n={steps:1,depth:r==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},o=new kt(t,n);return o.center(),o.rotateY(-Math.PI/2),o.rotateZ(-Math.PI/2),o},Ms=({position:r})=>{const s=a.useRef();return g((t,n)=>{s.current&&(s.current.rotation.z-=n*.1,s.current.rotation.x=Math.sin(t.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:r,ref:s,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,300,32]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[400,40,32,64]}),e.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((t,n)=>e.jsxs("mesh",{position:[Math.cos(t)*200,0,Math.sin(t)*200],rotation:[0,-t,Math.PI/2],children:[e.jsx("cylinderGeometry",{args:[20,20,300,16]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},n)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((t,n)=>e.jsxs("mesh",{position:[Math.cos(t)*400,0,Math.sin(t)*400],rotation:[Math.PI/2,0,-t],children:[e.jsx("boxGeometry",{args:[60,60,90]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${n}`))]})},ws=({position:r})=>{const s=a.useRef(),t=a.useMemo(()=>Se("bulwark"),[]);return g((n,o)=>{s.current&&(s.current.position.y=Math.sin(n.clock.elapsedTime*.2)*40,s.current.rotation.y+=o*.05,s.current.rotation.z=Math.sin(n.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:r,ref:s,scale:[120,120,120],children:[e.jsx("mesh",{geometry:t,children:e.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),e.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),e.jsxs("mesh",{position:[0,0,1.5],children:[e.jsx("sphereGeometry",{args:[.2,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},Ps=({position:r})=>{const i=a.useMemo(()=>new X,[]),l=a.useMemo(()=>new X,[]),f=a.useRef(),c=a.useRef(),d=a.useRef(),u=a.useRef(),m=a.useMemo(()=>Se("interceptor"),[]),p=a.useMemo(()=>Se("viper"),[]),x=a.useMemo(()=>{const v=new Tt(.5,.5,20,4);return v.rotateX(Math.PI/2),v},[]),j=a.useMemo(()=>Array.from({length:80},(v,R)=>{const I=R>=40;return{pos:new b((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new b,target:new b,team:I?1:0,meshIndex:I?R-40:R,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),w=a.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new b,vel:new b,color:new F,life:0})),[60]),M=a.useMemo(()=>new b,[]),S=a.useMemo(()=>new b,[]),y=a.useMemo(()=>new F,[]);return g((v,R)=>{if(!f.current||!c.current||!d.current||!u.current)return;let I=0;j.forEach(h=>{if(h.state===0){if(Math.random()<.02||h.target.lengthSq()===0){const G=j[Math.floor(Math.random()*80)];G&&G.team!==h.team&&G.state===0?(h.target.copy(G.pos),h.target.x+=(Math.random()-.5)*200,h.target.y+=(Math.random()-.5)*200,h.target.z+=(Math.random()-.5)*200):h.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}M.subVectors(h.target,h.pos);const _=M.length();if(_>150&&_<800&&Math.random()<.03){const G=w.find(T=>!T.active);G&&(G.active=!0,G.pos.copy(h.pos),G.vel.copy(M).normalize().multiplyScalar(2500),G.color.set(h.team===0?"#00ffff":"#ff3300"),G.life=.8)}const k=M.normalize().multiplyScalar(400*R);h.vel.add(k),h.vel.clampLength(0,600),h.pos.addScaledVector(h.vel,R),h.trail.push(h.pos.clone()),h.trail.length>5&&h.trail.shift(),i.position.copy(h.pos);const P=i.position.clone().add(h.vel);i.lookAt(P),S.copy(k).cross(h.vel),i.rotateZ(S.y*.01),i.scale.set(30,30,30)}else{h.explosionTimer+=R,i.position.copy(h.pos),i.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const _=30*Math.max(.1,1-h.explosionTimer*2);i.scale.set(_,_,_),h.explosionTimer>.5&&(h.state=0,h.health=100,h.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),h.vel.set(0,0,0),h.trail=[])}i.updateMatrix(),h.team===0?(f.current.setMatrixAt(h.meshIndex,i.matrix),y.set(h.state===0?"#00aaff":"#ffaa00"),f.current.setColorAt(h.meshIndex,y)):(c.current.setMatrixAt(h.meshIndex,i.matrix),y.set(h.state===0?"#ff0033":"#ffaa00"),c.current.setColorAt(h.meshIndex,y)),h.trail.forEach((_,k)=>{if(I<400){i.position.copy(_),i.rotation.set(0,0,0);const P=k/5*10;i.scale.set(P,P,P),i.updateMatrix(),u.current.setMatrixAt(I,i.matrix),y.set(h.team===0?"#00ffff":"#ff5500"),u.current.setColorAt(I,y),I++}})});for(let h=I;h<400;h++)i.position.set(0,9999,0),i.scale.set(0,0,0),i.updateMatrix(),u.current.setMatrixAt(h,i.matrix);w.forEach((h,_)=>{h.active?(h.pos.addScaledVector(h.vel,R),h.life-=R,j.forEach(k=>{k.state===0&&h.pos.distanceTo(k.pos)<50&&(k.health-=50,h.active=!1,k.health<=0&&(k.state=1,k.explosionTimer=0))}),h.life<=0&&(h.active=!1),l.position.copy(h.pos),l.lookAt(l.position.clone().add(h.vel)),l.scale.set(1,1,1)):(l.position.set(0,9999,0),l.scale.set(0,0,0)),l.updateMatrix(),d.current.setMatrixAt(_,l.matrix),d.current.setColorAt(_,h.color)}),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0),d.current.instanceMatrix.needsUpdate=!0,d.current.instanceColor&&(d.current.instanceColor.needsUpdate=!0)}),e.jsxs("group",{position:r,children:[e.jsx("instancedMesh",{ref:f,args:[m,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:c,args:[p,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:d,args:[x,null,60],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:L})}),e.jsx("instancedMesh",{ref:u,args:[new Rt(1,4,4),null,400],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:L,depthWrite:!1})})]})},bs=({position:r,rotation:s,visible:t})=>{const n=J(W,"/interstellar_logo_final.png");n.colorSpace=V;const o=H(),i=a.useRef({triggered:!1});return g(()=>{o&&o.offset>=.2&&o.offset<=.22&&!i.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,i.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),e.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),e.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:E})]}),e.jsx(Ms,{position:[0,-200,-800]}),e.jsx(ws,{position:[0,-120,-100]}),e.jsx(Ps,{position:[0,-50,0]}),e.jsxs("group",{position:[0,120,200],children:[e.jsxs("mesh",{position:[0,50,0],children:[e.jsx("planeGeometry",{args:[180,180]}),e.jsx("meshBasicMaterial",{map:n,transparent:!0,depthWrite:!1})]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),e.jsx(je,{appId:"interstellar",position:[-150,100,200]})]})},zs=({position:r})=>{const s=a.useRef(),t=a.useMemo(()=>({uTime:{value:0},uColor:{value:new F("#00ffff")}}),[]);return g(n=>{s.current&&(s.current.uniforms.uTime.value=n.clock.elapsedTime)}),e.jsxs("mesh",{position:r,children:[e.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),e.jsx("shaderMaterial",{ref:s,transparent:!0,side:Y,blending:L,depthWrite:!1,uniforms:t,vertexShader:`
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
        `})]})},Ss=()=>{const r=a.useRef(),s=a.useMemo(()=>({uTime:{value:0},uColor:{value:new F("#0044ff")},uHighlight:{value:new F("#00ffff")}}),[]);return g(t=>{r.current&&(r.current.uniforms.uTime.value=t.clock.elapsedTime)}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),e.jsx("shaderMaterial",{ref:r,transparent:!0,wireframe:!0,uniforms:s,vertexShader:`
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
        `})]})},Ts=({position:r,rotation:s,visible:t})=>{const[n,o]=a.useState(null);return a.useEffect(()=>{new W().load("/cloveh2o_logo.png",l=>{l.colorSpace=V,o(l)})},[]),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:E})]}),e.jsx(Ss,{}),e.jsx(zs,{position:[0,1800,-800]}),e.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),e.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),e.jsxs("group",{position:[0,0,-300],children:[n&&e.jsxs("mesh",{position:[0,80,0],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:n,transparent:!0,depthWrite:!1,blending:L})]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},ge=({color:r,number:s,groupRef:t,armRef:n})=>e.jsxs("group",{ref:t,children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.3,roughness:.4})]}),e.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("group",{position:[0,17,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2.8,32,32]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:.8,metalness:.5})]}),e.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[e.jsx("boxGeometry",{args:[3.5,2,2]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),e.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.6})]})}),e.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:n,children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.6})]})}),e.jsxs("mesh",{position:[-1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.8})]}),e.jsxs("mesh",{position:[1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:r,roughness:.8})]}),s&&e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:s})]}),Rs=({position:r})=>{const s=a.useRef(),t=a.useRef(),n=a.useRef(),o=a.useRef(),i=a.useRef(),l=a.useRef(),f=a.useMemo(()=>new b(100,0,0),[]),c=a.useMemo(()=>new b(100,0,20),[]),d=a.useMemo(()=>new b(30,0,100),[]),u=a.useMemo(()=>new b(0,0,-20),[]),m=a.useMemo(()=>new b(20,0,220),[]),p=a.useMemo(()=>new b,[]),x=a.useMemo(()=>new b,[]);return a.useMemo(()=>new b,[]),g(j=>{const w=j.clock.elapsedTime%6;if(n.current&&n.current.rotation.set(0,0,-.3),w<.5)t.current&&t.current.position.copy(f),o.current&&o.current.position.copy(c),i.current&&i.current.position.copy(d),s.current&&s.current.position.copy(u),l.current&&l.current.position.copy(u).add(p.set(4.5,12,2));else if(w<4){const M=(w-.5)/3.5;if(t.current&&(M<.5?t.current.position.lerpVectors(f,p.set(100,0,110),M*2):t.current.position.lerpVectors(x.set(100,0,110),m,(M-.5)*2)),o.current&&t.current&&o.current.position.lerpVectors(c,p.set(m.x+8,0,m.z-8),M),i.current&&i.current.position.lerpVectors(d,p.set(m.x-8,0,m.z+8),M),l.current)if(w<1.5)l.current.position.copy(u).add(p.set(4.5,12,2));else{const S=(w-1.5)/2.5,y=Math.sin(S*Math.PI)*45;l.current.position.lerpVectors(u,m,S),l.current.position.y+=y+18}}else if(w<5)t.current&&t.current.position.lerpVectors(m,p.set(20,0,240),w-4),l.current&&t.current&&l.current.position.copy(t.current.position).add(p.set(0,12,3)),o.current&&(o.current.position.y=0),i.current&&(i.current.position.y=0);else if(w<5.5)n.current&&n.current.rotation.set(Math.PI,0,0),l.current&&t.current&&l.current.position.copy(t.current.position).add(p.set(4.5,20,0));else if(n.current&&n.current.rotation.set(-Math.PI/4,0,0),l.current&&t.current){const M=w-5.5,S=Math.abs(Math.cos(M*8))*10;l.current.position.copy(t.current.position).add(p.set(4.5,S,4))}}),e.jsxs("group",{position:r,children:[e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),e.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[e.jsx("planeGeometry",{args:[400,40]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),e.jsx(ge,{color:"#0088ff",number:"QB",groupRef:s}),e.jsx(ge,{color:"#00ffff",number:"80",groupRef:t,armRef:n}),e.jsx(ge,{color:"#ff0044",number:"CB",groupRef:o}),e.jsx(ge,{color:"#ff0044",number:"S",groupRef:i}),e.jsxs("mesh",{ref:l,children:[e.jsx("sphereGeometry",{args:[2,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},Cs=()=>e.jsxs("group",{position:[0,300,-300],rotation:[.1,0,0],children:[e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("boxGeometry",{args:[800,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[0,0,10.1],children:[e.jsx("planeGeometry",{args:[790,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-580,0,150],rotation:[0,Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-571,0,155],rotation:[0,Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[580,0,150],rotation:[0,-Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[571,0,155],rotation:[0,-Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsxs("mesh",{position:[390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsx("gridHelper",{args:[800,80,"#00ff00","#004400"],position:[0,0,11],rotation:[Math.PI/2,0,0]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,80,15],fontSize:70,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ff00",anchorX:"center",anchorY:"middle",children:"FANTASY QUANT"}),e.jsxs(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,15],fontSize:35,color:"#00ffff",outlineWidth:.01,outlineColor:"#0088ff",anchorX:"center",anchorY:"middle",children:["PREDICTING: 42 YD PASS ","->"," TOUCHDOWN"]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,15],fontSize:22,color:"#ffffff",maxWidth:750,textAlign:"center",lineHeight:1.5,anchorX:"center",anchorY:"middle",children:'"This is going to Rice, WR #80, post route contested catch in traffic over the safety and cornerback... TOUCHDOWN!!"'}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-580,40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"WIN PROB: 94%"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-580,-40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"EXPECTED PTS: +6.0"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[580,40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"DEF COVERAGE: COVER 2"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[580,-40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"MISMATCH DETECTED"})]}),ks=()=>{const s=[];for(let o=0;o<20;o++){const i=600+o*80,l=o*40-100;s.push(e.jsxs("mesh",{position:[0,l,0],rotation:[Math.PI/2,0,0],children:[e.jsx("torusGeometry",{args:[i,20,16,100,Math.PI*1.5]}),e.jsx("meshStandardMaterial",{color:"#222222",roughness:.9})]},`ring-${o}`))}const t=a.useRef(),n=1e4;return a.useEffect(()=>{if(!t.current)return;const o=new X,i=new F,l=["#ff0044","#0044ff","#ffffff","#00ff00","#ffaa00"];let f=0;for(let c=0;c<20;c++){const d=600+c*80,u=c*40-100,m=Math.floor(d*Math.PI*1.5/10);for(let p=0;p<m&&!(f>=n);p++){const x=p/m*Math.PI*1.5;o.position.set(Math.cos(x)*d,u+15,Math.sin(x)*d),o.position.x+=(Math.random()-.5)*5,o.position.z+=(Math.random()-.5)*5,o.updateMatrix(),t.current.setMatrixAt(f,o.matrix),i.set(l[Math.floor(Math.random()*l.length)]),t.current.setColorAt(f,i),f++}}t.current.instanceMatrix.needsUpdate=!0,t.current.instanceColor&&(t.current.instanceColor.needsUpdate=!0)},[]),e.jsxs("group",{rotation:[0,Math.PI*1.25,0],children:[s,e.jsxs("instancedMesh",{ref:t,args:[null,null,n],children:[e.jsx("boxGeometry",{args:[8,15,8]}),e.jsx("meshStandardMaterial",{roughness:.8})]})]})},Is=({position:r,rotation:s,visible:t})=>{const n=J(W,"/fantasy_quant_stadium.jpg");return n.colorSpace=V,n.wrapS=ie,n.repeat.set(-1,1),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[3e3,32,32]}),e.jsx("meshBasicMaterial",{map:n,side:E})]}),e.jsx(ks,{}),e.jsx(Rs,{position:[0,-120,100]}),e.jsx("ambientLight",{intensity:.5,color:"#00ff00"}),e.jsx("pointLight",{color:"#00ff00",intensity:3,distance:2e3,position:[0,500,500]}),e.jsx("pointLight",{color:"#0088ff",intensity:2,distance:2e3,position:[0,500,-500]}),e.jsx(Cs,{})]})},Gs=()=>{const r=a.useRef(),s=a.useMemo(()=>Array.from({length:150}).map(()=>({x:(Math.random()-.5)*400,y:(Math.random()-.5)*400,z:Math.random()*2e3,speed:10+Math.random()*20})),[]);return g(()=>{r.current&&r.current.children.forEach((t,n)=>{t.position.z+=s[n].speed,t.position.z>500&&(t.position.z-=2e3)})}),e.jsx("group",{ref:r,children:s.map((t,n)=>e.jsxs("mesh",{position:[t.x,t.y,t.z],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[.2,.2,100,4]}),e.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.3})]},n))})},Ls=({worldPosition:r})=>{const s=a.useRef(),t=J(W,"/assets/images/contango_quant_logo_new.png");return g(n=>{if(s.current){const i=n.camera.position.clone().sub(new b(...r));s.current.position.copy(i),s.current.rotation.copy(n.camera.rotation)}}),e.jsxs("group",{ref:s,children:[e.jsxs("group",{position:[0,-15,0],children:[e.jsxs("mesh",{position:[0,-2,-15],rotation:[.2,0,0],children:[e.jsx("boxGeometry",{args:[40,5,2]}),e.jsx("meshStandardMaterial",{color:"#111",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-20,2,-10],rotation:[0,Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[20,2,-10],rotation:[0,-Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[0,-5,10],children:[e.jsx("boxGeometry",{args:[38,20,2]}),e.jsx("meshStandardMaterial",{color:"#0a0a0a",roughness:.8})]})]}),e.jsxs("group",{position:[0,5,-50],children:[e.jsxs("mesh",{position:[0,15,0],children:[e.jsx("planeGeometry",{args:[40,20]}),e.jsx("meshBasicMaterial",{map:t,transparent:!0,opacity:.9,depthWrite:!1})]}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-2,0],fontSize:6,color:"#ffffff",anchorX:"center",outlineWidth:.05,outlineColor:"#000000",children:"CONTANGO QUANT"}),e.jsx(C,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-9,0],fontSize:3,color:"#ffffff",anchorX:"center",opacity:.9,transparent:!0,children:"Quant Trading Systems"})]})]})},_s=({worldPosition:r})=>{const s=a.useRef(),t=a.useMemo(()=>Array.from({length:800}).map(()=>{const n=Math.random()>.5,o=20+Math.random()*80,i=o+Math.random()*40,l=Math.random()*Math.PI*2,f=60+Math.random()*200;return{x:Math.cos(l)*f,y:Math.sin(l)*f,z:(Math.random()-.5)*12e3,isGreen:n,height:o,wickHeight:i,speed:15+Math.random()*25}}),[]);return g(n=>{if(s.current){const i=n.camera.position.clone().sub(new b(...r));s.current.position.copy(i),s.current.children.forEach((l,f)=>{l.position.z+=t[f].speed,l.position.z>2e3&&(l.position.z-=12e3)})}}),e.jsx("group",{ref:s,children:t.map((n,o)=>e.jsxs("group",{position:[n.x,n.y,n.z],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[1,1,n.wickHeight,4]}),e.jsx("meshStandardMaterial",{color:n.isGreen?"#00ff00":"#ff0044",emissive:n.isGreen?"#00ff00":"#ff0044",emissiveIntensity:2})]}),e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[8,n.height,8]}),e.jsx("meshStandardMaterial",{color:n.isGreen?"#00ff00":"#ff0044",transparent:!0,opacity:.9,emissive:n.isGreen?"#00aa00":"#aa0022",emissiveIntensity:.8})]})]},o))})},Es=({position:r,rotation:s,visible:t})=>{const n=H(),[o,i]=a.useState(!1);return g(()=>{t&&(n.offset>.465&&n.offset<.475&&!o&&!window.contangoLocked&&(window.contangoLocked=!0,i(!0),setTimeout(()=>{window.contangoLocked=!1},4e3)),(n.offset<.45||n.offset>.49)&&o&&(i(!1),window.contangoLocked=!1))}),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000205",side:E})]}),e.jsx(Gs,{}),t&&e.jsx(_s,{worldPosition:r}),t&&e.jsx(Ls,{worldPosition:r}),e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[0,50,-100],intensity:2,color:"#00ffcc",distance:500})]})},As=({position:r,rotation:s,visible:t})=>{const n=a.useRef(),o=a.useRef(),i=J(W,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return g(l=>{n.current&&(n.current.position.y=Math.sin(l.clock.elapsedTime*1.5)*5),o.current&&(o.current.rotation.y+=.005,o.current.rotation.z+=.002)}),e.jsxs("group",{visible:t,position:r,rotation:s,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1500,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:E})]}),e.jsxs("group",{children:[e.jsx(Qe,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:e.jsxs("mesh",{ref:n,position:[0,0,-500],children:[e.jsx("planeGeometry",{args:[400,100]})," ",e.jsx("meshBasicMaterial",{map:i,transparent:!0,opacity:1,side:Y,depthWrite:!1})]})}),e.jsx(se,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),e.jsx(se,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),e.jsx("ambientLight",{intensity:.5,color:"#002244"}),e.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},Fs=`
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  
  // Classic Perlin 3D Noise
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float cnoise(vec3 P){
    vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x); vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy); vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0); vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1); vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
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
    vec3 fade_xyz = Pf0 * Pf0 * (vec3(3.0) - 2.0 * Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    // Massive mountain displacement
    float noise = cnoise(vec3(pos.x * 0.002, pos.y * 0.002, 0.0)) * 600.0;
    // Sharp peaks
    noise += cnoise(vec3(pos.x * 0.01, pos.y * 0.01, 0.0)) * 200.0;
    // Base mask
    float dist = distance(uv, vec2(0.5));
    float mask = smoothstep(0.5, 0.1, dist);
    
    pos.z += noise * mask;
    vElevation = pos.z;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,Ws=`
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    // Snowy peaks vs dark rocky base
    vec3 rockColor = vec3(0.02, 0.03, 0.05);
    vec3 snowColor = vec3(0.9, 0.95, 1.0);
    
    float snowMix = smoothstep(50.0, 300.0, vElevation);
    vec3 finalColor = mix(rockColor, snowColor, snowMix);
    
    // Fade out edges
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.5, 0.3, dist);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;function Bs({position:r,visible:s}){const t=a.useRef();return g(n=>{if(!s)return;const o=n.clock.getElapsedTime();t.current&&(t.current.position.x=Math.sin(o*3)*100,t.current.position.y=Math.cos(o*1.5)*50-50,t.current.rotation.y=Math.sin(o*3)*.5,t.current.rotation.x=Math.sin(o*1.5)*.2)}),s?e.jsxs("group",{position:r,children:[e.jsx("directionalLight",{position:[1e3,2e3,1e3],intensity:3,color:"#ffffff",castShadow:!0}),e.jsx("ambientLight",{intensity:.2,color:"#88bbff"}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-800,-2e3],children:[e.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),e.jsx("shaderMaterial",{vertexShader:Fs,fragmentShader:Ws,transparent:!0,wireframe:!1})]}),e.jsxs("mesh",{position:[0,-300,-400],rotation:[-Math.PI/2+.3,0,0],children:[e.jsx("planeGeometry",{args:[2e3,2e3,32,32]}),e.jsx("meshStandardMaterial",{color:"#ffffff",roughness:.8,metalness:.1})]}),e.jsx(se,{count:8e3,scale:2e3,size:20,speed:4,opacity:.5,color:"#ffffff",position:[0,0,0]}),e.jsxs("group",{position:[300,200,-1200],rotation:[0,-.5,0],children:[e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[100,40,250]}),e.jsx("meshStandardMaterial",{color:"#222222",metalness:.9,roughness:.1})]}),e.jsx("pointLight",{color:"#ff0000",intensity:20,distance:500,position:[0,-20,0]})]}),e.jsxs("group",{ref:t,position:[0,-200,-500],children:[e.jsxs("mesh",{position:[0,-5,0],rotation:[0,Math.PI/2,Math.PI/16],children:[e.jsx("boxGeometry",{args:[160,5,30]}),e.jsx("meshStandardMaterial",{color:"#111111",emissive:"#000000",metalness:.8,roughness:.2})]}),e.jsxs("group",{position:[0,-10,0],rotation:[0,Math.PI/2,0],children:[e.jsxs("mesh",{position:[0,30,10],rotation:[Math.PI/4,0,0],children:[e.jsx("boxGeometry",{args:[25,40,15]}),e.jsx("meshStandardMaterial",{color:"#ff4400",roughness:.8})]}),e.jsxs("mesh",{position:[0,60,35],rotation:[-Math.PI/8,0,0],children:[e.jsx("boxGeometry",{args:[18,20,20]}),e.jsx("meshStandardMaterial",{color:"#111111",metalness:.8,roughness:.2})," "]}),e.jsxs("mesh",{position:[0,60,46],children:[e.jsx("boxGeometry",{args:[16,8,2]}),e.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ff4400"})," "]}),e.jsx("group",{position:[0,0,40],children:e.jsxs("mesh",{position:[0,15,0],rotation:[-Math.PI/6,0,0],children:[e.jsx("boxGeometry",{args:[15,30,15]}),e.jsx("meshStandardMaterial",{color:"#222222",roughness:.9})]})}),e.jsx("group",{position:[0,0,-30],children:e.jsxs("mesh",{position:[0,15,0],rotation:[Math.PI/6,0,0],children:[e.jsx("boxGeometry",{args:[15,30,15]}),e.jsx("meshStandardMaterial",{color:"#222222",roughness:.9})]})}),e.jsxs("mesh",{position:[-18,30,20],rotation:[Math.PI/3,0,-Math.PI/4],children:[e.jsx("boxGeometry",{args:[8,35,8]}),e.jsx("meshStandardMaterial",{color:"#cc3300",roughness:.8})]}),e.jsxs("mesh",{position:[18,20,0],rotation:[-Math.PI/4,0,Math.PI/4],children:[e.jsx("boxGeometry",{args:[8,35,8]}),e.jsx("meshStandardMaterial",{color:"#cc3300",roughness:.8})]})]}),e.jsx(se,{count:1e3,scale:[200,50,300],size:25,speed:1.5,opacity:1,color:"#ffffff",position:[0,-25,150]})]})]}):null}function Us({position:r,visible:s}){const t=a.useRef(),n=a.useRef();return g(o=>{if(!s)return;const i=o.clock.getElapsedTime();t.current&&(t.current.rotation.y=i*.05),n.current&&(n.current.rotation.y=i*.2)}),s?e.jsxs("group",{position:r,children:[e.jsx("ambientLight",{intensity:.1,color:"#001133"}),e.jsx("directionalLight",{position:[-500,200,500],intensity:2,color:"#ccddff"}),e.jsxs("mesh",{ref:t,position:[0,-2500,-4e3],children:[e.jsx("sphereGeometry",{args:[2e3,64,64]}),e.jsx("meshStandardMaterial",{color:"#001122",roughness:.8,metalness:.2,wireframe:!0}),e.jsx("pointLight",{position:[0,2100,0],intensity:5,distance:4e3,color:"#0055ff"})]}),e.jsxs("group",{position:[0,-50,-800],children:[e.jsxs("group",{rotation:[0,-Math.PI/8,0],children:[e.jsxs("mesh",{position:[0,-25,0],children:[e.jsx("boxGeometry",{args:[100,50,180]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]}),e.jsxs("mesh",{position:[-30,-40,100],children:[e.jsx("boxGeometry",{args:[30,20,60]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]}),e.jsxs("mesh",{position:[30,-40,100],children:[e.jsx("boxGeometry",{args:[30,20,60]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]}),e.jsxs("mesh",{position:[0,40,70],children:[e.jsx("sphereGeometry",{args:[40,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]}),e.jsxs("mesh",{position:[0,40,60],rotation:[.2,0,0],children:[e.jsx("boxGeometry",{args:[110,80,40]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]}),e.jsx("pointLight",{position:[0,0,0],intensity:10,color:"#ffaa00",distance:500}),e.jsxs("mesh",{position:[0,-200,0],children:[e.jsx("coneGeometry",{args:[200,400,16]}),e.jsx("meshBasicMaterial",{color:"#ffaa00",transparent:!0,opacity:.1,blending:L,depthWrite:!1})]})]})]}):null}function Hs({position:r,visible:s}){const t=a.useRef(),n=2e3,o=a.useMemo(()=>new X,[]);return g(i=>{if(!s||!t.current)return;const l=i.clock.getElapsedTime();for(let f=0;f<n;f++){const c=f%40,d=Math.floor(f/40),u=(c-20)*15,p=-400+(d*15+l*200)%800;let x=300;p>0&&(x=300-Math.pow(p*.1,2)),x<-200&&(x=-200+Math.abs(Math.sin(l*10+f)*20)),o.position.set(u,x,p),o.rotation.x=l*2+f,o.rotation.y=l*3+f,o.updateMatrix(),t.current.setMatrixAt(f,o.matrix)}t.current.instanceMatrix.needsUpdate=!0}),s?e.jsxs("group",{position:r,children:[e.jsx("ambientLight",{intensity:.2,color:"#111111"}),e.jsx("spotLight",{position:[0,800,-200],angle:.5,penumbra:.5,intensity:5,color:"#ffdd77",castShadow:!0}),e.jsxs("mesh",{position:[0,-250,0],children:[e.jsx("boxGeometry",{args:[1e3,100,1e3]}),e.jsx("meshStandardMaterial",{color:"#222",roughness:.7,metalness:.8})]}),e.jsxs("mesh",{position:[0,100,-450],children:[e.jsx("boxGeometry",{args:[800,800,100]}),e.jsx("meshStandardMaterial",{color:"#111",roughness:.8,metalness:.9})]}),e.jsxs("instancedMesh",{ref:t,args:[null,null,n],children:[e.jsx("cylinderGeometry",{args:[5,5,2,16]}),e.jsx("meshStandardMaterial",{color:"#ffd700",metalness:1,roughness:.2,emissive:"#554400"})]})]}):null}function Os({position:r,visible:s}){const t=a.useRef();return g(n=>{if(!s)return;const o=n.clock.getElapsedTime();t.current&&(t.current.position.y=Math.sin(o*1.5)*2,t.current.rotation.y=Math.sin(o*.5)*.1)}),s?e.jsxs("group",{position:r,children:[e.jsx("ambientLight",{intensity:.4,color:"#ff9955"}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ff7722"}),e.jsx("directionalLight",{position:[-1e3,300,-500],intensity:1.5,color:"#4488ff"}),e.jsx(se,{count:1e3,scale:1500,size:15,speed:.2,opacity:.6,color:"#ffddaa",position:[0,100,-500]}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[4e3,4e3]}),e.jsx("meshStandardMaterial",{color:"#050a11",roughness:.1,metalness:.9,transparent:!0,opacity:.9})]}),e.jsxs("group",{position:[0,100,-800],children:[e.jsxs("group",{ref:t,children:[e.jsxs("mesh",{rotation:[Math.PI/4,0,0],children:[e.jsx("torusGeometry",{args:[300,2,32,128]}),e.jsx("meshStandardMaterial",{color:"#ffccaa",emissive:"#ff8833",emissiveIntensity:1.5})]}),e.jsxs("mesh",{rotation:[-Math.PI/4,Math.PI/2,0],children:[e.jsx("torusGeometry",{args:[250,4,32,128]}),e.jsx("meshStandardMaterial",{color:"#ffccaa",emissive:"#ffaa55",emissiveIntensity:2})]}),e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[80,64,64]}),e.jsx("meshStandardMaterial",{color:"#ffffff",emissive:"#ffddaa",emissiveIntensity:3})]}),e.jsx("pointLight",{intensity:10,distance:1500,color:"#ff9944"})]}),e.jsxs("group",{position:[0,-250,200],children:[e.jsxs("mesh",{position:[-150,0,0],children:[e.jsx("cylinderGeometry",{args:[50,40,10,64]}),e.jsx("meshStandardMaterial",{color:"#111111",metalness:.8,roughness:.2,emissive:"#221100"})]}),e.jsxs("mesh",{position:[150,0,0],children:[e.jsx("cylinderGeometry",{args:[50,40,10,64]}),e.jsx("meshStandardMaterial",{color:"#111111",metalness:.8,roughness:.2,emissive:"#221100"})]}),e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("boxGeometry",{args:[200,5,40]}),e.jsx("meshStandardMaterial",{color:"#111111",metalness:.8,roughness:.2})]})]}),e.jsxs("mesh",{position:[0,-290,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[400,64]}),e.jsx("meshBasicMaterial",{color:"#ffaa55",transparent:!0,opacity:.1})]})]})]}):null}const Vs=`
  varying vec3 vColor;
  uniform float uTime;
  
  void main() {
    vec3 pos = position;
    // Organic pulsing
    float pulse = sin(uTime * 2.0 + pos.y * 0.05) * 5.0;
    pos.x += pulse * normalize(pos).x;
    pos.z += pulse * normalize(pos).z;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation
    gl_PointSize = (100.0 / -mvPosition.z);
    
    // Neural gold/orange glowing colors based on height
    float h = (pos.y + 100.0) / 200.0;
    vColor = mix(vec3(1.0, 0.4, 0.0), vec3(1.0, 0.8, 0.2), h);
  }
`,Ds=`
  varying vec3 vColor;
  
  void main() {
    // Soft circular particle
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    if(ll > 0.5) discard;
    
    // Core glow
    float alpha = (0.5 - ll) * 2.0;
    gl_FragColor = vec4(vColor, alpha * 0.8);
  }
`;function Ns({position:r,visible:s}){const t=a.useRef(),n=a.useMemo(()=>{const o=new It,i=1e4,l=new Float32Array(i*3);for(let f=0;f<i;f++){const c=f/i,d=c*Math.PI*100,u=100*Math.sin(c*Math.PI);let m=u*Math.cos(d),p=u*Math.cos(c*Math.PI)*.8,x=u*Math.sin(d);m+=(Math.random()-.5)*20,p+=(Math.random()-.5)*20,x+=(Math.random()-.5)*20,m>0?m+=10:m-=10,l[f*3]=m,l[f*3+1]=p,l[f*3+2]=x}return o.setAttribute("position",new Gt(l,3)),o},[]);return g(o=>{if(!s)return;const i=o.clock.getElapsedTime();t.current&&(t.current.rotation.y=i*.2,t.current.material.uniforms.uTime.value=i)}),s?e.jsxs("group",{position:r,children:[e.jsx("ambientLight",{intensity:.1}),e.jsx("pointLight",{position:[0,0,0],intensity:10,color:"#ffaa00",distance:1e3}),e.jsxs("mesh",{position:[0,-200,0],children:[e.jsx("coneGeometry",{args:[500,800,4]}),e.jsx("meshStandardMaterial",{color:"#050505",roughness:.9,metalness:.1,side:E})]}),e.jsx("points",{ref:t,geometry:n,position:[0,100,0],children:e.jsx("shaderMaterial",{vertexShader:Vs,fragmentShader:Ds,transparent:!0,depthWrite:!1,blending:L,uniforms:{uTime:{value:0}}})})]}):null}function Ys({position:r,visible:s}){const t=a.useRef(),n=a.useRef(),o=400,i=5e3,l=a.useMemo(()=>new X,[]);return g(f=>{if(!s)return;const c=f.clock.getElapsedTime();if(t.current){for(let d=0;d<o;d++){const u=d%20-10,m=Math.floor(d/20),p=u*80,j=-1e3+(m*100+c*400)%2e3;l.position.set(p,-100,j),l.updateMatrix(),t.current.setMatrixAt(d,l.matrix)}t.current.instanceMatrix.needsUpdate=!0}if(n.current){for(let d=0;d<i;d++){const u=Math.sin(d*123)*1e3,m=Math.cos(d*321)*1e3-500,x=800+(d*10-c*800)%1500;l.position.set(u,x,m),l.scale.set(1,Math.random()*5+1,1),l.updateMatrix(),n.current.setMatrixAt(d,l.matrix)}n.current.instanceMatrix.needsUpdate=!0}}),s?e.jsxs("group",{position:r,children:[e.jsx("ambientLight",{intensity:.3,color:"#004400"}),e.jsx("directionalLight",{position:[0,1e3,500],intensity:1.5,color:"#00ff44"}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[4e3,4e3]}),e.jsx("meshStandardMaterial",{color:"#021102",roughness:.1,metalness:.9,wireframe:!0})]}),e.jsxs("group",{position:[0,200,-800],children:[e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[300,1e3,300]}),e.jsx("meshStandardMaterial",{color:"#002200",metalness:.8,roughness:.2,emissive:"#004411"})]}),e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[320,950,320]}),e.jsx("meshBasicMaterial",{color:"#00ff44",wireframe:!0,transparent:!0,opacity:.3})]}),e.jsx("pointLight",{position:[0,0,400],intensity:20,distance:2e3,color:"#00ff44"})]}),e.jsxs("instancedMesh",{ref:t,args:[null,null,o],children:[e.jsx("boxGeometry",{args:[40,30,20]}),e.jsx("meshStandardMaterial",{color:"#001100",roughness:.8,emissive:"#002200"})]}),e.jsxs("instancedMesh",{ref:n,args:[null,null,i],children:[e.jsx("boxGeometry",{args:[2,20,2]}),e.jsx("meshBasicMaterial",{color:"#00ff44",transparent:!0,opacity:.8,blending:L})]})]}):null}function qs({position:r,visible:s}){const t=a.useRef(),n=a.useRef(),o=a.useRef(),i=1e3,l=50,f=a.useMemo(()=>new X,[]);return g(c=>{if(!s)return;const d=c.clock.getElapsedTime();if(n.current&&(n.current.position.x=Math.sin(d*3)*100,n.current.position.y=Math.cos(d*2)*50,n.current.rotation.z=Math.sin(d*3)*-.5),t.current){for(let u=0;u<i;u++){const m=u/i*Math.PI*2,p=300+Math.sin(u*100)*100,x=Math.cos(m)*p,j=Math.sin(m)*p,M=(u*10+d*4e3)%4e3-2e3;f.position.set(x,j,M),f.scale.set(1,1,Math.random()*50+10),f.updateMatrix(),t.current.setMatrixAt(u,f.matrix)}t.current.instanceMatrix.needsUpdate=!0}if(o.current){for(let u=0;u<l;u++){const m=Math.sin(u*77)*200,p=Math.cos(u*33)*200,x=(u*100+d*3e3)%4e3-2e3;f.position.set(m,p,x),f.rotation.x=d*2+u,f.rotation.y=d*3+u,f.scale.setScalar(Math.sin(d*10+u)*.5+1),f.updateMatrix(),o.current.setMatrixAt(u,f.matrix)}o.current.instanceMatrix.needsUpdate=!0}}),s?e.jsxs("group",{position:r,children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("directionalLight",{position:[0,0,1e3],intensity:2,color:"#00aaff"}),e.jsxs("group",{ref:n,position:[0,0,-200],children:[e.jsxs("mesh",{children:[e.jsx("coneGeometry",{args:[20,100,4]}),e.jsx("meshStandardMaterial",{color:"#eeeeee",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[0,-50,0],children:[e.jsx("sphereGeometry",{args:[15,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.8,blending:L})]}),e.jsx("pointLight",{position:[0,-60,0],intensity:10,color:"#00ffff",distance:500})]}),e.jsxs("instancedMesh",{ref:o,args:[null,null,l],children:[e.jsx("icosahedronGeometry",{args:[20,0]}),e.jsx("meshStandardMaterial",{color:"#ff0000",emissive:"#aa0000",wireframe:!0})]}),e.jsxs("instancedMesh",{ref:t,args:[null,null,i],children:[e.jsx("cylinderGeometry",{args:[2,2,1,4]}),e.jsx("meshBasicMaterial",{color:"#0088ff",transparent:!0,opacity:.4,blending:L})]})]}):null}const Zs=({position:r,name:s,color:t,startP:n,targetP:o,endP:i,scrollEl:l})=>{const f=a.useRef(),[c,d]=a.useState(!1);g(p=>{const x=p.clock.getElapsedTime();if(f.current){f.current.rotation.y+=.01,f.current.position.y=r[1]+Math.sin(x*2+r[0])*5;const j=c?1.5:1;f.current.scale.lerp(new b(j,j,j),.1)}});const u=p=>{if(p.stopPropagation(),l){l.style.overflow="hidden",window._cancelWarp=!1,window._warpProgress=n,window._snapCamera=!0;const x=o-n,j=2e3,w=performance.now(),M=S=>{if(window._cancelWarp)return;const y=S-w,v=Math.min(y/j,1),R=v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2;window._warpProgress=n+x*R,v<1?requestAnimationFrame(M):setTimeout(()=>{if(window._cancelWarp)return;const I=i-o,h=4e3,_=performance.now(),k=P=>{if(window._cancelWarp)return;const G=P-_,T=Math.min(G/h,1),Me=T<.5?2*T*T:1-Math.pow(-2*T+2,2)/2;window._warpProgress=o+I*Me,T<1&&requestAnimationFrame(k)};requestAnimationFrame(k)},1500)};requestAnimationFrame(M)}},m=()=>{switch(s){case"MAYA":return e.jsxs("group",{scale:.5,children:[e.jsxs("mesh",{position:[0,-10,0],children:[e.jsx("coneGeometry",{args:[30,40,4]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]}),e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("sphereGeometry",{args:[5,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t})]})]});case"Sphinx":return e.jsxs("group",{scale:.8,children:[e.jsxs("mesh",{position:[0,-5,0],children:[e.jsx("boxGeometry",{args:[30,10,40]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]}),e.jsxs("mesh",{position:[0,5,10],children:[e.jsx("sphereGeometry",{args:[10,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t})]})]});case"PyRAmid":return e.jsxs("group",{scale:.7,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[0,30,40,4]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]}),e.jsxs("mesh",{position:[0,-5,0],children:[e.jsx("sphereGeometry",{args:[5,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:2})]})]});case"Helu":return e.jsxs("group",{scale:.8,children:[e.jsxs("mesh",{position:[0,-10,0],children:[e.jsx("cylinderGeometry",{args:[20,20,2,32]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]}),e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("sphereGeometry",{args:[6,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t})]}),e.jsxs("mesh",{position:[-12,-5,0],children:[e.jsx("boxGeometry",{args:[10,10,10]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!0})]}),e.jsxs("mesh",{position:[12,-5,0],children:[e.jsx("boxGeometry",{args:[10,10,10]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!0})]})]});case"Matrix":return e.jsxs("group",{scale:.6,children:[e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[30,40,30]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]}),e.jsxs("mesh",{scale:.8,children:[e.jsx("boxGeometry",{args:[30,40,30]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:.5})]})]});case"Liquid":return e.jsxs("group",{children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[15,32,32]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]}),e.jsxs("mesh",{scale:.7,children:[e.jsx("sphereGeometry",{args:[15,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:.5})]})]});case"LightSpeed":return e.jsxs("group",{children:[e.jsxs("mesh",{rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[15,15,40,16]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]}),e.jsxs("mesh",{children:[e.jsx("octahedronGeometry",{args:[5]}),e.jsx("meshStandardMaterial",{color:"#ffffff",emissive:"#ffffff",emissiveIntensity:2})]})]});case"MindWave":return e.jsx("group",{scale:.8,children:e.jsxs("mesh",{children:[e.jsx("icosahedronGeometry",{args:[20,1]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]})});case"Interstellar":return e.jsx("group",{scale:.5,children:e.jsxs("mesh",{children:[e.jsx("torusKnotGeometry",{args:[15,5,100,16]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]})});case"Legal Eagle":return e.jsx("group",{scale:.8,children:e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[20,30,20]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]})});case"Autopilot":return e.jsx("group",{scale:.6,children:e.jsxs("mesh",{rotation:[Math.PI/2,0,0],children:[e.jsx("coneGeometry",{args:[15,40,3]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]})});case"CloveH2O":return e.jsxs("group",{scale:.8,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[20,16,16]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000",transparent:!0,opacity:.5})]}),e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[10,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t})]})]});case"FantasyQuant":return e.jsx("group",{scale:.8,children:e.jsxs("mesh",{rotation:[Math.PI/4,0,0],children:[e.jsx("cylinderGeometry",{args:[10,10,40,16]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]})});case"Contango":return e.jsx("group",{scale:.8,children:e.jsxs("mesh",{children:[e.jsx("dodecahedronGeometry",{args:[20,0]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]})});case"Sentaient":return e.jsxs("group",{scale:.6,children:[e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[20,5,16,32]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!c,emissive:c?t:"#000"})]}),e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[10,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t})]})]});default:return e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[15,16,16]}),e.jsx("meshStandardMaterial",{color:t,wireframe:!0})]})}};return e.jsxs("group",{position:r,children:[e.jsxs("group",{ref:f,children:[e.jsxs("mesh",{position:[0,-20,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("ringGeometry",{args:[15,25,32]}),e.jsx("meshBasicMaterial",{color:t,side:Y,transparent:!0,opacity:c?.8:.4})]}),e.jsxs("group",{onPointerOver:()=>{d(!0),document.body.style.cursor="pointer"},onPointerOut:()=>{d(!1),document.body.style.cursor="auto"},onClick:u,children:[m(),e.jsxs("mesh",{visible:!1,children:[e.jsx("sphereGeometry",{args:[25,16,16]}),e.jsx("meshBasicMaterial",{})]})]})]}),e.jsx(Nt,{position:[0,-45,0],center:!0,children:e.jsx("div",{style:{color:"white",fontFamily:"sans-serif",fontSize:"14px",fontWeight:"bold",textTransform:"uppercase",textShadow:"0px 2px 10px rgba(0,0,0,0.8)",pointerEvents:"none",opacity:c?1:.5,transition:"opacity 0.2s"},children:s})})]})};function st(){const r=H(),s=a.useRef(),t=[{name:"MindWave",startP:.13,p:.145,endP:.15,color:"#ff3366"},{name:"Interstellar",startP:.16,p:.21,endP:.22,color:"#aa55ff"},{name:"Legal Eagle",startP:.23,p:.255,endP:.265,color:"#d4af37"},{name:"Autopilot",startP:.275,p:.3,endP:.31,color:"#00ffff"},{name:"CloveH2O",startP:.32,p:.36,endP:.37,color:"#ff00ff"},{name:"FantasyQuant",startP:.37,p:.42,endP:.43,color:"#00ffaa"},{name:"Contango",startP:.44,p:.47,endP:.475,color:"#ff8800"},{name:"Sentaient",startP:.485,p:.5,endP:.51,color:"#ffffff"},{name:"MAYA",startP:.52,p:.54,endP:.56,color:"#aaddff"},{name:"Sphinx",startP:.58,p:.6,endP:.62,color:"#ffcc00"},{name:"Liquid",startP:.64,p:.66,endP:.68,color:"#ffaa00"},{name:"Helu",startP:.7,p:.72,endP:.75,color:"#ff66aa"},{name:"PyRAmid",startP:.77,p:.79,endP:.82,color:"#aa33ff"},{name:"Matrix",startP:.84,p:.86,endP:.89,color:"#00ff44"},{name:"LightSpeed",startP:.91,p:.93,endP:.99,color:"#0088ff"}];return g(()=>{s.current&&(s.current.visible=r.offset<.05)}),e.jsxs("group",{ref:s,position:[0,-20,-300],children:[e.jsx("pointLight",{position:[0,0,100],intensity:2,color:"#ffffff"}),t.map((n,o)=>{const i=o/(t.length-1)*(Math.PI*1.6)-Math.PI*.8,f=Math.sin(i)*500,c=-Math.cos(i)*300+150,d=Math.abs(Math.sin(i))*50;return e.jsx(Zs,{name:n.name,color:n.color,startP:n.startP,targetP:n.p,endP:n.endP,position:[f,d,c],scrollEl:r.el},n.name)})]})}const Xs=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,$s=`
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
`,Qs=({startZ:r=10,endZ:s=-500,visible:t=!0})=>{const n=a.useRef(),o=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);g(l=>{n.current&&t&&(n.current.uniforms.uTime.value=l.clock.elapsedTime,n.current.uniforms.uOpacity.value=U.lerp(n.current.uniforms.uOpacity.value,t?1:0,.05))});const i=a.useMemo(()=>{const l=[],c=r-s;for(let d=0;d<=100;d++){const u=r-d/100*c;l.push(new b(Math.sin(d*.1)*2,Math.cos(d*.05)*2,u))}return new Lt(l)},[r,s]);return e.jsxs("mesh",{visible:t,children:[e.jsx("tubeGeometry",{args:[i,200,15,32,!1]}),e.jsx("shaderMaterial",{ref:n,vertexShader:Xs,fragmentShader:$s,uniforms:o,side:E,transparent:!0,blending:L})]})},Ks=`
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
`,Js=`
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
`,er=({position:r,rotation:s=[0,0,0],length:t=4e3,visible:n=!0})=>{const o=a.useRef(),i=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:t}}),[t]);return g(l=>{o.current&&(o.current.uniforms.uTime.value=l.clock.elapsedTime,o.current.uniforms.uOpacity.value=n?1:0)}),e.jsx("group",{position:r,rotation:s,visible:n,children:e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[120,120,t+200,32,64,!0]}),e.jsx("shaderMaterial",{ref:o,vertexShader:Ks,fragmentShader:Js,uniforms:i,transparent:!0,side:E,wireframe:!1})]})})},D=({position:r,rotation:s,length:t=4e3,radius:n=200,color:o="#ffffff",speed:i=20,visible:l=!0})=>{const f=a.useRef(),c=a.useMemo(()=>({uTime:{value:0},uColor:{value:new F(o)}}),[o]);return g(d=>{f.current&&(f.current.uniforms.uTime.value=d.clock.elapsedTime)}),e.jsxs("mesh",{visible:l,position:r,rotation:s,children:[e.jsx("cylinderGeometry",{args:[n,n,t,32,1,!0]}),e.jsx("shaderMaterial",{ref:f,transparent:!0,side:E,blending:L,depthWrite:!1,uniforms:c,vertexShader:`
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
        `})]})},tr=()=>{const r=[],s=(t,n,o)=>{r.push({x:t,y:n,z:0,rot:[Math.PI/2,0,0],color:o,bodyHeight:40+Math.random()*40})};for(let t=Math.PI*.25;t<Math.PI*1.75;t+=.2)s(-100+Math.cos(t)*80,Math.sin(t)*80,"#00ff00");for(let t=0;t<Math.PI*2;t+=.2)s(100+Math.cos(t)*80,Math.sin(t)*80,"#ff0044");return s(140,-40,"#ff0044"),s(160,-60,"#ff0044"),s(180,-80,"#ff0044"),r},sr=({position:r,rotation:s=[0,0,0],length:t=6e3,radius:n=250,visible:o})=>{const i=a.useRef(),l=a.useRef(),f=a.useRef(),c=J(W,"/assets/images/contango_logo.png"),d=a.useMemo(()=>{const x=[],j=Math.floor(t/5);for(let M=0;M<j;M++){const S=-(M/j)*t,y=M*.1,v=Math.cos(y)*n,R=Math.sin(y)*n,I=Math.cos(y+Math.PI)*n,h=Math.sin(y+Math.PI)*n,k=Math.random()>.5?"#00ff00":"#ff0044",P=20+Math.random()*60,G=[0,0,y+Math.PI/2],T=[0,0,y+Math.PI+Math.PI/2];x.push({x:v,y:R,z:S,rot:G,color:k,bodyHeight:P}),x.push({x:I,y:h,z:S,rot:T,color:k,bodyHeight:P})}return tr().forEach(M=>{x.push({x:M.x,y:M.y,z:-t-500,rot:M.rot,color:M.color,bodyHeight:M.bodyHeight})}),x},[t,n]),u=a.useMemo(()=>new X,[]),m=a.useMemo(()=>new F,[]),p=d.length;return a.useEffect(()=>{if(!(!l.current||!f.current)){for(let x=0;x<p;x++){const j=d[x];u.position.set(j.x,j.y,j.z),u.rotation.set(j.rot[0],j.rot[1],j.rot[2]),u.scale.set(1,j.bodyHeight+40,1),u.updateMatrix(),l.current.setMatrixAt(x,u.matrix),m.set(j.color),l.current.setColorAt(x,m),u.scale.set(1,j.bodyHeight,1),u.updateMatrix(),f.current.setMatrixAt(x,u.matrix),f.current.setColorAt(x,m)}l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0)}},[d,p]),g(x=>{i.current&&o&&(i.current.rotation.z=x.clock.elapsedTime*.5)}),e.jsxs("group",{position:r,rotation:s,visible:o,children:[e.jsxs("group",{ref:i,children:[e.jsxs("instancedMesh",{ref:l,args:[null,null,p],children:[e.jsx("cylinderGeometry",{args:[2,2,1,8]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),e.jsxs("instancedMesh",{ref:f,args:[null,null,p],children:[e.jsx("boxGeometry",{args:[10,1,10]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),e.jsxs("mesh",{position:[0,0,-t-500],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0})]}),e.jsxs("mesh",{position:[0,0,-t/2],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[n*.8,n*.8,t,32,1,!0]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:E})]})]})},rr=({position:r,rotation:s,length:t=8e3,visible:n=!0})=>{const o=a.useRef(),i=a.useRef();g(f=>{if(!n||!o.current)return;const c=f.clock.getElapsedTime();o.current.map.offset.y=-c*3,i.current&&(i.current.rotation.y=c*2)});const l=Ye.useMemo(()=>{const f=document.createElement("canvas");f.width=512,f.height=512;const c=f.getContext("2d"),d=c.createLinearGradient(0,0,0,512);d.addColorStop(0,"#001a33"),d.addColorStop(.5,"#00ccff"),d.addColorStop(1,"#001a33"),c.fillStyle=d,c.fillRect(0,0,512,512),c.fillStyle="#ffffff";for(let m=0;m<200;m++)c.globalAlpha=Math.random()*.5,c.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const u=new $e(f);return u.wrapS=ie,u.wrapT=ie,u.repeat.set(4,20),u},[]);return e.jsxs("group",{position:r,rotation:s,visible:n,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,t,32,1,!0]}),e.jsx("meshStandardMaterial",{ref:o,map:l,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:E,transparent:!0,opacity:.9})]}),e.jsxs("mesh",{ref:i,children:[e.jsx("cylinderGeometry",{args:[140,140,t,16,40,!0]}),e.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:E})]})]})},N=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.02,x:0,y:0,z:-250,rx:0,ry:0},{p:.03,x:0,y:0,z:-1250,rx:0,ry:0},{p:.05,x:0,y:0,z:-1250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.09,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.1,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.11,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.12,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.13,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.135,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.14,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.145,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.15,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.16,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.18,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.19,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.21,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.23,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-10550,rx:0,ry:0},{p:.255,x:0,y:-3980,z:-10550,rx:0,ry:0},{p:.265,x:0,y:-3980,z:-11550,rx:0,ry:0},{p:.275,x:0,y:-3980,z:-12550,rx:0,ry:0},{p:.285,x:0,y:-3980,z:-13550,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-13550,rx:0,ry:0},{p:.31,x:0,y:-3980,z:-14550,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-15550,rx:0,ry:0},{p:.33,x:0,y:-4e3,z:-16550,rx:0,ry:0},{p:.36,x:0,y:-4e3,z:-16550,rx:0,ry:0},{p:.37,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.395,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.405,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.42,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.43,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.44,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.45,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.455,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.47,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.475,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.485,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.49,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:.5,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:.52,x:0,y:-11750,z:-31e3,rx:0,ry:0},{p:.54,x:0,y:-11750,z:-33e3,rx:0,ry:0},{p:.56,x:0,y:-11750,z:-34e3,rx:0,ry:0},{p:.58,x:0,y:-11750,z:-35e3,rx:0,ry:0},{p:.6,x:0,y:-11750,z:-37e3,rx:0,ry:0},{p:.62,x:0,y:-11750,z:-38e3,rx:0,ry:0},{p:.64,x:0,y:-11750,z:-39e3,rx:0,ry:0},{p:.66,x:0,y:-11750,z:-41e3,rx:0,ry:0},{p:.68,x:0,y:-11750,z:-42e3,rx:0,ry:0},{p:.7,x:0,y:-11750,z:-43e3,rx:0,ry:0},{p:.72,x:0,y:-11750,z:-45e3,rx:0,ry:0},{p:.75,x:0,y:-11750,z:-46e3,rx:0,ry:0},{p:.77,x:0,y:-11750,z:-47e3,rx:0,ry:0},{p:.79,x:0,y:-11750,z:-49e3,rx:0,ry:0},{p:.82,x:0,y:-11750,z:-5e4,rx:0,ry:0},{p:.84,x:0,y:-11750,z:-51e3,rx:0,ry:0},{p:.86,x:0,y:-11750,z:-53e3,rx:0,ry:0},{p:.89,x:0,y:-11750,z:-54e3,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-55e3,rx:0,ry:0},{p:.93,x:0,y:-11750,z:-57e3,rx:0,ry:0},{p:1,x:0,y:-11750,z:-58e3,rx:0,ry:0}],or=r=>{if(r<=N[0].p)return N[0];if(r>=N[N.length-1].p)return N[N.length-1];for(let s=0;s<N.length-1;s++){const t=N[s],n=N[s+1];if(r>=t.p&&r<=n.p){const o=(r-t.p)/(n.p-t.p);return{x:U.lerp(t.x,n.x,o),y:U.lerp(t.y,n.y,o),z:U.lerp(t.z,n.z,o),rx:U.lerp(t.rx,n.rx,o),ry:U.lerp(t.ry,n.ry,o)}}}return N[0]},ye=new Te,ve=new Xe,nr=()=>{const r=H(),s=a.useRef();return g(t=>{let n=window._warpProgress!==void 0?window._warpProgress:r.offset;window.icebreakerCaveLocked?n=.135:window.icebreakerThawLocked?n=.14:window.icebreakerTextLocked?n=.145:window.mindwaveLocked?n=.06:window.interstellarLocked?n=.21:window.autopilotLocked?n=.3:window.contangoLocked&&(n=.47);const o=or(n);if(window._snapCamera)t.camera.position.set(o.x,o.y,o.z),ve.set(o.rx,o.ry,0),ye.setFromEuler(ve),t.camera.quaternion.copy(ye),window._snapCamera=!1;else{t.camera.position.x=U.lerp(t.camera.position.x,o.x,.2),t.camera.position.y=U.lerp(t.camera.position.y,o.y,.2),t.camera.position.z=U.lerp(t.camera.position.z,o.z,.2),ve.set(o.rx,o.ry,0),ye.setFromEuler(ve),t.camera.quaternion.slerp(ye,.15);const i=r.delta*10;t.camera.rotateZ(U.lerp(0,i*2,.2))}s.current&&s.current.position.copy(t.camera.position)}),e.jsxs("group",{children:[e.jsx(st,{}),e.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),e.jsx("pointLight",{ref:s,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),e.jsx("ambientLight",{intensity:.2})]})},ar=()=>{const r=H(),[s,t]=a.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1,maya:!1,sphinx:!1,liquid:!1,helu:!1,pyramid:!1,matrix:!1,lightspeed:!1}),n=a.useRef(s);return g(()=>{const o=window._warpProgress!==void 0?window._warpProgress:r.offset,i={intro:o<.05,mindwave:o>.04&&o<.09,wormhole_ice:o>.08&&o<.12,icebreaker:o>.11&&o<.16,wormhole_sound:o>.15&&o<.2,interstellar:o>.18&&o<.23,w_legal:o>.22&&o<.25,legal:o>.23&&o<.27,w_autopilot:o>.26&&o<.29,autopilot:o>.27&&o<.32,w_clove:o>.31&&o<.34,clove:o>.32&&o<.38,w_fantasy:o>.36&&o<.42,fantasy:o>.39&&o<.44,w_contango:o>.43&&o<.46,contango:o>.44&&o<.48,sentaient:o>.47&&o<.52,maya:o>.51&&o<.57,sphinx:o>.57&&o<.63,liquid:o>.63&&o<.69,helu:o>.69&&o<.76,pyramid:o>.76&&o<.83,matrix:o>.83&&o<.9,lightspeed:o>.9};let l=!1;for(const f in i)n.current[f]!==i[f]&&(l=!0);l&&(n.current=i,t(i))}),e.jsxs("group",{children:[e.jsx(st,{}),e.jsx(Qs,{startZ:10,endZ:-250,visible:s.intro}),e.jsx(xs,{position:[0,0,-1350],visible:s.mindwave}),e.jsx(er,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:s.wormhole_ice}),e.jsx(fs,{position:[0,-4e3,-2550],visible:s.icebreaker}),e.jsx(D,{position:[0,-4e3,-5050],rotation:[Math.PI/2,0,0],length:3500,color:"#ff00ff",speed:20,visible:s.wormhole_sound}),e.jsx(bs,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:s.interstellar}),e.jsx(D,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:s.w_legal}),e.jsx(js,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:s.legal}),e.jsx(D,{position:[0,-4e3,-12050],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffff",speed:40,visible:s.w_autopilot}),e.jsx(ds,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:s.autopilot}),e.jsx(D,{position:[0,-4e3,-15050],rotation:[Math.PI/2,0,0],length:2e3,color:"#ff00ff",speed:40,visible:s.w_clove}),e.jsx(Ts,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:s.clove}),e.jsx(rr,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:s.w_fantasy}),e.jsx(Is,{position:[0,-11700,-17500],rotation:[0,0,0],visible:s.fantasy}),e.jsx(sr,{position:[0,-11750,-20550],length:4e3,visible:s.w_contango}),e.jsx(Es,{position:[0,-11750,-24800],rotation:[0,0,0],visible:s.contango}),e.jsx(As,{position:[0,-11750,-29350],rotation:[0,0,0],visible:s.sentaient}),e.jsx(D,{position:[0,-11750,-31e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#ffffff",speed:20,visible:s.maya}),e.jsx(Bs,{position:[0,-11750,-33e3],visible:s.maya}),e.jsx(D,{position:[0,-11750,-35e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#ff0000",speed:20,visible:s.sphinx}),e.jsx(Us,{position:[0,-11750,-37e3],visible:s.sphinx}),e.jsx(D,{position:[0,-11750,-39e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#ffd700",speed:20,visible:s.liquid}),e.jsx(Hs,{position:[0,-11750,-41e3],visible:s.liquid}),e.jsx(D,{position:[0,-11750,-43e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#ffaa00",speed:20,visible:s.helu}),e.jsx(Os,{position:[0,-11750,-45e3],visible:s.helu}),e.jsx(D,{position:[0,-11750,-47e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#00ffff",speed:20,visible:s.pyramid}),e.jsx(Ns,{position:[0,-11750,-49e3],visible:s.pyramid}),e.jsx(D,{position:[0,-11750,-51e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#00ff44",speed:30,visible:s.matrix}),e.jsx(Ys,{position:[0,-11750,-53e3],visible:s.matrix}),e.jsx(D,{position:[0,-11750,-55e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#0055ff",speed:50,visible:s.lightspeed}),e.jsx(qs,{position:[0,-11750,-57e3],visible:s.lightspeed})]})},ir=()=>{const r=H(),s=a.useRef();g(()=>{const n=window._warpProgress!==void 0?window._warpProgress:r.offset;if(s.current){const o=n>.1;s.current.style.opacity=o?1:0,s.current.style.pointerEvents=o?"auto":"none"}});const t=()=>{r.el&&(window._cancelWarp=!0,window._warpProgress=void 0,window._snapCamera=!0,r.el.style.overflow="auto",r.el.scrollTop=0)};return e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:e.jsx("div",{ref:s,style:{position:"absolute",top:"40px",left:"40px",opacity:0,transition:"opacity 0.5s"},children:e.jsx("button",{onClick:t,className:"px-6 py-2 bg-black/50 border border-emerald-500/50 hover:border-emerald-400 hover:bg-emerald-500/20 text-emerald-400 rounded-full font-mono text-sm tracking-widest backdrop-blur-sm transition-all",children:"← RETURN TO HUB"})})})},cr=()=>e.jsxs(yt,{dpr:[1,1.5],performance:{min:.5},gl:{antialias:!1,alpha:!0,powerPreference:"high-performance"},children:[e.jsxs(_t,{pages:10,damping:.2,distance:1.2,children:[e.jsxs(Ye.Suspense,{fallback:null,children:[e.jsx(nr,{}),e.jsx(ar,{})]}),e.jsx(se,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),e.jsx(Et,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:e.jsx(ir,{})})]}),e.jsxs(vt,{disableNormalPass:!0,children:[e.jsx(jt,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),e.jsx(Mt,{opacity:.05}),e.jsx(wt,{eskil:!1,offset:.1,darkness:1.1})]})]}),jr=()=>e.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[e.jsxs(ht,{children:[e.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),e.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),e.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),e.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:e.jsx(pt,{})}),e.jsx("div",{className:"absolute inset-0 z-0",children:e.jsx(cr,{})})]});export{jr as default};
