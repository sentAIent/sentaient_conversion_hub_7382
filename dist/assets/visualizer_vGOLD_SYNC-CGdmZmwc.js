import{c as Ne,a6 as aa,e as Jt}from"./persistence-C4ESjdR3.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bs="160",Hl=0,oa=1,Vl=2,Jo=1,kl=2,an=3,cn=0,Dt=1,xt=2,_n=0,hi=1,Ze=2,la=3,ca=4,Wl=5,Ln=100,Xl=101,ql=102,ha=103,ua=104,Yl=200,Zl=201,Jl=202,$l=203,ws=204,As=205,Kl=206,jl=207,Ql=208,ec=209,tc=210,nc=211,ic=212,rc=213,sc=214,ac=0,oc=1,lc=2,wr=3,cc=4,hc=5,uc=6,dc=7,$o=0,fc=1,pc=2,xn=0,mc=1,gc=2,vc=3,_c=4,xc=5,Mc=6,Ko=300,fi=301,pi=302,Cs=303,Rs=304,Ur=306,Ls=1e3,qt=1001,Ps=1002,Mt=1003,da=1004,kr=1005,It=1006,yc=1007,Fi=1008,Mn=1009,Sc=1010,Ec=1011,Gs=1012,jo=1013,gn=1014,vn=1015,Oi=1016,Qo=1017,el=1018,Dn=1020,bc=1021,Yt=1023,Tc=1024,wc=1025,In=1026,mi=1027,Ac=1028,tl=1029,Cc=1030,nl=1031,il=1033,Wr=33776,Xr=33777,qr=33778,Yr=33779,fa=35840,pa=35841,ma=35842,ga=35843,rl=36196,va=37492,_a=37496,xa=37808,Ma=37809,ya=37810,Sa=37811,Ea=37812,ba=37813,Ta=37814,wa=37815,Aa=37816,Ca=37817,Ra=37818,La=37819,Pa=37820,Da=37821,Zr=36492,Ia=36494,Ua=36495,Rc=36283,Na=36284,Fa=36285,Oa=36286,sl=3e3,Un=3001,Lc=3200,Pc=3201,Dc=0,Ic=1,Vt="",yt="srgb",hn="srgb-linear",Hs="display-p3",Nr="display-p3-linear",Ar="linear",nt="srgb",Cr="rec709",Rr="p3",Gn=7680,za=519,Uc=512,Nc=513,Fc=514,al=515,Oc=516,zc=517,Bc=518,Gc=519,Ba=35044,Ga="300 es",Ds=1035,ln=2e3,Lr=2001;class vi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ha=1234567;const ui=Math.PI/180,zi=180/Math.PI;function On(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function St(i,e,t){return Math.max(e,Math.min(t,i))}function Vs(i,e){return(i%e+e)%e}function Hc(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Vc(i,e,t){return i!==e?(t-i)/(e-i):0}function Li(i,e,t){return(1-t)*i+t*e}function kc(i,e,t,n){return Li(i,e,1-Math.exp(-t*n))}function Wc(i,e=1){return e-Math.abs(Vs(i,e*2)-e)}function Xc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function qc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Yc(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Zc(i,e){return i+Math.random()*(e-i)}function Jc(i){return i*(.5-Math.random())}function $c(i){i!==void 0&&(Ha=i);let e=Ha+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Kc(i){return i*ui}function jc(i){return i*zi}function Is(i){return(i&i-1)===0&&i!==0}function Qc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function eh(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ii(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Va={DEG2RAD:ui,RAD2DEG:zi,generateUUID:On,clamp:St,euclideanModulo:Vs,mapLinear:Hc,inverseLerp:Vc,lerp:Li,damp:kc,pingpong:Wc,smoothstep:Xc,smootherstep:qc,randInt:Yc,randFloat:Zc,randFloatSpread:Jc,seededRandom:$c,degToRad:Kc,radToDeg:jc,isPowerOfTwo:Is,ceilPowerOfTwo:Qc,floorPowerOfTwo:Pr,setQuaternionFromProperEuler:eh,normalize:Rt,denormalize:ii};class ce{constructor(e=0,t=0){ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,r,s,o,a,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=r[0],m=r[3],p=r[6],x=r[1],v=r[4],S=r[7],C=r[2],w=r[5],A=r[8];return s[0]=o*_+a*x+l*C,s[3]=o*m+a*v+l*w,s[6]=o*p+a*S+l*A,s[1]=c*_+h*x+u*C,s[4]=c*m+h*v+u*w,s[7]=c*p+h*S+u*A,s[2]=d*_+f*x+g*C,s[5]=d*m+f*v+g*w,s[8]=d*p+f*S+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,g=t*u+n*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(r*c-h*n)*_,e[2]=(a*n-r*o)*_,e[3]=d*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Jr.makeScale(e,t)),this}rotate(e){return this.premultiply(Jr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Jr=new Ve;function ol(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Bi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function th(){const i=Bi("canvas");return i.style.display="block",i}const ka={};function Pi(i){i in ka||(ka[i]=!0,console.warn(i))}const Wa=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Xa=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qi={[hn]:{transfer:Ar,primaries:Cr,toReference:i=>i,fromReference:i=>i},[yt]:{transfer:nt,primaries:Cr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Nr]:{transfer:Ar,primaries:Rr,toReference:i=>i.applyMatrix3(Xa),fromReference:i=>i.applyMatrix3(Wa)},[Hs]:{transfer:nt,primaries:Rr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Xa),fromReference:i=>i.applyMatrix3(Wa).convertLinearToSRGB()}},nh=new Set([hn,Nr]),Je={enabled:!0,_workingColorSpace:hn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!nh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=qi[e].toReference,r=qi[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return qi[i].primaries},getTransfer:function(i){return i===Vt?Ar:qi[i].transfer}};function di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $r(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Hn;class ll{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Hn===void 0&&(Hn=Bi("canvas")),Hn.width=e.width,Hn.height=e.height;const n=Hn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Hn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Bi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=di(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(di(t[n]/255)*255):t[n]=di(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ih=0;class cl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ih++}),this.uuid=On(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Kr(r[o].image)):s.push(Kr(r[o]))}else s=Kr(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Kr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ll.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rh=0;class Ut extends vi{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=qt,r=qt,s=It,o=Fi,a=Yt,l=Mn,c=Ut.DEFAULT_ANISOTROPY,h=Vt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=On(),this.name="",this.source=new cl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Pi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Un?yt:Vt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ko)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ls:e.x=e.x-Math.floor(e.x);break;case qt:e.x=e.x<0?0:1;break;case Ps:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ls:e.y=e.y-Math.floor(e.y);break;case qt:e.y=e.y<0?0:1;break;case Ps:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Pi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===yt?Un:sl}set encoding(e){Pi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Un?yt:Vt}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Ko;Ut.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,r=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,S=(f+1)/2,C=(p+1)/2,w=(h+d)/4,A=(u+_)/4,F=(g+m)/4;return v>S&&v>C?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=w/n,s=A/n):S>C?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=w/r,s=F/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=A/s,r=F/s),this.set(n,r,s,t),this}let x=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sh extends vi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Pi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Un?yt:Vt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ut(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new cl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nn extends sh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class hl extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ah extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ki{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3];const d=s[o+0],f=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*_,x=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const C=Math.sqrt(v),w=Math.atan2(C,p*x);m=Math.sin(m*w)/C,a=Math.sin(a*w)/C}const S=a*x;if(l=l*m+d*S,c=c*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(r/2),u=a(s/2),d=l(n/2),f=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-r*a,this._w=o*h-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),h=2*(a*t-s*r),u=2*(s*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jr.copy(this).projectOnVector(e),this.sub(jr)}reflect(e){return this.sub(jr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jr=new R,qa=new ki;class zn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,kt):kt.fromBufferAttribute(s,o),kt.applyMatrix4(e.matrixWorld),this.expandByPoint(kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yi.copy(n.boundingBox)),Yi.applyMatrix4(e.matrixWorld),this.union(Yi)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,kt),kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(yi),Zi.subVectors(this.max,yi),Vn.subVectors(e.a,yi),kn.subVectors(e.b,yi),Wn.subVectors(e.c,yi),un.subVectors(kn,Vn),dn.subVectors(Wn,kn),bn.subVectors(Vn,Wn);let t=[0,-un.z,un.y,0,-dn.z,dn.y,0,-bn.z,bn.y,un.z,0,-un.x,dn.z,0,-dn.x,bn.z,0,-bn.x,-un.y,un.x,0,-dn.y,dn.x,0,-bn.y,bn.x,0];return!Qr(t,Vn,kn,Wn,Zi)||(t=[1,0,0,0,1,0,0,0,1],!Qr(t,Vn,kn,Wn,Zi))?!1:(Ji.crossVectors(un,dn),t=[Ji.x,Ji.y,Ji.z],Qr(t,Vn,kn,Wn,Zi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Qt=[new R,new R,new R,new R,new R,new R,new R,new R],kt=new R,Yi=new zn,Vn=new R,kn=new R,Wn=new R,un=new R,dn=new R,bn=new R,yi=new R,Zi=new R,Ji=new R,Tn=new R;function Qr(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Tn.fromArray(i,s);const a=r.x*Math.abs(Tn.x)+r.y*Math.abs(Tn.y)+r.z*Math.abs(Tn.z),l=e.dot(Tn),c=t.dot(Tn),h=n.dot(Tn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const oh=new zn,Si=new R,es=new R;class Bn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):oh.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Si.subVectors(e,this.center);const t=Si.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Si,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(es.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Si.copy(e.center).add(es)),this.expandByPoint(Si.copy(e.center).sub(es))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const en=new R,ts=new R,$i=new R,fn=new R,ns=new R,Ki=new R,is=new R;class ks{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,en)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=en.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(en.copy(this.origin).addScaledVector(this.direction,t),en.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ts.copy(e).add(t).multiplyScalar(.5),$i.copy(t).sub(e).normalize(),fn.copy(this.origin).sub(ts);const s=e.distanceTo(t)*.5,o=-this.direction.dot($i),a=fn.dot(this.direction),l=-fn.dot($i),c=fn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ts).addScaledVector($i,d),f}intersectSphere(e,t){en.subVectors(e.center,this.origin);const n=en.dot(this.direction),r=en.dot(en)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,en)!==null}intersectTriangle(e,t,n,r,s){ns.subVectors(t,e),Ki.subVectors(n,e),is.crossVectors(ns,Ki);let o=this.direction.dot(is),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;fn.subVectors(this.origin,e);const l=a*this.direction.dot(Ki.crossVectors(fn,Ki));if(l<0)return null;const c=a*this.direction.dot(ns.cross(fn));if(c<0||l+c>o)return null;const h=-a*fn.dot(is);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,r,s,o,a,l,c,h,u,d,f,g,_,m){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,h,u,d,f,g,_,m)}set(e,t,n,r,s,o,a,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Xn.setFromMatrixColumn(e,0).length(),s=1/Xn.setFromMatrixColumn(e,1).length(),o=1/Xn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lh,e,ch)}lookAt(e,t,n){const r=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),pn.crossVectors(n,Ft),pn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),pn.crossVectors(n,Ft)),pn.normalize(),ji.crossVectors(Ft,pn),r[0]=pn.x,r[4]=ji.x,r[8]=Ft.x,r[1]=pn.y,r[5]=ji.y,r[9]=Ft.y,r[2]=pn.z,r[6]=ji.z,r[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],v=n[7],S=n[11],C=n[15],w=r[0],A=r[4],F=r[8],M=r[12],b=r[1],z=r[5],W=r[9],ee=r[13],D=r[2],L=r[6],U=r[10],X=r[14],N=r[3],O=r[7],Y=r[11],j=r[15];return s[0]=o*w+a*b+l*D+c*N,s[4]=o*A+a*z+l*L+c*O,s[8]=o*F+a*W+l*U+c*Y,s[12]=o*M+a*ee+l*X+c*j,s[1]=h*w+u*b+d*D+f*N,s[5]=h*A+u*z+d*L+f*O,s[9]=h*F+u*W+d*U+f*Y,s[13]=h*M+u*ee+d*X+f*j,s[2]=g*w+_*b+m*D+p*N,s[6]=g*A+_*z+m*L+p*O,s[10]=g*F+_*W+m*U+p*Y,s[14]=g*M+_*ee+m*X+p*j,s[3]=x*w+v*b+S*D+C*N,s[7]=x*A+v*z+S*L+C*O,s[11]=x*F+v*W+S*U+C*Y,s[15]=x*M+v*ee+S*X+C*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*u-r*c*u-s*a*d+n*c*d+r*a*f-n*l*f)+_*(+t*l*f-t*c*d+s*o*d-r*o*f+r*c*h-s*l*h)+m*(+t*c*u-t*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+p*(-r*a*h-t*l*u+t*a*d+r*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=u*m*c-_*d*c+_*l*f-a*m*f-u*l*p+a*d*p,v=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,S=h*_*c-g*u*c+g*a*f-o*_*f-h*a*p+o*u*p,C=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,w=t*x+n*v+r*S+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=x*A,e[1]=(_*d*s-u*m*s-_*r*f+n*m*f+u*r*p-n*d*p)*A,e[2]=(a*m*s-_*l*s+_*r*c-n*m*c-a*r*p+n*l*p)*A,e[3]=(u*l*s-a*d*s-u*r*c+n*d*c+a*r*f-n*l*f)*A,e[4]=v*A,e[5]=(h*m*s-g*d*s+g*r*f-t*m*f-h*r*p+t*d*p)*A,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*A,e[7]=(o*d*s-h*l*s+h*r*c-t*d*c-o*r*f+t*l*f)*A,e[8]=S*A,e[9]=(g*u*s-h*_*s-g*n*f+t*_*f+h*n*p-t*u*p)*A,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*p+t*a*p)*A,e[11]=(h*a*s-o*u*s-h*n*c+t*u*c+o*n*f-t*a*f)*A,e[12]=C*A,e[13]=(h*_*r-g*u*r+g*n*d-t*_*d-h*n*m+t*u*m)*A,e[14]=(g*a*r-o*_*r-g*n*l+t*_*l+o*n*m-t*a*m)*A,e[15]=(o*u*r-h*a*r+h*n*l-t*u*l-o*n*d+t*a*d)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+n,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,g=s*u,_=o*h,m=o*u,p=a*u,x=l*c,v=l*h,S=l*u,C=n.x,w=n.y,A=n.z;return r[0]=(1-(_+p))*C,r[1]=(f+S)*C,r[2]=(g-v)*C,r[3]=0,r[4]=(f-S)*w,r[5]=(1-(d+p))*w,r[6]=(m+x)*w,r[7]=0,r[8]=(g+v)*A,r[9]=(m-x)*A,r[10]=(1-(d+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Xn.set(r[0],r[1],r[2]).length();const o=Xn.set(r[4],r[5],r[6]).length(),a=Xn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Wt.copy(this);const c=1/s,h=1/o,u=1/a;return Wt.elements[0]*=c,Wt.elements[1]*=c,Wt.elements[2]*=c,Wt.elements[4]*=h,Wt.elements[5]*=h,Wt.elements[6]*=h,Wt.elements[8]*=u,Wt.elements[9]*=u,Wt.elements[10]*=u,t.setFromRotationMatrix(Wt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=ln){const l=this.elements,c=2*s/(t-e),h=2*s/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r);let f,g;if(a===ln)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Lr)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=ln){const l=this.elements,c=1/(t-e),h=1/(n-r),u=1/(o-s),d=(t+e)*c,f=(n+r)*h;let g,_;if(a===ln)g=(o+s)*u,_=-2*u;else if(a===Lr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Xn=new R,Wt=new tt,lh=new R(0,0,0),ch=new R(1,1,1),pn=new R,ji=new R,Ft=new R,Ya=new tt,Za=new ki;class Fr{constructor(e=0,t=0,n=0,r=Fr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(St(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-St(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(St(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(St(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-St(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ya.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ya,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Za.setFromEuler(this),this.setFromQuaternion(Za,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fr.DEFAULT_ORDER="XYZ";class ul{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hh=0;const Ja=new R,qn=new ki,tn=new tt,Qi=new R,Ei=new R,uh=new R,dh=new ki,$a=new R(1,0,0),Ka=new R(0,1,0),ja=new R(0,0,1),fh={type:"added"},ph={type:"removed"};class dt extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=On(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new R,t=new Fr,n=new ki,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new tt},normalMatrix:{value:new Ve}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qn.setFromAxisAngle(e,t),this.quaternion.multiply(qn),this}rotateOnWorldAxis(e,t){return qn.setFromAxisAngle(e,t),this.quaternion.premultiply(qn),this}rotateX(e){return this.rotateOnAxis($a,e)}rotateY(e){return this.rotateOnAxis(Ka,e)}rotateZ(e){return this.rotateOnAxis(ja,e)}translateOnAxis(e,t){return Ja.copy(e).applyQuaternion(this.quaternion),this.position.add(Ja.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($a,e)}translateY(e){return this.translateOnAxis(Ka,e)}translateZ(e){return this.translateOnAxis(ja,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qi.copy(e):Qi.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ei.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tn.lookAt(Ei,Qi,this.up):tn.lookAt(Qi,Ei,this.up),this.quaternion.setFromRotationMatrix(tn),r&&(tn.extractRotation(r.matrixWorld),qn.setFromRotationMatrix(tn),this.quaternion.premultiply(qn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(fh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ph)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(tn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ei,e,uh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ei,dh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}dt.DEFAULT_UP=new R(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xt=new R,nn=new R,rs=new R,rn=new R,Yn=new R,Zn=new R,Qa=new R,ss=new R,as=new R,os=new R;let er=!1;class Ht{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Xt.subVectors(e,t),r.cross(Xt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Xt.subVectors(r,t),nn.subVectors(n,t),rs.subVectors(e,t);const o=Xt.dot(Xt),a=Xt.dot(nn),l=Xt.dot(rs),c=nn.dot(nn),h=nn.dot(rs),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,rn)===null?!1:rn.x>=0&&rn.y>=0&&rn.x+rn.y<=1}static getUV(e,t,n,r,s,o,a,l){return er===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),er=!0),this.getInterpolation(e,t,n,r,s,o,a,l)}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,rn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,rn.x),l.addScaledVector(o,rn.y),l.addScaledVector(a,rn.z),l)}static isFrontFacing(e,t,n,r){return Xt.subVectors(n,t),nn.subVectors(e,t),Xt.cross(nn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),Xt.cross(nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ht.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ht.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return er===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),er=!0),Ht.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return Ht.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Ht.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ht.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Yn.subVectors(r,n),Zn.subVectors(s,n),ss.subVectors(e,n);const l=Yn.dot(ss),c=Zn.dot(ss);if(l<=0&&c<=0)return t.copy(n);as.subVectors(e,r);const h=Yn.dot(as),u=Zn.dot(as);if(h>=0&&u<=h)return t.copy(r);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Yn,o);os.subVectors(e,s);const f=Yn.dot(os),g=Zn.dot(os);if(g>=0&&f<=g)return t.copy(s);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Zn,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Qa.subVectors(s,r),a=(u-h)/(u-h+(f-g)),t.copy(r).addScaledVector(Qa,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Yn,o).addScaledVector(Zn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const dl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mn={h:0,s:0,l:0},tr={h:0,s:0,l:0};function ls(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class _e{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Je.workingColorSpace){if(e=Vs(e,1),t=St(t,0,1),n=St(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=ls(o,s,e+1/3),this.g=ls(o,s,e),this.b=ls(o,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,t=yt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=dl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=$r(e.r),this.g=$r(e.g),this.b=$r(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return Je.fromWorkingColorSpace(Tt.copy(this),e),Math.round(St(Tt.r*255,0,255))*65536+Math.round(St(Tt.g*255,0,255))*256+Math.round(St(Tt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace(Tt.copy(this),t);const n=Tt.r,r=Tt.g,s=Tt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=yt){Je.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,n=Tt.g,r=Tt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(mn),this.setHSL(mn.h+e,mn.s+t,mn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(mn),e.getHSL(tr);const n=Li(mn.h,tr.h,t),r=Li(mn.s,tr.s,t),s=Li(mn.l,tr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new _e;_e.NAMES=dl;let mh=0;class _i extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=On(),this.name="",this.type="Material",this.blending=hi,this.side=cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ws,this.blendDst=As,this.blendEquation=Ln,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _e(0,0,0),this.blendAlpha=0,this.depthFunc=wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gn,this.stencilZFail=Gn,this.stencilZPass=Gn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(n.blending=this.blending),this.side!==cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ws&&(n.blendSrc=this.blendSrc),this.blendDst!==As&&(n.blendDst=this.blendDst),this.blendEquation!==Ln&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Lt extends _i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=$o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new R,nr=new ce;class ht{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ba,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)nr.fromBufferAttribute(this,t),nr.applyMatrix3(e),this.setXY(t,nr.x,nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),r=Rt(r,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ba&&(e.usage=this.usage),e}}class fl extends ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class pl extends ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Fe extends ht{constructor(e,t,n){super(new Float32Array(e),t,n)}}let gh=0;const Gt=new tt,cs=new dt,Jn=new R,Ot=new zn,bi=new zn,vt=new R;class et extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=On(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ol(e)?pl:fl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,n){return Gt.makeTranslation(e,t,n),this.applyMatrix4(Gt),this}scale(e,t,n){return Gt.makeScale(e,t,n),this.applyMatrix4(Gt),this}lookAt(e){return cs.lookAt(e),cs.updateMatrix(),this.applyMatrix4(cs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Jn).negate(),this.translate(Jn.x,Jn.y,Jn.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Fe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Ot.setFromBufferAttribute(s),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Ot.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Ot.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Ot.min),this.boundingBox.expandByPoint(Ot.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Ot.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];bi.setFromBufferAttribute(a),this.morphTargetsRelative?(vt.addVectors(Ot.min,bi.min),Ot.expandByPoint(vt),vt.addVectors(Ot.max,bi.max),Ot.expandByPoint(vt)):(Ot.expandByPoint(bi.min),Ot.expandByPoint(bi.max))}Ot.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)vt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(vt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)vt.fromBufferAttribute(a,c),l&&(Jn.fromBufferAttribute(e,c),vt.add(Jn)),r=Math.max(r,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ht(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let b=0;b<a;b++)c[b]=new R,h[b]=new R;const u=new R,d=new R,f=new R,g=new ce,_=new ce,m=new ce,p=new R,x=new R;function v(b,z,W){u.fromArray(r,b*3),d.fromArray(r,z*3),f.fromArray(r,W*3),g.fromArray(o,b*2),_.fromArray(o,z*2),m.fromArray(o,W*2),d.sub(u),f.sub(u),_.sub(g),m.sub(g);const ee=1/(_.x*m.y-m.x*_.y);isFinite(ee)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar(ee),x.copy(f).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(ee),c[b].add(p),c[z].add(p),c[W].add(p),h[b].add(x),h[z].add(x),h[W].add(x))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let b=0,z=S.length;b<z;++b){const W=S[b],ee=W.start,D=W.count;for(let L=ee,U=ee+D;L<U;L+=3)v(n[L+0],n[L+1],n[L+2])}const C=new R,w=new R,A=new R,F=new R;function M(b){A.fromArray(s,b*3),F.copy(A);const z=c[b];C.copy(z),C.sub(A.multiplyScalar(A.dot(z))).normalize(),w.crossVectors(F,z);const ee=w.dot(h[b])<0?-1:1;l[b*4]=C.x,l[b*4+1]=C.y,l[b*4+2]=C.z,l[b*4+3]=ee}for(let b=0,z=S.length;b<z;++b){const W=S[b],ee=W.start,D=W.count;for(let L=ee,U=ee+D;L<U;L+=3)M(n[L+0]),M(n[L+1]),M(n[L+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const r=new R,s=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new ht(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new et,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eo=new tt,wn=new ks,ir=new Bn,to=new R,$n=new R,Kn=new R,jn=new R,hs=new R,rr=new R,sr=new ce,ar=new ce,or=new ce,no=new R,io=new R,ro=new R,lr=new R,cr=new R;class Xe extends dt{constructor(e=new et,t=new Lt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){rr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(hs.fromBufferAttribute(u,e),o?rr.addScaledVector(hs,h):rr.addScaledVector(hs.sub(t),h))}t.add(rr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(s),wn.copy(e.ray).recast(e.near),!(ir.containsPoint(wn.origin)===!1&&(wn.intersectSphere(ir,to)===null||wn.origin.distanceToSquared(to)>(e.far-e.near)**2))&&(eo.copy(s).invert(),wn.copy(e.ray).applyMatrix4(eo),!(n.boundingBox!==null&&wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=x,C=v;S<C;S+=3){const w=a.getX(S),A=a.getX(S+1),F=a.getX(S+2);r=hr(this,p,e,n,c,h,u,w,A,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=a.getX(m),v=a.getX(m+1),S=a.getX(m+2);r=hr(this,o,e,n,c,h,u,x,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=x,C=v;S<C;S+=3){const w=S,A=S+1,F=S+2;r=hr(this,p,e,n,c,h,u,w,A,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=m,v=m+1,S=m+2;r=hr(this,o,e,n,c,h,u,x,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function vh(i,e,t,n,r,s,o,a){let l;if(e.side===Dt?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===cn,a),l===null)return null;cr.copy(a),cr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(cr);return c<t.near||c>t.far?null:{distance:c,point:cr.clone(),object:i}}function hr(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,$n),i.getVertexPosition(l,Kn),i.getVertexPosition(c,jn);const h=vh(i,e,t,n,$n,Kn,jn,lr);if(h){r&&(sr.fromBufferAttribute(r,a),ar.fromBufferAttribute(r,l),or.fromBufferAttribute(r,c),h.uv=Ht.getInterpolation(lr,$n,Kn,jn,sr,ar,or,new ce)),s&&(sr.fromBufferAttribute(s,a),ar.fromBufferAttribute(s,l),or.fromBufferAttribute(s,c),h.uv1=Ht.getInterpolation(lr,$n,Kn,jn,sr,ar,or,new ce),h.uv2=h.uv1),o&&(no.fromBufferAttribute(o,a),io.fromBufferAttribute(o,l),ro.fromBufferAttribute(o,c),h.normal=Ht.getInterpolation(lr,$n,Kn,jn,no,io,ro,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new R,materialIndex:0};Ht.getNormal($n,Kn,jn,u.normal),h.face=u}return h}class yn extends et{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Fe(c,3)),this.setAttribute("normal",new Fe(h,3)),this.setAttribute("uv",new Fe(u,2));function g(_,m,p,x,v,S,C,w,A,F,M){const b=S/A,z=C/F,W=S/2,ee=C/2,D=w/2,L=A+1,U=F+1;let X=0,N=0;const O=new R;for(let Y=0;Y<U;Y++){const j=Y*z-ee;for(let se=0;se<L;se++){const q=se*b-W;O[_]=q*x,O[m]=j*v,O[p]=D,c.push(O.x,O.y,O.z),O[_]=0,O[m]=0,O[p]=w>0?1:-1,h.push(O.x,O.y,O.z),u.push(se/A),u.push(1-Y/F),X+=1}}for(let Y=0;Y<F;Y++)for(let j=0;j<A;j++){const se=d+j+L*Y,q=d+j+L*(Y+1),Z=d+(j+1)+L*(Y+1),oe=d+(j+1)+L*Y;l.push(se,q,oe),l.push(q,Z,oe),N+=6}a.addGroup(f,N,M),f+=N,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function gi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Pt(i){const e={};for(let t=0;t<i.length;t++){const n=gi(i[t]);for(const r in n)e[r]=n[r]}return e}function _h(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ml(i){return i.getRenderTarget()===null?i.outputColorSpace:Je.workingColorSpace}const xh={clone:gi,merge:Pt};var Mh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _t extends _i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mh,this.fragmentShader=yh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gi(e.uniforms),this.uniformsGroups=_h(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class gl extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=ln}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class zt extends gl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ui*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zi*2*Math.atan(Math.tan(ui*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ui*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Qn=-90,ei=1;class Sh extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new zt(Qn,ei,e,t);r.layers=this.layers,this.add(r);const s=new zt(Qn,ei,e,t);s.layers=this.layers,this.add(s);const o=new zt(Qn,ei,e,t);o.layers=this.layers,this.add(o);const a=new zt(Qn,ei,e,t);a.layers=this.layers,this.add(a);const l=new zt(Qn,ei,e,t);l.layers=this.layers,this.add(l);const c=new zt(Qn,ei,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===ln)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class vl extends Ut{constructor(e,t,n,r,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:fi,super(e,t,n,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Eh extends Nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Pi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Un?yt:Vt),this.texture=new vl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:It}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new yn(5,5,5),s=new _t({name:"CubemapFromEquirect",uniforms:gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dt,blending:_n});s.uniforms.tEquirect.value=t;const o=new Xe(r,s),a=t.minFilter;return t.minFilter===Fi&&(t.minFilter=It),new Sh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const us=new R,bh=new R,Th=new Ve;class Cn{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=us.subVectors(n,t).cross(bh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(us),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Th.getNormalMatrix(e),r=this.coplanarPoint(us).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const An=new Bn,ur=new R;class Ws{constructor(e=new Cn,t=new Cn,n=new Cn,r=new Cn,s=new Cn,o=new Cn){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ln){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],d=r[7],f=r[8],g=r[9],_=r[10],m=r[11],p=r[12],x=r[13],v=r[14],S=r[15];if(n[0].setComponents(l-s,d-c,m-f,S-p).normalize(),n[1].setComponents(l+s,d+c,m+f,S+p).normalize(),n[2].setComponents(l+o,d+h,m+g,S+x).normalize(),n[3].setComponents(l-o,d-h,m-g,S-x).normalize(),n[4].setComponents(l-a,d-u,m-_,S-v).normalize(),t===ln)n[5].setComponents(l+a,d+u,m+_,S+v).normalize();else if(t===Lr)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),An.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),An.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(An)}intersectsSprite(e){return An.center.set(0,0,0),An.radius=.7071067811865476,An.applyMatrix4(e.matrixWorld),this.intersectsSphere(An)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ur.x=r.normal.x>0?e.max.x:e.min.x,ur.y=r.normal.y>0?e.max.y:e.min.y,ur.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ur)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function _l(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function wh(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,h){const u=c.array,d=c.usage,f=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,d),c.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function s(c,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,c),f.count===-1&&g.length===0&&i.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?i.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):i.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,r(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}class on extends et{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const x=p*d-o;for(let v=0;v<c;v++){const S=v*u-s;g.push(S,-x,0),_.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const v=x+c*p,S=x+c*(p+1),C=x+1+c*(p+1),w=x+1+c*p;f.push(v,S,w),f.push(S,C,w)}this.setIndex(f),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(_,3)),this.setAttribute("uv",new Fe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new on(e.width,e.height,e.widthSegments,e.heightSegments)}}var Ah=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ch=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ph=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Dh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ih=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Uh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Oh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Jh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,$h=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Kh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,iu="gl_FragColor = linearToOutputTexel( gl_FragColor );",ru=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,su=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,au=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ou=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,du=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,gu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_u=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Mu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Su=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Eu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Au=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ru=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Du=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Iu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Uu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ou=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gu=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Vu=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,ku=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Wu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ju=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$u=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ku=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ju=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ed=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,td=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,id=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ad=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,od=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ld=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,cd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ud=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,md=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_d=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Md=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
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
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Sd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ed=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Td=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ad=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ld=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Id=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Ud=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Nd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Fd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Od=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Hd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Xd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$d=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Kd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ef=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,af=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ue={alphahash_fragment:Ah,alphahash_pars_fragment:Ch,alphamap_fragment:Rh,alphamap_pars_fragment:Lh,alphatest_fragment:Ph,alphatest_pars_fragment:Dh,aomap_fragment:Ih,aomap_pars_fragment:Uh,batching_pars_vertex:Nh,batching_vertex:Fh,begin_vertex:Oh,beginnormal_vertex:zh,bsdfs:Bh,iridescence_fragment:Gh,bumpmap_pars_fragment:Hh,clipping_planes_fragment:Vh,clipping_planes_pars_fragment:kh,clipping_planes_pars_vertex:Wh,clipping_planes_vertex:Xh,color_fragment:qh,color_pars_fragment:Yh,color_pars_vertex:Zh,color_vertex:Jh,common:$h,cube_uv_reflection_fragment:Kh,defaultnormal_vertex:jh,displacementmap_pars_vertex:Qh,displacementmap_vertex:eu,emissivemap_fragment:tu,emissivemap_pars_fragment:nu,colorspace_fragment:iu,colorspace_pars_fragment:ru,envmap_fragment:su,envmap_common_pars_fragment:au,envmap_pars_fragment:ou,envmap_pars_vertex:lu,envmap_physical_pars_fragment:Mu,envmap_vertex:cu,fog_vertex:hu,fog_pars_vertex:uu,fog_fragment:du,fog_pars_fragment:fu,gradientmap_pars_fragment:pu,lightmap_fragment:mu,lightmap_pars_fragment:gu,lights_lambert_fragment:vu,lights_lambert_pars_fragment:_u,lights_pars_begin:xu,lights_toon_fragment:yu,lights_toon_pars_fragment:Su,lights_phong_fragment:Eu,lights_phong_pars_fragment:bu,lights_physical_fragment:Tu,lights_physical_pars_fragment:wu,lights_fragment_begin:Au,lights_fragment_maps:Cu,lights_fragment_end:Ru,logdepthbuf_fragment:Lu,logdepthbuf_pars_fragment:Pu,logdepthbuf_pars_vertex:Du,logdepthbuf_vertex:Iu,map_fragment:Uu,map_pars_fragment:Nu,map_particle_fragment:Fu,map_particle_pars_fragment:Ou,metalnessmap_fragment:zu,metalnessmap_pars_fragment:Bu,morphcolor_vertex:Gu,morphnormal_vertex:Hu,morphtarget_pars_vertex:Vu,morphtarget_vertex:ku,normal_fragment_begin:Wu,normal_fragment_maps:Xu,normal_pars_fragment:qu,normal_pars_vertex:Yu,normal_vertex:Zu,normalmap_pars_fragment:Ju,clearcoat_normal_fragment_begin:$u,clearcoat_normal_fragment_maps:Ku,clearcoat_pars_fragment:ju,iridescence_pars_fragment:Qu,opaque_fragment:ed,packing:td,premultiplied_alpha_fragment:nd,project_vertex:id,dithering_fragment:rd,dithering_pars_fragment:sd,roughnessmap_fragment:ad,roughnessmap_pars_fragment:od,shadowmap_pars_fragment:ld,shadowmap_pars_vertex:cd,shadowmap_vertex:hd,shadowmask_pars_fragment:ud,skinbase_vertex:dd,skinning_pars_vertex:fd,skinning_vertex:pd,skinnormal_vertex:md,specularmap_fragment:gd,specularmap_pars_fragment:vd,tonemapping_fragment:_d,tonemapping_pars_fragment:xd,transmission_fragment:Md,transmission_pars_fragment:yd,uv_pars_fragment:Sd,uv_pars_vertex:Ed,uv_vertex:bd,worldpos_vertex:Td,background_vert:wd,background_frag:Ad,backgroundCube_vert:Cd,backgroundCube_frag:Rd,cube_vert:Ld,cube_frag:Pd,depth_vert:Dd,depth_frag:Id,distanceRGBA_vert:Ud,distanceRGBA_frag:Nd,equirect_vert:Fd,equirect_frag:Od,linedashed_vert:zd,linedashed_frag:Bd,meshbasic_vert:Gd,meshbasic_frag:Hd,meshlambert_vert:Vd,meshlambert_frag:kd,meshmatcap_vert:Wd,meshmatcap_frag:Xd,meshnormal_vert:qd,meshnormal_frag:Yd,meshphong_vert:Zd,meshphong_frag:Jd,meshphysical_vert:$d,meshphysical_frag:Kd,meshtoon_vert:jd,meshtoon_frag:Qd,points_vert:ef,points_frag:tf,shadow_vert:nf,shadow_frag:rf,sprite_vert:sf,sprite_frag:af},ne={common:{diffuse:{value:new _e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new _e(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},$t={basic:{uniforms:Pt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:Pt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new _e(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:Pt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new _e(0)},specular:{value:new _e(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:Pt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new _e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:Pt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new _e(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:Pt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:Pt([ne.points,ne.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:Pt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:Pt([ne.common,ne.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:Pt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:Pt([ne.sprite,ne.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:Pt([ne.common,ne.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:Pt([ne.lights,ne.fog,{color:{value:new _e(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};$t.physical={uniforms:Pt([$t.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new _e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new _e(0)},specularColor:{value:new _e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const dr={r:0,b:0,g:0};function of(i,e,t,n,r,s,o){const a=new _e(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(m,p){let x=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,l):v&&v.isColor&&(_(v,1),x=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Ur)?(h===void 0&&(h=new Xe(new yn(1,1,1),new _t({name:"BackgroundCubeMaterial",uniforms:gi($t.backgroundCube.uniforms),vertexShader:$t.backgroundCube.vertexShader,fragmentShader:$t.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Je.getTransfer(v.colorSpace)!==nt,(u!==v||d!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Xe(new on(2,2),new _t({name:"BackgroundMaterial",uniforms:gi($t.background.uniforms),vertexShader:$t.background.vertexShader,fragmentShader:$t.background.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Je.getTransfer(v.colorSpace)!==nt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(dr,ml(i)),n.buffers.color.setClear(dr.r,dr.g,dr.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function lf(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let c=l,h=!1;function u(D,L,U,X,N){let O=!1;if(o){const Y=_(X,U,L);c!==Y&&(c=Y,f(c.object)),O=p(D,X,U,N),O&&x(D,X,U,N)}else{const Y=L.wireframe===!0;(c.geometry!==X.id||c.program!==U.id||c.wireframe!==Y)&&(c.geometry=X.id,c.program=U.id,c.wireframe=Y,O=!0)}N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(O||h)&&(h=!1,F(D,L,U,X),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function d(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function f(D){return n.isWebGL2?i.bindVertexArray(D):s.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?i.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function _(D,L,U){const X=U.wireframe===!0;let N=a[D.id];N===void 0&&(N={},a[D.id]=N);let O=N[L.id];O===void 0&&(O={},N[L.id]=O);let Y=O[X];return Y===void 0&&(Y=m(d()),O[X]=Y),Y}function m(D){const L=[],U=[],X=[];for(let N=0;N<r;N++)L[N]=0,U[N]=0,X[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:X,object:D,attributes:{},index:null}}function p(D,L,U,X){const N=c.attributes,O=L.attributes;let Y=0;const j=U.getAttributes();for(const se in j)if(j[se].location>=0){const Z=N[se];let oe=O[se];if(oe===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(oe=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(oe=D.instanceColor)),Z===void 0||Z.attribute!==oe||oe&&Z.data!==oe.data)return!0;Y++}return c.attributesNum!==Y||c.index!==X}function x(D,L,U,X){const N={},O=L.attributes;let Y=0;const j=U.getAttributes();for(const se in j)if(j[se].location>=0){let Z=O[se];Z===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(Z=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(Z=D.instanceColor));const oe={};oe.attribute=Z,Z&&Z.data&&(oe.data=Z.data),N[se]=oe,Y++}c.attributes=N,c.attributesNum=Y,c.index=X}function v(){const D=c.newAttributes;for(let L=0,U=D.length;L<U;L++)D[L]=0}function S(D){C(D,0)}function C(D,L){const U=c.newAttributes,X=c.enabledAttributes,N=c.attributeDivisors;U[D]=1,X[D]===0&&(i.enableVertexAttribArray(D),X[D]=1),N[D]!==L&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,L),N[D]=L)}function w(){const D=c.newAttributes,L=c.enabledAttributes;for(let U=0,X=L.length;U<X;U++)L[U]!==D[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function A(D,L,U,X,N,O,Y){Y===!0?i.vertexAttribIPointer(D,L,U,N,O):i.vertexAttribPointer(D,L,U,X,N,O)}function F(D,L,U,X){if(n.isWebGL2===!1&&(D.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const N=X.attributes,O=U.getAttributes(),Y=L.defaultAttributeValues;for(const j in O){const se=O[j];if(se.location>=0){let q=N[j];if(q===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(q=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(q=D.instanceColor)),q!==void 0){const Z=q.normalized,oe=q.itemSize,pe=t.get(q);if(pe===void 0)continue;const de=pe.buffer,Le=pe.type,De=pe.bytesPerElement,Ee=n.isWebGL2===!0&&(Le===i.INT||Le===i.UNSIGNED_INT||q.gpuType===jo);if(q.isInterleavedBufferAttribute){const We=q.data,B=We.stride,wt=q.offset;if(We.isInstancedInterleavedBuffer){for(let xe=0;xe<se.locationSize;xe++)C(se.location+xe,We.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let xe=0;xe<se.locationSize;xe++)S(se.location+xe);i.bindBuffer(i.ARRAY_BUFFER,de);for(let xe=0;xe<se.locationSize;xe++)A(se.location+xe,oe/se.locationSize,Le,Z,B*De,(wt+oe/se.locationSize*xe)*De,Ee)}else{if(q.isInstancedBufferAttribute){for(let We=0;We<se.locationSize;We++)C(se.location+We,q.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let We=0;We<se.locationSize;We++)S(se.location+We);i.bindBuffer(i.ARRAY_BUFFER,de);for(let We=0;We<se.locationSize;We++)A(se.location+We,oe/se.locationSize,Le,Z,oe*De,oe/se.locationSize*We*De,Ee)}}else if(Y!==void 0){const Z=Y[j];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(se.location,Z);break;case 3:i.vertexAttrib3fv(se.location,Z);break;case 4:i.vertexAttrib4fv(se.location,Z);break;default:i.vertexAttrib1fv(se.location,Z)}}}}w()}function M(){W();for(const D in a){const L=a[D];for(const U in L){const X=L[U];for(const N in X)g(X[N].object),delete X[N];delete L[U]}delete a[D]}}function b(D){if(a[D.id]===void 0)return;const L=a[D.id];for(const U in L){const X=L[U];for(const N in X)g(X[N].object),delete X[N];delete L[U]}delete a[D.id]}function z(D){for(const L in a){const U=a[L];if(U[D.id]===void 0)continue;const X=U[D.id];for(const N in X)g(X[N].object),delete X[N];delete U[D.id]}}function W(){ee(),h=!0,c!==l&&(c=l,f(c.object))}function ee(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:W,resetDefaultState:ee,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfProgram:z,initAttributes:v,enableAttribute:S,disableUnusedAttributes:w}}function cf(i,e,t,n){const r=n.isWebGL2;let s;function o(h){s=h}function a(h,u){i.drawArrays(s,h,u),t.update(u,s,1)}function l(h,u,d){if(d===0)return;let f,g;if(r)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](s,h,u,d),t.update(u,s,d)}function c(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(s,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function hf(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,S=o||e.has("OES_texture_float"),C=v&&S,w=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:S,floatVertexTextures:C,maxSamples:w}}function uf(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Cn,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||r;return r=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const x=s?0:n,v=x*4;let S=p.clippingState||null;l.value=S,S=h(g,d,v,f);for(let C=0;C!==v;++C)S[C]=t[C];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,S=f;v!==_;++v,S+=4)o.copy(u[v]).applyMatrix4(x,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function df(i){let e=new WeakMap;function t(o,a){return a===Cs?o.mapping=fi:a===Rs&&(o.mapping=pi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Cs||a===Rs)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Eh(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class xl extends gl{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const si=4,so=[.125,.215,.35,.446,.526,.582],Pn=20,ds=new xl,ao=new _e;let fs=null,ps=0,ms=0;const Rn=(1+Math.sqrt(5))/2,ti=1/Rn,oo=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,Rn,ti),new R(0,Rn,-ti),new R(ti,0,Rn),new R(-ti,0,Rn),new R(Rn,ti,0),new R(-Rn,ti,0)];class lo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){fs=this._renderer.getRenderTarget(),ps=this._renderer.getActiveCubeFace(),ms=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ho(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fs,ps,ms),e.scissorTest=!1,fr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fi||e.mapping===pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fs=this._renderer.getRenderTarget(),ps=this._renderer.getActiveCubeFace(),ms=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:Oi,format:Yt,colorSpace:hn,depthBuffer:!1},r=co(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=co(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ff(s)),this._blurMaterial=pf(s,e,t)}return r}_compileMaterial(e){const t=new Xe(this._lodPlanes[0],e);this._renderer.compile(t,ds)}_sceneToCubeUV(e,t,n,r){const a=new zt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(ao),h.toneMapping=xn,h.autoClear=!1;const f=new Lt({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),g=new Xe(new yn,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(ao),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const v=this._cubeSize;fr(r,x*v,p>2?v:0,v,v),h.setRenderTarget(r),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===fi||e.mapping===pi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=uo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ho());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Xe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;fr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ds)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=oo[(r-1)%oo.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Xe(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Pn-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):Pn;m>Pn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pn}`);const p=[];let x=0;for(let A=0;A<Pn;++A){const F=A/_,M=Math.exp(-F*F/2);p.push(M),A===0?x+=M:A<m&&(x+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const S=this._sizeLods[r],C=3*S*(r>v-si?r-v+si:0),w=4*(this._cubeSize-S);fr(t,C,w,3*S,2*S),l.setRenderTarget(t),l.render(u,ds)}}function ff(i){const e=[],t=[],n=[];let r=i;const s=i-si+1+so.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-si?l=so[o-i+si-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*f),v=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,F=w>2?0:-1,M=[A,F,0,A+2/3,F,0,A+2/3,F+1,0,A,F,0,A+2/3,F+1,0,A,F+1,0];x.set(M,_*g*w),v.set(d,m*g*w);const b=[w,w,w,w,w,w];S.set(b,p*g*w)}const C=new et;C.setAttribute("position",new ht(x,_)),C.setAttribute("uv",new ht(v,m)),C.setAttribute("faceIndex",new ht(S,p)),e.push(C),r>si&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function co(i,e,t){const n=new Nn(i,e,t);return n.texture.mapping=Ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function pf(i,e,t){const n=new Float32Array(Pn),r=new R(0,1,0);return new _t({name:"SphericalGaussianBlur",defines:{n:Pn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Xs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function ho(){return new _t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function uo(){return new _t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function Xs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mf(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Cs||l===Rs,h=l===fi||l===pi;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new lo(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&r(u)){t===null&&(t=new lo(i));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function gf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function vf(i,e,t,n){const r={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let v=0,S=x.length;v<S;v+=3){const C=x[v+0],w=x[v+1],A=x[v+2];d.push(C,w,w,A,A,C)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,S=x.length/3-1;v<S;v+=3){const C=v+0,w=v+1,A=v+2;d.push(C,w,w,A,A,C)}}else return;const m=new(ol(d)?pl:fl)(d,1);m.version=_;const p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function _f(i,e,t,n){const r=n.isWebGL2;let s;function o(f){s=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function h(f,g){i.drawElements(s,g,a,f*l),t.update(g,s,1)}function u(f,g,_){if(_===0)return;let m,p;if(r)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,a,f*l,_),t.update(g,s,_)}function d(f,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,a,f,0,_);let p=0;for(let x=0;x<_;x++)p+=g[x];t.update(p,s,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function xf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Mf(i,e){return i[0]-e[0]}function yf(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Sf(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,o=new it,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0;let _=s.get(h);if(_===void 0||_.count!==g){let D=function(){W.dispose(),s.delete(h),h.removeEventListener("dispose",D)};_!==void 0&&_.texture.dispose();const x=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],A=h.morphAttributes.color||[];let F=0;x===!0&&(F=1),v===!0&&(F=2),S===!0&&(F=3);let M=h.attributes.position.count*F,b=1;M>e.maxTextureSize&&(b=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const z=new Float32Array(M*b*4*g),W=new hl(z,M,b,g);W.type=vn,W.needsUpdate=!0;const ee=F*4;for(let L=0;L<g;L++){const U=C[L],X=w[L],N=A[L],O=M*b*4*L;for(let Y=0;Y<U.count;Y++){const j=Y*ee;x===!0&&(o.fromBufferAttribute(U,Y),z[O+j+0]=o.x,z[O+j+1]=o.y,z[O+j+2]=o.z,z[O+j+3]=0),v===!0&&(o.fromBufferAttribute(X,Y),z[O+j+4]=o.x,z[O+j+5]=o.y,z[O+j+6]=o.z,z[O+j+7]=0),S===!0&&(o.fromBufferAttribute(N,Y),z[O+j+8]=o.x,z[O+j+9]=o.y,z[O+j+10]=o.z,z[O+j+11]=N.itemSize===4?o.w:1)}}_={count:g,texture:W,size:new ce(M,b)},s.set(h,_),h.addEventListener("dispose",D)}let m=0;for(let x=0;x<d.length;x++)m+=d[x];const p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",p),u.getUniforms().setValue(i,"morphTargetInfluences",d),u.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{const f=d===void 0?0:d.length;let g=n[h.id];if(g===void 0||g.length!==f){g=[];for(let v=0;v<f;v++)g[v]=[v,0];n[h.id]=g}for(let v=0;v<f;v++){const S=g[v];S[0]=v,S[1]=d[v]}g.sort(yf);for(let v=0;v<8;v++)v<f&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(Mf);const _=h.morphAttributes.position,m=h.morphAttributes.normal;let p=0;for(let v=0;v<8;v++){const S=a[v],C=S[0],w=S[1];C!==Number.MAX_SAFE_INTEGER&&w?(_&&h.getAttribute("morphTarget"+v)!==_[C]&&h.setAttribute("morphTarget"+v,_[C]),m&&h.getAttribute("morphNormal"+v)!==m[C]&&h.setAttribute("morphNormal"+v,m[C]),r[v]=w,p+=w):(_&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),m&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),r[v]=0)}const x=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function Ef(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class Ml extends Ut{constructor(e,t,n,r,s,o,a,l,c,h){if(h=h!==void 0?h:In,h!==In&&h!==mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===In&&(n=gn),n===void 0&&h===mi&&(n=Dn),super(null,r,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Mt,this.minFilter=l!==void 0?l:Mt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const yl=new Ut,Sl=new Ml(1,1);Sl.compareFunction=al;const El=new hl,bl=new ah,Tl=new vl,fo=[],po=[],mo=new Float32Array(16),go=new Float32Array(9),vo=new Float32Array(4);function xi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=fo[r];if(s===void 0&&(s=new Float32Array(r),fo[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Or(i,e){let t=po[e];t===void 0&&(t=new Int32Array(e),po[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function bf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Tf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2fv(this.addr,e),pt(t,e)}}function wf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;i.uniform3fv(this.addr,e),pt(t,e)}}function Af(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4fv(this.addr,e),pt(t,e)}}function Cf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;vo.set(n),i.uniformMatrix2fv(this.addr,!1,vo),pt(t,n)}}function Rf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;go.set(n),i.uniformMatrix3fv(this.addr,!1,go),pt(t,n)}}function Lf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;mo.set(n),i.uniformMatrix4fv(this.addr,!1,mo),pt(t,n)}}function Pf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Df(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2iv(this.addr,e),pt(t,e)}}function If(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3iv(this.addr,e),pt(t,e)}}function Uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4iv(this.addr,e),pt(t,e)}}function Nf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ff(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2uiv(this.addr,e),pt(t,e)}}function Of(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3uiv(this.addr,e),pt(t,e)}}function zf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4uiv(this.addr,e),pt(t,e)}}function Bf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?Sl:yl;t.setTexture2D(e||s,r)}function Gf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||bl,r)}function Hf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Tl,r)}function Vf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||El,r)}function kf(i){switch(i){case 5126:return bf;case 35664:return Tf;case 35665:return wf;case 35666:return Af;case 35674:return Cf;case 35675:return Rf;case 35676:return Lf;case 5124:case 35670:return Pf;case 35667:case 35671:return Df;case 35668:case 35672:return If;case 35669:case 35673:return Uf;case 5125:return Nf;case 36294:return Ff;case 36295:return Of;case 36296:return zf;case 35678:case 36198:case 36298:case 36306:case 35682:return Bf;case 35679:case 36299:case 36307:return Gf;case 35680:case 36300:case 36308:case 36293:return Hf;case 36289:case 36303:case 36311:case 36292:return Vf}}function Wf(i,e){i.uniform1fv(this.addr,e)}function Xf(i,e){const t=xi(e,this.size,2);i.uniform2fv(this.addr,t)}function qf(i,e){const t=xi(e,this.size,3);i.uniform3fv(this.addr,t)}function Yf(i,e){const t=xi(e,this.size,4);i.uniform4fv(this.addr,t)}function Zf(i,e){const t=xi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Jf(i,e){const t=xi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function $f(i,e){const t=xi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Kf(i,e){i.uniform1iv(this.addr,e)}function jf(i,e){i.uniform2iv(this.addr,e)}function Qf(i,e){i.uniform3iv(this.addr,e)}function ep(i,e){i.uniform4iv(this.addr,e)}function tp(i,e){i.uniform1uiv(this.addr,e)}function np(i,e){i.uniform2uiv(this.addr,e)}function ip(i,e){i.uniform3uiv(this.addr,e)}function rp(i,e){i.uniform4uiv(this.addr,e)}function sp(i,e,t){const n=this.cache,r=e.length,s=Or(t,r);ft(n,s)||(i.uniform1iv(this.addr,s),pt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||yl,s[o])}function ap(i,e,t){const n=this.cache,r=e.length,s=Or(t,r);ft(n,s)||(i.uniform1iv(this.addr,s),pt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||bl,s[o])}function op(i,e,t){const n=this.cache,r=e.length,s=Or(t,r);ft(n,s)||(i.uniform1iv(this.addr,s),pt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Tl,s[o])}function lp(i,e,t){const n=this.cache,r=e.length,s=Or(t,r);ft(n,s)||(i.uniform1iv(this.addr,s),pt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||El,s[o])}function cp(i){switch(i){case 5126:return Wf;case 35664:return Xf;case 35665:return qf;case 35666:return Yf;case 35674:return Zf;case 35675:return Jf;case 35676:return $f;case 5124:case 35670:return Kf;case 35667:case 35671:return jf;case 35668:case 35672:return Qf;case 35669:case 35673:return ep;case 5125:return tp;case 36294:return np;case 36295:return ip;case 36296:return rp;case 35678:case 36198:case 36298:case 36306:case 35682:return sp;case 35679:case 36299:case 36307:return ap;case 35680:case 36300:case 36308:case 36293:return op;case 36289:case 36303:case 36311:case 36292:return lp}}class hp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=kf(t.type)}}class up{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cp(t.type)}}class dp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const gs=/(\w+)(\])?(\[|\.)?/g;function _o(i,e){i.seq.push(e),i.map[e.id]=e}function fp(i,e,t){const n=i.name,r=n.length;for(gs.lastIndex=0;;){const s=gs.exec(n),o=gs.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){_o(t,c===void 0?new hp(a,i,e):new up(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new dp(a),_o(t,u)),t=u}}}class br{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);fp(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function xo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const pp=37297;let mp=0;function gp(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function vp(i){const e=Je.getPrimaries(Je.workingColorSpace),t=Je.getPrimaries(i);let n;switch(e===t?n="":e===Rr&&t===Cr?n="LinearDisplayP3ToLinearSRGB":e===Cr&&t===Rr&&(n="LinearSRGBToLinearDisplayP3"),i){case hn:case Nr:return[n,"LinearTransferOETF"];case yt:case Hs:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Mo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+gp(i.getShaderSource(e),o)}else return r}function _p(i,e){const t=vp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function xp(i,e){let t;switch(e){case mc:t="Linear";break;case gc:t="Reinhard";break;case vc:t="OptimizedCineon";break;case _c:t="ACESFilmic";break;case Mc:t="AgX";break;case xc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Mp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ai).join(`
`)}function yp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ai).join(`
`)}function Sp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ep(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ai(i){return i!==""}function yo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function So(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const bp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Us(i){return i.replace(bp,wp)}const Tp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function wp(i,e){let t=Ue[e];if(t===void 0){const n=Tp.get(e);if(n!==void 0)t=Ue[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Us(t)}const Ap=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eo(i){return i.replace(Ap,Cp)}function Cp(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function bo(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Rp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Jo?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===an&&(e="SHADOWMAP_TYPE_VSM"),e}function Lp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fi:case pi:e="ENVMAP_TYPE_CUBE";break;case Ur:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Pp(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case pi:e="ENVMAP_MODE_REFRACTION";break}return e}function Dp(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case $o:e="ENVMAP_BLENDING_MULTIPLY";break;case fc:e="ENVMAP_BLENDING_MIX";break;case pc:e="ENVMAP_BLENDING_ADD";break}return e}function Ip(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Up(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Rp(t),c=Lp(t),h=Pp(t),u=Dp(t),d=Ip(t),f=t.isWebGL2?"":Mp(t),g=yp(t),_=Sp(s),m=r.createProgram();let p,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ai).join(`
`),p.length>0&&(p+=`
`),x=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ai).join(`
`),x.length>0&&(x+=`
`)):(p=[bo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ai).join(`
`),x=[f,bo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xn?"#define TONE_MAPPING":"",t.toneMapping!==xn?Ue.tonemapping_pars_fragment:"",t.toneMapping!==xn?xp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,_p("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ai).join(`
`)),o=Us(o),o=yo(o,t),o=So(o,t),a=Us(a),a=yo(a,t),a=So(a,t),o=Eo(o),a=Eo(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Ga?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ga?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const S=v+p+o,C=v+x+a,w=xo(r,r.VERTEX_SHADER,S),A=xo(r,r.FRAGMENT_SHADER,C);r.attachShader(m,w),r.attachShader(m,A),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function F(W){if(i.debug.checkShaderErrors){const ee=r.getProgramInfoLog(m).trim(),D=r.getShaderInfoLog(w).trim(),L=r.getShaderInfoLog(A).trim();let U=!0,X=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(U=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,w,A);else{const N=Mo(r,w,"vertex"),O=Mo(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+N+`
`+O)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(D===""||L==="")&&(X=!1);X&&(W.diagnostics={runnable:U,programLog:ee,vertexShader:{log:D,prefix:p},fragmentShader:{log:L,prefix:x}})}r.deleteShader(w),r.deleteShader(A),M=new br(r,m),b=Ep(r,m)}let M;this.getUniforms=function(){return M===void 0&&F(this),M};let b;this.getAttributes=function(){return b===void 0&&F(this),b};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(m,pp)),z},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mp++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let Np=0;class Fp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Op(e),t.set(e,n)),n}}class Op{constructor(e){this.id=Np++,this.code=e,this.usedTimes=0}}function zp(i,e,t,n,r,s,o){const a=new ul,l=new Fp,c=[],h=r.isWebGL2,u=r.logarithmicDepthBuffer,d=r.vertexTextures;let f=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,b,z,W,ee){const D=W.fog,L=ee.geometry,U=M.isMeshStandardMaterial?W.environment:null,X=(M.isMeshStandardMaterial?t:e).get(M.envMap||U),N=X&&X.mapping===Ur?X.image.height:null,O=g[M.type];M.precision!==null&&(f=r.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const Y=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,j=Y!==void 0?Y.length:0;let se=0;L.morphAttributes.position!==void 0&&(se=1),L.morphAttributes.normal!==void 0&&(se=2),L.morphAttributes.color!==void 0&&(se=3);let q,Z,oe,pe;if(O){const At=$t[O];q=At.vertexShader,Z=At.fragmentShader}else q=M.vertexShader,Z=M.fragmentShader,l.update(M),oe=l.getVertexShaderID(M),pe=l.getFragmentShaderID(M);const de=i.getRenderTarget(),Le=ee.isInstancedMesh===!0,De=ee.isBatchedMesh===!0,Ee=!!M.map,We=!!M.matcap,B=!!X,wt=!!M.aoMap,xe=!!M.lightMap,Ce=!!M.bumpMap,fe=!!M.normalMap,rt=!!M.displacementMap,Oe=!!M.emissiveMap,T=!!M.metalnessMap,y=!!M.roughnessMap,H=M.anisotropy>0,K=M.clearcoat>0,$=M.iridescence>0,Q=M.sheen>0,me=M.transmission>0,ae=H&&!!M.anisotropyMap,he=K&&!!M.clearcoatMap,Se=K&&!!M.clearcoatNormalMap,ze=K&&!!M.clearcoatRoughnessMap,J=$&&!!M.iridescenceMap,Ye=$&&!!M.iridescenceThicknessMap,ke=Q&&!!M.sheenColorMap,Ae=Q&&!!M.sheenRoughnessMap,ve=!!M.specularMap,ue=!!M.specularColorMap,Ie=!!M.specularIntensityMap,qe=me&&!!M.transmissionMap,ot=me&&!!M.thicknessMap,Ge=!!M.gradientMap,te=!!M.alphaMap,P=M.alphaTest>0,ie=!!M.alphaHash,re=!!M.extensions,be=!!L.attributes.uv1,Me=!!L.attributes.uv2,Ke=!!L.attributes.uv3;let je=xn;return M.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:h,shaderID:O,shaderType:M.type,shaderName:M.name,vertexShader:q,fragmentShader:Z,defines:M.defines,customVertexShaderID:oe,customFragmentShaderID:pe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:De,instancing:Le,instancingColor:Le&&ee.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:de===null?i.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:hn,map:Ee,matcap:We,envMap:B,envMapMode:B&&X.mapping,envMapCubeUVHeight:N,aoMap:wt,lightMap:xe,bumpMap:Ce,normalMap:fe,displacementMap:d&&rt,emissiveMap:Oe,normalMapObjectSpace:fe&&M.normalMapType===Ic,normalMapTangentSpace:fe&&M.normalMapType===Dc,metalnessMap:T,roughnessMap:y,anisotropy:H,anisotropyMap:ae,clearcoat:K,clearcoatMap:he,clearcoatNormalMap:Se,clearcoatRoughnessMap:ze,iridescence:$,iridescenceMap:J,iridescenceThicknessMap:Ye,sheen:Q,sheenColorMap:ke,sheenRoughnessMap:Ae,specularMap:ve,specularColorMap:ue,specularIntensityMap:Ie,transmission:me,transmissionMap:qe,thicknessMap:ot,gradientMap:Ge,opaque:M.transparent===!1&&M.blending===hi,alphaMap:te,alphaTest:P,alphaHash:ie,combine:M.combine,mapUv:Ee&&_(M.map.channel),aoMapUv:wt&&_(M.aoMap.channel),lightMapUv:xe&&_(M.lightMap.channel),bumpMapUv:Ce&&_(M.bumpMap.channel),normalMapUv:fe&&_(M.normalMap.channel),displacementMapUv:rt&&_(M.displacementMap.channel),emissiveMapUv:Oe&&_(M.emissiveMap.channel),metalnessMapUv:T&&_(M.metalnessMap.channel),roughnessMapUv:y&&_(M.roughnessMap.channel),anisotropyMapUv:ae&&_(M.anisotropyMap.channel),clearcoatMapUv:he&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Se&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(M.sheenRoughnessMap.channel),specularMapUv:ve&&_(M.specularMap.channel),specularColorMapUv:ue&&_(M.specularColorMap.channel),specularIntensityMapUv:Ie&&_(M.specularIntensityMap.channel),transmissionMapUv:qe&&_(M.transmissionMap.channel),thicknessMapUv:ot&&_(M.thicknessMap.channel),alphaMapUv:te&&_(M.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(fe||H),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,vertexUv1s:be,vertexUv2s:Me,vertexUv3s:Ke,pointsUvs:ee.isPoints===!0&&!!L.attributes.uv&&(Ee||te),fog:!!D,useFog:M.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ee.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:se,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ee&&M.map.isVideoTexture===!0&&Je.getTransfer(M.map.colorSpace)===nt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===xt,flipSided:M.side===Dt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:re&&M.extensions.derivatives===!0,extensionFragDepth:re&&M.extensions.fragDepth===!0,extensionDrawBuffers:re&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(const z in M.defines)b.push(z),b.push(M.defines[z]);return M.isRawShaderMaterial===!1&&(x(b,M),v(b,M),b.push(i.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function x(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function v(M,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function S(M){const b=g[M.type];let z;if(b){const W=$t[b];z=xh.clone(W.uniforms)}else z=M.uniforms;return z}function C(M,b){let z;for(let W=0,ee=c.length;W<ee;W++){const D=c[W];if(D.cacheKey===b){z=D,++z.usedTimes;break}}return z===void 0&&(z=new Up(i,b,M,s),c.push(z)),z}function w(M){if(--M.usedTimes===0){const b=c.indexOf(M);c[b]=c[c.length-1],c.pop(),M.destroy()}}function A(M){l.remove(M)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:F}}function Bp(){let i=new WeakMap;function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function t(s){i.delete(s)}function n(s,o,a){i.get(s)[o]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function Gp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function To(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wo(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(u,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Gp),n.length>1&&n.sort(d||To),r.length>1&&r.sort(d||To)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Hp(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new wo,i.set(n,[o])):r>=s.length?(o=new wo,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Vp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new _e};break;case"SpotLight":t={position:new R,direction:new R,color:new _e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new _e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new _e,groundColor:new _e};break;case"RectAreaLight":t={color:new _e,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function kp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Wp=0;function Xp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function qp(i,e){const t=new Vp,n=kp(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new R);const s=new R,o=new tt,a=new tt;function l(h,u){let d=0,f=0,g=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let _=0,m=0,p=0,x=0,v=0,S=0,C=0,w=0,A=0,F=0,M=0;h.sort(Xp);const b=u===!0?Math.PI:1;for(let W=0,ee=h.length;W<ee;W++){const D=h[W],L=D.color,U=D.intensity,X=D.distance,N=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=L.r*U*b,f+=L.g*U*b,g+=L.b*U*b;else if(D.isLightProbe){for(let O=0;O<9;O++)r.probe[O].addScaledVector(D.sh.coefficients[O],U);M++}else if(D.isDirectionalLight){const O=t.get(D);if(O.color.copy(D.color).multiplyScalar(D.intensity*b),D.castShadow){const Y=D.shadow,j=n.get(D);j.shadowBias=Y.bias,j.shadowNormalBias=Y.normalBias,j.shadowRadius=Y.radius,j.shadowMapSize=Y.mapSize,r.directionalShadow[_]=j,r.directionalShadowMap[_]=N,r.directionalShadowMatrix[_]=D.shadow.matrix,S++}r.directional[_]=O,_++}else if(D.isSpotLight){const O=t.get(D);O.position.setFromMatrixPosition(D.matrixWorld),O.color.copy(L).multiplyScalar(U*b),O.distance=X,O.coneCos=Math.cos(D.angle),O.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),O.decay=D.decay,r.spot[p]=O;const Y=D.shadow;if(D.map&&(r.spotLightMap[A]=D.map,A++,Y.updateMatrices(D),D.castShadow&&F++),r.spotLightMatrix[p]=Y.matrix,D.castShadow){const j=n.get(D);j.shadowBias=Y.bias,j.shadowNormalBias=Y.normalBias,j.shadowRadius=Y.radius,j.shadowMapSize=Y.mapSize,r.spotShadow[p]=j,r.spotShadowMap[p]=N,w++}p++}else if(D.isRectAreaLight){const O=t.get(D);O.color.copy(L).multiplyScalar(U),O.halfWidth.set(D.width*.5,0,0),O.halfHeight.set(0,D.height*.5,0),r.rectArea[x]=O,x++}else if(D.isPointLight){const O=t.get(D);if(O.color.copy(D.color).multiplyScalar(D.intensity*b),O.distance=D.distance,O.decay=D.decay,D.castShadow){const Y=D.shadow,j=n.get(D);j.shadowBias=Y.bias,j.shadowNormalBias=Y.normalBias,j.shadowRadius=Y.radius,j.shadowMapSize=Y.mapSize,j.shadowCameraNear=Y.camera.near,j.shadowCameraFar=Y.camera.far,r.pointShadow[m]=j,r.pointShadowMap[m]=N,r.pointShadowMatrix[m]=D.shadow.matrix,C++}r.point[m]=O,m++}else if(D.isHemisphereLight){const O=t.get(D);O.skyColor.copy(D.color).multiplyScalar(U*b),O.groundColor.copy(D.groundColor).multiplyScalar(U*b),r.hemi[v]=O,v++}}x>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_FLOAT_1,r.rectAreaLTC2=ne.LTC_FLOAT_2):(r.rectAreaLTC1=ne.LTC_HALF_1,r.rectAreaLTC2=ne.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_FLOAT_1,r.rectAreaLTC2=ne.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_HALF_1,r.rectAreaLTC2=ne.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=f,r.ambient[2]=g;const z=r.hash;(z.directionalLength!==_||z.pointLength!==m||z.spotLength!==p||z.rectAreaLength!==x||z.hemiLength!==v||z.numDirectionalShadows!==S||z.numPointShadows!==C||z.numSpotShadows!==w||z.numSpotMaps!==A||z.numLightProbes!==M)&&(r.directional.length=_,r.spot.length=p,r.rectArea.length=x,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=w+A-F,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=F,r.numLightProbes=M,z.directionalLength=_,z.pointLength=m,z.spotLength=p,z.rectAreaLength=x,z.hemiLength=v,z.numDirectionalShadows=S,z.numPointShadows=C,z.numSpotShadows=w,z.numSpotMaps=A,z.numLightProbes=M,r.version=Wp++)}function c(h,u){let d=0,f=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let x=0,v=h.length;x<v;x++){const S=h[x];if(S.isDirectionalLight){const C=r.directional[d];C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),d++}else if(S.isSpotLight){const C=r.spot[g];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),g++}else if(S.isRectAreaLight){const C=r.rectArea[_];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(S.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const C=r.point[f];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){const C=r.hemi[m];C.direction.setFromMatrixPosition(S.matrixWorld),C.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:r}}function Ao(i,e){const t=new qp(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function o(u){n.push(u)}function a(u){r.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Yp(i,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Ao(i,e),t.set(s,[l])):o>=a.length?(l=new Ao(i,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class Zp extends _i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Jp extends _i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const $p=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jp(i,e,t){let n=new Ws;const r=new ce,s=new ce,o=new it,a=new Zp({depthPacking:Pc}),l=new Jp,c={},h=t.maxTextureSize,u={[cn]:Dt,[Dt]:cn,[xt]:xt},d=new _t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:$p,fragmentShader:Kp}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new et;g.setAttribute("position",new ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Xe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jo;let p=this.type;this.render=function(w,A,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const M=i.getRenderTarget(),b=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),W=i.state;W.setBlending(_n),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const ee=p!==an&&this.type===an,D=p===an&&this.type!==an;for(let L=0,U=w.length;L<U;L++){const X=w[L],N=X.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const O=N.getFrameExtents();if(r.multiply(O),s.copy(N.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/O.x),r.x=s.x*O.x,N.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/O.y),r.y=s.y*O.y,N.mapSize.y=s.y)),N.map===null||ee===!0||D===!0){const j=this.type!==an?{minFilter:Mt,magFilter:Mt}:{};N.map!==null&&N.map.dispose(),N.map=new Nn(r.x,r.y,j),N.map.texture.name=X.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();const Y=N.getViewportCount();for(let j=0;j<Y;j++){const se=N.getViewport(j);o.set(s.x*se.x,s.y*se.y,s.x*se.z,s.y*se.w),W.viewport(o),N.updateMatrices(X,j),n=N.getFrustum(),S(A,F,N.camera,X,this.type)}N.isPointLightShadow!==!0&&this.type===an&&x(N,F),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,b,z)};function x(w,A){const F=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Nn(r.x,r.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,F,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,F,f,_,null)}function v(w,A,F,M){let b=null;const z=F.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(z!==void 0)b=z;else if(b=F.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const W=b.uuid,ee=A.uuid;let D=c[W];D===void 0&&(D={},c[W]=D);let L=D[ee];L===void 0&&(L=b.clone(),D[ee]=L,A.addEventListener("dispose",C)),b=L}if(b.visible=A.visible,b.wireframe=A.wireframe,M===an?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,F.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const W=i.properties.get(b);W.light=F}return b}function S(w,A,F,M,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===an)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,w.matrixWorld);const ee=e.update(w),D=w.material;if(Array.isArray(D)){const L=ee.groups;for(let U=0,X=L.length;U<X;U++){const N=L[U],O=D[N.materialIndex];if(O&&O.visible){const Y=v(w,O,M,b);w.onBeforeShadow(i,w,A,F,ee,Y,N),i.renderBufferDirect(F,null,ee,Y,w,N),w.onAfterShadow(i,w,A,F,ee,Y,N)}}}else if(D.visible){const L=v(w,D,M,b);w.onBeforeShadow(i,w,A,F,ee,L,null),i.renderBufferDirect(F,null,ee,L,w,null),w.onAfterShadow(i,w,A,F,ee,L,null)}}const W=w.children;for(let ee=0,D=W.length;ee<D;ee++)S(W[ee],A,F,M,b)}function C(w){w.target.removeEventListener("dispose",C);for(const F in c){const M=c[F],b=w.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}function Qp(i,e,t){const n=t.isWebGL2;function r(){let P=!1;const ie=new it;let re=null;const be=new it(0,0,0,0);return{setMask:function(Me){re!==Me&&!P&&(i.colorMask(Me,Me,Me,Me),re=Me)},setLocked:function(Me){P=Me},setClear:function(Me,Ke,je,mt,At){At===!0&&(Me*=mt,Ke*=mt,je*=mt),ie.set(Me,Ke,je,mt),be.equals(ie)===!1&&(i.clearColor(Me,Ke,je,mt),be.copy(ie))},reset:function(){P=!1,re=null,be.set(-1,0,0,0)}}}function s(){let P=!1,ie=null,re=null,be=null;return{setTest:function(Me){Me?De(i.DEPTH_TEST):Ee(i.DEPTH_TEST)},setMask:function(Me){ie!==Me&&!P&&(i.depthMask(Me),ie=Me)},setFunc:function(Me){if(re!==Me){switch(Me){case ac:i.depthFunc(i.NEVER);break;case oc:i.depthFunc(i.ALWAYS);break;case lc:i.depthFunc(i.LESS);break;case wr:i.depthFunc(i.LEQUAL);break;case cc:i.depthFunc(i.EQUAL);break;case hc:i.depthFunc(i.GEQUAL);break;case uc:i.depthFunc(i.GREATER);break;case dc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=Me}},setLocked:function(Me){P=Me},setClear:function(Me){be!==Me&&(i.clearDepth(Me),be=Me)},reset:function(){P=!1,ie=null,re=null,be=null}}}function o(){let P=!1,ie=null,re=null,be=null,Me=null,Ke=null,je=null,mt=null,At=null;return{setTest:function(Qe){P||(Qe?De(i.STENCIL_TEST):Ee(i.STENCIL_TEST))},setMask:function(Qe){ie!==Qe&&!P&&(i.stencilMask(Qe),ie=Qe)},setFunc:function(Qe,Ct,Zt){(re!==Qe||be!==Ct||Me!==Zt)&&(i.stencilFunc(Qe,Ct,Zt),re=Qe,be=Ct,Me=Zt)},setOp:function(Qe,Ct,Zt){(Ke!==Qe||je!==Ct||mt!==Zt)&&(i.stencilOp(Qe,Ct,Zt),Ke=Qe,je=Ct,mt=Zt)},setLocked:function(Qe){P=Qe},setClear:function(Qe){At!==Qe&&(i.clearStencil(Qe),At=Qe)},reset:function(){P=!1,ie=null,re=null,be=null,Me=null,Ke=null,je=null,mt=null,At=null}}}const a=new r,l=new s,c=new o,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,C=null,w=null,A=null,F=null,M=new _e(0,0,0),b=0,z=!1,W=null,ee=null,D=null,L=null,U=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,O=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(Y)[1]),N=O>=1):Y.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),N=O>=2);let j=null,se={};const q=i.getParameter(i.SCISSOR_BOX),Z=i.getParameter(i.VIEWPORT),oe=new it().fromArray(q),pe=new it().fromArray(Z);function de(P,ie,re,be){const Me=new Uint8Array(4),Ke=i.createTexture();i.bindTexture(P,Ke),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<re;je++)n&&(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)?i.texImage3D(ie,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(ie+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return Ke}const Le={};Le[i.TEXTURE_2D]=de(i.TEXTURE_2D,i.TEXTURE_2D,1),Le[i.TEXTURE_CUBE_MAP]=de(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Le[i.TEXTURE_2D_ARRAY]=de(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Le[i.TEXTURE_3D]=de(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),De(i.DEPTH_TEST),l.setFunc(wr),Oe(!1),T(oa),De(i.CULL_FACE),fe(_n);function De(P){d[P]!==!0&&(i.enable(P),d[P]=!0)}function Ee(P){d[P]!==!1&&(i.disable(P),d[P]=!1)}function We(P,ie){return f[P]!==ie?(i.bindFramebuffer(P,ie),f[P]=ie,n&&(P===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ie),P===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ie)),!0):!1}function B(P,ie){let re=_,be=!1;if(P)if(re=g.get(ie),re===void 0&&(re=[],g.set(ie,re)),P.isWebGLMultipleRenderTargets){const Me=P.texture;if(re.length!==Me.length||re[0]!==i.COLOR_ATTACHMENT0){for(let Ke=0,je=Me.length;Ke<je;Ke++)re[Ke]=i.COLOR_ATTACHMENT0+Ke;re.length=Me.length,be=!0}}else re[0]!==i.COLOR_ATTACHMENT0&&(re[0]=i.COLOR_ATTACHMENT0,be=!0);else re[0]!==i.BACK&&(re[0]=i.BACK,be=!0);be&&(t.isWebGL2?i.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function wt(P){return m!==P?(i.useProgram(P),m=P,!0):!1}const xe={[Ln]:i.FUNC_ADD,[Xl]:i.FUNC_SUBTRACT,[ql]:i.FUNC_REVERSE_SUBTRACT};if(n)xe[ha]=i.MIN,xe[ua]=i.MAX;else{const P=e.get("EXT_blend_minmax");P!==null&&(xe[ha]=P.MIN_EXT,xe[ua]=P.MAX_EXT)}const Ce={[Yl]:i.ZERO,[Zl]:i.ONE,[Jl]:i.SRC_COLOR,[ws]:i.SRC_ALPHA,[tc]:i.SRC_ALPHA_SATURATE,[Ql]:i.DST_COLOR,[Kl]:i.DST_ALPHA,[$l]:i.ONE_MINUS_SRC_COLOR,[As]:i.ONE_MINUS_SRC_ALPHA,[ec]:i.ONE_MINUS_DST_COLOR,[jl]:i.ONE_MINUS_DST_ALPHA,[nc]:i.CONSTANT_COLOR,[ic]:i.ONE_MINUS_CONSTANT_COLOR,[rc]:i.CONSTANT_ALPHA,[sc]:i.ONE_MINUS_CONSTANT_ALPHA};function fe(P,ie,re,be,Me,Ke,je,mt,At,Qe){if(P===_n){p===!0&&(Ee(i.BLEND),p=!1);return}if(p===!1&&(De(i.BLEND),p=!0),P!==Wl){if(P!==x||Qe!==z){if((v!==Ln||w!==Ln)&&(i.blendEquation(i.FUNC_ADD),v=Ln,w=Ln),Qe)switch(P){case hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ze:i.blendFunc(i.ONE,i.ONE);break;case la:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ca:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ze:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case la:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ca:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}S=null,C=null,A=null,F=null,M.set(0,0,0),b=0,x=P,z=Qe}return}Me=Me||ie,Ke=Ke||re,je=je||be,(ie!==v||Me!==w)&&(i.blendEquationSeparate(xe[ie],xe[Me]),v=ie,w=Me),(re!==S||be!==C||Ke!==A||je!==F)&&(i.blendFuncSeparate(Ce[re],Ce[be],Ce[Ke],Ce[je]),S=re,C=be,A=Ke,F=je),(mt.equals(M)===!1||At!==b)&&(i.blendColor(mt.r,mt.g,mt.b,At),M.copy(mt),b=At),x=P,z=!1}function rt(P,ie){P.side===xt?Ee(i.CULL_FACE):De(i.CULL_FACE);let re=P.side===Dt;ie&&(re=!re),Oe(re),P.blending===hi&&P.transparent===!1?fe(_n):fe(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);const be=P.stencilWrite;c.setTest(be),be&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),H(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?De(i.SAMPLE_ALPHA_TO_COVERAGE):Ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(P){W!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),W=P)}function T(P){P!==Hl?(De(i.CULL_FACE),P!==ee&&(P===oa?i.cullFace(i.BACK):P===Vl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ee(i.CULL_FACE),ee=P}function y(P){P!==D&&(N&&i.lineWidth(P),D=P)}function H(P,ie,re){P?(De(i.POLYGON_OFFSET_FILL),(L!==ie||U!==re)&&(i.polygonOffset(ie,re),L=ie,U=re)):Ee(i.POLYGON_OFFSET_FILL)}function K(P){P?De(i.SCISSOR_TEST):Ee(i.SCISSOR_TEST)}function $(P){P===void 0&&(P=i.TEXTURE0+X-1),j!==P&&(i.activeTexture(P),j=P)}function Q(P,ie,re){re===void 0&&(j===null?re=i.TEXTURE0+X-1:re=j);let be=se[re];be===void 0&&(be={type:void 0,texture:void 0},se[re]=be),(be.type!==P||be.texture!==ie)&&(j!==re&&(i.activeTexture(re),j=re),i.bindTexture(P,ie||Le[P]),be.type=P,be.texture=ie)}function me(){const P=se[j];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ae(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function he(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Se(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ze(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function J(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ye(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ke(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ae(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ve(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ue(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ie(P){oe.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),oe.copy(P))}function qe(P){pe.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),pe.copy(P))}function ot(P,ie){let re=u.get(ie);re===void 0&&(re=new WeakMap,u.set(ie,re));let be=re.get(P);be===void 0&&(be=i.getUniformBlockIndex(ie,P.name),re.set(P,be))}function Ge(P,ie){const be=u.get(ie).get(P);h.get(ie)!==be&&(i.uniformBlockBinding(ie,be,P.__bindingPointIndex),h.set(ie,be))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},j=null,se={},f={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,C=null,w=null,A=null,F=null,M=new _e(0,0,0),b=0,z=!1,W=null,ee=null,D=null,L=null,U=null,oe.set(0,0,i.canvas.width,i.canvas.height),pe.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:De,disable:Ee,bindFramebuffer:We,drawBuffers:B,useProgram:wt,setBlending:fe,setMaterial:rt,setFlipSided:Oe,setCullFace:T,setLineWidth:y,setPolygonOffset:H,setScissorTest:K,activeTexture:$,bindTexture:Q,unbindTexture:me,compressedTexImage2D:ae,compressedTexImage3D:he,texImage2D:ve,texImage3D:ue,updateUBOMapping:ot,uniformBlockBinding:Ge,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:Se,texSubImage3D:ze,compressedTexSubImage2D:J,compressedTexSubImage3D:Ye,scissor:Ie,viewport:qe,reset:te}}function em(i,e,t,n,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,y){return f?new OffscreenCanvas(T,y):Bi("canvas")}function _(T,y,H,K){let $=1;if((T.width>K||T.height>K)&&($=K/Math.max(T.width,T.height)),$<1||y===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const Q=y?Pr:Math.floor,me=Q($*T.width),ae=Q($*T.height);u===void 0&&(u=g(me,ae));const he=H?g(me,ae):u;return he.width=me,he.height=ae,he.getContext("2d").drawImage(T,0,0,me,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+me+"x"+ae+")."),he}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return Is(T.width)&&Is(T.height)}function p(T){return a?!1:T.wrapS!==qt||T.wrapT!==qt||T.minFilter!==Mt&&T.minFilter!==It}function x(T,y){return T.generateMipmaps&&y&&T.minFilter!==Mt&&T.minFilter!==It}function v(T){i.generateMipmap(T)}function S(T,y,H,K,$=!1){if(a===!1)return y;if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Q=y;if(y===i.RED&&(H===i.FLOAT&&(Q=i.R32F),H===i.HALF_FLOAT&&(Q=i.R16F),H===i.UNSIGNED_BYTE&&(Q=i.R8)),y===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(Q=i.R8UI),H===i.UNSIGNED_SHORT&&(Q=i.R16UI),H===i.UNSIGNED_INT&&(Q=i.R32UI),H===i.BYTE&&(Q=i.R8I),H===i.SHORT&&(Q=i.R16I),H===i.INT&&(Q=i.R32I)),y===i.RG&&(H===i.FLOAT&&(Q=i.RG32F),H===i.HALF_FLOAT&&(Q=i.RG16F),H===i.UNSIGNED_BYTE&&(Q=i.RG8)),y===i.RGBA){const me=$?Ar:Je.getTransfer(K);H===i.FLOAT&&(Q=i.RGBA32F),H===i.HALF_FLOAT&&(Q=i.RGBA16F),H===i.UNSIGNED_BYTE&&(Q=me===nt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function C(T,y,H){return x(T,H)===!0||T.isFramebufferTexture&&T.minFilter!==Mt&&T.minFilter!==It?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function w(T){return T===Mt||T===da||T===kr?i.NEAREST:i.LINEAR}function A(T){const y=T.target;y.removeEventListener("dispose",A),M(y),y.isVideoTexture&&h.delete(y)}function F(T){const y=T.target;y.removeEventListener("dispose",F),z(y)}function M(T){const y=n.get(T);if(y.__webglInit===void 0)return;const H=T.source,K=d.get(H);if(K){const $=K[y.__cacheKey];$.usedTimes--,$.usedTimes===0&&b(T),Object.keys(K).length===0&&d.delete(H)}n.remove(T)}function b(T){const y=n.get(T);i.deleteTexture(y.__webglTexture);const H=T.source,K=d.get(H);delete K[y.__cacheKey],o.memory.textures--}function z(T){const y=T.texture,H=n.get(T),K=n.get(y);if(K.__webglTexture!==void 0&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(H.__webglFramebuffer[$]))for(let Q=0;Q<H.__webglFramebuffer[$].length;Q++)i.deleteFramebuffer(H.__webglFramebuffer[$][Q]);else i.deleteFramebuffer(H.__webglFramebuffer[$]);H.__webglDepthbuffer&&i.deleteRenderbuffer(H.__webglDepthbuffer[$])}else{if(Array.isArray(H.__webglFramebuffer))for(let $=0;$<H.__webglFramebuffer.length;$++)i.deleteFramebuffer(H.__webglFramebuffer[$]);else i.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&i.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&i.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let $=0;$<H.__webglColorRenderbuffer.length;$++)H.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(H.__webglColorRenderbuffer[$]);H.__webglDepthRenderbuffer&&i.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let $=0,Q=y.length;$<Q;$++){const me=n.get(y[$]);me.__webglTexture&&(i.deleteTexture(me.__webglTexture),o.memory.textures--),n.remove(y[$])}n.remove(y),n.remove(T)}let W=0;function ee(){W=0}function D(){const T=W;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),W+=1,T}function L(T){const y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function U(T,y){const H=n.get(T);if(T.isVideoTexture&&rt(T),T.isRenderTargetTexture===!1&&T.version>0&&H.__version!==T.version){const K=T.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(H,T,y);return}}t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+y)}function X(T,y){const H=n.get(T);if(T.version>0&&H.__version!==T.version){oe(H,T,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+y)}function N(T,y){const H=n.get(T);if(T.version>0&&H.__version!==T.version){oe(H,T,y);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+y)}function O(T,y){const H=n.get(T);if(T.version>0&&H.__version!==T.version){pe(H,T,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+y)}const Y={[Ls]:i.REPEAT,[qt]:i.CLAMP_TO_EDGE,[Ps]:i.MIRRORED_REPEAT},j={[Mt]:i.NEAREST,[da]:i.NEAREST_MIPMAP_NEAREST,[kr]:i.NEAREST_MIPMAP_LINEAR,[It]:i.LINEAR,[yc]:i.LINEAR_MIPMAP_NEAREST,[Fi]:i.LINEAR_MIPMAP_LINEAR},se={[Uc]:i.NEVER,[Gc]:i.ALWAYS,[Nc]:i.LESS,[al]:i.LEQUAL,[Fc]:i.EQUAL,[Bc]:i.GEQUAL,[Oc]:i.GREATER,[zc]:i.NOTEQUAL};function q(T,y,H){if(H?(i.texParameteri(T,i.TEXTURE_WRAP_S,Y[y.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Y[y.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Y[y.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,j[y.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,j[y.minFilter])):(i.texParameteri(T,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(T,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==qt||y.wrapT!==qt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(T,i.TEXTURE_MAG_FILTER,w(y.magFilter)),i.texParameteri(T,i.TEXTURE_MIN_FILTER,w(y.minFilter)),y.minFilter!==Mt&&y.minFilter!==It&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,se[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const K=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===Mt||y.minFilter!==kr&&y.minFilter!==Fi||y.type===vn&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===Oi&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(T,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function Z(T,y){let H=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",A));const K=y.source;let $=d.get(K);$===void 0&&($={},d.set(K,$));const Q=L(y);if(Q!==T.__cacheKey){$[Q]===void 0&&($[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),$[Q].usedTimes++;const me=$[T.__cacheKey];me!==void 0&&($[T.__cacheKey].usedTimes--,me.usedTimes===0&&b(y)),T.__cacheKey=Q,T.__webglTexture=$[Q].texture}return H}function oe(T,y,H){let K=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(K=i.TEXTURE_3D);const $=Z(T,y),Q=y.source;t.bindTexture(K,T.__webglTexture,i.TEXTURE0+H);const me=n.get(Q);if(Q.version!==me.__version||$===!0){t.activeTexture(i.TEXTURE0+H);const ae=Je.getPrimaries(Je.workingColorSpace),he=y.colorSpace===Vt?null:Je.getPrimaries(y.colorSpace),Se=y.colorSpace===Vt||ae===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const ze=p(y)&&m(y.image)===!1;let J=_(y.image,ze,!1,r.maxTextureSize);J=Oe(y,J);const Ye=m(J)||a,ke=s.convert(y.format,y.colorSpace);let Ae=s.convert(y.type),ve=S(y.internalFormat,ke,Ae,y.colorSpace,y.isVideoTexture);q(K,y,Ye);let ue;const Ie=y.mipmaps,qe=a&&y.isVideoTexture!==!0&&ve!==rl,ot=me.__version===void 0||$===!0,Ge=C(y,J,Ye);if(y.isDepthTexture)ve=i.DEPTH_COMPONENT,a?y.type===vn?ve=i.DEPTH_COMPONENT32F:y.type===gn?ve=i.DEPTH_COMPONENT24:y.type===Dn?ve=i.DEPTH24_STENCIL8:ve=i.DEPTH_COMPONENT16:y.type===vn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===In&&ve===i.DEPTH_COMPONENT&&y.type!==Gs&&y.type!==gn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=gn,Ae=s.convert(y.type)),y.format===mi&&ve===i.DEPTH_COMPONENT&&(ve=i.DEPTH_STENCIL,y.type!==Dn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Dn,Ae=s.convert(y.type))),ot&&(qe?t.texStorage2D(i.TEXTURE_2D,1,ve,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,ve,J.width,J.height,0,ke,Ae,null));else if(y.isDataTexture)if(Ie.length>0&&Ye){qe&&ot&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,Ie[0].width,Ie[0].height);for(let te=0,P=Ie.length;te<P;te++)ue=Ie[te],qe?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,ke,Ae,ue.data):t.texImage2D(i.TEXTURE_2D,te,ve,ue.width,ue.height,0,ke,Ae,ue.data);y.generateMipmaps=!1}else qe?(ot&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,ke,Ae,J.data)):t.texImage2D(i.TEXTURE_2D,0,ve,J.width,J.height,0,ke,Ae,J.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){qe&&ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,ve,Ie[0].width,Ie[0].height,J.depth);for(let te=0,P=Ie.length;te<P;te++)ue=Ie[te],y.format!==Yt?ke!==null?qe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,J.depth,ke,ue.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,ve,ue.width,ue.height,J.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,J.depth,ke,Ae,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,ve,ue.width,ue.height,J.depth,0,ke,Ae,ue.data)}else{qe&&ot&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,Ie[0].width,Ie[0].height);for(let te=0,P=Ie.length;te<P;te++)ue=Ie[te],y.format!==Yt?ke!==null?qe?t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,ke,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,te,ve,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,ke,Ae,ue.data):t.texImage2D(i.TEXTURE_2D,te,ve,ue.width,ue.height,0,ke,Ae,ue.data)}else if(y.isDataArrayTexture)qe?(ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,ve,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ke,Ae,J.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,J.width,J.height,J.depth,0,ke,Ae,J.data);else if(y.isData3DTexture)qe?(ot&&t.texStorage3D(i.TEXTURE_3D,Ge,ve,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ke,Ae,J.data)):t.texImage3D(i.TEXTURE_3D,0,ve,J.width,J.height,J.depth,0,ke,Ae,J.data);else if(y.isFramebufferTexture){if(ot)if(qe)t.texStorage2D(i.TEXTURE_2D,Ge,ve,J.width,J.height);else{let te=J.width,P=J.height;for(let ie=0;ie<Ge;ie++)t.texImage2D(i.TEXTURE_2D,ie,ve,te,P,0,ke,Ae,null),te>>=1,P>>=1}}else if(Ie.length>0&&Ye){qe&&ot&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,Ie[0].width,Ie[0].height);for(let te=0,P=Ie.length;te<P;te++)ue=Ie[te],qe?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ke,Ae,ue):t.texImage2D(i.TEXTURE_2D,te,ve,ke,Ae,ue);y.generateMipmaps=!1}else qe?(ot&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ke,Ae,J)):t.texImage2D(i.TEXTURE_2D,0,ve,ke,Ae,J);x(y,Ye)&&v(K),me.__version=Q.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function pe(T,y,H){if(y.image.length!==6)return;const K=Z(T,y),$=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+H);const Q=n.get($);if($.version!==Q.__version||K===!0){t.activeTexture(i.TEXTURE0+H);const me=Je.getPrimaries(Je.workingColorSpace),ae=y.colorSpace===Vt?null:Je.getPrimaries(y.colorSpace),he=y.colorSpace===Vt||me===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Se=y.isCompressedTexture||y.image[0].isCompressedTexture,ze=y.image[0]&&y.image[0].isDataTexture,J=[];for(let te=0;te<6;te++)!Se&&!ze?J[te]=_(y.image[te],!1,!0,r.maxCubemapSize):J[te]=ze?y.image[te].image:y.image[te],J[te]=Oe(y,J[te]);const Ye=J[0],ke=m(Ye)||a,Ae=s.convert(y.format,y.colorSpace),ve=s.convert(y.type),ue=S(y.internalFormat,Ae,ve,y.colorSpace),Ie=a&&y.isVideoTexture!==!0,qe=Q.__version===void 0||K===!0;let ot=C(y,Ye,ke);q(i.TEXTURE_CUBE_MAP,y,ke);let Ge;if(Se){Ie&&qe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,ue,Ye.width,Ye.height);for(let te=0;te<6;te++){Ge=J[te].mipmaps;for(let P=0;P<Ge.length;P++){const ie=Ge[P];y.format!==Yt?Ae!==null?Ie?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,P,0,0,ie.width,ie.height,Ae,ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,P,ue,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,P,0,0,ie.width,ie.height,Ae,ve,ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,P,ue,ie.width,ie.height,0,Ae,ve,ie.data)}}}else{Ge=y.mipmaps,Ie&&qe&&(Ge.length>0&&ot++,t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,ue,J[0].width,J[0].height));for(let te=0;te<6;te++)if(ze){Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,J[te].width,J[te].height,Ae,ve,J[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ue,J[te].width,J[te].height,0,Ae,ve,J[te].data);for(let P=0;P<Ge.length;P++){const re=Ge[P].image[te].image;Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,P+1,0,0,re.width,re.height,Ae,ve,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,P+1,ue,re.width,re.height,0,Ae,ve,re.data)}}else{Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ae,ve,J[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ue,Ae,ve,J[te]);for(let P=0;P<Ge.length;P++){const ie=Ge[P];Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,P+1,0,0,Ae,ve,ie.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,P+1,ue,Ae,ve,ie.image[te])}}}x(y,ke)&&v(i.TEXTURE_CUBE_MAP),Q.__version=$.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function de(T,y,H,K,$,Q){const me=s.convert(H.format,H.colorSpace),ae=s.convert(H.type),he=S(H.internalFormat,me,ae,H.colorSpace);if(!n.get(y).__hasExternalTextures){const ze=Math.max(1,y.width>>Q),J=Math.max(1,y.height>>Q);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,Q,he,ze,J,y.depth,0,me,ae,null):t.texImage2D($,Q,he,ze,J,0,me,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),fe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,$,n.get(H).__webglTexture,0,Ce(y)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,$,n.get(H).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(T,y,H){if(i.bindRenderbuffer(i.RENDERBUFFER,T),y.depthBuffer&&!y.stencilBuffer){let K=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(H||fe(y)){const $=y.depthTexture;$&&$.isDepthTexture&&($.type===vn?K=i.DEPTH_COMPONENT32F:$.type===gn&&(K=i.DEPTH_COMPONENT24));const Q=Ce(y);fe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,K,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,K,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,T)}else if(y.depthBuffer&&y.stencilBuffer){const K=Ce(y);H&&fe(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,y.width,y.height):fe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,T)}else{const K=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let $=0;$<K.length;$++){const Q=K[$],me=s.convert(Q.format,Q.colorSpace),ae=s.convert(Q.type),he=S(Q.internalFormat,me,ae,Q.colorSpace),Se=Ce(y);H&&fe(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,he,y.width,y.height):fe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se,he,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,he,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(T,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),U(y.depthTexture,0);const K=n.get(y.depthTexture).__webglTexture,$=Ce(y);if(y.depthTexture.format===In)fe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(y.depthTexture.format===mi)fe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ee(T){const y=n.get(T),H=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!y.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");De(y.__webglFramebuffer,T)}else if(H){y.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[K]),y.__webglDepthbuffer[K]=i.createRenderbuffer(),Le(y.__webglDepthbuffer[K],T,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),Le(y.__webglDepthbuffer,T,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(T,y,H){const K=n.get(T);y!==void 0&&de(K.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ee(T)}function B(T){const y=T.texture,H=n.get(T),K=n.get(y);T.addEventListener("dispose",F),T.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=y.version,o.memory.textures++);const $=T.isWebGLCubeRenderTarget===!0,Q=T.isWebGLMultipleRenderTargets===!0,me=m(T)||a;if($){H.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&y.mipmaps&&y.mipmaps.length>0){H.__webglFramebuffer[ae]=[];for(let he=0;he<y.mipmaps.length;he++)H.__webglFramebuffer[ae][he]=i.createFramebuffer()}else H.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){H.__webglFramebuffer=[];for(let ae=0;ae<y.mipmaps.length;ae++)H.__webglFramebuffer[ae]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Q)if(r.drawBuffers){const ae=T.texture;for(let he=0,Se=ae.length;he<Se;he++){const ze=n.get(ae[he]);ze.__webglTexture===void 0&&(ze.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&T.samples>0&&fe(T)===!1){const ae=Q?y:[y];H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let he=0;he<ae.length;he++){const Se=ae[he];H.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[he]);const ze=s.convert(Se.format,Se.colorSpace),J=s.convert(Se.type),Ye=S(Se.internalFormat,ze,J,Se.colorSpace,T.isXRRenderTarget===!0),ke=Ce(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,Ye,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,H.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(H.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),q(i.TEXTURE_CUBE_MAP,y,me);for(let ae=0;ae<6;ae++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let he=0;he<y.mipmaps.length;he++)de(H.__webglFramebuffer[ae][he],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,he);else de(H.__webglFramebuffer[ae],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);x(y,me)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const ae=T.texture;for(let he=0,Se=ae.length;he<Se;he++){const ze=ae[he],J=n.get(ze);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),q(i.TEXTURE_2D,ze,me),de(H.__webglFramebuffer,T,ze,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,0),x(ze,me)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(a?ae=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ae,K.__webglTexture),q(ae,y,me),a&&y.mipmaps&&y.mipmaps.length>0)for(let he=0;he<y.mipmaps.length;he++)de(H.__webglFramebuffer[he],T,y,i.COLOR_ATTACHMENT0,ae,he);else de(H.__webglFramebuffer,T,y,i.COLOR_ATTACHMENT0,ae,0);x(y,me)&&v(ae),t.unbindTexture()}T.depthBuffer&&Ee(T)}function wt(T){const y=m(T)||a,H=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let K=0,$=H.length;K<$;K++){const Q=H[K];if(x(Q,y)){const me=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ae=n.get(Q).__webglTexture;t.bindTexture(me,ae),v(me),t.unbindTexture()}}}function xe(T){if(a&&T.samples>0&&fe(T)===!1){const y=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],H=T.width,K=T.height;let $=i.COLOR_BUFFER_BIT;const Q=[],me=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=n.get(T),he=T.isWebGLMultipleRenderTargets===!0;if(he)for(let Se=0;Se<y.length;Se++)t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let Se=0;Se<y.length;Se++){Q.push(i.COLOR_ATTACHMENT0+Se),T.depthBuffer&&Q.push(me);const ze=ae.__ignoreDepthValues!==void 0?ae.__ignoreDepthValues:!1;if(ze===!1&&(T.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),he&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ae.__webglColorRenderbuffer[Se]),ze===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[me]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[me])),he){const J=n.get(y[Se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,H,K,0,0,H,K,$,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let Se=0;Se<y.length;Se++){t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,ae.__webglColorRenderbuffer[Se]);const ze=n.get(y[Se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}}function Ce(T){return Math.min(r.maxSamples,T.samples)}function fe(T){const y=n.get(T);return a&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function rt(T){const y=o.render.frame;h.get(T)!==y&&(h.set(T,y),T.update())}function Oe(T,y){const H=T.colorSpace,K=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===Ds||H!==hn&&H!==Vt&&(Je.getTransfer(H)===nt?a===!1?e.has("EXT_sRGB")===!0&&K===Yt?(T.format=Ds,T.minFilter=It,T.generateMipmaps=!1):y=ll.sRGBToLinear(y):(K!==Yt||$!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),y}this.allocateTextureUnit=D,this.resetTextureUnits=ee,this.setTexture2D=U,this.setTexture2DArray=X,this.setTexture3D=N,this.setTextureCube=O,this.rebindTextures=We,this.setupRenderTarget=B,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=de,this.useMultisampledRTT=fe}function tm(i,e,t){const n=t.isWebGL2;function r(s,o=Vt){let a;const l=Je.getTransfer(o);if(s===Mn)return i.UNSIGNED_BYTE;if(s===Qo)return i.UNSIGNED_SHORT_4_4_4_4;if(s===el)return i.UNSIGNED_SHORT_5_5_5_1;if(s===Sc)return i.BYTE;if(s===Ec)return i.SHORT;if(s===Gs)return i.UNSIGNED_SHORT;if(s===jo)return i.INT;if(s===gn)return i.UNSIGNED_INT;if(s===vn)return i.FLOAT;if(s===Oi)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===bc)return i.ALPHA;if(s===Yt)return i.RGBA;if(s===Tc)return i.LUMINANCE;if(s===wc)return i.LUMINANCE_ALPHA;if(s===In)return i.DEPTH_COMPONENT;if(s===mi)return i.DEPTH_STENCIL;if(s===Ds)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Ac)return i.RED;if(s===tl)return i.RED_INTEGER;if(s===Cc)return i.RG;if(s===nl)return i.RG_INTEGER;if(s===il)return i.RGBA_INTEGER;if(s===Wr||s===Xr||s===qr||s===Yr)if(l===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Wr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Xr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===qr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Yr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Wr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Xr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===qr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Yr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===fa||s===pa||s===ma||s===ga)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===fa)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===pa)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ma)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ga)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===rl)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===va||s===_a)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===va)return l===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===_a)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===xa||s===Ma||s===ya||s===Sa||s===Ea||s===ba||s===Ta||s===wa||s===Aa||s===Ca||s===Ra||s===La||s===Pa||s===Da)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===xa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ma)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ya)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Sa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ea)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ba)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ta)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===wa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Aa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ca)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ra)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===La)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Pa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Da)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Zr||s===Ia||s===Ua)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Zr)return l===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ia)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ua)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Rc||s===Na||s===Fa||s===Oa)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Zr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Na)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Fa)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Oa)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Dn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class nm extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class $e extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const im={type:"move"};class vs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(im)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $e;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class rm extends vi{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const x=[],v=[],S=new ce;let C=null;const w=new zt;w.layers.enable(1),w.viewport=new it;const A=new zt;A.layers.enable(2),A.viewport=new it;const F=[w,A],M=new nm;M.layers.enable(1),M.layers.enable(2);let b=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=x[q];return Z===void 0&&(Z=new vs,x[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=x[q];return Z===void 0&&(Z=new vs,x[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=x[q];return Z===void 0&&(Z=new vs,x[q]=Z),Z.getHandSpace()};function W(q){const Z=v.indexOf(q.inputSource);if(Z===-1)return;const oe=x[Z];oe!==void 0&&(oe.update(q.inputSource,q.frame,c||o),oe.dispatchEvent({type:q.type,data:q.inputSource}))}function ee(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",ee),r.removeEventListener("inputsourceschange",D);for(let q=0;q<x.length;q++){const Z=v[q];Z!==null&&(v[q]=null,x[q].disconnect(Z))}b=null,z=null,e.setRenderTarget(m),f=null,d=null,u=null,r=null,p=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",ee),r.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,Z),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Nn(f.framebufferWidth,f.framebufferHeight,{format:Yt,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Z=null,oe=null,pe=null;_.depth&&(pe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=_.stencil?mi:In,oe=_.stencil?Dn:gn);const de={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:s};u=new XRWebGLBinding(r,t),d=u.createProjectionLayer(de),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Nn(d.textureWidth,d.textureHeight,{format:Yt,type:Mn,depthTexture:new Ml(d.textureWidth,d.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Le=e.properties.get(p);Le.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function D(q){for(let Z=0;Z<q.removed.length;Z++){const oe=q.removed[Z],pe=v.indexOf(oe);pe>=0&&(v[pe]=null,x[pe].disconnect(oe))}for(let Z=0;Z<q.added.length;Z++){const oe=q.added[Z];let pe=v.indexOf(oe);if(pe===-1){for(let Le=0;Le<x.length;Le++)if(Le>=v.length){v.push(oe),pe=Le;break}else if(v[Le]===null){v[Le]=oe,pe=Le;break}if(pe===-1)break}const de=x[pe];de&&de.connect(oe)}}const L=new R,U=new R;function X(q,Z,oe){L.setFromMatrixPosition(Z.matrixWorld),U.setFromMatrixPosition(oe.matrixWorld);const pe=L.distanceTo(U),de=Z.projectionMatrix.elements,Le=oe.projectionMatrix.elements,De=de[14]/(de[10]-1),Ee=de[14]/(de[10]+1),We=(de[9]+1)/de[5],B=(de[9]-1)/de[5],wt=(de[8]-1)/de[0],xe=(Le[8]+1)/Le[0],Ce=De*wt,fe=De*xe,rt=pe/(-wt+xe),Oe=rt*-wt;Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Oe),q.translateZ(rt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const T=De+rt,y=Ee+rt,H=Ce-Oe,K=fe+(pe-Oe),$=We*Ee/y*T,Q=B*Ee/y*T;q.projectionMatrix.makePerspective(H,K,$,Q,T,y),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function N(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;M.near=A.near=w.near=q.near,M.far=A.far=w.far=q.far,(b!==M.near||z!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),b=M.near,z=M.far);const Z=q.parent,oe=M.cameras;N(M,Z);for(let pe=0;pe<oe.length;pe++)N(oe[pe],Z);oe.length===2?X(M,w,A):M.projectionMatrix.copy(w.projectionMatrix),O(q,M,Z)};function O(q,Z,oe){oe===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(oe.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=zi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)};let Y=null;function j(q,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){const oe=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let pe=!1;oe.length!==M.cameras.length&&(M.cameras.length=0,pe=!0);for(let de=0;de<oe.length;de++){const Le=oe[de];let De=null;if(f!==null)De=f.getViewport(Le);else{const We=u.getViewSubImage(d,Le);De=We.viewport,de===0&&(e.setRenderTargetTextures(p,We.colorTexture,d.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(p))}let Ee=F[de];Ee===void 0&&(Ee=new zt,Ee.layers.enable(de),Ee.viewport=new it,F[de]=Ee),Ee.matrix.fromArray(Le.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Le.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(De.x,De.y,De.width,De.height),de===0&&(M.matrix.copy(Ee.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),pe===!0&&M.cameras.push(Ee)}}for(let oe=0;oe<x.length;oe++){const pe=v[oe],de=x[oe];pe!==null&&de!==void 0&&de.update(pe,Z,c||o)}Y&&Y(q,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const se=new _l;se.setAnimationLoop(j),this.setAnimationLoop=function(q){Y=q},this.dispose=function(){}}}function sm(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ml(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,x,v,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Dt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Dt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p).envMap;if(x&&(m.envMap.value=x,m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function am(i,e,t,n){let r={},s={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,v){const S=v.program;n.uniformBlockBinding(x,S)}function c(x,v){let S=r[x.id];S===void 0&&(g(x),S=h(x),r[x.id]=S,x.addEventListener("dispose",m));const C=v.program;n.updateUBOMapping(x,C);const w=e.render.frame;s[x.id]!==w&&(d(x),s[x.id]=w)}function h(x){const v=u();x.__bindingPointIndex=v;const S=i.createBuffer(),C=x.__size,w=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,S),S}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const v=r[x.id],S=x.uniforms,C=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,A=S.length;w<A;w++){const F=Array.isArray(S[w])?S[w]:[S[w]];for(let M=0,b=F.length;M<b;M++){const z=F[M];if(f(z,w,M,C)===!0){const W=z.__offset,ee=Array.isArray(z.value)?z.value:[z.value];let D=0;for(let L=0;L<ee.length;L++){const U=ee[L],X=_(U);typeof U=="number"||typeof U=="boolean"?(z.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,W+D,z.__data)):U.isMatrix3?(z.__data[0]=U.elements[0],z.__data[1]=U.elements[1],z.__data[2]=U.elements[2],z.__data[3]=0,z.__data[4]=U.elements[3],z.__data[5]=U.elements[4],z.__data[6]=U.elements[5],z.__data[7]=0,z.__data[8]=U.elements[6],z.__data[9]=U.elements[7],z.__data[10]=U.elements[8],z.__data[11]=0):(U.toArray(z.__data,D),D+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,v,S,C){const w=x.value,A=v+"_"+S;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const F=C[A];if(typeof w=="number"||typeof w=="boolean"){if(F!==w)return C[A]=w,!0}else if(F.equals(w)===!1)return F.copy(w),!0}return!1}function g(x){const v=x.uniforms;let S=0;const C=16;for(let A=0,F=v.length;A<F;A++){const M=Array.isArray(v[A])?v[A]:[v[A]];for(let b=0,z=M.length;b<z;b++){const W=M[b],ee=Array.isArray(W.value)?W.value:[W.value];for(let D=0,L=ee.length;D<L;D++){const U=ee[D],X=_(U),N=S%C;N!==0&&C-N<X.boundary&&(S+=C-N),W.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=S,S+=X.storage}}}const w=S%C;return w>0&&(S+=C-w),x.__size=S,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function m(x){const v=x.target;v.removeEventListener("dispose",m);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function p(){for(const x in r)i.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class wl{constructor(e={}){const{canvas:t=th(),context:n=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yt,this._useLegacyLights=!1,this.toneMapping=xn,this.toneMappingExposure=1;const v=this;let S=!1,C=0,w=0,A=null,F=-1,M=null;const b=new it,z=new it;let W=null;const ee=new _e(0);let D=0,L=t.width,U=t.height,X=1,N=null,O=null;const Y=new it(0,0,L,U),j=new it(0,0,L,U);let se=!1;const q=new Ws;let Z=!1,oe=!1,pe=null;const de=new tt,Le=new ce,De=new R,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return A===null?X:1}let B=n;function wt(E,I){for(let V=0;V<E.length;V++){const k=E[V],G=t.getContext(k,I);if(G!==null)return G}return null}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bs}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",P,!1),t.addEventListener("webglcontextcreationerror",ie,!1),B===null){const I=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&I.shift(),B=wt(I,E),B===null)throw wt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let xe,Ce,fe,rt,Oe,T,y,H,K,$,Q,me,ae,he,Se,ze,J,Ye,ke,Ae,ve,ue,Ie,qe;function ot(){xe=new gf(B),Ce=new hf(B,xe,e),xe.init(Ce),ue=new tm(B,xe,Ce),fe=new Qp(B,xe,Ce),rt=new xf(B),Oe=new Bp,T=new em(B,xe,fe,Oe,Ce,ue,rt),y=new df(v),H=new mf(v),K=new wh(B,Ce),Ie=new lf(B,xe,K,Ce),$=new vf(B,K,rt,Ie),Q=new Ef(B,$,K,rt),ke=new Sf(B,Ce,T),ze=new uf(Oe),me=new zp(v,y,H,xe,Ce,Ie,ze),ae=new sm(v,Oe),he=new Hp,Se=new Yp(xe,Ce),Ye=new of(v,y,H,fe,Q,d,l),J=new jp(v,Q,Ce),qe=new am(B,rt,Ce,fe),Ae=new cf(B,xe,rt,Ce),ve=new _f(B,xe,rt,Ce),rt.programs=me.programs,v.capabilities=Ce,v.extensions=xe,v.properties=Oe,v.renderLists=he,v.shadowMap=J,v.state=fe,v.info=rt}ot();const Ge=new rm(v,B);this.xr=Ge,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const E=xe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=xe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(E){E!==void 0&&(X=E,this.setSize(L,U,!1))},this.getSize=function(E){return E.set(L,U)},this.setSize=function(E,I,V=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=E,U=I,t.width=Math.floor(E*X),t.height=Math.floor(I*X),V===!0&&(t.style.width=E+"px",t.style.height=I+"px"),this.setViewport(0,0,E,I)},this.getDrawingBufferSize=function(E){return E.set(L*X,U*X).floor()},this.setDrawingBufferSize=function(E,I,V){L=E,U=I,X=V,t.width=Math.floor(E*V),t.height=Math.floor(I*V),this.setViewport(0,0,E,I)},this.getCurrentViewport=function(E){return E.copy(b)},this.getViewport=function(E){return E.copy(Y)},this.setViewport=function(E,I,V,k){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,I,V,k),fe.viewport(b.copy(Y).multiplyScalar(X).floor())},this.getScissor=function(E){return E.copy(j)},this.setScissor=function(E,I,V,k){E.isVector4?j.set(E.x,E.y,E.z,E.w):j.set(E,I,V,k),fe.scissor(z.copy(j).multiplyScalar(X).floor())},this.getScissorTest=function(){return se},this.setScissorTest=function(E){fe.setScissorTest(se=E)},this.setOpaqueSort=function(E){N=E},this.setTransparentSort=function(E){O=E},this.getClearColor=function(E){return E.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(E=!0,I=!0,V=!0){let k=0;if(E){let G=!1;if(A!==null){const le=A.texture.format;G=le===il||le===nl||le===tl}if(G){const le=A.texture.type,ge=le===Mn||le===gn||le===Gs||le===Dn||le===Qo||le===el,ye=Ye.getClearColor(),we=Ye.getClearAlpha(),Be=ye.r,Re=ye.g,Pe=ye.b;ge?(f[0]=Be,f[1]=Re,f[2]=Pe,f[3]=we,B.clearBufferuiv(B.COLOR,0,f)):(g[0]=Be,g[1]=Re,g[2]=Pe,g[3]=we,B.clearBufferiv(B.COLOR,0,g))}else k|=B.COLOR_BUFFER_BIT}I&&(k|=B.DEPTH_BUFFER_BIT),V&&(k|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",P,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),he.dispose(),Se.dispose(),Oe.dispose(),y.dispose(),H.dispose(),Q.dispose(),Ie.dispose(),qe.dispose(),me.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",At),Ge.removeEventListener("sessionend",Qe),pe&&(pe.dispose(),pe=null),Ct.stop()};function te(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const E=rt.autoReset,I=J.enabled,V=J.autoUpdate,k=J.needsUpdate,G=J.type;ot(),rt.autoReset=E,J.enabled=I,J.autoUpdate=V,J.needsUpdate=k,J.type=G}function ie(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function re(E){const I=E.target;I.removeEventListener("dispose",re),be(I)}function be(E){Me(E),Oe.remove(E)}function Me(E){const I=Oe.get(E).programs;I!==void 0&&(I.forEach(function(V){me.releaseProgram(V)}),E.isShaderMaterial&&me.releaseShaderCache(E))}this.renderBufferDirect=function(E,I,V,k,G,le){I===null&&(I=Ee);const ge=G.isMesh&&G.matrixWorld.determinant()<0,ye=Ol(E,I,V,k,G);fe.setMaterial(k,ge);let we=V.index,Be=1;if(k.wireframe===!0){if(we=$.getWireframeAttribute(V),we===void 0)return;Be=2}const Re=V.drawRange,Pe=V.attributes.position;let ct=Re.start*Be,Nt=(Re.start+Re.count)*Be;le!==null&&(ct=Math.max(ct,le.start*Be),Nt=Math.min(Nt,(le.start+le.count)*Be)),we!==null?(ct=Math.max(ct,0),Nt=Math.min(Nt,we.count)):Pe!=null&&(ct=Math.max(ct,0),Nt=Math.min(Nt,Pe.count));const gt=Nt-ct;if(gt<0||gt===1/0)return;Ie.setup(G,k,ye,V,we);let jt,st=Ae;if(we!==null&&(jt=K.get(we),st=ve,st.setIndex(jt)),G.isMesh)k.wireframe===!0?(fe.setLineWidth(k.wireframeLinewidth*We()),st.setMode(B.LINES)):st.setMode(B.TRIANGLES);else if(G.isLine){let He=k.linewidth;He===void 0&&(He=1),fe.setLineWidth(He*We()),G.isLineSegments?st.setMode(B.LINES):G.isLineLoop?st.setMode(B.LINE_LOOP):st.setMode(B.LINE_STRIP)}else G.isPoints?st.setMode(B.POINTS):G.isSprite&&st.setMode(B.TRIANGLES);if(G.isBatchedMesh)st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)st.renderInstances(ct,gt,G.count);else if(V.isInstancedBufferGeometry){const He=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Br=Math.min(V.instanceCount,He);st.renderInstances(ct,gt,Br)}else st.render(ct,gt)};function Ke(E,I,V){E.transparent===!0&&E.side===xt&&E.forceSinglePass===!1?(E.side=Dt,E.needsUpdate=!0,Xi(E,I,V),E.side=cn,E.needsUpdate=!0,Xi(E,I,V),E.side=xt):Xi(E,I,V)}this.compile=function(E,I,V=null){V===null&&(V=E),m=Se.get(V),m.init(),x.push(m),V.traverseVisible(function(G){G.isLight&&G.layers.test(I.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),E!==V&&E.traverseVisible(function(G){G.isLight&&G.layers.test(I.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(v._useLegacyLights);const k=new Set;return E.traverse(function(G){const le=G.material;if(le)if(Array.isArray(le))for(let ge=0;ge<le.length;ge++){const ye=le[ge];Ke(ye,V,G),k.add(ye)}else Ke(le,V,G),k.add(le)}),x.pop(),m=null,k},this.compileAsync=function(E,I,V=null){const k=this.compile(E,I,V);return new Promise(G=>{function le(){if(k.forEach(function(ge){Oe.get(ge).currentProgram.isReady()&&k.delete(ge)}),k.size===0){G(E);return}setTimeout(le,10)}xe.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let je=null;function mt(E){je&&je(E)}function At(){Ct.stop()}function Qe(){Ct.start()}const Ct=new _l;Ct.setAnimationLoop(mt),typeof self<"u"&&Ct.setContext(self),this.setAnimationLoop=function(E){je=E,Ge.setAnimationLoop(E),E===null?Ct.stop():Ct.start()},Ge.addEventListener("sessionstart",At),Ge.addEventListener("sessionend",Qe),this.render=function(E,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(I),I=Ge.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,I,A),m=Se.get(E,x.length),m.init(),x.push(m),de.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(de),oe=this.localClippingEnabled,Z=ze.init(this.clippingPlanes,oe),_=he.get(E,p.length),_.init(),p.push(_),Zt(E,I,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(N,O),this.info.render.frame++,Z===!0&&ze.beginShadows();const V=m.state.shadowsArray;if(J.render(V,E,I),Z===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.render(_,E),m.setupLights(v._useLegacyLights),I.isArrayCamera){const k=I.cameras;for(let G=0,le=k.length;G<le;G++){const ge=k[G];ea(_,E,ge,ge.viewport)}}else ea(_,E,I);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(v,E,I),Ie.resetDefaultState(),F=-1,M=null,x.pop(),x.length>0?m=x[x.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Zt(E,I,V,k){if(E.visible===!1)return;if(E.layers.test(I.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(I);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||q.intersectsSprite(E)){k&&De.setFromMatrixPosition(E.matrixWorld).applyMatrix4(de);const ge=Q.update(E),ye=E.material;ye.visible&&_.push(E,ge,ye,V,De.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||q.intersectsObject(E))){const ge=Q.update(E),ye=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),De.copy(E.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),De.copy(ge.boundingSphere.center)),De.applyMatrix4(E.matrixWorld).applyMatrix4(de)),Array.isArray(ye)){const we=ge.groups;for(let Be=0,Re=we.length;Be<Re;Be++){const Pe=we[Be],ct=ye[Pe.materialIndex];ct&&ct.visible&&_.push(E,ge,ct,V,De.z,Pe)}}else ye.visible&&_.push(E,ge,ye,V,De.z,null)}}const le=E.children;for(let ge=0,ye=le.length;ge<ye;ge++)Zt(le[ge],I,V,k)}function ea(E,I,V,k){const G=E.opaque,le=E.transmissive,ge=E.transparent;m.setupLightsView(V),Z===!0&&ze.setGlobalState(v.clippingPlanes,V),le.length>0&&Fl(G,le,I,V),k&&fe.viewport(b.copy(k)),G.length>0&&Wi(G,I,V),le.length>0&&Wi(le,I,V),ge.length>0&&Wi(ge,I,V),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Fl(E,I,V,k){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;const le=Ce.isWebGL2;pe===null&&(pe=new Nn(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?Oi:Mn,minFilter:Fi,samples:le?4:0})),v.getDrawingBufferSize(Le),le?pe.setSize(Le.x,Le.y):pe.setSize(Pr(Le.x),Pr(Le.y));const ge=v.getRenderTarget();v.setRenderTarget(pe),v.getClearColor(ee),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();const ye=v.toneMapping;v.toneMapping=xn,Wi(E,V,k),T.updateMultisampleRenderTarget(pe),T.updateRenderTargetMipmap(pe);let we=!1;for(let Be=0,Re=I.length;Be<Re;Be++){const Pe=I[Be],ct=Pe.object,Nt=Pe.geometry,gt=Pe.material,jt=Pe.group;if(gt.side===xt&&ct.layers.test(k.layers)){const st=gt.side;gt.side=Dt,gt.needsUpdate=!0,ta(ct,V,k,Nt,gt,jt),gt.side=st,gt.needsUpdate=!0,we=!0}}we===!0&&(T.updateMultisampleRenderTarget(pe),T.updateRenderTargetMipmap(pe)),v.setRenderTarget(ge),v.setClearColor(ee,D),v.toneMapping=ye}function Wi(E,I,V){const k=I.isScene===!0?I.overrideMaterial:null;for(let G=0,le=E.length;G<le;G++){const ge=E[G],ye=ge.object,we=ge.geometry,Be=k===null?ge.material:k,Re=ge.group;ye.layers.test(V.layers)&&ta(ye,I,V,we,Be,Re)}}function ta(E,I,V,k,G,le){E.onBeforeRender(v,I,V,k,G,le),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(v,I,V,k,E,le),G.transparent===!0&&G.side===xt&&G.forceSinglePass===!1?(G.side=Dt,G.needsUpdate=!0,v.renderBufferDirect(V,I,k,G,E,le),G.side=cn,G.needsUpdate=!0,v.renderBufferDirect(V,I,k,G,E,le),G.side=xt):v.renderBufferDirect(V,I,k,G,E,le),E.onAfterRender(v,I,V,k,G,le)}function Xi(E,I,V){I.isScene!==!0&&(I=Ee);const k=Oe.get(E),G=m.state.lights,le=m.state.shadowsArray,ge=G.state.version,ye=me.getParameters(E,G.state,le,I,V),we=me.getProgramCacheKey(ye);let Be=k.programs;k.environment=E.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(E.isMeshStandardMaterial?H:y).get(E.envMap||k.environment),Be===void 0&&(E.addEventListener("dispose",re),Be=new Map,k.programs=Be);let Re=Be.get(we);if(Re!==void 0){if(k.currentProgram===Re&&k.lightsStateVersion===ge)return ia(E,ye),Re}else ye.uniforms=me.getUniforms(E),E.onBuild(V,ye,v),E.onBeforeCompile(ye,v),Re=me.acquireProgram(ye,we),Be.set(we,Re),k.uniforms=ye.uniforms;const Pe=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Pe.clippingPlanes=ze.uniform),ia(E,ye),k.needsLights=Bl(E),k.lightsStateVersion=ge,k.needsLights&&(Pe.ambientLightColor.value=G.state.ambient,Pe.lightProbe.value=G.state.probe,Pe.directionalLights.value=G.state.directional,Pe.directionalLightShadows.value=G.state.directionalShadow,Pe.spotLights.value=G.state.spot,Pe.spotLightShadows.value=G.state.spotShadow,Pe.rectAreaLights.value=G.state.rectArea,Pe.ltc_1.value=G.state.rectAreaLTC1,Pe.ltc_2.value=G.state.rectAreaLTC2,Pe.pointLights.value=G.state.point,Pe.pointLightShadows.value=G.state.pointShadow,Pe.hemisphereLights.value=G.state.hemi,Pe.directionalShadowMap.value=G.state.directionalShadowMap,Pe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Pe.spotShadowMap.value=G.state.spotShadowMap,Pe.spotLightMatrix.value=G.state.spotLightMatrix,Pe.spotLightMap.value=G.state.spotLightMap,Pe.pointShadowMap.value=G.state.pointShadowMap,Pe.pointShadowMatrix.value=G.state.pointShadowMatrix),k.currentProgram=Re,k.uniformsList=null,Re}function na(E){if(E.uniformsList===null){const I=E.currentProgram.getUniforms();E.uniformsList=br.seqWithValue(I.seq,E.uniforms)}return E.uniformsList}function ia(E,I){const V=Oe.get(E);V.outputColorSpace=I.outputColorSpace,V.batching=I.batching,V.instancing=I.instancing,V.instancingColor=I.instancingColor,V.skinning=I.skinning,V.morphTargets=I.morphTargets,V.morphNormals=I.morphNormals,V.morphColors=I.morphColors,V.morphTargetsCount=I.morphTargetsCount,V.numClippingPlanes=I.numClippingPlanes,V.numIntersection=I.numClipIntersection,V.vertexAlphas=I.vertexAlphas,V.vertexTangents=I.vertexTangents,V.toneMapping=I.toneMapping}function Ol(E,I,V,k,G){I.isScene!==!0&&(I=Ee),T.resetTextureUnits();const le=I.fog,ge=k.isMeshStandardMaterial?I.environment:null,ye=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:hn,we=(k.isMeshStandardMaterial?H:y).get(k.envMap||ge),Be=k.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Re=!!V.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Pe=!!V.morphAttributes.position,ct=!!V.morphAttributes.normal,Nt=!!V.morphAttributes.color;let gt=xn;k.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(gt=v.toneMapping);const jt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,st=jt!==void 0?jt.length:0,He=Oe.get(k),Br=m.state.lights;if(Z===!0&&(oe===!0||E!==M)){const Bt=E===M&&k.id===F;ze.setState(k,E,Bt)}let lt=!1;k.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Br.state.version||He.outputColorSpace!==ye||G.isBatchedMesh&&He.batching===!1||!G.isBatchedMesh&&He.batching===!0||G.isInstancedMesh&&He.instancing===!1||!G.isInstancedMesh&&He.instancing===!0||G.isSkinnedMesh&&He.skinning===!1||!G.isSkinnedMesh&&He.skinning===!0||G.isInstancedMesh&&He.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&He.instancingColor===!1&&G.instanceColor!==null||He.envMap!==we||k.fog===!0&&He.fog!==le||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==ze.numPlanes||He.numIntersection!==ze.numIntersection)||He.vertexAlphas!==Be||He.vertexTangents!==Re||He.morphTargets!==Pe||He.morphNormals!==ct||He.morphColors!==Nt||He.toneMapping!==gt||Ce.isWebGL2===!0&&He.morphTargetsCount!==st)&&(lt=!0):(lt=!0,He.__version=k.version);let Sn=He.currentProgram;lt===!0&&(Sn=Xi(k,I,G));let ra=!1,Mi=!1,Gr=!1;const Et=Sn.getUniforms(),En=He.uniforms;if(fe.useProgram(Sn.program)&&(ra=!0,Mi=!0,Gr=!0),k.id!==F&&(F=k.id,Mi=!0),ra||M!==E){Et.setValue(B,"projectionMatrix",E.projectionMatrix),Et.setValue(B,"viewMatrix",E.matrixWorldInverse);const Bt=Et.map.cameraPosition;Bt!==void 0&&Bt.setValue(B,De.setFromMatrixPosition(E.matrixWorld)),Ce.logarithmicDepthBuffer&&Et.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Et.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,Mi=!0,Gr=!0)}if(G.isSkinnedMesh){Et.setOptional(B,G,"bindMatrix"),Et.setOptional(B,G,"bindMatrixInverse");const Bt=G.skeleton;Bt&&(Ce.floatVertexTextures?(Bt.boneTexture===null&&Bt.computeBoneTexture(),Et.setValue(B,"boneTexture",Bt.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(Et.setOptional(B,G,"batchingTexture"),Et.setValue(B,"batchingTexture",G._matricesTexture,T));const Hr=V.morphAttributes;if((Hr.position!==void 0||Hr.normal!==void 0||Hr.color!==void 0&&Ce.isWebGL2===!0)&&ke.update(G,V,Sn),(Mi||He.receiveShadow!==G.receiveShadow)&&(He.receiveShadow=G.receiveShadow,Et.setValue(B,"receiveShadow",G.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(En.envMap.value=we,En.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),Mi&&(Et.setValue(B,"toneMappingExposure",v.toneMappingExposure),He.needsLights&&zl(En,Gr),le&&k.fog===!0&&ae.refreshFogUniforms(En,le),ae.refreshMaterialUniforms(En,k,X,U,pe),br.upload(B,na(He),En,T)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(br.upload(B,na(He),En,T),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Et.setValue(B,"center",G.center),Et.setValue(B,"modelViewMatrix",G.modelViewMatrix),Et.setValue(B,"normalMatrix",G.normalMatrix),Et.setValue(B,"modelMatrix",G.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Bt=k.uniformsGroups;for(let Vr=0,Gl=Bt.length;Vr<Gl;Vr++)if(Ce.isWebGL2){const sa=Bt[Vr];qe.update(sa,Sn),qe.bind(sa,Sn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Sn}function zl(E,I){E.ambientLightColor.needsUpdate=I,E.lightProbe.needsUpdate=I,E.directionalLights.needsUpdate=I,E.directionalLightShadows.needsUpdate=I,E.pointLights.needsUpdate=I,E.pointLightShadows.needsUpdate=I,E.spotLights.needsUpdate=I,E.spotLightShadows.needsUpdate=I,E.rectAreaLights.needsUpdate=I,E.hemisphereLights.needsUpdate=I}function Bl(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,I,V){Oe.get(E.texture).__webglTexture=I,Oe.get(E.depthTexture).__webglTexture=V;const k=Oe.get(E);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=V===void 0,k.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,I){const V=Oe.get(E);V.__webglFramebuffer=I,V.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(E,I=0,V=0){A=E,C=I,w=V;let k=!0,G=null,le=!1,ge=!1;if(E){const we=Oe.get(E);we.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(B.FRAMEBUFFER,null),k=!1):we.__webglFramebuffer===void 0?T.setupRenderTarget(E):we.__hasExternalTextures&&T.rebindTextures(E,Oe.get(E.texture).__webglTexture,Oe.get(E.depthTexture).__webglTexture);const Be=E.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ge=!0);const Re=Oe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Re[I])?G=Re[I][V]:G=Re[I],le=!0):Ce.isWebGL2&&E.samples>0&&T.useMultisampledRTT(E)===!1?G=Oe.get(E).__webglMultisampledFramebuffer:Array.isArray(Re)?G=Re[V]:G=Re,b.copy(E.viewport),z.copy(E.scissor),W=E.scissorTest}else b.copy(Y).multiplyScalar(X).floor(),z.copy(j).multiplyScalar(X).floor(),W=se;if(fe.bindFramebuffer(B.FRAMEBUFFER,G)&&Ce.drawBuffers&&k&&fe.drawBuffers(E,G),fe.viewport(b),fe.scissor(z),fe.setScissorTest(W),le){const we=Oe.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+I,we.__webglTexture,V)}else if(ge){const we=Oe.get(E.texture),Be=I||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,we.__webglTexture,V||0,Be)}F=-1},this.readRenderTargetPixels=function(E,I,V,k,G,le,ge){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Oe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(ye=ye[ge]),ye){fe.bindFramebuffer(B.FRAMEBUFFER,ye);try{const we=E.texture,Be=we.format,Re=we.type;if(Be!==Yt&&ue.convert(Be)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Pe=Re===Oi&&(xe.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Re!==Mn&&ue.convert(Re)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Re===vn&&(Ce.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Pe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=E.width-k&&V>=0&&V<=E.height-G&&B.readPixels(I,V,k,G,ue.convert(Be),ue.convert(Re),le)}finally{const we=A!==null?Oe.get(A).__webglFramebuffer:null;fe.bindFramebuffer(B.FRAMEBUFFER,we)}}},this.copyFramebufferToTexture=function(E,I,V=0){const k=Math.pow(2,-V),G=Math.floor(I.image.width*k),le=Math.floor(I.image.height*k);T.setTexture2D(I,0),B.copyTexSubImage2D(B.TEXTURE_2D,V,0,0,E.x,E.y,G,le),fe.unbindTexture()},this.copyTextureToTexture=function(E,I,V,k=0){const G=I.image.width,le=I.image.height,ge=ue.convert(V.format),ye=ue.convert(V.type);T.setTexture2D(V,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,V.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,V.unpackAlignment),I.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,k,E.x,E.y,G,le,ge,ye,I.image.data):I.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,k,E.x,E.y,I.mipmaps[0].width,I.mipmaps[0].height,ge,I.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,k,E.x,E.y,ge,ye,I.image),k===0&&V.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(E,I,V,k,G=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const le=E.max.x-E.min.x+1,ge=E.max.y-E.min.y+1,ye=E.max.z-E.min.z+1,we=ue.convert(k.format),Be=ue.convert(k.type);let Re;if(k.isData3DTexture)T.setTexture3D(k,0),Re=B.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)T.setTexture2DArray(k,0),Re=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,k.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,k.unpackAlignment);const Pe=B.getParameter(B.UNPACK_ROW_LENGTH),ct=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Nt=B.getParameter(B.UNPACK_SKIP_PIXELS),gt=B.getParameter(B.UNPACK_SKIP_ROWS),jt=B.getParameter(B.UNPACK_SKIP_IMAGES),st=V.isCompressedTexture?V.mipmaps[G]:V.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,st.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,st.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,E.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,E.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,E.min.z),V.isDataTexture||V.isData3DTexture?B.texSubImage3D(Re,G,I.x,I.y,I.z,le,ge,ye,we,Be,st.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Re,G,I.x,I.y,I.z,le,ge,ye,we,st.data)):B.texSubImage3D(Re,G,I.x,I.y,I.z,le,ge,ye,we,Be,st),B.pixelStorei(B.UNPACK_ROW_LENGTH,Pe),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ct),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Nt),B.pixelStorei(B.UNPACK_SKIP_ROWS,gt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,jt),G===0&&k.generateMipmaps&&B.generateMipmap(Re),fe.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),fe.unbindTexture()},this.resetState=function(){C=0,w=0,A=null,fe.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Hs?"display-p3":"srgb",t.unpackColorSpace=Je.workingColorSpace===Nr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===yt?Un:sl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Un?yt:hn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class om extends wl{}om.prototype.isWebGL1Renderer=!0;class lm extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Co extends ht{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ni=new tt,Ro=new tt,pr=[],Lo=new zn,cm=new tt,Ti=new Xe,wi=new Bn;class Po extends Xe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Co(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,cm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ni),Lo.copy(e.boundingBox).applyMatrix4(ni),this.boundingBox.union(Lo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ni),wi.copy(e.boundingSphere).applyMatrix4(ni),this.boundingSphere.union(wi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Ti.geometry=this.geometry,Ti.material=this.material,Ti.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wi.copy(this.boundingSphere),wi.applyMatrix4(n),e.ray.intersectsSphere(wi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ni),Ro.multiplyMatrices(n,ni),Ti.matrixWorld=Ro,Ti.raycast(e,pr);for(let o=0,a=pr.length;o<a;o++){const l=pr[o];l.instanceId=s,l.object=this,t.push(l)}pr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Co(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class ri extends _i{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Do=new R,Io=new R,Uo=new tt,_s=new ks,mr=new Bn;class hm extends dt{constructor(e=new et,t=new ri){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Do.fromBufferAttribute(t,r-1),Io.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Do.distanceTo(Io);e.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(r),mr.radius+=s,e.ray.intersectsSphere(mr)===!1)return;Uo.copy(r).invert(),_s.copy(e.ray).applyMatrix4(Uo);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new R,h=new R,u=new R,d=new R,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),x=Math.min(g.count,o.start+o.count);for(let v=p,S=x-1;v<S;v+=f){const C=g.getX(v),w=g.getX(v+1);if(c.fromBufferAttribute(m,C),h.fromBufferAttribute(m,w),_s.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const F=e.ray.origin.distanceTo(d);F<e.near||F>e.far||t.push({distance:F,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),x=Math.min(m.count,o.start+o.count);for(let v=p,S=x-1;v<S;v+=f){if(c.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),_s.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(d);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const No=new R,Fo=new R;class Ai extends hm{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)No.fromBufferAttribute(t,r),Fo.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+No.distanceTo(Fo);e.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Tr extends _i{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Oo=new tt,Ns=new ks,gr=new Bn,vr=new R;class sn extends dt{constructor(e=new et,t=new Tr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(r),gr.radius+=s,e.ray.intersectsSphere(gr)===!1)return;Oo.copy(r).invert(),Ns.copy(e.ray).applyMatrix4(Oo);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);vr.fromBufferAttribute(u,m),zo(vr,m,l,r,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)vr.fromBufferAttribute(u,g),zo(vr,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function zo(i,e,t,n,r,s,o){const a=Ns.distanceSqToPoint(i);if(a<t){const l=new R;Ns.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Ci extends Ut{constructor(e,t,n,r,s,o,a,l,c){super(e,t,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Kt{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=n[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===o)return r/(s-1);const h=n[r],d=n[r+1]-h,f=(o-h)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new ce:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new R,r=[],s=[],o=[],a=new R,l=new tt;for(let f=0;f<=e;f++){const g=f/e;r[f]=this.getTangentAt(g,new R)}s[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(St(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(St(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class qs extends Kt{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const n=t||new ce,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class um extends qs{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ys(){let i=0,e=0,t=0,n=0;function r(s,o,a,l){i=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,r(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const _r=new R,xs=new Ys,Ms=new Ys,ys=new Ys;class dm extends Kt{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(_r.subVectors(r[0],r[1]).add(r[0]),c=_r);const u=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(_r.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=_r),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),xs.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),Ms.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),ys.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(xs.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Ms.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),ys.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(xs.calc(l),Ms.calc(l),ys.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Bo(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,l=i*a;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*a+s*i+t}function fm(i,e){const t=1-i;return t*t*e}function pm(i,e){return 2*(1-i)*i*e}function mm(i,e){return i*i*e}function Di(i,e,t,n){return fm(i,e)+pm(i,t)+mm(i,n)}function gm(i,e){const t=1-i;return t*t*t*e}function vm(i,e){const t=1-i;return 3*t*t*i*e}function _m(i,e){return 3*(1-i)*i*i*e}function xm(i,e){return i*i*i*e}function Ii(i,e,t,n,r){return gm(i,e)+vm(i,t)+_m(i,n)+xm(i,r)}class Al extends Kt{constructor(e=new ce,t=new ce,n=new ce,r=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ce){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ii(e,r.x,s.x,o.x,a.x),Ii(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mm extends Kt{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ii(e,r.x,s.x,o.x,a.x),Ii(e,r.y,s.y,o.y,a.y),Ii(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Cl extends Kt{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ym extends Kt{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rl extends Kt{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Di(e,r.x,s.x,o.x),Di(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sm extends Kt{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Di(e,r.x,s.x,o.x),Di(e,r.y,s.y,o.y),Di(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ll extends Kt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return n.set(Bo(a,l.x,c.x,h.x,u.x),Bo(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new ce().fromArray(r))}return this}}var Go=Object.freeze({__proto__:null,ArcCurve:um,CatmullRomCurve3:dm,CubicBezierCurve:Al,CubicBezierCurve3:Mm,EllipseCurve:qs,LineCurve:Cl,LineCurve3:ym,QuadraticBezierCurve:Rl,QuadraticBezierCurve3:Sm,SplineCurve:Ll});class Em extends Kt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Go[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new Go[r.type]().fromJSON(r))}return this}}class Ho extends Em{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Cl(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new Rl(this.currentPoint.clone(),new ce(e,t),new ce(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new Al(this.currentPoint.clone(),new ce(e,t),new ce(n,r),new ce(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Ll(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,o,a,l),this}absellipse(e,t,n,r,s,o,a,l){const c=new qs(e,t,n,r,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Zs extends et{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new R,h=new ce;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*r;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Fe(o,3)),this.setAttribute("normal",new Fe(a,3)),this.setAttribute("uv",new Fe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Js extends et{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;x(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Fe(u,3)),this.setAttribute("normal",new Fe(d,3)),this.setAttribute("uv",new Fe(f,2));function x(){const S=new R,C=new R;let w=0;const A=(t-e)/n;for(let F=0;F<=s;F++){const M=[],b=F/s,z=b*(t-e)+e;for(let W=0;W<=r;W++){const ee=W/r,D=ee*l+a,L=Math.sin(D),U=Math.cos(D);C.x=z*L,C.y=-b*n+m,C.z=z*U,u.push(C.x,C.y,C.z),S.set(L,A,U).normalize(),d.push(S.x,S.y,S.z),f.push(ee,1-b),M.push(g++)}_.push(M)}for(let F=0;F<r;F++)for(let M=0;M<s;M++){const b=_[M][F],z=_[M+1][F],W=_[M+1][F+1],ee=_[M][F+1];h.push(b,z,ee),h.push(z,W,ee),w+=6}c.addGroup(p,w,0),p+=w}function v(S){const C=g,w=new ce,A=new R;let F=0;const M=S===!0?e:t,b=S===!0?1:-1;for(let W=1;W<=r;W++)u.push(0,m*b,0),d.push(0,b,0),f.push(.5,.5),g++;const z=g;for(let W=0;W<=r;W++){const D=W/r*l+a,L=Math.cos(D),U=Math.sin(D);A.x=M*U,A.y=m*b,A.z=M*L,u.push(A.x,A.y,A.z),d.push(0,b,0),w.x=L*.5+.5,w.y=U*.5*b+.5,f.push(w.x,w.y),g++}for(let W=0;W<r;W++){const ee=C+W,D=z+W;S===!0?h.push(D,D+1,ee):h.push(D+1,D,ee),F+=3}c.addGroup(p,F,S===!0?1:2),p+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ui extends Js{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ui(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $s extends et{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),c(n),h(),this.setAttribute("position",new Fe(s,3)),this.setAttribute("normal",new Fe(s.slice(),3)),this.setAttribute("uv",new Fe(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const v=new R,S=new R,C=new R;for(let w=0;w<t.length;w+=3)f(t[w+0],v),f(t[w+1],S),f(t[w+2],C),l(v,S,C,x)}function l(x,v,S,C){const w=C+1,A=[];for(let F=0;F<=w;F++){A[F]=[];const M=x.clone().lerp(S,F/w),b=v.clone().lerp(S,F/w),z=w-F;for(let W=0;W<=z;W++)W===0&&F===w?A[F][W]=M:A[F][W]=M.clone().lerp(b,W/z)}for(let F=0;F<w;F++)for(let M=0;M<2*(w-F)-1;M++){const b=Math.floor(M/2);M%2===0?(d(A[F][b+1]),d(A[F+1][b]),d(A[F][b])):(d(A[F][b+1]),d(A[F+1][b+1]),d(A[F+1][b]))}}function c(x){const v=new R;for(let S=0;S<s.length;S+=3)v.x=s[S+0],v.y=s[S+1],v.z=s[S+2],v.normalize().multiplyScalar(x),s[S+0]=v.x,s[S+1]=v.y,s[S+2]=v.z}function h(){const x=new R;for(let v=0;v<s.length;v+=3){x.x=s[v+0],x.y=s[v+1],x.z=s[v+2];const S=m(x)/2/Math.PI+.5,C=p(x)/Math.PI+.5;o.push(S,1-C)}g(),u()}function u(){for(let x=0;x<o.length;x+=6){const v=o[x+0],S=o[x+2],C=o[x+4],w=Math.max(v,S,C),A=Math.min(v,S,C);w>.9&&A<.1&&(v<.2&&(o[x+0]+=1),S<.2&&(o[x+2]+=1),C<.2&&(o[x+4]+=1))}}function d(x){s.push(x.x,x.y,x.z)}function f(x,v){const S=x*3;v.x=e[S+0],v.y=e[S+1],v.z=e[S+2]}function g(){const x=new R,v=new R,S=new R,C=new R,w=new ce,A=new ce,F=new ce;for(let M=0,b=0;M<s.length;M+=9,b+=6){x.set(s[M+0],s[M+1],s[M+2]),v.set(s[M+3],s[M+4],s[M+5]),S.set(s[M+6],s[M+7],s[M+8]),w.set(o[b+0],o[b+1]),A.set(o[b+2],o[b+3]),F.set(o[b+4],o[b+5]),C.copy(x).add(v).add(S).divideScalar(3);const z=m(C);_(w,b+0,x,z),_(A,b+2,v,z),_(F,b+4,S,z)}}function _(x,v,S,C){C<0&&x.x===1&&(o[v]=x.x-1),S.x===0&&S.z===0&&(o[v]=C/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $s(e.vertices,e.indices,e.radius,e.details)}}const xr=new R,Mr=new R,Ss=new R,yr=new Ht;class Es extends et{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(ui*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:m,c:p}=yr;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),yr.getNormal(Ss),u[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,u[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,u[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const v=(x+1)%3,S=u[x],C=u[v],w=yr[h[x]],A=yr[h[v]],F=`${S}_${C}`,M=`${C}_${S}`;M in d&&d[M]?(Ss.dot(d[M].normal)<=s&&(f.push(w.x,w.y,w.z),f.push(A.x,A.y,A.z)),d[M]=null):F in d||(d[F]={index0:c[x],index1:c[v],normal:Ss.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:m}=d[g];xr.fromBufferAttribute(a,_),Mr.fromBufferAttribute(a,m),f.push(xr.x,xr.y,xr.z),f.push(Mr.x,Mr.y,Mr.z)}this.setAttribute("position",new Fe(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Fs extends Ho{constructor(e){super(e),this.uuid=On(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new Ho().fromJSON(r))}return this}}const bm={triangulate:function(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=Pl(i,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,d,f;if(n&&(s=Rm(i,e,s,t)),i.length>80*t){a=c=i[0],l=h=i[1];for(let g=t;g<r;g+=t)u=i[g],d=i[g+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Gi(s,o,t,a,l,f,0),o}};function Pl(i,e,t,n,r){let s,o;if(r===Gm(i,e,t,n)>0)for(s=e;s<t;s+=n)o=Vo(s,i[s],i[s+1],o);else for(s=t-n;s>=e;s-=n)o=Vo(s,i[s],i[s+1],o);return o&&zr(o,o.next)&&(Vi(o),o=o.next),o}function Fn(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(zr(t,t.next)||at(t.prev,t,t.next)===0)){if(Vi(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Gi(i,e,t,n,r,s,o){if(!i)return;!o&&s&&Um(i,n,r,s);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?wm(i,n,r,s):Tm(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),Vi(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Am(Fn(i),e,t),Gi(i,e,t,n,r,s,2)):o===2&&Cm(i,e,t,n,r,s):Gi(Fn(i),e,t,n,r,s,1);break}}}function Tm(i){const e=i.prev,t=i,n=i.next;if(at(e,t,n)>=0)return!1;const r=e.x,s=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=r<s?r<o?r:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,d=r>s?r>o?r:o:s>o?s:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&oi(r,a,s,l,o,c,g.x,g.y)&&at(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function wm(i,e,t,n){const r=i.prev,s=i,o=i.next;if(at(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=a>l?a>c?a:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=Os(f,g,e,t,n),x=Os(_,m,e,t,n);let v=i.prevZ,S=i.nextZ;for(;v&&v.z>=p&&S&&S.z<=x;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&oi(a,h,l,u,c,d,v.x,v.y)&&at(v.prev,v,v.next)>=0||(v=v.prevZ,S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&oi(a,h,l,u,c,d,S.x,S.y)&&at(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&oi(a,h,l,u,c,d,v.x,v.y)&&at(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;S&&S.z<=x;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&oi(a,h,l,u,c,d,S.x,S.y)&&at(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Am(i,e,t){let n=i;do{const r=n.prev,s=n.next.next;!zr(r,s)&&Dl(r,n,n.next,s)&&Hi(r,s)&&Hi(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Vi(n),Vi(n.next),n=i=s),n=n.next}while(n!==i);return Fn(n)}function Cm(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Om(o,a)){let l=Il(o,a);o=Fn(o,o.next),l=Fn(l,l.next),Gi(o,e,t,n,r,s,0),Gi(l,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Rm(i,e,t,n){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*n,l=s<o-1?e[s+1]*n:i.length,c=Pl(i,a,l,n,!1),c===c.next&&(c.steiner=!0),r.push(Fm(c));for(r.sort(Lm),s=0;s<r.length;s++)t=Pm(r[s],t);return t}function Lm(i,e){return i.x-e.x}function Pm(i,e){const t=Dm(i,e);if(!t)return e;const n=Il(t,i);return Fn(n,n.next),Fn(t,t.next)}function Dm(i,e){let t=e,n=-1/0,r;const s=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,r=t.x<t.next.x?t:t.next,d===s))return r}t=t.next}while(t!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let h=1/0,u;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&oi(o<c?s:n,o,l,c,o<c?n:s,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(s-t.x),Hi(t,i)&&(u<h||u===h&&(t.x>r.x||t.x===r.x&&Im(r,t)))&&(r=t,h=u)),t=t.next;while(t!==a);return r}function Im(i,e){return at(i.prev,i,e.prev)<0&&at(e.next,i,i.next)<0}function Um(i,e,t,n){let r=i;do r.z===0&&(r.z=Os(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Nm(r)}function Nm(i){let e,t,n,r,s,o,a,l,c=1;do{for(t=i,i=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,a--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,c*=2}while(o>1);return i}function Os(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Fm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function oi(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function Om(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!zm(i,e)&&(Hi(i,e)&&Hi(e,i)&&Bm(i,e)&&(at(i.prev,i,e.prev)||at(i,e.prev,e))||zr(i,e)&&at(i.prev,i,i.next)>0&&at(e.prev,e,e.next)>0)}function at(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function zr(i,e){return i.x===e.x&&i.y===e.y}function Dl(i,e,t,n){const r=Er(at(i,e,t)),s=Er(at(i,e,n)),o=Er(at(t,n,i)),a=Er(at(t,n,e));return!!(r!==s&&o!==a||r===0&&Sr(i,t,e)||s===0&&Sr(i,n,e)||o===0&&Sr(t,i,n)||a===0&&Sr(t,e,n))}function Sr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Er(i){return i>0?1:i<0?-1:0}function zm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Dl(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Hi(i,e){return at(i.prev,i,i.next)<0?at(i,e,i.next)>=0&&at(i,i.prev,e)>=0:at(i,e,i.prev)<0||at(i,i.next,e)<0}function Bm(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Il(i,e){const t=new zs(i.i,i.x,i.y),n=new zs(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Vo(i,e,t,n){const r=new zs(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Vi(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function zs(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Gm(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class Ni{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Ni.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];ko(e),Wo(n,e);let o=e.length;t.forEach(ko);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,Wo(n,t[l]);const a=bm.triangulate(n,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function ko(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Wo(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class li extends $s{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new li(e.radius,e.detail)}}class Ks extends et{constructor(e=.5,t=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/r,f=new R,g=new ce;for(let _=0;_<=r;_++){for(let m=0;m<=n;m++){const p=s+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<r;_++){const m=_*(n+1);for(let p=0;p<n;p++){const x=p+m,v=x,S=x+n+1,C=x+n+2,w=x+1;a.push(v,S,w),a.push(S,C,w)}}this.setIndex(a),this.setAttribute("position",new Fe(l,3)),this.setAttribute("normal",new Fe(c,3)),this.setAttribute("uv",new Fe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ks(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Dr extends et{constructor(e=new Fs([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Fe(r,3)),this.setAttribute("normal",new Fe(s,3)),this.setAttribute("uv",new Fe(o,2));function c(h){const u=r.length/3,d=h.extractPoints(t);let f=d.shape;const g=d.holes;Ni.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const x=g[m];Ni.isClockWise(x)===!0&&(g[m]=x.reverse())}const _=Ni.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const x=g[m];f=f.concat(x)}for(let m=0,p=f.length;m<p;m++){const x=f[m];r.push(x.x,x.y,0),s.push(0,0,1),o.push(x.x,x.y)}for(let m=0,p=_.length;m<p;m++){const x=_[m],v=x[0]+u,S=x[1]+u,C=x[2]+u;n.push(v,S,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Hm(t,e)}static fromJSON(e,t){const n=[];for(let r=0,s=e.shapes.length;r<s;r++){const o=t[e.shapes[r]];n.push(o)}return new Dr(n,e.curveSegments)}}function Hm(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}class ci extends et{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new R,d=new R,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const x=[],v=p/n;let S=0;p===0&&o===0?S=.5/t:p===n&&l===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){const w=C/t;u.x=-e*Math.cos(r+w*s)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(r+w*s)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(w+S,1-v),x.push(c++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const v=h[p][x+1],S=h[p][x],C=h[p+1][x],w=h[p+1][x+1];(p!==0||o>0)&&f.push(v,S,w),(p!==n-1||l<Math.PI)&&f.push(S,C,w)}this.setIndex(f),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(_,3)),this.setAttribute("uv",new Fe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ir extends et{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],l=[],c=[],h=new R,u=new R,d=new R;for(let f=0;f<=n;f++)for(let g=0;g<=r;g++){const _=g/r*s,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/r),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=r;g++){const _=(r+1)*f+g-1,m=(r+1)*(f-1)+g-1,p=(r+1)*(f-1)+g,x=(r+1)*f+g;o.push(_,m,x),o.push(m,p,x)}this.setIndex(o),this.setAttribute("position",new Fe(a,3)),this.setAttribute("normal",new Fe(l,3)),this.setAttribute("uv",new Fe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ir(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}const Xo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Vm{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const km=new Vm;class Ul{constructor(e){this.manager=e!==void 0?e:km,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ul.DEFAULT_MATERIAL_NAME="__DEFAULT";class Wm extends Ul{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Xo.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Bi("img");function l(){h(),Xo.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class js extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new _e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const bs=new tt,qo=new R,Yo=new R;class Nl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ws,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;qo.setFromMatrixPosition(e.matrixWorld),t.position.copy(qo),Yo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yo),t.updateMatrixWorld(),bs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bs),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(bs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Zo=new tt,Ri=new R,Ts=new R;class Xm extends Nl{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ce(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ri.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ri),Ts.copy(n.position),Ts.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ts),n.updateMatrixWorld(),r.makeTranslation(-Ri.x,-Ri.y,-Ri.z),Zo.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zo)}}class qm extends js{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Xm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ym extends Nl{constructor(){super(new xl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zm extends js{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new Ym}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Jm extends js{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bs}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bs);let Te=null;class $m{constructor(e,t={}){this.canvas=e,this.activeModes=t.activeModes||new Set,this.mode=t.mode||"none",this.mindWaveMode=t.mindWaveMode!==void 0?t.mindWaveMode:!0,this.galaxySunStyle=t.galaxySunStyle||"sun",this.currentCymaticData={name:"Fundamental Zenith",n:1,m:1,energy:.2},this.cymaticsHistory=[],this.cymaticsHistoryIndex=-1,this._cymaticDriftOffset=Math.random()*1e3,this.cyberConfig={logicMode:t.cyberLogicMode||"matrix",customText:t.cyberCustomText||"WELCOME",angle:t.cyberAngle||0,speed:t.cyberSpeedMultiplier||1,length:1,color:"#00FF41",rainbow:!0},this.matrixConfig={logicMode:t.matrixLogicMode||"interstellar",customText:t.matrixCustomText||"MINDWAVE",angle:0,speed:1,length:1,color:"#00FF41",rainbow:!1},this.initialized=!1,this._rainbowEnabled=t.rainbowEnabled||!1,this.isVisualizer3D=!0,this.overlayCanvas=document.getElementById("cyberCanvas"),this.overlayCtx=this.overlayCanvas?this.overlayCanvas.getContext("2d",{alpha:!0}):null,this.overlayCanvas&&(this.resizeOverlayCanvas(),window.addEventListener("resize",()=>this.resizeOverlayCanvas())),this.matrixCyberStreams=[],this.currentCyberAngle=t.cyberAngle!==void 0?t.cyberAngle:0,this.cyberColorCustomized=!1;try{const r=localStorage.getItem("cyberThemeHistory");this.themeHistory=r?JSON.parse(r):[],this.lastCyberFamily=localStorage.getItem("cyberLastFamily")||""}catch{this.themeHistory=[],this.lastCyberFamily=""}this.currentLogoOpacity=.8,this.targetLogoOpacity=.8,Te=this,this.themeType=document.body.dataset.themeType||"dark";const n=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);this.batterySaver=t.batterySaver!==void 0?t.batterySaver:n,this.isLowPower=this.batterySaver||localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode"),this.lastFrameRenderTime=0,this.targetFPS=this.isLowPower?30:60,this.vibrationEnabled=typeof Ne<"u"&&Ne.visualVibration!==void 0?Ne.visualVibration:t.visualVibration!==void 0?t.visualVibration:!1,this._fpsRingBuffer=new Float64Array(60),this._fpsRingIndex=0,this._fpsRingCount=0,this.lastLodDegradation=0,this.currentLodLevel="high",this._tempColor=new _e,this._logoRenderCanvas=null,this.sphereGroup=new $e,this.particleGroup=new $e,this.lightspeedGroup=new $e,this.lavaGroup=new $e,this.fireplaceGroup=new $e,this.rainforestGroup=new $e,this.zenGardenGroup=new $e,this.oceanGroup=new $e,this.wavesGroup=new $e,this.cyberGroup=new $e,this.boxGroup=new $e,this.dragonGroup=new $e,this.galaxyGroup=new $e,this.mandalaGroup=new $e,this.cymaticsGroup=new $e,this.snowflakeGroup=new $e,this._snowData=null;try{this.scene=new lm,[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup].forEach(o=>this.scene.add(o)),this.camera=new zt(75,e.width/e.height,.1,1e3),this.renderer=new wl({canvas:e,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(0,0),this.renderer.setSize(e.clientWidth,e.clientHeight);const s=this.isLowPower?1:2;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,s)),this.textures={},this.customColors={},this.customColor=null,this._isRendering=!1,this._freqDataArray=null,this.initEnvironment(),this.camera.position.z=5,this.handleLayoutChange=this.handleLayoutChange.bind(this),window.addEventListener("resize",()=>{this.resize(),this.handleLayoutChange()}),window.addEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode=()=>{this.currentLodLevel!=="low"&&(console.log("[Visualizer] Safe Mode: Dropping LOD to 'low'."),this.degradeLOD(),this.degradeLOD())},window.addEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange=()=>{document.hidden?console.log("[Visualizer] Tab hidden, pausing render loop to save battery."):(console.log("[Visualizer] Tab visible, resuming render loop."),this.lastTime=performance.now()*.001,this.active!==!1&&this.initialized&&this.render(Ne.analyserLeft,Ne.analyserRight))},document.addEventListener("visibilitychange",this._boundVisibilityChange),this._boundContextLost=o=>{o.preventDefault(),console.warn("[Visualizer] WebGL context LOST. Halting render loop."),this.active=!1,Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null)},e.addEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored=()=>{console.log("[Visualizer] WebGL context RESTORED. Reinitializing...");try{this.initialized=!1,this._freqDataArray=null,this.initEnvironment(),this.updateVisibility(),this.initialized=!0,this.active=!0,this.lastTime=performance.now()*.001,Ne.animationId&&cancelAnimationFrame(Ne.animationId),this._isRendering=!1,this.render(Ne.analyserLeft,Ne.analyserRight)}catch(o){console.error("[Visualizer] Failed to recover from context loss:",o)}},e.addEventListener("webglcontextrestored",this._boundContextRestored),this.resize(),setTimeout(this.handleLayoutChange,100),this._boundThemeChange=o=>{if(o.detail&&o.detail.type){const a=o.detail.type;this.themeType!==a&&(this.themeType=a,console.log(`[Visualizer] Theme type changed to: ${a}. Updating logo texture.`),this.updateLogoTexture())}},window.addEventListener("themeChanged",this._boundThemeChange),this.speedMultiplier=1,this.brightnessMultiplier=1,this.lastTime=performance.now()*.001,this.simTime=0,this.targetFPS=60,this.lastFrameRenderTime=0,this.active=!0,this.updateVisibility(),this.initialized=!0,this.initOverlayLogo(),window.viz3D=this,console.log("[Viz] Visualizer3D Hard-Linked to Global Scope.")}catch(r){console.error("Three.js Init Failed:",r),this.initialized=!1}}resize(){if(!this.renderer||!this.canvas||!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.handleLayoutChange()}handleLayoutChange(){!this.renderer||!this.camera||(this.camera.clearViewOffset(),console.log("[Visualizer] Layout update: Centered background mode (Full Window)"))}resizeOverlayCanvas(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight)}generateCyberStyle(){const e=this.overlayCanvas,t=this.overlayCtx;if(!e||!t)return;this.matrixCyberStreams=[];const n=Math.max(11,Math.min(21,Math.floor(e.width/50)));this.isLowPower=localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode");let r=Math.ceil(e.width/n);this.isLowPower||(r*=1.5);let s=window.getCurrentTheme?window.getCurrentTheme():{color:"#2dd4bf"};this.resizeOverlayCanvas(),this.cyberColorCustomized=!1;const o=[{name:"System Yellow",color:"#FFFF00",family:"yellow"},{name:"Neon Pink",color:"#FF1493",family:"pink"},{name:"Chrome Static",color:"#C0C0C0",family:"mono"},{name:"Royal Data",color:"#4169E1",family:"blue"},{name:"White Noise",color:"#FFFFFF",family:"mono"},{name:"Cyan Future",color:"#00FFFF",family:"blue"},{name:"Lime Access",color:"#32CD32",family:"green"},{name:"Purple Haze",color:"#800080",family:"purple"},{name:"Emerald Link",color:"#50C878",family:"green"},{name:"Ice Blue",color:"#A5F2F3",family:"blue"},{name:"sentAIent Blue",color:"#60A9FF",family:"blue"},{name:"Rainbow Surge",color:"rainbow",family:"rainbow"}],a=this.lastCyberFamily||"";let l=o.filter(f=>!this.themeHistory.includes(f.name));const c=l.filter(f=>f.family!==a);c.length>0&&(l=c);let h=l;if(h.length===0){const f=this.themeHistory[this.themeHistory.length-1];h=o.filter(g=>g.name!==f)}const u=h[Math.floor(Math.random()*h.length)];this.themeHistory.push(u.name),this.themeHistory.length>5&&this.themeHistory.shift(),this.lastCyberFamily=u.family;try{localStorage.setItem("cyberThemeHistory",JSON.stringify(this.themeHistory)),localStorage.setItem("cyberLastFamily",this.lastCyberFamily)}catch(f){console.warn("LocalStorage failed",f)}this.cyberSpeedMultiplier===void 0&&(this.cyberSpeedMultiplier=.2),this.cyberLengthMultiplier===void 0&&(this.cyberLengthMultiplier=.7);const d=document.getElementById("cyberRainbowToggle");if(d&&this.cyberRainbowMode===void 0&&(this.cyberRainbowMode=!0,this.cyberConfig.rainbow=!0,d.checked=!0),!this.cyberRainbowMode&&s.color!=="rainbow"){this.cyberColor=s.color;const f=document.getElementById("cyberColorPicker");f&&(f.value=this.cyberColor)}for(let f=0;f<r;f++){const g=Math.random(),_=Math.floor(8+g*11),m=(2+g*8+Math.random()*2)*this.cyberSpeedMultiplier;this.matrixCyberStreams.push({x:f*n,y:Math.random()*this.overlayCanvas.height*1.5-this.overlayCanvas.height*.5,baseSpeed:m,opacity:.2+g*.8,size:_,chars:[],color:s.color!=="rainbow"?s.color:"#FFFFFF"})}this.updateCyberStrings(),this.matrixCyberStreams.sort((f,g)=>f.size-g.size)}renderCyberCyber(){const e=this.activeModes.has("cyber");if(!this.overlayCtx||!this.matrixCyberStreams||!e)return;const t=this.overlayCtx,n=this.overlayCanvas;t.clearRect(0,0,n.width,n.height);const r=this.activeModes.size>1;t.fillStyle=r?"rgba(0, 0, 0, 0.4)":"rgba(0, 0, 0, 0.85)",t.fillRect(0,0,n.width,n.height),t.save(),t.textAlign="center";const s=this.cyberConfig,o=s.speed||1,a=s.length||1;s.angle!==0&&(t.translate(n.width/2,n.height/2),t.rotate(s.angle*Math.PI/180),t.translate(-n.width/2,-n.height/2));const l=20,c=Date.now()*.1;t.textBaseline="middle";let h=-1;this.matrixCyberStreams.forEach((u,d)=>{u.y+=u.baseSpeed*o;let f=Math.max(3,Math.floor(l*a));(this.isLowPower||this.currentLodLevel==="low")&&(f=Math.floor(f*.4)),u.y-f*u.size>n.height*1.5&&(u.y=0);const g="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";u.size!==h&&(t.font=`${u.size}px monospace`,h=u.size);const _=this.isLowPower&&this.currentLodLevel==="low"?2:1;for(let m=0;m<f&&m<u.chars.length;m+=_){!u.isTextMode&&Math.random()<.02&&(u.chars[m]=g.charAt(Math.floor(Math.random()*g.length)));const p=u.chars[m],x=u.y-m*u.size;if(x<-u.size*2||x>n.height*1.5)continue;const v=1-m/f,S=Math.pow(v,.4)*(u.opacity*1.2);if(t.globalAlpha=Math.min(1,S),this.cyberRainbowMode){const C=(c+d*15+m*5)%360;t.fillStyle=`hsl(${C}, 100%, 60%)`}else t.fillStyle=u.color||this.cyberColor;t.fillText(p,u.x,x)}}),t.shadowBlur=0,t.globalAlpha=1,t.restore()}initSphere(){var o;const e=new li(2,2),t=new Lt({color:6334975,wireframe:!0,transparent:!0,opacity:.5});this.sphere=new Xe(e,t);const n=new li(1.8,1),r=new Lt({color:6334975,transparent:!0,opacity:.1,blending:Ze});this.core=new Xe(n,r),this.sphereGroup.add(this.sphere),this.sphereGroup.add(this.core),this.sphereGroup.visible=!1;const s=((o=this.customColors)==null?void 0:o.sphere)||this.customColor;s&&(this.sphere.material.color.copy(s),this.core.material.color.copy(s))}initLightspeed(){const t=new et,n=new Float32Array(2e3*3);for(let r=0;r<2e3*3;r++)n[r]=(Math.random()-.5)*80;t.setAttribute("position",new ht(n,3)),this.lightspeedMaterial=new _t({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new _e(3003583)},uTexture:{value:this.createCircleTexture()}},vertexShader:`
                uniform float uTime, uSpeed;
                void main() {
                    vec3 pos = position;
                    pos.z = mod(pos.z + uTime * uSpeed * 20.0 + 40.0, 80.0) - 40.0;
                    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = 15.0 / -mv.z;
                }
            `,fragmentShader:`
                uniform vec3 uColor;
                uniform sampler2D uTexture;
                void main() {
                    vec4 tex = texture2D(uTexture, gl_PointCoord);
                    if (tex.a < 0.1) discard;
                    gl_FragColor = vec4(uColor, tex.a * 0.8);
                }
            `,transparent:!0,blending:Ze,depthWrite:!1}),this.lightspeed=new sn(t,this.lightspeedMaterial),this.lightspeedGroup.add(this.lightspeed)}initParticles(){const e=this.batterySaver?400:1e3,t=new et,n=new Float32Array(e*3),r=new Float32Array(e*3);for(let s=0;s<e;s++){const o=s*3;n[o]=(Math.random()-.5)*60,n[o+1]=(Math.random()-.5)*60,n[o+2]=(Math.random()-.5)*80;const a=Math.random();a<.3?(r[o]=.4,r[o+1]=.7,r[o+2]=1):a<.6?(r[o]=.3,r[o+1]=.9,r[o+2]=.95):a<.85?(r[o]=.6,r[o+1]=.4,r[o+2]=1):(r[o]=.9,r[o+1]=.9,r[o+2]=1)}t.setAttribute("position",new ht(n,3)),t.setAttribute("color",new ht(r,3)),this.particleMaterial=new _t({uniforms:{uTime:{value:0},uSpeed:{value:1},uSize:{value:.4},uTexture:{value:this.createCircleTexture()}},vertexShader:`
                varying vec3 vColor;
                uniform float uTime, uSpeed;
                attribute vec3 color;
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    // Move in Z direction and wrap
                    pos.z = mod(pos.z + uTime * uSpeed * 20.0 + 40.0, 80.0) - 40.0;
                    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = 40.0 / -mv.z;
                }
            `,fragmentShader:`
                varying vec3 vColor;
                uniform sampler2D uTexture;
                void main() {
                    vec4 tex = texture2D(uTexture, gl_PointCoord);
                    if (tex.a < 0.1) discard;
                    gl_FragColor = vec4(vColor, tex.a);
                }
            `,transparent:!0,blending:Ze,depthWrite:!1}),this.particles=new sn(t,this.particleMaterial),this.particleGroup.add(this.particles),this.particleGroup.visible=!1}initBox(){var h;this.boxOuter=new $e;const e=new Es(new yn(3,3,3)),t=new ri({color:16777215,transparent:!0,opacity:.9,blending:Ze}),n=new ri({color:3900150,transparent:!0,opacity:.5,blending:Ze});this.boxOuter.add(new Ai(e,t));for(let u=1;u<=3;u++){const d=new Ai(e,n);d.scale.setScalar(1+u*.012),this.boxOuter.add(d)}const r=new Es(new yn(2,2,2)),s=new ri({color:14742270,transparent:!0,opacity:.8,blending:Ze}),o=new ri({color:6333946,transparent:!0,opacity:.4,blending:Ze});this.boxInner=new $e,this.boxInner.add(new Ai(r,s));for(let u=1;u<=2;u++){const d=new Ai(r,o);d.scale.setScalar(1+u*.015),this.boxInner.add(d)}const a=new Es(new yn(3.05,3.05,3.05)),l=new ri({color:9684477,transparent:!0,opacity:.8,blending:Ze});this.boxEdges=new Ai(a,l),this.boxGroup.add(this.boxOuter),this.boxGroup.add(this.boxInner),this.boxGroup.add(this.boxEdges),this.boxGroup.visible=!1;const c=((h=this.customColors)==null?void 0:h.box)||this.customColor;c&&(this.boxOuter.children.forEach(u=>u.material.color.copy(c)),this.boxInner.children.forEach(u=>u.material.color.copy(c)),this.boxEdges&&this.boxEdges.material&&this.boxEdges.material.color.copy(c))}initDragon(){var d;this.dragonDummy=new dt,this.dragonLength=80;const e=new li(.8,1),t=new Lt({color:15680580,wireframe:!0,transparent:!0,opacity:.8,blending:Ze}),n=new li(.5,1),r=new Lt({color:16096779,wireframe:!1,transparent:!0,opacity:.6,blending:Ze});this.dragonBodyInstanced=new Po(e,t,this.dragonLength),this.dragonGlowInstanced=new Po(n,r,this.dragonLength);const s=new Ui(1.5,3.5,5);s.rotateX(Math.PI/2);const o=new Lt({color:16638023,wireframe:!0,transparent:!0,opacity:.9,blending:Ze});this.dragonHead=new Xe(s,o),this.dragonPearlGroup=new $e;const a=new ci(1,16,16),l=new Lt({color:3718648,wireframe:!1,transparent:!0,opacity:.9,blending:Ze}),c=new ci(1.3,16,16),h=new Lt({color:8246268,wireframe:!0,transparent:!0,opacity:.5,blending:Ze});this.dragonPearl=new Xe(a,l),this.dragonPearlHalo=new Xe(c,h),this.dragonPearlGroup.add(this.dragonPearl),this.dragonPearlGroup.add(this.dragonPearlHalo),this.dragonGroup.add(this.dragonBodyInstanced),this.dragonGroup.add(this.dragonGlowInstanced),this.dragonGroup.add(this.dragonHead),this.dragonGroup.add(this.dragonPearlGroup),this.dragonGroup.visible=!1;const u=((d=this.customColors)==null?void 0:d.dragon)||this.customColor;u&&this.updateDragonColor(u)}updateGalaxyColor(e){if(this.galaxySunMesh&&this.galaxySunMesh.traverse(t=>{t.isMesh&&t.material&&t.material.color.copy(e)}),this.galaxyStars&&this.galaxyStars.geometry){const t={};e.getHSL(t);const n=(t.h+.5)%1,r=this.galaxyStars.geometry.getAttribute("color");if(r){const s=r.count,o=this._tempColor;for(let a=0;a<s;a++){const l=a/s,c=l<.2?.8:l<.5?.6:.4+Math.random()*.15,h=.6+Math.random()*.3;o.setHSL(n,h,c),r.setXYZ(a,o.r,o.g,o.b)}r.needsUpdate=!0}}}updateDragonColor(e){if(!this.dragonBodyInstanced)return;this.dragonBodyInstanced.material.color.copy(e),this.dragonHead.material.color.copy(e);const t={};e.getHSL(t);const n=(t.h+.5)%1,r=new _e().setHSL(n,t.s,t.l);this.dragonGlowInstanced.material.color.copy(r)}initGalaxy(){const e=this.batterySaver?500:1500,t=new et,n=[],r=[],s=[];for(let l=0;l<e;l++){const c=l/e*Math.PI*10,h=2.5+l/e*20+Math.random()*2,u=l%4*(Math.PI*2/4),d=Math.max(.5,l/e*4),f=Math.cos(c+u)*h+(Math.random()-.5)*d,g=(Math.random()-.5)*1.5,_=Math.sin(c+u)*h+(Math.random()-.5)*d;n.push(f,g,_);const m=l/e;m<.2?r.push(1,.95,.7):m<.5?r.push(.7+Math.random()*.3,.8,1):r.push(.4+Math.random()*.2,.3+Math.random()*.3,.8+Math.random()*.2),s.push(Math.random()<.05?.4+Math.random()*.3:.08+Math.random()*.15)}t.setAttribute("position",new Fe(n,3)),t.setAttribute("color",new Fe(r,3)),t.setAttribute("size",new Fe(s,1));const o=this.createStarTexture(),a=new Tr({size:.25,vertexColors:!0,map:o,transparent:!0,opacity:.9,blending:Ze,depthWrite:!1,sizeAttenuation:!0});this.galaxyStars=new sn(t,a),this.galaxyGroup.add(this.galaxyStars),this.galaxySunStyle=this.galaxySunStyle||"sun",this.createGalaxySun(this.galaxySunStyle),this.galaxyGroup.visible=!1}createGalaxySun(e){this.galaxySunMesh&&(this.galaxyGroup.remove(this.galaxySunMesh),this.galaxySunMesh=null),this.galaxySunMesh=new $e;const t=new Lt({color:4892415,transparent:!0,opacity:.85,blending:Ze,depthWrite:!1,side:xt}),n=new $e;if(e==="sun2"){const r=t.clone();r.side=cn;const s=new Ir(1.5,.25,16,64);n.add(new Xe(s,r));const o=8,a=new Ui(.4,2.7,4);a.translate(0,2.7/2,0);const l=new Ui(.2,1.7,4);l.translate(0,1.7/2,0);for(let c=0;c<o;c++){const h=c/o*Math.PI*2,u=new Xe(a,r);u.rotation.z=-h,u.position.set(Math.sin(h)*1.5,Math.cos(h)*1.5,0),n.add(u);const d=h+Math.PI/o,f=new Xe(l,r);f.rotation.z=-d,f.position.set(Math.sin(d)*1.5,Math.cos(d)*1.5,0),n.add(f)}}else if(e==="sun3"){const r={uTime:{value:0},uColor:{value:t.color},uBassIntt:{value:0}};this.galaxySunUniforms=r;const s=`
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vViewPosition = -mvPosition.xyz;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,o=`
                uniform float uTime;
                uniform vec3 uColor;
                uniform float uBassIntt;
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                
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
                  p0 *= norm.x;
                  p1 *= norm.y;
                  p2 *= norm.z;
                  p3 *= norm.w;
                  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                  m = m * m;
                  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
                }

                void main() {
                    vec3 normal = normalize(vNormal);
                    vec3 viewDir = normalize(vViewPosition);

                    // Multi-octave 3D sphere noise
                    vec3 spherePos = vec3(vUv * 5.0, uTime * 0.3);
                    float n = snoise(spherePos);
                    n += 0.5 * snoise(spherePos * 2.0 - vec3(0.0, 0.0, uTime * 0.5));
                    n += 0.25 * snoise(spherePos * 4.0 + vec3(uBassIntt));
                    
                    n = smoothstep(0.0, 1.0, (n * 0.5 + 0.5) + uBassIntt * 0.6);

                    // Edge Rim
                    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
                    rim = smoothstep(0.5 - uBassIntt * 0.2, 1.0, rim);

                    float corona = pow(rim, 2.5);

                    vec3 coreColor = mix(vec3(1.0, 1.0, 1.0), uColor, clamp(n, 0.0, 1.0));
                    vec3 finalColor = coreColor + uColor * corona * 2.5;

                    float alpha = min(max(n * 1.5, rim * 1.2), 1.0);
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,a=new _t({vertexShader:s,fragmentShader:o,uniforms:r,transparent:!0,blending:Ze,depthWrite:!1,side:xt}),l=new ci(2,64,64),c=new Xe(l,a);n.add(c);const h=new Lt({color:t.color,transparent:!0,opacity:.15,blending:Ze,depthWrite:!1,side:Dt}),u=new ci(3,32,32);n.add(new Xe(u,h))}else{const r=new Ir(1.5,.12,8,64);n.add(new Xe(r,t));const s=8;for(let o=0;o<s;o++){const a=o/s*Math.PI*2,l=new Fs;l.moveTo(-.4,0),l.lineTo(.4,0),l.lineTo(0,2.7),l.lineTo(-.4,0);const c=new Dr(l),h=new Xe(c,t);h.rotation.z=-a,h.position.set(Math.sin(a)*1.5,Math.cos(a)*1.5,0),n.add(h);const u=a+Math.PI/s,d=new Fs;d.moveTo(-.2,0),d.lineTo(.2,0),d.lineTo(0,1.7),d.lineTo(-.2,0);const f=new Dr(d),g=new Xe(f,t);g.rotation.z=-u,g.position.set(Math.sin(u)*1.5,Math.cos(u)*1.5,0),n.add(g)}}this.galaxySunMesh.add(n),this.galaxySunMesh.position.set(0,0,.1),this.galaxyGroup.add(this.galaxySunMesh)}setGalaxySunStyle(e){e!=="sun"&&e!=="sun2"&&e!=="sun3"||(this.galaxySunStyle=e,this.galaxyGroup&&this.galaxyGroup.children.length>0&&this.createGalaxySun(e))}setGalaxySunRotation(e,t){e==="x"&&(this.sunRotationSpeedX=parseFloat(t)),e==="y"&&(this.sunRotationSpeedY=parseFloat(t)),e==="z"&&(this.sunRotationSpeedZ=parseFloat(t))}createStarTexture(){if(this.textures.star)return this.textures.star;const e=64,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),r=e/2,s=e/2;n.clearRect(0,0,e,e);const o=n.createRadialGradient(r,s,0,r,s,e/2);return o.addColorStop(0,"rgba(255, 255, 255, 1.0)"),o.addColorStop(.1,"rgba(255, 255, 240, 0.8)"),o.addColorStop(.25,"rgba(255, 255, 200, 0.3)"),o.addColorStop(.5,"rgba(200, 200, 255, 0.1)"),o.addColorStop(1,"rgba(100, 100, 255, 0)"),n.fillStyle=o,n.fillRect(0,0,e,e),n.fillStyle="rgba(255, 255, 255, 0.6)",n.beginPath(),n.moveTo(0,s-1),n.lineTo(r,s-.5),n.lineTo(e,s-1),n.lineTo(e,s+1),n.lineTo(r,s+.5),n.lineTo(0,s+1),n.closePath(),n.fill(),n.beginPath(),n.moveTo(r-1,0),n.lineTo(r-.5,s),n.lineTo(r-1,e),n.lineTo(r+1,e),n.lineTo(r+.5,s),n.lineTo(r+1,0),n.closePath(),n.fill(),n.beginPath(),n.arc(r,s,2,0,Math.PI*2),n.fillStyle="rgba(255, 255, 255, 1.0)",n.fill(),this.textures.star=new Ci(t),this.textures.star}initMandala(){var s;this.mandalaRings=[];const e=[2450411,15357964,3900150,16347926,12573694];for(let o=0;o<5;o++){const a=1.2+o*.8,l=6+o*6,c=new Ks(a-.05,a+.05,l),h=new Lt({color:e[o],side:xt,transparent:!0,opacity:.4-o*.05,blending:Ze}),u=new Xe(c,h);u.userData={speed:(.01+o*.005)*(o%2===0?1:-1),segments:l},this.mandalaRings.push(u),this.mandalaGroup.add(u)}const t=new Zs(.3,32),n=new Lt({color:16347926,transparent:!0,opacity:.6,blending:Ze});this.mandalaCenter=new Xe(t,n),this.mandalaGroup.add(this.mandalaCenter),this.mandalaGroup.visible=!1;const r=(s=this.customColors)==null?void 0:s.mandala;r&&(this.mandalaRings.forEach(o=>o.material.color.copy(r)),this.mandalaCenter.material.color.copy(r))}createSnowflakeTexture(){if(this.textures.snowflake)return this.textures.snowflake;const e=128,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),r=e/2,s=e/2;n.clearRect(0,0,e,e);const o=n.createRadialGradient(r,s,0,r,s,e*.5);o.addColorStop(0,"rgba(200,230,255,0.5)"),o.addColorStop(.4,"rgba(180,220,255,0.15)"),o.addColorStop(1,"rgba(150,200,255,0)"),n.fillStyle=o,n.fillRect(0,0,e,e),n.strokeStyle="rgba(220,240,255,1.0)",n.lineCap="round";for(let a=0;a<6;a++){const l=a/6*Math.PI*2;n.save(),n.translate(r,s),n.rotate(l),n.lineWidth=2.5,n.beginPath(),n.moveTo(0,0),n.lineTo(0,-52),n.stroke();const c=[{d:18,len:14,angle:Math.PI/4},{d:32,len:20,angle:Math.PI/4},{d:46,len:10,angle:Math.PI/5}];n.lineWidth=1.5,c.forEach(({d:h,len:u,angle:d})=>{[1,-1].forEach(f=>{n.beginPath(),n.moveTo(0,-h),n.lineTo(f*u*Math.cos(Math.PI/2-d),-h-u*Math.sin(Math.PI/2-d)),n.stroke()})}),n.restore()}n.beginPath();for(let a=0;a<6;a++){const l=a/6*Math.PI*2-Math.PI/6,c=r+Math.cos(l)*4,h=s+Math.sin(l)*4;a===0?n.moveTo(c,h):n.lineTo(c,h)}return n.closePath(),n.fillStyle="rgba(255, 255, 255, 0.8)",n.fill(),this.textures.snowflake=new Ci(t),this.textures.snowflake}initSnowflake(){for(;this.snowflakeGroup.children.length>0;){const f=this.snowflakeGroup.children[0];this.snowflakeGroup.remove(f),f.geometry&&f.geometry.dispose(),f.material&&f.material.dispose()}this._snowData=null;const e=700,t=new Float32Array(e*3),n=new Float32Array(e),r=new Float32Array(e),s=new Float32Array(e),o=new Float32Array(e),a=new Float32Array(e),l=new Float32Array(e);for(let f=0;f<e;f++){const g=f*3;t[g]=(Math.random()-.5)*80,t[g+1]=(Math.random()-.5)*60,t[g+2]=-40+Math.random()*35;const _=(t[g+2]+40)/35;n[f]=1.5+_*8,r[f]=.2+_*.6,s[f]=Math.random()*Math.PI*2,o[f]=.015+Math.random()*.04+_*.03,a[f]=.01+Math.random()*.02,l[f]=.4+Math.random()*.8}const c=new et;c.setAttribute("position",new ht(t,3)),c.setAttribute("aSize",new ht(n,1)),c.setAttribute("aOpacity",new ht(r,1));const h=this.createSnowflakeTexture(),u=new _t({uniforms:{uTexture:{value:h},uColor:{value:this.customColor?this.customColor.clone():new _e(10875883)},uIntensity:{value:0},uSizeMultiplier:{value:1},uGlowAmount:{value:.5}},vertexShader:`
                attribute float aSize;
                attribute float aOpacity;
                uniform float uSizeMultiplier;
                varying float vOpacity;
                void main() {
                    vOpacity = aOpacity;
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = aSize * uSizeMultiplier * (300.0 / -mv.z);
                }
            `,fragmentShader:`
                uniform sampler2D uTexture;
                uniform vec3 uColor;
                uniform float uIntensity;
                uniform float uGlowAmount;
                varying float vOpacity;
                void main() {
                    vec4 tex = texture2D(uTexture, gl_PointCoord);
                    if (tex.a < 0.02) discard;
                    // Dynamically tinted base color
                    vec3 baseCol = mix(uColor, vec3(1.0), clamp(uIntensity, 0.0, 1.0));
                    float glowAlpha = tex.a * vOpacity * (0.5 + uGlowAmount * 1.2);
                    vec3 finalCol = baseCol * (1.0 + uGlowAmount * uIntensity * 1.5);
                    gl_FragColor = vec4(finalCol, clamp(glowAlpha, 0.0, 1.0));
                }
            `,transparent:!0,depthWrite:!1,blending:Ze}),d=new sn(c,u);this.snowflakeGroup.add(d),this._snowData={count:e,positions:t,phases:s,speeds:o,drifts:a,driftFreqs:l,points:d,material:u,spinMeshes:[],spinSpeeds:[]},console.log("[Viz] ❄️ Real snowfall initialized —",e,"crystals")}setSnowSize(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uSizeMultiplier.value=Math.max(.2,Math.min(4,e)),console.log("[Viz] Snow Size Override:",e))}setSnowGlow(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uGlowAmount.value=Math.max(0,Math.min(1,e)),console.log("[Viz] Snow Glow Override:",e))}static get CYMATIC_PATTERNS(){return[]}initCymatics(){console.log("[Cymatics] Engine gutted — awaiting rebuild")}setCymaticPatternByIndex(e){}setCymaticIntensity(e){}setCymaticHarmonics(e){}setCymaticColor(e){}setCymaticColor2(e){}setCymaticColor3(e){}setCymaticFreq(e){}setCymaticTimer(e){}applyCymatic(e){}nextCymatic(){}prevCymatic(){}initLava(){var o;this.lavaBlobs=[];const e=16;this.lavaUniforms={uBlobs:{value:[]},uColor:{value:new _e(((o=Ne.visualColors)==null?void 0:o.lava)||16737792)},uSecondaryColor:{value:new _e(16755200)},uTime:{value:0},uIntensity:{value:0},uResolution:{value:new ce(window.innerWidth,window.innerHeight)}};for(let a=0;a<e;a++)this.lavaUniforms.uBlobs.value.push(new it(0,-100,0,0));const t=new _t({uniforms:this.lavaUniforms,vertexShader:`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,fragmentShader:`
                varying vec2 vUv;
                uniform vec4 uBlobs[16];
                uniform vec3 uColor;
                uniform vec3 uSecondaryColor;
                uniform float uTime;
                uniform float uIntensity;

                void main() {
                    // Center UV coordinates (-1 to 1) and extend bounds
                    // The plane is large, so vUv spans the entire background.
                    vec2 uv = (vUv - 0.5) * 50.0; // scale up to coordinate space of physics (-25 to +25)

                    float sum = 0.0;
                    vec2 grad = vec2(0.0);

                    // Compute Metaball density and gradient (pseudo-normals)
                    for(int i = 0; i < 16; i++) {
                        vec2 pos = uBlobs[i].xy;
                        float radius = uBlobs[i].w * 1.5; // Scale up impact
                        if(radius < 0.1) continue;

                        vec2 d = uv - pos;
                        float distSq = dot(d, d) + 0.1; // avoid divide by zero
                        float density = (radius * radius) / distSq;
                        sum += density;
                        
                        // Accumulate gradient for fake 3D normal
                        grad -= d * (2.0 * density / distSq);
                    }

                    // Threshold and smoothing
                    float threshold = 1.0;
                    // Outer glow / smoothing band
                    float f = smoothstep(threshold - 0.4, threshold + 0.1, sum);
                    
                    if (f <= 0.0) {
                        gl_FragColor = vec4(0.0);
                        return;
                    }

                    // Fake 3D Normal from gradient
                    vec3 normal = normalize(vec3(grad * 1.5, 1.0));
                    
                    // Height-based temperature mapping
                    float yNorm = clamp((uv.y + 15.0) / 30.0, 0.0, 1.0);
                    vec3 baseCol = mix(uSecondaryColor, uColor, yNorm);

                    // Lighting
                    vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
                    vec3 viewDir = vec3(0.0, 0.0, 1.0);
                    vec3 halfDir = normalize(lightDir + viewDir);

                    float diff = max(dot(normal, lightDir), 0.0);
                    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
                    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);

                    // Color combination
                    vec3 col = baseCol * (0.3 + 0.7 * diff);
                    col += vec3(1.0) * spec * (0.5 + uIntensity);
                    col += baseCol * fresnel * 2.0;

                    gl_FragColor = vec4(col, f * 0.95);
                }
            `,transparent:!0,blending:Ze,depthWrite:!1,side:xt}),n=new on(100,100),r=new Xe(n,t);r.position.z=-5,[{count:5,minSize:1,maxSize:1.5},{count:7,minSize:1.5,maxSize:2.2},{count:4,minSize:2.2,maxSize:3.5}].forEach(a=>{for(let l=0;l<a.count;l++){const c=a.minSize+Math.random()*(a.maxSize-a.minSize),h=["heating","rising","cooling","falling"],u=h[Math.floor(Math.random()*h.length)],d=-18+Math.random()*4,f=18+Math.random()*4;let g=0,_=.5;u==="heating"?(g=d,_=Math.random()*.5):u==="rising"?(g=d+Math.random()*(f-d),_=.8+Math.random()*.2):u==="cooling"?(g=f,_=1-Math.random()*.3):u==="falling"&&(g=f-Math.random()*(f-d),_=.2+Math.random()*.3),this.lavaBlobs.push({position:new R((Math.random()-.5)*12,g,(Math.random()-.5)*6),material:{uniforms:{uTemp:{value:0},uIntensity:{value:0},uTime:{value:0}}},userData:{baseSize:c,state:u,temperature:_,floatMin:d,floatMax:f,heatRate:.15+Math.random()*.3,coolRate:.15+Math.random()*.3,riseSpeed:(.04+Math.random()*.05)/(c*.5),fallSpeed:(.05+Math.random()*.05)/(c*.5),driftPhase:Math.random()*Math.PI*2,driftSpeed:.01+Math.random()*.02}})}}),this.lavaGroup.add(r),this.lavaGroup.visible=!1,console.log("[Visualizer] Thermal Fluid Dynamics (Lava V2) globally initialized.")}initFireplace(){const n=new on(100,80);this.fireMaterial=this.createFireShader(),this.fireMesh=new Xe(n,this.fireMaterial),this.fireMesh.position.set(0,0,-15),this.fireMesh.renderOrder=10,this.fireplaceGroup.add(this.fireMesh),this.fireLight=new qm(16737792,5,200),this.fireLight.position.set(0,0,30),this.fireplaceGroup.add(this.fireLight);const r=650,s=new et,o=[];for(let a=0;a<r;a++)o.push((Math.random()-.5)*100,-20+Math.random()*40,-15+(Math.random()-.5)*20);s.setAttribute("position",new Fe(o,3)),this.emberMat=new Tr({color:16763904,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.8,blending:Ze,depthWrite:!1}),this.embers=new sn(s,this.emberMat),this.fireplaceGroup.add(this.embers),this.emberVelocities=new Float32Array(r);for(let a=0;a<r;a++)this.emberVelocities[a]=.02+Math.random()*.05;this.fireplaceGroup.position.set(0,0,0),this.fireplaceGroup.visible=!1,console.log("[Visualizer] Real Fireplace initialized")}createFireShader(){return new _t({uniforms:{uTime:{value:0},uColor:{value:new _e(16729088)},uSpeed:{value:1},uIntensity:{value:1}},vertexShader:`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,fragmentShader:`
                uniform float uTime;
                uniform float uIntensity;
                uniform vec3 uColor;
                varying vec2 vUv;

                // Simplex Noise 2D (Standard GLSL noise)
                vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
                float snoise(vec2 v){
                    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                    vec2 i  = floor(v + dot(v, C.yy) );
                    vec2 x0 = v - i + dot(i, C.xx);
                    vec2 i1;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;
                    i = mod(i, 289.0);
                    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                    m = m*m ;
                    m = m*m ;
                    vec3 x = 2.0 * fract(p * C.www) - 1.0;
                    vec3 h = abs(x) - 0.5;
                    vec3 ox = floor(x + 0.5);
                    vec3 a0 = x - ox;
                    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                    vec3 g;
                    g.x  = a0.x  * x0.x  + h.x  * x0.y;
                    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                    return 130.0 * dot(m, g);
                }

                void main() {
                    vec2 uv = vUv;
                    
                    // ORGANIC FLOW NOISE - INCREASED DENSITY
                    float n1 = snoise(uv * 2.5 - vec2(0, uTime * 1.5));
                    float n2 = snoise(uv * 5.5 - vec2(0, uTime * 2.8));
                    
                    // Atmospheric Heat (Lower focus)
                    float shape = 1.2 - uv.y; 
                    shape = pow(shape, 1.4); 
                    
                    float fire = n1 * 0.7 + n2 * 0.5;
                    
                    // Denser thresholds
                    float alpha = smoothstep(-0.2, 0.6, fire + shape * 0.7);
                    float core = smoothstep(0.0, 0.8, fire + shape * 0.5);
                    
                    // Brighter, more intense colors
                    vec3 red = vec3(1.0, 0.1, 0.0);
                    vec3 yellow = vec3(1.0, 0.9, 0.0);
                    vec3 white = vec3(1.0, 1.0, 0.9);
                    
                    vec3 finalColor = mix(red, yellow, core);
                    finalColor = mix(finalColor, white, core * 0.4);
                    
                    // Edge fade removed - Fill edges edge-to-edge
                    gl_FragColor = vec4(finalColor * uIntensity, alpha * min(1.0, uIntensity));
                }
            `,transparent:!0,side:xt,blending:Ze,depthWrite:!1})}initRainforest(){const e=this.batterySaver?400:1e3,t=new et,n=new Float32Array(e*3),r=new Float32Array(e*3);for(let s=0;s<e;s++){const o=s*3;n[o]=(Math.random()-.5)*60,n[o+1]=(Math.random()-.5)*40,n[o+2]=(Math.random()-.5)*40,r[o]=Math.random(),r[o+1]=Math.random(),r[o+2]=.08+Math.random()*.12}t.setAttribute("position",new ht(n,3)),t.setAttribute("aRandom",new ht(r,3)),this.rainMaterial=new _t({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new _e(8965375)},uIntensity:{value:.6}},vertexShader:`
                attribute vec3 aRandom;
                uniform float uTime, uSpeed;
                varying float vAlpha;
                void main() {
                    vec3 pos = position;
                    float velocity = aRandom.z * uSpeed;
                    
                    // Vertical fall with wrap
                    pos.y = mod(pos.y - uTime * velocity * 100.0 + 20.0, 40.0) - 20.0;
                    
                    // Subtle drift
                    pos.x += sin(uTime * 0.5 + aRandom.x * 10.0) * 0.5;
                    
                    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = 2.0 * (300.0 / -mv.z);
                    vAlpha = 1.0;
                }
            `,fragmentShader:`
                uniform vec3 uColor;
                uniform float uIntensity;
                varying float vAlpha;
                void main() {
                    // Simple drop shape
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    float dist = length(coord);
                    if (dist > 0.5) discard;
                    gl_FragColor = vec4(uColor, uIntensity * (1.0 - dist * 2.0));
                }
            `,transparent:!0,depthWrite:!1,blending:Ze}),this.raindrops=new sn(t,this.rainMaterial),this.rainforestGroup.add(this.raindrops),this.rainforestGroup.visible=!1}initZenGarden(){const e=this.batterySaver?200:500,t=new et,n=new Float32Array(e*3),r=new Float32Array(e*3);for(let o=0;o<e;o++){const a=o*3;n[a]=(Math.random()-.5)*40,n[a+1]=(Math.random()-.5)*20,n[a+2]=(Math.random()-.5)*40,r[a]=Math.random(),r[a+1]=Math.random(),r[a+2]=Math.random()*Math.PI*2}t.setAttribute("position",new ht(n,3)),t.setAttribute("aRandom",new ht(r,3)),this.petalMaterial=new _t({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new _e(16758725)},uIntensity:{value:.8}},vertexShader:`
                attribute vec3 aRandom;
                uniform float uTime, uSpeed;
                varying float vAlpha;
                void main() {
                    vec3 pos = position;
                    float t = uTime * uSpeed;
                    
                    // Falling with drift
                    pos.y = mod(pos.y - t * 2.0 + 10.0, 20.0) - 10.0;
                    pos.x += sin(t + aRandom.z) * 2.0;
                    pos.z += cos(t * 0.8 + aRandom.x) * 2.0;
                    
                    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = 4.0 * (300.0 / -mv.z);
                    vAlpha = 1.0;
                }
            `,fragmentShader:`
                uniform vec3 uColor;
                uniform float uIntensity;
                void main() {
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    float dist = length(coord);
                    if (dist > 0.5) discard;
                    gl_FragColor = vec4(uColor, uIntensity * (1.0 - dist * 2.0));
                }
            `,transparent:!0,depthWrite:!1}),this.petals=new sn(t,this.petalMaterial),this.zenGardenGroup.add(this.petals);const s=new on(40,40,32,32);this.zenWaterMaterial=new Lt({color:2245734,transparent:!0,opacity:.3,side:xt}),this.zenWater=new Xe(s,this.zenWaterMaterial),this.zenWater.rotation.x=-Math.PI/2,this.zenWater.position.y=-5,this.zenGardenGroup.add(this.zenWater),this.zenGardenGroup.visible=!1,console.log("[Visualizer] Zen Garden initialized (Shader Mode)")}initOcean(){var a;const e=new on(300,100,128,64);this.oceanWave=new Xe(e,new _t({uniforms:{uTime:{value:0},uColor:{value:this.customColor?this.customColor.clone():new _e(43775)},uNormBass:{value:0},uBeatPulse:{value:0}},vertexShader:`
                varying float vDist;
                uniform float uTime, uNormBass, uBeatPulse;
                void main() {
                    vec3 pos = position;
                    float dist = length(pos.xy);
                    vDist = dist;
                    float amp = 1.0 + (uNormBass * 2.5) + (uBeatPulse * 0.8);
                    pos.z = sin(dist * 0.2 - uTime * 0.8) * amp + cos(pos.x * 0.15 + uTime * 0.6) * (amp * 0.5);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,fragmentShader:`
                varying float vDist;
                uniform vec3 uColor;
                uniform float uNormBass;
                void main() {
                    float edge = 1.0 - smoothstep(100.0, 150.0, vDist);
                    gl_FragColor = vec4(uColor, 0.4 * edge);
                }
            `,wireframe:!0,transparent:!0,side:xt})),this.oceanWave.rotation.x=-Math.PI/3,this.oceanWave.position.y=-2,this.oceanGroup.add(this.oceanWave);const t=300,n=new et,r=[];for(let l=0;l<t;l++)r.push((Math.random()-.5)*50),r.push(-2.5+Math.random()*.5),r.push((Math.random()-.5)*40);n.setAttribute("position",new Fe(r,3));const s=new Tr({color:16777215,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.5,blending:Ze,depthWrite:!1});this.oceanFoam=new sn(n,s),this.oceanGroup.add(this.oceanFoam),this.oceanGroup.visible=!1;const o=((a=this.customColors)==null?void 0:a.ocean)||this.customColor;o&&(this.oceanWave&&this.oceanWave.material.color.copy(o),this.oceanFoam&&this.oceanFoam.material.color.copy(o)),console.log("[Visualizer] Original Ocean (Wireframe) restored")}createCyberTexture(e=this.matrixConfig){const n=document.createElement("canvas");n.width=1024,n.height=1024;const r=n.getContext("2d");r.fillStyle="rgba(0,0,0,0)",r.fillRect(0,0,1024,1024),r.shadowBlur=12,r.shadowColor="rgba(255, 255, 255, 0.4)",r.font='bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace',r.fillStyle="#ffffff",r.textAlign="center",r.textBaseline="middle";const s=8,o=8,a=1024/s,l=1024/o;let c="🪷MINDWAVE";const h=e.logicMode,u=e.customText;h==="custom"||h==="txt"?c="🪷"+(u&&u.length>0?u:"WELCOME TO MINDWAVE"):(h==="random"||h==="rnd"||h==="matrix"||h==="int"||h==="interstellar")&&(c="");const d=h==="matrix"||h==="int"||h==="interstellar"?[]:["LOGO",...c],f=d.length;for(let _=0;_<64;_++){const m=_%8,p=Math.floor(_/8);r.fillStyle="rgba(0,0,0,0)",r.fillRect(m*a,p*l,a,l),r.save(),r.translate(m*a+a/2,p*l+l/2);let x="",v=!1;if(_<f){const S=d[_];S==="LOGO"?v=!0:x=S}else{const C="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";x=C.charAt(Math.floor(Math.random()*C.length)),Math.random()>.5&&(r.save(),r.scale(-1,1),r.fillStyle="#ffffff",r.font="bold 80px monospace",r.fillText(x,0,0),r.restore(),x="")}if(x||v)if(r.fillStyle="#ffffff",r.font="bold 80px monospace",r.textAlign="center",r.textBaseline="middle",r.shadowBlur=16,r.shadowColor="rgba(255, 255, 255, 0.6)",v)if(this.logoImage){const w=document.createElement("canvas");w.width=100,w.height=100;const A=w.getContext("2d");A.imageSmoothingEnabled=!0,A.imageSmoothingQuality="high",A.drawImage(this.logoImage,0,0,100,100);const F=A.getImageData(0,0,100,100),M=F.data;for(let b=0;b<M.length;b+=4){const W=180+(M[b]+M[b+1]+M[b+2])/3/255*75;M[b]=W,M[b+1]=W,M[b+2]=W}A.putImageData(F,0,0),r.imageSmoothingEnabled=!0,r.imageSmoothingQuality="high",r.drawImage(w,-50,-50,100,100)}else!this.logoLoading&&!this.logoFailed&&(this.logoLoading=!0,new Wm().load("./mindwave-logo-icon.png",C=>{if(this.logoImage=C,this.logoLoading=!1,this.cyberMaterial){const w=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=w}},void 0,C=>{this.logoFailed=!0,this.logoLoading=!1})),r.font="bold 80px monospace",r.fillStyle="#2dd4bf",r.fillText("🪷",0,0);else r.fillText(x,0,0);r.restore()}const g=new Ci(n);return g.magFilter=Mt,g.minFilter=Mt,g}createCyberShader(e,t=this.matrixConfig){return new _t({uniforms:{uTexture:{value:e},uColor:{value:new _e(t.color||65345)},uHeadColor:{value:new _e(15794160)},uTime:{value:0},uSpeed:{value:t.speed||1},uTailLength:{value:t.length||1},uRainbow:{value:t.rainbow?1:0},uBrightness:{value:this.brightnessMultiplier||1}},vertexShader:`
                attribute float aCharIndex;
                attribute float aSpawnTime;
                attribute float aSpeed;
                uniform float uTime;
                uniform float uSpeed;
                uniform float uTailLength;
                varying float vBrightness;
                varying float vCharIndex;
                varying float vAlpha;
                varying vec3 vPos;
                
                void main() {
                    vCharIndex = aCharIndex;
                    vPos = position;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    // FIXED: uTime already includes multipliers, avoid squaring speed in shader
                    float columnHeadY = 80.0 - mod(uTime * 5.0 * aSpeed + aSpawnTime, 160.0);
                    // FIXED: The trail is ABOVE the head (higher Y value). So position.y > columnHeadY.
                    // To get a positive distance for the trail, we need position.y - columnHeadY.
                    float dist = position.y - columnHeadY;
                    float trailLen = 160.0 * uTailLength;
                    if (dist >= 0.0 && dist < trailLen) {
                         vAlpha = 1.0 - (dist / trailLen);
                         vBrightness = 1.0 - (dist / trailLen);
                    } else {
                         vAlpha = 0.0;
                         vBrightness = 0.0;
                    }
                    gl_Position = projectionMatrix * mvPosition;
                    gl_Position.z -= 0.01; // Avoid flickering
                    gl_PointSize = 384.0 / -mvPosition.z; // Reduced from 480.0 to match 20% shrink
                }

            `,fragmentShader:`
                uniform sampler2D uTexture;
                uniform vec3 uColor;
                uniform vec3 uHeadColor;
                uniform float uRainbow;
                uniform float uBrightness;
                uniform float uTime;
                varying float vAlpha;
                varying float vCharIndex;
                varying float vBrightness;
                varying vec3 vPos;
                float hue2rgb(float p, float q, float t) {
                    if(t < 0.0) t += 1.0;
                    if(t > 1.0) t -= 1.0;
                    if(t < 1.0/6.0) return p + (q - p) * 6.0 * t;
                    if(t < 1.0/2.0) return q;
                    if(t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
                    return p;
                }
                vec3 hslToRgb(float h, float s, float l) {
                    float r, g, b;
                    if(s == 0.0) { r = g = b = l; } else {
                        float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
                        float p = 2.0 * l - q;
                        r = hue2rgb(p, q, h + 1.0/3.0); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1.0/3.0);
                    }
                    return vec3(r, g, b);
                }
                void main() {
                    float rawIndex = floor(vCharIndex + 0.5);
                    if (rawIndex > 8.5) {
                        float timeStep = floor(uTime * 0.5); 
                        rawIndex = 9.0 + mod((rawIndex - 9.0) + timeStep, 55.0);
                    }
                    float index = floor(rawIndex + 0.5);
                    float col = mod(index, 8.0);
                    float row = 7.0 - floor(index / 8.0);
                    vec2 uv = gl_PointCoord;
                    uv.y = 1.0 - uv.y;
                    vec2 atlasUV = (uv + vec2(col, row)) / 8.0;
                    vec4 texColor = texture2D(uTexture, atlasUV);
                    if (texColor.a < 0.1) discard;
                    if (vAlpha < 0.05) discard;
                    vec3 finalColor;
                    if (uRainbow > 0.5) {
                        float hue = fract(vPos.x * 0.05 + uTime * 0.1);
                        finalColor = hslToRgb(hue, 1.0, 0.6);
                        if (vBrightness >= 0.95) finalColor = mix(finalColor, vec3(1.0), 0.5);
                    } else {
                        finalColor = (vBrightness >= 0.95) ? uHeadColor : uColor;
                    }
                    // Apply global brightness multiplier
                    gl_FragColor = vec4(finalColor * uBrightness, vAlpha * texColor.a * uBrightness);
                }
            `,transparent:!0,depthWrite:!1,blending:Ze})}initEnvironment(){this.sunLight=new Zm(16774625,1.2),this.sunLight.position.set(50,100,50),this.scene.add(this.sunLight),this.ambientLight=new Jm(4210752,.6),this.scene.add(this.ambientLight)}ensureInitialized(e){const t=`[VizInit] ${e}`;console.time(t),e==="sphere"&&(!this.sphereGroup||this.sphereGroup.children.length===0)&&this.initSphere(),e==="particles"&&(!this.particleGroup||this.particleGroup.children.length===0)&&this.initParticles(),e==="lightspeed"&&(!this.lightspeedGroup||this.lightspeedGroup.children.length===0)&&this.initLightspeed(),e==="waves"&&(!this.wavesGroup||this.wavesGroup.children.length===0)&&this.initWaves(),e==="lava"&&(!this.lavaGroup||this.lavaGroup.children.length===0)&&this.initLava(),e==="fireplace"&&(!this.fireplaceGroup||this.fireplaceGroup.children.length===0)&&this.initFireplace(),e==="rainforest"&&(!this.rainforestGroup||this.rainforestGroup.children.length===0)&&this.initRainforest(),e==="zengarden"&&(!this.zenGardenGroup||this.zenGardenGroup.children.length===0)&&this.initZenGarden(),e==="ocean"&&(!this.oceanGroup||this.oceanGroup.children.length===0)&&this.initOcean(),(e==="cyber"||e==="matrix")&&(!this.cyberGroup||this.cyberGroup.children.length===0)&&this.initCyber(),e==="box"&&(!this.boxGroup||this.boxGroup.children.length===0)&&this.initBox(),e==="dragon"&&(!this.dragonGroup||this.dragonGroup.children.length===0)&&this.initDragon(),e==="galaxy"&&(!this.galaxyGroup||this.galaxyGroup.children.length===0)&&this.initGalaxy(),e==="mandala"&&(!this.mandalaGroup||this.mandalaGroup.children.length===0)&&this.initMandala(),e==="snowflake"&&(!this.snowflakeGroup||this.snowflakeGroup.children.length===0)&&this.initSnowflake(),e==="cymatics"&&(!this.cymaticsGroup||this.cymaticsGroup.children.length===0)&&this.initCymatics(),console.timeEnd(t)}initCyber(){for(;this.cyberGroup.children.length>0;){const f=this.cyberGroup.children[0];this.cyberGroup.remove(f),f.material&&(f.material.map&&f.material.map.dispose(),f.material.dispose()),f.children&&f.traverse(g=>{g.geometry&&g.geometry.dispose(),g.material&&(g.material.map&&g.material.map.dispose(),g.material.dispose())})}this.cyberRotationGroup=null,this.cyberPoints=null;const e=80,t=120,n=new et,r=[],s=[],o=[],a=[],l=240,c=160,h=l/e,u=c/t;for(let f=0;f<e;f++){const g=f*h-l/2+Math.random()*.8*h,_=-20-Math.random()*2,m=.5+Math.random()*.5,p=this.matrixConfig,x=p.logicMode==="mindwave"||p.logicMode==="mw"||p.logicMode==="custom"||p.logicMode==="txt",v=p.logicMode==="matrix"||p.logicMode==="int"||p.logicMode==="interstellar",C=((p.logicMode==="custom"||p.logicMode==="txt")&&p.customText?"🪷"+p.customText:"MINDWAVE").length,w=v?Math.random()*100:0,A=v?.5+Math.random()*1.5:1,F=Math.random()*100+w;for(let M=0;M<t;M++){const b=c/2-M*u;r.push(g,b,_),x?s.push(M%(C+1)):v?s.push(Math.floor(Math.random()*64)):s.push(9+Math.floor(Math.random()*55)),o.push(F),a.push(m*A)}}n.setAttribute("position",new Fe(r,3)),n.setAttribute("aCharIndex",new Fe(s,1)),n.setAttribute("aSpawnTime",new Fe(o,1)),n.setAttribute("aSpeed",new Fe(a,1)),this.cyberGeometry=n;const d=this.createCyberTexture(this.matrixConfig);this.cyberMaterial=this.createCyberShader(d,this.matrixConfig),this.cyberRain=new sn(n,this.cyberMaterial),this.cyberRain.frustumCulled=!1,this.cyberRain.renderOrder=-1,this.cyberRotationGroup=new $e,this.cyberRotationGroup.add(this.cyberRain),this.cyberGroup.add(this.cyberRotationGroup),this.currentCyberAngle!==void 0&&(this.cyberRotationGroup.rotation.z=Va.degToRad(-this.currentCyberAngle))}setCyberMode(e){if(this.mindWaveMode!==e)if(this.mindWaveMode=e,this.cyberLogicMode=e?"mindwave":"classic",e&&this.cyberMaterial){const t=this.cyberMaterial.uniforms.uTexture.value,n=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=n,this.cyberMaterial.needsUpdate=!0,t&&t.dispose()}else this.initCyber()}setMode(e){const t=this.mapMode(e);this.activeModes.clear(),this.activeModes.add(t),this.mode=t,this.updateVisibility(),this.updateLabel(t)}mapMode(e){return{cube:"box",flow:"particles",zen:"zengarden",rain:"rainforest",interstellar:"matrix",ocean:"waves"}[e]||e}toggleMode(e){const t=this.mapMode(e);t==="matrix"&&!this.activeModes.has("matrix")&&(this.matrixConfig.logicMode||(this.matrixConfig.logicMode="interstellar")),t==="cyber"&&!this.activeModes.has("cyber")&&(this.cyberConfig.logicMode||(this.cyberConfig.logicMode="matrix"));const n=this.activeModes.has("cyber");this.activeModes.has(t)?this.activeModes.delete(t):(t==="cymatics"?(console.log("[Engine] Cymatics engaged - clearing other modes"),this.activeModes.clear()):this.activeModes.has("cymatics")&&this.activeModes.delete("cymatics"),this.activeModes.add(t)),this.active=this.activeModes.size>0,this.updateVisibility(),this.updateLabel(t),this.activeModes.forEach(r=>this.ensureInitialized(r)),this.initialized&&this.active&&!this._isRendering&&(Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null),this.render()),this.mode=t,this.updateVisibility(),this.activeModes.size===0&&!n&&(this.active=!1,this.renderer&&(this.renderer.autoClearColor=!0,this.renderer.clear(),this.renderer.render(this.scene,this.camera))),this.activeModes.size===1?this.updateLabel(Array.from(this.activeModes)[0]):this.activeModes.size>1?this.updateLabel("multi"):this.updateLabel("none"),window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}})),this.updateCyberStrings&&this.updateCyberStrings()}toggleGalaxySunStyle(){const e=this.galaxySunStyle==="sun"?"sun2":this.galaxySunStyle==="sun2"?"sun3":"sun";return console.log(`[Visualizer] Toggling Galaxy Sun: ${this.galaxySunStyle} -> ${e}`),this.setGalaxySunStyle(e),e}updateVisibility(){if(this.activeModes.forEach(e=>this.ensureInitialized(e)),this.sphereGroup&&(this.sphereGroup.visible=this.activeModes.has("sphere")),this.particleGroup&&(this.particleGroup.visible=this.activeModes.has("particles")),this.lightspeedGroup&&(this.lightspeedGroup.visible=this.activeModes.has("lightspeed")),this.wavesGroup&&(this.wavesGroup.visible=this.activeModes.has("waves")),this.oceanGroup&&(this.oceanGroup.visible=this.activeModes.has("ocean")),this.lavaGroup&&(this.lavaGroup.visible=this.activeModes.has("lava")),this.fireplaceGroup&&(this.fireplaceGroup.visible=this.activeModes.has("fireplace")),this.rainforestGroup&&(this.rainforestGroup.visible=this.activeModes.has("rainforest")),this.zenGardenGroup&&(this.zenGardenGroup.visible=this.activeModes.has("zengarden")),this.boxGroup&&(this.boxGroup.visible=this.activeModes.has("box")),this.dragonGroup&&(this.dragonGroup.visible=this.activeModes.has("dragon")),this.galaxyGroup&&(this.galaxyGroup.visible=this.activeModes.has("galaxy")),this.mandalaGroup&&(this.mandalaGroup.visible=this.activeModes.has("mandala")),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics")),this.snowflakeGroup){const e=this.cymaticMaterial&&Math.abs(this.cymaticMaterial.uniforms.uMedium.value-3)<.1;this.snowflakeGroup.visible=this.activeModes.has("snowflake")||this.activeModes.has("cymatics")&&e}this.cyberGroup&&(this.cyberGroup.visible=this.activeModes.has("matrix")),this.overlayCanvas&&(this.activeModes.has("cyber")?(this.overlayCanvas.classList.remove("hidden"),this.activeModes.has("matrix")?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1):this.activeModes.size>1?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:.7}})),this.wasAutoDimmed=!0):(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1),(!this.matrixCyberStreams||this.matrixCyberStreams.length===0)&&this.generateCyberStyle()):(this.overlayCanvas.classList.add("hidden"),this.wasAutoDimmed&&(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1))),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics"),this.cymaticsGroup.position.z=2),this.updateUIPanels()}updateUIPanels(){typeof window.updateConfigPanel=="function"&&window.updateConfigPanel()}updateLabel(e){const t=document.getElementById("visualLabel");t&&(e==="sphere"?t.textContent="BIO-RESONANCE":e==="particles"?t.textContent="NEURAL FLOW":e==="lightspeed"?t.textContent="WARP":e==="waves"||e==="ocean"?t.textContent="OCEAN":e==="lava"?t.textContent="LAVA LAMP":e==="fireplace"?t.textContent="FIREPLACE":e==="rainforest"?t.textContent="RAINFOREST":e==="zengarden"?t.textContent="ZEN GARDEN":e==="cymatics"?t.textContent="CYMATICS":e==="cyber"?t.textContent="CYBER":e==="matrix"?t.textContent="MATRIX":e==="snowflake"?t.textContent="SNOWFALL":e==="multi"?t.textContent="MULTI-SENSORY":t.textContent="")}initWaves(){for(this.wavesGroup||(this.wavesGroup=new $e,this.scene.add(this.wavesGroup));this.wavesGroup.children.length>0;){const t=this.wavesGroup.children[0];this.wavesGroup.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}const e=new on(80,80,160,160);this.wavesMaterial=new _t({uniforms:{uTime:{value:0},uColor:{value:this.customColor?new _e(this.customColor):new _e(26367)},uSecondaryColor:{value:new _e(62207)},uIntensity:{value:1},uNormBass:{value:0},uResolution:{value:new ce(window.innerWidth,window.innerHeight)}},vertexShader:`
                varying vec2 vUv;
                varying float vElevation;
                varying vec3 vViewPosition;
                uniform float uTime, uNormBass;
                
                float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
                float noise(vec2 p) {
                    vec2 i = floor(p); vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
                }

                // Gerstner Wave implementation for sharp crests
                vec3 gWave(vec2 p, float t, float a, float s, float w, vec2 d) {
                    float f = w * dot(d, p) + t * s;
                    return vec3(d.x * a * cos(f), d.y * a * cos(f), a * sin(f));
                }

                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    
                    // Layer 1: Fundamental Tides
                    pos += gWave(pos.xy, uTime * 1.2, 1.2, 1.5, 0.25, vec2(1, 0));
                    pos += gWave(pos.xy, uTime * 0.8, 1.0, 1.2, 0.18, vec2(0, 1));
                    
                    // Layer 2: Audio-Reactive Ripples
                    float audioDisp = noise(pos.xy * 0.4 + uTime) * (1.5 + uNormBass * 3.5);
                    pos.z += audioDisp;

                    vElevation = pos.z;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    vViewPosition = -mvPosition.xyz;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,fragmentShader:`
                varying vec2 vUv;
                varying float vElevation;
                varying vec3 vViewPosition;
                uniform vec3 uColor, uSecondaryColor;
                uniform float uNormBass, uTime;

                void main() {
                    // Derive normal from view position derivatives
                    vec3 fNormal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));
                    
                    // Deep sea gradient
                    float depth = smoothstep(-2.0, 4.0, vElevation);
                    vec3 deepCol = mix(uColor * 0.2, uColor, depth);
                    vec3 shallowCol = mix(uSecondaryColor, vec3(1.0), uNormBass * 0.4);
                    
                    vec3 col = mix(deepCol, shallowCol, depth);
                    
                    // Specular Highlights (Bioluminescent cresting)
                    float spec = pow(max(fNormal.z, 0.0), 32.0);
                    col += spec * (0.4 + uNormBass * 0.8) * uSecondaryColor;
                    
                    // Dynamic Foam / Bioluminescence
                    float foam = smoothstep(2.5, 4.5, vElevation + uNormBass * 2.0);
                    col = mix(col, vec3(0.8, 1.0, 1.0), foam);
                    
                    // Cinematic Vignette
                    float vig = 1.0 - length(vUv - 0.5) * 1.2;

                    gl_FragColor = vec4(col * vig, 0.75 + uNormBass * 0.2);
                }
            `,transparent:!0,wireframe:!1,side:xt,extensions:{derivatives:!0}}),this.wavesMesh=new Xe(e,this.wavesMaterial),this.wavesMesh.rotation.x=-Math.PI/2.2,this.wavesMesh.position.y=-5,this.wavesMesh.position.z=-10,this.wavesGroup.add(this.wavesMesh)}setSpeed(e){this.speedMultiplier=e}setIntent(e){this.currentIntent=e,e==="delta"||e==="theta"?this.particles&&this.particles.material&&(this.particles.material.size=.3,this.particles.material.opacity=.5):e==="gamma"||e==="hyper-gamma"?(this.particles&&this.particles.material&&(this.particles.material.size=.08,this.particles.material.opacity=.9),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(16777215),this.cyberMaterial.uniforms.uTailLength.value=.4)):(this.particles&&this.particles.material&&(this.particles.material.size=.15,this.particles.material.opacity=.8),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(15794160),this.cyberMaterial.uniforms.uTailLength.value=1)),this.renderSingleFrame()}setColor(e,t=null){var n,r,s,o;this.customColors||(this.customColors={}),!t||t==="all"?(this.customColors={},this.customColor=new _e(e)):this.customColors[t]=new _e(e);try{const a=l=>{l&&(l.color&&typeof l.color.set=="function"?l.color.set(e):l.uniforms&&l.uniforms.uColor&&l.uniforms.uColor.value.set(e))};this.particles&&this.particles.material&&a(this.particles.material),this.lightspeed&&this.lightspeed.material&&a(this.lightspeed.material),this.sphere&&this.sphere.material&&(a(this.sphere.material),this.core&&this.core.material&&a(this.core.material)),(t==="box"||!t||t==="all")&&(this.boxOuter&&this.boxOuter.children.forEach(l=>a(l.material)),this.boxInner&&this.boxInner.children.forEach(l=>a(l.material)),this.boxEdges&&this.boxEdges.material&&a(this.boxEdges.material)),t==="mandala"&&(this.mandalaRings&&this.mandalaRings.forEach(l=>a(l.material)),this.mandalaCenter&&this.mandalaCenter.material&&a(this.mandalaCenter.material)),this.wavesMesh&&this.wavesMesh.material&&a(this.wavesMesh.material),this.lavaBlobs&&this.lavaBlobs.forEach(l=>a(l.material)),this.lavaGlow&&this.lavaGlow.material&&a(this.lavaGlow.material),this.flames&&this.flames.material&&a(this.flames.material),this.raindrops&&this.raindrops.material&&a(this.raindrops.material),this.petals&&this.petals.material&&a(this.petals.material),this.zenWater&&this.zenWater.material&&a(this.zenWater.material),this.oceanWave&&this.oceanWave.material&&a(this.oceanWave.material),this.oceanFoam&&this.oceanFoam.material&&a(this.oceanFoam.material),this.cyberRain&&this.cyberRain.material&&this.cyberRain.material.uniforms&&this.cyberRain.material.uniforms.uColor&&this.cyberRain.material.uniforms.uColor.value.set(e),this.logoMesh&&this.originalLogoImg&&this.updateLogoTexture(),this.dragonGroup&&this.updateDragonColor&&this.updateDragonColor(new _e(e)),(this.galaxyStars||this.galaxySunMesh)&&this.updateGalaxyColor(new _e(e)),this.cymaticMaterial&&((n=this.cymaticMaterial.uniforms)!=null&&n.uColor)&&this.cymaticMaterial.uniforms.uColor.value.set(e),(t==="snowflake"||!t||t==="all")&&this.setSnowColor(e),(o=(s=(r=this._snowData)==null?void 0:r.material)==null?void 0:s.uniforms)!=null&&o.uColor&&this._snowData.material.uniforms.uColor.value.set(e)}catch(a){console.warn("[Visualizer] setColor encountered a safe-skip error:",a)}this.renderSingleFrame()}renderSingleFrame(){!this.renderer||!this.scene||!this.camera||(this.renderer.clear(),this.renderer.render(this.scene,this.camera))}createCircleTexture(){if(this.textures.circle)return this.textures.circle;const e=32,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d");return n.beginPath(),n.arc(e/2,e/2,e/2,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),this.textures.circle=new Ci(t),this.textures.circle}render(e,t){var n,r,s,o,a,l,c,h,u;if(!this.initialized||!this.renderer||document.hidden||!this.active){this._isRendering=!1;return}if(!(this._isRendering&&typeof e=="number")){this._isRendering=!0;try{(typeof e=="number"||!e&&Ne.analyserLeft)&&(e=Ne.analyserLeft,t=Ne.analyserRight);let d=0,f=0,g=0;if(e){const L=e.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==L)&&(this._freqDataArray=new Uint8Array(L)),e.getByteFrequencyData(this._freqDataArray);let U=0;for(let O=0;O<15;O++)U+=this._freqDataArray[O];d=Math.pow(U/15/255,.8);let X=0;for(let O=10;O<100;O++)X+=this._freqDataArray[O];f=X/90/255;let N=0;for(let O=100;O<300;O++)N+=this._freqDataArray[O];g=N/200/255}const _=Math.max(.001,this.speedMultiplier||1),m=performance.now()*.001;this.lastTime||(this.lastTime=m);const p=Math.min(.1,m-this.lastTime);this.lastTime=m;const x=Ne.visualSpeedAuto?Ne.beatFrequency||10:_*10,v=Math.sin(m*Math.PI*2*x)*.5+.5,S=this.vibrationEnabled?1:0,C=(v||0)*S,w=(d||0)*S,A=S*(.02+w*.15+C*.08),F=Math.sin(m*47.3)*Math.cos(m*31.7)*A,M=Math.cos(m*53.1)*Math.sin(m*29.3)*A,b=Math.sin(m*37.9)*Math.cos(m*43.1)*A,z=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];for(const L of z)L&&L.position.set(F,M,b);if(this.activeModes.has("galaxy")&&this.galaxyGroup){const L=this.sunRotationSpeedY||.002,U=this.sunRotationSpeedZ||5e-4;if(this.galaxyStars&&(this.galaxyStars.rotation.y+=L*_*.5,this.galaxyStars.rotation.z+=U*_*.5),this.galaxySunMesh){this.galaxySunMesh.rotation.z-=U*_*1.5,this.galaxySunMesh.rotation.y+=L*_*2;const X=1+w*.15*(this.galaxySunStyle==="sun3"?2.5:1);this.galaxySunMesh.scale.setScalar(X)}this.galaxySunUniforms&&(this.galaxySunUniforms.uTime.value=m*_,this.galaxySunUniforms.uBassIntt.value=w,this._cymaticV2&&this._cymaticV2.shiver>.5&&(this.galaxySunUniforms.uTime.value+=this._cymaticV2.shiver*.05))}if(this.activeModes.has("sphere")&&this.sphere&&(this.sphere.scale.setScalar(1+w*.15),this.sphere.rotation.y+=.005*_),this.activeModes.has("particles")&&this.particleMaterial){const L=((r=(n=window.MindWaveState)==null?void 0:n.envIntensities)==null?void 0:r.flow)??1,U=(.015*_+w*.08+C*.05)*L;this.particleMaterial.uniforms.uTime.value=m,this.particleMaterial.uniforms.uSpeed.value=U*10,this.particleGroup.rotation.z+=(.001*_+w*.005)*L}if(this.activeModes.has("lightspeed")&&this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uTime.value=m,this.lightspeedMaterial.uniforms.uSpeed.value=_),this.activeModes.has("matrix")&&this.cyberMaterial&&(this.cyberMaterial.uniforms.uTime.value=m*_),this.activeModes.has("waves")&&this.wavesMaterial){const L=((o=(s=window.MindWaveState)==null?void 0:s.envIntensities)==null?void 0:o.ocean)??1;this.wavesMaterial.uniforms.uTime.value=m*_*.5,this.wavesMaterial.uniforms.uNormBass.value=w*L,this.wavesMaterial.uniforms.uIntensity&&(this.wavesMaterial.uniforms.uIntensity.value=L)}if(this.activeModes.has("ocean")&&this.oceanWave&&this.oceanWave.material.uniforms){const L=((l=(a=window.MindWaveState)==null?void 0:a.envIntensities)==null?void 0:l.ocean)??1;this.oceanWave.material.uniforms.uTime.value=m*_,this.oceanWave.material.uniforms.uNormBass.value=w*L,this.oceanWave.material.uniforms.uBeatPulse.value=C*L,this.oceanFoam&&(this.oceanFoam.material.opacity=(.4+w*.3+C*.2)*(this.brightnessMultiplier||1)*L)}if(this.activeModes.has("box")&&this.boxOuter&&(this.boxOuter.rotation.x+=.008*_+w*.02,this.boxOuter.rotation.y+=.012*_,this.boxInner&&(this.boxInner.rotation.x-=.015*_,this.boxInner.rotation.y-=.01*_,this.boxInner.scale.setScalar(.95+w*.2)),this.boxOuter.scale.setScalar(1+w*.2),this.boxEdges&&this.boxEdges.rotation.copy(this.boxOuter.rotation)),this.activeModes.has("dragon")&&this.dragonBodyInstanced&&this.dragonDummy){this.dragonGroup.rotation.y+=.005*_;const L=m*_*2,U=1+w*.2;for(let X=0;X<this.dragonLength;X++){const N=L-X*.12,O=Math.sin(N)*8,Y=Math.cos(N*1.5)*4+Math.sin(N*.5)*3,j=Math.cos(N*.8)*8;this.dragonDummy.position.set(O,Y,j);const se=N+.1,q=Math.sin(se)*8,Z=Math.cos(se*1.5)*4+Math.sin(se*.5)*3,oe=Math.cos(se*.8)*8;this.dragonDummy.lookAt(q,Z,oe);const pe=1-X/this.dragonLength*.8,de=1+Math.sin(N*4)*.15*(.5+w);this.dragonDummy.scale.setScalar(pe*de*U),this.dragonDummy.updateMatrix(),this.dragonBodyInstanced.setMatrixAt(X,this.dragonDummy.matrix),this.dragonGlowInstanced&&this.dragonGlowInstanced.setMatrixAt(X,this.dragonDummy.matrix),X===0&&this.dragonHead&&(this.dragonHead.position.copy(this.dragonDummy.position),this.dragonHead.quaternion.copy(this.dragonDummy.quaternion),this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4))}if(this.dragonBodyInstanced.instanceMatrix.needsUpdate=!0,this.dragonGlowInstanced&&(this.dragonGlowInstanced.instanceMatrix.needsUpdate=!0),this.dragonPearlGroup){const X=L+.5;this.dragonPearlGroup.position.set(Math.sin(X)*9,Math.cos(X*1.5)*5+Math.sin(X*.5)*4,Math.cos(X*.8)*9),this.dragonPearlGroup.rotation.x+=.08*_,this.dragonPearlGroup.rotation.y+=.12*_}}if(this.activeModes.has("mandala")&&this.mandalaRings&&(this.mandalaRings.forEach((L,U)=>{L.userData&&L.userData.speed&&(L.rotation.z+=L.userData.speed*_+w*.005);const X=1+C*.1*(U+1)*.3;L.scale.setScalar(X)}),this.mandalaCenter&&(this.mandalaCenter.rotation.z-=.01*_,this.mandalaCenter.scale.setScalar(1+w*.3))),this.logoMesh){const L=Ne.lotusState||"auto";let U=.8;L==="faded"||L==="full"&&(U=1),this._lotusCurrentOpacity===void 0&&(this._lotusCurrentOpacity=.8),this._lotusCurrentOpacity+=(U-this._lotusCurrentOpacity)*.1,this.logoMesh.material.opacity=this._lotusCurrentOpacity,this.logoMesh.scale.setScalar(1+w*(.05+((c=this._cymaticV2)==null?void 0:c.shiver)*.1)+C*.02)}if(this.activeModes.has("lava")&&this.lavaBlobs&&this.lavaUniforms){const L=((u=(h=window.MindWaveState)==null?void 0:h.envIntensities)==null?void 0:u.lava)??1;this.lavaUniforms.uTime.value=m*_,this.lavaUniforms.uIntensity.value=w*L,this.lavaBlobs.forEach((U,X)=>{const N=U.userData,O=_*(1+w*.8);if(N.state==="heating"?(N.temperature+=N.heatRate*p*O,N.temperature>=1&&(N.temperature=1,N.state="rising")):N.state==="rising"?(U.position.y+=N.riseSpeed*O,U.position.y>=N.floatMax&&(N.state="cooling")):N.state==="cooling"?(N.temperature-=N.coolRate*p*O,N.temperature<=0&&(N.temperature=0,N.state="falling")):N.state==="falling"&&(U.position.y-=N.fallSpeed*O,U.position.y<=N.floatMin&&(N.state="heating")),U.position.x+=Math.sin(m*N.driftSpeed+N.driftPhase)*.02*O,this.lavaUniforms.uBlobs.value[X]){const Y=N.baseSize*(.8+.5*N.temperature);this.lavaUniforms.uBlobs.value[X].set(U.position.x,U.position.y,U.position.z,Y)}})}if(this.snowflakeGroup&&this.snowflakeGroup.visible&&this._snowData){const L=this._snowData,U=L.points.geometry.attributes.position.array,X=_*2;for(let N=0;N<L.count;N++){const O=N*3;U[O+1]-=L.speeds[N]*X;let Y=Math.sin(m*L.driftFreqs[N]+L.phases[N])*L.drifts[N]*X;U[O]+=Y,U[O+1]<-22&&(U[O+1]=22),U[O]>35&&(U[O]=-35),U[O]<-35&&(U[O]=35)}if(L.points.geometry.attributes.position.needsUpdate=!0,L.spinMeshes){const N=1+(w||0)*.15;L.spinMeshes.forEach((O,Y)=>{O.rotation.z+=L.spinSpeeds[Y]*X,O.position.y-=L.spinSpeeds[Y]*.1*X,O.scale.setScalar(N),O.position.y<-25&&(O.position.y=25)})}L.material&&L.material.uniforms&&L.material.uniforms.uIntensity&&(L.material.uniforms.uIntensity.value=.2+w*.8)}if(this.activeModes.has("rainforest")&&this.rainMaterial){const L=_*.8*(1+C*.3);this.rainMaterial.uniforms.uTime.value=m,this.rainMaterial.uniforms.uSpeed.value=L,this.rainMaterial.uniforms.uIntensity.value=(.5+w*.2+C*.2)*(this.brightnessMultiplier||1)}if(this.activeModes.has("zengarden")&&this.petalMaterial){const L=_*.3*(1+C*.5);this.petalMaterial.uniforms.uTime.value=m,this.petalMaterial.uniforms.uSpeed.value=L,this.zenWater&&(this.zenWater.material.opacity=(.3+C*.2)*(this.brightnessMultiplier||1))}if(this.activeModes.has("fireplace")&&this.fireMesh&&this.fireMesh.material&&this.fireMesh.material.uniforms){const L=.8+.2*Math.sin(m*15)*Math.sin(m*7),U=this.fireMesh.material.uniforms;U.uTime&&(U.uTime.value=m*1.5*_),U.uIntensity&&(U.uIntensity.value=L+w*.5),this.fireLight&&(this.fireLight.intensity=(2+w*5)*L)}const W=performance.now(),ee=W-(this._lastFrameStartTime||W);if(this._lastFrameStartTime=W,this._fpsRingBuffer&&(this._fpsRingBuffer[this._fpsRingIndex]=ee,this._fpsRingIndex=(this._fpsRingIndex+1)%60,this._fpsRingCount=Math.min(60,this._fpsRingCount+1),this._fpsRingCount===60)){let L=0;for(let X=0;X<60;X++)L+=this._fpsRingBuffer[X];L/=60,1e3/L<35&&W-(this._lastLodDegradation||0)>3e3&&(this.degradeLOD(),this._lastLodDegradation=W,this._fpsRingCount=0)}const D=1e3/(this.targetFPS||60);W-this.lastFrameRenderTime>=D&&(this.renderer.autoClear=!this.activeModes.has("lightspeed"),this.renderer.autoClear&&this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.activeModes.has("cyber")&&this.renderCyberCyber(),this.lastFrameRenderTime=W)}catch(d){console.error("[Visualizer] Render Loop Error:",d),d.name==="TypeError"&&d.message.includes("uniforms")&&console.warn("[Visualizer] Shader not ready, skipping frame...")}finally{this._isRendering=!1}this.active&&!document.hidden?Ne.animationId=requestAnimationFrame(()=>this.render(Ne.analyserLeft,Ne.analyserRight)):Ne.animationId=null}}setCyberColor(e){this.cyberConfig.color=e,this.cyberConfig.rainbow=!1,this.cyberColorCustomized=!0,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.matrixConfig.rainbow=!1,this.cyberMaterial&&this.cyberMaterial.uniforms.uColor&&(this.cyberMaterial.uniforms.uColor.value.set(e),this._tempColor.set(e),this._tempColor.r+=(1-this._tempColor.r)*.8,this._tempColor.g+=(1-this._tempColor.g)*.8,this._tempColor.b+=(1-this._tempColor.b)*.8,this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor),this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=0))}getAverageFrequency(e,t){let n=Ne.analyserLeft||Ne.analyserRight;if(!n)return 0;const r=n.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==r)&&(this._freqDataArray=new Uint8Array(r));const s=this._freqDataArray;n.getByteFrequencyData(s),e===void 0&&(e=0),t===void 0&&(t=s.length);let o=0,a=0;for(let l=e;l<t&&l<s.length;l++)o+=s[l],a++;return a>0?o/a:0}setMouseInfluence(e){this.mouseInfluence=e}setGlobalSpeed(e){this.speedMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=1+(e-1)*.5)}setGlobalBrightness(e){this.brightnessMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberBrightness(e){this.cyberConfig.brightness=e}setMatrixBrightness(e){this.matrixConfig.brightness=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberSpeed(e){this.cyberConfig.speed=e}setCyberLength(e){this.cyberConfig.length=e}setMatrixSpeed(e){this.matrixConfig.speed=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=e)}setMatrixLength(e){this.matrixConfig.length=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uTailLength.value=e)}setCyberRainbow(e){if(this.cyberConfig.rainbow=e,this.cyberRainbowMode=e,!e){const t=this.cyberConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(n=>{n.color=t})}}setMatrixRainbow(e){this.matrixConfig.rainbow=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=e?1:0)}setBatterySaver(e){this.batterySaver=e,this.targetFPS=e?30:60;const t=e?1:2;this.renderer&&(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t)),this.resize()),console.log(`[Visualizer] Battery Saver ${e?"ENABLED (30fps/1x)":"DISABLED (60fps/2x)"}`)}degradeLOD(){this.renderer&&(this.currentLodLevel==="high"?(console.log("[Visualizer] FPS dropping. Degrading LOD to Medium (Pixel Ratio: 1.0)"),this.renderer.setPixelRatio(1),this.currentLodLevel="medium",this.resize()):this.currentLodLevel==="medium"&&(console.log("[Visualizer] FPS dropping. Degrading LOD to Low (Pixel Ratio: 0.75)"),this.renderer.setPixelRatio(.75),this.currentLodLevel="low",this.resize()))}updateCyberStrings(){if(!this.matrixCyberStreams)return;let e=!1,t="MINDWAVE🪷";const n=this.cyberConfig;n.logicMode==="custom"||n.logicMode==="txt"?(e=!0,t="🪷"+(n.customText||"WELCOME TO MINDWAVE")):(n.logicMode==="mindwave"||n.logicMode==="mw")&&(e=!0,t="MINDWAVE🪷");const r="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",s="0123456789·:.-+x[]<>/\\∆ΣΩ∞",o=100;this.matrixCyberStreams.forEach(a=>{if(a.chars=[],a.isTextMode=e,e&&t.length>0){const l=[...t].reverse();for(let c=0;c<o;c++)a.chars.push(l[c%l.length])}else if(n.logicMode==="matrix"||n.logicMode==="interstellar"||n.logicMode==="int")for(let l=0;l<o;l++)a.chars.push(s.charAt(Math.floor(Math.random()*s.length)));else for(let l=0;l<o;l++)a.chars.push(r.charAt(Math.floor(Math.random()*r.length)))})}setCyberLogicMode(e,t){console.log(`[Visualizer] setCyberLogicMode(mode="${e}", text="${t}")`),this.cyberConfig.logicMode=e,t!==void 0&&(this.cyberConfig.customText=t),this.updateCyberStrings()}setMatrixLogicMode(e,t){if(console.log(`[Visualizer] setMatrixLogicMode(mode="${e}", text="${t}") -> 3D config`),this.matrixConfig.logicMode=e,t!==void 0&&(this.matrixConfig.customText=t),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTexture){const n=this.cyberMaterial.uniforms.uTexture.value,r=this.createCyberTexture(this.matrixConfig);this.cyberMaterial.uniforms.uTexture.value=r,this.cyberMaterial.needsUpdate=!0,n&&n.dispose()}this.initCyber()}setCyberColor(e){this.cyberConfig.color=e,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uColor&&this.cyberMaterial.uniforms.uColor.value.set(e)}setCyberAngle(e){this.cyberConfig.angle=e}setMatrixAngle(e){this.matrixConfig.angle=e,this.currentCyberAngle=e,this.cyberRotationGroup&&(this.cyberRotationGroup.rotation.z=Va.degToRad(-e))}setVibrationEnabled(e){this.vibrationEnabled=e}updateLogoTexture(){if(!this.originalLogoImg)return;const e=512;this._logoRenderCanvas||(this._logoRenderCanvas=document.createElement("canvas"),this._logoRenderCanvas.width=e,this._logoRenderCanvas.height=e);const t=this._logoRenderCanvas,n=t.getContext("2d",{willReadFrequently:!0});n.clearRect(0,0,e,e),n.drawImage(this.originalLogoImg,0,0,e,e);const r=n.getImageData(0,0,t.width,t.height),s=r.data,o=document.body.dataset.theme||"default",a=aa[o]||aa.default,l=a.secondary||a.accent||"#ffffff",c=this.customColors&&this.customColors.mandala?this.customColors.mandala:this.customColor,h=c?c.getHex():parseInt(a.accent.replace("#",""),16),u=parseInt(l.replace("#",""),16),d=h>>16&255,f=h>>8&255,g=h&255,_=u>>16&255,m=u>>8&255,p=u&255;this.themeType=document.body.dataset.themeType||"dark",this.themeType;for(let v=0;v<s.length;v+=4){const S=s[v],C=s[v+1],w=s[v+2],A=s[v+3];A<10||(S>200&&C>200&&w>200?(s[v]=d,s[v+1]=f,s[v+2]=g,s[v+3]=255):(s[v]=_,s[v+1]=m,s[v+2]=p,s[v+3]=Math.min(255,A*1.5)))}n.putImageData(r,0,0);const x=new Ci(t);if(x.minFilter=It,x.magFilter=It,x.generateMipmaps=!0,this.renderer&&(x.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),this.logoMesh){const v=this.logoMesh.material.map;this.logoMesh.material.map=x,this.logoMesh.material.needsUpdate=!0,v&&v.dispose()}else{const v=new on(5.625,4.78),S=new Lt({map:x,transparent:!0,opacity:.8,color:16777215,depthTest:!1,depthWrite:!1});this.logoMesh=new Xe(v,S),this.logoMesh.position.set(0,0,-10),this.logoMesh.renderOrder=-1,this.scene.add(this.logoMesh)}}initOverlayLogo(){if(this.logoMesh)return;const e=new Image;e.crossOrigin="anonymous",e.src="./mindwave-logo-icon.png",e.onload=()=>{this.originalLogoImg=e,this.updateLogoTexture(),this.targetLogoOpacity!==void 0?this.setLogoOpacity(this.targetLogoOpacity):this.setLogoOpacity(.8)},e.onerror=t=>{console.warn("[Visualizer] Failed to load logo:",t)}}setLogoOpacity(e){this.targetLogoOpacity=e,this.logoMesh&&this.logoMesh.material?this.logoMesh.material.opacity=e*this.brightnessMultiplier:!this.logoMesh&&e>0&&this.initOverlayLogo()}dispose(){this.active=!1,Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null),window.removeEventListener("resize",this.resize),window.removeEventListener("resize",this.resizeOverlayCanvas),window.removeEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode&&window.removeEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange&&document.removeEventListener("visibilitychange",this._boundVisibilityChange),this._boundThemeChange&&window.removeEventListener("themeChanged",this._boundThemeChange),this.canvas&&(this._boundContextLost&&this.canvas.removeEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored&&this.canvas.removeEventListener("webglcontextrestored",this._boundContextRestored)),this._boundCymaticPointer&&(window.removeEventListener("mousemove",this._boundCymaticPointer),window.removeEventListener("touchmove",this._boundCymaticPointer));const e=n=>{if(n)for(;n.children.length>0;){const r=n.children[0];if(n.remove(r),r.geometry&&r.geometry.dispose(),r.material){if(r.material.map&&r.material.map.dispose(),r.material.uniforms)for(const s in r.material.uniforms){const o=r.material.uniforms[s];o&&o.value&&o.value.dispose&&o.value.dispose()}r.material.dispose()}r.children&&r.children.length&&r.traverse(s=>{s.geometry&&s.geometry.dispose(),s.material&&(s.material.map&&s.material.map.dispose(),s.material.dispose())})}},t=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];this._fpsRingBuffer=null,this._tempColor=null,this._logoRenderCanvas=null,t.forEach(e),this.cyberMaterial&&(this.cyberMaterial.dispose(),this.cyberMaterial=null),this.fireMaterial&&(this.fireMaterial.dispose(),this.fireMaterial=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.lightspeedMaterial&&(this.lightspeedMaterial.dispose(),this.lightspeedMaterial=null),this.rainMaterial&&(this.rainMaterial.dispose(),this.rainMaterial=null),this.petalMaterial&&(this.petalMaterial.dispose(),this.petalMaterial=null),this.logoMesh&&(this.logoMesh.material&&(this.logoMesh.material.map&&this.logoMesh.material.map.dispose(),this.logoMesh.material.dispose()),this.logoMesh.geometry&&this.logoMesh.geometry.dispose(),this.scene&&this.scene.remove(this.logoMesh),this.logoMesh=null);for(const n in this.textures)this.textures[n]&&this.textures[n].dispose&&this.textures[n].dispose();if(this.textures={},this._freqDataArray=null,this.renderer){try{this.renderer.forceContextLoss()}catch{}this.renderer.dispose(),this.renderer=null}this.scene=null,this.camera=null,console.log("[Visualizer] Disposed all GPU resources and removed listeners.")}setWarpSpeed(e){this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uSpeed.value=e)}setWarpFov(e){this.camera&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setWarpChromatic(e){this.lightspeedMaterial&&console.log(`[Warp] Chromatic Intensity set to: ${e}`)}}function ig(){return Te?Promise.resolve(Te):new Promise(i=>{Km(),setTimeout(()=>i(Te),10)})}function Km(){if(!Te&&Jt.canvas&&Jt.canvas.activeVisualizer&&Jt.canvas.activeVisualizer.isVisualizer3D&&(Te=Jt.canvas.activeVisualizer),Jt.canvas&&Jt.canvas.activeVisualizer){if(Te&&Jt.canvas.activeVisualizer===Te)return Te;Jt.canvas.activeVisualizer.dispose(),Jt.canvas.activeVisualizer=null,Te=null}Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null);const i=Jt.canvas||document.getElementById("visualizer");if(!Te&&i){const e=i&&i.activeVisualizer&&i.activeVisualizer.isVisualizer3D?{activeModes:i.activeVisualizer.activeModes,mode:i.activeVisualizer.mode,mindWaveMode:i.activeVisualizer.mindWaveMode,cyberLogicMode:i.activeVisualizer.cyberLogicMode,cyberCustomText:i.activeVisualizer.cyberCustomText,currentCyberAngle:i.activeVisualizer.currentCyberAngle,cyberSpeedMultiplier:i.activeVisualizer.cyberSpeedMultiplier,rainbowEnabled:i.activeVisualizer._rainbowEnabled}:{};Te=new $m(i,e),i.activeVisualizer=Te,setTimeout(()=>{Te&&(Te.updateVisibility(),jm())},0)}return Te}function rg(){return Te}let Qs=!1;function sg(){Qs=!0,Te&&Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null,Te.renderer&&Te.scene&&Te.camera&&Te.renderer.render(Te.scene,Te.camera))}function jm(){Te&&!Ne.animationId&&(Te.active=!0,Te.render(Ne.analyserLeft,Ne.analyserRight),Qs=!1)}function ag(){return Qs}function og(i){Te&&Te.toggleMode(i)}function lg(i){Te&&(Te.setGlobalSpeed(i),Te.setCyberSpeed&&Te.setCyberSpeed(i))}function cg(i,e=null){Te&&(Te.setVisualColor(i,e),Te.setCyberColor&&(!e||e=="cyber")&&Te.setCyberColor(i))}function hg(i){Te&&Te.setGlobalBrightness&&Te.setGlobalBrightness(i)}function ug(i){Te&&Te.setLogoOpacity(i)}function dg(i){Te&&Te.setMouseInfluence(i)}window.toggleGalaxySun=function(){return Te?Te.toggleGalaxySunStyle():null};export{$m as Visualizer3D,rg as getVisualizer,Km as initVisualizer,ag as isVisualsPaused,sg as pauseVisuals,ig as preloadVisualizer,jm as resumeVisuals,dg as setMouseInfluence,hg as setVisualBrightness,cg as setVisualColor,ug as setVisualLogoOpacity,lg as setVisualSpeed,og as toggleVisual};
//# sourceMappingURL=visualizer_vGOLD_SYNC-CGdmZmwc.js.map
