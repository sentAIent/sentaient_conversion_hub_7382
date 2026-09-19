import{r as i,_ as V,g as Et,j as e,R as be,H as Gt}from"./vendor-B9TfjWxd.js";import{H as Ft}from"./Header-Du14FHHh.js";import{b as ze,u as M,c as Le,e as Pt,a as ne,C as Ut}from"./react-three-fiber.esm-DKMVSfDo.js";import{s as Bt,v as St,S as K,E as Wt,B as Ht,N as Dt,V as Ot}from"./Vignette-z0igVkP3.js";import{aq as Pe,ar as b,a4 as Q,O as J,ah as Ct,as as pe,k as S,E as _e,x as Nt,u as Vt,w as qt,y as Yt,v as Xt,a2 as Zt,B as L,o as Ae,G as Qt,P as $t,M as Kt,K as F,a as T,ad as Jt,ak as W,aa as O,n as B,a9 as Me,Y as Z,h as Rt,l as eo,ag as to,ae as oo,q as ro,i as Tt,a3 as no}from"./three-DdqcwhsF.js";import{T as k}from"./Text-C36GSmX0.js";import"./main-B5wardeV.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";function he(o,t,r){return t in o?Object.defineProperty(o,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):o[t]=r,o}function Re(o,t){(t==null||t>o.length)&&(t=o.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=o[r];return n}function so(o,t){if(o){if(typeof o=="string")return Re(o,t);var r=Object.prototype.toString.call(o).slice(8,-1);if(r==="Object"&&o.constructor&&(r=o.constructor.name),r==="Map"||r==="Set")return Array.from(o);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Re(o,t)}}function ao(o){if(Array.isArray(o))return Re(o)}function io(o){if(typeof Symbol<"u"&&o[Symbol.iterator]!=null||o["@@iterator"]!=null)return Array.from(o)}function lo(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function co(o){return ao(o)||io(o)||so(o)||lo()}new Pe;new Pe;function fo(o,t,r){return Math.max(t,Math.min(r,o))}function uo(o,t){return fo(o-Math.floor(o/t)*t,0,t)}function mo(o,t){var r=uo(t-o,Math.PI*2);return r>Math.PI&&(r-=Math.PI*2),r}function kt(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}var U=function o(t,r,n){var s=this;kt(this,o),he(this,"dot2",function(a,l){return s.x*a+s.y*l}),he(this,"dot3",function(a,l,c){return s.x*a+s.y*l+s.z*c}),this.x=t,this.y=r,this.z=n},ho=[new U(1,1,0),new U(-1,1,0),new U(1,-1,0),new U(-1,-1,0),new U(1,0,1),new U(-1,0,1),new U(1,0,-1),new U(-1,0,-1),new U(0,1,1),new U(0,-1,1),new U(0,1,-1),new U(0,-1,-1)],Ee=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],Ge=new Array(512),Fe=new Array(512),po=function(t){t>0&&t<1&&(t*=65536),t=Math.floor(t),t<256&&(t|=t<<8);for(var r=0;r<256;r++){var n;r&1?n=Ee[r]^t&255:n=Ee[r]^t>>8&255,Ge[r]=Ge[r+256]=n,Fe[r]=Fe[r+256]=ho[n%12]}};po(0);function xo(o){if(typeof o=="number")o=Math.abs(o);else if(typeof o=="string"){var t=o;o=0;for(var r=0;r<t.length;r++)o=(o+(r+1)*(t.charCodeAt(r)%96))%2147483647}return o===0&&(o=311),o}function Ue(o){var t=xo(o);return function(){var r=t*48271%2147483647;return t=r,r/2147483647}}var vo=function o(t){var r=this;kt(this,o),he(this,"seed",0),he(this,"init",function(n){r.seed=n,r.value=Ue(n)}),he(this,"value",Ue(this.seed)),this.init(t)};new vo(Math.random());var go=function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return n/Math.atan(1/r)*Math.atan(Math.sin(2*Math.PI*t*s)/r)},_t=function(t){return 1/(1+t+.48*t*t+.235*t*t*t)},yo=function(t){return t},wo={in:function(t){return 1-Math.cos(t*Math.PI/2)},out:function(t){return Math.sin(t*Math.PI/2)},inOut:function(t){return-(Math.cos(Math.PI*t)-1)/2}},Mo={in:function(t){return t*t*t},out:function(t){return 1-Math.pow(1-t,3)},inOut:function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}},jo={in:function(t){return t*t*t*t*t},out:function(t){return 1-Math.pow(1-t,5)},inOut:function(t){return t<.5?16*t*t*t*t*t:1-Math.pow(-2*t+2,5)/2}},bo={in:function(t){return 1-Math.sqrt(1-Math.pow(t,2))},out:function(t){return Math.sqrt(1-Math.pow(t-1,2))},inOut:function(t){return t<.5?(1-Math.sqrt(1-Math.pow(2*t,2)))/2:(Math.sqrt(1-Math.pow(-2*t+2,2))+1)/2}},zo={in:function(t){return t*t*t*t},out:function(t){return 1- --t*t*t*t},inOut:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t}},Po={in:function(t){return t===0?0:Math.pow(2,10*t-10)},out:function(t){return t===1?1:1-Math.pow(2,-10*t)},inOut:function(t){return t===0?0:t===1?1:t<.5?Math.pow(2,20*t-10)/2:(2-Math.pow(2,-20*t+10))/2}};function I(o,t,r){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,a=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,l=arguments.length>6&&arguments[6]!==void 0?arguments[6]:_t,c=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,f="velocity_"+t;if(o.__damp===void 0&&(o.__damp={}),o.__damp[f]===void 0&&(o.__damp[f]=0),Math.abs(o[t]-r)<=c)return o[t]=r,!1;n=Math.max(1e-4,n);var u=2/n,m=l(u*s),h=o[t]-r,x=r,g=a*n;h=Math.min(Math.max(h,-g),g),r=o[t]-h;var v=(o.__damp[f]+u*h)*s;o.__damp[f]=(o.__damp[f]-u*v)*m;var y=r+(h+v)*m;return x-o[t]>0==y>x&&(y=x,o.__damp[f]=(y-x)/s),o[t]=y,!0}var So=function(t){return t&&t.isCamera},Co=function(t){return t&&t.isLight},ae=new b,Be=new Q,We=new Q,ie=new J,Ce=new b;function Ro(o,t,r,n,s,a,l){typeof t=="number"?ae.setScalar(t):Array.isArray(t)?ae.set(t[0],t[1],t[2]):ae.copy(t);var c=o.parent;o.updateWorldMatrix(!0,!1),Ce.setFromMatrixPosition(o.matrixWorld),So(o)||Co(o)?ie.lookAt(Ce,ae,o.up):ie.lookAt(ae,Ce,o.up),je(o.quaternion,We.setFromRotationMatrix(ie),r,n,s,a,l),c&&(ie.extractRotation(c.matrixWorld),Be.setFromRotationMatrix(ie),je(o.quaternion,We.copy(o.quaternion).premultiply(Be.invert()),r,n,s,a,l))}function re(o,t,r,n,s,a,l,c){return I(o,t,o[t]+mo(o[t],r),n,s,a,l,c)}var le=new Pe,He,De;function To(o,t,r,n,s,a,l){return typeof t=="number"?le.setScalar(t):Array.isArray(t)?le.set(t[0],t[1]):le.copy(t),He=I(o,"x",le.x,r,n,s,a,l),De=I(o,"y",le.y,r,n,s,a,l),He||De}var te=new b,Oe,Ne,Ve;function Te(o,t,r,n,s,a,l){return typeof t=="number"?te.setScalar(t):Array.isArray(t)?te.set(t[0],t[1],t[2]):te.copy(t),Oe=I(o,"x",te.x,r,n,s,a,l),Ne=I(o,"y",te.y,r,n,s,a,l),Ve=I(o,"z",te.z,r,n,s,a,l),Oe||Ne||Ve}var $=new pe,qe,Ye,Xe,Ze;function ko(o,t,r,n,s,a,l){return typeof t=="number"?$.setScalar(t):Array.isArray(t)?$.set(t[0],t[1],t[2],t[3]):$.copy(t),qe=I(o,"x",$.x,r,n,s,a,l),Ye=I(o,"y",$.y,r,n,s,a,l),Xe=I(o,"z",$.z,r,n,s,a,l),Ze=I(o,"w",$.w,r,n,s,a,l),qe||Ye||Xe||Ze}var ce=new _e,Qe,$e,Ke;function _o(o,t,r,n,s,a,l){return Array.isArray(t)?ce.set(t[0],t[1],t[2],t[3]):ce.copy(t),Qe=re(o,"x",ce.x,r,n,s,a,l),$e=re(o,"y",ce.y,r,n,s,a,l),Ke=re(o,"z",ce.z,r,n,s,a,l),Qe||$e||Ke}var oe=new S,Je,et,tt;function Io(o,t,r,n,s,a,l){return t instanceof S?oe.copy(t):Array.isArray(t)?oe.setRGB(t[0],t[1],t[2]):oe.set(t),Je=I(o,"r",oe.r,r,n,s,a,l),et=I(o,"g",oe.g,r,n,s,a,l),tt=I(o,"b",oe.b,r,n,s,a,l),Je||et||tt}var D=new Q,X=new pe,ot=new pe,fe=new pe,rt,nt,st,at;function je(o,t,r,n,s,a,l){var c=o;Array.isArray(t)?D.set(t[0],t[1],t[2],t[3]):D.copy(t);var f=o.dot(D)>0?1:-1;return D.x*=f,D.y*=f,D.z*=f,D.w*=f,rt=I(o,"x",D.x,r,n,s,a,l),nt=I(o,"y",D.y,r,n,s,a,l),st=I(o,"z",D.z,r,n,s,a,l),at=I(o,"w",D.w,r,n,s,a,l),X.set(o.x,o.y,o.z,o.w).normalize(),ot.set(c.__damp.velocity_x,c.__damp.velocity_y,c.__damp.velocity_z,c.__damp.velocity_w),fe.copy(X).multiplyScalar(ot.dot(X)/X.dot(X)),c.__damp.velocity_x-=fe.x,c.__damp.velocity_y-=fe.y,c.__damp.velocity_z-=fe.z,c.__damp.velocity_w-=fe.w,o.set(X.x,X.y,X.z,X.w),rt||nt||st||at}var ue=new Ct,it,lt,ct;function Lo(o,t,r,n,s,a,l){return Array.isArray(t)?ue.set(t[0],t[1],t[2]):ue.copy(t),it=I(o,"radius",ue.radius,r,n,s,a,l),lt=re(o,"phi",ue.phi,r,n,s,a,l),ct=re(o,"theta",ue.theta,r,n,s,a,l),it||lt||ct}var ge=new J,ft=new b,ut=new Q,dt=new b,mt,ht,pt;function Ao(o,t,r,n,s,a,l){var c=o;return c.__damp===void 0&&(c.__damp={position:new b,rotation:new Q,scale:new b},o.decompose(c.__damp.position,c.__damp.rotation,c.__damp.scale)),Array.isArray(t)?ge.set.apply(ge,co(t)):ge.copy(t),ge.decompose(ft,ut,dt),mt=Te(c.__damp.position,ft,r,n,s,a,l),ht=je(c.__damp.rotation,ut,r,n,s,a,l),pt=Te(c.__damp.scale,dt,r,n,s,a,l),o.compose(c.__damp.position,c.__damp.rotation,c.__damp.scale),mt||ht||pt}var xt=Object.freeze({__proto__:null,rsqw:go,exp:_t,linear:yo,sine:wo,cubic:Mo,quint:jo,circ:bo,quart:zo,expo:Po,damp:I,dampLookAt:Ro,dampAngle:re,damp2:To,damp3:Te,damp4:ko,dampE:_o,dampC:Io,dampQ:je,dampS:Lo,dampM:Ao});const Ie=i.createContext(null);function E(){return i.useContext(Ie)}function Eo({eps:o=1e-5,enabled:t=!0,infinite:r,horizontal:n,pages:s=1,distance:a=1,damping:l=.25,maxSpeed:c=1/0,prepend:f=!1,style:u={},children:m}){const{get:h,setEvents:x,gl:g,size:v,invalidate:y,events:j}=ze(),[p]=i.useState(()=>document.createElement("div")),[w]=i.useState(()=>document.createElement("div")),[d]=i.useState(()=>document.createElement("div")),z=g.domElement.parentNode,R=i.useRef(0),C=i.useMemo(()=>({el:p,eps:o,fill:w,fixed:d,horizontal:n,damping:l,offset:0,delta:0,scroll:R,pages:s,range(P,A,_=0){const G=P-_,Y=G+A+_*2;return this.offset<G?0:this.offset>Y?1:(this.offset-G)/(Y-G)},curve(P,A,_=0){return Math.sin(this.range(P,A,_)*Math.PI)},visible(P,A,_=0){const G=P-_,Y=G+A+_*2;return this.offset>=G&&this.offset<=Y}}),[o,l,n,s]);i.useEffect(()=>{p.style.position="absolute",p.style.width="100%",p.style.height="100%",p.style[n?"overflowX":"overflowY"]="auto",p.style[n?"overflowY":"overflowX"]="hidden",p.style.top="0px",p.style.left="0px";for(const A in u)p.style[A]=u[A];d.style.position="sticky",d.style.top="0px",d.style.left="0px",d.style.width="100%",d.style.height="100%",d.style.overflow="hidden",p.appendChild(d),w.style.height=n?"100%":`${s*a*100}%`,w.style.width=n?`${s*a*100}%`:"100%",w.style.pointerEvents="none",p.appendChild(w),f?z.prepend(p):z.appendChild(p),p[n?"scrollLeft":"scrollTop"]=1;const H=j.connected||g.domElement;requestAnimationFrame(()=>j.connect==null?void 0:j.connect(p));const P=h().events.compute;return x({compute(A,_){const{left:G,top:Y}=z.getBoundingClientRect(),xe=A.clientX-G,ve=A.clientY-Y;_.pointer.set(xe/_.size.width*2-1,-(ve/_.size.height)*2+1),_.raycaster.setFromCamera(_.pointer,_.camera)}}),()=>{z.removeChild(p),x({compute:P}),j.connect==null||j.connect(H)}},[s,a,n,p,w,d,z]),i.useEffect(()=>{if(j.connected===p){const H=v[n?"width":"height"],P=p[n?"scrollWidth":"scrollHeight"],A=P-H;let _=0,G=!0,Y=!0;const xe=()=>{if(!(!t||Y)&&(y(),_=p[n?"scrollLeft":"scrollTop"],R.current=_/A,r)){if(!G){if(_>=A){const se=1-C.offset;p[n?"scrollLeft":"scrollTop"]=1,R.current=C.offset=-se,G=!0}else if(_<=0){const se=1+C.offset;p[n?"scrollLeft":"scrollTop"]=P,R.current=C.offset=se,G=!0}}G&&setTimeout(()=>G=!1,40)}};p.addEventListener("scroll",xe,{passive:!0}),requestAnimationFrame(()=>Y=!1);const ve=se=>p.scrollLeft+=se.deltaY/2;return n&&p.addEventListener("wheel",ve,{passive:!0}),()=>{p.removeEventListener("scroll",xe),n&&p.removeEventListener("wheel",ve)}}},[p,j,v,r,C,y,n,t]);let q=0;return M((H,P)=>{q=C.offset,xt.damp(C,"offset",R.current,l,P,c,void 0,o),xt.damp(C,"delta",Math.abs(q-C.offset),l,P,c,void 0,o),C.delta>o&&y()}),i.createElement(Ie.Provider,{value:C},m)}const Go=i.forwardRef(({children:o},t)=>{const r=i.useRef(null);i.useImperativeHandle(t,()=>r.current,[]);const n=E(),{width:s,height:a}=ze(l=>l.viewport);return M(()=>{r.current.position.x=n.horizontal?-s*(n.pages-1)*n.offset:0,r.current.position.y=n.horizontal?0:a*(n.pages-1)*n.offset}),i.createElement("group",{ref:r},o)}),Fo=i.forwardRef(({children:o,style:t,...r},n)=>{const s=E(),a=i.useRef(null);i.useImperativeHandle(n,()=>a.current,[]);const{width:l,height:c}=ze(m=>m.size),f=i.useContext(Le),u=i.useMemo(()=>Et(s.fixed),[s.fixed]);return M(()=>{s.delta>s.eps&&(a.current.style.transform=`translate3d(${s.horizontal?-l*(s.pages-1)*s.offset:0}px,${s.horizontal?0:c*(s.pages-1)*-s.offset}px,0)`)}),u.render(i.createElement("div",V({ref:a,style:{...t,position:"absolute",top:0,left:0,willChange:"transform"}},r),i.createElement(Ie.Provider,{value:s},i.createElement(Le.Provider,{value:f},o)))),null}),Uo=i.forwardRef(({html:o,...t},r)=>{const n=o?Fo:Go;return i.createElement(n,V({ref:r},t))}),It=i.forwardRef(function({children:t,follow:r=!0,lockX:n=!1,lockY:s=!1,lockZ:a=!1,...l},c){const f=i.useRef(null),u=i.useRef(null),m=new Q;return M(({camera:h})=>{if(!r||!u.current)return;const x=u.current.rotation.clone();u.current.updateMatrix(),u.current.updateWorldMatrix(!1,!1),u.current.getWorldQuaternion(m),h.getWorldQuaternion(f.current.quaternion).premultiply(m.invert()),n&&(u.current.rotation.x=x.x),s&&(u.current.rotation.y=x.y),a&&(u.current.rotation.z=x.z)}),i.useImperativeHandle(c,()=>u.current,[]),i.createElement("group",V({ref:u},l),i.createElement("group",{ref:f},t))}),Bo=i.forwardRef(function({points:t,color:r=16777215,vertexColors:n,linewidth:s,lineWidth:a,segments:l,dashed:c,...f},u){var m,h;const x=ze(p=>p.size),g=i.useMemo(()=>l?new Nt:new Vt,[l]),[v]=i.useState(()=>new qt),y=(n==null||(m=n[0])==null?void 0:m.length)===4?4:3,j=i.useMemo(()=>{const p=l?new Yt:new Xt,w=t.map(d=>{const z=Array.isArray(d);return d instanceof b||d instanceof pe?[d.x,d.y,d.z]:d instanceof Pe?[d.x,d.y,0]:z&&d.length===3?[d[0],d[1],d[2]]:z&&d.length===2?[d[0],d[1],0]:d});if(p.setPositions(w.flat()),n){r=16777215;const d=n.map(z=>z instanceof S?z.toArray():z);p.setColors(d.flat(),y)}return p},[t,l,n,y]);return i.useLayoutEffect(()=>{g.computeLineDistances()},[t,g]),i.useLayoutEffect(()=>{c?v.defines.USE_DASH="":delete v.defines.USE_DASH,v.needsUpdate=!0},[c,v]),i.useEffect(()=>()=>{j.dispose(),v.dispose()},[j]),i.createElement("primitive",V({object:g,ref:u},f),i.createElement("primitive",{object:j,attach:"geometry"}),i.createElement("primitive",V({object:v,attach:"material",color:r,vertexColors:!!n,resolution:[x.width,x.height],linewidth:(h=s??a)!==null&&h!==void 0?h:1,dashed:c,transparent:y===4},f)))}),Wo=Bt({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new S,sectionColor:new S,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new b,worldPlanePosition:new b},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${St>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),Ho=i.forwardRef(({args:o,cellColor:t="#000000",sectionColor:r="#2080ff",cellSize:n=.5,sectionSize:s=1,followCamera:a=!1,infiniteGrid:l=!1,fadeDistance:c=100,fadeStrength:f=1,fadeFrom:u=1,cellThickness:m=.5,sectionThickness:h=1,side:x=L,...g},v)=>{Pt({GridMaterial:Wo});const y=i.useRef(null);i.useImperativeHandle(v,()=>y.current,[]);const j=new Zt,p=new b(0,1,0),w=new b(0,0,0);M(R=>{j.setFromNormalAndCoplanarPoint(p,w).applyMatrix4(y.current.matrixWorld);const C=y.current.material,q=C.uniforms.worldCamProjPosition,H=C.uniforms.worldPlanePosition;j.projectPoint(R.camera.position,q.value),H.value.set(0,0,0).applyMatrix4(y.current.matrixWorld)});const d={cellSize:n,sectionSize:s,cellColor:t,sectionColor:r,cellThickness:m,sectionThickness:h},z={fadeDistance:c,fadeStrength:f,fadeFrom:u,infiniteGrid:l,followCamera:a};return i.createElement("mesh",V({ref:y,frustumCulled:!1},g),i.createElement("gridMaterial",V({transparent:!0,"extensions-derivatives":!0,side:x},d,z)),i.createElement("planeGeometry",{args:o}))}),vt=(o,t)=>{"updateRanges"in o?o.updateRanges[0]=t:o.updateRange=t};function Do(o){return typeof o=="function"}const gt=new J,yt=new J,ye=[],de=new $t;class Oo extends Qt{constructor(){super(),this.color=new S("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var t;return(t=this.instance.current)==null?void 0:t.geometry}raycast(t,r){const n=this.instance.current;if(!n||!n.geometry||!n.material)return;de.geometry=n.geometry;const s=n.matrixWorld,a=n.userData.instances.indexOf(this.instanceKey);if(!(a===-1||a>n.count)){n.getMatrixAt(a,gt),yt.multiplyMatrices(s,gt),de.matrixWorld=yt,n.material instanceof Kt?de.material.side=n.material.side:de.material.side=n.material[0].side,de.raycast(t,ye);for(let l=0,c=ye.length;l<c;l++){const f=ye[l];f.instanceId=a,f.object=this,r.push(f)}ye.length=0}}}const Lt=i.createContext(null),wt=new J,Mt=new J,No=new J,jt=new b,bt=new Q,zt=new b,Vo=o=>o.isInstancedBufferAttribute,At=i.forwardRef(({context:o,children:t,...r},n)=>{i.useMemo(()=>Pt({PositionMesh:Oo}),[]);const s=i.useRef();i.useImperativeHandle(n,()=>s.current,[]);const{subscribe:a,getParent:l}=i.useContext(o||Lt);return i.useLayoutEffect(()=>a(s),[]),i.createElement("positionMesh",V({instance:l(),instanceKey:s,ref:s},r),t)}),qo=i.forwardRef(({context:o,children:t,range:r,limit:n=1e3,frames:s=1/0,...a},l)=>{const[{localContext:c,instance:f}]=i.useState(()=>{const w=i.createContext(null);return{localContext:w,instance:i.forwardRef((d,z)=>i.createElement(At,V({context:w},d,{ref:z})))}}),u=i.useRef(null);i.useImperativeHandle(l,()=>u.current,[]);const[m,h]=i.useState([]),[[x,g]]=i.useState(()=>{const w=new Float32Array(n*16);for(let d=0;d<n;d++)No.identity().toArray(w,d*16);return[w,new Float32Array([...new Array(n*3)].map(()=>1))]});i.useEffect(()=>{u.current.instanceMatrix.needsUpdate=!0});let v=0,y=0;const j=i.useRef([]);i.useLayoutEffect(()=>{j.current=Object.entries(u.current.geometry.attributes).filter(([w,d])=>Vo(d))}),M(()=>{if(s===1/0||v<s){u.current.updateMatrix(),u.current.updateMatrixWorld(),wt.copy(u.current.matrixWorld).invert(),y=Math.min(n,r!==void 0?r:n,m.length),u.current.count=y,vt(u.current.instanceMatrix,{offset:0,count:y*16}),vt(u.current.instanceColor,{offset:0,count:y*3});for(let w=0;w<m.length;w++){const d=m[w].current;d.matrixWorld.decompose(jt,bt,zt),Mt.compose(jt,bt,zt).premultiply(wt),Mt.toArray(x,w*16),u.current.instanceMatrix.needsUpdate=!0,d.color.toArray(g,w*3),u.current.instanceColor.needsUpdate=!0}v++}});const p=i.useMemo(()=>({getParent:()=>u,subscribe:w=>(h(d=>[...d,w]),()=>h(d=>d.filter(z=>z.current!==w.current)))}),[]);return i.createElement("instancedMesh",V({userData:{instances:m,limit:n,frames:s},matrixAutoUpdate:!1,ref:u,args:[null,null,0],raycast:()=>null},a),i.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:x.length/16,array:x,itemSize:16,usage:Ae}),i.createElement("instancedBufferAttribute",{attach:"instanceColor",count:g.length/3,array:g,itemSize:3,usage:Ae}),Do(t)?i.createElement(c.Provider,{value:p},t(f)):o?i.createElement(o.Provider,{value:p},t):i.createElement(Lt.Provider,{value:p},t))}),ee=i.forwardRef(({children:o,enabled:t=!0,speed:r=1,rotationIntensity:n=1,floatIntensity:s=1,floatingRange:a=[-.1,.1],autoInvalidate:l=!1,...c},f)=>{const u=i.useRef(null);i.useImperativeHandle(f,()=>u.current,[]);const m=i.useRef(Math.random()*1e4);return M(h=>{var x,g;if(!t||r===0)return;l&&h.invalidate();const v=m.current+h.clock.getElapsedTime();u.current.rotation.x=Math.cos(v/4*r)/8*n,u.current.rotation.y=Math.sin(v/4*r)/8*n,u.current.rotation.z=Math.sin(v/4*r)/20*n;let y=Math.sin(v/4*r)/10;y=F.mapLinear(y,-.1,.1,(x=a?.[0])!==null&&x!==void 0?x:-.1,(g=a?.[1])!==null&&g!==void 0?g:.1),u.current.position.y=y*s,u.current.updateMatrix()}),i.createElement("group",c,i.createElement("group",{ref:u,matrixAutoUpdate:!1},o))});class Yo extends Jt{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${St>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const Xo=o=>new b().setFromSpherical(new Ct(o,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),Zo=i.forwardRef(({radius:o=100,depth:t=50,count:r=5e3,saturation:n=0,factor:s=4,fade:a=!1,speed:l=1},c)=>{const f=i.useRef(),[u,m,h]=i.useMemo(()=>{const g=[],v=[],y=Array.from({length:r},()=>(.5+.5*Math.random())*s),j=new S;let p=o+t;const w=t/r;for(let d=0;d<r;d++)p-=w*Math.random(),g.push(...Xo(p).toArray()),j.setHSL(d/r,n,.9),v.push(j.r,j.g,j.b);return[new Float32Array(g),new Float32Array(v),new Float32Array(y)]},[r,t,s,o,n]);M(g=>f.current&&(f.current.uniforms.time.value=g.clock.getElapsedTime()*l));const[x]=i.useState(()=>new Yo);return i.createElement("points",{ref:c},i.createElement("bufferGeometry",null,i.createElement("bufferAttribute",{attach:"attributes-position",args:[u,3]}),i.createElement("bufferAttribute",{attach:"attributes-color",args:[m,3]}),i.createElement("bufferAttribute",{attach:"attributes-size",args:[h,1]})),i.createElement("primitive",{ref:f,object:x,attach:"material",blending:T,"uniforms-fade-value":a,depthWrite:!1,transparent:!0,vertexColors:!0}))}),Qo=({position:o})=>{const t=i.useRef();E();const[r,n]=i.useState(null);return i.useEffect(()=>{new W().load("/assets/images/digital_fire.jpg",s=>{s.colorSpace=O,n(s)})},[]),M(s=>{if(t.current){const a=window.icebreakerThaw||0;t.current.material.opacity=a*.9;const l=1+Math.sin(s.clock.elapsedTime*5)*.1;t.current.scale.setScalar(l)}}),r?e.jsx("group",{position:o,children:e.jsx(It,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{ref:t,position:[0,20,0],children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,opacity:0,depthWrite:!1,blending:T})]})})}):null},$o=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ko=`
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
`,Jo=({position:o,angle:t,delay:r})=>{const n=i.useRef(),s=i.useRef();E();const a=i.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new S("#44aaff")},uPartyColor:{value:new S("#ff8844")}}),[]);return M(l=>{if(!n.current||!s.current)return;a.uTime.value=l.clock.elapsedTime;const c=window.icebreakerThaw||0,f=F.clamp((c-r)*2,0,1);a.uState.value=f;const u=Math.sin(l.clock.elapsedTime*8+r*10)*f;if(n.current.position.y=o[1]+(u>0?u*2:0)+15,f>0){const m=0-o[0],h=0-(o[2]- -200),x=Math.sqrt(m*m+h*h)||1;n.current.position.x=o[0]+m/x*(f*20),n.current.position.z=o[2]+h/x*(f*20)}else n.current.position.x=o[0],n.current.position.z=o[2]}),e.jsx("group",{ref:n,position:[o[0],o[1]+15,o[2]],children:e.jsx(It,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:e.jsxs("mesh",{children:[e.jsx("planeGeometry",{args:[20,30]}),e.jsx("shaderMaterial",{ref:s,vertexShader:$o,fragmentShader:Ko,uniforms:a,transparent:!0,side:B,depthWrite:!1})]})})})},er=({position:o})=>{const r=i.useMemo(()=>{const n=[];for(let s=0;s<60;s++){const a=Math.random()*Math.PI*2,l=30+Math.random()*80;n.push({position:[o[0]+Math.cos(a)*l,o[1],o[2]+Math.sin(a)*l],angle:a,delay:Math.random()*.5})}return n},[60,o]);return e.jsx("group",{children:r.map((n,s)=>e.jsx(Jo,{...n},s))})},Se=({appId:o,position:t})=>e.jsx("group",{position:t}),tr=({position:o})=>{const t=i.useRef(),[r,n]=i.useState(null);return E(),i.useEffect(()=>{new W().load("/icebreaker_logo.png",s=>{s.colorSpace=O,n(s)})},[]),M(s=>{if(t.current&&(t.current.rotation.y=s.clock.elapsedTime*.5,t.current.position.y=o[1]+Math.sin(s.clock.elapsedTime*2)*5,t.current.material)){const a=window.icebreakerThaw||0;t.current.material.opacity=a*.9,t.current.scale.setScalar(.01+a)}}),r?e.jsxs("mesh",{ref:t,position:o,children:[e.jsx("planeGeometry",{args:[40,40]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,opacity:0,depthWrite:!1,blending:T,side:B})]}):null},or=({numTrees:o=30,radius:t=50,centerZ:r=-500})=>{const n=i.useRef(),s=i.useRef();E();const a=i.useMemo(()=>new Z,[]),l=i.useMemo(()=>{const c=[];for(let f=0;f<o;f++){const u=f/o*Math.PI*2+Math.random()*.5,m=t+Math.random()*20;c.push({position:new b(Math.cos(u)*m,-18,Math.sin(u)*m+r),rotation:new _e(0,u+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return c},[o,t,r]);return M(()=>{if(!n.current||!s.current)return;const c=window.icebreakerThaw||0;for(let f=0;f<o;f++){const u=l[f],m=Math.max(0,(c-u.delay)*2),h=F.clamp(m,0,1)*u.scale;a.position.copy(u.position),a.rotation.copy(u.rotation),a.scale.setScalar(h),a.updateMatrix(),n.current.setMatrixAt(f,a.matrix),a.position.y+=18*h,a.updateMatrix(),s.current.setMatrixAt(f,a.matrix)}n.current.instanceMatrix.needsUpdate=!0,s.current.instanceMatrix.needsUpdate=!0}),e.jsxs("group",{children:[e.jsxs("instancedMesh",{ref:n,args:[null,null,o],children:[e.jsx("cylinderGeometry",{args:[.5,1,20,8]}),e.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),e.jsxs("instancedMesh",{ref:s,args:[null,null,o],children:[e.jsx("sphereGeometry",{args:[8,4,4]}),e.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},rr=`
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
`,nr=`
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
`,sr=({startZ:o,endZ:t})=>{const r=i.useRef(),n=i.useRef(),[s,a]=i.useState(null),l=Math.abs(t-o),c=(o+t)/2,f=i.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return i.useEffect(()=>{new W().load("/assets/images/ice_cavern.jpg",u=>{u.wrapS=Me,u.wrapT=Me,u.repeat.set(4,2),u.colorSpace=O,a(u),f.tMap.value=u})},[f]),M(u=>{if(n.current){const m=window.icebreakerThaw||0;f.uThaw.value=m,f.uTime.value=u.clock.elapsedTime}}),s?e.jsxs("mesh",{ref:r,position:[0,0,c],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[120,120,l,128,128,!0]}),e.jsx("shaderMaterial",{ref:n,vertexShader:rr,fragmentShader:nr,uniforms:f,transparent:!0,side:L})]}):null},ar=({position:o})=>{const t=i.useRef();return M(r=>{if(t.current){const n=window.icebreakerThaw||0,s=F.lerp(.01,50,Math.pow(n,2));t.current.scale.setScalar(s),t.current.visible=n>0}}),e.jsxs("mesh",{ref:t,position:[o[0],o[1]+1,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[20,64]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},ir=({position:o})=>{const t=i.useRef();return M(r=>{if(t.current){const n=window.icebreakerThaw||0;t.current.scale.setScalar(n>0?1:.001)}}),e.jsxs("mesh",{ref:t,position:[o[0],o[1]+1.5,o[2]],rotation:[-Math.PI/2,0,0],children:[e.jsx("circleGeometry",{args:[96,64]}),e.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},lr=({position:o})=>{const t=i.useRef();return M(()=>{if(t.current){const r=window.icebreakerThaw||0;t.current.opacity=1-Math.pow(r,2),t.current.transparent=!0}}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:o,children:[e.jsx("planeGeometry",{args:[1e3,3e3]}),e.jsx("meshStandardMaterial",{ref:t,color:"#001133",roughness:.1,metalness:.8})]})},cr=({centerZ:o})=>{const t=i.useRef(),r=i.useRef(),n=i.useMemo(()=>({uColorBottom:{value:new S("#ffaa55")},uColorTop:{value:new S("#00f3ff")},uOpacity:{value:0}}),[]);return M(()=>{const s=window.icebreakerThaw||0;t.current&&(t.current.uniforms.uOpacity.value=s),r.current&&(r.current.intensity=s*.6)}),e.jsxs("group",{children:[e.jsxs("mesh",{scale:2e3,children:[e.jsx("sphereGeometry",{args:[1,32,32]}),e.jsx("shaderMaterial",{ref:t,side:L,transparent:!0,depthWrite:!1,uniforms:n,vertexShader:`
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
          `})]}),e.jsx("directionalLight",{ref:r,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),e.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},fr=()=>{const o=E(),[t,r]=i.useState(!1),[n,s]=i.useState(!1),[a,l]=i.useState(!1),c=i.useRef({triggered:!1,timer:0}),f=i.useRef({triggered:!1,timer:0});return i.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),M((u,m)=>{const h=o.offset;!f.current.triggered&&h>=.22&&(f.current.triggered=!0,l(!0),window.icebreakerCaveLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerCaveLocked&&(o.el&&(o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight)),f.current.timer+=m,f.current.timer>1.5&&(window.icebreakerCaveLocked=!1,l(!1),o.el&&(o.el.style.overflow="auto"))),!t&&h>=.265&&window.icebreakerThaw<1&&(r(!0),window.icebreakerThawLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerThawLocked?(o.el&&(o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight)),window.icebreakerThaw+=m*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,o.el&&!n&&(o.el.style.overflow="auto"),r(!1))):h<.2&&(window.icebreakerThaw=0),!c.current.triggered&&h>=.285&&window.icebreakerThaw>=1&&(c.current.triggered=!0,s(!0),window.icebreakerTextLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerTextLocked&&(o.el&&(o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight)),c.current.timer+=m,c.current.timer>1.5&&(window.icebreakerTextLocked=!1,s(!1),o.el&&(o.el.style.overflow="auto")))}),null},ur=({position:o,rotation:t,visible:r=!0})=>e.jsxs("group",{position:o,rotation:t,visible:r,children:[e.jsx(fr,{}),e.jsx(cr,{centerZ:0}),e.jsx(sr,{startZ:1e3,endZ:-1e3}),e.jsx(lr,{position:[0,-20,0]}),e.jsx(ar,{position:[0,-20,0]}),e.jsx(ir,{position:[0,-20,0]}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),e.jsx(Qo,{position:[0,-20,0]}),e.jsx(tr,{position:[0,30,0]}),e.jsx(or,{radius:60,centerZ:0}),e.jsx(er,{position:[0,-20,0]}),e.jsx(Se,{appId:"icebreaker",position:[-80,20,-200]})]}),dr=`
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
`,mr=`
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
`,hr=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,pr=({position:o,visible:t})=>e.jsxs("group",{visible:t,position:o,children:[e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),xr=({position:o,visible:t})=>{const r=E(),n=i.useRef(),s=i.useRef(),a=i.useRef(),[l,c]=i.useState(null),[f,u]=i.useState(null),[m,h]=i.useState(!1),x=i.useRef({triggered:!1,timer:0});i.useEffect(()=>{window.mindwaveLocked=!1,new W().load("/mindwave-logo.png",y=>{y.colorSpace=O,c(y)}),new W().load("/tribal-sun.png",y=>{y.colorSpace=O,u(y)})},[]);const g=o?o[2]:0,v=i.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return M((y,j)=>{if(!t)return;const p=r.offset;!x.current.triggered&&p>=.075&&(x.current.triggered=!0,h(!0),window.mindwaveLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.08*(r.el.scrollHeight-r.el.clientHeight))),window.mindwaveLocked&&(r.el&&(r.el.scrollTop=.08*(r.el.scrollHeight-r.el.clientHeight)),x.current.timer+=j,x.current.timer>1.5&&(window.mindwaveLocked=!1,h(!1),r.el&&(r.el.style.overflow="auto")));const w=y.clock.elapsedTime;if(n.current){n.current.uniforms.uTime.value=w;const d=Math.abs(y.camera.position.z-g);let R=1-Math.min(d/1e3,1);R=Math.pow(R,2),n.current.uniforms.uScrollProgress.value=R}if(s.current){s.current.position.y=-7+Math.sin(w*2)*2;const d=1+Math.sin(w*4)*.05;s.current.scale.set(d,d,1),s.current.rotation.y=0}if(a.current){a.current.position.y=125+Math.sin(w*2)*2,a.current.rotation.z=w*.1;const d=1+Math.sin(w*3)*.05;a.current.scale.set(d,d,1)}}),e.jsxs("group",{visible:t,position:o,children:[e.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[e.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),e.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:hr,side:L,depthWrite:!1})]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[e.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),e.jsx("shaderMaterial",{ref:n,vertexShader:dr,fragmentShader:mr,uniforms:v,transparent:!0,side:B,wireframe:!1})]}),f&&e.jsxs("mesh",{ref:a,position:[0,-10,-85],children:[e.jsx("planeGeometry",{args:[140,140]}),e.jsx("meshBasicMaterial",{map:f,transparent:!0,side:B,depthWrite:!1,blending:T,color:"#00ffff",opacity:.6})]}),l&&e.jsxs("mesh",{ref:s,position:[0,-10,-80],children:[e.jsx("planeGeometry",{args:[80,80]}),e.jsx("meshBasicMaterial",{map:l,transparent:!0,side:B,depthWrite:!1,blending:T})]}),e.jsx(pr,{position:[0,-5,-80],visible:!0}),e.jsx(Se,{appId:"mindwave",position:[40,0,-40]})]})},vr=()=>{const t=i.useRef([]),r=i.useRef(document.createElement("canvas")),n=i.useMemo(()=>{r.current.width=512,r.current.height=1024;const a=r.current.getContext("2d");a.fillStyle="#010a15",a.fillRect(0,0,512,1024),a.strokeStyle="#004488",a.lineWidth=2;for(let c=0;c<1024;c+=32)a.beginPath(),a.moveTo(0,c),a.lineTo(512,c),a.stroke(),c<512&&(a.beginPath(),a.moveTo(c,0),a.lineTo(c,1024),a.stroke());a.fillStyle="#0088ff",a.fillRect(40,40,432,60),a.fillStyle="#00ffff",a.font="24px monospace",a.fillText("CLASSIFIED // AI REVIEW",60,78),a.fillStyle="#003366";for(let c=0;c<30;c++){let f=140+c*28;a.fillRect(40,f,432-Math.random()*200,12)}a.strokeStyle="#ff0033",a.lineWidth=5,a.beginPath(),a.arc(400,850,60,0,Math.PI*2),a.stroke(),a.beginPath(),a.arc(400,850,50,0,Math.PI*2),a.stroke();const l=new Rt(r.current);return l.colorSpace=O,l},[]),s=i.useMemo(()=>Array.from({length:50}).map((a,l)=>({delay:l*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-150+Math.random()*100})),[50]);return M((a,l)=>{const c=a.clock.elapsedTime;s.forEach((f,u)=>{const m=t.current[u];m&&(c>f.delay&&(f.state==="waiting"&&(f.state="approaching"),f.state==="approaching"&&(f.x-=8e3*l,f.x<=0&&(f.x=0,f.state="scanning",f.scanTimer=c)),f.state==="scanning"&&c-f.scanTimer>.05&&(f.state="approved"),f.state==="approved"&&(f.x-=8e3*l,f.x<-3e3&&(f.x=3e3+Math.random()*500,f.state="approaching",f.y=(Math.random()-.5)*150-50))),m.position.set(f.x,f.y,f.z),f.state==="scanning"?(m.rotation.set(0,0,0),m.scale.setScalar(1.2)):f.state==="approved"?(m.rotation.set(0,.4,0),m.scale.setScalar(1)):(m.rotation.set(0,-.4,0),m.scale.setScalar(1)),f.state==="scanning"?m.color.set("#ffffff"):f.state==="approved"?m.color.set("#00ff66"):m.color.set("#0088ff"))})}),e.jsxs(qo,{limit:50,range:50,children:[e.jsx("planeGeometry",{args:[100,200]}),e.jsx("meshBasicMaterial",{map:n,side:B,transparent:!0,opacity:.9,blending:T,depthWrite:!1}),s.map((a,l)=>e.jsx(At,{ref:c=>t.current[l]=c,position:[a.x,a.y,a.z]},l))]})},gr=()=>{const o=ne(W,"/legal_eagle_courtroom_bg.jpg");return o.colorSpace=O,e.jsxs("group",{children:[e.jsxs("mesh",{position:[0,0,-2500],children:[e.jsx("planeGeometry",{args:[4e3,2250]}),e.jsx("meshBasicMaterial",{map:o,depthWrite:!1,transparent:!0,opacity:1,fog:!1})]}),[-1,1].map((t,r)=>e.jsxs("mesh",{position:[t*800,0,-1e3],children:[e.jsx("boxGeometry",{args:[200,2e3,200]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.2})]},r)),[-1,1].map((t,r)=>e.jsxs("mesh",{position:[t*1400,0,-1500],children:[e.jsx("boxGeometry",{args:[300,2e3,300]}),e.jsx("meshStandardMaterial",{color:"#030303",metalness:.9,roughness:.3})]},r+2))]})},yr=({logoTex:o})=>{const t=i.useMemo(()=>({uTime:{value:0}}),[]),r=i.useMemo(()=>({uTime:{value:0},uColor:{value:new S("#00ffff")}}),[]);return M(n=>{t.uTime.value=n.clock.elapsedTime,r.uTime.value=n.clock.elapsedTime}),e.jsxs("group",{position:[0,-100,-800],children:[e.jsxs("mesh",{position:[0,-200,0],children:[e.jsx("boxGeometry",{args:[1200,600,200]}),e.jsx("meshStandardMaterial",{color:"#020202",metalness:1,roughness:.1})]}),e.jsxs("mesh",{position:[0,150,0],children:[e.jsx("boxGeometry",{args:[800,100,150]}),e.jsx("meshStandardMaterial",{color:"#050505",metalness:.8,roughness:.2})]}),e.jsxs(ee,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[e.jsxs("mesh",{position:[0,400,0],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1,blending:T,fog:!1})]}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,150,0],fontSize:100,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",fog:!1,children:"LEGAL EAGLE"})]})]})},wr=({position:o,rotation:t,visible:r})=>{const n=ne(W,"/legal_eagle_logo.png");return n.colorSpace=O,e.jsxs("group",{visible:r,position:o,rotation:t,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[0,1e3,1e3],intensity:1.5,color:"#00ffff"}),e.jsx("pointLight",{position:[0,500,-400],intensity:2,color:"#0044ff",distance:2e3}),e.jsx(gr,{}),e.jsx(yr,{logoTex:n}),e.jsx(vr,{}),e.jsx(Se,{appId:"legaleagle",position:[200,100,-150]})]})},ke=o=>{const r=new oo;o==="interceptor"?(r.moveTo(1*1.8,0),r.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),r.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),r.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),r.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):o==="viper"?(r.moveTo(1*1.2,1*.3),r.lineTo(1*.4,1*.4),r.lineTo(-1*.8,1*1.2),r.lineTo(-1*1.2,1*.8),r.lineTo(-1*.8,0),r.lineTo(-1*1.2,-1*.8),r.lineTo(-1*.8,-1*1.2),r.lineTo(1*.4,-1*.4),r.lineTo(1*1.2,-1*.3),r.lineTo(1*.6,0)):o==="bulwark"&&(r.moveTo(1*1.5,0),r.lineTo(1*.8,1*1.2),r.lineTo(-1*.5,1*1.5),r.lineTo(-1*1.5,1*.8),r.lineTo(-1*1.5,-1*.8),r.lineTo(-1*.5,-1*1.5),r.lineTo(1*.8,-1*1.2));const n={steps:1,depth:o==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},s=new ro(r,n);return s.center(),s.rotateY(-Math.PI/2),s.rotateZ(-Math.PI/2),s},Mr=({position:o})=>{const t=i.useRef();return M((r,n)=>{t.current&&(t.current.rotation.z-=n*.1,t.current.rotation.x=Math.sin(r.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:t,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,300,32]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),e.jsxs("mesh",{children:[e.jsx("torusGeometry",{args:[400,40,32,64]}),e.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((r,n)=>e.jsxs("mesh",{position:[Math.cos(r)*200,0,Math.sin(r)*200],rotation:[0,-r,Math.PI/2],children:[e.jsx("cylinderGeometry",{args:[20,20,300,16]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},n)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((r,n)=>e.jsxs("mesh",{position:[Math.cos(r)*400,0,Math.sin(r)*400],rotation:[Math.PI/2,0,-r],children:[e.jsx("boxGeometry",{args:[60,60,90]}),e.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${n}`))]})},jr=({position:o})=>{const t=i.useRef(),r=i.useMemo(()=>ke("bulwark"),[]);return M((n,s)=>{t.current&&(t.current.position.y=Math.sin(n.clock.elapsedTime*.2)*40,t.current.rotation.y+=s*.05,t.current.rotation.z=Math.sin(n.clock.elapsedTime*.1)*.1)}),e.jsxs("group",{position:o,ref:t,scale:[120,120,120],children:[e.jsx("mesh",{geometry:r,children:e.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),e.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),e.jsxs("mesh",{position:[0,0,1.5],children:[e.jsx("sphereGeometry",{args:[.2,16,16]}),e.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},br=({position:o})=>{const a=i.useMemo(()=>new Z,[]),l=i.useMemo(()=>new Z,[]),c=i.useRef(),f=i.useRef(),u=i.useRef(),m=i.useRef(),h=i.useMemo(()=>ke("interceptor"),[]),x=i.useMemo(()=>ke("viper"),[]),g=i.useMemo(()=>{const j=new eo(.5,.5,20,4);return j.rotateX(Math.PI/2),j},[]),v=i.useMemo(()=>Array.from({length:80},(j,p)=>{const w=p>=40;return{pos:new b((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new b,target:new b,team:w?1:0,meshIndex:w?p-40:p,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),y=i.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new b,vel:new b,color:new S,life:0})),[60]);return M((j,p)=>{if(!c.current||!f.current||!u.current||!m.current)return;let w=0;v.forEach(d=>{if(d.state===0){if(Math.random()<.02||d.target.lengthSq()===0){const P=v[Math.floor(Math.random()*80)];P&&P.team!==d.team&&P.state===0?(d.target.copy(P.pos),d.target.x+=(Math.random()-.5)*200,d.target.y+=(Math.random()-.5)*200,d.target.z+=(Math.random()-.5)*200):d.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const z=new b().subVectors(d.target,d.pos),R=z.length();if(R>150&&R<800&&Math.random()<.03){const P=y.find(A=>!A.active);P&&(P.active=!0,P.pos.copy(d.pos),P.vel.copy(z).normalize().multiplyScalar(2500),P.color.set(d.team===0?"#00ffff":"#ff3300"),P.life=.8)}const C=z.normalize().multiplyScalar(400*p);d.vel.add(C),d.vel.clampLength(0,600),d.pos.addScaledVector(d.vel,p),d.trail.push(d.pos.clone()),d.trail.length>5&&d.trail.shift(),a.position.copy(d.pos);const q=a.position.clone().add(d.vel);a.lookAt(q);const H=C.clone().cross(d.vel).y;a.rotateZ(H*.01),a.scale.set(30,30,30)}else{d.explosionTimer+=p,a.position.copy(d.pos),a.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const z=30*Math.max(.1,1-d.explosionTimer*2);a.scale.set(z,z,z),d.explosionTimer>.5&&(d.state=0,d.health=100,d.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),d.vel.set(0,0,0),d.trail=[])}a.updateMatrix(),d.team===0?(c.current.setMatrixAt(d.meshIndex,a.matrix),c.current.setColorAt(d.meshIndex,d.state===0?new S("#00aaff"):new S("#ffaa00"))):(f.current.setMatrixAt(d.meshIndex,a.matrix),f.current.setColorAt(d.meshIndex,d.state===0?new S("#ff0033"):new S("#ffaa00"))),d.trail.forEach((z,R)=>{if(w<400){a.position.copy(z),a.rotation.set(0,0,0);const C=R/5*10;a.scale.set(C,C,C),a.updateMatrix(),m.current.setMatrixAt(w,a.matrix),m.current.setColorAt(w,d.team===0?new S("#00ffff"):new S("#ff5500")),w++}})});for(let d=w;d<400;d++)a.position.set(0,9999,0),a.scale.set(0,0,0),a.updateMatrix(),m.current.setMatrixAt(d,a.matrix);y.forEach((d,z)=>{d.active?(d.pos.addScaledVector(d.vel,p),d.life-=p,v.forEach(R=>{R.state===0&&d.pos.distanceTo(R.pos)<50&&(R.health-=50,d.active=!1,R.health<=0&&(R.state=1,R.explosionTimer=0))}),d.life<=0&&(d.active=!1),l.position.copy(d.pos),l.lookAt(l.position.clone().add(d.vel)),l.scale.set(1,1,1)):(l.position.set(0,9999,0),l.scale.set(0,0,0)),l.updateMatrix(),u.current.setMatrixAt(z,l.matrix),u.current.setColorAt(z,d.color)}),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),m.current.instanceMatrix.needsUpdate=!0,m.current.instanceColor&&(m.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0)}),e.jsxs("group",{position:o,children:[e.jsx("instancedMesh",{ref:c,args:[h,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:f,args:[x,null,40],children:e.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),e.jsx("instancedMesh",{ref:u,args:[g,null,60],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:T})}),e.jsx("instancedMesh",{ref:m,args:[new to(1,4,4),null,400],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:T,depthWrite:!1})})]})},zr=({position:o,rotation:t,visible:r})=>{const n=ne(W,"/interstellar_logo_final.png");n.colorSpace=O;const s=E(),a=i.useRef({triggered:!1});return M(()=>{s&&s.offset>=.41&&s.offset<=.43&&!a.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,a.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),e.jsxs("group",{visible:r,position:o,rotation:t,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),e.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),e.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:L})]}),e.jsx(Mr,{position:[0,-200,-800]}),e.jsx(jr,{position:[0,-120,-100]}),e.jsx(br,{position:[0,-50,0]}),e.jsxs("group",{position:[0,120,200],children:[e.jsxs("mesh",{position:[0,50,0],children:[e.jsx("planeGeometry",{args:[180,180]}),e.jsx("meshBasicMaterial",{map:n,transparent:!0,depthWrite:!1})]}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),e.jsx(Se,{appId:"interstellar",position:[-150,100,200]})]})},Pr=({position:o})=>{const t=i.useRef();return M((r,n)=>{t.current&&(t.current.rotation.y+=n*.1)}),e.jsxs("group",{position:o,ref:t,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[40,40,200,16]}),e.jsx("meshStandardMaterial",{color:"#223344",metalness:.8,roughness:.2})]}),e.jsxs("mesh",{position:[0,0,80],rotation:[Math.PI/2,0,0],children:[e.jsx("coneGeometry",{args:[120,60,32]}),e.jsx("meshStandardMaterial",{color:"#112233",metalness:.5,roughness:.5})]}),e.jsxs("mesh",{position:[0,0,100],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[100,100,2,32]}),e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.8,blending:T})]}),e.jsxs("mesh",{position:[-150,0,0],children:[e.jsx("boxGeometry",{args:[200,50,5]}),e.jsx("meshStandardMaterial",{color:"#001122",metalness:.9,roughness:.1,emissive:"#002244",emissiveIntensity:.5})]}),e.jsxs("mesh",{position:[150,0,0],children:[e.jsx("boxGeometry",{args:[200,50,5]}),e.jsx("meshStandardMaterial",{color:"#001122",metalness:.9,roughness:.1,emissive:"#002244",emissiveIntensity:.5})]}),e.jsxs("mesh",{position:[0,120,0],children:[e.jsx("cylinderGeometry",{args:[2,2,100]}),e.jsx("meshStandardMaterial",{color:"#8899aa"})]}),e.jsxs("mesh",{position:[0,170,0],children:[e.jsx("sphereGeometry",{args:[5,16,16]}),e.jsx("meshBasicMaterial",{color:"#ff0088"})]})]})},Sr=({position:o})=>{const t=i.useRef();return M(r=>{t.current&&(t.current.position.z=r.clock.elapsedTime*800%500,t.current.scale.z=1+Math.sin(r.clock.elapsedTime*10)*.5)}),e.jsx("group",{position:o,children:e.jsxs("mesh",{ref:t,rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[5,5,200,8]}),e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,blending:T})]})})},Cr=()=>{const o=ne(W,"/autopilot_logo.png");return o.colorSpace=O,e.jsxs("mesh",{position:[0,350,-600],children:[e.jsx("planeGeometry",{args:[250,250]}),e.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1,blending:T})]})},Rr=({position:o,rotation:t,visible:r})=>{const n=E(),[s,a]=i.useState(!1),l=i.useRef({timer:0,triggered:!1});return M((c,f)=>{r&&(n.offset>=.595&&n.offset<=.605&&!l.current.triggered&&!window.orbitalLocked&&(window.orbitalLocked=!0,l.current.triggered=!0,l.current.timer=0,a(!0),n.el&&(n.el.style.overflow="hidden")),window.orbitalLocked&&(n.el&&(n.el.scrollTop=.6*(n.el.scrollHeight-n.el.clientHeight)),l.current.timer+=f,l.current.timer>1.5&&(window.orbitalLocked=!1,a(!1),n.el&&(n.el.style.overflow="auto"))))}),e.jsxs("group",{visible:r,position:o,rotation:t,children:[e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[200,500,500],intensity:2.5,color:"#ffffff"}),e.jsx("pointLight",{position:[0,0,200],intensity:3,color:"#00ffff",distance:1e3}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000205",side:L})]}),e.jsxs(ee,{speed:1.5,rotationIntensity:.1,floatIntensity:.5,children:[e.jsx(be.Suspense,{fallback:null,children:e.jsx(Cr,{})}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,180,-600],fontSize:80,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"ORBITAL COMMAND"}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,100,-600],fontSize:25,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"Centralizing Strategy & Global Output"}),e.jsx(Pr,{position:[0,-100,-600]}),e.jsx(Sr,{position:[0,-100,-450]})]}),e.jsx(K,{count:1e3,scale:1500,size:20,speed:.2,opacity:.3,color:"#00aaff",position:[0,0,-500]})]})},Tr=({position:o})=>{const t=i.useRef(),r=400,n=i.useMemo(()=>new Z,[]),s=i.useMemo(()=>{const a=[];for(let l=0;l<r;l++){const c=250+Math.random()*500,f=Math.random()*2*Math.PI,u=(Math.random()-.5)*300;a.push({t:Math.random()*100,factor:.5+Math.random()*1.5,speed:.005+Math.random()*.015,radius:c,theta:f,y:u})}return a},[r]);return M(()=>{s.forEach((a,l)=>{let{t:c,factor:f,speed:u,radius:m,theta:h,y:x}=a;c+=u,a.t=c,n.position.set(Math.cos(h+c)*m,x+Math.sin(c*f)*50,Math.sin(h+c)*m),n.rotation.y=-(h+c),n.updateMatrix(),t.current.setMatrixAt(l,n.matrix)}),t.current.instanceMatrix.needsUpdate=!0}),e.jsx("group",{position:o,children:e.jsxs("instancedMesh",{ref:t,args:[null,null,r],children:[e.jsx("coneGeometry",{args:[4,15,8]}),e.jsx("meshStandardMaterial",{color:"#00ffcc",metalness:.8,roughness:.2,emissive:"#005544",emissiveIntensity:.5})]})})},kr=({position:o})=>{const t=i.useRef();return M((r,n)=>{t.current&&(t.current.position.y=Math.sin(r.clock.elapsedTime*1.5)*20)}),e.jsxs("group",{position:o,ref:t,children:[e.jsxs("mesh",{children:[e.jsx("capsuleGeometry",{args:[60,200,16,32]}),e.jsx("meshStandardMaterial",{color:"#1a1a24",metalness:.9,roughness:.3})]}),e.jsxs("mesh",{position:[-80,0,0],rotation:[0,0,-Math.PI/6],children:[e.jsx("boxGeometry",{args:[100,10,80]}),e.jsx("meshStandardMaterial",{color:"#111118",metalness:.8,roughness:.4})]}),e.jsxs("mesh",{position:[80,0,0],rotation:[0,0,Math.PI/6],children:[e.jsx("boxGeometry",{args:[100,10,80]}),e.jsx("meshStandardMaterial",{color:"#111118",metalness:.8,roughness:.4})]}),e.jsxs("mesh",{position:[0,-120,0],children:[e.jsx("cylinderGeometry",{args:[40,50,20,32]}),e.jsx("meshBasicMaterial",{color:"#00ffcc",transparent:!0,opacity:.9,blending:T})]}),e.jsxs("mesh",{position:[0,-250,0],children:[e.jsx("cylinderGeometry",{args:[40,10,300,32]}),e.jsx("meshBasicMaterial",{color:"#00aa88",transparent:!0,opacity:.4,blending:T})]})]})},_r=({position:o,rotation:t,visible:r})=>{const n=E(),[s,a]=i.useState(!1),l=i.useRef({timer:0,triggered:!1});return M((c,f)=>{r&&(n.offset>=.645&&n.offset<=.655&&!l.current.triggered&&!window.swarmLocked&&(window.swarmLocked=!0,l.current.triggered=!0,l.current.timer=0,a(!0),n.el&&(n.el.style.overflow="hidden")),window.swarmLocked&&(n.el&&(n.el.scrollTop=.65*(n.el.scrollHeight-n.el.clientHeight)),l.current.timer+=f,l.current.timer>1.5&&(window.swarmLocked=!1,a(!1),n.el&&(n.el.style.overflow="auto"))))}),e.jsxs("group",{visible:r,position:o,rotation:t,children:[e.jsx("ambientLight",{intensity:.1}),e.jsx("directionalLight",{position:[0,500,200],intensity:2,color:"#00ffcc"}),e.jsx("pointLight",{position:[0,0,0],intensity:4,color:"#00ffcc",distance:1500}),e.jsxs("mesh",{rotation:[0,0,0],children:[e.jsx("sphereGeometry",{args:[2e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#020504",side:L})]}),e.jsxs(ee,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,250,200],fontSize:80,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"DRONE SWARM"}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,160,200],fontSize:25,color:"#00ffcc",anchorX:"center",anchorY:"middle",children:"Autonomous Execution & Omni-channel Reach"}),e.jsx("group",{rotation:[Math.PI/2,0,0],children:e.jsx(kr,{position:[0,0,0]})})]}),e.jsx(Tr,{position:[0,0,0]}),e.jsx(K,{count:2e3,scale:2e3,size:15,speed:.4,opacity:.5,color:"#ffffff",position:[0,0,0]})]})},Ir=`
  uniform float uTime;
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vNormal;

  // Classic 3D noise (Simplex/Perlin approximation)
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 1.0/7.0; 
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Animate noise over time
    float noiseFreq = 0.015;
    float noiseAmp = 30.0;
    vec3 noisePos = vec3(position.x * noiseFreq + uTime * 0.5, position.y * noiseFreq + uTime * 0.3, position.z * noiseFreq);
    float noise = snoise(noisePos);
    
    // Add micro details
    float noiseMicro = snoise(noisePos * 3.0) * 0.2;
    
    vDisplacement = noise + noiseMicro;
    
    vec3 newPosition = position + normal * (vDisplacement * noiseAmp);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`,Lr=`
  uniform float uTime;
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vNormal;

  void main() {
    // Gradient based on displacement
    vec3 colorCore = vec3(0.02, 0.05, 0.2); // Deep blue
    vec3 colorEdge = vec3(0.0, 1.0, 1.0);   // Cyan
    vec3 colorHighlight = vec3(1.0, 1.0, 1.0); // White
    
    float mixFactor = smoothstep(-1.0, 1.0, vDisplacement);
    
    vec3 finalColor = mix(colorCore, colorEdge, mixFactor);
    if(mixFactor > 0.8) {
        finalColor = mix(finalColor, colorHighlight, (mixFactor - 0.8) * 5.0);
    }
    
    // Add rim lighting
    float viewNormal = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
    finalColor += vec3(0.0, 0.5, 0.8) * pow(viewNormal, 3.0);

    gl_FragColor = vec4(finalColor, 0.95);
  }
`,Ar=({position:o})=>{const t=i.useRef(),r=i.useRef(),n=i.useMemo(()=>({uTime:{value:0}}),[]);return M((s,a)=>{r.current&&(r.current.uniforms.uTime.value=s.clock.elapsedTime),t.current&&(t.current.rotation.y+=a*.2,t.current.rotation.z-=a*.1)}),e.jsxs("group",{position:o,children:[e.jsxs("mesh",{ref:t,children:[e.jsx("sphereGeometry",{args:[180,128,128]}),e.jsx("shaderMaterial",{ref:r,vertexShader:Ir,fragmentShader:Lr,uniforms:n,transparent:!0,wireframe:!1})]}),e.jsxs("mesh",{scale:1.2,children:[e.jsx("sphereGeometry",{args:[180,64,64]}),e.jsx("meshBasicMaterial",{color:"#00ffff",wireframe:!0,transparent:!0,opacity:.03})]}),e.jsx("pointLight",{intensity:8,color:"#00ffff",distance:1500}),e.jsx("pointLight",{intensity:3,color:"#0055ff",distance:800,position:[0,-200,0]})]})},Er=()=>{const o=i.useRef(),t=600,r=1e3,n=i.useMemo(()=>{const f=[];for(let u=0;u<5;u++){const m=u%2===0?1:-1,h=u*200-400,x=new Tt([new b(h,-1e3,1e3),new b(h+300*m,200,200),new b(0,-200,-800),new b(h-300*m,-500,-1500),new b(h,1e3,-2500)]);f.push({points:x.getSpacedPoints(r)})}return f},[]),s=i.useMemo(()=>new Z,[]),a=i.useMemo(()=>new b,[]),l=i.useMemo(()=>new b,[]),c=i.useMemo(()=>{const f=[];for(let u=0;u<t;u++)f.push({curveIndex:u%n.length,progress:Math.random(),speed:.001+Math.random()*.003,offset:new b((Math.random()-.5)*40,(Math.random()-.5)*40,(Math.random()-.5)*40),scale:.2+Math.random()*.8});return f},[t,n.length]);return M(()=>{o.current&&(c.forEach((f,u)=>{f.progress+=f.speed,f.progress>=1&&(f.progress=0);const m=n[f.curveIndex],h=f.progress*r,x=Math.floor(h),g=Math.min(x+1,r),v=h-x,y=m.points[x],j=m.points[g];if(!y||!j)return;a.lerpVectors(y,j,v).add(f.offset),s.position.copy(a),s.scale.setScalar(f.scale);const p=Math.floor(Math.min((f.progress+.01)*r,r)),w=Math.min(p+1,r),d=m.points[p],z=m.points[w];d&&z&&(l.lerpVectors(d,z,v).add(f.offset),s.lookAt(l)),s.updateMatrix(),o.current.setMatrixAt(u,s.matrix)}),o.current.instanceMatrix.needsUpdate=!0)}),e.jsxs("instancedMesh",{ref:o,args:[null,null,t],children:[e.jsx("boxGeometry",{args:[4,4,30]}),e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,blending:T})]})},Gr=({position:o})=>{const t=i.useRef();return M((r,n)=>{t.current&&(t.current.children[0].rotation.z+=n*.1,t.current.children[1].rotation.z-=n*.15,t.current.children[2].rotation.z+=n*.05)}),e.jsxs("group",{position:o,ref:t,children:[e.jsxs("mesh",{children:[e.jsx("ringGeometry",{args:[300,302,64]}),e.jsx("meshBasicMaterial",{color:"#0088ff",transparent:!0,opacity:.4,side:B})]}),e.jsxs("mesh",{children:[e.jsx("ringGeometry",{args:[320,330,64,1,0,Math.PI*1.5]}),e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,side:B})]}),e.jsxs("mesh",{children:[e.jsx("ringGeometry",{args:[350,351,64,1,0,Math.PI]}),e.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.2,side:B})]})]})},Fr=({position:o,rotation:t,visible:r})=>{const n=E(),[s,a]=i.useState(!1);return M(()=>{r&&(n.offset>.675&&n.offset<.69&&!s&&!window.autopilotLocked&&(window.autopilotLocked=!0,a(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(n.offset<.65||n.offset>.7)&&s&&(a(!1),window.autopilotLocked=!1))}),e.jsxs("group",{visible:r,position:o,rotation:t,children:[e.jsx("ambientLight",{intensity:.2}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#010204",side:L})]}),e.jsx(Ho,{position:[0,-800,-800],args:[4e3,4e3],cellSize:100,cellThickness:1,cellColor:"#004455",sectionSize:500,sectionThickness:1.5,sectionColor:"#00aaff",fadeDistance:2e3,fadeStrength:1}),e.jsx(Ar,{position:[0,-200,-800]}),e.jsx(Gr,{position:[0,-200,-800]}),e.jsx(Er,{}),e.jsx(K,{count:2e3,scale:3e3,size:15,speed:.1,opacity:.2,color:"#00ffff",position:[0,0,-800]}),e.jsx("group",{position:[0,300,-600],children:e.jsxs(ee,{speed:2,rotationIntensity:.05,floatIntensity:.5,children:[e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:70,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:1,outlineColor:"#00ffff",children:"AUTOPILOT"}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-120,0],fontSize:28,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"Autonomous Business Agent"})]})})]})},Ur=({position:o})=>{const t=i.useRef(),r=i.useMemo(()=>({uTime:{value:0},uColor:{value:new S("#00ffff")}}),[]);return M(n=>{t.current&&(t.current.uniforms.uTime.value=n.clock.elapsedTime)}),e.jsxs("mesh",{position:o,children:[e.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),e.jsx("shaderMaterial",{ref:t,transparent:!0,side:B,blending:T,depthWrite:!1,uniforms:r,vertexShader:`
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
        `})]})},Br=()=>{const o=i.useRef(),t=i.useMemo(()=>({uTime:{value:0},uColor:{value:new S("#0044ff")},uHighlight:{value:new S("#00ffff")}}),[]);return M(r=>{o.current&&(o.current.uniforms.uTime.value=r.clock.elapsedTime)}),e.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),e.jsx("shaderMaterial",{ref:o,transparent:!0,wireframe:!0,uniforms:t,vertexShader:`
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
        `})]})},Wr=({position:o,rotation:t,visible:r})=>{const[n,s]=i.useState(null);return i.useEffect(()=>{new W().load("/cloveh2o_logo.png",l=>{l.colorSpace=O,s(l)})},[]),e.jsxs("group",{visible:r,position:o,rotation:t,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[4e3,32,32]}),e.jsx("meshBasicMaterial",{color:"#000511",side:L})]}),e.jsx(Br,{}),e.jsx(Ur,{position:[0,1800,-800]}),e.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),e.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),e.jsxs("group",{position:[0,0,-300],children:[n&&e.jsxs("mesh",{position:[0,80,0],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:n,transparent:!0,depthWrite:!1,blending:T})]}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},Hr=()=>{const t=i.useRef(),r=i.useMemo(()=>{const s=[];for(let l=0;l<2e4;l++){const c=Math.random()*Math.PI*2,f=Math.floor(Math.random()*5),u=350+f*120+Math.random()*80,m=250+f*90+Math.random()*60,h=Math.cos(c)*u,x=Math.sin(c)*m,g=f*60+Math.random()*40-20,v=["#0088ff","#ff0044","#ffffff","#00ffcc"],y=v[Math.floor(Math.random()*v.length)];s.push({position:[h,g,x],color:new S(y),flashSpeed:.5+Math.random()*2,offset:Math.random()*Math.PI*2})}return s},[]),n=i.useMemo(()=>new Z,[]);return M(s=>{if(!t.current)return;const a=s.clock.elapsedTime;r.forEach((l,c)=>{n.position.set(...l.position);const f=Math.sin(l.position[0]*.01+l.position[2]*.01+a*2)*10;n.position.y+=f;const u=Math.sin(a*l.flashSpeed+l.offset),m=u>.95?3:u>0?.8:.3;n.scale.setScalar(m),n.updateMatrix(),t.current.setMatrixAt(c,n.matrix),t.current.setColorAt(c,l.color)}),t.current.instanceMatrix.needsUpdate=!0,t.current.instanceColor&&(t.current.instanceColor.needsUpdate=!0)}),e.jsxs("group",{position:[0,-100,0],children:[e.jsxs("instancedMesh",{ref:t,args:[null,null,2e4],children:[e.jsx("sphereGeometry",{args:[2,4,4]}),e.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.8,blending:T})]}),[0,1,2,3,4].map(s=>e.jsxs("mesh",{position:[0,s*60-25,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("torusGeometry",{args:[350+s*120,3,4,64]}),e.jsx("meshBasicMaterial",{color:"#00ffcc",transparent:!0,opacity:.2,wireframe:!0})]},s)),e.jsxs(ee,{speed:2,floatIntensity:1,position:[0,400,-600],children:[e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[400,200,20]}),e.jsx("meshPhysicalMaterial",{color:"#000000",transmission:.9,roughness:.1})]}),e.jsxs("mesh",{position:[0,0,11],children:[e.jsx("planeGeometry",{args:[380,180]}),e.jsx("meshBasicMaterial",{color:"#002244"})]}),e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,12],fontSize:60,color:"#00ffff",outlineWidth:1,children:"FANTASY QUANT"})]})]})},we=({color:o,number:t,groupRef:r,armRef:n})=>e.jsxs("group",{ref:r,children:[e.jsxs("mesh",{position:[0,10,0],children:[e.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.3,roughness:.4})]}),e.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[e.jsx("sphereGeometry",{args:[2.5,16,16]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),e.jsxs("group",{position:[0,17,0],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[2.8,32,32]}),e.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.8,metalness:.5})]}),e.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[e.jsx("boxGeometry",{args:[3.5,2,2]}),e.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),e.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:n,children:e.jsxs("mesh",{position:[0,-3.5,0],children:[e.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),e.jsxs("mesh",{position:[-1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),e.jsxs("mesh",{position:[1.8,3,0],children:[e.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),e.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),t&&e.jsx(k,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",children:t})]}),Dr=({position:o,rotation:t})=>{const r=i.useRef(),n=i.useRef(),s=i.useRef(),a=i.useRef(),l=i.useRef(),c=i.useRef(),f=i.useMemo(()=>new b(100,0,0),[]),u=i.useMemo(()=>new b(100,0,20),[]),m=i.useMemo(()=>new b(30,0,100),[]),h=i.useMemo(()=>new b(0,0,-20),[]),x=i.useMemo(()=>new b(20,0,220),[]),g=i.useMemo(()=>new b,[]),v=i.useMemo(()=>new b,[]);return M(y=>{const j=y.clock.elapsedTime%6;if(s.current&&s.current.rotation.set(0,0,-.3),j<.5)n.current&&n.current.position.copy(f),a.current&&a.current.position.copy(u),l.current&&l.current.position.copy(m),r.current&&r.current.position.copy(h),c.current&&c.current.position.copy(h).add(g.set(4.5,12,2));else if(j<4){const p=(j-.5)/3.5;if(n.current&&(p<.5?n.current.position.lerpVectors(f,g.set(100,0,110),p*2):n.current.position.lerpVectors(v.set(100,0,110),x,(p-.5)*2)),a.current&&n.current&&a.current.position.lerpVectors(u,g.set(x.x+8,0,x.z-8),p),l.current&&l.current.position.lerpVectors(m,g.set(x.x-8,0,x.z+8),p),c.current)if(j<1.5)c.current.position.copy(h).add(g.set(4.5,12,2));else{const w=(j-1.5)/2.5,d=Math.sin(w*Math.PI)*45;c.current.position.lerpVectors(h,x,w),c.current.position.y+=d+18}}else if(j<5)n.current&&n.current.position.lerpVectors(x,g.set(20,0,240),j-4),c.current&&n.current&&c.current.position.copy(n.current.position).add(g.set(0,12,3)),a.current&&(a.current.position.y=0),l.current&&(l.current.position.y=0);else if(j<5.5)s.current&&s.current.rotation.set(Math.PI,0,0),c.current&&n.current&&c.current.position.copy(n.current.position).add(g.set(4.5,20,0));else if(s.current&&s.current.rotation.set(-Math.PI/4,0,0),c.current&&n.current){const p=Math.abs(Math.cos((j-5.5)*8))*10;c.current.position.copy(n.current.position).add(g.set(4.5,p,4))}}),e.jsxs("group",{position:o,rotation:t,children:[e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[e.jsx("planeGeometry",{args:[400,400]}),e.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),e.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[e.jsx("planeGeometry",{args:[400,40]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),e.jsx(we,{color:"#0088ff",number:"QB",groupRef:r}),e.jsx(we,{color:"#00ffff",number:"80",groupRef:n,armRef:s}),e.jsx(we,{color:"#ff0044",number:"CB",groupRef:a}),e.jsx(we,{color:"#ff0044",number:"S",groupRef:l}),e.jsxs("mesh",{ref:c,children:[e.jsx("sphereGeometry",{args:[2,16,16]}),e.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},Or=({position:o,rotation:t,visible:r})=>e.jsxs("group",{visible:r,position:o,rotation:t,children:[e.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),e.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),e.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]}),e.jsx(Hr,{}),e.jsx(Dr,{position:[0,-100,0],rotation:[0,-Math.PI/2,0]})]}),Nr=({position:o})=>{const r=i.useRef(),n=i.useMemo(()=>{const a=[];for(let l=0;l<4e3;l++){const c=Math.random()*Math.PI*2,f=(Math.random()-.5)*150,u=400,m=(u+f*Math.cos(c/2))*Math.cos(c),h=f*Math.sin(c/2),x=(u+f*Math.cos(c/2))*Math.sin(c);a.push({pos:new b(m,h,x),u:c,v:f,speed:Math.random()*.5+.2,color:new S(Math.random()>.5?"#00f3ff":"#0077ff")})}return a},[]),s=i.useMemo(()=>new Z,[]);return M(a=>{if(!r.current)return;const l=a.clock.elapsedTime;n.forEach((c,f)=>{const u=(c.u+l*c.speed)%(Math.PI*2),m=400,h=(m+c.v*Math.cos(u/2))*Math.cos(u),x=c.v*Math.sin(u/2),g=(m+c.v*Math.cos(u/2))*Math.sin(u);s.position.set(h,x,g);const v=1.5+Math.sin(l*c.speed*5+f)*.8;s.scale.set(v,v,v),s.updateMatrix(),r.current.setMatrixAt(f,s.matrix),r.current.setColorAt(f,c.color)}),r.current.instanceMatrix.needsUpdate=!0,r.current.instanceColor&&(r.current.instanceColor.needsUpdate=!0)}),e.jsx("group",{position:o,children:e.jsx("instancedMesh",{ref:r,args:[new no(2,2),null,4e3],children:e.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:T,depthWrite:!1,side:B})})})},Vr=()=>{const o=i.useMemo(()=>Array.from({length:30}).map(()=>{const r=[],n=(Math.random()-.5)*800,s=600+Math.random()*400,a=Math.random()*Math.PI*2;for(let l=0;l<=50;l++){const c=a+l/50*Math.PI*1.5;r.push(new b(Math.cos(c)*s,n+Math.sin(c*8)*50,Math.sin(c)*s))}return{points:r,color:Math.random()>.5?"#00f3ff":"#ffffff"}}),[]),t=i.useRef();return M(r=>{t.current&&(t.current.rotation.y=r.clock.elapsedTime*.15)}),e.jsx("group",{ref:t,children:o.map((r,n)=>e.jsx(Bo,{points:r.points,color:r.color,lineWidth:2,transparent:!0,opacity:.4},n))})},qr=({position:o,rotation:t,visible:r})=>{const n=E(),[s,a]=i.useState(!1),l=i.useRef({triggered:!1,timer:0});return M((c,f)=>{if(!r)return;const u=n.offset;!l.current.triggered&&u>=.92&&(l.current.triggered=!0,a(!0),window.contangoLocked=!0,n.el&&(n.el.style.overflow="hidden",n.el.scrollTop=.93*(n.el.scrollHeight-n.el.clientHeight))),window.contangoLocked&&(n.el&&(n.el.scrollTop=.93*(n.el.scrollHeight-n.el.clientHeight)),l.current.timer+=f,l.current.timer>1.5&&(window.contangoLocked=!1,a(!1),n.el&&(n.el.style.overflow="auto")))}),e.jsxs("group",{visible:r,position:o,rotation:t,children:[e.jsx("ambientLight",{intensity:.4}),e.jsx("directionalLight",{position:[0,500,500],intensity:1.5,color:"#ffffff"}),e.jsx("spotLight",{position:[-500,500,500],intensity:2,color:"#00f3ff",penumbra:1}),e.jsx("spotLight",{position:[500,-500,500],intensity:2,color:"#0077ff",penumbra:1}),e.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[e.jsx("sphereGeometry",{args:[3e3,64,64]}),e.jsx("meshBasicMaterial",{color:"#010204",side:L})]}),e.jsx(Vr,{}),e.jsx(Zo,{radius:1500,depth:50,count:5e3,factor:4,saturation:0,fade:!0,speed:1}),e.jsxs(ee,{speed:2,rotationIntensity:.2,floatIntensity:1,floatingRange:[-10,10],children:[e.jsx(be.Suspense,{fallback:null}),e.jsx(k,{position:[0,250,-800],fontSize:100,anchorX:"center",anchorY:"middle",color:"#ffffff",children:"CONTANGO QUANT"}),e.jsx(k,{position:[0,120,-800],fontSize:35,color:"#00f3ff",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",children:"The physics of finance"})]}),e.jsx(Nr,{position:[0,-100,-800]}),e.jsx(K,{count:4e3,scale:3e3,size:25,speed:.6,opacity:.5,color:"#00f3ff",position:[0,0,-500]})]})},Yr=({position:o,rotation:t,visible:r})=>{const n=i.useRef(),s=i.useRef(),a=ne(W,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return M(l=>{n.current&&(n.current.position.y=Math.sin(l.clock.elapsedTime*1.5)*5),s.current&&(s.current.rotation.y+=.005,s.current.rotation.z+=.002)}),e.jsxs("group",{visible:r,position:o,rotation:t,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1500,32,32]}),e.jsx("meshBasicMaterial",{color:"#020510",side:L})]}),e.jsxs("group",{children:[e.jsx(ee,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:e.jsxs("mesh",{ref:n,position:[0,0,-500],children:[e.jsx("planeGeometry",{args:[400,100]})," ",e.jsx("meshBasicMaterial",{map:a,transparent:!0,opacity:1,side:B,depthWrite:!1})]})}),e.jsx(K,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),e.jsx(K,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),e.jsx("ambientLight",{intensity:.5,color:"#002244"}),e.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},Xr=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Zr=`
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
`,Qr=({startZ:o=10,endZ:t=-500,visible:r=!0})=>{const n=i.useRef(),s=i.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);M(l=>{n.current&&r&&(n.current.uniforms.uTime.value=l.clock.elapsedTime,n.current.uniforms.uOpacity.value=F.lerp(n.current.uniforms.uOpacity.value,r?1:0,.05))});const a=i.useMemo(()=>{const l=[],f=o-t;for(let u=0;u<=100;u++){const m=o-u/100*f;l.push(new b(Math.sin(u*.1)*2,Math.cos(u*.05)*2,m))}return new Tt(l)},[o,t]);return e.jsxs("mesh",{visible:r,children:[e.jsx("tubeGeometry",{args:[a,200,15,32,!1]}),e.jsx("shaderMaterial",{ref:n,vertexShader:Xr,fragmentShader:Zr,uniforms:s,side:L,transparent:!0,blending:T})]})},$r=`
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
`,Kr=`
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
`,Jr=({position:o,rotation:t=[0,0,0],length:r=4e3,visible:n=!0})=>{const s=i.useRef(),a=i.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:r}}),[r]);return M(l=>{s.current&&(s.current.uniforms.uTime.value=l.clock.elapsedTime,s.current.uniforms.uOpacity.value=n?1:0)}),e.jsx("group",{position:o,rotation:t,visible:n,children:e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[60,400,r+200,32,64,!0]}),e.jsx("shaderMaterial",{ref:s,vertexShader:$r,fragmentShader:Kr,uniforms:a,transparent:!0,side:L,wireframe:!1})]})})},me=({position:o,rotation:t,length:r=4e3,radius:n=200,color:s="#ffffff",speed:a=20,visible:l=!0})=>{const c=i.useRef(),f=i.useMemo(()=>({uTime:{value:0},uColor:{value:new S(s)}}),[s]);return M(u=>{c.current&&(c.current.uniforms.uTime.value=u.clock.elapsedTime)}),e.jsxs("mesh",{visible:l,position:o,rotation:t,children:[e.jsx("cylinderGeometry",{args:[n,n,r,32,1,!0]}),e.jsx("shaderMaterial",{ref:c,transparent:!0,side:L,blending:T,depthWrite:!1,uniforms:f,vertexShader:`
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
        `})]})},en=()=>{const o=[],t=(r,n,s)=>{o.push({x:r,y:n,z:0,rot:[Math.PI/2,0,0],color:s,bodyHeight:40+Math.random()*40})};for(let r=Math.PI*.25;r<Math.PI*1.75;r+=.2)t(-100+Math.cos(r)*80,Math.sin(r)*80,"#00ff00");for(let r=0;r<Math.PI*2;r+=.2)t(100+Math.cos(r)*80,Math.sin(r)*80,"#ff0044");return t(140,-40,"#ff0044"),t(160,-60,"#ff0044"),t(180,-80,"#ff0044"),o},tn=({position:o,rotation:t=[0,0,0],length:r=6e3,radius:n=250,visible:s})=>{const a=i.useRef(),l=i.useRef(),c=i.useRef(),f=ne(W,"/assets/images/contango_logo.png"),u=i.useMemo(()=>{const h=[],x=Math.floor(r/5);for(let v=0;v<x;v++){const y=-(v/x)*r,j=v*.1,p=Math.cos(j)*n,w=Math.sin(j)*n,d=Math.cos(j+Math.PI)*n,z=Math.sin(j+Math.PI)*n,C=Math.random()>.5?"#00ff00":"#ff0044",q=20+Math.random()*60,H=[0,0,j+Math.PI/2],P=[0,0,j+Math.PI+Math.PI/2];h.push({x:p,y:w,z:y,rot:H,color:C,bodyHeight:q}),h.push({x:d,y:z,z:y,rot:P,color:C,bodyHeight:q})}return en().forEach(v=>{h.push({x:v.x,y:v.y,z:-r-500,rot:v.rot,color:v.color,bodyHeight:v.bodyHeight})}),h},[r,n]),m=u.length;return i.useEffect(()=>{if(!l.current||!c.current)return;const h=new Z,x=new S;for(let g=0;g<m;g++){const v=u[g];h.position.set(v.x,v.y,v.z),h.rotation.set(v.rot[0],v.rot[1],v.rot[2]),h.scale.set(1,v.bodyHeight+40,1),h.updateMatrix(),l.current.setMatrixAt(g,h.matrix),x.set(v.color),l.current.setColorAt(g,x),h.scale.set(1,v.bodyHeight,1),h.updateMatrix(),c.current.setMatrixAt(g,h.matrix),c.current.setColorAt(g,x)}l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0)},[u,m]),M(h=>{a.current&&s&&(a.current.rotation.z=h.clock.elapsedTime*.5)}),e.jsxs("group",{position:o,rotation:t,visible:s,children:[e.jsxs("group",{ref:a,children:[e.jsxs("instancedMesh",{ref:l,args:[null,null,m],children:[e.jsx("cylinderGeometry",{args:[2,2,1,8]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),e.jsxs("instancedMesh",{ref:c,args:[null,null,m],children:[e.jsx("boxGeometry",{args:[10,1,10]}),e.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),e.jsxs("mesh",{position:[0,0,-r-500],children:[e.jsx("planeGeometry",{args:[200,200]}),e.jsx("meshBasicMaterial",{map:f,transparent:!0})]}),e.jsxs("mesh",{position:[0,0,-r/2],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[n*.8,n*.8,r,32,1,!0]}),e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:L})]})]})},on=({position:o,rotation:t,length:r=8e3,visible:n=!0})=>{const s=i.useRef(),a=i.useRef();M(c=>{if(!n||!s.current)return;const f=c.clock.getElapsedTime();s.current.map.offset.y=-f*3,a.current&&(a.current.rotation.y=f*2)});const l=be.useMemo(()=>{const c=document.createElement("canvas");c.width=512,c.height=512;const f=c.getContext("2d"),u=f.createLinearGradient(0,0,0,512);u.addColorStop(0,"#001a33"),u.addColorStop(.5,"#00ccff"),u.addColorStop(1,"#001a33"),f.fillStyle=u,f.fillRect(0,0,512,512),f.fillStyle="#ffffff";for(let h=0;h<200;h++)f.globalAlpha=Math.random()*.5,f.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const m=new Rt(c);return m.wrapS=Me,m.wrapT=Me,m.repeat.set(4,20),m},[]);return e.jsxs("group",{position:o,rotation:t,visible:n,children:[e.jsxs("mesh",{children:[e.jsx("cylinderGeometry",{args:[150,150,r,32,1,!0]}),e.jsx("meshStandardMaterial",{ref:s,map:l,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:L,transparent:!0,opacity:.9})]}),e.jsxs("mesh",{ref:a,children:[e.jsx("cylinderGeometry",{args:[140,140,r,16,40,!0]}),e.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:L})]})]})},N=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.56,x:0,y:-4e3,z:-11550,rx:0,ry:0},{p:.58,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.6,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.61,x:0,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.63,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.65,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.655,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.67,x:7e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.68,x:7e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.685,x:7e3,y:-4e3,z:-13550,rx:0,ry:Math.atan2(-7e3,-2600)},{p:.705,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],rn=o=>{if(o<=N[0].p)return N[0];if(o>=N[N.length-1].p)return N[N.length-1];for(let t=0;t<N.length-1;t++){const r=N[t],n=N[t+1];if(o>=r.p&&o<=n.p){const s=(o-r.p)/(n.p-r.p);return{x:F.lerp(r.x,n.x,s),y:F.lerp(r.y,n.y,s),z:F.lerp(r.z,n.z,s),rx:F.lerp(r.rx,n.rx,s),ry:F.lerp(r.ry,n.ry,s)}}}return N[0]},nn=()=>{const o=E(),t=i.useRef();return i.useEffect(()=>{const r=n=>{const s=n.detail.offset;if(o&&o.el){const a=o.el.scrollHeight-o.el.clientHeight;o.el.scrollTo({top:s*a,behavior:"smooth"})}};return window.addEventListener("ai-navigate",r),()=>window.removeEventListener("ai-navigate",r)},[o]),M(r=>{let n=o.offset;window.icebreakerCaveLocked?n=.22:window.icebreakerThawLocked?n=.27:window.icebreakerTextLocked?n=.29:window.mindwaveLocked?n=.08:window.interstellarLocked?n=.42:window.orbitalLocked?n=.6:window.swarmLocked?n=.65:window.autopilotLocked?n=.68:window.contangoLocked&&(n=.93);const s=rn(n);r.camera.position.x=F.lerp(r.camera.position.x,s.x,.2),r.camera.position.y=F.lerp(r.camera.position.y,s.y,.2),r.camera.position.z=F.lerp(r.camera.position.z,s.z,.2);const a=new Q().setFromEuler(new _e(s.rx,s.ry,0));r.camera.quaternion.slerp(a,.15);const l=o.delta*10;r.camera.rotateZ(F.lerp(0,l*2,.2)),t.current&&t.current.position.copy(r.camera.position)}),e.jsxs("group",{children:[e.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),e.jsx("pointLight",{ref:t,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),e.jsx("ambientLight",{intensity:.2})]})},sn=()=>{const o=E(),[t,r]=i.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),n=i.useRef(t);return M(()=>{const s=o.offset,a={intro:s<.08,mindwave:s>.04&&s<.18,wormhole_ice:s>.1&&s<.25,icebreaker:s>.18&&s<.35,wormhole_sound:s>.28&&s<.42,interstellar:s>.28&&s<.48,w_legal:s>.43&&s<.54,legal:s>.42&&s<.58,w_orbital:s>.53&&s<.65,orbital:s>.56&&s<.63,w_swarm:s>.59&&s<.67,swarm:s>.61&&s<.67,w_autopilot:s>.64&&s<.7,autopilot:s>.65&&s<.71,w_clove:s>.67&&s<.72,clove:s>.69&&s<.76,w_fantasy:s>.71&&s<.83,fantasy:s>.73&&s<.88,w_contango:s>.84&&s<.91,contango:s>.89&&s<.96,sentaient:s>.94};let l=!1;for(const c in a)n.current[c]!==a[c]&&(l=!0);l&&(n.current=a,r(a))}),e.jsxs("group",{children:[e.jsx(Qr,{startZ:10,endZ:-250,visible:t.intro}),e.jsx(xr,{position:[0,0,-1350],visible:t.mindwave}),e.jsx(Jr,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:t.wormhole_ice}),e.jsx(ur,{position:[0,-4e3,-2550],visible:t.icebreaker}),e.jsx(zr,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:t.interstellar}),e.jsx(me,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:t.w_legal}),e.jsx(wr,{position:[0,-4e3,-10250],rotation:[0,0,0],visible:t.legal}),e.jsx(me,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffcc",visible:t.w_orbital}),e.jsx(Rr,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:t.orbital}),e.jsx(me,{position:[2e3,-4e3,-13550],rotation:[Math.PI/2,-Math.PI/2,0],length:2e3,color:"#00ffff",speed:40,visible:t.w_swarm}),e.jsx(_r,{position:[5e3,-4e3,-13550],rotation:[0,0,0],visible:t.swarm}),e.jsx(me,{position:[5500,-4e3,-13550],rotation:[Math.PI/2,-Math.PI/2,0],length:1500,color:"#ff00ff",speed:40,visible:t.w_autopilot}),e.jsx(Fr,{position:[7500,-4e3,-13550],rotation:[0,-Math.PI/2,0],visible:t.autopilot}),e.jsx(me,{position:[3500,-4e3,-14850],rotation:[Math.PI/2,Math.atan2(7e3,-2600),0],length:3800,color:"#ff00ff",speed:40,visible:t.w_clove}),e.jsx(Wr,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:t.clove}),e.jsx(on,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:t.w_fantasy}),e.jsx(Or,{position:[0,-11700,-17500],rotation:[0,0,0],visible:t.fantasy}),e.jsx(tn,{position:[0,-11750,-20550],length:4e3,visible:t.w_contango}),e.jsx(qr,{position:[0,-11750,-24800],rotation:[0,0,0],visible:t.contango}),e.jsx(Yr,{position:[0,-11750,-29350],rotation:[0,0,0],visible:t.sentaient})]})},an=()=>{const o=E(),t=i.useRef(),r=i.useRef();return i.useRef(),i.useRef(),i.useRef(),M(()=>{const n=o.offset;if(t.current){const s=n<.03?1:0;t.current.style.opacity=s}if(r.current){const s=n>.2&&n<.28?1:0;r.current.style.opacity=s}}),e.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[e.jsxs("div",{ref:t,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[e.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),e.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),e.jsxs("div",{ref:r,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[e.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[e.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:e.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),e.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),e.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),e.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},ln=()=>e.jsxs(Ut,{gl:{antialias:!1,alpha:!0},children:[e.jsxs(Eo,{pages:10,damping:.2,distance:1.2,children:[e.jsxs(be.Suspense,{fallback:null,children:[e.jsx(nn,{}),e.jsx(sn,{})]}),e.jsx(K,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),e.jsx(Uo,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:e.jsx(an,{})})]}),e.jsxs(Wt,{disableNormalPass:!0,children:[e.jsx(Ht,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),e.jsx(Dt,{opacity:.05}),e.jsx(Ot,{eskil:!1,offset:.1,darkness:1.1})]})]}),gn=()=>e.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[e.jsxs(Gt,{children:[e.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),e.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),e.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),e.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:e.jsx(Ft,{})}),e.jsx("div",{className:"absolute inset-0 z-0",children:e.jsx(ln,{})})]});export{gn as default};
