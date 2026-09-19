import{r as i,_ as Y,g as It,j as t,R as zt,H as Lt}from"./vendor-B9TfjWxd.js";import{H as At}from"./Header-Dp51Gi-X.js";import{b as Te,u as j,c as ke,e as Pt,a as de,C as Et}from"./react-three-fiber.esm-CaZyu6OY.js";import{s as Ft,v as Gt,S as ge,E as Ut,B as Bt,N as Wt,V as Ht}from"./Vignette-khFB6EcD.js";import{al as Se,am as b,$ as X,y as $,ac as Dt,an as we,k as S,E as Re,Z as Ot,B as U,o as Ie,G as Vt,z as Nt,M as qt,w as L,af as D,a5 as V,a as E,n as H,a4 as Le,T as te,l as Zt,ab as Yt,a9 as Xt,q as Qt,h as $t,i as Ct}from"./three-B3g8W0Gj.js";import{T as A}from"./Text-BKomnNVS.js";import"./main-nrUJbARy.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";function ue(o,e,r){return e in o?Object.defineProperty(o,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):o[e]=r,o}function ze(o,e){(e==null||e>o.length)&&(e=o.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=o[r];return n}function Kt(o,e){if(o){if(typeof o=="string")return ze(o,e);var r=Object.prototype.toString.call(o).slice(8,-1);if(r==="Object"&&o.constructor&&(r=o.constructor.name),r==="Map"||r==="Set")return Array.from(o);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return ze(o,e)}}function Jt(o){if(Array.isArray(o))return ze(o)}function eo(o){if(typeof Symbol<"u"&&o[Symbol.iterator]!=null||o["@@iterator"]!=null)return Array.from(o)}function to(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oo(o){return Jt(o)||eo(o)||Kt(o)||to()}new Se;new Se;function ro(o,e,r){return Math.max(e,Math.min(r,o))}function no(o,e){return ro(o-Math.floor(o/e)*e,0,e)}function so(o,e){var r=no(e-o,Math.PI*2);return r>Math.PI&&(r-=Math.PI*2),r}function Tt(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}var G=function o(e,r,n){var s=this;Tt(this,o),ue(this,"dot2",function(a,l){return s.x*a+s.y*l}),ue(this,"dot3",function(a,l,c){return s.x*a+s.y*l+s.z*c}),this.x=e,this.y=r,this.z=n},ao=[new G(1,1,0),new G(-1,1,0),new G(1,-1,0),new G(-1,-1,0),new G(1,0,1),new G(-1,0,1),new G(1,0,-1),new G(-1,0,-1),new G(0,1,1),new G(0,-1,1),new G(0,1,-1),new G(0,-1,-1)],Ae=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],Ee=new Array(512),Fe=new Array(512),io=function(e){e>0&&e<1&&(e*=65536),e=Math.floor(e),e<256&&(e|=e<<8);for(var r=0;r<256;r++){var n;r&1?n=Ae[r]^e&255:n=Ae[r]^e>>8&255,Ee[r]=Ee[r+256]=n,Fe[r]=Fe[r+256]=ao[n%12]}};io(0);function lo(o){if(typeof o=="number")o=Math.abs(o);else if(typeof o=="string"){var e=o;o=0;for(var r=0;r<e.length;r++)o=(o+(r+1)*(e.charCodeAt(r)%96))%2147483647}return o===0&&(o=311),o}function Ge(o){var e=lo(o);return function(){var r=e*48271%2147483647;return e=r,r/2147483647}}var co=function o(e){var r=this;Tt(this,o),ue(this,"seed",0),ue(this,"init",function(n){r.seed=n,r.value=Ge(n)}),ue(this,"value",Ge(this.seed)),this.init(e)};new co(Math.random());var fo=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return n/Math.atan(1/r)*Math.atan(Math.sin(2*Math.PI*e*s)/r)},St=function(e){return 1/(1+e+.48*e*e+.235*e*e*e)},uo=function(e){return e},mo={in:function(e){return 1-Math.cos(e*Math.PI/2)},out:function(e){return Math.sin(e*Math.PI/2)},inOut:function(e){return-(Math.cos(Math.PI*e)-1)/2}},po={in:function(e){return e*e*e},out:function(e){return 1-Math.pow(1-e,3)},inOut:function(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}},ho={in:function(e){return e*e*e*e*e},out:function(e){return 1-Math.pow(1-e,5)},inOut:function(e){return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2}},vo={in:function(e){return 1-Math.sqrt(1-Math.pow(e,2))},out:function(e){return Math.sqrt(1-Math.pow(e-1,2))},inOut:function(e){return e<.5?(1-Math.sqrt(1-Math.pow(2*e,2)))/2:(Math.sqrt(1-Math.pow(-2*e+2,2))+1)/2}},xo={in:function(e){return e*e*e*e},out:function(e){return 1- --e*e*e*e},inOut:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e}},go={in:function(e){return e===0?0:Math.pow(2,10*e-10)},out:function(e){return e===1?1:1-Math.pow(2,-10*e)},inOut:function(e){return e===0?0:e===1?1:e<.5?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2}};function _(o,e,r){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,a=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,l=arguments.length>6&&arguments[6]!==void 0?arguments[6]:St,c=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,f="velocity_"+e;if(o.__damp===void 0&&(o.__damp={}),o.__damp[f]===void 0&&(o.__damp[f]=0),Math.abs(o[e]-r)<=c)return o[e]=r,!1;n=Math.max(1e-4,n);var u=2/n,m=l(u*s),p=o[e]-r,v=r,y=a*n;p=Math.min(Math.max(p,-y),y),r=o[e]-p;var x=(o.__damp[f]+u*p)*s;o.__damp[f]=(o.__damp[f]-u*x)*m;var w=r+(p+x)*m;return v-o[e]>0==w>v&&(w=v,o.__damp[f]=(w-v)/s),o[e]=w,!0}var yo=function(e){return e&&e.isCamera},wo=function(e){return e&&e.isLight},re=new b,Ue=new X,Be=new X,ne=new $,be=new b;function Mo(o,e,r,n,s,a,l){typeof e=="number"?re.setScalar(e):Array.isArray(e)?re.set(e[0],e[1],e[2]):re.copy(e);var c=o.parent;o.updateWorldMatrix(!0,!1),be.setFromMatrixPosition(o.matrixWorld),yo(o)||wo(o)?ne.lookAt(be,re,o.up):ne.lookAt(re,be,o.up),ye(o.quaternion,Be.setFromRotationMatrix(ne),r,n,s,a,l),c&&(ne.extractRotation(c.matrixWorld),Ue.setFromRotationMatrix(ne),ye(o.quaternion,Be.copy(o.quaternion).premultiply(Ue.invert()),r,n,s,a,l))}function ee(o,e,r,n,s,a,l,c){return _(o,e,o[e]+so(o[e],r),n,s,a,l,c)}var se=new Se,We,He;function jo(o,e,r,n,s,a,l){return typeof e=="number"?se.setScalar(e):Array.isArray(e)?se.set(e[0],e[1]):se.copy(e),We=_(o,"x",se.x,r,n,s,a,l),He=_(o,"y",se.y,r,n,s,a,l),We||He}var K=new b,De,Oe,Ve;function Pe(o,e,r,n,s,a,l){return typeof e=="number"?K.setScalar(e):Array.isArray(e)?K.set(e[0],e[1],e[2]):K.copy(e),De=_(o,"x",K.x,r,n,s,a,l),Oe=_(o,"y",K.y,r,n,s,a,l),Ve=_(o,"z",K.z,r,n,s,a,l),De||Oe||Ve}var Q=new we,Ne,qe,Ze,Ye;function bo(o,e,r,n,s,a,l){return typeof e=="number"?Q.setScalar(e):Array.isArray(e)?Q.set(e[0],e[1],e[2],e[3]):Q.copy(e),Ne=_(o,"x",Q.x,r,n,s,a,l),qe=_(o,"y",Q.y,r,n,s,a,l),Ze=_(o,"z",Q.z,r,n,s,a,l),Ye=_(o,"w",Q.w,r,n,s,a,l),Ne||qe||Ze||Ye}var ae=new Re,Xe,Qe,$e;function zo(o,e,r,n,s,a,l){return Array.isArray(e)?ae.set(e[0],e[1],e[2],e[3]):ae.copy(e),Xe=ee(o,"x",ae.x,r,n,s,a,l),Qe=ee(o,"y",ae.y,r,n,s,a,l),$e=ee(o,"z",ae.z,r,n,s,a,l),Xe||Qe||$e}var J=new S,Ke,Je,et;function Po(o,e,r,n,s,a,l){return e instanceof S?J.copy(e):Array.isArray(e)?J.setRGB(e[0],e[1],e[2]):J.set(e),Ke=_(o,"r",J.r,r,n,s,a,l),Je=_(o,"g",J.g,r,n,s,a,l),et=_(o,"b",J.b,r,n,s,a,l),Ke||Je||et}var W=new X,Z=new we,tt=new we,ie=new we,ot,rt,nt,st;function ye(o,e,r,n,s,a,l){var c=o;Array.isArray(e)?W.set(e[0],e[1],e[2],e[3]):W.copy(e);var f=o.dot(W)>0?1:-1;return W.x*=f,W.y*=f,W.z*=f,W.w*=f,ot=_(o,"x",W.x,r,n,s,a,l),rt=_(o,"y",W.y,r,n,s,a,l),nt=_(o,"z",W.z,r,n,s,a,l),st=_(o,"w",W.w,r,n,s,a,l),Z.set(o.x,o.y,o.z,o.w).normalize(),tt.set(c.__damp.velocity_x,c.__damp.velocity_y,c.__damp.velocity_z,c.__damp.velocity_w),ie.copy(Z).multiplyScalar(tt.dot(Z)/Z.dot(Z)),c.__damp.velocity_x-=ie.x,c.__damp.velocity_y-=ie.y,c.__damp.velocity_z-=ie.z,c.__damp.velocity_w-=ie.w,o.set(Z.x,Z.y,Z.z,Z.w),ot||rt||nt||st}var le=new Dt,at,it,lt;function Co(o,e,r,n,s,a,l){return Array.isArray(e)?le.set(e[0],e[1],e[2]):le.copy(e),at=_(o,"radius",le.radius,r,n,s,a,l),it=ee(o,"phi",le.phi,r,n,s,a,l),lt=ee(o,"theta",le.theta,r,n,s,a,l),at||it||lt}var he=new $,ct=new b,ft=new X,ut=new b,dt,mt,pt;function To(o,e,r,n,s,a,l){var c=o;return c.__damp===void 0&&(c.__damp={position:new b,rotation:new X,scale:new b},o.decompose(c.__damp.position,c.__damp.rotation,c.__damp.scale)),Array.isArray(e)?he.set.apply(he,oo(e)):he.copy(e),he.decompose(ct,ft,ut),dt=Pe(c.__damp.position,ct,r,n,s,a,l),mt=ye(c.__damp.rotation,ft,r,n,s,a,l),pt=Pe(c.__damp.scale,ut,r,n,s,a,l),o.compose(c.__damp.position,c.__damp.rotation,c.__damp.scale),dt||mt||pt}var ht=Object.freeze({__proto__:null,rsqw:fo,exp:St,linear:uo,sine:mo,cubic:po,quint:ho,circ:vo,quart:xo,expo:go,damp:_,dampLookAt:Mo,dampAngle:ee,damp2:jo,damp3:Pe,damp4:bo,dampE:zo,dampC:Po,dampQ:ye,dampS:Co,dampM:To});const _e=i.createContext(null);function F(){return i.useContext(_e)}function So({eps:o=1e-5,enabled:e=!0,infinite:r,horizontal:n,pages:s=1,distance:a=1,damping:l=.25,maxSpeed:c=1/0,prepend:f=!1,style:u={},children:m}){const{get:p,setEvents:v,gl:y,size:x,invalidate:w,events:M}=Te(),[h]=i.useState(()=>document.createElement("div")),[g]=i.useState(()=>document.createElement("div")),[d]=i.useState(()=>document.createElement("div")),z=y.domElement.parentNode,T=i.useRef(0),C=i.useMemo(()=>({el:h,eps:o,fill:g,fixed:d,horizontal:n,damping:l,offset:0,delta:0,scroll:T,pages:s,range(P,k,R=0){const I=P-R,q=I+k+R*2;return this.offset<I?0:this.offset>q?1:(this.offset-I)/(q-I)},curve(P,k,R=0){return Math.sin(this.range(P,k,R)*Math.PI)},visible(P,k,R=0){const I=P-R,q=I+k+R*2;return this.offset>=I&&this.offset<=q}}),[o,l,n,s]);i.useEffect(()=>{h.style.position="absolute",h.style.width="100%",h.style.height="100%",h.style[n?"overflowX":"overflowY"]="auto",h.style[n?"overflowY":"overflowX"]="hidden",h.style.top="0px",h.style.left="0px";for(const k in u)h.style[k]=u[k];d.style.position="sticky",d.style.top="0px",d.style.left="0px",d.style.width="100%",d.style.height="100%",d.style.overflow="hidden",h.appendChild(d),g.style.height=n?"100%":`${s*a*100}%`,g.style.width=n?`${s*a*100}%`:"100%",g.style.pointerEvents="none",h.appendChild(g),f?z.prepend(h):z.appendChild(h),h[n?"scrollLeft":"scrollTop"]=1;const B=M.connected||y.domElement;requestAnimationFrame(()=>M.connect==null?void 0:M.connect(h));const P=p().events.compute;return v({compute(k,R){const{left:I,top:q}=z.getBoundingClientRect(),me=k.clientX-I,pe=k.clientY-q;R.pointer.set(me/R.size.width*2-1,-(pe/R.size.height)*2+1),R.raycaster.setFromCamera(R.pointer,R.camera)}}),()=>{z.removeChild(h),v({compute:P}),M.connect==null||M.connect(B)}},[s,a,n,h,g,d,z]),i.useEffect(()=>{if(M.connected===h){const B=x[n?"width":"height"],P=h[n?"scrollWidth":"scrollHeight"],k=P-B;let R=0,I=!0,q=!0;const me=()=>{if(!(!e||q)&&(w(),R=h[n?"scrollLeft":"scrollTop"],T.current=R/k,r)){if(!I){if(R>=k){const oe=1-C.offset;h[n?"scrollLeft":"scrollTop"]=1,T.current=C.offset=-oe,I=!0}else if(R<=0){const oe=1+C.offset;h[n?"scrollLeft":"scrollTop"]=P,T.current=C.offset=oe,I=!0}}I&&setTimeout(()=>I=!1,40)}};h.addEventListener("scroll",me,{passive:!0}),requestAnimationFrame(()=>q=!1);const pe=oe=>h.scrollLeft+=oe.deltaY/2;return n&&h.addEventListener("wheel",pe,{passive:!0}),()=>{h.removeEventListener("scroll",me),n&&h.removeEventListener("wheel",pe)}}},[h,M,x,r,C,w,n,e]);let N=0;return j((B,P)=>{N=C.offset,ht.damp(C,"offset",T.current,l,P,c,void 0,o),ht.damp(C,"delta",Math.abs(N-C.offset),l,P,c,void 0,o),C.delta>o&&w()}),i.createElement(_e.Provider,{value:C},m)}const Ro=i.forwardRef(({children:o},e)=>{const r=i.useRef(null);i.useImperativeHandle(e,()=>r.current,[]);const n=F(),{width:s,height:a}=Te(l=>l.viewport);return j(()=>{r.current.position.x=n.horizontal?-s*(n.pages-1)*n.offset:0,r.current.position.y=n.horizontal?0:a*(n.pages-1)*n.offset}),i.createElement("group",{ref:r},o)}),_o=i.forwardRef(({children:o,style:e,...r},n)=>{const s=F(),a=i.useRef(null);i.useImperativeHandle(n,()=>a.current,[]);const{width:l,height:c}=Te(m=>m.size),f=i.useContext(ke),u=i.useMemo(()=>It(s.fixed),[s.fixed]);return j(()=>{s.delta>s.eps&&(a.current.style.transform=`translate3d(${s.horizontal?-l*(s.pages-1)*s.offset:0}px,${s.horizontal?0:c*(s.pages-1)*-s.offset}px,0)`)}),u.render(i.createElement("div",Y({ref:a,style:{...e,position:"absolute",top:0,left:0,willChange:"transform"}},r),i.createElement(_e.Provider,{value:s},i.createElement(ke.Provider,{value:f},o)))),null}),ko=i.forwardRef(({html:o,...e},r)=>{const n=o?_o:Ro;return i.createElement(n,Y({ref:r},e))}),Rt=i.forwardRef(function({children:e,follow:r=!0,lockX:n=!1,lockY:s=!1,lockZ:a=!1,...l},c){const f=i.useRef(null),u=i.useRef(null),m=new X;return j(({camera:p})=>{if(!r||!u.current)return;const v=u.current.rotation.clone();u.current.updateMatrix(),u.current.updateWorldMatrix(!1,!1),u.current.getWorldQuaternion(m),p.getWorldQuaternion(f.current.quaternion).premultiply(m.invert()),n&&(u.current.rotation.x=v.x),s&&(u.current.rotation.y=v.y),a&&(u.current.rotation.z=v.z)}),i.useImperativeHandle(c,()=>u.current,[]),i.createElement("group",Y({ref:u},l),i.createElement("group",{ref:f},e))}),Io=Ft({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new S,sectionColor:new S,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new b,worldPlanePosition:new b},`
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
      #include <${Gt>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),Lo=i.forwardRef(({args:o,cellColor:e="#000000",sectionColor:r="#2080ff",cellSize:n=.5,sectionSize:s=1,followCamera:a=!1,infiniteGrid:l=!1,fadeDistance:c=100,fadeStrength:f=1,fadeFrom:u=1,cellThickness:m=.5,sectionThickness:p=1,side:v=U,...y},x)=>{Pt({GridMaterial:Io});const w=i.useRef(null);i.useImperativeHandle(x,()=>w.current,[]);const M=new Ot,h=new b(0,1,0),g=new b(0,0,0);j(T=>{M.setFromNormalAndCoplanarPoint(h,g).applyMatrix4(w.current.matrixWorld);const C=w.current.material,N=C.uniforms.worldCamProjPosition,B=C.uniforms.worldPlanePosition;M.projectPoint(T.camera.position,N.value),B.value.set(0,0,0).applyMatrix4(w.current.matrixWorld)});const d={cellSize:n,sectionSize:s,cellColor:e,sectionColor:r,cellThickness:m,sectionThickness:p},z={fadeDistance:c,fadeStrength:f,fadeFrom:u,infiniteGrid:l,followCamera:a};return i.createElement("mesh",Y({ref:w,frustumCulled:!1},y),i.createElement("gridMaterial",Y({transparent:!0,"extensions-derivatives":!0,side:v},d,z)),i.createElement("planeGeometry",{args:o}))}),vt=(o,e)=>{"updateRanges"in o?o.updateRanges[0]=e:o.updateRange=e};function Ao(o){return typeof o=="function"}const xt=new $,gt=new $,ve=[],ce=new Nt;class Eo extends Vt{constructor(){super(),this.color=new S("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var e;return(e=this.instance.current)==null?void 0:e.geometry}raycast(e,r){const n=this.instance.current;if(!n||!n.geometry||!n.material)return;ce.geometry=n.geometry;const s=n.matrixWorld,a=n.userData.instances.indexOf(this.instanceKey);if(!(a===-1||a>n.count)){n.getMatrixAt(a,xt),gt.multiplyMatrices(s,xt),ce.matrixWorld=gt,n.material instanceof qt?ce.material.side=n.material.side:ce.material.side=n.material[0].side,ce.raycast(e,ve);for(let l=0,c=ve.length;l<c;l++){const f=ve[l];f.instanceId=a,f.object=this,r.push(f)}ve.length=0}}}const _t=i.createContext(null),yt=new $,wt=new $,Fo=new $,Mt=new b,jt=new X,bt=new b,Go=o=>o.isInstancedBufferAttribute,kt=i.forwardRef(({context:o,children:e,...r},n)=>{i.useMemo(()=>Pt({PositionMesh:Eo}),[]);const s=i.useRef();i.useImperativeHandle(n,()=>s.current,[]);const{subscribe:a,getParent:l}=i.useContext(o||_t);return i.useLayoutEffect(()=>a(s),[]),i.createElement("positionMesh",Y({instance:l(),instanceKey:s,ref:s},r),e)}),Uo=i.forwardRef(({context:o,children:e,range:r,limit:n=1e3,frames:s=1/0,...a},l)=>{const[{localContext:c,instance:f}]=i.useState(()=>{const g=i.createContext(null);return{localContext:g,instance:i.forwardRef((d,z)=>i.createElement(kt,Y({context:g},d,{ref:z})))}}),u=i.useRef(null);i.useImperativeHandle(l,()=>u.current,[]);const[m,p]=i.useState([]),[[v,y]]=i.useState(()=>{const g=new Float32Array(n*16);for(let d=0;d<n;d++)Fo.identity().toArray(g,d*16);return[g,new Float32Array([...new Array(n*3)].map(()=>1))]});i.useEffect(()=>{u.current.instanceMatrix.needsUpdate=!0});let x=0,w=0;const M=i.useRef([]);i.useLayoutEffect(()=>{M.current=Object.entries(u.current.geometry.attributes).filter(([g,d])=>Go(d))}),j(()=>{if(s===1/0||x<s){u.current.updateMatrix(),u.current.updateMatrixWorld(),yt.copy(u.current.matrixWorld).invert(),w=Math.min(n,r!==void 0?r:n,m.length),u.current.count=w,vt(u.current.instanceMatrix,{offset:0,count:w*16}),vt(u.current.instanceColor,{offset:0,count:w*3});for(let g=0;g<m.length;g++){const d=m[g].current;d.matrixWorld.decompose(Mt,jt,bt),wt.compose(Mt,jt,bt).premultiply(yt),wt.toArray(v,g*16),u.current.instanceMatrix.needsUpdate=!0,d.color.toArray(y,g*3),u.current.instanceColor.needsUpdate=!0}x++}});const h=i.useMemo(()=>({getParent:()=>u,subscribe:g=>(p(d=>[...d,g]),()=>p(d=>d.filter(z=>z.current!==g.current)))}),[]);return i.createElement("instancedMesh",Y({userData:{instances:m,limit:n,frames:s},matrixAutoUpdate:!1,ref:u,args:[null,null,0],raycast:()=>null},a),i.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:v.length/16,array:v,itemSize:16,usage:Ie}),i.createElement("instancedBufferAttribute",{attach:"instanceColor",count:y.length/3,array:y,itemSize:3,usage:Ie}),Ao(e)?i.createElement(c.Provider,{value:h},e(f)):o?i.createElement(o.Provider,{value:h},e):i.createElement(_t.Provider,{value:h},e))}),Me=i.forwardRef(({children:o,enabled:e=!0,speed:r=1,rotationIntensity:n=1,floatIntensity:s=1,floatingRange:a=[-.1,.1],autoInvalidate:l=!1,...c},f)=>{const u=i.useRef(null);i.useImperativeHandle(f,()=>u.current,[]);const m=i.useRef(Math.random()*1e4);return j(p=>{var v,y;if(!e||r===0)return;l&&p.invalidate();const x=m.current+p.clock.getElapsedTime();u.current.rotation.x=Math.cos(x/4*r)/8*n,u.current.rotation.y=Math.sin(x/4*r)/8*n,u.current.rotation.z=Math.sin(x/4*r)/20*n;let w=Math.sin(x/4*r)/10;w=L.mapLinear(w,-.1,.1,(v=a?.[0])!==null&&v!==void 0?v:-.1,(y=a?.[1])!==null&&y!==void 0?y:.1),u.current.position.y=w*s,u.current.updateMatrix()}),i.createElement("group",c,i.createElement("group",{ref:u,matrixAutoUpdate:!1},o))}),Bo=({position:o})=>{const e=i.useRef();F();const[r,n]=i.useState(null);return i.useEffect(()=>{new D().load("/assets/images/digital_fire.jpg",s=>{s.colorSpace=V,n(s)})},[]),j(s=>{if(e.current){const a=window.icebreakerThaw||0;e.current.material.opacity=a*.9;const l=1+Math.sin(s.clock.elapsedTime*5)*.1;e.current.scale.setScalar(l)}}),r?t.jsx("group",{position:o,children:t.jsx(Rt,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:t.jsxs("mesh",{ref:e,position:[0,20,0],children:[t.jsx("planeGeometry",{args:[40,40]}),t.jsx("meshBasicMaterial",{map:r,transparent:!0,opacity:0,depthWrite:!1,blending:E})]})})}):null},Wo=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ho=`
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
`,Do=({position:o,angle:e,delay:r,targetCenter:n})=>{const s=i.useRef(),a=i.useRef();F();const l=i.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new S("#44aaff")},uPartyColor:{value:new S("#ff8844")}}),[]);return j(c=>{if(!s.current||!a.current)return;l.uTime.value=c.clock.elapsedTime;const f=window.icebreakerThaw||0,u=L.clamp((f-r)*2,0,1);l.uState.value=u;const m=Math.sin(c.clock.elapsedTime*8+r*10)*u;if(s.current.position.y=o[1]+(m>0?m*2:0)+15,u>0){const p=n[0]-o[0],v=n[2]-o[2],y=Math.sqrt(p*p+v*v)||1;s.current.position.x=o[0]+p/y*(u*20),s.current.position.z=o[2]+v/y*(u*20)}else s.current.position.x=o[0],s.current.position.z=o[2]}),t.jsx("group",{ref:s,position:[o[0],o[1]+15,o[2]],children:t.jsx(Rt,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:t.jsxs("mesh",{children:[t.jsx("planeGeometry",{args:[20,30]}),t.jsx("shaderMaterial",{ref:a,vertexShader:Wo,fragmentShader:Ho,uniforms:l,transparent:!0,side:H,depthWrite:!1})]})})})},Oo=({position:o})=>{const r=i.useMemo(()=>{const n=[];for(let s=0;s<60;s++){const a=Math.random()*Math.PI*2,l=30+Math.random()*80;n.push({position:[o[0]+Math.cos(a)*l,o[1],o[2]+Math.sin(a)*l],angle:a,delay:Math.random()*.5,targetCenter:o})}return n},[60,o]);return t.jsx("group",{children:r.map((n,s)=>t.jsx(Do,{...n},s))})},je=({appId:o,position:e})=>t.jsx("group",{position:e}),Vo=({position:o})=>{const e=i.useRef(),[r,n]=i.useState(null);return F(),i.useEffect(()=>{new D().load("/icebreaker_logo.png",s=>{s.colorSpace=V,n(s)})},[]),j(s=>{if(e.current&&(e.current.rotation.y=s.clock.elapsedTime*.5,e.current.position.y=o[1]+Math.sin(s.clock.elapsedTime*2)*5,e.current.material)){const a=window.icebreakerThaw||0;e.current.material.opacity=a*.9,e.current.scale.setScalar(.01+a)}}),r?t.jsxs("mesh",{ref:e,position:o,children:[t.jsx("planeGeometry",{args:[40,40]}),t.jsx("meshBasicMaterial",{map:r,transparent:!0,opacity:0,depthWrite:!1,blending:E,side:H})]}):null},No=({numTrees:o=30,radius:e=50,centerZ:r=-500})=>{const n=i.useRef(),s=i.useRef();F();const a=i.useMemo(()=>new te,[]),l=i.useMemo(()=>{const c=[];for(let f=0;f<o;f++){const u=f/o*Math.PI*2+Math.random()*.5,m=e+Math.random()*20;c.push({position:new b(Math.cos(u)*m,-18,Math.sin(u)*m+r),rotation:new Re(0,u+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return c},[o,e,r]);return j(()=>{if(!n.current||!s.current)return;const c=window.icebreakerThaw||0;for(let f=0;f<o;f++){const u=l[f],m=Math.max(0,(c-u.delay)*2),p=L.clamp(m,0,1)*u.scale;a.position.copy(u.position),a.rotation.copy(u.rotation),a.scale.setScalar(p),a.updateMatrix(),n.current.setMatrixAt(f,a.matrix),a.position.y+=18*p,a.updateMatrix(),s.current.setMatrixAt(f,a.matrix)}n.current.instanceMatrix.needsUpdate=!0,s.current.instanceMatrix.needsUpdate=!0}),t.jsxs("group",{children:[t.jsxs("instancedMesh",{ref:n,args:[null,null,o],children:[t.jsx("cylinderGeometry",{args:[.5,1,20,8]}),t.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),t.jsxs("instancedMesh",{ref:s,args:[null,null,o],children:[t.jsx("sphereGeometry",{args:[8,4,4]}),t.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},qo=`
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
`,Zo=`
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
`,Yo=({startZ:o,endZ:e})=>{const r=i.useRef(),n=i.useRef(),[s,a]=i.useState(null),l=Math.abs(e-o),c=(o+e)/2,f=i.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return i.useEffect(()=>{new D().load("/assets/images/ice_cavern.jpg",u=>{u.wrapS=Le,u.wrapT=Le,u.repeat.set(4,2),u.colorSpace=V,a(u),f.tMap.value=u})},[f]),j(u=>{if(n.current){const m=window.icebreakerThaw||0;f.uThaw.value=m,f.uTime.value=u.clock.elapsedTime}}),s?t.jsxs("mesh",{ref:r,position:[0,0,c],rotation:[Math.PI/2,0,0],children:[t.jsx("cylinderGeometry",{args:[120,120,l,128,128,!0]}),t.jsx("shaderMaterial",{ref:n,vertexShader:qo,fragmentShader:Zo,uniforms:f,transparent:!0,side:U})]}):null},Xo=({position:o})=>{const e=i.useRef();return j(r=>{if(e.current){const n=window.icebreakerThaw||0,s=L.lerp(.01,50,Math.pow(n,2));e.current.scale.setScalar(s),e.current.visible=n>0}}),t.jsxs("mesh",{ref:e,position:[o[0],o[1]+1,o[2]],rotation:[-Math.PI/2,0,0],children:[t.jsx("circleGeometry",{args:[20,64]}),t.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},Qo=({position:o})=>{const e=i.useRef();return j(r=>{if(e.current){const n=window.icebreakerThaw||0;e.current.scale.setScalar(n>0?1:.001)}}),t.jsxs("mesh",{ref:e,position:[o[0],o[1]+1.5,o[2]],rotation:[-Math.PI/2,0,0],children:[t.jsx("circleGeometry",{args:[96,64]}),t.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},$o=({position:o})=>{const e=i.useRef();return j(()=>{if(e.current){const r=window.icebreakerThaw||0;e.current.opacity=1-Math.pow(r,2),e.current.transparent=!0}}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:o,children:[t.jsx("planeGeometry",{args:[1e3,3e3]}),t.jsx("meshStandardMaterial",{ref:e,color:"#001133",roughness:.1,metalness:.8})]})},Ko=({centerZ:o})=>{const e=i.useRef(),r=i.useRef(),n=i.useMemo(()=>({uColorBottom:{value:new S("#ffaa55")},uColorTop:{value:new S("#00f3ff")},uOpacity:{value:0}}),[]);return j(()=>{const s=window.icebreakerThaw||0;e.current&&(e.current.uniforms.uOpacity.value=s),r.current&&(r.current.intensity=s*.6)}),t.jsxs("group",{children:[t.jsxs("mesh",{scale:2e3,children:[t.jsx("sphereGeometry",{args:[1,32,32]}),t.jsx("shaderMaterial",{ref:e,side:U,transparent:!0,depthWrite:!1,uniforms:n,vertexShader:`
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
          `})]}),t.jsx("directionalLight",{ref:r,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),t.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},Jo=()=>{const o=F(),[e,r]=i.useState(!1),[n,s]=i.useState(!1),[a,l]=i.useState(!1),c=i.useRef({triggered:!1,timer:0}),f=i.useRef({triggered:!1,timer:0});return i.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),j((u,m)=>{const p=o.offset;!f.current.triggered&&p>=.22&&(f.current.triggered=!0,l(!0),window.icebreakerCaveLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerCaveLocked&&(o.el&&(o.el.scrollTop=.22*(o.el.scrollHeight-o.el.clientHeight)),f.current.timer+=m,f.current.timer>1.5&&(window.icebreakerCaveLocked=!1,l(!1),o.el&&(o.el.style.overflow="auto"))),!e&&p>=.265&&window.icebreakerThaw<1&&(r(!0),window.icebreakerThawLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerThawLocked?(o.el&&(o.el.scrollTop=.27*(o.el.scrollHeight-o.el.clientHeight)),window.icebreakerThaw+=m*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,o.el&&!n&&(o.el.style.overflow="auto"),r(!1))):p<.2&&(window.icebreakerThaw=0),!c.current.triggered&&p>=.285&&window.icebreakerThaw>=1&&(c.current.triggered=!0,s(!0),window.icebreakerTextLocked=!0,o.el&&(o.el.style.overflow="hidden",o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight))),window.icebreakerTextLocked&&(o.el&&(o.el.scrollTop=.29*(o.el.scrollHeight-o.el.clientHeight)),c.current.timer+=m,c.current.timer>1.5&&(window.icebreakerTextLocked=!1,s(!1),o.el&&(o.el.style.overflow="auto")))}),null},er=({position:o,rotation:e,visible:r=!0})=>t.jsxs("group",{position:o,rotation:e,visible:r,children:[t.jsx(Jo,{}),t.jsx(Ko,{centerZ:0}),t.jsx(Yo,{startZ:1e3,endZ:-1e3}),t.jsx($o,{position:[0,-20,0]}),t.jsx(Xo,{position:[0,-20,0]}),t.jsx(Qo,{position:[0,-20,0]}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),t.jsx(Bo,{position:[0,-20,0]}),t.jsx(Vo,{position:[0,30,0]}),t.jsx(No,{radius:60,centerZ:0}),t.jsx(Oo,{position:[0,-20,0]}),t.jsx(je,{appId:"icebreaker",position:[-80,20,-200]})]}),tr=`
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
`,or=`
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
`,rr=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,nr=({position:o,visible:e})=>t.jsxs("group",{visible:e,position:o,children:[t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),sr=({position:o,visible:e})=>{const r=F(),n=i.useRef(),s=i.useRef(),a=i.useRef(),[l,c]=i.useState(null),[f,u]=i.useState(null),[m,p]=i.useState(!1),v=i.useRef({triggered:!1,timer:0});i.useEffect(()=>{window.mindwaveLocked=!1,new D().load("/mindwave-logo.png",w=>{w.colorSpace=V,c(w)}),new D().load("/tribal-sun.png",w=>{w.colorSpace=V,u(w)})},[]);const y=o?o[2]:0,x=i.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return j((w,M)=>{if(!e)return;const h=r.offset;!v.current.triggered&&h>=.075&&(v.current.triggered=!0,p(!0),window.mindwaveLocked=!0,r.el&&(r.el.style.overflow="hidden",r.el.scrollTop=.08*(r.el.scrollHeight-r.el.clientHeight))),window.mindwaveLocked&&(r.el&&(r.el.scrollTop=.08*(r.el.scrollHeight-r.el.clientHeight)),v.current.timer+=M,v.current.timer>1.5&&(window.mindwaveLocked=!1,p(!1),r.el&&(r.el.style.overflow="auto")));const g=w.clock.elapsedTime;if(n.current){n.current.uniforms.uTime.value=g;const d=Math.abs(w.camera.position.z-y);let T=1-Math.min(d/1e3,1);T=Math.pow(T,2),n.current.uniforms.uScrollProgress.value=T}if(s.current){s.current.position.y=-7+Math.sin(g*2)*2;const d=1+Math.sin(g*4)*.05;s.current.scale.set(d,d,1),s.current.rotation.y=0}if(a.current){a.current.position.y=125+Math.sin(g*2)*2,a.current.rotation.z=g*.1;const d=1+Math.sin(g*3)*.05;a.current.scale.set(d,d,1)}}),t.jsxs("group",{visible:e,position:o,children:[t.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[t.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),t.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:rr,side:U,depthWrite:!1})]}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[t.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),t.jsx("shaderMaterial",{ref:n,vertexShader:tr,fragmentShader:or,uniforms:x,transparent:!0,side:H,wireframe:!1})]}),f&&t.jsxs("mesh",{ref:a,position:[0,-10,-85],children:[t.jsx("planeGeometry",{args:[140,140]}),t.jsx("meshBasicMaterial",{map:f,transparent:!0,side:H,depthWrite:!1,blending:E,color:"#00ffff",opacity:.6})]}),l&&t.jsxs("mesh",{ref:s,position:[0,-10,-80],children:[t.jsx("planeGeometry",{args:[80,80]}),t.jsx("meshBasicMaterial",{map:l,transparent:!0,side:H,depthWrite:!1,blending:E})]}),t.jsx(nr,{position:[0,-5,-80],visible:!0}),t.jsx(je,{appId:"mindwave",position:[40,0,-40]})]})},Ce=o=>{const r=new Xt;o==="interceptor"?(r.moveTo(1*1.8,0),r.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),r.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),r.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),r.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):o==="viper"?(r.moveTo(1*1.2,1*.3),r.lineTo(1*.4,1*.4),r.lineTo(-1*.8,1*1.2),r.lineTo(-1*1.2,1*.8),r.lineTo(-1*.8,0),r.lineTo(-1*1.2,-1*.8),r.lineTo(-1*.8,-1*1.2),r.lineTo(1*.4,-1*.4),r.lineTo(1*1.2,-1*.3),r.lineTo(1*.6,0)):o==="bulwark"&&(r.moveTo(1*1.5,0),r.lineTo(1*.8,1*1.2),r.lineTo(-1*.5,1*1.5),r.lineTo(-1*1.5,1*.8),r.lineTo(-1*1.5,-1*.8),r.lineTo(-1*.5,-1*1.5),r.lineTo(1*.8,-1*1.2));const n={steps:1,depth:o==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},s=new Qt(r,n);return s.center(),s.rotateY(-Math.PI/2),s.rotateZ(-Math.PI/2),s},ar=({position:o})=>{const e=i.useRef();return j((r,n)=>{e.current&&(e.current.rotation.z-=n*.1,e.current.rotation.x=Math.sin(r.clock.elapsedTime*.1)*.1)}),t.jsxs("group",{position:o,ref:e,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[t.jsxs("mesh",{children:[t.jsx("cylinderGeometry",{args:[150,150,300,32]}),t.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),t.jsxs("mesh",{children:[t.jsx("torusGeometry",{args:[400,40,32,64]}),t.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((r,n)=>t.jsxs("mesh",{position:[Math.cos(r)*200,0,Math.sin(r)*200],rotation:[0,-r,Math.PI/2],children:[t.jsx("cylinderGeometry",{args:[20,20,300,16]}),t.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},n)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((r,n)=>t.jsxs("mesh",{position:[Math.cos(r)*400,0,Math.sin(r)*400],rotation:[Math.PI/2,0,-r],children:[t.jsx("boxGeometry",{args:[60,60,90]}),t.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${n}`))]})},ir=({position:o})=>{const e=i.useRef(),r=i.useMemo(()=>Ce("bulwark"),[]);return j((n,s)=>{e.current&&(e.current.position.y=Math.sin(n.clock.elapsedTime*.2)*40,e.current.rotation.y+=s*.05,e.current.rotation.z=Math.sin(n.clock.elapsedTime*.1)*.1)}),t.jsxs("group",{position:o,ref:e,scale:[120,120,120],children:[t.jsx("mesh",{geometry:r,children:t.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),t.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),t.jsxs("mesh",{position:[0,0,1.5],children:[t.jsx("sphereGeometry",{args:[.2,16,16]}),t.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},lr=({position:o})=>{const a=i.useMemo(()=>new te,[]),l=i.useMemo(()=>new te,[]),c=i.useRef(),f=i.useRef(),u=i.useRef(),m=i.useRef(),p=i.useMemo(()=>Ce("interceptor"),[]),v=i.useMemo(()=>Ce("viper"),[]),y=i.useMemo(()=>{const M=new Zt(.5,.5,20,4);return M.rotateX(Math.PI/2),M},[]),x=i.useMemo(()=>Array.from({length:80},(M,h)=>{const g=h>=40;return{pos:new b((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new b,target:new b,team:g?1:0,meshIndex:g?h-40:h,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),w=i.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new b,vel:new b,color:new S,life:0})),[60]);return j((M,h)=>{if(!c.current||!f.current||!u.current||!m.current)return;let g=0;x.forEach(d=>{if(d.state===0){if(Math.random()<.02||d.target.lengthSq()===0){const P=x[Math.floor(Math.random()*80)];P&&P.team!==d.team&&P.state===0?(d.target.copy(P.pos),d.target.x+=(Math.random()-.5)*200,d.target.y+=(Math.random()-.5)*200,d.target.z+=(Math.random()-.5)*200):d.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const z=new b().subVectors(d.target,d.pos),T=z.length();if(T>150&&T<800&&Math.random()<.03){const P=w.find(k=>!k.active);P&&(P.active=!0,P.pos.copy(d.pos),P.vel.copy(z).normalize().multiplyScalar(2500),P.color.set(d.team===0?"#00ffff":"#ff3300"),P.life=.8)}const C=z.normalize().multiplyScalar(400*h);d.vel.add(C),d.vel.clampLength(0,600),d.pos.addScaledVector(d.vel,h),d.trail.push(d.pos.clone()),d.trail.length>5&&d.trail.shift(),a.position.copy(d.pos);const N=a.position.clone().add(d.vel);a.lookAt(N);const B=C.clone().cross(d.vel).y;a.rotateZ(B*.01),a.scale.set(30,30,30)}else{d.explosionTimer+=h,a.position.copy(d.pos),a.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const z=30*Math.max(.1,1-d.explosionTimer*2);a.scale.set(z,z,z),d.explosionTimer>.5&&(d.state=0,d.health=100,d.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),d.vel.set(0,0,0),d.trail=[])}a.updateMatrix(),d.team===0?(c.current.setMatrixAt(d.meshIndex,a.matrix),c.current.setColorAt(d.meshIndex,d.state===0?new S("#00aaff"):new S("#ffaa00"))):(f.current.setMatrixAt(d.meshIndex,a.matrix),f.current.setColorAt(d.meshIndex,d.state===0?new S("#ff0033"):new S("#ffaa00"))),d.trail.forEach((z,T)=>{if(g<400){a.position.copy(z),a.rotation.set(0,0,0);const C=T/5*10;a.scale.set(C,C,C),a.updateMatrix(),m.current.setMatrixAt(g,a.matrix),m.current.setColorAt(g,d.team===0?new S("#00ffff"):new S("#ff5500")),g++}})});for(let d=g;d<400;d++)a.position.set(0,9999,0),a.scale.set(0,0,0),a.updateMatrix(),m.current.setMatrixAt(d,a.matrix);w.forEach((d,z)=>{d.active?(d.pos.addScaledVector(d.vel,h),d.life-=h,x.forEach(T=>{T.state===0&&d.pos.distanceTo(T.pos)<50&&(T.health-=50,d.active=!1,T.health<=0&&(T.state=1,T.explosionTimer=0))}),d.life<=0&&(d.active=!1),l.position.copy(d.pos),l.lookAt(l.position.clone().add(d.vel)),l.scale.set(1,1,1)):(l.position.set(0,9999,0),l.scale.set(0,0,0)),l.updateMatrix(),u.current.setMatrixAt(z,l.matrix),u.current.setColorAt(z,d.color)}),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),m.current.instanceMatrix.needsUpdate=!0,m.current.instanceColor&&(m.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0)}),t.jsxs("group",{position:o,children:[t.jsx("instancedMesh",{ref:c,args:[p,null,40],children:t.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),t.jsx("instancedMesh",{ref:f,args:[v,null,40],children:t.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),t.jsx("instancedMesh",{ref:u,args:[y,null,60],children:t.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:E})}),t.jsx("instancedMesh",{ref:m,args:[new Yt(1,4,4),null,400],children:t.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:E,depthWrite:!1})})]})},cr=({position:o,rotation:e,visible:r})=>{const n=de(D,"/interstellar_logo_final.png");n.colorSpace=V;const s=F(),a=i.useRef({triggered:!1});return j(()=>{s&&s.offset>=.41&&s.offset<=.43&&!a.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,a.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsx("ambientLight",{intensity:.2}),t.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),t.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),t.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),t.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[t.jsx("sphereGeometry",{args:[4e3,32,32]}),t.jsx("meshBasicMaterial",{color:"#020510",side:U})]}),t.jsx(ar,{position:[0,-200,-800]}),t.jsx(ir,{position:[0,-120,-100]}),t.jsx(lr,{position:[0,-50,0]}),t.jsxs("group",{position:[0,120,200],children:[t.jsxs("mesh",{position:[0,50,0],children:[t.jsx("planeGeometry",{args:[180,180]}),t.jsx("meshBasicMaterial",{map:n,transparent:!0,depthWrite:!1})]}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),t.jsx(je,{appId:"interstellar",position:[-150,100,200]})]})},fr=()=>{const e=i.useRef([]),r=i.useRef(document.createElement("canvas")),n=i.useMemo(()=>{r.current.width=512,r.current.height=1024;const a=r.current.getContext("2d");a.fillStyle="#010a15",a.fillRect(0,0,512,1024),a.strokeStyle="#004488",a.lineWidth=2;for(let c=0;c<1024;c+=32)a.beginPath(),a.moveTo(0,c),a.lineTo(512,c),a.stroke(),c<512&&(a.beginPath(),a.moveTo(c,0),a.lineTo(c,1024),a.stroke());a.fillStyle="#0088ff",a.fillRect(40,40,432,60),a.fillStyle="#00ffff",a.font="24px monospace",a.fillText("CLASSIFIED // AI REVIEW",60,78),a.fillStyle="#003366";for(let c=0;c<30;c++){let f=140+c*28;a.fillRect(40,f,432-Math.random()*200,12)}a.strokeStyle="#ff0033",a.lineWidth=5,a.beginPath(),a.arc(400,850,60,0,Math.PI*2),a.stroke(),a.beginPath(),a.arc(400,850,50,0,Math.PI*2),a.stroke();const l=new $t(r.current);return l.colorSpace=V,l},[]),s=i.useMemo(()=>Array.from({length:50}).map((a,l)=>({delay:l*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-150+Math.random()*100})),[50]);return j((a,l)=>{const c=a.clock.elapsedTime;s.forEach((f,u)=>{const m=e.current[u];m&&(c>f.delay&&(f.state==="waiting"&&(f.state="approaching"),f.state==="approaching"&&(f.x-=8e3*l,f.x<=0&&(f.x=0,f.state="scanning",f.scanTimer=c)),f.state==="scanning"&&c-f.scanTimer>.05&&(f.state="approved"),f.state==="approved"&&(f.x-=8e3*l,f.x<-3e3&&(f.x=3e3+Math.random()*500,f.state="approaching",f.y=(Math.random()-.5)*150-50))),m.position.set(f.x,f.y,f.z),f.state==="scanning"?(m.rotation.set(0,0,0),m.scale.setScalar(1.2)):f.state==="approved"?(m.rotation.set(0,.4,0),m.scale.setScalar(1)):(m.rotation.set(0,-.4,0),m.scale.setScalar(1)),f.state==="scanning"?m.color.set("#ffffff"):f.state==="approved"?m.color.set("#00ff66"):m.color.set("#0088ff"))})}),t.jsxs(Uo,{limit:50,range:50,children:[t.jsx("planeGeometry",{args:[100,200]}),t.jsx("meshBasicMaterial",{map:n,side:H,transparent:!0,opacity:.9,blending:E,depthWrite:!1}),s.map((a,l)=>t.jsx(kt,{ref:c=>e.current[l]=c,position:[a.x,a.y,a.z]},l))]})},ur=()=>{const o=de(D,"/legal_eagle_courtroom_bg.jpg");return o.colorSpace=V,t.jsxs("group",{children:[t.jsxs("mesh",{position:[0,0,-450],children:[t.jsx("planeGeometry",{args:[2e3,1125]}),t.jsx("meshBasicMaterial",{map:o,depthWrite:!1,transparent:!0,opacity:1,fog:!1})]}),[-1,1].map((e,r)=>t.jsxs("mesh",{position:[e*500,0,-400],children:[t.jsx("boxGeometry",{args:[150,2e3,150]}),t.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.2})]},r)),[-1,1].map((e,r)=>t.jsxs("mesh",{position:[e*800,0,-600],children:[t.jsx("boxGeometry",{args:[200,2e3,200]}),t.jsx("meshStandardMaterial",{color:"#030303",metalness:.9,roughness:.3})]},r+2))]})},dr=({logoTex:o})=>{const e=i.useMemo(()=>({uTime:{value:0}}),[]),r=i.useMemo(()=>({uTime:{value:0},uColor:{value:new S("#00ffff")}}),[]);return j(n=>{e.uTime.value=n.clock.elapsedTime,r.uTime.value=n.clock.elapsedTime}),t.jsxs("group",{position:[0,-100,-250],children:[t.jsxs("mesh",{position:[0,-200,0],children:[t.jsx("boxGeometry",{args:[1200,600,200]}),t.jsx("meshStandardMaterial",{color:"#020202",metalness:1,roughness:.1})]}),t.jsxs("mesh",{position:[0,150,0],children:[t.jsx("boxGeometry",{args:[800,100,150]}),t.jsx("meshStandardMaterial",{color:"#050505",metalness:.8,roughness:.2})]}),t.jsxs(Me,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[t.jsxs("mesh",{position:[0,400,0],children:[t.jsx("planeGeometry",{args:[400,400]}),t.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1,blending:E,fog:!1})]}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,150,0],fontSize:100,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",fog:!1,children:"LEGAL EAGLE"})]})]})},mr=({position:o,rotation:e,visible:r})=>{const n=de(D,"/legal_eagle_logo.png");return n.colorSpace=V,t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsx("ambientLight",{intensity:.2}),t.jsx("directionalLight",{position:[0,1e3,1e3],intensity:1.5,color:"#00ffff"}),t.jsx("pointLight",{position:[0,500,-400],intensity:2,color:"#0044ff",distance:2e3}),t.jsx(ur,{}),t.jsx(dr,{logoTex:n}),t.jsx(fr,{}),t.jsx(je,{appId:"legaleagle",position:[200,100,-150]})]})},pr=`
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
`,hr=`
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
`,vr=({position:o})=>{const e=i.useRef(),r=i.useRef(),n=i.useMemo(()=>({uTime:{value:0}}),[]);return j((s,a)=>{r.current&&(r.current.uniforms.uTime.value=s.clock.elapsedTime),e.current&&(e.current.rotation.y+=a*.2,e.current.rotation.z-=a*.1)}),t.jsxs("group",{position:o,children:[t.jsxs("mesh",{ref:e,children:[t.jsx("sphereGeometry",{args:[180,128,128]}),t.jsx("shaderMaterial",{ref:r,vertexShader:pr,fragmentShader:hr,uniforms:n,transparent:!0,wireframe:!1})]}),t.jsxs("mesh",{scale:1.2,children:[t.jsx("sphereGeometry",{args:[180,64,64]}),t.jsx("meshBasicMaterial",{color:"#00ffff",wireframe:!0,transparent:!0,opacity:.03})]}),t.jsx("pointLight",{intensity:8,color:"#00ffff",distance:1500}),t.jsx("pointLight",{intensity:3,color:"#0055ff",distance:800,position:[0,-200,0]})]})},xr=()=>{const o=i.useRef(),e=600,r=1e3,n=i.useMemo(()=>{const f=[];for(let u=0;u<5;u++){const m=u%2===0?1:-1,p=u*200-400,v=new Ct([new b(p,-1e3,1e3),new b(p+300*m,200,200),new b(0,-200,-800),new b(p-300*m,-500,-1500),new b(p,1e3,-2500)]);f.push({points:v.getSpacedPoints(r)})}return f},[]),s=i.useMemo(()=>new te,[]),a=i.useMemo(()=>new b,[]),l=i.useMemo(()=>new b,[]),c=i.useMemo(()=>{const f=[];for(let u=0;u<e;u++)f.push({curveIndex:u%n.length,progress:Math.random(),speed:.001+Math.random()*.003,offset:new b((Math.random()-.5)*40,(Math.random()-.5)*40,(Math.random()-.5)*40),scale:.2+Math.random()*.8});return f},[e,n.length]);return j(()=>{o.current&&(c.forEach((f,u)=>{f.progress+=f.speed,f.progress>=1&&(f.progress=0);const m=n[f.curveIndex],p=f.progress*r,v=Math.floor(p),y=Math.min(v+1,r),x=p-v,w=m.points[v],M=m.points[y];if(!w||!M)return;a.lerpVectors(w,M,x).add(f.offset),s.position.copy(a),s.scale.setScalar(f.scale);const h=Math.floor(Math.min((f.progress+.01)*r,r)),g=Math.min(h+1,r),d=m.points[h],z=m.points[g];d&&z&&(l.lerpVectors(d,z,x).add(f.offset),s.lookAt(l)),s.updateMatrix(),o.current.setMatrixAt(u,s.matrix)}),o.current.instanceMatrix.needsUpdate=!0)}),t.jsxs("instancedMesh",{ref:o,args:[null,null,e],children:[t.jsx("boxGeometry",{args:[4,4,30]}),t.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,blending:E})]})},gr=({position:o})=>{const e=i.useRef();return j((r,n)=>{e.current&&(e.current.children[0].rotation.z+=n*.1,e.current.children[1].rotation.z-=n*.15,e.current.children[2].rotation.z+=n*.05)}),t.jsxs("group",{position:o,ref:e,children:[t.jsxs("mesh",{children:[t.jsx("ringGeometry",{args:[300,302,64]}),t.jsx("meshBasicMaterial",{color:"#0088ff",transparent:!0,opacity:.4,side:H})]}),t.jsxs("mesh",{children:[t.jsx("ringGeometry",{args:[320,330,64,1,0,Math.PI*1.5]}),t.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,side:H})]}),t.jsxs("mesh",{children:[t.jsx("ringGeometry",{args:[350,351,64,1,0,Math.PI]}),t.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.2,side:H})]})]})},yr=({position:o,rotation:e,visible:r})=>{const n=F(),[s,a]=i.useState(!1);return j(()=>{r&&(n.offset>.675&&n.offset<.69&&!s&&!window.autopilotLocked&&(window.autopilotLocked=!0,a(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(n.offset<.65||n.offset>.7)&&s&&(a(!1),window.autopilotLocked=!1))}),t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsx("ambientLight",{intensity:.2}),t.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[t.jsx("sphereGeometry",{args:[4e3,32,32]}),t.jsx("meshBasicMaterial",{color:"#010204",side:U})]}),t.jsx(Lo,{position:[0,-800,-800],args:[4e3,4e3],cellSize:100,cellThickness:1,cellColor:"#004455",sectionSize:500,sectionThickness:1.5,sectionColor:"#00aaff",fadeDistance:2e3,fadeStrength:1}),t.jsx(vr,{position:[0,-200,-800]}),t.jsx(gr,{position:[0,-200,-800]}),t.jsx(xr,{}),t.jsx(ge,{count:2e3,scale:3e3,size:15,speed:.1,opacity:.2,color:"#00ffff",position:[0,0,-800]}),t.jsx("group",{position:[0,300,-600],children:t.jsxs(Me,{speed:2,rotationIntensity:.05,floatIntensity:.5,children:[t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:70,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:1,outlineColor:"#00ffff",children:"AUTOPILOT"}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-120,0],fontSize:28,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"Autonomous Business Agent"})]})})]})},wr=({position:o})=>{const e=i.useRef(),r=i.useMemo(()=>({uTime:{value:0},uColor:{value:new S("#00ffff")}}),[]);return j(n=>{e.current&&(e.current.uniforms.uTime.value=n.clock.elapsedTime)}),t.jsxs("mesh",{position:o,children:[t.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),t.jsx("shaderMaterial",{ref:e,transparent:!0,side:H,blending:E,depthWrite:!1,uniforms:r,vertexShader:`
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
        `})]})},Mr=()=>{const o=i.useRef(),e=i.useMemo(()=>({uTime:{value:0},uColor:{value:new S("#0044ff")},uHighlight:{value:new S("#00ffff")}}),[]);return j(r=>{o.current&&(o.current.uniforms.uTime.value=r.clock.elapsedTime)}),t.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[t.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),t.jsx("shaderMaterial",{ref:o,transparent:!0,wireframe:!0,uniforms:e,vertexShader:`
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
        `})]})},jr=({position:o,rotation:e,visible:r})=>{const[n,s]=i.useState(null);return i.useEffect(()=>{new D().load("/cloveh2o_logo.png",l=>{l.colorSpace=V,s(l)})},[]),t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsxs("mesh",{children:[t.jsx("sphereGeometry",{args:[4e3,32,32]}),t.jsx("meshBasicMaterial",{color:"#000511",side:U})]}),t.jsx(Mr,{}),t.jsx(wr,{position:[0,1800,-800]}),t.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),t.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),t.jsxs("group",{position:[0,0,-300],children:[n&&t.jsxs("mesh",{position:[0,80,0],children:[t.jsx("planeGeometry",{args:[200,200]}),t.jsx("meshBasicMaterial",{map:n,transparent:!0,depthWrite:!1,blending:E})]}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},br=()=>{const e=i.useRef(),r=i.useRef(),n=i.useMemo(()=>({uTime:{value:0}}),[]);return zt.useEffect(()=>{if(!e.current)return;const s=new te,a=5,l=["#0088ff","#ff0044","#ffffff","#00ffcc"],c=new S;for(let f=0;f<2e4;f++){const u=Math.random()*Math.PI*2,m=Math.floor(Math.random()*a),p=350+m*120+Math.random()*80,v=250+m*90+Math.random()*60,y=Math.cos(u)*p,x=Math.sin(u)*v,w=m*60+Math.random()*40-20;s.position.set(y,w,x),s.updateMatrix(),e.current.setMatrixAt(f,s.matrix);const M=l[Math.floor(Math.random()*l.length)];c.set(M),e.current.setColorAt(f,c)}e.current.instanceMatrix.needsUpdate=!0,e.current.instanceColor&&(e.current.instanceColor.needsUpdate=!0)},[2e4]),j(s=>{r.current&&(n.uTime.value=s.clock.elapsedTime)}),t.jsxs("group",{position:[0,-100,0],children:[t.jsxs("instancedMesh",{ref:e,args:[null,null,2e4],children:[t.jsx("sphereGeometry",{args:[2,4,4]}),t.jsx("shaderMaterial",{ref:r,uniforms:n,transparent:!0,blending:E,depthWrite:!1,vertexShader:`
            uniform float uTime;
            varying vec3 vColor;
            void main() {
              vColor = instanceColor;
              
              // Base instance position
              vec4 worldPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
              
              // The Wave effect
              float wave = sin(worldPos.x * 0.01 + worldPos.z * 0.01 + uTime * 2.0) * 10.0;
              
              // Flash effect based on pseudo-randomness from position
              float flashSpeed = 0.5 + fract(sin(worldPos.x * 12.9898 + worldPos.z * 78.233) * 43758.5453) * 2.0;
              float offset = fract(sin(worldPos.z * 12.9898 + worldPos.x * 78.233) * 43758.5453) * 6.28;
              float flash = sin(uTime * flashSpeed + offset);
              
              float scale = flash > 0.95 ? 3.0 : (flash > 0.0 ? 0.8 : 0.3);
              
              vec3 transformed = position * scale;
              transformed.y += wave;
              
              gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(transformed, 1.0);
            }
          `,fragmentShader:`
            varying vec3 vColor;
            void main() {
              gl_FragColor = vec4(vColor, 0.8);
            }
          `})]}),[0,1,2,3,4].map(s=>t.jsxs("mesh",{position:[0,s*60-25,0],rotation:[-Math.PI/2,0,0],children:[t.jsx("torusGeometry",{args:[350+s*120,3,4,64]}),t.jsx("meshBasicMaterial",{color:"#00ffcc",transparent:!0,opacity:.2,wireframe:!0})]},s)),t.jsxs(Me,{speed:2,floatIntensity:1,position:[0,400,-600],children:[t.jsxs("mesh",{children:[t.jsx("boxGeometry",{args:[400,200,20]}),t.jsx("meshPhysicalMaterial",{color:"#000000",transmission:.9,roughness:.1})]}),t.jsxs("mesh",{position:[0,0,11],children:[t.jsx("planeGeometry",{args:[380,180]}),t.jsx("meshBasicMaterial",{color:"#002244"})]}),t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,12],fontSize:60,color:"#00ffff",outlineWidth:1,children:"FANTASY QUANT"})]})]})},xe=({color:o,number:e,groupRef:r,armRef:n})=>t.jsxs("group",{ref:r,children:[t.jsxs("mesh",{position:[0,10,0],children:[t.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),t.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.3,roughness:.4})]}),t.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[t.jsx("sphereGeometry",{args:[2.5,16,16]}),t.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),t.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[t.jsx("sphereGeometry",{args:[2.5,16,16]}),t.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),t.jsxs("group",{position:[0,17,0],children:[t.jsxs("mesh",{children:[t.jsx("sphereGeometry",{args:[2.8,32,32]}),t.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.8,metalness:.5})]}),t.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[t.jsx("boxGeometry",{args:[3.5,2,2]}),t.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),t.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:t.jsxs("mesh",{position:[0,-3.5,0],children:[t.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),t.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),t.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:n,children:t.jsxs("mesh",{position:[0,-3.5,0],children:[t.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),t.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),t.jsxs("mesh",{position:[-1.8,3,0],children:[t.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),t.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),t.jsxs("mesh",{position:[1.8,3,0],children:[t.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),t.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),e&&t.jsx(A,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",children:e})]}),zr=({position:o,rotation:e})=>{const r=i.useRef(),n=i.useRef(),s=i.useRef(),a=i.useRef(),l=i.useRef(),c=i.useRef(),f=i.useMemo(()=>new b(100,0,0),[]),u=i.useMemo(()=>new b(100,0,20),[]),m=i.useMemo(()=>new b(30,0,100),[]),p=i.useMemo(()=>new b(0,0,-20),[]),v=i.useMemo(()=>new b(20,0,220),[]),y=i.useMemo(()=>new b,[]),x=i.useMemo(()=>new b,[]);return j(w=>{const M=w.clock.elapsedTime%6;if(s.current&&s.current.rotation.set(0,0,-.3),M<.5)n.current&&n.current.position.copy(f),a.current&&a.current.position.copy(u),l.current&&l.current.position.copy(m),r.current&&r.current.position.copy(p),c.current&&c.current.position.copy(p).add(y.set(4.5,12,2));else if(M<4){const h=(M-.5)/3.5;if(n.current&&(h<.5?n.current.position.lerpVectors(f,y.set(100,0,110),h*2):n.current.position.lerpVectors(x.set(100,0,110),v,(h-.5)*2)),a.current&&n.current&&a.current.position.lerpVectors(u,y.set(v.x+8,0,v.z-8),h),l.current&&l.current.position.lerpVectors(m,y.set(v.x-8,0,v.z+8),h),c.current)if(M<1.5)c.current.position.copy(p).add(y.set(4.5,12,2));else{const g=(M-1.5)/2.5,d=Math.sin(g*Math.PI)*45;c.current.position.lerpVectors(p,v,g),c.current.position.y+=d+18}}else if(M<5)n.current&&n.current.position.lerpVectors(v,y.set(20,0,240),M-4),c.current&&n.current&&c.current.position.copy(n.current.position).add(y.set(0,12,3)),a.current&&(a.current.position.y=0),l.current&&(l.current.position.y=0);else if(M<5.5)s.current&&s.current.rotation.set(Math.PI,0,0),c.current&&n.current&&c.current.position.copy(n.current.position).add(y.set(4.5,20,0));else if(s.current&&s.current.rotation.set(-Math.PI/4,0,0),c.current&&n.current){const h=Math.abs(Math.cos((M-5.5)*8))*10;c.current.position.copy(n.current.position).add(y.set(4.5,h,4))}}),t.jsxs("group",{position:o,rotation:e,children:[t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[t.jsx("planeGeometry",{args:[400,400]}),t.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),t.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[t.jsx("planeGeometry",{args:[400,40]}),t.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),t.jsx(xe,{color:"#0088ff",number:"QB",groupRef:r}),t.jsx(xe,{color:"#00ffff",number:"80",groupRef:n,armRef:s}),t.jsx(xe,{color:"#ff0044",number:"CB",groupRef:a}),t.jsx(xe,{color:"#ff0044",number:"S",groupRef:l}),t.jsxs("mesh",{ref:c,children:[t.jsx("sphereGeometry",{args:[2,16,16]}),t.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},Pr=({position:o,rotation:e,visible:r})=>t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),t.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),t.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]}),t.jsx(br,{}),t.jsx(zr,{position:[0,-100,0],rotation:[0,-Math.PI/2,0]})]}),Cr=({position:o,rotation:e,visible:r})=>{const n=i.useRef(),s=i.useRef(),a=de(D,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return j(l=>{n.current&&(n.current.position.y=Math.sin(l.clock.elapsedTime*1.5)*5),s.current&&(s.current.rotation.y+=.005,s.current.rotation.z+=.002)}),t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsxs("mesh",{children:[t.jsx("sphereGeometry",{args:[1500,32,32]}),t.jsx("meshBasicMaterial",{color:"#020510",side:U})]}),t.jsxs("group",{children:[t.jsx(Me,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:t.jsxs("mesh",{ref:n,position:[0,0,-500],children:[t.jsx("planeGeometry",{args:[400,100]})," ",t.jsx("meshBasicMaterial",{map:a,transparent:!0,opacity:1,side:H,depthWrite:!1})]})}),t.jsx(ge,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),t.jsx(ge,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),t.jsx("ambientLight",{intensity:.5,color:"#002244"}),t.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},Tr=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Sr=`
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
`,Rr=({startZ:o=10,endZ:e=-500,visible:r=!0})=>{const n=i.useRef(),s=i.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);j(l=>{n.current&&r&&(n.current.uniforms.uTime.value=l.clock.elapsedTime,n.current.uniforms.uOpacity.value=L.lerp(n.current.uniforms.uOpacity.value,r?1:0,.05))});const a=i.useMemo(()=>{const l=[],f=o-e;for(let u=0;u<=100;u++){const m=o-u/100*f;l.push(new b(Math.sin(u*.1)*2,Math.cos(u*.05)*2,m))}return new Ct(l)},[o,e]);return t.jsxs("mesh",{visible:r,children:[t.jsx("tubeGeometry",{args:[a,200,15,32,!1]}),t.jsx("shaderMaterial",{ref:n,vertexShader:Tr,fragmentShader:Sr,uniforms:s,side:U,transparent:!0,blending:E})]})},_r=`
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
`,kr=`
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
`,Ir=({position:o,rotation:e=[0,0,0],length:r=4e3,visible:n=!0})=>{const s=i.useRef(),a=i.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:r}}),[r]);return j(l=>{s.current&&(s.current.uniforms.uTime.value=l.clock.elapsedTime,s.current.uniforms.uOpacity.value=n?1:0)}),t.jsx("group",{position:o,rotation:e,visible:n,children:t.jsxs("mesh",{children:[t.jsx("cylinderGeometry",{args:[60,400,r+200,32,64,!0]}),t.jsx("shaderMaterial",{ref:s,vertexShader:_r,fragmentShader:kr,uniforms:a,transparent:!0,side:U,wireframe:!1})]})})},fe=({position:o,rotation:e,length:r=4e3,radius:n=200,color:s="#ffffff",speed:a=20,visible:l=!0})=>{const c=i.useRef(),f=i.useMemo(()=>({uTime:{value:0},uColor:{value:new S(s)}}),[s]);return j(u=>{c.current&&(c.current.uniforms.uTime.value=u.clock.elapsedTime)}),t.jsxs("mesh",{visible:l,position:o,rotation:e,children:[t.jsx("cylinderGeometry",{args:[n,n,r,32,1,!0]}),t.jsx("shaderMaterial",{ref:c,transparent:!0,side:U,blending:E,depthWrite:!1,uniforms:f,vertexShader:`
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
        `})]})},Lr=()=>{const o=[],e=(r,n,s)=>{o.push({x:r,y:n,z:0,rot:[Math.PI/2,0,0],color:s,bodyHeight:40+Math.random()*40})};for(let r=Math.PI*.25;r<Math.PI*1.75;r+=.2)e(-100+Math.cos(r)*80,Math.sin(r)*80,"#00ff00");for(let r=0;r<Math.PI*2;r+=.2)e(100+Math.cos(r)*80,Math.sin(r)*80,"#ff0044");return e(140,-40,"#ff0044"),e(160,-60,"#ff0044"),e(180,-80,"#ff0044"),o},Ar=({position:o,rotation:e=[0,0,0],length:r=6e3,radius:n=250,visible:s})=>{const a=i.useRef(),l=i.useRef(),c=i.useRef(),f=de(D,"/assets/images/contango_logo.png"),u=i.useMemo(()=>{const p=[],v=Math.floor(r/5);for(let x=0;x<v;x++){const w=-(x/v)*r,M=x*.1,h=Math.cos(M)*n,g=Math.sin(M)*n,d=Math.cos(M+Math.PI)*n,z=Math.sin(M+Math.PI)*n,C=Math.random()>.5?"#00ff00":"#ff0044",N=20+Math.random()*60,B=[0,0,M+Math.PI/2],P=[0,0,M+Math.PI+Math.PI/2];p.push({x:h,y:g,z:w,rot:B,color:C,bodyHeight:N}),p.push({x:d,y:z,z:w,rot:P,color:C,bodyHeight:N})}return Lr().forEach(x=>{p.push({x:x.x,y:x.y,z:-r-500,rot:x.rot,color:x.color,bodyHeight:x.bodyHeight})}),p},[r,n]),m=u.length;return i.useEffect(()=>{if(!l.current||!c.current)return;const p=new te,v=new S;for(let y=0;y<m;y++){const x=u[y];p.position.set(x.x,x.y,x.z),p.rotation.set(x.rot[0],x.rot[1],x.rot[2]),p.scale.set(1,x.bodyHeight+40,1),p.updateMatrix(),l.current.setMatrixAt(y,p.matrix),v.set(x.color),l.current.setColorAt(y,v),p.scale.set(1,x.bodyHeight,1),p.updateMatrix(),c.current.setMatrixAt(y,p.matrix),c.current.setColorAt(y,v)}l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0)},[u,m]),j(p=>{a.current&&s&&(a.current.rotation.z=p.clock.elapsedTime*.5)}),t.jsxs("group",{position:o,rotation:e,visible:s,children:[t.jsxs("group",{ref:a,children:[t.jsxs("instancedMesh",{ref:l,args:[null,null,m],children:[t.jsx("cylinderGeometry",{args:[2,2,1,8]}),t.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),t.jsxs("instancedMesh",{ref:c,args:[null,null,m],children:[t.jsx("boxGeometry",{args:[10,1,10]}),t.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),t.jsxs("mesh",{position:[0,0,-r-500],children:[t.jsx("planeGeometry",{args:[200,200]}),t.jsx("meshBasicMaterial",{map:f,transparent:!0})]}),t.jsxs("mesh",{position:[0,0,-r/2],rotation:[Math.PI/2,0,0],children:[t.jsx("cylinderGeometry",{args:[n*.8,n*.8,r,32,1,!0]}),t.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:U})]})]})},O=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3750,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7250,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7250,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.57,x:0,y:-3980,z:-12250,rx:0,ry:0},{p:.59,x:0,y:-3980,z:-13250,rx:0,ry:0},{p:.63,x:0,y:-3980,z:-13250,rx:0,ry:0},{p:.65,x:0,y:-3980,z:-14250,rx:0,ry:0},{p:.67,x:0,y:-3980,z:-15250,rx:0,ry:0},{p:.69,x:0,y:-3980,z:-16250,rx:0,ry:0},{p:.73,x:0,y:-3980,z:-16250,rx:0,ry:0},{p:.75,x:0,y:-3980,z:-17250,rx:0,ry:0},{p:.77,x:0,y:-3980,z:-18250,rx:0,ry:0},{p:.79,x:0,y:-3980,z:-19250,rx:0,ry:0},{p:.83,x:0,y:-3980,z:-19250,rx:0,ry:0},{p:.85,x:0,y:-3980,z:-20250,rx:0,ry:0},{p:.87,x:0,y:-3980,z:-21250,rx:0,ry:0},{p:.93,x:0,y:-3980,z:-26250,rx:0,ry:0},{p:.95,x:0,y:-3980,z:-27250,rx:0,ry:0},{p:.97,x:0,y:-3980,z:-27750,rx:0,ry:0},{p:1,x:0,y:-3980,z:-27750,rx:0,ry:0}],Er=o=>{if(o<=O[0].p)return O[0];if(o>=O[O.length-1].p)return O[O.length-1];for(let e=0;e<O.length-1;e++){const r=O[e],n=O[e+1];if(o>=r.p&&o<=n.p){const s=(o-r.p)/(n.p-r.p);return{x:L.lerp(r.x,n.x,s),y:L.lerp(r.y,n.y,s),z:L.lerp(r.z,n.z,s),rx:L.lerp(r.rx,n.rx,s),ry:L.lerp(r.ry,n.ry,s)}}}return O[0]},Fr=()=>{const o=F(),e=i.useRef();return j(r=>{const n=o.offset,s=Er(n);r.camera.position.x=L.lerp(r.camera.position.x,s.x,.2),r.camera.position.y=L.lerp(r.camera.position.y,s.y,.2),r.camera.position.z=L.lerp(r.camera.position.z,s.z,.2);const a=new X().setFromEuler(new Re(s.rx,s.ry,0));r.camera.quaternion.slerp(a,.15);const l=o.delta*10;r.camera.rotateZ(L.lerp(0,l*2,.2)),e.current&&e.current.position.copy(r.camera.position)}),t.jsxs("group",{children:[t.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),t.jsx("pointLight",{ref:e,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),t.jsx("ambientLight",{intensity:.2})]})},Gr=()=>{const o=F(),[e,r]=i.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_auto:!1,auto:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,sentaient:!1}),n=i.useRef(e);return j(()=>{const s=o.offset,a={intro:s<.08,mindwave:s>.04&&s<.18,wormhole_ice:s>.1&&s<.25,icebreaker:s>.18&&s<.35,wormhole_sound:s>.28&&s<.42,interstellar:s>.35&&s<.48,w_legal:s>.43&&s<.54,legal:s>.45&&s<.58,w_auto:s>.53&&s<.65,auto:s>.56&&s<.68,w_clove:s>.63&&s<.75,clove:s>.66&&s<.78,w_fantasy:s>.73&&s<.85,fantasy:s>.76&&s<.88,w_contango:s>.83&&s<.96,sentaient:s>.9};let l=!1;for(const c in a)n.current[c]!==a[c]&&(l=!0);l&&(n.current=a,r(a))}),t.jsxs("group",{children:[t.jsx(Rr,{startZ:10,endZ:-250,visible:e.intro}),t.jsx(sr,{position:[0,0,-1350],visible:e.mindwave}),t.jsx(Ir,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:e.wormhole_ice}),t.jsx(er,{position:[0,-4e3,-2550],visible:e.icebreaker}),t.jsx(fe,{position:[0,-4e3,-5e3],rotation:[Math.PI/2,0,0],length:3500,color:"#ff00ff",speed:20,visible:e.wormhole_sound}),t.jsx(cr,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:e.interstellar}),t.jsx(fe,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:e.w_legal}),t.jsx(mr,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:e.legal}),t.jsx(fe,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffcc",visible:e.w_auto}),t.jsx(yr,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:e.auto}),t.jsx(fe,{position:[0,-4e3,-14750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffff",speed:40,visible:e.w_clove}),t.jsx(jr,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:e.clove}),t.jsx(fe,{position:[0,-4e3,-17750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ff00",visible:e.w_fantasy}),t.jsx(Pr,{position:[0,-4e3,-19550],rotation:[0,0,0],visible:e.fantasy}),t.jsx(Ar,{position:[0,-4e3,-23250],length:6e3,visible:e.w_contango}),t.jsx(Cr,{position:[0,-4e3,-28050],rotation:[0,0,0],visible:e.sentaient})]})},Ur=()=>{const o=F(),e=i.useRef(),r=i.useRef();return i.useRef(),i.useRef(),i.useRef(),j(()=>{const n=o.offset;if(e.current){const s=n<.03?1:0;e.current.style.opacity=s}if(r.current){const s=n>.2&&n<.28?1:0;r.current.style.opacity=s}}),t.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[t.jsxs("div",{ref:e,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[t.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),t.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),t.jsxs("div",{ref:r,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[t.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[t.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:t.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),t.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),t.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),t.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},Br=()=>t.jsxs(Et,{gl:{antialias:!1,alpha:!0},children:[t.jsxs(So,{pages:10,damping:.2,distance:1.2,children:[t.jsxs(zt.Suspense,{fallback:null,children:[t.jsx(Fr,{}),t.jsx(Gr,{})]}),t.jsx(ge,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),t.jsx(ko,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:t.jsx(Ur,{})})]}),t.jsxs(Ut,{disableNormalPass:!0,children:[t.jsx(Bt,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),t.jsx(Wt,{opacity:.05}),t.jsx(Ht,{eskil:!1,offset:.1,darkness:1.1})]})]}),Xr=()=>t.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[t.jsxs(Lt,{children:[t.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),t.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),t.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),t.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:t.jsx(At,{})}),t.jsx("div",{className:"absolute inset-0 z-0",children:t.jsx(Br,{})})]});export{Xr as default};
//# sourceMappingURL=index-Csy00vQO.js.map
