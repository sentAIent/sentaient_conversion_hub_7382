import{r as _,_ as zt,g as Fa,j as d,R as ia,H as La}from"./vendor--do4CMJV.js";import{H as Pa}from"./Header-CWnLzfok.js";import{W as mt,X as ye,Q as Ct,p as Dr,J as Da,Y as et,f as Re,h as kn,a3 as fr,a1 as Se,$ as to,R as Ia,k as sa,F as gn,l as yn,m as Dt,_ as za,b as Ir,G as Cn,x as Oa,V as xn,U as ro,q as zr,L as Ba,M as Xe,t as Ga,s as Na,u as Wa,w as Va,j as Ha,r as Xa,B as We,D as Je,T as Ya,n as no,o as Za,P as ur,c as qa,I as Qa,a0 as Ja,K as tt,S as it,A as Ye,v as cr,O as Ot,a2 as Bt,d as la,g as Ka,H as $a,y as ei,i as ti,z as Lr,e as ri,C as ni,E as oi,a as ai,N as ii,Z as si}from"./Vignette-Bk9NDrda.js";import"./main-C9jesjOK.js";import"./preload-helper-BxaVoaJg.js";function ir(l,r,s){return r in l?Object.defineProperty(l,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):l[r]=s,l}function wn(l,r){(r==null||r>l.length)&&(r=l.length);for(var s=0,f=new Array(r);s<r;s++)f[s]=l[s];return f}function li(l,r){if(l){if(typeof l=="string")return wn(l,r);var s=Object.prototype.toString.call(l).slice(8,-1);if(s==="Object"&&l.constructor&&(s=l.constructor.name),s==="Map"||s==="Set")return Array.from(l);if(s==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return wn(l,r)}}function ci(l){if(Array.isArray(l))return wn(l)}function fi(l){if(typeof Symbol<"u"&&l[Symbol.iterator]!=null||l["@@iterator"]!=null)return Array.from(l)}function ui(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function di(l){return ci(l)||fi(l)||li(l)||ui()}new mt;new mt;function hi(l,r,s){return Math.max(r,Math.min(s,l))}function pi(l,r){return hi(l-Math.floor(l/r)*r,0,r)}function vi(l,r){var s=pi(r-l,Math.PI*2);return s>Math.PI&&(s-=Math.PI*2),s}function ca(l,r){if(!(l instanceof r))throw new TypeError("Cannot call a class as a function")}var $e=function l(r,s,f){var t=this;ca(this,l),ir(this,"dot2",function(e,n){return t.x*e+t.y*n}),ir(this,"dot3",function(e,n,a){return t.x*e+t.y*n+t.z*a}),this.x=r,this.y=s,this.z=f},mi=[new $e(1,1,0),new $e(-1,1,0),new $e(1,-1,0),new $e(-1,-1,0),new $e(1,0,1),new $e(-1,0,1),new $e(1,0,-1),new $e(-1,0,-1),new $e(0,1,1),new $e(0,-1,1),new $e(0,1,-1),new $e(0,-1,-1)],oo=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],ao=new Array(512),io=new Array(512),gi=function(r){r>0&&r<1&&(r*=65536),r=Math.floor(r),r<256&&(r|=r<<8);for(var s=0;s<256;s++){var f;s&1?f=oo[s]^r&255:f=oo[s]^r>>8&255,ao[s]=ao[s+256]=f,io[s]=io[s+256]=mi[f%12]}};gi(0);function yi(l){if(typeof l=="number")l=Math.abs(l);else if(typeof l=="string"){var r=l;l=0;for(var s=0;s<r.length;s++)l=(l+(s+1)*(r.charCodeAt(s)%96))%2147483647}return l===0&&(l=311),l}function so(l){var r=yi(l);return function(){var s=r*48271%2147483647;return r=s,s/2147483647}}var xi=function l(r){var s=this;ca(this,l),ir(this,"seed",0),ir(this,"init",function(f){s.seed=f,s.value=so(f)}),ir(this,"value",so(this.seed)),this.init(r)};new xi(Math.random());var wi=function(r){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return f/Math.atan(1/s)*Math.atan(Math.sin(2*Math.PI*r*t)/s)},fa=function(r){return 1/(1+r+.48*r*r+.235*r*r*r)},bi=function(r){return r},Si={in:function(r){return 1-Math.cos(r*Math.PI/2)},out:function(r){return Math.sin(r*Math.PI/2)},inOut:function(r){return-(Math.cos(Math.PI*r)-1)/2}},_i={in:function(r){return r*r*r},out:function(r){return 1-Math.pow(1-r,3)},inOut:function(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}},Mi={in:function(r){return r*r*r*r*r},out:function(r){return 1-Math.pow(1-r,5)},inOut:function(r){return r<.5?16*r*r*r*r*r:1-Math.pow(-2*r+2,5)/2}},Ti={in:function(r){return 1-Math.sqrt(1-Math.pow(r,2))},out:function(r){return Math.sqrt(1-Math.pow(r-1,2))},inOut:function(r){return r<.5?(1-Math.sqrt(1-Math.pow(2*r,2)))/2:(Math.sqrt(1-Math.pow(-2*r+2,2))+1)/2}},Ui={in:function(r){return r*r*r*r},out:function(r){return 1- --r*r*r*r},inOut:function(r){return r<.5?8*r*r*r*r:1-8*--r*r*r*r}},ki={in:function(r){return r===0?0:Math.pow(2,10*r-10)},out:function(r){return r===1?1:1-Math.pow(2,-10*r)},inOut:function(r){return r===0?0:r===1?1:r<.5?Math.pow(2,20*r-10)/2:(2-Math.pow(2,-20*r+10))/2}};function Ie(l,r,s){var f=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,t=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,e=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,n=arguments.length>6&&arguments[6]!==void 0?arguments[6]:fa,a=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,o="velocity_"+r;if(l.__damp===void 0&&(l.__damp={}),l.__damp[o]===void 0&&(l.__damp[o]=0),Math.abs(l[r]-s)<=a)return l[r]=s,!1;f=Math.max(1e-4,f);var i=2/f,c=n(i*t),u=l[r]-s,h=s,p=e*f;u=Math.min(Math.max(u,-p),p),s=l[r]-u;var m=(l.__damp[o]+i*u)*t;l.__damp[o]=(l.__damp[o]-i*m)*c;var g=s+(u+m)*c;return h-l[r]>0==g>h&&(g=h,l.__damp[o]=(g-h)/t),l[r]=g,!0}var Ci=function(r){return r&&r.isCamera},Ai=function(r){return r&&r.isLight},Kt=new ye,lo=new Ct,co=new Ct,$t=new Dr,ln=new ye;function Ei(l,r,s,f,t,e,n){typeof r=="number"?Kt.setScalar(r):Array.isArray(r)?Kt.set(r[0],r[1],r[2]):Kt.copy(r);var a=l.parent;l.updateWorldMatrix(!0,!1),ln.setFromMatrixPosition(l.matrixWorld),Ci(l)||Ai(l)?$t.lookAt(ln,Kt,l.up):$t.lookAt(Kt,ln,l.up),Pr(l.quaternion,co.setFromRotationMatrix($t),s,f,t,e,n),a&&($t.extractRotation(a.matrixWorld),lo.setFromRotationMatrix($t),Pr(l.quaternion,co.copy(l.quaternion).premultiply(lo.invert()),s,f,t,e,n))}function It(l,r,s,f,t,e,n,a){return Ie(l,r,l[r]+vi(l[r],s),f,t,e,n,a)}var er=new mt,fo,uo;function Ri(l,r,s,f,t,e,n){return typeof r=="number"?er.setScalar(r):Array.isArray(r)?er.set(r[0],r[1]):er.copy(r),fo=Ie(l,"x",er.x,s,f,t,e,n),uo=Ie(l,"y",er.y,s,f,t,e,n),fo||uo}var Ft=new ye,ho,po,vo;function bn(l,r,s,f,t,e,n){return typeof r=="number"?Ft.setScalar(r):Array.isArray(r)?Ft.set(r[0],r[1],r[2]):Ft.copy(r),ho=Ie(l,"x",Ft.x,s,f,t,e,n),po=Ie(l,"y",Ft.y,s,f,t,e,n),vo=Ie(l,"z",Ft.z,s,f,t,e,n),ho||po||vo}var Mt=new et,mo,go,yo,xo;function ji(l,r,s,f,t,e,n){return typeof r=="number"?Mt.setScalar(r):Array.isArray(r)?Mt.set(r[0],r[1],r[2],r[3]):Mt.copy(r),mo=Ie(l,"x",Mt.x,s,f,t,e,n),go=Ie(l,"y",Mt.y,s,f,t,e,n),yo=Ie(l,"z",Mt.z,s,f,t,e,n),xo=Ie(l,"w",Mt.w,s,f,t,e,n),mo||go||yo||xo}var tr=new kn,wo,bo,So;function Fi(l,r,s,f,t,e,n){return Array.isArray(r)?tr.set(r[0],r[1],r[2],r[3]):tr.copy(r),wo=It(l,"x",tr.x,s,f,t,e,n),bo=It(l,"y",tr.y,s,f,t,e,n),So=It(l,"z",tr.z,s,f,t,e,n),wo||bo||So}var Lt=new Re,_o,Mo,To;function Li(l,r,s,f,t,e,n){return r instanceof Re?Lt.copy(r):Array.isArray(r)?Lt.setRGB(r[0],r[1],r[2]):Lt.set(r),_o=Ie(l,"r",Lt.r,s,f,t,e,n),Mo=Ie(l,"g",Lt.g,s,f,t,e,n),To=Ie(l,"b",Lt.b,s,f,t,e,n),_o||Mo||To}var at=new Ct,vt=new et,Uo=new et,rr=new et,ko,Co,Ao,Eo;function Pr(l,r,s,f,t,e,n){var a=l;Array.isArray(r)?at.set(r[0],r[1],r[2],r[3]):at.copy(r);var o=l.dot(at)>0?1:-1;return at.x*=o,at.y*=o,at.z*=o,at.w*=o,ko=Ie(l,"x",at.x,s,f,t,e,n),Co=Ie(l,"y",at.y,s,f,t,e,n),Ao=Ie(l,"z",at.z,s,f,t,e,n),Eo=Ie(l,"w",at.w,s,f,t,e,n),vt.set(l.x,l.y,l.z,l.w).normalize(),Uo.set(a.__damp.velocity_x,a.__damp.velocity_y,a.__damp.velocity_z,a.__damp.velocity_w),rr.copy(vt).multiplyScalar(Uo.dot(vt)/vt.dot(vt)),a.__damp.velocity_x-=rr.x,a.__damp.velocity_y-=rr.y,a.__damp.velocity_z-=rr.z,a.__damp.velocity_w-=rr.w,l.set(vt.x,vt.y,vt.z,vt.w),ko||Co||Ao||Eo}var nr=new Da,Ro,jo,Fo;function Pi(l,r,s,f,t,e,n){return Array.isArray(r)?nr.set(r[0],r[1],r[2]):nr.copy(r),Ro=Ie(l,"radius",nr.radius,s,f,t,e,n),jo=It(l,"phi",nr.phi,s,f,t,e,n),Fo=It(l,"theta",nr.theta,s,f,t,e,n),Ro||jo||Fo}var Tr=new Dr,Lo=new ye,Po=new Ct,Do=new ye,Io,zo,Oo;function Di(l,r,s,f,t,e,n){var a=l;return a.__damp===void 0&&(a.__damp={position:new ye,rotation:new Ct,scale:new ye},l.decompose(a.__damp.position,a.__damp.rotation,a.__damp.scale)),Array.isArray(r)?Tr.set.apply(Tr,di(r)):Tr.copy(r),Tr.decompose(Lo,Po,Do),Io=bn(a.__damp.position,Lo,s,f,t,e,n),zo=Pr(a.__damp.rotation,Po,s,f,t,e,n),Oo=bn(a.__damp.scale,Do,s,f,t,e,n),l.compose(a.__damp.position,a.__damp.rotation,a.__damp.scale),Io||zo||Oo}var Bo=Object.freeze({__proto__:null,rsqw:wi,exp:fa,linear:bi,sine:Si,cubic:_i,quint:Mi,circ:Ti,quart:Ui,expo:ki,damp:Ie,dampLookAt:Ei,dampAngle:It,damp2:Ri,damp3:bn,damp4:ji,dampE:Fi,dampC:Li,dampQ:Pr,dampS:Pi,dampM:Di});const An=_.createContext(null);function st(){return _.useContext(An)}function Ii({eps:l=1e-5,enabled:r=!0,infinite:s,horizontal:f,pages:t=1,distance:e=1,damping:n=.25,maxSpeed:a=1/0,prepend:o=!1,style:i={},children:c}){const{get:u,setEvents:h,gl:p,size:m,invalidate:g,events:y}=fr(),[S]=_.useState(()=>document.createElement("div")),[M]=_.useState(()=>document.createElement("div")),[v]=_.useState(()=>document.createElement("div")),b=p.domElement.parentNode,T=_.useRef(0),R=_.useMemo(()=>({el:S,eps:l,fill:M,fixed:v,horizontal:f,damping:n,offset:0,delta:0,scroll:T,pages:t,range(F,L,H=0){const w=F-H,P=w+L+H*2;return this.offset<w?0:this.offset>P?1:(this.offset-w)/(P-w)},curve(F,L,H=0){return Math.sin(this.range(F,L,H)*Math.PI)},visible(F,L,H=0){const w=F-H,P=w+L+H*2;return this.offset>=w&&this.offset<=P}}),[l,n,f,t]);_.useEffect(()=>{S.style.position="absolute",S.style.width="100%",S.style.height="100%",S.style[f?"overflowX":"overflowY"]="auto",S.style[f?"overflowY":"overflowX"]="hidden",S.style.top="0px",S.style.left="0px";for(const L in i)S.style[L]=i[L];v.style.position="sticky",v.style.top="0px",v.style.left="0px",v.style.width="100%",v.style.height="100%",v.style.overflow="hidden",S.appendChild(v),M.style.height=f?"100%":`${t*e*100}%`,M.style.width=f?`${t*e*100}%`:"100%",M.style.pointerEvents="none",S.appendChild(M),o?b.prepend(S):b.appendChild(S),S[f?"scrollLeft":"scrollTop"]=1;const C=y.connected||p.domElement;requestAnimationFrame(()=>y.connect==null?void 0:y.connect(S));const F=u().events.compute;return h({compute(L,H){const{left:w,top:P}=b.getBoundingClientRect(),j=L.clientX-w,Y=L.clientY-P;H.pointer.set(j/H.size.width*2-1,-(Y/H.size.height)*2+1),H.raycaster.setFromCamera(H.pointer,H.camera)}}),()=>{b.removeChild(S),h({compute:F}),y.connect==null||y.connect(C)}},[t,e,f,S,M,v,b]),_.useEffect(()=>{if(y.connected===S){const C=m[f?"width":"height"],F=S[f?"scrollWidth":"scrollHeight"],L=F-C;let H=0,w=!0,P=!0;const j=()=>{if(!(!r||P)&&(g(),H=S[f?"scrollLeft":"scrollTop"],T.current=H/L,s)){if(!w){if(H>=L){const N=1-R.offset;S[f?"scrollLeft":"scrollTop"]=1,T.current=R.offset=-N,w=!0}else if(H<=0){const N=1+R.offset;S[f?"scrollLeft":"scrollTop"]=F,T.current=R.offset=N,w=!0}}w&&setTimeout(()=>w=!1,40)}};S.addEventListener("scroll",j,{passive:!0}),requestAnimationFrame(()=>P=!1);const Y=N=>S.scrollLeft+=N.deltaY/2;return f&&S.addEventListener("wheel",Y,{passive:!0}),()=>{S.removeEventListener("scroll",j),f&&S.removeEventListener("wheel",Y)}}},[S,y,m,s,R,g,f,r]);let k=0;return Se((C,F)=>{k=R.offset,Bo.damp(R,"offset",T.current,n,F,a,void 0,l),Bo.damp(R,"delta",Math.abs(k-R.offset),n,F,a,void 0,l),R.delta>l&&g()}),_.createElement(An.Provider,{value:R},c)}const zi=_.forwardRef(({children:l},r)=>{const s=_.useRef(null);_.useImperativeHandle(r,()=>s.current,[]);const f=st(),{width:t,height:e}=fr(n=>n.viewport);return Se(()=>{s.current.position.x=f.horizontal?-t*(f.pages-1)*f.offset:0,s.current.position.y=f.horizontal?0:e*(f.pages-1)*f.offset}),_.createElement("group",{ref:s},l)}),Oi=_.forwardRef(({children:l,style:r,...s},f)=>{const t=st(),e=_.useRef(null);_.useImperativeHandle(f,()=>e.current,[]);const{width:n,height:a}=fr(c=>c.size),o=_.useContext(to),i=_.useMemo(()=>Fa(t.fixed),[t.fixed]);return Se(()=>{t.delta>t.eps&&(e.current.style.transform=`translate3d(${t.horizontal?-n*(t.pages-1)*t.offset:0}px,${t.horizontal?0:a*(t.pages-1)*-t.offset}px,0)`)}),i.render(_.createElement("div",zt({ref:e,style:{...r,position:"absolute",top:0,left:0,willChange:"transform"}},s),_.createElement(An.Provider,{value:t},_.createElement(to.Provider,{value:o},l)))),null}),Bi=_.forwardRef(({html:l,...r},s)=>{const f=l?Oi:zi;return _.createElement(f,zt({ref:s},r))}),ua=parseInt(Ia.replace(/\D+/g,"")),da=ua>=125?"uv1":"uv2",Go=new Ir,Ur=new ye;class En extends sa{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const r=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],s=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],f=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(f),this.setAttribute("position",new gn(r,3)),this.setAttribute("uv",new gn(s,2))}applyMatrix4(r){const s=this.attributes.instanceStart,f=this.attributes.instanceEnd;return s!==void 0&&(s.applyMatrix4(r),f.applyMatrix4(r),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(r){let s;r instanceof Float32Array?s=r:Array.isArray(r)&&(s=new Float32Array(r));const f=new yn(s,6,1);return this.setAttribute("instanceStart",new Dt(f,3,0)),this.setAttribute("instanceEnd",new Dt(f,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(r,s=3){let f;r instanceof Float32Array?f=r:Array.isArray(r)&&(f=new Float32Array(r));const t=new yn(f,s*2,1);return this.setAttribute("instanceColorStart",new Dt(t,s,0)),this.setAttribute("instanceColorEnd",new Dt(t,s,s)),this}fromWireframeGeometry(r){return this.setPositions(r.attributes.position.array),this}fromEdgesGeometry(r){return this.setPositions(r.attributes.position.array),this}fromMesh(r){return this.fromWireframeGeometry(new za(r.geometry)),this}fromLineSegments(r){const s=r.geometry;return this.setPositions(s.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ir);const r=this.attributes.instanceStart,s=this.attributes.instanceEnd;r!==void 0&&s!==void 0&&(this.boundingBox.setFromBufferAttribute(r),Go.setFromBufferAttribute(s),this.boundingBox.union(Go))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cn),this.boundingBox===null&&this.computeBoundingBox();const r=this.attributes.instanceStart,s=this.attributes.instanceEnd;if(r!==void 0&&s!==void 0){const f=this.boundingSphere.center;this.boundingBox.getCenter(f);let t=0;for(let e=0,n=r.count;e<n;e++)Ur.fromBufferAttribute(r,e),t=Math.max(t,f.distanceToSquared(Ur)),Ur.fromBufferAttribute(s,e),t=Math.max(t,f.distanceToSquared(Ur));this.boundingSphere.radius=Math.sqrt(t),isNaN(this.boundingSphere.radius)}}toJSON(){}applyMatrix(r){return this.applyMatrix4(r)}}class ha extends En{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(r){const s=r.length-3,f=new Float32Array(2*s);for(let t=0;t<s;t+=3)f[2*t]=r[t],f[2*t+1]=r[t+1],f[2*t+2]=r[t+2],f[2*t+3]=r[t+3],f[2*t+4]=r[t+4],f[2*t+5]=r[t+5];return super.setPositions(f),this}setColors(r,s=3){const f=r.length-s,t=new Float32Array(2*f);if(s===3)for(let e=0;e<f;e+=s)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5];else for(let e=0;e<f;e+=s)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5],t[2*e+6]=r[e+6],t[2*e+7]=r[e+7];return super.setColors(t,s),this}fromLine(r){const s=r.geometry;return this.setPositions(s.attributes.position.array),this}}class Rn extends Oa{constructor(r){super({type:"LineMaterial",uniforms:xn.clone(xn.merge([ro.common,ro.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new mt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${ua>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(s){this.uniforms.diffuse.value=s}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(s){s===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(s){this.uniforms.linewidth.value=s}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(s){!!s!="USE_DASH"in this.defines&&(this.needsUpdate=!0),s===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(s){this.uniforms.dashScale.value=s}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(s){this.uniforms.dashSize.value=s}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(s){this.uniforms.dashOffset.value=s}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(s){this.uniforms.gapSize.value=s}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(s){this.uniforms.opacity.value=s}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(s){this.uniforms.resolution.value.copy(s)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(s){!!s!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),s===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(r)}}const cn=new et,No=new ye,Wo=new ye,ze=new et,Oe=new et,ct=new et,fn=new ye,un=new Dr,Ge=new Ba,Vo=new ye,kr=new Ir,Cr=new Cn,ft=new et;let dt,Ut;function Ho(l,r,s){return ft.set(0,0,-r,1).applyMatrix4(l.projectionMatrix),ft.multiplyScalar(1/ft.w),ft.x=Ut/s.width,ft.y=Ut/s.height,ft.applyMatrix4(l.projectionMatrixInverse),ft.multiplyScalar(1/ft.w),Math.abs(Math.max(ft.x,ft.y))}function Gi(l,r){const s=l.matrixWorld,f=l.geometry,t=f.attributes.instanceStart,e=f.attributes.instanceEnd,n=Math.min(f.instanceCount,t.count);for(let a=0,o=n;a<o;a++){Ge.start.fromBufferAttribute(t,a),Ge.end.fromBufferAttribute(e,a),Ge.applyMatrix4(s);const i=new ye,c=new ye;dt.distanceSqToSegment(Ge.start,Ge.end,c,i),c.distanceTo(i)<Ut*.5&&r.push({point:c,pointOnLine:i,distance:dt.origin.distanceTo(c),object:l,face:null,faceIndex:a,uv:null,[da]:null})}}function Ni(l,r,s){const f=r.projectionMatrix,e=l.material.resolution,n=l.matrixWorld,a=l.geometry,o=a.attributes.instanceStart,i=a.attributes.instanceEnd,c=Math.min(a.instanceCount,o.count),u=-r.near;dt.at(1,ct),ct.w=1,ct.applyMatrix4(r.matrixWorldInverse),ct.applyMatrix4(f),ct.multiplyScalar(1/ct.w),ct.x*=e.x/2,ct.y*=e.y/2,ct.z=0,fn.copy(ct),un.multiplyMatrices(r.matrixWorldInverse,n);for(let h=0,p=c;h<p;h++){if(ze.fromBufferAttribute(o,h),Oe.fromBufferAttribute(i,h),ze.w=1,Oe.w=1,ze.applyMatrix4(un),Oe.applyMatrix4(un),ze.z>u&&Oe.z>u)continue;if(ze.z>u){const v=ze.z-Oe.z,b=(ze.z-u)/v;ze.lerp(Oe,b)}else if(Oe.z>u){const v=Oe.z-ze.z,b=(Oe.z-u)/v;Oe.lerp(ze,b)}ze.applyMatrix4(f),Oe.applyMatrix4(f),ze.multiplyScalar(1/ze.w),Oe.multiplyScalar(1/Oe.w),ze.x*=e.x/2,ze.y*=e.y/2,Oe.x*=e.x/2,Oe.y*=e.y/2,Ge.start.copy(ze),Ge.start.z=0,Ge.end.copy(Oe),Ge.end.z=0;const g=Ge.closestPointToPointParameter(fn,!0);Ge.at(g,Vo);const y=Xe.lerp(ze.z,Oe.z,g),S=y>=-1&&y<=1,M=fn.distanceTo(Vo)<Ut*.5;if(S&&M){Ge.start.fromBufferAttribute(o,h),Ge.end.fromBufferAttribute(i,h),Ge.start.applyMatrix4(n),Ge.end.applyMatrix4(n);const v=new ye,b=new ye;dt.distanceSqToSegment(Ge.start,Ge.end,b,v),s.push({point:b,pointOnLine:v,distance:dt.origin.distanceTo(b),object:l,face:null,faceIndex:h,uv:null,[da]:null})}}}class pa extends zr{constructor(r=new En,s=new Rn({color:Math.random()*16777215})){super(r,s),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const r=this.geometry,s=r.attributes.instanceStart,f=r.attributes.instanceEnd,t=new Float32Array(2*s.count);for(let n=0,a=0,o=s.count;n<o;n++,a+=2)No.fromBufferAttribute(s,n),Wo.fromBufferAttribute(f,n),t[a]=a===0?0:t[a-1],t[a+1]=t[a]+No.distanceTo(Wo);const e=new yn(t,2,1);return r.setAttribute("instanceDistanceStart",new Dt(e,1,0)),r.setAttribute("instanceDistanceEnd",new Dt(e,1,1)),this}raycast(r,s){const f=this.material.worldUnits,t=r.camera,e=r.params.Line2!==void 0&&r.params.Line2.threshold||0;dt=r.ray;const n=this.matrixWorld,a=this.geometry,o=this.material;Ut=o.linewidth+e,a.boundingSphere===null&&a.computeBoundingSphere(),Cr.copy(a.boundingSphere).applyMatrix4(n);let i;if(f)i=Ut*.5;else{const u=Math.max(t.near,Cr.distanceToPoint(dt.origin));i=Ho(t,u,o.resolution)}if(Cr.radius+=i,dt.intersectsSphere(Cr)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),kr.copy(a.boundingBox).applyMatrix4(n);let c;if(f)c=Ut*.5;else{const u=Math.max(t.near,kr.distanceToPoint(dt.origin));c=Ho(t,u,o.resolution)}kr.expandByScalar(c),dt.intersectsBox(kr)!==!1&&(f?Gi(this,s):Ni(this,t,s))}onBeforeRender(r){const s=this.material.uniforms;s&&s.resolution&&(r.getViewport(cn),this.material.uniforms.resolution.value.set(cn.z,cn.w))}}class Wi extends pa{constructor(r=new ha,s=new Rn({color:Math.random()*16777215})){super(r,s),this.isLine2=!0,this.type="Line2"}}const va=_.forwardRef(function({children:r,follow:s=!0,lockX:f=!1,lockY:t=!1,lockZ:e=!1,...n},a){const o=_.useRef(null),i=_.useRef(null),c=new Ct;return Se(({camera:u})=>{if(!s||!i.current)return;const h=i.current.rotation.clone();i.current.updateMatrix(),i.current.updateWorldMatrix(!1,!1),i.current.getWorldQuaternion(c),u.getWorldQuaternion(o.current.quaternion).premultiply(c.invert()),f&&(i.current.rotation.x=h.x),t&&(i.current.rotation.y=h.y),e&&(i.current.rotation.z=h.z)}),_.useImperativeHandle(a,()=>i.current,[]),_.createElement("group",zt({ref:i},n),_.createElement("group",{ref:o},r))}),Vi=_.forwardRef(function({points:r,color:s=16777215,vertexColors:f,linewidth:t,lineWidth:e,segments:n,dashed:a,...o},i){var c,u;const h=fr(S=>S.size),p=_.useMemo(()=>n?new pa:new Wi,[n]),[m]=_.useState(()=>new Rn),g=(f==null||(c=f[0])==null?void 0:c.length)===4?4:3,y=_.useMemo(()=>{const S=n?new En:new ha,M=r.map(v=>{const b=Array.isArray(v);return v instanceof ye||v instanceof et?[v.x,v.y,v.z]:v instanceof mt?[v.x,v.y,0]:b&&v.length===3?[v[0],v[1],v[2]]:b&&v.length===2?[v[0],v[1],0]:v});if(S.setPositions(M.flat()),f){s=16777215;const v=f.map(b=>b instanceof Re?b.toArray():b);S.setColors(v.flat(),g)}return S},[r,n,f,g]);return _.useLayoutEffect(()=>{p.computeLineDistances()},[r,p]),_.useLayoutEffect(()=>{a?m.defines.USE_DASH="":delete m.defines.USE_DASH,m.needsUpdate=!0},[a,m]),_.useEffect(()=>()=>{y.dispose(),m.dispose()},[y]),_.createElement("primitive",zt({object:p,ref:i},o),_.createElement("primitive",{object:y,attach:"geometry"}),_.createElement("primitive",zt({object:m,attach:"material",color:s,vertexColors:!!f,resolution:[h.width,h.height],linewidth:(u=t??e)!==null&&u!==void 0?u:1,dashed:a,transparent:g===4},o)))});function Hi(){var l=Object.create(null);function r(t,e){var n=t.id,a=t.name,o=t.dependencies;o===void 0&&(o=[]);var i=t.init;i===void 0&&(i=function(){});var c=t.getTransferables;if(c===void 0&&(c=null),!l[n])try{o=o.map(function(h){return h&&h.isWorkerModule&&(r(h,function(p){if(p instanceof Error)throw p}),h=l[h.id].value),h}),i=f("<"+a+">.init",i),c&&(c=f("<"+a+">.getTransferables",c));var u=null;typeof i=="function"&&(u=i.apply(void 0,o)),l[n]={id:n,value:u,getTransferables:c},e(u)}catch(h){h&&h.noLog,e(h)}}function s(t,e){var n,a=t.id,o=t.args;(!l[a]||typeof l[a].value!="function")&&e(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var i=(n=l[a]).value.apply(n,o);i&&typeof i.then=="function"?i.then(c,function(u){return e(u instanceof Error?u:new Error(""+u))}):c(i)}catch(u){e(u)}function c(u){try{var h=l[a].getTransferables&&l[a].getTransferables(u);(!h||!Array.isArray(h)||!h.length)&&(h=void 0),e(u,h)}catch(p){e(p)}}}function f(t,e){var n=void 0;self.troikaDefine=function(o){return n=o};var a=URL.createObjectURL(new Blob(["/** "+t.replace(/\*/g,"")+` **/

troikaDefine(
`+e+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch{}return URL.revokeObjectURL(a),delete self.troikaDefine,n}self.addEventListener("message",function(t){var e=t.data,n=e.messageId,a=e.action,o=e.data;try{a==="registerModule"&&r(o,function(i){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:{isCallable:typeof i=="function"}})}),a==="callModule"&&s(o,function(i,c){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:i},c||void 0)})}catch(i){postMessage({messageId:n,success:!1,error:i.stack})}})}function Xi(l){var r=function(){for(var s=[],f=arguments.length;f--;)s[f]=arguments[f];return r._getInitResult().then(function(t){if(typeof t=="function")return t.apply(void 0,s);throw new Error("Worker module function was called but `init` did not return a callable function")})};return r._getInitResult=function(){var s=l.dependencies,f=l.init;s=Array.isArray(s)?s.map(function(e){return e&&e._getInitResult?e._getInitResult():e}):[];var t=Promise.all(s).then(function(e){return f.apply(null,e)});return r._getInitResult=function(){return t},t},r}var ma=function(){var l=!1;if(typeof window<"u"&&typeof window.document<"u")try{var r=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));r.terminate(),l=!0}catch{}return ma=function(){return l},l},Yi=0,Zi=0,dn=!1,sr=Object.create(null),lr=Object.create(null),Sn=Object.create(null);function Gt(l){if((!l||typeof l.init!="function")&&!dn)throw new Error("requires `options.init` function");var r=l.dependencies,s=l.init,f=l.getTransferables,t=l.workerId;if(!ma())return Xi(l);t==null&&(t="#default");var e="workerModule"+ ++Yi,n=l.name||e,a=null;r=r&&r.map(function(i){return typeof i=="function"&&!i.workerModuleData&&(dn=!0,i=Gt({workerId:t,name:"<"+n+"> function dependency: "+i.name,init:`function(){return (
`+jr(i)+`
)}`}),dn=!1),i&&i.workerModuleData&&(i=i.workerModuleData),i});function o(){for(var i=[],c=arguments.length;c--;)i[c]=arguments[c];if(!a){a=Xo(t,"registerModule",o.workerModuleData);var u=function(){a=null,lr[t].delete(u)};(lr[t]||(lr[t]=new Set)).add(u)}return a.then(function(h){var p=h.isCallable;if(p)return Xo(t,"callModule",{id:e,args:i});throw new Error("Worker module function was called but `init` did not return a callable function")})}return o.workerModuleData={isWorkerModule:!0,id:e,name:n,dependencies:r,init:jr(s),getTransferables:f&&jr(f)},o}function qi(l){lr[l]&&lr[l].forEach(function(r){r()}),sr[l]&&(sr[l].terminate(),delete sr[l])}function jr(l){var r=l.toString();return!/^function/.test(r)&&/^\w+\s*\(/.test(r)&&(r="function "+r),r}function Qi(l){var r=sr[l];if(!r){var s=jr(Hi);r=sr[l]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+l.replace(/\*/g,"")+` **/

;(`+s+")()"],{type:"application/javascript"}))),r.onmessage=function(f){var t=f.data,e=t.messageId,n=Sn[e];if(!n)throw new Error("WorkerModule response with empty or unknown messageId");delete Sn[e],n(t)}}return r}function Xo(l,r,s){return new Promise(function(f,t){var e=++Zi;Sn[e]=function(n){n.success?f(n.result):t(new Error("Error in worker "+r+" call: "+n.error))},Qi(l).postMessage({messageId:e,action:r,data:s})})}function ga(){var l=function(r){function s(G,z,x,U,A,D,E,W){var I=1-E;W.x=I*I*G+2*I*E*x+E*E*A,W.y=I*I*z+2*I*E*U+E*E*D}function f(G,z,x,U,A,D,E,W,I,B){var Q=1-I;B.x=Q*Q*Q*G+3*Q*Q*I*x+3*Q*I*I*A+I*I*I*E,B.y=Q*Q*Q*z+3*Q*Q*I*U+3*Q*I*I*D+I*I*I*W}function t(G,z){for(var x=/([MLQCZ])([^MLQCZ]*)/g,U,A,D,E,W;U=x.exec(G);){var I=U[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(B){return parseFloat(B)});switch(U[1]){case"M":E=A=I[0],W=D=I[1];break;case"L":(I[0]!==E||I[1]!==W)&&z("L",E,W,E=I[0],W=I[1]);break;case"Q":{z("Q",E,W,E=I[2],W=I[3],I[0],I[1]);break}case"C":{z("C",E,W,E=I[4],W=I[5],I[0],I[1],I[2],I[3]);break}case"Z":(E!==A||W!==D)&&z("L",E,W,A,D);break}}}function e(G,z,x){x===void 0&&(x=16);var U={x:0,y:0};t(G,function(A,D,E,W,I,B,Q,te,Z){switch(A){case"L":z(D,E,W,I);break;case"Q":{for(var V=D,ge=E,de=1;de<x;de++)s(D,E,B,Q,W,I,de/(x-1),U),z(V,ge,U.x,U.y),V=U.x,ge=U.y;break}case"C":{for(var $=D,re=E,ce=1;ce<x;ce++)f(D,E,B,Q,te,Z,W,I,ce/(x-1),U),z($,re,U.x,U.y),$=U.x,re=U.y;break}}})}var n="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",o=new WeakMap,i={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function c(G,z){var x=G.getContext?G.getContext("webgl",i):G,U=o.get(x);if(!U){let Q=function($){var re=D[$];if(!re&&(re=D[$]=x.getExtension($),!re))throw new Error($+" not supported");return re},te=function($,re){var ce=x.createShader(re);return x.shaderSource(ce,$),x.compileShader(ce),ce},Z=function($,re,ce,X){if(!E[$]){var ne={},ee={},O=x.createProgram();x.attachShader(O,te(re,x.VERTEX_SHADER)),x.attachShader(O,te(ce,x.FRAGMENT_SHADER)),x.linkProgram(O),E[$]={program:O,transaction:function(K){x.useProgram(O),K({setUniform:function(q,_e){for(var oe=[],se=arguments.length-2;se-- >0;)oe[se]=arguments[se+2];var ue=ee[_e]||(ee[_e]=x.getUniformLocation(O,_e));x["uniform"+q].apply(x,[ue].concat(oe))},setAttribute:function(q,_e,oe,se,ue){var ve=ne[q];ve||(ve=ne[q]={buf:x.createBuffer(),loc:x.getAttribLocation(O,q),data:null}),x.bindBuffer(x.ARRAY_BUFFER,ve.buf),x.vertexAttribPointer(ve.loc,_e,x.FLOAT,!1,0,0),x.enableVertexAttribArray(ve.loc),A?x.vertexAttribDivisor(ve.loc,se):Q("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(ve.loc,se),ue!==ve.data&&(x.bufferData(x.ARRAY_BUFFER,ue,oe),ve.data=ue)}})}}}E[$].transaction(X)},V=function($,re){I++;try{x.activeTexture(x.TEXTURE0+I);var ce=W[$];ce||(ce=W[$]=x.createTexture(),x.bindTexture(x.TEXTURE_2D,ce),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_MIN_FILTER,x.NEAREST),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_MAG_FILTER,x.NEAREST)),x.bindTexture(x.TEXTURE_2D,ce),re(ce,I)}finally{I--}},ge=function($,re,ce){var X=x.createFramebuffer();B.push(X),x.bindFramebuffer(x.FRAMEBUFFER,X),x.activeTexture(x.TEXTURE0+re),x.bindTexture(x.TEXTURE_2D,$),x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,$,0);try{ce(X)}finally{x.deleteFramebuffer(X),x.bindFramebuffer(x.FRAMEBUFFER,B[--B.length-1]||null)}},de=function(){D={},E={},W={},I=-1,B.length=0};var A=typeof WebGL2RenderingContext<"u"&&x instanceof WebGL2RenderingContext,D={},E={},W={},I=-1,B=[];x.canvas.addEventListener("webglcontextlost",function($){de(),$.preventDefault()},!1),o.set(x,U={gl:x,isWebGL2:A,getExtension:Q,withProgram:Z,withTexture:V,withTextureFramebuffer:ge,handleContextLoss:de})}z(U)}function u(G,z,x,U,A,D,E,W){E===void 0&&(E=15),W===void 0&&(W=null),c(G,function(I){var B=I.gl,Q=I.withProgram,te=I.withTexture;te("copy",function(Z,V){B.texImage2D(B.TEXTURE_2D,0,B.RGBA,A,D,0,B.RGBA,B.UNSIGNED_BYTE,z),Q("copy",n,a,function(ge){var de=ge.setUniform,$=ge.setAttribute;$("aUV",2,B.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),de("1i","image",V),B.bindFramebuffer(B.FRAMEBUFFER,W||null),B.disable(B.BLEND),B.colorMask(E&8,E&4,E&2,E&1),B.viewport(x,U,A,D),B.scissor(x,U,A,D),B.drawArrays(B.TRIANGLES,0,3)})})})}function h(G,z,x){var U=G.width,A=G.height;c(G,function(D){var E=D.gl,W=new Uint8Array(U*A*4);E.readPixels(0,0,U,A,E.RGBA,E.UNSIGNED_BYTE,W),G.width=z,G.height=x,u(E,W,0,0,U,A)})}var p=Object.freeze({__proto__:null,withWebGLContext:c,renderImageData:u,resizeWebGLCanvasWithoutClearing:h});function m(G,z,x,U,A,D){D===void 0&&(D=1);var E=new Uint8Array(G*z),W=U[2]-U[0],I=U[3]-U[1],B=[];e(x,function($,re,ce,X){B.push({x1:$,y1:re,x2:ce,y2:X,minX:Math.min($,ce),minY:Math.min(re,X),maxX:Math.max($,ce),maxY:Math.max(re,X)})}),B.sort(function($,re){return $.maxX-re.maxX});for(var Q=0;Q<G;Q++)for(var te=0;te<z;te++){var Z=ge(U[0]+W*(Q+.5)/G,U[1]+I*(te+.5)/z),V=Math.pow(1-Math.abs(Z)/A,D)/2;Z<0&&(V=1-V),V=Math.max(0,Math.min(255,Math.round(V*255))),E[te*G+Q]=V}return E;function ge($,re){for(var ce=1/0,X=1/0,ne=B.length;ne--;){var ee=B[ne];if(ee.maxX+X<=$)break;if($+X>ee.minX&&re-X<ee.maxY&&re+X>ee.minY){var O=S($,re,ee.x1,ee.y1,ee.x2,ee.y2);O<ce&&(ce=O,X=Math.sqrt(ce))}}return de($,re)&&(X=-X),X}function de($,re){for(var ce=0,X=B.length;X--;){var ne=B[X];if(ne.maxX<=$)break;var ee=ne.y1>re!=ne.y2>re&&$<(ne.x2-ne.x1)*(re-ne.y1)/(ne.y2-ne.y1)+ne.x1;ee&&(ce+=ne.y1<ne.y2?1:-1)}return ce!==0}}function g(G,z,x,U,A,D,E,W,I,B){D===void 0&&(D=1),W===void 0&&(W=0),I===void 0&&(I=0),B===void 0&&(B=0),y(G,z,x,U,A,D,E,null,W,I,B)}function y(G,z,x,U,A,D,E,W,I,B,Q){D===void 0&&(D=1),I===void 0&&(I=0),B===void 0&&(B=0),Q===void 0&&(Q=0);for(var te=m(G,z,x,U,A,D),Z=new Uint8Array(te.length*4),V=0;V<te.length;V++)Z[V*4+Q]=te[V];u(E,Z,I,B,G,z,1<<3-Q,W)}function S(G,z,x,U,A,D){var E=A-x,W=D-U,I=E*E+W*W,B=I?Math.max(0,Math.min(1,((G-x)*E+(z-U)*W)/I)):0,Q=G-(x+B*E),te=z-(U+B*W);return Q*Q+te*te}var M=Object.freeze({__proto__:null,generate:m,generateIntoCanvas:g,generateIntoFramebuffer:y}),v="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",b="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",T="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",R=new Float32Array([0,0,2,0,0,2]),k=null,C=!1,F={},L=new WeakMap;function H(G){if(!C&&!Y(G))throw new Error("WebGL generation not supported")}function w(G,z,x,U,A,D,E){if(D===void 0&&(D=1),E===void 0&&(E=null),!E&&(E=k,!E)){var W=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!W)throw new Error("OffscreenCanvas or DOM canvas not supported");E=k=W.getContext("webgl",{depth:!1})}H(E);var I=new Uint8Array(G*z*4);c(E,function(Z){var V=Z.gl,ge=Z.withTexture,de=Z.withTextureFramebuffer;ge("readable",function($,re){V.texImage2D(V.TEXTURE_2D,0,V.RGBA,G,z,0,V.RGBA,V.UNSIGNED_BYTE,null),de($,re,function(ce){j(G,z,x,U,A,D,V,ce,0,0,0),V.readPixels(0,0,G,z,V.RGBA,V.UNSIGNED_BYTE,I)})})});for(var B=new Uint8Array(G*z),Q=0,te=0;Q<I.length;Q+=4)B[te++]=I[Q];return B}function P(G,z,x,U,A,D,E,W,I,B){D===void 0&&(D=1),W===void 0&&(W=0),I===void 0&&(I=0),B===void 0&&(B=0),j(G,z,x,U,A,D,E,null,W,I,B)}function j(G,z,x,U,A,D,E,W,I,B,Q){D===void 0&&(D=1),I===void 0&&(I=0),B===void 0&&(B=0),Q===void 0&&(Q=0),H(E);var te=[];e(x,function(Z,V,ge,de){te.push(Z,V,ge,de)}),te=new Float32Array(te),c(E,function(Z){var V=Z.gl,ge=Z.isWebGL2,de=Z.getExtension,$=Z.withProgram,re=Z.withTexture,ce=Z.withTextureFramebuffer,X=Z.handleContextLoss;if(re("rawDistances",function(ne,ee){(G!==ne._lastWidth||z!==ne._lastHeight)&&V.texImage2D(V.TEXTURE_2D,0,V.RGBA,ne._lastWidth=G,ne._lastHeight=z,0,V.RGBA,V.UNSIGNED_BYTE,null),$("main",v,b,function(O){var pe=O.setAttribute,K=O.setUniform,ie=!ge&&de("ANGLE_instanced_arrays"),q=!ge&&de("EXT_blend_minmax");pe("aUV",2,V.STATIC_DRAW,0,R),pe("aLineSegment",4,V.DYNAMIC_DRAW,1,te),K.apply(void 0,["4f","uGlyphBounds"].concat(U)),K("1f","uMaxDistance",A),K("1f","uExponent",D),ce(ne,ee,function(_e){V.enable(V.BLEND),V.colorMask(!0,!0,!0,!0),V.viewport(0,0,G,z),V.scissor(0,0,G,z),V.blendFunc(V.ONE,V.ONE),V.blendEquationSeparate(V.FUNC_ADD,ge?V.MAX:q.MAX_EXT),V.clear(V.COLOR_BUFFER_BIT),ge?V.drawArraysInstanced(V.TRIANGLES,0,3,te.length/4):ie.drawArraysInstancedANGLE(V.TRIANGLES,0,3,te.length/4)})}),$("post",n,T,function(O){O.setAttribute("aUV",2,V.STATIC_DRAW,0,R),O.setUniform("1i","tex",ee),V.bindFramebuffer(V.FRAMEBUFFER,W),V.disable(V.BLEND),V.colorMask(Q===0,Q===1,Q===2,Q===3),V.viewport(I,B,G,z),V.scissor(I,B,G,z),V.drawArrays(V.TRIANGLES,0,3)})}),V.isContextLost())throw X(),new Error("webgl context lost")})}function Y(G){var z=!G||G===k?F:G.canvas||G,x=L.get(z);if(x===void 0){C=!0;var U=null;try{var A=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],D=w(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,G);x=D&&A.length===D.length&&D.every(function(E,W){return E===A[W]}),x||(U="bad trial run results")}catch(E){x=!1,U=E.message}C=!1,L.set(z,x)}return x}var N=Object.freeze({__proto__:null,generate:w,generateIntoCanvas:P,generateIntoFramebuffer:j,isSupported:Y});function J(G,z,x,U,A,D){A===void 0&&(A=Math.max(U[2]-U[0],U[3]-U[1])/2),D===void 0&&(D=1);try{return w.apply(N,arguments)}catch{return m.apply(M,arguments)}}function ae(G,z,x,U,A,D,E,W,I,B){A===void 0&&(A=Math.max(U[2]-U[0],U[3]-U[1])/2),D===void 0&&(D=1),W===void 0&&(W=0),I===void 0&&(I=0),B===void 0&&(B=0);try{return P.apply(N,arguments)}catch{return g.apply(M,arguments)}}return r.forEachPathCommand=t,r.generate=J,r.generateIntoCanvas=ae,r.javascript=M,r.pathToLineSegments=e,r.webgl=N,r.webglUtils=p,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return l}function Ji(){var l=function(r){var s={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},f={},t={};f.L=1,t[1]="L",Object.keys(s).forEach(function(X,ne){f[X]=1<<ne+1,t[f[X]]=X}),Object.freeze(f);var e=f.LRI|f.RLI|f.FSI,n=f.L|f.R|f.AL,a=f.B|f.S|f.WS|f.ON|f.FSI|f.LRI|f.RLI|f.PDI,o=f.BN|f.RLE|f.LRE|f.RLO|f.LRO|f.PDF,i=f.S|f.WS|f.B|e|f.PDI|o,c=null;function u(){if(!c){c=new Map;var X=function(ee){if(s.hasOwnProperty(ee)){var O=0;s[ee].split(",").forEach(function(pe){var K=pe.split("+"),ie=K[0],q=K[1];ie=parseInt(ie,36),q=q?parseInt(q,36):0,c.set(O+=ie,f[ee]);for(var _e=0;_e<q;_e++)c.set(++O,f[ee])})}};for(var ne in s)X(ne)}}function h(X){return u(),c.get(X.codePointAt(0))||f.L}function p(X){return t[h(X)]}var m={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function g(X,ne){var ee=36,O=0,pe=new Map,K=ne&&new Map,ie;return X.split(",").forEach(function q(_e){if(_e.indexOf("+")!==-1)for(var oe=+_e;oe--;)q(ie);else{ie=_e;var se=_e.split(">"),ue=se[0],ve=se[1];ue=String.fromCodePoint(O+=parseInt(ue,ee)),ve=String.fromCodePoint(O+=parseInt(ve,ee)),pe.set(ue,ve),ne&&K.set(ve,ue)}}),{map:pe,reverseMap:K}}var y,S,M;function v(){if(!y){var X=g(m.pairs,!0),ne=X.map,ee=X.reverseMap;y=ne,S=ee,M=g(m.canonical,!1).map}}function b(X){return v(),y.get(X)||null}function T(X){return v(),S.get(X)||null}function R(X){return v(),M.get(X)||null}var k=f.L,C=f.R,F=f.EN,L=f.ES,H=f.ET,w=f.AN,P=f.CS,j=f.B,Y=f.S,N=f.ON,J=f.BN,ae=f.NSM,G=f.AL,z=f.LRO,x=f.RLO,U=f.LRE,A=f.RLE,D=f.PDF,E=f.LRI,W=f.RLI,I=f.FSI,B=f.PDI;function Q(X,ne){for(var ee=125,O=new Uint32Array(X.length),pe=0;pe<X.length;pe++)O[pe]=h(X[pe]);var K=new Map;function ie(qe,ot){var Qe=O[qe];O[qe]=ot,K.set(Qe,K.get(Qe)-1),Qe&a&&K.set(a,K.get(a)-1),K.set(ot,(K.get(ot)||0)+1),ot&a&&K.set(a,(K.get(a)||0)+1)}for(var q=new Uint8Array(X.length),_e=new Map,oe=[],se=null,ue=0;ue<X.length;ue++)se||oe.push(se={start:ue,end:X.length-1,level:ne==="rtl"?1:ne==="ltr"?0:$n(ue,!1)}),O[ue]&j&&(se.end=ue,se=null);for(var ve=A|U|x|z|e|B|D|j,Ue=function(qe){return qe+(qe&1?1:2)},je=function(qe){return qe+(qe&1?2:1)},xe=0;xe<oe.length;xe++){se=oe[xe];var we=[{_level:se.level,_override:0,_isolate:0}],fe=void 0,Fe=0,Ce=0,Ze=0;K.clear();for(var ke=se.start;ke<=se.end;ke++){var he=O[ke];if(fe=we[we.length-1],K.set(he,(K.get(he)||0)+1),he&a&&K.set(a,(K.get(a)||0)+1),he&ve)if(he&(A|U)){q[ke]=fe._level;var Me=(he===A?je:Ue)(fe._level);Me<=ee&&!Fe&&!Ce?we.push({_level:Me,_override:0,_isolate:0}):Fe||Ce++}else if(he&(x|z)){q[ke]=fe._level;var gt=(he===x?je:Ue)(fe._level);gt<=ee&&!Fe&&!Ce?we.push({_level:gt,_override:he&x?C:k,_isolate:0}):Fe||Ce++}else if(he&e){he&I&&(he=$n(ke+1,!0)===1?W:E),q[ke]=fe._level,fe._override&&ie(ke,fe._override);var Te=(he===W?je:Ue)(fe._level);Te<=ee&&Fe===0&&Ce===0?(Ze++,we.push({_level:Te,_override:0,_isolate:1,_isolInitIndex:ke})):Fe++}else if(he&B){if(Fe>0)Fe--;else if(Ze>0){for(Ce=0;!we[we.length-1]._isolate;)we.pop();var be=we[we.length-1]._isolInitIndex;be!=null&&(_e.set(be,ke),_e.set(ke,be)),we.pop(),Ze--}fe=we[we.length-1],q[ke]=fe._level,fe._override&&ie(ke,fe._override)}else he&D?(Fe===0&&(Ce>0?Ce--:!fe._isolate&&we.length>1&&(we.pop(),fe=we[we.length-1])),q[ke]=fe._level):he&j&&(q[ke]=se.level);else q[ke]=fe._level,fe._override&&he!==J&&ie(ke,fe._override)}for(var Le=[],Ae=null,me=se.start;me<=se.end;me++){var Ee=O[me];if(!(Ee&o)){var Ve=q[me],Ne=Ee&e,De=Ee===B;Ae&&Ve===Ae._level?(Ae._end=me,Ae._endsWithIsolInit=Ne):Le.push(Ae={_start:me,_end:me,_level:Ve,_startsWithPDI:De,_endsWithIsolInit:Ne})}}for(var rt=[],yt=0;yt<Le.length;yt++){var ht=Le[yt];if(!ht._startsWithPDI||ht._startsWithPDI&&!_e.has(ht._start)){for(var xt=[Ae=ht],St=void 0;Ae&&Ae._endsWithIsolInit&&(St=_e.get(Ae._end))!=null;)for(var pt=yt+1;pt<Le.length;pt++)if(Le[pt]._start===St){xt.push(Ae=Le[pt]);break}for(var He=[],_t=0;_t<xt.length;_t++)for(var Fn=xt[_t],Gr=Fn._start;Gr<=Fn._end;Gr++)He.push(Gr);for(var ka=q[He[0]],Ln=se.level,dr=He[0]-1;dr>=0;dr--)if(!(O[dr]&o)){Ln=q[dr];break}var Nr=He[He.length-1],Ca=q[Nr],Pn=se.level;if(!(O[Nr]&e)){for(var hr=Nr+1;hr<=se.end;hr++)if(!(O[hr]&o)){Pn=q[hr];break}}rt.push({_seqIndices:He,_sosType:Math.max(Ln,ka)%2?C:k,_eosType:Math.max(Pn,Ca)%2?C:k})}}for(var Wr=0;Wr<rt.length;Wr++){var Vr=rt[Wr],le=Vr._seqIndices,Nt=Vr._sosType,Aa=Vr._eosType,At=q[le[0]]&1?C:k;if(K.get(ae))for(var pr=0;pr<le.length;pr++){var Dn=le[pr];if(O[Dn]&ae){for(var Hr=Nt,vr=pr-1;vr>=0;vr--)if(!(O[le[vr]]&o)){Hr=O[le[vr]];break}ie(Dn,Hr&(e|B)?N:Hr)}}if(K.get(F))for(var mr=0;mr<le.length;mr++){var In=le[mr];if(O[In]&F)for(var gr=mr-1;gr>=-1;gr--){var zn=gr===-1?Nt:O[le[gr]];if(zn&n){zn===G&&ie(In,w);break}}}if(K.get(G))for(var Xr=0;Xr<le.length;Xr++){var On=le[Xr];O[On]&G&&ie(On,C)}if(K.get(L)||K.get(P))for(var Wt=1;Wt<le.length-1;Wt++){var Yr=le[Wt];if(O[Yr]&(L|P)){for(var Et=0,Zr=0,qr=Wt-1;qr>=0&&(Et=O[le[qr]],!!(Et&o));qr--);for(var Qr=Wt+1;Qr<le.length&&(Zr=O[le[Qr]],!!(Zr&o));Qr++);Et===Zr&&(O[Yr]===L?Et===F:Et&(F|w))&&ie(Yr,Et)}}if(K.get(F))for(var lt=0;lt<le.length;lt++){var Ea=le[lt];if(O[Ea]&F){for(var yr=lt-1;yr>=0&&O[le[yr]]&(H|o);yr--)ie(le[yr],F);for(lt++;lt<le.length&&O[le[lt]]&(H|o|F);lt++)O[le[lt]]!==F&&ie(le[lt],F)}}if(K.get(H)||K.get(L)||K.get(P))for(var Vt=0;Vt<le.length;Vt++){var Bn=le[Vt];if(O[Bn]&(H|L|P)){ie(Bn,N);for(var xr=Vt-1;xr>=0&&O[le[xr]]&o;xr--)ie(le[xr],N);for(var wr=Vt+1;wr<le.length&&O[le[wr]]&o;wr++)ie(le[wr],N)}}if(K.get(F))for(var Jr=0,Gn=Nt;Jr<le.length;Jr++){var Nn=le[Jr],Kr=O[Nn];Kr&F?Gn===k&&ie(Nn,k):Kr&n&&(Gn=Kr)}if(K.get(a)){var Ht=C|F|w,Wn=Ht|k,br=[];{for(var Rt=[],jt=0;jt<le.length;jt++)if(O[le[jt]]&a){var Xt=X[le[jt]],Vn=void 0;if(b(Xt)!==null)if(Rt.length<63)Rt.push({char:Xt,seqIndex:jt});else break;else if((Vn=T(Xt))!==null)for(var Yt=Rt.length-1;Yt>=0;Yt--){var $r=Rt[Yt].char;if($r===Vn||$r===T(R(Xt))||b(R($r))===Xt){br.push([Rt[Yt].seqIndex,jt]),Rt.length=Yt;break}}}br.sort(function(qe,ot){return qe[0]-ot[0]})}for(var en=0;en<br.length;en++){for(var Hn=br[en],Sr=Hn[0],tn=Hn[1],Xn=!1,nt=0,rn=Sr+1;rn<tn;rn++){var Yn=le[rn];if(O[Yn]&Wn){Xn=!0;var Zn=O[Yn]&Ht?C:k;if(Zn===At){nt=Zn;break}}}if(Xn&&!nt){nt=Nt;for(var nn=Sr-1;nn>=0;nn--){var qn=le[nn];if(O[qn]&Wn){var Qn=O[qn]&Ht?C:k;Qn!==At?nt=Qn:nt=At;break}}}if(nt){if(O[le[Sr]]=O[le[tn]]=nt,nt!==At){for(var Zt=Sr+1;Zt<le.length;Zt++)if(!(O[le[Zt]]&o)){h(X[le[Zt]])&ae&&(O[le[Zt]]=nt);break}}if(nt!==At){for(var qt=tn+1;qt<le.length;qt++)if(!(O[le[qt]]&o)){h(X[le[qt]])&ae&&(O[le[qt]]=nt);break}}}}for(var wt=0;wt<le.length;wt++)if(O[le[wt]]&a){for(var Jn=wt,on=wt,an=Nt,Qt=wt-1;Qt>=0;Qt--)if(O[le[Qt]]&o)Jn=Qt;else{an=O[le[Qt]]&Ht?C:k;break}for(var Kn=Aa,Jt=wt+1;Jt<le.length;Jt++)if(O[le[Jt]]&(a|o))on=Jt;else{Kn=O[le[Jt]]&Ht?C:k;break}for(var sn=Jn;sn<=on;sn++)O[le[sn]]=an===Kn?an:At;wt=on}}}for(var Ke=se.start;Ke<=se.end;Ke++){var Ra=q[Ke],_r=O[Ke];if(Ra&1?_r&(k|F|w)&&q[Ke]++:_r&C?q[Ke]++:_r&(w|F)&&(q[Ke]+=2),_r&o&&(q[Ke]=Ke===0?se.level:q[Ke-1]),Ke===se.end||h(X[Ke])&(Y|j))for(var Mr=Ke;Mr>=0&&h(X[Mr])&i;Mr--)q[Mr]=se.level}}return{levels:q,paragraphs:oe};function $n(qe,ot){for(var Qe=qe;Qe<X.length;Qe++){var bt=O[Qe];if(bt&(C|G))return 1;if(bt&(j|k)||ot&&bt===B)return 0;if(bt&e){var eo=ja(Qe);Qe=eo===-1?X.length:eo}}return 0}function ja(qe){for(var ot=1,Qe=qe+1;Qe<X.length;Qe++){var bt=O[Qe];if(bt&j)break;if(bt&B){if(--ot===0)return Qe}else bt&e&&ot++}return-1}}var te="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",Z;function V(){if(!Z){var X=g(te,!0),ne=X.map,ee=X.reverseMap;ee.forEach(function(O,pe){ne.set(pe,O)}),Z=ne}}function ge(X){return V(),Z.get(X)||null}function de(X,ne,ee,O){var pe=X.length;ee=Math.max(0,ee==null?0:+ee),O=Math.min(pe-1,O==null?pe-1:+O);for(var K=new Map,ie=ee;ie<=O;ie++)if(ne[ie]&1){var q=ge(X[ie]);q!==null&&K.set(ie,q)}return K}function $(X,ne,ee,O){var pe=X.length;ee=Math.max(0,ee==null?0:+ee),O=Math.min(pe-1,O==null?pe-1:+O);var K=[];return ne.paragraphs.forEach(function(ie){var q=Math.max(ee,ie.start),_e=Math.min(O,ie.end);if(q<_e){for(var oe=ne.levels.slice(q,_e+1),se=_e;se>=q&&h(X[se])&i;se--)oe[se]=ie.level;for(var ue=ie.level,ve=1/0,Ue=0;Ue<oe.length;Ue++){var je=oe[Ue];je>ue&&(ue=je),je<ve&&(ve=je|1)}for(var xe=ue;xe>=ve;xe--)for(var we=0;we<oe.length;we++)if(oe[we]>=xe){for(var fe=we;we+1<oe.length&&oe[we+1]>=xe;)we++;we>fe&&K.push([fe+q,we+q])}}}),K}function re(X,ne,ee,O){var pe=ce(X,ne,ee,O),K=[].concat(X);return pe.forEach(function(ie,q){K[q]=(ne.levels[ie]&1?ge(X[ie]):null)||X[ie]}),K.join("")}function ce(X,ne,ee,O){for(var pe=$(X,ne,ee,O),K=[],ie=0;ie<X.length;ie++)K[ie]=ie;return pe.forEach(function(q){for(var _e=q[0],oe=q[1],se=K.slice(_e,oe+1),ue=se.length;ue--;)K[oe-ue]=se[ue]}),K}return r.closingToOpeningBracket=T,r.getBidiCharType=h,r.getBidiCharTypeName=p,r.getCanonicalBracket=R,r.getEmbeddingLevels=Q,r.getMirroredCharacter=ge,r.getMirroredCharactersMap=de,r.getReorderSegments=$,r.getReorderedIndices=ce,r.getReorderedString=re,r.openingToClosingBracket=b,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return l}const ya=/\bvoid\s+main\s*\(\s*\)\s*{/g;function _n(l){const r=/^[ \t]*#include +<([\w\d./]+)>/gm;function s(f,t){let e=Va[t];return e?_n(e):f}return l.replace(r,s)}const Be=[];for(let l=0;l<256;l++)Be[l]=(l<16?"0":"")+l.toString(16);function Ki(){const l=Math.random()*4294967295|0,r=Math.random()*4294967295|0,s=Math.random()*4294967295|0,f=Math.random()*4294967295|0;return(Be[l&255]+Be[l>>8&255]+Be[l>>16&255]+Be[l>>24&255]+"-"+Be[r&255]+Be[r>>8&255]+"-"+Be[r>>16&15|64]+Be[r>>24&255]+"-"+Be[s&63|128]+Be[s>>8&255]+"-"+Be[s>>16&255]+Be[s>>24&255]+Be[f&255]+Be[f>>8&255]+Be[f>>16&255]+Be[f>>24&255]).toUpperCase()}const Tt=Object.assign||function(){let l=arguments[0];for(let r=1,s=arguments.length;r<s;r++){let f=arguments[r];if(f)for(let t in f)Object.prototype.hasOwnProperty.call(f,t)&&(l[t]=f[t])}return l},$i=Date.now(),Yo=new WeakMap,Zo=new Map;let es=1e10;function Mn(l,r){const s=os(r);let f=Yo.get(l);if(f||Yo.set(l,f=Object.create(null)),f[s])return new f[s];const t=`_onBeforeCompile${s}`,e=function(i,c){l.onBeforeCompile.call(this,i,c);const u=this.customProgramCacheKey()+"|"+i.vertexShader+"|"+i.fragmentShader;let h=Zo[u];if(!h){const p=ts(this,i,r,s);h=Zo[u]=p}i.vertexShader=h.vertexShader,i.fragmentShader=h.fragmentShader,Tt(i.uniforms,this.uniforms),r.timeUniform&&(i.uniforms[r.timeUniform]={get value(){return Date.now()-$i}}),this[t]&&this[t](i)},n=function(){return a(r.chained?l:l.clone())},a=function(i){const c=Object.create(i,o);return Object.defineProperty(c,"baseMaterial",{value:l}),Object.defineProperty(c,"id",{value:es++}),c.uuid=Ki(),c.uniforms=Tt({},i.uniforms,r.uniforms),c.defines=Tt({},i.defines,r.defines),c.defines[`TROIKA_DERIVED_MATERIAL_${s}`]="",c.extensions=Tt({},i.extensions,r.extensions),c._listeners=void 0,c},o={constructor:{value:n},isDerivedMaterial:{value:!0},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return l.customProgramCacheKey()+"|"+s}},onBeforeCompile:{get(){return e},set(i){this[t]=i}},copy:{writable:!0,configurable:!0,value:function(i){return l.copy.call(this,i),!l.isShaderMaterial&&!l.isDerivedMaterial&&(Tt(this.extensions,i.extensions),Tt(this.defines,i.defines),Tt(this.uniforms,xn.clone(i.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const i=new l.constructor;return a(i).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let i=this._depthMaterial;return i||(i=this._depthMaterial=Mn(l.isDerivedMaterial?l.getDepthMaterial():new Na({depthPacking:Wa}),r),i.defines.IS_DEPTH_MATERIAL="",i.uniforms=this.uniforms),i}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let i=this._distanceMaterial;return i||(i=this._distanceMaterial=Mn(l.isDerivedMaterial?l.getDistanceMaterial():new Ga,r),i.defines.IS_DISTANCE_MATERIAL="",i.uniforms=this.uniforms),i}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:i,_distanceMaterial:c}=this;i&&i.dispose(),c&&c.dispose(),l.dispose.call(this)}}};return f[s]=n,new n}function ts(l,{vertexShader:r,fragmentShader:s},f,t){let{vertexDefs:e,vertexMainIntro:n,vertexMainOutro:a,vertexTransform:o,fragmentDefs:i,fragmentMainIntro:c,fragmentMainOutro:u,fragmentColorTransform:h,customRewriter:p,timeUniform:m}=f;if(e=e||"",n=n||"",a=a||"",i=i||"",c=c||"",u=u||"",(o||p)&&(r=_n(r)),(h||p)&&(s=s.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),s=_n(s)),p){let g=p({vertexShader:r,fragmentShader:s});r=g.vertexShader,s=g.fragmentShader}if(h){let g=[];s=s.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,y=>(g.push(y),"")),u=`${h}
${g.join(`
`)}
${u}`}if(m){const g=`
uniform float ${m};
`;e=g+e,i=g+i}return o&&(r=`vec3 troika_position_${t};
vec3 troika_normal_${t};
vec2 troika_uv_${t};
${r}
`,e=`${e}
void troikaVertexTransform${t}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${o}
}
`,n=`
troika_position_${t} = vec3(position);
troika_normal_${t} = vec3(normal);
troika_uv_${t} = vec2(uv);
troikaVertexTransform${t}(troika_position_${t}, troika_normal_${t}, troika_uv_${t});
${n}
`,r=r.replace(/\b(position|normal|uv)\b/g,(g,y,S,M)=>/\battribute\s+vec[23]\s+$/.test(M.substr(0,S))?y:`troika_${y}_${t}`),l.map&&l.map.channel>0||(r=r.replace(/\bMAP_UV\b/g,`troika_uv_${t}`))),r=qo(r,t,e,n,a),s=qo(s,t,i,c,u),{vertexShader:r,fragmentShader:s}}function qo(l,r,s,f,t){return(f||t||s)&&(l=l.replace(ya,`
${s}
void troikaOrigMain${r}() {`),l+=`
void main() {
  ${f}
  troikaOrigMain${r}();
  ${t}
}`),l}function rs(l,r){return l==="uniforms"?void 0:typeof r=="function"?r.toString():r}let ns=0;const Qo=new Map;function os(l){const r=JSON.stringify(l,rs);let s=Qo.get(r);return s==null&&Qo.set(r,s=++ns),s}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function as(){return typeof window>"u"&&(self.window=self),function(l){var r={parse:function(t){var e=r._bin,n=new Uint8Array(t);if(e.readASCII(n,0,4)=="ttcf"){var a=4;e.readUshort(n,a),a+=2,e.readUshort(n,a),a+=2;var o=e.readUint(n,a);a+=4;for(var i=[],c=0;c<o;c++){var u=e.readUint(n,a);a+=4,i.push(r._readFont(n,u))}return i}return[r._readFont(n,0)]},_readFont:function(t,e){var n=r._bin,a=e;n.readFixed(t,e),e+=4;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2;for(var i=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],c={_data:t,_offset:a},u={},h=0;h<o;h++){var p=n.readASCII(t,e,4);e+=4,n.readUint(t,e),e+=4;var m=n.readUint(t,e);e+=4;var g=n.readUint(t,e);e+=4,u[p]={offset:m,length:g}}for(h=0;h<i.length;h++){var y=i[h];u[y]&&(c[y.trim()]=r[y.trim()].parse(t,u[y].offset,u[y].length,c))}return c},_tabOffset:function(t,e,n){for(var a=r._bin,o=a.readUshort(t,n+4),i=n+12,c=0;c<o;c++){var u=a.readASCII(t,i,4);i+=4,a.readUint(t,i),i+=4;var h=a.readUint(t,i);if(i+=4,a.readUint(t,i),i+=4,u==e)return h}return 0}};r._bin={readFixed:function(t,e){return(t[e]<<8|t[e+1])+(t[e+2]<<8|t[e+3])/65540},readF2dot14:function(t,e){return r._bin.readShort(t,e)/16384},readInt:function(t,e){return r._bin._view(t).getInt32(e)},readInt8:function(t,e){return r._bin._view(t).getInt8(e)},readShort:function(t,e){return r._bin._view(t).getInt16(e)},readUshort:function(t,e){return r._bin._view(t).getUint16(e)},readUshorts:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(r._bin.readUshort(t,e+2*o));return a},readUint:function(t,e){return r._bin._view(t).getUint32(e)},readUint64:function(t,e){return 4294967296*r._bin.readUint(t,e)+r._bin.readUint(t,e+4)},readASCII:function(t,e,n){for(var a="",o=0;o<n;o++)a+=String.fromCharCode(t[e+o]);return a},readUnicode:function(t,e,n){for(var a="",o=0;o<n;o++){var i=t[e++]<<8|t[e++];a+=String.fromCharCode(i)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(t,e,n){var a=r._bin._tdec;return a&&e==0&&n==t.length?a.decode(t):r._bin.readASCII(t,e,n)},readBytes:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(t[e+o]);return a},readASCIIArray:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(String.fromCharCode(t[e+o]));return a},_view:function(t){return t._dataView||(t._dataView=t.buffer?new DataView(t.buffer,t.byteOffset,t.byteLength):new DataView(new Uint8Array(t).buffer))}},r._lctf={},r._lctf.parse=function(t,e,n,a,o){var i=r._bin,c={},u=e;i.readFixed(t,e),e+=4;var h=i.readUshort(t,e);e+=2;var p=i.readUshort(t,e);e+=2;var m=i.readUshort(t,e);return e+=2,c.scriptList=r._lctf.readScriptList(t,u+h),c.featureList=r._lctf.readFeatureList(t,u+p),c.lookupList=r._lctf.readLookupList(t,u+m,o),c},r._lctf.readLookupList=function(t,e,n){var a=r._bin,o=e,i=[],c=a.readUshort(t,e);e+=2;for(var u=0;u<c;u++){var h=a.readUshort(t,e);e+=2;var p=r._lctf.readLookupTable(t,o+h,n);i.push(p)}return i},r._lctf.readLookupTable=function(t,e,n){var a=r._bin,o=e,i={tabs:[]};i.ltype=a.readUshort(t,e),e+=2,i.flag=a.readUshort(t,e),e+=2;var c=a.readUshort(t,e);e+=2;for(var u=i.ltype,h=0;h<c;h++){var p=a.readUshort(t,e);e+=2;var m=n(t,u,o+p,i);i.tabs.push(m)}return i},r._lctf.numOfOnes=function(t){for(var e=0,n=0;n<32;n++)t>>>n&1&&e++;return e},r._lctf.readClassDef=function(t,e){var n=r._bin,a=[],o=n.readUshort(t,e);if(e+=2,o==1){var i=n.readUshort(t,e);e+=2;var c=n.readUshort(t,e);e+=2;for(var u=0;u<c;u++)a.push(i+u),a.push(i+u),a.push(n.readUshort(t,e)),e+=2}if(o==2){var h=n.readUshort(t,e);for(e+=2,u=0;u<h;u++)a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2}return a},r._lctf.getInterval=function(t,e){for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1];if(t[n+2],a<=e&&e<=o)return n}return-1},r._lctf.readCoverage=function(t,e){var n=r._bin,a={};a.fmt=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.fmt==1&&(a.tab=n.readUshorts(t,e,o)),a.fmt==2&&(a.tab=n.readUshorts(t,e,3*o)),a},r._lctf.coverageIndex=function(t,e){var n=t.tab;if(t.fmt==1)return n.indexOf(e);if(t.fmt==2){var a=r._lctf.getInterval(n,e);if(a!=-1)return n[a+2]+(e-n[a])}return-1},r._lctf.readFeatureList=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var c=0;c<i;c++){var u=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2;var p=r._lctf.readFeatureTable(t,a+h);p.tag=u.trim(),o.push(p)}return o},r._lctf.readFeatureTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.featureParams=a+i);var c=n.readUshort(t,e);e+=2,o.tab=[];for(var u=0;u<c;u++)o.tab.push(n.readUshort(t,e+2*u));return o},r._lctf.readScriptList=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2;for(var c=0;c<i;c++){var u=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2,o[u.trim()]=r._lctf.readScriptTable(t,a+h)}return o},r._lctf.readScriptTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.default=r._lctf.readLangSysTable(t,a+i));var c=n.readUshort(t,e);e+=2;for(var u=0;u<c;u++){var h=n.readASCII(t,e,4);e+=4;var p=n.readUshort(t,e);e+=2,o[h.trim()]=r._lctf.readLangSysTable(t,a+p)}return o},r._lctf.readLangSysTable=function(t,e){var n=r._bin,a={};n.readUshort(t,e),e+=2,a.reqFeature=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.features=n.readUshorts(t,e,o),a},r.CFF={},r.CFF.parse=function(t,e,n){var a=r._bin;(t=new Uint8Array(t.buffer,e,n))[e=0],t[++e],t[++e],t[++e],e++;var o=[];e=r.CFF.readIndex(t,e,o);for(var i=[],c=0;c<o.length-1;c++)i.push(a.readASCII(t,e+o[c],o[c+1]-o[c]));e+=o[o.length-1];var u=[];e=r.CFF.readIndex(t,e,u);var h=[];for(c=0;c<u.length-1;c++)h.push(r.CFF.readDict(t,e+u[c],e+u[c+1]));e+=u[u.length-1];var p=h[0],m=[];e=r.CFF.readIndex(t,e,m);var g=[];for(c=0;c<m.length-1;c++)g.push(a.readASCII(t,e+m[c],m[c+1]-m[c]));if(e+=m[m.length-1],r.CFF.readSubrs(t,e,p),p.CharStrings){e=p.CharStrings,m=[],e=r.CFF.readIndex(t,e,m);var y=[];for(c=0;c<m.length-1;c++)y.push(a.readBytes(t,e+m[c],m[c+1]-m[c]));p.CharStrings=y}if(p.ROS){e=p.FDArray;var S=[];for(e=r.CFF.readIndex(t,e,S),p.FDArray=[],c=0;c<S.length-1;c++){var M=r.CFF.readDict(t,e+S[c],e+S[c+1]);r.CFF._readFDict(t,M,g),p.FDArray.push(M)}e+=S[S.length-1],e=p.FDSelect,p.FDSelect=[];var v=t[e];if(e++,v!=3)throw v;var b=a.readUshort(t,e);for(e+=2,c=0;c<b+1;c++)p.FDSelect.push(a.readUshort(t,e),t[e+2]),e+=3}return p.Encoding&&(p.Encoding=r.CFF.readEncoding(t,p.Encoding,p.CharStrings.length)),p.charset&&(p.charset=r.CFF.readCharset(t,p.charset,p.CharStrings.length)),r.CFF._readFDict(t,p,g),p},r.CFF._readFDict=function(t,e,n){var a;for(var o in e.Private&&(a=e.Private[1],e.Private=r.CFF.readDict(t,a,a+e.Private[0]),e.Private.Subrs&&r.CFF.readSubrs(t,a+e.Private.Subrs,e.Private)),e)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)!=-1&&(e[o]=n[e[o]-426+35])},r.CFF.readSubrs=function(t,e,n){var a=r._bin,o=[];e=r.CFF.readIndex(t,e,o);var i,c=o.length;i=c<1240?107:c<33900?1131:32768,n.Bias=i,n.Subrs=[];for(var u=0;u<o.length-1;u++)n.Subrs.push(a.readBytes(t,e+o[u],o[u+1]-o[u]))},r.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],r.CFF.glyphByUnicode=function(t,e){for(var n=0;n<t.charset.length;n++)if(t.charset[n]==e)return n;return-1},r.CFF.glyphBySE=function(t,e){return e<0||e>255?-1:r.CFF.glyphByUnicode(t,r.CFF.tableSE[e])},r.CFF.readEncoding=function(t,e,n){r._bin;var a=[".notdef"],o=t[e];if(e++,o!=0)throw"error: unknown encoding format: "+o;var i=t[e];e++;for(var c=0;c<i;c++)a.push(t[e+c]);return a},r.CFF.readCharset=function(t,e,n){var a=r._bin,o=[".notdef"],i=t[e];if(e++,i==0)for(var c=0;c<n;c++){var u=a.readUshort(t,e);e+=2,o.push(u)}else{if(i!=1&&i!=2)throw"error: format: "+i;for(;o.length<n;){u=a.readUshort(t,e),e+=2;var h=0;for(i==1?(h=t[e],e++):(h=a.readUshort(t,e),e+=2),c=0;c<=h;c++)o.push(u),u++}}return o},r.CFF.readIndex=function(t,e,n){var a=r._bin,o=a.readUshort(t,e)+1,i=t[e+=2];if(e++,i==1)for(var c=0;c<o;c++)n.push(t[e+c]);else if(i==2)for(c=0;c<o;c++)n.push(a.readUshort(t,e+2*c));else if(i==3)for(c=0;c<o;c++)n.push(16777215&a.readUint(t,e+3*c-1));else if(o!=1)throw"unsupported offset size: "+i+", count: "+o;return(e+=o*i)-1},r.CFF.getCharString=function(t,e,n){var a=r._bin,o=t[e],i=t[e+1];t[e+2],t[e+3],t[e+4];var c=1,u=null,h=null;o<=20&&(u=o,c=1),o==12&&(u=100*o+i,c=2),21<=o&&o<=27&&(u=o,c=1),o==28&&(h=a.readShort(t,e+1),c=3),29<=o&&o<=31&&(u=o,c=1),32<=o&&o<=246&&(h=o-139,c=1),247<=o&&o<=250&&(h=256*(o-247)+i+108,c=2),251<=o&&o<=254&&(h=256*-(o-251)-i-108,c=2),o==255&&(h=a.readInt(t,e+1)/65535,c=5),n.val=h??"o"+u,n.size=c},r.CFF.readCharString=function(t,e,n){for(var a=e+n,o=r._bin,i=[];e<a;){var c=t[e],u=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,m=null;c<=20&&(p=c,h=1),c==12&&(p=100*c+u,h=2),c!=19&&c!=20||(p=c,h=2),21<=c&&c<=27&&(p=c,h=1),c==28&&(m=o.readShort(t,e+1),h=3),29<=c&&c<=31&&(p=c,h=1),32<=c&&c<=246&&(m=c-139,h=1),247<=c&&c<=250&&(m=256*(c-247)+u+108,h=2),251<=c&&c<=254&&(m=256*-(c-251)-u-108,h=2),c==255&&(m=o.readInt(t,e+1)/65535,h=5),i.push(m??"o"+p),e+=h}return i},r.CFF.readDict=function(t,e,n){for(var a=r._bin,o={},i=[];e<n;){var c=t[e],u=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,m=null;if(c==28&&(m=a.readShort(t,e+1),h=3),c==29&&(m=a.readInt(t,e+1),h=5),32<=c&&c<=246&&(m=c-139,h=1),247<=c&&c<=250&&(m=256*(c-247)+u+108,h=2),251<=c&&c<=254&&(m=256*-(c-251)-u-108,h=2),c==255)throw m=a.readInt(t,e+1)/65535,h=5,"unknown number";if(c==30){var g=[];for(h=1;;){var y=t[e+h];h++;var S=y>>4,M=15&y;if(S!=15&&g.push(S),M!=15&&g.push(M),M==15)break}for(var v="",b=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],T=0;T<g.length;T++)v+=b[g[T]];m=parseFloat(v)}c<=21&&(p=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][c],h=1,c==12&&(p=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][u],h=2)),p!=null?(o[p]=i.length==1?i[0]:i,i=[]):i.push(m),e+=h}return o},r.cmap={},r.cmap.parse=function(t,e,n){t=new Uint8Array(t.buffer,e,n),e=0;var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2;var c=[];o.tables=[];for(var u=0;u<i;u++){var h=a.readUshort(t,e);e+=2;var p=a.readUshort(t,e);e+=2;var m=a.readUint(t,e);e+=4;var g="p"+h+"e"+p,y=c.indexOf(m);if(y==-1){var S;y=o.tables.length,c.push(m);var M=a.readUshort(t,m);M==0?S=r.cmap.parse0(t,m):M==4?S=r.cmap.parse4(t,m):M==6?S=r.cmap.parse6(t,m):M==12&&(S=r.cmap.parse12(t,m)),o.tables.push(S)}if(o[g]!=null)throw"multiple tables for one platform+encoding";o[g]=y}return o},r.cmap.parse0=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,a.map=[];for(var i=0;i<o-6;i++)a.map.push(t[e+i]);return a},r.cmap.parse4=function(t,e){var n=r._bin,a=e,o={};o.format=n.readUshort(t,e),e+=2;var i=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2;var c=n.readUshort(t,e);e+=2;var u=c/2;o.searchRange=n.readUshort(t,e),e+=2,o.entrySelector=n.readUshort(t,e),e+=2,o.rangeShift=n.readUshort(t,e),e+=2,o.endCount=n.readUshorts(t,e,u),e+=2*u,e+=2,o.startCount=n.readUshorts(t,e,u),e+=2*u,o.idDelta=[];for(var h=0;h<u;h++)o.idDelta.push(n.readShort(t,e)),e+=2;for(o.idRangeOffset=n.readUshorts(t,e,u),e+=2*u,o.glyphIdArray=[];e<a+i;)o.glyphIdArray.push(n.readUshort(t,e)),e+=2;return o},r.cmap.parse6=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,a.firstCode=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,a.glyphIdArray=[];for(var i=0;i<o;i++)a.glyphIdArray.push(n.readUshort(t,e)),e+=2;return a},r.cmap.parse12=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,e+=2,n.readUint(t,e),e+=4,n.readUint(t,e),e+=4;var o=n.readUint(t,e);e+=4,a.groups=[];for(var i=0;i<o;i++){var c=e+12*i,u=n.readUint(t,c+0),h=n.readUint(t,c+4),p=n.readUint(t,c+8);a.groups.push([u,h,p])}return a},r.glyf={},r.glyf.parse=function(t,e,n,a){for(var o=[],i=0;i<a.maxp.numGlyphs;i++)o.push(null);return o},r.glyf._parseGlyf=function(t,e){var n=r._bin,a=t._data,o=r._tabOffset(a,"glyf",t._offset)+t.loca[e];if(t.loca[e]==t.loca[e+1])return null;var i={};if(i.noc=n.readShort(a,o),o+=2,i.xMin=n.readShort(a,o),o+=2,i.yMin=n.readShort(a,o),o+=2,i.xMax=n.readShort(a,o),o+=2,i.yMax=n.readShort(a,o),o+=2,i.xMin>=i.xMax||i.yMin>=i.yMax)return null;if(i.noc>0){i.endPts=[];for(var c=0;c<i.noc;c++)i.endPts.push(n.readUshort(a,o)),o+=2;var u=n.readUshort(a,o);if(o+=2,a.length-o<u)return null;i.instructions=n.readBytes(a,o,u),o+=u;var h=i.endPts[i.noc-1]+1;for(i.flags=[],c=0;c<h;c++){var p=a[o];if(o++,i.flags.push(p),(8&p)!=0){var m=a[o];o++;for(var g=0;g<m;g++)i.flags.push(p),c++}}for(i.xs=[],c=0;c<h;c++){var y=(2&i.flags[c])!=0,S=(16&i.flags[c])!=0;y?(i.xs.push(S?a[o]:-a[o]),o++):S?i.xs.push(0):(i.xs.push(n.readShort(a,o)),o+=2)}for(i.ys=[],c=0;c<h;c++)y=(4&i.flags[c])!=0,S=(32&i.flags[c])!=0,y?(i.ys.push(S?a[o]:-a[o]),o++):S?i.ys.push(0):(i.ys.push(n.readShort(a,o)),o+=2);var M=0,v=0;for(c=0;c<h;c++)M+=i.xs[c],v+=i.ys[c],i.xs[c]=M,i.ys[c]=v}else{var b;i.parts=[];do{b=n.readUshort(a,o),o+=2;var T={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(i.parts.push(T),T.glyphIndex=n.readUshort(a,o),o+=2,1&b){var R=n.readShort(a,o);o+=2;var k=n.readShort(a,o);o+=2}else R=n.readInt8(a,o),o++,k=n.readInt8(a,o),o++;2&b?(T.m.tx=R,T.m.ty=k):(T.p1=R,T.p2=k),8&b?(T.m.a=T.m.d=n.readF2dot14(a,o),o+=2):64&b?(T.m.a=n.readF2dot14(a,o),o+=2,T.m.d=n.readF2dot14(a,o),o+=2):128&b&&(T.m.a=n.readF2dot14(a,o),o+=2,T.m.b=n.readF2dot14(a,o),o+=2,T.m.c=n.readF2dot14(a,o),o+=2,T.m.d=n.readF2dot14(a,o),o+=2)}while(32&b);if(256&b){var C=n.readUshort(a,o);for(o+=2,i.instr=[],c=0;c<C;c++)i.instr.push(a[o]),o++}}return i},r.GDEF={},r.GDEF.parse=function(t,e,n,a){var o=e;e+=4;var i=r._bin.readUshort(t,e);return{glyphClassDef:i===0?null:r._lctf.readClassDef(t,o+i)}},r.GPOS={},r.GPOS.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GPOS.subt)},r.GPOS.subt=function(t,e,n,a){var o=r._bin,i=n,c={};if(c.fmt=o.readUshort(t,n),n+=2,e==1||e==2||e==3||e==7||e==8&&c.fmt<=2){var u=o.readUshort(t,n);n+=2,c.coverage=r._lctf.readCoverage(t,u+i)}if(e==1&&c.fmt==1){var h=o.readUshort(t,n);n+=2,h!=0&&(c.pos=r.GPOS.readValueRecord(t,n,h))}else if(e==2&&c.fmt>=1&&c.fmt<=2){h=o.readUshort(t,n),n+=2;var p=o.readUshort(t,n);n+=2;var m=r._lctf.numOfOnes(h),g=r._lctf.numOfOnes(p);if(c.fmt==1){c.pairsets=[];var y=o.readUshort(t,n);n+=2;for(var S=0;S<y;S++){var M=i+o.readUshort(t,n);n+=2;var v=o.readUshort(t,M);M+=2;for(var b=[],T=0;T<v;T++){var R=o.readUshort(t,M);M+=2,h!=0&&(w=r.GPOS.readValueRecord(t,M,h),M+=2*m),p!=0&&(P=r.GPOS.readValueRecord(t,M,p),M+=2*g),b.push({gid2:R,val1:w,val2:P})}c.pairsets.push(b)}}if(c.fmt==2){var k=o.readUshort(t,n);n+=2;var C=o.readUshort(t,n);n+=2;var F=o.readUshort(t,n);n+=2;var L=o.readUshort(t,n);for(n+=2,c.classDef1=r._lctf.readClassDef(t,i+k),c.classDef2=r._lctf.readClassDef(t,i+C),c.matrix=[],S=0;S<F;S++){var H=[];for(T=0;T<L;T++){var w=null,P=null;h!=0&&(w=r.GPOS.readValueRecord(t,n,h),n+=2*m),p!=0&&(P=r.GPOS.readValueRecord(t,n,p),n+=2*g),H.push({val1:w,val2:P})}c.matrix.push(H)}}}else if(e==4&&c.fmt==1)c.markCoverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),c.baseCoverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),c.markClassCount=o.readUshort(t,n+4),c.markArray=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),c.baseArray=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,c.markClassCount);else if(e==6&&c.fmt==1)c.mark1Coverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),c.mark2Coverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),c.markClassCount=o.readUshort(t,n+4),c.mark1Array=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),c.mark2Array=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,c.markClassCount);else if(e==9&&c.fmt==1){var j=o.readUshort(t,n);n+=2;var Y=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=j;else if(a.ltype!=j)throw"invalid extension substitution";return r.GPOS.subt(t,a.ltype,i+Y)}return c},r.GPOS.readValueRecord=function(t,e,n){var a=r._bin,o=[];return o.push(1&n?a.readShort(t,e):0),e+=1&n?2:0,o.push(2&n?a.readShort(t,e):0),e+=2&n?2:0,o.push(4&n?a.readShort(t,e):0),e+=4&n?2:0,o.push(8&n?a.readShort(t,e):0),e+=8&n?2:0,o},r.GPOS.readBaseArray=function(t,e,n){var a=r._bin,o=[],i=e,c=a.readUshort(t,e);e+=2;for(var u=0;u<c;u++){for(var h=[],p=0;p<n;p++)h.push(r.GPOS.readAnchorRecord(t,i+a.readUshort(t,e))),e+=2;o.push(h)}return o},r.GPOS.readMarkArray=function(t,e){var n=r._bin,a=[],o=e,i=n.readUshort(t,e);e+=2;for(var c=0;c<i;c++){var u=r.GPOS.readAnchorRecord(t,n.readUshort(t,e+2)+o);u.markClass=n.readUshort(t,e),a.push(u),e+=4}return a},r.GPOS.readAnchorRecord=function(t,e){var n=r._bin,a={};return a.fmt=n.readUshort(t,e),a.x=n.readShort(t,e+2),a.y=n.readShort(t,e+4),a},r.GSUB={},r.GSUB.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GSUB.subt)},r.GSUB.subt=function(t,e,n,a){var o=r._bin,i=n,c={};if(c.fmt=o.readUshort(t,n),n+=2,e!=1&&e!=2&&e!=4&&e!=5&&e!=6)return null;if(e==1||e==2||e==4||e==5&&c.fmt<=2||e==6&&c.fmt<=2){var u=o.readUshort(t,n);n+=2,c.coverage=r._lctf.readCoverage(t,i+u)}if(e==1&&c.fmt>=1&&c.fmt<=2){if(c.fmt==1)c.delta=o.readShort(t,n),n+=2;else if(c.fmt==2){var h=o.readUshort(t,n);n+=2,c.newg=o.readUshorts(t,n,h),n+=2*c.newg.length}}else if(e==2&&c.fmt==1){h=o.readUshort(t,n),n+=2,c.seqs=[];for(var p=0;p<h;p++){var m=o.readUshort(t,n)+i;n+=2;var g=o.readUshort(t,m);c.seqs.push(o.readUshorts(t,m+2,g))}}else if(e==4)for(c.vals=[],h=o.readUshort(t,n),n+=2,p=0;p<h;p++){var y=o.readUshort(t,n);n+=2,c.vals.push(r.GSUB.readLigatureSet(t,i+y))}else if(e==5&&c.fmt==2){if(c.fmt==2){var S=o.readUshort(t,n);n+=2,c.cDef=r._lctf.readClassDef(t,i+S),c.scset=[];var M=o.readUshort(t,n);for(n+=2,p=0;p<M;p++){var v=o.readUshort(t,n);n+=2,c.scset.push(v==0?null:r.GSUB.readSubClassSet(t,i+v))}}}else if(e==6&&c.fmt==3){if(c.fmt==3){for(p=0;p<3;p++){h=o.readUshort(t,n),n+=2;for(var b=[],T=0;T<h;T++)b.push(r._lctf.readCoverage(t,i+o.readUshort(t,n+2*T)));n+=2*h,p==0&&(c.backCvg=b),p==1&&(c.inptCvg=b),p==2&&(c.ahedCvg=b)}h=o.readUshort(t,n),n+=2,c.lookupRec=r.GSUB.readSubstLookupRecords(t,n,h)}}else if(e==7&&c.fmt==1){var R=o.readUshort(t,n);n+=2;var k=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=R;else if(a.ltype!=R)throw"invalid extension substitution";return r.GSUB.subt(t,a.ltype,i+k)}return c},r.GSUB.readSubClassSet=function(t,e){var n=r._bin.readUshort,a=e,o=[],i=n(t,e);e+=2;for(var c=0;c<i;c++){var u=n(t,e);e+=2,o.push(r.GSUB.readSubClassRule(t,a+u))}return o},r.GSUB.readSubClassRule=function(t,e){var n=r._bin.readUshort,a={},o=n(t,e),i=n(t,e+=2);e+=2,a.input=[];for(var c=0;c<o-1;c++)a.input.push(n(t,e)),e+=2;return a.substLookupRecords=r.GSUB.readSubstLookupRecords(t,e,i),a},r.GSUB.readSubstLookupRecords=function(t,e,n){for(var a=r._bin.readUshort,o=[],i=0;i<n;i++)o.push(a(t,e),a(t,e+2)),e+=4;return o},r.GSUB.readChainSubClassSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var c=0;c<i;c++){var u=n.readUshort(t,e);e+=2,o.push(r.GSUB.readChainSubClassRule(t,a+u))}return o},r.GSUB.readChainSubClassRule=function(t,e){for(var n=r._bin,a={},o=["backtrack","input","lookahead"],i=0;i<o.length;i++){var c=n.readUshort(t,e);e+=2,i==1&&c--,a[o[i]]=n.readUshorts(t,e,c),e+=2*a[o[i]].length}return c=n.readUshort(t,e),e+=2,a.subst=n.readUshorts(t,e,2*c),e+=2*a.subst.length,a},r.GSUB.readLigatureSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var c=0;c<i;c++){var u=n.readUshort(t,e);e+=2,o.push(r.GSUB.readLigature(t,a+u))}return o},r.GSUB.readLigature=function(t,e){var n=r._bin,a={chain:[]};a.nglyph=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2;for(var i=0;i<o-1;i++)a.chain.push(n.readUshort(t,e)),e+=2;return a},r.head={},r.head.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.fontRevision=a.readFixed(t,e),e+=4,a.readUint(t,e),e+=4,a.readUint(t,e),e+=4,o.flags=a.readUshort(t,e),e+=2,o.unitsPerEm=a.readUshort(t,e),e+=2,o.created=a.readUint64(t,e),e+=8,o.modified=a.readUint64(t,e),e+=8,o.xMin=a.readShort(t,e),e+=2,o.yMin=a.readShort(t,e),e+=2,o.xMax=a.readShort(t,e),e+=2,o.yMax=a.readShort(t,e),e+=2,o.macStyle=a.readUshort(t,e),e+=2,o.lowestRecPPEM=a.readUshort(t,e),e+=2,o.fontDirectionHint=a.readShort(t,e),e+=2,o.indexToLocFormat=a.readShort(t,e),e+=2,o.glyphDataFormat=a.readShort(t,e),e+=2,o},r.hhea={},r.hhea.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.ascender=a.readShort(t,e),e+=2,o.descender=a.readShort(t,e),e+=2,o.lineGap=a.readShort(t,e),e+=2,o.advanceWidthMax=a.readUshort(t,e),e+=2,o.minLeftSideBearing=a.readShort(t,e),e+=2,o.minRightSideBearing=a.readShort(t,e),e+=2,o.xMaxExtent=a.readShort(t,e),e+=2,o.caretSlopeRise=a.readShort(t,e),e+=2,o.caretSlopeRun=a.readShort(t,e),e+=2,o.caretOffset=a.readShort(t,e),e+=2,e+=8,o.metricDataFormat=a.readShort(t,e),e+=2,o.numberOfHMetrics=a.readUshort(t,e),e+=2,o},r.hmtx={},r.hmtx.parse=function(t,e,n,a){for(var o=r._bin,i={aWidth:[],lsBearing:[]},c=0,u=0,h=0;h<a.maxp.numGlyphs;h++)h<a.hhea.numberOfHMetrics&&(c=o.readUshort(t,e),e+=2,u=o.readShort(t,e),e+=2),i.aWidth.push(c),i.lsBearing.push(u);return i},r.kern={},r.kern.parse=function(t,e,n,a){var o=r._bin,i=o.readUshort(t,e);if(e+=2,i==1)return r.kern.parseV1(t,e-2,n,a);var c=o.readUshort(t,e);e+=2;for(var u={glyph1:[],rval:[]},h=0;h<c;h++){e+=2,n=o.readUshort(t,e),e+=2;var p=o.readUshort(t,e);e+=2;var m=p>>>8;if((m&=15)!=0)throw"unknown kern table format: "+m;e=r.kern.readFormat0(t,e,u)}return u},r.kern.parseV1=function(t,e,n,a){var o=r._bin;o.readFixed(t,e),e+=4;var i=o.readUint(t,e);e+=4;for(var c={glyph1:[],rval:[]},u=0;u<i;u++){o.readUint(t,e),e+=4;var h=o.readUshort(t,e);e+=2,o.readUshort(t,e),e+=2;var p=h>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;e=r.kern.readFormat0(t,e,c)}return c},r.kern.readFormat0=function(t,e,n){var a=r._bin,o=-1,i=a.readUshort(t,e);e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2;for(var c=0;c<i;c++){var u=a.readUshort(t,e);e+=2;var h=a.readUshort(t,e);e+=2;var p=a.readShort(t,e);e+=2,u!=o&&(n.glyph1.push(u),n.rval.push({glyph2:[],vals:[]}));var m=n.rval[n.rval.length-1];m.glyph2.push(h),m.vals.push(p),o=u}return e},r.loca={},r.loca.parse=function(t,e,n,a){var o=r._bin,i=[],c=a.head.indexToLocFormat,u=a.maxp.numGlyphs+1;if(c==0)for(var h=0;h<u;h++)i.push(o.readUshort(t,e+(h<<1))<<1);if(c==1)for(h=0;h<u;h++)i.push(o.readUint(t,e+(h<<2)));return i},r.maxp={},r.maxp.parse=function(t,e,n){var a=r._bin,o={},i=a.readUint(t,e);return e+=4,o.numGlyphs=a.readUshort(t,e),e+=2,i==65536&&(o.maxPoints=a.readUshort(t,e),e+=2,o.maxContours=a.readUshort(t,e),e+=2,o.maxCompositePoints=a.readUshort(t,e),e+=2,o.maxCompositeContours=a.readUshort(t,e),e+=2,o.maxZones=a.readUshort(t,e),e+=2,o.maxTwilightPoints=a.readUshort(t,e),e+=2,o.maxStorage=a.readUshort(t,e),e+=2,o.maxFunctionDefs=a.readUshort(t,e),e+=2,o.maxInstructionDefs=a.readUshort(t,e),e+=2,o.maxStackElements=a.readUshort(t,e),e+=2,o.maxSizeOfInstructions=a.readUshort(t,e),e+=2,o.maxComponentElements=a.readUshort(t,e),e+=2,o.maxComponentDepth=a.readUshort(t,e),e+=2),o},r.name={},r.name.parse=function(t,e,n){var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2,a.readUshort(t,e);for(var c,u=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=e+=2,p=0;p<i;p++){var m=a.readUshort(t,e);e+=2;var g=a.readUshort(t,e);e+=2;var y=a.readUshort(t,e);e+=2;var S=a.readUshort(t,e);e+=2;var M=a.readUshort(t,e);e+=2;var v=a.readUshort(t,e);e+=2;var b,T=u[S],R=h+12*i+v;if(m==0)b=a.readUnicode(t,R,M/2);else if(m==3&&g==0)b=a.readUnicode(t,R,M/2);else if(g==0)b=a.readASCII(t,R,M);else if(g==1)b=a.readUnicode(t,R,M/2);else if(g==3)b=a.readUnicode(t,R,M/2);else{if(m!=1)throw"unknown encoding "+g+", platformID: "+m;b=a.readASCII(t,R,M)}var k="p"+m+","+y.toString(16);o[k]==null&&(o[k]={}),o[k][T!==void 0?T:S]=b,o[k]._lang=y}for(var C in o)if(o[C].postScriptName!=null&&o[C]._lang==1033)return o[C];for(var C in o)if(o[C].postScriptName!=null&&o[C]._lang==0)return o[C];for(var C in o)if(o[C].postScriptName!=null&&o[C]._lang==3084)return o[C];for(var C in o)if(o[C].postScriptName!=null)return o[C];for(var C in o){c=C;break}return o[c]},r["OS/2"]={},r["OS/2"].parse=function(t,e,n){var a=r._bin.readUshort(t,e);e+=2;var o={};if(a==0)r["OS/2"].version0(t,e,o);else if(a==1)r["OS/2"].version1(t,e,o);else if(a==2||a==3||a==4)r["OS/2"].version2(t,e,o);else{if(a!=5)throw"unknown OS/2 table version: "+a;r["OS/2"].version5(t,e,o)}return o},r["OS/2"].version0=function(t,e,n){var a=r._bin;return n.xAvgCharWidth=a.readShort(t,e),e+=2,n.usWeightClass=a.readUshort(t,e),e+=2,n.usWidthClass=a.readUshort(t,e),e+=2,n.fsType=a.readUshort(t,e),e+=2,n.ySubscriptXSize=a.readShort(t,e),e+=2,n.ySubscriptYSize=a.readShort(t,e),e+=2,n.ySubscriptXOffset=a.readShort(t,e),e+=2,n.ySubscriptYOffset=a.readShort(t,e),e+=2,n.ySuperscriptXSize=a.readShort(t,e),e+=2,n.ySuperscriptYSize=a.readShort(t,e),e+=2,n.ySuperscriptXOffset=a.readShort(t,e),e+=2,n.ySuperscriptYOffset=a.readShort(t,e),e+=2,n.yStrikeoutSize=a.readShort(t,e),e+=2,n.yStrikeoutPosition=a.readShort(t,e),e+=2,n.sFamilyClass=a.readShort(t,e),e+=2,n.panose=a.readBytes(t,e,10),e+=10,n.ulUnicodeRange1=a.readUint(t,e),e+=4,n.ulUnicodeRange2=a.readUint(t,e),e+=4,n.ulUnicodeRange3=a.readUint(t,e),e+=4,n.ulUnicodeRange4=a.readUint(t,e),e+=4,n.achVendID=[a.readInt8(t,e),a.readInt8(t,e+1),a.readInt8(t,e+2),a.readInt8(t,e+3)],e+=4,n.fsSelection=a.readUshort(t,e),e+=2,n.usFirstCharIndex=a.readUshort(t,e),e+=2,n.usLastCharIndex=a.readUshort(t,e),e+=2,n.sTypoAscender=a.readShort(t,e),e+=2,n.sTypoDescender=a.readShort(t,e),e+=2,n.sTypoLineGap=a.readShort(t,e),e+=2,n.usWinAscent=a.readUshort(t,e),e+=2,n.usWinDescent=a.readUshort(t,e),e+=2},r["OS/2"].version1=function(t,e,n){var a=r._bin;return e=r["OS/2"].version0(t,e,n),n.ulCodePageRange1=a.readUint(t,e),e+=4,n.ulCodePageRange2=a.readUint(t,e),e+=4},r["OS/2"].version2=function(t,e,n){var a=r._bin;return e=r["OS/2"].version1(t,e,n),n.sxHeight=a.readShort(t,e),e+=2,n.sCapHeight=a.readShort(t,e),e+=2,n.usDefault=a.readUshort(t,e),e+=2,n.usBreak=a.readUshort(t,e),e+=2,n.usMaxContext=a.readUshort(t,e),e+=2},r["OS/2"].version5=function(t,e,n){var a=r._bin;return e=r["OS/2"].version2(t,e,n),n.usLowerOpticalPointSize=a.readUshort(t,e),e+=2,n.usUpperOpticalPointSize=a.readUshort(t,e),e+=2},r.post={},r.post.parse=function(t,e,n){var a=r._bin,o={};return o.version=a.readFixed(t,e),e+=4,o.italicAngle=a.readFixed(t,e),e+=4,o.underlinePosition=a.readShort(t,e),e+=2,o.underlineThickness=a.readShort(t,e),e+=2,o},r==null&&(r={}),r.U==null&&(r.U={}),r.U.codeToGlyph=function(t,e){var n=t.cmap,a=-1;if(n.p0e4!=null?a=n.p0e4:n.p3e1!=null?a=n.p3e1:n.p1e0!=null?a=n.p1e0:n.p0e3!=null&&(a=n.p0e3),a==-1)throw"no familiar platform and encoding!";var o=n.tables[a];if(o.format==0)return e>=o.map.length?0:o.map[e];if(o.format==4){for(var i=-1,c=0;c<o.endCount.length;c++)if(e<=o.endCount[c]){i=c;break}return i==-1||o.startCount[i]>e?0:65535&(o.idRangeOffset[i]!=0?o.glyphIdArray[e-o.startCount[i]+(o.idRangeOffset[i]>>1)-(o.idRangeOffset.length-i)]:e+o.idDelta[i])}if(o.format==12){if(e>o.groups[o.groups.length-1][1])return 0;for(c=0;c<o.groups.length;c++){var u=o.groups[c];if(u[0]<=e&&e<=u[1])return u[2]+(e-u[0])}return 0}throw"unknown cmap table format "+o.format},r.U.glyphToPath=function(t,e){var n={cmds:[],crds:[]};if(t.SVG&&t.SVG.entries[e]){var a=t.SVG.entries[e];return a==null?n:(typeof a=="string"&&(a=r.SVG.toPath(a),t.SVG.entries[e]=a),a)}if(t.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:t.CFF.Private?t.CFF.Private.defaultWidthX:0,open:!1},i=t.CFF,c=t.CFF.Private;if(i.ROS){for(var u=0;i.FDSelect[u+2]<=e;)u+=2;c=i.FDArray[i.FDSelect[u+1]].Private}r.U._drawCFF(t.CFF.CharStrings[e],o,i,c,n)}else t.glyf&&r.U._drawGlyf(e,t,n);return n},r.U._drawGlyf=function(t,e,n){var a=e.glyf[t];a==null&&(a=e.glyf[t]=r.glyf._parseGlyf(e,t)),a!=null&&(a.noc>-1?r.U._simpleGlyph(a,n):r.U._compoGlyph(a,e,n))},r.U._simpleGlyph=function(t,e){for(var n=0;n<t.noc;n++){for(var a=n==0?0:t.endPts[n-1]+1,o=t.endPts[n],i=a;i<=o;i++){var c=i==a?o:i-1,u=i==o?a:i+1,h=1&t.flags[i],p=1&t.flags[c],m=1&t.flags[u],g=t.xs[i],y=t.ys[i];if(i==a)if(h){if(!p){r.U.P.moveTo(e,g,y);continue}r.U.P.moveTo(e,t.xs[c],t.ys[c])}else p?r.U.P.moveTo(e,t.xs[c],t.ys[c]):r.U.P.moveTo(e,(t.xs[c]+g)/2,(t.ys[c]+y)/2);h?p&&r.U.P.lineTo(e,g,y):m?r.U.P.qcurveTo(e,g,y,t.xs[u],t.ys[u]):r.U.P.qcurveTo(e,g,y,(g+t.xs[u])/2,(y+t.ys[u])/2)}r.U.P.closePath(e)}},r.U._compoGlyph=function(t,e,n){for(var a=0;a<t.parts.length;a++){var o={cmds:[],crds:[]},i=t.parts[a];r.U._drawGlyf(i.glyphIndex,e,o);for(var c=i.m,u=0;u<o.crds.length;u+=2){var h=o.crds[u],p=o.crds[u+1];n.crds.push(h*c.a+p*c.b+c.tx),n.crds.push(h*c.c+p*c.d+c.ty)}for(u=0;u<o.cmds.length;u++)n.cmds.push(o.cmds[u])}},r.U._getGlyphClass=function(t,e){var n=r._lctf.getInterval(e,t);return n==-1?0:e[n+2]},r.U._applySubs=function(t,e,n,a){for(var o=t.length-e-1,i=0;i<n.tabs.length;i++)if(n.tabs[i]!=null){var c,u=n.tabs[i];if(!u.coverage||(c=r._lctf.coverageIndex(u.coverage,t[e]))!=-1){if(n.ltype==1)t[e],u.fmt==1?t[e]=t[e]+u.delta:t[e]=u.newg[c];else if(n.ltype==4)for(var h=u.vals[c],p=0;p<h.length;p++){var m=h[p],g=m.chain.length;if(!(g>o)){for(var y=!0,S=0,M=0;M<g;M++){for(;t[e+S+(1+M)]==-1;)S++;m.chain[M]!=t[e+S+(1+M)]&&(y=!1)}if(y){for(t[e]=m.nglyph,M=0;M<g+S;M++)t[e+M+1]=-1;break}}}else if(n.ltype==5&&u.fmt==2)for(var v=r._lctf.getInterval(u.cDef,t[e]),b=u.cDef[v+2],T=u.scset[b],R=0;R<T.length;R++){var k=T[R],C=k.input;if(!(C.length>o)){for(y=!0,M=0;M<C.length;M++){var F=r._lctf.getInterval(u.cDef,t[e+1+M]);if(v==-1&&u.cDef[F+2]!=C[M]){y=!1;break}}if(y){var L=k.substLookupRecords;for(p=0;p<L.length;p+=2)L[p],L[p+1]}}}else if(n.ltype==6&&u.fmt==3){if(!r.U._glsCovered(t,u.backCvg,e-u.backCvg.length)||!r.U._glsCovered(t,u.inptCvg,e)||!r.U._glsCovered(t,u.ahedCvg,e+u.inptCvg.length))continue;var H=u.lookupRec;for(R=0;R<H.length;R+=2){v=H[R];var w=a[H[R+1]];r.U._applySubs(t,e+v,w,a)}}}}},r.U._glsCovered=function(t,e,n){for(var a=0;a<e.length;a++)if(r._lctf.coverageIndex(e[a],t[n+a])==-1)return!1;return!0},r.U.glyphsToPath=function(t,e,n){for(var a={cmds:[],crds:[]},o=0,i=0;i<e.length;i++){var c=e[i];if(c!=-1){for(var u=i<e.length-1&&e[i+1]!=-1?e[i+1]:0,h=r.U.glyphToPath(t,c),p=0;p<h.crds.length;p+=2)a.crds.push(h.crds[p]+o),a.crds.push(h.crds[p+1]);for(n&&a.cmds.push(n),p=0;p<h.cmds.length;p++)a.cmds.push(h.cmds[p]);n&&a.cmds.push("X"),o+=t.hmtx.aWidth[c],i<e.length-1&&(o+=r.U.getPairAdjustment(t,c,u))}}return a},r.U.P={},r.U.P.moveTo=function(t,e,n){t.cmds.push("M"),t.crds.push(e,n)},r.U.P.lineTo=function(t,e,n){t.cmds.push("L"),t.crds.push(e,n)},r.U.P.curveTo=function(t,e,n,a,o,i,c){t.cmds.push("C"),t.crds.push(e,n,a,o,i,c)},r.U.P.qcurveTo=function(t,e,n,a,o){t.cmds.push("Q"),t.crds.push(e,n,a,o)},r.U.P.closePath=function(t){t.cmds.push("Z")},r.U._drawCFF=function(t,e,n,a,o){for(var i=e.stack,c=e.nStems,u=e.haveWidth,h=e.width,p=e.open,m=0,g=e.x,y=e.y,S=0,M=0,v=0,b=0,T=0,R=0,k=0,C=0,F=0,L=0,H={val:0,size:0};m<t.length;){r.CFF.getCharString(t,m,H);var w=H.val;if(m+=H.size,w=="o1"||w=="o18")i.length%2!=0&&!u&&(h=i.shift()+a.nominalWidthX),c+=i.length>>1,i.length=0,u=!0;else if(w=="o3"||w=="o23")i.length%2!=0&&!u&&(h=i.shift()+a.nominalWidthX),c+=i.length>>1,i.length=0,u=!0;else if(w=="o4")i.length>1&&!u&&(h=i.shift()+a.nominalWidthX,u=!0),p&&r.U.P.closePath(o),y+=i.pop(),r.U.P.moveTo(o,g,y),p=!0;else if(w=="o5")for(;i.length>0;)g+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,g,y);else if(w=="o6"||w=="o7")for(var P=i.length,j=w=="o6",Y=0;Y<P;Y++){var N=i.shift();j?g+=N:y+=N,j=!j,r.U.P.lineTo(o,g,y)}else if(w=="o8"||w=="o24"){P=i.length;for(var J=0;J+6<=P;)S=g+i.shift(),M=y+i.shift(),v=S+i.shift(),b=M+i.shift(),g=v+i.shift(),y=b+i.shift(),r.U.P.curveTo(o,S,M,v,b,g,y),J+=6;w=="o24"&&(g+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,g,y))}else{if(w=="o11")break;if(w=="o1234"||w=="o1235"||w=="o1236"||w=="o1237")w=="o1234"&&(M=y,v=(S=g+i.shift())+i.shift(),L=b=M+i.shift(),R=b,C=y,g=(k=(T=(F=v+i.shift())+i.shift())+i.shift())+i.shift(),r.U.P.curveTo(o,S,M,v,b,F,L),r.U.P.curveTo(o,T,R,k,C,g,y)),w=="o1235"&&(S=g+i.shift(),M=y+i.shift(),v=S+i.shift(),b=M+i.shift(),F=v+i.shift(),L=b+i.shift(),T=F+i.shift(),R=L+i.shift(),k=T+i.shift(),C=R+i.shift(),g=k+i.shift(),y=C+i.shift(),i.shift(),r.U.P.curveTo(o,S,M,v,b,F,L),r.U.P.curveTo(o,T,R,k,C,g,y)),w=="o1236"&&(S=g+i.shift(),M=y+i.shift(),v=S+i.shift(),L=b=M+i.shift(),R=b,k=(T=(F=v+i.shift())+i.shift())+i.shift(),C=R+i.shift(),g=k+i.shift(),r.U.P.curveTo(o,S,M,v,b,F,L),r.U.P.curveTo(o,T,R,k,C,g,y)),w=="o1237"&&(S=g+i.shift(),M=y+i.shift(),v=S+i.shift(),b=M+i.shift(),F=v+i.shift(),L=b+i.shift(),T=F+i.shift(),R=L+i.shift(),k=T+i.shift(),C=R+i.shift(),Math.abs(k-g)>Math.abs(C-y)?g=k+i.shift():y=C+i.shift(),r.U.P.curveTo(o,S,M,v,b,F,L),r.U.P.curveTo(o,T,R,k,C,g,y));else if(w=="o14"){if(i.length>0&&!u&&(h=i.shift()+n.nominalWidthX,u=!0),i.length==4){var ae=i.shift(),G=i.shift(),z=i.shift(),x=i.shift(),U=r.CFF.glyphBySE(n,z),A=r.CFF.glyphBySE(n,x);r.U._drawCFF(n.CharStrings[U],e,n,a,o),e.x=ae,e.y=G,r.U._drawCFF(n.CharStrings[A],e,n,a,o)}p&&(r.U.P.closePath(o),p=!1)}else if(w=="o19"||w=="o20")i.length%2!=0&&!u&&(h=i.shift()+a.nominalWidthX),c+=i.length>>1,i.length=0,u=!0,m+=c+7>>3;else if(w=="o21")i.length>2&&!u&&(h=i.shift()+a.nominalWidthX,u=!0),y+=i.pop(),g+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,g,y),p=!0;else if(w=="o22")i.length>1&&!u&&(h=i.shift()+a.nominalWidthX,u=!0),g+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,g,y),p=!0;else if(w=="o25"){for(;i.length>6;)g+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,g,y);S=g+i.shift(),M=y+i.shift(),v=S+i.shift(),b=M+i.shift(),g=v+i.shift(),y=b+i.shift(),r.U.P.curveTo(o,S,M,v,b,g,y)}else if(w=="o26")for(i.length%2&&(g+=i.shift());i.length>0;)S=g,M=y+i.shift(),g=v=S+i.shift(),y=(b=M+i.shift())+i.shift(),r.U.P.curveTo(o,S,M,v,b,g,y);else if(w=="o27")for(i.length%2&&(y+=i.shift());i.length>0;)M=y,v=(S=g+i.shift())+i.shift(),b=M+i.shift(),g=v+i.shift(),y=b,r.U.P.curveTo(o,S,M,v,b,g,y);else if(w=="o10"||w=="o29"){var D=w=="o10"?a:n;if(i.length!=0){var E=i.pop(),W=D.Subrs[E+D.Bias];e.x=g,e.y=y,e.nStems=c,e.haveWidth=u,e.width=h,e.open=p,r.U._drawCFF(W,e,n,a,o),g=e.x,y=e.y,c=e.nStems,u=e.haveWidth,h=e.width,p=e.open}}else if(w=="o30"||w=="o31"){var I=i.length,B=(J=0,w=="o31");for(J+=I-(P=-3&I);J<P;)B?(M=y,v=(S=g+i.shift())+i.shift(),y=(b=M+i.shift())+i.shift(),P-J==5?(g=v+i.shift(),J++):g=v,B=!1):(S=g,M=y+i.shift(),v=S+i.shift(),b=M+i.shift(),g=v+i.shift(),P-J==5?(y=b+i.shift(),J++):y=b,B=!0),r.U.P.curveTo(o,S,M,v,b,g,y),J+=4}else{if((w+"").charAt(0)=="o")throw w;i.push(w)}}}e.x=g,e.y=y,e.nStems=c,e.haveWidth=u,e.width=h,e.open=p};var s=r,f={Typr:s};return l.Typr=s,l.default=f,Object.defineProperty(l,"__esModule",{value:!0}),l}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function is(){return function(l){var r=Uint8Array,s=Uint16Array,f=Uint32Array,t=new r([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),e=new r([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),n=new r([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(w,P){for(var j=new s(31),Y=0;Y<31;++Y)j[Y]=P+=1<<w[Y-1];var N=new f(j[30]);for(Y=1;Y<30;++Y)for(var J=j[Y];J<j[Y+1];++J)N[J]=J-j[Y]<<5|Y;return[j,N]},o=a(t,2),i=o[0],c=o[1];i[28]=258,c[258]=28;for(var u=a(e,0)[0],h=new s(32768),p=0;p<32768;++p){var m=(43690&p)>>>1|(21845&p)<<1;m=(61680&(m=(52428&m)>>>2|(13107&m)<<2))>>>4|(3855&m)<<4,h[p]=((65280&m)>>>8|(255&m)<<8)>>>1}var g=function(w,P,j){for(var Y=w.length,N=0,J=new s(P);N<Y;++N)++J[w[N]-1];var ae,G=new s(P);for(N=0;N<P;++N)G[N]=G[N-1]+J[N-1]<<1;{ae=new s(1<<P);var z=15-P;for(N=0;N<Y;++N)if(w[N])for(var x=N<<4|w[N],U=P-w[N],A=G[w[N]-1]++<<U,D=A|(1<<U)-1;A<=D;++A)ae[h[A]>>>z]=x}return ae},y=new r(288);for(p=0;p<144;++p)y[p]=8;for(p=144;p<256;++p)y[p]=9;for(p=256;p<280;++p)y[p]=7;for(p=280;p<288;++p)y[p]=8;var S=new r(32);for(p=0;p<32;++p)S[p]=5;var M=g(y,9),v=g(S,5),b=function(w){for(var P=w[0],j=1;j<w.length;++j)w[j]>P&&(P=w[j]);return P},T=function(w,P,j){var Y=P/8|0;return(w[Y]|w[Y+1]<<8)>>(7&P)&j},R=function(w,P){var j=P/8|0;return(w[j]|w[j+1]<<8|w[j+2]<<16)>>(7&P)},k=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],C=function(w,P,j){var Y=new Error(P||k[w]);if(Y.code=w,Error.captureStackTrace&&Error.captureStackTrace(Y,C),!j)throw Y;return Y},F=function(w,P,j){var Y=w.length;if(!Y||j&&!j.l&&Y<5)return P||new r(0);var N=!P||j,J=!j||j.i;j||(j={}),P||(P=new r(3*Y));var ae,G=function(fe){var Fe=P.length;if(fe>Fe){var Ce=new r(Math.max(2*Fe,fe));Ce.set(P),P=Ce}},z=j.f||0,x=j.p||0,U=j.b||0,A=j.l,D=j.d,E=j.m,W=j.n,I=8*Y;do{if(!A){j.f=z=T(w,x,1);var B=T(w,x+1,3);if(x+=3,!B){var Q=w[(ee=((ae=x)/8|0)+(7&ae&&1)+4)-4]|w[ee-3]<<8,te=ee+Q;if(te>Y){J&&C(0);break}N&&G(U+Q),P.set(w.subarray(ee,te),U),j.b=U+=Q,j.p=x=8*te;continue}if(B==1)A=M,D=v,E=9,W=5;else if(B==2){var Z=T(w,x,31)+257,V=T(w,x+10,15)+4,ge=Z+T(w,x+5,31)+1;x+=14;for(var de=new r(ge),$=new r(19),re=0;re<V;++re)$[n[re]]=T(w,x+3*re,7);x+=3*V;var ce=b($),X=(1<<ce)-1,ne=g($,ce);for(re=0;re<ge;){var ee,O=ne[T(w,x,X)];if(x+=15&O,(ee=O>>>4)<16)de[re++]=ee;else{var pe=0,K=0;for(ee==16?(K=3+T(w,x,3),x+=2,pe=de[re-1]):ee==17?(K=3+T(w,x,7),x+=3):ee==18&&(K=11+T(w,x,127),x+=7);K--;)de[re++]=pe}}var ie=de.subarray(0,Z),q=de.subarray(Z);E=b(ie),W=b(q),A=g(ie,E),D=g(q,W)}else C(1);if(x>I){J&&C(0);break}}N&&G(U+131072);for(var _e=(1<<E)-1,oe=(1<<W)-1,se=x;;se=x){var ue=(pe=A[R(w,x)&_e])>>>4;if((x+=15&pe)>I){J&&C(0);break}if(pe||C(2),ue<256)P[U++]=ue;else{if(ue==256){se=x,A=null;break}var ve=ue-254;if(ue>264){var Ue=t[re=ue-257];ve=T(w,x,(1<<Ue)-1)+i[re],x+=Ue}var je=D[R(w,x)&oe],xe=je>>>4;if(je||C(3),x+=15&je,q=u[xe],xe>3&&(Ue=e[xe],q+=R(w,x)&(1<<Ue)-1,x+=Ue),x>I){J&&C(0);break}N&&G(U+131072);for(var we=U+ve;U<we;U+=4)P[U]=P[U-q],P[U+1]=P[U+1-q],P[U+2]=P[U+2-q],P[U+3]=P[U+3-q];U=we}}j.l=A,j.p=se,j.b=U,A&&(z=1,j.m=E,j.d=D,j.n=W)}while(!z);return U==P.length?P:function(fe,Fe,Ce){(Ce==null||Ce>fe.length)&&(Ce=fe.length);var Ze=new(fe instanceof s?s:fe instanceof f?f:r)(Ce-Fe);return Ze.set(fe.subarray(Fe,Ce)),Ze}(P,0,U)},L=new r(0),H=typeof TextDecoder<"u"&&new TextDecoder;try{H.decode(L,{stream:!0})}catch{}return l.convert_streams=function(w){var P=new DataView(w),j=0;function Y(){var Z=P.getUint16(j);return j+=2,Z}function N(){var Z=P.getUint32(j);return j+=4,Z}function J(Z){Q.setUint16(te,Z),te+=2}function ae(Z){Q.setUint32(te,Z),te+=4}for(var G={signature:N(),flavor:N(),length:N(),numTables:Y(),reserved:Y(),totalSfntSize:N(),majorVersion:Y(),minorVersion:Y(),metaOffset:N(),metaLength:N(),metaOrigLength:N(),privOffset:N(),privLength:N()},z=0;Math.pow(2,z)<=G.numTables;)z++;z--;for(var x=16*Math.pow(2,z),U=16*G.numTables-x,A=12,D=[],E=0;E<G.numTables;E++)D.push({tag:N(),offset:N(),compLength:N(),origLength:N(),origChecksum:N()}),A+=16;var W,I=new Uint8Array(12+16*D.length+D.reduce(function(Z,V){return Z+V.origLength+4},0)),B=I.buffer,Q=new DataView(B),te=0;return ae(G.flavor),J(G.numTables),J(x),J(z),J(U),D.forEach(function(Z){ae(Z.tag),ae(Z.origChecksum),ae(A),ae(Z.origLength),Z.outOffset=A,(A+=Z.origLength)%4!=0&&(A+=4-A%4)}),D.forEach(function(Z){var V,ge=w.slice(Z.offset,Z.offset+Z.compLength);if(Z.compLength!=Z.origLength){var de=new Uint8Array(Z.origLength);V=new Uint8Array(ge,2),F(V,de)}else de=new Uint8Array(ge);I.set(de,Z.outOffset);var $=0;(A=Z.outOffset+Z.origLength)%4!=0&&($=4-A%4),I.set(new Uint8Array($).buffer,Z.outOffset+Z.origLength),W=A+$}),B.slice(0,W)},Object.defineProperty(l,"__esModule",{value:!0}),l}({}).convert_streams}function ss(l,r){const s={M:2,L:2,Q:4,C:6,Z:0},f={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},t=1,e=2,n=4,a=8,o=16,i=32;let c;function u(k){if(!c){const C={R:e,L:t,D:n,C:o,U:i,T:a};c=new Map;for(let F in f){let L=0;f[F].split(",").forEach(H=>{let[w,P]=H.split("+");w=parseInt(w,36),P=P?parseInt(P,36):0,c.set(L+=w,C[F]);for(let j=P;j--;)c.set(++L,C[F])})}}return c.get(k)||i}const h=1,p=2,m=3,g=4,y=[null,"isol","init","fina","medi"];function S(k){const C=new Uint8Array(k.length);let F=i,L=h,H=-1;for(let w=0;w<k.length;w++){const P=k.codePointAt(w);let j=u(P)|0,Y=h;j&a||(F&(t|n|o)?j&(e|n|o)?(Y=m,(L===h||L===m)&&C[H]++):j&(t|i)&&(L===p||L===g)&&C[H]--:F&(e|i)&&(L===p||L===g)&&C[H]--,L=C[w]=Y,F=j,H=w,P>65535&&w++)}return C}function M(k,C){const F=[];for(let H=0;H<C.length;H++){const w=C.codePointAt(H);w>65535&&H++,F.push(l.U.codeToGlyph(k,w))}const L=k.GSUB;if(L){const{lookupList:H,featureList:w}=L;let P;const j=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,Y=[];w.forEach(N=>{if(j.test(N.tag))for(let J=0;J<N.tab.length;J++){if(Y[N.tab[J]])continue;Y[N.tab[J]]=!0;const ae=H[N.tab[J]],G=/^(isol|init|fina|medi)$/.test(N.tag);G&&!P&&(P=S(C));for(let z=0;z<F.length;z++)(!P||!G||y[P[z]]===N.tag)&&l.U._applySubs(F,z,ae,H)}})}return F}function v(k,C){const F=new Int16Array(C.length*3);let L=0;for(;L<C.length;L++){const j=C[L];if(j===-1)continue;F[L*3+2]=k.hmtx.aWidth[j];const Y=k.GPOS;if(Y){const N=Y.lookupList;for(let J=0;J<N.length;J++){const ae=N[J];for(let G=0;G<ae.tabs.length;G++){const z=ae.tabs[G];if(ae.ltype===1){if(l._lctf.coverageIndex(z.coverage,j)!==-1&&z.pos){P(z.pos,L);break}}else if(ae.ltype===2){let x=null,U=H();if(U!==-1){const A=l._lctf.coverageIndex(z.coverage,C[U]);if(A!==-1){if(z.fmt===1){const D=z.pairsets[A];for(let E=0;E<D.length;E++)D[E].gid2===j&&(x=D[E])}else if(z.fmt===2){const D=l.U._getGlyphClass(C[U],z.classDef1),E=l.U._getGlyphClass(j,z.classDef2);x=z.matrix[D][E]}if(x){x.val1&&P(x.val1,U),x.val2&&P(x.val2,L);break}}}}else if(ae.ltype===4){const x=l._lctf.coverageIndex(z.markCoverage,j);if(x!==-1){const U=H(w),A=U===-1?-1:l._lctf.coverageIndex(z.baseCoverage,C[U]);if(A!==-1){const D=z.markArray[x],E=z.baseArray[A][D.markClass];F[L*3]=E.x-D.x+F[U*3]-F[U*3+2],F[L*3+1]=E.y-D.y+F[U*3+1];break}}}else if(ae.ltype===6){const x=l._lctf.coverageIndex(z.mark1Coverage,j);if(x!==-1){const U=H();if(U!==-1){const A=C[U];if(b(k,A)===3){const D=l._lctf.coverageIndex(z.mark2Coverage,A);if(D!==-1){const E=z.mark1Array[x],W=z.mark2Array[D][E.markClass];F[L*3]=W.x-E.x+F[U*3]-F[U*3+2],F[L*3+1]=W.y-E.y+F[U*3+1];break}}}}}}}}else if(k.kern&&!k.cff){const N=H();if(N!==-1){const J=k.kern.glyph1.indexOf(C[N]);if(J!==-1){const ae=k.kern.rval[J].glyph2.indexOf(j);ae!==-1&&(F[N*3+2]+=k.kern.rval[J].vals[ae])}}}}return F;function H(j){for(let Y=L-1;Y>=0;Y--)if(C[Y]!==-1&&(!j||j(C[Y])))return Y;return-1}function w(j){return b(k,j)===1}function P(j,Y){for(let N=0;N<3;N++)F[Y*3+N]+=j[N]||0}}function b(k,C){const F=k.GDEF&&k.GDEF.glyphClassDef;return F?l.U._getGlyphClass(C,F):0}function T(...k){for(let C=0;C<k.length;C++)if(typeof k[C]=="number")return k[C]}function R(k){const C=Object.create(null),F=k["OS/2"],L=k.hhea,H=k.head.unitsPerEm,w=T(F&&F.sTypoAscender,L&&L.ascender,H),P={unitsPerEm:H,ascender:w,descender:T(F&&F.sTypoDescender,L&&L.descender,0),capHeight:T(F&&F.sCapHeight,w),xHeight:T(F&&F.sxHeight,w),lineGap:T(F&&F.sTypoLineGap,L&&L.lineGap),supportsCodePoint(j){return l.U.codeToGlyph(k,j)>0},forEachGlyph(j,Y,N,J){let ae=0;const G=1/P.unitsPerEm*Y,z=M(k,j);let x=0;const U=v(k,z);return z.forEach((A,D)=>{if(A!==-1){let E=C[A];if(!E){const{cmds:W,crds:I}=l.U.glyphToPath(k,A);let B="",Q=0;for(let de=0,$=W.length;de<$;de++){const re=s[W[de]];B+=W[de];for(let ce=1;ce<=re;ce++)B+=(ce>1?",":"")+I[Q++]}let te,Z,V,ge;if(I.length){te=Z=1/0,V=ge=-1/0;for(let de=0,$=I.length;de<$;de+=2){let re=I[de],ce=I[de+1];re<te&&(te=re),ce<Z&&(Z=ce),re>V&&(V=re),ce>ge&&(ge=ce)}}else te=V=Z=ge=0;E=C[A]={index:A,advanceWidth:k.hmtx.aWidth[A],xMin:te,yMin:Z,xMax:V,yMax:ge,path:B}}J.call(null,E,ae+U[D*3]*G,U[D*3+1]*G,x),ae+=U[D*3+2]*G,N&&(ae+=N*Y)}x+=j.codePointAt(x)>65535?2:1}),ae}};return P}return function(C){const F=new Uint8Array(C,0,4),L=l._bin.readASCII(F,0,4);if(L==="wOFF")C=r(C);else if(L==="wOF2")throw new Error("woff2 fonts not supported");return R(l.parse(C)[0])}}const ls=Gt({name:"Typr Font Parser",dependencies:[as,is,ss],init(l,r,s){const f=l(),t=r();return s(f,t)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function cs(){return function(l){var r=function(){this.buckets=new Map};r.prototype.add=function(v){var b=v>>5;this.buckets.set(b,(this.buckets.get(b)||0)|1<<(31&v))},r.prototype.has=function(v){var b=this.buckets.get(v>>5);return b!==void 0&&(b&1<<(31&v))!=0},r.prototype.serialize=function(){var v=[];return this.buckets.forEach(function(b,T){v.push((+T).toString(36)+":"+b.toString(36))}),v.join(",")},r.prototype.deserialize=function(v){var b=this;this.buckets.clear(),v.split(",").forEach(function(T){var R=T.split(":");b.buckets.set(parseInt(R[0],36),parseInt(R[1],36))})};var s=Math.pow(2,8),f=s-1,t=~f;function e(v){var b=function(R){return R&t}(v).toString(16),T=function(R){return(R&t)+s-1}(v).toString(16);return"codepoint-index/plane"+(v>>16)+"/"+b+"-"+T+".json"}function n(v,b){var T=v&f,R=b.codePointAt(T/6|0);return((R=(R||48)-48)&1<<T%6)!=0}function a(v,b){var T;(T=v,T.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(R){return R.split("-").map(function(k){return parseInt(k.trim(),16)})})).forEach(function(R){var k=R[0],C=R[1];C===void 0&&(C=k),b(k,C)})}function o(v,b){a(v,function(T,R){for(var k=T;k<=R;k++)b(k)})}var i={},c={},u=new WeakMap,h="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function p(v){var b=u.get(v);return b||(b=new r,o(v.ranges,function(T){return b.add(T)}),u.set(v,b)),b}var m,g=new Map;function y(v,b,T){return v[b]?b:v[T]?T:function(R){for(var k in R)return k}(v)}function S(v,b){var T=b;if(!v.includes(T)){T=1/0;for(var R=0;R<v.length;R++)Math.abs(v[R]-b)<Math.abs(T-b)&&(T=v[R])}return T}function M(v){return m||(m=new Set,o("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(b){m.add(b)})),m.has(v)}return l.CodePointSet=r,l.clearCache=function(){i={},c={}},l.getFontsForString=function(v,b){b===void 0&&(b={});var T,R=b.lang;R===void 0&&(R=new RegExp("\\p{Script=Hangul}","u").test(T=v)?"ko":new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}","u").test(T)?"ja":"en");var k=b.category;k===void 0&&(k="sans-serif");var C=b.style;C===void 0&&(C="normal");var F=b.weight;F===void 0&&(F=400);var L=(b.dataUrl||h).replace(/\/$/g,""),H=new Map,w=new Uint8Array(v.length),P={},j={},Y=new Array(v.length),N=new Map,J=!1;function ae(x){var U=g.get(x);return U||(U=fetch(L+"/"+x).then(function(A){if(!A.ok)throw new Error(A.statusText);return A.json().then(function(D){if(!Array.isArray(D)||D[0]!==1)throw new Error("Incorrect schema version; need 1, got "+D[0]);return D[1]})}).catch(function(A){if(L!==h)return J||(J=!0),L=h,g.delete(x),ae(x);throw A}),g.set(x,U)),U}for(var G=function(x){var U=v.codePointAt(x),A=e(U);Y[x]=A,i[A]||N.has(A)||N.set(A,ae(A).then(function(D){i[A]=D})),U>65535&&(x++,z=x)},z=0;z<v.length;z++)G(z);return Promise.all(N.values()).then(function(){N.clear();for(var x=function(A){var D=v.codePointAt(A),E=null,W=i[Y[A]],I=void 0;for(var B in W){var Q=j[B];if(Q===void 0&&(Q=j[B]=new RegExp(B).test(R||"en")),Q){for(var te in I=B,W[B])if(n(D,W[B][te])){E=te;break}break}}if(!E){e:for(var Z in W)if(Z!==I){for(var V in W[Z])if(n(D,W[Z][V])){E=V;break e}}}E||(E="latin"),Y[A]=E,c[E]||N.has(E)||N.set(E,ae("font-meta/"+E+".json").then(function(ge){c[E]=ge})),D>65535&&(A++,U=A)},U=0;U<v.length;U++)x(U);return Promise.all(N.values())}).then(function(){for(var x,U=null,A=0;A<v.length;A++){var D=v.codePointAt(A);if(U&&(M(D)||p(U).has(D)))w[A]=w[A-1];else{U=c[Y[A]];var E=P[U.id];if(!E){var W=U.typeforms,I=y(W,k,"sans-serif"),B=y(W[I],C,"normal"),Q=S((x=W[I])===null||x===void 0?void 0:x[B],F);E=P[U.id]=L+"/font-files/"+U.id+"/"+I+"."+B+"."+Q+".woff"}var te=H.get(E);te==null&&(te=H.size,H.set(E,te)),w[A]=te}D>65535&&(A++,w[A]=w[A-1])}return{fontUrls:Array.from(H.keys()),chars:w}})},Object.defineProperty(l,"__esModule",{value:!0}),l}({})}function fs(l,r){const s=Object.create(null),f=Object.create(null);function t(n,a){const o=i=>{};try{const i=new XMLHttpRequest;i.open("get",n,!0),i.responseType="arraybuffer",i.onload=function(){if(i.status>=400)o(new Error(i.statusText));else if(i.status>0)try{const c=l(i.response);c.src=n,a(c)}catch(c){o(c)}},i.onerror=o,i.send()}catch(i){o(i)}}function e(n,a){let o=s[n];o?a(o):f[n]?f[n].push(a):(f[n]=[a],t(n,i=>{i.src=n,s[n]=i,f[n].forEach(c=>c(i)),delete f[n]}))}return function(n,a,{lang:o,fonts:i=[],style:c="normal",weight:u="normal",unicodeFontsURL:h}={}){const p=new Uint8Array(n.length),m=[];n.length||M();const g=new Map,y=[];if(c!=="italic"&&(c="normal"),typeof u!="number"&&(u=u==="bold"?700:400),i&&!Array.isArray(i)&&(i=[i]),i=i.slice().filter(b=>!b.lang||b.lang.test(o)).reverse(),i.length){let k=0;(function C(F=0){for(let L=F,H=n.length;L<H;L++){const w=n.codePointAt(L);if(k===1&&m[p[L-1]].supportsCodePoint(w)||/\s/.test(n[L]))p[L]=p[L-1],k===2&&(y[y.length-1][1]=L);else for(let P=p[L],j=i.length;P<=j;P++)if(P===j){const Y=k===2?y[y.length-1]:y[y.length]=[L,L];Y[1]=L,k=2}else{p[L]=P;const{src:Y,unicodeRange:N}=i[P];if(!N||v(w,N)){const J=s[Y];if(!J){e(Y,()=>{C(L)});return}if(J.supportsCodePoint(w)){let ae=g.get(J);typeof ae!="number"&&(ae=m.length,m.push(J),g.set(J,ae)),p[L]=ae,k=1;break}}}w>65535&&L+1<H&&(p[L+1]=p[L],L++,k===2&&(y[y.length-1][1]=L))}S()})()}else y.push([0,n.length-1]),S();function S(){if(y.length){const b=y.map(T=>n.substring(T[0],T[1]+1)).join(`
`);r.getFontsForString(b,{lang:o||void 0,style:c,weight:u,dataUrl:h}).then(({fontUrls:T,chars:R})=>{const k=m.length;let C=0;y.forEach(L=>{for(let H=0,w=L[1]-L[0];H<=w;H++)p[L[0]+H]=R[C++]+k;C++});let F=0;T.forEach((L,H)=>{e(L,w=>{m[H+k]=w,++F===T.length&&M()})})})}else M()}function M(){a({chars:p,fonts:m})}function v(b,T){for(let R=0;R<T.length;R++){const[k,C=k]=T[R];if(k<=b&&b<=C)return!0}return!1}}}const us=Gt({name:"FontResolver",dependencies:[fs,ls,cs],init(l,r,s){return l(r,s())}});function ds(l,r){const f=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,t="[^\\S\\u00A0]",e=new RegExp(`${t}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function n({text:m,lang:g,fonts:y,style:S,weight:M,preResolvedFonts:v,unicodeFontsURL:b},T){const R=({chars:k,fonts:C})=>{let F,L;const H=[];for(let w=0;w<k.length;w++)k[w]!==L?(L=k[w],H.push(F={start:w,end:w,fontObj:C[k[w]]})):F.end=w;T(H)};v?R(v):l(m,R,{lang:g,fonts:y,style:S,weight:M,unicodeFontsURL:b})}function a({text:m="",font:g,lang:y,sdfGlyphSize:S=64,fontSize:M=400,fontWeight:v=1,fontStyle:b="normal",letterSpacing:T=0,lineHeight:R="normal",maxWidth:k=1/0,direction:C,textAlign:F="left",textIndent:L=0,whiteSpace:H="normal",overflowWrap:w="normal",anchorX:P=0,anchorY:j=0,metricsOnly:Y=!1,unicodeFontsURL:N,preResolvedFonts:J=null,includeCaretPositions:ae=!1,chunkedBoundsSize:G=8192,colorRanges:z=null},x){const U=u(),A={fontLoad:0,typesetting:0};m.indexOf("\r")>-1&&(m=m.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),M=+M,T=+T,k=+k,R=R||"normal",L=+L,n({text:m,lang:y,style:b,weight:v,fonts:typeof g=="string"?[{src:g}]:g,unicodeFontsURL:N,preResolvedFonts:J},D=>{A.fontLoad=u()-U;const E=isFinite(k);let W=null,I=null,B=null,Q=null,te=null,Z=null,V=null,ge=null,de=0,$=0,re=H!=="nowrap";const ce=new Map,X=u();let ne=L,ee=0,O=new h;const pe=[O];D.forEach(oe=>{const{fontObj:se}=oe,{ascender:ue,descender:ve,unitsPerEm:Ue,lineGap:je,capHeight:xe,xHeight:we}=se;let fe=ce.get(se);if(!fe){const he=M/Ue,Me=R==="normal"?(ue-ve+je)*he:R*M,gt=(Me-(ue-ve)*he)/2,Te=Math.min(Me,(ue-ve)*he),be=(ue+ve)/2*he+Te/2;fe={index:ce.size,src:se.src,fontObj:se,fontSizeMult:he,unitsPerEm:Ue,ascender:ue*he,descender:ve*he,capHeight:xe*he,xHeight:we*he,lineHeight:Me,baseline:-gt-ue*he,caretTop:be,caretBottom:be-Te},ce.set(se,fe)}const{fontSizeMult:Fe}=fe,Ce=m.slice(oe.start,oe.end+1);let Ze,ke;se.forEachGlyph(Ce,M,T,(he,Me,gt,Te)=>{Me+=ee,Te+=oe.start,Ze=Me,ke=he;const be=m.charAt(Te),Le=he.advanceWidth*Fe,Ae=O.count;let me;if("isEmpty"in he||(he.isWhitespace=!!be&&new RegExp(t).test(be),he.canBreakAfter=!!be&&e.test(be),he.isEmpty=he.xMin===he.xMax||he.yMin===he.yMax||f.test(be)),!he.isWhitespace&&!he.isEmpty&&$++,re&&E&&!he.isWhitespace&&Me+Le+ne>k&&Ae){if(O.glyphAt(Ae-1).glyphObj.canBreakAfter)me=new h,ne=-Me;else for(let Ve=Ae;Ve--;)if(Ve===0&&w==="break-word"){me=new h,ne=-Me;break}else if(O.glyphAt(Ve).glyphObj.canBreakAfter){me=O.splitAt(Ve+1);const Ne=me.glyphAt(0).x;ne-=Ne;for(let De=me.count;De--;)me.glyphAt(De).x-=Ne;break}me&&(O.isSoftWrapped=!0,O=me,pe.push(O),de=k)}let Ee=O.glyphAt(O.count);Ee.glyphObj=he,Ee.x=Me+ne,Ee.y=gt,Ee.width=Le,Ee.charIndex=Te,Ee.fontData=fe,be===`
`&&(O=new h,pe.push(O),ne=-(Me+Le+T*M)+L)}),ee=Ze+ke.advanceWidth*Fe+T*M});let K=0;pe.forEach(oe=>{let se=!0;for(let ue=oe.count;ue--;){const ve=oe.glyphAt(ue);se&&!ve.glyphObj.isWhitespace&&(oe.width=ve.x+ve.width,oe.width>de&&(de=oe.width),se=!1);let{lineHeight:Ue,capHeight:je,xHeight:xe,baseline:we}=ve.fontData;Ue>oe.lineHeight&&(oe.lineHeight=Ue);const fe=we-oe.baseline;fe<0&&(oe.baseline+=fe,oe.cap+=fe,oe.ex+=fe),oe.cap=Math.max(oe.cap,oe.baseline+je),oe.ex=Math.max(oe.ex,oe.baseline+xe)}oe.baseline-=K,oe.cap-=K,oe.ex-=K,K+=oe.lineHeight});let ie=0,q=0;if(P&&(typeof P=="number"?ie=-P:typeof P=="string"&&(ie=-de*(P==="left"?0:P==="center"?.5:P==="right"?1:i(P)))),j&&(typeof j=="number"?q=-j:typeof j=="string"&&(q=j==="top"?0:j==="top-baseline"?-pe[0].baseline:j==="top-cap"?-pe[0].cap:j==="top-ex"?-pe[0].ex:j==="middle"?K/2:j==="bottom"?K:j==="bottom-baseline"?-pe[pe.length-1].baseline:i(j)*K)),!Y){const oe=r.getEmbeddingLevels(m,C);W=new Uint16Array($),I=new Uint8Array($),B=new Float32Array($*2),Q={},V=[1/0,1/0,-1/0,-1/0],ge=[],ae&&(Z=new Float32Array(m.length*4)),z&&(te=new Uint8Array($*3));let se=0,ue=-1,ve=-1,Ue,je;if(pe.forEach((xe,we)=>{let{count:fe,width:Fe}=xe;if(fe>0){let Ce=0;for(let Te=fe;Te--&&xe.glyphAt(Te).glyphObj.isWhitespace;)Ce++;let Ze=0,ke=0;if(F==="center")Ze=(de-Fe)/2;else if(F==="right")Ze=de-Fe;else if(F==="justify"&&xe.isSoftWrapped){let Te=0;for(let be=fe-Ce;be--;)xe.glyphAt(be).glyphObj.isWhitespace&&Te++;ke=(de-Fe)/Te}if(ke||Ze){let Te=0;for(let be=0;be<fe;be++){let Le=xe.glyphAt(be);const Ae=Le.glyphObj;Le.x+=Ze+Te,ke!==0&&Ae.isWhitespace&&be<fe-Ce&&(Te+=ke,Le.width+=ke)}}const he=r.getReorderSegments(m,oe,xe.glyphAt(0).charIndex,xe.glyphAt(xe.count-1).charIndex);for(let Te=0;Te<he.length;Te++){const[be,Le]=he[Te];let Ae=1/0,me=-1/0;for(let Ee=0;Ee<fe;Ee++)if(xe.glyphAt(Ee).charIndex>=be){let Ve=Ee,Ne=Ee;for(;Ne<fe;Ne++){let De=xe.glyphAt(Ne);if(De.charIndex>Le)break;Ne<fe-Ce&&(Ae=Math.min(Ae,De.x),me=Math.max(me,De.x+De.width))}for(let De=Ve;De<Ne;De++){const rt=xe.glyphAt(De);rt.x=me-(rt.x+rt.width-Ae)}break}}let Me;const gt=Te=>Me=Te;for(let Te=0;Te<fe;Te++){const be=xe.glyphAt(Te);Me=be.glyphObj;const Le=Me.index,Ae=oe.levels[be.charIndex]&1;if(Ae){const me=r.getMirroredCharacter(m[be.charIndex]);me&&be.fontData.fontObj.forEachGlyph(me,0,0,gt)}if(ae){const{charIndex:me,fontData:Ee}=be,Ve=be.x+ie,Ne=be.x+be.width+ie;Z[me*4]=Ae?Ne:Ve,Z[me*4+1]=Ae?Ve:Ne,Z[me*4+2]=xe.baseline+Ee.caretBottom+q,Z[me*4+3]=xe.baseline+Ee.caretTop+q;const De=me-ue;De>1&&c(Z,ue,De),ue=me}if(z){const{charIndex:me}=be;for(;me>ve;)ve++,z.hasOwnProperty(ve)&&(je=z[ve])}if(!Me.isWhitespace&&!Me.isEmpty){const me=se++,{fontSizeMult:Ee,src:Ve,index:Ne}=be.fontData,De=Q[Ve]||(Q[Ve]={});De[Le]||(De[Le]={path:Me.path,pathBounds:[Me.xMin,Me.yMin,Me.xMax,Me.yMax]});const rt=be.x+ie,yt=be.y+xe.baseline+q;B[me*2]=rt,B[me*2+1]=yt;const ht=rt+Me.xMin*Ee,xt=yt+Me.yMin*Ee,St=rt+Me.xMax*Ee,pt=yt+Me.yMax*Ee;ht<V[0]&&(V[0]=ht),xt<V[1]&&(V[1]=xt),St>V[2]&&(V[2]=St),pt>V[3]&&(V[3]=pt),me%G===0&&(Ue={start:me,end:me,rect:[1/0,1/0,-1/0,-1/0]},ge.push(Ue)),Ue.end++;const He=Ue.rect;if(ht<He[0]&&(He[0]=ht),xt<He[1]&&(He[1]=xt),St>He[2]&&(He[2]=St),pt>He[3]&&(He[3]=pt),W[me]=Le,I[me]=Ne,z){const _t=me*3;te[_t]=je>>16&255,te[_t+1]=je>>8&255,te[_t+2]=je&255}}}}}),Z){const xe=m.length-ue;xe>1&&c(Z,ue,xe)}}const _e=[];ce.forEach(({index:oe,src:se,unitsPerEm:ue,ascender:ve,descender:Ue,lineHeight:je,capHeight:xe,xHeight:we})=>{_e[oe]={src:se,unitsPerEm:ue,ascender:ve,descender:Ue,lineHeight:je,capHeight:xe,xHeight:we}}),A.typesetting=u()-X,x({glyphIds:W,glyphFontIndices:I,glyphPositions:B,glyphData:Q,fontData:_e,caretPositions:Z,glyphColors:te,chunkedBounds:ge,fontSize:M,topBaseline:q+pe[0].baseline,blockBounds:[ie,q-K,ie+de,q],visibleBounds:V,timings:A})})}function o(m,g){a({...m,metricsOnly:!0},y=>{const[S,M,v,b]=y.blockBounds;g({width:v-S,height:b-M})})}function i(m){let g=m.match(/^([\d.]+)%$/),y=g?parseFloat(g[1]):NaN;return isNaN(y)?0:y/100}function c(m,g,y){const S=m[g*4],M=m[g*4+1],v=m[g*4+2],b=m[g*4+3],T=(M-S)/y;for(let R=0;R<y;R++){const k=(g+R)*4;m[k]=S+T*R,m[k+1]=S+T*(R+1),m[k+2]=v,m[k+3]=b}}function u(){return(self.performance||Date).now()}function h(){this.data=[]}const p=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/p.length)},glyphAt(m){let g=h.flyweight;return g.data=this.data,g.index=m,g},splitAt(m){let g=new h;return g.data=this.data.splice(m*p.length),g}},h.flyweight=p.reduce((m,g,y,S)=>(Object.defineProperty(m,g,{get(){return this.data[this.index*p.length+y]},set(M){this.data[this.index*p.length+y]=M}}),m),{data:null,index:0}),{typeset:a,measure:o}}const kt=()=>(self.performance||Date).now(),Or=ga();let Jo;function hs(l,r,s,f,t,e,n,a,o,i,c=!0){return c?vs(l,r,s,f,t,e,n,a,o,i).then(null,u=>(Jo||(Jo=!0),$o(l,r,s,f,t,e,n,a,o,i))):$o(l,r,s,f,t,e,n,a,o,i)}const Fr=[],ps=5;let Tn=0;function xa(){const l=kt();for(;Fr.length&&kt()-l<ps;)Fr.shift()();Tn=Fr.length?setTimeout(xa,0):0}const vs=(...l)=>new Promise((r,s)=>{Fr.push(()=>{const f=kt();try{Or.webgl.generateIntoCanvas(...l),r({timing:kt()-f})}catch(t){s(t)}}),Tn||(Tn=setTimeout(xa,0))}),ms=4,gs=2e3,Ko={};let ys=0;function $o(l,r,s,f,t,e,n,a,o,i){const c="TroikaTextSDFGenerator_JS_"+ys++%ms;let u=Ko[c];return u||(u=Ko[c]={workerModule:Gt({name:c,workerId:c,dependencies:[ga,kt],init(h,p){const m=h().javascript.generate;return function(...g){const y=p();return{textureData:m(...g),timing:p()-y}}},getTransferables(h){return[h.textureData.buffer]}}),requests:0,idleTimer:null}),u.requests++,clearTimeout(u.idleTimer),u.workerModule(l,r,s,f,t,e).then(({textureData:h,timing:p})=>{const m=kt(),g=new Uint8Array(h.length*4);for(let y=0;y<h.length;y++)g[y*4+i]=h[y];return Or.webglUtils.renderImageData(n,g,a,o,l,r,1<<3-i),p+=kt()-m,--u.requests===0&&(u.idleTimer=setTimeout(()=>{qi(c)},gs)),{timing:p}})}function xs(l){l._warm||(Or.webgl.isSupported(l),l._warm=!0)}const ws=Or.webglUtils.resizeWebGLCanvasWithoutClearing,ar={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},bs=new Re;function Pt(){return(self.performance||Date).now()}const ea=Object.create(null);function wa(l,r){l=Ms({},l);const s=Pt(),f=[];if(l.font&&f.push({label:"user",src:Ts(l.font)}),l.font=f,l.text=""+l.text,l.sdfGlyphSize=l.sdfGlyphSize||ar.sdfGlyphSize,l.unicodeFontsURL=l.unicodeFontsURL||ar.unicodeFontsURL,l.colorRanges!=null){let u={};for(let h in l.colorRanges)if(l.colorRanges.hasOwnProperty(h)){let p=l.colorRanges[h];typeof p!="number"&&(p=bs.set(p).getHex()),u[h]=p}l.colorRanges=u}Object.freeze(l);const{textureWidth:t,sdfExponent:e}=ar,{sdfGlyphSize:n}=l,a=t/n*4;let o=ea[n];if(!o){const u=document.createElement("canvas");u.width=t,u.height=n*256/a,o=ea[n]={glyphCount:0,sdfGlyphSize:n,sdfCanvas:u,sdfTexture:new Ya(u,void 0,void 0,void 0,no,no),contextLost:!1,glyphsByFont:new Map},o.sdfTexture.generateMipmaps=!1,Ss(o)}const{sdfTexture:i,sdfCanvas:c}=o;ks(l).then(u=>{const{glyphIds:h,glyphFontIndices:p,fontData:m,glyphPositions:g,fontSize:y,timings:S}=u,M=[],v=new Float32Array(h.length*4);let b=0,T=0;const R=Pt(),k=m.map(w=>{let P=o.glyphsByFont.get(w.src);return P||o.glyphsByFont.set(w.src,P=new Map),P});h.forEach((w,P)=>{const j=p[P],{src:Y,unitsPerEm:N}=m[j];let J=k[j].get(w);if(!J){const{path:U,pathBounds:A}=u.glyphData[Y][w],D=Math.max(A[2]-A[0],A[3]-A[1])/n*(ar.sdfMargin*n+.5),E=o.glyphCount++,W=[A[0]-D,A[1]-D,A[2]+D,A[3]+D];k[j].set(w,J={path:U,atlasIndex:E,sdfViewBox:W}),M.push(J)}const{sdfViewBox:ae}=J,G=g[T++],z=g[T++],x=y/N;v[b++]=G+ae[0]*x,v[b++]=z+ae[1]*x,v[b++]=G+ae[2]*x,v[b++]=z+ae[3]*x,h[P]=J.atlasIndex}),S.quads=(S.quads||0)+(Pt()-R);const C=Pt();S.sdf={};const F=c.height,L=Math.ceil(o.glyphCount/a),H=Math.pow(2,Math.ceil(Math.log2(L*n)));H>F&&(ws(c,t,H),i.dispose()),Promise.all(M.map(w=>ba(w,o,l.gpuAccelerateSDF).then(({timing:P})=>{S.sdf[w.atlasIndex]=P}))).then(()=>{M.length&&!o.contextLost&&(Sa(o),i.needsUpdate=!0),S.sdfTotal=Pt()-C,S.total=Pt()-s,r(Object.freeze({parameters:l,sdfTexture:i,sdfGlyphSize:n,sdfExponent:e,glyphBounds:v,glyphAtlasIndices:h,glyphColors:u.glyphColors,caretPositions:u.caretPositions,chunkedBounds:u.chunkedBounds,ascender:u.ascender,descender:u.descender,lineHeight:u.lineHeight,capHeight:u.capHeight,xHeight:u.xHeight,topBaseline:u.topBaseline,blockBounds:u.blockBounds,visibleBounds:u.visibleBounds,timings:u.timings}))})}),Promise.resolve().then(()=>{o.contextLost||xs(c)})}function ba({path:l,atlasIndex:r,sdfViewBox:s},{sdfGlyphSize:f,sdfCanvas:t,contextLost:e},n){if(e)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:o}=ar,i=Math.max(s[2]-s[0],s[3]-s[1]),c=Math.floor(r/4),u=c%(a/f)*f,h=Math.floor(c/(a/f))*f,p=r%4;return hs(f,f,l,s,i,o,t,u,h,p,n)}function Ss(l){const r=l.sdfCanvas;r.addEventListener("webglcontextlost",s=>{s.preventDefault(),l.contextLost=!0}),r.addEventListener("webglcontextrestored",s=>{l.contextLost=!1;const f=[];l.glyphsByFont.forEach(t=>{t.forEach(e=>{f.push(ba(e,l,!0))})}),Promise.all(f).then(()=>{Sa(l),l.sdfTexture.needsUpdate=!0})})}function _s({font:l,characters:r,sdfGlyphSize:s},f){let t=Array.isArray(r)?r.join(`
`):""+r;wa({font:l,sdfGlyphSize:s,text:t},f)}function Ms(l,r){for(let s in r)r.hasOwnProperty(s)&&(l[s]=r[s]);return l}let Ar;function Ts(l){return Ar||(Ar=typeof document>"u"?{}:document.createElement("a")),Ar.href=l,Ar.href}function Sa(l){if(typeof createImageBitmap!="function"){const{sdfCanvas:r,sdfTexture:s}=l,{width:f,height:t}=r,e=l.sdfCanvas.getContext("webgl");let n=s.image.data;(!n||n.length!==f*t*4)&&(n=new Uint8Array(f*t*4),s.image={width:f,height:t,data:n},s.flipY=!1,s.isDataTexture=!0),e.readPixels(0,0,f,t,e.RGBA,e.UNSIGNED_BYTE,n)}}const Us=Gt({name:"Typesetter",dependencies:[ds,us,Ji],init(l,r,s){return l(r,s())}}),ks=Gt({name:"Typesetter",dependencies:[Us],init(l){return function(r){return new Promise(s=>{l.typeset(r,s)})}},getTransferables(l){const r=[];for(let s in l)l[s]&&l[s].buffer&&r.push(l[s].buffer);return r}}),ta={};function Cs(l){let r=ta[l];if(!r){const s=new ur(1,1,l,l),f=s.clone(),t=s.attributes,e=f.attributes,n=new qa,a=t.uv.count;for(let o=0;o<a;o++)e.position.array[o*3]*=-1,e.normal.array[o*3+2]*=-1;["position","normal","uv"].forEach(o=>{n.setAttribute(o,new gn([...t[o].array,...e[o].array],t[o].itemSize))}),n.setIndex([...s.index.array,...f.index.array.map(o=>o+a)]),n.translate(.5,.5,0),r=ta[l]=n}return r}const As="aTroikaGlyphBounds",ra="aTroikaGlyphIndex",Es="aTroikaGlyphColor";class Rs extends sa{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new Cn,this.boundingBox=new Ir}computeBoundingSphere(){}computeBoundingBox(){}setSide(r){const s=this.getIndex().count;this.setDrawRange(r===We?s/2:0,r===Je?s:s/2)}set detail(r){if(r!==this._detail){this._detail=r,(typeof r!="number"||r<1)&&(r=1);let s=Cs(r);["position","normal","uv"].forEach(f=>{this.attributes[f]=s.attributes[f].clone()}),this.setIndex(s.getIndex().clone())}}get detail(){return this._detail}set curveRadius(r){r!==this._curveRadius&&(this._curveRadius=r,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(r,s,f,t,e){hn(this,As,r,4),hn(this,ra,s,1),hn(this,Es,e,3),this._blockBounds=f,this._chunkedBounds=t,this.instanceCount=s.length,this._updateBounds()}_updateBounds(){const r=this._blockBounds;if(r){const{curveRadius:s,boundingBox:f}=this;if(s){const{PI:t,floor:e,min:n,max:a,sin:o,cos:i}=Math,c=t/2,u=t*2,h=Math.abs(s),p=r[0]/h,m=r[2]/h,g=e((p+c)/u)!==e((m+c)/u)?-h:n(o(p)*h,o(m)*h),y=e((p-c)/u)!==e((m-c)/u)?h:a(o(p)*h,o(m)*h),S=e((p+t)/u)!==e((m+t)/u)?h*2:a(h-i(p)*h,h-i(m)*h);f.min.set(g,r[1],s<0?-S:0),f.max.set(y,r[3],s<0?0:S)}else f.min.set(r[0],r[1],0),f.max.set(r[2],r[3],0);f.getBoundingSphere(this.boundingSphere)}}applyClipRect(r){let s=this.getAttribute(ra).count,f=this._chunkedBounds;if(f)for(let t=f.length;t--;){s=f[t].end;let e=f[t].rect;if(e[1]<r.w&&e[3]>r.y&&e[0]<r.z&&e[2]>r.x)break}this.instanceCount=s}}function hn(l,r,s,f){const t=l.getAttribute(r);s?t&&t.array.length===s.length?(t.array.set(s),t.needsUpdate=!0):(l.setAttribute(r,new Qa(s,f)),delete l._maxInstanceCount,l.dispose()):t&&l.deleteAttribute(r)}const js=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaDistanceOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,Fs=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaDistanceOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaDistanceOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,Ls=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaDistanceOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaOutlineOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,Ps=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaDistanceOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function Ds(l){const r=Mn(l,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new mt},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new et(0,0,0,0)},uTroikaClipRect:{value:new et(0,0,0,0)},uTroikaDistanceOffset:{value:0},uTroikaOutlineOpacity:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new mt},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new Re},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Za},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:js,vertexTransform:Fs,fragmentDefs:Ls,fragmentColorTransform:Ps,customRewriter({vertexShader:s,fragmentShader:f}){let t=/\buniform\s+vec3\s+diffuse\b/;return t.test(f)&&(f=f.replace(t,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),t.test(s)||(s=s.replace(ya,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:s,fragmentShader:f}}});return r.transparent=!0,Object.defineProperties(r,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),r}const jn=new Xa({color:16777215,side:Je,transparent:!0}),na=8421504,oa=new Dr,Er=new ye,pn=new ye,or=[],Is=new ye,vn="+x+y";function aa(l){return Array.isArray(l)?l[0]:l}let _a=()=>{const l=new zr(new ur(1,1),jn);return _a=()=>l,l},Ma=()=>{const l=new zr(new ur(1,1,32,1),jn);return Ma=()=>l,l};const zs={type:"syncstart"},Os={type:"synccomplete"},Ta=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],Bs=Ta.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");let Ua=class extends zr{constructor(){const r=new Rs;super(r,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=na,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=vn,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(r){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(r):(this._isSyncing=!0,this.dispatchEvent(zs),wa({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},s=>{this._isSyncing=!1,this._textRenderInfo=s,this.geometry.updateGlyphs(s.glyphBounds,s.glyphAtlasIndices,s.blockBounds,s.chunkedBounds,s.glyphColors);const f=this._queuedSyncs;f&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{f.forEach(t=>t&&t())})),this.dispatchEvent(Os),r&&r()})))}onBeforeRender(r,s,f,t,e,n){this.sync(),e.isTroikaTextMaterial&&this._prepareForRender(e),e._hadOwnSide=e.hasOwnProperty("side"),this.geometry.setSide(e._actualSide=e.side),e.side=Ha}onAfterRender(r,s,f,t,e,n){e._hadOwnSide?e.side=e._actualSide:delete e.side}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}get material(){let r=this._derivedMaterial;const s=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=jn.clone());if((!r||r.baseMaterial!==s)&&(r=this._derivedMaterial=Ds(s),s.addEventListener("dispose",function f(){s.removeEventListener("dispose",f),r.dispose()})),this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY){let f=r._outlineMtl;return f||(f=r._outlineMtl=Object.create(r,{id:{value:r.id+.1}}),f.isTextOutlineMaterial=!0,f.depthWrite=!1,f.map=null,r.addEventListener("dispose",function t(){r.removeEventListener("dispose",t),f.dispose()})),[f,r]}else return r}set material(r){r&&r.isTroikaTextMaterial?(this._derivedMaterial=r,this._baseMaterial=r.baseMaterial):this._baseMaterial=r}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(r){this.geometry.detail=r}get curveRadius(){return this.geometry.curveRadius}set curveRadius(r){this.geometry.curveRadius=r}get customDepthMaterial(){return aa(this.material).getDepthMaterial()}get customDistanceMaterial(){return aa(this.material).getDistanceMaterial()}_prepareForRender(r){const s=r.isTextOutlineMaterial,f=r.uniforms,t=this.textRenderInfo;if(t){const{sdfTexture:a,blockBounds:o}=t;f.uTroikaSDFTexture.value=a,f.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),f.uTroikaSDFGlyphSize.value=t.sdfGlyphSize,f.uTroikaSDFExponent.value=t.sdfExponent,f.uTroikaTotalBounds.value.fromArray(o),f.uTroikaUseGlyphColors.value=!s&&!!t.glyphColors;let i=0,c=0,u=0,h,p,m,g=0,y=0;if(s){let{outlineWidth:M,outlineOffsetX:v,outlineOffsetY:b,outlineBlur:T,outlineOpacity:R}=this;i=this._parsePercent(M)||0,c=Math.max(0,this._parsePercent(T)||0),h=R,g=this._parsePercent(v)||0,y=this._parsePercent(b)||0}else u=Math.max(0,this._parsePercent(this.strokeWidth)||0),u&&(m=this.strokeColor,f.uTroikaStrokeColor.value.set(m??na),p=this.strokeOpacity,p==null&&(p=1)),h=this.fillOpacity;f.uTroikaDistanceOffset.value=i,f.uTroikaPositionOffset.value.set(g,y),f.uTroikaBlurRadius.value=c,f.uTroikaStrokeWidth.value=u,f.uTroikaStrokeOpacity.value=p,f.uTroikaFillOpacity.value=h??1,f.uTroikaCurveRadius.value=this.curveRadius||0;let S=this.clipRect;if(S&&Array.isArray(S)&&S.length===4)f.uTroikaClipRect.value.fromArray(S);else{const M=(this.fontSize||.1)*100;f.uTroikaClipRect.value.set(o[0]-M,o[1]-M,o[2]+M,o[3]+M)}this.geometry.applyClipRect(f.uTroikaClipRect.value)}f.uTroikaSDFDebug.value=!!this.debugSDF,r.polygonOffset=!!this.depthOffset,r.polygonOffsetFactor=r.polygonOffsetUnits=this.depthOffset||0;const e=s?this.outlineColor||0:this.color;if(e==null)delete r.color;else{const a=r.hasOwnProperty("color")?r.color:r.color=new Re;(e!==a._input||typeof e=="object")&&a.set(a._input=e)}let n=this.orientation||vn;if(n!==r._orientation){let a=f.uTroikaOrient.value;n=n.replace(/[^-+xyz]/g,"");let o=n!==vn&&n.match(/^([-+])([xyz])([-+])([xyz])$/);if(o){let[,i,c,u,h]=o;Er.set(0,0,0)[c]=i==="-"?1:-1,pn.set(0,0,0)[h]=u==="-"?-1:1,oa.lookAt(Is,Er.cross(pn),pn),a.setFromMatrix4(oa)}else a.identity();r._orientation=n}}_parsePercent(r){if(typeof r=="string"){let s=r.match(/^(-?[\d.]+)%$/),f=s?parseFloat(s[1]):NaN;r=(isNaN(f)?0:f/100)*this.fontSize}return r}localPositionToTextCoords(r,s=new mt){s.copy(r);const f=this.curveRadius;return f&&(s.x=Math.atan2(r.x,Math.abs(f)-Math.abs(r.z))*Math.abs(f)),s}worldPositionToTextCoords(r,s=new mt){return Er.copy(r),this.localPositionToTextCoords(this.worldToLocal(Er),s)}raycast(r,s){const{textRenderInfo:f,curveRadius:t}=this;if(f){const e=f.blockBounds,n=t?Ma():_a(),a=n.geometry,{position:o,uv:i}=a.attributes;for(let c=0;c<i.count;c++){let u=e[0]+i.getX(c)*(e[2]-e[0]);const h=e[1]+i.getY(c)*(e[3]-e[1]);let p=0;t&&(p=t-Math.cos(u/t)*t,u=Math.sin(u/t)*t),o.setXYZ(c,u,h,p)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,n.matrixWorld=this.matrixWorld,n.material.side=this.material.side,or.length=0,n.raycast(r,or);for(let c=0;c<or.length;c++)or[c].object=this,s.push(or[c])}}copy(r){const s=this.geometry;return super.copy(r),this.geometry=s,Bs.forEach(f=>{this[f]=r[f]}),this}clone(){return new this.constructor().copy(this)}};Ta.forEach(l=>{const r="_private_"+l;Object.defineProperty(Ua.prototype,l,{get(){return this[r]},set(s){s!==this[r]&&(this[r]=s,this._needsSync=!0)}})});const Pe=_.forwardRef(({sdfGlyphSize:l=64,anchorX:r="center",anchorY:s="middle",font:f,fontSize:t=1,children:e,characters:n,onSync:a,...o},i)=>{const c=fr(({invalidate:m})=>m),[u]=_.useState(()=>new Ua),[h,p]=_.useMemo(()=>{const m=[];let g="";return _.Children.forEach(e,y=>{typeof y=="string"||typeof y=="number"?g+=y:m.push(y)}),[m,g]},[e]);return Ja(()=>new Promise(m=>_s({font:f,characters:n},m)),["troika-text",f,n]),_.useLayoutEffect(()=>void u.sync(()=>{c(),a&&a(u)})),_.useEffect(()=>()=>u.dispose(),[u]),_.createElement("primitive",zt({object:u,ref:i,font:f,text:p,anchorX:r,anchorY:s,fontSize:t,sdfGlyphSize:l},o),h)}),Br=_.forwardRef(({children:l,enabled:r=!0,speed:s=1,rotationIntensity:f=1,floatIntensity:t=1,floatingRange:e=[-.1,.1],autoInvalidate:n=!1,...a},o)=>{const i=_.useRef(null);_.useImperativeHandle(o,()=>i.current,[]);const c=_.useRef(Math.random()*1e4);return Se(u=>{var h,p;if(!r||s===0)return;n&&u.invalidate();const m=c.current+u.clock.getElapsedTime();i.current.rotation.x=Math.cos(m/4*s)/8*f,i.current.rotation.y=Math.sin(m/4*s)/8*f,i.current.rotation.z=Math.sin(m/4*s)/20*f;let g=Math.sin(m/4*s)/10;g=Xe.mapLinear(g,-.1,.1,(h=e==null?void 0:e[0])!==null&&h!==void 0?h:-.1,(p=e==null?void 0:e[1])!==null&&p!==void 0?p:.1),i.current.position.y=g*t,i.current.updateMatrix()}),_.createElement("group",a,_.createElement("group",{ref:i,matrixAutoUpdate:!1},l))}),Gs=({position:l})=>{const r=_.useRef();st();const[s,f]=_.useState(null);return _.useEffect(()=>{new tt().load("/assets/images/digital_fire.jpg",t=>{t.colorSpace=it,f(t)})},[]),Se(t=>{if(r.current){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9;const n=1+Math.sin(t.clock.elapsedTime*5)*.1;r.current.scale.setScalar(n)}}),s?d.jsx("group",{position:l,children:d.jsx(va,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:d.jsxs("mesh",{ref:r,position:[0,20,0],children:[d.jsx("planeGeometry",{args:[40,40]}),d.jsx("meshBasicMaterial",{map:s,transparent:!0,opacity:0,depthWrite:!1,blending:Ye})]})})}):null},Ns=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ws=`
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
`,Vs=({position:l,angle:r,delay:s})=>{const f=_.useRef(),t=_.useRef();st();const e=_.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new Re("#44aaff")},uPartyColor:{value:new Re("#ff8844")}}),[]);return Se(n=>{if(!f.current||!t.current)return;e.uTime.value=n.clock.elapsedTime;const a=window.icebreakerThaw||0,o=Xe.clamp((a-s)*2,0,1);e.uState.value=o;const i=Math.sin(n.clock.elapsedTime*8+s*10)*o;if(f.current.position.y=l[1]+(i>0?i*2:0)+15,o>0){const c=0-l[0],u=0-(l[2]- -200),h=Math.sqrt(c*c+u*u)||1;f.current.position.x=l[0]+c/h*(o*20),f.current.position.z=l[2]+u/h*(o*20)}else f.current.position.x=l[0],f.current.position.z=l[2]}),d.jsx("group",{ref:f,position:[l[0],l[1]+15,l[2]],children:d.jsx(va,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:d.jsxs("mesh",{children:[d.jsx("planeGeometry",{args:[20,30]}),d.jsx("shaderMaterial",{ref:t,vertexShader:Ns,fragmentShader:Ws,uniforms:e,transparent:!0,side:Je,depthWrite:!1})]})})})},Hs=({position:l})=>{const s=_.useMemo(()=>{const f=[];for(let t=0;t<60;t++){const e=Math.random()*Math.PI*2,n=30+Math.random()*80;f.push({position:[l[0]+Math.cos(e)*n,l[1],l[2]+Math.sin(e)*n],angle:e,delay:Math.random()*.5})}return f},[60,l]);return d.jsx("group",{children:s.map((f,t)=>d.jsx(Vs,{...f},t))})},Xs=({position:l})=>{const r=_.useRef(),[s,f]=_.useState(null);return st(),_.useEffect(()=>{new tt().load("/icebreaker_logo.png",t=>{t.colorSpace=it,f(t)})},[]),Se(t=>{if(r.current&&(r.current.rotation.y=t.clock.elapsedTime*.5,r.current.position.y=l[1]+Math.sin(t.clock.elapsedTime*2)*5,r.current.material)){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9,r.current.scale.setScalar(.01+e)}}),s?d.jsxs("mesh",{ref:r,position:l,children:[d.jsx("planeGeometry",{args:[40,40]}),d.jsx("meshBasicMaterial",{map:s,transparent:!0,opacity:0,depthWrite:!1,blending:Ye,side:Je})]}):null},Ys=({numTrees:l=30,radius:r=50,centerZ:s=-500})=>{const f=_.useRef(),t=_.useRef();st();const e=_.useMemo(()=>new Ot,[]),n=_.useMemo(()=>{const a=[];for(let o=0;o<l;o++){const i=o/l*Math.PI*2+Math.random()*.5,c=r+Math.random()*20;a.push({position:new ye(Math.cos(i)*c,-18,Math.sin(i)*c+s),rotation:new kn(0,i+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return a},[l,r,s]);return Se(()=>{if(!f.current||!t.current)return;const a=window.icebreakerThaw||0;for(let o=0;o<l;o++){const i=n[o],c=Math.max(0,(a-i.delay)*2),u=Xe.clamp(c,0,1)*i.scale;e.position.copy(i.position),e.rotation.copy(i.rotation),e.scale.setScalar(u),e.updateMatrix(),f.current.setMatrixAt(o,e.matrix),e.position.y+=18*u,e.updateMatrix(),t.current.setMatrixAt(o,e.matrix)}f.current.instanceMatrix.needsUpdate=!0,t.current.instanceMatrix.needsUpdate=!0}),d.jsxs("group",{children:[d.jsxs("instancedMesh",{ref:f,args:[null,null,l],children:[d.jsx("cylinderGeometry",{args:[.5,1,20,8]}),d.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),d.jsxs("instancedMesh",{ref:t,args:[null,null,l],children:[d.jsx("sphereGeometry",{args:[8,4,4]}),d.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},Zs=`
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
`,qs=`
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
`,Qs=({startZ:l,endZ:r})=>{const s=_.useRef(),f=_.useRef(),[t,e]=_.useState(null),n=Math.abs(r-l),a=(l+r)/2,o=_.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return _.useEffect(()=>{new tt().load("/assets/images/ice_cavern.jpg",i=>{i.wrapS=cr,i.wrapT=cr,i.repeat.set(4,2),i.colorSpace=it,e(i),o.tMap.value=i})},[o]),Se(i=>{if(f.current){const c=window.icebreakerThaw||0;o.uThaw.value=c,o.uTime.value=i.clock.elapsedTime}}),t?d.jsxs("mesh",{ref:s,position:[0,0,a],rotation:[Math.PI/2,0,0],children:[d.jsx("cylinderGeometry",{args:[120,120,n,128,128,!0]}),d.jsx("shaderMaterial",{ref:f,vertexShader:Zs,fragmentShader:qs,uniforms:o,transparent:!0,side:We})]}):null},Js=({position:l})=>{const r=_.useRef();return Se(s=>{if(r.current){const f=window.icebreakerThaw||0,t=Xe.lerp(.01,50,Math.pow(f,2));r.current.scale.setScalar(t),r.current.visible=f>0}}),d.jsxs("mesh",{ref:r,position:[l[0],l[1]+1,l[2]],rotation:[-Math.PI/2,0,0],children:[d.jsx("circleGeometry",{args:[20,64]}),d.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},Ks=({position:l})=>{const r=_.useRef();return Se(s=>{if(r.current){const f=window.icebreakerThaw||0;r.current.scale.setScalar(f>0?1:.001)}}),d.jsxs("mesh",{ref:r,position:[l[0],l[1]+1.5,l[2]],rotation:[-Math.PI/2,0,0],children:[d.jsx("circleGeometry",{args:[96,64]}),d.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},$s=({position:l})=>{const r=_.useRef();return Se(()=>{if(r.current){const s=window.icebreakerThaw||0;r.current.opacity=1-Math.pow(s,2),r.current.transparent=!0}}),d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:l,children:[d.jsx("planeGeometry",{args:[1e3,3e3]}),d.jsx("meshStandardMaterial",{ref:r,color:"#001133",roughness:.1,metalness:.8})]})},el=({centerZ:l})=>{const r=_.useRef(),s=_.useRef(),f=_.useMemo(()=>({uColorBottom:{value:new Re("#ffaa55")},uColorTop:{value:new Re("#00f3ff")},uOpacity:{value:0}}),[]);return Se(()=>{const t=window.icebreakerThaw||0;r.current&&(r.current.uniforms.uOpacity.value=t),s.current&&(s.current.intensity=t*.6)}),d.jsxs("group",{children:[d.jsxs("mesh",{scale:2e3,children:[d.jsx("sphereGeometry",{args:[1,32,32]}),d.jsx("shaderMaterial",{ref:r,side:We,transparent:!0,depthWrite:!1,uniforms:f,vertexShader:`
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
          `})]}),d.jsx("directionalLight",{ref:s,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),d.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},tl=()=>{const l=st(),[r,s]=_.useState(!1),[f,t]=_.useState(!1),[e,n]=_.useState(!1),a=_.useRef({triggered:!1,timer:0}),o=_.useRef({triggered:!1,timer:0});return _.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),Se((i,c)=>{const u=l.offset;!o.current.triggered&&u>=.22&&(o.current.triggered=!0,n(!0),window.icebreakerCaveLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.22*(l.el.scrollHeight-l.el.clientHeight))),window.icebreakerCaveLocked&&(l.el&&(l.el.scrollTop=.22*(l.el.scrollHeight-l.el.clientHeight)),o.current.timer+=c,o.current.timer>1.5&&(window.icebreakerCaveLocked=!1,n(!1),l.el&&(l.el.style.overflow="auto"))),!r&&u>=.265&&window.icebreakerThaw<1&&(s(!0),window.icebreakerThawLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.27*(l.el.scrollHeight-l.el.clientHeight))),window.icebreakerThawLocked?(l.el&&(l.el.scrollTop=.27*(l.el.scrollHeight-l.el.clientHeight)),window.icebreakerThaw+=c*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,l.el&&!f&&(l.el.style.overflow="auto"),s(!1))):u<.2&&(window.icebreakerThaw=0),!a.current.triggered&&u>=.285&&window.icebreakerThaw>=1&&(a.current.triggered=!0,t(!0),window.icebreakerTextLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.29*(l.el.scrollHeight-l.el.clientHeight))),window.icebreakerTextLocked&&(l.el&&(l.el.scrollTop=.29*(l.el.scrollHeight-l.el.clientHeight)),a.current.timer+=c,a.current.timer>1.5&&(window.icebreakerTextLocked=!1,t(!1),l.el&&(l.el.style.overflow="auto")))}),null},rl=({position:l,rotation:r,visible:s=!0})=>d.jsxs("group",{position:l,rotation:r,visible:s,children:[d.jsx(tl,{}),d.jsx(el,{centerZ:0}),d.jsx(Qs,{startZ:1e3,endZ:-1e3}),d.jsx($s,{position:[0,-20,0]}),d.jsx(Js,{position:[0,-20,0]}),d.jsx(Ks,{position:[0,-20,0]}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),d.jsx(Gs,{position:[0,-20,0]}),d.jsx(Xs,{position:[0,30,0]}),d.jsx(Ys,{radius:60,centerZ:0}),d.jsx(Hs,{position:[0,-20,0]})]}),nl=`
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
`,ol=`
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
`,al=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,il=({position:l,visible:r})=>d.jsxs("group",{visible:r,position:l,children:[d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),sl=({position:l,visible:r})=>{const s=st(),f=_.useRef(),t=_.useRef(),e=_.useRef(),[n,a]=_.useState(null),[o,i]=_.useState(null),[c,u]=_.useState(!1),h=_.useRef({triggered:!1,timer:0});_.useEffect(()=>{window.mindwaveLocked=!1,new tt().load("/mindwave-logo.png",g=>{g.colorSpace=it,a(g)}),new tt().load("/tribal-sun.png",g=>{g.colorSpace=it,i(g)})},[]);const p=l?l[2]:0,m=_.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return Se((g,y)=>{if(!r)return;const S=s.offset;!h.current.triggered&&S>=.075&&(h.current.triggered=!0,u(!0),window.mindwaveLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.08*(s.el.scrollHeight-s.el.clientHeight))),window.mindwaveLocked&&(s.el&&(s.el.scrollTop=.08*(s.el.scrollHeight-s.el.clientHeight)),h.current.timer+=y,h.current.timer>1.5&&(window.mindwaveLocked=!1,u(!1),s.el&&(s.el.style.overflow="auto")));const M=g.clock.elapsedTime;if(f.current){f.current.uniforms.uTime.value=M;const v=Math.abs(g.camera.position.z-p);let T=1-Math.min(v/1e3,1);T=Math.pow(T,2),f.current.uniforms.uScrollProgress.value=T}if(t.current){t.current.position.y=-7+Math.sin(M*2)*2;const v=1+Math.sin(M*4)*.05;t.current.scale.set(v,v,1),t.current.rotation.y=0}if(e.current){e.current.position.y=125+Math.sin(M*2)*2,e.current.rotation.z=M*.1;const v=1+Math.sin(M*3)*.05;e.current.scale.set(v,v,1)}}),d.jsxs("group",{visible:r,position:l,children:[d.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[d.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),d.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:al,side:We,depthWrite:!1})]}),d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[d.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),d.jsx("shaderMaterial",{ref:f,vertexShader:nl,fragmentShader:ol,uniforms:m,transparent:!0,side:Je,wireframe:!1})]}),o&&d.jsxs("mesh",{ref:e,position:[0,-10,-85],children:[d.jsx("planeGeometry",{args:[140,140]}),d.jsx("meshBasicMaterial",{map:o,transparent:!0,side:Je,depthWrite:!1,blending:Ye,color:"#00ffff",opacity:.6})]}),n&&d.jsxs("mesh",{ref:t,position:[0,-10,-80],children:[d.jsx("planeGeometry",{args:[80,80]}),d.jsx("meshBasicMaterial",{map:n,transparent:!0,side:Je,depthWrite:!1,blending:Ye})]}),d.jsx(il,{position:[0,-5,-80],visible:!0})]})},ll=({position:l})=>{const r=_.useRef(document.createElement("canvas")),s=_.useRef(new la(r.current));_.useEffect(()=>{r.current.width=2048,r.current.height=1024,s.current.colorSpace=it},[]);const f=["MASTER SERVICES AGREEMENT","","1. TERM AND TERMINATION","This Agreement shall commence on the Effective Date and","continue for a period of five (5) years.","","2. LIMITATION OF LIABILITY","IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT,","INCIDENTAL, OR CONSEQUENTIAL DAMAGES, REGARDLESS OF WHETHER","SUCH DAMAGES WERE FORESEEABLE.","","3. INDEMNIFICATION","Client agrees to indemnify and hold harmless the Service Provider","against any claims arising out of the use of the services."];return Se(t=>{const e=t.clock.elapsedTime,n=r.current.getContext("2d");n.fillStyle="rgba(2, 6, 12, 0.85)",n.fillRect(0,0,2048,1024),n.strokeStyle="rgba(0, 200, 255, 0.1)",n.lineWidth=2;for(let c=0;c<2048;c+=64)n.beginPath(),n.moveTo(c,0),n.lineTo(c,1024),n.stroke();for(let c=0;c<1024;c+=64)n.beginPath(),n.moveTo(0,c),n.lineTo(2048,c),n.stroke();const a=e*.5%2,i=(a>1?2-a:a)*1024;n.fillStyle="rgba(0, 255, 255, 0.15)",n.fillRect(0,i-60,2048,120),n.fillStyle="#00ffff",n.fillRect(0,i-2,2048,4),n.textAlign="left",f.forEach((c,u)=>{const h=150+u*50;if(u===0){n.font="bold 60px monospace",n.fillStyle="#ffffff",n.fillText(c,100,h);return}n.font="40px monospace",u>=6&&u<=9?(n.fillStyle="#ff0033",n.fillText(c,100,h),e%10>5&&(n.strokeStyle="#ff0033",n.lineWidth=6,n.beginPath(),n.moveTo(90,h-12),n.lineTo(1900,h-12),n.stroke(),u===9&&(n.fillStyle="#ffcc00",n.font="bold 40px monospace",n.fillText(">> AI REVISION: Liability capped at fees paid in prior 12 months.",100,h+60)))):(n.fillStyle="#00ffff",n.fillText(c,100,h))}),s.current.needsUpdate=!0}),d.jsx("group",{position:l,children:d.jsxs("mesh",{children:[d.jsx("cylinderGeometry",{args:[600,600,500,64,1,!0,-Math.PI/6,Math.PI/3]}),d.jsx("meshBasicMaterial",{map:s.current,side:Je,transparent:!0,blending:Ye})]})})},cl=()=>{const r=_.useRef();return Se(s=>{r.current&&(r.current.rotation.y=s.clock.elapsedTime*.05)}),d.jsx("group",{ref:r,children:Array.from({length:16}).map((s,f)=>{const t=f/16*Math.PI*2;return d.jsxs("mesh",{position:[Math.cos(t)*900,(Math.random()-.5)*400,Math.sin(t)*900],rotation:[0,-t+Math.PI/2,0],children:[d.jsx("planeGeometry",{args:[200,300]}),d.jsx("meshBasicMaterial",{color:"#0066ff",transparent:!0,opacity:.15,wireframe:!0})]},f)})})},fl=({position:l,rotation:r,visible:s})=>{const f=Bt(tt,"/legal_eagle_logo.png");return f.colorSpace=it,d.jsxs("group",{visible:s,position:l,rotation:r,children:[d.jsx("ambientLight",{intensity:.5}),d.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[d.jsx("sphereGeometry",{args:[3e3,64,64]}),d.jsx("meshBasicMaterial",{color:"#010204",side:We})]}),d.jsx("group",{position:[0,350,-800],children:d.jsxs(Br,{speed:2,rotationIntensity:.1,floatIntensity:1,children:[d.jsxs("mesh",{position:[0,120,0],children:[d.jsx("planeGeometry",{args:[250,250]}),d.jsx("meshBasicMaterial",{map:f,transparent:!0,depthWrite:!1,blending:Ye})]}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-40,0],fontSize:70,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:28,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Contract Generation & Review"})]})}),d.jsx(cl,{}),d.jsx(ll,{position:[0,-100,-600]})]})},Un=l=>{const s=new ei;l==="interceptor"?(s.moveTo(1*1.8,0),s.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),s.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),s.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),s.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):l==="viper"?(s.moveTo(1*1.2,1*.3),s.lineTo(1*.4,1*.4),s.lineTo(-1*.8,1*1.2),s.lineTo(-1*1.2,1*.8),s.lineTo(-1*.8,0),s.lineTo(-1*1.2,-1*.8),s.lineTo(-1*.8,-1*1.2),s.lineTo(1*.4,-1*.4),s.lineTo(1*1.2,-1*.3),s.lineTo(1*.6,0)):l==="bulwark"&&(s.moveTo(1*1.5,0),s.lineTo(1*.8,1*1.2),s.lineTo(-1*.5,1*1.5),s.lineTo(-1*1.5,1*.8),s.lineTo(-1*1.5,-1*.8),s.lineTo(-1*.5,-1*1.5),s.lineTo(1*.8,-1*1.2));const f={steps:1,depth:l==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},t=new ti(s,f);return t.center(),t.rotateY(-Math.PI/2),t.rotateZ(-Math.PI/2),t},ul=({position:l})=>{const r=_.useRef(),s=_.useMemo(()=>Un("bulwark"),[]);return Se((f,t)=>{r.current&&(r.current.position.y=Math.sin(f.clock.elapsedTime*.2)*40,r.current.rotation.y+=t*.05,r.current.rotation.z=Math.sin(f.clock.elapsedTime*.1)*.1)}),d.jsxs("group",{position:l,ref:r,scale:[120,120,120],children:[d.jsx("mesh",{geometry:s,children:d.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),d.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),d.jsxs("mesh",{position:[0,0,1.5],children:[d.jsx("sphereGeometry",{args:[.2,16,16]}),d.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},dl=({position:l})=>{const e=_.useMemo(()=>new Ot,[]),n=_.useMemo(()=>new Ot,[]),a=_.useRef(),o=_.useRef(),i=_.useRef(),c=_.useRef(),u=_.useMemo(()=>Un("interceptor"),[]),h=_.useMemo(()=>Un("viper"),[]),p=_.useMemo(()=>{const y=new Ka(.5,.5,20,4);return y.rotateX(Math.PI/2),y},[]),m=_.useMemo(()=>Array.from({length:80},(y,S)=>{const M=S>=40;return{pos:new ye((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new ye,target:new ye,team:M?1:0,meshIndex:M?S-40:S,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),g=_.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new ye,vel:new ye,color:new Re,life:0})),[60]);return Se((y,S)=>{if(!a.current||!o.current||!i.current||!c.current)return;let M=0;m.forEach(v=>{if(v.state===0){if(Math.random()<.02||v.target.lengthSq()===0){const F=m[Math.floor(Math.random()*80)];F&&F.team!==v.team&&F.state===0?(v.target.copy(F.pos),v.target.x+=(Math.random()-.5)*200,v.target.y+=(Math.random()-.5)*200,v.target.z+=(Math.random()-.5)*200):v.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const b=new ye().subVectors(v.target,v.pos),T=b.length();if(T>150&&T<800&&Math.random()<.03){const F=g.find(L=>!L.active);F&&(F.active=!0,F.pos.copy(v.pos),F.vel.copy(b).normalize().multiplyScalar(2500),F.color.set(v.team===0?"#00ffff":"#ff3300"),F.life=.8)}const R=b.normalize().multiplyScalar(400*S);v.vel.add(R),v.vel.clampLength(0,600),v.pos.addScaledVector(v.vel,S),v.trail.push(v.pos.clone()),v.trail.length>5&&v.trail.shift(),e.position.copy(v.pos);const k=e.position.clone().add(v.vel);e.lookAt(k);const C=R.clone().cross(v.vel).y;e.rotateZ(C*.01),e.scale.set(30,30,30)}else{v.explosionTimer+=S,e.position.copy(v.pos),e.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const b=30*Math.max(.1,1-v.explosionTimer*2);e.scale.set(b,b,b),v.explosionTimer>.5&&(v.state=0,v.health=100,v.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),v.vel.set(0,0,0),v.trail=[])}e.updateMatrix(),v.team===0?(a.current.setMatrixAt(v.meshIndex,e.matrix),a.current.setColorAt(v.meshIndex,v.state===0?new Re("#00aaff"):new Re("#ffaa00"))):(o.current.setMatrixAt(v.meshIndex,e.matrix),o.current.setColorAt(v.meshIndex,v.state===0?new Re("#ff0033"):new Re("#ffaa00"))),v.trail.forEach((b,T)=>{if(M<400){e.position.copy(b),e.rotation.set(0,0,0);const R=T/5*10;e.scale.set(R,R,R),e.updateMatrix(),c.current.setMatrixAt(M,e.matrix),c.current.setColorAt(M,v.team===0?new Re("#00ffff"):new Re("#ff5500")),M++}})});for(let v=M;v<400;v++)e.position.set(0,9999,0),e.scale.set(0,0,0),e.updateMatrix(),c.current.setMatrixAt(v,e.matrix);g.forEach((v,b)=>{v.active?(v.pos.addScaledVector(v.vel,S),v.life-=S,m.forEach(T=>{T.state===0&&v.pos.distanceTo(T.pos)<50&&(T.health-=50,v.active=!1,T.health<=0&&(T.state=1,T.explosionTimer=0))}),v.life<=0&&(v.active=!1),n.position.copy(v.pos),n.lookAt(n.position.clone().add(v.vel)),n.scale.set(1,1,1)):(n.position.set(0,9999,0),n.scale.set(0,0,0)),n.updateMatrix(),i.current.setMatrixAt(b,n.matrix),i.current.setColorAt(b,v.color)}),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0),o.current.instanceMatrix.needsUpdate=!0,o.current.instanceColor&&(o.current.instanceColor.needsUpdate=!0),c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0),i.current.instanceMatrix.needsUpdate=!0,i.current.instanceColor&&(i.current.instanceColor.needsUpdate=!0)}),d.jsxs("group",{position:l,children:[d.jsx("instancedMesh",{ref:a,args:[u,null,40],children:d.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),d.jsx("instancedMesh",{ref:o,args:[h,null,40],children:d.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),d.jsx("instancedMesh",{ref:i,args:[p,null,60],children:d.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Ye})}),d.jsx("instancedMesh",{ref:c,args:[new $a(1,4,4),null,400],children:d.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:Ye,depthWrite:!1})})]})},hl=({position:l,rotation:r,visible:s})=>{const f=Bt(tt,"/interstellar_logo_final.png");return f.colorSpace=it,d.jsxs("group",{visible:s,position:l,rotation:r,children:[d.jsx("ambientLight",{intensity:.2}),d.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),d.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),d.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),d.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[d.jsx("sphereGeometry",{args:[4e3,32,32]}),d.jsx("meshBasicMaterial",{color:"#020510",side:We})]}),d.jsx(ul,{position:[0,-120,-100]}),d.jsx(dl,{position:[0,-50,0]}),d.jsxs("group",{position:[0,120,100],children:[d.jsxs("mesh",{position:[0,50,0],children:[d.jsx("planeGeometry",{args:[180,180]}),d.jsx("meshBasicMaterial",{map:f,transparent:!0,depthWrite:!1})]}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]})]})},pl=({position:l})=>{const r=Bt(tt,"/autopilot_logo.png");r.colorSpace=it;const s=_.useRef();return Se((f,t)=>{s.current&&(s.current.rotation.z+=t*.5)}),d.jsx("group",{position:l,children:d.jsxs(Br,{speed:2,rotationIntensity:.2,floatIntensity:1,children:[d.jsxs("mesh",{position:[0,100,0],children:[d.jsx("planeGeometry",{args:[150,150]}),d.jsx("meshBasicMaterial",{map:r,transparent:!0,depthWrite:!1,blending:Ye})]}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,0],fontSize:28,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:.5,outlineColor:"#004488",children:"AUTOPILOT"}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-30,0],fontSize:10,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Autonomous Social Media & Business Automation"}),d.jsxs("group",{ref:s,position:[0,100,-20],children:[d.jsxs("mesh",{children:[d.jsx("ringGeometry",{args:[90,92,64]}),d.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.3,side:Je})]}),d.jsxs("mesh",{children:[d.jsx("ringGeometry",{args:[110,115,64,1,0,Math.PI]}),d.jsx("meshBasicMaterial",{color:"#ff0088",transparent:!0,opacity:.5,side:Je})]})]}),d.jsxs("group",{position:[-250,50,0],children:[d.jsxs("mesh",{position:[0,0,-5],children:[d.jsx("planeGeometry",{args:[200,120]}),d.jsx("meshBasicMaterial",{color:"#001133",transparent:!0,opacity:.6,wireframe:!0})]}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-80,40,0],fontSize:14,color:"#00ffff",anchorX:"left",anchorY:"middle",children:"POST ENGAGEMENT"}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-80,0,0],fontSize:42,color:"#00ff44",anchorX:"left",anchorY:"middle",children:"+142%"})]}),d.jsxs("group",{position:[250,50,0],children:[d.jsxs("mesh",{position:[0,0,-5],children:[d.jsx("planeGeometry",{args:[200,120]}),d.jsx("meshBasicMaterial",{color:"#001133",transparent:!0,opacity:.6,wireframe:!0})]}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-80,40,0],fontSize:14,color:"#00ffff",anchorX:"left",anchorY:"middle",children:"CONTENT GENERATED"}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[-80,0,0],fontSize:42,color:"#ff0088",anchorX:"left",anchorY:"middle",children:"8,492"})]})]})})},vl=({position:l})=>{const s=_.useMemo(()=>new Ot,[]),f=_.useRef(),t=_.useMemo(()=>Array.from({length:80},()=>({pos:new ye((Math.random()-.5)*1e3,(Math.random()-.5)*400-150,(Math.random()-.5)*400),vel:new ye((Math.random()-.5)*20,Math.random()*50+40,(Math.random()-.5)*20),color:new Re(Math.random()>.5?"#1da1f2":"#ff0088"),scale:Math.random()*8+5})),[80]);return Se((e,n)=>{f.current&&(t.forEach((a,o)=>{a.pos.addScaledVector(a.vel,n),a.pos.y>300&&(a.pos.y=-300,a.pos.x=(Math.random()-.5)*1e3),s.position.copy(a.pos),s.scale.set(a.scale*2.5,a.scale*3.5,1),s.rotation.y=Math.sin(e.clock.elapsedTime+o)*.2,s.updateMatrix(),f.current.setMatrixAt(o,s.matrix),f.current.setColorAt(o,a.color)}),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0))}),d.jsx("group",{position:l,children:d.jsx("instancedMesh",{ref:f,args:[new ur(1,1),null,80],children:d.jsx("meshBasicMaterial",{transparent:!0,opacity:.6,side:Je,blending:Ye,depthWrite:!1})})})},ml=({position:l,rotation:r,visible:s})=>d.jsxs("group",{visible:s,position:l,rotation:r,children:[d.jsx("ambientLight",{intensity:.5}),d.jsx("pointLight",{position:[0,100,100],intensity:2,color:"#00ffff",distance:1e3}),d.jsx(pl,{position:[0,0,-400]}),d.jsx(vl,{position:[0,0,-400]})]}),gl=({position:l})=>{const r=_.useRef(),s=_.useMemo(()=>({uTime:{value:0},uColor:{value:new Re("#00ffff")}}),[]);return Se(f=>{r.current&&(r.current.uniforms.uTime.value=f.clock.elapsedTime)}),d.jsxs("mesh",{position:l,children:[d.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),d.jsx("shaderMaterial",{ref:r,transparent:!0,side:Je,blending:Ye,depthWrite:!1,uniforms:s,vertexShader:`
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
        `})]})},yl=()=>{const l=_.useRef(),r=_.useMemo(()=>({uTime:{value:0},uColor:{value:new Re("#0044ff")},uHighlight:{value:new Re("#00ffff")}}),[]);return Se(s=>{l.current&&(l.current.uniforms.uTime.value=s.clock.elapsedTime)}),d.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[d.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),d.jsx("shaderMaterial",{ref:l,transparent:!0,wireframe:!0,uniforms:r,vertexShader:`
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
        `})]})},xl=({position:l,rotation:r,visible:s})=>{const[f,t]=_.useState(null);return _.useEffect(()=>{new tt().load("/cloveh2o_logo.png",n=>{n.colorSpace=it,t(n)})},[]),d.jsxs("group",{visible:s,position:l,rotation:r,children:[d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[4e3,32,32]}),d.jsx("meshBasicMaterial",{color:"#000511",side:We})]}),d.jsx(yl,{}),d.jsx(gl,{position:[0,1800,-800]}),d.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),d.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),d.jsxs("group",{position:[0,0,-300],children:[f&&d.jsxs("mesh",{position:[0,80,0],children:[d.jsx("planeGeometry",{args:[200,200]}),d.jsx("meshBasicMaterial",{map:f,transparent:!0,depthWrite:!1,blending:Ye})]}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},Rr=({color:l,number:r,groupRef:s,armRef:f})=>d.jsxs("group",{ref:s,children:[d.jsxs("mesh",{position:[0,10,0],children:[d.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),d.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.3,roughness:.4})]}),d.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[d.jsx("sphereGeometry",{args:[2.5,16,16]}),d.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.5,roughness:.3})]}),d.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[d.jsx("sphereGeometry",{args:[2.5,16,16]}),d.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.5,roughness:.3})]}),d.jsxs("group",{position:[0,17,0],children:[d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[2.8,32,32]}),d.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.8,metalness:.5})]}),d.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[d.jsx("boxGeometry",{args:[3.5,2,2]}),d.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),d.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:d.jsxs("mesh",{position:[0,-3.5,0],children:[d.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),d.jsx("meshStandardMaterial",{color:l,roughness:.6})]})}),d.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:f,children:d.jsxs("mesh",{position:[0,-3.5,0],children:[d.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),d.jsx("meshStandardMaterial",{color:l,roughness:.6})]})}),d.jsxs("mesh",{position:[-1.8,3,0],children:[d.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),d.jsx("meshStandardMaterial",{color:l,roughness:.8})]}),d.jsxs("mesh",{position:[1.8,3,0],children:[d.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),d.jsx("meshStandardMaterial",{color:l,roughness:.8})]}),r&&d.jsx(Pe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:r})]}),wl=({position:l})=>{const r=_.useRef(),s=_.useRef(),f=_.useRef(),t=_.useRef(),e=_.useRef(),n=_.useRef(),a=_.useMemo(()=>new ye(100,0,0),[]),o=_.useMemo(()=>new ye(100,0,20),[]),i=_.useMemo(()=>new ye(30,0,100),[]),c=_.useMemo(()=>new ye(0,0,-20),[]),u=_.useMemo(()=>new ye(20,0,220),[]),h=_.useMemo(()=>new ye,[]),p=_.useMemo(()=>new ye,[]);return _.useMemo(()=>new ye,[]),Se(m=>{const g=m.clock.elapsedTime%6;if(f.current&&f.current.rotation.set(0,0,-.3),g<.5)s.current&&s.current.position.copy(a),t.current&&t.current.position.copy(o),e.current&&e.current.position.copy(i),r.current&&r.current.position.copy(c),n.current&&n.current.position.copy(c).add(h.set(4.5,12,2));else if(g<4){const y=(g-.5)/3.5;if(s.current&&(y<.5?s.current.position.lerpVectors(a,h.set(100,0,110),y*2):s.current.position.lerpVectors(p.set(100,0,110),u,(y-.5)*2)),t.current&&s.current&&t.current.position.lerpVectors(o,h.set(u.x+8,0,u.z-8),y),e.current&&e.current.position.lerpVectors(i,h.set(u.x-8,0,u.z+8),y),n.current)if(g<1.5)n.current.position.copy(c).add(h.set(4.5,12,2));else{const S=(g-1.5)/2.5,M=Math.sin(S*Math.PI)*45;n.current.position.lerpVectors(c,u,S),n.current.position.y+=M+18}}else if(g<5)s.current&&s.current.position.lerpVectors(u,h.set(20,0,240),g-4),n.current&&s.current&&n.current.position.copy(s.current.position).add(h.set(0,12,3)),t.current&&(t.current.position.y=0),e.current&&(e.current.position.y=0);else if(g<5.5)f.current&&f.current.rotation.set(Math.PI,0,0),n.current&&s.current&&n.current.position.copy(s.current.position).add(h.set(4.5,20,0));else if(f.current&&f.current.rotation.set(-Math.PI/4,0,0),n.current&&s.current){const y=g-5.5,S=Math.abs(Math.cos(y*8))*10;n.current.position.copy(s.current.position).add(h.set(4.5,S,4))}}),d.jsxs("group",{position:l,children:[d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[d.jsx("planeGeometry",{args:[400,400]}),d.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),d.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[d.jsx("planeGeometry",{args:[400,40]}),d.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),d.jsx(Rr,{color:"#0088ff",number:"QB",groupRef:r}),d.jsx(Rr,{color:"#00ffff",number:"80",groupRef:s,armRef:f}),d.jsx(Rr,{color:"#ff0044",number:"CB",groupRef:t}),d.jsx(Rr,{color:"#ff0044",number:"S",groupRef:e}),d.jsxs("mesh",{ref:n,children:[d.jsx("sphereGeometry",{args:[2,16,16]}),d.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},bl=({position:l,rotation:r,visible:s})=>{const f=Bt(tt,"/fantasy_quant_stadium.jpg");return f.colorSpace=it,f.wrapS=cr,f.repeat.set(-1,1),d.jsxs("group",{visible:s,position:l,rotation:r,children:[d.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[d.jsx("sphereGeometry",{args:[2500,64,64]}),d.jsx("meshBasicMaterial",{map:f,side:We})]}),d.jsx(wl,{position:[0,-125,0],rotation:[0,-Math.PI/2,0]}),d.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),d.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),d.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]})]})},Sl=({position:l})=>{const s=_.useRef(),f=_.useMemo(()=>{const e=[];for(let n=0;n<4e3;n++){const a=Math.random()*Math.PI*2,o=(Math.random()-.5)*150,i=400,c=(i+o*Math.cos(a/2))*Math.cos(a),u=o*Math.sin(a/2),h=(i+o*Math.cos(a/2))*Math.sin(a);e.push({pos:new ye(c,u,h),u:a,v:o,speed:Math.random()*.5+.2,color:new Re(Math.random()>.5?"#00f3ff":"#0077ff")})}return e},[]),t=_.useMemo(()=>new Ot,[]);return Se(e=>{if(!s.current)return;const n=e.clock.elapsedTime;f.forEach((a,o)=>{const i=(a.u+n*a.speed)%(Math.PI*2),c=400,u=(c+a.v*Math.cos(i/2))*Math.cos(i),h=a.v*Math.sin(i/2),p=(c+a.v*Math.cos(i/2))*Math.sin(i);t.position.set(u,h,p);const m=1.5+Math.sin(n*a.speed*5+o)*.8;t.scale.set(m,m,m),t.updateMatrix(),s.current.setMatrixAt(o,t.matrix),s.current.setColorAt(o,a.color)}),s.current.instanceMatrix.needsUpdate=!0,s.current.instanceColor&&(s.current.instanceColor.needsUpdate=!0)}),d.jsx("group",{position:l,children:d.jsx("instancedMesh",{ref:s,args:[new ur(2,2),null,4e3],children:d.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Ye,depthWrite:!1,side:Je})})})},_l=()=>{const l=_.useMemo(()=>Array.from({length:30}).map(()=>{const s=[],f=(Math.random()-.5)*800,t=600+Math.random()*400,e=Math.random()*Math.PI*2;for(let n=0;n<=50;n++){const a=e+n/50*Math.PI*1.5;s.push(new ye(Math.cos(a)*t,f+Math.sin(a*8)*50,Math.sin(a)*t))}return{points:s,color:Math.random()>.5?"#00f3ff":"#ffffff"}}),[]),r=_.useRef();return Se(s=>{r.current&&(r.current.rotation.y=s.clock.elapsedTime*.15)}),d.jsx("group",{ref:r,children:l.map((s,f)=>d.jsx(Vi,{points:s.points,color:s.color,lineWidth:2,transparent:!0,opacity:.4},f))})},Ml=({position:l,rotation:r,visible:s})=>d.jsxs("group",{visible:s,position:l,rotation:r,children:[d.jsx("ambientLight",{intensity:.2}),d.jsx("directionalLight",{position:[0,500,500],intensity:1}),d.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[d.jsx("sphereGeometry",{args:[3e3,64,64]}),d.jsx("meshBasicMaterial",{color:"#010204",side:We})]}),d.jsx(_l,{}),d.jsxs(Br,{speed:2,rotationIntensity:.2,floatIntensity:1,floatingRange:[-10,10],children:[d.jsx(Pe,{position:[0,150,-800],fontSize:80,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#00f3ff",children:"CONTANGO QUANT"}),d.jsx(Pe,{position:[0,50,-800],fontSize:30,color:"#00f3ff",anchorX:"center",anchorY:"middle",opacity:.8,children:"The Future of Algorithmic Alpha"})]}),d.jsx(Sl,{position:[0,-50,-800]}),d.jsx(Lr,{count:2500,scale:2500,size:20,speed:.4,opacity:.3,color:"#00f3ff",position:[0,0,-500]})]}),Tl=({position:l,rotation:r,visible:s})=>{const f=_.useRef(),t=_.useRef(),e=Bt(tt,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return Se(n=>{f.current&&(f.current.position.y=Math.sin(n.clock.elapsedTime*1.5)*5),t.current&&(t.current.rotation.y+=.005,t.current.rotation.z+=.002)}),d.jsxs("group",{visible:s,position:l,rotation:r,children:[d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[1500,32,32]}),d.jsx("meshBasicMaterial",{color:"#020510",side:We})]}),d.jsxs("group",{children:[d.jsx(Br,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:d.jsxs("mesh",{ref:f,position:[0,0,-500],children:[d.jsx("planeGeometry",{args:[400,100]})," ",d.jsx("meshBasicMaterial",{map:e,transparent:!0,opacity:1,side:Je,depthWrite:!1})]})}),d.jsx(Lr,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),d.jsx(Lr,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),d.jsx("ambientLight",{intensity:.5,color:"#002244"}),d.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},Ul=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,kl=`
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
`,Cl=({startZ:l=10,endZ:r=-500,visible:s=!0})=>{const f=_.useRef(),t=_.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);Se(n=>{f.current&&s&&(f.current.uniforms.uTime.value=n.clock.elapsedTime,f.current.uniforms.uOpacity.value=Xe.lerp(f.current.uniforms.uOpacity.value,s?1:0,.05))});const e=_.useMemo(()=>{const n=[],o=l-r;for(let i=0;i<=100;i++){const c=l-i/100*o;n.push(new ye(Math.sin(i*.1)*2,Math.cos(i*.05)*2,c))}return new ri(n)},[l,r]);return d.jsxs("mesh",{visible:s,children:[d.jsx("tubeGeometry",{args:[e,200,15,32,!1]}),d.jsx("shaderMaterial",{ref:f,vertexShader:Ul,fragmentShader:kl,uniforms:t,side:We,transparent:!0,blending:Ye})]})},Al=`
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
`,El=`
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
`,Rl=({position:l,rotation:r=[0,0,0],length:s=4e3,visible:f=!0})=>{const t=_.useRef(),e=_.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:s}}),[s]);return Se(n=>{t.current&&(t.current.uniforms.uTime.value=n.clock.elapsedTime,t.current.uniforms.uOpacity.value=f?1:0)}),d.jsx("group",{position:l,rotation:r,visible:f,children:d.jsxs("mesh",{children:[d.jsx("cylinderGeometry",{args:[60,400,s+200,32,64,!0]}),d.jsx("shaderMaterial",{ref:t,vertexShader:Al,fragmentShader:El,uniforms:e,transparent:!0,side:We,wireframe:!1})]})})},mn=({position:l,rotation:r,length:s=4e3,radius:f=200,color:t="#ffffff",speed:e=20,visible:n=!0})=>{const a=_.useRef(),o=_.useMemo(()=>({uTime:{value:0},uColor:{value:new Re(t)}}),[t]);return Se(i=>{a.current&&(a.current.uniforms.uTime.value=i.clock.elapsedTime)}),d.jsxs("mesh",{visible:n,position:l,rotation:r,children:[d.jsx("cylinderGeometry",{args:[f,f,s,32,1,!0]}),d.jsx("shaderMaterial",{ref:a,transparent:!0,side:We,blending:Ye,depthWrite:!1,uniforms:o,vertexShader:`
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
            float streaks = sin((vUv.x * 50.0) + sin(vUv.y * 10.0)) * sin((vUv.y * 100.0) - (uTime * ${e.toFixed(1)}));
            streaks = smoothstep(0.8, 1.0, streaks);
            
            // Fade at ends
            float edgeFade = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
            
            gl_FragColor = vec4(uColor, streaks * edgeFade);
          }
        `})]})},jl=()=>{const l=[],r=(s,f,t)=>{l.push({x:s,y:f,z:0,rot:[Math.PI/2,0,0],color:t,bodyHeight:40+Math.random()*40})};for(let s=Math.PI*.25;s<Math.PI*1.75;s+=.2)r(-100+Math.cos(s)*80,Math.sin(s)*80,"#00ff00");for(let s=0;s<Math.PI*2;s+=.2)r(100+Math.cos(s)*80,Math.sin(s)*80,"#ff0044");return r(140,-40,"#ff0044"),r(160,-60,"#ff0044"),r(180,-80,"#ff0044"),l},Fl=({position:l,rotation:r=[0,0,0],length:s=6e3,radius:f=250,visible:t})=>{const e=_.useRef(),n=_.useRef(),a=_.useRef(),o=Bt(tt,"/assets/images/contango_logo.png"),i=_.useMemo(()=>{const u=[],h=Math.floor(s/5);for(let m=0;m<h;m++){const g=-(m/h)*s,y=m*.1,S=Math.cos(y)*f,M=Math.sin(y)*f,v=Math.cos(y+Math.PI)*f,b=Math.sin(y+Math.PI)*f,R=Math.random()>.5?"#00ff00":"#ff0044",k=20+Math.random()*60,C=[0,0,y+Math.PI/2],F=[0,0,y+Math.PI+Math.PI/2];u.push({x:S,y:M,z:g,rot:C,color:R,bodyHeight:k}),u.push({x:v,y:b,z:g,rot:F,color:R,bodyHeight:k})}return jl().forEach(m=>{u.push({x:m.x,y:m.y,z:-s-500,rot:m.rot,color:m.color,bodyHeight:m.bodyHeight})}),u},[s,f]),c=i.length;return _.useEffect(()=>{if(!n.current||!a.current)return;const u=new Ot,h=new Re;for(let p=0;p<c;p++){const m=i[p];u.position.set(m.x,m.y,m.z),u.rotation.set(m.rot[0],m.rot[1],m.rot[2]),u.scale.set(1,m.bodyHeight+40,1),u.updateMatrix(),n.current.setMatrixAt(p,u.matrix),h.set(m.color),n.current.setColorAt(p,h),u.scale.set(1,m.bodyHeight,1),u.updateMatrix(),a.current.setMatrixAt(p,u.matrix),a.current.setColorAt(p,h)}n.current.instanceMatrix.needsUpdate=!0,n.current.instanceColor&&(n.current.instanceColor.needsUpdate=!0),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0)},[i,c]),Se(u=>{e.current&&t&&(e.current.rotation.z=u.clock.elapsedTime*.5)}),d.jsxs("group",{position:l,rotation:r,visible:t,children:[d.jsxs("group",{ref:e,children:[d.jsxs("instancedMesh",{ref:n,args:[null,null,c],children:[d.jsx("cylinderGeometry",{args:[2,2,1,8]}),d.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),d.jsxs("instancedMesh",{ref:a,args:[null,null,c],children:[d.jsx("boxGeometry",{args:[10,1,10]}),d.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),d.jsxs("mesh",{position:[0,0,-s-500],children:[d.jsx("planeGeometry",{args:[200,200]}),d.jsx("meshBasicMaterial",{map:o,transparent:!0})]}),d.jsxs("mesh",{position:[0,0,-s/2],rotation:[Math.PI/2,0,0],children:[d.jsx("cylinderGeometry",{args:[f*.8,f*.8,s,32,1,!0]}),d.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:We})]})]})},Ll=({position:l,rotation:r,length:s=8e3,visible:f=!0})=>{const t=_.useRef(),e=_.useRef();Se(a=>{if(!f||!t.current)return;const o=a.clock.getElapsedTime();t.current.map.offset.y=-o*3,e.current&&(e.current.rotation.y=o*2)});const n=ia.useMemo(()=>{const a=document.createElement("canvas");a.width=512,a.height=512;const o=a.getContext("2d"),i=o.createLinearGradient(0,0,0,512);i.addColorStop(0,"#001a33"),i.addColorStop(.5,"#00ccff"),i.addColorStop(1,"#001a33"),o.fillStyle=i,o.fillRect(0,0,512,512),o.fillStyle="#ffffff";for(let u=0;u<200;u++)o.globalAlpha=Math.random()*.5,o.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const c=new la(a);return c.wrapS=cr,c.wrapT=cr,c.repeat.set(4,20),c},[]);return d.jsxs("group",{position:l,rotation:r,visible:f,children:[d.jsxs("mesh",{children:[d.jsx("cylinderGeometry",{args:[150,150,s,32,1,!0]}),d.jsx("meshStandardMaterial",{ref:t,map:n,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:We,transparent:!0,opacity:.9})]}),d.jsxs("mesh",{ref:e,children:[d.jsx("cylinderGeometry",{args:[140,140,s,16,40,!0]}),d.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:We})]})]})},ut=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.53,x:0,y:-4e3,z:-11550,rx:0,ry:0},{p:.58,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.61,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.63,x:0,y:-4e3,z:-14550,rx:0,ry:0},{p:.66,x:0,y:-4e3,z:-15550,rx:0,ry:0},{p:.69,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],Pl=l=>{if(l<=ut[0].p)return ut[0];if(l>=ut[ut.length-1].p)return ut[ut.length-1];for(let r=0;r<ut.length-1;r++){const s=ut[r],f=ut[r+1];if(l>=s.p&&l<=f.p){const t=(l-s.p)/(f.p-s.p);return{x:Xe.lerp(s.x,f.x,t),y:Xe.lerp(s.y,f.y,t),z:Xe.lerp(s.z,f.z,t),rx:Xe.lerp(s.rx,f.rx,t),ry:Xe.lerp(s.ry,f.ry,t)}}}return ut[0]},Dl=()=>{const l=st(),r=_.useRef();return Se(s=>{let f=l.offset;window.icebreakerCaveLocked?f=.22:window.icebreakerThawLocked?f=.27:window.icebreakerTextLocked?f=.29:window.mindwaveLocked?f=.08:window.interstellarLocked&&(f=.42);const t=Pl(f);s.camera.position.x=Xe.lerp(s.camera.position.x,t.x,.2),s.camera.position.y=Xe.lerp(s.camera.position.y,t.y,.2),s.camera.position.z=Xe.lerp(s.camera.position.z,t.z,.2);const e=new Ct().setFromEuler(new kn(t.rx,t.ry,0));s.camera.quaternion.slerp(e,.15);const n=l.delta*10;s.camera.rotateZ(Xe.lerp(0,n*2,.2)),r.current&&r.current.position.copy(s.camera.position)}),d.jsxs("group",{children:[d.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),d.jsx("pointLight",{ref:r,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),d.jsx("ambientLight",{intensity:.2})]})},Il=()=>{const l=st(),[r,s]=_.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_auto:!1,auto:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),f=_.useRef(r);return Se(()=>{const t=l.offset,e={intro:t<.08,mindwave:t>.04&&t<.18,wormhole_ice:t>.1&&t<.25,icebreaker:t>.18&&t<.35,wormhole_sound:t>.28&&t<.42,interstellar:t>.28&&t<.48,w_legal:t>.43&&t<.54,legal:t>.48&&t<.58,w_auto:t>.53&&t<.65,auto:t>.58&&t<.68,w_clove:t>.61&&t<.72,clove:t>.66&&t<.76,w_fantasy:t>.71&&t<.83,fantasy:t>.73&&t<.88,w_contango:t>.84&&t<.91,contango:t>.89&&t<.96,sentaient:t>.94};let n=!1;for(const a in e)f.current[a]!==e[a]&&(n=!0);n&&(f.current=e,s(e))}),d.jsxs("group",{children:[d.jsx(Cl,{startZ:10,endZ:-250,visible:r.intro}),d.jsx(sl,{position:[0,0,-1350],visible:r.mindwave}),d.jsx(Rl,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:r.wormhole_ice}),d.jsx(rl,{position:[0,-4e3,-2550],visible:r.icebreaker}),d.jsx(hl,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:r.interstellar}),d.jsx(mn,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:r.w_legal}),d.jsx(fl,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:r.legal}),d.jsx(mn,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffcc",visible:r.w_auto}),d.jsx(ml,{position:[0,-4e3,-14550],rotation:[0,0,0],visible:r.auto}),d.jsx(mn,{position:[0,-4e3,-15050],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffff",speed:40,visible:r.w_clove}),d.jsx(xl,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:r.clove}),d.jsx(Ll,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:r.w_fantasy}),d.jsx(bl,{position:[0,-11700,-17500],rotation:[0,0,0],visible:r.fantasy}),d.jsx(Fl,{position:[0,-11750,-20550],length:4e3,visible:r.w_contango}),d.jsx(Ml,{position:[0,-11750,-24800],rotation:[0,0,0],visible:r.contango}),d.jsx(Tl,{position:[0,-11750,-29350],rotation:[0,0,0],visible:r.sentaient})]})},zl=()=>{const l=st(),r=_.useRef(),s=_.useRef();return _.useRef(),_.useRef(),_.useRef(),Se(()=>{const f=l.offset;if(r.current){const t=f<.03?1:0;r.current.style.opacity=t}if(s.current){const t=f>.2&&f<.28?1:0;s.current.style.opacity=t}}),d.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[d.jsxs("div",{ref:r,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[d.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),d.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),d.jsxs("div",{ref:s,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[d.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[d.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:d.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),d.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),d.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),d.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},Ol=()=>d.jsxs(ni,{gl:{antialias:!1,alpha:!0},children:[d.jsxs(Ii,{pages:10,damping:.2,distance:1.2,children:[d.jsxs(ia.Suspense,{fallback:null,children:[d.jsx(Dl,{}),d.jsx(Il,{})]}),d.jsx(Lr,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),d.jsx(Bi,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:d.jsx(zl,{})})]}),d.jsxs(oi,{disableNormalPass:!0,children:[d.jsx(ai,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),d.jsx(ii,{opacity:.05}),d.jsx(si,{eskil:!1,offset:.1,darkness:1.1})]})]}),Xl=()=>d.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[d.jsxs(La,{children:[d.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),d.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),d.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),d.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:d.jsx(Pa,{})}),d.jsx("div",{className:"absolute inset-0 z-0",children:d.jsx(Ol,{})})]});export{Xl as default};
//# sourceMappingURL=index-Bqz6iw2m.js.map
