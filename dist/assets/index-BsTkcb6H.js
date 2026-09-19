import{r as x,_ as Ut,g as Ba,j as u,R as zr,H as Oa}from"./vendor--do4CMJV.js";import{H as Na}from"./Header-WPS1UR6V.js";import{a0 as gt,a1 as me,Q as Et,r as Gr,W as ua,a2 as et,f as je,i as Rn,ac as At,aa as he,a6 as io,R as Wa,m as da,F as bn,n as Sn,o as Bt,a5 as Va,b as Br,U as En,J as ha,$ as Mn,_ as so,s as Or,L as Ha,M as Ze,v as Xa,u as Ya,y as Za,G as qa,l as pa,t as Qa,B as De,h as it,X as Ka,p as Ir,q as Ja,P as Nr,c as $a,I as ei,a9 as ti,a4 as ri,H as ni,D as oi,k as ai,a8 as ii,a7 as si,N as li,w as ci,A as Pe,ad as fi,Y as tt,S as st,z as Rt,O as Nt,ab as Vt,d as Ln,g as ui,V as di,K as hi,j as pi,T as Wt,e as ma,Z as mi,C as vi,E as gi,a as yi,x as xi,a3 as wi}from"./Vignette-BElbV-tN.js";import"./main-DCvJzsRA.js";import"./preload-helper-BxaVoaJg.js";function ur(l,r,s){return r in l?Object.defineProperty(l,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):l[r]=s,l}function _n(l,r){(r==null||r>l.length)&&(r=l.length);for(var s=0,c=new Array(r);s<r;s++)c[s]=l[s];return c}function bi(l,r){if(l){if(typeof l=="string")return _n(l,r);var s=Object.prototype.toString.call(l).slice(8,-1);if(s==="Object"&&l.constructor&&(s=l.constructor.name),s==="Map"||s==="Set")return Array.from(l);if(s==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return _n(l,r)}}function Si(l){if(Array.isArray(l))return _n(l)}function Mi(l){if(typeof Symbol<"u"&&l[Symbol.iterator]!=null||l["@@iterator"]!=null)return Array.from(l)}function _i(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ti(l){return Si(l)||Mi(l)||bi(l)||_i()}new gt;new gt;function ki(l,r,s){return Math.max(r,Math.min(s,l))}function Ci(l,r){return ki(l-Math.floor(l/r)*r,0,r)}function ji(l,r){var s=Ci(r-l,Math.PI*2);return s>Math.PI&&(s-=Math.PI*2),s}function va(l,r){if(!(l instanceof r))throw new TypeError("Cannot call a class as a function")}var $e=function l(r,s,c){var t=this;va(this,l),ur(this,"dot2",function(e,n){return t.x*e+t.y*n}),ur(this,"dot3",function(e,n,a){return t.x*e+t.y*n+t.z*a}),this.x=r,this.y=s,this.z=c},Ui=[new $e(1,1,0),new $e(-1,1,0),new $e(1,-1,0),new $e(-1,-1,0),new $e(1,0,1),new $e(-1,0,1),new $e(1,0,-1),new $e(-1,0,-1),new $e(0,1,1),new $e(0,-1,1),new $e(0,1,-1),new $e(0,-1,-1)],lo=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],co=new Array(512),fo=new Array(512),Ai=function(r){r>0&&r<1&&(r*=65536),r=Math.floor(r),r<256&&(r|=r<<8);for(var s=0;s<256;s++){var c;s&1?c=lo[s]^r&255:c=lo[s]^r>>8&255,co[s]=co[s+256]=c,fo[s]=fo[s+256]=Ui[c%12]}};Ai(0);function Ri(l){if(typeof l=="number")l=Math.abs(l);else if(typeof l=="string"){var r=l;l=0;for(var s=0;s<r.length;s++)l=(l+(s+1)*(r.charCodeAt(s)%96))%2147483647}return l===0&&(l=311),l}function uo(l){var r=Ri(l);return function(){var s=r*48271%2147483647;return r=s,s/2147483647}}var Ei=function l(r){var s=this;va(this,l),ur(this,"seed",0),ur(this,"init",function(c){s.seed=c,s.value=uo(c)}),ur(this,"value",uo(this.seed)),this.init(r)};new Ei(Math.random());var Li=function(r){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return c/Math.atan(1/s)*Math.atan(Math.sin(2*Math.PI*r*t)/s)},ga=function(r){return 1/(1+r+.48*r*r+.235*r*r*r)},Pi=function(r){return r},Fi={in:function(r){return 1-Math.cos(r*Math.PI/2)},out:function(r){return Math.sin(r*Math.PI/2)},inOut:function(r){return-(Math.cos(Math.PI*r)-1)/2}},Ii={in:function(r){return r*r*r},out:function(r){return 1-Math.pow(1-r,3)},inOut:function(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}},Di={in:function(r){return r*r*r*r*r},out:function(r){return 1-Math.pow(1-r,5)},inOut:function(r){return r<.5?16*r*r*r*r*r:1-Math.pow(-2*r+2,5)/2}},zi={in:function(r){return 1-Math.sqrt(1-Math.pow(r,2))},out:function(r){return Math.sqrt(1-Math.pow(r-1,2))},inOut:function(r){return r<.5?(1-Math.sqrt(1-Math.pow(2*r,2)))/2:(Math.sqrt(1-Math.pow(-2*r+2,2))+1)/2}},Gi={in:function(r){return r*r*r*r},out:function(r){return 1- --r*r*r*r},inOut:function(r){return r<.5?8*r*r*r*r:1-8*--r*r*r*r}},Bi={in:function(r){return r===0?0:Math.pow(2,10*r-10)},out:function(r){return r===1?1:1-Math.pow(2,-10*r)},inOut:function(r){return r===0?0:r===1?1:r<.5?Math.pow(2,20*r-10)/2:(2-Math.pow(2,-20*r+10))/2}};function Ge(l,r,s){var c=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,t=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,e=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,n=arguments.length>6&&arguments[6]!==void 0?arguments[6]:ga,a=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,o="velocity_"+r;if(l.__damp===void 0&&(l.__damp={}),l.__damp[o]===void 0&&(l.__damp[o]=0),Math.abs(l[r]-s)<=a)return l[r]=s,!1;c=Math.max(1e-4,c);var i=2/c,f=n(i*t),d=l[r]-s,h=s,p=e*c;d=Math.min(Math.max(d,-p),p),s=l[r]-d;var v=(l.__damp[o]+i*d)*t;l.__damp[o]=(l.__damp[o]-i*v)*f;var g=s+(d+v)*f;return h-l[r]>0==g>h&&(g=h,l.__damp[o]=(g-h)/t),l[r]=g,!0}var Oi=function(r){return r&&r.isCamera},Ni=function(r){return r&&r.isLight},rr=new me,ho=new Et,po=new Et,nr=new Gr,dn=new me;function Wi(l,r,s,c,t,e,n){typeof r=="number"?rr.setScalar(r):Array.isArray(r)?rr.set(r[0],r[1],r[2]):rr.copy(r);var a=l.parent;l.updateWorldMatrix(!0,!1),dn.setFromMatrixPosition(l.matrixWorld),Oi(l)||Ni(l)?nr.lookAt(dn,rr,l.up):nr.lookAt(rr,dn,l.up),Dr(l.quaternion,po.setFromRotationMatrix(nr),s,c,t,e,n),a&&(nr.extractRotation(a.matrixWorld),ho.setFromRotationMatrix(nr),Dr(l.quaternion,po.copy(l.quaternion).premultiply(ho.invert()),s,c,t,e,n))}function Ot(l,r,s,c,t,e,n,a){return Ge(l,r,l[r]+ji(l[r],s),c,t,e,n,a)}var or=new gt,mo,vo;function Vi(l,r,s,c,t,e,n){return typeof r=="number"?or.setScalar(r):Array.isArray(r)?or.set(r[0],r[1]):or.copy(r),mo=Ge(l,"x",or.x,s,c,t,e,n),vo=Ge(l,"y",or.y,s,c,t,e,n),mo||vo}var Dt=new me,go,yo,xo;function Tn(l,r,s,c,t,e,n){return typeof r=="number"?Dt.setScalar(r):Array.isArray(r)?Dt.set(r[0],r[1],r[2]):Dt.copy(r),go=Ge(l,"x",Dt.x,s,c,t,e,n),yo=Ge(l,"y",Dt.y,s,c,t,e,n),xo=Ge(l,"z",Dt.z,s,c,t,e,n),go||yo||xo}var Tt=new et,wo,bo,So,Mo;function Hi(l,r,s,c,t,e,n){return typeof r=="number"?Tt.setScalar(r):Array.isArray(r)?Tt.set(r[0],r[1],r[2],r[3]):Tt.copy(r),wo=Ge(l,"x",Tt.x,s,c,t,e,n),bo=Ge(l,"y",Tt.y,s,c,t,e,n),So=Ge(l,"z",Tt.z,s,c,t,e,n),Mo=Ge(l,"w",Tt.w,s,c,t,e,n),wo||bo||So||Mo}var ar=new Rn,_o,To,ko;function Xi(l,r,s,c,t,e,n){return Array.isArray(r)?ar.set(r[0],r[1],r[2],r[3]):ar.copy(r),_o=Ot(l,"x",ar.x,s,c,t,e,n),To=Ot(l,"y",ar.y,s,c,t,e,n),ko=Ot(l,"z",ar.z,s,c,t,e,n),_o||To||ko}var zt=new je,Co,jo,Uo;function Yi(l,r,s,c,t,e,n){return r instanceof je?zt.copy(r):Array.isArray(r)?zt.setRGB(r[0],r[1],r[2]):zt.set(r),Co=Ge(l,"r",zt.r,s,c,t,e,n),jo=Ge(l,"g",zt.g,s,c,t,e,n),Uo=Ge(l,"b",zt.b,s,c,t,e,n),Co||jo||Uo}var at=new Et,vt=new et,Ao=new et,ir=new et,Ro,Eo,Lo,Po;function Dr(l,r,s,c,t,e,n){var a=l;Array.isArray(r)?at.set(r[0],r[1],r[2],r[3]):at.copy(r);var o=l.dot(at)>0?1:-1;return at.x*=o,at.y*=o,at.z*=o,at.w*=o,Ro=Ge(l,"x",at.x,s,c,t,e,n),Eo=Ge(l,"y",at.y,s,c,t,e,n),Lo=Ge(l,"z",at.z,s,c,t,e,n),Po=Ge(l,"w",at.w,s,c,t,e,n),vt.set(l.x,l.y,l.z,l.w).normalize(),Ao.set(a.__damp.velocity_x,a.__damp.velocity_y,a.__damp.velocity_z,a.__damp.velocity_w),ir.copy(vt).multiplyScalar(Ao.dot(vt)/vt.dot(vt)),a.__damp.velocity_x-=ir.x,a.__damp.velocity_y-=ir.y,a.__damp.velocity_z-=ir.z,a.__damp.velocity_w-=ir.w,l.set(vt.x,vt.y,vt.z,vt.w),Ro||Eo||Lo||Po}var sr=new ua,Fo,Io,Do;function Zi(l,r,s,c,t,e,n){return Array.isArray(r)?sr.set(r[0],r[1],r[2]):sr.copy(r),Fo=Ge(l,"radius",sr.radius,s,c,t,e,n),Io=Ot(l,"phi",sr.phi,s,c,t,e,n),Do=Ot(l,"theta",sr.theta,s,c,t,e,n),Fo||Io||Do}var Cr=new Gr,zo=new me,Go=new Et,Bo=new me,Oo,No,Wo;function qi(l,r,s,c,t,e,n){var a=l;return a.__damp===void 0&&(a.__damp={position:new me,rotation:new Et,scale:new me},l.decompose(a.__damp.position,a.__damp.rotation,a.__damp.scale)),Array.isArray(r)?Cr.set.apply(Cr,Ti(r)):Cr.copy(r),Cr.decompose(zo,Go,Bo),Oo=Tn(a.__damp.position,zo,s,c,t,e,n),No=Dr(a.__damp.rotation,Go,s,c,t,e,n),Wo=Tn(a.__damp.scale,Bo,s,c,t,e,n),l.compose(a.__damp.position,a.__damp.rotation,a.__damp.scale),Oo||No||Wo}var Vo=Object.freeze({__proto__:null,rsqw:Li,exp:ga,linear:Pi,sine:Fi,cubic:Ii,quint:Di,circ:zi,quart:Gi,expo:Bi,damp:Ge,dampLookAt:Wi,dampAngle:Ot,damp2:Vi,damp3:Tn,damp4:Hi,dampE:Xi,dampC:Yi,dampQ:Dr,dampS:Zi,dampM:qi});const Pn=x.createContext(null);function He(){return x.useContext(Pn)}function Qi({eps:l=1e-5,enabled:r=!0,infinite:s,horizontal:c,pages:t=1,distance:e=1,damping:n=.25,maxSpeed:a=1/0,prepend:o=!1,style:i={},children:f}){const{get:d,setEvents:h,gl:p,size:v,invalidate:g,events:y}=At(),[M]=x.useState(()=>document.createElement("div")),[_]=x.useState(()=>document.createElement("div")),[m]=x.useState(()=>document.createElement("div")),b=p.domElement.parentNode,k=x.useRef(0),A=x.useMemo(()=>({el:M,eps:l,fill:_,fixed:m,horizontal:c,damping:n,offset:0,delta:0,scroll:k,pages:t,range(L,P,H=0){const S=L-H,F=S+P+H*2;return this.offset<S?0:this.offset>F?1:(this.offset-S)/(F-S)},curve(L,P,H=0){return Math.sin(this.range(L,P,H)*Math.PI)},visible(L,P,H=0){const S=L-H,F=S+P+H*2;return this.offset>=S&&this.offset<=F}}),[l,n,c,t]);x.useEffect(()=>{M.style.position="absolute",M.style.width="100%",M.style.height="100%",M.style[c?"overflowX":"overflowY"]="auto",M.style[c?"overflowY":"overflowX"]="hidden",M.style.top="0px",M.style.left="0px";for(const P in i)M.style[P]=i[P];m.style.position="sticky",m.style.top="0px",m.style.left="0px",m.style.width="100%",m.style.height="100%",m.style.overflow="hidden",M.appendChild(m),_.style.height=c?"100%":`${t*e*100}%`,_.style.width=c?`${t*e*100}%`:"100%",_.style.pointerEvents="none",M.appendChild(_),o?b.prepend(M):b.appendChild(M),M[c?"scrollLeft":"scrollTop"]=1;const C=y.connected||p.domElement;requestAnimationFrame(()=>y.connect==null?void 0:y.connect(M));const L=d().events.compute;return h({compute(P,H){const{left:S,top:F}=b.getBoundingClientRect(),E=P.clientX-S,Y=P.clientY-F;H.pointer.set(E/H.size.width*2-1,-(Y/H.size.height)*2+1),H.raycaster.setFromCamera(H.pointer,H.camera)}}),()=>{b.removeChild(M),h({compute:L}),y.connect==null||y.connect(C)}},[t,e,c,M,_,m,b]),x.useEffect(()=>{if(y.connected===M){const C=v[c?"width":"height"],L=M[c?"scrollWidth":"scrollHeight"],P=L-C;let H=0,S=!0,F=!0;const E=()=>{if(!(!r||F)&&(g(),H=M[c?"scrollLeft":"scrollTop"],k.current=H/P,s)){if(!S){if(H>=P){const N=1-A.offset;M[c?"scrollLeft":"scrollTop"]=1,k.current=A.offset=-N,S=!0}else if(H<=0){const N=1+A.offset;M[c?"scrollLeft":"scrollTop"]=L,k.current=A.offset=N,S=!0}}S&&setTimeout(()=>S=!1,40)}};M.addEventListener("scroll",E,{passive:!0}),requestAnimationFrame(()=>F=!1);const Y=N=>M.scrollLeft+=N.deltaY/2;return c&&M.addEventListener("wheel",Y,{passive:!0}),()=>{M.removeEventListener("scroll",E),c&&M.removeEventListener("wheel",Y)}}},[M,y,v,s,A,g,c,r]);let T=0;return he((C,L)=>{T=A.offset,Vo.damp(A,"offset",k.current,n,L,a,void 0,l),Vo.damp(A,"delta",Math.abs(T-A.offset),n,L,a,void 0,l),A.delta>l&&g()}),x.createElement(Pn.Provider,{value:A},f)}const Ki=x.forwardRef(({children:l},r)=>{const s=x.useRef(null);x.useImperativeHandle(r,()=>s.current,[]);const c=He(),{width:t,height:e}=At(n=>n.viewport);return he(()=>{s.current.position.x=c.horizontal?-t*(c.pages-1)*c.offset:0,s.current.position.y=c.horizontal?0:e*(c.pages-1)*c.offset}),x.createElement("group",{ref:s},l)}),Ji=x.forwardRef(({children:l,style:r,...s},c)=>{const t=He(),e=x.useRef(null);x.useImperativeHandle(c,()=>e.current,[]);const{width:n,height:a}=At(f=>f.size),o=x.useContext(io),i=x.useMemo(()=>Ba(t.fixed),[t.fixed]);return he(()=>{t.delta>t.eps&&(e.current.style.transform=`translate3d(${t.horizontal?-n*(t.pages-1)*t.offset:0}px,${t.horizontal?0:a*(t.pages-1)*-t.offset}px,0)`)}),i.render(x.createElement("div",Ut({ref:e,style:{...r,position:"absolute",top:0,left:0,willChange:"transform"}},s),x.createElement(Pn.Provider,{value:t},x.createElement(io.Provider,{value:o},l)))),null}),$i=x.forwardRef(({html:l,...r},s)=>{const c=l?Ji:Ki;return x.createElement(c,Ut({ref:s},r))}),ya=parseInt(Wa.replace(/\D+/g,"")),xa=ya>=125?"uv1":"uv2",Ho=new Br,jr=new me;class Fn extends da{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const r=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],s=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],c=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(c),this.setAttribute("position",new bn(r,3)),this.setAttribute("uv",new bn(s,2))}applyMatrix4(r){const s=this.attributes.instanceStart,c=this.attributes.instanceEnd;return s!==void 0&&(s.applyMatrix4(r),c.applyMatrix4(r),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(r){let s;r instanceof Float32Array?s=r:Array.isArray(r)&&(s=new Float32Array(r));const c=new Sn(s,6,1);return this.setAttribute("instanceStart",new Bt(c,3,0)),this.setAttribute("instanceEnd",new Bt(c,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(r,s=3){let c;r instanceof Float32Array?c=r:Array.isArray(r)&&(c=new Float32Array(r));const t=new Sn(c,s*2,1);return this.setAttribute("instanceColorStart",new Bt(t,s,0)),this.setAttribute("instanceColorEnd",new Bt(t,s,s)),this}fromWireframeGeometry(r){return this.setPositions(r.attributes.position.array),this}fromEdgesGeometry(r){return this.setPositions(r.attributes.position.array),this}fromMesh(r){return this.fromWireframeGeometry(new Va(r.geometry)),this}fromLineSegments(r){const s=r.geometry;return this.setPositions(s.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Br);const r=this.attributes.instanceStart,s=this.attributes.instanceEnd;r!==void 0&&s!==void 0&&(this.boundingBox.setFromBufferAttribute(r),Ho.setFromBufferAttribute(s),this.boundingBox.union(Ho))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new En),this.boundingBox===null&&this.computeBoundingBox();const r=this.attributes.instanceStart,s=this.attributes.instanceEnd;if(r!==void 0&&s!==void 0){const c=this.boundingSphere.center;this.boundingBox.getCenter(c);let t=0;for(let e=0,n=r.count;e<n;e++)jr.fromBufferAttribute(r,e),t=Math.max(t,c.distanceToSquared(jr)),jr.fromBufferAttribute(s,e),t=Math.max(t,c.distanceToSquared(jr));this.boundingSphere.radius=Math.sqrt(t),isNaN(this.boundingSphere.radius)}}toJSON(){}applyMatrix(r){return this.applyMatrix4(r)}}class wa extends Fn{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(r){const s=r.length-3,c=new Float32Array(2*s);for(let t=0;t<s;t+=3)c[2*t]=r[t],c[2*t+1]=r[t+1],c[2*t+2]=r[t+2],c[2*t+3]=r[t+3],c[2*t+4]=r[t+4],c[2*t+5]=r[t+5];return super.setPositions(c),this}setColors(r,s=3){const c=r.length-s,t=new Float32Array(2*c);if(s===3)for(let e=0;e<c;e+=s)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5];else for(let e=0;e<c;e+=s)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5],t[2*e+6]=r[e+6],t[2*e+7]=r[e+7];return super.setColors(t,s),this}fromLine(r){const s=r.geometry;return this.setPositions(s.attributes.position.array),this}}class In extends ha{constructor(r){super({type:"LineMaterial",uniforms:Mn.clone(Mn.merge([so.common,so.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new gt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${ya>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(s){this.uniforms.diffuse.value=s}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(s){s===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(s){this.uniforms.linewidth.value=s}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(s){!!s!="USE_DASH"in this.defines&&(this.needsUpdate=!0),s===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(s){this.uniforms.dashScale.value=s}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(s){this.uniforms.dashSize.value=s}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(s){this.uniforms.dashOffset.value=s}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(s){this.uniforms.gapSize.value=s}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(s){this.uniforms.opacity.value=s}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(s){this.uniforms.resolution.value.copy(s)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(s){!!s!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),s===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(r)}}const hn=new et,Xo=new me,Yo=new me,Be=new et,Oe=new et,ct=new et,pn=new me,mn=new Gr,We=new Ha,Zo=new me,Ur=new Br,Ar=new En,ft=new et;let dt,Ct;function qo(l,r,s){return ft.set(0,0,-r,1).applyMatrix4(l.projectionMatrix),ft.multiplyScalar(1/ft.w),ft.x=Ct/s.width,ft.y=Ct/s.height,ft.applyMatrix4(l.projectionMatrixInverse),ft.multiplyScalar(1/ft.w),Math.abs(Math.max(ft.x,ft.y))}function es(l,r){const s=l.matrixWorld,c=l.geometry,t=c.attributes.instanceStart,e=c.attributes.instanceEnd,n=Math.min(c.instanceCount,t.count);for(let a=0,o=n;a<o;a++){We.start.fromBufferAttribute(t,a),We.end.fromBufferAttribute(e,a),We.applyMatrix4(s);const i=new me,f=new me;dt.distanceSqToSegment(We.start,We.end,f,i),f.distanceTo(i)<Ct*.5&&r.push({point:f,pointOnLine:i,distance:dt.origin.distanceTo(f),object:l,face:null,faceIndex:a,uv:null,[xa]:null})}}function ts(l,r,s){const c=r.projectionMatrix,e=l.material.resolution,n=l.matrixWorld,a=l.geometry,o=a.attributes.instanceStart,i=a.attributes.instanceEnd,f=Math.min(a.instanceCount,o.count),d=-r.near;dt.at(1,ct),ct.w=1,ct.applyMatrix4(r.matrixWorldInverse),ct.applyMatrix4(c),ct.multiplyScalar(1/ct.w),ct.x*=e.x/2,ct.y*=e.y/2,ct.z=0,pn.copy(ct),mn.multiplyMatrices(r.matrixWorldInverse,n);for(let h=0,p=f;h<p;h++){if(Be.fromBufferAttribute(o,h),Oe.fromBufferAttribute(i,h),Be.w=1,Oe.w=1,Be.applyMatrix4(mn),Oe.applyMatrix4(mn),Be.z>d&&Oe.z>d)continue;if(Be.z>d){const m=Be.z-Oe.z,b=(Be.z-d)/m;Be.lerp(Oe,b)}else if(Oe.z>d){const m=Oe.z-Be.z,b=(Oe.z-d)/m;Oe.lerp(Be,b)}Be.applyMatrix4(c),Oe.applyMatrix4(c),Be.multiplyScalar(1/Be.w),Oe.multiplyScalar(1/Oe.w),Be.x*=e.x/2,Be.y*=e.y/2,Oe.x*=e.x/2,Oe.y*=e.y/2,We.start.copy(Be),We.start.z=0,We.end.copy(Oe),We.end.z=0;const g=We.closestPointToPointParameter(pn,!0);We.at(g,Zo);const y=Ze.lerp(Be.z,Oe.z,g),M=y>=-1&&y<=1,_=pn.distanceTo(Zo)<Ct*.5;if(M&&_){We.start.fromBufferAttribute(o,h),We.end.fromBufferAttribute(i,h),We.start.applyMatrix4(n),We.end.applyMatrix4(n);const m=new me,b=new me;dt.distanceSqToSegment(We.start,We.end,b,m),s.push({point:b,pointOnLine:m,distance:dt.origin.distanceTo(b),object:l,face:null,faceIndex:h,uv:null,[xa]:null})}}}class ba extends Or{constructor(r=new Fn,s=new In({color:Math.random()*16777215})){super(r,s),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const r=this.geometry,s=r.attributes.instanceStart,c=r.attributes.instanceEnd,t=new Float32Array(2*s.count);for(let n=0,a=0,o=s.count;n<o;n++,a+=2)Xo.fromBufferAttribute(s,n),Yo.fromBufferAttribute(c,n),t[a]=a===0?0:t[a-1],t[a+1]=t[a]+Xo.distanceTo(Yo);const e=new Sn(t,2,1);return r.setAttribute("instanceDistanceStart",new Bt(e,1,0)),r.setAttribute("instanceDistanceEnd",new Bt(e,1,1)),this}raycast(r,s){const c=this.material.worldUnits,t=r.camera,e=r.params.Line2!==void 0&&r.params.Line2.threshold||0;dt=r.ray;const n=this.matrixWorld,a=this.geometry,o=this.material;Ct=o.linewidth+e,a.boundingSphere===null&&a.computeBoundingSphere(),Ar.copy(a.boundingSphere).applyMatrix4(n);let i;if(c)i=Ct*.5;else{const d=Math.max(t.near,Ar.distanceToPoint(dt.origin));i=qo(t,d,o.resolution)}if(Ar.radius+=i,dt.intersectsSphere(Ar)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Ur.copy(a.boundingBox).applyMatrix4(n);let f;if(c)f=Ct*.5;else{const d=Math.max(t.near,Ur.distanceToPoint(dt.origin));f=qo(t,d,o.resolution)}Ur.expandByScalar(f),dt.intersectsBox(Ur)!==!1&&(c?es(this,s):ts(this,t,s))}onBeforeRender(r){const s=this.material.uniforms;s&&s.resolution&&(r.getViewport(hn),this.material.uniforms.resolution.value.set(hn.z,hn.w))}}class rs extends ba{constructor(r=new wa,s=new In({color:Math.random()*16777215})){super(r,s),this.isLine2=!0,this.type="Line2"}}const Sa=x.forwardRef(function({children:r,follow:s=!0,lockX:c=!1,lockY:t=!1,lockZ:e=!1,...n},a){const o=x.useRef(null),i=x.useRef(null),f=new Et;return he(({camera:d})=>{if(!s||!i.current)return;const h=i.current.rotation.clone();i.current.updateMatrix(),i.current.updateWorldMatrix(!1,!1),i.current.getWorldQuaternion(f),d.getWorldQuaternion(o.current.quaternion).premultiply(f.invert()),c&&(i.current.rotation.x=h.x),t&&(i.current.rotation.y=h.y),e&&(i.current.rotation.z=h.z)}),x.useImperativeHandle(a,()=>i.current,[]),x.createElement("group",Ut({ref:i},n),x.createElement("group",{ref:o},r))}),ns=x.forwardRef(function({points:r,color:s=16777215,vertexColors:c,linewidth:t,lineWidth:e,segments:n,dashed:a,...o},i){var f,d;const h=At(M=>M.size),p=x.useMemo(()=>n?new ba:new rs,[n]),[v]=x.useState(()=>new In),g=(c==null||(f=c[0])==null?void 0:f.length)===4?4:3,y=x.useMemo(()=>{const M=n?new Fn:new wa,_=r.map(m=>{const b=Array.isArray(m);return m instanceof me||m instanceof et?[m.x,m.y,m.z]:m instanceof gt?[m.x,m.y,0]:b&&m.length===3?[m[0],m[1],m[2]]:b&&m.length===2?[m[0],m[1],0]:m});if(M.setPositions(_.flat()),c){s=16777215;const m=c.map(b=>b instanceof je?b.toArray():b);M.setColors(m.flat(),g)}return M},[r,n,c,g]);return x.useLayoutEffect(()=>{p.computeLineDistances()},[r,p]),x.useLayoutEffect(()=>{a?v.defines.USE_DASH="":delete v.defines.USE_DASH,v.needsUpdate=!0},[a,v]),x.useEffect(()=>()=>{y.dispose(),v.dispose()},[y]),x.createElement("primitive",Ut({object:p,ref:i},o),x.createElement("primitive",{object:y,attach:"geometry"}),x.createElement("primitive",Ut({object:v,attach:"material",color:s,vertexColors:!!c,resolution:[h.width,h.height],linewidth:(d=t??e)!==null&&d!==void 0?d:1,dashed:a,transparent:g===4},o)))});function os(){var l=Object.create(null);function r(t,e){var n=t.id,a=t.name,o=t.dependencies;o===void 0&&(o=[]);var i=t.init;i===void 0&&(i=function(){});var f=t.getTransferables;if(f===void 0&&(f=null),!l[n])try{o=o.map(function(h){return h&&h.isWorkerModule&&(r(h,function(p){if(p instanceof Error)throw p}),h=l[h.id].value),h}),i=c("<"+a+">.init",i),f&&(f=c("<"+a+">.getTransferables",f));var d=null;typeof i=="function"&&(d=i.apply(void 0,o)),l[n]={id:n,value:d,getTransferables:f},e(d)}catch(h){h&&h.noLog,e(h)}}function s(t,e){var n,a=t.id,o=t.args;(!l[a]||typeof l[a].value!="function")&&e(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var i=(n=l[a]).value.apply(n,o);i&&typeof i.then=="function"?i.then(f,function(d){return e(d instanceof Error?d:new Error(""+d))}):f(i)}catch(d){e(d)}function f(d){try{var h=l[a].getTransferables&&l[a].getTransferables(d);(!h||!Array.isArray(h)||!h.length)&&(h=void 0),e(d,h)}catch(p){e(p)}}}function c(t,e){var n=void 0;self.troikaDefine=function(o){return n=o};var a=URL.createObjectURL(new Blob(["/** "+t.replace(/\*/g,"")+` **/

troikaDefine(
`+e+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch{}return URL.revokeObjectURL(a),delete self.troikaDefine,n}self.addEventListener("message",function(t){var e=t.data,n=e.messageId,a=e.action,o=e.data;try{a==="registerModule"&&r(o,function(i){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:{isCallable:typeof i=="function"}})}),a==="callModule"&&s(o,function(i,f){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:i},f||void 0)})}catch(i){postMessage({messageId:n,success:!1,error:i.stack})}})}function as(l){var r=function(){for(var s=[],c=arguments.length;c--;)s[c]=arguments[c];return r._getInitResult().then(function(t){if(typeof t=="function")return t.apply(void 0,s);throw new Error("Worker module function was called but `init` did not return a callable function")})};return r._getInitResult=function(){var s=l.dependencies,c=l.init;s=Array.isArray(s)?s.map(function(e){return e&&e._getInitResult?e._getInitResult():e}):[];var t=Promise.all(s).then(function(e){return c.apply(null,e)});return r._getInitResult=function(){return t},t},r}var Ma=function(){var l=!1;if(typeof window<"u"&&typeof window.document<"u")try{var r=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));r.terminate(),l=!0}catch{}return Ma=function(){return l},l},is=0,ss=0,vn=!1,dr=Object.create(null),hr=Object.create(null),kn=Object.create(null);function Ht(l){if((!l||typeof l.init!="function")&&!vn)throw new Error("requires `options.init` function");var r=l.dependencies,s=l.init,c=l.getTransferables,t=l.workerId;if(!Ma())return as(l);t==null&&(t="#default");var e="workerModule"+ ++is,n=l.name||e,a=null;r=r&&r.map(function(i){return typeof i=="function"&&!i.workerModuleData&&(vn=!0,i=Ht({workerId:t,name:"<"+n+"> function dependency: "+i.name,init:`function(){return (
`+Pr(i)+`
)}`}),vn=!1),i&&i.workerModuleData&&(i=i.workerModuleData),i});function o(){for(var i=[],f=arguments.length;f--;)i[f]=arguments[f];if(!a){a=Qo(t,"registerModule",o.workerModuleData);var d=function(){a=null,hr[t].delete(d)};(hr[t]||(hr[t]=new Set)).add(d)}return a.then(function(h){var p=h.isCallable;if(p)return Qo(t,"callModule",{id:e,args:i});throw new Error("Worker module function was called but `init` did not return a callable function")})}return o.workerModuleData={isWorkerModule:!0,id:e,name:n,dependencies:r,init:Pr(s),getTransferables:c&&Pr(c)},o}function ls(l){hr[l]&&hr[l].forEach(function(r){r()}),dr[l]&&(dr[l].terminate(),delete dr[l])}function Pr(l){var r=l.toString();return!/^function/.test(r)&&/^\w+\s*\(/.test(r)&&(r="function "+r),r}function cs(l){var r=dr[l];if(!r){var s=Pr(os);r=dr[l]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+l.replace(/\*/g,"")+` **/

;(`+s+")()"],{type:"application/javascript"}))),r.onmessage=function(c){var t=c.data,e=t.messageId,n=kn[e];if(!n)throw new Error("WorkerModule response with empty or unknown messageId");delete kn[e],n(t)}}return r}function Qo(l,r,s){return new Promise(function(c,t){var e=++ss;kn[e]=function(n){n.success?c(n.result):t(new Error("Error in worker "+r+" call: "+n.error))},cs(l).postMessage({messageId:e,action:r,data:s})})}function _a(){var l=function(r){function s(O,z,w,j,U,I,R,W){var D=1-R;W.x=D*D*O+2*D*R*w+R*R*U,W.y=D*D*z+2*D*R*j+R*R*I}function c(O,z,w,j,U,I,R,W,D,B){var Q=1-D;B.x=Q*Q*Q*O+3*Q*Q*D*w+3*Q*D*D*U+D*D*D*R,B.y=Q*Q*Q*z+3*Q*Q*D*j+3*Q*D*D*I+D*D*D*W}function t(O,z){for(var w=/([MLQCZ])([^MLQCZ]*)/g,j,U,I,R,W;j=w.exec(O);){var D=j[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(B){return parseFloat(B)});switch(j[1]){case"M":R=U=D[0],W=I=D[1];break;case"L":(D[0]!==R||D[1]!==W)&&z("L",R,W,R=D[0],W=D[1]);break;case"Q":{z("Q",R,W,R=D[2],W=D[3],D[0],D[1]);break}case"C":{z("C",R,W,R=D[4],W=D[5],D[0],D[1],D[2],D[3]);break}case"Z":(R!==U||W!==I)&&z("L",R,W,U,I);break}}}function e(O,z,w){w===void 0&&(w=16);var j={x:0,y:0};t(O,function(U,I,R,W,D,B,Q,te,Z){switch(U){case"L":z(I,R,W,D);break;case"Q":{for(var V=I,xe=R,de=1;de<w;de++)s(I,R,B,Q,W,D,de/(w-1),j),z(V,xe,j.x,j.y),V=j.x,xe=j.y;break}case"C":{for(var $=I,re=R,ce=1;ce<w;ce++)c(I,R,B,Q,te,Z,W,D,ce/(w-1),j),z($,re,j.x,j.y),$=j.x,re=j.y;break}}})}var n="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",o=new WeakMap,i={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function f(O,z){var w=O.getContext?O.getContext("webgl",i):O,j=o.get(w);if(!j){let Q=function($){var re=I[$];if(!re&&(re=I[$]=w.getExtension($),!re))throw new Error($+" not supported");return re},te=function($,re){var ce=w.createShader(re);return w.shaderSource(ce,$),w.compileShader(ce),ce},Z=function($,re,ce,X){if(!R[$]){var ne={},ee={},G=w.createProgram();w.attachShader(G,te(re,w.VERTEX_SHADER)),w.attachShader(G,te(ce,w.FRAGMENT_SHADER)),w.linkProgram(G),R[$]={program:G,transaction:function(J){w.useProgram(G),J({setUniform:function(q,Me){for(var oe=[],se=arguments.length-2;se-- >0;)oe[se]=arguments[se+2];var ue=ee[Me]||(ee[Me]=w.getUniformLocation(G,Me));w["uniform"+q].apply(w,[ue].concat(oe))},setAttribute:function(q,Me,oe,se,ue){var ge=ne[q];ge||(ge=ne[q]={buf:w.createBuffer(),loc:w.getAttribLocation(G,q),data:null}),w.bindBuffer(w.ARRAY_BUFFER,ge.buf),w.vertexAttribPointer(ge.loc,Me,w.FLOAT,!1,0,0),w.enableVertexAttribArray(ge.loc),U?w.vertexAttribDivisor(ge.loc,se):Q("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(ge.loc,se),ue!==ge.data&&(w.bufferData(w.ARRAY_BUFFER,ue,oe),ge.data=ue)}})}}}R[$].transaction(X)},V=function($,re){D++;try{w.activeTexture(w.TEXTURE0+D);var ce=W[$];ce||(ce=W[$]=w.createTexture(),w.bindTexture(w.TEXTURE_2D,ce),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MIN_FILTER,w.NEAREST),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MAG_FILTER,w.NEAREST)),w.bindTexture(w.TEXTURE_2D,ce),re(ce,D)}finally{D--}},xe=function($,re,ce){var X=w.createFramebuffer();B.push(X),w.bindFramebuffer(w.FRAMEBUFFER,X),w.activeTexture(w.TEXTURE0+re),w.bindTexture(w.TEXTURE_2D,$),w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,$,0);try{ce(X)}finally{w.deleteFramebuffer(X),w.bindFramebuffer(w.FRAMEBUFFER,B[--B.length-1]||null)}},de=function(){I={},R={},W={},D=-1,B.length=0};var U=typeof WebGL2RenderingContext<"u"&&w instanceof WebGL2RenderingContext,I={},R={},W={},D=-1,B=[];w.canvas.addEventListener("webglcontextlost",function($){de(),$.preventDefault()},!1),o.set(w,j={gl:w,isWebGL2:U,getExtension:Q,withProgram:Z,withTexture:V,withTextureFramebuffer:xe,handleContextLoss:de})}z(j)}function d(O,z,w,j,U,I,R,W){R===void 0&&(R=15),W===void 0&&(W=null),f(O,function(D){var B=D.gl,Q=D.withProgram,te=D.withTexture;te("copy",function(Z,V){B.texImage2D(B.TEXTURE_2D,0,B.RGBA,U,I,0,B.RGBA,B.UNSIGNED_BYTE,z),Q("copy",n,a,function(xe){var de=xe.setUniform,$=xe.setAttribute;$("aUV",2,B.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),de("1i","image",V),B.bindFramebuffer(B.FRAMEBUFFER,W||null),B.disable(B.BLEND),B.colorMask(R&8,R&4,R&2,R&1),B.viewport(w,j,U,I),B.scissor(w,j,U,I),B.drawArrays(B.TRIANGLES,0,3)})})})}function h(O,z,w){var j=O.width,U=O.height;f(O,function(I){var R=I.gl,W=new Uint8Array(j*U*4);R.readPixels(0,0,j,U,R.RGBA,R.UNSIGNED_BYTE,W),O.width=z,O.height=w,d(R,W,0,0,j,U)})}var p=Object.freeze({__proto__:null,withWebGLContext:f,renderImageData:d,resizeWebGLCanvasWithoutClearing:h});function v(O,z,w,j,U,I){I===void 0&&(I=1);var R=new Uint8Array(O*z),W=j[2]-j[0],D=j[3]-j[1],B=[];e(w,function($,re,ce,X){B.push({x1:$,y1:re,x2:ce,y2:X,minX:Math.min($,ce),minY:Math.min(re,X),maxX:Math.max($,ce),maxY:Math.max(re,X)})}),B.sort(function($,re){return $.maxX-re.maxX});for(var Q=0;Q<O;Q++)for(var te=0;te<z;te++){var Z=xe(j[0]+W*(Q+.5)/O,j[1]+D*(te+.5)/z),V=Math.pow(1-Math.abs(Z)/U,I)/2;Z<0&&(V=1-V),V=Math.max(0,Math.min(255,Math.round(V*255))),R[te*O+Q]=V}return R;function xe($,re){for(var ce=1/0,X=1/0,ne=B.length;ne--;){var ee=B[ne];if(ee.maxX+X<=$)break;if($+X>ee.minX&&re-X<ee.maxY&&re+X>ee.minY){var G=M($,re,ee.x1,ee.y1,ee.x2,ee.y2);G<ce&&(ce=G,X=Math.sqrt(ce))}}return de($,re)&&(X=-X),X}function de($,re){for(var ce=0,X=B.length;X--;){var ne=B[X];if(ne.maxX<=$)break;var ee=ne.y1>re!=ne.y2>re&&$<(ne.x2-ne.x1)*(re-ne.y1)/(ne.y2-ne.y1)+ne.x1;ee&&(ce+=ne.y1<ne.y2?1:-1)}return ce!==0}}function g(O,z,w,j,U,I,R,W,D,B){I===void 0&&(I=1),W===void 0&&(W=0),D===void 0&&(D=0),B===void 0&&(B=0),y(O,z,w,j,U,I,R,null,W,D,B)}function y(O,z,w,j,U,I,R,W,D,B,Q){I===void 0&&(I=1),D===void 0&&(D=0),B===void 0&&(B=0),Q===void 0&&(Q=0);for(var te=v(O,z,w,j,U,I),Z=new Uint8Array(te.length*4),V=0;V<te.length;V++)Z[V*4+Q]=te[V];d(R,Z,D,B,O,z,1<<3-Q,W)}function M(O,z,w,j,U,I){var R=U-w,W=I-j,D=R*R+W*W,B=D?Math.max(0,Math.min(1,((O-w)*R+(z-j)*W)/D)):0,Q=O-(w+B*R),te=z-(j+B*W);return Q*Q+te*te}var _=Object.freeze({__proto__:null,generate:v,generateIntoCanvas:g,generateIntoFramebuffer:y}),m="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",b="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",k="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",A=new Float32Array([0,0,2,0,0,2]),T=null,C=!1,L={},P=new WeakMap;function H(O){if(!C&&!Y(O))throw new Error("WebGL generation not supported")}function S(O,z,w,j,U,I,R){if(I===void 0&&(I=1),R===void 0&&(R=null),!R&&(R=T,!R)){var W=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!W)throw new Error("OffscreenCanvas or DOM canvas not supported");R=T=W.getContext("webgl",{depth:!1})}H(R);var D=new Uint8Array(O*z*4);f(R,function(Z){var V=Z.gl,xe=Z.withTexture,de=Z.withTextureFramebuffer;xe("readable",function($,re){V.texImage2D(V.TEXTURE_2D,0,V.RGBA,O,z,0,V.RGBA,V.UNSIGNED_BYTE,null),de($,re,function(ce){E(O,z,w,j,U,I,V,ce,0,0,0),V.readPixels(0,0,O,z,V.RGBA,V.UNSIGNED_BYTE,D)})})});for(var B=new Uint8Array(O*z),Q=0,te=0;Q<D.length;Q+=4)B[te++]=D[Q];return B}function F(O,z,w,j,U,I,R,W,D,B){I===void 0&&(I=1),W===void 0&&(W=0),D===void 0&&(D=0),B===void 0&&(B=0),E(O,z,w,j,U,I,R,null,W,D,B)}function E(O,z,w,j,U,I,R,W,D,B,Q){I===void 0&&(I=1),D===void 0&&(D=0),B===void 0&&(B=0),Q===void 0&&(Q=0),H(R);var te=[];e(w,function(Z,V,xe,de){te.push(Z,V,xe,de)}),te=new Float32Array(te),f(R,function(Z){var V=Z.gl,xe=Z.isWebGL2,de=Z.getExtension,$=Z.withProgram,re=Z.withTexture,ce=Z.withTextureFramebuffer,X=Z.handleContextLoss;if(re("rawDistances",function(ne,ee){(O!==ne._lastWidth||z!==ne._lastHeight)&&V.texImage2D(V.TEXTURE_2D,0,V.RGBA,ne._lastWidth=O,ne._lastHeight=z,0,V.RGBA,V.UNSIGNED_BYTE,null),$("main",m,b,function(G){var ve=G.setAttribute,J=G.setUniform,ie=!xe&&de("ANGLE_instanced_arrays"),q=!xe&&de("EXT_blend_minmax");ve("aUV",2,V.STATIC_DRAW,0,A),ve("aLineSegment",4,V.DYNAMIC_DRAW,1,te),J.apply(void 0,["4f","uGlyphBounds"].concat(j)),J("1f","uMaxDistance",U),J("1f","uExponent",I),ce(ne,ee,function(Me){V.enable(V.BLEND),V.colorMask(!0,!0,!0,!0),V.viewport(0,0,O,z),V.scissor(0,0,O,z),V.blendFunc(V.ONE,V.ONE),V.blendEquationSeparate(V.FUNC_ADD,xe?V.MAX:q.MAX_EXT),V.clear(V.COLOR_BUFFER_BIT),xe?V.drawArraysInstanced(V.TRIANGLES,0,3,te.length/4):ie.drawArraysInstancedANGLE(V.TRIANGLES,0,3,te.length/4)})}),$("post",n,k,function(G){G.setAttribute("aUV",2,V.STATIC_DRAW,0,A),G.setUniform("1i","tex",ee),V.bindFramebuffer(V.FRAMEBUFFER,W),V.disable(V.BLEND),V.colorMask(Q===0,Q===1,Q===2,Q===3),V.viewport(D,B,O,z),V.scissor(D,B,O,z),V.drawArrays(V.TRIANGLES,0,3)})}),V.isContextLost())throw X(),new Error("webgl context lost")})}function Y(O){var z=!O||O===T?L:O.canvas||O,w=P.get(z);if(w===void 0){C=!0;var j=null;try{var U=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],I=S(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,O);w=I&&U.length===I.length&&I.every(function(R,W){return R===U[W]}),w||(j="bad trial run results")}catch(R){w=!1,j=R.message}C=!1,P.set(z,w)}return w}var N=Object.freeze({__proto__:null,generate:S,generateIntoCanvas:F,generateIntoFramebuffer:E,isSupported:Y});function K(O,z,w,j,U,I){U===void 0&&(U=Math.max(j[2]-j[0],j[3]-j[1])/2),I===void 0&&(I=1);try{return S.apply(N,arguments)}catch{return v.apply(_,arguments)}}function ae(O,z,w,j,U,I,R,W,D,B){U===void 0&&(U=Math.max(j[2]-j[0],j[3]-j[1])/2),I===void 0&&(I=1),W===void 0&&(W=0),D===void 0&&(D=0),B===void 0&&(B=0);try{return F.apply(N,arguments)}catch{return g.apply(_,arguments)}}return r.forEachPathCommand=t,r.generate=K,r.generateIntoCanvas=ae,r.javascript=_,r.pathToLineSegments=e,r.webgl=N,r.webglUtils=p,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return l}function fs(){var l=function(r){var s={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},c={},t={};c.L=1,t[1]="L",Object.keys(s).forEach(function(X,ne){c[X]=1<<ne+1,t[c[X]]=X}),Object.freeze(c);var e=c.LRI|c.RLI|c.FSI,n=c.L|c.R|c.AL,a=c.B|c.S|c.WS|c.ON|c.FSI|c.LRI|c.RLI|c.PDI,o=c.BN|c.RLE|c.LRE|c.RLO|c.LRO|c.PDF,i=c.S|c.WS|c.B|e|c.PDI|o,f=null;function d(){if(!f){f=new Map;var X=function(ee){if(s.hasOwnProperty(ee)){var G=0;s[ee].split(",").forEach(function(ve){var J=ve.split("+"),ie=J[0],q=J[1];ie=parseInt(ie,36),q=q?parseInt(q,36):0,f.set(G+=ie,c[ee]);for(var Me=0;Me<q;Me++)f.set(++G,c[ee])})}};for(var ne in s)X(ne)}}function h(X){return d(),f.get(X.codePointAt(0))||c.L}function p(X){return t[h(X)]}var v={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function g(X,ne){var ee=36,G=0,ve=new Map,J=ne&&new Map,ie;return X.split(",").forEach(function q(Me){if(Me.indexOf("+")!==-1)for(var oe=+Me;oe--;)q(ie);else{ie=Me;var se=Me.split(">"),ue=se[0],ge=se[1];ue=String.fromCodePoint(G+=parseInt(ue,ee)),ge=String.fromCodePoint(G+=parseInt(ge,ee)),ve.set(ue,ge),ne&&J.set(ge,ue)}}),{map:ve,reverseMap:J}}var y,M,_;function m(){if(!y){var X=g(v.pairs,!0),ne=X.map,ee=X.reverseMap;y=ne,M=ee,_=g(v.canonical,!1).map}}function b(X){return m(),y.get(X)||null}function k(X){return m(),M.get(X)||null}function A(X){return m(),_.get(X)||null}var T=c.L,C=c.R,L=c.EN,P=c.ES,H=c.ET,S=c.AN,F=c.CS,E=c.B,Y=c.S,N=c.ON,K=c.BN,ae=c.NSM,O=c.AL,z=c.LRO,w=c.RLO,j=c.LRE,U=c.RLE,I=c.PDF,R=c.LRI,W=c.RLI,D=c.FSI,B=c.PDI;function Q(X,ne){for(var ee=125,G=new Uint32Array(X.length),ve=0;ve<X.length;ve++)G[ve]=h(X[ve]);var J=new Map;function ie(Qe,ot){var Ke=G[Qe];G[Qe]=ot,J.set(Ke,J.get(Ke)-1),Ke&a&&J.set(a,J.get(a)-1),J.set(ot,(J.get(ot)||0)+1),ot&a&&J.set(a,(J.get(a)||0)+1)}for(var q=new Uint8Array(X.length),Me=new Map,oe=[],se=null,ue=0;ue<X.length;ue++)se||oe.push(se={start:ue,end:X.length-1,level:ne==="rtl"?1:ne==="ltr"?0:oo(ue,!1)}),G[ue]&E&&(se.end=ue,se=null);for(var ge=U|j|w|z|e|B|I|E,ke=function(Qe){return Qe+(Qe&1?1:2)},Ee=function(Qe){return Qe+(Qe&1?2:1)},we=0;we<oe.length;we++){se=oe[we];var be=[{_level:se.level,_override:0,_isolate:0}],fe=void 0,Le=0,Ue=0,qe=0;J.clear();for(var Ce=se.start;Ce<=se.end;Ce++){var pe=G[Ce];if(fe=be[be.length-1],J.set(pe,(J.get(pe)||0)+1),pe&a&&J.set(a,(J.get(a)||0)+1),pe&ge)if(pe&(U|j)){q[Ce]=fe._level;var _e=(pe===U?Ee:ke)(fe._level);_e<=ee&&!Le&&!Ue?be.push({_level:_e,_override:0,_isolate:0}):Le||Ue++}else if(pe&(w|z)){q[Ce]=fe._level;var yt=(pe===w?Ee:ke)(fe._level);yt<=ee&&!Le&&!Ue?be.push({_level:yt,_override:pe&w?C:T,_isolate:0}):Le||Ue++}else if(pe&e){pe&D&&(pe=oo(Ce+1,!0)===1?W:R),q[Ce]=fe._level,fe._override&&ie(Ce,fe._override);var Te=(pe===W?Ee:ke)(fe._level);Te<=ee&&Le===0&&Ue===0?(qe++,be.push({_level:Te,_override:0,_isolate:1,_isolInitIndex:Ce})):Le++}else if(pe&B){if(Le>0)Le--;else if(qe>0){for(Ue=0;!be[be.length-1]._isolate;)be.pop();var Se=be[be.length-1]._isolInitIndex;Se!=null&&(Me.set(Se,Ce),Me.set(Ce,Se)),be.pop(),qe--}fe=be[be.length-1],q[Ce]=fe._level,fe._override&&ie(Ce,fe._override)}else pe&I?(Le===0&&(Ue>0?Ue--:!fe._isolate&&be.length>1&&(be.pop(),fe=be[be.length-1])),q[Ce]=fe._level):pe&E&&(q[Ce]=se.level);else q[Ce]=fe._level,fe._override&&pe!==K&&ie(Ce,fe._override)}for(var Fe=[],Ae=null,ye=se.start;ye<=se.end;ye++){var Re=G[ye];if(!(Re&o)){var Xe=q[ye],Ve=Re&e,ze=Re===B;Ae&&Xe===Ae._level?(Ae._end=ye,Ae._endsWithIsolInit=Ve):Fe.push(Ae={_start:ye,_end:ye,_level:Xe,_startsWithPDI:ze,_endsWithIsolInit:Ve})}}for(var rt=[],xt=0;xt<Fe.length;xt++){var pt=Fe[xt];if(!pt._startsWithPDI||pt._startsWithPDI&&!Me.has(pt._start)){for(var wt=[Ae=pt],Mt=void 0;Ae&&Ae._endsWithIsolInit&&(Mt=Me.get(Ae._end))!=null;)for(var mt=xt+1;mt<Fe.length;mt++)if(Fe[mt]._start===Mt){wt.push(Ae=Fe[mt]);break}for(var Ye=[],_t=0;_t<wt.length;_t++)for(var zn=wt[_t],Hr=zn._start;Hr<=zn._end;Hr++)Ye.push(Hr);for(var Pa=q[Ye[0]],Gn=se.level,pr=Ye[0]-1;pr>=0;pr--)if(!(G[pr]&o)){Gn=q[pr];break}var Xr=Ye[Ye.length-1],Fa=q[Xr],Bn=se.level;if(!(G[Xr]&e)){for(var mr=Xr+1;mr<=se.end;mr++)if(!(G[mr]&o)){Bn=q[mr];break}}rt.push({_seqIndices:Ye,_sosType:Math.max(Gn,Pa)%2?C:T,_eosType:Math.max(Bn,Fa)%2?C:T})}}for(var Yr=0;Yr<rt.length;Yr++){var Zr=rt[Yr],le=Zr._seqIndices,Xt=Zr._sosType,Ia=Zr._eosType,Lt=q[le[0]]&1?C:T;if(J.get(ae))for(var vr=0;vr<le.length;vr++){var On=le[vr];if(G[On]&ae){for(var qr=Xt,gr=vr-1;gr>=0;gr--)if(!(G[le[gr]]&o)){qr=G[le[gr]];break}ie(On,qr&(e|B)?N:qr)}}if(J.get(L))for(var yr=0;yr<le.length;yr++){var Nn=le[yr];if(G[Nn]&L)for(var xr=yr-1;xr>=-1;xr--){var Wn=xr===-1?Xt:G[le[xr]];if(Wn&n){Wn===O&&ie(Nn,S);break}}}if(J.get(O))for(var Qr=0;Qr<le.length;Qr++){var Vn=le[Qr];G[Vn]&O&&ie(Vn,C)}if(J.get(P)||J.get(F))for(var Yt=1;Yt<le.length-1;Yt++){var Kr=le[Yt];if(G[Kr]&(P|F)){for(var Pt=0,Jr=0,$r=Yt-1;$r>=0&&(Pt=G[le[$r]],!!(Pt&o));$r--);for(var en=Yt+1;en<le.length&&(Jr=G[le[en]],!!(Jr&o));en++);Pt===Jr&&(G[Kr]===P?Pt===L:Pt&(L|S))&&ie(Kr,Pt)}}if(J.get(L))for(var lt=0;lt<le.length;lt++){var Da=le[lt];if(G[Da]&L){for(var wr=lt-1;wr>=0&&G[le[wr]]&(H|o);wr--)ie(le[wr],L);for(lt++;lt<le.length&&G[le[lt]]&(H|o|L);lt++)G[le[lt]]!==L&&ie(le[lt],L)}}if(J.get(H)||J.get(P)||J.get(F))for(var Zt=0;Zt<le.length;Zt++){var Hn=le[Zt];if(G[Hn]&(H|P|F)){ie(Hn,N);for(var br=Zt-1;br>=0&&G[le[br]]&o;br--)ie(le[br],N);for(var Sr=Zt+1;Sr<le.length&&G[le[Sr]]&o;Sr++)ie(le[Sr],N)}}if(J.get(L))for(var tn=0,Xn=Xt;tn<le.length;tn++){var Yn=le[tn],rn=G[Yn];rn&L?Xn===T&&ie(Yn,T):rn&n&&(Xn=rn)}if(J.get(a)){var qt=C|L|S,Zn=qt|T,Mr=[];{for(var Ft=[],It=0;It<le.length;It++)if(G[le[It]]&a){var Qt=X[le[It]],qn=void 0;if(b(Qt)!==null)if(Ft.length<63)Ft.push({char:Qt,seqIndex:It});else break;else if((qn=k(Qt))!==null)for(var Kt=Ft.length-1;Kt>=0;Kt--){var nn=Ft[Kt].char;if(nn===qn||nn===k(A(Qt))||b(A(nn))===Qt){Mr.push([Ft[Kt].seqIndex,It]),Ft.length=Kt;break}}}Mr.sort(function(Qe,ot){return Qe[0]-ot[0]})}for(var on=0;on<Mr.length;on++){for(var Qn=Mr[on],_r=Qn[0],an=Qn[1],Kn=!1,nt=0,sn=_r+1;sn<an;sn++){var Jn=le[sn];if(G[Jn]&Zn){Kn=!0;var $n=G[Jn]&qt?C:T;if($n===Lt){nt=$n;break}}}if(Kn&&!nt){nt=Xt;for(var ln=_r-1;ln>=0;ln--){var eo=le[ln];if(G[eo]&Zn){var to=G[eo]&qt?C:T;to!==Lt?nt=to:nt=Lt;break}}}if(nt){if(G[le[_r]]=G[le[an]]=nt,nt!==Lt){for(var Jt=_r+1;Jt<le.length;Jt++)if(!(G[le[Jt]]&o)){h(X[le[Jt]])&ae&&(G[le[Jt]]=nt);break}}if(nt!==Lt){for(var $t=an+1;$t<le.length;$t++)if(!(G[le[$t]]&o)){h(X[le[$t]])&ae&&(G[le[$t]]=nt);break}}}}for(var bt=0;bt<le.length;bt++)if(G[le[bt]]&a){for(var ro=bt,cn=bt,fn=Xt,er=bt-1;er>=0;er--)if(G[le[er]]&o)ro=er;else{fn=G[le[er]]&qt?C:T;break}for(var no=Ia,tr=bt+1;tr<le.length;tr++)if(G[le[tr]]&(a|o))cn=tr;else{no=G[le[tr]]&qt?C:T;break}for(var un=ro;un<=cn;un++)G[le[un]]=fn===no?fn:Lt;bt=cn}}}for(var Je=se.start;Je<=se.end;Je++){var za=q[Je],Tr=G[Je];if(za&1?Tr&(T|L|S)&&q[Je]++:Tr&C?q[Je]++:Tr&(S|L)&&(q[Je]+=2),Tr&o&&(q[Je]=Je===0?se.level:q[Je-1]),Je===se.end||h(X[Je])&(Y|E))for(var kr=Je;kr>=0&&h(X[kr])&i;kr--)q[kr]=se.level}}return{levels:q,paragraphs:oe};function oo(Qe,ot){for(var Ke=Qe;Ke<X.length;Ke++){var St=G[Ke];if(St&(C|O))return 1;if(St&(E|T)||ot&&St===B)return 0;if(St&e){var ao=Ga(Ke);Ke=ao===-1?X.length:ao}}return 0}function Ga(Qe){for(var ot=1,Ke=Qe+1;Ke<X.length;Ke++){var St=G[Ke];if(St&E)break;if(St&B){if(--ot===0)return Ke}else St&e&&ot++}return-1}}var te="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",Z;function V(){if(!Z){var X=g(te,!0),ne=X.map,ee=X.reverseMap;ee.forEach(function(G,ve){ne.set(ve,G)}),Z=ne}}function xe(X){return V(),Z.get(X)||null}function de(X,ne,ee,G){var ve=X.length;ee=Math.max(0,ee==null?0:+ee),G=Math.min(ve-1,G==null?ve-1:+G);for(var J=new Map,ie=ee;ie<=G;ie++)if(ne[ie]&1){var q=xe(X[ie]);q!==null&&J.set(ie,q)}return J}function $(X,ne,ee,G){var ve=X.length;ee=Math.max(0,ee==null?0:+ee),G=Math.min(ve-1,G==null?ve-1:+G);var J=[];return ne.paragraphs.forEach(function(ie){var q=Math.max(ee,ie.start),Me=Math.min(G,ie.end);if(q<Me){for(var oe=ne.levels.slice(q,Me+1),se=Me;se>=q&&h(X[se])&i;se--)oe[se]=ie.level;for(var ue=ie.level,ge=1/0,ke=0;ke<oe.length;ke++){var Ee=oe[ke];Ee>ue&&(ue=Ee),Ee<ge&&(ge=Ee|1)}for(var we=ue;we>=ge;we--)for(var be=0;be<oe.length;be++)if(oe[be]>=we){for(var fe=be;be+1<oe.length&&oe[be+1]>=we;)be++;be>fe&&J.push([fe+q,be+q])}}}),J}function re(X,ne,ee,G){var ve=ce(X,ne,ee,G),J=[].concat(X);return ve.forEach(function(ie,q){J[q]=(ne.levels[ie]&1?xe(X[ie]):null)||X[ie]}),J.join("")}function ce(X,ne,ee,G){for(var ve=$(X,ne,ee,G),J=[],ie=0;ie<X.length;ie++)J[ie]=ie;return ve.forEach(function(q){for(var Me=q[0],oe=q[1],se=J.slice(Me,oe+1),ue=se.length;ue--;)J[oe-ue]=se[ue]}),J}return r.closingToOpeningBracket=k,r.getBidiCharType=h,r.getBidiCharTypeName=p,r.getCanonicalBracket=A,r.getEmbeddingLevels=Q,r.getMirroredCharacter=xe,r.getMirroredCharactersMap=de,r.getReorderSegments=$,r.getReorderedIndices=ce,r.getReorderedString=re,r.openingToClosingBracket=b,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return l}const Ta=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Cn(l){const r=/^[ \t]*#include +<([\w\d./]+)>/gm;function s(c,t){let e=qa[t];return e?Cn(e):c}return l.replace(r,s)}const Ne=[];for(let l=0;l<256;l++)Ne[l]=(l<16?"0":"")+l.toString(16);function us(){const l=Math.random()*4294967295|0,r=Math.random()*4294967295|0,s=Math.random()*4294967295|0,c=Math.random()*4294967295|0;return(Ne[l&255]+Ne[l>>8&255]+Ne[l>>16&255]+Ne[l>>24&255]+"-"+Ne[r&255]+Ne[r>>8&255]+"-"+Ne[r>>16&15|64]+Ne[r>>24&255]+"-"+Ne[s&63|128]+Ne[s>>8&255]+"-"+Ne[s>>16&255]+Ne[s>>24&255]+Ne[c&255]+Ne[c>>8&255]+Ne[c>>16&255]+Ne[c>>24&255]).toUpperCase()}const kt=Object.assign||function(){let l=arguments[0];for(let r=1,s=arguments.length;r<s;r++){let c=arguments[r];if(c)for(let t in c)Object.prototype.hasOwnProperty.call(c,t)&&(l[t]=c[t])}return l},ds=Date.now(),Ko=new WeakMap,Jo=new Map;let hs=1e10;function jn(l,r){const s=gs(r);let c=Ko.get(l);if(c||Ko.set(l,c=Object.create(null)),c[s])return new c[s];const t=`_onBeforeCompile${s}`,e=function(i,f){l.onBeforeCompile.call(this,i,f);const d=this.customProgramCacheKey()+"|"+i.vertexShader+"|"+i.fragmentShader;let h=Jo[d];if(!h){const p=ps(this,i,r,s);h=Jo[d]=p}i.vertexShader=h.vertexShader,i.fragmentShader=h.fragmentShader,kt(i.uniforms,this.uniforms),r.timeUniform&&(i.uniforms[r.timeUniform]={get value(){return Date.now()-ds}}),this[t]&&this[t](i)},n=function(){return a(r.chained?l:l.clone())},a=function(i){const f=Object.create(i,o);return Object.defineProperty(f,"baseMaterial",{value:l}),Object.defineProperty(f,"id",{value:hs++}),f.uuid=us(),f.uniforms=kt({},i.uniforms,r.uniforms),f.defines=kt({},i.defines,r.defines),f.defines[`TROIKA_DERIVED_MATERIAL_${s}`]="",f.extensions=kt({},i.extensions,r.extensions),f._listeners=void 0,f},o={constructor:{value:n},isDerivedMaterial:{value:!0},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return l.customProgramCacheKey()+"|"+s}},onBeforeCompile:{get(){return e},set(i){this[t]=i}},copy:{writable:!0,configurable:!0,value:function(i){return l.copy.call(this,i),!l.isShaderMaterial&&!l.isDerivedMaterial&&(kt(this.extensions,i.extensions),kt(this.defines,i.defines),kt(this.uniforms,Mn.clone(i.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const i=new l.constructor;return a(i).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let i=this._depthMaterial;return i||(i=this._depthMaterial=jn(l.isDerivedMaterial?l.getDepthMaterial():new Ya({depthPacking:Za}),r),i.defines.IS_DEPTH_MATERIAL="",i.uniforms=this.uniforms),i}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let i=this._distanceMaterial;return i||(i=this._distanceMaterial=jn(l.isDerivedMaterial?l.getDistanceMaterial():new Xa,r),i.defines.IS_DISTANCE_MATERIAL="",i.uniforms=this.uniforms),i}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:i,_distanceMaterial:f}=this;i&&i.dispose(),f&&f.dispose(),l.dispose.call(this)}}};return c[s]=n,new n}function ps(l,{vertexShader:r,fragmentShader:s},c,t){let{vertexDefs:e,vertexMainIntro:n,vertexMainOutro:a,vertexTransform:o,fragmentDefs:i,fragmentMainIntro:f,fragmentMainOutro:d,fragmentColorTransform:h,customRewriter:p,timeUniform:v}=c;if(e=e||"",n=n||"",a=a||"",i=i||"",f=f||"",d=d||"",(o||p)&&(r=Cn(r)),(h||p)&&(s=s.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),s=Cn(s)),p){let g=p({vertexShader:r,fragmentShader:s});r=g.vertexShader,s=g.fragmentShader}if(h){let g=[];s=s.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,y=>(g.push(y),"")),d=`${h}
${g.join(`
`)}
${d}`}if(v){const g=`
uniform float ${v};
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
`,r=r.replace(/\b(position|normal|uv)\b/g,(g,y,M,_)=>/\battribute\s+vec[23]\s+$/.test(_.substr(0,M))?y:`troika_${y}_${t}`),l.map&&l.map.channel>0||(r=r.replace(/\bMAP_UV\b/g,`troika_uv_${t}`))),r=$o(r,t,e,n,a),s=$o(s,t,i,f,d),{vertexShader:r,fragmentShader:s}}function $o(l,r,s,c,t){return(c||t||s)&&(l=l.replace(Ta,`
${s}
void troikaOrigMain${r}() {`),l+=`
void main() {
  ${c}
  troikaOrigMain${r}();
  ${t}
}`),l}function ms(l,r){return l==="uniforms"?void 0:typeof r=="function"?r.toString():r}let vs=0;const ea=new Map;function gs(l){const r=JSON.stringify(l,ms);let s=ea.get(r);return s==null&&ea.set(r,s=++vs),s}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function ys(){return typeof window>"u"&&(self.window=self),function(l){var r={parse:function(t){var e=r._bin,n=new Uint8Array(t);if(e.readASCII(n,0,4)=="ttcf"){var a=4;e.readUshort(n,a),a+=2,e.readUshort(n,a),a+=2;var o=e.readUint(n,a);a+=4;for(var i=[],f=0;f<o;f++){var d=e.readUint(n,a);a+=4,i.push(r._readFont(n,d))}return i}return[r._readFont(n,0)]},_readFont:function(t,e){var n=r._bin,a=e;n.readFixed(t,e),e+=4;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2;for(var i=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],f={_data:t,_offset:a},d={},h=0;h<o;h++){var p=n.readASCII(t,e,4);e+=4,n.readUint(t,e),e+=4;var v=n.readUint(t,e);e+=4;var g=n.readUint(t,e);e+=4,d[p]={offset:v,length:g}}for(h=0;h<i.length;h++){var y=i[h];d[y]&&(f[y.trim()]=r[y.trim()].parse(t,d[y].offset,d[y].length,f))}return f},_tabOffset:function(t,e,n){for(var a=r._bin,o=a.readUshort(t,n+4),i=n+12,f=0;f<o;f++){var d=a.readASCII(t,i,4);i+=4,a.readUint(t,i),i+=4;var h=a.readUint(t,i);if(i+=4,a.readUint(t,i),i+=4,d==e)return h}return 0}};r._bin={readFixed:function(t,e){return(t[e]<<8|t[e+1])+(t[e+2]<<8|t[e+3])/65540},readF2dot14:function(t,e){return r._bin.readShort(t,e)/16384},readInt:function(t,e){return r._bin._view(t).getInt32(e)},readInt8:function(t,e){return r._bin._view(t).getInt8(e)},readShort:function(t,e){return r._bin._view(t).getInt16(e)},readUshort:function(t,e){return r._bin._view(t).getUint16(e)},readUshorts:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(r._bin.readUshort(t,e+2*o));return a},readUint:function(t,e){return r._bin._view(t).getUint32(e)},readUint64:function(t,e){return 4294967296*r._bin.readUint(t,e)+r._bin.readUint(t,e+4)},readASCII:function(t,e,n){for(var a="",o=0;o<n;o++)a+=String.fromCharCode(t[e+o]);return a},readUnicode:function(t,e,n){for(var a="",o=0;o<n;o++){var i=t[e++]<<8|t[e++];a+=String.fromCharCode(i)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(t,e,n){var a=r._bin._tdec;return a&&e==0&&n==t.length?a.decode(t):r._bin.readASCII(t,e,n)},readBytes:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(t[e+o]);return a},readASCIIArray:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(String.fromCharCode(t[e+o]));return a},_view:function(t){return t._dataView||(t._dataView=t.buffer?new DataView(t.buffer,t.byteOffset,t.byteLength):new DataView(new Uint8Array(t).buffer))}},r._lctf={},r._lctf.parse=function(t,e,n,a,o){var i=r._bin,f={},d=e;i.readFixed(t,e),e+=4;var h=i.readUshort(t,e);e+=2;var p=i.readUshort(t,e);e+=2;var v=i.readUshort(t,e);return e+=2,f.scriptList=r._lctf.readScriptList(t,d+h),f.featureList=r._lctf.readFeatureList(t,d+p),f.lookupList=r._lctf.readLookupList(t,d+v,o),f},r._lctf.readLookupList=function(t,e,n){var a=r._bin,o=e,i=[],f=a.readUshort(t,e);e+=2;for(var d=0;d<f;d++){var h=a.readUshort(t,e);e+=2;var p=r._lctf.readLookupTable(t,o+h,n);i.push(p)}return i},r._lctf.readLookupTable=function(t,e,n){var a=r._bin,o=e,i={tabs:[]};i.ltype=a.readUshort(t,e),e+=2,i.flag=a.readUshort(t,e),e+=2;var f=a.readUshort(t,e);e+=2;for(var d=i.ltype,h=0;h<f;h++){var p=a.readUshort(t,e);e+=2;var v=n(t,d,o+p,i);i.tabs.push(v)}return i},r._lctf.numOfOnes=function(t){for(var e=0,n=0;n<32;n++)t>>>n&1&&e++;return e},r._lctf.readClassDef=function(t,e){var n=r._bin,a=[],o=n.readUshort(t,e);if(e+=2,o==1){var i=n.readUshort(t,e);e+=2;var f=n.readUshort(t,e);e+=2;for(var d=0;d<f;d++)a.push(i+d),a.push(i+d),a.push(n.readUshort(t,e)),e+=2}if(o==2){var h=n.readUshort(t,e);for(e+=2,d=0;d<h;d++)a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2}return a},r._lctf.getInterval=function(t,e){for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1];if(t[n+2],a<=e&&e<=o)return n}return-1},r._lctf.readCoverage=function(t,e){var n=r._bin,a={};a.fmt=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.fmt==1&&(a.tab=n.readUshorts(t,e,o)),a.fmt==2&&(a.tab=n.readUshorts(t,e,3*o)),a},r._lctf.coverageIndex=function(t,e){var n=t.tab;if(t.fmt==1)return n.indexOf(e);if(t.fmt==2){var a=r._lctf.getInterval(n,e);if(a!=-1)return n[a+2]+(e-n[a])}return-1},r._lctf.readFeatureList=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2;var p=r._lctf.readFeatureTable(t,a+h);p.tag=d.trim(),o.push(p)}return o},r._lctf.readFeatureTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.featureParams=a+i);var f=n.readUshort(t,e);e+=2,o.tab=[];for(var d=0;d<f;d++)o.tab.push(n.readUshort(t,e+2*d));return o},r._lctf.readScriptList=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2,o[d.trim()]=r._lctf.readScriptTable(t,a+h)}return o},r._lctf.readScriptTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.default=r._lctf.readLangSysTable(t,a+i));var f=n.readUshort(t,e);e+=2;for(var d=0;d<f;d++){var h=n.readASCII(t,e,4);e+=4;var p=n.readUshort(t,e);e+=2,o[h.trim()]=r._lctf.readLangSysTable(t,a+p)}return o},r._lctf.readLangSysTable=function(t,e){var n=r._bin,a={};n.readUshort(t,e),e+=2,a.reqFeature=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.features=n.readUshorts(t,e,o),a},r.CFF={},r.CFF.parse=function(t,e,n){var a=r._bin;(t=new Uint8Array(t.buffer,e,n))[e=0],t[++e],t[++e],t[++e],e++;var o=[];e=r.CFF.readIndex(t,e,o);for(var i=[],f=0;f<o.length-1;f++)i.push(a.readASCII(t,e+o[f],o[f+1]-o[f]));e+=o[o.length-1];var d=[];e=r.CFF.readIndex(t,e,d);var h=[];for(f=0;f<d.length-1;f++)h.push(r.CFF.readDict(t,e+d[f],e+d[f+1]));e+=d[d.length-1];var p=h[0],v=[];e=r.CFF.readIndex(t,e,v);var g=[];for(f=0;f<v.length-1;f++)g.push(a.readASCII(t,e+v[f],v[f+1]-v[f]));if(e+=v[v.length-1],r.CFF.readSubrs(t,e,p),p.CharStrings){e=p.CharStrings,v=[],e=r.CFF.readIndex(t,e,v);var y=[];for(f=0;f<v.length-1;f++)y.push(a.readBytes(t,e+v[f],v[f+1]-v[f]));p.CharStrings=y}if(p.ROS){e=p.FDArray;var M=[];for(e=r.CFF.readIndex(t,e,M),p.FDArray=[],f=0;f<M.length-1;f++){var _=r.CFF.readDict(t,e+M[f],e+M[f+1]);r.CFF._readFDict(t,_,g),p.FDArray.push(_)}e+=M[M.length-1],e=p.FDSelect,p.FDSelect=[];var m=t[e];if(e++,m!=3)throw m;var b=a.readUshort(t,e);for(e+=2,f=0;f<b+1;f++)p.FDSelect.push(a.readUshort(t,e),t[e+2]),e+=3}return p.Encoding&&(p.Encoding=r.CFF.readEncoding(t,p.Encoding,p.CharStrings.length)),p.charset&&(p.charset=r.CFF.readCharset(t,p.charset,p.CharStrings.length)),r.CFF._readFDict(t,p,g),p},r.CFF._readFDict=function(t,e,n){var a;for(var o in e.Private&&(a=e.Private[1],e.Private=r.CFF.readDict(t,a,a+e.Private[0]),e.Private.Subrs&&r.CFF.readSubrs(t,a+e.Private.Subrs,e.Private)),e)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)!=-1&&(e[o]=n[e[o]-426+35])},r.CFF.readSubrs=function(t,e,n){var a=r._bin,o=[];e=r.CFF.readIndex(t,e,o);var i,f=o.length;i=f<1240?107:f<33900?1131:32768,n.Bias=i,n.Subrs=[];for(var d=0;d<o.length-1;d++)n.Subrs.push(a.readBytes(t,e+o[d],o[d+1]-o[d]))},r.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],r.CFF.glyphByUnicode=function(t,e){for(var n=0;n<t.charset.length;n++)if(t.charset[n]==e)return n;return-1},r.CFF.glyphBySE=function(t,e){return e<0||e>255?-1:r.CFF.glyphByUnicode(t,r.CFF.tableSE[e])},r.CFF.readEncoding=function(t,e,n){r._bin;var a=[".notdef"],o=t[e];if(e++,o!=0)throw"error: unknown encoding format: "+o;var i=t[e];e++;for(var f=0;f<i;f++)a.push(t[e+f]);return a},r.CFF.readCharset=function(t,e,n){var a=r._bin,o=[".notdef"],i=t[e];if(e++,i==0)for(var f=0;f<n;f++){var d=a.readUshort(t,e);e+=2,o.push(d)}else{if(i!=1&&i!=2)throw"error: format: "+i;for(;o.length<n;){d=a.readUshort(t,e),e+=2;var h=0;for(i==1?(h=t[e],e++):(h=a.readUshort(t,e),e+=2),f=0;f<=h;f++)o.push(d),d++}}return o},r.CFF.readIndex=function(t,e,n){var a=r._bin,o=a.readUshort(t,e)+1,i=t[e+=2];if(e++,i==1)for(var f=0;f<o;f++)n.push(t[e+f]);else if(i==2)for(f=0;f<o;f++)n.push(a.readUshort(t,e+2*f));else if(i==3)for(f=0;f<o;f++)n.push(16777215&a.readUint(t,e+3*f-1));else if(o!=1)throw"unsupported offset size: "+i+", count: "+o;return(e+=o*i)-1},r.CFF.getCharString=function(t,e,n){var a=r._bin,o=t[e],i=t[e+1];t[e+2],t[e+3],t[e+4];var f=1,d=null,h=null;o<=20&&(d=o,f=1),o==12&&(d=100*o+i,f=2),21<=o&&o<=27&&(d=o,f=1),o==28&&(h=a.readShort(t,e+1),f=3),29<=o&&o<=31&&(d=o,f=1),32<=o&&o<=246&&(h=o-139,f=1),247<=o&&o<=250&&(h=256*(o-247)+i+108,f=2),251<=o&&o<=254&&(h=256*-(o-251)-i-108,f=2),o==255&&(h=a.readInt(t,e+1)/65535,f=5),n.val=h??"o"+d,n.size=f},r.CFF.readCharString=function(t,e,n){for(var a=e+n,o=r._bin,i=[];e<a;){var f=t[e],d=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,v=null;f<=20&&(p=f,h=1),f==12&&(p=100*f+d,h=2),f!=19&&f!=20||(p=f,h=2),21<=f&&f<=27&&(p=f,h=1),f==28&&(v=o.readShort(t,e+1),h=3),29<=f&&f<=31&&(p=f,h=1),32<=f&&f<=246&&(v=f-139,h=1),247<=f&&f<=250&&(v=256*(f-247)+d+108,h=2),251<=f&&f<=254&&(v=256*-(f-251)-d-108,h=2),f==255&&(v=o.readInt(t,e+1)/65535,h=5),i.push(v??"o"+p),e+=h}return i},r.CFF.readDict=function(t,e,n){for(var a=r._bin,o={},i=[];e<n;){var f=t[e],d=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,v=null;if(f==28&&(v=a.readShort(t,e+1),h=3),f==29&&(v=a.readInt(t,e+1),h=5),32<=f&&f<=246&&(v=f-139,h=1),247<=f&&f<=250&&(v=256*(f-247)+d+108,h=2),251<=f&&f<=254&&(v=256*-(f-251)-d-108,h=2),f==255)throw v=a.readInt(t,e+1)/65535,h=5,"unknown number";if(f==30){var g=[];for(h=1;;){var y=t[e+h];h++;var M=y>>4,_=15&y;if(M!=15&&g.push(M),_!=15&&g.push(_),_==15)break}for(var m="",b=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],k=0;k<g.length;k++)m+=b[g[k]];v=parseFloat(m)}f<=21&&(p=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][f],h=1,f==12&&(p=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][d],h=2)),p!=null?(o[p]=i.length==1?i[0]:i,i=[]):i.push(v),e+=h}return o},r.cmap={},r.cmap.parse=function(t,e,n){t=new Uint8Array(t.buffer,e,n),e=0;var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2;var f=[];o.tables=[];for(var d=0;d<i;d++){var h=a.readUshort(t,e);e+=2;var p=a.readUshort(t,e);e+=2;var v=a.readUint(t,e);e+=4;var g="p"+h+"e"+p,y=f.indexOf(v);if(y==-1){var M;y=o.tables.length,f.push(v);var _=a.readUshort(t,v);_==0?M=r.cmap.parse0(t,v):_==4?M=r.cmap.parse4(t,v):_==6?M=r.cmap.parse6(t,v):_==12&&(M=r.cmap.parse12(t,v)),o.tables.push(M)}if(o[g]!=null)throw"multiple tables for one platform+encoding";o[g]=y}return o},r.cmap.parse0=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,a.map=[];for(var i=0;i<o-6;i++)a.map.push(t[e+i]);return a},r.cmap.parse4=function(t,e){var n=r._bin,a=e,o={};o.format=n.readUshort(t,e),e+=2;var i=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2;var f=n.readUshort(t,e);e+=2;var d=f/2;o.searchRange=n.readUshort(t,e),e+=2,o.entrySelector=n.readUshort(t,e),e+=2,o.rangeShift=n.readUshort(t,e),e+=2,o.endCount=n.readUshorts(t,e,d),e+=2*d,e+=2,o.startCount=n.readUshorts(t,e,d),e+=2*d,o.idDelta=[];for(var h=0;h<d;h++)o.idDelta.push(n.readShort(t,e)),e+=2;for(o.idRangeOffset=n.readUshorts(t,e,d),e+=2*d,o.glyphIdArray=[];e<a+i;)o.glyphIdArray.push(n.readUshort(t,e)),e+=2;return o},r.cmap.parse6=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,a.firstCode=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,a.glyphIdArray=[];for(var i=0;i<o;i++)a.glyphIdArray.push(n.readUshort(t,e)),e+=2;return a},r.cmap.parse12=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,e+=2,n.readUint(t,e),e+=4,n.readUint(t,e),e+=4;var o=n.readUint(t,e);e+=4,a.groups=[];for(var i=0;i<o;i++){var f=e+12*i,d=n.readUint(t,f+0),h=n.readUint(t,f+4),p=n.readUint(t,f+8);a.groups.push([d,h,p])}return a},r.glyf={},r.glyf.parse=function(t,e,n,a){for(var o=[],i=0;i<a.maxp.numGlyphs;i++)o.push(null);return o},r.glyf._parseGlyf=function(t,e){var n=r._bin,a=t._data,o=r._tabOffset(a,"glyf",t._offset)+t.loca[e];if(t.loca[e]==t.loca[e+1])return null;var i={};if(i.noc=n.readShort(a,o),o+=2,i.xMin=n.readShort(a,o),o+=2,i.yMin=n.readShort(a,o),o+=2,i.xMax=n.readShort(a,o),o+=2,i.yMax=n.readShort(a,o),o+=2,i.xMin>=i.xMax||i.yMin>=i.yMax)return null;if(i.noc>0){i.endPts=[];for(var f=0;f<i.noc;f++)i.endPts.push(n.readUshort(a,o)),o+=2;var d=n.readUshort(a,o);if(o+=2,a.length-o<d)return null;i.instructions=n.readBytes(a,o,d),o+=d;var h=i.endPts[i.noc-1]+1;for(i.flags=[],f=0;f<h;f++){var p=a[o];if(o++,i.flags.push(p),(8&p)!=0){var v=a[o];o++;for(var g=0;g<v;g++)i.flags.push(p),f++}}for(i.xs=[],f=0;f<h;f++){var y=(2&i.flags[f])!=0,M=(16&i.flags[f])!=0;y?(i.xs.push(M?a[o]:-a[o]),o++):M?i.xs.push(0):(i.xs.push(n.readShort(a,o)),o+=2)}for(i.ys=[],f=0;f<h;f++)y=(4&i.flags[f])!=0,M=(32&i.flags[f])!=0,y?(i.ys.push(M?a[o]:-a[o]),o++):M?i.ys.push(0):(i.ys.push(n.readShort(a,o)),o+=2);var _=0,m=0;for(f=0;f<h;f++)_+=i.xs[f],m+=i.ys[f],i.xs[f]=_,i.ys[f]=m}else{var b;i.parts=[];do{b=n.readUshort(a,o),o+=2;var k={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(i.parts.push(k),k.glyphIndex=n.readUshort(a,o),o+=2,1&b){var A=n.readShort(a,o);o+=2;var T=n.readShort(a,o);o+=2}else A=n.readInt8(a,o),o++,T=n.readInt8(a,o),o++;2&b?(k.m.tx=A,k.m.ty=T):(k.p1=A,k.p2=T),8&b?(k.m.a=k.m.d=n.readF2dot14(a,o),o+=2):64&b?(k.m.a=n.readF2dot14(a,o),o+=2,k.m.d=n.readF2dot14(a,o),o+=2):128&b&&(k.m.a=n.readF2dot14(a,o),o+=2,k.m.b=n.readF2dot14(a,o),o+=2,k.m.c=n.readF2dot14(a,o),o+=2,k.m.d=n.readF2dot14(a,o),o+=2)}while(32&b);if(256&b){var C=n.readUshort(a,o);for(o+=2,i.instr=[],f=0;f<C;f++)i.instr.push(a[o]),o++}}return i},r.GDEF={},r.GDEF.parse=function(t,e,n,a){var o=e;e+=4;var i=r._bin.readUshort(t,e);return{glyphClassDef:i===0?null:r._lctf.readClassDef(t,o+i)}},r.GPOS={},r.GPOS.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GPOS.subt)},r.GPOS.subt=function(t,e,n,a){var o=r._bin,i=n,f={};if(f.fmt=o.readUshort(t,n),n+=2,e==1||e==2||e==3||e==7||e==8&&f.fmt<=2){var d=o.readUshort(t,n);n+=2,f.coverage=r._lctf.readCoverage(t,d+i)}if(e==1&&f.fmt==1){var h=o.readUshort(t,n);n+=2,h!=0&&(f.pos=r.GPOS.readValueRecord(t,n,h))}else if(e==2&&f.fmt>=1&&f.fmt<=2){h=o.readUshort(t,n),n+=2;var p=o.readUshort(t,n);n+=2;var v=r._lctf.numOfOnes(h),g=r._lctf.numOfOnes(p);if(f.fmt==1){f.pairsets=[];var y=o.readUshort(t,n);n+=2;for(var M=0;M<y;M++){var _=i+o.readUshort(t,n);n+=2;var m=o.readUshort(t,_);_+=2;for(var b=[],k=0;k<m;k++){var A=o.readUshort(t,_);_+=2,h!=0&&(S=r.GPOS.readValueRecord(t,_,h),_+=2*v),p!=0&&(F=r.GPOS.readValueRecord(t,_,p),_+=2*g),b.push({gid2:A,val1:S,val2:F})}f.pairsets.push(b)}}if(f.fmt==2){var T=o.readUshort(t,n);n+=2;var C=o.readUshort(t,n);n+=2;var L=o.readUshort(t,n);n+=2;var P=o.readUshort(t,n);for(n+=2,f.classDef1=r._lctf.readClassDef(t,i+T),f.classDef2=r._lctf.readClassDef(t,i+C),f.matrix=[],M=0;M<L;M++){var H=[];for(k=0;k<P;k++){var S=null,F=null;h!=0&&(S=r.GPOS.readValueRecord(t,n,h),n+=2*v),p!=0&&(F=r.GPOS.readValueRecord(t,n,p),n+=2*g),H.push({val1:S,val2:F})}f.matrix.push(H)}}}else if(e==4&&f.fmt==1)f.markCoverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),f.baseCoverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),f.markClassCount=o.readUshort(t,n+4),f.markArray=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),f.baseArray=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,f.markClassCount);else if(e==6&&f.fmt==1)f.mark1Coverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),f.mark2Coverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),f.markClassCount=o.readUshort(t,n+4),f.mark1Array=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),f.mark2Array=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,f.markClassCount);else if(e==9&&f.fmt==1){var E=o.readUshort(t,n);n+=2;var Y=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=E;else if(a.ltype!=E)throw"invalid extension substitution";return r.GPOS.subt(t,a.ltype,i+Y)}return f},r.GPOS.readValueRecord=function(t,e,n){var a=r._bin,o=[];return o.push(1&n?a.readShort(t,e):0),e+=1&n?2:0,o.push(2&n?a.readShort(t,e):0),e+=2&n?2:0,o.push(4&n?a.readShort(t,e):0),e+=4&n?2:0,o.push(8&n?a.readShort(t,e):0),e+=8&n?2:0,o},r.GPOS.readBaseArray=function(t,e,n){var a=r._bin,o=[],i=e,f=a.readUshort(t,e);e+=2;for(var d=0;d<f;d++){for(var h=[],p=0;p<n;p++)h.push(r.GPOS.readAnchorRecord(t,i+a.readUshort(t,e))),e+=2;o.push(h)}return o},r.GPOS.readMarkArray=function(t,e){var n=r._bin,a=[],o=e,i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=r.GPOS.readAnchorRecord(t,n.readUshort(t,e+2)+o);d.markClass=n.readUshort(t,e),a.push(d),e+=4}return a},r.GPOS.readAnchorRecord=function(t,e){var n=r._bin,a={};return a.fmt=n.readUshort(t,e),a.x=n.readShort(t,e+2),a.y=n.readShort(t,e+4),a},r.GSUB={},r.GSUB.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GSUB.subt)},r.GSUB.subt=function(t,e,n,a){var o=r._bin,i=n,f={};if(f.fmt=o.readUshort(t,n),n+=2,e!=1&&e!=2&&e!=4&&e!=5&&e!=6)return null;if(e==1||e==2||e==4||e==5&&f.fmt<=2||e==6&&f.fmt<=2){var d=o.readUshort(t,n);n+=2,f.coverage=r._lctf.readCoverage(t,i+d)}if(e==1&&f.fmt>=1&&f.fmt<=2){if(f.fmt==1)f.delta=o.readShort(t,n),n+=2;else if(f.fmt==2){var h=o.readUshort(t,n);n+=2,f.newg=o.readUshorts(t,n,h),n+=2*f.newg.length}}else if(e==2&&f.fmt==1){h=o.readUshort(t,n),n+=2,f.seqs=[];for(var p=0;p<h;p++){var v=o.readUshort(t,n)+i;n+=2;var g=o.readUshort(t,v);f.seqs.push(o.readUshorts(t,v+2,g))}}else if(e==4)for(f.vals=[],h=o.readUshort(t,n),n+=2,p=0;p<h;p++){var y=o.readUshort(t,n);n+=2,f.vals.push(r.GSUB.readLigatureSet(t,i+y))}else if(e==5&&f.fmt==2){if(f.fmt==2){var M=o.readUshort(t,n);n+=2,f.cDef=r._lctf.readClassDef(t,i+M),f.scset=[];var _=o.readUshort(t,n);for(n+=2,p=0;p<_;p++){var m=o.readUshort(t,n);n+=2,f.scset.push(m==0?null:r.GSUB.readSubClassSet(t,i+m))}}}else if(e==6&&f.fmt==3){if(f.fmt==3){for(p=0;p<3;p++){h=o.readUshort(t,n),n+=2;for(var b=[],k=0;k<h;k++)b.push(r._lctf.readCoverage(t,i+o.readUshort(t,n+2*k)));n+=2*h,p==0&&(f.backCvg=b),p==1&&(f.inptCvg=b),p==2&&(f.ahedCvg=b)}h=o.readUshort(t,n),n+=2,f.lookupRec=r.GSUB.readSubstLookupRecords(t,n,h)}}else if(e==7&&f.fmt==1){var A=o.readUshort(t,n);n+=2;var T=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=A;else if(a.ltype!=A)throw"invalid extension substitution";return r.GSUB.subt(t,a.ltype,i+T)}return f},r.GSUB.readSubClassSet=function(t,e){var n=r._bin.readUshort,a=e,o=[],i=n(t,e);e+=2;for(var f=0;f<i;f++){var d=n(t,e);e+=2,o.push(r.GSUB.readSubClassRule(t,a+d))}return o},r.GSUB.readSubClassRule=function(t,e){var n=r._bin.readUshort,a={},o=n(t,e),i=n(t,e+=2);e+=2,a.input=[];for(var f=0;f<o-1;f++)a.input.push(n(t,e)),e+=2;return a.substLookupRecords=r.GSUB.readSubstLookupRecords(t,e,i),a},r.GSUB.readSubstLookupRecords=function(t,e,n){for(var a=r._bin.readUshort,o=[],i=0;i<n;i++)o.push(a(t,e),a(t,e+2)),e+=4;return o},r.GSUB.readChainSubClassSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readUshort(t,e);e+=2,o.push(r.GSUB.readChainSubClassRule(t,a+d))}return o},r.GSUB.readChainSubClassRule=function(t,e){for(var n=r._bin,a={},o=["backtrack","input","lookahead"],i=0;i<o.length;i++){var f=n.readUshort(t,e);e+=2,i==1&&f--,a[o[i]]=n.readUshorts(t,e,f),e+=2*a[o[i]].length}return f=n.readUshort(t,e),e+=2,a.subst=n.readUshorts(t,e,2*f),e+=2*a.subst.length,a},r.GSUB.readLigatureSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readUshort(t,e);e+=2,o.push(r.GSUB.readLigature(t,a+d))}return o},r.GSUB.readLigature=function(t,e){var n=r._bin,a={chain:[]};a.nglyph=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2;for(var i=0;i<o-1;i++)a.chain.push(n.readUshort(t,e)),e+=2;return a},r.head={},r.head.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.fontRevision=a.readFixed(t,e),e+=4,a.readUint(t,e),e+=4,a.readUint(t,e),e+=4,o.flags=a.readUshort(t,e),e+=2,o.unitsPerEm=a.readUshort(t,e),e+=2,o.created=a.readUint64(t,e),e+=8,o.modified=a.readUint64(t,e),e+=8,o.xMin=a.readShort(t,e),e+=2,o.yMin=a.readShort(t,e),e+=2,o.xMax=a.readShort(t,e),e+=2,o.yMax=a.readShort(t,e),e+=2,o.macStyle=a.readUshort(t,e),e+=2,o.lowestRecPPEM=a.readUshort(t,e),e+=2,o.fontDirectionHint=a.readShort(t,e),e+=2,o.indexToLocFormat=a.readShort(t,e),e+=2,o.glyphDataFormat=a.readShort(t,e),e+=2,o},r.hhea={},r.hhea.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.ascender=a.readShort(t,e),e+=2,o.descender=a.readShort(t,e),e+=2,o.lineGap=a.readShort(t,e),e+=2,o.advanceWidthMax=a.readUshort(t,e),e+=2,o.minLeftSideBearing=a.readShort(t,e),e+=2,o.minRightSideBearing=a.readShort(t,e),e+=2,o.xMaxExtent=a.readShort(t,e),e+=2,o.caretSlopeRise=a.readShort(t,e),e+=2,o.caretSlopeRun=a.readShort(t,e),e+=2,o.caretOffset=a.readShort(t,e),e+=2,e+=8,o.metricDataFormat=a.readShort(t,e),e+=2,o.numberOfHMetrics=a.readUshort(t,e),e+=2,o},r.hmtx={},r.hmtx.parse=function(t,e,n,a){for(var o=r._bin,i={aWidth:[],lsBearing:[]},f=0,d=0,h=0;h<a.maxp.numGlyphs;h++)h<a.hhea.numberOfHMetrics&&(f=o.readUshort(t,e),e+=2,d=o.readShort(t,e),e+=2),i.aWidth.push(f),i.lsBearing.push(d);return i},r.kern={},r.kern.parse=function(t,e,n,a){var o=r._bin,i=o.readUshort(t,e);if(e+=2,i==1)return r.kern.parseV1(t,e-2,n,a);var f=o.readUshort(t,e);e+=2;for(var d={glyph1:[],rval:[]},h=0;h<f;h++){e+=2,n=o.readUshort(t,e),e+=2;var p=o.readUshort(t,e);e+=2;var v=p>>>8;if((v&=15)!=0)throw"unknown kern table format: "+v;e=r.kern.readFormat0(t,e,d)}return d},r.kern.parseV1=function(t,e,n,a){var o=r._bin;o.readFixed(t,e),e+=4;var i=o.readUint(t,e);e+=4;for(var f={glyph1:[],rval:[]},d=0;d<i;d++){o.readUint(t,e),e+=4;var h=o.readUshort(t,e);e+=2,o.readUshort(t,e),e+=2;var p=h>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;e=r.kern.readFormat0(t,e,f)}return f},r.kern.readFormat0=function(t,e,n){var a=r._bin,o=-1,i=a.readUshort(t,e);e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2;for(var f=0;f<i;f++){var d=a.readUshort(t,e);e+=2;var h=a.readUshort(t,e);e+=2;var p=a.readShort(t,e);e+=2,d!=o&&(n.glyph1.push(d),n.rval.push({glyph2:[],vals:[]}));var v=n.rval[n.rval.length-1];v.glyph2.push(h),v.vals.push(p),o=d}return e},r.loca={},r.loca.parse=function(t,e,n,a){var o=r._bin,i=[],f=a.head.indexToLocFormat,d=a.maxp.numGlyphs+1;if(f==0)for(var h=0;h<d;h++)i.push(o.readUshort(t,e+(h<<1))<<1);if(f==1)for(h=0;h<d;h++)i.push(o.readUint(t,e+(h<<2)));return i},r.maxp={},r.maxp.parse=function(t,e,n){var a=r._bin,o={},i=a.readUint(t,e);return e+=4,o.numGlyphs=a.readUshort(t,e),e+=2,i==65536&&(o.maxPoints=a.readUshort(t,e),e+=2,o.maxContours=a.readUshort(t,e),e+=2,o.maxCompositePoints=a.readUshort(t,e),e+=2,o.maxCompositeContours=a.readUshort(t,e),e+=2,o.maxZones=a.readUshort(t,e),e+=2,o.maxTwilightPoints=a.readUshort(t,e),e+=2,o.maxStorage=a.readUshort(t,e),e+=2,o.maxFunctionDefs=a.readUshort(t,e),e+=2,o.maxInstructionDefs=a.readUshort(t,e),e+=2,o.maxStackElements=a.readUshort(t,e),e+=2,o.maxSizeOfInstructions=a.readUshort(t,e),e+=2,o.maxComponentElements=a.readUshort(t,e),e+=2,o.maxComponentDepth=a.readUshort(t,e),e+=2),o},r.name={},r.name.parse=function(t,e,n){var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2,a.readUshort(t,e);for(var f,d=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=e+=2,p=0;p<i;p++){var v=a.readUshort(t,e);e+=2;var g=a.readUshort(t,e);e+=2;var y=a.readUshort(t,e);e+=2;var M=a.readUshort(t,e);e+=2;var _=a.readUshort(t,e);e+=2;var m=a.readUshort(t,e);e+=2;var b,k=d[M],A=h+12*i+m;if(v==0)b=a.readUnicode(t,A,_/2);else if(v==3&&g==0)b=a.readUnicode(t,A,_/2);else if(g==0)b=a.readASCII(t,A,_);else if(g==1)b=a.readUnicode(t,A,_/2);else if(g==3)b=a.readUnicode(t,A,_/2);else{if(v!=1)throw"unknown encoding "+g+", platformID: "+v;b=a.readASCII(t,A,_)}var T="p"+v+","+y.toString(16);o[T]==null&&(o[T]={}),o[T][k!==void 0?k:M]=b,o[T]._lang=y}for(var C in o)if(o[C].postScriptName!=null&&o[C]._lang==1033)return o[C];for(var C in o)if(o[C].postScriptName!=null&&o[C]._lang==0)return o[C];for(var C in o)if(o[C].postScriptName!=null&&o[C]._lang==3084)return o[C];for(var C in o)if(o[C].postScriptName!=null)return o[C];for(var C in o){f=C;break}return o[f]},r["OS/2"]={},r["OS/2"].parse=function(t,e,n){var a=r._bin.readUshort(t,e);e+=2;var o={};if(a==0)r["OS/2"].version0(t,e,o);else if(a==1)r["OS/2"].version1(t,e,o);else if(a==2||a==3||a==4)r["OS/2"].version2(t,e,o);else{if(a!=5)throw"unknown OS/2 table version: "+a;r["OS/2"].version5(t,e,o)}return o},r["OS/2"].version0=function(t,e,n){var a=r._bin;return n.xAvgCharWidth=a.readShort(t,e),e+=2,n.usWeightClass=a.readUshort(t,e),e+=2,n.usWidthClass=a.readUshort(t,e),e+=2,n.fsType=a.readUshort(t,e),e+=2,n.ySubscriptXSize=a.readShort(t,e),e+=2,n.ySubscriptYSize=a.readShort(t,e),e+=2,n.ySubscriptXOffset=a.readShort(t,e),e+=2,n.ySubscriptYOffset=a.readShort(t,e),e+=2,n.ySuperscriptXSize=a.readShort(t,e),e+=2,n.ySuperscriptYSize=a.readShort(t,e),e+=2,n.ySuperscriptXOffset=a.readShort(t,e),e+=2,n.ySuperscriptYOffset=a.readShort(t,e),e+=2,n.yStrikeoutSize=a.readShort(t,e),e+=2,n.yStrikeoutPosition=a.readShort(t,e),e+=2,n.sFamilyClass=a.readShort(t,e),e+=2,n.panose=a.readBytes(t,e,10),e+=10,n.ulUnicodeRange1=a.readUint(t,e),e+=4,n.ulUnicodeRange2=a.readUint(t,e),e+=4,n.ulUnicodeRange3=a.readUint(t,e),e+=4,n.ulUnicodeRange4=a.readUint(t,e),e+=4,n.achVendID=[a.readInt8(t,e),a.readInt8(t,e+1),a.readInt8(t,e+2),a.readInt8(t,e+3)],e+=4,n.fsSelection=a.readUshort(t,e),e+=2,n.usFirstCharIndex=a.readUshort(t,e),e+=2,n.usLastCharIndex=a.readUshort(t,e),e+=2,n.sTypoAscender=a.readShort(t,e),e+=2,n.sTypoDescender=a.readShort(t,e),e+=2,n.sTypoLineGap=a.readShort(t,e),e+=2,n.usWinAscent=a.readUshort(t,e),e+=2,n.usWinDescent=a.readUshort(t,e),e+=2},r["OS/2"].version1=function(t,e,n){var a=r._bin;return e=r["OS/2"].version0(t,e,n),n.ulCodePageRange1=a.readUint(t,e),e+=4,n.ulCodePageRange2=a.readUint(t,e),e+=4},r["OS/2"].version2=function(t,e,n){var a=r._bin;return e=r["OS/2"].version1(t,e,n),n.sxHeight=a.readShort(t,e),e+=2,n.sCapHeight=a.readShort(t,e),e+=2,n.usDefault=a.readUshort(t,e),e+=2,n.usBreak=a.readUshort(t,e),e+=2,n.usMaxContext=a.readUshort(t,e),e+=2},r["OS/2"].version5=function(t,e,n){var a=r._bin;return e=r["OS/2"].version2(t,e,n),n.usLowerOpticalPointSize=a.readUshort(t,e),e+=2,n.usUpperOpticalPointSize=a.readUshort(t,e),e+=2},r.post={},r.post.parse=function(t,e,n){var a=r._bin,o={};return o.version=a.readFixed(t,e),e+=4,o.italicAngle=a.readFixed(t,e),e+=4,o.underlinePosition=a.readShort(t,e),e+=2,o.underlineThickness=a.readShort(t,e),e+=2,o},r==null&&(r={}),r.U==null&&(r.U={}),r.U.codeToGlyph=function(t,e){var n=t.cmap,a=-1;if(n.p0e4!=null?a=n.p0e4:n.p3e1!=null?a=n.p3e1:n.p1e0!=null?a=n.p1e0:n.p0e3!=null&&(a=n.p0e3),a==-1)throw"no familiar platform and encoding!";var o=n.tables[a];if(o.format==0)return e>=o.map.length?0:o.map[e];if(o.format==4){for(var i=-1,f=0;f<o.endCount.length;f++)if(e<=o.endCount[f]){i=f;break}return i==-1||o.startCount[i]>e?0:65535&(o.idRangeOffset[i]!=0?o.glyphIdArray[e-o.startCount[i]+(o.idRangeOffset[i]>>1)-(o.idRangeOffset.length-i)]:e+o.idDelta[i])}if(o.format==12){if(e>o.groups[o.groups.length-1][1])return 0;for(f=0;f<o.groups.length;f++){var d=o.groups[f];if(d[0]<=e&&e<=d[1])return d[2]+(e-d[0])}return 0}throw"unknown cmap table format "+o.format},r.U.glyphToPath=function(t,e){var n={cmds:[],crds:[]};if(t.SVG&&t.SVG.entries[e]){var a=t.SVG.entries[e];return a==null?n:(typeof a=="string"&&(a=r.SVG.toPath(a),t.SVG.entries[e]=a),a)}if(t.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:t.CFF.Private?t.CFF.Private.defaultWidthX:0,open:!1},i=t.CFF,f=t.CFF.Private;if(i.ROS){for(var d=0;i.FDSelect[d+2]<=e;)d+=2;f=i.FDArray[i.FDSelect[d+1]].Private}r.U._drawCFF(t.CFF.CharStrings[e],o,i,f,n)}else t.glyf&&r.U._drawGlyf(e,t,n);return n},r.U._drawGlyf=function(t,e,n){var a=e.glyf[t];a==null&&(a=e.glyf[t]=r.glyf._parseGlyf(e,t)),a!=null&&(a.noc>-1?r.U._simpleGlyph(a,n):r.U._compoGlyph(a,e,n))},r.U._simpleGlyph=function(t,e){for(var n=0;n<t.noc;n++){for(var a=n==0?0:t.endPts[n-1]+1,o=t.endPts[n],i=a;i<=o;i++){var f=i==a?o:i-1,d=i==o?a:i+1,h=1&t.flags[i],p=1&t.flags[f],v=1&t.flags[d],g=t.xs[i],y=t.ys[i];if(i==a)if(h){if(!p){r.U.P.moveTo(e,g,y);continue}r.U.P.moveTo(e,t.xs[f],t.ys[f])}else p?r.U.P.moveTo(e,t.xs[f],t.ys[f]):r.U.P.moveTo(e,(t.xs[f]+g)/2,(t.ys[f]+y)/2);h?p&&r.U.P.lineTo(e,g,y):v?r.U.P.qcurveTo(e,g,y,t.xs[d],t.ys[d]):r.U.P.qcurveTo(e,g,y,(g+t.xs[d])/2,(y+t.ys[d])/2)}r.U.P.closePath(e)}},r.U._compoGlyph=function(t,e,n){for(var a=0;a<t.parts.length;a++){var o={cmds:[],crds:[]},i=t.parts[a];r.U._drawGlyf(i.glyphIndex,e,o);for(var f=i.m,d=0;d<o.crds.length;d+=2){var h=o.crds[d],p=o.crds[d+1];n.crds.push(h*f.a+p*f.b+f.tx),n.crds.push(h*f.c+p*f.d+f.ty)}for(d=0;d<o.cmds.length;d++)n.cmds.push(o.cmds[d])}},r.U._getGlyphClass=function(t,e){var n=r._lctf.getInterval(e,t);return n==-1?0:e[n+2]},r.U._applySubs=function(t,e,n,a){for(var o=t.length-e-1,i=0;i<n.tabs.length;i++)if(n.tabs[i]!=null){var f,d=n.tabs[i];if(!d.coverage||(f=r._lctf.coverageIndex(d.coverage,t[e]))!=-1){if(n.ltype==1)t[e],d.fmt==1?t[e]=t[e]+d.delta:t[e]=d.newg[f];else if(n.ltype==4)for(var h=d.vals[f],p=0;p<h.length;p++){var v=h[p],g=v.chain.length;if(!(g>o)){for(var y=!0,M=0,_=0;_<g;_++){for(;t[e+M+(1+_)]==-1;)M++;v.chain[_]!=t[e+M+(1+_)]&&(y=!1)}if(y){for(t[e]=v.nglyph,_=0;_<g+M;_++)t[e+_+1]=-1;break}}}else if(n.ltype==5&&d.fmt==2)for(var m=r._lctf.getInterval(d.cDef,t[e]),b=d.cDef[m+2],k=d.scset[b],A=0;A<k.length;A++){var T=k[A],C=T.input;if(!(C.length>o)){for(y=!0,_=0;_<C.length;_++){var L=r._lctf.getInterval(d.cDef,t[e+1+_]);if(m==-1&&d.cDef[L+2]!=C[_]){y=!1;break}}if(y){var P=T.substLookupRecords;for(p=0;p<P.length;p+=2)P[p],P[p+1]}}}else if(n.ltype==6&&d.fmt==3){if(!r.U._glsCovered(t,d.backCvg,e-d.backCvg.length)||!r.U._glsCovered(t,d.inptCvg,e)||!r.U._glsCovered(t,d.ahedCvg,e+d.inptCvg.length))continue;var H=d.lookupRec;for(A=0;A<H.length;A+=2){m=H[A];var S=a[H[A+1]];r.U._applySubs(t,e+m,S,a)}}}}},r.U._glsCovered=function(t,e,n){for(var a=0;a<e.length;a++)if(r._lctf.coverageIndex(e[a],t[n+a])==-1)return!1;return!0},r.U.glyphsToPath=function(t,e,n){for(var a={cmds:[],crds:[]},o=0,i=0;i<e.length;i++){var f=e[i];if(f!=-1){for(var d=i<e.length-1&&e[i+1]!=-1?e[i+1]:0,h=r.U.glyphToPath(t,f),p=0;p<h.crds.length;p+=2)a.crds.push(h.crds[p]+o),a.crds.push(h.crds[p+1]);for(n&&a.cmds.push(n),p=0;p<h.cmds.length;p++)a.cmds.push(h.cmds[p]);n&&a.cmds.push("X"),o+=t.hmtx.aWidth[f],i<e.length-1&&(o+=r.U.getPairAdjustment(t,f,d))}}return a},r.U.P={},r.U.P.moveTo=function(t,e,n){t.cmds.push("M"),t.crds.push(e,n)},r.U.P.lineTo=function(t,e,n){t.cmds.push("L"),t.crds.push(e,n)},r.U.P.curveTo=function(t,e,n,a,o,i,f){t.cmds.push("C"),t.crds.push(e,n,a,o,i,f)},r.U.P.qcurveTo=function(t,e,n,a,o){t.cmds.push("Q"),t.crds.push(e,n,a,o)},r.U.P.closePath=function(t){t.cmds.push("Z")},r.U._drawCFF=function(t,e,n,a,o){for(var i=e.stack,f=e.nStems,d=e.haveWidth,h=e.width,p=e.open,v=0,g=e.x,y=e.y,M=0,_=0,m=0,b=0,k=0,A=0,T=0,C=0,L=0,P=0,H={val:0,size:0};v<t.length;){r.CFF.getCharString(t,v,H);var S=H.val;if(v+=H.size,S=="o1"||S=="o18")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0;else if(S=="o3"||S=="o23")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0;else if(S=="o4")i.length>1&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),p&&r.U.P.closePath(o),y+=i.pop(),r.U.P.moveTo(o,g,y),p=!0;else if(S=="o5")for(;i.length>0;)g+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,g,y);else if(S=="o6"||S=="o7")for(var F=i.length,E=S=="o6",Y=0;Y<F;Y++){var N=i.shift();E?g+=N:y+=N,E=!E,r.U.P.lineTo(o,g,y)}else if(S=="o8"||S=="o24"){F=i.length;for(var K=0;K+6<=F;)M=g+i.shift(),_=y+i.shift(),m=M+i.shift(),b=_+i.shift(),g=m+i.shift(),y=b+i.shift(),r.U.P.curveTo(o,M,_,m,b,g,y),K+=6;S=="o24"&&(g+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,g,y))}else{if(S=="o11")break;if(S=="o1234"||S=="o1235"||S=="o1236"||S=="o1237")S=="o1234"&&(_=y,m=(M=g+i.shift())+i.shift(),P=b=_+i.shift(),A=b,C=y,g=(T=(k=(L=m+i.shift())+i.shift())+i.shift())+i.shift(),r.U.P.curveTo(o,M,_,m,b,L,P),r.U.P.curveTo(o,k,A,T,C,g,y)),S=="o1235"&&(M=g+i.shift(),_=y+i.shift(),m=M+i.shift(),b=_+i.shift(),L=m+i.shift(),P=b+i.shift(),k=L+i.shift(),A=P+i.shift(),T=k+i.shift(),C=A+i.shift(),g=T+i.shift(),y=C+i.shift(),i.shift(),r.U.P.curveTo(o,M,_,m,b,L,P),r.U.P.curveTo(o,k,A,T,C,g,y)),S=="o1236"&&(M=g+i.shift(),_=y+i.shift(),m=M+i.shift(),P=b=_+i.shift(),A=b,T=(k=(L=m+i.shift())+i.shift())+i.shift(),C=A+i.shift(),g=T+i.shift(),r.U.P.curveTo(o,M,_,m,b,L,P),r.U.P.curveTo(o,k,A,T,C,g,y)),S=="o1237"&&(M=g+i.shift(),_=y+i.shift(),m=M+i.shift(),b=_+i.shift(),L=m+i.shift(),P=b+i.shift(),k=L+i.shift(),A=P+i.shift(),T=k+i.shift(),C=A+i.shift(),Math.abs(T-g)>Math.abs(C-y)?g=T+i.shift():y=C+i.shift(),r.U.P.curveTo(o,M,_,m,b,L,P),r.U.P.curveTo(o,k,A,T,C,g,y));else if(S=="o14"){if(i.length>0&&!d&&(h=i.shift()+n.nominalWidthX,d=!0),i.length==4){var ae=i.shift(),O=i.shift(),z=i.shift(),w=i.shift(),j=r.CFF.glyphBySE(n,z),U=r.CFF.glyphBySE(n,w);r.U._drawCFF(n.CharStrings[j],e,n,a,o),e.x=ae,e.y=O,r.U._drawCFF(n.CharStrings[U],e,n,a,o)}p&&(r.U.P.closePath(o),p=!1)}else if(S=="o19"||S=="o20")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0,v+=f+7>>3;else if(S=="o21")i.length>2&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),y+=i.pop(),g+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,g,y),p=!0;else if(S=="o22")i.length>1&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),g+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,g,y),p=!0;else if(S=="o25"){for(;i.length>6;)g+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,g,y);M=g+i.shift(),_=y+i.shift(),m=M+i.shift(),b=_+i.shift(),g=m+i.shift(),y=b+i.shift(),r.U.P.curveTo(o,M,_,m,b,g,y)}else if(S=="o26")for(i.length%2&&(g+=i.shift());i.length>0;)M=g,_=y+i.shift(),g=m=M+i.shift(),y=(b=_+i.shift())+i.shift(),r.U.P.curveTo(o,M,_,m,b,g,y);else if(S=="o27")for(i.length%2&&(y+=i.shift());i.length>0;)_=y,m=(M=g+i.shift())+i.shift(),b=_+i.shift(),g=m+i.shift(),y=b,r.U.P.curveTo(o,M,_,m,b,g,y);else if(S=="o10"||S=="o29"){var I=S=="o10"?a:n;if(i.length!=0){var R=i.pop(),W=I.Subrs[R+I.Bias];e.x=g,e.y=y,e.nStems=f,e.haveWidth=d,e.width=h,e.open=p,r.U._drawCFF(W,e,n,a,o),g=e.x,y=e.y,f=e.nStems,d=e.haveWidth,h=e.width,p=e.open}}else if(S=="o30"||S=="o31"){var D=i.length,B=(K=0,S=="o31");for(K+=D-(F=-3&D);K<F;)B?(_=y,m=(M=g+i.shift())+i.shift(),y=(b=_+i.shift())+i.shift(),F-K==5?(g=m+i.shift(),K++):g=m,B=!1):(M=g,_=y+i.shift(),m=M+i.shift(),b=_+i.shift(),g=m+i.shift(),F-K==5?(y=b+i.shift(),K++):y=b,B=!0),r.U.P.curveTo(o,M,_,m,b,g,y),K+=4}else{if((S+"").charAt(0)=="o")throw S;i.push(S)}}}e.x=g,e.y=y,e.nStems=f,e.haveWidth=d,e.width=h,e.open=p};var s=r,c={Typr:s};return l.Typr=s,l.default=c,Object.defineProperty(l,"__esModule",{value:!0}),l}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function xs(){return function(l){var r=Uint8Array,s=Uint16Array,c=Uint32Array,t=new r([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),e=new r([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),n=new r([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(S,F){for(var E=new s(31),Y=0;Y<31;++Y)E[Y]=F+=1<<S[Y-1];var N=new c(E[30]);for(Y=1;Y<30;++Y)for(var K=E[Y];K<E[Y+1];++K)N[K]=K-E[Y]<<5|Y;return[E,N]},o=a(t,2),i=o[0],f=o[1];i[28]=258,f[258]=28;for(var d=a(e,0)[0],h=new s(32768),p=0;p<32768;++p){var v=(43690&p)>>>1|(21845&p)<<1;v=(61680&(v=(52428&v)>>>2|(13107&v)<<2))>>>4|(3855&v)<<4,h[p]=((65280&v)>>>8|(255&v)<<8)>>>1}var g=function(S,F,E){for(var Y=S.length,N=0,K=new s(F);N<Y;++N)++K[S[N]-1];var ae,O=new s(F);for(N=0;N<F;++N)O[N]=O[N-1]+K[N-1]<<1;{ae=new s(1<<F);var z=15-F;for(N=0;N<Y;++N)if(S[N])for(var w=N<<4|S[N],j=F-S[N],U=O[S[N]-1]++<<j,I=U|(1<<j)-1;U<=I;++U)ae[h[U]>>>z]=w}return ae},y=new r(288);for(p=0;p<144;++p)y[p]=8;for(p=144;p<256;++p)y[p]=9;for(p=256;p<280;++p)y[p]=7;for(p=280;p<288;++p)y[p]=8;var M=new r(32);for(p=0;p<32;++p)M[p]=5;var _=g(y,9),m=g(M,5),b=function(S){for(var F=S[0],E=1;E<S.length;++E)S[E]>F&&(F=S[E]);return F},k=function(S,F,E){var Y=F/8|0;return(S[Y]|S[Y+1]<<8)>>(7&F)&E},A=function(S,F){var E=F/8|0;return(S[E]|S[E+1]<<8|S[E+2]<<16)>>(7&F)},T=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],C=function(S,F,E){var Y=new Error(F||T[S]);if(Y.code=S,Error.captureStackTrace&&Error.captureStackTrace(Y,C),!E)throw Y;return Y},L=function(S,F,E){var Y=S.length;if(!Y||E&&!E.l&&Y<5)return F||new r(0);var N=!F||E,K=!E||E.i;E||(E={}),F||(F=new r(3*Y));var ae,O=function(fe){var Le=F.length;if(fe>Le){var Ue=new r(Math.max(2*Le,fe));Ue.set(F),F=Ue}},z=E.f||0,w=E.p||0,j=E.b||0,U=E.l,I=E.d,R=E.m,W=E.n,D=8*Y;do{if(!U){E.f=z=k(S,w,1);var B=k(S,w+1,3);if(w+=3,!B){var Q=S[(ee=((ae=w)/8|0)+(7&ae&&1)+4)-4]|S[ee-3]<<8,te=ee+Q;if(te>Y){K&&C(0);break}N&&O(j+Q),F.set(S.subarray(ee,te),j),E.b=j+=Q,E.p=w=8*te;continue}if(B==1)U=_,I=m,R=9,W=5;else if(B==2){var Z=k(S,w,31)+257,V=k(S,w+10,15)+4,xe=Z+k(S,w+5,31)+1;w+=14;for(var de=new r(xe),$=new r(19),re=0;re<V;++re)$[n[re]]=k(S,w+3*re,7);w+=3*V;var ce=b($),X=(1<<ce)-1,ne=g($,ce);for(re=0;re<xe;){var ee,G=ne[k(S,w,X)];if(w+=15&G,(ee=G>>>4)<16)de[re++]=ee;else{var ve=0,J=0;for(ee==16?(J=3+k(S,w,3),w+=2,ve=de[re-1]):ee==17?(J=3+k(S,w,7),w+=3):ee==18&&(J=11+k(S,w,127),w+=7);J--;)de[re++]=ve}}var ie=de.subarray(0,Z),q=de.subarray(Z);R=b(ie),W=b(q),U=g(ie,R),I=g(q,W)}else C(1);if(w>D){K&&C(0);break}}N&&O(j+131072);for(var Me=(1<<R)-1,oe=(1<<W)-1,se=w;;se=w){var ue=(ve=U[A(S,w)&Me])>>>4;if((w+=15&ve)>D){K&&C(0);break}if(ve||C(2),ue<256)F[j++]=ue;else{if(ue==256){se=w,U=null;break}var ge=ue-254;if(ue>264){var ke=t[re=ue-257];ge=k(S,w,(1<<ke)-1)+i[re],w+=ke}var Ee=I[A(S,w)&oe],we=Ee>>>4;if(Ee||C(3),w+=15&Ee,q=d[we],we>3&&(ke=e[we],q+=A(S,w)&(1<<ke)-1,w+=ke),w>D){K&&C(0);break}N&&O(j+131072);for(var be=j+ge;j<be;j+=4)F[j]=F[j-q],F[j+1]=F[j+1-q],F[j+2]=F[j+2-q],F[j+3]=F[j+3-q];j=be}}E.l=U,E.p=se,E.b=j,U&&(z=1,E.m=R,E.d=I,E.n=W)}while(!z);return j==F.length?F:function(fe,Le,Ue){(Ue==null||Ue>fe.length)&&(Ue=fe.length);var qe=new(fe instanceof s?s:fe instanceof c?c:r)(Ue-Le);return qe.set(fe.subarray(Le,Ue)),qe}(F,0,j)},P=new r(0),H=typeof TextDecoder<"u"&&new TextDecoder;try{H.decode(P,{stream:!0})}catch{}return l.convert_streams=function(S){var F=new DataView(S),E=0;function Y(){var Z=F.getUint16(E);return E+=2,Z}function N(){var Z=F.getUint32(E);return E+=4,Z}function K(Z){Q.setUint16(te,Z),te+=2}function ae(Z){Q.setUint32(te,Z),te+=4}for(var O={signature:N(),flavor:N(),length:N(),numTables:Y(),reserved:Y(),totalSfntSize:N(),majorVersion:Y(),minorVersion:Y(),metaOffset:N(),metaLength:N(),metaOrigLength:N(),privOffset:N(),privLength:N()},z=0;Math.pow(2,z)<=O.numTables;)z++;z--;for(var w=16*Math.pow(2,z),j=16*O.numTables-w,U=12,I=[],R=0;R<O.numTables;R++)I.push({tag:N(),offset:N(),compLength:N(),origLength:N(),origChecksum:N()}),U+=16;var W,D=new Uint8Array(12+16*I.length+I.reduce(function(Z,V){return Z+V.origLength+4},0)),B=D.buffer,Q=new DataView(B),te=0;return ae(O.flavor),K(O.numTables),K(w),K(z),K(j),I.forEach(function(Z){ae(Z.tag),ae(Z.origChecksum),ae(U),ae(Z.origLength),Z.outOffset=U,(U+=Z.origLength)%4!=0&&(U+=4-U%4)}),I.forEach(function(Z){var V,xe=S.slice(Z.offset,Z.offset+Z.compLength);if(Z.compLength!=Z.origLength){var de=new Uint8Array(Z.origLength);V=new Uint8Array(xe,2),L(V,de)}else de=new Uint8Array(xe);D.set(de,Z.outOffset);var $=0;(U=Z.outOffset+Z.origLength)%4!=0&&($=4-U%4),D.set(new Uint8Array($).buffer,Z.outOffset+Z.origLength),W=U+$}),B.slice(0,W)},Object.defineProperty(l,"__esModule",{value:!0}),l}({}).convert_streams}function ws(l,r){const s={M:2,L:2,Q:4,C:6,Z:0},c={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},t=1,e=2,n=4,a=8,o=16,i=32;let f;function d(T){if(!f){const C={R:e,L:t,D:n,C:o,U:i,T:a};f=new Map;for(let L in c){let P=0;c[L].split(",").forEach(H=>{let[S,F]=H.split("+");S=parseInt(S,36),F=F?parseInt(F,36):0,f.set(P+=S,C[L]);for(let E=F;E--;)f.set(++P,C[L])})}}return f.get(T)||i}const h=1,p=2,v=3,g=4,y=[null,"isol","init","fina","medi"];function M(T){const C=new Uint8Array(T.length);let L=i,P=h,H=-1;for(let S=0;S<T.length;S++){const F=T.codePointAt(S);let E=d(F)|0,Y=h;E&a||(L&(t|n|o)?E&(e|n|o)?(Y=v,(P===h||P===v)&&C[H]++):E&(t|i)&&(P===p||P===g)&&C[H]--:L&(e|i)&&(P===p||P===g)&&C[H]--,P=C[S]=Y,L=E,H=S,F>65535&&S++)}return C}function _(T,C){const L=[];for(let H=0;H<C.length;H++){const S=C.codePointAt(H);S>65535&&H++,L.push(l.U.codeToGlyph(T,S))}const P=T.GSUB;if(P){const{lookupList:H,featureList:S}=P;let F;const E=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,Y=[];S.forEach(N=>{if(E.test(N.tag))for(let K=0;K<N.tab.length;K++){if(Y[N.tab[K]])continue;Y[N.tab[K]]=!0;const ae=H[N.tab[K]],O=/^(isol|init|fina|medi)$/.test(N.tag);O&&!F&&(F=M(C));for(let z=0;z<L.length;z++)(!F||!O||y[F[z]]===N.tag)&&l.U._applySubs(L,z,ae,H)}})}return L}function m(T,C){const L=new Int16Array(C.length*3);let P=0;for(;P<C.length;P++){const E=C[P];if(E===-1)continue;L[P*3+2]=T.hmtx.aWidth[E];const Y=T.GPOS;if(Y){const N=Y.lookupList;for(let K=0;K<N.length;K++){const ae=N[K];for(let O=0;O<ae.tabs.length;O++){const z=ae.tabs[O];if(ae.ltype===1){if(l._lctf.coverageIndex(z.coverage,E)!==-1&&z.pos){F(z.pos,P);break}}else if(ae.ltype===2){let w=null,j=H();if(j!==-1){const U=l._lctf.coverageIndex(z.coverage,C[j]);if(U!==-1){if(z.fmt===1){const I=z.pairsets[U];for(let R=0;R<I.length;R++)I[R].gid2===E&&(w=I[R])}else if(z.fmt===2){const I=l.U._getGlyphClass(C[j],z.classDef1),R=l.U._getGlyphClass(E,z.classDef2);w=z.matrix[I][R]}if(w){w.val1&&F(w.val1,j),w.val2&&F(w.val2,P);break}}}}else if(ae.ltype===4){const w=l._lctf.coverageIndex(z.markCoverage,E);if(w!==-1){const j=H(S),U=j===-1?-1:l._lctf.coverageIndex(z.baseCoverage,C[j]);if(U!==-1){const I=z.markArray[w],R=z.baseArray[U][I.markClass];L[P*3]=R.x-I.x+L[j*3]-L[j*3+2],L[P*3+1]=R.y-I.y+L[j*3+1];break}}}else if(ae.ltype===6){const w=l._lctf.coverageIndex(z.mark1Coverage,E);if(w!==-1){const j=H();if(j!==-1){const U=C[j];if(b(T,U)===3){const I=l._lctf.coverageIndex(z.mark2Coverage,U);if(I!==-1){const R=z.mark1Array[w],W=z.mark2Array[I][R.markClass];L[P*3]=W.x-R.x+L[j*3]-L[j*3+2],L[P*3+1]=W.y-R.y+L[j*3+1];break}}}}}}}}else if(T.kern&&!T.cff){const N=H();if(N!==-1){const K=T.kern.glyph1.indexOf(C[N]);if(K!==-1){const ae=T.kern.rval[K].glyph2.indexOf(E);ae!==-1&&(L[N*3+2]+=T.kern.rval[K].vals[ae])}}}}return L;function H(E){for(let Y=P-1;Y>=0;Y--)if(C[Y]!==-1&&(!E||E(C[Y])))return Y;return-1}function S(E){return b(T,E)===1}function F(E,Y){for(let N=0;N<3;N++)L[Y*3+N]+=E[N]||0}}function b(T,C){const L=T.GDEF&&T.GDEF.glyphClassDef;return L?l.U._getGlyphClass(C,L):0}function k(...T){for(let C=0;C<T.length;C++)if(typeof T[C]=="number")return T[C]}function A(T){const C=Object.create(null),L=T["OS/2"],P=T.hhea,H=T.head.unitsPerEm,S=k(L&&L.sTypoAscender,P&&P.ascender,H),F={unitsPerEm:H,ascender:S,descender:k(L&&L.sTypoDescender,P&&P.descender,0),capHeight:k(L&&L.sCapHeight,S),xHeight:k(L&&L.sxHeight,S),lineGap:k(L&&L.sTypoLineGap,P&&P.lineGap),supportsCodePoint(E){return l.U.codeToGlyph(T,E)>0},forEachGlyph(E,Y,N,K){let ae=0;const O=1/F.unitsPerEm*Y,z=_(T,E);let w=0;const j=m(T,z);return z.forEach((U,I)=>{if(U!==-1){let R=C[U];if(!R){const{cmds:W,crds:D}=l.U.glyphToPath(T,U);let B="",Q=0;for(let de=0,$=W.length;de<$;de++){const re=s[W[de]];B+=W[de];for(let ce=1;ce<=re;ce++)B+=(ce>1?",":"")+D[Q++]}let te,Z,V,xe;if(D.length){te=Z=1/0,V=xe=-1/0;for(let de=0,$=D.length;de<$;de+=2){let re=D[de],ce=D[de+1];re<te&&(te=re),ce<Z&&(Z=ce),re>V&&(V=re),ce>xe&&(xe=ce)}}else te=V=Z=xe=0;R=C[U]={index:U,advanceWidth:T.hmtx.aWidth[U],xMin:te,yMin:Z,xMax:V,yMax:xe,path:B}}K.call(null,R,ae+j[I*3]*O,j[I*3+1]*O,w),ae+=j[I*3+2]*O,N&&(ae+=N*Y)}w+=E.codePointAt(w)>65535?2:1}),ae}};return F}return function(C){const L=new Uint8Array(C,0,4),P=l._bin.readASCII(L,0,4);if(P==="wOFF")C=r(C);else if(P==="wOF2")throw new Error("woff2 fonts not supported");return A(l.parse(C)[0])}}const bs=Ht({name:"Typr Font Parser",dependencies:[ys,xs,ws],init(l,r,s){const c=l(),t=r();return s(c,t)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function Ss(){return function(l){var r=function(){this.buckets=new Map};r.prototype.add=function(m){var b=m>>5;this.buckets.set(b,(this.buckets.get(b)||0)|1<<(31&m))},r.prototype.has=function(m){var b=this.buckets.get(m>>5);return b!==void 0&&(b&1<<(31&m))!=0},r.prototype.serialize=function(){var m=[];return this.buckets.forEach(function(b,k){m.push((+k).toString(36)+":"+b.toString(36))}),m.join(",")},r.prototype.deserialize=function(m){var b=this;this.buckets.clear(),m.split(",").forEach(function(k){var A=k.split(":");b.buckets.set(parseInt(A[0],36),parseInt(A[1],36))})};var s=Math.pow(2,8),c=s-1,t=~c;function e(m){var b=function(A){return A&t}(m).toString(16),k=function(A){return(A&t)+s-1}(m).toString(16);return"codepoint-index/plane"+(m>>16)+"/"+b+"-"+k+".json"}function n(m,b){var k=m&c,A=b.codePointAt(k/6|0);return((A=(A||48)-48)&1<<k%6)!=0}function a(m,b){var k;(k=m,k.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(A){return A.split("-").map(function(T){return parseInt(T.trim(),16)})})).forEach(function(A){var T=A[0],C=A[1];C===void 0&&(C=T),b(T,C)})}function o(m,b){a(m,function(k,A){for(var T=k;T<=A;T++)b(T)})}var i={},f={},d=new WeakMap,h="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function p(m){var b=d.get(m);return b||(b=new r,o(m.ranges,function(k){return b.add(k)}),d.set(m,b)),b}var v,g=new Map;function y(m,b,k){return m[b]?b:m[k]?k:function(A){for(var T in A)return T}(m)}function M(m,b){var k=b;if(!m.includes(k)){k=1/0;for(var A=0;A<m.length;A++)Math.abs(m[A]-b)<Math.abs(k-b)&&(k=m[A])}return k}function _(m){return v||(v=new Set,o("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(b){v.add(b)})),v.has(m)}return l.CodePointSet=r,l.clearCache=function(){i={},f={}},l.getFontsForString=function(m,b){b===void 0&&(b={});var k,A=b.lang;A===void 0&&(A=new RegExp("\\p{Script=Hangul}","u").test(k=m)?"ko":new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}","u").test(k)?"ja":"en");var T=b.category;T===void 0&&(T="sans-serif");var C=b.style;C===void 0&&(C="normal");var L=b.weight;L===void 0&&(L=400);var P=(b.dataUrl||h).replace(/\/$/g,""),H=new Map,S=new Uint8Array(m.length),F={},E={},Y=new Array(m.length),N=new Map,K=!1;function ae(w){var j=g.get(w);return j||(j=fetch(P+"/"+w).then(function(U){if(!U.ok)throw new Error(U.statusText);return U.json().then(function(I){if(!Array.isArray(I)||I[0]!==1)throw new Error("Incorrect schema version; need 1, got "+I[0]);return I[1]})}).catch(function(U){if(P!==h)return K||(K=!0),P=h,g.delete(w),ae(w);throw U}),g.set(w,j)),j}for(var O=function(w){var j=m.codePointAt(w),U=e(j);Y[w]=U,i[U]||N.has(U)||N.set(U,ae(U).then(function(I){i[U]=I})),j>65535&&(w++,z=w)},z=0;z<m.length;z++)O(z);return Promise.all(N.values()).then(function(){N.clear();for(var w=function(U){var I=m.codePointAt(U),R=null,W=i[Y[U]],D=void 0;for(var B in W){var Q=E[B];if(Q===void 0&&(Q=E[B]=new RegExp(B).test(A||"en")),Q){for(var te in D=B,W[B])if(n(I,W[B][te])){R=te;break}break}}if(!R){e:for(var Z in W)if(Z!==D){for(var V in W[Z])if(n(I,W[Z][V])){R=V;break e}}}R||(R="latin"),Y[U]=R,f[R]||N.has(R)||N.set(R,ae("font-meta/"+R+".json").then(function(xe){f[R]=xe})),I>65535&&(U++,j=U)},j=0;j<m.length;j++)w(j);return Promise.all(N.values())}).then(function(){for(var w,j=null,U=0;U<m.length;U++){var I=m.codePointAt(U);if(j&&(_(I)||p(j).has(I)))S[U]=S[U-1];else{j=f[Y[U]];var R=F[j.id];if(!R){var W=j.typeforms,D=y(W,T,"sans-serif"),B=y(W[D],C,"normal"),Q=M((w=W[D])===null||w===void 0?void 0:w[B],L);R=F[j.id]=P+"/font-files/"+j.id+"/"+D+"."+B+"."+Q+".woff"}var te=H.get(R);te==null&&(te=H.size,H.set(R,te)),S[U]=te}I>65535&&(U++,S[U]=S[U-1])}return{fontUrls:Array.from(H.keys()),chars:S}})},Object.defineProperty(l,"__esModule",{value:!0}),l}({})}function Ms(l,r){const s=Object.create(null),c=Object.create(null);function t(n,a){const o=i=>{};try{const i=new XMLHttpRequest;i.open("get",n,!0),i.responseType="arraybuffer",i.onload=function(){if(i.status>=400)o(new Error(i.statusText));else if(i.status>0)try{const f=l(i.response);f.src=n,a(f)}catch(f){o(f)}},i.onerror=o,i.send()}catch(i){o(i)}}function e(n,a){let o=s[n];o?a(o):c[n]?c[n].push(a):(c[n]=[a],t(n,i=>{i.src=n,s[n]=i,c[n].forEach(f=>f(i)),delete c[n]}))}return function(n,a,{lang:o,fonts:i=[],style:f="normal",weight:d="normal",unicodeFontsURL:h}={}){const p=new Uint8Array(n.length),v=[];n.length||_();const g=new Map,y=[];if(f!=="italic"&&(f="normal"),typeof d!="number"&&(d=d==="bold"?700:400),i&&!Array.isArray(i)&&(i=[i]),i=i.slice().filter(b=>!b.lang||b.lang.test(o)).reverse(),i.length){let T=0;(function C(L=0){for(let P=L,H=n.length;P<H;P++){const S=n.codePointAt(P);if(T===1&&v[p[P-1]].supportsCodePoint(S)||/\s/.test(n[P]))p[P]=p[P-1],T===2&&(y[y.length-1][1]=P);else for(let F=p[P],E=i.length;F<=E;F++)if(F===E){const Y=T===2?y[y.length-1]:y[y.length]=[P,P];Y[1]=P,T=2}else{p[P]=F;const{src:Y,unicodeRange:N}=i[F];if(!N||m(S,N)){const K=s[Y];if(!K){e(Y,()=>{C(P)});return}if(K.supportsCodePoint(S)){let ae=g.get(K);typeof ae!="number"&&(ae=v.length,v.push(K),g.set(K,ae)),p[P]=ae,T=1;break}}}S>65535&&P+1<H&&(p[P+1]=p[P],P++,T===2&&(y[y.length-1][1]=P))}M()})()}else y.push([0,n.length-1]),M();function M(){if(y.length){const b=y.map(k=>n.substring(k[0],k[1]+1)).join(`
`);r.getFontsForString(b,{lang:o||void 0,style:f,weight:d,dataUrl:h}).then(({fontUrls:k,chars:A})=>{const T=v.length;let C=0;y.forEach(P=>{for(let H=0,S=P[1]-P[0];H<=S;H++)p[P[0]+H]=A[C++]+T;C++});let L=0;k.forEach((P,H)=>{e(P,S=>{v[H+T]=S,++L===k.length&&_()})})})}else _()}function _(){a({chars:p,fonts:v})}function m(b,k){for(let A=0;A<k.length;A++){const[T,C=T]=k[A];if(T<=b&&b<=C)return!0}return!1}}}const _s=Ht({name:"FontResolver",dependencies:[Ms,bs,Ss],init(l,r,s){return l(r,s())}});function Ts(l,r){const c=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,t="[^\\S\\u00A0]",e=new RegExp(`${t}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function n({text:v,lang:g,fonts:y,style:M,weight:_,preResolvedFonts:m,unicodeFontsURL:b},k){const A=({chars:T,fonts:C})=>{let L,P;const H=[];for(let S=0;S<T.length;S++)T[S]!==P?(P=T[S],H.push(L={start:S,end:S,fontObj:C[T[S]]})):L.end=S;k(H)};m?A(m):l(v,A,{lang:g,fonts:y,style:M,weight:_,unicodeFontsURL:b})}function a({text:v="",font:g,lang:y,sdfGlyphSize:M=64,fontSize:_=400,fontWeight:m=1,fontStyle:b="normal",letterSpacing:k=0,lineHeight:A="normal",maxWidth:T=1/0,direction:C,textAlign:L="left",textIndent:P=0,whiteSpace:H="normal",overflowWrap:S="normal",anchorX:F=0,anchorY:E=0,metricsOnly:Y=!1,unicodeFontsURL:N,preResolvedFonts:K=null,includeCaretPositions:ae=!1,chunkedBoundsSize:O=8192,colorRanges:z=null},w){const j=d(),U={fontLoad:0,typesetting:0};v.indexOf("\r")>-1&&(v=v.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),_=+_,k=+k,T=+T,A=A||"normal",P=+P,n({text:v,lang:y,style:b,weight:m,fonts:typeof g=="string"?[{src:g}]:g,unicodeFontsURL:N,preResolvedFonts:K},I=>{U.fontLoad=d()-j;const R=isFinite(T);let W=null,D=null,B=null,Q=null,te=null,Z=null,V=null,xe=null,de=0,$=0,re=H!=="nowrap";const ce=new Map,X=d();let ne=P,ee=0,G=new h;const ve=[G];I.forEach(oe=>{const{fontObj:se}=oe,{ascender:ue,descender:ge,unitsPerEm:ke,lineGap:Ee,capHeight:we,xHeight:be}=se;let fe=ce.get(se);if(!fe){const pe=_/ke,_e=A==="normal"?(ue-ge+Ee)*pe:A*_,yt=(_e-(ue-ge)*pe)/2,Te=Math.min(_e,(ue-ge)*pe),Se=(ue+ge)/2*pe+Te/2;fe={index:ce.size,src:se.src,fontObj:se,fontSizeMult:pe,unitsPerEm:ke,ascender:ue*pe,descender:ge*pe,capHeight:we*pe,xHeight:be*pe,lineHeight:_e,baseline:-yt-ue*pe,caretTop:Se,caretBottom:Se-Te},ce.set(se,fe)}const{fontSizeMult:Le}=fe,Ue=v.slice(oe.start,oe.end+1);let qe,Ce;se.forEachGlyph(Ue,_,k,(pe,_e,yt,Te)=>{_e+=ee,Te+=oe.start,qe=_e,Ce=pe;const Se=v.charAt(Te),Fe=pe.advanceWidth*Le,Ae=G.count;let ye;if("isEmpty"in pe||(pe.isWhitespace=!!Se&&new RegExp(t).test(Se),pe.canBreakAfter=!!Se&&e.test(Se),pe.isEmpty=pe.xMin===pe.xMax||pe.yMin===pe.yMax||c.test(Se)),!pe.isWhitespace&&!pe.isEmpty&&$++,re&&R&&!pe.isWhitespace&&_e+Fe+ne>T&&Ae){if(G.glyphAt(Ae-1).glyphObj.canBreakAfter)ye=new h,ne=-_e;else for(let Xe=Ae;Xe--;)if(Xe===0&&S==="break-word"){ye=new h,ne=-_e;break}else if(G.glyphAt(Xe).glyphObj.canBreakAfter){ye=G.splitAt(Xe+1);const Ve=ye.glyphAt(0).x;ne-=Ve;for(let ze=ye.count;ze--;)ye.glyphAt(ze).x-=Ve;break}ye&&(G.isSoftWrapped=!0,G=ye,ve.push(G),de=T)}let Re=G.glyphAt(G.count);Re.glyphObj=pe,Re.x=_e+ne,Re.y=yt,Re.width=Fe,Re.charIndex=Te,Re.fontData=fe,Se===`
`&&(G=new h,ve.push(G),ne=-(_e+Fe+k*_)+P)}),ee=qe+Ce.advanceWidth*Le+k*_});let J=0;ve.forEach(oe=>{let se=!0;for(let ue=oe.count;ue--;){const ge=oe.glyphAt(ue);se&&!ge.glyphObj.isWhitespace&&(oe.width=ge.x+ge.width,oe.width>de&&(de=oe.width),se=!1);let{lineHeight:ke,capHeight:Ee,xHeight:we,baseline:be}=ge.fontData;ke>oe.lineHeight&&(oe.lineHeight=ke);const fe=be-oe.baseline;fe<0&&(oe.baseline+=fe,oe.cap+=fe,oe.ex+=fe),oe.cap=Math.max(oe.cap,oe.baseline+Ee),oe.ex=Math.max(oe.ex,oe.baseline+we)}oe.baseline-=J,oe.cap-=J,oe.ex-=J,J+=oe.lineHeight});let ie=0,q=0;if(F&&(typeof F=="number"?ie=-F:typeof F=="string"&&(ie=-de*(F==="left"?0:F==="center"?.5:F==="right"?1:i(F)))),E&&(typeof E=="number"?q=-E:typeof E=="string"&&(q=E==="top"?0:E==="top-baseline"?-ve[0].baseline:E==="top-cap"?-ve[0].cap:E==="top-ex"?-ve[0].ex:E==="middle"?J/2:E==="bottom"?J:E==="bottom-baseline"?-ve[ve.length-1].baseline:i(E)*J)),!Y){const oe=r.getEmbeddingLevels(v,C);W=new Uint16Array($),D=new Uint8Array($),B=new Float32Array($*2),Q={},V=[1/0,1/0,-1/0,-1/0],xe=[],ae&&(Z=new Float32Array(v.length*4)),z&&(te=new Uint8Array($*3));let se=0,ue=-1,ge=-1,ke,Ee;if(ve.forEach((we,be)=>{let{count:fe,width:Le}=we;if(fe>0){let Ue=0;for(let Te=fe;Te--&&we.glyphAt(Te).glyphObj.isWhitespace;)Ue++;let qe=0,Ce=0;if(L==="center")qe=(de-Le)/2;else if(L==="right")qe=de-Le;else if(L==="justify"&&we.isSoftWrapped){let Te=0;for(let Se=fe-Ue;Se--;)we.glyphAt(Se).glyphObj.isWhitespace&&Te++;Ce=(de-Le)/Te}if(Ce||qe){let Te=0;for(let Se=0;Se<fe;Se++){let Fe=we.glyphAt(Se);const Ae=Fe.glyphObj;Fe.x+=qe+Te,Ce!==0&&Ae.isWhitespace&&Se<fe-Ue&&(Te+=Ce,Fe.width+=Ce)}}const pe=r.getReorderSegments(v,oe,we.glyphAt(0).charIndex,we.glyphAt(we.count-1).charIndex);for(let Te=0;Te<pe.length;Te++){const[Se,Fe]=pe[Te];let Ae=1/0,ye=-1/0;for(let Re=0;Re<fe;Re++)if(we.glyphAt(Re).charIndex>=Se){let Xe=Re,Ve=Re;for(;Ve<fe;Ve++){let ze=we.glyphAt(Ve);if(ze.charIndex>Fe)break;Ve<fe-Ue&&(Ae=Math.min(Ae,ze.x),ye=Math.max(ye,ze.x+ze.width))}for(let ze=Xe;ze<Ve;ze++){const rt=we.glyphAt(ze);rt.x=ye-(rt.x+rt.width-Ae)}break}}let _e;const yt=Te=>_e=Te;for(let Te=0;Te<fe;Te++){const Se=we.glyphAt(Te);_e=Se.glyphObj;const Fe=_e.index,Ae=oe.levels[Se.charIndex]&1;if(Ae){const ye=r.getMirroredCharacter(v[Se.charIndex]);ye&&Se.fontData.fontObj.forEachGlyph(ye,0,0,yt)}if(ae){const{charIndex:ye,fontData:Re}=Se,Xe=Se.x+ie,Ve=Se.x+Se.width+ie;Z[ye*4]=Ae?Ve:Xe,Z[ye*4+1]=Ae?Xe:Ve,Z[ye*4+2]=we.baseline+Re.caretBottom+q,Z[ye*4+3]=we.baseline+Re.caretTop+q;const ze=ye-ue;ze>1&&f(Z,ue,ze),ue=ye}if(z){const{charIndex:ye}=Se;for(;ye>ge;)ge++,z.hasOwnProperty(ge)&&(Ee=z[ge])}if(!_e.isWhitespace&&!_e.isEmpty){const ye=se++,{fontSizeMult:Re,src:Xe,index:Ve}=Se.fontData,ze=Q[Xe]||(Q[Xe]={});ze[Fe]||(ze[Fe]={path:_e.path,pathBounds:[_e.xMin,_e.yMin,_e.xMax,_e.yMax]});const rt=Se.x+ie,xt=Se.y+we.baseline+q;B[ye*2]=rt,B[ye*2+1]=xt;const pt=rt+_e.xMin*Re,wt=xt+_e.yMin*Re,Mt=rt+_e.xMax*Re,mt=xt+_e.yMax*Re;pt<V[0]&&(V[0]=pt),wt<V[1]&&(V[1]=wt),Mt>V[2]&&(V[2]=Mt),mt>V[3]&&(V[3]=mt),ye%O===0&&(ke={start:ye,end:ye,rect:[1/0,1/0,-1/0,-1/0]},xe.push(ke)),ke.end++;const Ye=ke.rect;if(pt<Ye[0]&&(Ye[0]=pt),wt<Ye[1]&&(Ye[1]=wt),Mt>Ye[2]&&(Ye[2]=Mt),mt>Ye[3]&&(Ye[3]=mt),W[ye]=Fe,D[ye]=Ve,z){const _t=ye*3;te[_t]=Ee>>16&255,te[_t+1]=Ee>>8&255,te[_t+2]=Ee&255}}}}}),Z){const we=v.length-ue;we>1&&f(Z,ue,we)}}const Me=[];ce.forEach(({index:oe,src:se,unitsPerEm:ue,ascender:ge,descender:ke,lineHeight:Ee,capHeight:we,xHeight:be})=>{Me[oe]={src:se,unitsPerEm:ue,ascender:ge,descender:ke,lineHeight:Ee,capHeight:we,xHeight:be}}),U.typesetting=d()-X,w({glyphIds:W,glyphFontIndices:D,glyphPositions:B,glyphData:Q,fontData:Me,caretPositions:Z,glyphColors:te,chunkedBounds:xe,fontSize:_,topBaseline:q+ve[0].baseline,blockBounds:[ie,q-J,ie+de,q],visibleBounds:V,timings:U})})}function o(v,g){a({...v,metricsOnly:!0},y=>{const[M,_,m,b]=y.blockBounds;g({width:m-M,height:b-_})})}function i(v){let g=v.match(/^([\d.]+)%$/),y=g?parseFloat(g[1]):NaN;return isNaN(y)?0:y/100}function f(v,g,y){const M=v[g*4],_=v[g*4+1],m=v[g*4+2],b=v[g*4+3],k=(_-M)/y;for(let A=0;A<y;A++){const T=(g+A)*4;v[T]=M+k*A,v[T+1]=M+k*(A+1),v[T+2]=m,v[T+3]=b}}function d(){return(self.performance||Date).now()}function h(){this.data=[]}const p=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/p.length)},glyphAt(v){let g=h.flyweight;return g.data=this.data,g.index=v,g},splitAt(v){let g=new h;return g.data=this.data.splice(v*p.length),g}},h.flyweight=p.reduce((v,g,y,M)=>(Object.defineProperty(v,g,{get(){return this.data[this.index*p.length+y]},set(_){this.data[this.index*p.length+y]=_}}),v),{data:null,index:0}),{typeset:a,measure:o}}const jt=()=>(self.performance||Date).now(),Wr=_a();let ta;function ks(l,r,s,c,t,e,n,a,o,i,f=!0){return f?js(l,r,s,c,t,e,n,a,o,i).then(null,d=>(ta||(ta=!0),na(l,r,s,c,t,e,n,a,o,i))):na(l,r,s,c,t,e,n,a,o,i)}const Fr=[],Cs=5;let Un=0;function ka(){const l=jt();for(;Fr.length&&jt()-l<Cs;)Fr.shift()();Un=Fr.length?setTimeout(ka,0):0}const js=(...l)=>new Promise((r,s)=>{Fr.push(()=>{const c=jt();try{Wr.webgl.generateIntoCanvas(...l),r({timing:jt()-c})}catch(t){s(t)}}),Un||(Un=setTimeout(ka,0))}),Us=4,As=2e3,ra={};let Rs=0;function na(l,r,s,c,t,e,n,a,o,i){const f="TroikaTextSDFGenerator_JS_"+Rs++%Us;let d=ra[f];return d||(d=ra[f]={workerModule:Ht({name:f,workerId:f,dependencies:[_a,jt],init(h,p){const v=h().javascript.generate;return function(...g){const y=p();return{textureData:v(...g),timing:p()-y}}},getTransferables(h){return[h.textureData.buffer]}}),requests:0,idleTimer:null}),d.requests++,clearTimeout(d.idleTimer),d.workerModule(l,r,s,c,t,e).then(({textureData:h,timing:p})=>{const v=jt(),g=new Uint8Array(h.length*4);for(let y=0;y<h.length;y++)g[y*4+i]=h[y];return Wr.webglUtils.renderImageData(n,g,a,o,l,r,1<<3-i),p+=jt()-v,--d.requests===0&&(d.idleTimer=setTimeout(()=>{ls(f)},As)),{timing:p}})}function Es(l){l._warm||(Wr.webgl.isSupported(l),l._warm=!0)}const Ls=Wr.webglUtils.resizeWebGLCanvasWithoutClearing,fr={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},Ps=new je;function Gt(){return(self.performance||Date).now()}const oa=Object.create(null);function Ca(l,r){l=Ds({},l);const s=Gt(),c=[];if(l.font&&c.push({label:"user",src:zs(l.font)}),l.font=c,l.text=""+l.text,l.sdfGlyphSize=l.sdfGlyphSize||fr.sdfGlyphSize,l.unicodeFontsURL=l.unicodeFontsURL||fr.unicodeFontsURL,l.colorRanges!=null){let d={};for(let h in l.colorRanges)if(l.colorRanges.hasOwnProperty(h)){let p=l.colorRanges[h];typeof p!="number"&&(p=Ps.set(p).getHex()),d[h]=p}l.colorRanges=d}Object.freeze(l);const{textureWidth:t,sdfExponent:e}=fr,{sdfGlyphSize:n}=l,a=t/n*4;let o=oa[n];if(!o){const d=document.createElement("canvas");d.width=t,d.height=n*256/a,o=oa[n]={glyphCount:0,sdfGlyphSize:n,sdfCanvas:d,sdfTexture:new Ka(d,void 0,void 0,void 0,Ir,Ir),contextLost:!1,glyphsByFont:new Map},o.sdfTexture.generateMipmaps=!1,Fs(o)}const{sdfTexture:i,sdfCanvas:f}=o;Bs(l).then(d=>{const{glyphIds:h,glyphFontIndices:p,fontData:v,glyphPositions:g,fontSize:y,timings:M}=d,_=[],m=new Float32Array(h.length*4);let b=0,k=0;const A=Gt(),T=v.map(S=>{let F=o.glyphsByFont.get(S.src);return F||o.glyphsByFont.set(S.src,F=new Map),F});h.forEach((S,F)=>{const E=p[F],{src:Y,unitsPerEm:N}=v[E];let K=T[E].get(S);if(!K){const{path:j,pathBounds:U}=d.glyphData[Y][S],I=Math.max(U[2]-U[0],U[3]-U[1])/n*(fr.sdfMargin*n+.5),R=o.glyphCount++,W=[U[0]-I,U[1]-I,U[2]+I,U[3]+I];T[E].set(S,K={path:j,atlasIndex:R,sdfViewBox:W}),_.push(K)}const{sdfViewBox:ae}=K,O=g[k++],z=g[k++],w=y/N;m[b++]=O+ae[0]*w,m[b++]=z+ae[1]*w,m[b++]=O+ae[2]*w,m[b++]=z+ae[3]*w,h[F]=K.atlasIndex}),M.quads=(M.quads||0)+(Gt()-A);const C=Gt();M.sdf={};const L=f.height,P=Math.ceil(o.glyphCount/a),H=Math.pow(2,Math.ceil(Math.log2(P*n)));H>L&&(Ls(f,t,H),i.dispose()),Promise.all(_.map(S=>ja(S,o,l.gpuAccelerateSDF).then(({timing:F})=>{M.sdf[S.atlasIndex]=F}))).then(()=>{_.length&&!o.contextLost&&(Ua(o),i.needsUpdate=!0),M.sdfTotal=Gt()-C,M.total=Gt()-s,r(Object.freeze({parameters:l,sdfTexture:i,sdfGlyphSize:n,sdfExponent:e,glyphBounds:m,glyphAtlasIndices:h,glyphColors:d.glyphColors,caretPositions:d.caretPositions,chunkedBounds:d.chunkedBounds,ascender:d.ascender,descender:d.descender,lineHeight:d.lineHeight,capHeight:d.capHeight,xHeight:d.xHeight,topBaseline:d.topBaseline,blockBounds:d.blockBounds,visibleBounds:d.visibleBounds,timings:d.timings}))})}),Promise.resolve().then(()=>{o.contextLost||Es(f)})}function ja({path:l,atlasIndex:r,sdfViewBox:s},{sdfGlyphSize:c,sdfCanvas:t,contextLost:e},n){if(e)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:o}=fr,i=Math.max(s[2]-s[0],s[3]-s[1]),f=Math.floor(r/4),d=f%(a/c)*c,h=Math.floor(f/(a/c))*c,p=r%4;return ks(c,c,l,s,i,o,t,d,h,p,n)}function Fs(l){const r=l.sdfCanvas;r.addEventListener("webglcontextlost",s=>{s.preventDefault(),l.contextLost=!0}),r.addEventListener("webglcontextrestored",s=>{l.contextLost=!1;const c=[];l.glyphsByFont.forEach(t=>{t.forEach(e=>{c.push(ja(e,l,!0))})}),Promise.all(c).then(()=>{Ua(l),l.sdfTexture.needsUpdate=!0})})}function Is({font:l,characters:r,sdfGlyphSize:s},c){let t=Array.isArray(r)?r.join(`
`):""+r;Ca({font:l,sdfGlyphSize:s,text:t},c)}function Ds(l,r){for(let s in r)r.hasOwnProperty(s)&&(l[s]=r[s]);return l}let Rr;function zs(l){return Rr||(Rr=typeof document>"u"?{}:document.createElement("a")),Rr.href=l,Rr.href}function Ua(l){if(typeof createImageBitmap!="function"){const{sdfCanvas:r,sdfTexture:s}=l,{width:c,height:t}=r,e=l.sdfCanvas.getContext("webgl");let n=s.image.data;(!n||n.length!==c*t*4)&&(n=new Uint8Array(c*t*4),s.image={width:c,height:t,data:n},s.flipY=!1,s.isDataTexture=!0),e.readPixels(0,0,c,t,e.RGBA,e.UNSIGNED_BYTE,n)}}const Gs=Ht({name:"Typesetter",dependencies:[Ts,_s,fs],init(l,r,s){return l(r,s())}}),Bs=Ht({name:"Typesetter",dependencies:[Gs],init(l){return function(r){return new Promise(s=>{l.typeset(r,s)})}},getTransferables(l){const r=[];for(let s in l)l[s]&&l[s].buffer&&r.push(l[s].buffer);return r}}),aa={};function Os(l){let r=aa[l];if(!r){const s=new Nr(1,1,l,l),c=s.clone(),t=s.attributes,e=c.attributes,n=new $a,a=t.uv.count;for(let o=0;o<a;o++)e.position.array[o*3]*=-1,e.normal.array[o*3+2]*=-1;["position","normal","uv"].forEach(o=>{n.setAttribute(o,new bn([...t[o].array,...e[o].array],t[o].itemSize))}),n.setIndex([...s.index.array,...c.index.array.map(o=>o+a)]),n.translate(.5,.5,0),r=aa[l]=n}return r}const Ns="aTroikaGlyphBounds",ia="aTroikaGlyphIndex",Ws="aTroikaGlyphColor";class Vs extends da{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new En,this.boundingBox=new Br}computeBoundingSphere(){}computeBoundingBox(){}setSide(r){const s=this.getIndex().count;this.setDrawRange(r===De?s/2:0,r===it?s:s/2)}set detail(r){if(r!==this._detail){this._detail=r,(typeof r!="number"||r<1)&&(r=1);let s=Os(r);["position","normal","uv"].forEach(c=>{this.attributes[c]=s.attributes[c].clone()}),this.setIndex(s.getIndex().clone())}}get detail(){return this._detail}set curveRadius(r){r!==this._curveRadius&&(this._curveRadius=r,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(r,s,c,t,e){gn(this,Ns,r,4),gn(this,ia,s,1),gn(this,Ws,e,3),this._blockBounds=c,this._chunkedBounds=t,this.instanceCount=s.length,this._updateBounds()}_updateBounds(){const r=this._blockBounds;if(r){const{curveRadius:s,boundingBox:c}=this;if(s){const{PI:t,floor:e,min:n,max:a,sin:o,cos:i}=Math,f=t/2,d=t*2,h=Math.abs(s),p=r[0]/h,v=r[2]/h,g=e((p+f)/d)!==e((v+f)/d)?-h:n(o(p)*h,o(v)*h),y=e((p-f)/d)!==e((v-f)/d)?h:a(o(p)*h,o(v)*h),M=e((p+t)/d)!==e((v+t)/d)?h*2:a(h-i(p)*h,h-i(v)*h);c.min.set(g,r[1],s<0?-M:0),c.max.set(y,r[3],s<0?0:M)}else c.min.set(r[0],r[1],0),c.max.set(r[2],r[3],0);c.getBoundingSphere(this.boundingSphere)}}applyClipRect(r){let s=this.getAttribute(ia).count,c=this._chunkedBounds;if(c)for(let t=c.length;t--;){s=c[t].end;let e=c[t].rect;if(e[1]<r.w&&e[3]>r.y&&e[0]<r.z&&e[2]>r.x)break}this.instanceCount=s}}function gn(l,r,s,c){const t=l.getAttribute(r);s?t&&t.array.length===s.length?(t.array.set(s),t.needsUpdate=!0):(l.setAttribute(r,new ei(s,c)),delete l._maxInstanceCount,l.dispose()):t&&l.deleteAttribute(r)}const Hs=`
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
`,Xs=`
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
`,Ys=`
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
`,Zs=`
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
`;function qs(l){const r=jn(l,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new gt},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new et(0,0,0,0)},uTroikaClipRect:{value:new et(0,0,0,0)},uTroikaDistanceOffset:{value:0},uTroikaOutlineOpacity:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new gt},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new je},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Ja},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:Hs,vertexTransform:Xs,fragmentDefs:Ys,fragmentColorTransform:Zs,customRewriter({vertexShader:s,fragmentShader:c}){let t=/\buniform\s+vec3\s+diffuse\b/;return t.test(c)&&(c=c.replace(t,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),t.test(s)||(s=s.replace(Ta,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:s,fragmentShader:c}}});return r.transparent=!0,Object.defineProperties(r,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),r}const Dn=new Qa({color:16777215,side:it,transparent:!0}),sa=8421504,la=new Gr,Er=new me,yn=new me,lr=[],Qs=new me,xn="+x+y";function ca(l){return Array.isArray(l)?l[0]:l}let Aa=()=>{const l=new Or(new Nr(1,1),Dn);return Aa=()=>l,l},Ra=()=>{const l=new Or(new Nr(1,1,32,1),Dn);return Ra=()=>l,l};const Ks={type:"syncstart"},Js={type:"synccomplete"},Ea=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],$s=Ea.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");let La=class extends Or{constructor(){const r=new Vs;super(r,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=sa,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=xn,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(r){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(r):(this._isSyncing=!0,this.dispatchEvent(Ks),Ca({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},s=>{this._isSyncing=!1,this._textRenderInfo=s,this.geometry.updateGlyphs(s.glyphBounds,s.glyphAtlasIndices,s.blockBounds,s.chunkedBounds,s.glyphColors);const c=this._queuedSyncs;c&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{c.forEach(t=>t&&t())})),this.dispatchEvent(Js),r&&r()})))}onBeforeRender(r,s,c,t,e,n){this.sync(),e.isTroikaTextMaterial&&this._prepareForRender(e),e._hadOwnSide=e.hasOwnProperty("side"),this.geometry.setSide(e._actualSide=e.side),e.side=pa}onAfterRender(r,s,c,t,e,n){e._hadOwnSide?e.side=e._actualSide:delete e.side}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}get material(){let r=this._derivedMaterial;const s=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Dn.clone());if((!r||r.baseMaterial!==s)&&(r=this._derivedMaterial=qs(s),s.addEventListener("dispose",function c(){s.removeEventListener("dispose",c),r.dispose()})),this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY){let c=r._outlineMtl;return c||(c=r._outlineMtl=Object.create(r,{id:{value:r.id+.1}}),c.isTextOutlineMaterial=!0,c.depthWrite=!1,c.map=null,r.addEventListener("dispose",function t(){r.removeEventListener("dispose",t),c.dispose()})),[c,r]}else return r}set material(r){r&&r.isTroikaTextMaterial?(this._derivedMaterial=r,this._baseMaterial=r.baseMaterial):this._baseMaterial=r}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(r){this.geometry.detail=r}get curveRadius(){return this.geometry.curveRadius}set curveRadius(r){this.geometry.curveRadius=r}get customDepthMaterial(){return ca(this.material).getDepthMaterial()}get customDistanceMaterial(){return ca(this.material).getDistanceMaterial()}_prepareForRender(r){const s=r.isTextOutlineMaterial,c=r.uniforms,t=this.textRenderInfo;if(t){const{sdfTexture:a,blockBounds:o}=t;c.uTroikaSDFTexture.value=a,c.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),c.uTroikaSDFGlyphSize.value=t.sdfGlyphSize,c.uTroikaSDFExponent.value=t.sdfExponent,c.uTroikaTotalBounds.value.fromArray(o),c.uTroikaUseGlyphColors.value=!s&&!!t.glyphColors;let i=0,f=0,d=0,h,p,v,g=0,y=0;if(s){let{outlineWidth:_,outlineOffsetX:m,outlineOffsetY:b,outlineBlur:k,outlineOpacity:A}=this;i=this._parsePercent(_)||0,f=Math.max(0,this._parsePercent(k)||0),h=A,g=this._parsePercent(m)||0,y=this._parsePercent(b)||0}else d=Math.max(0,this._parsePercent(this.strokeWidth)||0),d&&(v=this.strokeColor,c.uTroikaStrokeColor.value.set(v??sa),p=this.strokeOpacity,p==null&&(p=1)),h=this.fillOpacity;c.uTroikaDistanceOffset.value=i,c.uTroikaPositionOffset.value.set(g,y),c.uTroikaBlurRadius.value=f,c.uTroikaStrokeWidth.value=d,c.uTroikaStrokeOpacity.value=p,c.uTroikaFillOpacity.value=h??1,c.uTroikaCurveRadius.value=this.curveRadius||0;let M=this.clipRect;if(M&&Array.isArray(M)&&M.length===4)c.uTroikaClipRect.value.fromArray(M);else{const _=(this.fontSize||.1)*100;c.uTroikaClipRect.value.set(o[0]-_,o[1]-_,o[2]+_,o[3]+_)}this.geometry.applyClipRect(c.uTroikaClipRect.value)}c.uTroikaSDFDebug.value=!!this.debugSDF,r.polygonOffset=!!this.depthOffset,r.polygonOffsetFactor=r.polygonOffsetUnits=this.depthOffset||0;const e=s?this.outlineColor||0:this.color;if(e==null)delete r.color;else{const a=r.hasOwnProperty("color")?r.color:r.color=new je;(e!==a._input||typeof e=="object")&&a.set(a._input=e)}let n=this.orientation||xn;if(n!==r._orientation){let a=c.uTroikaOrient.value;n=n.replace(/[^-+xyz]/g,"");let o=n!==xn&&n.match(/^([-+])([xyz])([-+])([xyz])$/);if(o){let[,i,f,d,h]=o;Er.set(0,0,0)[f]=i==="-"?1:-1,yn.set(0,0,0)[h]=d==="-"?-1:1,la.lookAt(Qs,Er.cross(yn),yn),a.setFromMatrix4(la)}else a.identity();r._orientation=n}}_parsePercent(r){if(typeof r=="string"){let s=r.match(/^(-?[\d.]+)%$/),c=s?parseFloat(s[1]):NaN;r=(isNaN(c)?0:c/100)*this.fontSize}return r}localPositionToTextCoords(r,s=new gt){s.copy(r);const c=this.curveRadius;return c&&(s.x=Math.atan2(r.x,Math.abs(c)-Math.abs(r.z))*Math.abs(c)),s}worldPositionToTextCoords(r,s=new gt){return Er.copy(r),this.localPositionToTextCoords(this.worldToLocal(Er),s)}raycast(r,s){const{textRenderInfo:c,curveRadius:t}=this;if(c){const e=c.blockBounds,n=t?Ra():Aa(),a=n.geometry,{position:o,uv:i}=a.attributes;for(let f=0;f<i.count;f++){let d=e[0]+i.getX(f)*(e[2]-e[0]);const h=e[1]+i.getY(f)*(e[3]-e[1]);let p=0;t&&(p=t-Math.cos(d/t)*t,d=Math.sin(d/t)*t),o.setXYZ(f,d,h,p)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,n.matrixWorld=this.matrixWorld,n.material.side=this.material.side,lr.length=0,n.raycast(r,lr);for(let f=0;f<lr.length;f++)lr[f].object=this,s.push(lr[f])}}copy(r){const s=this.geometry;return super.copy(r),this.geometry=s,$s.forEach(c=>{this[c]=r[c]}),this}clone(){return new this.constructor().copy(this)}};Ea.forEach(l=>{const r="_private_"+l;Object.defineProperty(La.prototype,l,{get(){return this[r]},set(s){s!==this[r]&&(this[r]=s,this._needsSync=!0)}})});const Ie=x.forwardRef(({sdfGlyphSize:l=64,anchorX:r="center",anchorY:s="middle",font:c,fontSize:t=1,children:e,characters:n,onSync:a,...o},i)=>{const f=At(({invalidate:v})=>v),[d]=x.useState(()=>new La),[h,p]=x.useMemo(()=>{const v=[];let g="";return x.Children.forEach(e,y=>{typeof y=="string"||typeof y=="number"?g+=y:v.push(y)}),[v,g]},[e]);return ti(()=>new Promise(v=>Is({font:c,characters:n},v)),["troika-text",c,n]),x.useLayoutEffect(()=>void d.sync(()=>{f(),a&&a(d)})),x.useEffect(()=>()=>d.dispose(),[d]),x.createElement("primitive",Ut({object:d,ref:i,font:c,text:p,anchorX:r,anchorY:s,fontSize:t,sdfGlyphSize:l},o),h)});function fa(l,r,s){const c=At(h=>h.size),t=At(h=>h.viewport),e=typeof l=="number"?l:c.width*t.dpr,n=c.height*t.dpr,a=(typeof l=="number"?s:l)||{},{samples:o=0,depth:i,...f}=a,d=x.useMemo(()=>{const h=new ri(e,n,{minFilter:Ir,magFilter:Ir,type:ni,...f});return i&&(h.depthTexture=new oi(e,n,ai)),h.samples=o,h},[]);return x.useLayoutEffect(()=>{d.setSize(e,n),o&&(d.samples=o)},[o,d,e,n]),x.useEffect(()=>()=>d.dispose(),[]),d}const el=ii({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class tl extends ci{constructor(r=6,s=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new je("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=c=>{c.uniforms={...c.uniforms,...this.uniforms},this.anisotropy>0&&(c.defines.USE_ANISOTROPY=""),s?c.defines.USE_SAMPLER="":c.defines.USE_TRANSMISSION="",c.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+c.fragmentShader,c.fragmentShader=c.fragmentShader.replace("#include <transmission_pars_fragment>",`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),c.fragmentShader=c.fragmentShader.replace("#include <transmission_fragment>",`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${r}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${r}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${r})) , material.thickness + thickness_smear * (i + randomCoords) / float(${r}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${r})), material.thickness + thickness_smear * (i + randomCoords) / float(${r}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${r}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`)},Object.keys(this.uniforms).forEach(c=>Object.defineProperty(this,c,{get:()=>this.uniforms[c].value,set:t=>this.uniforms[c].value=t}))}}const Vr=x.forwardRef(({buffer:l,transmissionSampler:r=!1,backside:s=!1,side:c=pa,transmission:t=1,thickness:e=0,backsideThickness:n=0,backsideEnvMapIntensity:a=1,samples:o=10,resolution:i,backsideResolution:f,background:d,anisotropy:h,anisotropicBlur:p,...v},g)=>{si({MeshTransmissionMaterial:tl});const y=x.useRef(null),[M]=x.useState(()=>new el),_=fa(f||i),m=fa(i);let b,k,A,T;return he(C=>{y.current.time=C.clock.getElapsedTime(),y.current.buffer===m.texture&&!r&&(T=y.current.__r3f.parent,T&&(A=C.gl.toneMapping,b=C.scene.background,k=y.current.envMapIntensity,C.gl.toneMapping=li,d&&(C.scene.background=d),T.material=M,s&&(C.gl.setRenderTarget(_),C.gl.render(C.scene,C.camera),T.material=y.current,T.material.buffer=_.texture,T.material.thickness=n,T.material.side=De,T.material.envMapIntensity=a),C.gl.setRenderTarget(m),C.gl.render(C.scene,C.camera),T.material=y.current,T.material.thickness=e,T.material.side=c,T.material.buffer=m.texture,T.material.envMapIntensity=k,C.scene.background=b,C.gl.setRenderTarget(null),C.gl.toneMapping=A))}),x.useImperativeHandle(g,()=>y.current,[]),x.createElement("meshTransmissionMaterial",Ut({args:[o,r],ref:y},v,{buffer:l||m.texture,_transmission:t,anisotropicBlur:p??h,transmission:r?t:0,thickness:e,side:c}))}),ht=x.forwardRef(({children:l,enabled:r=!0,speed:s=1,rotationIntensity:c=1,floatIntensity:t=1,floatingRange:e=[-.1,.1],autoInvalidate:n=!1,...a},o)=>{const i=x.useRef(null);x.useImperativeHandle(o,()=>i.current,[]);const f=x.useRef(Math.random()*1e4);return he(d=>{var h,p;if(!r||s===0)return;n&&d.invalidate();const v=f.current+d.clock.getElapsedTime();i.current.rotation.x=Math.cos(v/4*s)/8*c,i.current.rotation.y=Math.sin(v/4*s)/8*c,i.current.rotation.z=Math.sin(v/4*s)/20*c;let g=Math.sin(v/4*s)/10;g=Ze.mapLinear(g,-.1,.1,(h=e==null?void 0:e[0])!==null&&h!==void 0?h:-.1,(p=e==null?void 0:e[1])!==null&&p!==void 0?p:.1),i.current.position.y=g*t,i.current.updateMatrix()}),x.createElement("group",a,x.createElement("group",{ref:i,matrixAutoUpdate:!1},l))});class rl extends ha{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${fi>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const nl=l=>new me().setFromSpherical(new ua(l,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),ol=x.forwardRef(({radius:l=100,depth:r=50,count:s=5e3,saturation:c=0,factor:t=4,fade:e=!1,speed:n=1},a)=>{const o=x.useRef(),[i,f,d]=x.useMemo(()=>{const p=[],v=[],g=Array.from({length:s},()=>(.5+.5*Math.random())*t),y=new je;let M=l+r;const _=r/s;for(let m=0;m<s;m++)M-=_*Math.random(),p.push(...nl(M).toArray()),y.setHSL(m/s,c,.9),v.push(y.r,y.g,y.b);return[new Float32Array(p),new Float32Array(v),new Float32Array(g)]},[s,r,t,l,c]);he(p=>o.current&&(o.current.uniforms.time.value=p.clock.getElapsedTime()*n));const[h]=x.useState(()=>new rl);return x.createElement("points",{ref:a},x.createElement("bufferGeometry",null,x.createElement("bufferAttribute",{attach:"attributes-position",args:[i,3]}),x.createElement("bufferAttribute",{attach:"attributes-color",args:[f,3]}),x.createElement("bufferAttribute",{attach:"attributes-size",args:[d,1]})),x.createElement("primitive",{ref:o,object:h,attach:"material",blending:Pe,"uniforms-fade-value":e,depthWrite:!1,transparent:!0,vertexColors:!0}))}),al=({position:l})=>{const r=x.useRef();He();const[s,c]=x.useState(null);return x.useEffect(()=>{new tt().load("/assets/images/digital_fire.jpg",t=>{t.colorSpace=st,c(t)})},[]),he(t=>{if(r.current){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9;const n=1+Math.sin(t.clock.elapsedTime*5)*.1;r.current.scale.setScalar(n)}}),s?u.jsx("group",{position:l,children:u.jsx(Sa,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:u.jsxs("mesh",{ref:r,position:[0,20,0],children:[u.jsx("planeGeometry",{args:[40,40]}),u.jsx("meshBasicMaterial",{map:s,transparent:!0,opacity:0,depthWrite:!1,blending:Pe})]})})}):null},il=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,sl=`
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
`,ll=({position:l,angle:r,delay:s})=>{const c=x.useRef(),t=x.useRef();He();const e=x.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new je("#44aaff")},uPartyColor:{value:new je("#ff8844")}}),[]);return he(n=>{if(!c.current||!t.current)return;e.uTime.value=n.clock.elapsedTime;const a=window.icebreakerThaw||0,o=Ze.clamp((a-s)*2,0,1);e.uState.value=o;const i=Math.sin(n.clock.elapsedTime*8+s*10)*o;if(c.current.position.y=l[1]+(i>0?i*2:0)+15,o>0){const f=0-l[0],d=0-(l[2]- -200),h=Math.sqrt(f*f+d*d)||1;c.current.position.x=l[0]+f/h*(o*20),c.current.position.z=l[2]+d/h*(o*20)}else c.current.position.x=l[0],c.current.position.z=l[2]}),u.jsx("group",{ref:c,position:[l[0],l[1]+15,l[2]],children:u.jsx(Sa,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:u.jsxs("mesh",{children:[u.jsx("planeGeometry",{args:[20,30]}),u.jsx("shaderMaterial",{ref:t,vertexShader:il,fragmentShader:sl,uniforms:e,transparent:!0,side:it,depthWrite:!1})]})})})},cl=({position:l})=>{const s=x.useMemo(()=>{const c=[];for(let t=0;t<60;t++){const e=Math.random()*Math.PI*2,n=30+Math.random()*80;c.push({position:[l[0]+Math.cos(e)*n,l[1],l[2]+Math.sin(e)*n],angle:e,delay:Math.random()*.5})}return c},[60,l]);return u.jsx("group",{children:s.map((c,t)=>u.jsx(ll,{...c},t))})},fl=({position:l})=>{const r=x.useRef(),[s,c]=x.useState(null);return He(),x.useEffect(()=>{new tt().load("/icebreaker_logo.png",t=>{t.colorSpace=st,c(t)})},[]),he(t=>{if(r.current&&(r.current.rotation.y=t.clock.elapsedTime*.5,r.current.position.y=l[1]+Math.sin(t.clock.elapsedTime*2)*5,r.current.material)){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9,r.current.scale.setScalar(.01+e)}}),s?u.jsxs("mesh",{ref:r,position:l,children:[u.jsx("planeGeometry",{args:[40,40]}),u.jsx("meshBasicMaterial",{map:s,transparent:!0,opacity:0,depthWrite:!1,blending:Pe,side:it})]}):null},ul=({numTrees:l=30,radius:r=50,centerZ:s=-500})=>{const c=x.useRef(),t=x.useRef();He();const e=x.useMemo(()=>new Nt,[]),n=x.useMemo(()=>{const a=[];for(let o=0;o<l;o++){const i=o/l*Math.PI*2+Math.random()*.5,f=r+Math.random()*20;a.push({position:new me(Math.cos(i)*f,-18,Math.sin(i)*f+s),rotation:new Rn(0,i+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return a},[l,r,s]);return he(()=>{if(!c.current||!t.current)return;const a=window.icebreakerThaw||0;for(let o=0;o<l;o++){const i=n[o],f=Math.max(0,(a-i.delay)*2),d=Ze.clamp(f,0,1)*i.scale;e.position.copy(i.position),e.rotation.copy(i.rotation),e.scale.setScalar(d),e.updateMatrix(),c.current.setMatrixAt(o,e.matrix),e.position.y+=18*d,e.updateMatrix(),t.current.setMatrixAt(o,e.matrix)}c.current.instanceMatrix.needsUpdate=!0,t.current.instanceMatrix.needsUpdate=!0}),u.jsxs("group",{children:[u.jsxs("instancedMesh",{ref:c,args:[null,null,l],children:[u.jsx("cylinderGeometry",{args:[.5,1,20,8]}),u.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),u.jsxs("instancedMesh",{ref:t,args:[null,null,l],children:[u.jsx("sphereGeometry",{args:[8,4,4]}),u.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},dl=`
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
`,hl=`
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
`,pl=({startZ:l,endZ:r})=>{const s=x.useRef(),c=x.useRef(),[t,e]=x.useState(null),n=Math.abs(r-l),a=(l+r)/2,o=x.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return x.useEffect(()=>{new tt().load("/assets/images/ice_cavern.jpg",i=>{i.wrapS=Rt,i.wrapT=Rt,i.repeat.set(4,2),i.colorSpace=st,e(i),o.tMap.value=i})},[o]),he(i=>{if(c.current){const f=window.icebreakerThaw||0;o.uThaw.value=f,o.uTime.value=i.clock.elapsedTime}}),t?u.jsxs("mesh",{ref:s,position:[0,0,a],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[120,120,n,128,128,!0]}),u.jsx("shaderMaterial",{ref:c,vertexShader:dl,fragmentShader:hl,uniforms:o,transparent:!0,side:De})]}):null},ml=({position:l})=>{const r=x.useRef();return he(s=>{if(r.current){const c=window.icebreakerThaw||0,t=Ze.lerp(.01,50,Math.pow(c,2));r.current.scale.setScalar(t),r.current.visible=c>0}}),u.jsxs("mesh",{ref:r,position:[l[0],l[1]+1,l[2]],rotation:[-Math.PI/2,0,0],children:[u.jsx("circleGeometry",{args:[20,64]}),u.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},vl=({position:l})=>{const r=x.useRef();return he(s=>{if(r.current){const c=window.icebreakerThaw||0;r.current.scale.setScalar(c>0?1:.001)}}),u.jsxs("mesh",{ref:r,position:[l[0],l[1]+1.5,l[2]],rotation:[-Math.PI/2,0,0],children:[u.jsx("circleGeometry",{args:[96,64]}),u.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},gl=({position:l})=>{const r=x.useRef();return he(()=>{if(r.current){const s=window.icebreakerThaw||0;r.current.opacity=1-Math.pow(s,2),r.current.transparent=!0}}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:l,children:[u.jsx("planeGeometry",{args:[1e3,3e3]}),u.jsx("meshStandardMaterial",{ref:r,color:"#001133",roughness:.1,metalness:.8})]})},yl=({centerZ:l})=>{const r=x.useRef(),s=x.useRef(),c=x.useMemo(()=>({uColorBottom:{value:new je("#ffaa55")},uColorTop:{value:new je("#00f3ff")},uOpacity:{value:0}}),[]);return he(()=>{const t=window.icebreakerThaw||0;r.current&&(r.current.uniforms.uOpacity.value=t),s.current&&(s.current.intensity=t*.6)}),u.jsxs("group",{children:[u.jsxs("mesh",{scale:2e3,children:[u.jsx("sphereGeometry",{args:[1,32,32]}),u.jsx("shaderMaterial",{ref:r,side:De,transparent:!0,depthWrite:!1,uniforms:c,vertexShader:`
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
          `})]}),u.jsx("directionalLight",{ref:s,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),u.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},xl=()=>{const l=He(),[r,s]=x.useState(!1),[c,t]=x.useState(!1),[e,n]=x.useState(!1),a=x.useRef({triggered:!1,timer:0}),o=x.useRef({triggered:!1,timer:0});return x.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),he((i,f)=>{const d=l.offset;!o.current.triggered&&d>=.22&&(o.current.triggered=!0,n(!0),window.icebreakerCaveLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.22*(l.el.scrollHeight-l.el.clientHeight))),window.icebreakerCaveLocked&&(l.el&&(l.el.scrollTop=.22*(l.el.scrollHeight-l.el.clientHeight)),o.current.timer+=f,o.current.timer>1.5&&(window.icebreakerCaveLocked=!1,n(!1),l.el&&(l.el.style.overflow="auto"))),!r&&d>=.265&&window.icebreakerThaw<1&&(s(!0),window.icebreakerThawLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.27*(l.el.scrollHeight-l.el.clientHeight))),window.icebreakerThawLocked?(l.el&&(l.el.scrollTop=.27*(l.el.scrollHeight-l.el.clientHeight)),window.icebreakerThaw+=f*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,l.el&&!c&&(l.el.style.overflow="auto"),s(!1))):d<.2&&(window.icebreakerThaw=0),!a.current.triggered&&d>=.285&&window.icebreakerThaw>=1&&(a.current.triggered=!0,t(!0),window.icebreakerTextLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.29*(l.el.scrollHeight-l.el.clientHeight))),window.icebreakerTextLocked&&(l.el&&(l.el.scrollTop=.29*(l.el.scrollHeight-l.el.clientHeight)),a.current.timer+=f,a.current.timer>1.5&&(window.icebreakerTextLocked=!1,t(!1),l.el&&(l.el.style.overflow="auto")))}),null},wl=({position:l,rotation:r,visible:s=!0})=>u.jsxs("group",{position:l,rotation:r,visible:s,children:[u.jsx(xl,{}),u.jsx(yl,{centerZ:0}),u.jsx(pl,{startZ:1e3,endZ:-1e3}),u.jsx(gl,{position:[0,-20,0]}),u.jsx(ml,{position:[0,-20,0]}),u.jsx(vl,{position:[0,-20,0]}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),u.jsx(al,{position:[0,-20,0]}),u.jsx(fl,{position:[0,30,0]}),u.jsx(ul,{radius:60,centerZ:0}),u.jsx(cl,{position:[0,-20,0]})]}),bl=`
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
`,Sl=`
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
`,Ml=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,_l=({position:l,visible:r})=>u.jsxs("group",{visible:r,position:l,children:[u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),Tl=({position:l,visible:r})=>{const s=He(),c=x.useRef(),t=x.useRef(),e=x.useRef(),[n,a]=x.useState(null),[o,i]=x.useState(null),[f,d]=x.useState(!1),h=x.useRef({triggered:!1,timer:0});x.useEffect(()=>{window.mindwaveLocked=!1,new tt().load("/mindwave-logo.png",g=>{g.colorSpace=st,a(g)}),new tt().load("/tribal-sun.png",g=>{g.colorSpace=st,i(g)})},[]);const p=l?l[2]:0,v=x.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return he((g,y)=>{if(!r)return;const M=s.offset;!h.current.triggered&&M>=.075&&(h.current.triggered=!0,d(!0),window.mindwaveLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.08*(s.el.scrollHeight-s.el.clientHeight))),window.mindwaveLocked&&(s.el&&(s.el.scrollTop=.08*(s.el.scrollHeight-s.el.clientHeight)),h.current.timer+=y,h.current.timer>1.5&&(window.mindwaveLocked=!1,d(!1),s.el&&(s.el.style.overflow="auto")));const _=g.clock.elapsedTime;if(c.current){c.current.uniforms.uTime.value=_;const m=Math.abs(g.camera.position.z-p);let k=1-Math.min(m/1e3,1);k=Math.pow(k,2),c.current.uniforms.uScrollProgress.value=k}if(t.current){t.current.position.y=-7+Math.sin(_*2)*2;const m=1+Math.sin(_*4)*.05;t.current.scale.set(m,m,1),t.current.rotation.y=0}if(e.current){e.current.position.y=125+Math.sin(_*2)*2,e.current.rotation.z=_*.1;const m=1+Math.sin(_*3)*.05;e.current.scale.set(m,m,1)}}),u.jsxs("group",{visible:r,position:l,children:[u.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[u.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),u.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:Ml,side:De,depthWrite:!1})]}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[u.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),u.jsx("shaderMaterial",{ref:c,vertexShader:bl,fragmentShader:Sl,uniforms:v,transparent:!0,side:it,wireframe:!1})]}),o&&u.jsxs("mesh",{ref:e,position:[0,-10,-85],children:[u.jsx("planeGeometry",{args:[140,140]}),u.jsx("meshBasicMaterial",{map:o,transparent:!0,side:it,depthWrite:!1,blending:Pe,color:"#00ffff",opacity:.6})]}),n&&u.jsxs("mesh",{ref:t,position:[0,-10,-80],children:[u.jsx("planeGeometry",{args:[80,80]}),u.jsx("meshBasicMaterial",{map:n,transparent:!0,side:it,depthWrite:!1,blending:Pe})]}),u.jsx(_l,{position:[0,-5,-80],visible:!0})]})},kl=({position:l})=>{const r=x.useRef();return he(s=>{r.current&&(r.current.rotation.y=Math.sin(s.clock.elapsedTime*.2)*.05,r.current.position.y=l[1]+Math.sin(s.clock.elapsedTime*.5)*20)}),u.jsxs("group",{ref:r,position:l,scale:[1.5,1.5,1.5],children:[u.jsxs("mesh",{position:[0,0,0],children:[u.jsx("cylinderGeometry",{args:[20,30,400,32]}),u.jsx(Vr,{backside:!0,samples:4,thickness:50,chromaticAberration:.02,anisotropy:.1,distortion:.1,distortionScale:.1,temporalDistortion:.2,clearcoat:1,attenuationDistance:200,attenuationColor:"#ffffff",color:"#cceeff"})]}),u.jsxs("mesh",{position:[0,-200,0],children:[u.jsx("cylinderGeometry",{args:[80,100,40,32]}),u.jsx("meshStandardMaterial",{color:"#d4af37",metalness:1,roughness:.1})]}),u.jsxs("mesh",{position:[0,200,0],children:[u.jsx("sphereGeometry",{args:[40,32,32]}),u.jsx("meshStandardMaterial",{color:"#d4af37",metalness:1,roughness:.1})]}),u.jsxs("mesh",{position:[0,150,0],rotation:[0,0,Math.PI/2],children:[u.jsx("cylinderGeometry",{args:[10,10,400,16]}),u.jsx("meshStandardMaterial",{color:"#d4af37",metalness:1,roughness:.1})]}),u.jsxs("group",{position:[-180,50,0],children:[u.jsxs("mesh",{position:[0,-100,0],children:[u.jsx("cylinderGeometry",{args:[60,60,5,32]}),u.jsx("meshStandardMaterial",{color:"#d4af37",metalness:1,roughness:.2})]}),[[-40,0,.4],[40,0,-.4],[0,40,0,-.4],[0,-40,0,.4]].map((s,c)=>u.jsxs("mesh",{position:[s[0],-50,s[1]],rotation:[s[2]||0,0,s[3]||0],children:[u.jsx("cylinderGeometry",{args:[1,1,110,8]}),u.jsx("meshStandardMaterial",{color:"#d4af37",metalness:1,roughness:.1})]},c)),u.jsxs("mesh",{position:[0,-80,0],children:[u.jsx("sphereGeometry",{args:[20,16,16]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,blending:Pe})]}),u.jsx("pointLight",{position:[0,-80,0],intensity:2,color:"#00ffff",distance:100})]}),u.jsxs("group",{position:[180,50,0],children:[u.jsxs("mesh",{position:[0,-100,0],children:[u.jsx("cylinderGeometry",{args:[60,60,5,32]}),u.jsx("meshStandardMaterial",{color:"#d4af37",metalness:1,roughness:.2})]}),[[-40,0,.4],[40,0,-.4],[0,40,0,-.4],[0,-40,0,.4]].map((s,c)=>u.jsxs("mesh",{position:[s[0],-50,s[1]],rotation:[s[2]||0,0,s[3]||0],children:[u.jsx("cylinderGeometry",{args:[1,1,110,8]}),u.jsx("meshStandardMaterial",{color:"#d4af37",metalness:1,roughness:.1})]},c)),u.jsxs("mesh",{position:[0,-80,0],children:[u.jsx("sphereGeometry",{args:[20,16,16]}),u.jsx("meshBasicMaterial",{color:"#ff0033",transparent:!0,opacity:.6,blending:Pe})]}),u.jsx("pointLight",{position:[0,-80,0],intensity:2,color:"#ff0033",distance:100})]})]})},wn=({position:l,rotation:r,isRedline:s})=>{const c=x.useRef(document.createElement("canvas")),t=x.useRef(new Ln(c.current));x.useEffect(()=>{c.current.width=1024,c.current.height=1024,t.current.colorSpace=st},[]);const e=["MASTER SERVICES AGREEMENT","","1. TERM AND TERMINATION","This Agreement shall commence on the Effective Date and","continue for a period of five (5) years.","","2. LIMITATION OF LIABILITY","IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT,","INCIDENTAL, OR CONSEQUENTIAL DAMAGES, REGARDLESS OF WHETHER","SUCH DAMAGES WERE FORESEEABLE.","","3. INDEMNIFICATION","Client agrees to indemnify and hold harmless the Service Provider","against any claims arising out of the use of the services."];return he(n=>{const a=n.clock.elapsedTime+(s?2:0),o=c.current.getContext("2d");o.fillStyle="rgba(2, 6, 12, 0.7)",o.fillRect(0,0,1024,1024),o.strokeStyle="rgba(0, 200, 255, 0.05)",o.lineWidth=1;for(let h=0;h<1024;h+=32)o.beginPath(),o.moveTo(h,0),o.lineTo(h,1024),o.stroke(),o.beginPath(),o.moveTo(0,h),o.lineTo(1024,h),o.stroke();const i=a*.5%2,d=(i>1?2-i:i)*1024;o.fillStyle="rgba(0, 255, 255, 0.1)",o.fillRect(0,d-40,1024,80),o.fillStyle="#00ffff",o.fillRect(0,d-1,1024,2),o.textAlign="left",e.forEach((h,p)=>{const v=100+p*35;if(p===0){o.font="bold 40px monospace",o.fillStyle="#ffffff",o.fillText(h,50,v);return}o.font="24px monospace",p>=6&&p<=9&&s?(o.fillStyle="#ff0033",o.fillText(h,50,v),a%6>3&&(o.strokeStyle="#ff0033",o.lineWidth=4,o.beginPath(),o.moveTo(40,v-8),o.lineTo(950,v-8),o.stroke(),p===9&&(o.fillStyle="#ffcc00",o.font="bold 24px monospace",o.fillText(">> AI REVISION: Liability capped at fees paid in prior 12 months.",50,v+40)))):(o.fillStyle="#00ffff",o.fillText(h,50,v))}),t.current.needsUpdate=!0}),u.jsxs("group",{position:l,rotation:r,children:[u.jsxs("mesh",{children:[u.jsx("planeGeometry",{args:[400,400]}),u.jsx("meshBasicMaterial",{map:t.current,side:it,transparent:!0,blending:Pe})]}),u.jsxs("mesh",{position:[0,0,-2],children:[u.jsx("planeGeometry",{args:[420,420]}),u.jsx(Vr,{backside:!0,samples:4,thickness:5,chromaticAberration:.05,distortion:.2,distortionScale:.2,temporalDistortion:.1,clearcoat:1,attenuationDistance:100,attenuationColor:"#ffffff",color:"#001133"})]})]})},Cl=({position:l,rotation:r,visible:s})=>{const c=Vt(tt,"/legal_eagle_logo.png");return c.colorSpace=st,u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:1}),u.jsx("directionalLight",{position:[500,1e3,500],intensity:2,color:"#ffffff"}),u.jsx("pointLight",{position:[-500,200,500],intensity:1.5,color:"#d4af37"}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[3e3,64,64]}),u.jsx("meshBasicMaterial",{color:"#010204",side:De})]}),u.jsx(kl,{position:[0,-100,-800]}),u.jsx(ht,{speed:2,rotationIntensity:.2,floatIntensity:1,children:u.jsx(wn,{position:[-500,0,-500],rotation:[0,Math.PI/6,0],isRedline:!0})}),u.jsx(ht,{speed:2.5,rotationIntensity:.1,floatIntensity:1.5,children:u.jsx(wn,{position:[500,100,-400],rotation:[0,-Math.PI/6,0],isRedline:!1})}),u.jsx(ht,{speed:1.5,rotationIntensity:.15,floatIntensity:.8,children:u.jsx(wn,{position:[0,-250,-300],rotation:[-Math.PI/8,0,0],isRedline:!0})}),u.jsx("group",{position:[0,450,-800],children:u.jsxs(ht,{speed:2,rotationIntensity:.1,floatIntensity:1,children:[u.jsxs("mesh",{position:[0,120,0],children:[u.jsx("planeGeometry",{args:[250,250]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1,blending:Pe})]}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-40,0],fontSize:70,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:28,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Contract Generation & Review"})]})})]})},An=l=>{const s=new hi;l==="interceptor"?(s.moveTo(1*1.8,0),s.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),s.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),s.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),s.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):l==="viper"?(s.moveTo(1*1.2,1*.3),s.lineTo(1*.4,1*.4),s.lineTo(-1*.8,1*1.2),s.lineTo(-1*1.2,1*.8),s.lineTo(-1*.8,0),s.lineTo(-1*1.2,-1*.8),s.lineTo(-1*.8,-1*1.2),s.lineTo(1*.4,-1*.4),s.lineTo(1*1.2,-1*.3),s.lineTo(1*.6,0)):l==="bulwark"&&(s.moveTo(1*1.5,0),s.lineTo(1*.8,1*1.2),s.lineTo(-1*.5,1*1.5),s.lineTo(-1*1.5,1*.8),s.lineTo(-1*1.5,-1*.8),s.lineTo(-1*.5,-1*1.5),s.lineTo(1*.8,-1*1.2));const c={steps:1,depth:l==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},t=new pi(s,c);return t.center(),t.rotateY(-Math.PI/2),t.rotateZ(-Math.PI/2),t},jl=({position:l})=>{const r=x.useRef();return he((s,c)=>{r.current&&(r.current.rotation.z-=c*.1,r.current.rotation.x=Math.sin(s.clock.elapsedTime*.1)*.1)}),u.jsxs("group",{position:l,ref:r,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[150,150,300,32]}),u.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),u.jsxs("mesh",{children:[u.jsx("torusGeometry",{args:[400,40,32,64]}),u.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((s,c)=>u.jsxs("mesh",{position:[Math.cos(s)*200,0,Math.sin(s)*200],rotation:[0,-s,Math.PI/2],children:[u.jsx("cylinderGeometry",{args:[20,20,300,16]}),u.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},c)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((s,c)=>u.jsxs("mesh",{position:[Math.cos(s)*400,0,Math.sin(s)*400],rotation:[Math.PI/2,0,-s],children:[u.jsx("boxGeometry",{args:[60,60,90]}),u.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${c}`))]})},Ul=({position:l})=>{const r=x.useRef(),s=x.useMemo(()=>An("bulwark"),[]);return he((c,t)=>{r.current&&(r.current.position.y=Math.sin(c.clock.elapsedTime*.2)*40,r.current.rotation.y+=t*.05,r.current.rotation.z=Math.sin(c.clock.elapsedTime*.1)*.1)}),u.jsxs("group",{position:l,ref:r,scale:[120,120,120],children:[u.jsx("mesh",{geometry:s,children:u.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),u.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),u.jsxs("mesh",{position:[0,0,1.5],children:[u.jsx("sphereGeometry",{args:[.2,16,16]}),u.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},Al=({position:l})=>{const e=x.useMemo(()=>new Nt,[]),n=x.useMemo(()=>new Nt,[]),a=x.useRef(),o=x.useRef(),i=x.useRef(),f=x.useRef(),d=x.useMemo(()=>An("interceptor"),[]),h=x.useMemo(()=>An("viper"),[]),p=x.useMemo(()=>{const y=new ui(.5,.5,20,4);return y.rotateX(Math.PI/2),y},[]),v=x.useMemo(()=>Array.from({length:80},(y,M)=>{const _=M>=40;return{pos:new me((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new me,target:new me,team:_?1:0,meshIndex:_?M-40:M,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),g=x.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new me,vel:new me,color:new je,life:0})),[60]);return he((y,M)=>{if(!a.current||!o.current||!i.current||!f.current)return;let _=0;v.forEach(m=>{if(m.state===0){if(Math.random()<.02||m.target.lengthSq()===0){const L=v[Math.floor(Math.random()*80)];L&&L.team!==m.team&&L.state===0?(m.target.copy(L.pos),m.target.x+=(Math.random()-.5)*200,m.target.y+=(Math.random()-.5)*200,m.target.z+=(Math.random()-.5)*200):m.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const b=new me().subVectors(m.target,m.pos),k=b.length();if(k>150&&k<800&&Math.random()<.03){const L=g.find(P=>!P.active);L&&(L.active=!0,L.pos.copy(m.pos),L.vel.copy(b).normalize().multiplyScalar(2500),L.color.set(m.team===0?"#00ffff":"#ff3300"),L.life=.8)}const A=b.normalize().multiplyScalar(400*M);m.vel.add(A),m.vel.clampLength(0,600),m.pos.addScaledVector(m.vel,M),m.trail.push(m.pos.clone()),m.trail.length>5&&m.trail.shift(),e.position.copy(m.pos);const T=e.position.clone().add(m.vel);e.lookAt(T);const C=A.clone().cross(m.vel).y;e.rotateZ(C*.01),e.scale.set(30,30,30)}else{m.explosionTimer+=M,e.position.copy(m.pos),e.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const b=30*Math.max(.1,1-m.explosionTimer*2);e.scale.set(b,b,b),m.explosionTimer>.5&&(m.state=0,m.health=100,m.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),m.vel.set(0,0,0),m.trail=[])}e.updateMatrix(),m.team===0?(a.current.setMatrixAt(m.meshIndex,e.matrix),a.current.setColorAt(m.meshIndex,m.state===0?new je("#00aaff"):new je("#ffaa00"))):(o.current.setMatrixAt(m.meshIndex,e.matrix),o.current.setColorAt(m.meshIndex,m.state===0?new je("#ff0033"):new je("#ffaa00"))),m.trail.forEach((b,k)=>{if(_<400){e.position.copy(b),e.rotation.set(0,0,0);const A=k/5*10;e.scale.set(A,A,A),e.updateMatrix(),f.current.setMatrixAt(_,e.matrix),f.current.setColorAt(_,m.team===0?new je("#00ffff"):new je("#ff5500")),_++}})});for(let m=_;m<400;m++)e.position.set(0,9999,0),e.scale.set(0,0,0),e.updateMatrix(),f.current.setMatrixAt(m,e.matrix);g.forEach((m,b)=>{m.active?(m.pos.addScaledVector(m.vel,M),m.life-=M,v.forEach(k=>{k.state===0&&m.pos.distanceTo(k.pos)<50&&(k.health-=50,m.active=!1,k.health<=0&&(k.state=1,k.explosionTimer=0))}),m.life<=0&&(m.active=!1),n.position.copy(m.pos),n.lookAt(n.position.clone().add(m.vel)),n.scale.set(1,1,1)):(n.position.set(0,9999,0),n.scale.set(0,0,0)),n.updateMatrix(),i.current.setMatrixAt(b,n.matrix),i.current.setColorAt(b,m.color)}),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0),o.current.instanceMatrix.needsUpdate=!0,o.current.instanceColor&&(o.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),i.current.instanceMatrix.needsUpdate=!0,i.current.instanceColor&&(i.current.instanceColor.needsUpdate=!0)}),u.jsxs("group",{position:l,children:[u.jsx("instancedMesh",{ref:a,args:[d,null,40],children:u.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),u.jsx("instancedMesh",{ref:o,args:[h,null,40],children:u.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),u.jsx("instancedMesh",{ref:i,args:[p,null,60],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Pe})}),u.jsx("instancedMesh",{ref:f,args:[new di(1,4,4),null,400],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:Pe,depthWrite:!1})})]})},Rl=({position:l,rotation:r,visible:s})=>{const c=Vt(tt,"/interstellar_logo_final.png");c.colorSpace=st;const t=He(),e=x.useRef({triggered:!1});return he(()=>{t&&t.offset>=.41&&t.offset<=.43&&!e.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,e.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.2}),u.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),u.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),u.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[4e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#020510",side:De})]}),u.jsx(jl,{position:[0,-200,-800]}),u.jsx(Ul,{position:[0,-120,-100]}),u.jsx(Al,{position:[0,-50,0]}),u.jsxs("group",{position:[0,120,200],children:[u.jsxs("mesh",{position:[0,50,0],children:[u.jsx("planeGeometry",{args:[180,180]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1})]}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]})]})},El=({position:l})=>{const r=x.useRef();return he((s,c)=>{r.current&&(r.current.rotation.y+=c*.1)}),u.jsxs("group",{position:l,ref:r,children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[40,40,200,16]}),u.jsx("meshStandardMaterial",{color:"#223344",metalness:.8,roughness:.2})]}),u.jsxs("mesh",{position:[0,0,80],rotation:[Math.PI/2,0,0],children:[u.jsx("coneGeometry",{args:[120,60,32]}),u.jsx("meshStandardMaterial",{color:"#112233",metalness:.5,roughness:.5})]}),u.jsxs("mesh",{position:[0,0,100],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[100,100,2,32]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.8,blending:Pe})]}),u.jsxs("mesh",{position:[-150,0,0],children:[u.jsx("boxGeometry",{args:[200,50,5]}),u.jsx("meshStandardMaterial",{color:"#001122",metalness:.9,roughness:.1,emissive:"#002244",emissiveIntensity:.5})]}),u.jsxs("mesh",{position:[150,0,0],children:[u.jsx("boxGeometry",{args:[200,50,5]}),u.jsx("meshStandardMaterial",{color:"#001122",metalness:.9,roughness:.1,emissive:"#002244",emissiveIntensity:.5})]}),u.jsxs("mesh",{position:[0,120,0],children:[u.jsx("cylinderGeometry",{args:[2,2,100]}),u.jsx("meshStandardMaterial",{color:"#8899aa"})]}),u.jsxs("mesh",{position:[0,170,0],children:[u.jsx("sphereGeometry",{args:[5,16,16]}),u.jsx("meshBasicMaterial",{color:"#ff0088"})]})]})},Ll=({position:l})=>{const r=x.useRef();return he(s=>{r.current&&(r.current.position.z=s.clock.elapsedTime*800%500,r.current.scale.z=1+Math.sin(s.clock.elapsedTime*10)*.5)}),u.jsx("group",{position:l,children:u.jsxs("mesh",{ref:r,rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[5,5,200,8]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,blending:Pe})]})})},Pl=()=>{const l=Vt(tt,"/autopilot_logo.png");return l.colorSpace=st,u.jsxs("mesh",{position:[0,350,-600],children:[u.jsx("planeGeometry",{args:[250,250]}),u.jsx("meshBasicMaterial",{map:l,transparent:!0,depthWrite:!1,blending:Pe})]})},Fl=({position:l,rotation:r,visible:s})=>{const c=He(),[t,e]=x.useState(!1),n=x.useRef({timer:0,triggered:!1});return he((a,o)=>{s&&(c.offset>=.595&&c.offset<=.605&&!n.current.triggered&&!window.orbitalLocked&&(window.orbitalLocked=!0,n.current.triggered=!0,n.current.timer=0,e(!0),c.el&&(c.el.style.overflow="hidden")),window.orbitalLocked&&(c.el&&(c.el.scrollTop=.6*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.orbitalLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto"))))}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.2}),u.jsx("directionalLight",{position:[200,500,500],intensity:2.5,color:"#ffffff"}),u.jsx("pointLight",{position:[0,0,200],intensity:3,color:"#00ffff",distance:1e3}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[2e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#000205",side:De})]}),u.jsxs(ht,{speed:1.5,rotationIntensity:.1,floatIntensity:.5,children:[u.jsx(zr.Suspense,{fallback:null,children:u.jsx(Pl,{})}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,180,-600],fontSize:80,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"ORBITAL COMMAND"}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,100,-600],fontSize:25,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"Centralizing Strategy & Global Output"}),u.jsx(El,{position:[0,-100,-600]}),u.jsx(Ll,{position:[0,-100,-450]})]}),u.jsx(Wt,{count:1e3,scale:1500,size:20,speed:.2,opacity:.3,color:"#00aaff",position:[0,0,-500]})]})},Il=({position:l})=>{const r=x.useRef(),s=400,c=x.useMemo(()=>new Nt,[]),t=x.useMemo(()=>{const e=[];for(let n=0;n<s;n++){const a=250+Math.random()*500,o=Math.random()*2*Math.PI,i=(Math.random()-.5)*300;e.push({t:Math.random()*100,factor:.5+Math.random()*1.5,speed:.005+Math.random()*.015,radius:a,theta:o,y:i})}return e},[s]);return he(()=>{t.forEach((e,n)=>{let{t:a,factor:o,speed:i,radius:f,theta:d,y:h}=e;a+=i,e.t=a,c.position.set(Math.cos(d+a)*f,h+Math.sin(a*o)*50,Math.sin(d+a)*f),c.rotation.y=-(d+a),c.updateMatrix(),r.current.setMatrixAt(n,c.matrix)}),r.current.instanceMatrix.needsUpdate=!0}),u.jsx("group",{position:l,children:u.jsxs("instancedMesh",{ref:r,args:[null,null,s],children:[u.jsx("coneGeometry",{args:[4,15,8]}),u.jsx("meshStandardMaterial",{color:"#00ffcc",metalness:.8,roughness:.2,emissive:"#005544",emissiveIntensity:.5})]})})},Dl=({position:l})=>{const r=x.useRef();return he((s,c)=>{r.current&&(r.current.position.y=Math.sin(s.clock.elapsedTime*1.5)*20)}),u.jsxs("group",{position:l,ref:r,children:[u.jsxs("mesh",{children:[u.jsx("capsuleGeometry",{args:[60,200,16,32]}),u.jsx("meshStandardMaterial",{color:"#1a1a24",metalness:.9,roughness:.3})]}),u.jsxs("mesh",{position:[-80,0,0],rotation:[0,0,-Math.PI/6],children:[u.jsx("boxGeometry",{args:[100,10,80]}),u.jsx("meshStandardMaterial",{color:"#111118",metalness:.8,roughness:.4})]}),u.jsxs("mesh",{position:[80,0,0],rotation:[0,0,Math.PI/6],children:[u.jsx("boxGeometry",{args:[100,10,80]}),u.jsx("meshStandardMaterial",{color:"#111118",metalness:.8,roughness:.4})]}),u.jsxs("mesh",{position:[0,-120,0],children:[u.jsx("cylinderGeometry",{args:[40,50,20,32]}),u.jsx("meshBasicMaterial",{color:"#00ffcc",transparent:!0,opacity:.9,blending:Pe})]}),u.jsxs("mesh",{position:[0,-250,0],children:[u.jsx("cylinderGeometry",{args:[40,10,300,32]}),u.jsx("meshBasicMaterial",{color:"#00aa88",transparent:!0,opacity:.4,blending:Pe})]})]})},zl=({position:l,rotation:r,visible:s})=>{const c=He(),[t,e]=x.useState(!1),n=x.useRef({timer:0,triggered:!1});return he((a,o)=>{s&&(c.offset>=.645&&c.offset<=.655&&!n.current.triggered&&!window.swarmLocked&&(window.swarmLocked=!0,n.current.triggered=!0,n.current.timer=0,e(!0),c.el&&(c.el.style.overflow="hidden")),window.swarmLocked&&(c.el&&(c.el.scrollTop=.65*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.swarmLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto"))))}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.1}),u.jsx("directionalLight",{position:[0,500,200],intensity:2,color:"#00ffcc"}),u.jsx("pointLight",{position:[0,0,0],intensity:4,color:"#00ffcc",distance:1500}),u.jsxs("mesh",{rotation:[0,0,0],children:[u.jsx("sphereGeometry",{args:[2e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#020504",side:De})]}),u.jsxs(ht,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,250,200],fontSize:80,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"DRONE SWARM"}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,160,200],fontSize:25,color:"#00ffcc",anchorX:"center",anchorY:"middle",children:"Autonomous Execution & Omni-channel Reach"}),u.jsx("group",{rotation:[Math.PI/2,0,0],children:u.jsx(Dl,{position:[0,0,0]})})]}),u.jsx(Il,{position:[0,0,0]}),u.jsx(Wt,{count:2e3,scale:2e3,size:15,speed:.4,opacity:.5,color:"#ffffff",position:[0,0,0]})]})},Gl=({position:l,rotation:r,speed:s})=>{x.useRef();const c=x.useMemo(()=>new ma([new me(-1e3,0,0),new me(-500,Math.random()*200-100,Math.random()*200-100),new me(0,0,0),new me(500,Math.random()*200-100,Math.random()*200-100),new me(1e3,0,0)]),[]),t=x.useMemo(()=>new mi(c,64,4,8,!1),[c]),e=x.useRef();he(a=>{e.current&&(e.current.map.offset.x-=s)});const n=x.useMemo(()=>{const a=document.createElement("canvas");a.width=256,a.height=16;const o=a.getContext("2d");o.fillStyle="#000000",o.fillRect(0,0,256,16),o.fillStyle="#00ffff",o.fillRect(0,0,32,16),o.fillStyle="#ff00ff",o.fillRect(128,0,32,16);const i=new Ln(a);return i.wrapS=Rt,i.wrapT=Rt,i},[]);return u.jsxs("group",{position:l,rotation:r,children:[u.jsx("mesh",{geometry:t,children:u.jsx("meshBasicMaterial",{ref:e,map:n,transparent:!0,opacity:.8,blending:Pe})}),u.jsx("mesh",{geometry:t,children:u.jsx(Vr,{transparent:!0,opacity:.3,roughness:.1,thickness:5,color:"#0044ff"})})]})},Bl=({position:l})=>{const r=x.useRef(),s=x.useRef(),c=x.useRef();return he((t,e)=>{r.current&&(r.current.scale.setScalar(1+Math.sin(t.clock.elapsedTime*4)*.05),r.current.rotation.y+=e*.5,r.current.rotation.x+=e*.2),s.current&&(s.current.rotation.x+=e*1.2,s.current.rotation.y+=e*.8),c.current&&(c.current.rotation.x-=e*.9,c.current.rotation.z+=e*1.5)}),u.jsxs("group",{position:l,children:[u.jsxs("mesh",{ref:r,children:[u.jsx("icosahedronGeometry",{args:[100,2]}),u.jsx("meshStandardMaterial",{color:"#ffffff",emissive:"#00ffff",emissiveIntensity:2,wireframe:!0})]}),u.jsx("pointLight",{intensity:5,color:"#00ffff",distance:1e3}),u.jsxs("mesh",{ref:s,children:[u.jsx("torusGeometry",{args:[150,4,16,64]}),u.jsx("meshStandardMaterial",{color:"#ff00ff",emissive:"#ff00ff",emissiveIntensity:1})]}),u.jsxs("mesh",{ref:c,children:[u.jsx("torusGeometry",{args:[200,2,16,64]}),u.jsx("meshStandardMaterial",{color:"#00ff00",emissive:"#00ff00",emissiveIntensity:1})]})]})},Ol=({position:l,rotation:r,visible:s})=>{const c=He(),[t,e]=x.useState(!1);he(()=>{s&&(c.offset>.675&&c.offset<.69&&!t&&!window.autopilotLocked&&(window.autopilotLocked=!0,e(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(c.offset<.65||c.offset>.7)&&t&&(e(!1),window.autopilotLocked=!1))});const n=x.useMemo(()=>Array.from({length:15}).map((a,o)=>({pos:[(Math.random()-.5)*800,(Math.random()-.5)*800,(Math.random()-.5)*800],rot:[Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI],speed:.01+Math.random()*.04})),[]);return u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.5}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[3e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#050510",side:De})]}),u.jsx(Bl,{position:[0,-200,-800]}),n.map((a,o)=>u.jsx(Gl,{position:a.pos,rotation:a.rot,speed:a.speed},o)),[[-600,200,-600],[600,100,-700],[0,300,-1e3],[-400,-300,-500],[400,-200,-600]].map((a,o)=>u.jsxs(ht,{speed:2,rotationIntensity:.2,floatIntensity:1,position:a,children:[u.jsxs("mesh",{rotation:[0,a[0]>0?-Math.PI/6:Math.PI/6,0],children:[u.jsx("planeGeometry",{args:[300,200]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.1,wireframe:!0})]}),u.jsxs("mesh",{rotation:[0,a[0]>0?-Math.PI/6:Math.PI/6,0],position:[0,0,2],children:[u.jsx("planeGeometry",{args:[280,180]}),u.jsx(Vr,{backside:!0,samples:2,thickness:2,color:"#001133"})]})]},o)),u.jsx("group",{position:[0,300,-600],children:u.jsxs(ht,{speed:2,rotationIntensity:.1,floatIntensity:1,children:[u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:70,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"AUTOPILOT"}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-120,0],fontSize:28,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Autonomous Business Agent"})]})})]})},Nl=({position:l})=>{const r=x.useRef(),s=x.useMemo(()=>({uTime:{value:0},uColor:{value:new je("#00ffff")}}),[]);return he(c=>{r.current&&(r.current.uniforms.uTime.value=c.clock.elapsedTime)}),u.jsxs("mesh",{position:l,children:[u.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),u.jsx("shaderMaterial",{ref:r,transparent:!0,side:it,blending:Pe,depthWrite:!1,uniforms:s,vertexShader:`
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
        `})]})},Wl=()=>{const l=x.useRef(),r=x.useMemo(()=>({uTime:{value:0},uColor:{value:new je("#0044ff")},uHighlight:{value:new je("#00ffff")}}),[]);return he(s=>{l.current&&(l.current.uniforms.uTime.value=s.clock.elapsedTime)}),u.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[u.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),u.jsx("shaderMaterial",{ref:l,transparent:!0,wireframe:!0,uniforms:r,vertexShader:`
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
        `})]})},Vl=({position:l,rotation:r,visible:s})=>{const[c,t]=x.useState(null);return x.useEffect(()=>{new tt().load("/cloveh2o_logo.png",n=>{n.colorSpace=st,t(n)})},[]),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[4e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#000511",side:De})]}),u.jsx(Wl,{}),u.jsx(Nl,{position:[0,1800,-800]}),u.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),u.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),u.jsxs("group",{position:[0,0,-300],children:[c&&u.jsxs("mesh",{position:[0,80,0],children:[u.jsx("planeGeometry",{args:[200,200]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1,blending:Pe})]}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},Lr=({color:l,number:r,groupRef:s,armRef:c})=>u.jsxs("group",{ref:s,children:[u.jsxs("mesh",{position:[0,10,0],children:[u.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),u.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.3,roughness:.4})]}),u.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[u.jsx("sphereGeometry",{args:[2.5,16,16]}),u.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.5,roughness:.3})]}),u.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[u.jsx("sphereGeometry",{args:[2.5,16,16]}),u.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.5,roughness:.3})]}),u.jsxs("group",{position:[0,17,0],children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[2.8,32,32]}),u.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.8,metalness:.5})]}),u.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[u.jsx("boxGeometry",{args:[3.5,2,2]}),u.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),u.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:u.jsxs("mesh",{position:[0,-3.5,0],children:[u.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),u.jsx("meshStandardMaterial",{color:l,roughness:.6})]})}),u.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:c,children:u.jsxs("mesh",{position:[0,-3.5,0],children:[u.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),u.jsx("meshStandardMaterial",{color:l,roughness:.6})]})}),u.jsxs("mesh",{position:[-1.8,3,0],children:[u.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),u.jsx("meshStandardMaterial",{color:l,roughness:.8})]}),u.jsxs("mesh",{position:[1.8,3,0],children:[u.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),u.jsx("meshStandardMaterial",{color:l,roughness:.8})]}),r&&u.jsx(Ie,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:r})]}),Hl=({position:l})=>{const r=x.useRef(),s=x.useRef(),c=x.useRef(),t=x.useRef(),e=x.useRef(),n=x.useRef(),a=x.useMemo(()=>new me(100,0,0),[]),o=x.useMemo(()=>new me(100,0,20),[]),i=x.useMemo(()=>new me(30,0,100),[]),f=x.useMemo(()=>new me(0,0,-20),[]),d=x.useMemo(()=>new me(20,0,220),[]),h=x.useMemo(()=>new me,[]),p=x.useMemo(()=>new me,[]);return x.useMemo(()=>new me,[]),he(v=>{const g=v.clock.elapsedTime%6;if(c.current&&c.current.rotation.set(0,0,-.3),g<.5)s.current&&s.current.position.copy(a),t.current&&t.current.position.copy(o),e.current&&e.current.position.copy(i),r.current&&r.current.position.copy(f),n.current&&n.current.position.copy(f).add(h.set(4.5,12,2));else if(g<4){const y=(g-.5)/3.5;if(s.current&&(y<.5?s.current.position.lerpVectors(a,h.set(100,0,110),y*2):s.current.position.lerpVectors(p.set(100,0,110),d,(y-.5)*2)),t.current&&s.current&&t.current.position.lerpVectors(o,h.set(d.x+8,0,d.z-8),y),e.current&&e.current.position.lerpVectors(i,h.set(d.x-8,0,d.z+8),y),n.current)if(g<1.5)n.current.position.copy(f).add(h.set(4.5,12,2));else{const M=(g-1.5)/2.5,_=Math.sin(M*Math.PI)*45;n.current.position.lerpVectors(f,d,M),n.current.position.y+=_+18}}else if(g<5)s.current&&s.current.position.lerpVectors(d,h.set(20,0,240),g-4),n.current&&s.current&&n.current.position.copy(s.current.position).add(h.set(0,12,3)),t.current&&(t.current.position.y=0),e.current&&(e.current.position.y=0);else if(g<5.5)c.current&&c.current.rotation.set(Math.PI,0,0),n.current&&s.current&&n.current.position.copy(s.current.position).add(h.set(4.5,20,0));else if(c.current&&c.current.rotation.set(-Math.PI/4,0,0),n.current&&s.current){const y=g-5.5,M=Math.abs(Math.cos(y*8))*10;n.current.position.copy(s.current.position).add(h.set(4.5,M,4))}}),u.jsxs("group",{position:l,children:[u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[u.jsx("planeGeometry",{args:[400,400]}),u.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),u.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[u.jsx("planeGeometry",{args:[400,40]}),u.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),u.jsx(Lr,{color:"#0088ff",number:"QB",groupRef:r}),u.jsx(Lr,{color:"#00ffff",number:"80",groupRef:s,armRef:c}),u.jsx(Lr,{color:"#ff0044",number:"CB",groupRef:t}),u.jsx(Lr,{color:"#ff0044",number:"S",groupRef:e}),u.jsxs("mesh",{ref:n,children:[u.jsx("sphereGeometry",{args:[2,16,16]}),u.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},Xl=({position:l,rotation:r,visible:s})=>{const c=Vt(tt,"/fantasy_quant_stadium.jpg");return c.colorSpace=st,c.wrapS=Rt,c.repeat.set(-1,1),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[2500,64,64]}),u.jsx("meshBasicMaterial",{map:c,side:De})]}),u.jsx(Hl,{position:[0,-125,0],rotation:[0,-Math.PI/2,0]}),u.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),u.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),u.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]})]})},Yl=({position:l})=>{const s=x.useRef(),c=x.useMemo(()=>{const e=[];for(let n=0;n<4e3;n++){const a=Math.random()*Math.PI*2,o=(Math.random()-.5)*150,i=400,f=(i+o*Math.cos(a/2))*Math.cos(a),d=o*Math.sin(a/2),h=(i+o*Math.cos(a/2))*Math.sin(a);e.push({pos:new me(f,d,h),u:a,v:o,speed:Math.random()*.5+.2,color:new je(Math.random()>.5?"#00f3ff":"#0077ff")})}return e},[]),t=x.useMemo(()=>new Nt,[]);return he(e=>{if(!s.current)return;const n=e.clock.elapsedTime;c.forEach((a,o)=>{const i=(a.u+n*a.speed)%(Math.PI*2),f=400,d=(f+a.v*Math.cos(i/2))*Math.cos(i),h=a.v*Math.sin(i/2),p=(f+a.v*Math.cos(i/2))*Math.sin(i);t.position.set(d,h,p);const v=1.5+Math.sin(n*a.speed*5+o)*.8;t.scale.set(v,v,v),t.updateMatrix(),s.current.setMatrixAt(o,t.matrix),s.current.setColorAt(o,a.color)}),s.current.instanceMatrix.needsUpdate=!0,s.current.instanceColor&&(s.current.instanceColor.needsUpdate=!0)}),u.jsx("group",{position:l,children:u.jsx("instancedMesh",{ref:s,args:[new Nr(2,2),null,4e3],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Pe,depthWrite:!1,side:it})})})},Zl=()=>{const l=x.useMemo(()=>Array.from({length:30}).map(()=>{const s=[],c=(Math.random()-.5)*800,t=600+Math.random()*400,e=Math.random()*Math.PI*2;for(let n=0;n<=50;n++){const a=e+n/50*Math.PI*1.5;s.push(new me(Math.cos(a)*t,c+Math.sin(a*8)*50,Math.sin(a)*t))}return{points:s,color:Math.random()>.5?"#00f3ff":"#ffffff"}}),[]),r=x.useRef();return he(s=>{r.current&&(r.current.rotation.y=s.clock.elapsedTime*.15)}),u.jsx("group",{ref:r,children:l.map((s,c)=>u.jsx(ns,{points:s.points,color:s.color,lineWidth:2,transparent:!0,opacity:.4},c))})},ql=({position:l,rotation:r,visible:s})=>{const c=He(),[t,e]=x.useState(!1),n=x.useRef({triggered:!1,timer:0});return he((a,o)=>{if(!s)return;const i=c.offset;!n.current.triggered&&i>=.92&&(n.current.triggered=!0,e(!0),window.contangoLocked=!0,c.el&&(c.el.style.overflow="hidden",c.el.scrollTop=.93*(c.el.scrollHeight-c.el.clientHeight))),window.contangoLocked&&(c.el&&(c.el.scrollTop=.93*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.contangoLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto")))}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.4}),u.jsx("directionalLight",{position:[0,500,500],intensity:1.5,color:"#ffffff"}),u.jsx("spotLight",{position:[-500,500,500],intensity:2,color:"#00f3ff",penumbra:1}),u.jsx("spotLight",{position:[500,-500,500],intensity:2,color:"#0077ff",penumbra:1}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[3e3,64,64]}),u.jsx("meshBasicMaterial",{color:"#010204",side:De})]}),u.jsx(Zl,{}),u.jsx(ol,{radius:1500,depth:50,count:5e3,factor:4,saturation:0,fade:!0,speed:1}),u.jsxs(ht,{speed:2,rotationIntensity:.2,floatIntensity:1,floatingRange:[-10,10],children:[u.jsx(zr.Suspense,{fallback:null}),u.jsx(Ie,{position:[0,250,-800],fontSize:100,anchorX:"center",anchorY:"middle",color:"#ffffff",children:"CONTANGO QUANT"}),u.jsx(Ie,{position:[0,120,-800],fontSize:35,color:"#00f3ff",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",children:"The physics of finance"})]}),u.jsx(Yl,{position:[0,-100,-800]}),u.jsx(Wt,{count:4e3,scale:3e3,size:25,speed:.6,opacity:.5,color:"#00f3ff",position:[0,0,-500]})]})},Ql=({position:l,rotation:r,visible:s})=>{const c=x.useRef(),t=x.useRef(),e=Vt(tt,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return he(n=>{c.current&&(c.current.position.y=Math.sin(n.clock.elapsedTime*1.5)*5),t.current&&(t.current.rotation.y+=.005,t.current.rotation.z+=.002)}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[1500,32,32]}),u.jsx("meshBasicMaterial",{color:"#020510",side:De})]}),u.jsxs("group",{children:[u.jsx(ht,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:u.jsxs("mesh",{ref:c,position:[0,0,-500],children:[u.jsx("planeGeometry",{args:[400,100]})," ",u.jsx("meshBasicMaterial",{map:e,transparent:!0,opacity:1,side:it,depthWrite:!1})]})}),u.jsx(Wt,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),u.jsx(Wt,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),u.jsx("ambientLight",{intensity:.5,color:"#002244"}),u.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},Kl=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Jl=`
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
`,$l=({startZ:l=10,endZ:r=-500,visible:s=!0})=>{const c=x.useRef(),t=x.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);he(n=>{c.current&&s&&(c.current.uniforms.uTime.value=n.clock.elapsedTime,c.current.uniforms.uOpacity.value=Ze.lerp(c.current.uniforms.uOpacity.value,s?1:0,.05))});const e=x.useMemo(()=>{const n=[],o=l-r;for(let i=0;i<=100;i++){const f=l-i/100*o;n.push(new me(Math.sin(i*.1)*2,Math.cos(i*.05)*2,f))}return new ma(n)},[l,r]);return u.jsxs("mesh",{visible:s,children:[u.jsx("tubeGeometry",{args:[e,200,15,32,!1]}),u.jsx("shaderMaterial",{ref:c,vertexShader:Kl,fragmentShader:Jl,uniforms:t,side:De,transparent:!0,blending:Pe})]})},ec=`
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
`,tc=`
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
`,rc=({position:l,rotation:r=[0,0,0],length:s=4e3,visible:c=!0})=>{const t=x.useRef(),e=x.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:s}}),[s]);return he(n=>{t.current&&(t.current.uniforms.uTime.value=n.clock.elapsedTime,t.current.uniforms.uOpacity.value=c?1:0)}),u.jsx("group",{position:l,rotation:r,visible:c,children:u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[60,400,s+200,32,64,!0]}),u.jsx("shaderMaterial",{ref:t,vertexShader:ec,fragmentShader:tc,uniforms:e,transparent:!0,side:De,wireframe:!1})]})})},cr=({position:l,rotation:r,length:s=4e3,radius:c=200,color:t="#ffffff",speed:e=20,visible:n=!0})=>{const a=x.useRef(),o=x.useMemo(()=>({uTime:{value:0},uColor:{value:new je(t)}}),[t]);return he(i=>{a.current&&(a.current.uniforms.uTime.value=i.clock.elapsedTime)}),u.jsxs("mesh",{visible:n,position:l,rotation:r,children:[u.jsx("cylinderGeometry",{args:[c,c,s,32,1,!0]}),u.jsx("shaderMaterial",{ref:a,transparent:!0,side:De,blending:Pe,depthWrite:!1,uniforms:o,vertexShader:`
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
        `})]})},nc=()=>{const l=[],r=(s,c,t)=>{l.push({x:s,y:c,z:0,rot:[Math.PI/2,0,0],color:t,bodyHeight:40+Math.random()*40})};for(let s=Math.PI*.25;s<Math.PI*1.75;s+=.2)r(-100+Math.cos(s)*80,Math.sin(s)*80,"#00ff00");for(let s=0;s<Math.PI*2;s+=.2)r(100+Math.cos(s)*80,Math.sin(s)*80,"#ff0044");return r(140,-40,"#ff0044"),r(160,-60,"#ff0044"),r(180,-80,"#ff0044"),l},oc=({position:l,rotation:r=[0,0,0],length:s=6e3,radius:c=250,visible:t})=>{const e=x.useRef(),n=x.useRef(),a=x.useRef(),o=Vt(tt,"/assets/images/contango_logo.png"),i=x.useMemo(()=>{const d=[],h=Math.floor(s/5);for(let v=0;v<h;v++){const g=-(v/h)*s,y=v*.1,M=Math.cos(y)*c,_=Math.sin(y)*c,m=Math.cos(y+Math.PI)*c,b=Math.sin(y+Math.PI)*c,A=Math.random()>.5?"#00ff00":"#ff0044",T=20+Math.random()*60,C=[0,0,y+Math.PI/2],L=[0,0,y+Math.PI+Math.PI/2];d.push({x:M,y:_,z:g,rot:C,color:A,bodyHeight:T}),d.push({x:m,y:b,z:g,rot:L,color:A,bodyHeight:T})}return nc().forEach(v=>{d.push({x:v.x,y:v.y,z:-s-500,rot:v.rot,color:v.color,bodyHeight:v.bodyHeight})}),d},[s,c]),f=i.length;return x.useEffect(()=>{if(!n.current||!a.current)return;const d=new Nt,h=new je;for(let p=0;p<f;p++){const v=i[p];d.position.set(v.x,v.y,v.z),d.rotation.set(v.rot[0],v.rot[1],v.rot[2]),d.scale.set(1,v.bodyHeight+40,1),d.updateMatrix(),n.current.setMatrixAt(p,d.matrix),h.set(v.color),n.current.setColorAt(p,h),d.scale.set(1,v.bodyHeight,1),d.updateMatrix(),a.current.setMatrixAt(p,d.matrix),a.current.setColorAt(p,h)}n.current.instanceMatrix.needsUpdate=!0,n.current.instanceColor&&(n.current.instanceColor.needsUpdate=!0),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0)},[i,f]),he(d=>{e.current&&t&&(e.current.rotation.z=d.clock.elapsedTime*.5)}),u.jsxs("group",{position:l,rotation:r,visible:t,children:[u.jsxs("group",{ref:e,children:[u.jsxs("instancedMesh",{ref:n,args:[null,null,f],children:[u.jsx("cylinderGeometry",{args:[2,2,1,8]}),u.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),u.jsxs("instancedMesh",{ref:a,args:[null,null,f],children:[u.jsx("boxGeometry",{args:[10,1,10]}),u.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),u.jsxs("mesh",{position:[0,0,-s-500],children:[u.jsx("planeGeometry",{args:[200,200]}),u.jsx("meshBasicMaterial",{map:o,transparent:!0})]}),u.jsxs("mesh",{position:[0,0,-s/2],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[c*.8,c*.8,s,32,1,!0]}),u.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:De})]})]})},ac=({position:l,rotation:r,length:s=8e3,visible:c=!0})=>{const t=x.useRef(),e=x.useRef();he(a=>{if(!c||!t.current)return;const o=a.clock.getElapsedTime();t.current.map.offset.y=-o*3,e.current&&(e.current.rotation.y=o*2)});const n=zr.useMemo(()=>{const a=document.createElement("canvas");a.width=512,a.height=512;const o=a.getContext("2d"),i=o.createLinearGradient(0,0,0,512);i.addColorStop(0,"#001a33"),i.addColorStop(.5,"#00ccff"),i.addColorStop(1,"#001a33"),o.fillStyle=i,o.fillRect(0,0,512,512),o.fillStyle="#ffffff";for(let d=0;d<200;d++)o.globalAlpha=Math.random()*.5,o.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const f=new Ln(a);return f.wrapS=Rt,f.wrapT=Rt,f.repeat.set(4,20),f},[]);return u.jsxs("group",{position:l,rotation:r,visible:c,children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[150,150,s,32,1,!0]}),u.jsx("meshStandardMaterial",{ref:t,map:n,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:De,transparent:!0,opacity:.9})]}),u.jsxs("mesh",{ref:e,children:[u.jsx("cylinderGeometry",{args:[140,140,s,16,40,!0]}),u.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:De})]})]})},ut=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.56,x:0,y:-4e3,z:-11550,rx:0,ry:0},{p:.58,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.6,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.61,x:0,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.63,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.65,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.655,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.67,x:7e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.68,x:7e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.685,x:7e3,y:-4e3,z:-13550,rx:0,ry:Math.atan2(-7e3,-2600)},{p:.705,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],ic=l=>{if(l<=ut[0].p)return ut[0];if(l>=ut[ut.length-1].p)return ut[ut.length-1];for(let r=0;r<ut.length-1;r++){const s=ut[r],c=ut[r+1];if(l>=s.p&&l<=c.p){const t=(l-s.p)/(c.p-s.p);return{x:Ze.lerp(s.x,c.x,t),y:Ze.lerp(s.y,c.y,t),z:Ze.lerp(s.z,c.z,t),rx:Ze.lerp(s.rx,c.rx,t),ry:Ze.lerp(s.ry,c.ry,t)}}}return ut[0]},sc=()=>{const l=He(),r=x.useRef();return he(s=>{let c=l.offset;window.icebreakerCaveLocked?c=.22:window.icebreakerThawLocked?c=.27:window.icebreakerTextLocked?c=.29:window.mindwaveLocked?c=.08:window.interstellarLocked?c=.42:window.orbitalLocked?c=.6:window.swarmLocked?c=.65:window.autopilotLocked?c=.68:window.contangoLocked&&(c=.93);const t=ic(c);s.camera.position.x=Ze.lerp(s.camera.position.x,t.x,.2),s.camera.position.y=Ze.lerp(s.camera.position.y,t.y,.2),s.camera.position.z=Ze.lerp(s.camera.position.z,t.z,.2);const e=new Et().setFromEuler(new Rn(t.rx,t.ry,0));s.camera.quaternion.slerp(e,.15);const n=l.delta*10;s.camera.rotateZ(Ze.lerp(0,n*2,.2)),r.current&&r.current.position.copy(s.camera.position)}),u.jsxs("group",{children:[u.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),u.jsx("pointLight",{ref:r,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),u.jsx("ambientLight",{intensity:.2})]})},lc=()=>{const l=He(),[r,s]=x.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),c=x.useRef(r);return he(()=>{const t=l.offset,e={intro:t<.08,mindwave:t>.04&&t<.18,wormhole_ice:t>.1&&t<.25,icebreaker:t>.18&&t<.35,wormhole_sound:t>.28&&t<.42,interstellar:t>.28&&t<.48,w_legal:t>.43&&t<.54,legal:t>.48&&t<.58,w_orbital:t>.53&&t<.65,orbital:t>.56&&t<.63,w_swarm:t>.59&&t<.67,swarm:t>.61&&t<.67,w_autopilot:t>.64&&t<.7,autopilot:t>.65&&t<.71,w_clove:t>.67&&t<.72,clove:t>.69&&t<.76,w_fantasy:t>.71&&t<.83,fantasy:t>.73&&t<.88,w_contango:t>.84&&t<.91,contango:t>.89&&t<.96,sentaient:t>.94};let n=!1;for(const a in e)c.current[a]!==e[a]&&(n=!0);n&&(c.current=e,s(e))}),u.jsxs("group",{children:[u.jsx($l,{startZ:10,endZ:-250,visible:r.intro}),u.jsx(Tl,{position:[0,0,-1350],visible:r.mindwave}),u.jsx(rc,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:r.wormhole_ice}),u.jsx(wl,{position:[0,-4e3,-2550],visible:r.icebreaker}),u.jsx(Rl,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:r.interstellar}),u.jsx(cr,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:r.w_legal}),u.jsx(Cl,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:r.legal}),u.jsx(cr,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffcc",visible:r.w_orbital}),u.jsx(Fl,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:r.orbital}),u.jsx(cr,{position:[2e3,-4e3,-13550],rotation:[Math.PI/2,-Math.PI/2,0],length:2e3,color:"#00ffff",speed:40,visible:r.w_swarm}),u.jsx(zl,{position:[5e3,-4e3,-13550],rotation:[0,0,0],visible:r.swarm}),u.jsx(cr,{position:[5500,-4e3,-13550],rotation:[Math.PI/2,-Math.PI/2,0],length:1500,color:"#ff00ff",speed:40,visible:r.w_autopilot}),u.jsx(Ol,{position:[7500,-4e3,-13550],rotation:[0,-Math.PI/2,0],visible:r.autopilot}),u.jsx(cr,{position:[3500,-4e3,-14850],rotation:[Math.PI/2,Math.atan2(7e3,-2600),0],length:3800,color:"#ff00ff",speed:40,visible:r.w_clove}),u.jsx(Vl,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:r.clove}),u.jsx(ac,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:r.w_fantasy}),u.jsx(Xl,{position:[0,-11700,-17500],rotation:[0,0,0],visible:r.fantasy}),u.jsx(oc,{position:[0,-11750,-20550],length:4e3,visible:r.w_contango}),u.jsx(ql,{position:[0,-11750,-24800],rotation:[0,0,0],visible:r.contango}),u.jsx(Ql,{position:[0,-11750,-29350],rotation:[0,0,0],visible:r.sentaient})]})},cc=()=>{const l=He(),r=x.useRef(),s=x.useRef();return x.useRef(),x.useRef(),x.useRef(),he(()=>{const c=l.offset;if(r.current){const t=c<.03?1:0;r.current.style.opacity=t}if(s.current){const t=c>.2&&c<.28?1:0;s.current.style.opacity=t}}),u.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[u.jsxs("div",{ref:r,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[u.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),u.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),u.jsxs("div",{ref:s,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[u.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[u.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:u.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),u.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),u.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),u.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},fc=()=>u.jsxs(vi,{gl:{antialias:!1,alpha:!0},children:[u.jsxs(Qi,{pages:10,damping:.2,distance:1.2,children:[u.jsxs(zr.Suspense,{fallback:null,children:[u.jsx(sc,{}),u.jsx(lc,{})]}),u.jsx(Wt,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),u.jsx($i,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:u.jsx(cc,{})})]}),u.jsxs(gi,{disableNormalPass:!0,children:[u.jsx(yi,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),u.jsx(xi,{opacity:.05}),u.jsx(wi,{eskil:!1,offset:.1,darkness:1.1})]})]}),gc=()=>u.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[u.jsxs(Oa,{children:[u.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),u.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),u.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),u.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:u.jsx(Na,{})}),u.jsx("div",{className:"absolute inset-0 z-0",children:u.jsx(fc,{})})]});export{gc as default};
//# sourceMappingURL=index-BsTkcb6H.js.map
