import{k as r,_ as C}from"./vendor-DoAJi3uA.js";import{R as g,aj as F,at as O,l as b,ax as k,ay as S,az as j}from"./three-Bm3W6HT9.js";import{e as w,b as R,u as I,v as U}from"./constants-BHVo0-W9.js";function V(e,t,n,o){const l=class extends F{constructor(s={}){const c=Object.entries(e);super({uniforms:c.reduce((i,[f,a])=>{const u=O.clone({[f]:{value:a}});return{...i,...u}},{}),vertexShader:t,fragmentShader:n}),this.key="",c.forEach(([i])=>Object.defineProperty(this,i,{get:()=>this.uniforms[i].value,set:f=>this.uniforms[i].value=f})),Object.assign(this,s)}};return l.key=g.generateUUID(),l}const T=V({time:0,pixelRatio:1},` uniform float pixelRatio;
    uniform float time;
    attribute float size;  
    attribute float speed;  
    attribute float opacity;
    attribute vec3 noise;
    attribute vec3 color;
    varying vec3 vColor;
    varying float vOpacity;
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
      modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
      modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPostion = projectionMatrix * viewPosition;
      gl_Position = projectionPostion;
      gl_PointSize = size * 25. * pixelRatio;
      gl_PointSize *= (1.0 / - viewPosition.z);
      vColor = color;
      vOpacity = opacity;
    }`,` varying vec3 vColor;
    varying float vOpacity;
    void main() {
      float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
      float strength = 0.05 / distanceToCenter - 0.1;
      gl_FragColor = vec4(vColor, strength * vOpacity);
      #include <tonemapping_fragment>
      #include <${U>=154?"colorspace_fragment":"encodings_fragment"}>
    }`),h=e=>e&&e.constructor===Float32Array,$=e=>[e.r,e.g,e.b],v=e=>e instanceof k||e instanceof S||e instanceof j,A=e=>Array.isArray(e)?e:v(e)?e.toArray():[e,e,e];function m(e,t,n){return r.useMemo(()=>{if(t!==void 0){if(h(t))return t;if(t instanceof b){const o=Array.from({length:e*3},()=>$(t)).flat();return Float32Array.from(o)}else if(v(t)||Array.isArray(t)){const o=Array.from({length:e*3},()=>A(t)).flat();return Float32Array.from(o)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},n)},[t])}const N=r.forwardRef(({noise:e=1,count:t=100,speed:n=1,opacity:o=1,scale:l=1,size:y,color:s,children:c,...i},f)=>{r.useMemo(()=>w({SparklesImplMaterial:T}),[]);const a=r.useRef(null),u=R(d=>d.viewport.dpr),p=A(l),x=r.useMemo(()=>Float32Array.from(Array.from({length:t},()=>p.map(g.randFloatSpread)).flat()),[t,...p]),P=m(t,y,Math.random),M=m(t,o),z=m(t,n),E=m(t*3,e),_=m(s===void 0?t*3:t,h(s)?s:new b(s),()=>1);return I(d=>{a.current&&a.current.material&&(a.current.material.time=d.clock.elapsedTime)}),r.useImperativeHandle(f,()=>a.current,[]),r.createElement("points",C({key:`particle-${t}-${JSON.stringify(l)}`},i,{ref:a}),r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[x,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[P,1]}),r.createElement("bufferAttribute",{attach:"attributes-opacity",args:[M,1]}),r.createElement("bufferAttribute",{attach:"attributes-speed",args:[z,1]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[_,3]}),r.createElement("bufferAttribute",{attach:"attributes-noise",args:[E,3]})),c||r.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:u,depthWrite:!1}))});export{N as S};
