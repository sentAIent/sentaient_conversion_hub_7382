import{r as w,_ as rr,g as aa,j as d,R as Ln,H as ia}from"./vendor--do4CMJV.js";import{H as sa}from"./Header-Dj3TtRx_.js";import{V as yt,J as Te,Q as st,o as so,z as la,K as Rt,g as Ve,i as Ut,a2 as jt,a0 as ve,Y as Do,s as ca,r as fa,R as ua,U as da,w as ha,p as lo,k as In,q as va,l as pa,y as ma,b as ga,B as Oe,h as Qe,T as xa,m as Mr,n as ya,P as _r,d as wa,F as ba,I as Ma,$ as Sa,X as _a,H as Ta,D as ka,j as Ca,_ as Ua,Z as Fa,N as Ra,t as ja,M as Ne,G as lt,S as wt,A as Ie,v as tr,O as Tr,c as Aa,L as Pa,a1 as co,x as eo,f as Ea,e as Da,C as La,E as Ia,a as za,u as Ga,W as Oa}from"./Vignette-DG78MAky.js";import"./main-CueTgLcS.js";import"./preload-helper-BxaVoaJg.js";function Jt(s,r,c){return r in s?Object.defineProperty(s,r,{value:c,enumerable:!0,configurable:!0,writable:!0}):s[r]=c,s}function to(s,r){(r==null||r>s.length)&&(r=s.length);for(var c=0,f=new Array(r);c<r;c++)f[c]=s[c];return f}function Ba(s,r){if(s){if(typeof s=="string")return to(s,r);var c=Object.prototype.toString.call(s).slice(8,-1);if(c==="Object"&&s.constructor&&(c=s.constructor.name),c==="Map"||c==="Set")return Array.from(s);if(c==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c))return to(s,r)}}function Wa(s){if(Array.isArray(s))return to(s)}function Na(s){if(typeof Symbol<"u"&&s[Symbol.iterator]!=null||s["@@iterator"]!=null)return Array.from(s)}function Va(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ha(s){return Wa(s)||Na(s)||Ba(s)||Va()}new yt;new yt;function Xa(s,r,c){return Math.max(r,Math.min(c,s))}function Ya(s,r){return Xa(s-Math.floor(s/r)*r,0,r)}function Za(s,r){var c=Ya(r-s,Math.PI*2);return c>Math.PI&&(c-=Math.PI*2),c}function zn(s,r){if(!(s instanceof r))throw new TypeError("Cannot call a class as a function")}var Ke=function s(r,c,f){var t=this;zn(this,s),Jt(this,"dot2",function(e,o){return t.x*e+t.y*o}),Jt(this,"dot3",function(e,o,a){return t.x*e+t.y*o+t.z*a}),this.x=r,this.y=c,this.z=f},qa=[new Ke(1,1,0),new Ke(-1,1,0),new Ke(1,-1,0),new Ke(-1,-1,0),new Ke(1,0,1),new Ke(-1,0,1),new Ke(1,0,-1),new Ke(-1,0,-1),new Ke(0,1,1),new Ke(0,-1,1),new Ke(0,1,-1),new Ke(0,-1,-1)],Lo=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],Io=new Array(512),zo=new Array(512),Qa=function(r){r>0&&r<1&&(r*=65536),r=Math.floor(r),r<256&&(r|=r<<8);for(var c=0;c<256;c++){var f;c&1?f=Lo[c]^r&255:f=Lo[c]^r>>8&255,Io[c]=Io[c+256]=f,zo[c]=zo[c+256]=qa[f%12]}};Qa(0);function Ka(s){if(typeof s=="number")s=Math.abs(s);else if(typeof s=="string"){var r=s;s=0;for(var c=0;c<r.length;c++)s=(s+(c+1)*(r.charCodeAt(c)%96))%2147483647}return s===0&&(s=311),s}function Go(s){var r=Ka(s);return function(){var c=r*48271%2147483647;return r=c,c/2147483647}}var Ja=function s(r){var c=this;zn(this,s),Jt(this,"seed",0),Jt(this,"init",function(f){c.seed=f,c.value=Go(f)}),Jt(this,"value",Go(this.seed)),this.init(r)};new Ja(Math.random());var $a=function(r){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return f/Math.atan(1/c)*Math.atan(Math.sin(2*Math.PI*r*t)/c)},Gn=function(r){return 1/(1+r+.48*r*r+.235*r*r*r)},ei=function(r){return r},ti={in:function(r){return 1-Math.cos(r*Math.PI/2)},out:function(r){return Math.sin(r*Math.PI/2)},inOut:function(r){return-(Math.cos(Math.PI*r)-1)/2}},ri={in:function(r){return r*r*r},out:function(r){return 1-Math.pow(1-r,3)},inOut:function(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}},oi={in:function(r){return r*r*r*r*r},out:function(r){return 1-Math.pow(1-r,5)},inOut:function(r){return r<.5?16*r*r*r*r*r:1-Math.pow(-2*r+2,5)/2}},ni={in:function(r){return 1-Math.sqrt(1-Math.pow(r,2))},out:function(r){return Math.sqrt(1-Math.pow(r-1,2))},inOut:function(r){return r<.5?(1-Math.sqrt(1-Math.pow(2*r,2)))/2:(Math.sqrt(1-Math.pow(-2*r+2,2))+1)/2}},ai={in:function(r){return r*r*r*r},out:function(r){return 1- --r*r*r*r},inOut:function(r){return r<.5?8*r*r*r*r:1-8*--r*r*r*r}},ii={in:function(r){return r===0?0:Math.pow(2,10*r-10)},out:function(r){return r===1?1:1-Math.pow(2,-10*r)},inOut:function(r){return r===0?0:r===1?1:r<.5?Math.pow(2,20*r-10)/2:(2-Math.pow(2,-20*r+10))/2}};function De(s,r,c){var f=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,t=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,e=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,o=arguments.length>6&&arguments[6]!==void 0?arguments[6]:Gn,a=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,n="velocity_"+r;if(s.__damp===void 0&&(s.__damp={}),s.__damp[n]===void 0&&(s.__damp[n]=0),Math.abs(s[r]-c)<=a)return s[r]=c,!1;f=Math.max(1e-4,f);var i=2/f,l=o(i*t),u=s[r]-c,h=c,v=e*f;u=Math.min(Math.max(u,-v),v),c=s[r]-u;var p=(s.__damp[n]+i*u)*t;s.__damp[n]=(s.__damp[n]-i*p)*l;var m=c+(u+p)*l;return h-s[r]>0==m>h&&(m=h,s.__damp[n]=(m-h)/t),s[r]=m,!0}var si=function(r){return r&&r.isCamera},li=function(r){return r&&r.isLight},Nt=new Te,Oo=new st,Bo=new st,Vt=new so,Yr=new Te;function ci(s,r,c,f,t,e,o){typeof r=="number"?Nt.setScalar(r):Array.isArray(r)?Nt.set(r[0],r[1],r[2]):Nt.copy(r);var a=s.parent;s.updateWorldMatrix(!0,!1),Yr.setFromMatrixPosition(s.matrixWorld),si(s)||li(s)?Vt.lookAt(Yr,Nt,s.up):Vt.lookAt(Nt,Yr,s.up),Sr(s.quaternion,Bo.setFromRotationMatrix(Vt),c,f,t,e,o),a&&(Vt.extractRotation(a.matrixWorld),Oo.setFromRotationMatrix(Vt),Sr(s.quaternion,Bo.copy(s.quaternion).premultiply(Oo.invert()),c,f,t,e,o))}function Ft(s,r,c,f,t,e,o,a){return De(s,r,s[r]+Za(s[r],c),f,t,e,o,a)}var Ht=new yt,Wo,No;function fi(s,r,c,f,t,e,o){return typeof r=="number"?Ht.setScalar(r):Array.isArray(r)?Ht.set(r[0],r[1]):Ht.copy(r),Wo=De(s,"x",Ht.x,c,f,t,e,o),No=De(s,"y",Ht.y,c,f,t,e,o),Wo||No}var Tt=new Te,Vo,Ho,Xo;function ro(s,r,c,f,t,e,o){return typeof r=="number"?Tt.setScalar(r):Array.isArray(r)?Tt.set(r[0],r[1],r[2]):Tt.copy(r),Vo=De(s,"x",Tt.x,c,f,t,e,o),Ho=De(s,"y",Tt.y,c,f,t,e,o),Xo=De(s,"z",Tt.z,c,f,t,e,o),Vo||Ho||Xo}var mt=new Rt,Yo,Zo,qo,Qo;function ui(s,r,c,f,t,e,o){return typeof r=="number"?mt.setScalar(r):Array.isArray(r)?mt.set(r[0],r[1],r[2],r[3]):mt.copy(r),Yo=De(s,"x",mt.x,c,f,t,e,o),Zo=De(s,"y",mt.y,c,f,t,e,o),qo=De(s,"z",mt.z,c,f,t,e,o),Qo=De(s,"w",mt.w,c,f,t,e,o),Yo||Zo||qo||Qo}var Xt=new Ut,Ko,Jo,$o;function di(s,r,c,f,t,e,o){return Array.isArray(r)?Xt.set(r[0],r[1],r[2],r[3]):Xt.copy(r),Ko=Ft(s,"x",Xt.x,c,f,t,e,o),Jo=Ft(s,"y",Xt.y,c,f,t,e,o),$o=Ft(s,"z",Xt.z,c,f,t,e,o),Ko||Jo||$o}var kt=new Ve,en,tn,rn;function hi(s,r,c,f,t,e,o){return r instanceof Ve?kt.copy(r):Array.isArray(r)?kt.setRGB(r[0],r[1],r[2]):kt.set(r),en=De(s,"r",kt.r,c,f,t,e,o),tn=De(s,"g",kt.g,c,f,t,e,o),rn=De(s,"b",kt.b,c,f,t,e,o),en||tn||rn}var tt=new st,it=new Rt,on=new Rt,Yt=new Rt,nn,an,sn,ln;function Sr(s,r,c,f,t,e,o){var a=s;Array.isArray(r)?tt.set(r[0],r[1],r[2],r[3]):tt.copy(r);var n=s.dot(tt)>0?1:-1;return tt.x*=n,tt.y*=n,tt.z*=n,tt.w*=n,nn=De(s,"x",tt.x,c,f,t,e,o),an=De(s,"y",tt.y,c,f,t,e,o),sn=De(s,"z",tt.z,c,f,t,e,o),ln=De(s,"w",tt.w,c,f,t,e,o),it.set(s.x,s.y,s.z,s.w).normalize(),on.set(a.__damp.velocity_x,a.__damp.velocity_y,a.__damp.velocity_z,a.__damp.velocity_w),Yt.copy(it).multiplyScalar(on.dot(it)/it.dot(it)),a.__damp.velocity_x-=Yt.x,a.__damp.velocity_y-=Yt.y,a.__damp.velocity_z-=Yt.z,a.__damp.velocity_w-=Yt.w,s.set(it.x,it.y,it.z,it.w),nn||an||sn||ln}var Zt=new la,cn,fn,un;function vi(s,r,c,f,t,e,o){return Array.isArray(r)?Zt.set(r[0],r[1],r[2]):Zt.copy(r),cn=De(s,"radius",Zt.radius,c,f,t,e,o),fn=Ft(s,"phi",Zt.phi,c,f,t,e,o),un=Ft(s,"theta",Zt.theta,c,f,t,e,o),cn||fn||un}var mr=new so,dn=new Te,hn=new st,vn=new Te,pn,mn,gn;function pi(s,r,c,f,t,e,o){var a=s;return a.__damp===void 0&&(a.__damp={position:new Te,rotation:new st,scale:new Te},s.decompose(a.__damp.position,a.__damp.rotation,a.__damp.scale)),Array.isArray(r)?mr.set.apply(mr,Ha(r)):mr.copy(r),mr.decompose(dn,hn,vn),pn=ro(a.__damp.position,dn,c,f,t,e,o),mn=Sr(a.__damp.rotation,hn,c,f,t,e,o),gn=ro(a.__damp.scale,vn,c,f,t,e,o),s.compose(a.__damp.position,a.__damp.rotation,a.__damp.scale),pn||mn||gn}var xn=Object.freeze({__proto__:null,rsqw:$a,exp:Gn,linear:ei,sine:ti,cubic:ri,quint:oi,circ:ni,quart:ai,expo:ii,damp:De,dampLookAt:ci,dampAngle:Ft,damp2:fi,damp3:ro,damp4:ui,dampE:di,dampC:hi,dampQ:Sr,dampS:vi,dampM:pi});const fo=w.createContext(null);function Ze(){return w.useContext(fo)}function mi({eps:s=1e-5,enabled:r=!0,infinite:c,horizontal:f,pages:t=1,distance:e=1,damping:o=.25,maxSpeed:a=1/0,prepend:n=!1,style:i={},children:l}){const{get:u,setEvents:h,gl:v,size:p,invalidate:m,events:g}=jt(),[_]=w.useState(()=>document.createElement("div")),[k]=w.useState(()=>document.createElement("div")),[M]=w.useState(()=>document.createElement("div")),S=v.domElement.parentNode,U=w.useRef(0),P=w.useMemo(()=>({el:_,eps:s,fill:k,fixed:M,horizontal:f,damping:o,offset:0,delta:0,scroll:U,pages:t,range(L,E,H=0){const y=L-H,A=y+E+H*2;return this.offset<y?0:this.offset>A?1:(this.offset-y)/(A-y)},curve(L,E,H=0){return Math.sin(this.range(L,E,H)*Math.PI)},visible(L,E,H=0){const y=L-H,A=y+E+H*2;return this.offset>=y&&this.offset<=A}}),[s,o,f,t]);w.useEffect(()=>{_.style.position="absolute",_.style.width="100%",_.style.height="100%",_.style[f?"overflowX":"overflowY"]="auto",_.style[f?"overflowY":"overflowX"]="hidden",_.style.top="0px",_.style.left="0px";for(const E in i)_.style[E]=i[E];M.style.position="sticky",M.style.top="0px",M.style.left="0px",M.style.width="100%",M.style.height="100%",M.style.overflow="hidden",_.appendChild(M),k.style.height=f?"100%":`${t*e*100}%`,k.style.width=f?`${t*e*100}%`:"100%",k.style.pointerEvents="none",_.appendChild(k),n?S.prepend(_):S.appendChild(_),_[f?"scrollLeft":"scrollTop"]=1;const T=g.connected||v.domElement;requestAnimationFrame(()=>g.connect==null?void 0:g.connect(_));const L=u().events.compute;return h({compute(E,H){const{left:y,top:A}=S.getBoundingClientRect(),j=E.clientX-y,Y=E.clientY-A;H.pointer.set(j/H.size.width*2-1,-(Y/H.size.height)*2+1),H.raycaster.setFromCamera(H.pointer,H.camera)}}),()=>{S.removeChild(_),h({compute:L}),g.connect==null||g.connect(T)}},[t,e,f,_,k,M,S]),w.useEffect(()=>{if(g.connected===_){const T=p[f?"width":"height"],L=_[f?"scrollWidth":"scrollHeight"],E=L-T;let H=0,y=!0,A=!0;const j=()=>{if(!(!r||A)&&(m(),H=_[f?"scrollLeft":"scrollTop"],U.current=H/E,c)){if(!y){if(H>=E){const W=1-P.offset;_[f?"scrollLeft":"scrollTop"]=1,U.current=P.offset=-W,y=!0}else if(H<=0){const W=1+P.offset;_[f?"scrollLeft":"scrollTop"]=L,U.current=P.offset=W,y=!0}}y&&setTimeout(()=>y=!1,40)}};_.addEventListener("scroll",j,{passive:!0}),requestAnimationFrame(()=>A=!1);const Y=W=>_.scrollLeft+=W.deltaY/2;return f&&_.addEventListener("wheel",Y,{passive:!0}),()=>{_.removeEventListener("scroll",j),f&&_.removeEventListener("wheel",Y)}}},[_,g,p,c,P,m,f,r]);let b=0;return ve((T,L)=>{b=P.offset,xn.damp(P,"offset",U.current,o,L,a,void 0,s),xn.damp(P,"delta",Math.abs(b-P.offset),o,L,a,void 0,s),P.delta>s&&m()}),w.createElement(fo.Provider,{value:P},l)}const gi=w.forwardRef(({children:s},r)=>{const c=w.useRef(null);w.useImperativeHandle(r,()=>c.current,[]);const f=Ze(),{width:t,height:e}=jt(o=>o.viewport);return ve(()=>{c.current.position.x=f.horizontal?-t*(f.pages-1)*f.offset:0,c.current.position.y=f.horizontal?0:e*(f.pages-1)*f.offset}),w.createElement("group",{ref:c},s)}),xi=w.forwardRef(({children:s,style:r,...c},f)=>{const t=Ze(),e=w.useRef(null);w.useImperativeHandle(f,()=>e.current,[]);const{width:o,height:a}=jt(l=>l.size),n=w.useContext(Do),i=w.useMemo(()=>aa(t.fixed),[t.fixed]);return ve(()=>{t.delta>t.eps&&(e.current.style.transform=`translate3d(${t.horizontal?-o*(t.pages-1)*t.offset:0}px,${t.horizontal?0:a*(t.pages-1)*-t.offset}px,0)`)}),i.render(w.createElement("div",rr({ref:e,style:{...r,position:"absolute",top:0,left:0,willChange:"transform"}},c),w.createElement(fo.Provider,{value:t},w.createElement(Do.Provider,{value:n},s)))),null}),yi=w.forwardRef(({html:s,...r},c)=>{const f=s?xi:gi;return w.createElement(f,rr({ref:c},r))}),On=w.forwardRef(function({children:r,follow:c=!0,lockX:f=!1,lockY:t=!1,lockZ:e=!1,...o},a){const n=w.useRef(null),i=w.useRef(null),l=new st;return ve(({camera:u})=>{if(!c||!i.current)return;const h=i.current.rotation.clone();i.current.updateMatrix(),i.current.updateWorldMatrix(!1,!1),i.current.getWorldQuaternion(l),u.getWorldQuaternion(n.current.quaternion).premultiply(l.invert()),f&&(i.current.rotation.x=h.x),t&&(i.current.rotation.y=h.y),e&&(i.current.rotation.z=h.z)}),w.useImperativeHandle(a,()=>i.current,[]),w.createElement("group",rr({ref:i},o),w.createElement("group",{ref:n},r))});function wi(){var s=Object.create(null);function r(t,e){var o=t.id,a=t.name,n=t.dependencies;n===void 0&&(n=[]);var i=t.init;i===void 0&&(i=function(){});var l=t.getTransferables;if(l===void 0&&(l=null),!s[o])try{n=n.map(function(h){return h&&h.isWorkerModule&&(r(h,function(v){if(v instanceof Error)throw v}),h=s[h.id].value),h}),i=f("<"+a+">.init",i),l&&(l=f("<"+a+">.getTransferables",l));var u=null;typeof i=="function"&&(u=i.apply(void 0,n)),s[o]={id:o,value:u,getTransferables:l},e(u)}catch(h){h&&h.noLog,e(h)}}function c(t,e){var o,a=t.id,n=t.args;(!s[a]||typeof s[a].value!="function")&&e(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var i=(o=s[a]).value.apply(o,n);i&&typeof i.then=="function"?i.then(l,function(u){return e(u instanceof Error?u:new Error(""+u))}):l(i)}catch(u){e(u)}function l(u){try{var h=s[a].getTransferables&&s[a].getTransferables(u);(!h||!Array.isArray(h)||!h.length)&&(h=void 0),e(u,h)}catch(v){e(v)}}}function f(t,e){var o=void 0;self.troikaDefine=function(n){return o=n};var a=URL.createObjectURL(new Blob(["/** "+t.replace(/\*/g,"")+` **/

troikaDefine(
`+e+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch{}return URL.revokeObjectURL(a),delete self.troikaDefine,o}self.addEventListener("message",function(t){var e=t.data,o=e.messageId,a=e.action,n=e.data;try{a==="registerModule"&&r(n,function(i){i instanceof Error?postMessage({messageId:o,success:!1,error:i.message}):postMessage({messageId:o,success:!0,result:{isCallable:typeof i=="function"}})}),a==="callModule"&&c(n,function(i,l){i instanceof Error?postMessage({messageId:o,success:!1,error:i.message}):postMessage({messageId:o,success:!0,result:i},l||void 0)})}catch(i){postMessage({messageId:o,success:!1,error:i.stack})}})}function bi(s){var r=function(){for(var c=[],f=arguments.length;f--;)c[f]=arguments[f];return r._getInitResult().then(function(t){if(typeof t=="function")return t.apply(void 0,c);throw new Error("Worker module function was called but `init` did not return a callable function")})};return r._getInitResult=function(){var c=s.dependencies,f=s.init;c=Array.isArray(c)?c.map(function(e){return e&&e._getInitResult?e._getInitResult():e}):[];var t=Promise.all(c).then(function(e){return f.apply(null,e)});return r._getInitResult=function(){return t},t},r}var Bn=function(){var s=!1;if(typeof window<"u"&&typeof window.document<"u")try{var r=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));r.terminate(),s=!0}catch{}return Bn=function(){return s},s},Mi=0,Si=0,Zr=!1,$t=Object.create(null),er=Object.create(null),oo=Object.create(null);function At(s){if((!s||typeof s.init!="function")&&!Zr)throw new Error("requires `options.init` function");var r=s.dependencies,c=s.init,f=s.getTransferables,t=s.workerId;if(!Bn())return bi(s);t==null&&(t="#default");var e="workerModule"+ ++Mi,o=s.name||e,a=null;r=r&&r.map(function(i){return typeof i=="function"&&!i.workerModuleData&&(Zr=!0,i=At({workerId:t,name:"<"+o+"> function dependency: "+i.name,init:`function(){return (
`+wr(i)+`
)}`}),Zr=!1),i&&i.workerModuleData&&(i=i.workerModuleData),i});function n(){for(var i=[],l=arguments.length;l--;)i[l]=arguments[l];if(!a){a=yn(t,"registerModule",n.workerModuleData);var u=function(){a=null,er[t].delete(u)};(er[t]||(er[t]=new Set)).add(u)}return a.then(function(h){var v=h.isCallable;if(v)return yn(t,"callModule",{id:e,args:i});throw new Error("Worker module function was called but `init` did not return a callable function")})}return n.workerModuleData={isWorkerModule:!0,id:e,name:o,dependencies:r,init:wr(c),getTransferables:f&&wr(f)},n}function _i(s){er[s]&&er[s].forEach(function(r){r()}),$t[s]&&($t[s].terminate(),delete $t[s])}function wr(s){var r=s.toString();return!/^function/.test(r)&&/^\w+\s*\(/.test(r)&&(r="function "+r),r}function Ti(s){var r=$t[s];if(!r){var c=wr(wi);r=$t[s]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+s.replace(/\*/g,"")+` **/

;(`+c+")()"],{type:"application/javascript"}))),r.onmessage=function(f){var t=f.data,e=t.messageId,o=oo[e];if(!o)throw new Error("WorkerModule response with empty or unknown messageId");delete oo[e],o(t)}}return r}function yn(s,r,c){return new Promise(function(f,t){var e=++Si;oo[e]=function(o){o.success?f(o.result):t(new Error("Error in worker "+r+" call: "+o.error))},Ti(s).postMessage({messageId:e,action:r,data:c})})}function Wn(){var s=function(r){function c(B,z,x,C,F,D,R,N){var I=1-R;N.x=I*I*B+2*I*R*x+R*R*F,N.y=I*I*z+2*I*R*C+R*R*D}function f(B,z,x,C,F,D,R,N,I,O){var Q=1-I;O.x=Q*Q*Q*B+3*Q*Q*I*x+3*Q*I*I*F+I*I*I*R,O.y=Q*Q*Q*z+3*Q*Q*I*C+3*Q*I*I*D+I*I*I*N}function t(B,z){for(var x=/([MLQCZ])([^MLQCZ]*)/g,C,F,D,R,N;C=x.exec(B);){var I=C[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(O){return parseFloat(O)});switch(C[1]){case"M":R=F=I[0],N=D=I[1];break;case"L":(I[0]!==R||I[1]!==N)&&z("L",R,N,R=I[0],N=I[1]);break;case"Q":{z("Q",R,N,R=I[2],N=I[3],I[0],I[1]);break}case"C":{z("C",R,N,R=I[4],N=I[5],I[0],I[1],I[2],I[3]);break}case"Z":(R!==F||N!==D)&&z("L",R,N,F,D);break}}}function e(B,z,x){x===void 0&&(x=16);var C={x:0,y:0};t(B,function(F,D,R,N,I,O,Q,te,Z){switch(F){case"L":z(D,R,N,I);break;case"Q":{for(var V=D,xe=R,de=1;de<x;de++)c(D,R,O,Q,N,I,de/(x-1),C),z(V,xe,C.x,C.y),V=C.x,xe=C.y;break}case"C":{for(var $=D,re=R,ce=1;ce<x;ce++)f(D,R,O,Q,te,Z,N,I,ce/(x-1),C),z($,re,C.x,C.y),$=C.x,re=C.y;break}}})}var o="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",n=new WeakMap,i={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function l(B,z){var x=B.getContext?B.getContext("webgl",i):B,C=n.get(x);if(!C){let Q=function($){var re=D[$];if(!re&&(re=D[$]=x.getExtension($),!re))throw new Error($+" not supported");return re},te=function($,re){var ce=x.createShader(re);return x.shaderSource(ce,$),x.compileShader(ce),ce},Z=function($,re,ce,X){if(!R[$]){var oe={},ee={},G=x.createProgram();x.attachShader(G,te(re,x.VERTEX_SHADER)),x.attachShader(G,te(ce,x.FRAGMENT_SHADER)),x.linkProgram(G),R[$]={program:G,transaction:function(J){x.useProgram(G),J({setUniform:function(q,Me){for(var ne=[],se=arguments.length-2;se-- >0;)ne[se]=arguments[se+2];var ue=ee[Me]||(ee[Me]=x.getUniformLocation(G,Me));x["uniform"+q].apply(x,[ue].concat(ne))},setAttribute:function(q,Me,ne,se,ue){var me=oe[q];me||(me=oe[q]={buf:x.createBuffer(),loc:x.getAttribLocation(G,q),data:null}),x.bindBuffer(x.ARRAY_BUFFER,me.buf),x.vertexAttribPointer(me.loc,Me,x.FLOAT,!1,0,0),x.enableVertexAttribArray(me.loc),F?x.vertexAttribDivisor(me.loc,se):Q("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(me.loc,se),ue!==me.data&&(x.bufferData(x.ARRAY_BUFFER,ue,ne),me.data=ue)}})}}}R[$].transaction(X)},V=function($,re){I++;try{x.activeTexture(x.TEXTURE0+I);var ce=N[$];ce||(ce=N[$]=x.createTexture(),x.bindTexture(x.TEXTURE_2D,ce),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_MIN_FILTER,x.NEAREST),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_MAG_FILTER,x.NEAREST)),x.bindTexture(x.TEXTURE_2D,ce),re(ce,I)}finally{I--}},xe=function($,re,ce){var X=x.createFramebuffer();O.push(X),x.bindFramebuffer(x.FRAMEBUFFER,X),x.activeTexture(x.TEXTURE0+re),x.bindTexture(x.TEXTURE_2D,$),x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,$,0);try{ce(X)}finally{x.deleteFramebuffer(X),x.bindFramebuffer(x.FRAMEBUFFER,O[--O.length-1]||null)}},de=function(){D={},R={},N={},I=-1,O.length=0};var F=typeof WebGL2RenderingContext<"u"&&x instanceof WebGL2RenderingContext,D={},R={},N={},I=-1,O=[];x.canvas.addEventListener("webglcontextlost",function($){de(),$.preventDefault()},!1),n.set(x,C={gl:x,isWebGL2:F,getExtension:Q,withProgram:Z,withTexture:V,withTextureFramebuffer:xe,handleContextLoss:de})}z(C)}function u(B,z,x,C,F,D,R,N){R===void 0&&(R=15),N===void 0&&(N=null),l(B,function(I){var O=I.gl,Q=I.withProgram,te=I.withTexture;te("copy",function(Z,V){O.texImage2D(O.TEXTURE_2D,0,O.RGBA,F,D,0,O.RGBA,O.UNSIGNED_BYTE,z),Q("copy",o,a,function(xe){var de=xe.setUniform,$=xe.setAttribute;$("aUV",2,O.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),de("1i","image",V),O.bindFramebuffer(O.FRAMEBUFFER,N||null),O.disable(O.BLEND),O.colorMask(R&8,R&4,R&2,R&1),O.viewport(x,C,F,D),O.scissor(x,C,F,D),O.drawArrays(O.TRIANGLES,0,3)})})})}function h(B,z,x){var C=B.width,F=B.height;l(B,function(D){var R=D.gl,N=new Uint8Array(C*F*4);R.readPixels(0,0,C,F,R.RGBA,R.UNSIGNED_BYTE,N),B.width=z,B.height=x,u(R,N,0,0,C,F)})}var v=Object.freeze({__proto__:null,withWebGLContext:l,renderImageData:u,resizeWebGLCanvasWithoutClearing:h});function p(B,z,x,C,F,D){D===void 0&&(D=1);var R=new Uint8Array(B*z),N=C[2]-C[0],I=C[3]-C[1],O=[];e(x,function($,re,ce,X){O.push({x1:$,y1:re,x2:ce,y2:X,minX:Math.min($,ce),minY:Math.min(re,X),maxX:Math.max($,ce),maxY:Math.max(re,X)})}),O.sort(function($,re){return $.maxX-re.maxX});for(var Q=0;Q<B;Q++)for(var te=0;te<z;te++){var Z=xe(C[0]+N*(Q+.5)/B,C[1]+I*(te+.5)/z),V=Math.pow(1-Math.abs(Z)/F,D)/2;Z<0&&(V=1-V),V=Math.max(0,Math.min(255,Math.round(V*255))),R[te*B+Q]=V}return R;function xe($,re){for(var ce=1/0,X=1/0,oe=O.length;oe--;){var ee=O[oe];if(ee.maxX+X<=$)break;if($+X>ee.minX&&re-X<ee.maxY&&re+X>ee.minY){var G=_($,re,ee.x1,ee.y1,ee.x2,ee.y2);G<ce&&(ce=G,X=Math.sqrt(ce))}}return de($,re)&&(X=-X),X}function de($,re){for(var ce=0,X=O.length;X--;){var oe=O[X];if(oe.maxX<=$)break;var ee=oe.y1>re!=oe.y2>re&&$<(oe.x2-oe.x1)*(re-oe.y1)/(oe.y2-oe.y1)+oe.x1;ee&&(ce+=oe.y1<oe.y2?1:-1)}return ce!==0}}function m(B,z,x,C,F,D,R,N,I,O){D===void 0&&(D=1),N===void 0&&(N=0),I===void 0&&(I=0),O===void 0&&(O=0),g(B,z,x,C,F,D,R,null,N,I,O)}function g(B,z,x,C,F,D,R,N,I,O,Q){D===void 0&&(D=1),I===void 0&&(I=0),O===void 0&&(O=0),Q===void 0&&(Q=0);for(var te=p(B,z,x,C,F,D),Z=new Uint8Array(te.length*4),V=0;V<te.length;V++)Z[V*4+Q]=te[V];u(R,Z,I,O,B,z,1<<3-Q,N)}function _(B,z,x,C,F,D){var R=F-x,N=D-C,I=R*R+N*N,O=I?Math.max(0,Math.min(1,((B-x)*R+(z-C)*N)/I)):0,Q=B-(x+O*R),te=z-(C+O*N);return Q*Q+te*te}var k=Object.freeze({__proto__:null,generate:p,generateIntoCanvas:m,generateIntoFramebuffer:g}),M="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",S="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",U="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",P=new Float32Array([0,0,2,0,0,2]),b=null,T=!1,L={},E=new WeakMap;function H(B){if(!T&&!Y(B))throw new Error("WebGL generation not supported")}function y(B,z,x,C,F,D,R){if(D===void 0&&(D=1),R===void 0&&(R=null),!R&&(R=b,!R)){var N=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!N)throw new Error("OffscreenCanvas or DOM canvas not supported");R=b=N.getContext("webgl",{depth:!1})}H(R);var I=new Uint8Array(B*z*4);l(R,function(Z){var V=Z.gl,xe=Z.withTexture,de=Z.withTextureFramebuffer;xe("readable",function($,re){V.texImage2D(V.TEXTURE_2D,0,V.RGBA,B,z,0,V.RGBA,V.UNSIGNED_BYTE,null),de($,re,function(ce){j(B,z,x,C,F,D,V,ce,0,0,0),V.readPixels(0,0,B,z,V.RGBA,V.UNSIGNED_BYTE,I)})})});for(var O=new Uint8Array(B*z),Q=0,te=0;Q<I.length;Q+=4)O[te++]=I[Q];return O}function A(B,z,x,C,F,D,R,N,I,O){D===void 0&&(D=1),N===void 0&&(N=0),I===void 0&&(I=0),O===void 0&&(O=0),j(B,z,x,C,F,D,R,null,N,I,O)}function j(B,z,x,C,F,D,R,N,I,O,Q){D===void 0&&(D=1),I===void 0&&(I=0),O===void 0&&(O=0),Q===void 0&&(Q=0),H(R);var te=[];e(x,function(Z,V,xe,de){te.push(Z,V,xe,de)}),te=new Float32Array(te),l(R,function(Z){var V=Z.gl,xe=Z.isWebGL2,de=Z.getExtension,$=Z.withProgram,re=Z.withTexture,ce=Z.withTextureFramebuffer,X=Z.handleContextLoss;if(re("rawDistances",function(oe,ee){(B!==oe._lastWidth||z!==oe._lastHeight)&&V.texImage2D(V.TEXTURE_2D,0,V.RGBA,oe._lastWidth=B,oe._lastHeight=z,0,V.RGBA,V.UNSIGNED_BYTE,null),$("main",M,S,function(G){var pe=G.setAttribute,J=G.setUniform,ie=!xe&&de("ANGLE_instanced_arrays"),q=!xe&&de("EXT_blend_minmax");pe("aUV",2,V.STATIC_DRAW,0,P),pe("aLineSegment",4,V.DYNAMIC_DRAW,1,te),J.apply(void 0,["4f","uGlyphBounds"].concat(C)),J("1f","uMaxDistance",F),J("1f","uExponent",D),ce(oe,ee,function(Me){V.enable(V.BLEND),V.colorMask(!0,!0,!0,!0),V.viewport(0,0,B,z),V.scissor(0,0,B,z),V.blendFunc(V.ONE,V.ONE),V.blendEquationSeparate(V.FUNC_ADD,xe?V.MAX:q.MAX_EXT),V.clear(V.COLOR_BUFFER_BIT),xe?V.drawArraysInstanced(V.TRIANGLES,0,3,te.length/4):ie.drawArraysInstancedANGLE(V.TRIANGLES,0,3,te.length/4)})}),$("post",o,U,function(G){G.setAttribute("aUV",2,V.STATIC_DRAW,0,P),G.setUniform("1i","tex",ee),V.bindFramebuffer(V.FRAMEBUFFER,N),V.disable(V.BLEND),V.colorMask(Q===0,Q===1,Q===2,Q===3),V.viewport(I,O,B,z),V.scissor(I,O,B,z),V.drawArrays(V.TRIANGLES,0,3)})}),V.isContextLost())throw X(),new Error("webgl context lost")})}function Y(B){var z=!B||B===b?L:B.canvas||B,x=E.get(z);if(x===void 0){T=!0;var C=null;try{var F=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],D=y(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,B);x=D&&F.length===D.length&&D.every(function(R,N){return R===F[N]}),x||(C="bad trial run results")}catch(R){x=!1,C=R.message}T=!1,E.set(z,x)}return x}var W=Object.freeze({__proto__:null,generate:y,generateIntoCanvas:A,generateIntoFramebuffer:j,isSupported:Y});function K(B,z,x,C,F,D){F===void 0&&(F=Math.max(C[2]-C[0],C[3]-C[1])/2),D===void 0&&(D=1);try{return y.apply(W,arguments)}catch{return p.apply(k,arguments)}}function ae(B,z,x,C,F,D,R,N,I,O){F===void 0&&(F=Math.max(C[2]-C[0],C[3]-C[1])/2),D===void 0&&(D=1),N===void 0&&(N=0),I===void 0&&(I=0),O===void 0&&(O=0);try{return A.apply(W,arguments)}catch{return m.apply(k,arguments)}}return r.forEachPathCommand=t,r.generate=K,r.generateIntoCanvas=ae,r.javascript=k,r.pathToLineSegments=e,r.webgl=W,r.webglUtils=v,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return s}function ki(){var s=function(r){var c={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},f={},t={};f.L=1,t[1]="L",Object.keys(c).forEach(function(X,oe){f[X]=1<<oe+1,t[f[X]]=X}),Object.freeze(f);var e=f.LRI|f.RLI|f.FSI,o=f.L|f.R|f.AL,a=f.B|f.S|f.WS|f.ON|f.FSI|f.LRI|f.RLI|f.PDI,n=f.BN|f.RLE|f.LRE|f.RLO|f.LRO|f.PDF,i=f.S|f.WS|f.B|e|f.PDI|n,l=null;function u(){if(!l){l=new Map;var X=function(ee){if(c.hasOwnProperty(ee)){var G=0;c[ee].split(",").forEach(function(pe){var J=pe.split("+"),ie=J[0],q=J[1];ie=parseInt(ie,36),q=q?parseInt(q,36):0,l.set(G+=ie,f[ee]);for(var Me=0;Me<q;Me++)l.set(++G,f[ee])})}};for(var oe in c)X(oe)}}function h(X){return u(),l.get(X.codePointAt(0))||f.L}function v(X){return t[h(X)]}var p={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function m(X,oe){var ee=36,G=0,pe=new Map,J=oe&&new Map,ie;return X.split(",").forEach(function q(Me){if(Me.indexOf("+")!==-1)for(var ne=+Me;ne--;)q(ie);else{ie=Me;var se=Me.split(">"),ue=se[0],me=se[1];ue=String.fromCodePoint(G+=parseInt(ue,ee)),me=String.fromCodePoint(G+=parseInt(me,ee)),pe.set(ue,me),oe&&J.set(me,ue)}}),{map:pe,reverseMap:J}}var g,_,k;function M(){if(!g){var X=m(p.pairs,!0),oe=X.map,ee=X.reverseMap;g=oe,_=ee,k=m(p.canonical,!1).map}}function S(X){return M(),g.get(X)||null}function U(X){return M(),_.get(X)||null}function P(X){return M(),k.get(X)||null}var b=f.L,T=f.R,L=f.EN,E=f.ES,H=f.ET,y=f.AN,A=f.CS,j=f.B,Y=f.S,W=f.ON,K=f.BN,ae=f.NSM,B=f.AL,z=f.LRO,x=f.RLO,C=f.LRE,F=f.RLE,D=f.PDF,R=f.LRI,N=f.RLI,I=f.FSI,O=f.PDI;function Q(X,oe){for(var ee=125,G=new Uint32Array(X.length),pe=0;pe<X.length;pe++)G[pe]=h(X[pe]);var J=new Map;function ie(Xe,et){var Ye=G[Xe];G[Xe]=et,J.set(Ye,J.get(Ye)-1),Ye&a&&J.set(a,J.get(a)-1),J.set(et,(J.get(et)||0)+1),et&a&&J.set(a,(J.get(a)||0)+1)}for(var q=new Uint8Array(X.length),Me=new Map,ne=[],se=null,ue=0;ue<X.length;ue++)se||ne.push(se={start:ue,end:X.length-1,level:oe==="rtl"?1:oe==="ltr"?0:Po(ue,!1)}),G[ue]&j&&(se.end=ue,se=null);for(var me=F|C|x|z|e|O|D|j,ke=function(Xe){return Xe+(Xe&1?1:2)},je=function(Xe){return Xe+(Xe&1?2:1)},ye=0;ye<ne.length;ye++){se=ne[ye];var we=[{_level:se.level,_override:0,_isolate:0}],fe=void 0,Ae=0,Ue=0,He=0;J.clear();for(var Ce=se.start;Ce<=se.end;Ce++){var he=G[Ce];if(fe=we[we.length-1],J.set(he,(J.get(he)||0)+1),he&a&&J.set(a,(J.get(a)||0)+1),he&me)if(he&(F|C)){q[Ce]=fe._level;var Se=(he===F?je:ke)(fe._level);Se<=ee&&!Ae&&!Ue?we.push({_level:Se,_override:0,_isolate:0}):Ae||Ue++}else if(he&(x|z)){q[Ce]=fe._level;var ct=(he===x?je:ke)(fe._level);ct<=ee&&!Ae&&!Ue?we.push({_level:ct,_override:he&x?T:b,_isolate:0}):Ae||Ue++}else if(he&e){he&I&&(he=Po(Ce+1,!0)===1?N:R),q[Ce]=fe._level,fe._override&&ie(Ce,fe._override);var _e=(he===N?je:ke)(fe._level);_e<=ee&&Ae===0&&Ue===0?(He++,we.push({_level:_e,_override:0,_isolate:1,_isolInitIndex:Ce})):Ae++}else if(he&O){if(Ae>0)Ae--;else if(He>0){for(Ue=0;!we[we.length-1]._isolate;)we.pop();var be=we[we.length-1]._isolInitIndex;be!=null&&(Me.set(be,Ce),Me.set(Ce,be)),we.pop(),He--}fe=we[we.length-1],q[Ce]=fe._level,fe._override&&ie(Ce,fe._override)}else he&D?(Ae===0&&(Ue>0?Ue--:!fe._isolate&&we.length>1&&(we.pop(),fe=we[we.length-1])),q[Ce]=fe._level):he&j&&(q[Ce]=se.level);else q[Ce]=fe._level,fe._override&&he!==K&&ie(Ce,fe._override)}for(var Pe=[],Fe=null,ge=se.start;ge<=se.end;ge++){var Re=G[ge];if(!(Re&n)){var Be=q[ge],ze=Re&e,Ee=Re===O;Fe&&Be===Fe._level?(Fe._end=ge,Fe._endsWithIsolInit=ze):Pe.push(Fe={_start:ge,_end:ge,_level:Be,_startsWithPDI:Ee,_endsWithIsolInit:ze})}}for(var Je=[],ft=0;ft<Pe.length;ft++){var nt=Pe[ft];if(!nt._startsWithPDI||nt._startsWithPDI&&!Me.has(nt._start)){for(var ut=[Fe=nt],vt=void 0;Fe&&Fe._endsWithIsolInit&&(vt=Me.get(Fe._end))!=null;)for(var at=ft+1;at<Pe.length;at++)if(Pe[at]._start===vt){ut.push(Fe=Pe[at]);break}for(var We=[],pt=0;pt<ut.length;pt++)for(var ho=ut[pt],Cr=ho._start;Cr<=ho._end;Cr++)We.push(Cr);for(var $n=q[We[0]],vo=se.level,or=We[0]-1;or>=0;or--)if(!(G[or]&n)){vo=q[or];break}var Ur=We[We.length-1],ea=q[Ur],po=se.level;if(!(G[Ur]&e)){for(var nr=Ur+1;nr<=se.end;nr++)if(!(G[nr]&n)){po=q[nr];break}}Je.push({_seqIndices:We,_sosType:Math.max(vo,$n)%2?T:b,_eosType:Math.max(po,ea)%2?T:b})}}for(var Fr=0;Fr<Je.length;Fr++){var Rr=Je[Fr],le=Rr._seqIndices,Pt=Rr._sosType,ta=Rr._eosType,bt=q[le[0]]&1?T:b;if(J.get(ae))for(var ar=0;ar<le.length;ar++){var mo=le[ar];if(G[mo]&ae){for(var jr=Pt,ir=ar-1;ir>=0;ir--)if(!(G[le[ir]]&n)){jr=G[le[ir]];break}ie(mo,jr&(e|O)?W:jr)}}if(J.get(L))for(var sr=0;sr<le.length;sr++){var go=le[sr];if(G[go]&L)for(var lr=sr-1;lr>=-1;lr--){var xo=lr===-1?Pt:G[le[lr]];if(xo&o){xo===B&&ie(go,y);break}}}if(J.get(B))for(var Ar=0;Ar<le.length;Ar++){var yo=le[Ar];G[yo]&B&&ie(yo,T)}if(J.get(E)||J.get(A))for(var Et=1;Et<le.length-1;Et++){var Pr=le[Et];if(G[Pr]&(E|A)){for(var Mt=0,Er=0,Dr=Et-1;Dr>=0&&(Mt=G[le[Dr]],!!(Mt&n));Dr--);for(var Lr=Et+1;Lr<le.length&&(Er=G[le[Lr]],!!(Er&n));Lr++);Mt===Er&&(G[Pr]===E?Mt===L:Mt&(L|y))&&ie(Pr,Mt)}}if(J.get(L))for(var rt=0;rt<le.length;rt++){var ra=le[rt];if(G[ra]&L){for(var cr=rt-1;cr>=0&&G[le[cr]]&(H|n);cr--)ie(le[cr],L);for(rt++;rt<le.length&&G[le[rt]]&(H|n|L);rt++)G[le[rt]]!==L&&ie(le[rt],L)}}if(J.get(H)||J.get(E)||J.get(A))for(var Dt=0;Dt<le.length;Dt++){var wo=le[Dt];if(G[wo]&(H|E|A)){ie(wo,W);for(var fr=Dt-1;fr>=0&&G[le[fr]]&n;fr--)ie(le[fr],W);for(var ur=Dt+1;ur<le.length&&G[le[ur]]&n;ur++)ie(le[ur],W)}}if(J.get(L))for(var Ir=0,bo=Pt;Ir<le.length;Ir++){var Mo=le[Ir],zr=G[Mo];zr&L?bo===b&&ie(Mo,b):zr&o&&(bo=zr)}if(J.get(a)){var Lt=T|L|y,So=Lt|b,dr=[];{for(var St=[],_t=0;_t<le.length;_t++)if(G[le[_t]]&a){var It=X[le[_t]],_o=void 0;if(S(It)!==null)if(St.length<63)St.push({char:It,seqIndex:_t});else break;else if((_o=U(It))!==null)for(var zt=St.length-1;zt>=0;zt--){var Gr=St[zt].char;if(Gr===_o||Gr===U(P(It))||S(P(Gr))===It){dr.push([St[zt].seqIndex,_t]),St.length=zt;break}}}dr.sort(function(Xe,et){return Xe[0]-et[0]})}for(var Or=0;Or<dr.length;Or++){for(var To=dr[Or],hr=To[0],Br=To[1],ko=!1,$e=0,Wr=hr+1;Wr<Br;Wr++){var Co=le[Wr];if(G[Co]&So){ko=!0;var Uo=G[Co]&Lt?T:b;if(Uo===bt){$e=Uo;break}}}if(ko&&!$e){$e=Pt;for(var Nr=hr-1;Nr>=0;Nr--){var Fo=le[Nr];if(G[Fo]&So){var Ro=G[Fo]&Lt?T:b;Ro!==bt?$e=Ro:$e=bt;break}}}if($e){if(G[le[hr]]=G[le[Br]]=$e,$e!==bt){for(var Gt=hr+1;Gt<le.length;Gt++)if(!(G[le[Gt]]&n)){h(X[le[Gt]])&ae&&(G[le[Gt]]=$e);break}}if($e!==bt){for(var Ot=Br+1;Ot<le.length;Ot++)if(!(G[le[Ot]]&n)){h(X[le[Ot]])&ae&&(G[le[Ot]]=$e);break}}}}for(var dt=0;dt<le.length;dt++)if(G[le[dt]]&a){for(var jo=dt,Vr=dt,Hr=Pt,Bt=dt-1;Bt>=0;Bt--)if(G[le[Bt]]&n)jo=Bt;else{Hr=G[le[Bt]]&Lt?T:b;break}for(var Ao=ta,Wt=dt+1;Wt<le.length;Wt++)if(G[le[Wt]]&(a|n))Vr=Wt;else{Ao=G[le[Wt]]&Lt?T:b;break}for(var Xr=jo;Xr<=Vr;Xr++)G[le[Xr]]=Hr===Ao?Hr:bt;dt=Vr}}}for(var qe=se.start;qe<=se.end;qe++){var oa=q[qe],vr=G[qe];if(oa&1?vr&(b|L|y)&&q[qe]++:vr&T?q[qe]++:vr&(y|L)&&(q[qe]+=2),vr&n&&(q[qe]=qe===0?se.level:q[qe-1]),qe===se.end||h(X[qe])&(Y|j))for(var pr=qe;pr>=0&&h(X[pr])&i;pr--)q[pr]=se.level}}return{levels:q,paragraphs:ne};function Po(Xe,et){for(var Ye=Xe;Ye<X.length;Ye++){var ht=G[Ye];if(ht&(T|B))return 1;if(ht&(j|b)||et&&ht===O)return 0;if(ht&e){var Eo=na(Ye);Ye=Eo===-1?X.length:Eo}}return 0}function na(Xe){for(var et=1,Ye=Xe+1;Ye<X.length;Ye++){var ht=G[Ye];if(ht&j)break;if(ht&O){if(--et===0)return Ye}else ht&e&&et++}return-1}}var te="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",Z;function V(){if(!Z){var X=m(te,!0),oe=X.map,ee=X.reverseMap;ee.forEach(function(G,pe){oe.set(pe,G)}),Z=oe}}function xe(X){return V(),Z.get(X)||null}function de(X,oe,ee,G){var pe=X.length;ee=Math.max(0,ee==null?0:+ee),G=Math.min(pe-1,G==null?pe-1:+G);for(var J=new Map,ie=ee;ie<=G;ie++)if(oe[ie]&1){var q=xe(X[ie]);q!==null&&J.set(ie,q)}return J}function $(X,oe,ee,G){var pe=X.length;ee=Math.max(0,ee==null?0:+ee),G=Math.min(pe-1,G==null?pe-1:+G);var J=[];return oe.paragraphs.forEach(function(ie){var q=Math.max(ee,ie.start),Me=Math.min(G,ie.end);if(q<Me){for(var ne=oe.levels.slice(q,Me+1),se=Me;se>=q&&h(X[se])&i;se--)ne[se]=ie.level;for(var ue=ie.level,me=1/0,ke=0;ke<ne.length;ke++){var je=ne[ke];je>ue&&(ue=je),je<me&&(me=je|1)}for(var ye=ue;ye>=me;ye--)for(var we=0;we<ne.length;we++)if(ne[we]>=ye){for(var fe=we;we+1<ne.length&&ne[we+1]>=ye;)we++;we>fe&&J.push([fe+q,we+q])}}}),J}function re(X,oe,ee,G){var pe=ce(X,oe,ee,G),J=[].concat(X);return pe.forEach(function(ie,q){J[q]=(oe.levels[ie]&1?xe(X[ie]):null)||X[ie]}),J.join("")}function ce(X,oe,ee,G){for(var pe=$(X,oe,ee,G),J=[],ie=0;ie<X.length;ie++)J[ie]=ie;return pe.forEach(function(q){for(var Me=q[0],ne=q[1],se=J.slice(Me,ne+1),ue=se.length;ue--;)J[ne-ue]=se[ue]}),J}return r.closingToOpeningBracket=U,r.getBidiCharType=h,r.getBidiCharTypeName=v,r.getCanonicalBracket=P,r.getEmbeddingLevels=Q,r.getMirroredCharacter=xe,r.getMirroredCharactersMap=de,r.getReorderSegments=$,r.getReorderedIndices=ce,r.getReorderedString=re,r.openingToClosingBracket=S,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return s}const Nn=/\bvoid\s+main\s*\(\s*\)\s*{/g;function no(s){const r=/^[ \t]*#include +<([\w\d./]+)>/gm;function c(f,t){let e=ha[t];return e?no(e):f}return s.replace(r,c)}const Le=[];for(let s=0;s<256;s++)Le[s]=(s<16?"0":"")+s.toString(16);function Ci(){const s=Math.random()*4294967295|0,r=Math.random()*4294967295|0,c=Math.random()*4294967295|0,f=Math.random()*4294967295|0;return(Le[s&255]+Le[s>>8&255]+Le[s>>16&255]+Le[s>>24&255]+"-"+Le[r&255]+Le[r>>8&255]+"-"+Le[r>>16&15|64]+Le[r>>24&255]+"-"+Le[c&63|128]+Le[c>>8&255]+"-"+Le[c>>16&255]+Le[c>>24&255]+Le[f&255]+Le[f>>8&255]+Le[f>>16&255]+Le[f>>24&255]).toUpperCase()}const gt=Object.assign||function(){let s=arguments[0];for(let r=1,c=arguments.length;r<c;r++){let f=arguments[r];if(f)for(let t in f)Object.prototype.hasOwnProperty.call(f,t)&&(s[t]=f[t])}return s},Ui=Date.now(),wn=new WeakMap,bn=new Map;let Fi=1e10;function ao(s,r){const c=Pi(r);let f=wn.get(s);if(f||wn.set(s,f=Object.create(null)),f[c])return new f[c];const t=`_onBeforeCompile${c}`,e=function(i,l){s.onBeforeCompile.call(this,i,l);const u=this.customProgramCacheKey()+"|"+i.vertexShader+"|"+i.fragmentShader;let h=bn[u];if(!h){const v=Ri(this,i,r,c);h=bn[u]=v}i.vertexShader=h.vertexShader,i.fragmentShader=h.fragmentShader,gt(i.uniforms,this.uniforms),r.timeUniform&&(i.uniforms[r.timeUniform]={get value(){return Date.now()-Ui}}),this[t]&&this[t](i)},o=function(){return a(r.chained?s:s.clone())},a=function(i){const l=Object.create(i,n);return Object.defineProperty(l,"baseMaterial",{value:s}),Object.defineProperty(l,"id",{value:Fi++}),l.uuid=Ci(),l.uniforms=gt({},i.uniforms,r.uniforms),l.defines=gt({},i.defines,r.defines),l.defines[`TROIKA_DERIVED_MATERIAL_${c}`]="",l.extensions=gt({},i.extensions,r.extensions),l._listeners=void 0,l},n={constructor:{value:o},isDerivedMaterial:{value:!0},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return s.customProgramCacheKey()+"|"+c}},onBeforeCompile:{get(){return e},set(i){this[t]=i}},copy:{writable:!0,configurable:!0,value:function(i){return s.copy.call(this,i),!s.isShaderMaterial&&!s.isDerivedMaterial&&(gt(this.extensions,i.extensions),gt(this.defines,i.defines),gt(this.uniforms,da.clone(i.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const i=new s.constructor;return a(i).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let i=this._depthMaterial;return i||(i=this._depthMaterial=ao(s.isDerivedMaterial?s.getDepthMaterial():new fa({depthPacking:ua}),r),i.defines.IS_DEPTH_MATERIAL="",i.uniforms=this.uniforms),i}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let i=this._distanceMaterial;return i||(i=this._distanceMaterial=ao(s.isDerivedMaterial?s.getDistanceMaterial():new ca,r),i.defines.IS_DISTANCE_MATERIAL="",i.uniforms=this.uniforms),i}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:i,_distanceMaterial:l}=this;i&&i.dispose(),l&&l.dispose(),s.dispose.call(this)}}};return f[c]=o,new o}function Ri(s,{vertexShader:r,fragmentShader:c},f,t){let{vertexDefs:e,vertexMainIntro:o,vertexMainOutro:a,vertexTransform:n,fragmentDefs:i,fragmentMainIntro:l,fragmentMainOutro:u,fragmentColorTransform:h,customRewriter:v,timeUniform:p}=f;if(e=e||"",o=o||"",a=a||"",i=i||"",l=l||"",u=u||"",(n||v)&&(r=no(r)),(h||v)&&(c=c.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),c=no(c)),v){let m=v({vertexShader:r,fragmentShader:c});r=m.vertexShader,c=m.fragmentShader}if(h){let m=[];c=c.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,g=>(m.push(g),"")),u=`${h}
${m.join(`
`)}
${u}`}if(p){const m=`
uniform float ${p};
`;e=m+e,i=m+i}return n&&(r=`vec3 troika_position_${t};
vec3 troika_normal_${t};
vec2 troika_uv_${t};
${r}
`,e=`${e}
void troikaVertexTransform${t}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${n}
}
`,o=`
troika_position_${t} = vec3(position);
troika_normal_${t} = vec3(normal);
troika_uv_${t} = vec2(uv);
troikaVertexTransform${t}(troika_position_${t}, troika_normal_${t}, troika_uv_${t});
${o}
`,r=r.replace(/\b(position|normal|uv)\b/g,(m,g,_,k)=>/\battribute\s+vec[23]\s+$/.test(k.substr(0,_))?g:`troika_${g}_${t}`),s.map&&s.map.channel>0||(r=r.replace(/\bMAP_UV\b/g,`troika_uv_${t}`))),r=Mn(r,t,e,o,a),c=Mn(c,t,i,l,u),{vertexShader:r,fragmentShader:c}}function Mn(s,r,c,f,t){return(f||t||c)&&(s=s.replace(Nn,`
${c}
void troikaOrigMain${r}() {`),s+=`
void main() {
  ${f}
  troikaOrigMain${r}();
  ${t}
}`),s}function ji(s,r){return s==="uniforms"?void 0:typeof r=="function"?r.toString():r}let Ai=0;const Sn=new Map;function Pi(s){const r=JSON.stringify(s,ji);let c=Sn.get(r);return c==null&&Sn.set(r,c=++Ai),c}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function Ei(){return typeof window>"u"&&(self.window=self),function(s){var r={parse:function(t){var e=r._bin,o=new Uint8Array(t);if(e.readASCII(o,0,4)=="ttcf"){var a=4;e.readUshort(o,a),a+=2,e.readUshort(o,a),a+=2;var n=e.readUint(o,a);a+=4;for(var i=[],l=0;l<n;l++){var u=e.readUint(o,a);a+=4,i.push(r._readFont(o,u))}return i}return[r._readFont(o,0)]},_readFont:function(t,e){var o=r._bin,a=e;o.readFixed(t,e),e+=4;var n=o.readUshort(t,e);e+=2,o.readUshort(t,e),e+=2,o.readUshort(t,e),e+=2,o.readUshort(t,e),e+=2;for(var i=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],l={_data:t,_offset:a},u={},h=0;h<n;h++){var v=o.readASCII(t,e,4);e+=4,o.readUint(t,e),e+=4;var p=o.readUint(t,e);e+=4;var m=o.readUint(t,e);e+=4,u[v]={offset:p,length:m}}for(h=0;h<i.length;h++){var g=i[h];u[g]&&(l[g.trim()]=r[g.trim()].parse(t,u[g].offset,u[g].length,l))}return l},_tabOffset:function(t,e,o){for(var a=r._bin,n=a.readUshort(t,o+4),i=o+12,l=0;l<n;l++){var u=a.readASCII(t,i,4);i+=4,a.readUint(t,i),i+=4;var h=a.readUint(t,i);if(i+=4,a.readUint(t,i),i+=4,u==e)return h}return 0}};r._bin={readFixed:function(t,e){return(t[e]<<8|t[e+1])+(t[e+2]<<8|t[e+3])/65540},readF2dot14:function(t,e){return r._bin.readShort(t,e)/16384},readInt:function(t,e){return r._bin._view(t).getInt32(e)},readInt8:function(t,e){return r._bin._view(t).getInt8(e)},readShort:function(t,e){return r._bin._view(t).getInt16(e)},readUshort:function(t,e){return r._bin._view(t).getUint16(e)},readUshorts:function(t,e,o){for(var a=[],n=0;n<o;n++)a.push(r._bin.readUshort(t,e+2*n));return a},readUint:function(t,e){return r._bin._view(t).getUint32(e)},readUint64:function(t,e){return 4294967296*r._bin.readUint(t,e)+r._bin.readUint(t,e+4)},readASCII:function(t,e,o){for(var a="",n=0;n<o;n++)a+=String.fromCharCode(t[e+n]);return a},readUnicode:function(t,e,o){for(var a="",n=0;n<o;n++){var i=t[e++]<<8|t[e++];a+=String.fromCharCode(i)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(t,e,o){var a=r._bin._tdec;return a&&e==0&&o==t.length?a.decode(t):r._bin.readASCII(t,e,o)},readBytes:function(t,e,o){for(var a=[],n=0;n<o;n++)a.push(t[e+n]);return a},readASCIIArray:function(t,e,o){for(var a=[],n=0;n<o;n++)a.push(String.fromCharCode(t[e+n]));return a},_view:function(t){return t._dataView||(t._dataView=t.buffer?new DataView(t.buffer,t.byteOffset,t.byteLength):new DataView(new Uint8Array(t).buffer))}},r._lctf={},r._lctf.parse=function(t,e,o,a,n){var i=r._bin,l={},u=e;i.readFixed(t,e),e+=4;var h=i.readUshort(t,e);e+=2;var v=i.readUshort(t,e);e+=2;var p=i.readUshort(t,e);return e+=2,l.scriptList=r._lctf.readScriptList(t,u+h),l.featureList=r._lctf.readFeatureList(t,u+v),l.lookupList=r._lctf.readLookupList(t,u+p,n),l},r._lctf.readLookupList=function(t,e,o){var a=r._bin,n=e,i=[],l=a.readUshort(t,e);e+=2;for(var u=0;u<l;u++){var h=a.readUshort(t,e);e+=2;var v=r._lctf.readLookupTable(t,n+h,o);i.push(v)}return i},r._lctf.readLookupTable=function(t,e,o){var a=r._bin,n=e,i={tabs:[]};i.ltype=a.readUshort(t,e),e+=2,i.flag=a.readUshort(t,e),e+=2;var l=a.readUshort(t,e);e+=2;for(var u=i.ltype,h=0;h<l;h++){var v=a.readUshort(t,e);e+=2;var p=o(t,u,n+v,i);i.tabs.push(p)}return i},r._lctf.numOfOnes=function(t){for(var e=0,o=0;o<32;o++)t>>>o&1&&e++;return e},r._lctf.readClassDef=function(t,e){var o=r._bin,a=[],n=o.readUshort(t,e);if(e+=2,n==1){var i=o.readUshort(t,e);e+=2;var l=o.readUshort(t,e);e+=2;for(var u=0;u<l;u++)a.push(i+u),a.push(i+u),a.push(o.readUshort(t,e)),e+=2}if(n==2){var h=o.readUshort(t,e);for(e+=2,u=0;u<h;u++)a.push(o.readUshort(t,e)),e+=2,a.push(o.readUshort(t,e)),e+=2,a.push(o.readUshort(t,e)),e+=2}return a},r._lctf.getInterval=function(t,e){for(var o=0;o<t.length;o+=3){var a=t[o],n=t[o+1];if(t[o+2],a<=e&&e<=n)return o}return-1},r._lctf.readCoverage=function(t,e){var o=r._bin,a={};a.fmt=o.readUshort(t,e),e+=2;var n=o.readUshort(t,e);return e+=2,a.fmt==1&&(a.tab=o.readUshorts(t,e,n)),a.fmt==2&&(a.tab=o.readUshorts(t,e,3*n)),a},r._lctf.coverageIndex=function(t,e){var o=t.tab;if(t.fmt==1)return o.indexOf(e);if(t.fmt==2){var a=r._lctf.getInterval(o,e);if(a!=-1)return o[a+2]+(e-o[a])}return-1},r._lctf.readFeatureList=function(t,e){var o=r._bin,a=e,n=[],i=o.readUshort(t,e);e+=2;for(var l=0;l<i;l++){var u=o.readASCII(t,e,4);e+=4;var h=o.readUshort(t,e);e+=2;var v=r._lctf.readFeatureTable(t,a+h);v.tag=u.trim(),n.push(v)}return n},r._lctf.readFeatureTable=function(t,e){var o=r._bin,a=e,n={},i=o.readUshort(t,e);e+=2,i>0&&(n.featureParams=a+i);var l=o.readUshort(t,e);e+=2,n.tab=[];for(var u=0;u<l;u++)n.tab.push(o.readUshort(t,e+2*u));return n},r._lctf.readScriptList=function(t,e){var o=r._bin,a=e,n={},i=o.readUshort(t,e);e+=2;for(var l=0;l<i;l++){var u=o.readASCII(t,e,4);e+=4;var h=o.readUshort(t,e);e+=2,n[u.trim()]=r._lctf.readScriptTable(t,a+h)}return n},r._lctf.readScriptTable=function(t,e){var o=r._bin,a=e,n={},i=o.readUshort(t,e);e+=2,i>0&&(n.default=r._lctf.readLangSysTable(t,a+i));var l=o.readUshort(t,e);e+=2;for(var u=0;u<l;u++){var h=o.readASCII(t,e,4);e+=4;var v=o.readUshort(t,e);e+=2,n[h.trim()]=r._lctf.readLangSysTable(t,a+v)}return n},r._lctf.readLangSysTable=function(t,e){var o=r._bin,a={};o.readUshort(t,e),e+=2,a.reqFeature=o.readUshort(t,e),e+=2;var n=o.readUshort(t,e);return e+=2,a.features=o.readUshorts(t,e,n),a},r.CFF={},r.CFF.parse=function(t,e,o){var a=r._bin;(t=new Uint8Array(t.buffer,e,o))[e=0],t[++e],t[++e],t[++e],e++;var n=[];e=r.CFF.readIndex(t,e,n);for(var i=[],l=0;l<n.length-1;l++)i.push(a.readASCII(t,e+n[l],n[l+1]-n[l]));e+=n[n.length-1];var u=[];e=r.CFF.readIndex(t,e,u);var h=[];for(l=0;l<u.length-1;l++)h.push(r.CFF.readDict(t,e+u[l],e+u[l+1]));e+=u[u.length-1];var v=h[0],p=[];e=r.CFF.readIndex(t,e,p);var m=[];for(l=0;l<p.length-1;l++)m.push(a.readASCII(t,e+p[l],p[l+1]-p[l]));if(e+=p[p.length-1],r.CFF.readSubrs(t,e,v),v.CharStrings){e=v.CharStrings,p=[],e=r.CFF.readIndex(t,e,p);var g=[];for(l=0;l<p.length-1;l++)g.push(a.readBytes(t,e+p[l],p[l+1]-p[l]));v.CharStrings=g}if(v.ROS){e=v.FDArray;var _=[];for(e=r.CFF.readIndex(t,e,_),v.FDArray=[],l=0;l<_.length-1;l++){var k=r.CFF.readDict(t,e+_[l],e+_[l+1]);r.CFF._readFDict(t,k,m),v.FDArray.push(k)}e+=_[_.length-1],e=v.FDSelect,v.FDSelect=[];var M=t[e];if(e++,M!=3)throw M;var S=a.readUshort(t,e);for(e+=2,l=0;l<S+1;l++)v.FDSelect.push(a.readUshort(t,e),t[e+2]),e+=3}return v.Encoding&&(v.Encoding=r.CFF.readEncoding(t,v.Encoding,v.CharStrings.length)),v.charset&&(v.charset=r.CFF.readCharset(t,v.charset,v.CharStrings.length)),r.CFF._readFDict(t,v,m),v},r.CFF._readFDict=function(t,e,o){var a;for(var n in e.Private&&(a=e.Private[1],e.Private=r.CFF.readDict(t,a,a+e.Private[0]),e.Private.Subrs&&r.CFF.readSubrs(t,a+e.Private.Subrs,e.Private)),e)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(n)!=-1&&(e[n]=o[e[n]-426+35])},r.CFF.readSubrs=function(t,e,o){var a=r._bin,n=[];e=r.CFF.readIndex(t,e,n);var i,l=n.length;i=l<1240?107:l<33900?1131:32768,o.Bias=i,o.Subrs=[];for(var u=0;u<n.length-1;u++)o.Subrs.push(a.readBytes(t,e+n[u],n[u+1]-n[u]))},r.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],r.CFF.glyphByUnicode=function(t,e){for(var o=0;o<t.charset.length;o++)if(t.charset[o]==e)return o;return-1},r.CFF.glyphBySE=function(t,e){return e<0||e>255?-1:r.CFF.glyphByUnicode(t,r.CFF.tableSE[e])},r.CFF.readEncoding=function(t,e,o){r._bin;var a=[".notdef"],n=t[e];if(e++,n!=0)throw"error: unknown encoding format: "+n;var i=t[e];e++;for(var l=0;l<i;l++)a.push(t[e+l]);return a},r.CFF.readCharset=function(t,e,o){var a=r._bin,n=[".notdef"],i=t[e];if(e++,i==0)for(var l=0;l<o;l++){var u=a.readUshort(t,e);e+=2,n.push(u)}else{if(i!=1&&i!=2)throw"error: format: "+i;for(;n.length<o;){u=a.readUshort(t,e),e+=2;var h=0;for(i==1?(h=t[e],e++):(h=a.readUshort(t,e),e+=2),l=0;l<=h;l++)n.push(u),u++}}return n},r.CFF.readIndex=function(t,e,o){var a=r._bin,n=a.readUshort(t,e)+1,i=t[e+=2];if(e++,i==1)for(var l=0;l<n;l++)o.push(t[e+l]);else if(i==2)for(l=0;l<n;l++)o.push(a.readUshort(t,e+2*l));else if(i==3)for(l=0;l<n;l++)o.push(16777215&a.readUint(t,e+3*l-1));else if(n!=1)throw"unsupported offset size: "+i+", count: "+n;return(e+=n*i)-1},r.CFF.getCharString=function(t,e,o){var a=r._bin,n=t[e],i=t[e+1];t[e+2],t[e+3],t[e+4];var l=1,u=null,h=null;n<=20&&(u=n,l=1),n==12&&(u=100*n+i,l=2),21<=n&&n<=27&&(u=n,l=1),n==28&&(h=a.readShort(t,e+1),l=3),29<=n&&n<=31&&(u=n,l=1),32<=n&&n<=246&&(h=n-139,l=1),247<=n&&n<=250&&(h=256*(n-247)+i+108,l=2),251<=n&&n<=254&&(h=256*-(n-251)-i-108,l=2),n==255&&(h=a.readInt(t,e+1)/65535,l=5),o.val=h??"o"+u,o.size=l},r.CFF.readCharString=function(t,e,o){for(var a=e+o,n=r._bin,i=[];e<a;){var l=t[e],u=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,v=null,p=null;l<=20&&(v=l,h=1),l==12&&(v=100*l+u,h=2),l!=19&&l!=20||(v=l,h=2),21<=l&&l<=27&&(v=l,h=1),l==28&&(p=n.readShort(t,e+1),h=3),29<=l&&l<=31&&(v=l,h=1),32<=l&&l<=246&&(p=l-139,h=1),247<=l&&l<=250&&(p=256*(l-247)+u+108,h=2),251<=l&&l<=254&&(p=256*-(l-251)-u-108,h=2),l==255&&(p=n.readInt(t,e+1)/65535,h=5),i.push(p??"o"+v),e+=h}return i},r.CFF.readDict=function(t,e,o){for(var a=r._bin,n={},i=[];e<o;){var l=t[e],u=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,v=null,p=null;if(l==28&&(p=a.readShort(t,e+1),h=3),l==29&&(p=a.readInt(t,e+1),h=5),32<=l&&l<=246&&(p=l-139,h=1),247<=l&&l<=250&&(p=256*(l-247)+u+108,h=2),251<=l&&l<=254&&(p=256*-(l-251)-u-108,h=2),l==255)throw p=a.readInt(t,e+1)/65535,h=5,"unknown number";if(l==30){var m=[];for(h=1;;){var g=t[e+h];h++;var _=g>>4,k=15&g;if(_!=15&&m.push(_),k!=15&&m.push(k),k==15)break}for(var M="",S=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],U=0;U<m.length;U++)M+=S[m[U]];p=parseFloat(M)}l<=21&&(v=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][l],h=1,l==12&&(v=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][u],h=2)),v!=null?(n[v]=i.length==1?i[0]:i,i=[]):i.push(p),e+=h}return n},r.cmap={},r.cmap.parse=function(t,e,o){t=new Uint8Array(t.buffer,e,o),e=0;var a=r._bin,n={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2;var l=[];n.tables=[];for(var u=0;u<i;u++){var h=a.readUshort(t,e);e+=2;var v=a.readUshort(t,e);e+=2;var p=a.readUint(t,e);e+=4;var m="p"+h+"e"+v,g=l.indexOf(p);if(g==-1){var _;g=n.tables.length,l.push(p);var k=a.readUshort(t,p);k==0?_=r.cmap.parse0(t,p):k==4?_=r.cmap.parse4(t,p):k==6?_=r.cmap.parse6(t,p):k==12&&(_=r.cmap.parse12(t,p)),n.tables.push(_)}if(n[m]!=null)throw"multiple tables for one platform+encoding";n[m]=g}return n},r.cmap.parse0=function(t,e){var o=r._bin,a={};a.format=o.readUshort(t,e),e+=2;var n=o.readUshort(t,e);e+=2,o.readUshort(t,e),e+=2,a.map=[];for(var i=0;i<n-6;i++)a.map.push(t[e+i]);return a},r.cmap.parse4=function(t,e){var o=r._bin,a=e,n={};n.format=o.readUshort(t,e),e+=2;var i=o.readUshort(t,e);e+=2,o.readUshort(t,e),e+=2;var l=o.readUshort(t,e);e+=2;var u=l/2;n.searchRange=o.readUshort(t,e),e+=2,n.entrySelector=o.readUshort(t,e),e+=2,n.rangeShift=o.readUshort(t,e),e+=2,n.endCount=o.readUshorts(t,e,u),e+=2*u,e+=2,n.startCount=o.readUshorts(t,e,u),e+=2*u,n.idDelta=[];for(var h=0;h<u;h++)n.idDelta.push(o.readShort(t,e)),e+=2;for(n.idRangeOffset=o.readUshorts(t,e,u),e+=2*u,n.glyphIdArray=[];e<a+i;)n.glyphIdArray.push(o.readUshort(t,e)),e+=2;return n},r.cmap.parse6=function(t,e){var o=r._bin,a={};a.format=o.readUshort(t,e),e+=2,o.readUshort(t,e),e+=2,o.readUshort(t,e),e+=2,a.firstCode=o.readUshort(t,e),e+=2;var n=o.readUshort(t,e);e+=2,a.glyphIdArray=[];for(var i=0;i<n;i++)a.glyphIdArray.push(o.readUshort(t,e)),e+=2;return a},r.cmap.parse12=function(t,e){var o=r._bin,a={};a.format=o.readUshort(t,e),e+=2,e+=2,o.readUint(t,e),e+=4,o.readUint(t,e),e+=4;var n=o.readUint(t,e);e+=4,a.groups=[];for(var i=0;i<n;i++){var l=e+12*i,u=o.readUint(t,l+0),h=o.readUint(t,l+4),v=o.readUint(t,l+8);a.groups.push([u,h,v])}return a},r.glyf={},r.glyf.parse=function(t,e,o,a){for(var n=[],i=0;i<a.maxp.numGlyphs;i++)n.push(null);return n},r.glyf._parseGlyf=function(t,e){var o=r._bin,a=t._data,n=r._tabOffset(a,"glyf",t._offset)+t.loca[e];if(t.loca[e]==t.loca[e+1])return null;var i={};if(i.noc=o.readShort(a,n),n+=2,i.xMin=o.readShort(a,n),n+=2,i.yMin=o.readShort(a,n),n+=2,i.xMax=o.readShort(a,n),n+=2,i.yMax=o.readShort(a,n),n+=2,i.xMin>=i.xMax||i.yMin>=i.yMax)return null;if(i.noc>0){i.endPts=[];for(var l=0;l<i.noc;l++)i.endPts.push(o.readUshort(a,n)),n+=2;var u=o.readUshort(a,n);if(n+=2,a.length-n<u)return null;i.instructions=o.readBytes(a,n,u),n+=u;var h=i.endPts[i.noc-1]+1;for(i.flags=[],l=0;l<h;l++){var v=a[n];if(n++,i.flags.push(v),(8&v)!=0){var p=a[n];n++;for(var m=0;m<p;m++)i.flags.push(v),l++}}for(i.xs=[],l=0;l<h;l++){var g=(2&i.flags[l])!=0,_=(16&i.flags[l])!=0;g?(i.xs.push(_?a[n]:-a[n]),n++):_?i.xs.push(0):(i.xs.push(o.readShort(a,n)),n+=2)}for(i.ys=[],l=0;l<h;l++)g=(4&i.flags[l])!=0,_=(32&i.flags[l])!=0,g?(i.ys.push(_?a[n]:-a[n]),n++):_?i.ys.push(0):(i.ys.push(o.readShort(a,n)),n+=2);var k=0,M=0;for(l=0;l<h;l++)k+=i.xs[l],M+=i.ys[l],i.xs[l]=k,i.ys[l]=M}else{var S;i.parts=[];do{S=o.readUshort(a,n),n+=2;var U={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(i.parts.push(U),U.glyphIndex=o.readUshort(a,n),n+=2,1&S){var P=o.readShort(a,n);n+=2;var b=o.readShort(a,n);n+=2}else P=o.readInt8(a,n),n++,b=o.readInt8(a,n),n++;2&S?(U.m.tx=P,U.m.ty=b):(U.p1=P,U.p2=b),8&S?(U.m.a=U.m.d=o.readF2dot14(a,n),n+=2):64&S?(U.m.a=o.readF2dot14(a,n),n+=2,U.m.d=o.readF2dot14(a,n),n+=2):128&S&&(U.m.a=o.readF2dot14(a,n),n+=2,U.m.b=o.readF2dot14(a,n),n+=2,U.m.c=o.readF2dot14(a,n),n+=2,U.m.d=o.readF2dot14(a,n),n+=2)}while(32&S);if(256&S){var T=o.readUshort(a,n);for(n+=2,i.instr=[],l=0;l<T;l++)i.instr.push(a[n]),n++}}return i},r.GDEF={},r.GDEF.parse=function(t,e,o,a){var n=e;e+=4;var i=r._bin.readUshort(t,e);return{glyphClassDef:i===0?null:r._lctf.readClassDef(t,n+i)}},r.GPOS={},r.GPOS.parse=function(t,e,o,a){return r._lctf.parse(t,e,o,a,r.GPOS.subt)},r.GPOS.subt=function(t,e,o,a){var n=r._bin,i=o,l={};if(l.fmt=n.readUshort(t,o),o+=2,e==1||e==2||e==3||e==7||e==8&&l.fmt<=2){var u=n.readUshort(t,o);o+=2,l.coverage=r._lctf.readCoverage(t,u+i)}if(e==1&&l.fmt==1){var h=n.readUshort(t,o);o+=2,h!=0&&(l.pos=r.GPOS.readValueRecord(t,o,h))}else if(e==2&&l.fmt>=1&&l.fmt<=2){h=n.readUshort(t,o),o+=2;var v=n.readUshort(t,o);o+=2;var p=r._lctf.numOfOnes(h),m=r._lctf.numOfOnes(v);if(l.fmt==1){l.pairsets=[];var g=n.readUshort(t,o);o+=2;for(var _=0;_<g;_++){var k=i+n.readUshort(t,o);o+=2;var M=n.readUshort(t,k);k+=2;for(var S=[],U=0;U<M;U++){var P=n.readUshort(t,k);k+=2,h!=0&&(y=r.GPOS.readValueRecord(t,k,h),k+=2*p),v!=0&&(A=r.GPOS.readValueRecord(t,k,v),k+=2*m),S.push({gid2:P,val1:y,val2:A})}l.pairsets.push(S)}}if(l.fmt==2){var b=n.readUshort(t,o);o+=2;var T=n.readUshort(t,o);o+=2;var L=n.readUshort(t,o);o+=2;var E=n.readUshort(t,o);for(o+=2,l.classDef1=r._lctf.readClassDef(t,i+b),l.classDef2=r._lctf.readClassDef(t,i+T),l.matrix=[],_=0;_<L;_++){var H=[];for(U=0;U<E;U++){var y=null,A=null;h!=0&&(y=r.GPOS.readValueRecord(t,o,h),o+=2*p),v!=0&&(A=r.GPOS.readValueRecord(t,o,v),o+=2*m),H.push({val1:y,val2:A})}l.matrix.push(H)}}}else if(e==4&&l.fmt==1)l.markCoverage=r._lctf.readCoverage(t,n.readUshort(t,o)+i),l.baseCoverage=r._lctf.readCoverage(t,n.readUshort(t,o+2)+i),l.markClassCount=n.readUshort(t,o+4),l.markArray=r.GPOS.readMarkArray(t,n.readUshort(t,o+6)+i),l.baseArray=r.GPOS.readBaseArray(t,n.readUshort(t,o+8)+i,l.markClassCount);else if(e==6&&l.fmt==1)l.mark1Coverage=r._lctf.readCoverage(t,n.readUshort(t,o)+i),l.mark2Coverage=r._lctf.readCoverage(t,n.readUshort(t,o+2)+i),l.markClassCount=n.readUshort(t,o+4),l.mark1Array=r.GPOS.readMarkArray(t,n.readUshort(t,o+6)+i),l.mark2Array=r.GPOS.readBaseArray(t,n.readUshort(t,o+8)+i,l.markClassCount);else if(e==9&&l.fmt==1){var j=n.readUshort(t,o);o+=2;var Y=n.readUint(t,o);if(o+=4,a.ltype==9)a.ltype=j;else if(a.ltype!=j)throw"invalid extension substitution";return r.GPOS.subt(t,a.ltype,i+Y)}return l},r.GPOS.readValueRecord=function(t,e,o){var a=r._bin,n=[];return n.push(1&o?a.readShort(t,e):0),e+=1&o?2:0,n.push(2&o?a.readShort(t,e):0),e+=2&o?2:0,n.push(4&o?a.readShort(t,e):0),e+=4&o?2:0,n.push(8&o?a.readShort(t,e):0),e+=8&o?2:0,n},r.GPOS.readBaseArray=function(t,e,o){var a=r._bin,n=[],i=e,l=a.readUshort(t,e);e+=2;for(var u=0;u<l;u++){for(var h=[],v=0;v<o;v++)h.push(r.GPOS.readAnchorRecord(t,i+a.readUshort(t,e))),e+=2;n.push(h)}return n},r.GPOS.readMarkArray=function(t,e){var o=r._bin,a=[],n=e,i=o.readUshort(t,e);e+=2;for(var l=0;l<i;l++){var u=r.GPOS.readAnchorRecord(t,o.readUshort(t,e+2)+n);u.markClass=o.readUshort(t,e),a.push(u),e+=4}return a},r.GPOS.readAnchorRecord=function(t,e){var o=r._bin,a={};return a.fmt=o.readUshort(t,e),a.x=o.readShort(t,e+2),a.y=o.readShort(t,e+4),a},r.GSUB={},r.GSUB.parse=function(t,e,o,a){return r._lctf.parse(t,e,o,a,r.GSUB.subt)},r.GSUB.subt=function(t,e,o,a){var n=r._bin,i=o,l={};if(l.fmt=n.readUshort(t,o),o+=2,e!=1&&e!=2&&e!=4&&e!=5&&e!=6)return null;if(e==1||e==2||e==4||e==5&&l.fmt<=2||e==6&&l.fmt<=2){var u=n.readUshort(t,o);o+=2,l.coverage=r._lctf.readCoverage(t,i+u)}if(e==1&&l.fmt>=1&&l.fmt<=2){if(l.fmt==1)l.delta=n.readShort(t,o),o+=2;else if(l.fmt==2){var h=n.readUshort(t,o);o+=2,l.newg=n.readUshorts(t,o,h),o+=2*l.newg.length}}else if(e==2&&l.fmt==1){h=n.readUshort(t,o),o+=2,l.seqs=[];for(var v=0;v<h;v++){var p=n.readUshort(t,o)+i;o+=2;var m=n.readUshort(t,p);l.seqs.push(n.readUshorts(t,p+2,m))}}else if(e==4)for(l.vals=[],h=n.readUshort(t,o),o+=2,v=0;v<h;v++){var g=n.readUshort(t,o);o+=2,l.vals.push(r.GSUB.readLigatureSet(t,i+g))}else if(e==5&&l.fmt==2){if(l.fmt==2){var _=n.readUshort(t,o);o+=2,l.cDef=r._lctf.readClassDef(t,i+_),l.scset=[];var k=n.readUshort(t,o);for(o+=2,v=0;v<k;v++){var M=n.readUshort(t,o);o+=2,l.scset.push(M==0?null:r.GSUB.readSubClassSet(t,i+M))}}}else if(e==6&&l.fmt==3){if(l.fmt==3){for(v=0;v<3;v++){h=n.readUshort(t,o),o+=2;for(var S=[],U=0;U<h;U++)S.push(r._lctf.readCoverage(t,i+n.readUshort(t,o+2*U)));o+=2*h,v==0&&(l.backCvg=S),v==1&&(l.inptCvg=S),v==2&&(l.ahedCvg=S)}h=n.readUshort(t,o),o+=2,l.lookupRec=r.GSUB.readSubstLookupRecords(t,o,h)}}else if(e==7&&l.fmt==1){var P=n.readUshort(t,o);o+=2;var b=n.readUint(t,o);if(o+=4,a.ltype==9)a.ltype=P;else if(a.ltype!=P)throw"invalid extension substitution";return r.GSUB.subt(t,a.ltype,i+b)}return l},r.GSUB.readSubClassSet=function(t,e){var o=r._bin.readUshort,a=e,n=[],i=o(t,e);e+=2;for(var l=0;l<i;l++){var u=o(t,e);e+=2,n.push(r.GSUB.readSubClassRule(t,a+u))}return n},r.GSUB.readSubClassRule=function(t,e){var o=r._bin.readUshort,a={},n=o(t,e),i=o(t,e+=2);e+=2,a.input=[];for(var l=0;l<n-1;l++)a.input.push(o(t,e)),e+=2;return a.substLookupRecords=r.GSUB.readSubstLookupRecords(t,e,i),a},r.GSUB.readSubstLookupRecords=function(t,e,o){for(var a=r._bin.readUshort,n=[],i=0;i<o;i++)n.push(a(t,e),a(t,e+2)),e+=4;return n},r.GSUB.readChainSubClassSet=function(t,e){var o=r._bin,a=e,n=[],i=o.readUshort(t,e);e+=2;for(var l=0;l<i;l++){var u=o.readUshort(t,e);e+=2,n.push(r.GSUB.readChainSubClassRule(t,a+u))}return n},r.GSUB.readChainSubClassRule=function(t,e){for(var o=r._bin,a={},n=["backtrack","input","lookahead"],i=0;i<n.length;i++){var l=o.readUshort(t,e);e+=2,i==1&&l--,a[n[i]]=o.readUshorts(t,e,l),e+=2*a[n[i]].length}return l=o.readUshort(t,e),e+=2,a.subst=o.readUshorts(t,e,2*l),e+=2*a.subst.length,a},r.GSUB.readLigatureSet=function(t,e){var o=r._bin,a=e,n=[],i=o.readUshort(t,e);e+=2;for(var l=0;l<i;l++){var u=o.readUshort(t,e);e+=2,n.push(r.GSUB.readLigature(t,a+u))}return n},r.GSUB.readLigature=function(t,e){var o=r._bin,a={chain:[]};a.nglyph=o.readUshort(t,e),e+=2;var n=o.readUshort(t,e);e+=2;for(var i=0;i<n-1;i++)a.chain.push(o.readUshort(t,e)),e+=2;return a},r.head={},r.head.parse=function(t,e,o){var a=r._bin,n={};return a.readFixed(t,e),e+=4,n.fontRevision=a.readFixed(t,e),e+=4,a.readUint(t,e),e+=4,a.readUint(t,e),e+=4,n.flags=a.readUshort(t,e),e+=2,n.unitsPerEm=a.readUshort(t,e),e+=2,n.created=a.readUint64(t,e),e+=8,n.modified=a.readUint64(t,e),e+=8,n.xMin=a.readShort(t,e),e+=2,n.yMin=a.readShort(t,e),e+=2,n.xMax=a.readShort(t,e),e+=2,n.yMax=a.readShort(t,e),e+=2,n.macStyle=a.readUshort(t,e),e+=2,n.lowestRecPPEM=a.readUshort(t,e),e+=2,n.fontDirectionHint=a.readShort(t,e),e+=2,n.indexToLocFormat=a.readShort(t,e),e+=2,n.glyphDataFormat=a.readShort(t,e),e+=2,n},r.hhea={},r.hhea.parse=function(t,e,o){var a=r._bin,n={};return a.readFixed(t,e),e+=4,n.ascender=a.readShort(t,e),e+=2,n.descender=a.readShort(t,e),e+=2,n.lineGap=a.readShort(t,e),e+=2,n.advanceWidthMax=a.readUshort(t,e),e+=2,n.minLeftSideBearing=a.readShort(t,e),e+=2,n.minRightSideBearing=a.readShort(t,e),e+=2,n.xMaxExtent=a.readShort(t,e),e+=2,n.caretSlopeRise=a.readShort(t,e),e+=2,n.caretSlopeRun=a.readShort(t,e),e+=2,n.caretOffset=a.readShort(t,e),e+=2,e+=8,n.metricDataFormat=a.readShort(t,e),e+=2,n.numberOfHMetrics=a.readUshort(t,e),e+=2,n},r.hmtx={},r.hmtx.parse=function(t,e,o,a){for(var n=r._bin,i={aWidth:[],lsBearing:[]},l=0,u=0,h=0;h<a.maxp.numGlyphs;h++)h<a.hhea.numberOfHMetrics&&(l=n.readUshort(t,e),e+=2,u=n.readShort(t,e),e+=2),i.aWidth.push(l),i.lsBearing.push(u);return i},r.kern={},r.kern.parse=function(t,e,o,a){var n=r._bin,i=n.readUshort(t,e);if(e+=2,i==1)return r.kern.parseV1(t,e-2,o,a);var l=n.readUshort(t,e);e+=2;for(var u={glyph1:[],rval:[]},h=0;h<l;h++){e+=2,o=n.readUshort(t,e),e+=2;var v=n.readUshort(t,e);e+=2;var p=v>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;e=r.kern.readFormat0(t,e,u)}return u},r.kern.parseV1=function(t,e,o,a){var n=r._bin;n.readFixed(t,e),e+=4;var i=n.readUint(t,e);e+=4;for(var l={glyph1:[],rval:[]},u=0;u<i;u++){n.readUint(t,e),e+=4;var h=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2;var v=h>>>8;if((v&=15)!=0)throw"unknown kern table format: "+v;e=r.kern.readFormat0(t,e,l)}return l},r.kern.readFormat0=function(t,e,o){var a=r._bin,n=-1,i=a.readUshort(t,e);e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2;for(var l=0;l<i;l++){var u=a.readUshort(t,e);e+=2;var h=a.readUshort(t,e);e+=2;var v=a.readShort(t,e);e+=2,u!=n&&(o.glyph1.push(u),o.rval.push({glyph2:[],vals:[]}));var p=o.rval[o.rval.length-1];p.glyph2.push(h),p.vals.push(v),n=u}return e},r.loca={},r.loca.parse=function(t,e,o,a){var n=r._bin,i=[],l=a.head.indexToLocFormat,u=a.maxp.numGlyphs+1;if(l==0)for(var h=0;h<u;h++)i.push(n.readUshort(t,e+(h<<1))<<1);if(l==1)for(h=0;h<u;h++)i.push(n.readUint(t,e+(h<<2)));return i},r.maxp={},r.maxp.parse=function(t,e,o){var a=r._bin,n={},i=a.readUint(t,e);return e+=4,n.numGlyphs=a.readUshort(t,e),e+=2,i==65536&&(n.maxPoints=a.readUshort(t,e),e+=2,n.maxContours=a.readUshort(t,e),e+=2,n.maxCompositePoints=a.readUshort(t,e),e+=2,n.maxCompositeContours=a.readUshort(t,e),e+=2,n.maxZones=a.readUshort(t,e),e+=2,n.maxTwilightPoints=a.readUshort(t,e),e+=2,n.maxStorage=a.readUshort(t,e),e+=2,n.maxFunctionDefs=a.readUshort(t,e),e+=2,n.maxInstructionDefs=a.readUshort(t,e),e+=2,n.maxStackElements=a.readUshort(t,e),e+=2,n.maxSizeOfInstructions=a.readUshort(t,e),e+=2,n.maxComponentElements=a.readUshort(t,e),e+=2,n.maxComponentDepth=a.readUshort(t,e),e+=2),n},r.name={},r.name.parse=function(t,e,o){var a=r._bin,n={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2,a.readUshort(t,e);for(var l,u=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=e+=2,v=0;v<i;v++){var p=a.readUshort(t,e);e+=2;var m=a.readUshort(t,e);e+=2;var g=a.readUshort(t,e);e+=2;var _=a.readUshort(t,e);e+=2;var k=a.readUshort(t,e);e+=2;var M=a.readUshort(t,e);e+=2;var S,U=u[_],P=h+12*i+M;if(p==0)S=a.readUnicode(t,P,k/2);else if(p==3&&m==0)S=a.readUnicode(t,P,k/2);else if(m==0)S=a.readASCII(t,P,k);else if(m==1)S=a.readUnicode(t,P,k/2);else if(m==3)S=a.readUnicode(t,P,k/2);else{if(p!=1)throw"unknown encoding "+m+", platformID: "+p;S=a.readASCII(t,P,k)}var b="p"+p+","+g.toString(16);n[b]==null&&(n[b]={}),n[b][U!==void 0?U:_]=S,n[b]._lang=g}for(var T in n)if(n[T].postScriptName!=null&&n[T]._lang==1033)return n[T];for(var T in n)if(n[T].postScriptName!=null&&n[T]._lang==0)return n[T];for(var T in n)if(n[T].postScriptName!=null&&n[T]._lang==3084)return n[T];for(var T in n)if(n[T].postScriptName!=null)return n[T];for(var T in n){l=T;break}return n[l]},r["OS/2"]={},r["OS/2"].parse=function(t,e,o){var a=r._bin.readUshort(t,e);e+=2;var n={};if(a==0)r["OS/2"].version0(t,e,n);else if(a==1)r["OS/2"].version1(t,e,n);else if(a==2||a==3||a==4)r["OS/2"].version2(t,e,n);else{if(a!=5)throw"unknown OS/2 table version: "+a;r["OS/2"].version5(t,e,n)}return n},r["OS/2"].version0=function(t,e,o){var a=r._bin;return o.xAvgCharWidth=a.readShort(t,e),e+=2,o.usWeightClass=a.readUshort(t,e),e+=2,o.usWidthClass=a.readUshort(t,e),e+=2,o.fsType=a.readUshort(t,e),e+=2,o.ySubscriptXSize=a.readShort(t,e),e+=2,o.ySubscriptYSize=a.readShort(t,e),e+=2,o.ySubscriptXOffset=a.readShort(t,e),e+=2,o.ySubscriptYOffset=a.readShort(t,e),e+=2,o.ySuperscriptXSize=a.readShort(t,e),e+=2,o.ySuperscriptYSize=a.readShort(t,e),e+=2,o.ySuperscriptXOffset=a.readShort(t,e),e+=2,o.ySuperscriptYOffset=a.readShort(t,e),e+=2,o.yStrikeoutSize=a.readShort(t,e),e+=2,o.yStrikeoutPosition=a.readShort(t,e),e+=2,o.sFamilyClass=a.readShort(t,e),e+=2,o.panose=a.readBytes(t,e,10),e+=10,o.ulUnicodeRange1=a.readUint(t,e),e+=4,o.ulUnicodeRange2=a.readUint(t,e),e+=4,o.ulUnicodeRange3=a.readUint(t,e),e+=4,o.ulUnicodeRange4=a.readUint(t,e),e+=4,o.achVendID=[a.readInt8(t,e),a.readInt8(t,e+1),a.readInt8(t,e+2),a.readInt8(t,e+3)],e+=4,o.fsSelection=a.readUshort(t,e),e+=2,o.usFirstCharIndex=a.readUshort(t,e),e+=2,o.usLastCharIndex=a.readUshort(t,e),e+=2,o.sTypoAscender=a.readShort(t,e),e+=2,o.sTypoDescender=a.readShort(t,e),e+=2,o.sTypoLineGap=a.readShort(t,e),e+=2,o.usWinAscent=a.readUshort(t,e),e+=2,o.usWinDescent=a.readUshort(t,e),e+=2},r["OS/2"].version1=function(t,e,o){var a=r._bin;return e=r["OS/2"].version0(t,e,o),o.ulCodePageRange1=a.readUint(t,e),e+=4,o.ulCodePageRange2=a.readUint(t,e),e+=4},r["OS/2"].version2=function(t,e,o){var a=r._bin;return e=r["OS/2"].version1(t,e,o),o.sxHeight=a.readShort(t,e),e+=2,o.sCapHeight=a.readShort(t,e),e+=2,o.usDefault=a.readUshort(t,e),e+=2,o.usBreak=a.readUshort(t,e),e+=2,o.usMaxContext=a.readUshort(t,e),e+=2},r["OS/2"].version5=function(t,e,o){var a=r._bin;return e=r["OS/2"].version2(t,e,o),o.usLowerOpticalPointSize=a.readUshort(t,e),e+=2,o.usUpperOpticalPointSize=a.readUshort(t,e),e+=2},r.post={},r.post.parse=function(t,e,o){var a=r._bin,n={};return n.version=a.readFixed(t,e),e+=4,n.italicAngle=a.readFixed(t,e),e+=4,n.underlinePosition=a.readShort(t,e),e+=2,n.underlineThickness=a.readShort(t,e),e+=2,n},r==null&&(r={}),r.U==null&&(r.U={}),r.U.codeToGlyph=function(t,e){var o=t.cmap,a=-1;if(o.p0e4!=null?a=o.p0e4:o.p3e1!=null?a=o.p3e1:o.p1e0!=null?a=o.p1e0:o.p0e3!=null&&(a=o.p0e3),a==-1)throw"no familiar platform and encoding!";var n=o.tables[a];if(n.format==0)return e>=n.map.length?0:n.map[e];if(n.format==4){for(var i=-1,l=0;l<n.endCount.length;l++)if(e<=n.endCount[l]){i=l;break}return i==-1||n.startCount[i]>e?0:65535&(n.idRangeOffset[i]!=0?n.glyphIdArray[e-n.startCount[i]+(n.idRangeOffset[i]>>1)-(n.idRangeOffset.length-i)]:e+n.idDelta[i])}if(n.format==12){if(e>n.groups[n.groups.length-1][1])return 0;for(l=0;l<n.groups.length;l++){var u=n.groups[l];if(u[0]<=e&&e<=u[1])return u[2]+(e-u[0])}return 0}throw"unknown cmap table format "+n.format},r.U.glyphToPath=function(t,e){var o={cmds:[],crds:[]};if(t.SVG&&t.SVG.entries[e]){var a=t.SVG.entries[e];return a==null?o:(typeof a=="string"&&(a=r.SVG.toPath(a),t.SVG.entries[e]=a),a)}if(t.CFF){var n={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:t.CFF.Private?t.CFF.Private.defaultWidthX:0,open:!1},i=t.CFF,l=t.CFF.Private;if(i.ROS){for(var u=0;i.FDSelect[u+2]<=e;)u+=2;l=i.FDArray[i.FDSelect[u+1]].Private}r.U._drawCFF(t.CFF.CharStrings[e],n,i,l,o)}else t.glyf&&r.U._drawGlyf(e,t,o);return o},r.U._drawGlyf=function(t,e,o){var a=e.glyf[t];a==null&&(a=e.glyf[t]=r.glyf._parseGlyf(e,t)),a!=null&&(a.noc>-1?r.U._simpleGlyph(a,o):r.U._compoGlyph(a,e,o))},r.U._simpleGlyph=function(t,e){for(var o=0;o<t.noc;o++){for(var a=o==0?0:t.endPts[o-1]+1,n=t.endPts[o],i=a;i<=n;i++){var l=i==a?n:i-1,u=i==n?a:i+1,h=1&t.flags[i],v=1&t.flags[l],p=1&t.flags[u],m=t.xs[i],g=t.ys[i];if(i==a)if(h){if(!v){r.U.P.moveTo(e,m,g);continue}r.U.P.moveTo(e,t.xs[l],t.ys[l])}else v?r.U.P.moveTo(e,t.xs[l],t.ys[l]):r.U.P.moveTo(e,(t.xs[l]+m)/2,(t.ys[l]+g)/2);h?v&&r.U.P.lineTo(e,m,g):p?r.U.P.qcurveTo(e,m,g,t.xs[u],t.ys[u]):r.U.P.qcurveTo(e,m,g,(m+t.xs[u])/2,(g+t.ys[u])/2)}r.U.P.closePath(e)}},r.U._compoGlyph=function(t,e,o){for(var a=0;a<t.parts.length;a++){var n={cmds:[],crds:[]},i=t.parts[a];r.U._drawGlyf(i.glyphIndex,e,n);for(var l=i.m,u=0;u<n.crds.length;u+=2){var h=n.crds[u],v=n.crds[u+1];o.crds.push(h*l.a+v*l.b+l.tx),o.crds.push(h*l.c+v*l.d+l.ty)}for(u=0;u<n.cmds.length;u++)o.cmds.push(n.cmds[u])}},r.U._getGlyphClass=function(t,e){var o=r._lctf.getInterval(e,t);return o==-1?0:e[o+2]},r.U._applySubs=function(t,e,o,a){for(var n=t.length-e-1,i=0;i<o.tabs.length;i++)if(o.tabs[i]!=null){var l,u=o.tabs[i];if(!u.coverage||(l=r._lctf.coverageIndex(u.coverage,t[e]))!=-1){if(o.ltype==1)t[e],u.fmt==1?t[e]=t[e]+u.delta:t[e]=u.newg[l];else if(o.ltype==4)for(var h=u.vals[l],v=0;v<h.length;v++){var p=h[v],m=p.chain.length;if(!(m>n)){for(var g=!0,_=0,k=0;k<m;k++){for(;t[e+_+(1+k)]==-1;)_++;p.chain[k]!=t[e+_+(1+k)]&&(g=!1)}if(g){for(t[e]=p.nglyph,k=0;k<m+_;k++)t[e+k+1]=-1;break}}}else if(o.ltype==5&&u.fmt==2)for(var M=r._lctf.getInterval(u.cDef,t[e]),S=u.cDef[M+2],U=u.scset[S],P=0;P<U.length;P++){var b=U[P],T=b.input;if(!(T.length>n)){for(g=!0,k=0;k<T.length;k++){var L=r._lctf.getInterval(u.cDef,t[e+1+k]);if(M==-1&&u.cDef[L+2]!=T[k]){g=!1;break}}if(g){var E=b.substLookupRecords;for(v=0;v<E.length;v+=2)E[v],E[v+1]}}}else if(o.ltype==6&&u.fmt==3){if(!r.U._glsCovered(t,u.backCvg,e-u.backCvg.length)||!r.U._glsCovered(t,u.inptCvg,e)||!r.U._glsCovered(t,u.ahedCvg,e+u.inptCvg.length))continue;var H=u.lookupRec;for(P=0;P<H.length;P+=2){M=H[P];var y=a[H[P+1]];r.U._applySubs(t,e+M,y,a)}}}}},r.U._glsCovered=function(t,e,o){for(var a=0;a<e.length;a++)if(r._lctf.coverageIndex(e[a],t[o+a])==-1)return!1;return!0},r.U.glyphsToPath=function(t,e,o){for(var a={cmds:[],crds:[]},n=0,i=0;i<e.length;i++){var l=e[i];if(l!=-1){for(var u=i<e.length-1&&e[i+1]!=-1?e[i+1]:0,h=r.U.glyphToPath(t,l),v=0;v<h.crds.length;v+=2)a.crds.push(h.crds[v]+n),a.crds.push(h.crds[v+1]);for(o&&a.cmds.push(o),v=0;v<h.cmds.length;v++)a.cmds.push(h.cmds[v]);o&&a.cmds.push("X"),n+=t.hmtx.aWidth[l],i<e.length-1&&(n+=r.U.getPairAdjustment(t,l,u))}}return a},r.U.P={},r.U.P.moveTo=function(t,e,o){t.cmds.push("M"),t.crds.push(e,o)},r.U.P.lineTo=function(t,e,o){t.cmds.push("L"),t.crds.push(e,o)},r.U.P.curveTo=function(t,e,o,a,n,i,l){t.cmds.push("C"),t.crds.push(e,o,a,n,i,l)},r.U.P.qcurveTo=function(t,e,o,a,n){t.cmds.push("Q"),t.crds.push(e,o,a,n)},r.U.P.closePath=function(t){t.cmds.push("Z")},r.U._drawCFF=function(t,e,o,a,n){for(var i=e.stack,l=e.nStems,u=e.haveWidth,h=e.width,v=e.open,p=0,m=e.x,g=e.y,_=0,k=0,M=0,S=0,U=0,P=0,b=0,T=0,L=0,E=0,H={val:0,size:0};p<t.length;){r.CFF.getCharString(t,p,H);var y=H.val;if(p+=H.size,y=="o1"||y=="o18")i.length%2!=0&&!u&&(h=i.shift()+a.nominalWidthX),l+=i.length>>1,i.length=0,u=!0;else if(y=="o3"||y=="o23")i.length%2!=0&&!u&&(h=i.shift()+a.nominalWidthX),l+=i.length>>1,i.length=0,u=!0;else if(y=="o4")i.length>1&&!u&&(h=i.shift()+a.nominalWidthX,u=!0),v&&r.U.P.closePath(n),g+=i.pop(),r.U.P.moveTo(n,m,g),v=!0;else if(y=="o5")for(;i.length>0;)m+=i.shift(),g+=i.shift(),r.U.P.lineTo(n,m,g);else if(y=="o6"||y=="o7")for(var A=i.length,j=y=="o6",Y=0;Y<A;Y++){var W=i.shift();j?m+=W:g+=W,j=!j,r.U.P.lineTo(n,m,g)}else if(y=="o8"||y=="o24"){A=i.length;for(var K=0;K+6<=A;)_=m+i.shift(),k=g+i.shift(),M=_+i.shift(),S=k+i.shift(),m=M+i.shift(),g=S+i.shift(),r.U.P.curveTo(n,_,k,M,S,m,g),K+=6;y=="o24"&&(m+=i.shift(),g+=i.shift(),r.U.P.lineTo(n,m,g))}else{if(y=="o11")break;if(y=="o1234"||y=="o1235"||y=="o1236"||y=="o1237")y=="o1234"&&(k=g,M=(_=m+i.shift())+i.shift(),E=S=k+i.shift(),P=S,T=g,m=(b=(U=(L=M+i.shift())+i.shift())+i.shift())+i.shift(),r.U.P.curveTo(n,_,k,M,S,L,E),r.U.P.curveTo(n,U,P,b,T,m,g)),y=="o1235"&&(_=m+i.shift(),k=g+i.shift(),M=_+i.shift(),S=k+i.shift(),L=M+i.shift(),E=S+i.shift(),U=L+i.shift(),P=E+i.shift(),b=U+i.shift(),T=P+i.shift(),m=b+i.shift(),g=T+i.shift(),i.shift(),r.U.P.curveTo(n,_,k,M,S,L,E),r.U.P.curveTo(n,U,P,b,T,m,g)),y=="o1236"&&(_=m+i.shift(),k=g+i.shift(),M=_+i.shift(),E=S=k+i.shift(),P=S,b=(U=(L=M+i.shift())+i.shift())+i.shift(),T=P+i.shift(),m=b+i.shift(),r.U.P.curveTo(n,_,k,M,S,L,E),r.U.P.curveTo(n,U,P,b,T,m,g)),y=="o1237"&&(_=m+i.shift(),k=g+i.shift(),M=_+i.shift(),S=k+i.shift(),L=M+i.shift(),E=S+i.shift(),U=L+i.shift(),P=E+i.shift(),b=U+i.shift(),T=P+i.shift(),Math.abs(b-m)>Math.abs(T-g)?m=b+i.shift():g=T+i.shift(),r.U.P.curveTo(n,_,k,M,S,L,E),r.U.P.curveTo(n,U,P,b,T,m,g));else if(y=="o14"){if(i.length>0&&!u&&(h=i.shift()+o.nominalWidthX,u=!0),i.length==4){var ae=i.shift(),B=i.shift(),z=i.shift(),x=i.shift(),C=r.CFF.glyphBySE(o,z),F=r.CFF.glyphBySE(o,x);r.U._drawCFF(o.CharStrings[C],e,o,a,n),e.x=ae,e.y=B,r.U._drawCFF(o.CharStrings[F],e,o,a,n)}v&&(r.U.P.closePath(n),v=!1)}else if(y=="o19"||y=="o20")i.length%2!=0&&!u&&(h=i.shift()+a.nominalWidthX),l+=i.length>>1,i.length=0,u=!0,p+=l+7>>3;else if(y=="o21")i.length>2&&!u&&(h=i.shift()+a.nominalWidthX,u=!0),g+=i.pop(),m+=i.pop(),v&&r.U.P.closePath(n),r.U.P.moveTo(n,m,g),v=!0;else if(y=="o22")i.length>1&&!u&&(h=i.shift()+a.nominalWidthX,u=!0),m+=i.pop(),v&&r.U.P.closePath(n),r.U.P.moveTo(n,m,g),v=!0;else if(y=="o25"){for(;i.length>6;)m+=i.shift(),g+=i.shift(),r.U.P.lineTo(n,m,g);_=m+i.shift(),k=g+i.shift(),M=_+i.shift(),S=k+i.shift(),m=M+i.shift(),g=S+i.shift(),r.U.P.curveTo(n,_,k,M,S,m,g)}else if(y=="o26")for(i.length%2&&(m+=i.shift());i.length>0;)_=m,k=g+i.shift(),m=M=_+i.shift(),g=(S=k+i.shift())+i.shift(),r.U.P.curveTo(n,_,k,M,S,m,g);else if(y=="o27")for(i.length%2&&(g+=i.shift());i.length>0;)k=g,M=(_=m+i.shift())+i.shift(),S=k+i.shift(),m=M+i.shift(),g=S,r.U.P.curveTo(n,_,k,M,S,m,g);else if(y=="o10"||y=="o29"){var D=y=="o10"?a:o;if(i.length!=0){var R=i.pop(),N=D.Subrs[R+D.Bias];e.x=m,e.y=g,e.nStems=l,e.haveWidth=u,e.width=h,e.open=v,r.U._drawCFF(N,e,o,a,n),m=e.x,g=e.y,l=e.nStems,u=e.haveWidth,h=e.width,v=e.open}}else if(y=="o30"||y=="o31"){var I=i.length,O=(K=0,y=="o31");for(K+=I-(A=-3&I);K<A;)O?(k=g,M=(_=m+i.shift())+i.shift(),g=(S=k+i.shift())+i.shift(),A-K==5?(m=M+i.shift(),K++):m=M,O=!1):(_=m,k=g+i.shift(),M=_+i.shift(),S=k+i.shift(),m=M+i.shift(),A-K==5?(g=S+i.shift(),K++):g=S,O=!0),r.U.P.curveTo(n,_,k,M,S,m,g),K+=4}else{if((y+"").charAt(0)=="o")throw y;i.push(y)}}}e.x=m,e.y=g,e.nStems=l,e.haveWidth=u,e.width=h,e.open=v};var c=r,f={Typr:c};return s.Typr=c,s.default=f,Object.defineProperty(s,"__esModule",{value:!0}),s}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function Di(){return function(s){var r=Uint8Array,c=Uint16Array,f=Uint32Array,t=new r([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),e=new r([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),o=new r([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(y,A){for(var j=new c(31),Y=0;Y<31;++Y)j[Y]=A+=1<<y[Y-1];var W=new f(j[30]);for(Y=1;Y<30;++Y)for(var K=j[Y];K<j[Y+1];++K)W[K]=K-j[Y]<<5|Y;return[j,W]},n=a(t,2),i=n[0],l=n[1];i[28]=258,l[258]=28;for(var u=a(e,0)[0],h=new c(32768),v=0;v<32768;++v){var p=(43690&v)>>>1|(21845&v)<<1;p=(61680&(p=(52428&p)>>>2|(13107&p)<<2))>>>4|(3855&p)<<4,h[v]=((65280&p)>>>8|(255&p)<<8)>>>1}var m=function(y,A,j){for(var Y=y.length,W=0,K=new c(A);W<Y;++W)++K[y[W]-1];var ae,B=new c(A);for(W=0;W<A;++W)B[W]=B[W-1]+K[W-1]<<1;{ae=new c(1<<A);var z=15-A;for(W=0;W<Y;++W)if(y[W])for(var x=W<<4|y[W],C=A-y[W],F=B[y[W]-1]++<<C,D=F|(1<<C)-1;F<=D;++F)ae[h[F]>>>z]=x}return ae},g=new r(288);for(v=0;v<144;++v)g[v]=8;for(v=144;v<256;++v)g[v]=9;for(v=256;v<280;++v)g[v]=7;for(v=280;v<288;++v)g[v]=8;var _=new r(32);for(v=0;v<32;++v)_[v]=5;var k=m(g,9),M=m(_,5),S=function(y){for(var A=y[0],j=1;j<y.length;++j)y[j]>A&&(A=y[j]);return A},U=function(y,A,j){var Y=A/8|0;return(y[Y]|y[Y+1]<<8)>>(7&A)&j},P=function(y,A){var j=A/8|0;return(y[j]|y[j+1]<<8|y[j+2]<<16)>>(7&A)},b=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],T=function(y,A,j){var Y=new Error(A||b[y]);if(Y.code=y,Error.captureStackTrace&&Error.captureStackTrace(Y,T),!j)throw Y;return Y},L=function(y,A,j){var Y=y.length;if(!Y||j&&!j.l&&Y<5)return A||new r(0);var W=!A||j,K=!j||j.i;j||(j={}),A||(A=new r(3*Y));var ae,B=function(fe){var Ae=A.length;if(fe>Ae){var Ue=new r(Math.max(2*Ae,fe));Ue.set(A),A=Ue}},z=j.f||0,x=j.p||0,C=j.b||0,F=j.l,D=j.d,R=j.m,N=j.n,I=8*Y;do{if(!F){j.f=z=U(y,x,1);var O=U(y,x+1,3);if(x+=3,!O){var Q=y[(ee=((ae=x)/8|0)+(7&ae&&1)+4)-4]|y[ee-3]<<8,te=ee+Q;if(te>Y){K&&T(0);break}W&&B(C+Q),A.set(y.subarray(ee,te),C),j.b=C+=Q,j.p=x=8*te;continue}if(O==1)F=k,D=M,R=9,N=5;else if(O==2){var Z=U(y,x,31)+257,V=U(y,x+10,15)+4,xe=Z+U(y,x+5,31)+1;x+=14;for(var de=new r(xe),$=new r(19),re=0;re<V;++re)$[o[re]]=U(y,x+3*re,7);x+=3*V;var ce=S($),X=(1<<ce)-1,oe=m($,ce);for(re=0;re<xe;){var ee,G=oe[U(y,x,X)];if(x+=15&G,(ee=G>>>4)<16)de[re++]=ee;else{var pe=0,J=0;for(ee==16?(J=3+U(y,x,3),x+=2,pe=de[re-1]):ee==17?(J=3+U(y,x,7),x+=3):ee==18&&(J=11+U(y,x,127),x+=7);J--;)de[re++]=pe}}var ie=de.subarray(0,Z),q=de.subarray(Z);R=S(ie),N=S(q),F=m(ie,R),D=m(q,N)}else T(1);if(x>I){K&&T(0);break}}W&&B(C+131072);for(var Me=(1<<R)-1,ne=(1<<N)-1,se=x;;se=x){var ue=(pe=F[P(y,x)&Me])>>>4;if((x+=15&pe)>I){K&&T(0);break}if(pe||T(2),ue<256)A[C++]=ue;else{if(ue==256){se=x,F=null;break}var me=ue-254;if(ue>264){var ke=t[re=ue-257];me=U(y,x,(1<<ke)-1)+i[re],x+=ke}var je=D[P(y,x)&ne],ye=je>>>4;if(je||T(3),x+=15&je,q=u[ye],ye>3&&(ke=e[ye],q+=P(y,x)&(1<<ke)-1,x+=ke),x>I){K&&T(0);break}W&&B(C+131072);for(var we=C+me;C<we;C+=4)A[C]=A[C-q],A[C+1]=A[C+1-q],A[C+2]=A[C+2-q],A[C+3]=A[C+3-q];C=we}}j.l=F,j.p=se,j.b=C,F&&(z=1,j.m=R,j.d=D,j.n=N)}while(!z);return C==A.length?A:function(fe,Ae,Ue){(Ue==null||Ue>fe.length)&&(Ue=fe.length);var He=new(fe instanceof c?c:fe instanceof f?f:r)(Ue-Ae);return He.set(fe.subarray(Ae,Ue)),He}(A,0,C)},E=new r(0),H=typeof TextDecoder<"u"&&new TextDecoder;try{H.decode(E,{stream:!0})}catch{}return s.convert_streams=function(y){var A=new DataView(y),j=0;function Y(){var Z=A.getUint16(j);return j+=2,Z}function W(){var Z=A.getUint32(j);return j+=4,Z}function K(Z){Q.setUint16(te,Z),te+=2}function ae(Z){Q.setUint32(te,Z),te+=4}for(var B={signature:W(),flavor:W(),length:W(),numTables:Y(),reserved:Y(),totalSfntSize:W(),majorVersion:Y(),minorVersion:Y(),metaOffset:W(),metaLength:W(),metaOrigLength:W(),privOffset:W(),privLength:W()},z=0;Math.pow(2,z)<=B.numTables;)z++;z--;for(var x=16*Math.pow(2,z),C=16*B.numTables-x,F=12,D=[],R=0;R<B.numTables;R++)D.push({tag:W(),offset:W(),compLength:W(),origLength:W(),origChecksum:W()}),F+=16;var N,I=new Uint8Array(12+16*D.length+D.reduce(function(Z,V){return Z+V.origLength+4},0)),O=I.buffer,Q=new DataView(O),te=0;return ae(B.flavor),K(B.numTables),K(x),K(z),K(C),D.forEach(function(Z){ae(Z.tag),ae(Z.origChecksum),ae(F),ae(Z.origLength),Z.outOffset=F,(F+=Z.origLength)%4!=0&&(F+=4-F%4)}),D.forEach(function(Z){var V,xe=y.slice(Z.offset,Z.offset+Z.compLength);if(Z.compLength!=Z.origLength){var de=new Uint8Array(Z.origLength);V=new Uint8Array(xe,2),L(V,de)}else de=new Uint8Array(xe);I.set(de,Z.outOffset);var $=0;(F=Z.outOffset+Z.origLength)%4!=0&&($=4-F%4),I.set(new Uint8Array($).buffer,Z.outOffset+Z.origLength),N=F+$}),O.slice(0,N)},Object.defineProperty(s,"__esModule",{value:!0}),s}({}).convert_streams}function Li(s,r){const c={M:2,L:2,Q:4,C:6,Z:0},f={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},t=1,e=2,o=4,a=8,n=16,i=32;let l;function u(b){if(!l){const T={R:e,L:t,D:o,C:n,U:i,T:a};l=new Map;for(let L in f){let E=0;f[L].split(",").forEach(H=>{let[y,A]=H.split("+");y=parseInt(y,36),A=A?parseInt(A,36):0,l.set(E+=y,T[L]);for(let j=A;j--;)l.set(++E,T[L])})}}return l.get(b)||i}const h=1,v=2,p=3,m=4,g=[null,"isol","init","fina","medi"];function _(b){const T=new Uint8Array(b.length);let L=i,E=h,H=-1;for(let y=0;y<b.length;y++){const A=b.codePointAt(y);let j=u(A)|0,Y=h;j&a||(L&(t|o|n)?j&(e|o|n)?(Y=p,(E===h||E===p)&&T[H]++):j&(t|i)&&(E===v||E===m)&&T[H]--:L&(e|i)&&(E===v||E===m)&&T[H]--,E=T[y]=Y,L=j,H=y,A>65535&&y++)}return T}function k(b,T){const L=[];for(let H=0;H<T.length;H++){const y=T.codePointAt(H);y>65535&&H++,L.push(s.U.codeToGlyph(b,y))}const E=b.GSUB;if(E){const{lookupList:H,featureList:y}=E;let A;const j=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,Y=[];y.forEach(W=>{if(j.test(W.tag))for(let K=0;K<W.tab.length;K++){if(Y[W.tab[K]])continue;Y[W.tab[K]]=!0;const ae=H[W.tab[K]],B=/^(isol|init|fina|medi)$/.test(W.tag);B&&!A&&(A=_(T));for(let z=0;z<L.length;z++)(!A||!B||g[A[z]]===W.tag)&&s.U._applySubs(L,z,ae,H)}})}return L}function M(b,T){const L=new Int16Array(T.length*3);let E=0;for(;E<T.length;E++){const j=T[E];if(j===-1)continue;L[E*3+2]=b.hmtx.aWidth[j];const Y=b.GPOS;if(Y){const W=Y.lookupList;for(let K=0;K<W.length;K++){const ae=W[K];for(let B=0;B<ae.tabs.length;B++){const z=ae.tabs[B];if(ae.ltype===1){if(s._lctf.coverageIndex(z.coverage,j)!==-1&&z.pos){A(z.pos,E);break}}else if(ae.ltype===2){let x=null,C=H();if(C!==-1){const F=s._lctf.coverageIndex(z.coverage,T[C]);if(F!==-1){if(z.fmt===1){const D=z.pairsets[F];for(let R=0;R<D.length;R++)D[R].gid2===j&&(x=D[R])}else if(z.fmt===2){const D=s.U._getGlyphClass(T[C],z.classDef1),R=s.U._getGlyphClass(j,z.classDef2);x=z.matrix[D][R]}if(x){x.val1&&A(x.val1,C),x.val2&&A(x.val2,E);break}}}}else if(ae.ltype===4){const x=s._lctf.coverageIndex(z.markCoverage,j);if(x!==-1){const C=H(y),F=C===-1?-1:s._lctf.coverageIndex(z.baseCoverage,T[C]);if(F!==-1){const D=z.markArray[x],R=z.baseArray[F][D.markClass];L[E*3]=R.x-D.x+L[C*3]-L[C*3+2],L[E*3+1]=R.y-D.y+L[C*3+1];break}}}else if(ae.ltype===6){const x=s._lctf.coverageIndex(z.mark1Coverage,j);if(x!==-1){const C=H();if(C!==-1){const F=T[C];if(S(b,F)===3){const D=s._lctf.coverageIndex(z.mark2Coverage,F);if(D!==-1){const R=z.mark1Array[x],N=z.mark2Array[D][R.markClass];L[E*3]=N.x-R.x+L[C*3]-L[C*3+2],L[E*3+1]=N.y-R.y+L[C*3+1];break}}}}}}}}else if(b.kern&&!b.cff){const W=H();if(W!==-1){const K=b.kern.glyph1.indexOf(T[W]);if(K!==-1){const ae=b.kern.rval[K].glyph2.indexOf(j);ae!==-1&&(L[W*3+2]+=b.kern.rval[K].vals[ae])}}}}return L;function H(j){for(let Y=E-1;Y>=0;Y--)if(T[Y]!==-1&&(!j||j(T[Y])))return Y;return-1}function y(j){return S(b,j)===1}function A(j,Y){for(let W=0;W<3;W++)L[Y*3+W]+=j[W]||0}}function S(b,T){const L=b.GDEF&&b.GDEF.glyphClassDef;return L?s.U._getGlyphClass(T,L):0}function U(...b){for(let T=0;T<b.length;T++)if(typeof b[T]=="number")return b[T]}function P(b){const T=Object.create(null),L=b["OS/2"],E=b.hhea,H=b.head.unitsPerEm,y=U(L&&L.sTypoAscender,E&&E.ascender,H),A={unitsPerEm:H,ascender:y,descender:U(L&&L.sTypoDescender,E&&E.descender,0),capHeight:U(L&&L.sCapHeight,y),xHeight:U(L&&L.sxHeight,y),lineGap:U(L&&L.sTypoLineGap,E&&E.lineGap),supportsCodePoint(j){return s.U.codeToGlyph(b,j)>0},forEachGlyph(j,Y,W,K){let ae=0;const B=1/A.unitsPerEm*Y,z=k(b,j);let x=0;const C=M(b,z);return z.forEach((F,D)=>{if(F!==-1){let R=T[F];if(!R){const{cmds:N,crds:I}=s.U.glyphToPath(b,F);let O="",Q=0;for(let de=0,$=N.length;de<$;de++){const re=c[N[de]];O+=N[de];for(let ce=1;ce<=re;ce++)O+=(ce>1?",":"")+I[Q++]}let te,Z,V,xe;if(I.length){te=Z=1/0,V=xe=-1/0;for(let de=0,$=I.length;de<$;de+=2){let re=I[de],ce=I[de+1];re<te&&(te=re),ce<Z&&(Z=ce),re>V&&(V=re),ce>xe&&(xe=ce)}}else te=V=Z=xe=0;R=T[F]={index:F,advanceWidth:b.hmtx.aWidth[F],xMin:te,yMin:Z,xMax:V,yMax:xe,path:O}}K.call(null,R,ae+C[D*3]*B,C[D*3+1]*B,x),ae+=C[D*3+2]*B,W&&(ae+=W*Y)}x+=j.codePointAt(x)>65535?2:1}),ae}};return A}return function(T){const L=new Uint8Array(T,0,4),E=s._bin.readASCII(L,0,4);if(E==="wOFF")T=r(T);else if(E==="wOF2")throw new Error("woff2 fonts not supported");return P(s.parse(T)[0])}}const Ii=At({name:"Typr Font Parser",dependencies:[Ei,Di,Li],init(s,r,c){const f=s(),t=r();return c(f,t)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function zi(){return function(s){var r=function(){this.buckets=new Map};r.prototype.add=function(M){var S=M>>5;this.buckets.set(S,(this.buckets.get(S)||0)|1<<(31&M))},r.prototype.has=function(M){var S=this.buckets.get(M>>5);return S!==void 0&&(S&1<<(31&M))!=0},r.prototype.serialize=function(){var M=[];return this.buckets.forEach(function(S,U){M.push((+U).toString(36)+":"+S.toString(36))}),M.join(",")},r.prototype.deserialize=function(M){var S=this;this.buckets.clear(),M.split(",").forEach(function(U){var P=U.split(":");S.buckets.set(parseInt(P[0],36),parseInt(P[1],36))})};var c=Math.pow(2,8),f=c-1,t=~f;function e(M){var S=function(P){return P&t}(M).toString(16),U=function(P){return(P&t)+c-1}(M).toString(16);return"codepoint-index/plane"+(M>>16)+"/"+S+"-"+U+".json"}function o(M,S){var U=M&f,P=S.codePointAt(U/6|0);return((P=(P||48)-48)&1<<U%6)!=0}function a(M,S){var U;(U=M,U.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(P){return P.split("-").map(function(b){return parseInt(b.trim(),16)})})).forEach(function(P){var b=P[0],T=P[1];T===void 0&&(T=b),S(b,T)})}function n(M,S){a(M,function(U,P){for(var b=U;b<=P;b++)S(b)})}var i={},l={},u=new WeakMap,h="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function v(M){var S=u.get(M);return S||(S=new r,n(M.ranges,function(U){return S.add(U)}),u.set(M,S)),S}var p,m=new Map;function g(M,S,U){return M[S]?S:M[U]?U:function(P){for(var b in P)return b}(M)}function _(M,S){var U=S;if(!M.includes(U)){U=1/0;for(var P=0;P<M.length;P++)Math.abs(M[P]-S)<Math.abs(U-S)&&(U=M[P])}return U}function k(M){return p||(p=new Set,n("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(S){p.add(S)})),p.has(M)}return s.CodePointSet=r,s.clearCache=function(){i={},l={}},s.getFontsForString=function(M,S){S===void 0&&(S={});var U,P=S.lang;P===void 0&&(P=new RegExp("\\p{Script=Hangul}","u").test(U=M)?"ko":new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}","u").test(U)?"ja":"en");var b=S.category;b===void 0&&(b="sans-serif");var T=S.style;T===void 0&&(T="normal");var L=S.weight;L===void 0&&(L=400);var E=(S.dataUrl||h).replace(/\/$/g,""),H=new Map,y=new Uint8Array(M.length),A={},j={},Y=new Array(M.length),W=new Map,K=!1;function ae(x){var C=m.get(x);return C||(C=fetch(E+"/"+x).then(function(F){if(!F.ok)throw new Error(F.statusText);return F.json().then(function(D){if(!Array.isArray(D)||D[0]!==1)throw new Error("Incorrect schema version; need 1, got "+D[0]);return D[1]})}).catch(function(F){if(E!==h)return K||(K=!0),E=h,m.delete(x),ae(x);throw F}),m.set(x,C)),C}for(var B=function(x){var C=M.codePointAt(x),F=e(C);Y[x]=F,i[F]||W.has(F)||W.set(F,ae(F).then(function(D){i[F]=D})),C>65535&&(x++,z=x)},z=0;z<M.length;z++)B(z);return Promise.all(W.values()).then(function(){W.clear();for(var x=function(F){var D=M.codePointAt(F),R=null,N=i[Y[F]],I=void 0;for(var O in N){var Q=j[O];if(Q===void 0&&(Q=j[O]=new RegExp(O).test(P||"en")),Q){for(var te in I=O,N[O])if(o(D,N[O][te])){R=te;break}break}}if(!R){e:for(var Z in N)if(Z!==I){for(var V in N[Z])if(o(D,N[Z][V])){R=V;break e}}}R||(R="latin"),Y[F]=R,l[R]||W.has(R)||W.set(R,ae("font-meta/"+R+".json").then(function(xe){l[R]=xe})),D>65535&&(F++,C=F)},C=0;C<M.length;C++)x(C);return Promise.all(W.values())}).then(function(){for(var x,C=null,F=0;F<M.length;F++){var D=M.codePointAt(F);if(C&&(k(D)||v(C).has(D)))y[F]=y[F-1];else{C=l[Y[F]];var R=A[C.id];if(!R){var N=C.typeforms,I=g(N,b,"sans-serif"),O=g(N[I],T,"normal"),Q=_((x=N[I])===null||x===void 0?void 0:x[O],L);R=A[C.id]=E+"/font-files/"+C.id+"/"+I+"."+O+"."+Q+".woff"}var te=H.get(R);te==null&&(te=H.size,H.set(R,te)),y[F]=te}D>65535&&(F++,y[F]=y[F-1])}return{fontUrls:Array.from(H.keys()),chars:y}})},Object.defineProperty(s,"__esModule",{value:!0}),s}({})}function Gi(s,r){const c=Object.create(null),f=Object.create(null);function t(o,a){const n=i=>{};try{const i=new XMLHttpRequest;i.open("get",o,!0),i.responseType="arraybuffer",i.onload=function(){if(i.status>=400)n(new Error(i.statusText));else if(i.status>0)try{const l=s(i.response);l.src=o,a(l)}catch(l){n(l)}},i.onerror=n,i.send()}catch(i){n(i)}}function e(o,a){let n=c[o];n?a(n):f[o]?f[o].push(a):(f[o]=[a],t(o,i=>{i.src=o,c[o]=i,f[o].forEach(l=>l(i)),delete f[o]}))}return function(o,a,{lang:n,fonts:i=[],style:l="normal",weight:u="normal",unicodeFontsURL:h}={}){const v=new Uint8Array(o.length),p=[];o.length||k();const m=new Map,g=[];if(l!=="italic"&&(l="normal"),typeof u!="number"&&(u=u==="bold"?700:400),i&&!Array.isArray(i)&&(i=[i]),i=i.slice().filter(S=>!S.lang||S.lang.test(n)).reverse(),i.length){let b=0;(function T(L=0){for(let E=L,H=o.length;E<H;E++){const y=o.codePointAt(E);if(b===1&&p[v[E-1]].supportsCodePoint(y)||/\s/.test(o[E]))v[E]=v[E-1],b===2&&(g[g.length-1][1]=E);else for(let A=v[E],j=i.length;A<=j;A++)if(A===j){const Y=b===2?g[g.length-1]:g[g.length]=[E,E];Y[1]=E,b=2}else{v[E]=A;const{src:Y,unicodeRange:W}=i[A];if(!W||M(y,W)){const K=c[Y];if(!K){e(Y,()=>{T(E)});return}if(K.supportsCodePoint(y)){let ae=m.get(K);typeof ae!="number"&&(ae=p.length,p.push(K),m.set(K,ae)),v[E]=ae,b=1;break}}}y>65535&&E+1<H&&(v[E+1]=v[E],E++,b===2&&(g[g.length-1][1]=E))}_()})()}else g.push([0,o.length-1]),_();function _(){if(g.length){const S=g.map(U=>o.substring(U[0],U[1]+1)).join(`
`);r.getFontsForString(S,{lang:n||void 0,style:l,weight:u,dataUrl:h}).then(({fontUrls:U,chars:P})=>{const b=p.length;let T=0;g.forEach(E=>{for(let H=0,y=E[1]-E[0];H<=y;H++)v[E[0]+H]=P[T++]+b;T++});let L=0;U.forEach((E,H)=>{e(E,y=>{p[H+b]=y,++L===U.length&&k()})})})}else k()}function k(){a({chars:v,fonts:p})}function M(S,U){for(let P=0;P<U.length;P++){const[b,T=b]=U[P];if(b<=S&&S<=T)return!0}return!1}}}const Oi=At({name:"FontResolver",dependencies:[Gi,Ii,zi],init(s,r,c){return s(r,c())}});function Bi(s,r){const f=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,t="[^\\S\\u00A0]",e=new RegExp(`${t}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function o({text:p,lang:m,fonts:g,style:_,weight:k,preResolvedFonts:M,unicodeFontsURL:S},U){const P=({chars:b,fonts:T})=>{let L,E;const H=[];for(let y=0;y<b.length;y++)b[y]!==E?(E=b[y],H.push(L={start:y,end:y,fontObj:T[b[y]]})):L.end=y;U(H)};M?P(M):s(p,P,{lang:m,fonts:g,style:_,weight:k,unicodeFontsURL:S})}function a({text:p="",font:m,lang:g,sdfGlyphSize:_=64,fontSize:k=400,fontWeight:M=1,fontStyle:S="normal",letterSpacing:U=0,lineHeight:P="normal",maxWidth:b=1/0,direction:T,textAlign:L="left",textIndent:E=0,whiteSpace:H="normal",overflowWrap:y="normal",anchorX:A=0,anchorY:j=0,metricsOnly:Y=!1,unicodeFontsURL:W,preResolvedFonts:K=null,includeCaretPositions:ae=!1,chunkedBoundsSize:B=8192,colorRanges:z=null},x){const C=u(),F={fontLoad:0,typesetting:0};p.indexOf("\r")>-1&&(p=p.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),k=+k,U=+U,b=+b,P=P||"normal",E=+E,o({text:p,lang:g,style:S,weight:M,fonts:typeof m=="string"?[{src:m}]:m,unicodeFontsURL:W,preResolvedFonts:K},D=>{F.fontLoad=u()-C;const R=isFinite(b);let N=null,I=null,O=null,Q=null,te=null,Z=null,V=null,xe=null,de=0,$=0,re=H!=="nowrap";const ce=new Map,X=u();let oe=E,ee=0,G=new h;const pe=[G];D.forEach(ne=>{const{fontObj:se}=ne,{ascender:ue,descender:me,unitsPerEm:ke,lineGap:je,capHeight:ye,xHeight:we}=se;let fe=ce.get(se);if(!fe){const he=k/ke,Se=P==="normal"?(ue-me+je)*he:P*k,ct=(Se-(ue-me)*he)/2,_e=Math.min(Se,(ue-me)*he),be=(ue+me)/2*he+_e/2;fe={index:ce.size,src:se.src,fontObj:se,fontSizeMult:he,unitsPerEm:ke,ascender:ue*he,descender:me*he,capHeight:ye*he,xHeight:we*he,lineHeight:Se,baseline:-ct-ue*he,caretTop:be,caretBottom:be-_e},ce.set(se,fe)}const{fontSizeMult:Ae}=fe,Ue=p.slice(ne.start,ne.end+1);let He,Ce;se.forEachGlyph(Ue,k,U,(he,Se,ct,_e)=>{Se+=ee,_e+=ne.start,He=Se,Ce=he;const be=p.charAt(_e),Pe=he.advanceWidth*Ae,Fe=G.count;let ge;if("isEmpty"in he||(he.isWhitespace=!!be&&new RegExp(t).test(be),he.canBreakAfter=!!be&&e.test(be),he.isEmpty=he.xMin===he.xMax||he.yMin===he.yMax||f.test(be)),!he.isWhitespace&&!he.isEmpty&&$++,re&&R&&!he.isWhitespace&&Se+Pe+oe>b&&Fe){if(G.glyphAt(Fe-1).glyphObj.canBreakAfter)ge=new h,oe=-Se;else for(let Be=Fe;Be--;)if(Be===0&&y==="break-word"){ge=new h,oe=-Se;break}else if(G.glyphAt(Be).glyphObj.canBreakAfter){ge=G.splitAt(Be+1);const ze=ge.glyphAt(0).x;oe-=ze;for(let Ee=ge.count;Ee--;)ge.glyphAt(Ee).x-=ze;break}ge&&(G.isSoftWrapped=!0,G=ge,pe.push(G),de=b)}let Re=G.glyphAt(G.count);Re.glyphObj=he,Re.x=Se+oe,Re.y=ct,Re.width=Pe,Re.charIndex=_e,Re.fontData=fe,be===`
`&&(G=new h,pe.push(G),oe=-(Se+Pe+U*k)+E)}),ee=He+Ce.advanceWidth*Ae+U*k});let J=0;pe.forEach(ne=>{let se=!0;for(let ue=ne.count;ue--;){const me=ne.glyphAt(ue);se&&!me.glyphObj.isWhitespace&&(ne.width=me.x+me.width,ne.width>de&&(de=ne.width),se=!1);let{lineHeight:ke,capHeight:je,xHeight:ye,baseline:we}=me.fontData;ke>ne.lineHeight&&(ne.lineHeight=ke);const fe=we-ne.baseline;fe<0&&(ne.baseline+=fe,ne.cap+=fe,ne.ex+=fe),ne.cap=Math.max(ne.cap,ne.baseline+je),ne.ex=Math.max(ne.ex,ne.baseline+ye)}ne.baseline-=J,ne.cap-=J,ne.ex-=J,J+=ne.lineHeight});let ie=0,q=0;if(A&&(typeof A=="number"?ie=-A:typeof A=="string"&&(ie=-de*(A==="left"?0:A==="center"?.5:A==="right"?1:i(A)))),j&&(typeof j=="number"?q=-j:typeof j=="string"&&(q=j==="top"?0:j==="top-baseline"?-pe[0].baseline:j==="top-cap"?-pe[0].cap:j==="top-ex"?-pe[0].ex:j==="middle"?J/2:j==="bottom"?J:j==="bottom-baseline"?-pe[pe.length-1].baseline:i(j)*J)),!Y){const ne=r.getEmbeddingLevels(p,T);N=new Uint16Array($),I=new Uint8Array($),O=new Float32Array($*2),Q={},V=[1/0,1/0,-1/0,-1/0],xe=[],ae&&(Z=new Float32Array(p.length*4)),z&&(te=new Uint8Array($*3));let se=0,ue=-1,me=-1,ke,je;if(pe.forEach((ye,we)=>{let{count:fe,width:Ae}=ye;if(fe>0){let Ue=0;for(let _e=fe;_e--&&ye.glyphAt(_e).glyphObj.isWhitespace;)Ue++;let He=0,Ce=0;if(L==="center")He=(de-Ae)/2;else if(L==="right")He=de-Ae;else if(L==="justify"&&ye.isSoftWrapped){let _e=0;for(let be=fe-Ue;be--;)ye.glyphAt(be).glyphObj.isWhitespace&&_e++;Ce=(de-Ae)/_e}if(Ce||He){let _e=0;for(let be=0;be<fe;be++){let Pe=ye.glyphAt(be);const Fe=Pe.glyphObj;Pe.x+=He+_e,Ce!==0&&Fe.isWhitespace&&be<fe-Ue&&(_e+=Ce,Pe.width+=Ce)}}const he=r.getReorderSegments(p,ne,ye.glyphAt(0).charIndex,ye.glyphAt(ye.count-1).charIndex);for(let _e=0;_e<he.length;_e++){const[be,Pe]=he[_e];let Fe=1/0,ge=-1/0;for(let Re=0;Re<fe;Re++)if(ye.glyphAt(Re).charIndex>=be){let Be=Re,ze=Re;for(;ze<fe;ze++){let Ee=ye.glyphAt(ze);if(Ee.charIndex>Pe)break;ze<fe-Ue&&(Fe=Math.min(Fe,Ee.x),ge=Math.max(ge,Ee.x+Ee.width))}for(let Ee=Be;Ee<ze;Ee++){const Je=ye.glyphAt(Ee);Je.x=ge-(Je.x+Je.width-Fe)}break}}let Se;const ct=_e=>Se=_e;for(let _e=0;_e<fe;_e++){const be=ye.glyphAt(_e);Se=be.glyphObj;const Pe=Se.index,Fe=ne.levels[be.charIndex]&1;if(Fe){const ge=r.getMirroredCharacter(p[be.charIndex]);ge&&be.fontData.fontObj.forEachGlyph(ge,0,0,ct)}if(ae){const{charIndex:ge,fontData:Re}=be,Be=be.x+ie,ze=be.x+be.width+ie;Z[ge*4]=Fe?ze:Be,Z[ge*4+1]=Fe?Be:ze,Z[ge*4+2]=ye.baseline+Re.caretBottom+q,Z[ge*4+3]=ye.baseline+Re.caretTop+q;const Ee=ge-ue;Ee>1&&l(Z,ue,Ee),ue=ge}if(z){const{charIndex:ge}=be;for(;ge>me;)me++,z.hasOwnProperty(me)&&(je=z[me])}if(!Se.isWhitespace&&!Se.isEmpty){const ge=se++,{fontSizeMult:Re,src:Be,index:ze}=be.fontData,Ee=Q[Be]||(Q[Be]={});Ee[Pe]||(Ee[Pe]={path:Se.path,pathBounds:[Se.xMin,Se.yMin,Se.xMax,Se.yMax]});const Je=be.x+ie,ft=be.y+ye.baseline+q;O[ge*2]=Je,O[ge*2+1]=ft;const nt=Je+Se.xMin*Re,ut=ft+Se.yMin*Re,vt=Je+Se.xMax*Re,at=ft+Se.yMax*Re;nt<V[0]&&(V[0]=nt),ut<V[1]&&(V[1]=ut),vt>V[2]&&(V[2]=vt),at>V[3]&&(V[3]=at),ge%B===0&&(ke={start:ge,end:ge,rect:[1/0,1/0,-1/0,-1/0]},xe.push(ke)),ke.end++;const We=ke.rect;if(nt<We[0]&&(We[0]=nt),ut<We[1]&&(We[1]=ut),vt>We[2]&&(We[2]=vt),at>We[3]&&(We[3]=at),N[ge]=Pe,I[ge]=ze,z){const pt=ge*3;te[pt]=je>>16&255,te[pt+1]=je>>8&255,te[pt+2]=je&255}}}}}),Z){const ye=p.length-ue;ye>1&&l(Z,ue,ye)}}const Me=[];ce.forEach(({index:ne,src:se,unitsPerEm:ue,ascender:me,descender:ke,lineHeight:je,capHeight:ye,xHeight:we})=>{Me[ne]={src:se,unitsPerEm:ue,ascender:me,descender:ke,lineHeight:je,capHeight:ye,xHeight:we}}),F.typesetting=u()-X,x({glyphIds:N,glyphFontIndices:I,glyphPositions:O,glyphData:Q,fontData:Me,caretPositions:Z,glyphColors:te,chunkedBounds:xe,fontSize:k,topBaseline:q+pe[0].baseline,blockBounds:[ie,q-J,ie+de,q],visibleBounds:V,timings:F})})}function n(p,m){a({...p,metricsOnly:!0},g=>{const[_,k,M,S]=g.blockBounds;m({width:M-_,height:S-k})})}function i(p){let m=p.match(/^([\d.]+)%$/),g=m?parseFloat(m[1]):NaN;return isNaN(g)?0:g/100}function l(p,m,g){const _=p[m*4],k=p[m*4+1],M=p[m*4+2],S=p[m*4+3],U=(k-_)/g;for(let P=0;P<g;P++){const b=(m+P)*4;p[b]=_+U*P,p[b+1]=_+U*(P+1),p[b+2]=M,p[b+3]=S}}function u(){return(self.performance||Date).now()}function h(){this.data=[]}const v=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/v.length)},glyphAt(p){let m=h.flyweight;return m.data=this.data,m.index=p,m},splitAt(p){let m=new h;return m.data=this.data.splice(p*v.length),m}},h.flyweight=v.reduce((p,m,g,_)=>(Object.defineProperty(p,m,{get(){return this.data[this.index*v.length+g]},set(k){this.data[this.index*v.length+g]=k}}),p),{data:null,index:0}),{typeset:a,measure:n}}const xt=()=>(self.performance||Date).now(),kr=Wn();let _n;function Wi(s,r,c,f,t,e,o,a,n,i,l=!0){return l?Vi(s,r,c,f,t,e,o,a,n,i).then(null,u=>(_n||(_n=!0),kn(s,r,c,f,t,e,o,a,n,i))):kn(s,r,c,f,t,e,o,a,n,i)}const br=[],Ni=5;let io=0;function Vn(){const s=xt();for(;br.length&&xt()-s<Ni;)br.shift()();io=br.length?setTimeout(Vn,0):0}const Vi=(...s)=>new Promise((r,c)=>{br.push(()=>{const f=xt();try{kr.webgl.generateIntoCanvas(...s),r({timing:xt()-f})}catch(t){c(t)}}),io||(io=setTimeout(Vn,0))}),Hi=4,Xi=2e3,Tn={};let Yi=0;function kn(s,r,c,f,t,e,o,a,n,i){const l="TroikaTextSDFGenerator_JS_"+Yi++%Hi;let u=Tn[l];return u||(u=Tn[l]={workerModule:At({name:l,workerId:l,dependencies:[Wn,xt],init(h,v){const p=h().javascript.generate;return function(...m){const g=v();return{textureData:p(...m),timing:v()-g}}},getTransferables(h){return[h.textureData.buffer]}}),requests:0,idleTimer:null}),u.requests++,clearTimeout(u.idleTimer),u.workerModule(s,r,c,f,t,e).then(({textureData:h,timing:v})=>{const p=xt(),m=new Uint8Array(h.length*4);for(let g=0;g<h.length;g++)m[g*4+i]=h[g];return kr.webglUtils.renderImageData(o,m,a,n,s,r,1<<3-i),v+=xt()-p,--u.requests===0&&(u.idleTimer=setTimeout(()=>{_i(l)},Xi)),{timing:v}})}function Zi(s){s._warm||(kr.webgl.isSupported(s),s._warm=!0)}const qi=kr.webglUtils.resizeWebGLCanvasWithoutClearing,Kt={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},Qi=new Ve;function Ct(){return(self.performance||Date).now()}const Cn=Object.create(null);function Hn(s,r){s=$i({},s);const c=Ct(),f=[];if(s.font&&f.push({label:"user",src:es(s.font)}),s.font=f,s.text=""+s.text,s.sdfGlyphSize=s.sdfGlyphSize||Kt.sdfGlyphSize,s.unicodeFontsURL=s.unicodeFontsURL||Kt.unicodeFontsURL,s.colorRanges!=null){let u={};for(let h in s.colorRanges)if(s.colorRanges.hasOwnProperty(h)){let v=s.colorRanges[h];typeof v!="number"&&(v=Qi.set(v).getHex()),u[h]=v}s.colorRanges=u}Object.freeze(s);const{textureWidth:t,sdfExponent:e}=Kt,{sdfGlyphSize:o}=s,a=t/o*4;let n=Cn[o];if(!n){const u=document.createElement("canvas");u.width=t,u.height=o*256/a,n=Cn[o]={glyphCount:0,sdfGlyphSize:o,sdfCanvas:u,sdfTexture:new xa(u,void 0,void 0,void 0,Mr,Mr),contextLost:!1,glyphsByFont:new Map},n.sdfTexture.generateMipmaps=!1,Ki(n)}const{sdfTexture:i,sdfCanvas:l}=n;rs(s).then(u=>{const{glyphIds:h,glyphFontIndices:v,fontData:p,glyphPositions:m,fontSize:g,timings:_}=u,k=[],M=new Float32Array(h.length*4);let S=0,U=0;const P=Ct(),b=p.map(y=>{let A=n.glyphsByFont.get(y.src);return A||n.glyphsByFont.set(y.src,A=new Map),A});h.forEach((y,A)=>{const j=v[A],{src:Y,unitsPerEm:W}=p[j];let K=b[j].get(y);if(!K){const{path:C,pathBounds:F}=u.glyphData[Y][y],D=Math.max(F[2]-F[0],F[3]-F[1])/o*(Kt.sdfMargin*o+.5),R=n.glyphCount++,N=[F[0]-D,F[1]-D,F[2]+D,F[3]+D];b[j].set(y,K={path:C,atlasIndex:R,sdfViewBox:N}),k.push(K)}const{sdfViewBox:ae}=K,B=m[U++],z=m[U++],x=g/W;M[S++]=B+ae[0]*x,M[S++]=z+ae[1]*x,M[S++]=B+ae[2]*x,M[S++]=z+ae[3]*x,h[A]=K.atlasIndex}),_.quads=(_.quads||0)+(Ct()-P);const T=Ct();_.sdf={};const L=l.height,E=Math.ceil(n.glyphCount/a),H=Math.pow(2,Math.ceil(Math.log2(E*o)));H>L&&(qi(l,t,H),i.dispose()),Promise.all(k.map(y=>Xn(y,n,s.gpuAccelerateSDF).then(({timing:A})=>{_.sdf[y.atlasIndex]=A}))).then(()=>{k.length&&!n.contextLost&&(Yn(n),i.needsUpdate=!0),_.sdfTotal=Ct()-T,_.total=Ct()-c,r(Object.freeze({parameters:s,sdfTexture:i,sdfGlyphSize:o,sdfExponent:e,glyphBounds:M,glyphAtlasIndices:h,glyphColors:u.glyphColors,caretPositions:u.caretPositions,chunkedBounds:u.chunkedBounds,ascender:u.ascender,descender:u.descender,lineHeight:u.lineHeight,capHeight:u.capHeight,xHeight:u.xHeight,topBaseline:u.topBaseline,blockBounds:u.blockBounds,visibleBounds:u.visibleBounds,timings:u.timings}))})}),Promise.resolve().then(()=>{n.contextLost||Zi(l)})}function Xn({path:s,atlasIndex:r,sdfViewBox:c},{sdfGlyphSize:f,sdfCanvas:t,contextLost:e},o){if(e)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:n}=Kt,i=Math.max(c[2]-c[0],c[3]-c[1]),l=Math.floor(r/4),u=l%(a/f)*f,h=Math.floor(l/(a/f))*f,v=r%4;return Wi(f,f,s,c,i,n,t,u,h,v,o)}function Ki(s){const r=s.sdfCanvas;r.addEventListener("webglcontextlost",c=>{c.preventDefault(),s.contextLost=!0}),r.addEventListener("webglcontextrestored",c=>{s.contextLost=!1;const f=[];s.glyphsByFont.forEach(t=>{t.forEach(e=>{f.push(Xn(e,s,!0))})}),Promise.all(f).then(()=>{Yn(s),s.sdfTexture.needsUpdate=!0})})}function Ji({font:s,characters:r,sdfGlyphSize:c},f){let t=Array.isArray(r)?r.join(`
`):""+r;Hn({font:s,sdfGlyphSize:c,text:t},f)}function $i(s,r){for(let c in r)r.hasOwnProperty(c)&&(s[c]=r[c]);return s}let gr;function es(s){return gr||(gr=typeof document>"u"?{}:document.createElement("a")),gr.href=s,gr.href}function Yn(s){if(typeof createImageBitmap!="function"){const{sdfCanvas:r,sdfTexture:c}=s,{width:f,height:t}=r,e=s.sdfCanvas.getContext("webgl");let o=c.image.data;(!o||o.length!==f*t*4)&&(o=new Uint8Array(f*t*4),c.image={width:f,height:t,data:o},c.flipY=!1,c.isDataTexture=!0),e.readPixels(0,0,f,t,e.RGBA,e.UNSIGNED_BYTE,o)}}const ts=At({name:"Typesetter",dependencies:[Bi,Oi,ki],init(s,r,c){return s(r,c())}}),rs=At({name:"Typesetter",dependencies:[ts],init(s){return function(r){return new Promise(c=>{s.typeset(r,c)})}},getTransferables(s){const r=[];for(let c in s)s[c]&&s[c].buffer&&r.push(s[c].buffer);return r}}),Un={};function os(s){let r=Un[s];if(!r){const c=new _r(1,1,s,s),f=c.clone(),t=c.attributes,e=f.attributes,o=new wa,a=t.uv.count;for(let n=0;n<a;n++)e.position.array[n*3]*=-1,e.normal.array[n*3+2]*=-1;["position","normal","uv"].forEach(n=>{o.setAttribute(n,new ba([...t[n].array,...e[n].array],t[n].itemSize))}),o.setIndex([...c.index.array,...f.index.array.map(n=>n+a)]),o.translate(.5,.5,0),r=Un[s]=o}return r}const ns="aTroikaGlyphBounds",Fn="aTroikaGlyphIndex",as="aTroikaGlyphColor";class is extends pa{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new ma,this.boundingBox=new ga}computeBoundingSphere(){}computeBoundingBox(){}setSide(r){const c=this.getIndex().count;this.setDrawRange(r===Oe?c/2:0,r===Qe?c:c/2)}set detail(r){if(r!==this._detail){this._detail=r,(typeof r!="number"||r<1)&&(r=1);let c=os(r);["position","normal","uv"].forEach(f=>{this.attributes[f]=c.attributes[f].clone()}),this.setIndex(c.getIndex().clone())}}get detail(){return this._detail}set curveRadius(r){r!==this._curveRadius&&(this._curveRadius=r,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(r,c,f,t,e){qr(this,ns,r,4),qr(this,Fn,c,1),qr(this,as,e,3),this._blockBounds=f,this._chunkedBounds=t,this.instanceCount=c.length,this._updateBounds()}_updateBounds(){const r=this._blockBounds;if(r){const{curveRadius:c,boundingBox:f}=this;if(c){const{PI:t,floor:e,min:o,max:a,sin:n,cos:i}=Math,l=t/2,u=t*2,h=Math.abs(c),v=r[0]/h,p=r[2]/h,m=e((v+l)/u)!==e((p+l)/u)?-h:o(n(v)*h,n(p)*h),g=e((v-l)/u)!==e((p-l)/u)?h:a(n(v)*h,n(p)*h),_=e((v+t)/u)!==e((p+t)/u)?h*2:a(h-i(v)*h,h-i(p)*h);f.min.set(m,r[1],c<0?-_:0),f.max.set(g,r[3],c<0?0:_)}else f.min.set(r[0],r[1],0),f.max.set(r[2],r[3],0);f.getBoundingSphere(this.boundingSphere)}}applyClipRect(r){let c=this.getAttribute(Fn).count,f=this._chunkedBounds;if(f)for(let t=f.length;t--;){c=f[t].end;let e=f[t].rect;if(e[1]<r.w&&e[3]>r.y&&e[0]<r.z&&e[2]>r.x)break}this.instanceCount=c}}function qr(s,r,c,f){const t=s.getAttribute(r);c?t&&t.array.length===c.length?(t.array.set(c),t.needsUpdate=!0):(s.setAttribute(r,new Ma(c,f)),delete s._maxInstanceCount,s.dispose()):t&&s.deleteAttribute(r)}const ss=`
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
`,ls=`
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
`,cs=`
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
`,fs=`
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
`;function us(s){const r=ao(s,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new yt},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new Rt(0,0,0,0)},uTroikaClipRect:{value:new Rt(0,0,0,0)},uTroikaDistanceOffset:{value:0},uTroikaOutlineOpacity:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new yt},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new Ve},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new ya},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:ss,vertexTransform:ls,fragmentDefs:cs,fragmentColorTransform:fs,customRewriter({vertexShader:c,fragmentShader:f}){let t=/\buniform\s+vec3\s+diffuse\b/;return t.test(f)&&(f=f.replace(t,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),t.test(c)||(c=c.replace(Nn,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:c,fragmentShader:f}}});return r.transparent=!0,Object.defineProperties(r,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),r}const uo=new va({color:16777215,side:Qe,transparent:!0}),Rn=8421504,jn=new so,xr=new Te,Qr=new Te,qt=[],ds=new Te,Kr="+x+y";function An(s){return Array.isArray(s)?s[0]:s}let Zn=()=>{const s=new lo(new _r(1,1),uo);return Zn=()=>s,s},qn=()=>{const s=new lo(new _r(1,1,32,1),uo);return qn=()=>s,s};const hs={type:"syncstart"},vs={type:"synccomplete"},Qn=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],ps=Qn.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");let Kn=class extends lo{constructor(){const r=new is;super(r,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=Rn,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=Kr,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(r){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(r):(this._isSyncing=!0,this.dispatchEvent(hs),Hn({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},c=>{this._isSyncing=!1,this._textRenderInfo=c,this.geometry.updateGlyphs(c.glyphBounds,c.glyphAtlasIndices,c.blockBounds,c.chunkedBounds,c.glyphColors);const f=this._queuedSyncs;f&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{f.forEach(t=>t&&t())})),this.dispatchEvent(vs),r&&r()})))}onBeforeRender(r,c,f,t,e,o){this.sync(),e.isTroikaTextMaterial&&this._prepareForRender(e),e._hadOwnSide=e.hasOwnProperty("side"),this.geometry.setSide(e._actualSide=e.side),e.side=In}onAfterRender(r,c,f,t,e,o){e._hadOwnSide?e.side=e._actualSide:delete e.side}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}get material(){let r=this._derivedMaterial;const c=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=uo.clone());if((!r||r.baseMaterial!==c)&&(r=this._derivedMaterial=us(c),c.addEventListener("dispose",function f(){c.removeEventListener("dispose",f),r.dispose()})),this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY){let f=r._outlineMtl;return f||(f=r._outlineMtl=Object.create(r,{id:{value:r.id+.1}}),f.isTextOutlineMaterial=!0,f.depthWrite=!1,f.map=null,r.addEventListener("dispose",function t(){r.removeEventListener("dispose",t),f.dispose()})),[f,r]}else return r}set material(r){r&&r.isTroikaTextMaterial?(this._derivedMaterial=r,this._baseMaterial=r.baseMaterial):this._baseMaterial=r}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(r){this.geometry.detail=r}get curveRadius(){return this.geometry.curveRadius}set curveRadius(r){this.geometry.curveRadius=r}get customDepthMaterial(){return An(this.material).getDepthMaterial()}get customDistanceMaterial(){return An(this.material).getDistanceMaterial()}_prepareForRender(r){const c=r.isTextOutlineMaterial,f=r.uniforms,t=this.textRenderInfo;if(t){const{sdfTexture:a,blockBounds:n}=t;f.uTroikaSDFTexture.value=a,f.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),f.uTroikaSDFGlyphSize.value=t.sdfGlyphSize,f.uTroikaSDFExponent.value=t.sdfExponent,f.uTroikaTotalBounds.value.fromArray(n),f.uTroikaUseGlyphColors.value=!c&&!!t.glyphColors;let i=0,l=0,u=0,h,v,p,m=0,g=0;if(c){let{outlineWidth:k,outlineOffsetX:M,outlineOffsetY:S,outlineBlur:U,outlineOpacity:P}=this;i=this._parsePercent(k)||0,l=Math.max(0,this._parsePercent(U)||0),h=P,m=this._parsePercent(M)||0,g=this._parsePercent(S)||0}else u=Math.max(0,this._parsePercent(this.strokeWidth)||0),u&&(p=this.strokeColor,f.uTroikaStrokeColor.value.set(p??Rn),v=this.strokeOpacity,v==null&&(v=1)),h=this.fillOpacity;f.uTroikaDistanceOffset.value=i,f.uTroikaPositionOffset.value.set(m,g),f.uTroikaBlurRadius.value=l,f.uTroikaStrokeWidth.value=u,f.uTroikaStrokeOpacity.value=v,f.uTroikaFillOpacity.value=h??1,f.uTroikaCurveRadius.value=this.curveRadius||0;let _=this.clipRect;if(_&&Array.isArray(_)&&_.length===4)f.uTroikaClipRect.value.fromArray(_);else{const k=(this.fontSize||.1)*100;f.uTroikaClipRect.value.set(n[0]-k,n[1]-k,n[2]+k,n[3]+k)}this.geometry.applyClipRect(f.uTroikaClipRect.value)}f.uTroikaSDFDebug.value=!!this.debugSDF,r.polygonOffset=!!this.depthOffset,r.polygonOffsetFactor=r.polygonOffsetUnits=this.depthOffset||0;const e=c?this.outlineColor||0:this.color;if(e==null)delete r.color;else{const a=r.hasOwnProperty("color")?r.color:r.color=new Ve;(e!==a._input||typeof e=="object")&&a.set(a._input=e)}let o=this.orientation||Kr;if(o!==r._orientation){let a=f.uTroikaOrient.value;o=o.replace(/[^-+xyz]/g,"");let n=o!==Kr&&o.match(/^([-+])([xyz])([-+])([xyz])$/);if(n){let[,i,l,u,h]=n;xr.set(0,0,0)[l]=i==="-"?1:-1,Qr.set(0,0,0)[h]=u==="-"?-1:1,jn.lookAt(ds,xr.cross(Qr),Qr),a.setFromMatrix4(jn)}else a.identity();r._orientation=o}}_parsePercent(r){if(typeof r=="string"){let c=r.match(/^(-?[\d.]+)%$/),f=c?parseFloat(c[1]):NaN;r=(isNaN(f)?0:f/100)*this.fontSize}return r}localPositionToTextCoords(r,c=new yt){c.copy(r);const f=this.curveRadius;return f&&(c.x=Math.atan2(r.x,Math.abs(f)-Math.abs(r.z))*Math.abs(f)),c}worldPositionToTextCoords(r,c=new yt){return xr.copy(r),this.localPositionToTextCoords(this.worldToLocal(xr),c)}raycast(r,c){const{textRenderInfo:f,curveRadius:t}=this;if(f){const e=f.blockBounds,o=t?qn():Zn(),a=o.geometry,{position:n,uv:i}=a.attributes;for(let l=0;l<i.count;l++){let u=e[0]+i.getX(l)*(e[2]-e[0]);const h=e[1]+i.getY(l)*(e[3]-e[1]);let v=0;t&&(v=t-Math.cos(u/t)*t,u=Math.sin(u/t)*t),n.setXYZ(l,u,h,v)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,o.matrixWorld=this.matrixWorld,o.material.side=this.material.side,qt.length=0,o.raycast(r,qt);for(let l=0;l<qt.length;l++)qt[l].object=this,c.push(qt[l])}}copy(r){const c=this.geometry;return super.copy(r),this.geometry=c,ps.forEach(f=>{this[f]=r[f]}),this}clone(){return new this.constructor().copy(this)}};Qn.forEach(s=>{const r="_private_"+s;Object.defineProperty(Kn.prototype,s,{get(){return this[r]},set(c){c!==this[r]&&(this[r]=c,this._needsSync=!0)}})});const Ge=w.forwardRef(({sdfGlyphSize:s=64,anchorX:r="center",anchorY:c="middle",font:f,fontSize:t=1,children:e,characters:o,onSync:a,...n},i)=>{const l=jt(({invalidate:p})=>p),[u]=w.useState(()=>new Kn),[h,v]=w.useMemo(()=>{const p=[];let m="";return w.Children.forEach(e,g=>{typeof g=="string"||typeof g=="number"?m+=g:p.push(g)}),[p,m]},[e]);return Sa(()=>new Promise(p=>Ji({font:f,characters:o},p)),["troika-text",f,o]),w.useLayoutEffect(()=>void u.sync(()=>{l(),a&&a(u)})),w.useEffect(()=>()=>u.dispose(),[u]),w.createElement("primitive",rr({object:u,ref:i,font:f,text:v,anchorX:r,anchorY:c,fontSize:t,sdfGlyphSize:s},n),h)});function Pn(s,r,c){const f=jt(h=>h.size),t=jt(h=>h.viewport),e=typeof s=="number"?s:f.width*t.dpr,o=f.height*t.dpr,a=(typeof s=="number"?c:s)||{},{samples:n=0,depth:i,...l}=a,u=w.useMemo(()=>{const h=new _a(e,o,{minFilter:Mr,magFilter:Mr,type:Ta,...l});return i&&(h.depthTexture=new ka(e,o,Ca)),h.samples=n,h},[]);return w.useLayoutEffect(()=>{u.setSize(e,o),n&&(u.samples=n)},[n,u,e,o]),w.useEffect(()=>()=>u.dispose(),[]),u}const ms=Ua({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class gs extends ja{constructor(r=6,c=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new Ve("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=f=>{f.uniforms={...f.uniforms,...this.uniforms},this.anisotropy>0&&(f.defines.USE_ANISOTROPY=""),c?f.defines.USE_SAMPLER="":f.defines.USE_TRANSMISSION="",f.fragmentShader=`
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
`+f.fragmentShader,f.fragmentShader=f.fragmentShader.replace("#include <transmission_pars_fragment>",`
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
`),f.fragmentShader=f.fragmentShader.replace("#include <transmission_fragment>",`  
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
`)},Object.keys(this.uniforms).forEach(f=>Object.defineProperty(this,f,{get:()=>this.uniforms[f].value,set:t=>this.uniforms[f].value=t}))}}const Jn=w.forwardRef(({buffer:s,transmissionSampler:r=!1,backside:c=!1,side:f=In,transmission:t=1,thickness:e=0,backsideThickness:o=0,backsideEnvMapIntensity:a=1,samples:n=10,resolution:i,backsideResolution:l,background:u,anisotropy:h,anisotropicBlur:v,...p},m)=>{Fa({MeshTransmissionMaterial:gs});const g=w.useRef(null),[_]=w.useState(()=>new ms),k=Pn(l||i),M=Pn(i);let S,U,P,b;return ve(T=>{g.current.time=T.clock.getElapsedTime(),g.current.buffer===M.texture&&!r&&(b=g.current.__r3f.parent,b&&(P=T.gl.toneMapping,S=T.scene.background,U=g.current.envMapIntensity,T.gl.toneMapping=Ra,u&&(T.scene.background=u),b.material=_,c&&(T.gl.setRenderTarget(k),T.gl.render(T.scene,T.camera),b.material=g.current,b.material.buffer=k.texture,b.material.thickness=o,b.material.side=Oe,b.material.envMapIntensity=a),T.gl.setRenderTarget(M),T.gl.render(T.scene,T.camera),b.material=g.current,b.material.thickness=e,b.material.side=f,b.material.buffer=M.texture,b.material.envMapIntensity=U,T.scene.background=S,T.gl.setRenderTarget(null),T.gl.toneMapping=P))}),w.useImperativeHandle(m,()=>g.current,[]),w.createElement("meshTransmissionMaterial",rr({args:[n,r],ref:g},p,{buffer:s||M.texture,_transmission:t,anisotropicBlur:v??h,transmission:r?t:0,thickness:e,side:f}))}),xs=w.forwardRef(({children:s,enabled:r=!0,speed:c=1,rotationIntensity:f=1,floatIntensity:t=1,floatingRange:e=[-.1,.1],autoInvalidate:o=!1,...a},n)=>{const i=w.useRef(null);w.useImperativeHandle(n,()=>i.current,[]);const l=w.useRef(Math.random()*1e4);return ve(u=>{var h,v;if(!r||c===0)return;o&&u.invalidate();const p=l.current+u.clock.getElapsedTime();i.current.rotation.x=Math.cos(p/4*c)/8*f,i.current.rotation.y=Math.sin(p/4*c)/8*f,i.current.rotation.z=Math.sin(p/4*c)/20*f;let m=Math.sin(p/4*c)/10;m=Ne.mapLinear(m,-.1,.1,(h=e==null?void 0:e[0])!==null&&h!==void 0?h:-.1,(v=e==null?void 0:e[1])!==null&&v!==void 0?v:.1),i.current.position.y=m*t,i.current.updateMatrix()}),w.createElement("group",a,w.createElement("group",{ref:i,matrixAutoUpdate:!1},s))}),ys=({position:s})=>{const r=w.useRef();Ze();const[c,f]=w.useState(null);return w.useEffect(()=>{new lt().load("/assets/images/digital_fire.jpg",t=>{t.colorSpace=wt,f(t)})},[]),ve(t=>{if(r.current){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9;const o=1+Math.sin(t.clock.elapsedTime*5)*.1;r.current.scale.setScalar(o)}}),c?d.jsx("group",{position:s,children:d.jsx(On,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:d.jsxs("mesh",{ref:r,position:[0,20,0],children:[d.jsx("planeGeometry",{args:[40,40]}),d.jsx("meshBasicMaterial",{map:c,transparent:!0,opacity:0,depthWrite:!1,blending:Ie})]})})}):null},ws=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,bs=`
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
`,Ms=({position:s,angle:r,delay:c})=>{const f=w.useRef(),t=w.useRef();Ze();const e=w.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new Ve("#44aaff")},uPartyColor:{value:new Ve("#ff8844")}}),[]);return ve(o=>{if(!f.current||!t.current)return;e.uTime.value=o.clock.elapsedTime;const a=window.icebreakerThaw||0,n=Ne.clamp((a-c)*2,0,1);e.uState.value=n;const i=Math.sin(o.clock.elapsedTime*8+c*10)*n;if(f.current.position.y=s[1]+(i>0?i*2:0)+15,n>0){const l=0-s[0],u=0-(s[2]- -200),h=Math.sqrt(l*l+u*u)||1;f.current.position.x=s[0]+l/h*(n*20),f.current.position.z=s[2]+u/h*(n*20)}else f.current.position.x=s[0],f.current.position.z=s[2]}),d.jsx("group",{ref:f,position:[s[0],s[1]+15,s[2]],children:d.jsx(On,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:d.jsxs("mesh",{children:[d.jsx("planeGeometry",{args:[20,30]}),d.jsx("shaderMaterial",{ref:t,vertexShader:ws,fragmentShader:bs,uniforms:e,transparent:!0,side:Qe,depthWrite:!1})]})})})},Ss=({position:s})=>{const c=w.useMemo(()=>{const f=[];for(let t=0;t<60;t++){const e=Math.random()*Math.PI*2,o=30+Math.random()*80;f.push({position:[s[0]+Math.cos(e)*o,s[1],s[2]+Math.sin(e)*o],angle:e,delay:Math.random()*.5})}return f},[60,s]);return d.jsx("group",{children:c.map((f,t)=>d.jsx(Ms,{...f},t))})},_s=({position:s})=>{const r=w.useRef(),[c,f]=w.useState(null);return Ze(),w.useEffect(()=>{new lt().load("/icebreaker_logo.png",t=>{t.colorSpace=wt,f(t)})},[]),ve(t=>{if(r.current&&(r.current.rotation.y=t.clock.elapsedTime*.5,r.current.position.y=s[1]+Math.sin(t.clock.elapsedTime*2)*5,r.current.material)){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9,r.current.scale.setScalar(.01+e)}}),c?d.jsxs("mesh",{ref:r,position:s,children:[d.jsx("planeGeometry",{args:[40,40]}),d.jsx("meshBasicMaterial",{map:c,transparent:!0,opacity:0,depthWrite:!1,blending:Ie,side:Qe})]}):null},Ts=({numTrees:s=30,radius:r=50,centerZ:c=-500})=>{const f=w.useRef(),t=w.useRef();Ze();const e=w.useMemo(()=>new Tr,[]),o=w.useMemo(()=>{const a=[];for(let n=0;n<s;n++){const i=n/s*Math.PI*2+Math.random()*.5,l=r+Math.random()*20;a.push({position:new Te(Math.cos(i)*l,-18,Math.sin(i)*l+c),rotation:new Ut(0,i+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return a},[s,r,c]);return ve(()=>{if(!f.current||!t.current)return;const a=window.icebreakerThaw||0;for(let n=0;n<s;n++){const i=o[n],l=Math.max(0,(a-i.delay)*2),u=Ne.clamp(l,0,1)*i.scale;e.position.copy(i.position),e.rotation.copy(i.rotation),e.scale.setScalar(u),e.updateMatrix(),f.current.setMatrixAt(n,e.matrix),e.position.y+=18*u,e.updateMatrix(),t.current.setMatrixAt(n,e.matrix)}f.current.instanceMatrix.needsUpdate=!0,t.current.instanceMatrix.needsUpdate=!0}),d.jsxs("group",{children:[d.jsxs("instancedMesh",{ref:f,args:[null,null,s],children:[d.jsx("cylinderGeometry",{args:[.5,1,20,8]}),d.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),d.jsxs("instancedMesh",{ref:t,args:[null,null,s],children:[d.jsx("sphereGeometry",{args:[8,4,4]}),d.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},ks=`
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
`,Cs=`
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
`,Us=({startZ:s,endZ:r})=>{const c=w.useRef(),f=w.useRef(),[t,e]=w.useState(null),o=Math.abs(r-s),a=(s+r)/2,n=w.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return w.useEffect(()=>{new lt().load("/assets/images/ice_cavern.jpg",i=>{i.wrapS=tr,i.wrapT=tr,i.repeat.set(4,2),i.colorSpace=wt,e(i),n.tMap.value=i})},[n]),ve(i=>{if(f.current){const l=window.icebreakerThaw||0;n.uThaw.value=l,n.uTime.value=i.clock.elapsedTime}}),t?d.jsxs("mesh",{ref:c,position:[0,0,a],rotation:[Math.PI/2,0,0],children:[d.jsx("cylinderGeometry",{args:[120,120,o,128,128,!0]}),d.jsx("shaderMaterial",{ref:f,vertexShader:ks,fragmentShader:Cs,uniforms:n,transparent:!0,side:Oe})]}):null},Fs=({position:s})=>{const r=w.useRef();return ve(c=>{if(r.current){const f=window.icebreakerThaw||0,t=Ne.lerp(.01,50,Math.pow(f,2));r.current.scale.setScalar(t),r.current.visible=f>0}}),d.jsxs("mesh",{ref:r,position:[s[0],s[1]+1,s[2]],rotation:[-Math.PI/2,0,0],children:[d.jsx("circleGeometry",{args:[20,64]}),d.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},Rs=({position:s})=>{const r=w.useRef();return ve(c=>{if(r.current){const f=window.icebreakerThaw||0;r.current.scale.setScalar(f>0?1:.001)}}),d.jsxs("mesh",{ref:r,position:[s[0],s[1]+1.5,s[2]],rotation:[-Math.PI/2,0,0],children:[d.jsx("circleGeometry",{args:[96,64]}),d.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},js=({position:s})=>{const r=w.useRef();return ve(()=>{if(r.current){const c=window.icebreakerThaw||0;r.current.opacity=1-Math.pow(c,2),r.current.transparent=!0}}),d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:s,children:[d.jsx("planeGeometry",{args:[1e3,3e3]}),d.jsx("meshStandardMaterial",{ref:r,color:"#001133",roughness:.1,metalness:.8})]})},As=({centerZ:s})=>{const r=w.useRef(),c=w.useRef(),f=w.useMemo(()=>({uColorBottom:{value:new Ve("#ffaa55")},uColorTop:{value:new Ve("#00f3ff")},uOpacity:{value:0}}),[]);return ve(()=>{const t=window.icebreakerThaw||0;r.current&&(r.current.uniforms.uOpacity.value=t),c.current&&(c.current.intensity=t*.6)}),d.jsxs("group",{children:[d.jsxs("mesh",{scale:2e3,children:[d.jsx("sphereGeometry",{args:[1,32,32]}),d.jsx("shaderMaterial",{ref:r,side:Oe,transparent:!0,depthWrite:!1,uniforms:f,vertexShader:`
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
          `})]}),d.jsx("directionalLight",{ref:c,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),d.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},Ps=()=>{const s=Ze(),[r,c]=w.useState(!1),[f,t]=w.useState(!1),[e,o]=w.useState(!1),a=w.useRef({triggered:!1,timer:0}),n=w.useRef({triggered:!1,timer:0});return w.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),ve((i,l)=>{const u=s.offset;!n.current.triggered&&u>=.22&&(n.current.triggered=!0,o(!0),window.icebreakerCaveLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.22*(s.el.scrollHeight-s.el.clientHeight))),window.icebreakerCaveLocked&&(s.el&&(s.el.scrollTop=.22*(s.el.scrollHeight-s.el.clientHeight)),n.current.timer+=l,n.current.timer>1.5&&(window.icebreakerCaveLocked=!1,o(!1),s.el&&(s.el.style.overflow="auto"))),!r&&u>=.265&&window.icebreakerThaw<1&&(c(!0),window.icebreakerThawLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.27*(s.el.scrollHeight-s.el.clientHeight))),window.icebreakerThawLocked?(s.el&&(s.el.scrollTop=.27*(s.el.scrollHeight-s.el.clientHeight)),window.icebreakerThaw+=l*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,s.el&&!f&&(s.el.style.overflow="auto"),c(!1))):u<.2&&(window.icebreakerThaw=0),!a.current.triggered&&u>=.285&&window.icebreakerThaw>=1&&(a.current.triggered=!0,t(!0),window.icebreakerTextLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.29*(s.el.scrollHeight-s.el.clientHeight))),window.icebreakerTextLocked&&(s.el&&(s.el.scrollTop=.29*(s.el.scrollHeight-s.el.clientHeight)),a.current.timer+=l,a.current.timer>1.5&&(window.icebreakerTextLocked=!1,t(!1),s.el&&(s.el.style.overflow="auto")))}),null},Es=({position:s,rotation:r,visible:c=!0})=>d.jsxs("group",{position:s,rotation:r,visible:c,children:[d.jsx(Ps,{}),d.jsx(As,{centerZ:0}),d.jsx(Us,{startZ:1e3,endZ:-1e3}),d.jsx(js,{position:[0,-20,0]}),d.jsx(Fs,{position:[0,-20,0]}),d.jsx(Rs,{position:[0,-20,0]}),d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),d.jsx(ys,{position:[0,-20,0]}),d.jsx(_s,{position:[0,30,0]}),d.jsx(Ts,{radius:60,centerZ:0}),d.jsx(Ss,{position:[0,-20,0]})]}),Ds=`
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
`,Ls=`
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
`,Is=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,zs=({position:s,visible:r})=>d.jsxs("group",{visible:r,position:s,children:[d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),Gs=({position:s,visible:r})=>{const c=Ze(),f=w.useRef(),t=w.useRef(),e=w.useRef(),[o,a]=w.useState(null),[n,i]=w.useState(null),[l,u]=w.useState(!1),h=w.useRef({triggered:!1,timer:0});w.useEffect(()=>{window.mindwaveLocked=!1,new lt().load("/mindwave-logo.png",m=>{m.colorSpace=wt,a(m)}),new lt().load("/tribal-sun.png",m=>{m.colorSpace=wt,i(m)})},[]);const v=s?s[2]:0,p=w.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return ve((m,g)=>{if(!r)return;const _=c.offset;!h.current.triggered&&_>=.075&&(h.current.triggered=!0,u(!0),window.mindwaveLocked=!0,c.el&&(c.el.style.overflow="hidden",c.el.scrollTop=.08*(c.el.scrollHeight-c.el.clientHeight))),window.mindwaveLocked&&(c.el&&(c.el.scrollTop=.08*(c.el.scrollHeight-c.el.clientHeight)),h.current.timer+=g,h.current.timer>1.5&&(window.mindwaveLocked=!1,u(!1),c.el&&(c.el.style.overflow="auto")));const k=m.clock.elapsedTime;if(f.current){f.current.uniforms.uTime.value=k;const M=Math.abs(m.camera.position.z-v);let U=1-Math.min(M/1e3,1);U=Math.pow(U,2),f.current.uniforms.uScrollProgress.value=U}if(t.current){t.current.position.y=-7+Math.sin(k*2)*2;const M=1+Math.sin(k*4)*.05;t.current.scale.set(M,M,1),t.current.rotation.y=0}if(e.current){e.current.position.y=125+Math.sin(k*2)*2,e.current.rotation.z=k*.1;const M=1+Math.sin(k*3)*.05;e.current.scale.set(M,M,1)}}),d.jsxs("group",{visible:r,position:s,children:[d.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[d.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),d.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:Is,side:Oe,depthWrite:!1})]}),d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[d.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),d.jsx("shaderMaterial",{ref:f,vertexShader:Ds,fragmentShader:Ls,uniforms:p,transparent:!0,side:Qe,wireframe:!1})]}),n&&d.jsxs("mesh",{ref:e,position:[0,-10,-85],children:[d.jsx("planeGeometry",{args:[140,140]}),d.jsx("meshBasicMaterial",{map:n,transparent:!0,side:Qe,depthWrite:!1,blending:Ie,color:"#00ffff",opacity:.6})]}),o&&d.jsxs("mesh",{ref:t,position:[0,-10,-80],children:[d.jsx("planeGeometry",{args:[80,80]}),d.jsx("meshBasicMaterial",{map:o,transparent:!0,side:Qe,depthWrite:!1,blending:Ie})]}),d.jsx(zs,{position:[0,-5,-80],visible:!0})]})},Os=`
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vWorldPos = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`,Bs=`
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  
  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    // Generate scrolling digital rain on Y axis
    vec2 uv = vUv * vec2(2.0, 50.0);
    
    // Unique identifier for the column based on world X/Z
    float colId = floor(vWorldPos.x * 0.1) + floor(vWorldPos.z * 0.1) * 100.0;
    float rnd = hash(colId + floor(uv.x * 10.0)); // Randomize per "stream"
    
    float speed = 1.0 + rnd * 2.0;
    uv.y += uTime * speed;
    
    // Create text-like dashes
    float dash = step(0.7, fract(uv.y));
    float char = step(0.3, fract(sin(floor(uv.y * 20.0)) * 43.0)); // Fake characters
    
    float intensity = dash * char;
    
    // Deep glowing gold
    vec3 gold = vec3(1.0, 0.8, 0.2) * 2.0;
    // Dark stone base
    vec3 stone = vec3(0.02, 0.02, 0.03);
    
    // Add glowing edges to the pillars
    float edge = step(0.95, vUv.x) + step(vUv.x, 0.05);
    vec3 finalColor = mix(stone, gold, intensity * 0.8);
    finalColor += gold * edge * 0.2;
    
    // Distance fade (like fog)
    float distance = length(vWorldPos.xz);
    float fade = smoothstep(2000.0, 500.0, distance);
    
    gl_FragColor = vec4(finalColor * fade, 1.0);
  }
`,Ws=()=>{const s=w.useRef(),r=w.useRef(),c=w.useMemo(()=>{const e=[];let o=0;for(let a=-5;a<5;a++)for(let n=-10;n<10;n++)Math.abs(a)<2||(e.push({position:new Te(a*400+(Math.random()-.5)*100,0,n*400+(Math.random()-.5)*100),scale:new Te(50+Math.random()*50,2e3+Math.random()*1e3,50+Math.random()*50)}),o++);return{data:e,actualCount:o}},[]),f=w.useMemo(()=>new Tr,[]),t=w.useMemo(()=>({uTime:{value:0}}),[]);return w.useEffect(()=>{s.current&&(c.data.forEach((e,o)=>{f.position.copy(e.position),f.scale.copy(e.scale),f.updateMatrix(),s.current.setMatrixAt(o,f.matrix)}),s.current.instanceMatrix.needsUpdate=!0)},[c,f]),ve(e=>{r.current&&(r.current.uniforms.uTime.value=e.clock.elapsedTime)}),d.jsx("instancedMesh",{ref:s,args:[new Aa(1,1,1),null,c.actualCount],children:d.jsx("shaderMaterial",{ref:r,vertexShader:Os,fragmentShader:Bs,uniforms:t})})},Ns=({scrollOffsetRef:s})=>{const r=w.useRef(),c=2e3,f=w.useMemo(()=>{const e=[],a=c/50;for(let n=0;n<c;n++){const i=200+Math.random()*800,l=Math.random()*Math.PI*2,u=(Math.random()-.5)*1e3,h=new Te(Math.cos(l)*i,u,Math.sin(l)*i),v=n%50,p=Math.floor(n/50),m=new Te((v-50/2)*12,(p-a/2)*16,-1e3);e.push({chaosPos:h,orderPos:m,chaosRot:new Ut(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),orderRot:new Ut(0,0,0),phaseOffset:Math.random()*Math.PI*2,speed:.5+Math.random()*1.5})}return e},[c]),t=w.useMemo(()=>new Tr,[]);return ve(e=>{if(!r.current)return;const o=e.clock.elapsedTime;let n=(s.current-.48)/(.58-.48);n=Ne.clamp(n,0,1);const i=Math.pow(n,4);f.forEach((l,u)=>{const h=Math.sqrt(l.chaosPos.x*l.chaosPos.x+l.chaosPos.z*l.chaosPos.z),v=Math.atan2(l.chaosPos.z,l.chaosPos.x)+o*l.speed*.2,p=new Te(Math.cos(v)*h,l.chaosPos.y+Math.sin(o*l.speed+l.phaseOffset)*100,Math.sin(v)*h);t.position.lerpVectors(p,l.orderPos,i);const m=new st().setFromEuler(new Ut(l.chaosRot.x+o*l.speed,l.chaosRot.y+o*l.speed,l.chaosRot.z)),g=new st().setFromEuler(l.orderRot);t.quaternion.slerpQuaternions(m,g,i),t.updateMatrix(),r.current.setMatrixAt(u,t.matrix)}),r.current.instanceMatrix.needsUpdate=!0}),d.jsx("instancedMesh",{ref:r,args:[new _r(8,12),null,c],children:d.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.6,blending:Ie,depthWrite:!1,side:Qe})})},Jr=({position:s,text:r,color:c})=>{const f=w.useRef();return ve(t=>{f.current&&(f.current.position.y=s[1]+Math.sin(t.clock.elapsedTime*2+s[0])*10)}),d.jsxs("group",{ref:f,position:s,children:[d.jsxs(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],fontSize:32,color:c,maxWidth:400,textAlign:"center",anchorX:"center",anchorY:"middle",children:[r,d.jsx("meshBasicMaterial",{color:c,transparent:!0,opacity:.9,blending:Ie})]}),d.jsx("pointLight",{color:c,intensity:5,distance:500})]})},Vs=({position:s,rotation:r,visible:c})=>{const f=Ze(),t=w.useRef(0);return ve(()=>{t.current=f.offset}),d.jsxs("group",{position:s,rotation:r,visible:c,children:[d.jsx("ambientLight",{intensity:.1}),d.jsx(Ws,{}),d.jsx(Ns,{scrollOffsetRef:t}),d.jsx(Jr,{position:[-300,50,800],text:"AI Contract Creation",color:"#00ffcc"}),d.jsx(Jr,{position:[300,-50,-200],text:"Intelligent Review",color:"#ff00ff"}),d.jsx(Jr,{position:[-200,100,-1200],text:"Absolute Order",color:"#d4af37"})]})},Hs=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Xs=`
  uniform float uTime;
  varying vec2 vUv;
  
  // Hash function for noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // Value noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  // Fractional Brownian Motion
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Flowing coordinates
    vec2 uv = vUv * 3.0;
    vec2 q = vec2(0.);
    q.x = fbm( uv + 0.00 * uTime);
    q.y = fbm( uv + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( uv + 1.0*q + vec2(1.7,9.2)+ 0.15*uTime );
    r.y = fbm( uv + 1.0*q + vec2(8.3,2.8)+ 0.126*uTime);

    float f = fbm(uv+r);

    // Deep space colors
    vec3 color = mix(vec3(0.02, 0.0, 0.05), vec3(0.1, 0.05, 0.2), clamp((f*f)*4.0,0.0,1.0));
    // Pink/Magenta highlights
    color = mix(color, vec3(0.8, 0.1, 0.4), clamp(length(q),0.0,1.0));
    // Cyan/Blue bright spots
    color = mix(color, vec3(0.1, 0.8, 0.9), clamp(length(r.x),0.0,1.0));
    
    // Add some "stars" to the nebula
    float starF = noise(vUv * 200.0);
    if(starF > 0.85) {
      color += vec3(pow(starF, 10.0));
    }

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color, 1.0);
  }
`,En=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Dn=`
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 4; ++i) { v += a * noise(p); p = p * 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    // Polar coordinates
    vec2 uv = vUv - 0.5;
    float r = length(uv) * 2.0;
    float a = atan(uv.y, uv.x);
    
    // Ring bounds
    if(r < 0.3 || r > 1.0) discard;
    
    // Swirl effect
    float swirl = a + r * 5.0 - uTime * 2.0;
    
    // Add noise to the ring
    vec2 noiseUv = vec2(cos(swirl), sin(swirl)) * r * 10.0;
    float n = fbm(noiseUv - uTime * 3.0);
    
    // Fade edges
    float alpha = smoothstep(0.3, 0.4, r) * smoothstep(1.0, 0.8, r);
    
    // Core heat vs outer edge
    vec3 hot = vec3(1.0, 0.9, 0.7); // White/Yellow
    vec3 mid = vec3(1.0, 0.4, 0.0); // Orange
    vec3 cool = vec3(0.5, 0.0, 0.2); // Dark Red
    
    vec3 color = mix(cool, mid, n);
    color = mix(color, hot, smoothstep(0.6, 0.3, r) * n);
    
    // Intense brightness
    gl_FragColor = vec4(color * 3.0, alpha * n * 0.8);
  }
`,Ys=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Zs=`
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    // Scroll U along the tunnel (y axis in tube coords usually)
    vec2 uv = vUv;
    uv.x *= 10.0; // wrap around
    uv.y = uv.y * 50.0 - uTime * 20.0; // forward motion
    
    float n = noise(uv);
    float n2 = noise(uv * 2.0 - vec2(uTime * 5.0, uTime * 10.0));
    
    // Streaks of energy
    float streak = smoothstep(0.7, 0.9, n * n2);
    
    vec3 color = mix(vec3(0.0), vec3(0.2, 0.8, 1.0), streak); // Cyan streaks
    color += mix(vec3(0.0), vec3(1.0, 0.2, 0.8), smoothstep(0.8, 0.95, n)) * 0.5; // Magenta burst
    
    gl_FragColor = vec4(color * 2.0, streak);
  }
`,qs=()=>{const s=w.useRef(),r=w.useMemo(()=>({uTime:{value:0}}),[]);return ve(c=>{s.current&&(s.current.uniforms.uTime.value=c.clock.elapsedTime*.2)}),d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[3500,64,64]}),d.jsx("shaderMaterial",{ref:s,vertexShader:Hs,fragmentShader:Xs,uniforms:r,side:Oe,depthWrite:!1})]})},Qs=({position:s})=>{const r=w.useRef(),c=w.useMemo(()=>({uTime:{value:0}}),[]);return ve(f=>{r.current&&(r.current.uniforms.uTime.value=f.clock.elapsedTime)}),d.jsxs("group",{position:s,children:[d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[40,64,64]}),d.jsx("meshBasicMaterial",{color:"#000000"})]}),d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[55,64,64]}),d.jsx(Jn,{backside:!0,samples:4,thickness:150,chromaticAberration:1.5,anisotropy:.5,distortion:1.5,distortionScale:.5,temporalDistortion:.1,iridescence:1,iridescenceIOR:1,iridescenceThicknessRange:[0,1400],transmission:1,ior:2.5,color:"#ffffff"})]}),d.jsxs("mesh",{rotation:[-Math.PI/2.5,0,Math.PI/6],scale:[400,400,400],children:[d.jsx("planeGeometry",{args:[1,1,64,64]}),d.jsx("shaderMaterial",{ref:r,vertexShader:En,fragmentShader:Dn,uniforms:c,transparent:!0,side:Qe,blending:Ie,depthWrite:!1})]}),d.jsxs("mesh",{rotation:[-Math.PI/2.5,Math.PI/2,Math.PI/6],scale:[300,300,300],children:[d.jsx("planeGeometry",{args:[1,1,64,64]}),d.jsx("shaderMaterial",{vertexShader:En,fragmentShader:Dn,uniforms:c,transparent:!0,side:Qe,blending:Ie,depthWrite:!1,opacity:.3})]})]})},Ks=({position:s,rotation:r})=>{const c=w.useRef(),f=w.useMemo(()=>({uTime:{value:0}}),[]);ve(e=>{c.current&&(c.current.uniforms.uTime.value=e.clock.elapsedTime)});const t=w.useMemo(()=>new Pa(new Te(0,0,0),new Te(0,0,3e3)),[]);return d.jsx("group",{position:s,rotation:r,children:d.jsxs("mesh",{children:[d.jsx("tubeGeometry",{args:[t,64,150,32,!1]}),d.jsx("shaderMaterial",{ref:c,vertexShader:Ys,fragmentShader:Zs,uniforms:f,side:Oe,transparent:!0,blending:Ie,depthWrite:!1})]})})},Js=({position:s})=>{const r=w.useRef();return ve(c=>{r.current&&(r.current.position.y=s[1]+Math.sin(c.clock.elapsedTime)*5)}),d.jsxs("group",{ref:r,position:s,children:[d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,0],fontSize:32,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"INTERSTELLAR"}),d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-40,0],fontSize:12,color:"#00f3ff",anchorX:"center",anchorY:"middle",maxWidth:600,textAlign:"center",children:"Autonomous intelligence operating on the event horizon."})]})},$s=({position:s,visible:r})=>{const c=Ze(),[f,t]=w.useState(!1),e=w.useRef({triggered:!1,timer:0});return ve((o,a)=>{if(!r)return;const n=c.offset;!e.current.triggered&&n>=.42&&(e.current.triggered=!0,t(!0),window.interstellarLocked=!0,c.el&&(c.el.style.overflow="hidden",c.el.scrollTop=.42*(c.el.scrollHeight-c.el.clientHeight))),window.interstellarLocked&&(c.el&&(c.el.scrollTop=.42*(c.el.scrollHeight-c.el.clientHeight)),e.current.timer+=a,e.current.timer>2&&(window.interstellarLocked=!1,t(!1),c.el&&(c.el.style.overflow="auto")))}),d.jsxs("group",{position:s,visible:r,children:[d.jsx(qs,{}),d.jsx(Ks,{position:[0,0,2500],rotation:[0,Math.PI,0]}),d.jsx(Qs,{position:[200,50,-1e3]}),d.jsx(Js,{position:[0,-50,-500]}),d.jsx("ambientLight",{intensity:.5}),d.jsx("pointLight",{position:[200,50,-1e3],intensity:10,color:"#ff8844",distance:2e3})]})},el=`
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,tl=`
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  // Noise functions
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
  
    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
  
    //  x0 = x0 - 0.0 + 0.0 * C 
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  
    // Permutations
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  
    // Gradients
    float n_ = 1.0/7.0; // N=7
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
  
    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
  
    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    // Neural network lines and pulses
    vec3 pos = vPosition * 0.01; // scale
    float n1 = snoise(pos + uTime * 0.2);
    float n2 = snoise(pos * 2.0 - uTime * 0.3);
    float n3 = snoise(pos * 4.0 + uTime * 0.5);
    
    // Combine noise into a stringy/vein-like structure
    float network = abs(n1 * n2);
    network = smoothstep(0.02, 0.05, network);
    
    // Pulses traveling along the network
    float pulse = sin(n1 * 10.0 + uTime * 5.0) * 0.5 + 0.5;
    pulse = pow(pulse, 4.0); // Sharpen the pulse
    
    // Base color is a deep cyan, pulses are bright magenta
    vec3 baseColor = vec3(0.0, 0.8, 1.0) * 0.2;
    vec3 pulseColor = vec3(1.0, 0.2, 0.8) * 2.0;
    
    vec3 finalColor = mix(baseColor, pulseColor, pulse) * (1.0 - network);
    
    // Add rim lighting for 3D depth
    float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
    rim = smoothstep(0.6, 1.0, rim);
    finalColor += vec3(0.0, 0.5, 0.8) * rim;
    
    float alpha = (1.0 - network) * 0.8 + rim * 0.5;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`,rl=`
  uniform float uTime;
  attribute vec3 aRandom; // [speed, phase, size]
  varying float vAlpha;
  
  void main() {
    vec3 pos = position;
    
    // Particles flow outward from center (0,0,0) towards the viewer (+Z)
    // They spawn near the core and shoot outward.
    
    float life = fract(aRandom.y + uTime * aRandom.x * 0.5); // 0 to 1
    
    // Expand outward and forward
    pos.x += sin(life * 10.0 + aRandom.z) * 200.0 * life;
    pos.y += cos(life * 10.0 + aRandom.z) * 200.0 * life;
    pos.z += life * 2000.0 - 500.0; // Start behind and fly forward
    
    // Fade in and out
    vAlpha = smoothstep(0.0, 0.1, life) * smoothstep(1.0, 0.8, life);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    // Size attenuation based on distance
    gl_PointSize = (20.0 * aRandom.z) * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`,ol=`
  varying float vAlpha;
  
  void main() {
    // Create a soft glowing circle for each particle
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    
    float glow = exp(-r * 3.0);
    
    // Cyan/Blue colors
    vec3 color = mix(vec3(0.0, 1.0, 1.0), vec3(0.5, 0.0, 1.0), r);
    
    gl_FragColor = vec4(color * 2.0, glow * vAlpha);
  }
`,nl=({position:s})=>{const r=w.useRef(),c=w.useMemo(()=>({uTime:{value:0}}),[]);return ve(f=>{r.current&&(r.current.uniforms.uTime.value=f.clock.elapsedTime)}),d.jsxs("group",{position:s,children:[d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[150,64,64]}),d.jsx("shaderMaterial",{ref:r,vertexShader:el,fragmentShader:tl,uniforms:c,transparent:!0,blending:Ie,depthWrite:!1,side:Qe})]}),d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[100,32,32]}),d.jsx("meshBasicMaterial",{color:"#00ffcc",transparent:!0,opacity:.2,blending:Ie})]})]})},al=({position:s})=>{const r=w.useRef(),c=2e3,f=w.useMemo(()=>({uTime:{value:0}}),[]),[t,e]=w.useMemo(()=>{const o=new Float32Array(c*3),a=new Float32Array(c*3);for(let n=0;n<c;n++){const i=Math.random()*Math.PI*2,l=Math.acos(Math.random()*2-1),u=Math.random()*50;o[n*3]=u*Math.sin(l)*Math.cos(i),o[n*3+1]=u*Math.sin(l)*Math.sin(i),o[n*3+2]=u*Math.cos(l),a[n*3]=.5+Math.random(),a[n*3+1]=Math.random(),a[n*3+2]=.5+Math.random()*1.5}return[o,a]},[c]);return ve(o=>{r.current&&(r.current.material.uniforms.uTime.value=o.clock.elapsedTime)}),d.jsx("group",{position:s,children:d.jsxs("points",{children:[d.jsxs("bufferGeometry",{children:[d.jsx("bufferAttribute",{attach:"attributes-position",count:c,array:t,itemSize:3}),d.jsx("bufferAttribute",{attach:"attributes-aRandom",count:c,array:e,itemSize:3})]}),d.jsx("shaderMaterial",{ref:r,vertexShader:rl,fragmentShader:ol,uniforms:f,transparent:!0,blending:Ie,depthWrite:!1})]})})},il=({position:s})=>d.jsxs("group",{position:s,children:[d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,0],fontSize:60,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"AUTOPILOT"}),d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-80,0],fontSize:24,color:"#00ffcc",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"Fully autonomous marketing pipelines. Generates content, schedules campaigns, and optimizes spend."})]}),sl=({position:s,rotation:r,visible:c})=>{const f=Ze(),[t,e]=w.useState(!1);return w.useRef({triggered:!1,timer:0}),ve((o,a)=>{c&&f.offset}),d.jsxs("group",{visible:c,position:s,rotation:r,children:[d.jsx(nl,{position:[0,0,-800]}),d.jsx(al,{position:[0,0,-800]}),d.jsx(il,{position:[0,-250,-500]}),d.jsx("ambientLight",{intensity:.2}),d.jsx("pointLight",{color:"#00ffcc",intensity:5,distance:1e3,position:[0,0,-800]})]})},ll=({position:s})=>{const r=w.useRef(),c=w.useMemo(()=>({uTime:{value:0},uColor:{value:new Ve("#00ffff")}}),[]);return ve(f=>{r.current&&(r.current.uniforms.uTime.value=f.clock.elapsedTime)}),d.jsxs("mesh",{position:s,children:[d.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),d.jsx("shaderMaterial",{ref:r,transparent:!0,side:Qe,blending:Ie,depthWrite:!1,uniforms:c,vertexShader:`
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
        `})]})},cl=()=>{const s=w.useRef(),r=w.useMemo(()=>({uTime:{value:0},uColor:{value:new Ve("#0044ff")},uHighlight:{value:new Ve("#00ffff")}}),[]);return ve(c=>{s.current&&(s.current.uniforms.uTime.value=c.clock.elapsedTime)}),d.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[d.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),d.jsx("shaderMaterial",{ref:s,transparent:!0,wireframe:!0,uniforms:r,vertexShader:`
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
        `})]})},fl=({position:s,rotation:r,visible:c})=>{const[f,t]=w.useState(null);return w.useEffect(()=>{new lt().load("/cloveh2o_logo.png",o=>{o.colorSpace=wt,t(o)})},[]),d.jsxs("group",{visible:c,position:s,rotation:r,children:[d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[4e3,32,32]}),d.jsx("meshBasicMaterial",{color:"#000511",side:Oe})]}),d.jsx(cl,{}),d.jsx(ll,{position:[0,1800,-800]}),d.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),d.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),d.jsxs("group",{position:[0,0,-300],children:[f&&d.jsxs("mesh",{position:[0,80,0],children:[d.jsx("planeGeometry",{args:[200,200]}),d.jsx("meshBasicMaterial",{map:f,transparent:!0,depthWrite:!1,blending:Ie})]}),d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},yr=({color:s,number:r,groupRef:c,armRef:f})=>d.jsxs("group",{ref:c,children:[d.jsxs("mesh",{position:[0,10,0],children:[d.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),d.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.3,roughness:.4})]}),d.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[d.jsx("sphereGeometry",{args:[2.5,16,16]}),d.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.5,roughness:.3})]}),d.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[d.jsx("sphereGeometry",{args:[2.5,16,16]}),d.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.5,roughness:.3})]}),d.jsxs("group",{position:[0,17,0],children:[d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[2.8,32,32]}),d.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.8,metalness:.5})]}),d.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[d.jsx("boxGeometry",{args:[3.5,2,2]}),d.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),d.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:d.jsxs("mesh",{position:[0,-3.5,0],children:[d.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),d.jsx("meshStandardMaterial",{color:s,roughness:.6})]})}),d.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:f,children:d.jsxs("mesh",{position:[0,-3.5,0],children:[d.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),d.jsx("meshStandardMaterial",{color:s,roughness:.6})]})}),d.jsxs("mesh",{position:[-1.8,3,0],children:[d.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),d.jsx("meshStandardMaterial",{color:s,roughness:.8})]}),d.jsxs("mesh",{position:[1.8,3,0],children:[d.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),d.jsx("meshStandardMaterial",{color:s,roughness:.8})]}),r&&d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:r})]}),ul=({position:s})=>{const r=w.useRef(),c=w.useRef(),f=w.useRef(),t=w.useRef(),e=w.useRef(),o=w.useRef(),a=w.useMemo(()=>new Te(100,0,0),[]),n=w.useMemo(()=>new Te(100,0,20),[]),i=w.useMemo(()=>new Te(30,0,100),[]),l=w.useMemo(()=>new Te(0,0,-20),[]),u=w.useMemo(()=>new Te(20,0,220),[]),h=w.useMemo(()=>new Te,[]),v=w.useMemo(()=>new Te,[]);return w.useMemo(()=>new Te,[]),ve(p=>{const m=p.clock.elapsedTime%6;if(f.current&&f.current.rotation.set(0,0,-.3),m<.5)c.current&&c.current.position.copy(a),t.current&&t.current.position.copy(n),e.current&&e.current.position.copy(i),r.current&&r.current.position.copy(l),o.current&&o.current.position.copy(l).add(h.set(4.5,12,2));else if(m<4){const g=(m-.5)/3.5;if(c.current&&(g<.5?c.current.position.lerpVectors(a,h.set(100,0,110),g*2):c.current.position.lerpVectors(v.set(100,0,110),u,(g-.5)*2)),t.current&&c.current&&t.current.position.lerpVectors(n,h.set(u.x+8,0,u.z-8),g),e.current&&e.current.position.lerpVectors(i,h.set(u.x-8,0,u.z+8),g),o.current)if(m<1.5)o.current.position.copy(l).add(h.set(4.5,12,2));else{const _=(m-1.5)/2.5,k=Math.sin(_*Math.PI)*45;o.current.position.lerpVectors(l,u,_),o.current.position.y+=k+18}}else if(m<5)c.current&&c.current.position.lerpVectors(u,h.set(20,0,240),m-4),o.current&&c.current&&o.current.position.copy(c.current.position).add(h.set(0,12,3)),t.current&&(t.current.position.y=0),e.current&&(e.current.position.y=0);else if(m<5.5)f.current&&f.current.rotation.set(Math.PI,0,0),o.current&&c.current&&o.current.position.copy(c.current.position).add(h.set(4.5,20,0));else if(f.current&&f.current.rotation.set(-Math.PI/4,0,0),o.current&&c.current){const g=m-5.5,_=Math.abs(Math.cos(g*8))*10;o.current.position.copy(c.current.position).add(h.set(4.5,_,4))}}),d.jsxs("group",{position:s,children:[d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[d.jsx("planeGeometry",{args:[400,400]}),d.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),d.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[d.jsx("planeGeometry",{args:[400,40]}),d.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),d.jsx(yr,{color:"#0088ff",number:"QB",groupRef:r}),d.jsx(yr,{color:"#00ffff",number:"80",groupRef:c,armRef:f}),d.jsx(yr,{color:"#ff0044",number:"CB",groupRef:t}),d.jsx(yr,{color:"#ff0044",number:"S",groupRef:e}),d.jsxs("mesh",{ref:o,children:[d.jsx("sphereGeometry",{args:[2,16,16]}),d.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},dl=({position:s,rotation:r,visible:c})=>{const f=co(lt,"/fantasy_quant_stadium.jpg");return f.colorSpace=wt,f.wrapS=tr,f.repeat.set(-1,1),d.jsxs("group",{visible:c,position:s,rotation:r,children:[d.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[d.jsx("sphereGeometry",{args:[2500,64,64]}),d.jsx("meshBasicMaterial",{map:f,side:Oe})]}),d.jsx(ul,{position:[0,-125,0],rotation:[0,-Math.PI/2,0]}),d.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),d.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),d.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]})]})},Qt=({radius:s,tube:r,rotationSpeed:c,axis:f,color:t,emissiveIntensity:e})=>{const o=w.useRef();return ve((a,n)=>{o.current&&(f==="x"&&(o.current.rotation.x+=c*n),f==="y"&&(o.current.rotation.y+=c*n),f==="z"&&(o.current.rotation.z+=c*n))}),d.jsxs("mesh",{ref:o,children:[d.jsx("torusGeometry",{args:[s,r,32,100]}),d.jsx("meshStandardMaterial",{color:t,metalness:1,roughness:.1,emissive:t,emissiveIntensity:e})]})},hl=({position:s,rotation:r,speed:c})=>{const f=w.useRef(),t=["predicting future state...","ALPHA = 0.8932","MARKET_VOLATILITY: LOW","EXECUTING HFT BATCH","QUANTUM OPTIMIZATION","HEDGE RATIO: 1.42"],[e]=w.useState(()=>t[Math.floor(Math.random()*t.length)]);return ve((o,a)=>{f.current&&(f.current.position.y+=c*a*50,f.current.position.y>1e3&&(f.current.position.y=-1e3))}),d.jsx("group",{ref:f,position:s,rotation:r,children:d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],fontSize:14,color:"#d4af37",anchorX:"center",anchorY:"middle",opacity:.6,transparent:!0,children:e})})},vl=({position:s})=>{const r=w.useRef();return ve((c,f)=>{r.current&&(r.current.rotation.y+=.5*f,r.current.rotation.x+=.2*f)}),d.jsxs("group",{position:s,children:[d.jsxs("mesh",{ref:r,children:[d.jsx("icosahedronGeometry",{args:[80,2]}),d.jsx(Jn,{backside:!0,samples:4,thickness:50,chromaticAberration:2,anisotropy:1,distortion:.5,distortionScale:.5,temporalDistortion:.1,transmission:1,ior:1.5,color:"#ffd700"})]}),d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[40,32,32]}),d.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.8,blending:Ie})]}),d.jsx(Qt,{radius:150,tube:4,rotationSpeed:1,axis:"x",color:"#d4af37",emissiveIntensity:.5}),d.jsx(Qt,{radius:180,tube:3,rotationSpeed:-.8,axis:"y",color:"#ffaa00",emissiveIntensity:.3}),d.jsx(Qt,{radius:210,tube:5,rotationSpeed:.5,axis:"z",color:"#d4af37",emissiveIntensity:.8}),d.jsx(Qt,{radius:250,tube:2,rotationSpeed:-1.2,axis:"x",color:"#ffffff",emissiveIntensity:.2}),d.jsx(Qt,{radius:300,tube:8,rotationSpeed:.3,axis:"y",color:"#d4af37",emissiveIntensity:1}),Array.from({length:40}).map((c,f)=>d.jsx(hl,{position:[(Math.random()-.5)*800,(Math.random()-.5)*2e3,(Math.random()-.5)*800],rotation:[0,Math.random()*Math.PI*2,0],speed:.5+Math.random()},f))]})},pl=({position:s})=>d.jsxs("group",{position:s,children:[d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,0],fontSize:60,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"CONTANGO"}),d.jsx(Ge,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-80,0],fontSize:24,color:"#d4af37",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"The predictive oracle. Unrivaled market intelligence and forecasting powered by quantum algorithms."})]}),ml=({position:s,rotation:r,visible:c})=>d.jsxs("group",{visible:c,position:s,rotation:r,children:[d.jsx(vl,{position:[0,0,-800]}),d.jsx(pl,{position:[0,-350,-500]}),d.jsx("ambientLight",{intensity:.1}),d.jsx("pointLight",{color:"#ffd700",intensity:10,distance:1500,position:[0,0,-800]}),d.jsx("spotLight",{color:"#ffffff",intensity:5,distance:2e3,angle:.5,penumbra:1,position:[0,500,-800]})]}),gl=({position:s,rotation:r,visible:c})=>{const f=w.useRef(),t=w.useRef(),e=co(lt,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return ve(o=>{f.current&&(f.current.position.y=Math.sin(o.clock.elapsedTime*1.5)*5),t.current&&(t.current.rotation.y+=.005,t.current.rotation.z+=.002)}),d.jsxs("group",{visible:c,position:s,rotation:r,children:[d.jsxs("mesh",{children:[d.jsx("sphereGeometry",{args:[1500,32,32]}),d.jsx("meshBasicMaterial",{color:"#020510",side:Oe})]}),d.jsxs("group",{children:[d.jsx(xs,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:d.jsxs("mesh",{ref:f,position:[0,0,-500],children:[d.jsx("planeGeometry",{args:[400,100]})," ",d.jsx("meshBasicMaterial",{map:e,transparent:!0,opacity:1,side:Qe,depthWrite:!1})]})}),d.jsx(eo,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),d.jsx(eo,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),d.jsx("ambientLight",{intensity:.5,color:"#002244"}),d.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},xl=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,yl=`
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
`,wl=({startZ:s=10,endZ:r=-500,visible:c=!0})=>{const f=w.useRef(),t=w.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);ve(o=>{f.current&&c&&(f.current.uniforms.uTime.value=o.clock.elapsedTime,f.current.uniforms.uOpacity.value=Ne.lerp(f.current.uniforms.uOpacity.value,c?1:0,.05))});const e=w.useMemo(()=>{const o=[],n=s-r;for(let i=0;i<=100;i++){const l=s-i/100*n;o.push(new Te(Math.sin(i*.1)*2,Math.cos(i*.05)*2,l))}return new Ea(o)},[s,r]);return d.jsxs("mesh",{visible:c,children:[d.jsx("tubeGeometry",{args:[e,200,15,32,!1]}),d.jsx("shaderMaterial",{ref:f,vertexShader:xl,fragmentShader:yl,uniforms:t,side:Oe,transparent:!0,blending:Ie})]})},bl=`
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
`,Ml=`
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
`,Sl=({position:s,rotation:r=[0,0,0],length:c=4e3,visible:f=!0})=>{const t=w.useRef(),e=w.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:c}}),[c]);return ve(o=>{t.current&&(t.current.uniforms.uTime.value=o.clock.elapsedTime,t.current.uniforms.uOpacity.value=f?1:0)}),d.jsx("group",{position:s,rotation:r,visible:f,children:d.jsxs("mesh",{children:[d.jsx("cylinderGeometry",{args:[60,400,c+200,32,64,!0]}),d.jsx("shaderMaterial",{ref:t,vertexShader:bl,fragmentShader:Ml,uniforms:e,transparent:!0,side:Oe,wireframe:!1})]})})},$r=({position:s,rotation:r,length:c=4e3,radius:f=200,color:t="#ffffff",speed:e=20,visible:o=!0})=>{const a=w.useRef(),n=w.useMemo(()=>({uTime:{value:0},uColor:{value:new Ve(t)}}),[t]);return ve(i=>{a.current&&(a.current.uniforms.uTime.value=i.clock.elapsedTime)}),d.jsxs("mesh",{visible:o,position:s,rotation:r,children:[d.jsx("cylinderGeometry",{args:[f,f,c,32,1,!0]}),d.jsx("shaderMaterial",{ref:a,transparent:!0,side:Oe,blending:Ie,depthWrite:!1,uniforms:n,vertexShader:`
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
        `})]})},_l=()=>{const s=[],r=(c,f,t)=>{s.push({x:c,y:f,z:0,rot:[Math.PI/2,0,0],color:t,bodyHeight:40+Math.random()*40})};for(let c=Math.PI*.25;c<Math.PI*1.75;c+=.2)r(-100+Math.cos(c)*80,Math.sin(c)*80,"#00ff00");for(let c=0;c<Math.PI*2;c+=.2)r(100+Math.cos(c)*80,Math.sin(c)*80,"#ff0044");return r(140,-40,"#ff0044"),r(160,-60,"#ff0044"),r(180,-80,"#ff0044"),s},Tl=({position:s,rotation:r=[0,0,0],length:c=6e3,radius:f=250,visible:t})=>{const e=w.useRef(),o=w.useRef(),a=w.useRef(),n=co(lt,"/assets/images/contango_logo.png"),i=w.useMemo(()=>{const u=[],h=Math.floor(c/5);for(let p=0;p<h;p++){const m=-(p/h)*c,g=p*.1,_=Math.cos(g)*f,k=Math.sin(g)*f,M=Math.cos(g+Math.PI)*f,S=Math.sin(g+Math.PI)*f,P=Math.random()>.5?"#00ff00":"#ff0044",b=20+Math.random()*60,T=[0,0,g+Math.PI/2],L=[0,0,g+Math.PI+Math.PI/2];u.push({x:_,y:k,z:m,rot:T,color:P,bodyHeight:b}),u.push({x:M,y:S,z:m,rot:L,color:P,bodyHeight:b})}return _l().forEach(p=>{u.push({x:p.x,y:p.y,z:-c-500,rot:p.rot,color:p.color,bodyHeight:p.bodyHeight})}),u},[c,f]),l=i.length;return w.useEffect(()=>{if(!o.current||!a.current)return;const u=new Tr,h=new Ve;for(let v=0;v<l;v++){const p=i[v];u.position.set(p.x,p.y,p.z),u.rotation.set(p.rot[0],p.rot[1],p.rot[2]),u.scale.set(1,p.bodyHeight+40,1),u.updateMatrix(),o.current.setMatrixAt(v,u.matrix),h.set(p.color),o.current.setColorAt(v,h),u.scale.set(1,p.bodyHeight,1),u.updateMatrix(),a.current.setMatrixAt(v,u.matrix),a.current.setColorAt(v,h)}o.current.instanceMatrix.needsUpdate=!0,o.current.instanceColor&&(o.current.instanceColor.needsUpdate=!0),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0)},[i,l]),ve(u=>{e.current&&t&&(e.current.rotation.z=u.clock.elapsedTime*.5)}),d.jsxs("group",{position:s,rotation:r,visible:t,children:[d.jsxs("group",{ref:e,children:[d.jsxs("instancedMesh",{ref:o,args:[null,null,l],children:[d.jsx("cylinderGeometry",{args:[2,2,1,8]}),d.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),d.jsxs("instancedMesh",{ref:a,args:[null,null,l],children:[d.jsx("boxGeometry",{args:[10,1,10]}),d.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),d.jsxs("mesh",{position:[0,0,-c-500],children:[d.jsx("planeGeometry",{args:[200,200]}),d.jsx("meshBasicMaterial",{map:n,transparent:!0})]}),d.jsxs("mesh",{position:[0,0,-c/2],rotation:[Math.PI/2,0,0],children:[d.jsx("cylinderGeometry",{args:[f*.8,f*.8,c,32,1,!0]}),d.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:Oe})]})]})},kl=({position:s,rotation:r,length:c=8e3,visible:f=!0})=>{const t=w.useRef(),e=w.useRef();ve(a=>{if(!f||!t.current)return;const n=a.clock.getElapsedTime();t.current.map.offset.y=-n*3,e.current&&(e.current.rotation.y=n*2)});const o=Ln.useMemo(()=>{const a=document.createElement("canvas");a.width=512,a.height=512;const n=a.getContext("2d"),i=n.createLinearGradient(0,0,0,512);i.addColorStop(0,"#001a33"),i.addColorStop(.5,"#00ccff"),i.addColorStop(1,"#001a33"),n.fillStyle=i,n.fillRect(0,0,512,512),n.fillStyle="#ffffff";for(let u=0;u<200;u++)n.globalAlpha=Math.random()*.5,n.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const l=new Da(a);return l.wrapS=tr,l.wrapT=tr,l.repeat.set(4,20),l},[]);return d.jsxs("group",{position:s,rotation:r,visible:f,children:[d.jsxs("mesh",{children:[d.jsx("cylinderGeometry",{args:[150,150,c,32,1,!0]}),d.jsx("meshStandardMaterial",{ref:t,map:o,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:Oe,transparent:!0,opacity:.9})]}),d.jsxs("mesh",{ref:e,children:[d.jsx("cylinderGeometry",{args:[140,140,c,16,40,!0]}),d.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:Oe})]})]})},ot=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.53,x:0,y:-4e3,z:-11550,rx:0,ry:0},{p:.58,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.61,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.63,x:0,y:-4e3,z:-14550,rx:0,ry:0},{p:.66,x:0,y:-4e3,z:-15550,rx:0,ry:0},{p:.69,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],Cl=s=>{if(s<=ot[0].p)return ot[0];if(s>=ot[ot.length-1].p)return ot[ot.length-1];for(let r=0;r<ot.length-1;r++){const c=ot[r],f=ot[r+1];if(s>=c.p&&s<=f.p){const t=(s-c.p)/(f.p-c.p);return{x:Ne.lerp(c.x,f.x,t),y:Ne.lerp(c.y,f.y,t),z:Ne.lerp(c.z,f.z,t),rx:Ne.lerp(c.rx,f.rx,t),ry:Ne.lerp(c.ry,f.ry,t)}}}return ot[0]},Ul=()=>{const s=Ze(),r=w.useRef();return ve(c=>{let f=s.offset;window.icebreakerCaveLocked?f=.22:window.icebreakerThawLocked?f=.27:window.icebreakerTextLocked?f=.29:window.mindwaveLocked?f=.08:window.interstellarLocked&&(f=.42);const t=Cl(f);c.camera.position.x=Ne.lerp(c.camera.position.x,t.x,.2),c.camera.position.y=Ne.lerp(c.camera.position.y,t.y,.2),c.camera.position.z=Ne.lerp(c.camera.position.z,t.z,.2);const e=new st().setFromEuler(new Ut(t.rx,t.ry,0));c.camera.quaternion.slerp(e,.15);const o=s.delta*10;c.camera.rotateZ(Ne.lerp(0,o*2,.2)),r.current&&r.current.position.copy(c.camera.position)}),d.jsxs("group",{children:[d.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),d.jsx("pointLight",{ref:r,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),d.jsx("ambientLight",{intensity:.2})]})},Fl=()=>{const s=Ze(),[r,c]=w.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_auto:!1,auto:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),f=w.useRef(r);return ve(()=>{const t=s.offset,e={intro:t<.08,mindwave:t>.04&&t<.18,wormhole_ice:t>.1&&t<.25,icebreaker:t>.18&&t<.35,wormhole_sound:t>.28&&t<.42,interstellar:t>.28&&t<.48,w_legal:t>.43&&t<.54,legal:t>.48&&t<.58,w_auto:t>.53&&t<.65,auto:t>.58&&t<.68,w_clove:t>.61&&t<.72,clove:t>.66&&t<.76,w_fantasy:t>.71&&t<.83,fantasy:t>.73&&t<.88,w_contango:t>.84&&t<.91,contango:t>.89&&t<.96,sentaient:t>.94};let o=!1;for(const a in e)f.current[a]!==e[a]&&(o=!0);o&&(f.current=e,c(e))}),d.jsxs("group",{children:[d.jsx(wl,{startZ:10,endZ:-250,visible:r.intro}),d.jsx(Gs,{position:[0,0,-1350],visible:r.mindwave}),d.jsx(Sl,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:r.wormhole_ice}),d.jsx(Es,{position:[0,-4e3,-2550],visible:r.icebreaker}),d.jsx($s,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:r.interstellar}),d.jsx($r,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:r.w_legal}),d.jsx(Vs,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:r.legal}),d.jsx($r,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffcc",visible:r.w_auto}),d.jsx(sl,{position:[0,-4e3,-14550],rotation:[0,0,0],visible:r.auto}),d.jsx($r,{position:[0,-4e3,-15050],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffff",speed:40,visible:r.w_clove}),d.jsx(fl,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:r.clove}),d.jsx(kl,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:r.w_fantasy}),d.jsx(dl,{position:[0,-11700,-17500],rotation:[0,0,0],visible:r.fantasy}),d.jsx(Tl,{position:[0,-11750,-20550],length:4e3,visible:r.w_contango}),d.jsx(ml,{position:[0,-11750,-24800],rotation:[0,0,0],visible:r.contango}),d.jsx(gl,{position:[0,-11750,-29350],rotation:[0,0,0],visible:r.sentaient})]})},Rl=()=>{const s=Ze(),r=w.useRef(),c=w.useRef();return w.useRef(),w.useRef(),w.useRef(),ve(()=>{const f=s.offset;if(r.current){const t=f<.03?1:0;r.current.style.opacity=t}if(c.current){const t=f>.2&&f<.28?1:0;c.current.style.opacity=t}}),d.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[d.jsxs("div",{ref:r,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[d.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),d.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),d.jsxs("div",{ref:c,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[d.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[d.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:d.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),d.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),d.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),d.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},jl=()=>d.jsxs(La,{gl:{antialias:!1,alpha:!0},children:[d.jsxs(mi,{pages:10,damping:.2,distance:1.2,children:[d.jsxs(Ln.Suspense,{fallback:null,children:[d.jsx(Ul,{}),d.jsx(Fl,{})]}),d.jsx(eo,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),d.jsx(yi,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:d.jsx(Rl,{})})]}),d.jsxs(Ia,{disableNormalPass:!0,children:[d.jsx(za,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),d.jsx(Ga,{opacity:.05}),d.jsx(Oa,{eskil:!1,offset:.1,darkness:1.1})]})]}),zl=()=>d.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[d.jsxs(ia,{children:[d.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),d.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),d.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),d.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:d.jsx(sa,{})}),d.jsx("div",{className:"absolute inset-0 z-0",children:d.jsx(jl,{})})]});export{zl as default};
//# sourceMappingURL=index-Di-xVr_J.js.map
