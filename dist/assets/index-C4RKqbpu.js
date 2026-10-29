import{k as i,h as Pt,_ as q,j as e,a as Ge,H as St}from"./vendor-JmSMlGGQ.js";import{H as zt}from"./Header-lEI2_uWC.js";import{b as ae,u as g,a as X,e as st,v as Rt,C as Tt}from"./constants-B1l2Kg3L.js";import{E as It,B as Ct,N as kt,V as Gt}from"./Vignette-C40qjNqA.js";import{aq as P,n as D,ap as Ie,a1 as rt,_ as ot,a3 as Le,aj as A,ai as Oe,k as E,O as fe,o as De,G as Lt,P as _t,M as At,a9 as V,a as L,K as H,B as W,a8 as ce,Y as Q,E as nt,h as it,l as Et,af as Wt,ad as Ft,q as Bt,g as Ut,f as Ht,i as Ot}from"./three-DSa_y4UV.js";import{u as B,F as at,a as Dt,S as Vt}from"./Float-DEpotcRd.js";import{T}from"./Text-Duu9tExd.js";import{s as Nt,S as le}from"./Sparkles-CztAoRka.js";import"./main-DeQ4ZA9v.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";const ue=new P,_e=new P,Yt=new P,Ve=new Ie;function qt(o,t,s){const r=ue.setFromMatrixPosition(o.matrixWorld);r.project(t);const n=s.width/2,a=s.height/2;return[r.x*n+n,-(r.y*a)+a]}function Xt(o,t){const s=ue.setFromMatrixPosition(o.matrixWorld),r=_e.setFromMatrixPosition(t.matrixWorld),n=s.sub(r),a=t.getWorldDirection(Yt);return n.angleTo(a)>Math.PI/2}function Zt(o,t,s,r){const n=ue.setFromMatrixPosition(o.matrixWorld),a=n.clone();a.project(t),Ve.set(a.x,a.y),s.setFromCamera(Ve,t);const c=s.intersectObjects(r,!0);if(c.length){const l=c[0].distance;return n.distanceTo(s.ray.origin)<l}return!0}function $t(o,t){if(t instanceof ot)return t.zoom;if(t instanceof rt){const s=ue.setFromMatrixPosition(o.matrixWorld),r=_e.setFromMatrixPosition(t.matrixWorld),n=t.fov*Math.PI/180,a=s.distanceTo(r);return 1/(2*Math.tan(n/2)*a)}else return 1}function Qt(o,t,s){if(t instanceof rt||t instanceof ot){const r=ue.setFromMatrixPosition(o.matrixWorld),n=_e.setFromMatrixPosition(t.matrixWorld),a=r.distanceTo(n),c=(s[1]-s[0])/(t.far-t.near),l=s[1]-c*t.far;return Math.round(c*a+l)}}const Ce=o=>Math.abs(o)<1e-10?0:o;function ct(o,t,s=""){let r="matrix3d(";for(let n=0;n!==16;n++)r+=Ce(t[n]*o.elements[n])+(n!==15?",":")");return s+r}const Kt=(o=>t=>ct(t,o))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),Jt=(o=>(t,s)=>ct(t,o(s),"translate(-50%,-50%)"))(o=>[1/o,1/o,1/o,1,-1/o,-1/o,-1/o,-1,1/o,1/o,1/o,1,1,1,1,1]);function es(o){return o&&typeof o=="object"&&"current"in o}const ts=i.forwardRef(({children:o,eps:t=.001,style:s,className:r,prepend:n,center:a,fullscreen:c,portal:l,distanceFactor:f,sprite:u=!1,transform:d=!1,occlude:m,onOcclude:p,castShadow:x,receiveShadow:M,material:j,geometry:y,zIndexRange:b=[16777271,0],calculatePosition:v=qt,as:w="div",wrapperClass:R,pointerEvents:C="auto",...h},_)=>{const{gl:k,camera:S,scene:G,size:I,raycaster:be,events:Pe,viewport:K}=ae(),[F]=i.useState(()=>document.createElement(w)),Se=i.useRef(),O=i.useRef(null),We=i.useRef(0),de=i.useRef([0,0]),oe=i.useRef(null),ze=i.useRef(null),se=l?.current||Pe.connected||k.domElement.parentNode,$=i.useRef(null),me=i.useRef(!1),he=i.useMemo(()=>m&&m!=="blending"||Array.isArray(m)&&m.length&&es(m[0]),[m]);i.useLayoutEffect(()=>{const U=k.domElement;m&&m==="blending"?(U.style.zIndex=`${Math.floor(b[0]/2)}`,U.style.position="absolute",U.style.pointerEvents="none"):(U.style.zIndex=null,U.style.position=null,U.style.pointerEvents=null)},[m]),i.useLayoutEffect(()=>{if(O.current){const U=Se.current=Pt(F);if(G.updateMatrixWorld(),d)F.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const z=v(O.current,S,I);F.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${z[0]}px,${z[1]}px,0);transform-origin:0 0;`}return se&&(n?se.prepend(F):se.appendChild(F)),()=>{se&&se.removeChild(F),U.unmount()}}},[se,d]),i.useLayoutEffect(()=>{R&&(F.className=R)},[R]);const Fe=i.useMemo(()=>d?{position:"absolute",top:0,left:0,width:I.width,height:I.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:a?"translate3d(-50%,-50%,0)":"none",...c&&{top:-I.height/2,left:-I.width/2,width:I.width,height:I.height},...s},[s,a,c,I,d]),xt=i.useMemo(()=>({position:"absolute",pointerEvents:C}),[C]);i.useLayoutEffect(()=>{if(me.current=!1,d){var U;(U=Se.current)==null||U.render(i.createElement("div",{ref:oe,style:Fe},i.createElement("div",{ref:ze,style:xt},i.createElement("div",{ref:_,className:r,style:s,children:o}))))}else{var z;(z=Se.current)==null||z.render(i.createElement("div",{ref:_,style:Fe,className:r,children:o}))}});const re=i.useRef(!0);g(U=>{if(O.current){S.updateMatrixWorld(),O.current.updateWorldMatrix(!0,!1);const z=d?de.current:v(O.current,S,I);if(d||Math.abs(We.current-S.zoom)>t||Math.abs(de.current[0]-z[0])>t||Math.abs(de.current[1]-z[1])>t){const J=Xt(O.current,S);let Z=!1;he&&(Array.isArray(m)?Z=m.map(ee=>ee.current):m!=="blending"&&(Z=[G]));const ne=re.current;if(Z){const ee=Zt(O.current,S,be,Z);re.current=ee&&!J}else re.current=!J;ne!==re.current&&(p?p(!re.current):F.style.display=re.current?"block":"none");const pe=Math.floor(b[0]/2),gt=m?he?[b[0],pe]:[pe-1,0]:b;if(F.style.zIndex=`${Qt(O.current,S,gt)}`,d){const[ee,Ue]=[I.width/2,I.height/2],Re=S.projectionMatrix.elements[5]*Ue,{isOrthographicCamera:He,top:yt,left:vt,bottom:jt,right:Mt}=S,wt=Kt(S.matrixWorldInverse),bt=He?`scale(${Re})translate(${Ce(-(Mt+vt)/2)}px,${Ce((yt+jt)/2)}px)`:`translateZ(${Re}px)`;let te=O.current.matrixWorld;u&&(te=S.matrixWorldInverse.clone().transpose().copyPosition(te).scale(O.current.scale),te.elements[3]=te.elements[7]=te.elements[11]=0,te.elements[15]=1),F.style.width=I.width+"px",F.style.height=I.height+"px",F.style.perspective=He?"":`${Re}px`,oe.current&&ze.current&&(oe.current.style.transform=`${bt}${wt}translate(${ee}px,${Ue}px)`,ze.current.style.transform=Jt(te,1/((f||10)/400)))}else{const ee=f===void 0?1:$t(O.current,S)*f;F.style.transform=`translate3d(${z[0]}px,${z[1]}px,0) scale(${ee})`}de.current=z,We.current=S.zoom}}if(!he&&$.current&&!me.current)if(d){if(oe.current){const z=oe.current.children[0];if(z!=null&&z.clientWidth&&z!=null&&z.clientHeight){const{isOrthographicCamera:J}=S;if(J||y)h.scale&&(Array.isArray(h.scale)?h.scale instanceof P?$.current.scale.copy(h.scale.clone().divideScalar(1)):$.current.scale.set(1/h.scale[0],1/h.scale[1],1/h.scale[2]):$.current.scale.setScalar(1/h.scale));else{const Z=(f||10)/400,ne=z.clientWidth*Z,pe=z.clientHeight*Z;$.current.scale.set(ne,pe,1)}me.current=!0}}}else{const z=F.children[0];if(z!=null&&z.clientWidth&&z!=null&&z.clientHeight){const J=1/K.factor,Z=z.clientWidth*J,ne=z.clientHeight*J;$.current.scale.set(Z,ne,1),me.current=!0}$.current.lookAt(U.camera.position)}});const Be=i.useMemo(()=>({vertexShader:d?void 0:`
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
      `}),[d]);return i.createElement("group",q({},h,{ref:O}),m&&!he&&i.createElement("mesh",{castShadow:x,receiveShadow:M,ref:$},y||i.createElement("planeGeometry",null),j||i.createElement("shaderMaterial",{side:D,vertexShader:Be.vertexShader,fragmentShader:Be.fragmentShader})))}),lt=i.forwardRef(function({children:t,follow:s=!0,lockX:r=!1,lockY:n=!1,lockZ:a=!1,...c},l){const f=i.useRef(null),u=i.useRef(null),d=new Le;return g(({camera:m})=>{if(!s||!u.current)return;const p=u.current.rotation.clone();u.current.updateMatrix(),u.current.updateWorldMatrix(!1,!1),u.current.getWorldQuaternion(d),m.getWorldQuaternion(f.current.quaternion).premultiply(d.invert()),r&&(u.current.rotation.x=p.x),n&&(u.current.rotation.y=p.y),a&&(u.current.rotation.z=p.z)}),i.useImperativeHandle(l,()=>u.current,[]),i.createElement("group",q({ref:u},c),i.createElement("group",{ref:f},t))}),Te=o=>o===Object(o)&&!Array.isArray(o)&&typeof o!="function";function Ae(o,t){const s=ae(a=>a.gl),r=X(A,Te(o)?Object.values(o):o);return i.useLayoutEffect(()=>{t?.(r)},[t]),i.useEffect(()=>{if("initTexture"in s){let a=[];Array.isArray(r)?a=r:r instanceof Oe?a=[r]:Te(r)&&(a=Object.values(r)),a.forEach(c=>{c instanceof Oe&&s.initTexture(c)})}},[s,r]),i.useMemo(()=>{if(Te(o)){const a={};let c=0;for(const l in o)a[l]=r[c++];return a}else return r},[o,r])}Ae.preload=o=>X.preload(A,o);Ae.clear=o=>X.clear(A,o);const Ne=Nt({color:new E("white"),scale:new Ie(1,1),imageBounds:new Ie(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`,`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${Rt>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`),ft=i.forwardRef(({children:o,color:t,segments:s=1,scale:r=1,zoom:n=1,grayscale:a=0,opacity:c=1,radius:l=0,texture:f,toneMapped:u,transparent:d,side:m,...p},x)=>{st({ImageMaterial:Ne});const M=i.useRef(null),j=ae(w=>w.size),y=Array.isArray(r)?[r[0],r[1]]:[r,r],b=[f.image.width,f.image.height],v=Math.max(j.width,j.height);return i.useImperativeHandle(x,()=>M.current,[]),i.useLayoutEffect(()=>{M.current.geometry.parameters&&M.current.material.scale.set(y[0]*M.current.geometry.parameters.width,y[1]*M.current.geometry.parameters.height)},[]),i.createElement("mesh",q({ref:M,scale:Array.isArray(r)?[...r,1]:r},p),i.createElement("planeGeometry",{args:[1,1,s,s]}),i.createElement("imageMaterial",{color:t,map:f,zoom:n,grayscale:a,opacity:c,scale:y,imageBounds:b,resolution:v,radius:l,toneMapped:u,transparent:d,side:m,key:Ne.key}),o)}),ss=i.forwardRef(({url:o,...t},s)=>{const r=Ae(o);return i.createElement(ft,q({},t,{texture:r,ref:s}))}),rs=i.forwardRef(({url:o,...t},s)=>i.createElement(ft,q({},t,{ref:s}))),ut=i.forwardRef((o,t)=>{if(o.url)return i.createElement(ss,q({},o,{ref:t}));if(o.texture)return i.createElement(rs,q({},o,{ref:t}));throw new Error("<Image /> requires a url or texture")}),Ye=(o,t)=>{"updateRanges"in o?o.updateRanges[0]=t:o.updateRange=t};function os(o){return typeof o=="function"}const qe=new fe,Xe=new fe,xe=[],ie=new _t;class ns extends Lt{constructor(){super(),this.color=new E("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var t;return(t=this.instance.current)==null?void 0:t.geometry}raycast(t,s){const r=this.instance.current;if(!r||!r.geometry||!r.material)return;ie.geometry=r.geometry;const n=r.matrixWorld,a=r.userData.instances.indexOf(this.instanceKey);if(!(a===-1||a>r.count)){r.getMatrixAt(a,qe),Xe.multiplyMatrices(n,qe),ie.matrixWorld=Xe,r.material instanceof At?ie.material.side=r.material.side:ie.material.side=r.material[0].side,ie.raycast(t,xe);for(let c=0,l=xe.length;c<l;c++){const f=xe[c];f.instanceId=a,f.object=this,s.push(f)}xe.length=0}}}const dt=i.createContext(null),Ze=new fe,$e=new fe,is=new fe,Qe=new P,Ke=new Le,Je=new P,as=o=>o.isInstancedBufferAttribute,mt=i.forwardRef(({context:o,children:t,...s},r)=>{i.useMemo(()=>st({PositionMesh:ns}),[]);const n=i.useRef();i.useImperativeHandle(r,()=>n.current,[]);const{subscribe:a,getParent:c}=i.useContext(o||dt);return i.useLayoutEffect(()=>a(n),[]),i.createElement("positionMesh",q({instance:c(),instanceKey:n,ref:n},s),t)}),cs=i.forwardRef(({context:o,children:t,range:s,limit:r=1e3,frames:n=1/0,...a},c)=>{const[{localContext:l,instance:f}]=i.useState(()=>{const v=i.createContext(null);return{localContext:v,instance:i.forwardRef((w,R)=>i.createElement(mt,q({context:v},w,{ref:R})))}}),u=i.useRef(null);i.useImperativeHandle(c,()=>u.current,[]);const[d,m]=i.useState([]),[[p,x]]=i.useState(()=>{const v=new Float32Array(r*16);for(let w=0;w<r;w++)is.identity().toArray(v,w*16);return[v,new Float32Array([...new Array(r*3)].map(()=>1))]});i.useEffect(()=>{u.current.instanceMatrix.needsUpdate=!0});let M=0,j=0;const y=i.useRef([]);i.useLayoutEffect(()=>{y.current=Object.entries(u.current.geometry.attributes).filter(([v,w])=>as(w))}),g(()=>{if(n===1/0||M<n){u.current.updateMatrix(),u.current.updateMatrixWorld(),Ze.copy(u.current.matrixWorld).invert(),j=Math.min(r,s!==void 0?s:r,d.length),u.current.count=j,Ye(u.current.instanceMatrix,{offset:0,count:j*16}),Ye(u.current.instanceColor,{offset:0,count:j*3});for(let v=0;v<d.length;v++){const w=d[v].current;w.matrixWorld.decompose(Qe,Ke,Je),$e.compose(Qe,Ke,Je).premultiply(Ze),$e.toArray(p,v*16),u.current.instanceMatrix.needsUpdate=!0,w.color.toArray(x,v*3),u.current.instanceColor.needsUpdate=!0}M++}});const b=i.useMemo(()=>({getParent:()=>u,subscribe:v=>(m(w=>[...w,v]),()=>m(w=>w.filter(R=>R.current!==v.current)))}),[]);return i.createElement("instancedMesh",q({userData:{instances:d,limit:r,frames:n},matrixAutoUpdate:!1,ref:u,args:[null,null,0],raycast:()=>null},a),i.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:p.length/16,array:p,itemSize:16,usage:De}),i.createElement("instancedBufferAttribute",{attach:"instanceColor",count:x.length/3,array:x,itemSize:3,usage:De}),os(t)?i.createElement(l.Provider,{value:b},t(f)):o?i.createElement(o.Provider,{value:b},t):i.createElement(dt.Provider,{value:b},t))}),ls=({position:o})=>{const t=i.useRef();B();const[s,r]=i.useState(null);return i.useEffect(()=>{new A().load("/assets/images/digital_fire.jpg",n=>{n.colorSpace=V,r(n)})},[]),g(n=>{if(t.current){const a=window.icebreakerThaw||0;t.current.material.opacity=a*.9;const c=1+Math.sin(n.clock.elapsedTime*5)*.1;t.current.scale.setScalar(c)}}),s?e.jsx("group",{position:o,children:e.jsx(lt,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{ref:t,position:[0,20,0],children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:s,transparent:!0,opacity:0,depthWrite:!1,blending:L})]})})}):null},fs=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,us=`
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
`,ds=({position:o,angle:t,delay:s})=>{const r=i.useRef(),n=i.useRef();B();const a=i.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new E("#44aaff")},uPartyColor:{value:new E("#ff8844")}}),[]);return g(c=>{if(!r.current||!n.current)return;a.uTime.value=c.clock.elapsedTime;const l=window.icebreakerThaw||0,f=H.clamp((l-s)*2,0,1);a.uState.value=f;const u=Math.sin(c.clock.elapsedTime*8+s*10)*f;if(r.current.position.y=o[1]+(u>0?u*2:0)+15,f>0){const d=0-o[0],m=0-(o[2]- -200),p=Math.sqrt(d*d+m*m)||1;r.current.position.x=o[0]+d/p*(f*20),r.current.position.z=o[2]+m/p*(f*20)}else r.current.position.x=o[0],r.current.position.z=o[2]}),e.jsx("group",{ref:r,position:[o[0],o[1]+15,o[2]],children:e.jsx(lt,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{children:[e.jsx("planeGeometry",{args:[20,30]}),e.jsx("shaderMaterial",{ref:n,vertexShader:fs,fragmentShader:us,uniforms:a,transparent:!0,side:D,depthWrite:!1})]})})})},ms=({position:o})=>{const s=i.useMemo(()=>{const r=[];for(let n=0;n<60;n++){const a=Math.random()*Math.PI*2,c=30+Math.random()*80;r.push({position:[o[0]+Math.cos(a)*c,o[1],o[2]+Math.sin(a)*c],angle:a,delay:Math.random()*.5})}return r},[60,o]);return e.jsx("group",{children:s.map((r,n)=>e.jsx(ds,{...r},n))})},we=({appId:o,position:t})=>e.jsx("group",{position:t}),hs=({position:o})=>{const t=i.useRef(),[s,r]=i.useState(null);return B(),i.useEffect(()=>{new A().load("/icebreaker_logo.png",n=>{n.colorSpace=V,r(n)})},[]),g(n=>{if(t.current&&(t.current.rotation.y=n.clock.elapsedTime*.5,t.current.position.y=o[1]+Math.sin(n.clock.elapsedTime*2)*5,t.current.material)){const a=window.icebreakerThaw||0;t.current.material.opacity=a*.9,t.current.scale.setScalar(.01+a)}}),s?e.jsxs("mesh",{ref:t,position:o,children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:s,transparent:!0,opacity:0,depthWrite:!1,blending:L,side:D})]}):null},ps=({numTrees:o=30,radius:t=50,centerZ:s=-500})=>{const r=i.useRef(),n=i.useRef();B();const a=i.useMemo(()=>new Q,[]),c=i.useMemo(()=>{const l=[];for(let f=0;f<o;f++){const u=f/o*Math.PI*2+Math.random()*.5,d=t+Math.random()*20;l.push({position:new P(Math.cos(u)*d,-18,Math.sin(u)*d+s),rotation:new nt(0,u+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return l},[o,t,s]);return g(()=>{if(!r.current||!n.current)return;const l=window.icebreakerThaw||0;for(let f=0;f<o;f++){const u=c[f],d=Math.max(0,(l-u.delay)*2),m=H.clamp(d,0,1)*u.scale;a.position.copy(u.position),a.rotation.copy(u.rotation),a.scale.setScalar(m),a.updateMatrix(),r.current.setMatrixAt(f,a.matrix),a.position.y+=18*m,a.updateMatrix(),n.current.setMatrixAt(f,a.matrix)}r.current.instanceMatrix.needsUpdate=!0,n.current.instanceMatrix.needsUpdate=!0}),e.jsxs("group",{children:[e.jsxs("instancedMesh",{ref:r,args:[null,null,o],children:[e.jsx("cylinderGeometry",{args:[.5,1,20,8]}),e.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),e.jsxs("instancedMesh",{ref:n,args:[null,null,o],children:[e.jsx("sphereGeometry",{args:[8,4,4]}),e.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},et=`
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
`,tt=`
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
`,xs=({startZ:o,endZ:t})=>{const s=i.useRef(),r=i.useRef(),[n,a]=i.useState(null),c=Math.abs(t-o),l=(o+t)/2,f=i.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return i.useEffect(()=>{new A().load("/assets/images/ice_cavern.jpg",u=>{u.wrapS=ce,u.wrapT=ce,u.repeat.set(4,2),u.colorSpace=V,a(u),f.tMap.value=u})},[f]),g(u=>{if(r.current){const d=window.icebreakerThaw||0;f.uThaw.value=d,f.uTime.value=u.clock.elapsedTime}}),n?e.jsxs("group",{children:[e.jsxs("mesh",{ref:s,position:[0,0,l],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[120,120,c,128,128,!0]}),e.jsx("shaderMaterial",{ref:r,vertexShader:et,fragmentShader:tt,uniforms:f,transparent:!0,side:W})]}),e.jsxs("mesh",{position:[0,0,1300],children:[e.jsx("sphereGeometry",{args:[120,64,64]}),e.jsx("shaderMaterial",{vertexShader:et,fragmentShader:tt,uniforms:f,transparent:!0,side:W})]})]}):null},gs=({position:o})=>{const t=i.useRef();return g(s=>{if(t.current){const r=window.icebreakerThaw||0,n=H.lerp(.01,50,Math.pow(r,2));t.current.scale.setScalar(n),t.current.visible=r>0}}),e.jsxs("mesh",{ref:t,position:[o[0],o[1]+1,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[20,64]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},ys=({position:o})=>{const t=i.useRef();return g(s=>{if(t.current){const r=window.icebreakerThaw||0;t.current.scale.setScalar(r>0?1:.001)}}),e.jsxs("mesh",{ref:t,position:[o[0],o[1]+1.5,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[96,64]}),e.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},vs=({position:o})=>{const t=i.useRef();return g(()=>{if(t.current){const s=window.icebreakerThaw||0;t.current.opacity=1-Math.pow(s,2),t.current.transparent=!0}}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:o,children:[e.jsx("planeGeometry",{args:[1e3,3e3]}),e.jsx("meshStandardMaterial",{ref:t,color:"#001133",roughness:.1,metalness:.8})]})},js=({centerZ:o})=>{const t=i.useRef(),s=i.useRef(),r=i.useMemo(()=>({uColorBottom:{value:new E("#ffaa55")},uColorTop:{value:new E("#00f3ff")},uOpacity:{value:0}}),[]);return g(()=>{const n=window.icebreakerThaw||0;t.current&&(t.current.uniforms.uOpacity.value=n),s.current&&(s.current.intensity=n*.6)}),e.jsxs("group",{children:[e.jsxs("mesh",{scale:2e3,children:[e.jsx("sphereGeometry",{args:[1,32,32]}),e.jsx("shaderMaterial",{ref:t,side:W,transparent:!0,depthWrite:!1,uniforms:r,vertexShader:`
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
          `})]}),e.jsx("directionalLight",{ref:s,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),e.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},Ms=()=>{const o=B(),[t,s]=i.useState(!1),[r,n]=i.useState(!1),[a,c]=i.useState(!1),l=i.useRef({triggered:!1,timer:0}),f=i.useRef({triggered:!1,timer:0});return i.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),g((u,d)=>{const m=o.offset;!f.current.triggered&&m>=.133&&(f.current.triggered=!0,c(!0),window.icebreakerCaveLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.135*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerCaveLocked&&(o.el&&(o.el.scrollTop=.135*(o.el.scrollHeight-o.el.clientHeight)),f.current.timer+=d,f.current.timer>1.5&&(window.icebreakerCaveLocked=!1,c(!1),o.el&&(o.el.style.overflow="auto"))),!t&&m>=.138&&window.icebreakerThaw<1&&(s(!0),window.icebreakerThawLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.14*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerThawLocked?(o.el&&(o.el.scrollTop=.14*(o.el.scrollHeight-o.el.clientHeight)),window.icebreakerThaw+=d*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,o.el&&!r&&(o.el.style.overflow="auto"),s(!1))):m<.13&&(window.icebreakerThaw=0),!l.current.triggered&&m>=.143&&window.icebreakerThaw>=1&&(l.current.triggered=!0,n(!0),window.icebreakerTextLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.145*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerTextLocked&&(o.el&&(o.el.scrollTop=.145*(o.el.scrollHeight-o.el.clientHeight)),l.current.timer+=d,l.current.timer>1.5&&(window.icebreakerTextLocked=!1,n(!1),o.el&&(o.el.style.overflow="auto")))}),null},ws=({position:o,rotation:t,visible:s=!0})=>e.jsxs("group",{position:o,rotation:t,visible:s,children:[e.jsx(Ms,{}),e.jsx(js,{centerZ:275}),e.jsx(xs,{startZ:1550,endZ:-1e3}),e.jsx(vs,{position:[0,-20,0]}),e.jsx(gs,{position:[0,-20,275]}),e.jsx(ys,{position:[0,-20,275]}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-225],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-225],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),e.jsx(ls,{position:[0,-20,275]}),e.jsx(hs,{position:[0,30,275]}),e.jsx(ps,{radius:60,centerZ:275}),e.jsx(ms,{position:[0,-20,275]}),e.jsx(we,{appId:"icebreaker",position:[-80,20,75]})]}),ge=({position:o,speed:t=2,direction:s=1,color:r="#00ffcc"})=>{const n=i.useRef();return g((a,c)=>{n.current&&n.current.children.forEach((l,f)=>{f!==0&&(l.position.z+=t*s*c*100,l.position.z>1e3&&(l.position.z=-1e3),l.position.z<-1e3&&(l.position.z=1e3))})}),e.jsxs("group",{position:o,ref:n,children:[e.jsxs("mesh",{position:[0,-5,0],children:[e.jsx("boxGeometry",{args:[60,4,2e3]}),e.jsx("meshStandardMaterial",{color:"#111",metalness:.9,roughness:.1}),e.jsx("meshBasicMaterial",{color:"#333",wireframe:!0})]}),Array.from({length:20}).map((a,c)=>e.jsxs("mesh",{position:[0,10,-1e3+c*100],children:[e.jsx("boxGeometry",{args:[30,20,40]}),e.jsx("meshStandardMaterial",{color:r,emissive:r,emissiveIntensity:2,transparent:!0,opacity:.8,wireframe:!0})]},c))]})},ye=({position:o,color:t="#ff00ff"})=>{const s=i.useRef();return g(r=>{s.current&&(s.current.rotation.x=r.clock.elapsedTime*.5,s.current.rotation.y=r.clock.elapsedTime*.3)}),e.jsxs("group",{position:o,children:[e.jsxs("mesh",{position:[0,-100,0],children:[e.jsx("boxGeometry",{args:[100,200,100]}),e.jsx("meshStandardMaterial",{color:"#000",metalness:1,roughness:0}),e.jsx("meshBasicMaterial",{color:t,wireframe:!0})]}),e.jsxs("mesh",{position:[0,100,0],ref:s,children:[e.jsx("icosahedronGeometry",{args:[50,1]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:1,wireframe:!0})]})]})},bs=({position:o,rotation:t,visible:s})=>{const[r,n]=i.useState(null),a=B(),[c,l]=i.useState(!1);return g(()=>{s&&(a.offset>.29&&a.offset<.31&&!c&&!window.autopilotLocked&&(window.autopilotLocked=!0,l(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(a.offset<.27||a.offset>.33)&&c&&(l(!1),window.autopilotLocked=!1))}),i.useEffect(()=>{new A().load("/autopilot_logo.png",u=>{u.colorSpace=V,n(u)})},[]),e.jsxs("group",{visible:s,position:o,rotation:t,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:W})]}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[4e3,4e3]}),e.jsx("meshBasicMaterial",{color:"#001122",transparent:!0,opacity:.8})]}),e.jsx("gridHelper",{args:[4e3,100,"#00ffcc","#003344"],position:[0,-199,0]}),e.jsx(ge,{position:[-400,-150,0],speed:4,direction:1,color:"#00ffcc"}),e.jsx(ge,{position:[400,-150,0],speed:5,direction:-1,color:"#ff00ff"}),e.jsx(ge,{position:[-800,-150,0],speed:3,direction:-1,color:"#0088ff"}),e.jsx(ge,{position:[800,-150,0],speed:6,direction:1,color:"#ffaa00"}),e.jsx(ye,{position:[-200,-50,-1e3],color:"#00ffcc"}),e.jsx(ye,{position:[200,-50,-800],color:"#ff00ff"}),e.jsx(ye,{position:[-600,-50,-600],color:"#0088ff"}),e.jsx(ye,{position:[600,-50,-400],color:"#ffaa00"}),e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{color:"#00ffcc",intensity:3,distance:2e3,position:[-500,500,-500]}),e.jsx("pointLight",{color:"#ff00ff",intensity:3,distance:2e3,position:[500,500,500]}),e.jsxs("group",{position:[0,0,-300],children:[r&&e.jsxs("mesh",{position:[0,100,0],children:[e.jsx("planeGeometry",{args:[250,250]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,depthWrite:!1,blending:L})]}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-40,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ffcc",anchorX:"center",anchorY:"middle",children:"AUTOPILOT"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-100,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#003344",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"Fully autonomous marketing pipelines. Generates content, schedules campaigns, and optimizes spend."})]})]})},Ps=`
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
`,Ss=`
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
`,zs=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,Rs=({position:o,visible:t})=>e.jsxs("group",{visible:t,position:o,children:[e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),Ts=({position:o,visible:t})=>{const s=B(),r=i.useRef(),n=i.useRef(),a=i.useRef(),[c,l]=i.useState(null),[f,u]=i.useState(null),[d,m]=i.useState(!1),p=i.useRef({triggered:!1,timer:0});i.useEffect(()=>{window.mindwaveLocked=!1,new A().load("/mindwave-logo.png",j=>{j.colorSpace=V,l(j)}),new A().load("/tribal-sun.png",j=>{j.colorSpace=V,u(j)})},[]);const x=o?o[2]:0,M=i.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return g((j,y)=>{if(!t)return;const b=s.offset;!p.current.triggered&&b>=.075&&(p.current.triggered=!0,m(!0),window.mindwaveLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.08*(s.el.scrollHeight-s.el.clientHeight))),window.mindwaveLocked&&(s.el&&(s.el.scrollTop=.08*(s.el.scrollHeight-s.el.clientHeight)),p.current.timer+=y,p.current.timer>1.5&&(window.mindwaveLocked=!1,m(!1),s.el&&(s.el.style.overflow="auto")));const v=j.clock.elapsedTime;if(r.current){r.current.uniforms.uTime.value=v;const w=Math.abs(j.camera.position.z-x);let C=1-Math.min(w/1e3,1);C=Math.pow(C,2),r.current.uniforms.uScrollProgress.value=C}if(n.current){n.current.position.y=-7+Math.sin(v*2)*2;const w=1+Math.sin(v*4)*.05;n.current.scale.set(w,w,1),n.current.rotation.y=0}if(a.current){a.current.position.y=125+Math.sin(v*2)*2,a.current.rotation.z=v*.1;const w=1+Math.sin(v*3)*.05;a.current.scale.set(w,w,1)}}),e.jsxs("group",{visible:t,position:o,children:[e.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[e.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),e.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:zs,side:W,depthWrite:!1})]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[e.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),e.jsx("shaderMaterial",{ref:r,vertexShader:Ps,fragmentShader:Ss,uniforms:M,transparent:!0,side:D,wireframe:!1})]}),f&&e.jsxs("mesh",{ref:a,position:[0,-10,-85],children:[e.jsx("planeGeometry",{args:[140,140]}),e.jsx("meshBasicMaterial",{map:f,transparent:!0,side:D,depthWrite:!1,blending:L,color:"#00ffff",opacity:.6})]}),c&&e.jsxs("mesh",{ref:n,position:[0,-10,-80],children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:c,transparent:!0,side:D,depthWrite:!1,blending:L})]}),e.jsx(Rs,{position:[0,-5,-80],visible:!0}),e.jsx(we,{appId:"mindwave",position:[40,0,-40]})]})},Is=()=>{const t=i.useRef([]),s=i.useRef(document.createElement("canvas")),r=i.useMemo(()=>{s.current.width=512,s.current.height=1024;const a=s.current.getContext("2d");a.fillStyle="#010a15",a.fillRect(0,0,512,1024),a.strokeStyle="#004488",a.lineWidth=2;for(let l=0;l<1024;l+=32)a.beginPath(),a.moveTo(0,l),a.lineTo(512,l),a.stroke(),l<512&&(a.beginPath(),a.moveTo(l,0),a.lineTo(l,1024),a.stroke());a.fillStyle="#0088ff",a.fillRect(40,40,432,60),a.fillStyle="#00ffff",a.font="24px monospace",a.fillText("CLASSIFIED // AI REVIEW",60,78),a.fillStyle="#003366";for(let l=0;l<30;l++){let f=140+l*28;a.fillRect(40,f,432-Math.random()*200,12)}a.strokeStyle="#ff0033",a.lineWidth=5,a.beginPath(),a.arc(400,850,60,0,Math.PI*2),a.stroke(),a.beginPath(),a.arc(400,850,50,0,Math.PI*2),a.stroke();const c=new it(s.current);return c.colorSpace=V,c},[]),n=i.useMemo(()=>Array.from({length:50}).map((a,c)=>({delay:c*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-400+Math.random()*200})),[50]);return g((a,c)=>{const l=a.clock.elapsedTime;n.forEach((f,u)=>{const d=t.current[u];d&&(l>f.delay&&(f.state==="waiting"&&(f.state="approaching"),f.state==="approaching"&&(f.x-=8e3*c,f.x<=0&&(f.x=0,f.state="scanning",f.scanTimer=l)),f.state==="scanning"&&l-f.scanTimer>.05&&(f.state="approved"),f.state==="approved"&&(f.x-=8e3*c,f.x<-3e3&&(f.x=3e3+Math.random()*500,f.state="approaching",f.y=(Math.random()-.5)*150-50))),d.position.set(f.x,f.y,f.z),f.state==="scanning"?(d.rotation.set(0,0,0),d.scale.setScalar(1.2)):f.state==="approved"?(d.rotation.set(0,.4,0),d.scale.setScalar(1)):(d.rotation.set(0,-.4,0),d.scale.setScalar(1)),f.state==="scanning"?d.color.set("#ffffff"):f.state==="approved"?d.color.set("#00ff66"):d.color.set("#0088ff"))})}),e.jsxs(cs,{limit:50,range:50,children:[e.jsx("planeGeometry",{args:[100,200]}),e.jsx("meshBasicMaterial",{map:r,side:D,transparent:!0,opacity:.9,blending:L,depthWrite:!1}),n.map((a,c)=>e.jsx(mt,{ref:l=>t.current[c]=l,position:[a.x,a.y,a.z]},c))]})},Cs=()=>{const o=X(A,"/legal_eagle_courtroom_bg.jpg");return o.colorSpace=V,e.jsxs("group",{children:[e.jsxs("mesh",{position:[0,0,-2500],children:[e.jsx("planeGeometry",{args:[8e3,4500]}),e.jsx("meshBasicMaterial",{map:o,depthWrite:!1,transparent:!0,opacity:.3})]}),[-1,1].map((t,s)=>e.jsxs("mesh",{position:[t*800,0,-1e3],children:[e.jsx("boxGeometry",{args:[400,4e3,400]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.2})]},s)),[-1,1].map((t,s)=>e.jsxs("mesh",{position:[t*1400,0,-1500],children:[e.jsx("boxGeometry",{args:[600,4e3,600]}),e.jsx("meshStandardMaterial",{color:"#030303",metalness:.9,roughness:.3})]},s+2))]})},ks=({logoTex:o})=>{const t=i.useMemo(()=>({uTime:{value:0}}),[]),s=i.useMemo(()=>({uTime:{value:0},uColor:{value:new E("#00ffff")}}),[]);return g(r=>{t.uTime.value=r.clock.elapsedTime,s.uTime.value=r.clock.elapsedTime}),e.jsxs("group",{position:[0,-100,-800],children:[e.jsxs("mesh",{position:[0,-200,0],children:[e.jsx("boxGeometry",{args:[1200,600,400]}),e.jsx("meshStandardMaterial",{color:"#020202",metalness:1,roughness:.1})]}),e.jsxs("mesh",{position:[0,150,0],children:[e.jsx("boxGeometry",{args:[800,100,300]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.8,roughness:.2})]}),e.jsxs(at,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[e.jsxs("mesh",{position:[0,400,0],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1,blending:L})]}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,150,0],fontSize:100,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"})]})]})},Gs=({position:o,rotation:t,visible:s})=>{const r=X(A,"/legal_eagle_logo.png");return r.colorSpace=V,e.jsxs("group",{visible:s,position:o,rotation:t,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[0,1e3,1e3],intensity:1.5,color:"#00ffff"}),e.jsx("pointLight",{position:[0,500,-400],intensity:2,color:"#0044ff",distance:2e3}),e.jsx(Cs,{}),e.jsx(ks,{logoTex:r}),e.jsx(Is,{}),e.jsx(we,{appId:"legaleagle",position:[200,100,-200]})]})},ke=o=>{const s=new Ft;o==="interceptor"?(s.moveTo(1*1.8,0),s.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),s.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),s.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),s.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):o==="viper"?(s.moveTo(1*1.2,1*.3),s.lineTo(1*.4,1*.4),s.lineTo(-1*.8,1*1.2),s.lineTo(-1*1.2,1*.8),s.lineTo(-1*.8,0),s.lineTo(-1*1.2,-1*.8),s.lineTo(-1*.8,-1*1.2),s.lineTo(1*.4,-1*.4),s.lineTo(1*1.2,-1*.3),s.lineTo(1*.6,0)):o==="bulwark"&&(s.moveTo(1*1.5,0),s.lineTo(1*.8,1*1.2),s.lineTo(-1*.5,1*1.5),s.lineTo(-1*1.5,1*.8),s.lineTo(-1*1.5,-1*.8),s.lineTo(-1*.5,-1*1.5),s.lineTo(1*.8,-1*1.2));const r={steps:1,depth:o==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},n=new Bt(s,r);return n.center(),n.rotateY(-Math.PI/2),n.rotateZ(-Math.PI/2),n},Ls=({position:o})=>{const t=i.useRef();return g((s,r)=>{t.current&&(t.current.rotation.z-=r*.1,t.current.rotation.x=Math.sin(s.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:t,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,300,32]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[400,40,32,64]}),e.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((s,r)=>e.jsxs("mesh",{position:[Math.cos(s)*200,0,Math.sin(s)*200],rotation:[0,-s,Math.PI/2],children:[e.jsx("cylinderGeometry",{args:[20,20,300,16]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},r)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((s,r)=>e.jsxs("mesh",{position:[Math.cos(s)*400,0,Math.sin(s)*400],rotation:[Math.PI/2,0,-s],children:[e.jsx("boxGeometry",{args:[60,60,90]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${r}`))]})},_s=({position:o})=>{const t=i.useRef(),s=i.useMemo(()=>ke("bulwark"),[]);return g((r,n)=>{t.current&&(t.current.position.y=Math.sin(r.clock.elapsedTime*.2)*40,t.current.rotation.y+=n*.05,t.current.rotation.z=Math.sin(r.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:t,scale:[120,120,120],children:[e.jsx("mesh",{geometry:s,children:e.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),e.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),e.jsxs("mesh",{position:[0,0,1.5],children:[e.jsx("sphereGeometry",{args:[.2,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},As=({position:o})=>{const a=i.useMemo(()=>new Q,[]),c=i.useMemo(()=>new Q,[]),l=i.useRef(),f=i.useRef(),u=i.useRef(),d=i.useRef(),m=i.useMemo(()=>ke("interceptor"),[]),p=i.useMemo(()=>ke("viper"),[]),x=i.useMemo(()=>{const w=new Et(.5,.5,20,4);return w.rotateX(Math.PI/2),w},[]),M=i.useMemo(()=>Array.from({length:80},(w,R)=>{const C=R>=40;return{pos:new P((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new P,target:new P,team:C?1:0,meshIndex:C?R-40:R,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),j=i.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new P,vel:new P,color:new E,life:0})),[60]),y=i.useMemo(()=>new P,[]),b=i.useMemo(()=>new P,[]),v=i.useMemo(()=>new E,[]);return g((w,R)=>{if(!l.current||!f.current||!u.current||!d.current)return;let C=0;M.forEach(h=>{if(h.state===0){if(Math.random()<.02||h.target.lengthSq()===0){const G=M[Math.floor(Math.random()*80)];G&&G.team!==h.team&&G.state===0?(h.target.copy(G.pos),h.target.x+=(Math.random()-.5)*200,h.target.y+=(Math.random()-.5)*200,h.target.z+=(Math.random()-.5)*200):h.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}y.subVectors(h.target,h.pos);const _=y.length();if(_>150&&_<800&&Math.random()<.03){const G=j.find(I=>!I.active);G&&(G.active=!0,G.pos.copy(h.pos),G.vel.copy(y).normalize().multiplyScalar(2500),G.color.set(h.team===0?"#00ffff":"#ff3300"),G.life=.8)}const k=y.normalize().multiplyScalar(400*R);h.vel.add(k),h.vel.clampLength(0,600),h.pos.addScaledVector(h.vel,R),h.trail.push(h.pos.clone()),h.trail.length>5&&h.trail.shift(),a.position.copy(h.pos);const S=a.position.clone().add(h.vel);a.lookAt(S),b.copy(k).cross(h.vel),a.rotateZ(b.y*.01),a.scale.set(30,30,30)}else{h.explosionTimer+=R,a.position.copy(h.pos),a.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const _=30*Math.max(.1,1-h.explosionTimer*2);a.scale.set(_,_,_),h.explosionTimer>.5&&(h.state=0,h.health=100,h.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),h.vel.set(0,0,0),h.trail=[])}a.updateMatrix(),h.team===0?(l.current.setMatrixAt(h.meshIndex,a.matrix),v.set(h.state===0?"#00aaff":"#ffaa00"),l.current.setColorAt(h.meshIndex,v)):(f.current.setMatrixAt(h.meshIndex,a.matrix),v.set(h.state===0?"#ff0033":"#ffaa00"),f.current.setColorAt(h.meshIndex,v)),h.trail.forEach((_,k)=>{if(C<400){a.position.copy(_),a.rotation.set(0,0,0);const S=k/5*10;a.scale.set(S,S,S),a.updateMatrix(),d.current.setMatrixAt(C,a.matrix),v.set(h.team===0?"#00ffff":"#ff5500"),d.current.setColorAt(C,v),C++}})});for(let h=C;h<400;h++)a.position.set(0,9999,0),a.scale.set(0,0,0),a.updateMatrix(),d.current.setMatrixAt(h,a.matrix);j.forEach((h,_)=>{h.active?(h.pos.addScaledVector(h.vel,R),h.life-=R,M.forEach(k=>{k.state===0&&h.pos.distanceTo(k.pos)<50&&(k.health-=50,h.active=!1,k.health<=0&&(k.state=1,k.explosionTimer=0))}),h.life<=0&&(h.active=!1),c.position.copy(h.pos),c.lookAt(c.position.clone().add(h.vel)),c.scale.set(1,1,1)):(c.position.set(0,9999,0),c.scale.set(0,0,0)),c.updateMatrix(),u.current.setMatrixAt(_,c.matrix),u.current.setColorAt(_,h.color)}),l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),d.current.instanceMatrix.needsUpdate=!0,d.current.instanceColor&&(d.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0)}),e.jsxs("group",{position:o,children:[e.jsx("instancedMesh",{ref:l,args:[m,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:f,args:[p,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:u,args:[x,null,60],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:L})}),e.jsx("instancedMesh",{ref:d,args:[new Wt(1,4,4),null,400],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:L,depthWrite:!1})})]})},Es=({position:o,rotation:t,visible:s})=>{const r=X(A,"/interstellar_logo_final.png");r.colorSpace=V;const n=B(),a=i.useRef({triggered:!1});return g(()=>{n&&n.offset>=.2&&n.offset<=.22&&!a.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,a.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),e.jsxs("group",{visible:s,position:o,rotation:t,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),e.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),e.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:W})]}),e.jsx(Ls,{position:[0,-200,-800]}),e.jsx(_s,{position:[0,-120,-100]}),e.jsx(As,{position:[0,-50,0]}),e.jsxs("group",{position:[0,120,200],children:[e.jsxs("mesh",{position:[0,50,0],children:[e.jsx("planeGeometry",{args:[180,180]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,depthWrite:!1})]}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),e.jsx(we,{appId:"interstellar",position:[-150,100,200]})]})},Ws=({position:o})=>{const t=i.useRef(),s=i.useMemo(()=>({uTime:{value:0},uColor:{value:new E("#00ffff")}}),[]);return g(r=>{t.current&&(t.current.uniforms.uTime.value=r.clock.elapsedTime)}),e.jsxs("mesh",{position:o,children:[e.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),e.jsx("shaderMaterial",{ref:t,transparent:!0,side:D,blending:L,depthWrite:!1,uniforms:s,vertexShader:`
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
        `})]})},Fs=()=>{const o=i.useRef(),t=i.useMemo(()=>({uTime:{value:0},uColor:{value:new E("#0044ff")},uHighlight:{value:new E("#00ffff")}}),[]);return g(s=>{o.current&&(o.current.uniforms.uTime.value=s.clock.elapsedTime)}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),e.jsx("shaderMaterial",{ref:o,transparent:!0,wireframe:!0,uniforms:t,vertexShader:`
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
        `})]})},Bs=({position:o,rotation:t,visible:s})=>{const[r,n]=i.useState(null);return i.useEffect(()=>{new A().load("/cloveh2o_logo.png",c=>{c.colorSpace=V,n(c)})},[]),e.jsxs("group",{visible:s,position:o,rotation:t,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:W})]}),e.jsx(Fs,{}),e.jsx(Ws,{position:[0,1800,-800]}),e.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),e.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),e.jsxs("group",{position:[0,0,-300],children:[r&&e.jsxs("mesh",{position:[0,80,0],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,depthWrite:!1,blending:L})]}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},ve=({color:o,number:t,groupRef:s,armRef:r})=>e.jsxs("group",{ref:s,children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.3,roughness:.4})]}),e.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("group",{position:[0,17,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2.8,32,32]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.8,metalness:.5})]}),e.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[e.jsx("boxGeometry",{args:[3.5,2,2]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),e.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:r,children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsxs("mesh",{position:[-1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),e.jsxs("mesh",{position:[1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),t&&e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:t})]}),Us=({position:o})=>{const t=i.useRef(),s=i.useRef(),r=i.useRef(),n=i.useRef(),a=i.useRef(),c=i.useRef(),l=i.useMemo(()=>new P(100,0,0),[]),f=i.useMemo(()=>new P(100,0,20),[]),u=i.useMemo(()=>new P(30,0,100),[]),d=i.useMemo(()=>new P(0,0,-20),[]),m=i.useMemo(()=>new P(20,0,220),[]),p=i.useMemo(()=>new P,[]),x=i.useMemo(()=>new P,[]);return i.useMemo(()=>new P,[]),g(M=>{const j=M.clock.elapsedTime%6;if(r.current&&r.current.rotation.set(0,0,-.3),j<.5)s.current&&s.current.position.copy(l),n.current&&n.current.position.copy(f),a.current&&a.current.position.copy(u),t.current&&t.current.position.copy(d),c.current&&c.current.position.copy(d).add(p.set(4.5,12,2));else if(j<4){const y=(j-.5)/3.5;if(s.current&&(y<.5?s.current.position.lerpVectors(l,p.set(100,0,110),y*2):s.current.position.lerpVectors(x.set(100,0,110),m,(y-.5)*2)),n.current&&s.current&&n.current.position.lerpVectors(f,p.set(m.x+8,0,m.z-8),y),a.current&&a.current.position.lerpVectors(u,p.set(m.x-8,0,m.z+8),y),c.current)if(j<1.5)c.current.position.copy(d).add(p.set(4.5,12,2));else{const b=(j-1.5)/2.5,v=Math.sin(b*Math.PI)*45;c.current.position.lerpVectors(d,m,b),c.current.position.y+=v+18}}else if(j<5)s.current&&s.current.position.lerpVectors(m,p.set(20,0,240),j-4),c.current&&s.current&&c.current.position.copy(s.current.position).add(p.set(0,12,3)),n.current&&(n.current.position.y=0),a.current&&(a.current.position.y=0);else if(j<5.5)r.current&&r.current.rotation.set(Math.PI,0,0),c.current&&s.current&&c.current.position.copy(s.current.position).add(p.set(4.5,20,0));else if(r.current&&r.current.rotation.set(-Math.PI/4,0,0),c.current&&s.current){const y=j-5.5,b=Math.abs(Math.cos(y*8))*10;c.current.position.copy(s.current.position).add(p.set(4.5,b,4))}}),e.jsxs("group",{position:o,children:[e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),e.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[e.jsx("planeGeometry",{args:[400,40]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),e.jsx(ve,{color:"#0088ff",number:"QB",groupRef:t}),e.jsx(ve,{color:"#00ffff",number:"80",groupRef:s,armRef:r}),e.jsx(ve,{color:"#ff0044",number:"CB",groupRef:n}),e.jsx(ve,{color:"#ff0044",number:"S",groupRef:a}),e.jsxs("mesh",{ref:c,children:[e.jsx("sphereGeometry",{args:[2,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},Hs=()=>e.jsxs("group",{position:[0,300,-300],rotation:[.1,0,0],children:[e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("boxGeometry",{args:[800,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[0,0,10.1],children:[e.jsx("planeGeometry",{args:[790,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-580,0,150],rotation:[0,Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-571,0,155],rotation:[0,Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[580,0,150],rotation:[0,-Math.PI/6,0],children:[e.jsx("boxGeometry",{args:[400,300,20]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[571,0,155],rotation:[0,-Math.PI/6,0],children:[e.jsx("planeGeometry",{args:[390,290]}),e.jsx("meshBasicMaterial",{color:"#001100"})]}),e.jsxs("mesh",{position:[-390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsxs("mesh",{position:[390,150,0],children:[e.jsx("boxGeometry",{args:[20,20,20]}),e.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),e.jsx("gridHelper",{args:[800,80,"#00ff00","#004400"],position:[0,0,11],rotation:[Math.PI/2,0,0]}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,80,15],fontSize:70,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ff00",anchorX:"center",anchorY:"middle",children:"FANTASY QUANT"}),e.jsxs(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,15],fontSize:35,color:"#00ffff",outlineWidth:.01,outlineColor:"#0088ff",anchorX:"center",anchorY:"middle",children:["PREDICTING: 42 YD PASS ","->"," TOUCHDOWN"]}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,15],fontSize:22,color:"#ffffff",maxWidth:750,textAlign:"center",lineHeight:1.5,anchorX:"center",anchorY:"middle",children:'"This is going to Rice, WR #80, post route contested catch in traffic over the safety and cornerback... TOUCHDOWN!!"'}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-580,40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"WIN PROB: 94%"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-580,-40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"EXPECTED PTS: +6.0"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[580,40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"DEF COVERAGE: COVER 2"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[580,-40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"MISMATCH DETECTED"})]}),Os=()=>{const t=[];for(let n=0;n<20;n++){const a=600+n*80,c=n*40-100;t.push(e.jsxs("mesh",{position:[0,c,0],rotation:[Math.PI/2,0,0],children:[e.jsx("torusGeometry",{args:[a,20,16,100,Math.PI*1.5]}),e.jsx("meshStandardMaterial",{color:"#222222",roughness:.9})]},`ring-${n}`))}const s=i.useRef(),r=1e4;return i.useEffect(()=>{if(!s.current)return;const n=new Q,a=new E,c=["#ff0044","#0044ff","#ffffff","#00ff00","#ffaa00"];let l=0;for(let f=0;f<20;f++){const u=600+f*80,d=f*40-100,m=Math.floor(u*Math.PI*1.5/10);for(let p=0;p<m&&!(l>=r);p++){const x=p/m*Math.PI*1.5;n.position.set(Math.cos(x)*u,d+15,Math.sin(x)*u),n.position.x+=(Math.random()-.5)*5,n.position.z+=(Math.random()-.5)*5,n.updateMatrix(),s.current.setMatrixAt(l,n.matrix),a.set(c[Math.floor(Math.random()*c.length)]),s.current.setColorAt(l,a),l++}}s.current.instanceMatrix.needsUpdate=!0,s.current.instanceColor&&(s.current.instanceColor.needsUpdate=!0)},[]),e.jsxs("group",{rotation:[0,Math.PI*1.25,0],children:[t,e.jsxs("instancedMesh",{ref:s,args:[null,null,r],children:[e.jsx("boxGeometry",{args:[8,15,8]}),e.jsx("meshStandardMaterial",{roughness:.8})]})]})},Ds=({position:o,rotation:t,visible:s})=>{const r=X(A,"/fantasy_quant_stadium.jpg");return r.colorSpace=V,r.wrapS=ce,r.repeat.set(-1,1),e.jsxs("group",{visible:s,position:o,rotation:t,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[3e3,32,32]}),e.jsx("meshBasicMaterial",{map:r,side:W})]}),e.jsx(Os,{}),e.jsx(Us,{position:[0,-120,100]}),e.jsx("ambientLight",{intensity:.5,color:"#00ff00"}),e.jsx("pointLight",{color:"#00ff00",intensity:3,distance:2e3,position:[0,500,500]}),e.jsx("pointLight",{color:"#0088ff",intensity:2,distance:2e3,position:[0,500,-500]}),e.jsx(Hs,{})]})},Vs=()=>{const o=i.useRef(),t=i.useMemo(()=>Array.from({length:150}).map(()=>({x:(Math.random()-.5)*400,y:(Math.random()-.5)*400,z:Math.random()*2e3,speed:10+Math.random()*20})),[]);return g(()=>{o.current&&o.current.children.forEach((s,r)=>{s.position.z+=t[r].speed,s.position.z>500&&(s.position.z-=2e3)})}),e.jsx("group",{ref:o,children:t.map((s,r)=>e.jsxs("mesh",{position:[s.x,s.y,s.z],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[.2,.2,100,4]}),e.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.3})]},r))})},Ns=({worldPosition:o})=>{const t=i.useRef(),s=X(A,"/assets/images/contango_quant_logo_new.png");return g(r=>{if(t.current){const a=r.camera.position.clone().sub(new P(...o));t.current.position.copy(a),t.current.rotation.copy(r.camera.rotation)}}),e.jsxs("group",{ref:t,children:[e.jsxs("group",{position:[0,-15,0],children:[e.jsxs("mesh",{position:[0,-2,-15],rotation:[.2,0,0],children:[e.jsx("boxGeometry",{args:[40,5,2]}),e.jsx("meshStandardMaterial",{color:"#111",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[-20,2,-10],rotation:[0,Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[20,2,-10],rotation:[0,-Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[2,10,15]}),e.jsx("meshStandardMaterial",{color:"#222"})]}),e.jsxs("mesh",{position:[0,-5,10],children:[e.jsx("boxGeometry",{args:[38,20,2]}),e.jsx("meshStandardMaterial",{color:"#0a0a0a",roughness:.8})]})]}),e.jsxs("group",{position:[0,5,-50],children:[e.jsxs("mesh",{position:[0,15,0],children:[e.jsx("planeGeometry",{args:[40,20]}),e.jsx("meshBasicMaterial",{map:s,transparent:!0,opacity:.9,depthWrite:!1})]}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-2,0],fontSize:6,color:"#ffffff",anchorX:"center",outlineWidth:.05,outlineColor:"#000000",children:"CONTANGO QUANT"}),e.jsx(T,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-9,0],fontSize:3,color:"#ffffff",anchorX:"center",opacity:.9,transparent:!0,children:"Quant Trading Systems"})]})]})},Ys=({worldPosition:o})=>{const t=i.useRef(),s=i.useMemo(()=>Array.from({length:800}).map(()=>{const r=Math.random()>.5,n=20+Math.random()*80,a=n+Math.random()*40,c=Math.random()*Math.PI*2,l=60+Math.random()*200;return{x:Math.cos(c)*l,y:Math.sin(c)*l,z:(Math.random()-.5)*12e3,isGreen:r,height:n,wickHeight:a,speed:15+Math.random()*25}}),[]);return g(r=>{if(t.current){const a=r.camera.position.clone().sub(new P(...o));t.current.position.copy(a),t.current.children.forEach((c,l)=>{c.position.z+=s[l].speed,c.position.z>2e3&&(c.position.z-=12e3)})}}),e.jsx("group",{ref:t,children:s.map((r,n)=>e.jsxs("group",{position:[r.x,r.y,r.z],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[1,1,r.wickHeight,4]}),e.jsx("meshStandardMaterial",{color:r.isGreen?"#00ff00":"#ff0044",emissive:r.isGreen?"#00ff00":"#ff0044",emissiveIntensity:2})]}),e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[8,r.height,8]}),e.jsx("meshStandardMaterial",{color:r.isGreen?"#00ff00":"#ff0044",transparent:!0,opacity:.9,emissive:r.isGreen?"#00aa00":"#aa0022",emissiveIntensity:.8})]})]},n))})},qs=({position:o,rotation:t,visible:s})=>{const r=B(),[n,a]=i.useState(!1);return g(()=>{s&&(r.offset>.465&&r.offset<.475&&!n&&!window.contangoLocked&&(window.contangoLocked=!0,a(!0),setTimeout(()=>{window.contangoLocked=!1},4e3)),(r.offset<.45||r.offset>.49)&&n&&(a(!1),window.contangoLocked=!1))}),e.jsxs("group",{visible:s,position:o,rotation:t,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000205",side:W})]}),e.jsx(Vs,{}),s&&e.jsx(Ys,{worldPosition:o}),s&&e.jsx(Ns,{worldPosition:o}),e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[0,50,-100],intensity:2,color:"#00ffcc",distance:500})]})},Xs=({position:o,rotation:t,visible:s})=>{const r=i.useRef(),n=i.useRef(),a=X(A,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return g(c=>{r.current&&(r.current.position.y=Math.sin(c.clock.elapsedTime*1.5)*5),n.current&&(n.current.rotation.y+=.005,n.current.rotation.z+=.002)}),e.jsxs("group",{visible:s,position:o,rotation:t,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1500,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:W})]}),e.jsxs("group",{children:[e.jsx(at,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:e.jsxs("mesh",{ref:r,position:[0,0,-500],children:[e.jsx("planeGeometry",{args:[400,100]})," ",e.jsx("meshBasicMaterial",{map:a,transparent:!0,opacity:1,side:D,depthWrite:!1})]})}),e.jsx(le,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),e.jsx(le,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),e.jsx("ambientLight",{intensity:.5,color:"#002244"}),e.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})};function Zs({position:o,visible:t}){const s=i.useRef(),r=i.useRef(),n=i.useRef();return g(a=>{if(!t)return;const c=a.clock.getElapsedTime();if(s.current){const l=Math.sin(c*2.5);s.current.position.x=l*150,s.current.position.y=-100+Math.cos(c*15)*2,s.current.rotation.z=-l*.8,s.current.rotation.y=l*.5,s.current.rotation.x=.3}n.current&&(n.current.position.y=c*1e3%100)}),t?e.jsxs("group",{position:o,children:[e.jsx("ambientLight",{intensity:.1,color:"#4488ff"}),e.jsx("directionalLight",{position:[-1e3,500,-500],intensity:2,color:"#ccffff",castShadow:!0}),e.jsx("pointLight",{position:[0,200,-300],intensity:10,distance:1e3,color:"#ffaa00"}),e.jsxs("group",{position:[0,-200,-800],rotation:[-Math.PI/2+.2,0,0],children:[e.jsxs("mesh",{ref:r,children:[e.jsx("planeGeometry",{args:[4e3,8e3,1,1]}),e.jsx("meshStandardMaterial",{color:"#050a14",roughness:.4,metalness:.8})]}),e.jsxs("mesh",{ref:n,position:[0,0,1],children:[e.jsx("planeGeometry",{args:[4e3,8e3,40,80]}),e.jsx("meshBasicMaterial",{color:"#00ffcc",wireframe:!0,transparent:!0,opacity:.1})]})]}),e.jsx(le,{count:1500,scale:[2e3,500,3e3],size:15,speed:10,opacity:.6,color:"#ffffff",position:[0,0,-500]}),e.jsxs("group",{ref:s,position:[0,-100,-400],children:[e.jsxs("mesh",{position:[0,-10,0],rotation:[0,Math.PI/2,0],children:[e.jsx("boxGeometry",{args:[120,2,24]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:.1})]}),e.jsxs("mesh",{position:[0,-10,0],rotation:[0,Math.PI/2,0],children:[e.jsx("boxGeometry",{args:[122,.5,26]}),e.jsx("meshBasicMaterial",{color:"#00ffcc",transparent:!0,opacity:.8})]}),e.jsxs("group",{position:[0,0,0],children:[e.jsxs("mesh",{position:[0,20,5],rotation:[.4,0,0],children:[e.jsx("capsuleGeometry",{args:[12,35,32,32]}),e.jsx("meshStandardMaterial",{color:"#020202",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[0,55,15],rotation:[-.2,0,0],children:[e.jsx("sphereGeometry",{args:[10,32,32]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0})]}),e.jsxs("mesh",{position:[0,55,23],rotation:[-.2,0,0],children:[e.jsx("boxGeometry",{args:[14,4,2]}),e.jsx("meshBasicMaterial",{color:"#ff3300"}),e.jsx("pointLight",{color:"#ff3300",intensity:5,distance:200})]})]}),e.jsxs("mesh",{position:[0,-10,60],children:[e.jsx("sphereGeometry",{args:[8,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffcc",transparent:!0,opacity:.8}),e.jsx("pointLight",{color:"#00ffcc",intensity:2,distance:100})]})]})]}):null}function $s({position:o,visible:t}){const s=i.useRef(),r=i.useRef();return g(n=>{if(!t)return;const a=n.clock.getElapsedTime();s.current&&(s.current.rotation.y=a*.05),r.current&&(r.current.rotation.y=a*.2)}),t?e.jsxs("group",{position:o,children:[e.jsx("ambientLight",{intensity:.1,color:"#001133"}),e.jsx("directionalLight",{position:[-500,200,500],intensity:2,color:"#ccddff"}),e.jsxs("mesh",{ref:s,position:[0,-2500,-4e3],children:[e.jsx("sphereGeometry",{args:[2e3,64,64]}),e.jsx("meshStandardMaterial",{color:"#001122",roughness:.8,metalness:.2,wireframe:!0}),e.jsx("pointLight",{position:[0,2100,0],intensity:5,distance:4e3,color:"#0055ff"})]}),e.jsxs("group",{position:[0,-50,-800],children:[e.jsxs("group",{rotation:[0,-Math.PI/8,0],children:[e.jsxs("mesh",{position:[0,-25,0],children:[e.jsx("boxGeometry",{args:[100,50,180]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]}),e.jsxs("mesh",{position:[-30,-40,100],children:[e.jsx("boxGeometry",{args:[30,20,60]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]}),e.jsxs("mesh",{position:[30,-40,100],children:[e.jsx("boxGeometry",{args:[30,20,60]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]}),e.jsxs("mesh",{position:[0,40,70],children:[e.jsx("sphereGeometry",{args:[40,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]}),e.jsxs("mesh",{position:[0,40,60],rotation:[.2,0,0],children:[e.jsx("boxGeometry",{args:[110,80,40]}),e.jsx("meshStandardMaterial",{color:"#ffcc00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]}),e.jsx("pointLight",{position:[0,0,0],intensity:10,color:"#ffaa00",distance:500}),e.jsxs("mesh",{position:[0,-200,0],children:[e.jsx("coneGeometry",{args:[200,400,16]}),e.jsx("meshBasicMaterial",{color:"#ffaa00",transparent:!0,opacity:.1,blending:L,depthWrite:!1})]})]})]}):null}function Qs({position:o,visible:t}){const s=i.useRef(),r=2e3,n=i.useMemo(()=>new Q,[]);return g(a=>{if(!t||!s.current)return;const c=a.clock.getElapsedTime();for(let l=0;l<r;l++){const f=l%40,u=Math.floor(l/40),d=(f-20)*15,p=-400+(u*15+c*200)%800;let x=300;p>0&&(x=300-Math.pow(p*.1,2)),x<-200&&(x=-200+Math.abs(Math.sin(c*10+l)*20)),n.position.set(d,x,p),n.rotation.x=c*2+l,n.rotation.y=c*3+l,n.updateMatrix(),s.current.setMatrixAt(l,n.matrix)}s.current.instanceMatrix.needsUpdate=!0}),t?e.jsxs("group",{position:o,children:[e.jsx("ambientLight",{intensity:.2,color:"#111111"}),e.jsx("spotLight",{position:[0,800,-200],angle:.5,penumbra:.5,intensity:5,color:"#ffdd77",castShadow:!0}),e.jsxs("mesh",{position:[0,-250,0],children:[e.jsx("boxGeometry",{args:[1e3,100,1e3]}),e.jsx("meshStandardMaterial",{color:"#222",roughness:.7,metalness:.8})]}),e.jsxs("mesh",{position:[0,100,-450],children:[e.jsx("boxGeometry",{args:[800,800,100]}),e.jsx("meshStandardMaterial",{color:"#111",roughness:.8,metalness:.9})]}),e.jsxs("instancedMesh",{ref:s,args:[null,null,r],children:[e.jsx("cylinderGeometry",{args:[5,5,2,16]}),e.jsx("meshStandardMaterial",{color:"#ffd700",metalness:1,roughness:.2,emissive:"#554400"})]})]}):null}function Ks({position:o,visible:t}){const s=i.useRef();return g(r=>{if(!t)return;const n=r.clock.getElapsedTime();s.current&&(s.current.position.y=Math.sin(n*1.5)*2,s.current.rotation.y=Math.sin(n*.5)*.1)}),t?e.jsxs("group",{position:o,children:[e.jsx("ambientLight",{intensity:.4,color:"#ff9955"}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ff7722"}),e.jsx("directionalLight",{position:[-1e3,300,-500],intensity:1.5,color:"#4488ff"}),e.jsx(le,{count:1e3,scale:1500,size:15,speed:.2,opacity:.6,color:"#ffddaa",position:[0,100,-500]}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[4e3,4e3]}),e.jsx("meshStandardMaterial",{color:"#050a11",roughness:.1,metalness:.9,transparent:!0,opacity:.9})]}),e.jsxs("group",{position:[0,100,-800],children:[e.jsxs("group",{ref:s,children:[e.jsxs("mesh",{rotation:[Math.PI/4,0,0],children:[e.jsx("torusGeometry",{args:[300,2,32,128]}),e.jsx("meshStandardMaterial",{color:"#ffccaa",emissive:"#ff8833",emissiveIntensity:1.5})]}),e.jsxs("mesh",{rotation:[-Math.PI/4,Math.PI/2,0],children:[e.jsx("torusGeometry",{args:[250,4,32,128]}),e.jsx("meshStandardMaterial",{color:"#ffccaa",emissive:"#ffaa55",emissiveIntensity:2})]}),e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[80,64,64]}),e.jsx("meshStandardMaterial",{color:"#ffffff",emissive:"#ffddaa",emissiveIntensity:3})]}),e.jsx("pointLight",{intensity:10,distance:1500,color:"#ff9944"})]}),e.jsxs("group",{position:[0,-250,200],children:[e.jsxs("mesh",{position:[-150,0,0],children:[e.jsx("cylinderGeometry",{args:[50,40,10,64]}),e.jsx("meshStandardMaterial",{color:"#111111",metalness:.8,roughness:.2,emissive:"#221100"})]}),e.jsxs("mesh",{position:[150,0,0],children:[e.jsx("cylinderGeometry",{args:[50,40,10,64]}),e.jsx("meshStandardMaterial",{color:"#111111",metalness:.8,roughness:.2,emissive:"#221100"})]}),e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("boxGeometry",{args:[200,5,40]}),e.jsx("meshStandardMaterial",{color:"#111111",metalness:.8,roughness:.2})]})]}),e.jsxs("mesh",{position:[0,-290,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[400,64]}),e.jsx("meshBasicMaterial",{color:"#ffaa55",transparent:!0,opacity:.1})]})]})]}):null}const Js=`
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
`,er=`
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
`;function tr({position:o,visible:t}){const s=i.useRef(),r=i.useMemo(()=>{const n=new Ut,a=1e4,c=new Float32Array(a*3);for(let l=0;l<a;l++){const f=l/a,u=f*Math.PI*100,d=100*Math.sin(f*Math.PI);let m=d*Math.cos(u),p=d*Math.cos(f*Math.PI)*.8,x=d*Math.sin(u);m+=(Math.random()-.5)*20,p+=(Math.random()-.5)*20,x+=(Math.random()-.5)*20,m>0?m+=10:m-=10,c[l*3]=m,c[l*3+1]=p,c[l*3+2]=x}return n.setAttribute("position",new Ht(c,3)),n},[]);return g(n=>{if(!t)return;const a=n.clock.getElapsedTime();s.current&&(s.current.rotation.y=a*.2,s.current.material.uniforms.uTime.value=a)}),t?e.jsxs("group",{position:o,children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[0,0,-150],intensity:20,color:"#ffaa00",distance:2e3}),e.jsxs("mesh",{position:[0,0,-300],rotation:[Math.PI/2,0,0],children:[e.jsx("coneGeometry",{args:[1e3,1500,4]}),e.jsx("meshStandardMaterial",{color:"#0a0a0a",roughness:.9,metalness:.1,side:W})]}),e.jsx("points",{ref:s,geometry:r,position:[0,0,-300],children:e.jsx("shaderMaterial",{vertexShader:Js,fragmentShader:er,transparent:!0,depthWrite:!1,blending:L,uniforms:{uTime:{value:0}}})})]}):null}function sr({position:o,visible:t}){const s=i.useRef(),r=i.useRef(),n=400,a=5e3,c=i.useMemo(()=>new Q,[]);return g(l=>{if(!t)return;const f=l.clock.getElapsedTime();if(s.current){for(let u=0;u<n;u++){const d=u%20-10,m=Math.floor(u/20),p=d*80,M=-1e3+(m*100+f*400)%2e3;c.position.set(p,-100,M),c.updateMatrix(),s.current.setMatrixAt(u,c.matrix)}s.current.instanceMatrix.needsUpdate=!0}if(r.current){for(let u=0;u<a;u++){const d=Math.sin(u*123)*1e3,m=Math.cos(u*321)*1e3-500,x=800+(u*10-f*800)%1500;c.position.set(d,x,m),c.scale.set(1,Math.random()*5+1,1),c.updateMatrix(),r.current.setMatrixAt(u,c.matrix)}r.current.instanceMatrix.needsUpdate=!0}}),t?e.jsxs("group",{position:o,children:[e.jsx("ambientLight",{intensity:.3,color:"#004400"}),e.jsx("directionalLight",{position:[0,1e3,500],intensity:1.5,color:"#00ff44"}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[4e3,4e3]}),e.jsx("meshStandardMaterial",{color:"#021102",roughness:.1,metalness:.9,wireframe:!0})]}),e.jsxs("group",{position:[0,200,-800],children:[e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[300,1e3,300]}),e.jsx("meshStandardMaterial",{color:"#002200",metalness:.8,roughness:.2,emissive:"#004411"})]}),e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[320,950,320]}),e.jsx("meshBasicMaterial",{color:"#00ff44",wireframe:!0,transparent:!0,opacity:.3})]}),e.jsx("pointLight",{position:[0,0,400],intensity:20,distance:2e3,color:"#00ff44"})]}),e.jsxs("instancedMesh",{ref:s,args:[null,null,n],children:[e.jsx("boxGeometry",{args:[40,30,20]}),e.jsx("meshStandardMaterial",{color:"#001100",roughness:.8,emissive:"#002200"})]}),e.jsxs("instancedMesh",{ref:r,args:[null,null,a],children:[e.jsx("boxGeometry",{args:[2,20,2]}),e.jsx("meshBasicMaterial",{color:"#00ff44",transparent:!0,opacity:.8,blending:L})]})]}):null}function rr({position:o,visible:t}){const s=i.useRef(),r=i.useRef(),n=i.useRef(),a=1e3,c=50,l=i.useMemo(()=>new Q,[]);return g(f=>{if(!t)return;const u=f.clock.getElapsedTime();if(r.current&&(r.current.position.x=Math.sin(u*3)*100,r.current.position.y=Math.cos(u*2)*50,r.current.rotation.z=Math.sin(u*3)*-.5),s.current){for(let d=0;d<a;d++){const m=d/a*Math.PI*2,p=300+Math.sin(d*100)*100,x=Math.cos(m)*p,M=Math.sin(m)*p,y=(d*10+u*4e3)%4e3-2e3;l.position.set(x,M,y),l.scale.set(1,1,Math.random()*50+10),l.updateMatrix(),s.current.setMatrixAt(d,l.matrix)}s.current.instanceMatrix.needsUpdate=!0}if(n.current){for(let d=0;d<c;d++){const m=Math.sin(d*77)*200,p=Math.cos(d*33)*200,x=(d*100+u*3e3)%4e3-2e3;l.position.set(m,p,x),l.rotation.x=u*2+d,l.rotation.y=u*3+d,l.scale.setScalar(Math.sin(u*10+d)*.5+1),l.updateMatrix(),n.current.setMatrixAt(d,l.matrix)}n.current.instanceMatrix.needsUpdate=!0}}),t?e.jsxs("group",{position:o,children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("directionalLight",{position:[0,0,1e3],intensity:2,color:"#00aaff"}),e.jsxs("group",{ref:r,position:[0,0,-200],children:[e.jsxs("mesh",{children:[e.jsx("coneGeometry",{args:[20,100,4]}),e.jsx("meshStandardMaterial",{color:"#eeeeee",metalness:.9,roughness:.1})]}),e.jsxs("mesh",{position:[0,-50,0],children:[e.jsx("sphereGeometry",{args:[15,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.8,blending:L})]}),e.jsx("pointLight",{position:[0,-60,0],intensity:10,color:"#00ffff",distance:500})]}),e.jsxs("instancedMesh",{ref:n,args:[null,null,c],children:[e.jsx("icosahedronGeometry",{args:[20,0]}),e.jsx("meshStandardMaterial",{color:"#ff0000",emissive:"#aa0000",wireframe:!0})]}),e.jsxs("instancedMesh",{ref:s,args:[null,null,a],children:[e.jsx("cylinderGeometry",{args:[2,2,1,4]}),e.jsx("meshBasicMaterial",{color:"#0088ff",transparent:!0,opacity:.4,blending:L})]})]}):null}const or=({position:o,name:t,color:s,startP:r,targetP:n,endP:a,scrollEl:c,logoUrl:l,logoScale:f=1.578})=>{const u=i.useRef(),[d,m]=i.useState(!1);g(j=>{const y=j.clock.getElapsedTime();if(u.current){u.current.rotation.y+=.01,u.current.position.y=Math.sin(y*2+o[0])*5;const b=d?1.5:1;u.current.scale.lerp(new P(b,b,b),.1)}});const p=j=>{if(j.stopPropagation(),c){c.style.overflow="hidden",window._cancelWarp=!1,window._warpProgress=r,window._snapCamera=!0;const y=n-r,b=2e3,v=performance.now(),w=R=>{if(window._cancelWarp)return;const C=R-v,h=Math.min(C/b,1),_=h<.5?4*h*h*h:1-Math.pow(-2*h+2,3)/2;window._warpProgress=r+y*_,h<1?requestAnimationFrame(w):setTimeout(()=>{if(window._cancelWarp)return;const k=a-n,S=4e3,G=performance.now(),I=be=>{if(window._cancelWarp)return;const Pe=be-G,K=Math.min(Pe/S,1),F=K<.5?2*K*K:1-Math.pow(-2*K+2,2)/2;window._warpProgress=n+k*F,K<1&&requestAnimationFrame(I)};requestAnimationFrame(I)},1500)};requestAnimationFrame(w)}},x=()=>{if(l){const j=Array.isArray(f)?f[0]:f,y=Array.isArray(f)?f[1]:f;return e.jsx("group",{scale:1.2,children:e.jsx(ut,{side:D,url:l,scale:[70*j,70*y],transparent:!0,position:[0,0,0]})})}return e.jsx("group",{scale:3,children:ht(t,s,d)})},M=Ge.useMemo(()=>{const j=new E(s),y={};return j.getHSL(y),new E().setHSL((y.h+.5)%1,Math.min(1,y.s*1.2),Math.max(.5,y.l))},[s]);return e.jsxs("group",{position:o,children:[e.jsxs("group",{ref:u,children:[e.jsxs("mesh",{position:[0,-35,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("ringGeometry",{args:[20,35,32]}),e.jsx("meshBasicMaterial",{color:M,side:D})]}),e.jsxs("group",{onPointerOver:()=>{m(!0),document.body.style.cursor="pointer"},onPointerOut:()=>{m(!1),document.body.style.cursor="auto"},onClick:p,children:[x(),e.jsxs("mesh",{visible:!1,children:[e.jsx("sphereGeometry",{args:[50,16,16]}),e.jsx("meshBasicMaterial",{})]})]})]}),e.jsx(ts,{position:[0,-45,0],center:!0,children:e.jsx("div",{style:{color:"white",fontFamily:"sans-serif",fontSize:"14px",fontWeight:"bold",textTransform:"uppercase",textShadow:"0px 2px 10px rgba(0,0,0,0.8)",textAlign:"center",whiteSpace:"nowrap",pointerEvents:"none",opacity:d?1:.5,transition:"opacity 0.2s"},children:t})})]})},ht=(o,t,s)=>{const r=s?2:.8;switch(o){case"MAYA":return e.jsxs("group",{scale:.5,rotation:[.8,.5,0],children:[e.jsxs("mesh",{position:[0,-10,0],children:[e.jsx("coneGeometry",{args:[30,40,4]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("sphereGeometry",{args:[5,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})]});case"Sphinx":return e.jsxs("group",{scale:.8,rotation:[.8,.5,0],children:[e.jsxs("mesh",{position:[0,-5,0],children:[e.jsx("boxGeometry",{args:[30,10,40]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{position:[0,5,10],children:[e.jsx("sphereGeometry",{args:[10,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})]});case"PyRAmid":return e.jsxs("group",{scale:.7,rotation:[.8,.5,0],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[0,30,40,4]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{position:[0,-5,0],children:[e.jsx("sphereGeometry",{args:[5,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r+1})]})]});case"Helu":return e.jsxs("group",{scale:.8,rotation:[.9,.4,0],children:[e.jsxs("mesh",{position:[0,-10,0],children:[e.jsx("cylinderGeometry",{args:[20,20,2,32]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("sphereGeometry",{args:[6,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{position:[-12,-5,0],children:[e.jsx("boxGeometry",{args:[10,10,10]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{position:[12,-5,0],children:[e.jsx("boxGeometry",{args:[10,10,10]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})]});case"Matrix":return e.jsxs("group",{scale:.6,rotation:[.8,.5,0],children:[e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[30,40,30]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{scale:.8,children:[e.jsx("boxGeometry",{args:[30,40,30]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:1})]})]});case"Liquid":return e.jsxs("group",{rotation:[.6,.3,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[15,32,32]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{scale:.7,children:[e.jsx("sphereGeometry",{args:[15,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:1})]})]});case"LightSpeed":return e.jsxs("group",{rotation:[.8,.5,0],children:[e.jsxs("mesh",{rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[15,15,40,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{children:[e.jsx("octahedronGeometry",{args:[5]}),e.jsx("meshStandardMaterial",{color:"#ffffff",emissive:"#ffffff",emissiveIntensity:r+1})]})]});case"MindWave":return e.jsx("group",{scale:.8,rotation:[.8,.4,0],children:e.jsxs("mesh",{children:[e.jsx("icosahedronGeometry",{args:[20,1]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})});case"Interstellar":return e.jsx("group",{scale:.5,rotation:[.8,.6,0],children:e.jsxs("mesh",{children:[e.jsx("torusKnotGeometry",{args:[15,5,100,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})});case"Legal Eagle":return e.jsx("group",{scale:.8,rotation:[.8,.5,0],children:e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[20,30,20]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})});case"Autopilot":return e.jsx("group",{scale:.6,rotation:[.8,.4,0],children:e.jsxs("mesh",{rotation:[Math.PI/2,0,0],children:[e.jsx("coneGeometry",{args:[15,40,3]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})});case"CloveH2O":return e.jsxs("group",{scale:.8,rotation:[.8,.4,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[20,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[10,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})]});case"FantasyQuant":return e.jsx("group",{scale:.8,rotation:[.8,.5,0],children:e.jsxs("mesh",{rotation:[Math.PI/4,0,0],children:[e.jsx("cylinderGeometry",{args:[10,10,40,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})});case"Contango":return e.jsx("group",{scale:.8,rotation:[.8,.5,0],children:e.jsxs("mesh",{children:[e.jsx("dodecahedronGeometry",{args:[20,0]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})});case"Sentaient":return e.jsxs("group",{scale:.6,rotation:[.8,.4,0],children:[e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[20,5,16,32]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]}),e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[10,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})]});default:return e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[15,16,16]}),e.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:r})]})}},Ee=[{name:"MindWave",startP:.13,p:.145,endP:.15,color:"#ff3366",logoUrl:"/mindwave-logo-light.png",description:"Advanced brainwave entrainment studio with binaural beats and immersive visualizations."},{name:"Interstellar",startP:.16,p:.21,endP:.22,color:"#aa55ff",logoUrl:"/interstellar_logo_final.png",description:"Rule your galactic empire by winning battles, collecting resources, and upgrading your bases."},{name:"Legal Eagle",startP:.23,p:.255,endP:.265,color:"#d4af37",logoUrl:"/legal_eagle_logo.png",description:"Eagle-eyed contract review for your peace of mind. AI document analysis proposes new clauses."},{name:"Autopilot",startP:.275,p:.3,endP:.31,color:"#00ffff",logoUrl:"/autopilot_logo.png",description:"Enterprise B2B social media marketing automation platform. AI-driven content creation."},{name:"CloveH2O",startP:.32,p:.36,endP:.37,color:"#ff00ff",logoUrl:"/cloveh2o_logo.png",description:"Next-generation smart hydration and wellness tracking platform."},{name:"FantasyQuant",startP:.37,p:.42,endP:.43,color:"#00ffaa",description:"Next-generation predictive analytics and sports betting intelligence."},{name:"Contango",startP:.44,p:.47,endP:.475,color:"#ff8800",logoUrl:"/assets/images/contango_quant_logo_new.png",logoScale:[1,.526],description:"Algorithmic trading and financial market intelligence."},{name:"Sentaient",startP:.485,p:.5,endP:.51,color:"#ffffff",logoUrl:"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png",description:"A real-world social platform bridging the gap between digital networks and in-person connections."},{name:"MAYA",startP:.52,p:.54,endP:.56,color:"#aaddff",description:"Intelligent AI agent orchestration and task execution framework."},{name:"Sphinx",startP:.58,p:.6,endP:.62,color:"#ffcc00",description:"Cryptographic security and advanced zero-knowledge identity management."},{name:"Liquid",startP:.64,p:.66,endP:.68,color:"#ffaa00",description:"Fluid liquidity pooling and automated market making protocol."},{name:"Helu",startP:.7,p:.72,endP:.75,color:"#ff66aa",description:"Generative health forecasting and personal genome visualization."},{name:"PyRAmid",startP:.77,p:.79,endP:.82,color:"#aa33ff",description:"Decentralized hierarchy of data truth and oracle services."},{name:"Matrix",startP:.84,p:.86,endP:.89,color:"#00ff44",description:"Neural network training simulation and adversarial environment generation."},{name:"LightSpeed",startP:.91,p:.93,endP:.99,color:"#0088ff",description:"High-frequency low-latency execution pipeline for spatial computing."}];function pt(){const o=B(),t=i.useRef(),s=ae(u=>u.viewport);ae(u=>u.size);const r=Ee;g(()=>{t.current&&(t.current.visible=o.offset<.05)});const n=51,a=s.width*n*.9/2,c=s.height*n*.85/2,l=Math.min(a,c)*1.8,f=r.length;return e.jsxs("group",{ref:t,position:[0,25,-500],children:[e.jsx("pointLight",{position:[0,0,100],intensity:2,color:"#ffffff"}),r.map((u,d)=>{const p=d/f*Math.PI*2+Math.PI/2,x=Math.cos(p)*l,M=Math.sin(p)*l;return e.jsx(or,{name:u.name,color:u.color,startP:u.startP,targetP:u.p,endP:u.endP,logoUrl:u.logoUrl,logoScale:u.logoScale,position:[x,M,0],scrollEl:o.el},u.name)})]})}const nr=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ir=`
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
`,ar=({startZ:o=10,endZ:t=-500,visible:s=!0})=>{const r=i.useRef(),n=i.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);g(c=>{r.current&&s&&(r.current.uniforms.uTime.value=c.clock.elapsedTime,r.current.uniforms.uOpacity.value=H.lerp(r.current.uniforms.uOpacity.value,s?1:0,.05))});const a=i.useMemo(()=>{const c=[],f=o-t;for(let u=0;u<=100;u++){const d=o-u/100*f;c.push(new P(Math.sin(u*.1)*2,Math.cos(u*.05)*2,d))}return new Ot(c)},[o,t]);return e.jsxs("mesh",{visible:s,children:[e.jsx("tubeGeometry",{args:[a,200,15,32,!1]}),e.jsx("shaderMaterial",{ref:r,vertexShader:nr,fragmentShader:ir,uniforms:n,side:W,transparent:!0,blending:L})]})},cr=`
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
`,lr=`
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
`,fr=({position:o,rotation:t=[0,0,0],length:s=4e3,visible:r=!0})=>{const n=i.useRef(),a=i.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:s}}),[s]);return g(c=>{n.current&&(n.current.uniforms.uTime.value=c.clock.elapsedTime,n.current.uniforms.uOpacity.value=r?1:0)}),e.jsx("group",{position:o,rotation:t,visible:r,children:e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[120,120,s+200,32,64,!0]}),e.jsx("shaderMaterial",{ref:n,vertexShader:cr,fragmentShader:lr,uniforms:a,transparent:!0,side:W,wireframe:!1})]})})},N=({position:o,rotation:t,length:s=4e3,radius:r=200,color:n="#ffffff",speed:a=20,visible:c=!0})=>{const l=i.useRef(),f=i.useMemo(()=>({uTime:{value:0},uColor:{value:new E(n)}}),[n]);return g(u=>{l.current&&(l.current.uniforms.uTime.value=u.clock.elapsedTime)}),e.jsxs("mesh",{visible:c,position:o,rotation:t,children:[e.jsx("cylinderGeometry",{args:[r,r,s,32,1,!0]}),e.jsx("shaderMaterial",{ref:l,transparent:!0,side:W,blending:L,depthWrite:!1,uniforms:f,vertexShader:`
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
            float streaks = sin((vUv.x * 50.0) + sin(vUv.y * 10.0)) * sin((vUv.y * 100.0) - (uTime * ${a.toFixed(1)}));
            streaks = smoothstep(0.8, 1.0, streaks);
            
            // Fade at ends
            float edgeFade = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
            
            gl_FragColor = vec4(uColor, streaks * edgeFade);
          }
        `})]})},ur=()=>{const o=[],t=(s,r,n)=>{o.push({x:s,y:r,z:0,rot:[Math.PI/2,0,0],color:n,bodyHeight:40+Math.random()*40})};for(let s=Math.PI*.25;s<Math.PI*1.75;s+=.2)t(-100+Math.cos(s)*80,Math.sin(s)*80,"#00ff00");for(let s=0;s<Math.PI*2;s+=.2)t(100+Math.cos(s)*80,Math.sin(s)*80,"#ff0044");return t(140,-40,"#ff0044"),t(160,-60,"#ff0044"),t(180,-80,"#ff0044"),o},dr=({position:o,rotation:t=[0,0,0],length:s=6e3,radius:r=250,visible:n})=>{const a=i.useRef(),c=i.useRef(),l=i.useRef(),f=X(A,"/assets/images/contango_logo.png"),u=i.useMemo(()=>{const x=[],M=Math.floor(s/5);for(let y=0;y<M;y++){const b=-(y/M)*s,v=y*.1,w=Math.cos(v)*r,R=Math.sin(v)*r,C=Math.cos(v+Math.PI)*r,h=Math.sin(v+Math.PI)*r,k=Math.random()>.5?"#00ff00":"#ff0044",S=20+Math.random()*60,G=[0,0,v+Math.PI/2],I=[0,0,v+Math.PI+Math.PI/2];x.push({x:w,y:R,z:b,rot:G,color:k,bodyHeight:S}),x.push({x:C,y:h,z:b,rot:I,color:k,bodyHeight:S})}return ur().forEach(y=>{x.push({x:y.x,y:y.y,z:-s-500,rot:y.rot,color:y.color,bodyHeight:y.bodyHeight})}),x},[s,r]),d=i.useMemo(()=>new Q,[]),m=i.useMemo(()=>new E,[]),p=u.length;return i.useEffect(()=>{if(!(!c.current||!l.current)){for(let x=0;x<p;x++){const M=u[x];d.position.set(M.x,M.y,M.z),d.rotation.set(M.rot[0],M.rot[1],M.rot[2]),d.scale.set(1,M.bodyHeight+40,1),d.updateMatrix(),c.current.setMatrixAt(x,d.matrix),m.set(M.color),c.current.setColorAt(x,m),d.scale.set(1,M.bodyHeight,1),d.updateMatrix(),l.current.setMatrixAt(x,d.matrix),l.current.setColorAt(x,m)}c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0)}},[u,p]),g(x=>{a.current&&n&&(a.current.rotation.z=x.clock.elapsedTime*.5)}),e.jsxs("group",{position:o,rotation:t,visible:n,children:[e.jsxs("group",{ref:a,children:[e.jsxs("instancedMesh",{ref:c,args:[null,null,p],children:[e.jsx("cylinderGeometry",{args:[2,2,1,8]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),e.jsxs("instancedMesh",{ref:l,args:[null,null,p],children:[e.jsx("boxGeometry",{args:[10,1,10]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),e.jsxs("mesh",{position:[0,0,-s-500],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:f,transparent:!0})]}),e.jsxs("mesh",{position:[0,0,-s/2],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[r*.8,r*.8,s,32,1,!0]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:W})]})]})},mr=({position:o,rotation:t,length:s=8e3,visible:r=!0})=>{const n=i.useRef(),a=i.useRef();g(l=>{if(!r||!n.current)return;const f=l.clock.getElapsedTime();n.current.map.offset.y=-f*3,a.current&&(a.current.rotation.y=f*2)});const c=Ge.useMemo(()=>{const l=document.createElement("canvas");l.width=512,l.height=512;const f=l.getContext("2d"),u=f.createLinearGradient(0,0,0,512);u.addColorStop(0,"#001a33"),u.addColorStop(.5,"#00ccff"),u.addColorStop(1,"#001a33"),f.fillStyle=u,f.fillRect(0,0,512,512),f.fillStyle="#ffffff";for(let m=0;m<200;m++)f.globalAlpha=Math.random()*.5,f.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const d=new it(l);return d.wrapS=ce,d.wrapT=ce,d.repeat.set(4,20),d},[]);return e.jsxs("group",{position:o,rotation:t,visible:r,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,s,32,1,!0]}),e.jsx("meshStandardMaterial",{ref:n,map:c,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:W,transparent:!0,opacity:.9})]}),e.jsxs("mesh",{ref:a,children:[e.jsx("cylinderGeometry",{args:[140,140,s,16,40,!0]}),e.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:W})]})]})},Y=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.02,x:0,y:0,z:-250,rx:0,ry:0},{p:.03,x:0,y:0,z:-1250,rx:0,ry:0},{p:.05,x:0,y:0,z:-1250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.09,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.1,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.11,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.12,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.13,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.135,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.14,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.145,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.15,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.16,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.18,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.19,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.21,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.23,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-10550,rx:0,ry:0},{p:.255,x:0,y:-3980,z:-10550,rx:0,ry:0},{p:.265,x:0,y:-3980,z:-11550,rx:0,ry:0},{p:.275,x:0,y:-3980,z:-12550,rx:0,ry:0},{p:.285,x:0,y:-3980,z:-13550,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-13550,rx:0,ry:0},{p:.31,x:0,y:-3980,z:-14550,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-15550,rx:0,ry:0},{p:.33,x:0,y:-4e3,z:-16550,rx:0,ry:0},{p:.36,x:0,y:-4e3,z:-16550,rx:0,ry:0},{p:.37,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.395,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.405,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.42,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.43,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.44,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.45,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.455,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.47,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.475,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.485,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.49,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:.5,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:.52,x:0,y:-11750,z:-31e3,rx:0,ry:0},{p:.54,x:0,y:-11750,z:-33e3,rx:0,ry:0},{p:.56,x:0,y:-11750,z:-34e3,rx:0,ry:0},{p:.58,x:0,y:-11750,z:-35e3,rx:0,ry:0},{p:.6,x:0,y:-11750,z:-37e3,rx:0,ry:0},{p:.62,x:0,y:-11750,z:-38e3,rx:0,ry:0},{p:.64,x:0,y:-11750,z:-39e3,rx:0,ry:0},{p:.66,x:0,y:-11750,z:-41e3,rx:0,ry:0},{p:.68,x:0,y:-11750,z:-42e3,rx:0,ry:0},{p:.7,x:0,y:-11750,z:-43e3,rx:0,ry:0},{p:.72,x:0,y:-11750,z:-45e3,rx:0,ry:0},{p:.75,x:0,y:-11750,z:-46e3,rx:0,ry:0},{p:.77,x:0,y:-11750,z:-47e3,rx:0,ry:0},{p:.79,x:0,y:-11750,z:-49e3,rx:0,ry:0},{p:.82,x:0,y:-11750,z:-5e4,rx:0,ry:0},{p:.84,x:0,y:-11750,z:-51e3,rx:0,ry:0},{p:.86,x:0,y:-11750,z:-53e3,rx:0,ry:0},{p:.89,x:0,y:-11750,z:-54e3,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-55e3,rx:0,ry:0},{p:.93,x:0,y:-11750,z:-57e3,rx:0,ry:0},{p:1,x:0,y:-11750,z:-58e3,rx:0,ry:0}],hr=o=>{if(o<=Y[0].p)return Y[0];if(o>=Y[Y.length-1].p)return Y[Y.length-1];for(let t=0;t<Y.length-1;t++){const s=Y[t],r=Y[t+1];if(o>=s.p&&o<=r.p){const n=(o-s.p)/(r.p-s.p);return{x:H.lerp(s.x,r.x,n),y:H.lerp(s.y,r.y,n),z:H.lerp(s.z,r.z,n),rx:H.lerp(s.rx,r.rx,n),ry:H.lerp(s.ry,r.ry,n)}}}return Y[0]},je=new Le,Me=new nt,pr=()=>{const o=B(),t=i.useRef();return g(s=>{let r=window._warpProgress!==void 0?window._warpProgress:o.offset;window.icebreakerCaveLocked?r=.135:window.icebreakerThawLocked?r=.14:window.icebreakerTextLocked?r=.145:window.mindwaveLocked?r=.06:window.interstellarLocked?r=.21:window.autopilotLocked?r=.3:window.contangoLocked&&(r=.47);const n=hr(r);if(window._snapCamera)s.camera.position.set(n.x,n.y,n.z),Me.set(n.rx,n.ry,0),je.setFromEuler(Me),s.camera.quaternion.copy(je),window._snapCamera=!1;else{s.camera.position.x=H.lerp(s.camera.position.x,n.x,.2),s.camera.position.y=H.lerp(s.camera.position.y,n.y,.2),s.camera.position.z=H.lerp(s.camera.position.z,n.z,.2),Me.set(n.rx,n.ry,0),je.setFromEuler(Me),s.camera.quaternion.slerp(je,.15);const a=o.delta*10;s.camera.rotateZ(H.lerp(0,a*2,.2))}t.current&&t.current.position.copy(s.camera.position)}),e.jsxs("group",{children:[e.jsx(pt,{}),e.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),e.jsx("pointLight",{ref:t,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),e.jsx("ambientLight",{intensity:.2})]})},xr=()=>{const o=B(),[t,s]=i.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1,maya:!1,sphinx:!1,liquid:!1,helu:!1,pyramid:!1,matrix:!1,lightspeed:!1}),r=i.useRef(t);return g(()=>{const n=window._warpProgress!==void 0?window._warpProgress:o.offset,a={intro:n<.05,mindwave:n>.04&&n<.09,wormhole_ice:n>.08&&n<.12,icebreaker:n>.11&&n<.16,wormhole_sound:n>.15&&n<.2,interstellar:n>.18&&n<.23,w_legal:n>.22&&n<.25,legal:n>.23&&n<.27,w_autopilot:n>.26&&n<.29,autopilot:n>.27&&n<.32,w_clove:n>.31&&n<.34,clove:n>.32&&n<.38,w_fantasy:n>.36&&n<.42,fantasy:n>.39&&n<.44,w_contango:n>.43&&n<.46,contango:n>.44&&n<.48,sentaient:n>.47&&n<.52,maya:n>.51&&n<.57,sphinx:n>.57&&n<.63,liquid:n>.63&&n<.69,helu:n>.69&&n<.76,pyramid:n>.76&&n<.83,matrix:n>.83&&n<.9,lightspeed:n>.9};let c=!1;for(const l in a)r.current[l]!==a[l]&&(c=!0);c&&(r.current=a,s(a))}),e.jsxs("group",{children:[e.jsx(pt,{}),e.jsx(ar,{startZ:10,endZ:-250,visible:t.intro}),e.jsx(Ts,{position:[0,0,-1350],visible:t.mindwave}),e.jsx(fr,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:t.wormhole_ice}),e.jsx(ws,{position:[0,-4e3,-2550],visible:t.icebreaker}),e.jsx(N,{position:[0,-4e3,-5050],rotation:[Math.PI/2,0,0],length:3500,color:"#ff00ff",speed:20,visible:t.wormhole_sound}),e.jsx(Es,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:t.interstellar}),e.jsx(N,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:t.w_legal}),e.jsx(Gs,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:t.legal}),e.jsx(N,{position:[0,-4e3,-12050],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffff",speed:40,visible:t.w_autopilot}),e.jsx(bs,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:t.autopilot}),e.jsx(N,{position:[0,-4e3,-15050],rotation:[Math.PI/2,0,0],length:2e3,color:"#ff00ff",speed:40,visible:t.w_clove}),e.jsx(Bs,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:t.clove}),e.jsx(mr,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:t.w_fantasy}),e.jsx(Ds,{position:[0,-11700,-17500],rotation:[0,0,0],visible:t.fantasy}),e.jsx(dr,{position:[0,-11750,-20550],length:4e3,visible:t.w_contango}),e.jsx(qs,{position:[0,-11750,-24800],rotation:[0,0,0],visible:t.contango}),e.jsx(Xs,{position:[0,-11750,-29350],rotation:[0,0,0],visible:t.sentaient}),e.jsx(N,{position:[0,-11750,-31e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#ffffff",speed:20,visible:t.maya}),e.jsx(Zs,{position:[0,-11750,-33e3],visible:t.maya}),e.jsx(N,{position:[0,-11750,-35e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#ff0000",speed:20,visible:t.sphinx}),e.jsx($s,{position:[0,-11750,-37e3],visible:t.sphinx}),e.jsx(N,{position:[0,-11750,-39e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#ffd700",speed:20,visible:t.liquid}),e.jsx(Qs,{position:[0,-11750,-41e3],visible:t.liquid}),e.jsx(N,{position:[0,-11750,-43e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#ffaa00",speed:20,visible:t.helu}),e.jsx(Ks,{position:[0,-11750,-45e3],visible:t.helu}),e.jsx(N,{position:[0,-11750,-47e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#00ffff",speed:20,visible:t.pyramid}),e.jsx(tr,{position:[0,-11750,-49e3],visible:t.pyramid}),e.jsx(N,{position:[0,-11750,-51e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#00ff44",speed:30,visible:t.matrix}),e.jsx(sr,{position:[0,-11750,-53e3],visible:t.matrix}),e.jsx(N,{position:[0,-11750,-55e3],rotation:[Math.PI/2,0,0],length:3e3,color:"#0055ff",speed:50,visible:t.lightspeed}),e.jsx(rr,{position:[0,-11750,-57e3],visible:t.lightspeed})]})},gr=()=>{const o=B(),t=i.useRef(),[s,r]=i.useState(null);return g(n=>{const a=window._warpProgress!==void 0?window._warpProgress:o.offset,c=Ee.find(l=>a>=l.startP-.01&&a<=l.endP+.01);if(a>.1&&c!==s?r(c):a<=.1&&s!==null&&r(null),t.current){const l=n.camera.position,f=new P;n.camera.getWorldDirection(f),t.current.position.copy(l).add(f.multiplyScalar(40)),t.current.position.y+=3,t.current.rotation.y+=.01}}),s?e.jsxs("group",{ref:t,children:[e.jsx("ambientLight",{intensity:1.5}),e.jsx("pointLight",{position:[0,0,10],intensity:1,color:"#ffffff"}),s.logoUrl?e.jsx(ut,{url:s.logoUrl,scale:s.logoScale?s.logoScale.map(n=>n*8):8,transparent:!0,side:D}):e.jsx("group",{scale:3,children:ht(s.name,s.color,!1)})]}):null},yr=()=>{const o=B(),t=i.useRef(),s=i.useRef(),r=i.useRef(),n=i.useRef(),a=i.useRef(null);g(()=>{const l=window._warpProgress!==void 0?window._warpProgress:o.offset;if(t.current){const f=l>.1;t.current.style.opacity=f?1:0,t.current.style.pointerEvents=f?"auto":"none"}if(s.current){const f=Ee.find(u=>l>=u.startP-.01&&l<=u.endP+.01);f?(s.current.style.opacity=1,a.current!==f.name&&(a.current=f.name,r.current&&(r.current.innerText=f.name),n.current&&(n.current.innerText=f.description||""))):(s.current.style.opacity=0,a.current=null)}});const c=()=>{o.el&&(window._cancelWarp=!0,window._warpProgress=void 0,window._snapCamera=!0,o.el.style.overflow="auto",o.el.scrollTop=0)};return e.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsxs("div",{ref:s,style:{opacity:0,transition:"opacity 0.5s ease-in-out",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",maxWidth:"800px",padding:"2rem",transform:"translateY(150px)"},children:[e.jsx("h1",{ref:r,style:{fontSize:"3.5rem",fontWeight:"bold",margin:"0 0 1rem 0",textShadow:"0 4px 15px rgba(0,0,0,1), 0 2px 5px rgba(0,0,0,0.8)"},children:"World Name"}),e.jsx("p",{ref:n,style:{fontSize:"1.4rem",color:"#e2e8f0",margin:0,lineHeight:1.6,textShadow:"0 2px 10px rgba(0,0,0,1)"},children:"World Description"})]}),e.jsx("div",{ref:t,style:{position:"absolute",top:"40px",left:"40px",opacity:0,transition:"opacity 0.5s"},children:e.jsx("button",{onClick:c,className:"px-6 py-2 bg-black/50 border border-emerald-500/50 hover:border-emerald-400 hover:bg-emerald-500/20 text-emerald-400 rounded-full font-mono text-sm tracking-widest backdrop-blur-sm transition-all",children:"← RETURN TO HUB"})})]})},vr=()=>e.jsxs(Tt,{dpr:[1,1.5],performance:{min:.5},gl:{antialias:!1,alpha:!0,powerPreference:"high-performance"},children:[e.jsxs(Dt,{pages:50,damping:.2,distance:1.2,children:[e.jsxs(Ge.Suspense,{fallback:null,children:[e.jsx(pr,{}),e.jsx(xr,{}),e.jsx(gr,{})]}),e.jsx(le,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),e.jsx(Vt,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:e.jsx(yr,{})})]}),e.jsxs(It,{disableNormalPass:!0,children:[e.jsx(Ct,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),e.jsx(kt,{opacity:.05}),e.jsx(Gt,{eskil:!1,offset:.1,darkness:1.1})]})]}),kr=()=>e.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[e.jsxs(St,{children:[e.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),e.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),e.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),e.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:e.jsx(zt,{})}),e.jsx("div",{className:"absolute inset-0 z-0",children:e.jsx(vr,{})})]});export{kr as default};
