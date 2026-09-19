import{h as Ne,T as ca,e as $t}from"./controls_v3-DnInW25W.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vs="160",Wl=0,ha=1,Xl=2,jo=1,ql=2,on=3,cn=0,Dt=1,xt=2,xn=0,ui=1,qe=2,ua=3,fa=4,Yl=5,Ln=100,Zl=101,Jl=102,da=103,pa=104,$l=200,Kl=201,jl=202,Ql=203,Cs=204,Rs=205,ec=206,tc=207,nc=208,ic=209,rc=210,sc=211,ac=212,oc=213,lc=214,cc=0,hc=1,uc=2,Cr=3,fc=4,dc=5,pc=6,mc=7,Qo=0,gc=1,vc=2,yn=0,_c=1,xc=2,yc=3,Mc=4,Sc=5,Ec=6,el=300,pi=301,mi=302,Ps=303,Ls=304,Fr=306,Ds=1e3,Yt=1001,Is=1002,yt=1003,ma=1004,Xr=1005,It=1006,bc=1007,Oi=1008,Mn=1009,Tc=1010,wc=1011,ks=1012,tl=1013,gn=1014,vn=1015,zi=1016,nl=1017,il=1018,In=1020,Ac=1021,Zt=1023,Cc=1024,Rc=1025,Un=1026,gi=1027,Pc=1028,rl=1029,Lc=1030,sl=1031,al=1033,qr=33776,Yr=33777,Zr=33778,Jr=33779,ga=35840,va=35841,_a=35842,xa=35843,ol=36196,ya=37492,Ma=37496,Sa=37808,Ea=37809,ba=37810,Ta=37811,wa=37812,Aa=37813,Ca=37814,Ra=37815,Pa=37816,La=37817,Da=37818,Ia=37819,Ua=37820,Na=37821,$r=36492,Fa=36494,Oa=36495,Dc=36283,za=36284,Ba=36285,Ga=36286,ll=3e3,Nn=3001,Ic=3200,Uc=3201,Nc=0,Fc=1,kt="",Mt="srgb",hn="srgb-linear",Ws="display-p3",Or="display-p3-linear",Rr="linear",nt="srgb",Pr="rec709",Lr="p3",Hn=7680,Ha=519,Oc=512,zc=513,Bc=514,cl=515,Gc=516,Hc=517,Vc=518,kc=519,Va=35044,ka="300 es",Us=1035,ln=2e3,Dr=2001;class _i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wa=1234567;const fi=Math.PI/180,Bi=180/Math.PI;function zn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function St(i,e,t){return Math.max(e,Math.min(t,i))}function Xs(i,e){return(i%e+e)%e}function Wc(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Xc(i,e,t){return i!==e?(t-i)/(e-i):0}function Li(i,e,t){return(1-t)*i+t*e}function qc(i,e,t,n){return Li(i,e,1-Math.exp(-t*n))}function Yc(i,e=1){return e-Math.abs(Xs(i,e*2)-e)}function Zc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Jc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function $c(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Kc(i,e){return i+Math.random()*(e-i)}function jc(i){return i*(.5-Math.random())}function Qc(i){i!==void 0&&(Wa=i);let e=Wa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function eh(i){return i*fi}function th(i){return i*Bi}function Ns(i){return(i&i-1)===0&&i!==0}function nh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ir(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ih(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),f=o((e-n)/2),d=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ri(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Xa={DEG2RAD:fi,RAD2DEG:Bi,generateUUID:zn,clamp:St,euclideanModulo:Xs,mapLinear:Wc,inverseLerp:Xc,lerp:Li,damp:qc,pingpong:Yc,smoothstep:Zc,smootherstep:Jc,randInt:$c,randFloat:Kc,randFloatSpread:jc,seededRandom:Qc,degToRad:eh,radToDeg:th,isPowerOfTwo:Ns,ceilPowerOfTwo:nh,floorPowerOfTwo:Ir,setQuaternionFromProperEuler:ih,normalize:Rt,denormalize:ri};class ce{constructor(e=0,t=0){ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,r,s,o,a,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],x=r[1],v=r[4],S=r[7],C=r[2],w=r[5],A=r[8];return s[0]=o*_+a*x+l*C,s[3]=o*m+a*v+l*w,s[6]=o*p+a*S+l*A,s[1]=c*_+h*x+u*C,s[4]=c*m+h*v+u*w,s[7]=c*p+h*S+u*A,s[2]=f*_+d*x+g*C,s[5]=f*m+d*v+g*w,s[8]=f*p+d*S+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*s,d=c*s-o*l,g=t*u+n*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(r*c-h*n)*_,e[2]=(a*n-r*o)*_,e[3]=f*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Kr.makeScale(e,t)),this}rotate(e){return this.premultiply(Kr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Kr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Kr=new Ve;function hl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Gi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function rh(){const i=Gi("canvas");return i.style.display="block",i}const qa={};function Di(i){i in qa||(qa[i]=!0,console.warn(i))}const Ya=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Za=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Zi={[hn]:{transfer:Rr,primaries:Pr,toReference:i=>i,fromReference:i=>i},[Mt]:{transfer:nt,primaries:Pr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Or]:{transfer:Rr,primaries:Lr,toReference:i=>i.applyMatrix3(Za),fromReference:i=>i.applyMatrix3(Ya)},[Ws]:{transfer:nt,primaries:Lr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Za),fromReference:i=>i.applyMatrix3(Ya).convertLinearToSRGB()}},sh=new Set([hn,Or]),$e={enabled:!0,_workingColorSpace:hn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!sh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Zi[e].toReference,r=Zi[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Zi[i].primaries},getTransfer:function(i){return i===kt?Rr:Zi[i].transfer}};function di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function jr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Vn;class ul{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Vn===void 0&&(Vn=Gi("canvas")),Vn.width=e.width,Vn.height=e.height;const n=Vn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Vn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Gi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=di(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(di(t[n]/255)*255):t[n]=di(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ah=0;class fl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=zn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Qr(r[o].image)):s.push(Qr(r[o]))}else s=Qr(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Qr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ul.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let oh=0;class Ut extends _i{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=Yt,r=Yt,s=It,o=Oi,a=Zt,l=Mn,c=Ut.DEFAULT_ANISOTROPY,h=kt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=zn(),this.name="",this.source=new fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Nn?Mt:kt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==el)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ds:e.x=e.x-Math.floor(e.x);break;case Yt:e.x=e.x<0?0:1;break;case Is:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ds:e.y=e.y-Math.floor(e.y);break;case Yt:e.y=e.y<0?0:1;break;case Is:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Mt?Nn:ll}set encoding(e){Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Nn?Mt:kt}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=el;Ut.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,r=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,S=(d+1)/2,C=(p+1)/2,w=(h+f)/4,A=(u+_)/4,F=(g+m)/4;return v>S&&v>C?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=w/n,s=A/n):S>C?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=w/r,s=F/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=A/s,r=F/s),this.set(n,r,s,t),this}let x=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-_)/x,this.z=(f-h)/x,this.w=Math.acos((c+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class lh extends _i{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Di("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Nn?Mt:kt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ut(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new fl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fn extends lh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class dl extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=yt,this.minFilter=yt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ch extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=yt,this.minFilter=yt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==f||c!==d||h!==g){let m=1-a;const p=l*f+c*d+h*g+u*_,x=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const C=Math.sqrt(v),w=Math.atan2(C,p*x);m=Math.sin(m*w)/C,a=Math.sin(a*w)/C}const S=a*x;if(l=l*m+f*S,c=c*m+d*S,h=h*m+g*S,u=u*m+_*S,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+h*u+l*d-c*f,e[t+1]=l*g+h*f+c*u-a*d,e[t+2]=c*g+h*d+a*f-l*u,e[t+3]=h*g-a*u-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(r/2),u=a(s/2),f=l(n/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-r*a,this._w=o*h-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ja.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ja.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),h=2*(a*t-s*r),u=2*(s*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return es.copy(this).projectOnVector(e),this.sub(es)}reflect(e){return this.sub(es.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const es=new R,Ja=new Wi;class Bn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Wt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Wt):Wt.fromBufferAttribute(s,o),Wt.applyMatrix4(e.matrixWorld),this.expandByPoint(Wt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ji.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ji.copy(n.boundingBox)),Ji.applyMatrix4(e.matrixWorld),this.union(Ji)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Wt),Wt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Si),$i.subVectors(this.max,Si),kn.subVectors(e.a,Si),Wn.subVectors(e.b,Si),Xn.subVectors(e.c,Si),un.subVectors(Wn,kn),fn.subVectors(Xn,Wn),Tn.subVectors(kn,Xn);let t=[0,-un.z,un.y,0,-fn.z,fn.y,0,-Tn.z,Tn.y,un.z,0,-un.x,fn.z,0,-fn.x,Tn.z,0,-Tn.x,-un.y,un.x,0,-fn.y,fn.x,0,-Tn.y,Tn.x,0];return!ts(t,kn,Wn,Xn,$i)||(t=[1,0,0,0,1,0,0,0,1],!ts(t,kn,Wn,Xn,$i))?!1:(Ki.crossVectors(un,fn),t=[Ki.x,Ki.y,Ki.z],ts(t,kn,Wn,Xn,$i))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(en[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),en[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),en[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),en[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),en[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),en[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),en[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),en[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(en),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const en=[new R,new R,new R,new R,new R,new R,new R,new R],Wt=new R,Ji=new Bn,kn=new R,Wn=new R,Xn=new R,un=new R,fn=new R,Tn=new R,Si=new R,$i=new R,Ki=new R,wn=new R;function ts(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){wn.fromArray(i,s);const a=r.x*Math.abs(wn.x)+r.y*Math.abs(wn.y)+r.z*Math.abs(wn.z),l=e.dot(wn),c=t.dot(wn),h=n.dot(wn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const hh=new Bn,Ei=new R,ns=new R;class Gn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):hh.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ei.subVectors(e,this.center);const t=Ei.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ei,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ns.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ei.copy(e.center).add(ns)),this.expandByPoint(Ei.copy(e.center).sub(ns))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const tn=new R,is=new R,ji=new R,dn=new R,rs=new R,Qi=new R,ss=new R;class qs{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,tn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=tn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(tn.copy(this.origin).addScaledVector(this.direction,t),tn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){is.copy(e).add(t).multiplyScalar(.5),ji.copy(t).sub(e).normalize(),dn.copy(this.origin).sub(is);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ji),a=dn.dot(this.direction),l=-dn.dot(ji),c=dn.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(is).addScaledVector(ji,f),d}intersectSphere(e,t){tn.subVectors(e.center,this.origin);const n=tn.dot(this.direction),r=tn.dot(tn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,tn)!==null}intersectTriangle(e,t,n,r,s){rs.subVectors(t,e),Qi.subVectors(n,e),ss.crossVectors(rs,Qi);let o=this.direction.dot(ss),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;dn.subVectors(this.origin,e);const l=a*this.direction.dot(Qi.crossVectors(dn,Qi));if(l<0)return null;const c=a*this.direction.dot(rs.cross(dn));if(c<0||l+c>o)return null;const h=-a*dn.dot(ss);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,r,s,o,a,l,c,h,u,f,d,g,_,m){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,h,u,f,d,g,_,m)}set(e,t,n,r,s,o,a,l,c,h,u,f,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/qn.setFromMatrixColumn(e,0).length(),s=1/qn.setFromMatrixColumn(e,1).length(),o=1/qn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,d=l*u,g=c*h,_=c*u;t[0]=f+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,d=l*u,g=c*h,_=c*u;t[0]=f-_*a,t[4]=-o*u,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*h,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-d,t[8]=f*c+_,t[1]=l*u,t[5]=_*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-f*u,t[8]=g*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=d*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+_,t[5]=o*h,t[9]=d*u-g,t[2]=g*u-d,t[6]=a*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(uh,e,fh)}lookAt(e,t,n){const r=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),pn.crossVectors(n,Ft),pn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),pn.crossVectors(n,Ft)),pn.normalize(),er.crossVectors(Ft,pn),r[0]=pn.x,r[4]=er.x,r[8]=Ft.x,r[1]=pn.y,r[5]=er.y,r[9]=Ft.y,r[2]=pn.z,r[6]=er.z,r[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],v=n[7],S=n[11],C=n[15],w=r[0],A=r[4],F=r[8],y=r[12],b=r[1],z=r[5],W=r[9],ee=r[13],D=r[2],P=r[6],U=r[10],X=r[14],N=r[3],O=r[7],Y=r[11],j=r[15];return s[0]=o*w+a*b+l*D+c*N,s[4]=o*A+a*z+l*P+c*O,s[8]=o*F+a*W+l*U+c*Y,s[12]=o*y+a*ee+l*X+c*j,s[1]=h*w+u*b+f*D+d*N,s[5]=h*A+u*z+f*P+d*O,s[9]=h*F+u*W+f*U+d*Y,s[13]=h*y+u*ee+f*X+d*j,s[2]=g*w+_*b+m*D+p*N,s[6]=g*A+_*z+m*P+p*O,s[10]=g*F+_*W+m*U+p*Y,s[14]=g*y+_*ee+m*X+p*j,s[3]=x*w+v*b+S*D+C*N,s[7]=x*A+v*z+S*P+C*O,s[11]=x*F+v*W+S*U+C*Y,s[15]=x*y+v*ee+S*X+C*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*u-r*c*u-s*a*f+n*c*f+r*a*d-n*l*d)+_*(+t*l*d-t*c*f+s*o*f-r*o*d+r*c*h-s*l*h)+m*(+t*c*u-t*a*d-s*o*u+n*o*d+s*a*h-n*c*h)+p*(-r*a*h-t*l*u+t*a*f+r*o*u-n*o*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=u*m*c-_*f*c+_*l*d-a*m*d-u*l*p+a*f*p,v=g*f*c-h*m*c-g*l*d+o*m*d+h*l*p-o*f*p,S=h*_*c-g*u*c+g*a*d-o*_*d-h*a*p+o*u*p,C=g*u*l-h*_*l-g*a*f+o*_*f+h*a*m-o*u*m,w=t*x+n*v+r*S+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=x*A,e[1]=(_*f*s-u*m*s-_*r*d+n*m*d+u*r*p-n*f*p)*A,e[2]=(a*m*s-_*l*s+_*r*c-n*m*c-a*r*p+n*l*p)*A,e[3]=(u*l*s-a*f*s-u*r*c+n*f*c+a*r*d-n*l*d)*A,e[4]=v*A,e[5]=(h*m*s-g*f*s+g*r*d-t*m*d-h*r*p+t*f*p)*A,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*A,e[7]=(o*f*s-h*l*s+h*r*c-t*f*c-o*r*d+t*l*d)*A,e[8]=S*A,e[9]=(g*u*s-h*_*s-g*n*d+t*_*d+h*n*p-t*u*p)*A,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*p+t*a*p)*A,e[11]=(h*a*s-o*u*s-h*n*c+t*u*c+o*n*d-t*a*d)*A,e[12]=C*A,e[13]=(h*_*r-g*u*r+g*n*f-t*_*f-h*n*m+t*u*m)*A,e[14]=(g*a*r-o*_*r-g*n*l+t*_*l+o*n*m-t*a*m)*A,e[15]=(o*u*r-h*a*r+h*n*l-t*u*l-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+n,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,f=s*c,d=s*h,g=s*u,_=o*h,m=o*u,p=a*u,x=l*c,v=l*h,S=l*u,C=n.x,w=n.y,A=n.z;return r[0]=(1-(_+p))*C,r[1]=(d+S)*C,r[2]=(g-v)*C,r[3]=0,r[4]=(d-S)*w,r[5]=(1-(f+p))*w,r[6]=(m+x)*w,r[7]=0,r[8]=(g+v)*A,r[9]=(m-x)*A,r[10]=(1-(f+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=qn.set(r[0],r[1],r[2]).length();const o=qn.set(r[4],r[5],r[6]).length(),a=qn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Xt.copy(this);const c=1/s,h=1/o,u=1/a;return Xt.elements[0]*=c,Xt.elements[1]*=c,Xt.elements[2]*=c,Xt.elements[4]*=h,Xt.elements[5]*=h,Xt.elements[6]*=h,Xt.elements[8]*=u,Xt.elements[9]*=u,Xt.elements[10]*=u,t.setFromRotationMatrix(Xt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=ln){const l=this.elements,c=2*s/(t-e),h=2*s/(n-r),u=(t+e)/(t-e),f=(n+r)/(n-r);let d,g;if(a===ln)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Dr)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=ln){const l=this.elements,c=1/(t-e),h=1/(n-r),u=1/(o-s),f=(t+e)*c,d=(n+r)*h;let g,_;if(a===ln)g=(o+s)*u,_=-2*u;else if(a===Dr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const qn=new R,Xt=new tt,uh=new R(0,0,0),fh=new R(1,1,1),pn=new R,er=new R,Ft=new R,$a=new tt,Ka=new Wi;class zr{constructor(e=0,t=0,n=0,r=zr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],f=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(St(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-St(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(St(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(St(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-St(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $a.makeRotationFromQuaternion(e),this.setFromRotationMatrix($a,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ka.setFromEuler(this),this.setFromQuaternion(Ka,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zr.DEFAULT_ORDER="XYZ";class pl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dh=0;const ja=new R,Yn=new Wi,nn=new tt,tr=new R,bi=new R,ph=new R,mh=new Wi,Qa=new R(1,0,0),eo=new R(0,1,0),to=new R(0,0,1),gh={type:"added"},vh={type:"removed"};class dt extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new R,t=new zr,n=new Wi,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new tt},normalMatrix:{value:new Ve}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yn.setFromAxisAngle(e,t),this.quaternion.multiply(Yn),this}rotateOnWorldAxis(e,t){return Yn.setFromAxisAngle(e,t),this.quaternion.premultiply(Yn),this}rotateX(e){return this.rotateOnAxis(Qa,e)}rotateY(e){return this.rotateOnAxis(eo,e)}rotateZ(e){return this.rotateOnAxis(to,e)}translateOnAxis(e,t){return ja.copy(e).applyQuaternion(this.quaternion),this.position.add(ja.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qa,e)}translateY(e){return this.translateOnAxis(eo,e)}translateZ(e){return this.translateOnAxis(to,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?tr.copy(e):tr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?nn.lookAt(bi,tr,this.up):nn.lookAt(tr,bi,this.up),this.quaternion.setFromRotationMatrix(nn),r&&(nn.extractRotation(r.matrixWorld),Yn.setFromRotationMatrix(nn),this.quaternion.premultiply(Yn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(gh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(nn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,e,ph),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,mh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}dt.DEFAULT_UP=new R(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qt=new R,rn=new R,as=new R,sn=new R,Zn=new R,Jn=new R,no=new R,os=new R,ls=new R,cs=new R;let nr=!1;class Ht{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),qt.subVectors(e,t),r.cross(qt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){qt.subVectors(r,t),rn.subVectors(n,t),as.subVectors(e,t);const o=qt.dot(qt),a=qt.dot(rn),l=qt.dot(as),c=rn.dot(rn),h=rn.dot(as),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getUV(e,t,n,r,s,o,a,l){return nr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),nr=!0),this.getInterpolation(e,t,n,r,s,o,a,l)}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,sn.x),l.addScaledVector(o,sn.y),l.addScaledVector(a,sn.z),l)}static isFrontFacing(e,t,n,r){return qt.subVectors(n,t),rn.subVectors(e,t),qt.cross(rn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qt.subVectors(this.c,this.b),rn.subVectors(this.a,this.b),qt.cross(rn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ht.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ht.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return nr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),nr=!0),Ht.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return Ht.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Ht.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ht.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Zn.subVectors(r,n),Jn.subVectors(s,n),os.subVectors(e,n);const l=Zn.dot(os),c=Jn.dot(os);if(l<=0&&c<=0)return t.copy(n);ls.subVectors(e,r);const h=Zn.dot(ls),u=Jn.dot(ls);if(h>=0&&u<=h)return t.copy(r);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Zn,o);cs.subVectors(e,s);const d=Zn.dot(cs),g=Jn.dot(cs);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Jn,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return no.subVectors(s,r),a=(u-h)/(u-h+(d-g)),t.copy(r).addScaledVector(no,a);const p=1/(m+_+f);return o=_*p,a=f*p,t.copy(n).addScaledVector(Zn,o).addScaledVector(Jn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ml={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mn={h:0,s:0,l:0},ir={h:0,s:0,l:0};function hs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class _e{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=$e.workingColorSpace){if(e=Xs(e,1),t=St(t,0,1),n=St(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=hs(o,s,e+1/3),this.g=hs(o,s,e),this.b=hs(o,s,e-1/3)}return $e.toWorkingColorSpace(this,r),this}setStyle(e,t=Mt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const n=ml[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=jr(e.r),this.g=jr(e.g),this.b=jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return $e.fromWorkingColorSpace(Tt.copy(this),e),Math.round(St(Tt.r*255,0,255))*65536+Math.round(St(Tt.g*255,0,255))*256+Math.round(St(Tt.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(Tt.copy(this),t);const n=Tt.r,r=Tt.g,s=Tt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=Mt){$e.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,n=Tt.g,r=Tt.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(mn),this.setHSL(mn.h+e,mn.s+t,mn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(mn),e.getHSL(ir);const n=Li(mn.h,ir.h,t),r=Li(mn.s,ir.s,t),s=Li(mn.l,ir.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new _e;_e.NAMES=ml;let _h=0;class xi extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=zn(),this.name="",this.type="Material",this.blending=ui,this.side=cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cs,this.blendDst=Rs,this.blendEquation=Ln,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _e(0,0,0),this.blendAlpha=0,this.depthFunc=Cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ha,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hn,this.stencilZFail=Hn,this.stencilZPass=Hn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ui&&(n.blending=this.blending),this.side!==cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Cs&&(n.blendSrc=this.blendSrc),this.blendDst!==Rs&&(n.blendDst=this.blendDst),this.blendEquation!==Ln&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Cr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ha&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Pt extends xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new R,rr=new ce;class ut{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Va,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rr.fromBufferAttribute(this,t),rr.applyMatrix3(e),this.setXY(t,rr.x,rr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ri(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ri(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ri(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ri(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ri(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),r=Rt(r,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Va&&(e.usage=this.usage),e}}class gl extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class vl extends ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Fe extends ut{constructor(e,t,n){super(new Float32Array(e),t,n)}}let xh=0;const Gt=new tt,us=new dt,$n=new R,Ot=new Bn,Ti=new Bn,_t=new R;class Ke extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=zn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hl(e)?vl:gl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,n){return Gt.makeTranslation(e,t,n),this.applyMatrix4(Gt),this}scale(e,t,n){return Gt.makeScale(e,t,n),this.applyMatrix4(Gt),this}lookAt(e){return us.lookAt(e),us.updateMatrix(),this.applyMatrix4(us.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($n).negate(),this.translate($n.x,$n.y,$n.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Fe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Ot.setFromBufferAttribute(s),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,Ot.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,Ot.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(Ot.min),this.boundingBox.expandByPoint(Ot.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Ot.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ti.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(Ot.min,Ti.min),Ot.expandByPoint(_t),_t.addVectors(Ot.max,Ti.max),Ot.expandByPoint(_t)):(Ot.expandByPoint(Ti.min),Ot.expandByPoint(Ti.max))}Ot.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)_t.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(_t));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)_t.fromBufferAttribute(a,c),l&&($n.fromBufferAttribute(e,c),_t.add($n)),r=Math.max(r,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ut(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let b=0;b<a;b++)c[b]=new R,h[b]=new R;const u=new R,f=new R,d=new R,g=new ce,_=new ce,m=new ce,p=new R,x=new R;function v(b,z,W){u.fromArray(r,b*3),f.fromArray(r,z*3),d.fromArray(r,W*3),g.fromArray(o,b*2),_.fromArray(o,z*2),m.fromArray(o,W*2),f.sub(u),d.sub(u),_.sub(g),m.sub(g);const ee=1/(_.x*m.y-m.x*_.y);isFinite(ee)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-_.y).multiplyScalar(ee),x.copy(d).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(ee),c[b].add(p),c[z].add(p),c[W].add(p),h[b].add(x),h[z].add(x),h[W].add(x))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let b=0,z=S.length;b<z;++b){const W=S[b],ee=W.start,D=W.count;for(let P=ee,U=ee+D;P<U;P+=3)v(n[P+0],n[P+1],n[P+2])}const C=new R,w=new R,A=new R,F=new R;function y(b){A.fromArray(s,b*3),F.copy(A);const z=c[b];C.copy(z),C.sub(A.multiplyScalar(A.dot(z))).normalize(),w.crossVectors(F,z);const ee=w.dot(h[b])<0?-1:1;l[b*4]=C.x,l[b*4+1]=C.y,l[b*4+2]=C.z,l[b*4+3]=ee}for(let b=0,z=S.length;b<z;++b){const W=S[b],ee=W.start,D=W.count;for(let P=ee,U=ee+D;P<U;P+=3)y(n[P+0]),y(n[P+1]),y(n[P+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new R,s=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new ut(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ke,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const io=new tt,An=new qs,sr=new Gn,ro=new R,Kn=new R,jn=new R,Qn=new R,fs=new R,ar=new R,or=new ce,lr=new ce,cr=new ce,so=new R,ao=new R,oo=new R,hr=new R,ur=new R;class We extends dt{constructor(e=new Ke,t=new Pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ar.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(fs.fromBufferAttribute(u,e),o?ar.addScaledVector(fs,h):ar.addScaledVector(fs.sub(t),h))}t.add(ar)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(s),An.copy(e.ray).recast(e.near),!(sr.containsPoint(An.origin)===!1&&(An.intersectSphere(sr,ro)===null||An.origin.distanceToSquared(ro)>(e.far-e.near)**2))&&(io.copy(s).invert(),An.copy(e.ray).applyMatrix4(io),!(n.boundingBox!==null&&An.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,An)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],x=Math.max(m.start,d.start),v=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let S=x,C=v;S<C;S+=3){const w=a.getX(S),A=a.getX(S+1),F=a.getX(S+2);r=fr(this,p,e,n,c,h,u,w,A,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const x=a.getX(m),v=a.getX(m+1),S=a.getX(m+2);r=fr(this,o,e,n,c,h,u,x,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],x=Math.max(m.start,d.start),v=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=x,C=v;S<C;S+=3){const w=S,A=S+1,F=S+2;r=fr(this,p,e,n,c,h,u,w,A,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const x=m,v=m+1,S=m+2;r=fr(this,o,e,n,c,h,u,x,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function yh(i,e,t,n,r,s,o,a){let l;if(e.side===Dt?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===cn,a),l===null)return null;ur.copy(a),ur.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ur);return c<t.near||c>t.far?null:{distance:c,point:ur.clone(),object:i}}function fr(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,Kn),i.getVertexPosition(l,jn),i.getVertexPosition(c,Qn);const h=yh(i,e,t,n,Kn,jn,Qn,hr);if(h){r&&(or.fromBufferAttribute(r,a),lr.fromBufferAttribute(r,l),cr.fromBufferAttribute(r,c),h.uv=Ht.getInterpolation(hr,Kn,jn,Qn,or,lr,cr,new ce)),s&&(or.fromBufferAttribute(s,a),lr.fromBufferAttribute(s,l),cr.fromBufferAttribute(s,c),h.uv1=Ht.getInterpolation(hr,Kn,jn,Qn,or,lr,cr,new ce),h.uv2=h.uv1),o&&(so.fromBufferAttribute(o,a),ao.fromBufferAttribute(o,l),oo.fromBufferAttribute(o,c),h.normal=Ht.getInterpolation(hr,Kn,jn,Qn,so,ao,oo,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new R,materialIndex:0};Ht.getNormal(Kn,jn,Qn,u.normal),h.face=u}return h}class Sn extends Ke{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Fe(c,3)),this.setAttribute("normal",new Fe(h,3)),this.setAttribute("uv",new Fe(u,2));function g(_,m,p,x,v,S,C,w,A,F,y){const b=S/A,z=C/F,W=S/2,ee=C/2,D=w/2,P=A+1,U=F+1;let X=0,N=0;const O=new R;for(let Y=0;Y<U;Y++){const j=Y*z-ee;for(let se=0;se<P;se++){const q=se*b-W;O[_]=q*x,O[m]=j*v,O[p]=D,c.push(O.x,O.y,O.z),O[_]=0,O[m]=0,O[p]=w>0?1:-1,h.push(O.x,O.y,O.z),u.push(se/A),u.push(1-Y/F),X+=1}}for(let Y=0;Y<F;Y++)for(let j=0;j<A;j++){const se=f+j+P*Y,q=f+j+P*(Y+1),Z=f+(j+1)+P*(Y+1),oe=f+(j+1)+P*Y;l.push(se,q,oe),l.push(q,Z,oe),N+=6}a.addGroup(d,N,y),d+=N,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function vi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Lt(i){const e={};for(let t=0;t<i.length;t++){const n=vi(i[t]);for(const r in n)e[r]=n[r]}return e}function Mh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function _l(i){return i.getRenderTarget()===null?i.outputColorSpace:$e.workingColorSpace}const Sh={clone:vi,merge:Lt};var Eh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ct extends xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Eh,this.fragmentShader=bh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vi(e.uniforms),this.uniformsGroups=Mh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xl extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=ln}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class zt extends xl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bi*2*Math.atan(Math.tan(fi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ei=-90,ti=1;class Th extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new zt(ei,ti,e,t);r.layers=this.layers,this.add(r);const s=new zt(ei,ti,e,t);s.layers=this.layers,this.add(s);const o=new zt(ei,ti,e,t);o.layers=this.layers,this.add(o);const a=new zt(ei,ti,e,t);a.layers=this.layers,this.add(a);const l=new zt(ei,ti,e,t);l.layers=this.layers,this.add(l);const c=new zt(ei,ti,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===ln)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Dr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class yl extends Ut{constructor(e,t,n,r,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:pi,super(e,t,n,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wh extends Fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Di("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Nn?Mt:kt),this.texture=new yl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:It}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Sn(5,5,5),s=new ct({name:"CubemapFromEquirect",uniforms:vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dt,blending:xn});s.uniforms.tEquirect.value=t;const o=new We(r,s),a=t.minFilter;return t.minFilter===Oi&&(t.minFilter=It),new Th(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const ds=new R,Ah=new R,Ch=new Ve;class Rn{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ds.subVectors(n,t).cross(Ah.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ds),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ch.getNormalMatrix(e),r=this.coplanarPoint(ds).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cn=new Gn,dr=new R;class Ys{constructor(e=new Rn,t=new Rn,n=new Rn,r=new Rn,s=new Rn,o=new Rn){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ln){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],f=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],x=r[13],v=r[14],S=r[15];if(n[0].setComponents(l-s,f-c,m-d,S-p).normalize(),n[1].setComponents(l+s,f+c,m+d,S+p).normalize(),n[2].setComponents(l+o,f+h,m+g,S+x).normalize(),n[3].setComponents(l-o,f-h,m-g,S-x).normalize(),n[4].setComponents(l-a,f-u,m-_,S-v).normalize(),t===ln)n[5].setComponents(l+a,f+u,m+_,S+v).normalize();else if(t===Dr)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cn)}intersectsSprite(e){return Cn.center.set(0,0,0),Cn.radius=.7071067811865476,Cn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(dr.x=r.normal.x>0?e.max.x:e.min.x,dr.y=r.normal.y>0?e.max.y:e.min.y,dr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ml(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Rh(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,h){const u=c.array,f=c.usage,d=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,f),c.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:d}}function s(c,h,u){const f=h.array,d=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,c),d.count===-1&&g.length===0&&i.bufferSubData(u,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?i.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):i.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}d.count!==-1&&(t?i.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):i.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,r(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}class Vt extends Ke{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,h=l+1,u=e/a,f=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const x=p*f-o;for(let v=0;v<c;v++){const S=v*u-s;g.push(S,-x,0),_.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const v=x+c*p,S=x+c*(p+1),C=x+1+c*(p+1),w=x+1+c*p;d.push(v,S,w),d.push(S,C,w)}this.setIndex(d),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(_,3)),this.setAttribute("uv",new Fe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vt(e.width,e.height,e.widthSegments,e.heightSegments)}}var Ph=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lh=`#ifdef USE_ALPHAHASH
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
#endif`,Dh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ih=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Nh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fh=`#ifdef USE_AOMAP
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
#endif`,Oh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zh=`#ifdef USE_BATCHING
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
#endif`,Bh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Gh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kh=`#ifdef USE_IRIDESCENCE
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
#endif`,Wh=`#ifdef USE_BUMPMAP
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
#endif`,Xh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$h=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,jh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Qh=`#define PI 3.141592653589793
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
} // validated`,eu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tu=`vec3 transformedNormal = objectNormal;
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
#endif`,nu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,iu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ru=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,su=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,au="gl_FragColor = linearToOutputTexel( gl_FragColor );",ou=`
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
}`,lu=`#ifdef USE_ENVMAP
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
#endif`,cu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hu=`#ifdef USE_ENVMAP
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
#endif`,uu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fu=`#ifdef USE_ENVMAP
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
#endif`,du=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vu=`#ifdef USE_GRADIENTMAP
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
}`,_u=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,xu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Su=`uniform bool receiveShadow;
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
#endif`,Eu=`#ifdef USE_ENVMAP
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
#endif`,bu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Au=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cu=`PhysicalMaterial material;
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
#endif`,Ru=`struct PhysicalMaterial {
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
}`,Pu=`
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
#endif`,Lu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Du=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Iu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Fu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Ou=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gu=`#if defined( USE_POINTS_UV )
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
#endif`,Hu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ku=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wu=`#ifdef USE_MORPHNORMALS
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
#endif`,Xu=`#ifdef USE_MORPHTARGETS
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
#endif`,qu=`#ifdef USE_MORPHTARGETS
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
#endif`,Yu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ju=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$u=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ku=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ju=`#ifdef USE_NORMALMAP
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
#endif`,Qu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ef=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,af=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,of=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ff=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,df=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mf=`float getShadowMask() {
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
}`,gf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vf=`#ifdef USE_SKINNING
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
#endif`,_f=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xf=`#ifdef USE_SKINNING
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
#endif`,yf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ef=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bf=`#ifdef USE_TRANSMISSION
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
#endif`,Tf=`#ifdef USE_TRANSMISSION
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
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lf=`uniform sampler2D t2D;
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
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,If=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Uf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ff=`#include <common>
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
}`,Of=`#if DEPTH_PACKING == 3200
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
}`,zf=`#define DISTANCE
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
}`,Bf=`#define DISTANCE
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
}`,Gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`uniform float scale;
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
}`,kf=`uniform vec3 diffuse;
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
}`,Wf=`#include <common>
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
}`,Xf=`uniform vec3 diffuse;
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
}`,qf=`#define LAMBERT
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
}`,Yf=`#define LAMBERT
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
}`,Zf=`#define MATCAP
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
}`,Jf=`#define MATCAP
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
}`,$f=`#define NORMAL
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
}`,Kf=`#define NORMAL
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
}`,jf=`#define PHONG
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
}`,Qf=`#define PHONG
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
}`,ed=`#define STANDARD
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
}`,td=`#define STANDARD
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
}`,nd=`#define TOON
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
}`,id=`#define TOON
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
}`,rd=`uniform float size;
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
}`,sd=`uniform vec3 diffuse;
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
}`,ad=`#include <common>
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
}`,od=`uniform vec3 color;
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
}`,ld=`uniform float rotation;
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
}`,cd=`uniform vec3 diffuse;
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
}`,Ue={alphahash_fragment:Ph,alphahash_pars_fragment:Lh,alphamap_fragment:Dh,alphamap_pars_fragment:Ih,alphatest_fragment:Uh,alphatest_pars_fragment:Nh,aomap_fragment:Fh,aomap_pars_fragment:Oh,batching_pars_vertex:zh,batching_vertex:Bh,begin_vertex:Gh,beginnormal_vertex:Hh,bsdfs:Vh,iridescence_fragment:kh,bumpmap_pars_fragment:Wh,clipping_planes_fragment:Xh,clipping_planes_pars_fragment:qh,clipping_planes_pars_vertex:Yh,clipping_planes_vertex:Zh,color_fragment:Jh,color_pars_fragment:$h,color_pars_vertex:Kh,color_vertex:jh,common:Qh,cube_uv_reflection_fragment:eu,defaultnormal_vertex:tu,displacementmap_pars_vertex:nu,displacementmap_vertex:iu,emissivemap_fragment:ru,emissivemap_pars_fragment:su,colorspace_fragment:au,colorspace_pars_fragment:ou,envmap_fragment:lu,envmap_common_pars_fragment:cu,envmap_pars_fragment:hu,envmap_pars_vertex:uu,envmap_physical_pars_fragment:Eu,envmap_vertex:fu,fog_vertex:du,fog_pars_vertex:pu,fog_fragment:mu,fog_pars_fragment:gu,gradientmap_pars_fragment:vu,lightmap_fragment:_u,lightmap_pars_fragment:xu,lights_lambert_fragment:yu,lights_lambert_pars_fragment:Mu,lights_pars_begin:Su,lights_toon_fragment:bu,lights_toon_pars_fragment:Tu,lights_phong_fragment:wu,lights_phong_pars_fragment:Au,lights_physical_fragment:Cu,lights_physical_pars_fragment:Ru,lights_fragment_begin:Pu,lights_fragment_maps:Lu,lights_fragment_end:Du,logdepthbuf_fragment:Iu,logdepthbuf_pars_fragment:Uu,logdepthbuf_pars_vertex:Nu,logdepthbuf_vertex:Fu,map_fragment:Ou,map_pars_fragment:zu,map_particle_fragment:Bu,map_particle_pars_fragment:Gu,metalnessmap_fragment:Hu,metalnessmap_pars_fragment:Vu,morphcolor_vertex:ku,morphnormal_vertex:Wu,morphtarget_pars_vertex:Xu,morphtarget_vertex:qu,normal_fragment_begin:Yu,normal_fragment_maps:Zu,normal_pars_fragment:Ju,normal_pars_vertex:$u,normal_vertex:Ku,normalmap_pars_fragment:ju,clearcoat_normal_fragment_begin:Qu,clearcoat_normal_fragment_maps:ef,clearcoat_pars_fragment:tf,iridescence_pars_fragment:nf,opaque_fragment:rf,packing:sf,premultiplied_alpha_fragment:af,project_vertex:of,dithering_fragment:lf,dithering_pars_fragment:cf,roughnessmap_fragment:hf,roughnessmap_pars_fragment:uf,shadowmap_pars_fragment:ff,shadowmap_pars_vertex:df,shadowmap_vertex:pf,shadowmask_pars_fragment:mf,skinbase_vertex:gf,skinning_pars_vertex:vf,skinning_vertex:_f,skinnormal_vertex:xf,specularmap_fragment:yf,specularmap_pars_fragment:Mf,tonemapping_fragment:Sf,tonemapping_pars_fragment:Ef,transmission_fragment:bf,transmission_pars_fragment:Tf,uv_pars_fragment:wf,uv_pars_vertex:Af,uv_vertex:Cf,worldpos_vertex:Rf,background_vert:Pf,background_frag:Lf,backgroundCube_vert:Df,backgroundCube_frag:If,cube_vert:Uf,cube_frag:Nf,depth_vert:Ff,depth_frag:Of,distanceRGBA_vert:zf,distanceRGBA_frag:Bf,equirect_vert:Gf,equirect_frag:Hf,linedashed_vert:Vf,linedashed_frag:kf,meshbasic_vert:Wf,meshbasic_frag:Xf,meshlambert_vert:qf,meshlambert_frag:Yf,meshmatcap_vert:Zf,meshmatcap_frag:Jf,meshnormal_vert:$f,meshnormal_frag:Kf,meshphong_vert:jf,meshphong_frag:Qf,meshphysical_vert:ed,meshphysical_frag:td,meshtoon_vert:nd,meshtoon_frag:id,points_vert:rd,points_frag:sd,shadow_vert:ad,shadow_frag:od,sprite_vert:ld,sprite_frag:cd},ne={common:{diffuse:{value:new _e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new _e(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Kt={basic:{uniforms:Lt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:Lt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new _e(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:Lt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new _e(0)},specular:{value:new _e(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:Lt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new _e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:Lt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new _e(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:Lt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:Lt([ne.points,ne.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:Lt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:Lt([ne.common,ne.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:Lt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:Lt([ne.sprite,ne.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:Lt([ne.common,ne.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:Lt([ne.lights,ne.fog,{color:{value:new _e(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Kt.physical={uniforms:Lt([Kt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new _e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new _e(0)},specularColor:{value:new _e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const pr={r:0,b:0,g:0};function hd(i,e,t,n,r,s,o){const a=new _e(0);let l=s===!0?0:1,c,h,u=null,f=0,d=null;function g(m,p){let x=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,l):v&&v.isColor&&(_(v,1),x=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Fr)?(h===void 0&&(h=new We(new Sn(1,1,1),new ct({name:"BackgroundCubeMaterial",uniforms:vi(Kt.backgroundCube.uniforms),vertexShader:Kt.backgroundCube.vertexShader,fragmentShader:Kt.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=$e.getTransfer(v.colorSpace)!==nt,(u!==v||f!==v.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new We(new Vt(2,2),new ct({name:"BackgroundMaterial",uniforms:vi(Kt.background.uniforms),vertexShader:Kt.background.vertexShader,fragmentShader:Kt.background.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=$e.getTransfer(v.colorSpace)!==nt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(pr,_l(i)),n.buffers.color.setClear(pr.r,pr.g,pr.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function ud(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let c=l,h=!1;function u(D,P,U,X,N){let O=!1;if(o){const Y=_(X,U,P);c!==Y&&(c=Y,d(c.object)),O=p(D,X,U,N),O&&x(D,X,U,N)}else{const Y=P.wireframe===!0;(c.geometry!==X.id||c.program!==U.id||c.wireframe!==Y)&&(c.geometry=X.id,c.program=U.id,c.wireframe=Y,O=!0)}N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(O||h)&&(h=!1,F(D,P,U,X),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function f(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function d(D){return n.isWebGL2?i.bindVertexArray(D):s.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?i.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function _(D,P,U){const X=U.wireframe===!0;let N=a[D.id];N===void 0&&(N={},a[D.id]=N);let O=N[P.id];O===void 0&&(O={},N[P.id]=O);let Y=O[X];return Y===void 0&&(Y=m(f()),O[X]=Y),Y}function m(D){const P=[],U=[],X=[];for(let N=0;N<r;N++)P[N]=0,U[N]=0,X[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:X,object:D,attributes:{},index:null}}function p(D,P,U,X){const N=c.attributes,O=P.attributes;let Y=0;const j=U.getAttributes();for(const se in j)if(j[se].location>=0){const Z=N[se];let oe=O[se];if(oe===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(oe=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(oe=D.instanceColor)),Z===void 0||Z.attribute!==oe||oe&&Z.data!==oe.data)return!0;Y++}return c.attributesNum!==Y||c.index!==X}function x(D,P,U,X){const N={},O=P.attributes;let Y=0;const j=U.getAttributes();for(const se in j)if(j[se].location>=0){let Z=O[se];Z===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(Z=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(Z=D.instanceColor));const oe={};oe.attribute=Z,Z&&Z.data&&(oe.data=Z.data),N[se]=oe,Y++}c.attributes=N,c.attributesNum=Y,c.index=X}function v(){const D=c.newAttributes;for(let P=0,U=D.length;P<U;P++)D[P]=0}function S(D){C(D,0)}function C(D,P){const U=c.newAttributes,X=c.enabledAttributes,N=c.attributeDivisors;U[D]=1,X[D]===0&&(i.enableVertexAttribArray(D),X[D]=1),N[D]!==P&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,P),N[D]=P)}function w(){const D=c.newAttributes,P=c.enabledAttributes;for(let U=0,X=P.length;U<X;U++)P[U]!==D[U]&&(i.disableVertexAttribArray(U),P[U]=0)}function A(D,P,U,X,N,O,Y){Y===!0?i.vertexAttribIPointer(D,P,U,N,O):i.vertexAttribPointer(D,P,U,X,N,O)}function F(D,P,U,X){if(n.isWebGL2===!1&&(D.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const N=X.attributes,O=U.getAttributes(),Y=P.defaultAttributeValues;for(const j in O){const se=O[j];if(se.location>=0){let q=N[j];if(q===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(q=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(q=D.instanceColor)),q!==void 0){const Z=q.normalized,oe=q.itemSize,me=t.get(q);if(me===void 0)continue;const de=me.buffer,Pe=me.type,De=me.bytesPerElement,be=n.isWebGL2===!0&&(Pe===i.INT||Pe===i.UNSIGNED_INT||q.gpuType===tl);if(q.isInterleavedBufferAttribute){const Xe=q.data,B=Xe.stride,wt=q.offset;if(Xe.isInstancedInterleavedBuffer){for(let ye=0;ye<se.locationSize;ye++)C(se.location+ye,Xe.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Xe.meshPerAttribute*Xe.count)}else for(let ye=0;ye<se.locationSize;ye++)S(se.location+ye);i.bindBuffer(i.ARRAY_BUFFER,de);for(let ye=0;ye<se.locationSize;ye++)A(se.location+ye,oe/se.locationSize,Pe,Z,B*De,(wt+oe/se.locationSize*ye)*De,be)}else{if(q.isInstancedBufferAttribute){for(let Xe=0;Xe<se.locationSize;Xe++)C(se.location+Xe,q.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Xe=0;Xe<se.locationSize;Xe++)S(se.location+Xe);i.bindBuffer(i.ARRAY_BUFFER,de);for(let Xe=0;Xe<se.locationSize;Xe++)A(se.location+Xe,oe/se.locationSize,Pe,Z,oe*De,oe/se.locationSize*Xe*De,be)}}else if(Y!==void 0){const Z=Y[j];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(se.location,Z);break;case 3:i.vertexAttrib3fv(se.location,Z);break;case 4:i.vertexAttrib4fv(se.location,Z);break;default:i.vertexAttrib1fv(se.location,Z)}}}}w()}function y(){W();for(const D in a){const P=a[D];for(const U in P){const X=P[U];for(const N in X)g(X[N].object),delete X[N];delete P[U]}delete a[D]}}function b(D){if(a[D.id]===void 0)return;const P=a[D.id];for(const U in P){const X=P[U];for(const N in X)g(X[N].object),delete X[N];delete P[U]}delete a[D.id]}function z(D){for(const P in a){const U=a[P];if(U[D.id]===void 0)continue;const X=U[D.id];for(const N in X)g(X[N].object),delete X[N];delete U[D.id]}}function W(){ee(),h=!0,c!==l&&(c=l,d(c.object))}function ee(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:W,resetDefaultState:ee,dispose:y,releaseStatesOfGeometry:b,releaseStatesOfProgram:z,initAttributes:v,enableAttribute:S,disableUnusedAttributes:w}}function fd(i,e,t,n){const r=n.isWebGL2;let s;function o(h){s=h}function a(h,u){i.drawArrays(s,h,u),t.update(u,s,1)}function l(h,u,f){if(f===0)return;let d,g;if(r)d=i,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](s,h,u,f),t.update(u,s,f)}function c(h,u,f){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{d.multiDrawArraysWEBGL(s,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function dd(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,S=o||e.has("OES_texture_float"),C=v&&S,w=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:S,floatVertexTextures:C,maxSamples:w}}function pd(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Rn,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||r;return r=f,n=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const x=s?0:n,v=x*4;let S=p.clippingState||null;l.value=S,S=h(g,f,v,d);for(let C=0;C!==v;++C)S[C]=t[C];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,S=d;v!==_;++v,S+=4)o.copy(u[v]).applyMatrix4(x,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function md(i){let e=new WeakMap;function t(o,a){return a===Ps?o.mapping=pi:a===Ls&&(o.mapping=mi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ps||a===Ls)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new wh(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Sl extends xl{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ai=4,lo=[.125,.215,.35,.446,.526,.582],Dn=20,ps=new Sl,co=new _e;let ms=null,gs=0,vs=0;const Pn=(1+Math.sqrt(5))/2,ni=1/Pn,ho=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,Pn,ni),new R(0,Pn,-ni),new R(ni,0,Pn),new R(-ni,0,Pn),new R(Pn,ni,0),new R(-Pn,ni,0)];class uo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ms=this._renderer.getRenderTarget(),gs=this._renderer.getActiveCubeFace(),vs=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=po(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ms,gs,vs),e.scissorTest=!1,mr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===pi||e.mapping===mi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ms=this._renderer.getRenderTarget(),gs=this._renderer.getActiveCubeFace(),vs=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:zi,format:Zt,colorSpace:hn,depthBuffer:!1},r=fo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fo(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gd(s)),this._blurMaterial=vd(s,e,t)}return r}_compileMaterial(e){const t=new We(this._lodPlanes[0],e);this._renderer.compile(t,ps)}_sceneToCubeUV(e,t,n,r){const a=new zt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(co),h.toneMapping=yn,h.autoClear=!1;const d=new Pt({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),g=new We(new Sn,d);let _=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(co),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const v=this._cubeSize;mr(r,x*v,p>2?v:0,v,v),h.setRenderTarget(r),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===pi||e.mapping===mi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=po());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new We(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;mr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ps)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ho[(r-1)%ho.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new We(this._lodPlanes[r],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Dn-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):Dn;m>Dn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Dn}`);const p=[];let x=0;for(let A=0;A<Dn;++A){const F=A/_,y=Math.exp(-F*F/2);p.push(y),A===0?x+=y:A<m&&(x+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const S=this._sizeLods[r],C=3*S*(r>v-ai?r-v+ai:0),w=4*(this._cubeSize-S);mr(t,C,w,3*S,2*S),l.setRenderTarget(t),l.render(u,ps)}}function gd(i){const e=[],t=[],n=[];let r=i;const s=i-ai+1+lo.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-ai?l=lo[o-i+ai-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*d),v=new Float32Array(m*g*d),S=new Float32Array(p*g*d);for(let w=0;w<d;w++){const A=w%3*2/3-1,F=w>2?0:-1,y=[A,F,0,A+2/3,F,0,A+2/3,F+1,0,A,F,0,A+2/3,F+1,0,A,F+1,0];x.set(y,_*g*w),v.set(f,m*g*w);const b=[w,w,w,w,w,w];S.set(b,p*g*w)}const C=new Ke;C.setAttribute("position",new ut(x,_)),C.setAttribute("uv",new ut(v,m)),C.setAttribute("faceIndex",new ut(S,p)),e.push(C),r>ai&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function fo(i,e,t){const n=new Fn(i,e,t);return n.texture.mapping=Fr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function mr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function vd(i,e,t){const n=new Float32Array(Dn),r=new R(0,1,0);return new ct({name:"SphericalGaussianBlur",defines:{n:Dn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zs(),fragmentShader:`

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
		`,blending:xn,depthTest:!1,depthWrite:!1})}function po(){return new ct({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zs(),fragmentShader:`

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
		`,blending:xn,depthTest:!1,depthWrite:!1})}function mo(){return new ct({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function Zs(){return`

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
	`}function _d(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ps||l===Ls,h=l===pi||l===mi;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new uo(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&r(u)){t===null&&(t=new uo(i));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function xd(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function yd(i,e,t,n){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const x=d.array;_=d.version;for(let v=0,S=x.length;v<S;v+=3){const C=x[v+0],w=x[v+1],A=x[v+2];f.push(C,w,w,A,A,C)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,S=x.length/3-1;v<S;v+=3){const C=v+0,w=v+1,A=v+2;f.push(C,w,w,A,A,C)}}else return;const m=new(hl(f)?vl:gl)(f,1);m.version=_;const p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){const f=s.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Md(i,e,t,n){const r=n.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,g){i.drawElements(s,g,a,d*l),t.update(g,s,1)}function u(d,g,_){if(_===0)return;let m,p;if(r)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,a,d*l,_),t.update(g,s,_)}function f(d,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(d[p]/l,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,a,d,0,_);let p=0;for(let x=0;x<_;x++)p+=g[x];t.update(p,s,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function Sd(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Ed(i,e){return i[0]-e[0]}function bd(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Td(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,o=new it,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const d=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=d!==void 0?d.length:0;let _=s.get(h);if(_===void 0||_.count!==g){let D=function(){W.dispose(),s.delete(h),h.removeEventListener("dispose",D)};_!==void 0&&_.texture.dispose();const x=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],A=h.morphAttributes.color||[];let F=0;x===!0&&(F=1),v===!0&&(F=2),S===!0&&(F=3);let y=h.attributes.position.count*F,b=1;y>e.maxTextureSize&&(b=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const z=new Float32Array(y*b*4*g),W=new dl(z,y,b,g);W.type=vn,W.needsUpdate=!0;const ee=F*4;for(let P=0;P<g;P++){const U=C[P],X=w[P],N=A[P],O=y*b*4*P;for(let Y=0;Y<U.count;Y++){const j=Y*ee;x===!0&&(o.fromBufferAttribute(U,Y),z[O+j+0]=o.x,z[O+j+1]=o.y,z[O+j+2]=o.z,z[O+j+3]=0),v===!0&&(o.fromBufferAttribute(X,Y),z[O+j+4]=o.x,z[O+j+5]=o.y,z[O+j+6]=o.z,z[O+j+7]=0),S===!0&&(o.fromBufferAttribute(N,Y),z[O+j+8]=o.x,z[O+j+9]=o.y,z[O+j+10]=o.z,z[O+j+11]=N.itemSize===4?o.w:1)}}_={count:g,texture:W,size:new ce(y,b)},s.set(h,_),h.addEventListener("dispose",D)}let m=0;for(let x=0;x<f.length;x++)m+=f[x];const p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",p),u.getUniforms().setValue(i,"morphTargetInfluences",f),u.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{const d=f===void 0?0:f.length;let g=n[h.id];if(g===void 0||g.length!==d){g=[];for(let v=0;v<d;v++)g[v]=[v,0];n[h.id]=g}for(let v=0;v<d;v++){const S=g[v];S[0]=v,S[1]=f[v]}g.sort(bd);for(let v=0;v<8;v++)v<d&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(Ed);const _=h.morphAttributes.position,m=h.morphAttributes.normal;let p=0;for(let v=0;v<8;v++){const S=a[v],C=S[0],w=S[1];C!==Number.MAX_SAFE_INTEGER&&w?(_&&h.getAttribute("morphTarget"+v)!==_[C]&&h.setAttribute("morphTarget"+v,_[C]),m&&h.getAttribute("morphNormal"+v)!==m[C]&&h.setAttribute("morphNormal"+v,m[C]),r[v]=w,p+=w):(_&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),m&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),r[v]=0)}const x=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function wd(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class El extends Ut{constructor(e,t,n,r,s,o,a,l,c,h){if(h=h!==void 0?h:Un,h!==Un&&h!==gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Un&&(n=gn),n===void 0&&h===gi&&(n=In),super(null,r,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:yt,this.minFilter=l!==void 0?l:yt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const bl=new Ut,Tl=new El(1,1);Tl.compareFunction=cl;const wl=new dl,Al=new ch,Cl=new yl,go=[],vo=[],_o=new Float32Array(16),xo=new Float32Array(9),yo=new Float32Array(4);function yi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=go[r];if(s===void 0&&(s=new Float32Array(r),go[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Br(i,e){let t=vo[e];t===void 0&&(t=new Int32Array(e),vo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ad(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Cd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2fv(this.addr,e),mt(t,e)}}function Rd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;i.uniform3fv(this.addr,e),mt(t,e)}}function Pd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4fv(this.addr,e),mt(t,e)}}function Ld(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;yo.set(n),i.uniformMatrix2fv(this.addr,!1,yo),mt(t,n)}}function Dd(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;xo.set(n),i.uniformMatrix3fv(this.addr,!1,xo),mt(t,n)}}function Id(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;_o.set(n),i.uniformMatrix4fv(this.addr,!1,_o),mt(t,n)}}function Ud(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Nd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2iv(this.addr,e),mt(t,e)}}function Fd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3iv(this.addr,e),mt(t,e)}}function Od(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4iv(this.addr,e),mt(t,e)}}function zd(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Bd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2uiv(this.addr,e),mt(t,e)}}function Gd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3uiv(this.addr,e),mt(t,e)}}function Hd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4uiv(this.addr,e),mt(t,e)}}function Vd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?Tl:bl;t.setTexture2D(e||s,r)}function kd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Al,r)}function Wd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Cl,r)}function Xd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||wl,r)}function qd(i){switch(i){case 5126:return Ad;case 35664:return Cd;case 35665:return Rd;case 35666:return Pd;case 35674:return Ld;case 35675:return Dd;case 35676:return Id;case 5124:case 35670:return Ud;case 35667:case 35671:return Nd;case 35668:case 35672:return Fd;case 35669:case 35673:return Od;case 5125:return zd;case 36294:return Bd;case 36295:return Gd;case 36296:return Hd;case 35678:case 36198:case 36298:case 36306:case 35682:return Vd;case 35679:case 36299:case 36307:return kd;case 35680:case 36300:case 36308:case 36293:return Wd;case 36289:case 36303:case 36311:case 36292:return Xd}}function Yd(i,e){i.uniform1fv(this.addr,e)}function Zd(i,e){const t=yi(e,this.size,2);i.uniform2fv(this.addr,t)}function Jd(i,e){const t=yi(e,this.size,3);i.uniform3fv(this.addr,t)}function $d(i,e){const t=yi(e,this.size,4);i.uniform4fv(this.addr,t)}function Kd(i,e){const t=yi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function jd(i,e){const t=yi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Qd(i,e){const t=yi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ep(i,e){i.uniform1iv(this.addr,e)}function tp(i,e){i.uniform2iv(this.addr,e)}function np(i,e){i.uniform3iv(this.addr,e)}function ip(i,e){i.uniform4iv(this.addr,e)}function rp(i,e){i.uniform1uiv(this.addr,e)}function sp(i,e){i.uniform2uiv(this.addr,e)}function ap(i,e){i.uniform3uiv(this.addr,e)}function op(i,e){i.uniform4uiv(this.addr,e)}function lp(i,e,t){const n=this.cache,r=e.length,s=Br(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||bl,s[o])}function cp(i,e,t){const n=this.cache,r=e.length,s=Br(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Al,s[o])}function hp(i,e,t){const n=this.cache,r=e.length,s=Br(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Cl,s[o])}function up(i,e,t){const n=this.cache,r=e.length,s=Br(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||wl,s[o])}function fp(i){switch(i){case 5126:return Yd;case 35664:return Zd;case 35665:return Jd;case 35666:return $d;case 35674:return Kd;case 35675:return jd;case 35676:return Qd;case 5124:case 35670:return ep;case 35667:case 35671:return tp;case 35668:case 35672:return np;case 35669:case 35673:return ip;case 5125:return rp;case 36294:return sp;case 36295:return ap;case 36296:return op;case 35678:case 36198:case 36298:case 36306:case 35682:return lp;case 35679:case 36299:case 36307:return cp;case 35680:case 36300:case 36308:case 36293:return hp;case 36289:case 36303:case 36311:case 36292:return up}}class dp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=qd(t.type)}}class pp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fp(t.type)}}class mp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const _s=/(\w+)(\])?(\[|\.)?/g;function Mo(i,e){i.seq.push(e),i.map[e.id]=e}function gp(i,e,t){const n=i.name,r=n.length;for(_s.lastIndex=0;;){const s=_s.exec(n),o=_s.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Mo(t,c===void 0?new dp(a,i,e):new pp(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new mp(a),Mo(t,u)),t=u}}}class wr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);gp(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function So(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const vp=37297;let _p=0;function xp(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function yp(i){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(i);let n;switch(e===t?n="":e===Lr&&t===Pr?n="LinearDisplayP3ToLinearSRGB":e===Pr&&t===Lr&&(n="LinearSRGBToLinearDisplayP3"),i){case hn:case Or:return[n,"LinearTransferOETF"];case Mt:case Ws:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Eo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+xp(i.getShaderSource(e),o)}else return r}function Mp(i,e){const t=yp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Sp(i,e){let t;switch(e){case _c:t="Linear";break;case xc:t="Reinhard";break;case yc:t="OptimizedCineon";break;case Mc:t="ACESFilmic";break;case Ec:t="AgX";break;case Sc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ep(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(oi).join(`
`)}function bp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(oi).join(`
`)}function Tp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function wp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function oi(i){return i!==""}function bo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function To(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ap=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fs(i){return i.replace(Ap,Rp)}const Cp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Rp(i,e){let t=Ue[e];if(t===void 0){const n=Cp.get(e);if(n!==void 0)t=Ue[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Fs(t)}const Pp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wo(i){return i.replace(Pp,Lp)}function Lp(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ao(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Dp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===jo?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ql?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===on&&(e="SHADOWMAP_TYPE_VSM"),e}function Ip(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case pi:case mi:e="ENVMAP_TYPE_CUBE";break;case Fr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Up(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case mi:e="ENVMAP_MODE_REFRACTION";break}return e}function Np(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Qo:e="ENVMAP_BLENDING_MULTIPLY";break;case gc:e="ENVMAP_BLENDING_MIX";break;case vc:e="ENVMAP_BLENDING_ADD";break}return e}function Fp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Op(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Dp(t),c=Ip(t),h=Up(t),u=Np(t),f=Fp(t),d=t.isWebGL2?"":Ep(t),g=bp(t),_=Tp(s),m=r.createProgram();let p,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(oi).join(`
`),p.length>0&&(p+=`
`),x=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(oi).join(`
`),x.length>0&&(x+=`
`)):(p=[Ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(oi).join(`
`),x=[d,Ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yn?"#define TONE_MAPPING":"",t.toneMapping!==yn?Ue.tonemapping_pars_fragment:"",t.toneMapping!==yn?Sp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,Mp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(oi).join(`
`)),o=Fs(o),o=bo(o,t),o=To(o,t),a=Fs(a),a=bo(a,t),a=To(a,t),o=wo(o),a=wo(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const S=v+p+o,C=v+x+a,w=So(r,r.VERTEX_SHADER,S),A=So(r,r.FRAGMENT_SHADER,C);r.attachShader(m,w),r.attachShader(m,A),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function F(W){if(i.debug.checkShaderErrors){const ee=r.getProgramInfoLog(m).trim(),D=r.getShaderInfoLog(w).trim(),P=r.getShaderInfoLog(A).trim();let U=!0,X=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(U=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,w,A);else{const N=Eo(r,w,"vertex"),O=Eo(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+N+`
`+O)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(D===""||P==="")&&(X=!1);X&&(W.diagnostics={runnable:U,programLog:ee,vertexShader:{log:D,prefix:p},fragmentShader:{log:P,prefix:x}})}r.deleteShader(w),r.deleteShader(A),y=new wr(r,m),b=wp(r,m)}let y;this.getUniforms=function(){return y===void 0&&F(this),y};let b;this.getAttributes=function(){return b===void 0&&F(this),b};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(m,vp)),z},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_p++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let zp=0;class Bp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Gp(e),t.set(e,n)),n}}class Gp{constructor(e){this.id=zp++,this.code=e,this.usedTimes=0}}function Hp(i,e,t,n,r,s,o){const a=new pl,l=new Bp,c=[],h=r.isWebGL2,u=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function m(y,b,z,W,ee){const D=W.fog,P=ee.geometry,U=y.isMeshStandardMaterial?W.environment:null,X=(y.isMeshStandardMaterial?t:e).get(y.envMap||U),N=X&&X.mapping===Fr?X.image.height:null,O=g[y.type];y.precision!==null&&(d=r.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const Y=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,j=Y!==void 0?Y.length:0;let se=0;P.morphAttributes.position!==void 0&&(se=1),P.morphAttributes.normal!==void 0&&(se=2),P.morphAttributes.color!==void 0&&(se=3);let q,Z,oe,me;if(O){const At=Kt[O];q=At.vertexShader,Z=At.fragmentShader}else q=y.vertexShader,Z=y.fragmentShader,l.update(y),oe=l.getVertexShaderID(y),me=l.getFragmentShaderID(y);const de=i.getRenderTarget(),Pe=ee.isInstancedMesh===!0,De=ee.isBatchedMesh===!0,be=!!y.map,Xe=!!y.matcap,B=!!X,wt=!!y.aoMap,ye=!!y.lightMap,Ce=!!y.bumpMap,pe=!!y.normalMap,rt=!!y.displacementMap,Oe=!!y.emissiveMap,T=!!y.metalnessMap,M=!!y.roughnessMap,H=y.anisotropy>0,K=y.clearcoat>0,$=y.iridescence>0,Q=y.sheen>0,ge=y.transmission>0,ae=H&&!!y.anisotropyMap,he=K&&!!y.clearcoatMap,Ee=K&&!!y.clearcoatNormalMap,ze=K&&!!y.clearcoatRoughnessMap,J=$&&!!y.iridescenceMap,Ze=$&&!!y.iridescenceThicknessMap,ke=Q&&!!y.sheenColorMap,Ae=Q&&!!y.sheenRoughnessMap,xe=!!y.specularMap,ue=!!y.specularColorMap,Ie=!!y.specularIntensityMap,Ye=ge&&!!y.transmissionMap,ot=ge&&!!y.thicknessMap,Ge=!!y.gradientMap,te=!!y.alphaMap,L=y.alphaTest>0,ie=!!y.alphaHash,re=!!y.extensions,Te=!!P.attributes.uv1,Me=!!P.attributes.uv2,je=!!P.attributes.uv3;let Qe=yn;return y.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Qe=i.toneMapping),{isWebGL2:h,shaderID:O,shaderType:y.type,shaderName:y.name,vertexShader:q,fragmentShader:Z,defines:y.defines,customVertexShaderID:oe,customFragmentShaderID:me,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:De,instancing:Pe,instancingColor:Pe&&ee.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:de===null?i.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:hn,map:be,matcap:Xe,envMap:B,envMapMode:B&&X.mapping,envMapCubeUVHeight:N,aoMap:wt,lightMap:ye,bumpMap:Ce,normalMap:pe,displacementMap:f&&rt,emissiveMap:Oe,normalMapObjectSpace:pe&&y.normalMapType===Fc,normalMapTangentSpace:pe&&y.normalMapType===Nc,metalnessMap:T,roughnessMap:M,anisotropy:H,anisotropyMap:ae,clearcoat:K,clearcoatMap:he,clearcoatNormalMap:Ee,clearcoatRoughnessMap:ze,iridescence:$,iridescenceMap:J,iridescenceThicknessMap:Ze,sheen:Q,sheenColorMap:ke,sheenRoughnessMap:Ae,specularMap:xe,specularColorMap:ue,specularIntensityMap:Ie,transmission:ge,transmissionMap:Ye,thicknessMap:ot,gradientMap:Ge,opaque:y.transparent===!1&&y.blending===ui,alphaMap:te,alphaTest:L,alphaHash:ie,combine:y.combine,mapUv:be&&_(y.map.channel),aoMapUv:wt&&_(y.aoMap.channel),lightMapUv:ye&&_(y.lightMap.channel),bumpMapUv:Ce&&_(y.bumpMap.channel),normalMapUv:pe&&_(y.normalMap.channel),displacementMapUv:rt&&_(y.displacementMap.channel),emissiveMapUv:Oe&&_(y.emissiveMap.channel),metalnessMapUv:T&&_(y.metalnessMap.channel),roughnessMapUv:M&&_(y.roughnessMap.channel),anisotropyMapUv:ae&&_(y.anisotropyMap.channel),clearcoatMapUv:he&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ze&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(y.sheenRoughnessMap.channel),specularMapUv:xe&&_(y.specularMap.channel),specularColorMapUv:ue&&_(y.specularColorMap.channel),specularIntensityMapUv:Ie&&_(y.specularIntensityMap.channel),transmissionMapUv:Ye&&_(y.transmissionMap.channel),thicknessMapUv:ot&&_(y.thicknessMap.channel),alphaMapUv:te&&_(y.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(pe||H),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,vertexUv1s:Te,vertexUv2s:Me,vertexUv3s:je,pointsUvs:ee.isPoints===!0&&!!P.attributes.uv&&(be||te),fog:!!D,useFog:y.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ee.isSkinnedMesh===!0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:se,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:Qe,useLegacyLights:i._useLegacyLights,decodeVideoTexture:be&&y.map.isVideoTexture===!0&&$e.getTransfer(y.map.colorSpace)===nt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===xt,flipSided:y.side===Dt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:re&&y.extensions.derivatives===!0,extensionFragDepth:re&&y.extensions.fragDepth===!0,extensionDrawBuffers:re&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const z in y.defines)b.push(z),b.push(y.defines[z]);return y.isRawShaderMaterial===!1&&(x(b,y),v(b,y),b.push(i.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function x(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function v(y,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),y.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function S(y){const b=g[y.type];let z;if(b){const W=Kt[b];z=Sh.clone(W.uniforms)}else z=y.uniforms;return z}function C(y,b){let z;for(let W=0,ee=c.length;W<ee;W++){const D=c[W];if(D.cacheKey===b){z=D,++z.usedTimes;break}}return z===void 0&&(z=new Op(i,b,y,s),c.push(z)),z}function w(y){if(--y.usedTimes===0){const b=c.indexOf(y);c[b]=c[c.length-1],c.pop(),y.destroy()}}function A(y){l.remove(y)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:F}}function Vp(){let i=new WeakMap;function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function t(s){i.delete(s)}function n(s,o,a){i.get(s)[o]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function kp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Co(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ro(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(u,f,d,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(u,f){t.length>1&&t.sort(u||kp),n.length>1&&n.sort(f||Co),r.length>1&&r.sort(f||Co)}function h(){for(let u=e,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Wp(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Ro,i.set(n,[o])):r>=s.length?(o=new Ro,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Xp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new _e};break;case"SpotLight":t={position:new R,direction:new R,color:new _e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new _e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new _e,groundColor:new _e};break;case"RectAreaLight":t={color:new _e,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function qp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Yp=0;function Zp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Jp(i,e){const t=new Xp,n=qp(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new R);const s=new R,o=new tt,a=new tt;function l(h,u){let f=0,d=0,g=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let _=0,m=0,p=0,x=0,v=0,S=0,C=0,w=0,A=0,F=0,y=0;h.sort(Zp);const b=u===!0?Math.PI:1;for(let W=0,ee=h.length;W<ee;W++){const D=h[W],P=D.color,U=D.intensity,X=D.distance,N=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=P.r*U*b,d+=P.g*U*b,g+=P.b*U*b;else if(D.isLightProbe){for(let O=0;O<9;O++)r.probe[O].addScaledVector(D.sh.coefficients[O],U);y++}else if(D.isDirectionalLight){const O=t.get(D);if(O.color.copy(D.color).multiplyScalar(D.intensity*b),D.castShadow){const Y=D.shadow,j=n.get(D);j.shadowBias=Y.bias,j.shadowNormalBias=Y.normalBias,j.shadowRadius=Y.radius,j.shadowMapSize=Y.mapSize,r.directionalShadow[_]=j,r.directionalShadowMap[_]=N,r.directionalShadowMatrix[_]=D.shadow.matrix,S++}r.directional[_]=O,_++}else if(D.isSpotLight){const O=t.get(D);O.position.setFromMatrixPosition(D.matrixWorld),O.color.copy(P).multiplyScalar(U*b),O.distance=X,O.coneCos=Math.cos(D.angle),O.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),O.decay=D.decay,r.spot[p]=O;const Y=D.shadow;if(D.map&&(r.spotLightMap[A]=D.map,A++,Y.updateMatrices(D),D.castShadow&&F++),r.spotLightMatrix[p]=Y.matrix,D.castShadow){const j=n.get(D);j.shadowBias=Y.bias,j.shadowNormalBias=Y.normalBias,j.shadowRadius=Y.radius,j.shadowMapSize=Y.mapSize,r.spotShadow[p]=j,r.spotShadowMap[p]=N,w++}p++}else if(D.isRectAreaLight){const O=t.get(D);O.color.copy(P).multiplyScalar(U),O.halfWidth.set(D.width*.5,0,0),O.halfHeight.set(0,D.height*.5,0),r.rectArea[x]=O,x++}else if(D.isPointLight){const O=t.get(D);if(O.color.copy(D.color).multiplyScalar(D.intensity*b),O.distance=D.distance,O.decay=D.decay,D.castShadow){const Y=D.shadow,j=n.get(D);j.shadowBias=Y.bias,j.shadowNormalBias=Y.normalBias,j.shadowRadius=Y.radius,j.shadowMapSize=Y.mapSize,j.shadowCameraNear=Y.camera.near,j.shadowCameraFar=Y.camera.far,r.pointShadow[m]=j,r.pointShadowMap[m]=N,r.pointShadowMatrix[m]=D.shadow.matrix,C++}r.point[m]=O,m++}else if(D.isHemisphereLight){const O=t.get(D);O.skyColor.copy(D.color).multiplyScalar(U*b),O.groundColor.copy(D.groundColor).multiplyScalar(U*b),r.hemi[v]=O,v++}}x>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_FLOAT_1,r.rectAreaLTC2=ne.LTC_FLOAT_2):(r.rectAreaLTC1=ne.LTC_HALF_1,r.rectAreaLTC2=ne.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_FLOAT_1,r.rectAreaLTC2=ne.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_HALF_1,r.rectAreaLTC2=ne.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=d,r.ambient[2]=g;const z=r.hash;(z.directionalLength!==_||z.pointLength!==m||z.spotLength!==p||z.rectAreaLength!==x||z.hemiLength!==v||z.numDirectionalShadows!==S||z.numPointShadows!==C||z.numSpotShadows!==w||z.numSpotMaps!==A||z.numLightProbes!==y)&&(r.directional.length=_,r.spot.length=p,r.rectArea.length=x,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=w+A-F,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=F,r.numLightProbes=y,z.directionalLength=_,z.pointLength=m,z.spotLength=p,z.rectAreaLength=x,z.hemiLength=v,z.numDirectionalShadows=S,z.numPointShadows=C,z.numSpotShadows=w,z.numSpotMaps=A,z.numLightProbes=y,r.version=Yp++)}function c(h,u){let f=0,d=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let x=0,v=h.length;x<v;x++){const S=h[x];if(S.isDirectionalLight){const C=r.directional[f];C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),f++}else if(S.isSpotLight){const C=r.spot[g];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),g++}else if(S.isRectAreaLight){const C=r.rectArea[_];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(S.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const C=r.point[d];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const C=r.hemi[m];C.direction.setFromMatrixPosition(S.matrixWorld),C.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:r}}function Po(i,e){const t=new Jp(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function o(u){n.push(u)}function a(u){r.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function $p(i,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Po(i,e),t.set(s,[l])):o>=a.length?(l=new Po(i,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class Kp extends xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ic,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class jp extends xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Qp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,em=`uniform sampler2D shadow_pass;
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
}`;function tm(i,e,t){let n=new Ys;const r=new ce,s=new ce,o=new it,a=new Kp({depthPacking:Uc}),l=new jp,c={},h=t.maxTextureSize,u={[cn]:Dt,[Dt]:cn,[xt]:xt},f=new ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:Qp,fragmentShader:em}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ke;g.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new We(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jo;let p=this.type;this.render=function(w,A,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const y=i.getRenderTarget(),b=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),W=i.state;W.setBlending(xn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const ee=p!==on&&this.type===on,D=p===on&&this.type!==on;for(let P=0,U=w.length;P<U;P++){const X=w[P],N=X.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const O=N.getFrameExtents();if(r.multiply(O),s.copy(N.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/O.x),r.x=s.x*O.x,N.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/O.y),r.y=s.y*O.y,N.mapSize.y=s.y)),N.map===null||ee===!0||D===!0){const j=this.type!==on?{minFilter:yt,magFilter:yt}:{};N.map!==null&&N.map.dispose(),N.map=new Fn(r.x,r.y,j),N.map.texture.name=X.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();const Y=N.getViewportCount();for(let j=0;j<Y;j++){const se=N.getViewport(j);o.set(s.x*se.x,s.y*se.y,s.x*se.z,s.y*se.w),W.viewport(o),N.updateMatrices(X,j),n=N.getFrustum(),S(A,F,N.camera,X,this.type)}N.isPointLightShadow!==!0&&this.type===on&&x(N,F),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,b,z)};function x(w,A){const F=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Fn(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,F,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,F,d,_,null)}function v(w,A,F,y){let b=null;const z=F.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(z!==void 0)b=z;else if(b=F.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const W=b.uuid,ee=A.uuid;let D=c[W];D===void 0&&(D={},c[W]=D);let P=D[ee];P===void 0&&(P=b.clone(),D[ee]=P,A.addEventListener("dispose",C)),b=P}if(b.visible=A.visible,b.wireframe=A.wireframe,y===on?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,F.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const W=i.properties.get(b);W.light=F}return b}function S(w,A,F,y,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===on)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,w.matrixWorld);const ee=e.update(w),D=w.material;if(Array.isArray(D)){const P=ee.groups;for(let U=0,X=P.length;U<X;U++){const N=P[U],O=D[N.materialIndex];if(O&&O.visible){const Y=v(w,O,y,b);w.onBeforeShadow(i,w,A,F,ee,Y,N),i.renderBufferDirect(F,null,ee,Y,w,N),w.onAfterShadow(i,w,A,F,ee,Y,N)}}}else if(D.visible){const P=v(w,D,y,b);w.onBeforeShadow(i,w,A,F,ee,P,null),i.renderBufferDirect(F,null,ee,P,w,null),w.onAfterShadow(i,w,A,F,ee,P,null)}}const W=w.children;for(let ee=0,D=W.length;ee<D;ee++)S(W[ee],A,F,y,b)}function C(w){w.target.removeEventListener("dispose",C);for(const F in c){const y=c[F],b=w.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}function nm(i,e,t){const n=t.isWebGL2;function r(){let L=!1;const ie=new it;let re=null;const Te=new it(0,0,0,0);return{setMask:function(Me){re!==Me&&!L&&(i.colorMask(Me,Me,Me,Me),re=Me)},setLocked:function(Me){L=Me},setClear:function(Me,je,Qe,gt,At){At===!0&&(Me*=gt,je*=gt,Qe*=gt),ie.set(Me,je,Qe,gt),Te.equals(ie)===!1&&(i.clearColor(Me,je,Qe,gt),Te.copy(ie))},reset:function(){L=!1,re=null,Te.set(-1,0,0,0)}}}function s(){let L=!1,ie=null,re=null,Te=null;return{setTest:function(Me){Me?De(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(Me){ie!==Me&&!L&&(i.depthMask(Me),ie=Me)},setFunc:function(Me){if(re!==Me){switch(Me){case cc:i.depthFunc(i.NEVER);break;case hc:i.depthFunc(i.ALWAYS);break;case uc:i.depthFunc(i.LESS);break;case Cr:i.depthFunc(i.LEQUAL);break;case fc:i.depthFunc(i.EQUAL);break;case dc:i.depthFunc(i.GEQUAL);break;case pc:i.depthFunc(i.GREATER);break;case mc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=Me}},setLocked:function(Me){L=Me},setClear:function(Me){Te!==Me&&(i.clearDepth(Me),Te=Me)},reset:function(){L=!1,ie=null,re=null,Te=null}}}function o(){let L=!1,ie=null,re=null,Te=null,Me=null,je=null,Qe=null,gt=null,At=null;return{setTest:function(et){L||(et?De(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(et){ie!==et&&!L&&(i.stencilMask(et),ie=et)},setFunc:function(et,Ct,Jt){(re!==et||Te!==Ct||Me!==Jt)&&(i.stencilFunc(et,Ct,Jt),re=et,Te=Ct,Me=Jt)},setOp:function(et,Ct,Jt){(je!==et||Qe!==Ct||gt!==Jt)&&(i.stencilOp(et,Ct,Jt),je=et,Qe=Ct,gt=Jt)},setLocked:function(et){L=et},setClear:function(et){At!==et&&(i.clearStencil(et),At=et)},reset:function(){L=!1,ie=null,re=null,Te=null,Me=null,je=null,Qe=null,gt=null,At=null}}}const a=new r,l=new s,c=new o,h=new WeakMap,u=new WeakMap;let f={},d={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,C=null,w=null,A=null,F=null,y=new _e(0,0,0),b=0,z=!1,W=null,ee=null,D=null,P=null,U=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,O=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(Y)[1]),N=O>=1):Y.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),N=O>=2);let j=null,se={};const q=i.getParameter(i.SCISSOR_BOX),Z=i.getParameter(i.VIEWPORT),oe=new it().fromArray(q),me=new it().fromArray(Z);function de(L,ie,re,Te){const Me=new Uint8Array(4),je=i.createTexture();i.bindTexture(L,je),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Qe=0;Qe<re;Qe++)n&&(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)?i.texImage3D(ie,0,i.RGBA,1,1,Te,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(ie+Qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return je}const Pe={};Pe[i.TEXTURE_2D]=de(i.TEXTURE_2D,i.TEXTURE_2D,1),Pe[i.TEXTURE_CUBE_MAP]=de(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Pe[i.TEXTURE_2D_ARRAY]=de(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Pe[i.TEXTURE_3D]=de(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),De(i.DEPTH_TEST),l.setFunc(Cr),Oe(!1),T(ha),De(i.CULL_FACE),pe(xn);function De(L){f[L]!==!0&&(i.enable(L),f[L]=!0)}function be(L){f[L]!==!1&&(i.disable(L),f[L]=!1)}function Xe(L,ie){return d[L]!==ie?(i.bindFramebuffer(L,ie),d[L]=ie,n&&(L===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ie),L===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ie)),!0):!1}function B(L,ie){let re=_,Te=!1;if(L)if(re=g.get(ie),re===void 0&&(re=[],g.set(ie,re)),L.isWebGLMultipleRenderTargets){const Me=L.texture;if(re.length!==Me.length||re[0]!==i.COLOR_ATTACHMENT0){for(let je=0,Qe=Me.length;je<Qe;je++)re[je]=i.COLOR_ATTACHMENT0+je;re.length=Me.length,Te=!0}}else re[0]!==i.COLOR_ATTACHMENT0&&(re[0]=i.COLOR_ATTACHMENT0,Te=!0);else re[0]!==i.BACK&&(re[0]=i.BACK,Te=!0);Te&&(t.isWebGL2?i.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function wt(L){return m!==L?(i.useProgram(L),m=L,!0):!1}const ye={[Ln]:i.FUNC_ADD,[Zl]:i.FUNC_SUBTRACT,[Jl]:i.FUNC_REVERSE_SUBTRACT};if(n)ye[da]=i.MIN,ye[pa]=i.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(ye[da]=L.MIN_EXT,ye[pa]=L.MAX_EXT)}const Ce={[$l]:i.ZERO,[Kl]:i.ONE,[jl]:i.SRC_COLOR,[Cs]:i.SRC_ALPHA,[rc]:i.SRC_ALPHA_SATURATE,[nc]:i.DST_COLOR,[ec]:i.DST_ALPHA,[Ql]:i.ONE_MINUS_SRC_COLOR,[Rs]:i.ONE_MINUS_SRC_ALPHA,[ic]:i.ONE_MINUS_DST_COLOR,[tc]:i.ONE_MINUS_DST_ALPHA,[sc]:i.CONSTANT_COLOR,[ac]:i.ONE_MINUS_CONSTANT_COLOR,[oc]:i.CONSTANT_ALPHA,[lc]:i.ONE_MINUS_CONSTANT_ALPHA};function pe(L,ie,re,Te,Me,je,Qe,gt,At,et){if(L===xn){p===!0&&(be(i.BLEND),p=!1);return}if(p===!1&&(De(i.BLEND),p=!0),L!==Yl){if(L!==x||et!==z){if((v!==Ln||w!==Ln)&&(i.blendEquation(i.FUNC_ADD),v=Ln,w=Ln),et)switch(L){case ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qe:i.blendFunc(i.ONE,i.ONE);break;case ua:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case fa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qe:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ua:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case fa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}S=null,C=null,A=null,F=null,y.set(0,0,0),b=0,x=L,z=et}return}Me=Me||ie,je=je||re,Qe=Qe||Te,(ie!==v||Me!==w)&&(i.blendEquationSeparate(ye[ie],ye[Me]),v=ie,w=Me),(re!==S||Te!==C||je!==A||Qe!==F)&&(i.blendFuncSeparate(Ce[re],Ce[Te],Ce[je],Ce[Qe]),S=re,C=Te,A=je,F=Qe),(gt.equals(y)===!1||At!==b)&&(i.blendColor(gt.r,gt.g,gt.b,At),y.copy(gt),b=At),x=L,z=!1}function rt(L,ie){L.side===xt?be(i.CULL_FACE):De(i.CULL_FACE);let re=L.side===Dt;ie&&(re=!re),Oe(re),L.blending===ui&&L.transparent===!1?pe(xn):pe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),a.setMask(L.colorWrite);const Te=L.stencilWrite;c.setTest(Te),Te&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),H(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?De(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(L){W!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),W=L)}function T(L){L!==Wl?(De(i.CULL_FACE),L!==ee&&(L===ha?i.cullFace(i.BACK):L===Xl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),ee=L}function M(L){L!==D&&(N&&i.lineWidth(L),D=L)}function H(L,ie,re){L?(De(i.POLYGON_OFFSET_FILL),(P!==ie||U!==re)&&(i.polygonOffset(ie,re),P=ie,U=re)):be(i.POLYGON_OFFSET_FILL)}function K(L){L?De(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function $(L){L===void 0&&(L=i.TEXTURE0+X-1),j!==L&&(i.activeTexture(L),j=L)}function Q(L,ie,re){re===void 0&&(j===null?re=i.TEXTURE0+X-1:re=j);let Te=se[re];Te===void 0&&(Te={type:void 0,texture:void 0},se[re]=Te),(Te.type!==L||Te.texture!==ie)&&(j!==re&&(i.activeTexture(re),j=re),i.bindTexture(L,ie||Pe[L]),Te.type=L,Te.texture=ie)}function ge(){const L=se[j];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ae(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ze(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ze(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ke(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xe(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ie(L){oe.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),oe.copy(L))}function Ye(L){me.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),me.copy(L))}function ot(L,ie){let re=u.get(ie);re===void 0&&(re=new WeakMap,u.set(ie,re));let Te=re.get(L);Te===void 0&&(Te=i.getUniformBlockIndex(ie,L.name),re.set(L,Te))}function Ge(L,ie){const Te=u.get(ie).get(L);h.get(ie)!==Te&&(i.uniformBlockBinding(ie,Te,L.__bindingPointIndex),h.set(ie,Te))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},j=null,se={},d={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,C=null,w=null,A=null,F=null,y=new _e(0,0,0),b=0,z=!1,W=null,ee=null,D=null,P=null,U=null,oe.set(0,0,i.canvas.width,i.canvas.height),me.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:De,disable:be,bindFramebuffer:Xe,drawBuffers:B,useProgram:wt,setBlending:pe,setMaterial:rt,setFlipSided:Oe,setCullFace:T,setLineWidth:M,setPolygonOffset:H,setScissorTest:K,activeTexture:$,bindTexture:Q,unbindTexture:ge,compressedTexImage2D:ae,compressedTexImage3D:he,texImage2D:xe,texImage3D:ue,updateUBOMapping:ot,uniformBlockBinding:Ge,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:Ee,texSubImage3D:ze,compressedTexSubImage2D:J,compressedTexSubImage3D:Ze,scissor:Ie,viewport:Ye,reset:te}}function im(i,e,t,n,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,M){return d?new OffscreenCanvas(T,M):Gi("canvas")}function _(T,M,H,K){let $=1;if((T.width>K||T.height>K)&&($=K/Math.max(T.width,T.height)),$<1||M===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const Q=M?Ir:Math.floor,ge=Q($*T.width),ae=Q($*T.height);u===void 0&&(u=g(ge,ae));const he=H?g(ge,ae):u;return he.width=ge,he.height=ae,he.getContext("2d").drawImage(T,0,0,ge,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+ge+"x"+ae+")."),he}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return Ns(T.width)&&Ns(T.height)}function p(T){return a?!1:T.wrapS!==Yt||T.wrapT!==Yt||T.minFilter!==yt&&T.minFilter!==It}function x(T,M){return T.generateMipmaps&&M&&T.minFilter!==yt&&T.minFilter!==It}function v(T){i.generateMipmap(T)}function S(T,M,H,K,$=!1){if(a===!1)return M;if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Q=M;if(M===i.RED&&(H===i.FLOAT&&(Q=i.R32F),H===i.HALF_FLOAT&&(Q=i.R16F),H===i.UNSIGNED_BYTE&&(Q=i.R8)),M===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(Q=i.R8UI),H===i.UNSIGNED_SHORT&&(Q=i.R16UI),H===i.UNSIGNED_INT&&(Q=i.R32UI),H===i.BYTE&&(Q=i.R8I),H===i.SHORT&&(Q=i.R16I),H===i.INT&&(Q=i.R32I)),M===i.RG&&(H===i.FLOAT&&(Q=i.RG32F),H===i.HALF_FLOAT&&(Q=i.RG16F),H===i.UNSIGNED_BYTE&&(Q=i.RG8)),M===i.RGBA){const ge=$?Rr:$e.getTransfer(K);H===i.FLOAT&&(Q=i.RGBA32F),H===i.HALF_FLOAT&&(Q=i.RGBA16F),H===i.UNSIGNED_BYTE&&(Q=ge===nt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function C(T,M,H){return x(T,H)===!0||T.isFramebufferTexture&&T.minFilter!==yt&&T.minFilter!==It?Math.log2(Math.max(M.width,M.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?M.mipmaps.length:1}function w(T){return T===yt||T===ma||T===Xr?i.NEAREST:i.LINEAR}function A(T){const M=T.target;M.removeEventListener("dispose",A),y(M),M.isVideoTexture&&h.delete(M)}function F(T){const M=T.target;M.removeEventListener("dispose",F),z(M)}function y(T){const M=n.get(T);if(M.__webglInit===void 0)return;const H=T.source,K=f.get(H);if(K){const $=K[M.__cacheKey];$.usedTimes--,$.usedTimes===0&&b(T),Object.keys(K).length===0&&f.delete(H)}n.remove(T)}function b(T){const M=n.get(T);i.deleteTexture(M.__webglTexture);const H=T.source,K=f.get(H);delete K[M.__cacheKey],o.memory.textures--}function z(T){const M=T.texture,H=n.get(T),K=n.get(M);if(K.__webglTexture!==void 0&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(H.__webglFramebuffer[$]))for(let Q=0;Q<H.__webglFramebuffer[$].length;Q++)i.deleteFramebuffer(H.__webglFramebuffer[$][Q]);else i.deleteFramebuffer(H.__webglFramebuffer[$]);H.__webglDepthbuffer&&i.deleteRenderbuffer(H.__webglDepthbuffer[$])}else{if(Array.isArray(H.__webglFramebuffer))for(let $=0;$<H.__webglFramebuffer.length;$++)i.deleteFramebuffer(H.__webglFramebuffer[$]);else i.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&i.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&i.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let $=0;$<H.__webglColorRenderbuffer.length;$++)H.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(H.__webglColorRenderbuffer[$]);H.__webglDepthRenderbuffer&&i.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let $=0,Q=M.length;$<Q;$++){const ge=n.get(M[$]);ge.__webglTexture&&(i.deleteTexture(ge.__webglTexture),o.memory.textures--),n.remove(M[$])}n.remove(M),n.remove(T)}let W=0;function ee(){W=0}function D(){const T=W;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),W+=1,T}function P(T){const M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function U(T,M){const H=n.get(T);if(T.isVideoTexture&&rt(T),T.isRenderTargetTexture===!1&&T.version>0&&H.__version!==T.version){const K=T.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(H,T,M);return}}t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+M)}function X(T,M){const H=n.get(T);if(T.version>0&&H.__version!==T.version){oe(H,T,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+M)}function N(T,M){const H=n.get(T);if(T.version>0&&H.__version!==T.version){oe(H,T,M);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+M)}function O(T,M){const H=n.get(T);if(T.version>0&&H.__version!==T.version){me(H,T,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+M)}const Y={[Ds]:i.REPEAT,[Yt]:i.CLAMP_TO_EDGE,[Is]:i.MIRRORED_REPEAT},j={[yt]:i.NEAREST,[ma]:i.NEAREST_MIPMAP_NEAREST,[Xr]:i.NEAREST_MIPMAP_LINEAR,[It]:i.LINEAR,[bc]:i.LINEAR_MIPMAP_NEAREST,[Oi]:i.LINEAR_MIPMAP_LINEAR},se={[Oc]:i.NEVER,[kc]:i.ALWAYS,[zc]:i.LESS,[cl]:i.LEQUAL,[Bc]:i.EQUAL,[Vc]:i.GEQUAL,[Gc]:i.GREATER,[Hc]:i.NOTEQUAL};function q(T,M,H){if(H?(i.texParameteri(T,i.TEXTURE_WRAP_S,Y[M.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Y[M.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Y[M.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,j[M.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,j[M.minFilter])):(i.texParameteri(T,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(T,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(M.wrapS!==Yt||M.wrapT!==Yt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(T,i.TEXTURE_MAG_FILTER,w(M.magFilter)),i.texParameteri(T,i.TEXTURE_MIN_FILTER,w(M.minFilter)),M.minFilter!==yt&&M.minFilter!==It&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,se[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const K=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===yt||M.minFilter!==Xr&&M.minFilter!==Oi||M.type===vn&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===zi&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(i.texParameterf(T,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function Z(T,M){let H=!1;T.__webglInit===void 0&&(T.__webglInit=!0,M.addEventListener("dispose",A));const K=M.source;let $=f.get(K);$===void 0&&($={},f.set(K,$));const Q=P(M);if(Q!==T.__cacheKey){$[Q]===void 0&&($[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),$[Q].usedTimes++;const ge=$[T.__cacheKey];ge!==void 0&&($[T.__cacheKey].usedTimes--,ge.usedTimes===0&&b(M)),T.__cacheKey=Q,T.__webglTexture=$[Q].texture}return H}function oe(T,M,H){let K=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(K=i.TEXTURE_3D);const $=Z(T,M),Q=M.source;t.bindTexture(K,T.__webglTexture,i.TEXTURE0+H);const ge=n.get(Q);if(Q.version!==ge.__version||$===!0){t.activeTexture(i.TEXTURE0+H);const ae=$e.getPrimaries($e.workingColorSpace),he=M.colorSpace===kt?null:$e.getPrimaries(M.colorSpace),Ee=M.colorSpace===kt||ae===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const ze=p(M)&&m(M.image)===!1;let J=_(M.image,ze,!1,r.maxTextureSize);J=Oe(M,J);const Ze=m(J)||a,ke=s.convert(M.format,M.colorSpace);let Ae=s.convert(M.type),xe=S(M.internalFormat,ke,Ae,M.colorSpace,M.isVideoTexture);q(K,M,Ze);let ue;const Ie=M.mipmaps,Ye=a&&M.isVideoTexture!==!0&&xe!==ol,ot=ge.__version===void 0||$===!0,Ge=C(M,J,Ze);if(M.isDepthTexture)xe=i.DEPTH_COMPONENT,a?M.type===vn?xe=i.DEPTH_COMPONENT32F:M.type===gn?xe=i.DEPTH_COMPONENT24:M.type===In?xe=i.DEPTH24_STENCIL8:xe=i.DEPTH_COMPONENT16:M.type===vn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Un&&xe===i.DEPTH_COMPONENT&&M.type!==ks&&M.type!==gn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=gn,Ae=s.convert(M.type)),M.format===gi&&xe===i.DEPTH_COMPONENT&&(xe=i.DEPTH_STENCIL,M.type!==In&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=In,Ae=s.convert(M.type))),ot&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,xe,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,xe,J.width,J.height,0,ke,Ae,null));else if(M.isDataTexture)if(Ie.length>0&&Ze){Ye&&ot&&t.texStorage2D(i.TEXTURE_2D,Ge,xe,Ie[0].width,Ie[0].height);for(let te=0,L=Ie.length;te<L;te++)ue=Ie[te],Ye?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,ke,Ae,ue.data):t.texImage2D(i.TEXTURE_2D,te,xe,ue.width,ue.height,0,ke,Ae,ue.data);M.generateMipmaps=!1}else Ye?(ot&&t.texStorage2D(i.TEXTURE_2D,Ge,xe,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,ke,Ae,J.data)):t.texImage2D(i.TEXTURE_2D,0,xe,J.width,J.height,0,ke,Ae,J.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ye&&ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,xe,Ie[0].width,Ie[0].height,J.depth);for(let te=0,L=Ie.length;te<L;te++)ue=Ie[te],M.format!==Zt?ke!==null?Ye?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,J.depth,ke,ue.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,xe,ue.width,ue.height,J.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,J.depth,ke,Ae,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,xe,ue.width,ue.height,J.depth,0,ke,Ae,ue.data)}else{Ye&&ot&&t.texStorage2D(i.TEXTURE_2D,Ge,xe,Ie[0].width,Ie[0].height);for(let te=0,L=Ie.length;te<L;te++)ue=Ie[te],M.format!==Zt?ke!==null?Ye?t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,ke,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,te,xe,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,ke,Ae,ue.data):t.texImage2D(i.TEXTURE_2D,te,xe,ue.width,ue.height,0,ke,Ae,ue.data)}else if(M.isDataArrayTexture)Ye?(ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,xe,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ke,Ae,J.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,J.width,J.height,J.depth,0,ke,Ae,J.data);else if(M.isData3DTexture)Ye?(ot&&t.texStorage3D(i.TEXTURE_3D,Ge,xe,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ke,Ae,J.data)):t.texImage3D(i.TEXTURE_3D,0,xe,J.width,J.height,J.depth,0,ke,Ae,J.data);else if(M.isFramebufferTexture){if(ot)if(Ye)t.texStorage2D(i.TEXTURE_2D,Ge,xe,J.width,J.height);else{let te=J.width,L=J.height;for(let ie=0;ie<Ge;ie++)t.texImage2D(i.TEXTURE_2D,ie,xe,te,L,0,ke,Ae,null),te>>=1,L>>=1}}else if(Ie.length>0&&Ze){Ye&&ot&&t.texStorage2D(i.TEXTURE_2D,Ge,xe,Ie[0].width,Ie[0].height);for(let te=0,L=Ie.length;te<L;te++)ue=Ie[te],Ye?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ke,Ae,ue):t.texImage2D(i.TEXTURE_2D,te,xe,ke,Ae,ue);M.generateMipmaps=!1}else Ye?(ot&&t.texStorage2D(i.TEXTURE_2D,Ge,xe,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ke,Ae,J)):t.texImage2D(i.TEXTURE_2D,0,xe,ke,Ae,J);x(M,Ze)&&v(K),ge.__version=Q.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function me(T,M,H){if(M.image.length!==6)return;const K=Z(T,M),$=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+H);const Q=n.get($);if($.version!==Q.__version||K===!0){t.activeTexture(i.TEXTURE0+H);const ge=$e.getPrimaries($e.workingColorSpace),ae=M.colorSpace===kt?null:$e.getPrimaries(M.colorSpace),he=M.colorSpace===kt||ge===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ee=M.isCompressedTexture||M.image[0].isCompressedTexture,ze=M.image[0]&&M.image[0].isDataTexture,J=[];for(let te=0;te<6;te++)!Ee&&!ze?J[te]=_(M.image[te],!1,!0,r.maxCubemapSize):J[te]=ze?M.image[te].image:M.image[te],J[te]=Oe(M,J[te]);const Ze=J[0],ke=m(Ze)||a,Ae=s.convert(M.format,M.colorSpace),xe=s.convert(M.type),ue=S(M.internalFormat,Ae,xe,M.colorSpace),Ie=a&&M.isVideoTexture!==!0,Ye=Q.__version===void 0||K===!0;let ot=C(M,Ze,ke);q(i.TEXTURE_CUBE_MAP,M,ke);let Ge;if(Ee){Ie&&Ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,ue,Ze.width,Ze.height);for(let te=0;te<6;te++){Ge=J[te].mipmaps;for(let L=0;L<Ge.length;L++){const ie=Ge[L];M.format!==Zt?Ae!==null?Ie?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,0,0,ie.width,ie.height,Ae,ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,ue,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,0,0,ie.width,ie.height,Ae,xe,ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,ue,ie.width,ie.height,0,Ae,xe,ie.data)}}}else{Ge=M.mipmaps,Ie&&Ye&&(Ge.length>0&&ot++,t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,ue,J[0].width,J[0].height));for(let te=0;te<6;te++)if(ze){Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,J[te].width,J[te].height,Ae,xe,J[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ue,J[te].width,J[te].height,0,Ae,xe,J[te].data);for(let L=0;L<Ge.length;L++){const re=Ge[L].image[te].image;Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,0,0,re.width,re.height,Ae,xe,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,ue,re.width,re.height,0,Ae,xe,re.data)}}else{Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ae,xe,J[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ue,Ae,xe,J[te]);for(let L=0;L<Ge.length;L++){const ie=Ge[L];Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,0,0,Ae,xe,ie.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,ue,Ae,xe,ie.image[te])}}}x(M,ke)&&v(i.TEXTURE_CUBE_MAP),Q.__version=$.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function de(T,M,H,K,$,Q){const ge=s.convert(H.format,H.colorSpace),ae=s.convert(H.type),he=S(H.internalFormat,ge,ae,H.colorSpace);if(!n.get(M).__hasExternalTextures){const ze=Math.max(1,M.width>>Q),J=Math.max(1,M.height>>Q);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,Q,he,ze,J,M.depth,0,ge,ae,null):t.texImage2D($,Q,he,ze,J,0,ge,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),pe(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,$,n.get(H).__webglTexture,0,Ce(M)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,$,n.get(H).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(T,M,H){if(i.bindRenderbuffer(i.RENDERBUFFER,T),M.depthBuffer&&!M.stencilBuffer){let K=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(H||pe(M)){const $=M.depthTexture;$&&$.isDepthTexture&&($.type===vn?K=i.DEPTH_COMPONENT32F:$.type===gn&&(K=i.DEPTH_COMPONENT24));const Q=Ce(M);pe(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,K,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,K,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,K,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,T)}else if(M.depthBuffer&&M.stencilBuffer){const K=Ce(M);H&&pe(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,M.width,M.height):pe(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,T)}else{const K=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let $=0;$<K.length;$++){const Q=K[$],ge=s.convert(Q.format,Q.colorSpace),ae=s.convert(Q.type),he=S(Q.internalFormat,ge,ae,Q.colorSpace),Ee=Ce(M);H&&pe(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,he,M.width,M.height):pe(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee,he,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,he,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(T,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),U(M.depthTexture,0);const K=n.get(M.depthTexture).__webglTexture,$=Ce(M);if(M.depthTexture.format===Un)pe(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(M.depthTexture.format===gi)pe(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function be(T){const M=n.get(T),H=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");De(M.__webglFramebuffer,T)}else if(H){M.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[K]),M.__webglDepthbuffer[K]=i.createRenderbuffer(),Pe(M.__webglDepthbuffer[K],T,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),Pe(M.__webglDepthbuffer,T,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(T,M,H){const K=n.get(T);M!==void 0&&de(K.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&be(T)}function B(T){const M=T.texture,H=n.get(T),K=n.get(M);T.addEventListener("dispose",F),T.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=M.version,o.memory.textures++);const $=T.isWebGLCubeRenderTarget===!0,Q=T.isWebGLMultipleRenderTargets===!0,ge=m(T)||a;if($){H.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[ae]=[];for(let he=0;he<M.mipmaps.length;he++)H.__webglFramebuffer[ae][he]=i.createFramebuffer()}else H.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let ae=0;ae<M.mipmaps.length;ae++)H.__webglFramebuffer[ae]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Q)if(r.drawBuffers){const ae=T.texture;for(let he=0,Ee=ae.length;he<Ee;he++){const ze=n.get(ae[he]);ze.__webglTexture===void 0&&(ze.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&T.samples>0&&pe(T)===!1){const ae=Q?M:[M];H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let he=0;he<ae.length;he++){const Ee=ae[he];H.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[he]);const ze=s.convert(Ee.format,Ee.colorSpace),J=s.convert(Ee.type),Ze=S(Ee.internalFormat,ze,J,Ee.colorSpace,T.isXRRenderTarget===!0),ke=Ce(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,Ze,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,H.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Pe(H.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),q(i.TEXTURE_CUBE_MAP,M,ge);for(let ae=0;ae<6;ae++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)de(H.__webglFramebuffer[ae][he],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,he);else de(H.__webglFramebuffer[ae],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);x(M,ge)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const ae=T.texture;for(let he=0,Ee=ae.length;he<Ee;he++){const ze=ae[he],J=n.get(ze);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),q(i.TEXTURE_2D,ze,ge),de(H.__webglFramebuffer,T,ze,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,0),x(ze,ge)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(a?ae=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ae,K.__webglTexture),q(ae,M,ge),a&&M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)de(H.__webglFramebuffer[he],T,M,i.COLOR_ATTACHMENT0,ae,he);else de(H.__webglFramebuffer,T,M,i.COLOR_ATTACHMENT0,ae,0);x(M,ge)&&v(ae),t.unbindTexture()}T.depthBuffer&&be(T)}function wt(T){const M=m(T)||a,H=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let K=0,$=H.length;K<$;K++){const Q=H[K];if(x(Q,M)){const ge=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ae=n.get(Q).__webglTexture;t.bindTexture(ge,ae),v(ge),t.unbindTexture()}}}function ye(T){if(a&&T.samples>0&&pe(T)===!1){const M=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],H=T.width,K=T.height;let $=i.COLOR_BUFFER_BIT;const Q=[],ge=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=n.get(T),he=T.isWebGLMultipleRenderTargets===!0;if(he)for(let Ee=0;Ee<M.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let Ee=0;Ee<M.length;Ee++){Q.push(i.COLOR_ATTACHMENT0+Ee),T.depthBuffer&&Q.push(ge);const ze=ae.__ignoreDepthValues!==void 0?ae.__ignoreDepthValues:!1;if(ze===!1&&(T.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),he&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ae.__webglColorRenderbuffer[Ee]),ze===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ge]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ge])),he){const J=n.get(M[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,H,K,0,0,H,K,$,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let Ee=0;Ee<M.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,ae.__webglColorRenderbuffer[Ee]);const ze=n.get(M[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}}function Ce(T){return Math.min(r.maxSamples,T.samples)}function pe(T){const M=n.get(T);return a&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function rt(T){const M=o.render.frame;h.get(T)!==M&&(h.set(T,M),T.update())}function Oe(T,M){const H=T.colorSpace,K=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===Us||H!==hn&&H!==kt&&($e.getTransfer(H)===nt?a===!1?e.has("EXT_sRGB")===!0&&K===Zt?(T.format=Us,T.minFilter=It,T.generateMipmaps=!1):M=ul.sRGBToLinear(M):(K!==Zt||$!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}this.allocateTextureUnit=D,this.resetTextureUnits=ee,this.setTexture2D=U,this.setTexture2DArray=X,this.setTexture3D=N,this.setTextureCube=O,this.rebindTextures=Xe,this.setupRenderTarget=B,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=de,this.useMultisampledRTT=pe}function rm(i,e,t){const n=t.isWebGL2;function r(s,o=kt){let a;const l=$e.getTransfer(o);if(s===Mn)return i.UNSIGNED_BYTE;if(s===nl)return i.UNSIGNED_SHORT_4_4_4_4;if(s===il)return i.UNSIGNED_SHORT_5_5_5_1;if(s===Tc)return i.BYTE;if(s===wc)return i.SHORT;if(s===ks)return i.UNSIGNED_SHORT;if(s===tl)return i.INT;if(s===gn)return i.UNSIGNED_INT;if(s===vn)return i.FLOAT;if(s===zi)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Ac)return i.ALPHA;if(s===Zt)return i.RGBA;if(s===Cc)return i.LUMINANCE;if(s===Rc)return i.LUMINANCE_ALPHA;if(s===Un)return i.DEPTH_COMPONENT;if(s===gi)return i.DEPTH_STENCIL;if(s===Us)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Pc)return i.RED;if(s===rl)return i.RED_INTEGER;if(s===Lc)return i.RG;if(s===sl)return i.RG_INTEGER;if(s===al)return i.RGBA_INTEGER;if(s===qr||s===Yr||s===Zr||s===Jr)if(l===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===qr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Yr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Zr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Jr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===qr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Yr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Zr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Jr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ga||s===va||s===_a||s===xa)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===ga)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===va)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===_a)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===xa)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===ol)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ya||s===Ma)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===ya)return l===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ma)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Sa||s===Ea||s===ba||s===Ta||s===wa||s===Aa||s===Ca||s===Ra||s===Pa||s===La||s===Da||s===Ia||s===Ua||s===Na)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Sa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ea)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ba)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ta)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===wa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Aa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ca)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ra)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Pa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===La)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Da)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ia)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ua)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Na)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===$r||s===Fa||s===Oa)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===$r)return l===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Fa)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Oa)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Dc||s===za||s===Ba||s===Ga)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===$r)return a.COMPRESSED_RED_RGTC1_EXT;if(s===za)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ba)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ga)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===In?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class sm extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Je extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const am={type:"move"};class xs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(am)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Je;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class om extends _i{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const x=[],v=[],S=new ce;let C=null;const w=new zt;w.layers.enable(1),w.viewport=new it;const A=new zt;A.layers.enable(2),A.viewport=new it;const F=[w,A],y=new sm;y.layers.enable(1),y.layers.enable(2);let b=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=x[q];return Z===void 0&&(Z=new xs,x[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=x[q];return Z===void 0&&(Z=new xs,x[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=x[q];return Z===void 0&&(Z=new xs,x[q]=Z),Z.getHandSpace()};function W(q){const Z=v.indexOf(q.inputSource);if(Z===-1)return;const oe=x[Z];oe!==void 0&&(oe.update(q.inputSource,q.frame,c||o),oe.dispatchEvent({type:q.type,data:q.inputSource}))}function ee(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",ee),r.removeEventListener("inputsourceschange",D);for(let q=0;q<x.length;q++){const Z=v[q];Z!==null&&(v[q]=null,x[q].disconnect(Z))}b=null,z=null,e.setRenderTarget(m),d=null,f=null,u=null,r=null,p=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",ee),r.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,Z),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new Fn(d.framebufferWidth,d.framebufferHeight,{format:Zt,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Z=null,oe=null,me=null;_.depth&&(me=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=_.stencil?gi:Un,oe=_.stencil?In:gn);const de={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:s};u=new XRWebGLBinding(r,t),f=u.createProjectionLayer(de),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new Fn(f.textureWidth,f.textureHeight,{format:Zt,type:Mn,depthTexture:new El(f.textureWidth,f.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Pe=e.properties.get(p);Pe.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function D(q){for(let Z=0;Z<q.removed.length;Z++){const oe=q.removed[Z],me=v.indexOf(oe);me>=0&&(v[me]=null,x[me].disconnect(oe))}for(let Z=0;Z<q.added.length;Z++){const oe=q.added[Z];let me=v.indexOf(oe);if(me===-1){for(let Pe=0;Pe<x.length;Pe++)if(Pe>=v.length){v.push(oe),me=Pe;break}else if(v[Pe]===null){v[Pe]=oe,me=Pe;break}if(me===-1)break}const de=x[me];de&&de.connect(oe)}}const P=new R,U=new R;function X(q,Z,oe){P.setFromMatrixPosition(Z.matrixWorld),U.setFromMatrixPosition(oe.matrixWorld);const me=P.distanceTo(U),de=Z.projectionMatrix.elements,Pe=oe.projectionMatrix.elements,De=de[14]/(de[10]-1),be=de[14]/(de[10]+1),Xe=(de[9]+1)/de[5],B=(de[9]-1)/de[5],wt=(de[8]-1)/de[0],ye=(Pe[8]+1)/Pe[0],Ce=De*wt,pe=De*ye,rt=me/(-wt+ye),Oe=rt*-wt;Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Oe),q.translateZ(rt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const T=De+rt,M=be+rt,H=Ce-Oe,K=pe+(me-Oe),$=Xe*be/M*T,Q=B*be/M*T;q.projectionMatrix.makePerspective(H,K,$,Q,T,M),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function N(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;y.near=A.near=w.near=q.near,y.far=A.far=w.far=q.far,(b!==y.near||z!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),b=y.near,z=y.far);const Z=q.parent,oe=y.cameras;N(y,Z);for(let me=0;me<oe.length;me++)N(oe[me],Z);oe.length===2?X(y,w,A):y.projectionMatrix.copy(w.projectionMatrix),O(q,y,Z)};function O(q,Z,oe){oe===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(oe.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Bi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)};let Y=null;function j(q,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){const oe=h.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let me=!1;oe.length!==y.cameras.length&&(y.cameras.length=0,me=!0);for(let de=0;de<oe.length;de++){const Pe=oe[de];let De=null;if(d!==null)De=d.getViewport(Pe);else{const Xe=u.getViewSubImage(f,Pe);De=Xe.viewport,de===0&&(e.setRenderTargetTextures(p,Xe.colorTexture,f.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(p))}let be=F[de];be===void 0&&(be=new zt,be.layers.enable(de),be.viewport=new it,F[de]=be),be.matrix.fromArray(Pe.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Pe.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(De.x,De.y,De.width,De.height),de===0&&(y.matrix.copy(be.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),me===!0&&y.cameras.push(be)}}for(let oe=0;oe<x.length;oe++){const me=v[oe],de=x[oe];me!==null&&de!==void 0&&de.update(me,Z,c||o)}Y&&Y(q,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const se=new Ml;se.setAnimationLoop(j),this.setAnimationLoop=function(q){Y=q},this.dispose=function(){}}}function lm(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,_l(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,x,v,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Dt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Dt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p).envMap;if(x&&(m.envMap.value=x,m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function cm(i,e,t,n){let r={},s={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,v){const S=v.program;n.uniformBlockBinding(x,S)}function c(x,v){let S=r[x.id];S===void 0&&(g(x),S=h(x),r[x.id]=S,x.addEventListener("dispose",m));const C=v.program;n.updateUBOMapping(x,C);const w=e.render.frame;s[x.id]!==w&&(f(x),s[x.id]=w)}function h(x){const v=u();x.__bindingPointIndex=v;const S=i.createBuffer(),C=x.__size,w=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,S),S}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const v=r[x.id],S=x.uniforms,C=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,A=S.length;w<A;w++){const F=Array.isArray(S[w])?S[w]:[S[w]];for(let y=0,b=F.length;y<b;y++){const z=F[y];if(d(z,w,y,C)===!0){const W=z.__offset,ee=Array.isArray(z.value)?z.value:[z.value];let D=0;for(let P=0;P<ee.length;P++){const U=ee[P],X=_(U);typeof U=="number"||typeof U=="boolean"?(z.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,W+D,z.__data)):U.isMatrix3?(z.__data[0]=U.elements[0],z.__data[1]=U.elements[1],z.__data[2]=U.elements[2],z.__data[3]=0,z.__data[4]=U.elements[3],z.__data[5]=U.elements[4],z.__data[6]=U.elements[5],z.__data[7]=0,z.__data[8]=U.elements[6],z.__data[9]=U.elements[7],z.__data[10]=U.elements[8],z.__data[11]=0):(U.toArray(z.__data,D),D+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,v,S,C){const w=x.value,A=v+"_"+S;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const F=C[A];if(typeof w=="number"||typeof w=="boolean"){if(F!==w)return C[A]=w,!0}else if(F.equals(w)===!1)return F.copy(w),!0}return!1}function g(x){const v=x.uniforms;let S=0;const C=16;for(let A=0,F=v.length;A<F;A++){const y=Array.isArray(v[A])?v[A]:[v[A]];for(let b=0,z=y.length;b<z;b++){const W=y[b],ee=Array.isArray(W.value)?W.value:[W.value];for(let D=0,P=ee.length;D<P;D++){const U=ee[D],X=_(U),N=S%C;N!==0&&C-N<X.boundary&&(S+=C-N),W.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=S,S+=X.storage}}}const w=S%C;return w>0&&(S+=C-w),x.__size=S,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function m(x){const v=x.target;v.removeEventListener("dispose",m);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function p(){for(const x in r)i.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class Rl{constructor(e={}){const{canvas:t=rh(),context:n=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this._useLegacyLights=!1,this.toneMapping=yn,this.toneMappingExposure=1;const v=this;let S=!1,C=0,w=0,A=null,F=-1,y=null;const b=new it,z=new it;let W=null;const ee=new _e(0);let D=0,P=t.width,U=t.height,X=1,N=null,O=null;const Y=new it(0,0,P,U),j=new it(0,0,P,U);let se=!1;const q=new Ys;let Z=!1,oe=!1,me=null;const de=new tt,Pe=new ce,De=new R,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Xe(){return A===null?X:1}let B=n;function wt(E,I){for(let V=0;V<E.length;V++){const k=E[V],G=t.getContext(k,I);if(G!==null)return G}return null}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vs}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",ie,!1),B===null){const I=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&I.shift(),B=wt(I,E),B===null)throw wt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ye,Ce,pe,rt,Oe,T,M,H,K,$,Q,ge,ae,he,Ee,ze,J,Ze,ke,Ae,xe,ue,Ie,Ye;function ot(){ye=new xd(B),Ce=new dd(B,ye,e),ye.init(Ce),ue=new rm(B,ye,Ce),pe=new nm(B,ye,Ce),rt=new Sd(B),Oe=new Vp,T=new im(B,ye,pe,Oe,Ce,ue,rt),M=new md(v),H=new _d(v),K=new Rh(B,Ce),Ie=new ud(B,ye,K,Ce),$=new yd(B,K,rt,Ie),Q=new wd(B,$,K,rt),ke=new Td(B,Ce,T),ze=new pd(Oe),ge=new Hp(v,M,H,ye,Ce,Ie,ze),ae=new lm(v,Oe),he=new Wp,Ee=new $p(ye,Ce),Ze=new hd(v,M,H,pe,Q,f,l),J=new tm(v,Q,Ce),Ye=new cm(B,rt,Ce,pe),Ae=new fd(B,ye,rt,Ce),xe=new Md(B,ye,rt,Ce),rt.programs=ge.programs,v.capabilities=Ce,v.extensions=ye,v.properties=Oe,v.renderLists=he,v.shadowMap=J,v.state=pe,v.info=rt}ot();const Ge=new om(v,B);this.xr=Ge,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const E=ye.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ye.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(E){E!==void 0&&(X=E,this.setSize(P,U,!1))},this.getSize=function(E){return E.set(P,U)},this.setSize=function(E,I,V=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=E,U=I,t.width=Math.floor(E*X),t.height=Math.floor(I*X),V===!0&&(t.style.width=E+"px",t.style.height=I+"px"),this.setViewport(0,0,E,I)},this.getDrawingBufferSize=function(E){return E.set(P*X,U*X).floor()},this.setDrawingBufferSize=function(E,I,V){P=E,U=I,X=V,t.width=Math.floor(E*V),t.height=Math.floor(I*V),this.setViewport(0,0,E,I)},this.getCurrentViewport=function(E){return E.copy(b)},this.getViewport=function(E){return E.copy(Y)},this.setViewport=function(E,I,V,k){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,I,V,k),pe.viewport(b.copy(Y).multiplyScalar(X).floor())},this.getScissor=function(E){return E.copy(j)},this.setScissor=function(E,I,V,k){E.isVector4?j.set(E.x,E.y,E.z,E.w):j.set(E,I,V,k),pe.scissor(z.copy(j).multiplyScalar(X).floor())},this.getScissorTest=function(){return se},this.setScissorTest=function(E){pe.setScissorTest(se=E)},this.setOpaqueSort=function(E){N=E},this.setTransparentSort=function(E){O=E},this.getClearColor=function(E){return E.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor.apply(Ze,arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha.apply(Ze,arguments)},this.clear=function(E=!0,I=!0,V=!0){let k=0;if(E){let G=!1;if(A!==null){const le=A.texture.format;G=le===al||le===sl||le===rl}if(G){const le=A.texture.type,ve=le===Mn||le===gn||le===ks||le===In||le===nl||le===il,Se=Ze.getClearColor(),we=Ze.getClearAlpha(),Be=Se.r,Re=Se.g,Le=Se.b;ve?(d[0]=Be,d[1]=Re,d[2]=Le,d[3]=we,B.clearBufferuiv(B.COLOR,0,d)):(g[0]=Be,g[1]=Re,g[2]=Le,g[3]=we,B.clearBufferiv(B.COLOR,0,g))}else k|=B.COLOR_BUFFER_BIT}I&&(k|=B.DEPTH_BUFFER_BIT),V&&(k|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),he.dispose(),Ee.dispose(),Oe.dispose(),M.dispose(),H.dispose(),Q.dispose(),Ie.dispose(),Ye.dispose(),ge.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",At),Ge.removeEventListener("sessionend",et),me&&(me.dispose(),me=null),Ct.stop()};function te(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const E=rt.autoReset,I=J.enabled,V=J.autoUpdate,k=J.needsUpdate,G=J.type;ot(),rt.autoReset=E,J.enabled=I,J.autoUpdate=V,J.needsUpdate=k,J.type=G}function ie(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function re(E){const I=E.target;I.removeEventListener("dispose",re),Te(I)}function Te(E){Me(E),Oe.remove(E)}function Me(E){const I=Oe.get(E).programs;I!==void 0&&(I.forEach(function(V){ge.releaseProgram(V)}),E.isShaderMaterial&&ge.releaseShaderCache(E))}this.renderBufferDirect=function(E,I,V,k,G,le){I===null&&(I=be);const ve=G.isMesh&&G.matrixWorld.determinant()<0,Se=Gl(E,I,V,k,G);pe.setMaterial(k,ve);let we=V.index,Be=1;if(k.wireframe===!0){if(we=$.getWireframeAttribute(V),we===void 0)return;Be=2}const Re=V.drawRange,Le=V.attributes.position;let ht=Re.start*Be,Nt=(Re.start+Re.count)*Be;le!==null&&(ht=Math.max(ht,le.start*Be),Nt=Math.min(Nt,(le.start+le.count)*Be)),we!==null?(ht=Math.max(ht,0),Nt=Math.min(Nt,we.count)):Le!=null&&(ht=Math.max(ht,0),Nt=Math.min(Nt,Le.count));const vt=Nt-ht;if(vt<0||vt===1/0)return;Ie.setup(G,k,Se,V,we);let Qt,st=Ae;if(we!==null&&(Qt=K.get(we),st=xe,st.setIndex(Qt)),G.isMesh)k.wireframe===!0?(pe.setLineWidth(k.wireframeLinewidth*Xe()),st.setMode(B.LINES)):st.setMode(B.TRIANGLES);else if(G.isLine){let He=k.linewidth;He===void 0&&(He=1),pe.setLineWidth(He*Xe()),G.isLineSegments?st.setMode(B.LINES):G.isLineLoop?st.setMode(B.LINE_LOOP):st.setMode(B.LINE_STRIP)}else G.isPoints?st.setMode(B.POINTS):G.isSprite&&st.setMode(B.TRIANGLES);if(G.isBatchedMesh)st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)st.renderInstances(ht,vt,G.count);else if(V.isInstancedBufferGeometry){const He=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Hr=Math.min(V.instanceCount,He);st.renderInstances(ht,vt,Hr)}else st.render(ht,vt)};function je(E,I,V){E.transparent===!0&&E.side===xt&&E.forceSinglePass===!1?(E.side=Dt,E.needsUpdate=!0,Yi(E,I,V),E.side=cn,E.needsUpdate=!0,Yi(E,I,V),E.side=xt):Yi(E,I,V)}this.compile=function(E,I,V=null){V===null&&(V=E),m=Ee.get(V),m.init(),x.push(m),V.traverseVisible(function(G){G.isLight&&G.layers.test(I.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),E!==V&&E.traverseVisible(function(G){G.isLight&&G.layers.test(I.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(v._useLegacyLights);const k=new Set;return E.traverse(function(G){const le=G.material;if(le)if(Array.isArray(le))for(let ve=0;ve<le.length;ve++){const Se=le[ve];je(Se,V,G),k.add(Se)}else je(le,V,G),k.add(le)}),x.pop(),m=null,k},this.compileAsync=function(E,I,V=null){const k=this.compile(E,I,V);return new Promise(G=>{function le(){if(k.forEach(function(ve){Oe.get(ve).currentProgram.isReady()&&k.delete(ve)}),k.size===0){G(E);return}setTimeout(le,10)}ye.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let Qe=null;function gt(E){Qe&&Qe(E)}function At(){Ct.stop()}function et(){Ct.start()}const Ct=new Ml;Ct.setAnimationLoop(gt),typeof self<"u"&&Ct.setContext(self),this.setAnimationLoop=function(E){Qe=E,Ge.setAnimationLoop(E),E===null?Ct.stop():Ct.start()},Ge.addEventListener("sessionstart",At),Ge.addEventListener("sessionend",et),this.render=function(E,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(I),I=Ge.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,I,A),m=Ee.get(E,x.length),m.init(),x.push(m),de.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(de),oe=this.localClippingEnabled,Z=ze.init(this.clippingPlanes,oe),_=he.get(E,p.length),_.init(),p.push(_),Jt(E,I,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(N,O),this.info.render.frame++,Z===!0&&ze.beginShadows();const V=m.state.shadowsArray;if(J.render(V,E,I),Z===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ze.render(_,E),m.setupLights(v._useLegacyLights),I.isArrayCamera){const k=I.cameras;for(let G=0,le=k.length;G<le;G++){const ve=k[G];ia(_,E,ve,ve.viewport)}}else ia(_,E,I);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(v,E,I),Ie.resetDefaultState(),F=-1,y=null,x.pop(),x.length>0?m=x[x.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Jt(E,I,V,k){if(E.visible===!1)return;if(E.layers.test(I.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(I);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||q.intersectsSprite(E)){k&&De.setFromMatrixPosition(E.matrixWorld).applyMatrix4(de);const ve=Q.update(E),Se=E.material;Se.visible&&_.push(E,ve,Se,V,De.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||q.intersectsObject(E))){const ve=Q.update(E),Se=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),De.copy(E.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),De.copy(ve.boundingSphere.center)),De.applyMatrix4(E.matrixWorld).applyMatrix4(de)),Array.isArray(Se)){const we=ve.groups;for(let Be=0,Re=we.length;Be<Re;Be++){const Le=we[Be],ht=Se[Le.materialIndex];ht&&ht.visible&&_.push(E,ve,ht,V,De.z,Le)}}else Se.visible&&_.push(E,ve,Se,V,De.z,null)}}const le=E.children;for(let ve=0,Se=le.length;ve<Se;ve++)Jt(le[ve],I,V,k)}function ia(E,I,V,k){const G=E.opaque,le=E.transmissive,ve=E.transparent;m.setupLightsView(V),Z===!0&&ze.setGlobalState(v.clippingPlanes,V),le.length>0&&Bl(G,le,I,V),k&&pe.viewport(b.copy(k)),G.length>0&&qi(G,I,V),le.length>0&&qi(le,I,V),ve.length>0&&qi(ve,I,V),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Bl(E,I,V,k){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;const le=Ce.isWebGL2;me===null&&(me=new Fn(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?zi:Mn,minFilter:Oi,samples:le?4:0})),v.getDrawingBufferSize(Pe),le?me.setSize(Pe.x,Pe.y):me.setSize(Ir(Pe.x),Ir(Pe.y));const ve=v.getRenderTarget();v.setRenderTarget(me),v.getClearColor(ee),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();const Se=v.toneMapping;v.toneMapping=yn,qi(E,V,k),T.updateMultisampleRenderTarget(me),T.updateRenderTargetMipmap(me);let we=!1;for(let Be=0,Re=I.length;Be<Re;Be++){const Le=I[Be],ht=Le.object,Nt=Le.geometry,vt=Le.material,Qt=Le.group;if(vt.side===xt&&ht.layers.test(k.layers)){const st=vt.side;vt.side=Dt,vt.needsUpdate=!0,ra(ht,V,k,Nt,vt,Qt),vt.side=st,vt.needsUpdate=!0,we=!0}}we===!0&&(T.updateMultisampleRenderTarget(me),T.updateRenderTargetMipmap(me)),v.setRenderTarget(ve),v.setClearColor(ee,D),v.toneMapping=Se}function qi(E,I,V){const k=I.isScene===!0?I.overrideMaterial:null;for(let G=0,le=E.length;G<le;G++){const ve=E[G],Se=ve.object,we=ve.geometry,Be=k===null?ve.material:k,Re=ve.group;Se.layers.test(V.layers)&&ra(Se,I,V,we,Be,Re)}}function ra(E,I,V,k,G,le){E.onBeforeRender(v,I,V,k,G,le),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(v,I,V,k,E,le),G.transparent===!0&&G.side===xt&&G.forceSinglePass===!1?(G.side=Dt,G.needsUpdate=!0,v.renderBufferDirect(V,I,k,G,E,le),G.side=cn,G.needsUpdate=!0,v.renderBufferDirect(V,I,k,G,E,le),G.side=xt):v.renderBufferDirect(V,I,k,G,E,le),E.onAfterRender(v,I,V,k,G,le)}function Yi(E,I,V){I.isScene!==!0&&(I=be);const k=Oe.get(E),G=m.state.lights,le=m.state.shadowsArray,ve=G.state.version,Se=ge.getParameters(E,G.state,le,I,V),we=ge.getProgramCacheKey(Se);let Be=k.programs;k.environment=E.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(E.isMeshStandardMaterial?H:M).get(E.envMap||k.environment),Be===void 0&&(E.addEventListener("dispose",re),Be=new Map,k.programs=Be);let Re=Be.get(we);if(Re!==void 0){if(k.currentProgram===Re&&k.lightsStateVersion===ve)return aa(E,Se),Re}else Se.uniforms=ge.getUniforms(E),E.onBuild(V,Se,v),E.onBeforeCompile(Se,v),Re=ge.acquireProgram(Se,we),Be.set(we,Re),k.uniforms=Se.uniforms;const Le=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=ze.uniform),aa(E,Se),k.needsLights=Vl(E),k.lightsStateVersion=ve,k.needsLights&&(Le.ambientLightColor.value=G.state.ambient,Le.lightProbe.value=G.state.probe,Le.directionalLights.value=G.state.directional,Le.directionalLightShadows.value=G.state.directionalShadow,Le.spotLights.value=G.state.spot,Le.spotLightShadows.value=G.state.spotShadow,Le.rectAreaLights.value=G.state.rectArea,Le.ltc_1.value=G.state.rectAreaLTC1,Le.ltc_2.value=G.state.rectAreaLTC2,Le.pointLights.value=G.state.point,Le.pointLightShadows.value=G.state.pointShadow,Le.hemisphereLights.value=G.state.hemi,Le.directionalShadowMap.value=G.state.directionalShadowMap,Le.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Le.spotShadowMap.value=G.state.spotShadowMap,Le.spotLightMatrix.value=G.state.spotLightMatrix,Le.spotLightMap.value=G.state.spotLightMap,Le.pointShadowMap.value=G.state.pointShadowMap,Le.pointShadowMatrix.value=G.state.pointShadowMatrix),k.currentProgram=Re,k.uniformsList=null,Re}function sa(E){if(E.uniformsList===null){const I=E.currentProgram.getUniforms();E.uniformsList=wr.seqWithValue(I.seq,E.uniforms)}return E.uniformsList}function aa(E,I){const V=Oe.get(E);V.outputColorSpace=I.outputColorSpace,V.batching=I.batching,V.instancing=I.instancing,V.instancingColor=I.instancingColor,V.skinning=I.skinning,V.morphTargets=I.morphTargets,V.morphNormals=I.morphNormals,V.morphColors=I.morphColors,V.morphTargetsCount=I.morphTargetsCount,V.numClippingPlanes=I.numClippingPlanes,V.numIntersection=I.numClipIntersection,V.vertexAlphas=I.vertexAlphas,V.vertexTangents=I.vertexTangents,V.toneMapping=I.toneMapping}function Gl(E,I,V,k,G){I.isScene!==!0&&(I=be),T.resetTextureUnits();const le=I.fog,ve=k.isMeshStandardMaterial?I.environment:null,Se=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:hn,we=(k.isMeshStandardMaterial?H:M).get(k.envMap||ve),Be=k.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Re=!!V.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Le=!!V.morphAttributes.position,ht=!!V.morphAttributes.normal,Nt=!!V.morphAttributes.color;let vt=yn;k.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(vt=v.toneMapping);const Qt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,st=Qt!==void 0?Qt.length:0,He=Oe.get(k),Hr=m.state.lights;if(Z===!0&&(oe===!0||E!==y)){const Bt=E===y&&k.id===F;ze.setState(k,E,Bt)}let lt=!1;k.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Hr.state.version||He.outputColorSpace!==Se||G.isBatchedMesh&&He.batching===!1||!G.isBatchedMesh&&He.batching===!0||G.isInstancedMesh&&He.instancing===!1||!G.isInstancedMesh&&He.instancing===!0||G.isSkinnedMesh&&He.skinning===!1||!G.isSkinnedMesh&&He.skinning===!0||G.isInstancedMesh&&He.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&He.instancingColor===!1&&G.instanceColor!==null||He.envMap!==we||k.fog===!0&&He.fog!==le||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==ze.numPlanes||He.numIntersection!==ze.numIntersection)||He.vertexAlphas!==Be||He.vertexTangents!==Re||He.morphTargets!==Le||He.morphNormals!==ht||He.morphColors!==Nt||He.toneMapping!==vt||Ce.isWebGL2===!0&&He.morphTargetsCount!==st)&&(lt=!0):(lt=!0,He.__version=k.version);let En=He.currentProgram;lt===!0&&(En=Yi(k,I,G));let oa=!1,Mi=!1,Vr=!1;const Et=En.getUniforms(),bn=He.uniforms;if(pe.useProgram(En.program)&&(oa=!0,Mi=!0,Vr=!0),k.id!==F&&(F=k.id,Mi=!0),oa||y!==E){Et.setValue(B,"projectionMatrix",E.projectionMatrix),Et.setValue(B,"viewMatrix",E.matrixWorldInverse);const Bt=Et.map.cameraPosition;Bt!==void 0&&Bt.setValue(B,De.setFromMatrixPosition(E.matrixWorld)),Ce.logarithmicDepthBuffer&&Et.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Et.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,Mi=!0,Vr=!0)}if(G.isSkinnedMesh){Et.setOptional(B,G,"bindMatrix"),Et.setOptional(B,G,"bindMatrixInverse");const Bt=G.skeleton;Bt&&(Ce.floatVertexTextures?(Bt.boneTexture===null&&Bt.computeBoneTexture(),Et.setValue(B,"boneTexture",Bt.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(Et.setOptional(B,G,"batchingTexture"),Et.setValue(B,"batchingTexture",G._matricesTexture,T));const kr=V.morphAttributes;if((kr.position!==void 0||kr.normal!==void 0||kr.color!==void 0&&Ce.isWebGL2===!0)&&ke.update(G,V,En),(Mi||He.receiveShadow!==G.receiveShadow)&&(He.receiveShadow=G.receiveShadow,Et.setValue(B,"receiveShadow",G.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(bn.envMap.value=we,bn.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),Mi&&(Et.setValue(B,"toneMappingExposure",v.toneMappingExposure),He.needsLights&&Hl(bn,Vr),le&&k.fog===!0&&ae.refreshFogUniforms(bn,le),ae.refreshMaterialUniforms(bn,k,X,U,me),wr.upload(B,sa(He),bn,T)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(wr.upload(B,sa(He),bn,T),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Et.setValue(B,"center",G.center),Et.setValue(B,"modelViewMatrix",G.modelViewMatrix),Et.setValue(B,"normalMatrix",G.normalMatrix),Et.setValue(B,"modelMatrix",G.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Bt=k.uniformsGroups;for(let Wr=0,kl=Bt.length;Wr<kl;Wr++)if(Ce.isWebGL2){const la=Bt[Wr];Ye.update(la,En),Ye.bind(la,En)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return En}function Hl(E,I){E.ambientLightColor.needsUpdate=I,E.lightProbe.needsUpdate=I,E.directionalLights.needsUpdate=I,E.directionalLightShadows.needsUpdate=I,E.pointLights.needsUpdate=I,E.pointLightShadows.needsUpdate=I,E.spotLights.needsUpdate=I,E.spotLightShadows.needsUpdate=I,E.rectAreaLights.needsUpdate=I,E.hemisphereLights.needsUpdate=I}function Vl(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,I,V){Oe.get(E.texture).__webglTexture=I,Oe.get(E.depthTexture).__webglTexture=V;const k=Oe.get(E);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=V===void 0,k.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,I){const V=Oe.get(E);V.__webglFramebuffer=I,V.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(E,I=0,V=0){A=E,C=I,w=V;let k=!0,G=null,le=!1,ve=!1;if(E){const we=Oe.get(E);we.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(B.FRAMEBUFFER,null),k=!1):we.__webglFramebuffer===void 0?T.setupRenderTarget(E):we.__hasExternalTextures&&T.rebindTextures(E,Oe.get(E.texture).__webglTexture,Oe.get(E.depthTexture).__webglTexture);const Be=E.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ve=!0);const Re=Oe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Re[I])?G=Re[I][V]:G=Re[I],le=!0):Ce.isWebGL2&&E.samples>0&&T.useMultisampledRTT(E)===!1?G=Oe.get(E).__webglMultisampledFramebuffer:Array.isArray(Re)?G=Re[V]:G=Re,b.copy(E.viewport),z.copy(E.scissor),W=E.scissorTest}else b.copy(Y).multiplyScalar(X).floor(),z.copy(j).multiplyScalar(X).floor(),W=se;if(pe.bindFramebuffer(B.FRAMEBUFFER,G)&&Ce.drawBuffers&&k&&pe.drawBuffers(E,G),pe.viewport(b),pe.scissor(z),pe.setScissorTest(W),le){const we=Oe.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+I,we.__webglTexture,V)}else if(ve){const we=Oe.get(E.texture),Be=I||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,we.__webglTexture,V||0,Be)}F=-1},this.readRenderTargetPixels=function(E,I,V,k,G,le,ve){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Oe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se){pe.bindFramebuffer(B.FRAMEBUFFER,Se);try{const we=E.texture,Be=we.format,Re=we.type;if(Be!==Zt&&ue.convert(Be)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Le=Re===zi&&(ye.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Re!==Mn&&ue.convert(Re)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Re===vn&&(Ce.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Le){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=E.width-k&&V>=0&&V<=E.height-G&&B.readPixels(I,V,k,G,ue.convert(Be),ue.convert(Re),le)}finally{const we=A!==null?Oe.get(A).__webglFramebuffer:null;pe.bindFramebuffer(B.FRAMEBUFFER,we)}}},this.copyFramebufferToTexture=function(E,I,V=0){const k=Math.pow(2,-V),G=Math.floor(I.image.width*k),le=Math.floor(I.image.height*k);T.setTexture2D(I,0),B.copyTexSubImage2D(B.TEXTURE_2D,V,0,0,E.x,E.y,G,le),pe.unbindTexture()},this.copyTextureToTexture=function(E,I,V,k=0){const G=I.image.width,le=I.image.height,ve=ue.convert(V.format),Se=ue.convert(V.type);T.setTexture2D(V,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,V.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,V.unpackAlignment),I.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,k,E.x,E.y,G,le,ve,Se,I.image.data):I.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,k,E.x,E.y,I.mipmaps[0].width,I.mipmaps[0].height,ve,I.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,k,E.x,E.y,ve,Se,I.image),k===0&&V.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(E,I,V,k,G=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const le=E.max.x-E.min.x+1,ve=E.max.y-E.min.y+1,Se=E.max.z-E.min.z+1,we=ue.convert(k.format),Be=ue.convert(k.type);let Re;if(k.isData3DTexture)T.setTexture3D(k,0),Re=B.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)T.setTexture2DArray(k,0),Re=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,k.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,k.unpackAlignment);const Le=B.getParameter(B.UNPACK_ROW_LENGTH),ht=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Nt=B.getParameter(B.UNPACK_SKIP_PIXELS),vt=B.getParameter(B.UNPACK_SKIP_ROWS),Qt=B.getParameter(B.UNPACK_SKIP_IMAGES),st=V.isCompressedTexture?V.mipmaps[G]:V.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,st.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,st.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,E.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,E.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,E.min.z),V.isDataTexture||V.isData3DTexture?B.texSubImage3D(Re,G,I.x,I.y,I.z,le,ve,Se,we,Be,st.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Re,G,I.x,I.y,I.z,le,ve,Se,we,st.data)):B.texSubImage3D(Re,G,I.x,I.y,I.z,le,ve,Se,we,Be,st),B.pixelStorei(B.UNPACK_ROW_LENGTH,Le),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ht),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Nt),B.pixelStorei(B.UNPACK_SKIP_ROWS,vt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Qt),G===0&&k.generateMipmaps&&B.generateMipmap(Re),pe.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),pe.unbindTexture()},this.resetState=function(){C=0,w=0,A=null,pe.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ws?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===Or?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Mt?Nn:ll}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Nn?Mt:hn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class hm extends Rl{}hm.prototype.isWebGL1Renderer=!0;class um extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Os extends ut{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ii=new tt,Lo=new tt,gr=[],Do=new Bn,fm=new tt,wi=new We,Ai=new Gn;class Io extends We{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Os(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,fm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Bn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ii),Do.copy(e.boundingBox).applyMatrix4(ii),this.boundingBox.union(Do)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ii),Ai.copy(e.boundingSphere).applyMatrix4(ii),this.boundingSphere.union(Ai)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,r=this.count;if(wi.geometry=this.geometry,wi.material=this.material,wi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ai.copy(this.boundingSphere),Ai.applyMatrix4(n),e.ray.intersectsSphere(Ai)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ii),Lo.multiplyMatrices(n,ii),wi.matrixWorld=Lo,wi.raycast(e,gr);for(let o=0,a=gr.length;o<a;o++){const l=gr[o];l.instanceId=s,l.object=this,t.push(l)}gr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Os(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class si extends xi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Uo=new R,No=new R,Fo=new tt,ys=new qs,vr=new Gn;class dm extends dt{constructor(e=new Ke,t=new si){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Uo.fromBufferAttribute(t,r-1),No.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Uo.distanceTo(No);e.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(r),vr.radius+=s,e.ray.intersectsSphere(vr)===!1)return;Fo.copy(r).invert(),ys.copy(e.ray).applyMatrix4(Fo);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new R,h=new R,u=new R,f=new R,d=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),x=Math.min(g.count,o.start+o.count);for(let v=p,S=x-1;v<S;v+=d){const C=g.getX(v),w=g.getX(v+1);if(c.fromBufferAttribute(m,C),h.fromBufferAttribute(m,w),ys.distanceSqToSegment(c,h,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const F=e.ray.origin.distanceTo(f);F<e.near||F>e.far||t.push({distance:F,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),x=Math.min(m.count,o.start+o.count);for(let v=p,S=x-1;v<S;v+=d){if(c.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),ys.distanceSqToSegment(c,h,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(f);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Oo=new R,zo=new R;class Ci extends dm{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Oo.fromBufferAttribute(t,r),zo.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Oo.distanceTo(zo);e.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ar extends xi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bo=new tt,zs=new qs,_r=new Gn,xr=new R;class an extends dt{constructor(e=new Ke,t=new Ar){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(r),_r.radius+=s,e.ray.intersectsSphere(_r)===!1)return;Bo.copy(r).invert(),zs.copy(e.ray).applyMatrix4(Bo);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const m=c.getX(g);xr.fromBufferAttribute(u,m),Go(xr,m,l,r,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,_=d;g<_;g++)xr.fromBufferAttribute(u,g),Go(xr,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Go(i,e,t,n,r,s,o){const a=zs.distanceSqToPoint(i);if(a<t){const l=new R;zs.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Ri extends Ut{constructor(e,t,n,r,s,o,a,l,c){super(e,t,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class jt{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=n[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===o)return r/(s-1);const h=n[r],f=n[r+1]-h,d=(o-h)/f;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new ce:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new R,r=[],s=[],o=[],a=new R,l=new tt;for(let d=0;d<=e;d++){const g=d/e;r[d]=this.getTangentAt(g,new R)}s[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(St(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(St(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Js extends jt{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const n=t||new ce,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class pm extends Js{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function $s(){let i=0,e=0,t=0,n=0;function r(s,o,a,l){i=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let f=(o-s)/c-(a-s)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const yr=new R,Ms=new $s,Ss=new $s,Es=new $s;class mm extends jt{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(yr.subVectors(r[0],r[1]).add(r[0]),c=yr);const u=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(yr.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=yr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ms.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,_,m),Ss.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,_,m),Es.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Ms.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Ss.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Es.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Ms.calc(l),Ss.calc(l),Es.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ho(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,l=i*a;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*a+s*i+t}function gm(i,e){const t=1-i;return t*t*e}function vm(i,e){return 2*(1-i)*i*e}function _m(i,e){return i*i*e}function Ii(i,e,t,n){return gm(i,e)+vm(i,t)+_m(i,n)}function xm(i,e){const t=1-i;return t*t*t*e}function ym(i,e){const t=1-i;return 3*t*t*i*e}function Mm(i,e){return 3*(1-i)*i*i*e}function Sm(i,e){return i*i*i*e}function Ui(i,e,t,n,r){return xm(i,e)+ym(i,t)+Mm(i,n)+Sm(i,r)}class Pl extends jt{constructor(e=new ce,t=new ce,n=new ce,r=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ce){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ui(e,r.x,s.x,o.x,a.x),Ui(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Em extends jt{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ui(e,r.x,s.x,o.x,a.x),Ui(e,r.y,s.y,o.y,a.y),Ui(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ll extends jt{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bm extends jt{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dl extends jt{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ii(e,r.x,s.x,o.x),Ii(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tm extends jt{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ii(e,r.x,s.x,o.x),Ii(e,r.y,s.y,o.y),Ii(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Il extends jt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return n.set(Ho(a,l.x,c.x,h.x,u.x),Ho(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new ce().fromArray(r))}return this}}var Vo=Object.freeze({__proto__:null,ArcCurve:pm,CatmullRomCurve3:mm,CubicBezierCurve:Pl,CubicBezierCurve3:Em,EllipseCurve:Js,LineCurve:Ll,LineCurve3:bm,QuadraticBezierCurve:Dl,QuadraticBezierCurve3:Tm,SplineCurve:Il});class wm extends jt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Vo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new Vo[r.type]().fromJSON(r))}return this}}class ko extends wm{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ll(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new Dl(this.currentPoint.clone(),new ce(e,t),new ce(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new Pl(this.currentPoint.clone(),new ce(e,t),new ce(n,r),new ce(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Il(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,o,a,l),this}absellipse(e,t,n,r,s,o,a,l){const c=new Js(e,t,n,r,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ks extends Ke{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new R,h=new ce;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const d=n+u/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Fe(o,3)),this.setAttribute("normal",new Fe(a,3)),this.setAttribute("uv",new Fe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ks(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class js extends Ke{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;x(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Fe(u,3)),this.setAttribute("normal",new Fe(f,3)),this.setAttribute("uv",new Fe(d,2));function x(){const S=new R,C=new R;let w=0;const A=(t-e)/n;for(let F=0;F<=s;F++){const y=[],b=F/s,z=b*(t-e)+e;for(let W=0;W<=r;W++){const ee=W/r,D=ee*l+a,P=Math.sin(D),U=Math.cos(D);C.x=z*P,C.y=-b*n+m,C.z=z*U,u.push(C.x,C.y,C.z),S.set(P,A,U).normalize(),f.push(S.x,S.y,S.z),d.push(ee,1-b),y.push(g++)}_.push(y)}for(let F=0;F<r;F++)for(let y=0;y<s;y++){const b=_[y][F],z=_[y+1][F],W=_[y+1][F+1],ee=_[y][F+1];h.push(b,z,ee),h.push(z,W,ee),w+=6}c.addGroup(p,w,0),p+=w}function v(S){const C=g,w=new ce,A=new R;let F=0;const y=S===!0?e:t,b=S===!0?1:-1;for(let W=1;W<=r;W++)u.push(0,m*b,0),f.push(0,b,0),d.push(.5,.5),g++;const z=g;for(let W=0;W<=r;W++){const D=W/r*l+a,P=Math.cos(D),U=Math.sin(D);A.x=y*U,A.y=m*b,A.z=y*P,u.push(A.x,A.y,A.z),f.push(0,b,0),w.x=P*.5+.5,w.y=U*.5*b+.5,d.push(w.x,w.y),g++}for(let W=0;W<r;W++){const ee=C+W,D=z+W;S===!0?h.push(D,D+1,ee):h.push(D+1,D,ee),F+=3}c.addGroup(p,F,S===!0?1:2),p+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ni extends js{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ni(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qs extends Ke{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),c(n),h(),this.setAttribute("position",new Fe(s,3)),this.setAttribute("normal",new Fe(s.slice(),3)),this.setAttribute("uv",new Fe(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const v=new R,S=new R,C=new R;for(let w=0;w<t.length;w+=3)d(t[w+0],v),d(t[w+1],S),d(t[w+2],C),l(v,S,C,x)}function l(x,v,S,C){const w=C+1,A=[];for(let F=0;F<=w;F++){A[F]=[];const y=x.clone().lerp(S,F/w),b=v.clone().lerp(S,F/w),z=w-F;for(let W=0;W<=z;W++)W===0&&F===w?A[F][W]=y:A[F][W]=y.clone().lerp(b,W/z)}for(let F=0;F<w;F++)for(let y=0;y<2*(w-F)-1;y++){const b=Math.floor(y/2);y%2===0?(f(A[F][b+1]),f(A[F+1][b]),f(A[F][b])):(f(A[F][b+1]),f(A[F+1][b+1]),f(A[F+1][b]))}}function c(x){const v=new R;for(let S=0;S<s.length;S+=3)v.x=s[S+0],v.y=s[S+1],v.z=s[S+2],v.normalize().multiplyScalar(x),s[S+0]=v.x,s[S+1]=v.y,s[S+2]=v.z}function h(){const x=new R;for(let v=0;v<s.length;v+=3){x.x=s[v+0],x.y=s[v+1],x.z=s[v+2];const S=m(x)/2/Math.PI+.5,C=p(x)/Math.PI+.5;o.push(S,1-C)}g(),u()}function u(){for(let x=0;x<o.length;x+=6){const v=o[x+0],S=o[x+2],C=o[x+4],w=Math.max(v,S,C),A=Math.min(v,S,C);w>.9&&A<.1&&(v<.2&&(o[x+0]+=1),S<.2&&(o[x+2]+=1),C<.2&&(o[x+4]+=1))}}function f(x){s.push(x.x,x.y,x.z)}function d(x,v){const S=x*3;v.x=e[S+0],v.y=e[S+1],v.z=e[S+2]}function g(){const x=new R,v=new R,S=new R,C=new R,w=new ce,A=new ce,F=new ce;for(let y=0,b=0;y<s.length;y+=9,b+=6){x.set(s[y+0],s[y+1],s[y+2]),v.set(s[y+3],s[y+4],s[y+5]),S.set(s[y+6],s[y+7],s[y+8]),w.set(o[b+0],o[b+1]),A.set(o[b+2],o[b+3]),F.set(o[b+4],o[b+5]),C.copy(x).add(v).add(S).divideScalar(3);const z=m(C);_(w,b+0,x,z),_(A,b+2,v,z),_(F,b+4,S,z)}}function _(x,v,S,C){C<0&&x.x===1&&(o[v]=x.x-1),S.x===0&&S.z===0&&(o[v]=C/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qs(e.vertices,e.indices,e.radius,e.details)}}const Mr=new R,Sr=new R,bs=new R,Er=new Ht;class Ts extends Ke{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(fi*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:m,c:p}=Er;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Er.getNormal(bs),u[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,u[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,u[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const v=(x+1)%3,S=u[x],C=u[v],w=Er[h[x]],A=Er[h[v]],F=`${S}_${C}`,y=`${C}_${S}`;y in f&&f[y]?(bs.dot(f[y].normal)<=s&&(d.push(w.x,w.y,w.z),d.push(A.x,A.y,A.z)),f[y]=null):F in f||(f[F]={index0:c[x],index1:c[v],normal:bs.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:m}=f[g];Mr.fromBufferAttribute(a,_),Sr.fromBufferAttribute(a,m),d.push(Mr.x,Mr.y,Mr.z),d.push(Sr.x,Sr.y,Sr.z)}this.setAttribute("position",new Fe(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Bs extends ko{constructor(e){super(e),this.uuid=zn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new ko().fromJSON(r))}return this}}const Am={triangulate:function(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=Ul(i,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,f,d;if(n&&(s=Dm(i,e,s,t)),i.length>80*t){a=c=i[0],l=h=i[1];for(let g=t;g<r;g+=t)u=i[g],f=i[g+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-a,h-l),d=d!==0?32767/d:0}return Hi(s,o,t,a,l,d,0),o}};function Ul(i,e,t,n,r){let s,o;if(r===km(i,e,t,n)>0)for(s=e;s<t;s+=n)o=Wo(s,i[s],i[s+1],o);else for(s=t-n;s>=e;s-=n)o=Wo(s,i[s],i[s+1],o);return o&&Gr(o,o.next)&&(ki(o),o=o.next),o}function On(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Gr(t,t.next)||at(t.prev,t,t.next)===0)){if(ki(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Hi(i,e,t,n,r,s,o){if(!i)return;!o&&s&&Om(i,n,r,s);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?Rm(i,n,r,s):Cm(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),ki(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Pm(On(i),e,t),Hi(i,e,t,n,r,s,2)):o===2&&Lm(i,e,t,n,r,s):Hi(On(i),e,t,n,r,s,1);break}}}function Cm(i){const e=i.prev,t=i,n=i.next;if(at(e,t,n)>=0)return!1;const r=e.x,s=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=r<s?r<o?r:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,f=r>s?r>o?r:o:s>o?s:o,d=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&li(r,a,s,l,o,c,g.x,g.y)&&at(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Rm(i,e,t,n){const r=i.prev,s=i,o=i.next;if(at(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,_=a>l?a>c?a:c:l>c?l:c,m=h>u?h>f?h:f:u>f?u:f,p=Gs(d,g,e,t,n),x=Gs(_,m,e,t,n);let v=i.prevZ,S=i.nextZ;for(;v&&v.z>=p&&S&&S.z<=x;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&li(a,h,l,u,c,f,v.x,v.y)&&at(v.prev,v,v.next)>=0||(v=v.prevZ,S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&li(a,h,l,u,c,f,S.x,S.y)&&at(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;v&&v.z>=p;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&li(a,h,l,u,c,f,v.x,v.y)&&at(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;S&&S.z<=x;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&li(a,h,l,u,c,f,S.x,S.y)&&at(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Pm(i,e,t){let n=i;do{const r=n.prev,s=n.next.next;!Gr(r,s)&&Nl(r,n,n.next,s)&&Vi(r,s)&&Vi(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),ki(n),ki(n.next),n=i=s),n=n.next}while(n!==i);return On(n)}function Lm(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Gm(o,a)){let l=Fl(o,a);o=On(o,o.next),l=On(l,l.next),Hi(o,e,t,n,r,s,0),Hi(l,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Dm(i,e,t,n){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*n,l=s<o-1?e[s+1]*n:i.length,c=Ul(i,a,l,n,!1),c===c.next&&(c.steiner=!0),r.push(Bm(c));for(r.sort(Im),s=0;s<r.length;s++)t=Um(r[s],t);return t}function Im(i,e){return i.x-e.x}function Um(i,e){const t=Nm(i,e);if(!t)return e;const n=Fl(t,i);return On(n,n.next),On(t,t.next)}function Nm(i,e){let t=e,n=-1/0,r;const s=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=s&&f>n&&(n=f,r=t.x<t.next.x?t:t.next,f===s))return r}t=t.next}while(t!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let h=1/0,u;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&li(o<c?s:n,o,l,c,o<c?n:s,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(s-t.x),Vi(t,i)&&(u<h||u===h&&(t.x>r.x||t.x===r.x&&Fm(r,t)))&&(r=t,h=u)),t=t.next;while(t!==a);return r}function Fm(i,e){return at(i.prev,i,e.prev)<0&&at(e.next,i,i.next)<0}function Om(i,e,t,n){let r=i;do r.z===0&&(r.z=Gs(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,zm(r)}function zm(i){let e,t,n,r,s,o,a,l,c=1;do{for(t=i,i=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,a--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,c*=2}while(o>1);return i}function Gs(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Bm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function li(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function Gm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Hm(i,e)&&(Vi(i,e)&&Vi(e,i)&&Vm(i,e)&&(at(i.prev,i,e.prev)||at(i,e.prev,e))||Gr(i,e)&&at(i.prev,i,i.next)>0&&at(e.prev,e,e.next)>0)}function at(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Gr(i,e){return i.x===e.x&&i.y===e.y}function Nl(i,e,t,n){const r=Tr(at(i,e,t)),s=Tr(at(i,e,n)),o=Tr(at(t,n,i)),a=Tr(at(t,n,e));return!!(r!==s&&o!==a||r===0&&br(i,t,e)||s===0&&br(i,n,e)||o===0&&br(t,i,n)||a===0&&br(t,e,n))}function br(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Tr(i){return i>0?1:i<0?-1:0}function Hm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Nl(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Vi(i,e){return at(i.prev,i,i.next)<0?at(i,e,i.next)>=0&&at(i,i.prev,e)>=0:at(i,e,i.prev)<0||at(i,i.next,e)<0}function Vm(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Fl(i,e){const t=new Hs(i.i,i.x,i.y),n=new Hs(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Wo(i,e,t,n){const r=new Hs(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function ki(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Hs(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function km(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class Fi{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Fi.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];Xo(e),qo(n,e);let o=e.length;t.forEach(Xo);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,qo(n,t[l]);const a=Am.triangulate(n,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Xo(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function qo(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class ci extends Qs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ci(e.radius,e.detail)}}class ea extends Ke{constructor(e=.5,t=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);const a=[],l=[],c=[],h=[];let u=e;const f=(t-e)/r,d=new R,g=new ce;for(let _=0;_<=r;_++){for(let m=0;m<=n;m++){const p=s+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<r;_++){const m=_*(n+1);for(let p=0;p<n;p++){const x=p+m,v=x,S=x+n+1,C=x+n+2,w=x+1;a.push(v,S,w),a.push(S,C,w)}}this.setIndex(a),this.setAttribute("position",new Fe(l,3)),this.setAttribute("normal",new Fe(c,3)),this.setAttribute("uv",new Fe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ea(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ur extends Ke{constructor(e=new Bs([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Fe(r,3)),this.setAttribute("normal",new Fe(s,3)),this.setAttribute("uv",new Fe(o,2));function c(h){const u=r.length/3,f=h.extractPoints(t);let d=f.shape;const g=f.holes;Fi.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const x=g[m];Fi.isClockWise(x)===!0&&(g[m]=x.reverse())}const _=Fi.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const x=g[m];d=d.concat(x)}for(let m=0,p=d.length;m<p;m++){const x=d[m];r.push(x.x,x.y,0),s.push(0,0,1),o.push(x.x,x.y)}for(let m=0,p=_.length;m<p;m++){const x=_[m],v=x[0]+u,S=x[1]+u,C=x[2]+u;n.push(v,S,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Wm(t,e)}static fromJSON(e,t){const n=[];for(let r=0,s=e.shapes.length;r<s;r++){const o=t[e.shapes[r]];n.push(o)}return new Ur(n,e.curveSegments)}}function Wm(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}class hi extends Ke{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new R,f=new R,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const x=[],v=p/n;let S=0;p===0&&o===0?S=.5/t:p===n&&l===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){const w=C/t;u.x=-e*Math.cos(r+w*s)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(r+w*s)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(w+S,1-v),x.push(c++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const v=h[p][x+1],S=h[p][x],C=h[p+1][x],w=h[p+1][x+1];(p!==0||o>0)&&d.push(v,S,w),(p!==n-1||l<Math.PI)&&d.push(S,C,w)}this.setIndex(d),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(_,3)),this.setAttribute("uv",new Fe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Nr extends Ke{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],l=[],c=[],h=new R,u=new R,f=new R;for(let d=0;d<=n;d++)for(let g=0;g<=r;g++){const _=g/r*s,m=d/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=r;g++){const _=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,p=(r+1)*(d-1)+g,x=(r+1)*d+g;o.push(_,m,x),o.push(m,p,x)}this.setIndex(o),this.setAttribute("position",new Fe(a,3)),this.setAttribute("normal",new Fe(l,3)),this.setAttribute("uv",new Fe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}const Yo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Xm{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}}const qm=new Xm;class Ol{constructor(e){this.manager=e!==void 0?e:qm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ol.DEFAULT_MATERIAL_NAME="__DEFAULT";class Ym extends Ol{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Yo.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Gi("img");function l(){h(),Yo.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class ta extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new _e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const ws=new tt,Zo=new R,Jo=new R;class zl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ys,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Zo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zo),Jo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jo),t.updateMatrixWorld(),ws.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ws),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ws)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const $o=new tt,Pi=new R,As=new R;class Zm extends zl{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ce(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Pi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Pi),As.copy(n.position),As.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(As),n.updateMatrixWorld(),r.makeTranslation(-Pi.x,-Pi.y,-Pi.z),$o.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($o)}}class Jm extends ta{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Zm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class $m extends zl{constructor(){super(new Sl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Km extends ta{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new $m}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class jm extends ta{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Qm extends Ke{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vs}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vs);const _n={FRACTAL:"fractal",PARTICLE:"particle",FLUID:"fluid",TOPOLOGY:"topology"},Xi=[];for(let i=0;i<14;i++){const e=i%4===3;Xi.push({id:`c1_${i}`,class:_n.FRACTAL,name:e?`Sacred Heart ${i+1}`:`Fractal Matrix ${i+1}`,color1:"#ff0055",color2:"#00ffff",color3:"#ff00ff",params:{recursion:3+i*.3,symmetry:i%7+2,equation:i}})}for(let i=0;i<12;i++)Xi.push({id:`c2_${i}`,class:_n.PARTICLE,name:`Chladni Swarm ${i+1}`,color1:"#ffffff",color2:"#00aaff",color3:"#ffaa00",params:{n:i%5+1,m:i%7+2,dispersion:.5,equation:i}});for(let i=0;i<10;i++)Xi.push({id:`c3_${i}`,class:_n.FLUID,name:`Bioluminescent Fluid ${i+1}`,color1:"#00ffcc",color2:"#0000ff",color3:"#aa00ff",params:{viscosity:.8,turbulence:1+i*.2,equation:i}});for(let i=0;i<8;i++)Xi.push({id:`c4_${i}`,class:_n.TOPOLOGY,name:`Quantum Topology ${i+1}`,color1:"#444444",color2:"#ff5500",color3:"#ff0000",params:{tension:1,peakSharpness:2+i*.5,equation:i}});const Ko=`
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,eg=`
uniform float uTime;
uniform float uAudioBass;
uniform float uTension;
uniform float uPeakSharpness;
uniform float uEquation;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Classic Perlin 3D Noise by Stefan Gustavson
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x); vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy); vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5; gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0); vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5; gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1); vec4 sz1 = step(gz1, vec4(0.0));
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
    vNormal = normal;
    
    vec3 p = position;
    int eq = int(mod(uEquation, 8.0));
    float disp = 0.0;
    
    if(eq == 0) disp = pow(abs(cnoise(vec3(p.xy * uTension, uTime * 0.5))), uPeakSharpness);
    else if(eq == 1) disp = sin(p.x * uTension) * cos(p.y * uTension) * pow(abs(cnoise(vec3(p.xy, uTime))), uPeakSharpness);
    else if(eq == 2) disp = abs(cnoise(vec3(length(p.xy) * uTension - uTime, p.x, p.y)));
    else if(eq == 3) disp = fract(cnoise(vec3(p.xy * uTension, uTime)) * 5.0) * 0.5;
    else if(eq == 4) disp = pow(abs(cnoise(vec3(p.x * p.y * 0.1 * uTension, p.x, uTime))), uPeakSharpness);
    else if(eq == 5) disp = sin(cnoise(vec3(p.xy * uTension, uTime)) * 10.0) * 0.5;
    else if(eq == 6) disp = abs(cnoise(vec3(p.xy * uTension, uTime))) * abs(cnoise(vec3(p.yx * uTension, uTime)));
    else disp = length(p.xy) * 0.1 * cnoise(vec3(p.xy * uTension, uTime));

    disp *= uAudioBass * 5.0;
    vec3 newPos = position + normal * disp;
    
    vPosition = newPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`,tg=`
uniform float uTime;
uniform float uAudioHighs;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uRecursion;
uniform float uSymmetry;
uniform float uEquation;

varying vec2 vUv;

float sdHeart(vec2 p) {
    p.x = abs(p.x);
    if(p.y+p.x>1.0) return sqrt(dot(p-vec2(0.25,0.75),p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
    return sqrt(min(dot(p-vec2(0.00,1.00),p-vec2(0.00,1.00)), dot(p-0.5*max(p.x+p.y,0.0),p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
}

void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);
    float a = atan(p.y, p.x);
    
    if (uSymmetry > 0.0) {
        a = mod(a, 6.28318 / uSymmetry);
        a = abs(a - 3.14159 / uSymmetry);
    }
    p = r * vec2(cos(a), sin(a));

    float d = 0.0;
    int eq = int(mod(uEquation, 14.0));
    
    if (eq == 3 || eq == 7 || eq == 11) {
        // Heart Variations
        vec2 hP = p * (2.0 + float(eq)*0.1) + vec2(0.0, 0.5);
        d = sdHeart(hP);
        if(eq == 7) d = abs(d) - 0.1;
        if(eq == 11) d = sin(d * 20.0 - uTime) * 0.1;
        d = sin(d * uRecursion * 10.0 - uTime * 2.0 + uAudioHighs);
    } else {
        // Fractal Variations
        for(float i = 1.0; i <= 10.0; i++) {
            if (i > uRecursion) break;
            
            if(eq == 0) p = abs(p) / dot(p,p) - vec2(0.5 + uAudioHighs * 0.1);
            else if(eq == 1) p = abs(p) / dot(p,p) - vec2(0.3 + sin(uTime)*0.1);
            else if(eq == 2) p = fract(p * 1.5) - 0.5;
            else if(eq == 4) p = abs(p) / dot(p,p) - vec2(0.1, 0.5 + uAudioHighs * 0.2);
            else if(eq == 5) p = vec2(p.x*p.x - p.y*p.y, 2.0*p.x*p.y) + vec2(0.3, 0.5);
            else if(eq == 6) p = abs(p) * 1.2 - vec2(0.2);
            else if(eq == 8) p = vec2(sin(p.x), cos(p.y)) * 1.5;
            else if(eq == 9) p = p / dot(p,p) - vec2(0.5);
            else if(eq == 10) p = abs(p) / dot(p,p) - vec2(sin(uTime), cos(uTime)) * 0.2;
            else if(eq == 12) p = fract(p * 2.0) - vec2(0.5);
            else if(eq == 13) p = abs(p) / dot(p,p) - vec2(0.7);

            d += length(p);
        }
        d = sin(d * 5.0 - uTime);
    }

    d = abs(d);
    d = 0.05 / d;
    
    vec3 col = mix(uColor1, uColor2, sin(d + uTime)*0.5+0.5);
    col = mix(col, uColor3, cos(r * 10.0 - uTime)*0.5+0.5);
    
    gl_FragColor = vec4(col * d, min(d, 1.0));
}
`,ng=`
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uEquation;
varying vec2 vUv;
varying vec3 vOffset;

void main() {
    float dist = length(vUv - 0.5);
    float alpha = smoothstep(0.5, 0.0, dist);
    
    int eq = int(mod(uEquation, 12.0));
    vec3 col = uColor1;
    
    // Vary color heavily based on equation and position
    if(eq == 0) col = mix(uColor1, uColor2, sin(vOffset.x * 0.1 + uTime)*0.5+0.5);
    else if(eq == 1) col = mix(uColor1, uColor2, cos(vOffset.y * 0.1)*0.5+0.5);
    else if(eq == 2) col = mix(uColor1, uColor2, length(vOffset)*0.05);
    else col = mix(uColor1, uColor2, alpha);

    gl_FragColor = vec4(col, alpha);
}
`,ig=`
uniform float uTime;
uniform float uAudioBass;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uViscosity;
uniform float uTurbulence;
uniform float uEquation;
varying vec2 vUv;

void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float len = length(p);
    
    int eq = int(mod(uEquation, 10.0));
    float noise = 0.0;
    
    if(eq == 0) noise = sin(p.x * 10.0 * uTurbulence + uTime) * cos(p.y * 10.0 * uTurbulence - uTime);
    else if(eq == 1) noise = sin(len * 20.0 * uTurbulence - uTime * 5.0);
    else if(eq == 2) noise = sin(atan(p.y, p.x) * 5.0 + uTime) * cos(len * 10.0);
    else if(eq == 3) noise = fract(len * 5.0 * uTurbulence - uTime);
    else if(eq == 4) noise = abs(sin(p.x * 5.0) * cos(p.y * 5.0));
    else if(eq == 5) noise = length(fract(p * 3.0) - 0.5);
    else if(eq == 6) noise = sin(p.x*p.x + p.y*p.y - uTime);
    else if(eq == 7) noise = cos(p.x*uTurbulence) + sin(p.y*uTurbulence);
    else if(eq == 8) noise = step(0.5, fract(len * 10.0 - uTime));
    else noise = sin(p.x * 15.0) * sin(p.y * 15.0) * sin(uTime);

    float d = len + noise * 0.1 * (uAudioBass + 0.5);
    
    float edge = smoothstep(uViscosity, uViscosity - 0.05, d);
    float glow = 0.05 / abs(d - uViscosity);
    
    vec3 col = mix(uColor1, uColor2, len);
    col += uColor3 * glow;
    
    gl_FragColor = vec4(col * edge, edge);
}
`,rg=`
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float diff = max(dot(vNormal, lightDir), 0.0);
    
    float h = vPosition.z;
    vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 2.0, h));
    col = mix(col, uColor3, smoothstep(2.0, 5.0, h));
    
    gl_FragColor = vec4(col * diff, 1.0);
}
`;class sg{constructor(e,t){this.parentGroup=e,this.camera=t,this.group=new Je,this.parentGroup.add(this.group),this.currentClass=null,this.currentMesh=null,this.currentMaterial=null,this.particles=null,this.sharedUniforms={uTime:{value:0},uAudioBass:{value:0},uAudioMids:{value:0},uAudioHighs:{value:0},uColor1:{value:new _e("#ffffff")},uColor2:{value:new _e("#ffffff")},uColor3:{value:new _e("#ffffff")},uEquation:{value:0},uCustom1:{value:0},uCustom2:{value:0}},this.initGeometries()}initGeometries(){this.planeGeo=new Vt(25,25,1,1),this.highResPlaneGeo=new Vt(25,25,256,256),this.particleGeo=new Ke}setConfig(e){const t=Xi.find(n=>n.id===e);if(t){for(;this.group.children.length>0;)this.group.remove(this.group.children[0]);if(this.currentMaterial&&this.currentMaterial.dispose(),this.particles&&(this.particles.geometry.dispose(),this.particles=null),this.currentClass=t.class,this.sharedUniforms.uColor1.value.set(t.color1),this.sharedUniforms.uColor2.value.set(t.color2),this.sharedUniforms.uColor3.value.set(t.color3),this.sharedUniforms.uEquation.value=t.params.equation,t.class===_n.FRACTAL)this.currentMaterial=new ct({vertexShader:Ko,fragmentShader:tg,uniforms:{...this.sharedUniforms,uRecursion:{value:t.params.recursion},uSymmetry:{value:t.params.symmetry}},transparent:!0,blending:qe,depthWrite:!1}),this.currentMesh=new We(this.planeGeo,this.currentMaterial),this.group.add(this.currentMesh);else if(t.class===_n.PARTICLE){const r=new Qm,s=new Vt(.05,.05);r.index=s.index,r.attributes=s.attributes;const o=new Float32Array(1e5*3);for(let a=0;a<1e5;a++)o[a*3+0]=(Math.random()-.5)*25,o[a*3+1]=(Math.random()-.5)*25,o[a*3+2]=0;r.setAttribute("offset",new Os(o,3)),this.currentMaterial=new ct({vertexShader:`
                    attribute vec3 offset;
                    uniform float uTime;
                    uniform float uAudioBass;
                    uniform float uEquation;
                    varying vec2 vUv;
                    varying vec3 vOffset;
                    void main() {
                        vUv = uv;
                        vOffset = offset;
                        vec3 pos = offset;
                        
                        int eq = int(mod(uEquation, 12.0));
                        float r = length(pos.xy);
                        float a = atan(pos.y, pos.x);
                        
                        // Distinct Particle Physics
                        if(eq == 0) pos.z += sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 - uTime) * uAudioBass;
                        else if(eq == 1) { pos.x += sin(r - uTime)*uAudioBass; pos.y += cos(r - uTime)*uAudioBass; }
                        else if(eq == 2) pos.z += sin(a * 5.0 + uTime) * uAudioBass * 2.0;
                        else if(eq == 3) pos.z += (sin(pos.x * 5.0) + cos(pos.y * 5.0)) * uAudioBass;
                        else if(eq == 4) pos.xy *= 1.0 + sin(uTime * 2.0 + r) * 0.1 * uAudioBass;
                        else pos.z += fract(pos.x * pos.y * 0.1 - uTime) * uAudioBass * 3.0;

                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position + pos, 1.0);
                    }
                `,fragmentShader:ng,uniforms:this.sharedUniforms,transparent:!0,blending:qe,depthWrite:!1}),this.particles=new We(r,this.currentMaterial),this.group.add(this.particles)}else t.class===_n.FLUID?(this.currentMaterial=new ct({vertexShader:Ko,fragmentShader:ig,uniforms:{...this.sharedUniforms,uViscosity:{value:t.params.viscosity},uTurbulence:{value:t.params.turbulence}},transparent:!0,blending:qe}),this.currentMesh=new We(this.planeGeo,this.currentMaterial),this.group.add(this.currentMesh)):t.class===_n.TOPOLOGY&&(this.currentMaterial=new ct({vertexShader:eg,fragmentShader:rg,uniforms:{...this.sharedUniforms,uTension:{value:t.params.tension},uPeakSharpness:{value:t.params.peakSharpness}},wireframe:!1}),this.currentMesh=new We(this.highResPlaneGeo,this.currentMaterial),this.currentMesh.rotation.x=-Math.PI/3,this.group.add(this.currentMesh))}}update(e,t){this.sharedUniforms.uTime.value+=e,t&&(this.sharedUniforms.uAudioBass.value=t.bass,this.sharedUniforms.uAudioMids.value=t.mids,this.sharedUniforms.uAudioHighs.value=t.highs)}setColor(e,t){e===1&&this.sharedUniforms.uColor1.value.set(t),e===2&&this.sharedUniforms.uColor2.value.set(t),e===3&&this.sharedUniforms.uColor3.value.set(t)}setCustomUniform(e,t){this.currentMaterial&&this.currentMaterial.uniforms[e]&&(this.currentMaterial.uniforms[e].value=t)}}let fe=null;class ag{constructor(e,t={}){this.canvas=e,this.activeModes=t.activeModes||new Set,this.mode=t.mode||"none",this.mindWaveMode=t.mindWaveMode!==void 0?t.mindWaveMode:!0,this.galaxySunStyle=t.galaxySunStyle||"sun",this.currentCymaticData={name:"Fundamental Zenith",n:1,m:1,energy:.2},this.cymaticsHistory=[],this.cymaticsHistoryIndex=-1,this._cymaticDriftOffset=Math.random()*1e3,this.cyberConfig={logicMode:t.cyberLogicMode||"matrix",customText:t.cyberCustomText||"WELCOME",angle:t.cyberAngle||0,speed:t.cyberSpeedMultiplier||1,length:1,color:"#00FF41",rainbow:!0},this.matrixConfig={logicMode:t.matrixLogicMode||"interstellar",customText:t.matrixCustomText||"MINDWAVE",angle:0,speed:1,length:1,color:"#00FF41",rainbow:!1},this.initialized=!1,this._rainbowEnabled=t.rainbowEnabled||!1,this.isVisualizer3D=!0,this.overlayCanvas=document.getElementById("cyberCanvas"),this.overlayCtx=this.overlayCanvas?this.overlayCanvas.getContext("2d",{alpha:!0}):null,this.overlayCanvas&&(this.resizeOverlayCanvas(),window.addEventListener("resize",()=>this.resizeOverlayCanvas())),this.matrixCyberStreams=[],this.currentCyberAngle=t.cyberAngle!==void 0?t.cyberAngle:0,this.cyberColorCustomized=!1;try{const r=localStorage.getItem("cyberThemeHistory");this.themeHistory=r?JSON.parse(r):[],this.lastCyberFamily=localStorage.getItem("cyberLastFamily")||""}catch{this.themeHistory=[],this.lastCyberFamily=""}this.currentLogoOpacity=.8,this.targetLogoOpacity=.8,fe=this,this.themeType=document.body.dataset.themeType||"dark";const n=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);this.batterySaver=t.batterySaver!==void 0?t.batterySaver:n,this.isLowPower=this.batterySaver||localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode"),this.lastFrameRenderTime=0,this.targetFPS=this.isLowPower?30:60,this.vibrationEnabled=typeof Ne<"u"&&Ne.visualVibration!==void 0?Ne.visualVibration:t.visualVibration!==void 0?t.visualVibration:!1,this._fpsRingBuffer=new Float64Array(60),this._fpsRingIndex=0,this._fpsRingCount=0,this.lastLodDegradation=0,this.currentLodLevel="high",this._tempColor=new _e,this._logoRenderCanvas=null,this.sphereGroup=new Je,this.particleGroup=new Je,this.lightspeedGroup=new Je,this.lavaGroup=new Je,this.fireplaceGroup=new Je,this.rainforestGroup=new Je,this.zenGardenGroup=new Je,this.oceanGroup=new Je,this.wavesGroup=new Je,this.cyberGroup=new Je,this.boxGroup=new Je,this.dragonGroup=new Je,this.galaxyGroup=new Je,this.mandalaGroup=new Je,this.cymaticsGroup=new Je,this.snowflakeGroup=new Je,this._snowData=null;try{this.scene=new um,[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup].forEach(o=>this.scene.add(o)),this.camera=new zt(75,e.width/e.height,.1,1e3),this.renderer=new Rl({canvas:e,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(0,0),this.renderer.setSize(e.clientWidth,e.clientHeight);const s=this.isLowPower?1:2;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,s)),this.cymaticsEngine=new sg(this.cymaticsGroup,this.camera),this.textures={},this.customColors={},this.customColor=null,this._isRendering=!1,this._freqDataArray=null,this.initEnvironment(),this.camera.position.z=5,this.handleLayoutChange=this.handleLayoutChange.bind(this),window.addEventListener("resize",()=>{this.resize(),this.handleLayoutChange()}),window.addEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode=()=>{this.currentLodLevel!=="low"&&(console.log("[Visualizer] Safe Mode: Dropping LOD to 'low'."),this.degradeLOD(),this.degradeLOD())},window.addEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange=()=>{document.hidden?console.log("[Visualizer] Tab hidden, pausing render loop to save battery."):(console.log("[Visualizer] Tab visible, resuming render loop."),this.lastTime=performance.now()*.001,this.active!==!1&&this.initialized&&this.render(Ne.analyserLeft,Ne.analyserRight))},document.addEventListener("visibilitychange",this._boundVisibilityChange),this._boundContextLost=o=>{o.preventDefault(),console.warn("[Visualizer] WebGL context LOST. Halting render loop."),this.active=!1,Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null)},e.addEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored=()=>{console.log("[Visualizer] WebGL context RESTORED. Reinitializing...");try{this.initialized=!1,this._freqDataArray=null,this.initEnvironment(),this.updateVisibility(),this.initialized=!0,this.active=!0,this.lastTime=performance.now()*.001,Ne.animationId&&cancelAnimationFrame(Ne.animationId),this._isRendering=!1,this.render(Ne.analyserLeft,Ne.analyserRight)}catch(o){console.error("[Visualizer] Failed to recover from context loss:",o)}},e.addEventListener("webglcontextrestored",this._boundContextRestored),this.resize(),setTimeout(this.handleLayoutChange,100),this._boundThemeChange=o=>{if(o.detail&&o.detail.type){const a=o.detail.type;this.themeType!==a&&(this.themeType=a,console.log(`[Visualizer] Theme type changed to: ${a}. Updating logo texture.`),this.updateLogoTexture())}},window.addEventListener("themeChanged",this._boundThemeChange),this.speedMultiplier=1,this.brightnessMultiplier=1,this.lastTime=performance.now()*.001,this.simTime=0,this.targetFPS=60,this.lastFrameRenderTime=0,this.active=!0,this.updateVisibility(),this.initialized=!0,this.initOverlayLogo(),window.viz3D=this,console.log("[Viz] Visualizer3D Hard-Linked to Global Scope.")}catch(r){console.error("Three.js Init Failed:",r),this.initialized=!1}}resize(){if(!this.renderer||!this.canvas||!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.handleLayoutChange()}handleLayoutChange(){!this.renderer||!this.camera||(this.camera.clearViewOffset(),console.log("[Visualizer] Layout update: Centered background mode (Full Window)"))}resizeOverlayCanvas(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight)}generateCyberStyle(){const e=this.overlayCanvas,t=this.overlayCtx;if(!e||!t)return;this.matrixCyberStreams=[];const n=Math.max(11,Math.min(21,Math.floor(e.width/50)));this.isLowPower=localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode");let r=Math.ceil(e.width/n);this.isLowPower||(r*=1.5);let s=window.getCurrentTheme?window.getCurrentTheme():{color:"#2dd4bf"};this.resizeOverlayCanvas(),this.cyberColorCustomized=!1;const o=[{name:"System Yellow",color:"#FFFF00",family:"yellow"},{name:"Neon Pink",color:"#FF1493",family:"pink"},{name:"Chrome Static",color:"#C0C0C0",family:"mono"},{name:"Royal Data",color:"#4169E1",family:"blue"},{name:"White Noise",color:"#FFFFFF",family:"mono"},{name:"Cyan Future",color:"#00FFFF",family:"blue"},{name:"Lime Access",color:"#32CD32",family:"green"},{name:"Purple Haze",color:"#800080",family:"purple"},{name:"Emerald Link",color:"#50C878",family:"green"},{name:"Ice Blue",color:"#A5F2F3",family:"blue"},{name:"sentAIent Blue",color:"#60A9FF",family:"blue"},{name:"Rainbow Surge",color:"rainbow",family:"rainbow"}],a=this.lastCyberFamily||"";let l=o.filter(d=>!this.themeHistory.includes(d.name));const c=l.filter(d=>d.family!==a);c.length>0&&(l=c);let h=l;if(h.length===0){const d=this.themeHistory[this.themeHistory.length-1];h=o.filter(g=>g.name!==d)}const u=h[Math.floor(Math.random()*h.length)];this.themeHistory.push(u.name),this.themeHistory.length>5&&this.themeHistory.shift(),this.lastCyberFamily=u.family;try{localStorage.setItem("cyberThemeHistory",JSON.stringify(this.themeHistory)),localStorage.setItem("cyberLastFamily",this.lastCyberFamily)}catch(d){console.warn("LocalStorage failed",d)}this.cyberSpeedMultiplier===void 0&&(this.cyberSpeedMultiplier=.2),this.cyberLengthMultiplier===void 0&&(this.cyberLengthMultiplier=.7);const f=document.getElementById("cyberRainbowToggle");if(f&&this.cyberRainbowMode===void 0&&(this.cyberRainbowMode=!0,this.cyberConfig.rainbow=!0,f.checked=!0),!this.cyberRainbowMode&&s.color!=="rainbow"){this.cyberColor=s.color;const d=document.getElementById("cyberColorPicker");d&&(d.value=this.cyberColor)}for(let d=0;d<r;d++){const g=Math.random(),_=Math.floor(8+g*11),m=(2+g*8+Math.random()*2)*this.cyberSpeedMultiplier;this.matrixCyberStreams.push({x:d*n,y:Math.random()*this.overlayCanvas.height*1.5-this.overlayCanvas.height*.5,baseSpeed:m,opacity:.2+g*.8,size:_,chars:[],color:s.color!=="rainbow"?s.color:"#FFFFFF"})}this.updateCyberStrings(),this.matrixCyberStreams.sort((d,g)=>d.size-g.size)}renderCyberCyber(){const e=this.activeModes.has("cyber");if(!this.overlayCtx||!this.matrixCyberStreams||!e)return;const t=this.overlayCtx,n=this.overlayCanvas;t.clearRect(0,0,n.width,n.height);const r=this.activeModes.size>1;t.fillStyle=r?"rgba(0, 0, 0, 0.4)":"rgba(0, 0, 0, 0.85)",t.fillRect(0,0,n.width,n.height),t.save(),t.textAlign="center";const s=this.cyberConfig,o=s.speed||1,a=s.length||1;s.angle!==0&&(t.translate(n.width/2,n.height/2),t.rotate(s.angle*Math.PI/180),t.translate(-n.width/2,-n.height/2));const l=20,c=Date.now()*.1;t.textBaseline="middle";let h=-1;this.matrixCyberStreams.forEach((u,f)=>{u.y+=u.baseSpeed*o;let d=Math.max(3,Math.floor(l*a));(this.isLowPower||this.currentLodLevel==="low")&&(d=Math.floor(d*.4)),u.y-d*u.size>n.height*1.5&&(u.y=0);const g="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";u.size!==h&&(t.font=`${u.size}px monospace`,h=u.size);const _=this.isLowPower&&this.currentLodLevel==="low"?2:1;for(let m=0;m<d&&m<u.chars.length;m+=_){!u.isTextMode&&Math.random()<.02&&(u.chars[m]=g.charAt(Math.floor(Math.random()*g.length)));const p=u.chars[m],x=u.y-m*u.size;if(x<-u.size*2||x>n.height*1.5)continue;const v=1-m/d,S=Math.pow(v,.4)*(u.opacity*1.2);if(t.globalAlpha=Math.min(1,S),this.cyberRainbowMode){const C=(c+f*15+m*5)%360;t.fillStyle=`hsl(${C}, 100%, 60%)`}else t.fillStyle=u.color||this.cyberColor;t.fillText(p,u.x,x)}}),t.shadowBlur=0,t.globalAlpha=1,t.restore()}initSphere(){var o;const e=new ci(2,2),t=new Pt({color:6334975,wireframe:!0,transparent:!0,opacity:.5});this.sphere=new We(e,t);const n=new ci(1.8,1),r=new Pt({color:6334975,transparent:!0,opacity:.1,blending:qe});this.core=new We(n,r),this.sphereGroup.add(this.sphere),this.sphereGroup.add(this.core),this.sphereGroup.visible=!1;const s=((o=this.customColors)==null?void 0:o.sphere)||this.customColor;s&&(this.sphere.material.color.copy(s),this.core.material.color.copy(s))}initLightspeed(){const t=new Ke,n=new Float32Array(2e3*3);for(let r=0;r<2e3*3;r++)n[r]=(Math.random()-.5)*80;t.setAttribute("position",new ut(n,3)),this.lightspeedMaterial=new ct({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new _e(3003583)},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:qe,depthWrite:!1}),this.lightspeed=new an(t,this.lightspeedMaterial),this.lightspeedGroup.add(this.lightspeed)}initParticles(){const e=this.batterySaver?400:1e3,t=new Ke,n=new Float32Array(e*3),r=new Float32Array(e*3);for(let s=0;s<e;s++){const o=s*3;n[o]=(Math.random()-.5)*60,n[o+1]=(Math.random()-.5)*60,n[o+2]=(Math.random()-.5)*80;const a=Math.random();a<.3?(r[o]=.4,r[o+1]=.7,r[o+2]=1):a<.6?(r[o]=.3,r[o+1]=.9,r[o+2]=.95):a<.85?(r[o]=.6,r[o+1]=.4,r[o+2]=1):(r[o]=.9,r[o+1]=.9,r[o+2]=1)}t.setAttribute("position",new ut(n,3)),t.setAttribute("color",new ut(r,3)),this.particleMaterial=new ct({uniforms:{uTime:{value:0},uSpeed:{value:1},uSize:{value:.4},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:qe,depthWrite:!1}),this.particles=new an(t,this.particleMaterial),this.particleGroup.add(this.particles),this.particleGroup.visible=!1}initBox(){var h;this.boxOuter=new Je;const e=new Ts(new Sn(3,3,3)),t=new si({color:16777215,transparent:!0,opacity:.9,blending:qe}),n=new si({color:3900150,transparent:!0,opacity:.5,blending:qe});this.boxOuter.add(new Ci(e,t));for(let u=1;u<=3;u++){const f=new Ci(e,n);f.scale.setScalar(1+u*.012),this.boxOuter.add(f)}const r=new Ts(new Sn(2,2,2)),s=new si({color:14742270,transparent:!0,opacity:.8,blending:qe}),o=new si({color:6333946,transparent:!0,opacity:.4,blending:qe});this.boxInner=new Je,this.boxInner.add(new Ci(r,s));for(let u=1;u<=2;u++){const f=new Ci(r,o);f.scale.setScalar(1+u*.015),this.boxInner.add(f)}const a=new Ts(new Sn(3.05,3.05,3.05)),l=new si({color:9684477,transparent:!0,opacity:.8,blending:qe});this.boxEdges=new Ci(a,l),this.boxGroup.add(this.boxOuter),this.boxGroup.add(this.boxInner),this.boxGroup.add(this.boxEdges),this.boxGroup.visible=!1;const c=((h=this.customColors)==null?void 0:h.box)||this.customColor;c&&(this.boxOuter.children.forEach(u=>u.material.color.copy(c)),this.boxInner.children.forEach(u=>u.material.color.copy(c)),this.boxEdges&&this.boxEdges.material&&this.boxEdges.material.color.copy(c))}initDragon(){var f;this.dragonDummy=new dt,this.dragonLength=80;const e=new ci(.8,1),t=new Pt({color:15680580,wireframe:!0,transparent:!0,opacity:.8,blending:qe}),n=new ci(.5,1),r=new Pt({color:16096779,wireframe:!1,transparent:!0,opacity:.6,blending:qe});this.dragonBodyInstanced=new Io(e,t,this.dragonLength),this.dragonGlowInstanced=new Io(n,r,this.dragonLength);const s=new Ni(1.5,3.5,5);s.rotateX(Math.PI/2);const o=new Pt({color:16638023,wireframe:!0,transparent:!0,opacity:.9,blending:qe});this.dragonHead=new We(s,o),this.dragonPearlGroup=new Je;const a=new hi(1,16,16),l=new Pt({color:3718648,wireframe:!1,transparent:!0,opacity:.9,blending:qe}),c=new hi(1.3,16,16),h=new Pt({color:8246268,wireframe:!0,transparent:!0,opacity:.5,blending:qe});this.dragonPearl=new We(a,l),this.dragonPearlHalo=new We(c,h),this.dragonPearlGroup.add(this.dragonPearl),this.dragonPearlGroup.add(this.dragonPearlHalo),this.dragonGroup.add(this.dragonBodyInstanced),this.dragonGroup.add(this.dragonGlowInstanced),this.dragonGroup.add(this.dragonHead),this.dragonGroup.add(this.dragonPearlGroup),this.dragonGroup.visible=!1;const u=((f=this.customColors)==null?void 0:f.dragon)||this.customColor;u&&this.updateDragonColor(u)}updateGalaxyColor(e){if(this.galaxySunMesh&&this.galaxySunMesh.traverse(t=>{t.isMesh&&t.material&&t.material.color.copy(e)}),this.galaxyStars&&this.galaxyStars.geometry){const t={};e.getHSL(t);const n=(t.h+.5)%1,r=this.galaxyStars.geometry.getAttribute("color");if(r){const s=r.count,o=this._tempColor;for(let a=0;a<s;a++){const l=a/s,c=l<.2?.8:l<.5?.6:.4+Math.random()*.15,h=.6+Math.random()*.3;o.setHSL(n,h,c),r.setXYZ(a,o.r,o.g,o.b)}r.needsUpdate=!0}}}updateDragonColor(e){if(!this.dragonBodyInstanced)return;this.dragonBodyInstanced.material.color.copy(e),this.dragonHead.material.color.copy(e);const t={};e.getHSL(t);const n=(t.h+.5)%1,r=new _e().setHSL(n,t.s,t.l);this.dragonGlowInstanced.material.color.copy(r)}initGalaxy(){const e=this.batterySaver?500:1500,t=new Ke,n=[],r=[],s=[];for(let l=0;l<e;l++){const c=l/e*Math.PI*10,h=2.5+l/e*20+Math.random()*2,u=l%4*(Math.PI*2/4),f=Math.max(.5,l/e*4),d=Math.cos(c+u)*h+(Math.random()-.5)*f,g=(Math.random()-.5)*1.5,_=Math.sin(c+u)*h+(Math.random()-.5)*f;n.push(d,g,_);const m=l/e;m<.2?r.push(1,.95,.7):m<.5?r.push(.7+Math.random()*.3,.8,1):r.push(.4+Math.random()*.2,.3+Math.random()*.3,.8+Math.random()*.2),s.push(Math.random()<.05?.4+Math.random()*.3:.08+Math.random()*.15)}t.setAttribute("position",new Fe(n,3)),t.setAttribute("color",new Fe(r,3)),t.setAttribute("size",new Fe(s,1));const o=this.createStarTexture(),a=new Ar({size:.25,vertexColors:!0,map:o,transparent:!0,opacity:.9,blending:qe,depthWrite:!1,sizeAttenuation:!0});this.galaxyStars=new an(t,a),this.galaxyGroup.add(this.galaxyStars),this.galaxySunStyle=this.galaxySunStyle||"sun",this.createGalaxySun(this.galaxySunStyle),this.galaxyGroup.visible=!1}createGalaxySun(e){this.galaxySunMesh&&(this.galaxyGroup.remove(this.galaxySunMesh),this.galaxySunMesh=null),this.galaxySunMesh=new Je;const t=new Pt({color:4892415,transparent:!0,opacity:.85,blending:qe,depthWrite:!1,side:xt}),n=new Je;if(e==="sun2"){const r=t.clone();r.side=cn;const s=new Nr(1.5,.25,16,64);n.add(new We(s,r));const o=8,a=new Ni(.4,2.7,4);a.translate(0,2.7/2,0);const l=new Ni(.2,1.7,4);l.translate(0,1.7/2,0);for(let c=0;c<o;c++){const h=c/o*Math.PI*2,u=new We(a,r);u.rotation.z=-h,u.position.set(Math.sin(h)*1.5,Math.cos(h)*1.5,0),n.add(u);const f=h+Math.PI/o,d=new We(l,r);d.rotation.z=-f,d.position.set(Math.sin(f)*1.5,Math.cos(f)*1.5,0),n.add(d)}}else if(e==="sun3"){const r={uTime:{value:0},uColor:{value:t.color},uBassIntt:{value:0}};this.galaxySunUniforms=r;const s=`
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
            `,a=new ct({vertexShader:s,fragmentShader:o,uniforms:r,transparent:!0,blending:qe,depthWrite:!1,side:xt}),l=new hi(2,64,64),c=new We(l,a);n.add(c);const h=new Pt({color:t.color,transparent:!0,opacity:.15,blending:qe,depthWrite:!1,side:Dt}),u=new hi(3,32,32);n.add(new We(u,h))}else{const r=new Nr(1.5,.12,8,64);n.add(new We(r,t));const s=8;for(let o=0;o<s;o++){const a=o/s*Math.PI*2,l=new Bs;l.moveTo(-.4,0),l.lineTo(.4,0),l.lineTo(0,2.7),l.lineTo(-.4,0);const c=new Ur(l),h=new We(c,t);h.rotation.z=-a,h.position.set(Math.sin(a)*1.5,Math.cos(a)*1.5,0),n.add(h);const u=a+Math.PI/s,f=new Bs;f.moveTo(-.2,0),f.lineTo(.2,0),f.lineTo(0,1.7),f.lineTo(-.2,0);const d=new Ur(f),g=new We(d,t);g.rotation.z=-u,g.position.set(Math.sin(u)*1.5,Math.cos(u)*1.5,0),n.add(g)}}this.galaxySunMesh.add(n),this.galaxySunMesh.position.set(0,0,.1),this.galaxyGroup.add(this.galaxySunMesh)}setGalaxySunStyle(e){e!=="sun"&&e!=="sun2"&&e!=="sun3"||(this.galaxySunStyle=e,this.galaxyGroup&&this.galaxyGroup.children.length>0&&this.createGalaxySun(e))}setGalaxySunRotation(e,t){e==="x"&&(this.sunRotationSpeedX=parseFloat(t)),e==="y"&&(this.sunRotationSpeedY=parseFloat(t)),e==="z"&&(this.sunRotationSpeedZ=parseFloat(t))}createStarTexture(){if(this.textures.star)return this.textures.star;const e=64,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),r=e/2,s=e/2;n.clearRect(0,0,e,e);const o=n.createRadialGradient(r,s,0,r,s,e/2);return o.addColorStop(0,"rgba(255, 255, 255, 1.0)"),o.addColorStop(.1,"rgba(255, 255, 240, 0.8)"),o.addColorStop(.25,"rgba(255, 255, 200, 0.3)"),o.addColorStop(.5,"rgba(200, 200, 255, 0.1)"),o.addColorStop(1,"rgba(100, 100, 255, 0)"),n.fillStyle=o,n.fillRect(0,0,e,e),n.fillStyle="rgba(255, 255, 255, 0.6)",n.beginPath(),n.moveTo(0,s-1),n.lineTo(r,s-.5),n.lineTo(e,s-1),n.lineTo(e,s+1),n.lineTo(r,s+.5),n.lineTo(0,s+1),n.closePath(),n.fill(),n.beginPath(),n.moveTo(r-1,0),n.lineTo(r-.5,s),n.lineTo(r-1,e),n.lineTo(r+1,e),n.lineTo(r+.5,s),n.lineTo(r+1,0),n.closePath(),n.fill(),n.beginPath(),n.arc(r,s,2,0,Math.PI*2),n.fillStyle="rgba(255, 255, 255, 1.0)",n.fill(),this.textures.star=new Ri(t),this.textures.star}initMandala(){var s;this.mandalaRings=[];const e=[2450411,15357964,3900150,16347926,12573694];for(let o=0;o<5;o++){const a=1.2+o*.8,l=6+o*6,c=new ea(a-.05,a+.05,l),h=new Pt({color:e[o],side:xt,transparent:!0,opacity:.4-o*.05,blending:qe}),u=new We(c,h);u.userData={speed:(.01+o*.005)*(o%2===0?1:-1),segments:l},this.mandalaRings.push(u),this.mandalaGroup.add(u)}const t=new Ks(.3,32),n=new Pt({color:16347926,transparent:!0,opacity:.6,blending:qe});this.mandalaCenter=new We(t,n),this.mandalaGroup.add(this.mandalaCenter),this.mandalaGroup.visible=!1;const r=(s=this.customColors)==null?void 0:s.mandala;r&&(this.mandalaRings.forEach(o=>o.material.color.copy(r)),this.mandalaCenter.material.color.copy(r))}createSnowflakeTexture(){if(this.textures.snowflake)return this.textures.snowflake;const e=128,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),r=e/2,s=e/2;n.clearRect(0,0,e,e);const o=n.createRadialGradient(r,s,0,r,s,e*.5);o.addColorStop(0,"rgba(200,230,255,0.5)"),o.addColorStop(.4,"rgba(180,220,255,0.15)"),o.addColorStop(1,"rgba(150,200,255,0)"),n.fillStyle=o,n.fillRect(0,0,e,e),n.strokeStyle="rgba(220,240,255,1.0)",n.lineCap="round";for(let a=0;a<6;a++){const l=a/6*Math.PI*2;n.save(),n.translate(r,s),n.rotate(l),n.lineWidth=2.5,n.beginPath(),n.moveTo(0,0),n.lineTo(0,-52),n.stroke();const c=[{d:18,len:14,angle:Math.PI/4},{d:32,len:20,angle:Math.PI/4},{d:46,len:10,angle:Math.PI/5}];n.lineWidth=1.5,c.forEach(({d:h,len:u,angle:f})=>{[1,-1].forEach(d=>{n.beginPath(),n.moveTo(0,-h),n.lineTo(d*u*Math.cos(Math.PI/2-f),-h-u*Math.sin(Math.PI/2-f)),n.stroke()})}),n.restore()}n.beginPath();for(let a=0;a<6;a++){const l=a/6*Math.PI*2-Math.PI/6,c=r+Math.cos(l)*4,h=s+Math.sin(l)*4;a===0?n.moveTo(c,h):n.lineTo(c,h)}return n.closePath(),n.fillStyle="rgba(255, 255, 255, 0.8)",n.fill(),this.textures.snowflake=new Ri(t),this.textures.snowflake}initSnowflake(){for(;this.snowflakeGroup.children.length>0;){const d=this.snowflakeGroup.children[0];this.snowflakeGroup.remove(d),d.geometry&&d.geometry.dispose(),d.material&&d.material.dispose()}this._snowData=null;const e=700,t=new Float32Array(e*3),n=new Float32Array(e),r=new Float32Array(e),s=new Float32Array(e),o=new Float32Array(e),a=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){const g=d*3;t[g]=(Math.random()-.5)*80,t[g+1]=(Math.random()-.5)*60,t[g+2]=-40+Math.random()*35;const _=(t[g+2]+40)/35;n[d]=1.5+_*8,r[d]=.2+_*.6,s[d]=Math.random()*Math.PI*2,o[d]=.015+Math.random()*.04+_*.03,a[d]=.01+Math.random()*.02,l[d]=.4+Math.random()*.8}const c=new Ke;c.setAttribute("position",new ut(t,3)),c.setAttribute("aSize",new ut(n,1)),c.setAttribute("aOpacity",new ut(r,1));const h=this.createSnowflakeTexture(),u=new ct({uniforms:{uTexture:{value:h},uColor:{value:this.customColor?this.customColor.clone():new _e(10875883)},uIntensity:{value:0},uSizeMultiplier:{value:1},uGlowAmount:{value:.5}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:qe}),f=new an(c,u);this.snowflakeGroup.add(f),this._snowData={count:e,positions:t,phases:s,speeds:o,drifts:a,driftFreqs:l,points:f,material:u,spinMeshes:[],spinSpeeds:[]},console.log("[Viz] ❄️ Real snowfall initialized —",e,"crystals")}setSnowSize(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uSizeMultiplier.value=Math.max(.2,Math.min(4,e)),console.log("[Viz] Snow Size Override:",e))}setSnowGlow(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uGlowAmount.value=Math.max(0,Math.min(1,e)),console.log("[Viz] Snow Glow Override:",e))}static get CYMATIC_PATTERNS(){return[]}initCymatics(){console.log("[Cymatics] Engine gutted — awaiting rebuild")}setCymaticPatternByIndex(e){}setCymaticIntensity(e){}setCymaticHarmonics(e){}setCymaticColor(e){}setCymaticColor2(e){}setCymaticColor3(e){}setCymaticFreq(e){}setCymaticTimer(e){}applyCymatic(e){}nextCymatic(){}prevCymatic(){}initLava(){var o;this.lavaBlobs=[];const e=16;this.lavaUniforms={uBlobs:{value:[]},uColor:{value:new _e(((o=Ne.visualColors)==null?void 0:o.lava)||16737792)},uSecondaryColor:{value:new _e(16755200)},uTime:{value:0},uIntensity:{value:0},uResolution:{value:new ce(window.innerWidth,window.innerHeight)}};for(let a=0;a<e;a++)this.lavaUniforms.uBlobs.value.push(new it(0,-100,0,0));const t=new ct({uniforms:this.lavaUniforms,vertexShader:`
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
            `,transparent:!0,blending:qe,depthWrite:!1,side:xt}),n=new Vt(100,100),r=new We(n,t);r.position.z=-5,[{count:5,minSize:1,maxSize:1.5},{count:7,minSize:1.5,maxSize:2.2},{count:4,minSize:2.2,maxSize:3.5}].forEach(a=>{for(let l=0;l<a.count;l++){const c=a.minSize+Math.random()*(a.maxSize-a.minSize),h=["heating","rising","cooling","falling"],u=h[Math.floor(Math.random()*h.length)],f=-18+Math.random()*4,d=18+Math.random()*4;let g=0,_=.5;u==="heating"?(g=f,_=Math.random()*.5):u==="rising"?(g=f+Math.random()*(d-f),_=.8+Math.random()*.2):u==="cooling"?(g=d,_=1-Math.random()*.3):u==="falling"&&(g=d-Math.random()*(d-f),_=.2+Math.random()*.3),this.lavaBlobs.push({position:new R((Math.random()-.5)*12,g,(Math.random()-.5)*6),material:{uniforms:{uTemp:{value:0},uIntensity:{value:0},uTime:{value:0}}},userData:{baseSize:c,state:u,temperature:_,floatMin:f,floatMax:d,heatRate:.15+Math.random()*.3,coolRate:.15+Math.random()*.3,riseSpeed:(.04+Math.random()*.05)/(c*.5),fallSpeed:(.05+Math.random()*.05)/(c*.5),driftPhase:Math.random()*Math.PI*2,driftSpeed:.01+Math.random()*.02}})}}),this.lavaGroup.add(r),this.lavaGroup.visible=!1,console.log("[Visualizer] Thermal Fluid Dynamics (Lava V2) globally initialized.")}initFireplace(){const n=new Vt(100,80);this.fireMaterial=this.createFireShader(),this.fireMesh=new We(n,this.fireMaterial),this.fireMesh.position.set(0,0,-15),this.fireMesh.renderOrder=10,this.fireplaceGroup.add(this.fireMesh),this.fireLight=new Jm(16737792,5,200),this.fireLight.position.set(0,0,30),this.fireplaceGroup.add(this.fireLight);const r=650,s=new Ke,o=[];for(let a=0;a<r;a++)o.push((Math.random()-.5)*100,-20+Math.random()*40,-15+(Math.random()-.5)*20);s.setAttribute("position",new Fe(o,3)),this.emberMat=new Ar({color:16763904,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.8,blending:qe,depthWrite:!1}),this.embers=new an(s,this.emberMat),this.fireplaceGroup.add(this.embers),this.emberVelocities=new Float32Array(r);for(let a=0;a<r;a++)this.emberVelocities[a]=.02+Math.random()*.05;this.fireplaceGroup.position.set(0,0,0),this.fireplaceGroup.visible=!1,console.log("[Visualizer] Real Fireplace initialized")}createFireShader(){return new ct({uniforms:{uTime:{value:0},uColor:{value:new _e(16729088)},uSpeed:{value:1},uIntensity:{value:1}},vertexShader:`
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
            `,transparent:!0,side:xt,blending:qe,depthWrite:!1})}initRainforest(){const e=this.batterySaver?400:1e3,t=new Ke,n=new Float32Array(e*3),r=new Float32Array(e*3);for(let s=0;s<e;s++){const o=s*3;n[o]=(Math.random()-.5)*60,n[o+1]=(Math.random()-.5)*40,n[o+2]=(Math.random()-.5)*40,r[o]=Math.random(),r[o+1]=Math.random(),r[o+2]=.08+Math.random()*.12}t.setAttribute("position",new ut(n,3)),t.setAttribute("aRandom",new ut(r,3)),this.rainMaterial=new ct({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new _e(8965375)},uIntensity:{value:.6}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:qe}),this.raindrops=new an(t,this.rainMaterial),this.rainforestGroup.add(this.raindrops),this.rainforestGroup.visible=!1}initZenGarden(){const e=this.batterySaver?200:500,t=new Ke,n=new Float32Array(e*3),r=new Float32Array(e*3);for(let o=0;o<e;o++){const a=o*3;n[a]=(Math.random()-.5)*40,n[a+1]=(Math.random()-.5)*20,n[a+2]=(Math.random()-.5)*40,r[a]=Math.random(),r[a+1]=Math.random(),r[a+2]=Math.random()*Math.PI*2}t.setAttribute("position",new ut(n,3)),t.setAttribute("aRandom",new ut(r,3)),this.petalMaterial=new ct({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new _e(16758725)},uIntensity:{value:.8}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1}),this.petals=new an(t,this.petalMaterial),this.zenGardenGroup.add(this.petals);const s=new Vt(40,40,32,32);this.zenWaterMaterial=new Pt({color:2245734,transparent:!0,opacity:.3,side:xt}),this.zenWater=new We(s,this.zenWaterMaterial),this.zenWater.rotation.x=-Math.PI/2,this.zenWater.position.y=-5,this.zenGardenGroup.add(this.zenWater),this.zenGardenGroup.visible=!1,console.log("[Visualizer] Zen Garden initialized (Shader Mode)")}initOcean(){var a;const e=new Vt(300,100,128,64);this.oceanWave=new We(e,new ct({uniforms:{uTime:{value:0},uColor:{value:this.customColor?this.customColor.clone():new _e(43775)},uNormBass:{value:0},uBeatPulse:{value:0}},vertexShader:`
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
            `,wireframe:!0,transparent:!0,side:xt})),this.oceanWave.rotation.x=-Math.PI/3,this.oceanWave.position.y=-2,this.oceanGroup.add(this.oceanWave);const t=300,n=new Ke,r=[];for(let l=0;l<t;l++)r.push((Math.random()-.5)*50),r.push(-2.5+Math.random()*.5),r.push((Math.random()-.5)*40);n.setAttribute("position",new Fe(r,3));const s=new Ar({color:16777215,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.5,blending:qe,depthWrite:!1});this.oceanFoam=new an(n,s),this.oceanGroup.add(this.oceanFoam),this.oceanGroup.visible=!1;const o=((a=this.customColors)==null?void 0:a.ocean)||this.customColor;o&&(this.oceanWave&&this.oceanWave.material.color.copy(o),this.oceanFoam&&this.oceanFoam.material.color.copy(o)),console.log("[Visualizer] Original Ocean (Wireframe) restored")}createCyberTexture(e=this.matrixConfig){const n=document.createElement("canvas");n.width=1024,n.height=1024;const r=n.getContext("2d");r.fillStyle="rgba(0,0,0,0)",r.fillRect(0,0,1024,1024),r.shadowBlur=12,r.shadowColor="rgba(255, 255, 255, 0.4)",r.font='bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace',r.fillStyle="#ffffff",r.textAlign="center",r.textBaseline="middle";const s=8,o=8,a=1024/s,l=1024/o;let c="🪷MINDWAVE";const h=e.logicMode,u=e.customText;h==="custom"||h==="txt"?c="🪷"+(u&&u.length>0?u:"WELCOME TO MINDWAVE"):(h==="random"||h==="rnd"||h==="matrix"||h==="int"||h==="interstellar")&&(c="");const f=h==="matrix"||h==="int"||h==="interstellar"?[]:["LOGO",...c],d=f.length;for(let _=0;_<64;_++){const m=_%8,p=Math.floor(_/8);r.fillStyle="rgba(0,0,0,0)",r.fillRect(m*a,p*l,a,l),r.save(),r.translate(m*a+a/2,p*l+l/2);let x="",v=!1;if(_<d){const S=f[_];S==="LOGO"?v=!0:x=S}else{const C="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";x=C.charAt(Math.floor(Math.random()*C.length)),Math.random()>.5&&(r.save(),r.scale(-1,1),r.fillStyle="#ffffff",r.font="bold 80px monospace",r.fillText(x,0,0),r.restore(),x="")}if(x||v)if(r.fillStyle="#ffffff",r.font="bold 80px monospace",r.textAlign="center",r.textBaseline="middle",r.shadowBlur=16,r.shadowColor="rgba(255, 255, 255, 0.6)",v)if(this.logoImage){const w=document.createElement("canvas");w.width=100,w.height=100;const A=w.getContext("2d");A.imageSmoothingEnabled=!0,A.imageSmoothingQuality="high",A.drawImage(this.logoImage,0,0,100,100);const F=A.getImageData(0,0,100,100),y=F.data;for(let b=0;b<y.length;b+=4){const W=180+(y[b]+y[b+1]+y[b+2])/3/255*75;y[b]=W,y[b+1]=W,y[b+2]=W}A.putImageData(F,0,0),r.imageSmoothingEnabled=!0,r.imageSmoothingQuality="high",r.drawImage(w,-50,-50,100,100)}else!this.logoLoading&&!this.logoFailed&&(this.logoLoading=!0,new Ym().load("./mindwave-logo-icon.png",C=>{if(this.logoImage=C,this.logoLoading=!1,this.cyberMaterial){const w=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=w}},void 0,C=>{this.logoFailed=!0,this.logoLoading=!1})),r.font="bold 80px monospace",r.fillStyle="#2dd4bf",r.fillText("🪷",0,0);else r.fillText(x,0,0);r.restore()}const g=new Ri(n);return g.magFilter=yt,g.minFilter=yt,g}createCyberShader(e,t=this.matrixConfig){return new ct({uniforms:{uTexture:{value:e},uColor:{value:new _e(t.color||65345)},uHeadColor:{value:new _e(15794160)},uTime:{value:0},uSpeed:{value:t.speed||1},uTailLength:{value:t.length||1},uRainbow:{value:t.rainbow?1:0},uBrightness:{value:this.brightnessMultiplier||1}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:qe})}initEnvironment(){this.sunLight=new Km(16774625,1.2),this.sunLight.position.set(50,100,50),this.scene.add(this.sunLight),this.ambientLight=new jm(4210752,.6),this.scene.add(this.ambientLight)}ensureInitialized(e){const t=`[VizInit] ${e}`;console.time(t),e==="sphere"&&(!this.sphereGroup||this.sphereGroup.children.length===0)&&this.initSphere(),e==="particles"&&(!this.particleGroup||this.particleGroup.children.length===0)&&this.initParticles(),e==="lightspeed"&&(!this.lightspeedGroup||this.lightspeedGroup.children.length===0)&&this.initLightspeed(),e==="waves"&&(!this.wavesGroup||this.wavesGroup.children.length===0)&&this.initWaves(),e==="lava"&&(!this.lavaGroup||this.lavaGroup.children.length===0)&&this.initLava(),e==="fireplace"&&(!this.fireplaceGroup||this.fireplaceGroup.children.length===0)&&this.initFireplace(),e==="rainforest"&&(!this.rainforestGroup||this.rainforestGroup.children.length===0)&&this.initRainforest(),e==="zengarden"&&(!this.zenGardenGroup||this.zenGardenGroup.children.length===0)&&this.initZenGarden(),e==="ocean"&&(!this.oceanGroup||this.oceanGroup.children.length===0)&&this.initOcean(),(e==="cyber"||e==="matrix")&&(!this.cyberGroup||this.cyberGroup.children.length===0)&&this.initCyber(),e==="box"&&(!this.boxGroup||this.boxGroup.children.length===0)&&this.initBox(),e==="dragon"&&(!this.dragonGroup||this.dragonGroup.children.length===0)&&this.initDragon(),e==="galaxy"&&(!this.galaxyGroup||this.galaxyGroup.children.length===0)&&this.initGalaxy(),e==="mandala"&&(!this.mandalaGroup||this.mandalaGroup.children.length===0)&&this.initMandala(),e==="snowflake"&&(!this.snowflakeGroup||this.snowflakeGroup.children.length===0)&&this.initSnowflake(),e==="cymatics"&&(!this.cymaticsGroup||this.cymaticsGroup.children.length===0)&&this.initCymatics(),console.timeEnd(t)}initCyber(){for(;this.cyberGroup.children.length>0;){const d=this.cyberGroup.children[0];this.cyberGroup.remove(d),d.material&&(d.material.map&&d.material.map.dispose(),d.material.dispose()),d.children&&d.traverse(g=>{g.geometry&&g.geometry.dispose(),g.material&&(g.material.map&&g.material.map.dispose(),g.material.dispose())})}this.cyberRotationGroup=null,this.cyberPoints=null;const e=80,t=120,n=new Ke,r=[],s=[],o=[],a=[],l=240,c=160,h=l/e,u=c/t;for(let d=0;d<e;d++){const g=d*h-l/2+Math.random()*.8*h,_=-20-Math.random()*2,m=.5+Math.random()*.5,p=this.matrixConfig,x=p.logicMode==="mindwave"||p.logicMode==="mw"||p.logicMode==="custom"||p.logicMode==="txt",v=p.logicMode==="matrix"||p.logicMode==="int"||p.logicMode==="interstellar",C=((p.logicMode==="custom"||p.logicMode==="txt")&&p.customText?"🪷"+p.customText:"MINDWAVE").length,w=v?Math.random()*100:0,A=v?.5+Math.random()*1.5:1,F=Math.random()*100+w;for(let y=0;y<t;y++){const b=c/2-y*u;r.push(g,b,_),x?s.push(y%(C+1)):v?s.push(Math.floor(Math.random()*64)):s.push(9+Math.floor(Math.random()*55)),o.push(F),a.push(m*A)}}n.setAttribute("position",new Fe(r,3)),n.setAttribute("aCharIndex",new Fe(s,1)),n.setAttribute("aSpawnTime",new Fe(o,1)),n.setAttribute("aSpeed",new Fe(a,1)),this.cyberGeometry=n;const f=this.createCyberTexture(this.matrixConfig);this.cyberMaterial=this.createCyberShader(f,this.matrixConfig),this.cyberRain=new an(n,this.cyberMaterial),this.cyberRain.frustumCulled=!1,this.cyberRain.renderOrder=-1,this.cyberRotationGroup=new Je,this.cyberRotationGroup.add(this.cyberRain),this.cyberGroup.add(this.cyberRotationGroup),this.currentCyberAngle!==void 0&&(this.cyberRotationGroup.rotation.z=Xa.degToRad(-this.currentCyberAngle))}setCyberMode(e){if(this.mindWaveMode!==e)if(this.mindWaveMode=e,this.cyberLogicMode=e?"mindwave":"classic",e&&this.cyberMaterial){const t=this.cyberMaterial.uniforms.uTexture.value,n=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=n,this.cyberMaterial.needsUpdate=!0,t&&t.dispose()}else this.initCyber()}setMode(e){const t=this.mapMode(e);this.activeModes.clear(),this.activeModes.add(t),this.mode=t,this.updateVisibility(),this.updateLabel(t)}mapMode(e){return{cube:"box",flow:"particles",zen:"zengarden",rain:"rainforest",interstellar:"matrix",ocean:"waves"}[e]||e}toggleMode(e){const t=this.mapMode(e);t==="matrix"&&!this.activeModes.has("matrix")&&(this.matrixConfig.logicMode||(this.matrixConfig.logicMode="interstellar")),t==="cyber"&&!this.activeModes.has("cyber")&&(this.cyberConfig.logicMode||(this.cyberConfig.logicMode="matrix"));const n=this.activeModes.has("cyber");this.activeModes.has(t)?this.activeModes.delete(t):(t==="cymatics"?(console.log("[Engine] Cymatics engaged - clearing other modes"),this.activeModes.clear()):this.activeModes.has("cymatics")&&this.activeModes.delete("cymatics"),this.activeModes.add(t)),this.active=this.activeModes.size>0,this.updateVisibility(),this.updateLabel(t),this.activeModes.forEach(r=>this.ensureInitialized(r)),this.initialized&&this.active&&!this._isRendering&&(Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null),this.render()),this.mode=t,this.updateVisibility(),this.activeModes.size===0&&!n&&(this.active=!1,this.renderer&&(this.renderer.autoClearColor=!0,this.renderer.clear(),this.renderer.render(this.scene,this.camera))),this.activeModes.size===1?this.updateLabel(Array.from(this.activeModes)[0]):this.activeModes.size>1?this.updateLabel("multi"):this.updateLabel("none"),window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}})),this.updateCyberStrings&&this.updateCyberStrings()}toggleGalaxySunStyle(){const e=this.galaxySunStyle==="sun"?"sun2":this.galaxySunStyle==="sun2"?"sun3":"sun";return console.log(`[Visualizer] Toggling Galaxy Sun: ${this.galaxySunStyle} -> ${e}`),this.setGalaxySunStyle(e),e}updateVisibility(){if(this.activeModes.forEach(e=>this.ensureInitialized(e)),this.sphereGroup&&(this.sphereGroup.visible=this.activeModes.has("sphere")),this.particleGroup&&(this.particleGroup.visible=this.activeModes.has("particles")),this.lightspeedGroup&&(this.lightspeedGroup.visible=this.activeModes.has("lightspeed")),this.wavesGroup&&(this.wavesGroup.visible=this.activeModes.has("waves")),this.oceanGroup&&(this.oceanGroup.visible=this.activeModes.has("ocean")),this.lavaGroup&&(this.lavaGroup.visible=this.activeModes.has("lava")),this.fireplaceGroup&&(this.fireplaceGroup.visible=this.activeModes.has("fireplace")),this.rainforestGroup&&(this.rainforestGroup.visible=this.activeModes.has("rainforest")),this.zenGardenGroup&&(this.zenGardenGroup.visible=this.activeModes.has("zengarden")),this.boxGroup&&(this.boxGroup.visible=this.activeModes.has("box")),this.dragonGroup&&(this.dragonGroup.visible=this.activeModes.has("dragon")),this.galaxyGroup&&(this.galaxyGroup.visible=this.activeModes.has("galaxy")),this.mandalaGroup&&(this.mandalaGroup.visible=this.activeModes.has("mandala")),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics")),this.snowflakeGroup){const e=this.cymaticMaterial&&Math.abs(this.cymaticMaterial.uniforms.uMedium.value-3)<.1;this.snowflakeGroup.visible=this.activeModes.has("snowflake")||this.activeModes.has("cymatics")&&e}this.cyberGroup&&(this.cyberGroup.visible=this.activeModes.has("matrix")),this.overlayCanvas&&(this.activeModes.has("cyber")?(this.overlayCanvas.classList.remove("hidden"),this.activeModes.has("matrix")?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1):this.activeModes.size>1?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:.7}})),this.wasAutoDimmed=!0):(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1),(!this.matrixCyberStreams||this.matrixCyberStreams.length===0)&&this.generateCyberStyle()):(this.overlayCanvas.classList.add("hidden"),this.wasAutoDimmed&&(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1))),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics"),this.cymaticsGroup.position.z=2),this.updateUIPanels()}updateUIPanels(){typeof window.updateConfigPanel=="function"&&window.updateConfigPanel()}updateLabel(e){const t=document.getElementById("visualLabel");t&&(e==="sphere"?t.textContent="BIO-RESONANCE":e==="particles"?t.textContent="NEURAL FLOW":e==="lightspeed"?t.textContent="WARP":e==="waves"||e==="ocean"?t.textContent="OCEAN":e==="lava"?t.textContent="LAVA LAMP":e==="fireplace"?t.textContent="FIREPLACE":e==="rainforest"?t.textContent="RAINFOREST":e==="zengarden"?t.textContent="ZEN GARDEN":e==="cymatics"?t.textContent="CYMATICS":e==="cyber"?t.textContent="CYBER":e==="matrix"?t.textContent="MATRIX":e==="snowflake"?t.textContent="SNOWFALL":e==="multi"?t.textContent="MULTI-SENSORY":t.textContent="")}initWaves(){for(this.wavesGroup||(this.wavesGroup=new Je,this.scene.add(this.wavesGroup));this.wavesGroup.children.length>0;){const t=this.wavesGroup.children[0];this.wavesGroup.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}const e=new Vt(80,80,160,160);this.wavesMaterial=new ct({uniforms:{uTime:{value:0},uColor:{value:this.customColor?new _e(this.customColor):new _e(26367)},uSecondaryColor:{value:new _e(62207)},uIntensity:{value:1},uNormBass:{value:0},uResolution:{value:new ce(window.innerWidth,window.innerHeight)}},vertexShader:`
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
            `,transparent:!0,wireframe:!1,side:xt,extensions:{derivatives:!0}}),this.wavesMesh=new We(e,this.wavesMaterial),this.wavesMesh.rotation.x=-Math.PI/2.2,this.wavesMesh.position.y=-5,this.wavesMesh.position.z=-10,this.wavesGroup.add(this.wavesMesh)}setSpeed(e){this.speedMultiplier=e}setIntent(e){this.currentIntent=e,e==="delta"||e==="theta"?this.particles&&this.particles.material&&(this.particles.material.size=.3,this.particles.material.opacity=.5):e==="gamma"||e==="hyper-gamma"?(this.particles&&this.particles.material&&(this.particles.material.size=.08,this.particles.material.opacity=.9),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(16777215),this.cyberMaterial.uniforms.uTailLength.value=.4)):(this.particles&&this.particles.material&&(this.particles.material.size=.15,this.particles.material.opacity=.8),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(15794160),this.cyberMaterial.uniforms.uTailLength.value=1)),this.renderSingleFrame()}setColor(e,t=null){var n,r,s,o;this.customColors||(this.customColors={}),!t||t==="all"?(this.customColors={},this.customColor=new _e(e)):this.customColors[t]=new _e(e);try{const a=l=>{l&&(l.color&&typeof l.color.set=="function"?l.color.set(e):l.uniforms&&l.uniforms.uColor&&l.uniforms.uColor.value.set(e))};this.particles&&this.particles.material&&a(this.particles.material),this.lightspeed&&this.lightspeed.material&&a(this.lightspeed.material),this.sphere&&this.sphere.material&&(a(this.sphere.material),this.core&&this.core.material&&a(this.core.material)),(t==="box"||!t||t==="all")&&(this.boxOuter&&this.boxOuter.children.forEach(l=>a(l.material)),this.boxInner&&this.boxInner.children.forEach(l=>a(l.material)),this.boxEdges&&this.boxEdges.material&&a(this.boxEdges.material)),t==="mandala"&&(this.mandalaRings&&this.mandalaRings.forEach(l=>a(l.material)),this.mandalaCenter&&this.mandalaCenter.material&&a(this.mandalaCenter.material)),this.wavesMesh&&this.wavesMesh.material&&a(this.wavesMesh.material),this.lavaBlobs&&this.lavaBlobs.forEach(l=>a(l.material)),this.lavaGlow&&this.lavaGlow.material&&a(this.lavaGlow.material),this.flames&&this.flames.material&&a(this.flames.material),this.raindrops&&this.raindrops.material&&a(this.raindrops.material),this.petals&&this.petals.material&&a(this.petals.material),this.zenWater&&this.zenWater.material&&a(this.zenWater.material),this.oceanWave&&this.oceanWave.material&&a(this.oceanWave.material),this.oceanFoam&&this.oceanFoam.material&&a(this.oceanFoam.material),this.cyberRain&&this.cyberRain.material&&this.cyberRain.material.uniforms&&this.cyberRain.material.uniforms.uColor&&this.cyberRain.material.uniforms.uColor.value.set(e),this.logoMesh&&this.originalLogoImg&&this.updateLogoTexture(),this.dragonGroup&&this.updateDragonColor&&this.updateDragonColor(new _e(e)),(this.galaxyStars||this.galaxySunMesh)&&this.updateGalaxyColor(new _e(e)),this.cymaticMaterial&&((n=this.cymaticMaterial.uniforms)!=null&&n.uColor)&&this.cymaticMaterial.uniforms.uColor.value.set(e),(t==="snowflake"||!t||t==="all")&&this.setSnowColor(e),(o=(s=(r=this._snowData)==null?void 0:r.material)==null?void 0:s.uniforms)!=null&&o.uColor&&this._snowData.material.uniforms.uColor.value.set(e)}catch(a){console.warn("[Visualizer] setColor encountered a safe-skip error:",a)}this.renderSingleFrame()}renderSingleFrame(){!this.renderer||!this.scene||!this.camera||(this.renderer.clear(),this.renderer.render(this.scene,this.camera))}createCircleTexture(){if(this.textures.circle)return this.textures.circle;const e=32,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d");return n.beginPath(),n.arc(e/2,e/2,e/2,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),this.textures.circle=new Ri(t),this.textures.circle}render(e,t){var n,r,s,o,a,l,c,h,u;if(!this.initialized||!this.renderer||document.hidden||!this.active){this._isRendering=!1;return}if(!(this._isRendering&&typeof e=="number")){this._isRendering=!0;try{(typeof e=="number"||!e&&Ne.analyserLeft)&&(e=Ne.analyserLeft,t=Ne.analyserRight);let f=0,d=0,g=0;if(e){const P=e.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==P)&&(this._freqDataArray=new Uint8Array(P)),e.getByteFrequencyData(this._freqDataArray);let U=0;for(let O=0;O<15;O++)U+=this._freqDataArray[O];f=Math.pow(U/15/255,.8);let X=0;for(let O=10;O<100;O++)X+=this._freqDataArray[O];d=X/90/255;let N=0;for(let O=100;O<300;O++)N+=this._freqDataArray[O];g=N/200/255}const _=Math.max(.001,this.speedMultiplier||1),m=performance.now()*.001;this.lastTime||(this.lastTime=m);const p=Math.min(.1,m-this.lastTime);this.lastTime=m;const x=Ne.visualSpeedAuto?Ne.beatFrequency||10:_*10,v=Math.sin(m*Math.PI*2*x)*.5+.5,S=this.vibrationEnabled?1:0,C=(v||0)*S,w=(f||0)*S,A=S*(.02+w*.15+C*.08),F=Math.sin(m*47.3)*Math.cos(m*31.7)*A,y=Math.cos(m*53.1)*Math.sin(m*29.3)*A,b=Math.sin(m*37.9)*Math.cos(m*43.1)*A,z=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];for(const P of z)P&&P.position.set(F,y,b);if(this.activeModes.has("galaxy")&&this.galaxyGroup){const P=this.sunRotationSpeedY||.002,U=this.sunRotationSpeedZ||5e-4;if(this.galaxyStars&&(this.galaxyStars.rotation.y+=P*_*.5,this.galaxyStars.rotation.z+=U*_*.5),this.galaxySunMesh){this.galaxySunMesh.rotation.z-=U*_*1.5,this.galaxySunMesh.rotation.y+=P*_*2;const X=1+w*.15*(this.galaxySunStyle==="sun3"?2.5:1);this.galaxySunMesh.scale.setScalar(X)}this.galaxySunUniforms&&(this.galaxySunUniforms.uTime.value=m*_,this.galaxySunUniforms.uBassIntt.value=w,this._cymaticV2&&this._cymaticV2.shiver>.5&&(this.galaxySunUniforms.uTime.value+=this._cymaticV2.shiver*.05))}if(this.activeModes.has("sphere")&&this.sphere&&(this.sphere.scale.setScalar(1+w*.15),this.sphere.rotation.y+=.005*_),this.activeModes.has("particles")&&this.particleMaterial){const P=((r=(n=window.MindWaveState)==null?void 0:n.envIntensities)==null?void 0:r.flow)??1,U=(.015*_+w*.08+C*.05)*P;this.particleMaterial.uniforms.uTime.value=m,this.particleMaterial.uniforms.uSpeed.value=U*10,this.particleGroup.rotation.z+=(.001*_+w*.005)*P}if(this.activeModes.has("lightspeed")&&this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uTime.value=m,this.lightspeedMaterial.uniforms.uSpeed.value=_),this.activeModes.has("matrix")&&this.cyberMaterial&&(this.cyberMaterial.uniforms.uTime.value=m*_),this.activeModes.has("waves")&&this.wavesMaterial){const P=((o=(s=window.MindWaveState)==null?void 0:s.envIntensities)==null?void 0:o.ocean)??1;this.wavesMaterial.uniforms.uTime.value=m*_*.5,this.wavesMaterial.uniforms.uNormBass.value=w*P,this.wavesMaterial.uniforms.uIntensity&&(this.wavesMaterial.uniforms.uIntensity.value=P)}if(this.activeModes.has("cymatics")&&this.cymaticsEngine&&this.cymaticsEngine.update(delta*_,{bass:w,mids:vNormMids,highs:vNormHighs}),this.activeModes.has("ocean")&&this.oceanWave&&this.oceanWave.material.uniforms){const P=((l=(a=window.MindWaveState)==null?void 0:a.envIntensities)==null?void 0:l.ocean)??1;this.oceanWave.material.uniforms.uTime.value=m*_,this.oceanWave.material.uniforms.uNormBass.value=w*P,this.oceanWave.material.uniforms.uBeatPulse.value=C*P,this.oceanFoam&&(this.oceanFoam.material.opacity=(.4+w*.3+C*.2)*(this.brightnessMultiplier||1)*P)}if(this.activeModes.has("box")&&this.boxOuter&&(this.boxOuter.rotation.x+=.008*_+w*.02,this.boxOuter.rotation.y+=.012*_,this.boxInner&&(this.boxInner.rotation.x-=.015*_,this.boxInner.rotation.y-=.01*_,this.boxInner.scale.setScalar(.95+w*.2)),this.boxOuter.scale.setScalar(1+w*.2),this.boxEdges&&this.boxEdges.rotation.copy(this.boxOuter.rotation)),this.activeModes.has("dragon")&&this.dragonBodyInstanced&&this.dragonDummy){this.dragonGroup.rotation.y+=.005*_;const P=m*_*2,U=1+w*.2;for(let X=0;X<this.dragonLength;X++){const N=P-X*.12,O=Math.sin(N)*8,Y=Math.cos(N*1.5)*4+Math.sin(N*.5)*3,j=Math.cos(N*.8)*8;this.dragonDummy.position.set(O,Y,j);const se=N+.1,q=Math.sin(se)*8,Z=Math.cos(se*1.5)*4+Math.sin(se*.5)*3,oe=Math.cos(se*.8)*8;this.dragonDummy.lookAt(q,Z,oe);const me=1-X/this.dragonLength*.8,de=1+Math.sin(N*4)*.15*(.5+w);this.dragonDummy.scale.setScalar(me*de*U),this.dragonDummy.updateMatrix(),this.dragonBodyInstanced.setMatrixAt(X,this.dragonDummy.matrix),this.dragonGlowInstanced&&this.dragonGlowInstanced.setMatrixAt(X,this.dragonDummy.matrix),X===0&&this.dragonHead&&(this.dragonHead.position.copy(this.dragonDummy.position),this.dragonHead.quaternion.copy(this.dragonDummy.quaternion),this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4))}if(this.dragonBodyInstanced.instanceMatrix.needsUpdate=!0,this.dragonGlowInstanced&&(this.dragonGlowInstanced.instanceMatrix.needsUpdate=!0),this.dragonPearlGroup){const X=P+.5;this.dragonPearlGroup.position.set(Math.sin(X)*9,Math.cos(X*1.5)*5+Math.sin(X*.5)*4,Math.cos(X*.8)*9),this.dragonPearlGroup.rotation.x+=.08*_,this.dragonPearlGroup.rotation.y+=.12*_}}if(this.activeModes.has("mandala")&&this.mandalaRings&&(this.mandalaRings.forEach((P,U)=>{P.userData&&P.userData.speed&&(P.rotation.z+=P.userData.speed*_+w*.005);const X=1+C*.1*(U+1)*.3;P.scale.setScalar(X)}),this.mandalaCenter&&(this.mandalaCenter.rotation.z-=.01*_,this.mandalaCenter.scale.setScalar(1+w*.3))),this.logoMesh){const P=Ne.lotusState||"auto";let U=.8;P==="faded"||P==="full"&&(U=1),this._lotusCurrentOpacity===void 0&&(this._lotusCurrentOpacity=.8),this._lotusCurrentOpacity+=(U-this._lotusCurrentOpacity)*.1,this.logoMesh.material.opacity=this._lotusCurrentOpacity,this.logoMesh.scale.setScalar(1+w*(.05+((c=this._cymaticV2)==null?void 0:c.shiver)*.1)+C*.02)}if(this.activeModes.has("lava")&&this.lavaBlobs&&this.lavaUniforms){const P=((u=(h=window.MindWaveState)==null?void 0:h.envIntensities)==null?void 0:u.lava)??1;this.lavaUniforms.uTime.value=m*_,this.lavaUniforms.uIntensity.value=w*P,this.lavaBlobs.forEach((U,X)=>{const N=U.userData,O=_*(1+w*.8);if(N.state==="heating"?(N.temperature+=N.heatRate*p*O,N.temperature>=1&&(N.temperature=1,N.state="rising")):N.state==="rising"?(U.position.y+=N.riseSpeed*O,U.position.y>=N.floatMax&&(N.state="cooling")):N.state==="cooling"?(N.temperature-=N.coolRate*p*O,N.temperature<=0&&(N.temperature=0,N.state="falling")):N.state==="falling"&&(U.position.y-=N.fallSpeed*O,U.position.y<=N.floatMin&&(N.state="heating")),U.position.x+=Math.sin(m*N.driftSpeed+N.driftPhase)*.02*O,this.lavaUniforms.uBlobs.value[X]){const Y=N.baseSize*(.8+.5*N.temperature);this.lavaUniforms.uBlobs.value[X].set(U.position.x,U.position.y,U.position.z,Y)}})}if(this.snowflakeGroup&&this.snowflakeGroup.visible&&this._snowData){const P=this._snowData,U=P.points.geometry.attributes.position.array,X=_*2;for(let N=0;N<P.count;N++){const O=N*3;U[O+1]-=P.speeds[N]*X;let Y=Math.sin(m*P.driftFreqs[N]+P.phases[N])*P.drifts[N]*X;U[O]+=Y,U[O+1]<-22&&(U[O+1]=22),U[O]>35&&(U[O]=-35),U[O]<-35&&(U[O]=35)}if(P.points.geometry.attributes.position.needsUpdate=!0,P.spinMeshes){const N=1+(w||0)*.15;P.spinMeshes.forEach((O,Y)=>{O.rotation.z+=P.spinSpeeds[Y]*X,O.position.y-=P.spinSpeeds[Y]*.1*X,O.scale.setScalar(N),O.position.y<-25&&(O.position.y=25)})}P.material&&P.material.uniforms&&P.material.uniforms.uIntensity&&(P.material.uniforms.uIntensity.value=.2+w*.8)}if(this.activeModes.has("rainforest")&&this.rainMaterial){const P=_*.8*(1+C*.3);this.rainMaterial.uniforms.uTime.value=m,this.rainMaterial.uniforms.uSpeed.value=P,this.rainMaterial.uniforms.uIntensity.value=(.5+w*.2+C*.2)*(this.brightnessMultiplier||1)}if(this.activeModes.has("zengarden")&&this.petalMaterial){const P=_*.3*(1+C*.5);this.petalMaterial.uniforms.uTime.value=m,this.petalMaterial.uniforms.uSpeed.value=P,this.zenWater&&(this.zenWater.material.opacity=(.3+C*.2)*(this.brightnessMultiplier||1))}if(this.activeModes.has("fireplace")&&this.fireMesh&&this.fireMesh.material&&this.fireMesh.material.uniforms){const P=.8+.2*Math.sin(m*15)*Math.sin(m*7),U=this.fireMesh.material.uniforms;U.uTime&&(U.uTime.value=m*1.5*_),U.uIntensity&&(U.uIntensity.value=P+w*.5),this.fireLight&&(this.fireLight.intensity=(2+w*5)*P)}const W=performance.now(),ee=W-(this._lastFrameStartTime||W);if(this._lastFrameStartTime=W,this._fpsRingBuffer&&(this._fpsRingBuffer[this._fpsRingIndex]=ee,this._fpsRingIndex=(this._fpsRingIndex+1)%60,this._fpsRingCount=Math.min(60,this._fpsRingCount+1),this._fpsRingCount===60)){let P=0;for(let X=0;X<60;X++)P+=this._fpsRingBuffer[X];P/=60,1e3/P<35&&W-(this._lastLodDegradation||0)>3e3&&(this.degradeLOD(),this._lastLodDegradation=W,this._fpsRingCount=0)}const D=1e3/(this.targetFPS||60);W-this.lastFrameRenderTime>=D&&(this.renderer.autoClear=!this.activeModes.has("lightspeed"),this.renderer.autoClear&&this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.activeModes.has("cyber")&&this.renderCyberCyber(),this.lastFrameRenderTime=W)}catch(f){console.error("[Visualizer] Render Loop Error:",f),f.name==="TypeError"&&f.message.includes("uniforms")&&console.warn("[Visualizer] Shader not ready, skipping frame...")}finally{this._isRendering=!1}this.active&&!document.hidden?Ne.animationId=requestAnimationFrame(()=>this.render(Ne.analyserLeft,Ne.analyserRight)):Ne.animationId=null}}setCyberColor(e){this.cyberConfig.color=e,this.cyberConfig.rainbow=!1,this.cyberColorCustomized=!0,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.matrixConfig.rainbow=!1,this.cyberMaterial&&this.cyberMaterial.uniforms.uColor&&(this.cyberMaterial.uniforms.uColor.value.set(e),this._tempColor.set(e),this._tempColor.r+=(1-this._tempColor.r)*.8,this._tempColor.g+=(1-this._tempColor.g)*.8,this._tempColor.b+=(1-this._tempColor.b)*.8,this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor),this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=0))}getAverageFrequency(e,t){let n=Ne.analyserLeft||Ne.analyserRight;if(!n)return 0;const r=n.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==r)&&(this._freqDataArray=new Uint8Array(r));const s=this._freqDataArray;n.getByteFrequencyData(s),e===void 0&&(e=0),t===void 0&&(t=s.length);let o=0,a=0;for(let l=e;l<t&&l<s.length;l++)o+=s[l],a++;return a>0?o/a:0}setMouseInfluence(e){this.mouseInfluence=e}setGlobalSpeed(e){this.speedMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=1+(e-1)*.5)}setGlobalBrightness(e){this.brightnessMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberBrightness(e){this.cyberConfig.brightness=e}setMatrixBrightness(e){this.matrixConfig.brightness=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberSpeed(e){this.cyberConfig.speed=e}setCyberLength(e){this.cyberConfig.length=e}setMatrixSpeed(e){this.matrixConfig.speed=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=e)}setMatrixLength(e){this.matrixConfig.length=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uTailLength.value=e)}setCyberRainbow(e){if(this.cyberConfig.rainbow=e,this.cyberRainbowMode=e,!e){const t=this.cyberConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(n=>{n.color=t})}}setMatrixRainbow(e){this.matrixConfig.rainbow=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=e?1:0)}setBatterySaver(e){this.batterySaver=e,this.targetFPS=e?30:60;const t=e?1:2;this.renderer&&(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t)),this.resize()),console.log(`[Visualizer] Battery Saver ${e?"ENABLED (30fps/1x)":"DISABLED (60fps/2x)"}`)}degradeLOD(){this.renderer&&(this.currentLodLevel==="high"?(console.log("[Visualizer] FPS dropping. Degrading LOD to Medium (Pixel Ratio: 1.0)"),this.renderer.setPixelRatio(1),this.currentLodLevel="medium",this.resize()):this.currentLodLevel==="medium"&&(console.log("[Visualizer] FPS dropping. Degrading LOD to Low (Pixel Ratio: 0.75)"),this.renderer.setPixelRatio(.75),this.currentLodLevel="low",this.resize()))}updateCyberStrings(){if(!this.matrixCyberStreams)return;let e=!1,t="MINDWAVE🪷";const n=this.cyberConfig;n.logicMode==="custom"||n.logicMode==="txt"?(e=!0,t="🪷"+(n.customText||"WELCOME TO MINDWAVE")):(n.logicMode==="mindwave"||n.logicMode==="mw")&&(e=!0,t="MINDWAVE🪷");const r="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",s="0123456789·:.-+x[]<>/\\∆ΣΩ∞",o=100;this.matrixCyberStreams.forEach(a=>{if(a.chars=[],a.isTextMode=e,e&&t.length>0){const l=[...t].reverse();for(let c=0;c<o;c++)a.chars.push(l[c%l.length])}else if(n.logicMode==="matrix"||n.logicMode==="interstellar"||n.logicMode==="int")for(let l=0;l<o;l++)a.chars.push(s.charAt(Math.floor(Math.random()*s.length)));else for(let l=0;l<o;l++)a.chars.push(r.charAt(Math.floor(Math.random()*r.length)))})}setCyberLogicMode(e,t){console.log(`[Visualizer] setCyberLogicMode(mode="${e}", text="${t}")`),this.cyberConfig.logicMode=e,t!==void 0&&(this.cyberConfig.customText=t),this.updateCyberStrings()}setMatrixLogicMode(e,t){if(console.log(`[Visualizer] setMatrixLogicMode(mode="${e}", text="${t}") -> 3D config`),this.matrixConfig.logicMode=e,t!==void 0&&(this.matrixConfig.customText=t),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTexture){const n=this.cyberMaterial.uniforms.uTexture.value,r=this.createCyberTexture(this.matrixConfig);this.cyberMaterial.uniforms.uTexture.value=r,this.cyberMaterial.needsUpdate=!0,n&&n.dispose()}this.initCyber()}setCyberColor(e){this.cyberConfig.color=e,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uColor&&this.cyberMaterial.uniforms.uColor.value.set(e)}setCyberAngle(e){this.cyberConfig.angle=e}setMatrixAngle(e){this.matrixConfig.angle=e,this.currentCyberAngle=e,this.cyberRotationGroup&&(this.cyberRotationGroup.rotation.z=Xa.degToRad(-e))}setVibrationEnabled(e){this.vibrationEnabled=e}updateLogoTexture(){if(!this.originalLogoImg)return;const e=512;this._logoRenderCanvas||(this._logoRenderCanvas=document.createElement("canvas"),this._logoRenderCanvas.width=e,this._logoRenderCanvas.height=e);const t=this._logoRenderCanvas,n=t.getContext("2d",{willReadFrequently:!0});n.clearRect(0,0,e,e),n.drawImage(this.originalLogoImg,0,0,e,e);const r=n.getImageData(0,0,t.width,t.height),s=r.data,o=document.body.dataset.theme||"default",a=ca[o]||ca.default,l=a.secondary||a.accent||"#ffffff",c=this.customColors&&this.customColors.mandala?this.customColors.mandala:this.customColor,h=c?c.getHex():parseInt(a.accent.replace("#",""),16),u=parseInt(l.replace("#",""),16),f=h>>16&255,d=h>>8&255,g=h&255,_=u>>16&255,m=u>>8&255,p=u&255;this.themeType=document.body.dataset.themeType||"dark",this.themeType;for(let v=0;v<s.length;v+=4){const S=s[v],C=s[v+1],w=s[v+2],A=s[v+3];A<10||(S>200&&C>200&&w>200?(s[v]=f,s[v+1]=d,s[v+2]=g,s[v+3]=255):(s[v]=_,s[v+1]=m,s[v+2]=p,s[v+3]=Math.min(255,A*1.5)))}n.putImageData(r,0,0);const x=new Ri(t);if(x.minFilter=It,x.magFilter=It,x.generateMipmaps=!0,this.renderer&&(x.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),this.logoMesh){const v=this.logoMesh.material.map;this.logoMesh.material.map=x,this.logoMesh.material.needsUpdate=!0,v&&v.dispose()}else{const v=new Vt(5.625,4.78),S=new Pt({map:x,transparent:!0,opacity:.8,color:16777215,depthTest:!1,depthWrite:!1});this.logoMesh=new We(v,S),this.logoMesh.position.set(0,0,-10),this.logoMesh.renderOrder=-1,this.scene.add(this.logoMesh)}}initOverlayLogo(){if(this.logoMesh)return;const e=new Image;e.crossOrigin="anonymous",e.src="./mindwave-logo-icon.png",e.onload=()=>{this.originalLogoImg=e,this.updateLogoTexture(),this.targetLogoOpacity!==void 0?this.setLogoOpacity(this.targetLogoOpacity):this.setLogoOpacity(.8)},e.onerror=t=>{console.warn("[Visualizer] Failed to load logo:",t)}}setLogoOpacity(e){this.targetLogoOpacity=e,this.logoMesh&&this.logoMesh.material?this.logoMesh.material.opacity=e*this.brightnessMultiplier:!this.logoMesh&&e>0&&this.initOverlayLogo()}dispose(){this.active=!1,Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null),window.removeEventListener("resize",this.resize),window.removeEventListener("resize",this.resizeOverlayCanvas),window.removeEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode&&window.removeEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange&&document.removeEventListener("visibilitychange",this._boundVisibilityChange),this._boundThemeChange&&window.removeEventListener("themeChanged",this._boundThemeChange),this.canvas&&(this._boundContextLost&&this.canvas.removeEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored&&this.canvas.removeEventListener("webglcontextrestored",this._boundContextRestored)),this._boundCymaticPointer&&(window.removeEventListener("mousemove",this._boundCymaticPointer),window.removeEventListener("touchmove",this._boundCymaticPointer));const e=n=>{if(n)for(;n.children.length>0;){const r=n.children[0];if(n.remove(r),r.geometry&&r.geometry.dispose(),r.material){if(r.material.map&&r.material.map.dispose(),r.material.uniforms)for(const s in r.material.uniforms){const o=r.material.uniforms[s];o&&o.value&&o.value.dispose&&o.value.dispose()}r.material.dispose()}r.children&&r.children.length&&r.traverse(s=>{s.geometry&&s.geometry.dispose(),s.material&&(s.material.map&&s.material.map.dispose(),s.material.dispose())})}},t=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];this._fpsRingBuffer=null,this._tempColor=null,this._logoRenderCanvas=null,t.forEach(e),this.cyberMaterial&&(this.cyberMaterial.dispose(),this.cyberMaterial=null),this.fireMaterial&&(this.fireMaterial.dispose(),this.fireMaterial=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.lightspeedMaterial&&(this.lightspeedMaterial.dispose(),this.lightspeedMaterial=null),this.rainMaterial&&(this.rainMaterial.dispose(),this.rainMaterial=null),this.petalMaterial&&(this.petalMaterial.dispose(),this.petalMaterial=null),this.logoMesh&&(this.logoMesh.material&&(this.logoMesh.material.map&&this.logoMesh.material.map.dispose(),this.logoMesh.material.dispose()),this.logoMesh.geometry&&this.logoMesh.geometry.dispose(),this.scene&&this.scene.remove(this.logoMesh),this.logoMesh=null);for(const n in this.textures)this.textures[n]&&this.textures[n].dispose&&this.textures[n].dispose();if(this.textures={},this._freqDataArray=null,this.renderer){try{this.renderer.forceContextLoss()}catch{}this.renderer.dispose(),this.renderer=null}this.scene=null,this.camera=null,console.log("[Visualizer] Disposed all GPU resources and removed listeners.")}setWarpSpeed(e){this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uSpeed.value=e)}setWarpFov(e){this.camera&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setWarpChromatic(e){this.lightspeedMaterial&&console.log(`[Warp] Chromatic Intensity set to: ${e}`)}}function dg(){return fe?Promise.resolve(fe):new Promise(i=>{og(),setTimeout(()=>i(fe),10)})}function og(){if(!fe&&$t.canvas&&$t.canvas.activeVisualizer&&$t.canvas.activeVisualizer.isVisualizer3D&&(fe=$t.canvas.activeVisualizer),$t.canvas&&$t.canvas.activeVisualizer){if(fe&&$t.canvas.activeVisualizer===fe)return fe;$t.canvas.activeVisualizer.dispose(),$t.canvas.activeVisualizer=null,fe=null}Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null);const i=$t.canvas||document.getElementById("visualizer");if(!fe&&i){const e=i&&i.activeVisualizer&&i.activeVisualizer.isVisualizer3D?{activeModes:i.activeVisualizer.activeModes,mode:i.activeVisualizer.mode,mindWaveMode:i.activeVisualizer.mindWaveMode,cyberLogicMode:i.activeVisualizer.cyberLogicMode,cyberCustomText:i.activeVisualizer.cyberCustomText,currentCyberAngle:i.activeVisualizer.currentCyberAngle,cyberSpeedMultiplier:i.activeVisualizer.cyberSpeedMultiplier,rainbowEnabled:i.activeVisualizer._rainbowEnabled}:{};fe=new ag(i,e),i.activeVisualizer=fe,setTimeout(()=>{fe&&(fe.updateVisibility(),lg())},0)}return fe}function pg(){return fe}let na=!1;function mg(){na=!0,fe&&Ne.animationId&&(cancelAnimationFrame(Ne.animationId),Ne.animationId=null,fe.renderer&&fe.scene&&fe.camera&&fe.renderer.render(fe.scene,fe.camera))}function lg(){fe&&!Ne.animationId&&(fe.active=!0,fe.render(Ne.analyserLeft,Ne.analyserRight),na=!1)}function gg(){return na}function vg(i){fe&&fe.toggleMode(i)}function _g(i){fe&&(fe.setGlobalSpeed(i),fe.setCyberSpeed&&fe.setCyberSpeed(i))}function xg(i,e=null){fe&&(fe.setVisualColor(i,e),fe.setCyberColor&&(!e||e=="cyber")&&fe.setCyberColor(i))}function yg(i){fe&&fe.setGlobalBrightness&&fe.setGlobalBrightness(i)}function Mg(i){fe&&fe.setLogoOpacity(i)}function Sg(i){fe&&fe.setMouseInfluence(i)}window.toggleGalaxySun=function(){return fe?fe.toggleGalaxySunStyle():null};window.setCymaticPattern=function(i){fe&&fe.cymaticsEngine?(fe.cymaticsEngine.setConfig(i),fe.activeModes.has("cymatics")||(window.switchRightTab&&window.switchRightTab("active",document.querySelector('.tab-pill[title="Cymatics"]')),fe.activeModes.add("cymatics"),fe.cymaticsGroup.visible=!0)):(console.warn("Visualizer not fully initialized. Forcing init and setting pattern."),window.setVisualMode&&window.setVisualMode("cymatics"),setTimeout(()=>{fe&&fe.cymaticsEngine&&fe.cymaticsEngine.setConfig(i)},500))};window.setCymaticColor=function(i,e){fe&&fe.cymaticsEngine&&fe.cymaticsEngine.setColor(i,e)};window.setCymaticParam=function(i,e){fe&&fe.cymaticsEngine&&fe.cymaticsEngine.setCustomUniform(i,parseFloat(e))};export{ag as Visualizer3D,pg as getVisualizer,og as initVisualizer,gg as isVisualsPaused,mg as pauseVisuals,dg as preloadVisualizer,lg as resumeVisuals,Sg as setMouseInfluence,yg as setVisualBrightness,xg as setVisualColor,Mg as setVisualLogoOpacity,_g as setVisualSpeed,vg as toggleVisual};
