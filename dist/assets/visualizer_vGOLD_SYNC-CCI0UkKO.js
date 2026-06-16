import{h as Ce,T as ca,e as Jt}from"./controls_v3-Cwq5nU9f.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vs="160",ql=0,ua=1,Xl=2,Qo=1,Yl=2,on=3,cn=0,Ut=1,yt=2,xn=0,ui=1,Ye=2,ha=3,fa=4,Zl=5,Pn=100,Jl=101,$l=102,da=103,pa=104,Kl=200,jl=201,Ql=202,ec=203,Cs=204,Rs=205,tc=206,nc=207,ic=208,rc=209,sc=210,ac=211,oc=212,lc=213,cc=214,uc=0,hc=1,fc=2,Ar=3,dc=4,pc=5,mc=6,gc=7,el=0,vc=1,xc=2,_n=0,_c=1,yc=2,Mc=3,Sc=4,bc=5,wc=6,tl=300,di=301,pi=302,Ps=303,Ls=304,Nr=306,Is=1e3,Yt=1001,Ds=1002,dt=1003,ma=1004,Wr=1005,Dt=1006,Ec=1007,Oi=1008,yn=1009,Tc=1010,Ac=1011,Hs=1012,nl=1013,gn=1014,vn=1015,zi=1016,il=1017,rl=1018,In=1020,Cc=1021,Ht=1023,Rc=1024,Pc=1025,Dn=1026,mi=1027,Lc=1028,sl=1029,Ic=1030,al=1031,ol=1033,qr=33776,Xr=33777,Yr=33778,Zr=33779,ga=35840,va=35841,xa=35842,_a=35843,ll=36196,ya=37492,Ma=37496,Sa=37808,ba=37809,wa=37810,Ea=37811,Ta=37812,Aa=37813,Ca=37814,Ra=37815,Pa=37816,La=37817,Ia=37818,Da=37819,Ua=37820,Na=37821,Jr=36492,Fa=36494,Oa=36495,Dc=36283,za=36284,Ba=36285,Ga=36286,cl=3e3,Un=3001,Uc=3200,Nc=3201,Fc=0,Oc=1,kt="",Mt="srgb",un="srgb-linear",ks="display-p3",Fr="display-p3-linear",Cr="linear",nt="srgb",Rr="rec709",Pr="p3",Gn=7680,Va=519,zc=512,Bc=513,Gc=514,ul=515,Vc=516,Hc=517,kc=518,Wc=519,Ha=35044,ka="300 es",Us=1035,ln=2e3,Lr=2001;class vi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wa=1234567;const hi=Math.PI/180,Bi=180/Math.PI;function On(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function St(i,e,t){return Math.max(e,Math.min(t,i))}function Ws(i,e){return(i%e+e)%e}function qc(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Xc(i,e,t){return i!==e?(t-i)/(e-i):0}function Pi(i,e,t){return(1-t)*i+t*e}function Yc(i,e,t,n){return Pi(i,e,1-Math.exp(-t*n))}function Zc(i,e=1){return e-Math.abs(Ws(i,e*2)-e)}function Jc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function $c(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Kc(i,e){return i+Math.floor(Math.random()*(e-i+1))}function jc(i,e){return i+Math.random()*(e-i)}function Qc(i){return i*(.5-Math.random())}function eu(i){i!==void 0&&(Wa=i);let e=Wa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function tu(i){return i*hi}function nu(i){return i*Bi}function Ns(i){return(i&i-1)===0&&i!==0}function iu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ir(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ru(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),f=o((e-n)/2),d=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*u,l*h,l*f,a*c);break;case"YZY":i.set(l*f,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*f,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ii(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const qa={DEG2RAD:hi,RAD2DEG:Bi,generateUUID:On,clamp:St,euclideanModulo:Ws,mapLinear:qc,inverseLerp:Xc,lerp:Pi,damp:Yc,pingpong:Zc,smoothstep:Jc,smootherstep:$c,randInt:Kc,randFloat:jc,randFloatSpread:Qc,seededRandom:eu,degToRad:tu,radToDeg:nu,isPowerOfTwo:Ns,ceilPowerOfTwo:iu,floorPowerOfTwo:Ir,setQuaternionFromProperEuler:ru,normalize:Pt,denormalize:ii};class ce{constructor(e=0,t=0){ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,n,r,s,o,a,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],v=r[0],m=r[3],p=r[6],_=r[1],x=r[4],S=r[7],C=r[2],T=r[5],A=r[8];return s[0]=o*v+a*_+l*C,s[3]=o*m+a*x+l*T,s[6]=o*p+a*S+l*A,s[1]=c*v+u*_+h*C,s[4]=c*m+u*x+h*T,s[7]=c*p+u*S+h*A,s[2]=f*v+d*_+g*C,s[5]=f*m+d*x+g*T,s[8]=f*p+d*S+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,g=t*h+n*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(r*c-u*n)*v,e[2]=(a*n-r*o)*v,e[3]=f*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-a*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply($r.makeScale(e,t)),this}rotate(e){return this.premultiply($r.makeRotation(-e)),this}translate(e,t){return this.premultiply($r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $r=new He;function hl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Gi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function su(){const i=Gi("canvas");return i.style.display="block",i}const Xa={};function Li(i){i in Xa||(Xa[i]=!0,console.warn(i))}const Ya=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Za=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Yi={[un]:{transfer:Cr,primaries:Rr,toReference:i=>i,fromReference:i=>i},[Mt]:{transfer:nt,primaries:Rr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Fr]:{transfer:Cr,primaries:Pr,toReference:i=>i.applyMatrix3(Za),fromReference:i=>i.applyMatrix3(Ya)},[ks]:{transfer:nt,primaries:Pr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Za),fromReference:i=>i.applyMatrix3(Ya).convertLinearToSRGB()}},au=new Set([un,Fr]),Je={enabled:!0,_workingColorSpace:un,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!au.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Yi[e].toReference,r=Yi[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Yi[i].primaries},getTransfer:function(i){return i===kt?Cr:Yi[i].transfer}};function fi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Kr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Vn;class fl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Vn===void 0&&(Vn=Gi("canvas")),Vn.width=e.width,Vn.height=e.height;const n=Vn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Vn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Gi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=fi(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(fi(t[n]/255)*255):t[n]=fi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ou=0;class dl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=On(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(jr(r[o].image)):s.push(jr(r[o]))}else s=jr(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function jr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?fl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let lu=0;class Tt extends vi{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=Yt,r=Yt,s=Dt,o=Oi,a=Ht,l=yn,c=Tt.DEFAULT_ANISOTROPY,u=kt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=On(),this.name="",this.source=new dl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Li("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Un?Mt:kt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Is:e.x=e.x-Math.floor(e.x);break;case Yt:e.x=e.x<0?0:1;break;case Ds:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Is:e.y=e.y-Math.floor(e.y);break;case Yt:e.y=e.y<0?0:1;break;case Ds:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Li("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Mt?Un:cl}set encoding(e){Li("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Un?Mt:kt}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=tl;Tt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,r=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,S=(d+1)/2,C=(p+1)/2,T=(u+f)/4,A=(h+v)/4,F=(g+m)/4;return x>S&&x>C?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=T/n,s=A/n):S>C?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=T/r,s=F/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=A/s,r=F/s),this.set(n,r,s,t),this}let _=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(h-v)/_,this.z=(f-u)/_,this.w=Math.acos((c+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cu extends vi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Li("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Un?Mt:kt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Tt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new dl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nn extends cu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class pl extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=dt,this.minFilter=dt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uu extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=dt,this.minFilter=dt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],v=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==f||c!==d||u!==g){let m=1-a;const p=l*f+c*d+u*g+h*v,_=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),T=Math.atan2(C,p*_);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}const S=a*_;if(l=l*m+f*S,c=c*m+d*S,u=u*m+g*S,h=h*m+v*S,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*d-c*f,e[t+1]=l*g+u*f+c*h-a*d,e[t+2]=c*g+u*d+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),h=a(s/2),f=l(n/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ja.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ja.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qr.copy(this).projectOnVector(e),this.sub(Qr)}reflect(e){return this.sub(Qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new R,Ja=new Wi;class zn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Wt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Wt):Wt.fromBufferAttribute(s,o),Wt.applyMatrix4(e.matrixWorld),this.expandByPoint(Wt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zi.copy(n.boundingBox)),Zi.applyMatrix4(e.matrixWorld),this.union(Zi)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Wt),Wt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mi),Ji.subVectors(this.max,Mi),Hn.subVectors(e.a,Mi),kn.subVectors(e.b,Mi),Wn.subVectors(e.c,Mi),hn.subVectors(kn,Hn),fn.subVectors(Wn,kn),wn.subVectors(Hn,Wn);let t=[0,-hn.z,hn.y,0,-fn.z,fn.y,0,-wn.z,wn.y,hn.z,0,-hn.x,fn.z,0,-fn.x,wn.z,0,-wn.x,-hn.y,hn.x,0,-fn.y,fn.x,0,-wn.y,wn.x,0];return!es(t,Hn,kn,Wn,Ji)||(t=[1,0,0,0,1,0,0,0,1],!es(t,Hn,kn,Wn,Ji))?!1:($i.crossVectors(hn,fn),t=[$i.x,$i.y,$i.z],es(t,Hn,kn,Wn,Ji))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(en[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),en[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),en[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),en[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),en[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),en[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),en[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),en[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(en),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const en=[new R,new R,new R,new R,new R,new R,new R,new R],Wt=new R,Zi=new zn,Hn=new R,kn=new R,Wn=new R,hn=new R,fn=new R,wn=new R,Mi=new R,Ji=new R,$i=new R,En=new R;function es(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){En.fromArray(i,s);const a=r.x*Math.abs(En.x)+r.y*Math.abs(En.y)+r.z*Math.abs(En.z),l=e.dot(En),c=t.dot(En),u=n.dot(En);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const hu=new zn,Si=new R,ts=new R;class Bn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):hu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Si.subVectors(e,this.center);const t=Si.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Si,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ts.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Si.copy(e.center).add(ts)),this.expandByPoint(Si.copy(e.center).sub(ts))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const tn=new R,ns=new R,Ki=new R,dn=new R,is=new R,ji=new R,rs=new R;class qs{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,tn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=tn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(tn.copy(this.origin).addScaledVector(this.direction,t),tn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ns.copy(e).add(t).multiplyScalar(.5),Ki.copy(t).sub(e).normalize(),dn.copy(this.origin).sub(ns);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ki),a=dn.dot(this.direction),l=-dn.dot(Ki),c=dn.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ns).addScaledVector(Ki,f),d}intersectSphere(e,t){tn.subVectors(e.center,this.origin);const n=tn.dot(this.direction),r=tn.dot(tn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,tn)!==null}intersectTriangle(e,t,n,r,s){is.subVectors(t,e),ji.subVectors(n,e),rs.crossVectors(is,ji);let o=this.direction.dot(rs),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;dn.subVectors(this.origin,e);const l=a*this.direction.dot(ji.crossVectors(dn,ji));if(l<0)return null;const c=a*this.direction.dot(is.cross(dn));if(c<0||l+c>o)return null;const u=-a*dn.dot(rs);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,r,s,o,a,l,c,u,h,f,d,g,v,m){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,h,f,d,g,v,m)}set(e,t,n,r,s,o,a,l,c,u,h,f,d,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/qn.setFromMatrixColumn(e,0).length(),s=1/qn.setFromMatrixColumn(e,1).length(),o=1/qn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,v=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+g*c,t[5]=f-v*c,t[9]=-a*l,t[2]=v-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,g=c*u,v=c*h;t[0]=f+v*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=v+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,g=c*u,v=c*h;t[0]=f-v*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,v=a*h;t[0]=l*u,t[4]=g*c-d,t[8]=f*c+v,t[1]=l*h,t[5]=v*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,g=a*l,v=a*c;t[0]=l*u,t[4]=v-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+g,t[10]=f-v*h}else if(e.order==="XZY"){const f=o*l,d=o*c,g=a*l,v=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+v,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fu,e,du)}lookAt(e,t,n){const r=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),pn.crossVectors(n,Ft),pn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),pn.crossVectors(n,Ft)),pn.normalize(),Qi.crossVectors(Ft,pn),r[0]=pn.x,r[4]=Qi.x,r[8]=Ft.x,r[1]=pn.y,r[5]=Qi.y,r[9]=Ft.y,r[2]=pn.z,r[6]=Qi.z,r[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],_=n[3],x=n[7],S=n[11],C=n[15],T=r[0],A=r[4],F=r[8],y=r[12],w=r[1],z=r[5],W=r[9],ee=r[13],I=r[2],P=r[6],D=r[10],q=r[14],N=r[3],O=r[7],Y=r[11],j=r[15];return s[0]=o*T+a*w+l*I+c*N,s[4]=o*A+a*z+l*P+c*O,s[8]=o*F+a*W+l*D+c*Y,s[12]=o*y+a*ee+l*q+c*j,s[1]=u*T+h*w+f*I+d*N,s[5]=u*A+h*z+f*P+d*O,s[9]=u*F+h*W+f*D+d*Y,s[13]=u*y+h*ee+f*q+d*j,s[2]=g*T+v*w+m*I+p*N,s[6]=g*A+v*z+m*P+p*O,s[10]=g*F+v*W+m*D+p*Y,s[14]=g*y+v*ee+m*q+p*j,s[3]=_*T+x*w+S*I+C*N,s[7]=_*A+x*z+S*P+C*O,s[11]=_*F+x*W+S*D+C*Y,s[15]=_*y+x*ee+S*q+C*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+s*l*h-r*c*h-s*a*f+n*c*f+r*a*d-n*l*d)+v*(+t*l*d-t*c*f+s*o*f-r*o*d+r*c*u-s*l*u)+m*(+t*c*h-t*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+p*(-r*a*u-t*l*h+t*a*f+r*o*h-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],v=e[13],m=e[14],p=e[15],_=h*m*c-v*f*c+v*l*d-a*m*d-h*l*p+a*f*p,x=g*f*c-u*m*c-g*l*d+o*m*d+u*l*p-o*f*p,S=u*v*c-g*h*c+g*a*d-o*v*d-u*a*p+o*h*p,C=g*h*l-u*v*l-g*a*f+o*v*f+u*a*m-o*h*m,T=t*_+n*x+r*S+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=_*A,e[1]=(v*f*s-h*m*s-v*r*d+n*m*d+h*r*p-n*f*p)*A,e[2]=(a*m*s-v*l*s+v*r*c-n*m*c-a*r*p+n*l*p)*A,e[3]=(h*l*s-a*f*s-h*r*c+n*f*c+a*r*d-n*l*d)*A,e[4]=x*A,e[5]=(u*m*s-g*f*s+g*r*d-t*m*d-u*r*p+t*f*p)*A,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*A,e[7]=(o*f*s-u*l*s+u*r*c-t*f*c-o*r*d+t*l*d)*A,e[8]=S*A,e[9]=(g*h*s-u*v*s-g*n*d+t*v*d+u*n*p-t*h*p)*A,e[10]=(o*v*s-g*a*s+g*n*c-t*v*c-o*n*p+t*a*p)*A,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*d-t*a*d)*A,e[12]=C*A,e[13]=(u*v*r-g*h*r+g*n*f-t*v*f-u*n*m+t*h*m)*A,e[14]=(g*a*r-o*v*r-g*n*l+t*v*l+o*n*m-t*a*m)*A,e[15]=(o*h*r-u*a*r+u*n*l-t*h*l-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,g=s*h,v=o*u,m=o*h,p=a*h,_=l*c,x=l*u,S=l*h,C=n.x,T=n.y,A=n.z;return r[0]=(1-(v+p))*C,r[1]=(d+S)*C,r[2]=(g-x)*C,r[3]=0,r[4]=(d-S)*T,r[5]=(1-(f+p))*T,r[6]=(m+_)*T,r[7]=0,r[8]=(g+x)*A,r[9]=(m-_)*A,r[10]=(1-(f+v))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=qn.set(r[0],r[1],r[2]).length();const o=qn.set(r[4],r[5],r[6]).length(),a=qn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],qt.copy(this);const c=1/s,u=1/o,h=1/a;return qt.elements[0]*=c,qt.elements[1]*=c,qt.elements[2]*=c,qt.elements[4]*=u,qt.elements[5]*=u,qt.elements[6]*=u,qt.elements[8]*=h,qt.elements[9]*=h,qt.elements[10]*=h,t.setFromRotationMatrix(qt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=ln){const l=this.elements,c=2*s/(t-e),u=2*s/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r);let d,g;if(a===ln)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Lr)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=ln){const l=this.elements,c=1/(t-e),u=1/(n-r),h=1/(o-s),f=(t+e)*c,d=(n+r)*u;let g,v;if(a===ln)g=(o+s)*h,v=-2*h;else if(a===Lr)g=s*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const qn=new R,qt=new tt,fu=new R(0,0,0),du=new R(1,1,1),pn=new R,Qi=new R,Ft=new R,$a=new tt,Ka=new Wi;class Or{constructor(e=0,t=0,n=0,r=Or.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(St(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(St(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-St(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(St(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-St(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $a.makeRotationFromQuaternion(e),this.setFromRotationMatrix($a,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ka.setFromEuler(this),this.setFromQuaternion(Ka,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Or.DEFAULT_ORDER="XYZ";class ml{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let pu=0;const ja=new R,Xn=new Wi,nn=new tt,er=new R,bi=new R,mu=new R,gu=new Wi,Qa=new R(1,0,0),eo=new R(0,1,0),to=new R(0,0,1),vu={type:"added"},xu={type:"removed"};class pt extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=On(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new R,t=new Or,n=new Wi,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new tt},normalMatrix:{value:new He}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ml,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xn.setFromAxisAngle(e,t),this.quaternion.multiply(Xn),this}rotateOnWorldAxis(e,t){return Xn.setFromAxisAngle(e,t),this.quaternion.premultiply(Xn),this}rotateX(e){return this.rotateOnAxis(Qa,e)}rotateY(e){return this.rotateOnAxis(eo,e)}rotateZ(e){return this.rotateOnAxis(to,e)}translateOnAxis(e,t){return ja.copy(e).applyQuaternion(this.quaternion),this.position.add(ja.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qa,e)}translateY(e){return this.translateOnAxis(eo,e)}translateZ(e){return this.translateOnAxis(to,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?er.copy(e):er.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?nn.lookAt(bi,er,this.up):nn.lookAt(er,bi,this.up),this.quaternion.setFromRotationMatrix(nn),r&&(nn.extractRotation(r.matrixWorld),Xn.setFromRotationMatrix(nn),this.quaternion.premultiply(Xn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(vu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(nn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,e,mu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,gu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}pt.DEFAULT_UP=new R(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xt=new R,rn=new R,ss=new R,sn=new R,Yn=new R,Zn=new R,no=new R,as=new R,os=new R,ls=new R;let tr=!1;class Vt{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Xt.subVectors(e,t),r.cross(Xt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Xt.subVectors(r,t),rn.subVectors(n,t),ss.subVectors(e,t);const o=Xt.dot(Xt),a=Xt.dot(rn),l=Xt.dot(ss),c=rn.dot(rn),u=rn.dot(ss),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getUV(e,t,n,r,s,o,a,l){return tr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),tr=!0),this.getInterpolation(e,t,n,r,s,o,a,l)}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,sn.x),l.addScaledVector(o,sn.y),l.addScaledVector(a,sn.z),l)}static isFrontFacing(e,t,n,r){return Xt.subVectors(n,t),rn.subVectors(e,t),Xt.cross(rn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),rn.subVectors(this.a,this.b),Xt.cross(rn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return tr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),tr=!0),Vt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return Vt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Vt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Yn.subVectors(r,n),Zn.subVectors(s,n),as.subVectors(e,n);const l=Yn.dot(as),c=Zn.dot(as);if(l<=0&&c<=0)return t.copy(n);os.subVectors(e,r);const u=Yn.dot(os),h=Zn.dot(os);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Yn,o);ls.subVectors(e,s);const d=Yn.dot(ls),g=Zn.dot(ls);if(g>=0&&d<=g)return t.copy(s);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Zn,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return no.subVectors(s,r),a=(h-u)/(h-u+(d-g)),t.copy(r).addScaledVector(no,a);const p=1/(m+v+f);return o=v*p,a=f*p,t.copy(n).addScaledVector(Yn,o).addScaledVector(Zn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const gl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mn={h:0,s:0,l:0},nr={h:0,s:0,l:0};function cs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Je.workingColorSpace){if(e=Ws(e,1),t=St(t,0,1),n=St(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=cs(o,s,e+1/3),this.g=cs(o,s,e),this.b=cs(o,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,t=Mt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const n=gl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=Kr(e.r),this.g=Kr(e.g),this.b=Kr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return Je.fromWorkingColorSpace(Et.copy(this),e),Math.round(St(Et.r*255,0,255))*65536+Math.round(St(Et.g*255,0,255))*256+Math.round(St(Et.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace(Et.copy(this),t);const n=Et.r,r=Et.g,s=Et.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=Mt){Je.fromWorkingColorSpace(Et.copy(this),e);const t=Et.r,n=Et.g,r=Et.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(mn),this.setHSL(mn.h+e,mn.s+t,mn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(mn),e.getHSL(nr);const n=Pi(mn.h,nr.h,t),r=Pi(mn.s,nr.s,t),s=Pi(mn.l,nr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new xe;xe.NAMES=gl;let _u=0;class xi extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=On(),this.name="",this.type="Material",this.blending=ui,this.side=cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cs,this.blendDst=Rs,this.blendEquation=Pn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=Ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Va,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gn,this.stencilZFail=Gn,this.stencilZPass=Gn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ui&&(n.blending=this.blending),this.side!==cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Cs&&(n.blendSrc=this.blendSrc),this.blendDst!==Rs&&(n.blendDst=this.blendDst),this.blendEquation!==Pn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ar&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Va&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Lt extends xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=el,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ht=new R,ir=new ce;class ut{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ha,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ir.fromBufferAttribute(this,t),ir.applyMatrix3(e),this.setXY(t,ir.x,ir.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ha&&(e.usage=this.usage),e}}class vl extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class xl extends ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Fe extends ut{constructor(e,t,n){super(new Float32Array(e),t,n)}}let yu=0;const Gt=new tt,us=new pt,Jn=new R,Ot=new zn,wi=new zn,_t=new R;class et extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=On(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hl(e)?xl:vl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new He().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,n){return Gt.makeTranslation(e,t,n),this.applyMatrix4(Gt),this}scale(e,t,n){return Gt.makeScale(e,t,n),this.applyMatrix4(Gt),this}lookAt(e){return us.lookAt(e),us.updateMatrix(),this.applyMatrix4(us.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Jn).negate(),this.translate(Jn.x,Jn.y,Jn.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Fe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Ot.setFromBufferAttribute(s),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,Ot.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,Ot.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(Ot.min),this.boundingBox.expandByPoint(Ot.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Ot.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];wi.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(Ot.min,wi.min),Ot.expandByPoint(_t),_t.addVectors(Ot.max,wi.max),Ot.expandByPoint(_t)):(Ot.expandByPoint(wi.min),Ot.expandByPoint(wi.max))}Ot.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)_t.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(_t));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)_t.fromBufferAttribute(a,c),l&&(Jn.fromBufferAttribute(e,c),_t.add(Jn)),r=Math.max(r,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ut(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<a;w++)c[w]=new R,u[w]=new R;const h=new R,f=new R,d=new R,g=new ce,v=new ce,m=new ce,p=new R,_=new R;function x(w,z,W){h.fromArray(r,w*3),f.fromArray(r,z*3),d.fromArray(r,W*3),g.fromArray(o,w*2),v.fromArray(o,z*2),m.fromArray(o,W*2),f.sub(h),d.sub(h),v.sub(g),m.sub(g);const ee=1/(v.x*m.y-m.x*v.y);isFinite(ee)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-v.y).multiplyScalar(ee),_.copy(d).multiplyScalar(v.x).addScaledVector(f,-m.x).multiplyScalar(ee),c[w].add(p),c[z].add(p),c[W].add(p),u[w].add(_),u[z].add(_),u[W].add(_))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let w=0,z=S.length;w<z;++w){const W=S[w],ee=W.start,I=W.count;for(let P=ee,D=ee+I;P<D;P+=3)x(n[P+0],n[P+1],n[P+2])}const C=new R,T=new R,A=new R,F=new R;function y(w){A.fromArray(s,w*3),F.copy(A);const z=c[w];C.copy(z),C.sub(A.multiplyScalar(A.dot(z))).normalize(),T.crossVectors(F,z);const ee=T.dot(u[w])<0?-1:1;l[w*4]=C.x,l[w*4+1]=C.y,l[w*4+2]=C.z,l[w*4+3]=ee}for(let w=0,z=S.length;w<z;++w){const W=S[w],ee=W.start,I=W.count;for(let P=ee,D=ee+I;P<D;P+=3)y(n[P+0]),y(n[P+1]),y(n[P+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new R,s=new R,o=new R,a=new R,l=new R,c=new R,u=new R,h=new R;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new ut(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new et,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const io=new tt,Tn=new qs,rr=new Bn,ro=new R,$n=new R,Kn=new R,jn=new R,hs=new R,sr=new R,ar=new ce,or=new ce,lr=new ce,so=new R,ao=new R,oo=new R,cr=new R,ur=new R;class qe extends pt{constructor(e=new et,t=new Lt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){sr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(hs.fromBufferAttribute(h,e),o?sr.addScaledVector(hs,u):sr.addScaledVector(hs.sub(t),u))}t.add(sr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(s),Tn.copy(e.ray).recast(e.near),!(rr.containsPoint(Tn.origin)===!1&&(Tn.intersectSphere(rr,ro)===null||Tn.origin.distanceToSquared(ro)>(e.far-e.near)**2))&&(io.copy(s).invert(),Tn.copy(e.ray).applyMatrix4(io),!(n.boundingBox!==null&&Tn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Tn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],_=Math.max(m.start,d.start),x=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let S=_,C=x;S<C;S+=3){const T=a.getX(S),A=a.getX(S+1),F=a.getX(S+2);r=hr(this,p,e,n,c,u,h,T,A,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const _=a.getX(m),x=a.getX(m+1),S=a.getX(m+2);r=hr(this,o,e,n,c,u,h,_,x,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],_=Math.max(m.start,d.start),x=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=_,C=x;S<C;S+=3){const T=S,A=S+1,F=S+2;r=hr(this,p,e,n,c,u,h,T,A,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const _=m,x=m+1,S=m+2;r=hr(this,o,e,n,c,u,h,_,x,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Mu(i,e,t,n,r,s,o,a){let l;if(e.side===Ut?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===cn,a),l===null)return null;ur.copy(a),ur.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ur);return c<t.near||c>t.far?null:{distance:c,point:ur.clone(),object:i}}function hr(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,$n),i.getVertexPosition(l,Kn),i.getVertexPosition(c,jn);const u=Mu(i,e,t,n,$n,Kn,jn,cr);if(u){r&&(ar.fromBufferAttribute(r,a),or.fromBufferAttribute(r,l),lr.fromBufferAttribute(r,c),u.uv=Vt.getInterpolation(cr,$n,Kn,jn,ar,or,lr,new ce)),s&&(ar.fromBufferAttribute(s,a),or.fromBufferAttribute(s,l),lr.fromBufferAttribute(s,c),u.uv1=Vt.getInterpolation(cr,$n,Kn,jn,ar,or,lr,new ce),u.uv2=u.uv1),o&&(so.fromBufferAttribute(o,a),ao.fromBufferAttribute(o,l),oo.fromBufferAttribute(o,c),u.normal=Vt.getInterpolation(cr,$n,Kn,jn,so,ao,oo,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new R,materialIndex:0};Vt.getNormal($n,Kn,jn,h.normal),u.face=h}return u}class Mn extends et{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Fe(c,3)),this.setAttribute("normal",new Fe(u,3)),this.setAttribute("uv",new Fe(h,2));function g(v,m,p,_,x,S,C,T,A,F,y){const w=S/A,z=C/F,W=S/2,ee=C/2,I=T/2,P=A+1,D=F+1;let q=0,N=0;const O=new R;for(let Y=0;Y<D;Y++){const j=Y*z-ee;for(let se=0;se<P;se++){const X=se*w-W;O[v]=X*_,O[m]=j*x,O[p]=I,c.push(O.x,O.y,O.z),O[v]=0,O[m]=0,O[p]=T>0?1:-1,u.push(O.x,O.y,O.z),h.push(se/A),h.push(1-Y/F),q+=1}}for(let Y=0;Y<F;Y++)for(let j=0;j<A;j++){const se=f+j+P*Y,X=f+j+P*(Y+1),Z=f+(j+1)+P*(Y+1),oe=f+(j+1)+P*Y;l.push(se,X,oe),l.push(X,Z,oe),N+=6}a.addGroup(d,N,y),d+=N,f+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function gi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function It(i){const e={};for(let t=0;t<i.length;t++){const n=gi(i[t]);for(const r in n)e[r]=n[r]}return e}function Su(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function _l(i){return i.getRenderTarget()===null?i.outputColorSpace:Je.workingColorSpace}const bu={clone:gi,merge:It};var wu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ft extends xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wu,this.fragmentShader=Eu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gi(e.uniforms),this.uniformsGroups=Su(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class yl extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=ln}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class zt extends yl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(hi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bi*2*Math.atan(Math.tan(hi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(hi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Qn=-90,ei=1;class Tu extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new zt(Qn,ei,e,t);r.layers=this.layers,this.add(r);const s=new zt(Qn,ei,e,t);s.layers=this.layers,this.add(s);const o=new zt(Qn,ei,e,t);o.layers=this.layers,this.add(o);const a=new zt(Qn,ei,e,t);a.layers=this.layers,this.add(a);const l=new zt(Qn,ei,e,t);l.layers=this.layers,this.add(l);const c=new zt(Qn,ei,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===ln)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ml extends Tt{constructor(e,t,n,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:di,super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Au extends Nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Li("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Un?Mt:kt),this.texture=new Ml(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Dt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Mn(5,5,5),s=new ft({name:"CubemapFromEquirect",uniforms:gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:xn});s.uniforms.tEquirect.value=t;const o=new qe(r,s),a=t.minFilter;return t.minFilter===Oi&&(t.minFilter=Dt),new Tu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const fs=new R,Cu=new R,Ru=new He;class Cn{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=fs.subVectors(n,t).cross(Cu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(fs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ru.getNormalMatrix(e),r=this.coplanarPoint(fs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const An=new Bn,fr=new R;class Xs{constructor(e=new Cn,t=new Cn,n=new Cn,r=new Cn,s=new Cn,o=new Cn){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ln){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],d=r[8],g=r[9],v=r[10],m=r[11],p=r[12],_=r[13],x=r[14],S=r[15];if(n[0].setComponents(l-s,f-c,m-d,S-p).normalize(),n[1].setComponents(l+s,f+c,m+d,S+p).normalize(),n[2].setComponents(l+o,f+u,m+g,S+_).normalize(),n[3].setComponents(l-o,f-u,m-g,S-_).normalize(),n[4].setComponents(l-a,f-h,m-v,S-x).normalize(),t===ln)n[5].setComponents(l+a,f+h,m+v,S+x).normalize();else if(t===Lr)n[5].setComponents(a,h,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),An.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),An.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(An)}intersectsSprite(e){return An.center.set(0,0,0),An.radius=.7071067811865476,An.applyMatrix4(e.matrixWorld),this.intersectsSphere(An)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(fr.x=r.normal.x>0?e.max.x:e.min.x,fr.y=r.normal.y>0?e.max.y:e.min.y,fr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(fr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Sl(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Pu(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,u){const h=c.array,f=c.usage,d=h.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,h,f),c.onUploadCallback();let v;if(h instanceof Float32Array)v=i.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)v=i.SHORT;else if(h instanceof Uint32Array)v=i.UNSIGNED_INT;else if(h instanceof Int32Array)v=i.INT;else if(h instanceof Int8Array)v=i.BYTE;else if(h instanceof Uint8Array)v=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)v=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:d}}function s(c,u,h){const f=u.array,d=u._updateRange,g=u.updateRanges;if(i.bindBuffer(h,c),d.count===-1&&g.length===0&&i.bufferSubData(h,0,f),g.length!==0){for(let v=0,m=g.length;v<m;v++){const p=g[v];t?i.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):i.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}d.count!==-1&&(t?i.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):i.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,r(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,u),h.version=c.version}}return{get:o,remove:a,update:l}}class $t extends et{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,h=e/a,f=t/l,d=[],g=[],v=[],m=[];for(let p=0;p<u;p++){const _=p*f-o;for(let x=0;x<c;x++){const S=x*h-s;g.push(S,-_,0),v.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<a;_++){const x=_+c*p,S=_+c*(p+1),C=_+1+c*(p+1),T=_+1+c*p;d.push(x,S,T),d.push(S,C,T)}this.setIndex(d),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(v,3)),this.setAttribute("uv",new Fe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $t(e.width,e.height,e.widthSegments,e.heightSegments)}}var Lu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Iu=`#ifdef USE_ALPHAHASH
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
#endif`,Du=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Fu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ou=`#ifdef USE_AOMAP
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
#endif`,zu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bu=`#ifdef USE_BATCHING
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
#endif`,Gu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Vu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ku=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wu=`#ifdef USE_IRIDESCENCE
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
#endif`,qu=`#ifdef USE_BUMPMAP
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
#endif`,Xu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ju=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ku=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ju=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Qu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,eh=`#define PI 3.141592653589793
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
} // validated`,th=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,nh=`vec3 transformedNormal = objectNormal;
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
#endif`,ih=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ah=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,oh="gl_FragColor = linearToOutputTexel( gl_FragColor );",lh=`
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
}`,ch=`#ifdef USE_ENVMAP
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
#endif`,uh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hh=`#ifdef USE_ENVMAP
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
#endif`,fh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dh=`#ifdef USE_ENVMAP
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
#endif`,ph=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xh=`#ifdef USE_GRADIENTMAP
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
}`,_h=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,yh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bh=`uniform bool receiveShadow;
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
#endif`,wh=`#ifdef USE_ENVMAP
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
#endif`,Eh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Th=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ah=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ch=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rh=`PhysicalMaterial material;
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
#endif`,Ph=`struct PhysicalMaterial {
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
}`,Lh=`
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
#endif`,Ih=`#if defined( RE_IndirectDiffuse )
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
#endif`,Dh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Uh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Oh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,zh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vh=`#if defined( USE_POINTS_UV )
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
#endif`,Hh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qh=`#ifdef USE_MORPHNORMALS
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
#endif`,Xh=`#ifdef USE_MORPHTARGETS
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
#endif`,Yh=`#ifdef USE_MORPHTARGETS
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
#endif`,Zh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$h=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qh=`#ifdef USE_NORMALMAP
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
#endif`,ef=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,af=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,of=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uf=`#ifdef DITHERING
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
#endif`,ff=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,df=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gf=`float getShadowMask() {
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
}`,vf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xf=`#ifdef USE_SKINNING
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
#endif`,yf=`#ifdef USE_SKINNING
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
#endif`,Mf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ef=`#ifdef USE_TRANSMISSION
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
#endif`,Af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,If=`uniform sampler2D t2D;
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
}`,Uf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ff=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Of=`#include <common>
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
}`,zf=`#if DEPTH_PACKING == 3200
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
}`,Bf=`#define DISTANCE
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
}`,Gf=`#define DISTANCE
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
}`,Vf=`varying vec3 vWorldDirection;
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
}`,kf=`uniform float scale;
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
}`,Wf=`uniform vec3 diffuse;
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
}`,qf=`#include <common>
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
}`,Yf=`#define LAMBERT
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
}`,Zf=`#define LAMBERT
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
}`,Jf=`#define MATCAP
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
}`,$f=`#define MATCAP
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
}`,Kf=`#define NORMAL
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
}`,jf=`#define NORMAL
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
}`,Qf=`#define PHONG
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
}`,ed=`#define PHONG
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
}`,td=`#define STANDARD
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
}`,nd=`#define STANDARD
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
}`,id=`#define TOON
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
}`,rd=`#define TOON
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
}`,sd=`uniform float size;
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
}`,ad=`uniform vec3 diffuse;
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
}`,od=`#include <common>
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
}`,ld=`uniform vec3 color;
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
}`,cd=`uniform float rotation;
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
}`,ud=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:Lu,alphahash_pars_fragment:Iu,alphamap_fragment:Du,alphamap_pars_fragment:Uu,alphatest_fragment:Nu,alphatest_pars_fragment:Fu,aomap_fragment:Ou,aomap_pars_fragment:zu,batching_pars_vertex:Bu,batching_vertex:Gu,begin_vertex:Vu,beginnormal_vertex:Hu,bsdfs:ku,iridescence_fragment:Wu,bumpmap_pars_fragment:qu,clipping_planes_fragment:Xu,clipping_planes_pars_fragment:Yu,clipping_planes_pars_vertex:Zu,clipping_planes_vertex:Ju,color_fragment:$u,color_pars_fragment:Ku,color_pars_vertex:ju,color_vertex:Qu,common:eh,cube_uv_reflection_fragment:th,defaultnormal_vertex:nh,displacementmap_pars_vertex:ih,displacementmap_vertex:rh,emissivemap_fragment:sh,emissivemap_pars_fragment:ah,colorspace_fragment:oh,colorspace_pars_fragment:lh,envmap_fragment:ch,envmap_common_pars_fragment:uh,envmap_pars_fragment:hh,envmap_pars_vertex:fh,envmap_physical_pars_fragment:wh,envmap_vertex:dh,fog_vertex:ph,fog_pars_vertex:mh,fog_fragment:gh,fog_pars_fragment:vh,gradientmap_pars_fragment:xh,lightmap_fragment:_h,lightmap_pars_fragment:yh,lights_lambert_fragment:Mh,lights_lambert_pars_fragment:Sh,lights_pars_begin:bh,lights_toon_fragment:Eh,lights_toon_pars_fragment:Th,lights_phong_fragment:Ah,lights_phong_pars_fragment:Ch,lights_physical_fragment:Rh,lights_physical_pars_fragment:Ph,lights_fragment_begin:Lh,lights_fragment_maps:Ih,lights_fragment_end:Dh,logdepthbuf_fragment:Uh,logdepthbuf_pars_fragment:Nh,logdepthbuf_pars_vertex:Fh,logdepthbuf_vertex:Oh,map_fragment:zh,map_pars_fragment:Bh,map_particle_fragment:Gh,map_particle_pars_fragment:Vh,metalnessmap_fragment:Hh,metalnessmap_pars_fragment:kh,morphcolor_vertex:Wh,morphnormal_vertex:qh,morphtarget_pars_vertex:Xh,morphtarget_vertex:Yh,normal_fragment_begin:Zh,normal_fragment_maps:Jh,normal_pars_fragment:$h,normal_pars_vertex:Kh,normal_vertex:jh,normalmap_pars_fragment:Qh,clearcoat_normal_fragment_begin:ef,clearcoat_normal_fragment_maps:tf,clearcoat_pars_fragment:nf,iridescence_pars_fragment:rf,opaque_fragment:sf,packing:af,premultiplied_alpha_fragment:of,project_vertex:lf,dithering_fragment:cf,dithering_pars_fragment:uf,roughnessmap_fragment:hf,roughnessmap_pars_fragment:ff,shadowmap_pars_fragment:df,shadowmap_pars_vertex:pf,shadowmap_vertex:mf,shadowmask_pars_fragment:gf,skinbase_vertex:vf,skinning_pars_vertex:xf,skinning_vertex:_f,skinnormal_vertex:yf,specularmap_fragment:Mf,specularmap_pars_fragment:Sf,tonemapping_fragment:bf,tonemapping_pars_fragment:wf,transmission_fragment:Ef,transmission_pars_fragment:Tf,uv_pars_fragment:Af,uv_pars_vertex:Cf,uv_vertex:Rf,worldpos_vertex:Pf,background_vert:Lf,background_frag:If,backgroundCube_vert:Df,backgroundCube_frag:Uf,cube_vert:Nf,cube_frag:Ff,depth_vert:Of,depth_frag:zf,distanceRGBA_vert:Bf,distanceRGBA_frag:Gf,equirect_vert:Vf,equirect_frag:Hf,linedashed_vert:kf,linedashed_frag:Wf,meshbasic_vert:qf,meshbasic_frag:Xf,meshlambert_vert:Yf,meshlambert_frag:Zf,meshmatcap_vert:Jf,meshmatcap_frag:$f,meshnormal_vert:Kf,meshnormal_frag:jf,meshphong_vert:Qf,meshphong_frag:ed,meshphysical_vert:td,meshphysical_frag:nd,meshtoon_vert:id,meshtoon_frag:rd,points_vert:sd,points_frag:ad,shadow_vert:od,shadow_frag:ld,sprite_vert:cd,sprite_frag:ud},ne={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Kt={basic:{uniforms:It([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:It([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new xe(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:It([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:It([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:It([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new xe(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:It([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:It([ne.points,ne.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:It([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:It([ne.common,ne.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:It([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:It([ne.sprite,ne.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:It([ne.common,ne.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:It([ne.lights,ne.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};Kt.physical={uniforms:It([Kt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const dr={r:0,b:0,g:0};function hd(i,e,t,n,r,s,o){const a=new xe(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function g(m,p){let _=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?v(a,l):x&&x.isColor&&(v(x,1),_=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Nr)?(u===void 0&&(u=new qe(new Mn(1,1,1),new ft({name:"BackgroundCubeMaterial",uniforms:gi(Kt.backgroundCube.uniforms),vertexShader:Kt.backgroundCube.vertexShader,fragmentShader:Kt.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=Je.getTransfer(x.colorSpace)!==nt,(h!==x||f!==x.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=x,f=x.version,d=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new qe(new $t(2,2),new ft({name:"BackgroundMaterial",uniforms:gi(Kt.background.uniforms),vertexShader:Kt.background.vertexShader,fragmentShader:Kt.background.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Je.getTransfer(x.colorSpace)!==nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,d=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,p){m.getRGB(dr,_l(i)),n.buffers.color.setClear(dr.r,dr.g,dr.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(a,l)},render:g}}function fd(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function h(I,P,D,q,N){let O=!1;if(o){const Y=v(q,D,P);c!==Y&&(c=Y,d(c.object)),O=p(I,q,D,N),O&&_(I,q,D,N)}else{const Y=P.wireframe===!0;(c.geometry!==q.id||c.program!==D.id||c.wireframe!==Y)&&(c.geometry=q.id,c.program=D.id,c.wireframe=Y,O=!0)}N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(O||u)&&(u=!1,F(I,P,D,q),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function f(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function d(I){return n.isWebGL2?i.bindVertexArray(I):s.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?i.deleteVertexArray(I):s.deleteVertexArrayOES(I)}function v(I,P,D){const q=D.wireframe===!0;let N=a[I.id];N===void 0&&(N={},a[I.id]=N);let O=N[P.id];O===void 0&&(O={},N[P.id]=O);let Y=O[q];return Y===void 0&&(Y=m(f()),O[q]=Y),Y}function m(I){const P=[],D=[],q=[];for(let N=0;N<r;N++)P[N]=0,D[N]=0,q[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:q,object:I,attributes:{},index:null}}function p(I,P,D,q){const N=c.attributes,O=P.attributes;let Y=0;const j=D.getAttributes();for(const se in j)if(j[se].location>=0){const Z=N[se];let oe=O[se];if(oe===void 0&&(se==="instanceMatrix"&&I.instanceMatrix&&(oe=I.instanceMatrix),se==="instanceColor"&&I.instanceColor&&(oe=I.instanceColor)),Z===void 0||Z.attribute!==oe||oe&&Z.data!==oe.data)return!0;Y++}return c.attributesNum!==Y||c.index!==q}function _(I,P,D,q){const N={},O=P.attributes;let Y=0;const j=D.getAttributes();for(const se in j)if(j[se].location>=0){let Z=O[se];Z===void 0&&(se==="instanceMatrix"&&I.instanceMatrix&&(Z=I.instanceMatrix),se==="instanceColor"&&I.instanceColor&&(Z=I.instanceColor));const oe={};oe.attribute=Z,Z&&Z.data&&(oe.data=Z.data),N[se]=oe,Y++}c.attributes=N,c.attributesNum=Y,c.index=q}function x(){const I=c.newAttributes;for(let P=0,D=I.length;P<D;P++)I[P]=0}function S(I){C(I,0)}function C(I,P){const D=c.newAttributes,q=c.enabledAttributes,N=c.attributeDivisors;D[I]=1,q[I]===0&&(i.enableVertexAttribArray(I),q[I]=1),N[I]!==P&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,P),N[I]=P)}function T(){const I=c.newAttributes,P=c.enabledAttributes;for(let D=0,q=P.length;D<q;D++)P[D]!==I[D]&&(i.disableVertexAttribArray(D),P[D]=0)}function A(I,P,D,q,N,O,Y){Y===!0?i.vertexAttribIPointer(I,P,D,N,O):i.vertexAttribPointer(I,P,D,q,N,O)}function F(I,P,D,q){if(n.isWebGL2===!1&&(I.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const N=q.attributes,O=D.getAttributes(),Y=P.defaultAttributeValues;for(const j in O){const se=O[j];if(se.location>=0){let X=N[j];if(X===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(X=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(X=I.instanceColor)),X!==void 0){const Z=X.normalized,oe=X.itemSize,pe=t.get(X);if(pe===void 0)continue;const fe=pe.buffer,Le=pe.type,De=pe.bytesPerElement,we=n.isWebGL2===!0&&(Le===i.INT||Le===i.UNSIGNED_INT||X.gpuType===nl);if(X.isInterleavedBufferAttribute){const We=X.data,B=We.stride,At=X.offset;if(We.isInstancedInterleavedBuffer){for(let ye=0;ye<se.locationSize;ye++)C(se.location+ye,We.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let ye=0;ye<se.locationSize;ye++)S(se.location+ye);i.bindBuffer(i.ARRAY_BUFFER,fe);for(let ye=0;ye<se.locationSize;ye++)A(se.location+ye,oe/se.locationSize,Le,Z,B*De,(At+oe/se.locationSize*ye)*De,we)}else{if(X.isInstancedBufferAttribute){for(let We=0;We<se.locationSize;We++)C(se.location+We,X.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let We=0;We<se.locationSize;We++)S(se.location+We);i.bindBuffer(i.ARRAY_BUFFER,fe);for(let We=0;We<se.locationSize;We++)A(se.location+We,oe/se.locationSize,Le,Z,oe*De,oe/se.locationSize*We*De,we)}}else if(Y!==void 0){const Z=Y[j];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(se.location,Z);break;case 3:i.vertexAttrib3fv(se.location,Z);break;case 4:i.vertexAttrib4fv(se.location,Z);break;default:i.vertexAttrib1fv(se.location,Z)}}}}T()}function y(){W();for(const I in a){const P=a[I];for(const D in P){const q=P[D];for(const N in q)g(q[N].object),delete q[N];delete P[D]}delete a[I]}}function w(I){if(a[I.id]===void 0)return;const P=a[I.id];for(const D in P){const q=P[D];for(const N in q)g(q[N].object),delete q[N];delete P[D]}delete a[I.id]}function z(I){for(const P in a){const D=a[P];if(D[I.id]===void 0)continue;const q=D[I.id];for(const N in q)g(q[N].object),delete q[N];delete D[I.id]}}function W(){ee(),u=!0,c!==l&&(c=l,d(c.object))}function ee(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:W,resetDefaultState:ee,dispose:y,releaseStatesOfGeometry:w,releaseStatesOfProgram:z,initAttributes:x,enableAttribute:S,disableUnusedAttributes:T}}function dd(i,e,t,n){const r=n.isWebGL2;let s;function o(u){s=u}function a(u,h){i.drawArrays(s,u,h),t.update(h,s,1)}function l(u,h,f){if(f===0)return;let d,g;if(r)d=i,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](s,u,h,f),t.update(h,s,f)}function c(u,h,f){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{d.multiDrawArraysWEBGL(s,u,0,h,0,f);let g=0;for(let v=0;v<f;v++)g+=h[v];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function pd(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),v=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,S=o||e.has("OES_texture_float"),C=x&&S,T=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:_,vertexTextures:x,floatFragmentTextures:S,floatVertexTextures:C,maxSamples:T}}function md(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Cn,a=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||r;return r=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const _=s?0:n,x=_*4;let S=p.clippingState||null;l.value=S,S=u(g,f,x,d);for(let C=0;C!==x;++C)S[C]=t[C];p.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,S=d;x!==v;++x,S+=4)o.copy(h[x]).applyMatrix4(_,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function gd(i){let e=new WeakMap;function t(o,a){return a===Ps?o.mapping=di:a===Ls&&(o.mapping=pi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ps||a===Ls)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Au(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class bl extends yl{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const si=4,lo=[.125,.215,.35,.446,.526,.582],Ln=20,ds=new bl,co=new xe;let ps=null,ms=0,gs=0;const Rn=(1+Math.sqrt(5))/2,ti=1/Rn,uo=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,Rn,ti),new R(0,Rn,-ti),new R(ti,0,Rn),new R(-ti,0,Rn),new R(Rn,ti,0),new R(-Rn,ti,0)];class ho{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ps=this._renderer.getRenderTarget(),ms=this._renderer.getActiveCubeFace(),gs=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=po(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ps,ms,gs),e.scissorTest=!1,pr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===di||e.mapping===pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ps=this._renderer.getRenderTarget(),ms=this._renderer.getActiveCubeFace(),gs=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:zi,format:Ht,colorSpace:un,depthBuffer:!1},r=fo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fo(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vd(s)),this._blurMaterial=xd(s,e,t)}return r}_compileMaterial(e){const t=new qe(this._lodPlanes[0],e);this._renderer.compile(t,ds)}_sceneToCubeUV(e,t,n,r){const a=new zt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(co),u.toneMapping=_n,u.autoClear=!1;const d=new Lt({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),g=new qe(new Mn,d);let v=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,v=!0):(d.color.copy(co),v=!0);for(let p=0;p<6;p++){const _=p%3;_===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):_===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;pr(r,_*x,p>2?x:0,x,x),u.setRenderTarget(r),v&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===di||e.mapping===pi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=po());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new qe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;pr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ds)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=uo[(r-1)%uo.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new qe(this._lodPlanes[r],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Ln-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):Ln;m>Ln&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ln}`);const p=[];let _=0;for(let A=0;A<Ln;++A){const F=A/v,y=Math.exp(-F*F/2);p.push(y),A===0?_+=y:A<m&&(_+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/_;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const S=this._sizeLods[r],C=3*S*(r>x-si?r-x+si:0),T=4*(this._cubeSize-S);pr(t,C,T,3*S,2*S),l.setRenderTarget(t),l.render(h,ds)}}function vd(i){const e=[],t=[],n=[];let r=i;const s=i-si+1+lo.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-si?l=lo[o-i+si-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,v=3,m=2,p=1,_=new Float32Array(v*g*d),x=new Float32Array(m*g*d),S=new Float32Array(p*g*d);for(let T=0;T<d;T++){const A=T%3*2/3-1,F=T>2?0:-1,y=[A,F,0,A+2/3,F,0,A+2/3,F+1,0,A,F,0,A+2/3,F+1,0,A,F+1,0];_.set(y,v*g*T),x.set(f,m*g*T);const w=[T,T,T,T,T,T];S.set(w,p*g*T)}const C=new et;C.setAttribute("position",new ut(_,v)),C.setAttribute("uv",new ut(x,m)),C.setAttribute("faceIndex",new ut(S,p)),e.push(C),r>si&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function fo(i,e,t){const n=new Nn(i,e,t);return n.texture.mapping=Nr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function xd(i,e,t){const n=new Float32Array(Ln),r=new R(0,1,0);return new ft({name:"SphericalGaussianBlur",defines:{n:Ln,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ys(),fragmentShader:`

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
		`,blending:xn,depthTest:!1,depthWrite:!1})}function po(){return new ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ys(),fragmentShader:`

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
		`,blending:xn,depthTest:!1,depthWrite:!1})}function mo(){return new ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function Ys(){return`

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
	`}function _d(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ps||l===Ls,u=l===di||l===pi;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new ho(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&r(h)){t===null&&(t=new ho(i));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function yd(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Md(i,e,t,n){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const v=d[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],i.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,g=h.attributes.position;let v=0;if(d!==null){const _=d.array;v=d.version;for(let x=0,S=_.length;x<S;x+=3){const C=_[x+0],T=_[x+1],A=_[x+2];f.push(C,T,T,A,A,C)}}else if(g!==void 0){const _=g.array;v=g.version;for(let x=0,S=_.length/3-1;x<S;x+=3){const C=x+0,T=x+1,A=x+2;f.push(C,T,T,A,A,C)}}else return;const m=new(hl(f)?xl:vl)(f,1);m.version=v;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Sd(i,e,t,n){const r=n.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function u(d,g){i.drawElements(s,g,a,d*l),t.update(g,s,1)}function h(d,g,v){if(v===0)return;let m,p;if(r)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,a,d*l,v),t.update(g,s,v)}function f(d,g,v){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<v;p++)this.render(d[p]/l,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,a,d,0,v);let p=0;for(let _=0;_<v;_++)p+=g[_];t.update(p,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function bd(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function wd(i,e){return i[0]-e[0]}function Ed(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Td(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,o=new it,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=d!==void 0?d.length:0;let v=s.get(u);if(v===void 0||v.count!==g){let I=function(){W.dispose(),s.delete(u),u.removeEventListener("dispose",I)};v!==void 0&&v.texture.dispose();const _=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,S=u.morphAttributes.color!==void 0,C=u.morphAttributes.position||[],T=u.morphAttributes.normal||[],A=u.morphAttributes.color||[];let F=0;_===!0&&(F=1),x===!0&&(F=2),S===!0&&(F=3);let y=u.attributes.position.count*F,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const z=new Float32Array(y*w*4*g),W=new pl(z,y,w,g);W.type=vn,W.needsUpdate=!0;const ee=F*4;for(let P=0;P<g;P++){const D=C[P],q=T[P],N=A[P],O=y*w*4*P;for(let Y=0;Y<D.count;Y++){const j=Y*ee;_===!0&&(o.fromBufferAttribute(D,Y),z[O+j+0]=o.x,z[O+j+1]=o.y,z[O+j+2]=o.z,z[O+j+3]=0),x===!0&&(o.fromBufferAttribute(q,Y),z[O+j+4]=o.x,z[O+j+5]=o.y,z[O+j+6]=o.z,z[O+j+7]=0),S===!0&&(o.fromBufferAttribute(N,Y),z[O+j+8]=o.x,z[O+j+9]=o.y,z[O+j+10]=o.z,z[O+j+11]=N.itemSize===4?o.w:1)}}v={count:g,texture:W,size:new ce(y,w)},s.set(u,v),u.addEventListener("dispose",I)}let m=0;for(let _=0;_<f.length;_++)m+=f[_];const p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",p),h.getUniforms().setValue(i,"morphTargetInfluences",f),h.getUniforms().setValue(i,"morphTargetsTexture",v.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",v.size)}else{const d=f===void 0?0:f.length;let g=n[u.id];if(g===void 0||g.length!==d){g=[];for(let x=0;x<d;x++)g[x]=[x,0];n[u.id]=g}for(let x=0;x<d;x++){const S=g[x];S[0]=x,S[1]=f[x]}g.sort(Ed);for(let x=0;x<8;x++)x<d&&g[x][1]?(a[x][0]=g[x][0],a[x][1]=g[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(wd);const v=u.morphAttributes.position,m=u.morphAttributes.normal;let p=0;for(let x=0;x<8;x++){const S=a[x],C=S[0],T=S[1];C!==Number.MAX_SAFE_INTEGER&&T?(v&&u.getAttribute("morphTarget"+x)!==v[C]&&u.setAttribute("morphTarget"+x,v[C]),m&&u.getAttribute("morphNormal"+x)!==m[C]&&u.setAttribute("morphNormal"+x,m[C]),r[x]=T,p+=T):(v&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),m&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),r[x]=0)}const _=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(i,"morphTargetBaseInfluence",_),h.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function Ad(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class wl extends Tt{constructor(e,t,n,r,s,o,a,l,c,u){if(u=u!==void 0?u:Dn,u!==Dn&&u!==mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Dn&&(n=gn),n===void 0&&u===mi&&(n=In),super(null,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:dt,this.minFilter=l!==void 0?l:dt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const El=new Tt,Tl=new wl(1,1);Tl.compareFunction=ul;const Al=new pl,Cl=new uu,Rl=new Ml,go=[],vo=[],xo=new Float32Array(16),_o=new Float32Array(9),yo=new Float32Array(4);function _i(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=go[r];if(s===void 0&&(s=new Float32Array(r),go[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function zr(i,e){let t=vo[e];t===void 0&&(t=new Int32Array(e),vo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Cd(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Rd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2fv(this.addr,e),gt(t,e)}}function Pd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;i.uniform3fv(this.addr,e),gt(t,e)}}function Ld(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4fv(this.addr,e),gt(t,e)}}function Id(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;yo.set(n),i.uniformMatrix2fv(this.addr,!1,yo),gt(t,n)}}function Dd(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;_o.set(n),i.uniformMatrix3fv(this.addr,!1,_o),gt(t,n)}}function Ud(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;xo.set(n),i.uniformMatrix4fv(this.addr,!1,xo),gt(t,n)}}function Nd(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Fd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2iv(this.addr,e),gt(t,e)}}function Od(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3iv(this.addr,e),gt(t,e)}}function zd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4iv(this.addr,e),gt(t,e)}}function Bd(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Gd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2uiv(this.addr,e),gt(t,e)}}function Vd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3uiv(this.addr,e),gt(t,e)}}function Hd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4uiv(this.addr,e),gt(t,e)}}function kd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?Tl:El;t.setTexture2D(e||s,r)}function Wd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Cl,r)}function qd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Rl,r)}function Xd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Al,r)}function Yd(i){switch(i){case 5126:return Cd;case 35664:return Rd;case 35665:return Pd;case 35666:return Ld;case 35674:return Id;case 35675:return Dd;case 35676:return Ud;case 5124:case 35670:return Nd;case 35667:case 35671:return Fd;case 35668:case 35672:return Od;case 35669:case 35673:return zd;case 5125:return Bd;case 36294:return Gd;case 36295:return Vd;case 36296:return Hd;case 35678:case 36198:case 36298:case 36306:case 35682:return kd;case 35679:case 36299:case 36307:return Wd;case 35680:case 36300:case 36308:case 36293:return qd;case 36289:case 36303:case 36311:case 36292:return Xd}}function Zd(i,e){i.uniform1fv(this.addr,e)}function Jd(i,e){const t=_i(e,this.size,2);i.uniform2fv(this.addr,t)}function $d(i,e){const t=_i(e,this.size,3);i.uniform3fv(this.addr,t)}function Kd(i,e){const t=_i(e,this.size,4);i.uniform4fv(this.addr,t)}function jd(i,e){const t=_i(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Qd(i,e){const t=_i(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ep(i,e){const t=_i(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function tp(i,e){i.uniform1iv(this.addr,e)}function np(i,e){i.uniform2iv(this.addr,e)}function ip(i,e){i.uniform3iv(this.addr,e)}function rp(i,e){i.uniform4iv(this.addr,e)}function sp(i,e){i.uniform1uiv(this.addr,e)}function ap(i,e){i.uniform2uiv(this.addr,e)}function op(i,e){i.uniform3uiv(this.addr,e)}function lp(i,e){i.uniform4uiv(this.addr,e)}function cp(i,e,t){const n=this.cache,r=e.length,s=zr(t,r);mt(n,s)||(i.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||El,s[o])}function up(i,e,t){const n=this.cache,r=e.length,s=zr(t,r);mt(n,s)||(i.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Cl,s[o])}function hp(i,e,t){const n=this.cache,r=e.length,s=zr(t,r);mt(n,s)||(i.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Rl,s[o])}function fp(i,e,t){const n=this.cache,r=e.length,s=zr(t,r);mt(n,s)||(i.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Al,s[o])}function dp(i){switch(i){case 5126:return Zd;case 35664:return Jd;case 35665:return $d;case 35666:return Kd;case 35674:return jd;case 35675:return Qd;case 35676:return ep;case 5124:case 35670:return tp;case 35667:case 35671:return np;case 35668:case 35672:return ip;case 35669:case 35673:return rp;case 5125:return sp;case 36294:return ap;case 36295:return op;case 36296:return lp;case 35678:case 36198:case 36298:case 36306:case 35682:return cp;case 35679:case 36299:case 36307:return up;case 35680:case 36300:case 36308:case 36293:return hp;case 36289:case 36303:case 36311:case 36292:return fp}}class pp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Yd(t.type)}}class mp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=dp(t.type)}}class gp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const vs=/(\w+)(\])?(\[|\.)?/g;function Mo(i,e){i.seq.push(e),i.map[e.id]=e}function vp(i,e,t){const n=i.name,r=n.length;for(vs.lastIndex=0;;){const s=vs.exec(n),o=vs.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Mo(t,c===void 0?new pp(a,i,e):new mp(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new gp(a),Mo(t,h)),t=h}}}class Er{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);vp(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function So(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const xp=37297;let _p=0;function yp(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Mp(i){const e=Je.getPrimaries(Je.workingColorSpace),t=Je.getPrimaries(i);let n;switch(e===t?n="":e===Pr&&t===Rr?n="LinearDisplayP3ToLinearSRGB":e===Rr&&t===Pr&&(n="LinearSRGBToLinearDisplayP3"),i){case un:case Fr:return[n,"LinearTransferOETF"];case Mt:case ks:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function bo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+yp(i.getShaderSource(e),o)}else return r}function Sp(i,e){const t=Mp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function bp(i,e){let t;switch(e){case _c:t="Linear";break;case yc:t="Reinhard";break;case Mc:t="OptimizedCineon";break;case Sc:t="ACESFilmic";break;case wc:t="AgX";break;case bc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function wp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ai).join(`
`)}function Ep(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ai).join(`
`)}function Tp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ap(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ai(i){return i!==""}function wo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Eo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Cp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fs(i){return i.replace(Cp,Pp)}const Rp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Pp(i,e){let t=Ne[e];if(t===void 0){const n=Rp.get(e);if(n!==void 0)t=Ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Fs(t)}const Lp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function To(i){return i.replace(Lp,Ip)}function Ip(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ao(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Dp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Qo?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Yl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===on&&(e="SHADOWMAP_TYPE_VSM"),e}function Up(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case di:case pi:e="ENVMAP_TYPE_CUBE";break;case Nr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Np(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case pi:e="ENVMAP_MODE_REFRACTION";break}return e}function Fp(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case el:e="ENVMAP_BLENDING_MULTIPLY";break;case vc:e="ENVMAP_BLENDING_MIX";break;case xc:e="ENVMAP_BLENDING_ADD";break}return e}function Op(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function zp(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Dp(t),c=Up(t),u=Np(t),h=Fp(t),f=Op(t),d=t.isWebGL2?"":wp(t),g=Ep(t),v=Tp(s),m=r.createProgram();let p,_,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ai).join(`
`),p.length>0&&(p+=`
`),_=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ai).join(`
`),_.length>0&&(_+=`
`)):(p=[Ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ai).join(`
`),_=[d,Ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_n?"#define TONE_MAPPING":"",t.toneMapping!==_n?Ne.tonemapping_pars_fragment:"",t.toneMapping!==_n?bp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,Sp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ai).join(`
`)),o=Fs(o),o=wo(o,t),o=Eo(o,t),a=Fs(a),a=wo(a,t),a=Eo(a,t),o=To(o),a=To(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,_=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const S=x+p+o,C=x+_+a,T=So(r,r.VERTEX_SHADER,S),A=So(r,r.FRAGMENT_SHADER,C);r.attachShader(m,T),r.attachShader(m,A),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function F(W){if(i.debug.checkShaderErrors){const ee=r.getProgramInfoLog(m).trim(),I=r.getShaderInfoLog(T).trim(),P=r.getShaderInfoLog(A).trim();let D=!0,q=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(D=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,T,A);else{const N=bo(r,T,"vertex"),O=bo(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+N+`
`+O)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(I===""||P==="")&&(q=!1);q&&(W.diagnostics={runnable:D,programLog:ee,vertexShader:{log:I,prefix:p},fragmentShader:{log:P,prefix:_}})}r.deleteShader(T),r.deleteShader(A),y=new Er(r,m),w=Ap(r,m)}let y;this.getUniforms=function(){return y===void 0&&F(this),y};let w;this.getAttributes=function(){return w===void 0&&F(this),w};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(m,xp)),z},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_p++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=A,this}let Bp=0;class Gp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Vp(e),t.set(e,n)),n}}class Vp{constructor(e){this.id=Bp++,this.code=e,this.usedTimes=0}}function Hp(i,e,t,n,r,s,o){const a=new ml,l=new Gp,c=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return y===0?"uv":`uv${y}`}function m(y,w,z,W,ee){const I=W.fog,P=ee.geometry,D=y.isMeshStandardMaterial?W.environment:null,q=(y.isMeshStandardMaterial?t:e).get(y.envMap||D),N=q&&q.mapping===Nr?q.image.height:null,O=g[y.type];y.precision!==null&&(d=r.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const Y=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,j=Y!==void 0?Y.length:0;let se=0;P.morphAttributes.position!==void 0&&(se=1),P.morphAttributes.normal!==void 0&&(se=2),P.morphAttributes.color!==void 0&&(se=3);let X,Z,oe,pe;if(O){const Ct=Kt[O];X=Ct.vertexShader,Z=Ct.fragmentShader}else X=y.vertexShader,Z=y.fragmentShader,l.update(y),oe=l.getVertexShaderID(y),pe=l.getFragmentShaderID(y);const fe=i.getRenderTarget(),Le=ee.isInstancedMesh===!0,De=ee.isBatchedMesh===!0,we=!!y.map,We=!!y.matcap,B=!!q,At=!!y.aoMap,ye=!!y.lightMap,Re=!!y.bumpMap,de=!!y.normalMap,rt=!!y.displacementMap,Oe=!!y.emissiveMap,E=!!y.metalnessMap,M=!!y.roughnessMap,V=y.anisotropy>0,K=y.clearcoat>0,$=y.iridescence>0,Q=y.sheen>0,me=y.transmission>0,ae=V&&!!y.anisotropyMap,ue=K&&!!y.clearcoatMap,be=K&&!!y.clearcoatNormalMap,ze=K&&!!y.clearcoatRoughnessMap,J=$&&!!y.iridescenceMap,Ze=$&&!!y.iridescenceThicknessMap,ke=Q&&!!y.sheenColorMap,Ae=Q&&!!y.sheenRoughnessMap,_e=!!y.specularMap,he=!!y.specularColorMap,Ue=!!y.specularIntensityMap,Xe=me&&!!y.transmissionMap,ot=me&&!!y.thicknessMap,Ge=!!y.gradientMap,te=!!y.alphaMap,L=y.alphaTest>0,ie=!!y.alphaHash,re=!!y.extensions,Ee=!!P.attributes.uv1,Me=!!P.attributes.uv2,Ke=!!P.attributes.uv3;let je=_n;return y.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:u,shaderID:O,shaderType:y.type,shaderName:y.name,vertexShader:X,fragmentShader:Z,defines:y.defines,customVertexShaderID:oe,customFragmentShaderID:pe,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:De,instancing:Le,instancingColor:Le&&ee.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:fe===null?i.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:un,map:we,matcap:We,envMap:B,envMapMode:B&&q.mapping,envMapCubeUVHeight:N,aoMap:At,lightMap:ye,bumpMap:Re,normalMap:de,displacementMap:f&&rt,emissiveMap:Oe,normalMapObjectSpace:de&&y.normalMapType===Oc,normalMapTangentSpace:de&&y.normalMapType===Fc,metalnessMap:E,roughnessMap:M,anisotropy:V,anisotropyMap:ae,clearcoat:K,clearcoatMap:ue,clearcoatNormalMap:be,clearcoatRoughnessMap:ze,iridescence:$,iridescenceMap:J,iridescenceThicknessMap:Ze,sheen:Q,sheenColorMap:ke,sheenRoughnessMap:Ae,specularMap:_e,specularColorMap:he,specularIntensityMap:Ue,transmission:me,transmissionMap:Xe,thicknessMap:ot,gradientMap:Ge,opaque:y.transparent===!1&&y.blending===ui,alphaMap:te,alphaTest:L,alphaHash:ie,combine:y.combine,mapUv:we&&v(y.map.channel),aoMapUv:At&&v(y.aoMap.channel),lightMapUv:ye&&v(y.lightMap.channel),bumpMapUv:Re&&v(y.bumpMap.channel),normalMapUv:de&&v(y.normalMap.channel),displacementMapUv:rt&&v(y.displacementMap.channel),emissiveMapUv:Oe&&v(y.emissiveMap.channel),metalnessMapUv:E&&v(y.metalnessMap.channel),roughnessMapUv:M&&v(y.roughnessMap.channel),anisotropyMapUv:ae&&v(y.anisotropyMap.channel),clearcoatMapUv:ue&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:be&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ze&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&v(y.sheenRoughnessMap.channel),specularMapUv:_e&&v(y.specularMap.channel),specularColorMapUv:he&&v(y.specularColorMap.channel),specularIntensityMapUv:Ue&&v(y.specularIntensityMap.channel),transmissionMapUv:Xe&&v(y.transmissionMap.channel),thicknessMapUv:ot&&v(y.thicknessMap.channel),alphaMapUv:te&&v(y.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(de||V),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,vertexUv1s:Ee,vertexUv2s:Me,vertexUv3s:Ke,pointsUvs:ee.isPoints===!0&&!!P.attributes.uv&&(we||te),fog:!!I,useFog:y.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:ee.isSkinnedMesh===!0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:se,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:we&&y.map.isVideoTexture===!0&&Je.getTransfer(y.map.colorSpace)===nt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===yt,flipSided:y.side===Ut,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:re&&y.extensions.derivatives===!0,extensionFragDepth:re&&y.extensions.fragDepth===!0,extensionDrawBuffers:re&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(const z in y.defines)w.push(z),w.push(y.defines[z]);return y.isRawShaderMaterial===!1&&(_(w,y),x(w,y),w.push(i.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function _(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function x(y,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function S(y){const w=g[y.type];let z;if(w){const W=Kt[w];z=bu.clone(W.uniforms)}else z=y.uniforms;return z}function C(y,w){let z;for(let W=0,ee=c.length;W<ee;W++){const I=c[W];if(I.cacheKey===w){z=I,++z.usedTimes;break}}return z===void 0&&(z=new zp(i,w,y,s),c.push(z)),z}function T(y){if(--y.usedTimes===0){const w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),y.destroy()}}function A(y){l.remove(y)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:c,dispose:F}}function kp(){let i=new WeakMap;function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function t(s){i.delete(s)}function n(s,o,a){i.get(s)[o]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function Wp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Co(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ro(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,f,d,g,v,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=v,p.group=m),e++,p}function a(h,f,d,g,v,m){const p=o(h,f,d,g,v,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(h,f,d,g,v,m){const p=o(h,f,d,g,v,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||Wp),n.length>1&&n.sort(f||Co),r.length>1&&r.sort(f||Co)}function u(){for(let h=e,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function qp(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Ro,i.set(n,[o])):r>=s.length?(o=new Ro,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Xp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new xe};break;case"SpotLight":t={position:new R,direction:new R,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function Yp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Zp=0;function Jp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function $p(i,e){const t=new Xp,n=Yp(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new R);const s=new R,o=new tt,a=new tt;function l(u,h){let f=0,d=0,g=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let v=0,m=0,p=0,_=0,x=0,S=0,C=0,T=0,A=0,F=0,y=0;u.sort(Jp);const w=h===!0?Math.PI:1;for(let W=0,ee=u.length;W<ee;W++){const I=u[W],P=I.color,D=I.intensity,q=I.distance,N=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)f+=P.r*D*w,d+=P.g*D*w,g+=P.b*D*w;else if(I.isLightProbe){for(let O=0;O<9;O++)r.probe[O].addScaledVector(I.sh.coefficients[O],D);y++}else if(I.isDirectionalLight){const O=t.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity*w),I.castShadow){const Y=I.shadow,j=n.get(I);j.shadowBias=Y.bias,j.shadowNormalBias=Y.normalBias,j.shadowRadius=Y.radius,j.shadowMapSize=Y.mapSize,r.directionalShadow[v]=j,r.directionalShadowMap[v]=N,r.directionalShadowMatrix[v]=I.shadow.matrix,S++}r.directional[v]=O,v++}else if(I.isSpotLight){const O=t.get(I);O.position.setFromMatrixPosition(I.matrixWorld),O.color.copy(P).multiplyScalar(D*w),O.distance=q,O.coneCos=Math.cos(I.angle),O.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),O.decay=I.decay,r.spot[p]=O;const Y=I.shadow;if(I.map&&(r.spotLightMap[A]=I.map,A++,Y.updateMatrices(I),I.castShadow&&F++),r.spotLightMatrix[p]=Y.matrix,I.castShadow){const j=n.get(I);j.shadowBias=Y.bias,j.shadowNormalBias=Y.normalBias,j.shadowRadius=Y.radius,j.shadowMapSize=Y.mapSize,r.spotShadow[p]=j,r.spotShadowMap[p]=N,T++}p++}else if(I.isRectAreaLight){const O=t.get(I);O.color.copy(P).multiplyScalar(D),O.halfWidth.set(I.width*.5,0,0),O.halfHeight.set(0,I.height*.5,0),r.rectArea[_]=O,_++}else if(I.isPointLight){const O=t.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity*w),O.distance=I.distance,O.decay=I.decay,I.castShadow){const Y=I.shadow,j=n.get(I);j.shadowBias=Y.bias,j.shadowNormalBias=Y.normalBias,j.shadowRadius=Y.radius,j.shadowMapSize=Y.mapSize,j.shadowCameraNear=Y.camera.near,j.shadowCameraFar=Y.camera.far,r.pointShadow[m]=j,r.pointShadowMap[m]=N,r.pointShadowMatrix[m]=I.shadow.matrix,C++}r.point[m]=O,m++}else if(I.isHemisphereLight){const O=t.get(I);O.skyColor.copy(I.color).multiplyScalar(D*w),O.groundColor.copy(I.groundColor).multiplyScalar(D*w),r.hemi[x]=O,x++}}_>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_FLOAT_1,r.rectAreaLTC2=ne.LTC_FLOAT_2):(r.rectAreaLTC1=ne.LTC_HALF_1,r.rectAreaLTC2=ne.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_FLOAT_1,r.rectAreaLTC2=ne.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_HALF_1,r.rectAreaLTC2=ne.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=d,r.ambient[2]=g;const z=r.hash;(z.directionalLength!==v||z.pointLength!==m||z.spotLength!==p||z.rectAreaLength!==_||z.hemiLength!==x||z.numDirectionalShadows!==S||z.numPointShadows!==C||z.numSpotShadows!==T||z.numSpotMaps!==A||z.numLightProbes!==y)&&(r.directional.length=v,r.spot.length=p,r.rectArea.length=_,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=T+A-F,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=F,r.numLightProbes=y,z.directionalLength=v,z.pointLength=m,z.spotLength=p,z.rectAreaLength=_,z.hemiLength=x,z.numDirectionalShadows=S,z.numPointShadows=C,z.numSpotShadows=T,z.numSpotMaps=A,z.numLightProbes=y,r.version=Zp++)}function c(u,h){let f=0,d=0,g=0,v=0,m=0;const p=h.matrixWorldInverse;for(let _=0,x=u.length;_<x;_++){const S=u[_];if(S.isDirectionalLight){const C=r.directional[f];C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),f++}else if(S.isSpotLight){const C=r.spot[g];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),g++}else if(S.isRectAreaLight){const C=r.rectArea[v];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(S.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){const C=r.point[d];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const C=r.hemi[m];C.direction.setFromMatrixPosition(S.matrixWorld),C.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:r}}function Po(i,e){const t=new $p(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function o(h){n.push(h)}function a(h){r.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Kp(i,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Po(i,e),t.set(s,[l])):o>=a.length?(l=new Po(i,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class jp extends xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Qp extends xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const e0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t0=`uniform sampler2D shadow_pass;
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
}`;function n0(i,e,t){let n=new Xs;const r=new ce,s=new ce,o=new it,a=new jp({depthPacking:Nc}),l=new Qp,c={},u=t.maxTextureSize,h={[cn]:Ut,[Ut]:cn,[yt]:yt},f=new ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:e0,fragmentShader:t0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new et;g.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new qe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qo;let p=this.type;this.render=function(T,A,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const y=i.getRenderTarget(),w=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),W=i.state;W.setBlending(xn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const ee=p!==on&&this.type===on,I=p===on&&this.type!==on;for(let P=0,D=T.length;P<D;P++){const q=T[P],N=q.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const O=N.getFrameExtents();if(r.multiply(O),s.copy(N.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/O.x),r.x=s.x*O.x,N.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/O.y),r.y=s.y*O.y,N.mapSize.y=s.y)),N.map===null||ee===!0||I===!0){const j=this.type!==on?{minFilter:dt,magFilter:dt}:{};N.map!==null&&N.map.dispose(),N.map=new Nn(r.x,r.y,j),N.map.texture.name=q.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();const Y=N.getViewportCount();for(let j=0;j<Y;j++){const se=N.getViewport(j);o.set(s.x*se.x,s.y*se.y,s.x*se.z,s.y*se.w),W.viewport(o),N.updateMatrices(q,j),n=N.getFrustum(),S(A,F,N.camera,q,this.type)}N.isPointLightShadow!==!0&&this.type===on&&_(N,F),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,w,z)};function _(T,A){const F=e.update(v);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Nn(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,F,f,v,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,F,d,v,null)}function x(T,A,F,y){let w=null;const z=F.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(z!==void 0)w=z;else if(w=F.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const W=w.uuid,ee=A.uuid;let I=c[W];I===void 0&&(I={},c[W]=I);let P=I[ee];P===void 0&&(P=w.clone(),I[ee]=P,A.addEventListener("dispose",C)),w=P}if(w.visible=A.visible,w.wireframe=A.wireframe,y===on?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:h[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,F.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const W=i.properties.get(w);W.light=F}return w}function S(T,A,F,y,w){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===on)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,T.matrixWorld);const ee=e.update(T),I=T.material;if(Array.isArray(I)){const P=ee.groups;for(let D=0,q=P.length;D<q;D++){const N=P[D],O=I[N.materialIndex];if(O&&O.visible){const Y=x(T,O,y,w);T.onBeforeShadow(i,T,A,F,ee,Y,N),i.renderBufferDirect(F,null,ee,Y,T,N),T.onAfterShadow(i,T,A,F,ee,Y,N)}}}else if(I.visible){const P=x(T,I,y,w);T.onBeforeShadow(i,T,A,F,ee,P,null),i.renderBufferDirect(F,null,ee,P,T,null),T.onAfterShadow(i,T,A,F,ee,P,null)}}const W=T.children;for(let ee=0,I=W.length;ee<I;ee++)S(W[ee],A,F,y,w)}function C(T){T.target.removeEventListener("dispose",C);for(const F in c){const y=c[F],w=T.target.uuid;w in y&&(y[w].dispose(),delete y[w])}}}function i0(i,e,t){const n=t.isWebGL2;function r(){let L=!1;const ie=new it;let re=null;const Ee=new it(0,0,0,0);return{setMask:function(Me){re!==Me&&!L&&(i.colorMask(Me,Me,Me,Me),re=Me)},setLocked:function(Me){L=Me},setClear:function(Me,Ke,je,vt,Ct){Ct===!0&&(Me*=vt,Ke*=vt,je*=vt),ie.set(Me,Ke,je,vt),Ee.equals(ie)===!1&&(i.clearColor(Me,Ke,je,vt),Ee.copy(ie))},reset:function(){L=!1,re=null,Ee.set(-1,0,0,0)}}}function s(){let L=!1,ie=null,re=null,Ee=null;return{setTest:function(Me){Me?De(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(Me){ie!==Me&&!L&&(i.depthMask(Me),ie=Me)},setFunc:function(Me){if(re!==Me){switch(Me){case uc:i.depthFunc(i.NEVER);break;case hc:i.depthFunc(i.ALWAYS);break;case fc:i.depthFunc(i.LESS);break;case Ar:i.depthFunc(i.LEQUAL);break;case dc:i.depthFunc(i.EQUAL);break;case pc:i.depthFunc(i.GEQUAL);break;case mc:i.depthFunc(i.GREATER);break;case gc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=Me}},setLocked:function(Me){L=Me},setClear:function(Me){Ee!==Me&&(i.clearDepth(Me),Ee=Me)},reset:function(){L=!1,ie=null,re=null,Ee=null}}}function o(){let L=!1,ie=null,re=null,Ee=null,Me=null,Ke=null,je=null,vt=null,Ct=null;return{setTest:function(Qe){L||(Qe?De(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(Qe){ie!==Qe&&!L&&(i.stencilMask(Qe),ie=Qe)},setFunc:function(Qe,Rt,Zt){(re!==Qe||Ee!==Rt||Me!==Zt)&&(i.stencilFunc(Qe,Rt,Zt),re=Qe,Ee=Rt,Me=Zt)},setOp:function(Qe,Rt,Zt){(Ke!==Qe||je!==Rt||vt!==Zt)&&(i.stencilOp(Qe,Rt,Zt),Ke=Qe,je=Rt,vt=Zt)},setLocked:function(Qe){L=Qe},setClear:function(Qe){Ct!==Qe&&(i.clearStencil(Qe),Ct=Qe)},reset:function(){L=!1,ie=null,re=null,Ee=null,Me=null,Ke=null,je=null,vt=null,Ct=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,h=new WeakMap;let f={},d={},g=new WeakMap,v=[],m=null,p=!1,_=null,x=null,S=null,C=null,T=null,A=null,F=null,y=new xe(0,0,0),w=0,z=!1,W=null,ee=null,I=null,P=null,D=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,O=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(Y)[1]),N=O>=1):Y.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),N=O>=2);let j=null,se={};const X=i.getParameter(i.SCISSOR_BOX),Z=i.getParameter(i.VIEWPORT),oe=new it().fromArray(X),pe=new it().fromArray(Z);function fe(L,ie,re,Ee){const Me=new Uint8Array(4),Ke=i.createTexture();i.bindTexture(L,Ke),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<re;je++)n&&(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)?i.texImage3D(ie,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(ie+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return Ke}const Le={};Le[i.TEXTURE_2D]=fe(i.TEXTURE_2D,i.TEXTURE_2D,1),Le[i.TEXTURE_CUBE_MAP]=fe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Le[i.TEXTURE_2D_ARRAY]=fe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Le[i.TEXTURE_3D]=fe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),De(i.DEPTH_TEST),l.setFunc(Ar),Oe(!1),E(ua),De(i.CULL_FACE),de(xn);function De(L){f[L]!==!0&&(i.enable(L),f[L]=!0)}function we(L){f[L]!==!1&&(i.disable(L),f[L]=!1)}function We(L,ie){return d[L]!==ie?(i.bindFramebuffer(L,ie),d[L]=ie,n&&(L===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ie),L===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ie)),!0):!1}function B(L,ie){let re=v,Ee=!1;if(L)if(re=g.get(ie),re===void 0&&(re=[],g.set(ie,re)),L.isWebGLMultipleRenderTargets){const Me=L.texture;if(re.length!==Me.length||re[0]!==i.COLOR_ATTACHMENT0){for(let Ke=0,je=Me.length;Ke<je;Ke++)re[Ke]=i.COLOR_ATTACHMENT0+Ke;re.length=Me.length,Ee=!0}}else re[0]!==i.COLOR_ATTACHMENT0&&(re[0]=i.COLOR_ATTACHMENT0,Ee=!0);else re[0]!==i.BACK&&(re[0]=i.BACK,Ee=!0);Ee&&(t.isWebGL2?i.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function At(L){return m!==L?(i.useProgram(L),m=L,!0):!1}const ye={[Pn]:i.FUNC_ADD,[Jl]:i.FUNC_SUBTRACT,[$l]:i.FUNC_REVERSE_SUBTRACT};if(n)ye[da]=i.MIN,ye[pa]=i.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(ye[da]=L.MIN_EXT,ye[pa]=L.MAX_EXT)}const Re={[Kl]:i.ZERO,[jl]:i.ONE,[Ql]:i.SRC_COLOR,[Cs]:i.SRC_ALPHA,[sc]:i.SRC_ALPHA_SATURATE,[ic]:i.DST_COLOR,[tc]:i.DST_ALPHA,[ec]:i.ONE_MINUS_SRC_COLOR,[Rs]:i.ONE_MINUS_SRC_ALPHA,[rc]:i.ONE_MINUS_DST_COLOR,[nc]:i.ONE_MINUS_DST_ALPHA,[ac]:i.CONSTANT_COLOR,[oc]:i.ONE_MINUS_CONSTANT_COLOR,[lc]:i.CONSTANT_ALPHA,[cc]:i.ONE_MINUS_CONSTANT_ALPHA};function de(L,ie,re,Ee,Me,Ke,je,vt,Ct,Qe){if(L===xn){p===!0&&(we(i.BLEND),p=!1);return}if(p===!1&&(De(i.BLEND),p=!0),L!==Zl){if(L!==_||Qe!==z){if((x!==Pn||T!==Pn)&&(i.blendEquation(i.FUNC_ADD),x=Pn,T=Pn),Qe)switch(L){case ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ye:i.blendFunc(i.ONE,i.ONE);break;case ha:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case fa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ye:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ha:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case fa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}S=null,C=null,A=null,F=null,y.set(0,0,0),w=0,_=L,z=Qe}return}Me=Me||ie,Ke=Ke||re,je=je||Ee,(ie!==x||Me!==T)&&(i.blendEquationSeparate(ye[ie],ye[Me]),x=ie,T=Me),(re!==S||Ee!==C||Ke!==A||je!==F)&&(i.blendFuncSeparate(Re[re],Re[Ee],Re[Ke],Re[je]),S=re,C=Ee,A=Ke,F=je),(vt.equals(y)===!1||Ct!==w)&&(i.blendColor(vt.r,vt.g,vt.b,Ct),y.copy(vt),w=Ct),_=L,z=!1}function rt(L,ie){L.side===yt?we(i.CULL_FACE):De(i.CULL_FACE);let re=L.side===Ut;ie&&(re=!re),Oe(re),L.blending===ui&&L.transparent===!1?de(xn):de(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),a.setMask(L.colorWrite);const Ee=L.stencilWrite;c.setTest(Ee),Ee&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),V(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?De(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(L){W!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),W=L)}function E(L){L!==ql?(De(i.CULL_FACE),L!==ee&&(L===ua?i.cullFace(i.BACK):L===Xl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),ee=L}function M(L){L!==I&&(N&&i.lineWidth(L),I=L)}function V(L,ie,re){L?(De(i.POLYGON_OFFSET_FILL),(P!==ie||D!==re)&&(i.polygonOffset(ie,re),P=ie,D=re)):we(i.POLYGON_OFFSET_FILL)}function K(L){L?De(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function $(L){L===void 0&&(L=i.TEXTURE0+q-1),j!==L&&(i.activeTexture(L),j=L)}function Q(L,ie,re){re===void 0&&(j===null?re=i.TEXTURE0+q-1:re=j);let Ee=se[re];Ee===void 0&&(Ee={type:void 0,texture:void 0},se[re]=Ee),(Ee.type!==L||Ee.texture!==ie)&&(j!==re&&(i.activeTexture(re),j=re),i.bindTexture(L,ie||Le[L]),Ee.type=L,Ee.texture=ie)}function me(){const L=se[j];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ae(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ze(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ze(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ke(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ue(L){oe.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),oe.copy(L))}function Xe(L){pe.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),pe.copy(L))}function ot(L,ie){let re=h.get(ie);re===void 0&&(re=new WeakMap,h.set(ie,re));let Ee=re.get(L);Ee===void 0&&(Ee=i.getUniformBlockIndex(ie,L.name),re.set(L,Ee))}function Ge(L,ie){const Ee=h.get(ie).get(L);u.get(ie)!==Ee&&(i.uniformBlockBinding(ie,Ee,L.__bindingPointIndex),u.set(ie,Ee))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},j=null,se={},d={},g=new WeakMap,v=[],m=null,p=!1,_=null,x=null,S=null,C=null,T=null,A=null,F=null,y=new xe(0,0,0),w=0,z=!1,W=null,ee=null,I=null,P=null,D=null,oe.set(0,0,i.canvas.width,i.canvas.height),pe.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:De,disable:we,bindFramebuffer:We,drawBuffers:B,useProgram:At,setBlending:de,setMaterial:rt,setFlipSided:Oe,setCullFace:E,setLineWidth:M,setPolygonOffset:V,setScissorTest:K,activeTexture:$,bindTexture:Q,unbindTexture:me,compressedTexImage2D:ae,compressedTexImage3D:ue,texImage2D:_e,texImage3D:he,updateUBOMapping:ot,uniformBlockBinding:Ge,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:be,texSubImage3D:ze,compressedTexSubImage2D:J,compressedTexSubImage3D:Ze,scissor:Ue,viewport:Xe,reset:te}}function r0(i,e,t,n,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,M){return d?new OffscreenCanvas(E,M):Gi("canvas")}function v(E,M,V,K){let $=1;if((E.width>K||E.height>K)&&($=K/Math.max(E.width,E.height)),$<1||M===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const Q=M?Ir:Math.floor,me=Q($*E.width),ae=Q($*E.height);h===void 0&&(h=g(me,ae));const ue=V?g(me,ae):h;return ue.width=me,ue.height=ae,ue.getContext("2d").drawImage(E,0,0,me,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+me+"x"+ae+")."),ue}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return Ns(E.width)&&Ns(E.height)}function p(E){return a?!1:E.wrapS!==Yt||E.wrapT!==Yt||E.minFilter!==dt&&E.minFilter!==Dt}function _(E,M){return E.generateMipmaps&&M&&E.minFilter!==dt&&E.minFilter!==Dt}function x(E){i.generateMipmap(E)}function S(E,M,V,K,$=!1){if(a===!1)return M;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Q=M;if(M===i.RED&&(V===i.FLOAT&&(Q=i.R32F),V===i.HALF_FLOAT&&(Q=i.R16F),V===i.UNSIGNED_BYTE&&(Q=i.R8)),M===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.R8UI),V===i.UNSIGNED_SHORT&&(Q=i.R16UI),V===i.UNSIGNED_INT&&(Q=i.R32UI),V===i.BYTE&&(Q=i.R8I),V===i.SHORT&&(Q=i.R16I),V===i.INT&&(Q=i.R32I)),M===i.RG&&(V===i.FLOAT&&(Q=i.RG32F),V===i.HALF_FLOAT&&(Q=i.RG16F),V===i.UNSIGNED_BYTE&&(Q=i.RG8)),M===i.RGBA){const me=$?Cr:Je.getTransfer(K);V===i.FLOAT&&(Q=i.RGBA32F),V===i.HALF_FLOAT&&(Q=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Q=me===nt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function C(E,M,V){return _(E,V)===!0||E.isFramebufferTexture&&E.minFilter!==dt&&E.minFilter!==Dt?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function T(E){return E===dt||E===ma||E===Wr?i.NEAREST:i.LINEAR}function A(E){const M=E.target;M.removeEventListener("dispose",A),y(M),M.isVideoTexture&&u.delete(M)}function F(E){const M=E.target;M.removeEventListener("dispose",F),z(M)}function y(E){const M=n.get(E);if(M.__webglInit===void 0)return;const V=E.source,K=f.get(V);if(K){const $=K[M.__cacheKey];$.usedTimes--,$.usedTimes===0&&w(E),Object.keys(K).length===0&&f.delete(V)}n.remove(E)}function w(E){const M=n.get(E);i.deleteTexture(M.__webglTexture);const V=E.source,K=f.get(V);delete K[M.__cacheKey],o.memory.textures--}function z(E){const M=E.texture,V=n.get(E),K=n.get(M);if(K.__webglTexture!==void 0&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(V.__webglFramebuffer[$]))for(let Q=0;Q<V.__webglFramebuffer[$].length;Q++)i.deleteFramebuffer(V.__webglFramebuffer[$][Q]);else i.deleteFramebuffer(V.__webglFramebuffer[$]);V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer[$])}else{if(Array.isArray(V.__webglFramebuffer))for(let $=0;$<V.__webglFramebuffer.length;$++)i.deleteFramebuffer(V.__webglFramebuffer[$]);else i.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&i.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let $=0;$<V.__webglColorRenderbuffer.length;$++)V.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(V.__webglColorRenderbuffer[$]);V.__webglDepthRenderbuffer&&i.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let $=0,Q=M.length;$<Q;$++){const me=n.get(M[$]);me.__webglTexture&&(i.deleteTexture(me.__webglTexture),o.memory.textures--),n.remove(M[$])}n.remove(M),n.remove(E)}let W=0;function ee(){W=0}function I(){const E=W;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),W+=1,E}function P(E){const M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.wrapR||0),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.colorSpace),M.join()}function D(E,M){const V=n.get(E);if(E.isVideoTexture&&rt(E),E.isRenderTargetTexture===!1&&E.version>0&&V.__version!==E.version){const K=E.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(V,E,M);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+M)}function q(E,M){const V=n.get(E);if(E.version>0&&V.__version!==E.version){oe(V,E,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+M)}function N(E,M){const V=n.get(E);if(E.version>0&&V.__version!==E.version){oe(V,E,M);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+M)}function O(E,M){const V=n.get(E);if(E.version>0&&V.__version!==E.version){pe(V,E,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+M)}const Y={[Is]:i.REPEAT,[Yt]:i.CLAMP_TO_EDGE,[Ds]:i.MIRRORED_REPEAT},j={[dt]:i.NEAREST,[ma]:i.NEAREST_MIPMAP_NEAREST,[Wr]:i.NEAREST_MIPMAP_LINEAR,[Dt]:i.LINEAR,[Ec]:i.LINEAR_MIPMAP_NEAREST,[Oi]:i.LINEAR_MIPMAP_LINEAR},se={[zc]:i.NEVER,[Wc]:i.ALWAYS,[Bc]:i.LESS,[ul]:i.LEQUAL,[Gc]:i.EQUAL,[kc]:i.GEQUAL,[Vc]:i.GREATER,[Hc]:i.NOTEQUAL};function X(E,M,V){if(V?(i.texParameteri(E,i.TEXTURE_WRAP_S,Y[M.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Y[M.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Y[M.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,j[M.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,j[M.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(M.wrapS!==Yt||M.wrapT!==Yt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,T(M.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,T(M.minFilter)),M.minFilter!==dt&&M.minFilter!==Dt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,se[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const K=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===dt||M.minFilter!==Wr&&M.minFilter!==Oi||M.type===vn&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===zi&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(i.texParameterf(E,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function Z(E,M){let V=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",A));const K=M.source;let $=f.get(K);$===void 0&&($={},f.set(K,$));const Q=P(M);if(Q!==E.__cacheKey){$[Q]===void 0&&($[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),$[Q].usedTimes++;const me=$[E.__cacheKey];me!==void 0&&($[E.__cacheKey].usedTimes--,me.usedTimes===0&&w(M)),E.__cacheKey=Q,E.__webglTexture=$[Q].texture}return V}function oe(E,M,V){let K=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(K=i.TEXTURE_3D);const $=Z(E,M),Q=M.source;t.bindTexture(K,E.__webglTexture,i.TEXTURE0+V);const me=n.get(Q);if(Q.version!==me.__version||$===!0){t.activeTexture(i.TEXTURE0+V);const ae=Je.getPrimaries(Je.workingColorSpace),ue=M.colorSpace===kt?null:Je.getPrimaries(M.colorSpace),be=M.colorSpace===kt||ae===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const ze=p(M)&&m(M.image)===!1;let J=v(M.image,ze,!1,r.maxTextureSize);J=Oe(M,J);const Ze=m(J)||a,ke=s.convert(M.format,M.colorSpace);let Ae=s.convert(M.type),_e=S(M.internalFormat,ke,Ae,M.colorSpace,M.isVideoTexture);X(K,M,Ze);let he;const Ue=M.mipmaps,Xe=a&&M.isVideoTexture!==!0&&_e!==ll,ot=me.__version===void 0||$===!0,Ge=C(M,J,Ze);if(M.isDepthTexture)_e=i.DEPTH_COMPONENT,a?M.type===vn?_e=i.DEPTH_COMPONENT32F:M.type===gn?_e=i.DEPTH_COMPONENT24:M.type===In?_e=i.DEPTH24_STENCIL8:_e=i.DEPTH_COMPONENT16:M.type===vn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Dn&&_e===i.DEPTH_COMPONENT&&M.type!==Hs&&M.type!==gn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=gn,Ae=s.convert(M.type)),M.format===mi&&_e===i.DEPTH_COMPONENT&&(_e=i.DEPTH_STENCIL,M.type!==In&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=In,Ae=s.convert(M.type))),ot&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,_e,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,_e,J.width,J.height,0,ke,Ae,null));else if(M.isDataTexture)if(Ue.length>0&&Ze){Xe&&ot&&t.texStorage2D(i.TEXTURE_2D,Ge,_e,Ue[0].width,Ue[0].height);for(let te=0,L=Ue.length;te<L;te++)he=Ue[te],Xe?t.texSubImage2D(i.TEXTURE_2D,te,0,0,he.width,he.height,ke,Ae,he.data):t.texImage2D(i.TEXTURE_2D,te,_e,he.width,he.height,0,ke,Ae,he.data);M.generateMipmaps=!1}else Xe?(ot&&t.texStorage2D(i.TEXTURE_2D,Ge,_e,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,ke,Ae,J.data)):t.texImage2D(i.TEXTURE_2D,0,_e,J.width,J.height,0,ke,Ae,J.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Xe&&ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,_e,Ue[0].width,Ue[0].height,J.depth);for(let te=0,L=Ue.length;te<L;te++)he=Ue[te],M.format!==Ht?ke!==null?Xe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,J.depth,ke,he.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,_e,he.width,he.height,J.depth,0,he.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,J.depth,ke,Ae,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,_e,he.width,he.height,J.depth,0,ke,Ae,he.data)}else{Xe&&ot&&t.texStorage2D(i.TEXTURE_2D,Ge,_e,Ue[0].width,Ue[0].height);for(let te=0,L=Ue.length;te<L;te++)he=Ue[te],M.format!==Ht?ke!==null?Xe?t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,he.width,he.height,ke,he.data):t.compressedTexImage2D(i.TEXTURE_2D,te,_e,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(i.TEXTURE_2D,te,0,0,he.width,he.height,ke,Ae,he.data):t.texImage2D(i.TEXTURE_2D,te,_e,he.width,he.height,0,ke,Ae,he.data)}else if(M.isDataArrayTexture)Xe?(ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,_e,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ke,Ae,J.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,_e,J.width,J.height,J.depth,0,ke,Ae,J.data);else if(M.isData3DTexture)Xe?(ot&&t.texStorage3D(i.TEXTURE_3D,Ge,_e,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ke,Ae,J.data)):t.texImage3D(i.TEXTURE_3D,0,_e,J.width,J.height,J.depth,0,ke,Ae,J.data);else if(M.isFramebufferTexture){if(ot)if(Xe)t.texStorage2D(i.TEXTURE_2D,Ge,_e,J.width,J.height);else{let te=J.width,L=J.height;for(let ie=0;ie<Ge;ie++)t.texImage2D(i.TEXTURE_2D,ie,_e,te,L,0,ke,Ae,null),te>>=1,L>>=1}}else if(Ue.length>0&&Ze){Xe&&ot&&t.texStorage2D(i.TEXTURE_2D,Ge,_e,Ue[0].width,Ue[0].height);for(let te=0,L=Ue.length;te<L;te++)he=Ue[te],Xe?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ke,Ae,he):t.texImage2D(i.TEXTURE_2D,te,_e,ke,Ae,he);M.generateMipmaps=!1}else Xe?(ot&&t.texStorage2D(i.TEXTURE_2D,Ge,_e,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ke,Ae,J)):t.texImage2D(i.TEXTURE_2D,0,_e,ke,Ae,J);_(M,Ze)&&x(K),me.__version=Q.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function pe(E,M,V){if(M.image.length!==6)return;const K=Z(E,M),$=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+V);const Q=n.get($);if($.version!==Q.__version||K===!0){t.activeTexture(i.TEXTURE0+V);const me=Je.getPrimaries(Je.workingColorSpace),ae=M.colorSpace===kt?null:Je.getPrimaries(M.colorSpace),ue=M.colorSpace===kt||me===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const be=M.isCompressedTexture||M.image[0].isCompressedTexture,ze=M.image[0]&&M.image[0].isDataTexture,J=[];for(let te=0;te<6;te++)!be&&!ze?J[te]=v(M.image[te],!1,!0,r.maxCubemapSize):J[te]=ze?M.image[te].image:M.image[te],J[te]=Oe(M,J[te]);const Ze=J[0],ke=m(Ze)||a,Ae=s.convert(M.format,M.colorSpace),_e=s.convert(M.type),he=S(M.internalFormat,Ae,_e,M.colorSpace),Ue=a&&M.isVideoTexture!==!0,Xe=Q.__version===void 0||K===!0;let ot=C(M,Ze,ke);X(i.TEXTURE_CUBE_MAP,M,ke);let Ge;if(be){Ue&&Xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,he,Ze.width,Ze.height);for(let te=0;te<6;te++){Ge=J[te].mipmaps;for(let L=0;L<Ge.length;L++){const ie=Ge[L];M.format!==Ht?Ae!==null?Ue?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,0,0,ie.width,ie.height,Ae,ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,he,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,0,0,ie.width,ie.height,Ae,_e,ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,he,ie.width,ie.height,0,Ae,_e,ie.data)}}}else{Ge=M.mipmaps,Ue&&Xe&&(Ge.length>0&&ot++,t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,he,J[0].width,J[0].height));for(let te=0;te<6;te++)if(ze){Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,J[te].width,J[te].height,Ae,_e,J[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,he,J[te].width,J[te].height,0,Ae,_e,J[te].data);for(let L=0;L<Ge.length;L++){const re=Ge[L].image[te].image;Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,0,0,re.width,re.height,Ae,_e,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,he,re.width,re.height,0,Ae,_e,re.data)}}else{Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ae,_e,J[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,he,Ae,_e,J[te]);for(let L=0;L<Ge.length;L++){const ie=Ge[L];Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,0,0,Ae,_e,ie.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,he,Ae,_e,ie.image[te])}}}_(M,ke)&&x(i.TEXTURE_CUBE_MAP),Q.__version=$.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function fe(E,M,V,K,$,Q){const me=s.convert(V.format,V.colorSpace),ae=s.convert(V.type),ue=S(V.internalFormat,me,ae,V.colorSpace);if(!n.get(M).__hasExternalTextures){const ze=Math.max(1,M.width>>Q),J=Math.max(1,M.height>>Q);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,Q,ue,ze,J,M.depth,0,me,ae,null):t.texImage2D($,Q,ue,ze,J,0,me,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),de(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,$,n.get(V).__webglTexture,0,Re(M)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,$,n.get(V).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(E,M,V){if(i.bindRenderbuffer(i.RENDERBUFFER,E),M.depthBuffer&&!M.stencilBuffer){let K=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(V||de(M)){const $=M.depthTexture;$&&$.isDepthTexture&&($.type===vn?K=i.DEPTH_COMPONENT32F:$.type===gn&&(K=i.DEPTH_COMPONENT24));const Q=Re(M);de(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,K,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,K,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,K,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(M.depthBuffer&&M.stencilBuffer){const K=Re(M);V&&de(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,M.width,M.height):de(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const K=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let $=0;$<K.length;$++){const Q=K[$],me=s.convert(Q.format,Q.colorSpace),ae=s.convert(Q.type),ue=S(Q.internalFormat,me,ae,Q.colorSpace),be=Re(M);V&&de(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,ue,M.width,M.height):de(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,ue,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ue,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(E,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),D(M.depthTexture,0);const K=n.get(M.depthTexture).__webglTexture,$=Re(M);if(M.depthTexture.format===Dn)de(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(M.depthTexture.format===mi)de(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function we(E){const M=n.get(E),V=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!M.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");De(M.__webglFramebuffer,E)}else if(V){M.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[K]),M.__webglDepthbuffer[K]=i.createRenderbuffer(),Le(M.__webglDepthbuffer[K],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),Le(M.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(E,M,V){const K=n.get(E);M!==void 0&&fe(K.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&we(E)}function B(E){const M=E.texture,V=n.get(E),K=n.get(M);E.addEventListener("dispose",F),E.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=M.version,o.memory.textures++);const $=E.isWebGLCubeRenderTarget===!0,Q=E.isWebGLMultipleRenderTargets===!0,me=m(E)||a;if($){V.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer[ae]=[];for(let ue=0;ue<M.mipmaps.length;ue++)V.__webglFramebuffer[ae][ue]=i.createFramebuffer()}else V.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer=[];for(let ae=0;ae<M.mipmaps.length;ae++)V.__webglFramebuffer[ae]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Q)if(r.drawBuffers){const ae=E.texture;for(let ue=0,be=ae.length;ue<be;ue++){const ze=n.get(ae[ue]);ze.__webglTexture===void 0&&(ze.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&de(E)===!1){const ae=Q?M:[M];V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ue=0;ue<ae.length;ue++){const be=ae[ue];V.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ue]);const ze=s.convert(be.format,be.colorSpace),J=s.convert(be.type),Ze=S(be.internalFormat,ze,J,be.colorSpace,E.isXRRenderTarget===!0),ke=Re(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,Ze,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,V.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(V.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),X(i.TEXTURE_CUBE_MAP,M,me);for(let ae=0;ae<6;ae++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)fe(V.__webglFramebuffer[ae][ue],E,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ue);else fe(V.__webglFramebuffer[ae],E,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);_(M,me)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const ae=E.texture;for(let ue=0,be=ae.length;ue<be;ue++){const ze=ae[ue],J=n.get(ze);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),X(i.TEXTURE_2D,ze,me),fe(V.__webglFramebuffer,E,ze,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),_(ze,me)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?ae=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ae,K.__webglTexture),X(ae,M,me),a&&M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)fe(V.__webglFramebuffer[ue],E,M,i.COLOR_ATTACHMENT0,ae,ue);else fe(V.__webglFramebuffer,E,M,i.COLOR_ATTACHMENT0,ae,0);_(M,me)&&x(ae),t.unbindTexture()}E.depthBuffer&&we(E)}function At(E){const M=m(E)||a,V=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let K=0,$=V.length;K<$;K++){const Q=V[K];if(_(Q,M)){const me=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ae=n.get(Q).__webglTexture;t.bindTexture(me,ae),x(me),t.unbindTexture()}}}function ye(E){if(a&&E.samples>0&&de(E)===!1){const M=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],V=E.width,K=E.height;let $=i.COLOR_BUFFER_BIT;const Q=[],me=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=n.get(E),ue=E.isWebGLMultipleRenderTargets===!0;if(ue)for(let be=0;be<M.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let be=0;be<M.length;be++){Q.push(i.COLOR_ATTACHMENT0+be),E.depthBuffer&&Q.push(me);const ze=ae.__ignoreDepthValues!==void 0?ae.__ignoreDepthValues:!1;if(ze===!1&&(E.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ue&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ae.__webglColorRenderbuffer[be]),ze===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[me]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[me])),ue){const J=n.get(M[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,V,K,0,0,V,K,$,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let be=0;be<M.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,ae.__webglColorRenderbuffer[be]);const ze=n.get(M[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}}function Re(E){return Math.min(r.maxSamples,E.samples)}function de(E){const M=n.get(E);return a&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function rt(E){const M=o.render.frame;u.get(E)!==M&&(u.set(E,M),E.update())}function Oe(E,M){const V=E.colorSpace,K=E.format,$=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Us||V!==un&&V!==kt&&(Je.getTransfer(V)===nt?a===!1?e.has("EXT_sRGB")===!0&&K===Ht?(E.format=Us,E.minFilter=Dt,E.generateMipmaps=!1):M=fl.sRGBToLinear(M):(K!==Ht||$!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),M}this.allocateTextureUnit=I,this.resetTextureUnits=ee,this.setTexture2D=D,this.setTexture2DArray=q,this.setTexture3D=N,this.setTextureCube=O,this.rebindTextures=We,this.setupRenderTarget=B,this.updateRenderTargetMipmap=At,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=de}function s0(i,e,t){const n=t.isWebGL2;function r(s,o=kt){let a;const l=Je.getTransfer(o);if(s===yn)return i.UNSIGNED_BYTE;if(s===il)return i.UNSIGNED_SHORT_4_4_4_4;if(s===rl)return i.UNSIGNED_SHORT_5_5_5_1;if(s===Tc)return i.BYTE;if(s===Ac)return i.SHORT;if(s===Hs)return i.UNSIGNED_SHORT;if(s===nl)return i.INT;if(s===gn)return i.UNSIGNED_INT;if(s===vn)return i.FLOAT;if(s===zi)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Cc)return i.ALPHA;if(s===Ht)return i.RGBA;if(s===Rc)return i.LUMINANCE;if(s===Pc)return i.LUMINANCE_ALPHA;if(s===Dn)return i.DEPTH_COMPONENT;if(s===mi)return i.DEPTH_STENCIL;if(s===Us)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Lc)return i.RED;if(s===sl)return i.RED_INTEGER;if(s===Ic)return i.RG;if(s===al)return i.RG_INTEGER;if(s===ol)return i.RGBA_INTEGER;if(s===qr||s===Xr||s===Yr||s===Zr)if(l===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===qr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Xr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Yr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Zr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===qr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Xr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Yr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Zr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ga||s===va||s===xa||s===_a)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===ga)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===va)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===xa)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===_a)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===ll)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ya||s===Ma)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===ya)return l===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ma)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Sa||s===ba||s===wa||s===Ea||s===Ta||s===Aa||s===Ca||s===Ra||s===Pa||s===La||s===Ia||s===Da||s===Ua||s===Na)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Sa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===ba)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===wa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ea)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ta)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Aa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ca)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ra)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Pa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===La)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ia)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Da)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ua)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Na)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Jr||s===Fa||s===Oa)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Jr)return l===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Fa)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Oa)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Dc||s===za||s===Ba||s===Ga)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Jr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===za)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ba)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ga)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===In?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class a0 extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class $e extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const o0={type:"move"};class xs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(o0)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $e;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class l0 extends vi{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const v=t.getContextAttributes();let m=null,p=null;const _=[],x=[],S=new ce;let C=null;const T=new zt;T.layers.enable(1),T.viewport=new it;const A=new zt;A.layers.enable(2),A.viewport=new it;const F=[T,A],y=new a0;y.layers.enable(1),y.layers.enable(2);let w=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Z=_[X];return Z===void 0&&(Z=new xs,_[X]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(X){let Z=_[X];return Z===void 0&&(Z=new xs,_[X]=Z),Z.getGripSpace()},this.getHand=function(X){let Z=_[X];return Z===void 0&&(Z=new xs,_[X]=Z),Z.getHandSpace()};function W(X){const Z=x.indexOf(X.inputSource);if(Z===-1)return;const oe=_[Z];oe!==void 0&&(oe.update(X.inputSource,X.frame,c||o),oe.dispatchEvent({type:X.type,data:X.inputSource}))}function ee(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",ee),r.removeEventListener("inputsourceschange",I);for(let X=0;X<_.length;X++){const Z=x[X];Z!==null&&(x[X]=null,_[X].disconnect(Z))}w=null,z=null,e.setRenderTarget(m),d=null,f=null,h=null,r=null,p=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",ee),r.addEventListener("inputsourceschange",I),v.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:r.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,Z),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new Nn(d.framebufferWidth,d.framebufferHeight,{format:Ht,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let Z=null,oe=null,pe=null;v.depth&&(pe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=v.stencil?mi:Dn,oe=v.stencil?In:gn);const fe={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(fe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new Nn(f.textureWidth,f.textureHeight,{format:Ht,type:yn,depthTexture:new wl(f.textureWidth,f.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const Le=e.properties.get(p);Le.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function I(X){for(let Z=0;Z<X.removed.length;Z++){const oe=X.removed[Z],pe=x.indexOf(oe);pe>=0&&(x[pe]=null,_[pe].disconnect(oe))}for(let Z=0;Z<X.added.length;Z++){const oe=X.added[Z];let pe=x.indexOf(oe);if(pe===-1){for(let Le=0;Le<_.length;Le++)if(Le>=x.length){x.push(oe),pe=Le;break}else if(x[Le]===null){x[Le]=oe,pe=Le;break}if(pe===-1)break}const fe=_[pe];fe&&fe.connect(oe)}}const P=new R,D=new R;function q(X,Z,oe){P.setFromMatrixPosition(Z.matrixWorld),D.setFromMatrixPosition(oe.matrixWorld);const pe=P.distanceTo(D),fe=Z.projectionMatrix.elements,Le=oe.projectionMatrix.elements,De=fe[14]/(fe[10]-1),we=fe[14]/(fe[10]+1),We=(fe[9]+1)/fe[5],B=(fe[9]-1)/fe[5],At=(fe[8]-1)/fe[0],ye=(Le[8]+1)/Le[0],Re=De*At,de=De*ye,rt=pe/(-At+ye),Oe=rt*-At;Z.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Oe),X.translateZ(rt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const E=De+rt,M=we+rt,V=Re-Oe,K=de+(pe-Oe),$=We*we/M*E,Q=B*we/M*E;X.projectionMatrix.makePerspective(V,K,$,Q,E,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function N(X,Z){Z===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Z.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;y.near=A.near=T.near=X.near,y.far=A.far=T.far=X.far,(w!==y.near||z!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),w=y.near,z=y.far);const Z=X.parent,oe=y.cameras;N(y,Z);for(let pe=0;pe<oe.length;pe++)N(oe[pe],Z);oe.length===2?q(y,T,A):y.projectionMatrix.copy(T.projectionMatrix),O(X,y,Z)};function O(X,Z,oe){oe===null?X.matrix.copy(Z.matrixWorld):(X.matrix.copy(oe.matrixWorld),X.matrix.invert(),X.matrix.multiply(Z.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Bi*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)};let Y=null;function j(X,Z){if(u=Z.getViewerPose(c||o),g=Z,u!==null){const oe=u.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let pe=!1;oe.length!==y.cameras.length&&(y.cameras.length=0,pe=!0);for(let fe=0;fe<oe.length;fe++){const Le=oe[fe];let De=null;if(d!==null)De=d.getViewport(Le);else{const We=h.getViewSubImage(f,Le);De=We.viewport,fe===0&&(e.setRenderTargetTextures(p,We.colorTexture,f.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(p))}let we=F[fe];we===void 0&&(we=new zt,we.layers.enable(fe),we.viewport=new it,F[fe]=we),we.matrix.fromArray(Le.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(Le.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(De.x,De.y,De.width,De.height),fe===0&&(y.matrix.copy(we.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),pe===!0&&y.cameras.push(we)}}for(let oe=0;oe<_.length;oe++){const pe=x[oe],fe=_[oe];pe!==null&&fe!==void 0&&fe.update(pe,Z,c||o)}Y&&Y(X,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const se=new Sl;se.setAnimationLoop(j),this.setAnimationLoop=function(X){Y=X},this.dispose=function(){}}}function c0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,_l(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,_,x,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,_,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ut&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ut&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p).envMap;if(_&&(m.envMap.value=_,m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,_,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ut&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function u0(i,e,t,n){let r={},s={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(_,x){const S=x.program;n.uniformBlockBinding(_,S)}function c(_,x){let S=r[_.id];S===void 0&&(g(_),S=u(_),r[_.id]=S,_.addEventListener("dispose",m));const C=x.program;n.updateUBOMapping(_,C);const T=e.render.frame;s[_.id]!==T&&(f(_),s[_.id]=T)}function u(_){const x=h();_.__bindingPointIndex=x;const S=i.createBuffer(),C=_.__size,T=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,S),S}function h(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const x=r[_.id],S=_.uniforms,C=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,A=S.length;T<A;T++){const F=Array.isArray(S[T])?S[T]:[S[T]];for(let y=0,w=F.length;y<w;y++){const z=F[y];if(d(z,T,y,C)===!0){const W=z.__offset,ee=Array.isArray(z.value)?z.value:[z.value];let I=0;for(let P=0;P<ee.length;P++){const D=ee[P],q=v(D);typeof D=="number"||typeof D=="boolean"?(z.__data[0]=D,i.bufferSubData(i.UNIFORM_BUFFER,W+I,z.__data)):D.isMatrix3?(z.__data[0]=D.elements[0],z.__data[1]=D.elements[1],z.__data[2]=D.elements[2],z.__data[3]=0,z.__data[4]=D.elements[3],z.__data[5]=D.elements[4],z.__data[6]=D.elements[5],z.__data[7]=0,z.__data[8]=D.elements[6],z.__data[9]=D.elements[7],z.__data[10]=D.elements[8],z.__data[11]=0):(D.toArray(z.__data,I),I+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,x,S,C){const T=_.value,A=x+"_"+S;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{const F=C[A];if(typeof T=="number"||typeof T=="boolean"){if(F!==T)return C[A]=T,!0}else if(F.equals(T)===!1)return F.copy(T),!0}return!1}function g(_){const x=_.uniforms;let S=0;const C=16;for(let A=0,F=x.length;A<F;A++){const y=Array.isArray(x[A])?x[A]:[x[A]];for(let w=0,z=y.length;w<z;w++){const W=y[w],ee=Array.isArray(W.value)?W.value:[W.value];for(let I=0,P=ee.length;I<P;I++){const D=ee[I],q=v(D),N=S%C;N!==0&&C-N<q.boundary&&(S+=C-N),W.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=S,S+=q.storage}}}const T=S%C;return T>0&&(S+=C-T),_.__size=S,_.__cache={},this}function v(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function m(_){const x=_.target;x.removeEventListener("dispose",m);const S=o.indexOf(x.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function p(){for(const _ in r)i.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class Pl{constructor(e={}){const{canvas:t=su(),context:n=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const d=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const p=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this._useLegacyLights=!1,this.toneMapping=_n,this.toneMappingExposure=1;const x=this;let S=!1,C=0,T=0,A=null,F=-1,y=null;const w=new it,z=new it;let W=null;const ee=new xe(0);let I=0,P=t.width,D=t.height,q=1,N=null,O=null;const Y=new it(0,0,P,D),j=new it(0,0,P,D);let se=!1;const X=new Xs;let Z=!1,oe=!1,pe=null;const fe=new tt,Le=new ce,De=new R,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return A===null?q:1}let B=n;function At(b,U){for(let H=0;H<b.length;H++){const k=b[H],G=t.getContext(k,U);if(G!==null)return G}return null}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vs}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",ie,!1),B===null){const U=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&U.shift(),B=At(U,b),B===null)throw At(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ye,Re,de,rt,Oe,E,M,V,K,$,Q,me,ae,ue,be,ze,J,Ze,ke,Ae,_e,he,Ue,Xe;function ot(){ye=new yd(B),Re=new pd(B,ye,e),ye.init(Re),he=new s0(B,ye,Re),de=new i0(B,ye,Re),rt=new bd(B),Oe=new kp,E=new r0(B,ye,de,Oe,Re,he,rt),M=new gd(x),V=new _d(x),K=new Pu(B,Re),Ue=new fd(B,ye,K,Re),$=new Md(B,K,rt,Ue),Q=new Ad(B,$,K,rt),ke=new Td(B,Re,E),ze=new md(Oe),me=new Hp(x,M,V,ye,Re,Ue,ze),ae=new c0(x,Oe),ue=new qp,be=new Kp(ye,Re),Ze=new hd(x,M,V,de,Q,f,l),J=new n0(x,Q,Re),Xe=new u0(B,rt,Re,de),Ae=new dd(B,ye,rt,Re),_e=new Sd(B,ye,rt,Re),rt.programs=me.programs,x.capabilities=Re,x.extensions=ye,x.properties=Oe,x.renderLists=ue,x.shadowMap=J,x.state=de,x.info=rt}ot();const Ge=new l0(x,B);this.xr=Ge,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const b=ye.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ye.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(b){b!==void 0&&(q=b,this.setSize(P,D,!1))},this.getSize=function(b){return b.set(P,D)},this.setSize=function(b,U,H=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=b,D=U,t.width=Math.floor(b*q),t.height=Math.floor(U*q),H===!0&&(t.style.width=b+"px",t.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(P*q,D*q).floor()},this.setDrawingBufferSize=function(b,U,H){P=b,D=U,q=H,t.width=Math.floor(b*H),t.height=Math.floor(U*H),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(w)},this.getViewport=function(b){return b.copy(Y)},this.setViewport=function(b,U,H,k){b.isVector4?Y.set(b.x,b.y,b.z,b.w):Y.set(b,U,H,k),de.viewport(w.copy(Y).multiplyScalar(q).floor())},this.getScissor=function(b){return b.copy(j)},this.setScissor=function(b,U,H,k){b.isVector4?j.set(b.x,b.y,b.z,b.w):j.set(b,U,H,k),de.scissor(z.copy(j).multiplyScalar(q).floor())},this.getScissorTest=function(){return se},this.setScissorTest=function(b){de.setScissorTest(se=b)},this.setOpaqueSort=function(b){N=b},this.setTransparentSort=function(b){O=b},this.getClearColor=function(b){return b.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor.apply(Ze,arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha.apply(Ze,arguments)},this.clear=function(b=!0,U=!0,H=!0){let k=0;if(b){let G=!1;if(A!==null){const le=A.texture.format;G=le===ol||le===al||le===sl}if(G){const le=A.texture.type,ge=le===yn||le===gn||le===Hs||le===In||le===il||le===rl,Se=Ze.getClearColor(),Te=Ze.getClearAlpha(),Be=Se.r,Pe=Se.g,Ie=Se.b;ge?(d[0]=Be,d[1]=Pe,d[2]=Ie,d[3]=Te,B.clearBufferuiv(B.COLOR,0,d)):(g[0]=Be,g[1]=Pe,g[2]=Ie,g[3]=Te,B.clearBufferiv(B.COLOR,0,g))}else k|=B.COLOR_BUFFER_BIT}U&&(k|=B.DEPTH_BUFFER_BIT),H&&(k|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),ue.dispose(),be.dispose(),Oe.dispose(),M.dispose(),V.dispose(),Q.dispose(),Ue.dispose(),Xe.dispose(),me.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Ct),Ge.removeEventListener("sessionend",Qe),pe&&(pe.dispose(),pe=null),Rt.stop()};function te(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const b=rt.autoReset,U=J.enabled,H=J.autoUpdate,k=J.needsUpdate,G=J.type;ot(),rt.autoReset=b,J.enabled=U,J.autoUpdate=H,J.needsUpdate=k,J.type=G}function ie(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function re(b){const U=b.target;U.removeEventListener("dispose",re),Ee(U)}function Ee(b){Me(b),Oe.remove(b)}function Me(b){const U=Oe.get(b).programs;U!==void 0&&(U.forEach(function(H){me.releaseProgram(H)}),b.isShaderMaterial&&me.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,H,k,G,le){U===null&&(U=we);const ge=G.isMesh&&G.matrixWorld.determinant()<0,Se=Vl(b,U,H,k,G);de.setMaterial(k,ge);let Te=H.index,Be=1;if(k.wireframe===!0){if(Te=$.getWireframeAttribute(H),Te===void 0)return;Be=2}const Pe=H.drawRange,Ie=H.attributes.position;let ct=Pe.start*Be,Nt=(Pe.start+Pe.count)*Be;le!==null&&(ct=Math.max(ct,le.start*Be),Nt=Math.min(Nt,(le.start+le.count)*Be)),Te!==null?(ct=Math.max(ct,0),Nt=Math.min(Nt,Te.count)):Ie!=null&&(ct=Math.max(ct,0),Nt=Math.min(Nt,Ie.count));const xt=Nt-ct;if(xt<0||xt===1/0)return;Ue.setup(G,k,Se,H,Te);let Qt,st=Ae;if(Te!==null&&(Qt=K.get(Te),st=_e,st.setIndex(Qt)),G.isMesh)k.wireframe===!0?(de.setLineWidth(k.wireframeLinewidth*We()),st.setMode(B.LINES)):st.setMode(B.TRIANGLES);else if(G.isLine){let Ve=k.linewidth;Ve===void 0&&(Ve=1),de.setLineWidth(Ve*We()),G.isLineSegments?st.setMode(B.LINES):G.isLineLoop?st.setMode(B.LINE_LOOP):st.setMode(B.LINE_STRIP)}else G.isPoints?st.setMode(B.POINTS):G.isSprite&&st.setMode(B.TRIANGLES);if(G.isBatchedMesh)st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)st.renderInstances(ct,xt,G.count);else if(H.isInstancedBufferGeometry){const Ve=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Gr=Math.min(H.instanceCount,Ve);st.renderInstances(ct,xt,Gr)}else st.render(ct,xt)};function Ke(b,U,H){b.transparent===!0&&b.side===yt&&b.forceSinglePass===!1?(b.side=Ut,b.needsUpdate=!0,Xi(b,U,H),b.side=cn,b.needsUpdate=!0,Xi(b,U,H),b.side=yt):Xi(b,U,H)}this.compile=function(b,U,H=null){H===null&&(H=b),m=be.get(H),m.init(),_.push(m),H.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),b!==H&&b.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(x._useLegacyLights);const k=new Set;return b.traverse(function(G){const le=G.material;if(le)if(Array.isArray(le))for(let ge=0;ge<le.length;ge++){const Se=le[ge];Ke(Se,H,G),k.add(Se)}else Ke(le,H,G),k.add(le)}),_.pop(),m=null,k},this.compileAsync=function(b,U,H=null){const k=this.compile(b,U,H);return new Promise(G=>{function le(){if(k.forEach(function(ge){Oe.get(ge).currentProgram.isReady()&&k.delete(ge)}),k.size===0){G(b);return}setTimeout(le,10)}ye.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let je=null;function vt(b){je&&je(b)}function Ct(){Rt.stop()}function Qe(){Rt.start()}const Rt=new Sl;Rt.setAnimationLoop(vt),typeof self<"u"&&Rt.setContext(self),this.setAnimationLoop=function(b){je=b,Ge.setAnimationLoop(b),b===null?Rt.stop():Rt.start()},Ge.addEventListener("sessionstart",Ct),Ge.addEventListener("sessionend",Qe),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(U),U=Ge.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,U,A),m=be.get(b,_.length),m.init(),_.push(m),fe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(fe),oe=this.localClippingEnabled,Z=ze.init(this.clippingPlanes,oe),v=ue.get(b,p.length),v.init(),p.push(v),Zt(b,U,0,x.sortObjects),v.finish(),x.sortObjects===!0&&v.sort(N,O),this.info.render.frame++,Z===!0&&ze.beginShadows();const H=m.state.shadowsArray;if(J.render(H,b,U),Z===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ze.render(v,b),m.setupLights(x._useLegacyLights),U.isArrayCamera){const k=U.cameras;for(let G=0,le=k.length;G<le;G++){const ge=k[G];ia(v,b,ge,ge.viewport)}}else ia(v,b,U);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(x,b,U),Ue.resetDefaultState(),F=-1,y=null,_.pop(),_.length>0?m=_[_.length-1]:m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function Zt(b,U,H,k){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)H=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){k&&De.setFromMatrixPosition(b.matrixWorld).applyMatrix4(fe);const ge=Q.update(b),Se=b.material;Se.visible&&v.push(b,ge,Se,H,De.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const ge=Q.update(b),Se=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),De.copy(b.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),De.copy(ge.boundingSphere.center)),De.applyMatrix4(b.matrixWorld).applyMatrix4(fe)),Array.isArray(Se)){const Te=ge.groups;for(let Be=0,Pe=Te.length;Be<Pe;Be++){const Ie=Te[Be],ct=Se[Ie.materialIndex];ct&&ct.visible&&v.push(b,ge,ct,H,De.z,Ie)}}else Se.visible&&v.push(b,ge,Se,H,De.z,null)}}const le=b.children;for(let ge=0,Se=le.length;ge<Se;ge++)Zt(le[ge],U,H,k)}function ia(b,U,H,k){const G=b.opaque,le=b.transmissive,ge=b.transparent;m.setupLightsView(H),Z===!0&&ze.setGlobalState(x.clippingPlanes,H),le.length>0&&Gl(G,le,U,H),k&&de.viewport(w.copy(k)),G.length>0&&qi(G,U,H),le.length>0&&qi(le,U,H),ge.length>0&&qi(ge,U,H),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Gl(b,U,H,k){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const le=Re.isWebGL2;pe===null&&(pe=new Nn(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?zi:yn,minFilter:Oi,samples:le?4:0})),x.getDrawingBufferSize(Le),le?pe.setSize(Le.x,Le.y):pe.setSize(Ir(Le.x),Ir(Le.y));const ge=x.getRenderTarget();x.setRenderTarget(pe),x.getClearColor(ee),I=x.getClearAlpha(),I<1&&x.setClearColor(16777215,.5),x.clear();const Se=x.toneMapping;x.toneMapping=_n,qi(b,H,k),E.updateMultisampleRenderTarget(pe),E.updateRenderTargetMipmap(pe);let Te=!1;for(let Be=0,Pe=U.length;Be<Pe;Be++){const Ie=U[Be],ct=Ie.object,Nt=Ie.geometry,xt=Ie.material,Qt=Ie.group;if(xt.side===yt&&ct.layers.test(k.layers)){const st=xt.side;xt.side=Ut,xt.needsUpdate=!0,ra(ct,H,k,Nt,xt,Qt),xt.side=st,xt.needsUpdate=!0,Te=!0}}Te===!0&&(E.updateMultisampleRenderTarget(pe),E.updateRenderTargetMipmap(pe)),x.setRenderTarget(ge),x.setClearColor(ee,I),x.toneMapping=Se}function qi(b,U,H){const k=U.isScene===!0?U.overrideMaterial:null;for(let G=0,le=b.length;G<le;G++){const ge=b[G],Se=ge.object,Te=ge.geometry,Be=k===null?ge.material:k,Pe=ge.group;Se.layers.test(H.layers)&&ra(Se,U,H,Te,Be,Pe)}}function ra(b,U,H,k,G,le){b.onBeforeRender(x,U,H,k,G,le),b.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(x,U,H,k,b,le),G.transparent===!0&&G.side===yt&&G.forceSinglePass===!1?(G.side=Ut,G.needsUpdate=!0,x.renderBufferDirect(H,U,k,G,b,le),G.side=cn,G.needsUpdate=!0,x.renderBufferDirect(H,U,k,G,b,le),G.side=yt):x.renderBufferDirect(H,U,k,G,b,le),b.onAfterRender(x,U,H,k,G,le)}function Xi(b,U,H){U.isScene!==!0&&(U=we);const k=Oe.get(b),G=m.state.lights,le=m.state.shadowsArray,ge=G.state.version,Se=me.getParameters(b,G.state,le,U,H),Te=me.getProgramCacheKey(Se);let Be=k.programs;k.environment=b.isMeshStandardMaterial?U.environment:null,k.fog=U.fog,k.envMap=(b.isMeshStandardMaterial?V:M).get(b.envMap||k.environment),Be===void 0&&(b.addEventListener("dispose",re),Be=new Map,k.programs=Be);let Pe=Be.get(Te);if(Pe!==void 0){if(k.currentProgram===Pe&&k.lightsStateVersion===ge)return aa(b,Se),Pe}else Se.uniforms=me.getUniforms(b),b.onBuild(H,Se,x),b.onBeforeCompile(Se,x),Pe=me.acquireProgram(Se,Te),Be.set(Te,Pe),k.uniforms=Se.uniforms;const Ie=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ie.clippingPlanes=ze.uniform),aa(b,Se),k.needsLights=kl(b),k.lightsStateVersion=ge,k.needsLights&&(Ie.ambientLightColor.value=G.state.ambient,Ie.lightProbe.value=G.state.probe,Ie.directionalLights.value=G.state.directional,Ie.directionalLightShadows.value=G.state.directionalShadow,Ie.spotLights.value=G.state.spot,Ie.spotLightShadows.value=G.state.spotShadow,Ie.rectAreaLights.value=G.state.rectArea,Ie.ltc_1.value=G.state.rectAreaLTC1,Ie.ltc_2.value=G.state.rectAreaLTC2,Ie.pointLights.value=G.state.point,Ie.pointLightShadows.value=G.state.pointShadow,Ie.hemisphereLights.value=G.state.hemi,Ie.directionalShadowMap.value=G.state.directionalShadowMap,Ie.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ie.spotShadowMap.value=G.state.spotShadowMap,Ie.spotLightMatrix.value=G.state.spotLightMatrix,Ie.spotLightMap.value=G.state.spotLightMap,Ie.pointShadowMap.value=G.state.pointShadowMap,Ie.pointShadowMatrix.value=G.state.pointShadowMatrix),k.currentProgram=Pe,k.uniformsList=null,Pe}function sa(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=Er.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function aa(b,U){const H=Oe.get(b);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function Vl(b,U,H,k,G){U.isScene!==!0&&(U=we),E.resetTextureUnits();const le=U.fog,ge=k.isMeshStandardMaterial?U.environment:null,Se=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:un,Te=(k.isMeshStandardMaterial?V:M).get(k.envMap||ge),Be=k.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Pe=!!H.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ie=!!H.morphAttributes.position,ct=!!H.morphAttributes.normal,Nt=!!H.morphAttributes.color;let xt=_n;k.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(xt=x.toneMapping);const Qt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,st=Qt!==void 0?Qt.length:0,Ve=Oe.get(k),Gr=m.state.lights;if(Z===!0&&(oe===!0||b!==y)){const Bt=b===y&&k.id===F;ze.setState(k,b,Bt)}let lt=!1;k.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Gr.state.version||Ve.outputColorSpace!==Se||G.isBatchedMesh&&Ve.batching===!1||!G.isBatchedMesh&&Ve.batching===!0||G.isInstancedMesh&&Ve.instancing===!1||!G.isInstancedMesh&&Ve.instancing===!0||G.isSkinnedMesh&&Ve.skinning===!1||!G.isSkinnedMesh&&Ve.skinning===!0||G.isInstancedMesh&&Ve.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ve.instancingColor===!1&&G.instanceColor!==null||Ve.envMap!==Te||k.fog===!0&&Ve.fog!==le||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ze.numPlanes||Ve.numIntersection!==ze.numIntersection)||Ve.vertexAlphas!==Be||Ve.vertexTangents!==Pe||Ve.morphTargets!==Ie||Ve.morphNormals!==ct||Ve.morphColors!==Nt||Ve.toneMapping!==xt||Re.isWebGL2===!0&&Ve.morphTargetsCount!==st)&&(lt=!0):(lt=!0,Ve.__version=k.version);let Sn=Ve.currentProgram;lt===!0&&(Sn=Xi(k,U,G));let oa=!1,yi=!1,Vr=!1;const bt=Sn.getUniforms(),bn=Ve.uniforms;if(de.useProgram(Sn.program)&&(oa=!0,yi=!0,Vr=!0),k.id!==F&&(F=k.id,yi=!0),oa||y!==b){bt.setValue(B,"projectionMatrix",b.projectionMatrix),bt.setValue(B,"viewMatrix",b.matrixWorldInverse);const Bt=bt.map.cameraPosition;Bt!==void 0&&Bt.setValue(B,De.setFromMatrixPosition(b.matrixWorld)),Re.logarithmicDepthBuffer&&bt.setValue(B,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&bt.setValue(B,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,yi=!0,Vr=!0)}if(G.isSkinnedMesh){bt.setOptional(B,G,"bindMatrix"),bt.setOptional(B,G,"bindMatrixInverse");const Bt=G.skeleton;Bt&&(Re.floatVertexTextures?(Bt.boneTexture===null&&Bt.computeBoneTexture(),bt.setValue(B,"boneTexture",Bt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(bt.setOptional(B,G,"batchingTexture"),bt.setValue(B,"batchingTexture",G._matricesTexture,E));const Hr=H.morphAttributes;if((Hr.position!==void 0||Hr.normal!==void 0||Hr.color!==void 0&&Re.isWebGL2===!0)&&ke.update(G,H,Sn),(yi||Ve.receiveShadow!==G.receiveShadow)&&(Ve.receiveShadow=G.receiveShadow,bt.setValue(B,"receiveShadow",G.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(bn.envMap.value=Te,bn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),yi&&(bt.setValue(B,"toneMappingExposure",x.toneMappingExposure),Ve.needsLights&&Hl(bn,Vr),le&&k.fog===!0&&ae.refreshFogUniforms(bn,le),ae.refreshMaterialUniforms(bn,k,q,D,pe),Er.upload(B,sa(Ve),bn,E)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Er.upload(B,sa(Ve),bn,E),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&bt.setValue(B,"center",G.center),bt.setValue(B,"modelViewMatrix",G.modelViewMatrix),bt.setValue(B,"normalMatrix",G.normalMatrix),bt.setValue(B,"modelMatrix",G.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Bt=k.uniformsGroups;for(let kr=0,Wl=Bt.length;kr<Wl;kr++)if(Re.isWebGL2){const la=Bt[kr];Xe.update(la,Sn),Xe.bind(la,Sn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Sn}function Hl(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function kl(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,U,H){Oe.get(b.texture).__webglTexture=U,Oe.get(b.depthTexture).__webglTexture=H;const k=Oe.get(b);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=H===void 0,k.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,U){const H=Oe.get(b);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,H=0){A=b,C=U,T=H;let k=!0,G=null,le=!1,ge=!1;if(b){const Te=Oe.get(b);Te.__useDefaultFramebuffer!==void 0?(de.bindFramebuffer(B.FRAMEBUFFER,null),k=!1):Te.__webglFramebuffer===void 0?E.setupRenderTarget(b):Te.__hasExternalTextures&&E.rebindTextures(b,Oe.get(b.texture).__webglTexture,Oe.get(b.depthTexture).__webglTexture);const Be=b.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ge=!0);const Pe=Oe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Pe[U])?G=Pe[U][H]:G=Pe[U],le=!0):Re.isWebGL2&&b.samples>0&&E.useMultisampledRTT(b)===!1?G=Oe.get(b).__webglMultisampledFramebuffer:Array.isArray(Pe)?G=Pe[H]:G=Pe,w.copy(b.viewport),z.copy(b.scissor),W=b.scissorTest}else w.copy(Y).multiplyScalar(q).floor(),z.copy(j).multiplyScalar(q).floor(),W=se;if(de.bindFramebuffer(B.FRAMEBUFFER,G)&&Re.drawBuffers&&k&&de.drawBuffers(b,G),de.viewport(w),de.scissor(z),de.setScissorTest(W),le){const Te=Oe.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+U,Te.__webglTexture,H)}else if(ge){const Te=Oe.get(b.texture),Be=U||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Te.__webglTexture,H||0,Be)}F=-1},this.readRenderTargetPixels=function(b,U,H,k,G,le,ge){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Oe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ge!==void 0&&(Se=Se[ge]),Se){de.bindFramebuffer(B.FRAMEBUFFER,Se);try{const Te=b.texture,Be=Te.format,Pe=Te.type;if(Be!==Ht&&he.convert(Be)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ie=Pe===zi&&(ye.has("EXT_color_buffer_half_float")||Re.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Pe!==yn&&he.convert(Pe)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pe===vn&&(Re.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Ie){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-k&&H>=0&&H<=b.height-G&&B.readPixels(U,H,k,G,he.convert(Be),he.convert(Pe),le)}finally{const Te=A!==null?Oe.get(A).__webglFramebuffer:null;de.bindFramebuffer(B.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(b,U,H=0){const k=Math.pow(2,-H),G=Math.floor(U.image.width*k),le=Math.floor(U.image.height*k);E.setTexture2D(U,0),B.copyTexSubImage2D(B.TEXTURE_2D,H,0,0,b.x,b.y,G,le),de.unbindTexture()},this.copyTextureToTexture=function(b,U,H,k=0){const G=U.image.width,le=U.image.height,ge=he.convert(H.format),Se=he.convert(H.type);E.setTexture2D(H,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment),U.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,k,b.x,b.y,G,le,ge,Se,U.image.data):U.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,k,b.x,b.y,U.mipmaps[0].width,U.mipmaps[0].height,ge,U.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,k,b.x,b.y,ge,Se,U.image),k===0&&H.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),de.unbindTexture()},this.copyTextureToTexture3D=function(b,U,H,k,G=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const le=b.max.x-b.min.x+1,ge=b.max.y-b.min.y+1,Se=b.max.z-b.min.z+1,Te=he.convert(k.format),Be=he.convert(k.type);let Pe;if(k.isData3DTexture)E.setTexture3D(k,0),Pe=B.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)E.setTexture2DArray(k,0),Pe=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,k.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,k.unpackAlignment);const Ie=B.getParameter(B.UNPACK_ROW_LENGTH),ct=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Nt=B.getParameter(B.UNPACK_SKIP_PIXELS),xt=B.getParameter(B.UNPACK_SKIP_ROWS),Qt=B.getParameter(B.UNPACK_SKIP_IMAGES),st=H.isCompressedTexture?H.mipmaps[G]:H.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,st.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,st.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,b.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,b.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,b.min.z),H.isDataTexture||H.isData3DTexture?B.texSubImage3D(Pe,G,U.x,U.y,U.z,le,ge,Se,Te,Be,st.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Pe,G,U.x,U.y,U.z,le,ge,Se,Te,st.data)):B.texSubImage3D(Pe,G,U.x,U.y,U.z,le,ge,Se,Te,Be,st),B.pixelStorei(B.UNPACK_ROW_LENGTH,Ie),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ct),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Nt),B.pixelStorei(B.UNPACK_SKIP_ROWS,xt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Qt),G===0&&k.generateMipmaps&&B.generateMipmap(Pe),de.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),de.unbindTexture()},this.resetState=function(){C=0,T=0,A=null,de.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ks?"display-p3":"srgb",t.unpackColorSpace=Je.workingColorSpace===Fr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Mt?Un:cl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Un?Mt:un}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class h0 extends Pl{}h0.prototype.isWebGL1Renderer=!0;class f0 extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class d0 extends Tt{constructor(e=null,t=1,n=1,r,s,o,a,l,c=dt,u=dt,h,f){super(null,o,a,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lo extends ut{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ni=new tt,Io=new tt,mr=[],Do=new zn,p0=new tt,Ei=new qe,Ti=new Bn;class Uo extends qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Lo(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,p0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ni),Do.copy(e.boundingBox).applyMatrix4(ni),this.boundingBox.union(Do)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ni),Ti.copy(e.boundingSphere).applyMatrix4(ni),this.boundingSphere.union(Ti)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Ei.geometry=this.geometry,Ei.material=this.material,Ei.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ti.copy(this.boundingSphere),Ti.applyMatrix4(n),e.ray.intersectsSphere(Ti)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ni),Io.multiplyMatrices(n,ni),Ei.matrixWorld=Io,Ei.raycast(e,mr);for(let o=0,a=mr.length;o<a;o++){const l=mr[o];l.instanceId=s,l.object=this,t.push(l)}mr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Lo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class ri extends xi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const No=new R,Fo=new R,Oo=new tt,_s=new qs,gr=new Bn;class m0 extends pt{constructor(e=new et,t=new ri){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)No.fromBufferAttribute(t,r-1),Fo.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=No.distanceTo(Fo);e.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(r),gr.radius+=s,e.ray.intersectsSphere(gr)===!1)return;Oo.copy(r).invert(),_s.copy(e.ray).applyMatrix4(Oo);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new R,u=new R,h=new R,f=new R,d=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),_=Math.min(g.count,o.start+o.count);for(let x=p,S=_-1;x<S;x+=d){const C=g.getX(x),T=g.getX(x+1);if(c.fromBufferAttribute(m,C),u.fromBufferAttribute(m,T),_s.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const F=e.ray.origin.distanceTo(f);F<e.near||F>e.far||t.push({distance:F,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),_=Math.min(m.count,o.start+o.count);for(let x=p,S=_-1;x<S;x+=d){if(c.fromBufferAttribute(m,x),u.fromBufferAttribute(m,x+1),_s.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(f);T<e.near||T>e.far||t.push({distance:T,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const zo=new R,Bo=new R;class Ai extends m0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)zo.fromBufferAttribute(t,r),Bo.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+zo.distanceTo(Bo);e.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Tr extends xi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Go=new tt,Os=new qs,vr=new Bn,xr=new R;class an extends pt{constructor(e=new et,t=new Tr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(r),vr.radius+=s,e.ray.intersectsSphere(vr)===!1)return;Go.copy(r).invert(),Os.copy(e.ray).applyMatrix4(Go);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,v=d;g<v;g++){const m=c.getX(g);xr.fromBufferAttribute(h,m),Vo(xr,m,l,r,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,v=d;g<v;g++)xr.fromBufferAttribute(h,g),Vo(xr,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Vo(i,e,t,n,r,s,o){const a=Os.distanceSqToPoint(i);if(a<t){const l=new R;Os.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Ci extends Tt{constructor(e,t,n,r,s,o,a,l,c){super(e,t,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class jt{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=n[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===o)return r/(s-1);const u=n[r],f=n[r+1]-u,d=(o-u)/f;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new ce:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new R,r=[],s=[],o=[],a=new R,l=new tt;for(let d=0;d<=e;d++){const g=d/e;r[d]=this.getTangentAt(g,new R)}s[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(St(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(St(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Zs extends jt{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const n=t||new ce,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class g0 extends Zs{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Js(){let i=0,e=0,t=0,n=0;function r(s,o,a,l){i=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const _r=new R,ys=new Js,Ms=new Js,Ss=new Js;class v0 extends jt{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(_r.subVectors(r[0],r[1]).add(r[0]),c=_r);const h=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(_r.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=_r),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),ys.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,v,m),Ms.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,v,m),Ss.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,v,m)}else this.curveType==="catmullrom"&&(ys.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),Ms.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),Ss.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(ys.calc(l),Ms.calc(l),Ss.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ho(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,l=i*a;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*a+s*i+t}function x0(i,e){const t=1-i;return t*t*e}function _0(i,e){return 2*(1-i)*i*e}function y0(i,e){return i*i*e}function Ii(i,e,t,n){return x0(i,e)+_0(i,t)+y0(i,n)}function M0(i,e){const t=1-i;return t*t*t*e}function S0(i,e){const t=1-i;return 3*t*t*i*e}function b0(i,e){return 3*(1-i)*i*i*e}function w0(i,e){return i*i*i*e}function Di(i,e,t,n,r){return M0(i,e)+S0(i,t)+b0(i,n)+w0(i,r)}class Ll extends jt{constructor(e=new ce,t=new ce,n=new ce,r=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ce){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Di(e,r.x,s.x,o.x,a.x),Di(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class E0 extends jt{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Di(e,r.x,s.x,o.x,a.x),Di(e,r.y,s.y,o.y,a.y),Di(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Il extends jt{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class T0 extends jt{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dl extends jt{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ii(e,r.x,s.x,o.x),Ii(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class A0 extends jt{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ii(e,r.x,s.x,o.x),Ii(e,r.y,s.y,o.y),Ii(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ul extends jt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(Ho(a,l.x,c.x,u.x,h.x),Ho(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new ce().fromArray(r))}return this}}var ko=Object.freeze({__proto__:null,ArcCurve:g0,CatmullRomCurve3:v0,CubicBezierCurve:Ll,CubicBezierCurve3:E0,EllipseCurve:Zs,LineCurve:Il,LineCurve3:T0,QuadraticBezierCurve:Dl,QuadraticBezierCurve3:A0,SplineCurve:Ul});class C0 extends jt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ko[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new ko[r.type]().fromJSON(r))}return this}}class Wo extends C0{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Il(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new Dl(this.currentPoint.clone(),new ce(e,t),new ce(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new Ll(this.currentPoint.clone(),new ce(e,t),new ce(n,r),new ce(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Ul(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,r,s,o,a,l),this}absellipse(e,t,n,r,s,o,a,l){const c=new Zs(e,t,n,r,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class $s extends et{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new R,u=new ce;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Fe(o,3)),this.setAttribute("normal",new Fe(a,3)),this.setAttribute("uv",new Fe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $s(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ks extends et{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;_(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Fe(h,3)),this.setAttribute("normal",new Fe(f,3)),this.setAttribute("uv",new Fe(d,2));function _(){const S=new R,C=new R;let T=0;const A=(t-e)/n;for(let F=0;F<=s;F++){const y=[],w=F/s,z=w*(t-e)+e;for(let W=0;W<=r;W++){const ee=W/r,I=ee*l+a,P=Math.sin(I),D=Math.cos(I);C.x=z*P,C.y=-w*n+m,C.z=z*D,h.push(C.x,C.y,C.z),S.set(P,A,D).normalize(),f.push(S.x,S.y,S.z),d.push(ee,1-w),y.push(g++)}v.push(y)}for(let F=0;F<r;F++)for(let y=0;y<s;y++){const w=v[y][F],z=v[y+1][F],W=v[y+1][F+1],ee=v[y][F+1];u.push(w,z,ee),u.push(z,W,ee),T+=6}c.addGroup(p,T,0),p+=T}function x(S){const C=g,T=new ce,A=new R;let F=0;const y=S===!0?e:t,w=S===!0?1:-1;for(let W=1;W<=r;W++)h.push(0,m*w,0),f.push(0,w,0),d.push(.5,.5),g++;const z=g;for(let W=0;W<=r;W++){const I=W/r*l+a,P=Math.cos(I),D=Math.sin(I);A.x=y*D,A.y=m*w,A.z=y*P,h.push(A.x,A.y,A.z),f.push(0,w,0),T.x=P*.5+.5,T.y=D*.5*w+.5,d.push(T.x,T.y),g++}for(let W=0;W<r;W++){const ee=C+W,I=z+W;S===!0?u.push(I,I+1,ee):u.push(I+1,I,ee),F+=3}c.addGroup(p,F,S===!0?1:2),p+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ks(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ui extends Ks{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ui(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class js extends et{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),c(n),u(),this.setAttribute("position",new Fe(s,3)),this.setAttribute("normal",new Fe(s.slice(),3)),this.setAttribute("uv",new Fe(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const x=new R,S=new R,C=new R;for(let T=0;T<t.length;T+=3)d(t[T+0],x),d(t[T+1],S),d(t[T+2],C),l(x,S,C,_)}function l(_,x,S,C){const T=C+1,A=[];for(let F=0;F<=T;F++){A[F]=[];const y=_.clone().lerp(S,F/T),w=x.clone().lerp(S,F/T),z=T-F;for(let W=0;W<=z;W++)W===0&&F===T?A[F][W]=y:A[F][W]=y.clone().lerp(w,W/z)}for(let F=0;F<T;F++)for(let y=0;y<2*(T-F)-1;y++){const w=Math.floor(y/2);y%2===0?(f(A[F][w+1]),f(A[F+1][w]),f(A[F][w])):(f(A[F][w+1]),f(A[F+1][w+1]),f(A[F+1][w]))}}function c(_){const x=new R;for(let S=0;S<s.length;S+=3)x.x=s[S+0],x.y=s[S+1],x.z=s[S+2],x.normalize().multiplyScalar(_),s[S+0]=x.x,s[S+1]=x.y,s[S+2]=x.z}function u(){const _=new R;for(let x=0;x<s.length;x+=3){_.x=s[x+0],_.y=s[x+1],_.z=s[x+2];const S=m(_)/2/Math.PI+.5,C=p(_)/Math.PI+.5;o.push(S,1-C)}g(),h()}function h(){for(let _=0;_<o.length;_+=6){const x=o[_+0],S=o[_+2],C=o[_+4],T=Math.max(x,S,C),A=Math.min(x,S,C);T>.9&&A<.1&&(x<.2&&(o[_+0]+=1),S<.2&&(o[_+2]+=1),C<.2&&(o[_+4]+=1))}}function f(_){s.push(_.x,_.y,_.z)}function d(_,x){const S=_*3;x.x=e[S+0],x.y=e[S+1],x.z=e[S+2]}function g(){const _=new R,x=new R,S=new R,C=new R,T=new ce,A=new ce,F=new ce;for(let y=0,w=0;y<s.length;y+=9,w+=6){_.set(s[y+0],s[y+1],s[y+2]),x.set(s[y+3],s[y+4],s[y+5]),S.set(s[y+6],s[y+7],s[y+8]),T.set(o[w+0],o[w+1]),A.set(o[w+2],o[w+3]),F.set(o[w+4],o[w+5]),C.copy(_).add(x).add(S).divideScalar(3);const z=m(C);v(T,w+0,_,z),v(A,w+2,x,z),v(F,w+4,S,z)}}function v(_,x,S,C){C<0&&_.x===1&&(o[x]=_.x-1),S.x===0&&S.z===0&&(o[x]=C/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.vertices,e.indices,e.radius,e.details)}}const yr=new R,Mr=new R,bs=new R,Sr=new Vt;class ws extends et{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(hi*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:v,b:m,c:p}=Sr;if(v.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Sr.getNormal(bs),h[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,h[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,h[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let _=0;_<3;_++){const x=(_+1)%3,S=h[_],C=h[x],T=Sr[u[_]],A=Sr[u[x]],F=`${S}_${C}`,y=`${C}_${S}`;y in f&&f[y]?(bs.dot(f[y].normal)<=s&&(d.push(T.x,T.y,T.z),d.push(A.x,A.y,A.z)),f[y]=null):F in f||(f[F]={index0:c[_],index1:c[x],normal:bs.clone()})}}for(const g in f)if(f[g]){const{index0:v,index1:m}=f[g];yr.fromBufferAttribute(a,v),Mr.fromBufferAttribute(a,m),d.push(yr.x,yr.y,yr.z),d.push(Mr.x,Mr.y,Mr.z)}this.setAttribute("position",new Fe(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class zs extends Wo{constructor(e){super(e),this.uuid=On(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new Wo().fromJSON(r))}return this}}const R0={triangulate:function(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=Nl(i,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,h,f,d;if(n&&(s=U0(i,e,s,t)),i.length>80*t){a=c=i[0],l=u=i[1];for(let g=t;g<r;g+=t)h=i[g],f=i[g+1],h<a&&(a=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-a,u-l),d=d!==0?32767/d:0}return Vi(s,o,t,a,l,d,0),o}};function Nl(i,e,t,n,r){let s,o;if(r===q0(i,e,t,n)>0)for(s=e;s<t;s+=n)o=qo(s,i[s],i[s+1],o);else for(s=t-n;s>=e;s-=n)o=qo(s,i[s],i[s+1],o);return o&&Br(o,o.next)&&(ki(o),o=o.next),o}function Fn(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Br(t,t.next)||at(t.prev,t,t.next)===0)){if(ki(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Vi(i,e,t,n,r,s,o){if(!i)return;!o&&s&&B0(i,n,r,s);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?L0(i,n,r,s):P0(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),ki(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=I0(Fn(i),e,t),Vi(i,e,t,n,r,s,2)):o===2&&D0(i,e,t,n,r,s):Vi(Fn(i),e,t,n,r,s,1);break}}}function P0(i){const e=i.prev,t=i,n=i.next;if(at(e,t,n)>=0)return!1;const r=e.x,s=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=r<s?r<o?r:o:s<o?s:o,h=a<l?a<c?a:c:l<c?l:c,f=r>s?r>o?r:o:s>o?s:o,d=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&oi(r,a,s,l,o,c,g.x,g.y)&&at(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function L0(i,e,t,n){const r=i.prev,s=i,o=i.next;if(at(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,h=s.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,g=u<h?u<f?u:f:h<f?h:f,v=a>l?a>c?a:c:l>c?l:c,m=u>h?u>f?u:f:h>f?h:f,p=Bs(d,g,e,t,n),_=Bs(v,m,e,t,n);let x=i.prevZ,S=i.nextZ;for(;x&&x.z>=p&&S&&S.z<=_;){if(x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&oi(a,u,l,h,c,f,x.x,x.y)&&at(x.prev,x,x.next)>=0||(x=x.prevZ,S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&oi(a,u,l,h,c,f,S.x,S.y)&&at(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;x&&x.z>=p;){if(x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&oi(a,u,l,h,c,f,x.x,x.y)&&at(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;S&&S.z<=_;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&oi(a,u,l,h,c,f,S.x,S.y)&&at(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function I0(i,e,t){let n=i;do{const r=n.prev,s=n.next.next;!Br(r,s)&&Fl(r,n,n.next,s)&&Hi(r,s)&&Hi(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),ki(n),ki(n.next),n=i=s),n=n.next}while(n!==i);return Fn(n)}function D0(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&H0(o,a)){let l=Ol(o,a);o=Fn(o,o.next),l=Fn(l,l.next),Vi(o,e,t,n,r,s,0),Vi(l,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function U0(i,e,t,n){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*n,l=s<o-1?e[s+1]*n:i.length,c=Nl(i,a,l,n,!1),c===c.next&&(c.steiner=!0),r.push(V0(c));for(r.sort(N0),s=0;s<r.length;s++)t=F0(r[s],t);return t}function N0(i,e){return i.x-e.x}function F0(i,e){const t=O0(i,e);if(!t)return e;const n=Ol(t,i);return Fn(n,n.next),Fn(t,t.next)}function O0(i,e){let t=e,n=-1/0,r;const s=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=s&&f>n&&(n=f,r=t.x<t.next.x?t:t.next,f===s))return r}t=t.next}while(t!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let u=1/0,h;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&oi(o<c?s:n,o,l,c,o<c?n:s,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(s-t.x),Hi(t,i)&&(h<u||h===u&&(t.x>r.x||t.x===r.x&&z0(r,t)))&&(r=t,u=h)),t=t.next;while(t!==a);return r}function z0(i,e){return at(i.prev,i,e.prev)<0&&at(e.next,i,i.next)<0}function B0(i,e,t,n){let r=i;do r.z===0&&(r.z=Bs(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,G0(r)}function G0(i){let e,t,n,r,s,o,a,l,c=1;do{for(t=i,i=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,a--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,c*=2}while(o>1);return i}function Bs(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function V0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function oi(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function H0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!k0(i,e)&&(Hi(i,e)&&Hi(e,i)&&W0(i,e)&&(at(i.prev,i,e.prev)||at(i,e.prev,e))||Br(i,e)&&at(i.prev,i,i.next)>0&&at(e.prev,e,e.next)>0)}function at(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Br(i,e){return i.x===e.x&&i.y===e.y}function Fl(i,e,t,n){const r=wr(at(i,e,t)),s=wr(at(i,e,n)),o=wr(at(t,n,i)),a=wr(at(t,n,e));return!!(r!==s&&o!==a||r===0&&br(i,t,e)||s===0&&br(i,n,e)||o===0&&br(t,i,n)||a===0&&br(t,e,n))}function br(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function wr(i){return i>0?1:i<0?-1:0}function k0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Fl(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Hi(i,e){return at(i.prev,i,i.next)<0?at(i,e,i.next)>=0&&at(i,i.prev,e)>=0:at(i,e,i.prev)<0||at(i,i.next,e)<0}function W0(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ol(i,e){const t=new Gs(i.i,i.x,i.y),n=new Gs(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function qo(i,e,t,n){const r=new Gs(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function ki(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Gs(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function q0(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class Ni{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Ni.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];Xo(e),Yo(n,e);let o=e.length;t.forEach(Xo);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,Yo(n,t[l]);const a=R0.triangulate(n,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Xo(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Yo(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class li extends js{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new li(e.radius,e.detail)}}class Qs extends et{constructor(e=.5,t=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);const a=[],l=[],c=[],u=[];let h=e;const f=(t-e)/r,d=new R,g=new ce;for(let v=0;v<=r;v++){for(let m=0;m<=n;m++){const p=s+m/n*o;d.x=h*Math.cos(p),d.y=h*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,u.push(g.x,g.y)}h+=f}for(let v=0;v<r;v++){const m=v*(n+1);for(let p=0;p<n;p++){const _=p+m,x=_,S=_+n+1,C=_+n+2,T=_+1;a.push(x,S,T),a.push(S,C,T)}}this.setIndex(a),this.setAttribute("position",new Fe(l,3)),this.setAttribute("normal",new Fe(c,3)),this.setAttribute("uv",new Fe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Dr extends et{constructor(e=new zs([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Fe(r,3)),this.setAttribute("normal",new Fe(s,3)),this.setAttribute("uv",new Fe(o,2));function c(u){const h=r.length/3,f=u.extractPoints(t);let d=f.shape;const g=f.holes;Ni.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const _=g[m];Ni.isClockWise(_)===!0&&(g[m]=_.reverse())}const v=Ni.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const _=g[m];d=d.concat(_)}for(let m=0,p=d.length;m<p;m++){const _=d[m];r.push(_.x,_.y,0),s.push(0,0,1),o.push(_.x,_.y)}for(let m=0,p=v.length;m<p;m++){const _=v[m],x=_[0]+h,S=_[1]+h,C=_[2]+h;n.push(x,S,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return X0(t,e)}static fromJSON(e,t){const n=[];for(let r=0,s=e.shapes.length;r<s;r++){const o=t[e.shapes[r]];n.push(o)}return new Dr(n,e.curveSegments)}}function X0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}class ci extends et{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new R,f=new R,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const _=[],x=p/n;let S=0;p===0&&o===0?S=.5/t:p===n&&l===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){const T=C/t;h.x=-e*Math.cos(r+T*s)*Math.sin(o+x*a),h.y=e*Math.cos(o+x*a),h.z=e*Math.sin(r+T*s)*Math.sin(o+x*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(T+S,1-x),_.push(c++)}u.push(_)}for(let p=0;p<n;p++)for(let _=0;_<t;_++){const x=u[p][_+1],S=u[p][_],C=u[p+1][_],T=u[p+1][_+1];(p!==0||o>0)&&d.push(x,S,T),(p!==n-1||l<Math.PI)&&d.push(S,C,T)}this.setIndex(d),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(v,3)),this.setAttribute("uv",new Fe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ur extends et{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new R,h=new R,f=new R;for(let d=0;d<=n;d++)for(let g=0;g<=r;g++){const v=g/r*s,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(v),h.y=(e+t*Math.cos(m))*Math.sin(v),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=r;g++){const v=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,p=(r+1)*(d-1)+g,_=(r+1)*d+g;o.push(v,m,_),o.push(m,p,_)}this.setIndex(o),this.setAttribute("position",new Fe(a,3)),this.setAttribute("normal",new Fe(l,3)),this.setAttribute("uv",new Fe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}const Zo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Y0{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],g=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const Z0=new Y0;class ea{constructor(e){this.manager=e!==void 0?e:Z0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ea.DEFAULT_MATERIAL_NAME="__DEFAULT";class zl extends ea{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Zo.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Gi("img");function l(){u(),Zo.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class J0 extends ea{constructor(e){super(e)}load(e,t,n,r){const s=new Tt,o=new zl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class ta extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Es=new tt,Jo=new R,$o=new R;class Bl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xs,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Jo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jo),$o.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($o),t.updateMatrixWorld(),Es.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Es),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Es)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ko=new tt,Ri=new R,Ts=new R;class $0 extends Bl{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ce(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ri.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ri),Ts.copy(n.position),Ts.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ts),n.updateMatrixWorld(),r.makeTranslation(-Ri.x,-Ri.y,-Ri.z),Ko.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ko)}}class K0 extends ta{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new $0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class j0 extends Bl{constructor(){super(new bl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Q0 extends ta{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new j0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class em extends ta{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vs}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vs);const As={1:[[2282478,8490232],[3462041,366185],[16494871,14753096],[16020150,9133302],[6334975,11032055],[16436245,15381256],[4906624,959977],[9741240,4674921],[16281969,10033947],[12616956,4988309],[3718648,223649],[16486972,12730636],[10741301,5078031],[15235577,8788367]],2:[[1357990,1013358],[6514417,4405450],[16007006,12456508],[11032055,8266446],[8702998,5078031],[959977,223649],[16096779,11817737],[1096065,292951],[15485081,12458077],[9133302,7153881],[15381256,10576391],[440020,561586]],3:[[3900150,1981066],[1096065,413243],[9133302,4988309],[16347926,8138002],[440020,1461859],[14239471,7346805],[15381256,7421714],[1357990,1265226],[16007006,8917815],[6514417,3223169]],4:[[16777215,0],[2282478,1973067],[16020150,4850766],[16569165,4528643],[7268279,142370],[9684477,1516884],[16557477,4524554],[12891645,3018853]],5:[[16766720,12092939],[16738740,13047173],[65535,35723],[8190976,2263842],[16753920,16729344],[12211667,4915330],[64154,3050327],[16716947,9109504],[2003199,139],[16775885,9142272]],6:[[65280,13056],[65535,51],[16711935,3342387],[13434624,3355392],[65484,13107],[16724838,3342336],[3394815,4403],[13369599,1114163],[6750003,1127168],[16763904,3346688]],7:[[16777215,16766720],[16729344,9109504],[65535,255],[16716947,4915330],[8388352,25600],[16711935,9055202],[2003199,1644912],[16737095,8388608],[64154,32896],[16775885,16747520]],8:[[16737095,4620980],[16766720,9055202],[64154,16716947],[16729344,3050327],[65535,13458524],[16711935,8087790],[3329330,16747520],[52945,9109504],[16758465,205],[11403055,4915330]],9:[[9109504,0],[3100495,16747520],[1644912,16777215],[4915330,3329330],[5597999,16711935],[8388608,65535],[128,16766720],[3050327,16716947],[4734347,16729344],[9127187,64154]],10:[[65280,16711935],[65535,16729344],[16766720,255],[16716947,3329330],[8388352,9055202],[16747520,52945],[64154,16711680],[2003199,16758465],[16711935,65280],[16776960,9109504]],11:[[16753920,9109504],[65535,139],[16716947,4915330],[3329330,25600],[16766720,3100495],[16711935,1644912],[64154,32896],[16729344,9127187],[2003199,0],[16776960,12092939]],12:[[65280,0],[16711935,0],[65535,0],[16776960,0],[16711680,0],[255,0],[16753920,0],[2003199,0],[3329330,0],[16716947,0]],13:[[15132410,4915330],[16758465,9109504],[14745599,32896],[16775885,9127187],[14524637,4734347],[10025880,3050327],[8900346,1644912],[16767673,13789470],[15761536,8388608],[2142890,139]],14:[[16766720,0],[65535,128],[16711935,4915330],[65280,25600],[16729344,9109504],[2003199,1644912],[16716947,8388736],[8388352,3050327],[64154,32896],[16753920,9127187]],15:[[16711935,65535],[16716947,2003199],[16753920,8388736],[65280,16711935],[16776960,16729344],[65535,4915330],[16738740,52945],[8388352,16716947],[64154,16747520],[2003199,16711680]],16:[[12632256,0],[8421504,65280],[11119017,65535],[6908265,16711935],[7833753,16753920],[7372944,16716947],[3100495,3329330],[0,16711680],[14474460,255],[13882323,9109504]],17:[[16711935,65535],[16716947,1644912],[65280,25600],[16753920,9109504],[65535,128],[16711680,9127187],[3329330,3050327],[2003199,4915330],[16776960,13789470],[16738740,8388736]],18:[[16711935,65535],[16716947,16766720],[16711680,9109504],[64154,205],[9699539,3329330],[49151,16711935],[16777215,8900346],[4915330,16738740],[16729344,16776960],[1644912,11403055]],19:[[11032055,3900150],[15485081,6514417],[1357990,959977],[16007006,9133302],[15381256,1096065],[440020,3900150]],20:[[16007006,12456508],[3900150,1981066],[1096065,413243],[9133302,4988309],[16347926,8138002],[15381256,7421714]],21:[[65535,16711935],[3900150,1981066],[16766720,12092939],[16729344,9109504],[15485081,9133302],[440020,1920728]],22:[[65535,16711935],[3900150,1981066],[16766720,12092939],[16729344,9109504],[15485081,9133302],[440020,1920728],[16766720,1710618],[58879,51],[16711935,16747520],[65407,8704],[12632256,9109504],[14745599,205],[16776960,16729344],[9699539,16716947]]},tm=`
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    // Bypass camera matrices to draw a perfect full-screen quad behind other elements
    gl_Position = vec4(position.xy, 0.99, 1.0);
}
`,nm=i=>i===1?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        vec2 rotate(vec2 p, float a) {
            float c = cos(a), s = sin(a);
            return mat2(c, -s, s, c) * p;
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            p = rotate(p, uTime * 0.1);
            
            // Determine symmetry folds based on variation (3 to 16 folds)
            float sym = mod(floor(uVariation), 14.0);
            float folds = 3.0 + sym; 
            
            float a = atan(p.y, p.x);
            float r = length(p);
            
            // Apply symmetry folding
            float segment = 3.14159265359 * 2.0 / folds;
            a = mod(a, segment) - segment / 2.0;
            p = vec2(cos(a), sin(a)) * r;
            
            float fractal = 0.0;
            vec2 uv2 = p;
            for(int i=0; i<6; i++) {
                uv2 = abs(uv2) / dot(uv2,uv2) - (0.4 + sin(uTime * 0.2 + sym) * 0.1);
                uv2 = rotate(uv2, uTime * 0.05 + sym * 0.1);
                fractal += exp(-length(uv2) * (1.5 + sym * 0.1));
            }
            
            vec3 col = mix(uColor1, uColor2, fractal * uIntensity);
            
            // Unrotated vignette
            vec2 up = (vUv - 0.5) * 2.0;
            up.x *= uAspect;
            col *= smoothstep(1.2, 0.1, length(up)); 
            
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===2?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            // Derive n and m from variation for diverse chladni resonances
            float n = 1.0 + mod(var, 5.0);
            float m = 2.0 + floor(var / 3.0) + mod(var, 4.0);
            
            float t = uTime * 0.5 * intMod;
            
            // True Chladni plate equation mapping
            float chladni = sin(n * 3.1415 * p.x) * sin(m * 3.1415 * p.y) 
                          - sin(m * 3.1415 * p.x) * sin(n * 3.1415 * p.y) * cos(t);
                          
            // Circular boundary resonance
            float r = length(p);
            float circ = cos(r * (10.0 + var*2.0) - t * 2.0) * sin(var + r * 5.0);
            
            // Combine with dynamic shifting
            float resonance = mix(chladni, circ, 0.5 + 0.5*sin(t*0.2 + var));
            resonance = smoothstep(0.0, 0.05 + 0.05 * sin(t), abs(resonance));
            
            // Particles representation (nodes)
            float particles = pow(1.0 - resonance, 8.0) * pow(intMod, 1.5) * 1.5;
            
            // Grid noise for sand effect
            float sand = fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            particles *= (0.5 + 0.5 * sand);
            
            vec3 col = mix(uColor1, uColor2, length(p) + chladni * 0.2) * particles;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===3?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;

        // Fluid-like SDF noise
        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix( mix( hash( i + vec2(0.0,0.0) ), hash( i + vec2(1.0,0.0) ), u.x),
                        mix( hash( i + vec2(0.0,1.0) ), hash( i + vec2(1.0,1.0) ), u.x), u.y);
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.2 * intMod;
            
            // Domain warping (FBM approach)
            vec2 q = vec2(noise(p * (2.0+var*0.5) + t), noise(p * (2.0+var*0.5) - t));
            vec2 r = vec2(noise(p + q * (1.0+var*0.2) + t*1.5), noise(p + q * (1.0+var*0.2) - t*1.5));
            
            float f = noise(p * (3.0+var*0.5) + r * 2.0);
            
            // Create fluid layers
            float fluid = smoothstep(0.1, 0.9, f);
            
            // Add some high-frequency ripples based on variation
            float ripples = sin(f * (20.0 + var * 5.0) - uTime * 5.0) * 0.5 + 0.5;
            fluid = mix(fluid, ripples, 0.3 + 0.1 * sin(t));
            
            vec3 col = mix(uColor1, uColor2, fluid) * pow(intMod, 1.5) * 1.5;
            
            // Vignette
            vec2 up = (vUv - 0.5) * 2.0;
            up.x *= uAspect;
            col *= smoothstep(1.5, 0.2, length(up));
            
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===4?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.5 * intMod;
            
            // Möbius-like complex math inversion z -> 1/z
            float r2 = dot(p, p);
            if (var > 3.0) {
                p = p / (r2 + 0.1); 
            }
            if (mod(var, 2.0) == 0.0) {
                p = vec2(p.x * cos(t) - p.y * sin(t), p.x * sin(t) + p.y * cos(t)); // slow spin
            }
            
            // Fold space non-euclidean style
            for(int i=0; i<4; i++) {
                p = abs(p) / dot(p,p) - vec2(0.5 + sin(t*0.2 + var)*0.2);
            }
            
            float d = length(p);
            
            // Quantum Topology peaks
            float q = sin(d * (10.0 + var * 2.0) - t * 5.0) * cos(p.x * p.y * (10.0 + var));
            q = smoothstep(0.8, 1.0, abs(q));
            
            vec3 col = mix(uColor1, uColor2, d) * q * pow(intMod, 1.5) * 1.5;
            
            // Ambient topological glow
            vec2 up = (vUv - 0.5) * 2.0;
            up.x *= uAspect;
            vec3 glow = uColor2 * (1.0 - smoothstep(0.0, 1.0, length(up))) * 0.3;
            
            gl_FragColor = vec4(col + glow + (1.0-q)*0.1*uColor1, 1.0);
        }
        `:i===5?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;

        vec2 rotate(vec2 p, float a) {
            float c = cos(a), s = sin(a);
            return mat2(c, -s, s, c) * p;
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.3 * intMod;
            
            p = rotate(p, t * 0.1 * (mod(var, 2.0) == 0.0 ? 1.0 : -1.0));
            
            // Sacred Geometry: Overlapping circles / Flower of Life
            float d = length(p);
            float rings = 0.0;
            
            // Create a central cluster
            float nodes = 6.0 + mod(var, 4.0) * 2.0; // 6, 8, 10, 12 symmetry
            
            for(int i=0; i<12; i++) {
                float fi = float(i);
                if (fi >= nodes) break;
                float angle = fi * 6.28318 / nodes + t * 0.5;
                vec2 offset = vec2(cos(angle), sin(angle)) * (0.3 + var * 0.02);
                float dist = length(p - offset);
                // sharp concentric rings
                rings += smoothstep(0.02, 0.01, abs(fract(dist * (5.0 + var) - t) - 0.5));
            }
            
            // Add central mandala
            rings += smoothstep(0.05, 0.02, abs(fract(d * 10.0 - t*2.0) - 0.5)) * 0.5;
            
            rings = clamp(rings, 0.0, 1.0);
            
            vec3 col = mix(uColor2, uColor1, rings) * (rings + 0.2) * pow(intMod, 1.5) * 1.5;
            
            // Vignette
            col *= smoothstep(1.5, 0.2, length((vUv - 0.5) * 2.0));
            
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===6?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;

        // Simple hash for Voronoi
        vec2 hash2(vec2 p) {
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return fract(sin(p) * 43758.5453);
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.5 * intMod;
            
            // Voronoi Neural Web
            vec2 uv = p * (3.0 + var * 0.5);
            vec2 i_uv = floor(uv);
            vec2 f_uv = fract(uv);
            
            float minDist = 1.0;
            float minDist2 = 1.0; // second closest for web lines
            
            for(int y=-1; y<=1; y++) {
                for(int x=-1; x<=1; x++) {
                    vec2 neighbor = vec2(float(x), float(y));
                    vec2 point = hash2(i_uv + neighbor);
                    point = 0.5 + 0.5 * sin(t + 6.2831 * point + var);
                    
                    vec2 diff = neighbor + point - f_uv;
                    float dist = length(diff);
                    
                    if(dist < minDist) {
                        minDist2 = minDist;
                        minDist = dist;
                    } else if(dist < minDist2) {
                        minDist2 = dist;
                    }
                }
            }
            
            // Create cellular borders (neurons)
            float edge = minDist2 - minDist;
            float neural = smoothstep(0.05, 0.0, edge) + smoothstep(0.1, 0.0, minDist);
            
            // Add bioluminescent glow
            vec3 col = mix(uColor2, uColor1, neural) * (neural + 0.3) * pow(intMod, 1.5) * 1.5;
            
            col *= smoothstep(1.5, 0.3, length((vUv - 0.5) * 2.0));
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===8?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float noise(vec2 p) {
            vec2 i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),
                       mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * 0.5 * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            // Absolutely unique asymmetrical math for each
            if (var == 0) {
                // Nebula Sweep
                vec2 q = p + vec2(noise(p*2.0 + t), noise(p*2.0 - t));
                f = noise(q * 5.0 - vec2(t*2.0, t)) * smoothstep(1.5, 0.0, length(p - vec2(-0.5, 0.0)));
            } else if (var == 1) {
                // Vortex Pull
                vec2 c = vec2(0.5, 0.5);
                float a = atan(p.y-c.y, p.x-c.x);
                float d = length(p-c);
                f = sin(10.0*d - a*3.0 - t*5.0) * exp(-d*2.0);
            } else if (var == 2) {
                // Liquid Splatter
                vec2 sp = p * 3.0;
                sp += vec2(sin(t+sp.y), cos(t+sp.x)) * 0.5;
                f = smoothstep(0.4, 0.3, noise(sp*3.0) + length(p));
            } else if (var == 3) {
                // Solar Flare
                float ang = atan(p.y, p.x);
                f = noise(vec2(ang*4.0, length(p)*5.0 - t*3.0)) * exp(-length(p+vec2(0.0,0.5))*2.0);
            } else if (var == 4) {
                // Wind Ribbon
                float wave = sin(p.x*5.0 + t) * cos(p.x*3.0 - t*0.5) * 0.5;
                f = smoothstep(0.1, 0.0, abs(p.y - wave + p.x*0.2));
            } else if (var == 5) {
                // Core Breach
                vec2 offset = vec2(noise(vec2(t)), noise(vec2(t*1.1)))*0.5 - 0.25;
                f = 0.05 / (length(p - offset) + 0.01) * noise(p*10.0);
            } else if (var == 6) {
                // Aurora Veil
                vec2 q = p;
                q.x += sin(q.y*3.0 + t)*0.5;
                f = noise(q*vec2(10.0, 1.0) - vec2(t, 0.0)) * smoothstep(1.0, 0.0, abs(q.x));
            } else if (var == 7) {
                // Magnetic Anomaly
                float d1 = length(p - vec2(-0.5, 0.0));
                float d2 = length(p - vec2(0.5, 0.5));
                f = sin(d1*20.0 - t) * cos(d2*15.0 + t);
            } else if (var == 8) {
                // Tectonic Shift
                vec2 q = p;
                if (q.x > q.y) q += vec2(t*0.1, -t*0.1);
                f = smoothstep(0.02, 0.0, abs(q.x - q.y + noise(q*5.0)*0.2));
            } else {
                // Dimensional Tear
                float tear = noise(vec2(p.y*5.0, t));
                f = smoothstep(0.1, 0.0, abs(p.x + tear*0.5 - 0.25)) * noise(p*20.0);
            }
            
            vec3 col = mix(uColor1, uColor2, abs(f)) * abs(f) * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===9?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float sdBox(vec2 p, vec2 b) { vec2 d = abs(p)-b; return length(max(d,0.0)) + min(max(d.x,d.y),0.0); }
        float sdHexagon(vec2 p, float r) { const vec3 k = vec3(-0.866025404,0.5,0.577350269); p = abs(p); p -= 2.0*min(dot(k.xy,p),0.0)*k.xy; p -= vec2(clamp(p.x, -k.z*r, k.z*r), r); return length(p)*sign(p.y); }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            // Absolutely unique thick brutalist math
            if (var == 0) {
                // Interlocking Blocks
                float b1 = sdBox(p + vec2(sin(t)*0.2, 0.0), vec2(0.4, 0.4));
                float b2 = sdBox(p - vec2(sin(t)*0.2, 0.0), vec2(0.4, 0.4));
                f = smoothstep(0.02, 0.0, abs(max(b1, -b2)));
            } else if (var == 1) {
                // Massive Hexagon Ring
                float h = sdHexagon(p, 0.6 + sin(t)*0.1);
                f = smoothstep(0.1, 0.05, abs(h));
            } else if (var == 2) {
                // Cross Beams
                float v = sdBox(p, vec2(0.15, 1.0));
                float h = sdBox(p, vec2(1.0, 0.15));
                f = smoothstep(0.02, 0.0, min(v, h) + sin(p.x*20.0+t)*0.02);
            } else if (var == 3) {
                // Brutalist Pillars
                vec2 q = fract(p * 2.0) - 0.5;
                f = smoothstep(0.05, 0.0, sdBox(q, vec2(0.3, 0.8)));
            } else if (var == 4) {
                // Heavy Monolith
                float m = sdBox(p, vec2(0.5, 0.7));
                f = smoothstep(0.01, 0.0, m) * (0.5 + 0.5*sin(p.y*50.0 - t*5.0));
            } else if (var == 5) {
                // Tech Cutouts
                float b = sdBox(p, vec2(0.6));
                float c = length(p) - 0.4;
                f = smoothstep(0.02, 0.0, max(b, -c));
            } else if (var == 6) {
                // Thick Waves
                float w = sin(p.x*5.0 + t) * 0.3;
                f = smoothstep(0.15, 0.1, abs(p.y - w));
            } else if (var == 7) {
                // Geometric Maze
                vec2 q = fract(p * 3.0 + t*0.2) - 0.5;
                f = smoothstep(0.05, 0.0, abs(sdBox(q, vec2(0.4))) - 0.1);
            } else if (var == 8) {
                // Massive Orbit
                float r = length(p);
                f = smoothstep(0.2, 0.15, abs(r - 0.6 + sin(atan(p.y, p.x)*4.0 + t)*0.1));
            } else {
                // Concrete Gears
                float a = atan(p.y, p.x);
                float r = length(p);
                float gear = 0.5 + 0.1*sin(a*8.0 - t);
                f = smoothstep(0.02, 0.0, abs(r - gear) - 0.1);
            }
            
            vec3 col = mix(uColor1, uColor2, length(p)) * f * pow(intMod, 1.5) * 1.5;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===10?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
            int var = int(floor(uVariation));
            
            // Pixel Swarm resolution
            float res = 60.0;
            vec2 pixelUv = floor(p * res) / res;
            
            float h = hash(pixelUv);
            // Twinkling effect
            float twink = 0.5 + 0.5 * sin(h * 100.0 + t * 5.0);
            
            float f = 0.0;
            
            // Absolutely unique pixel shapes
            if (var == 0) {
                // Pixel Galaxy Spiral
                float a = atan(pixelUv.y, pixelUv.x);
                float r = length(pixelUv);
                f = sin(r*20.0 - a*3.0 - t*2.0);
            } else if (var == 1) {
                // Pixel Bio-Cell
                float c1 = length(pixelUv - vec2(sin(t)*0.3, cos(t)*0.3));
                float c2 = length(pixelUv + vec2(sin(t)*0.3, cos(t)*0.3));
                f = smoothstep(0.5, 0.4, c1) + smoothstep(0.5, 0.4, c2);
            } else if (var == 2) {
                // Pixel Magnetic Field
                f = sin(pixelUv.x * 20.0 + t) * cos(pixelUv.y * 20.0 - t);
            } else if (var == 3) {
                // Pixel Black Hole
                float r = length(pixelUv);
                f = 0.1 / (r + 0.01) * sin(r*50.0 - t*10.0);
            } else if (var == 4) {
                // Pixel Matrix Rain
                f = sin(pixelUv.y * 30.0 + t*10.0 + hash(vec2(pixelUv.x))*100.0);
            } else if (var == 5) {
                // Pixel Shockwave
                float r = length(pixelUv);
                f = smoothstep(0.1, 0.0, abs(r - fract(t*0.5)));
            } else if (var == 6) {
                // Pixel DNA Double Helix
                float s = sin(pixelUv.y * 10.0 + t);
                float c = cos(pixelUv.y * 10.0 + t);
                f = smoothstep(0.1, 0.0, abs(pixelUv.x - s*0.3)) + smoothstep(0.1, 0.0, abs(pixelUv.x - c*0.3));
            } else if (var == 7) {
                // Pixel Quantum Foam
                f = hash(pixelUv + floor(t*5.0));
            } else if (var == 8) {
                // Pixel Target
                float r = length(pixelUv);
                f = sin(r * 50.0 - t*5.0);
            } else {
                // Pixel Explosion
                float a = atan(pixelUv.y, pixelUv.x);
                f = hash(vec2(a)) * smoothstep(1.0, 0.0, length(pixelUv) + t);
            }
            
            f = smoothstep(0.5, 1.0, f) * twink;
            
            // Only draw discrete pixels, hide background
            if (f < 0.1) discard;
            
            vec3 col = mix(uColor1, uColor2, h) * f * uIntensity * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===11?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float manhattan(vec2 p) { return abs(p.x) + abs(p.y); }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            if (var == 0) {
                // Diamond Matrix
                vec2 q = fract(p * 5.0) - 0.5;
                f = smoothstep(0.05, 0.02, abs(manhattan(q) - 0.3));
            } else if (var == 1) {
                // Cyber Maze
                vec2 q = p * 4.0;
                vec2 i = floor(q); vec2 fr = fract(q);
                float h = hash(i);
                if (h > 0.5) f = smoothstep(0.05, 0.0, abs(fr.x - fr.y));
                else f = smoothstep(0.05, 0.0, abs(fr.x + fr.y - 1.0));
                f *= sin(t + length(i));
            } else if (var == 2) {
                // Radial Runes
                float a = atan(p.y, p.x);
                float r = length(p);
                float stepA = floor(a * 10.0) / 10.0;
                float rune = hash(vec2(stepA, floor(r * 5.0 - t)));
                f = (rune > 0.6) ? smoothstep(0.05, 0.0, abs(fract(r * 5.0 - t) - 0.5)) : 0.0;
            } else if (var == 3) {
                // Geometric Stepping
                vec2 q = floor(p * 8.0) / 8.0;
                f = smoothstep(0.05, 0.0, abs(manhattan(p) - length(q) - sin(t)*0.2));
            } else if (var == 4) {
                // Alien Circuit
                vec2 q = p * vec2(8.0, 4.0);
                vec2 fq = fract(q) - 0.5;
                f = smoothstep(0.05, 0.0, min(abs(fq.x), abs(fq.y)));
                f *= hash(floor(q)) > 0.5 ? 1.0 : 0.0;
            } else if (var == 5) {
                // Chevron Sigils
                float y = p.y + abs(p.x)*2.0;
                f = smoothstep(0.05, 0.0, abs(fract(y*4.0 - t) - 0.5));
            } else if (var == 6) {
                // Techno Rings
                float r = max(abs(p.x), abs(p.y));
                float rStep = floor(r * 10.0);
                f = (hash(vec2(rStep)) > 0.3) ? smoothstep(0.05, 0.0, abs(fract(r * 10.0 - t) - 0.5)) : 0.0;
            } else if (var == 7) {
                // Glyph Cluster
                vec2 q = fract(p * 3.0) - 0.5;
                float d = manhattan(q);
                f = smoothstep(0.02, 0.0, abs(d - 0.3)) + smoothstep(0.02, 0.0, abs(d - 0.15));
            } else if (var == 8) {
                // Diagonal Tech Lines
                float d = p.x + p.y;
                f = smoothstep(0.05, 0.0, abs(fract(d * 10.0 + t) - 0.5)) * sign(sin(p.x*20.0));
            } else {
                // Core Sigil
                float d = manhattan(p);
                f = smoothstep(0.02, 0.0, abs(d - 0.5)) + smoothstep(0.02, 0.0, abs(d - 0.4 + sin(t*5.0)*0.05));
                float a = atan(p.y, p.x);
                f *= sin(a*8.0);
            }
            
            vec3 col = mix(uColor1, uColor2, abs(p.x)) * abs(f) * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===12?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        

        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            float lw = 0.03; // Line width
            
            if (var == 0) {
                // 3D Perspective Grid
                vec2 q = vec2(p.x / (abs(p.y) + 0.1), 1.0 / (abs(p.y) + 0.1) - t);
                f = smoothstep(lw, 0.0, abs(fract(q.x) - 0.5)) + smoothstep(lw, 0.0, abs(fract(q.y) - 0.5));
                f *= p.y < 0.0 ? 1.0 : 0.0; // Only bottom half
            } else if (var == 1) {
                // Spherical Grid
                float r = length(p);
                vec2 uvSphere = p / sqrt(1.0 - r*r);
                if(r < 1.0) {
                    f = smoothstep(lw, 0.0, abs(fract(uvSphere.x * 5.0 + t) - 0.5)) + 
                        smoothstep(lw, 0.0, abs(fract(uvSphere.y * 5.0) - 0.5));
                }
            } else if (var == 2) {
                // Torus Illusion
                float r = length(p);
                float a = atan(p.y, p.x);
                float dist = abs(r - 0.5);
                f = smoothstep(lw, 0.0, abs(fract(dist * 10.0) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(a * 5.0 / 3.1415 + t) - 0.5));
            } else if (var == 3) {
                // Wavy Retro Grid
                vec2 q = p;
                q.y += sin(q.x * 5.0 + t) * 0.2;
                f = smoothstep(lw, 0.0, abs(fract(q.x * 10.0) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y * 10.0) - 0.5));
            } else if (var == 4) {
                // Polar Grid
                float r = length(p);
                float a = atan(p.y, p.x);
                f = smoothstep(lw, 0.0, abs(fract(r * 10.0 - t) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(a * 4.0 / 3.1415) - 0.5));
            } else if (var == 5) {
                // Hyperspace Tunnel
                float r = length(p);
                float a = atan(p.y, p.x);
                vec2 q = vec2(a / 3.1415, 0.1 / r - t);
                f = smoothstep(lw, 0.0, abs(fract(q.x * 10.0) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y * 5.0) - 0.5));
            } else if (var == 6) {
                // Isometric Cubes
                vec2 q = vec2(p.x + p.y*0.5, p.x - p.y*0.5) * 5.0;
                f = smoothstep(lw, 0.0, abs(fract(q.x + t) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y - t) - 0.5));
            } else if (var == 7) {
                // Spiral Web
                float r = length(p);
                float a = atan(p.y, p.x);
                f = smoothstep(lw, 0.0, abs(fract(r * 10.0 - a - t) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(r * 10.0 + a + t) - 0.5));
            } else if (var == 8) {
                // Folding Plane
                vec2 q = p;
                q.x = abs(q.x);
                q.y += q.x * 0.5;
                f = smoothstep(lw, 0.0, abs(fract(q.x * 8.0 - t) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y * 8.0) - 0.5));
            } else {
                // Magnetic Field Grid
                vec2 q = p;
                float d = length(q - vec2(sin(t)*0.5, 0.0));
                f = smoothstep(lw, 0.0, abs(fract(q.x * 10.0 + d) - 0.5)) + 
                    smoothstep(lw, 0.0, abs(fract(q.y * 10.0 + d) - 0.5));
            }
            
            f = clamp(f, 0.0, 1.0);
            vec3 col = mix(uColor1, uColor2, length(p)) * f * uIntensity * 1.2;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===13?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float noise(vec2 p) {
            vec2 i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),
                       mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
        }
        float fbm(vec2 p) {
            float f = 0.0; float w = 0.5;
            for(int i=0; i<5; i++) { f += w * noise(p); p *= 2.0; w *= 0.5; }
            return f;
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * 0.2 * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            if (var == 0) {
                // Ghost Nebula
                vec2 q = p;
                q.x += fbm(p*2.0 + t);
                f = fbm(q*3.0 - t);
            } else if (var == 1) {
                // Whispering Smoke
                float n = fbm(p*4.0 - vec2(0.0, t*2.0));
                f = smoothstep(0.2, 0.8, n) * exp(-length(p)*2.0);
            } else if (var == 2) {
                // Plasma Core
                vec2 q = p;
                q += vec2(sin(t), cos(t)) * 0.2;
                f = 0.1 / (abs(length(q) - fbm(p*5.0 + t)*0.5) + 0.05);
            } else if (var == 3) {
                // Deep Ink Cloud
                f = fbm(p*3.0 + fbm(p*2.0 - t));
            } else if (var == 4) {
                // Bioluminescent Plankton
                f = fbm(p*10.0 + t) * fbm(p*2.0 - t*0.5);
                f = pow(f, 3.0) * 10.0;
            } else if (var == 5) {
                // Spirit Vortex
                float a = atan(p.y, p.x);
                float r = length(p);
                f = fbm(vec2(a*2.0 + t, r*4.0 - t));
                f *= exp(-r*r*4.0);
            } else if (var == 6) {
                // Sheer Fabric
                float w = sin(p.x*3.0 + t) + cos(p.y*2.0 - t);
                f = fbm(p*2.0 + w);
            } else if (var == 7) {
                // Astral Projection
                f = fbm(p*4.0 + vec2(fbm(p*3.0+t), fbm(p*3.0-t)));
            } else if (var == 8) {
                // Phantom Ring
                float r = length(p);
                f = fbm(p*5.0) * exp(-pow(r - 0.5, 2.0)*10.0);
            } else {
                // Aether Drift
                vec2 dir = vec2(1.0, 0.5);
                f = fbm(p*3.0 - dir*t) * fbm(p*5.0 + dir*t*0.5);
            }
            
            f = clamp(f, 0.0, 1.0);
            vec3 col = mix(uColor1, uColor2, fbm(p+t)) * f * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===14?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        #define PI 3.14159265359
        
        vec2 rotate(vec2 p, float a) {
            float s = sin(a), c = cos(a);
            return vec2(p.x*c - p.y*s, p.x*s + p.y*c);
        }


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * 0.5 * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            float r = length(p);
            float a = atan(p.y, p.x);
            
            if (var == 0) {
                // Kaleidoscopic Star
                float segments = 8.0;
                float ma = mod(a, PI * 2.0 / segments);
                ma = abs(ma - PI / segments);
                vec2 q = r * vec2(cos(ma), sin(ma));
                f = smoothstep(0.02, 0.0, abs(q.x + q.y*2.0 - 0.5 + sin(t)*0.1));
                f += smoothstep(0.02, 0.0, abs(q.x - 0.3));
            } else if (var == 1) {
                // Lotus Unfolding
                float petals = 12.0;
                float d = r - 0.5 + sin(a * petals + t)*0.1 * sin(r*10.0 - t*2.0);
                f = smoothstep(0.02, 0.0, abs(d));
            } else if (var == 2) {
                // Geometric Seed
                for(int i=0; i<6; i++) {
                    vec2 center = vec2(cos(float(i)*PI/3.0), sin(float(i)*PI/3.0)) * 0.3 * sin(t);
                    f += smoothstep(0.02, 0.0, abs(length(p - center) - 0.3));
                }
            } else if (var == 3) {
                // Shattered Hexagon
                p = rotate(p, t*0.2);
                float ma = mod(atan(p.y, p.x), PI/3.0) - PI/6.0;
                vec2 q = length(p) * vec2(cos(ma), sin(ma));
                f = smoothstep(0.02, 0.0, abs(q.x - 0.4 + sin(q.y*20.0)*0.05));
            } else if (var == 4) {
                // Trippy Eye
                float petals = 5.0;
                float w = sin(a * petals + t);
                f = smoothstep(0.02, 0.0, abs(r - 0.4 - w*0.1)) + smoothstep(0.02, 0.0, abs(r - 0.2 + w*0.1));
            } else if (var == 5) {
                // Overlapping Octagons
                for(int i=0; i<3; i++) {
                    vec2 q = rotate(p, float(i)*PI/4.0 + t*float(i)*0.1);
                    float d = max(abs(q.x), abs(q.y));
                    f += smoothstep(0.02, 0.0, abs(d - 0.3 - float(i)*0.1));
                }
            } else if (var == 6) {
                // Fractal Crown
                p = rotate(p, t*0.1);
                float segments = 6.0;
                float ma = abs(mod(atan(p.y, p.x), PI*2.0/segments) - PI/segments);
                vec2 q = length(p) * vec2(cos(ma), sin(ma));
                f = smoothstep(0.01, 0.0, abs(q.y - q.x*0.5)) + smoothstep(0.01, 0.0, abs(q.y - 0.1));
            } else if (var == 7) {
                // Mandala Rings
                f = smoothstep(0.02, 0.0, abs(r - 0.3 + sin(a*16.0)*0.05));
                f += smoothstep(0.02, 0.0, abs(r - 0.5 + cos(a*24.0)*0.02));
                f += smoothstep(0.02, 0.0, abs(r - 0.7 + sin(a*32.0)*0.01));
            } else if (var == 8) {
                // Spiky Fractal
                float ma = mod(a, PI/4.0) - PI/8.0;
                float d = r * cos(ma);
                f = smoothstep(0.02, 0.0, abs(d - 0.4 + r*sin(r*20.0 - t*5.0)*0.2));
            } else {
                // Ancient Compass
                f = smoothstep(0.01, 0.0, abs(r - 0.4));
                for(int i=0; i<4; i++) {
                    vec2 q = rotate(p, float(i)*PI/4.0);
                    f += smoothstep(0.01, 0.0, abs(q.x)) * smoothstep(1.0, 0.0, abs(q.y));
                }
            }
            
            f = clamp(f, 0.0, 1.0);
            vec3 col = mix(uColor1, uColor2, sin(r*10.0 - t)*0.5+0.5) * f * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===15?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        

        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * 2.0 * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            if (var == 0) {
                // Twin Ripple Moire
                float d1 = length(p - vec2(-0.2, 0.0));
                float d2 = length(p - vec2(0.2, 0.0));
                f = sin(d1 * 40.0 - t) + sin(d2 * 40.0 - t);
            } else if (var == 1) {
                // Magnetic Dipole
                float d1 = length(p - vec2(0.0, -0.3));
                float d2 = length(p - vec2(0.0, 0.3));
                f = sin((d1 - d2) * 20.0 - t);
            } else if (var == 2) {
                // Tri-Wave Interference
                f = sin(p.x * 20.0 + t) + sin((p.x*0.5 + p.y*0.866) * 20.0 - t) + sin((p.x*0.5 - p.y*0.866) * 20.0 + t);
            } else if (var == 3) {
                // Liquid Grid
                f = sin(p.x * 30.0 + sin(p.y*10.0 + t)*2.0) * sin(p.y * 30.0 + cos(p.x*10.0 - t)*2.0);
            } else if (var == 4) {
                // Concentric Beats
                float r = length(p);
                f = sin(r * 30.0 - t) * cos(r * 25.0 + t*0.5);
            } else if (var == 5) {
                // Vortex Interference
                float r = length(p);
                float a = atan(p.y, p.x);
                f = sin(r * 40.0 - a * 5.0 - t) + sin(r * 40.0 + a * 5.0 + t);
            } else if (var == 6) {
                // Standing Waves
                f = sin(p.x * 20.0) * cos(t) + sin(p.y * 20.0) * sin(t);
            } else if (var == 7) {
                // Quad Poles
                float d1 = length(p - vec2(0.3, 0.3));
                float d2 = length(p - vec2(-0.3, 0.3));
                float d3 = length(p - vec2(0.3, -0.3));
                float d4 = length(p - vec2(-0.3, -0.3));
                f = sin(d1*20.0-t) + sin(d2*20.0-t) - sin(d3*20.0+t) - sin(d4*20.0+t);
            } else if (var == 8) {
                // Soundwave Topology
                f = sin(length(p)*30.0 - t) + sin(p.x*20.0 + t);
            } else {
                // Chaotic Basin
                float r = length(p);
                float a = atan(p.y, p.x);
                f = sin(r * 30.0 + sin(a*4.0)*2.0 - t) * sin(r * 20.0 - cos(a*3.0)*2.0 + t);
            }
            
            // Map from [-2, 2] roughly to [0, 1] softly
            f = smoothstep(0.5, 1.5, abs(f));
            
            vec3 col = mix(uColor1, uColor2, length(p)) * f * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===16?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        

        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            float t = uTime * intMod;
            int var = int(floor(uVariation));
            float f = 0.0;
            
            float r = length(p);
            float a = atan(p.y, p.x);
            
            if (var == 0) {
                // Sunburst Bloom
                float petals = 12.0;
                float d = r - 0.3 - sin(a * petals)*0.2 * abs(sin(t));
                f = 0.02 / (abs(d) + 0.01);
            } else if (var == 1) {
                // Bio-Flower
                float w = sin(a * 6.0 + r * 10.0 - t*2.0);
                f = smoothstep(0.05, 0.0, abs(r - 0.4 - w*0.1));
            } else if (var == 2) {
                // Layered Peony
                for(int i=0; i<4; i++) {
                    float fi = float(i);
                    float d = r - 0.2 - fi*0.1 - sin(a * (5.0+fi) + t)*0.05;
                    f += smoothstep(0.02, 0.0, abs(d));
                }
            } else if (var == 3) {
                // Electric Orchid
                float petals = sin(a*3.0) * cos(a*7.0);
                float d = r - 0.4 - petals*0.2;
                f = 0.03 / (abs(d) + 0.01) * (1.0 - r);
            } else if (var == 4) {
                // Spiral Rose
                float d = r - a*0.1 + t*0.2;
                f = smoothstep(0.05, 0.0, abs(fract(d*3.0) - 0.5));
                f *= smoothstep(0.8, 0.0, r);
            } else if (var == 5) {
                // Crystal Lily
                float ma = abs(mod(a, 3.1415/3.0) - 3.1415/6.0);
                float d = r * cos(ma) - 0.3 - sin(r*20.0 - t)*0.05;
                f = smoothstep(0.02, 0.0, abs(d));
            } else if (var == 6) {
                // Pulsing Anemone
                float w = sin(a * 20.0 + sin(r*10.0 - t*5.0));
                f = smoothstep(0.05, 0.0, abs(r - 0.4 - w*0.05));
            } else if (var == 7) {
                // Quantum Dahlia
                float petals = abs(sin(a * 8.0));
                f = 0.02 / (abs(r - petals*0.5 - 0.1) + 0.01);
            } else if (var == 8) {
                // Droplet Petals
                vec2 q = p;
                q.y += sin(q.x*10.0 + t)*0.1;
                float d = length(q) - 0.4 + sin(atan(q.y, q.x)*4.0)*0.1;
                f = smoothstep(0.02, 0.0, abs(d));
            } else {
                // Galactic Bloom
                float a2 = a + r*2.0 - t;
                float d = r - 0.4 - sin(a2*5.0)*0.1;
                f = smoothstep(0.05, 0.0, abs(d));
            }
            
            vec3 col = mix(uColor1, uColor2, r*2.0) * f * pow(intMod, 1.5) * 2.0;
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===17?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uSpeed;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        #define MAX_STEPS 45
        #define MAX_DIST 10.0
        #define SURF_DIST 0.01

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        // Polynomial smooth min
        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }

        float sdSphere(vec3 p, float s) {
            return length(p) - s;
        }

        float sdBox(vec3 p, vec3 b) {
            vec3 q = abs(p) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }

        float sdTorus(vec3 p, vec2 t) {
            vec2 q = vec2(length(p.xz)-t.x,p.y);
            return length(q)-t.y;
        }

        // Distance estimators for different variations
        float map(vec3 p, float time) {
            float t = time * max(0.1, uSpeed * 2.0);
            float d = MAX_DIST;
            
#if VARIATION == 0
                // 3D Fractal Heart (Cardioid Base + Radial recursive folds)
                p.y += 0.2;
                p.yz *= rot(t*0.2);
                p.xz *= rot(t*0.3);
                float r = length(p);
                // Cardioid equation
                float theta = atan(p.y, length(p.xz));
                float cardioid = r - 0.4 * (1.0 + sin(theta));
                d = cardioid;
                // Add recursive folding for fractal details
                vec3 p2 = p;
                for(int i=0; i<3; i++) {
                    p2 = abs(p2) - 0.1;
                    p2.xy *= rot(t*0.5);
                    d = smin(d, length(p2) - 0.1, 0.1);
                }
#elif VARIATION == 1
                // Fluid SDF Core (smoothmin metaballs merging and separating)
                p.xz *= rot(t*0.5);
                p.xy *= rot(t*0.3);
                float d1 = sdSphere(p - vec3(sin(t)*0.4, cos(t*1.2)*0.3, 0), 0.25);
                float d2 = sdSphere(p - vec3(cos(t*0.8)*0.3, sin(t*0.9)*0.4, sin(t)*0.2), 0.2);
                float d3 = sdSphere(p - vec3(sin(t*0.5)*0.3, cos(t*0.6)*0.2, cos(t*1.1)*0.4), 0.3);
                float d4 = sdSphere(p, 0.2);
                // High smoothing factor for fluid look
                d = smin(smin(smin(d1, d2, 0.4), d3, 0.4), d4, 0.4);
#elif VARIATION == 2
                // Particle Swarm (Volumetric noise/Voronoi clusters)
                p.xz *= rot(t*0.3);
                p.xy *= rot(t*0.2);
                vec3 q = p * 6.0;
                // Complex organic noise displacement
                float noise = sin(q.x + t)*sin(q.y - t)*sin(q.z + t*1.5);
                float noise2 = cos(q.x*2.0 - t)*sin(q.y*2.0 + t);
                d = sdSphere(p, 0.5) + noise * 0.15 + noise2 * 0.05;
                // Hollow out center to create swarm shell
                d = max(d, -(sdSphere(p, 0.3)));
#elif VARIATION == 3
                // Quantum Topology (Nested interlaced tori/knots)
                p.xz *= rot(t*0.4);
                p.yz *= rot(t*0.2);
                float d1 = sdTorus(p, vec2(0.5, 0.05));
                vec3 p2 = p; p2.xy *= rot(1.57); p2.xz *= rot(1.57 + t);
                float d2 = sdTorus(p2, vec2(0.5, 0.05));
                vec3 p3 = p; p3.yz *= rot(1.57); p3.xy *= rot(1.57 - t);
                float d3 = sdTorus(p3, vec2(0.5, 0.05));
                // Interlock them
                d = min(min(d1, d2), d3);
                // Add a quantum core
                d = smin(d, sdSphere(p, 0.15 + sin(t*4.0)*0.05), 0.3);
#elif VARIATION == 4
                // Prime Prime (Sacred geometry, overlapping circles)
                p.xy *= rot(t*0.1);
                d = sdSphere(p, 0.1); // center
                for(int i=0; i<6; i++) {
                    float a = float(i) * 1.047197; // 2 PI / 6
                    vec3 offset = vec3(cos(a)*0.4, sin(a)*0.4, 0.0);
                    // Pulsing radius
                    float r = 0.3 + sin(t*2.0 + a)*0.05;
                    d = min(d, sdTorus(p - offset, vec2(r, 0.02)));
                }
                // Wrap in outer ring
                d = min(d, sdTorus(p, vec2(0.7, 0.02)));
#elif VARIATION == 5
                // Metatron's Grid (Hexagonal symmetry, sharp edges)
                p.xz *= rot(t*0.2);
                p.xy *= rot(t*0.1);
                vec3 q = p;
                // Hexagonal folding
                float a = atan(q.y, q.x);
                float r = length(q.xy);
                a = mod(a, 1.047197) - 0.523598; // pi/3
                q.x = r * cos(a);
                q.y = r * sin(a);
                
                d = sdBox(q, vec3(0.4, 0.05, 0.05));
                d = min(d, sdBox(q - vec3(0.3, 0.3, 0), vec3(0.1)));
                d = min(d, sdSphere(p, 0.1)); // Center node
#elif VARIATION == 6
                // Folding Hypercube
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.3);
                vec3 q = abs(p) - 0.4;
                d = sdBox(q, vec3(0.1));
                q = abs(q) - 0.2;
                d = min(d, sdBox(q, vec3(0.05)));
#elif VARIATION == 7
                // Gyroid Labyrinth
                p.xz *= rot(t*0.2);
                vec3 q = p * 5.0;
                float gyroid = dot(sin(q), cos(q.zxy));
                d = sdSphere(p, 0.8) + gyroid * 0.05;
#elif VARIATION == 8
                // Ethereal 3D Lotus
                p.xz *= rot(t*0.3);
                float a = atan(p.z, p.x);
                float r = length(p.xz);
                float petals = sin(a * 6.0 + t*2.0);
                vec3 q = p;
                q.y += r*r*1.5; // fold upwards
                d = length(q) - 0.4 - petals*0.1;
                d = max(d, -sdSphere(p - vec3(0,0.5,0), 0.6));
#else
                // Cosmic DNA Helix
                p.yz *= rot(t*0.2);
                float a = p.y * 3.0 + t*2.0;
                vec3 p1 = vec3(p.x - cos(a)*0.3, p.y, p.z - sin(a)*0.3);
                vec3 p2 = vec3(p.x + cos(a)*0.3, p.y, p.z + sin(a)*0.3);
                float d1 = length(p1) - 0.1;
                float d2 = length(p2) - 0.1;
                float bridges = length(vec2(length(p.xz), mod(p.y, 0.4)-0.2)) - 0.05;
                d = smin(smin(d1, d2, 0.1), bridges, 0.05);
                d = max(d, sdSphere(p, 0.9)); // bound
#endif
            
            return d;
        }

        vec3 getNormal(vec3 p, float t) {
            float d = map(p, t);
            vec2 e = vec2(0.001, 0);
            vec3 n = d - vec3(
                map(p-e.xyy, t),
                map(p-e.yxy, t),
                map(p-e.yyx, t)
            );
            return normalize(n);
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            float t = uTime;

            // Camera setup
            vec3 ro = vec3(0.0, 0.0, -2.5); // Ray origin
            vec3 rd = normalize(vec3(uv, 1.0)); // Ray direction

            float dO = 0.0; // Distance origin
            vec3 p;
            
            // Raymarching loop
            for(int i=0; i<MAX_STEPS; i++) {
                p = ro + rd * dO;
                float dS = map(p, t); // Distance scene
                dO += dS;
                if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
            }

            vec3 col = vec3(0.0);
            
            if(dO < MAX_DIST) {
                // Hit something!
                vec3 n = getNormal(p, t);
                
                // Lighting
                vec3 lightDir = normalize(vec3(1.0, 2.0, -1.0));
                float dif = clamp(dot(n, lightDir), 0.0, 1.0);
                
                // Fresnel for glowing edges
                float fresnel = pow(1.0 + dot(rd, n), 2.0);
                
                // Add some fake ambient occlusion based on ray steps
                float ao = 1.0 - (float(MAX_STEPS) / 64.0)*0.5; // Mock
                
                // Color mapping
                vec3 baseCol = mix(uColor1, uColor2, clamp(p.y*0.5+0.5, 0.0, 1.0));
                
                col = baseCol * dif * 0.8 + baseCol * fresnel * 1.5;
                col += uColor1 * 0.2; // Ambient glow
            } else {
                // Background glow based on distance to center
                float glow = 1.0 / (1.0 + length(uv)*3.0);
                col = uColor2 * glow * 0.2;
            }
            
            // Post-processing
            col *= uIntensity * 1.2;
            
            // Gamma correction
            col = pow(col, vec3(0.4545));
            
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===18?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        uniform float uSpeed;
        varying vec2 vUv;
        
        // OPTIMIZED for WebGL compilation speed
        #define MAX_STEPS 45
        #define MAX_DIST 12.0
        #define SURF_DIST 0.01

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }
        
        float sdMandelbulb(vec3 p, float t) {
            vec3 z = p;
            float dr = 1.0;
            float r = 0.0;
            float Power = 8.0 + sin(t*0.5)*2.0;
            // Reduced to 2 iterations to prevent shader compiler timeout
            for (int i = 0; i < 2; i++) {
                r = length(z);
                if (r>1.5) break;
                float theta = acos(z.z/r);
                float phi = atan(z.y,z.x);
                dr = pow(r, Power-1.0)*Power*dr + 1.0;
                float zr = pow(r,Power);
                theta = theta*Power;
                phi = phi*Power;
                z = zr*vec3(sin(theta)*cos(phi), sin(phi)*sin(theta), cos(theta));
                z += p;
            }
            return 0.5*log(r)*r/dr;
        }

        float sdBox(vec3 p, vec3 b) {
            vec3 q = abs(p) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }

        float sdSphere(vec3 p, float s) { return length(p) - s; }

        float sdTorus(vec3 p, vec2 t) {
            vec2 q = vec2(length(p.xz)-t.x,p.y);
            return length(q)-t.y;
        }

        float map(vec3 p, float t) {
            float d = MAX_DIST;
            
#if VARIATION == 0
                p.xy *= rot(t*0.3);
                p.xz *= rot(t*0.5);
                d = sdMandelbulb(p, t);
#elif VARIATION == 1
                p.xz *= rot(t*0.4);
                p.yz *= rot(t*0.2);
                float a = atan(p.z, p.x);
                float r = length(p.xz) - 0.6;
                vec2 torus = vec2(r, p.y);
                torus *= rot(a * 3.0 + t);
                d = length(torus) - 0.15;
                torus = vec2(r, p.y);
                torus *= rot(a * -3.0 - t);
                float d2 = length(torus) - 0.15;
                d = smin(d, d2, 0.2);
#elif VARIATION == 2
                p.xy *= rot(t*0.5);
                p.yz *= rot(t*0.3);
                vec3 q = p;
                q.y -= length(q.xz)*0.6;
                q.y += 0.2;
                d = length(q) - 0.5;
                // Reduced from 4 to 2
                for(int i=0; i<2; i++) {
                    p = abs(p)*1.6 - 0.4;
                    p.xy *= rot(t*0.3);
                    p.xz *= rot(t*0.5);
                    float tube = length(p.xz) - 0.1;
                    d = smin(d, tube*0.39, 0.05); // pow(1.6, -2) approx 0.39
                }
#elif VARIATION == 3
                p.xz *= rot(t*0.2);
                vec3 q3 = p;
                float a3 = atan(q3.z, q3.x);
                float r3 = length(q3.xz);
                float segments = 8.0;
                a3 = mod(a3, 6.28318/segments) - 3.14159/segments;
                q3.x = r3*cos(a3); q3.z = r3*sin(a3);
                q3.x -= 0.6;
                q3.xy *= rot(t*2.0);
                d = sdBox(q3, vec3(0.2, 0.05, 0.1));
                d = min(d, length(p) - 0.4);
                d = max(d, -(length(p.xz) - 0.2));
#elif VARIATION == 4
                p.xz *= rot(t*0.4);
                p.yz *= rot(t*0.3);
                float r4 = length(p);
                d = r4 - 0.6;
                d += sin(p.x*10.0)*sin(p.y*10.0)*sin(p.z*10.0)*0.1;
                p = abs(p) - 0.2;
                d = smin(d, length(p)-0.3, 0.2);
#elif VARIATION == 5
                p.xz *= rot(t*0.6);
                p.yz *= rot(t*0.4);
                p.xy *= rot(t*0.2);
                vec3 q5 = abs(p) - 0.5;
                float box1 = sdBox(q5, vec3(0.05));
                q5 = abs(p) - 0.25;
                float box2 = sdBox(q5, vec3(0.05));
                d = min(box1, box2);
                float strut = sdBox(p, vec3(0.02, 0.02, 0.6));
                d = min(d, strut);
                strut = sdBox(p, vec3(0.6, 0.02, 0.02));
                d = min(d, strut);
                strut = sdBox(p, vec3(0.02, 0.6, 0.02));
                d = smin(d, strut, 0.1);
#elif VARIATION == 6
                p.xz *= rot(t*0.2);
                // Reduced from 4 to 2
                for(int i=0; i<2; i++) {
                    p = abs(p) - 0.3;
                    p.xy *= rot(0.5 + t*0.1);
                    p.xz *= rot(0.5 - t*0.1);
                }
                d = sdBox(p, vec3(0.1));
                d = max(d, length(p)-0.15);
#elif VARIATION == 7
                p.xz *= rot(t*0.2);
                vec3 q7 = p * 3.0;
                float noise = dot(sin(q7), cos(q7.zxy));
                d = length(p) - 0.6 + noise * 0.2;
                d = max(d, -sdSphere(p, 0.4));
                d = min(d, length(p - vec3(sin(t)*0.3, cos(t)*0.3, 0)) - 0.1);
#elif VARIATION == 8
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.2);
                d = sdTorus(p, vec2(0.6, 0.05));
                vec3 p2_8 = p; p2_8.xy *= rot(1.57); p2_8.xz *= rot(1.57);
                d = smin(d, sdTorus(p2_8, vec2(0.5, 0.05)), 0.1);
                vec3 p3_8 = p; p3_8.yz *= rot(1.57); p3_8.xy *= rot(1.57);
                d = smin(d, sdTorus(p3_8, vec2(0.4, 0.05)), 0.1);
                vec3 q8 = mod(p*5.0 - t, 1.0) - 0.5;
                float swarm = length(q8) - 0.05;
                d = smin(d, max(swarm, length(p)-0.8), 0.2);
#else
                p.xz *= rot(t*0.3);
                p.yz *= rot(t*0.1);
                float r9 = length(p);
                d = abs(r9 - 0.7) - 0.05;
                d = max(d, -(abs(p.y)-0.02)); 
                d = max(d, -(abs(p.x)-0.02));
                vec3 p2_9 = p;
                p2_9.xy *= rot(-t*0.8);
                p2_9.xz *= rot(-t*0.5);
                float core = sdBox(p2_9, vec3(0.3));
                d = min(d, core);
                d = min(d, sdTorus(p2_9, vec2(0.4, 0.02)));
#endif
            return d;
        }

        vec3 getNormal(vec3 p, float t) {
            float d = map(p, t);
            vec2 e = vec2(0.005, 0); // wider step for performance
            vec3 n = d - vec3(
                map(p-e.xyy, t),
                map(p-e.yxy, t),
                map(p-e.yyx, t)
            );
            return normalize(n);
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            float t = uTime;

            vec3 ro = vec3(0.0, 0.0, -2.5);
            vec3 rd = normalize(vec3(uv, 1.0));

            float dO = 0.0;
            vec3 p;
            
            for(int i=0; i<MAX_STEPS; i++) {
                p = ro + rd * dO;
                float dS = map(p, t);
                dO += dS;
                if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
            }

            vec3 col = vec3(0.0);
            
            if(dO < MAX_DIST) {
                vec3 n = getNormal(p, t);
                vec3 lightDir = normalize(vec3(1.0, 2.0, -1.0));
                float dif = clamp(dot(n, lightDir), 0.0, 1.0);
                float fresnel = pow(1.0 + dot(rd, n), 2.0);
                
                vec3 baseCol = mix(uColor1, uColor2, clamp(p.y*0.5+0.5 + n.x*0.2, 0.0, 1.0));
                
                col = baseCol * dif * 0.9 + baseCol * fresnel * 2.0;
                col += uColor1 * 0.3 * (1.0 - dif);
                
                vec3 ref = reflect(rd, n);
                float spec = pow(max(dot(ref, lightDir), 0.0), 32.0);
                col += vec3(1.0) * spec * 0.8;
            } else {
                float glow = 1.0 / (1.0 + length(uv)*2.5);
                col = uColor2 * glow * 0.3 + uColor1 * pow(glow, 3.0) * 0.5;
            }
            
            col *= uIntensity * 1.2;
            col = pow(col, vec3(0.4545)); // Gamma correction
            
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===0?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;


        void main() {
            float intMod = max(0.1, uIntensity);

            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 2.0 * intMod; // fast
            
            float d = length(p);
            float a = atan(p.y, p.x);
            
            // Starburst radial rays
            float rays = sin(a * (20.0 + var * 5.0) + t) * sin(a * (13.0 + var * 3.0) - t * 0.5);
            rays = smoothstep(0.5, 1.0, abs(rays));
            
            // Shockwave rings
            float shock = fract(d * (5.0 + var) - t);
            shock = smoothstep(0.0, 0.1, shock) * smoothstep(0.2, 0.1, shock);
            
            // Core explosion
            float core = 0.05 / (d + 0.01);
            
            float burst = rays * (1.0 - d) + shock + core;
            burst = clamp(burst, 0.0, 1.0);
            
            vec3 col = mix(uColor2, uColor1, burst) * burst * pow(intMod, 1.5) * 1.5;
            
            col *= smoothstep(1.2, 0.0, d); // steep falloff
            
            gl_FragColor = vec4(col, 1.0);
        }
        `:i===19?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uSpeed;
        uniform float uAspect;
        uniform float uHarmonics;
        uniform float uResonance;
        uniform float uEntropy;
        uniform float uFlow;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform vec2 uMouse;
        uniform float uSpawnTime;
        uniform float uAlpha;

        varying vec2 vUv;
        
        #define MAX_STEPS 32
        #define MAX_DIST 10.0
        #define SURF_DIST 0.015
        #define PI 3.14159265359

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        // --- SDF Primitives ---
        float sdSphere(vec3 p, float s) { return length(p) - s; }
        
        float sdBox(vec3 p, vec3 b) {
            vec3 q = abs(p) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }

        float sdTorus(vec3 p, vec2 t) {
            vec2 q = vec2(length(p.xz)-t.x,p.y);
            return length(q)-t.y;
        }

        float sdHexPrism( vec3 p, vec2 h ) {
            const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
            p = abs(p);
            p.xy -= 2.0*min(dot(k.xy, p.xy), 0.0)*k.xy;
            vec2 d = vec2(
                length(p.xy-vec2(clamp(p.x,-k.z*h.x,k.z*h.x), h.x))*sign(p.y-h.x),
                p.z-h.y );
            return min(max(d.x,d.y),0.0) + length(max(d,0.0));
        }

        // --- 3D Noise ---
        float hash(vec3 p) {
            p  = fract( p*0.3183099+.1 );
            p *= 17.0;
            return fract( p.x*p.y*p.z*(p.x+p.y+p.z) );
        }
        float noise( in vec3 x ) {
            vec3 i = floor(x);
            vec3 f = fract(x);
            f = f*f*(3.0-2.0*f);
            return mix(mix(mix( hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),
                           mix( hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
                       mix(mix( hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                           mix( hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
        }

        // --- 3D Voronoi / Cellular ---
        vec3 hash3( vec3 p ) {
            p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                      dot(p,vec3(269.5,183.3,246.1)),
                      dot(p,vec3(113.5,271.9,124.6)));
            return -1.0 + 2.0*fract(sin(p)*43758.5453123);
        }
        float voronoi( in vec3 x ) {
            vec3 p = floor( x );
            vec3 f = fract( x );
            float id = 0.0;
            vec2 res = vec2( 100.0 );
            for( int k=-1; k<=1; k++ )
            for( int j=-1; j<=1; j++ )
            for( int i=-1; i<=1; i++ ) {
                vec3 b = vec3( float(i), float(j), float(k) );
                vec3 r = vec3( b ) - f + 0.5 + 0.5*sin( uTime*0.5 + 6.2831*hash3( p + b ) );
                float d = dot( r, r );
                if( d < res.x ) {
                    id = dot( p+b, vec3(1.0,57.0,113.0 ) );
                    res = vec2( d, res.x );
                } else if( d < res.y ) {
                    res.y = d;
                }
            }
            return sqrt( res.x );
        }

        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }

        // --- Map Function (Where the magic happens) ---
        vec2 map(vec3 p) {
            float d = MAX_DIST;
            float matID = 0.0; // 0 = main, 1 = glow/energy
            
            float intMod = max(0.1, uIntensity);
            float t = uTime * uSpeed * intMod;
            float harm = uHarmonics > 0.0 ? uHarmonics : 1.0;
            float flow = uFlow > 0.0 ? uFlow : 1.0;
            float entropy = uEntropy > 0.0 ? uEntropy : 1.0;
            
            // Audio Sync Deformations
            float kick = uAudioLow * 2.0;
            float snare = uAudioMid * 2.0;
            float hat = uAudioHigh * 2.0;
            
            // Glitch Spawn Effect (Builds geometry slowly after switching patterns)
            float spawnScale = smoothstep(0.0, 2.0, uTime - uSpawnTime);
            p /= max(0.01, spawnScale); // Start tiny and expand
            
            float spawnDisp = (1.0 - spawnScale) * noise(p * 10.0 + t);
            
#if VARIATION == 0
            // 3D Fractal Heart
            vec3 q = p;
            q.y -= 0.5;
            // Physical Beating
            float beat = sin(t * 4.0) * 0.1 * harm + kick * 0.2;
            q *= 1.0 - beat;
            
            // Algebraic 3D Heart
            float x = q.x * 1.2;
            float y = q.y * 1.2;
            float z = q.z * 1.2;
            float a = x*x + 2.25*y*y + z*z - 1.0;
            float heart = a*a*a - x*x*z*z*z - 0.1125*y*y*z*z*z;
            d = heart * 0.3; // Scale distance field
            
            // Surface Displacement (Veins/Fractals)
            float disp = noise(q * 10.0 * entropy + t * flow) * 0.05 * hat;
            d += disp + spawnDisp;
            matID = 0.0;

#elif VARIATION == 1
            // Fluid SDF Core (Liquid Metal blob)
            vec3 q = p;
            q.yz *= rot(t * 0.2);
            q.xz *= rot(t * 0.3);
            
            float baseSphere = sdSphere(q, 1.5 + kick * 0.3);
            
            // Multi-octave FBM for fluid displacement
            float n = noise(q * 2.0 * entropy + t * flow);
            n += 0.5 * noise(q * 4.0 - t * 1.5);
            n += 0.25 * noise(q * 8.0 + t);
            
            d = baseSphere - n * 0.5 * harm * (1.0 + snare) + spawnDisp;
            matID = 1.0; // Highly reflective/fluid

#elif VARIATION == 2
            // Particle Swarm (3D Voronoi Lattice)
            vec3 q = p;
            q.xz *= rot(t * 0.1);
            q.xy *= rot(t * 0.15);
            
            // Hollow sphere bounds
            float bound = abs(sdSphere(q, 2.0 + kick*0.2)) - 0.2;
            
            // Cellular noise lattice
            float cell = voronoi(q * (2.0 + harm) * entropy - t * flow);
            float lattice = abs(cell - 0.5) - 0.1 * (1.0 + hat);
            
            d = max(bound, lattice) + spawnDisp;
            matID = 0.0;

#elif VARIATION == 3
            // Quantum Topology (Interlocking Torus Knots)
            vec3 q = p;
            q.xz *= rot(t * 0.4);
            q.yz *= rot(t * 0.2);
            
            float r1 = sdTorus(q, vec2(1.2 + kick*0.2, 0.1 + hat*0.05));
            vec3 q2 = q;
            q2.xy *= rot(PI/2.0);
            q2.xz *= rot(PI/4.0);
            float r2 = sdTorus(q2, vec2(1.2 + snare*0.2, 0.1 + hat*0.05));
            
            // Quantum Wave Interference
            float wave = sin(q.x * 10.0 * entropy + t * flow) * 0.05 * harm;
            
            d = smin(r1, r2, 0.5) + wave + spawnDisp;
            matID = 1.0;

#elif VARIATION == 4
            // Prime Prime (Extruded 3D Star)
            vec3 q = p;
            q.xz *= rot(t * 0.3);
            q.yz *= rot(t * 0.1);
            
            float a = atan(q.z, q.x);
            float r = length(q.xz);
            
            float arms = 7.0 + floor(harm * 4.0); // Prime
            float star = cos(a * arms) * 0.3 * entropy * (1.0 + kick);
            
            float cylinder = max(r - 1.5 + star, abs(q.y) - 0.5 - snare*0.2);
            
            // Inner core
            float core = sdSphere(q, 0.8 + hat*0.3);
            
            d = min(cylinder, core) + spawnDisp;
            matID = 0.0;

#else
            // Metatron's Grid (3D Crystal Lattice)
            vec3 q = p;
            q.xz *= rot(t * 0.2);
            q.yz *= rot(t * 0.15);
            
            // Central Hex Prism
            float hex = sdHexPrism(q, vec2(1.0 + kick*0.2, 1.0));
            
            // Nodes (Spheres)
            float spheres = MAX_DIST;
            for(int i=0; i<6; i++) {
                float ang = float(i) * PI / 3.0;
                vec3 pos = vec3(cos(ang)*1.2, 0.0, sin(ang)*1.2);
                spheres = min(spheres, sdSphere(q - pos, 0.3 + hat*0.2));
                
                vec3 posTop = vec3(cos(ang)*0.8, 1.2, sin(ang)*0.8);
                spheres = min(spheres, sdSphere(q - posTop, 0.2 + snare*0.2));
                
                vec3 posBot = vec3(cos(ang)*0.8, -1.2, sin(ang)*0.8);
                spheres = min(spheres, sdSphere(q - posBot, 0.2 + snare*0.2));
            }
            
            float grid = min(abs(hex)-0.05, spheres);
            d = grid + spawnDisp;
            matID = 1.0;
#endif

            // Re-scale distance field back
            d *= spawnScale;

            return vec2(d, matID);
        }

        // --- Raymarching Engine ---
        vec3 calcNormal(vec3 p) {
            vec2 e = vec2(0.001, 0.0);
            return normalize(vec3(
                map(p + e.xyy).x - map(p - e.xyy).x,
                map(p + e.yxy).x - map(p - e.yxy).x,
                map(p + e.yyx).x - map(p - e.yyx).x
            ));
        }

        float calcAO(vec3 p, vec3 n) {
            float occ = 0.0;
            float sca = 1.0;
            for(int i=0; i<5; i++) {
                float h = 0.01 + 0.12 * float(i)/4.0;
                float d = map(p + h*n).x;
                occ += (h-d)*sca;
                sca *= 0.95;
            }
            return clamp(1.0 - 1.5*occ, 0.0, 1.0);
        }

        float calcSoftShadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
            float res = 1.0;
            float t = mint;
            for(int i=0; i<16; i++) {
                float h = map(ro + rd*t).x;
                res = min(res, k*h/t);
                t += clamp(h, 0.02, 0.10);
                if(res<0.005 || t>maxt) break;
            }
            return clamp(res, 0.0, 1.0);
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            
            float spawnFade = smoothstep(0.0, 1.0, uTime - uSpawnTime);
            
            // Interactive Camera Physics
            vec3 ro = vec3(uMouse.x * 3.0, uMouse.y * 3.0 + 1.0, 6.0 - max(0.0, uAudioLow * 2.0)); // Zoom on kick
            vec3 ta = vec3(0.0, 0.0, 0.0);
            
            // Camera Matrix
            vec3 ww = normalize(ta - ro);
            vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
            vec3 vv = normalize(cross(uu, ww));
            vec3 rd = normalize(uv.x*uu + uv.y*vv + 1.5*ww);
            
            float dO = 0.0;
            vec2 d;
            vec3 p;
            
            // Raymarch loop
            for(int i=0; i<MAX_STEPS; i++) {
                p = ro + rd * dO;
                d = map(p);
                if(abs(d.x) < SURF_DIST || dO > MAX_DIST) break;
                dO += d.x * 0.8; // Safe stepping
            }
            
            vec3 col = vec3(0.0); // Background
            
            if(dO < MAX_DIST) {
                // We hit something!
                vec3 n = calcNormal(p);
                
                // Advanced PBR Lighting
                vec3 lig = normalize(vec3(1.0, 2.0, 2.0)); // Main Light
                vec3 hal = normalize(lig - rd);
                
                float dif = clamp(dot(n, lig), 0.0, 1.0);
                float bac = clamp(dot(n, normalize(vec3(-lig.x, 0.0, -lig.z))), 0.0, 1.0);
                float amb = 0.5 + 0.5 * dot(n, vec3(0.0, 1.0, 0.0));
                
                float ao = calcAO(p, n);
                float sha = calcSoftShadow(p, lig, 0.02, 2.5, 8.0);
                
                // Specular & Fresnel
                float spe = pow(clamp(dot(n, hal), 0.0, 1.0), 32.0);
                float fre = pow(clamp(1.0 + dot(n, rd), 0.0, 1.0), 4.0);
                
                // Base colors mixed with UI Colors
                vec3 albedo = mix(uColor1, uColor2, d.y); 
                
                // Subsurface Scattering Fake (Light bleeding through edges)
                float sss = pow(clamp(1.0 - dot(n, lig), 0.0, 1.0), 5.0) * 0.5;
                
                col = albedo * dif * sha;
                col += albedo * amb * ao * 0.3;
                col += albedo * bac * 0.2;
                col += vec3(1.0) * spe * sha;
                col += mix(uColor1, uColor2, 0.5) * fre * 2.0 * (1.0 + uAudioHigh); // Fresnel glow pulses on highs
                col += uColor1 * sss * (1.0 + uAudioLow); // SSS pulses on lows
                
                // Bloom / Emission
                if (d.y == 1.0) {
                    col += albedo * 1.5; // Emissive liquid/grid
                }
            }
            
            // Post-Processing / Fake Bloom
            col = pow(col, vec3(0.4545)); // Gamma correction
            
            gl_FragColor = vec4(col * uAlpha * spawnFade, uAlpha * spawnFade);
        }
        `:i===20?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform float uAlpha;
        varying vec2 vUv;

        #define PI 3.14159265359

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        // Heart SDF
        float sdHeart(vec2 p) {
            p.x = abs(p.x);
            if( p.y+p.x>1.0 ) return sqrt(dot(p-vec2(0.25,0.75),p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
            return sqrt(min(dot(p-vec2(0.00,1.00),p-vec2(0.00,1.00)),
                            dot(p-0.5*max(p.x+p.y,0.0),p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
        }
        
        // Hexagon SDF
        float sdHexagon(vec2 p, float r) {
            const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
            p = abs(p);
            p -= 2.0*min(dot(k.xy, p), 0.0)*k.xy;
            p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
            return length(p)*sign(p.y);
        }

        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        float voronoi(vec2 x) {
            vec2 n = floor(x);
            vec2 f = fract(x);
            float m = 8.0;
            for(int j=-1; j<=1; j++)
            for(int i=-1; i<=1; i++) {
                vec2 g = vec2(float(i),float(j));
                vec2 o = vec2(hash(n+g));
                vec2 r = g - f + o;
                float d = dot(r,r);
                if(d < m) m = d;
            }
            return sqrt(m);
        }

        void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= uAspect;
            
            float var = floor(uVariation);
            float t = uTime * 0.5;
            float bump = (uAudioLow + uAudioMid + uAudioHigh) * uIntensity;
            
            float pattern = 0.0;
            vec3 col = vec3(0.0);
            
            if (var == 0.0) {
                p *= 1.5; p.y += 0.5;
                float d = sdHeart(p);
                float n = 6.0 + bump * 2.0; float m = 4.0;
                float waves = cos(n*p.x)*cos(m*p.y) - cos(m*p.x)*cos(n*p.y);
                pattern = smoothstep(0.02, 0.0, abs(d + waves*0.1));
                pattern += smoothstep(0.01, 0.0, abs(d + 0.1));
            } else if (var == 1.0) {
                vec2 q = p;
                q.x += sin(q.y * 5.0 + t) * 0.1;
                q.y += cos(q.x * 5.0 - t) * 0.1;
                float d = length(q) - 0.5;
                float n = 8.0; float m = 8.0;
                float waves = sin(n*q.x)*sin(m*q.y);
                pattern = smoothstep(0.03, 0.0, abs(d * waves));
            } else if (var == 2.0) {
                float v = voronoi(p * (10.0 + bump*5.0) + t);
                float n = 3.0; float m = 5.0;
                float waves = cos(n*p.x)*cos(m*p.y) - cos(m*p.x)*cos(n*p.y);
                float node = smoothstep(0.1, 0.0, abs(waves));
                pattern = smoothstep(0.05, 0.0, v) * node;
            } else if (var == 3.0) {
                float r = length(p);
                float n = 7.0 + floor(bump*2.0); float m = 3.0;
                float waves = cos(n*p.x)*cos(m*p.y) - cos(m*p.x)*cos(n*p.y);
                float ring = sin(r * 20.0 - t * 2.0);
                pattern = smoothstep(0.05, 0.0, abs(waves * ring));
            } else if (var == 4.0) {
                float r = length(p); float a = atan(p.y, p.x);
                float f = sin(a * 7.0) * sin(a * 11.0);
                float waves = cos(f * 10.0 + r * 20.0 - t);
                pattern = smoothstep(0.1, 0.0, abs(waves));
            } else if (var == 5.0) {
                float d1 = sdHexagon(p, 0.5);
                float d2 = length(p) - 0.5;
                float pattern1 = smoothstep(0.02, 0.0, abs(d1));
                float pattern2 = smoothstep(0.02, 0.0, abs(d2));
                float circles = 0.0;
                for(int i=0; i<6; i++){
                    float fi = float(i);
                    float ang = fi * PI / 3.0;
                    vec2 cp = vec2(cos(ang), sin(ang)) * 0.5;
                    circles += smoothstep(0.02, 0.0, abs(length(p - cp) - 0.5));
                }
                pattern = clamp(pattern1 + pattern2 + circles, 0.0, 1.0);
                float n = 4.0; float m = 4.0;
                float waves = cos(n*p.x)*cos(m*p.y) - cos(m*p.x)*cos(n*p.y);
                pattern *= smoothstep(0.1, 0.0, abs(waves));
            }

            col = mix(uColor2, uColor1, pattern) * pattern;
            
            float alpha = pattern * uAlpha;
            gl_FragColor = vec4(col, alpha);
        }
        `:i===21?`
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform vec2 uMouse;
        uniform float uAlpha;
        
        #define PI 3.14159265359
        #define MAX_STEPS 32
        #define MAX_DIST 50.0
        #define SURF_DIST 0.015
        
        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }
        
        float smin(float a, float b, float k) {
            float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
            return mix(b, a, h) - k * h * (1.0 - h);
        }
        
        float sdOctahedron(vec3 p, float s) {
            p = abs(p);
            return (p.x + p.y + p.z - s) * 0.57735027;
        }

        float sdBox(vec3 p, vec3 b) {
            vec3 q = abs(p) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }
        
        float sdTorus(vec3 p, vec2 t) {
            vec2 q = vec2(length(p.xz)-t.x,p.y);
            return length(q)-t.y;
        }
        
        float map(vec3 p) {
            float d = MAX_DIST;
            float var = float(VARIATION);
            
            float t = uTime * uIntensity;
            float pulse = uAudioLow + uAudioMid;
            
            if (var == 0.0) {
                // Fractal Heart + Star Tetrahedron
                vec3 q = p;
                q.y += 0.5;
                float x2 = q.x * q.x;
                float y2 = q.y * q.y;
                float z2 = q.z * q.z;
                float heart = (x2 + 2.25 * y2 + z2 - 1.0);
                heart = heart * heart * heart - x2 * z2 * z2 - 0.1125 * y2 * z2 * z2;
                heart *= 0.5; // Scale down SDF for safety
                
                vec3 oc = p;
                oc.xy *= rot(t*0.5);
                oc.xz *= rot(t*0.3);
                float oct = sdOctahedron(oc, 1.5 + pulse*0.2);
                
                // Wireframe effect for octahedron
                float octInner = sdOctahedron(oc, 1.4 + pulse*0.2);
                float octShell = max(oct, -octInner);
                
                d = min(heart, octShell);
                
            } else if (var == 1.0) {
                // Fluid SDF Mandala
                float r = length(p.xz);
                float a = atan(p.z, p.x);
                float ripple = sin(r * 15.0 - t * 3.0 + pulse*2.0) * 0.1;
                float petal = sin(a * 8.0) * 0.2 * cos(r * 5.0);
                
                float ground = p.y + 0.5 - ripple - petal;
                
                // Fluid drops
                vec3 dp = p;
                dp.y -= 1.0 + sin(t*2.0)*0.5;
                float drop = length(dp) - 0.2;
                
                d = smin(ground, drop, 0.5);
                
            } else if (var == 2.0) {
                // Particle Swarm (Domain repeated grid in a sphere)
                vec3 q = p;
                q.xz *= rot(t*0.2);
                q.yz *= rot(t*0.1);
                
                vec3 cell = fract(q * 4.0) - 0.5;
                float dots = length(cell) - 0.05 - pulse*0.05;
                
                float bounds = length(p) - 2.5;
                d = max(dots, bounds);
                
                // Add an inner glowing core
                float core = length(p) - 0.5 - pulse*0.2;
                d = min(d, core);
                
            } else if (var == 3.0) {
                // Quantum Topology (Volcanic terrain)
                float h = sin(p.x * 2.0 + t) * cos(p.z * 2.0 - t) * 0.5;
                h += sin(p.x * 5.0) * cos(p.z * 5.0) * 0.2 * (1.0+pulse);
                
                float terrain = p.y + 1.0 - h;
                
                // Spikes
                vec3 q = p;
                q.xz = mod(q.xz, 2.0) - 1.0;
                float spike = length(q.xz) - 0.1;
                spike = max(spike, p.y - 2.0);
                
                d = min(terrain, spike);
                
            } else if (var == 4.0) {
                // Prime Prime (Neon rings)
                d = MAX_DIST;
                for(int i=0; i<5; i++) {
                    float fi = float(i);
                    vec3 q = p;
                    q.xy *= rot(t*0.2 + fi);
                    q.xz *= rot(t*0.3 + fi*1.618);
                    float ring = sdTorus(q, vec2(1.5 + sin(fi)*0.2, 0.02));
                    d = min(d, ring);
                }
                float center = length(p) - 0.3 - pulse*0.2;
                d = min(d, center);
                
            } else if (var == 5.0) {
                // Metatron's Grid
                vec3 q = p;
                q.xz *= rot(t*0.5);
                q.yz *= rot(t*0.3);
                
                float outer = sdBox(q, vec3(1.2));
                float inner = sdBox(q, vec3(1.15));
                float frame = max(outer, -inner);
                
                float sphere = length(q) - 0.8 - pulse*0.2;
                
                // Add crossing cylinders for the grid
                float cx = length(q.yz) - 0.05;
                float cy = length(q.xz) - 0.05;
                float cz = length(q.xy) - 0.05;
                float cross = min(cx, min(cy, cz));
                
                d = min(frame, min(sphere, cross));
            }
            
            return d * 0.5; // Help raymarcher with deformed SDFs
        }
        
        vec3 calcNormal(vec3 p) {
            vec2 e = vec2(1.0, -1.0) * 0.5773 * 0.001;
            return normalize(e.xyy*map(p + e.xyy) + 
                             e.yyx*map(p + e.yyx) + 
                             e.yxy*map(p + e.yxy) + 
                             e.xxx*map(p + e.xxx));
        }
        
        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;
            
            vec3 ro = vec3(0.0, 1.0, 5.0);
            vec3 rd = normalize(vec3(uv, -1.0));
            
            // Mouse camera control
            ro.yz *= rot(-uMouse.y * PI * 0.5);
            ro.xz *= rot(uMouse.x * PI);
            rd.yz *= rot(-uMouse.y * PI * 0.5);
            rd.xz *= rot(uMouse.x * PI);
            
            float d0 = 0.0;
            float glow = 0.0;
            
            for(int i=0; i<MAX_STEPS; i++) {
                vec3 p = ro + rd * d0;
                float dS = map(p);
                
                // Emissive glow accumulation (neon effect)
                glow += 0.01 / (0.01 + abs(dS));
                
                if(dS < SURF_DIST || d0 > MAX_DIST) break;
                d0 += dS;
            }
            
            vec3 col = vec3(0.0);
            float var = float(VARIATION);
            
            if(d0 < MAX_DIST) {
                vec3 p = ro + rd * d0;
                vec3 n = calcNormal(p);
                vec3 l = normalize(vec3(1.0, 2.0, 3.0));
                
                // PBR-like Lighting
                float diff = max(dot(n, l), 0.0);
                float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
                float spec = pow(max(dot(reflect(-l, n), -rd), 0.0), 32.0);
                
                vec3 albedo = mix(uColor1, uColor2, sin(length(p)*5.0 + uTime)*0.5+0.5);
                
                col = albedo * (diff * 0.5 + 0.1) + uColor1 * fresnel * 2.0 + uColor2 * spec;
                
                // Wireframe effect for Topology
                if (var == 3.0) {
                    vec3 q = fract(p * 4.0);
                    float edge = min(min(q.x, q.y), q.z);
                    if(edge < 0.05) col += uColor2 * 2.0;
                }
            }
            
            // Add volumetric bloom
            col += mix(uColor1, uColor2, 0.5) * glow * 0.1 * uIntensity;
            
            // Background cosmic/dark space
            col += vec3(0.02, 0.0, 0.05) * length(uv);
            
            // Tone mapping for cinematic look
            col = col / (1.0 + col);
            col = pow(col, vec3(0.4545)); // Gamma correction
            
            gl_FragColor = vec4(col, uAlpha);
        }
        `:i===22?`
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform vec2 uMouse;
        uniform float uAlpha;
        uniform float uMouseSync;
        uniform sampler2D uTexture;
        
        #define PI 3.14159265359
        
        vec2 rotate(vec2 p, float a) {
            float c = cos(a), s = sin(a);
            return mat2(c, -s, s, c) * p;
        }

        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }

        float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int i = 0; i < 4; ++i) {
                v += a * noise(p);
                p = rot * p * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        void main() {
            vec2 uv = vUv;
            float time = uTime;
            
            // Safe branchless interactive mouse sync or static center
            vec2 center = mix(vec2(0.5), vec2(0.5) + uMouse * 0.5, step(0.5, uMouseSync));
            vec2 p = uv - center;
            p.x *= uAspect;
            float r = length(p);
            
            // Safe, branchless angle calculation to prevent driver/watchdog lockups on Apple Metal atan(0,0)
            float angle = safe_atan(p.y, p.x);
            
            // Safe, branchless normalize vector for coordinate directions (prevents NaNs)
            vec2 pDir = safe_normalize(p);
            
            float lowPulse = uAudioLow * uIntensity;
            float midPulse = uAudioMid * uIntensity;
            float highPulse = uAudioHigh * uIntensity;
            
            // Compute texture gradient (finite differences) to warp along native image features
            vec2 eps = vec2(0.004, 0.0);
            float lumaL = dot(texture2D(uTexture, uv - eps.xy).rgb, vec3(0.299, 0.587, 0.114));
            float lumaR = dot(texture2D(uTexture, uv + eps.xy).rgb, vec3(0.299, 0.587, 0.114));
            float lumaD = dot(texture2D(uTexture, uv - eps.yx).rgb, vec3(0.299, 0.587, 0.114));
            float lumaU = dot(texture2D(uTexture, uv + eps.yx).rgb, vec3(0.299, 0.587, 0.114));
            vec2 grad = vec2(lumaR - lumaL, lumaU - lumaD);
            
            // Original luma at uv
            float baseLuma = dot(texture2D(uTexture, uv).rgb, vec3(0.299, 0.587, 0.114));
            
            // Boundary window to fade out displacements and prevent edge-streaking artifacts
            float window = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x) *
                           smoothstep(0.0, 0.05, uv.y) * smoothstep(1.0, 0.95, uv.y);
            
            // Spectrum-dependent color mapping (dynamic luminance blooming)
            vec3 activeColor1 = mix(uColor1, vec3(1.0, 1.0, 1.0), highPulse * 0.4);
            vec3 activeColor2 = mix(uColor2, vec3(1.0, 0.3, 0.6), lowPulse * 0.3);
            
            vec4 texColor = vec4(0.0);
            vec3 customColor = vec3(0.0);
            
#if VARIATION == 0
            // --- VARIATION 0: FRACTAL HEART ---
            vec2 pHeart = p * 1.2;
            pHeart.y += 0.1;
            
            float heartBeat = sin(time * 5.0) * 0.06 * (1.0 + lowPulse) + lowPulse * 0.12;
            pHeart *= (1.0 - heartBeat);
            
            float x2 = pHeart.x * pHeart.x;
            float yVal = pHeart.y - 0.3 - sqrt(abs(pHeart.x) + 0.0001) * 0.5;
            float heartSDF = x2 + yVal*yVal - 0.2;
            
            // Dynamic ripple frequency morphing based on audio spectral balance
            float spatialFreq = 18.0 + lowPulse * 15.0 + highPulse * 35.0;
            float ripples = sin(heartSDF * spatialFreq - time * (7.0 + highPulse * 10.0) + baseLuma * 10.0);
            
            vec2 warp = grad * ripples * 0.06 * (1.0 + lowPulse) + pDir * sin(heartSDF * 15.0 - time * 4.0) * 0.02 * lowPulse;
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Physical particle concentration & depletion
            float density = smoothstep(0.06, 0.0, abs(ripples));
            float depletion = smoothstep(0.0, 0.4, abs(ripples));
            
            vec3 finalColor = texColor.rgb * (1.0 - depletion * 0.5 * uIntensity);
            float antinode = smoothstep(0.0, 0.2, abs(ripples));
            customColor = mix(activeColor1, activeColor2, antinode * 0.8 + luma * 0.2);
            finalColor += customColor * density * 1.8 * uIntensity * luma + activeColor2 * lowPulse * 0.3;
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 1
            // --- VARIATION 1: FLUID SDF ---
            vec2 flowDir = vec2(-grad.y, grad.x);
            
            // Dynamic liquid flow velocity and turbulent vortex density driven by audio mids/highs
            float fluidSpeed = time * (1.5 + midPulse * 3.0) + lowPulse * 0.5;
            float fluidDensity = 3.0 + highPulse * 5.0;
            float flowVar = fbm(p * fluidDensity + fluidSpeed * 0.1);
            
            vec2 warp = flowDir * (0.05 + midPulse * 0.07) * sin(flowVar * 6.0 + time * 2.0);
            warp += grad * cos(baseLuma * 15.0 - time * 4.0) * 0.03 * (1.0 + midPulse);
            warp += vec2(cos(flowVar * 2.0 * PI), sin(flowVar * 2.0 * PI)) * 0.015 * (1.0 + midPulse);
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Physical fluid density accumulation along streams
            float speed = length(warp);
            float fluidAccumulation = smoothstep(0.0, 0.1, speed);
            
            vec3 finalColor = texColor.rgb * (1.0 + fluidAccumulation * 1.5 * uIntensity);
            vec3 glowCol = mix(activeColor1, activeColor2, speed * 10.0 + luma * 0.3);
            finalColor += glowCol * speed * 2.5 * luma * (1.0 + midPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 2
            // --- VARIATION 2: PARTICLE SWARM ---
            // Dynamic Chladni grid cell division driven by high/low frequencies (simulates acoustic mode morphing)
            float cellFreq = 8.0 + highPulse * 16.0 + lowPulse * 4.0;
            vec2 cell = sin(p * cellFreq + time * 0.5);
            float waveField = cell.x * cell.y;
            
            vec2 brownian = vec2(hash(uv + time), hash(uv - time * 1.3)) - 0.5;
            vec2 swarmPull = grad * (1.0 - abs(waveField)) * 0.08 * (1.0 + highPulse);
            vec2 vibration = grad * sin(waveField * 15.0 - time * 12.0) * 0.03 * highPulse + brownian * 0.008 * highPulse * baseLuma;
            vec2 warp = (swarmPull + vibration);
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Physical particle migration: swarm concentrates at zero-vibration nodes
            float swarmAccumulation = smoothstep(0.4, 0.0, abs(waveField));
            float swarmDepletion = smoothstep(0.0, 0.6, abs(waveField));
            
            vec3 finalColor = texColor.rgb * (1.0 - swarmDepletion * 0.6 * uIntensity);
            customColor = mix(activeColor1, activeColor2, swarmAccumulation * 0.8 + luma * 0.2);
            finalColor += customColor * swarmAccumulation * 2.2 * uIntensity * luma * (1.0 + highPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 3
            // --- VARIATION 3: TOPOLOGY ---
            float mouseDist = length(p);
            
            // Elevation frequency ripples morph dynamically based on audio mids/highs
            float ridgeDensity = 15.0 + lowPulse * 10.0 + highPulse * 30.0;
            float wave = sin(baseLuma * ridgeDensity - time * (3.0 + highPulse * 5.0) - mouseDist * 6.0 * uMouseSync);
            
            float contour = smoothstep(0.85, 0.98, wave) + smoothstep(0.85, 0.98, sin(baseLuma * 10.0 + time));
            contour = clamp(contour, 0.0, 1.0);
            
            vec2 warp = grad * contour * 0.06 * (1.0 + midPulse) + pDir * sin(mouseDist * 20.0 - time * 5.0) * 0.02 * uMouseSync;
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Topological ridge peak illumination and valley shading
            customColor = mix(activeColor1, activeColor2, sin(luma * 5.0 + time)*0.5+0.5);
            vec3 glowCol = customColor * contour * 4.0 * (1.0 + midPulse);
            
            vec3 finalColor = mix(texColor.rgb * 0.1, glowCol * 1.5, uIntensity);
            finalColor += customColor * contour * midPulse * luma;
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 4
            // --- VARIATION 4: PRIME PRIME ---
            float sectors = 13.0;
            float sectorAngle = mod(angle, 2.0 * PI / sectors) - PI / sectors;
            
            // Dynamic radial wave frequencies reacting to low beats and sparkles
            float radialFreq = 15.0 + lowPulse * 10.0 + highPulse * 22.0;
            float radialWave = sin(r * radialFreq - time * (5.0 + highPulse * 8.0)) * cos(angle * sectors);
            
            vec2 tanDir = vec2(-pDir.y, pDir.x);
            vec2 polarWarp = pDir * radialWave * 0.04 * (1.0 + lowPulse);
            polarWarp += tanDir * sectorAngle * 0.02 * lowPulse;
            
            vec2 warp = grad * 0.04 * radialWave + polarWarp;
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float rayGlow = smoothstep(0.04, 0.0, abs(sectorAngle)) * (1.0 - r * 0.5);
            float ringGlow = smoothstep(0.1, 0.0, abs(radialWave));
            
            // Physical ring sector accumulation
            vec3 finalColor = texColor.rgb * (1.0 - smoothstep(0.0, 0.5, abs(radialWave)) * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, sin(r * 8.0 - time)*0.5+0.5);
            finalColor += customColor * (rayGlow * 2.5 + ringGlow * 1.8) * luma * (1.0 + lowPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 5
            // --- VARIATION 5: METATRON ---
            float lattice = 0.0;
            
            // High frequency micro-vibrations across Metatron's circular lines driven by audio highs
            float rippleIntensity = 0.01 + highPulse * 0.03;
            float waveLattice = cos(angle * 12.0 + time * 5.0) * rippleIntensity;
            
            for(int i=0; i<6; i++) {
                float ang = float(i) * PI / 3.0 + time * 0.04;
                vec2 node = vec2(cos(ang), sin(ang)) * 0.35;
                float dNode = length(p - node);
                lattice += smoothstep(0.015, 0.0, abs(dNode - 0.25 - waveLattice)) * 0.5;
                lattice += smoothstep(0.02, 0.0, dNode - 0.04) * 0.5;
            }
            
            // Parallax multi-layered rotating outer waves
            float outerR1 = abs(r - 0.35 + sin(angle * 6.0 - time * 0.5) * 0.02);
            float outerR2 = abs(r - 0.6 + sin(angle * 3.0 + time * 0.3) * 0.03);
            lattice += smoothstep(0.02, 0.0, outerR1) * 0.4;
            lattice += smoothstep(0.015, 0.0, outerR2) * 0.3;
            
            vec2 warp = grad * (lattice + 0.5) * 0.05 * (1.0 + lowPulse);
            
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Physical Metatron lattice condensation
            vec3 finalColor = texColor.rgb * (1.0 - (1.0 - lattice) * 0.6 * uIntensity);
            customColor = mix(activeColor1, activeColor2, sin(r * 10.0 + angle - time * 2.0)*0.5+0.5);
            finalColor += customColor * lattice * 3.8 * luma * (1.0 + lowPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 6
            // --- VARIATION 6: OBSIDIAN GOLD ---
            // Sharp geometric resonance and dark stone texturing
            float hexLattice = sin(angle * 6.0) * cos(r * 20.0 - time * 2.0);
            float geoFreq = 25.0 + highPulse * 20.0;
            float obsidian = fbm(p * 15.0);
            
            vec2 warp = grad * (hexLattice * 0.05 + obsidian * 0.02) * (1.0 + lowPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float geoGlow = smoothstep(0.1, 0.0, abs(hexLattice));
            vec3 finalColor = texColor.rgb * (1.0 - geoGlow * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, luma + highPulse * 0.5);
            finalColor += customColor * geoGlow * 3.0 * luma * (1.0 + midPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 7
            // --- VARIATION 7: BIOLUMINESCENT ---
            // Abyssal web neon blue/cyan fractals
            float web = fbm(p * (10.0 + lowPulse * 5.0) - time);
            float tentacles = sin(angle * 8.0 + web * 10.0) * cos(r * 15.0 - time * 3.0);
            
            vec2 warp = grad * tentacles * 0.08 * (1.0 + midPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float biolum = smoothstep(0.2, 0.0, abs(tentacles - 0.5));
            vec3 finalColor = texColor.rgb * 0.8;
            customColor = mix(activeColor1, activeColor2, web);
            finalColor += customColor * biolum * 4.0 * luma * (1.0 + highPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 8
            // --- VARIATION 8: NEBULA PLASMA ---
            float plasma = fbm(p * 5.0 + vec2(sin(time), cos(time)));
            float cosmicWaves = sin(r * (20.0 + highPulse * 15.0) - time * 5.0 + plasma * 10.0);
            
            vec2 warp = pDir * cosmicWaves * 0.06 * (1.0 + lowPulse) + grad * plasma * 0.04;
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float energy = smoothstep(0.0, 0.5, plasma) * smoothstep(0.5, 0.0, abs(cosmicWaves));
            vec3 finalColor = texColor.rgb * (1.0 - energy * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, sin(r * 10.0 - time)*0.5+0.5);
            finalColor += customColor * energy * 5.0 * luma * (1.0 + lowPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 9
            // --- VARIATION 9: EMERALD MATRIX ---
            // Cybernetic lattice
            vec2 grid = fract(p * (30.0 + lowPulse * 10.0)) - 0.5;
            float lines = smoothstep(0.1, 0.0, abs(grid.x)) + smoothstep(0.1, 0.0, abs(grid.y));
            float dataStream = sin(p.y * 50.0 - time * 20.0);
            
            vec2 warp = grad * lines * 0.03 * (1.0 + midPulse) + vec2(0.0, dataStream * 0.02 * highPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            vec3 finalColor = texColor.rgb * (1.0 - lines * 0.8 * uIntensity);
            customColor = mix(activeColor1, activeColor2, dataStream * 0.5 + 0.5);
            finalColor += customColor * lines * 3.0 * luma * (1.0 + highPulse * 2.0);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 10
            // --- VARIATION 10: MERCURY CRIMSON ---
            float liquid = fbm(p * 8.0 - time * 0.5);
            float metalWaves = sin(r * 25.0 - time * 4.0 + liquid * 6.0);
            
            vec2 warp = grad * metalWaves * 0.07 * (1.0 + lowPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float reflect = smoothstep(0.3, 0.0, abs(metalWaves)) * liquid;
            vec3 finalColor = texColor.rgb * 0.7;
            customColor = mix(activeColor1, activeColor2, liquid);
            finalColor += customColor * reflect * 4.5 * luma * (1.0 + midPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 11
            // --- VARIATION 11: QUANTUM CRYSTAL ---
            float crys = abs(cos(angle * 4.0)) + abs(sin(angle * 4.0));
            float crystalGeo = sin(r * (30.0 + highPulse * 20.0) * crys - time * 2.0);
            
            vec2 warp = pDir * crystalGeo * 0.05 * (1.0 + midPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float shards = smoothstep(0.1, 0.0, abs(crystalGeo));
            vec3 finalColor = texColor.rgb * (1.0 - shards * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, crys * 0.5 + 0.5);
            finalColor += customColor * shards * 5.0 * luma * (1.0 + highPulse * 1.5);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 12
            // --- VARIATION 12: SOLAR FLARE ---
            float flares = fbm(vec2(angle * 5.0, r * 10.0 - time * 3.0));
            float sunburst = sin(angle * 12.0) * cos(r * 15.0 - time * 6.0 + flares * 5.0);
            
            vec2 warp = grad * sunburst * 0.06 * (1.0 + lowPulse) + pDir * flares * 0.03;
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float heat = smoothstep(0.4, 0.0, abs(sunburst)) * flares;
            vec3 finalColor = texColor.rgb * 0.6;
            customColor = mix(activeColor1, activeColor2, r + flares * 0.5);
            finalColor += customColor * heat * 6.0 * luma * (1.0 + lowPulse * 1.5);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#elif VARIATION == 13
            // --- VARIATION 13: AMETHYST FRACTAL ---
            float frac = fbm(p * 20.0 + time);
            float interlocking = sin(p.x * 25.0 + frac * 10.0) * cos(p.y * 25.0 - time * 2.0);
            
            vec2 warp = grad * interlocking * 0.05 * (1.0 + midPulse);
            vec2 dUv = clamp(uv + warp * uIntensity * window, 0.001, 0.999);
            texColor = texture2D(uTexture, dUv);
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            float edges = smoothstep(0.15, 0.0, abs(interlocking));
            vec3 finalColor = texColor.rgb * (1.0 - edges * 0.4 * uIntensity);
            customColor = mix(activeColor1, activeColor2, frac);
            finalColor += customColor * edges * 4.5 * luma * (1.0 + highPulse);
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);

#else
            // --- FALLBACK ---
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
#endif
        }
        `:"void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }";class jo{constructor(e){this.group=e,this.meshes=[],this.activeClassId=1,this.activeVariationId=0,this.materials={};const t=new d0(new Uint8Array([0,0,0,0]),1,1,Ht);t.needsUpdate=!0,this.dummyTexture=t;const n=new $t(2,2);for(let r=1;r<=22;r++){let o=nm(r);r<=16&&(o=o.replace("uniform float uIntensity;",`uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;`),o=o.replace("float intMod = max(0.1, uIntensity);","float intMod = max(0.1, uIntensity * (1.0 + uAudioLow * 3.0 + uAudioMid * 1.5));")),o.includes("uniform float uMouseSync;")||(o=o.replace("void main() {",`uniform vec2 uMouse;
        uniform float uMouseSync;
        void main() {`)),r!==22&&(o.includes("vec2 p = (vUv - 0.5) * 2.0;")?o=o.replace("vec2 p = (vUv - 0.5) * 2.0;",`vec2 p = (vUv - 0.5) * 2.0;
            p -= uMouse * uMouseSync * 0.5;`):o.includes("vec2 uv = (vUv - 0.5) * 2.0;")&&(o=o.replace("vec2 uv = (vUv - 0.5) * 2.0;",`vec2 uv = (vUv - 0.5) * 2.0;
            uv -= uMouse * uMouseSync * 0.5;`)));const a=`
                float safe_atan(float y, float x) {
                    float isZero = step(abs(x) + abs(y), 1e-10);
                    return atan(y, x + isZero * 1e-5);
                }
                float safe_atan(float y_over_x) {
                    return atan(y_over_x);
                }
                vec2 safe_normalize(vec2 v) {
                    float len = length(v);
                    return v / (len + step(len, 1e-10) * 1e-5);
                }
                vec3 safe_normalize(vec3 v) {
                    float len = length(v);
                    return v / (len + step(len, 1e-10) * 1e-5);
                }
                vec4 safe_normalize(vec4 v) {
                    float len = length(v);
                    return v / (len + step(len, 1e-10) * 1e-5);
                }
                #define atan safe_atan
                #define normalize safe_normalize
                
                ${o}
            `;this.materials[r]=new ft({vertexShader:tm,fragmentShader:a,defines:{VARIATION:0},uniforms:{uTime:{value:0},uAspect:{value:1},uColor1:{value:new xe(6334975)},uColor2:{value:new xe(11032055)},uIntensity:{value:1},uSpeed:{value:1},uHarmonics:{value:0},uVariation:{value:0},uAudioLow:{value:0},uAudioMid:{value:0},uAudioHigh:{value:0},uMouse:{value:new ce(0,0)},uAlpha:{value:1},uSpawnTime:{value:0},uTexture:{value:this.dummyTexture},uMouseSync:{value:0}},transparent:!0,depthWrite:!1,blending:Ye});const l=new qe(n,this.materials[r]);l.visible=!1,l.position.z=-1,this.meshes.push(l),this.group.add(l)}this._boundCymaticsToggleMouseSync=r=>{for(let s=1;s<=22;s++)this.materials[s]&&this.materials[s].uniforms.uMouseSync&&(this.materials[s].uniforms.uMouseSync.value=r.detail.sync)},window.addEventListener("cymaticsToggleMouseSync",this._boundCymaticsToggleMouseSync)}setPattern(e,t){if(this.activeClassId=e,this.activeVariationId=t,this.meshes.forEach((n,r)=>{n.visible=r+1===e}),this.materials[e]){if(this.materials[e].uniforms.uVariation.value=t,(e===17||e===18||e===19||e===20||e===21||e===22)&&this.materials[e].defines.VARIATION!==t&&(this.materials[e].defines.VARIATION=t,this.materials[e].needsUpdate=!0,this.materials[e].uniforms.uSpawnTime&&(this.materials[e].uniforms.uSpawnTime.value=performance.now()*.001%(2e3*Math.PI))),As[e]&&As[e][t]){const n=As[e][t];this.materials[e].uniforms.uColor1.value.setHex(n[0]),this.materials[e].uniforms.uColor2.value.setHex(n[1]);try{window.dispatchEvent(new CustomEvent("cymaticColorSync",{detail:{classId:e,color1:"#"+n[0].toString(16).padStart(6,"0"),color2:"#"+n[1].toString(16).padStart(6,"0")}}))}catch{}}if(e===22){const n=["binaural-assets/images/cymatics/cymatics_fractal_heart_1779756441610.png","binaural-assets/images/cymatics/cymatics_fluid_sdf_1779756501734.png","binaural-assets/images/cymatics/cymatics_particle_swarm_1779756471939.png","binaural-assets/images/cymatics/cymatics_quantum_topology_1779756531135.png","binaural-assets/images/cymatics/ai_cymatic_15_1779566362935.png","binaural-assets/images/cymatics/ai_cymatic_16_1779566377245.png","binaural-assets/images/cymatics/cymatic_sacred_gold_obsidian.png","binaural-assets/images/cymatics/cymatic_biolum_abyssal.png","binaural-assets/images/cymatics/cymatic_nebula_plasma.png","binaural-assets/images/cymatics/cymatic_emerald_cyber_matrix.png","binaural-assets/images/cymatics/cymatic_liquid_mercury_crimson.png","binaural-assets/images/cymatics/cymatic_quantum_crystal_lattice.png","binaural-assets/images/cymatics/cymatic_solar_flare_harmonics.png","binaural-assets/images/cymatics/cymatic_amethyst_hyperdimensional.png"];n[t]&&(this.textureCache||(this.textureCache={}),this.textureCache[t]?this.materials[e].uniforms.uTexture.value=this.textureCache[t]:new J0().load(n[t],s=>{s.generateMipmaps=!1,s.minFilter=Dt,this.textureCache[t]=s,this.activeClassId===e&&this.activeVariationId===t&&(this.materials[e].uniforms.uTexture.value=s)}))}this.materials[e]&&this.materials[e].uniforms.uMouseSync&&(this.materials[e].uniforms.uMouseSync.value=window.cymaticsMouseSync||0)}}setColor(e,t,n){if(this.materials[e]){const r=t===1?"uColor1":"uColor2";this.materials[e].uniforms[r].value.set(n)}}setParam(e,t,n){this.materials[e]&&(t==="intensity"?this.materials[e].uniforms.uIntensity.value=n:t==="speed"&&this.materials[e].uniforms.uSpeed?this.materials[e].uniforms.uSpeed.value=n:t==="harmonics"&&this.materials[e].uniforms.uHarmonics?this.materials[e].uniforms.uHarmonics.value=n:this.materials[e].uniforms[`u${t.charAt(0).toUpperCase()+t.slice(1)}`]&&(this.materials[e].uniforms[`u${t.charAt(0).toUpperCase()+t.slice(1)}`].value=n))}update(e,t,n){if(this.materials[this.activeClassId]&&(this.materials[this.activeClassId].uniforms.uTime.value=e,this.materials[this.activeClassId].uniforms.uAspect.value=window.innerWidth/(window.innerHeight||1),t&&(this.materials[this.activeClassId].uniforms.uAudioLow.value=t.bass||0,this.materials[this.activeClassId].uniforms.uAudioMid.value=t.mids||0,this.materials[this.activeClassId].uniforms.uAudioHigh.value=t.highs||0),n&&this.materials[this.activeClassId].uniforms.uMouse.value.set(n.x||0,n.y||0)),this.crossfadeData&&this.crossfadeData.active){let r=e-this.crossfadeData.startTime,s=Math.min(1,r/this.crossfadeData.duration);this.materials[this.crossfadeData.nextId]&&(this.materials[this.crossfadeData.nextId].uniforms.uAlpha.value=s),this.materials[this.crossfadeData.prevId]&&(this.materials[this.crossfadeData.prevId].uniforms.uAlpha.value=1-s),s>=1&&(this.crossfadeData.active=!1,this.activeClassId=this.crossfadeData.nextId)}}dispose(){if(this._boundCymaticsToggleMouseSync&&window.removeEventListener("cymaticsToggleMouseSync",this._boundCymaticsToggleMouseSync),this.dummyTexture&&(this.dummyTexture.dispose(),this.dummyTexture=null),this.meshes.forEach(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose(),this.group.remove(e)}),this.textureCache){for(const e in this.textureCache)this.textureCache[e]&&this.textureCache[e].dispose();this.textureCache={}}}}let ve=null;class Fi{static get CYMATIC_PATTERNS(){return[{name:"3D Fractal Heart",classId:19,variationId:0,cat:"advanced"},{name:"Fluid SDF Core",classId:19,variationId:1,cat:"advanced"},{name:"Particle Swarm",classId:19,variationId:2,cat:"advanced"},{name:"Quantum Topology",classId:19,variationId:3,cat:"advanced"},{name:"Prime Prime",classId:19,variationId:4,cat:"advanced"},{name:"Metatron's Grid",classId:19,variationId:5,cat:"advanced"},{name:"Sacred Resonance",classId:1,variationId:0,cat:"sacred"},{name:"Plasma Bloom",classId:2,variationId:1,cat:"fractal"},{name:"Neural Web",classId:3,variationId:2,cat:"complex"},{name:"Void Geometry",classId:4,variationId:3,cat:"geometry"},{name:"Mandelbrot Fold",classId:5,variationId:4,cat:"fractal"},{name:"Celestial",classId:6,variationId:5,cat:"radial"},{name:"Cosmic Knot",classId:7,variationId:6,cat:"complex"},{name:"Synchronicity",classId:8,variationId:7,cat:"sacred"},{name:"Aetheric Weaver",classId:9,variationId:8,cat:"advanced"}]}constructor(e,t={}){this.canvas=e,this.activeModes=t.activeModes||new Set,this.mode=t.mode||"none",this.mindWaveMode=t.mindWaveMode!==void 0?t.mindWaveMode:!0,this.galaxySunStyle=t.galaxySunStyle||"sun",this.currentCymaticData={name:"Fundamental Zenith",n:1,m:1,energy:.2},this.cymaticsHistory=[],this.cymaticsHistoryIndex=-1,this._cymaticDriftOffset=Math.random()*1e3,this.cyberConfig={logicMode:t.cyberLogicMode||"matrix",customText:t.cyberCustomText||"WELCOME",angle:t.cyberAngle||0,speed:t.cyberSpeedMultiplier||1,length:1,color:"#00FF41",rainbow:!0},this.matrixConfig={logicMode:t.matrixLogicMode||"interstellar",customText:t.matrixCustomText||"MINDWAVE",angle:0,speed:1,length:1,color:"#00FF41",rainbow:!1},this.initialized=!1,this._rainbowEnabled=t.rainbowEnabled||!1,this.isVisualizer3D=!0,this.overlayCanvas=document.getElementById("cyberCanvas"),this.overlayCtx=this.overlayCanvas?this.overlayCanvas.getContext("2d",{alpha:!0}):null,this.overlayCanvas&&(this.resizeOverlayCanvas(),this._boundResizeOverlayCanvas=()=>this.resizeOverlayCanvas(),window.addEventListener("resize",this._boundResizeOverlayCanvas)),this.matrixCyberStreams=[],this.currentCyberAngle=t.cyberAngle!==void 0?t.cyberAngle:0,this.cyberColorCustomized=!1;try{const r=localStorage.getItem("cyberThemeHistory");this.themeHistory=r?JSON.parse(r):[],this.lastCyberFamily=localStorage.getItem("cyberLastFamily")||""}catch{this.themeHistory=[],this.lastCyberFamily=""}this.currentLogoOpacity=.8,this.targetLogoOpacity=.8,ve=this,this.themeType=document.body.dataset.themeType||"dark";const n=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);this.batterySaver=t.batterySaver!==void 0?t.batterySaver:n,this.isLowPower=this.batterySaver||localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode"),this.lastFrameRenderTime=0,this.targetFPS=this.isLowPower?30:60,this.vibrationEnabled=typeof Ce<"u"&&Ce.visualVibration!==void 0?Ce.visualVibration:t.visualVibration!==void 0?t.visualVibration:!1,this._fpsRingBuffer=new Float64Array(60),this._fpsRingIndex=0,this._fpsRingCount=0,this.lastLodDegradation=0,this.currentLodLevel="high",this._tempColor=new xe,this._logoRenderCanvas=null,this.sphereGroup=new $e,this.particleGroup=new $e,this.lightspeedGroup=new $e,this.lavaGroup=new $e,this.fireplaceGroup=new $e,this.rainforestGroup=new $e,this.zenGardenGroup=new $e,this.oceanGroup=new $e,this.wavesGroup=new $e,this.cyberGroup=new $e,this.boxGroup=new $e,this.dragonGroup=new $e,this.galaxyGroup=new $e,this.mandalaGroup=new $e,this.cymaticsGroup=new $e,this.snowflakeGroup=new $e,this._snowData=null;try{this.scene=new f0,this.cymaticsCore=new jo(this.cymaticsGroup),[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup].forEach(a=>this.scene.add(a)),this.camera=new zt(75,e.width/e.height,.1,1e3),this.renderer=new Pl({canvas:e,alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),this.renderer.autoClear=!1,this.renderer.setClearColor(0,0),this.renderer.setSize(e.clientWidth,e.clientHeight);const s=this.isLowPower?1:2;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,s)),this.textures={},this.customColors={},this.customColor=null,this._isRendering=!1,this._freqDataArray=null,this.initEnvironment(),this.camera.position.z=5,this.handleLayoutChange=this.handleLayoutChange.bind(this);let o=null;this._boundResize=()=>{o||(o=requestAnimationFrame(()=>{this.resize(),this.handleLayoutChange(),o=null}))},window.addEventListener("resize",this._boundResize),window.addEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode=()=>{this.currentLodLevel!=="low"&&(console.log("[Visualizer] Safe Mode: Dropping LOD to 'low'."),this.degradeLOD(),this.degradeLOD())},window.addEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange=()=>{document.hidden?console.log("[Visualizer] Tab hidden, pausing render loop to save battery."):(console.log("[Visualizer] Tab visible, resuming render loop."),this.lastTime=performance.now()*.001%(2e3*Math.PI),this.active!==!1&&this.initialized&&this.render(Ce.analyserLeft,Ce.analyserRight))},document.addEventListener("visibilitychange",this._boundVisibilityChange),this._boundContextLost=a=>{a.preventDefault(),console.warn("[Visualizer] WebGL context LOST. Halting render loop."),this.active=!1,Ce.animationId&&(cancelAnimationFrame(Ce.animationId),Ce.animationId=null)},e.addEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored=()=>{console.log("[Visualizer] WebGL context RESTORED. Reinitializing...");try{for(this.initialized=!1,this._freqDataArray=null,this.cymaticsCore&&this.cymaticsCore.dispose();this.cymaticsGroup.children.length>0;)this.cymaticsGroup.remove(this.cymaticsGroup.children[0]);if(this.cymaticsCore=new jo(this.cymaticsGroup),this.currentCymaticData&&this.setCymaticByName(this.currentCymaticData.name),this.textures)for(const a in this.textures)this.textures[a]&&(this.textures[a].needsUpdate=!0);this.initEnvironment(),this.updateVisibility(),this.initialized=!0,this.active=!0,this.lastTime=performance.now()*.001%(2e3*Math.PI),Ce.animationId&&cancelAnimationFrame(Ce.animationId),this._isRendering=!1,this.render(Ce.analyserLeft,Ce.analyserRight)}catch(a){console.error("[Visualizer] Failed to recover from context loss:",a)}},e.addEventListener("webglcontextrestored",this._boundContextRestored),this.resize(),setTimeout(this.handleLayoutChange,100),this._boundThemeChange=a=>{if(a.detail&&a.detail.type){const l=a.detail.type;this.themeType!==l&&(this.themeType=l,console.log(`[Visualizer] Theme type changed to: ${l}. Updating logo texture.`),this.updateLogoTexture())}},window.addEventListener("themeChanged",this._boundThemeChange),this.speedMultiplier=1,this.brightnessMultiplier=1,this.lastTime=performance.now()*.001%(2e3*Math.PI),this.simTime=0,this.targetFPS=60,this.lastFrameRenderTime=0,this.active=!0,this.updateVisibility(),this.initialized=!0,this.initOverlayLogo(),window.viz3D=this,console.log("[Viz] Visualizer3D Hard-Linked to Global Scope.")}catch(r){console.error("Three.js Init Failed:",r),this.initialized=!1}}resize(){if(!this.renderer||!this.canvas||!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/(t||1),this.camera.updateProjectionMatrix(),this.handleLayoutChange()}handleLayoutChange(){!this.renderer||!this.camera||(this.camera.clearViewOffset(),console.log("[Visualizer] Layout update: Centered background mode (Full Window)"))}resizeOverlayCanvas(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight)}generateCyberStyle(){const e=this.overlayCanvas,t=this.overlayCtx;if(!e||!t)return;this.matrixCyberStreams=[];const n=Math.max(11,Math.min(21,Math.floor(e.width/50)));this.isLowPower=localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode");let r=Math.ceil(e.width/n);this.isLowPower||(r*=1.5);let s=window.getCurrentTheme?window.getCurrentTheme():{color:"#2dd4bf"};this.resizeOverlayCanvas(),this.cyberColorCustomized=!1;const o=[{name:"System Yellow",color:"#FFFF00",family:"yellow"},{name:"Neon Pink",color:"#FF1493",family:"pink"},{name:"Chrome Static",color:"#C0C0C0",family:"mono"},{name:"Royal Data",color:"#4169E1",family:"blue"},{name:"White Noise",color:"#FFFFFF",family:"mono"},{name:"Cyan Future",color:"#00FFFF",family:"blue"},{name:"Lime Access",color:"#32CD32",family:"green"},{name:"Purple Haze",color:"#800080",family:"purple"},{name:"Emerald Link",color:"#50C878",family:"green"},{name:"Ice Blue",color:"#A5F2F3",family:"blue"},{name:"sentAIent Blue",color:"#60A9FF",family:"blue"},{name:"Rainbow Surge",color:"rainbow",family:"rainbow"}],a=this.lastCyberFamily||"";let l=o.filter(d=>!this.themeHistory.includes(d.name));const c=l.filter(d=>d.family!==a);c.length>0&&(l=c);let u=l;if(u.length===0){const d=this.themeHistory[this.themeHistory.length-1];u=o.filter(g=>g.name!==d)}const h=u[Math.floor(Math.random()*u.length)];this.themeHistory.push(h.name),this.themeHistory.length>5&&this.themeHistory.shift(),this.lastCyberFamily=h.family;try{localStorage.setItem("cyberThemeHistory",JSON.stringify(this.themeHistory)),localStorage.setItem("cyberLastFamily",this.lastCyberFamily)}catch(d){console.warn("LocalStorage failed",d)}this.cyberSpeedMultiplier===void 0&&(this.cyberSpeedMultiplier=.2),this.cyberLengthMultiplier===void 0&&(this.cyberLengthMultiplier=.7);const f=document.getElementById("cyberRainbowToggle");if(f&&this.cyberRainbowMode===void 0&&(this.cyberRainbowMode=!0,this.cyberConfig.rainbow=!0,f.checked=!0),!this.cyberRainbowMode&&s.color!=="rainbow"){this.cyberColor=s.color;const d=document.getElementById("cyberColorPicker");d&&(d.value=this.cyberColor)}for(let d=0;d<r;d++){const g=Math.random(),v=Math.floor(8+g*11),m=(2+g*8+Math.random()*2)*this.cyberSpeedMultiplier;this.matrixCyberStreams.push({x:d*n,y:Math.random()*this.overlayCanvas.height*1.5-this.overlayCanvas.height*.5,baseSpeed:m,opacity:.2+g*.8,size:v,chars:[],color:s.color!=="rainbow"?s.color:"#FFFFFF"})}this.updateCyberStrings(),this.matrixCyberStreams.sort((d,g)=>d.size-g.size)}renderCyberCyber(){const e=this.activeModes.has("cyber");if(!this.overlayCtx||!this.matrixCyberStreams||!e)return;const t=this.overlayCtx,n=this.overlayCanvas;t.clearRect(0,0,n.width,n.height);const r=this.activeModes.size>1;t.fillStyle=r?"rgba(0, 0, 0, 0.4)":"rgba(0, 0, 0, 0.85)",t.fillRect(0,0,n.width,n.height),t.save(),t.textAlign="center";const s=this.cyberConfig,o=s.speed||1,a=s.length||1;s.angle!==0&&(t.translate(n.width/2,n.height/2),t.rotate(s.angle*Math.PI/180),t.translate(-n.width/2,-n.height/2));const l=20,c=Date.now()*.1;t.textBaseline="middle";let u=-1;this.matrixCyberStreams.forEach((h,f)=>{h.y+=h.baseSpeed*o;let d=Math.max(3,Math.floor(l*a));(this.isLowPower||this.currentLodLevel==="low")&&(d=Math.floor(d*.4)),h.y-d*h.size>n.height*1.5&&(h.y=0);const g="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";h.size!==u&&(t.font=`${h.size}px monospace`,u=h.size);const v=this.isLowPower&&this.currentLodLevel==="low"?2:1;for(let m=0;m<d&&m<h.chars.length;m+=v){!h.isTextMode&&Math.random()<.02&&(h.chars[m]=g.charAt(Math.floor(Math.random()*g.length)));const p=h.chars[m],_=h.y-m*h.size;if(_<-h.size*2||_>n.height*1.5)continue;const x=1-m/d,S=Math.pow(x,.4)*(h.opacity*1.2);if(t.globalAlpha=Math.min(1,S),this.cyberRainbowMode){const C=(c+f*15+m*5)%360;t.fillStyle=`hsl(${C}, 100%, 60%)`}else t.fillStyle=h.color||this.cyberColor;t.fillText(p,h.x,_)}}),t.shadowBlur=0,t.globalAlpha=1,t.restore()}initSphere(){var o;const e=new li(2,2),t=new Lt({color:6334975,wireframe:!0,transparent:!0,opacity:.5});this.sphere=new qe(e,t);const n=new li(1.8,1),r=new Lt({color:6334975,transparent:!0,opacity:.1,blending:Ye});this.core=new qe(n,r),this.sphereGroup.add(this.sphere),this.sphereGroup.add(this.core),this.sphereGroup.visible=!1;const s=((o=this.customColors)==null?void 0:o.sphere)||this.customColor;s&&(this.sphere.material.color.copy(s),this.core.material.color.copy(s))}initLightspeed(){const t=new et,n=new Float32Array(2e3*3);for(let r=0;r<2e3*3;r++)n[r]=(Math.random()-.5)*80;t.setAttribute("position",new ut(n,3)),this.lightspeedMaterial=new ft({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new xe(3003583)},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:Ye,depthWrite:!1}),this.lightspeed=new an(t,this.lightspeedMaterial),this.lightspeedGroup.add(this.lightspeed)}initParticles(){const e=this.batterySaver?400:1e3,t=new et,n=new Float32Array(e*3),r=new Float32Array(e*3);for(let s=0;s<e;s++){const o=s*3;n[o]=(Math.random()-.5)*60,n[o+1]=(Math.random()-.5)*60,n[o+2]=(Math.random()-.5)*80;const a=Math.random();a<.3?(r[o]=.4,r[o+1]=.7,r[o+2]=1):a<.6?(r[o]=.3,r[o+1]=.9,r[o+2]=.95):a<.85?(r[o]=.6,r[o+1]=.4,r[o+2]=1):(r[o]=.9,r[o+1]=.9,r[o+2]=1)}t.setAttribute("position",new ut(n,3)),t.setAttribute("color",new ut(r,3)),this.particleMaterial=new ft({uniforms:{uTime:{value:0},uSpeed:{value:1},uSize:{value:.4},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:Ye,depthWrite:!1}),this.particles=new an(t,this.particleMaterial),this.particleGroup.add(this.particles),this.particleGroup.visible=!1}initBox(){var u;this.boxOuter=new $e;const e=new ws(new Mn(3,3,3)),t=new ri({color:16777215,transparent:!0,opacity:.9,blending:Ye}),n=new ri({color:3900150,transparent:!0,opacity:.5,blending:Ye});this.boxOuter.add(new Ai(e,t));for(let h=1;h<=3;h++){const f=new Ai(e,n);f.scale.setScalar(1+h*.012),this.boxOuter.add(f)}const r=new ws(new Mn(2,2,2)),s=new ri({color:14742270,transparent:!0,opacity:.8,blending:Ye}),o=new ri({color:6333946,transparent:!0,opacity:.4,blending:Ye});this.boxInner=new $e,this.boxInner.add(new Ai(r,s));for(let h=1;h<=2;h++){const f=new Ai(r,o);f.scale.setScalar(1+h*.015),this.boxInner.add(f)}const a=new ws(new Mn(3.05,3.05,3.05)),l=new ri({color:9684477,transparent:!0,opacity:.8,blending:Ye});this.boxEdges=new Ai(a,l),this.boxGroup.add(this.boxOuter),this.boxGroup.add(this.boxInner),this.boxGroup.add(this.boxEdges),this.boxGroup.visible=!1;const c=((u=this.customColors)==null?void 0:u.box)||this.customColor;c&&(this.boxOuter.children.forEach(h=>h.material.color.copy(c)),this.boxInner.children.forEach(h=>h.material.color.copy(c)),this.boxEdges&&this.boxEdges.material&&this.boxEdges.material.color.copy(c))}initDragon(){var f;this.dragonDummy=new pt,this.dragonLength=80;const e=new li(.8,1),t=new Lt({color:15680580,wireframe:!0,transparent:!0,opacity:.8,blending:Ye}),n=new li(.5,1),r=new Lt({color:16096779,wireframe:!1,transparent:!0,opacity:.6,blending:Ye});this.dragonBodyInstanced=new Uo(e,t,this.dragonLength),this.dragonGlowInstanced=new Uo(n,r,this.dragonLength);const s=new Ui(1.5,3.5,5);s.rotateX(Math.PI/2);const o=new Lt({color:16638023,wireframe:!0,transparent:!0,opacity:.9,blending:Ye});this.dragonHead=new qe(s,o),this.dragonPearlGroup=new $e;const a=new ci(1,16,16),l=new Lt({color:3718648,wireframe:!1,transparent:!0,opacity:.9,blending:Ye}),c=new ci(1.3,16,16),u=new Lt({color:8246268,wireframe:!0,transparent:!0,opacity:.5,blending:Ye});this.dragonPearl=new qe(a,l),this.dragonPearlHalo=new qe(c,u),this.dragonPearlGroup.add(this.dragonPearl),this.dragonPearlGroup.add(this.dragonPearlHalo),this.dragonGroup.add(this.dragonBodyInstanced),this.dragonGroup.add(this.dragonGlowInstanced),this.dragonGroup.add(this.dragonHead),this.dragonGroup.add(this.dragonPearlGroup),this.dragonGroup.visible=!1;const h=((f=this.customColors)==null?void 0:f.dragon)||this.customColor;h&&this.updateDragonColor(h)}updateGalaxyColor(e){if(this.galaxySunMesh&&this.galaxySunMesh.traverse(t=>{t.isMesh&&t.material&&t.material.color.copy(e)}),this.galaxyStars&&this.galaxyStars.geometry){const t={};e.getHSL(t);const n=(t.h+.5)%1,r=this.galaxyStars.geometry.getAttribute("color");if(r){const s=r.count,o=this._tempColor;for(let a=0;a<s;a++){const l=a/s,c=l<.2?.8:l<.5?.6:.4+Math.random()*.15,u=.6+Math.random()*.3;o.setHSL(n,u,c),r.setXYZ(a,o.r,o.g,o.b)}r.needsUpdate=!0}}}updateDragonColor(e){if(!this.dragonBodyInstanced)return;this.dragonBodyInstanced.material.color.copy(e),this.dragonHead.material.color.copy(e);const t={};e.getHSL(t);const n=(t.h+.5)%1,r=new xe().setHSL(n,t.s,t.l);this.dragonGlowInstanced.material.color.copy(r)}initGalaxy(){const e=this.batterySaver?500:1500,t=new et,n=[],r=[],s=[];for(let l=0;l<e;l++){const c=l/e*Math.PI*10,u=2.5+l/e*20+Math.random()*2,h=l%4*(Math.PI*2/4),f=Math.max(.5,l/e*4),d=Math.cos(c+h)*u+(Math.random()-.5)*f,g=(Math.random()-.5)*1.5,v=Math.sin(c+h)*u+(Math.random()-.5)*f;n.push(d,g,v);const m=l/e;m<.2?r.push(1,.95,.7):m<.5?r.push(.7+Math.random()*.3,.8,1):r.push(.4+Math.random()*.2,.3+Math.random()*.3,.8+Math.random()*.2),s.push(Math.random()<.05?.4+Math.random()*.3:.08+Math.random()*.15)}t.setAttribute("position",new Fe(n,3)),t.setAttribute("color",new Fe(r,3)),t.setAttribute("size",new Fe(s,1));const o=this.createStarTexture(),a=new Tr({size:.25,vertexColors:!0,map:o,transparent:!0,opacity:.9,blending:Ye,depthWrite:!1,sizeAttenuation:!0});this.galaxyStars=new an(t,a),this.galaxyGroup.add(this.galaxyStars),this.galaxySunStyle=this.galaxySunStyle||"sun",this.createGalaxySun(this.galaxySunStyle),this.galaxyGroup.visible=!1}createGalaxySun(e){this.galaxySunMesh&&(this.galaxyGroup.remove(this.galaxySunMesh),this.galaxySunMesh=null),this.galaxySunMesh=new $e;const t=new Lt({color:4892415,transparent:!0,opacity:.85,blending:Ye,depthWrite:!1,side:yt}),n=new $e;if(e==="sun2"){const r=t.clone();r.side=cn;const s=new Ur(1.5,.25,16,64);n.add(new qe(s,r));const o=8,a=new Ui(.4,2.7,4);a.translate(0,2.7/2,0);const l=new Ui(.2,1.7,4);l.translate(0,1.7/2,0);for(let c=0;c<o;c++){const u=c/o*Math.PI*2,h=new qe(a,r);h.rotation.z=-u,h.position.set(Math.sin(u)*1.5,Math.cos(u)*1.5,0),n.add(h);const f=u+Math.PI/o,d=new qe(l,r);d.rotation.z=-f,d.position.set(Math.sin(f)*1.5,Math.cos(f)*1.5,0),n.add(d)}}else if(e==="sun3"){const r={uTime:{value:0},uColor:{value:t.color},uBassIntt:{value:0}};this.galaxySunUniforms=r;const s=`
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
            `,a=new ft({vertexShader:s,fragmentShader:o,uniforms:r,transparent:!0,blending:Ye,depthWrite:!1,side:yt}),l=new ci(2,64,64),c=new qe(l,a);n.add(c);const u=new Lt({color:t.color,transparent:!0,opacity:.15,blending:Ye,depthWrite:!1,side:Ut}),h=new ci(3,32,32);n.add(new qe(h,u))}else{const r=new Ur(1.5,.12,8,64);n.add(new qe(r,t));const s=8;for(let o=0;o<s;o++){const a=o/s*Math.PI*2,l=new zs;l.moveTo(-.4,0),l.lineTo(.4,0),l.lineTo(0,2.7),l.lineTo(-.4,0);const c=new Dr(l),u=new qe(c,t);u.rotation.z=-a,u.position.set(Math.sin(a)*1.5,Math.cos(a)*1.5,0),n.add(u);const h=a+Math.PI/s,f=new zs;f.moveTo(-.2,0),f.lineTo(.2,0),f.lineTo(0,1.7),f.lineTo(-.2,0);const d=new Dr(f),g=new qe(d,t);g.rotation.z=-h,g.position.set(Math.sin(h)*1.5,Math.cos(h)*1.5,0),n.add(g)}}this.galaxySunMesh.add(n),this.galaxySunMesh.position.set(0,0,.1),this.galaxyGroup.add(this.galaxySunMesh)}setGalaxySunStyle(e){e!=="sun"&&e!=="sun2"&&e!=="sun3"||(this.galaxySunStyle=e,this.galaxyGroup&&this.galaxyGroup.children.length>0&&this.createGalaxySun(e))}setGalaxySunRotation(e,t){e==="x"&&(this.sunRotationSpeedX=parseFloat(t)),e==="y"&&(this.sunRotationSpeedY=parseFloat(t)),e==="z"&&(this.sunRotationSpeedZ=parseFloat(t))}createStarTexture(){if(this.textures.star)return this.textures.star;const e=64,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),r=e/2,s=e/2;n.clearRect(0,0,e,e);const o=n.createRadialGradient(r,s,0,r,s,e/2);return o.addColorStop(0,"rgba(255, 255, 255, 1.0)"),o.addColorStop(.1,"rgba(255, 255, 240, 0.8)"),o.addColorStop(.25,"rgba(255, 255, 200, 0.3)"),o.addColorStop(.5,"rgba(200, 200, 255, 0.1)"),o.addColorStop(1,"rgba(100, 100, 255, 0)"),n.fillStyle=o,n.fillRect(0,0,e,e),n.fillStyle="rgba(255, 255, 255, 0.6)",n.beginPath(),n.moveTo(0,s-1),n.lineTo(r,s-.5),n.lineTo(e,s-1),n.lineTo(e,s+1),n.lineTo(r,s+.5),n.lineTo(0,s+1),n.closePath(),n.fill(),n.beginPath(),n.moveTo(r-1,0),n.lineTo(r-.5,s),n.lineTo(r-1,e),n.lineTo(r+1,e),n.lineTo(r+.5,s),n.lineTo(r+1,0),n.closePath(),n.fill(),n.beginPath(),n.arc(r,s,2,0,Math.PI*2),n.fillStyle="rgba(255, 255, 255, 1.0)",n.fill(),this.textures.star=new Ci(t),this.textures.star}initMandala(){var s;this.mandalaRings=[];const e=[2450411,15357964,3900150,16347926,12573694];for(let o=0;o<5;o++){const a=1.2+o*.8,l=6+o*6,c=new Qs(a-.05,a+.05,l),u=new Lt({color:e[o],side:yt,transparent:!0,opacity:.4-o*.05,blending:Ye}),h=new qe(c,u);h.userData={speed:(.01+o*.005)*(o%2===0?1:-1),segments:l},this.mandalaRings.push(h),this.mandalaGroup.add(h)}const t=new $s(.3,32),n=new Lt({color:16347926,transparent:!0,opacity:.6,blending:Ye});this.mandalaCenter=new qe(t,n),this.mandalaGroup.add(this.mandalaCenter),this.mandalaGroup.visible=!1;const r=(s=this.customColors)==null?void 0:s.mandala;r&&(this.mandalaRings.forEach(o=>o.material.color.copy(r)),this.mandalaCenter.material.color.copy(r))}createSnowflakeTexture(){if(this.textures.snowflake)return this.textures.snowflake;const e=128,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),r=e/2,s=e/2;n.clearRect(0,0,e,e);const o=n.createRadialGradient(r,s,0,r,s,e*.5);o.addColorStop(0,"rgba(200,230,255,0.5)"),o.addColorStop(.4,"rgba(180,220,255,0.15)"),o.addColorStop(1,"rgba(150,200,255,0)"),n.fillStyle=o,n.fillRect(0,0,e,e),n.strokeStyle="rgba(220,240,255,1.0)",n.lineCap="round";for(let a=0;a<6;a++){const l=a/6*Math.PI*2;n.save(),n.translate(r,s),n.rotate(l),n.lineWidth=2.5,n.beginPath(),n.moveTo(0,0),n.lineTo(0,-52),n.stroke();const c=[{d:18,len:14,angle:Math.PI/4},{d:32,len:20,angle:Math.PI/4},{d:46,len:10,angle:Math.PI/5}];n.lineWidth=1.5,c.forEach(({d:u,len:h,angle:f})=>{[1,-1].forEach(d=>{n.beginPath(),n.moveTo(0,-u),n.lineTo(d*h*Math.cos(Math.PI/2-f),-u-h*Math.sin(Math.PI/2-f)),n.stroke()})}),n.restore()}n.beginPath();for(let a=0;a<6;a++){const l=a/6*Math.PI*2-Math.PI/6,c=r+Math.cos(l)*4,u=s+Math.sin(l)*4;a===0?n.moveTo(c,u):n.lineTo(c,u)}return n.closePath(),n.fillStyle="rgba(255, 255, 255, 0.8)",n.fill(),this.textures.snowflake=new Ci(t),this.textures.snowflake}initSnowflake(){for(;this.snowflakeGroup.children.length>0;){const d=this.snowflakeGroup.children[0];this.snowflakeGroup.remove(d),d.traverse(g=>{if(g.geometry&&g.geometry.dispose(),g.material){if(g.material.map&&g.material.map.dispose(),g.material.uniforms)for(const v in g.material.uniforms)g.material.uniforms[v]&&g.material.uniforms[v].value&&g.material.uniforms[v].value.dispose&&g.material.uniforms[v].value.dispose();g.material.dispose()}})}this._snowData=null;const e=700,t=new Float32Array(e*3),n=new Float32Array(e),r=new Float32Array(e),s=new Float32Array(e),o=new Float32Array(e),a=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){const g=d*3;t[g]=(Math.random()-.5)*80,t[g+1]=(Math.random()-.5)*60,t[g+2]=-40+Math.random()*35;const v=(t[g+2]+40)/35;n[d]=1.5+v*8,r[d]=.2+v*.6,s[d]=Math.random()*Math.PI*2,o[d]=.015+Math.random()*.04+v*.03,a[d]=.01+Math.random()*.02,l[d]=.4+Math.random()*.8}const c=new et;c.setAttribute("position",new ut(t,3)),c.setAttribute("aSize",new ut(n,1)),c.setAttribute("aOpacity",new ut(r,1));const u=this.createSnowflakeTexture(),h=new ft({uniforms:{uTexture:{value:u},uColor:{value:this.customColor?this.customColor.clone():new xe(10875883)},uIntensity:{value:0},uSizeMultiplier:{value:1},uGlowAmount:{value:.5}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:Ye}),f=new an(c,h);this.snowflakeGroup.add(f),this._snowData={count:e,positions:t,phases:s,speeds:o,drifts:a,driftFreqs:l,points:f,material:h,spinMeshes:[],spinSpeeds:[]},console.log("[Viz] ❄️ Real snowfall initialized —",e,"crystals")}setSnowSize(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uSizeMultiplier.value=Math.max(.2,Math.min(4,e)),console.log("[Viz] Snow Size Override:",e))}setSnowGlow(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uGlowAmount.value=Math.max(0,Math.min(1,e)),console.log("[Viz] Snow Glow Override:",e))}initLava(){var o;this.lavaBlobs=[];const e=16;this.lavaUniforms={uBlobs:{value:[]},uColor:{value:new xe(((o=Ce.visualColors)==null?void 0:o.lava)||16737792)},uSecondaryColor:{value:new xe(16755200)},uTime:{value:0},uIntensity:{value:0},uResolution:{value:new ce(window.innerWidth,window.innerHeight)}};for(let a=0;a<e;a++)this.lavaUniforms.uBlobs.value.push(new it(0,-100,0,0));const t=new ft({uniforms:this.lavaUniforms,vertexShader:`
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
            `,transparent:!0,blending:Ye,depthWrite:!1,side:yt}),n=new $t(100,100),r=new qe(n,t);r.position.z=-5,[{count:5,minSize:1,maxSize:1.5},{count:7,minSize:1.5,maxSize:2.2},{count:4,minSize:2.2,maxSize:3.5}].forEach(a=>{for(let l=0;l<a.count;l++){const c=a.minSize+Math.random()*(a.maxSize-a.minSize),u=["heating","rising","cooling","falling"],h=u[Math.floor(Math.random()*u.length)],f=-18+Math.random()*4,d=18+Math.random()*4;let g=0,v=.5;h==="heating"?(g=f,v=Math.random()*.5):h==="rising"?(g=f+Math.random()*(d-f),v=.8+Math.random()*.2):h==="cooling"?(g=d,v=1-Math.random()*.3):h==="falling"&&(g=d-Math.random()*(d-f),v=.2+Math.random()*.3),this.lavaBlobs.push({position:new R((Math.random()-.5)*12,g,(Math.random()-.5)*6),material:{uniforms:{uTemp:{value:0},uIntensity:{value:0},uTime:{value:0}}},userData:{baseSize:c,state:h,temperature:v,floatMin:f,floatMax:d,heatRate:.15+Math.random()*.3,coolRate:.15+Math.random()*.3,riseSpeed:(.04+Math.random()*.05)/(c*.5),fallSpeed:(.05+Math.random()*.05)/(c*.5),driftPhase:Math.random()*Math.PI*2,driftSpeed:.01+Math.random()*.02}})}}),this.lavaGroup.add(r),this.lavaGroup.visible=!1,console.log("[Visualizer] Thermal Fluid Dynamics (Lava V2) globally initialized.")}initFireplace(){const n=new $t(100,80);this.fireMaterial=this.createFireShader(),this.fireMesh=new qe(n,this.fireMaterial),this.fireMesh.position.set(0,0,-15),this.fireMesh.renderOrder=10,this.fireplaceGroup.add(this.fireMesh),this.fireLight=new K0(16737792,5,200),this.fireLight.position.set(0,0,30),this.fireplaceGroup.add(this.fireLight);const r=650,s=new et,o=[];for(let a=0;a<r;a++)o.push((Math.random()-.5)*100,-20+Math.random()*40,-15+(Math.random()-.5)*20);s.setAttribute("position",new Fe(o,3)),this.emberMat=new Tr({color:16763904,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.8,blending:Ye,depthWrite:!1}),this.embers=new an(s,this.emberMat),this.fireplaceGroup.add(this.embers),this.emberVelocities=new Float32Array(r);for(let a=0;a<r;a++)this.emberVelocities[a]=.02+Math.random()*.05;this.fireplaceGroup.position.set(0,0,0),this.fireplaceGroup.visible=!1,console.log("[Visualizer] Real Fireplace initialized")}createFireShader(){return new ft({uniforms:{uTime:{value:0},uColor:{value:new xe(16729088)},uSpeed:{value:1},uIntensity:{value:1}},vertexShader:`
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
            `,transparent:!0,side:yt,blending:Ye,depthWrite:!1})}initRainforest(){const e=this.batterySaver?400:1e3,t=new et,n=new Float32Array(e*3),r=new Float32Array(e*3);for(let s=0;s<e;s++){const o=s*3;n[o]=(Math.random()-.5)*60,n[o+1]=(Math.random()-.5)*40,n[o+2]=(Math.random()-.5)*40,r[o]=Math.random(),r[o+1]=Math.random(),r[o+2]=.08+Math.random()*.12}t.setAttribute("position",new ut(n,3)),t.setAttribute("aRandom",new ut(r,3)),this.rainMaterial=new ft({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new xe(8965375)},uIntensity:{value:.6}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:Ye}),this.raindrops=new an(t,this.rainMaterial),this.rainforestGroup.add(this.raindrops),this.rainforestGroup.visible=!1}initZenGarden(){const e=this.batterySaver?200:500,t=new et,n=new Float32Array(e*3),r=new Float32Array(e*3);for(let o=0;o<e;o++){const a=o*3;n[a]=(Math.random()-.5)*40,n[a+1]=(Math.random()-.5)*20,n[a+2]=(Math.random()-.5)*40,r[a]=Math.random(),r[a+1]=Math.random(),r[a+2]=Math.random()*Math.PI*2}t.setAttribute("position",new ut(n,3)),t.setAttribute("aRandom",new ut(r,3)),this.petalMaterial=new ft({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new xe(16758725)},uIntensity:{value:.8}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1}),this.petals=new an(t,this.petalMaterial),this.zenGardenGroup.add(this.petals);const s=new $t(40,40,32,32);this.zenWaterMaterial=new Lt({color:2245734,transparent:!0,opacity:.3,side:yt}),this.zenWater=new qe(s,this.zenWaterMaterial),this.zenWater.rotation.x=-Math.PI/2,this.zenWater.position.y=-5,this.zenGardenGroup.add(this.zenWater),this.zenGardenGroup.visible=!1,console.log("[Visualizer] Zen Garden initialized (Shader Mode)")}initOcean(){var a;const e=new $t(300,100,128,64);this.oceanWave=new qe(e,new ft({uniforms:{uTime:{value:0},uColor:{value:this.customColor?this.customColor.clone():new xe(43775)},uNormBass:{value:0},uBeatPulse:{value:0}},vertexShader:`
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
            `,wireframe:!0,transparent:!0,side:yt})),this.oceanWave.rotation.x=-Math.PI/3,this.oceanWave.position.y=-2,this.oceanGroup.add(this.oceanWave);const t=300,n=new et,r=[];for(let l=0;l<t;l++)r.push((Math.random()-.5)*50),r.push(-2.5+Math.random()*.5),r.push((Math.random()-.5)*40);n.setAttribute("position",new Fe(r,3));const s=new Tr({color:16777215,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.5,blending:Ye,depthWrite:!1});this.oceanFoam=new an(n,s),this.oceanGroup.add(this.oceanFoam),this.oceanGroup.visible=!1;const o=((a=this.customColors)==null?void 0:a.ocean)||this.customColor;o&&(this.oceanWave&&this.oceanWave.material.color.copy(o),this.oceanFoam&&this.oceanFoam.material.color.copy(o)),console.log("[Visualizer] Original Ocean (Wireframe) restored")}createCyberTexture(e=this.matrixConfig){const n=document.createElement("canvas");n.width=1024,n.height=1024;const r=n.getContext("2d");r.fillStyle="rgba(0,0,0,0)",r.fillRect(0,0,1024,1024),r.shadowBlur=12,r.shadowColor="rgba(255, 255, 255, 0.4)",r.font='bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace',r.fillStyle="#ffffff",r.textAlign="center",r.textBaseline="middle";const s=8,o=8,a=1024/s,l=1024/o;let c="🪷MINDWAVE";const u=e.logicMode,h=e.customText;u==="custom"||u==="txt"?c="🪷"+(h&&h.length>0?h:"WELCOME TO MINDWAVE"):(u==="random"||u==="rnd"||u==="matrix"||u==="int"||u==="interstellar")&&(c="");const f=u==="matrix"||u==="int"||u==="interstellar"?[]:["LOGO",...c],d=f.length;for(let v=0;v<64;v++){const m=v%8,p=Math.floor(v/8);r.fillStyle="rgba(0,0,0,0)",r.fillRect(m*a,p*l,a,l),r.save(),r.translate(m*a+a/2,p*l+l/2);let _="",x=!1;if(v<d){const S=f[v];S==="LOGO"?x=!0:_=S}else{const C="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";_=C.charAt(Math.floor(Math.random()*C.length)),Math.random()>.5&&(r.save(),r.scale(-1,1),r.fillStyle="#ffffff",r.font="bold 80px monospace",r.fillText(_,0,0),r.restore(),_="")}if(_||x)if(r.fillStyle="#ffffff",r.font="bold 80px monospace",r.textAlign="center",r.textBaseline="middle",r.shadowBlur=16,r.shadowColor="rgba(255, 255, 255, 0.6)",x)if(this.logoImage){const T=document.createElement("canvas");T.width=100,T.height=100;const A=T.getContext("2d");A.imageSmoothingEnabled=!0,A.imageSmoothingQuality="high",A.drawImage(this.logoImage,0,0,100,100);const F=A.getImageData(0,0,100,100),y=F.data;for(let w=0;w<y.length;w+=4){const W=180+(y[w]+y[w+1]+y[w+2])/3/255*75;y[w]=W,y[w+1]=W,y[w+2]=W}A.putImageData(F,0,0),r.imageSmoothingEnabled=!0,r.imageSmoothingQuality="high",r.drawImage(T,-50,-50,100,100)}else!this.logoLoading&&!this.logoFailed&&(this.logoLoading=!0,new zl().load("./mindwave-logo-icon.png",C=>{if(this.logoImage=C,this.logoLoading=!1,this.cyberMaterial){const T=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=T}},void 0,C=>{this.logoFailed=!0,this.logoLoading=!1})),r.font="bold 80px monospace",r.fillStyle="#2dd4bf",r.fillText("🪷",0,0);else r.fillText(_,0,0);r.restore()}const g=new Ci(n);return g.magFilter=dt,g.minFilter=dt,g}createCyberShader(e,t=this.matrixConfig){return new ft({uniforms:{uTexture:{value:e},uColor:{value:new xe(t.color||65345)},uHeadColor:{value:new xe(15794160)},uTime:{value:0},uSpeed:{value:t.speed||1},uTailLength:{value:t.length||1},uRainbow:{value:t.rainbow?1:0},uBrightness:{value:this.brightnessMultiplier||1}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:Ye})}initEnvironment(){this.sunLight&&this.scene.remove(this.sunLight),this.ambientLight&&this.scene.remove(this.ambientLight),this.sunLight=new Q0(16774625,1.2),this.sunLight.position.set(50,100,50),this.scene.add(this.sunLight),this.ambientLight=new em(4210752,.6),this.scene.add(this.ambientLight)}ensureInitialized(e){const t=`[VizInit] ${e}`;console.time(t),e==="sphere"&&(!this.sphereGroup||this.sphereGroup.children.length===0)&&this.initSphere(),e==="particles"&&(!this.particleGroup||this.particleGroup.children.length===0)&&this.initParticles(),e==="lightspeed"&&(!this.lightspeedGroup||this.lightspeedGroup.children.length===0)&&this.initLightspeed(),e==="waves"&&(!this.wavesGroup||this.wavesGroup.children.length===0)&&this.initWaves(),e==="lava"&&(!this.lavaGroup||this.lavaGroup.children.length===0)&&this.initLava(),e==="fireplace"&&(!this.fireplaceGroup||this.fireplaceGroup.children.length===0)&&this.initFireplace(),e==="rainforest"&&(!this.rainforestGroup||this.rainforestGroup.children.length===0)&&this.initRainforest(),e==="zengarden"&&(!this.zenGardenGroup||this.zenGardenGroup.children.length===0)&&this.initZenGarden(),e==="ocean"&&(!this.oceanGroup||this.oceanGroup.children.length===0)&&this.initOcean(),(e==="cyber"||e==="matrix")&&(!this.cyberGroup||this.cyberGroup.children.length===0)&&this.initCyber(),e==="box"&&(!this.boxGroup||this.boxGroup.children.length===0)&&this.initBox(),e==="dragon"&&(!this.dragonGroup||this.dragonGroup.children.length===0)&&this.initDragon(),e==="galaxy"&&(!this.galaxyGroup||this.galaxyGroup.children.length===0)&&this.initGalaxy(),e==="mandala"&&(!this.mandalaGroup||this.mandalaGroup.children.length===0)&&this.initMandala(),e==="snowflake"&&(!this.snowflakeGroup||this.snowflakeGroup.children.length===0)&&this.initSnowflake(),console.timeEnd(t)}initCyber(){for(;this.cyberGroup.children.length>0;){const d=this.cyberGroup.children[0];this.cyberGroup.remove(d),d.traverse(g=>{if(g.geometry&&g.geometry.dispose(),g.material){if(g.material.map&&g.material.map.dispose(),g.material.uniforms)for(const v in g.material.uniforms)g.material.uniforms[v]&&g.material.uniforms[v].value&&g.material.uniforms[v].value.dispose&&g.material.uniforms[v].value.dispose();g.material.dispose()}})}this.cyberRotationGroup=null,this.cyberPoints=null;const e=80,t=120,n=new et,r=[],s=[],o=[],a=[],l=240,c=160,u=l/e,h=c/t;for(let d=0;d<e;d++){const g=d*u-l/2+Math.random()*.8*u,v=-20-Math.random()*2,m=.5+Math.random()*.5,p=this.matrixConfig,_=p.logicMode==="mindwave"||p.logicMode==="mw"||p.logicMode==="custom"||p.logicMode==="txt",x=p.logicMode==="matrix"||p.logicMode==="int"||p.logicMode==="interstellar",C=((p.logicMode==="custom"||p.logicMode==="txt")&&p.customText?"🪷"+p.customText:"MINDWAVE").length,T=x?Math.random()*100:0,A=x?.5+Math.random()*1.5:1,F=Math.random()*100+T;for(let y=0;y<t;y++){const w=c/2-y*h;r.push(g,w,v),_?s.push(y%(C+1)):x?s.push(Math.floor(Math.random()*64)):s.push(9+Math.floor(Math.random()*55)),o.push(F),a.push(m*A)}}n.setAttribute("position",new Fe(r,3)),n.setAttribute("aCharIndex",new Fe(s,1)),n.setAttribute("aSpawnTime",new Fe(o,1)),n.setAttribute("aSpeed",new Fe(a,1)),this.cyberGeometry=n;const f=this.createCyberTexture(this.matrixConfig);this.cyberMaterial=this.createCyberShader(f,this.matrixConfig),this.cyberRain=new an(n,this.cyberMaterial),this.cyberRain.frustumCulled=!1,this.cyberRain.renderOrder=-1,this.cyberRotationGroup=new $e,this.cyberRotationGroup.add(this.cyberRain),this.cyberGroup.add(this.cyberRotationGroup),this.currentCyberAngle!==void 0&&(this.cyberRotationGroup.rotation.z=qa.degToRad(-this.currentCyberAngle))}setCyberMode(e){if(this.mindWaveMode!==e)if(this.mindWaveMode=e,this.cyberLogicMode=e?"mindwave":"classic",e&&this.cyberMaterial){const t=this.cyberMaterial.uniforms.uTexture.value,n=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=n,this.cyberMaterial.needsUpdate=!0,t&&t.dispose()}else this.initCyber()}setMode(e){const t=this.mapMode(e);this.activeModes.clear(),this.activeModes.add(t),this.mode=t,this.updateVisibility(),this.updateLabel(t)}mapMode(e){return{cube:"box",flow:"particles",zen:"zengarden",rain:"rainforest",interstellar:"matrix",ocean:"waves"}[e]||e}toggleMode(e){const t=this.mapMode(e);t==="matrix"&&!this.activeModes.has("matrix")&&(this.matrixConfig.logicMode||(this.matrixConfig.logicMode="interstellar")),t==="cyber"&&!this.activeModes.has("cyber")&&(this.cyberConfig.logicMode||(this.cyberConfig.logicMode="matrix"));const n=this.activeModes.has("cyber");this.activeModes.has(t)?this.activeModes.delete(t):(t==="cymatics"?(console.log("[Engine] Cymatics engaged - clearing other modes"),this.activeModes.clear()):this.activeModes.has("cymatics")&&this.activeModes.delete("cymatics"),this.activeModes.add(t)),this.active=this.activeModes.size>0,this.updateVisibility(),this.updateLabel(t),this.activeModes.forEach(r=>this.ensureInitialized(r)),this.initialized&&this.active&&!this._isRendering&&(Ce.animationId&&(cancelAnimationFrame(Ce.animationId),Ce.animationId=null),this.render()),this.mode=t,this.updateVisibility(),this.activeModes.size===0&&!n&&(this.active=!1,this.renderer&&(this.renderer.autoClearColor=!0,this.renderer.clear(),this.renderer.render(this.scene,this.camera))),this.activeModes.size===1?this.updateLabel(Array.from(this.activeModes)[0]):this.activeModes.size>1?this.updateLabel("multi"):this.updateLabel("none"),window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}})),this.updateCyberStrings&&this.updateCyberStrings()}toggleGalaxySunStyle(){const e=this.galaxySunStyle==="sun"?"sun2":this.galaxySunStyle==="sun2"?"sun3":"sun";return console.log(`[Visualizer] Toggling Galaxy Sun: ${this.galaxySunStyle} -> ${e}`),this.setGalaxySunStyle(e),e}updateVisibility(){if(this.activeModes.forEach(e=>this.ensureInitialized(e)),this.sphereGroup&&(this.sphereGroup.visible=this.activeModes.has("sphere")),this.particleGroup&&(this.particleGroup.visible=this.activeModes.has("particles")),this.lightspeedGroup&&(this.lightspeedGroup.visible=this.activeModes.has("lightspeed")),this.wavesGroup&&(this.wavesGroup.visible=this.activeModes.has("waves")),this.oceanGroup&&(this.oceanGroup.visible=this.activeModes.has("ocean")),this.lavaGroup&&(this.lavaGroup.visible=this.activeModes.has("lava")),this.fireplaceGroup&&(this.fireplaceGroup.visible=this.activeModes.has("fireplace")),this.rainforestGroup&&(this.rainforestGroup.visible=this.activeModes.has("rainforest")),this.zenGardenGroup&&(this.zenGardenGroup.visible=this.activeModes.has("zengarden")),this.boxGroup&&(this.boxGroup.visible=this.activeModes.has("box")),this.dragonGroup&&(this.dragonGroup.visible=this.activeModes.has("dragon")),this.galaxyGroup&&(this.galaxyGroup.visible=this.activeModes.has("galaxy")),this.mandalaGroup&&(this.mandalaGroup.visible=this.activeModes.has("mandala")),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics")),this.snowflakeGroup){const e=this.cymaticMaterial&&Math.abs(this.cymaticMaterial.uniforms.uMedium.value-3)<.1;this.snowflakeGroup.visible=this.activeModes.has("snowflake")||this.activeModes.has("cymatics")&&e}this.cyberGroup&&(this.cyberGroup.visible=this.activeModes.has("matrix")),this.overlayCanvas&&(this.activeModes.has("cyber")?(this.overlayCanvas.classList.remove("hidden"),this.activeModes.has("matrix")?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1):this.activeModes.size>1?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:.7}})),this.wasAutoDimmed=!0):(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1),(!this.matrixCyberStreams||this.matrixCyberStreams.length===0)&&this.generateCyberStyle()):(this.overlayCanvas.classList.add("hidden"),this.wasAutoDimmed&&(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1))),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics"),this.cymaticsGroup.position.z=2),this.updateUIPanels()}updateUIPanels(){typeof window.updateConfigPanel=="function"&&window.updateConfigPanel()}updateLabel(e){const t=document.getElementById("visualLabel");t&&(e==="sphere"?t.textContent="BIO-RESONANCE":e==="particles"?t.textContent="NEURAL FLOW":e==="lightspeed"?t.textContent="WARP":e==="waves"||e==="ocean"?t.textContent="OCEAN":e==="lava"?t.textContent="LAVA LAMP":e==="fireplace"?t.textContent="FIREPLACE":e==="rainforest"?t.textContent="RAINFOREST":e==="zengarden"?t.textContent="ZEN GARDEN":e==="cymatics"?t.textContent="CYMATICS":e==="cyber"?t.textContent="CYBER":e==="matrix"?t.textContent="MATRIX":e==="snowflake"?t.textContent="SNOWFALL":e==="multi"?t.textContent="MULTI-SENSORY":t.textContent="")}initWaves(){for(this.wavesGroup||(this.wavesGroup=new $e,this.scene.add(this.wavesGroup));this.wavesGroup.children.length>0;){const t=this.wavesGroup.children[0];this.wavesGroup.remove(t),t.traverse(n=>{if(n.geometry&&n.geometry.dispose(),n.material){if(n.material.map&&n.material.map.dispose(),n.material.uniforms)for(const r in n.material.uniforms)n.material.uniforms[r]&&n.material.uniforms[r].value&&n.material.uniforms[r].value.dispose&&n.material.uniforms[r].value.dispose();n.material.dispose()}})}const e=new $t(80,80,160,160);this.wavesMaterial=new ft({uniforms:{uTime:{value:0},uColor:{value:this.customColor?new xe(this.customColor):new xe(26367)},uSecondaryColor:{value:new xe(62207)},uIntensity:{value:1},uNormBass:{value:0},uResolution:{value:new ce(window.innerWidth,window.innerHeight)}},vertexShader:`
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
            `,transparent:!0,wireframe:!1,side:yt,extensions:{derivatives:!0}}),this.wavesMesh=new qe(e,this.wavesMaterial),this.wavesMesh.rotation.x=-Math.PI/2.2,this.wavesMesh.position.y=-5,this.wavesMesh.position.z=-10,this.wavesGroup.add(this.wavesMesh)}setSpeed(e){this.speedMultiplier=e}setIntent(e){this.currentIntent=e,e==="delta"||e==="theta"?this.particles&&this.particles.material&&(this.particles.material.size=.3,this.particles.material.opacity=.5):e==="gamma"||e==="hyper-gamma"?(this.particles&&this.particles.material&&(this.particles.material.size=.08,this.particles.material.opacity=.9),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(16777215),this.cyberMaterial.uniforms.uTailLength.value=.4)):(this.particles&&this.particles.material&&(this.particles.material.size=.15,this.particles.material.opacity=.8),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(15794160),this.cyberMaterial.uniforms.uTailLength.value=1)),this.renderSingleFrame()}setColor(e,t=null){var n,r,s,o;this.customColors||(this.customColors={}),!t||t==="all"?(this.customColors={},this.customColor=new xe(e)):this.customColors[t]=new xe(e);try{const a=l=>{l&&(l.color&&typeof l.color.set=="function"?l.color.set(e):l.uniforms&&l.uniforms.uColor&&l.uniforms.uColor.value.set(e))};this.particles&&this.particles.material&&a(this.particles.material),this.lightspeed&&this.lightspeed.material&&a(this.lightspeed.material),this.sphere&&this.sphere.material&&(a(this.sphere.material),this.core&&this.core.material&&a(this.core.material)),(t==="box"||!t||t==="all")&&(this.boxOuter&&this.boxOuter.children.forEach(l=>a(l.material)),this.boxInner&&this.boxInner.children.forEach(l=>a(l.material)),this.boxEdges&&this.boxEdges.material&&a(this.boxEdges.material)),t==="mandala"&&(this.mandalaRings&&this.mandalaRings.forEach(l=>a(l.material)),this.mandalaCenter&&this.mandalaCenter.material&&a(this.mandalaCenter.material)),this.wavesMesh&&this.wavesMesh.material&&a(this.wavesMesh.material),this.lavaBlobs&&this.lavaBlobs.forEach(l=>a(l.material)),this.lavaGlow&&this.lavaGlow.material&&a(this.lavaGlow.material),this.flames&&this.flames.material&&a(this.flames.material),this.raindrops&&this.raindrops.material&&a(this.raindrops.material),this.petals&&this.petals.material&&a(this.petals.material),this.zenWater&&this.zenWater.material&&a(this.zenWater.material),this.oceanWave&&this.oceanWave.material&&a(this.oceanWave.material),this.oceanFoam&&this.oceanFoam.material&&a(this.oceanFoam.material),this.cyberRain&&this.cyberRain.material&&this.cyberRain.material.uniforms&&this.cyberRain.material.uniforms.uColor&&this.cyberRain.material.uniforms.uColor.value.set(e),this.logoMesh&&this.originalLogoImg&&this.updateLogoTexture(),this.dragonGroup&&this.updateDragonColor&&this.updateDragonColor(new xe(e)),(this.galaxyStars||this.galaxySunMesh)&&this.updateGalaxyColor(new xe(e)),this.cymaticMaterial&&((n=this.cymaticMaterial.uniforms)!=null&&n.uColor)&&this.cymaticMaterial.uniforms.uColor.value.set(e),(o=(s=(r=this._snowData)==null?void 0:r.material)==null?void 0:s.uniforms)!=null&&o.uColor&&this._snowData.material.uniforms.uColor.value.set(e)}catch(a){console.warn("[Visualizer] setColor encountered a safe-skip error:",a)}this.renderSingleFrame()}renderSingleFrame(){!this.renderer||!this.scene||!this.camera||(this.renderer.clear(),this.renderer.render(this.scene,this.camera))}createCircleTexture(){if(this.textures.circle)return this.textures.circle;const e=32,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d");return n.beginPath(),n.arc(e/2,e/2,e/2,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),this.textures.circle=new Ci(t),this.textures.circle}render(e,t){var n,r,s,o,a,l,c,u,h;if(!this.initialized||!this.renderer||document.hidden||!this.active){this._isRendering=!1;return}Ce.animationId&&(cancelAnimationFrame(Ce.animationId),Ce.animationId=null),this._isRendering=!0;try{(typeof e=="number"||!e&&Ce.analyserLeft)&&(e=Ce.analyserLeft,t=Ce.analyserRight);let f=0,d=0,g=0;if(e){const P=e.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==P)&&(this._freqDataArray=new Uint8Array(P)),e.getByteFrequencyData(this._freqDataArray);let D=0;for(let O=0;O<15;O++)D+=this._freqDataArray[O]||0;f=Math.pow(D/15/255,.8);let q=0;for(let O=10;O<100;O++)q+=this._freqDataArray[O]||0;d=q/90/255;let N=0;for(let O=100;O<300;O++)N+=this._freqDataArray[O]||0;g=N/200/255,(isNaN(f)||!isFinite(f))&&(f=0),(isNaN(d)||!isFinite(d))&&(d=0),(isNaN(g)||!isFinite(g))&&(g=0)}const v=Math.max(.001,this.speedMultiplier||1),m=performance.now()*.001%(2e3*Math.PI);this.activeModes.has("cymatics")&&this.cymaticsCore&&(this.mouseData||(this.mouseData={x:0,y:0},this._boundCymaticPointer=D=>{D.touches&&D.touches.length>0?(this.mouseData.x=D.touches[0].clientX/window.innerWidth*2-1,this.mouseData.y=-(D.touches[0].clientY/window.innerHeight)*2+1):D.clientX!==void 0&&(this.mouseData.x=D.clientX/window.innerWidth*2-1,this.mouseData.y=-(D.clientY/window.innerHeight)*2+1)},window.addEventListener("mousemove",this._boundCymaticPointer),window.addEventListener("touchmove",this._boundCymaticPointer)),this.audioSyncToggleEl||(this.audioSyncToggleEl=document.getElementById("audioSyncToggle")),!this.audioSyncToggleEl||this.audioSyncToggleEl.checked||(f=0,d=0,g=0),this.reusableAudioData||(this.reusableAudioData={bass:0,mids:0,highs:0}),this.reusableAudioData.bass=f,this.reusableAudioData.mids=d,this.reusableAudioData.highs=g,this.cymaticsCore.update(m*v,this.reusableAudioData,this.mouseData)),this.lastTime||(this.lastTime=m);let p=m-this.lastTime;p<0&&(p=.016),p=Math.min(.1,p),this.lastTime=m;const _=Ce.visualSpeedAuto?Ce.beatFrequency||10:v*10,x=Math.sin(m*Math.PI*2*_)*.5+.5,S=this.vibrationEnabled?1:0,C=(x||0)*S,T=(f||0)*S,A=S*(.02+T*.15+C*.08),F=Math.sin(m*47.3)*Math.cos(m*31.7)*A,y=Math.cos(m*53.1)*Math.sin(m*29.3)*A,w=Math.sin(m*37.9)*Math.cos(m*43.1)*A,z=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];for(const P of z)P&&P.position.set(F,y,w);if(this.activeModes.has("galaxy")&&this.galaxyGroup){const P=this.sunRotationSpeedY||.002,D=this.sunRotationSpeedZ||5e-4;if(this.galaxyStars&&(this.galaxyStars.rotation.y+=P*v*.5,this.galaxyStars.rotation.z+=D*v*.5),this.galaxySunMesh){this.galaxySunMesh.rotation.z-=D*v*1.5,this.galaxySunMesh.rotation.y+=P*v*2;const q=1+T*.15*(this.galaxySunStyle==="sun3"?2.5:1);this.galaxySunMesh.scale.setScalar(q)}this.galaxySunUniforms&&(this.galaxySunUniforms.uTime.value=m*v,this.galaxySunUniforms.uBassIntt.value=T,this._cymaticV2&&this._cymaticV2.shiver>.5&&(this.galaxySunUniforms.uTime.value+=this._cymaticV2.shiver*.05))}if(this.activeModes.has("sphere")&&this.sphere&&(this.sphere.scale.setScalar(1+T*.15),this.sphere.rotation.y+=.005*v),this.activeModes.has("particles")&&this.particleMaterial){const P=((r=(n=window.MindWaveState)==null?void 0:n.envIntensities)==null?void 0:r.flow)??1,D=(.015*v+T*.08+C*.05)*P;this.particleMaterial.uniforms.uTime.value=m,this.particleMaterial.uniforms.uSpeed.value=D*10,this.particleGroup.rotation.z+=(.001*v+T*.005)*P}if(this.activeModes.has("lightspeed")&&this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uTime.value=m,this.lightspeedMaterial.uniforms.uSpeed.value=v),this.activeModes.has("matrix")&&this.cyberMaterial&&(this.cyberMaterial.uniforms.uTime.value=m*v),this.activeModes.has("waves")&&this.wavesMaterial){const P=((o=(s=window.MindWaveState)==null?void 0:s.envIntensities)==null?void 0:o.ocean)??1;this.wavesMaterial.uniforms.uTime.value=m*v*.5,this.wavesMaterial.uniforms.uNormBass.value=T*P,this.wavesMaterial.uniforms.uIntensity&&(this.wavesMaterial.uniforms.uIntensity.value=P)}if(this.activeModes.has("ocean")&&this.oceanWave&&this.oceanWave.material.uniforms){const P=((l=(a=window.MindWaveState)==null?void 0:a.envIntensities)==null?void 0:l.ocean)??1;this.oceanWave.material.uniforms.uTime.value=m*v,this.oceanWave.material.uniforms.uNormBass.value=T*P,this.oceanWave.material.uniforms.uBeatPulse.value=C*P,this.oceanFoam&&(this.oceanFoam.material.opacity=(.4+T*.3+C*.2)*(this.brightnessMultiplier||1)*P)}if(this.activeModes.has("box")&&this.boxOuter&&(this.boxOuter.rotation.x+=.008*v+T*.02,this.boxOuter.rotation.y+=.012*v,this.boxInner&&(this.boxInner.rotation.x-=.015*v,this.boxInner.rotation.y-=.01*v,this.boxInner.scale.setScalar(.95+T*.2)),this.boxOuter.scale.setScalar(1+T*.2),this.boxEdges&&this.boxEdges.rotation.copy(this.boxOuter.rotation)),this.activeModes.has("dragon")&&this.dragonBodyInstanced&&this.dragonDummy){this.dragonGroup.rotation.y+=.005*v;const P=m*v*2,D=1+T*.2;for(let q=0;q<this.dragonLength;q++){const N=P-q*.12,O=Math.sin(N)*8,Y=Math.cos(N*1.5)*4+Math.sin(N*.5)*3,j=Math.cos(N*.8)*8;this.dragonDummy.position.set(O,Y,j);const se=N+.1,X=Math.sin(se)*8,Z=Math.cos(se*1.5)*4+Math.sin(se*.5)*3,oe=Math.cos(se*.8)*8;this.dragonDummy.lookAt(X,Z,oe);const pe=1-q/this.dragonLength*.8,fe=1+Math.sin(N*4)*.15*(.5+T);this.dragonDummy.scale.setScalar(pe*fe*D),this.dragonDummy.updateMatrix(),this.dragonBodyInstanced.setMatrixAt(q,this.dragonDummy.matrix),this.dragonGlowInstanced&&this.dragonGlowInstanced.setMatrixAt(q,this.dragonDummy.matrix),q===0&&this.dragonHead&&(this.dragonHead.position.copy(this.dragonDummy.position),this.dragonHead.quaternion.copy(this.dragonDummy.quaternion),this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4))}if(this.dragonBodyInstanced.instanceMatrix.needsUpdate=!0,this.dragonGlowInstanced&&(this.dragonGlowInstanced.instanceMatrix.needsUpdate=!0),this.dragonPearlGroup){const q=P+.5;this.dragonPearlGroup.position.set(Math.sin(q)*9,Math.cos(q*1.5)*5+Math.sin(q*.5)*4,Math.cos(q*.8)*9),this.dragonPearlGroup.rotation.x+=.08*v,this.dragonPearlGroup.rotation.y+=.12*v}}if(this.activeModes.has("mandala")&&this.mandalaRings&&(this.mandalaRings.forEach((P,D)=>{P.userData&&P.userData.speed&&(P.rotation.z+=P.userData.speed*v+T*.005);const q=1+C*.1*(D+1)*.3;P.scale.setScalar(q)}),this.mandalaCenter&&(this.mandalaCenter.rotation.z-=.01*v,this.mandalaCenter.scale.setScalar(1+T*.3))),this.logoMesh){const P=Ce.lotusState||"auto";let D=.8;P==="faded"||P==="full"&&(D=1),this._lotusCurrentOpacity===void 0&&(this._lotusCurrentOpacity=.8),this._lotusCurrentOpacity+=(D-this._lotusCurrentOpacity)*.1,this.logoMesh.material.opacity=this._lotusCurrentOpacity,this.logoMesh.scale.setScalar(1+T*(.05+((c=this._cymaticV2)==null?void 0:c.shiver)*.1)+C*.02)}if(this.activeModes.has("lava")&&this.lavaBlobs&&this.lavaUniforms){const P=((h=(u=window.MindWaveState)==null?void 0:u.envIntensities)==null?void 0:h.lava)??1;this.lavaUniforms.uTime.value=m*v,this.lavaUniforms.uIntensity.value=T*P,this.lavaBlobs.forEach((D,q)=>{const N=D.userData,O=v*(1+T*.8);if(N.state==="heating"?(N.temperature+=N.heatRate*p*O,N.temperature>=1&&(N.temperature=1,N.state="rising")):N.state==="rising"?(D.position.y+=N.riseSpeed*O,D.position.y>=N.floatMax&&(N.state="cooling")):N.state==="cooling"?(N.temperature-=N.coolRate*p*O,N.temperature<=0&&(N.temperature=0,N.state="falling")):N.state==="falling"&&(D.position.y-=N.fallSpeed*O,D.position.y<=N.floatMin&&(N.state="heating")),D.position.x+=Math.sin(m*N.driftSpeed+N.driftPhase)*.02*O,this.lavaUniforms.uBlobs.value[q]){const Y=N.baseSize*(.8+.5*N.temperature);this.lavaUniforms.uBlobs.value[q].set(D.position.x,D.position.y,D.position.z,Y)}})}if(this.snowflakeGroup&&this.snowflakeGroup.visible&&this._snowData){const P=this._snowData,D=P.points.geometry.attributes.position.array,q=v*2;for(let N=0;N<P.count;N++){const O=N*3;D[O+1]-=P.speeds[N]*q;let Y=Math.sin(m*P.driftFreqs[N]+P.phases[N])*P.drifts[N]*q;D[O]+=Y,D[O+1]<-22&&(D[O+1]=22),D[O]>35&&(D[O]=-35),D[O]<-35&&(D[O]=35)}if(P.points.geometry.attributes.position.needsUpdate=!0,P.spinMeshes){const N=1+(T||0)*.15;P.spinMeshes.forEach((O,Y)=>{O.rotation.z+=P.spinSpeeds[Y]*q,O.position.y-=P.spinSpeeds[Y]*.1*q,O.scale.setScalar(N),O.position.y<-25&&(O.position.y=25)})}P.material&&P.material.uniforms&&P.material.uniforms.uIntensity&&(P.material.uniforms.uIntensity.value=.2+T*.8)}if(this.activeModes.has("rainforest")&&this.rainMaterial){const P=v*.8*(1+C*.3);this.rainMaterial.uniforms.uTime.value=m,this.rainMaterial.uniforms.uSpeed.value=P,this.rainMaterial.uniforms.uIntensity.value=(.5+T*.2+C*.2)*(this.brightnessMultiplier||1)}if(this.activeModes.has("zengarden")&&this.petalMaterial){const P=v*.3*(1+C*.5);this.petalMaterial.uniforms.uTime.value=m,this.petalMaterial.uniforms.uSpeed.value=P,this.zenWater&&(this.zenWater.material.opacity=(.3+C*.2)*(this.brightnessMultiplier||1))}if(this.activeModes.has("fireplace")&&this.fireMesh&&this.fireMesh.material&&this.fireMesh.material.uniforms){const P=.8+.2*Math.sin(m*15)*Math.sin(m*7),D=this.fireMesh.material.uniforms;D.uTime&&(D.uTime.value=m*1.5*v),D.uIntensity&&(D.uIntensity.value=P+T*.5),this.fireLight&&(this.fireLight.intensity=(2+T*5)*P)}const W=performance.now(),ee=W-(this._lastFrameStartTime||W);if(this._lastFrameStartTime=W,this._fpsRingBuffer&&(this._fpsRingBuffer[this._fpsRingIndex]=ee,this._fpsRingIndex=(this._fpsRingIndex+1)%60,this._fpsRingCount=Math.min(60,this._fpsRingCount+1),this._fpsRingCount===60)){let P=0;for(let q=0;q<60;q++)P+=this._fpsRingBuffer[q];P/=60,1e3/P<35&&W-(this._lastLodDegradation||0)>3e3&&(this.degradeLOD(),this._lastLodDegradation=W,this._fpsRingCount=0)}const I=1e3/(this.targetFPS||60);W-this.lastFrameRenderTime>=I&&(this.renderer.autoClear=!this.activeModes.has("lightspeed"),this.renderer.autoClear&&this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.activeModes.has("cyber")&&this.renderCyberCyber(),this.lastFrameRenderTime=W)}catch(f){console.error("[Visualizer] Render Loop Error:",f),f.name==="TypeError"&&f.message.includes("uniforms")&&console.warn("[Visualizer] Shader not ready, skipping frame...")}finally{this._isRendering=!1}this.active&&!document.hidden?Ce.animationId=requestAnimationFrame(()=>this.render(Ce.analyserLeft,Ce.analyserRight)):Ce.animationId=null}setCyberColor(e){this.cyberConfig.color=e,this.cyberConfig.rainbow=!1,this.cyberColorCustomized=!0,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.matrixConfig.rainbow=!1,this.cyberMaterial&&this.cyberMaterial.uniforms.uColor&&(this.cyberMaterial.uniforms.uColor.value.set(e),this._tempColor.set(e),this._tempColor.r+=(1-this._tempColor.r)*.8,this._tempColor.g+=(1-this._tempColor.g)*.8,this._tempColor.b+=(1-this._tempColor.b)*.8,this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor),this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=0))}getAverageFrequency(e,t){let n=Ce.analyserLeft||Ce.analyserRight;if(!n)return 0;const r=n.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==r)&&(this._freqDataArray=new Uint8Array(r));const s=this._freqDataArray;n.getByteFrequencyData(s),e===void 0&&(e=0),t===void 0&&(t=s.length);let o=0,a=0;for(let l=e;l<t&&l<s.length;l++)o+=s[l],a++;return a>0?o/a:0}setMouseInfluence(e){this.mouseInfluence=e}setGlobalSpeed(e){this.speedMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=1+(e-1)*.5)}setGlobalBrightness(e){this.brightnessMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberBrightness(e){this.cyberConfig.brightness=e}setMatrixBrightness(e){this.matrixConfig.brightness=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberSpeed(e){this.cyberConfig.speed=e}setCyberLength(e){this.cyberConfig.length=e}setMatrixSpeed(e){this.matrixConfig.speed=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=e)}setMatrixLength(e){this.matrixConfig.length=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uTailLength.value=e)}setCyberRainbow(e){if(this.cyberConfig.rainbow=e,this.cyberRainbowMode=e,!e){const t=this.cyberConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(n=>{n.color=t})}}setMatrixRainbow(e){this.matrixConfig.rainbow=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=e?1:0)}setBatterySaver(e){this.batterySaver=e,this.targetFPS=e?30:60;const t=e?1:2;this.renderer&&(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t)),this.resize()),console.log(`[Visualizer] Battery Saver ${e?"ENABLED (30fps/1x)":"DISABLED (60fps/2x)"}`)}degradeLOD(){this.renderer&&(this.currentLodLevel==="high"?(console.log("[Visualizer] FPS dropping. Degrading LOD to Medium (Pixel Ratio: 1.0)"),this.renderer.setPixelRatio(1),this.currentLodLevel="medium",this.resize()):this.currentLodLevel==="medium"&&(console.log("[Visualizer] FPS dropping. Degrading LOD to Low (Pixel Ratio: 0.75)"),this.renderer.setPixelRatio(.75),this.currentLodLevel="low",this.resize()))}updateCyberStrings(){if(!this.matrixCyberStreams)return;let e=!1,t="MINDWAVE🪷";const n=this.cyberConfig;n.logicMode==="custom"||n.logicMode==="txt"?(e=!0,t="🪷"+(n.customText||"WELCOME TO MINDWAVE")):(n.logicMode==="mindwave"||n.logicMode==="mw")&&(e=!0,t="MINDWAVE🪷");const r="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",s="0123456789·:.-+x[]<>/\\∆ΣΩ∞",o=100;this.matrixCyberStreams.forEach(a=>{if(a.chars=[],a.isTextMode=e,e&&t.length>0){const l=[...t].reverse();for(let c=0;c<o;c++)a.chars.push(l[c%l.length])}else if(n.logicMode==="matrix"||n.logicMode==="interstellar"||n.logicMode==="int")for(let l=0;l<o;l++)a.chars.push(s.charAt(Math.floor(Math.random()*s.length)));else for(let l=0;l<o;l++)a.chars.push(r.charAt(Math.floor(Math.random()*r.length)))})}setCyberLogicMode(e,t){console.log(`[Visualizer] setCyberLogicMode(mode="${e}", text="${t}")`),this.cyberConfig.logicMode=e,t!==void 0&&(this.cyberConfig.customText=t),this.updateCyberStrings()}setMatrixLogicMode(e,t){if(console.log(`[Visualizer] setMatrixLogicMode(mode="${e}", text="${t}") -> 3D config`),this.matrixConfig.logicMode=e,t!==void 0&&(this.matrixConfig.customText=t),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTexture){const n=this.cyberMaterial.uniforms.uTexture.value,r=this.createCyberTexture(this.matrixConfig);this.cyberMaterial.uniforms.uTexture.value=r,this.cyberMaterial.needsUpdate=!0,n&&n.dispose()}this.initCyber()}setCyberColor(e){this.cyberConfig.color=e,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uColor&&this.cyberMaterial.uniforms.uColor.value.set(e)}setCyberAngle(e){this.cyberConfig.angle=e}setMatrixAngle(e){this.matrixConfig.angle=e,this.currentCyberAngle=e,this.cyberRotationGroup&&(this.cyberRotationGroup.rotation.z=qa.degToRad(-e))}setVibrationEnabled(e){this.vibrationEnabled=e}updateLogoTexture(){if(!this.originalLogoImg)return;const e=512;this._logoRenderCanvas||(this._logoRenderCanvas=document.createElement("canvas"),this._logoRenderCanvas.width=e,this._logoRenderCanvas.height=e);const t=this._logoRenderCanvas,n=t.getContext("2d",{willReadFrequently:!0});n.clearRect(0,0,e,e),n.drawImage(this.originalLogoImg,0,0,e,e);const r=n.getImageData(0,0,t.width,t.height),s=r.data,o=document.body.dataset.theme||"default",a=ca[o]||ca.default,l=a.secondary||a.accent||"#ffffff",c=this.customColors&&this.customColors.mandala?this.customColors.mandala:this.customColor,u=c?c.getHex():parseInt(a.accent.replace("#",""),16),h=parseInt(l.replace("#",""),16),f=u>>16&255,d=u>>8&255,g=u&255,v=h>>16&255,m=h>>8&255,p=h&255;this.themeType=document.body.dataset.themeType||"dark",this.themeType;for(let x=0;x<s.length;x+=4){const S=s[x],C=s[x+1],T=s[x+2],A=s[x+3];A<10||(S>200&&C>200&&T>200?(s[x]=f,s[x+1]=d,s[x+2]=g,s[x+3]=255):(s[x]=v,s[x+1]=m,s[x+2]=p,s[x+3]=Math.min(255,A*1.5)))}n.putImageData(r,0,0);const _=new Ci(t);if(_.minFilter=Dt,_.magFilter=Dt,_.generateMipmaps=!0,this.renderer&&(_.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),this.logoMesh){const x=this.logoMesh.material.map;this.logoMesh.material.map=_,this.logoMesh.material.needsUpdate=!0,x&&x.dispose()}else{const x=new $t(5.625,4.78),S=new Lt({map:_,transparent:!0,opacity:.8,color:16777215,depthTest:!1,depthWrite:!1});this.logoMesh=new qe(x,S),this.logoMesh.position.set(0,0,-10),this.logoMesh.renderOrder=-1,this.scene.add(this.logoMesh)}}initOverlayLogo(){if(this.logoMesh)return;const e=new Image;e.crossOrigin="anonymous",e.src="./mindwave-logo-icon.png",e.onload=()=>{this.originalLogoImg=e,this.updateLogoTexture(),this.targetLogoOpacity!==void 0?this.setLogoOpacity(this.targetLogoOpacity):this.setLogoOpacity(.8)},e.onerror=t=>{console.warn("[Visualizer] Failed to load logo:",t)}}setLogoOpacity(e){this.targetLogoOpacity=e,this.logoMesh&&this.logoMesh.material?this.logoMesh.material.opacity=e*this.brightnessMultiplier:!this.logoMesh&&e>0&&this.initOverlayLogo()}applyCymaticClassAndVariation(e,t){this.cymaticsCore&&(this.cymaticsCore.setPattern(e,t),this.activeModes.has("cymatics")||this.toggleMode("cymatics"))}nextCymatic(){if(window.state&&window.state.aiVisualsLocked){window.state.aiVisualsLocked=!1;const r=document.getElementById("cymaticAiBtn");r&&(r.style.borderColor="rgba(34, 211, 238, 0.2)")}const e=Fi.CYMATIC_PATTERNS;let t=0;this.currentCymaticData&&(t=e.findIndex(r=>r.name===this.currentCymaticData.name),t===-1&&(t=0));let n=(t+1)%e.length;this.cymaticsHistory.push(e[n]),this.cymaticsHistory.length>50&&this.cymaticsHistory.shift(),this.cymaticsHistoryIndex=this.cymaticsHistory.length-1,this.applyCymatic(e[n]),this.lastCymaticRotation=performance.now()}prevCymatic(){if(window.state&&window.state.aiVisualsLocked){window.state.aiVisualsLocked=!1;const r=document.getElementById("cymaticAiBtn");r&&(r.style.borderColor="rgba(34, 211, 238, 0.2)")}const e=Fi.CYMATIC_PATTERNS;let t=0;this.currentCymaticData&&(t=e.findIndex(r=>r.name===this.currentCymaticData.name),t===-1&&(t=0));let n=(t-1+e.length)%e.length;this.cymaticsHistory.push(e[n]),this.cymaticsHistory.length>50&&this.cymaticsHistory.shift(),this.cymaticsHistoryIndex=this.cymaticsHistory.length-1,this.applyCymatic(e[n]),this.lastCymaticRotation=performance.now()}setCymaticByName(e){const t=Fi.CYMATIC_PATTERNS.find(n=>n.name===e);t&&(this.applyCymatic(t),this.lastCymaticRotation=performance.now())}applyCymatic(e){if(!e||!this.cymaticsCore)return;this.currentCymaticData=e,window.renderCymaticProPatterns&&window.renderCymaticProPatterns();const t=e.classId||1,n=e.variationId||0;this.cymaticsCore.setPattern(t,n);const r=document.getElementById("cymaticPatternLabel");r&&e.name&&(r.textContent=e.name,r.style.textShadow="0 0 15px rgba(180, 120, 255, 1)",setTimeout(()=>{r.style.textShadow="0 0 5px rgba(255, 255, 255, 0.3)"},300))}setCymaticColor(e,t=null,n=1){if(!this.cymaticsCore)return;let r=n,s=t;typeof e=="string"&&t===null?s=this.currentCymaticData&&this.currentCymaticData.classId||1:typeof t=="number"&&(s=arguments[0],r=arguments[1],e=arguments[2]),this.cymaticsCore.setColor(s,r,new xe(e))}setCymaticColor2(e){if(!this.cymaticsCore)return;const t=this.currentCymaticData&&this.currentCymaticData.classId||1;this.cymaticsCore.setColor(t,2,new xe(e))}setCymaticColor3(e){}setCymaticParam(e,t,n){if(this.cymaticsCore){if(typeof e=="string"){const r=e,s=t,o=this.currentCymaticData&&this.currentCymaticData.classId||1;this.cymaticsCore.setParam(o,r,s);return}this.cymaticsCore.setParam(e,t,n)}}setCymaticTimer(e){this.cymaticsTimer=e;const t=document.getElementById("cymaticTimerLabel");t&&(e>300?t.textContent="INFINITE":e===0?t.textContent="OFF":t.textContent=e+"s")}dispose(){this.active=!1,Ce.animationId&&(cancelAnimationFrame(Ce.animationId),Ce.animationId=null),this._boundResize&&window.removeEventListener("resize",this._boundResize),this._boundResizeOverlayCanvas&&window.removeEventListener("resize",this._boundResizeOverlayCanvas),window.removeEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode&&window.removeEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange&&document.removeEventListener("visibilitychange",this._boundVisibilityChange),this._boundThemeChange&&window.removeEventListener("themeChanged",this._boundThemeChange),this.canvas&&(this._boundContextLost&&this.canvas.removeEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored&&this.canvas.removeEventListener("webglcontextrestored",this._boundContextRestored)),this._boundCymaticPointer&&(window.removeEventListener("mousemove",this._boundCymaticPointer),window.removeEventListener("touchmove",this._boundCymaticPointer));const e=n=>{if(n)for(;n.children.length>0;){const r=n.children[0];n.remove(r),r.traverse(s=>{if(s.geometry&&s.geometry.dispose(),s.material){if(s.material.map&&s.material.map.dispose(),s.material.uniforms)for(const o in s.material.uniforms)s.material.uniforms[o]&&s.material.uniforms[o].value&&s.material.uniforms[o].value.dispose&&s.material.uniforms[o].value.dispose();s.material.dispose()}})}},t=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];this._fpsRingBuffer=null,this._tempColor=null,this._logoRenderCanvas=null,t.forEach(e),this.cyberMaterial&&(this.cyberMaterial.dispose(),this.cyberMaterial=null),this.fireMaterial&&(this.fireMaterial.dispose(),this.fireMaterial=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.lightspeedMaterial&&(this.lightspeedMaterial.dispose(),this.lightspeedMaterial=null),this.rainMaterial&&(this.rainMaterial.dispose(),this.rainMaterial=null),this.petalMaterial&&(this.petalMaterial.dispose(),this.petalMaterial=null),this.logoMesh&&(this.logoMesh.material&&(this.logoMesh.material.map&&this.logoMesh.material.map.dispose(),this.logoMesh.material.dispose()),this.logoMesh.geometry&&this.logoMesh.geometry.dispose(),this.scene&&this.scene.remove(this.logoMesh),this.logoMesh=null);for(const n in this.textures)this.textures[n]&&this.textures[n].dispose&&this.textures[n].dispose();if(this.textures={},this._freqDataArray=null,this.renderer){try{this.renderer.forceContextLoss()}catch{}this.renderer.dispose(),this.renderer=null}this.scene=null,this.camera=null,console.log("[Visualizer] Disposed all GPU resources and removed listeners.")}setWarpSpeed(e){this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uSpeed.value=e)}setWarpFov(e){this.camera&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setWarpChromatic(e){this.lightspeedMaterial&&console.log(`[Warp] Chromatic Intensity set to: ${e}`)}}function cm(){return ve?Promise.resolve(ve):new Promise(i=>{im(),setTimeout(()=>i(ve),10)})}function im(){if(!ve&&Jt.canvas&&Jt.canvas.activeVisualizer&&Jt.canvas.activeVisualizer.isVisualizer3D&&(ve=Jt.canvas.activeVisualizer),Jt.canvas&&Jt.canvas.activeVisualizer){if(ve&&Jt.canvas.activeVisualizer===ve)return ve;Jt.canvas.activeVisualizer.dispose(),Jt.canvas.activeVisualizer=null,ve=null}Ce.animationId&&(cancelAnimationFrame(Ce.animationId),Ce.animationId=null);const i=Jt.canvas||document.getElementById("visualizer");if(!ve&&i){const e=i&&i.activeVisualizer&&i.activeVisualizer.isVisualizer3D?{activeModes:i.activeVisualizer.activeModes,mode:i.activeVisualizer.mode,mindWaveMode:i.activeVisualizer.mindWaveMode,cyberLogicMode:i.activeVisualizer.cyberLogicMode,cyberCustomText:i.activeVisualizer.cyberCustomText,currentCyberAngle:i.activeVisualizer.currentCyberAngle,cyberSpeedMultiplier:i.activeVisualizer.cyberSpeedMultiplier,rainbowEnabled:i.activeVisualizer._rainbowEnabled}:{};ve=new Fi(i,e),i.activeVisualizer=ve,setTimeout(()=>{ve&&(ve.updateVisibility(),rm())},0)}return ve}function um(){return ve}let na=!1;function hm(){na=!0,ve&&Ce.animationId&&(cancelAnimationFrame(Ce.animationId),Ce.animationId=null,ve.renderer&&ve.scene&&ve.camera&&ve.renderer.render(ve.scene,ve.camera))}function rm(){ve&&!Ce.animationId&&(ve.active=!0,ve.render(Ce.analyserLeft,Ce.analyserRight),na=!1)}function fm(){return na}function dm(i){ve&&ve.toggleMode(i)}function pm(i){ve&&(ve.setGlobalSpeed(i),ve.setCyberSpeed&&ve.setCyberSpeed(i))}function mm(i,e=null){ve&&(ve.setVisualColor(i,e),ve.setCyberColor&&(!e||e=="cyber")&&ve.setCyberColor(i))}function gm(i){ve&&ve.setGlobalBrightness&&ve.setGlobalBrightness(i)}function vm(i){ve&&ve.setLogoOpacity(i)}function xm(i){ve&&ve.setMouseInfluence(i)}window.toggleGalaxySun=function(){return ve?ve.toggleGalaxySunStyle():null};window.setCymaticPattern=function(i,e){if(window.setVisualMode&&window.setVisualMode("cymatics",!0,!0),ve&&ve.cymaticsCore){if(ve.cymaticsCore.setPattern(i,e),!ve.activeModes.has("cymatics")){if(window.switchRightTab){const s=document.querySelector('.tab-pill[title="Cymatics Engine"]');s&&window.switchRightTab("cymatics",s)}ve.activeModes.add("cymatics"),ve.cymaticsGroup.visible=!0}}else console.warn("Visualizer not fully initialized. Forcing init and setting pattern."),setTimeout(()=>{ve&&ve.cymaticsCore&&ve.cymaticsCore.setPattern(i,e)},500);const t=document.querySelectorAll(".cymatics-pattern-btn");t.forEach(s=>s.classList.remove("ring-2","ring-blue-400","scale-95"));const n=`window.setCymaticPattern(${i}, ${e})`,r=Array.from(t).find(s=>s.getAttribute("onclick")===n);r&&r.classList.add("ring-2","ring-blue-400","scale-95")};export{Fi as Visualizer3D,um as getVisualizer,im as initVisualizer,fm as isVisualsPaused,hm as pauseVisuals,cm as preloadVisualizer,rm as resumeVisuals,xm as setMouseInfluence,gm as setVisualBrightness,mm as setVisualColor,vm as setVisualLogoOpacity,pm as setVisualSpeed,dm as toggleVisual};
//# sourceMappingURL=visualizer_vGOLD_SYNC-CCI0UkKO.js.map
