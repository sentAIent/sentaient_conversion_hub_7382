import{l as a,_ as le,h as gt,k as t,a as yt,H as wt}from"./vendor-DUpYkZk-.js";import{H as jt}from"./Header-Dxh-cjwe.js";import{b as Me,u as y,c as Te,e as Mt,a as ze,C as zt}from"./react-three-fiber.esm-Q43WOzOl.js";import{s as bt,S as pe,E as Pt,B as Ct,N as St,V as Tt}from"./Vignette-De5zmxfX.js";import{aj as be,ak as j,Y as Z,w as dt,aa as _t,al as ve,j as T,E as Pe,W as Rt,B as E,u as A,ad as O,a2 as Y,a as D,m as U,a1 as _e,Q as ce,k as kt,a9 as It,a6 as Lt,o as At,h as mt}from"./three-CQ_0bTbV.js";import{T as _}from"./Text-BMGYElIM.js";import{v as Et}from"./constants-DoPgMF74.js";import"./main-BzifXT7D.js";import"./preload-helper-CS1eXPs2.js";import"./index-D6JA1fEd.js";function ie(o,e,r){return e in o?Object.defineProperty(o,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):o[e]=r,o}function ye(o,e){(e==null||e>o.length)&&(e=o.length);for(var r=0,s=new Array(e);r<e;r++)s[r]=o[r];return s}function Ft(o,e){if(o){if(typeof o=="string")return ye(o,e);var r=Object.prototype.toString.call(o).slice(8,-1);if(r==="Object"&&o.constructor&&(r=o.constructor.name),r==="Map"||r==="Set")return Array.from(o);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return ye(o,e)}}function Gt(o){if(Array.isArray(o))return ye(o)}function Ut(o){if(typeof Symbol<"u"&&o[Symbol.iterator]!=null||o["@@iterator"]!=null)return Array.from(o)}function Bt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Wt(o){return Gt(o)||Ut(o)||Ft(o)||Bt()}new be;new be;function Ot(o,e,r){return Math.max(e,Math.min(r,o))}function Dt(o,e){return Ot(o-Math.floor(o/e)*e,0,e)}function Ht(o,e){var r=Dt(e-o,Math.PI*2);return r>Math.PI&&(r-=Math.PI*2),r}function pt(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}var G=function o(e,r,s){var n=this;pt(this,o),ie(this,"dot2",function(i,l){return n.x*i+n.y*l}),ie(this,"dot3",function(i,l,f){return n.x*i+n.y*l+n.z*f}),this.x=e,this.y=r,this.z=s},Nt=[new G(1,1,0),new G(-1,1,0),new G(1,-1,0),new G(-1,-1,0),new G(1,0,1),new G(-1,0,1),new G(1,0,-1),new G(-1,0,-1),new G(0,1,1),new G(0,-1,1),new G(0,1,-1),new G(0,-1,-1)],Re=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],ke=new Array(512),Ie=new Array(512),Vt=function(e){e>0&&e<1&&(e*=65536),e=Math.floor(e),e<256&&(e|=e<<8);for(var r=0;r<256;r++){var s;r&1?s=Re[r]^e&255:s=Re[r]^e>>8&255,ke[r]=ke[r+256]=s,Ie[r]=Ie[r+256]=Nt[s%12]}};Vt(0);function qt(o){if(typeof o=="number")o=Math.abs(o);else if(typeof o=="string"){var e=o;o=0;for(var r=0;r<e.length;r++)o=(o+(r+1)*(e.charCodeAt(r)%96))%2147483647}return o===0&&(o=311),o}function Le(o){var e=qt(o);return function(){var r=e*48271%2147483647;return e=r,r/2147483647}}var Yt=function o(e){var r=this;pt(this,o),ie(this,"seed",0),ie(this,"init",function(s){r.seed=s,r.value=Le(s)}),ie(this,"value",Le(this.seed)),this.init(e)};new Yt(Math.random());var Xt=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return s/Math.atan(1/r)*Math.atan(Math.sin(2*Math.PI*e*n)/r)},ht=function(e){return 1/(1+e+.48*e*e+.235*e*e*e)},Zt=function(e){return e},Qt={in:function(e){return 1-Math.cos(e*Math.PI/2)},out:function(e){return Math.sin(e*Math.PI/2)},inOut:function(e){return-(Math.cos(Math.PI*e)-1)/2}},$t={in:function(e){return e*e*e},out:function(e){return 1-Math.pow(1-e,3)},inOut:function(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}},Kt={in:function(e){return e*e*e*e*e},out:function(e){return 1-Math.pow(1-e,5)},inOut:function(e){return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2}},Jt={in:function(e){return 1-Math.sqrt(1-Math.pow(e,2))},out:function(e){return Math.sqrt(1-Math.pow(e-1,2))},inOut:function(e){return e<.5?(1-Math.sqrt(1-Math.pow(2*e,2)))/2:(Math.sqrt(1-Math.pow(-2*e+2,2))+1)/2}},eo={in:function(e){return e*e*e*e},out:function(e){return 1- --e*e*e*e},inOut:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e}},to={in:function(e){return e===0?0:Math.pow(2,10*e-10)},out:function(e){return e===1?1:1-Math.pow(2,-10*e)},inOut:function(e){return e===0?0:e===1?1:e<.5?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2}};function k(o,e,r){var s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,l=arguments.length>6&&arguments[6]!==void 0?arguments[6]:ht,f=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,u="velocity_"+e;if(o.__damp===void 0&&(o.__damp={}),o.__damp[u]===void 0&&(o.__damp[u]=0),Math.abs(o[e]-r)<=f)return o[e]=r,!1;s=Math.max(1e-4,s);var c=2/s,p=l(c*n),m=o[e]-r,v=r,M=i*s;m=Math.min(Math.max(m,-M),M),r=o[e]-m;var g=(o.__damp[u]+c*m)*n;o.__damp[u]=(o.__damp[u]-c*g)*p;var x=r+(m+g)*p;return v-o[e]>0==x>v&&(x=v,o.__damp[u]=(x-v)/n),o[e]=x,!0}var oo=function(e){return e&&e.isCamera},ro=function(e){return e&&e.isLight},ee=new j,Ae=new Z,Ee=new Z,te=new dt,xe=new j;function no(o,e,r,s,n,i,l){typeof e=="number"?ee.setScalar(e):Array.isArray(e)?ee.set(e[0],e[1],e[2]):ee.copy(e);var f=o.parent;o.updateWorldMatrix(!0,!1),xe.setFromMatrixPosition(o.matrixWorld),oo(o)||ro(o)?te.lookAt(xe,ee,o.up):te.lookAt(ee,xe,o.up),he(o.quaternion,Ee.setFromRotationMatrix(te),r,s,n,i,l),f&&(te.extractRotation(f.matrixWorld),Ae.setFromRotationMatrix(te),he(o.quaternion,Ee.copy(o.quaternion).premultiply(Ae.invert()),r,s,n,i,l))}function K(o,e,r,s,n,i,l,f){return k(o,e,o[e]+Ht(o[e],r),s,n,i,l,f)}var oe=new be,Fe,Ge;function so(o,e,r,s,n,i,l){return typeof e=="number"?oe.setScalar(e):Array.isArray(e)?oe.set(e[0],e[1]):oe.copy(e),Fe=k(o,"x",oe.x,r,s,n,i,l),Ge=k(o,"y",oe.y,r,s,n,i,l),Fe||Ge}var Q=new j,Ue,Be,We;function we(o,e,r,s,n,i,l){return typeof e=="number"?Q.setScalar(e):Array.isArray(e)?Q.set(e[0],e[1],e[2]):Q.copy(e),Ue=k(o,"x",Q.x,r,s,n,i,l),Be=k(o,"y",Q.y,r,s,n,i,l),We=k(o,"z",Q.z,r,s,n,i,l),Ue||Be||We}var X=new ve,Oe,De,He,Ne;function ao(o,e,r,s,n,i,l){return typeof e=="number"?X.setScalar(e):Array.isArray(e)?X.set(e[0],e[1],e[2],e[3]):X.copy(e),Oe=k(o,"x",X.x,r,s,n,i,l),De=k(o,"y",X.y,r,s,n,i,l),He=k(o,"z",X.z,r,s,n,i,l),Ne=k(o,"w",X.w,r,s,n,i,l),Oe||De||He||Ne}var re=new Pe,Ve,qe,Ye;function io(o,e,r,s,n,i,l){return Array.isArray(e)?re.set(e[0],e[1],e[2],e[3]):re.copy(e),Ve=K(o,"x",re.x,r,s,n,i,l),qe=K(o,"y",re.y,r,s,n,i,l),Ye=K(o,"z",re.z,r,s,n,i,l),Ve||qe||Ye}var $=new T,Xe,Ze,Qe;function lo(o,e,r,s,n,i,l){return e instanceof T?$.copy(e):Array.isArray(e)?$.setRGB(e[0],e[1],e[2]):$.set(e),Xe=k(o,"r",$.r,r,s,n,i,l),Ze=k(o,"g",$.g,r,s,n,i,l),Qe=k(o,"b",$.b,r,s,n,i,l),Xe||Ze||Qe}var W=new Z,q=new ve,$e=new ve,ne=new ve,Ke,Je,et,tt;function he(o,e,r,s,n,i,l){var f=o;Array.isArray(e)?W.set(e[0],e[1],e[2],e[3]):W.copy(e);var u=o.dot(W)>0?1:-1;return W.x*=u,W.y*=u,W.z*=u,W.w*=u,Ke=k(o,"x",W.x,r,s,n,i,l),Je=k(o,"y",W.y,r,s,n,i,l),et=k(o,"z",W.z,r,s,n,i,l),tt=k(o,"w",W.w,r,s,n,i,l),q.set(o.x,o.y,o.z,o.w).normalize(),$e.set(f.__damp.velocity_x,f.__damp.velocity_y,f.__damp.velocity_z,f.__damp.velocity_w),ne.copy(q).multiplyScalar($e.dot(q)/q.dot(q)),f.__damp.velocity_x-=ne.x,f.__damp.velocity_y-=ne.y,f.__damp.velocity_z-=ne.z,f.__damp.velocity_w-=ne.w,o.set(q.x,q.y,q.z,q.w),Ke||Je||et||tt}var se=new _t,ot,rt,nt;function co(o,e,r,s,n,i,l){return Array.isArray(e)?se.set(e[0],e[1],e[2]):se.copy(e),ot=k(o,"radius",se.radius,r,s,n,i,l),rt=K(o,"phi",se.phi,r,s,n,i,l),nt=K(o,"theta",se.theta,r,s,n,i,l),ot||rt||nt}var de=new dt,st=new j,at=new Z,it=new j,lt,ct,ft;function fo(o,e,r,s,n,i,l){var f=o;return f.__damp===void 0&&(f.__damp={position:new j,rotation:new Z,scale:new j},o.decompose(f.__damp.position,f.__damp.rotation,f.__damp.scale)),Array.isArray(e)?de.set.apply(de,Wt(e)):de.copy(e),de.decompose(st,at,it),lt=we(f.__damp.position,st,r,s,n,i,l),ct=he(f.__damp.rotation,at,r,s,n,i,l),ft=we(f.__damp.scale,it,r,s,n,i,l),o.compose(f.__damp.position,f.__damp.rotation,f.__damp.scale),lt||ct||ft}var ut=Object.freeze({__proto__:null,rsqw:Xt,exp:ht,linear:Zt,sine:Qt,cubic:$t,quint:Kt,circ:Jt,quart:eo,expo:to,damp:k,dampLookAt:no,dampAngle:K,damp2:so,damp3:we,damp4:ao,dampE:io,dampC:lo,dampQ:he,dampS:co,dampM:fo});const Ce=a.createContext(null);function F(){return a.useContext(Ce)}function uo({eps:o=1e-5,enabled:e=!0,infinite:r,horizontal:s,pages:n=1,distance:i=1,damping:l=.25,maxSpeed:f=1/0,prepend:u=!1,style:c={},children:p}){const{get:m,setEvents:v,gl:M,size:g,invalidate:x,events:w}=Me(),[h]=a.useState(()=>document.createElement("div")),[z]=a.useState(()=>document.createElement("div")),[d]=a.useState(()=>document.createElement("div")),P=M.domElement.parentNode,S=a.useRef(0),C=a.useMemo(()=>({el:h,eps:o,fill:z,fixed:d,horizontal:s,damping:l,offset:0,delta:0,scroll:S,pages:n,range(b,I,R=0){const L=b-R,V=L+I+R*2;return this.offset<L?0:this.offset>V?1:(this.offset-L)/(V-L)},curve(b,I,R=0){return Math.sin(this.range(b,I,R)*Math.PI)},visible(b,I,R=0){const L=b-R,V=L+I+R*2;return this.offset>=L&&this.offset<=V}}),[o,l,s,n]);a.useEffect(()=>{h.style.position="absolute",h.style.width="100%",h.style.height="100%",h.style[s?"overflowX":"overflowY"]="auto",h.style[s?"overflowY":"overflowX"]="hidden",h.style.top="0px",h.style.left="0px";for(const I in c)h.style[I]=c[I];d.style.position="sticky",d.style.top="0px",d.style.left="0px",d.style.width="100%",d.style.height="100%",d.style.overflow="hidden",h.appendChild(d),z.style.height=s?"100%":`${n*i*100}%`,z.style.width=s?`${n*i*100}%`:"100%",z.style.pointerEvents="none",h.appendChild(z),u?P.prepend(h):P.appendChild(h),h[s?"scrollLeft":"scrollTop"]=1;const B=w.connected||M.domElement;requestAnimationFrame(()=>w.connect==null?void 0:w.connect(h));const b=m().events.compute;return v({compute(I,R){const{left:L,top:V}=P.getBoundingClientRect(),fe=I.clientX-L,ue=I.clientY-V;R.pointer.set(fe/R.size.width*2-1,-(ue/R.size.height)*2+1),R.raycaster.setFromCamera(R.pointer,R.camera)}}),()=>{P.removeChild(h),v({compute:b}),w.connect==null||w.connect(B)}},[n,i,s,h,z,d,P]),a.useEffect(()=>{if(w.connected===h){const B=g[s?"width":"height"],b=h[s?"scrollWidth":"scrollHeight"],I=b-B;let R=0,L=!0,V=!0;const fe=()=>{if(!(!e||V)&&(x(),R=h[s?"scrollLeft":"scrollTop"],S.current=R/I,r)){if(!L){if(R>=I){const J=1-C.offset;h[s?"scrollLeft":"scrollTop"]=1,S.current=C.offset=-J,L=!0}else if(R<=0){const J=1+C.offset;h[s?"scrollLeft":"scrollTop"]=b,S.current=C.offset=J,L=!0}}L&&setTimeout(()=>L=!1,40)}};h.addEventListener("scroll",fe,{passive:!0}),requestAnimationFrame(()=>V=!1);const ue=J=>h.scrollLeft+=J.deltaY/2;return s&&h.addEventListener("wheel",ue,{passive:!0}),()=>{h.removeEventListener("scroll",fe),s&&h.removeEventListener("wheel",ue)}}},[h,w,g,r,C,x,s,e]);let N=0;return y((B,b)=>{N=C.offset,ut.damp(C,"offset",S.current,l,b,f,void 0,o),ut.damp(C,"delta",Math.abs(N-C.offset),l,b,f,void 0,o),C.delta>o&&x()}),a.createElement(Ce.Provider,{value:C},p)}const mo=a.forwardRef(({children:o},e)=>{const r=a.useRef(null);a.useImperativeHandle(e,()=>r.current,[]);const s=F(),{width:n,height:i}=Me(l=>l.viewport);return y(()=>{r.current.position.x=s.horizontal?-n*(s.pages-1)*s.offset:0,r.current.position.y=s.horizontal?0:i*(s.pages-1)*s.offset}),a.createElement("group",{ref:r},o)}),po=a.forwardRef(({children:o,style:e,...r},s)=>{const n=F(),i=a.useRef(null);a.useImperativeHandle(s,()=>i.current,[]);const{width:l,height:f}=Me(p=>p.size),u=a.useContext(Te),c=a.useMemo(()=>gt(n.fixed),[n.fixed]);return y(()=>{n.delta>n.eps&&(i.current.style.transform=`translate3d(${n.horizontal?-l*(n.pages-1)*n.offset:0}px,${n.horizontal?0:f*(n.pages-1)*-n.offset}px,0)`)}),c.render(a.createElement("div",le({ref:i,style:{...e,position:"absolute",top:0,left:0,willChange:"transform"}},r),a.createElement(Ce.Provider,{value:n},a.createElement(Te.Provider,{value:u},o)))),null}),ho=a.forwardRef(({html:o,...e},r)=>{const s=o?po:mo;return a.createElement(s,le({ref:r},e))}),vt=a.forwardRef(function({children:e,follow:r=!0,lockX:s=!1,lockY:n=!1,lockZ:i=!1,...l},f){const u=a.useRef(null),c=a.useRef(null),p=new Z;return y(({camera:m})=>{if(!r||!c.current)return;const v=c.current.rotation.clone();c.current.updateMatrix(),c.current.updateWorldMatrix(!1,!1),c.current.getWorldQuaternion(p),m.getWorldQuaternion(u.current.quaternion).premultiply(p.invert()),s&&(c.current.rotation.x=v.x),n&&(c.current.rotation.y=v.y),i&&(c.current.rotation.z=v.z)}),a.useImperativeHandle(f,()=>c.current,[]),a.createElement("group",le({ref:c},l),a.createElement("group",{ref:u},e))}),vo=bt({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new T,sectionColor:new T,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new j,worldPlanePosition:new j},`
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
      #include <${Et>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),xo=a.forwardRef(({args:o,cellColor:e="#000000",sectionColor:r="#2080ff",cellSize:s=.5,sectionSize:n=1,followCamera:i=!1,infiniteGrid:l=!1,fadeDistance:f=100,fadeStrength:u=1,fadeFrom:c=1,cellThickness:p=.5,sectionThickness:m=1,side:v=E,...M},g)=>{Mt({GridMaterial:vo});const x=a.useRef(null);a.useImperativeHandle(g,()=>x.current,[]);const w=new Rt,h=new j(0,1,0),z=new j(0,0,0);y(S=>{w.setFromNormalAndCoplanarPoint(h,z).applyMatrix4(x.current.matrixWorld);const C=x.current.material,N=C.uniforms.worldCamProjPosition,B=C.uniforms.worldPlanePosition;w.projectPoint(S.camera.position,N.value),B.value.set(0,0,0).applyMatrix4(x.current.matrixWorld)});const d={cellSize:s,sectionSize:n,cellColor:e,sectionColor:r,cellThickness:p,sectionThickness:m},P={fadeDistance:f,fadeStrength:u,fadeFrom:c,infiniteGrid:l,followCamera:i};return a.createElement("mesh",le({ref:x,frustumCulled:!1},M),a.createElement("gridMaterial",le({transparent:!0,"extensions-derivatives":!0,side:v},d,P)),a.createElement("planeGeometry",{args:o}))}),xt=a.forwardRef(({children:o,enabled:e=!0,speed:r=1,rotationIntensity:s=1,floatIntensity:n=1,floatingRange:i=[-.1,.1],autoInvalidate:l=!1,...f},u)=>{const c=a.useRef(null);a.useImperativeHandle(u,()=>c.current,[]);const p=a.useRef(Math.random()*1e4);return y(m=>{var v,M;if(!e||r===0)return;l&&m.invalidate();const g=p.current+m.clock.getElapsedTime();c.current.rotation.x=Math.cos(g/4*r)/8*s,c.current.rotation.y=Math.sin(g/4*r)/8*s,c.current.rotation.z=Math.sin(g/4*r)/20*s;let x=Math.sin(g/4*r)/10;x=A.mapLinear(x,-.1,.1,(v=i?.[0])!==null&&v!==void 0?v:-.1,(M=i?.[1])!==null&&M!==void 0?M:.1),c.current.position.y=x*n,c.current.updateMatrix()}),a.createElement("group",f,a.createElement("group",{ref:c,matrixAutoUpdate:!1},o))}),go=({position:o})=>{const e=a.useRef();F();const[r,s]=a.useState(null);return a.useEffect(()=>{new O().load("/assets/images/digital_fire.jpg",n=>{n.colorSpace=Y,s(n)})},[]),y(n=>{if(e.current){const i=window.icebreakerThaw||0;e.current.material.opacity=i*.9;const l=1+Math.sin(n.clock.elapsedTime*5)*.1;e.current.scale.setScalar(l)}}),r?t.jsx("group",{position:o,children:t.jsx(vt,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:t.jsxs("mesh",{ref:e,position:[0,20,0],children:[t.jsx("planeGeometry",{args:[40,40]}),t.jsx("meshBasicMaterial",{map:r,transparent:!0,opacity:0,depthWrite:!1,blending:D})]})})}):null},yo=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,wo=`
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
`,jo=({position:o,angle:e,delay:r,targetCenter:s})=>{const n=a.useRef(),i=a.useRef();F();const l=a.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new T("#44aaff")},uPartyColor:{value:new T("#ff8844")}}),[]);return y(f=>{if(!n.current||!i.current)return;l.uTime.value=f.clock.elapsedTime;const u=window.icebreakerThaw||0,c=A.clamp((u-r)*2,0,1);l.uState.value=c;const p=Math.sin(f.clock.elapsedTime*8+r*10)*c;if(n.current.position.y=o[1]+(p>0?p*2:0)+15,c>0){const m=s[0]-o[0],v=s[2]-o[2],M=Math.sqrt(m*m+v*v)||1;n.current.position.x=o[0]+m/M*(c*20),n.current.position.z=o[2]+v/M*(c*20)}else n.current.position.x=o[0],n.current.position.z=o[2]}),t.jsx("group",{ref:n,position:[o[0],o[1]+15,o[2]],children:t.jsx(vt,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:t.jsxs("mesh",{children:[t.jsx("planeGeometry",{args:[20,30]}),t.jsx("shaderMaterial",{ref:i,vertexShader:yo,fragmentShader:wo,uniforms:l,transparent:!0,side:U,depthWrite:!1})]})})})},Mo=({position:o})=>{const r=a.useMemo(()=>{const s=[];for(let n=0;n<25;n++){const i=Math.random()*Math.PI*2,l=50+Math.random()*120;s.push({position:[o[0]+Math.cos(i)*l,o[1],o[2]+Math.sin(i)*l],angle:i,delay:Math.random()*.5,targetCenter:o})}return s},[25,o]);return t.jsx("group",{children:r.map((s,n)=>t.jsx(jo,{...s},n))})},Se=({appId:o,position:e})=>t.jsx("group",{position:e}),zo=({position:o})=>{const e=a.useRef(),[r,s]=a.useState(null);return F(),a.useEffect(()=>{new O().load("/icebreaker_logo.png",n=>{n.colorSpace=Y,s(n)})},[]),y(n=>{if(e.current&&(e.current.rotation.y=n.clock.elapsedTime*.5,e.current.position.y=o[1]+Math.sin(n.clock.elapsedTime*2)*5,e.current.material)){const i=window.icebreakerThaw||0;e.current.material.opacity=i*.9,e.current.scale.setScalar(.01+i)}}),r?t.jsxs("mesh",{ref:e,position:o,children:[t.jsx("planeGeometry",{args:[40,40]}),t.jsx("meshBasicMaterial",{map:r,transparent:!0,opacity:0,depthWrite:!1,blending:D,side:U})]}):null},bo=({numTrees:o=30,radius:e=50,centerZ:r=-500})=>{const s=a.useRef(),n=a.useRef();F();const i=a.useMemo(()=>new ce,[]),l=a.useMemo(()=>{const f=[];for(let u=0;u<o;u++){const c=u/o*Math.PI*2+Math.random()*.5,p=e+Math.random()*20;f.push({position:new j(Math.cos(c)*p,-18,Math.sin(c)*p+r),rotation:new Pe(0,c+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return f},[o,e,r]);return y(()=>{if(!s.current||!n.current)return;const f=window.icebreakerThaw||0;for(let u=0;u<o;u++){const c=l[u],p=Math.max(0,(f-c.delay)*2),m=A.clamp(p,0,1)*c.scale;i.position.copy(c.position),i.rotation.copy(c.rotation),i.scale.setScalar(m),i.updateMatrix(),s.current.setMatrixAt(u,i.matrix),i.position.y+=18*m,i.updateMatrix(),n.current.setMatrixAt(u,i.matrix)}s.current.instanceMatrix.needsUpdate=!0,n.current.instanceMatrix.needsUpdate=!0}),t.jsxs("group",{children:[t.jsxs("instancedMesh",{ref:s,args:[null,null,o],children:[t.jsx("cylinderGeometry",{args:[.5,1,20,8]}),t.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),t.jsxs("instancedMesh",{ref:n,args:[null,null,o],children:[t.jsx("sphereGeometry",{args:[8,4,4]}),t.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},Po=`
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
`,Co=`
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
`,So=({startZ:o,endZ:e})=>{const r=a.useRef(),s=a.useRef(),[n,i]=a.useState(null),l=Math.abs(e-o),f=(o+e)/2,u=a.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return a.useEffect(()=>{new O().load("/assets/images/ice_cavern.jpg",c=>{c.wrapS=_e,c.wrapT=_e,c.repeat.set(4,2),c.colorSpace=Y,i(c),u.tMap.value=c})},[u]),y(c=>{if(s.current){const p=window.icebreakerThaw||0;u.uThaw.value=p,u.uTime.value=c.clock.elapsedTime}}),n?t.jsxs("mesh",{ref:r,position:[0,0,f],rotation:[Math.PI/2,0,0],children:[t.jsx("cylinderGeometry",{args:[120,120,l,128,128,!0]}),t.jsx("shaderMaterial",{ref:s,vertexShader:Po,fragmentShader:Co,uniforms:u,transparent:!0,side:E})]}):null},To=({position:o})=>{const e=a.useRef();return y(r=>{if(e.current){const s=window.icebreakerThaw||0,n=A.lerp(.01,50,Math.pow(s,2));e.current.scale.setScalar(n),e.current.visible=s>0}}),t.jsxs("mesh",{ref:e,position:[o[0],o[1]+1,o[2]],rotation:[-Math.PI/2,0,0],children:[t.jsx("circleGeometry",{args:[20,64]}),t.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},_o=({position:o})=>{const e=a.useRef();return y(r=>{if(e.current){const s=window.icebreakerThaw||0;e.current.scale.setScalar(s>0?1:.001)}}),t.jsxs("mesh",{ref:e,position:[o[0],o[1]+1.5,o[2]],rotation:[-Math.PI/2,0,0],children:[t.jsx("circleGeometry",{args:[96,64]}),t.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},Ro=({position:o})=>{const e=a.useRef();return y(()=>{if(e.current){const r=window.icebreakerThaw||0;e.current.opacity=1-Math.pow(r,2),e.current.transparent=!0}}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:o,children:[t.jsx("planeGeometry",{args:[1e3,3e3]}),t.jsx("meshStandardMaterial",{ref:e,color:"#001133",roughness:.1,metalness:.8})]})},ko=({centerZ:o})=>{const e=a.useRef(),r=a.useRef(),s=a.useMemo(()=>({uColorBottom:{value:new T("#ffaa55")},uColorTop:{value:new T("#00f3ff")},uOpacity:{value:0}}),[]);return y(()=>{const n=window.icebreakerThaw||0;e.current&&(e.current.uniforms.uOpacity.value=n),r.current&&(r.current.intensity=n*.6)}),t.jsxs("group",{children:[t.jsxs("mesh",{scale:2e3,children:[t.jsx("sphereGeometry",{args:[1,32,32]}),t.jsx("shaderMaterial",{ref:e,side:E,transparent:!0,depthWrite:!1,uniforms:s,vertexShader:`
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
          `})]}),t.jsx("directionalLight",{ref:r,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),t.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},Io=()=>{const o=F(),[e,r]=a.useState(!1),[s,n]=a.useState(!1),[i,l]=a.useState(!1),f=a.useRef({triggered:!1,timer:0}),u=a.useRef({triggered:!1,timer:0});return a.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),y((c,p)=>{const m=o.offset;!u.current.triggered&&m>=.22&&(u.current.triggered=!0,l(!0),window.icebreakerCaveLocked=!0,o.el&&(o.el.style.overflow="hidden")),window.icebreakerCaveLocked&&(u.current.timer+=p,u.current.timer>1.5&&(window.icebreakerCaveLocked=!1,l(!1),o.el&&(o.el.style.overflow="auto"))),!e&&m>=.265&&window.icebreakerThaw<1&&(r(!0),window.icebreakerThawLocked=!0,o.el&&(o.el.style.overflow="hidden")),window.icebreakerThawLocked?(window.icebreakerThaw+=p*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,r(!1),o.el&&(o.el.style.overflow="auto"))):m<.2&&(window.icebreakerThaw=0),!f.current.triggered&&m>=.285&&(f.current.triggered=!0,n(!0),window.icebreakerTextLocked=!0,o.el&&(o.el.style.overflow="hidden")),window.icebreakerTextLocked&&(f.current.timer+=p,f.current.timer>1.5&&(window.icebreakerTextLocked=!1,n(!1),o.el&&(o.el.style.overflow="auto")))}),null},Lo=({position:o,rotation:e,visible:r=!0})=>t.jsxs("group",{position:o,rotation:e,visible:r,children:[t.jsx(Io,{}),t.jsx(ko,{centerZ:0}),t.jsx(So,{startZ:1e3,endZ:-1e3}),t.jsx(Ro,{position:[0,-20,0]}),t.jsx(To,{position:[0,-20,0]}),t.jsx(_o,{position:[0,-20,0]}),t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),t.jsx(go,{position:[0,-20,0]}),t.jsx(zo,{position:[0,30,0]}),t.jsx(bo,{radius:60,centerZ:0}),t.jsx(Mo,{position:[0,-20,0]}),t.jsx(Se,{appId:"icebreaker",position:[-80,20,-200]})]}),Ao=`
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
`,Eo=`
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
`,Fo=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,Go=({position:o,visible:e})=>t.jsxs("group",{visible:e,position:o,children:[t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),Uo=({position:o,visible:e})=>{const r=F(),s=a.useRef(),n=a.useRef(),i=a.useRef(),[l,f]=a.useState(null),[u,c]=a.useState(null),[p,m]=a.useState(!1),v=a.useRef({triggered:!1,timer:0});a.useEffect(()=>{window.mindwaveLocked=!1,new O().load("/mindwave-logo.png",x=>{x.colorSpace=Y,f(x)}),new O().load("/tribal-sun.png",x=>{x.colorSpace=Y,c(x)})},[]);const M=o?o[2]:0,g=a.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return y((x,w)=>{if(!e)return;const h=r.offset;!v.current.triggered&&h>=.075&&(v.current.triggered=!0,m(!0),window.mindwaveLocked=!0,r.el&&(r.el.style.overflow="hidden")),window.mindwaveLocked&&(r.el,v.current.timer+=w,v.current.timer>1.5&&(window.mindwaveLocked=!1,m(!1),r.el&&(r.el.style.overflow="auto")));const z=x.clock.elapsedTime;if(s.current){s.current.uniforms.uTime.value=z;const d=Math.abs(x.camera.position.z-M);let S=1-Math.min(d/1e3,1);S=Math.pow(S,2),s.current.uniforms.uScrollProgress.value=S}if(n.current){n.current.position.y=-7+Math.sin(z*2)*2;const d=1+Math.sin(z*4)*.05;n.current.scale.set(d,d,1),n.current.rotation.y=0}if(i.current){i.current.position.y=125+Math.sin(z*2)*2,i.current.rotation.z=z*.1;const d=1+Math.sin(z*3)*.05;i.current.scale.set(d,d,1)}}),t.jsxs("group",{visible:e,position:o,children:[t.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[t.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),t.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:Fo,side:E,depthWrite:!1})]}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[t.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),t.jsx("shaderMaterial",{ref:s,vertexShader:Ao,fragmentShader:Eo,uniforms:g,transparent:!0,side:U,wireframe:!1})]}),u&&t.jsxs("mesh",{ref:i,position:[0,-10,-85],children:[t.jsx("planeGeometry",{args:[140,140]}),t.jsx("meshBasicMaterial",{map:u,transparent:!0,side:U,depthWrite:!1,blending:D,color:"#00ffff",opacity:.6})]}),l&&t.jsxs("mesh",{ref:n,position:[0,-10,-80],children:[t.jsx("planeGeometry",{args:[80,80]}),t.jsx("meshBasicMaterial",{map:l,transparent:!0,side:U,depthWrite:!1,blending:D})]}),t.jsx(Go,{position:[0,-5,-80],visible:!0}),t.jsx(Se,{appId:"mindwave",position:[40,0,-40]})]})},je=o=>{const r=new Lt;o==="interceptor"?(r.moveTo(1*1.8,0),r.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),r.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),r.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),r.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):o==="viper"?(r.moveTo(1*1.2,1*.3),r.lineTo(1*.4,1*.4),r.lineTo(-1*.8,1*1.2),r.lineTo(-1*1.2,1*.8),r.lineTo(-1*.8,0),r.lineTo(-1*1.2,-1*.8),r.lineTo(-1*.8,-1*1.2),r.lineTo(1*.4,-1*.4),r.lineTo(1*1.2,-1*.3),r.lineTo(1*.6,0)):o==="bulwark"&&(r.moveTo(1*1.5,0),r.lineTo(1*.8,1*1.2),r.lineTo(-1*.5,1*1.5),r.lineTo(-1*1.5,1*.8),r.lineTo(-1*1.5,-1*.8),r.lineTo(-1*.5,-1*1.5),r.lineTo(1*.8,-1*1.2));const s={steps:1,depth:o==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},n=new At(r,s);return n.center(),n.rotateY(-Math.PI/2),n.rotateZ(-Math.PI/2),n},Bo=({position:o})=>{const e=a.useRef();return y((r,s)=>{e.current&&(e.current.rotation.z-=s*.1,e.current.rotation.x=Math.sin(r.clock.elapsedTime*.1)*.1)}),t.jsxs("group",{position:o,ref:e,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[t.jsxs("mesh",{children:[t.jsx("cylinderGeometry",{args:[150,150,300,32]}),t.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),t.jsxs("mesh",{children:[t.jsx("torusGeometry",{args:[400,40,32,64]}),t.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((r,s)=>t.jsxs("mesh",{position:[Math.cos(r)*200,0,Math.sin(r)*200],rotation:[0,-r,Math.PI/2],children:[t.jsx("cylinderGeometry",{args:[20,20,300,16]}),t.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},s)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((r,s)=>t.jsxs("mesh",{position:[Math.cos(r)*400,0,Math.sin(r)*400],rotation:[Math.PI/2,0,-r],children:[t.jsx("boxGeometry",{args:[60,60,90]}),t.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${s}`))]})},Wo=({position:o})=>{const e=a.useRef(),r=a.useMemo(()=>je("bulwark"),[]);return y((s,n)=>{e.current&&(e.current.position.y=Math.sin(s.clock.elapsedTime*.2)*40,e.current.rotation.y+=n*.05,e.current.rotation.z=Math.sin(s.clock.elapsedTime*.1)*.1)}),t.jsxs("group",{position:o,ref:e,scale:[120,120,120],children:[t.jsx("mesh",{geometry:r,children:t.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),t.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),t.jsxs("mesh",{position:[0,0,1.5],children:[t.jsx("sphereGeometry",{args:[.2,16,16]}),t.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},Oo=({position:o})=>{const i=a.useMemo(()=>new ce,[]),l=a.useMemo(()=>new ce,[]),f=a.useRef(),u=a.useRef(),c=a.useRef(),p=a.useRef(),m=a.useMemo(()=>je("interceptor"),[]),v=a.useMemo(()=>je("viper"),[]),M=a.useMemo(()=>{const w=new kt(.5,.5,20,4);return w.rotateX(Math.PI/2),w},[]),g=a.useMemo(()=>Array.from({length:80},(w,h)=>{const z=h>=40;return{pos:new j((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new j,target:new j,team:z?1:0,meshIndex:z?h-40:h,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),x=a.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new j,vel:new j,color:new T,life:0})),[60]);return y((w,h)=>{if(!f.current||!u.current||!c.current||!p.current)return;let z=0;g.forEach(d=>{if(d.state===0){if(Math.random()<.02||d.target.lengthSq()===0){const b=g[Math.floor(Math.random()*80)];b&&b.team!==d.team&&b.state===0?(d.target.copy(b.pos),d.target.x+=(Math.random()-.5)*200,d.target.y+=(Math.random()-.5)*200,d.target.z+=(Math.random()-.5)*200):d.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const P=new j().subVectors(d.target,d.pos),S=P.length();if(S>150&&S<800&&Math.random()<.03){const b=x.find(I=>!I.active);b&&(b.active=!0,b.pos.copy(d.pos),b.vel.copy(P).normalize().multiplyScalar(2500),b.color.set(d.team===0?"#00ffff":"#ff3300"),b.life=.8)}const C=P.normalize().multiplyScalar(400*h);d.vel.add(C),d.vel.clampLength(0,600),d.pos.addScaledVector(d.vel,h),d.trail.push(d.pos.clone()),d.trail.length>5&&d.trail.shift(),i.position.copy(d.pos);const N=i.position.clone().add(d.vel);i.lookAt(N);const B=C.clone().cross(d.vel).y;i.rotateZ(B*.01),i.scale.set(30,30,30)}else{d.explosionTimer+=h,i.position.copy(d.pos),i.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const P=30*Math.max(.1,1-d.explosionTimer*2);i.scale.set(P,P,P),d.explosionTimer>.5&&(d.state=0,d.health=100,d.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),d.vel.set(0,0,0),d.trail=[])}i.updateMatrix(),d.team===0?(f.current.setMatrixAt(d.meshIndex,i.matrix),f.current.setColorAt(d.meshIndex,d.state===0?new T("#00aaff"):new T("#ffaa00"))):(u.current.setMatrixAt(d.meshIndex,i.matrix),u.current.setColorAt(d.meshIndex,d.state===0?new T("#ff0033"):new T("#ffaa00"))),d.trail.forEach((P,S)=>{if(z<400){i.position.copy(P),i.rotation.set(0,0,0);const C=S/5*10;i.scale.set(C,C,C),i.updateMatrix(),p.current.setMatrixAt(z,i.matrix),p.current.setColorAt(z,d.team===0?new T("#00ffff"):new T("#ff5500")),z++}})});for(let d=z;d<400;d++)i.position.set(0,9999,0),i.scale.set(0,0,0),i.updateMatrix(),p.current.setMatrixAt(d,i.matrix);x.forEach((d,P)=>{d.active?(d.pos.addScaledVector(d.vel,h),d.life-=h,g.forEach(S=>{S.state===0&&d.pos.distanceTo(S.pos)<50&&(S.health-=50,d.active=!1,S.health<=0&&(S.state=1,S.explosionTimer=0))}),d.life<=0&&(d.active=!1),l.position.copy(d.pos),l.lookAt(l.position.clone().add(d.vel)),l.scale.set(1,1,1)):(l.position.set(0,9999,0),l.scale.set(0,0,0)),l.updateMatrix(),c.current.setMatrixAt(P,l.matrix),c.current.setColorAt(P,d.color)}),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),u.current.instanceMatrix.needsUpdate=!0,u.current.instanceColor&&(u.current.instanceColor.needsUpdate=!0),p.current.instanceMatrix.needsUpdate=!0,p.current.instanceColor&&(p.current.instanceColor.needsUpdate=!0),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0)}),t.jsxs("group",{position:o,children:[t.jsx("instancedMesh",{ref:f,args:[m,null,40],children:t.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),t.jsx("instancedMesh",{ref:u,args:[v,null,40],children:t.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),t.jsx("instancedMesh",{ref:c,args:[M,null,60],children:t.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:D})}),t.jsx("instancedMesh",{ref:p,args:[new It(1,4,4),null,400],children:t.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:D,depthWrite:!1})})]})},Do=({position:o,rotation:e,visible:r})=>{const s=ze(O,"/interstellar_logo_final.png");s.colorSpace=Y;const n=F(),i=a.useRef({triggered:!1});return y(()=>{n&&n.offset>=.41&&n.offset<=.43&&!i.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,i.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsx("ambientLight",{intensity:.2}),t.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),t.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),t.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),t.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[t.jsx("sphereGeometry",{args:[4e3,32,32]}),t.jsx("meshBasicMaterial",{color:"#020510",side:E})]}),t.jsx(Bo,{position:[0,-200,-800]}),t.jsx(Wo,{position:[0,-120,-100]}),t.jsx(Oo,{position:[0,-50,0]}),t.jsxs("group",{position:[0,120,200],children:[t.jsxs("mesh",{position:[0,50,0],children:[t.jsx("planeGeometry",{args:[180,180]}),t.jsx("meshBasicMaterial",{map:s,transparent:!0,depthWrite:!1})]}),t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),t.jsx(Se,{appId:"interstellar",position:[-150,100,200]})]})},Ho=({position:o})=>{const e=a.useRef(),[r,s]=a.useState(null);return a.useEffect(()=>{new O().load("/legal_eagle_logo.png",n=>{n.colorSpace=Y,s(n)})},[]),y(n=>{e.current&&(e.current.position.y=o[1]+Math.sin(n.clock.elapsedTime*1.5)*1.5)}),r?t.jsxs("group",{position:o,children:[t.jsxs("mesh",{ref:e,children:[t.jsx("planeGeometry",{args:[80,80]}),t.jsx("meshBasicMaterial",{map:r,transparent:!0,opacity:1,depthWrite:!1,side:U})]}),t.jsx("pointLight",{color:"#ffffff",intensity:2,distance:100,position:[0,0,20]})]}):null},No=()=>{const[o,e]=a.useState(null);return a.useEffect(()=>{new O().load("/legal_eagle_courtroom_bg.jpg",r=>{r.colorSpace=Y,e(r)})},[]),o?t.jsxs("mesh",{position:[0,0,-600],children:[t.jsx("planeGeometry",{args:[1600,900]}),t.jsx("meshBasicMaterial",{map:o,side:U,toneMapped:!1})]}):null},ge=({position:o,text:e,color:r})=>{const s=a.useRef();return y(n=>{s.current&&(s.current.position.y=o[1]+Math.sin(n.clock.elapsedTime*2+o[0])*2)}),t.jsxs("group",{ref:s,position:o,children:[t.jsxs(_,{fontSize:12,color:r,maxWidth:120,textAlign:"center",anchorX:"center",anchorY:"middle",children:[e,t.jsx("meshBasicMaterial",{color:r,transparent:!0,opacity:.9})]}),t.jsx("pointLight",{color:r,intensity:1,distance:100})]})},Vo=({position:o,rotation:e,visible:r})=>t.jsxs("group",{position:o,rotation:e,visible:r,children:[t.jsx("ambientLight",{intensity:.2}),t.jsx(No,{}),t.jsx(Ho,{position:[0,20,-200]}),t.jsx(ge,{position:[-140,-20,-100],text:"AI Contract\\nCreation",color:"#00ffcc"}),t.jsx(ge,{position:[140,-20,-100],text:"Intelligent\\nContract Review",color:"#ff00ff"}),t.jsx(ge,{position:[0,-50,-50],text:"Real-Time\\nEdits & Formatting",color:"#d4af37"})]}),qo=`
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
`,Yo=`
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
`,Xo=({position:o})=>{const e=a.useRef(),r=a.useRef(),s=a.useMemo(()=>({uTime:{value:0}}),[]);return y((n,i)=>{r.current&&(r.current.uniforms.uTime.value=n.clock.elapsedTime),e.current&&(e.current.rotation.y+=i*.2,e.current.rotation.z-=i*.1)}),t.jsxs("group",{position:o,children:[t.jsxs("mesh",{ref:e,children:[t.jsx("sphereGeometry",{args:[180,128,128]}),t.jsx("shaderMaterial",{ref:r,vertexShader:qo,fragmentShader:Yo,uniforms:s,transparent:!0,wireframe:!1})]}),t.jsxs("mesh",{scale:1.2,children:[t.jsx("sphereGeometry",{args:[180,64,64]}),t.jsx("meshBasicMaterial",{color:"#00ffff",wireframe:!0,transparent:!0,opacity:.03})]}),t.jsx("pointLight",{intensity:8,color:"#00ffff",distance:1500}),t.jsx("pointLight",{intensity:3,color:"#0055ff",distance:800,position:[0,-200,0]})]})},Zo=()=>{const o=a.useRef(),e=600,r=1e3,s=a.useMemo(()=>{const u=[];for(let c=0;c<5;c++){const p=c%2===0?1:-1,m=c*200-400,v=new mt([new j(m,-1e3,1e3),new j(m+300*p,200,200),new j(0,-200,-800),new j(m-300*p,-500,-1500),new j(m,1e3,-2500)]);u.push({points:v.getSpacedPoints(r)})}return u},[]),n=a.useMemo(()=>new ce,[]),i=a.useMemo(()=>new j,[]),l=a.useMemo(()=>new j,[]),f=a.useMemo(()=>{const u=[];for(let c=0;c<e;c++)u.push({curveIndex:c%s.length,progress:Math.random(),speed:.001+Math.random()*.003,offset:new j((Math.random()-.5)*40,(Math.random()-.5)*40,(Math.random()-.5)*40),scale:.2+Math.random()*.8});return u},[e,s.length]);return y(()=>{o.current&&(f.forEach((u,c)=>{u.progress+=u.speed,u.progress>=1&&(u.progress=0);const p=s[u.curveIndex],m=u.progress*r,v=Math.floor(m),M=Math.min(v+1,r),g=m-v,x=p.points[v],w=p.points[M];if(!x||!w)return;i.lerpVectors(x,w,g).add(u.offset),n.position.copy(i),n.scale.setScalar(u.scale);const h=Math.floor(Math.min((u.progress+.01)*r,r)),z=Math.min(h+1,r),d=p.points[h],P=p.points[z];d&&P&&(l.lerpVectors(d,P,g).add(u.offset),n.lookAt(l)),n.updateMatrix(),o.current.setMatrixAt(c,n.matrix)}),o.current.instanceMatrix.needsUpdate=!0)}),t.jsxs("instancedMesh",{ref:o,args:[null,null,e],children:[t.jsx("boxGeometry",{args:[4,4,30]}),t.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,blending:D})]})},Qo=({position:o})=>{const e=a.useRef();return y((r,s)=>{e.current&&(e.current.children[0].rotation.z+=s*.1,e.current.children[1].rotation.z-=s*.15,e.current.children[2].rotation.z+=s*.05)}),t.jsxs("group",{position:o,ref:e,children:[t.jsxs("mesh",{children:[t.jsx("ringGeometry",{args:[300,302,64]}),t.jsx("meshBasicMaterial",{color:"#0088ff",transparent:!0,opacity:.4,side:U})]}),t.jsxs("mesh",{children:[t.jsx("ringGeometry",{args:[320,330,64,1,0,Math.PI*1.5]}),t.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,side:U})]}),t.jsxs("mesh",{children:[t.jsx("ringGeometry",{args:[350,351,64,1,0,Math.PI]}),t.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.2,side:U})]})]})},$o=({position:o,rotation:e,visible:r})=>{const s=F(),[n,i]=a.useState(!1);return y(()=>{r&&(s.offset>.675&&s.offset<.69&&!n&&!window.autopilotLocked&&(window.autopilotLocked=!0,i(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(s.offset<.65||s.offset>.7)&&n&&(i(!1),window.autopilotLocked=!1))}),t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsx("ambientLight",{intensity:.2}),t.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[t.jsx("sphereGeometry",{args:[4e3,32,32]}),t.jsx("meshBasicMaterial",{color:"#010204",side:E})]}),t.jsx(xo,{position:[0,-800,-800],args:[4e3,4e3],cellSize:100,cellThickness:1,cellColor:"#004455",sectionSize:500,sectionThickness:1.5,sectionColor:"#00aaff",fadeDistance:2e3,fadeStrength:1}),t.jsx(Xo,{position:[0,-200,-800]}),t.jsx(Qo,{position:[0,-200,-800]}),t.jsx(Zo,{}),t.jsx(pe,{count:2e3,scale:3e3,size:15,speed:.1,opacity:.2,color:"#00ffff",position:[0,0,-800]}),t.jsx("group",{position:[0,300,-600],children:t.jsxs(xt,{speed:2,rotationIntensity:.05,floatIntensity:.5,children:[t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:70,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:1,outlineColor:"#00ffff",children:"AUTOPILOT"}),t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-120,0],fontSize:28,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"Autonomous Business Agent"})]})})]})},Ko=({position:o})=>{const e=a.useRef(),r=a.useMemo(()=>({uTime:{value:0},uColor:{value:new T("#00ffff")}}),[]);return y(s=>{e.current&&(e.current.uniforms.uTime.value=s.clock.elapsedTime)}),t.jsxs("mesh",{position:o,children:[t.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),t.jsx("shaderMaterial",{ref:e,transparent:!0,side:U,blending:D,depthWrite:!1,uniforms:r,vertexShader:`
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
        `})]})},Jo=()=>{const o=a.useRef(),e=a.useMemo(()=>({uTime:{value:0},uColor:{value:new T("#0044ff")},uHighlight:{value:new T("#00ffff")}}),[]);return y(r=>{o.current&&(o.current.uniforms.uTime.value=r.clock.elapsedTime)}),t.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[t.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),t.jsx("shaderMaterial",{ref:o,transparent:!0,wireframe:!0,uniforms:e,vertexShader:`
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
        `})]})},er=({position:o,rotation:e,visible:r})=>{const[s,n]=a.useState(null);return a.useEffect(()=>{new O().load("/cloveh2o_logo.png",l=>{l.colorSpace=Y,n(l)})},[]),t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsxs("mesh",{children:[t.jsx("sphereGeometry",{args:[4e3,32,32]}),t.jsx("meshBasicMaterial",{color:"#000511",side:E})]}),t.jsx(Jo,{}),t.jsx(Ko,{position:[0,1800,-800]}),t.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),t.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),t.jsxs("group",{position:[0,0,-300],children:[s&&t.jsxs("mesh",{position:[0,80,0],children:[t.jsx("planeGeometry",{args:[200,200]}),t.jsx("meshBasicMaterial",{map:s,transparent:!0,depthWrite:!1,blending:D})]}),t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),t.jsx(_,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},me=({color:o,number:e,groupRef:r,armRef:s})=>t.jsxs("group",{ref:r,children:[t.jsxs("mesh",{position:[0,10,0],children:[t.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),t.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.3,roughness:.4})]}),t.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[t.jsx("sphereGeometry",{args:[2.5,16,16]}),t.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),t.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[t.jsx("sphereGeometry",{args:[2.5,16,16]}),t.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.5,roughness:.3})]}),t.jsxs("group",{position:[0,17,0],children:[t.jsxs("mesh",{children:[t.jsx("sphereGeometry",{args:[2.8,32,32]}),t.jsx("meshStandardMaterial",{color:o,emissive:o,emissiveIntensity:.8,metalness:.5})]}),t.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[t.jsx("boxGeometry",{args:[3.5,2,2]}),t.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),t.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:t.jsxs("mesh",{position:[0,-3.5,0],children:[t.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),t.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),t.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:s,children:t.jsxs("mesh",{position:[0,-3.5,0],children:[t.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),t.jsx("meshStandardMaterial",{color:o,roughness:.6})]})}),t.jsxs("mesh",{position:[-1.8,3,0],children:[t.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),t.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),t.jsxs("mesh",{position:[1.8,3,0],children:[t.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),t.jsx("meshStandardMaterial",{color:o,roughness:.8})]}),e&&t.jsx(_,{position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:e})]}),tr=({position:o})=>{const e=a.useRef(),r=a.useRef(),s=a.useRef(),n=a.useRef(),i=a.useRef(),l=a.useRef(),f=a.useMemo(()=>new j(100,0,0),[]),u=a.useMemo(()=>new j(100,0,20),[]),c=a.useMemo(()=>new j(30,0,100),[]),p=a.useMemo(()=>new j(0,0,-20),[]),m=a.useMemo(()=>new j(20,0,220),[]),v=a.useMemo(()=>new j,[]),M=a.useMemo(()=>new j,[]);return a.useMemo(()=>new j,[]),y(g=>{const x=g.clock.elapsedTime%6;if(s.current&&s.current.rotation.set(0,0,-.3),x<.5)r.current&&r.current.position.copy(f),n.current&&n.current.position.copy(u),i.current&&i.current.position.copy(c),e.current&&e.current.position.copy(p),l.current&&l.current.position.copy(p).add(v.set(4.5,12,2));else if(x<4){const w=(x-.5)/3.5;if(r.current&&(w<.5?r.current.position.lerpVectors(f,v.set(100,0,110),w*2):r.current.position.lerpVectors(M.set(100,0,110),m,(w-.5)*2)),n.current&&r.current&&n.current.position.lerpVectors(u,v.set(m.x+8,0,m.z-8),w),i.current&&i.current.position.lerpVectors(c,v.set(m.x-8,0,m.z+8),w),l.current)if(x<1.5)l.current.position.copy(p).add(v.set(4.5,12,2));else{const h=(x-1.5)/2.5,z=Math.sin(h*Math.PI)*45;l.current.position.lerpVectors(p,m,h),l.current.position.y+=z+18}}else if(x<5)r.current&&r.current.position.lerpVectors(m,v.set(20,0,240),x-4),l.current&&r.current&&l.current.position.copy(r.current.position).add(v.set(0,12,3)),n.current&&(n.current.position.y=0),i.current&&(i.current.position.y=0);else if(x<5.5)s.current&&s.current.rotation.set(Math.PI,0,0),l.current&&r.current&&l.current.position.copy(r.current.position).add(v.set(4.5,20,0));else if(s.current&&s.current.rotation.set(-Math.PI/4,0,0),l.current&&r.current){const w=x-5.5,h=Math.abs(Math.cos(w*8))*10;l.current.position.copy(r.current.position).add(v.set(4.5,h,4))}}),t.jsxs("group",{position:o,children:[t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[t.jsx("planeGeometry",{args:[400,400]}),t.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),t.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[t.jsx("planeGeometry",{args:[400,40]}),t.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),t.jsx(me,{color:"#0088ff",number:"QB",groupRef:e}),t.jsx(me,{color:"#00ffff",number:"80",groupRef:r,armRef:s}),t.jsx(me,{color:"#ff0044",number:"CB",groupRef:n}),t.jsx(me,{color:"#ff0044",number:"S",groupRef:i}),t.jsxs("mesh",{ref:l,children:[t.jsx("sphereGeometry",{args:[2,16,16]}),t.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},or=()=>t.jsxs("group",{position:[0,300,-300],rotation:[.1,0,0],children:[t.jsxs("mesh",{position:[0,0,0],children:[t.jsx("boxGeometry",{args:[800,300,20]}),t.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),t.jsxs("mesh",{position:[0,0,10.1],children:[t.jsx("planeGeometry",{args:[790,290]}),t.jsx("meshBasicMaterial",{color:"#001100"})]}),t.jsxs("mesh",{position:[-580,0,150],rotation:[0,Math.PI/6,0],children:[t.jsx("boxGeometry",{args:[400,300,20]}),t.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),t.jsxs("mesh",{position:[-571,0,155],rotation:[0,Math.PI/6,0],children:[t.jsx("planeGeometry",{args:[390,290]}),t.jsx("meshBasicMaterial",{color:"#001100"})]}),t.jsxs("mesh",{position:[580,0,150],rotation:[0,-Math.PI/6,0],children:[t.jsx("boxGeometry",{args:[400,300,20]}),t.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.1})]}),t.jsxs("mesh",{position:[571,0,155],rotation:[0,-Math.PI/6,0],children:[t.jsx("planeGeometry",{args:[390,290]}),t.jsx("meshBasicMaterial",{color:"#001100"})]}),t.jsxs("mesh",{position:[-390,150,0],children:[t.jsx("boxGeometry",{args:[20,20,20]}),t.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),t.jsxs("mesh",{position:[390,150,0],children:[t.jsx("boxGeometry",{args:[20,20,20]}),t.jsx("meshStandardMaterial",{color:"#222",metalness:1,roughness:.3})]}),t.jsx("gridHelper",{args:[800,80,"#00ff00","#004400"],position:[0,0,11],rotation:[Math.PI/2,0,0]}),t.jsx(_,{position:[0,80,15],fontSize:70,color:"#ffffff",outlineWidth:.02,outlineColor:"#00ff00",anchorX:"center",anchorY:"middle",children:"FANTASY QUANT"}),t.jsxs(_,{position:[0,0,15],fontSize:35,color:"#00ffff",outlineWidth:.01,outlineColor:"#0088ff",anchorX:"center",anchorY:"middle",children:["PREDICTING: 42 YD PASS ","->"," TOUCHDOWN"]}),t.jsx(_,{position:[0,-60,15],fontSize:22,color:"#ffffff",maxWidth:750,textAlign:"center",lineHeight:1.5,anchorX:"center",anchorY:"middle",children:'"This is going to Rice, WR #80, post route contested catch in traffic over the safety and cornerback... TOUCHDOWN!!"'}),t.jsx(_,{position:[-580,40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"WIN PROB: 94%"}),t.jsx(_,{position:[-580,-40,165],rotation:[0,Math.PI/6,0],fontSize:32,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"EXPECTED PTS: +6.0"}),t.jsx(_,{position:[580,40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"DEF COVERAGE: COVER 2"}),t.jsx(_,{position:[580,-40,165],rotation:[0,-Math.PI/6,0],fontSize:28,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"MISMATCH DETECTED"})]}),rr=({position:o,rotation:e,visible:r})=>t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsxs("mesh",{children:[t.jsx("sphereGeometry",{args:[3e3,32,32]}),t.jsx("meshBasicMaterial",{color:"#000205",side:E})]}),t.jsx(tr,{position:[0,-200,100]}),t.jsx("ambientLight",{intensity:.5,color:"#00ff00"}),t.jsx("pointLight",{color:"#00ff00",intensity:3,distance:2e3,position:[0,500,500]}),t.jsx("pointLight",{color:"#0088ff",intensity:2,distance:2e3,position:[0,500,-500]}),t.jsx(or,{})]}),nr=({position:o,rotation:e,visible:r})=>{const s=a.useRef(),n=a.useRef(),i=ze(O,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return y(l=>{s.current&&(s.current.position.y=Math.sin(l.clock.elapsedTime*1.5)*5),n.current&&(n.current.rotation.y+=.005,n.current.rotation.z+=.002)}),t.jsxs("group",{visible:r,position:o,rotation:e,children:[t.jsxs("mesh",{children:[t.jsx("sphereGeometry",{args:[1500,32,32]}),t.jsx("meshBasicMaterial",{color:"#020510",side:E})]}),t.jsxs("group",{children:[t.jsx(xt,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:t.jsxs("mesh",{ref:s,position:[0,0,-500],children:[t.jsx("planeGeometry",{args:[400,100]})," ",t.jsx("meshBasicMaterial",{map:i,transparent:!0,opacity:1,side:U,depthWrite:!1})]})}),t.jsx(pe,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),t.jsx(pe,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),t.jsx("ambientLight",{intensity:.5,color:"#002244"}),t.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},sr=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ar=`
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
`,ir=({startZ:o=10,endZ:e=-500,visible:r=!0})=>{const s=a.useRef(),n=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);y(l=>{s.current&&r&&(s.current.uniforms.uTime.value=l.clock.elapsedTime,s.current.uniforms.uOpacity.value=A.lerp(s.current.uniforms.uOpacity.value,r?1:0,.05))});const i=a.useMemo(()=>{const l=[],u=o-e;for(let c=0;c<=100;c++){const p=o-c/100*u;l.push(new j(Math.sin(c*.1)*2,Math.cos(c*.05)*2,p))}return new mt(l)},[o,e]);return t.jsxs("mesh",{visible:r,children:[t.jsx("tubeGeometry",{args:[i,200,15,32,!1]}),t.jsx("shaderMaterial",{ref:s,vertexShader:sr,fragmentShader:ar,uniforms:n,side:E,transparent:!0,blending:D})]})},lr=`
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
`,cr=`
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
`,fr=({position:o,rotation:e=[0,0,0],length:r=4e3,visible:s=!0})=>{const n=a.useRef(),i=a.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:r}}),[r]);return y(l=>{n.current&&(n.current.uniforms.uTime.value=l.clock.elapsedTime,n.current.uniforms.uOpacity.value=s?1:0)}),t.jsx("group",{position:o,rotation:e,visible:s,children:t.jsxs("mesh",{children:[t.jsx("cylinderGeometry",{args:[60,400,r+200,32,64,!0]}),t.jsx("shaderMaterial",{ref:n,vertexShader:lr,fragmentShader:cr,uniforms:i,transparent:!0,side:E,wireframe:!1})]})})},ae=({position:o,rotation:e,length:r=4e3,radius:s=200,color:n="#ffffff",speed:i=20,visible:l=!0})=>{const f=a.useRef(),u=a.useMemo(()=>({uTime:{value:0},uColor:{value:new T(n)}}),[n]);return y(c=>{f.current&&(f.current.uniforms.uTime.value=c.clock.elapsedTime)}),t.jsxs("mesh",{visible:l,position:o,rotation:e,children:[t.jsx("cylinderGeometry",{args:[s,s,r,32,1,!0]}),t.jsx("shaderMaterial",{ref:f,transparent:!0,side:E,blending:D,depthWrite:!1,uniforms:u,vertexShader:`
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
        `})]})},ur=()=>{const o=[],e=(r,s,n)=>{o.push({x:r,y:s,z:0,rot:[Math.PI/2,0,0],color:n,bodyHeight:40+Math.random()*40})};for(let r=Math.PI*.25;r<Math.PI*1.75;r+=.2)e(-100+Math.cos(r)*80,Math.sin(r)*80,"#00ff00");for(let r=0;r<Math.PI*2;r+=.2)e(100+Math.cos(r)*80,Math.sin(r)*80,"#ff0044");return e(140,-40,"#ff0044"),e(160,-60,"#ff0044"),e(180,-80,"#ff0044"),o},dr=({position:o,rotation:e=[0,0,0],length:r=6e3,radius:s=250,visible:n})=>{const i=a.useRef(),l=a.useRef(),f=a.useRef(),u=ze(O,"/assets/images/contango_logo.png"),c=a.useMemo(()=>{const m=[],v=Math.floor(r/5);for(let g=0;g<v;g++){const x=-(g/v)*r,w=g*.1,h=Math.cos(w)*s,z=Math.sin(w)*s,d=Math.cos(w+Math.PI)*s,P=Math.sin(w+Math.PI)*s,C=Math.random()>.5?"#00ff00":"#ff0044",N=20+Math.random()*60,B=[0,0,w+Math.PI/2],b=[0,0,w+Math.PI+Math.PI/2];m.push({x:h,y:z,z:x,rot:B,color:C,bodyHeight:N}),m.push({x:d,y:P,z:x,rot:b,color:C,bodyHeight:N})}return ur().forEach(g=>{m.push({x:g.x,y:g.y,z:-r-500,rot:g.rot,color:g.color,bodyHeight:g.bodyHeight})}),m},[r,s]),p=c.length;return a.useEffect(()=>{if(!l.current||!f.current)return;const m=new ce,v=new T;for(let M=0;M<p;M++){const g=c[M];m.position.set(g.x,g.y,g.z),m.rotation.set(g.rot[0],g.rot[1],g.rot[2]),m.scale.set(1,g.bodyHeight+40,1),m.updateMatrix(),l.current.setMatrixAt(M,m.matrix),v.set(g.color),l.current.setColorAt(M,v),m.scale.set(1,g.bodyHeight,1),m.updateMatrix(),f.current.setMatrixAt(M,m.matrix),f.current.setColorAt(M,v)}l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0)},[c,p]),y(m=>{i.current&&n&&(i.current.rotation.z=m.clock.elapsedTime*.5)}),t.jsxs("group",{position:o,rotation:e,visible:n,children:[t.jsxs("group",{ref:i,children:[t.jsxs("instancedMesh",{ref:l,args:[null,null,p],children:[t.jsx("cylinderGeometry",{args:[2,2,1,8]}),t.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),t.jsxs("instancedMesh",{ref:f,args:[null,null,p],children:[t.jsx("boxGeometry",{args:[10,1,10]}),t.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),t.jsxs("mesh",{position:[0,0,-r-500],children:[t.jsx("planeGeometry",{args:[200,200]}),t.jsx("meshBasicMaterial",{map:u,transparent:!0})]}),t.jsxs("mesh",{position:[0,0,-r/2],rotation:[Math.PI/2,0,0],children:[t.jsx("cylinderGeometry",{args:[s*.8,s*.8,r,32,1,!0]}),t.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:E})]})]})},H=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1950,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-1950,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3750,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7250,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7250,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.57,x:0,y:-3980,z:-12250,rx:0,ry:0},{p:.59,x:0,y:-3980,z:-13250,rx:0,ry:0},{p:.63,x:0,y:-3980,z:-13250,rx:0,ry:0},{p:.65,x:0,y:-3980,z:-14250,rx:0,ry:0},{p:.67,x:0,y:-3980,z:-15250,rx:0,ry:0},{p:.69,x:0,y:-3980,z:-16250,rx:0,ry:0},{p:.73,x:0,y:-3980,z:-16250,rx:0,ry:0},{p:.75,x:0,y:-3980,z:-17250,rx:0,ry:0},{p:.77,x:0,y:-3980,z:-18250,rx:0,ry:0},{p:.79,x:0,y:-3980,z:-19250,rx:0,ry:0},{p:.83,x:0,y:-3980,z:-19250,rx:0,ry:0},{p:.85,x:0,y:-3980,z:-20250,rx:0,ry:0},{p:.87,x:0,y:-3980,z:-21250,rx:0,ry:0},{p:.93,x:0,y:-3980,z:-26250,rx:0,ry:0},{p:.95,x:0,y:-3980,z:-27250,rx:0,ry:0},{p:.97,x:0,y:-3980,z:-27750,rx:0,ry:0},{p:1,x:0,y:-3980,z:-27750,rx:0,ry:0}],mr=o=>{if(o<=H[0].p)return H[0];if(o>=H[H.length-1].p)return H[H.length-1];for(let e=0;e<H.length-1;e++){const r=H[e],s=H[e+1];if(o>=r.p&&o<=s.p){const n=(o-r.p)/(s.p-r.p);return{x:A.lerp(r.x,s.x,n),y:A.lerp(r.y,s.y,n),z:A.lerp(r.z,s.z,n),rx:A.lerp(r.rx,s.rx,n),ry:A.lerp(r.ry,s.ry,n)}}}return H[0]},pr=()=>{const o=F(),e=a.useRef();return y(r=>{const s=o.offset,n=mr(s);r.camera.position.x=A.lerp(r.camera.position.x,n.x,.2),r.camera.position.y=A.lerp(r.camera.position.y,n.y,.2),r.camera.position.z=A.lerp(r.camera.position.z,n.z,.2);const i=new Z().setFromEuler(new Pe(n.rx,n.ry,0));r.camera.quaternion.slerp(i,.15);const l=o.delta*10;r.camera.rotateZ(A.lerp(0,l*2,.2)),e.current&&e.current.position.copy(r.camera.position)}),t.jsxs("group",{children:[t.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),t.jsx("pointLight",{ref:e,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),t.jsx("ambientLight",{intensity:.2})]})},hr=()=>{const o=F(),[e,r]=a.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_auto:!1,auto:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,sentaient:!1}),s=a.useRef(e);return y(()=>{const n=o.offset,i={intro:n<.08,mindwave:n>.04&&n<.18,wormhole_ice:n>.1&&n<.25,icebreaker:n>.18&&n<.35,wormhole_sound:n>.28&&n<.42,interstellar:n>.35&&n<.48,w_legal:n>.43&&n<.54,legal:n>.45&&n<.58,w_auto:n>.53&&n<.65,auto:n>.56&&n<.68,w_clove:n>.63&&n<.75,clove:n>.66&&n<.78,w_fantasy:n>.73&&n<.85,fantasy:n>.76&&n<.88,w_contango:n>.83&&n<.96,sentaient:n>.9};let l=!1;for(const f in i)s.current[f]!==i[f]&&(l=!0);l&&(s.current=i,r(i))}),t.jsxs("group",{children:[t.jsx(ir,{startZ:10,endZ:-250,visible:e.intro}),t.jsx(Uo,{position:[0,0,-1350],visible:e.mindwave}),t.jsx(fr,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:e.wormhole_ice}),t.jsx(Lo,{position:[0,-4e3,-2250],visible:e.icebreaker}),t.jsx(ae,{position:[0,-4e3,-5e3],rotation:[Math.PI/2,0,0],length:3500,color:"#ff00ff",speed:20,visible:e.wormhole_sound}),t.jsx(Do,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:e.interstellar}),t.jsx(ae,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:e.w_legal}),t.jsx(Vo,{position:[0,-4e3,-10250],rotation:[0,0,0],visible:e.legal}),t.jsx(ae,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffcc",visible:e.w_auto}),t.jsx($o,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:e.auto}),t.jsx(ae,{position:[0,-4e3,-14750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffff",speed:40,visible:e.w_clove}),t.jsx(er,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:e.clove}),t.jsx(ae,{position:[0,-4e3,-17750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ff00",visible:e.w_fantasy}),t.jsx(rr,{position:[0,-4e3,-19550],rotation:[0,0,0],visible:e.fantasy}),t.jsx(dr,{position:[0,-4e3,-23250],length:6e3,visible:e.w_contango}),t.jsx(nr,{position:[0,-4e3,-28050],rotation:[0,0,0],visible:e.sentaient})]})},vr=()=>{const o=F(),e=a.useRef(),r=a.useRef();return a.useRef(),a.useRef(),a.useRef(),y(()=>{const s=o.offset;if(e.current){const n=s<.03?1:0;e.current.style.opacity=n}if(r.current){const n=s>.2&&s<.28?1:0;r.current.style.opacity=n}}),t.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[t.jsxs("div",{ref:e,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[t.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),t.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),t.jsxs("div",{ref:r,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[t.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[t.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:t.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),t.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),t.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),t.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},xr=()=>t.jsxs(zt,{gl:{antialias:!1,alpha:!0},children:[t.jsxs(uo,{pages:10,damping:.2,distance:1.2,children:[t.jsxs(yt.Suspense,{fallback:null,children:[t.jsx(pr,{}),t.jsx(hr,{})]}),t.jsx(pe,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),t.jsx(ho,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:t.jsx(vr,{})})]}),t.jsxs(Pt,{disableNormalPass:!0,children:[t.jsx(Ct,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),t.jsx(St,{opacity:.05}),t.jsx(Tt,{eskil:!1,offset:.1,darkness:1.1})]})]}),Tr=()=>t.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[t.jsxs(wt,{children:[t.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),t.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),t.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),t.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:t.jsx(jt,{})}),t.jsx("div",{className:"absolute inset-0 z-0",children:t.jsx(xr,{})})]});export{Tr as default};
//# sourceMappingURL=index-D_-imkwP.js.map
