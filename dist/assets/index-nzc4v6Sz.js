import{r as m,g as _a,_ as ht,j as u,R as An,H as oi}from"./vendor-Dm8L58fF.js";import{H as ai}from"./Header-qOOk--v5.js";import{aa as Nt,a8 as me,a1 as pe,D as Ze,a0 as pt,P as Ta,w as Ua,Q as _t,r as yt,W as ka,a2 as rt,f as Ue,i as En,a5 as lo,R as ii,l as Ca,F as xn,m as bn,n as Gt,a4 as si,b as Br,U as Pn,J as ja,$ as wn,_ as co,s as pr,L as li,p as Ie,v as ci,u as fi,y as ui,H as di,k as hi,t as pi,B as De,X as mi,o as fo,q as vi,x as Wr,c as gi,I as yi,a7 as xi,h as uo,a6 as bi,G as wi,M as Si,A as Ge,ab as Mi,Y as et,S as st,z as Et,O as Bt,a9 as Vt,g as _i,V as Ti,K as Ui,j as ki,d as Rn,e as Aa,Z as Ci,T as Gr,C as ji,E as Ai,a as Ei,N as Pi,a3 as Ri}from"./Vignette-NtaS5ERF.js";import"./main-DTpZzB_G.js";import"./preload-helper-BxaVoaJg.js";const mr=new pe,Fn=new pe,Fi=new pe,ho=new pt;function Li(s,r,l){const c=mr.setFromMatrixPosition(s.matrixWorld);c.project(r);const t=l.width/2,e=l.height/2;return[c.x*t+t,-(c.y*e)+e]}function Ii(s,r){const l=mr.setFromMatrixPosition(s.matrixWorld),c=Fn.setFromMatrixPosition(r.matrixWorld),t=l.sub(c),e=r.getWorldDirection(Fi);return t.angleTo(e)>Math.PI/2}function zi(s,r,l,c){const t=mr.setFromMatrixPosition(s.matrixWorld),e=t.clone();e.project(r),ho.set(e.x,e.y),l.setFromCamera(ho,r);const n=l.intersectObjects(c,!0);if(n.length){const a=n[0].distance;return t.distanceTo(l.ray.origin)<a}return!0}function Di(s,r){if(r instanceof Ua)return r.zoom;if(r instanceof Ta){const l=mr.setFromMatrixPosition(s.matrixWorld),c=Fn.setFromMatrixPosition(r.matrixWorld),t=r.fov*Math.PI/180,e=l.distanceTo(c);return 1/(2*Math.tan(t/2)*e)}else return 1}function Gi(s,r,l){if(r instanceof Ta||r instanceof Ua){const c=mr.setFromMatrixPosition(s.matrixWorld),t=Fn.setFromMatrixPosition(r.matrixWorld),e=c.distanceTo(t),n=(l[1]-l[0])/(r.far-r.near),a=l[1]-n*r.far;return Math.round(n*e+a)}}const Sn=s=>Math.abs(s)<1e-10?0:s;function Ea(s,r,l=""){let c="matrix3d(";for(let t=0;t!==16;t++)c+=Sn(r[t]*s.elements[t])+(t!==15?",":")");return l+c}const Oi=(s=>r=>Ea(r,s))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),Bi=(s=>(r,l)=>Ea(r,s(l),"translate(-50%,-50%)"))(s=>[1/s,1/s,1/s,1,-1/s,-1/s,-1/s,-1,1/s,1/s,1/s,1,1,1,1,1]);function Wi(s){return s&&typeof s=="object"&&"current"in s}const Ni=m.forwardRef(({children:s,eps:r=.001,style:l,className:c,prepend:t,center:e,fullscreen:n,portal:a,distanceFactor:o,sprite:i=!1,transform:f=!1,occlude:d,onOcclude:h,castShadow:p,receiveShadow:g,material:x,geometry:y,zIndexRange:w=[16777271,0],calculatePosition:_=Li,as:v="div",wrapperClass:S,pointerEvents:U="auto",...A},k)=>{const{gl:E,camera:j,scene:F,size:V,raycaster:M,events:L,viewport:R}=Nt(),[Y]=m.useState(()=>document.createElement(v)),H=m.useRef(),q=m.useRef(null),ie=m.useRef(0),N=m.useRef([0,0]),z=m.useRef(null),b=m.useRef(null),T=(a==null?void 0:a.current)||L.connected||E.domElement.parentNode,C=m.useRef(null),I=m.useRef(!1),P=m.useMemo(()=>d&&d!=="blending"||Array.isArray(d)&&d.length&&Wi(d[0]),[d]);m.useLayoutEffect(()=>{const Q=E.domElement;d&&d==="blending"?(Q.style.zIndex=`${Math.floor(w[0]/2)}`,Q.style.position="absolute",Q.style.pointerEvents="none"):(Q.style.zIndex=null,Q.style.position=null,Q.style.pointerEvents=null)},[d]),m.useLayoutEffect(()=>{if(q.current){const Q=H.current=_a(Y);if(F.updateMatrixWorld(),f)Y.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const G=_(q.current,j,V);Y.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${G[0]}px,${G[1]}px,0);transform-origin:0 0;`}return T&&(t?T.prepend(Y):T.appendChild(Y)),()=>{T&&T.removeChild(Y),Q.unmount()}}},[T,f]),m.useLayoutEffect(()=>{S&&(Y.className=S)},[S]);const X=m.useMemo(()=>f?{position:"absolute",top:0,left:0,width:V.width,height:V.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:e?"translate3d(-50%,-50%,0)":"none",...n&&{top:-V.height/2,left:-V.width/2,width:V.width,height:V.height},...l},[l,e,n,V,f]),D=m.useMemo(()=>({position:"absolute",pointerEvents:U}),[U]);m.useLayoutEffect(()=>{if(I.current=!1,f){var Q;(Q=H.current)==null||Q.render(m.createElement("div",{ref:z,style:X},m.createElement("div",{ref:b,style:D},m.createElement("div",{ref:k,className:c,style:l,children:s}))))}else{var G;(G=H.current)==null||G.render(m.createElement("div",{ref:k,style:X,className:c,children:s}))}});const O=m.useRef(!0);me(Q=>{if(q.current){j.updateMatrixWorld(),q.current.updateWorldMatrix(!0,!1);const G=f?N.current:_(q.current,j,V);if(f||Math.abs(ie.current-j.zoom)>r||Math.abs(N.current[0]-G[0])>r||Math.abs(N.current[1]-G[1])>r){const W=Ii(q.current,j);let de=!1;P&&(Array.isArray(d)?de=d.map(oe=>oe.current):d!=="blending"&&(de=[F]));const fe=O.current;if(de){const oe=zi(q.current,j,M,de);O.current=oe&&!W}else O.current=!W;fe!==O.current&&(h?h(!O.current):Y.style.display=O.current?"block":"none");const $=Math.floor(w[0]/2),ae=d?P?[w[0],$]:[$-1,0]:w;if(Y.style.zIndex=`${Gi(q.current,j,ae)}`,f){const[oe,Z]=[V.width/2,V.height/2],ne=j.projectionMatrix.elements[5]*Z,{isOrthographicCamera:re,top:B,left:ge,bottom:ee,right:se}=j,J=Oi(j.matrixWorldInverse),Me=re?`scale(${ne})translate(${Sn(-(se+ge)/2)}px,${Sn((B+ee)/2)}px)`:`translateZ(${ne}px)`;let te=q.current.matrixWorld;i&&(te=j.matrixWorldInverse.clone().transpose().copyPosition(te).scale(q.current.scale),te.elements[3]=te.elements[7]=te.elements[11]=0,te.elements[15]=1),Y.style.width=V.width+"px",Y.style.height=V.height+"px",Y.style.perspective=re?"":`${ne}px`,z.current&&b.current&&(z.current.style.transform=`${Me}${J}translate(${oe}px,${Z}px)`,b.current.style.transform=Bi(te,1/((o||10)/400)))}else{const oe=o===void 0?1:Di(q.current,j)*o;Y.style.transform=`translate3d(${G[0]}px,${G[1]}px,0) scale(${oe})`}N.current=G,ie.current=j.zoom}}if(!P&&C.current&&!I.current)if(f){if(z.current){const G=z.current.children[0];if(G!=null&&G.clientWidth&&G!=null&&G.clientHeight){const{isOrthographicCamera:W}=j;if(W||y)A.scale&&(Array.isArray(A.scale)?A.scale instanceof pe?C.current.scale.copy(A.scale.clone().divideScalar(1)):C.current.scale.set(1/A.scale[0],1/A.scale[1],1/A.scale[2]):C.current.scale.setScalar(1/A.scale));else{const de=(o||10)/400,fe=G.clientWidth*de,$=G.clientHeight*de;C.current.scale.set(fe,$,1)}I.current=!0}}}else{const G=Y.children[0];if(G!=null&&G.clientWidth&&G!=null&&G.clientHeight){const W=1/R.factor,de=G.clientWidth*W,fe=G.clientHeight*W;C.current.scale.set(de,fe,1),I.current=!0}C.current.lookAt(Q.camera.position)}});const K=m.useMemo(()=>({vertexShader:f?void 0:`
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
      `}),[f]);return m.createElement("group",ht({},A,{ref:q}),d&&!P&&m.createElement("mesh",{castShadow:p,receiveShadow:g,ref:C},y||m.createElement("planeGeometry",null),x||m.createElement("shaderMaterial",{side:Ze,vertexShader:K.vertexShader,fragmentShader:K.fragmentShader})))});function ur(s,r,l){return r in s?Object.defineProperty(s,r,{value:l,enumerable:!0,configurable:!0,writable:!0}):s[r]=l,s}function Mn(s,r){(r==null||r>s.length)&&(r=s.length);for(var l=0,c=new Array(r);l<r;l++)c[l]=s[l];return c}function Vi(s,r){if(s){if(typeof s=="string")return Mn(s,r);var l=Object.prototype.toString.call(s).slice(8,-1);if(l==="Object"&&s.constructor&&(l=s.constructor.name),l==="Map"||l==="Set")return Array.from(s);if(l==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l))return Mn(s,r)}}function Hi(s){if(Array.isArray(s))return Mn(s)}function Xi(s){if(typeof Symbol<"u"&&s[Symbol.iterator]!=null||s["@@iterator"]!=null)return Array.from(s)}function Yi(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Zi(s){return Hi(s)||Xi(s)||Vi(s)||Yi()}new pt;new pt;function qi(s,r,l){return Math.max(r,Math.min(l,s))}function Qi(s,r){return qi(s-Math.floor(s/r)*r,0,r)}function Ki(s,r){var l=Qi(r-s,Math.PI*2);return l>Math.PI&&(l-=Math.PI*2),l}function Pa(s,r){if(!(s instanceof r))throw new TypeError("Cannot call a class as a function")}var tt=function s(r,l,c){var t=this;Pa(this,s),ur(this,"dot2",function(e,n){return t.x*e+t.y*n}),ur(this,"dot3",function(e,n,a){return t.x*e+t.y*n+t.z*a}),this.x=r,this.y=l,this.z=c},Ji=[new tt(1,1,0),new tt(-1,1,0),new tt(1,-1,0),new tt(-1,-1,0),new tt(1,0,1),new tt(-1,0,1),new tt(1,0,-1),new tt(-1,0,-1),new tt(0,1,1),new tt(0,-1,1),new tt(0,1,-1),new tt(0,-1,-1)],po=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],mo=new Array(512),vo=new Array(512),$i=function(r){r>0&&r<1&&(r*=65536),r=Math.floor(r),r<256&&(r|=r<<8);for(var l=0;l<256;l++){var c;l&1?c=po[l]^r&255:c=po[l]^r>>8&255,mo[l]=mo[l+256]=c,vo[l]=vo[l+256]=Ji[c%12]}};$i(0);function es(s){if(typeof s=="number")s=Math.abs(s);else if(typeof s=="string"){var r=s;s=0;for(var l=0;l<r.length;l++)s=(s+(l+1)*(r.charCodeAt(l)%96))%2147483647}return s===0&&(s=311),s}function go(s){var r=es(s);return function(){var l=r*48271%2147483647;return r=l,l/2147483647}}var ts=function s(r){var l=this;Pa(this,s),ur(this,"seed",0),ur(this,"init",function(c){l.seed=c,l.value=go(c)}),ur(this,"value",go(this.seed)),this.init(r)};new ts(Math.random());var rs=function(r){var l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return c/Math.atan(1/l)*Math.atan(Math.sin(2*Math.PI*r*t)/l)},Ra=function(r){return 1/(1+r+.48*r*r+.235*r*r*r)},ns=function(r){return r},os={in:function(r){return 1-Math.cos(r*Math.PI/2)},out:function(r){return Math.sin(r*Math.PI/2)},inOut:function(r){return-(Math.cos(Math.PI*r)-1)/2}},as={in:function(r){return r*r*r},out:function(r){return 1-Math.pow(1-r,3)},inOut:function(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}},is={in:function(r){return r*r*r*r*r},out:function(r){return 1-Math.pow(1-r,5)},inOut:function(r){return r<.5?16*r*r*r*r*r:1-Math.pow(-2*r+2,5)/2}},ss={in:function(r){return 1-Math.sqrt(1-Math.pow(r,2))},out:function(r){return Math.sqrt(1-Math.pow(r-1,2))},inOut:function(r){return r<.5?(1-Math.sqrt(1-Math.pow(2*r,2)))/2:(Math.sqrt(1-Math.pow(-2*r+2,2))+1)/2}},ls={in:function(r){return r*r*r*r},out:function(r){return 1- --r*r*r*r},inOut:function(r){return r<.5?8*r*r*r*r:1-8*--r*r*r*r}},cs={in:function(r){return r===0?0:Math.pow(2,10*r-10)},out:function(r){return r===1?1:1-Math.pow(2,-10*r)},inOut:function(r){return r===0?0:r===1?1:r<.5?Math.pow(2,20*r-10)/2:(2-Math.pow(2,-20*r+10))/2}};function ze(s,r,l){var c=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,t=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,e=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,n=arguments.length>6&&arguments[6]!==void 0?arguments[6]:Ra,a=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,o="velocity_"+r;if(s.__damp===void 0&&(s.__damp={}),s.__damp[o]===void 0&&(s.__damp[o]=0),Math.abs(s[r]-l)<=a)return s[r]=l,!1;c=Math.max(1e-4,c);var i=2/c,f=n(i*t),d=s[r]-l,h=l,p=e*c;d=Math.min(Math.max(d,-p),p),l=s[r]-d;var g=(s.__damp[o]+i*d)*t;s.__damp[o]=(s.__damp[o]-i*g)*f;var x=l+(d+g)*f;return h-s[r]>0==x>h&&(x=h,s.__damp[o]=(x-h)/t),s[r]=x,!0}var fs=function(r){return r&&r.isCamera},us=function(r){return r&&r.isLight},rr=new pe,yo=new _t,xo=new _t,nr=new yt,un=new pe;function ds(s,r,l,c,t,e,n){typeof r=="number"?rr.setScalar(r):Array.isArray(r)?rr.set(r[0],r[1],r[2]):rr.copy(r);var a=s.parent;s.updateWorldMatrix(!0,!1),un.setFromMatrixPosition(s.matrixWorld),fs(s)||us(s)?nr.lookAt(un,rr,s.up):nr.lookAt(rr,un,s.up),Or(s.quaternion,xo.setFromRotationMatrix(nr),l,c,t,e,n),a&&(nr.extractRotation(a.matrixWorld),yo.setFromRotationMatrix(nr),Or(s.quaternion,xo.copy(s.quaternion).premultiply(yo.invert()),l,c,t,e,n))}function Ot(s,r,l,c,t,e,n,a){return ze(s,r,s[r]+Ki(s[r],l),c,t,e,n,a)}var or=new pt,bo,wo;function hs(s,r,l,c,t,e,n){return typeof r=="number"?or.setScalar(r):Array.isArray(r)?or.set(r[0],r[1]):or.copy(r),bo=ze(s,"x",or.x,l,c,t,e,n),wo=ze(s,"y",or.y,l,c,t,e,n),bo||wo}var It=new pe,So,Mo,_o;function _n(s,r,l,c,t,e,n){return typeof r=="number"?It.setScalar(r):Array.isArray(r)?It.set(r[0],r[1],r[2]):It.copy(r),So=ze(s,"x",It.x,l,c,t,e,n),Mo=ze(s,"y",It.y,l,c,t,e,n),_o=ze(s,"z",It.z,l,c,t,e,n),So||Mo||_o}var kt=new rt,To,Uo,ko,Co;function ps(s,r,l,c,t,e,n){return typeof r=="number"?kt.setScalar(r):Array.isArray(r)?kt.set(r[0],r[1],r[2],r[3]):kt.copy(r),To=ze(s,"x",kt.x,l,c,t,e,n),Uo=ze(s,"y",kt.y,l,c,t,e,n),ko=ze(s,"z",kt.z,l,c,t,e,n),Co=ze(s,"w",kt.w,l,c,t,e,n),To||Uo||ko||Co}var ar=new En,jo,Ao,Eo;function ms(s,r,l,c,t,e,n){return Array.isArray(r)?ar.set(r[0],r[1],r[2],r[3]):ar.copy(r),jo=Ot(s,"x",ar.x,l,c,t,e,n),Ao=Ot(s,"y",ar.y,l,c,t,e,n),Eo=Ot(s,"z",ar.z,l,c,t,e,n),jo||Ao||Eo}var zt=new Ue,Po,Ro,Fo;function vs(s,r,l,c,t,e,n){return r instanceof Ue?zt.copy(r):Array.isArray(r)?zt.setRGB(r[0],r[1],r[2]):zt.set(r),Po=ze(s,"r",zt.r,l,c,t,e,n),Ro=ze(s,"g",zt.g,l,c,t,e,n),Fo=ze(s,"b",zt.b,l,c,t,e,n),Po||Ro||Fo}var it=new _t,gt=new rt,Lo=new rt,ir=new rt,Io,zo,Do,Go;function Or(s,r,l,c,t,e,n){var a=s;Array.isArray(r)?it.set(r[0],r[1],r[2],r[3]):it.copy(r);var o=s.dot(it)>0?1:-1;return it.x*=o,it.y*=o,it.z*=o,it.w*=o,Io=ze(s,"x",it.x,l,c,t,e,n),zo=ze(s,"y",it.y,l,c,t,e,n),Do=ze(s,"z",it.z,l,c,t,e,n),Go=ze(s,"w",it.w,l,c,t,e,n),gt.set(s.x,s.y,s.z,s.w).normalize(),Lo.set(a.__damp.velocity_x,a.__damp.velocity_y,a.__damp.velocity_z,a.__damp.velocity_w),ir.copy(gt).multiplyScalar(Lo.dot(gt)/gt.dot(gt)),a.__damp.velocity_x-=ir.x,a.__damp.velocity_y-=ir.y,a.__damp.velocity_z-=ir.z,a.__damp.velocity_w-=ir.w,s.set(gt.x,gt.y,gt.z,gt.w),Io||zo||Do||Go}var sr=new ka,Oo,Bo,Wo;function gs(s,r,l,c,t,e,n){return Array.isArray(r)?sr.set(r[0],r[1],r[2]):sr.copy(r),Oo=ze(s,"radius",sr.radius,l,c,t,e,n),Bo=Ot(s,"phi",sr.phi,l,c,t,e,n),Wo=Ot(s,"theta",sr.theta,l,c,t,e,n),Oo||Bo||Wo}var jr=new yt,No=new pe,Vo=new _t,Ho=new pe,Xo,Yo,Zo;function ys(s,r,l,c,t,e,n){var a=s;return a.__damp===void 0&&(a.__damp={position:new pe,rotation:new _t,scale:new pe},s.decompose(a.__damp.position,a.__damp.rotation,a.__damp.scale)),Array.isArray(r)?jr.set.apply(jr,Zi(r)):jr.copy(r),jr.decompose(No,Vo,Ho),Xo=_n(a.__damp.position,No,l,c,t,e,n),Yo=Or(a.__damp.rotation,Vo,l,c,t,e,n),Zo=_n(a.__damp.scale,Ho,l,c,t,e,n),s.compose(a.__damp.position,a.__damp.rotation,a.__damp.scale),Xo||Yo||Zo}var qo=Object.freeze({__proto__:null,rsqw:rs,exp:Ra,linear:ns,sine:os,cubic:as,quint:is,circ:ss,quart:ls,expo:cs,damp:ze,dampLookAt:ds,dampAngle:Ot,damp2:hs,damp3:_n,damp4:ps,dampE:ms,dampC:vs,dampQ:Or,dampS:gs,dampM:ys});const Ln=m.createContext(null);function Je(){return m.useContext(Ln)}function xs({eps:s=1e-5,enabled:r=!0,infinite:l,horizontal:c,pages:t=1,distance:e=1,damping:n=.25,maxSpeed:a=1/0,prepend:o=!1,style:i={},children:f}){const{get:d,setEvents:h,gl:p,size:g,invalidate:x,events:y}=Nt(),[w]=m.useState(()=>document.createElement("div")),[_]=m.useState(()=>document.createElement("div")),[v]=m.useState(()=>document.createElement("div")),S=p.domElement.parentNode,U=m.useRef(0),A=m.useMemo(()=>({el:w,eps:s,fill:_,fixed:v,horizontal:c,damping:n,offset:0,delta:0,scroll:U,pages:t,range(j,F,V=0){const M=j-V,L=M+F+V*2;return this.offset<M?0:this.offset>L?1:(this.offset-M)/(L-M)},curve(j,F,V=0){return Math.sin(this.range(j,F,V)*Math.PI)},visible(j,F,V=0){const M=j-V,L=M+F+V*2;return this.offset>=M&&this.offset<=L}}),[s,n,c,t]);m.useEffect(()=>{w.style.position="absolute",w.style.width="100%",w.style.height="100%",w.style[c?"overflowX":"overflowY"]="auto",w.style[c?"overflowY":"overflowX"]="hidden",w.style.top="0px",w.style.left="0px";for(const F in i)w.style[F]=i[F];v.style.position="sticky",v.style.top="0px",v.style.left="0px",v.style.width="100%",v.style.height="100%",v.style.overflow="hidden",w.appendChild(v),_.style.height=c?"100%":`${t*e*100}%`,_.style.width=c?`${t*e*100}%`:"100%",_.style.pointerEvents="none",w.appendChild(_),o?S.prepend(w):S.appendChild(w),w[c?"scrollLeft":"scrollTop"]=1;const E=y.connected||p.domElement;requestAnimationFrame(()=>y.connect==null?void 0:y.connect(w));const j=d().events.compute;return h({compute(F,V){const{left:M,top:L}=S.getBoundingClientRect(),R=F.clientX-M,Y=F.clientY-L;V.pointer.set(R/V.size.width*2-1,-(Y/V.size.height)*2+1),V.raycaster.setFromCamera(V.pointer,V.camera)}}),()=>{S.removeChild(w),h({compute:j}),y.connect==null||y.connect(E)}},[t,e,c,w,_,v,S]),m.useEffect(()=>{if(y.connected===w){const E=g[c?"width":"height"],j=w[c?"scrollWidth":"scrollHeight"],F=j-E;let V=0,M=!0,L=!0;const R=()=>{if(!(!r||L)&&(x(),V=w[c?"scrollLeft":"scrollTop"],U.current=V/F,l)){if(!M){if(V>=F){const H=1-A.offset;w[c?"scrollLeft":"scrollTop"]=1,U.current=A.offset=-H,M=!0}else if(V<=0){const H=1+A.offset;w[c?"scrollLeft":"scrollTop"]=j,U.current=A.offset=H,M=!0}}M&&setTimeout(()=>M=!1,40)}};w.addEventListener("scroll",R,{passive:!0}),requestAnimationFrame(()=>L=!1);const Y=H=>w.scrollLeft+=H.deltaY/2;return c&&w.addEventListener("wheel",Y,{passive:!0}),()=>{w.removeEventListener("scroll",R),c&&w.removeEventListener("wheel",Y)}}},[w,y,g,l,A,x,c,r]);let k=0;return me((E,j)=>{k=A.offset,qo.damp(A,"offset",U.current,n,j,a,void 0,s),qo.damp(A,"delta",Math.abs(k-A.offset),n,j,a,void 0,s),A.delta>s&&x()}),m.createElement(Ln.Provider,{value:A},f)}const bs=m.forwardRef(({children:s},r)=>{const l=m.useRef(null);m.useImperativeHandle(r,()=>l.current,[]);const c=Je(),{width:t,height:e}=Nt(n=>n.viewport);return me(()=>{l.current.position.x=c.horizontal?-t*(c.pages-1)*c.offset:0,l.current.position.y=c.horizontal?0:e*(c.pages-1)*c.offset}),m.createElement("group",{ref:l},s)}),ws=m.forwardRef(({children:s,style:r,...l},c)=>{const t=Je(),e=m.useRef(null);m.useImperativeHandle(c,()=>e.current,[]);const{width:n,height:a}=Nt(f=>f.size),o=m.useContext(lo),i=m.useMemo(()=>_a(t.fixed),[t.fixed]);return me(()=>{t.delta>t.eps&&(e.current.style.transform=`translate3d(${t.horizontal?-n*(t.pages-1)*t.offset:0}px,${t.horizontal?0:a*(t.pages-1)*-t.offset}px,0)`)}),i.render(m.createElement("div",ht({ref:e,style:{...r,position:"absolute",top:0,left:0,willChange:"transform"}},l),m.createElement(Ln.Provider,{value:t},m.createElement(lo.Provider,{value:o},s)))),null}),Ss=m.forwardRef(({html:s,...r},l)=>{const c=s?ws:bs;return m.createElement(c,ht({ref:l},r))}),Fa=parseInt(ii.replace(/\D+/g,"")),La=Fa>=125?"uv1":"uv2",Qo=new Br,Ar=new pe;class In extends Ca{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const r=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],l=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],c=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(c),this.setAttribute("position",new xn(r,3)),this.setAttribute("uv",new xn(l,2))}applyMatrix4(r){const l=this.attributes.instanceStart,c=this.attributes.instanceEnd;return l!==void 0&&(l.applyMatrix4(r),c.applyMatrix4(r),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(r){let l;r instanceof Float32Array?l=r:Array.isArray(r)&&(l=new Float32Array(r));const c=new bn(l,6,1);return this.setAttribute("instanceStart",new Gt(c,3,0)),this.setAttribute("instanceEnd",new Gt(c,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(r,l=3){let c;r instanceof Float32Array?c=r:Array.isArray(r)&&(c=new Float32Array(r));const t=new bn(c,l*2,1);return this.setAttribute("instanceColorStart",new Gt(t,l,0)),this.setAttribute("instanceColorEnd",new Gt(t,l,l)),this}fromWireframeGeometry(r){return this.setPositions(r.attributes.position.array),this}fromEdgesGeometry(r){return this.setPositions(r.attributes.position.array),this}fromMesh(r){return this.fromWireframeGeometry(new si(r.geometry)),this}fromLineSegments(r){const l=r.geometry;return this.setPositions(l.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Br);const r=this.attributes.instanceStart,l=this.attributes.instanceEnd;r!==void 0&&l!==void 0&&(this.boundingBox.setFromBufferAttribute(r),Qo.setFromBufferAttribute(l),this.boundingBox.union(Qo))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pn),this.boundingBox===null&&this.computeBoundingBox();const r=this.attributes.instanceStart,l=this.attributes.instanceEnd;if(r!==void 0&&l!==void 0){const c=this.boundingSphere.center;this.boundingBox.getCenter(c);let t=0;for(let e=0,n=r.count;e<n;e++)Ar.fromBufferAttribute(r,e),t=Math.max(t,c.distanceToSquared(Ar)),Ar.fromBufferAttribute(l,e),t=Math.max(t,c.distanceToSquared(Ar));this.boundingSphere.radius=Math.sqrt(t),isNaN(this.boundingSphere.radius)}}toJSON(){}applyMatrix(r){return this.applyMatrix4(r)}}class Ia extends In{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(r){const l=r.length-3,c=new Float32Array(2*l);for(let t=0;t<l;t+=3)c[2*t]=r[t],c[2*t+1]=r[t+1],c[2*t+2]=r[t+2],c[2*t+3]=r[t+3],c[2*t+4]=r[t+4],c[2*t+5]=r[t+5];return super.setPositions(c),this}setColors(r,l=3){const c=r.length-l,t=new Float32Array(2*c);if(l===3)for(let e=0;e<c;e+=l)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5];else for(let e=0;e<c;e+=l)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5],t[2*e+6]=r[e+6],t[2*e+7]=r[e+7];return super.setColors(t,l),this}fromLine(r){const l=r.geometry;return this.setPositions(l.attributes.position.array),this}}class zn extends ja{constructor(r){super({type:"LineMaterial",uniforms:wn.clone(wn.merge([co.common,co.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new pt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${Fa>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(l){this.uniforms.diffuse.value=l}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(l){l===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(l){this.uniforms.linewidth.value=l}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(l){!!l!="USE_DASH"in this.defines&&(this.needsUpdate=!0),l===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(l){this.uniforms.dashScale.value=l}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(l){this.uniforms.dashSize.value=l}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(l){this.uniforms.dashOffset.value=l}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(l){this.uniforms.gapSize.value=l}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(l){this.uniforms.opacity.value=l}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(l){this.uniforms.resolution.value.copy(l)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(l){!!l!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),l===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(r)}}const dn=new rt,Ko=new pe,Jo=new pe,Oe=new rt,Be=new rt,ct=new rt,hn=new pe,pn=new yt,Ne=new li,$o=new pe,Er=new Br,Pr=new Pn,ft=new rt;let dt,jt;function ea(s,r,l){return ft.set(0,0,-r,1).applyMatrix4(s.projectionMatrix),ft.multiplyScalar(1/ft.w),ft.x=jt/l.width,ft.y=jt/l.height,ft.applyMatrix4(s.projectionMatrixInverse),ft.multiplyScalar(1/ft.w),Math.abs(Math.max(ft.x,ft.y))}function Ms(s,r){const l=s.matrixWorld,c=s.geometry,t=c.attributes.instanceStart,e=c.attributes.instanceEnd,n=Math.min(c.instanceCount,t.count);for(let a=0,o=n;a<o;a++){Ne.start.fromBufferAttribute(t,a),Ne.end.fromBufferAttribute(e,a),Ne.applyMatrix4(l);const i=new pe,f=new pe;dt.distanceSqToSegment(Ne.start,Ne.end,f,i),f.distanceTo(i)<jt*.5&&r.push({point:f,pointOnLine:i,distance:dt.origin.distanceTo(f),object:s,face:null,faceIndex:a,uv:null,[La]:null})}}function _s(s,r,l){const c=r.projectionMatrix,e=s.material.resolution,n=s.matrixWorld,a=s.geometry,o=a.attributes.instanceStart,i=a.attributes.instanceEnd,f=Math.min(a.instanceCount,o.count),d=-r.near;dt.at(1,ct),ct.w=1,ct.applyMatrix4(r.matrixWorldInverse),ct.applyMatrix4(c),ct.multiplyScalar(1/ct.w),ct.x*=e.x/2,ct.y*=e.y/2,ct.z=0,hn.copy(ct),pn.multiplyMatrices(r.matrixWorldInverse,n);for(let h=0,p=f;h<p;h++){if(Oe.fromBufferAttribute(o,h),Be.fromBufferAttribute(i,h),Oe.w=1,Be.w=1,Oe.applyMatrix4(pn),Be.applyMatrix4(pn),Oe.z>d&&Be.z>d)continue;if(Oe.z>d){const v=Oe.z-Be.z,S=(Oe.z-d)/v;Oe.lerp(Be,S)}else if(Be.z>d){const v=Be.z-Oe.z,S=(Be.z-d)/v;Be.lerp(Oe,S)}Oe.applyMatrix4(c),Be.applyMatrix4(c),Oe.multiplyScalar(1/Oe.w),Be.multiplyScalar(1/Be.w),Oe.x*=e.x/2,Oe.y*=e.y/2,Be.x*=e.x/2,Be.y*=e.y/2,Ne.start.copy(Oe),Ne.start.z=0,Ne.end.copy(Be),Ne.end.z=0;const x=Ne.closestPointToPointParameter(hn,!0);Ne.at(x,$o);const y=Ie.lerp(Oe.z,Be.z,x),w=y>=-1&&y<=1,_=hn.distanceTo($o)<jt*.5;if(w&&_){Ne.start.fromBufferAttribute(o,h),Ne.end.fromBufferAttribute(i,h),Ne.start.applyMatrix4(n),Ne.end.applyMatrix4(n);const v=new pe,S=new pe;dt.distanceSqToSegment(Ne.start,Ne.end,S,v),l.push({point:S,pointOnLine:v,distance:dt.origin.distanceTo(S),object:s,face:null,faceIndex:h,uv:null,[La]:null})}}}class za extends pr{constructor(r=new In,l=new zn({color:Math.random()*16777215})){super(r,l),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const r=this.geometry,l=r.attributes.instanceStart,c=r.attributes.instanceEnd,t=new Float32Array(2*l.count);for(let n=0,a=0,o=l.count;n<o;n++,a+=2)Ko.fromBufferAttribute(l,n),Jo.fromBufferAttribute(c,n),t[a]=a===0?0:t[a-1],t[a+1]=t[a]+Ko.distanceTo(Jo);const e=new bn(t,2,1);return r.setAttribute("instanceDistanceStart",new Gt(e,1,0)),r.setAttribute("instanceDistanceEnd",new Gt(e,1,1)),this}raycast(r,l){const c=this.material.worldUnits,t=r.camera,e=r.params.Line2!==void 0&&r.params.Line2.threshold||0;dt=r.ray;const n=this.matrixWorld,a=this.geometry,o=this.material;jt=o.linewidth+e,a.boundingSphere===null&&a.computeBoundingSphere(),Pr.copy(a.boundingSphere).applyMatrix4(n);let i;if(c)i=jt*.5;else{const d=Math.max(t.near,Pr.distanceToPoint(dt.origin));i=ea(t,d,o.resolution)}if(Pr.radius+=i,dt.intersectsSphere(Pr)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Er.copy(a.boundingBox).applyMatrix4(n);let f;if(c)f=jt*.5;else{const d=Math.max(t.near,Er.distanceToPoint(dt.origin));f=ea(t,d,o.resolution)}Er.expandByScalar(f),dt.intersectsBox(Er)!==!1&&(c?Ms(this,l):_s(this,t,l))}onBeforeRender(r){const l=this.material.uniforms;l&&l.resolution&&(r.getViewport(dn),this.material.uniforms.resolution.value.set(dn.z,dn.w))}}class Ts extends za{constructor(r=new Ia,l=new zn({color:Math.random()*16777215})){super(r,l),this.isLine2=!0,this.type="Line2"}}const Da=m.forwardRef(function({children:r,follow:l=!0,lockX:c=!1,lockY:t=!1,lockZ:e=!1,...n},a){const o=m.useRef(null),i=m.useRef(null),f=new _t;return me(({camera:d})=>{if(!l||!i.current)return;const h=i.current.rotation.clone();i.current.updateMatrix(),i.current.updateWorldMatrix(!1,!1),i.current.getWorldQuaternion(f),d.getWorldQuaternion(o.current.quaternion).premultiply(f.invert()),c&&(i.current.rotation.x=h.x),t&&(i.current.rotation.y=h.y),e&&(i.current.rotation.z=h.z)}),m.useImperativeHandle(a,()=>i.current,[]),m.createElement("group",ht({ref:i},n),m.createElement("group",{ref:o},r))}),Us=m.forwardRef(function({points:r,color:l=16777215,vertexColors:c,linewidth:t,lineWidth:e,segments:n,dashed:a,...o},i){var f,d;const h=Nt(w=>w.size),p=m.useMemo(()=>n?new za:new Ts,[n]),[g]=m.useState(()=>new zn),x=(c==null||(f=c[0])==null?void 0:f.length)===4?4:3,y=m.useMemo(()=>{const w=n?new In:new Ia,_=r.map(v=>{const S=Array.isArray(v);return v instanceof pe||v instanceof rt?[v.x,v.y,v.z]:v instanceof pt?[v.x,v.y,0]:S&&v.length===3?[v[0],v[1],v[2]]:S&&v.length===2?[v[0],v[1],0]:v});if(w.setPositions(_.flat()),c){l=16777215;const v=c.map(S=>S instanceof Ue?S.toArray():S);w.setColors(v.flat(),x)}return w},[r,n,c,x]);return m.useLayoutEffect(()=>{p.computeLineDistances()},[r,p]),m.useLayoutEffect(()=>{a?g.defines.USE_DASH="":delete g.defines.USE_DASH,g.needsUpdate=!0},[a,g]),m.useEffect(()=>()=>{y.dispose(),g.dispose()},[y]),m.createElement("primitive",ht({object:p,ref:i},o),m.createElement("primitive",{object:y,attach:"geometry"}),m.createElement("primitive",ht({object:g,attach:"material",color:l,vertexColors:!!c,resolution:[h.width,h.height],linewidth:(d=t??e)!==null&&d!==void 0?d:1,dashed:a,transparent:x===4},o)))});function ks(){var s=Object.create(null);function r(t,e){var n=t.id,a=t.name,o=t.dependencies;o===void 0&&(o=[]);var i=t.init;i===void 0&&(i=function(){});var f=t.getTransferables;if(f===void 0&&(f=null),!s[n])try{o=o.map(function(h){return h&&h.isWorkerModule&&(r(h,function(p){if(p instanceof Error)throw p}),h=s[h.id].value),h}),i=c("<"+a+">.init",i),f&&(f=c("<"+a+">.getTransferables",f));var d=null;typeof i=="function"&&(d=i.apply(void 0,o)),s[n]={id:n,value:d,getTransferables:f},e(d)}catch(h){h&&h.noLog,e(h)}}function l(t,e){var n,a=t.id,o=t.args;(!s[a]||typeof s[a].value!="function")&&e(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var i=(n=s[a]).value.apply(n,o);i&&typeof i.then=="function"?i.then(f,function(d){return e(d instanceof Error?d:new Error(""+d))}):f(i)}catch(d){e(d)}function f(d){try{var h=s[a].getTransferables&&s[a].getTransferables(d);(!h||!Array.isArray(h)||!h.length)&&(h=void 0),e(d,h)}catch(p){e(p)}}}function c(t,e){var n=void 0;self.troikaDefine=function(o){return n=o};var a=URL.createObjectURL(new Blob(["/** "+t.replace(/\*/g,"")+` **/

troikaDefine(
`+e+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch{}return URL.revokeObjectURL(a),delete self.troikaDefine,n}self.addEventListener("message",function(t){var e=t.data,n=e.messageId,a=e.action,o=e.data;try{a==="registerModule"&&r(o,function(i){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:{isCallable:typeof i=="function"}})}),a==="callModule"&&l(o,function(i,f){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:i},f||void 0)})}catch(i){postMessage({messageId:n,success:!1,error:i.stack})}})}function Cs(s){var r=function(){for(var l=[],c=arguments.length;c--;)l[c]=arguments[c];return r._getInitResult().then(function(t){if(typeof t=="function")return t.apply(void 0,l);throw new Error("Worker module function was called but `init` did not return a callable function")})};return r._getInitResult=function(){var l=s.dependencies,c=s.init;l=Array.isArray(l)?l.map(function(e){return e&&e._getInitResult?e._getInitResult():e}):[];var t=Promise.all(l).then(function(e){return c.apply(null,e)});return r._getInitResult=function(){return t},t},r}var Ga=function(){var s=!1;if(typeof window<"u"&&typeof window.document<"u")try{var r=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));r.terminate(),s=!0}catch{}return Ga=function(){return s},s},js=0,As=0,mn=!1,dr=Object.create(null),hr=Object.create(null),Tn=Object.create(null);function Ht(s){if((!s||typeof s.init!="function")&&!mn)throw new Error("requires `options.init` function");var r=s.dependencies,l=s.init,c=s.getTransferables,t=s.workerId;if(!Ga())return Cs(s);t==null&&(t="#default");var e="workerModule"+ ++js,n=s.name||e,a=null;r=r&&r.map(function(i){return typeof i=="function"&&!i.workerModuleData&&(mn=!0,i=Ht({workerId:t,name:"<"+n+"> function dependency: "+i.name,init:`function(){return (
`+zr(i)+`
)}`}),mn=!1),i&&i.workerModuleData&&(i=i.workerModuleData),i});function o(){for(var i=[],f=arguments.length;f--;)i[f]=arguments[f];if(!a){a=ta(t,"registerModule",o.workerModuleData);var d=function(){a=null,hr[t].delete(d)};(hr[t]||(hr[t]=new Set)).add(d)}return a.then(function(h){var p=h.isCallable;if(p)return ta(t,"callModule",{id:e,args:i});throw new Error("Worker module function was called but `init` did not return a callable function")})}return o.workerModuleData={isWorkerModule:!0,id:e,name:n,dependencies:r,init:zr(l),getTransferables:c&&zr(c)},o}function Es(s){hr[s]&&hr[s].forEach(function(r){r()}),dr[s]&&(dr[s].terminate(),delete dr[s])}function zr(s){var r=s.toString();return!/^function/.test(r)&&/^\w+\s*\(/.test(r)&&(r="function "+r),r}function Ps(s){var r=dr[s];if(!r){var l=zr(ks);r=dr[s]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+s.replace(/\*/g,"")+` **/

;(`+l+")()"],{type:"application/javascript"}))),r.onmessage=function(c){var t=c.data,e=t.messageId,n=Tn[e];if(!n)throw new Error("WorkerModule response with empty or unknown messageId");delete Tn[e],n(t)}}return r}function ta(s,r,l){return new Promise(function(c,t){var e=++As;Tn[e]=function(n){n.success?c(n.result):t(new Error("Error in worker "+r+" call: "+n.error))},Ps(s).postMessage({messageId:e,action:r,data:l})})}function Oa(){var s=function(r){function l(N,z,b,T,C,I,P,X){var D=1-P;X.x=D*D*N+2*D*P*b+P*P*C,X.y=D*D*z+2*D*P*T+P*P*I}function c(N,z,b,T,C,I,P,X,D,O){var K=1-D;O.x=K*K*K*N+3*K*K*D*b+3*K*D*D*C+D*D*D*P,O.y=K*K*K*z+3*K*K*D*T+3*K*D*D*I+D*D*D*X}function t(N,z){for(var b=/([MLQCZ])([^MLQCZ]*)/g,T,C,I,P,X;T=b.exec(N);){var D=T[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(O){return parseFloat(O)});switch(T[1]){case"M":P=C=D[0],X=I=D[1];break;case"L":(D[0]!==P||D[1]!==X)&&z("L",P,X,P=D[0],X=D[1]);break;case"Q":{z("Q",P,X,P=D[2],X=D[3],D[0],D[1]);break}case"C":{z("C",P,X,P=D[4],X=D[5],D[0],D[1],D[2],D[3]);break}case"Z":(P!==C||X!==I)&&z("L",P,X,C,I);break}}}function e(N,z,b){b===void 0&&(b=16);var T={x:0,y:0};t(N,function(C,I,P,X,D,O,K,Q,G){switch(C){case"L":z(I,P,X,D);break;case"Q":{for(var W=I,de=P,fe=1;fe<b;fe++)l(I,P,O,K,X,D,fe/(b-1),T),z(W,de,T.x,T.y),W=T.x,de=T.y;break}case"C":{for(var $=I,ae=P,oe=1;oe<b;oe++)c(I,P,O,K,Q,G,X,D,oe/(b-1),T),z($,ae,T.x,T.y),$=T.x,ae=T.y;break}}})}var n="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",o=new WeakMap,i={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function f(N,z){var b=N.getContext?N.getContext("webgl",i):N,T=o.get(b);if(!T){let K=function($){var ae=I[$];if(!ae&&(ae=I[$]=b.getExtension($),!ae))throw new Error($+" not supported");return ae},Q=function($,ae){var oe=b.createShader(ae);return b.shaderSource(oe,$),b.compileShader(oe),oe},G=function($,ae,oe,Z){if(!P[$]){var ne={},re={},B=b.createProgram();b.attachShader(B,Q(ae,b.VERTEX_SHADER)),b.attachShader(B,Q(oe,b.FRAGMENT_SHADER)),b.linkProgram(B),P[$]={program:B,transaction:function(ee){b.useProgram(B),ee({setUniform:function(J,Me){for(var te=[],le=arguments.length-2;le-- >0;)te[le]=arguments[le+2];var he=re[Me]||(re[Me]=b.getUniformLocation(B,Me));b["uniform"+J].apply(b,[he].concat(te))},setAttribute:function(J,Me,te,le,he){var ye=ne[J];ye||(ye=ne[J]={buf:b.createBuffer(),loc:b.getAttribLocation(B,J),data:null}),b.bindBuffer(b.ARRAY_BUFFER,ye.buf),b.vertexAttribPointer(ye.loc,Me,b.FLOAT,!1,0,0),b.enableVertexAttribArray(ye.loc),C?b.vertexAttribDivisor(ye.loc,le):K("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(ye.loc,le),he!==ye.data&&(b.bufferData(b.ARRAY_BUFFER,he,te),ye.data=he)}})}}}P[$].transaction(Z)},W=function($,ae){D++;try{b.activeTexture(b.TEXTURE0+D);var oe=X[$];oe||(oe=X[$]=b.createTexture(),b.bindTexture(b.TEXTURE_2D,oe),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST)),b.bindTexture(b.TEXTURE_2D,oe),ae(oe,D)}finally{D--}},de=function($,ae,oe){var Z=b.createFramebuffer();O.push(Z),b.bindFramebuffer(b.FRAMEBUFFER,Z),b.activeTexture(b.TEXTURE0+ae),b.bindTexture(b.TEXTURE_2D,$),b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,$,0);try{oe(Z)}finally{b.deleteFramebuffer(Z),b.bindFramebuffer(b.FRAMEBUFFER,O[--O.length-1]||null)}},fe=function(){I={},P={},X={},D=-1,O.length=0};var C=typeof WebGL2RenderingContext<"u"&&b instanceof WebGL2RenderingContext,I={},P={},X={},D=-1,O=[];b.canvas.addEventListener("webglcontextlost",function($){fe(),$.preventDefault()},!1),o.set(b,T={gl:b,isWebGL2:C,getExtension:K,withProgram:G,withTexture:W,withTextureFramebuffer:de,handleContextLoss:fe})}z(T)}function d(N,z,b,T,C,I,P,X){P===void 0&&(P=15),X===void 0&&(X=null),f(N,function(D){var O=D.gl,K=D.withProgram,Q=D.withTexture;Q("copy",function(G,W){O.texImage2D(O.TEXTURE_2D,0,O.RGBA,C,I,0,O.RGBA,O.UNSIGNED_BYTE,z),K("copy",n,a,function(de){var fe=de.setUniform,$=de.setAttribute;$("aUV",2,O.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),fe("1i","image",W),O.bindFramebuffer(O.FRAMEBUFFER,X||null),O.disable(O.BLEND),O.colorMask(P&8,P&4,P&2,P&1),O.viewport(b,T,C,I),O.scissor(b,T,C,I),O.drawArrays(O.TRIANGLES,0,3)})})})}function h(N,z,b){var T=N.width,C=N.height;f(N,function(I){var P=I.gl,X=new Uint8Array(T*C*4);P.readPixels(0,0,T,C,P.RGBA,P.UNSIGNED_BYTE,X),N.width=z,N.height=b,d(P,X,0,0,T,C)})}var p=Object.freeze({__proto__:null,withWebGLContext:f,renderImageData:d,resizeWebGLCanvasWithoutClearing:h});function g(N,z,b,T,C,I){I===void 0&&(I=1);var P=new Uint8Array(N*z),X=T[2]-T[0],D=T[3]-T[1],O=[];e(b,function($,ae,oe,Z){O.push({x1:$,y1:ae,x2:oe,y2:Z,minX:Math.min($,oe),minY:Math.min(ae,Z),maxX:Math.max($,oe),maxY:Math.max(ae,Z)})}),O.sort(function($,ae){return $.maxX-ae.maxX});for(var K=0;K<N;K++)for(var Q=0;Q<z;Q++){var G=de(T[0]+X*(K+.5)/N,T[1]+D*(Q+.5)/z),W=Math.pow(1-Math.abs(G)/C,I)/2;G<0&&(W=1-W),W=Math.max(0,Math.min(255,Math.round(W*255))),P[Q*N+K]=W}return P;function de($,ae){for(var oe=1/0,Z=1/0,ne=O.length;ne--;){var re=O[ne];if(re.maxX+Z<=$)break;if($+Z>re.minX&&ae-Z<re.maxY&&ae+Z>re.minY){var B=w($,ae,re.x1,re.y1,re.x2,re.y2);B<oe&&(oe=B,Z=Math.sqrt(oe))}}return fe($,ae)&&(Z=-Z),Z}function fe($,ae){for(var oe=0,Z=O.length;Z--;){var ne=O[Z];if(ne.maxX<=$)break;var re=ne.y1>ae!=ne.y2>ae&&$<(ne.x2-ne.x1)*(ae-ne.y1)/(ne.y2-ne.y1)+ne.x1;re&&(oe+=ne.y1<ne.y2?1:-1)}return oe!==0}}function x(N,z,b,T,C,I,P,X,D,O){I===void 0&&(I=1),X===void 0&&(X=0),D===void 0&&(D=0),O===void 0&&(O=0),y(N,z,b,T,C,I,P,null,X,D,O)}function y(N,z,b,T,C,I,P,X,D,O,K){I===void 0&&(I=1),D===void 0&&(D=0),O===void 0&&(O=0),K===void 0&&(K=0);for(var Q=g(N,z,b,T,C,I),G=new Uint8Array(Q.length*4),W=0;W<Q.length;W++)G[W*4+K]=Q[W];d(P,G,D,O,N,z,1<<3-K,X)}function w(N,z,b,T,C,I){var P=C-b,X=I-T,D=P*P+X*X,O=D?Math.max(0,Math.min(1,((N-b)*P+(z-T)*X)/D)):0,K=N-(b+O*P),Q=z-(T+O*X);return K*K+Q*Q}var _=Object.freeze({__proto__:null,generate:g,generateIntoCanvas:x,generateIntoFramebuffer:y}),v="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",S="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",U="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",A=new Float32Array([0,0,2,0,0,2]),k=null,E=!1,j={},F=new WeakMap;function V(N){if(!E&&!Y(N))throw new Error("WebGL generation not supported")}function M(N,z,b,T,C,I,P){if(I===void 0&&(I=1),P===void 0&&(P=null),!P&&(P=k,!P)){var X=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!X)throw new Error("OffscreenCanvas or DOM canvas not supported");P=k=X.getContext("webgl",{depth:!1})}V(P);var D=new Uint8Array(N*z*4);f(P,function(G){var W=G.gl,de=G.withTexture,fe=G.withTextureFramebuffer;de("readable",function($,ae){W.texImage2D(W.TEXTURE_2D,0,W.RGBA,N,z,0,W.RGBA,W.UNSIGNED_BYTE,null),fe($,ae,function(oe){R(N,z,b,T,C,I,W,oe,0,0,0),W.readPixels(0,0,N,z,W.RGBA,W.UNSIGNED_BYTE,D)})})});for(var O=new Uint8Array(N*z),K=0,Q=0;K<D.length;K+=4)O[Q++]=D[K];return O}function L(N,z,b,T,C,I,P,X,D,O){I===void 0&&(I=1),X===void 0&&(X=0),D===void 0&&(D=0),O===void 0&&(O=0),R(N,z,b,T,C,I,P,null,X,D,O)}function R(N,z,b,T,C,I,P,X,D,O,K){I===void 0&&(I=1),D===void 0&&(D=0),O===void 0&&(O=0),K===void 0&&(K=0),V(P);var Q=[];e(b,function(G,W,de,fe){Q.push(G,W,de,fe)}),Q=new Float32Array(Q),f(P,function(G){var W=G.gl,de=G.isWebGL2,fe=G.getExtension,$=G.withProgram,ae=G.withTexture,oe=G.withTextureFramebuffer,Z=G.handleContextLoss;if(ae("rawDistances",function(ne,re){(N!==ne._lastWidth||z!==ne._lastHeight)&&W.texImage2D(W.TEXTURE_2D,0,W.RGBA,ne._lastWidth=N,ne._lastHeight=z,0,W.RGBA,W.UNSIGNED_BYTE,null),$("main",v,S,function(B){var ge=B.setAttribute,ee=B.setUniform,se=!de&&fe("ANGLE_instanced_arrays"),J=!de&&fe("EXT_blend_minmax");ge("aUV",2,W.STATIC_DRAW,0,A),ge("aLineSegment",4,W.DYNAMIC_DRAW,1,Q),ee.apply(void 0,["4f","uGlyphBounds"].concat(T)),ee("1f","uMaxDistance",C),ee("1f","uExponent",I),oe(ne,re,function(Me){W.enable(W.BLEND),W.colorMask(!0,!0,!0,!0),W.viewport(0,0,N,z),W.scissor(0,0,N,z),W.blendFunc(W.ONE,W.ONE),W.blendEquationSeparate(W.FUNC_ADD,de?W.MAX:J.MAX_EXT),W.clear(W.COLOR_BUFFER_BIT),de?W.drawArraysInstanced(W.TRIANGLES,0,3,Q.length/4):se.drawArraysInstancedANGLE(W.TRIANGLES,0,3,Q.length/4)})}),$("post",n,U,function(B){B.setAttribute("aUV",2,W.STATIC_DRAW,0,A),B.setUniform("1i","tex",re),W.bindFramebuffer(W.FRAMEBUFFER,X),W.disable(W.BLEND),W.colorMask(K===0,K===1,K===2,K===3),W.viewport(D,O,N,z),W.scissor(D,O,N,z),W.drawArrays(W.TRIANGLES,0,3)})}),W.isContextLost())throw Z(),new Error("webgl context lost")})}function Y(N){var z=!N||N===k?j:N.canvas||N,b=F.get(z);if(b===void 0){E=!0;var T=null;try{var C=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],I=M(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,N);b=I&&C.length===I.length&&I.every(function(P,X){return P===C[X]}),b||(T="bad trial run results")}catch(P){b=!1,T=P.message}E=!1,F.set(z,b)}return b}var H=Object.freeze({__proto__:null,generate:M,generateIntoCanvas:L,generateIntoFramebuffer:R,isSupported:Y});function q(N,z,b,T,C,I){C===void 0&&(C=Math.max(T[2]-T[0],T[3]-T[1])/2),I===void 0&&(I=1);try{return M.apply(H,arguments)}catch{return g.apply(_,arguments)}}function ie(N,z,b,T,C,I,P,X,D,O){C===void 0&&(C=Math.max(T[2]-T[0],T[3]-T[1])/2),I===void 0&&(I=1),X===void 0&&(X=0),D===void 0&&(D=0),O===void 0&&(O=0);try{return L.apply(H,arguments)}catch{return x.apply(_,arguments)}}return r.forEachPathCommand=t,r.generate=q,r.generateIntoCanvas=ie,r.javascript=_,r.pathToLineSegments=e,r.webgl=H,r.webglUtils=p,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return s}function Rs(){var s=function(r){var l={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},c={},t={};c.L=1,t[1]="L",Object.keys(l).forEach(function(Z,ne){c[Z]=1<<ne+1,t[c[Z]]=Z}),Object.freeze(c);var e=c.LRI|c.RLI|c.FSI,n=c.L|c.R|c.AL,a=c.B|c.S|c.WS|c.ON|c.FSI|c.LRI|c.RLI|c.PDI,o=c.BN|c.RLE|c.LRE|c.RLO|c.LRO|c.PDF,i=c.S|c.WS|c.B|e|c.PDI|o,f=null;function d(){if(!f){f=new Map;var Z=function(re){if(l.hasOwnProperty(re)){var B=0;l[re].split(",").forEach(function(ge){var ee=ge.split("+"),se=ee[0],J=ee[1];se=parseInt(se,36),J=J?parseInt(J,36):0,f.set(B+=se,c[re]);for(var Me=0;Me<J;Me++)f.set(++B,c[re])})}};for(var ne in l)Z(ne)}}function h(Z){return d(),f.get(Z.codePointAt(0))||c.L}function p(Z){return t[h(Z)]}var g={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function x(Z,ne){var re=36,B=0,ge=new Map,ee=ne&&new Map,se;return Z.split(",").forEach(function J(Me){if(Me.indexOf("+")!==-1)for(var te=+Me;te--;)J(se);else{se=Me;var le=Me.split(">"),he=le[0],ye=le[1];he=String.fromCodePoint(B+=parseInt(he,re)),ye=String.fromCodePoint(B+=parseInt(ye,re)),ge.set(he,ye),ne&&ee.set(ye,he)}}),{map:ge,reverseMap:ee}}var y,w,_;function v(){if(!y){var Z=x(g.pairs,!0),ne=Z.map,re=Z.reverseMap;y=ne,w=re,_=x(g.canonical,!1).map}}function S(Z){return v(),y.get(Z)||null}function U(Z){return v(),w.get(Z)||null}function A(Z){return v(),_.get(Z)||null}var k=c.L,E=c.R,j=c.EN,F=c.ES,V=c.ET,M=c.AN,L=c.CS,R=c.B,Y=c.S,H=c.ON,q=c.BN,ie=c.NSM,N=c.AL,z=c.LRO,b=c.RLO,T=c.LRE,C=c.RLE,I=c.PDF,P=c.LRI,X=c.RLI,D=c.FSI,O=c.PDI;function K(Z,ne){for(var re=125,B=new Uint32Array(Z.length),ge=0;ge<Z.length;ge++)B[ge]=h(Z[ge]);var ee=new Map;function se(Qe,at){var Ke=B[Qe];B[Qe]=at,ee.set(Ke,ee.get(Ke)-1),Ke&a&&ee.set(a,ee.get(a)-1),ee.set(at,(ee.get(at)||0)+1),at&a&&ee.set(a,(ee.get(a)||0)+1)}for(var J=new Uint8Array(Z.length),Me=new Map,te=[],le=null,he=0;he<Z.length;he++)le||te.push(le={start:he,end:Z.length-1,level:ne==="rtl"?1:ne==="ltr"?0:io(he,!1)}),B[he]&R&&(le.end=he,le=null);for(var ye=C|T|b|z|e|O|I|R,ke=function(Qe){return Qe+(Qe&1?1:2)},Pe=function(Qe){return Qe+(Qe&1?2:1)},be=0;be<te.length;be++){le=te[be];var we=[{_level:le.level,_override:0,_isolate:0}],ue=void 0,Re=0,je=0,qe=0;ee.clear();for(var Ce=le.start;Ce<=le.end;Ce++){var ve=B[Ce];if(ue=we[we.length-1],ee.set(ve,(ee.get(ve)||0)+1),ve&a&&ee.set(a,(ee.get(a)||0)+1),ve&ye)if(ve&(C|T)){J[Ce]=ue._level;var _e=(ve===C?Pe:ke)(ue._level);_e<=re&&!Re&&!je?we.push({_level:_e,_override:0,_isolate:0}):Re||je++}else if(ve&(b|z)){J[Ce]=ue._level;var xt=(ve===b?Pe:ke)(ue._level);xt<=re&&!Re&&!je?we.push({_level:xt,_override:ve&b?E:k,_isolate:0}):Re||je++}else if(ve&e){ve&D&&(ve=io(Ce+1,!0)===1?X:P),J[Ce]=ue._level,ue._override&&se(Ce,ue._override);var Te=(ve===X?Pe:ke)(ue._level);Te<=re&&Re===0&&je===0?(qe++,we.push({_level:Te,_override:0,_isolate:1,_isolInitIndex:Ce})):Re++}else if(ve&O){if(Re>0)Re--;else if(qe>0){for(je=0;!we[we.length-1]._isolate;)we.pop();var Se=we[we.length-1]._isolInitIndex;Se!=null&&(Me.set(Se,Ce),Me.set(Ce,Se)),we.pop(),qe--}ue=we[we.length-1],J[Ce]=ue._level,ue._override&&se(Ce,ue._override)}else ve&I?(Re===0&&(je>0?je--:!ue._isolate&&we.length>1&&(we.pop(),ue=we[we.length-1])),J[Ce]=ue._level):ve&R&&(J[Ce]=le.level);else J[Ce]=ue._level,ue._override&&ve!==q&&se(Ce,ue._override)}for(var Fe=[],Ae=null,xe=le.start;xe<=le.end;xe++){var Ee=B[xe];if(!(Ee&o)){var Xe=J[xe],Ve=Ee&e,Le=Ee===O;Ae&&Xe===Ae._level?(Ae._end=xe,Ae._endsWithIsolInit=Ve):Fe.push(Ae={_start:xe,_end:xe,_level:Xe,_startsWithPDI:Le,_endsWithIsolInit:Ve})}}for(var nt=[],bt=0;bt<Fe.length;bt++){var mt=Fe[bt];if(!mt._startsWithPDI||mt._startsWithPDI&&!Me.has(mt._start)){for(var wt=[Ae=mt],Tt=void 0;Ae&&Ae._endsWithIsolInit&&(Tt=Me.get(Ae._end))!=null;)for(var vt=bt+1;vt<Fe.length;vt++)if(Fe[vt]._start===Tt){wt.push(Ae=Fe[vt]);break}for(var Ye=[],Ut=0;Ut<wt.length;Ut++)for(var On=wt[Ut],Vr=On._start;Vr<=On._end;Vr++)Ye.push(Vr);for(var Ja=J[Ye[0]],Bn=le.level,vr=Ye[0]-1;vr>=0;vr--)if(!(B[vr]&o)){Bn=J[vr];break}var Hr=Ye[Ye.length-1],$a=J[Hr],Wn=le.level;if(!(B[Hr]&e)){for(var gr=Hr+1;gr<=le.end;gr++)if(!(B[gr]&o)){Wn=J[gr];break}}nt.push({_seqIndices:Ye,_sosType:Math.max(Bn,Ja)%2?E:k,_eosType:Math.max(Wn,$a)%2?E:k})}}for(var Xr=0;Xr<nt.length;Xr++){var Yr=nt[Xr],ce=Yr._seqIndices,Xt=Yr._sosType,ei=Yr._eosType,Pt=J[ce[0]]&1?E:k;if(ee.get(ie))for(var yr=0;yr<ce.length;yr++){var Nn=ce[yr];if(B[Nn]&ie){for(var Zr=Xt,xr=yr-1;xr>=0;xr--)if(!(B[ce[xr]]&o)){Zr=B[ce[xr]];break}se(Nn,Zr&(e|O)?H:Zr)}}if(ee.get(j))for(var br=0;br<ce.length;br++){var Vn=ce[br];if(B[Vn]&j)for(var wr=br-1;wr>=-1;wr--){var Hn=wr===-1?Xt:B[ce[wr]];if(Hn&n){Hn===N&&se(Vn,M);break}}}if(ee.get(N))for(var qr=0;qr<ce.length;qr++){var Xn=ce[qr];B[Xn]&N&&se(Xn,E)}if(ee.get(F)||ee.get(L))for(var Yt=1;Yt<ce.length-1;Yt++){var Qr=ce[Yt];if(B[Qr]&(F|L)){for(var Rt=0,Kr=0,Jr=Yt-1;Jr>=0&&(Rt=B[ce[Jr]],!!(Rt&o));Jr--);for(var $r=Yt+1;$r<ce.length&&(Kr=B[ce[$r]],!!(Kr&o));$r++);Rt===Kr&&(B[Qr]===F?Rt===j:Rt&(j|M))&&se(Qr,Rt)}}if(ee.get(j))for(var lt=0;lt<ce.length;lt++){var ti=ce[lt];if(B[ti]&j){for(var Sr=lt-1;Sr>=0&&B[ce[Sr]]&(V|o);Sr--)se(ce[Sr],j);for(lt++;lt<ce.length&&B[ce[lt]]&(V|o|j);lt++)B[ce[lt]]!==j&&se(ce[lt],j)}}if(ee.get(V)||ee.get(F)||ee.get(L))for(var Zt=0;Zt<ce.length;Zt++){var Yn=ce[Zt];if(B[Yn]&(V|F|L)){se(Yn,H);for(var Mr=Zt-1;Mr>=0&&B[ce[Mr]]&o;Mr--)se(ce[Mr],H);for(var _r=Zt+1;_r<ce.length&&B[ce[_r]]&o;_r++)se(ce[_r],H)}}if(ee.get(j))for(var en=0,Zn=Xt;en<ce.length;en++){var qn=ce[en],tn=B[qn];tn&j?Zn===k&&se(qn,k):tn&n&&(Zn=tn)}if(ee.get(a)){var qt=E|j|M,Qn=qt|k,Tr=[];{for(var Ft=[],Lt=0;Lt<ce.length;Lt++)if(B[ce[Lt]]&a){var Qt=Z[ce[Lt]],Kn=void 0;if(S(Qt)!==null)if(Ft.length<63)Ft.push({char:Qt,seqIndex:Lt});else break;else if((Kn=U(Qt))!==null)for(var Kt=Ft.length-1;Kt>=0;Kt--){var rn=Ft[Kt].char;if(rn===Kn||rn===U(A(Qt))||S(A(rn))===Qt){Tr.push([Ft[Kt].seqIndex,Lt]),Ft.length=Kt;break}}}Tr.sort(function(Qe,at){return Qe[0]-at[0]})}for(var nn=0;nn<Tr.length;nn++){for(var Jn=Tr[nn],Ur=Jn[0],on=Jn[1],$n=!1,ot=0,an=Ur+1;an<on;an++){var eo=ce[an];if(B[eo]&Qn){$n=!0;var to=B[eo]&qt?E:k;if(to===Pt){ot=to;break}}}if($n&&!ot){ot=Xt;for(var sn=Ur-1;sn>=0;sn--){var ro=ce[sn];if(B[ro]&Qn){var no=B[ro]&qt?E:k;no!==Pt?ot=no:ot=Pt;break}}}if(ot){if(B[ce[Ur]]=B[ce[on]]=ot,ot!==Pt){for(var Jt=Ur+1;Jt<ce.length;Jt++)if(!(B[ce[Jt]]&o)){h(Z[ce[Jt]])&ie&&(B[ce[Jt]]=ot);break}}if(ot!==Pt){for(var $t=on+1;$t<ce.length;$t++)if(!(B[ce[$t]]&o)){h(Z[ce[$t]])&ie&&(B[ce[$t]]=ot);break}}}}for(var St=0;St<ce.length;St++)if(B[ce[St]]&a){for(var oo=St,ln=St,cn=Xt,er=St-1;er>=0;er--)if(B[ce[er]]&o)oo=er;else{cn=B[ce[er]]&qt?E:k;break}for(var ao=ei,tr=St+1;tr<ce.length;tr++)if(B[ce[tr]]&(a|o))ln=tr;else{ao=B[ce[tr]]&qt?E:k;break}for(var fn=oo;fn<=ln;fn++)B[ce[fn]]=cn===ao?cn:Pt;St=ln}}}for(var $e=le.start;$e<=le.end;$e++){var ri=J[$e],kr=B[$e];if(ri&1?kr&(k|j|M)&&J[$e]++:kr&E?J[$e]++:kr&(M|j)&&(J[$e]+=2),kr&o&&(J[$e]=$e===0?le.level:J[$e-1]),$e===le.end||h(Z[$e])&(Y|R))for(var Cr=$e;Cr>=0&&h(Z[Cr])&i;Cr--)J[Cr]=le.level}}return{levels:J,paragraphs:te};function io(Qe,at){for(var Ke=Qe;Ke<Z.length;Ke++){var Mt=B[Ke];if(Mt&(E|N))return 1;if(Mt&(R|k)||at&&Mt===O)return 0;if(Mt&e){var so=ni(Ke);Ke=so===-1?Z.length:so}}return 0}function ni(Qe){for(var at=1,Ke=Qe+1;Ke<Z.length;Ke++){var Mt=B[Ke];if(Mt&R)break;if(Mt&O){if(--at===0)return Ke}else Mt&e&&at++}return-1}}var Q="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",G;function W(){if(!G){var Z=x(Q,!0),ne=Z.map,re=Z.reverseMap;re.forEach(function(B,ge){ne.set(ge,B)}),G=ne}}function de(Z){return W(),G.get(Z)||null}function fe(Z,ne,re,B){var ge=Z.length;re=Math.max(0,re==null?0:+re),B=Math.min(ge-1,B==null?ge-1:+B);for(var ee=new Map,se=re;se<=B;se++)if(ne[se]&1){var J=de(Z[se]);J!==null&&ee.set(se,J)}return ee}function $(Z,ne,re,B){var ge=Z.length;re=Math.max(0,re==null?0:+re),B=Math.min(ge-1,B==null?ge-1:+B);var ee=[];return ne.paragraphs.forEach(function(se){var J=Math.max(re,se.start),Me=Math.min(B,se.end);if(J<Me){for(var te=ne.levels.slice(J,Me+1),le=Me;le>=J&&h(Z[le])&i;le--)te[le]=se.level;for(var he=se.level,ye=1/0,ke=0;ke<te.length;ke++){var Pe=te[ke];Pe>he&&(he=Pe),Pe<ye&&(ye=Pe|1)}for(var be=he;be>=ye;be--)for(var we=0;we<te.length;we++)if(te[we]>=be){for(var ue=we;we+1<te.length&&te[we+1]>=be;)we++;we>ue&&ee.push([ue+J,we+J])}}}),ee}function ae(Z,ne,re,B){var ge=oe(Z,ne,re,B),ee=[].concat(Z);return ge.forEach(function(se,J){ee[J]=(ne.levels[se]&1?de(Z[se]):null)||Z[se]}),ee.join("")}function oe(Z,ne,re,B){for(var ge=$(Z,ne,re,B),ee=[],se=0;se<Z.length;se++)ee[se]=se;return ge.forEach(function(J){for(var Me=J[0],te=J[1],le=ee.slice(Me,te+1),he=le.length;he--;)ee[te-he]=le[he]}),ee}return r.closingToOpeningBracket=U,r.getBidiCharType=h,r.getBidiCharTypeName=p,r.getCanonicalBracket=A,r.getEmbeddingLevels=K,r.getMirroredCharacter=de,r.getMirroredCharactersMap=fe,r.getReorderSegments=$,r.getReorderedIndices=oe,r.getReorderedString=ae,r.openingToClosingBracket=S,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return s}const Ba=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Un(s){const r=/^[ \t]*#include +<([\w\d./]+)>/gm;function l(c,t){let e=di[t];return e?Un(e):c}return s.replace(r,l)}const We=[];for(let s=0;s<256;s++)We[s]=(s<16?"0":"")+s.toString(16);function Fs(){const s=Math.random()*4294967295|0,r=Math.random()*4294967295|0,l=Math.random()*4294967295|0,c=Math.random()*4294967295|0;return(We[s&255]+We[s>>8&255]+We[s>>16&255]+We[s>>24&255]+"-"+We[r&255]+We[r>>8&255]+"-"+We[r>>16&15|64]+We[r>>24&255]+"-"+We[l&63|128]+We[l>>8&255]+"-"+We[l>>16&255]+We[l>>24&255]+We[c&255]+We[c>>8&255]+We[c>>16&255]+We[c>>24&255]).toUpperCase()}const Ct=Object.assign||function(){let s=arguments[0];for(let r=1,l=arguments.length;r<l;r++){let c=arguments[r];if(c)for(let t in c)Object.prototype.hasOwnProperty.call(c,t)&&(s[t]=c[t])}return s},Ls=Date.now(),ra=new WeakMap,na=new Map;let Is=1e10;function kn(s,r){const l=Os(r);let c=ra.get(s);if(c||ra.set(s,c=Object.create(null)),c[l])return new c[l];const t=`_onBeforeCompile${l}`,e=function(i,f){s.onBeforeCompile.call(this,i,f);const d=this.customProgramCacheKey()+"|"+i.vertexShader+"|"+i.fragmentShader;let h=na[d];if(!h){const p=zs(this,i,r,l);h=na[d]=p}i.vertexShader=h.vertexShader,i.fragmentShader=h.fragmentShader,Ct(i.uniforms,this.uniforms),r.timeUniform&&(i.uniforms[r.timeUniform]={get value(){return Date.now()-Ls}}),this[t]&&this[t](i)},n=function(){return a(r.chained?s:s.clone())},a=function(i){const f=Object.create(i,o);return Object.defineProperty(f,"baseMaterial",{value:s}),Object.defineProperty(f,"id",{value:Is++}),f.uuid=Fs(),f.uniforms=Ct({},i.uniforms,r.uniforms),f.defines=Ct({},i.defines,r.defines),f.defines[`TROIKA_DERIVED_MATERIAL_${l}`]="",f.extensions=Ct({},i.extensions,r.extensions),f._listeners=void 0,f},o={constructor:{value:n},isDerivedMaterial:{value:!0},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return s.customProgramCacheKey()+"|"+l}},onBeforeCompile:{get(){return e},set(i){this[t]=i}},copy:{writable:!0,configurable:!0,value:function(i){return s.copy.call(this,i),!s.isShaderMaterial&&!s.isDerivedMaterial&&(Ct(this.extensions,i.extensions),Ct(this.defines,i.defines),Ct(this.uniforms,wn.clone(i.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const i=new s.constructor;return a(i).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let i=this._depthMaterial;return i||(i=this._depthMaterial=kn(s.isDerivedMaterial?s.getDepthMaterial():new fi({depthPacking:ui}),r),i.defines.IS_DEPTH_MATERIAL="",i.uniforms=this.uniforms),i}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let i=this._distanceMaterial;return i||(i=this._distanceMaterial=kn(s.isDerivedMaterial?s.getDistanceMaterial():new ci,r),i.defines.IS_DISTANCE_MATERIAL="",i.uniforms=this.uniforms),i}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:i,_distanceMaterial:f}=this;i&&i.dispose(),f&&f.dispose(),s.dispose.call(this)}}};return c[l]=n,new n}function zs(s,{vertexShader:r,fragmentShader:l},c,t){let{vertexDefs:e,vertexMainIntro:n,vertexMainOutro:a,vertexTransform:o,fragmentDefs:i,fragmentMainIntro:f,fragmentMainOutro:d,fragmentColorTransform:h,customRewriter:p,timeUniform:g}=c;if(e=e||"",n=n||"",a=a||"",i=i||"",f=f||"",d=d||"",(o||p)&&(r=Un(r)),(h||p)&&(l=l.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),l=Un(l)),p){let x=p({vertexShader:r,fragmentShader:l});r=x.vertexShader,l=x.fragmentShader}if(h){let x=[];l=l.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,y=>(x.push(y),"")),d=`${h}
${x.join(`
`)}
${d}`}if(g){const x=`
uniform float ${g};
`;e=x+e,i=x+i}return o&&(r=`vec3 troika_position_${t};
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
`,r=r.replace(/\b(position|normal|uv)\b/g,(x,y,w,_)=>/\battribute\s+vec[23]\s+$/.test(_.substr(0,w))?y:`troika_${y}_${t}`),s.map&&s.map.channel>0||(r=r.replace(/\bMAP_UV\b/g,`troika_uv_${t}`))),r=oa(r,t,e,n,a),l=oa(l,t,i,f,d),{vertexShader:r,fragmentShader:l}}function oa(s,r,l,c,t){return(c||t||l)&&(s=s.replace(Ba,`
${l}
void troikaOrigMain${r}() {`),s+=`
void main() {
  ${c}
  troikaOrigMain${r}();
  ${t}
}`),s}function Ds(s,r){return s==="uniforms"?void 0:typeof r=="function"?r.toString():r}let Gs=0;const aa=new Map;function Os(s){const r=JSON.stringify(s,Ds);let l=aa.get(r);return l==null&&aa.set(r,l=++Gs),l}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function Bs(){return typeof window>"u"&&(self.window=self),function(s){var r={parse:function(t){var e=r._bin,n=new Uint8Array(t);if(e.readASCII(n,0,4)=="ttcf"){var a=4;e.readUshort(n,a),a+=2,e.readUshort(n,a),a+=2;var o=e.readUint(n,a);a+=4;for(var i=[],f=0;f<o;f++){var d=e.readUint(n,a);a+=4,i.push(r._readFont(n,d))}return i}return[r._readFont(n,0)]},_readFont:function(t,e){var n=r._bin,a=e;n.readFixed(t,e),e+=4;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2;for(var i=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],f={_data:t,_offset:a},d={},h=0;h<o;h++){var p=n.readASCII(t,e,4);e+=4,n.readUint(t,e),e+=4;var g=n.readUint(t,e);e+=4;var x=n.readUint(t,e);e+=4,d[p]={offset:g,length:x}}for(h=0;h<i.length;h++){var y=i[h];d[y]&&(f[y.trim()]=r[y.trim()].parse(t,d[y].offset,d[y].length,f))}return f},_tabOffset:function(t,e,n){for(var a=r._bin,o=a.readUshort(t,n+4),i=n+12,f=0;f<o;f++){var d=a.readASCII(t,i,4);i+=4,a.readUint(t,i),i+=4;var h=a.readUint(t,i);if(i+=4,a.readUint(t,i),i+=4,d==e)return h}return 0}};r._bin={readFixed:function(t,e){return(t[e]<<8|t[e+1])+(t[e+2]<<8|t[e+3])/65540},readF2dot14:function(t,e){return r._bin.readShort(t,e)/16384},readInt:function(t,e){return r._bin._view(t).getInt32(e)},readInt8:function(t,e){return r._bin._view(t).getInt8(e)},readShort:function(t,e){return r._bin._view(t).getInt16(e)},readUshort:function(t,e){return r._bin._view(t).getUint16(e)},readUshorts:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(r._bin.readUshort(t,e+2*o));return a},readUint:function(t,e){return r._bin._view(t).getUint32(e)},readUint64:function(t,e){return 4294967296*r._bin.readUint(t,e)+r._bin.readUint(t,e+4)},readASCII:function(t,e,n){for(var a="",o=0;o<n;o++)a+=String.fromCharCode(t[e+o]);return a},readUnicode:function(t,e,n){for(var a="",o=0;o<n;o++){var i=t[e++]<<8|t[e++];a+=String.fromCharCode(i)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(t,e,n){var a=r._bin._tdec;return a&&e==0&&n==t.length?a.decode(t):r._bin.readASCII(t,e,n)},readBytes:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(t[e+o]);return a},readASCIIArray:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(String.fromCharCode(t[e+o]));return a},_view:function(t){return t._dataView||(t._dataView=t.buffer?new DataView(t.buffer,t.byteOffset,t.byteLength):new DataView(new Uint8Array(t).buffer))}},r._lctf={},r._lctf.parse=function(t,e,n,a,o){var i=r._bin,f={},d=e;i.readFixed(t,e),e+=4;var h=i.readUshort(t,e);e+=2;var p=i.readUshort(t,e);e+=2;var g=i.readUshort(t,e);return e+=2,f.scriptList=r._lctf.readScriptList(t,d+h),f.featureList=r._lctf.readFeatureList(t,d+p),f.lookupList=r._lctf.readLookupList(t,d+g,o),f},r._lctf.readLookupList=function(t,e,n){var a=r._bin,o=e,i=[],f=a.readUshort(t,e);e+=2;for(var d=0;d<f;d++){var h=a.readUshort(t,e);e+=2;var p=r._lctf.readLookupTable(t,o+h,n);i.push(p)}return i},r._lctf.readLookupTable=function(t,e,n){var a=r._bin,o=e,i={tabs:[]};i.ltype=a.readUshort(t,e),e+=2,i.flag=a.readUshort(t,e),e+=2;var f=a.readUshort(t,e);e+=2;for(var d=i.ltype,h=0;h<f;h++){var p=a.readUshort(t,e);e+=2;var g=n(t,d,o+p,i);i.tabs.push(g)}return i},r._lctf.numOfOnes=function(t){for(var e=0,n=0;n<32;n++)t>>>n&1&&e++;return e},r._lctf.readClassDef=function(t,e){var n=r._bin,a=[],o=n.readUshort(t,e);if(e+=2,o==1){var i=n.readUshort(t,e);e+=2;var f=n.readUshort(t,e);e+=2;for(var d=0;d<f;d++)a.push(i+d),a.push(i+d),a.push(n.readUshort(t,e)),e+=2}if(o==2){var h=n.readUshort(t,e);for(e+=2,d=0;d<h;d++)a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2}return a},r._lctf.getInterval=function(t,e){for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1];if(t[n+2],a<=e&&e<=o)return n}return-1},r._lctf.readCoverage=function(t,e){var n=r._bin,a={};a.fmt=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.fmt==1&&(a.tab=n.readUshorts(t,e,o)),a.fmt==2&&(a.tab=n.readUshorts(t,e,3*o)),a},r._lctf.coverageIndex=function(t,e){var n=t.tab;if(t.fmt==1)return n.indexOf(e);if(t.fmt==2){var a=r._lctf.getInterval(n,e);if(a!=-1)return n[a+2]+(e-n[a])}return-1},r._lctf.readFeatureList=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2;var p=r._lctf.readFeatureTable(t,a+h);p.tag=d.trim(),o.push(p)}return o},r._lctf.readFeatureTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.featureParams=a+i);var f=n.readUshort(t,e);e+=2,o.tab=[];for(var d=0;d<f;d++)o.tab.push(n.readUshort(t,e+2*d));return o},r._lctf.readScriptList=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2,o[d.trim()]=r._lctf.readScriptTable(t,a+h)}return o},r._lctf.readScriptTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.default=r._lctf.readLangSysTable(t,a+i));var f=n.readUshort(t,e);e+=2;for(var d=0;d<f;d++){var h=n.readASCII(t,e,4);e+=4;var p=n.readUshort(t,e);e+=2,o[h.trim()]=r._lctf.readLangSysTable(t,a+p)}return o},r._lctf.readLangSysTable=function(t,e){var n=r._bin,a={};n.readUshort(t,e),e+=2,a.reqFeature=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.features=n.readUshorts(t,e,o),a},r.CFF={},r.CFF.parse=function(t,e,n){var a=r._bin;(t=new Uint8Array(t.buffer,e,n))[e=0],t[++e],t[++e],t[++e],e++;var o=[];e=r.CFF.readIndex(t,e,o);for(var i=[],f=0;f<o.length-1;f++)i.push(a.readASCII(t,e+o[f],o[f+1]-o[f]));e+=o[o.length-1];var d=[];e=r.CFF.readIndex(t,e,d);var h=[];for(f=0;f<d.length-1;f++)h.push(r.CFF.readDict(t,e+d[f],e+d[f+1]));e+=d[d.length-1];var p=h[0],g=[];e=r.CFF.readIndex(t,e,g);var x=[];for(f=0;f<g.length-1;f++)x.push(a.readASCII(t,e+g[f],g[f+1]-g[f]));if(e+=g[g.length-1],r.CFF.readSubrs(t,e,p),p.CharStrings){e=p.CharStrings,g=[],e=r.CFF.readIndex(t,e,g);var y=[];for(f=0;f<g.length-1;f++)y.push(a.readBytes(t,e+g[f],g[f+1]-g[f]));p.CharStrings=y}if(p.ROS){e=p.FDArray;var w=[];for(e=r.CFF.readIndex(t,e,w),p.FDArray=[],f=0;f<w.length-1;f++){var _=r.CFF.readDict(t,e+w[f],e+w[f+1]);r.CFF._readFDict(t,_,x),p.FDArray.push(_)}e+=w[w.length-1],e=p.FDSelect,p.FDSelect=[];var v=t[e];if(e++,v!=3)throw v;var S=a.readUshort(t,e);for(e+=2,f=0;f<S+1;f++)p.FDSelect.push(a.readUshort(t,e),t[e+2]),e+=3}return p.Encoding&&(p.Encoding=r.CFF.readEncoding(t,p.Encoding,p.CharStrings.length)),p.charset&&(p.charset=r.CFF.readCharset(t,p.charset,p.CharStrings.length)),r.CFF._readFDict(t,p,x),p},r.CFF._readFDict=function(t,e,n){var a;for(var o in e.Private&&(a=e.Private[1],e.Private=r.CFF.readDict(t,a,a+e.Private[0]),e.Private.Subrs&&r.CFF.readSubrs(t,a+e.Private.Subrs,e.Private)),e)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)!=-1&&(e[o]=n[e[o]-426+35])},r.CFF.readSubrs=function(t,e,n){var a=r._bin,o=[];e=r.CFF.readIndex(t,e,o);var i,f=o.length;i=f<1240?107:f<33900?1131:32768,n.Bias=i,n.Subrs=[];for(var d=0;d<o.length-1;d++)n.Subrs.push(a.readBytes(t,e+o[d],o[d+1]-o[d]))},r.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],r.CFF.glyphByUnicode=function(t,e){for(var n=0;n<t.charset.length;n++)if(t.charset[n]==e)return n;return-1},r.CFF.glyphBySE=function(t,e){return e<0||e>255?-1:r.CFF.glyphByUnicode(t,r.CFF.tableSE[e])},r.CFF.readEncoding=function(t,e,n){r._bin;var a=[".notdef"],o=t[e];if(e++,o!=0)throw"error: unknown encoding format: "+o;var i=t[e];e++;for(var f=0;f<i;f++)a.push(t[e+f]);return a},r.CFF.readCharset=function(t,e,n){var a=r._bin,o=[".notdef"],i=t[e];if(e++,i==0)for(var f=0;f<n;f++){var d=a.readUshort(t,e);e+=2,o.push(d)}else{if(i!=1&&i!=2)throw"error: format: "+i;for(;o.length<n;){d=a.readUshort(t,e),e+=2;var h=0;for(i==1?(h=t[e],e++):(h=a.readUshort(t,e),e+=2),f=0;f<=h;f++)o.push(d),d++}}return o},r.CFF.readIndex=function(t,e,n){var a=r._bin,o=a.readUshort(t,e)+1,i=t[e+=2];if(e++,i==1)for(var f=0;f<o;f++)n.push(t[e+f]);else if(i==2)for(f=0;f<o;f++)n.push(a.readUshort(t,e+2*f));else if(i==3)for(f=0;f<o;f++)n.push(16777215&a.readUint(t,e+3*f-1));else if(o!=1)throw"unsupported offset size: "+i+", count: "+o;return(e+=o*i)-1},r.CFF.getCharString=function(t,e,n){var a=r._bin,o=t[e],i=t[e+1];t[e+2],t[e+3],t[e+4];var f=1,d=null,h=null;o<=20&&(d=o,f=1),o==12&&(d=100*o+i,f=2),21<=o&&o<=27&&(d=o,f=1),o==28&&(h=a.readShort(t,e+1),f=3),29<=o&&o<=31&&(d=o,f=1),32<=o&&o<=246&&(h=o-139,f=1),247<=o&&o<=250&&(h=256*(o-247)+i+108,f=2),251<=o&&o<=254&&(h=256*-(o-251)-i-108,f=2),o==255&&(h=a.readInt(t,e+1)/65535,f=5),n.val=h??"o"+d,n.size=f},r.CFF.readCharString=function(t,e,n){for(var a=e+n,o=r._bin,i=[];e<a;){var f=t[e],d=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,g=null;f<=20&&(p=f,h=1),f==12&&(p=100*f+d,h=2),f!=19&&f!=20||(p=f,h=2),21<=f&&f<=27&&(p=f,h=1),f==28&&(g=o.readShort(t,e+1),h=3),29<=f&&f<=31&&(p=f,h=1),32<=f&&f<=246&&(g=f-139,h=1),247<=f&&f<=250&&(g=256*(f-247)+d+108,h=2),251<=f&&f<=254&&(g=256*-(f-251)-d-108,h=2),f==255&&(g=o.readInt(t,e+1)/65535,h=5),i.push(g??"o"+p),e+=h}return i},r.CFF.readDict=function(t,e,n){for(var a=r._bin,o={},i=[];e<n;){var f=t[e],d=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,g=null;if(f==28&&(g=a.readShort(t,e+1),h=3),f==29&&(g=a.readInt(t,e+1),h=5),32<=f&&f<=246&&(g=f-139,h=1),247<=f&&f<=250&&(g=256*(f-247)+d+108,h=2),251<=f&&f<=254&&(g=256*-(f-251)-d-108,h=2),f==255)throw g=a.readInt(t,e+1)/65535,h=5,"unknown number";if(f==30){var x=[];for(h=1;;){var y=t[e+h];h++;var w=y>>4,_=15&y;if(w!=15&&x.push(w),_!=15&&x.push(_),_==15)break}for(var v="",S=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],U=0;U<x.length;U++)v+=S[x[U]];g=parseFloat(v)}f<=21&&(p=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][f],h=1,f==12&&(p=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][d],h=2)),p!=null?(o[p]=i.length==1?i[0]:i,i=[]):i.push(g),e+=h}return o},r.cmap={},r.cmap.parse=function(t,e,n){t=new Uint8Array(t.buffer,e,n),e=0;var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2;var f=[];o.tables=[];for(var d=0;d<i;d++){var h=a.readUshort(t,e);e+=2;var p=a.readUshort(t,e);e+=2;var g=a.readUint(t,e);e+=4;var x="p"+h+"e"+p,y=f.indexOf(g);if(y==-1){var w;y=o.tables.length,f.push(g);var _=a.readUshort(t,g);_==0?w=r.cmap.parse0(t,g):_==4?w=r.cmap.parse4(t,g):_==6?w=r.cmap.parse6(t,g):_==12&&(w=r.cmap.parse12(t,g)),o.tables.push(w)}if(o[x]!=null)throw"multiple tables for one platform+encoding";o[x]=y}return o},r.cmap.parse0=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,a.map=[];for(var i=0;i<o-6;i++)a.map.push(t[e+i]);return a},r.cmap.parse4=function(t,e){var n=r._bin,a=e,o={};o.format=n.readUshort(t,e),e+=2;var i=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2;var f=n.readUshort(t,e);e+=2;var d=f/2;o.searchRange=n.readUshort(t,e),e+=2,o.entrySelector=n.readUshort(t,e),e+=2,o.rangeShift=n.readUshort(t,e),e+=2,o.endCount=n.readUshorts(t,e,d),e+=2*d,e+=2,o.startCount=n.readUshorts(t,e,d),e+=2*d,o.idDelta=[];for(var h=0;h<d;h++)o.idDelta.push(n.readShort(t,e)),e+=2;for(o.idRangeOffset=n.readUshorts(t,e,d),e+=2*d,o.glyphIdArray=[];e<a+i;)o.glyphIdArray.push(n.readUshort(t,e)),e+=2;return o},r.cmap.parse6=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,a.firstCode=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,a.glyphIdArray=[];for(var i=0;i<o;i++)a.glyphIdArray.push(n.readUshort(t,e)),e+=2;return a},r.cmap.parse12=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,e+=2,n.readUint(t,e),e+=4,n.readUint(t,e),e+=4;var o=n.readUint(t,e);e+=4,a.groups=[];for(var i=0;i<o;i++){var f=e+12*i,d=n.readUint(t,f+0),h=n.readUint(t,f+4),p=n.readUint(t,f+8);a.groups.push([d,h,p])}return a},r.glyf={},r.glyf.parse=function(t,e,n,a){for(var o=[],i=0;i<a.maxp.numGlyphs;i++)o.push(null);return o},r.glyf._parseGlyf=function(t,e){var n=r._bin,a=t._data,o=r._tabOffset(a,"glyf",t._offset)+t.loca[e];if(t.loca[e]==t.loca[e+1])return null;var i={};if(i.noc=n.readShort(a,o),o+=2,i.xMin=n.readShort(a,o),o+=2,i.yMin=n.readShort(a,o),o+=2,i.xMax=n.readShort(a,o),o+=2,i.yMax=n.readShort(a,o),o+=2,i.xMin>=i.xMax||i.yMin>=i.yMax)return null;if(i.noc>0){i.endPts=[];for(var f=0;f<i.noc;f++)i.endPts.push(n.readUshort(a,o)),o+=2;var d=n.readUshort(a,o);if(o+=2,a.length-o<d)return null;i.instructions=n.readBytes(a,o,d),o+=d;var h=i.endPts[i.noc-1]+1;for(i.flags=[],f=0;f<h;f++){var p=a[o];if(o++,i.flags.push(p),(8&p)!=0){var g=a[o];o++;for(var x=0;x<g;x++)i.flags.push(p),f++}}for(i.xs=[],f=0;f<h;f++){var y=(2&i.flags[f])!=0,w=(16&i.flags[f])!=0;y?(i.xs.push(w?a[o]:-a[o]),o++):w?i.xs.push(0):(i.xs.push(n.readShort(a,o)),o+=2)}for(i.ys=[],f=0;f<h;f++)y=(4&i.flags[f])!=0,w=(32&i.flags[f])!=0,y?(i.ys.push(w?a[o]:-a[o]),o++):w?i.ys.push(0):(i.ys.push(n.readShort(a,o)),o+=2);var _=0,v=0;for(f=0;f<h;f++)_+=i.xs[f],v+=i.ys[f],i.xs[f]=_,i.ys[f]=v}else{var S;i.parts=[];do{S=n.readUshort(a,o),o+=2;var U={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(i.parts.push(U),U.glyphIndex=n.readUshort(a,o),o+=2,1&S){var A=n.readShort(a,o);o+=2;var k=n.readShort(a,o);o+=2}else A=n.readInt8(a,o),o++,k=n.readInt8(a,o),o++;2&S?(U.m.tx=A,U.m.ty=k):(U.p1=A,U.p2=k),8&S?(U.m.a=U.m.d=n.readF2dot14(a,o),o+=2):64&S?(U.m.a=n.readF2dot14(a,o),o+=2,U.m.d=n.readF2dot14(a,o),o+=2):128&S&&(U.m.a=n.readF2dot14(a,o),o+=2,U.m.b=n.readF2dot14(a,o),o+=2,U.m.c=n.readF2dot14(a,o),o+=2,U.m.d=n.readF2dot14(a,o),o+=2)}while(32&S);if(256&S){var E=n.readUshort(a,o);for(o+=2,i.instr=[],f=0;f<E;f++)i.instr.push(a[o]),o++}}return i},r.GDEF={},r.GDEF.parse=function(t,e,n,a){var o=e;e+=4;var i=r._bin.readUshort(t,e);return{glyphClassDef:i===0?null:r._lctf.readClassDef(t,o+i)}},r.GPOS={},r.GPOS.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GPOS.subt)},r.GPOS.subt=function(t,e,n,a){var o=r._bin,i=n,f={};if(f.fmt=o.readUshort(t,n),n+=2,e==1||e==2||e==3||e==7||e==8&&f.fmt<=2){var d=o.readUshort(t,n);n+=2,f.coverage=r._lctf.readCoverage(t,d+i)}if(e==1&&f.fmt==1){var h=o.readUshort(t,n);n+=2,h!=0&&(f.pos=r.GPOS.readValueRecord(t,n,h))}else if(e==2&&f.fmt>=1&&f.fmt<=2){h=o.readUshort(t,n),n+=2;var p=o.readUshort(t,n);n+=2;var g=r._lctf.numOfOnes(h),x=r._lctf.numOfOnes(p);if(f.fmt==1){f.pairsets=[];var y=o.readUshort(t,n);n+=2;for(var w=0;w<y;w++){var _=i+o.readUshort(t,n);n+=2;var v=o.readUshort(t,_);_+=2;for(var S=[],U=0;U<v;U++){var A=o.readUshort(t,_);_+=2,h!=0&&(M=r.GPOS.readValueRecord(t,_,h),_+=2*g),p!=0&&(L=r.GPOS.readValueRecord(t,_,p),_+=2*x),S.push({gid2:A,val1:M,val2:L})}f.pairsets.push(S)}}if(f.fmt==2){var k=o.readUshort(t,n);n+=2;var E=o.readUshort(t,n);n+=2;var j=o.readUshort(t,n);n+=2;var F=o.readUshort(t,n);for(n+=2,f.classDef1=r._lctf.readClassDef(t,i+k),f.classDef2=r._lctf.readClassDef(t,i+E),f.matrix=[],w=0;w<j;w++){var V=[];for(U=0;U<F;U++){var M=null,L=null;h!=0&&(M=r.GPOS.readValueRecord(t,n,h),n+=2*g),p!=0&&(L=r.GPOS.readValueRecord(t,n,p),n+=2*x),V.push({val1:M,val2:L})}f.matrix.push(V)}}}else if(e==4&&f.fmt==1)f.markCoverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),f.baseCoverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),f.markClassCount=o.readUshort(t,n+4),f.markArray=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),f.baseArray=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,f.markClassCount);else if(e==6&&f.fmt==1)f.mark1Coverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),f.mark2Coverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),f.markClassCount=o.readUshort(t,n+4),f.mark1Array=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),f.mark2Array=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,f.markClassCount);else if(e==9&&f.fmt==1){var R=o.readUshort(t,n);n+=2;var Y=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=R;else if(a.ltype!=R)throw"invalid extension substitution";return r.GPOS.subt(t,a.ltype,i+Y)}return f},r.GPOS.readValueRecord=function(t,e,n){var a=r._bin,o=[];return o.push(1&n?a.readShort(t,e):0),e+=1&n?2:0,o.push(2&n?a.readShort(t,e):0),e+=2&n?2:0,o.push(4&n?a.readShort(t,e):0),e+=4&n?2:0,o.push(8&n?a.readShort(t,e):0),e+=8&n?2:0,o},r.GPOS.readBaseArray=function(t,e,n){var a=r._bin,o=[],i=e,f=a.readUshort(t,e);e+=2;for(var d=0;d<f;d++){for(var h=[],p=0;p<n;p++)h.push(r.GPOS.readAnchorRecord(t,i+a.readUshort(t,e))),e+=2;o.push(h)}return o},r.GPOS.readMarkArray=function(t,e){var n=r._bin,a=[],o=e,i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=r.GPOS.readAnchorRecord(t,n.readUshort(t,e+2)+o);d.markClass=n.readUshort(t,e),a.push(d),e+=4}return a},r.GPOS.readAnchorRecord=function(t,e){var n=r._bin,a={};return a.fmt=n.readUshort(t,e),a.x=n.readShort(t,e+2),a.y=n.readShort(t,e+4),a},r.GSUB={},r.GSUB.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GSUB.subt)},r.GSUB.subt=function(t,e,n,a){var o=r._bin,i=n,f={};if(f.fmt=o.readUshort(t,n),n+=2,e!=1&&e!=2&&e!=4&&e!=5&&e!=6)return null;if(e==1||e==2||e==4||e==5&&f.fmt<=2||e==6&&f.fmt<=2){var d=o.readUshort(t,n);n+=2,f.coverage=r._lctf.readCoverage(t,i+d)}if(e==1&&f.fmt>=1&&f.fmt<=2){if(f.fmt==1)f.delta=o.readShort(t,n),n+=2;else if(f.fmt==2){var h=o.readUshort(t,n);n+=2,f.newg=o.readUshorts(t,n,h),n+=2*f.newg.length}}else if(e==2&&f.fmt==1){h=o.readUshort(t,n),n+=2,f.seqs=[];for(var p=0;p<h;p++){var g=o.readUshort(t,n)+i;n+=2;var x=o.readUshort(t,g);f.seqs.push(o.readUshorts(t,g+2,x))}}else if(e==4)for(f.vals=[],h=o.readUshort(t,n),n+=2,p=0;p<h;p++){var y=o.readUshort(t,n);n+=2,f.vals.push(r.GSUB.readLigatureSet(t,i+y))}else if(e==5&&f.fmt==2){if(f.fmt==2){var w=o.readUshort(t,n);n+=2,f.cDef=r._lctf.readClassDef(t,i+w),f.scset=[];var _=o.readUshort(t,n);for(n+=2,p=0;p<_;p++){var v=o.readUshort(t,n);n+=2,f.scset.push(v==0?null:r.GSUB.readSubClassSet(t,i+v))}}}else if(e==6&&f.fmt==3){if(f.fmt==3){for(p=0;p<3;p++){h=o.readUshort(t,n),n+=2;for(var S=[],U=0;U<h;U++)S.push(r._lctf.readCoverage(t,i+o.readUshort(t,n+2*U)));n+=2*h,p==0&&(f.backCvg=S),p==1&&(f.inptCvg=S),p==2&&(f.ahedCvg=S)}h=o.readUshort(t,n),n+=2,f.lookupRec=r.GSUB.readSubstLookupRecords(t,n,h)}}else if(e==7&&f.fmt==1){var A=o.readUshort(t,n);n+=2;var k=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=A;else if(a.ltype!=A)throw"invalid extension substitution";return r.GSUB.subt(t,a.ltype,i+k)}return f},r.GSUB.readSubClassSet=function(t,e){var n=r._bin.readUshort,a=e,o=[],i=n(t,e);e+=2;for(var f=0;f<i;f++){var d=n(t,e);e+=2,o.push(r.GSUB.readSubClassRule(t,a+d))}return o},r.GSUB.readSubClassRule=function(t,e){var n=r._bin.readUshort,a={},o=n(t,e),i=n(t,e+=2);e+=2,a.input=[];for(var f=0;f<o-1;f++)a.input.push(n(t,e)),e+=2;return a.substLookupRecords=r.GSUB.readSubstLookupRecords(t,e,i),a},r.GSUB.readSubstLookupRecords=function(t,e,n){for(var a=r._bin.readUshort,o=[],i=0;i<n;i++)o.push(a(t,e),a(t,e+2)),e+=4;return o},r.GSUB.readChainSubClassSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readUshort(t,e);e+=2,o.push(r.GSUB.readChainSubClassRule(t,a+d))}return o},r.GSUB.readChainSubClassRule=function(t,e){for(var n=r._bin,a={},o=["backtrack","input","lookahead"],i=0;i<o.length;i++){var f=n.readUshort(t,e);e+=2,i==1&&f--,a[o[i]]=n.readUshorts(t,e,f),e+=2*a[o[i]].length}return f=n.readUshort(t,e),e+=2,a.subst=n.readUshorts(t,e,2*f),e+=2*a.subst.length,a},r.GSUB.readLigatureSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readUshort(t,e);e+=2,o.push(r.GSUB.readLigature(t,a+d))}return o},r.GSUB.readLigature=function(t,e){var n=r._bin,a={chain:[]};a.nglyph=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2;for(var i=0;i<o-1;i++)a.chain.push(n.readUshort(t,e)),e+=2;return a},r.head={},r.head.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.fontRevision=a.readFixed(t,e),e+=4,a.readUint(t,e),e+=4,a.readUint(t,e),e+=4,o.flags=a.readUshort(t,e),e+=2,o.unitsPerEm=a.readUshort(t,e),e+=2,o.created=a.readUint64(t,e),e+=8,o.modified=a.readUint64(t,e),e+=8,o.xMin=a.readShort(t,e),e+=2,o.yMin=a.readShort(t,e),e+=2,o.xMax=a.readShort(t,e),e+=2,o.yMax=a.readShort(t,e),e+=2,o.macStyle=a.readUshort(t,e),e+=2,o.lowestRecPPEM=a.readUshort(t,e),e+=2,o.fontDirectionHint=a.readShort(t,e),e+=2,o.indexToLocFormat=a.readShort(t,e),e+=2,o.glyphDataFormat=a.readShort(t,e),e+=2,o},r.hhea={},r.hhea.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.ascender=a.readShort(t,e),e+=2,o.descender=a.readShort(t,e),e+=2,o.lineGap=a.readShort(t,e),e+=2,o.advanceWidthMax=a.readUshort(t,e),e+=2,o.minLeftSideBearing=a.readShort(t,e),e+=2,o.minRightSideBearing=a.readShort(t,e),e+=2,o.xMaxExtent=a.readShort(t,e),e+=2,o.caretSlopeRise=a.readShort(t,e),e+=2,o.caretSlopeRun=a.readShort(t,e),e+=2,o.caretOffset=a.readShort(t,e),e+=2,e+=8,o.metricDataFormat=a.readShort(t,e),e+=2,o.numberOfHMetrics=a.readUshort(t,e),e+=2,o},r.hmtx={},r.hmtx.parse=function(t,e,n,a){for(var o=r._bin,i={aWidth:[],lsBearing:[]},f=0,d=0,h=0;h<a.maxp.numGlyphs;h++)h<a.hhea.numberOfHMetrics&&(f=o.readUshort(t,e),e+=2,d=o.readShort(t,e),e+=2),i.aWidth.push(f),i.lsBearing.push(d);return i},r.kern={},r.kern.parse=function(t,e,n,a){var o=r._bin,i=o.readUshort(t,e);if(e+=2,i==1)return r.kern.parseV1(t,e-2,n,a);var f=o.readUshort(t,e);e+=2;for(var d={glyph1:[],rval:[]},h=0;h<f;h++){e+=2,n=o.readUshort(t,e),e+=2;var p=o.readUshort(t,e);e+=2;var g=p>>>8;if((g&=15)!=0)throw"unknown kern table format: "+g;e=r.kern.readFormat0(t,e,d)}return d},r.kern.parseV1=function(t,e,n,a){var o=r._bin;o.readFixed(t,e),e+=4;var i=o.readUint(t,e);e+=4;for(var f={glyph1:[],rval:[]},d=0;d<i;d++){o.readUint(t,e),e+=4;var h=o.readUshort(t,e);e+=2,o.readUshort(t,e),e+=2;var p=h>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;e=r.kern.readFormat0(t,e,f)}return f},r.kern.readFormat0=function(t,e,n){var a=r._bin,o=-1,i=a.readUshort(t,e);e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2;for(var f=0;f<i;f++){var d=a.readUshort(t,e);e+=2;var h=a.readUshort(t,e);e+=2;var p=a.readShort(t,e);e+=2,d!=o&&(n.glyph1.push(d),n.rval.push({glyph2:[],vals:[]}));var g=n.rval[n.rval.length-1];g.glyph2.push(h),g.vals.push(p),o=d}return e},r.loca={},r.loca.parse=function(t,e,n,a){var o=r._bin,i=[],f=a.head.indexToLocFormat,d=a.maxp.numGlyphs+1;if(f==0)for(var h=0;h<d;h++)i.push(o.readUshort(t,e+(h<<1))<<1);if(f==1)for(h=0;h<d;h++)i.push(o.readUint(t,e+(h<<2)));return i},r.maxp={},r.maxp.parse=function(t,e,n){var a=r._bin,o={},i=a.readUint(t,e);return e+=4,o.numGlyphs=a.readUshort(t,e),e+=2,i==65536&&(o.maxPoints=a.readUshort(t,e),e+=2,o.maxContours=a.readUshort(t,e),e+=2,o.maxCompositePoints=a.readUshort(t,e),e+=2,o.maxCompositeContours=a.readUshort(t,e),e+=2,o.maxZones=a.readUshort(t,e),e+=2,o.maxTwilightPoints=a.readUshort(t,e),e+=2,o.maxStorage=a.readUshort(t,e),e+=2,o.maxFunctionDefs=a.readUshort(t,e),e+=2,o.maxInstructionDefs=a.readUshort(t,e),e+=2,o.maxStackElements=a.readUshort(t,e),e+=2,o.maxSizeOfInstructions=a.readUshort(t,e),e+=2,o.maxComponentElements=a.readUshort(t,e),e+=2,o.maxComponentDepth=a.readUshort(t,e),e+=2),o},r.name={},r.name.parse=function(t,e,n){var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2,a.readUshort(t,e);for(var f,d=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=e+=2,p=0;p<i;p++){var g=a.readUshort(t,e);e+=2;var x=a.readUshort(t,e);e+=2;var y=a.readUshort(t,e);e+=2;var w=a.readUshort(t,e);e+=2;var _=a.readUshort(t,e);e+=2;var v=a.readUshort(t,e);e+=2;var S,U=d[w],A=h+12*i+v;if(g==0)S=a.readUnicode(t,A,_/2);else if(g==3&&x==0)S=a.readUnicode(t,A,_/2);else if(x==0)S=a.readASCII(t,A,_);else if(x==1)S=a.readUnicode(t,A,_/2);else if(x==3)S=a.readUnicode(t,A,_/2);else{if(g!=1)throw"unknown encoding "+x+", platformID: "+g;S=a.readASCII(t,A,_)}var k="p"+g+","+y.toString(16);o[k]==null&&(o[k]={}),o[k][U!==void 0?U:w]=S,o[k]._lang=y}for(var E in o)if(o[E].postScriptName!=null&&o[E]._lang==1033)return o[E];for(var E in o)if(o[E].postScriptName!=null&&o[E]._lang==0)return o[E];for(var E in o)if(o[E].postScriptName!=null&&o[E]._lang==3084)return o[E];for(var E in o)if(o[E].postScriptName!=null)return o[E];for(var E in o){f=E;break}return o[f]},r["OS/2"]={},r["OS/2"].parse=function(t,e,n){var a=r._bin.readUshort(t,e);e+=2;var o={};if(a==0)r["OS/2"].version0(t,e,o);else if(a==1)r["OS/2"].version1(t,e,o);else if(a==2||a==3||a==4)r["OS/2"].version2(t,e,o);else{if(a!=5)throw"unknown OS/2 table version: "+a;r["OS/2"].version5(t,e,o)}return o},r["OS/2"].version0=function(t,e,n){var a=r._bin;return n.xAvgCharWidth=a.readShort(t,e),e+=2,n.usWeightClass=a.readUshort(t,e),e+=2,n.usWidthClass=a.readUshort(t,e),e+=2,n.fsType=a.readUshort(t,e),e+=2,n.ySubscriptXSize=a.readShort(t,e),e+=2,n.ySubscriptYSize=a.readShort(t,e),e+=2,n.ySubscriptXOffset=a.readShort(t,e),e+=2,n.ySubscriptYOffset=a.readShort(t,e),e+=2,n.ySuperscriptXSize=a.readShort(t,e),e+=2,n.ySuperscriptYSize=a.readShort(t,e),e+=2,n.ySuperscriptXOffset=a.readShort(t,e),e+=2,n.ySuperscriptYOffset=a.readShort(t,e),e+=2,n.yStrikeoutSize=a.readShort(t,e),e+=2,n.yStrikeoutPosition=a.readShort(t,e),e+=2,n.sFamilyClass=a.readShort(t,e),e+=2,n.panose=a.readBytes(t,e,10),e+=10,n.ulUnicodeRange1=a.readUint(t,e),e+=4,n.ulUnicodeRange2=a.readUint(t,e),e+=4,n.ulUnicodeRange3=a.readUint(t,e),e+=4,n.ulUnicodeRange4=a.readUint(t,e),e+=4,n.achVendID=[a.readInt8(t,e),a.readInt8(t,e+1),a.readInt8(t,e+2),a.readInt8(t,e+3)],e+=4,n.fsSelection=a.readUshort(t,e),e+=2,n.usFirstCharIndex=a.readUshort(t,e),e+=2,n.usLastCharIndex=a.readUshort(t,e),e+=2,n.sTypoAscender=a.readShort(t,e),e+=2,n.sTypoDescender=a.readShort(t,e),e+=2,n.sTypoLineGap=a.readShort(t,e),e+=2,n.usWinAscent=a.readUshort(t,e),e+=2,n.usWinDescent=a.readUshort(t,e),e+=2},r["OS/2"].version1=function(t,e,n){var a=r._bin;return e=r["OS/2"].version0(t,e,n),n.ulCodePageRange1=a.readUint(t,e),e+=4,n.ulCodePageRange2=a.readUint(t,e),e+=4},r["OS/2"].version2=function(t,e,n){var a=r._bin;return e=r["OS/2"].version1(t,e,n),n.sxHeight=a.readShort(t,e),e+=2,n.sCapHeight=a.readShort(t,e),e+=2,n.usDefault=a.readUshort(t,e),e+=2,n.usBreak=a.readUshort(t,e),e+=2,n.usMaxContext=a.readUshort(t,e),e+=2},r["OS/2"].version5=function(t,e,n){var a=r._bin;return e=r["OS/2"].version2(t,e,n),n.usLowerOpticalPointSize=a.readUshort(t,e),e+=2,n.usUpperOpticalPointSize=a.readUshort(t,e),e+=2},r.post={},r.post.parse=function(t,e,n){var a=r._bin,o={};return o.version=a.readFixed(t,e),e+=4,o.italicAngle=a.readFixed(t,e),e+=4,o.underlinePosition=a.readShort(t,e),e+=2,o.underlineThickness=a.readShort(t,e),e+=2,o},r==null&&(r={}),r.U==null&&(r.U={}),r.U.codeToGlyph=function(t,e){var n=t.cmap,a=-1;if(n.p0e4!=null?a=n.p0e4:n.p3e1!=null?a=n.p3e1:n.p1e0!=null?a=n.p1e0:n.p0e3!=null&&(a=n.p0e3),a==-1)throw"no familiar platform and encoding!";var o=n.tables[a];if(o.format==0)return e>=o.map.length?0:o.map[e];if(o.format==4){for(var i=-1,f=0;f<o.endCount.length;f++)if(e<=o.endCount[f]){i=f;break}return i==-1||o.startCount[i]>e?0:65535&(o.idRangeOffset[i]!=0?o.glyphIdArray[e-o.startCount[i]+(o.idRangeOffset[i]>>1)-(o.idRangeOffset.length-i)]:e+o.idDelta[i])}if(o.format==12){if(e>o.groups[o.groups.length-1][1])return 0;for(f=0;f<o.groups.length;f++){var d=o.groups[f];if(d[0]<=e&&e<=d[1])return d[2]+(e-d[0])}return 0}throw"unknown cmap table format "+o.format},r.U.glyphToPath=function(t,e){var n={cmds:[],crds:[]};if(t.SVG&&t.SVG.entries[e]){var a=t.SVG.entries[e];return a==null?n:(typeof a=="string"&&(a=r.SVG.toPath(a),t.SVG.entries[e]=a),a)}if(t.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:t.CFF.Private?t.CFF.Private.defaultWidthX:0,open:!1},i=t.CFF,f=t.CFF.Private;if(i.ROS){for(var d=0;i.FDSelect[d+2]<=e;)d+=2;f=i.FDArray[i.FDSelect[d+1]].Private}r.U._drawCFF(t.CFF.CharStrings[e],o,i,f,n)}else t.glyf&&r.U._drawGlyf(e,t,n);return n},r.U._drawGlyf=function(t,e,n){var a=e.glyf[t];a==null&&(a=e.glyf[t]=r.glyf._parseGlyf(e,t)),a!=null&&(a.noc>-1?r.U._simpleGlyph(a,n):r.U._compoGlyph(a,e,n))},r.U._simpleGlyph=function(t,e){for(var n=0;n<t.noc;n++){for(var a=n==0?0:t.endPts[n-1]+1,o=t.endPts[n],i=a;i<=o;i++){var f=i==a?o:i-1,d=i==o?a:i+1,h=1&t.flags[i],p=1&t.flags[f],g=1&t.flags[d],x=t.xs[i],y=t.ys[i];if(i==a)if(h){if(!p){r.U.P.moveTo(e,x,y);continue}r.U.P.moveTo(e,t.xs[f],t.ys[f])}else p?r.U.P.moveTo(e,t.xs[f],t.ys[f]):r.U.P.moveTo(e,(t.xs[f]+x)/2,(t.ys[f]+y)/2);h?p&&r.U.P.lineTo(e,x,y):g?r.U.P.qcurveTo(e,x,y,t.xs[d],t.ys[d]):r.U.P.qcurveTo(e,x,y,(x+t.xs[d])/2,(y+t.ys[d])/2)}r.U.P.closePath(e)}},r.U._compoGlyph=function(t,e,n){for(var a=0;a<t.parts.length;a++){var o={cmds:[],crds:[]},i=t.parts[a];r.U._drawGlyf(i.glyphIndex,e,o);for(var f=i.m,d=0;d<o.crds.length;d+=2){var h=o.crds[d],p=o.crds[d+1];n.crds.push(h*f.a+p*f.b+f.tx),n.crds.push(h*f.c+p*f.d+f.ty)}for(d=0;d<o.cmds.length;d++)n.cmds.push(o.cmds[d])}},r.U._getGlyphClass=function(t,e){var n=r._lctf.getInterval(e,t);return n==-1?0:e[n+2]},r.U._applySubs=function(t,e,n,a){for(var o=t.length-e-1,i=0;i<n.tabs.length;i++)if(n.tabs[i]!=null){var f,d=n.tabs[i];if(!d.coverage||(f=r._lctf.coverageIndex(d.coverage,t[e]))!=-1){if(n.ltype==1)t[e],d.fmt==1?t[e]=t[e]+d.delta:t[e]=d.newg[f];else if(n.ltype==4)for(var h=d.vals[f],p=0;p<h.length;p++){var g=h[p],x=g.chain.length;if(!(x>o)){for(var y=!0,w=0,_=0;_<x;_++){for(;t[e+w+(1+_)]==-1;)w++;g.chain[_]!=t[e+w+(1+_)]&&(y=!1)}if(y){for(t[e]=g.nglyph,_=0;_<x+w;_++)t[e+_+1]=-1;break}}}else if(n.ltype==5&&d.fmt==2)for(var v=r._lctf.getInterval(d.cDef,t[e]),S=d.cDef[v+2],U=d.scset[S],A=0;A<U.length;A++){var k=U[A],E=k.input;if(!(E.length>o)){for(y=!0,_=0;_<E.length;_++){var j=r._lctf.getInterval(d.cDef,t[e+1+_]);if(v==-1&&d.cDef[j+2]!=E[_]){y=!1;break}}if(y){var F=k.substLookupRecords;for(p=0;p<F.length;p+=2)F[p],F[p+1]}}}else if(n.ltype==6&&d.fmt==3){if(!r.U._glsCovered(t,d.backCvg,e-d.backCvg.length)||!r.U._glsCovered(t,d.inptCvg,e)||!r.U._glsCovered(t,d.ahedCvg,e+d.inptCvg.length))continue;var V=d.lookupRec;for(A=0;A<V.length;A+=2){v=V[A];var M=a[V[A+1]];r.U._applySubs(t,e+v,M,a)}}}}},r.U._glsCovered=function(t,e,n){for(var a=0;a<e.length;a++)if(r._lctf.coverageIndex(e[a],t[n+a])==-1)return!1;return!0},r.U.glyphsToPath=function(t,e,n){for(var a={cmds:[],crds:[]},o=0,i=0;i<e.length;i++){var f=e[i];if(f!=-1){for(var d=i<e.length-1&&e[i+1]!=-1?e[i+1]:0,h=r.U.glyphToPath(t,f),p=0;p<h.crds.length;p+=2)a.crds.push(h.crds[p]+o),a.crds.push(h.crds[p+1]);for(n&&a.cmds.push(n),p=0;p<h.cmds.length;p++)a.cmds.push(h.cmds[p]);n&&a.cmds.push("X"),o+=t.hmtx.aWidth[f],i<e.length-1&&(o+=r.U.getPairAdjustment(t,f,d))}}return a},r.U.P={},r.U.P.moveTo=function(t,e,n){t.cmds.push("M"),t.crds.push(e,n)},r.U.P.lineTo=function(t,e,n){t.cmds.push("L"),t.crds.push(e,n)},r.U.P.curveTo=function(t,e,n,a,o,i,f){t.cmds.push("C"),t.crds.push(e,n,a,o,i,f)},r.U.P.qcurveTo=function(t,e,n,a,o){t.cmds.push("Q"),t.crds.push(e,n,a,o)},r.U.P.closePath=function(t){t.cmds.push("Z")},r.U._drawCFF=function(t,e,n,a,o){for(var i=e.stack,f=e.nStems,d=e.haveWidth,h=e.width,p=e.open,g=0,x=e.x,y=e.y,w=0,_=0,v=0,S=0,U=0,A=0,k=0,E=0,j=0,F=0,V={val:0,size:0};g<t.length;){r.CFF.getCharString(t,g,V);var M=V.val;if(g+=V.size,M=="o1"||M=="o18")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0;else if(M=="o3"||M=="o23")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0;else if(M=="o4")i.length>1&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),p&&r.U.P.closePath(o),y+=i.pop(),r.U.P.moveTo(o,x,y),p=!0;else if(M=="o5")for(;i.length>0;)x+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,x,y);else if(M=="o6"||M=="o7")for(var L=i.length,R=M=="o6",Y=0;Y<L;Y++){var H=i.shift();R?x+=H:y+=H,R=!R,r.U.P.lineTo(o,x,y)}else if(M=="o8"||M=="o24"){L=i.length;for(var q=0;q+6<=L;)w=x+i.shift(),_=y+i.shift(),v=w+i.shift(),S=_+i.shift(),x=v+i.shift(),y=S+i.shift(),r.U.P.curveTo(o,w,_,v,S,x,y),q+=6;M=="o24"&&(x+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,x,y))}else{if(M=="o11")break;if(M=="o1234"||M=="o1235"||M=="o1236"||M=="o1237")M=="o1234"&&(_=y,v=(w=x+i.shift())+i.shift(),F=S=_+i.shift(),A=S,E=y,x=(k=(U=(j=v+i.shift())+i.shift())+i.shift())+i.shift(),r.U.P.curveTo(o,w,_,v,S,j,F),r.U.P.curveTo(o,U,A,k,E,x,y)),M=="o1235"&&(w=x+i.shift(),_=y+i.shift(),v=w+i.shift(),S=_+i.shift(),j=v+i.shift(),F=S+i.shift(),U=j+i.shift(),A=F+i.shift(),k=U+i.shift(),E=A+i.shift(),x=k+i.shift(),y=E+i.shift(),i.shift(),r.U.P.curveTo(o,w,_,v,S,j,F),r.U.P.curveTo(o,U,A,k,E,x,y)),M=="o1236"&&(w=x+i.shift(),_=y+i.shift(),v=w+i.shift(),F=S=_+i.shift(),A=S,k=(U=(j=v+i.shift())+i.shift())+i.shift(),E=A+i.shift(),x=k+i.shift(),r.U.P.curveTo(o,w,_,v,S,j,F),r.U.P.curveTo(o,U,A,k,E,x,y)),M=="o1237"&&(w=x+i.shift(),_=y+i.shift(),v=w+i.shift(),S=_+i.shift(),j=v+i.shift(),F=S+i.shift(),U=j+i.shift(),A=F+i.shift(),k=U+i.shift(),E=A+i.shift(),Math.abs(k-x)>Math.abs(E-y)?x=k+i.shift():y=E+i.shift(),r.U.P.curveTo(o,w,_,v,S,j,F),r.U.P.curveTo(o,U,A,k,E,x,y));else if(M=="o14"){if(i.length>0&&!d&&(h=i.shift()+n.nominalWidthX,d=!0),i.length==4){var ie=i.shift(),N=i.shift(),z=i.shift(),b=i.shift(),T=r.CFF.glyphBySE(n,z),C=r.CFF.glyphBySE(n,b);r.U._drawCFF(n.CharStrings[T],e,n,a,o),e.x=ie,e.y=N,r.U._drawCFF(n.CharStrings[C],e,n,a,o)}p&&(r.U.P.closePath(o),p=!1)}else if(M=="o19"||M=="o20")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0,g+=f+7>>3;else if(M=="o21")i.length>2&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),y+=i.pop(),x+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,x,y),p=!0;else if(M=="o22")i.length>1&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),x+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,x,y),p=!0;else if(M=="o25"){for(;i.length>6;)x+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,x,y);w=x+i.shift(),_=y+i.shift(),v=w+i.shift(),S=_+i.shift(),x=v+i.shift(),y=S+i.shift(),r.U.P.curveTo(o,w,_,v,S,x,y)}else if(M=="o26")for(i.length%2&&(x+=i.shift());i.length>0;)w=x,_=y+i.shift(),x=v=w+i.shift(),y=(S=_+i.shift())+i.shift(),r.U.P.curveTo(o,w,_,v,S,x,y);else if(M=="o27")for(i.length%2&&(y+=i.shift());i.length>0;)_=y,v=(w=x+i.shift())+i.shift(),S=_+i.shift(),x=v+i.shift(),y=S,r.U.P.curveTo(o,w,_,v,S,x,y);else if(M=="o10"||M=="o29"){var I=M=="o10"?a:n;if(i.length!=0){var P=i.pop(),X=I.Subrs[P+I.Bias];e.x=x,e.y=y,e.nStems=f,e.haveWidth=d,e.width=h,e.open=p,r.U._drawCFF(X,e,n,a,o),x=e.x,y=e.y,f=e.nStems,d=e.haveWidth,h=e.width,p=e.open}}else if(M=="o30"||M=="o31"){var D=i.length,O=(q=0,M=="o31");for(q+=D-(L=-3&D);q<L;)O?(_=y,v=(w=x+i.shift())+i.shift(),y=(S=_+i.shift())+i.shift(),L-q==5?(x=v+i.shift(),q++):x=v,O=!1):(w=x,_=y+i.shift(),v=w+i.shift(),S=_+i.shift(),x=v+i.shift(),L-q==5?(y=S+i.shift(),q++):y=S,O=!0),r.U.P.curveTo(o,w,_,v,S,x,y),q+=4}else{if((M+"").charAt(0)=="o")throw M;i.push(M)}}}e.x=x,e.y=y,e.nStems=f,e.haveWidth=d,e.width=h,e.open=p};var l=r,c={Typr:l};return s.Typr=l,s.default=c,Object.defineProperty(s,"__esModule",{value:!0}),s}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function Ws(){return function(s){var r=Uint8Array,l=Uint16Array,c=Uint32Array,t=new r([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),e=new r([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),n=new r([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(M,L){for(var R=new l(31),Y=0;Y<31;++Y)R[Y]=L+=1<<M[Y-1];var H=new c(R[30]);for(Y=1;Y<30;++Y)for(var q=R[Y];q<R[Y+1];++q)H[q]=q-R[Y]<<5|Y;return[R,H]},o=a(t,2),i=o[0],f=o[1];i[28]=258,f[258]=28;for(var d=a(e,0)[0],h=new l(32768),p=0;p<32768;++p){var g=(43690&p)>>>1|(21845&p)<<1;g=(61680&(g=(52428&g)>>>2|(13107&g)<<2))>>>4|(3855&g)<<4,h[p]=((65280&g)>>>8|(255&g)<<8)>>>1}var x=function(M,L,R){for(var Y=M.length,H=0,q=new l(L);H<Y;++H)++q[M[H]-1];var ie,N=new l(L);for(H=0;H<L;++H)N[H]=N[H-1]+q[H-1]<<1;{ie=new l(1<<L);var z=15-L;for(H=0;H<Y;++H)if(M[H])for(var b=H<<4|M[H],T=L-M[H],C=N[M[H]-1]++<<T,I=C|(1<<T)-1;C<=I;++C)ie[h[C]>>>z]=b}return ie},y=new r(288);for(p=0;p<144;++p)y[p]=8;for(p=144;p<256;++p)y[p]=9;for(p=256;p<280;++p)y[p]=7;for(p=280;p<288;++p)y[p]=8;var w=new r(32);for(p=0;p<32;++p)w[p]=5;var _=x(y,9),v=x(w,5),S=function(M){for(var L=M[0],R=1;R<M.length;++R)M[R]>L&&(L=M[R]);return L},U=function(M,L,R){var Y=L/8|0;return(M[Y]|M[Y+1]<<8)>>(7&L)&R},A=function(M,L){var R=L/8|0;return(M[R]|M[R+1]<<8|M[R+2]<<16)>>(7&L)},k=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(M,L,R){var Y=new Error(L||k[M]);if(Y.code=M,Error.captureStackTrace&&Error.captureStackTrace(Y,E),!R)throw Y;return Y},j=function(M,L,R){var Y=M.length;if(!Y||R&&!R.l&&Y<5)return L||new r(0);var H=!L||R,q=!R||R.i;R||(R={}),L||(L=new r(3*Y));var ie,N=function(ue){var Re=L.length;if(ue>Re){var je=new r(Math.max(2*Re,ue));je.set(L),L=je}},z=R.f||0,b=R.p||0,T=R.b||0,C=R.l,I=R.d,P=R.m,X=R.n,D=8*Y;do{if(!C){R.f=z=U(M,b,1);var O=U(M,b+1,3);if(b+=3,!O){var K=M[(re=((ie=b)/8|0)+(7&ie&&1)+4)-4]|M[re-3]<<8,Q=re+K;if(Q>Y){q&&E(0);break}H&&N(T+K),L.set(M.subarray(re,Q),T),R.b=T+=K,R.p=b=8*Q;continue}if(O==1)C=_,I=v,P=9,X=5;else if(O==2){var G=U(M,b,31)+257,W=U(M,b+10,15)+4,de=G+U(M,b+5,31)+1;b+=14;for(var fe=new r(de),$=new r(19),ae=0;ae<W;++ae)$[n[ae]]=U(M,b+3*ae,7);b+=3*W;var oe=S($),Z=(1<<oe)-1,ne=x($,oe);for(ae=0;ae<de;){var re,B=ne[U(M,b,Z)];if(b+=15&B,(re=B>>>4)<16)fe[ae++]=re;else{var ge=0,ee=0;for(re==16?(ee=3+U(M,b,3),b+=2,ge=fe[ae-1]):re==17?(ee=3+U(M,b,7),b+=3):re==18&&(ee=11+U(M,b,127),b+=7);ee--;)fe[ae++]=ge}}var se=fe.subarray(0,G),J=fe.subarray(G);P=S(se),X=S(J),C=x(se,P),I=x(J,X)}else E(1);if(b>D){q&&E(0);break}}H&&N(T+131072);for(var Me=(1<<P)-1,te=(1<<X)-1,le=b;;le=b){var he=(ge=C[A(M,b)&Me])>>>4;if((b+=15&ge)>D){q&&E(0);break}if(ge||E(2),he<256)L[T++]=he;else{if(he==256){le=b,C=null;break}var ye=he-254;if(he>264){var ke=t[ae=he-257];ye=U(M,b,(1<<ke)-1)+i[ae],b+=ke}var Pe=I[A(M,b)&te],be=Pe>>>4;if(Pe||E(3),b+=15&Pe,J=d[be],be>3&&(ke=e[be],J+=A(M,b)&(1<<ke)-1,b+=ke),b>D){q&&E(0);break}H&&N(T+131072);for(var we=T+ye;T<we;T+=4)L[T]=L[T-J],L[T+1]=L[T+1-J],L[T+2]=L[T+2-J],L[T+3]=L[T+3-J];T=we}}R.l=C,R.p=le,R.b=T,C&&(z=1,R.m=P,R.d=I,R.n=X)}while(!z);return T==L.length?L:function(ue,Re,je){(je==null||je>ue.length)&&(je=ue.length);var qe=new(ue instanceof l?l:ue instanceof c?c:r)(je-Re);return qe.set(ue.subarray(Re,je)),qe}(L,0,T)},F=new r(0),V=typeof TextDecoder<"u"&&new TextDecoder;try{V.decode(F,{stream:!0})}catch{}return s.convert_streams=function(M){var L=new DataView(M),R=0;function Y(){var G=L.getUint16(R);return R+=2,G}function H(){var G=L.getUint32(R);return R+=4,G}function q(G){K.setUint16(Q,G),Q+=2}function ie(G){K.setUint32(Q,G),Q+=4}for(var N={signature:H(),flavor:H(),length:H(),numTables:Y(),reserved:Y(),totalSfntSize:H(),majorVersion:Y(),minorVersion:Y(),metaOffset:H(),metaLength:H(),metaOrigLength:H(),privOffset:H(),privLength:H()},z=0;Math.pow(2,z)<=N.numTables;)z++;z--;for(var b=16*Math.pow(2,z),T=16*N.numTables-b,C=12,I=[],P=0;P<N.numTables;P++)I.push({tag:H(),offset:H(),compLength:H(),origLength:H(),origChecksum:H()}),C+=16;var X,D=new Uint8Array(12+16*I.length+I.reduce(function(G,W){return G+W.origLength+4},0)),O=D.buffer,K=new DataView(O),Q=0;return ie(N.flavor),q(N.numTables),q(b),q(z),q(T),I.forEach(function(G){ie(G.tag),ie(G.origChecksum),ie(C),ie(G.origLength),G.outOffset=C,(C+=G.origLength)%4!=0&&(C+=4-C%4)}),I.forEach(function(G){var W,de=M.slice(G.offset,G.offset+G.compLength);if(G.compLength!=G.origLength){var fe=new Uint8Array(G.origLength);W=new Uint8Array(de,2),j(W,fe)}else fe=new Uint8Array(de);D.set(fe,G.outOffset);var $=0;(C=G.outOffset+G.origLength)%4!=0&&($=4-C%4),D.set(new Uint8Array($).buffer,G.outOffset+G.origLength),X=C+$}),O.slice(0,X)},Object.defineProperty(s,"__esModule",{value:!0}),s}({}).convert_streams}function Ns(s,r){const l={M:2,L:2,Q:4,C:6,Z:0},c={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},t=1,e=2,n=4,a=8,o=16,i=32;let f;function d(k){if(!f){const E={R:e,L:t,D:n,C:o,U:i,T:a};f=new Map;for(let j in c){let F=0;c[j].split(",").forEach(V=>{let[M,L]=V.split("+");M=parseInt(M,36),L=L?parseInt(L,36):0,f.set(F+=M,E[j]);for(let R=L;R--;)f.set(++F,E[j])})}}return f.get(k)||i}const h=1,p=2,g=3,x=4,y=[null,"isol","init","fina","medi"];function w(k){const E=new Uint8Array(k.length);let j=i,F=h,V=-1;for(let M=0;M<k.length;M++){const L=k.codePointAt(M);let R=d(L)|0,Y=h;R&a||(j&(t|n|o)?R&(e|n|o)?(Y=g,(F===h||F===g)&&E[V]++):R&(t|i)&&(F===p||F===x)&&E[V]--:j&(e|i)&&(F===p||F===x)&&E[V]--,F=E[M]=Y,j=R,V=M,L>65535&&M++)}return E}function _(k,E){const j=[];for(let V=0;V<E.length;V++){const M=E.codePointAt(V);M>65535&&V++,j.push(s.U.codeToGlyph(k,M))}const F=k.GSUB;if(F){const{lookupList:V,featureList:M}=F;let L;const R=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,Y=[];M.forEach(H=>{if(R.test(H.tag))for(let q=0;q<H.tab.length;q++){if(Y[H.tab[q]])continue;Y[H.tab[q]]=!0;const ie=V[H.tab[q]],N=/^(isol|init|fina|medi)$/.test(H.tag);N&&!L&&(L=w(E));for(let z=0;z<j.length;z++)(!L||!N||y[L[z]]===H.tag)&&s.U._applySubs(j,z,ie,V)}})}return j}function v(k,E){const j=new Int16Array(E.length*3);let F=0;for(;F<E.length;F++){const R=E[F];if(R===-1)continue;j[F*3+2]=k.hmtx.aWidth[R];const Y=k.GPOS;if(Y){const H=Y.lookupList;for(let q=0;q<H.length;q++){const ie=H[q];for(let N=0;N<ie.tabs.length;N++){const z=ie.tabs[N];if(ie.ltype===1){if(s._lctf.coverageIndex(z.coverage,R)!==-1&&z.pos){L(z.pos,F);break}}else if(ie.ltype===2){let b=null,T=V();if(T!==-1){const C=s._lctf.coverageIndex(z.coverage,E[T]);if(C!==-1){if(z.fmt===1){const I=z.pairsets[C];for(let P=0;P<I.length;P++)I[P].gid2===R&&(b=I[P])}else if(z.fmt===2){const I=s.U._getGlyphClass(E[T],z.classDef1),P=s.U._getGlyphClass(R,z.classDef2);b=z.matrix[I][P]}if(b){b.val1&&L(b.val1,T),b.val2&&L(b.val2,F);break}}}}else if(ie.ltype===4){const b=s._lctf.coverageIndex(z.markCoverage,R);if(b!==-1){const T=V(M),C=T===-1?-1:s._lctf.coverageIndex(z.baseCoverage,E[T]);if(C!==-1){const I=z.markArray[b],P=z.baseArray[C][I.markClass];j[F*3]=P.x-I.x+j[T*3]-j[T*3+2],j[F*3+1]=P.y-I.y+j[T*3+1];break}}}else if(ie.ltype===6){const b=s._lctf.coverageIndex(z.mark1Coverage,R);if(b!==-1){const T=V();if(T!==-1){const C=E[T];if(S(k,C)===3){const I=s._lctf.coverageIndex(z.mark2Coverage,C);if(I!==-1){const P=z.mark1Array[b],X=z.mark2Array[I][P.markClass];j[F*3]=X.x-P.x+j[T*3]-j[T*3+2],j[F*3+1]=X.y-P.y+j[T*3+1];break}}}}}}}}else if(k.kern&&!k.cff){const H=V();if(H!==-1){const q=k.kern.glyph1.indexOf(E[H]);if(q!==-1){const ie=k.kern.rval[q].glyph2.indexOf(R);ie!==-1&&(j[H*3+2]+=k.kern.rval[q].vals[ie])}}}}return j;function V(R){for(let Y=F-1;Y>=0;Y--)if(E[Y]!==-1&&(!R||R(E[Y])))return Y;return-1}function M(R){return S(k,R)===1}function L(R,Y){for(let H=0;H<3;H++)j[Y*3+H]+=R[H]||0}}function S(k,E){const j=k.GDEF&&k.GDEF.glyphClassDef;return j?s.U._getGlyphClass(E,j):0}function U(...k){for(let E=0;E<k.length;E++)if(typeof k[E]=="number")return k[E]}function A(k){const E=Object.create(null),j=k["OS/2"],F=k.hhea,V=k.head.unitsPerEm,M=U(j&&j.sTypoAscender,F&&F.ascender,V),L={unitsPerEm:V,ascender:M,descender:U(j&&j.sTypoDescender,F&&F.descender,0),capHeight:U(j&&j.sCapHeight,M),xHeight:U(j&&j.sxHeight,M),lineGap:U(j&&j.sTypoLineGap,F&&F.lineGap),supportsCodePoint(R){return s.U.codeToGlyph(k,R)>0},forEachGlyph(R,Y,H,q){let ie=0;const N=1/L.unitsPerEm*Y,z=_(k,R);let b=0;const T=v(k,z);return z.forEach((C,I)=>{if(C!==-1){let P=E[C];if(!P){const{cmds:X,crds:D}=s.U.glyphToPath(k,C);let O="",K=0;for(let fe=0,$=X.length;fe<$;fe++){const ae=l[X[fe]];O+=X[fe];for(let oe=1;oe<=ae;oe++)O+=(oe>1?",":"")+D[K++]}let Q,G,W,de;if(D.length){Q=G=1/0,W=de=-1/0;for(let fe=0,$=D.length;fe<$;fe+=2){let ae=D[fe],oe=D[fe+1];ae<Q&&(Q=ae),oe<G&&(G=oe),ae>W&&(W=ae),oe>de&&(de=oe)}}else Q=W=G=de=0;P=E[C]={index:C,advanceWidth:k.hmtx.aWidth[C],xMin:Q,yMin:G,xMax:W,yMax:de,path:O}}q.call(null,P,ie+T[I*3]*N,T[I*3+1]*N,b),ie+=T[I*3+2]*N,H&&(ie+=H*Y)}b+=R.codePointAt(b)>65535?2:1}),ie}};return L}return function(E){const j=new Uint8Array(E,0,4),F=s._bin.readASCII(j,0,4);if(F==="wOFF")E=r(E);else if(F==="wOF2")throw new Error("woff2 fonts not supported");return A(s.parse(E)[0])}}const Vs=Ht({name:"Typr Font Parser",dependencies:[Bs,Ws,Ns],init(s,r,l){const c=s(),t=r();return l(c,t)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function Hs(){return function(s){var r=function(){this.buckets=new Map};r.prototype.add=function(v){var S=v>>5;this.buckets.set(S,(this.buckets.get(S)||0)|1<<(31&v))},r.prototype.has=function(v){var S=this.buckets.get(v>>5);return S!==void 0&&(S&1<<(31&v))!=0},r.prototype.serialize=function(){var v=[];return this.buckets.forEach(function(S,U){v.push((+U).toString(36)+":"+S.toString(36))}),v.join(",")},r.prototype.deserialize=function(v){var S=this;this.buckets.clear(),v.split(",").forEach(function(U){var A=U.split(":");S.buckets.set(parseInt(A[0],36),parseInt(A[1],36))})};var l=Math.pow(2,8),c=l-1,t=~c;function e(v){var S=function(A){return A&t}(v).toString(16),U=function(A){return(A&t)+l-1}(v).toString(16);return"codepoint-index/plane"+(v>>16)+"/"+S+"-"+U+".json"}function n(v,S){var U=v&c,A=S.codePointAt(U/6|0);return((A=(A||48)-48)&1<<U%6)!=0}function a(v,S){var U;(U=v,U.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(A){return A.split("-").map(function(k){return parseInt(k.trim(),16)})})).forEach(function(A){var k=A[0],E=A[1];E===void 0&&(E=k),S(k,E)})}function o(v,S){a(v,function(U,A){for(var k=U;k<=A;k++)S(k)})}var i={},f={},d=new WeakMap,h="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function p(v){var S=d.get(v);return S||(S=new r,o(v.ranges,function(U){return S.add(U)}),d.set(v,S)),S}var g,x=new Map;function y(v,S,U){return v[S]?S:v[U]?U:function(A){for(var k in A)return k}(v)}function w(v,S){var U=S;if(!v.includes(U)){U=1/0;for(var A=0;A<v.length;A++)Math.abs(v[A]-S)<Math.abs(U-S)&&(U=v[A])}return U}function _(v){return g||(g=new Set,o("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(S){g.add(S)})),g.has(v)}return s.CodePointSet=r,s.clearCache=function(){i={},f={}},s.getFontsForString=function(v,S){S===void 0&&(S={});var U,A=S.lang;A===void 0&&(A=new RegExp("\\p{Script=Hangul}","u").test(U=v)?"ko":new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}","u").test(U)?"ja":"en");var k=S.category;k===void 0&&(k="sans-serif");var E=S.style;E===void 0&&(E="normal");var j=S.weight;j===void 0&&(j=400);var F=(S.dataUrl||h).replace(/\/$/g,""),V=new Map,M=new Uint8Array(v.length),L={},R={},Y=new Array(v.length),H=new Map,q=!1;function ie(b){var T=x.get(b);return T||(T=fetch(F+"/"+b).then(function(C){if(!C.ok)throw new Error(C.statusText);return C.json().then(function(I){if(!Array.isArray(I)||I[0]!==1)throw new Error("Incorrect schema version; need 1, got "+I[0]);return I[1]})}).catch(function(C){if(F!==h)return q||(q=!0),F=h,x.delete(b),ie(b);throw C}),x.set(b,T)),T}for(var N=function(b){var T=v.codePointAt(b),C=e(T);Y[b]=C,i[C]||H.has(C)||H.set(C,ie(C).then(function(I){i[C]=I})),T>65535&&(b++,z=b)},z=0;z<v.length;z++)N(z);return Promise.all(H.values()).then(function(){H.clear();for(var b=function(C){var I=v.codePointAt(C),P=null,X=i[Y[C]],D=void 0;for(var O in X){var K=R[O];if(K===void 0&&(K=R[O]=new RegExp(O).test(A||"en")),K){for(var Q in D=O,X[O])if(n(I,X[O][Q])){P=Q;break}break}}if(!P){e:for(var G in X)if(G!==D){for(var W in X[G])if(n(I,X[G][W])){P=W;break e}}}P||(P="latin"),Y[C]=P,f[P]||H.has(P)||H.set(P,ie("font-meta/"+P+".json").then(function(de){f[P]=de})),I>65535&&(C++,T=C)},T=0;T<v.length;T++)b(T);return Promise.all(H.values())}).then(function(){for(var b,T=null,C=0;C<v.length;C++){var I=v.codePointAt(C);if(T&&(_(I)||p(T).has(I)))M[C]=M[C-1];else{T=f[Y[C]];var P=L[T.id];if(!P){var X=T.typeforms,D=y(X,k,"sans-serif"),O=y(X[D],E,"normal"),K=w((b=X[D])===null||b===void 0?void 0:b[O],j);P=L[T.id]=F+"/font-files/"+T.id+"/"+D+"."+O+"."+K+".woff"}var Q=V.get(P);Q==null&&(Q=V.size,V.set(P,Q)),M[C]=Q}I>65535&&(C++,M[C]=M[C-1])}return{fontUrls:Array.from(V.keys()),chars:M}})},Object.defineProperty(s,"__esModule",{value:!0}),s}({})}function Xs(s,r){const l=Object.create(null),c=Object.create(null);function t(n,a){const o=i=>{};try{const i=new XMLHttpRequest;i.open("get",n,!0),i.responseType="arraybuffer",i.onload=function(){if(i.status>=400)o(new Error(i.statusText));else if(i.status>0)try{const f=s(i.response);f.src=n,a(f)}catch(f){o(f)}},i.onerror=o,i.send()}catch(i){o(i)}}function e(n,a){let o=l[n];o?a(o):c[n]?c[n].push(a):(c[n]=[a],t(n,i=>{i.src=n,l[n]=i,c[n].forEach(f=>f(i)),delete c[n]}))}return function(n,a,{lang:o,fonts:i=[],style:f="normal",weight:d="normal",unicodeFontsURL:h}={}){const p=new Uint8Array(n.length),g=[];n.length||_();const x=new Map,y=[];if(f!=="italic"&&(f="normal"),typeof d!="number"&&(d=d==="bold"?700:400),i&&!Array.isArray(i)&&(i=[i]),i=i.slice().filter(S=>!S.lang||S.lang.test(o)).reverse(),i.length){let k=0;(function E(j=0){for(let F=j,V=n.length;F<V;F++){const M=n.codePointAt(F);if(k===1&&g[p[F-1]].supportsCodePoint(M)||/\s/.test(n[F]))p[F]=p[F-1],k===2&&(y[y.length-1][1]=F);else for(let L=p[F],R=i.length;L<=R;L++)if(L===R){const Y=k===2?y[y.length-1]:y[y.length]=[F,F];Y[1]=F,k=2}else{p[F]=L;const{src:Y,unicodeRange:H}=i[L];if(!H||v(M,H)){const q=l[Y];if(!q){e(Y,()=>{E(F)});return}if(q.supportsCodePoint(M)){let ie=x.get(q);typeof ie!="number"&&(ie=g.length,g.push(q),x.set(q,ie)),p[F]=ie,k=1;break}}}M>65535&&F+1<V&&(p[F+1]=p[F],F++,k===2&&(y[y.length-1][1]=F))}w()})()}else y.push([0,n.length-1]),w();function w(){if(y.length){const S=y.map(U=>n.substring(U[0],U[1]+1)).join(`
`);r.getFontsForString(S,{lang:o||void 0,style:f,weight:d,dataUrl:h}).then(({fontUrls:U,chars:A})=>{const k=g.length;let E=0;y.forEach(F=>{for(let V=0,M=F[1]-F[0];V<=M;V++)p[F[0]+V]=A[E++]+k;E++});let j=0;U.forEach((F,V)=>{e(F,M=>{g[V+k]=M,++j===U.length&&_()})})})}else _()}function _(){a({chars:p,fonts:g})}function v(S,U){for(let A=0;A<U.length;A++){const[k,E=k]=U[A];if(k<=S&&S<=E)return!0}return!1}}}const Ys=Ht({name:"FontResolver",dependencies:[Xs,Vs,Hs],init(s,r,l){return s(r,l())}});function Zs(s,r){const c=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,t="[^\\S\\u00A0]",e=new RegExp(`${t}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function n({text:g,lang:x,fonts:y,style:w,weight:_,preResolvedFonts:v,unicodeFontsURL:S},U){const A=({chars:k,fonts:E})=>{let j,F;const V=[];for(let M=0;M<k.length;M++)k[M]!==F?(F=k[M],V.push(j={start:M,end:M,fontObj:E[k[M]]})):j.end=M;U(V)};v?A(v):s(g,A,{lang:x,fonts:y,style:w,weight:_,unicodeFontsURL:S})}function a({text:g="",font:x,lang:y,sdfGlyphSize:w=64,fontSize:_=400,fontWeight:v=1,fontStyle:S="normal",letterSpacing:U=0,lineHeight:A="normal",maxWidth:k=1/0,direction:E,textAlign:j="left",textIndent:F=0,whiteSpace:V="normal",overflowWrap:M="normal",anchorX:L=0,anchorY:R=0,metricsOnly:Y=!1,unicodeFontsURL:H,preResolvedFonts:q=null,includeCaretPositions:ie=!1,chunkedBoundsSize:N=8192,colorRanges:z=null},b){const T=d(),C={fontLoad:0,typesetting:0};g.indexOf("\r")>-1&&(g=g.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),_=+_,U=+U,k=+k,A=A||"normal",F=+F,n({text:g,lang:y,style:S,weight:v,fonts:typeof x=="string"?[{src:x}]:x,unicodeFontsURL:H,preResolvedFonts:q},I=>{C.fontLoad=d()-T;const P=isFinite(k);let X=null,D=null,O=null,K=null,Q=null,G=null,W=null,de=null,fe=0,$=0,ae=V!=="nowrap";const oe=new Map,Z=d();let ne=F,re=0,B=new h;const ge=[B];I.forEach(te=>{const{fontObj:le}=te,{ascender:he,descender:ye,unitsPerEm:ke,lineGap:Pe,capHeight:be,xHeight:we}=le;let ue=oe.get(le);if(!ue){const ve=_/ke,_e=A==="normal"?(he-ye+Pe)*ve:A*_,xt=(_e-(he-ye)*ve)/2,Te=Math.min(_e,(he-ye)*ve),Se=(he+ye)/2*ve+Te/2;ue={index:oe.size,src:le.src,fontObj:le,fontSizeMult:ve,unitsPerEm:ke,ascender:he*ve,descender:ye*ve,capHeight:be*ve,xHeight:we*ve,lineHeight:_e,baseline:-xt-he*ve,caretTop:Se,caretBottom:Se-Te},oe.set(le,ue)}const{fontSizeMult:Re}=ue,je=g.slice(te.start,te.end+1);let qe,Ce;le.forEachGlyph(je,_,U,(ve,_e,xt,Te)=>{_e+=re,Te+=te.start,qe=_e,Ce=ve;const Se=g.charAt(Te),Fe=ve.advanceWidth*Re,Ae=B.count;let xe;if("isEmpty"in ve||(ve.isWhitespace=!!Se&&new RegExp(t).test(Se),ve.canBreakAfter=!!Se&&e.test(Se),ve.isEmpty=ve.xMin===ve.xMax||ve.yMin===ve.yMax||c.test(Se)),!ve.isWhitespace&&!ve.isEmpty&&$++,ae&&P&&!ve.isWhitespace&&_e+Fe+ne>k&&Ae){if(B.glyphAt(Ae-1).glyphObj.canBreakAfter)xe=new h,ne=-_e;else for(let Xe=Ae;Xe--;)if(Xe===0&&M==="break-word"){xe=new h,ne=-_e;break}else if(B.glyphAt(Xe).glyphObj.canBreakAfter){xe=B.splitAt(Xe+1);const Ve=xe.glyphAt(0).x;ne-=Ve;for(let Le=xe.count;Le--;)xe.glyphAt(Le).x-=Ve;break}xe&&(B.isSoftWrapped=!0,B=xe,ge.push(B),fe=k)}let Ee=B.glyphAt(B.count);Ee.glyphObj=ve,Ee.x=_e+ne,Ee.y=xt,Ee.width=Fe,Ee.charIndex=Te,Ee.fontData=ue,Se===`
`&&(B=new h,ge.push(B),ne=-(_e+Fe+U*_)+F)}),re=qe+Ce.advanceWidth*Re+U*_});let ee=0;ge.forEach(te=>{let le=!0;for(let he=te.count;he--;){const ye=te.glyphAt(he);le&&!ye.glyphObj.isWhitespace&&(te.width=ye.x+ye.width,te.width>fe&&(fe=te.width),le=!1);let{lineHeight:ke,capHeight:Pe,xHeight:be,baseline:we}=ye.fontData;ke>te.lineHeight&&(te.lineHeight=ke);const ue=we-te.baseline;ue<0&&(te.baseline+=ue,te.cap+=ue,te.ex+=ue),te.cap=Math.max(te.cap,te.baseline+Pe),te.ex=Math.max(te.ex,te.baseline+be)}te.baseline-=ee,te.cap-=ee,te.ex-=ee,ee+=te.lineHeight});let se=0,J=0;if(L&&(typeof L=="number"?se=-L:typeof L=="string"&&(se=-fe*(L==="left"?0:L==="center"?.5:L==="right"?1:i(L)))),R&&(typeof R=="number"?J=-R:typeof R=="string"&&(J=R==="top"?0:R==="top-baseline"?-ge[0].baseline:R==="top-cap"?-ge[0].cap:R==="top-ex"?-ge[0].ex:R==="middle"?ee/2:R==="bottom"?ee:R==="bottom-baseline"?-ge[ge.length-1].baseline:i(R)*ee)),!Y){const te=r.getEmbeddingLevels(g,E);X=new Uint16Array($),D=new Uint8Array($),O=new Float32Array($*2),K={},W=[1/0,1/0,-1/0,-1/0],de=[],ie&&(G=new Float32Array(g.length*4)),z&&(Q=new Uint8Array($*3));let le=0,he=-1,ye=-1,ke,Pe;if(ge.forEach((be,we)=>{let{count:ue,width:Re}=be;if(ue>0){let je=0;for(let Te=ue;Te--&&be.glyphAt(Te).glyphObj.isWhitespace;)je++;let qe=0,Ce=0;if(j==="center")qe=(fe-Re)/2;else if(j==="right")qe=fe-Re;else if(j==="justify"&&be.isSoftWrapped){let Te=0;for(let Se=ue-je;Se--;)be.glyphAt(Se).glyphObj.isWhitespace&&Te++;Ce=(fe-Re)/Te}if(Ce||qe){let Te=0;for(let Se=0;Se<ue;Se++){let Fe=be.glyphAt(Se);const Ae=Fe.glyphObj;Fe.x+=qe+Te,Ce!==0&&Ae.isWhitespace&&Se<ue-je&&(Te+=Ce,Fe.width+=Ce)}}const ve=r.getReorderSegments(g,te,be.glyphAt(0).charIndex,be.glyphAt(be.count-1).charIndex);for(let Te=0;Te<ve.length;Te++){const[Se,Fe]=ve[Te];let Ae=1/0,xe=-1/0;for(let Ee=0;Ee<ue;Ee++)if(be.glyphAt(Ee).charIndex>=Se){let Xe=Ee,Ve=Ee;for(;Ve<ue;Ve++){let Le=be.glyphAt(Ve);if(Le.charIndex>Fe)break;Ve<ue-je&&(Ae=Math.min(Ae,Le.x),xe=Math.max(xe,Le.x+Le.width))}for(let Le=Xe;Le<Ve;Le++){const nt=be.glyphAt(Le);nt.x=xe-(nt.x+nt.width-Ae)}break}}let _e;const xt=Te=>_e=Te;for(let Te=0;Te<ue;Te++){const Se=be.glyphAt(Te);_e=Se.glyphObj;const Fe=_e.index,Ae=te.levels[Se.charIndex]&1;if(Ae){const xe=r.getMirroredCharacter(g[Se.charIndex]);xe&&Se.fontData.fontObj.forEachGlyph(xe,0,0,xt)}if(ie){const{charIndex:xe,fontData:Ee}=Se,Xe=Se.x+se,Ve=Se.x+Se.width+se;G[xe*4]=Ae?Ve:Xe,G[xe*4+1]=Ae?Xe:Ve,G[xe*4+2]=be.baseline+Ee.caretBottom+J,G[xe*4+3]=be.baseline+Ee.caretTop+J;const Le=xe-he;Le>1&&f(G,he,Le),he=xe}if(z){const{charIndex:xe}=Se;for(;xe>ye;)ye++,z.hasOwnProperty(ye)&&(Pe=z[ye])}if(!_e.isWhitespace&&!_e.isEmpty){const xe=le++,{fontSizeMult:Ee,src:Xe,index:Ve}=Se.fontData,Le=K[Xe]||(K[Xe]={});Le[Fe]||(Le[Fe]={path:_e.path,pathBounds:[_e.xMin,_e.yMin,_e.xMax,_e.yMax]});const nt=Se.x+se,bt=Se.y+be.baseline+J;O[xe*2]=nt,O[xe*2+1]=bt;const mt=nt+_e.xMin*Ee,wt=bt+_e.yMin*Ee,Tt=nt+_e.xMax*Ee,vt=bt+_e.yMax*Ee;mt<W[0]&&(W[0]=mt),wt<W[1]&&(W[1]=wt),Tt>W[2]&&(W[2]=Tt),vt>W[3]&&(W[3]=vt),xe%N===0&&(ke={start:xe,end:xe,rect:[1/0,1/0,-1/0,-1/0]},de.push(ke)),ke.end++;const Ye=ke.rect;if(mt<Ye[0]&&(Ye[0]=mt),wt<Ye[1]&&(Ye[1]=wt),Tt>Ye[2]&&(Ye[2]=Tt),vt>Ye[3]&&(Ye[3]=vt),X[xe]=Fe,D[xe]=Ve,z){const Ut=xe*3;Q[Ut]=Pe>>16&255,Q[Ut+1]=Pe>>8&255,Q[Ut+2]=Pe&255}}}}}),G){const be=g.length-he;be>1&&f(G,he,be)}}const Me=[];oe.forEach(({index:te,src:le,unitsPerEm:he,ascender:ye,descender:ke,lineHeight:Pe,capHeight:be,xHeight:we})=>{Me[te]={src:le,unitsPerEm:he,ascender:ye,descender:ke,lineHeight:Pe,capHeight:be,xHeight:we}}),C.typesetting=d()-Z,b({glyphIds:X,glyphFontIndices:D,glyphPositions:O,glyphData:K,fontData:Me,caretPositions:G,glyphColors:Q,chunkedBounds:de,fontSize:_,topBaseline:J+ge[0].baseline,blockBounds:[se,J-ee,se+fe,J],visibleBounds:W,timings:C})})}function o(g,x){a({...g,metricsOnly:!0},y=>{const[w,_,v,S]=y.blockBounds;x({width:v-w,height:S-_})})}function i(g){let x=g.match(/^([\d.]+)%$/),y=x?parseFloat(x[1]):NaN;return isNaN(y)?0:y/100}function f(g,x,y){const w=g[x*4],_=g[x*4+1],v=g[x*4+2],S=g[x*4+3],U=(_-w)/y;for(let A=0;A<y;A++){const k=(x+A)*4;g[k]=w+U*A,g[k+1]=w+U*(A+1),g[k+2]=v,g[k+3]=S}}function d(){return(self.performance||Date).now()}function h(){this.data=[]}const p=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/p.length)},glyphAt(g){let x=h.flyweight;return x.data=this.data,x.index=g,x},splitAt(g){let x=new h;return x.data=this.data.splice(g*p.length),x}},h.flyweight=p.reduce((g,x,y,w)=>(Object.defineProperty(g,x,{get(){return this.data[this.index*p.length+y]},set(_){this.data[this.index*p.length+y]=_}}),g),{data:null,index:0}),{typeset:a,measure:o}}const At=()=>(self.performance||Date).now(),Nr=Oa();let ia;function qs(s,r,l,c,t,e,n,a,o,i,f=!0){return f?Ks(s,r,l,c,t,e,n,a,o,i).then(null,d=>(ia||(ia=!0),la(s,r,l,c,t,e,n,a,o,i))):la(s,r,l,c,t,e,n,a,o,i)}const Dr=[],Qs=5;let Cn=0;function Wa(){const s=At();for(;Dr.length&&At()-s<Qs;)Dr.shift()();Cn=Dr.length?setTimeout(Wa,0):0}const Ks=(...s)=>new Promise((r,l)=>{Dr.push(()=>{const c=At();try{Nr.webgl.generateIntoCanvas(...s),r({timing:At()-c})}catch(t){l(t)}}),Cn||(Cn=setTimeout(Wa,0))}),Js=4,$s=2e3,sa={};let el=0;function la(s,r,l,c,t,e,n,a,o,i){const f="TroikaTextSDFGenerator_JS_"+el++%Js;let d=sa[f];return d||(d=sa[f]={workerModule:Ht({name:f,workerId:f,dependencies:[Oa,At],init(h,p){const g=h().javascript.generate;return function(...x){const y=p();return{textureData:g(...x),timing:p()-y}}},getTransferables(h){return[h.textureData.buffer]}}),requests:0,idleTimer:null}),d.requests++,clearTimeout(d.idleTimer),d.workerModule(s,r,l,c,t,e).then(({textureData:h,timing:p})=>{const g=At(),x=new Uint8Array(h.length*4);for(let y=0;y<h.length;y++)x[y*4+i]=h[y];return Nr.webglUtils.renderImageData(n,x,a,o,s,r,1<<3-i),p+=At()-g,--d.requests===0&&(d.idleTimer=setTimeout(()=>{Es(f)},$s)),{timing:p}})}function tl(s){s._warm||(Nr.webgl.isSupported(s),s._warm=!0)}const rl=Nr.webglUtils.resizeWebGLCanvasWithoutClearing,fr={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},nl=new Ue;function Dt(){return(self.performance||Date).now()}const ca=Object.create(null);function Na(s,r){s=il({},s);const l=Dt(),c=[];if(s.font&&c.push({label:"user",src:sl(s.font)}),s.font=c,s.text=""+s.text,s.sdfGlyphSize=s.sdfGlyphSize||fr.sdfGlyphSize,s.unicodeFontsURL=s.unicodeFontsURL||fr.unicodeFontsURL,s.colorRanges!=null){let d={};for(let h in s.colorRanges)if(s.colorRanges.hasOwnProperty(h)){let p=s.colorRanges[h];typeof p!="number"&&(p=nl.set(p).getHex()),d[h]=p}s.colorRanges=d}Object.freeze(s);const{textureWidth:t,sdfExponent:e}=fr,{sdfGlyphSize:n}=s,a=t/n*4;let o=ca[n];if(!o){const d=document.createElement("canvas");d.width=t,d.height=n*256/a,o=ca[n]={glyphCount:0,sdfGlyphSize:n,sdfCanvas:d,sdfTexture:new mi(d,void 0,void 0,void 0,fo,fo),contextLost:!1,glyphsByFont:new Map},o.sdfTexture.generateMipmaps=!1,ol(o)}const{sdfTexture:i,sdfCanvas:f}=o;cl(s).then(d=>{const{glyphIds:h,glyphFontIndices:p,fontData:g,glyphPositions:x,fontSize:y,timings:w}=d,_=[],v=new Float32Array(h.length*4);let S=0,U=0;const A=Dt(),k=g.map(M=>{let L=o.glyphsByFont.get(M.src);return L||o.glyphsByFont.set(M.src,L=new Map),L});h.forEach((M,L)=>{const R=p[L],{src:Y,unitsPerEm:H}=g[R];let q=k[R].get(M);if(!q){const{path:T,pathBounds:C}=d.glyphData[Y][M],I=Math.max(C[2]-C[0],C[3]-C[1])/n*(fr.sdfMargin*n+.5),P=o.glyphCount++,X=[C[0]-I,C[1]-I,C[2]+I,C[3]+I];k[R].set(M,q={path:T,atlasIndex:P,sdfViewBox:X}),_.push(q)}const{sdfViewBox:ie}=q,N=x[U++],z=x[U++],b=y/H;v[S++]=N+ie[0]*b,v[S++]=z+ie[1]*b,v[S++]=N+ie[2]*b,v[S++]=z+ie[3]*b,h[L]=q.atlasIndex}),w.quads=(w.quads||0)+(Dt()-A);const E=Dt();w.sdf={};const j=f.height,F=Math.ceil(o.glyphCount/a),V=Math.pow(2,Math.ceil(Math.log2(F*n)));V>j&&(rl(f,t,V),i.dispose()),Promise.all(_.map(M=>Va(M,o,s.gpuAccelerateSDF).then(({timing:L})=>{w.sdf[M.atlasIndex]=L}))).then(()=>{_.length&&!o.contextLost&&(Ha(o),i.needsUpdate=!0),w.sdfTotal=Dt()-E,w.total=Dt()-l,r(Object.freeze({parameters:s,sdfTexture:i,sdfGlyphSize:n,sdfExponent:e,glyphBounds:v,glyphAtlasIndices:h,glyphColors:d.glyphColors,caretPositions:d.caretPositions,chunkedBounds:d.chunkedBounds,ascender:d.ascender,descender:d.descender,lineHeight:d.lineHeight,capHeight:d.capHeight,xHeight:d.xHeight,topBaseline:d.topBaseline,blockBounds:d.blockBounds,visibleBounds:d.visibleBounds,timings:d.timings}))})}),Promise.resolve().then(()=>{o.contextLost||tl(f)})}function Va({path:s,atlasIndex:r,sdfViewBox:l},{sdfGlyphSize:c,sdfCanvas:t,contextLost:e},n){if(e)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:o}=fr,i=Math.max(l[2]-l[0],l[3]-l[1]),f=Math.floor(r/4),d=f%(a/c)*c,h=Math.floor(f/(a/c))*c,p=r%4;return qs(c,c,s,l,i,o,t,d,h,p,n)}function ol(s){const r=s.sdfCanvas;r.addEventListener("webglcontextlost",l=>{l.preventDefault(),s.contextLost=!0}),r.addEventListener("webglcontextrestored",l=>{s.contextLost=!1;const c=[];s.glyphsByFont.forEach(t=>{t.forEach(e=>{c.push(Va(e,s,!0))})}),Promise.all(c).then(()=>{Ha(s),s.sdfTexture.needsUpdate=!0})})}function al({font:s,characters:r,sdfGlyphSize:l},c){let t=Array.isArray(r)?r.join(`
`):""+r;Na({font:s,sdfGlyphSize:l,text:t},c)}function il(s,r){for(let l in r)r.hasOwnProperty(l)&&(s[l]=r[l]);return s}let Rr;function sl(s){return Rr||(Rr=typeof document>"u"?{}:document.createElement("a")),Rr.href=s,Rr.href}function Ha(s){if(typeof createImageBitmap!="function"){const{sdfCanvas:r,sdfTexture:l}=s,{width:c,height:t}=r,e=s.sdfCanvas.getContext("webgl");let n=l.image.data;(!n||n.length!==c*t*4)&&(n=new Uint8Array(c*t*4),l.image={width:c,height:t,data:n},l.flipY=!1,l.isDataTexture=!0),e.readPixels(0,0,c,t,e.RGBA,e.UNSIGNED_BYTE,n)}}const ll=Ht({name:"Typesetter",dependencies:[Zs,Ys,Rs],init(s,r,l){return s(r,l())}}),cl=Ht({name:"Typesetter",dependencies:[ll],init(s){return function(r){return new Promise(l=>{s.typeset(r,l)})}},getTransferables(s){const r=[];for(let l in s)s[l]&&s[l].buffer&&r.push(s[l].buffer);return r}}),fa={};function fl(s){let r=fa[s];if(!r){const l=new Wr(1,1,s,s),c=l.clone(),t=l.attributes,e=c.attributes,n=new gi,a=t.uv.count;for(let o=0;o<a;o++)e.position.array[o*3]*=-1,e.normal.array[o*3+2]*=-1;["position","normal","uv"].forEach(o=>{n.setAttribute(o,new xn([...t[o].array,...e[o].array],t[o].itemSize))}),n.setIndex([...l.index.array,...c.index.array.map(o=>o+a)]),n.translate(.5,.5,0),r=fa[s]=n}return r}const ul="aTroikaGlyphBounds",ua="aTroikaGlyphIndex",dl="aTroikaGlyphColor";class hl extends Ca{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new Pn,this.boundingBox=new Br}computeBoundingSphere(){}computeBoundingBox(){}setSide(r){const l=this.getIndex().count;this.setDrawRange(r===De?l/2:0,r===Ze?l:l/2)}set detail(r){if(r!==this._detail){this._detail=r,(typeof r!="number"||r<1)&&(r=1);let l=fl(r);["position","normal","uv"].forEach(c=>{this.attributes[c]=l.attributes[c].clone()}),this.setIndex(l.getIndex().clone())}}get detail(){return this._detail}set curveRadius(r){r!==this._curveRadius&&(this._curveRadius=r,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(r,l,c,t,e){vn(this,ul,r,4),vn(this,ua,l,1),vn(this,dl,e,3),this._blockBounds=c,this._chunkedBounds=t,this.instanceCount=l.length,this._updateBounds()}_updateBounds(){const r=this._blockBounds;if(r){const{curveRadius:l,boundingBox:c}=this;if(l){const{PI:t,floor:e,min:n,max:a,sin:o,cos:i}=Math,f=t/2,d=t*2,h=Math.abs(l),p=r[0]/h,g=r[2]/h,x=e((p+f)/d)!==e((g+f)/d)?-h:n(o(p)*h,o(g)*h),y=e((p-f)/d)!==e((g-f)/d)?h:a(o(p)*h,o(g)*h),w=e((p+t)/d)!==e((g+t)/d)?h*2:a(h-i(p)*h,h-i(g)*h);c.min.set(x,r[1],l<0?-w:0),c.max.set(y,r[3],l<0?0:w)}else c.min.set(r[0],r[1],0),c.max.set(r[2],r[3],0);c.getBoundingSphere(this.boundingSphere)}}applyClipRect(r){let l=this.getAttribute(ua).count,c=this._chunkedBounds;if(c)for(let t=c.length;t--;){l=c[t].end;let e=c[t].rect;if(e[1]<r.w&&e[3]>r.y&&e[0]<r.z&&e[2]>r.x)break}this.instanceCount=l}}function vn(s,r,l,c){const t=s.getAttribute(r);l?t&&t.array.length===l.length?(t.array.set(l),t.needsUpdate=!0):(s.setAttribute(r,new yi(l,c)),delete s._maxInstanceCount,s.dispose()):t&&s.deleteAttribute(r)}const pl=`
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
`,ml=`
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
`,vl=`
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
`,gl=`
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
`;function yl(s){const r=kn(s,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new pt},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new rt(0,0,0,0)},uTroikaClipRect:{value:new rt(0,0,0,0)},uTroikaDistanceOffset:{value:0},uTroikaOutlineOpacity:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new pt},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new Ue},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new vi},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:pl,vertexTransform:ml,fragmentDefs:vl,fragmentColorTransform:gl,customRewriter({vertexShader:l,fragmentShader:c}){let t=/\buniform\s+vec3\s+diffuse\b/;return t.test(c)&&(c=c.replace(t,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),t.test(l)||(l=l.replace(Ba,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:l,fragmentShader:c}}});return r.transparent=!0,Object.defineProperties(r,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),r}const Dn=new pi({color:16777215,side:Ze,transparent:!0}),da=8421504,ha=new yt,Fr=new pe,gn=new pe,lr=[],xl=new pe,yn="+x+y";function pa(s){return Array.isArray(s)?s[0]:s}let Xa=()=>{const s=new pr(new Wr(1,1),Dn);return Xa=()=>s,s},Ya=()=>{const s=new pr(new Wr(1,1,32,1),Dn);return Ya=()=>s,s};const bl={type:"syncstart"},wl={type:"synccomplete"},Za=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],Sl=Za.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");let qa=class extends pr{constructor(){const r=new hl;super(r,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=da,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=yn,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(r){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(r):(this._isSyncing=!0,this.dispatchEvent(bl),Na({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},l=>{this._isSyncing=!1,this._textRenderInfo=l,this.geometry.updateGlyphs(l.glyphBounds,l.glyphAtlasIndices,l.blockBounds,l.chunkedBounds,l.glyphColors);const c=this._queuedSyncs;c&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{c.forEach(t=>t&&t())})),this.dispatchEvent(wl),r&&r()})))}onBeforeRender(r,l,c,t,e,n){this.sync(),e.isTroikaTextMaterial&&this._prepareForRender(e),e._hadOwnSide=e.hasOwnProperty("side"),this.geometry.setSide(e._actualSide=e.side),e.side=hi}onAfterRender(r,l,c,t,e,n){e._hadOwnSide?e.side=e._actualSide:delete e.side}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}get material(){let r=this._derivedMaterial;const l=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Dn.clone());if((!r||r.baseMaterial!==l)&&(r=this._derivedMaterial=yl(l),l.addEventListener("dispose",function c(){l.removeEventListener("dispose",c),r.dispose()})),this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY){let c=r._outlineMtl;return c||(c=r._outlineMtl=Object.create(r,{id:{value:r.id+.1}}),c.isTextOutlineMaterial=!0,c.depthWrite=!1,c.map=null,r.addEventListener("dispose",function t(){r.removeEventListener("dispose",t),c.dispose()})),[c,r]}else return r}set material(r){r&&r.isTroikaTextMaterial?(this._derivedMaterial=r,this._baseMaterial=r.baseMaterial):this._baseMaterial=r}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(r){this.geometry.detail=r}get curveRadius(){return this.geometry.curveRadius}set curveRadius(r){this.geometry.curveRadius=r}get customDepthMaterial(){return pa(this.material).getDepthMaterial()}get customDistanceMaterial(){return pa(this.material).getDistanceMaterial()}_prepareForRender(r){const l=r.isTextOutlineMaterial,c=r.uniforms,t=this.textRenderInfo;if(t){const{sdfTexture:a,blockBounds:o}=t;c.uTroikaSDFTexture.value=a,c.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),c.uTroikaSDFGlyphSize.value=t.sdfGlyphSize,c.uTroikaSDFExponent.value=t.sdfExponent,c.uTroikaTotalBounds.value.fromArray(o),c.uTroikaUseGlyphColors.value=!l&&!!t.glyphColors;let i=0,f=0,d=0,h,p,g,x=0,y=0;if(l){let{outlineWidth:_,outlineOffsetX:v,outlineOffsetY:S,outlineBlur:U,outlineOpacity:A}=this;i=this._parsePercent(_)||0,f=Math.max(0,this._parsePercent(U)||0),h=A,x=this._parsePercent(v)||0,y=this._parsePercent(S)||0}else d=Math.max(0,this._parsePercent(this.strokeWidth)||0),d&&(g=this.strokeColor,c.uTroikaStrokeColor.value.set(g??da),p=this.strokeOpacity,p==null&&(p=1)),h=this.fillOpacity;c.uTroikaDistanceOffset.value=i,c.uTroikaPositionOffset.value.set(x,y),c.uTroikaBlurRadius.value=f,c.uTroikaStrokeWidth.value=d,c.uTroikaStrokeOpacity.value=p,c.uTroikaFillOpacity.value=h??1,c.uTroikaCurveRadius.value=this.curveRadius||0;let w=this.clipRect;if(w&&Array.isArray(w)&&w.length===4)c.uTroikaClipRect.value.fromArray(w);else{const _=(this.fontSize||.1)*100;c.uTroikaClipRect.value.set(o[0]-_,o[1]-_,o[2]+_,o[3]+_)}this.geometry.applyClipRect(c.uTroikaClipRect.value)}c.uTroikaSDFDebug.value=!!this.debugSDF,r.polygonOffset=!!this.depthOffset,r.polygonOffsetFactor=r.polygonOffsetUnits=this.depthOffset||0;const e=l?this.outlineColor||0:this.color;if(e==null)delete r.color;else{const a=r.hasOwnProperty("color")?r.color:r.color=new Ue;(e!==a._input||typeof e=="object")&&a.set(a._input=e)}let n=this.orientation||yn;if(n!==r._orientation){let a=c.uTroikaOrient.value;n=n.replace(/[^-+xyz]/g,"");let o=n!==yn&&n.match(/^([-+])([xyz])([-+])([xyz])$/);if(o){let[,i,f,d,h]=o;Fr.set(0,0,0)[f]=i==="-"?1:-1,gn.set(0,0,0)[h]=d==="-"?-1:1,ha.lookAt(xl,Fr.cross(gn),gn),a.setFromMatrix4(ha)}else a.identity();r._orientation=n}}_parsePercent(r){if(typeof r=="string"){let l=r.match(/^(-?[\d.]+)%$/),c=l?parseFloat(l[1]):NaN;r=(isNaN(c)?0:c/100)*this.fontSize}return r}localPositionToTextCoords(r,l=new pt){l.copy(r);const c=this.curveRadius;return c&&(l.x=Math.atan2(r.x,Math.abs(c)-Math.abs(r.z))*Math.abs(c)),l}worldPositionToTextCoords(r,l=new pt){return Fr.copy(r),this.localPositionToTextCoords(this.worldToLocal(Fr),l)}raycast(r,l){const{textRenderInfo:c,curveRadius:t}=this;if(c){const e=c.blockBounds,n=t?Ya():Xa(),a=n.geometry,{position:o,uv:i}=a.attributes;for(let f=0;f<i.count;f++){let d=e[0]+i.getX(f)*(e[2]-e[0]);const h=e[1]+i.getY(f)*(e[3]-e[1]);let p=0;t&&(p=t-Math.cos(d/t)*t,d=Math.sin(d/t)*t),o.setXYZ(f,d,h,p)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,n.matrixWorld=this.matrixWorld,n.material.side=this.material.side,lr.length=0,n.raycast(r,lr);for(let f=0;f<lr.length;f++)lr[f].object=this,l.push(lr[f])}}copy(r){const l=this.geometry;return super.copy(r),this.geometry=l,Sl.forEach(c=>{this[c]=r[c]}),this}clone(){return new this.constructor().copy(this)}};Za.forEach(s=>{const r="_private_"+s;Object.defineProperty(qa.prototype,s,{get(){return this[r]},set(l){l!==this[r]&&(this[r]=l,this._needsSync=!0)}})});const He=m.forwardRef(({sdfGlyphSize:s=64,anchorX:r="center",anchorY:l="middle",font:c,fontSize:t=1,children:e,characters:n,onSync:a,...o},i)=>{const f=Nt(({invalidate:g})=>g),[d]=m.useState(()=>new qa),[h,p]=m.useMemo(()=>{const g=[];let x="";return m.Children.forEach(e,y=>{typeof y=="string"||typeof y=="number"?x+=y:g.push(y)}),[g,x]},[e]);return xi(()=>new Promise(g=>al({font:c,characters:n},g)),["troika-text",c,n]),m.useLayoutEffect(()=>void d.sync(()=>{f(),a&&a(d)})),m.useEffect(()=>()=>d.dispose(),[d]),m.createElement("primitive",ht({object:d,ref:i,font:c,text:p,anchorX:r,anchorY:l,fontSize:t,sdfGlyphSize:s},o),h)}),ma=(s,r)=>{"updateRanges"in s?s.updateRanges[0]=r:s.updateRange=r};function Ml(s){return typeof s=="function"}const va=new yt,ga=new yt,Lr=[],cr=new pr;class _l extends wi{constructor(){super(),this.color=new Ue("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var r;return(r=this.instance.current)==null?void 0:r.geometry}raycast(r,l){const c=this.instance.current;if(!c||!c.geometry||!c.material)return;cr.geometry=c.geometry;const t=c.matrixWorld,e=c.userData.instances.indexOf(this.instanceKey);if(!(e===-1||e>c.count)){c.getMatrixAt(e,va),ga.multiplyMatrices(t,va),cr.matrixWorld=ga,c.material instanceof Si?cr.material.side=c.material.side:cr.material.side=c.material[0].side,cr.raycast(r,Lr);for(let n=0,a=Lr.length;n<a;n++){const o=Lr[n];o.instanceId=e,o.object=this,l.push(o)}Lr.length=0}}}const Qa=m.createContext(null),ya=new yt,xa=new yt,Tl=new yt,ba=new pe,wa=new _t,Sa=new pe,Ul=s=>s.isInstancedBufferAttribute,Ka=m.forwardRef(({context:s,children:r,...l},c)=>{m.useMemo(()=>bi({PositionMesh:_l}),[]);const t=m.useRef();m.useImperativeHandle(c,()=>t.current,[]);const{subscribe:e,getParent:n}=m.useContext(s||Qa);return m.useLayoutEffect(()=>e(t),[]),m.createElement("positionMesh",ht({instance:n(),instanceKey:t,ref:t},l),r)}),kl=m.forwardRef(({context:s,children:r,range:l,limit:c=1e3,frames:t=1/0,...e},n)=>{const[{localContext:a,instance:o}]=m.useState(()=>{const _=m.createContext(null);return{localContext:_,instance:m.forwardRef((v,S)=>m.createElement(Ka,ht({context:_},v,{ref:S})))}}),i=m.useRef(null);m.useImperativeHandle(n,()=>i.current,[]);const[f,d]=m.useState([]),[[h,p]]=m.useState(()=>{const _=new Float32Array(c*16);for(let v=0;v<c;v++)Tl.identity().toArray(_,v*16);return[_,new Float32Array([...new Array(c*3)].map(()=>1))]});m.useEffect(()=>{i.current.instanceMatrix.needsUpdate=!0});let g=0,x=0;const y=m.useRef([]);m.useLayoutEffect(()=>{y.current=Object.entries(i.current.geometry.attributes).filter(([_,v])=>Ul(v))}),me(()=>{if(t===1/0||g<t){i.current.updateMatrix(),i.current.updateMatrixWorld(),ya.copy(i.current.matrixWorld).invert(),x=Math.min(c,l!==void 0?l:c,f.length),i.current.count=x,ma(i.current.instanceMatrix,{offset:0,count:x*16}),ma(i.current.instanceColor,{offset:0,count:x*3});for(let _=0;_<f.length;_++){const v=f[_].current;v.matrixWorld.decompose(ba,wa,Sa),xa.compose(ba,wa,Sa).premultiply(ya),xa.toArray(h,_*16),i.current.instanceMatrix.needsUpdate=!0,v.color.toArray(p,_*3),i.current.instanceColor.needsUpdate=!0}g++}});const w=m.useMemo(()=>({getParent:()=>i,subscribe:_=>(d(v=>[...v,_]),()=>d(v=>v.filter(S=>S.current!==_.current)))}),[]);return m.createElement("instancedMesh",ht({userData:{instances:f,limit:c,frames:t},matrixAutoUpdate:!1,ref:i,args:[null,null,0],raycast:()=>null},e),m.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:h.length/16,array:h,itemSize:16,usage:uo}),m.createElement("instancedBufferAttribute",{attach:"instanceColor",count:p.length/3,array:p,itemSize:3,usage:uo}),Ml(r)?m.createElement(a.Provider,{value:w},r(o)):s?m.createElement(s.Provider,{value:w},r):m.createElement(Qa.Provider,{value:w},r))}),Wt=m.forwardRef(({children:s,enabled:r=!0,speed:l=1,rotationIntensity:c=1,floatIntensity:t=1,floatingRange:e=[-.1,.1],autoInvalidate:n=!1,...a},o)=>{const i=m.useRef(null);m.useImperativeHandle(o,()=>i.current,[]);const f=m.useRef(Math.random()*1e4);return me(d=>{var h,p;if(!r||l===0)return;n&&d.invalidate();const g=f.current+d.clock.getElapsedTime();i.current.rotation.x=Math.cos(g/4*l)/8*c,i.current.rotation.y=Math.sin(g/4*l)/8*c,i.current.rotation.z=Math.sin(g/4*l)/20*c;let x=Math.sin(g/4*l)/10;x=Ie.mapLinear(x,-.1,.1,(h=e==null?void 0:e[0])!==null&&h!==void 0?h:-.1,(p=e==null?void 0:e[1])!==null&&p!==void 0?p:.1),i.current.position.y=x*t,i.current.updateMatrix()}),m.createElement("group",a,m.createElement("group",{ref:i,matrixAutoUpdate:!1},s))});class Cl extends ja{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${Mi>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const jl=s=>new pe().setFromSpherical(new ka(s,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),Al=m.forwardRef(({radius:s=100,depth:r=50,count:l=5e3,saturation:c=0,factor:t=4,fade:e=!1,speed:n=1},a)=>{const o=m.useRef(),[i,f,d]=m.useMemo(()=>{const p=[],g=[],x=Array.from({length:l},()=>(.5+.5*Math.random())*t),y=new Ue;let w=s+r;const _=r/l;for(let v=0;v<l;v++)w-=_*Math.random(),p.push(...jl(w).toArray()),y.setHSL(v/l,c,.9),g.push(y.r,y.g,y.b);return[new Float32Array(p),new Float32Array(g),new Float32Array(x)]},[l,r,t,s,c]);me(p=>o.current&&(o.current.uniforms.time.value=p.clock.getElapsedTime()*n));const[h]=m.useState(()=>new Cl);return m.createElement("points",{ref:a},m.createElement("bufferGeometry",null,m.createElement("bufferAttribute",{attach:"attributes-position",args:[i,3]}),m.createElement("bufferAttribute",{attach:"attributes-color",args:[f,3]}),m.createElement("bufferAttribute",{attach:"attributes-size",args:[d,1]})),m.createElement("primitive",{ref:o,object:h,attach:"material",blending:Ge,"uniforms-fade-value":e,depthWrite:!1,transparent:!0,vertexColors:!0}))}),El=({position:s})=>{const r=m.useRef(),l=Je(),[c,t]=m.useState(null);return m.useEffect(()=>{new et().load("/assets/images/digital_fire.jpg",e=>{e.colorSpace=st,t(e)})},[]),me(e=>{if(r.current){const n=l.offset,a=Ie.clamp((n-.2)/.08,0,1),o=Ie.smoothstep(a,.2,.8);r.current.material.opacity=o*.9;const i=1+Math.sin(e.clock.elapsedTime*5)*.1;r.current.scale.setScalar(i)}}),c?u.jsx("group",{position:s,children:u.jsx(Da,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:u.jsxs("mesh",{ref:r,position:[0,20,0],children:[u.jsx("planeGeometry",{args:[40,40]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,opacity:0,depthWrite:!1,blending:Ge})]})})}):null},Pl=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Rl=`
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
`,Fl=({position:s,angle:r,delay:l})=>{const c=m.useRef(),t=m.useRef(),e=Je(),n=m.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new Ue("#44aaff")},uPartyColor:{value:new Ue("#ff8844")}}),[]);return me(a=>{if(!c.current||!t.current)return;n.uTime.value=a.clock.elapsedTime;const o=e.offset,i=Ie.clamp((o-.2)/.08,0,1),f=Ie.smoothstep(i,.2,.8),d=Ie.clamp((f-l)*2,0,1);n.uState.value=d;const h=Math.sin(a.clock.elapsedTime*8+l*10)*d;if(c.current.position.y=s[1]+(h>0?h*2:0)+15,d>0){const x=400-s[0],y=-200-s[2],w=Math.sqrt(x*x+y*y)||1;c.current.position.x=s[0]+x/w*(d*15),c.current.position.z=s[2]+y/w*(d*15)}else c.current.position.x=s[0],c.current.position.z=s[2]}),u.jsx("group",{ref:c,position:[s[0],s[1]+15,s[2]],children:u.jsx(Da,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:u.jsxs("mesh",{children:[u.jsx("planeGeometry",{args:[20,30]}),u.jsx("shaderMaterial",{ref:t,vertexShader:Pl,fragmentShader:Rl,uniforms:n,transparent:!0,side:Ze,depthWrite:!1})]})})})},Ll=({position:s})=>{const l=m.useMemo(()=>{const c=[];for(let t=0;t<12;t++){const e=t/12*Math.PI*2,n=25+Math.random()*10;c.push({position:[s[0]+Math.cos(e)*n,s[1],s[2]+Math.sin(e)*n],angle:e,delay:Math.random()*.5})}return c},[12,s]);return u.jsx("group",{children:l.map((c,t)=>u.jsx(Fl,{...c},t))})},Ma={legaleagle:"Legal Eagle is an intelligent AI legal assistant that scans and processes legal documents at superhuman speeds, generating bulletproof contracts while actively highlighting hidden loopholes.",icebreaker:"Icebreaker is a real-world, location-based social platform that acts as an AI-driven outreach tool, generating highly personalized context-aware messages to thaw cold leads and spark genuine connections anywhere.",mindwave:"MindWave is an AI-powered thought interface and content creation engine that analyzes market trends and turns raw thoughts into optimized, actionable reality instantly.",interstellar:"Interstellar is a massive global data pipeline visualized as a space conquest strategy game, connecting disparate data sources into a unified, high-speed neural network spanning the globe.",orbital:"Orbital Command is the central dashboard and strategic command center for all autonomous agents, providing a god's-eye view to coordinate your entire digital operation.",droneswarm:"Drone Swarm is a highly-parallelized execution layer that deploys thousands of micro-agents to scour the web, track competitors, and harvest data opportunities in real-time.",autopilot:"Autopilot is a set-and-forget autonomous marketing agent. By providing a goal and a budget, it dynamically manages, optimizes, and executes complex social media campaigns without human intervention.",cloveh2o:"CloveH2O is a sustainable data analytics and efficiency tracker—visualized as an ocean of pure, refreshing data—ensuring your digital footprint is clean and resources are managed fluidly.",fantasyquant:"Fantasy Quant is a gamified analytics platform that blends the mechanics of a competitive fantasy sports arena with quantitative finance, allowing users to backtest and deploy trading models with ease.",contango:"Contango Quant is an institutional-grade quantitative finance platform providing deep architectural insights into market structures, uncovering the fundamental 'physics of finance' to build robust strategies.",sentaient:"Sentaient is the overarching AI parent company, conversion hub, and core neural network that powers, connects, and unifies all of these diverse applications into a single ecosystem."},Gn=({appId:s="sentaient",position:r=[0,0,0]})=>{const[l,c]=m.useState(!1),[t,e]=m.useState([]),[n,a]=m.useState(""),[o,i]=m.useState(!1),[f,d]=m.useState(!0),h=m.useRef(null),p=m.useRef();me(y=>{p.current&&!l&&p.current.scale.setScalar(1+Math.sin(y.clock.elapsedTime*3)*.1)}),m.useEffect(()=>{if(l&&t.length===0){const y=`Welcome. I am the guide for ${s.toUpperCase()}. How can I assist you today?`;if(e([{role:"ai",text:y}]),f&&window.speechSynthesis){window.speechSynthesis.cancel();const w=new SpeechSynthesisUtterance(y);w.rate=.9,w.pitch=1.1,window.speechSynthesis.speak(w)}}},[l,s,t.length,f]),m.useEffect(()=>{h.current&&(h.current.scrollTop=h.current.scrollHeight)},[t]);const g=y=>{if(y.preventDefault(),!n.trim())return;const w=[...t,{role:"user",text:n}];e(w),a(""),i(!0),setTimeout(()=>{let _=Ma[s]||Ma.sentaient;const v=n.toLowerCase();if(v.includes("hello")||v.includes("hi")?_="Hello! "+_:(v.includes("voicebox")||v.includes("voice"))&&(_="My voice modules via Voicebox are active. I can speak to you directly!"),e([...w,{role:"ai",text:_}]),i(!1),f&&window.speechSynthesis){window.speechSynthesis.cancel();const S=new SpeechSynthesisUtterance(_);S.rate=.9,S.pitch=1.1,window.speechSynthesis.speak(S)}},1500)},x=()=>{c(!1),window.speechSynthesis&&window.speechSynthesis.cancel()};return u.jsxs("group",{position:r,children:[!l&&u.jsxs(Wt,{speed:4,rotationIntensity:.5,floatIntensity:2,children:[u.jsxs("mesh",{ref:p,onClick:()=>c(!0),onPointerOver:()=>document.body.style.cursor="pointer",onPointerOut:()=>document.body.style.cursor="auto",children:[u.jsx("sphereGeometry",{args:[40,32,32]}),u.jsx("meshPhysicalMaterial",{color:"#00ffff",emissive:"#0088ff",emissiveIntensity:2,transparent:!0,opacity:.8,roughness:.1,metalness:.9})]}),u.jsx(He,{position:[0,-60,0],fontSize:20,color:"#00ffff",outlineWidth:1,outlineColor:"#004488",children:"Click to Ask Questions"})]}),l&&u.jsx(Ni,{transform:!0,wrapperClass:"hologram-wrapper",distanceFactor:1.5,position:[0,0,0],style:{transition:"all 0.5s"},children:u.jsxs("div",{style:{width:"400px",height:"500px",background:"rgba(0, 20, 40, 0.65)",backdropFilter:"blur(12px)",border:"1px solid rgba(0, 255, 255, 0.4)",boxShadow:"0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.1)",borderRadius:"16px",display:"flex",flexDirection:"column",color:"#fff",fontFamily:'"Roboto", "Inter", sans-serif',overflow:"hidden",pointerEvents:"auto"},children:[u.jsxs("div",{style:{padding:"16px",borderBottom:"1px solid rgba(0, 255, 255, 0.2)",display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(90deg, rgba(0,255,255,0.1) 0%, rgba(0,0,0,0) 100%)"},children:[u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[u.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"50%",background:"#00ffff",boxShadow:"0 0 10px #00ffff"}}),u.jsxs("h3",{style:{margin:0,fontSize:"18px",fontWeight:"500",color:"#00ffff",letterSpacing:"1px"},children:[s.toUpperCase()," GUIDE"]})]}),u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:[u.jsx("button",{onClick:y=>{y.stopPropagation(),d(!f),f&&window.speechSynthesis&&window.speechSynthesis.cancel()},style:{background:"none",border:`1px solid ${f?"#00ffff":"rgba(255,255,255,0.3)"}`,color:f?"#00ffff":"rgba(255,255,255,0.5)",padding:"4px 8px",borderRadius:"4px",cursor:"pointer",fontSize:"12px"},children:f?"🎤 Voice ON":"🔇 Voice OFF"}),u.jsx("button",{onClick:x,style:{background:"none",border:"none",color:"#fff",fontSize:"24px",cursor:"pointer",opacity:.7},children:"×"})]})]}),u.jsxs("div",{ref:h,style:{flex:1,padding:"20px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"16px",scrollbarWidth:"thin",scrollbarColor:"rgba(0, 255, 255, 0.5) transparent"},children:[t.map((y,w)=>u.jsx("div",{style:{alignSelf:y.role==="user"?"flex-end":"flex-start",maxWidth:"80%",background:y.role==="user"?"rgba(0, 255, 255, 0.15)":"rgba(255, 255, 255, 0.05)",border:`1px solid ${y.role==="user"?"rgba(0, 255, 255, 0.4)":"rgba(255, 255, 255, 0.1)"}`,padding:"12px 16px",borderRadius:y.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",fontSize:"15px",lineHeight:"1.5"},children:y.text},w)),o&&u.jsx("div",{style:{alignSelf:"flex-start",padding:"12px 16px",background:"rgba(255, 255, 255, 0.05)",borderRadius:"16px",color:"#00ffff"},children:"Analyzing..."})]}),u.jsxs("form",{onSubmit:g,style:{padding:"16px",borderTop:"1px solid rgba(0, 255, 255, 0.2)",display:"flex",gap:"10px"},children:[u.jsx("input",{type:"text",value:n,onChange:y=>a(y.target.value),placeholder:"Ask a question...",style:{flex:1,background:"rgba(0, 0, 0, 0.3)",border:"1px solid rgba(0, 255, 255, 0.3)",padding:"12px",borderRadius:"8px",color:"#fff",outline:"none",fontSize:"15px"}}),u.jsx("button",{type:"submit",style:{background:"rgba(0, 255, 255, 0.2)",border:"1px solid #00ffff",color:"#00ffff",padding:"0 20px",borderRadius:"8px",cursor:"pointer",fontWeight:"bold",textTransform:"uppercase",letterSpacing:"1px"},children:"Send"})]})]})})]})},Il=({position:s})=>{const r=m.useRef(),[l,c]=m.useState(null);return Je(),m.useEffect(()=>{new et().load("/icebreaker_logo.png",t=>{t.colorSpace=st,c(t)})},[]),me(t=>{if(r.current&&(r.current.rotation.y=t.clock.elapsedTime*.5,r.current.position.y=s[1]+Math.sin(t.clock.elapsedTime*2)*5,r.current.material)){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9,r.current.scale.setScalar(.01+e)}}),l?u.jsxs("mesh",{ref:r,position:s,children:[u.jsx("planeGeometry",{args:[40,40]}),u.jsx("meshBasicMaterial",{map:l,transparent:!0,opacity:0,depthWrite:!1,blending:Ge,side:Ze})]}):null},zl=({numTrees:s=30,radius:r=50,centerZ:l=-500})=>{const c=m.useRef(),t=m.useRef();Je();const e=m.useMemo(()=>new Bt,[]),n=m.useMemo(()=>{const a=[];for(let o=0;o<s;o++){const i=o/s*Math.PI*2+Math.random()*.5,f=r+Math.random()*20;a.push({position:new pe(Math.cos(i)*f,-18,Math.sin(i)*f+l),rotation:new En(0,i+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return a},[s,r,l]);return me(()=>{if(!c.current||!t.current)return;const a=window.icebreakerThaw||0;for(let o=0;o<s;o++){const i=n[o],f=Math.max(0,(a-i.delay)*2),d=Ie.clamp(f,0,1)*i.scale;e.position.copy(i.position),e.rotation.copy(i.rotation),e.scale.setScalar(d),e.updateMatrix(),c.current.setMatrixAt(o,e.matrix),e.position.y+=18*d,e.updateMatrix(),t.current.setMatrixAt(o,e.matrix)}c.current.instanceMatrix.needsUpdate=!0,t.current.instanceMatrix.needsUpdate=!0}),u.jsxs("group",{children:[u.jsxs("instancedMesh",{ref:c,args:[null,null,s],children:[u.jsx("cylinderGeometry",{args:[.5,1,20,8]}),u.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),u.jsxs("instancedMesh",{ref:t,args:[null,null,s],children:[u.jsx("sphereGeometry",{args:[8,4,4]}),u.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},Dl=`
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
`,Gl=`
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
`,Ol=({startZ:s,endZ:r})=>{const l=m.useRef(),c=m.useRef(),[t,e]=m.useState(null),n=Math.abs(r-s),a=(s+r)/2,o=m.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return m.useEffect(()=>{new et().load("/assets/images/ice_cavern.jpg",i=>{i.wrapS=Et,i.wrapT=Et,i.repeat.set(4,2),i.colorSpace=st,e(i),o.tMap.value=i})},[o]),me(i=>{if(c.current){const f=window.icebreakerThaw||0;o.uThaw.value=f,o.uTime.value=i.clock.elapsedTime}}),t?u.jsxs("mesh",{ref:l,position:[0,0,a],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[120,120,n,128,128,!0]}),u.jsx("shaderMaterial",{ref:c,vertexShader:Dl,fragmentShader:Gl,uniforms:o,transparent:!0,side:De})]}):null},Bl=({position:s})=>{const r=m.useRef();return me(l=>{if(r.current){const c=window.icebreakerThaw||0,t=Ie.lerp(.01,50,Math.pow(c,2));r.current.scale.setScalar(t),r.current.visible=c>0}}),u.jsxs("mesh",{ref:r,position:[s[0],s[1]+1,s[2]],rotation:[-Math.PI/2,0,0],children:[u.jsx("circleGeometry",{args:[20,64]}),u.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},Wl=({position:s})=>{const r=m.useRef();return me(l=>{if(r.current){const c=window.icebreakerThaw||0;r.current.scale.setScalar(c>0?1:.001)}}),u.jsxs("mesh",{ref:r,position:[s[0],s[1]+1.5,s[2]],rotation:[-Math.PI/2,0,0],children:[u.jsx("circleGeometry",{args:[96,64]}),u.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},Nl=({position:s})=>{const r=m.useRef();return me(()=>{if(r.current){const l=window.icebreakerThaw||0;r.current.opacity=1-Math.pow(l,2),r.current.transparent=!0}}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:s,children:[u.jsx("planeGeometry",{args:[1e3,3e3]}),u.jsx("meshStandardMaterial",{ref:r,color:"#001133",roughness:.1,metalness:.8})]})},Vl=({centerZ:s})=>{const r=m.useRef(),l=m.useRef(),c=m.useMemo(()=>({uColorBottom:{value:new Ue("#ffaa55")},uColorTop:{value:new Ue("#00f3ff")},uOpacity:{value:0}}),[]);return me(()=>{const t=window.icebreakerThaw||0;r.current&&(r.current.uniforms.uOpacity.value=t),l.current&&(l.current.intensity=t*.6)}),u.jsxs("group",{children:[u.jsxs("mesh",{scale:2e3,children:[u.jsx("sphereGeometry",{args:[1,32,32]}),u.jsx("shaderMaterial",{ref:r,side:De,transparent:!0,depthWrite:!1,uniforms:c,vertexShader:`
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
          `})]}),u.jsx("directionalLight",{ref:l,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),u.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},Hl=()=>{const s=Je(),[r,l]=m.useState(!1),[c,t]=m.useState(!1),[e,n]=m.useState(!1),a=m.useRef({triggered:!1,timer:0}),o=m.useRef({triggered:!1,timer:0});return m.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),me((i,f)=>{const d=s.offset;!o.current.triggered&&d>=.22&&(o.current.triggered=!0,n(!0),window.icebreakerCaveLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.22*(s.el.scrollHeight-s.el.clientHeight))),window.icebreakerCaveLocked&&(s.el&&(s.el.scrollTop=.23*(s.el.scrollHeight-s.el.clientHeight)),o.current.timer+=f,o.current.timer>1.5&&(window.icebreakerCaveLocked=!1,n(!1),s.el&&(s.el.style.overflow="auto"))),!r&&d>=.24&&window.icebreakerThaw<1&&(l(!0),window.icebreakerThawLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.24*(s.el.scrollHeight-s.el.clientHeight))),window.icebreakerThawLocked?(s.el&&(s.el.scrollTop=.24*(s.el.scrollHeight-s.el.clientHeight)),window.icebreakerThaw+=f*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,s.el&&!c&&(s.el.style.overflow="auto"),l(!1))):d<.2&&(window.icebreakerThaw=0),!a.current.triggered&&d>=.25&&window.icebreakerThaw>=1&&(a.current.triggered=!0,t(!0),window.icebreakerTextLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.25*(s.el.scrollHeight-s.el.clientHeight))),window.icebreakerTextLocked&&(s.el&&(s.el.scrollTop=.29*(s.el.scrollHeight-s.el.clientHeight)),a.current.timer+=f,a.current.timer>1.5&&(window.icebreakerTextLocked=!1,t(!1),s.el&&(s.el.style.overflow="auto")))}),null},Xl=({position:s,rotation:r,visible:l=!0})=>u.jsxs("group",{position:s,rotation:r,visible:l,children:[u.jsx(Hl,{}),u.jsx(Vl,{centerZ:0}),u.jsx(Ol,{startZ:1e3,endZ:-1e3}),u.jsx(Nl,{position:[0,-20,0]}),u.jsx(Bl,{position:[0,-20,0]}),u.jsx(Wl,{position:[0,-20,0]}),u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),u.jsx(El,{position:[0,-20,0]}),u.jsx(Il,{position:[0,30,0]}),u.jsx(zl,{radius:60,centerZ:0}),u.jsx(Ll,{position:[0,-20,0]}),u.jsx(Gn,{appId:"icebreaker",position:[-80,20,-200]})]}),Yl=`
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScrollProgress; // 0 to 1 based on how close to center we are
  
  void main() {
    vUv = uv;
    
    // Distance from center of the plane
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Create cymatic standing waves that intensify as user approaches center
    float wave1 = sin(dist * 100.0 - uTime * 2.0) * 0.5;
    float wave2 = sin(dist * 50.0 + uTime * 4.0) * 0.5;
    float angular = sin(atan(vUv.y - 0.5, vUv.x - 0.5) * 8.0 + uTime);
    
    // Combine waves for a geometric mandala-like ripple
    float elevation = (wave1 + wave2) * angular * uScrollProgress;
    
    vec3 pos = position;
    pos.z += elevation * 15.0; // Z is up because plane is rotated
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,Zl=`
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
    float angular = sin(atan(vUv.y - 0.5, vUv.x - 0.5) * 8.0 + uTime);
    
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
`,ql=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,Ql=({position:s,visible:r})=>u.jsxs("group",{visible:r,position:s,children:[u.jsx(He,{position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),u.jsx(He,{position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),u.jsx(He,{position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),Kl=({position:s,visible:r})=>{Je();const l=m.useRef(),c=m.useRef(),t=m.useRef(),[e,n]=m.useState(null),[a,o]=m.useState(null);m.useEffect(()=>{new et().load("/mindwave-logo.png",d=>{d.colorSpace=st,n(d)}),new et().load("/tribal-sun.png",d=>{d.colorSpace=st,o(d)})},[]);const i=s?s[2]:0,f=m.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return me(d=>{if(!r)return;const h=d.clock.elapsedTime;if(l.current){l.current.uniforms.uTime.value=h;const p=Math.abs(d.camera.position.z-i);let x=1-Math.min(p/1e3,1);x=Math.pow(x,2),l.current.uniforms.uScrollProgress.value=x}if(c.current){c.current.position.y=25+Math.sin(h*2)*2;const p=1+Math.sin(h*4)*.05;c.current.scale.set(p,p,1),c.current.rotation.y=0}if(t.current){t.current.position.y=25+Math.sin(h*2)*2,t.current.rotation.z=h*.1;const p=1+Math.sin(h*3)*.05;t.current.scale.set(p,p,1)}}),u.jsxs("group",{visible:r,position:s,children:[u.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[u.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),u.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:ql,side:De,depthWrite:!1})]}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[u.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),u.jsx("shaderMaterial",{ref:l,vertexShader:Yl,fragmentShader:Zl,uniforms:f,transparent:!0,side:Ze,wireframe:!1})]}),a&&u.jsxs("mesh",{ref:t,position:[0,-10,-85],children:[u.jsx("planeGeometry",{args:[140,140]}),u.jsx("meshBasicMaterial",{map:a,transparent:!0,side:Ze,depthWrite:!1,blending:Ge,color:"#00ffff",opacity:.6})]}),e&&u.jsxs("mesh",{ref:c,position:[0,-10,-80],children:[u.jsx("planeGeometry",{args:[80,80]}),u.jsx("meshBasicMaterial",{map:e,transparent:!0,side:Ze,depthWrite:!1,blending:Ge})]}),u.jsx(Ql,{position:[0,-25,-80],visible:!0})]})},jn=s=>{const l=new Ui;s==="interceptor"?(l.moveTo(1*1.8,0),l.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),l.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),l.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),l.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):s==="viper"?(l.moveTo(1*1.2,1*.3),l.lineTo(1*.4,1*.4),l.lineTo(-1*.8,1*1.2),l.lineTo(-1*1.2,1*.8),l.lineTo(-1*.8,0),l.lineTo(-1*1.2,-1*.8),l.lineTo(-1*.8,-1*1.2),l.lineTo(1*.4,-1*.4),l.lineTo(1*1.2,-1*.3),l.lineTo(1*.6,0)):s==="bulwark"&&(l.moveTo(1*1.5,0),l.lineTo(1*.8,1*1.2),l.lineTo(-1*.5,1*1.5),l.lineTo(-1*1.5,1*.8),l.lineTo(-1*1.5,-1*.8),l.lineTo(-1*.5,-1*1.5),l.lineTo(1*.8,-1*1.2));const c={steps:1,depth:s==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},t=new ki(l,c);return t.center(),t.rotateY(-Math.PI/2),t.rotateZ(-Math.PI/2),t},Jl=({position:s})=>{const r=m.useRef();return me((l,c)=>{r.current&&(r.current.rotation.z-=c*.1,r.current.rotation.x=Math.sin(l.clock.elapsedTime*.1)*.1)}),u.jsxs("group",{position:s,ref:r,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[150,150,300,32]}),u.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),u.jsxs("mesh",{children:[u.jsx("torusGeometry",{args:[400,40,32,64]}),u.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((l,c)=>u.jsxs("mesh",{position:[Math.cos(l)*200,0,Math.sin(l)*200],rotation:[0,-l,Math.PI/2],children:[u.jsx("cylinderGeometry",{args:[20,20,300,16]}),u.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},c)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((l,c)=>u.jsxs("mesh",{position:[Math.cos(l)*400,0,Math.sin(l)*400],rotation:[Math.PI/2,0,-l],children:[u.jsx("boxGeometry",{args:[60,60,90]}),u.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${c}`))]})},$l=({position:s})=>{const r=m.useRef(),l=m.useMemo(()=>jn("bulwark"),[]);return me((c,t)=>{r.current&&(r.current.position.y=Math.sin(c.clock.elapsedTime*.2)*40,r.current.rotation.y+=t*.05,r.current.rotation.z=Math.sin(c.clock.elapsedTime*.1)*.1)}),u.jsxs("group",{position:s,ref:r,scale:[120,120,120],children:[u.jsx("mesh",{geometry:l,children:u.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),u.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),u.jsxs("mesh",{position:[0,0,1.5],children:[u.jsx("sphereGeometry",{args:[.2,16,16]}),u.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},ec=({position:s})=>{const e=m.useMemo(()=>new Bt,[]),n=m.useMemo(()=>new Bt,[]),a=m.useRef(),o=m.useRef(),i=m.useRef(),f=m.useRef(),d=m.useMemo(()=>jn("interceptor"),[]),h=m.useMemo(()=>jn("viper"),[]),p=m.useMemo(()=>{const y=new _i(.5,.5,20,4);return y.rotateX(Math.PI/2),y},[]),g=m.useMemo(()=>Array.from({length:80},(y,w)=>{const _=w>=40;return{pos:new pe((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new pe,target:new pe,team:_?1:0,meshIndex:_?w-40:w,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),x=m.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new pe,vel:new pe,color:new Ue,life:0})),[60]);return me((y,w)=>{if(!a.current||!o.current||!i.current||!f.current)return;let _=0;g.forEach(v=>{if(v.state===0){if(Math.random()<.02||v.target.lengthSq()===0){const j=g[Math.floor(Math.random()*80)];j&&j.team!==v.team&&j.state===0?(v.target.copy(j.pos),v.target.x+=(Math.random()-.5)*200,v.target.y+=(Math.random()-.5)*200,v.target.z+=(Math.random()-.5)*200):v.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const S=new pe().subVectors(v.target,v.pos),U=S.length();if(U>150&&U<800&&Math.random()<.03){const j=x.find(F=>!F.active);j&&(j.active=!0,j.pos.copy(v.pos),j.vel.copy(S).normalize().multiplyScalar(2500),j.color.set(v.team===0?"#00ffff":"#ff3300"),j.life=.8)}const A=S.normalize().multiplyScalar(400*w);v.vel.add(A),v.vel.clampLength(0,600),v.pos.addScaledVector(v.vel,w),v.trail.push(v.pos.clone()),v.trail.length>5&&v.trail.shift(),e.position.copy(v.pos);const k=e.position.clone().add(v.vel);e.lookAt(k);const E=A.clone().cross(v.vel).y;e.rotateZ(E*.01),e.scale.set(30,30,30)}else{v.explosionTimer+=w,e.position.copy(v.pos),e.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const S=30*Math.max(.1,1-v.explosionTimer*2);e.scale.set(S,S,S),v.explosionTimer>.5&&(v.state=0,v.health=100,v.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),v.vel.set(0,0,0),v.trail=[])}e.updateMatrix(),v.team===0?(a.current.setMatrixAt(v.meshIndex,e.matrix),a.current.setColorAt(v.meshIndex,v.state===0?new Ue("#00aaff"):new Ue("#ffaa00"))):(o.current.setMatrixAt(v.meshIndex,e.matrix),o.current.setColorAt(v.meshIndex,v.state===0?new Ue("#ff0033"):new Ue("#ffaa00"))),v.trail.forEach((S,U)=>{if(_<400){e.position.copy(S),e.rotation.set(0,0,0);const A=U/5*10;e.scale.set(A,A,A),e.updateMatrix(),f.current.setMatrixAt(_,e.matrix),f.current.setColorAt(_,v.team===0?new Ue("#00ffff"):new Ue("#ff5500")),_++}})});for(let v=_;v<400;v++)e.position.set(0,9999,0),e.scale.set(0,0,0),e.updateMatrix(),f.current.setMatrixAt(v,e.matrix);x.forEach((v,S)=>{v.active?(v.pos.addScaledVector(v.vel,w),v.life-=w,g.forEach(U=>{U.state===0&&v.pos.distanceTo(U.pos)<50&&(U.health-=50,v.active=!1,U.health<=0&&(U.state=1,U.explosionTimer=0))}),v.life<=0&&(v.active=!1),n.position.copy(v.pos),n.lookAt(n.position.clone().add(v.vel)),n.scale.set(1,1,1)):(n.position.set(0,9999,0),n.scale.set(0,0,0)),n.updateMatrix(),i.current.setMatrixAt(S,n.matrix),i.current.setColorAt(S,v.color)}),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0),o.current.instanceMatrix.needsUpdate=!0,o.current.instanceColor&&(o.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),i.current.instanceMatrix.needsUpdate=!0,i.current.instanceColor&&(i.current.instanceColor.needsUpdate=!0)}),u.jsxs("group",{position:s,children:[u.jsx("instancedMesh",{ref:a,args:[d,null,40],children:u.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),u.jsx("instancedMesh",{ref:o,args:[h,null,40],children:u.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),u.jsx("instancedMesh",{ref:i,args:[p,null,60],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Ge})}),u.jsx("instancedMesh",{ref:f,args:[new Ti(1,4,4),null,400],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:Ge,depthWrite:!1})})]})},tc=({position:s,rotation:r,visible:l})=>{const c=Vt(et,"/interstellar_logo_final.png");c.colorSpace=st;const t=Je(),e=m.useRef({triggered:!1});return me(()=>{t&&t.offset>=.41&&t.offset<=.43&&!e.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,e.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsx("ambientLight",{intensity:.2}),u.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),u.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),u.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[4e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#020510",side:De})]}),u.jsx(Jl,{position:[0,-200,-800]}),u.jsx($l,{position:[0,-120,-100]}),u.jsx(ec,{position:[0,-50,0]}),u.jsxs("group",{position:[0,120,200],children:[u.jsxs("mesh",{position:[0,50,0],children:[u.jsx("planeGeometry",{args:[180,180]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1})]}),u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),u.jsx(Gn,{appId:"interstellar",position:[-150,100,200]})]})},rc=()=>{const r=m.useRef([]),l=m.useRef(document.createElement("canvas")),c=m.useMemo(()=>{l.current.width=512,l.current.height=1024;const e=l.current.getContext("2d");e.fillStyle="#010a15",e.fillRect(0,0,512,1024),e.strokeStyle="#004488",e.lineWidth=2;for(let a=0;a<1024;a+=32)e.beginPath(),e.moveTo(0,a),e.lineTo(512,a),e.stroke(),a<512&&(e.beginPath(),e.moveTo(a,0),e.lineTo(a,1024),e.stroke());e.fillStyle="#0088ff",e.fillRect(40,40,432,60),e.fillStyle="#00ffff",e.font="24px monospace",e.fillText("CLASSIFIED // AI REVIEW",60,78),e.fillStyle="#003366";for(let a=0;a<30;a++){let o=140+a*28;e.fillRect(40,o,432-Math.random()*200,12)}e.strokeStyle="#ff0033",e.lineWidth=5,e.beginPath(),e.arc(400,850,60,0,Math.PI*2),e.stroke(),e.beginPath(),e.arc(400,850,50,0,Math.PI*2),e.stroke();const n=new Rn(l.current);return n.colorSpace=st,n},[]),t=m.useMemo(()=>Array.from({length:50}).map((e,n)=>({delay:n*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-400+Math.random()*200})),[50]);return me((e,n)=>{const a=e.clock.elapsedTime;t.forEach((o,i)=>{const f=r.current[i];f&&(a>o.delay&&(o.state==="waiting"&&(o.state="approaching"),o.state==="approaching"&&(o.x-=8e3*n,o.x<=0&&(o.x=0,o.state="scanning",o.scanTimer=a)),o.state==="scanning"&&a-o.scanTimer>.05&&(o.state="approved"),o.state==="approved"&&(o.x-=8e3*n,o.x<-3e3&&(o.x=3e3+Math.random()*500,o.state="approaching",o.y=(Math.random()-.5)*150-50))),f.position.set(o.x,o.y,o.z),o.state==="scanning"?(f.rotation.set(0,0,0),f.scale.setScalar(1.2)):o.state==="approved"?(f.rotation.set(0,.4,0),f.scale.setScalar(1)):(f.rotation.set(0,-.4,0),f.scale.setScalar(1)),o.state==="scanning"?f.color.set("#ffffff"):o.state==="approved"?f.color.set("#00ff66"):f.color.set("#0088ff"))})}),u.jsxs(kl,{limit:50,range:50,children:[u.jsx("planeGeometry",{args:[100,200]}),u.jsx("meshBasicMaterial",{map:c,side:Ze,transparent:!0,opacity:.9,blending:Ge,depthWrite:!1}),t.map((e,n)=>u.jsx(Ka,{ref:a=>r.current[n]=a,position:[e.x,e.y,e.z]},n))]})},nc=()=>{const s=Vt(et,"/legal_eagle_courtroom_bg.jpg");return s.colorSpace=st,u.jsxs("group",{children:[u.jsxs("mesh",{position:[0,0,-2500],children:[u.jsx("planeGeometry",{args:[8e3,4500]}),u.jsx("meshBasicMaterial",{map:s,depthWrite:!1,transparent:!0,opacity:.3})]}),[-1,1].map((r,l)=>u.jsxs("mesh",{position:[r*800,0,-1e3],children:[u.jsx("boxGeometry",{args:[400,4e3,400]}),u.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.2})]},l)),[-1,1].map((r,l)=>u.jsxs("mesh",{position:[r*1400,0,-1500],children:[u.jsx("boxGeometry",{args:[600,4e3,600]}),u.jsx("meshStandardMaterial",{color:"#030303",metalness:.9,roughness:.3})]},l+2))]})},oc=({logoTex:s})=>{const r=m.useMemo(()=>({uTime:{value:0}}),[]),l=m.useMemo(()=>({uTime:{value:0},uColor:{value:new Ue("#00ffff")}}),[]);return me(c=>{r.uTime.value=c.clock.elapsedTime,l.uTime.value=c.clock.elapsedTime}),u.jsxs("group",{position:[0,-100,-800],children:[u.jsxs("mesh",{position:[0,-200,0],children:[u.jsx("boxGeometry",{args:[1200,600,400]}),u.jsx("meshStandardMaterial",{color:"#020202",metalness:1,roughness:.1})]}),u.jsxs("mesh",{position:[0,150,0],children:[u.jsx("boxGeometry",{args:[800,100,300]}),u.jsx("meshStandardMaterial",{color:"#050505",metalness:.8,roughness:.2})]}),u.jsxs(Wt,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[u.jsxs("mesh",{position:[0,400,0],children:[u.jsx("planeGeometry",{args:[400,400]}),u.jsx("meshBasicMaterial",{map:s,transparent:!0,depthWrite:!1,blending:Ge})]}),u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,150,0],fontSize:100,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"})]})]})},ac=({position:s,rotation:r,visible:l})=>{const c=Vt(et,"/legal_eagle_logo.png");return c.colorSpace=st,u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsx("ambientLight",{intensity:.2}),u.jsx("directionalLight",{position:[0,1e3,1e3],intensity:1.5,color:"#00ffff"}),u.jsx("pointLight",{position:[0,500,-400],intensity:2,color:"#0044ff",distance:2e3}),u.jsx(nc,{}),u.jsx(oc,{logoTex:c}),u.jsx(rc,{}),u.jsx(Gn,{appId:"legaleagle",position:[200,100,-200]})]})},ic=({position:s,rotation:r,speed:l})=>{m.useRef();const c=m.useMemo(()=>new Aa([new pe(-1e3,0,0),new pe(-500,Math.random()*200-100,Math.random()*200-100),new pe(0,0,0),new pe(500,Math.random()*200-100,Math.random()*200-100),new pe(1e3,0,0)]),[]),t=m.useMemo(()=>new Ci(c,64,4,8,!1),[c]),e=m.useRef();me(a=>{e.current&&(e.current.map.offset.x-=l)});const n=m.useMemo(()=>{const a=document.createElement("canvas");a.width=256,a.height=16;const o=a.getContext("2d");o.fillStyle="#000000",o.fillRect(0,0,256,16),o.fillStyle="#00ffff",o.fillRect(0,0,32,16),o.fillStyle="#ff00ff",o.fillRect(128,0,32,16);const i=new Rn(a);return i.wrapS=Et,i.wrapT=Et,i},[]);return u.jsxs("group",{position:s,rotation:r,children:[u.jsx("mesh",{geometry:t,children:u.jsx("meshBasicMaterial",{ref:e,map:n,transparent:!0,opacity:.8,blending:Ge})}),u.jsx("mesh",{geometry:t,children:u.jsx("meshPhysicalMaterial",{transparent:!0,opacity:.3,roughness:.1,transmission:.9,thickness:5,color:"#0044ff"})})]})},sc=({position:s})=>{const r=m.useRef(),l=m.useRef(),c=m.useRef();return me((t,e)=>{r.current&&(r.current.scale.setScalar(1+Math.sin(t.clock.elapsedTime*4)*.05),r.current.rotation.y+=e*.5,r.current.rotation.x+=e*.2),l.current&&(l.current.rotation.x+=e*1.2,l.current.rotation.y+=e*.8),c.current&&(c.current.rotation.x-=e*.9,c.current.rotation.z+=e*1.5)}),u.jsxs("group",{position:s,children:[u.jsxs("mesh",{ref:r,children:[u.jsx("icosahedronGeometry",{args:[100,2]}),u.jsx("meshStandardMaterial",{color:"#ffffff",emissive:"#00ffff",emissiveIntensity:2,wireframe:!0})]}),u.jsx("pointLight",{intensity:5,color:"#00ffff",distance:1e3}),u.jsxs("mesh",{ref:l,children:[u.jsx("torusGeometry",{args:[150,4,16,64]}),u.jsx("meshStandardMaterial",{color:"#ff00ff",emissive:"#ff00ff",emissiveIntensity:1})]}),u.jsxs("mesh",{ref:c,children:[u.jsx("torusGeometry",{args:[200,2,16,64]}),u.jsx("meshStandardMaterial",{color:"#00ff00",emissive:"#00ff00",emissiveIntensity:1})]})]})},lc=({position:s,rotation:r,visible:l})=>{const c=Je(),[t,e]=m.useState(!1);me(()=>{l&&(c.offset>.675&&c.offset<.69&&!t&&!window.autopilotLocked&&(window.autopilotLocked=!0,e(!0),setTimeout(()=>{window.autopilotLocked=!1},1500)),(c.offset<.65||c.offset>.7)&&t&&(e(!1),window.autopilotLocked=!1))});const n=m.useMemo(()=>Array.from({length:15}).map((a,o)=>({pos:[(Math.random()-.5)*800,(Math.random()-.5)*800,(Math.random()-.5)*800],rot:[Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI],speed:.01+Math.random()*.04})),[]);return u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsx("ambientLight",{intensity:.5}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[3e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#050510",side:De})]}),u.jsx(sc,{position:[0,-200,-800]}),n.map((a,o)=>u.jsx(ic,{position:a.pos,rotation:a.rot,speed:a.speed},o)),[[-600,200,-600],[600,100,-700],[0,300,-1e3],[-400,-300,-500],[400,-200,-600]].map((a,o)=>u.jsxs(Wt,{speed:2,rotationIntensity:.2,floatIntensity:1,position:a,children:[u.jsxs("mesh",{rotation:[0,a[0]>0?-Math.PI/6:Math.PI/6,0],children:[u.jsx("planeGeometry",{args:[300,200]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.1,wireframe:!0})]}),u.jsxs("mesh",{rotation:[0,a[0]>0?-Math.PI/6:Math.PI/6,0],position:[0,0,2],children:[u.jsx("planeGeometry",{args:[280,180]}),u.jsx("meshPhysicalMaterial",{transparent:!0,transmission:.9,roughness:.1,thickness:2,color:"#001133"})]})]},o)),u.jsx("group",{position:[0,300,-600],children:u.jsxs(Wt,{speed:2,rotationIntensity:.1,floatIntensity:1,children:[u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:70,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"AUTOPILOT"}),u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-120,0],fontSize:28,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Autonomous Business Agent"})]})})]})},cc=({position:s})=>{const r=m.useRef(),l=m.useMemo(()=>({uTime:{value:0},uColor:{value:new Ue("#00ffff")}}),[]);return me(c=>{r.current&&(r.current.uniforms.uTime.value=c.clock.elapsedTime)}),u.jsxs("mesh",{position:s,children:[u.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),u.jsx("shaderMaterial",{ref:r,transparent:!0,side:Ze,blending:Ge,depthWrite:!1,uniforms:l,vertexShader:`
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
        `})]})},fc=()=>{const s=m.useRef(),r=m.useMemo(()=>({uTime:{value:0},uColor:{value:new Ue("#0044ff")},uHighlight:{value:new Ue("#00ffff")}}),[]);return me(l=>{s.current&&(s.current.uniforms.uTime.value=l.clock.elapsedTime)}),u.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[u.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),u.jsx("shaderMaterial",{ref:s,transparent:!0,wireframe:!0,uniforms:r,vertexShader:`
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
        `})]})},uc=({position:s,rotation:r,visible:l})=>{const[c,t]=m.useState(null);return m.useEffect(()=>{new et().load("/cloveh2o_logo.png",n=>{n.colorSpace=st,t(n)})},[]),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[4e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#000511",side:De})]}),u.jsx(fc,{}),u.jsx(cc,{position:[0,1800,-800]}),u.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),u.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),u.jsxs("group",{position:[0,0,-300],children:[c&&u.jsxs("mesh",{position:[0,80,0],children:[u.jsx("planeGeometry",{args:[200,200]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1,blending:Ge})]}),u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]})]})},Ir=({color:s,number:r,groupRef:l,armRef:c})=>u.jsxs("group",{ref:l,children:[u.jsxs("mesh",{position:[0,10,0],children:[u.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),u.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.3,roughness:.4})]}),u.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[u.jsx("sphereGeometry",{args:[2.5,16,16]}),u.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.5,roughness:.3})]}),u.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[u.jsx("sphereGeometry",{args:[2.5,16,16]}),u.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.5,roughness:.3})]}),u.jsxs("group",{position:[0,17,0],children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[2.8,32,32]}),u.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.8,metalness:.5})]}),u.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[u.jsx("boxGeometry",{args:[3.5,2,2]}),u.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),u.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:u.jsxs("mesh",{position:[0,-3.5,0],children:[u.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),u.jsx("meshStandardMaterial",{color:s,roughness:.6})]})}),u.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:c,children:u.jsxs("mesh",{position:[0,-3.5,0],children:[u.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),u.jsx("meshStandardMaterial",{color:s,roughness:.6})]})}),u.jsxs("mesh",{position:[-1.8,3,0],children:[u.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),u.jsx("meshStandardMaterial",{color:s,roughness:.8})]}),u.jsxs("mesh",{position:[1.8,3,0],children:[u.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),u.jsx("meshStandardMaterial",{color:s,roughness:.8})]}),r&&u.jsx(He,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:r})]}),dc=({position:s})=>{const r=m.useRef(),l=m.useRef(),c=m.useRef(),t=m.useRef(),e=m.useRef(),n=m.useRef(),a=m.useMemo(()=>new pe(100,0,0),[]),o=m.useMemo(()=>new pe(100,0,20),[]),i=m.useMemo(()=>new pe(30,0,100),[]),f=m.useMemo(()=>new pe(0,0,-20),[]),d=m.useMemo(()=>new pe(20,0,220),[]),h=m.useMemo(()=>new pe,[]),p=m.useMemo(()=>new pe,[]);return m.useMemo(()=>new pe,[]),me(g=>{const x=g.clock.elapsedTime%6;if(c.current&&c.current.rotation.set(0,0,-.3),x<.5)l.current&&l.current.position.copy(a),t.current&&t.current.position.copy(o),e.current&&e.current.position.copy(i),r.current&&r.current.position.copy(f),n.current&&n.current.position.copy(f).add(h.set(4.5,12,2));else if(x<4){const y=(x-.5)/3.5;if(l.current&&(y<.5?l.current.position.lerpVectors(a,h.set(100,0,110),y*2):l.current.position.lerpVectors(p.set(100,0,110),d,(y-.5)*2)),t.current&&l.current&&t.current.position.lerpVectors(o,h.set(d.x+8,0,d.z-8),y),e.current&&e.current.position.lerpVectors(i,h.set(d.x-8,0,d.z+8),y),n.current)if(x<1.5)n.current.position.copy(f).add(h.set(4.5,12,2));else{const w=(x-1.5)/2.5,_=Math.sin(w*Math.PI)*45;n.current.position.lerpVectors(f,d,w),n.current.position.y+=_+18}}else if(x<5)l.current&&l.current.position.lerpVectors(d,h.set(20,0,240),x-4),n.current&&l.current&&n.current.position.copy(l.current.position).add(h.set(0,12,3)),t.current&&(t.current.position.y=0),e.current&&(e.current.position.y=0);else if(x<5.5)c.current&&c.current.rotation.set(Math.PI,0,0),n.current&&l.current&&n.current.position.copy(l.current.position).add(h.set(4.5,20,0));else if(c.current&&c.current.rotation.set(-Math.PI/4,0,0),n.current&&l.current){const y=x-5.5,w=Math.abs(Math.cos(y*8))*10;n.current.position.copy(l.current.position).add(h.set(4.5,w,4))}}),u.jsxs("group",{position:s,children:[u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[u.jsx("planeGeometry",{args:[400,400]}),u.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),u.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[u.jsx("planeGeometry",{args:[400,40]}),u.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),u.jsx(Ir,{color:"#0088ff",number:"QB",groupRef:r}),u.jsx(Ir,{color:"#00ffff",number:"80",groupRef:l,armRef:c}),u.jsx(Ir,{color:"#ff0044",number:"CB",groupRef:t}),u.jsx(Ir,{color:"#ff0044",number:"S",groupRef:e}),u.jsxs("mesh",{ref:n,children:[u.jsx("sphereGeometry",{args:[2,16,16]}),u.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},hc=({position:s,rotation:r,visible:l})=>{const c=Vt(et,"/fantasy_quant_stadium.jpg");return c.colorSpace=st,c.wrapS=Et,c.repeat.set(-1,1),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[2500,64,64]}),u.jsx("meshBasicMaterial",{map:c,side:De})]}),u.jsx(dc,{position:[0,-125,0],rotation:[0,-Math.PI/2,0]}),u.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),u.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),u.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]})]})},pc=({position:s})=>{const l=m.useRef(),c=m.useMemo(()=>{const e=[];for(let n=0;n<4e3;n++){const a=Math.random()*Math.PI*2,o=(Math.random()-.5)*150,i=400,f=(i+o*Math.cos(a/2))*Math.cos(a),d=o*Math.sin(a/2),h=(i+o*Math.cos(a/2))*Math.sin(a);e.push({pos:new pe(f,d,h),u:a,v:o,speed:Math.random()*.5+.2,color:new Ue(Math.random()>.5?"#00f3ff":"#0077ff")})}return e},[]),t=m.useMemo(()=>new Bt,[]);return me(e=>{if(!l.current)return;const n=e.clock.elapsedTime;c.forEach((a,o)=>{const i=(a.u+n*a.speed)%(Math.PI*2),f=400,d=(f+a.v*Math.cos(i/2))*Math.cos(i),h=a.v*Math.sin(i/2),p=(f+a.v*Math.cos(i/2))*Math.sin(i);t.position.set(d,h,p);const g=1.5+Math.sin(n*a.speed*5+o)*.8;t.scale.set(g,g,g),t.updateMatrix(),l.current.setMatrixAt(o,t.matrix),l.current.setColorAt(o,a.color)}),l.current.instanceMatrix.needsUpdate=!0,l.current.instanceColor&&(l.current.instanceColor.needsUpdate=!0)}),u.jsx("group",{position:s,children:u.jsx("instancedMesh",{ref:l,args:[new Wr(2,2),null,4e3],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Ge,depthWrite:!1,side:Ze})})})},mc=()=>{const s=m.useMemo(()=>Array.from({length:30}).map(()=>{const l=[],c=(Math.random()-.5)*800,t=600+Math.random()*400,e=Math.random()*Math.PI*2;for(let n=0;n<=50;n++){const a=e+n/50*Math.PI*1.5;l.push(new pe(Math.cos(a)*t,c+Math.sin(a*8)*50,Math.sin(a)*t))}return{points:l,color:Math.random()>.5?"#00f3ff":"#ffffff"}}),[]),r=m.useRef();return me(l=>{r.current&&(r.current.rotation.y=l.clock.elapsedTime*.15)}),u.jsx("group",{ref:r,children:s.map((l,c)=>u.jsx(Us,{points:l.points,color:l.color,lineWidth:2,transparent:!0,opacity:.4},c))})},vc=({position:s,rotation:r,visible:l})=>{const c=Je(),[t,e]=m.useState(!1),n=m.useRef({triggered:!1,timer:0});return me((a,o)=>{if(!l)return;const i=c.offset;!n.current.triggered&&i>=.92&&(n.current.triggered=!0,e(!0),window.contangoLocked=!0,c.el&&(c.el.style.overflow="hidden",c.el.scrollTop=.93*(c.el.scrollHeight-c.el.clientHeight))),window.contangoLocked&&(c.el&&(c.el.scrollTop=.93*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.contangoLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto")))}),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsx("ambientLight",{intensity:.4}),u.jsx("directionalLight",{position:[0,500,500],intensity:1.5,color:"#ffffff"}),u.jsx("spotLight",{position:[-500,500,500],intensity:2,color:"#00f3ff",penumbra:1}),u.jsx("spotLight",{position:[500,-500,500],intensity:2,color:"#0077ff",penumbra:1}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[3e3,64,64]}),u.jsx("meshBasicMaterial",{color:"#010204",side:De})]}),u.jsx(mc,{}),u.jsx(Al,{radius:1500,depth:50,count:5e3,factor:4,saturation:0,fade:!0,speed:1}),u.jsxs(Wt,{speed:2,rotationIntensity:.2,floatIntensity:1,floatingRange:[-10,10],children:[u.jsx(An.Suspense,{fallback:null}),u.jsx(He,{position:[0,250,-800],fontSize:100,anchorX:"center",anchorY:"middle",color:"#ffffff",children:"CONTANGO QUANT"}),u.jsx(He,{position:[0,120,-800],fontSize:35,color:"#00f3ff",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",children:"The physics of finance"})]}),u.jsx(pc,{position:[0,-100,-800]}),u.jsx(Gr,{count:4e3,scale:3e3,size:25,speed:.6,opacity:.5,color:"#00f3ff",position:[0,0,-500]})]})},gc=({position:s,rotation:r,visible:l})=>{const c=m.useRef(),t=m.useRef(),e=Vt(et,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return me(n=>{c.current&&(c.current.position.y=Math.sin(n.clock.elapsedTime*1.5)*5),t.current&&(t.current.rotation.y+=.005,t.current.rotation.z+=.002)}),u.jsxs("group",{visible:l,position:s,rotation:r,children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[1500,32,32]}),u.jsx("meshBasicMaterial",{color:"#020510",side:De})]}),u.jsxs("group",{children:[u.jsx(Wt,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:u.jsxs("mesh",{ref:c,position:[0,0,-500],children:[u.jsx("planeGeometry",{args:[400,100]})," ",u.jsx("meshBasicMaterial",{map:e,transparent:!0,opacity:1,side:Ze,depthWrite:!1})]})}),u.jsx(Gr,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),u.jsx(Gr,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),u.jsx("ambientLight",{intensity:.5,color:"#002244"}),u.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3})]})},yc=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,xc=`
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
`,bc=({startZ:s=10,endZ:r=-500,visible:l=!0})=>{const c=m.useRef(),t=m.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);me(n=>{c.current&&l&&(c.current.uniforms.uTime.value=n.clock.elapsedTime,c.current.uniforms.uOpacity.value=Ie.lerp(c.current.uniforms.uOpacity.value,l?1:0,.05))});const e=m.useMemo(()=>{const n=[],o=s-r;for(let i=0;i<=100;i++){const f=s-i/100*o;n.push(new pe(Math.sin(i*.1)*2,Math.cos(i*.05)*2,f))}return new Aa(n)},[s,r]);return u.jsxs("mesh",{visible:l,children:[u.jsx("tubeGeometry",{args:[e,200,15,32,!1]}),u.jsx("shaderMaterial",{ref:c,vertexShader:yc,fragmentShader:xc,uniforms:t,side:De,transparent:!0,blending:Ge})]})},wc=`
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
`,Sc=`
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
`,Mc=({position:s,rotation:r=[0,0,0],length:l=4e3,visible:c=!0})=>{const t=m.useRef(),e=m.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:l}}),[l]);return me(n=>{t.current&&(t.current.uniforms.uTime.value=n.clock.elapsedTime,t.current.uniforms.uOpacity.value=c?1:0)}),u.jsx("group",{position:s,rotation:r,visible:c,children:u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[60,400,l+200,32,64,!0]}),u.jsx("shaderMaterial",{ref:t,vertexShader:wc,fragmentShader:Sc,uniforms:e,transparent:!0,side:De,wireframe:!1})]})})},_c=({position:s,rotation:r,length:l=4e3,radius:c=200,color:t="#ffffff",speed:e=20,visible:n=!0})=>{const a=m.useRef(),o=m.useMemo(()=>({uTime:{value:0},uColor:{value:new Ue(t)}}),[t]);return me(i=>{a.current&&(a.current.uniforms.uTime.value=i.clock.elapsedTime)}),u.jsxs("mesh",{visible:n,position:s,rotation:r,children:[u.jsx("cylinderGeometry",{args:[c,c,l,32,1,!0]}),u.jsx("shaderMaterial",{ref:a,transparent:!0,side:De,blending:Ge,depthWrite:!1,uniforms:o,vertexShader:`
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
        `})]})},Tc=()=>{const s=[],r=(l,c,t)=>{s.push({x:l,y:c,z:0,rot:[Math.PI/2,0,0],color:t,bodyHeight:40+Math.random()*40})};for(let l=Math.PI*.25;l<Math.PI*1.75;l+=.2)r(-100+Math.cos(l)*80,Math.sin(l)*80,"#00ff00");for(let l=0;l<Math.PI*2;l+=.2)r(100+Math.cos(l)*80,Math.sin(l)*80,"#ff0044");return r(140,-40,"#ff0044"),r(160,-60,"#ff0044"),r(180,-80,"#ff0044"),s},Uc=({position:s,rotation:r=[0,0,0],length:l=6e3,radius:c=250,visible:t})=>{const e=m.useRef(),n=m.useRef(),a=m.useRef(),o=Vt(et,"/assets/images/contango_logo.png"),i=m.useMemo(()=>{const d=[],h=Math.floor(l/5);for(let g=0;g<h;g++){const x=-(g/h)*l,y=g*.1,w=Math.cos(y)*c,_=Math.sin(y)*c,v=Math.cos(y+Math.PI)*c,S=Math.sin(y+Math.PI)*c,A=Math.random()>.5?"#00ff00":"#ff0044",k=20+Math.random()*60,E=[0,0,y+Math.PI/2],j=[0,0,y+Math.PI+Math.PI/2];d.push({x:w,y:_,z:x,rot:E,color:A,bodyHeight:k}),d.push({x:v,y:S,z:x,rot:j,color:A,bodyHeight:k})}return Tc().forEach(g=>{d.push({x:g.x,y:g.y,z:-l-500,rot:g.rot,color:g.color,bodyHeight:g.bodyHeight})}),d},[l,c]),f=i.length;return m.useEffect(()=>{if(!n.current||!a.current)return;const d=new Bt,h=new Ue;for(let p=0;p<f;p++){const g=i[p];d.position.set(g.x,g.y,g.z),d.rotation.set(g.rot[0],g.rot[1],g.rot[2]),d.scale.set(1,g.bodyHeight+40,1),d.updateMatrix(),n.current.setMatrixAt(p,d.matrix),h.set(g.color),n.current.setColorAt(p,h),d.scale.set(1,g.bodyHeight,1),d.updateMatrix(),a.current.setMatrixAt(p,d.matrix),a.current.setColorAt(p,h)}n.current.instanceMatrix.needsUpdate=!0,n.current.instanceColor&&(n.current.instanceColor.needsUpdate=!0),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0)},[i,f]),me(d=>{e.current&&t&&(e.current.rotation.z=d.clock.elapsedTime*.5)}),u.jsxs("group",{position:s,rotation:r,visible:t,children:[u.jsxs("group",{ref:e,children:[u.jsxs("instancedMesh",{ref:n,args:[null,null,f],children:[u.jsx("cylinderGeometry",{args:[2,2,1,8]}),u.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),u.jsxs("instancedMesh",{ref:a,args:[null,null,f],children:[u.jsx("boxGeometry",{args:[10,1,10]}),u.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),u.jsxs("mesh",{position:[0,0,-l-500],children:[u.jsx("planeGeometry",{args:[200,200]}),u.jsx("meshBasicMaterial",{map:o,transparent:!0})]}),u.jsxs("mesh",{position:[0,0,-l/2],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[c*.8,c*.8,l,32,1,!0]}),u.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:De})]})]})},kc=s=>{const[r,l]=m.useState(null);return m.useEffect(()=>{if(!s)return;let c=!0;return new et().load(s,e=>{c&&l(e)},void 0,e=>{}),()=>{c=!1}},[s]),r},Cc=({position:s,rotation:r=[0,0,0],length:l=2e3,radius:c=200,logoPath:t="/legal_eagle_logo.png",visible:e})=>{const n=m.useRef(),a=m.useRef(),o=kc(t),i=m.useMemo(()=>({uTime:{value:0},uColor:{value:new Ue("#ffaa00")}}),[]);me(d=>{a.current&&(a.current.uniforms.uTime.value=d.clock.elapsedTime),n.current&&e&&(n.current.rotation.z=-d.clock.elapsedTime*.15)});const f=m.useMemo(()=>{const d=[];for(let p=0;p<12;p++)d.push({z:-(p/11)*l});return d},[l]);return u.jsxs("group",{position:s,rotation:r,visible:e,children:[u.jsxs("group",{ref:n,children:[u.jsxs("mesh",{rotation:[Math.PI/2,0,0],position:[0,0,-l/2],children:[u.jsx("cylinderGeometry",{args:[c,c,l,64,30,!0]}),u.jsx("shaderMaterial",{ref:a,transparent:!0,side:De,blending:Ge,depthWrite:!1,uniforms:i,vertexShader:`
              varying vec2 vUv;
              varying vec3 vPosition;
              void main() {
                vUv = uv;
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,fragmentShader:`
              uniform float uTime;
              uniform vec3 uColor;
              varying vec2 vUv;
              varying vec3 vPosition;
              
              void main() {
                // High frequency golden spiral lines
                float gridU = abs(sin(vUv.x * 60.0 + uTime * 2.0));
                float gridV = abs(sin(vUv.y * 120.0 - uTime * 15.0));
                float grid = smoothstep(0.96, 1.0, gridU) + smoothstep(0.98, 1.0, gridV);
                
                // Fast-moving golden energy pulses zipping down the tunnel
                float pulses = sin((vUv.x * 12.0) + sin(vUv.y * 3.0)) * sin((vUv.y * 50.0) - (uTime * 35.0));
                pulses = smoothstep(0.85, 1.0, pulses) * 2.5;

                // Base ambient glow inside the tunnel
                float glow = 0.15 + 0.1 * sin(uTime * 2.0 + vUv.y * 5.0);

                // Mix grid and pulses
                float intensity = (grid * 0.4 + pulses * 0.6) + glow;

                // Edge fade at the start and end of the wormhole
                float edgeFade = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

                gl_FragColor = vec4(uColor, intensity * edgeFade);
              }
            `})]}),f.map((d,h)=>u.jsxs("group",{position:[0,0,d.z],children:[u.jsxs("mesh",{children:[u.jsx("ringGeometry",{args:[c*.97,c,64]}),u.jsx("meshBasicMaterial",{color:"#ffaa00",side:Ze,transparent:!0,opacity:.6})]}),u.jsxs("mesh",{scale:[1.05,1.05,1.05],children:[u.jsx("ringGeometry",{args:[c*.95,c,64]}),u.jsx("meshBasicMaterial",{color:"#ffd700",side:Ze,transparent:!0,opacity:.2,blending:Ge})]})]},h))]}),u.jsxs("mesh",{position:[0,0,-l],children:[u.jsx("planeGeometry",{args:[180,180]}),u.jsx("meshBasicMaterial",{map:o,transparent:!0,depthWrite:!1})]})]})},jc=({startZ:s,endZ:r,cameraZ:l})=>{const c=m.useRef(),t=1e3,e=m.useMemo(()=>new Bt,[]),n=m.useMemo(()=>{const a=[],o=s-r;for(let i=0;i<t;i++){const f=Math.random()*Math.PI*2,d=20+Math.random()*30,h=s-Math.random()*o,p=Math.cos(f)*d,g=Math.sin(f)*d,x=Math.random()*Math.PI,y=Math.random()*Math.PI,w=Math.random()*Math.PI,_=1+Math.random()*5,v=(Math.random()-.5)*2;a.push({x:p,y:g,z:h,rx:x,ry:y,rz:w,s:_,rotSpeed:v})}return a},[s,r]);return me(a=>{if(!c.current)return;const o=a.clock.elapsedTime;n.forEach((i,f)=>{e.position.set(i.x,i.y,i.z),e.rotation.set(i.rx+o*i.rotSpeed,i.ry+o*i.rotSpeed*.5,i.rz+o*i.rotSpeed*.2),e.scale.setScalar(i.s),e.updateMatrix(),c.current.setMatrixAt(f,e.matrix)}),c.current.instanceMatrix.needsUpdate=!0}),u.jsxs("instancedMesh",{ref:c,args:[null,null,t],children:[u.jsx("tetrahedronGeometry",{args:[1,0]}),u.jsx("meshStandardMaterial",{color:"#aaddff",metalness:.8,roughness:.2,transparent:!0,opacity:.6,side:Ze})]})},Ac=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ec=`
  varying vec2 vUv;
  uniform float uTime;
  
  // pseudo-random
  float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    // Warp speed streaks
    // vUv.y is the depth. vUv.x is the circumference.
    
    // Quantize the angle to create distinct streaks
    float numStreaks = 200.0;
    float streakId = floor(vUv.x * numStreaks);
    
    // Each streak has a random offset and speed
    float offset = rand(vec2(streakId, 1.0)) * 100.0;
    float speed = 20.0 + rand(vec2(streakId, 2.0)) * 30.0; // very fast
    
    // moving along Y (adding uTime * speed makes them fly UP past the falling camera)
    float y = fract(vUv.y * 5.0 + uTime * speed + offset);
    
    // Streak shape: bright head, trailing tail
    float streakIntensity = smoothstep(0.8, 1.0, y) * smoothstep(1.0, 0.99, y);
    
    // Randomize length and visibility
    float visibility = step(0.5, rand(vec2(streakId, 3.0)));
    streakIntensity *= visibility;
    
    // Tunnel glow
    vec3 baseColor = vec3(0.05, 0.1, 0.2); // dark space blue
    vec3 streakColor = mix(vec3(0.3, 0.7, 1.0), vec3(1.0, 1.0, 1.0), streakIntensity);
    
    // Combine
    vec3 finalColor = baseColor + streakColor * streakIntensity * 3.0;
    
    // Fade out edges
    float alpha = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    
    // Add central bright glow (towards the end of the tunnel)
    float centerGlow = smoothstep(0.5, 1.0, vUv.y);
    finalColor += vec3(0.5, 0.8, 1.0) * centerGlow * 1.5;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`,Pc=({startZ:s,endZ:r,visible:l})=>{const c=m.useRef(),t=8e3,e=-4e3,n=-3500,a=m.useMemo(()=>({uTime:{value:0}}),[]);return me(o=>{c.current&&l&&(c.current.uniforms.uTime.value=o.clock.elapsedTime)}),u.jsxs("mesh",{position:[0,e,n],rotation:[0,0,0],visible:l,children:[u.jsx("cylinderGeometry",{args:[800,100,t,64,64,!0]}),u.jsx("shaderMaterial",{ref:c,vertexShader:Ac,fragmentShader:Ec,uniforms:a,side:De,transparent:!0,blending:Ge,depthWrite:!1})]})},Rc=({position:s,rotation:r,length:l=8e3,visible:c=!0})=>{const t=m.useRef(),e=m.useRef();me(a=>{if(!c||!t.current)return;const o=a.clock.getElapsedTime();t.current.map.offset.y=-o*3,e.current&&(e.current.rotation.y=o*2)});const n=An.useMemo(()=>{const a=document.createElement("canvas");a.width=512,a.height=512;const o=a.getContext("2d"),i=o.createLinearGradient(0,0,0,512);i.addColorStop(0,"#001a33"),i.addColorStop(.5,"#00ccff"),i.addColorStop(1,"#001a33"),o.fillStyle=i,o.fillRect(0,0,512,512),o.fillStyle="#ffffff";for(let d=0;d<200;d++)o.globalAlpha=Math.random()*.5,o.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const f=new Rn(a);return f.wrapS=Et,f.wrapT=Et,f.repeat.set(4,20),f},[]);return u.jsxs("group",{position:s,rotation:r,visible:c,children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[150,150,l,32,1,!0]}),u.jsx("meshStandardMaterial",{ref:t,map:n,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:De,transparent:!0,opacity:.9})]}),u.jsxs("mesh",{ref:e,children:[u.jsx("cylinderGeometry",{args:[140,140,l,16,40,!0]}),u.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:De})]})]})},ut=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3750,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7250,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7250,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.57,x:0,y:-3980,z:-12250,rx:0,ry:0},{p:.59,x:0,y:-3980,z:-13250,rx:0,ry:0},{p:.63,x:0,y:-3980,z:-13250,rx:0,ry:0},{p:.65,x:0,y:-3980,z:-14250,rx:0,ry:0},{p:.67,x:0,y:-3980,z:-15250,rx:0,ry:0},{p:.69,x:0,y:-3980,z:-16250,rx:0,ry:0},{p:.72,x:0,y:-3980,z:-16250,rx:0,ry:0},{p:.74,x:0,y:-3980,z:-16250,rx:-Math.PI/2,ry:0},{p:.77,x:0,y:-7e3,z:-16250,rx:-Math.PI/2,ry:0},{p:.79,x:0,y:-7980,z:-17250,rx:0,ry:0},{p:.81,x:0,y:-7980,z:-18250,rx:0,ry:0},{p:.84,x:0,y:-7980,z:-18250,rx:0,ry:0},{p:.86,x:0,y:-7980,z:-19250,rx:0,ry:0},{p:.88,x:0,y:-7980,z:-20250,rx:0,ry:0},{p:.9,x:0,y:-7980,z:-23750,rx:0,ry:0},{p:.94,x:0,y:-7980,z:-23750,rx:0,ry:0},{p:.96,x:0,y:-7980,z:-24750,rx:0,ry:0},{p:.97,x:0,y:-7980,z:-26250,rx:0,ry:0},{p:.98,x:0,y:-7980,z:-26750,rx:0,ry:0},{p:1,x:0,y:-7980,z:-26750,rx:0,ry:0}],Fc=s=>{if(s<=ut[0].p)return ut[0];if(s>=ut[ut.length-1].p)return ut[ut.length-1];for(let r=0;r<ut.length-1;r++){const l=ut[r],c=ut[r+1];if(s>=l.p&&s<=c.p){const t=(s-l.p)/(c.p-l.p);return{x:Ie.lerp(l.x,c.x,t),y:Ie.lerp(l.y,c.y,t),z:Ie.lerp(l.z,c.z,t),rx:Ie.lerp(l.rx,c.rx,t),ry:Ie.lerp(l.ry,c.ry,t)}}}return ut[0]},Lc=()=>{const s=Je(),r=m.useRef();return me(l=>{const c=s.offset,t=Fc(c);l.camera.position.x=Ie.lerp(l.camera.position.x,t.x,.2),l.camera.position.y=Ie.lerp(l.camera.position.y,t.y,.2),l.camera.position.z=Ie.lerp(l.camera.position.z,t.z,.2);const e=new _t().setFromEuler(new En(t.rx,t.ry,0));l.camera.quaternion.slerp(e,.15);const n=s.delta*10;l.camera.rotateZ(Ie.lerp(0,n*2,.2)),r.current&&r.current.position.copy(l.camera.position)}),u.jsxs("group",{children:[u.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),u.jsx("pointLight",{ref:r,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),u.jsx("ambientLight",{intensity:.2})]})},Ic=()=>{const s=Je(),[r,l]=m.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_auto:!1,auto:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,sentaient:!1}),c=m.useRef(r);return me(()=>{const t=s.offset,e={intro:t<.08,mindwave:t>.04&&t<.18,wormhole_ice:t>.1&&t<.25,icebreaker:t>.18&&t<.35,wormhole_sound:t>.28&&t<.42,interstellar:t>.38&&t<.48,w_legal:t>.43&&t<.54,legal:t>.48&&t<.58,w_auto:t>.53&&t<.65,auto:t>.58&&t<.68,w_clove:t>.63&&t<.72,clove:t>.68&&t<.76,w_fantasy:t>.73&&t<.82,fantasy:t>.78&&t<.88,w_contango:t>.85&&t<.92,contango:t>.88&&t<.97,sentaient:t>.96};let n=!1;for(const a in e)c.current[a]!==e[a]&&(n=!0);n&&(c.current=e,l(e))}),u.jsxs("group",{children:[u.jsx(bc,{startZ:10,endZ:-250,visible:r.intro}),u.jsx(Kl,{position:[0,0,-1350],visible:r.mindwave}),u.jsx(Mc,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:r.wormhole_ice}),u.jsx(Xl,{position:[0,-4e3,-2550],visible:r.icebreaker}),u.jsx(Pc,{startZ:-3750,endZ:-6250,visible:r.wormhole_sound}),u.jsx(tc,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:r.interstellar}),u.jsx(Cc,{position:[0,-4e3,-8750],length:2500,visible:r.w_legal}),u.jsx(ac,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:r.legal}),u.jsx(jc,{startZ:-11250,endZ:-13250,visible:r.w_auto}),u.jsx(lc,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:r.auto}),u.jsx(_c,{position:[0,-4e3,-14750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffff",speed:40,visible:r.w_clove}),u.jsx(uc,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:r.clove}),u.jsx(Rc,{position:[0,-6e3,-16250],rotation:[0,0,0],length:4e3,visible:r.w_fantasy}),u.jsx(hc,{position:[0,-8e3,-18550],rotation:[0,0,0],visible:r.fantasy}),u.jsx(Uc,{position:[0,-8e3,-19250],length:4500,visible:r.w_contango}),u.jsx(vc,{position:[0,-8e3,-24050],rotation:[0,0,0],visible:r.contango}),u.jsx(gc,{position:[0,-8e3,-27050],rotation:[0,0,0],visible:r.sentaient})]})},zc=()=>{const s=Je(),r=m.useRef(),l=m.useRef(),c=m.useRef();return m.useRef(),m.useRef(),me(()=>{const t=s.offset;if(r.current){const e=t<.03?1:0;r.current.style.opacity=e}if(l.current){const e=t>.2&&t<.28?1:0;l.current.style.opacity=e}if(c.current){const e=t>.05&&t<.12?1:0;c.current.style.opacity=e}}),u.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[u.jsxs("div",{ref:r,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[u.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),u.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),u.jsxs("div",{ref:l,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[u.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[u.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:u.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),u.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),u.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),u.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]}),u.jsxs("div",{ref:c,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-blue-500/50 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.2)]",children:[u.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[u.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:u.jsx("img",{src:"/mindwave-logo.png",alt:"MindWave",className:"w-full h-full object-contain scale-150"})}),u.jsx("h2",{className:"text-5xl font-bold",children:"MindWave"})]}),u.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"Cognitive Entrainment OS. Sync your brainwaves and elevate your consciousness."}),u.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Initialize Sequence"})]})]})},Dc=()=>u.jsxs(ji,{gl:{antialias:!1},dpr:[1,2],children:[u.jsx("color",{attach:"background",args:["#020202"]}),u.jsxs(xs,{pages:20,damping:.2,distance:1.2,children:[u.jsxs(An.Suspense,{fallback:null,children:[u.jsx(Lc,{}),u.jsx(Ic,{})]}),u.jsx(Gr,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),u.jsx(Ss,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:u.jsx(zc,{})})]}),u.jsxs(Ai,{disableNormalPass:!0,children:[u.jsx(Ei,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),u.jsx(Pi,{opacity:.05}),u.jsx(Ri,{eskil:!1,offset:.1,darkness:1.1})]})]}),Hc=()=>u.jsxs("div",{className:"relative w-screen h-screen bg-[#050505] font-sans text-white overflow-hidden",children:[u.jsxs(oi,{children:[u.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),u.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),u.jsx("meta",{name:"theme-color",content:"#050505"})]}),u.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:u.jsx(ai,{})}),u.jsx("div",{className:"absolute inset-0 z-0",children:u.jsx(Dc,{})})]});export{Hc as default};
//# sourceMappingURL=index-nzc4v6Sz.js.map
