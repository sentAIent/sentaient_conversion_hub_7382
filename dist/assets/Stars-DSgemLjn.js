import{r,_ as L}from"./vendor-V_IGzrPO.js";import{ai as P,C as F,A as j,V as O,a6 as R,w as T}from"./three-D2gwTBAo.js";import{b as n,u as z,v as V}from"./constants-C6I5y929.js";const I=r.forwardRef(({makeDefault:o,camera:f,regress:a,domElement:g,enableDamping:b=!0,keyEvents:c=!1,onChange:d,onStart:u,onEnd:s,...C},M)=>{const v=n(e=>e.invalidate),w=n(e=>e.camera),l=n(e=>e.gl),h=n(e=>e.events),x=n(e=>e.setEvents),i=n(e=>e.set),E=n(e=>e.get),S=n(e=>e.performance),m=f||w,A=g||h.connected||l.domElement,t=r.useMemo(()=>new P(m),[m]);return z(()=>{t.enabled&&t.update()},-1),r.useEffect(()=>(c&&t.connect(c===!0?A:c),t.connect(A),()=>void t.dispose()),[c,A,a,t,v]),r.useEffect(()=>{const e=p=>{v(),a&&S.regress(),d&&d(p)},_=p=>{u&&u(p)},y=p=>{s&&s(p)};return t.addEventListener("change",e),t.addEventListener("start",_),t.addEventListener("end",y),()=>{t.removeEventListener("start",_),t.removeEventListener("end",y),t.removeEventListener("change",e)}},[d,u,s,t,v,x]),r.useEffect(()=>{if(o){const e=E().controls;return i({controls:t}),()=>i({controls:e})}},[o,t]),r.createElement("primitive",L({ref:M,object:t,enableDamping:b},C))});class D extends T{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${V>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const $=o=>new O().setFromSpherical(new R(o,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),W=r.forwardRef(({radius:o=100,depth:f=50,count:a=5e3,saturation:g=0,factor:b=4,fade:c=!1,speed:d=1},u)=>{const s=r.useRef(),[C,M,v]=r.useMemo(()=>{const l=[],h=[],x=Array.from({length:a},()=>(.5+.5*Math.random())*b),i=new F;let E=o+f;const S=f/a;for(let m=0;m<a;m++)E-=S*Math.random(),l.push(...$(E).toArray()),i.setHSL(m/a,g,.9),h.push(i.r,i.g,i.b);return[new Float32Array(l),new Float32Array(h),new Float32Array(x)]},[a,f,b,o,g]);z(l=>s.current&&(s.current.uniforms.time.value=l.clock.elapsedTime*d));const[w]=r.useState(()=>new D);return r.createElement("points",{ref:u},r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[C,3]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[M,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[v,1]})),r.createElement("primitive",{ref:s,object:w,attach:"material",blending:j,"uniforms-fade-value":c,depthWrite:!1,transparent:!0,vertexColors:!0}))});export{I as O,W as S};
