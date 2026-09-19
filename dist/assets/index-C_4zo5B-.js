import{r as m,g as ka,_ as pt,j as u,R as Vr,H as ii}from"./vendor-Dm8L58fF.js";import{H as si}from"./Header-CAadOMNO.js";import{a9 as Vt,a7 as de,a0 as ve,D as et,$ as mt,P as ja,w as Ca,Q as Tt,r as xt,W as Ua,a1 as nt,f as Ce,i as Fn,a4 as fo,R as li,l as Aa,F as _n,m as Tn,n as Wt,a3 as ci,b as Xr,U as In,J as Ra,_ as kn,Z as uo,s as gr,L as fi,p as Ve,v as ui,u as di,y as hi,H as pi,k as mi,t as vi,B as Ge,X as gi,o as ho,q as yi,x as Yr,c as xi,I as wi,a6 as bi,h as po,a5 as Mi,G as Si,M as _i,A as Ue,aa as Ti,Y as Je,S as tt,z as vr,O as Et,a8 as kt,d as Pa,g as ki,V as ji,K as Ci,j as Ui,T as Ht,e as Ai,C as Ri,E as Pi,a as Ei,N as Li,a2 as Fi}from"./Vignette-BEqCBY2v.js";import"./main-DtOtx5ns.js";import"./preload-helper-BxaVoaJg.js";const yr=new ve,zn=new ve,Ii=new ve,mo=new mt;function zi(l,r,s){const c=yr.setFromMatrixPosition(l.matrixWorld);c.project(r);const t=s.width/2,e=s.height/2;return[c.x*t+t,-(c.y*e)+e]}function Di(l,r){const s=yr.setFromMatrixPosition(l.matrixWorld),c=zn.setFromMatrixPosition(r.matrixWorld),t=s.sub(c),e=r.getWorldDirection(Ii);return t.angleTo(e)>Math.PI/2}function Gi(l,r,s,c){const t=yr.setFromMatrixPosition(l.matrixWorld),e=t.clone();e.project(r),mo.set(e.x,e.y),s.setFromCamera(mo,r);const n=s.intersectObjects(c,!0);if(n.length){const a=n[0].distance;return t.distanceTo(s.ray.origin)<a}return!0}function Oi(l,r){if(r instanceof Ca)return r.zoom;if(r instanceof ja){const s=yr.setFromMatrixPosition(l.matrixWorld),c=zn.setFromMatrixPosition(r.matrixWorld),t=r.fov*Math.PI/180,e=s.distanceTo(c);return 1/(2*Math.tan(t/2)*e)}else return 1}function Bi(l,r,s){if(r instanceof ja||r instanceof Ca){const c=yr.setFromMatrixPosition(l.matrixWorld),t=zn.setFromMatrixPosition(r.matrixWorld),e=c.distanceTo(t),n=(s[1]-s[0])/(r.far-r.near),a=s[1]-n*r.far;return Math.round(n*e+a)}}const jn=l=>Math.abs(l)<1e-10?0:l;function Ea(l,r,s=""){let c="matrix3d(";for(let t=0;t!==16;t++)c+=jn(r[t]*l.elements[t])+(t!==15?",":")");return s+c}const Wi=(l=>r=>Ea(r,l))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),Ni=(l=>(r,s)=>Ea(r,l(s),"translate(-50%,-50%)"))(l=>[1/l,1/l,1/l,1,-1/l,-1/l,-1/l,-1,1/l,1/l,1/l,1,1,1,1,1]);function Hi(l){return l&&typeof l=="object"&&"current"in l}const Vi=m.forwardRef(({children:l,eps:r=.001,style:s,className:c,prepend:t,center:e,fullscreen:n,portal:a,distanceFactor:o,sprite:i=!1,transform:f=!1,occlude:d,onOcclude:h,castShadow:p,receiveShadow:g,material:x,geometry:y,zIndexRange:M=[16777271,0],calculatePosition:S=zi,as:v="div",wrapperClass:b,pointerEvents:T="auto",...A},j)=>{const{gl:R,camera:U,scene:L,size:H,raycaster:_,events:F,viewport:E}=Vt(),[Y]=m.useState(()=>document.createElement(v)),V=m.useRef(),Z=m.useRef(null),ie=m.useRef(0),N=m.useRef([0,0]),z=m.useRef(null),w=m.useRef(null),k=(a==null?void 0:a.current)||F.connected||R.domElement.parentNode,C=m.useRef(null),I=m.useRef(!1),P=m.useMemo(()=>d&&d!=="blending"||Array.isArray(d)&&d.length&&Hi(d[0]),[d]);m.useLayoutEffect(()=>{const Q=R.domElement;d&&d==="blending"?(Q.style.zIndex=`${Math.floor(M[0]/2)}`,Q.style.position="absolute",Q.style.pointerEvents="none"):(Q.style.zIndex=null,Q.style.position=null,Q.style.pointerEvents=null)},[d]),m.useLayoutEffect(()=>{if(Z.current){const Q=V.current=ka(Y);if(L.updateMatrixWorld(),f)Y.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const G=S(Z.current,U,H);Y.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${G[0]}px,${G[1]}px,0);transform-origin:0 0;`}return k&&(t?k.prepend(Y):k.appendChild(Y)),()=>{k&&k.removeChild(Y),Q.unmount()}}},[k,f]),m.useLayoutEffect(()=>{b&&(Y.className=b)},[b]);const X=m.useMemo(()=>f?{position:"absolute",top:0,left:0,width:H.width,height:H.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:e?"translate3d(-50%,-50%,0)":"none",...n&&{top:-H.height/2,left:-H.width/2,width:H.width,height:H.height},...s},[s,e,n,H,f]),D=m.useMemo(()=>({position:"absolute",pointerEvents:T}),[T]);m.useLayoutEffect(()=>{if(I.current=!1,f){var Q;(Q=V.current)==null||Q.render(m.createElement("div",{ref:z,style:X},m.createElement("div",{ref:w,style:D},m.createElement("div",{ref:j,className:c,style:s,children:l}))))}else{var G;(G=V.current)==null||G.render(m.createElement("div",{ref:j,style:X,className:c,children:l}))}});const O=m.useRef(!0);de(Q=>{if(Z.current){U.updateMatrixWorld(),Z.current.updateWorldMatrix(!0,!1);const G=f?N.current:S(Z.current,U,H);if(f||Math.abs(ie.current-U.zoom)>r||Math.abs(N.current[0]-G[0])>r||Math.abs(N.current[1]-G[1])>r){const W=Di(Z.current,U);let he=!1;P&&(Array.isArray(d)?he=d.map(oe=>oe.current):d!=="blending"&&(he=[L]));const fe=O.current;if(he){const oe=Gi(Z.current,U,_,he);O.current=oe&&!W}else O.current=!W;fe!==O.current&&(h?h(!O.current):Y.style.display=O.current?"block":"none");const $=Math.floor(M[0]/2),ae=d?P?[M[0],$]:[$-1,0]:M;if(Y.style.zIndex=`${Bi(Z.current,U,ae)}`,f){const[oe,q]=[H.width/2,H.height/2],ne=U.projectionMatrix.elements[5]*q,{isOrthographicCamera:re,top:B,left:ge,bottom:ee,right:se}=U,J=Wi(U.matrixWorldInverse),Se=re?`scale(${ne})translate(${jn(-(se+ge)/2)}px,${jn((B+ee)/2)}px)`:`translateZ(${ne}px)`;let te=Z.current.matrixWorld;i&&(te=U.matrixWorldInverse.clone().transpose().copyPosition(te).scale(Z.current.scale),te.elements[3]=te.elements[7]=te.elements[11]=0,te.elements[15]=1),Y.style.width=H.width+"px",Y.style.height=H.height+"px",Y.style.perspective=re?"":`${ne}px`,z.current&&w.current&&(z.current.style.transform=`${Se}${J}translate(${oe}px,${q}px)`,w.current.style.transform=Ni(te,1/((o||10)/400)))}else{const oe=o===void 0?1:Oi(Z.current,U)*o;Y.style.transform=`translate3d(${G[0]}px,${G[1]}px,0) scale(${oe})`}N.current=G,ie.current=U.zoom}}if(!P&&C.current&&!I.current)if(f){if(z.current){const G=z.current.children[0];if(G!=null&&G.clientWidth&&G!=null&&G.clientHeight){const{isOrthographicCamera:W}=U;if(W||y)A.scale&&(Array.isArray(A.scale)?A.scale instanceof ve?C.current.scale.copy(A.scale.clone().divideScalar(1)):C.current.scale.set(1/A.scale[0],1/A.scale[1],1/A.scale[2]):C.current.scale.setScalar(1/A.scale));else{const he=(o||10)/400,fe=G.clientWidth*he,$=G.clientHeight*he;C.current.scale.set(fe,$,1)}I.current=!0}}}else{const G=Y.children[0];if(G!=null&&G.clientWidth&&G!=null&&G.clientHeight){const W=1/E.factor,he=G.clientWidth*W,fe=G.clientHeight*W;C.current.scale.set(he,fe,1),I.current=!0}C.current.lookAt(Q.camera.position)}});const K=m.useMemo(()=>({vertexShader:f?void 0:`
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
      `}),[f]);return m.createElement("group",pt({},A,{ref:Z}),d&&!P&&m.createElement("mesh",{castShadow:p,receiveShadow:g,ref:C},y||m.createElement("planeGeometry",null),x||m.createElement("shaderMaterial",{side:et,vertexShader:K.vertexShader,fragmentShader:K.fragmentShader})))});function hr(l,r,s){return r in l?Object.defineProperty(l,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):l[r]=s,l}function Cn(l,r){(r==null||r>l.length)&&(r=l.length);for(var s=0,c=new Array(r);s<r;s++)c[s]=l[s];return c}function Xi(l,r){if(l){if(typeof l=="string")return Cn(l,r);var s=Object.prototype.toString.call(l).slice(8,-1);if(s==="Object"&&l.constructor&&(s=l.constructor.name),s==="Map"||s==="Set")return Array.from(l);if(s==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return Cn(l,r)}}function Yi(l){if(Array.isArray(l))return Cn(l)}function qi(l){if(typeof Symbol<"u"&&l[Symbol.iterator]!=null||l["@@iterator"]!=null)return Array.from(l)}function Zi(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qi(l){return Yi(l)||qi(l)||Xi(l)||Zi()}new mt;new mt;function Ki(l,r,s){return Math.max(r,Math.min(s,l))}function Ji(l,r){return Ki(l-Math.floor(l/r)*r,0,r)}function $i(l,r){var s=Ji(r-l,Math.PI*2);return s>Math.PI&&(s-=Math.PI*2),s}function La(l,r){if(!(l instanceof r))throw new TypeError("Cannot call a class as a function")}var rt=function l(r,s,c){var t=this;La(this,l),hr(this,"dot2",function(e,n){return t.x*e+t.y*n}),hr(this,"dot3",function(e,n,a){return t.x*e+t.y*n+t.z*a}),this.x=r,this.y=s,this.z=c},es=[new rt(1,1,0),new rt(-1,1,0),new rt(1,-1,0),new rt(-1,-1,0),new rt(1,0,1),new rt(-1,0,1),new rt(1,0,-1),new rt(-1,0,-1),new rt(0,1,1),new rt(0,-1,1),new rt(0,1,-1),new rt(0,-1,-1)],vo=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],go=new Array(512),yo=new Array(512),ts=function(r){r>0&&r<1&&(r*=65536),r=Math.floor(r),r<256&&(r|=r<<8);for(var s=0;s<256;s++){var c;s&1?c=vo[s]^r&255:c=vo[s]^r>>8&255,go[s]=go[s+256]=c,yo[s]=yo[s+256]=es[c%12]}};ts(0);function rs(l){if(typeof l=="number")l=Math.abs(l);else if(typeof l=="string"){var r=l;l=0;for(var s=0;s<r.length;s++)l=(l+(s+1)*(r.charCodeAt(s)%96))%2147483647}return l===0&&(l=311),l}function xo(l){var r=rs(l);return function(){var s=r*48271%2147483647;return r=s,s/2147483647}}var ns=function l(r){var s=this;La(this,l),hr(this,"seed",0),hr(this,"init",function(c){s.seed=c,s.value=xo(c)}),hr(this,"value",xo(this.seed)),this.init(r)};new ns(Math.random());var os=function(r){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return c/Math.atan(1/s)*Math.atan(Math.sin(2*Math.PI*r*t)/s)},Fa=function(r){return 1/(1+r+.48*r*r+.235*r*r*r)},as=function(r){return r},is={in:function(r){return 1-Math.cos(r*Math.PI/2)},out:function(r){return Math.sin(r*Math.PI/2)},inOut:function(r){return-(Math.cos(Math.PI*r)-1)/2}},ss={in:function(r){return r*r*r},out:function(r){return 1-Math.pow(1-r,3)},inOut:function(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}},ls={in:function(r){return r*r*r*r*r},out:function(r){return 1-Math.pow(1-r,5)},inOut:function(r){return r<.5?16*r*r*r*r*r:1-Math.pow(-2*r+2,5)/2}},cs={in:function(r){return 1-Math.sqrt(1-Math.pow(r,2))},out:function(r){return Math.sqrt(1-Math.pow(r-1,2))},inOut:function(r){return r<.5?(1-Math.sqrt(1-Math.pow(2*r,2)))/2:(Math.sqrt(1-Math.pow(-2*r+2,2))+1)/2}},fs={in:function(r){return r*r*r*r},out:function(r){return 1- --r*r*r*r},inOut:function(r){return r<.5?8*r*r*r*r:1-8*--r*r*r*r}},us={in:function(r){return r===0?0:Math.pow(2,10*r-10)},out:function(r){return r===1?1:1-Math.pow(2,-10*r)},inOut:function(r){return r===0?0:r===1?1:r<.5?Math.pow(2,20*r-10)/2:(2-Math.pow(2,-20*r+10))/2}};function De(l,r,s){var c=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,t=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,e=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,n=arguments.length>6&&arguments[6]!==void 0?arguments[6]:Fa,a=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,o="velocity_"+r;if(l.__damp===void 0&&(l.__damp={}),l.__damp[o]===void 0&&(l.__damp[o]=0),Math.abs(l[r]-s)<=a)return l[r]=s,!1;c=Math.max(1e-4,c);var i=2/c,f=n(i*t),d=l[r]-s,h=s,p=e*c;d=Math.min(Math.max(d,-p),p),s=l[r]-d;var g=(l.__damp[o]+i*d)*t;l.__damp[o]=(l.__damp[o]-i*g)*f;var x=s+(d+g)*f;return h-l[r]>0==x>h&&(x=h,l.__damp[o]=(x-h)/t),l[r]=x,!0}var ds=function(r){return r&&r.isCamera},hs=function(r){return r&&r.isLight},nr=new ve,wo=new Tt,bo=new Tt,or=new xt,vn=new ve;function ps(l,r,s,c,t,e,n){typeof r=="number"?nr.setScalar(r):Array.isArray(r)?nr.set(r[0],r[1],r[2]):nr.copy(r);var a=l.parent;l.updateWorldMatrix(!0,!1),vn.setFromMatrixPosition(l.matrixWorld),ds(l)||hs(l)?or.lookAt(vn,nr,l.up):or.lookAt(nr,vn,l.up),Hr(l.quaternion,bo.setFromRotationMatrix(or),s,c,t,e,n),a&&(or.extractRotation(a.matrixWorld),wo.setFromRotationMatrix(or),Hr(l.quaternion,bo.copy(l.quaternion).premultiply(wo.invert()),s,c,t,e,n))}function Nt(l,r,s,c,t,e,n,a){return De(l,r,l[r]+$i(l[r],s),c,t,e,n,a)}var ar=new mt,Mo,So;function ms(l,r,s,c,t,e,n){return typeof r=="number"?ar.setScalar(r):Array.isArray(r)?ar.set(r[0],r[1]):ar.copy(r),Mo=De(l,"x",ar.x,s,c,t,e,n),So=De(l,"y",ar.y,s,c,t,e,n),Mo||So}var Gt=new ve,_o,To,ko;function Un(l,r,s,c,t,e,n){return typeof r=="number"?Gt.setScalar(r):Array.isArray(r)?Gt.set(r[0],r[1],r[2]):Gt.copy(r),_o=De(l,"x",Gt.x,s,c,t,e,n),To=De(l,"y",Gt.y,s,c,t,e,n),ko=De(l,"z",Gt.z,s,c,t,e,n),_o||To||ko}var Ut=new nt,jo,Co,Uo,Ao;function vs(l,r,s,c,t,e,n){return typeof r=="number"?Ut.setScalar(r):Array.isArray(r)?Ut.set(r[0],r[1],r[2],r[3]):Ut.copy(r),jo=De(l,"x",Ut.x,s,c,t,e,n),Co=De(l,"y",Ut.y,s,c,t,e,n),Uo=De(l,"z",Ut.z,s,c,t,e,n),Ao=De(l,"w",Ut.w,s,c,t,e,n),jo||Co||Uo||Ao}var ir=new Fn,Ro,Po,Eo;function gs(l,r,s,c,t,e,n){return Array.isArray(r)?ir.set(r[0],r[1],r[2],r[3]):ir.copy(r),Ro=Nt(l,"x",ir.x,s,c,t,e,n),Po=Nt(l,"y",ir.y,s,c,t,e,n),Eo=Nt(l,"z",ir.z,s,c,t,e,n),Ro||Po||Eo}var Ot=new Ce,Lo,Fo,Io;function ys(l,r,s,c,t,e,n){return r instanceof Ce?Ot.copy(r):Array.isArray(r)?Ot.setRGB(r[0],r[1],r[2]):Ot.set(r),Lo=De(l,"r",Ot.r,s,c,t,e,n),Fo=De(l,"g",Ot.g,s,c,t,e,n),Io=De(l,"b",Ot.b,s,c,t,e,n),Lo||Fo||Io}var st=new Tt,yt=new nt,zo=new nt,sr=new nt,Do,Go,Oo,Bo;function Hr(l,r,s,c,t,e,n){var a=l;Array.isArray(r)?st.set(r[0],r[1],r[2],r[3]):st.copy(r);var o=l.dot(st)>0?1:-1;return st.x*=o,st.y*=o,st.z*=o,st.w*=o,Do=De(l,"x",st.x,s,c,t,e,n),Go=De(l,"y",st.y,s,c,t,e,n),Oo=De(l,"z",st.z,s,c,t,e,n),Bo=De(l,"w",st.w,s,c,t,e,n),yt.set(l.x,l.y,l.z,l.w).normalize(),zo.set(a.__damp.velocity_x,a.__damp.velocity_y,a.__damp.velocity_z,a.__damp.velocity_w),sr.copy(yt).multiplyScalar(zo.dot(yt)/yt.dot(yt)),a.__damp.velocity_x-=sr.x,a.__damp.velocity_y-=sr.y,a.__damp.velocity_z-=sr.z,a.__damp.velocity_w-=sr.w,l.set(yt.x,yt.y,yt.z,yt.w),Do||Go||Oo||Bo}var lr=new Ua,Wo,No,Ho;function xs(l,r,s,c,t,e,n){return Array.isArray(r)?lr.set(r[0],r[1],r[2]):lr.copy(r),Wo=De(l,"radius",lr.radius,s,c,t,e,n),No=Nt(l,"phi",lr.phi,s,c,t,e,n),Ho=Nt(l,"theta",lr.theta,s,c,t,e,n),Wo||No||Ho}var Pr=new xt,Vo=new ve,Xo=new Tt,Yo=new ve,qo,Zo,Qo;function ws(l,r,s,c,t,e,n){var a=l;return a.__damp===void 0&&(a.__damp={position:new ve,rotation:new Tt,scale:new ve},l.decompose(a.__damp.position,a.__damp.rotation,a.__damp.scale)),Array.isArray(r)?Pr.set.apply(Pr,Qi(r)):Pr.copy(r),Pr.decompose(Vo,Xo,Yo),qo=Un(a.__damp.position,Vo,s,c,t,e,n),Zo=Hr(a.__damp.rotation,Xo,s,c,t,e,n),Qo=Un(a.__damp.scale,Yo,s,c,t,e,n),l.compose(a.__damp.position,a.__damp.rotation,a.__damp.scale),qo||Zo||Qo}var Ko=Object.freeze({__proto__:null,rsqw:os,exp:Fa,linear:as,sine:is,cubic:ss,quint:ls,circ:cs,quart:fs,expo:us,damp:De,dampLookAt:ps,dampAngle:Nt,damp2:ms,damp3:Un,damp4:vs,dampE:gs,dampC:ys,dampQ:Hr,dampS:xs,dampM:ws});const Dn=m.createContext(null);function Xe(){return m.useContext(Dn)}function bs({eps:l=1e-5,enabled:r=!0,infinite:s,horizontal:c,pages:t=1,distance:e=1,damping:n=.25,maxSpeed:a=1/0,prepend:o=!1,style:i={},children:f}){const{get:d,setEvents:h,gl:p,size:g,invalidate:x,events:y}=Vt(),[M]=m.useState(()=>document.createElement("div")),[S]=m.useState(()=>document.createElement("div")),[v]=m.useState(()=>document.createElement("div")),b=p.domElement.parentNode,T=m.useRef(0),A=m.useMemo(()=>({el:M,eps:l,fill:S,fixed:v,horizontal:c,damping:n,offset:0,delta:0,scroll:T,pages:t,range(U,L,H=0){const _=U-H,F=_+L+H*2;return this.offset<_?0:this.offset>F?1:(this.offset-_)/(F-_)},curve(U,L,H=0){return Math.sin(this.range(U,L,H)*Math.PI)},visible(U,L,H=0){const _=U-H,F=_+L+H*2;return this.offset>=_&&this.offset<=F}}),[l,n,c,t]);m.useEffect(()=>{M.style.position="absolute",M.style.width="100%",M.style.height="100%",M.style[c?"overflowX":"overflowY"]="auto",M.style[c?"overflowY":"overflowX"]="hidden",M.style.top="0px",M.style.left="0px";for(const L in i)M.style[L]=i[L];v.style.position="sticky",v.style.top="0px",v.style.left="0px",v.style.width="100%",v.style.height="100%",v.style.overflow="hidden",M.appendChild(v),S.style.height=c?"100%":`${t*e*100}%`,S.style.width=c?`${t*e*100}%`:"100%",S.style.pointerEvents="none",M.appendChild(S),o?b.prepend(M):b.appendChild(M),M[c?"scrollLeft":"scrollTop"]=1;const R=y.connected||p.domElement;requestAnimationFrame(()=>y.connect==null?void 0:y.connect(M));const U=d().events.compute;return h({compute(L,H){const{left:_,top:F}=b.getBoundingClientRect(),E=L.clientX-_,Y=L.clientY-F;H.pointer.set(E/H.size.width*2-1,-(Y/H.size.height)*2+1),H.raycaster.setFromCamera(H.pointer,H.camera)}}),()=>{b.removeChild(M),h({compute:U}),y.connect==null||y.connect(R)}},[t,e,c,M,S,v,b]),m.useEffect(()=>{if(y.connected===M){const R=g[c?"width":"height"],U=M[c?"scrollWidth":"scrollHeight"],L=U-R;let H=0,_=!0,F=!0;const E=()=>{if(!(!r||F)&&(x(),H=M[c?"scrollLeft":"scrollTop"],T.current=H/L,s)){if(!_){if(H>=L){const V=1-A.offset;M[c?"scrollLeft":"scrollTop"]=1,T.current=A.offset=-V,_=!0}else if(H<=0){const V=1+A.offset;M[c?"scrollLeft":"scrollTop"]=U,T.current=A.offset=V,_=!0}}_&&setTimeout(()=>_=!1,40)}};M.addEventListener("scroll",E,{passive:!0}),requestAnimationFrame(()=>F=!1);const Y=V=>M.scrollLeft+=V.deltaY/2;return c&&M.addEventListener("wheel",Y,{passive:!0}),()=>{M.removeEventListener("scroll",E),c&&M.removeEventListener("wheel",Y)}}},[M,y,g,s,A,x,c,r]);let j=0;return de((R,U)=>{j=A.offset,Ko.damp(A,"offset",T.current,n,U,a,void 0,l),Ko.damp(A,"delta",Math.abs(j-A.offset),n,U,a,void 0,l),A.delta>l&&x()}),m.createElement(Dn.Provider,{value:A},f)}const Ms=m.forwardRef(({children:l},r)=>{const s=m.useRef(null);m.useImperativeHandle(r,()=>s.current,[]);const c=Xe(),{width:t,height:e}=Vt(n=>n.viewport);return de(()=>{s.current.position.x=c.horizontal?-t*(c.pages-1)*c.offset:0,s.current.position.y=c.horizontal?0:e*(c.pages-1)*c.offset}),m.createElement("group",{ref:s},l)}),Ss=m.forwardRef(({children:l,style:r,...s},c)=>{const t=Xe(),e=m.useRef(null);m.useImperativeHandle(c,()=>e.current,[]);const{width:n,height:a}=Vt(f=>f.size),o=m.useContext(fo),i=m.useMemo(()=>ka(t.fixed),[t.fixed]);return de(()=>{t.delta>t.eps&&(e.current.style.transform=`translate3d(${t.horizontal?-n*(t.pages-1)*t.offset:0}px,${t.horizontal?0:a*(t.pages-1)*-t.offset}px,0)`)}),i.render(m.createElement("div",pt({ref:e,style:{...r,position:"absolute",top:0,left:0,willChange:"transform"}},s),m.createElement(Dn.Provider,{value:t},m.createElement(fo.Provider,{value:o},l)))),null}),_s=m.forwardRef(({html:l,...r},s)=>{const c=l?Ss:Ms;return m.createElement(c,pt({ref:s},r))}),Ia=parseInt(li.replace(/\D+/g,"")),za=Ia>=125?"uv1":"uv2",Jo=new Xr,Er=new ve;class Gn extends Aa{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const r=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],s=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],c=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(c),this.setAttribute("position",new _n(r,3)),this.setAttribute("uv",new _n(s,2))}applyMatrix4(r){const s=this.attributes.instanceStart,c=this.attributes.instanceEnd;return s!==void 0&&(s.applyMatrix4(r),c.applyMatrix4(r),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(r){let s;r instanceof Float32Array?s=r:Array.isArray(r)&&(s=new Float32Array(r));const c=new Tn(s,6,1);return this.setAttribute("instanceStart",new Wt(c,3,0)),this.setAttribute("instanceEnd",new Wt(c,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(r,s=3){let c;r instanceof Float32Array?c=r:Array.isArray(r)&&(c=new Float32Array(r));const t=new Tn(c,s*2,1);return this.setAttribute("instanceColorStart",new Wt(t,s,0)),this.setAttribute("instanceColorEnd",new Wt(t,s,s)),this}fromWireframeGeometry(r){return this.setPositions(r.attributes.position.array),this}fromEdgesGeometry(r){return this.setPositions(r.attributes.position.array),this}fromMesh(r){return this.fromWireframeGeometry(new ci(r.geometry)),this}fromLineSegments(r){const s=r.geometry;return this.setPositions(s.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xr);const r=this.attributes.instanceStart,s=this.attributes.instanceEnd;r!==void 0&&s!==void 0&&(this.boundingBox.setFromBufferAttribute(r),Jo.setFromBufferAttribute(s),this.boundingBox.union(Jo))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In),this.boundingBox===null&&this.computeBoundingBox();const r=this.attributes.instanceStart,s=this.attributes.instanceEnd;if(r!==void 0&&s!==void 0){const c=this.boundingSphere.center;this.boundingBox.getCenter(c);let t=0;for(let e=0,n=r.count;e<n;e++)Er.fromBufferAttribute(r,e),t=Math.max(t,c.distanceToSquared(Er)),Er.fromBufferAttribute(s,e),t=Math.max(t,c.distanceToSquared(Er));this.boundingSphere.radius=Math.sqrt(t),isNaN(this.boundingSphere.radius)}}toJSON(){}applyMatrix(r){return this.applyMatrix4(r)}}class Da extends Gn{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(r){const s=r.length-3,c=new Float32Array(2*s);for(let t=0;t<s;t+=3)c[2*t]=r[t],c[2*t+1]=r[t+1],c[2*t+2]=r[t+2],c[2*t+3]=r[t+3],c[2*t+4]=r[t+4],c[2*t+5]=r[t+5];return super.setPositions(c),this}setColors(r,s=3){const c=r.length-s,t=new Float32Array(2*c);if(s===3)for(let e=0;e<c;e+=s)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5];else for(let e=0;e<c;e+=s)t[2*e]=r[e],t[2*e+1]=r[e+1],t[2*e+2]=r[e+2],t[2*e+3]=r[e+3],t[2*e+4]=r[e+4],t[2*e+5]=r[e+5],t[2*e+6]=r[e+6],t[2*e+7]=r[e+7];return super.setColors(t,s),this}fromLine(r){const s=r.geometry;return this.setPositions(s.attributes.position.array),this}}class On extends Ra{constructor(r){super({type:"LineMaterial",uniforms:kn.clone(kn.merge([uo.common,uo.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new mt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${Ia>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(s){this.uniforms.diffuse.value=s}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(s){s===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(s){this.uniforms.linewidth.value=s}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(s){!!s!="USE_DASH"in this.defines&&(this.needsUpdate=!0),s===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(s){this.uniforms.dashScale.value=s}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(s){this.uniforms.dashSize.value=s}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(s){this.uniforms.dashOffset.value=s}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(s){this.uniforms.gapSize.value=s}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(s){this.uniforms.opacity.value=s}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(s){this.uniforms.resolution.value.copy(s)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(s){!!s!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),s===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(r)}}const gn=new nt,$o=new ve,ea=new ve,Oe=new nt,Be=new nt,ft=new nt,yn=new ve,xn=new xt,Ne=new fi,ta=new ve,Lr=new Xr,Fr=new In,ut=new nt;let ht,Rt;function ra(l,r,s){return ut.set(0,0,-r,1).applyMatrix4(l.projectionMatrix),ut.multiplyScalar(1/ut.w),ut.x=Rt/s.width,ut.y=Rt/s.height,ut.applyMatrix4(l.projectionMatrixInverse),ut.multiplyScalar(1/ut.w),Math.abs(Math.max(ut.x,ut.y))}function Ts(l,r){const s=l.matrixWorld,c=l.geometry,t=c.attributes.instanceStart,e=c.attributes.instanceEnd,n=Math.min(c.instanceCount,t.count);for(let a=0,o=n;a<o;a++){Ne.start.fromBufferAttribute(t,a),Ne.end.fromBufferAttribute(e,a),Ne.applyMatrix4(s);const i=new ve,f=new ve;ht.distanceSqToSegment(Ne.start,Ne.end,f,i),f.distanceTo(i)<Rt*.5&&r.push({point:f,pointOnLine:i,distance:ht.origin.distanceTo(f),object:l,face:null,faceIndex:a,uv:null,[za]:null})}}function ks(l,r,s){const c=r.projectionMatrix,e=l.material.resolution,n=l.matrixWorld,a=l.geometry,o=a.attributes.instanceStart,i=a.attributes.instanceEnd,f=Math.min(a.instanceCount,o.count),d=-r.near;ht.at(1,ft),ft.w=1,ft.applyMatrix4(r.matrixWorldInverse),ft.applyMatrix4(c),ft.multiplyScalar(1/ft.w),ft.x*=e.x/2,ft.y*=e.y/2,ft.z=0,yn.copy(ft),xn.multiplyMatrices(r.matrixWorldInverse,n);for(let h=0,p=f;h<p;h++){if(Oe.fromBufferAttribute(o,h),Be.fromBufferAttribute(i,h),Oe.w=1,Be.w=1,Oe.applyMatrix4(xn),Be.applyMatrix4(xn),Oe.z>d&&Be.z>d)continue;if(Oe.z>d){const v=Oe.z-Be.z,b=(Oe.z-d)/v;Oe.lerp(Be,b)}else if(Be.z>d){const v=Be.z-Oe.z,b=(Be.z-d)/v;Be.lerp(Oe,b)}Oe.applyMatrix4(c),Be.applyMatrix4(c),Oe.multiplyScalar(1/Oe.w),Be.multiplyScalar(1/Be.w),Oe.x*=e.x/2,Oe.y*=e.y/2,Be.x*=e.x/2,Be.y*=e.y/2,Ne.start.copy(Oe),Ne.start.z=0,Ne.end.copy(Be),Ne.end.z=0;const x=Ne.closestPointToPointParameter(yn,!0);Ne.at(x,ta);const y=Ve.lerp(Oe.z,Be.z,x),M=y>=-1&&y<=1,S=yn.distanceTo(ta)<Rt*.5;if(M&&S){Ne.start.fromBufferAttribute(o,h),Ne.end.fromBufferAttribute(i,h),Ne.start.applyMatrix4(n),Ne.end.applyMatrix4(n);const v=new ve,b=new ve;ht.distanceSqToSegment(Ne.start,Ne.end,b,v),s.push({point:b,pointOnLine:v,distance:ht.origin.distanceTo(b),object:l,face:null,faceIndex:h,uv:null,[za]:null})}}}class Ga extends gr{constructor(r=new Gn,s=new On({color:Math.random()*16777215})){super(r,s),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const r=this.geometry,s=r.attributes.instanceStart,c=r.attributes.instanceEnd,t=new Float32Array(2*s.count);for(let n=0,a=0,o=s.count;n<o;n++,a+=2)$o.fromBufferAttribute(s,n),ea.fromBufferAttribute(c,n),t[a]=a===0?0:t[a-1],t[a+1]=t[a]+$o.distanceTo(ea);const e=new Tn(t,2,1);return r.setAttribute("instanceDistanceStart",new Wt(e,1,0)),r.setAttribute("instanceDistanceEnd",new Wt(e,1,1)),this}raycast(r,s){const c=this.material.worldUnits,t=r.camera,e=r.params.Line2!==void 0&&r.params.Line2.threshold||0;ht=r.ray;const n=this.matrixWorld,a=this.geometry,o=this.material;Rt=o.linewidth+e,a.boundingSphere===null&&a.computeBoundingSphere(),Fr.copy(a.boundingSphere).applyMatrix4(n);let i;if(c)i=Rt*.5;else{const d=Math.max(t.near,Fr.distanceToPoint(ht.origin));i=ra(t,d,o.resolution)}if(Fr.radius+=i,ht.intersectsSphere(Fr)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Lr.copy(a.boundingBox).applyMatrix4(n);let f;if(c)f=Rt*.5;else{const d=Math.max(t.near,Lr.distanceToPoint(ht.origin));f=ra(t,d,o.resolution)}Lr.expandByScalar(f),ht.intersectsBox(Lr)!==!1&&(c?Ts(this,s):ks(this,t,s))}onBeforeRender(r){const s=this.material.uniforms;s&&s.resolution&&(r.getViewport(gn),this.material.uniforms.resolution.value.set(gn.z,gn.w))}}class js extends Ga{constructor(r=new Da,s=new On({color:Math.random()*16777215})){super(r,s),this.isLine2=!0,this.type="Line2"}}const Oa=m.forwardRef(function({children:r,follow:s=!0,lockX:c=!1,lockY:t=!1,lockZ:e=!1,...n},a){const o=m.useRef(null),i=m.useRef(null),f=new Tt;return de(({camera:d})=>{if(!s||!i.current)return;const h=i.current.rotation.clone();i.current.updateMatrix(),i.current.updateWorldMatrix(!1,!1),i.current.getWorldQuaternion(f),d.getWorldQuaternion(o.current.quaternion).premultiply(f.invert()),c&&(i.current.rotation.x=h.x),t&&(i.current.rotation.y=h.y),e&&(i.current.rotation.z=h.z)}),m.useImperativeHandle(a,()=>i.current,[]),m.createElement("group",pt({ref:i},n),m.createElement("group",{ref:o},r))}),Cs=m.forwardRef(function({points:r,color:s=16777215,vertexColors:c,linewidth:t,lineWidth:e,segments:n,dashed:a,...o},i){var f,d;const h=Vt(M=>M.size),p=m.useMemo(()=>n?new Ga:new js,[n]),[g]=m.useState(()=>new On),x=(c==null||(f=c[0])==null?void 0:f.length)===4?4:3,y=m.useMemo(()=>{const M=n?new Gn:new Da,S=r.map(v=>{const b=Array.isArray(v);return v instanceof ve||v instanceof nt?[v.x,v.y,v.z]:v instanceof mt?[v.x,v.y,0]:b&&v.length===3?[v[0],v[1],v[2]]:b&&v.length===2?[v[0],v[1],0]:v});if(M.setPositions(S.flat()),c){s=16777215;const v=c.map(b=>b instanceof Ce?b.toArray():b);M.setColors(v.flat(),x)}return M},[r,n,c,x]);return m.useLayoutEffect(()=>{p.computeLineDistances()},[r,p]),m.useLayoutEffect(()=>{a?g.defines.USE_DASH="":delete g.defines.USE_DASH,g.needsUpdate=!0},[a,g]),m.useEffect(()=>()=>{y.dispose(),g.dispose()},[y]),m.createElement("primitive",pt({object:p,ref:i},o),m.createElement("primitive",{object:y,attach:"geometry"}),m.createElement("primitive",pt({object:g,attach:"material",color:s,vertexColors:!!c,resolution:[h.width,h.height],linewidth:(d=t??e)!==null&&d!==void 0?d:1,dashed:a,transparent:x===4},o)))});function Us(){var l=Object.create(null);function r(t,e){var n=t.id,a=t.name,o=t.dependencies;o===void 0&&(o=[]);var i=t.init;i===void 0&&(i=function(){});var f=t.getTransferables;if(f===void 0&&(f=null),!l[n])try{o=o.map(function(h){return h&&h.isWorkerModule&&(r(h,function(p){if(p instanceof Error)throw p}),h=l[h.id].value),h}),i=c("<"+a+">.init",i),f&&(f=c("<"+a+">.getTransferables",f));var d=null;typeof i=="function"&&(d=i.apply(void 0,o)),l[n]={id:n,value:d,getTransferables:f},e(d)}catch(h){h&&h.noLog,e(h)}}function s(t,e){var n,a=t.id,o=t.args;(!l[a]||typeof l[a].value!="function")&&e(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var i=(n=l[a]).value.apply(n,o);i&&typeof i.then=="function"?i.then(f,function(d){return e(d instanceof Error?d:new Error(""+d))}):f(i)}catch(d){e(d)}function f(d){try{var h=l[a].getTransferables&&l[a].getTransferables(d);(!h||!Array.isArray(h)||!h.length)&&(h=void 0),e(d,h)}catch(p){e(p)}}}function c(t,e){var n=void 0;self.troikaDefine=function(o){return n=o};var a=URL.createObjectURL(new Blob(["/** "+t.replace(/\*/g,"")+` **/

troikaDefine(
`+e+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch{}return URL.revokeObjectURL(a),delete self.troikaDefine,n}self.addEventListener("message",function(t){var e=t.data,n=e.messageId,a=e.action,o=e.data;try{a==="registerModule"&&r(o,function(i){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:{isCallable:typeof i=="function"}})}),a==="callModule"&&s(o,function(i,f){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:i},f||void 0)})}catch(i){postMessage({messageId:n,success:!1,error:i.stack})}})}function As(l){var r=function(){for(var s=[],c=arguments.length;c--;)s[c]=arguments[c];return r._getInitResult().then(function(t){if(typeof t=="function")return t.apply(void 0,s);throw new Error("Worker module function was called but `init` did not return a callable function")})};return r._getInitResult=function(){var s=l.dependencies,c=l.init;s=Array.isArray(s)?s.map(function(e){return e&&e._getInitResult?e._getInitResult():e}):[];var t=Promise.all(s).then(function(e){return c.apply(null,e)});return r._getInitResult=function(){return t},t},r}var Ba=function(){var l=!1;if(typeof window<"u"&&typeof window.document<"u")try{var r=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));r.terminate(),l=!0}catch{}return Ba=function(){return l},l},Rs=0,Ps=0,wn=!1,pr=Object.create(null),mr=Object.create(null),An=Object.create(null);function Xt(l){if((!l||typeof l.init!="function")&&!wn)throw new Error("requires `options.init` function");var r=l.dependencies,s=l.init,c=l.getTransferables,t=l.workerId;if(!Ba())return As(l);t==null&&(t="#default");var e="workerModule"+ ++Rs,n=l.name||e,a=null;r=r&&r.map(function(i){return typeof i=="function"&&!i.workerModuleData&&(wn=!0,i=Xt({workerId:t,name:"<"+n+"> function dependency: "+i.name,init:`function(){return (
`+Wr(i)+`
)}`}),wn=!1),i&&i.workerModuleData&&(i=i.workerModuleData),i});function o(){for(var i=[],f=arguments.length;f--;)i[f]=arguments[f];if(!a){a=na(t,"registerModule",o.workerModuleData);var d=function(){a=null,mr[t].delete(d)};(mr[t]||(mr[t]=new Set)).add(d)}return a.then(function(h){var p=h.isCallable;if(p)return na(t,"callModule",{id:e,args:i});throw new Error("Worker module function was called but `init` did not return a callable function")})}return o.workerModuleData={isWorkerModule:!0,id:e,name:n,dependencies:r,init:Wr(s),getTransferables:c&&Wr(c)},o}function Es(l){mr[l]&&mr[l].forEach(function(r){r()}),pr[l]&&(pr[l].terminate(),delete pr[l])}function Wr(l){var r=l.toString();return!/^function/.test(r)&&/^\w+\s*\(/.test(r)&&(r="function "+r),r}function Ls(l){var r=pr[l];if(!r){var s=Wr(Us);r=pr[l]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+l.replace(/\*/g,"")+` **/

;(`+s+")()"],{type:"application/javascript"}))),r.onmessage=function(c){var t=c.data,e=t.messageId,n=An[e];if(!n)throw new Error("WorkerModule response with empty or unknown messageId");delete An[e],n(t)}}return r}function na(l,r,s){return new Promise(function(c,t){var e=++Ps;An[e]=function(n){n.success?c(n.result):t(new Error("Error in worker "+r+" call: "+n.error))},Ls(l).postMessage({messageId:e,action:r,data:s})})}function Wa(){var l=function(r){function s(N,z,w,k,C,I,P,X){var D=1-P;X.x=D*D*N+2*D*P*w+P*P*C,X.y=D*D*z+2*D*P*k+P*P*I}function c(N,z,w,k,C,I,P,X,D,O){var K=1-D;O.x=K*K*K*N+3*K*K*D*w+3*K*D*D*C+D*D*D*P,O.y=K*K*K*z+3*K*K*D*k+3*K*D*D*I+D*D*D*X}function t(N,z){for(var w=/([MLQCZ])([^MLQCZ]*)/g,k,C,I,P,X;k=w.exec(N);){var D=k[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(O){return parseFloat(O)});switch(k[1]){case"M":P=C=D[0],X=I=D[1];break;case"L":(D[0]!==P||D[1]!==X)&&z("L",P,X,P=D[0],X=D[1]);break;case"Q":{z("Q",P,X,P=D[2],X=D[3],D[0],D[1]);break}case"C":{z("C",P,X,P=D[4],X=D[5],D[0],D[1],D[2],D[3]);break}case"Z":(P!==C||X!==I)&&z("L",P,X,C,I);break}}}function e(N,z,w){w===void 0&&(w=16);var k={x:0,y:0};t(N,function(C,I,P,X,D,O,K,Q,G){switch(C){case"L":z(I,P,X,D);break;case"Q":{for(var W=I,he=P,fe=1;fe<w;fe++)s(I,P,O,K,X,D,fe/(w-1),k),z(W,he,k.x,k.y),W=k.x,he=k.y;break}case"C":{for(var $=I,ae=P,oe=1;oe<w;oe++)c(I,P,O,K,Q,G,X,D,oe/(w-1),k),z($,ae,k.x,k.y),$=k.x,ae=k.y;break}}})}var n="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",o=new WeakMap,i={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function f(N,z){var w=N.getContext?N.getContext("webgl",i):N,k=o.get(w);if(!k){let K=function($){var ae=I[$];if(!ae&&(ae=I[$]=w.getExtension($),!ae))throw new Error($+" not supported");return ae},Q=function($,ae){var oe=w.createShader(ae);return w.shaderSource(oe,$),w.compileShader(oe),oe},G=function($,ae,oe,q){if(!P[$]){var ne={},re={},B=w.createProgram();w.attachShader(B,Q(ae,w.VERTEX_SHADER)),w.attachShader(B,Q(oe,w.FRAGMENT_SHADER)),w.linkProgram(B),P[$]={program:B,transaction:function(ee){w.useProgram(B),ee({setUniform:function(J,Se){for(var te=[],le=arguments.length-2;le-- >0;)te[le]=arguments[le+2];var pe=re[Se]||(re[Se]=w.getUniformLocation(B,Se));w["uniform"+J].apply(w,[pe].concat(te))},setAttribute:function(J,Se,te,le,pe){var ye=ne[J];ye||(ye=ne[J]={buf:w.createBuffer(),loc:w.getAttribLocation(B,J),data:null}),w.bindBuffer(w.ARRAY_BUFFER,ye.buf),w.vertexAttribPointer(ye.loc,Se,w.FLOAT,!1,0,0),w.enableVertexAttribArray(ye.loc),C?w.vertexAttribDivisor(ye.loc,le):K("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(ye.loc,le),pe!==ye.data&&(w.bufferData(w.ARRAY_BUFFER,pe,te),ye.data=pe)}})}}}P[$].transaction(q)},W=function($,ae){D++;try{w.activeTexture(w.TEXTURE0+D);var oe=X[$];oe||(oe=X[$]=w.createTexture(),w.bindTexture(w.TEXTURE_2D,oe),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MIN_FILTER,w.NEAREST),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MAG_FILTER,w.NEAREST)),w.bindTexture(w.TEXTURE_2D,oe),ae(oe,D)}finally{D--}},he=function($,ae,oe){var q=w.createFramebuffer();O.push(q),w.bindFramebuffer(w.FRAMEBUFFER,q),w.activeTexture(w.TEXTURE0+ae),w.bindTexture(w.TEXTURE_2D,$),w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,$,0);try{oe(q)}finally{w.deleteFramebuffer(q),w.bindFramebuffer(w.FRAMEBUFFER,O[--O.length-1]||null)}},fe=function(){I={},P={},X={},D=-1,O.length=0};var C=typeof WebGL2RenderingContext<"u"&&w instanceof WebGL2RenderingContext,I={},P={},X={},D=-1,O=[];w.canvas.addEventListener("webglcontextlost",function($){fe(),$.preventDefault()},!1),o.set(w,k={gl:w,isWebGL2:C,getExtension:K,withProgram:G,withTexture:W,withTextureFramebuffer:he,handleContextLoss:fe})}z(k)}function d(N,z,w,k,C,I,P,X){P===void 0&&(P=15),X===void 0&&(X=null),f(N,function(D){var O=D.gl,K=D.withProgram,Q=D.withTexture;Q("copy",function(G,W){O.texImage2D(O.TEXTURE_2D,0,O.RGBA,C,I,0,O.RGBA,O.UNSIGNED_BYTE,z),K("copy",n,a,function(he){var fe=he.setUniform,$=he.setAttribute;$("aUV",2,O.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),fe("1i","image",W),O.bindFramebuffer(O.FRAMEBUFFER,X||null),O.disable(O.BLEND),O.colorMask(P&8,P&4,P&2,P&1),O.viewport(w,k,C,I),O.scissor(w,k,C,I),O.drawArrays(O.TRIANGLES,0,3)})})})}function h(N,z,w){var k=N.width,C=N.height;f(N,function(I){var P=I.gl,X=new Uint8Array(k*C*4);P.readPixels(0,0,k,C,P.RGBA,P.UNSIGNED_BYTE,X),N.width=z,N.height=w,d(P,X,0,0,k,C)})}var p=Object.freeze({__proto__:null,withWebGLContext:f,renderImageData:d,resizeWebGLCanvasWithoutClearing:h});function g(N,z,w,k,C,I){I===void 0&&(I=1);var P=new Uint8Array(N*z),X=k[2]-k[0],D=k[3]-k[1],O=[];e(w,function($,ae,oe,q){O.push({x1:$,y1:ae,x2:oe,y2:q,minX:Math.min($,oe),minY:Math.min(ae,q),maxX:Math.max($,oe),maxY:Math.max(ae,q)})}),O.sort(function($,ae){return $.maxX-ae.maxX});for(var K=0;K<N;K++)for(var Q=0;Q<z;Q++){var G=he(k[0]+X*(K+.5)/N,k[1]+D*(Q+.5)/z),W=Math.pow(1-Math.abs(G)/C,I)/2;G<0&&(W=1-W),W=Math.max(0,Math.min(255,Math.round(W*255))),P[Q*N+K]=W}return P;function he($,ae){for(var oe=1/0,q=1/0,ne=O.length;ne--;){var re=O[ne];if(re.maxX+q<=$)break;if($+q>re.minX&&ae-q<re.maxY&&ae+q>re.minY){var B=M($,ae,re.x1,re.y1,re.x2,re.y2);B<oe&&(oe=B,q=Math.sqrt(oe))}}return fe($,ae)&&(q=-q),q}function fe($,ae){for(var oe=0,q=O.length;q--;){var ne=O[q];if(ne.maxX<=$)break;var re=ne.y1>ae!=ne.y2>ae&&$<(ne.x2-ne.x1)*(ae-ne.y1)/(ne.y2-ne.y1)+ne.x1;re&&(oe+=ne.y1<ne.y2?1:-1)}return oe!==0}}function x(N,z,w,k,C,I,P,X,D,O){I===void 0&&(I=1),X===void 0&&(X=0),D===void 0&&(D=0),O===void 0&&(O=0),y(N,z,w,k,C,I,P,null,X,D,O)}function y(N,z,w,k,C,I,P,X,D,O,K){I===void 0&&(I=1),D===void 0&&(D=0),O===void 0&&(O=0),K===void 0&&(K=0);for(var Q=g(N,z,w,k,C,I),G=new Uint8Array(Q.length*4),W=0;W<Q.length;W++)G[W*4+K]=Q[W];d(P,G,D,O,N,z,1<<3-K,X)}function M(N,z,w,k,C,I){var P=C-w,X=I-k,D=P*P+X*X,O=D?Math.max(0,Math.min(1,((N-w)*P+(z-k)*X)/D)):0,K=N-(w+O*P),Q=z-(k+O*X);return K*K+Q*Q}var S=Object.freeze({__proto__:null,generate:g,generateIntoCanvas:x,generateIntoFramebuffer:y}),v="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",b="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",T="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",A=new Float32Array([0,0,2,0,0,2]),j=null,R=!1,U={},L=new WeakMap;function H(N){if(!R&&!Y(N))throw new Error("WebGL generation not supported")}function _(N,z,w,k,C,I,P){if(I===void 0&&(I=1),P===void 0&&(P=null),!P&&(P=j,!P)){var X=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!X)throw new Error("OffscreenCanvas or DOM canvas not supported");P=j=X.getContext("webgl",{depth:!1})}H(P);var D=new Uint8Array(N*z*4);f(P,function(G){var W=G.gl,he=G.withTexture,fe=G.withTextureFramebuffer;he("readable",function($,ae){W.texImage2D(W.TEXTURE_2D,0,W.RGBA,N,z,0,W.RGBA,W.UNSIGNED_BYTE,null),fe($,ae,function(oe){E(N,z,w,k,C,I,W,oe,0,0,0),W.readPixels(0,0,N,z,W.RGBA,W.UNSIGNED_BYTE,D)})})});for(var O=new Uint8Array(N*z),K=0,Q=0;K<D.length;K+=4)O[Q++]=D[K];return O}function F(N,z,w,k,C,I,P,X,D,O){I===void 0&&(I=1),X===void 0&&(X=0),D===void 0&&(D=0),O===void 0&&(O=0),E(N,z,w,k,C,I,P,null,X,D,O)}function E(N,z,w,k,C,I,P,X,D,O,K){I===void 0&&(I=1),D===void 0&&(D=0),O===void 0&&(O=0),K===void 0&&(K=0),H(P);var Q=[];e(w,function(G,W,he,fe){Q.push(G,W,he,fe)}),Q=new Float32Array(Q),f(P,function(G){var W=G.gl,he=G.isWebGL2,fe=G.getExtension,$=G.withProgram,ae=G.withTexture,oe=G.withTextureFramebuffer,q=G.handleContextLoss;if(ae("rawDistances",function(ne,re){(N!==ne._lastWidth||z!==ne._lastHeight)&&W.texImage2D(W.TEXTURE_2D,0,W.RGBA,ne._lastWidth=N,ne._lastHeight=z,0,W.RGBA,W.UNSIGNED_BYTE,null),$("main",v,b,function(B){var ge=B.setAttribute,ee=B.setUniform,se=!he&&fe("ANGLE_instanced_arrays"),J=!he&&fe("EXT_blend_minmax");ge("aUV",2,W.STATIC_DRAW,0,A),ge("aLineSegment",4,W.DYNAMIC_DRAW,1,Q),ee.apply(void 0,["4f","uGlyphBounds"].concat(k)),ee("1f","uMaxDistance",C),ee("1f","uExponent",I),oe(ne,re,function(Se){W.enable(W.BLEND),W.colorMask(!0,!0,!0,!0),W.viewport(0,0,N,z),W.scissor(0,0,N,z),W.blendFunc(W.ONE,W.ONE),W.blendEquationSeparate(W.FUNC_ADD,he?W.MAX:J.MAX_EXT),W.clear(W.COLOR_BUFFER_BIT),he?W.drawArraysInstanced(W.TRIANGLES,0,3,Q.length/4):se.drawArraysInstancedANGLE(W.TRIANGLES,0,3,Q.length/4)})}),$("post",n,T,function(B){B.setAttribute("aUV",2,W.STATIC_DRAW,0,A),B.setUniform("1i","tex",re),W.bindFramebuffer(W.FRAMEBUFFER,X),W.disable(W.BLEND),W.colorMask(K===0,K===1,K===2,K===3),W.viewport(D,O,N,z),W.scissor(D,O,N,z),W.drawArrays(W.TRIANGLES,0,3)})}),W.isContextLost())throw q(),new Error("webgl context lost")})}function Y(N){var z=!N||N===j?U:N.canvas||N,w=L.get(z);if(w===void 0){R=!0;var k=null;try{var C=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],I=_(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,N);w=I&&C.length===I.length&&I.every(function(P,X){return P===C[X]}),w||(k="bad trial run results")}catch(P){w=!1,k=P.message}R=!1,L.set(z,w)}return w}var V=Object.freeze({__proto__:null,generate:_,generateIntoCanvas:F,generateIntoFramebuffer:E,isSupported:Y});function Z(N,z,w,k,C,I){C===void 0&&(C=Math.max(k[2]-k[0],k[3]-k[1])/2),I===void 0&&(I=1);try{return _.apply(V,arguments)}catch{return g.apply(S,arguments)}}function ie(N,z,w,k,C,I,P,X,D,O){C===void 0&&(C=Math.max(k[2]-k[0],k[3]-k[1])/2),I===void 0&&(I=1),X===void 0&&(X=0),D===void 0&&(D=0),O===void 0&&(O=0);try{return F.apply(V,arguments)}catch{return x.apply(S,arguments)}}return r.forEachPathCommand=t,r.generate=Z,r.generateIntoCanvas=ie,r.javascript=S,r.pathToLineSegments=e,r.webgl=V,r.webglUtils=p,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return l}function Fs(){var l=function(r){var s={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},c={},t={};c.L=1,t[1]="L",Object.keys(s).forEach(function(q,ne){c[q]=1<<ne+1,t[c[q]]=q}),Object.freeze(c);var e=c.LRI|c.RLI|c.FSI,n=c.L|c.R|c.AL,a=c.B|c.S|c.WS|c.ON|c.FSI|c.LRI|c.RLI|c.PDI,o=c.BN|c.RLE|c.LRE|c.RLO|c.LRO|c.PDF,i=c.S|c.WS|c.B|e|c.PDI|o,f=null;function d(){if(!f){f=new Map;var q=function(re){if(s.hasOwnProperty(re)){var B=0;s[re].split(",").forEach(function(ge){var ee=ge.split("+"),se=ee[0],J=ee[1];se=parseInt(se,36),J=J?parseInt(J,36):0,f.set(B+=se,c[re]);for(var Se=0;Se<J;Se++)f.set(++B,c[re])})}};for(var ne in s)q(ne)}}function h(q){return d(),f.get(q.codePointAt(0))||c.L}function p(q){return t[h(q)]}var g={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function x(q,ne){var re=36,B=0,ge=new Map,ee=ne&&new Map,se;return q.split(",").forEach(function J(Se){if(Se.indexOf("+")!==-1)for(var te=+Se;te--;)J(se);else{se=Se;var le=Se.split(">"),pe=le[0],ye=le[1];pe=String.fromCodePoint(B+=parseInt(pe,re)),ye=String.fromCodePoint(B+=parseInt(ye,re)),ge.set(pe,ye),ne&&ee.set(ye,pe)}}),{map:ge,reverseMap:ee}}var y,M,S;function v(){if(!y){var q=x(g.pairs,!0),ne=q.map,re=q.reverseMap;y=ne,M=re,S=x(g.canonical,!1).map}}function b(q){return v(),y.get(q)||null}function T(q){return v(),M.get(q)||null}function A(q){return v(),S.get(q)||null}var j=c.L,R=c.R,U=c.EN,L=c.ES,H=c.ET,_=c.AN,F=c.CS,E=c.B,Y=c.S,V=c.ON,Z=c.BN,ie=c.NSM,N=c.AL,z=c.LRO,w=c.RLO,k=c.LRE,C=c.RLE,I=c.PDF,P=c.LRI,X=c.RLI,D=c.FSI,O=c.PDI;function K(q,ne){for(var re=125,B=new Uint32Array(q.length),ge=0;ge<q.length;ge++)B[ge]=h(q[ge]);var ee=new Map;function se(Qe,it){var Ke=B[Qe];B[Qe]=it,ee.set(Ke,ee.get(Ke)-1),Ke&a&&ee.set(a,ee.get(a)-1),ee.set(it,(ee.get(it)||0)+1),it&a&&ee.set(a,(ee.get(a)||0)+1)}for(var J=new Uint8Array(q.length),Se=new Map,te=[],le=null,pe=0;pe<q.length;pe++)le||te.push(le={start:pe,end:q.length-1,level:ne==="rtl"?1:ne==="ltr"?0:lo(pe,!1)}),B[pe]&E&&(le.end=pe,le=null);for(var ye=C|k|w|z|e|O|I|E,ke=function(Qe){return Qe+(Qe&1?1:2)},Ee=function(Qe){return Qe+(Qe&1?2:1)},we=0;we<te.length;we++){le=te[we];var be=[{_level:le.level,_override:0,_isolate:0}],ue=void 0,Le=0,Ae=0,Ze=0;ee.clear();for(var je=le.start;je<=le.end;je++){var me=B[je];if(ue=be[be.length-1],ee.set(me,(ee.get(me)||0)+1),me&a&&ee.set(a,(ee.get(a)||0)+1),me&ye)if(me&(C|k)){J[je]=ue._level;var _e=(me===C?Ee:ke)(ue._level);_e<=re&&!Le&&!Ae?be.push({_level:_e,_override:0,_isolate:0}):Le||Ae++}else if(me&(w|z)){J[je]=ue._level;var wt=(me===w?Ee:ke)(ue._level);wt<=re&&!Le&&!Ae?be.push({_level:wt,_override:me&w?R:j,_isolate:0}):Le||Ae++}else if(me&e){me&D&&(me=lo(je+1,!0)===1?X:P),J[je]=ue._level,ue._override&&se(je,ue._override);var Te=(me===X?Ee:ke)(ue._level);Te<=re&&Le===0&&Ae===0?(Ze++,be.push({_level:Te,_override:0,_isolate:1,_isolInitIndex:je})):Le++}else if(me&O){if(Le>0)Le--;else if(Ze>0){for(Ae=0;!be[be.length-1]._isolate;)be.pop();var Me=be[be.length-1]._isolInitIndex;Me!=null&&(Se.set(Me,je),Se.set(je,Me)),be.pop(),Ze--}ue=be[be.length-1],J[je]=ue._level,ue._override&&se(je,ue._override)}else me&I?(Le===0&&(Ae>0?Ae--:!ue._isolate&&be.length>1&&(be.pop(),ue=be[be.length-1])),J[je]=ue._level):me&E&&(J[je]=le.level);else J[je]=ue._level,ue._override&&me!==Z&&se(je,ue._override)}for(var Ie=[],Re=null,xe=le.start;xe<=le.end;xe++){var Pe=B[xe];if(!(Pe&o)){var Ye=J[xe],He=Pe&e,ze=Pe===O;Re&&Ye===Re._level?(Re._end=xe,Re._endsWithIsolInit=He):Ie.push(Re={_start:xe,_end:xe,_level:Ye,_startsWithPDI:ze,_endsWithIsolInit:He})}}for(var ot=[],bt=0;bt<Ie.length;bt++){var vt=Ie[bt];if(!vt._startsWithPDI||vt._startsWithPDI&&!Se.has(vt._start)){for(var Mt=[Re=vt],jt=void 0;Re&&Re._endsWithIsolInit&&(jt=Se.get(Re._end))!=null;)for(var gt=bt+1;gt<Ie.length;gt++)if(Ie[gt]._start===jt){Mt.push(Re=Ie[gt]);break}for(var qe=[],Ct=0;Ct<Mt.length;Ct++)for(var Wn=Mt[Ct],Zr=Wn._start;Zr<=Wn._end;Zr++)qe.push(Zr);for(var ei=J[qe[0]],Nn=le.level,xr=qe[0]-1;xr>=0;xr--)if(!(B[xr]&o)){Nn=J[xr];break}var Qr=qe[qe.length-1],ti=J[Qr],Hn=le.level;if(!(B[Qr]&e)){for(var wr=Qr+1;wr<=le.end;wr++)if(!(B[wr]&o)){Hn=J[wr];break}}ot.push({_seqIndices:qe,_sosType:Math.max(Nn,ei)%2?R:j,_eosType:Math.max(Hn,ti)%2?R:j})}}for(var Kr=0;Kr<ot.length;Kr++){var Jr=ot[Kr],ce=Jr._seqIndices,Yt=Jr._sosType,ri=Jr._eosType,Ft=J[ce[0]]&1?R:j;if(ee.get(ie))for(var br=0;br<ce.length;br++){var Vn=ce[br];if(B[Vn]&ie){for(var $r=Yt,Mr=br-1;Mr>=0;Mr--)if(!(B[ce[Mr]]&o)){$r=B[ce[Mr]];break}se(Vn,$r&(e|O)?V:$r)}}if(ee.get(U))for(var Sr=0;Sr<ce.length;Sr++){var Xn=ce[Sr];if(B[Xn]&U)for(var _r=Sr-1;_r>=-1;_r--){var Yn=_r===-1?Yt:B[ce[_r]];if(Yn&n){Yn===N&&se(Xn,_);break}}}if(ee.get(N))for(var en=0;en<ce.length;en++){var qn=ce[en];B[qn]&N&&se(qn,R)}if(ee.get(L)||ee.get(F))for(var qt=1;qt<ce.length-1;qt++){var tn=ce[qt];if(B[tn]&(L|F)){for(var It=0,rn=0,nn=qt-1;nn>=0&&(It=B[ce[nn]],!!(It&o));nn--);for(var on=qt+1;on<ce.length&&(rn=B[ce[on]],!!(rn&o));on++);It===rn&&(B[tn]===L?It===U:It&(U|_))&&se(tn,It)}}if(ee.get(U))for(var ct=0;ct<ce.length;ct++){var ni=ce[ct];if(B[ni]&U){for(var Tr=ct-1;Tr>=0&&B[ce[Tr]]&(H|o);Tr--)se(ce[Tr],U);for(ct++;ct<ce.length&&B[ce[ct]]&(H|o|U);ct++)B[ce[ct]]!==U&&se(ce[ct],U)}}if(ee.get(H)||ee.get(L)||ee.get(F))for(var Zt=0;Zt<ce.length;Zt++){var Zn=ce[Zt];if(B[Zn]&(H|L|F)){se(Zn,V);for(var kr=Zt-1;kr>=0&&B[ce[kr]]&o;kr--)se(ce[kr],V);for(var jr=Zt+1;jr<ce.length&&B[ce[jr]]&o;jr++)se(ce[jr],V)}}if(ee.get(U))for(var an=0,Qn=Yt;an<ce.length;an++){var Kn=ce[an],sn=B[Kn];sn&U?Qn===j&&se(Kn,j):sn&n&&(Qn=sn)}if(ee.get(a)){var Qt=R|U|_,Jn=Qt|j,Cr=[];{for(var zt=[],Dt=0;Dt<ce.length;Dt++)if(B[ce[Dt]]&a){var Kt=q[ce[Dt]],$n=void 0;if(b(Kt)!==null)if(zt.length<63)zt.push({char:Kt,seqIndex:Dt});else break;else if(($n=T(Kt))!==null)for(var Jt=zt.length-1;Jt>=0;Jt--){var ln=zt[Jt].char;if(ln===$n||ln===T(A(Kt))||b(A(ln))===Kt){Cr.push([zt[Jt].seqIndex,Dt]),zt.length=Jt;break}}}Cr.sort(function(Qe,it){return Qe[0]-it[0]})}for(var cn=0;cn<Cr.length;cn++){for(var eo=Cr[cn],Ur=eo[0],fn=eo[1],to=!1,at=0,un=Ur+1;un<fn;un++){var ro=ce[un];if(B[ro]&Jn){to=!0;var no=B[ro]&Qt?R:j;if(no===Ft){at=no;break}}}if(to&&!at){at=Yt;for(var dn=Ur-1;dn>=0;dn--){var oo=ce[dn];if(B[oo]&Jn){var ao=B[oo]&Qt?R:j;ao!==Ft?at=ao:at=Ft;break}}}if(at){if(B[ce[Ur]]=B[ce[fn]]=at,at!==Ft){for(var $t=Ur+1;$t<ce.length;$t++)if(!(B[ce[$t]]&o)){h(q[ce[$t]])&ie&&(B[ce[$t]]=at);break}}if(at!==Ft){for(var er=fn+1;er<ce.length;er++)if(!(B[ce[er]]&o)){h(q[ce[er]])&ie&&(B[ce[er]]=at);break}}}}for(var St=0;St<ce.length;St++)if(B[ce[St]]&a){for(var io=St,hn=St,pn=Yt,tr=St-1;tr>=0;tr--)if(B[ce[tr]]&o)io=tr;else{pn=B[ce[tr]]&Qt?R:j;break}for(var so=ri,rr=St+1;rr<ce.length;rr++)if(B[ce[rr]]&(a|o))hn=rr;else{so=B[ce[rr]]&Qt?R:j;break}for(var mn=io;mn<=hn;mn++)B[ce[mn]]=pn===so?pn:Ft;St=hn}}}for(var $e=le.start;$e<=le.end;$e++){var oi=J[$e],Ar=B[$e];if(oi&1?Ar&(j|U|_)&&J[$e]++:Ar&R?J[$e]++:Ar&(_|U)&&(J[$e]+=2),Ar&o&&(J[$e]=$e===0?le.level:J[$e-1]),$e===le.end||h(q[$e])&(Y|E))for(var Rr=$e;Rr>=0&&h(q[Rr])&i;Rr--)J[Rr]=le.level}}return{levels:J,paragraphs:te};function lo(Qe,it){for(var Ke=Qe;Ke<q.length;Ke++){var _t=B[Ke];if(_t&(R|N))return 1;if(_t&(E|j)||it&&_t===O)return 0;if(_t&e){var co=ai(Ke);Ke=co===-1?q.length:co}}return 0}function ai(Qe){for(var it=1,Ke=Qe+1;Ke<q.length;Ke++){var _t=B[Ke];if(_t&E)break;if(_t&O){if(--it===0)return Ke}else _t&e&&it++}return-1}}var Q="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",G;function W(){if(!G){var q=x(Q,!0),ne=q.map,re=q.reverseMap;re.forEach(function(B,ge){ne.set(ge,B)}),G=ne}}function he(q){return W(),G.get(q)||null}function fe(q,ne,re,B){var ge=q.length;re=Math.max(0,re==null?0:+re),B=Math.min(ge-1,B==null?ge-1:+B);for(var ee=new Map,se=re;se<=B;se++)if(ne[se]&1){var J=he(q[se]);J!==null&&ee.set(se,J)}return ee}function $(q,ne,re,B){var ge=q.length;re=Math.max(0,re==null?0:+re),B=Math.min(ge-1,B==null?ge-1:+B);var ee=[];return ne.paragraphs.forEach(function(se){var J=Math.max(re,se.start),Se=Math.min(B,se.end);if(J<Se){for(var te=ne.levels.slice(J,Se+1),le=Se;le>=J&&h(q[le])&i;le--)te[le]=se.level;for(var pe=se.level,ye=1/0,ke=0;ke<te.length;ke++){var Ee=te[ke];Ee>pe&&(pe=Ee),Ee<ye&&(ye=Ee|1)}for(var we=pe;we>=ye;we--)for(var be=0;be<te.length;be++)if(te[be]>=we){for(var ue=be;be+1<te.length&&te[be+1]>=we;)be++;be>ue&&ee.push([ue+J,be+J])}}}),ee}function ae(q,ne,re,B){var ge=oe(q,ne,re,B),ee=[].concat(q);return ge.forEach(function(se,J){ee[J]=(ne.levels[se]&1?he(q[se]):null)||q[se]}),ee.join("")}function oe(q,ne,re,B){for(var ge=$(q,ne,re,B),ee=[],se=0;se<q.length;se++)ee[se]=se;return ge.forEach(function(J){for(var Se=J[0],te=J[1],le=ee.slice(Se,te+1),pe=le.length;pe--;)ee[te-pe]=le[pe]}),ee}return r.closingToOpeningBracket=T,r.getBidiCharType=h,r.getBidiCharTypeName=p,r.getCanonicalBracket=A,r.getEmbeddingLevels=K,r.getMirroredCharacter=he,r.getMirroredCharactersMap=fe,r.getReorderSegments=$,r.getReorderedIndices=oe,r.getReorderedString=ae,r.openingToClosingBracket=b,Object.defineProperty(r,"__esModule",{value:!0}),r}({});return l}const Na=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Rn(l){const r=/^[ \t]*#include +<([\w\d./]+)>/gm;function s(c,t){let e=pi[t];return e?Rn(e):c}return l.replace(r,s)}const We=[];for(let l=0;l<256;l++)We[l]=(l<16?"0":"")+l.toString(16);function Is(){const l=Math.random()*4294967295|0,r=Math.random()*4294967295|0,s=Math.random()*4294967295|0,c=Math.random()*4294967295|0;return(We[l&255]+We[l>>8&255]+We[l>>16&255]+We[l>>24&255]+"-"+We[r&255]+We[r>>8&255]+"-"+We[r>>16&15|64]+We[r>>24&255]+"-"+We[s&63|128]+We[s>>8&255]+"-"+We[s>>16&255]+We[s>>24&255]+We[c&255]+We[c>>8&255]+We[c>>16&255]+We[c>>24&255]).toUpperCase()}const At=Object.assign||function(){let l=arguments[0];for(let r=1,s=arguments.length;r<s;r++){let c=arguments[r];if(c)for(let t in c)Object.prototype.hasOwnProperty.call(c,t)&&(l[t]=c[t])}return l},zs=Date.now(),oa=new WeakMap,aa=new Map;let Ds=1e10;function Pn(l,r){const s=Ws(r);let c=oa.get(l);if(c||oa.set(l,c=Object.create(null)),c[s])return new c[s];const t=`_onBeforeCompile${s}`,e=function(i,f){l.onBeforeCompile.call(this,i,f);const d=this.customProgramCacheKey()+"|"+i.vertexShader+"|"+i.fragmentShader;let h=aa[d];if(!h){const p=Gs(this,i,r,s);h=aa[d]=p}i.vertexShader=h.vertexShader,i.fragmentShader=h.fragmentShader,At(i.uniforms,this.uniforms),r.timeUniform&&(i.uniforms[r.timeUniform]={get value(){return Date.now()-zs}}),this[t]&&this[t](i)},n=function(){return a(r.chained?l:l.clone())},a=function(i){const f=Object.create(i,o);return Object.defineProperty(f,"baseMaterial",{value:l}),Object.defineProperty(f,"id",{value:Ds++}),f.uuid=Is(),f.uniforms=At({},i.uniforms,r.uniforms),f.defines=At({},i.defines,r.defines),f.defines[`TROIKA_DERIVED_MATERIAL_${s}`]="",f.extensions=At({},i.extensions,r.extensions),f._listeners=void 0,f},o={constructor:{value:n},isDerivedMaterial:{value:!0},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return l.customProgramCacheKey()+"|"+s}},onBeforeCompile:{get(){return e},set(i){this[t]=i}},copy:{writable:!0,configurable:!0,value:function(i){return l.copy.call(this,i),!l.isShaderMaterial&&!l.isDerivedMaterial&&(At(this.extensions,i.extensions),At(this.defines,i.defines),At(this.uniforms,kn.clone(i.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const i=new l.constructor;return a(i).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let i=this._depthMaterial;return i||(i=this._depthMaterial=Pn(l.isDerivedMaterial?l.getDepthMaterial():new di({depthPacking:hi}),r),i.defines.IS_DEPTH_MATERIAL="",i.uniforms=this.uniforms),i}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let i=this._distanceMaterial;return i||(i=this._distanceMaterial=Pn(l.isDerivedMaterial?l.getDistanceMaterial():new ui,r),i.defines.IS_DISTANCE_MATERIAL="",i.uniforms=this.uniforms),i}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:i,_distanceMaterial:f}=this;i&&i.dispose(),f&&f.dispose(),l.dispose.call(this)}}};return c[s]=n,new n}function Gs(l,{vertexShader:r,fragmentShader:s},c,t){let{vertexDefs:e,vertexMainIntro:n,vertexMainOutro:a,vertexTransform:o,fragmentDefs:i,fragmentMainIntro:f,fragmentMainOutro:d,fragmentColorTransform:h,customRewriter:p,timeUniform:g}=c;if(e=e||"",n=n||"",a=a||"",i=i||"",f=f||"",d=d||"",(o||p)&&(r=Rn(r)),(h||p)&&(s=s.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),s=Rn(s)),p){let x=p({vertexShader:r,fragmentShader:s});r=x.vertexShader,s=x.fragmentShader}if(h){let x=[];s=s.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,y=>(x.push(y),"")),d=`${h}
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
`,r=r.replace(/\b(position|normal|uv)\b/g,(x,y,M,S)=>/\battribute\s+vec[23]\s+$/.test(S.substr(0,M))?y:`troika_${y}_${t}`),l.map&&l.map.channel>0||(r=r.replace(/\bMAP_UV\b/g,`troika_uv_${t}`))),r=ia(r,t,e,n,a),s=ia(s,t,i,f,d),{vertexShader:r,fragmentShader:s}}function ia(l,r,s,c,t){return(c||t||s)&&(l=l.replace(Na,`
${s}
void troikaOrigMain${r}() {`),l+=`
void main() {
  ${c}
  troikaOrigMain${r}();
  ${t}
}`),l}function Os(l,r){return l==="uniforms"?void 0:typeof r=="function"?r.toString():r}let Bs=0;const sa=new Map;function Ws(l){const r=JSON.stringify(l,Os);let s=sa.get(r);return s==null&&sa.set(r,s=++Bs),s}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function Ns(){return typeof window>"u"&&(self.window=self),function(l){var r={parse:function(t){var e=r._bin,n=new Uint8Array(t);if(e.readASCII(n,0,4)=="ttcf"){var a=4;e.readUshort(n,a),a+=2,e.readUshort(n,a),a+=2;var o=e.readUint(n,a);a+=4;for(var i=[],f=0;f<o;f++){var d=e.readUint(n,a);a+=4,i.push(r._readFont(n,d))}return i}return[r._readFont(n,0)]},_readFont:function(t,e){var n=r._bin,a=e;n.readFixed(t,e),e+=4;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2;for(var i=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],f={_data:t,_offset:a},d={},h=0;h<o;h++){var p=n.readASCII(t,e,4);e+=4,n.readUint(t,e),e+=4;var g=n.readUint(t,e);e+=4;var x=n.readUint(t,e);e+=4,d[p]={offset:g,length:x}}for(h=0;h<i.length;h++){var y=i[h];d[y]&&(f[y.trim()]=r[y.trim()].parse(t,d[y].offset,d[y].length,f))}return f},_tabOffset:function(t,e,n){for(var a=r._bin,o=a.readUshort(t,n+4),i=n+12,f=0;f<o;f++){var d=a.readASCII(t,i,4);i+=4,a.readUint(t,i),i+=4;var h=a.readUint(t,i);if(i+=4,a.readUint(t,i),i+=4,d==e)return h}return 0}};r._bin={readFixed:function(t,e){return(t[e]<<8|t[e+1])+(t[e+2]<<8|t[e+3])/65540},readF2dot14:function(t,e){return r._bin.readShort(t,e)/16384},readInt:function(t,e){return r._bin._view(t).getInt32(e)},readInt8:function(t,e){return r._bin._view(t).getInt8(e)},readShort:function(t,e){return r._bin._view(t).getInt16(e)},readUshort:function(t,e){return r._bin._view(t).getUint16(e)},readUshorts:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(r._bin.readUshort(t,e+2*o));return a},readUint:function(t,e){return r._bin._view(t).getUint32(e)},readUint64:function(t,e){return 4294967296*r._bin.readUint(t,e)+r._bin.readUint(t,e+4)},readASCII:function(t,e,n){for(var a="",o=0;o<n;o++)a+=String.fromCharCode(t[e+o]);return a},readUnicode:function(t,e,n){for(var a="",o=0;o<n;o++){var i=t[e++]<<8|t[e++];a+=String.fromCharCode(i)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(t,e,n){var a=r._bin._tdec;return a&&e==0&&n==t.length?a.decode(t):r._bin.readASCII(t,e,n)},readBytes:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(t[e+o]);return a},readASCIIArray:function(t,e,n){for(var a=[],o=0;o<n;o++)a.push(String.fromCharCode(t[e+o]));return a},_view:function(t){return t._dataView||(t._dataView=t.buffer?new DataView(t.buffer,t.byteOffset,t.byteLength):new DataView(new Uint8Array(t).buffer))}},r._lctf={},r._lctf.parse=function(t,e,n,a,o){var i=r._bin,f={},d=e;i.readFixed(t,e),e+=4;var h=i.readUshort(t,e);e+=2;var p=i.readUshort(t,e);e+=2;var g=i.readUshort(t,e);return e+=2,f.scriptList=r._lctf.readScriptList(t,d+h),f.featureList=r._lctf.readFeatureList(t,d+p),f.lookupList=r._lctf.readLookupList(t,d+g,o),f},r._lctf.readLookupList=function(t,e,n){var a=r._bin,o=e,i=[],f=a.readUshort(t,e);e+=2;for(var d=0;d<f;d++){var h=a.readUshort(t,e);e+=2;var p=r._lctf.readLookupTable(t,o+h,n);i.push(p)}return i},r._lctf.readLookupTable=function(t,e,n){var a=r._bin,o=e,i={tabs:[]};i.ltype=a.readUshort(t,e),e+=2,i.flag=a.readUshort(t,e),e+=2;var f=a.readUshort(t,e);e+=2;for(var d=i.ltype,h=0;h<f;h++){var p=a.readUshort(t,e);e+=2;var g=n(t,d,o+p,i);i.tabs.push(g)}return i},r._lctf.numOfOnes=function(t){for(var e=0,n=0;n<32;n++)t>>>n&1&&e++;return e},r._lctf.readClassDef=function(t,e){var n=r._bin,a=[],o=n.readUshort(t,e);if(e+=2,o==1){var i=n.readUshort(t,e);e+=2;var f=n.readUshort(t,e);e+=2;for(var d=0;d<f;d++)a.push(i+d),a.push(i+d),a.push(n.readUshort(t,e)),e+=2}if(o==2){var h=n.readUshort(t,e);for(e+=2,d=0;d<h;d++)a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2,a.push(n.readUshort(t,e)),e+=2}return a},r._lctf.getInterval=function(t,e){for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1];if(t[n+2],a<=e&&e<=o)return n}return-1},r._lctf.readCoverage=function(t,e){var n=r._bin,a={};a.fmt=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.fmt==1&&(a.tab=n.readUshorts(t,e,o)),a.fmt==2&&(a.tab=n.readUshorts(t,e,3*o)),a},r._lctf.coverageIndex=function(t,e){var n=t.tab;if(t.fmt==1)return n.indexOf(e);if(t.fmt==2){var a=r._lctf.getInterval(n,e);if(a!=-1)return n[a+2]+(e-n[a])}return-1},r._lctf.readFeatureList=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2;var p=r._lctf.readFeatureTable(t,a+h);p.tag=d.trim(),o.push(p)}return o},r._lctf.readFeatureTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.featureParams=a+i);var f=n.readUshort(t,e);e+=2,o.tab=[];for(var d=0;d<f;d++)o.tab.push(n.readUshort(t,e+2*d));return o},r._lctf.readScriptList=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readASCII(t,e,4);e+=4;var h=n.readUshort(t,e);e+=2,o[d.trim()]=r._lctf.readScriptTable(t,a+h)}return o},r._lctf.readScriptTable=function(t,e){var n=r._bin,a=e,o={},i=n.readUshort(t,e);e+=2,i>0&&(o.default=r._lctf.readLangSysTable(t,a+i));var f=n.readUshort(t,e);e+=2;for(var d=0;d<f;d++){var h=n.readASCII(t,e,4);e+=4;var p=n.readUshort(t,e);e+=2,o[h.trim()]=r._lctf.readLangSysTable(t,a+p)}return o},r._lctf.readLangSysTable=function(t,e){var n=r._bin,a={};n.readUshort(t,e),e+=2,a.reqFeature=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);return e+=2,a.features=n.readUshorts(t,e,o),a},r.CFF={},r.CFF.parse=function(t,e,n){var a=r._bin;(t=new Uint8Array(t.buffer,e,n))[e=0],t[++e],t[++e],t[++e],e++;var o=[];e=r.CFF.readIndex(t,e,o);for(var i=[],f=0;f<o.length-1;f++)i.push(a.readASCII(t,e+o[f],o[f+1]-o[f]));e+=o[o.length-1];var d=[];e=r.CFF.readIndex(t,e,d);var h=[];for(f=0;f<d.length-1;f++)h.push(r.CFF.readDict(t,e+d[f],e+d[f+1]));e+=d[d.length-1];var p=h[0],g=[];e=r.CFF.readIndex(t,e,g);var x=[];for(f=0;f<g.length-1;f++)x.push(a.readASCII(t,e+g[f],g[f+1]-g[f]));if(e+=g[g.length-1],r.CFF.readSubrs(t,e,p),p.CharStrings){e=p.CharStrings,g=[],e=r.CFF.readIndex(t,e,g);var y=[];for(f=0;f<g.length-1;f++)y.push(a.readBytes(t,e+g[f],g[f+1]-g[f]));p.CharStrings=y}if(p.ROS){e=p.FDArray;var M=[];for(e=r.CFF.readIndex(t,e,M),p.FDArray=[],f=0;f<M.length-1;f++){var S=r.CFF.readDict(t,e+M[f],e+M[f+1]);r.CFF._readFDict(t,S,x),p.FDArray.push(S)}e+=M[M.length-1],e=p.FDSelect,p.FDSelect=[];var v=t[e];if(e++,v!=3)throw v;var b=a.readUshort(t,e);for(e+=2,f=0;f<b+1;f++)p.FDSelect.push(a.readUshort(t,e),t[e+2]),e+=3}return p.Encoding&&(p.Encoding=r.CFF.readEncoding(t,p.Encoding,p.CharStrings.length)),p.charset&&(p.charset=r.CFF.readCharset(t,p.charset,p.CharStrings.length)),r.CFF._readFDict(t,p,x),p},r.CFF._readFDict=function(t,e,n){var a;for(var o in e.Private&&(a=e.Private[1],e.Private=r.CFF.readDict(t,a,a+e.Private[0]),e.Private.Subrs&&r.CFF.readSubrs(t,a+e.Private.Subrs,e.Private)),e)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)!=-1&&(e[o]=n[e[o]-426+35])},r.CFF.readSubrs=function(t,e,n){var a=r._bin,o=[];e=r.CFF.readIndex(t,e,o);var i,f=o.length;i=f<1240?107:f<33900?1131:32768,n.Bias=i,n.Subrs=[];for(var d=0;d<o.length-1;d++)n.Subrs.push(a.readBytes(t,e+o[d],o[d+1]-o[d]))},r.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],r.CFF.glyphByUnicode=function(t,e){for(var n=0;n<t.charset.length;n++)if(t.charset[n]==e)return n;return-1},r.CFF.glyphBySE=function(t,e){return e<0||e>255?-1:r.CFF.glyphByUnicode(t,r.CFF.tableSE[e])},r.CFF.readEncoding=function(t,e,n){r._bin;var a=[".notdef"],o=t[e];if(e++,o!=0)throw"error: unknown encoding format: "+o;var i=t[e];e++;for(var f=0;f<i;f++)a.push(t[e+f]);return a},r.CFF.readCharset=function(t,e,n){var a=r._bin,o=[".notdef"],i=t[e];if(e++,i==0)for(var f=0;f<n;f++){var d=a.readUshort(t,e);e+=2,o.push(d)}else{if(i!=1&&i!=2)throw"error: format: "+i;for(;o.length<n;){d=a.readUshort(t,e),e+=2;var h=0;for(i==1?(h=t[e],e++):(h=a.readUshort(t,e),e+=2),f=0;f<=h;f++)o.push(d),d++}}return o},r.CFF.readIndex=function(t,e,n){var a=r._bin,o=a.readUshort(t,e)+1,i=t[e+=2];if(e++,i==1)for(var f=0;f<o;f++)n.push(t[e+f]);else if(i==2)for(f=0;f<o;f++)n.push(a.readUshort(t,e+2*f));else if(i==3)for(f=0;f<o;f++)n.push(16777215&a.readUint(t,e+3*f-1));else if(o!=1)throw"unsupported offset size: "+i+", count: "+o;return(e+=o*i)-1},r.CFF.getCharString=function(t,e,n){var a=r._bin,o=t[e],i=t[e+1];t[e+2],t[e+3],t[e+4];var f=1,d=null,h=null;o<=20&&(d=o,f=1),o==12&&(d=100*o+i,f=2),21<=o&&o<=27&&(d=o,f=1),o==28&&(h=a.readShort(t,e+1),f=3),29<=o&&o<=31&&(d=o,f=1),32<=o&&o<=246&&(h=o-139,f=1),247<=o&&o<=250&&(h=256*(o-247)+i+108,f=2),251<=o&&o<=254&&(h=256*-(o-251)-i-108,f=2),o==255&&(h=a.readInt(t,e+1)/65535,f=5),n.val=h??"o"+d,n.size=f},r.CFF.readCharString=function(t,e,n){for(var a=e+n,o=r._bin,i=[];e<a;){var f=t[e],d=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,g=null;f<=20&&(p=f,h=1),f==12&&(p=100*f+d,h=2),f!=19&&f!=20||(p=f,h=2),21<=f&&f<=27&&(p=f,h=1),f==28&&(g=o.readShort(t,e+1),h=3),29<=f&&f<=31&&(p=f,h=1),32<=f&&f<=246&&(g=f-139,h=1),247<=f&&f<=250&&(g=256*(f-247)+d+108,h=2),251<=f&&f<=254&&(g=256*-(f-251)-d-108,h=2),f==255&&(g=o.readInt(t,e+1)/65535,h=5),i.push(g??"o"+p),e+=h}return i},r.CFF.readDict=function(t,e,n){for(var a=r._bin,o={},i=[];e<n;){var f=t[e],d=t[e+1];t[e+2],t[e+3],t[e+4];var h=1,p=null,g=null;if(f==28&&(g=a.readShort(t,e+1),h=3),f==29&&(g=a.readInt(t,e+1),h=5),32<=f&&f<=246&&(g=f-139,h=1),247<=f&&f<=250&&(g=256*(f-247)+d+108,h=2),251<=f&&f<=254&&(g=256*-(f-251)-d-108,h=2),f==255)throw g=a.readInt(t,e+1)/65535,h=5,"unknown number";if(f==30){var x=[];for(h=1;;){var y=t[e+h];h++;var M=y>>4,S=15&y;if(M!=15&&x.push(M),S!=15&&x.push(S),S==15)break}for(var v="",b=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],T=0;T<x.length;T++)v+=b[x[T]];g=parseFloat(v)}f<=21&&(p=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][f],h=1,f==12&&(p=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][d],h=2)),p!=null?(o[p]=i.length==1?i[0]:i,i=[]):i.push(g),e+=h}return o},r.cmap={},r.cmap.parse=function(t,e,n){t=new Uint8Array(t.buffer,e,n),e=0;var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2;var f=[];o.tables=[];for(var d=0;d<i;d++){var h=a.readUshort(t,e);e+=2;var p=a.readUshort(t,e);e+=2;var g=a.readUint(t,e);e+=4;var x="p"+h+"e"+p,y=f.indexOf(g);if(y==-1){var M;y=o.tables.length,f.push(g);var S=a.readUshort(t,g);S==0?M=r.cmap.parse0(t,g):S==4?M=r.cmap.parse4(t,g):S==6?M=r.cmap.parse6(t,g):S==12&&(M=r.cmap.parse12(t,g)),o.tables.push(M)}if(o[x]!=null)throw"multiple tables for one platform+encoding";o[x]=y}return o},r.cmap.parse0=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2,a.map=[];for(var i=0;i<o-6;i++)a.map.push(t[e+i]);return a},r.cmap.parse4=function(t,e){var n=r._bin,a=e,o={};o.format=n.readUshort(t,e),e+=2;var i=n.readUshort(t,e);e+=2,n.readUshort(t,e),e+=2;var f=n.readUshort(t,e);e+=2;var d=f/2;o.searchRange=n.readUshort(t,e),e+=2,o.entrySelector=n.readUshort(t,e),e+=2,o.rangeShift=n.readUshort(t,e),e+=2,o.endCount=n.readUshorts(t,e,d),e+=2*d,e+=2,o.startCount=n.readUshorts(t,e,d),e+=2*d,o.idDelta=[];for(var h=0;h<d;h++)o.idDelta.push(n.readShort(t,e)),e+=2;for(o.idRangeOffset=n.readUshorts(t,e,d),e+=2*d,o.glyphIdArray=[];e<a+i;)o.glyphIdArray.push(n.readUshort(t,e)),e+=2;return o},r.cmap.parse6=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,n.readUshort(t,e),e+=2,a.firstCode=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2,a.glyphIdArray=[];for(var i=0;i<o;i++)a.glyphIdArray.push(n.readUshort(t,e)),e+=2;return a},r.cmap.parse12=function(t,e){var n=r._bin,a={};a.format=n.readUshort(t,e),e+=2,e+=2,n.readUint(t,e),e+=4,n.readUint(t,e),e+=4;var o=n.readUint(t,e);e+=4,a.groups=[];for(var i=0;i<o;i++){var f=e+12*i,d=n.readUint(t,f+0),h=n.readUint(t,f+4),p=n.readUint(t,f+8);a.groups.push([d,h,p])}return a},r.glyf={},r.glyf.parse=function(t,e,n,a){for(var o=[],i=0;i<a.maxp.numGlyphs;i++)o.push(null);return o},r.glyf._parseGlyf=function(t,e){var n=r._bin,a=t._data,o=r._tabOffset(a,"glyf",t._offset)+t.loca[e];if(t.loca[e]==t.loca[e+1])return null;var i={};if(i.noc=n.readShort(a,o),o+=2,i.xMin=n.readShort(a,o),o+=2,i.yMin=n.readShort(a,o),o+=2,i.xMax=n.readShort(a,o),o+=2,i.yMax=n.readShort(a,o),o+=2,i.xMin>=i.xMax||i.yMin>=i.yMax)return null;if(i.noc>0){i.endPts=[];for(var f=0;f<i.noc;f++)i.endPts.push(n.readUshort(a,o)),o+=2;var d=n.readUshort(a,o);if(o+=2,a.length-o<d)return null;i.instructions=n.readBytes(a,o,d),o+=d;var h=i.endPts[i.noc-1]+1;for(i.flags=[],f=0;f<h;f++){var p=a[o];if(o++,i.flags.push(p),(8&p)!=0){var g=a[o];o++;for(var x=0;x<g;x++)i.flags.push(p),f++}}for(i.xs=[],f=0;f<h;f++){var y=(2&i.flags[f])!=0,M=(16&i.flags[f])!=0;y?(i.xs.push(M?a[o]:-a[o]),o++):M?i.xs.push(0):(i.xs.push(n.readShort(a,o)),o+=2)}for(i.ys=[],f=0;f<h;f++)y=(4&i.flags[f])!=0,M=(32&i.flags[f])!=0,y?(i.ys.push(M?a[o]:-a[o]),o++):M?i.ys.push(0):(i.ys.push(n.readShort(a,o)),o+=2);var S=0,v=0;for(f=0;f<h;f++)S+=i.xs[f],v+=i.ys[f],i.xs[f]=S,i.ys[f]=v}else{var b;i.parts=[];do{b=n.readUshort(a,o),o+=2;var T={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(i.parts.push(T),T.glyphIndex=n.readUshort(a,o),o+=2,1&b){var A=n.readShort(a,o);o+=2;var j=n.readShort(a,o);o+=2}else A=n.readInt8(a,o),o++,j=n.readInt8(a,o),o++;2&b?(T.m.tx=A,T.m.ty=j):(T.p1=A,T.p2=j),8&b?(T.m.a=T.m.d=n.readF2dot14(a,o),o+=2):64&b?(T.m.a=n.readF2dot14(a,o),o+=2,T.m.d=n.readF2dot14(a,o),o+=2):128&b&&(T.m.a=n.readF2dot14(a,o),o+=2,T.m.b=n.readF2dot14(a,o),o+=2,T.m.c=n.readF2dot14(a,o),o+=2,T.m.d=n.readF2dot14(a,o),o+=2)}while(32&b);if(256&b){var R=n.readUshort(a,o);for(o+=2,i.instr=[],f=0;f<R;f++)i.instr.push(a[o]),o++}}return i},r.GDEF={},r.GDEF.parse=function(t,e,n,a){var o=e;e+=4;var i=r._bin.readUshort(t,e);return{glyphClassDef:i===0?null:r._lctf.readClassDef(t,o+i)}},r.GPOS={},r.GPOS.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GPOS.subt)},r.GPOS.subt=function(t,e,n,a){var o=r._bin,i=n,f={};if(f.fmt=o.readUshort(t,n),n+=2,e==1||e==2||e==3||e==7||e==8&&f.fmt<=2){var d=o.readUshort(t,n);n+=2,f.coverage=r._lctf.readCoverage(t,d+i)}if(e==1&&f.fmt==1){var h=o.readUshort(t,n);n+=2,h!=0&&(f.pos=r.GPOS.readValueRecord(t,n,h))}else if(e==2&&f.fmt>=1&&f.fmt<=2){h=o.readUshort(t,n),n+=2;var p=o.readUshort(t,n);n+=2;var g=r._lctf.numOfOnes(h),x=r._lctf.numOfOnes(p);if(f.fmt==1){f.pairsets=[];var y=o.readUshort(t,n);n+=2;for(var M=0;M<y;M++){var S=i+o.readUshort(t,n);n+=2;var v=o.readUshort(t,S);S+=2;for(var b=[],T=0;T<v;T++){var A=o.readUshort(t,S);S+=2,h!=0&&(_=r.GPOS.readValueRecord(t,S,h),S+=2*g),p!=0&&(F=r.GPOS.readValueRecord(t,S,p),S+=2*x),b.push({gid2:A,val1:_,val2:F})}f.pairsets.push(b)}}if(f.fmt==2){var j=o.readUshort(t,n);n+=2;var R=o.readUshort(t,n);n+=2;var U=o.readUshort(t,n);n+=2;var L=o.readUshort(t,n);for(n+=2,f.classDef1=r._lctf.readClassDef(t,i+j),f.classDef2=r._lctf.readClassDef(t,i+R),f.matrix=[],M=0;M<U;M++){var H=[];for(T=0;T<L;T++){var _=null,F=null;h!=0&&(_=r.GPOS.readValueRecord(t,n,h),n+=2*g),p!=0&&(F=r.GPOS.readValueRecord(t,n,p),n+=2*x),H.push({val1:_,val2:F})}f.matrix.push(H)}}}else if(e==4&&f.fmt==1)f.markCoverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),f.baseCoverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),f.markClassCount=o.readUshort(t,n+4),f.markArray=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),f.baseArray=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,f.markClassCount);else if(e==6&&f.fmt==1)f.mark1Coverage=r._lctf.readCoverage(t,o.readUshort(t,n)+i),f.mark2Coverage=r._lctf.readCoverage(t,o.readUshort(t,n+2)+i),f.markClassCount=o.readUshort(t,n+4),f.mark1Array=r.GPOS.readMarkArray(t,o.readUshort(t,n+6)+i),f.mark2Array=r.GPOS.readBaseArray(t,o.readUshort(t,n+8)+i,f.markClassCount);else if(e==9&&f.fmt==1){var E=o.readUshort(t,n);n+=2;var Y=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=E;else if(a.ltype!=E)throw"invalid extension substitution";return r.GPOS.subt(t,a.ltype,i+Y)}return f},r.GPOS.readValueRecord=function(t,e,n){var a=r._bin,o=[];return o.push(1&n?a.readShort(t,e):0),e+=1&n?2:0,o.push(2&n?a.readShort(t,e):0),e+=2&n?2:0,o.push(4&n?a.readShort(t,e):0),e+=4&n?2:0,o.push(8&n?a.readShort(t,e):0),e+=8&n?2:0,o},r.GPOS.readBaseArray=function(t,e,n){var a=r._bin,o=[],i=e,f=a.readUshort(t,e);e+=2;for(var d=0;d<f;d++){for(var h=[],p=0;p<n;p++)h.push(r.GPOS.readAnchorRecord(t,i+a.readUshort(t,e))),e+=2;o.push(h)}return o},r.GPOS.readMarkArray=function(t,e){var n=r._bin,a=[],o=e,i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=r.GPOS.readAnchorRecord(t,n.readUshort(t,e+2)+o);d.markClass=n.readUshort(t,e),a.push(d),e+=4}return a},r.GPOS.readAnchorRecord=function(t,e){var n=r._bin,a={};return a.fmt=n.readUshort(t,e),a.x=n.readShort(t,e+2),a.y=n.readShort(t,e+4),a},r.GSUB={},r.GSUB.parse=function(t,e,n,a){return r._lctf.parse(t,e,n,a,r.GSUB.subt)},r.GSUB.subt=function(t,e,n,a){var o=r._bin,i=n,f={};if(f.fmt=o.readUshort(t,n),n+=2,e!=1&&e!=2&&e!=4&&e!=5&&e!=6)return null;if(e==1||e==2||e==4||e==5&&f.fmt<=2||e==6&&f.fmt<=2){var d=o.readUshort(t,n);n+=2,f.coverage=r._lctf.readCoverage(t,i+d)}if(e==1&&f.fmt>=1&&f.fmt<=2){if(f.fmt==1)f.delta=o.readShort(t,n),n+=2;else if(f.fmt==2){var h=o.readUshort(t,n);n+=2,f.newg=o.readUshorts(t,n,h),n+=2*f.newg.length}}else if(e==2&&f.fmt==1){h=o.readUshort(t,n),n+=2,f.seqs=[];for(var p=0;p<h;p++){var g=o.readUshort(t,n)+i;n+=2;var x=o.readUshort(t,g);f.seqs.push(o.readUshorts(t,g+2,x))}}else if(e==4)for(f.vals=[],h=o.readUshort(t,n),n+=2,p=0;p<h;p++){var y=o.readUshort(t,n);n+=2,f.vals.push(r.GSUB.readLigatureSet(t,i+y))}else if(e==5&&f.fmt==2){if(f.fmt==2){var M=o.readUshort(t,n);n+=2,f.cDef=r._lctf.readClassDef(t,i+M),f.scset=[];var S=o.readUshort(t,n);for(n+=2,p=0;p<S;p++){var v=o.readUshort(t,n);n+=2,f.scset.push(v==0?null:r.GSUB.readSubClassSet(t,i+v))}}}else if(e==6&&f.fmt==3){if(f.fmt==3){for(p=0;p<3;p++){h=o.readUshort(t,n),n+=2;for(var b=[],T=0;T<h;T++)b.push(r._lctf.readCoverage(t,i+o.readUshort(t,n+2*T)));n+=2*h,p==0&&(f.backCvg=b),p==1&&(f.inptCvg=b),p==2&&(f.ahedCvg=b)}h=o.readUshort(t,n),n+=2,f.lookupRec=r.GSUB.readSubstLookupRecords(t,n,h)}}else if(e==7&&f.fmt==1){var A=o.readUshort(t,n);n+=2;var j=o.readUint(t,n);if(n+=4,a.ltype==9)a.ltype=A;else if(a.ltype!=A)throw"invalid extension substitution";return r.GSUB.subt(t,a.ltype,i+j)}return f},r.GSUB.readSubClassSet=function(t,e){var n=r._bin.readUshort,a=e,o=[],i=n(t,e);e+=2;for(var f=0;f<i;f++){var d=n(t,e);e+=2,o.push(r.GSUB.readSubClassRule(t,a+d))}return o},r.GSUB.readSubClassRule=function(t,e){var n=r._bin.readUshort,a={},o=n(t,e),i=n(t,e+=2);e+=2,a.input=[];for(var f=0;f<o-1;f++)a.input.push(n(t,e)),e+=2;return a.substLookupRecords=r.GSUB.readSubstLookupRecords(t,e,i),a},r.GSUB.readSubstLookupRecords=function(t,e,n){for(var a=r._bin.readUshort,o=[],i=0;i<n;i++)o.push(a(t,e),a(t,e+2)),e+=4;return o},r.GSUB.readChainSubClassSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readUshort(t,e);e+=2,o.push(r.GSUB.readChainSubClassRule(t,a+d))}return o},r.GSUB.readChainSubClassRule=function(t,e){for(var n=r._bin,a={},o=["backtrack","input","lookahead"],i=0;i<o.length;i++){var f=n.readUshort(t,e);e+=2,i==1&&f--,a[o[i]]=n.readUshorts(t,e,f),e+=2*a[o[i]].length}return f=n.readUshort(t,e),e+=2,a.subst=n.readUshorts(t,e,2*f),e+=2*a.subst.length,a},r.GSUB.readLigatureSet=function(t,e){var n=r._bin,a=e,o=[],i=n.readUshort(t,e);e+=2;for(var f=0;f<i;f++){var d=n.readUshort(t,e);e+=2,o.push(r.GSUB.readLigature(t,a+d))}return o},r.GSUB.readLigature=function(t,e){var n=r._bin,a={chain:[]};a.nglyph=n.readUshort(t,e),e+=2;var o=n.readUshort(t,e);e+=2;for(var i=0;i<o-1;i++)a.chain.push(n.readUshort(t,e)),e+=2;return a},r.head={},r.head.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.fontRevision=a.readFixed(t,e),e+=4,a.readUint(t,e),e+=4,a.readUint(t,e),e+=4,o.flags=a.readUshort(t,e),e+=2,o.unitsPerEm=a.readUshort(t,e),e+=2,o.created=a.readUint64(t,e),e+=8,o.modified=a.readUint64(t,e),e+=8,o.xMin=a.readShort(t,e),e+=2,o.yMin=a.readShort(t,e),e+=2,o.xMax=a.readShort(t,e),e+=2,o.yMax=a.readShort(t,e),e+=2,o.macStyle=a.readUshort(t,e),e+=2,o.lowestRecPPEM=a.readUshort(t,e),e+=2,o.fontDirectionHint=a.readShort(t,e),e+=2,o.indexToLocFormat=a.readShort(t,e),e+=2,o.glyphDataFormat=a.readShort(t,e),e+=2,o},r.hhea={},r.hhea.parse=function(t,e,n){var a=r._bin,o={};return a.readFixed(t,e),e+=4,o.ascender=a.readShort(t,e),e+=2,o.descender=a.readShort(t,e),e+=2,o.lineGap=a.readShort(t,e),e+=2,o.advanceWidthMax=a.readUshort(t,e),e+=2,o.minLeftSideBearing=a.readShort(t,e),e+=2,o.minRightSideBearing=a.readShort(t,e),e+=2,o.xMaxExtent=a.readShort(t,e),e+=2,o.caretSlopeRise=a.readShort(t,e),e+=2,o.caretSlopeRun=a.readShort(t,e),e+=2,o.caretOffset=a.readShort(t,e),e+=2,e+=8,o.metricDataFormat=a.readShort(t,e),e+=2,o.numberOfHMetrics=a.readUshort(t,e),e+=2,o},r.hmtx={},r.hmtx.parse=function(t,e,n,a){for(var o=r._bin,i={aWidth:[],lsBearing:[]},f=0,d=0,h=0;h<a.maxp.numGlyphs;h++)h<a.hhea.numberOfHMetrics&&(f=o.readUshort(t,e),e+=2,d=o.readShort(t,e),e+=2),i.aWidth.push(f),i.lsBearing.push(d);return i},r.kern={},r.kern.parse=function(t,e,n,a){var o=r._bin,i=o.readUshort(t,e);if(e+=2,i==1)return r.kern.parseV1(t,e-2,n,a);var f=o.readUshort(t,e);e+=2;for(var d={glyph1:[],rval:[]},h=0;h<f;h++){e+=2,n=o.readUshort(t,e),e+=2;var p=o.readUshort(t,e);e+=2;var g=p>>>8;if((g&=15)!=0)throw"unknown kern table format: "+g;e=r.kern.readFormat0(t,e,d)}return d},r.kern.parseV1=function(t,e,n,a){var o=r._bin;o.readFixed(t,e),e+=4;var i=o.readUint(t,e);e+=4;for(var f={glyph1:[],rval:[]},d=0;d<i;d++){o.readUint(t,e),e+=4;var h=o.readUshort(t,e);e+=2,o.readUshort(t,e),e+=2;var p=h>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;e=r.kern.readFormat0(t,e,f)}return f},r.kern.readFormat0=function(t,e,n){var a=r._bin,o=-1,i=a.readUshort(t,e);e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2,a.readUshort(t,e),e+=2;for(var f=0;f<i;f++){var d=a.readUshort(t,e);e+=2;var h=a.readUshort(t,e);e+=2;var p=a.readShort(t,e);e+=2,d!=o&&(n.glyph1.push(d),n.rval.push({glyph2:[],vals:[]}));var g=n.rval[n.rval.length-1];g.glyph2.push(h),g.vals.push(p),o=d}return e},r.loca={},r.loca.parse=function(t,e,n,a){var o=r._bin,i=[],f=a.head.indexToLocFormat,d=a.maxp.numGlyphs+1;if(f==0)for(var h=0;h<d;h++)i.push(o.readUshort(t,e+(h<<1))<<1);if(f==1)for(h=0;h<d;h++)i.push(o.readUint(t,e+(h<<2)));return i},r.maxp={},r.maxp.parse=function(t,e,n){var a=r._bin,o={},i=a.readUint(t,e);return e+=4,o.numGlyphs=a.readUshort(t,e),e+=2,i==65536&&(o.maxPoints=a.readUshort(t,e),e+=2,o.maxContours=a.readUshort(t,e),e+=2,o.maxCompositePoints=a.readUshort(t,e),e+=2,o.maxCompositeContours=a.readUshort(t,e),e+=2,o.maxZones=a.readUshort(t,e),e+=2,o.maxTwilightPoints=a.readUshort(t,e),e+=2,o.maxStorage=a.readUshort(t,e),e+=2,o.maxFunctionDefs=a.readUshort(t,e),e+=2,o.maxInstructionDefs=a.readUshort(t,e),e+=2,o.maxStackElements=a.readUshort(t,e),e+=2,o.maxSizeOfInstructions=a.readUshort(t,e),e+=2,o.maxComponentElements=a.readUshort(t,e),e+=2,o.maxComponentDepth=a.readUshort(t,e),e+=2),o},r.name={},r.name.parse=function(t,e,n){var a=r._bin,o={};a.readUshort(t,e),e+=2;var i=a.readUshort(t,e);e+=2,a.readUshort(t,e);for(var f,d=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=e+=2,p=0;p<i;p++){var g=a.readUshort(t,e);e+=2;var x=a.readUshort(t,e);e+=2;var y=a.readUshort(t,e);e+=2;var M=a.readUshort(t,e);e+=2;var S=a.readUshort(t,e);e+=2;var v=a.readUshort(t,e);e+=2;var b,T=d[M],A=h+12*i+v;if(g==0)b=a.readUnicode(t,A,S/2);else if(g==3&&x==0)b=a.readUnicode(t,A,S/2);else if(x==0)b=a.readASCII(t,A,S);else if(x==1)b=a.readUnicode(t,A,S/2);else if(x==3)b=a.readUnicode(t,A,S/2);else{if(g!=1)throw"unknown encoding "+x+", platformID: "+g;b=a.readASCII(t,A,S)}var j="p"+g+","+y.toString(16);o[j]==null&&(o[j]={}),o[j][T!==void 0?T:M]=b,o[j]._lang=y}for(var R in o)if(o[R].postScriptName!=null&&o[R]._lang==1033)return o[R];for(var R in o)if(o[R].postScriptName!=null&&o[R]._lang==0)return o[R];for(var R in o)if(o[R].postScriptName!=null&&o[R]._lang==3084)return o[R];for(var R in o)if(o[R].postScriptName!=null)return o[R];for(var R in o){f=R;break}return o[f]},r["OS/2"]={},r["OS/2"].parse=function(t,e,n){var a=r._bin.readUshort(t,e);e+=2;var o={};if(a==0)r["OS/2"].version0(t,e,o);else if(a==1)r["OS/2"].version1(t,e,o);else if(a==2||a==3||a==4)r["OS/2"].version2(t,e,o);else{if(a!=5)throw"unknown OS/2 table version: "+a;r["OS/2"].version5(t,e,o)}return o},r["OS/2"].version0=function(t,e,n){var a=r._bin;return n.xAvgCharWidth=a.readShort(t,e),e+=2,n.usWeightClass=a.readUshort(t,e),e+=2,n.usWidthClass=a.readUshort(t,e),e+=2,n.fsType=a.readUshort(t,e),e+=2,n.ySubscriptXSize=a.readShort(t,e),e+=2,n.ySubscriptYSize=a.readShort(t,e),e+=2,n.ySubscriptXOffset=a.readShort(t,e),e+=2,n.ySubscriptYOffset=a.readShort(t,e),e+=2,n.ySuperscriptXSize=a.readShort(t,e),e+=2,n.ySuperscriptYSize=a.readShort(t,e),e+=2,n.ySuperscriptXOffset=a.readShort(t,e),e+=2,n.ySuperscriptYOffset=a.readShort(t,e),e+=2,n.yStrikeoutSize=a.readShort(t,e),e+=2,n.yStrikeoutPosition=a.readShort(t,e),e+=2,n.sFamilyClass=a.readShort(t,e),e+=2,n.panose=a.readBytes(t,e,10),e+=10,n.ulUnicodeRange1=a.readUint(t,e),e+=4,n.ulUnicodeRange2=a.readUint(t,e),e+=4,n.ulUnicodeRange3=a.readUint(t,e),e+=4,n.ulUnicodeRange4=a.readUint(t,e),e+=4,n.achVendID=[a.readInt8(t,e),a.readInt8(t,e+1),a.readInt8(t,e+2),a.readInt8(t,e+3)],e+=4,n.fsSelection=a.readUshort(t,e),e+=2,n.usFirstCharIndex=a.readUshort(t,e),e+=2,n.usLastCharIndex=a.readUshort(t,e),e+=2,n.sTypoAscender=a.readShort(t,e),e+=2,n.sTypoDescender=a.readShort(t,e),e+=2,n.sTypoLineGap=a.readShort(t,e),e+=2,n.usWinAscent=a.readUshort(t,e),e+=2,n.usWinDescent=a.readUshort(t,e),e+=2},r["OS/2"].version1=function(t,e,n){var a=r._bin;return e=r["OS/2"].version0(t,e,n),n.ulCodePageRange1=a.readUint(t,e),e+=4,n.ulCodePageRange2=a.readUint(t,e),e+=4},r["OS/2"].version2=function(t,e,n){var a=r._bin;return e=r["OS/2"].version1(t,e,n),n.sxHeight=a.readShort(t,e),e+=2,n.sCapHeight=a.readShort(t,e),e+=2,n.usDefault=a.readUshort(t,e),e+=2,n.usBreak=a.readUshort(t,e),e+=2,n.usMaxContext=a.readUshort(t,e),e+=2},r["OS/2"].version5=function(t,e,n){var a=r._bin;return e=r["OS/2"].version2(t,e,n),n.usLowerOpticalPointSize=a.readUshort(t,e),e+=2,n.usUpperOpticalPointSize=a.readUshort(t,e),e+=2},r.post={},r.post.parse=function(t,e,n){var a=r._bin,o={};return o.version=a.readFixed(t,e),e+=4,o.italicAngle=a.readFixed(t,e),e+=4,o.underlinePosition=a.readShort(t,e),e+=2,o.underlineThickness=a.readShort(t,e),e+=2,o},r==null&&(r={}),r.U==null&&(r.U={}),r.U.codeToGlyph=function(t,e){var n=t.cmap,a=-1;if(n.p0e4!=null?a=n.p0e4:n.p3e1!=null?a=n.p3e1:n.p1e0!=null?a=n.p1e0:n.p0e3!=null&&(a=n.p0e3),a==-1)throw"no familiar platform and encoding!";var o=n.tables[a];if(o.format==0)return e>=o.map.length?0:o.map[e];if(o.format==4){for(var i=-1,f=0;f<o.endCount.length;f++)if(e<=o.endCount[f]){i=f;break}return i==-1||o.startCount[i]>e?0:65535&(o.idRangeOffset[i]!=0?o.glyphIdArray[e-o.startCount[i]+(o.idRangeOffset[i]>>1)-(o.idRangeOffset.length-i)]:e+o.idDelta[i])}if(o.format==12){if(e>o.groups[o.groups.length-1][1])return 0;for(f=0;f<o.groups.length;f++){var d=o.groups[f];if(d[0]<=e&&e<=d[1])return d[2]+(e-d[0])}return 0}throw"unknown cmap table format "+o.format},r.U.glyphToPath=function(t,e){var n={cmds:[],crds:[]};if(t.SVG&&t.SVG.entries[e]){var a=t.SVG.entries[e];return a==null?n:(typeof a=="string"&&(a=r.SVG.toPath(a),t.SVG.entries[e]=a),a)}if(t.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:t.CFF.Private?t.CFF.Private.defaultWidthX:0,open:!1},i=t.CFF,f=t.CFF.Private;if(i.ROS){for(var d=0;i.FDSelect[d+2]<=e;)d+=2;f=i.FDArray[i.FDSelect[d+1]].Private}r.U._drawCFF(t.CFF.CharStrings[e],o,i,f,n)}else t.glyf&&r.U._drawGlyf(e,t,n);return n},r.U._drawGlyf=function(t,e,n){var a=e.glyf[t];a==null&&(a=e.glyf[t]=r.glyf._parseGlyf(e,t)),a!=null&&(a.noc>-1?r.U._simpleGlyph(a,n):r.U._compoGlyph(a,e,n))},r.U._simpleGlyph=function(t,e){for(var n=0;n<t.noc;n++){for(var a=n==0?0:t.endPts[n-1]+1,o=t.endPts[n],i=a;i<=o;i++){var f=i==a?o:i-1,d=i==o?a:i+1,h=1&t.flags[i],p=1&t.flags[f],g=1&t.flags[d],x=t.xs[i],y=t.ys[i];if(i==a)if(h){if(!p){r.U.P.moveTo(e,x,y);continue}r.U.P.moveTo(e,t.xs[f],t.ys[f])}else p?r.U.P.moveTo(e,t.xs[f],t.ys[f]):r.U.P.moveTo(e,(t.xs[f]+x)/2,(t.ys[f]+y)/2);h?p&&r.U.P.lineTo(e,x,y):g?r.U.P.qcurveTo(e,x,y,t.xs[d],t.ys[d]):r.U.P.qcurveTo(e,x,y,(x+t.xs[d])/2,(y+t.ys[d])/2)}r.U.P.closePath(e)}},r.U._compoGlyph=function(t,e,n){for(var a=0;a<t.parts.length;a++){var o={cmds:[],crds:[]},i=t.parts[a];r.U._drawGlyf(i.glyphIndex,e,o);for(var f=i.m,d=0;d<o.crds.length;d+=2){var h=o.crds[d],p=o.crds[d+1];n.crds.push(h*f.a+p*f.b+f.tx),n.crds.push(h*f.c+p*f.d+f.ty)}for(d=0;d<o.cmds.length;d++)n.cmds.push(o.cmds[d])}},r.U._getGlyphClass=function(t,e){var n=r._lctf.getInterval(e,t);return n==-1?0:e[n+2]},r.U._applySubs=function(t,e,n,a){for(var o=t.length-e-1,i=0;i<n.tabs.length;i++)if(n.tabs[i]!=null){var f,d=n.tabs[i];if(!d.coverage||(f=r._lctf.coverageIndex(d.coverage,t[e]))!=-1){if(n.ltype==1)t[e],d.fmt==1?t[e]=t[e]+d.delta:t[e]=d.newg[f];else if(n.ltype==4)for(var h=d.vals[f],p=0;p<h.length;p++){var g=h[p],x=g.chain.length;if(!(x>o)){for(var y=!0,M=0,S=0;S<x;S++){for(;t[e+M+(1+S)]==-1;)M++;g.chain[S]!=t[e+M+(1+S)]&&(y=!1)}if(y){for(t[e]=g.nglyph,S=0;S<x+M;S++)t[e+S+1]=-1;break}}}else if(n.ltype==5&&d.fmt==2)for(var v=r._lctf.getInterval(d.cDef,t[e]),b=d.cDef[v+2],T=d.scset[b],A=0;A<T.length;A++){var j=T[A],R=j.input;if(!(R.length>o)){for(y=!0,S=0;S<R.length;S++){var U=r._lctf.getInterval(d.cDef,t[e+1+S]);if(v==-1&&d.cDef[U+2]!=R[S]){y=!1;break}}if(y){var L=j.substLookupRecords;for(p=0;p<L.length;p+=2)L[p],L[p+1]}}}else if(n.ltype==6&&d.fmt==3){if(!r.U._glsCovered(t,d.backCvg,e-d.backCvg.length)||!r.U._glsCovered(t,d.inptCvg,e)||!r.U._glsCovered(t,d.ahedCvg,e+d.inptCvg.length))continue;var H=d.lookupRec;for(A=0;A<H.length;A+=2){v=H[A];var _=a[H[A+1]];r.U._applySubs(t,e+v,_,a)}}}}},r.U._glsCovered=function(t,e,n){for(var a=0;a<e.length;a++)if(r._lctf.coverageIndex(e[a],t[n+a])==-1)return!1;return!0},r.U.glyphsToPath=function(t,e,n){for(var a={cmds:[],crds:[]},o=0,i=0;i<e.length;i++){var f=e[i];if(f!=-1){for(var d=i<e.length-1&&e[i+1]!=-1?e[i+1]:0,h=r.U.glyphToPath(t,f),p=0;p<h.crds.length;p+=2)a.crds.push(h.crds[p]+o),a.crds.push(h.crds[p+1]);for(n&&a.cmds.push(n),p=0;p<h.cmds.length;p++)a.cmds.push(h.cmds[p]);n&&a.cmds.push("X"),o+=t.hmtx.aWidth[f],i<e.length-1&&(o+=r.U.getPairAdjustment(t,f,d))}}return a},r.U.P={},r.U.P.moveTo=function(t,e,n){t.cmds.push("M"),t.crds.push(e,n)},r.U.P.lineTo=function(t,e,n){t.cmds.push("L"),t.crds.push(e,n)},r.U.P.curveTo=function(t,e,n,a,o,i,f){t.cmds.push("C"),t.crds.push(e,n,a,o,i,f)},r.U.P.qcurveTo=function(t,e,n,a,o){t.cmds.push("Q"),t.crds.push(e,n,a,o)},r.U.P.closePath=function(t){t.cmds.push("Z")},r.U._drawCFF=function(t,e,n,a,o){for(var i=e.stack,f=e.nStems,d=e.haveWidth,h=e.width,p=e.open,g=0,x=e.x,y=e.y,M=0,S=0,v=0,b=0,T=0,A=0,j=0,R=0,U=0,L=0,H={val:0,size:0};g<t.length;){r.CFF.getCharString(t,g,H);var _=H.val;if(g+=H.size,_=="o1"||_=="o18")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0;else if(_=="o3"||_=="o23")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0;else if(_=="o4")i.length>1&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),p&&r.U.P.closePath(o),y+=i.pop(),r.U.P.moveTo(o,x,y),p=!0;else if(_=="o5")for(;i.length>0;)x+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,x,y);else if(_=="o6"||_=="o7")for(var F=i.length,E=_=="o6",Y=0;Y<F;Y++){var V=i.shift();E?x+=V:y+=V,E=!E,r.U.P.lineTo(o,x,y)}else if(_=="o8"||_=="o24"){F=i.length;for(var Z=0;Z+6<=F;)M=x+i.shift(),S=y+i.shift(),v=M+i.shift(),b=S+i.shift(),x=v+i.shift(),y=b+i.shift(),r.U.P.curveTo(o,M,S,v,b,x,y),Z+=6;_=="o24"&&(x+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,x,y))}else{if(_=="o11")break;if(_=="o1234"||_=="o1235"||_=="o1236"||_=="o1237")_=="o1234"&&(S=y,v=(M=x+i.shift())+i.shift(),L=b=S+i.shift(),A=b,R=y,x=(j=(T=(U=v+i.shift())+i.shift())+i.shift())+i.shift(),r.U.P.curveTo(o,M,S,v,b,U,L),r.U.P.curveTo(o,T,A,j,R,x,y)),_=="o1235"&&(M=x+i.shift(),S=y+i.shift(),v=M+i.shift(),b=S+i.shift(),U=v+i.shift(),L=b+i.shift(),T=U+i.shift(),A=L+i.shift(),j=T+i.shift(),R=A+i.shift(),x=j+i.shift(),y=R+i.shift(),i.shift(),r.U.P.curveTo(o,M,S,v,b,U,L),r.U.P.curveTo(o,T,A,j,R,x,y)),_=="o1236"&&(M=x+i.shift(),S=y+i.shift(),v=M+i.shift(),L=b=S+i.shift(),A=b,j=(T=(U=v+i.shift())+i.shift())+i.shift(),R=A+i.shift(),x=j+i.shift(),r.U.P.curveTo(o,M,S,v,b,U,L),r.U.P.curveTo(o,T,A,j,R,x,y)),_=="o1237"&&(M=x+i.shift(),S=y+i.shift(),v=M+i.shift(),b=S+i.shift(),U=v+i.shift(),L=b+i.shift(),T=U+i.shift(),A=L+i.shift(),j=T+i.shift(),R=A+i.shift(),Math.abs(j-x)>Math.abs(R-y)?x=j+i.shift():y=R+i.shift(),r.U.P.curveTo(o,M,S,v,b,U,L),r.U.P.curveTo(o,T,A,j,R,x,y));else if(_=="o14"){if(i.length>0&&!d&&(h=i.shift()+n.nominalWidthX,d=!0),i.length==4){var ie=i.shift(),N=i.shift(),z=i.shift(),w=i.shift(),k=r.CFF.glyphBySE(n,z),C=r.CFF.glyphBySE(n,w);r.U._drawCFF(n.CharStrings[k],e,n,a,o),e.x=ie,e.y=N,r.U._drawCFF(n.CharStrings[C],e,n,a,o)}p&&(r.U.P.closePath(o),p=!1)}else if(_=="o19"||_=="o20")i.length%2!=0&&!d&&(h=i.shift()+a.nominalWidthX),f+=i.length>>1,i.length=0,d=!0,g+=f+7>>3;else if(_=="o21")i.length>2&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),y+=i.pop(),x+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,x,y),p=!0;else if(_=="o22")i.length>1&&!d&&(h=i.shift()+a.nominalWidthX,d=!0),x+=i.pop(),p&&r.U.P.closePath(o),r.U.P.moveTo(o,x,y),p=!0;else if(_=="o25"){for(;i.length>6;)x+=i.shift(),y+=i.shift(),r.U.P.lineTo(o,x,y);M=x+i.shift(),S=y+i.shift(),v=M+i.shift(),b=S+i.shift(),x=v+i.shift(),y=b+i.shift(),r.U.P.curveTo(o,M,S,v,b,x,y)}else if(_=="o26")for(i.length%2&&(x+=i.shift());i.length>0;)M=x,S=y+i.shift(),x=v=M+i.shift(),y=(b=S+i.shift())+i.shift(),r.U.P.curveTo(o,M,S,v,b,x,y);else if(_=="o27")for(i.length%2&&(y+=i.shift());i.length>0;)S=y,v=(M=x+i.shift())+i.shift(),b=S+i.shift(),x=v+i.shift(),y=b,r.U.P.curveTo(o,M,S,v,b,x,y);else if(_=="o10"||_=="o29"){var I=_=="o10"?a:n;if(i.length!=0){var P=i.pop(),X=I.Subrs[P+I.Bias];e.x=x,e.y=y,e.nStems=f,e.haveWidth=d,e.width=h,e.open=p,r.U._drawCFF(X,e,n,a,o),x=e.x,y=e.y,f=e.nStems,d=e.haveWidth,h=e.width,p=e.open}}else if(_=="o30"||_=="o31"){var D=i.length,O=(Z=0,_=="o31");for(Z+=D-(F=-3&D);Z<F;)O?(S=y,v=(M=x+i.shift())+i.shift(),y=(b=S+i.shift())+i.shift(),F-Z==5?(x=v+i.shift(),Z++):x=v,O=!1):(M=x,S=y+i.shift(),v=M+i.shift(),b=S+i.shift(),x=v+i.shift(),F-Z==5?(y=b+i.shift(),Z++):y=b,O=!0),r.U.P.curveTo(o,M,S,v,b,x,y),Z+=4}else{if((_+"").charAt(0)=="o")throw _;i.push(_)}}}e.x=x,e.y=y,e.nStems=f,e.haveWidth=d,e.width=h,e.open=p};var s=r,c={Typr:s};return l.Typr=s,l.default=c,Object.defineProperty(l,"__esModule",{value:!0}),l}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function Hs(){return function(l){var r=Uint8Array,s=Uint16Array,c=Uint32Array,t=new r([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),e=new r([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),n=new r([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(_,F){for(var E=new s(31),Y=0;Y<31;++Y)E[Y]=F+=1<<_[Y-1];var V=new c(E[30]);for(Y=1;Y<30;++Y)for(var Z=E[Y];Z<E[Y+1];++Z)V[Z]=Z-E[Y]<<5|Y;return[E,V]},o=a(t,2),i=o[0],f=o[1];i[28]=258,f[258]=28;for(var d=a(e,0)[0],h=new s(32768),p=0;p<32768;++p){var g=(43690&p)>>>1|(21845&p)<<1;g=(61680&(g=(52428&g)>>>2|(13107&g)<<2))>>>4|(3855&g)<<4,h[p]=((65280&g)>>>8|(255&g)<<8)>>>1}var x=function(_,F,E){for(var Y=_.length,V=0,Z=new s(F);V<Y;++V)++Z[_[V]-1];var ie,N=new s(F);for(V=0;V<F;++V)N[V]=N[V-1]+Z[V-1]<<1;{ie=new s(1<<F);var z=15-F;for(V=0;V<Y;++V)if(_[V])for(var w=V<<4|_[V],k=F-_[V],C=N[_[V]-1]++<<k,I=C|(1<<k)-1;C<=I;++C)ie[h[C]>>>z]=w}return ie},y=new r(288);for(p=0;p<144;++p)y[p]=8;for(p=144;p<256;++p)y[p]=9;for(p=256;p<280;++p)y[p]=7;for(p=280;p<288;++p)y[p]=8;var M=new r(32);for(p=0;p<32;++p)M[p]=5;var S=x(y,9),v=x(M,5),b=function(_){for(var F=_[0],E=1;E<_.length;++E)_[E]>F&&(F=_[E]);return F},T=function(_,F,E){var Y=F/8|0;return(_[Y]|_[Y+1]<<8)>>(7&F)&E},A=function(_,F){var E=F/8|0;return(_[E]|_[E+1]<<8|_[E+2]<<16)>>(7&F)},j=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],R=function(_,F,E){var Y=new Error(F||j[_]);if(Y.code=_,Error.captureStackTrace&&Error.captureStackTrace(Y,R),!E)throw Y;return Y},U=function(_,F,E){var Y=_.length;if(!Y||E&&!E.l&&Y<5)return F||new r(0);var V=!F||E,Z=!E||E.i;E||(E={}),F||(F=new r(3*Y));var ie,N=function(ue){var Le=F.length;if(ue>Le){var Ae=new r(Math.max(2*Le,ue));Ae.set(F),F=Ae}},z=E.f||0,w=E.p||0,k=E.b||0,C=E.l,I=E.d,P=E.m,X=E.n,D=8*Y;do{if(!C){E.f=z=T(_,w,1);var O=T(_,w+1,3);if(w+=3,!O){var K=_[(re=((ie=w)/8|0)+(7&ie&&1)+4)-4]|_[re-3]<<8,Q=re+K;if(Q>Y){Z&&R(0);break}V&&N(k+K),F.set(_.subarray(re,Q),k),E.b=k+=K,E.p=w=8*Q;continue}if(O==1)C=S,I=v,P=9,X=5;else if(O==2){var G=T(_,w,31)+257,W=T(_,w+10,15)+4,he=G+T(_,w+5,31)+1;w+=14;for(var fe=new r(he),$=new r(19),ae=0;ae<W;++ae)$[n[ae]]=T(_,w+3*ae,7);w+=3*W;var oe=b($),q=(1<<oe)-1,ne=x($,oe);for(ae=0;ae<he;){var re,B=ne[T(_,w,q)];if(w+=15&B,(re=B>>>4)<16)fe[ae++]=re;else{var ge=0,ee=0;for(re==16?(ee=3+T(_,w,3),w+=2,ge=fe[ae-1]):re==17?(ee=3+T(_,w,7),w+=3):re==18&&(ee=11+T(_,w,127),w+=7);ee--;)fe[ae++]=ge}}var se=fe.subarray(0,G),J=fe.subarray(G);P=b(se),X=b(J),C=x(se,P),I=x(J,X)}else R(1);if(w>D){Z&&R(0);break}}V&&N(k+131072);for(var Se=(1<<P)-1,te=(1<<X)-1,le=w;;le=w){var pe=(ge=C[A(_,w)&Se])>>>4;if((w+=15&ge)>D){Z&&R(0);break}if(ge||R(2),pe<256)F[k++]=pe;else{if(pe==256){le=w,C=null;break}var ye=pe-254;if(pe>264){var ke=t[ae=pe-257];ye=T(_,w,(1<<ke)-1)+i[ae],w+=ke}var Ee=I[A(_,w)&te],we=Ee>>>4;if(Ee||R(3),w+=15&Ee,J=d[we],we>3&&(ke=e[we],J+=A(_,w)&(1<<ke)-1,w+=ke),w>D){Z&&R(0);break}V&&N(k+131072);for(var be=k+ye;k<be;k+=4)F[k]=F[k-J],F[k+1]=F[k+1-J],F[k+2]=F[k+2-J],F[k+3]=F[k+3-J];k=be}}E.l=C,E.p=le,E.b=k,C&&(z=1,E.m=P,E.d=I,E.n=X)}while(!z);return k==F.length?F:function(ue,Le,Ae){(Ae==null||Ae>ue.length)&&(Ae=ue.length);var Ze=new(ue instanceof s?s:ue instanceof c?c:r)(Ae-Le);return Ze.set(ue.subarray(Le,Ae)),Ze}(F,0,k)},L=new r(0),H=typeof TextDecoder<"u"&&new TextDecoder;try{H.decode(L,{stream:!0})}catch{}return l.convert_streams=function(_){var F=new DataView(_),E=0;function Y(){var G=F.getUint16(E);return E+=2,G}function V(){var G=F.getUint32(E);return E+=4,G}function Z(G){K.setUint16(Q,G),Q+=2}function ie(G){K.setUint32(Q,G),Q+=4}for(var N={signature:V(),flavor:V(),length:V(),numTables:Y(),reserved:Y(),totalSfntSize:V(),majorVersion:Y(),minorVersion:Y(),metaOffset:V(),metaLength:V(),metaOrigLength:V(),privOffset:V(),privLength:V()},z=0;Math.pow(2,z)<=N.numTables;)z++;z--;for(var w=16*Math.pow(2,z),k=16*N.numTables-w,C=12,I=[],P=0;P<N.numTables;P++)I.push({tag:V(),offset:V(),compLength:V(),origLength:V(),origChecksum:V()}),C+=16;var X,D=new Uint8Array(12+16*I.length+I.reduce(function(G,W){return G+W.origLength+4},0)),O=D.buffer,K=new DataView(O),Q=0;return ie(N.flavor),Z(N.numTables),Z(w),Z(z),Z(k),I.forEach(function(G){ie(G.tag),ie(G.origChecksum),ie(C),ie(G.origLength),G.outOffset=C,(C+=G.origLength)%4!=0&&(C+=4-C%4)}),I.forEach(function(G){var W,he=_.slice(G.offset,G.offset+G.compLength);if(G.compLength!=G.origLength){var fe=new Uint8Array(G.origLength);W=new Uint8Array(he,2),U(W,fe)}else fe=new Uint8Array(he);D.set(fe,G.outOffset);var $=0;(C=G.outOffset+G.origLength)%4!=0&&($=4-C%4),D.set(new Uint8Array($).buffer,G.outOffset+G.origLength),X=C+$}),O.slice(0,X)},Object.defineProperty(l,"__esModule",{value:!0}),l}({}).convert_streams}function Vs(l,r){const s={M:2,L:2,Q:4,C:6,Z:0},c={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},t=1,e=2,n=4,a=8,o=16,i=32;let f;function d(j){if(!f){const R={R:e,L:t,D:n,C:o,U:i,T:a};f=new Map;for(let U in c){let L=0;c[U].split(",").forEach(H=>{let[_,F]=H.split("+");_=parseInt(_,36),F=F?parseInt(F,36):0,f.set(L+=_,R[U]);for(let E=F;E--;)f.set(++L,R[U])})}}return f.get(j)||i}const h=1,p=2,g=3,x=4,y=[null,"isol","init","fina","medi"];function M(j){const R=new Uint8Array(j.length);let U=i,L=h,H=-1;for(let _=0;_<j.length;_++){const F=j.codePointAt(_);let E=d(F)|0,Y=h;E&a||(U&(t|n|o)?E&(e|n|o)?(Y=g,(L===h||L===g)&&R[H]++):E&(t|i)&&(L===p||L===x)&&R[H]--:U&(e|i)&&(L===p||L===x)&&R[H]--,L=R[_]=Y,U=E,H=_,F>65535&&_++)}return R}function S(j,R){const U=[];for(let H=0;H<R.length;H++){const _=R.codePointAt(H);_>65535&&H++,U.push(l.U.codeToGlyph(j,_))}const L=j.GSUB;if(L){const{lookupList:H,featureList:_}=L;let F;const E=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,Y=[];_.forEach(V=>{if(E.test(V.tag))for(let Z=0;Z<V.tab.length;Z++){if(Y[V.tab[Z]])continue;Y[V.tab[Z]]=!0;const ie=H[V.tab[Z]],N=/^(isol|init|fina|medi)$/.test(V.tag);N&&!F&&(F=M(R));for(let z=0;z<U.length;z++)(!F||!N||y[F[z]]===V.tag)&&l.U._applySubs(U,z,ie,H)}})}return U}function v(j,R){const U=new Int16Array(R.length*3);let L=0;for(;L<R.length;L++){const E=R[L];if(E===-1)continue;U[L*3+2]=j.hmtx.aWidth[E];const Y=j.GPOS;if(Y){const V=Y.lookupList;for(let Z=0;Z<V.length;Z++){const ie=V[Z];for(let N=0;N<ie.tabs.length;N++){const z=ie.tabs[N];if(ie.ltype===1){if(l._lctf.coverageIndex(z.coverage,E)!==-1&&z.pos){F(z.pos,L);break}}else if(ie.ltype===2){let w=null,k=H();if(k!==-1){const C=l._lctf.coverageIndex(z.coverage,R[k]);if(C!==-1){if(z.fmt===1){const I=z.pairsets[C];for(let P=0;P<I.length;P++)I[P].gid2===E&&(w=I[P])}else if(z.fmt===2){const I=l.U._getGlyphClass(R[k],z.classDef1),P=l.U._getGlyphClass(E,z.classDef2);w=z.matrix[I][P]}if(w){w.val1&&F(w.val1,k),w.val2&&F(w.val2,L);break}}}}else if(ie.ltype===4){const w=l._lctf.coverageIndex(z.markCoverage,E);if(w!==-1){const k=H(_),C=k===-1?-1:l._lctf.coverageIndex(z.baseCoverage,R[k]);if(C!==-1){const I=z.markArray[w],P=z.baseArray[C][I.markClass];U[L*3]=P.x-I.x+U[k*3]-U[k*3+2],U[L*3+1]=P.y-I.y+U[k*3+1];break}}}else if(ie.ltype===6){const w=l._lctf.coverageIndex(z.mark1Coverage,E);if(w!==-1){const k=H();if(k!==-1){const C=R[k];if(b(j,C)===3){const I=l._lctf.coverageIndex(z.mark2Coverage,C);if(I!==-1){const P=z.mark1Array[w],X=z.mark2Array[I][P.markClass];U[L*3]=X.x-P.x+U[k*3]-U[k*3+2],U[L*3+1]=X.y-P.y+U[k*3+1];break}}}}}}}}else if(j.kern&&!j.cff){const V=H();if(V!==-1){const Z=j.kern.glyph1.indexOf(R[V]);if(Z!==-1){const ie=j.kern.rval[Z].glyph2.indexOf(E);ie!==-1&&(U[V*3+2]+=j.kern.rval[Z].vals[ie])}}}}return U;function H(E){for(let Y=L-1;Y>=0;Y--)if(R[Y]!==-1&&(!E||E(R[Y])))return Y;return-1}function _(E){return b(j,E)===1}function F(E,Y){for(let V=0;V<3;V++)U[Y*3+V]+=E[V]||0}}function b(j,R){const U=j.GDEF&&j.GDEF.glyphClassDef;return U?l.U._getGlyphClass(R,U):0}function T(...j){for(let R=0;R<j.length;R++)if(typeof j[R]=="number")return j[R]}function A(j){const R=Object.create(null),U=j["OS/2"],L=j.hhea,H=j.head.unitsPerEm,_=T(U&&U.sTypoAscender,L&&L.ascender,H),F={unitsPerEm:H,ascender:_,descender:T(U&&U.sTypoDescender,L&&L.descender,0),capHeight:T(U&&U.sCapHeight,_),xHeight:T(U&&U.sxHeight,_),lineGap:T(U&&U.sTypoLineGap,L&&L.lineGap),supportsCodePoint(E){return l.U.codeToGlyph(j,E)>0},forEachGlyph(E,Y,V,Z){let ie=0;const N=1/F.unitsPerEm*Y,z=S(j,E);let w=0;const k=v(j,z);return z.forEach((C,I)=>{if(C!==-1){let P=R[C];if(!P){const{cmds:X,crds:D}=l.U.glyphToPath(j,C);let O="",K=0;for(let fe=0,$=X.length;fe<$;fe++){const ae=s[X[fe]];O+=X[fe];for(let oe=1;oe<=ae;oe++)O+=(oe>1?",":"")+D[K++]}let Q,G,W,he;if(D.length){Q=G=1/0,W=he=-1/0;for(let fe=0,$=D.length;fe<$;fe+=2){let ae=D[fe],oe=D[fe+1];ae<Q&&(Q=ae),oe<G&&(G=oe),ae>W&&(W=ae),oe>he&&(he=oe)}}else Q=W=G=he=0;P=R[C]={index:C,advanceWidth:j.hmtx.aWidth[C],xMin:Q,yMin:G,xMax:W,yMax:he,path:O}}Z.call(null,P,ie+k[I*3]*N,k[I*3+1]*N,w),ie+=k[I*3+2]*N,V&&(ie+=V*Y)}w+=E.codePointAt(w)>65535?2:1}),ie}};return F}return function(R){const U=new Uint8Array(R,0,4),L=l._bin.readASCII(U,0,4);if(L==="wOFF")R=r(R);else if(L==="wOF2")throw new Error("woff2 fonts not supported");return A(l.parse(R)[0])}}const Xs=Xt({name:"Typr Font Parser",dependencies:[Ns,Hs,Vs],init(l,r,s){const c=l(),t=r();return s(c,t)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function Ys(){return function(l){var r=function(){this.buckets=new Map};r.prototype.add=function(v){var b=v>>5;this.buckets.set(b,(this.buckets.get(b)||0)|1<<(31&v))},r.prototype.has=function(v){var b=this.buckets.get(v>>5);return b!==void 0&&(b&1<<(31&v))!=0},r.prototype.serialize=function(){var v=[];return this.buckets.forEach(function(b,T){v.push((+T).toString(36)+":"+b.toString(36))}),v.join(",")},r.prototype.deserialize=function(v){var b=this;this.buckets.clear(),v.split(",").forEach(function(T){var A=T.split(":");b.buckets.set(parseInt(A[0],36),parseInt(A[1],36))})};var s=Math.pow(2,8),c=s-1,t=~c;function e(v){var b=function(A){return A&t}(v).toString(16),T=function(A){return(A&t)+s-1}(v).toString(16);return"codepoint-index/plane"+(v>>16)+"/"+b+"-"+T+".json"}function n(v,b){var T=v&c,A=b.codePointAt(T/6|0);return((A=(A||48)-48)&1<<T%6)!=0}function a(v,b){var T;(T=v,T.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(A){return A.split("-").map(function(j){return parseInt(j.trim(),16)})})).forEach(function(A){var j=A[0],R=A[1];R===void 0&&(R=j),b(j,R)})}function o(v,b){a(v,function(T,A){for(var j=T;j<=A;j++)b(j)})}var i={},f={},d=new WeakMap,h="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function p(v){var b=d.get(v);return b||(b=new r,o(v.ranges,function(T){return b.add(T)}),d.set(v,b)),b}var g,x=new Map;function y(v,b,T){return v[b]?b:v[T]?T:function(A){for(var j in A)return j}(v)}function M(v,b){var T=b;if(!v.includes(T)){T=1/0;for(var A=0;A<v.length;A++)Math.abs(v[A]-b)<Math.abs(T-b)&&(T=v[A])}return T}function S(v){return g||(g=new Set,o("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(b){g.add(b)})),g.has(v)}return l.CodePointSet=r,l.clearCache=function(){i={},f={}},l.getFontsForString=function(v,b){b===void 0&&(b={});var T,A=b.lang;A===void 0&&(A=new RegExp("\\p{Script=Hangul}","u").test(T=v)?"ko":new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}","u").test(T)?"ja":"en");var j=b.category;j===void 0&&(j="sans-serif");var R=b.style;R===void 0&&(R="normal");var U=b.weight;U===void 0&&(U=400);var L=(b.dataUrl||h).replace(/\/$/g,""),H=new Map,_=new Uint8Array(v.length),F={},E={},Y=new Array(v.length),V=new Map,Z=!1;function ie(w){var k=x.get(w);return k||(k=fetch(L+"/"+w).then(function(C){if(!C.ok)throw new Error(C.statusText);return C.json().then(function(I){if(!Array.isArray(I)||I[0]!==1)throw new Error("Incorrect schema version; need 1, got "+I[0]);return I[1]})}).catch(function(C){if(L!==h)return Z||(Z=!0),L=h,x.delete(w),ie(w);throw C}),x.set(w,k)),k}for(var N=function(w){var k=v.codePointAt(w),C=e(k);Y[w]=C,i[C]||V.has(C)||V.set(C,ie(C).then(function(I){i[C]=I})),k>65535&&(w++,z=w)},z=0;z<v.length;z++)N(z);return Promise.all(V.values()).then(function(){V.clear();for(var w=function(C){var I=v.codePointAt(C),P=null,X=i[Y[C]],D=void 0;for(var O in X){var K=E[O];if(K===void 0&&(K=E[O]=new RegExp(O).test(A||"en")),K){for(var Q in D=O,X[O])if(n(I,X[O][Q])){P=Q;break}break}}if(!P){e:for(var G in X)if(G!==D){for(var W in X[G])if(n(I,X[G][W])){P=W;break e}}}P||(P="latin"),Y[C]=P,f[P]||V.has(P)||V.set(P,ie("font-meta/"+P+".json").then(function(he){f[P]=he})),I>65535&&(C++,k=C)},k=0;k<v.length;k++)w(k);return Promise.all(V.values())}).then(function(){for(var w,k=null,C=0;C<v.length;C++){var I=v.codePointAt(C);if(k&&(S(I)||p(k).has(I)))_[C]=_[C-1];else{k=f[Y[C]];var P=F[k.id];if(!P){var X=k.typeforms,D=y(X,j,"sans-serif"),O=y(X[D],R,"normal"),K=M((w=X[D])===null||w===void 0?void 0:w[O],U);P=F[k.id]=L+"/font-files/"+k.id+"/"+D+"."+O+"."+K+".woff"}var Q=H.get(P);Q==null&&(Q=H.size,H.set(P,Q)),_[C]=Q}I>65535&&(C++,_[C]=_[C-1])}return{fontUrls:Array.from(H.keys()),chars:_}})},Object.defineProperty(l,"__esModule",{value:!0}),l}({})}function qs(l,r){const s=Object.create(null),c=Object.create(null);function t(n,a){const o=i=>{};try{const i=new XMLHttpRequest;i.open("get",n,!0),i.responseType="arraybuffer",i.onload=function(){if(i.status>=400)o(new Error(i.statusText));else if(i.status>0)try{const f=l(i.response);f.src=n,a(f)}catch(f){o(f)}},i.onerror=o,i.send()}catch(i){o(i)}}function e(n,a){let o=s[n];o?a(o):c[n]?c[n].push(a):(c[n]=[a],t(n,i=>{i.src=n,s[n]=i,c[n].forEach(f=>f(i)),delete c[n]}))}return function(n,a,{lang:o,fonts:i=[],style:f="normal",weight:d="normal",unicodeFontsURL:h}={}){const p=new Uint8Array(n.length),g=[];n.length||S();const x=new Map,y=[];if(f!=="italic"&&(f="normal"),typeof d!="number"&&(d=d==="bold"?700:400),i&&!Array.isArray(i)&&(i=[i]),i=i.slice().filter(b=>!b.lang||b.lang.test(o)).reverse(),i.length){let j=0;(function R(U=0){for(let L=U,H=n.length;L<H;L++){const _=n.codePointAt(L);if(j===1&&g[p[L-1]].supportsCodePoint(_)||/\s/.test(n[L]))p[L]=p[L-1],j===2&&(y[y.length-1][1]=L);else for(let F=p[L],E=i.length;F<=E;F++)if(F===E){const Y=j===2?y[y.length-1]:y[y.length]=[L,L];Y[1]=L,j=2}else{p[L]=F;const{src:Y,unicodeRange:V}=i[F];if(!V||v(_,V)){const Z=s[Y];if(!Z){e(Y,()=>{R(L)});return}if(Z.supportsCodePoint(_)){let ie=x.get(Z);typeof ie!="number"&&(ie=g.length,g.push(Z),x.set(Z,ie)),p[L]=ie,j=1;break}}}_>65535&&L+1<H&&(p[L+1]=p[L],L++,j===2&&(y[y.length-1][1]=L))}M()})()}else y.push([0,n.length-1]),M();function M(){if(y.length){const b=y.map(T=>n.substring(T[0],T[1]+1)).join(`
`);r.getFontsForString(b,{lang:o||void 0,style:f,weight:d,dataUrl:h}).then(({fontUrls:T,chars:A})=>{const j=g.length;let R=0;y.forEach(L=>{for(let H=0,_=L[1]-L[0];H<=_;H++)p[L[0]+H]=A[R++]+j;R++});let U=0;T.forEach((L,H)=>{e(L,_=>{g[H+j]=_,++U===T.length&&S()})})})}else S()}function S(){a({chars:p,fonts:g})}function v(b,T){for(let A=0;A<T.length;A++){const[j,R=j]=T[A];if(j<=b&&b<=R)return!0}return!1}}}const Zs=Xt({name:"FontResolver",dependencies:[qs,Xs,Ys],init(l,r,s){return l(r,s())}});function Qs(l,r){const c=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,t="[^\\S\\u00A0]",e=new RegExp(`${t}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function n({text:g,lang:x,fonts:y,style:M,weight:S,preResolvedFonts:v,unicodeFontsURL:b},T){const A=({chars:j,fonts:R})=>{let U,L;const H=[];for(let _=0;_<j.length;_++)j[_]!==L?(L=j[_],H.push(U={start:_,end:_,fontObj:R[j[_]]})):U.end=_;T(H)};v?A(v):l(g,A,{lang:x,fonts:y,style:M,weight:S,unicodeFontsURL:b})}function a({text:g="",font:x,lang:y,sdfGlyphSize:M=64,fontSize:S=400,fontWeight:v=1,fontStyle:b="normal",letterSpacing:T=0,lineHeight:A="normal",maxWidth:j=1/0,direction:R,textAlign:U="left",textIndent:L=0,whiteSpace:H="normal",overflowWrap:_="normal",anchorX:F=0,anchorY:E=0,metricsOnly:Y=!1,unicodeFontsURL:V,preResolvedFonts:Z=null,includeCaretPositions:ie=!1,chunkedBoundsSize:N=8192,colorRanges:z=null},w){const k=d(),C={fontLoad:0,typesetting:0};g.indexOf("\r")>-1&&(g=g.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),S=+S,T=+T,j=+j,A=A||"normal",L=+L,n({text:g,lang:y,style:b,weight:v,fonts:typeof x=="string"?[{src:x}]:x,unicodeFontsURL:V,preResolvedFonts:Z},I=>{C.fontLoad=d()-k;const P=isFinite(j);let X=null,D=null,O=null,K=null,Q=null,G=null,W=null,he=null,fe=0,$=0,ae=H!=="nowrap";const oe=new Map,q=d();let ne=L,re=0,B=new h;const ge=[B];I.forEach(te=>{const{fontObj:le}=te,{ascender:pe,descender:ye,unitsPerEm:ke,lineGap:Ee,capHeight:we,xHeight:be}=le;let ue=oe.get(le);if(!ue){const me=S/ke,_e=A==="normal"?(pe-ye+Ee)*me:A*S,wt=(_e-(pe-ye)*me)/2,Te=Math.min(_e,(pe-ye)*me),Me=(pe+ye)/2*me+Te/2;ue={index:oe.size,src:le.src,fontObj:le,fontSizeMult:me,unitsPerEm:ke,ascender:pe*me,descender:ye*me,capHeight:we*me,xHeight:be*me,lineHeight:_e,baseline:-wt-pe*me,caretTop:Me,caretBottom:Me-Te},oe.set(le,ue)}const{fontSizeMult:Le}=ue,Ae=g.slice(te.start,te.end+1);let Ze,je;le.forEachGlyph(Ae,S,T,(me,_e,wt,Te)=>{_e+=re,Te+=te.start,Ze=_e,je=me;const Me=g.charAt(Te),Ie=me.advanceWidth*Le,Re=B.count;let xe;if("isEmpty"in me||(me.isWhitespace=!!Me&&new RegExp(t).test(Me),me.canBreakAfter=!!Me&&e.test(Me),me.isEmpty=me.xMin===me.xMax||me.yMin===me.yMax||c.test(Me)),!me.isWhitespace&&!me.isEmpty&&$++,ae&&P&&!me.isWhitespace&&_e+Ie+ne>j&&Re){if(B.glyphAt(Re-1).glyphObj.canBreakAfter)xe=new h,ne=-_e;else for(let Ye=Re;Ye--;)if(Ye===0&&_==="break-word"){xe=new h,ne=-_e;break}else if(B.glyphAt(Ye).glyphObj.canBreakAfter){xe=B.splitAt(Ye+1);const He=xe.glyphAt(0).x;ne-=He;for(let ze=xe.count;ze--;)xe.glyphAt(ze).x-=He;break}xe&&(B.isSoftWrapped=!0,B=xe,ge.push(B),fe=j)}let Pe=B.glyphAt(B.count);Pe.glyphObj=me,Pe.x=_e+ne,Pe.y=wt,Pe.width=Ie,Pe.charIndex=Te,Pe.fontData=ue,Me===`
`&&(B=new h,ge.push(B),ne=-(_e+Ie+T*S)+L)}),re=Ze+je.advanceWidth*Le+T*S});let ee=0;ge.forEach(te=>{let le=!0;for(let pe=te.count;pe--;){const ye=te.glyphAt(pe);le&&!ye.glyphObj.isWhitespace&&(te.width=ye.x+ye.width,te.width>fe&&(fe=te.width),le=!1);let{lineHeight:ke,capHeight:Ee,xHeight:we,baseline:be}=ye.fontData;ke>te.lineHeight&&(te.lineHeight=ke);const ue=be-te.baseline;ue<0&&(te.baseline+=ue,te.cap+=ue,te.ex+=ue),te.cap=Math.max(te.cap,te.baseline+Ee),te.ex=Math.max(te.ex,te.baseline+we)}te.baseline-=ee,te.cap-=ee,te.ex-=ee,ee+=te.lineHeight});let se=0,J=0;if(F&&(typeof F=="number"?se=-F:typeof F=="string"&&(se=-fe*(F==="left"?0:F==="center"?.5:F==="right"?1:i(F)))),E&&(typeof E=="number"?J=-E:typeof E=="string"&&(J=E==="top"?0:E==="top-baseline"?-ge[0].baseline:E==="top-cap"?-ge[0].cap:E==="top-ex"?-ge[0].ex:E==="middle"?ee/2:E==="bottom"?ee:E==="bottom-baseline"?-ge[ge.length-1].baseline:i(E)*ee)),!Y){const te=r.getEmbeddingLevels(g,R);X=new Uint16Array($),D=new Uint8Array($),O=new Float32Array($*2),K={},W=[1/0,1/0,-1/0,-1/0],he=[],ie&&(G=new Float32Array(g.length*4)),z&&(Q=new Uint8Array($*3));let le=0,pe=-1,ye=-1,ke,Ee;if(ge.forEach((we,be)=>{let{count:ue,width:Le}=we;if(ue>0){let Ae=0;for(let Te=ue;Te--&&we.glyphAt(Te).glyphObj.isWhitespace;)Ae++;let Ze=0,je=0;if(U==="center")Ze=(fe-Le)/2;else if(U==="right")Ze=fe-Le;else if(U==="justify"&&we.isSoftWrapped){let Te=0;for(let Me=ue-Ae;Me--;)we.glyphAt(Me).glyphObj.isWhitespace&&Te++;je=(fe-Le)/Te}if(je||Ze){let Te=0;for(let Me=0;Me<ue;Me++){let Ie=we.glyphAt(Me);const Re=Ie.glyphObj;Ie.x+=Ze+Te,je!==0&&Re.isWhitespace&&Me<ue-Ae&&(Te+=je,Ie.width+=je)}}const me=r.getReorderSegments(g,te,we.glyphAt(0).charIndex,we.glyphAt(we.count-1).charIndex);for(let Te=0;Te<me.length;Te++){const[Me,Ie]=me[Te];let Re=1/0,xe=-1/0;for(let Pe=0;Pe<ue;Pe++)if(we.glyphAt(Pe).charIndex>=Me){let Ye=Pe,He=Pe;for(;He<ue;He++){let ze=we.glyphAt(He);if(ze.charIndex>Ie)break;He<ue-Ae&&(Re=Math.min(Re,ze.x),xe=Math.max(xe,ze.x+ze.width))}for(let ze=Ye;ze<He;ze++){const ot=we.glyphAt(ze);ot.x=xe-(ot.x+ot.width-Re)}break}}let _e;const wt=Te=>_e=Te;for(let Te=0;Te<ue;Te++){const Me=we.glyphAt(Te);_e=Me.glyphObj;const Ie=_e.index,Re=te.levels[Me.charIndex]&1;if(Re){const xe=r.getMirroredCharacter(g[Me.charIndex]);xe&&Me.fontData.fontObj.forEachGlyph(xe,0,0,wt)}if(ie){const{charIndex:xe,fontData:Pe}=Me,Ye=Me.x+se,He=Me.x+Me.width+se;G[xe*4]=Re?He:Ye,G[xe*4+1]=Re?Ye:He,G[xe*4+2]=we.baseline+Pe.caretBottom+J,G[xe*4+3]=we.baseline+Pe.caretTop+J;const ze=xe-pe;ze>1&&f(G,pe,ze),pe=xe}if(z){const{charIndex:xe}=Me;for(;xe>ye;)ye++,z.hasOwnProperty(ye)&&(Ee=z[ye])}if(!_e.isWhitespace&&!_e.isEmpty){const xe=le++,{fontSizeMult:Pe,src:Ye,index:He}=Me.fontData,ze=K[Ye]||(K[Ye]={});ze[Ie]||(ze[Ie]={path:_e.path,pathBounds:[_e.xMin,_e.yMin,_e.xMax,_e.yMax]});const ot=Me.x+se,bt=Me.y+we.baseline+J;O[xe*2]=ot,O[xe*2+1]=bt;const vt=ot+_e.xMin*Pe,Mt=bt+_e.yMin*Pe,jt=ot+_e.xMax*Pe,gt=bt+_e.yMax*Pe;vt<W[0]&&(W[0]=vt),Mt<W[1]&&(W[1]=Mt),jt>W[2]&&(W[2]=jt),gt>W[3]&&(W[3]=gt),xe%N===0&&(ke={start:xe,end:xe,rect:[1/0,1/0,-1/0,-1/0]},he.push(ke)),ke.end++;const qe=ke.rect;if(vt<qe[0]&&(qe[0]=vt),Mt<qe[1]&&(qe[1]=Mt),jt>qe[2]&&(qe[2]=jt),gt>qe[3]&&(qe[3]=gt),X[xe]=Ie,D[xe]=He,z){const Ct=xe*3;Q[Ct]=Ee>>16&255,Q[Ct+1]=Ee>>8&255,Q[Ct+2]=Ee&255}}}}}),G){const we=g.length-pe;we>1&&f(G,pe,we)}}const Se=[];oe.forEach(({index:te,src:le,unitsPerEm:pe,ascender:ye,descender:ke,lineHeight:Ee,capHeight:we,xHeight:be})=>{Se[te]={src:le,unitsPerEm:pe,ascender:ye,descender:ke,lineHeight:Ee,capHeight:we,xHeight:be}}),C.typesetting=d()-q,w({glyphIds:X,glyphFontIndices:D,glyphPositions:O,glyphData:K,fontData:Se,caretPositions:G,glyphColors:Q,chunkedBounds:he,fontSize:S,topBaseline:J+ge[0].baseline,blockBounds:[se,J-ee,se+fe,J],visibleBounds:W,timings:C})})}function o(g,x){a({...g,metricsOnly:!0},y=>{const[M,S,v,b]=y.blockBounds;x({width:v-M,height:b-S})})}function i(g){let x=g.match(/^([\d.]+)%$/),y=x?parseFloat(x[1]):NaN;return isNaN(y)?0:y/100}function f(g,x,y){const M=g[x*4],S=g[x*4+1],v=g[x*4+2],b=g[x*4+3],T=(S-M)/y;for(let A=0;A<y;A++){const j=(x+A)*4;g[j]=M+T*A,g[j+1]=M+T*(A+1),g[j+2]=v,g[j+3]=b}}function d(){return(self.performance||Date).now()}function h(){this.data=[]}const p=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/p.length)},glyphAt(g){let x=h.flyweight;return x.data=this.data,x.index=g,x},splitAt(g){let x=new h;return x.data=this.data.splice(g*p.length),x}},h.flyweight=p.reduce((g,x,y,M)=>(Object.defineProperty(g,x,{get(){return this.data[this.index*p.length+y]},set(S){this.data[this.index*p.length+y]=S}}),g),{data:null,index:0}),{typeset:a,measure:o}}const Pt=()=>(self.performance||Date).now(),qr=Wa();let la;function Ks(l,r,s,c,t,e,n,a,o,i,f=!0){return f?$s(l,r,s,c,t,e,n,a,o,i).then(null,d=>(la||(la=!0),fa(l,r,s,c,t,e,n,a,o,i))):fa(l,r,s,c,t,e,n,a,o,i)}const Nr=[],Js=5;let En=0;function Ha(){const l=Pt();for(;Nr.length&&Pt()-l<Js;)Nr.shift()();En=Nr.length?setTimeout(Ha,0):0}const $s=(...l)=>new Promise((r,s)=>{Nr.push(()=>{const c=Pt();try{qr.webgl.generateIntoCanvas(...l),r({timing:Pt()-c})}catch(t){s(t)}}),En||(En=setTimeout(Ha,0))}),el=4,tl=2e3,ca={};let rl=0;function fa(l,r,s,c,t,e,n,a,o,i){const f="TroikaTextSDFGenerator_JS_"+rl++%el;let d=ca[f];return d||(d=ca[f]={workerModule:Xt({name:f,workerId:f,dependencies:[Wa,Pt],init(h,p){const g=h().javascript.generate;return function(...x){const y=p();return{textureData:g(...x),timing:p()-y}}},getTransferables(h){return[h.textureData.buffer]}}),requests:0,idleTimer:null}),d.requests++,clearTimeout(d.idleTimer),d.workerModule(l,r,s,c,t,e).then(({textureData:h,timing:p})=>{const g=Pt(),x=new Uint8Array(h.length*4);for(let y=0;y<h.length;y++)x[y*4+i]=h[y];return qr.webglUtils.renderImageData(n,x,a,o,l,r,1<<3-i),p+=Pt()-g,--d.requests===0&&(d.idleTimer=setTimeout(()=>{Es(f)},tl)),{timing:p}})}function nl(l){l._warm||(qr.webgl.isSupported(l),l._warm=!0)}const ol=qr.webglUtils.resizeWebGLCanvasWithoutClearing,dr={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},al=new Ce;function Bt(){return(self.performance||Date).now()}const ua=Object.create(null);function Va(l,r){l=ll({},l);const s=Bt(),c=[];if(l.font&&c.push({label:"user",src:cl(l.font)}),l.font=c,l.text=""+l.text,l.sdfGlyphSize=l.sdfGlyphSize||dr.sdfGlyphSize,l.unicodeFontsURL=l.unicodeFontsURL||dr.unicodeFontsURL,l.colorRanges!=null){let d={};for(let h in l.colorRanges)if(l.colorRanges.hasOwnProperty(h)){let p=l.colorRanges[h];typeof p!="number"&&(p=al.set(p).getHex()),d[h]=p}l.colorRanges=d}Object.freeze(l);const{textureWidth:t,sdfExponent:e}=dr,{sdfGlyphSize:n}=l,a=t/n*4;let o=ua[n];if(!o){const d=document.createElement("canvas");d.width=t,d.height=n*256/a,o=ua[n]={glyphCount:0,sdfGlyphSize:n,sdfCanvas:d,sdfTexture:new gi(d,void 0,void 0,void 0,ho,ho),contextLost:!1,glyphsByFont:new Map},o.sdfTexture.generateMipmaps=!1,il(o)}const{sdfTexture:i,sdfCanvas:f}=o;ul(l).then(d=>{const{glyphIds:h,glyphFontIndices:p,fontData:g,glyphPositions:x,fontSize:y,timings:M}=d,S=[],v=new Float32Array(h.length*4);let b=0,T=0;const A=Bt(),j=g.map(_=>{let F=o.glyphsByFont.get(_.src);return F||o.glyphsByFont.set(_.src,F=new Map),F});h.forEach((_,F)=>{const E=p[F],{src:Y,unitsPerEm:V}=g[E];let Z=j[E].get(_);if(!Z){const{path:k,pathBounds:C}=d.glyphData[Y][_],I=Math.max(C[2]-C[0],C[3]-C[1])/n*(dr.sdfMargin*n+.5),P=o.glyphCount++,X=[C[0]-I,C[1]-I,C[2]+I,C[3]+I];j[E].set(_,Z={path:k,atlasIndex:P,sdfViewBox:X}),S.push(Z)}const{sdfViewBox:ie}=Z,N=x[T++],z=x[T++],w=y/V;v[b++]=N+ie[0]*w,v[b++]=z+ie[1]*w,v[b++]=N+ie[2]*w,v[b++]=z+ie[3]*w,h[F]=Z.atlasIndex}),M.quads=(M.quads||0)+(Bt()-A);const R=Bt();M.sdf={};const U=f.height,L=Math.ceil(o.glyphCount/a),H=Math.pow(2,Math.ceil(Math.log2(L*n)));H>U&&(ol(f,t,H),i.dispose()),Promise.all(S.map(_=>Xa(_,o,l.gpuAccelerateSDF).then(({timing:F})=>{M.sdf[_.atlasIndex]=F}))).then(()=>{S.length&&!o.contextLost&&(Ya(o),i.needsUpdate=!0),M.sdfTotal=Bt()-R,M.total=Bt()-s,r(Object.freeze({parameters:l,sdfTexture:i,sdfGlyphSize:n,sdfExponent:e,glyphBounds:v,glyphAtlasIndices:h,glyphColors:d.glyphColors,caretPositions:d.caretPositions,chunkedBounds:d.chunkedBounds,ascender:d.ascender,descender:d.descender,lineHeight:d.lineHeight,capHeight:d.capHeight,xHeight:d.xHeight,topBaseline:d.topBaseline,blockBounds:d.blockBounds,visibleBounds:d.visibleBounds,timings:d.timings}))})}),Promise.resolve().then(()=>{o.contextLost||nl(f)})}function Xa({path:l,atlasIndex:r,sdfViewBox:s},{sdfGlyphSize:c,sdfCanvas:t,contextLost:e},n){if(e)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:o}=dr,i=Math.max(s[2]-s[0],s[3]-s[1]),f=Math.floor(r/4),d=f%(a/c)*c,h=Math.floor(f/(a/c))*c,p=r%4;return Ks(c,c,l,s,i,o,t,d,h,p,n)}function il(l){const r=l.sdfCanvas;r.addEventListener("webglcontextlost",s=>{s.preventDefault(),l.contextLost=!0}),r.addEventListener("webglcontextrestored",s=>{l.contextLost=!1;const c=[];l.glyphsByFont.forEach(t=>{t.forEach(e=>{c.push(Xa(e,l,!0))})}),Promise.all(c).then(()=>{Ya(l),l.sdfTexture.needsUpdate=!0})})}function sl({font:l,characters:r,sdfGlyphSize:s},c){let t=Array.isArray(r)?r.join(`
`):""+r;Va({font:l,sdfGlyphSize:s,text:t},c)}function ll(l,r){for(let s in r)r.hasOwnProperty(s)&&(l[s]=r[s]);return l}let Ir;function cl(l){return Ir||(Ir=typeof document>"u"?{}:document.createElement("a")),Ir.href=l,Ir.href}function Ya(l){if(typeof createImageBitmap!="function"){const{sdfCanvas:r,sdfTexture:s}=l,{width:c,height:t}=r,e=l.sdfCanvas.getContext("webgl");let n=s.image.data;(!n||n.length!==c*t*4)&&(n=new Uint8Array(c*t*4),s.image={width:c,height:t,data:n},s.flipY=!1,s.isDataTexture=!0),e.readPixels(0,0,c,t,e.RGBA,e.UNSIGNED_BYTE,n)}}const fl=Xt({name:"Typesetter",dependencies:[Qs,Zs,Fs],init(l,r,s){return l(r,s())}}),ul=Xt({name:"Typesetter",dependencies:[fl],init(l){return function(r){return new Promise(s=>{l.typeset(r,s)})}},getTransferables(l){const r=[];for(let s in l)l[s]&&l[s].buffer&&r.push(l[s].buffer);return r}}),da={};function dl(l){let r=da[l];if(!r){const s=new Yr(1,1,l,l),c=s.clone(),t=s.attributes,e=c.attributes,n=new xi,a=t.uv.count;for(let o=0;o<a;o++)e.position.array[o*3]*=-1,e.normal.array[o*3+2]*=-1;["position","normal","uv"].forEach(o=>{n.setAttribute(o,new _n([...t[o].array,...e[o].array],t[o].itemSize))}),n.setIndex([...s.index.array,...c.index.array.map(o=>o+a)]),n.translate(.5,.5,0),r=da[l]=n}return r}const hl="aTroikaGlyphBounds",ha="aTroikaGlyphIndex",pl="aTroikaGlyphColor";class ml extends Aa{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new In,this.boundingBox=new Xr}computeBoundingSphere(){}computeBoundingBox(){}setSide(r){const s=this.getIndex().count;this.setDrawRange(r===Ge?s/2:0,r===et?s:s/2)}set detail(r){if(r!==this._detail){this._detail=r,(typeof r!="number"||r<1)&&(r=1);let s=dl(r);["position","normal","uv"].forEach(c=>{this.attributes[c]=s.attributes[c].clone()}),this.setIndex(s.getIndex().clone())}}get detail(){return this._detail}set curveRadius(r){r!==this._curveRadius&&(this._curveRadius=r,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(r,s,c,t,e){bn(this,hl,r,4),bn(this,ha,s,1),bn(this,pl,e,3),this._blockBounds=c,this._chunkedBounds=t,this.instanceCount=s.length,this._updateBounds()}_updateBounds(){const r=this._blockBounds;if(r){const{curveRadius:s,boundingBox:c}=this;if(s){const{PI:t,floor:e,min:n,max:a,sin:o,cos:i}=Math,f=t/2,d=t*2,h=Math.abs(s),p=r[0]/h,g=r[2]/h,x=e((p+f)/d)!==e((g+f)/d)?-h:n(o(p)*h,o(g)*h),y=e((p-f)/d)!==e((g-f)/d)?h:a(o(p)*h,o(g)*h),M=e((p+t)/d)!==e((g+t)/d)?h*2:a(h-i(p)*h,h-i(g)*h);c.min.set(x,r[1],s<0?-M:0),c.max.set(y,r[3],s<0?0:M)}else c.min.set(r[0],r[1],0),c.max.set(r[2],r[3],0);c.getBoundingSphere(this.boundingSphere)}}applyClipRect(r){let s=this.getAttribute(ha).count,c=this._chunkedBounds;if(c)for(let t=c.length;t--;){s=c[t].end;let e=c[t].rect;if(e[1]<r.w&&e[3]>r.y&&e[0]<r.z&&e[2]>r.x)break}this.instanceCount=s}}function bn(l,r,s,c){const t=l.getAttribute(r);s?t&&t.array.length===s.length?(t.array.set(s),t.needsUpdate=!0):(l.setAttribute(r,new wi(s,c)),delete l._maxInstanceCount,l.dispose()):t&&l.deleteAttribute(r)}const vl=`
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
`,gl=`
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
`,yl=`
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
`,xl=`
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
`;function wl(l){const r=Pn(l,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new mt},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new nt(0,0,0,0)},uTroikaClipRect:{value:new nt(0,0,0,0)},uTroikaDistanceOffset:{value:0},uTroikaOutlineOpacity:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new mt},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new Ce},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new yi},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:vl,vertexTransform:gl,fragmentDefs:yl,fragmentColorTransform:xl,customRewriter({vertexShader:s,fragmentShader:c}){let t=/\buniform\s+vec3\s+diffuse\b/;return t.test(c)&&(c=c.replace(t,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),t.test(s)||(s=s.replace(Na,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:s,fragmentShader:c}}});return r.transparent=!0,Object.defineProperties(r,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),r}const Bn=new vi({color:16777215,side:et,transparent:!0}),pa=8421504,ma=new xt,zr=new ve,Mn=new ve,cr=[],bl=new ve,Sn="+x+y";function va(l){return Array.isArray(l)?l[0]:l}let qa=()=>{const l=new gr(new Yr(1,1),Bn);return qa=()=>l,l},Za=()=>{const l=new gr(new Yr(1,1,32,1),Bn);return Za=()=>l,l};const Ml={type:"syncstart"},Sl={type:"synccomplete"},Qa=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],_l=Qa.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");let Ka=class extends gr{constructor(){const r=new ml;super(r,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=pa,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=Sn,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(r){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(r):(this._isSyncing=!0,this.dispatchEvent(Ml),Va({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},s=>{this._isSyncing=!1,this._textRenderInfo=s,this.geometry.updateGlyphs(s.glyphBounds,s.glyphAtlasIndices,s.blockBounds,s.chunkedBounds,s.glyphColors);const c=this._queuedSyncs;c&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{c.forEach(t=>t&&t())})),this.dispatchEvent(Sl),r&&r()})))}onBeforeRender(r,s,c,t,e,n){this.sync(),e.isTroikaTextMaterial&&this._prepareForRender(e),e._hadOwnSide=e.hasOwnProperty("side"),this.geometry.setSide(e._actualSide=e.side),e.side=mi}onAfterRender(r,s,c,t,e,n){e._hadOwnSide?e.side=e._actualSide:delete e.side}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}get material(){let r=this._derivedMaterial;const s=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Bn.clone());if((!r||r.baseMaterial!==s)&&(r=this._derivedMaterial=wl(s),s.addEventListener("dispose",function c(){s.removeEventListener("dispose",c),r.dispose()})),this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY){let c=r._outlineMtl;return c||(c=r._outlineMtl=Object.create(r,{id:{value:r.id+.1}}),c.isTextOutlineMaterial=!0,c.depthWrite=!1,c.map=null,r.addEventListener("dispose",function t(){r.removeEventListener("dispose",t),c.dispose()})),[c,r]}else return r}set material(r){r&&r.isTroikaTextMaterial?(this._derivedMaterial=r,this._baseMaterial=r.baseMaterial):this._baseMaterial=r}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(r){this.geometry.detail=r}get curveRadius(){return this.geometry.curveRadius}set curveRadius(r){this.geometry.curveRadius=r}get customDepthMaterial(){return va(this.material).getDepthMaterial()}get customDistanceMaterial(){return va(this.material).getDistanceMaterial()}_prepareForRender(r){const s=r.isTextOutlineMaterial,c=r.uniforms,t=this.textRenderInfo;if(t){const{sdfTexture:a,blockBounds:o}=t;c.uTroikaSDFTexture.value=a,c.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),c.uTroikaSDFGlyphSize.value=t.sdfGlyphSize,c.uTroikaSDFExponent.value=t.sdfExponent,c.uTroikaTotalBounds.value.fromArray(o),c.uTroikaUseGlyphColors.value=!s&&!!t.glyphColors;let i=0,f=0,d=0,h,p,g,x=0,y=0;if(s){let{outlineWidth:S,outlineOffsetX:v,outlineOffsetY:b,outlineBlur:T,outlineOpacity:A}=this;i=this._parsePercent(S)||0,f=Math.max(0,this._parsePercent(T)||0),h=A,x=this._parsePercent(v)||0,y=this._parsePercent(b)||0}else d=Math.max(0,this._parsePercent(this.strokeWidth)||0),d&&(g=this.strokeColor,c.uTroikaStrokeColor.value.set(g??pa),p=this.strokeOpacity,p==null&&(p=1)),h=this.fillOpacity;c.uTroikaDistanceOffset.value=i,c.uTroikaPositionOffset.value.set(x,y),c.uTroikaBlurRadius.value=f,c.uTroikaStrokeWidth.value=d,c.uTroikaStrokeOpacity.value=p,c.uTroikaFillOpacity.value=h??1,c.uTroikaCurveRadius.value=this.curveRadius||0;let M=this.clipRect;if(M&&Array.isArray(M)&&M.length===4)c.uTroikaClipRect.value.fromArray(M);else{const S=(this.fontSize||.1)*100;c.uTroikaClipRect.value.set(o[0]-S,o[1]-S,o[2]+S,o[3]+S)}this.geometry.applyClipRect(c.uTroikaClipRect.value)}c.uTroikaSDFDebug.value=!!this.debugSDF,r.polygonOffset=!!this.depthOffset,r.polygonOffsetFactor=r.polygonOffsetUnits=this.depthOffset||0;const e=s?this.outlineColor||0:this.color;if(e==null)delete r.color;else{const a=r.hasOwnProperty("color")?r.color:r.color=new Ce;(e!==a._input||typeof e=="object")&&a.set(a._input=e)}let n=this.orientation||Sn;if(n!==r._orientation){let a=c.uTroikaOrient.value;n=n.replace(/[^-+xyz]/g,"");let o=n!==Sn&&n.match(/^([-+])([xyz])([-+])([xyz])$/);if(o){let[,i,f,d,h]=o;zr.set(0,0,0)[f]=i==="-"?1:-1,Mn.set(0,0,0)[h]=d==="-"?-1:1,ma.lookAt(bl,zr.cross(Mn),Mn),a.setFromMatrix4(ma)}else a.identity();r._orientation=n}}_parsePercent(r){if(typeof r=="string"){let s=r.match(/^(-?[\d.]+)%$/),c=s?parseFloat(s[1]):NaN;r=(isNaN(c)?0:c/100)*this.fontSize}return r}localPositionToTextCoords(r,s=new mt){s.copy(r);const c=this.curveRadius;return c&&(s.x=Math.atan2(r.x,Math.abs(c)-Math.abs(r.z))*Math.abs(c)),s}worldPositionToTextCoords(r,s=new mt){return zr.copy(r),this.localPositionToTextCoords(this.worldToLocal(zr),s)}raycast(r,s){const{textRenderInfo:c,curveRadius:t}=this;if(c){const e=c.blockBounds,n=t?Za():qa(),a=n.geometry,{position:o,uv:i}=a.attributes;for(let f=0;f<i.count;f++){let d=e[0]+i.getX(f)*(e[2]-e[0]);const h=e[1]+i.getY(f)*(e[3]-e[1]);let p=0;t&&(p=t-Math.cos(d/t)*t,d=Math.sin(d/t)*t),o.setXYZ(f,d,h,p)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,n.matrixWorld=this.matrixWorld,n.material.side=this.material.side,cr.length=0,n.raycast(r,cr);for(let f=0;f<cr.length;f++)cr[f].object=this,s.push(cr[f])}}copy(r){const s=this.geometry;return super.copy(r),this.geometry=s,_l.forEach(c=>{this[c]=r[c]}),this}clone(){return new this.constructor().copy(this)}};Qa.forEach(l=>{const r="_private_"+l;Object.defineProperty(Ka.prototype,l,{get(){return this[r]},set(s){s!==this[r]&&(this[r]=s,this._needsSync=!0)}})});const Fe=m.forwardRef(({sdfGlyphSize:l=64,anchorX:r="center",anchorY:s="middle",font:c,fontSize:t=1,children:e,characters:n,onSync:a,...o},i)=>{const f=Vt(({invalidate:g})=>g),[d]=m.useState(()=>new Ka),[h,p]=m.useMemo(()=>{const g=[];let x="";return m.Children.forEach(e,y=>{typeof y=="string"||typeof y=="number"?x+=y:g.push(y)}),[g,x]},[e]);return bi(()=>new Promise(g=>sl({font:c,characters:n},g)),["troika-text",c,n]),m.useLayoutEffect(()=>void d.sync(()=>{f(),a&&a(d)})),m.useEffect(()=>()=>d.dispose(),[d]),m.createElement("primitive",pt({object:d,ref:i,font:c,text:p,anchorX:r,anchorY:s,fontSize:t,sdfGlyphSize:l},o),h)}),ga=(l,r)=>{"updateRanges"in l?l.updateRanges[0]=r:l.updateRange=r};function Tl(l){return typeof l=="function"}const ya=new xt,xa=new xt,Dr=[],fr=new gr;class kl extends Si{constructor(){super(),this.color=new Ce("white"),this.instance={current:void 0},this.instanceKey={current:void 0}}get geometry(){var r;return(r=this.instance.current)==null?void 0:r.geometry}raycast(r,s){const c=this.instance.current;if(!c||!c.geometry||!c.material)return;fr.geometry=c.geometry;const t=c.matrixWorld,e=c.userData.instances.indexOf(this.instanceKey);if(!(e===-1||e>c.count)){c.getMatrixAt(e,ya),xa.multiplyMatrices(t,ya),fr.matrixWorld=xa,c.material instanceof _i?fr.material.side=c.material.side:fr.material.side=c.material[0].side,fr.raycast(r,Dr);for(let n=0,a=Dr.length;n<a;n++){const o=Dr[n];o.instanceId=e,o.object=this,s.push(o)}Dr.length=0}}}const Ja=m.createContext(null),wa=new xt,ba=new xt,jl=new xt,Ma=new ve,Sa=new Tt,_a=new ve,Cl=l=>l.isInstancedBufferAttribute,$a=m.forwardRef(({context:l,children:r,...s},c)=>{m.useMemo(()=>Mi({PositionMesh:kl}),[]);const t=m.useRef();m.useImperativeHandle(c,()=>t.current,[]);const{subscribe:e,getParent:n}=m.useContext(l||Ja);return m.useLayoutEffect(()=>e(t),[]),m.createElement("positionMesh",pt({instance:n(),instanceKey:t,ref:t},s),r)}),Ul=m.forwardRef(({context:l,children:r,range:s,limit:c=1e3,frames:t=1/0,...e},n)=>{const[{localContext:a,instance:o}]=m.useState(()=>{const S=m.createContext(null);return{localContext:S,instance:m.forwardRef((v,b)=>m.createElement($a,pt({context:S},v,{ref:b})))}}),i=m.useRef(null);m.useImperativeHandle(n,()=>i.current,[]);const[f,d]=m.useState([]),[[h,p]]=m.useState(()=>{const S=new Float32Array(c*16);for(let v=0;v<c;v++)jl.identity().toArray(S,v*16);return[S,new Float32Array([...new Array(c*3)].map(()=>1))]});m.useEffect(()=>{i.current.instanceMatrix.needsUpdate=!0});let g=0,x=0;const y=m.useRef([]);m.useLayoutEffect(()=>{y.current=Object.entries(i.current.geometry.attributes).filter(([S,v])=>Cl(v))}),de(()=>{if(t===1/0||g<t){i.current.updateMatrix(),i.current.updateMatrixWorld(),wa.copy(i.current.matrixWorld).invert(),x=Math.min(c,s!==void 0?s:c,f.length),i.current.count=x,ga(i.current.instanceMatrix,{offset:0,count:x*16}),ga(i.current.instanceColor,{offset:0,count:x*3});for(let S=0;S<f.length;S++){const v=f[S].current;v.matrixWorld.decompose(Ma,Sa,_a),ba.compose(Ma,Sa,_a).premultiply(wa),ba.toArray(h,S*16),i.current.instanceMatrix.needsUpdate=!0,v.color.toArray(p,S*3),i.current.instanceColor.needsUpdate=!0}g++}});const M=m.useMemo(()=>({getParent:()=>i,subscribe:S=>(d(v=>[...v,S]),()=>d(v=>v.filter(b=>b.current!==S.current)))}),[]);return m.createElement("instancedMesh",pt({userData:{instances:f,limit:c,frames:t},matrixAutoUpdate:!1,ref:i,args:[null,null,0],raycast:()=>null},e),m.createElement("instancedBufferAttribute",{attach:"instanceMatrix",count:h.length/16,array:h,itemSize:16,usage:po}),m.createElement("instancedBufferAttribute",{attach:"instanceColor",count:p.length/3,array:p,itemSize:3,usage:po}),Tl(r)?m.createElement(a.Provider,{value:M},r(o)):l?m.createElement(l.Provider,{value:M},r):m.createElement(Ja.Provider,{value:M},r))}),Lt=m.forwardRef(({children:l,enabled:r=!0,speed:s=1,rotationIntensity:c=1,floatIntensity:t=1,floatingRange:e=[-.1,.1],autoInvalidate:n=!1,...a},o)=>{const i=m.useRef(null);m.useImperativeHandle(o,()=>i.current,[]);const f=m.useRef(Math.random()*1e4);return de(d=>{var h,p;if(!r||s===0)return;n&&d.invalidate();const g=f.current+d.clock.getElapsedTime();i.current.rotation.x=Math.cos(g/4*s)/8*c,i.current.rotation.y=Math.sin(g/4*s)/8*c,i.current.rotation.z=Math.sin(g/4*s)/20*c;let x=Math.sin(g/4*s)/10;x=Ve.mapLinear(x,-.1,.1,(h=e==null?void 0:e[0])!==null&&h!==void 0?h:-.1,(p=e==null?void 0:e[1])!==null&&p!==void 0?p:.1),i.current.position.y=x*t,i.current.updateMatrix()}),m.createElement("group",a,m.createElement("group",{ref:i,matrixAutoUpdate:!1},l))});class Al extends Ra{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${Ti>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const Rl=l=>new ve().setFromSpherical(new Ua(l,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),Pl=m.forwardRef(({radius:l=100,depth:r=50,count:s=5e3,saturation:c=0,factor:t=4,fade:e=!1,speed:n=1},a)=>{const o=m.useRef(),[i,f,d]=m.useMemo(()=>{const p=[],g=[],x=Array.from({length:s},()=>(.5+.5*Math.random())*t),y=new Ce;let M=l+r;const S=r/s;for(let v=0;v<s;v++)M-=S*Math.random(),p.push(...Rl(M).toArray()),y.setHSL(v/s,c,.9),g.push(y.r,y.g,y.b);return[new Float32Array(p),new Float32Array(g),new Float32Array(x)]},[s,r,t,l,c]);de(p=>o.current&&(o.current.uniforms.time.value=p.clock.getElapsedTime()*n));const[h]=m.useState(()=>new Al);return m.createElement("points",{ref:a},m.createElement("bufferGeometry",null,m.createElement("bufferAttribute",{attach:"attributes-position",args:[i,3]}),m.createElement("bufferAttribute",{attach:"attributes-color",args:[f,3]}),m.createElement("bufferAttribute",{attach:"attributes-size",args:[d,1]})),m.createElement("primitive",{ref:o,object:h,attach:"material",blending:Ue,"uniforms-fade-value":e,depthWrite:!1,transparent:!0,vertexColors:!0}))}),El=({position:l})=>{const r=m.useRef();Xe();const[s,c]=m.useState(null);return m.useEffect(()=>{new Je().load("/assets/images/digital_fire.jpg",t=>{t.colorSpace=tt,c(t)})},[]),de(t=>{if(r.current){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9;const n=1+Math.sin(t.clock.elapsedTime*5)*.1;r.current.scale.setScalar(n)}}),s?u.jsx("group",{position:l,children:u.jsx(Oa,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:u.jsxs("mesh",{ref:r,position:[0,20,0],children:[u.jsx("planeGeometry",{args:[40,40]}),u.jsx("meshBasicMaterial",{map:s,transparent:!0,opacity:0,depthWrite:!1,blending:Ue})]})})}):null},Ll=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Fl=`
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
`,Il=({position:l,angle:r,delay:s})=>{const c=m.useRef(),t=m.useRef();Xe();const e=m.useMemo(()=>({uState:{value:0},uTime:{value:0},uSeed:{value:Math.random()},uIsolatedColor:{value:new Ce("#44aaff")},uPartyColor:{value:new Ce("#ff8844")}}),[]);return de(n=>{if(!c.current||!t.current)return;e.uTime.value=n.clock.elapsedTime;const a=window.icebreakerThaw||0,o=Ve.clamp((a-s)*2,0,1);e.uState.value=o;const i=Math.sin(n.clock.elapsedTime*8+s*10)*o;if(c.current.position.y=l[1]+(i>0?i*2:0)+15,o>0){const f=0-l[0],d=0-(l[2]- -200),h=Math.sqrt(f*f+d*d)||1;c.current.position.x=l[0]+f/h*(o*20),c.current.position.z=l[2]+d/h*(o*20)}else c.current.position.x=l[0],c.current.position.z=l[2]}),u.jsx("group",{ref:c,position:[l[0],l[1]+15,l[2]],children:u.jsx(Oa,{follow:!0,lockX:!1,lockY:!1,lockZ:!1,children:u.jsxs("mesh",{children:[u.jsx("planeGeometry",{args:[20,30]}),u.jsx("shaderMaterial",{ref:t,vertexShader:Ll,fragmentShader:Fl,uniforms:e,transparent:!0,side:et,depthWrite:!1})]})})})},zl=({position:l})=>{const s=m.useMemo(()=>{const c=[];for(let t=0;t<60;t++){const e=Math.random()*Math.PI*2,n=30+Math.random()*80;c.push({position:[l[0]+Math.cos(e)*n,l[1],l[2]+Math.sin(e)*n],angle:e,delay:Math.random()*.5})}return c},[60,l]);return u.jsx("group",{children:s.map((c,t)=>u.jsx(Il,{...c},t))})},Ta={legaleagle:"Legal Eagle is an intelligent AI legal assistant that scans and processes legal documents at superhuman speeds, generating bulletproof contracts while actively highlighting hidden loopholes.",icebreaker:"Icebreaker is a real-world, location-based social platform that acts as an AI-driven outreach tool, generating highly personalized context-aware messages to thaw cold leads and spark genuine connections anywhere.",mindwave:"MindWave is an AI-powered thought interface and content creation engine that analyzes market trends and turns raw thoughts into optimized, actionable reality instantly.",interstellar:"Interstellar is a massive global data pipeline visualized as a space conquest strategy game, connecting disparate data sources into a unified, high-speed neural network spanning the globe.",orbital:"Orbital Command is the central dashboard and strategic command center for all autonomous agents, providing a god's-eye view to coordinate your entire digital operation.",droneswarm:"Drone Swarm is a highly-parallelized execution layer that deploys thousands of micro-agents to scour the web, track competitors, and harvest data opportunities in real-time.",autopilot:"Autopilot is a set-and-forget autonomous marketing agent. By providing a goal and a budget, it dynamically manages, optimizes, and executes complex social media campaigns without human intervention.",cloveh2o:"CloveH2O is a sustainable data analytics and efficiency tracker—visualized as an ocean of pure, refreshing data—ensuring your digital footprint is clean and resources are managed fluidly.",fantasyquant:"Fantasy Quant is a gamified analytics platform that blends the mechanics of a competitive fantasy sports arena with quantitative finance, allowing users to backtest and deploy trading models with ease.",contango:"Contango Quant is an institutional-grade quantitative finance platform providing deep architectural insights into market structures, uncovering the fundamental 'physics of finance' to build robust strategies.",sentaient:"Sentaient is the overarching AI parent company, conversion hub, and core neural network that powers, connects, and unifies all of these diverse applications into a single ecosystem."},lt=({appId:l="sentaient",position:r=[0,0,0]})=>{const[s,c]=m.useState(!1),[t,e]=m.useState([]),[n,a]=m.useState(""),[o,i]=m.useState(!1),[f,d]=m.useState(!0),h=m.useRef(null),p=m.useRef();de(y=>{p.current&&!s&&p.current.scale.setScalar(1+Math.sin(y.clock.elapsedTime*3)*.1)}),m.useEffect(()=>{if(s&&t.length===0){const y=`Welcome. I am the guide for ${l.toUpperCase()}. How can I assist you today?`;if(e([{role:"ai",text:y}]),f&&window.speechSynthesis){window.speechSynthesis.cancel();const M=new SpeechSynthesisUtterance(y);M.rate=.9,M.pitch=1.1,window.speechSynthesis.speak(M)}}},[s,l,t.length,f]),m.useEffect(()=>{h.current&&(h.current.scrollTop=h.current.scrollHeight)},[t]);const g=y=>{if(y.preventDefault(),!n.trim())return;const M=[...t,{role:"user",text:n}];e(M),a(""),i(!0),setTimeout(()=>{let S=Ta[l]||Ta.sentaient;const v=n.toLowerCase();if(v.includes("hello")||v.includes("hi")?S="Hello! "+S:(v.includes("voicebox")||v.includes("voice"))&&(S="My voice modules via Voicebox are active. I can speak to you directly!"),e([...M,{role:"ai",text:S}]),i(!1),f&&window.speechSynthesis){window.speechSynthesis.cancel();const b=new SpeechSynthesisUtterance(S);b.rate=.9,b.pitch=1.1,window.speechSynthesis.speak(b)}},1500)},x=()=>{c(!1),window.speechSynthesis&&window.speechSynthesis.cancel()};return u.jsxs("group",{position:r,children:[!s&&u.jsxs(Lt,{speed:4,rotationIntensity:.5,floatIntensity:2,children:[u.jsxs("mesh",{ref:p,onClick:()=>c(!0),onPointerOver:()=>document.body.style.cursor="pointer",onPointerOut:()=>document.body.style.cursor="auto",children:[u.jsx("sphereGeometry",{args:[40,32,32]}),u.jsx("meshPhysicalMaterial",{color:"#00ffff",emissive:"#0088ff",emissiveIntensity:2,transparent:!0,opacity:.8,roughness:.1,metalness:.9})]}),u.jsx(Fe,{position:[0,-60,0],fontSize:20,color:"#00ffff",outlineWidth:1,outlineColor:"#004488",children:"Click to Ask Questions"})]}),s&&u.jsx(Vi,{transform:!0,wrapperClass:"hologram-wrapper",distanceFactor:1.5,position:[0,0,0],style:{transition:"all 0.5s"},children:u.jsxs("div",{style:{width:"400px",height:"500px",background:"rgba(0, 20, 40, 0.65)",backdropFilter:"blur(12px)",border:"1px solid rgba(0, 255, 255, 0.4)",boxShadow:"0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.1)",borderRadius:"16px",display:"flex",flexDirection:"column",color:"#fff",fontFamily:'"Roboto", "Inter", sans-serif',overflow:"hidden",pointerEvents:"auto"},children:[u.jsxs("div",{style:{padding:"16px",borderBottom:"1px solid rgba(0, 255, 255, 0.2)",display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(90deg, rgba(0,255,255,0.1) 0%, rgba(0,0,0,0) 100%)"},children:[u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[u.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"50%",background:"#00ffff",boxShadow:"0 0 10px #00ffff"}}),u.jsxs("h3",{style:{margin:0,fontSize:"18px",fontWeight:"500",color:"#00ffff",letterSpacing:"1px"},children:[l.toUpperCase()," GUIDE"]})]}),u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:[u.jsx("button",{onClick:y=>{y.stopPropagation(),d(!f),f&&window.speechSynthesis&&window.speechSynthesis.cancel()},style:{background:"none",border:`1px solid ${f?"#00ffff":"rgba(255,255,255,0.3)"}`,color:f?"#00ffff":"rgba(255,255,255,0.5)",padding:"4px 8px",borderRadius:"4px",cursor:"pointer",fontSize:"12px"},children:f?"🎤 Voice ON":"🔇 Voice OFF"}),u.jsx("button",{onClick:x,style:{background:"none",border:"none",color:"#fff",fontSize:"24px",cursor:"pointer",opacity:.7},children:"×"})]})]}),u.jsxs("div",{ref:h,style:{flex:1,padding:"20px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"16px",scrollbarWidth:"thin",scrollbarColor:"rgba(0, 255, 255, 0.5) transparent"},children:[t.map((y,M)=>u.jsx("div",{style:{alignSelf:y.role==="user"?"flex-end":"flex-start",maxWidth:"80%",background:y.role==="user"?"rgba(0, 255, 255, 0.15)":"rgba(255, 255, 255, 0.05)",border:`1px solid ${y.role==="user"?"rgba(0, 255, 255, 0.4)":"rgba(255, 255, 255, 0.1)"}`,padding:"12px 16px",borderRadius:y.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",fontSize:"15px",lineHeight:"1.5"},children:y.text},M)),o&&u.jsx("div",{style:{alignSelf:"flex-start",padding:"12px 16px",background:"rgba(255, 255, 255, 0.05)",borderRadius:"16px",color:"#00ffff"},children:"Analyzing..."})]}),u.jsxs("form",{onSubmit:g,style:{padding:"16px",borderTop:"1px solid rgba(0, 255, 255, 0.2)",display:"flex",gap:"10px"},children:[u.jsx("input",{type:"text",value:n,onChange:y=>a(y.target.value),placeholder:"Ask a question...",style:{flex:1,background:"rgba(0, 0, 0, 0.3)",border:"1px solid rgba(0, 255, 255, 0.3)",padding:"12px",borderRadius:"8px",color:"#fff",outline:"none",fontSize:"15px"}}),u.jsx("button",{type:"submit",style:{background:"rgba(0, 255, 255, 0.2)",border:"1px solid #00ffff",color:"#00ffff",padding:"0 20px",borderRadius:"8px",cursor:"pointer",fontWeight:"bold",textTransform:"uppercase",letterSpacing:"1px"},children:"Send"})]})]})})]})},Dl=({position:l})=>{const r=m.useRef(),[s,c]=m.useState(null);return Xe(),m.useEffect(()=>{new Je().load("/icebreaker_logo.png",t=>{t.colorSpace=tt,c(t)})},[]),de(t=>{if(r.current&&(r.current.rotation.y=t.clock.elapsedTime*.5,r.current.position.y=l[1]+Math.sin(t.clock.elapsedTime*2)*5,r.current.material)){const e=window.icebreakerThaw||0;r.current.material.opacity=e*.9,r.current.scale.setScalar(.01+e)}}),s?u.jsxs("mesh",{ref:r,position:l,children:[u.jsx("planeGeometry",{args:[40,40]}),u.jsx("meshBasicMaterial",{map:s,transparent:!0,opacity:0,depthWrite:!1,blending:Ue,side:et})]}):null},Gl=({numTrees:l=30,radius:r=50,centerZ:s=-500})=>{const c=m.useRef(),t=m.useRef();Xe();const e=m.useMemo(()=>new Et,[]),n=m.useMemo(()=>{const a=[];for(let o=0;o<l;o++){const i=o/l*Math.PI*2+Math.random()*.5,f=r+Math.random()*20;a.push({position:new ve(Math.cos(i)*f,-18,Math.sin(i)*f+s),rotation:new Fn(0,i+Math.PI/2,Math.random()*.2),scale:.5+Math.random()*.5,delay:Math.random()*.5})}return a},[l,r,s]);return de(()=>{if(!c.current||!t.current)return;const a=window.icebreakerThaw||0;for(let o=0;o<l;o++){const i=n[o],f=Math.max(0,(a-i.delay)*2),d=Ve.clamp(f,0,1)*i.scale;e.position.copy(i.position),e.rotation.copy(i.rotation),e.scale.setScalar(d),e.updateMatrix(),c.current.setMatrixAt(o,e.matrix),e.position.y+=18*d,e.updateMatrix(),t.current.setMatrixAt(o,e.matrix)}c.current.instanceMatrix.needsUpdate=!0,t.current.instanceMatrix.needsUpdate=!0}),u.jsxs("group",{children:[u.jsxs("instancedMesh",{ref:c,args:[null,null,l],children:[u.jsx("cylinderGeometry",{args:[.5,1,20,8]}),u.jsx("meshStandardMaterial",{color:"#8B4513",roughness:.9})]}),u.jsxs("instancedMesh",{ref:t,args:[null,null,l],children:[u.jsx("sphereGeometry",{args:[8,4,4]}),u.jsx("meshStandardMaterial",{color:"#228B22",roughness:.8})]})]})},Ol=`
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
`,Bl=`
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
`,Wl=({startZ:l,endZ:r})=>{const s=m.useRef(),c=m.useRef(),[t,e]=m.useState(null),n=Math.abs(r-l),a=(l+r)/2,o=m.useMemo(()=>({tMap:{value:null},uThaw:{value:0},uTime:{value:0}}),[]);return m.useEffect(()=>{new Je().load("/assets/images/ice_cavern.jpg",i=>{i.wrapS=vr,i.wrapT=vr,i.repeat.set(4,2),i.colorSpace=tt,e(i),o.tMap.value=i})},[o]),de(i=>{if(c.current){const f=window.icebreakerThaw||0;o.uThaw.value=f,o.uTime.value=i.clock.elapsedTime}}),t?u.jsxs("mesh",{ref:s,position:[0,0,a],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[120,120,n,128,128,!0]}),u.jsx("shaderMaterial",{ref:c,vertexShader:Ol,fragmentShader:Bl,uniforms:o,transparent:!0,side:Ge})]}):null},Nl=({position:l})=>{const r=m.useRef();return de(s=>{if(r.current){const c=window.icebreakerThaw||0,t=Ve.lerp(.01,50,Math.pow(c,2));r.current.scale.setScalar(t),r.current.visible=c>0}}),u.jsxs("mesh",{ref:r,position:[l[0],l[1]+1,l[2]],rotation:[-Math.PI/2,0,0],children:[u.jsx("circleGeometry",{args:[20,64]}),u.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ff66",emissiveIntensity:.5,roughness:.1,metalness:.2})]})},Hl=({position:l})=>{const r=m.useRef();return de(s=>{if(r.current){const c=window.icebreakerThaw||0;r.current.scale.setScalar(c>0?1:.001)}}),u.jsxs("mesh",{ref:r,position:[l[0],l[1]+1.5,l[2]],rotation:[-Math.PI/2,0,0],children:[u.jsx("circleGeometry",{args:[96,64]}),u.jsx("meshStandardMaterial",{color:"#e5d0a1",roughness:.9})]})},Vl=({position:l})=>{const r=m.useRef();return de(()=>{if(r.current){const s=window.icebreakerThaw||0;r.current.opacity=1-Math.pow(s,2),r.current.transparent=!0}}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:l,children:[u.jsx("planeGeometry",{args:[1e3,3e3]}),u.jsx("meshStandardMaterial",{ref:r,color:"#001133",roughness:.1,metalness:.8})]})},Xl=({centerZ:l})=>{const r=m.useRef(),s=m.useRef(),c=m.useMemo(()=>({uColorBottom:{value:new Ce("#ffaa55")},uColorTop:{value:new Ce("#00f3ff")},uOpacity:{value:0}}),[]);return de(()=>{const t=window.icebreakerThaw||0;r.current&&(r.current.uniforms.uOpacity.value=t),s.current&&(s.current.intensity=t*.6)}),u.jsxs("group",{children:[u.jsxs("mesh",{scale:2e3,children:[u.jsx("sphereGeometry",{args:[1,32,32]}),u.jsx("shaderMaterial",{ref:r,side:Ge,transparent:!0,depthWrite:!1,uniforms:c,vertexShader:`
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
          `})]}),u.jsx("directionalLight",{ref:s,position:[0,100,-2e3],color:"#ffaa55",intensity:0,castShadow:!0}),u.jsx("ambientLight",{intensity:.6,color:"#ffffff"})]})},Yl=()=>{const l=Xe(),[r,s]=m.useState(!1),[c,t]=m.useState(!1),[e,n]=m.useState(!1),a=m.useRef({triggered:!1,timer:0}),o=m.useRef({triggered:!1,timer:0});return m.useEffect(()=>{window.icebreakerThaw=0,window.icebreakerThawLocked=!1,window.icebreakerTextLocked=!1,window.icebreakerCaveLocked=!1},[]),de((i,f)=>{const d=l.offset;!o.current.triggered&&d>=.22&&(o.current.triggered=!0,n(!0),window.icebreakerCaveLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.22*(l.el.scrollHeight-l.el.clientHeight))),window.icebreakerCaveLocked&&(l.el&&(l.el.scrollTop=.22*(l.el.scrollHeight-l.el.clientHeight)),o.current.timer+=f,o.current.timer>1.5&&(window.icebreakerCaveLocked=!1,n(!1),l.el&&(l.el.style.overflow="auto"))),!r&&d>=.265&&window.icebreakerThaw<1&&(s(!0),window.icebreakerThawLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.27*(l.el.scrollHeight-l.el.clientHeight))),window.icebreakerThawLocked?(l.el&&(l.el.scrollTop=.27*(l.el.scrollHeight-l.el.clientHeight)),window.icebreakerThaw+=f*.15,window.icebreakerThaw>=1&&(window.icebreakerThaw=1,window.icebreakerThawLocked=!1,l.el&&!c&&(l.el.style.overflow="auto"),s(!1))):d<.2&&(window.icebreakerThaw=0),!a.current.triggered&&d>=.285&&window.icebreakerThaw>=1&&(a.current.triggered=!0,t(!0),window.icebreakerTextLocked=!0,l.el&&(l.el.style.overflow="hidden",l.el.scrollTop=.29*(l.el.scrollHeight-l.el.clientHeight))),window.icebreakerTextLocked&&(l.el&&(l.el.scrollTop=.29*(l.el.scrollHeight-l.el.clientHeight)),a.current.timer+=f,a.current.timer>1.5&&(window.icebreakerTextLocked=!1,t(!1),l.el&&(l.el.style.overflow="auto")))}),null},ql=({position:l,rotation:r,visible:s=!0})=>u.jsxs("group",{position:l,rotation:r,visible:s,children:[u.jsx(Yl,{}),u.jsx(Xl,{centerZ:0}),u.jsx(Wl,{startZ:1e3,endZ:-1e3}),u.jsx(Vl,{position:[0,-20,0]}),u.jsx(Nl,{position:[0,-20,0]}),u.jsx(Hl,{position:[0,-20,0]}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,60,-500],fontSize:25,color:"#ffffff",outlineWidth:.05,outlineColor:"#00ffff",children:"ICEBREAKER"}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,30,-500],fontSize:10,color:"#00ffff",children:"REAL CONTENT. REAL CONNECTIONS."}),u.jsx(El,{position:[0,-20,0]}),u.jsx(Dl,{position:[0,30,0]}),u.jsx(Gl,{radius:60,centerZ:0}),u.jsx(zl,{position:[0,-20,0]}),u.jsx(lt,{appId:"icebreaker",position:[-80,20,-200]})]}),Zl=`
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
`,Ql=`
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
`,Kl=`
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`,Jl=({position:l,visible:r})=>u.jsxs("group",{visible:r,position:l,children:[u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,40,0],fontSize:24,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"MINDWAVE"}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,20,0],fontSize:8,color:"#051024",outlineWidth:.02,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Intelligent Health & Wellness"}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,8,0],fontSize:6,color:"#0a1930",outlineWidth:.01,outlineColor:"#ffffff",anchorX:"center",anchorY:"middle",children:"Tune your frequency."})]}),$l=({position:l,visible:r})=>{const s=Xe(),c=m.useRef(),t=m.useRef(),e=m.useRef(),[n,a]=m.useState(null),[o,i]=m.useState(null),[f,d]=m.useState(!1),h=m.useRef({triggered:!1,timer:0});m.useEffect(()=>{window.mindwaveLocked=!1,new Je().load("/mindwave-logo.png",x=>{x.colorSpace=tt,a(x)}),new Je().load("/tribal-sun.png",x=>{x.colorSpace=tt,i(x)})},[]);const p=l?l[2]:0,g=m.useMemo(()=>({uTime:{value:0},uScrollProgress:{value:0}}),[]);return de((x,y)=>{if(!r)return;const M=s.offset;!h.current.triggered&&M>=.075&&(h.current.triggered=!0,d(!0),window.mindwaveLocked=!0,s.el&&(s.el.style.overflow="hidden",s.el.scrollTop=.08*(s.el.scrollHeight-s.el.clientHeight))),window.mindwaveLocked&&(s.el&&(s.el.scrollTop=.08*(s.el.scrollHeight-s.el.clientHeight)),h.current.timer+=y,h.current.timer>1.5&&(window.mindwaveLocked=!1,d(!1),s.el&&(s.el.style.overflow="auto")));const S=x.clock.elapsedTime;if(c.current){c.current.uniforms.uTime.value=S;const v=Math.abs(x.camera.position.z-p);let T=1-Math.min(v/1e3,1);T=Math.pow(T,2),c.current.uniforms.uScrollProgress.value=T}if(t.current){t.current.position.y=-7+Math.sin(S*2)*2;const v=1+Math.sin(S*4)*.05;t.current.scale.set(v,v,1),t.current.rotation.y=0}if(e.current){e.current.position.y=125+Math.sin(S*2)*2,e.current.rotation.z=S*.1;const v=1+Math.sin(S*3)*.05;e.current.scale.set(v,v,1)}}),u.jsxs("group",{visible:r,position:l,children:[u.jsxs("mesh",{rotation:[0,0,0],position:[0,0,0],children:[u.jsx("cylinderGeometry",{args:[800,800,4e3,64,1,!0]}),u.jsx("shaderMaterial",{vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:Kl,side:Ge,depthWrite:!1})]}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-50,0],children:[u.jsx("planeGeometry",{args:[2e3,4e3,128,128]}),u.jsx("shaderMaterial",{ref:c,vertexShader:Zl,fragmentShader:Ql,uniforms:g,transparent:!0,side:et,wireframe:!1})]}),o&&u.jsxs("mesh",{ref:e,position:[0,-10,-85],children:[u.jsx("planeGeometry",{args:[140,140]}),u.jsx("meshBasicMaterial",{map:o,transparent:!0,side:et,depthWrite:!1,blending:Ue,color:"#00ffff",opacity:.6})]}),n&&u.jsxs("mesh",{ref:t,position:[0,-10,-80],children:[u.jsx("planeGeometry",{args:[80,80]}),u.jsx("meshBasicMaterial",{map:n,transparent:!0,side:et,depthWrite:!1,blending:Ue})]}),u.jsx(Jl,{position:[0,-5,-80],visible:!0}),u.jsx(lt,{appId:"mindwave",position:[40,0,-40]})]})},ec=()=>{const r=m.useRef([]),s=m.useRef(document.createElement("canvas")),c=m.useMemo(()=>{s.current.width=512,s.current.height=1024;const e=s.current.getContext("2d");e.fillStyle="#010a15",e.fillRect(0,0,512,1024),e.strokeStyle="#004488",e.lineWidth=2;for(let a=0;a<1024;a+=32)e.beginPath(),e.moveTo(0,a),e.lineTo(512,a),e.stroke(),a<512&&(e.beginPath(),e.moveTo(a,0),e.lineTo(a,1024),e.stroke());e.fillStyle="#0088ff",e.fillRect(40,40,432,60),e.fillStyle="#00ffff",e.font="24px monospace",e.fillText("CLASSIFIED // AI REVIEW",60,78),e.fillStyle="#003366";for(let a=0;a<30;a++){let o=140+a*28;e.fillRect(40,o,432-Math.random()*200,12)}e.strokeStyle="#ff0033",e.lineWidth=5,e.beginPath(),e.arc(400,850,60,0,Math.PI*2),e.stroke(),e.beginPath(),e.arc(400,850,50,0,Math.PI*2),e.stroke();const n=new Pa(s.current);return n.colorSpace=tt,n},[]),t=m.useMemo(()=>Array.from({length:50}).map((e,n)=>({delay:n*.08,state:"waiting",x:3e3,y:(Math.random()-.5)*150-50,z:-400+Math.random()*200})),[50]);return de((e,n)=>{const a=e.clock.elapsedTime;t.forEach((o,i)=>{const f=r.current[i];f&&(a>o.delay&&(o.state==="waiting"&&(o.state="approaching"),o.state==="approaching"&&(o.x-=8e3*n,o.x<=0&&(o.x=0,o.state="scanning",o.scanTimer=a)),o.state==="scanning"&&a-o.scanTimer>.05&&(o.state="approved"),o.state==="approved"&&(o.x-=8e3*n,o.x<-3e3&&(o.x=3e3+Math.random()*500,o.state="approaching",o.y=(Math.random()-.5)*150-50))),f.position.set(o.x,o.y,o.z),o.state==="scanning"?(f.rotation.set(0,0,0),f.scale.setScalar(1.2)):o.state==="approved"?(f.rotation.set(0,.4,0),f.scale.setScalar(1)):(f.rotation.set(0,-.4,0),f.scale.setScalar(1)),o.state==="scanning"?f.color.set("#ffffff"):o.state==="approved"?f.color.set("#00ff66"):f.color.set("#0088ff"))})}),u.jsxs(Ul,{limit:50,range:50,children:[u.jsx("planeGeometry",{args:[100,200]}),u.jsx("meshBasicMaterial",{map:c,side:et,transparent:!0,opacity:.9,blending:Ue,depthWrite:!1}),t.map((e,n)=>u.jsx($a,{ref:a=>r.current[n]=a,position:[e.x,e.y,e.z]},n))]})},tc=()=>{const l=kt(Je,"/legal_eagle_courtroom_bg.jpg");return l.colorSpace=tt,u.jsxs("group",{children:[u.jsxs("mesh",{position:[0,0,-2500],children:[u.jsx("planeGeometry",{args:[8e3,4500]}),u.jsx("meshBasicMaterial",{map:l,depthWrite:!1,transparent:!0,opacity:.3})]}),[-1,1].map((r,s)=>u.jsxs("mesh",{position:[r*800,0,-1e3],children:[u.jsx("boxGeometry",{args:[400,4e3,400]}),u.jsx("meshStandardMaterial",{color:"#050505",metalness:.9,roughness:.2})]},s)),[-1,1].map((r,s)=>u.jsxs("mesh",{position:[r*1400,0,-1500],children:[u.jsx("boxGeometry",{args:[600,4e3,600]}),u.jsx("meshStandardMaterial",{color:"#030303",metalness:.9,roughness:.3})]},s+2))]})},rc=({logoTex:l})=>{const r=m.useMemo(()=>({uTime:{value:0}}),[]),s=m.useMemo(()=>({uTime:{value:0},uColor:{value:new Ce("#00ffff")}}),[]);return de(c=>{r.uTime.value=c.clock.elapsedTime,s.uTime.value=c.clock.elapsedTime}),u.jsxs("group",{position:[0,-100,-800],children:[u.jsxs("mesh",{position:[0,-200,0],children:[u.jsx("boxGeometry",{args:[1200,600,400]}),u.jsx("meshStandardMaterial",{color:"#020202",metalness:1,roughness:.1})]}),u.jsxs("mesh",{position:[0,150,0],children:[u.jsx("boxGeometry",{args:[800,100,300]}),u.jsx("meshStandardMaterial",{color:"#050505",metalness:.8,roughness:.2})]}),u.jsx(Lt,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:u.jsxs("group",{position:[0,0,600],children:[u.jsxs("mesh",{position:[0,400,0],children:[u.jsx("planeGeometry",{args:[400,400]}),u.jsx("meshBasicMaterial",{map:l,transparent:!0,depthWrite:!1,blending:Ue})]}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,150,0],fontSize:100,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",children:"LEGAL EAGLE"}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,50,0],fontSize:40,color:"#88ffff",anchorX:"center",anchorY:"middle",outlineWidth:1,outlineColor:"#002244",maxWidth:800,textAlign:"center",children:"AI Contract Generation, Review & Revisions"})]})})]})},nc=({position:l,rotation:r,visible:s})=>{const c=kt(Je,"/legal_eagle_logo.png");return c.colorSpace=tt,u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.2}),u.jsx("directionalLight",{position:[0,1e3,1e3],intensity:1.5,color:"#00ffff"}),u.jsx("pointLight",{position:[0,500,-400],intensity:2,color:"#0044ff",distance:2e3}),u.jsx(tc,{}),u.jsx(rc,{logoTex:c}),u.jsx(ec,{}),u.jsx(lt,{appId:"legaleagle",position:[200,100,-200]})]})},Ln=l=>{const s=new Ci;l==="interceptor"?(s.moveTo(1*1.8,0),s.quadraticCurveTo(1*.2,1*.8,-1*.5,1*1.5),s.quadraticCurveTo(-1*.2,1*.4,-1*.8,0),s.quadraticCurveTo(-1*.2,-1*.4,-1*.5,-1*1.5),s.quadraticCurveTo(1*.2,-1*.8,1*1.8,0)):l==="viper"?(s.moveTo(1*1.2,1*.3),s.lineTo(1*.4,1*.4),s.lineTo(-1*.8,1*1.2),s.lineTo(-1*1.2,1*.8),s.lineTo(-1*.8,0),s.lineTo(-1*1.2,-1*.8),s.lineTo(-1*.8,-1*1.2),s.lineTo(1*.4,-1*.4),s.lineTo(1*1.2,-1*.3),s.lineTo(1*.6,0)):l==="bulwark"&&(s.moveTo(1*1.5,0),s.lineTo(1*.8,1*1.2),s.lineTo(-1*.5,1*1.5),s.lineTo(-1*1.5,1*.8),s.lineTo(-1*1.5,-1*.8),s.lineTo(-1*.5,-1*1.5),s.lineTo(1*.8,-1*1.2));const c={steps:1,depth:l==="bulwark"?.8:.2,bevelEnabled:!0,bevelThickness:.1,bevelSize:.05,bevelSegments:2},t=new Ui(s,c);return t.center(),t.rotateY(-Math.PI/2),t.rotateZ(-Math.PI/2),t},oc=({position:l})=>{const r=m.useRef();return de((s,c)=>{r.current&&(r.current.rotation.z-=c*.1,r.current.rotation.x=Math.sin(s.clock.elapsedTime*.1)*.1)}),u.jsxs("group",{position:l,ref:r,scale:[1,1,1],rotation:[Math.PI/4,Math.PI/4,0],children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[150,150,300,32]}),u.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]}),u.jsxs("mesh",{children:[u.jsx("torusGeometry",{args:[400,40,32,64]}),u.jsx("meshStandardMaterial",{color:"#112233",metalness:.9,roughness:.3})]}),[0,Math.PI/2,Math.PI,Math.PI*1.5].map((s,c)=>u.jsxs("mesh",{position:[Math.cos(s)*200,0,Math.sin(s)*200],rotation:[0,-s,Math.PI/2],children:[u.jsx("cylinderGeometry",{args:[20,20,300,16]}),u.jsx("meshStandardMaterial",{color:"#223344",metalness:.9,roughness:.2})]},c)),[0,Math.PI/4,Math.PI/2,Math.PI*.75,Math.PI,Math.PI*1.25,Math.PI*1.5,Math.PI*1.75].map((s,c)=>u.jsxs("mesh",{position:[Math.cos(s)*400,0,Math.sin(s)*400],rotation:[Math.PI/2,0,-s],children:[u.jsx("boxGeometry",{args:[60,60,90]}),u.jsx("meshStandardMaterial",{color:"#00ffff",emissive:"#00ffff",emissiveIntensity:2})]},`dock-${c}`))]})},ac=({position:l})=>{const r=m.useRef(),s=m.useMemo(()=>Ln("bulwark"),[]);return de((c,t)=>{r.current&&(r.current.position.y=Math.sin(c.clock.elapsedTime*.2)*40,r.current.rotation.y+=t*.05,r.current.rotation.z=Math.sin(c.clock.elapsedTime*.1)*.1)}),u.jsxs("group",{position:l,ref:r,scale:[120,120,120],children:[u.jsx("mesh",{geometry:s,children:u.jsx("meshStandardMaterial",{color:"#001133",metalness:.9,roughness:.1})}),u.jsx("pointLight",{position:[0,0,1.5],intensity:50,color:"#00ffff",distance:100}),u.jsxs("mesh",{position:[0,0,1.5],children:[u.jsx("sphereGeometry",{args:[.2,16,16]}),u.jsx("meshBasicMaterial",{color:"#00ffff"})]})]})},ic=({position:l})=>{const e=m.useMemo(()=>new Et,[]),n=m.useMemo(()=>new Et,[]),a=m.useRef(),o=m.useRef(),i=m.useRef(),f=m.useRef(),d=m.useMemo(()=>Ln("interceptor"),[]),h=m.useMemo(()=>Ln("viper"),[]),p=m.useMemo(()=>{const y=new ki(.5,.5,20,4);return y.rotateX(Math.PI/2),y},[]),g=m.useMemo(()=>Array.from({length:80},(y,M)=>{const S=M>=40;return{pos:new ve((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),vel:new ve,target:new ve,team:S?1:0,meshIndex:S?M-40:M,health:100,state:0,explosionTimer:0,trail:[]}}),[40,80]),x=m.useMemo(()=>Array.from({length:60},()=>({active:!1,pos:new ve,vel:new ve,color:new Ce,life:0})),[60]);return de((y,M)=>{if(!a.current||!o.current||!i.current||!f.current)return;let S=0;g.forEach(v=>{if(v.state===0){if(Math.random()<.02||v.target.lengthSq()===0){const U=g[Math.floor(Math.random()*80)];U&&U.team!==v.team&&U.state===0?(v.target.copy(U.pos),v.target.x+=(Math.random()-.5)*200,v.target.y+=(Math.random()-.5)*200,v.target.z+=(Math.random()-.5)*200):v.target.set((Math.random()-.5)*1200,(Math.random()-.5)*400,(Math.random()-.5)*1200)}const b=new ve().subVectors(v.target,v.pos),T=b.length();if(T>150&&T<800&&Math.random()<.03){const U=x.find(L=>!L.active);U&&(U.active=!0,U.pos.copy(v.pos),U.vel.copy(b).normalize().multiplyScalar(2500),U.color.set(v.team===0?"#00ffff":"#ff3300"),U.life=.8)}const A=b.normalize().multiplyScalar(400*M);v.vel.add(A),v.vel.clampLength(0,600),v.pos.addScaledVector(v.vel,M),v.trail.push(v.pos.clone()),v.trail.length>5&&v.trail.shift(),e.position.copy(v.pos);const j=e.position.clone().add(v.vel);e.lookAt(j);const R=A.clone().cross(v.vel).y;e.rotateZ(R*.01),e.scale.set(30,30,30)}else{v.explosionTimer+=M,e.position.copy(v.pos),e.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const b=30*Math.max(.1,1-v.explosionTimer*2);e.scale.set(b,b,b),v.explosionTimer>.5&&(v.state=0,v.health=100,v.pos.set((Math.random()-.5)*1600,(Math.random()-.5)*400,(Math.random()-.5)*1600),v.vel.set(0,0,0),v.trail=[])}e.updateMatrix(),v.team===0?(a.current.setMatrixAt(v.meshIndex,e.matrix),a.current.setColorAt(v.meshIndex,v.state===0?new Ce("#00aaff"):new Ce("#ffaa00"))):(o.current.setMatrixAt(v.meshIndex,e.matrix),o.current.setColorAt(v.meshIndex,v.state===0?new Ce("#ff0033"):new Ce("#ffaa00"))),v.trail.forEach((b,T)=>{if(S<400){e.position.copy(b),e.rotation.set(0,0,0);const A=T/5*10;e.scale.set(A,A,A),e.updateMatrix(),f.current.setMatrixAt(S,e.matrix),f.current.setColorAt(S,v.team===0?new Ce("#00ffff"):new Ce("#ff5500")),S++}})});for(let v=S;v<400;v++)e.position.set(0,9999,0),e.scale.set(0,0,0),e.updateMatrix(),f.current.setMatrixAt(v,e.matrix);x.forEach((v,b)=>{v.active?(v.pos.addScaledVector(v.vel,M),v.life-=M,g.forEach(T=>{T.state===0&&v.pos.distanceTo(T.pos)<50&&(T.health-=50,v.active=!1,T.health<=0&&(T.state=1,T.explosionTimer=0))}),v.life<=0&&(v.active=!1),n.position.copy(v.pos),n.lookAt(n.position.clone().add(v.vel)),n.scale.set(1,1,1)):(n.position.set(0,9999,0),n.scale.set(0,0,0)),n.updateMatrix(),i.current.setMatrixAt(b,n.matrix),i.current.setColorAt(b,v.color)}),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0),o.current.instanceMatrix.needsUpdate=!0,o.current.instanceColor&&(o.current.instanceColor.needsUpdate=!0),f.current.instanceMatrix.needsUpdate=!0,f.current.instanceColor&&(f.current.instanceColor.needsUpdate=!0),i.current.instanceMatrix.needsUpdate=!0,i.current.instanceColor&&(i.current.instanceColor.needsUpdate=!0)}),u.jsxs("group",{position:l,children:[u.jsx("instancedMesh",{ref:a,args:[d,null,40],children:u.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),u.jsx("instancedMesh",{ref:o,args:[h,null,40],children:u.jsx("meshStandardMaterial",{metalness:.8,roughness:.2})}),u.jsx("instancedMesh",{ref:i,args:[p,null,60],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Ue})}),u.jsx("instancedMesh",{ref:f,args:[new ji(1,4,4),null,400],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.5,blending:Ue,depthWrite:!1})})]})},sc=({position:l,rotation:r,visible:s})=>{const c=kt(Je,"/interstellar_logo_final.png");c.colorSpace=tt;const t=Xe(),e=m.useRef({triggered:!1});return de(()=>{t&&t.offset>=.41&&t.offset<=.43&&!e.current.triggered&&!window.interstellarLocked&&(window.interstellarLocked=!0,e.current.triggered=!0,setTimeout(()=>{window.interstellarLocked=!1},1500))}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.2}),u.jsx("directionalLight",{position:[1e3,500,-1e3],intensity:2,color:"#ffffff"}),u.jsx("pointLight",{position:[-1e3,-500,-500],intensity:1.5,color:"#0055ff"}),u.jsx("pointLight",{position:[1e3,500,1e3],intensity:1,color:"#ff3300"}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[4e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#020510",side:Ge})]}),u.jsx(oc,{position:[0,-200,-800]}),u.jsx(ac,{position:[0,-120,-100]}),u.jsx(ic,{position:[0,-50,0]}),u.jsxs("group",{position:[0,120,200],children:[u.jsxs("mesh",{position:[0,50,0],children:[u.jsx("planeGeometry",{args:[180,180]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1})]}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-60,0],fontSize:50,color:"#ff8800",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#550000",children:"INTERSTELLAR"}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:20,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Build your space empire"})]}),u.jsx(lt,{appId:"interstellar",position:[-150,100,200]})]})},lc=({position:l})=>{const r=m.useRef();return de((s,c)=>{r.current&&(r.current.rotation.y+=c*.1)}),u.jsxs("group",{position:l,ref:r,children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[40,40,200,16]}),u.jsx("meshStandardMaterial",{color:"#223344",metalness:.8,roughness:.2})]}),u.jsxs("mesh",{position:[0,0,80],rotation:[Math.PI/2,0,0],children:[u.jsx("coneGeometry",{args:[120,60,32]}),u.jsx("meshStandardMaterial",{color:"#112233",metalness:.5,roughness:.5})]}),u.jsxs("mesh",{position:[0,0,100],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[100,100,2,32]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.8,blending:Ue})]}),u.jsxs("mesh",{position:[-150,0,0],children:[u.jsx("boxGeometry",{args:[200,50,5]}),u.jsx("meshStandardMaterial",{color:"#001122",metalness:.9,roughness:.1,emissive:"#002244",emissiveIntensity:.5})]}),u.jsxs("mesh",{position:[150,0,0],children:[u.jsx("boxGeometry",{args:[200,50,5]}),u.jsx("meshStandardMaterial",{color:"#001122",metalness:.9,roughness:.1,emissive:"#002244",emissiveIntensity:.5})]}),u.jsxs("mesh",{position:[0,120,0],children:[u.jsx("cylinderGeometry",{args:[2,2,100]}),u.jsx("meshStandardMaterial",{color:"#8899aa"})]}),u.jsxs("mesh",{position:[0,170,0],children:[u.jsx("sphereGeometry",{args:[5,16,16]}),u.jsx("meshBasicMaterial",{color:"#ff0088"})]})]})},cc=({position:l})=>{const r=m.useRef();return de(s=>{r.current&&(r.current.position.z=s.clock.elapsedTime*800%500,r.current.scale.z=1+Math.sin(s.clock.elapsedTime*10)*.5)}),u.jsx("group",{position:l,children:u.jsxs("mesh",{ref:r,rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[5,5,200,8]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.6,blending:Ue})]})})},fc=()=>{const l=kt(Je,"/autopilot_logo.png");return l.colorSpace=tt,u.jsxs("mesh",{position:[0,350,-600],children:[u.jsx("planeGeometry",{args:[250,250]}),u.jsx("meshBasicMaterial",{map:l,transparent:!0,depthWrite:!1,blending:Ue})]})},uc=({position:l,rotation:r,visible:s})=>{const c=Xe(),[t,e]=m.useState(!1),n=m.useRef({timer:0,triggered:!1});return de((a,o)=>{s&&(c.offset>=.595&&c.offset<=.605&&!n.current.triggered&&!window.orbitalLocked&&(window.orbitalLocked=!0,n.current.triggered=!0,n.current.timer=0,e(!0),c.el&&(c.el.style.overflow="hidden")),window.orbitalLocked&&(c.el&&(c.el.scrollTop=.6*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.orbitalLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto"))))}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.2}),u.jsx("directionalLight",{position:[200,500,500],intensity:2.5,color:"#ffffff"}),u.jsx("pointLight",{position:[0,0,200],intensity:3,color:"#00ffff",distance:1e3}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[2e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#000205",side:Ge})]}),u.jsxs(Lt,{speed:1.5,rotationIntensity:.1,floatIntensity:.5,children:[u.jsx(Vr.Suspense,{fallback:null,children:u.jsx(fc,{})}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,180,-600],fontSize:80,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"ORBITAL COMMAND"}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,100,-600],fontSize:25,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"Centralizing Strategy & Global Output"}),u.jsx(lc,{position:[0,-100,-600]}),u.jsx(cc,{position:[0,-100,-450]})]}),u.jsx(Ht,{count:1e3,scale:1500,size:20,speed:.2,opacity:.3,color:"#00aaff",position:[0,0,-500]}),u.jsx(lt,{appId:"orbital",position:[150,0,-200]})]})},dc=({position:l})=>{const r=m.useRef(),s=400,c=m.useMemo(()=>new Et,[]),t=m.useMemo(()=>{const e=[];for(let n=0;n<s;n++){const a=250+Math.random()*500,o=Math.random()*2*Math.PI,i=(Math.random()-.5)*300;e.push({t:Math.random()*100,factor:.5+Math.random()*1.5,speed:.005+Math.random()*.015,radius:a,theta:o,y:i})}return e},[s]);return de(()=>{t.forEach((e,n)=>{let{t:a,factor:o,speed:i,radius:f,theta:d,y:h}=e;a+=i,e.t=a,c.position.set(Math.cos(d+a)*f,h+Math.sin(a*o)*50,Math.sin(d+a)*f),c.rotation.y=-(d+a),c.updateMatrix(),r.current.setMatrixAt(n,c.matrix)}),r.current.instanceMatrix.needsUpdate=!0}),u.jsx("group",{position:l,children:u.jsxs("instancedMesh",{ref:r,args:[null,null,s],children:[u.jsx("coneGeometry",{args:[4,15,8]}),u.jsx("meshStandardMaterial",{color:"#00ffcc",metalness:.8,roughness:.2,emissive:"#005544",emissiveIntensity:.5})]})})},hc=({position:l})=>{const r=m.useRef();return de((s,c)=>{r.current&&(r.current.position.y=Math.sin(s.clock.elapsedTime*1.5)*20)}),u.jsxs("group",{position:l,ref:r,children:[u.jsxs("mesh",{children:[u.jsx("capsuleGeometry",{args:[60,200,16,32]}),u.jsx("meshStandardMaterial",{color:"#1a1a24",metalness:.9,roughness:.3})]}),u.jsxs("mesh",{position:[-80,0,0],rotation:[0,0,-Math.PI/6],children:[u.jsx("boxGeometry",{args:[100,10,80]}),u.jsx("meshStandardMaterial",{color:"#111118",metalness:.8,roughness:.4})]}),u.jsxs("mesh",{position:[80,0,0],rotation:[0,0,Math.PI/6],children:[u.jsx("boxGeometry",{args:[100,10,80]}),u.jsx("meshStandardMaterial",{color:"#111118",metalness:.8,roughness:.4})]}),u.jsxs("mesh",{position:[0,-120,0],children:[u.jsx("cylinderGeometry",{args:[40,50,20,32]}),u.jsx("meshBasicMaterial",{color:"#00ffcc",transparent:!0,opacity:.9,blending:Ue})]}),u.jsxs("mesh",{position:[0,-250,0],children:[u.jsx("cylinderGeometry",{args:[40,10,300,32]}),u.jsx("meshBasicMaterial",{color:"#00aa88",transparent:!0,opacity:.4,blending:Ue})]})]})},pc=({position:l,rotation:r,visible:s})=>{const c=Xe(),[t,e]=m.useState(!1),n=m.useRef({timer:0,triggered:!1});return de((a,o)=>{s&&(c.offset>=.645&&c.offset<=.655&&!n.current.triggered&&!window.swarmLocked&&(window.swarmLocked=!0,n.current.triggered=!0,n.current.timer=0,e(!0),c.el&&(c.el.style.overflow="hidden")),window.swarmLocked&&(c.el&&(c.el.scrollTop=.65*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.swarmLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto"))))}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.1}),u.jsx("directionalLight",{position:[0,500,200],intensity:2,color:"#00ffcc"}),u.jsx("pointLight",{position:[0,0,0],intensity:4,color:"#00ffcc",distance:1500}),u.jsxs("mesh",{rotation:[0,0,0],children:[u.jsx("sphereGeometry",{args:[2e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#020504",side:Ge})]}),u.jsxs(Lt,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:[u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,250,200],fontSize:80,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"DRONE SWARM"}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,160,200],fontSize:25,color:"#00ffcc",anchorX:"center",anchorY:"middle",children:"Autonomous Execution & Omni-channel Reach"}),u.jsx("group",{rotation:[Math.PI/2,0,0],children:u.jsx(hc,{position:[0,0,0]})})]}),u.jsx(dc,{position:[0,0,0]}),u.jsx(Ht,{count:2e3,scale:2e3,size:15,speed:.4,opacity:.5,color:"#ffffff",position:[0,0,0]}),u.jsx(lt,{appId:"droneswarm",position:[-150,50,300]})]})},mc=`
// Simplex 3D Noise 
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

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
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
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`,Gr=`
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uPowerUp;

  ${mc}

  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Create brain-like folds using high-frequency noise
    float noise1 = snoise(position * 0.03) * 0.5;
    float noise2 = snoise(position * 0.08) * 0.25;
    float fold = sin(noise1 * 30.0 + noise2 * 20.0);
    
    // Displacement based on power up
    vec3 newPos = position + normal * (fold * 30.0 * (0.2 + uPowerUp * 0.8));
    
    // Add an organic heartbeat pulse
    float heartbeat = sin(uTime * 4.0) * cos(uTime * 2.0);
    newPos += normal * (heartbeat * 5.0 * uPowerUp);

    vPosition = newPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`,Or=`
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uPowerUp;
  
  void main() {
    // Neural pulse traveling along the Y axis
    float pulse = sin(vPosition.y * 0.05 - uTime * 10.0) * 0.5 + 0.5;
    pulse = pow(pulse, 4.0); // sharp pulses
    
    // Color mixing
    vec3 baseColor = vec3(0.01, 0.05, 0.15); // dark cyber blue
    vec3 glowColor = vec3(0.0, 0.8, 1.0); // neon cyan
    vec3 highGlow = vec3(1.0, 0.0, 1.0); // magenta sparks
    
    // Edge glow (Fresnel)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float viewFactor = dot(viewDir, vNormal);
    float fresnel = pow(1.0 - max(viewFactor, 0.0), 3.0);
    
    // Combine colors based on power up
    vec3 color = mix(baseColor, mix(baseColor, glowColor, pulse), uPowerUp);
    color += highGlow * fresnel * uPowerUp * 0.8;
    
    // Base glow even when powered down
    color += vec3(0.0, 0.2, 0.4) * (1.0 - uPowerUp) * fresnel;
    
    gl_FragColor = vec4(color, 1.0);
  }
