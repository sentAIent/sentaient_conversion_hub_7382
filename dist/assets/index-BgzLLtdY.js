import{r as w,_ as Gt,g as za,j as u,R as Ir,H as Ga}from"./vendor--do4CMJV.js";import{H as Oa}from"./Header-COX0OoRD.js";import{W as mt,X as xe,Q as At,p as zr,J as fa,Y as tt,f as Ee,h as jn,a3 as Wt,a1 as ve,$ as ao,R as Ba,k as ua,F as xn,l as wn,m as It,_ as Wa,b as Gr,G as En,x as da,V as bn,U as io,q as Or,L as Na,M as Ye,t as Ha,s as Va,u as Xa,w as Ya,j as Za,r as qa,B as Ge,D as it,T as Sn,n as so,o as Qa,P as Br,c as Ja,I as Ka,a0 as $a,a2 as gt,K as Ze,A as Ie,a4 as ei,S as st,v as ur,O as Ot,d as ha,g as ti,H as ri,y as ni,i as oi,z as Bt,e as ai,C as ii,E as si,a as li,N as ci,Z as fi}from"./Vignette-DXcOjr7w.js";import"./main-CFBGzNM4.js";import"./preload-helper-BxaVoaJg.js";function lr(s,r,l){return r in s?Object.defineProperty(s,r,{value:l,enumerable:!0,configurable:!0,writable:!0}):s[r]=l,s}function Mn(s,r){(r==null||r>s.length)&&(r=s.length);for(var l=0,c=new Array(r);l<r;l++)c[l]=s[l];return c}function ui(s,r){if(s){if(typeof s=="string")return Mn(s,r);var l=Object.prototype.toString.call(s).slice(8,-1);if(l==="Object"&&s.constructor&&(l=s.constructor.name),l==="Map"||l==="Set")return Array.from(s);if(l==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l))return Mn(s,r)}}function di(s){if(Array.isArray(s))return Mn(s)}function hi(s){if(typeof Symbol<"u"&&s[Symbol.iterator]!=null||s["@@iterator"]!=null)return Array.from(s)}function pi(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function vi(s){return di(s)||hi(s)||ui(s)||pi()}new mt;new mt;function mi(s,r,l){return Math.max(r,Math.min(l,s))}function gi(s,r){return mi(s-Math.floor(s/r)*r,0,r)}function yi(s,r){var l=gi(r-s,Math.PI*2);return l>Math.PI&&(l-=Math.PI*2),l}function pa(s,r){if(!(s instanceof r))throw new TypeError("Cannot call a class as a function")}var et=function s(r,l,c){var t=this;pa(this,s),lr(this,"dot2",function(e,n){return t.x*e+t.y*n}),lr(this,"dot3",function(e,n,a){return t.x*e+t.y*n+t.z*a}),this.x=r,this.y=l,this.z=c},xi=[new et(1,1,0),new et(-1,1,0),new et(1,-1,0),new et(-1,-1,0),new et(1,0,1),new et(-1,0,1),new et(1,0,-1),new et(-1,0,-1),new et(0,1,1),new et(0,-1,1),new et(0,1,-1),new et(0,-1,-1)],lo=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],co=new Array(512),fo=new Array(512),wi=function(r){r>0&&r<1&&(r*=65536),r=Math.floor(r),r<256&&(r|=r<<8);for(var l=0;l<256;l++){var c;l&1?c=lo[l]^r&255:c=lo[l]^r>>8&255,co[l]=co[l+256]=c,fo[l]=fo[l+256]=xi[c%12]}};wi(0);function bi(s){if(typeof s=="number")s=Math.abs(s);else if(typeof s=="string"){var r=s;s=0;for(var l=0;l<r.length;l++)s=(s+(l+1)*(r.charCodeAt(l)%96))%2147483647}return s===0&&(s=311),s}function uo(s){var r=bi(s);return function(){var l=r*48271%2147483647;return r=l,l/2147483647}}var Si=function s(r){var l=this;pa(this,s),lr(this,"seed",0),lr(this,"init",function(c){l.seed=c,l.value=uo(c)}),lr(this,"value",uo(this.seed)),this.init(r)};new Si(Math.random());var Mi=function(r){var l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return c/Math.atan(1/l)*Math.atan(Math.sin(2*Math.PI*r*t)/l)},va=function(r){return 1/(1+r+.48*r*r+.235*r*r*r)},_i=function(r){return r},Ti={in:function(r){return 1-Math.cos(r*Math.PI/2)},out:function(r){return Math.sin(r*Math.PI/2)},inOut:function(r){return-(Math.cos(Math.PI*r)-1)/2}},ki={in:function(r){return r*r*r},out:function(r){return 1-Math.pow(1-r,3)},inOut:function(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}},Ui={in:function(r){return r*r*r*r*r},out:function(r){return 1-Math.pow(1-r,5)},inOut:function(r){return r<.5?16*r*r*r*r*r:1-Math.pow(-2*r+2,5)/2}},Ci={in:function(r){return 1-Math.sqrt(1-Math.pow(r,2))},out:function(r){return Math.sqrt(1-Math.pow(r-1,2))},inOut:function(r){return r<.5?(1-Math.sqrt(1-Math.pow(2*r,2)))/2:(Math.sqrt(1-Math.pow(-2*r+2,2))+1)/2}},Ai={in:function(r){return r*r*r*r},out:function(r){return 1- --r*r*r*r},inOut:function(r){return r<.5?8*r*r*r*r:1-8*--r*r*r*r}},ji={in:function(r){return r===0?0:Math.pow(2,10*r-10)},out:function(r){return r===1?1:1-Math.pow(2,-10*r)},inOut:function(r){return r===0?0:r===1?1:r<.5?Math.pow(2,20*r-10)/2:(2-Math.pow(2,-20*r+10))/2}};function De(s,r,l){var c=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,t=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,e=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,n=arguments.length>6&&arguments[6]!==void 0?arguments[6]:va,a=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,o="velocity_"+r;if(s.__damp===void 0&&(s.__damp={}),s.__damp[o]===void 0&&(s.__damp[o]=0),Math.abs(s[r]-l)<=a)return s[r]=l,!1;c=Math.max(1e-4,c);var i=2/c,f=n(i*t),d=s[r]-l,h=l,p=e*c;d=Math.min(Math.max(d,-p),p),l=s[r]-d;var m=(s.__damp[o]+i*d)*t;s.__damp[o]=(s.__damp[o]-i*m)*f;var g=l+(d+m)*f;return h-s[r]>0==g>h&&(g=h,s.__damp[o]=(g-h)/t),s[r]=g,!0}var Ei=function(r){return r&&r.isCamera},Ri=function(r){return r&&r.isLight},er=new xe,ho=new At,po=new At,tr=new zr,fn=new xe;function Li(s,r,l,c,t,e,n){typeof r=="number"?er.setScalar(r):Array.isArray(r)?er.set(r[0],r[1],r[2]):er.copy(r);var a=s.parent;s.updateWorldMatrix(!0,!1),fn.setFromMatrixPosition(s.matrixWorld),Ei(s)||Ri(s)?tr.lookAt(fn,er,s.up):tr.lookAt(er,fn,s.up),Dr(s.quaternion,po.setFromRotationMatrix(tr),l,c,t,e,n),a&&(tr.extractRotation(a.matrixWorld),ho.setFromRotationMatrix(tr),Dr(s.quaternion,po.copy(s.quaternion).premultiply(ho.invert()),l,c,t,e,n))}function zt(s,r,l,c,t,e,n,a){return De(s,r,s[r]+yi(s[r],l),c,t,e,n,a)}var rr=new mt,vo,mo;function Fi(s,r,l,c,t,e,n){return typeof r=="number"?rr.setScalar(r):Array.isArray(r)?rr.set(r[0],r[1]):rr.copy(r),vo=De(s,"x",rr.x,l,c,t,e,n),mo=De(s,"y",rr.y,l,c,t,e,n),vo||mo}var Ft=new xe,go,yo,xo;function _n(s,r,l,c,t,e,n){return typeof r=="number"?Ft.setScalar(r):Array.isArray(r)?Ft.set(r[0],r[1],r[2]):Ft.copy(r),go=De(s,"x",Ft.x,l,c,t,e,n),yo=De(s,"y",Ft.y,l,c,t,e,n),xo=De(s,"z",Ft.z,l,c,t,e,n),go||yo||xo}var Tt=new tt,wo,bo,So,Mo;function Pi(s,r,l,c,t,e,n){return typeof r=="number"?Tt.setScalar(r):Array.isArray(r)?Tt.set(r[0],r[1],r[2],r[3]):Tt.copy(r),wo=De(s,"x",Tt.x,l,c,t,e,n),bo=De(s,"y",Tt.y,l,c,t,e,n),So=De(s,"z",Tt.z,l,c,t,e,n),Mo=De(s,"w",Tt.w,l,c,t,e,n),wo||bo||So||Mo}var nr=new jn,_o,To,ko;function Di(s,r,l,c,t,e,n){return Array.isArray(r)?nr.set(r[0],r[1],r[2],r[3]):nr.copy(r),_o=zt(s,"x",nr.x,l,c,t,e,n),To=zt(s,"y",nr.y,l,c,t,e,n),ko=zt(s,"z",nr.z,l,c,t,e,n),_o||To||ko}var Pt=new Ee,Uo,Co,Ao;function Ii(s,r,l,c,t,e,n){return r instanceof Ee?Pt.copy(r):Array.isArray(r)?Pt.setRGB(r[0],r[1],r[2]):Pt.set(r),Uo=De(s,"r",Pt.r,l,c,t,e,n),Co=De(s,"g",Pt.g,l,c,t,e,n),Ao=De(s,"b",Pt.b,l,c,t,e,n),Uo||Co||Ao}var at=new At,vt=new tt,jo=new tt,or=new tt,Eo,Ro,Lo,Fo;function Dr(s,r,l,c,t,e,n){var a=s;Array.isArray(r)?at.set(r[0],r[1],r[2],r[3]):at.copy(r);var o=s.dot(at)>0?1:-1;return at.x*=o,at.y*=o,at.z*=o,at.w*=o,Eo=De(s,"x",at.x,l,c,t,e,n),Ro=De(s,"y",at.y,l,c,t,e,n),Lo=De(s,"z",at.z,l,c,t,e,n),Fo=De(s,"w",at.w,l,c,t,e,n),vt.set(s.x,s.y,s.z,s.w).normalize(),jo.set(a.__damp.velocity_x,a.__damp.velocity_y,a.__damp.velocity_z,a.__damp.velocity_w),or.copy(vt).multiplyScalar(jo.dot(vt)/vt.dot(vt)),a.__damp.velocity_x-=or.x,a.__damp.velocity_y-=or.y,a.__damp.velocity_z-=or.z,a.__damp.velocity_w-=or.w,s.set(vt.x,vt.y,vt.z,vt.w),Eo||Ro||Lo||Fo}var ar=new fa,Po,Do,Io;function zi(s,r,l,c,t,e,n){return Array.isArray(r)?ar.set(r[0],r[1],r[2]):ar.copy(r),Po=De(s,"radius",ar.radius,l,c,t,e,n),Do=zt(s,"phi",ar.phi,l,c,t,e,n),Io=zt(s,"theta",ar.theta,l,c,t,e,n),Po||Do||Io}var kr=new zr,zo=new xe,Go=new At,Oo=new xe,Bo,Wo,No;function Gi(s,r,l,c,t,e,n){var a=s;return a.__damp===void 0&&(a.__damp={position:new xe,rotation:new At,scale:new xe},s.decompose(a.__damp.position,a.__damp.rotation,a.__damp.scale)),Array.isArray(r)?kr.set.apply(kr,vi(r)):kr.copy(r),kr.decompose(zo,Go,Oo),Bo=_n(a.__damp.position,zo,l,c,t,e,n),Wo=Dr(a.__damp.rotation,Go,l,c,t,e,n),No=_n(a.__damp.scale,Oo,l,c,t,e,n),s.compose(a.__damp.position,a.__damp.rotation,a.__damp.scale),Bo||Wo||No}var Ho=Object.freeze({__proto__:null,rsqw:Mi,exp:va,linear:_i,sine:Ti,cubic:ki,quint:Ui,circ:Ci,quart:Ai,expo:ji,damp:De,dampLookAt:Li,dampAngle:zt,damp2:Fi,damp3:_n,damp4:Pi,dampE:Di,dampC:Ii,dampQ:Dr,dampS:zi,dampM:Gi});const Rn=w.createContext(null);function Ke(){return w.useContext(Rn)}function Oi({eps:s=1e-5,enabled:r=!0,infinite:l,horizontal:c,pages:t=1,distance:e=1,damping:n=.25,maxSpeed:a=1/0,prepend:o=!1,style:i={},children:f}){const{get:d,setEvents:h,gl:p,size:m,invalidate:g,events:y}=Wt(),[M]=w.useState(()=>document.createElement("div")),[_]=w.useState(()=>document.createElement("div")),[v]=w.useState(()=>document.createElement("div")),S=p.domElement.parentNode,T=w.useRef(0),E=w.useMemo(()=>({el:M,eps:s,fill:_,fixed:v,horizontal:c,damping:n,offset:0,delta:0,scroll:T,pages:t,range(L,F,V=0){const b=L-V,P=b+F+V*2;return this.offset<b?0:this.offset>P?1:(this.offset-b)/(P-b)},curve(L,F,V=0){return Math.sin(this.range(L,F,V)*Math.PI)},visible(L,F,V=0){const b=L-V,P=b+F+V*2;return this.offset>=b&&this.offset<=P}}),[s,n,c,t]);w.useEffect(()=>{M.style.position="absolute",M.style.width="100%",M.style.height="100%",M.style[c?"overflowX":"overflowY"]="auto",M.style[c?"overflowY":"overflowX"]="hidden",M.style.top="0px",M.style.left="0px";for(const F in i)M.style[F]=i[F];v.style.position="sticky",v.style.top="0px",v.style.left="0px",v.style.width="100%",v.style.height="100%",v.style.overflow="hidden",M.appendChild(v),_.style.height=c?"100%":`${t*e*100}%`,_.style.width=c?`${t*e*100}%`:"100%",_.style.pointerEvents="none",M.appendChild(_),o?S.prepend(M):S.appendChild(M),M[c?"scrollLeft":"scrollTop"]=1;const C=y.connected||p.domElement;requestAnimationFrame(()=>y.connect==null?void 0:y.connect(M));const L=d().events.compute;return h({compute(F,V){const{left:b,top:P}=S.getBoundingClientRect(),R=F.clientX-b,Y=F.clientY-P;V.pointer.set(R/V.size.width*2-1,-(Y/V.size.height)*2+1),V.raycaster.setFromCamera(V.pointer,V.camera)}}),()=>{S.removeChild(M),h({compute:L}),y.connect==null||y.connect(C)}},[t,e,c,M,_,v,S]),w.useEffect(()=>{if(y.connected===M){const C=m[c?"width":"height"],L=M[c?"scrollWidth":"scrollHeight"],F=L-C;let V=0,b=!0,P=!0;const R=()=>{if(!(!r||P)&&(g(),V=M[c?"scrollLeft":"scrollTop"],T.current=V/F,l)){if(!b){if(V>=F){const W=1-E.offset;M[c?"scrollLeft":"scrollTop"]=1,T.current=E.offset=-W,b=!0}else if(V<=0){const W=1+E.offset;M[c?"scrollLeft":"scrollTop"]=L,T.current=E.offset=W,b=!0}}b&&setTimeout(()=>b=!1,40)}};M.addEventListener("scroll",R,{passive:!0}),requestAnimationFrame(()=>P=!1);const Y=W=>M.scrollLeft+=W.deltaY/2;return c&&M.addEventListener("wheel",Y,{passive:!0}),()=>{M.removeEventListener("scroll",R),c&&M.removeEventListener("wheel",Y)}}},[M,y,m,l,E,g,c,r]);let U=0;return ve((C,L)=>{U=E.offset,Ho.damp(E,"offset",T.current,n,L,a,void 0,s),Ho.damp(E,"delta",Math.abs(U-E.offset),n,L,a,void 0,s),E.delta>s&&g()}),w.createElement(Rn.Provider,{value:E},f)}const Bi=w.forwardRef(({children:s},r)=>{const l=w.useRef(null);w.useImperativeHandle(r,()=>l.current,[]);const c=Ke(),{width:t,height:e}=Wt(n=>n.viewport);return ve(()=>{l.current.position.x=c.horizontal?-t*(c.pages-1)*c.offset:0,l.current.position.y=c.horizontal?0:e*(c.pages-1)*c.offset}),w.createElement("group",{ref:l},s)}),Wi=w.forwardRef(({children:s,style:r,...l},c)=>{const t=Ke(),e=w.useRef(null);w.useImperativeHandle(c,()=>e.current,[]);const{width:n,height:a}=Wt(f=>f.size),o=w.useContext(ao),i=w.useMemo(()=>za(t.fixed),[t.fixed]);return ve(()=>{t.delta>t.eps&&(e.current.style.transform=`translate3d(${t.horizontal?-n*(t.pages-1)*t.offset:0}px,${t.horizontal?0:a*(t.pages-1)*-t.offset}px,0)`)}),i.render(w.createElement("div",Gt({ref:e,style:{...r,position:"absolute",top:0,left:0,willChange:"transform"}},l),w.createElement(Rn.Provider,{value:t},w.createElement(ao.Provider,{value:o},s)))),null}),Ni=w.forwardRef(({html:s,...r},l)=>{const c=s?Wi:Bi;return w.createElement(c,Gt({ref:l},r))}),ma=parseInt(Ba.replace(/\D+/g,"")),ga=ma>=125?"uv1":"uv2",Vo=new Gr,Ur=new xe;class Ln extends ua{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const r=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],l=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],c=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(c),this.setAttribute("position",new xn(r,3)),this.setAttribute("uv",new xn(l,2))}applyMatrix4(r){const l=this.attributes.instanceStart,c=this.attributes.instanceEnd;return l!==void 0&&(l.applyMatrix4(r),c.applyMatrix4(r),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(r){let l;r instanceof Float32Array?l=r:Array.isArray(r)&&(l=new Float32Array(r));const c=new wn(l,6,1);return this.setAttribute("instanceStart",new It(c,3,0)),this.setAttribute("instanceEnd",new It(c,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(r,l=3){let c;r instanceof Float32Array?c=r:Array.isArray(r)&&(c=new Float32Array(r));const t=new wn(c,l*2,1);return this.setAttribute("instanceColorStart",new It(t,l,0)),this.setAttribute("instanceColorEnd",new It(t,l,l)),this}fromWireframeGeometry(r){return this.setPositions(r.attributes.position.array),this}fromEdgesGeometry(r){return this.setPositions(r.attributes.position.array),this}fromMesh(r){return this.fromWireframeGeometry(new Wa(r.geometry)),this}fromLineSegments(r){const l=r.geometry;return this.setPositions(l.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gr);const r=this.attributes.instanceStart,l=this.attributes.instanceEnd;r!==void 0&&l!==void 0&&(this.boundingBox.setFromBufferAttribute(r),Vo.setFromBufferAttribute(l),this.boundingBox.union(Vo))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new En),this.boundingBox===null&&this.computeBoundingBox();const r=this.attributes.instanceStart,l=this.attributes.instanceEnd;if(r!==void 0&&l!==void 0){const c=this.boundingSphere.center;this.boundingBox.getCenter(c);let t=0;for(let e=0,n=r.count;e<n;e++)Ur.fromBufferAttribute(r,e),t=Math.max(t,c.distanceToSquared(Ur)),Ur.fromBufferAttribute(l,e),t=Math.max(t,c.distanceToSquared(Ur));this.boundingSphere.radius=Math.sqrt(t),isNaN(this.boundingSphere.radius)}}toJSON(){}applyMatrix(r){return this.applyMatrix4(r)}}class ya extends Ln{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(r){const l=r.length-3,c=new Float32Array(2*l);for(let t=0;t<l;t+=3)c[2*t]=r[t],c[2*t+1]=r[t+1],c[2*t+2]=r[t+2],c[2*t+3]=r[t+3],c[2*t+4]=r[t+4],c[2*t+5]=r[t+5];return super.setPositions(c),this}setColors(r,l=3){const c=r.length-l,t=new Float32Array(2*c);if(l===3)for(let e=0;e<c;e+=l)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5];else for(let e=0;e<c;e+=l)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5],t[2*e+6]=r[e+6],t[2*e+7]=r[e+7];return super.setColors(t,l),this}fromLine(r){const l=r.geometry;return this.setPositions(l.attributes.position.array),this}}class Fn extends da{constructor(r){super({type:"LineMaterial",uniforms:bn.clone(bn.merge([io.common,io.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new mt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${ma>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(l){this.uniforms.diffuse.value=l}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(l){l===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(l){this.uniforms.linewidth.value=l}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(l){!!l!="USE_DASH"in this.defines&&(this.needsUpdate=!0),l===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(l){this.uniforms.dashScale.value=l}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(l){this.uniforms.dashSize.value=l}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(l){this.uniforms.dashOffset.value=l}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(l){this.uniforms.gapSize.value=l}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(l){this.uniforms.opacity.value=l}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(l){this.uniforms.resolution.value.copy(l)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(l){!!l!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),l===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(r)}}const un=new tt,Xo=new xe,Yo=new xe,Oe=new tt,Be=new tt,ct=new tt,dn=new xe,hn=new zr,Ne=new Na,Zo=new xe,Cr=new Gr,Ar=new En,ft=new tt;let dt,Ut;function qo(s,r,l){return ft.set(0,0,-r,1).applyMatrix4(s.projectionMatrix),ft.multiplyScalar(1/ft.w),ft.x=Ut/l.width,ft.y=Ut/l.height,ft.applyMatrix4(s.projectionMatrixInverse),ft.multiplyScalar(1/ft.w),Math.abs(Math.max(ft.x,ft.y))}function Hi(s,r){const l=s.matrixWorld,c=s.geometry,t=c.attributes.instanceStart,e=c.attributes.instanceEnd,n=Math.min(c.instanceCount,t.count);for(let a=0,o=n;a<o;a++){Ne.start.fromBufferAttribute(t,a),Ne.end.fromBufferAttribute(e,a),Ne.applyMatrix4(l);const i=new xe,f=new xe;dt.distanceSqToSegment(Ne.start,Ne.end,f,i),f.distanceTo(i)<Ut*.5&&r.push({point:f,pointOnLine:i,distance:dt.origin.distanceTo(f),object:s,face:null,faceIndex:a,uv:null,[ga]:null})}}function Vi(s,r,l){const c=r.projectionMatrix,e=s.material.resolution,n=s.matrixWorld,a=s.geometry,o=a.attributes.instanceStart,i=a.attributes.instanceEnd,f=Math.min(a.instanceCount,o.count),d=-r.near;dt.at(1,ct),ct.w=1,ct.applyMatrix4(r.matrixWorldInverse),ct.applyMatrix4(c),ct.multiplyScalar(1/ct.w),ct.x*=e.x/2,ct.y*=e.y/2,ct.z=0,dn.copy(ct),hn.multiplyMatrices(r.matrixWorldInverse,n);for(let h=0,p=f;h<p;h++){if(Oe.fromBufferAttribute(o,h),Be.fromBufferAttribute(i,h),Oe.w=1,Be.w=1,Oe.applyMatrix4(hn),Be.applyMatrix4(hn),Oe.z>d&&Be.z>d)continue;if(Oe.z>d){const v=Oe.z-Be.z,S=(Oe.z-d)/v;Oe.lerp(Be,S)}else if(Be.z>d){const v=Be.z-Oe.z,S=(Be.z-d)/v;Be.lerp(Oe,S)}Oe.applyMatrix4(c),Be.applyMatrix4(c),Oe.multiplyScalar(1/Oe.w),Be.multiplyScalar(1/Be.w),Oe.x*=e.x/2,Oe.y*=e.y/2,Be.x*=e.x/2,Be.y*=e.y/2,Ne.start.copy(Oe),Ne.start.z=0,Ne.end.copy(Be),Ne.end.z=0;const g=Ne.closestPointToPointParameter(dn,!0);Ne.at(g,Zo);const y=Ye.lerp(Oe.z,Be.z,g),M=y>=-1&&y<=1,_=dn.distanceTo(Zo)<Ut*.5;if(M&&_){Ne.start.fromBufferAttribute(o,h),Ne.end.fromBufferAttribute(i,h),Ne.start.applyMatrix4(n),Ne.end.applyMatrix4(n);const v=new xe,S=new xe;dt.distanceSqToSegment(Ne.start,Ne.end,S,v),l.push({point:S,pointOnLine:v,distance:dt.origin.distanceTo(S),object:s,face:null,faceIndex:h,uv:null,[ga]:null})}}}class xa extends Or{constructor(r=new Ln,l=new Fn({color:Math.random()*16777215})){super(r,l),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const r=this.geometry,l=r.attributes.instanceStart,c=r.attributes.instanceEnd,t=new Float32Array(2*l.count);for(let n=0,a=0,o=l.count;n<o;n++,a+=2)Xo.fromBufferAttribute(l,n),Yo.fromBufferAttribute(c,n),t[a]=a===0?0:t[a-1],t[a+1]=t[a]+Xo.distanceTo(Yo);const e=new wn(t,2,1);return r.setAttribute("instanceDistanceStart",new It(e,1,0)),r.setAttribute("instanceDistanceEnd",new It(e,1,1)),this}raycast(r,l){const c=this.material.worldUnits,t=r.camera,e=r.params.Line2!==void 0&&r.params.Line2.threshold||0;dt=r.ray;const n=this.matrixWorld,a=this.geometry,o=this.material;Ut=o.linewidth+e,a.boundingSphere===null&&a.computeBoundingSphere(),Ar.copy(a.boundingSphere).applyMatrix4(n);let i;if(c)i=Ut*.5;else{const d=Math.max(t.near,Ar.distanceToPoint(dt.origin));i=qo(t,d,o.resolution)}if(Ar.radius+=i,dt.intersectsSphere(Ar)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Cr.copy(a.boundingBox).applyMatrix4(n);let f;if(c)f=Ut*.5;else{const d=Math.max(t.near,Cr.distanceToPoint(dt.origin));f=qo(t,d,o.resolution)}Cr.expandByScalar(f),dt.intersectsBox(Cr)!==!1&&(c?Hi(this,l):Vi(this,t,l))}onBeforeRender(r){const l=this.material.uniforms;l&&l.resolution&&(r.getViewport(un),this.material.uniforms.resolution.value.set(un.z,un.w))}}class Xi extends xa{constructor(r=new ya,l=new Fn({color:Math.random()*16777215})){super(r,l),this.isLine2=!0,this.type="Line2"}}const wa=w.forwardRef(function({children:r,follow:l=!0,lockX:c=!1,lockY:t=!1,lockZ:e=!1,...n},a){const o=w.useRef(null),i=w.useRef(null),f=new At;return ve(({camera:d})=>{if(!l||!i.current)return;const h=i.current.rotation.clone();i.current.updateMatrix(),i.current.updateWorldMatrix(!1,!1),i.current.getWorldQuaternion(f),d.getWorldQuaternion(o.current.quaternion).premultiply(f.invert()),c&&(i.current.rotation.x=h.x),t&&(i.current.rotation.y=h.y),e&&(i.current.rotation.z=h.z)}),w.useImperativeHandle(a,()=>i.current,[]),w.createElement("group",Gt({ref:i},n),w.createElement("group",{ref:o},r))}),Yi=w.forwardRef(function({points:r,color:l=16777215,vertexColors:c,linewidth:t,lineWidth:e,segments:n,dashed:a,...o},i){var f,d;const h=Wt(M=>M.size),p=w.useMemo(()=>n?new xa:new Xi,[n]),[m]=w.useState(()=>new Fn),g=(c==null||(f=c[0])==null?void 0:f.length)===4?4:3,y=w.useMemo(()=>{const M=n?new Ln:new ya,_=r.map(v=>{const S=Array.isArray(v);return v instanceof xe||v instanceof tt?[v.x,v.y,v.z]:v instanceof mt?[v.x,v.y,0]:S&&v.length===3?[v[0],v[1],v[2]]:S&&v.length===2?[v[0],v[1],0]:v});if(M.setPositions(_.flat()),c){l=16777215;const v=c.map(S=>S instanceof Ee?S.toArray():S);M.setColors(v.flat(),g)}return M},[r,n,c,g]);return w.useLayoutEffect(()=>{p.computeLineDistances()},[r,p]),w.useLayoutEffect(()=>{a?m.defines.USE_DASH="":delete m.defines.USE_DASH,m.needsUpdate=!0},[a,m]),w.useEffect(()=>()=>{y.dispose(),m.dispose()},[y]),w.createElement("primitive",Gt({object:p,ref:i},o),w.createElement("primitive",{object:y,attach:"geometry"}),w.createElement("primitive",Gt({object:m,attach:"material",color:l,vertexColors:!!c,resolution:[h.width,h.height],linewidth:(d=t??e)!==null&&d!==void 0?d:1,dashed:a,transparent:g===4},o)))});function Zi(){var s=Object.create(null);function r(t,e){var n=t.id,a=t.name,o=t.dependencies;o===void 0&&(o=[]);var i=t.init;i===void 0&&(i=function(){});var f=t.getTransferables;if(f===void 0&&(f=null),!s[n])try{o=o.map(function(h){return h&&h.isWorkerModule&&(r(h,function(p){if(p instanceof Error)throw p}),h=s[h.id].value),h}),i=c("<"+a+">.init",i),f&&(f=c("<"+a+">.getTransferables",f));var d=null;typeof i=="function"&&(d=i.apply(void 0,o)),s[n]={id:n,value:d,getTransferables:f},e(d)}catch(h){h&&h.noLog,e(h)}}function l(t,e){var n,a=t.id,o=t.args;(!s[a]||typeof s[a].value!="function")&&e(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var i=(n=s[a]).value.apply(n,o);i&&typeof i.then=="function"?i.then(f,function(d){return e(d instanceof Error?d:new Error(""+d))}):f(i)}catch(d){e(d)}function f(d){try{var h=s[a].getTransferables&&s[a].getTransferables(d);(!h||!Array.isArray(h)||!h.length)&&(h=void 0),e(d,h)}catch(p){e(p)}}}function c(t,e){var n=void 0;self.troikaDefine=function(o){return n=o};var a=URL.createObjectURL(new Blob(["/** "+t.replace(/\*/g,"")+` **/

troikaDefine(
`+e+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch{}return URL.revokeObjectURL(a),delete self.troikaDefine,n}self.addEventListener("message",function(t){var e=t.data,n=e.messageId,a=e.action,o=e.data;try{a==="registerModule"&&r(o,function(i){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:{isCallable:typeof i=="function"}})}),a==="callModule"&&l(o,function(i,f){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:i},f||void 0)})}catch(i){postMessage({messageId:n,success:!1,error:i.stack})}})}function qi(s){var r=function(){for(var l=[],c=arguments.length;c--;)l[c]=arguments[c];return r._getInitResult().then(function(t){if(typeof t=="function")return t.apply(void 0,l);throw new Error("Worker module function was called but `init` did not return a callable function")})};return r._getInitResult=function(){var l=s.dependencies,c=s.init;l=Array.isArray(l)?l.map(function(e){return e&&e._getInitResult?e._getInitResult():e}):[];var t=Promise.all(l).then(function(e){return c.apply(null,e)});return r._getInitResult=function(){return t},t},r}var ba=function(){var s=!1;if(typeof window<"u"&&typeof window.document<"u")try{var r=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));r.terminate(),s=!0}catch{}return ba=function(){return s},s},Qi=0,Ji=0,pn=!1,cr=Object.create(null),fr=Object.create(null),Tn=Object.create(null);function Nt(s){if((!s||typeof s.init!="function")&&!pn)throw new Error("requires `options.init` function");var r=s.dependencies,l=s.init,c=s.getTransferables,t=s.workerId;if(!ba())return qi(s);t==null&&(t="#default");var e="workerModule"+ ++Qi,n=s.name||e,a=null;r=r&&r.map(function(i){return typeof i=="function"&&!i.workerModuleData&&(pn=!0,i=Nt({workerId:t,name:"<"+n+"> function dependency: "+i.name,init:`function(){return (
`+Fr(i)+`
)}`}),pn=!1),i&&i.workerModuleData&&(i=i.workerModuleData),i});function o(){for(var i=[],f=arguments.length;f--;)i[f]=arguments[f];if(!a){a=Qo(t,"registerModule",o.workerModuleData);var d=function(){a=null,fr[t].delete(d)};(fr[t]||(fr[t]=new Set)).add(d)}return a.then(function(h){var p=h.isCallable;if(p)return Qo(t,"callModule",{id:e,args:i});throw new Error("Worker module function was called but `init` did not return a callable function")})}return o.workerModuleData={isWorkerModule:!0,id:e,name:n,dependencies:r,init:Fr(l),getTransferables:c&&Fr(c)},o}function Ki(s){fr[s]&&fr[s].forEach(function(r){r()}),cr[s]&&(cr[s].terminate(),delete cr[s])}function Fr(s){var r=s.toString();return!/^function/.test(r)&&/^\w+\s*\(/.test(r)&&(r="function "+r),r}function $i(s){var r=cr[s];if(!r){var l=Fr(Zi);r=cr[s]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+s.replace(/\*/g,"")+` **/

;(`+l+")()"],{type:"application/javascript"}))),r.onmessage=function(c){var t=c.data,e=t.messageId,n=Tn[e];if(!n)throw new Error("WorkerModule response with empty or unknown messageId");delete Tn[e],n(t)}}return r}function Qo(s,r,l){return new Promise(function(c,t){var e=++Ji;Tn[e]=function(n){n.success?c(n.result):t(new Error("Error in worker "+r+" call: "+n.error))},$i(s).postMessage({messageId:e,action:r,data:l})})}function Sa(){var s=function(r){function l(B,z,x,k,A,D,j,N){var I=1-j;N.x=I*I*B+2*I*j*x+j*j*A,N.y=I*I*z+2*I*j*k+j*j*D}function c(B,z,x,k,A,D,j,N,I,O){var Q=1-I;O.x=Q*Q*Q*B+3*Q*Q*I*x+3*Q*I*I*A+I*I*I*j,O.y=Q*Q*Q*z+3*Q*Q*I*k+3*Q*I*I*D+I*I*I*N}function t(B,z){for(var x=/([MLQCZ])([^MLQCZ]*)/g,k,A,D,j,N;k=x.exec(B);){var I=k[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(O){return parseFloat(O)});switch(k[1]){case"M":j=A=I[0],N=D=I[1];break;case"L":(I[0]!==j||I[1]!==N)&&z("L",j,N,j=I[0],N=I[1]);break;case"Q":{z("Q",j,N,j=I[2],N=I[3],I[0],I[1]);break}case"C":{z("C",j,N,j=I[4],N=I[5],I[0],I[1],I[2],I[3]);break}case"Z":(j!==A||N!==D)&&z("L",j,N,A,D);break}}}function e(B,z,x){x===void 0&&(x=16);var k={x:0,y:0};t(B,function(A,D,j,N,I,O,Q,te,Z){switch(A){case"L":z(D,j,N,I);break;case"Q":{for(var H=D,ye=j,de=1;de<x;de++)l(D,j,O,Q,N,I,de/(x-1),k),z(H,ye,k.x,k.y),H=k.x,ye=k.y;break}case"C":{for(var $=D,re=j,ce=1;ce<x;ce++)c(D,j,O,Q,te,Z,N,I,ce/(x-1),k),z($,re,k.x,k.y),$=k.x,re=k.y;break}}})}var n="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",o=new WeakMap,i={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function f(B,z){var x=B.getContext?B.getContext("webgl",i):B,k=o.get(x);if(!k){let Q=function($){var re=D[$];if(!re&&(re=D[$]=x.getExtension($),!re))throw new Error($+" not supported");return re},te=function($,re){var ce=x.createShader(re);return x.shaderSource(ce,$),x.compileShader(ce),ce},Z=function($,re,ce,X){if(!j[$]){var ne={},ee={},G=x.createProgram();x.attachShader(G,te(re,x.VERTEX_SHADER)),x.attachShader(G,te(ce,x.FRAGMENT_SHADER)),x.linkProgram(G),j[$]={program:G,transaction:function(K){x.useProgram(G),K({setUniform:function(q,Me){for(var oe=[],se=arguments.length-2;se-- >0;)oe[se]=arguments[se+2];var ue=ee[Me]||(ee[Me]=x.getUniformLocation(G,Me));x["uniform"+q].apply(x,[ue].concat(oe))},setAttribute:function(q,Me,oe,se,ue){var me=ne[q];me||(me=ne[q]={buf:x.createBuffer(),loc:x.getAttribLocation(G,q),data:null}),x.bindBuffer(x.ARRAY_BUFFER,me.buf),x.vertexAttribPointer(me.loc,Me,x.FLOAT,!1,0,0),x.enableVertexAttribArray(me.loc),A?x.vertexAttribDivisor(me.loc,se):Q("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(me.loc,se),ue!==me.data&&(x.bufferData(x.ARRAY_BUFFER,ue,oe),me.data=ue)}})}}}j[$].transaction(X)},H=function($,re){I++;try{x.activeTexture(x.TEXTURE0+I);var ce=N[$];ce||(ce=N[$]=x.createTexture(),x.bindTexture(x.TEXTURE_2D,ce),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_MIN_FILTER,x.NEAREST),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_MAG_FILTER,x.NEAREST)),x.bindTexture(x.TEXTURE_2D,ce),re(ce,I)}finally{I--}},ye=function($,re,ce){var X=x.createFramebuffer();O.push(X),x.bindFramebuffer(x.FRAMEBUFFER,X),x.activeTexture(x.TEXTURE0+re),x.bindTexture(x.TEXTURE_2D,$),x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,$,0);try{ce(X)}finally{x.deleteFramebuffer(X),x.bindFramebuffer(x.FRAMEBUFFER,O[--O.length-1]||null)}},de=function(){D={},j={},N={},I=-1,O.length=0};var A=typeof WebGL2RenderingContext<"u"&&x instanceof WebGL2RenderingContext,D={},j={},N={},I=-1,O=[];x.canvas.addEventListener("webglcontextlost",function($){de(),$.preventDefault()},!1),o.set(x,k={gl:x,isWebGL2:A,getExtension:Q,withProgram:Z,withTexture:H,withTextureFramebuffer:ye,handleContextLoss:de})}z(k)}function d(B,z,x,k,A,D,j,N){j===void 0&&(j=15),N===void 0&&(N=null),f(B,function(I){var O=I.gl,Q=I.withProgram,te=I.withTexture;te("copy",function(Z,H){O.texImage2D(O.TEXTURE_2D,0,O.RGBA,A,D,0,O.RGBA,O.UNSIGNED_BYTE,z),Q("copy",n,a,function(ye){var de=ye.setUniform,$=ye.setAttribute;$("aUV",2,O.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),de("1i","image",H),O.bindFramebuffer(O.FRAMEBUFFER,N||null),O.disable(O.BLEND),O.colorMask(j&8,j&4,j&2,j&1),O.viewport(x,k,A,D),O.scissor(x,k,A,D),O.drawArrays(O.TRIANGLES,0,3)})})})}function h(B,z,x){var k=B.width,A=B.height;f(B,function(D){var j=D.gl,N=new Uint8Array(k*A*4);j.readPixels(0,0,k,A,j.RGBA,j.UNSIGNED_BYTE,N),B.width=z,B.height=x,d(j,N,0,0,k,A)})}var p=Object.freeze({__proto__:null,withWebGLContext:f,renderImageData:d,resizeWebGLCanvasWithoutClearing:h});function m(B,z,x,k,A,D){D===void 0&&(D=1);var j=new Uint8Array(B*z),N=k[2]-k[0],I=k[3]-k[1],O=[];e(x,function($,re,ce,X){O.push({x1:$,y1:re,x2:ce,y2:X,minX:Math.min($,ce),minY:Math.min(re,X),maxX:Math.max($,ce),maxY:Math.max(re,X)})}),O.sort(function($,re){return $.maxX-re.maxX});for(var Q=0;Q<B;Q++)for(var te=0;te<z;te++){var Z=ye(k[0]+N*(Q+.5)/B,k[1]+I*(te+.5)/z),H=Math.pow(1-Math.abs(Z)/A,D)/2;Z<0&&(H=1-H),H=Math.max(0,Math.min(255,Math.round(H*255))),j[te*B+Q]=H}return j;function ye($,re){for(var ce=1/0,X=1/0,ne=O.length;ne--;){var ee=O[ne];if(ee.maxX+X<=$)break;if($+X>ee.minX&&re-X<ee.maxY&&re+X>ee.minY){var G=M($,re,ee.x1,ee.y1,ee.x2,ee.y2);G<ce&&(ce=G,X=Math.sqrt(ce))}}return de($,re)&&(X=-X),X}function de($,re){for(var ce=0,X=O.length;X--;){var ne=O[X];if(ne.maxX<=$)break;var ee=ne.y1>re!=ne.y2>re&&$<(ne.x2-ne.x1)*(re-ne.y1)/(ne.y2-ne.y1)+ne.x1;ee&&(ce+=ne.y1<ne.y2?1:-1)}return ce!==0}}function g(B,z,x,k,A,D,j,N,I,O){D===void 0&&(D=1),N===void 0&&(N=0),I===void 0&&(I=0),O===void 0&&(O=0),y(B,z,x,k,A,D,j,null,N,I,O)}function y(B,z,x,k,A,D,j,N,I,O,Q){D===void 0&&(D=1),I===void 0&&(I=0),O===void 0&&(O=0),Q===void 0&&(Q=0);for(var te=m(B,z,x,k,A,D),Z=new Uint8Array(te.length*4),H=0;H<te.length;H++)Z[H*4+Q]=te[H];d(j,Z,I,O,B,z,1<<3-Q,N)}function M(B,z,x,k,A,D){var j=A-x,N=D-k,I=j*j+N*N,O=I?Math.max(0,Math.min(1,((B-x)*j+(z-k)*N)/I)):0,Q=B-(x+O*j),te=z-(k+O*N);return Q*Q+te*te}var _=Object.freeze({__proto__:null,generate:m,generateIntoCanvas:g,generateIntoFramebuffer:y}),v="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",S="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",T="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",E=new Float32Array([0,0,2,0,0,2]),U=null,C=!1,L={},F=new WeakMap;function V(B){if(!C&&!Y(B))throw new Error("WebGL generation not supported")}function b(B,z,x,k,A,D,j){if(D===void 0&&(D=1),j===void 0&&(j=null),!j&&(j=U,!j)){var N=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!N)throw new Error("OffscreenCanvas or DOM canvas not supported");j=U=N.getContext("webgl",{depth:!1})}V(j);var I=new Uint8Array(B*z*4);f(j,function(Z){var H=Z.gl,ye=Z.withTexture,de=Z.withTextureFramebuffer;ye("readable",function($,re){H.texImage2D(H.TEXTURE_2D,0,H.RGBA,B,z,0,H.RGBA,H.UNSIGNED_BYTE,null),de($,re,function(ce){R(B,z,x,k,A,D,H,ce,0,0,0),H.readPixels(0,0,B,z,H.RGBA,H.UNSIGNED_BYTE,I)})})});for(var O=new Uint8Array(B*z),Q=0,te=0;Q<I.length;Q+=4)O[te++]=I[Q];return O}function P(B,z,x,k,A,D,j,N,I,O){D===void 0&&(D=1),N===void 0&&(N=0),I===void 0&&(I=0),O===void 0&&(O=0),R(B,z,x,k,A,D,j,null,N,I,O)}function R(B,z,x,k,A,D,j,N,I,O,Q){D===void 0&&(D=1),I===void 0&&(I=0),O===void 0&&(O=0),Q===void 0&&(Q=0),V(j);var te=[];e(x,function(Z,H,ye,de){te.push(Z,H,ye,de)}),te=new Float32Array(te),f(j,function(Z){var H=Z.gl,ye=Z.isWebGL2,de=Z.getExtension,$=Z.withProgram,re=Z.withTexture,ce=Z.withTextureFramebuffer,X=Z.handleContextLoss;if(re("rawDistances",function(ne,ee){(B!==ne._lastWidth||z!==ne._lastHeight)&&H.texImage2D(H.TEXTURE_2D,0,H.RGBA,ne._lastWidth=B,ne._lastHeight=z,0,H.RGBA,H.UNSIGNED_BYTE,null),$("main",v,S,function(G){var pe=G.setAttribute,K=G.setUniform,ie=!ye&&de("ANGLE_instanced_arrays"),q=!ye&&de("EXT_blend_minmax");pe("aUV",2,H.STATIC_DRAW,0,E),pe("aLineSegment",4,H.DYNAMIC_DRAW,1,te),K.apply(void 0,["4f","uGlyphBounds"].concat(k)),K("1f","uMaxDistance",A),K("1f","uExponent",D),ce(ne,ee,function(Me){H.enable(H.BLEND),H.colorMask(!0,!0,!0,!0),H.viewport(0,0,B,z),H.scissor(0,0,B,z),H.blendFunc(H.ONE,H.ONE),H.blendEquationSeparate(H.FUNC_ADD,ye?H.MAX:q.MAX_EXT),H.clear(H.COLOR_BUFFER_BIT),ye?H.drawArraysInstanced(H.TRIANGLES,0,3,te.length/4):ie.drawArraysInstancedANGLE(H.TRIANGLES,0,3,te.length/4)})}),$("post",n,T,function(G){G.setAttribute("aUV",2,H.STATIC_DRAW,0,E),G.setUniform("1i","tex",ee),H.bindFramebuffer(H.FRAMEBUFFER,N),H.disable(H.BLEND),H.colorMask(Q===0,Q===1,Q===2,Q===3),H.viewport(I,O,B,z),H.scissor(I,O,B,z),H.drawArrays(H.TRIANGLES,0,3)})}),H.isContextLost())throw X(),new Error("webgl context lost")})}function Y(B){var z=!B||B===U?L:B.canvas||B,x=F.get(z);if(x===void 0){C=!0;var k=null;try{var A=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],D=b(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,B);x=D&&A.length===D.length&&D.every(function(j,N){return j===A[N]}),x||(k="bad trial run results")}catch(j){x=!1,k=j.message}C=!1,F.set(z,x)}return x}var W=Object.freeze({__proto__:null,generate:b,generateIntoCanvas:P,generateIntoFramebuffer:R,isSupported:Y});function J(B,z,x,k,A,D){A===void 0&&(A=Math.max(k[2]-k[0],k[3]-k[1])/2),D===void 0&&(D=1);try{return b.apply(W,arguments)}catch{return m.apply(_,arguments)}}function ae(B,z,x,k,A,D,j,N,I,O){A===void 0&&(A=Math.max(k[2]-k[0],k[3]-k[1])/2),D===void 0&&(D=1),N===void 0&&(N=0),I===void 0&&(I=0),O===void 0&&(O=0);try{return P.apply(W,arguments)}catch{return g.apply(_,arguments)}}return r.forEachPathCommand=t,r.generate=J,r.generateIntoCanvas=ae,r.javascript=_,r.pathToLineSegments=e,r.webgl=W,r.webglUtils=p,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return s}function es(){var s=function(r){var l={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},c={},t={};c.L=1,t[1]="L",Object.keys(l).forEach(function(X,ne){c[X]=1<<ne+1,t[c[X]]=X}),Object.freeze(c);var e=c.LRI|c.RLI|c.FSI,n=c.L|c.R|c.AL,a=c.B|c.S|c.WS|c.ON|c.FSI|c.LRI|c.RLI|c.PDI,o=c.BN|c.RLE|c.LRE|c.RLO|c.LRO|c.PDF,i=c.S|c.WS|c.B|e|c.PDI|o,f=null;function d(){if(!f){f=new Map;var X=function(ee){if(l.hasOwnProperty(ee)){var G=0;l[ee].split(",").forEach(function(pe){var K=pe.split("+"),ie=K[0],q=K[1];ie=parseInt(ie,36),q=q?parseInt(q,36):0,f.set(G+=ie,c[ee]);for(var Me=0;Me<q;Me++)f.set(++G,c[ee])})}};for(var ne in l)X(ne)}}function h(X){return d(),f.get(X.codePointAt(0))||c.L}function p(X){return t[h(X)]}var m={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function g(X,ne){var ee=36,G=0,pe=new Map,K=ne&&new Map,ie;return X.split(",").forEach(function q(Me){if(Me.indexOf("+")!==-1)for(var oe=+Me;oe--;)q(ie);else{ie=Me;var se=Me.split(">"),ue=se[0],me=se[1];ue=String.fromCodePoint(G+=parseInt(ue,ee)),me=String.fromCodePoint(G+=parseInt(me,ee)),pe.set(ue,me),ne&&K.set(me,ue)}}),{map:pe,reverseMap:K}}var y,M,_;function v(){if(!y){var X=g(m.pairs,!0),ne=X.map,ee=X.reverseMap;y=ne,M=ee,_=g(m.canonical,!1).map}}function S(X){return v(),y.get(X)||null}function T(X){return v(),M.get(X)||null}function E(X){return v(),_.get(X)||null}var U=c.L,C=c.R,L=c.EN,F=c.ES,V=c.ET,b=c.AN,P=c.CS,R=c.B,Y=c.S,W=c.ON,J=c.BN,ae=c.NSM,B=c.AL,z=c.LRO,x=c.RLO,k=c.LRE,A=c.RLE,D=c.PDF,j=c.LRI,N=c.RLI,I=c.FSI,O=c.PDI;function Q(X,ne){for(var ee=125,G=new Uint32Array(X.length),pe=0;pe<X.length;pe++)G[pe]=h(X[pe]);var K=new Map;function ie(Qe,ot){var Je=G[Qe];G[Qe]=ot,K.set(Je,K.get(Je)-1),Je&a&&K.set(a,K.get(a)-1),K.set(ot,(K.get(ot)||0)+1),ot&a&&K.set(a,(K.get(a)||0)+1)}for(var q=new Uint8Array(X.length),Me=new Map,oe=[],se=null,ue=0;ue<X.length;ue++)se||oe.push(se={start:ue,end:X.length-1,level:ne==="rtl"?1:ne==="ltr"?0:no(ue,!1)}),G[ue]&R&&(se.end=ue,se=null);for(var me=A|k|x|z|e|O|D|R,ke=function(Qe){return Qe+(Qe&1?1:2)},Re=function(Qe){return Qe+(Qe&1?2:1)},we=0;we<oe.length;we++){se=oe[we];var be=[{_level:se.level,_override:0,_isolate:0}],fe=void 0,Le=0,Ce=0,qe=0;K.clear();for(var Ue=se.start;Ue<=se.end;Ue++){var he=G[Ue];if(fe=be[be.length-1],K.set(he,(K.get(he)||0)+1),he&a&&K.set(a,(K.get(a)||0)+1),he&me)if(he&(A|k)){q[Ue]=fe._level;var _e=(he===A?Re:ke)(fe._level);_e<=ee&&!Le&&!Ce?be.push({_level:_e,_override:0,_isolate:0}):Le||Ce++}else if(he&(x|z)){q[Ue]=fe._level;var yt=(he===x?Re:ke)(fe._level);yt<=ee&&!Le&&!Ce?be.push({_level:yt,_override:he&x?C:U,_isolate:0}):Le||Ce++}else if(he&e){he&I&&(he=no(Ue+1,!0)===1?N:j),q[Ue]=fe._level,fe._override&&ie(Ue,fe._override);var Te=(he===N?Re:ke)(fe._level);Te<=ee&&Le===0&&Ce===0?(qe++,be.push({_level:Te,_override:0,_isolate:1,_isolInitIndex:Ue})):Le++}else if(he&O){if(Le>0)Le--;else if(qe>0){for(Ce=0;!be[be.length-1]._isolate;)be.pop();var Se=be[be.length-1]._isolInitIndex;Se!=null&&(Me.set(Se,Ue),Me.set(Ue,Se)),be.pop(),qe--}fe=be[be.length-1],q[Ue]=fe._level,fe._override&&ie(Ue,fe._override)}else he&D?(Le===0&&(Ce>0?Ce--:!fe._isolate&&be.length>1&&(be.pop(),fe=be[be.length-1])),q[Ue]=fe._level):he&R&&(q[Ue]=se.level);else q[Ue]=fe._level,fe._override&&he!==J&&ie(Ue,fe._override)}for(var Fe=[],Ae=null,ge=se.start;ge<=se.end;ge++){var je=G[ge];if(!(je&o)){var Ve=q[ge],He=je&e,Pe=je===O;Ae&&Ve===Ae._level?(Ae._end=ge,Ae._endsWithIsolInit=He):Fe.push(Ae={_start:ge,_end:ge,_level:Ve,_startsWithPDI:Pe,_endsWithIsolInit:He})}}for(var rt=[],xt=0;xt<Fe.length;xt++){var ht=Fe[xt];if(!ht._startsWithPDI||ht._startsWithPDI&&!Me.has(ht._start)){for(var wt=[Ae=ht],Mt=void 0;Ae&&Ae._endsWithIsolInit&&(Mt=Me.get(Ae._end))!=null;)for(var pt=xt+1;pt<Fe.length;pt++)if(Fe[pt]._start===Mt){wt.push(Ae=Fe[pt]);break}for(var Xe=[],_t=0;_t<wt.length;_t++)for(var In=wt[_t],Nr=In._start;Nr<=In._end;Nr++)Xe.push(Nr);for(var Ra=q[Xe[0]],zn=se.level,hr=Xe[0]-1;hr>=0;hr--)if(!(G[hr]&o)){zn=q[hr];break}var Hr=Xe[Xe.length-1],La=q[Hr],Gn=se.level;if(!(G[Hr]&e)){for(var pr=Hr+1;pr<=se.end;pr++)if(!(G[pr]&o)){Gn=q[pr];break}}rt.push({_seqIndices:Xe,_sosType:Math.max(zn,Ra)%2?C:U,_eosType:Math.max(Gn,La)%2?C:U})}}for(var Vr=0;Vr<rt.length;Vr++){var Xr=rt[Vr],le=Xr._seqIndices,Ht=Xr._sosType,Fa=Xr._eosType,jt=q[le[0]]&1?C:U;if(K.get(ae))for(var vr=0;vr<le.length;vr++){var On=le[vr];if(G[On]&ae){for(var Yr=Ht,mr=vr-1;mr>=0;mr--)if(!(G[le[mr]]&o)){Yr=G[le[mr]];break}ie(On,Yr&(e|O)?W:Yr)}}if(K.get(L))for(var gr=0;gr<le.length;gr++){var Bn=le[gr];if(G[Bn]&L)for(var yr=gr-1;yr>=-1;yr--){var Wn=yr===-1?Ht:G[le[yr]];if(Wn&n){Wn===B&&ie(Bn,b);break}}}if(K.get(B))for(var Zr=0;Zr<le.length;Zr++){var Nn=le[Zr];G[Nn]&B&&ie(Nn,C)}if(K.get(F)||K.get(P))for(var Vt=1;Vt<le.length-1;Vt++){var qr=le[Vt];if(G[qr]&(F|P)){for(var Et=0,Qr=0,Jr=Vt-1;Jr>=0&&(Et=G[le[Jr]],!!(Et&o));Jr--);for(var Kr=Vt+1;Kr<le.length&&(Qr=G[le[Kr]],!!(Qr&o));Kr++);Et===Qr&&(G[qr]===F?Et===L:Et&(L|b))&&ie(qr,Et)}}if(K.get(L))for(var lt=0;lt<le.length;lt++){var Pa=le[lt];if(G[Pa]&L){for(var xr=lt-1;xr>=0&&G[le[xr]]&(V|o);xr--)ie(le[xr],L);for(lt++;lt<le.length&&G[le[lt]]&(V|o|L);lt++)G[le[lt]]!==L&&ie(le[lt],L)}}if(K.get(V)||K.get(F)||K.get(P))for(var Xt=0;Xt<le.length;Xt++){var Hn=le[Xt];if(G[Hn]&(V|F|P)){ie(Hn,W);for(var wr=Xt-1;wr>=0&&G[le[wr]]&o;wr--)ie(le[wr],W);for(var br=Xt+1;br<le.length&&G[le[br]]&o;br++)ie(le[br],W)}}if(K.get(L))for(var $r=0,Vn=Ht;$r<le.length;$r++){var Xn=le[$r],en=G[Xn];en&L?Vn===U&&ie(Xn,U):en&n&&(Vn=en)}if(K.get(a)){var Yt=C|L|b,Yn=Yt|U,Sr=[];{for(var Rt=[],Lt=0;Lt<le.length;Lt++)if(G[le[Lt]]&a){var Zt=X[le[Lt]],Zn=void 0;if(S(Zt)!==null)if(Rt.length<63)Rt.push({char:Zt,seqIndex:Lt});else break;else if((Zn=T(Zt))!==null)for(var qt=Rt.length-1;qt>=0;qt--){var tn=Rt[qt].char;if(tn===Zn||tn===T(E(Zt))||S(E(tn))===Zt){Sr.push([Rt[qt].seqIndex,Lt]),Rt.length=qt;break}}}Sr.sort(function(Qe,ot){return Qe[0]-ot[0]})}for(var rn=0;rn<Sr.length;rn++){for(var qn=Sr[rn],Mr=qn[0],nn=qn[1],Qn=!1,nt=0,on=Mr+1;on<nn;on++){var Jn=le[on];if(G[Jn]&Yn){Qn=!0;var Kn=G[Jn]&Yt?C:U;if(Kn===jt){nt=Kn;break}}}if(Qn&&!nt){nt=Ht;for(var an=Mr-1;an>=0;an--){var $n=le[an];if(G[$n]&Yn){var eo=G[$n]&Yt?C:U;eo!==jt?nt=eo:nt=jt;break}}}if(nt){if(G[le[Mr]]=G[le[nn]]=nt,nt!==jt){for(var Qt=Mr+1;Qt<le.length;Qt++)if(!(G[le[Qt]]&o)){h(X[le[Qt]])&ae&&(G[le[Qt]]=nt);break}}if(nt!==jt){for(var Jt=nn+1;Jt<le.length;Jt++)if(!(G[le[Jt]]&o)){h(X[le[Jt]])&ae&&(G[le[Jt]]=nt);break}}}}for(var bt=0;bt<le.length;bt++)if(G[le[bt]]&a){for(var to=bt,sn=bt,ln=Ht,Kt=bt-1;Kt>=0;Kt--)if(G[le[Kt]]&o)to=Kt;else{ln=G[le[Kt]]&Yt?C:U;break}for(var ro=Fa,$t=bt+1;$t<le.length;$t++)if(G[le[$t]]&(a|o))sn=$t;else{ro=G[le[$t]]&Yt?C:U;break}for(var cn=to;cn<=sn;cn++)G[le[cn]]=ln===ro?ln:jt;bt=sn}}}for(var $e=se.start;$e<=se.end;$e++){var Da=q[$e],_r=G[$e];if(Da&1?_r&(U|L|b)&&q[$e]++:_r&C?q[$e]++:_r&(b|L)&&(q[$e]+=2),_r&o&&(q[$e]=$e===0?se.level:q[$e-1]),$e===se.end||h(X[$e])&(Y|R))for(var Tr=$e;Tr>=0&&h(X[Tr])&i;Tr--)q[Tr]=se.level}}return{levels:q,paragraphs:oe};function no(Qe,ot){for(var Je=Qe;Je<X.length;Je++){var St=G[Je];if(St&(C|B))return 1;if(St&(R|U)||ot&&St===O)return 0;if(St&e){var oo=Ia(Je);Je=oo===-1?X.length:oo}}return 0}function Ia(Qe){for(var ot=1,Je=Qe+1;Je<X.length;Je++){var St=G[Je];if(St&R)break;if(St&O){if(--ot===0)return Je}else St&e&&ot++}return-1}}var te="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",Z;function H(){if(!Z){var X=g(te,!0),ne=X.map,ee=X.reverseMap;ee.forEach(function(G,pe){ne.set(pe,G)}),Z=ne}}function ye(X){return H(),Z.get(X)||null}function de(X,ne,ee,G){var pe=X.length;ee=Math.max(0,ee==null?0:+ee),G=Math.min(pe-1,G==null?pe-1:+G);for(var K=new Map,ie=ee;ie<=G;ie++)if(ne[ie]&1){var q=ye(X[ie]);q!==null&&K.set(ie,q)}return K}function $(X,ne,ee,G){var pe=X.length;ee=Math.max(0,ee==null?0:+ee),G=Math.min(pe-1,G==null?pe-1:+G);var K=[];return ne.paragraphs.forEach(function(ie){var q=Math.max(ee,ie.start),Me=Math.min(G,ie.end);if(q<Me){for(var oe=ne.levels.slice(q,Me+1),se=Me;se>=q&&h(X[se])&i;se--)oe[se]=ie.level;for(var ue=ie.level,me=1/0,ke=0;ke<oe.length;ke++){var Re=oe[ke];Re>ue&&(ue=Re),Re<me&&(me=Re|1)}for(var we=ue;we>=me;we--)for(var be=0;be<oe.length;be++)if(oe[be]>=we){for(var fe=be;be+1<oe.length&&oe[be+1]>=we;)be++;be>fe&&K.push([fe+q,be+q])}}}),K}function re(X,ne,ee,G){var pe=ce(X,ne,ee,G),K=[].concat(X);return pe.forEach(function(ie,q){K[q]=(ne.levels[ie]&1?ye(X[ie]):null)||X[ie]}),K.join("")}function ce(X,ne,ee,G){for(var pe=$(X,ne,ee,G),K=[],ie=0;ie<X.length;ie++)K[ie]=ie;return pe.forEach(function(q){for(var Me=q[0],oe=q[1],se=K.slice(Me,oe+1),ue=se.length;ue--;)K[oe-ue]=se[ue]}),K}return r.closingToOpeningBracket=T,r.getBidiCharType=h,r.getBidiCharTypeName=p,r.getCanonicalBracket=E,r.getEmbeddingLevels=Q,r.getMirroredCharacter=ye,r.getMirroredCharactersMap=de,r.getReorderSegments=$,r.getReorderedIndices=ce,r.getReorderedString=re,r.openingToClosingBracket=S,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return s}const Ma=/\bvoid\s+main\s*\(\s*\)\s*{/g;function kn(s){const r=/^[ \t]*#include +<([\w\d./]+)>/gm;function l(c,t){let e=Ya[t];return e?kn(e):c}return s.replace(r,l)}const We=[];for(let s=0;s<256;s++)We[s]=(s<16?"0":"")+s.toString(16);function ts(){const s=Math.random()*4294967295|0,r=Math.random()*4294967295|0,l=Math.random()*4294967295|0,c=Math.random()*4294967295|0;return(We[s&255]+We[s>>8&255]+We[s>>16&255]+We[s>>24&255]+"-"+We[r&255]+We[r>>8&255]+"-"+We[r>>16&15|64]+We[r>>24&255]+"-"+We[l&63|128]+We[l>>8&255]+"-"+We[l>>16&255]+We[l>>24&255]+We[c&255]+We[c>>8&255]+We[c>>16&255]+We[c>>24&255]).toUpperCase()}const kt=Object.assign||function(){let s=arguments[0];for(let r=1,l=arguments.length;r<l;r++){let c=arguments[r];if(c)for(let t in c)Object.prototype.hasOwnProperty.call(c,t)&&(s[t]=c[t])}return s},rs=Date.now(),Jo=new WeakMap,Ko=new Map;let ns=1e10;function Un(s,r){const l=ss(r);let c=Jo.get(s);if(c||Jo.set(s,c=Object.create(null)),c[l])return new c[l];const t=`_onBeforeCompile${l}`,e=function(i,f){s.onBeforeCompile.call(this,i,f);const d=this.customProgramCacheKey()+"|"+i.vertexShader+"|"+i.fragmentShader;let h=Ko[d];if(!h){const p=os(this,i,r,l);h=Ko[d]=p}i.vertexShader=h.vertexShader,i.fragmentShader=h.fragmentShader,kt(i.uniforms,this.uniforms),r.timeUniform&&(i.uniforms[r.timeUniform]={get value(){return Date.now()-rs}}),this[t]&&this[t](i)},n=function(){return a(r.chained?s:s.clone())},a=function(i){const f=Object.create(i,o);return Object.defineProperty(f,"baseMaterial",{value:s}),Object.defineProperty(f,"id",{value:ns++}),f.uuid=ts(),f.uniforms=kt({},i.uniforms,r.uniforms),f.defines=kt({},i.defines,r.defines),f.defines[`TROIKA_DERIVED_MATERIAL_${l}`]="",f.extensions=kt({},i.extensions,r.extensions),f._listeners=void 0,f},o={constructor:{value:n},isDerivedMaterial:{value:!0},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return s.customProgramCacheKey()+"|"+l}},onBeforeCompile:{get(){return e},set(i){this[t]=i}},copy:{writable:!0,configurable:!0,value:function(i){return s.copy.call(this,i),!s.isShaderMaterial&&!s.isDerivedMaterial&&(kt(this.extensions,i.extensions),kt(this.defines,i.defines),kt(this.uniforms,bn.clone(i.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const i=new s.constructor;return a(i).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let i=this._depthMaterial;return i||(i=this._depthMaterial=Un(s.isDerivedMaterial?s.getDepthMaterial():new Va({depthPacking:Xa}),r),i.defines.IS_DEPTH_MATERIAL="",i.uniforms=this.uniforms),i}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let i=this._distanceMaterial;return i||(i=this._distanceMaterial=Un(s.isDerivedMaterial?s.getDistanceMaterial():new Ha,r),i.defines.IS_DISTANCE_MATERIAL="",i.uniforms=this.uniforms),i}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:i,_distanceMaterial:f}=this;i&&i.dispose(),f&&f.dispose(),s.dispose.call(this)}}};return c[l]=n,new n}function os(s,{vertexShader:r,fragmentShader:l},c,t){let{vertexDefs:e,vertexMainIntro:n,vertexMainOutro:a,vertexTransform:o,fragmentDefs:i,fragmentMainIntro:f,fragmentMainOutro:d,fragmentColorTransform:h,customRewriter:p,timeUniform:m}=c;if(e=e||"",n=n||"",a=a||"",i=i||"",f=f||"",d=d||"",(o||p)&&(r=kn(r)),(h||p)&&(l=l.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),l=kn(l)),p){let g=p({vertexShader:r,fragmentShader:l});r=g.vertexShader,l=g.fragmentShader}if(h){let g=[];l=l.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,y=>(g.push(y),"")),d=`${h}
${g.join(`
`)}
${d}`}if(m){const g=`
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
`,r=r.replace(/\b(position|normal|uv)\b/g,(g,y,M,_)=>/\battribute\s+vec[23]\s+$/.test(_.substr(0,M))?y:`troika_${y}_${t}`),s.map&&s.map.channel>0||(r=r.replace(/\bMAP_UV\b/g,`troika_uv_${t}`))),r=$o(r,t,e,n,a),l=$o(l,t,i,f,d),{vertexShader:r,fragmentShader:l}}function $o(s,r,l,c,t){return(c||t||l)&&(s=s.replace(Ma,`
${l}
void troikaOrigMain${r}() {`),s+=`
void main() {
  ${c}
  troikaOrigMain${r}();
  ${t}
}`),s}function as(s,r){return s==="uniforms"?void 0:typeof r=="function"?r.toString():r}let is=0;const ea=new Map;function ss(s){const r=JSON.stringify(s,as);let l=ea.get(r);return l==null&&ea.set(r,l=++is),l}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function ls(){return typeof window>"u"&&(self.window=self),function(s){var r={parse:function(t){var e=r._bin,n=new Uint8Array(t);if(e.readASCII(n,0,4)=="ttcf"){var a=4;e.readUshort(n,a),a+=2,e.readUshort(n,a),a+=2;var o=e.readUint(n,a);a+=4;for(var i=[],f=0;f<o;f++){var d=e.readUint(n,a);a+=4,i.push(r._readFont(n,d))}return i}return[r._readFont(n,0)]},_readFont:function(t,e){var n=r._bin,a=e;n.readFixed(t,e),e+=4;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2;for(var i=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],f={_data:t,_offset:a},d={},h=0;h<o;h++){var p=n.readASCII(t,e,4);e+=4,n.readUint(t,e),e+=4;var m=n.readUint(t,e);e+=4;var g=n.readUint(t,e);e+=4,d[p]={offset:m,length:g}}for(h=0;h<i.length;h++){var y=i[h];d[y]&&(f[y.trim()]=r[y.trim()].parse(t,d[y].offset,d[y].length,f))}return f},_tabOffset:function(t,e,n){for(var a=r._bin,o=a.readUshort(t,n+4),i=n+12,f=0;f<o;f++){var d=a.readASCII(t,i,4);i+=4,a.readUint(t,i),i+=4;var h=a.readUint(t,i);if(i+=4,a.readUint(t,i),i+=4,d==e)return h}return 0}};r._bin={readFixed:function(t,e){return(t[e]<<8|t[e+1])+(t[e+2]<<8|t[e+3])/65540},readF2dot14:function(t,e){return r._bin.readShort(t,e)/16384},readInt:function(t,e){return r._bin._view(t).getInt32(e)},readInt8:function(t,e){return r._bin._view(t).getInt8(e)},readShort:function(t,e){return r._bin._view(t).getInt16(e)},readUshort:function(t,e){return r._bin._view(t).getUint16(e)},readUshorts:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(r._bin.readUshort(t,e+2*o));return a},readUint:function(t,e){return r._bin._view(t).getUint32(e)},readUint64:function(t,e){return 4294967296*r._bin.readUint(t,e)+r._bin.readUint(t,e+4)},readASCII:function(t,e,n){for(var a="",o=0;o<n;o++)a+=String.fromCharCode(t[e+o]);return a},readUnicode:function(t,e,n){for(var a="",o=0;o<n;o++){var i=t[e++]<<8|t[e++];a+=String.fromCharCode(i)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(t,e,n){var a=r._bin._tdec;return a&&e==0&&n==t.length?a.decode(t):r._bin.readASCII(t,e,n)},readBytes:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(t[e+o]);return a},readASCIIArray:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(String.fromCharCode(t[e+o]));return a},_view:function(t){return t._dataView||(t._dataView=t.buffer?new DataView(t.buffer,t.byteOffset,t.byteLength):new DataView(new Uint8Array(t).buffer))}},r._lctf={},r._lctf.parse=function(t,e,n,a,o){var i=r._bin,f={},d=e;i.readFixed(t,e),e+=4;var h=i.readUshort(t,e);e+=2;var p=i.readUshort(t,e);e+=2;var m=i.readUshort(t,e);return e+=2,f.scriptList=r._lctf.readScriptList(t,d+h),f.featureList=r._lctf.readFeatureList(t,d+p),f.lookupList=r._lctf.readLookupList(t,d+m,o),f},r._lctf.readLookupList=function(t,e,n){var a=r._bin,o=e,i=[],f=a.readUshort(t,e);e+=2;for(var d=0;d<f;d++){var h=a.readUshort(t,e);e+=2;var p=r._lctf.readLookupTable(t,o+h,n);i.push(p)}return i},r._lctf.readLookupTable=function(t,e,n){var a=r._bin,o=e,i={tabs:[]};i.ltype=a.readUshort(t,e),e+=2,i.flag=a.readUshort(t,e),e+=2;var f=a.readUshort(t,e);e+=2;for(var d=i.ltype,h=0;h<f;h++){var p=a.readUshort(t,e);e+=2;var m=n(t,d,o+p,i);i.tabs.push(m)}return i},r._lctf.numOfOnes=function(t){for(var e=0,n=0;n<32;n++)t>>>n&1&&e++;return e},r._lctf.readClassDef=function(t,e){var n=r._bin,a=[],o=n.readUshort(t,e);if(e+=2,o==1){var i=n.readUshort(t,e);e+=2;var f=n.readUshort(t,e);e+=2;for(var d=0;d<f;d++)a.push(i+d),a.push(i+d),a.push(n.readUshort(t,e)),e+=2}if(o==2){var h=n.readUshort(t,e);for(e+=2,d=0;d<h;d++)a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2}return a},r._lctf.getInterval=function(t,e){for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1];if(t[n+2],a<=e&&e<=o)return n}return-1},r._lctf.readCoverage=function(t,e){var n=r._bin,a={};a.fmt=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.fmt==1&&(a.tab=n.readUshorts(t,e,o)),a.fmt==2&&(a.tab=n.readUshorts(t,e,3*o)),a},r._lctf.coverageIndex=function(t,e){var n=t.tab;if(t.fmt==1)return n.indexOf(e);if(t.fmt==2){var a=r._lctf.getInterval(n,e);if(a!=-1)return n[a+2]+(e-n[a])}return-1},r._lctf.readFeatureList=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2;var p=r._lctf.readFeatureTable(t,a+h);p.tag=d.trim(),o.push(p)}return o},r._lctf.readFeatureTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.featureParams=a+i);var f=n.readUshort(t,e);e+=2,o.tab=[];for(var d=0;d<f;d++)o.tab.push(n.readUshort(t,e+2*d));return o},r._lctf.readScriptList=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2,o[d.trim()]=r._lctf.readScriptTable(t,a+h)}return o},r._lctf.readScriptTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.default=r._lctf.readLangSysTable(t,a+i));var f=n.readUshort(t,e);e+=2;for(var d=0;d<f;d++){var h=n.readASCII(t,e,4);e+=4;var p=n.readUshort(t,e);e+=2,o[h.trim()]=r._lctf.readLangSysTable(t,a+p)}return o},r._lctf.readLangSysTable=function(t,e){var n=r._bin,a={};n.readUshort(t,e),e+=2,a.reqFeature=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.features=n.readUshorts(t,e,o),a},r.CFF={},r.CFF.parse=function(t,e,n){var a=r._bin;(t=new Uint8Array(t.buffer,e,n))[e=0],t[++e],t[++e],t[++e],e++;var o=[];e=r.CFF.readIndex(t,e,o);for(var i=[],f=0;f<o.length-1;f++)i.push(a.readASCII(t,e+o[f],o[f+1]-o[f]));e+=o[o.length-1];var d=[];e=r.CFF.readIndex(t,e,d);var h=[];for(f=0;f<d.length-1;f++)h.push(r.CFF.readDict(t,e+d[f],e+d[f+1]));e+=d[d.length-1];var p=h[0],m=[];e=r.CFF.readIndex(t,e,m);var g=[];for(f=0;f<m.length-1;f++)g.push(a.readASCII(t,e+m[f],m[f+1]-m[f]));if(e+=m[m.length-1],r.CFF.readSubrs(t,e,p),p.CharStrings){e=p.CharStrings,m=[],e=r.CFF.readIndex(t,e,m);var y=[];for(f=0;f<m.length-1;f++)y.push(a.readBytes(t,e+m[f],m[f+1]-m[f]));p.CharStrings=y}if(p.ROS){e=p.FDArray;var M=[];for(e=r.CFF.readIndex(t,e,M),p.FDArray=[],f=0;f<M.length-1;f++){var _=r.CFF.readDict(t,e+M[f],e+M[f+1]);r.CFF._readFDict(t,_,g),p.FDArray.push(_)}e+=M[M.length-1],e=p.FDSelect,p.FDSelect=[];var v=t[e];if(e++,v!=3)throw v;var S=a.readUshort(t,e);for(e+=2,f=0;f<S+1;f++)p.FDSelect.push(a.readUshort(t,e),t[e+2]),e+=3}return p.Encoding&&(p.Encoding=r.CFF.readEncoding(t,p.Encoding,p.CharStrings.length)),p.charset&&(p.charset=r.CFF.readCharset(t,p.charset,p.CharStrings.length)),r.CFF._readFDict(t,p,g),p},r.CFF._readFDict=function(t,e,n){var a;for(var o in e.Private&&(a=e.Private[1],e.Private=r.CFF.readDict(t,a,a+e.Private[0]),e.Private.Subrs&&r.CFF.readSubrs(t,a+e.Private.Subrs,e.Private)),e)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)!=-1&&(e[o]=n[e[o]-426+35])},r.CFF.readSubrs=function(t,e,n){var a=r._bin,o=[];e=r.CFF.readIndex(t,e,o);var i,f=o.length;i=f<1240?107:f<33900?1131:32768,n.Bias=i,n.Subrs=[];for(var d=0;d<o.length-1;d++)n.Subrs.push(a.readBytes(t,e+o[d],o[d+1]-o[d]))},r.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],r.CFF.glyphByUnicode=function(t,e){for(var n=0;n<t.charset.length;n++)if(t.charset[n]==e)return n;return-1},r.CFF.glyphBySE=function(t,e){return e<0||e>255?-1:r.CFF.glyphByUnicode(t,r.CFF.tableSE[e])},r.CFF.readEncoding=function(t,e,n){r._bin;var a=[".notdef"],o=t[e];if(e++,o!=0)throw"error: unknown encoding format: "+o;var i=t[e];e++;for(var f=0;f<i;f++)a.push(t[e+f]);return a},r.CFF.readCharset=function(t,e,n){var a=r._bin,o=[".notdef"],i=t[e];if(e++,i==0)for(var f=0;f<n;f++){var d=a.readUshort(t,e);e+=2,o.push(d)}else{if(i!=1&&i!=2)throw"error: format: "+i;for(;o.length<n;){d=a.readUshort(t,e),e+=2;var h=0;for(i==1?(h=t[e],e++):(h=a.readUshort(t,e),e+=2),f=0;f<=h;f++)o.push(d),d++}}return o},r.CFF.readIndex=function(t,e,n){var a=r._bin,o=a.readUshort(t,e)+1,i=t[e+=2];if(e++,i==1)for(var f=0;f<o;f++)n.push(t[e+f]);else if(i==2)for(f=0;f<o;f++)n.push(a.readUshort(t,e+2*f));else if(i==3)for(f=0;f<o;f++)n.push(16777215&a.readUint(t,e+3*f-1));else if(o!=1)throw"unsupported offset size: "+i+", count: "+o;return(e+=o*i)-1},r.CFF.getCharString=function(t,e,n){var a=r._bin,o=t[e],i=t[e+1];t[e+2],t[e+3],t[e+4];var f=1,d=null,h=null;o<=20&&(d=o,f=1),o==12&&(d=100*o+i,f=2),21<=o&&o<=27&&(d=o,f=1),o==28&&(h=a.readShort(t,e+1),f=3),29<=o&&o<=31&&(d=o,f=1),32<=o&&o<=246&&(h=o-139,f=1),247<=o&&o<=250&&(h=256*(o-247)+i+108,f=2),251<=o&&o<=254&&(h=256*-(o-251)-i-108,f=2),o==255&&(h=a.readInt(t,e+1)/65535,f=5),n.val=h??"o"+d,n.size=f},r.CFF.readCharString=function(t,e,n){for(var a=e+n,o=r._bin,i=[];e<a;){var f=t[e],d=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,m=null;f<=20&&(p=f,h=1),f==12&&(p=100*f+d,h=2),f!=19&&f!=20||(p=f,h=2),21<=f&&f<=27&&(p=f,h=1),f==28&&(m=o.readShort(t,e+1),h=3),29<=f&&f<=31&&(p=f,h=1),32<=f&&f<=246&&(m=f-139,h=1),247<=f&&f<=250&&(m=256*(f-247)+d+108,h=2),251<=f&&f<=254&&(m=256*-(f-251)-d-108,h=2),f==255&&(m=o.readInt(t,e+1)/65535,h=5),i.push(m??"o"+p),e+=h}return i},r.CFF.readDict=function(t,e,n){for(var a=r._bin,o={},i=[];e<n;){var f=t[e],d=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,m=null;if(f==28&&(m=a.readShort(t,e+1),h=3),f==29&&(m=a.readInt(t,e+1),h=5),32<=f&&f<=246&&(m=f-139,h=1),247<=f&&f<=250&&(m=256*(f-247)+d+108,h=2),251<=f&&f<=254&&(m=256*-(f-251)-d-108,h=2),f==255)throw m=a.readInt(t,e+1)/65535,h=5,"unknown number";if(f==30){var g=[];for(h=1;;){var y=t[e+h];h++;var M=y>>4,_=15&y;if(M!=15&&g.push(M),_!=15&&g.push(_),_==15)break}for(var v="",S=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],T=0;T<g.length;T++)v+=S[g[T]];m=parseFloat(v)}f<=21&&(p=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][f],h=1,f==12&&(p=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][d],h=2)),p!=null?(o[p]=i.length==1?i[0]:i,i=[]):i.push(m),e+=h}return o},r.cmap={},r.cmap.parse=function(t,e,n){t=new Uint8Array(t.buffer,e,n),e=0;var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2;var f=[];o.tables=[];for(var d=0;d<i;d++){var h=a.readUshort(t,e);e+=2;var p=a.readUshort(t,e);e+=2;var m=a.readUint(t,e);e+=4;var g="p"+h+"e"+p,y=f.indexOf(m);if(y==-1){var M;y=o.tables.length,f.push(m);var _=a.readUshort(t,m);_==0?M=r.cmap.parse0(t,m):_==4?M=r.cmap.parse4(t,m):_==6?M=r.cmap.parse6(t,m):_==12&&(M=r.cmap.parse12(t,m)),o.tables.push(M)}if(o[g]!=null)throw"multiple tables for one platform+encoding";o[g]=y}return o},r.cmap.parse0=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,a.map=[];for(var i=0;i<o-6;i++)a.map.push(t[e+i]);return a},r.cmap.parse4=function(t,e){var n=r._bin,a=e,o={};o.format=n.readUshort(t,e),e+=2;var i=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2;var f=n.readUshort(t,e);e+=2;var d=f/2;o.searchRange=n.readUshort(t,e),e+=2,o.entrySelector=n.readUshort(t,e),e+=2,o.rangeShift=n.readUshort(t,e),e+=2,o.endCount=n.readUshorts(t,e,d),e+=2*d,e+=2,o.startCount=n.readUshorts(t,e,d),e+=2*d,o.idDelta=[];for(var h=0;h<d;h++)o.idDelta.push(n.readShort(t,e)),e+=2;for(o.idRangeOffset=n.readUshorts(t,e,d),e+=2*d,o.glyphIdArray=[];e<a+i;)o.glyphIdArray.push(n.readUshort(t,e)),e+=2;return o},r.cmap.parse6=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,a.firstCode=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,a.glyphIdArray=[];for(var i=0;i<o;i++)a.glyphIdArray.push(n.readUshort(t,e)),e+=2;return a},r.cmap.parse12=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,e+=2,n.readUint(t,e),e+=4,n.readUint(t,e),e+=4;var o=n.readUint(t,e);e+=4,a.groups=[];for(var i=0;i<o;i++){var f=e+12*i,d=n.readUint(t,f+0),h=n.readUint(t,f+4),p=n.readUint(t,f+8);a.groups.push([d,h,p])}return a},r.glyf={},r.glyf.parse=function(t,e,n,a){for(var o=[],i=0;i<a.maxp.numGlyphs;i++)o.push(null);return o},r.glyf._parseGlyf=function(t,e){var n=r._bin,a=t._data,o=r._tabOffset(a,"glyf",t._offset)+t.loca[e];if(t.loca[e]==t.loca[e+1])return null;var i={};if(i.noc=n.readShort(a,o),o+=2,i.xMin=n.readShort(a,o),o+=2,i.yMin=n.readShort(a,o),o+=2,i.xMax=n.readShort(a,o),o+=2,i.yMax=n.readShort(a,o),o+=2,i.xMin>=i.xMax||i.yMin>=i.yMax)return null;if(i.noc>0){i.endPts=[];for(var f=0;f<i.noc;f++)i.endPts.push(n.readUshort(a,o)),o+=2;var d=n.readUshort(a,o);if(o+=2,a.length-o<d)return null;i.instructions=n.readBytes(a,o,d),o+=d;var h=i.endPts[i.noc-1]+1;for(i.flags=[],f=0;f<h;f++){var p=a[o];if(o++,i.flags.push(p),(8&p)!=0){var m=a[o];o++;for(var g=0;g<m;g++)i.flags.push(p),f++}}for(i.xs=[],f=0;f<h;f++){var y=(2&i.flags[f])!=0,M=(16&i.flags[f])!=0;y?(i.xs.push(M?a[o]:-a[o]),o++):M?i.xs.push(0):(i.xs.push(n.readShort(a,o)),o+=2)}for(i.ys=[],f=0;f<h;f++)y=(4&i.flags[f])!=0,M=(32&i.flags[f])!=0,y?(i.ys.push(M?a[o]:-a[o]),o++):M?i.ys.push(0):(i.ys.push(n.readShort(a,o)),o+=2);var _=0,v=0;for(f=0;f<h;f++)_+=i.xs[f],v+=i.ys[f],i.xs[f]=_,i.ys[f]=v}else{var S;i.parts=[];do{S=n.readUshort(a,o),o+=2;var T={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(i.parts.push(T),T.glyphIndex=n.readUshort(a,o),o+=2,1&S){var E=n.readShort(a,o);o+=2;var U=n.readShort(a,o);o+=2}else E=n.readInt8(a,o),o++,U=n.readInt8(a,o),o++;2&S?(T.m.tx=E,T.m.ty=U):(T.p1=E,T.p2=U),8&S?(T.m.a=T.m.d=n.readF2dot14(a,o),o+=2):64&S?(T.m.a=n.readF2dot14(a,o),o+=2,T.m.d=n.readF2dot14(a,o),o+=2):128&S&&(T.m.a=n.readF2dot14(a,o),o+=2,T.m.b=n.readF2dot14(a,o),o+=2,T.m.c=n.readF2dot14(a,o),o+=2,T.m.d=n.readF2dot14(a,o),o+=2)}while(32&S);if(256&S){var C=n.readUshort(a,o);for(o+=2,i.instr=[],f=0;f<C;f++)i.instr.push(a[o]),o++}}return i},r.GDEF={},r.GDEF.parse=function(t,e,n,a){var o=e;e+=4;var i=r._bin.readUshort(t,e);return{glyphClassDef:i===0?null:r._lctf.readClassDef(t,o+i)}},r.GPOS={},r.GPOS.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GPOS.subt)},r.GPOS.subt=function(t,e,n,a){var o=r._bin,i=n,f={};if(f.fmt=o.readUshort(t,n),n+=2,e==1||e==2||e==3||e==7||e==8&&f.fmt<=2){var d=o.readUshort(t,n);n+=2,f.coverage=r._lctf.readCoverage(t,d+i)}if(e==1&&f.fmt==1){var h=o.readUshort(t,n);n+=2,h!=0&&(f.pos=r.GPOS.readValueRecord(t,n,h))}else if(e==2&&f.fmt>=1&&f.fmt<=2){h=o.readUshort(t,n),n+=2;var p=o.readUshort(t,n);n+=2;var m=r._lctf.numOfOnes(h),g=r._lctf.numOfOnes(p);if(f.fmt==1){f.pairsets=[];var y=o.readUshort(t,n);n+=2;for(var M=0;M<y;M++){var _=i+o.readUshort(t,n);n+=2;var v=o.readUshort(t,_);_+=2;for(var S=[],T=0;T<v;T++){var E=o.readUshort(t,_);_+=2,h!=0&&(b=r.GPOS.readValueRecord(t,_,h),_+=2*m),p!=0&&(P=r.GPOS.readValueRecord(t,_,p),_+=2*g),S.push({gid2:E,val1:b,val2:P})}f.pairsets.push(S)}}if(f.fmt==2){var U=o.readUshort(t,n);n+=2;var C=o.readUshort(t,n);n+=2;var L=o.readUshort(t,n);n+=2;var F=o.readUshort(t,n);for(n+=2,f.classDef1=r._lctf.readClassDef(t,i+U),f.classDef2=r._lctf.readClassDef(t,i+C),f.matrix=[],M=0;M<L;M++){var V=[];for(T=0;T<F;T++){var b=null,P=null;h!=0&&(b=r.GPOS.readValueRecord(t,n,h),n+=2*m),p!=0&&(P=r.GPOS.readValueRecord(t,n,p),n+=2*g),V.push({val1:b,val2:P})}f.matrix.push(V)}}}else if(e==4&&f.fmt==1)f.markCoverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),f.baseCoverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),f.markClassCount=o.readUshort(t,n+4),f.markArray=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),f.baseArray=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,f.markClassCount);else if(e==6&&f.fmt==1)f.mark1Coverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),f.mark2Coverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),f.markClassCount=o.readUshort(t,n+4),f.mark1Array=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),f.mark2Array=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,f.markClassCount);else if(e==9&&f.fmt==1){var R=o.readUshort(t,n);n+=2;var Y=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=R;else if(a.ltype!=R)throw"invalid extension substitution";return r.GPOS.subt(t,a.ltype,i+Y)}return f},r.GPOS.readValueRecord=function(t,e,n){var a=r._bin,o=[];return o.push(1&n?a.readShort(t,e):0),e+=1&n?2:0,o.push(2&n?a.readShort(t,e):0),e+=2&n?2:0,o.push(4&n?a.readShort(t,e):0),e+=4&n?2:0,o.push(8&n?a.readShort(t,e):0),e+=8&n?2:0,o},r.GPOS.readBaseArray=function(t,e,n){var a=r._bin,o=[],i=e,f=a.readUshort(t,e);e+=2;for(var d=0;d<f;d++){for(var h=[],p=0;p<n;p++)h.push(r.GPOS.readAnchorRecord(t,i+a.readUshort(t,e))),e+=2;o.push(h)}return o},r.GPOS.readMarkArray=function(t,e){var n=r._bin,a=[],o=e,i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=r.GPOS.readAnchorRecord(t,n.readUshort(t,e+2)+o);d.markClass=n.readUshort(t,e),a.push(d),e+=4}return a},r.GPOS.readAnchorRecord=function(t,e){var n=r._bin,a={};return a.fmt=n.readUshort(t,e),a.x=n.readShort(t,e+2),a.y=n.readShort(t,e+4),a},r.GSUB={},r.GSUB.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GSUB.subt)},r.GSUB.subt=function(t,e,n,a){var o=r._bin,i=n,f={};if(f.fmt=o.readUshort(t,n),n+=2,e!=1&&e!=2&&e!=4&&e!=5&&e!=6)return null;if(e==1||e==2||e==4||e==5&&f.fmt<=2||e==6&&f.fmt<=2){var d=o.readUshort(t,n);n+=2,f.coverage=r._lctf.readCoverage(t,i+d)}if(e==1&&f.fmt>=1&&f.fmt<=2){if(f.fmt==1)f.delta=o.readShort(t,n),n+=2;else if(f.fmt==2){var h=o.readUshort(t,n);n+=2,f.newg=o.readUshorts(t,n,h),n+=2*f.newg.length}}else if(e==2&&f.fmt==1){h=o.readUshort(t,n),n+=2,f.seqs=[];for(var p=0;p<h;p++){var m=o.readUshort(t,n)+i;n+=2;var g=o.readUshort(t,m);f.seqs.push(o.readUshorts(t,m+2,g))}}else if(e==4)for(f.vals=[],h=o.readUshort(t,n),n+=2,p=0;p<h;p++){var y=o.readUshort(t,n);n+=2,f.vals.push(r.GSUB.readLigatureSet(t,i+y))}else if(e==5&&f.fmt==2){if(f.fmt==2){var M=o.readUshort(t,n);n+=2,f.cDef=r._lctf.readClassDef(t,i+M),f.scset=[];var _=o.readUshort(t,n);for(n+=2,p=0;p<_;p++){var v=o.readUshort(t,n);n+=2,f.scset.push(v==0?null:r.GSUB.readSubClassSet(t,i+v))}}}else if(e==6&&f.fmt==3){if(f.fmt==3){for(p=0;p<3;p++){h=o.readUshort(t,n),n+=2;for(var S=[],T=0;T<h;T++)S.push(r._lctf.readCoverage(t,i+o.readUshort(t,n+2*T)));n+=2*h,p==0&&(f.backCvg=S),p==1&&(f.inptCvg=S),p==2&&(f.ahedCvg=S)}h=o.readUshort(t,n),n+=2,f.lookupRec=r.GSUB.readSubstLookupRecords(t,n,h)}}else if(e==7&&f.fmt==1){var E=o.readUshort(t,n);n+=2;var U=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=E;else if(a.ltype!=E)throw"invalid extension substitution";return r.GSUB.subt(t,a.ltype,i+U)}return f},r.GSUB.readSubClassSet=function(t,e){var n=r._bin.readUshort,a=e,o=[],i=n(t,e);e+=2;for(var f=0;f<i;f++){var d=n(t,e);e+=2,o.push(r.GSUB.readSubClassRule(t,a+d))}return o},r.GSUB.readSubClassRule=function(t,e){var n=r._bin.readUshort,a={},o=n(t,e),i=n(t,e+=2);e+=2,a.input=[];for(var f=0;f<o-1;f++)a.input.push(n(t,e)),e+=2;return a.substLookupRecords=r.GSUB.readSubstLookupRecords(t,e,i),a},r.GSUB.readSubstLookupRecords=function(t,e,n){for(var a=r._bin.readUshort,o=[],i=0;i<n;i++)o.push(a(t,e),a(t,e+2)),e+=4;return o},r.GSUB.readChainSubClassSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readUshort(t,e);e+=2,o.push(r.GSUB.readChainSubClassRule(t,a+d))}return o},r.GSUB.readChainSubClassRule=function(t,e){for(var n=r._bin,a={},o=["backtrack","input","lookahead"],i=0;i<o.length;i++){var f=n.readUshort(t,e);e+=2,i==1&&f--,a[o[i]]=n.readUshorts(t,e,f),e+=2*a[o[i]].length}return f=n.readUshort(t,e),e+=2,a.subst=n.readUshorts(t,e,2*f),e+=2*a.subst.length,a},r.GSUB.readLigatureSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readUshort(t,e);e+=2,o.push(r.GSUB.readLigature(t,a+d))}return o},r.GSUB.readLigature=function(t,e){var n=r._bin,a={chain:[]};a.nglyph=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2;for(var i=0;i<o-1;i++)a.chain.push(n.readUshort(t,e)),e+=2;return a},r.head={},r.head.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.fontRevision=a.readFixed(t,e),e+=4,a.readUint(t,e),e+=4,a.readUint(t,e),e+=4,o.flags=a.readUshort(t,e),e+=2,o.unitsPerEm=a.readUshort(t,e),e+=2,o.created=a.readUint64(t,e),e+=8,o.modified=a.readUint64(t,e),e+=8,o.xMin=a.readShort(t,e),e+=2,o.yMin=a.readShort(t,e),e+=2,o.xMax=a.readShort(t,e),e+=2,o.yMax=a.readShort(t,e),e+=2,o.macStyle=a.readUshort(t,e),e+=2,o.lowestRecPPEM=a.readUshort(t,e),e+=2,o.fontDirectionHint=a.readShort(t,e),e+=2,o.indexToLocFormat=a.readShort(t,e),e+=2,o.glyphDataFormat=a.readShort(t,e),e+=2,o},r.hhea={},r.hhea.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.ascender=a.readShort(t,e),e+=2,o.descender=a.readShort(t,e),e+=2,o.lineGap=a.readShort(t,e),e+=2,o.advanceWidthMax=a.readUshort(t,e),e+=2,o.minLeftSideBearing=a.readShort(t,e),e+=2,o.minRightSideBearing=a.readShort(t,e),e+=2,o.xMaxExtent=a.readShort(t,e),e+=2,o.caretSlopeRise=a.readShort(t,e),e+=2,o.caretSlopeRun=a.readShort(t,e),e+=2,o.caretOffset=a.readShort(t,e),e+=2,e+=8,o.metricDataFormat=a.readShort(t,e),e+=2,o.numberOfHMetrics=a.readUshort(t,e),e+=2,o},r.hmtx={},r.hmtx.parse=function(t,e,n,a){for(var o=r._bin,i={aWidth:[],lsBearing:[]},f=0,d=0,h=0;h<a.maxp.numGlyphs;h++)h<a.hhea.numberOfHMetrics&&(f=o.readUshort(t,e),e+=2,d=o.readShort(t,e),e+=2),i.aWidth.push(f),i.lsBearing.push(d);return i},r.kern={},r.kern.parse=function(t,e,n,a){var o=r._bin,i=o.readUshort(t,e);if(e+=2,i==1)return r.kern.parseV1(t,e-2,n,a);var f=o.readUshort(t,e);e+=2;for(var d={glyph1:[],rval:[]},h=0;h<f;h++){e+=2,n=o.readUshort(t,e),e+=2;var p=o.readUshort(t,e);e+=2;var m=p>>>8;if((m&=15)!=0)throw"unknown kern table format: "+m;e=r.kern.readFormat0(t,e,d)}return d},r.kern.parseV1=function(t,e,n,a){var o=r._bin;o.readFixed(t,e),e+=4;var i=o.readUint(t,e);e+=4;for(var f={glyph1:[],rval:[]},d=0;d<i;d++){o.readUint(t,e),e+=4;var h=o.readUshort(t,e);e+=2,o.readUshort(t,e),e+=2;var p=h>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;e=r.kern.readFormat0(t,e,f)}return f},r.kern.readFormat0=function(t,e,n){var a=r._bin,o=-1,i=a.readUshort(t,e);e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2;for(var f=0;f<i;f++){var d=a.readUshort(t,e);e+=2;var h=a.readUshort(t,e);e+=2;var p=a.readShort(t,e);e+=2,d!=o&&(n.glyph1.push(d),n.rval.push({glyph2:[],vals:[]}));var m=n.rval[n.rval.length-1];m.glyph2.push(h),m.vals.push(p),o=d}return e},r.loca={},r.loca.parse=function(t,e,n,a){var o=r._bin,i=[],f=a.head.indexToLocFormat,d=a.maxp.numGlyphs+1;if(f==0)for(var h=0;h<d;h++)i.push(o.readUshort(t,e+(h<<1))<<1);if(f==1)for(h=0;h<d;h++)i.push(o.readUint(t,e+(h<<2)));return i},r.maxp={},r.maxp.parse=function(t,e,n){var a=r._bin,o={},i=a.readUint(t,e);return e+=4,o.numGlyphs=a.readUshort(t,e),e+=2,i==65536&&(o.maxPoints=a.readUshort(t,e),e+=2,o.maxContours=a.readUshort(t,e),e+=2,o.maxCompositePoints=a.readUshort(t,e),e+=2,o.maxCompositeContours=a.readUshort(t,e),e+=2,o.maxZones=a.readUshort(t,e),e+=2,o.maxTwilightPoints=a.readUshort(t,e),e+=2,o.maxStorage=a.readUshort(t,e),e+=2,o.maxFunctionDefs=a.readUshort(t,e),e+=2,o.maxInstructionDefs=a.readUshort(t,e),e+=2,o.maxStackElements=a.readUshort(t,e),e+=2,o.maxSizeOfInstructions=a.readUshort(t,e),e+=2,o.maxComponentElements=a.readUshort(t,e),e+=2,o.maxComponentDepth=a.readUshort(t,e),e+=2),o},r.name={},r.name.parse=function(t,e,n){var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2,a.readUshort(t,e);for(var f,d=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=e+=2,p=0;p<i;p++){var m=a.readUshort(t,e);e+=2;var g=a.readUshort(t,e);e+=2;var y=a.readUshort(t,e);e+=2;var M=a.readUshort(t,e);e+=2;var _=a.readUshort(t,e);e+=2;var v=a.readUshort(t,e);e+=2;var S,T=d[M],E=h+12*i+v;if(m==0)S=a.readUnicode(t,E,_/2);else if(m==3&&g==0)S=a.readUnicode(t,E,_/2);else if(g==0)S=a.readASCII(t,E,_);else if(g==1)S=a.readUnicode(t,E,_/2);else if(g==3)S=a.readUnicode(t,E,_/2);else{if(m!=1)throw"unknown encoding "+g+", platformID: "+m;S=a.readASCII(t,E,_)}var U="p"+m+","+y.toString(16);o[U]==null&&(o[U]={}),o[U][T!==void 0?T:M]=S,o[U]._lang=y}for(var C in o)if(o[C].postScriptName!=null&&o[C]._lang==1033)return o[C];for(var C in o)if(o[C].postScriptName!=null&&o[C]._lang==0)return o[C];for(var C in o)if(o[C].postScriptName!=null&&o[C]._lang==3084)return o[C];for(var C in o)if(o[C].postScriptName!=null)return o[C];for(var C in o){f=C;break}return o[f]},r["OS/2"]={},r["OS/2"].parse=function(t,e,n){var a=r._bin.readUshort(t,e);e+=2;var o={};if(a==0)r["OS/2"].version0(t,e,o);else if(a==1)r["OS/2"].version1(t,e,o);else if(a==2||a==3||a==4)r["OS/2"].version2(t,e,o);else{if(a!=5)throw"unknown OS/2 table version: "+a;r["OS/2"].version5(t,e,o)}return o},r["OS/2"].version0=function(t,e,n){var a=r._bin;return n.xAvgCharWidth=a.readShort(t,e),e+=2,n.usWeightClass=a.readUshort(t,e),e+=2,n.usWidthClass=a.readUshort(t,e),e+=2,n.fsType=a.readUshort(t,e),e+=2,n.ySubscriptXSize=a.readShort(t,e),e+=2,n.ySubscriptYSize=a.readShort(t,e),e+=2,n.ySubscriptXOffset=a.readShort(t,e),e+=2,n.ySubscriptYOffset=a.readShort(t,e),e+=2,n.ySuperscriptXSize=a.readShort(t,e),e+=2,n.ySuperscriptYSize=a.readShort(t,e),e+=2,n.ySuperscriptXOffset=a.readShort(t,e),e+=2,n.ySuperscriptYOffset=a.readShort(t,e),e+=2,n.yStrikeoutSize=a.readShort(t,e),e+=2,n.yStrikeoutPosition=a.readShort(t,e),e+=2,n.sFamilyClass=a.readShort(t,e),e+=2,n.panose=a.readBytes(t,e,10),e+=10,n.ulUnicodeRange1=a.readUint(t,e),e+=4,n.ulUnicodeRange2=a.readUint(t,e),e+=4,n.ulUnicodeRange3=a.readUint(t,e),e+=4,n.ulUnicodeRange4=a.readUint(t,e),e+=4,n.achVendID=[a.readInt8(t,e),a.readInt8(t,e+1),a.readInt8(t,e+2),a.readInt8(t,e+3)],e+=4,n.fsSelection=a.readUshort(t,e),e+=2,n.usFirstCharIndex=a.readUshort(t,e),e+=2,n.usLastCharIndex=a.readUshort(t,e),e+=2,n.sTypoAscender=a.readShort(t,e),e+=2,n.sTypoDescender=a.readShort(t,e),e+=2,n.sTypoLineGap=a.readShort(t,e),e+=2,n.usWinAscent=a.readUshort(t,e),e+=2,n.usWinDescent=a.readUshort(t,e),e+=2},r["OS/2"].version1=function(t,e,n){var a=r._bin;return e=r["OS/2"].version0(t,e,n),n.ulCodePageRange1=a.readUint(t,e),e+=4,n.ulCodePageRange2=a.readUint(t,e),e+=4},r["OS/2"].version2=function(t,e,n){var a=r._bin;return e=r["OS/2"].version1(t,e,n),n.sxHeight=a.readShort(t,e),e+=2,n.sCapHeight=a.readShort(t,e),e+=2,n.usDefault=a.readUshort(t,e),e+=2,n.usBreak=a.readUshort(t,e),e+=2,n.usMaxContext=a.readUshort(t,e),e+=2},r["OS/2"].version5=function(t,e,n){var a=r._bin;return e=r["OS/2"].version2(t,e,n),n.usLowerOpticalPointSize=a.readUshort(t,e),e+=2,n.usUpperOpticalPointSize=a.readUshort(t,e),e+=2},r.post={},r.post.parse=function(t,e,n){var a=r._bin,o={};return o.version=a.readFixed(t,e),e+=4,o.italicAngle=a.readFixed(t,e),e+=4,o.underlinePosition=a.readShort(t,e),e+=2,o.underlineThickness=a.readShort(t,e),e+=2,o},r==null&&(r={}),r.U==null&&(r.U={}),r.U.codeToGlyph=function(t,e){var n=t.cmap,a=-1;if(n.p0e4!=null?a=n.p0e4:n.p3e1!=null?a=n.p3e1:n.p1e0!=null?a=n.p1e0:n.p0e3!=null&&(a=n.p0e3),a==-1)throw"no familiar platform and encoding!";var o=n.tables[a];if(o.format==0)return e>=o.map.length?0:o.map[e];if(o.format==4){for(var i=-1,f=0;f<o.endCount.length;f++)if(e<=o.endCount[f]){i=f;break}return i==-1||o.startCount[i]>e?0:65535&(o.idRangeOffset[i]!=0?o.glyphIdArray[e-o.startCount[i]+(o.idRangeOffset[i]>>1)-(o.idRangeOffset.length-i)]:e+o.idDelta[i])}if(o.format==12){if(e>o.groups[o.groups.length-1][1])return 0;for(f=0;f<o.groups.length;f++){var d=o.groups[f];if(d[0]<=e&&e<=d[1])return d[2]+(e-d[0])}return 0}throw"unknown cmap table format "+o.format},r.U.glyphToPath=function(t,e){var n={cmds:[],crds:[]};if(t.SVG&&t.SVG.entries[e]){var a=t.SVG.entries[e];return a==null?n:(typeof a=="string"&&(a=r.SVG.toPath(a),t.SVG.entries[e]=a),a)}if(t.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:t.CFF.Private?t.CFF.Private.defaultWidthX:0,open:!1},i=t.CFF,f=t.CFF.Private;if(i.ROS){for(var d=0;i.FDSelect[d+2]<=e;)d+=2;f=i.FDArray[i.FDSelect[d+1]].Private}r.U._drawCFF(t.CFF.CharStrings[e],o,i,f,n)}else t.glyf&&r.U._drawGlyf(e,t,n);return n},r.U._drawGlyf=function(t,e,n){var a=e.glyf[t];a==null&&(a=e.glyf[t]=r.glyf._parseGlyf(e,t)),a!=null&&(a.noc>-1?r.U._simpleGlyph(a,n):r.U._compoGlyph(a,e,n))},r.U._simpleGlyph=function(t,e){for(var n=0;n<t.noc;n++){for(var a=n==0?0:t.endPts[n-1]+1,o=t.endPts[n],i=a;i<=o;i++){var f=i==a?o:i-1,d=i==o?a:i+1,h=1&t.flags[i],p=1&t.flags[f],m=1&t.flags[d],g=t.xs[i],y=t.ys[i];if(i==a)if(h){if(!p){r.U.P.moveTo(e,g,y);continue}r.U.P.moveTo(e,t.xs[f],t.ys[f])}else p?r.U.P.moveTo(e,t.xs[f],t.ys[f]):r.U.P.moveTo(e,(t.xs[f]+g)/2,(t.ys[f]+y)/2);h?p&&r.U.P.lineTo(e,g,y):m?r.U.P.qcurveTo(e,g,y,t.xs[d],t.ys[d]):r.U.P.qcurveTo(e,g,y,(g+t.xs[d])/2,(y+t.ys[d])/2)}r.U.P.closePath(e)}},r.U._compoGlyph=function(t,e,n){for(var a=0;a<t.parts.length;a++){var o={cmds:[],crds:[]},i=t.parts[a];r.U._drawGlyf(i.glyphIndex,e,o);for(var f=i.m,d=0;d<o.crds.length;d+=2){var h=o.crds[d],p=o.crds[d+1];n.crds.push(h*f.a+p*f.b+f.tx),n.crds.push(h*f.c+p*f.d+f.ty)}for(d=0;d<o.cmds.length;d++)n.cmds.push(o.cmds[d])}},r.U._getGlyphClass=function(t,e){var n=r._lctf.getInterval(e,t);return n==-1?0:e[n+2]},r.U._applySubs=function(t,e,n,a){for(var o=t.length-e-1,i=0;i<n.tabs.length;i++)if(n.tabs[i]!=null){var f,d=n.tabs[i];if(!d.coverage||(f=r._lctf.coverageIndex(d.coverage,t[e]))!=-1){if(n.ltype==1)t[e],d.fmt==1?t[e]=t[e]+d.delta:t[e]=d.newg[f];else if(n.ltype==4)for(var h=d.vals[f],p=0;p<h.length;p++){var m=h[p],g=m.chain.length;if(!(g>o)){for(var y=!0,M=0,_=0;_<g;_++){for(;t[e+M+(1+_)]==-1;)M++;m.chain[_]!=t[e+M+(1+_)]&&(y=!1)}if(y){for(t[e]=m.nglyph,_=0;_<g+M;_++)t[e+_+1]=-1;break}}}else if(n.ltype==5&&d.fmt==2)for(var v=r._lctf.getInterval(d.cDef,t[e]),S=d.cDef[v+2],T=d.scset[S],E=0;E<T.length;E++){var U=T[E],C=U.input;if(!(C.length>o)){for(y=!0,_=0;_<C.length;_++){var L=r._lctf.getInterval(d.cDef,t[e+1+_]);if(v==-1&&d.cDef[L+2]!=C[_]){y=!1;break}}if(y){var F=U.substLookupRecords;for(p=0;p<F.length;p+=2)F[p],F[p+1]}}}else if(n.ltype==6&&d.fmt==3){if(!r.U._glsCovered(t,d.backCvg,e-d.backCvg.length)||!r.U._glsCovered(t,d.inptCvg,e)||!r.U._glsCovered(t,d.ahedCvg,e+d.inptCvg.length))continue;var V=d.lookupRec;for(E=0;E<V.length;E+=2){v=V[E];var b=a[V[E+1]];r.U._applySubs(t,e+v,b,a)}}}}},r.U._glsCovered=function(t,e,n){for(var a=0;a<e.length;a++)if(r._lctf.coverageIndex(e[a],t[n+a])==-1)return!1;return!0},r.U.glyphsToPath=function(t,e,n){for(var a={cmds:[],crds:[]},o=0,i=0;i<e.length;i++){var f=e[i];if(f!=-1){for(var d=i<e.length-1&&e[i+1]!=-1?e[i+1]:0,h=r.U.glyphToPath(t,f),p=0;p<h.crds.length;p+=2)a.crds.push(h.crds[p]+o),a.crds.push(h.crds[p+1]);for(n&&a.cmds.push(n),p=0;p<h.cmds.length;p++)a.cmds.push(h.cmds[p]);n&&a.cmds.push("X"),o+=t.hmtx.aWidth[f],i<e.length-1&&(o+=r.U.getPairAdjustment(t,f,d))}}return a},r.U.P={},r.U.P.moveTo=function(t,e,n){t.cmds.push("M"),t.crds.push(e,n)},r.U.P.lineTo=function(t,e,n){t.cmds.push("L"),t.crds.push(e,n)},r.U.P.curveTo=function(t,e,n,a,o,i,f){t.cmds.push("C"),t.crds.push(e,n,a,o,i,f)},r.U.P.qcurveTo=function(t,e,n,a,o){t.cmds.push("Q"),t.crds.push(e,n,a,o)},r.U.P.closePath=function(t){t.cmds.push("Z")},r.U._drawCFF=function(t,e,n,a,o){for(var i=e.stack,f=e.nStems,d=e.haveWidth,h=e.width,p=e.open,m=0,g=e.x,y=e.y,M=0,_=0,v=0,S=0,T=0,E=0,U=0,C=0,L=0,F=0,V={val:0,size:0};m<t.length;){r.CFF.getCharString(t,m,V);var b=V.val;if(m+=V.size,b=="o1"||b=="o18")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0;else if(b=="o3"||b=="o23")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0;else if(b=="o4")i.length>1&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),p&&r.U.P.closePath(o),y+=i.pop(),r.U.P.moveTo(o,g,y),p=!0;else if(b=="o5")for(;i.length>0;)g+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,g,y);else if(b=="o6"||b=="o7")for(var P=i.length,R=b=="o6",Y=0;Y<P;Y++){var W=i.shift();R?g+=W:y+=W,R=!R,r.U.P.lineTo(o,g,y)}else if(b=="o8"||b=="o24"){P=i.length;for(var J=0;J+6<=P;)M=g+i.shift(),_=y+i.shift(),v=M+i.shift(),S=_+i.shift(),g=v+i.shift(),y=S+i.shift(),r.U.P.curveTo(o,M,_,v,S,g,y),J+=6;b=="o24"&&(g+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,g,y))}else{if(b=="o11")break;if(b=="o1234"||b=="o1235"||b=="o1236"||b=="o1237")b=="o1234"&&(_=y,v=(M=g+i.shift())+i.shift(),F=S=_+i.shift(),E=S,C=y,g=(U=(T=(L=v+i.shift())+i.shift())+i.shift())+i.shift(),r.U.P.curveTo(o,M,_,v,S,L,F),r.U.P.curveTo(o,T,E,U,C,g,y)),b=="o1235"&&(M=g+i.shift(),_=y+i.shift(),v=M+i.shift(),S=_+i.shift(),L=v+i.shift(),F=S+i.shift(),T=L+i.shift(),E=F+i.shift(),U=T+i.shift(),C=E+i.shift(),g=U+i.shift(),y=C+i.shift(),i.shift(),r.U.P.curveTo(o,M,_,v,S,L,F),r.U.P.curveTo(o,T,E,U,C,g,y)),b=="o1236"&&(M=g+i.shift(),_=y+i.shift(),v=M+i.shift(),F=S=_+i.shift(),E=S,U=(T=(L=v+i.shift())+i.shift())+i.shift(),C=E+i.shift(),g=U+i.shift(),r.U.P.curveTo(o,M,_,v,S,L,F),r.U.P.curveTo(o,T,E,U,C,g,y)),b=="o1237"&&(M=g+i.shift(),_=y+i.shift(),v=M+i.shift(),S=_+i.shift(),L=v+i.shift(),F=S+i.shift(),T=L+i.shift(),E=F+i.shift(),U=T+i.shift(),C=E+i.shift(),Math.abs(U-g)>Math.abs(C-y)?g=U+i.shift():y=C+i.shift(),r.U.P.curveTo(o,M,_,v,S,L,F),r.U.P.curveTo(o,T,E,U,C,g,y));else if(b=="o14"){if(i.length>0&&!d&&(h=i.shift()+n.nominalWidthX,d=!0),i.length==4){var ae=i.shift(),B=i.shift(),z=i.shift(),x=i.shift(),k=r.CFF.glyphBySE(n,z),A=r.CFF.glyphBySE(n,x);r.U._drawCFF(n.CharStrings[k],e,n,a,o),e.x=ae,e.y=B,r.U._drawCFF(n.CharStrings[A],e,n,a,o)}p&&(r.U.P.closePath(o),p=!1)}else if(b=="o19"||b=="o20")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0,m+=f+7>>3;else if(b=="o21")i.length>2&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),y+=i.pop(),g+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,g,y),p=!0;else if(b=="o22")i.length>1&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),g+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,g,y),p=!0;else if(b=="o25"){for(;i.length>6;)g+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,g,y);M=g+i.shift(),_=y+i.shift(),v=M+i.shift(),S=_+i.shift(),g=v+i.shift(),y=S+i.shift(),r.U.P.curveTo(o,M,_,v,S,g,y)}else if(b=="o26")for(i.length%2&&(g+=i.shift());i.length>0;)M=g,_=y+i.shift(),g=v=M+i.shift(),y=(S=_+i.shift())+i.shift(),r.U.P.curveTo(o,M,_,v,S,g,y);else if(b=="o27")for(i.length%2&&(y+=i.shift());i.length>0;)_=y,v=(M=g+i.shift())+i.shift(),S=_+i.shift(),g=v+i.shift(),y=S,r.U.P.curveTo(o,M,_,v,S,g,y);else if(b=="o10"||b=="o29"){var D=b=="o10"?a:n;if(i.length!=0){var j=i.pop(),N=D.Subrs[j+D.Bias];e.x=g,e.y=y,e.nStems=f,e.haveWidth=d,e.width=h,e.open=p,r.U._drawCFF(N,e,n,a,o),g=e.x,y=e.y,f=e.nStems,d=e.haveWidth,h=e.width,p=e.open}}else if(b=="o30"||b=="o31"){var I=i.length,O=(J=0,b=="o31");for(J+=I-(P=-3&I);J<P;)O?(_=y,v=(M=g+i.shift())+i.shift(),y=(S=_+i.shift())+i.shift(),P-J==5?(g=v+i.shift(),J++):g=v,O=!1):(M=g,_=y+i.shift(),v=M+i.shift(),S=_+i.shift(),g=v+i.shift(),P-J==5?(y=S+i.shift(),J++):y=S,O=!0),r.U.P.curveTo(o,M,_,v,S,g,y),J+=4}else{if((b+"").charAt(0)=="o")throw b;i.push(b)}}}e.x=g,e.y=y,e.nStems=f,e.haveWidth=d,e.width=h,e.open=p};var l=r,c={Typr:l};return s.Typr=l,s.default=c,Object.defineProperty(s,"__esModule",{value:!0}),s}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function cs(){return function(s){var r=Uint8Array,l=Uint16Array,c=Uint32Array,t=new r([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),e=new r([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),n=new r([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(b,P){for(var R=new l(31),Y=0;Y<31;++Y)R[Y]=P+=1<<b[Y-1];var W=new c(R[30]);for(Y=1;Y<30;++Y)for(var J=R[Y];J<R[Y+1];++J)W[J]=J-R[Y]<<5|Y;return[R,W]},o=a(t,2),i=o[0],f=o[1];i[28]=258,f[258]=28;for(var d=a(e,0)[0],h=new l(32768),p=0;p<32768;++p){var m=(43690&p)>>>1|(21845&p)<<1;m=(61680&(m=(52428&m)>>>2|(13107&m)<<2))>>>4|(3855&m)<<4,h[p]=((65280&m)>>>8|(255&m)<<8)>>>1}var g=function(b,P,R){for(var Y=b.length,W=0,J=new l(P);W<Y;++W)++J[b[W]-1];var ae,B=new l(P);for(W=0;W<P;++W)B[W]=B[W-1]+J[W-1]<<1;{ae=new l(1<<P);var z=15-P;for(W=0;W<Y;++W)if(b[W])for(var x=W<<4|b[W],k=P-b[W],A=B[b[W]-1]++<<k,D=A|(1<<k)-1;A<=D;++A)ae[h[A]>>>z]=x}return ae},y=new r(288);for(p=0;p<144;++p)y[p]=8;for(p=144;p<256;++p)y[p]=9;for(p=256;p<280;++p)y[p]=7;for(p=280;p<288;++p)y[p]=8;var M=new r(32);for(p=0;p<32;++p)M[p]=5;var _=g(y,9),v=g(M,5),S=function(b){for(var P=b[0],R=1;R<b.length;++R)b[R]>P&&(P=b[R]);return P},T=function(b,P,R){var Y=P/8|0;return(b[Y]|b[Y+1]<<8)>>(7&P)&R},E=function(b,P){var R=P/8|0;return(b[R]|b[R+1]<<8|b[R+2]<<16)>>(7&P)},U=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],C=function(b,P,R){var Y=new Error(P||U[b]);if(Y.code=b,Error.captureStackTrace&&Error.captureStackTrace(Y,C),!R)throw Y;return Y},L=function(b,P,R){var Y=b.length;if(!Y||R&&!R.l&&Y<5)return P||new r(0);var W=!P||R,J=!R||R.i;R||(R={}),P||(P=new r(3*Y));var ae,B=function(fe){var Le=P.length;if(fe>Le){var Ce=new r(Math.max(2*Le,fe));Ce.set(P),P=Ce}},z=R.f||0,x=R.p||0,k=R.b||0,A=R.l,D=R.d,j=R.m,N=R.n,I=8*Y;do{if(!A){R.f=z=T(b,x,1);var O=T(b,x+1,3);if(x+=3,!O){var Q=b[(ee=((ae=x)/8|0)+(7&ae&&1)+4)-4]|b[ee-3]<<8,te=ee+Q;if(te>Y){J&&C(0);break}W&&B(k+Q),P.set(b.subarray(ee,te),k),R.b=k+=Q,R.p=x=8*te;continue}if(O==1)A=_,D=v,j=9,N=5;else if(O==2){var Z=T(b,x,31)+257,H=T(b,x+10,15)+4,ye=Z+T(b,x+5,31)+1;x+=14;for(var de=new r(ye),$=new r(19),re=0;re<H;++re)$[n[re]]=T(b,x+3*re,7);x+=3*H;var ce=S($),X=(1<<ce)-1,ne=g($,ce);for(re=0;re<ye;){var ee,G=ne[T(b,x,X)];if(x+=15&G,(ee=G>>>4)<16)de[re++]=ee;else{var pe=0,K=0;for(ee==16?(K=3+T(b,x,3),x+=2,pe=de[re-1]):ee==17?(K=3+T(b,x,7),x+=3):ee==18&&(K=11+T(b,x,127),x+=7);K--;)de[re++]=pe}}var ie=de.subarray(0,Z),q=de.subarray(Z);j=S(ie),N=S(q),A=g(ie,j),D=g(q,N)}else C(1);if(x>I){J&&C(0);break}}W&&B(k+131072);for(var Me=(1<<j)-1,oe=(1<<N)-1,se=x;;se=x){var ue=(pe=A[E(b,x)&Me])>>>4;if((x+=15&pe)>I){J&&C(0);break}if(pe||C(2),ue<256)P[k++]=ue;else{if(ue==256){se=x,A=null;break}var me=ue-254;if(ue>264){var ke=t[re=ue-257];me=T(b,x,(1<<ke)-1)+i[re],x+=ke}var Re=D[E(b,x)&oe],we=Re>>>4;if(Re||C(3),x+=15&Re,q=d[we],we>3&&(ke=e[we],q+=E(b,x)&(1<<ke)-1,x+=ke),x>I){J&&C(0);break}W&&B(k+131072);for(var be=k+me;k<be;k+=4)P[k]=P[k-q],P[k+1]=P[k+1-q],P[k+2]=P[k+2-q],P[k+3]=P[k+3-q];k=be}}R.l=A,R.p=se,R.b=k,A&&(z=1,R.m=j,R.d=D,R.n=N)}while(!z);return k==P.length?P:function(fe,Le,Ce){(Ce==null||Ce>fe.length)&&(Ce=fe.length);var qe=new(fe instanceof l?l:fe instanceof c?c:r)(Ce-Le);return qe.set(fe.subarray(Le,Ce)),qe}(P,0,k)},F=new r(0),V=typeof TextDecoder<"u"&&new TextDecoder;try{V.decode(F,{stream:!0})}catch{}return s.convert_streams=function(b){var P=new DataView(b),R=0;function Y(){var Z=P.getUint16(R);return R+=2,Z}function W(){var Z=P.getUint32(R);return R+=4,Z}function J(Z){Q.setUint16(te,Z),te+=2}function ae(Z){Q.setUint32(te,Z),te+=4}for(var B={signature:W(),flavor:W(),length:W(),numTables:Y(),reserved:Y(),totalSfntSize:W(),majorVersion:Y(),minorVersion:Y(),metaOffset:W(),metaLength:W(),metaOrigLength:W(),privOffset:W(),privLength:W()},z=0;Math.pow(2,z)<=B.numTables;)z++;z--;for(var x=16*Math.pow(2,z),k=16*B.numTables-x,A=12,D=[],j=0;j<B.numTables;j++)D.push({tag:W(),offset:W(),compLength:W(),origLength:W(),origChecksum:W()}),A+=16;var N,I=new Uint8Array(12+16*D.length+D.reduce(function(Z,H){return Z+H.origLength+4},0)),O=I.buffer,Q=new DataView(O),te=0;return ae(B.flavor),J(B.numTables),J(x),J(z),J(k),D.forEach(function(Z){ae(Z.tag),ae(Z.origChecksum),ae(A),ae(Z.origLength),Z.outOffset=A,(A+=Z.origLength)%4!=0&&(A+=4-A%4)}),D.forEach(function(Z){var H,ye=b.slice(Z.offset,Z.offset+Z.compLength);if(Z.compLength!=Z.origLength){var de=new Uint8Array(Z.origLength);H=new Uint8Array(ye,2),L(H,de)}else de=new Uint8Array(ye);I.set(de,Z.outOffset);var $=0;(A=Z.outOffset+Z.origLength)%4!=0&&($=4-A%4),I.set(new Uint8Array($).buffer,Z.outOffset+Z.origLength),N=A+$}),O.slice(0,N)},Object.defineProperty(s,"__esModule",{value:!0}),s}({}).convert_streams}function fs(s,r){const l={M:2,L:2,Q:4,C:6,Z:0},c={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},t=1,e=2,n=4,a=8,o=16,i=32;let f;function d(U){if(!f){const C={R:e,L:t,D:n,C:o,U:i,T:a};f=new Map;for(let L in c){let F=0;c[L].split(",").forEach(V=>{let[b,P]=V.split("+");b=parseInt(b,36),P=P?parseInt(P,36):0,f.set(F+=b,C[L]);for(let R=P;R--;)f.set(++F,C[L])})}}return f.get(U)||i}const h=1,p=2,m=3,g=4,y=[null,"isol","init","fina","medi"];function M(U){const C=new Uint8Array(U.length);let L=i,F=h,V=-1;for(let b=0;b<U.length;b++){const P=U.codePointAt(b);let R=d(P)|0,Y=h;R&a||(L&(t|n|o)?R&(e|n|o)?(Y=m,(F===h||F===m)&&C[V]++):R&(t|i)&&(F===p||F===g)&&C[V]--:L&(e|i)&&(F===p||F===g)&&C[V]--,F=C[b]=Y,L=R,V=b,P>65535&&b++)}return C}function _(U,C){const L=[];for(let V=0;V<C.length;V++){const b=C.codePointAt(V);b>65535&&V++,L.push(s.U.codeToGlyph(U,b))}const F=U.GSUB;if(F){const{lookupList:V,featureList:b}=F;let P;const R=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,Y=[];b.forEach(W=>{if(R.test(W.tag))for(let J=0;J<W.tab.length;J++){if(Y[W.tab[J]])continue;Y[W.tab[J]]=!0;const ae=V[W.tab[J]],B=/^(isol|init|fina|medi)$/.test(W.tag);B&&!P&&(P=M(C));for(let z=0;z<L.length;z++)(!P||!B||y[P[z]]===W.tag)&&s.U._applySubs(L,z,ae,V)}})}return L}function v(U,C){const L=new Int16Array(C.length*3);let F=0;for(;F<C.length;F++){const R=C[F];if(R===-1)continue;L[F*3+2]=U.hmtx.aWidth[R];const Y=U.GPOS;if(Y){const W=Y.lookupList;for(let J=0;J<W.length;J++){const ae=W[J];for(let B=0;B<ae.tabs.length;B++){const z=ae.tabs[B];if(ae.ltype===1){if(s._lctf.coverageIndex(z.coverage,R)!==-1&&z.pos){P(z.pos,F);break}}else if(ae.ltype===2){let x=null,k=V();if(k!==-1){const A=s._lctf.coverageIndex(z.coverage,C[k]);if(A!==-1){if(z.fmt===1){const D=z.pairsets[A];for(let j=0;j<D.length;j++)D[j].gid2===R&&(x=D[j])}else if(z.fmt===2){const D=s.U._getGlyphClass(C[k],z.classDef1),j=s.U._getGlyphClass(R,z.classDef2);x=z.matrix[D][j]}if(x){x.val1&&P(x.val1,k),x.val2&&P(x.val2,F);break}}}}else if(ae.ltype===4){const x=s._lctf.coverageIndex(z.markCoverage,R);if(x!==-1){const k=V(b),A=k===-1?-1:s._lctf.coverageIndex(z.baseCoverage,C[k]);if(A!==-1){const D=z.markArray[x],j=z.baseArray[A][D.markClass];L[F*3]=j.x-D.x+L[k*3]-L[k*3+2],L[F*3+1]=j.y-D.y+L[k*3+1];break}}}else if(ae.ltype===6){const x=s._lctf.coverageIndex(z.mark1Coverage,R);if(x!==-1){const k=V();if(k!==-1){const A=C[k];if(S(U,A)===3){const D=s._lctf.coverageIndex(z.mark2Coverage,A);if(D!==-1){const j=z.mark1Array[x],N=z.mark2Array[D][j.markClass];L[F*3]=N.x-j.x+L[k*3]-L[k*3+2],L[F*3+1]=N.y-j.y+L[k*3+1];break}}}}}}}}else if(U.kern&&!U.cff){const W=V();if(W!==-1){const J=U.kern.glyph1.indexOf(C[W]);if(J!==-1){const ae=U.kern.rval[J].glyph2.indexOf(R);ae!==-1&&(L[W*3+2]+=U.kern.rval[J].vals[ae])}}}}return L;function V(R){for(let Y=F-1;Y>=0;Y--)if(C[Y]!==-1&&(!R||R(C[Y])))return Y;return-1}function b(R){return S(U,R)===1}function P(R,Y){for(let W=0;W<3;W++)L[Y*3+W]+=R[W]||0}}function S(U,C){const L=U.GDEF&&U.GDEF.glyphClassDef;return L?s.U._getGlyphClass(C,L):0}function T(...U){for(let C=0;C<U.length;C++)if(typeof U[C]=="number")return U[C]}function E(U){const C=Object.create(null),L=U["OS/2"],F=U.hhea,V=U.head.unitsPerEm,b=T(L&&L.sTypoAscender,F&&F.ascender,V),P={unitsPerEm:V,ascender:b,descender:T(L&&L.sTypoDescender,F&&F.descender,0),capHeight:T(L&&L.sCapHeight,b),xHeight:T(L&&L.sxHeight,b),lineGap:T(L&&L.sTypoLineGap,F&&F.lineGap),supportsCodePoint(R){return s.U.codeToGlyph(U,R)>0},forEachGlyph(R,Y,W,J){let ae=0;const B=1/P.unitsPerEm*Y,z=_(U,R);let x=0;const k=v(U,z);return z.forEach((A,D)=>{if(A!==-1){let j=C[A];if(!j){const{cmds:N,crds:I}=s.U.glyphToPath(U,A);let O="",Q=0;for(let de=0,$=N.length;de<$;de++){const re=l[N[de]];O+=N[de];for(let ce=1;ce<=re;ce++)O+=(ce>1?",":"")+I[Q++]}let te,Z,H,ye;if(I.length){te=Z=1/0,H=ye=-1/0;for(let de=0,$=I.length;de<$;de+=2){let re=I[de],ce=I[de+1];re<te&&(te=re),ce<Z&&(Z=ce),re>H&&(H=re),ce>ye&&(ye=ce)}}else te=H=Z=ye=0;j=C[A]={index:A,advanceWidth:U.hmtx.aWidth[A],xMin:te,yMin:Z,xMax:H,yMax:ye,path:O}}J.call(null,j,ae+k[D*3]*B,k[D*3+1]*B,x),ae+=k[D*3+2]*B,W&&(ae+=W*Y)}x+=R.codePointAt(x)>65535?2:1}),ae}};return P}return function(C){const L=new Uint8Array(C,0,4),F=s._bin.readASCII(L,0,4);if(F==="wOFF")C=r(C);else if(F==="wOF2")throw new Error("woff2 fonts not supported");return E(s.parse(C)[0])}}const us=Nt({name:"Typr Font Parser",dependencies:[ls,cs,fs],init(s,r,l){const c=s(),t=r();return l(c,t)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function ds(){return function(s){var r=function(){this.buckets=new Map};r.prototype.add=function(v){var S=v>>5;this.buckets.set(S,(this.buckets.get(S)||0)|1<<(31&v))},r.prototype.has=function(v){var S=this.buckets.get(v>>5);return S!==void 0&&(S&1<<(31&v))!=0},r.prototype.serialize=function(){var v=[];return this.buckets.forEach(function(S,T){v.push((+T).toString(36)+":"+S.toString(36))}),v.join(",")},r.prototype.deserialize=function(v){var S=this;this.buckets.clear(),v.split(",").forEach(function(T){var E=T.split(":");S.buckets.set(parseInt(E[0],36),parseInt(E[1],36))})};var l=Math.pow(2,8),c=l-1,t=~c;function e(v){var S=function(E){return E&t}(v).toString(16),T=function(E){return(E&t)+l-1}(v).toString(16);return"codepoint-index/plane"+(v>>16)+"/"+S+"-"+T+".json"}function n(v,S){var T=v&c,E=S.codePointAt(T/6|0);return((E=(E||48)-48)&1<<T%6)!=0}function a(v,S){var T;(T=v,T.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(E){return E.split("-").map(function(U){return parseInt(U.trim(),16)})})).forEach(function(E){var U=E[0],C=E[1];C===void 0&&(C=U),S(U,C)})}function o(v,S){a(v,function(T,E){for(var U=T;U<=E;U++)S(U)})}var i={},f={},d=new WeakMap,h="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function p(v){var S=d.get(v);return S||(S=new r,o(v.ranges,function(T){return S.add(T)}),d.set(v,S)),S}var m,g=new Map;function y(v,S,T){return v[S]?S:v[T]?T:function(E){for(var U in E)return U}(v)}function M(v,S){var T=S;if(!v.includes(T)){T=1/0;for(var E=0;E<v.length;E++)Math.abs(v[E]-S)<Math.abs(T-S)&&(T=v[E])}return T}function _(v){return m||(m=new Set,o("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(S){m.add(S)})),m.has(v)}return s.CodePointSet=r,s.clearCache=function(){i={},f={}},s.getFontsForString=function(v,S){S===void 0&&(S={});var T,E=S.lang;E===void 0&&(E=new RegExp("\\p{Script=Hangul}","u").test(T=v)?"ko":new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}","u").test(T)?"ja":"en");var U=S.category;U===void 0&&(U="sans-serif");var C=S.style;C===void 0&&(C="normal");var L=S.weight;L===void 0&&(L=400);var F=(S.dataUrl||h).replace(/\/$/g,""),V=new Map,b=new Uint8Array(v.length),P={},R={},Y=new Array(v.length),W=new Map,J=!1;function ae(x){var k=g.get(x);return k||(k=fetch(F+"/"+x).then(function(A){if(!A.ok)throw new Error(A.statusText);return A.json().then(function(D){if(!Array.isArray(D)||D[0]!==1)throw new Error("Incorrect schema version; need 1, got "+D[0]);return D[1]})}).catch(function(A){if(F!==h)return J||(J=!0),F=h,g.delete(x),ae(x);throw A}),g.set(x,k)),k}for(var B=function(x){var k=v.codePointAt(x),A=e(k);Y[x]=A,i[A]||W.has(A)||W.set(A,ae(A).then(function(D){i[A]=D})),k>65535&&(x++,z=x)},z=0;z<v.length;z++)B(z);return Promise.all(W.values()).then(function(){W.clear();for(var x=function(A){var D=v.codePointAt(A),j=null,N=i[Y[A]],I=void 0;for(var O in N){var Q=R[O];if(Q===void 0&&(Q=R[O]=new RegExp(O).test(E||"en")),Q){for(var te in I=O,N[O])if(n(D,N[O][te])){j=te;break}break}}if(!j){e:for(var Z in N)if(Z!==I){for(var H in N[Z])if(n(D,N[Z][H])){j=H;break e}}}j||(j="latin"),Y[A]=j,f[j]||W.has(j)||W.set(j,ae("font-meta/"+j+".json").then(function(ye){f[j]=ye})),D>65535&&(A++,k=A)},k=0;k<v.length;k++)x(k);return Promise.all(W.values())}).then(function(){for(var x,k=null,A=0;A<v.length;A++){var D=v.codePointAt(A);if(k&&(_(D)||p(k).has(D)))b[A]=b[A-1];else{k=f[Y[A]];var j=P[k.id];if(!j){var N=k.typeforms,I=y(N,U,"sans-serif"),O=y(N[I],C,"normal"),Q=M((x=N[I])===null||x===void 0?void 0:x[O],L);j=P[k.id]=F+"/font-files/"+k.id+"/"+I+"."+O+"."+Q+".woff"}var te=V.get(j);te==null&&(te=V.size,V.set(j,te)),b[A]=te}D>65535&&(A++,b[A]=b[A-1])}return{fontUrls:Array.from(V.keys()),chars:b}})},Object.defineProperty(s,"__esModule",{value:!0}),s}({})}function hs(s,r){const l=Object.create(null),c=Object.create(null);function t(n,a){const o=i=>{};try{const i=new XMLHttpRequest;i.open("get",n,!0),i.responseType="arraybuffer",i.onload=function(){if(i.status>=400)o(new Error(i.statusText));else if(i.status>0)try{const f=s(i.response);f.src=n,a(f)}catch(f){o(f)}},i.onerror=o,i.send()}catch(i){o(i)}}function e(n,a){let o=l[n];o?a(o):c[n]?c[n].push(a):(c[n]=[a],t(n,i=>{i.src=n,l[n]=i,c[n].forEach(f=>f(i)),delete c[n]}))}return function(n,a,{lang:o,fonts:i=[],style:f="normal",weight:d="normal",unicodeFontsURL:h}={}){const p=new Uint8Array(n.length),m=[];n.length||_();const g=new Map,y=[];if(f!=="italic"&&(f="normal"),typeof d!="number"&&(d=d==="bold"?700:400),i&&!Array.isArray(i)&&(i=[i]),i=i.slice().filter(S=>!S.lang||S.lang.test(o)).reverse(),i.length){let U=0;(function C(L=0){for(let F=L,V=n.length;F<V;F++){const b=n.codePointAt(F);if(U===1&&m[p[F-1]].supportsCodePoint(b)||/\s/.test(n[F]))p[F]=p[F-1],U===2&&(y[y.length-1][1]=F);else for(let P=p[F],R=i.length;P<=R;P++)if(P===R){const Y=U===2?y[y.length-1]:y[y.length]=[F,F];Y[1]=F,U=2}else{p[F]=P;const{src:Y,unicodeRange:W}=i[P];if(!W||v(b,W)){const J=l[Y];if(!J){e(Y,()=>{C(F)});return}if(J.supportsCodePoint(b)){let ae=g.get(J);typeof ae!="number"&&(ae=m.length,m.push(J),g.set(J,ae)),p[F]=ae,U=1;break}}}b>65535&&F+1<V&&(p[F+1]=p[F],F++,U===2&&(y[y.length-1][1]=F))}M()})()}else y.push([0,n.length-1]),M();function M(){if(y.length){const S=y.map(T=>n.substring(T[0],T[1]+1)).join(`
`);r.getFontsForString(S,{lang:o||void 0,style:f,weight:d,dataUrl:h}).then(({fontUrls:T,chars:E})=>{const U=m.length;let C=0;y.forEach(F=>{for(let V=0,b=F[1]-F[0];V<=b;V++)p[F[0]+V]=E[C++]+U;C++});let L=0;T.forEach((F,V)=>{e(F,b=>{m[V+U]=b,++L===T.length&&_()})})})}else _()}function _(){a({chars:p,fonts:m})}function v(S,T){for(let E=0;E<T.length;E++){const[U,C=U]=T[E];if(U<=S&&S<=C)return!0}return!1}}}const ps=Nt({name:"FontResolver",dependencies:[hs,us,ds],init(s,r,l){return s(r,l())}});function vs(s,r){const c=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,t="[^\\S\\u00A0]",e=new RegExp(`${t}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function n({text:m,lang:g,fonts:y,style:M,weight:_,preResolvedFonts:v,unicodeFontsURL:S},T){const E=({chars:U,fonts:C})=>{let L,F;const V=[];for(let b=0;b<U.length;b++)U[b]!==F?(F=U[b],V.push(L={start:b,end:b,fontObj:C[U[b]]})):L.end=b;T(V)};v?E(v):s(m,E,{lang:g,fonts:y,style:M,weight:_,unicodeFontsURL:S})}function a({text:m="",font:g,lang:y,sdfGlyphSize:M=64,fontSize:_=400,fontWeight:v=1,fontStyle:S="normal",letterSpacing:T=0,lineHeight:E="normal",maxWidth:U=1/0,direction:C,textAlign:L="left",textIndent:F=0,whiteSpace:V="normal",overflowWrap:b="normal",anchorX:P=0,anchorY:R=0,metricsOnly:Y=!1,unicodeFontsURL:W,preResolvedFonts:J=null,includeCaretPositions:ae=!1,chunkedBoundsSize:B=8192,colorRanges:z=null},x){const k=d(),A={fontLoad:0,typesetting:0};m.indexOf("\r")>-1&&(m=m.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),_=+_,T=+T,U=+U,E=E||"normal",F=+F,n({text:m,lang:y,style:S,weight:v,fonts:typeof g=="string"?[{src:g}]:g,unicodeFontsURL:W,preResolvedFonts:J},D=>{A.fontLoad=d()-k;const j=isFinite(U);let N=null,I=null,O=null,Q=null,te=null,Z=null,H=null,ye=null,de=0,$=0,re=V!=="nowrap";const ce=new Map,X=d();let ne=F,ee=0,G=new h;const pe=[G];D.forEach(oe=>{const{fontObj:se}=oe,{ascender:ue,descender:me,unitsPerEm:ke,lineGap:Re,capHeight:we,xHeight:be}=se;let fe=ce.get(se);if(!fe){const he=_/ke,_e=E==="normal"?(ue-me+Re)*he:E*_,yt=(_e-(ue-me)*he)/2,Te=Math.min(_e,(ue-me)*he),Se=(ue+me)/2*he+Te/2;fe={index:ce.size,src:se.src,fontObj:se,fontSizeMult:he,unitsPerEm:ke,ascender:ue*he,descender:me*he,capHeight:we*he,xHeight:be*he,lineHeight:_e,baseline:-yt-ue*he,caretTop:Se,caretBottom:Se-Te},ce.set(se,fe)}const{fontSizeMult:Le}=fe,Ce=m.slice(oe.start,oe.end+1);let qe,Ue;se.forEachGlyph(Ce,_,T,(he,_e,yt,Te)=>{_e+=ee,Te+=oe.start,qe=_e,Ue=he;const Se=m.charAt(Te),Fe=he.advanceWidth*Le,Ae=G.count;let ge;if("isEmpty"in he||(he.isWhitespace=!!Se&&new RegExp(t).test(Se),he.canBreakAfter=!!Se&&e.test(Se),he.isEmpty=he.xMin===he.xMax||he.yMin===he.yMax||c.test(Se)),!he.isWhitespace&&!he.isEmpty&&$++,re&&j&&!he.isWhitespace&&_e+Fe+ne>U&&Ae){if(G.glyphAt(Ae-1).glyphObj.canBreakAfter)ge=new h,ne=-_e;else for(let Ve=Ae;Ve--;)if(Ve===0&&b==="break-word"){ge=new h,ne=-_e;break}else if(G.glyphAt(Ve).glyphObj.canBreakAfter){ge=G.splitAt(Ve+1);const He=ge.glyphAt(0).x;ne-=He;for(let Pe=ge.count;Pe--;)ge.glyphAt(Pe).x-=He;break}ge&&(G.isSoftWrapped=!0,G=ge,pe.push(G),de=U)}let je=G.glyphAt(G.count);je.glyphObj=he,je.x=_e+ne,je.y=yt,je.width=Fe,je.charIndex=Te,je.fontData=fe,Se===`
`&&(G=new h,pe.push(G),ne=-(_e+Fe+T*_)+F)}),ee=qe+Ue.advanceWidth*Le+T*_});let K=0;pe.forEach(oe=>{let se=!0;for(let ue=oe.count;ue--;){const me=oe.glyphAt(ue);se&&!me.glyphObj.isWhitespace&&(oe.width=me.x+me.width,oe.width>de&&(de=oe.width),se=!1);let{lineHeight:ke,capHeight:Re,xHeight:we,baseline:be}=me.fontData;ke>oe.lineHeight&&(oe.lineHeight=ke);const fe=be-oe.baseline;fe<0&&(oe.baseline+=fe,oe.cap+=fe,oe.ex+=fe),oe.cap=Math.max(oe.cap,oe.baseline+Re),oe.ex=Math.max(oe.ex,oe.baseline+we)}oe.baseline-=K,oe.cap-=K,oe.ex-=K,K+=oe.lineHeight});let ie=0,q=0;if(P&&(typeof P=="number"?ie=-P:typeof P=="string"&&(ie=-de*(P==="left"?0:P==="center"?.5:P==="right"?1:i(P)))),R&&(typeof R=="number"?q=-R:typeof R=="string"&&(q=R==="top"?0:R==="top-baseline"?-pe[0].baseline:R==="top-cap"?-pe[0].cap:R==="top-ex"?-pe[0].ex:R==="middle"?K/2:R==="bottom"?K:R==="bottom-baseline"?-pe[pe.length-1].baseline:i(R)*K)),!Y){const oe=r.getEmbeddingLevels(m,C);N=new Uint16Array($),I=new Uint8Array($),O=new Float32Array($*2),Q={},H=[1/0,1/0,-1/0,-1/0],ye=[],ae&&(Z=new Float32Array(m.length*4)),z&&(te=new Uint8Array($*3));let se=0,ue=-1,me=-1,ke,Re;if(pe.forEach((we,be)=>{let{count:fe,width:Le}=we;if(fe>0){let Ce=0;for(let Te=fe;Te--&&we.glyphAt(Te).glyphObj.isWhitespace;)Ce++;let qe=0,Ue=0;if(L==="center")qe=(de-Le)/2;else if(L==="right")qe=de-Le;else if(L==="justify"&&we.isSoftWrapped){let Te=0;for(let Se=fe-Ce;Se--;)we.glyphAt(Se).glyphObj.isWhitespace&&Te++;Ue=(de-Le)/Te}if(Ue||qe){let Te=0;for(let Se=0;Se<fe;Se++){let Fe=we.glyphAt(Se);const Ae=Fe.glyphObj;Fe.x+=qe+Te,Ue!==0&&Ae.isWhitespace&&Se<fe-Ce&&(Te+=Ue,Fe.width+=Ue)}}const he=r.getReorderSegments(m,oe,we.glyphAt(0).charIndex,we.glyphAt(we.count-1).charIndex);for(let Te=0;Te<he.length;Te++){const[Se,Fe]=he[Te];let Ae=1/0,ge=-1/0;for(let je=0;je<fe;je++)if(we.glyphAt(je).charIndex>=Se){let Ve=je,He=je;for(;He<fe;He++){let Pe=we.glyphAt(He);if(Pe.charIndex>Fe)break;He<fe-Ce&&(Ae=Math.min(Ae,Pe.x),ge=Math.max(ge,Pe.x+Pe.width))}for(let Pe=Ve;Pe<He;Pe++){const rt=we.glyphAt(Pe);rt.x=ge-(rt.x+rt.width-Ae)}break}}let _e;const yt=Te=>_e=Te;for(let Te=0;Te<fe;Te++){const Se=we.glyphAt(Te);_e=Se.glyphObj;const Fe=_e.index,Ae=oe.levels[Se.charIndex]&1;if(Ae){const ge=r.getMirroredCharacter(m[Se.charIndex]);ge&&Se.fontData.fontObj.forEachGlyph(ge,0,0,yt)}if(ae){const{charIndex:ge,fontData:je}=Se,Ve=Se.x+ie,He=Se.x+Se.width+ie;Z[ge*4]=Ae?He:Ve,Z[ge*4+1]=Ae?Ve:He,Z[ge*4+2]=we.baseline+je.caretBottom+q,Z[ge*4+3]=we.baseline+je.caretTop+q;const Pe=ge-ue;Pe>1&&f(Z,ue,Pe),ue=ge}if(z){const{charIndex:ge}=Se;for(;ge>me;)me++,z.hasOwnProperty(me)&&(Re=z[me])}if(!_e.isWhitespace&&!_e.isEmpty){const ge=se++,{fontSizeMult:je,src:Ve,index:He}=Se.fontData,Pe=Q[Ve]||(Q[Ve]={});Pe[Fe]||(Pe[Fe]={path:_e.path,pathBounds:[_e.xMin,_e.yMin,_e.xMax,_e.yMax]});const rt=Se.x+ie,xt=Se.y+we.baseline+q;O[ge*2]=rt,O[ge*2+1]=xt;const ht=rt+_e.xMin*je,wt=xt+_e.yMin*je,Mt=rt+_e.xMax*je,pt=xt+_e.yMax*je;ht<H[0]&&(H[0]=ht),wt<H[1]&&(H[1]=wt),Mt>H[2]&&(H[2]=Mt),pt>H[3]&&(H[3]=pt),ge%B===0&&(ke={start:ge,end:ge,rect:[1/0,1/0,-1/0,-1/0]},ye.push(ke)),ke.end++;const Xe=ke.rect;if(ht<Xe[0]&&(Xe[0]=ht),wt<Xe[1]&&(Xe[1]=wt),Mt>Xe[2]&&(Xe[2]=Mt),pt>Xe[3]&&(Xe[3]=pt),N[ge]=Fe,I[ge]=He,z){const _t=ge*3;te[_t]=Re>>16&255,te[_t+1]=Re>>8&255,te[_t+2]=Re&255}}}}}),Z){const we=m.length-ue;we>1&&f(Z,ue,we)}}const Me=[];ce.forEach(({index:oe,src:se,unitsPerEm:ue,ascender:me,descender:ke,lineHeight:Re,capHeight:we,xHeight:be})=>{Me[oe]={src:se,unitsPerEm:ue,ascender:me,descender:ke,lineHeight:Re,capHeight:we,xHeight:be}}),A.typesetting=d()-X,x({glyphIds:N,glyphFontIndices:I,glyphPositions:O,glyphData:Q,fontData:Me,caretPositions:Z,glyphColors:te,chunkedBounds:ye,fontSize:_,topBaseline:q+pe[0].baseline,blockBounds:[ie,q-K,ie+de,q],visibleBounds:H,timings:A})})}function o(m,g){a({...m,metricsOnly:!0},y=>{const[M,_,v,S]=y.blockBounds;g({width:v-M,height:S-_})})}function i(m){let g=m.match(/^([\d.]+)%$/),y=g?parseFloat(g[1]):NaN;return isNaN(y)?0:y/100}function f(m,g,y){const M=m[g*4],_=m[g*4+1],v=m[g*4+2],S=m[g*4+3],T=(_-M)/y;for(let E=0;E<y;E++){const U=(g+E)*4;m[U]=M+T*E,m[U+1]=M+T*(E+1),m[U+2]=v,m[U+3]=S}}function d(){return(self.performance||Date).now()}function h(){this.data=[]}const p=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/p.length)},glyphAt(m){let g=h.flyweight;return g.data=this.data,g.index=m,g},splitAt(m){let g=new h;return g.data=this.data.splice(m*p.length),g}},h.flyweight=p.reduce((m,g,y,M)=>(Object.defineProperty(m,g,{get(){return this.data[this.index*p.length+y]},set(_){this.data[this.index*p.length+y]=_}}),m),{data:null,index:0}),{typeset:a,measure:o}}const Ct=()=>(self.performance||Date).now(),Wr=Sa();let ta;function ms(s,r,l,c,t,e,n,a,o,i,f=!0){return f?ys(s,r,l,c,t,e,n,a,o,i).then(null,d=>(ta||(ta=!0),na(s,r,l,c,t,e,n,a,o,i))):na(s,r,l,c,t,e,n,a,o,i)}const Pr=[],gs=5;let Cn=0;function _a(){const s=Ct();for(;Pr.length&&Ct()-s<gs;)Pr.shift()();Cn=Pr.length?setTimeout(_a,0):0}const ys=(...s)=>new Promise((r,l)=>{Pr.push(()=>{const c=Ct();try{Wr.webgl.generateIntoCanvas(...s),r({timing:Ct()-c})}catch(t){l(t)}}),Cn||(Cn=setTimeout(_a,0))}),xs=4,ws=2e3,ra={};let bs=0;function na(s,r,l,c,t,e,n,a,o,i){const f="TroikaTextSDFGenerator_JS_"+bs++%xs;let d=ra[f];return d||(d=ra[f]={workerModule:Nt({name:f,workerId:f,dependencies:[Sa,Ct],init(h,p){const m=h().javascript.generate;return function(...g){const y=p();return{textureData:m(...g),timing:p()-y}}},getTransferables(h){return[h.textureData.buffer]}}),requests:0,idleTimer:null}),d.requests++,clearTimeout(d.idleTimer),d.workerModule(s,r,l,c,t,e).then(({textureData:h,timing:p})=>{const m=Ct(),g=new Uint8Array(h.length*4);for(let y=0;y<h.length;y++)g[y*4+i]=h[y];return Wr.webglUtils.renderImageData(n,g,a,o,s,r,1<<3-i),p+=Ct()-m,--d.requests===0&&(d.idleTimer=setTimeout(()=>{Ki(f)},ws)),{timing:p}})}function Ss(s){s._warm||(Wr.webgl.isSupported(s),s._warm=!0)}const Ms=Wr.webglUtils.resizeWebGLCanvasWithoutClearing,sr={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},_s=new Ee;function Dt(){return(self.performance||Date).now()}const oa=Object.create(null);function Ta(s,r){s=Us({},s);const l=Dt(),c=[];if(s.font&&c.push({label:"user",src:Cs(s.font)}),s.font=c,s.text=""+s.text,s.sdfGlyphSize=s.sdfGlyphSize||sr.sdfGlyphSize,s.unicodeFontsURL=s.unicodeFontsURL||sr.unicodeFontsURL,s.colorRanges!=null){let d={};for(let h in s.colorRanges)if(s.colorRanges.hasOwnProperty(h)){let p=s.colorRanges[h];typeof p!="number"&&(p=_s.set(p).getHex()),d[h]=p}s.colorRanges=d}Object.freeze(s);const{textureWidth:t,sdfExponent:e}=sr,{sdfGlyphSize:n}=s,a=t/n*4;let o=oa[n];if(!o){const d=document.createElement("canvas");d.width=t,d.height=n*256/a,o=oa[n]={glyphCount:0,sdfGlyphSize:n,sdfCanvas:d,sdfTexture:new Sn(d,void 0,void 0,void 0,so,so),contextLost:!1,glyphsByFont:new Map},o.sdfTexture.generateMipmaps=!1,Ts(o)}const{sdfTexture:i,sdfCanvas:f}=o;js(s).then(d=>{const{glyphIds:h,glyphFontIndices:p,fontData:m,glyphPositions:g,fontSize:y,timings:M}=d,_=[],v=new Float32Array(h.length*4);let S=0,T=0;const E=Dt(),U=m.map(b=>{let P=o.glyphsByFont.get(b.src);return P||o.glyphsByFont.set(b.src,P=new Map),P});h.forEach((b,P)=>{const R=p[P],{src:Y,unitsPerEm:W}=m[R];let J=U[R].get(b);if(!J){const{path:k,pathBounds:A}=d.glyphData[Y][b],D=Math.max(A[2]-A[0],A[3]-A[1])/n*(sr.sdfMargin*n+.5),j=o.glyphCount++,N=[A[0]-D,A[1]-D,A[2]+D,A[3]+D];U[R].set(b,J={path:k,atlasIndex:j,sdfViewBox:N}),_.push(J)}const{sdfViewBox:ae}=J,B=g[T++],z=g[T++],x=y/W;v[S++]=B+ae[0]*x,v[S++]=z+ae[1]*x,v[S++]=B+ae[2]*x,v[S++]=z+ae[3]*x,h[P]=J.atlasIndex}),M.quads=(M.quads||0)+(Dt()-E);const C=Dt();M.sdf={};const L=f.height,F=Math.ceil(o.glyphCount/a),V=Math.pow(2,Math.ceil(Math.log2(F*n)));V>L&&(Ms(f,t,V),i.dispose()),Promise.all(_.map(b=>ka(b,o,s.gpuAccelerateSDF).then(({timing:P})=>{M.sdf[b.atlasIndex]=P}))).then(()=>{_.length&&!o.contextLost&&(Ua(o),i.needsUpdate=!0),M.sdfTotal=Dt()-C,M.total=Dt()-l,r(Object.freeze({parameters:s,sdfTexture:i,sdfGlyphSize:n,sdfExponent:e,glyphBounds:v,glyphAtlasIndices:h,glyphColors:d.glyphColors,caretPositions:d.caretPositions,chunkedBounds:d.chunkedBounds,ascender:d.ascender,descender:d.descender,lineHeight:d.lineHeight,capHeight:d.capHeight,xHeight:d.xHeight,topBaseline:d.topBaseline,blockBounds:d.blockBounds,visibleBounds:d.visibleBounds,timings:d.timings}))})}),Promise.resolve().then(()=>{o.contextLost||Ss(f)})}function ka({path:s,atlasIndex:r,sdfViewBox:l},{sdfGlyphSize:c,sdfCanvas:t,contextLost:e},n){if(e)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:o}=sr,i=Math.max(l[2]-l[0],l[3]-l[1]),f=Math.floor(r/4),d=f%(a/c)*c,h=Math.floor(f/(a/c))*c,p=r%4;return ms(c,c,s,l,i,o,t,d,h,p,n)}function Ts(s){const r=s.sdfCanvas;r.addEventListener("webglcontextlost",l=>{l.preventDefault(),s.contextLost=!0}),r.addEventListener("webglcontextrestored",l=>{s.contextLost=!1;const c=[];s.glyphsByFont.forEach(t=>{t.forEach(e=>{c.push(ka(e,s,!0))})}),Promise.all(c).then(()=>{Ua(s),s.sdfTexture.needsUpdate=!0})})}function ks({font:s,characters:r,sdfGlyphSize:l},c){let t=Array.isArray(r)?r.join(`
`):""+r;Ta({font:s,sdfGlyphSize:l,text:t},c)}function Us(s,r){for(let l in r)r.hasOwnProperty(l)&&(s[l]=r[l]);return s}let jr;function Cs(s){return jr||(jr=typeof document>"u"?{}:document.createElement("a")),jr.href=s,jr.href}function Ua(s){if(typeof createImageBitmap!="function"){const{sdfCanvas:r,sdfTexture:l}=s,{width:c,height:t}=r,e=s.sdfCanvas.getContext("webgl");let n=l.image.data;(!n||n.length!==c*t*4)&&(n=new Uint8Array(c*t*4),l.image={width:c,height:t,data:n},l.flipY=!1,l.isDataTexture=!0),e.readPixels(0,0,c,t,e.RGBA,e.UNSIGNED_BYTE,n)}}const As=Nt({name:"Typesetter",dependencies:[vs,ps,es],init(s,r,l){return s(r,l())}}),js=Nt({name:"Typesetter",dependencies:[As],init(s){return function(r){return new Promise(l=>{s.typeset(r,l)})}},getTransferables(s){const r=[];for(let l in s)s[l]&&s[l].buffer&&r.push(s[l].buffer);return r}}),aa={};function Es(s){let r=aa[s];if(!r){const l=new Br(1,1,s,s),c=l.clone(),t=l.attributes,e=c.attributes,n=new Ja,a=t.uv.count;for(let o=0;o<a;o++)e.position.array[o*3]*=-1,e.normal.array[o*3+2]*=-1;["position","normal","uv"].forEach(o=>{n.setAttribute(o,new xn([...t[o].array,...e[o].array],t[o].itemSize))}),n.setIndex([...l.index.array,...c.index.array.map(o=>o+a)]),n.translate(.5,.5,0),r=aa[s]=n}return r}const Rs="aTroikaGlyphBounds",ia="aTroikaGlyphIndex",Ls="aTroikaGlyphColor";class Fs extends ua{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new En,this.boundingBox=new Gr}computeBoundingSphere(){}computeBoundingBox(){}setSide(r){const l=this.getIndex().count;this.setDrawRange(r===Ge?l/2:0,r===it?l:l/2)}set detail(r){if(r!==this._detail){this._detail=r,(typeof r!="number"||r<1)&&(r=1);let l=Es(r);["position","normal","uv"].forEach(c=>{this.attributes[c]=l.attributes[c].clone()}),this.setIndex(l.getIndex().clone())}}get detail(){return this._detail}set curveRadius(r){r!==this._curveRadius&&(this._curveRadius=r,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(r,l,c,t,e){vn(this,Rs,r,4),vn(this,ia,l,1),vn(this,Ls,e,3),this._blockBounds=c,this._chunkedBounds=t,this.instanceCount=l.length,this._updateBounds()}_updateBounds(){const r=this._blockBounds;if(r){const{curveRadius:l,boundingBox:c}=this;if(l){const{PI:t,floor:e,min:n,max:a,sin:o,cos:i}=Math,f=t/2,d=t*2,h=Math.abs(l),p=r[0]/h,m=r[2]/h,g=e((p+f)/d)!==e((m+f)/d)?-h:n(o(p)*h,o(m)*h),y=e((p-f)/d)!==e((m-f)/d)?h:a(o(p)*h,o(m)*h),M=e((p+t)/d)!==e((m+t)/d)?h*2:a(h-i(p)*h,h-i(m)*h);c.min.set(g,r[1],l<0?-M:0),c.max.set(y,r[3],l<0?0:M)}else c.min.set(r[0],r[1],0),c.max.set(r[2],r[3],0);c.getBoundingSphere(this.boundingSphere)}}applyClipRect(r){let l=this.getAttribute(ia).count,c=this._chunkedBounds;if(c)for(let t=c.length;t--;){l=c[t].end;let e=c[t].rect;if(e[1]<r.w&&e[3]>r.y&&e[0]<r.z&&e[2]>r.x)break}this.instanceCount=l}}function vn(s,r,l,c){const t=s.getAttribute(r);l?t&&t.array.length===l.length?(t.array.set(l),t.needsUpdate=!0):(s.setAttribute(r,new Ka(l,c)),delete s._maxInstanceCount,s.dispose()):t&&s.deleteAttribute(r)}const Ps=`
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
`,Ds=`
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
`,Is=`
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
`,zs=`
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
`;function Gs(s){const r=Un(s,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new mt},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new tt(0,0,0,0)},uTroikaClipRect:{value:new tt(0,0,0,0)},uTroikaDistanceOffset:{value:0},uTroikaOutlineOpacity:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new mt},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new Ee},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Qa},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:Ps,vertexTransform:Ds,fragmentDefs:Is,fragmentColorTransform:zs,customRewriter({vertexShader:l,fragmentShader:c}){let t=/\buniform\s+vec3\s+diffuse\b/;return t.test(c)&&(c=c.replace(t,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),t.test(l)||(l=l.replace(Ma,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:l,fragmentShader:c}}});return r.transparent=!0,Object.defineProperties(r,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),r}const Pn=new qa({color:16777215,side:it,transparent:!0}),sa=8421504,la=new zr,Er=new xe,mn=new xe,ir=[],Os=new xe,gn="+x+y";function ca(s){return Array.isArray(s)?s[0]:s}let Ca=()=>{const s=new Or(new Br(1,1),Pn);return Ca=()=>s,s},Aa=()=>{const s=new Or(new Br(1,1,32,1),Pn);return Aa=()=>s,s};const Bs={type:"syncstart"},Ws={type:"synccomplete"},ja=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],Ns=ja.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");let Ea=class extends Or{constructor(){const r=new Fs;super(r,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=sa,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=gn,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(r){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(r):(this._isSyncing=!0,this.dispatchEvent(Bs),Ta({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},l=>{this._isSyncing=!1,this._textRenderInfo=l,this.geometry.updateGlyphs(l.glyphBounds,l.glyphAtlasIndices,l.blockBounds,l.chunkedBounds,l.glyphColors);const c=this._queuedSyncs;c&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{c.forEach(t=>t&&t())})),this.dispatchEvent(Ws),r&&r()})))}onBeforeRender(r,l,c,t,e,n){this.sync(),e.isTroikaTextMaterial&&this._prepareForRender(e),e._hadOwnSide=e.hasOwnProperty("side"),this.geometry.setSide(e._actualSide=e.side),e.side=Za}onAfterRender(r,l,c,t,e,n){e._hadOwnSide?e.side=e._actualSide:delete e.side}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}get material(){let r=this._derivedMaterial;const l=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Pn.clone());if((!r||r.baseMaterial!==l)&&(r=this._derivedMaterial=Gs(l),l.addEventListener("dispose",function c(){l.removeEventListener("dispose",c),r.dispose()})),this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY){let c=r._outlineMtl;return c||(c=r._outlineMtl=Object.create(r,{id:{value:r.id+.1}}),c.isTextOutlineMaterial=!0,c.depthWrite=!1,c.map=null,r.addEventListener("dispose",function t(){r.removeEventListener("dispose",t),c.dispose()})),[c,r]}else return r}set material(r){r&&r.isTroikaTextMaterial?(this._derivedMaterial=r,this._baseMaterial=r.baseMaterial):this._baseMaterial=r}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(r){this.geometry.detail=r}get curveRadius(){return this.geometry.curveRadius}set curveRadius(r){this.geometry.curveRadius=r}get customDepthMaterial(){return ca(this.material).getDepthMaterial()}get customDistanceMaterial(){return ca(this.material).getDistanceMaterial()}_prepareForRender(r){const l=r.isTextOutlineMaterial,c=r.uniforms,t=this.textRenderInfo;if(t){const{sdfTexture:a,blockBounds:o}=t;c.uTroikaSDFTexture.value=a,c.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),c.uTroikaSDFGlyphSize.value=t.sdfGlyphSize,c.uTroikaSDFExponent.value=t.sdfExponent,c.uTroikaTotalBounds.value.fromArray(o),c.uTroikaUseGlyphColors.value=!l&&!!t.glyphColors;let i=0,f=0,d=0,h,p,m,g=0,y=0;if(l){let{outlineWidth:_,outlineOffsetX:v,outlineOffsetY:S,outlineBlur:T,outlineOpacity:E}=this;i=this._parsePercent(_)||0,f=Math.max(0,this._parsePercent(T)||0),h=E,g=this._parsePercent(v)||0,y=this._parsePercent(S)||0}else d=Math.max(0,this._parsePercent(this.strokeWidth)||0),d&&(m=this.strokeColor,c.uTroikaStrokeColor.value.set(m??sa),p=this.strokeOpacity,p==null&&(p=1)),h=this.fillOpacity;c.uTroikaDistanceOffset.value=i,c.uTroikaPositionOffset.value.set(g,y),c.uTroikaBlurRadius.value=f,c.uTroikaStrokeWidth.value=d,c.uTroikaStrokeOpacity.value=p,c.uTroikaFillOpacity.value=h??1,c.uTroikaCurveRadius.value=this.curveRadius||0;let M=this.clipRect;if(M&&Array.isArray(M)&&M.length===4)c.uTroikaClipRect.value.fromArray(M);else{const _=(this.fontSize||.1)*100;c.uTroikaClipRect.value.set(o[0]-_,o[1]-_,o[2]+_,o[3]+_)}this.geometry.applyClipRect(c.uTroikaClipRect.value)}c.uTroikaSDFDebug.value=!!this.debugSDF,r.polygonOffset=!!this.depthOffset,r.polygonOffsetFactor=r.polygonOffsetUnits=this.depthOffset||0;const e=l?this.outlineColor||0:this.color;if(e==null)delete r.color;else{const a=r.hasOwnProperty("color")?r.color:r.color=new Ee;(e!==a._input||typeof e=="object")&&a.set(a._input=e)}let n=this.orientation||gn;if(n!==r._orientation){let a=c.uTroikaOrient.value;n=n.replace(/[^-+xyz]/g,"");let o=n!==gn&&n.match(/^([-+])([xyz])([-+])([xyz])$/);if(o){let[,i,f,d,h]=o;Er.set(0,0,0)[f]=i==="-"?1:-1,mn.set(0,0,0)[h]=d==="-"?-1:1,la.lookAt(Os,Er.cross(mn),mn),a.setFromMatrix4(la)}else a.identity();r._orientation=n}}_parsePercent(r){if(typeof r=="string"){let l=r.match(/^(-?[\d.]+)%$/),c=l?parseFloat(l[1]):NaN;r=(isNaN(c)?0:c/100)*this.fontSize}return r}localPositionToTextCoords(r,l=new mt){l.copy(r);const c=this.curveRadius;return c&&(l.x=Math.atan2(r.x,Math.abs(c)-Math.abs(r.z))*Math.abs(c)),l}worldPositionToTextCoords(r,l=new mt){return Er.copy(r),this.localPositionToTextCoords(this.worldToLocal(Er),l)}raycast(r,l){const{textRenderInfo:c,curveRadius:t}=this;if(c){const e=c.blockBounds,n=t?Aa():Ca(),a=n.geometry,{position:o,uv:i}=a.attributes;for(let f=0;f<i.count;f++){let d=e[0]+i.getX(f)*(e[2]-e[0]);const h=e[1]+i.getY(f)*(e[3]-e[1]);let p=0;t&&(p=t-Math.cos(d/t)*t,d=Math.sin(d/t)*t),o.setXYZ(f,d,h,p)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,n.matrixWorld=this.matrixWorld,n.material.side=this.material.side,ir.length=0,n.raycast(r,ir);for(let f=0;f<ir.length;f++)ir[f].object=this,l.push(ir[f])}}copy(r){const l=this.geometry;return super.copy(r),this.geometry=l,Ns.forEach(c=>{this[c]=r[c]}),this}clone(){return new this.constructor().copy(this)}};ja.forEach(s=>{const r="_private_"+s;Object.defineProperty(Ea.prototype,s,{get(){return this[r]},set(l){l!==this[r]&&(this[r]=l,this._needsSync=!0)}})});const ze=w.forwardRef(({sdfGlyphSize:s=64,anchorX:r="center",anchorY:l="middle",font:c,fontSize:t=1,children:e,characters:n,onSync:a,...o},i)=>{const f=Wt(({invalidate:m})=>m),[d]=w.useState(()=>new Ea),[h,p]=w.useMemo(()=>{const m=[];let g="";return w.Children.forEach(e,y=>{typeof y=="string"||typeof y=="number"?g+=y:m.push(y)}),[m,g]},[e]);return $a(()=>new Promise(m=>ks({font:c,characters:n},m)),["troika-text",c,n]),w.useLayoutEffect(()=>void d.sync(()=>{f(),a&&a(d)})),w.useEffect(()=>()=>d.dispose(),[d]),w.createElement("primitive",Gt({object:d,ref:i,font:c,text:p,anchorX:r,anchorY:l,fontSize:t,sdfGlyphSize:s},o),h)}),yn=s=>s===Object(s)&&!Array.isArray(s)&&typeof s!="function";function Dn(s,r){const l=Wt(e=>e.gl),c=gt(Ze,yn(s)?Object.values(s):s);return w.useLayoutEffect(()=>{r==null||r(c)},[r]),w.useEffect(()=>{if("initTexture"in l){let e=[];Array.isArray(c)?e=c:c instanceof Sn?e=[c]:yn(c)&&(e=Object.values(c)),e.forEach(n=>{n instanceof Sn&&l.initTexture(n)})}},[l,c]),w.useMemo(()=>{if(yn(s)){const e={};let n=0;for(const a in s)e[a]=c[n++];return e}else return c},[s,c])}Dn.preload=s=>gt.preload(Ze,s);Dn.clear=s=>gt.clear(Ze,s);const dr=w.forwardRef(({children:s,enabled:r=!0,speed:l=1,rotationIntensity:c=1,floatIntensity:t=1,floatingRange:e=[-.1,.1],autoInvalidate:n=!1,...a},o)=>{const i=w.useRef(null);w.useImperativeHandle(o,()=>i.current,[]);const f=w.useRef(Math.random()*1e4);return ve(d=>{var h,p;if(!r||l===0)return;n&&d.invalidate();const m=f.current+d.clock.getElapsedTime();i.current.rotation.x=Math.cos(m/4*l)/8*c,i.current.rotation.y=Math.sin(m/4*l)/8*c,i.current.rotation.z=Math.sin(m/4*l)/20*c;let g=Math.sin(m/4*l)/10;g=Ye.mapLinear(g,-.1,.1,(h=e==null?void 0:e[0])!==null&&h!==void 0?h:-.1,(p=e==null?void 0:e[1])!==null&&p!==void 0?p:.1),i.current.position.y=g*t,i.current.updateMatrix()}),w.createElement("group",a,w.createElement("group",{ref:i,matrixAutoUpdate:!1},s))});class Hs extends da{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${ei>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const Vs=s=>new xe().setFromSpherical(new fa(s,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),Xs=w.forwardRef(({radius:s=100,depth:r=50,count:l=5e3,saturation:c=0,factor:t=4,fade:e=!1,speed:n=1},a)=>{const o=w.useRef(),[i,f,d]=w.useMemo(()=>{const p=[],m=[],g=Array.from({length:l},()=>(.5+.5*Math.random())*t),y=new Ee;let M=s+r;const _=r/l;for(let v=0;v<l;v++)M-=_*Math.random(),p.push(...Vs(M).toArray()),y.setHSL(v/l,c,.9),m.push(y.r,y.g,y.b);return[new Float32Array(p),new Float32Array(m),new Float32Array(g)]},[l,r,t,s,c]);ve(p=>o.current&&(o.current.uniforms.time.value=p.clock.getElapsedTime()*n));const[h]=w.useState(()=>new Hs);return w.createElement("points",{ref:a},w.createElement("bufferGeometry",null,w.createElement("bufferAttribute",{attach:"attributes-position",args:[i,3]}),w.createElement("bufferAttribute",{attach:"attributes-color",args:[f,3]}),w.createElement("bufferAttribute",{attach:"attributes-size",args:[d,1]})),w.createElement("primitive",{ref:o,object:h,attach:"material",blending:Ie,"uniforms-fade-value":e,depthWrite:!1,transparent:!0,vertexColors:!0}))}),Ys=({position:s})=>{const r=w.useRef();Ke();const[l,c]=w.useState(null);return w.useEffect(()=>{new Ze().load("/assets/images/digital_fire.jpg",t=>{t.colorSpace=st,c(t)})},[]),ve(t=>{if(r.current){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9;const n=1+Math.sin(t.clock.elapsedTime*5)*.1;r.current.scale.setScalar(n)}}),l?u.jsx("group",{position:s,children:u.jsx(wa,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:u.jsxs("mesh",{ref:r,position:[0,20,0],children:[u.jsx("planeGeometry",{args:[40,40]}),u.jsx("meshBasicMaterial",{map:l,transparent:!0,opacity:0,depthWrite:!1,blending:Ie})]})})}):null},Zs=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,qs=`
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
`,Qs=({position:s,angle:r,delay:l})=>{const c=w.useRef(),t=w.useRef();Ke();const e=w.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new Ee("#44aaff")},uPartyColor:{value:new Ee("#ff8844")}}),[]);return ve(n=>{if(!c.current||!t.current)return;e.uTime.value=n.clock.elapsedTime;const a=window.icebreakerThaw||0,o=Ye.clamp((a-l)*2,0,1);e.uState.value=o;const i=Math.sin(n.clock.elapsedTime*8+l*10)*o;if(c.current.position.y=s[1]+(i>0?i*2:0)+15,o>0){const f=0-s[0],d=0-(s[2]- -200),h=Math.sqrt(f*f+d*d)||1;c.current.position.x=s[0]+f/h*(o*20),c.current.position.z=s[2]+d/h*(o*20)}else c.current.position.x=s[0],c.current.position.z=s[2]}),u.jsx("group",{ref:c,position:[s[0],s[1]+15,s[2]],children:u.jsx(wa,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:u.jsxs("mesh",{children:[u.jsx("planeGeometry",{args:[20,30]}),u.jsx("shaderMaterial",{ref:t,vertexShader:Zs,fragmentShader:qs,uniforms:e,transparent:!0,side:it,depthWrite:!1})]})})})},Js=({position:s})=>{const l=w.useMemo(()=>{const c=[];for(let t=0;t<60;t++){const e=Math.random()*Math.PI*2,n=30+Math.random()*80;c.push({position:[s[0]+Math.cos(e)*n,s[1],s[2]+Math.sin(e)*n],angle:e,delay:Math.random()*.5})}return c},[60,s]);return u.jsx("group",{children:l.map((c,t)=>u.jsx(Qs,{...c},t))})},Ks=({position:s})=>{const r=w.useRef(),[l,c]=w.useState(null);return Ke(),w.useEffect(()=>{new Ze().load("/icebreaker_logo.png",t=>{t.colorSpace=st,c(t)})},[]),ve(t=>{if(r.current&&(r.current.rotation.y=t.clock.elapsedTime*.5,r.current.position.y=s[1]+Math.sin(t.clock.elapsedTime*2)*5,r.current.material)){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9,r.current.scale.setScalar(.01+e)}}),l?u.jsxs("mesh",{ref:r,position:s,children:[u.jsx("planeGeometry",{args:[40,40]}),u.jsx("meshBasicMaterial",{map:l,transparent:!0,opacity:0,depthWrite:!1,blending:Ie,side:it})]}):null},$s=({numTrees:s=30,radius:r=50,centerZ:l=-500})=>{const c=w.useRef(),t=w.useRef();Ke();const e=w.useMemo(()=>new Ot,[]),n=w.useMemo(()=>{const a=[];for(let o=0;o<s;o++){const i=o/s*Math.PI*2+Math.random()*.5,f=r+Math.random()*20;a.push({position:new xe(Math.cos(i)*f,-18,Math.sin(i)*f+l),rotation:new jn(0,i+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return a},[s,r,l]);return ve(()=>{if(!c.current||!t.current)return;const a=window.icebreakerThaw||0;for(let o=0;o<s;o++){const i=n[o],f=Math.max(0,(a-i.delay)*2),d=Ye.clamp(f,0,1)*i.scale;e.position.copy(i.position),e.rotation.copy(i.rotation),e.scale.setScalar(d),e.updateMatrix(),c.current.setMatrixAt(o,e.matrix),e.position.y+=18*d,e.updateMatrix(),t.current.setMatrixAt(o,e.matrix)}c.current.instanceMatrix.needsUpdate=!0,t.current.instanceMatrix.needsUpdate=!0}),u.jsxs("group",{children:[u.jsxs("instancedMesh",{ref:c,args:[null,null,s],children:[u.jsx("cylinderGeometry",{args:[.5,1,20,8]}),u.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),u.jsxs("instancedMesh",{ref:t,args:[null,null,s],children:[u.jsx("sphereGeometry",{args:[8,4,4]}),u.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},el=`
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
`,tl=`
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
`,rl=({startZ:s,endZ:r})=>{const l=w.useRef(),c=w.useRef(),[t,e]=w.useState(null),n=Math.abs(r-s),a=(s+r)/2,o=w.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return w.useEffect(()=>{new Ze().load("/assets/images/ice_cavern.jpg",i=>{i.wrapS=ur,i.wrapT=ur,i.repeat.set(4,2),i.colorSpace=st,e(i),o.tMap.value=i})},[o]),ve(i=>{if(c.current){const f=window.icebreakerThaw||0;o.uThaw.value=f,o.uTime.value=i.clock.elapsedTime}}),t?u.jsxs("mesh",{ref:l,position:[0,0,a],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[120,120,n,128,128,!0]}),u.jsx("shaderMaterial",{ref:c,vertexShader:el,fragmentShader:tl,uniforms:o,transparent:!0,side:Ge})]}):null},nl=({position:s})=>{const r=w.useRef();return ve(l=>{if(r.current){const c=window.icebreakerThaw||0,t=Ye.lerp(.01,50,Math.pow(c,2));r.current.scale.setScalar(t),r.current.visible=c>0}}),u.jsxs("mesh",{ref:r,position:[s[0],s[1]+1,s[2]],rotation:[-Math.PI/2,0,0],children:[u.jsx("circleGeometry",{args:[20,64]}),u.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},ol=({position:s})=>{const r=w.useRef();return ve(l=>{if(r.current){const c=window.icebreakerThaw||0;r.current.scale.setScalar(c>0?1:.001)}}),u.jsxs("mesh",{ref:r,position:[s[0],s[1]+1.5,s[2]],rotation:[-Math.PI/2,0,0],children:[u.jsx("circleGeometry",{args:[96,64]}),u.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},al=({position:s})=>{const r=w.useRef();return ve(()=>{if(r.current){const l=window.icebreakerThaw||0;r.current.opacity=1-Math.pow(l,2),r.current.transparent=!0}}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:s,children:[u.jsx("planeGeometry",{args:[1e3,3e3]}),u.jsx("meshStandardMaterial",{ref:r,color:"#001133",roughness:.1,metalness:.8})]})},il=({centerZ:s})=>{const r=w.useRef(),l=w.useRef(),c=w.useMemo(()=>({uColorBottom:{value:new Ee("#ffaa55")},uColorTop:{value:new Ee("#00f3ff")},uOpacity:{value:0}}),[]);return ve(()=>{const t=window.icebreakerThaw||0;r.current&&(r.current.uniforms.uOpacity.value=t),l.current&&(l.current.intensity=t*.6)}),u.jsxs("group",{children:[u.jsxs("mesh",{scale:2e3,children:[u.jsx("sphereGeometry",{args:[1,32,32]}),u.jsx("shaderMaterial",{ref:r,side:Ge,transparent:!0,depthWrite:!1,uniforms:c,vertexShader:`
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
          `})]}),u.jsx("directionalLight",{ref:l,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),u.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},sl=()=>{const s=Ke(),[r,l]=w.useState(!1),[c,t]=w.useState(!1),[e,n]=w.useState(!1),a=w.useRef({triggered:!1,timer:0}),o=w.useRef({triggered:!1,timer:0});return w.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),ve((i,f)=>{const d=s.offset;!o.current.triggered&&d>=.22&&(o.current.triggered=!0,n(!0),window.icebreakerCaveLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.22*(s.el.scrollHeight-s.el.clientHeight))),window.icebreakerCaveLocked&&(s.el&&(s.el.scrollTop=.22*(s.el.scrollHeight-s.el.clientHeight)),o.current.timer+=f,o.current.timer>1.5&&(window.icebreakerCaveLocked=!1,n(!1),s.el&&(s.el.style.overflow="auto"))),!r&&d>=.265&&window.icebreakerThaw<1&&(l(!0),window.icebreakerThawLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.27*(s.el.scrollHeight-s.el.clientHeight))),window.icebreakerThawLocked?(s.el&&(s.el.scrollTop=.27*(s.el.scrollHeight-s.el.clientHeight)),window.icebreakerThaw+=f*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,s.el&&!c&&(s.el.style.overflow="auto"),l(!1))):d<.2&&(window.icebreakerThaw=0),!a.current.triggered&&d>=.285&&window.icebreakerThaw>=1&&(a.current.triggered=!0,t(!0),window.icebreakerTextLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.29*(s.el.scrollHeight-s.el.clientHeight))),window.icebreakerTextLocked&&(s.el&&(s.el.scrollTop=.29*(s.el.scrollHeight-s.el.clientHeight)),a.current.timer+=f,a.current.timer>1.5&&(window.icebreakerTextLocked=!1,t(!1),s.el&&(s.el.style.overflow="auto")))}),null},ll=({position:s,rotation:r,visible:l=!0})=>u.jsxs("group",{position:s,rotation:r,visible:l,children:[u.jsx(sl,{}),u.jsx(il,{centerZ:0}),u.jsx(rl,{startZ:1e3,endZ:-1e3}),u.jsx(al,{position:[0,-20,0]}),u.jsx(nl,{position:[0,-20,0]}),u.jsx(ol,{position:[0,-20,0]}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),u.jsx(Ys,{position:[0,-20,0]}),u.jsx(Ks,{position:[0,30,0]}),u.jsx($s,{radius:60,centerZ:0}),u.jsx(Js,{position:[0,-20,0]})]}),cl=`
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
`,fl=`
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
`,ul=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,dl=({position:s,visible:r})=>u.jsxs("group",{visible:r,position:s,children:[u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),hl=({position:s,visible:r})=>{const l=Ke(),c=w.useRef(),t=w.useRef(),e=w.useRef(),[n,a]=w.useState(null),[o,i]=w.useState(null),[f,d]=w.useState(!1),h=w.useRef({triggered:!1,timer:0});w.useEffect(()=>{window.mindwaveLocked=!1,new Ze().load("/mindwave-logo.png",g=>{g.colorSpace=st,a(g)}),new Ze().load("/tribal-sun.png",g=>{g.colorSpace=st,i(g)})},[]);const p=s?s[2]:0,m=w.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return ve((g,y)=>{if(!r)return;const M=l.offset;!h.current.triggered&&M>=.075&&(h.current.triggered=!0,d(!0),window.mindwaveLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.08*(l.el.scrollHeight-l.el.clientHeight))),window.mindwaveLocked&&(l.el&&(l.el.scrollTop=.08*(l.el.scrollHeight-l.el.clientHeight)),h.current.timer+=y,h.current.timer>1.5&&(window.mindwaveLocked=!1,d(!1),l.el&&(l.el.style.overflow="auto")));const _=g.clock.elapsedTime;if(c.current){c.current.uniforms.uTime.value=_;const v=Math.abs(g.camera.position.z-p);let T=1-Math.min(v/1e3,1);T=Math.pow(T,2),c.current.uniforms.uScrollProgress.value=T}if(t.current){t.current.position.y=-7+Math.sin(_*2)*2;const v=1+Math.sin(_*4)*.05;t.current.scale.set(v,v,1),t.current.rotation.y=0}if(e.current){e.current.position.y=125+Math.sin(_*2)*2,e.current.rotation.z=_*.1;const v=1+Math.sin(_*3)*.05;e.current.scale.set(v,v,1)}}),u.jsxs("group",{visible:r,position:s,children:[u.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[u.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),u.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:ul,side:Ge,depthWrite:!1})]}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[u.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),u.jsx("shaderMaterial",{ref:c,vertexShader:cl,fragmentShader:fl,uniforms:m,transparent:!0,side:it,wireframe:!1})]}),o&&u.jsxs("mesh",{ref:e,position:[0,-10,-85],children:[u.jsx("planeGeometry",{args:[140,140]}),u.jsx("meshBasicMaterial",{map:o,transparent:!0,side:it,depthWrite:!1,blending:Ie,color:"#00ffff",opacity:.6})]}),n&&u.jsxs("mesh",{ref:t,position:[0,-10,-80],children:[u.jsx("planeGeometry",{args:[80,80]}),u.jsx("meshBasicMaterial",{map:n,transparent:!0,side:it,depthWrite:!1,blending:Ie})]}),u.jsx(dl,{position:[0,-5,-80],visible:!0})]})},pl=({position:s})=>{const r=w.useRef(document.createElement("canvas")),l=w.useRef(new ha(r.current));w.useEffect(()=>{r.current.width=2048,r.current.height=1024,l.current.colorSpace=st},[]);const c=["MASTER SERVICES AGREEMENT","","1. TERM AND TERMINATION","This Agreement shall commence on the Effective Date and","continue for a period of five (5) years.","","2. LIMITATION OF LIABILITY","IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT,","INCIDENTAL, OR CONSEQUENTIAL DAMAGES, REGARDLESS OF WHETHER","SUCH DAMAGES WERE FORESEEABLE.","","3. INDEMNIFICATION","Client agrees to indemnify and hold harmless the Service Provider","against any claims arising out of the use of the services."];return ve(t=>{const e=t.clock.elapsedTime,n=r.current.getContext("2d");n.fillStyle="rgba(2, 6, 12, 0.85)",n.fillRect(0,0,2048,1024),n.strokeStyle="rgba(0, 200, 255, 0.1)",n.lineWidth=2;for(let f=0;f<2048;f+=64)n.beginPath(),n.moveTo(f,0),n.lineTo(f,1024),n.stroke();for(let f=0;f<1024;f+=64)n.beginPath(),n.moveTo(0,f),n.lineTo(2048,f),n.stroke();const a=e*.5%2,i=(a>1?2-a:a)*1024;n.fillStyle="rgba(0, 255, 255, 0.15)",n.fillRect(0,i-60,2048,120),n.fillStyle="#00ffff",n.fillRect(0,i-2,2048,4),n.textAlign="left",c.forEach((f,d)=>{const h=150+d*50;if(d===0){n.font="bold 60px monospace",n.fillStyle="#ffffff",n.fillText(f,100,h);return}n.font="40px monospace",d>=6&&d<=9?(n.fillStyle="#ff0033",n.fillText(f,100,h),e%10>5&&(n.strokeStyle="#ff0033",n.lineWidth=6,n.beginPath(),n.moveTo(90,h-12),n.lineTo(1900,h-12),n.stroke(),d===9&&(n.fillStyle="#ffcc00",n.font="bold 40px monospace",n.fillText(">> AI REVISION: Liability capped at fees paid in prior 12 months.",100,h+60)))):(n.fillStyle="#00ffff",n.fillText(f,100,h))}),l.current.needsUpdate=!0}),u.jsx("group",{position:s,children:u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[600,600,500,64,1,!0,-Math.PI/6,Math.PI/3]}),u.jsx("meshBasicMaterial",{map:l.current,side:it,transparent:!0,blending:Ie})]})})},vl=()=>{const r=w.useRef();return ve(l=>{r.current&&(r.current.rotation.y=l.clock.elapsedTime*.05)}),u.jsx("group",{ref:r,children:Array.from({length:16}).map((l,c)=>{const t=c/16*Math.PI*2;return u.jsxs("mesh",{position:[Math.cos(t)*900,(Math.random()-.5)*400,Math.sin(t)*900],rotation:[0,-t+Math.PI/2,0],children:[u.jsx("planeGeometry",{args:[200,300]}),u.jsx("meshBasicMaterial",{color:"#0066ff",transparent:!0,opacity:.15,wireframe:!0})]},c)})})},ml=({position:s,rotation:r,visible:l})=>{const c=gt(Ze,"/legal_eagle_logo.png");return c.colorSpace=st,u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsx("ambientLight",{intensity:.5}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[3e3,64,64]}),u.jsx("meshBasicMaterial",{color:"#010204",side:Ge})]}),u.jsx("group",{position:[0,350,-800],children:u.jsxs(dr,{speed:2,rotationIntensity:.1,floatIntensity:1,children:[u.jsxs("mesh",{position:[0,120,0],children:[u.jsx("planeGeometry",{args:[250,250]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1,blending:Ie})]}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-40,0],fontSize:70,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:28,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Contract Generation & Review"})]})}),u.jsx(vl,{}),u.jsx(pl,{position:[0,-100,-600]})]})},An=s=>{const l=new ni;s==="interceptor"?(l.moveTo(1*1.8,0),l.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),l.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),l.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),l.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):s==="viper"?(l.moveTo(1*1.2,1*.3),l.lineTo(1*.4,1*.4),l.lineTo(-1*.8,1*1.2),l.lineTo(-1*1.2,1*.8),l.lineTo(-1*.8,0),l.lineTo(-1*1.2,-1*.8),l.lineTo(-1*.8,-1*1.2),l.lineTo(1*.4,-1*.4),l.lineTo(1*1.2,-1*.3),l.lineTo(1*.6,0)):s==="bulwark"&&(l.moveTo(1*1.5,0),l.lineTo(1*.8,1*1.2),l.lineTo(-1*.5,1*1.5),l.lineTo(-1*1.5,1*.8),l.lineTo(-1*1.5,-1*.8),l.lineTo(-1*.5,-1*1.5),l.lineTo(1*.8,-1*1.2));const c={steps:1,depth:s==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},t=new oi(l,c);return t.center(),t.rotateY(-Math.PI/2),t.rotateZ(-Math.PI/2),t},gl=({position:s})=>{const r=w.useRef(),l=w.useMemo(()=>An("bulwark"),[]);return ve((c,t)=>{r.current&&(r.current.position.y=Math.sin(c.clock.elapsedTime*.2)*40,r.current.rotation.y+=t*.05,r.current.rotation.z=Math.sin(c.clock.elapsedTime*.1)*.1)}),u.jsxs("group",{position:s,ref:r,scale:[120,120,120],children:[u.jsx("mesh",{geometry:l,children:u.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),u.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),u.jsxs("mesh",{position:[0,0,1.5],children:[u.jsx("sphereGeometry",{args:[.2,16,16]}),u.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},yl=({position:s})=>{const e=w.useMemo(()=>new Ot,[]),n=w.useMemo(()=>new Ot,[]),a=w.useRef(),o=w.useRef(),i=w.useRef(),f=w.useRef(),d=w.useMemo(()=>An("interceptor"),[]),h=w.useMemo(()=>An("viper"),[]),p=w.useMemo(()=>{const y=new ti(.5,.5,20,4);return y.rotateX(Math.PI/2),y},[]),m=w.useMemo(()=>Array.from({length:80},(y,M)=>{const _=M>=40;return{pos:new xe((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new xe,target:new xe,team:_?1:0,meshIndex:_?M-40:M,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),g=w.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new xe,vel:new xe,color:new Ee,life:0})),[60]);return ve((y,M)=>{if(!a.current||!o.current||!i.current||!f.current)return;let _=0;m.forEach(v=>{if(v.state===0){if(Math.random()<.02||v.target.lengthSq()===0){const L=m[Math.floor(Math.random()*80)];L&&L.team!==v.team&&L.state===0?(v.target.copy(L.pos),v.target.x+=(Math.random()-.5)*200,v.target.y+=(Math.random()-.5)*200,v.target.z+=(Math.random()-.5)*200):v.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const S=new xe().subVectors(v.target,v.pos),T=S.length();if(T>150&&T<800&&Math.random()<.03){const L=g.find(F=>!F.active);L&&(L.active=!0,L.pos.copy(v.pos),L.vel.copy(S).normalize().multiplyScalar(2500),L.color.set(v.team===0?"#00ffff":"#ff3300"),L.life=.8)}const E=S.normalize().multiplyScalar(400*M);v.vel.add(E),v.vel.clampLength(0,600),v.pos.addScaledVector(v.vel,M),v.trail.push(v.pos.clone()),v.trail.length>5&&v.trail.shift(),e.position.copy(v.pos);const U=e.position.clone().add(v.vel);e.lookAt(U);const C=E.clone().cross(v.vel).y;e.rotateZ(C*.01),e.scale.set(30,30,30)}else{v.explosionTimer+=M,e.position.copy(v.pos),e.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const S=30*Math.max(.1,1-v.explosionTimer*2);e.scale.set(S,S,S),v.explosionTimer>.5&&(v.state=0,v.health=100,v.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),v.vel.set(0,0,0),v.trail=[])}e.updateMatrix(),v.team===0?(a.current.setMatrixAt(v.meshIndex,e.matrix),a.current.setColorAt(v.meshIndex,v.state===0?new Ee("#00aaff"):new Ee("#ffaa00"))):(o.current.setMatrixAt(v.meshIndex,e.matrix),o.current.setColorAt(v.meshIndex,v.state===0?new Ee("#ff0033"):new Ee("#ffaa00"))),v.trail.forEach((S,T)=>{if(_<400){e.position.copy(S),e.rotation.set(0,0,0);const E=T/5*10;e.scale.set(E,E,E),e.updateMatrix(),f.current.setMatrixAt(_,e.matrix),f.current.setColorAt(_,v.team===0?new Ee("#00ffff"):new Ee("#ff5500")),_++}})});for(let v=_;v<400;v++)e.position.set(0,9999,0),e.scale.set(0,0,0),e.updateMatrix(),f.current.setMatrixAt(v,e.matrix);g.forEach((v,S)=>{v.active?(v.pos.addScaledVector(v.vel,M),v.life-=M,m.forEach(T=>{T.state===0&&v.pos.distanceTo(T.pos)<50&&(T.health-=50,v.active=!1,T.health<=0&&(T.state=1,T.explosionTimer=0))}),v.life<=0&&(v.active=!1),n.position.copy(v.pos),n.lookAt(n.position.clone().add(v.vel)),n.scale.set(1,1,1)):(n.position.set(0,9999,0),n.scale.set(0,0,0)),n.updateMatrix(),i.current.setMatrixAt(S,n.matrix),i.current.setColorAt(S,v.color)}),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0),o.current.instanceMatrix.needsUpdate=!0,o.current.instanceColor&&(o.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),i.current.instanceMatrix.needsUpdate=!0,i.current.instanceColor&&(i.current.instanceColor.needsUpdate=!0)}),u.jsxs("group",{position:s,children:[u.jsx("instancedMesh",{ref:a,args:[d,null,40],children:u.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),u.jsx("instancedMesh",{ref:o,args:[h,null,40],children:u.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),u.jsx("instancedMesh",{ref:i,args:[p,null,60],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Ie})}),u.jsx("instancedMesh",{ref:f,args:[new ri(1,4,4),null,400],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:Ie,depthWrite:!1})})]})},xl=({position:s,rotation:r,visible:l})=>{const c=gt(Ze,"/interstellar_logo_final.png");return c.colorSpace=st,u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsx("ambientLight",{intensity:.2}),u.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),u.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),u.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[4e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#020510",side:Ge})]}),u.jsx(gl,{position:[0,-120,-100]}),u.jsx(yl,{position:[0,-50,0]}),u.jsxs("group",{position:[0,120,100],children:[u.jsxs("mesh",{position:[0,50,0],children:[u.jsx("planeGeometry",{args:[180,180]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1})]}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]})]})},wl=({position:s})=>{const r=w.useRef();return ve((l,c)=>{r.current&&(r.current.rotation.y+=c*.1)}),u.jsxs("group",{position:s,ref:r,children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[40,40,200,16]}),u.jsx("meshStandardMaterial",{color:"#223344",metalness:.8,roughness:.2})]}),u.jsxs("mesh",{position:[0,0,80],rotation:[Math.PI/2,0,0],children:[u.jsx("coneGeometry",{args:[120,60,32]}),u.jsx("meshStandardMaterial",{color:"#112233",metalness:.5,roughness:.5})]}),u.jsxs("mesh",{position:[0,0,100],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[100,100,2,32]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.8,blending:Ie})]}),u.jsxs("mesh",{position:[-150,0,0],children:[u.jsx("boxGeometry",{args:[200,50,5]}),u.jsx("meshStandardMaterial",{color:"#001122",metalness:.9,roughness:.1,emissive:"#002244",emissiveIntensity:.5})]}),u.jsxs("mesh",{position:[150,0,0],children:[u.jsx("boxGeometry",{args:[200,50,5]}),u.jsx("meshStandardMaterial",{color:"#001122",metalness:.9,roughness:.1,emissive:"#002244",emissiveIntensity:.5})]}),u.jsxs("mesh",{position:[0,120,0],children:[u.jsx("cylinderGeometry",{args:[2,2,100]}),u.jsx("meshStandardMaterial",{color:"#8899aa"})]}),u.jsxs("mesh",{position:[0,170,0],children:[u.jsx("sphereGeometry",{args:[5,16,16]}),u.jsx("meshBasicMaterial",{color:"#ff0088"})]})]})},bl=({position:s})=>{const r=w.useRef();return ve(l=>{r.current&&(r.current.position.z=l.clock.elapsedTime*800%500,r.current.scale.z=1+Math.sin(l.clock.elapsedTime*10)*.5)}),u.jsx("group",{position:s,children:u.jsxs("mesh",{ref:r,rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[5,5,200,8]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,blending:Ie})]})})},Sl=()=>{const s=gt(Ze,"/autopilot_logo.png");return s.colorSpace=st,u.jsxs("mesh",{position:[0,350,-600],children:[u.jsx("planeGeometry",{args:[250,250]}),u.jsx("meshBasicMaterial",{map:s,transparent:!0,depthWrite:!1,blending:Ie})]})},Ml=({position:s,rotation:r,visible:l})=>{const c=Ke(),[t,e]=w.useState(!1),n=w.useRef({timer:0,triggered:!1});return ve((a,o)=>{l&&(c.offset>=.595&&c.offset<=.605&&!n.current.triggered&&!window.orbitalLocked&&(window.orbitalLocked=!0,n.current.triggered=!0,n.current.timer=0,e(!0),c.el&&(c.el.style.overflow="hidden")),window.orbitalLocked&&(c.el&&(c.el.scrollTop=.6*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.orbitalLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto"))))}),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsx("ambientLight",{intensity:.2}),u.jsx("directionalLight",{position:[200,500,500],intensity:2.5,color:"#ffffff"}),u.jsx("pointLight",{position:[0,0,200],intensity:3,color:"#00ffff",distance:1e3}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[2e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#000205",side:Ge})]}),u.jsxs(dr,{speed:1.5,rotationIntensity:.1,floatIntensity:.5,children:[u.jsx(Ir.Suspense,{fallback:null,children:u.jsx(Sl,{})}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,180,-600],fontSize:80,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"ORBITAL COMMAND"}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,100,-600],fontSize:25,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"Centralizing Strategy & Global Output"}),u.jsx(wl,{position:[0,-100,-600]}),u.jsx(bl,{position:[0,-100,-450]})]}),u.jsx(Bt,{count:1e3,scale:1500,size:20,speed:.2,opacity:.3,color:"#00aaff",position:[0,0,-500]})]})},_l=({position:s})=>{const r=w.useRef(),l=400,c=w.useMemo(()=>new Ot,[]),t=w.useMemo(()=>{const e=[];for(let n=0;n<l;n++){const a=250+Math.random()*500,o=Math.random()*2*Math.PI,i=(Math.random()-.5)*300;e.push({t:Math.random()*100,factor:.5+Math.random()*1.5,speed:.005+Math.random()*.015,radius:a,theta:o,y:i})}return e},[l]);return ve(()=>{t.forEach((e,n)=>{let{t:a,factor:o,speed:i,radius:f,theta:d,y:h}=e;a+=i,e.t=a,c.position.set(Math.cos(d+a)*f,h+Math.sin(a*o)*50,Math.sin(d+a)*f),c.rotation.y=-(d+a),c.updateMatrix(),r.current.setMatrixAt(n,c.matrix)}),r.current.instanceMatrix.needsUpdate=!0}),u.jsx("group",{position:s,children:u.jsxs("instancedMesh",{ref:r,args:[null,null,l],children:[u.jsx("coneGeometry",{args:[4,15,8]}),u.jsx("meshStandardMaterial",{color:"#00ffcc",metalness:.8,roughness:.2,emissive:"#005544",emissiveIntensity:.5})]})})},Tl=({position:s})=>{const r=w.useRef();return ve((l,c)=>{r.current&&(r.current.position.y=Math.sin(l.clock.elapsedTime*1.5)*20)}),u.jsxs("group",{position:s,ref:r,children:[u.jsxs("mesh",{children:[u.jsx("capsuleGeometry",{args:[60,200,16,32]}),u.jsx("meshStandardMaterial",{color:"#1a1a24",metalness:.9,roughness:.3})]}),u.jsxs("mesh",{position:[-80,0,0],rotation:[0,0,-Math.PI/6],children:[u.jsx("boxGeometry",{args:[100,10,80]}),u.jsx("meshStandardMaterial",{color:"#111118",metalness:.8,roughness:.4})]}),u.jsxs("mesh",{position:[80,0,0],rotation:[0,0,Math.PI/6],children:[u.jsx("boxGeometry",{args:[100,10,80]}),u.jsx("meshStandardMaterial",{color:"#111118",metalness:.8,roughness:.4})]}),u.jsxs("mesh",{position:[0,-120,0],children:[u.jsx("cylinderGeometry",{args:[40,50,20,32]}),u.jsx("meshBasicMaterial",{color:"#00ffcc",transparent:!0,opacity:.9,blending:Ie})]}),u.jsxs("mesh",{position:[0,-250,0],children:[u.jsx("cylinderGeometry",{args:[40,10,300,32]}),u.jsx("meshBasicMaterial",{color:"#00aa88",transparent:!0,opacity:.4,blending:Ie})]})]})},kl=({position:s,rotation:r,visible:l})=>{const c=Ke(),[t,e]=w.useState(!1),n=w.useRef({timer:0,triggered:!1});return ve((a,o)=>{l&&(c.offset>=.645&&c.offset<=.655&&!n.current.triggered&&!window.swarmLocked&&(window.swarmLocked=!0,n.current.triggered=!0,n.current.timer=0,e(!0),c.el&&(c.el.style.overflow="hidden")),window.swarmLocked&&(c.el&&(c.el.scrollTop=.65*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.swarmLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto"))))}),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsx("ambientLight",{intensity:.1}),u.jsx("directionalLight",{position:[0,500,200],intensity:2,color:"#00ffcc"}),u.jsx("pointLight",{position:[0,0,0],intensity:4,color:"#00ffcc",distance:1500}),u.jsxs("mesh",{rotation:[0,0,0],children:[u.jsx("sphereGeometry",{args:[2e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#020504",side:Ge})]}),u.jsxs(dr,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,250,200],fontSize:80,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"DRONE SWARM"}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,160,200],fontSize:25,color:"#00ffcc",anchorX:"center",anchorY:"middle",children:"Autonomous Execution & Omni-channel Reach"}),u.jsx("group",{rotation:[Math.PI/2,0,0],children:u.jsx(Tl,{position:[0,0,0]})})]}),u.jsx(_l,{position:[0,0,0]}),u.jsx(Bt,{count:2e3,scale:2e3,size:15,speed:.4,opacity:.5,color:"#ffffff",position:[0,0,0]})]})},Ul=({position:s})=>{const r=w.useRef(),l=w.useMemo(()=>({uTime:{value:0},uColor:{value:new Ee("#00ffff")}}),[]);return ve(c=>{r.current&&(r.current.uniforms.uTime.value=c.clock.elapsedTime)}),u.jsxs("mesh",{position:s,children:[u.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),u.jsx("shaderMaterial",{ref:r,transparent:!0,side:it,blending:Ie,depthWrite:!1,uniforms:l,vertexShader:`
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
        `})]})},Cl=()=>{const s=w.useRef(),r=w.useMemo(()=>({uTime:{value:0},uColor:{value:new Ee("#0044ff")},uHighlight:{value:new Ee("#00ffff")}}),[]);return ve(l=>{s.current&&(s.current.uniforms.uTime.value=l.clock.elapsedTime)}),u.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[u.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),u.jsx("shaderMaterial",{ref:s,transparent:!0,wireframe:!0,uniforms:r,vertexShader:`
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
        `})]})},Al=({position:s,rotation:r,visible:l})=>{const[c,t]=w.useState(null);return w.useEffect(()=>{new Ze().load("/cloveh2o_logo.png",n=>{n.colorSpace=st,t(n)})},[]),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[4e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#000511",side:Ge})]}),u.jsx(Cl,{}),u.jsx(Ul,{position:[0,1800,-800]}),u.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),u.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),u.jsxs("group",{position:[0,0,-300],children:[c&&u.jsxs("mesh",{position:[0,80,0],children:[u.jsx("planeGeometry",{args:[200,200]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1,blending:Ie})]}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},Rr=({color:s,number:r,groupRef:l,armRef:c})=>u.jsxs("group",{ref:l,children:[u.jsxs("mesh",{position:[0,10,0],children:[u.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),u.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.3,roughness:.4})]}),u.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[u.jsx("sphereGeometry",{args:[2.5,16,16]}),u.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.5,roughness:.3})]}),u.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[u.jsx("sphereGeometry",{args:[2.5,16,16]}),u.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.5,roughness:.3})]}),u.jsxs("group",{position:[0,17,0],children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[2.8,32,32]}),u.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.8,metalness:.5})]}),u.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[u.jsx("boxGeometry",{args:[3.5,2,2]}),u.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),u.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:u.jsxs("mesh",{position:[0,-3.5,0],children:[u.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),u.jsx("meshStandardMaterial",{color:s,roughness:.6})]})}),u.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:c,children:u.jsxs("mesh",{position:[0,-3.5,0],children:[u.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),u.jsx("meshStandardMaterial",{color:s,roughness:.6})]})}),u.jsxs("mesh",{position:[-1.8,3,0],children:[u.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),u.jsx("meshStandardMaterial",{color:s,roughness:.8})]}),u.jsxs("mesh",{position:[1.8,3,0],children:[u.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),u.jsx("meshStandardMaterial",{color:s,roughness:.8})]}),r&&u.jsx(ze,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:r})]}),jl=({position:s})=>{const r=w.useRef(),l=w.useRef(),c=w.useRef(),t=w.useRef(),e=w.useRef(),n=w.useRef(),a=w.useMemo(()=>new xe(100,0,0),[]),o=w.useMemo(()=>new xe(100,0,20),[]),i=w.useMemo(()=>new xe(30,0,100),[]),f=w.useMemo(()=>new xe(0,0,-20),[]),d=w.useMemo(()=>new xe(20,0,220),[]),h=w.useMemo(()=>new xe,[]),p=w.useMemo(()=>new xe,[]);return w.useMemo(()=>new xe,[]),ve(m=>{const g=m.clock.elapsedTime%6;if(c.current&&c.current.rotation.set(0,0,-.3),g<.5)l.current&&l.current.position.copy(a),t.current&&t.current.position.copy(o),e.current&&e.current.position.copy(i),r.current&&r.current.position.copy(f),n.current&&n.current.position.copy(f).add(h.set(4.5,12,2));else if(g<4){const y=(g-.5)/3.5;if(l.current&&(y<.5?l.current.position.lerpVectors(a,h.set(100,0,110),y*2):l.current.position.lerpVectors(p.set(100,0,110),d,(y-.5)*2)),t.current&&l.current&&t.current.position.lerpVectors(o,h.set(d.x+8,0,d.z-8),y),e.current&&e.current.position.lerpVectors(i,h.set(d.x-8,0,d.z+8),y),n.current)if(g<1.5)n.current.position.copy(f).add(h.set(4.5,12,2));else{const M=(g-1.5)/2.5,_=Math.sin(M*Math.PI)*45;n.current.position.lerpVectors(f,d,M),n.current.position.y+=_+18}}else if(g<5)l.current&&l.current.position.lerpVectors(d,h.set(20,0,240),g-4),n.current&&l.current&&n.current.position.copy(l.current.position).add(h.set(0,12,3)),t.current&&(t.current.position.y=0),e.current&&(e.current.position.y=0);else if(g<5.5)c.current&&c.current.rotation.set(Math.PI,0,0),n.current&&l.current&&n.current.position.copy(l.current.position).add(h.set(4.5,20,0));else if(c.current&&c.current.rotation.set(-Math.PI/4,0,0),n.current&&l.current){const y=g-5.5,M=Math.abs(Math.cos(y*8))*10;n.current.position.copy(l.current.position).add(h.set(4.5,M,4))}}),u.jsxs("group",{position:s,children:[u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[u.jsx("planeGeometry",{args:[400,400]}),u.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),u.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[u.jsx("planeGeometry",{args:[400,40]}),u.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),u.jsx(Rr,{color:"#0088ff",number:"QB",groupRef:r}),u.jsx(Rr,{color:"#00ffff",number:"80",groupRef:l,armRef:c}),u.jsx(Rr,{color:"#ff0044",number:"CB",groupRef:t}),u.jsx(Rr,{color:"#ff0044",number:"S",groupRef:e}),u.jsxs("mesh",{ref:n,children:[u.jsx("sphereGeometry",{args:[2,16,16]}),u.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},El=({position:s,rotation:r,visible:l})=>{const c=gt(Ze,"/fantasy_quant_stadium.jpg");return c.colorSpace=st,c.wrapS=ur,c.repeat.set(-1,1),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[2500,64,64]}),u.jsx("meshBasicMaterial",{map:c,side:Ge})]}),u.jsx(jl,{position:[0,-125,0],rotation:[0,-Math.PI/2,0]}),u.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),u.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),u.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]})]})},Rl=({position:s})=>{const l=w.useRef(),c=w.useMemo(()=>{const e=[];for(let n=0;n<4e3;n++){const a=Math.random()*Math.PI*2,o=(Math.random()-.5)*150,i=400,f=(i+o*Math.cos(a/2))*Math.cos(a),d=o*Math.sin(a/2),h=(i+o*Math.cos(a/2))*Math.sin(a);e.push({pos:new xe(f,d,h),u:a,v:o,speed:Math.random()*.5+.2,color:new Ee(Math.random()>.5?"#00f3ff":"#0077ff")})}return e},[]),t=w.useMemo(()=>new Ot,[]);return ve(e=>{if(!l.current)return;const n=e.clock.elapsedTime;c.forEach((a,o)=>{const i=(a.u+n*a.speed)%(Math.PI*2),f=400,d=(f+a.v*Math.cos(i/2))*Math.cos(i),h=a.v*Math.sin(i/2),p=(f+a.v*Math.cos(i/2))*Math.sin(i);t.position.set(d,h,p);const m=1.5+Math.sin(n*a.speed*5+o)*.8;t.scale.set(m,m,m),t.updateMatrix(),l.current.setMatrixAt(o,t.matrix),l.current.setColorAt(o,a.color)}),l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0)}),u.jsx("group",{position:s,children:u.jsx("instancedMesh",{ref:l,args:[new Br(2,2),null,4e3],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Ie,depthWrite:!1,side:it})})})},Ll=()=>{const s=w.useMemo(()=>Array.from({length:30}).map(()=>{const l=[],c=(Math.random()-.5)*800,t=600+Math.random()*400,e=Math.random()*Math.PI*2;for(let n=0;n<=50;n++){const a=e+n/50*Math.PI*1.5;l.push(new xe(Math.cos(a)*t,c+Math.sin(a*8)*50,Math.sin(a)*t))}return{points:l,color:Math.random()>.5?"#00f3ff":"#ffffff"}}),[]),r=w.useRef();return ve(l=>{r.current&&(r.current.rotation.y=l.clock.elapsedTime*.15)}),u.jsx("group",{ref:r,children:s.map((l,c)=>u.jsx(Yi,{points:l.points,color:l.color,lineWidth:2,transparent:!0,opacity:.4},c))})},Fl=()=>{const s=Dn("/contango_quant_logo.png");return u.jsxs("mesh",{position:[0,450,-800],children:[u.jsx("planeGeometry",{args:[250,250]}),u.jsx("meshBasicMaterial",{map:s,transparent:!0,depthWrite:!1})]})},Pl=({position:s,rotation:r,visible:l})=>{const c=Ke(),[t,e]=w.useState(!1),n=w.useRef({triggered:!1,timer:0});return ve((a,o)=>{if(!l)return;const i=c.offset;!n.current.triggered&&i>=.92&&(n.current.triggered=!0,e(!0),window.contangoLocked=!0,c.el&&(c.el.style.overflow="hidden",c.el.scrollTop=.93*(c.el.scrollHeight-c.el.clientHeight))),window.contangoLocked&&(c.el&&(c.el.scrollTop=.93*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.contangoLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto")))}),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsx("ambientLight",{intensity:.4}),u.jsx("directionalLight",{position:[0,500,500],intensity:1.5,color:"#ffffff"}),u.jsx("spotLight",{position:[-500,500,500],intensity:2,color:"#00f3ff",penumbra:1}),u.jsx("spotLight",{position:[500,-500,500],intensity:2,color:"#0077ff",penumbra:1}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[3e3,64,64]}),u.jsx("meshBasicMaterial",{color:"#010204",side:Ge})]}),u.jsx(Ll,{}),u.jsx(Xs,{radius:1500,depth:50,count:5e3,factor:4,saturation:0,fade:!0,speed:1}),u.jsxs(dr,{speed:2,rotationIntensity:.2,floatIntensity:1,floatingRange:[-10,10],children:[u.jsx(Ir.Suspense,{fallback:null,children:u.jsx(Fl,{})}),u.jsx(ze,{position:[0,250,-800],fontSize:100,anchorX:"center",anchorY:"middle",color:"#ffffff",children:"CONTANGO QUANT"}),u.jsx(ze,{position:[0,120,-800],fontSize:35,color:"#00f3ff",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",children:"The physics of finance"})]}),u.jsx(Rl,{position:[0,-100,-800]}),u.jsx(Bt,{count:4e3,scale:3e3,size:25,speed:.6,opacity:.5,color:"#00f3ff",position:[0,0,-500]})]})},Dl=({position:s,rotation:r,visible:l})=>{const c=w.useRef(),t=w.useRef(),e=gt(Ze,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return ve(n=>{c.current&&(c.current.position.y=Math.sin(n.clock.elapsedTime*1.5)*5),t.current&&(t.current.rotation.y+=.005,t.current.rotation.z+=.002)}),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[1500,32,32]}),u.jsx("meshBasicMaterial",{color:"#020510",side:Ge})]}),u.jsxs("group",{children:[u.jsx(dr,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:u.jsxs("mesh",{ref:c,position:[0,0,-500],children:[u.jsx("planeGeometry",{args:[400,100]})," ",u.jsx("meshBasicMaterial",{map:e,transparent:!0,opacity:1,side:it,depthWrite:!1})]})}),u.jsx(Bt,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),u.jsx(Bt,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),u.jsx("ambientLight",{intensity:.5,color:"#002244"}),u.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},Il=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,zl=`
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
`,Gl=({startZ:s=10,endZ:r=-500,visible:l=!0})=>{const c=w.useRef(),t=w.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);ve(n=>{c.current&&l&&(c.current.uniforms.uTime.value=n.clock.elapsedTime,c.current.uniforms.uOpacity.value=Ye.lerp(c.current.uniforms.uOpacity.value,l?1:0,.05))});const e=w.useMemo(()=>{const n=[],o=s-r;for(let i=0;i<=100;i++){const f=s-i/100*o;n.push(new xe(Math.sin(i*.1)*2,Math.cos(i*.05)*2,f))}return new ai(n)},[s,r]);return u.jsxs("mesh",{visible:l,children:[u.jsx("tubeGeometry",{args:[e,200,15,32,!1]}),u.jsx("shaderMaterial",{ref:c,vertexShader:Il,fragmentShader:zl,uniforms:t,side:Ge,transparent:!0,blending:Ie})]})},Ol=`
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
`,Bl=`
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
`,Wl=({position:s,rotation:r=[0,0,0],length:l=4e3,visible:c=!0})=>{const t=w.useRef(),e=w.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:l}}),[l]);return ve(n=>{t.current&&(t.current.uniforms.uTime.value=n.clock.elapsedTime,t.current.uniforms.uOpacity.value=c?1:0)}),u.jsx("group",{position:s,rotation:r,visible:c,children:u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[60,400,l+200,32,64,!0]}),u.jsx("shaderMaterial",{ref:t,vertexShader:Ol,fragmentShader:Bl,uniforms:e,transparent:!0,side:Ge,wireframe:!1})]})})},Lr=({position:s,rotation:r,length:l=4e3,radius:c=200,color:t="#ffffff",speed:e=20,visible:n=!0})=>{const a=w.useRef(),o=w.useMemo(()=>({uTime:{value:0},uColor:{value:new Ee(t)}}),[t]);return ve(i=>{a.current&&(a.current.uniforms.uTime.value=i.clock.elapsedTime)}),u.jsxs("mesh",{visible:n,position:s,rotation:r,children:[u.jsx("cylinderGeometry",{args:[c,c,l,32,1,!0]}),u.jsx("shaderMaterial",{ref:a,transparent:!0,side:Ge,blending:Ie,depthWrite:!1,uniforms:o,vertexShader:`
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
        `})]})},Nl=()=>{const s=[],r=(l,c,t)=>{s.push({x:l,y:c,z:0,rot:[Math.PI/2,0,0],color:t,bodyHeight:40+Math.random()*40})};for(let l=Math.PI*.25;l<Math.PI*1.75;l+=.2)r(-100+Math.cos(l)*80,Math.sin(l)*80,"#00ff00");for(let l=0;l<Math.PI*2;l+=.2)r(100+Math.cos(l)*80,Math.sin(l)*80,"#ff0044");return r(140,-40,"#ff0044"),r(160,-60,"#ff0044"),r(180,-80,"#ff0044"),s},Hl=({position:s,rotation:r=[0,0,0],length:l=6e3,radius:c=250,visible:t})=>{const e=w.useRef(),n=w.useRef(),a=w.useRef(),o=gt(Ze,"/assets/images/contango_logo.png"),i=w.useMemo(()=>{const d=[],h=Math.floor(l/5);for(let m=0;m<h;m++){const g=-(m/h)*l,y=m*.1,M=Math.cos(y)*c,_=Math.sin(y)*c,v=Math.cos(y+Math.PI)*c,S=Math.sin(y+Math.PI)*c,E=Math.random()>.5?"#00ff00":"#ff0044",U=20+Math.random()*60,C=[0,0,y+Math.PI/2],L=[0,0,y+Math.PI+Math.PI/2];d.push({x:M,y:_,z:g,rot:C,color:E,bodyHeight:U}),d.push({x:v,y:S,z:g,rot:L,color:E,bodyHeight:U})}return Nl().forEach(m=>{d.push({x:m.x,y:m.y,z:-l-500,rot:m.rot,color:m.color,bodyHeight:m.bodyHeight})}),d},[l,c]),f=i.length;return w.useEffect(()=>{if(!n.current||!a.current)return;const d=new Ot,h=new Ee;for(let p=0;p<f;p++){const m=i[p];d.position.set(m.x,m.y,m.z),d.rotation.set(m.rot[0],m.rot[1],m.rot[2]),d.scale.set(1,m.bodyHeight+40,1),d.updateMatrix(),n.current.setMatrixAt(p,d.matrix),h.set(m.color),n.current.setColorAt(p,h),d.scale.set(1,m.bodyHeight,1),d.updateMatrix(),a.current.setMatrixAt(p,d.matrix),a.current.setColorAt(p,h)}n.current.instanceMatrix.needsUpdate=!0,n.current.instanceColor&&(n.current.instanceColor.needsUpdate=!0),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0)},[i,f]),ve(d=>{e.current&&t&&(e.current.rotation.z=d.clock.elapsedTime*.5)}),u.jsxs("group",{position:s,rotation:r,visible:t,children:[u.jsxs("group",{ref:e,children:[u.jsxs("instancedMesh",{ref:n,args:[null,null,f],children:[u.jsx("cylinderGeometry",{args:[2,2,1,8]}),u.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),u.jsxs("instancedMesh",{ref:a,args:[null,null,f],children:[u.jsx("boxGeometry",{args:[10,1,10]}),u.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),u.jsxs("mesh",{position:[0,0,-l-500],children:[u.jsx("planeGeometry",{args:[200,200]}),u.jsx("meshBasicMaterial",{map:o,transparent:!0})]}),u.jsxs("mesh",{position:[0,0,-l/2],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[c*.8,c*.8,l,32,1,!0]}),u.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:Ge})]})]})},Vl=({position:s,rotation:r,length:l=8e3,visible:c=!0})=>{const t=w.useRef(),e=w.useRef();ve(a=>{if(!c||!t.current)return;const o=a.clock.getElapsedTime();t.current.map.offset.y=-o*3,e.current&&(e.current.rotation.y=o*2)});const n=Ir.useMemo(()=>{const a=document.createElement("canvas");a.width=512,a.height=512;const o=a.getContext("2d"),i=o.createLinearGradient(0,0,0,512);i.addColorStop(0,"#001a33"),i.addColorStop(.5,"#00ccff"),i.addColorStop(1,"#001a33"),o.fillStyle=i,o.fillRect(0,0,512,512),o.fillStyle="#ffffff";for(let d=0;d<200;d++)o.globalAlpha=Math.random()*.5,o.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const f=new ha(a);return f.wrapS=ur,f.wrapT=ur,f.repeat.set(4,20),f},[]);return u.jsxs("group",{position:s,rotation:r,visible:c,children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[150,150,l,32,1,!0]}),u.jsx("meshStandardMaterial",{ref:t,map:n,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:Ge,transparent:!0,opacity:.9})]}),u.jsxs("mesh",{ref:e,children:[u.jsx("cylinderGeometry",{args:[140,140,l,16,40,!0]}),u.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:Ge})]})]})},ut=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.56,x:0,y:-4e3,z:-11550,rx:0,ry:0},{p:.58,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.6,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.61,x:0,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.63,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.65,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.66,x:4e3,y:-4e3,z:-13550,rx:0,ry:Math.atan2(-4e3,-2600)},{p:.685,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],Xl=s=>{if(s<=ut[0].p)return ut[0];if(s>=ut[ut.length-1].p)return ut[ut.length-1];for(let r=0;r<ut.length-1;r++){const l=ut[r],c=ut[r+1];if(s>=l.p&&s<=c.p){const t=(s-l.p)/(c.p-l.p);return{x:Ye.lerp(l.x,c.x,t),y:Ye.lerp(l.y,c.y,t),z:Ye.lerp(l.z,c.z,t),rx:Ye.lerp(l.rx,c.rx,t),ry:Ye.lerp(l.ry,c.ry,t)}}}return ut[0]},Yl=()=>{const s=Ke(),r=w.useRef();return ve(l=>{let c=s.offset;window.icebreakerCaveLocked?c=.22:window.icebreakerThawLocked?c=.27:window.icebreakerTextLocked?c=.29:window.mindwaveLocked?c=.08:window.interstellarLocked?c=.42:window.orbitalLocked?c=.6:window.swarmLocked?c=.65:window.contangoLocked&&(c=.93);const t=Xl(c);l.camera.position.x=Ye.lerp(l.camera.position.x,t.x,.2),l.camera.position.y=Ye.lerp(l.camera.position.y,t.y,.2),l.camera.position.z=Ye.lerp(l.camera.position.z,t.z,.2);const e=new At().setFromEuler(new jn(t.rx,t.ry,0));l.camera.quaternion.slerp(e,.15);const n=s.delta*10;l.camera.rotateZ(Ye.lerp(0,n*2,.2)),r.current&&r.current.position.copy(l.camera.position)}),u.jsxs("group",{children:[u.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),u.jsx("pointLight",{ref:r,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),u.jsx("ambientLight",{intensity:.2})]})},Zl=()=>{const s=Ke(),[r,l]=w.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),c=w.useRef(r);return ve(()=>{const t=s.offset,e={intro:t<.08,mindwave:t>.04&&t<.18,wormhole_ice:t>.1&&t<.25,icebreaker:t>.18&&t<.35,wormhole_sound:t>.28&&t<.42,interstellar:t>.28&&t<.48,w_legal:t>.43&&t<.54,legal:t>.48&&t<.58,w_orbital:t>.53&&t<.65,orbital:t>.56&&t<.66,w_swarm:t>.59&&t<.68,swarm:t>.61&&t<.7,w_clove:t>.64&&t<.72,clove:t>.66&&t<.76,w_fantasy:t>.71&&t<.83,fantasy:t>.73&&t<.88,w_contango:t>.84&&t<.91,contango:t>.89&&t<.96,sentaient:t>.94};let n=!1;for(const a in e)c.current[a]!==e[a]&&(n=!0);n&&(c.current=e,l(e))}),u.jsxs("group",{children:[u.jsx(Gl,{startZ:10,endZ:-250,visible:r.intro}),u.jsx(hl,{position:[0,0,-1350],visible:r.mindwave}),u.jsx(Wl,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:r.wormhole_ice}),u.jsx(ll,{position:[0,-4e3,-2550],visible:r.icebreaker}),u.jsx(xl,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:r.interstellar}),u.jsx(Lr,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:r.w_legal}),u.jsx(ml,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:r.legal}),u.jsx(Lr,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffcc",visible:r.w_orbital}),u.jsx(Ml,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:r.orbital}),u.jsx(Lr,{position:[2e3,-4e3,-13550],rotation:[Math.PI/2,-Math.PI/2,0],length:2e3,color:"#00ffff",speed:40,visible:r.w_swarm}),u.jsx(kl,{position:[5e3,-4e3,-13550],rotation:[0,0,0],visible:r.swarm}),u.jsx(Lr,{position:[2500,-4e3,-15050],rotation:[Math.PI/2,Math.atan2(4e3,-2600),0],length:3500,color:"#ff00ff",speed:40,visible:r.w_clove}),u.jsx(Al,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:r.clove}),u.jsx(Vl,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:r.w_fantasy}),u.jsx(El,{position:[0,-11700,-17500],rotation:[0,0,0],visible:r.fantasy}),u.jsx(Hl,{position:[0,-11750,-20550],length:4e3,visible:r.w_contango}),u.jsx(Pl,{position:[0,-11750,-24800],rotation:[0,0,0],visible:r.contango}),u.jsx(Dl,{position:[0,-11750,-29350],rotation:[0,0,0],visible:r.sentaient})]})},ql=()=>{const s=Ke(),r=w.useRef(),l=w.useRef();return w.useRef(),w.useRef(),w.useRef(),ve(()=>{const c=s.offset;if(r.current){const t=c<.03?1:0;r.current.style.opacity=t}if(l.current){const t=c>.2&&c<.28?1:0;l.current.style.opacity=t}}),u.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[u.jsxs("div",{ref:r,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[u.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),u.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),u.jsxs("div",{ref:l,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[u.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[u.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:u.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),u.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),u.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),u.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},Ql=()=>u.jsxs(ii,{gl:{antialias:!1,alpha:!0},children:[u.jsxs(Oi,{pages:10,damping:.2,distance:1.2,children:[u.jsxs(Ir.Suspense,{fallback:null,children:[u.jsx(Yl,{}),u.jsx(Zl,{})]}),u.jsx(Bt,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),u.jsx(Ni,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:u.jsx(ql,{})})]}),u.jsxs(si,{disableNormalPass:!0,children:[u.jsx(li,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),u.jsx(ci,{opacity:.05}),u.jsx(fi,{eskil:!1,offset:.1,darkness:1.1})]})]}),nc=()=>u.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[u.jsxs(Ga,{children:[u.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),u.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),u.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),u.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:u.jsx(Oa,{})}),u.jsx("div",{className:"absolute inset-0 z-0",children:u.jsx(Ql,{})})]});export{nc as default};
//# sourceMappingURL=index-BgzLLtdY.js.map