`,vc=({position:l,powerUpRef:r})=>{const s=m.useRef([]),c=m.useRef();return de(t=>{if(c.current){const e=r.current||0;s.current.forEach(n=>{n&&n.material&&n.material.uniforms&&(n.material.uniforms.uTime.value=t.clock.elapsedTime,n.material.uniforms.uPowerUp.value=e)}),c.current.emissiveIntensity=e*.5,c.current.opacity=.3+e*.5}}),u.jsxs("group",{position:l,children:[u.jsxs("group",{children:[u.jsxs("mesh",{position:[-65,30,0],scale:[.75,1,1.2],ref:t=>s.current[0]=t,children:[u.jsx("sphereGeometry",{args:[130,64,64]}),u.jsx("shaderMaterial",{vertexShader:Gr,fragmentShader:Or,uniforms:{uTime:{value:0},uPowerUp:{value:0}},transparent:!0,blending:Ue,depthWrite:!1})]}),u.jsxs("mesh",{position:[65,30,0],scale:[.75,1,1.2],ref:t=>s.current[1]=t,children:[u.jsx("sphereGeometry",{args:[130,64,64]}),u.jsx("shaderMaterial",{vertexShader:Gr,fragmentShader:Or,uniforms:{uTime:{value:0},uPowerUp:{value:0}},transparent:!0,blending:Ue,depthWrite:!1})]}),u.jsxs("mesh",{position:[0,-50,70],scale:[1.4,.6,.8],ref:t=>s.current[2]=t,children:[u.jsx("sphereGeometry",{args:[70,64,64]}),u.jsx("shaderMaterial",{vertexShader:Gr,fragmentShader:Or,uniforms:{uTime:{value:0},uPowerUp:{value:0}},transparent:!0,blending:Ue,depthWrite:!1})]}),u.jsxs("mesh",{position:[0,-110,30],rotation:[.2,0,0],ref:t=>s.current[3]=t,children:[u.jsx("cylinderGeometry",{args:[25,15,120,32]}),u.jsx("shaderMaterial",{vertexShader:Gr,fragmentShader:Or,uniforms:{uTime:{value:0},uPowerUp:{value:0}},transparent:!0,blending:Ue,depthWrite:!1})]})]}),u.jsxs("mesh",{children:[u.jsx("icosahedronGeometry",{args:[320,2]}),u.jsx("meshPhysicalMaterial",{ref:c,color:"#001133",emissive:"#00ffff",emissiveIntensity:0,wireframe:!0,transparent:!0,opacity:.3})]})]})},gc=({powerUpRef:l})=>{const s=m.useMemo(()=>new Et,[]),c=m.useRef(),t=m.useMemo(()=>{const e=[];for(let n=0;n<300;n++){const a=600+Math.random()*1200,o=(Math.random()-.5)*1e3,i=Math.random()*Math.PI*2,f=Math.random()*Math.PI*2;e.push({radius:a,height:o,angle:i,offset:f})}return e},[300]);return de((e,n)=>{if(!c.current)return;const a=e.clock.elapsedTime,o=l.current||0,i=.2+o*5;t.forEach((f,d)=>{const h=f.angle+a*i*.1+f.offset,p=f.radius+o*200*Math.sin(a+f.offset),g=Math.cos(h)*p,x=Math.sin(h)*p-800;s.position.set(g,f.height-200,x),s.rotation.y=-h,s.scale.set(1+o*3,1,1),s.updateMatrix(),c.current.setMatrixAt(d,s.matrix)}),c.current.instanceMatrix.needsUpdate=!0}),u.jsxs("instancedMesh",{ref:c,args:[null,null,300],children:[u.jsx("planeGeometry",{args:[40,60]}),u.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.8,side:et,blending:Ue,depthWrite:!1})]})},yc=({powerUpRef:l})=>{const r=m.useRef([]);return de(()=>{const s=l.current||0;r.current.forEach(c=>{c&&(c.emissiveIntensity=s*1.5)})}),u.jsxs("group",{children:[u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[4e3,32,32]}),u.jsx("meshStandardMaterial",{color:"#020205",side:Ge,roughness:.8,metalness:.5})]}),Array.from({length:8}).map((s,c)=>{const t=c/8*Math.PI*2;return u.jsxs("mesh",{position:[Math.cos(t)*1500,0,Math.sin(t)*1500],children:[u.jsx("cylinderGeometry",{args:[50,50,4e3,16]}),u.jsx("meshStandardMaterial",{ref:e=>r.current[c]=e,color:"#050510",emissive:"#00ffff",emissiveIntensity:0,metalness:.9,roughness:.1})]},c)})]})},xc=({position:l,rotation:r,visible:s})=>{const c=Xe(),t=m.useRef(0),e=m.useRef(),n=m.useRef(),a=m.useRef(),o=m.useRef(),i=m.useRef(),f=kt(Je,"/autopilot_logo.png");return f.colorSpace=tt,de(()=>{if(!s)return;const d=Ve.clamp((c.offset-.65)*50,0,1);t.current=d,e.current&&(e.current.intensity=.1+d*.4),n.current&&(n.current.intensity=2+d*8),a.current&&(a.current.opacity=.2+d*.8),o.current&&(o.current.fillOpacity=.2+d*.8),i.current&&(i.current.fillOpacity=.2+d*.8),c.offset>.675&&c.offset<.69&&!window.autopilotLocked&&(window.autopilotLocked=!0,setTimeout(()=>{window.autopilotLocked=!1},1500))}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{ref:e,intensity:.1}),u.jsx("pointLight",{ref:n,position:[0,0,0],intensity:2,color:"#00ffff",distance:2e3}),u.jsx(yc,{powerUpRef:t}),u.jsx(vc,{position:[0,-200,-800],powerUpRef:t}),u.jsx(gc,{powerUpRef:t}),u.jsx("group",{position:[0,300,-600],children:u.jsxs(Lt,{speed:2,rotationIntensity:.1,floatIntensity:1,children:[u.jsxs("mesh",{position:[0,250,0],children:[u.jsx("planeGeometry",{args:[300,300]}),u.jsx("meshBasicMaterial",{ref:a,map:f,transparent:!0,depthWrite:!1,blending:Ue,opacity:.2})]}),u.jsx(Fe,{ref:o,font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,0,0],fontSize:80,color:"#00ffff",anchorX:"center",anchorY:"middle",outlineWidth:2,outlineColor:"#004488",fillOpacity:.2,children:"AUTOPILOT"}),u.jsx(Fe,{ref:i,font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-80,0],fontSize:35,color:"#ffffff",anchorX:"center",anchorY:"middle",fillOpacity:.2,children:"Autonomous Marketing Agent"})]})}),u.jsx(lt,{appId:"autopilot",position:[150,200,-400]})]})},wc=({position:l})=>{const r=m.useRef(),s=m.useMemo(()=>({uTime:{value:0},uColor:{value:new Ce("#00ffff")}}),[]);return de(c=>{r.current&&(r.current.uniforms.uTime.value=c.clock.elapsedTime)}),u.jsxs("mesh",{position:l,children:[u.jsx("cylinderGeometry",{args:[400,400,4e3,64,1,!0,Math.PI,Math.PI]}),u.jsx("shaderMaterial",{ref:r,transparent:!0,side:et,blending:Ue,depthWrite:!1,uniforms:s,vertexShader:`
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
        `})]})},bc=()=>{const l=m.useRef(),r=m.useMemo(()=>({uTime:{value:0},uColor:{value:new Ce("#0044ff")},uHighlight:{value:new Ce("#00ffff")}}),[]);return de(s=>{l.current&&(l.current.uniforms.uTime.value=s.clock.elapsedTime)}),u.jsxs("mesh",{position:[0,-200,0],rotation:[-Math.PI/2,0,0],children:[u.jsx("planeGeometry",{args:[8e3,8e3,128,128]}),u.jsx("shaderMaterial",{ref:l,transparent:!0,wireframe:!0,uniforms:r,vertexShader:`
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
        `})]})},Mc=({position:l,rotation:r,visible:s})=>{const[c,t]=m.useState(null);return m.useEffect(()=>{new Je().load("/cloveh2o_logo.png",n=>{n.colorSpace=tt,t(n)})},[]),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[4e3,32,32]}),u.jsx("meshBasicMaterial",{color:"#000511",side:Ge})]}),u.jsx(bc,{}),u.jsx(wc,{position:[0,1800,-800]}),u.jsx("ambientLight",{intensity:.5,color:"#00aaff"}),u.jsx("pointLight",{color:"#00ffff",intensity:4,distance:3e3,position:[0,500,-500]}),u.jsxs("group",{position:[0,0,-300],children:[c&&u.jsxs("mesh",{position:[0,80,0],children:[u.jsx("planeGeometry",{args:[200,200]}),u.jsx("meshBasicMaterial",{map:c,transparent:!0,depthWrite:!1,blending:Ue})]}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-50,0],fontSize:60,color:"#ffffff",outlineWidth:.02,outlineColor:"#0044ff",anchorX:"center",anchorY:"middle",children:"CLOVEH2O"}),u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,-110,0],fontSize:24,color:"#ffffff",outlineWidth:.01,outlineColor:"#001133",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",lineHeight:1.5,children:"An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics."})]}),u.jsx(lt,{appId:"cloveh2o",position:[150,20,-150]})]})},Br=({color:l,number:r,groupRef:s,armRef:c})=>u.jsxs("group",{ref:s,children:[u.jsxs("mesh",{position:[0,10,0],children:[u.jsx("cylinderGeometry",{args:[3.5,2.5,8,16]}),u.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.3,roughness:.4})]}),u.jsxs("mesh",{position:[-3.5,13,0],rotation:[0,0,.2],children:[u.jsx("sphereGeometry",{args:[2.5,16,16]}),u.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.5,roughness:.3})]}),u.jsxs("mesh",{position:[3.5,13,0],rotation:[0,0,-.2],children:[u.jsx("sphereGeometry",{args:[2.5,16,16]}),u.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.5,roughness:.3})]}),u.jsxs("group",{position:[0,17,0],children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[2.8,32,32]}),u.jsx("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.8,metalness:.5})]}),u.jsxs("mesh",{position:[0,.5,2],rotation:[-.2,0,0],children:[u.jsx("boxGeometry",{args:[3.5,2,2]}),u.jsx("meshStandardMaterial",{color:"#000000",metalness:1,roughness:0,emissive:"#002244"})]})]}),u.jsx("group",{position:[-4.5,12,0],rotation:[0,0,.3],children:u.jsxs("mesh",{position:[0,-3.5,0],children:[u.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),u.jsx("meshStandardMaterial",{color:l,roughness:.6})]})}),u.jsx("group",{position:[4.5,12,0],rotation:[0,0,-.3],ref:c,children:u.jsxs("mesh",{position:[0,-3.5,0],children:[u.jsx("cylinderGeometry",{args:[1.2,1,7,16]}),u.jsx("meshStandardMaterial",{color:l,roughness:.6})]})}),u.jsxs("mesh",{position:[-1.8,3,0],children:[u.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),u.jsx("meshStandardMaterial",{color:l,roughness:.8})]}),u.jsxs("mesh",{position:[1.8,3,0],children:[u.jsx("cylinderGeometry",{args:[1.6,1.2,6,16]}),u.jsx("meshStandardMaterial",{color:l,roughness:.8})]}),r&&u.jsx(Fe,{font:"/fonts/Roboto.woff",fallbackFonts:[],position:[0,10,2.7],fontSize:3,color:"#ffffff",anchorX:"center",anchorY:"middle",outlineWidth:.05,outlineColor:"#000",children:r})]}),Sc=({position:l})=>{const r=m.useRef(),s=m.useRef(),c=m.useRef(),t=m.useRef(),e=m.useRef(),n=m.useRef(),a=m.useMemo(()=>new ve(100,0,0),[]),o=m.useMemo(()=>new ve(100,0,20),[]),i=m.useMemo(()=>new ve(30,0,100),[]),f=m.useMemo(()=>new ve(0,0,-20),[]),d=m.useMemo(()=>new ve(20,0,220),[]),h=m.useMemo(()=>new ve,[]),p=m.useMemo(()=>new ve,[]);return m.useMemo(()=>new ve,[]),de(g=>{const x=g.clock.elapsedTime%6;if(c.current&&c.current.rotation.set(0,0,-.3),x<.5)s.current&&s.current.position.copy(a),t.current&&t.current.position.copy(o),e.current&&e.current.position.copy(i),r.current&&r.current.position.copy(f),n.current&&n.current.position.copy(f).add(h.set(4.5,12,2));else if(x<4){const y=(x-.5)/3.5;if(s.current&&(y<.5?s.current.position.lerpVectors(a,h.set(100,0,110),y*2):s.current.position.lerpVectors(p.set(100,0,110),d,(y-.5)*2)),t.current&&s.current&&t.current.position.lerpVectors(o,h.set(d.x+8,0,d.z-8),y),e.current&&e.current.position.lerpVectors(i,h.set(d.x-8,0,d.z+8),y),n.current)if(x<1.5)n.current.position.copy(f).add(h.set(4.5,12,2));else{const M=(x-1.5)/2.5,S=Math.sin(M*Math.PI)*45;n.current.position.lerpVectors(f,d,M),n.current.position.y+=S+18}}else if(x<5)s.current&&s.current.position.lerpVectors(d,h.set(20,0,240),x-4),n.current&&s.current&&n.current.position.copy(s.current.position).add(h.set(0,12,3)),t.current&&(t.current.position.y=0),e.current&&(e.current.position.y=0);else if(x<5.5)c.current&&c.current.rotation.set(Math.PI,0,0),n.current&&s.current&&n.current.position.copy(s.current.position).add(h.set(4.5,20,0));else if(c.current&&c.current.rotation.set(-Math.PI/4,0,0),n.current&&s.current){const y=x-5.5,M=Math.abs(Math.cos(y*8))*10;n.current.position.copy(s.current.position).add(h.set(4.5,M,4))}}),u.jsxs("group",{position:l,children:[u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,120],children:[u.jsx("planeGeometry",{args:[400,400]}),u.jsx("meshBasicMaterial",{color:"#001100",transparent:!0,opacity:.6})]}),u.jsx("gridHelper",{args:[400,20,"#00ff00","#004400"],position:[0,.1,120]}),u.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.2,220],children:[u.jsx("planeGeometry",{args:[400,40]}),u.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.3})]}),u.jsx(Br,{color:"#0088ff",number:"QB",groupRef:r}),u.jsx(Br,{color:"#00ffff",number:"80",groupRef:s,armRef:c}),u.jsx(Br,{color:"#ff0044",number:"CB",groupRef:t}),u.jsx(Br,{color:"#ff0044",number:"S",groupRef:e}),u.jsxs("mesh",{ref:n,children:[u.jsx("sphereGeometry",{args:[2,16,16]}),u.jsx("meshStandardMaterial",{color:"#ffaa00",emissive:"#ffaa00",emissiveIntensity:2,wireframe:!0})]})]})},_c=({position:l,rotation:r,visible:s})=>{const c=kt(Je,"/fantasy_quant_stadium.jpg");return c.colorSpace=tt,c.wrapS=vr,c.repeat.set(-1,1),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[2500,64,64]}),u.jsx("meshBasicMaterial",{map:c,side:Ge})]}),u.jsx(Sc,{position:[0,-125,0],rotation:[0,-Math.PI/2,0]}),u.jsx("ambientLight",{intensity:.5,color:"#00ffaa"}),u.jsx("pointLight",{color:"#00ffff",intensity:3,distance:2e3,position:[0,500,500]}),u.jsx("pointLight",{color:"#ff00aa",intensity:2,distance:2e3,position:[0,500,-500]}),u.jsx(lt,{appId:"fantasyquant",position:[150,0,100]})]})},Tc=({position:l})=>{const s=m.useRef(),c=m.useMemo(()=>{const e=[];for(let n=0;n<4e3;n++){const a=Math.random()*Math.PI*2,o=(Math.random()-.5)*150,i=400,f=(i+o*Math.cos(a/2))*Math.cos(a),d=o*Math.sin(a/2),h=(i+o*Math.cos(a/2))*Math.sin(a);e.push({pos:new ve(f,d,h),u:a,v:o,speed:Math.random()*.5+.2,color:new Ce(Math.random()>.5?"#00f3ff":"#0077ff")})}return e},[]),t=m.useMemo(()=>new Et,[]);return de(e=>{if(!s.current)return;const n=e.clock.elapsedTime;c.forEach((a,o)=>{const i=(a.u+n*a.speed)%(Math.PI*2),f=400,d=(f+a.v*Math.cos(i/2))*Math.cos(i),h=a.v*Math.sin(i/2),p=(f+a.v*Math.cos(i/2))*Math.sin(i);t.position.set(d,h,p);const g=1.5+Math.sin(n*a.speed*5+o)*.8;t.scale.set(g,g,g),t.updateMatrix(),s.current.setMatrixAt(o,t.matrix),s.current.setColorAt(o,a.color)}),s.current.instanceMatrix.needsUpdate=!0,s.current.instanceColor&&(s.current.instanceColor.needsUpdate=!0)}),u.jsx("group",{position:l,children:u.jsx("instancedMesh",{ref:s,args:[new Yr(2,2),null,4e3],children:u.jsx("meshBasicMaterial",{transparent:!0,opacity:.8,blending:Ue,depthWrite:!1,side:et})})})},kc=()=>{const l=m.useMemo(()=>Array.from({length:30}).map(()=>{const s=[],c=(Math.random()-.5)*800,t=600+Math.random()*400,e=Math.random()*Math.PI*2;for(let n=0;n<=50;n++){const a=e+n/50*Math.PI*1.5;s.push(new ve(Math.cos(a)*t,c+Math.sin(a*8)*50,Math.sin(a)*t))}return{points:s,color:Math.random()>.5?"#00f3ff":"#ffffff"}}),[]),r=m.useRef();return de(s=>{r.current&&(r.current.rotation.y=s.clock.elapsedTime*.15)}),u.jsx("group",{ref:r,children:l.map((s,c)=>u.jsx(Cs,{points:s.points,color:s.color,lineWidth:2,transparent:!0,opacity:.4},c))})},jc=({position:l,rotation:r,visible:s})=>{const c=Xe(),[t,e]=m.useState(!1),n=m.useRef({triggered:!1,timer:0});return de((a,o)=>{if(!s)return;const i=c.offset;!n.current.triggered&&i>=.92&&(n.current.triggered=!0,e(!0),window.contangoLocked=!0,c.el&&(c.el.style.overflow="hidden",c.el.scrollTop=.93*(c.el.scrollHeight-c.el.clientHeight))),window.contangoLocked&&(c.el&&(c.el.scrollTop=.93*(c.el.scrollHeight-c.el.clientHeight)),n.current.timer+=o,n.current.timer>1.5&&(window.contangoLocked=!1,e(!1),c.el&&(c.el.style.overflow="auto")))}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsx("ambientLight",{intensity:.4}),u.jsx("directionalLight",{position:[0,500,500],intensity:1.5,color:"#ffffff"}),u.jsx("spotLight",{position:[-500,500,500],intensity:2,color:"#00f3ff",penumbra:1}),u.jsx("spotLight",{position:[500,-500,500],intensity:2,color:"#0077ff",penumbra:1}),u.jsxs("mesh",{rotation:[0,-Math.PI/2,0],children:[u.jsx("sphereGeometry",{args:[3e3,64,64]}),u.jsx("meshBasicMaterial",{color:"#010204",side:Ge})]}),u.jsx(kc,{}),u.jsx(Pl,{radius:1500,depth:50,count:5e3,factor:4,saturation:0,fade:!0,speed:1}),u.jsxs(Lt,{speed:2,rotationIntensity:.2,floatIntensity:1,floatingRange:[-10,10],children:[u.jsx(Vr.Suspense,{fallback:null}),u.jsx(Fe,{position:[0,250,-800],fontSize:100,anchorX:"center",anchorY:"middle",color:"#ffffff",children:"CONTANGO QUANT"}),u.jsx(Fe,{position:[0,120,-800],fontSize:35,color:"#00f3ff",anchorX:"center",anchorY:"middle",maxWidth:800,textAlign:"center",children:"The physics of finance"})]}),u.jsx(Tc,{position:[0,-100,-800]}),u.jsx(Ht,{count:4e3,scale:3e3,size:25,speed:.6,opacity:.5,color:"#00f3ff",position:[0,0,-500]}),u.jsx(lt,{appId:"contango",position:[200,0,-200]})]})},Cc=({position:l,rotation:r,visible:s})=>{const c=m.useRef(),t=m.useRef(),e=kt(Je,"/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png");return de(n=>{c.current&&(c.current.position.y=Math.sin(n.clock.elapsedTime*1.5)*5),t.current&&(t.current.rotation.y+=.005,t.current.rotation.z+=.002)}),u.jsxs("group",{visible:s,position:l,rotation:r,children:[u.jsxs("mesh",{children:[u.jsx("sphereGeometry",{args:[1500,32,32]}),u.jsx("meshBasicMaterial",{color:"#020510",side:Ge})]}),u.jsxs("group",{children:[u.jsx(Lt,{speed:2,rotationIntensity:.1,floatIntensity:.5,children:u.jsxs("mesh",{ref:c,position:[0,0,-500],children:[u.jsx("planeGeometry",{args:[400,100]})," ",u.jsx("meshBasicMaterial",{map:e,transparent:!0,opacity:1,side:et,depthWrite:!1})]})}),u.jsx(Ht,{count:400,scale:1500,size:15,speed:.4,opacity:.6,color:"#00ffff",position:[0,0,0]}),u.jsx(Ht,{count:200,scale:1e3,size:25,speed:.2,opacity:.8,color:"#ffffff",position:[0,0,-500]})]}),u.jsx("ambientLight",{intensity:.5,color:"#002244"}),u.jsx("pointLight",{position:[0,0,-200],intensity:3,color:"#00aaff",distance:1e3}),u.jsx(lt,{appId:"sentaient",position:[150,0,-200]})]})},Uc=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ac=`
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
`,Rc=({startZ:l=10,endZ:r=-500,visible:s=!0})=>{const c=m.useRef(),t=m.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);de(n=>{c.current&&s&&(c.current.uniforms.uTime.value=n.clock.elapsedTime,c.current.uniforms.uOpacity.value=Ve.lerp(c.current.uniforms.uOpacity.value,s?1:0,.05))});const e=m.useMemo(()=>{const n=[],o=l-r;for(let i=0;i<=100;i++){const f=l-i/100*o;n.push(new ve(Math.sin(i*.1)*2,Math.cos(i*.05)*2,f))}return new Ai(n)},[l,r]);return u.jsxs("mesh",{visible:s,children:[u.jsx("tubeGeometry",{args:[e,200,15,32,!1]}),u.jsx("shaderMaterial",{ref:c,vertexShader:Uc,fragmentShader:Ac,uniforms:t,side:Ge,transparent:!0,blending:Ue})]})},Pc=`
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
`,Ec=`
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
`,Lc=({position:l,rotation:r=[0,0,0],length:s=4e3,visible:c=!0})=>{const t=m.useRef(),e=m.useMemo(()=>({uTime:{value:0},uOpacity:{value:1},uLength:{value:s}}),[s]);return de(n=>{t.current&&(t.current.uniforms.uTime.value=n.clock.elapsedTime,t.current.uniforms.uOpacity.value=c?1:0)}),u.jsx("group",{position:l,rotation:r,visible:c,children:u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[60,400,s+200,32,64,!0]}),u.jsx("shaderMaterial",{ref:t,vertexShader:Pc,fragmentShader:Ec,uniforms:e,transparent:!0,side:Ge,wireframe:!1})]})})},ur=({position:l,rotation:r,length:s=4e3,radius:c=200,color:t="#ffffff",speed:e=20,visible:n=!0})=>{const a=m.useRef(),o=m.useMemo(()=>({uTime:{value:0},uColor:{value:new Ce(t)}}),[t]);return de(i=>{a.current&&(a.current.uniforms.uTime.value=i.clock.elapsedTime)}),u.jsxs("mesh",{visible:n,position:l,rotation:r,children:[u.jsx("cylinderGeometry",{args:[c,c,s,32,1,!0]}),u.jsx("shaderMaterial",{ref:a,transparent:!0,side:Ge,blending:Ue,depthWrite:!1,uniforms:o,vertexShader:`
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
        `})]})},Fc=()=>{const l=[],r=(s,c,t)=>{l.push({x:s,y:c,z:0,rot:[Math.PI/2,0,0],color:t,bodyHeight:40+Math.random()*40})};for(let s=Math.PI*.25;s<Math.PI*1.75;s+=.2)r(-100+Math.cos(s)*80,Math.sin(s)*80,"#00ff00");for(let s=0;s<Math.PI*2;s+=.2)r(100+Math.cos(s)*80,Math.sin(s)*80,"#ff0044");return r(140,-40,"#ff0044"),r(160,-60,"#ff0044"),r(180,-80,"#ff0044"),l},Ic=({position:l,rotation:r=[0,0,0],length:s=6e3,radius:c=250,visible:t})=>{const e=m.useRef(),n=m.useRef(),a=m.useRef(),o=kt(Je,"/assets/images/contango_logo.png"),i=m.useMemo(()=>{const d=[],h=Math.floor(s/5);for(let g=0;g<h;g++){const x=-(g/h)*s,y=g*.1,M=Math.cos(y)*c,S=Math.sin(y)*c,v=Math.cos(y+Math.PI)*c,b=Math.sin(y+Math.PI)*c,A=Math.random()>.5?"#00ff00":"#ff0044",j=20+Math.random()*60,R=[0,0,y+Math.PI/2],U=[0,0,y+Math.PI+Math.PI/2];d.push({x:M,y:S,z:x,rot:R,color:A,bodyHeight:j}),d.push({x:v,y:b,z:x,rot:U,color:A,bodyHeight:j})}return Fc().forEach(g=>{d.push({x:g.x,y:g.y,z:-s-500,rot:g.rot,color:g.color,bodyHeight:g.bodyHeight})}),d},[s,c]),f=i.length;return m.useEffect(()=>{if(!n.current||!a.current)return;const d=new Et,h=new Ce;for(let p=0;p<f;p++){const g=i[p];d.position.set(g.x,g.y,g.z),d.rotation.set(g.rot[0],g.rot[1],g.rot[2]),d.scale.set(1,g.bodyHeight+40,1),d.updateMatrix(),n.current.setMatrixAt(p,d.matrix),h.set(g.color),n.current.setColorAt(p,h),d.scale.set(1,g.bodyHeight,1),d.updateMatrix(),a.current.setMatrixAt(p,d.matrix),a.current.setColorAt(p,h)}n.current.instanceMatrix.needsUpdate=!0,n.current.instanceColor&&(n.current.instanceColor.needsUpdate=!0),a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0)},[i,f]),de(d=>{e.current&&t&&(e.current.rotation.z=d.clock.elapsedTime*.5)}),u.jsxs("group",{position:l,rotation:r,visible:t,children:[u.jsxs("group",{ref:e,children:[u.jsxs("instancedMesh",{ref:n,args:[null,null,f],children:[u.jsx("cylinderGeometry",{args:[2,2,1,8]}),u.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.2})]}),u.jsxs("instancedMesh",{ref:a,args:[null,null,f],children:[u.jsx("boxGeometry",{args:[10,1,10]}),u.jsx("meshStandardMaterial",{roughness:.4,emissiveIntensity:.8})]})]}),u.jsxs("mesh",{position:[0,0,-s-500],children:[u.jsx("planeGeometry",{args:[200,200]}),u.jsx("meshBasicMaterial",{map:o,transparent:!0})]}),u.jsxs("mesh",{position:[0,0,-s/2],rotation:[Math.PI/2,0,0],children:[u.jsx("cylinderGeometry",{args:[c*.8,c*.8,s,32,1,!0]}),u.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0,opacity:.05,side:Ge})]})]})},zc=({position:l,rotation:r,length:s=8e3,visible:c=!0})=>{const t=m.useRef(),e=m.useRef();de(a=>{if(!c||!t.current)return;const o=a.clock.getElapsedTime();t.current.map.offset.y=-o*3,e.current&&(e.current.rotation.y=o*2)});const n=Vr.useMemo(()=>{const a=document.createElement("canvas");a.width=512,a.height=512;const o=a.getContext("2d"),i=o.createLinearGradient(0,0,0,512);i.addColorStop(0,"#001a33"),i.addColorStop(.5,"#00ccff"),i.addColorStop(1,"#001a33"),o.fillStyle=i,o.fillRect(0,0,512,512),o.fillStyle="#ffffff";for(let d=0;d<200;d++)o.globalAlpha=Math.random()*.5,o.fillRect(Math.random()*512,Math.random()*512,Math.random()*5+1,Math.random()*100+20);const f=new Pa(a);return f.wrapS=vr,f.wrapT=vr,f.repeat.set(4,20),f},[]);return u.jsxs("group",{position:l,rotation:r,visible:c,children:[u.jsxs("mesh",{children:[u.jsx("cylinderGeometry",{args:[150,150,s,32,1,!0]}),u.jsx("meshStandardMaterial",{ref:t,map:n,color:"#00ffff",emissive:"#0088ff",emissiveIntensity:1.5,side:Ge,transparent:!0,opacity:.9})]}),u.jsxs("mesh",{ref:e,children:[u.jsx("cylinderGeometry",{args:[140,140,s,16,40,!0]}),u.jsx("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.15,side:Ge})]})]})},dt=[{p:0,x:0,y:0,z:10,rx:0,ry:0},{p:.04,x:0,y:0,z:-250,rx:0,ry:0},{p:.06,x:0,y:0,z:-1250,rx:0,ry:0},{p:.1,x:0,y:0,z:-1250,rx:0,ry:0},{p:.12,x:0,y:0,z:-1250,rx:-Math.PI/2,ry:0},{p:.18,x:0,y:-3e3,z:-1250,rx:-Math.PI/2,ry:0},{p:.2,x:0,y:-3980,z:-1750,rx:0,ry:0},{p:.22,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.24,x:0,y:-3980,z:-1900,rx:0,ry:0},{p:.26,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.27,x:0,y:-3980,z:-2250,rx:0,ry:0},{p:.28,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.29,x:0,y:-3980,z:-2800,rx:0,ry:0},{p:.3,x:0,y:-3980,z:-3250,rx:0,ry:0},{p:.32,x:0,y:-3980,z:-4e3,rx:0,ry:0},{p:.36,x:0,y:-3980,z:-6250,rx:0,ry:0},{p:.38,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.42,x:0,y:-3980,z:-7150,rx:0,ry:0},{p:.44,x:0,y:-3980,z:-8250,rx:0,ry:0},{p:.46,x:0,y:-3980,z:-8750,rx:0,ry:0},{p:.48,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.52,x:0,y:-3980,z:-10250,rx:0,ry:0},{p:.55,x:0,y:-3980,z:-11250,rx:0,ry:0},{p:.56,x:0,y:-4e3,z:-11550,rx:0,ry:0},{p:.58,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.6,x:0,y:-4e3,z:-13150,rx:0,ry:0},{p:.61,x:0,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.63,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.65,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.655,x:4e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.67,x:7e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.68,x:7e3,y:-4e3,z:-13550,rx:0,ry:-Math.PI/2},{p:.685,x:7e3,y:-4e3,z:-13550,rx:0,ry:Math.atan2(-7e3,-2600)},{p:.705,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.72,x:0,y:-4e3,z:-16150,rx:0,ry:0},{p:.74,x:0,y:-4500,z:-16550,rx:-1.5,ry:0},{p:.79,x:0,y:-12200,z:-16550,rx:-1.5,ry:0},{p:.81,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.84,x:0,y:-11750,z:-17175,rx:-.1,ry:0},{p:.86,x:0,y:-11750,z:-17800,rx:0,ry:0},{p:.88,x:0,y:-11750,z:-18550,rx:0,ry:0},{p:.9,x:0,y:-11750,z:-22550,rx:0,ry:0},{p:.91,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.94,x:0,y:-11750,z:-24200,rx:0,ry:0},{p:.95,x:0,y:-11750,z:-25200,rx:0,ry:0},{p:.97,x:0,y:-11750,z:-28050,rx:0,ry:0},{p:.98,x:0,y:-11750,z:-29050,rx:0,ry:0},{p:1,x:0,y:-11750,z:-29050,rx:0,ry:0}],Dc=l=>{if(l<=dt[0].p)return dt[0];if(l>=dt[dt.length-1].p)return dt[dt.length-1];for(let r=0;r<dt.length-1;r++){const s=dt[r],c=dt[r+1];if(l>=s.p&&l<=c.p){const t=(l-s.p)/(c.p-s.p);return{x:Ve.lerp(s.x,c.x,t),y:Ve.lerp(s.y,c.y,t),z:Ve.lerp(s.z,c.z,t),rx:Ve.lerp(s.rx,c.rx,t),ry:Ve.lerp(s.ry,c.ry,t)}}}return dt[0]},Gc=()=>{const l=Xe(),r=m.useRef();return de(s=>{let c=l.offset;window.icebreakerCaveLocked?c=.22:window.icebreakerThawLocked?c=.27:window.icebreakerTextLocked?c=.29:window.mindwaveLocked?c=.08:window.interstellarLocked?c=.42:window.orbitalLocked?c=.6:window.swarmLocked?c=.65:window.autopilotLocked?c=.68:window.contangoLocked&&(c=.93);const t=Dc(c);s.camera.position.x=Ve.lerp(s.camera.position.x,t.x,.2),s.camera.position.y=Ve.lerp(s.camera.position.y,t.y,.2),s.camera.position.z=Ve.lerp(s.camera.position.z,t.z,.2);const e=new Tt().setFromEuler(new Fn(t.rx,t.ry,0));s.camera.quaternion.slerp(e,.15);const n=l.delta*10;s.camera.rotateZ(Ve.lerp(0,n*2,.2)),r.current&&r.current.position.copy(s.camera.position)}),u.jsxs("group",{children:[u.jsx("perspectiveCamera",{makeDefault:!0,fov:75,position:[0,0,10],far:3e4}),u.jsx("pointLight",{ref:r,position:[0,0,0],intensity:2,color:"#ffffff",distance:150}),u.jsx("ambientLight",{intensity:.2})]})},Oc=()=>{const l=Xe(),[r,s]=m.useState({intro:!0,mindwave:!1,wormhole_ice:!1,icebreaker:!1,wormhole_sound:!1,interstellar:!1,w_legal:!1,legal:!1,w_orbital:!1,orbital:!1,w_swarm:!1,swarm:!1,w_autopilot:!1,autopilot:!1,w_clove:!1,clove:!1,w_fantasy:!1,fantasy:!1,w_contango:!1,contango:!1,sentaient:!1}),c=m.useRef(r);return de(()=>{const t=l.offset,e={intro:t<.08,mindwave:t>.04&&t<.18,wormhole_ice:t>.1&&t<.25,icebreaker:t>.18&&t<.35,wormhole_sound:t>.28&&t<.42,interstellar:t>.28&&t<.48,w_legal:t>.43&&t<.54,legal:t>.48&&t<.58,w_orbital:t>.53&&t<.65,orbital:t>.56&&t<.63,w_swarm:t>.59&&t<.67,swarm:t>.61&&t<.67,w_autopilot:t>.64&&t<.7,autopilot:t>.65&&t<.71,w_clove:t>.67&&t<.72,clove:t>.69&&t<.76,w_fantasy:t>.71&&t<.83,fantasy:t>.73&&t<.88,w_contango:t>.84&&t<.91,contango:t>.89&&t<.96,sentaient:t>.94};let n=!1;for(const a in e)c.current[a]!==e[a]&&(n=!0);n&&(c.current=e,s(e))}),u.jsxs("group",{children:[u.jsx(Rc,{startZ:10,endZ:-250,visible:r.intro}),u.jsx($l,{position:[0,0,-1350],visible:r.mindwave}),u.jsx(Lc,{position:[0,-2e3,-1250],rotation:[0,0,0],length:4e3,visible:r.wormhole_ice}),u.jsx(ql,{position:[0,-4e3,-2550],visible:r.icebreaker}),u.jsx(sc,{position:[0,-4e3,-7550],rotation:[0,0,0],visible:r.interstellar}),u.jsx(ur,{position:[0,-4e3,-8750],rotation:[Math.PI/2,0,0],length:2e3,color:"#d4af37",visible:r.w_legal}),u.jsx(nc,{position:[0,-4e3,-10550],rotation:[0,0,0],visible:r.legal}),u.jsx(ur,{position:[0,-4e3,-11750],rotation:[Math.PI/2,0,0],length:2e3,color:"#00ffcc",visible:r.w_orbital}),u.jsx(uc,{position:[0,-4e3,-13550],rotation:[0,0,0],visible:r.orbital}),u.jsx(ur,{position:[2e3,-4e3,-13550],rotation:[Math.PI/2,-Math.PI/2,0],length:2e3,color:"#00ffff",speed:40,visible:r.w_swarm}),u.jsx(pc,{position:[5e3,-4e3,-13550],rotation:[0,0,0],visible:r.swarm}),u.jsx(ur,{position:[5500,-4e3,-13550],rotation:[Math.PI/2,-Math.PI/2,0],length:1500,color:"#ff00ff",speed:40,visible:r.w_autopilot}),u.jsx(xc,{position:[7500,-4e3,-13550],rotation:[0,-Math.PI/2,0],visible:r.autopilot}),u.jsx(ur,{position:[3500,-4e3,-14850],rotation:[Math.PI/2,Math.atan2(7e3,-2600),0],length:3800,color:"#ff00ff",speed:40,visible:r.w_clove}),u.jsx(Mc,{position:[0,-4e3,-16550],rotation:[0,0,0],visible:r.clove}),u.jsx(zc,{position:[0,-8200,-16550],rotation:[0,0,0],length:8e3,visible:r.w_fantasy}),u.jsx(_c,{position:[0,-11700,-17500],rotation:[0,0,0],visible:r.fantasy}),u.jsx(Ic,{position:[0,-11750,-20550],length:4e3,visible:r.w_contango}),u.jsx(jc,{position:[0,-11750,-24800],rotation:[0,0,0],visible:r.contango}),u.jsx(Cc,{position:[0,-11750,-29350],rotation:[0,0,0],visible:r.sentaient})]})},Bc=()=>{const l=Xe(),r=m.useRef(),s=m.useRef();return m.useRef(),m.useRef(),m.useRef(),de(()=>{const c=l.offset;if(r.current){const t=c<.03?1:0;r.current.style.opacity=t}if(s.current){const t=c>.2&&c<.28?1:0;s.current.style.opacity=t}}),u.jsxs("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[u.jsxs("div",{ref:r,style:{position:"absolute",top:"40%",left:"10%",color:"white",opacity:1,transition:"opacity 0.3s"},children:[u.jsx("h1",{className:"text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600",children:"Enter the Quantum Grid"}),u.jsx("p",{className:"text-2xl mt-4 text-green-400/80 font-mono tracking-widest",children:"SCROLL TO INITIALIZE WARP SEQUENCE"})]}),u.jsxs("div",{ref:s,style:{position:"absolute",top:"30%",right:"10%",color:"white",opacity:0,transition:"opacity 0.3s"},className:"w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]",children:[u.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[u.jsx("div",{className:"w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner",children:u.jsx("img",{src:"/icebreaker_logo.png",alt:"Icebreaker",className:"w-full h-full object-contain"})}),u.jsx("h2",{className:"text-5xl font-bold",children:"Icebreaker"})]}),u.jsx("p",{className:"text-xl text-gray-300 leading-relaxed font-light",children:"The Real-World Social Protocol. Connect instantly through proximity."}),u.jsx("button",{className:"mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer",children:"Explore Protocol"})]})]})},Wc=()=>u.jsxs(Ri,{gl:{antialias:!1,alpha:!0},children:[u.jsxs(bs,{pages:10,damping:.2,distance:1.2,children:[u.jsxs(Vr.Suspense,{fallback:null,children:[u.jsx(Gc,{}),u.jsx(Oc,{})]}),u.jsx(Ht,{count:2e3,scale:200,size:4,speed:.8,opacity:.5,color:"#00ff44"}),u.jsx(_s,{html:!0,style:{width:"100%",height:"100%",pointerEvents:"none"},children:u.jsx(Bc,{})})]}),u.jsxs(Pi,{disableNormalPass:!0,children:[u.jsx(Ei,{luminanceThreshold:.1,mipmapBlur:!0,intensity:2}),u.jsx(Li,{opacity:.05}),u.jsx(Fi,{eskil:!1,offset:.1,darkness:1.1})]})]}),Zc=()=>u.jsxs("div",{className:"relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden",children:[u.jsxs(ii,{children:[u.jsx("title",{children:"sentAIent | Quantum Wormhole Experience"}),u.jsx("meta",{name:"description",content:"Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."}),u.jsx("meta",{name:"theme-color",content:"#0a0a1a"})]}),u.jsx("div",{className:"absolute top-0 left-0 w-full z-50",children:u.jsx(si,{})}),u.jsx("div",{className:"absolute inset-0 z-0",children:u.jsx(Wc,{})})]});export{Zc as default};
//# sourceMappingURL=index-C_4zo5B-.js.map
