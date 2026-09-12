import{m as pe,T as Ar,n as Qt}from"./bootloader-C4M82EBM.js";import"./preload-helper-CS1eXPs2.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rr="160",fc=0,Rr=1,dc=2,xl=1,pc=2,fi=3,pi=0,Nt=1,Mt=2,bi=0,Mn=1,Ye=2,Pr=3,Lr=4,mc=5,Fi=100,vc=101,gc=102,Ir=103,Dr=104,xc=200,_c=201,yc=202,Mc=203,Xa=204,Ya=205,Sc=206,bc=207,wc=208,Tc=209,Cc=210,Ec=211,Ac=212,Rc=213,Pc=214,Lc=0,Ic=1,Dc=2,Hs=3,Uc=4,Fc=5,Nc=6,Oc=7,_l=0,zc=1,Bc=2,wi=0,Gc=1,Vc=2,Hc=3,kc=4,Wc=5,qc=6,yl=300,wn=301,Tn=302,Za=303,Ka=304,Js=306,Ni=1e3,Ht=1001,ja=1002,mt=1003,Ur=1004,ra=1005,St=1006,Xc=1007,Kn=1008,Yc=1008,Ti=1009,Zc=1010,Kc=1011,or=1012,Ml=1013,Mi=1014,Si=1015,jn=1016,Sl=1017,bl=1018,Oi=1020,jc=1021,qt=1023,Jc=1024,$c=1025,zi=1026,Cn=1027,Qc=1028,wl=1029,eu=1030,Tl=1031,Cl=1033,oa=33776,la=33777,ca=33778,ua=33779,Fr=35840,Nr=35841,Or=35842,zr=35843,El=36196,Br=37492,Gr=37496,Vr=37808,Hr=37809,kr=37810,Wr=37811,qr=37812,Xr=37813,Yr=37814,Zr=37815,Kr=37816,jr=37817,Jr=37818,$r=37819,Qr=37820,eo=37821,ha=36492,to=36494,io=36495,tu=36283,no=36284,so=36285,ao=36286,Al=3e3,Bi=3001,iu=3200,nu=3201,su=0,au=1,Xt="",bt="srgb",mi="srgb-linear",lr="display-p3",$s="display-p3-linear",ks="linear",nt="srgb",Ws="rec709",qs="p3",qi=7680,ro=519,ru=512,ou=513,lu=514,Rl=515,cu=516,uu=517,hu=518,fu=519,Ja=35044,oo="300 es",$a=1035,di=2e3,Xs=2001;class An{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const a=n.indexOf(t);a!==-1&&n.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let a=0,r=n.length;a<r;a++)n[a].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let lo=1234567;const Sn=Math.PI/180,Jn=180/Math.PI;function ni(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ct[s&255]+Ct[s>>8&255]+Ct[s>>16&255]+Ct[s>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[i&255]+Ct[i>>8&255]+Ct[i>>16&255]+Ct[i>>24&255]).toLowerCase()}function wt(s,e,t){return Math.max(e,Math.min(t,s))}function cr(s,e){return(s%e+e)%e}function du(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function pu(s,e,t){return s!==e?(t-s)/(e-s):0}function kn(s,e,t){return(1-t)*s+t*e}function mu(s,e,t,i){return kn(s,e,1-Math.exp(-t*i))}function vu(s,e=1){return e-Math.abs(cr(s,e*2)-e)}function gu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function xu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function _u(s,e){return s+Math.floor(Math.random()*(e-s+1))}function yu(s,e){return s+Math.random()*(e-s)}function Mu(s){return s*(.5-Math.random())}function Su(s){s!==void 0&&(lo=s);let e=lo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function bu(s){return s*Sn}function wu(s){return s*Jn}function Qa(s){return(s&s-1)===0&&s!==0}function Tu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ys(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Cu(s,e,t,i,n){const a=Math.cos,r=Math.sin,o=a(t/2),l=r(t/2),c=a((e+i)/2),u=r((e+i)/2),h=a((e-i)/2),d=r((e-i)/2),f=a((i-e)/2),v=r((i-e)/2);switch(n){case"XYX":s.set(o*u,l*h,l*d,o*c);break;case"YZY":s.set(l*d,o*u,l*h,o*c);break;case"ZXZ":s.set(l*h,l*d,o*u,o*c);break;case"XZX":s.set(o*u,l*v,l*f,o*c);break;case"YXY":s.set(l*f,o*u,l*v,o*c);break;case"ZYZ":s.set(l*v,l*f,o*u,o*c);break;default:}}function ii(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Je(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const co={DEG2RAD:Sn,RAD2DEG:Jn,generateUUID:ni,clamp:wt,euclideanModulo:cr,mapLinear:du,inverseLerp:pu,lerp:kn,damp:mu,pingpong:vu,smoothstep:gu,smootherstep:xu,randInt:_u,randFloat:yu,randFloatSpread:Mu,seededRandom:Su,degToRad:bu,radToDeg:wu,isPowerOfTwo:Qa,ceilPowerOfTwo:Tu,floorPowerOfTwo:Ys,setQuaternionFromProperEuler:Cu,normalize:Je,denormalize:ii};class ne{constructor(e=0,t=0){ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*i-r*n+e.x,this.y=a*n+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,i,n,a,r,o,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,a,r,o,l,c)}set(e,t,i,n,a,r,o,l,c){const u=this.elements;return u[0]=e,u[1]=n,u[2]=o,u[3]=t,u[4]=a,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],v=i[8],_=n[0],m=n[3],p=n[6],y=n[1],g=n[4],b=n[7],P=n[2],C=n[5],E=n[8];return a[0]=r*_+o*y+l*P,a[3]=r*m+o*g+l*C,a[6]=r*p+o*b+l*E,a[1]=c*_+u*y+h*P,a[4]=c*m+u*g+h*C,a[7]=c*p+u*b+h*E,a[2]=d*_+f*y+v*P,a[5]=d*m+f*g+v*C,a[8]=d*p+f*b+v*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*r*u-t*o*c-i*a*u+i*o*l+n*a*c-n*r*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*r-o*c,d=o*l-u*a,f=c*a-r*l,v=t*h+i*d+n*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/v;return e[0]=h*_,e[1]=(n*c-u*i)*_,e[2]=(o*i-n*r)*_,e[3]=d*_,e[4]=(u*t-n*l)*_,e[5]=(n*a-o*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(r*t-i*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-n*c,n*l,-n*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(fa.makeScale(e,t)),this}rotate(e){return this.premultiply(fa.makeRotation(-e)),this}translate(e,t){return this.premultiply(fa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fa=new He;function Pl(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function $n(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Eu(){const s=$n("canvas");return s.style.display="block",s}const uo={};function Wn(s){s in uo||(uo[s]=!0)}const ho=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),fo=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),as={[mi]:{transfer:ks,primaries:Ws,toReference:s=>s,fromReference:s=>s},[bt]:{transfer:nt,primaries:Ws,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[$s]:{transfer:ks,primaries:qs,toReference:s=>s.applyMatrix3(fo),fromReference:s=>s.applyMatrix3(ho)},[lr]:{transfer:nt,primaries:qs,toReference:s=>s.convertSRGBToLinear().applyMatrix3(fo),fromReference:s=>s.applyMatrix3(ho).convertLinearToSRGB()}},Au=new Set([mi,$s]),$e={enabled:!0,_workingColorSpace:mi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Au.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const i=as[e].toReference,n=as[t].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return as[s].primaries},getTransfer:function(s){return s===Xt?ks:as[s].transfer}};function bn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function da(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Xi;class Ll{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Xi===void 0&&(Xi=$n("canvas")),Xi.width=e.width,Xi.height=e.height;const i=Xi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Xi}return t.width>2048||t.height>2048?t.toDataURL("image/jpeg",.6):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=$n("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),a=n.data;for(let r=0;r<a.length;r++)a[r]=bn(a[r]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(bn(t[i]/255)*255):t[i]=bn(t[i]);return{data:t,width:e.width,height:e.height}}else return e}}let Ru=0;class Il{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=ni(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let a;if(Array.isArray(n)){a=[];for(let r=0,o=n.length;r<o;r++)n[r].isDataTexture?a.push(pa(n[r].image)):a.push(pa(n[r]))}else a=pa(n);i.url=a}return t||(e.images[this.uuid]=i),i}}function pa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ll.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:{}}let Pu=0;class Rt extends An{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,i=Ht,n=Ht,a=St,r=Kn,o=qt,l=Ti,c=Rt.DEFAULT_ANISOTROPY,u=Xt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=ni(),this.name="",this.source=new Il(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Wn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Bi?bt:Xt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ni:e.x=e.x-Math.floor(e.x);break;case Ht:e.x=e.x<0?0:1;break;case ja:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ni:e.y=e.y-Math.floor(e.y);break;case Ht:e.y=e.y<0?0:1;break;case ja:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Wn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===bt?Bi:Al}set encoding(e){Wn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Bi?bt:Xt}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=yl;Rt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,i=0,n=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n+r[12]*a,this.y=r[1]*t+r[5]*i+r[9]*n+r[13]*a,this.z=r[2]*t+r[6]*i+r[10]*n+r[14]*a,this.w=r[3]*t+r[7]*i+r[11]*n+r[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,a;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],v=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(v+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const g=(c+1)/2,b=(f+1)/2,P=(p+1)/2,C=(u+d)/4,E=(h+_)/4,N=(v+m)/4;return g>b&&g>P?g<.01?(i=0,n=.707106781,a=.707106781):(i=Math.sqrt(g),n=C/i,a=E/i):b>P?b<.01?(i=.707106781,n=0,a=.707106781):(n=Math.sqrt(b),i=C/n,a=N/n):P<.01?(i=.707106781,n=.707106781,a=0):(a=Math.sqrt(P),i=E/a,n=N/a),this.set(i,n,a,t),this}let y=Math.sqrt((m-v)*(m-v)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-v)/y,this.y=(h-_)/y,this.z=(d-u)/y,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Lu extends An{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const n={width:e,height:t,depth:1};i.encoding!==void 0&&(Wn("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Bi?bt:Xt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:St,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Rt(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Il(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends Lu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Dl extends Rt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=mt,this.minFilter=mt,this.wrapR=Ht,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Iu extends Rt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=mt,this.minFilter=mt,this.wrapR=Ht,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class is{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,a,r,o){let l=i[n+0],c=i[n+1],u=i[n+2],h=i[n+3];const d=a[r+0],f=a[r+1],v=a[r+2],_=a[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=v,e[t+3]=_;return}if(h!==_||l!==d||c!==f||u!==v){let m=1-o;const p=l*d+c*f+u*v+h*_,y=p>=0?1:-1,g=1-p*p;if(g>Number.EPSILON){const P=Math.sqrt(g),C=Math.atan2(P,p*y);m=Math.sin(m*C)/P,o=Math.sin(o*C)/P}const b=o*y;if(l=l*m+d*b,c=c*m+f*b,u=u*m+v*b,h=h*m+_*b,m===1-o){const P=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=P,c*=P,u*=P,h*=P}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,n,a,r){const o=i[n],l=i[n+1],c=i[n+2],u=i[n+3],h=a[r],d=a[r+1],f=a[r+2],v=a[r+3];return e[t]=o*v+u*h+l*f-c*d,e[t+1]=l*v+u*d+c*h-o*f,e[t+2]=c*v+u*f+o*d-l*h,e[t+3]=u*v-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(n/2),h=o(a/2),d=l(i/2),f=l(n/2),v=l(a/2);switch(r){case"XYZ":this._x=d*u*h+c*f*v,this._y=c*f*h-d*u*v,this._z=c*u*v+d*f*h,this._w=c*u*h-d*f*v;break;case"YXZ":this._x=d*u*h+c*f*v,this._y=c*f*h-d*u*v,this._z=c*u*v-d*f*h,this._w=c*u*h+d*f*v;break;case"ZXY":this._x=d*u*h-c*f*v,this._y=c*f*h+d*u*v,this._z=c*u*v+d*f*h,this._w=c*u*h-d*f*v;break;case"ZYX":this._x=d*u*h-c*f*v,this._y=c*f*h+d*u*v,this._z=c*u*v-d*f*h,this._w=c*u*h+d*f*v;break;case"YZX":this._x=d*u*h+c*f*v,this._y=c*f*h+d*u*v,this._z=c*u*v-d*f*h,this._w=c*u*h-d*f*v;break;case"XZY":this._x=d*u*h-c*f*v,this._y=c*f*h-d*u*v,this._z=c*u*v+d*f*h,this._w=c*u*h+d*f*v;break;default:}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(a-c)*f,this._z=(r-n)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(n+r)/f,this._z=(a+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(a-c)/f,this._x=(n+r)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(r-n)/f,this._x=(a+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+r*o+n*c-a*l,this._y=n*u+r*l+a*o-i*c,this._z=a*u+r*c+i*l-n*o,this._w=r*u-i*o-n*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,a=this._z,r=this._w;let o=r*e._w+i*e._x+n*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=n,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*i+t*this._x,this._y=f*n+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=r*h+this._w*d,this._x=i*h+this._x*d,this._y=n*h+this._y*d,this._z=a*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),a=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(a),i*Math.cos(a),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(e=0,t=0,i=0){A.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(po.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(po.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*n,this.y=a[1]*t+a[4]*i+a[7]*n,this.z=a[2]*t+a[5]*i+a[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,a=e.elements,r=1/(a[3]*t+a[7]*i+a[11]*n+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*n+a[12])*r,this.y=(a[1]*t+a[5]*i+a[9]*n+a[13])*r,this.z=(a[2]*t+a[6]*i+a[10]*n+a[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*n-o*i),u=2*(o*t-a*n),h=2*(a*i-r*t);return this.x=t+l*c+r*h-o*u,this.y=i+l*u+o*c-a*h,this.z=n+l*h+a*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n,this.y=a[1]*t+a[5]*i+a[9]*n,this.z=a[2]*t+a[6]*i+a[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=n*l-a*o,this.y=a*r-i*l,this.z=i*o-n*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ma.copy(this).projectOnVector(e),this.sub(ma)}reflect(e){return this.sub(ma.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ma=new A,po=new is;class Hi{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Yt):Yt.fromBufferAttribute(a,r),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),rs.copy(i.boundingBox)),rs.applyMatrix4(e.matrixWorld),this.union(rs)}const n=e.children;for(let a=0,r=n.length;a<r;a++)this.expandByObject(n[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ln),os.subVectors(this.max,Ln),Yi.subVectors(e.a,Ln),Zi.subVectors(e.b,Ln),Ki.subVectors(e.c,Ln),vi.subVectors(Zi,Yi),gi.subVectors(Ki,Zi),Ri.subVectors(Yi,Ki);let t=[0,-vi.z,vi.y,0,-gi.z,gi.y,0,-Ri.z,Ri.y,vi.z,0,-vi.x,gi.z,0,-gi.x,Ri.z,0,-Ri.x,-vi.y,vi.x,0,-gi.y,gi.x,0,-Ri.y,Ri.x,0];return!va(t,Yi,Zi,Ki,os)||(t=[1,0,0,0,1,0,0,0,1],!va(t,Yi,Zi,Ki,os))?!1:(ls.crossVectors(vi,gi),t=[ls.x,ls.y,ls.z],va(t,Yi,Zi,Ki,os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ri=[new A,new A,new A,new A,new A,new A,new A,new A],Yt=new A,rs=new Hi,Yi=new A,Zi=new A,Ki=new A,vi=new A,gi=new A,Ri=new A,Ln=new A,os=new A,ls=new A,Pi=new A;function va(s,e,t,i,n){for(let a=0,r=s.length-3;a<=r;a+=3){Pi.fromArray(s,a);const o=n.x*Math.abs(Pi.x)+n.y*Math.abs(Pi.y)+n.z*Math.abs(Pi.z),l=e.dot(Pi),c=t.dot(Pi),u=i.dot(Pi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Du=new Hi,In=new A,ga=new A;class ki{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Du.setFromPoints(e).getCenter(i);let n=0;for(let a=0,r=e.length;a<r;a++)n=Math.max(n,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;In.subVectors(e,this.center);const t=In.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(In,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(In.copy(e.center).add(ga)),this.expandByPoint(In.copy(e.center).sub(ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const oi=new A,xa=new A,cs=new A,xi=new A,_a=new A,us=new A,ya=new A;class ur{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,t),oi.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){xa.copy(e).add(t).multiplyScalar(.5),cs.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(xa);const a=e.distanceTo(t)*.5,r=-this.direction.dot(cs),o=xi.dot(this.direction),l=-xi.dot(cs),c=xi.lengthSq(),u=Math.abs(1-r*r);let h,d,f,v;if(u>0)if(h=r*l-o,d=r*o-l,v=a*u,h>=0)if(d>=-v)if(d<=v){const _=1/u;h*=_,d*=_,f=h*(h+r*d+2*o)+d*(r*h+d+2*l)+c}else d=a,h=Math.max(0,-(r*d+o)),f=-h*h+d*(d+2*l)+c;else d=-a,h=Math.max(0,-(r*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-r*a+o)),d=h>0?-a:Math.min(Math.max(-a,-l),a),f=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-a,-l),a),f=d*(d+2*l)+c):(h=Math.max(0,-(r*a+o)),d=h>0?a:Math.min(Math.max(-a,-l),a),f=-h*h+d*(d+2*l)+c);else d=r>0?-a:a,h=Math.max(0,-(r*d+o)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),n&&n.copy(xa).addScaledVector(cs,d),f}intersectSphere(e,t){oi.subVectors(e.center,this.origin);const i=oi.dot(this.direction),n=oi.dot(oi)-i*i,a=e.radius*e.radius;if(n>a)return null;const r=Math.sqrt(a-n),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,a,r,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),u>=0?(a=(e.min.y-d.y)*u,r=(e.max.y-d.y)*u):(a=(e.max.y-d.y)*u,r=(e.min.y-d.y)*u),i>r||a>n||((a>i||isNaN(i))&&(i=a),(r<n||isNaN(n))&&(n=r),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,t,i,n,a){_a.subVectors(t,e),us.subVectors(i,e),ya.crossVectors(_a,us);let r=this.direction.dot(ya),o;if(r>0){if(n)return null;o=1}else if(r<0)o=-1,r=-r;else return null;xi.subVectors(this.origin,e);const l=o*this.direction.dot(us.crossVectors(xi,us));if(l<0)return null;const c=o*this.direction.dot(_a.cross(xi));if(c<0||l+c>r)return null;const u=-o*xi.dot(ya);return u<0?null:this.at(u/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(e,t,i,n,a,r,o,l,c,u,h,d,f,v,_,m){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,a,r,o,l,c,u,h,d,f,v,_,m)}set(e,t,i,n,a,r,o,l,c,u,h,d,f,v,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=n,p[1]=a,p[5]=r,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=v,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/ji.setFromMatrixColumn(e,0).length(),a=1/ji.setFromMatrixColumn(e,1).length(),r=1/ji.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,a=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),u=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const d=r*u,f=r*h,v=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+v*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=v+f*c,t[10]=r*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,v=c*u,_=c*h;t[0]=d+_*o,t[4]=v*o-f,t[8]=r*c,t[1]=r*h,t[5]=r*u,t[9]=-o,t[2]=f*o-v,t[6]=_+d*o,t[10]=r*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,v=c*u,_=c*h;t[0]=d-_*o,t[4]=-r*h,t[8]=v+f*o,t[1]=f+v*o,t[5]=r*u,t[9]=_-d*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const d=r*u,f=r*h,v=o*u,_=o*h;t[0]=l*u,t[4]=v*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-v,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const d=r*l,f=r*c,v=o*l,_=o*c;t[0]=l*u,t[4]=_-d*h,t[8]=v*h+f,t[1]=h,t[5]=r*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+v,t[10]=d-_*h}else if(e.order==="XZY"){const d=r*l,f=r*c,v=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=r*u,t[9]=f*h-v,t[2]=v*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Uu,e,Fu)}lookAt(e,t,i){const n=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),_i.crossVectors(i,zt),_i.lengthSq()===0&&(Math.abs(i.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),_i.crossVectors(i,zt)),_i.normalize(),hs.crossVectors(zt,_i),n[0]=_i.x,n[4]=hs.x,n[8]=zt.x,n[1]=_i.y,n[5]=hs.y,n[9]=zt.y,n[2]=_i.z,n[6]=hs.z,n[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],v=i[2],_=i[6],m=i[10],p=i[14],y=i[3],g=i[7],b=i[11],P=i[15],C=n[0],E=n[4],N=n[8],x=n[12],M=n[1],I=n[5],D=n[9],W=n[13],R=n[2],F=n[6],H=n[10],Y=n[14],q=n[3],X=n[7],K=n[11],Q=n[15];return a[0]=r*C+o*M+l*R+c*q,a[4]=r*E+o*I+l*F+c*X,a[8]=r*N+o*D+l*H+c*K,a[12]=r*x+o*W+l*Y+c*Q,a[1]=u*C+h*M+d*R+f*q,a[5]=u*E+h*I+d*F+f*X,a[9]=u*N+h*D+d*H+f*K,a[13]=u*x+h*W+d*Y+f*Q,a[2]=v*C+_*M+m*R+p*q,a[6]=v*E+_*I+m*F+p*X,a[10]=v*N+_*D+m*H+p*K,a[14]=v*x+_*W+m*Y+p*Q,a[3]=y*C+g*M+b*R+P*q,a[7]=y*E+g*I+b*F+P*X,a[11]=y*N+g*D+b*H+P*K,a[15]=y*x+g*W+b*Y+P*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],v=e[3],_=e[7],m=e[11],p=e[15];return v*(+a*l*h-n*c*h-a*o*d+i*c*d+n*o*f-i*l*f)+_*(+t*l*f-t*c*d+a*r*d-n*r*f+n*c*u-a*l*u)+m*(+t*c*h-t*o*f-a*r*h+i*r*f+a*o*u-i*c*u)+p*(-n*o*u-t*l*h+t*o*d+n*r*h-i*r*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],v=e[12],_=e[13],m=e[14],p=e[15],y=h*m*c-_*d*c+_*l*f-o*m*f-h*l*p+o*d*p,g=v*d*c-u*m*c-v*l*f+r*m*f+u*l*p-r*d*p,b=u*_*c-v*h*c+v*o*f-r*_*f-u*o*p+r*h*p,P=v*h*l-u*_*l-v*o*d+r*_*d+u*o*m-r*h*m,C=t*y+i*g+n*b+a*P;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/C;return e[0]=y*E,e[1]=(_*d*a-h*m*a-_*n*f+i*m*f+h*n*p-i*d*p)*E,e[2]=(o*m*a-_*l*a+_*n*c-i*m*c-o*n*p+i*l*p)*E,e[3]=(h*l*a-o*d*a-h*n*c+i*d*c+o*n*f-i*l*f)*E,e[4]=g*E,e[5]=(u*m*a-v*d*a+v*n*f-t*m*f-u*n*p+t*d*p)*E,e[6]=(v*l*a-r*m*a-v*n*c+t*m*c+r*n*p-t*l*p)*E,e[7]=(r*d*a-u*l*a+u*n*c-t*d*c-r*n*f+t*l*f)*E,e[8]=b*E,e[9]=(v*h*a-u*_*a-v*i*f+t*_*f+u*i*p-t*h*p)*E,e[10]=(r*_*a-v*o*a+v*i*c-t*_*c-r*i*p+t*o*p)*E,e[11]=(u*o*a-r*h*a-u*i*c+t*h*c+r*i*f-t*o*f)*E,e[12]=P*E,e[13]=(u*_*n-v*h*n+v*i*d-t*_*d-u*i*m+t*h*m)*E,e[14]=(v*o*n-r*_*n-v*i*l+t*_*l+r*i*m-t*o*m)*E,e[15]=(r*h*n-u*o*n+u*i*l-t*h*l-r*i*d+t*o*d)*E,this}scale(e){const t=this.elements,i=e.x,n=e.y,a=e.z;return t[0]*=i,t[4]*=n,t[8]*=a,t[1]*=i,t[5]*=n,t[9]*=a,t[2]*=i,t[6]*=n,t[10]*=a,t[3]*=i,t[7]*=n,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),a=1-i,r=e.x,o=e.y,l=e.z,c=a*r,u=a*o;return this.set(c*r+i,c*o-n*l,c*l+n*o,0,c*o+n*l,u*o+i,u*l-n*r,0,c*l-n*o,u*l+n*r,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,a,r){return this.set(1,i,a,0,e,1,r,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,u=r+r,h=o+o,d=a*c,f=a*u,v=a*h,_=r*u,m=r*h,p=o*h,y=l*c,g=l*u,b=l*h,P=i.x,C=i.y,E=i.z;return n[0]=(1-(_+p))*P,n[1]=(f+b)*P,n[2]=(v-g)*P,n[3]=0,n[4]=(f-b)*C,n[5]=(1-(d+p))*C,n[6]=(m+y)*C,n[7]=0,n[8]=(v+g)*E,n[9]=(m-y)*E,n[10]=(1-(d+_))*E,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let a=ji.set(n[0],n[1],n[2]).length();const r=ji.set(n[4],n[5],n[6]).length(),o=ji.set(n[8],n[9],n[10]).length();this.determinant()<0&&(a=-a),e.x=n[12],e.y=n[13],e.z=n[14],Zt.copy(this);const c=1/a,u=1/r,h=1/o;return Zt.elements[0]*=c,Zt.elements[1]*=c,Zt.elements[2]*=c,Zt.elements[4]*=u,Zt.elements[5]*=u,Zt.elements[6]*=u,Zt.elements[8]*=h,Zt.elements[9]*=h,Zt.elements[10]*=h,t.setFromRotationMatrix(Zt),i.x=a,i.y=r,i.z=o,this}makePerspective(e,t,i,n,a,r,o=di){const l=this.elements,c=2*a/(t-e),u=2*a/(i-n),h=(t+e)/(t-e),d=(i+n)/(i-n);let f,v;if(o===di)f=-(r+a)/(r-a),v=-2*r*a/(r-a);else if(o===Xs)f=-r/(r-a),v=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,n,a,r,o=di){const l=this.elements,c=1/(t-e),u=1/(i-n),h=1/(r-a),d=(t+e)*c,f=(i+n)*u;let v,_;if(o===di)v=(r+a)*h,_=-2*h;else if(o===Xs)v=a*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ji=new A,Zt=new Qe,Uu=new A(0,0,0),Fu=new A(1,1,1),_i=new A,hs=new A,zt=new A,mo=new Qe,vo=new is;class Qs{constructor(e=0,t=0,i=0,n=Qs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,a=n[0],r=n[4],o=n[8],l=n[1],c=n[5],u=n[9],h=n[2],d=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-wt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,f),this._y=0);break;default:}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return mo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vo.setFromEuler(this),this.setFromQuaternion(vo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qs.DEFAULT_ORDER="XYZ";class Ul{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Nu=0;const go=new A,Ji=new is,li=new Qe,fs=new A,Dn=new A,Ou=new A,zu=new is,xo=new A(1,0,0),_o=new A(0,1,0),yo=new A(0,0,1),Bu={type:"added"},Gu={type:"removed"};class pt extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new A,t=new Qs,i=new is,n=new A(1,1,1);function a(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Qe},normalMatrix:{value:new He}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(xo,e)}rotateY(e){return this.rotateOnAxis(_o,e)}rotateZ(e){return this.rotateOnAxis(yo,e)}translateOnAxis(e,t){return go.copy(e).applyQuaternion(this.quaternion),this.position.add(go.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xo,e)}translateY(e){return this.translateOnAxis(_o,e)}translateZ(e){return this.translateOnAxis(yo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fs.copy(e):fs.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Dn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(Dn,fs,this.up):li.lookAt(fs,Dn,this.up),this.quaternion.setFromRotationMatrix(li),n&&(li.extractRotation(n.matrixWorld),Ji.setFromRotationMatrix(li),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?this:(e&&e.isObject3D&&(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Bu)),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let a=0,r=n.length;a<r;a++)n[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dn,e,Ou),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dn,zu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const a=t[i];(a.matrixWorldAutoUpdate===!0||e===!0)&&a.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let a=0,r=n.length;a<r;a++){const o=n[a];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];a(e.shapes,h)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));n.material=o}else n.material=a(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),h=r(e.shapes),d=r(e.skeletons),f=r(e.animations),v=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),v.length>0&&(i.nodes=v)}return i.object=n,i;function r(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}pt.DEFAULT_UP=new A(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kt=new A,ci=new A,Ma=new A,ui=new A,$i=new A,Qi=new A,Mo=new A,Sa=new A,ba=new A,wa=new A;let ds=!1;class Gt{constructor(e=new A,t=new A,i=new A){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Kt.subVectors(e,t),n.cross(Kt);const a=n.lengthSq();return a>0?n.multiplyScalar(1/Math.sqrt(a)):n.set(0,0,0)}static getBarycoord(e,t,i,n,a){Kt.subVectors(n,t),ci.subVectors(i,t),Ma.subVectors(e,t);const r=Kt.dot(Kt),o=Kt.dot(ci),l=Kt.dot(Ma),c=ci.dot(ci),u=ci.dot(Ma),h=r*c-o*o;if(h===0)return a.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,v=(r*u-o*l)*d;return a.set(1-f-v,v,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getUV(e,t,i,n,a,r,o,l){return ds===!1&&(ds=!0),this.getInterpolation(e,t,i,n,a,r,o,l)}static getInterpolation(e,t,i,n,a,r,o,l){return this.getBarycoord(e,t,i,n,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,ui.x),l.addScaledVector(r,ui.y),l.addScaledVector(o,ui.z),l)}static isFrontFacing(e,t,i,n){return Kt.subVectors(i,t),ci.subVectors(e,t),Kt.cross(ci).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),Kt.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,a){return ds===!1&&(ds=!0),Gt.getInterpolation(e,this.a,this.b,this.c,t,i,n,a)}getInterpolation(e,t,i,n,a){return Gt.getInterpolation(e,this.a,this.b,this.c,t,i,n,a)}containsPoint(e){return Gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,a=this.c;let r,o;$i.subVectors(n,i),Qi.subVectors(a,i),Sa.subVectors(e,i);const l=$i.dot(Sa),c=Qi.dot(Sa);if(l<=0&&c<=0)return t.copy(i);ba.subVectors(e,n);const u=$i.dot(ba),h=Qi.dot(ba);if(u>=0&&h<=u)return t.copy(n);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return r=l/(l-u),t.copy(i).addScaledVector($i,r);wa.subVectors(e,a);const f=$i.dot(wa),v=Qi.dot(wa);if(v>=0&&f<=v)return t.copy(a);const _=f*c-l*v;if(_<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(Qi,o);const m=u*v-f*h;if(m<=0&&h-u>=0&&f-v>=0)return Mo.subVectors(a,n),o=(h-u)/(h-u+(f-v)),t.copy(n).addScaledVector(Mo,o);const p=1/(m+_+d);return r=_*p,o=d*p,t.copy(i).addScaledVector($i,r).addScaledVector(Qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},ps={h:0,s:0,l:0};function Ta(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class he{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=$e.workingColorSpace){if(e=cr(e,1),t=wt(t,0,1),i=wt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,r=2*i-a;this.r=Ta(r,a,e+1/3),this.g=Ta(r,a,e),this.b=Ta(r,a,e-1/3)}return $e.toWorkingColorSpace(this,n),this}setStyle(e,t=bt){function i(a){a!==void 0&&parseFloat(a)<1}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=n[1],o=n[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=n[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){const i=Fl[e.toLowerCase()];return i!==void 0&&this.setHex(i,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bn(e.r),this.g=bn(e.g),this.b=bn(e.b),this}copyLinearToSRGB(e){return this.r=da(e.r),this.g=da(e.g),this.b=da(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return $e.fromWorkingColorSpace(Et.copy(this),e),Math.round(wt(Et.r*255,0,255))*65536+Math.round(wt(Et.g*255,0,255))*256+Math.round(wt(Et.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(Et.copy(this),t);const i=Et.r,n=Et.g,a=Et.b,r=Math.max(i,n,a),o=Math.min(i,n,a);let l,c;const u=(o+r)/2;if(o===r)l=0,c=0;else{const h=r-o;switch(c=u<=.5?h/(r+o):h/(2-r-o),r){case i:l=(n-a)/h+(n<a?6:0);break;case n:l=(a-i)/h+2;break;case a:l=(i-n)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=bt){$e.fromWorkingColorSpace(Et.copy(this),e);const t=Et.r,i=Et.g,n=Et.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(yi),this.setHSL(yi.h+e,yi.s+t,yi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(yi),e.getHSL(ps);const i=kn(yi.h,ps.h,t),n=kn(yi.s,ps.s,t),a=kn(yi.l,ps.l,t);return this.setHSL(i,n,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*n,this.g=a[1]*t+a[4]*i+a[7]*n,this.b=a[2]*t+a[5]*i+a[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new he;he.NAMES=Fl;let Vu=0;class Wi extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=Mn,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xa,this.blendDst=Ya,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ro,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0)continue;const n=this[t];n!==void 0&&(n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Mn&&(i.blending=this.blending),this.side!==pi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xa&&(i.blendSrc=this.blendSrc),this.blendDst!==Ya&&(i.blendDst=this.blendDst),this.blendEquation!==Fi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Hs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ro&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=n(e.textures),r=n(e.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let a=0;a!==n;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class At extends Wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=_l,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new A,ms=new ne;class st{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,a=this.itemSize;n<a;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ms.fromBufferAttribute(this,t),ms.applyMatrix3(e),this.setXY(t,ms.x,ms.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ii(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Je(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,a){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),n=Je(n,this.array),a=Je(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ja&&(e.usage=this.usage),e}}class Nl extends st{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ol extends st{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ne extends st{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Hu=0;const Wt=new Qe,Ca=new pt,en=new A,Bt=new Hi,Un=new Hi,yt=new A;class Ze extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pl(e)?Ol:Nl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new He().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,i){return Wt.makeTranslation(e,t,i),this.applyMatrix4(Wt),this}scale(e,t,i){return Wt.makeScale(e,t,i),this.applyMatrix4(Wt),this}lookAt(e){return Ca.lookAt(e),Ca.updateMatrix(),this.applyMatrix4(Ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(en).negate(),this.translate(en.x,en.y,en.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const a=e[i];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new Ne(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const a=t[i];Bt.setFromBufferAttribute(a),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingSphere.set(new A,1/0);return}if(e){const i=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];Un.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(Bt.min,Un.min),Bt.expandByPoint(yt),yt.addVectors(Bt.max,Un.max),Bt.expandByPoint(yt)):(Bt.expandByPoint(Un.min),Bt.expandByPoint(Un.max))}Bt.getCenter(i);let n=0;for(let a=0,r=e.count;a<r;a++)yt.fromBufferAttribute(e,a),n=Math.max(n,i.distanceToSquared(yt));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)yt.fromBufferAttribute(o,c),l&&(en.fromBufferAttribute(e,c),yt.add(en)),n=Math.max(n,i.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return;const i=e.array,n=t.position.array,a=t.normal.array,r=t.uv.array,o=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new st(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let M=0;M<o;M++)c[M]=new A,u[M]=new A;const h=new A,d=new A,f=new A,v=new ne,_=new ne,m=new ne,p=new A,y=new A;function g(M,I,D){h.fromArray(n,M*3),d.fromArray(n,I*3),f.fromArray(n,D*3),v.fromArray(r,M*2),_.fromArray(r,I*2),m.fromArray(r,D*2),d.sub(h),f.sub(h),_.sub(v),m.sub(v);const W=1/(_.x*m.y-m.x*_.y);isFinite(W)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar(W),y.copy(f).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(W),c[M].add(p),c[I].add(p),c[D].add(p),u[M].add(y),u[I].add(y),u[D].add(y))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let M=0,I=b.length;M<I;++M){const D=b[M],W=D.start,R=D.count;for(let F=W,H=W+R;F<H;F+=3)g(i[F+0],i[F+1],i[F+2])}const P=new A,C=new A,E=new A,N=new A;function x(M){E.fromArray(a,M*3),N.copy(E);const I=c[M];P.copy(I),P.sub(E.multiplyScalar(E.dot(I))).normalize(),C.crossVectors(N,I);const W=C.dot(u[M])<0?-1:1;l[M*4]=P.x,l[M*4+1]=P.y,l[M*4+2]=P.z,l[M*4+3]=W}for(let M=0,I=b.length;M<I;++M){const D=b[M],W=D.start,R=D.count;for(let F=W,H=W+R;F<H;F+=3)x(i[F+0]),x(i[F+1]),x(i[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new st(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const n=new A,a=new A,r=new A,o=new A,l=new A,c=new A,u=new A,h=new A;if(e)for(let d=0,f=e.count;d<f;d+=3){const v=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,v),a.fromBufferAttribute(t,_),r.fromBufferAttribute(t,m),u.subVectors(r,a),h.subVectors(n,a),u.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)n.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),u.subVectors(r,a),h.subVectors(n,a),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,v=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let p=0;p<u;p++)d[v++]=c[f++]}return new st(d,u,h)}if(this.index===null)return this;const t=new Ze,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(n[l]=u,a=!0)}a&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const c in n){const u=n[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],h=a[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,u=r.length;c<u;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const So=new Qe,Li=new ur,vs=new ki,bo=new A,tn=new A,nn=new A,sn=new A,Ea=new A,gs=new A,xs=new ne,_s=new ne,ys=new ne,wo=new A,To=new A,Co=new A,Ms=new A,Ss=new A;class We extends pt{constructor(e=new Ze,t=new At){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=n.length;a<r;a++){const o=n[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(a&&o){gs.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=o[l],h=a[l];u!==0&&(Ea.fromBufferAttribute(h,e),r?gs.addScaledVector(Ea,u):gs.addScaledVector(Ea.sub(t),u))}t.add(gs)}return t}raycast(e,t){const i=this.geometry,n=this.material,a=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),vs.copy(i.boundingSphere),vs.applyMatrix4(a),Li.copy(e.ray).recast(e.near),!(vs.containsPoint(Li.origin)===!1&&(Li.intersectSphere(vs,bo)===null||Li.origin.distanceToSquared(bo)>(e.far-e.near)**2))&&(So.copy(a).invert(),Li.copy(e.ray).applyMatrix4(So),!(i.boundingBox!==null&&Li.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Li)))}_computeIntersections(e,t,i){let n;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,h=a.attributes.normal,d=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let v=0,_=d.length;v<_;v++){const m=d[v],p=r[m.materialIndex],y=Math.max(m.start,f.start),g=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=y,P=g;b<P;b+=3){const C=o.getX(b),E=o.getX(b+1),N=o.getX(b+2);n=bs(this,p,e,i,c,u,h,C,E,N),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const v=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=v,p=_;m<p;m+=3){const y=o.getX(m),g=o.getX(m+1),b=o.getX(m+2);n=bs(this,r,e,i,c,u,h,y,g,b),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(r))for(let v=0,_=d.length;v<_;v++){const m=d[v],p=r[m.materialIndex],y=Math.max(m.start,f.start),g=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=y,P=g;b<P;b+=3){const C=b,E=b+1,N=b+2;n=bs(this,p,e,i,c,u,h,C,E,N),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const v=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=v,p=_;m<p;m+=3){const y=m,g=m+1,b=m+2;n=bs(this,r,e,i,c,u,h,y,g,b),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function ku(s,e,t,i,n,a,r,o){let l;if(e.side===Nt?l=i.intersectTriangle(r,a,n,!0,o):l=i.intersectTriangle(n,a,r,e.side===pi,o),l===null)return null;Ss.copy(o),Ss.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ss);return c<t.near||c>t.far?null:{distance:c,point:Ss.clone(),object:s}}function bs(s,e,t,i,n,a,r,o,l,c){s.getVertexPosition(o,tn),s.getVertexPosition(l,nn),s.getVertexPosition(c,sn);const u=ku(s,e,t,i,tn,nn,sn,Ms);if(u){n&&(xs.fromBufferAttribute(n,o),_s.fromBufferAttribute(n,l),ys.fromBufferAttribute(n,c),u.uv=Gt.getInterpolation(Ms,tn,nn,sn,xs,_s,ys,new ne)),a&&(xs.fromBufferAttribute(a,o),_s.fromBufferAttribute(a,l),ys.fromBufferAttribute(a,c),u.uv1=Gt.getInterpolation(Ms,tn,nn,sn,xs,_s,ys,new ne),u.uv2=u.uv1),r&&(wo.fromBufferAttribute(r,o),To.fromBufferAttribute(r,l),Co.fromBufferAttribute(r,c),u.normal=Gt.getInterpolation(Ms,tn,nn,sn,wo,To,Co,new A),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new A,materialIndex:0};Gt.getNormal(tn,nn,sn,h.normal),u.face=h}return u}class Ci extends Ze{constructor(e=1,t=1,i=1,n=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:a,depthSegments:r};const o=this;n=Math.floor(n),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],u=[],h=[];let d=0,f=0;v("z","y","x",-1,-1,i,t,e,r,a,0),v("z","y","x",1,-1,i,t,-e,r,a,1),v("x","z","y",1,1,e,i,t,n,r,2),v("x","z","y",1,-1,e,i,-t,n,r,3),v("x","y","z",1,-1,e,t,i,n,a,4),v("x","y","z",-1,-1,e,t,-i,n,a,5),this.setIndex(l),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(u,3)),this.setAttribute("uv",new Ne(h,2));function v(_,m,p,y,g,b,P,C,E,N,x){const M=b/E,I=P/N,D=b/2,W=P/2,R=C/2,F=E+1,H=N+1;let Y=0,q=0;const X=new A;for(let K=0;K<H;K++){const Q=K*I-W;for(let ue=0;ue<F;ue++){const k=ue*M-D;X[_]=k*y,X[m]=Q*g,X[p]=R,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[p]=C>0?1:-1,u.push(X.x,X.y,X.z),h.push(ue/E),h.push(1-K/N),Y+=1}}for(let K=0;K<N;K++)for(let Q=0;Q<E;Q++){const ue=d+Q+F*K,k=d+Q+F*(K+1),Z=d+(Q+1)+F*(K+1),oe=d+(Q+1)+F*K;l.push(ue,k,oe),l.push(k,Z,oe),q+=6}o.addGroup(f,q,x),f+=q,d+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function En(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?e[t][i]=null:e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function Ut(s){const e={};for(let t=0;t<s.length;t++){const i=En(s[t]);for(const n in i)e[n]=i[n]}return e}function Wu(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function zl(s){return s.getRenderTarget()===null?s.outputColorSpace:$e.workingColorSpace}const qu={clone:En,merge:Ut};var Xu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ft extends Wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xu,this.fragmentShader=Yu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=En(e.uniforms),this.uniformsGroups=Wu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:"m4",value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Bl extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=di}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Vt extends Bl{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Jn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jn*2*Math.atan(Math.tan(Sn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Sn*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,a=-.5*n;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*n/l,t-=r.offsetY*i/c,n*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const an=-90,rn=1;class Zu extends pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Vt(an,rn,e,t);n.layers=this.layers,this.add(n);const a=new Vt(an,rn,e,t);a.layers=this.layers,this.add(a);const r=new Vt(an,rn,e,t);r.layers=this.layers,this.add(r);const o=new Vt(an,rn,e,t);o.layers=this.layers,this.add(o);const l=new Vt(an,rn,e,t);l.layers=this.layers,this.add(l);const c=new Vt(an,rn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===di)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,a),e.setRenderTarget(i,1,n),e.render(t,r),e.setRenderTarget(i,2,n),e.render(t,o),e.setRenderTarget(i,3,n),e.render(t,l),e.setRenderTarget(i,4,n),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,n),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Gl extends Rt{constructor(e,t,i,n,a,r,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:wn,super(e,t,i,n,a,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ku extends Gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];t.encoding!==void 0&&(Wn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Bi?bt:Xt),this.texture=new Gl(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:St}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Ci(5,5,5),a=new ft({name:"CubemapFromEquirect",uniforms:En(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Nt,blending:bi});a.uniforms.tEquirect.value=t;const r=new We(n,a),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=St),new Zu(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,i,n){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,n);e.setRenderTarget(a)}}const Aa=new A,ju=new A,Ju=new He;class Di{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=Aa.subVectors(i,t).cross(ju.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Aa),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/n;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ju.getNormalMatrix(e),n=this.coplanarPoint(Aa).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ii=new ki,ws=new A;class hr{constructor(e=new Di,t=new Di,i=new Di,n=new Di,a=new Di,r=new Di){this.planes=[e,t,i,n,a,r]}set(e,t,i,n,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=di){const i=this.planes,n=e.elements,a=n[0],r=n[1],o=n[2],l=n[3],c=n[4],u=n[5],h=n[6],d=n[7],f=n[8],v=n[9],_=n[10],m=n[11],p=n[12],y=n[13],g=n[14],b=n[15];if(i[0].setComponents(l-a,d-c,m-f,b-p).normalize(),i[1].setComponents(l+a,d+c,m+f,b+p).normalize(),i[2].setComponents(l+r,d+u,m+v,b+y).normalize(),i[3].setComponents(l-r,d-u,m-v,b-y).normalize(),i[4].setComponents(l-o,d-h,m-_,b-g).normalize(),t===di)i[5].setComponents(l+o,d+h,m+_,b+g).normalize();else if(t===Xs)i[5].setComponents(o,h,_,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(e){return Ii.center.set(0,0,0),Ii.radius=.7071067811865476,Ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(ws.x=n.normal.x>0?e.max.x:e.min.x,ws.y=n.normal.y>0?e.max.y:e.min.y,ws.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Vl(){let s=null,e=!1,t=null,i=null;function n(a,r){t(a,r),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){s=a}}}function $u(s,e){const t=e.isWebGL2,i=new WeakMap;function n(c,u){const h=c.array,d=c.usage,f=h.byteLength,v=s.createBuffer();s.bindBuffer(u,v),s.bufferData(u,h,d),c.onUploadCallback();let _;if(h instanceof Float32Array)_=s.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=s.SHORT;else if(h instanceof Uint32Array)_=s.UNSIGNED_INT;else if(h instanceof Int32Array)_=s.INT;else if(h instanceof Int8Array)_=s.BYTE;else if(h instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:f}}function a(c,u,h){const d=u.array,f=u._updateRange,v=u.updateRanges;if(s.bindBuffer(h,c),f.count===-1&&v.length===0&&s.bufferSubData(h,0,d),v.length!==0){for(let _=0,m=v.length;_<m;_++){const p=v[_];t?s.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):s.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(t?s.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(s.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);if(h===void 0)i.set(c,n(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(h.buffer,c,u),h.version=c.version}}return{get:r,remove:o,update:l}}class Jt extends Ze{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const a=e/2,r=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,u=l+1,h=e/o,d=t/l,f=[],v=[],_=[],m=[];for(let p=0;p<u;p++){const y=p*d-r;for(let g=0;g<c;g++){const b=g*h-a;v.push(b,-y,0),_.push(0,0,1),m.push(g/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const g=y+c*p,b=y+c*(p+1),P=y+1+c*(p+1),C=y+1+c*p;f.push(g,b,C),f.push(b,P,C)}this.setIndex(f),this.setAttribute("position",new Ne(v,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.width,e.height,e.widthSegments,e.heightSegments)}}var Qu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eh=`#ifdef USE_ALPHAHASH
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
#endif`,th=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ih=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,sh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ah=`#ifdef USE_AOMAP
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
#endif`,rh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,oh=`#ifdef USE_BATCHING
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
#endif`,lh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,ch=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fh=`#ifdef USE_IRIDESCENCE
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
#endif`,dh=`#ifdef USE_BUMPMAP
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
#endif`,ph=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_h=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Mh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Sh=`#define PI 3.141592653589793
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
} // validated`,bh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wh=`vec3 transformedNormal = objectNormal;
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
#endif`,Th=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ch=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Eh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ah=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ph=`
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
}`,Lh=`#ifdef USE_ENVMAP
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
#endif`,Ih=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dh=`#ifdef USE_ENVMAP
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
#endif`,Uh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fh=`#ifdef USE_ENVMAP
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
#endif`,Nh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Oh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gh=`#ifdef USE_GRADIENTMAP
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
}`,Vh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Hh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qh=`uniform bool receiveShadow;
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
#endif`,Xh=`#ifdef USE_ENVMAP
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
#endif`,Yh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jh=`PhysicalMaterial material;
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
#endif`,$h=`struct PhysicalMaterial {
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
}`,Qh=`
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
#endif`,ef=`#if defined( RE_IndirectDiffuse )
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
#endif`,tf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,af=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,rf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,of=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,uf=`#if defined( USE_POINTS_UV )
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
#endif`,hf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ff=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,df=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pf=`#ifdef USE_MORPHNORMALS
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
#endif`,mf=`#ifdef USE_MORPHTARGETS
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
#endif`,vf=`#ifdef USE_MORPHTARGETS
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
#endif`,gf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_f=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sf=`#ifdef USE_NORMALMAP
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
#endif`,bf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ef=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Af=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Rf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,If=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Df=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ff=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Of=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zf=`float getShadowMask() {
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
}`,Bf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gf=`#ifdef USE_SKINNING
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
#endif`,Vf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hf=`#ifdef USE_SKINNING
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
#endif`,kf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yf=`#ifdef USE_TRANSMISSION
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
#endif`,Zf=`#ifdef USE_TRANSMISSION
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
#endif`,Kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$f=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ed=`uniform sampler2D t2D;
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
}`,td=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,id=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ad=`#include <common>
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
}`,rd=`#if DEPTH_PACKING == 3200
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
}`,od=`#define DISTANCE
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
}`,ld=`#define DISTANCE
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
}`,cd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ud=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hd=`uniform float scale;
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
}`,fd=`uniform vec3 diffuse;
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
}`,dd=`#include <common>
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
}`,pd=`uniform vec3 diffuse;
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
}`,md=`#define LAMBERT
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
}`,vd=`#define LAMBERT
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
}`,gd=`#define MATCAP
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
}`,xd=`#define MATCAP
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
}`,_d=`#define NORMAL
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
}`,yd=`#define NORMAL
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
}`,Md=`#define PHONG
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
}`,Sd=`#define PHONG
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
}`,bd=`#define STANDARD
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
}`,wd=`#define STANDARD
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
}`,Td=`#define TOON
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
}`,Cd=`#define TOON
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
}`,Ed=`uniform float size;
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
}`,Ad=`uniform vec3 diffuse;
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
}`,Rd=`#include <common>
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
}`,Pd=`uniform vec3 color;
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
}`,Ld=`uniform float rotation;
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
}`,Id=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:Qu,alphahash_pars_fragment:eh,alphamap_fragment:th,alphamap_pars_fragment:ih,alphatest_fragment:nh,alphatest_pars_fragment:sh,aomap_fragment:ah,aomap_pars_fragment:rh,batching_pars_vertex:oh,batching_vertex:lh,begin_vertex:ch,beginnormal_vertex:uh,bsdfs:hh,iridescence_fragment:fh,bumpmap_pars_fragment:dh,clipping_planes_fragment:ph,clipping_planes_pars_fragment:mh,clipping_planes_pars_vertex:vh,clipping_planes_vertex:gh,color_fragment:xh,color_pars_fragment:_h,color_pars_vertex:yh,color_vertex:Mh,common:Sh,cube_uv_reflection_fragment:bh,defaultnormal_vertex:wh,displacementmap_pars_vertex:Th,displacementmap_vertex:Ch,emissivemap_fragment:Eh,emissivemap_pars_fragment:Ah,colorspace_fragment:Rh,colorspace_pars_fragment:Ph,envmap_fragment:Lh,envmap_common_pars_fragment:Ih,envmap_pars_fragment:Dh,envmap_pars_vertex:Uh,envmap_physical_pars_fragment:Xh,envmap_vertex:Fh,fog_vertex:Nh,fog_pars_vertex:Oh,fog_fragment:zh,fog_pars_fragment:Bh,gradientmap_pars_fragment:Gh,lightmap_fragment:Vh,lightmap_pars_fragment:Hh,lights_lambert_fragment:kh,lights_lambert_pars_fragment:Wh,lights_pars_begin:qh,lights_toon_fragment:Yh,lights_toon_pars_fragment:Zh,lights_phong_fragment:Kh,lights_phong_pars_fragment:jh,lights_physical_fragment:Jh,lights_physical_pars_fragment:$h,lights_fragment_begin:Qh,lights_fragment_maps:ef,lights_fragment_end:tf,logdepthbuf_fragment:nf,logdepthbuf_pars_fragment:sf,logdepthbuf_pars_vertex:af,logdepthbuf_vertex:rf,map_fragment:of,map_pars_fragment:lf,map_particle_fragment:cf,map_particle_pars_fragment:uf,metalnessmap_fragment:hf,metalnessmap_pars_fragment:ff,morphcolor_vertex:df,morphnormal_vertex:pf,morphtarget_pars_vertex:mf,morphtarget_vertex:vf,normal_fragment_begin:gf,normal_fragment_maps:xf,normal_pars_fragment:_f,normal_pars_vertex:yf,normal_vertex:Mf,normalmap_pars_fragment:Sf,clearcoat_normal_fragment_begin:bf,clearcoat_normal_fragment_maps:wf,clearcoat_pars_fragment:Tf,iridescence_pars_fragment:Cf,opaque_fragment:Ef,packing:Af,premultiplied_alpha_fragment:Rf,project_vertex:Pf,dithering_fragment:Lf,dithering_pars_fragment:If,roughnessmap_fragment:Df,roughnessmap_pars_fragment:Uf,shadowmap_pars_fragment:Ff,shadowmap_pars_vertex:Nf,shadowmap_vertex:Of,shadowmask_pars_fragment:zf,skinbase_vertex:Bf,skinning_pars_vertex:Gf,skinning_vertex:Vf,skinnormal_vertex:Hf,specularmap_fragment:kf,specularmap_pars_fragment:Wf,tonemapping_fragment:qf,tonemapping_pars_fragment:Xf,transmission_fragment:Yf,transmission_pars_fragment:Zf,uv_pars_fragment:Kf,uv_pars_vertex:jf,uv_vertex:Jf,worldpos_vertex:$f,background_vert:Qf,background_frag:ed,backgroundCube_vert:td,backgroundCube_frag:id,cube_vert:nd,cube_frag:sd,depth_vert:ad,depth_frag:rd,distanceRGBA_vert:od,distanceRGBA_frag:ld,equirect_vert:cd,equirect_frag:ud,linedashed_vert:hd,linedashed_frag:fd,meshbasic_vert:dd,meshbasic_frag:pd,meshlambert_vert:md,meshlambert_frag:vd,meshmatcap_vert:gd,meshmatcap_frag:xd,meshnormal_vert:_d,meshnormal_frag:yd,meshphong_vert:Md,meshphong_frag:Sd,meshphysical_vert:bd,meshphysical_frag:wd,meshtoon_vert:Td,meshtoon_frag:Cd,points_vert:Ed,points_frag:Ad,shadow_vert:Rd,shadow_frag:Pd,sprite_vert:Ld,sprite_frag:Id},ie={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},ti={basic:{uniforms:Ut([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Ut([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new he(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Ut([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Ut([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Ut([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new he(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Ut([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Ut([ie.points,ie.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Ut([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Ut([ie.common,ie.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Ut([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Ut([ie.sprite,ie.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Ut([ie.common,ie.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Ut([ie.lights,ie.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};ti.physical={uniforms:Ut([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const Ts={r:0,b:0,g:0};function Dd(s,e,t,i,n,a,r){const o=new he(0);let l=a===!0?0:1,c,u,h=null,d=0,f=null;function v(m,p){let y=!1,g=p.isScene===!0?p.background:null;g&&g.isTexture&&(g=(p.backgroundBlurriness>0?t:e).get(g)),g===null?_(o,l):g&&g.isColor&&(_(g,1),y=!0);const b=s.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(s.autoClear||y)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),g&&(g.isCubeTexture||g.mapping===Js)?(u===void 0&&(u=new We(new Ci(1,1,1),new ft({name:"BackgroundCubeMaterial",uniforms:En(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,C,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(u)),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=$e.getTransfer(g.colorSpace)!==nt,(h!==g||d!==g.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=g,d=g.version,f=s.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(c===void 0&&(c=new We(new Jt(2,2),new ft({name:"BackgroundMaterial",uniforms:En(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=g,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=$e.getTransfer(g.colorSpace)!==nt,g.matrixAutoUpdate===!0&&g.updateMatrix(),c.material.uniforms.uvTransform.value.copy(g.matrix),(h!==g||d!==g.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=g,d=g.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(Ts,zl(s)),i.buffers.color.setClear(Ts.r,Ts.g,Ts.b,p,r)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:v}}function Ud(s,e,t,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),a=i.isWebGL2?null:e.get("OES_vertex_array_object"),r=i.isWebGL2||a!==null,o={},l=m(null);let c=l,u=!1;function h(R,F,H,Y,q){let X=!1;if(r){const K=_(Y,H,F);c!==K&&(c=K,f(c.object)),X=p(R,Y,H,q),X&&y(R,Y,H,q)}else{const K=F.wireframe===!0;(c.geometry!==Y.id||c.program!==H.id||c.wireframe!==K)&&(c.geometry=Y.id,c.program=H.id,c.wireframe=K,X=!0)}q!==null&&t.update(q,s.ELEMENT_ARRAY_BUFFER),(X||u)&&(u=!1,N(R,F,H,Y),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function d(){return i.isWebGL2?s.createVertexArray():a.createVertexArrayOES()}function f(R){return i.isWebGL2?s.bindVertexArray(R):a.bindVertexArrayOES(R)}function v(R){return i.isWebGL2?s.deleteVertexArray(R):a.deleteVertexArrayOES(R)}function _(R,F,H){const Y=H.wireframe===!0;let q=o[R.id];q===void 0&&(q={},o[R.id]=q);let X=q[F.id];X===void 0&&(X={},q[F.id]=X);let K=X[Y];return K===void 0&&(K=m(d()),X[Y]=K),K}function m(R){const F=[],H=[],Y=[];for(let q=0;q<n;q++)F[q]=0,H[q]=0,Y[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:H,attributeDivisors:Y,object:R,attributes:{},index:null}}function p(R,F,H,Y){const q=c.attributes,X=F.attributes;let K=0;const Q=H.getAttributes();for(const ue in Q)if(Q[ue].location>=0){const Z=q[ue];let oe=X[ue];if(oe===void 0&&(ue==="instanceMatrix"&&R.instanceMatrix&&(oe=R.instanceMatrix),ue==="instanceColor"&&R.instanceColor&&(oe=R.instanceColor)),Z===void 0||Z.attribute!==oe||oe&&Z.data!==oe.data)return!0;K++}return c.attributesNum!==K||c.index!==Y}function y(R,F,H,Y){const q={},X=F.attributes;let K=0;const Q=H.getAttributes();for(const ue in Q)if(Q[ue].location>=0){let Z=X[ue];Z===void 0&&(ue==="instanceMatrix"&&R.instanceMatrix&&(Z=R.instanceMatrix),ue==="instanceColor"&&R.instanceColor&&(Z=R.instanceColor));const oe={};oe.attribute=Z,Z&&Z.data&&(oe.data=Z.data),q[ue]=oe,K++}c.attributes=q,c.attributesNum=K,c.index=Y}function g(){const R=c.newAttributes;for(let F=0,H=R.length;F<H;F++)R[F]=0}function b(R){P(R,0)}function P(R,F){const H=c.newAttributes,Y=c.enabledAttributes,q=c.attributeDivisors;H[R]=1,Y[R]===0&&(s.enableVertexAttribArray(R),Y[R]=1),q[R]!==F&&((i.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,F),q[R]=F)}function C(){const R=c.newAttributes,F=c.enabledAttributes;for(let H=0,Y=F.length;H<Y;H++)F[H]!==R[H]&&(s.disableVertexAttribArray(H),F[H]=0)}function E(R,F,H,Y,q,X,K){K===!0?s.vertexAttribIPointer(R,F,H,q,X):s.vertexAttribPointer(R,F,H,Y,q,X)}function N(R,F,H,Y){if(i.isWebGL2===!1&&(R.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const q=Y.attributes,X=H.getAttributes(),K=F.defaultAttributeValues;for(const Q in X){const ue=X[Q];if(ue.location>=0){let k=q[Q];if(k===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(k=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(k=R.instanceColor)),k!==void 0){const Z=k.normalized,oe=k.itemSize,_e=t.get(k);if(_e===void 0)continue;const ge=_e.buffer,Le=_e.type,De=_e.bytesPerElement,Te=i.isWebGL2===!0&&(Le===s.INT||Le===s.UNSIGNED_INT||k.gpuType===Ml);if(k.isInterleavedBufferAttribute){const qe=k.data,O=qe.stride,Pt=k.offset;if(qe.isInstancedInterleavedBuffer){for(let Me=0;Me<ue.locationSize;Me++)P(ue.location+Me,qe.meshPerAttribute);R.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=qe.meshPerAttribute*qe.count)}else for(let Me=0;Me<ue.locationSize;Me++)b(ue.location+Me);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let Me=0;Me<ue.locationSize;Me++)E(ue.location+Me,oe/ue.locationSize,Le,Z,O*De,(Pt+oe/ue.locationSize*Me)*De,Te)}else{if(k.isInstancedBufferAttribute){for(let qe=0;qe<ue.locationSize;qe++)P(ue.location+qe,k.meshPerAttribute);R.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let qe=0;qe<ue.locationSize;qe++)b(ue.location+qe);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let qe=0;qe<ue.locationSize;qe++)E(ue.location+qe,oe/ue.locationSize,Le,Z,oe*De,oe/ue.locationSize*qe*De,Te)}}else if(K!==void 0){const Z=K[Q];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv(ue.location,Z);break;case 3:s.vertexAttrib3fv(ue.location,Z);break;case 4:s.vertexAttrib4fv(ue.location,Z);break;default:s.vertexAttrib1fv(ue.location,Z)}}}}C()}function x(){D();for(const R in o){const F=o[R];for(const H in F){const Y=F[H];for(const q in Y)v(Y[q].object),delete Y[q];delete F[H]}delete o[R]}}function M(R){if(o[R.id]===void 0)return;const F=o[R.id];for(const H in F){const Y=F[H];for(const q in Y)v(Y[q].object),delete Y[q];delete F[H]}delete o[R.id]}function I(R){for(const F in o){const H=o[F];if(H[R.id]===void 0)continue;const Y=H[R.id];for(const q in Y)v(Y[q].object),delete Y[q];delete H[R.id]}}function D(){W(),u=!0,c!==l&&(c=l,f(c.object))}function W(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:D,resetDefaultState:W,dispose:x,releaseStatesOfGeometry:M,releaseStatesOfProgram:I,initAttributes:g,enableAttribute:b,disableUnusedAttributes:C}}function Fd(s,e,t,i){const n=i.isWebGL2;let a;function r(u){a=u}function o(u,h){s.drawArrays(a,u,h),t.update(h,a,1)}function l(u,h,d){if(d===0)return;let f,v;if(n)f=s,v="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",f===null)return;f[v](a,u,h,d),t.update(h,a,d)}function c(u,h,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<d;v++)this.render(u[v],h[v]);else{f.multiDrawArraysWEBGL(a,u,0,h,0,d);let v=0;for(let _=0;_<d;_++)v+=h[_];t.update(v,a,1)}}this.setMode=r,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Nd(s,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const r=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=a(o);l!==o&&(o=l);const c=r||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),v=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),g=d>0,b=r||e.has("OES_texture_float"),P=g&&b,C=r?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:r,drawBuffers:c,getMaxAnisotropy:n,getMaxPrecision:a,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:v,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:y,vertexTextures:g,floatFragmentTextures:b,floatVertexTextures:P,maxSamples:C}}function Od(s){const e=this;let t=null,i=0,n=!1,a=!1;const r=new Di,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||n;return n=d,i=h.length,f},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const v=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!n||v===null||v.length===0||a&&!m)a?u(null):c();else{const y=a?0:i,g=y*4;let b=p.clippingState||null;l.value=b,b=u(v,d,g,f);for(let P=0;P!==g;++P)b[P]=t[P];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,v){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,v!==!0||m===null){const p=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let g=0,b=f;g!==_;++g,b+=4)r.copy(h[g]).applyMatrix4(y,o),r.normal.toArray(m,b),m[b+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function zd(s){let e=new WeakMap;function t(r,o){return o===Za?r.mapping=wn:o===Ka&&(r.mapping=Tn),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===Za||o===Ka)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Ku(l.height/2);return c.fromEquirectangularTexture(s,r),e.set(r,c),r.addEventListener("dispose",n),t(c.texture,r.mapping)}else return null}}return r}function n(r){const o=r.target;o.removeEventListener("dispose",n);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}class Hl extends Bl{constructor(e=-1,t=1,i=1,n=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let a=i-e,r=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const mn=4,Eo=[.125,.215,.35,.446,.526,.582],vn=20,Ra=new Hl,Ao=new he;let Pa=null,La=0,Ia=0;const Ui=(1+Math.sqrt(5))/2,on=1/Ui,Ro=[new A(1,1,1),new A(-1,1,1),new A(1,1,-1),new A(-1,1,-1),new A(0,Ui,on),new A(0,Ui,-on),new A(on,0,Ui),new A(-on,0,Ui),new A(Ui,on,0),new A(-Ui,on,0)];class Po{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,n,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Do(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Io(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pa,La,Ia),e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wn||e.mapping===Tn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:St,minFilter:St,generateMipmaps:!1,type:jn,format:qt,colorSpace:mi,depthBuffer:!1},n=Lo(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lo(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Bd(a)),this._blurMaterial=Gd(a,e,t)}return n}_compileMaterial(e){const t=new We(this._lodPlanes[0],e);this._renderer.compile(t,Ra)}_sceneToCubeUV(e,t,i,n){const o=new Vt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Ao),u.toneMapping=wi,u.autoClear=!1;const f=new At({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1}),v=new We(new Ci,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(Ao),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):y===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const g=this._cubeSize;Cs(n,y*g,p>2?g:0,g,g),u.setRenderTarget(n),_&&u.render(v,o),u.render(e,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===wn||e.mapping===Tn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Do()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Io());const a=n?this._cubemapMaterial:this._equirectMaterial,r=new We(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;Cs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,Ra)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const a=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),r=Ro[(n-1)%Ro.length];this._blur(e,n-1,n,a,r)}t.autoClear=i}_blur(e,t,i,n,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,n,"latitudinal",a),this._halfBlur(r,e,i,i,n,"longitudinal",a)}_halfBlur(e,t,i,n,a,r,o){const l=this._renderer,c=this._blurMaterial,u=3,h=new We(this._lodPlanes[n],c),d=c.uniforms,f=this._sizeLods[i]-1,v=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*vn-1),_=a/v,m=isFinite(a)?1+Math.floor(u*_):vn;m>vn;const p=[];let y=0;for(let E=0;E<vn;++E){const N=E/_,x=Math.exp(-N*N/2);p.push(x),E===0?y+=x:E<m&&(y+=2*x)}for(let E=0;E<p.length;E++)p[E]=p[E]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=r==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:g}=this;d.dTheta.value=v,d.mipInt.value=g-i;const b=this._sizeLods[n],P=3*b*(n>g-mn?n-g+mn:0),C=4*(this._cubeSize-b);Cs(t,P,C,3*b,2*b),l.setRenderTarget(t),l.render(h,Ra)}}function Bd(s){const e=[],t=[],i=[];let n=s;const a=s-mn+1+Eo.length;for(let r=0;r<a;r++){const o=Math.pow(2,n);t.push(o);let l=1/o;r>s-mn?l=Eo[r-s+mn-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,v=6,_=3,m=2,p=1,y=new Float32Array(_*v*f),g=new Float32Array(m*v*f),b=new Float32Array(p*v*f);for(let C=0;C<f;C++){const E=C%3*2/3-1,N=C>2?0:-1,x=[E,N,0,E+2/3,N,0,E+2/3,N+1,0,E,N,0,E+2/3,N+1,0,E,N+1,0];y.set(x,_*v*C),g.set(d,m*v*C);const M=[C,C,C,C,C,C];b.set(M,p*v*C)}const P=new Ze;P.setAttribute("position",new st(y,_)),P.setAttribute("uv",new st(g,m)),P.setAttribute("faceIndex",new st(b,p)),e.push(P),n>mn&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Lo(s,e,t){const i=new Gi(s,e,t);return i.texture.mapping=Js,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Cs(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function Gd(s,e,t){const i=new Float32Array(vn),n=new A(0,1,0);return new ft({name:"SphericalGaussianBlur",defines:{n:vn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:fr(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Io(){return new ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fr(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Do(){return new ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function fr(){return`

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
	`}function Vd(s){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Za||l===Ka,u=l===wn||l===Tn;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Po(s)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&n(h)){t===null&&(t=new Po(s));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",a),d.texture}else return null}}}return o}function n(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function Hd(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n}}}function kd(s,e,t,i){const n={},a=new WeakMap;function r(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);for(const v in d.morphAttributes){const _=d.morphAttributes[v];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",r),delete n[d.id];const f=a.get(d);f&&(e.remove(f),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return n[d.id]===!0||(d.addEventListener("dispose",r),n[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const v in d)e.update(d[v],s.ARRAY_BUFFER);const f=h.morphAttributes;for(const v in f){const _=f[v];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function c(h){const d=[],f=h.index,v=h.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let g=0,b=y.length;g<b;g+=3){const P=y[g+0],C=y[g+1],E=y[g+2];d.push(P,C,C,E,E,P)}}else if(v!==void 0){const y=v.array;_=v.version;for(let g=0,b=y.length/3-1;g<b;g+=3){const P=g+0,C=g+1,E=g+2;d.push(P,C,C,E,E,P)}}else return;const m=new(Pl(d)?Ol:Nl)(d,1);m.version=_;const p=a.get(h);p&&e.remove(p),a.set(h,m)}function u(h){const d=a.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return a.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Wd(s,e,t,i){const n=i.isWebGL2;let a;function r(f){a=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,v){s.drawElements(a,v,o,f*l),t.update(v,a,1)}function h(f,v,_){if(_===0)return;let m,p;if(n)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null)return;m[p](a,v,o,f*l,_),t.update(v,a,_)}function d(f,v,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/l,v[p]);else{m.multiDrawElementsWEBGL(a,v,0,o,f,0,_);let p=0;for(let y=0;y<_;y++)p+=v[y];t.update(p,a,1)}}this.setMode=r,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function qd(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case s.TRIANGLES:t.triangles+=o*(a/3);break;case s.LINES:t.lines+=o*(a/2);break;case s.LINE_STRIP:t.lines+=o*(a-1);break;case s.LINE_LOOP:t.lines+=o*a;break;case s.POINTS:t.points+=o*a;break;default:break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Xd(s,e){return s[0]-e[0]}function Yd(s,e){return Math.abs(e[1])-Math.abs(s[1])}function Zd(s,e,t){const i={},n=new Float32Array(8),a=new WeakMap,r=new at,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=f!==void 0?f.length:0;let _=a.get(u);if(_===void 0||_.count!==v){let R=function(){D.dispose(),a.delete(u),u.removeEventListener("dispose",R)};_!==void 0&&_.texture.dispose();const y=u.morphAttributes.position!==void 0,g=u.morphAttributes.normal!==void 0,b=u.morphAttributes.color!==void 0,P=u.morphAttributes.position||[],C=u.morphAttributes.normal||[],E=u.morphAttributes.color||[];let N=0;y===!0&&(N=1),g===!0&&(N=2),b===!0&&(N=3);let x=u.attributes.position.count*N,M=1;x>e.maxTextureSize&&(M=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const I=new Float32Array(x*M*4*v),D=new Dl(I,x,M,v);D.type=Si,D.needsUpdate=!0;const W=N*4;for(let F=0;F<v;F++){const H=P[F],Y=C[F],q=E[F],X=x*M*4*F;for(let K=0;K<H.count;K++){const Q=K*W;y===!0&&(r.fromBufferAttribute(H,K),I[X+Q+0]=r.x,I[X+Q+1]=r.y,I[X+Q+2]=r.z,I[X+Q+3]=0),g===!0&&(r.fromBufferAttribute(Y,K),I[X+Q+4]=r.x,I[X+Q+5]=r.y,I[X+Q+6]=r.z,I[X+Q+7]=0),b===!0&&(r.fromBufferAttribute(q,K),I[X+Q+8]=r.x,I[X+Q+9]=r.y,I[X+Q+10]=r.z,I[X+Q+11]=q.itemSize===4?r.w:1)}}_={count:v,texture:D,size:new ne(x,M)},a.set(u,_),u.addEventListener("dispose",R)}let m=0;for(let y=0;y<d.length;y++)m+=d[y];const p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(s,"morphTargetBaseInfluence",p),h.getUniforms().setValue(s,"morphTargetInfluences",d),h.getUniforms().setValue(s,"morphTargetsTexture",_.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",_.size)}else{const f=d===void 0?0:d.length;let v=i[u.id];if(v===void 0||v.length!==f){v=[];for(let g=0;g<f;g++)v[g]=[g,0];i[u.id]=v}for(let g=0;g<f;g++){const b=v[g];b[0]=g,b[1]=d[g]}v.sort(Yd);for(let g=0;g<8;g++)g<f&&v[g][1]?(o[g][0]=v[g][0],o[g][1]=v[g][1]):(o[g][0]=Number.MAX_SAFE_INTEGER,o[g][1]=0);o.sort(Xd);const _=u.morphAttributes.position,m=u.morphAttributes.normal;let p=0;for(let g=0;g<8;g++){const b=o[g],P=b[0],C=b[1];P!==Number.MAX_SAFE_INTEGER&&C?(_&&u.getAttribute("morphTarget"+g)!==_[P]&&u.setAttribute("morphTarget"+g,_[P]),m&&u.getAttribute("morphNormal"+g)!==m[P]&&u.setAttribute("morphNormal"+g,m[P]),n[g]=C,p+=C):(_&&u.hasAttribute("morphTarget"+g)===!0&&u.deleteAttribute("morphTarget"+g),m&&u.hasAttribute("morphNormal"+g)===!0&&u.deleteAttribute("morphNormal"+g),n[g]=0)}const y=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(s,"morphTargetBaseInfluence",y),h.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:l}}function Kd(s,e,t,i){let n=new WeakMap;function a(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(n.get(h)!==c&&(e.update(h),n.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;n.get(d)!==c&&(d.update(),n.set(d,c))}return h}function r(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:r}}class kl extends Rt{constructor(e,t,i,n,a,r,o,l,c,u){if(u=u!==void 0?u:zi,u!==zi&&u!==Cn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===zi&&(i=Mi),i===void 0&&u===Cn&&(i=Oi),super(null,n,a,r,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:mt,this.minFilter=l!==void 0?l:mt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Wl=new Rt,ql=new kl(1,1);ql.compareFunction=Rl;const Xl=new Dl,Yl=new Iu,Zl=new Gl,Uo=[],Fo=[],No=new Float32Array(16),Oo=new Float32Array(9),zo=new Float32Array(4);function Rn(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let a=Uo[n];if(a===void 0&&(a=new Float32Array(n),Uo[n]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,s[r].toArray(a,o)}return a}function vt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function gt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function ea(s,e){let t=Fo[e];t===void 0&&(t=new Int32Array(e),Fo[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function jd(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Jd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;s.uniform2fv(this.addr,e),gt(t,e)}}function $d(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(vt(t,e))return;s.uniform3fv(this.addr,e),gt(t,e)}}function Qd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;s.uniform4fv(this.addr,e),gt(t,e)}}function ep(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(vt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(vt(t,i))return;zo.set(i),s.uniformMatrix2fv(this.addr,!1,zo),gt(t,i)}}function tp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(vt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(vt(t,i))return;Oo.set(i),s.uniformMatrix3fv(this.addr,!1,Oo),gt(t,i)}}function ip(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(vt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(vt(t,i))return;No.set(i),s.uniformMatrix4fv(this.addr,!1,No),gt(t,i)}}function np(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function sp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;s.uniform2iv(this.addr,e),gt(t,e)}}function ap(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;s.uniform3iv(this.addr,e),gt(t,e)}}function rp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;s.uniform4iv(this.addr,e),gt(t,e)}}function op(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function lp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;s.uniform2uiv(this.addr,e),gt(t,e)}}function cp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;s.uniform3uiv(this.addr,e),gt(t,e)}}function up(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;s.uniform4uiv(this.addr,e),gt(t,e)}}function hp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const a=this.type===s.SAMPLER_2D_SHADOW?ql:Wl;t.setTexture2D(e||a,n)}function fp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Yl,n)}function dp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||Zl,n)}function pp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Xl,n)}function mp(s){switch(s){case 5126:return jd;case 35664:return Jd;case 35665:return $d;case 35666:return Qd;case 35674:return ep;case 35675:return tp;case 35676:return ip;case 5124:case 35670:return np;case 35667:case 35671:return sp;case 35668:case 35672:return ap;case 35669:case 35673:return rp;case 5125:return op;case 36294:return lp;case 36295:return cp;case 36296:return up;case 35678:case 36198:case 36298:case 36306:case 35682:return hp;case 35679:case 36299:case 36307:return fp;case 35680:case 36300:case 36308:case 36293:return dp;case 36289:case 36303:case 36311:case 36292:return pp}}function vp(s,e){s.uniform1fv(this.addr,e)}function gp(s,e){const t=Rn(e,this.size,2);s.uniform2fv(this.addr,t)}function xp(s,e){const t=Rn(e,this.size,3);s.uniform3fv(this.addr,t)}function _p(s,e){const t=Rn(e,this.size,4);s.uniform4fv(this.addr,t)}function yp(s,e){const t=Rn(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Mp(s,e){const t=Rn(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Sp(s,e){const t=Rn(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function bp(s,e){s.uniform1iv(this.addr,e)}function wp(s,e){s.uniform2iv(this.addr,e)}function Tp(s,e){s.uniform3iv(this.addr,e)}function Cp(s,e){s.uniform4iv(this.addr,e)}function Ep(s,e){s.uniform1uiv(this.addr,e)}function Ap(s,e){s.uniform2uiv(this.addr,e)}function Rp(s,e){s.uniform3uiv(this.addr,e)}function Pp(s,e){s.uniform4uiv(this.addr,e)}function Lp(s,e,t){const i=this.cache,n=e.length,a=ea(t,n);vt(i,a)||(s.uniform1iv(this.addr,a),gt(i,a));for(let r=0;r!==n;++r)t.setTexture2D(e[r]||Wl,a[r])}function Ip(s,e,t){const i=this.cache,n=e.length,a=ea(t,n);vt(i,a)||(s.uniform1iv(this.addr,a),gt(i,a));for(let r=0;r!==n;++r)t.setTexture3D(e[r]||Yl,a[r])}function Dp(s,e,t){const i=this.cache,n=e.length,a=ea(t,n);vt(i,a)||(s.uniform1iv(this.addr,a),gt(i,a));for(let r=0;r!==n;++r)t.setTextureCube(e[r]||Zl,a[r])}function Up(s,e,t){const i=this.cache,n=e.length,a=ea(t,n);vt(i,a)||(s.uniform1iv(this.addr,a),gt(i,a));for(let r=0;r!==n;++r)t.setTexture2DArray(e[r]||Xl,a[r])}function Fp(s){switch(s){case 5126:return vp;case 35664:return gp;case 35665:return xp;case 35666:return _p;case 35674:return yp;case 35675:return Mp;case 35676:return Sp;case 5124:case 35670:return bp;case 35667:case 35671:return wp;case 35668:case 35672:return Tp;case 35669:case 35673:return Cp;case 5125:return Ep;case 36294:return Ap;case 36295:return Rp;case 36296:return Pp;case 35678:case 36198:case 36298:case 36306:case 35682:return Lp;case 35679:case 36299:case 36307:return Ip;case 35680:case 36300:case 36308:case 36293:return Dp;case 36289:case 36303:case 36311:case 36292:return Up}}class Np{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=mp(t.type)}}class Op{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fp(t.type)}}class zp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let a=0,r=n.length;a!==r;++a){const o=n[a];o.setValue(e,t[o.id],i)}}}const Da=/(\w+)(\])?(\[|\.)?/g;function Bo(s,e){s.seq.push(e),s.map[e.id]=e}function Bp(s,e,t){const i=s.name,n=i.length;for(Da.lastIndex=0;;){const a=Da.exec(i),r=Da.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===n){Bo(t,c===void 0?new Np(o,s,e):new Op(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new zp(o),Bo(t,h)),t=h}}}class Gs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const a=e.getActiveUniform(t,n),r=e.getUniformLocation(t,a.name);Bp(a,r,this)}}setValue(e,t,i,n){const a=this.map[t];a!==void 0&&a.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,a=e.length;n!==a;++n){const r=e[n];r.id in t&&i.push(r)}return i}}function Go(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const Gp=37297;let Vp=0;function Hp(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=n;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}function kp(s){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(s);let i;switch(e===t?i="":e===qs&&t===Ws?i="LinearDisplayP3ToLinearSRGB":e===Ws&&t===qs&&(i="LinearSRGBToLinearDisplayP3"),s){case mi:case $s:return[i,"LinearTransferOETF"];case bt:case lr:return[i,"sRGBTransferOETF"];default:return[i,"LinearTransferOETF"]}}function Vo(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),n=s.getShaderInfoLog(e).trim();if(i&&n==="")return"";const a=/ERROR: 0:(\d+)/.exec(n);if(a){const r=parseInt(a[1]);return t.toUpperCase()+`

`+n+`

`+Hp(s.getShaderSource(e),r)}else return n}function Wp(s,e){const t=kp(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function qp(s,e){let t;switch(e){case Gc:t="Linear";break;case Vc:t="Reinhard";break;case Hc:t="OptimizedCineon";break;case kc:t="ACESFilmic";break;case qc:t="AgX";break;case Wc:t="Custom";break;default:t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Xp(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(gn).join(`
`)}function Yp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(gn).join(`
`)}function Zp(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Kp(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const a=s.getActiveAttrib(e,n),r=a.name;let o=1;a.type===s.FLOAT_MAT2&&(o=2),a.type===s.FLOAT_MAT3&&(o=3),a.type===s.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:s.getAttribLocation(e,r),locationSize:o}}return t}function gn(s){return s!==""}function Ho(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ko(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jp=/^[ \t]*#include +<([\w\d./]+)>/gm;function er(s){return s.replace(jp,$p)}const Jp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function $p(s,e){let t=Fe[e];if(t===void 0){const i=Jp.get(e);if(i!==void 0)t=Fe[i];else throw new Error("Can not resolve #include <"+e+">")}return er(t)}const Qp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wo(s){return s.replace(Qp,em)}function em(s,e,t,i){let n="";for(let a=parseInt(e);a<parseInt(t);a++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return n}function qo(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function tm(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===xl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===pc?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===fi&&(e="SHADOWMAP_TYPE_VSM"),e}function im(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case wn:case Tn:e="ENVMAP_TYPE_CUBE";break;case Js:e="ENVMAP_TYPE_CUBE_UV";break}return e}function nm(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Tn:e="ENVMAP_MODE_REFRACTION";break}return e}function sm(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case _l:e="ENVMAP_BLENDING_MULTIPLY";break;case zc:e="ENVMAP_BLENDING_MIX";break;case Bc:e="ENVMAP_BLENDING_ADD";break}return e}function am(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function rm(s,e,t,i){const n=s.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=tm(t),c=im(t),u=nm(t),h=sm(t),d=am(t),f=t.isWebGL2?"":Xp(t),v=Yp(t),_=Zp(a),m=n.createProgram();let p,y,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(gn).join(`
`),p.length>0&&(p+=`
`),y=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(gn).join(`
`),y.length>0&&(y+=`
`)):(p=[qo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gn).join(`
`),y=[f,qo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wi?"#define TONE_MAPPING":"",t.toneMapping!==wi?Fe.tonemapping_pars_fragment:"",t.toneMapping!==wi?qp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,Wp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(gn).join(`
`)),r=er(r),r=Ho(r,t),r=ko(r,t),o=er(o),o=Ho(o,t),o=ko(o,t),r=Wo(r),o=Wo(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,p=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===oo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===oo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const b=g+p+r,P=g+y+o,C=Go(n,n.VERTEX_SHADER,b),E=Go(n,n.FRAGMENT_SHADER,P);n.attachShader(m,C),n.attachShader(m,E),t.index0AttributeName!==void 0?n.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(m,0,"position"),n.linkProgram(m);function N(D){if(s.debug.checkShaderErrors){const W=n.getProgramInfoLog(m).trim(),R=n.getShaderInfoLog(C).trim(),F=n.getShaderInfoLog(E).trim();let H=!0,Y=!0;if(n.getProgramParameter(m,n.LINK_STATUS)===!1)if(H=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,m,C,E);else{const q=Vo(n,C,"vertex"),X=Vo(n,E,"fragment")}else W!==""||(R===""||F==="")&&(Y=!1);Y&&(D.diagnostics={runnable:H,programLog:W,vertexShader:{log:R,prefix:p},fragmentShader:{log:F,prefix:y}})}n.deleteShader(C),n.deleteShader(E),x=new Gs(n,m),M=Kp(n,m)}let x;this.getUniforms=function(){return x===void 0&&N(this),x};let M;this.getAttributes=function(){return M===void 0&&N(this),M};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=n.getProgramParameter(m,Gp)),I},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vp++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=E,this}let om=0;class lm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new cm(e),t.set(e,i)),i}}class cm{constructor(e){this.id=om++,this.code=e,this.usedTimes=0}}function um(s,e,t,i,n,a,r){const o=new Ul,l=new lm,c=[],u=n.isWebGL2,h=n.logarithmicDepthBuffer,d=n.vertexTextures;let f=n.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return x===0?"uv":`uv${x}`}function m(x,M,I,D,W){const R=D.fog,F=W.geometry,H=x.isMeshStandardMaterial?D.environment:null,Y=(x.isMeshStandardMaterial?t:e).get(x.envMap||H),q=Y&&Y.mapping===Js?Y.image.height:null,X=v[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),x.precision);const K=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Q=K!==void 0?K.length:0;let ue=0;F.morphAttributes.position!==void 0&&(ue=1),F.morphAttributes.normal!==void 0&&(ue=2),F.morphAttributes.color!==void 0&&(ue=3);let k,Z,oe,_e;if(X){const Lt=ti[X];k=Lt.vertexShader,Z=Lt.fragmentShader}else k=x.vertexShader,Z=x.fragmentShader,l.update(x),oe=l.getVertexShaderID(x),_e=l.getFragmentShaderID(x);const ge=s.getRenderTarget(),Le=W.isInstancedMesh===!0,De=W.isBatchedMesh===!0,Te=!!x.map,qe=!!x.matcap,O=!!Y,Pt=!!x.aoMap,Me=!!x.lightMap,Re=!!x.bumpMap,me=!!x.normalMap,rt=!!x.displacementMap,Oe=!!x.emissiveMap,T=!!x.metalnessMap,S=!!x.roughnessMap,B=x.anisotropy>0,$=x.clearcoat>0,J=x.iridescence>0,ee=x.sheen>0,xe=x.transmission>0,re=B&&!!x.anisotropyMap,fe=$&&!!x.clearcoatMap,we=$&&!!x.clearcoatNormalMap,ze=$&&!!x.clearcoatRoughnessMap,j=J&&!!x.iridescenceMap,Ke=J&&!!x.iridescenceThicknessMap,ke=ee&&!!x.sheenColorMap,Ae=ee&&!!x.sheenRoughnessMap,ye=!!x.specularMap,de=!!x.specularColorMap,Ue=!!x.specularIntensityMap,Xe=xe&&!!x.transmissionMap,ct=xe&&!!x.thicknessMap,Ge=!!x.gradientMap,te=!!x.alphaMap,L=x.alphaTest>0,se=!!x.alphaHash,ae=!!x.extensions,Ce=!!F.attributes.uv1,Se=!!F.attributes.uv2,et=!!F.attributes.uv3;let tt=wi;return x.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(tt=s.toneMapping),{isWebGL2:u,shaderID:X,shaderType:x.type,shaderName:x.name,vertexShader:k,fragmentShader:Z,defines:x.defines,customVertexShaderID:oe,customFragmentShaderID:_e,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:De,instancing:Le,instancingColor:Le&&W.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:ge===null?s.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:mi,map:Te,matcap:qe,envMap:O,envMapMode:O&&Y.mapping,envMapCubeUVHeight:q,aoMap:Pt,lightMap:Me,bumpMap:Re,normalMap:me,displacementMap:d&&rt,emissiveMap:Oe,normalMapObjectSpace:me&&x.normalMapType===au,normalMapTangentSpace:me&&x.normalMapType===su,metalnessMap:T,roughnessMap:S,anisotropy:B,anisotropyMap:re,clearcoat:$,clearcoatMap:fe,clearcoatNormalMap:we,clearcoatRoughnessMap:ze,iridescence:J,iridescenceMap:j,iridescenceThicknessMap:Ke,sheen:ee,sheenColorMap:ke,sheenRoughnessMap:Ae,specularMap:ye,specularColorMap:de,specularIntensityMap:Ue,transmission:xe,transmissionMap:Xe,thicknessMap:ct,gradientMap:Ge,opaque:x.transparent===!1&&x.blending===Mn,alphaMap:te,alphaTest:L,alphaHash:se,combine:x.combine,mapUv:Te&&_(x.map.channel),aoMapUv:Pt&&_(x.aoMap.channel),lightMapUv:Me&&_(x.lightMap.channel),bumpMapUv:Re&&_(x.bumpMap.channel),normalMapUv:me&&_(x.normalMap.channel),displacementMapUv:rt&&_(x.displacementMap.channel),emissiveMapUv:Oe&&_(x.emissiveMap.channel),metalnessMapUv:T&&_(x.metalnessMap.channel),roughnessMapUv:S&&_(x.roughnessMap.channel),anisotropyMapUv:re&&_(x.anisotropyMap.channel),clearcoatMapUv:fe&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:we&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(x.sheenRoughnessMap.channel),specularMapUv:ye&&_(x.specularMap.channel),specularColorMapUv:de&&_(x.specularColorMap.channel),specularIntensityMapUv:Ue&&_(x.specularIntensityMap.channel),transmissionMapUv:Xe&&_(x.transmissionMap.channel),thicknessMapUv:ct&&_(x.thicknessMap.channel),alphaMapUv:te&&_(x.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(me||B),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:Ce,vertexUv2s:Se,vertexUv3s:et,pointsUvs:W.isPoints===!0&&!!F.attributes.uv&&(Te||te),fog:!!R,useFog:x.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:W.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ue,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:tt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Te&&x.map.isVideoTexture===!0&&$e.getTransfer(x.map.colorSpace)===nt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Mt,flipSided:x.side===Nt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:ae&&x.extensions.derivatives===!0,extensionFragDepth:ae&&x.extensions.fragDepth===!0,extensionDrawBuffers:ae&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&x.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&x.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()}}function p(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const I in x.defines)M.push(I),M.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(y(M,x),g(M,x),M.push(s.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function y(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function g(x,M){o.disableAll(),M.isWebGL2&&o.enable(0),M.supportsVertexTextures&&o.enable(1),M.instancing&&o.enable(2),M.instancingColor&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),x.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.useLegacyLights&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),x.push(o.mask)}function b(x){const M=v[x.type];let I;if(M){const D=ti[M];I=qu.clone(D.uniforms)}else I=x.uniforms;return I}function P(x,M){let I;for(let D=0,W=c.length;D<W;D++){const R=c[D];if(R.cacheKey===M){I=R,++I.usedTimes;break}}return I===void 0&&(I=new rm(s,M,x,a),c.push(I)),I}function C(x){if(--x.usedTimes===0){const M=c.indexOf(x);c[M]=c[c.length-1],c.pop(),x.destroy()}}function E(x){l.remove(x)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:P,releaseProgram:C,releaseShaderCache:E,programs:c,dispose:N}}function hm(){let s=new WeakMap;function e(a){let r=s.get(a);return r===void 0&&(r={},s.set(a,r)),r}function t(a){s.delete(a)}function i(a,r,o){s.get(a)[r]=o}function n(){s=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function fm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Xo(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Yo(){const s=[];let e=0;const t=[],i=[],n=[];function a(){e=0,t.length=0,i.length=0,n.length=0}function r(h,d,f,v,_,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:v,renderOrder:h.renderOrder,z:_,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=v,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,d,f,v,_,m){const p=r(h,d,f,v,_,m);f.transmission>0?i.push(p):f.transparent===!0?n.push(p):t.push(p)}function l(h,d,f,v,_,m){const p=r(h,d,f,v,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?n.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||fm),i.length>1&&i.sort(d||Xo),n.length>1&&n.sort(d||Xo)}function u(){for(let h=e,d=s.length;h<d;h++){const f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:n,init:a,push:o,unshift:l,finish:u,sort:c}}function dm(){let s=new WeakMap;function e(i,n){const a=s.get(i);let r;return a===void 0?(r=new Yo,s.set(i,[r])):n>=a.length?(r=new Yo,a.push(r)):r=a[n],r}function t(){s=new WeakMap}return{get:e,dispose:t}}function pm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new he};break;case"SpotLight":t={position:new A,direction:new A,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new he,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new he,groundColor:new he};break;case"RectAreaLight":t={color:new he,position:new A,halfWidth:new A,halfHeight:new A};break}return s[e.id]=t,t}}}function mm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let vm=0;function gm(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function xm(s,e){const t=new pm,i=mm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new A);const a=new A,r=new Qe,o=new Qe;function l(u,h){let d=0,f=0,v=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let _=0,m=0,p=0,y=0,g=0,b=0,P=0,C=0,E=0,N=0,x=0;u.sort(gm);const M=h===!0?Math.PI:1;for(let D=0,W=u.length;D<W;D++){const R=u[D],F=R.color,H=R.intensity,Y=R.distance,q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=F.r*H*M,f+=F.g*H*M,v+=F.b*H*M;else if(R.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(R.sh.coefficients[X],H);x++}else if(R.isDirectionalLight){const X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity*M),R.castShadow){const K=R.shadow,Q=i.get(R);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,n.directionalShadow[_]=Q,n.directionalShadowMap[_]=q,n.directionalShadowMatrix[_]=R.shadow.matrix,b++}n.directional[_]=X,_++}else if(R.isSpotLight){const X=t.get(R);X.position.setFromMatrixPosition(R.matrixWorld),X.color.copy(F).multiplyScalar(H*M),X.distance=Y,X.coneCos=Math.cos(R.angle),X.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),X.decay=R.decay,n.spot[p]=X;const K=R.shadow;if(R.map&&(n.spotLightMap[E]=R.map,E++,K.updateMatrices(R),R.castShadow&&N++),n.spotLightMatrix[p]=K.matrix,R.castShadow){const Q=i.get(R);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,n.spotShadow[p]=Q,n.spotShadowMap[p]=q,C++}p++}else if(R.isRectAreaLight){const X=t.get(R);X.color.copy(F).multiplyScalar(H),X.halfWidth.set(R.width*.5,0,0),X.halfHeight.set(0,R.height*.5,0),n.rectArea[y]=X,y++}else if(R.isPointLight){const X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity*M),X.distance=R.distance,X.decay=R.decay,R.castShadow){const K=R.shadow,Q=i.get(R);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,Q.shadowCameraNear=K.camera.near,Q.shadowCameraFar=K.camera.far,n.pointShadow[m]=Q,n.pointShadowMap[m]=q,n.pointShadowMatrix[m]=R.shadow.matrix,P++}n.point[m]=X,m++}else if(R.isHemisphereLight){const X=t.get(R);X.skyColor.copy(R.color).multiplyScalar(H*M),X.groundColor.copy(R.groundColor).multiplyScalar(H*M),n.hemi[g]=X,g++}}y>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0&&(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=v;const I=n.hash;(I.directionalLength!==_||I.pointLength!==m||I.spotLength!==p||I.rectAreaLength!==y||I.hemiLength!==g||I.numDirectionalShadows!==b||I.numPointShadows!==P||I.numSpotShadows!==C||I.numSpotMaps!==E||I.numLightProbes!==x)&&(n.directional.length=_,n.spot.length=p,n.rectArea.length=y,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=P,n.pointShadowMap.length=P,n.spotShadow.length=C,n.spotShadowMap.length=C,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=P,n.spotLightMatrix.length=C+E-N,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=N,n.numLightProbes=x,I.directionalLength=_,I.pointLength=m,I.spotLength=p,I.rectAreaLength=y,I.hemiLength=g,I.numDirectionalShadows=b,I.numPointShadows=P,I.numSpotShadows=C,I.numSpotMaps=E,I.numLightProbes=x,n.version=vm++)}function c(u,h){let d=0,f=0,v=0,_=0,m=0;const p=h.matrixWorldInverse;for(let y=0,g=u.length;y<g;y++){const b=u[y];if(b.isDirectionalLight){const P=n.directional[d];P.direction.setFromMatrixPosition(b.matrixWorld),a.setFromMatrixPosition(b.target.matrixWorld),P.direction.sub(a),P.direction.transformDirection(p),d++}else if(b.isSpotLight){const P=n.spot[v];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(p),P.direction.setFromMatrixPosition(b.matrixWorld),a.setFromMatrixPosition(b.target.matrixWorld),P.direction.sub(a),P.direction.transformDirection(p),v++}else if(b.isRectAreaLight){const P=n.rectArea[_];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(p),o.identity(),r.copy(b.matrixWorld),r.premultiply(p),o.extractRotation(r),P.halfWidth.set(b.width*.5,0,0),P.halfHeight.set(0,b.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const P=n.point[f];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const P=n.hemi[m];P.direction.setFromMatrixPosition(b.matrixWorld),P.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:n}}function Zo(s,e){const t=new xm(s,e),i=[],n=[];function a(){i.length=0,n.length=0}function r(h){i.push(h)}function o(h){n.push(h)}function l(h){t.setup(i,h)}function c(h){t.setupView(i,h)}return{init:a,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:l,setupLightsView:c,pushLight:r,pushShadow:o}}function _m(s,e){let t=new WeakMap;function i(a,r=0){const o=t.get(a);let l;return o===void 0?(l=new Zo(s,e),t.set(a,[l])):r>=o.length?(l=new Zo(s,e),o.push(l)):l=o[r],l}function n(){t=new WeakMap}return{get:i,dispose:n}}class ym extends Wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Mm extends Wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Sm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bm=`uniform sampler2D shadow_pass;
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
}`;function wm(s,e,t){let i=new hr;const n=new ne,a=new ne,r=new at,o=new ym({depthPacking:nu}),l=new Mm,c={},u=t.maxTextureSize,h={[pi]:Nt,[Nt]:pi,[Mt]:Mt},d=new ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:Sm,fragmentShader:bm}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const v=new Ze;v.setAttribute("position",new st(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new We(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xl;let p=this.type;this.render=function(C,E,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const x=s.getRenderTarget(),M=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),D=s.state;D.setBlending(bi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const W=p!==fi&&this.type===fi,R=p===fi&&this.type!==fi;for(let F=0,H=C.length;F<H;F++){const Y=C[F],q=Y.shadow;if(q===void 0||q.autoUpdate===!1&&q.needsUpdate===!1)continue;n.copy(q.mapSize);const X=q.getFrameExtents();if(n.multiply(X),a.copy(q.mapSize),(n.x>u||n.y>u)&&(n.x>u&&(a.x=Math.floor(u/X.x),n.x=a.x*X.x,q.mapSize.x=a.x),n.y>u&&(a.y=Math.floor(u/X.y),n.y=a.y*X.y,q.mapSize.y=a.y)),q.map===null||W===!0||R===!0){const Q=this.type!==fi?{minFilter:mt,magFilter:mt}:{};q.map!==null&&q.map.dispose(),q.map=new Gi(n.x,n.y,Q),q.map.texture.name=Y.name+".shadowMap",q.camera.updateProjectionMatrix()}s.setRenderTarget(q.map),s.clear();const K=q.getViewportCount();for(let Q=0;Q<K;Q++){const ue=q.getViewport(Q);r.set(a.x*ue.x,a.y*ue.y,a.x*ue.z,a.y*ue.w),D.viewport(r),q.updateMatrices(Y,Q),i=q.getFrustum(),b(E,N,q.camera,Y,this.type)}q.isPointLightShadow!==!0&&this.type===fi&&y(q,N),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(x,M,I)};function y(C,E){const N=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Gi(n.x,n.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(E,null,N,d,_,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(E,null,N,f,_,null)}function g(C,E,N,x){let M=null;const I=N.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)M=I;else if(M=N.isPointLight===!0?l:o,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const D=M.uuid,W=E.uuid;let R=c[D];R===void 0&&(R={},c[D]=R);let F=R[W];F===void 0&&(F=M.clone(),R[W]=F,E.addEventListener("dispose",P)),M=F}if(M.visible=E.visible,M.wireframe=E.wireframe,x===fi?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:h[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,N.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const D=s.properties.get(M);D.light=N}return M}function b(C,E,N,x,M){if(C.visible===!1)return;if(C.layers.test(E.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===fi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,C.matrixWorld);const W=e.update(C),R=C.material;if(Array.isArray(R)){const F=W.groups;for(let H=0,Y=F.length;H<Y;H++){const q=F[H],X=R[q.materialIndex];if(X&&X.visible){const K=g(C,X,x,M);C.onBeforeShadow(s,C,E,N,W,K,q),s.renderBufferDirect(N,null,W,K,C,q),C.onAfterShadow(s,C,E,N,W,K,q)}}}else if(R.visible){const F=g(C,R,x,M);C.onBeforeShadow(s,C,E,N,W,F,null),s.renderBufferDirect(N,null,W,F,C,null),C.onAfterShadow(s,C,E,N,W,F,null)}}const D=C.children;for(let W=0,R=D.length;W<R;W++)b(D[W],E,N,x,M)}function P(C){C.target.removeEventListener("dispose",P);for(const N in c){const x=c[N],M=C.target.uuid;M in x&&(x[M].dispose(),delete x[M])}}}function Tm(s,e,t){const i=t.isWebGL2;function n(){let L=!1;const se=new at;let ae=null;const Ce=new at(0,0,0,0);return{setMask:function(Se){ae!==Se&&!L&&(s.colorMask(Se,Se,Se,Se),ae=Se)},setLocked:function(Se){L=Se},setClear:function(Se,et,tt,xt,Lt){Lt===!0&&(Se*=xt,et*=xt,tt*=xt),se.set(Se,et,tt,xt),Ce.equals(se)===!1&&(s.clearColor(Se,et,tt,xt),Ce.copy(se))},reset:function(){L=!1,ae=null,Ce.set(-1,0,0,0)}}}function a(){let L=!1,se=null,ae=null,Ce=null;return{setTest:function(Se){Se?De(s.DEPTH_TEST):Te(s.DEPTH_TEST)},setMask:function(Se){se!==Se&&!L&&(s.depthMask(Se),se=Se)},setFunc:function(Se){if(ae!==Se){switch(Se){case Lc:s.depthFunc(s.NEVER);break;case Ic:s.depthFunc(s.ALWAYS);break;case Dc:s.depthFunc(s.LESS);break;case Hs:s.depthFunc(s.LEQUAL);break;case Uc:s.depthFunc(s.EQUAL);break;case Fc:s.depthFunc(s.GEQUAL);break;case Nc:s.depthFunc(s.GREATER);break;case Oc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ae=Se}},setLocked:function(Se){L=Se},setClear:function(Se){Ce!==Se&&(s.clearDepth(Se),Ce=Se)},reset:function(){L=!1,se=null,ae=null,Ce=null}}}function r(){let L=!1,se=null,ae=null,Ce=null,Se=null,et=null,tt=null,xt=null,Lt=null;return{setTest:function(it){L||(it?De(s.STENCIL_TEST):Te(s.STENCIL_TEST))},setMask:function(it){se!==it&&!L&&(s.stencilMask(it),se=it)},setFunc:function(it,It,$t){(ae!==it||Ce!==It||Se!==$t)&&(s.stencilFunc(it,It,$t),ae=it,Ce=It,Se=$t)},setOp:function(it,It,$t){(et!==it||tt!==It||xt!==$t)&&(s.stencilOp(it,It,$t),et=it,tt=It,xt=$t)},setLocked:function(it){L=it},setClear:function(it){Lt!==it&&(s.clearStencil(it),Lt=it)},reset:function(){L=!1,se=null,ae=null,Ce=null,Se=null,et=null,tt=null,xt=null,Lt=null}}}const o=new n,l=new a,c=new r,u=new WeakMap,h=new WeakMap;let d={},f={},v=new WeakMap,_=[],m=null,p=!1,y=null,g=null,b=null,P=null,C=null,E=null,N=null,x=new he(0,0,0),M=0,I=!1,D=null,W=null,R=null,F=null,H=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,X=0;const K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(K)[1]),q=X>=1):K.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),q=X>=2);let Q=null,ue={};const k=s.getParameter(s.SCISSOR_BOX),Z=s.getParameter(s.VIEWPORT),oe=new at().fromArray(k),_e=new at().fromArray(Z);function ge(L,se,ae,Ce){const Se=new Uint8Array(4),et=s.createTexture();s.bindTexture(L,et),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let tt=0;tt<ae;tt++)i&&(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)?s.texImage3D(se,0,s.RGBA,1,1,Ce,0,s.RGBA,s.UNSIGNED_BYTE,Se):s.texImage2D(se+tt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Se);return et}const Le={};Le[s.TEXTURE_2D]=ge(s.TEXTURE_2D,s.TEXTURE_2D,1),Le[s.TEXTURE_CUBE_MAP]=ge(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Le[s.TEXTURE_2D_ARRAY]=ge(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Le[s.TEXTURE_3D]=ge(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),De(s.DEPTH_TEST),l.setFunc(Hs),Oe(!1),T(Rr),De(s.CULL_FACE),me(bi);function De(L){d[L]!==!0&&(s.enable(L),d[L]=!0)}function Te(L){d[L]!==!1&&(s.disable(L),d[L]=!1)}function qe(L,se){return f[L]!==se?(s.bindFramebuffer(L,se),f[L]=se,i&&(L===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=se),L===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=se)),!0):!1}function O(L,se){let ae=_,Ce=!1;if(L)if(ae=v.get(se),ae===void 0&&(ae=[],v.set(se,ae)),L.isWebGLMultipleRenderTargets){const Se=L.texture;if(ae.length!==Se.length||ae[0]!==s.COLOR_ATTACHMENT0){for(let et=0,tt=Se.length;et<tt;et++)ae[et]=s.COLOR_ATTACHMENT0+et;ae.length=Se.length,Ce=!0}}else ae[0]!==s.COLOR_ATTACHMENT0&&(ae[0]=s.COLOR_ATTACHMENT0,Ce=!0);else ae[0]!==s.BACK&&(ae[0]=s.BACK,Ce=!0);Ce&&(t.isWebGL2?s.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function Pt(L){return m!==L?(s.useProgram(L),m=L,!0):!1}const Me={[Fi]:s.FUNC_ADD,[vc]:s.FUNC_SUBTRACT,[gc]:s.FUNC_REVERSE_SUBTRACT};if(i)Me[Ir]=s.MIN,Me[Dr]=s.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(Me[Ir]=L.MIN_EXT,Me[Dr]=L.MAX_EXT)}const Re={[xc]:s.ZERO,[_c]:s.ONE,[yc]:s.SRC_COLOR,[Xa]:s.SRC_ALPHA,[Cc]:s.SRC_ALPHA_SATURATE,[wc]:s.DST_COLOR,[Sc]:s.DST_ALPHA,[Mc]:s.ONE_MINUS_SRC_COLOR,[Ya]:s.ONE_MINUS_SRC_ALPHA,[Tc]:s.ONE_MINUS_DST_COLOR,[bc]:s.ONE_MINUS_DST_ALPHA,[Ec]:s.CONSTANT_COLOR,[Ac]:s.ONE_MINUS_CONSTANT_COLOR,[Rc]:s.CONSTANT_ALPHA,[Pc]:s.ONE_MINUS_CONSTANT_ALPHA};function me(L,se,ae,Ce,Se,et,tt,xt,Lt,it){if(L===bi){p===!0&&(Te(s.BLEND),p=!1);return}if(p===!1&&(De(s.BLEND),p=!0),L!==mc){if(L!==y||it!==I){if((g!==Fi||C!==Fi)&&(s.blendEquation(s.FUNC_ADD),g=Fi,C=Fi),it)switch(L){case Mn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ye:s.blendFunc(s.ONE,s.ONE);break;case Pr:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Lr:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:break}else switch(L){case Mn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ye:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Pr:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Lr:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:break}b=null,P=null,E=null,N=null,x.set(0,0,0),M=0,y=L,I=it}return}Se=Se||se,et=et||ae,tt=tt||Ce,(se!==g||Se!==C)&&(s.blendEquationSeparate(Me[se],Me[Se]),g=se,C=Se),(ae!==b||Ce!==P||et!==E||tt!==N)&&(s.blendFuncSeparate(Re[ae],Re[Ce],Re[et],Re[tt]),b=ae,P=Ce,E=et,N=tt),(xt.equals(x)===!1||Lt!==M)&&(s.blendColor(xt.r,xt.g,xt.b,Lt),x.copy(xt),M=Lt),y=L,I=!1}function rt(L,se){L.side===Mt?Te(s.CULL_FACE):De(s.CULL_FACE);let ae=L.side===Nt;se&&(ae=!ae),Oe(ae),L.blending===Mn&&L.transparent===!1?me(bi):me(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const Ce=L.stencilWrite;c.setTest(Ce),Ce&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),B(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?De(s.SAMPLE_ALPHA_TO_COVERAGE):Te(s.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(L){D!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),D=L)}function T(L){L!==fc?(De(s.CULL_FACE),L!==W&&(L===Rr?s.cullFace(s.BACK):L===dc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Te(s.CULL_FACE),W=L}function S(L){L!==R&&(q&&s.lineWidth(L),R=L)}function B(L,se,ae){L?(De(s.POLYGON_OFFSET_FILL),(F!==se||H!==ae)&&(s.polygonOffset(se,ae),F=se,H=ae)):Te(s.POLYGON_OFFSET_FILL)}function $(L){L?De(s.SCISSOR_TEST):Te(s.SCISSOR_TEST)}function J(L){L===void 0&&(L=s.TEXTURE0+Y-1),Q!==L&&(s.activeTexture(L),Q=L)}function ee(L,se,ae){ae===void 0&&(Q===null?ae=s.TEXTURE0+Y-1:ae=Q);let Ce=ue[ae];Ce===void 0&&(Ce={type:void 0,texture:void 0},ue[ae]=Ce),(Ce.type!==L||Ce.texture!==se)&&(Q!==ae&&(s.activeTexture(ae),Q=ae),s.bindTexture(L,se||Le[L]),Ce.type=L,Ce.texture=se)}function xe(){const L=ue[Q];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function re(){try{s.compressedTexImage2D.apply(s,arguments)}catch{}}function fe(){try{s.compressedTexImage3D.apply(s,arguments)}catch{}}function we(){try{s.texSubImage2D.apply(s,arguments)}catch{}}function ze(){try{s.texSubImage3D.apply(s,arguments)}catch{}}function j(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch{}}function Ke(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch{}}function ke(){try{s.texStorage2D.apply(s,arguments)}catch{}}function Ae(){try{s.texStorage3D.apply(s,arguments)}catch{}}function ye(){try{s.texImage2D.apply(s,arguments)}catch{}}function de(){try{s.texImage3D.apply(s,arguments)}catch{}}function Ue(L){oe.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),oe.copy(L))}function Xe(L){_e.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),_e.copy(L))}function ct(L,se){let ae=h.get(se);ae===void 0&&(ae=new WeakMap,h.set(se,ae));let Ce=ae.get(L);Ce===void 0&&(Ce=s.getUniformBlockIndex(se,L.name),ae.set(L,Ce))}function Ge(L,se){const Ce=h.get(se).get(L);u.get(se)!==Ce&&(s.uniformBlockBinding(se,Ce,L.__bindingPointIndex),u.set(se,Ce))}function te(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},Q=null,ue={},f={},v=new WeakMap,_=[],m=null,p=!1,y=null,g=null,b=null,P=null,C=null,E=null,N=null,x=new he(0,0,0),M=0,I=!1,D=null,W=null,R=null,F=null,H=null,oe.set(0,0,s.canvas.width,s.canvas.height),_e.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:De,disable:Te,bindFramebuffer:qe,drawBuffers:O,useProgram:Pt,setBlending:me,setMaterial:rt,setFlipSided:Oe,setCullFace:T,setLineWidth:S,setPolygonOffset:B,setScissorTest:$,activeTexture:J,bindTexture:ee,unbindTexture:xe,compressedTexImage2D:re,compressedTexImage3D:fe,texImage2D:ye,texImage3D:de,updateUBOMapping:ct,uniformBlockBinding:Ge,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:we,texSubImage3D:ze,compressedTexSubImage2D:j,compressedTexSubImage3D:Ke,scissor:Ue,viewport:Xe,reset:te}}function Cm(s,e,t,i,n,a,r){const o=n.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,S){return f?new OffscreenCanvas(T,S):$n("canvas")}function _(T,S,B,$){let J=1;if((T.width>$||T.height>$)&&(J=$/Math.max(T.width,T.height)),J<1||S===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const ee=S?Ys:Math.floor,xe=ee(J*T.width),re=ee(J*T.height);h===void 0&&(h=v(xe,re));const fe=B?v(xe,re):h;return fe.width=xe,fe.height=re,fe.getContext("2d").drawImage(T,0,0,xe,re),fe}else return"data"in T,T;return T}function m(T){return Qa(T.width)&&Qa(T.height)}function p(T){return o?!1:T.wrapS!==Ht||T.wrapT!==Ht||T.minFilter!==mt&&T.minFilter!==St}function y(T,S){return T.generateMipmaps&&S&&T.minFilter!==mt&&T.minFilter!==St}function g(T){s.generateMipmap(T)}function b(T,S,B,$,J=!1){if(o===!1)return S;if(T!==null&&s[T]!==void 0)return s[T];let ee=S;if(S===s.RED&&(B===s.FLOAT&&(ee=s.R32F),B===s.HALF_FLOAT&&(ee=s.R16F),B===s.UNSIGNED_BYTE&&(ee=s.R8)),S===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(ee=s.R8UI),B===s.UNSIGNED_SHORT&&(ee=s.R16UI),B===s.UNSIGNED_INT&&(ee=s.R32UI),B===s.BYTE&&(ee=s.R8I),B===s.SHORT&&(ee=s.R16I),B===s.INT&&(ee=s.R32I)),S===s.RG&&(B===s.FLOAT&&(ee=s.RG32F),B===s.HALF_FLOAT&&(ee=s.RG16F),B===s.UNSIGNED_BYTE&&(ee=s.RG8)),S===s.RGBA){const xe=J?ks:$e.getTransfer($);B===s.FLOAT&&(ee=s.RGBA32F),B===s.HALF_FLOAT&&(ee=s.RGBA16F),B===s.UNSIGNED_BYTE&&(ee=xe===nt?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function P(T,S,B){return y(T,B)===!0||T.isFramebufferTexture&&T.minFilter!==mt&&T.minFilter!==St?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function C(T){return T===mt||T===Ur||T===ra?s.NEAREST:s.LINEAR}function E(T){const S=T.target;S.removeEventListener("dispose",E),x(S),S.isVideoTexture&&u.delete(S)}function N(T){const S=T.target;S.removeEventListener("dispose",N),I(S)}function x(T){const S=i.get(T);if(S.__webglInit===void 0)return;const B=T.source,$=d.get(B);if($){const J=$[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&M(T),Object.keys($).length===0&&d.delete(B)}i.remove(T)}function M(T){const S=i.get(T);s.deleteTexture(S.__webglTexture);const B=T.source,$=d.get(B);delete $[S.__cacheKey],r.memory.textures--}function I(T){const S=T.texture,B=i.get(T),$=i.get(S);if($.__webglTexture!==void 0&&(s.deleteTexture($.__webglTexture),r.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(B.__webglFramebuffer[J]))for(let ee=0;ee<B.__webglFramebuffer[J].length;ee++)s.deleteFramebuffer(B.__webglFramebuffer[J][ee]);else s.deleteFramebuffer(B.__webglFramebuffer[J]);B.__webglDepthbuffer&&s.deleteRenderbuffer(B.__webglDepthbuffer[J])}else{if(Array.isArray(B.__webglFramebuffer))for(let J=0;J<B.__webglFramebuffer.length;J++)s.deleteFramebuffer(B.__webglFramebuffer[J]);else s.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&s.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&s.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let J=0;J<B.__webglColorRenderbuffer.length;J++)B.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(B.__webglColorRenderbuffer[J]);B.__webglDepthRenderbuffer&&s.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let J=0,ee=S.length;J<ee;J++){const xe=i.get(S[J]);xe.__webglTexture&&(s.deleteTexture(xe.__webglTexture),r.memory.textures--),i.remove(S[J])}i.remove(S),i.remove(T)}let D=0;function W(){D=0}function R(){const T=D;return T>=n.maxTextures,D+=1,T}function F(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function H(T,S){const B=i.get(T);if(T.isVideoTexture&&rt(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const $=T.image;if($!==null){if($.complete!==!1){oe(B,T,S);return}}}t.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+S)}function Y(T,S){const B=i.get(T);if(T.version>0&&B.__version!==T.version){oe(B,T,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+S)}function q(T,S){const B=i.get(T);if(T.version>0&&B.__version!==T.version){oe(B,T,S);return}t.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+S)}function X(T,S){const B=i.get(T);if(T.version>0&&B.__version!==T.version){_e(B,T,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+S)}const K={[Ni]:s.REPEAT,[Ht]:s.CLAMP_TO_EDGE,[ja]:s.MIRRORED_REPEAT},Q={[mt]:s.NEAREST,[Ur]:s.NEAREST_MIPMAP_NEAREST,[ra]:s.NEAREST_MIPMAP_LINEAR,[St]:s.LINEAR,[Xc]:s.LINEAR_MIPMAP_NEAREST,[Kn]:s.LINEAR_MIPMAP_LINEAR},ue={[ru]:s.NEVER,[fu]:s.ALWAYS,[ou]:s.LESS,[Rl]:s.LEQUAL,[lu]:s.EQUAL,[hu]:s.GEQUAL,[cu]:s.GREATER,[uu]:s.NOTEQUAL};function k(T,S,B){if(B?(s.texParameteri(T,s.TEXTURE_WRAP_S,K[S.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,K[S.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,K[S.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,Q[S.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,Q[S.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),S.wrapS!==Ht||S.wrapT,s.texParameteri(T,s.TEXTURE_MAG_FILTER,C(S.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,C(S.minFilter)),S.minFilter!==mt&&S.minFilter),S.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,ue[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const $=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===mt||S.minFilter!==ra&&S.minFilter!==Kn||S.type===Si&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===jn&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||i.get(S).__currentAnisotropy)&&(s.texParameterf(T,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,n.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy)}}function Z(T,S){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",E));const $=S.source;let J=d.get($);J===void 0&&(J={},d.set($,J));const ee=F(S);if(ee!==T.__cacheKey){J[ee]===void 0&&(J[ee]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,B=!0),J[ee].usedTimes++;const xe=J[T.__cacheKey];xe!==void 0&&(J[T.__cacheKey].usedTimes--,xe.usedTimes===0&&M(S)),T.__cacheKey=ee,T.__webglTexture=J[ee].texture}return B}function oe(T,S,B){let $=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&($=s.TEXTURE_3D);const J=Z(T,S),ee=S.source;t.bindTexture($,T.__webglTexture,s.TEXTURE0+B);const xe=i.get(ee);if(ee.version!==xe.__version||J===!0){t.activeTexture(s.TEXTURE0+B);const re=$e.getPrimaries($e.workingColorSpace),fe=S.colorSpace===Xt?null:$e.getPrimaries(S.colorSpace),we=S.colorSpace===Xt||re===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const ze=p(S)&&m(S.image)===!1;let j=_(S.image,ze,!1,n.maxTextureSize);j=Oe(S,j);const Ke=m(j)||o,ke=a.convert(S.format,S.colorSpace);let Ae=a.convert(S.type),ye=b(S.internalFormat,ke,Ae,S.colorSpace,S.isVideoTexture);k($,S,Ke);let de;const Ue=S.mipmaps,Xe=o&&S.isVideoTexture!==!0&&ye!==El,ct=xe.__version===void 0||J===!0,Ge=P(S,j,Ke);if(S.isDepthTexture)ye=s.DEPTH_COMPONENT,o?S.type===Si?ye=s.DEPTH_COMPONENT32F:S.type===Mi?ye=s.DEPTH_COMPONENT24:S.type===Oi?ye=s.DEPTH24_STENCIL8:ye=s.DEPTH_COMPONENT16:S.type,S.format===zi&&ye===s.DEPTH_COMPONENT&&S.type!==or&&S.type!==Mi&&(S.type=Mi,Ae=a.convert(S.type)),S.format===Cn&&ye===s.DEPTH_COMPONENT&&(ye=s.DEPTH_STENCIL,S.type!==Oi&&(S.type=Oi,Ae=a.convert(S.type))),ct&&(Xe?t.texStorage2D(s.TEXTURE_2D,1,ye,j.width,j.height):t.texImage2D(s.TEXTURE_2D,0,ye,j.width,j.height,0,ke,Ae,null));else if(S.isDataTexture)if(Ue.length>0&&Ke){Xe&&ct&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let te=0,L=Ue.length;te<L;te++)de=Ue[te],Xe?t.texSubImage2D(s.TEXTURE_2D,te,0,0,de.width,de.height,ke,Ae,de.data):t.texImage2D(s.TEXTURE_2D,te,ye,de.width,de.height,0,ke,Ae,de.data);S.generateMipmaps=!1}else Xe?(ct&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,j.width,j.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,j.width,j.height,ke,Ae,j.data)):t.texImage2D(s.TEXTURE_2D,0,ye,j.width,j.height,0,ke,Ae,j.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Xe&&ct&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ge,ye,Ue[0].width,Ue[0].height,j.depth);for(let te=0,L=Ue.length;te<L;te++)de=Ue[te],S.format!==qt?ke!==null&&(Xe?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,te,0,0,0,de.width,de.height,j.depth,ke,de.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,te,ye,de.width,de.height,j.depth,0,de.data,0,0)):Xe?t.texSubImage3D(s.TEXTURE_2D_ARRAY,te,0,0,0,de.width,de.height,j.depth,ke,Ae,de.data):t.texImage3D(s.TEXTURE_2D_ARRAY,te,ye,de.width,de.height,j.depth,0,ke,Ae,de.data)}else{Xe&&ct&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let te=0,L=Ue.length;te<L;te++)de=Ue[te],S.format!==qt?ke!==null&&(Xe?t.compressedTexSubImage2D(s.TEXTURE_2D,te,0,0,de.width,de.height,ke,de.data):t.compressedTexImage2D(s.TEXTURE_2D,te,ye,de.width,de.height,0,de.data)):Xe?t.texSubImage2D(s.TEXTURE_2D,te,0,0,de.width,de.height,ke,Ae,de.data):t.texImage2D(s.TEXTURE_2D,te,ye,de.width,de.height,0,ke,Ae,de.data)}else if(S.isDataArrayTexture)Xe?(ct&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ge,ye,j.width,j.height,j.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ke,Ae,j.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,ye,j.width,j.height,j.depth,0,ke,Ae,j.data);else if(S.isData3DTexture)Xe?(ct&&t.texStorage3D(s.TEXTURE_3D,Ge,ye,j.width,j.height,j.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ke,Ae,j.data)):t.texImage3D(s.TEXTURE_3D,0,ye,j.width,j.height,j.depth,0,ke,Ae,j.data);else if(S.isFramebufferTexture){if(ct)if(Xe)t.texStorage2D(s.TEXTURE_2D,Ge,ye,j.width,j.height);else{let te=j.width,L=j.height;for(let se=0;se<Ge;se++)t.texImage2D(s.TEXTURE_2D,se,ye,te,L,0,ke,Ae,null),te>>=1,L>>=1}}else if(Ue.length>0&&Ke){Xe&&ct&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let te=0,L=Ue.length;te<L;te++)de=Ue[te],Xe?t.texSubImage2D(s.TEXTURE_2D,te,0,0,ke,Ae,de):t.texImage2D(s.TEXTURE_2D,te,ye,ke,Ae,de);S.generateMipmaps=!1}else Xe?(ct&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,j.width,j.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,ke,Ae,j)):t.texImage2D(s.TEXTURE_2D,0,ye,ke,Ae,j);y(S,Ke)&&g($),xe.__version=ee.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function _e(T,S,B){if(S.image.length!==6)return;const $=Z(T,S),J=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+B);const ee=i.get(J);if(J.version!==ee.__version||$===!0){t.activeTexture(s.TEXTURE0+B);const xe=$e.getPrimaries($e.workingColorSpace),re=S.colorSpace===Xt?null:$e.getPrimaries(S.colorSpace),fe=S.colorSpace===Xt||xe===re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const we=S.isCompressedTexture||S.image[0].isCompressedTexture,ze=S.image[0]&&S.image[0].isDataTexture,j=[];for(let te=0;te<6;te++)!we&&!ze?j[te]=_(S.image[te],!1,!0,n.maxCubemapSize):j[te]=ze?S.image[te].image:S.image[te],j[te]=Oe(S,j[te]);const Ke=j[0],ke=m(Ke)||o,Ae=a.convert(S.format,S.colorSpace),ye=a.convert(S.type),de=b(S.internalFormat,Ae,ye,S.colorSpace),Ue=o&&S.isVideoTexture!==!0,Xe=ee.__version===void 0||$===!0;let ct=P(S,Ke,ke);k(s.TEXTURE_CUBE_MAP,S,ke);let Ge;if(we){Ue&&Xe&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ct,de,Ke.width,Ke.height);for(let te=0;te<6;te++){Ge=j[te].mipmaps;for(let L=0;L<Ge.length;L++){const se=Ge[L];S.format!==qt?Ae!==null&&(Ue?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,0,0,se.width,se.height,Ae,se.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,de,se.width,se.height,0,se.data)):Ue?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,0,0,se.width,se.height,Ae,ye,se.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,de,se.width,se.height,0,Ae,ye,se.data)}}}else{Ge=S.mipmaps,Ue&&Xe&&(Ge.length>0&&ct++,t.texStorage2D(s.TEXTURE_CUBE_MAP,ct,de,j[0].width,j[0].height));for(let te=0;te<6;te++)if(ze){Ue?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,j[te].width,j[te].height,Ae,ye,j[te].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,de,j[te].width,j[te].height,0,Ae,ye,j[te].data);for(let L=0;L<Ge.length;L++){const ae=Ge[L].image[te].image;Ue?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,0,0,ae.width,ae.height,Ae,ye,ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,de,ae.width,ae.height,0,Ae,ye,ae.data)}}else{Ue?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ae,ye,j[te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,de,Ae,ye,j[te]);for(let L=0;L<Ge.length;L++){const se=Ge[L];Ue?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,0,0,Ae,ye,se.image[te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,de,Ae,ye,se.image[te])}}}y(S,ke)&&g(s.TEXTURE_CUBE_MAP),ee.__version=J.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function ge(T,S,B,$,J,ee){const xe=a.convert(B.format,B.colorSpace),re=a.convert(B.type),fe=b(B.internalFormat,xe,re,B.colorSpace);if(!i.get(S).__hasExternalTextures){const ze=Math.max(1,S.width>>ee),j=Math.max(1,S.height>>ee);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?t.texImage3D(J,ee,fe,ze,j,S.depth,0,xe,re,null):t.texImage2D(J,ee,fe,ze,j,0,xe,re,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),me(S)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,J,i.get(B).__webglTexture,0,Re(S)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,J,i.get(B).__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Le(T,S,B){if(s.bindRenderbuffer(s.RENDERBUFFER,T),S.depthBuffer&&!S.stencilBuffer){let $=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(B||me(S)){const J=S.depthTexture;J&&J.isDepthTexture&&(J.type===Si?$=s.DEPTH_COMPONENT32F:J.type===Mi&&($=s.DEPTH_COMPONENT24));const ee=Re(S);me(S)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee,$,S.width,S.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,ee,$,S.width,S.height)}else s.renderbufferStorage(s.RENDERBUFFER,$,S.width,S.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(S.depthBuffer&&S.stencilBuffer){const $=Re(S);B&&me(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$,s.DEPTH24_STENCIL8,S.width,S.height):me(S)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$,s.DEPTH24_STENCIL8,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{const $=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let J=0;J<$.length;J++){const ee=$[J],xe=a.convert(ee.format,ee.colorSpace),re=a.convert(ee.type),fe=b(ee.internalFormat,xe,re,ee.colorSpace),we=Re(S);B&&me(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,we,fe,S.width,S.height):me(S)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,we,fe,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,fe,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function De(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),H(S.depthTexture,0);const $=i.get(S.depthTexture).__webglTexture,J=Re(S);if(S.depthTexture.format===zi)me(S)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0);else if(S.depthTexture.format===Cn)me(S)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Te(T){const S=i.get(T),B=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");De(S.__webglFramebuffer,T)}else if(B){S.__webglDepthbuffer=[];for(let $=0;$<6;$++)t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[$]),S.__webglDepthbuffer[$]=s.createRenderbuffer(),Le(S.__webglDepthbuffer[$],T,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=s.createRenderbuffer(),Le(S.__webglDepthbuffer,T,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function qe(T,S,B){const $=i.get(T);S!==void 0&&ge($.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&Te(T)}function O(T){const S=T.texture,B=i.get(T),$=i.get(S);T.addEventListener("dispose",N),T.isWebGLMultipleRenderTargets!==!0&&($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=S.version,r.memory.textures++);const J=T.isWebGLCubeRenderTarget===!0,ee=T.isWebGLMultipleRenderTargets===!0,xe=m(T)||o;if(J){B.__webglFramebuffer=[];for(let re=0;re<6;re++)if(o&&S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[re]=[];for(let fe=0;fe<S.mipmaps.length;fe++)B.__webglFramebuffer[re][fe]=s.createFramebuffer()}else B.__webglFramebuffer[re]=s.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let re=0;re<S.mipmaps.length;re++)B.__webglFramebuffer[re]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(ee&&n.drawBuffers){const re=T.texture;for(let fe=0,we=re.length;fe<we;fe++){const ze=i.get(re[fe]);ze.__webglTexture===void 0&&(ze.__webglTexture=s.createTexture(),r.memory.textures++)}}if(o&&T.samples>0&&me(T)===!1){const re=ee?S:[S];B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let fe=0;fe<re.length;fe++){const we=re[fe];B.__webglColorRenderbuffer[fe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[fe]);const ze=a.convert(we.format,we.colorSpace),j=a.convert(we.type),Ke=b(we.internalFormat,ze,j,we.colorSpace,T.isXRRenderTarget===!0),ke=Re(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,ke,Ke,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,B.__webglColorRenderbuffer[fe])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Le(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),k(s.TEXTURE_CUBE_MAP,S,xe);for(let re=0;re<6;re++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let fe=0;fe<S.mipmaps.length;fe++)ge(B.__webglFramebuffer[re][fe],T,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe);else ge(B.__webglFramebuffer[re],T,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);y(S,xe)&&g(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const re=T.texture;for(let fe=0,we=re.length;fe<we;fe++){const ze=re[fe],j=i.get(ze);t.bindTexture(s.TEXTURE_2D,j.__webglTexture),k(s.TEXTURE_2D,ze,xe),ge(B.__webglFramebuffer,T,ze,s.COLOR_ATTACHMENT0+fe,s.TEXTURE_2D,0),y(ze,xe)&&g(s.TEXTURE_2D)}t.unbindTexture()}else{let re=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&o&&(re=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(re,$.__webglTexture),k(re,S,xe),o&&S.mipmaps&&S.mipmaps.length>0)for(let fe=0;fe<S.mipmaps.length;fe++)ge(B.__webglFramebuffer[fe],T,S,s.COLOR_ATTACHMENT0,re,fe);else ge(B.__webglFramebuffer,T,S,s.COLOR_ATTACHMENT0,re,0);y(S,xe)&&g(re),t.unbindTexture()}T.depthBuffer&&Te(T)}function Pt(T){const S=m(T)||o,B=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let $=0,J=B.length;$<J;$++){const ee=B[$];if(y(ee,S)){const xe=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,re=i.get(ee).__webglTexture;t.bindTexture(xe,re),g(xe),t.unbindTexture()}}}function Me(T){if(o&&T.samples>0&&me(T)===!1){const S=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],B=T.width,$=T.height;let J=s.COLOR_BUFFER_BIT;const ee=[],xe=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=i.get(T),fe=T.isWebGLMultipleRenderTargets===!0;if(fe)for(let we=0;we<S.length;we++)t.bindFramebuffer(s.FRAMEBUFFER,re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let we=0;we<S.length;we++){ee.push(s.COLOR_ATTACHMENT0+we),T.depthBuffer&&ee.push(xe);const ze=re.__ignoreDepthValues!==void 0?re.__ignoreDepthValues:!1;if(ze===!1&&(T.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),fe&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,re.__webglColorRenderbuffer[we]),ze===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[xe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[xe])),fe){const j=i.get(S[we]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,j,0)}s.blitFramebuffer(0,0,B,$,0,0,B,$,J,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),fe)for(let we=0;we<S.length;we++){t.bindFramebuffer(s.FRAMEBUFFER,re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.RENDERBUFFER,re.__webglColorRenderbuffer[we]);const ze=i.get(S[we]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.TEXTURE_2D,ze,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}}function Re(T){return Math.min(n.maxSamples,T.samples)}function me(T){const S=i.get(T);return o&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function rt(T){const S=r.render.frame;u.get(T)!==S&&(u.set(T,S),T.update())}function Oe(T,S){const B=T.colorSpace,$=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===$a||B!==mi&&B!==Xt&&$e.getTransfer(B)===nt&&o===!1&&(e.has("EXT_sRGB")===!0&&$===qt?(T.format=$a,T.minFilter=St,T.generateMipmaps=!1):S=Ll.sRGBToLinear(S)),S}this.allocateTextureUnit=R,this.resetTextureUnits=W,this.setTexture2D=H,this.setTexture2DArray=Y,this.setTexture3D=q,this.setTextureCube=X,this.rebindTextures=qe,this.setupRenderTarget=O,this.updateRenderTargetMipmap=Pt,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=me}function Em(s,e,t){const i=t.isWebGL2;function n(a,r=Xt){let o;const l=$e.getTransfer(r);if(a===Ti)return s.UNSIGNED_BYTE;if(a===Sl)return s.UNSIGNED_SHORT_4_4_4_4;if(a===bl)return s.UNSIGNED_SHORT_5_5_5_1;if(a===Zc)return s.BYTE;if(a===Kc)return s.SHORT;if(a===or)return s.UNSIGNED_SHORT;if(a===Ml)return s.INT;if(a===Mi)return s.UNSIGNED_INT;if(a===Si)return s.FLOAT;if(a===jn)return i?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(a===jc)return s.ALPHA;if(a===qt)return s.RGBA;if(a===Jc)return s.LUMINANCE;if(a===$c)return s.LUMINANCE_ALPHA;if(a===zi)return s.DEPTH_COMPONENT;if(a===Cn)return s.DEPTH_STENCIL;if(a===$a)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(a===Qc)return s.RED;if(a===wl)return s.RED_INTEGER;if(a===eu)return s.RG;if(a===Tl)return s.RG_INTEGER;if(a===Cl)return s.RGBA_INTEGER;if(a===oa||a===la||a===ca||a===ua)if(l===nt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(a===oa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===la)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===ca)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===ua)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(a===oa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===la)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===ca)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===ua)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Fr||a===Nr||a===Or||a===zr)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(a===Fr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Nr)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Or)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===zr)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===El)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(a===Br||a===Gr)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(a===Br)return l===nt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(a===Gr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Vr||a===Hr||a===kr||a===Wr||a===qr||a===Xr||a===Yr||a===Zr||a===Kr||a===jr||a===Jr||a===$r||a===Qr||a===eo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(a===Vr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Hr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===kr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Wr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===qr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Xr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Yr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Zr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Kr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===jr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Jr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===$r)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Qr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===eo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===ha||a===to||a===io)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(a===ha)return l===nt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===to)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===io)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===tu||a===no||a===so||a===ao)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(a===ha)return o.COMPRESSED_RED_RGTC1_EXT;if(a===no)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===so)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===ao)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Oi?i?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[a]!==void 0?s[a]:null}return{convert:n}}class Am extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class je extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Rm={type:"move"};class Ua{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,v=.005;c.inputState.pinching&&d>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&a!==null&&(n=a),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Rm)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new je;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Pm extends An{constructor(e,t){super();const i=this;let n=null,a=1,r=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,v=null;const _=t.getContextAttributes();let m=null,p=null;const y=[],g=[],b=new ne;let P=null;const C=new Vt;C.layers.enable(1),C.viewport=new at;const E=new Vt;E.layers.enable(2),E.viewport=new at;const N=[C,E],x=new Am;x.layers.enable(1),x.layers.enable(2);let M=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let Z=y[k];return Z===void 0&&(Z=new Ua,y[k]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(k){let Z=y[k];return Z===void 0&&(Z=new Ua,y[k]=Z),Z.getGripSpace()},this.getHand=function(k){let Z=y[k];return Z===void 0&&(Z=new Ua,y[k]=Z),Z.getHandSpace()};function D(k){const Z=g.indexOf(k.inputSource);if(Z===-1)return;const oe=y[Z];oe!==void 0&&(oe.update(k.inputSource,k.frame,c||r),oe.dispatchEvent({type:k.type,data:k.inputSource}))}function W(){n.removeEventListener("select",D),n.removeEventListener("selectstart",D),n.removeEventListener("selectend",D),n.removeEventListener("squeeze",D),n.removeEventListener("squeezestart",D),n.removeEventListener("squeezeend",D),n.removeEventListener("end",W),n.removeEventListener("inputsourceschange",R);for(let k=0;k<y.length;k++){const Z=g[k];Z!==null&&(g[k]=null,y[k].disconnect(Z))}M=null,I=null,e.setRenderTarget(m),f=null,d=null,h=null,n=null,p=null,ue.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){a=k,i.isPresenting},this.setReferenceSpaceType=function(k){o=k,i.isPresenting},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return n},this.setSession=async function(k){if(n=k,n!==null){if(m=e.getRenderTarget(),n.addEventListener("select",D),n.addEventListener("selectstart",D),n.addEventListener("selectend",D),n.addEventListener("squeeze",D),n.addEventListener("squeezestart",D),n.addEventListener("squeezeend",D),n.addEventListener("end",W),n.addEventListener("inputsourceschange",R),_.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(b),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:n.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(n,t,Z),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Gi(f.framebufferWidth,f.framebufferHeight,{format:qt,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Z=null,oe=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=_.stencil?Cn:zi,oe=_.stencil?Oi:Mi);const ge={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:a};h=new XRWebGLBinding(n,t),d=h.createProjectionLayer(ge),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Gi(d.textureWidth,d.textureHeight,{format:qt,type:Ti,depthTexture:new kl(d.textureWidth,d.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Le=e.properties.get(p);Le.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await n.requestReferenceSpace(o),ue.setContext(n),ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function R(k){for(let Z=0;Z<k.removed.length;Z++){const oe=k.removed[Z],_e=g.indexOf(oe);_e>=0&&(g[_e]=null,y[_e].disconnect(oe))}for(let Z=0;Z<k.added.length;Z++){const oe=k.added[Z];let _e=g.indexOf(oe);if(_e===-1){for(let Le=0;Le<y.length;Le++)if(Le>=g.length){g.push(oe),_e=Le;break}else if(g[Le]===null){g[Le]=oe,_e=Le;break}if(_e===-1)break}const ge=y[_e];ge&&ge.connect(oe)}}const F=new A,H=new A;function Y(k,Z,oe){F.setFromMatrixPosition(Z.matrixWorld),H.setFromMatrixPosition(oe.matrixWorld);const _e=F.distanceTo(H),ge=Z.projectionMatrix.elements,Le=oe.projectionMatrix.elements,De=ge[14]/(ge[10]-1),Te=ge[14]/(ge[10]+1),qe=(ge[9]+1)/ge[5],O=(ge[9]-1)/ge[5],Pt=(ge[8]-1)/ge[0],Me=(Le[8]+1)/Le[0],Re=De*Pt,me=De*Me,rt=_e/(-Pt+Me),Oe=rt*-Pt;Z.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Oe),k.translateZ(rt),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const T=De+rt,S=Te+rt,B=Re-Oe,$=me+(_e-Oe),J=qe*Te/S*T,ee=O*Te/S*T;k.projectionMatrix.makePerspective(B,$,J,ee,T,S),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}function q(k,Z){Z===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(Z.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(n===null)return;x.near=E.near=C.near=k.near,x.far=E.far=C.far=k.far,(M!==x.near||I!==x.far)&&(n.updateRenderState({depthNear:x.near,depthFar:x.far}),M=x.near,I=x.far);const Z=k.parent,oe=x.cameras;q(x,Z);for(let _e=0;_e<oe.length;_e++)q(oe[_e],Z);oe.length===2?Y(x,C,E):x.projectionMatrix.copy(C.projectionMatrix),X(k,x,Z)};function X(k,Z,oe){oe===null?k.matrix.copy(Z.matrixWorld):(k.matrix.copy(oe.matrixWorld),k.matrix.invert(),k.matrix.multiply(Z.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(Z.projectionMatrix),k.projectionMatrixInverse.copy(Z.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Jn*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(k){l=k,d!==null&&(d.fixedFoveation=k),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=k)};let K=null;function Q(k,Z){if(u=Z.getViewerPose(c||r),v=Z,u!==null){const oe=u.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let _e=!1;oe.length!==x.cameras.length&&(x.cameras.length=0,_e=!0);for(let ge=0;ge<oe.length;ge++){const Le=oe[ge];let De=null;if(f!==null)De=f.getViewport(Le);else{const qe=h.getViewSubImage(d,Le);De=qe.viewport,ge===0&&(e.setRenderTargetTextures(p,qe.colorTexture,d.ignoreDepthValues?void 0:qe.depthStencilTexture),e.setRenderTarget(p))}let Te=N[ge];Te===void 0&&(Te=new Vt,Te.layers.enable(ge),Te.viewport=new at,N[ge]=Te),Te.matrix.fromArray(Le.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Le.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(De.x,De.y,De.width,De.height),ge===0&&(x.matrix.copy(Te.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),_e===!0&&x.cameras.push(Te)}}for(let oe=0;oe<y.length;oe++){const _e=g[oe],ge=y[oe];_e!==null&&ge!==void 0&&ge.update(_e,Z,c||r)}K&&K(k,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),v=null}const ue=new Vl;ue.setAnimationLoop(Q),this.setAnimationLoop=function(k){K=k},this.dispose=function(){}}}function Lm(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,zl(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,y,g,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),h(m,p)):p.isMeshPhongMaterial?(a(m,p),u(m,p)):p.isMeshStandardMaterial?(a(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(a(m,p),v(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),_(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,g):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Nt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Nt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const g=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*g,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,g){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=g*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Nt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Im(s,e,t,i){let n={},a={},r=[];const o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,g){const b=g.program;i.uniformBlockBinding(y,b)}function c(y,g){let b=n[y.id];b===void 0&&(v(y),b=u(y),n[y.id]=b,y.addEventListener("dispose",m));const P=g.program;i.updateUBOMapping(y,P);const C=e.render.frame;a[y.id]!==C&&(d(y),a[y.id]=C)}function u(y){const g=h();y.__bindingPointIndex=g;const b=s.createBuffer(),P=y.__size,C=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,P,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,g,b),b}function h(){for(let y=0;y<o;y++)if(r.indexOf(y)===-1)return r.push(y),y;return 0}function d(y){const g=n[y.id],b=y.uniforms,P=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,g);for(let C=0,E=b.length;C<E;C++){const N=Array.isArray(b[C])?b[C]:[b[C]];for(let x=0,M=N.length;x<M;x++){const I=N[x];if(f(I,C,x,P)===!0){const D=I.__offset,W=Array.isArray(I.value)?I.value:[I.value];let R=0;for(let F=0;F<W.length;F++){const H=W[F],Y=_(H);typeof H=="number"||typeof H=="boolean"?(I.__data[0]=H,s.bufferSubData(s.UNIFORM_BUFFER,D+R,I.__data)):H.isMatrix3?(I.__data[0]=H.elements[0],I.__data[1]=H.elements[1],I.__data[2]=H.elements[2],I.__data[3]=0,I.__data[4]=H.elements[3],I.__data[5]=H.elements[4],I.__data[6]=H.elements[5],I.__data[7]=0,I.__data[8]=H.elements[6],I.__data[9]=H.elements[7],I.__data[10]=H.elements[8],I.__data[11]=0):(H.toArray(I.__data,R),R+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,D,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,g,b,P){const C=y.value,E=g+"_"+b;if(P[E]===void 0)return typeof C=="number"||typeof C=="boolean"?P[E]=C:P[E]=C.clone(),!0;{const N=P[E];if(typeof C=="number"||typeof C=="boolean"){if(N!==C)return P[E]=C,!0}else if(N.equals(C)===!1)return N.copy(C),!0}return!1}function v(y){const g=y.uniforms;let b=0;const P=16;for(let E=0,N=g.length;E<N;E++){const x=Array.isArray(g[E])?g[E]:[g[E]];for(let M=0,I=x.length;M<I;M++){const D=x[M],W=Array.isArray(D.value)?D.value:[D.value];for(let R=0,F=W.length;R<F;R++){const H=W[R],Y=_(H),q=b%P;q!==0&&P-q<Y.boundary&&(b+=P-q),D.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=b,b+=Y.storage}}}const C=b%P;return C>0&&(b+=P-C),y.__size=b,y.__cache={},this}function _(y){const g={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(g.boundary=4,g.storage=4):y.isVector2?(g.boundary=8,g.storage=8):y.isVector3||y.isColor?(g.boundary=16,g.storage=12):y.isVector4?(g.boundary=16,g.storage=16):y.isMatrix3?(g.boundary=48,g.storage=48):y.isMatrix4?(g.boundary=64,g.storage=64):y.isTexture,g}function m(y){const g=y.target;g.removeEventListener("dispose",m);const b=r.indexOf(g.__bindingPointIndex);r.splice(b,1),s.deleteBuffer(n[g.id]),delete n[g.id],delete a[g.id]}function p(){for(const y in n)s.deleteBuffer(n[y]);r=[],n={},a={}}return{bind:l,update:c,dispose:p}}class Kl{constructor(e={}){const{canvas:t=Eu(),context:i=null,depth:n=!0,stencil:a=!0,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=r;const f=new Uint32Array(4),v=new Int32Array(4);let _=null,m=null;const p=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bt,this._useLegacyLights=!1,this.toneMapping=wi,this.toneMappingExposure=1;const g=this;let b=!1,P=0,C=0,E=null,N=-1,x=null;const M=new at,I=new at;let D=null;const W=new he(0);let R=0,F=t.width,H=t.height,Y=1,q=null,X=null;const K=new at(0,0,F,H),Q=new at(0,0,F,H);let ue=!1;const k=new hr;let Z=!1,oe=!1,_e=null;const ge=new Qe,Le=new ne,De=new A,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function qe(){return E===null?Y:1}let O=i;function Pt(w,U){for(let G=0;G<w.length;G++){const V=w[G],z=t.getContext(V,U);if(z!==null)return z}return null}try{const w={alpha:!0,depth:n,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rr}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",se,!1),O===null){const U=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&U.shift(),O=Pt(U,w),O===null)throw Pt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext,O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw w}let Me,Re,me,rt,Oe,T,S,B,$,J,ee,xe,re,fe,we,ze,j,Ke,ke,Ae,ye,de,Ue,Xe;function ct(){Me=new Hd(O),Re=new Nd(O,Me,e),Me.init(Re),de=new Em(O,Me,Re),me=new Tm(O,Me,Re),rt=new qd(O),Oe=new hm,T=new Cm(O,Me,me,Oe,Re,de,rt),S=new zd(g),B=new Vd(g),$=new $u(O,Re),Ue=new Ud(O,Me,$,Re),J=new kd(O,$,rt,Ue),ee=new Kd(O,J,$,rt),ke=new Zd(O,Re,T),ze=new Od(Oe),xe=new um(g,S,B,Me,Re,Ue,ze),re=new Lm(g,Oe),fe=new dm,we=new _m(Me,Re),Ke=new Dd(g,S,B,me,ee,d,l),j=new wm(g,ee,Re),Xe=new Im(O,rt,Re,me),Ae=new Fd(O,Me,rt,Re),ye=new Wd(O,Me,rt,Re),rt.programs=xe.programs,g.capabilities=Re,g.extensions=Me,g.properties=Oe,g.renderLists=fe,g.shadowMap=j,g.state=me,g.info=rt}ct();const Ge=new Pm(g,O);this.xr=Ge,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const w=Me.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Me.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(w){w!==void 0&&(Y=w,this.setSize(F,H,!1))},this.getSize=function(w){return w.set(F,H)},this.setSize=function(w,U,G=!0){Ge.isPresenting||(F=w,H=U,t.width=Math.floor(w*Y),t.height=Math.floor(U*Y),G===!0&&(t.style.width=w+"px",t.style.height=U+"px"),this.setViewport(0,0,w,U))},this.getDrawingBufferSize=function(w){return w.set(F*Y,H*Y).floor()},this.setDrawingBufferSize=function(w,U,G){F=w,H=U,Y=G,t.width=Math.floor(w*G),t.height=Math.floor(U*G),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(M)},this.getViewport=function(w){return w.copy(K)},this.setViewport=function(w,U,G,V){w.isVector4?K.set(w.x,w.y,w.z,w.w):K.set(w,U,G,V),me.viewport(M.copy(K).multiplyScalar(Y).floor())},this.getScissor=function(w){return w.copy(Q)},this.setScissor=function(w,U,G,V){w.isVector4?Q.set(w.x,w.y,w.z,w.w):Q.set(w,U,G,V),me.scissor(I.copy(Q).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ue},this.setScissorTest=function(w){me.setScissorTest(ue=w)},this.setOpaqueSort=function(w){q=w},this.setTransparentSort=function(w){X=w},this.getClearColor=function(w){return w.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor.apply(Ke,arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha.apply(Ke,arguments)},this.clear=function(w=!0,U=!0,G=!0){let V=0;if(w){let z=!1;if(E!==null){const ce=E.texture.format;z=ce===Cl||ce===Tl||ce===wl}if(z){const ce=E.texture.type,ve=ce===Ti||ce===Mi||ce===or||ce===Oi||ce===Sl||ce===bl,be=Ke.getClearColor(),Ee=Ke.getClearAlpha(),Be=be.r,Pe=be.g,Ie=be.b;ve?(f[0]=Be,f[1]=Pe,f[2]=Ie,f[3]=Ee,O.clearBufferuiv(O.COLOR,0,f)):(v[0]=Be,v[1]=Pe,v[2]=Ie,v[3]=Ee,O.clearBufferiv(O.COLOR,0,v))}else V|=O.COLOR_BUFFER_BIT}U&&(V|=O.DEPTH_BUFFER_BIT),G&&(V|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",se,!1),fe.dispose(),we.dispose(),Oe.dispose(),S.dispose(),B.dispose(),ee.dispose(),Ue.dispose(),Xe.dispose(),xe.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Lt),Ge.removeEventListener("sessionend",it),_e&&(_e.dispose(),_e=null),It.stop()};function te(w){w.preventDefault(),b=!0}function L(){b=!1;const w=rt.autoReset,U=j.enabled,G=j.autoUpdate,V=j.needsUpdate,z=j.type;ct(),rt.autoReset=w,j.enabled=U,j.autoUpdate=G,j.needsUpdate=V,j.type=z}function se(w){}function ae(w){const U=w.target;U.removeEventListener("dispose",ae),Ce(U)}function Ce(w){Se(w),Oe.remove(w)}function Se(w){const U=Oe.get(w).programs;U!==void 0&&(U.forEach(function(G){xe.releaseProgram(G)}),w.isShaderMaterial&&xe.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,G,V,z,ce){U===null&&(U=Te);const ve=z.isMesh&&z.matrixWorld.determinant()<0,be=lc(w,U,G,V,z);me.setMaterial(V,ve);let Ee=G.index,Be=1;if(V.wireframe===!0){if(Ee=J.getWireframeAttribute(G),Ee===void 0)return;Be=2}const Pe=G.drawRange,Ie=G.attributes.position;let ht=Pe.start*Be,Ot=(Pe.start+Pe.count)*Be;ce!==null&&(ht=Math.max(ht,ce.start*Be),Ot=Math.min(Ot,(ce.start+ce.count)*Be)),Ee!==null?(ht=Math.max(ht,0),Ot=Math.min(Ot,Ee.count)):Ie!=null&&(ht=Math.max(ht,0),Ot=Math.min(Ot,Ie.count));const _t=Ot-ht;if(_t<0||_t===1/0)return;Ue.setup(z,V,be,G,Ee);let ai,ot=Ae;if(Ee!==null&&(ai=$.get(Ee),ot=ye,ot.setIndex(ai)),z.isMesh)V.wireframe===!0?(me.setLineWidth(V.wireframeLinewidth*qe()),ot.setMode(O.LINES)):ot.setMode(O.TRIANGLES);else if(z.isLine){let Ve=V.linewidth;Ve===void 0&&(Ve=1),me.setLineWidth(Ve*qe()),z.isLineSegments?ot.setMode(O.LINES):z.isLineLoop?ot.setMode(O.LINE_LOOP):ot.setMode(O.LINE_STRIP)}else z.isPoints?ot.setMode(O.POINTS):z.isSprite&&ot.setMode(O.TRIANGLES);if(z.isBatchedMesh)ot.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)ot.renderInstances(ht,_t,z.count);else if(G.isInstancedBufferGeometry){const Ve=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ia=Math.min(G.instanceCount,Ve);ot.renderInstances(ht,_t,ia)}else ot.render(ht,_t)};function et(w,U,G){w.transparent===!0&&w.side===Mt&&w.forceSinglePass===!1?(w.side=Nt,w.needsUpdate=!0,ss(w,U,G),w.side=pi,w.needsUpdate=!0,ss(w,U,G),w.side=Mt):ss(w,U,G)}this.compile=function(w,U,G=null){G===null&&(G=w),m=we.get(G),m.init(),y.push(m),G.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),w!==G&&w.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights(g._useLegacyLights);const V=new Set;return w.traverse(function(z){const ce=z.material;if(ce)if(Array.isArray(ce))for(let ve=0;ve<ce.length;ve++){const be=ce[ve];et(be,G,z),V.add(be)}else et(ce,G,z),V.add(ce)}),y.pop(),m=null,V},this.compileAsync=function(w,U,G=null){const V=this.compile(w,U,G);return new Promise(z=>{function ce(){if(V.forEach(function(ve){Oe.get(ve).currentProgram.isReady()&&V.delete(ve)}),V.size===0){z(w);return}setTimeout(ce,10)}Me.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let tt=null;function xt(w){tt&&tt(w)}function Lt(){It.stop()}function it(){It.start()}const It=new Vl;It.setAnimationLoop(xt),typeof self<"u"&&It.setContext(self),this.setAnimationLoop=function(w){tt=w,Ge.setAnimationLoop(w),w===null?It.stop():It.start()},Ge.addEventListener("sessionstart",Lt),Ge.addEventListener("sessionend",it),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0||b===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(U),U=Ge.getCamera()),w.isScene===!0&&w.onBeforeRender(g,w,U,E),m=we.get(w,y.length),m.init(),y.push(m),ge.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),k.setFromProjectionMatrix(ge),oe=this.localClippingEnabled,Z=ze.init(this.clippingPlanes,oe),_=fe.get(w,p.length),_.init(),p.push(_),$t(w,U,0,g.sortObjects),_.finish(),g.sortObjects===!0&&_.sort(q,X),this.info.render.frame++,Z===!0&&ze.beginShadows();const G=m.state.shadowsArray;if(j.render(G,w,U),Z===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ke.render(_,w),m.setupLights(g._useLegacyLights),U.isArrayCamera){const V=U.cameras;for(let z=0,ce=V.length;z<ce;z++){const ve=V[z];Sr(_,w,ve,ve.viewport)}}else Sr(_,w,U);E!==null&&(T.updateMultisampleRenderTarget(E),T.updateRenderTargetMipmap(E)),w.isScene===!0&&w.onAfterRender(g,w,U),Ue.resetDefaultState(),N=-1,x=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function $t(w,U,G,V){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||k.intersectsSprite(w)){V&&De.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ge);const ve=ee.update(w),be=w.material;be.visible&&_.push(w,ve,be,G,De.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||k.intersectsObject(w))){const ve=ee.update(w),be=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),De.copy(w.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),De.copy(ve.boundingSphere.center)),De.applyMatrix4(w.matrixWorld).applyMatrix4(ge)),Array.isArray(be)){const Ee=ve.groups;for(let Be=0,Pe=Ee.length;Be<Pe;Be++){const Ie=Ee[Be],ht=be[Ie.materialIndex];ht&&ht.visible&&_.push(w,ve,ht,G,De.z,Ie)}}else be.visible&&_.push(w,ve,be,G,De.z,null)}}const ce=w.children;for(let ve=0,be=ce.length;ve<be;ve++)$t(ce[ve],U,G,V)}function Sr(w,U,G,V){const z=w.opaque,ce=w.transmissive,ve=w.transparent;m.setupLightsView(G),Z===!0&&ze.setGlobalState(g.clippingPlanes,G),ce.length>0&&oc(z,ce,U,G),V&&me.viewport(M.copy(V)),z.length>0&&ns(z,U,G),ce.length>0&&ns(ce,U,G),ve.length>0&&ns(ve,U,G),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function oc(w,U,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const ce=Re.isWebGL2;_e===null&&(_e=new Gi(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?jn:Ti,minFilter:Kn,samples:ce?4:0})),g.getDrawingBufferSize(Le),ce?_e.setSize(Le.x,Le.y):_e.setSize(Ys(Le.x),Ys(Le.y));const ve=g.getRenderTarget();g.setRenderTarget(_e),g.getClearColor(W),R=g.getClearAlpha(),R<1&&g.setClearColor(16777215,.5),g.clear();const be=g.toneMapping;g.toneMapping=wi,ns(w,G,V),T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e);let Ee=!1;for(let Be=0,Pe=U.length;Be<Pe;Be++){const Ie=U[Be],ht=Ie.object,Ot=Ie.geometry,_t=Ie.material,ai=Ie.group;if(_t.side===Mt&&ht.layers.test(V.layers)){const ot=_t.side;_t.side=Nt,_t.needsUpdate=!0,br(ht,G,V,Ot,_t,ai),_t.side=ot,_t.needsUpdate=!0,Ee=!0}}Ee===!0&&(T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e)),g.setRenderTarget(ve),g.setClearColor(W,R),g.toneMapping=be}function ns(w,U,G){const V=U.isScene===!0?U.overrideMaterial:null;for(let z=0,ce=w.length;z<ce;z++){const ve=w[z],be=ve.object,Ee=ve.geometry,Be=V===null?ve.material:V,Pe=ve.group;be.layers.test(G.layers)&&br(be,U,G,Ee,Be,Pe)}}function br(w,U,G,V,z,ce){w.onBeforeRender(g,U,G,V,z,ce),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(g,U,G,V,w,ce),z.transparent===!0&&z.side===Mt&&z.forceSinglePass===!1?(z.side=Nt,z.needsUpdate=!0,g.renderBufferDirect(G,U,V,z,w,ce),z.side=pi,z.needsUpdate=!0,g.renderBufferDirect(G,U,V,z,w,ce),z.side=Mt):g.renderBufferDirect(G,U,V,z,w,ce),w.onAfterRender(g,U,G,V,z,ce)}function ss(w,U,G){U.isScene!==!0&&(U=Te);const V=Oe.get(w),z=m.state.lights,ce=m.state.shadowsArray,ve=z.state.version,be=xe.getParameters(w,z.state,ce,U,G),Ee=xe.getProgramCacheKey(be);let Be=V.programs;V.environment=w.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(w.isMeshStandardMaterial?B:S).get(w.envMap||V.environment),Be===void 0&&(w.addEventListener("dispose",ae),Be=new Map,V.programs=Be);let Pe=Be.get(Ee);if(Pe!==void 0){if(V.currentProgram===Pe&&V.lightsStateVersion===ve)return Tr(w,be),Pe}else be.uniforms=xe.getUniforms(w),w.onBuild(G,be,g),w.onBeforeCompile(be,g),Pe=xe.acquireProgram(be,Ee),Be.set(Ee,Pe),V.uniforms=be.uniforms;const Ie=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ie.clippingPlanes=ze.uniform),Tr(w,be),V.needsLights=uc(w),V.lightsStateVersion=ve,V.needsLights&&(Ie.ambientLightColor.value=z.state.ambient,Ie.lightProbe.value=z.state.probe,Ie.directionalLights.value=z.state.directional,Ie.directionalLightShadows.value=z.state.directionalShadow,Ie.spotLights.value=z.state.spot,Ie.spotLightShadows.value=z.state.spotShadow,Ie.rectAreaLights.value=z.state.rectArea,Ie.ltc_1.value=z.state.rectAreaLTC1,Ie.ltc_2.value=z.state.rectAreaLTC2,Ie.pointLights.value=z.state.point,Ie.pointLightShadows.value=z.state.pointShadow,Ie.hemisphereLights.value=z.state.hemi,Ie.directionalShadowMap.value=z.state.directionalShadowMap,Ie.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ie.spotShadowMap.value=z.state.spotShadowMap,Ie.spotLightMatrix.value=z.state.spotLightMatrix,Ie.spotLightMap.value=z.state.spotLightMap,Ie.pointShadowMap.value=z.state.pointShadowMap,Ie.pointShadowMatrix.value=z.state.pointShadowMatrix),V.currentProgram=Pe,V.uniformsList=null,Pe}function wr(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=Gs.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function Tr(w,U){const G=Oe.get(w);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function lc(w,U,G,V,z){U.isScene!==!0&&(U=Te),T.resetTextureUnits();const ce=U.fog,ve=V.isMeshStandardMaterial?U.environment:null,be=E===null?g.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:mi,Ee=(V.isMeshStandardMaterial?B:S).get(V.envMap||ve),Be=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Pe=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ie=!!G.morphAttributes.position,ht=!!G.morphAttributes.normal,Ot=!!G.morphAttributes.color;let _t=wi;V.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(_t=g.toneMapping);const ai=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ot=ai!==void 0?ai.length:0,Ve=Oe.get(V),ia=m.state.lights;if(Z===!0&&(oe===!0||w!==x)){const kt=w===x&&V.id===N;ze.setState(V,w,kt)}let ut=!1;V.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==ia.state.version||Ve.outputColorSpace!==be||z.isBatchedMesh&&Ve.batching===!1||!z.isBatchedMesh&&Ve.batching===!0||z.isInstancedMesh&&Ve.instancing===!1||!z.isInstancedMesh&&Ve.instancing===!0||z.isSkinnedMesh&&Ve.skinning===!1||!z.isSkinnedMesh&&Ve.skinning===!0||z.isInstancedMesh&&Ve.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ve.instancingColor===!1&&z.instanceColor!==null||Ve.envMap!==Ee||V.fog===!0&&Ve.fog!==ce||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ze.numPlanes||Ve.numIntersection!==ze.numIntersection)||Ve.vertexAlphas!==Be||Ve.vertexTangents!==Pe||Ve.morphTargets!==Ie||Ve.morphNormals!==ht||Ve.morphColors!==Ot||Ve.toneMapping!==_t||Re.isWebGL2===!0&&Ve.morphTargetsCount!==ot)&&(ut=!0):(ut=!0,Ve.__version=V.version);let Ei=Ve.currentProgram;ut===!0&&(Ei=ss(V,U,z));let Cr=!1,Pn=!1,na=!1;const Tt=Ei.getUniforms(),Ai=Ve.uniforms;if(me.useProgram(Ei.program)&&(Cr=!0,Pn=!0,na=!0),V.id!==N&&(N=V.id,Pn=!0),Cr||x!==w){Tt.setValue(O,"projectionMatrix",w.projectionMatrix),Tt.setValue(O,"viewMatrix",w.matrixWorldInverse);const kt=Tt.map.cameraPosition;kt!==void 0&&kt.setValue(O,De.setFromMatrixPosition(w.matrixWorld)),Re.logarithmicDepthBuffer&&Tt.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Tt.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),x!==w&&(x=w,Pn=!0,na=!0)}if(z.isSkinnedMesh){Tt.setOptional(O,z,"bindMatrix"),Tt.setOptional(O,z,"bindMatrixInverse");const kt=z.skeleton;kt&&Re.floatVertexTextures&&(kt.boneTexture===null&&kt.computeBoneTexture(),Tt.setValue(O,"boneTexture",kt.boneTexture,T))}z.isBatchedMesh&&(Tt.setOptional(O,z,"batchingTexture"),Tt.setValue(O,"batchingTexture",z._matricesTexture,T));const sa=G.morphAttributes;if((sa.position!==void 0||sa.normal!==void 0||sa.color!==void 0&&Re.isWebGL2===!0)&&ke.update(z,G,Ei),(Pn||Ve.receiveShadow!==z.receiveShadow)&&(Ve.receiveShadow=z.receiveShadow,Tt.setValue(O,"receiveShadow",z.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Ai.envMap.value=Ee,Ai.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),Pn&&(Tt.setValue(O,"toneMappingExposure",g.toneMappingExposure),Ve.needsLights&&cc(Ai,na),ce&&V.fog===!0&&re.refreshFogUniforms(Ai,ce),re.refreshMaterialUniforms(Ai,V,Y,H,_e),Gs.upload(O,wr(Ve),Ai,T)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Gs.upload(O,wr(Ve),Ai,T),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Tt.setValue(O,"center",z.center),Tt.setValue(O,"modelViewMatrix",z.modelViewMatrix),Tt.setValue(O,"normalMatrix",z.normalMatrix),Tt.setValue(O,"modelMatrix",z.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const kt=V.uniformsGroups;for(let aa=0,hc=kt.length;aa<hc;aa++)if(Re.isWebGL2){const Er=kt[aa];Xe.update(Er,Ei),Xe.bind(Er,Ei)}}return Ei}function cc(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function uc(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(w,U,G){Oe.get(w.texture).__webglTexture=U,Oe.get(w.depthTexture).__webglTexture=G;const V=Oe.get(w);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=G===void 0,V.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,U){const G=Oe.get(w);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,G=0){E=w,P=U,C=G;let V=!0,z=null,ce=!1,ve=!1;if(w){const Ee=Oe.get(w);Ee.__useDefaultFramebuffer!==void 0?(me.bindFramebuffer(O.FRAMEBUFFER,null),V=!1):Ee.__webglFramebuffer===void 0?T.setupRenderTarget(w):Ee.__hasExternalTextures&&T.rebindTextures(w,Oe.get(w.texture).__webglTexture,Oe.get(w.depthTexture).__webglTexture);const Be=w.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ve=!0);const Pe=Oe.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Pe[U])?z=Pe[U][G]:z=Pe[U],ce=!0):Re.isWebGL2&&w.samples>0&&T.useMultisampledRTT(w)===!1?z=Oe.get(w).__webglMultisampledFramebuffer:Array.isArray(Pe)?z=Pe[G]:z=Pe,M.copy(w.viewport),I.copy(w.scissor),D=w.scissorTest}else M.copy(K).multiplyScalar(Y).floor(),I.copy(Q).multiplyScalar(Y).floor(),D=ue;if(me.bindFramebuffer(O.FRAMEBUFFER,z)&&Re.drawBuffers&&V&&me.drawBuffers(w,z),me.viewport(M),me.scissor(I),me.setScissorTest(D),ce){const Ee=Oe.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ee.__webglTexture,G)}else if(ve){const Ee=Oe.get(w.texture),Be=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ee.__webglTexture,G||0,Be)}N=-1},this.readRenderTargetPixels=function(w,U,G,V,z,ce,ve){if(!(w&&w.isWebGLRenderTarget))return;let be=Oe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ve!==void 0&&(be=be[ve]),be){me.bindFramebuffer(O.FRAMEBUFFER,be);try{const Ee=w.texture,Be=Ee.format,Pe=Ee.type;if(Be!==qt&&de.convert(Be)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT))return;const Ie=Pe===jn&&(Me.has("EXT_color_buffer_half_float")||Re.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Pe!==Ti&&de.convert(Pe)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pe===Si&&(Re.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!Ie)return;U>=0&&U<=w.width-V&&G>=0&&G<=w.height-z&&O.readPixels(U,G,V,z,de.convert(Be),de.convert(Pe),ce)}finally{const Ee=E!==null?Oe.get(E).__webglFramebuffer:null;me.bindFramebuffer(O.FRAMEBUFFER,Ee)}}},this.copyFramebufferToTexture=function(w,U,G=0){const V=Math.pow(2,-G),z=Math.floor(U.image.width*V),ce=Math.floor(U.image.height*V);T.setTexture2D(U,0),O.copyTexSubImage2D(O.TEXTURE_2D,G,0,0,w.x,w.y,z,ce),me.unbindTexture()},this.copyTextureToTexture=function(w,U,G,V=0){const z=U.image.width,ce=U.image.height,ve=de.convert(G.format),be=de.convert(G.type);T.setTexture2D(G,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment),U.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,V,w.x,w.y,z,ce,ve,be,U.image.data):U.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,V,w.x,w.y,U.mipmaps[0].width,U.mipmaps[0].height,ve,U.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,V,w.x,w.y,ve,be,U.image),V===0&&G.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),me.unbindTexture()},this.copyTextureToTexture3D=function(w,U,G,V,z=0){if(g.isWebGL1Renderer)return;const ce=w.max.x-w.min.x+1,ve=w.max.y-w.min.y+1,be=w.max.z-w.min.z+1,Ee=de.convert(V.format),Be=de.convert(V.type);let Pe;if(V.isData3DTexture)T.setTexture3D(V,0),Pe=O.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)T.setTexture2DArray(V,0),Pe=O.TEXTURE_2D_ARRAY;else return;O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment);const Ie=O.getParameter(O.UNPACK_ROW_LENGTH),ht=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ot=O.getParameter(O.UNPACK_SKIP_PIXELS),_t=O.getParameter(O.UNPACK_SKIP_ROWS),ai=O.getParameter(O.UNPACK_SKIP_IMAGES),ot=G.isCompressedTexture?G.mipmaps[z]:G.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,ot.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ot.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,w.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,w.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,w.min.z),G.isDataTexture||G.isData3DTexture?O.texSubImage3D(Pe,z,U.x,U.y,U.z,ce,ve,be,Ee,Be,ot.data):G.isCompressedArrayTexture?O.compressedTexSubImage3D(Pe,z,U.x,U.y,U.z,ce,ve,be,Ee,ot.data):O.texSubImage3D(Pe,z,U.x,U.y,U.z,ce,ve,be,Ee,Be,ot),O.pixelStorei(O.UNPACK_ROW_LENGTH,Ie),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ht),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ot),O.pixelStorei(O.UNPACK_SKIP_ROWS,_t),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ai),z===0&&V.generateMipmaps&&O.generateMipmap(Pe),me.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),me.unbindTexture()},this.resetState=function(){P=0,C=0,E=null,me.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===lr?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===$s?"display-p3":"srgb"}get outputEncoding(){return this.outputColorSpace===bt?Bi:Al}set outputEncoding(e){this.outputColorSpace=e===Bi?bt:mi}get useLegacyLights(){return this._useLegacyLights}set useLegacyLights(e){this._useLegacyLights=e}}class Dm extends Kl{}Dm.prototype.isWebGL1Renderer=!0;class Um extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Fm{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,a=this.stride;n<a;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new A;class Zs{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ii(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ii(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ii(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ii(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),n=Je(n,this.array),a=Je(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=a,this}clone(e){if(e===void 0){const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[n+a])}return new st(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[n+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class jl extends Wi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ln;const Fn=new A,cn=new A,un=new A,hn=new ne,Nn=new ne,Jl=new Qe,Es=new A,On=new A,As=new A,Ko=new ne,Fa=new ne,jo=new ne;class Nm extends pt{constructor(e=new jl){if(super(),this.isSprite=!0,this.type="Sprite",ln===void 0){ln=new Ze;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Fm(t,5);ln.setIndex([0,1,2,0,2,3]),ln.setAttribute("position",new Zs(i,3,0,!1)),ln.setAttribute("uv",new Zs(i,2,3,!1))}this.geometry=ln,this.material=e,this.center=new ne(.5,.5)}raycast(e,t){e.camera,cn.setFromMatrixScale(this.matrixWorld),Jl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),un.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cn.multiplyScalar(-un.z);const i=this.material.rotation;let n,a;i!==0&&(a=Math.cos(i),n=Math.sin(i));const r=this.center;Rs(Es.set(-.5,-.5,0),un,r,cn,n,a),Rs(On.set(.5,-.5,0),un,r,cn,n,a),Rs(As.set(.5,.5,0),un,r,cn,n,a),Ko.set(0,0),Fa.set(1,0),jo.set(1,1);let o=e.ray.intersectTriangle(Es,On,As,!1,Fn);if(o===null&&(Rs(On.set(-.5,.5,0),un,r,cn,n,a),Fa.set(0,1),o=e.ray.intersectTriangle(Es,As,On,!1,Fn),o===null))return;const l=e.ray.origin.distanceTo(Fn);l<e.near||l>e.far||t.push({distance:l,point:Fn.clone(),uv:Gt.getInterpolation(Fn,Es,On,As,Ko,Fa,jo,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Rs(s,e,t,i,n,a){hn.subVectors(s,t).addScalar(.5).multiply(i),n!==void 0?(Nn.x=a*hn.x-n*hn.y,Nn.y=n*hn.x+a*hn.y):Nn.copy(hn),s.copy(e),s.x+=Nn.x,s.y+=Nn.y,s.applyMatrix4(Jl)}class Om extends Rt{constructor(e=null,t=1,i=1,n,a,r,o,l,c=mt,u=mt,h,d){super(null,r,o,l,c,u,n,a,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jo extends st{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const fn=new Qe,$o=new Qe,Ps=[],Qo=new Hi,zm=new Qe,zn=new We,Bn=new ki;class el extends We{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jo(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,zm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,fn),Qo.copy(e.boundingBox).applyMatrix4(fn),this.boundingBox.union(Qo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,fn),Bn.copy(e.boundingSphere).applyMatrix4(fn),this.boundingSphere.union(Bn)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,n=this.count;if(zn.geometry=this.geometry,zn.material=this.material,zn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bn.copy(this.boundingSphere),Bn.applyMatrix4(i),e.ray.intersectsSphere(Bn)!==!1))for(let a=0;a<n;a++){this.getMatrixAt(a,fn),$o.multiplyMatrices(i,fn),zn.matrixWorld=$o,zn.raycast(e,Ps);for(let r=0,o=Ps.length;r<o;r++){const l=Ps[r];l.instanceId=a,l.object=this,t.push(l)}Ps.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class dn extends Wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new he(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const tl=new A,il=new A,nl=new Qe,Na=new ur,Ls=new ki;class Bm extends pt{constructor(e=new Ze,t=new dn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,a=t.count;n<a;n++)tl.fromBufferAttribute(t,n-1),il.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=tl.distanceTo(il);e.setAttribute("lineDistance",new Ne(i,1))}return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,a=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ls.copy(i.boundingSphere),Ls.applyMatrix4(n),Ls.radius+=a,e.ray.intersectsSphere(Ls)===!1)return;nl.copy(n).invert(),Na.copy(e.ray).applyMatrix4(nl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new A,u=new A,h=new A,d=new A,f=this.isLineSegments?2:1,v=i.index,m=i.attributes.position;if(v!==null){const p=Math.max(0,r.start),y=Math.min(v.count,r.start+r.count);for(let g=p,b=y-1;g<b;g+=f){const P=v.getX(g),C=v.getX(g+1);if(c.fromBufferAttribute(m,P),u.fromBufferAttribute(m,C),Na.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const N=e.ray.origin.distanceTo(d);N<e.near||N>e.far||t.push({distance:N,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,r.start),y=Math.min(m.count,r.start+r.count);for(let g=p,b=y-1;g<b;g+=f){if(c.fromBufferAttribute(m,g),u.fromBufferAttribute(m,g+1),Na.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(d);C<e.near||C>e.far||t.push({distance:C,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=n.length;a<r;a++){const o=n[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}const sl=new A,al=new A;class Gn extends Bm{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,a=t.count;n<a;n+=2)sl.fromBufferAttribute(t,n),al.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+sl.distanceTo(al);e.setAttribute("lineDistance",new Ne(i,1))}return this}}class Vs extends Wi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const rl=new Qe,tr=new ur,Is=new ki,Ds=new A;class hi extends pt{constructor(e=new Ze,t=new Vs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,a=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere),Is.applyMatrix4(n),Is.radius+=a,e.ray.intersectsSphere(Is)===!1)return;rl.copy(n).invert(),tr.copy(e.ray).applyMatrix4(rl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let v=d,_=f;v<_;v++){const m=c.getX(v);Ds.fromBufferAttribute(h,m),ol(Ds,m,l,n,e,t,this)}}else{const d=Math.max(0,r.start),f=Math.min(h.count,r.start+r.count);for(let v=d,_=f;v<_;v++)Ds.fromBufferAttribute(h,v),ol(Ds,v,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=n.length;a<r;a++){const o=n[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function ol(s,e,t,i,n,a,r){const o=tr.distanceSqToPoint(s);if(o<t){const l=new A;tr.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:r})}}class Vn extends Rt{constructor(e,t,i,n,a,r,o,l,c){super(e,t,i,n,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class si{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,n=this.getPoint(0),a=0;t.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),a+=i.distanceTo(n),t.push(a),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let n=0;const a=i.length;let r;t?r=t:r=e*i[a-1];let o=0,l=a-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-r,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===r)return n/(a-1);const u=i[n],d=i[n+1]-u,f=(r-u)/d;return(n+f)/(a-1)}getTangent(e,t){let n=e-1e-4,a=e+1e-4;n<0&&(n=0),a>1&&(a=1);const r=this.getPoint(n),o=this.getPoint(a),l=t||(r.isVector2?new ne:new A);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new A,n=[],a=[],r=[],o=new A,l=new Qe;for(let f=0;f<=e;f++){const v=f/e;n[f]=this.getTangentAt(v,new A)}a[0]=new A,r[0]=new A;let c=Number.MAX_VALUE;const u=Math.abs(n[0].x),h=Math.abs(n[0].y),d=Math.abs(n[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),a[0].crossVectors(n[0],o),r[0].crossVectors(n[0],a[0]);for(let f=1;f<=e;f++){if(a[f]=a[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(n[f-1],n[f]),o.length()>Number.EPSILON){o.normalize();const v=Math.acos(wt(n[f-1].dot(n[f]),-1,1));a[f].applyMatrix4(l.makeRotationAxis(o,v))}r[f].crossVectors(n[f],a[f])}if(t===!0){let f=Math.acos(wt(a[0].dot(a[e]),-1,1));f/=e,n[0].dot(o.crossVectors(a[0],a[e]))>0&&(f=-f);for(let v=1;v<=e;v++)a[v].applyMatrix4(l.makeRotationAxis(n[v],f*v)),r[v].crossVectors(n[v],a[v])}return{tangents:n,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class dr extends si{constructor(e=0,t=0,i=1,n=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const i=t||new ne,n=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=n;for(;a>n;)a-=n;a<Number.EPSILON&&(r?a=0:a=n),this.aClockwise===!0&&!r&&(a===n?a=-n:a=a-n);const o=this.aStartAngle+e*a;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Gm extends dr{constructor(e,t,i,n,a,r){super(e,t,i,i,n,a,r),this.isArcCurve=!0,this.type="ArcCurve"}}function pr(){let s=0,e=0,t=0,i=0;function n(a,r,o,l){s=a,e=o,t=-3*a+3*r-2*o-l,i=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){n(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,u,h){let d=(r-a)/c-(o-a)/(c+u)+(o-r)/u,f=(o-r)/u-(l-r)/(u+h)+(l-o)/h;d*=u,f*=u,n(r,o,d,f)},calc:function(a){const r=a*a,o=r*a;return s+e*a+t*r+i*o}}}const Us=new A,Oa=new pr,za=new pr,Ba=new pr;class Vm extends si{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new A){const i=t,n=this.points,a=n.length,r=(a-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,u;this.closed||o>0?c=n[(o-1)%a]:(Us.subVectors(n[0],n[1]).add(n[0]),c=Us);const h=n[o%a],d=n[(o+1)%a];if(this.closed||o+2<a?u=n[(o+2)%a]:(Us.subVectors(n[a-1],n[a-2]).add(n[a-1]),u=Us),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),v<1e-4&&(v=_),m<1e-4&&(m=_),Oa.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,v,_,m),za.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,v,_,m),Ba.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,v,_,m)}else this.curveType==="catmullrom"&&(Oa.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),za.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Ba.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return i.set(Oa.calc(l),za.calc(l),Ba.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new A().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ll(s,e,t,i,n){const a=(i-e)*.5,r=(n-t)*.5,o=s*s,l=s*o;return(2*t-2*i+a+r)*l+(-3*t+3*i-2*a-r)*o+a*s+t}function Hm(s,e){const t=1-s;return t*t*e}function km(s,e){return 2*(1-s)*s*e}function Wm(s,e){return s*s*e}function qn(s,e,t,i){return Hm(s,e)+km(s,t)+Wm(s,i)}function qm(s,e){const t=1-s;return t*t*t*e}function Xm(s,e){const t=1-s;return 3*t*t*s*e}function Ym(s,e){return 3*(1-s)*s*s*e}function Zm(s,e){return s*s*s*e}function Xn(s,e,t,i,n){return qm(s,e)+Xm(s,t)+Ym(s,i)+Zm(s,n)}class $l extends si{constructor(e=new ne,t=new ne,i=new ne,n=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new ne){const i=t,n=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Xn(e,n.x,a.x,r.x,o.x),Xn(e,n.y,a.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Km extends si{constructor(e=new A,t=new A,i=new A,n=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new A){const i=t,n=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Xn(e,n.x,a.x,r.x,o.x),Xn(e,n.y,a.y,r.y,o.y),Xn(e,n.z,a.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ql extends si{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jm extends si{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ec extends si{constructor(e=new ne,t=new ne,i=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ne){const i=t,n=this.v0,a=this.v1,r=this.v2;return i.set(qn(e,n.x,a.x,r.x),qn(e,n.y,a.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jm extends si{constructor(e=new A,t=new A,i=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new A){const i=t,n=this.v0,a=this.v1,r=this.v2;return i.set(qn(e,n.x,a.x,r.x),qn(e,n.y,a.y,r.y),qn(e,n.z,a.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tc extends si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){const i=t,n=this.points,a=(n.length-1)*e,r=Math.floor(a),o=a-r,l=n[r===0?r:r-1],c=n[r],u=n[r>n.length-2?n.length-1:r+1],h=n[r>n.length-3?n.length-1:r+2];return i.set(ll(o,l.x,c.x,u.x,h.x),ll(o,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new ne().fromArray(n))}return this}}var cl=Object.freeze({__proto__:null,ArcCurve:Gm,CatmullRomCurve3:Vm,CubicBezierCurve:$l,CubicBezierCurve3:Km,EllipseCurve:dr,LineCurve:Ql,LineCurve3:jm,QuadraticBezierCurve:ec,QuadraticBezierCurve3:Jm,SplineCurve:tc});class $m extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new cl[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),n=this.getCurveLengths();let a=0;for(;a<n.length;){if(n[a]>=i){const r=n[a]-i,o=this.curves[a],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let n=0,a=this.curves;n<a.length;n++){const r=a[n],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(new cl[n.type]().fromJSON(n))}return this}}class ul extends $m{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Ql(this.currentPoint.clone(),new ne(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){const a=new ec(this.currentPoint.clone(),new ne(e,t),new ne(i,n));return this.curves.push(a),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,a,r){const o=new $l(this.currentPoint.clone(),new ne(e,t),new ne(i,n),new ne(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new tc(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,a,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,n,a,r),this}absarc(e,t,i,n,a,r){return this.absellipse(e,t,i,i,n,a,r),this}ellipse(e,t,i,n,a,r,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,n,a,r,o,l),this}absellipse(e,t,i,n,a,r,o,l){const c=new dr(e,t,i,n,a,r,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class mr extends Ze{constructor(e=1,t=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);const a=[],r=[],o=[],l=[],c=new A,u=new ne;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=i+h/t*n;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(r[d]/e+1)/2,u.y=(r[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)a.push(h,h+1,0);this.setIndex(a),this.setAttribute("position",new Ne(r,3)),this.setAttribute("normal",new Ne(o,3)),this.setAttribute("uv",new Ne(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class vr extends Ze{constructor(e=1,t=1,i=1,n=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),a=Math.floor(a);const u=[],h=[],d=[],f=[];let v=0;const _=[],m=i/2;let p=0;y(),r===!1&&(e>0&&g(!0),t>0&&g(!1)),this.setIndex(u),this.setAttribute("position",new Ne(h,3)),this.setAttribute("normal",new Ne(d,3)),this.setAttribute("uv",new Ne(f,2));function y(){const b=new A,P=new A;let C=0;const E=(t-e)/i;for(let N=0;N<=a;N++){const x=[],M=N/a,I=M*(t-e)+e;for(let D=0;D<=n;D++){const W=D/n,R=W*l+o,F=Math.sin(R),H=Math.cos(R);P.x=I*F,P.y=-M*i+m,P.z=I*H,h.push(P.x,P.y,P.z),b.set(F,E,H).normalize(),d.push(b.x,b.y,b.z),f.push(W,1-M),x.push(v++)}_.push(x)}for(let N=0;N<n;N++)for(let x=0;x<a;x++){const M=_[x][N],I=_[x+1][N],D=_[x+1][N+1],W=_[x][N+1];u.push(M,I,W),u.push(I,D,W),C+=6}c.addGroup(p,C,0),p+=C}function g(b){const P=v,C=new ne,E=new A;let N=0;const x=b===!0?e:t,M=b===!0?1:-1;for(let D=1;D<=n;D++)h.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),v++;const I=v;for(let D=0;D<=n;D++){const R=D/n*l+o,F=Math.cos(R),H=Math.sin(R);E.x=x*H,E.y=m*M,E.z=x*F,h.push(E.x,E.y,E.z),d.push(0,M,0),C.x=F*.5+.5,C.y=H*.5*M+.5,f.push(C.x,C.y),v++}for(let D=0;D<n;D++){const W=P+D,R=I+D;b===!0?u.push(R,R+1,W):u.push(R+1,R,W),N+=3}c.addGroup(p,N,b===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yn extends vr{constructor(e=1,t=1,i=32,n=1,a=!1,r=0,o=Math.PI*2){super(0,e,t,i,n,a,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Yn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class gr extends Ze{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const a=[],r=[];o(n),c(i),u(),this.setAttribute("position",new Ne(a,3)),this.setAttribute("normal",new Ne(a.slice(),3)),this.setAttribute("uv",new Ne(r,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const g=new A,b=new A,P=new A;for(let C=0;C<t.length;C+=3)f(t[C+0],g),f(t[C+1],b),f(t[C+2],P),l(g,b,P,y)}function l(y,g,b,P){const C=P+1,E=[];for(let N=0;N<=C;N++){E[N]=[];const x=y.clone().lerp(b,N/C),M=g.clone().lerp(b,N/C),I=C-N;for(let D=0;D<=I;D++)D===0&&N===C?E[N][D]=x:E[N][D]=x.clone().lerp(M,D/I)}for(let N=0;N<C;N++)for(let x=0;x<2*(C-N)-1;x++){const M=Math.floor(x/2);x%2===0?(d(E[N][M+1]),d(E[N+1][M]),d(E[N][M])):(d(E[N][M+1]),d(E[N+1][M+1]),d(E[N+1][M]))}}function c(y){const g=new A;for(let b=0;b<a.length;b+=3)g.x=a[b+0],g.y=a[b+1],g.z=a[b+2],g.normalize().multiplyScalar(y),a[b+0]=g.x,a[b+1]=g.y,a[b+2]=g.z}function u(){const y=new A;for(let g=0;g<a.length;g+=3){y.x=a[g+0],y.y=a[g+1],y.z=a[g+2];const b=m(y)/2/Math.PI+.5,P=p(y)/Math.PI+.5;r.push(b,1-P)}v(),h()}function h(){for(let y=0;y<r.length;y+=6){const g=r[y+0],b=r[y+2],P=r[y+4],C=Math.max(g,b,P),E=Math.min(g,b,P);C>.9&&E<.1&&(g<.2&&(r[y+0]+=1),b<.2&&(r[y+2]+=1),P<.2&&(r[y+4]+=1))}}function d(y){a.push(y.x,y.y,y.z)}function f(y,g){const b=y*3;g.x=e[b+0],g.y=e[b+1],g.z=e[b+2]}function v(){const y=new A,g=new A,b=new A,P=new A,C=new ne,E=new ne,N=new ne;for(let x=0,M=0;x<a.length;x+=9,M+=6){y.set(a[x+0],a[x+1],a[x+2]),g.set(a[x+3],a[x+4],a[x+5]),b.set(a[x+6],a[x+7],a[x+8]),C.set(r[M+0],r[M+1]),E.set(r[M+2],r[M+3]),N.set(r[M+4],r[M+5]),P.copy(y).add(g).add(b).divideScalar(3);const I=m(P);_(C,M+0,y,I),_(E,M+2,g,I),_(N,M+4,b,I)}}function _(y,g,b,P){P<0&&y.x===1&&(r[g]=y.x-1),b.x===0&&b.z===0&&(r[g]=P/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.vertices,e.indices,e.radius,e.details)}}const Fs=new A,Ns=new A,Ga=new A,Os=new Gt;class Va extends Ze{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const n=Math.pow(10,4),a=Math.cos(Sn*t),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let v=0;v<l;v+=3){r?(c[0]=r.getX(v),c[1]=r.getX(v+1),c[2]=r.getX(v+2)):(c[0]=v,c[1]=v+1,c[2]=v+2);const{a:_,b:m,c:p}=Os;if(_.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Os.getNormal(Ga),h[0]=`${Math.round(_.x*n)},${Math.round(_.y*n)},${Math.round(_.z*n)}`,h[1]=`${Math.round(m.x*n)},${Math.round(m.y*n)},${Math.round(m.z*n)}`,h[2]=`${Math.round(p.x*n)},${Math.round(p.y*n)},${Math.round(p.z*n)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let y=0;y<3;y++){const g=(y+1)%3,b=h[y],P=h[g],C=Os[u[y]],E=Os[u[g]],N=`${b}_${P}`,x=`${P}_${b}`;x in d&&d[x]?(Ga.dot(d[x].normal)<=a&&(f.push(C.x,C.y,C.z),f.push(E.x,E.y,E.z)),d[x]=null):N in d||(d[N]={index0:c[y],index1:c[g],normal:Ga.clone()})}}for(const v in d)if(d[v]){const{index0:_,index1:m}=d[v];Fs.fromBufferAttribute(o,_),Ns.fromBufferAttribute(o,m),f.push(Fs.x,Fs.y,Fs.z),f.push(Ns.x,Ns.y,Ns.z)}this.setAttribute("position",new Ne(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ir extends ul{constructor(e){super(e),this.uuid=ni(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(new ul().fromJSON(n))}return this}}const Qm={triangulate:function(s,e,t=2){const i=e&&e.length,n=i?e[0]*t:s.length;let a=ic(s,0,n,t,!0);const r=[];if(!a||a.next===a.prev)return r;let o,l,c,u,h,d,f;if(i&&(a=s0(s,e,a,t)),s.length>80*t){o=c=s[0],l=u=s[1];for(let v=t;v<n;v+=t)h=s[v],d=s[v+1],h<o&&(o=h),d<l&&(l=d),h>c&&(c=h),d>u&&(u=d);f=Math.max(c-o,u-l),f=f!==0?32767/f:0}return Qn(a,r,t,o,l,f,0),r}};function ic(s,e,t,i,n){let a,r;if(n===m0(s,e,t,i)>0)for(a=e;a<t;a+=i)r=hl(a,s[a],s[a+1],r);else for(a=t-i;a>=e;a-=i)r=hl(a,s[a],s[a+1],r);return r&&ta(r,r.next)&&(ts(r),r=r.next),r}function Vi(s,e){if(!s)return s;e||(e=s);let t=s,i;do if(i=!1,!t.steiner&&(ta(t,t.next)||lt(t.prev,t,t.next)===0)){if(ts(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Qn(s,e,t,i,n,a,r){if(!s)return;!r&&a&&c0(s,i,n,a);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,a?t0(s,i,n,a):e0(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),ts(s),s=c.next,o=c.next;continue}if(s=c,s===o){r?r===1?(s=i0(Vi(s),e,t),Qn(s,e,t,i,n,a,2)):r===2&&n0(s,e,t,i,n,a):Qn(Vi(s),e,t,i,n,a,1);break}}}function e0(s){const e=s.prev,t=s,i=s.next;if(lt(e,t,i)>=0)return!1;const n=e.x,a=t.x,r=i.x,o=e.y,l=t.y,c=i.y,u=n<a?n<r?n:r:a<r?a:r,h=o<l?o<c?o:c:l<c?l:c,d=n>a?n>r?n:r:a>r?a:r,f=o>l?o>c?o:c:l>c?l:c;let v=i.next;for(;v!==e;){if(v.x>=u&&v.x<=d&&v.y>=h&&v.y<=f&&xn(n,o,a,l,r,c,v.x,v.y)&&lt(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function t0(s,e,t,i){const n=s.prev,a=s,r=s.next;if(lt(n,a,r)>=0)return!1;const o=n.x,l=a.x,c=r.x,u=n.y,h=a.y,d=r.y,f=o<l?o<c?o:c:l<c?l:c,v=u<h?u<d?u:d:h<d?h:d,_=o>l?o>c?o:c:l>c?l:c,m=u>h?u>d?u:d:h>d?h:d,p=nr(f,v,e,t,i),y=nr(_,m,e,t,i);let g=s.prevZ,b=s.nextZ;for(;g&&g.z>=p&&b&&b.z<=y;){if(g.x>=f&&g.x<=_&&g.y>=v&&g.y<=m&&g!==n&&g!==r&&xn(o,u,l,h,c,d,g.x,g.y)&&lt(g.prev,g,g.next)>=0||(g=g.prevZ,b.x>=f&&b.x<=_&&b.y>=v&&b.y<=m&&b!==n&&b!==r&&xn(o,u,l,h,c,d,b.x,b.y)&&lt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;g&&g.z>=p;){if(g.x>=f&&g.x<=_&&g.y>=v&&g.y<=m&&g!==n&&g!==r&&xn(o,u,l,h,c,d,g.x,g.y)&&lt(g.prev,g,g.next)>=0)return!1;g=g.prevZ}for(;b&&b.z<=y;){if(b.x>=f&&b.x<=_&&b.y>=v&&b.y<=m&&b!==n&&b!==r&&xn(o,u,l,h,c,d,b.x,b.y)&&lt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function i0(s,e,t){let i=s;do{const n=i.prev,a=i.next.next;!ta(n,a)&&nc(n,i,i.next,a)&&es(n,a)&&es(a,n)&&(e.push(n.i/t|0),e.push(i.i/t|0),e.push(a.i/t|0),ts(i),ts(i.next),i=s=a),i=i.next}while(i!==s);return Vi(i)}function n0(s,e,t,i,n,a){let r=s;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&f0(r,o)){let l=sc(r,o);r=Vi(r,r.next),l=Vi(l,l.next),Qn(r,e,t,i,n,a,0),Qn(l,e,t,i,n,a,0);return}o=o.next}r=r.next}while(r!==s)}function s0(s,e,t,i){const n=[];let a,r,o,l,c;for(a=0,r=e.length;a<r;a++)o=e[a]*i,l=a<r-1?e[a+1]*i:s.length,c=ic(s,o,l,i,!1),c===c.next&&(c.steiner=!0),n.push(h0(c));for(n.sort(a0),a=0;a<n.length;a++)t=r0(n[a],t);return t}function a0(s,e){return s.x-e.x}function r0(s,e){const t=o0(s,e);if(!t)return e;const i=sc(t,s);return Vi(i,i.next),Vi(t,t.next)}function o0(s,e){let t=e,i=-1/0,n;const a=s.x,r=s.y;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=a&&d>i&&(i=d,n=t.x<t.next.x?t:t.next,d===a))return n}t=t.next}while(t!==e);if(!n)return null;const o=n,l=n.x,c=n.y;let u=1/0,h;t=n;do a>=t.x&&t.x>=l&&a!==t.x&&xn(r<c?a:i,r,l,c,r<c?i:a,r,t.x,t.y)&&(h=Math.abs(r-t.y)/(a-t.x),es(t,s)&&(h<u||h===u&&(t.x>n.x||t.x===n.x&&l0(n,t)))&&(n=t,u=h)),t=t.next;while(t!==o);return n}function l0(s,e){return lt(s.prev,s,e.prev)<0&&lt(e.next,s,s.next)<0}function c0(s,e,t,i){let n=s;do n.z===0&&(n.z=nr(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,u0(n)}function u0(s){let e,t,i,n,a,r,o,l,c=1;do{for(t=s,s=null,a=null,r=0;t;){for(r++,i=t,o=0,e=0;e<c&&(o++,i=i.nextZ,!!i);e++);for(l=c;o>0||l>0&&i;)o!==0&&(l===0||!i||t.z<=i.z)?(n=t,t=t.nextZ,o--):(n=i,i=i.nextZ,l--),a?a.nextZ=n:s=n,n.prevZ=a,a=n;t=i}a.nextZ=null,c*=2}while(r>1);return s}function nr(s,e,t,i,n){return s=(s-t)*n|0,e=(e-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function h0(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function xn(s,e,t,i,n,a,r,o){return(n-r)*(e-o)>=(s-r)*(a-o)&&(s-r)*(i-o)>=(t-r)*(e-o)&&(t-r)*(a-o)>=(n-r)*(i-o)}function f0(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!d0(s,e)&&(es(s,e)&&es(e,s)&&p0(s,e)&&(lt(s.prev,s,e.prev)||lt(s,e.prev,e))||ta(s,e)&&lt(s.prev,s,s.next)>0&&lt(e.prev,e,e.next)>0)}function lt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function ta(s,e){return s.x===e.x&&s.y===e.y}function nc(s,e,t,i){const n=Bs(lt(s,e,t)),a=Bs(lt(s,e,i)),r=Bs(lt(t,i,s)),o=Bs(lt(t,i,e));return!!(n!==a&&r!==o||n===0&&zs(s,t,e)||a===0&&zs(s,i,e)||r===0&&zs(t,s,i)||o===0&&zs(t,e,i))}function zs(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Bs(s){return s>0?1:s<0?-1:0}function d0(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&nc(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function es(s,e){return lt(s.prev,s,s.next)<0?lt(s,e,s.next)>=0&&lt(s,s.prev,e)>=0:lt(s,e,s.prev)<0||lt(s,s.next,e)<0}function p0(s,e){let t=s,i=!1;const n=(s.x+e.x)/2,a=(s.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&n<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==s);return i}function sc(s,e){const t=new sr(s.i,s.x,s.y),i=new sr(e.i,e.x,e.y),n=s.next,a=e.prev;return s.next=e,e.prev=s,t.next=n,n.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function hl(s,e,t,i){const n=new sr(s,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function ts(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function sr(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function m0(s,e,t,i){let n=0;for(let a=e,r=t-i;a<t;a+=i)n+=(s[r]-s[a])*(s[a+1]+s[r+1]),r=a;return n}class Zn{static area(e){const t=e.length;let i=0;for(let n=t-1,a=0;a<t;n=a++)i+=e[n].x*e[a].y-e[a].x*e[n].y;return i*.5}static isClockWise(e){return Zn.area(e)<0}static triangulateShape(e,t){const i=[],n=[],a=[];fl(e),dl(i,e);let r=e.length;t.forEach(fl);for(let l=0;l<t.length;l++)n.push(r),r+=t[l].length,dl(i,t[l]);const o=Qm.triangulate(i,n);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}}function fl(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function dl(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class _n extends gr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,a,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new _n(e.radius,e.detail)}}class xr extends Ze{constructor(e=.5,t=1,i=32,n=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:a,thetaLength:r},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],u=[];let h=e;const d=(t-e)/n,f=new A,v=new ne;for(let _=0;_<=n;_++){for(let m=0;m<=i;m++){const p=a+m/i*r;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),v.x=(f.x/t+1)/2,v.y=(f.y/t+1)/2,u.push(v.x,v.y)}h+=d}for(let _=0;_<n;_++){const m=_*(i+1);for(let p=0;p<i;p++){const y=p+m,g=y,b=y+i+1,P=y+i+2,C=y+1;o.push(g,b,C),o.push(b,P,C)}}this.setIndex(o),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(c,3)),this.setAttribute("uv",new Ne(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ks extends Ze{constructor(e=new ir([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],n=[],a=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new Ne(n,3)),this.setAttribute("normal",new Ne(a,3)),this.setAttribute("uv",new Ne(r,2));function c(u){const h=n.length/3,d=u.extractPoints(t);let f=d.shape;const v=d.holes;Zn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=v.length;m<p;m++){const y=v[m];Zn.isClockWise(y)===!0&&(v[m]=y.reverse())}const _=Zn.triangulateShape(f,v);for(let m=0,p=v.length;m<p;m++){const y=v[m];f=f.concat(y)}for(let m=0,p=f.length;m<p;m++){const y=f[m];n.push(y.x,y.y,0),a.push(0,0,1),r.push(y.x,y.y)}for(let m=0,p=_.length;m<p;m++){const y=_[m],g=y[0]+h,b=y[1]+h,P=y[2]+h;i.push(g,b,P),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return v0(t,e)}static fromJSON(e,t){const i=[];for(let n=0,a=e.shapes.length;n<a;n++){const r=t[e.shapes[n]];i.push(r)}return new Ks(i,e.curveSegments)}}function v0(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,i=s.length;t<i;t++){const n=s[t];e.shapes.push(n.uuid)}else e.shapes.push(s.uuid);return e}class yn extends Ze{constructor(e=1,t=32,i=16,n=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const u=[],h=new A,d=new A,f=[],v=[],_=[],m=[];for(let p=0;p<=i;p++){const y=[],g=p/i;let b=0;p===0&&r===0?b=.5/t:p===i&&l===Math.PI&&(b=-.5/t);for(let P=0;P<=t;P++){const C=P/t;h.x=-e*Math.cos(n+C*a)*Math.sin(r+g*o),h.y=e*Math.cos(r+g*o),h.z=e*Math.sin(n+C*a)*Math.sin(r+g*o),v.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(C+b,1-g),y.push(c++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const g=u[p][y+1],b=u[p][y],P=u[p+1][y],C=u[p+1][y+1];(p!==0||r>0)&&f.push(g,b,C),(p!==i-1||l<Math.PI)&&f.push(b,P,C)}this.setIndex(f),this.setAttribute("position",new Ne(v,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class js extends Ze{constructor(e=1,t=.4,i=12,n=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:a},i=Math.floor(i),n=Math.floor(n);const r=[],o=[],l=[],c=[],u=new A,h=new A,d=new A;for(let f=0;f<=i;f++)for(let v=0;v<=n;v++){const _=v/n*a,m=f/i*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(v/n),c.push(f/i)}for(let f=1;f<=i;f++)for(let v=1;v<=n;v++){const _=(n+1)*f+v-1,m=(n+1)*(f-1)+v-1,p=(n+1)*(f-1)+v,y=(n+1)*f+v;r.push(_,m,y),r.push(m,p,y)}this.setIndex(r),this.setAttribute("position",new Ne(o,3)),this.setAttribute("normal",new Ne(l,3)),this.setAttribute("uv",new Ne(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}const pl={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class g0{constructor(e,t,i){const n=this;let a=!1,r=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){o++,a===!1&&n.onStart!==void 0&&n.onStart(u,r,o),a=!0},this.itemEnd=function(u){r++,n.onProgress!==void 0&&n.onProgress(u,r,o),r===o&&(a=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(u){n.onError!==void 0&&n.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],v=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return v}return null}}}const x0=new g0;class _r{constructor(e){this.manager=e!==void 0?e:x0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,a){i.load(e,n,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}_r.DEFAULT_MATERIAL_NAME="__DEFAULT";class ac extends _r{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,r=pl.get(e);if(r!==void 0)return a.manager.itemStart(e),setTimeout(function(){t&&t(r),a.manager.itemEnd(e)},0),r;const o=$n("img");function l(){u(),pl.add(e,this),t&&t(this),a.manager.itemEnd(e)}function c(h){u(),n&&n(h),a.manager.itemError(e),a.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),a.manager.itemStart(e),o.src=e,o}}class pn extends _r{constructor(e){super(e)}load(e,t,i,n){const a=new Rt,r=new ac(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},i,n),a}}class yr extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new he(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Ha=new Qe,ml=new A,vl=new A;class rc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hr,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ml.setFromMatrixPosition(e.matrixWorld),t.position.copy(ml),vl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vl),t.updateMatrixWorld(),Ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ha),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const gl=new Qe,Hn=new A,ka=new A;class _0 extends rc{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,a=e.distance||i.far;a!==i.far&&(i.far=a,i.updateProjectionMatrix()),Hn.setFromMatrixPosition(e.matrixWorld),i.position.copy(Hn),ka.copy(i.position),ka.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ka),i.updateMatrixWorld(),n.makeTranslation(-Hn.x,-Hn.y,-Hn.z),gl.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gl)}}class y0 extends yr{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new _0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class M0 extends rc{constructor(){super(new Hl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class S0 extends yr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new M0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class b0 extends yr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rr}}));typeof window<"u"&&(window.__THREE__||(window.__THREE__=rr));const Wa={1:[[2282478,8490232],[3462041,366185],[16494871,14753096],[16020150,9133302],[6334975,11032055],[16436245,15381256],[4906624,959977],[9741240,4674921],[16281969,10033947],[12616956,4988309],[3718648,223649],[16486972,12730636],[10741301,5078031],[15235577,8788367]],2:[[1357990,1013358],[6514417,4405450],[16007006,12456508],[11032055,8266446],[8702998,5078031],[959977,223649],[16096779,11817737],[1096065,292951],[15485081,12458077],[9133302,7153881],[15381256,10576391],[440020,561586]],3:[[3900150,1981066],[1096065,413243],[9133302,4988309],[16347926,8138002],[440020,1461859],[14239471,7346805],[15381256,7421714],[1357990,1265226],[16007006,8917815],[6514417,3223169]],4:[[16777215,0],[2282478,1973067],[16020150,4850766],[16569165,4528643],[7268279,142370],[9684477,1516884],[16557477,4524554],[12891645,3018853]],5:[[16766720,12092939],[16738740,13047173],[65535,35723],[8190976,2263842],[16753920,16729344],[12211667,4915330],[64154,3050327],[16716947,9109504],[2003199,139],[16775885,9142272]],6:[[65280,13056],[65535,51],[16711935,3342387],[13434624,3355392],[65484,13107],[16724838,3342336],[3394815,4403],[13369599,1114163],[6750003,1127168],[16763904,3346688]],7:[[16777215,16766720],[16729344,9109504],[65535,255],[16716947,4915330],[8388352,25600],[16711935,9055202],[2003199,1644912],[16737095,8388608],[64154,32896],[16775885,16747520]],8:[[16737095,4620980],[16766720,9055202],[64154,16716947],[16729344,3050327],[65535,13458524],[16711935,8087790],[3329330,16747520],[52945,9109504],[16758465,205],[11403055,4915330]],9:[[9109504,0],[3100495,16747520],[1644912,16777215],[4915330,3329330],[5597999,16711935],[8388608,65535],[128,16766720],[3050327,16716947],[4734347,16729344],[9127187,64154]],10:[[65280,16711935],[65535,16729344],[16766720,255],[16716947,3329330],[8388352,9055202],[16747520,52945],[64154,16711680],[2003199,16758465],[16711935,65280],[16776960,9109504]],11:[[16753920,9109504],[65535,139],[16716947,4915330],[3329330,25600],[16766720,3100495],[16711935,1644912],[64154,32896],[16729344,9127187],[2003199,0],[16776960,12092939]],12:[[65280,0],[16711935,0],[65535,0],[16776960,0],[16711680,0],[255,0],[16753920,0],[2003199,0],[3329330,0],[16716947,0]],13:[[15132410,4915330],[16758465,9109504],[14745599,32896],[16775885,9127187],[14524637,4734347],[10025880,3050327],[8900346,1644912],[16767673,13789470],[15761536,8388608],[2142890,139]],14:[[16766720,0],[65535,128],[16711935,4915330],[65280,25600],[16729344,9109504],[2003199,1644912],[16716947,8388736],[8388352,3050327],[64154,32896],[16753920,9127187]],15:[[16711935,65535],[16716947,2003199],[16753920,8388736],[65280,16711935],[16776960,16729344],[65535,4915330],[16738740,52945],[8388352,16716947],[64154,16747520],[2003199,16711680]],16:[[12632256,0],[8421504,65280],[11119017,65535],[6908265,16711935],[7833753,16753920],[7372944,16716947],[3100495,3329330],[0,16711680],[14474460,255],[13882323,9109504]],17:[[16711935,65535],[16716947,1644912],[65280,25600],[16753920,9109504],[65535,128],[16711680,9127187],[3329330,3050327],[2003199,4915330],[16776960,13789470],[16738740,8388736]],18:[[16711935,65535],[16716947,16766720],[16711680,9109504],[64154,205],[9699539,3329330],[49151,16711935],[16777215,8900346],[4915330,16738740],[16729344,16776960],[1644912,11403055]],19:[[11032055,3900150],[15485081,6514417],[1357990,959977],[16007006,9133302],[15381256,1096065],[440020,3900150]],20:[[16007006,12456508],[3900150,1981066],[1096065,413243],[9133302,4988309],[16347926,8138002],[15381256,7421714]],21:[[65535,16711935],[3900150,1981066],[16766720,12092939],[16729344,9109504],[15485081,9133302],[440020,1920728]],22:[[65535,16711935],[3900150,1981066],[16766720,12092939],[16729344,9109504],[15485081,9133302],[440020,1920728],[16766720,1710618],[58879,51],[16711935,16747520],[65407,8704],[12632256,9109504],[14745599,205],[16776960,16729344],[9699539,16716947],[16738740,9055202],[16766720,65535],[4286945,16777215],[2142890,12632256],[3800852,16711935],[16777215,16716947],[0,14423100],[4915330,657930],[16753920,16766720],[16729344,16766720],[49151,1644912],[16716947,65280],[11403055,8388736],[9055202,0],[16777215,14745599],[16766720,16777215]],23:[[16711935,65535],[16766720,12092939],[16729344,9109504],[15485081,9133302]],24:[[65535,1981066],[16766720,12092939],[3800852,25600],[16729344,9109504],[16777215,12632256]],25:[[6334975,11032055]]},w0=`
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    // Bypass camera matrices to draw a perfect full-screen quad behind other elements
    gl_Position = vec4(position.xy, 0.9, 1.0);
}
`,T0=s=>s===1?`
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
        `:s===2?`
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
        `:s===3?`
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
            vec2 p_i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix( mix( hash( p_i + vec2(0.0,0.0) ), hash( p_i + vec2(1.0,0.0) ), u.x),
                        mix( hash( p_i + vec2(0.0,1.0) ), hash( p_i + vec2(1.0,1.0) ), u.x), u.y);
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
        `:s===4?`
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
        `:s===5?`
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
        `:s===6?`
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
        `:s===7?`
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
            float t = uTime * intMod;
            
            float r = length(p);
            float a = atan(p.y, p.x);
            
            // Starburst rays
            float rays = sin(a * (12.0 + var * 4.0) + t * 2.0) * cos(a * (7.0 + var * 3.0) - t);
            
            // Pulsing core
            float core = 0.08 / (r + 0.01);
            
            // Ejection rings
            float rings = sin(r * (20.0 + var * 5.0) - t * 5.0);
            
            float burst = (rays * 0.5 + 0.5) * smoothstep(1.0, 0.0, r);
            float intensity = core + burst * 2.0 + rings * 0.3 * smoothstep(0.8, 0.0, r);
            
            vec3 col = mix(uColor2, uColor1, burst) * intensity * pow(intMod, 1.2) * 1.2;
            
            // Vignette
            col *= smoothstep(1.5, 0.2, r);
            
            gl_FragColor = vec4(col, 1.0);
        }
        `:s===8?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float noise(vec2 p) {
            vec2 p_i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(p_i+vec2(0.0,0.0)), hash(p_i+vec2(1.0,0.0)), u.x),
                       mix(hash(p_i+vec2(0.0,1.0)), hash(p_i+vec2(1.0,1.0)), u.x), u.y);
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
        `:s===9?`
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
        `:s===10?`
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
        `:s===11?`
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
        `:s===12?`
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
        `:s===13?`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uIntensity;
        uniform float uVariation;
        uniform float uAspect;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float noise(vec2 p) {
            vec2 p_i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(p_i+vec2(0.0,0.0)), hash(p_i+vec2(1.0,0.0)), u.x),
                       mix(hash(p_i+vec2(0.0,1.0)), hash(p_i+vec2(1.0,1.0)), u.x), u.y);
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
        `:s===14?`
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
        `:s===15?`
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
        `:s===16?`
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
        `:s===17?`
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
                // PLATONIC SOLIDS (Octahedron)
                p.yz *= rot(t*0.5);
                p.xz *= rot(t*0.3);
                p = abs(p);
                d = (p.x + p.y + p.z - 0.6) * 0.57735027;
                // Add a wireframe effect by subtracting smaller octahedrons
                d = max(d, -(p.x + p.y + p.z - 0.5) * 0.57735027);
#elif VARIATION == 1
                // TESSERACT (Hypercube projection)
                p.xy *= rot(t*0.2);
                p.xz *= rot(t*0.4);
                vec3 q = abs(p) - 0.4;
                float outer = sdBox(q, vec3(0.05));
                vec3 q2 = abs(p) - 0.2;
                float inner = sdBox(q2, vec3(0.05));
                // Connecting struts
                float struts = min(length(p.xy), min(length(p.yz), length(p.zx))) - 0.05;
                d = min(min(outer, inner), struts);
#elif VARIATION == 2
                // SPHERE
                d = sdSphere(p, 0.5);
                // Pulse it
                d -= sin(t * 5.0) * 0.05;
#elif VARIATION == 3
                // TORUS
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.3);
                d = sdTorus(p, vec2(0.5, 0.2));
#elif VARIATION == 4
                // KNOT (Torus Knot)
                p.xy *= rot(t*0.2);
                float a = atan(p.y, p.x);
                float r = length(p.xy);
                vec3 p2 = vec3(r - 0.5, p.z, 0.0);
                p2.xy *= rot(a * 3.0 + t);
                d = length(vec2(length(p2.xy) - 0.15, p2.z)) - 0.05;
#elif VARIATION == 5
                // MOBIUS STRIP
                p.xz *= rot(t*0.5);
                float a = atan(p.z, p.x);
                float r = length(p.xz);
                vec2 q = vec2(r - 0.5, p.y);
                q *= rot(a * 0.5);
                d = sdBox(vec3(q, 0.0), vec3(0.2, 0.02, 0.1));
#elif VARIATION == 6
                // KLEIN BOTTLE (Simplified 3D projection)
                p.yz *= rot(t*0.5);
                p.xz *= rot(t*0.5);
                float r = length(p.xy);
                float a = atan(p.y, p.x);
                vec2 q = vec2(r - 0.4 - sin(a)*0.2, p.z);
                q *= rot(a * 0.5);
                d = sdTorus(vec3(q.x, p.z, 0.0), vec2(0.2, 0.05));
                d = min(d, sdSphere(p, 0.2)); // Intersecting core
#elif VARIATION == 7
                // CYLINDER
                p.xz *= rot(t*0.5);
                p.yz *= rot(t*0.2);
                vec2 q = abs(vec2(length(p.xz), p.y)) - vec2(0.3, 0.5);
                d = min(max(q.x, q.y), 0.0) + length(max(q, 0.0));
#elif VARIATION == 8
                // CONE
                p.yz *= rot(t*0.5);
                p.xz *= rot(t*0.3);
                vec2 c = normalize(vec2(0.5, 0.5));
                float h = 0.5;
                vec2 q = vec2(length(p.xz), p.y);
                float d1 = -q.y - h;
                float d2 = max(dot(q, c), q.y);
                d = length(max(vec2(d1, d2), 0.0)) + min(max(d1, d2), 0.);
                // Add a small base thickness
                d = max(d, -p.y - 0.5);
                d = max(d, p.y - 0.5);
#else
                // MW LOTUS (Ethereal 3D Lotus)
                p.xz *= rot(t*0.3);
                float a = atan(p.z, p.x);
                float r_lotus = length(p.xz);
                float petals = sin(a * 6.0 + t*2.0);
                vec3 q = p;
                q.y += r_lotus*r_lotus*1.5; // fold upwards
                d = length(q) - 0.4 - petals*0.1;
                d = max(d, -sdSphere(p - vec3(0,0.5,0), 0.6));
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
        `:s===18?`
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
                // convert to polar coordinates
                float rSafe = max(r, 0.00001);
                float theta = acos(z.z/rSafe);
                float phi = atan(z.y,z.x);
                dr = pow(r, Power-1.0)*Power*dr + 1.0;
                float zr = pow(r,Power);
                theta = theta*Power;
                phi = phi*Power;
                z = zr*vec3(sin(theta)*cos(phi), sin(phi)*sin(theta), cos(theta));
                z += p;
            }
            return 0.5*log(max(r, 0.00001))*r/dr;
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
        `:s===0?`
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
        `:s===19?`
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
            vec3 p_i = floor(x);
            vec3 f = fract(x);
            f = f*f*(3.0-2.0*f);
            return mix(mix(mix( hash(p_i+vec3(0,0,0)), hash(p_i+vec3(1,0,0)),f.x),
                           mix( hash(p_i+vec3(0,1,0)), hash(p_i+vec3(1,1,0)),f.x),f.y),
                       mix(mix( hash(p_i+vec3(0,0,1)), hash(p_i+vec3(1,0,1)),f.x),
                           mix( hash(p_i+vec3(0,1,1)), hash(p_i+vec3(1,1,1)),f.x),f.y),f.z);
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
        `:s===20?`
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
                // Fibonacci Spiral SDF
                float r = length(p);
                float a = atan(p.y, p.x);
                float phi = (1.0 + sqrt(5.0)) / 2.0; // Golden ratio
                float fib = a * phi + log(max(r, 0.00001)) * 10.0;
                float waves = sin(fib * 2.0 - t * 3.0);
                float node = smoothstep(0.1, 0.0, abs(waves));
                float v = sin(r * 20.0 - t * 2.0) * cos(a * 10.0 + t);
                pattern = smoothstep(0.05, 0.0, abs(v)) * node + node * 0.5;
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
        `:s===21?`
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
        `:s===22?`
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
            vec2 p_i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(p_i + vec2(0.0,0.0)), hash(p_i + vec2(1.0,0.0)), u.x),
                       mix(hash(p_i + vec2(0.0,1.0)), hash(p_i + vec2(1.0,1.0)), u.x), u.y);
        }

        float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int k = 0; k < 4; ++k) {
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
            
            vec3 baseTint = mix(activeColor1, activeColor2, luma);
            vec3 targetColor = baseTint * (luma * 2.5);
            float blendFactor = 0.85;
            vec3 tintedTex = mix(texColor.rgb, targetColor, blendFactor);
            vec3 finalColor = tintedTex * max(0.0, 1.0 - depletion * 0.5 * uIntensity);
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
            
            vec3 baseTint = mix(activeColor1, activeColor2, luma);
            vec3 targetColor = baseTint * (luma * 2.5);
            float blendFactor = 0.85;
            vec3 tintedTex = mix(texColor.rgb, targetColor, blendFactor);
            vec3 finalColor = tintedTex * max(0.0, 1.0 + fluidAccumulation * 1.5 * uIntensity);
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
            
            vec3 baseTint = mix(activeColor1, activeColor2, luma);
            vec3 targetColor = baseTint * (luma * 2.5);
            float blendFactor = 0.85;
            vec3 tintedTex = mix(texColor.rgb, targetColor, blendFactor);
            vec3 finalColor = tintedTex * max(0.0, 1.0 - swarmDepletion * 0.6 * uIntensity);
            customColor = mix(activeColor1, activeColor2, swarmAccumulation);
            finalColor += customColor * swarmAccumulation * 5.0 * luma * (1.0 + highPulse * 1.5);
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
            
            vec3 finalColor = mix(texColor.rgb * 0.1, glowCol * 1.5, 0.85);
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
            vec3 finalColor = texColor.rgb * (1.0 - rayGlow * 0.5 * uIntensity);
            customColor = mix(activeColor1, activeColor2, ringGlow);
            finalColor += customColor * ringGlow * 5.0 * luma * (1.0 + highPulse);
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

            // Apply universal tint using uColor1/uColor2 so color pickers work even at low intensity
            float finalLuma = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
            vec3 globalTint = mix(uColor1, uColor2, finalLuma);
            gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * globalTint * 2.5, 0.5);
        }
        `:s===23?`
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
        uniform sampler2D uTexture;
        uniform float uAlpha;
        uniform float uMouseSync; // Added missing uniform
        
        void main() {
            vec2 uv = vUv;
            
            // Audio react scales
            float lowPulse = uAudioLow * 0.2 * uIntensity;
            float midPulse = uAudioMid * 0.15 * uIntensity;
            float highPulse = uAudioHigh * 0.1 * uIntensity;
            
            // Smooth breathing scale centered on UV
            vec2 centeredUv = uv - 0.5;
            float scale = 1.0 - (lowPulse * 0.3) - (sin(uTime * 0.5) * 0.02 * uIntensity);
            
            // Mouse Sync Parallax Tilt
            if (uMouseSync > 0.5) {
                vec2 mouseDelta = (uMouse - 0.5) * 2.0; // -1 to 1
                // Inverse tilt based on mouse position to create parallax
                centeredUv += mouseDelta * 0.05 * uIntensity;
            }
            
            uv = (centeredUv * scale) + 0.5;
            
            // Ensure UV stays within bounds to prevent wrap-around artifacting
            if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
                gl_FragColor = vec4(0.0);
                return;
            }

            vec4 texColor = texture2D(uTexture, uv);
            
            // Preserve pristine aesthetic, only use color1/color2 as a subtle underlying ambient glow
            // based on the image's luminance
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // Add subtle glow behind/on top of the geometry based on beat intensity
            vec3 glowColor = mix(uColor1, uColor2, sin(uTime + luma) * 0.5 + 0.5);
            vec3 finalColor = texColor.rgb + (glowColor * luma * highPulse * 2.0);
            
            // Subtle pulse
            finalColor *= 1.0 + (midPulse * 0.5);
            
            gl_FragColor = vec4(finalColor, texColor.a * uAlpha);
        }
        `:s===24?`
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform vec3 uColor1; // Aura Color
        uniform vec3 uColor2; // Constellation Line Color
        uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;
        uniform sampler2D uTexture;  // Layer 3: Animal Aura
        uniform sampler2D uTexture2; // Layer 1: Background
        uniform sampler2D uTexture3; // Layer 2: Constellation Lines
        uniform float uShowLines;
        uniform float uAlpha;
        uniform float uLayer2Type; // 0=None, 1=Procedural Constellation, 2=Sri Yantra, 3=Metatron's Cube

        // Basic SDF utilities
        float sdCircle(vec2 p, float r) {
            return length(p) - r;
        }
        float sdTriangle(vec2 p, float r) {
            const float k = sqrt(3.0);
            p.x = abs(p.x) - r;
            p.y = p.y + r / k;
            if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
            p.x -= clamp(p.x, -2.0 * r, 0.0);
            return -length(p) * sign(p.y);
        }
        float sdHexagon(vec2 p, float r) {
            const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
            p = abs(p);
            p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
            p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
            return length(p) * sign(p.y);
        }

        
        void main() {
            vec2 uv = vUv;
            
            // Cosmic Intensity Warp for Background
            float audioGlobal = (uAudioLow + uAudioMid + uAudioHigh) * 0.1;
            float warpScale = uIntensity * 0.1 + audioGlobal * 0.5;
            vec2 warp = vec2(sin(uv.y * 10.0 + uTime), cos(uv.x * 10.0 + uTime)) * warpScale;
            vec2 bgUv = uv + warp * 0.5;
            
            // Gentle breathing warp for Aura & Lines
            vec2 gentleWarp = vec2(sin(uv.y * 5.0 + uTime*0.5), cos(uv.x * 5.0 + uTime*0.5)) * (warpScale * 0.15);
            vec2 fgUv = uv + gentleWarp;
            
            // Sample layers
            vec4 bgColor = texture2D(uTexture2, clamp(bgUv, 0.0, 1.0));
            vec4 auraTex = texture2D(uTexture, fgUv);
            
            // Procedural Constellation Overlay (Sparse Lattice & Cutout Blending)
            float d = 0.01; // thicker edge
            float rawLum = dot(auraTex.rgb, vec3(0.333));
            float lumC = smoothstep(0.4, 0.6, rawLum); // Ignore ambient neon fog, only trigger on core animal
            
            float lumN = smoothstep(0.4, 0.6, dot(texture2D(uTexture, fgUv + vec2(0.0, d)).rgb, vec3(0.333)));
            float lumS = smoothstep(0.4, 0.6, dot(texture2D(uTexture, fgUv + vec2(0.0, -d)).rgb, vec3(0.333)));
            float lumE = smoothstep(0.4, 0.6, dot(texture2D(uTexture, fgUv + vec2(d, 0.0)).rgb, vec3(0.333)));
            float lumW = smoothstep(0.4, 0.6, dot(texture2D(uTexture, fgUv + vec2(-d, 0.0)).rgb, vec3(0.333)));
            
            // Perfect clean outline of the animal
            float edge = abs(lumN - lumC) + abs(lumS - lumC) + abs(lumE - lumC) + abs(lumW - lumC);
            edge = smoothstep(0.1, 0.8, edge);
            
            // Cybernetic geometric lattice (Sparse & thick for high visibility)
            vec2 latticeUv = vec2(
                fgUv.x * cos(0.5) - fgUv.y * sin(0.5),
                fgUv.x * sin(0.5) + fgUv.y * cos(0.5)
            ) * 12.0;
            
            float gridX = smoothstep(0.9, 1.0, sin(latticeUv.x));
            float gridY = smoothstep(0.9, 1.0, sin(latticeUv.y));
            float lattice = max(gridX, gridY) * lumC;
            
            // Glowing star nodes at intersections
            float nodes = gridX * gridY * lumC * 3.0; // bright stars
            
            float constellationIntensity = 0.0;
            
            if (uLayer2Type == 1.0) {
                // Combine outline, lattice, and stars
                constellationIntensity = max(edge * 1.5, max(lattice, nodes));
            } else if (uLayer2Type == 2.0) {
                // Sri Yantra (Simplified interlocking triangles)
                vec2 centerP = (uv - 0.5) * 2.0;
                float dTri1 = sdTriangle(centerP * 1.5 + vec2(0.0, -0.2), 0.5);
                float dTri2 = sdTriangle(vec2(centerP.x, -centerP.y) * 1.5 + vec2(0.0, -0.2), 0.5);
                float dTri3 = sdTriangle(centerP * 2.0 + vec2(0.0, -0.1), 0.4);
                float dTri4 = sdTriangle(vec2(centerP.x, -centerP.y) * 2.0 + vec2(0.0, -0.1), 0.4);
                
                float lines = smoothstep(0.02, 0.0, abs(dTri1)) + smoothstep(0.02, 0.0, abs(dTri2)) + 
                              smoothstep(0.02, 0.0, abs(dTri3)) + smoothstep(0.02, 0.0, abs(dTri4));
                float circles = smoothstep(0.02, 0.0, abs(sdCircle(centerP, 0.7))) + smoothstep(0.02, 0.0, abs(sdCircle(centerP, 0.8)));
                constellationIntensity = clamp(lines + circles, 0.0, 1.0);
            } else if (uLayer2Type == 3.0) {
                // Metatron's Cube (Simplified Hexagons and Circles)
                vec2 centerP = (uv - 0.5) * 2.0;
                float hex1 = smoothstep(0.02, 0.0, abs(sdHexagon(centerP, 0.5)));
                float hex2 = smoothstep(0.02, 0.0, abs(sdHexagon(centerP, 0.8)));
                float circle1 = smoothstep(0.03, 0.0, abs(sdCircle(centerP, 0.8)));
                
                // 6 Outer Circles
                float outerCircles = 0.0;
                for (int i = 0; i < 6; i++) {
                    float angle = float(i) * 1.04719755; // PI/3
                    vec2 pos = vec2(cos(angle), sin(angle)) * 0.5;
                    outerCircles += smoothstep(0.02, 0.0, abs(sdCircle(centerP - pos, 0.15)));
                }
                
                constellationIntensity = clamp(hex1 + hex2 + circle1 + outerCircles, 0.0, 1.0);
            }
            
            vec3 proceduralLines = vec3(constellationIntensity) * uColor2 * 2.0;
            
            // Tinting: Boost the original texture and add vibrant color overlay so it's clearly visible
            vec3 tintedAura = auraTex.rgb + (auraTex.rgb * uColor1 * 2.5);
            
            // Phase 3: Frequency-Separated Audio-Reactive Sync
            // Background pulses softly with Bass (uAudioLow)
            vec3 reactiveBg = bgColor.rgb * (1.0 + uAudioLow * 0.4);
            // Animal Aura breathes with Mid-tones (uAudioMid)
            vec3 reactiveAura = tintedAura * (1.0 + uAudioMid * 0.8);
            // Constellation Lines aggressively flash/sparkle with Treble (uAudioHigh)
            vec3 reactiveLines = proceduralLines * (1.0 + max(uAudioHigh, uAudioMid * 0.5) * 3.0) * uShowLines;
            
            // Cutout Blending: Constellation violently overwrites/cuts through the Aura
            vec3 finalColor = reactiveBg + mix(reactiveAura, reactiveLines, clamp(constellationIntensity * uShowLines, 0.0, 1.0));
            
            // Calculate final max alpha to prevent solid black squares
            float maxAlpha = max(bgColor.a, auraTex.a);
            
            gl_FragColor = vec4(finalColor, maxAlpha * uAlpha);
        }
        `:s===25?`
        uniform float uTime;
        uniform float uAspect;
        uniform vec3 uColor1;
        uniform float uIntensity;
        uniform float uAlpha;
        uniform float uObserver; // 0.0 = wave, 1.0 = particle

        varying vec2 vUv;

        // HSV conversion for dynamic complementary colors
        vec3 rgb2hsv(vec3 c) {
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }

        vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uAspect;

            // Compute dynamic perfect complement of uColor1
            vec3 hsv = rgb2hsv(uColor1);
            hsv.x = fract(hsv.x + 0.5); // shift hue 180 degrees
            vec3 dynamicColor2 = hsv2rgb(hsv);

            // Slit positions (bottom of screen)
            vec2 slit1 = vec2(-0.3, -0.8);
            vec2 slit2 = vec2(0.3, -0.8);

            float freq = 40.0;
            float speed = 2.0;
            float t = uTime * speed + uIntensity * 2.0;

            // Wave Function (Unobserved)
            float dist1 = length(uv - slit1);
            float dist2 = length(uv - slit2);
            float wave1 = sin(dist1 * freq - t);
            float wave2 = sin(dist2 * freq - t);
            
            // Constructive / Destructive Interference
            float interference = wave1 + wave2;
            float intensityWave = interference * interference * 0.25; // Normalize 0 to 1
            
            // Attenuate wave intensity by distance and direction (only propagates upward)
            float dirAtten1 = smoothstep(-1.0, 0.2, uv.y - slit1.y);
            float dirAtten2 = smoothstep(-1.0, 0.2, uv.y - slit2.y);
            float waveFalloff = exp(-0.8 * (dist1 + dist2) * 0.5);
            intensityWave *= waveFalloff * ((dirAtten1 + dirAtten2) * 0.5);

            // Particle Collapse (Observed)
            // Particles travel in straight probabilistic paths (Gaussian bands)
            float p1x = (uv.x - slit1.x) * 15.0;
            float particle1 = exp(-(p1x * p1x));
            float p2x = (uv.x - slit2.x) * 15.0;
            float particle2 = exp(-(p2x * p2x));
            float intensityParticle = particle1 + particle2;
            
            // Pulse the particles traveling upward
            float particlePulse1 = sin((uv.y - slit1.y) * 10.0 - t * 2.0) * 0.5 + 0.5;
            float particlePulse2 = sin((uv.y - slit2.y) * 10.0 - t * 2.0) * 0.5 + 0.5;
            intensityParticle *= (particlePulse1 + particlePulse2) * 0.5;
            
            // Attenuate particle intensity by vertical distance
            float particleFalloff = 1.0 - smoothstep(-0.8, 1.2, uv.y);
            intensityParticle *= particleFalloff;
            
            // Smoothly interpolate between Wave and Particle based on uObserver
            float finalIntensity = mix(intensityWave, intensityParticle, uObserver);
            
            // Create glowing slit sources
            float sourceGlow = 0.05 / (length(uv - slit1) + 0.01) + 0.05 / (length(uv - slit2) + 0.01);
            finalIntensity += sourceGlow;

            // Add audio reactive glow
            finalIntensity += uIntensity * 0.3 * exp(-length(uv) * 2.0);

            // Color mapping: interpolate from background (black) to Color1, then Complementary Color for high intensity
            vec3 col = mix(vec3(0.0), uColor1, smoothstep(0.0, 0.5, finalIntensity));
            col = mix(col, dynamicColor2, smoothstep(0.4, 1.0, finalIntensity));

            gl_FragColor = vec4(col, finalIntensity * uAlpha);
        }
        `:"void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }";class C0{constructor(e){this.group=e,this.meshes=[],this.activeClassId=22,this.activeVariationId=0,this.materials={},this.rainbowMode=!1;const t=new Om(new Uint8Array([0,0,0,0]),1,1,qt);t.needsUpdate=!0,this.dummyTexture=t;const i=new Jt(2,2);for(let n=1;n<=25;n++){let r=T0(n);if(n<=16&&(r=r.replace("uniform float uIntensity;",`uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;`),r=r.replace("float intMod = max(0.1, uIntensity);","float intMod = max(0.1, uIntensity * (1.0 + uAudioLow * 3.0 + uAudioMid * 1.5));")),!r.includes("uniform float uMouseSync;")){let c="";/uniform\s+vec2\s+uMouse\s*;/.test(r)||(c+=`uniform vec2 uMouse;
        `),c+=`uniform float uMouseSync;
        void main() {`,r=r.replace("void main() {",c)}n<=21&&(r.includes("vec2 p = (vUv - 0.5) * 2.0;")?r=r.replace("vec2 p = (vUv - 0.5) * 2.0;",`vec2 p = (vUv - 0.5) * 2.0;
            p -= uMouse * uMouseSync * 0.5;`):r.includes("vec2 uv = (vUv - 0.5) * 2.0;")?r=r.replace("vec2 uv = (vUv - 0.5) * 2.0;",`vec2 uv = (vUv - 0.5) * 2.0;
            uv -= uMouse * uMouseSync * 0.5;`):r.includes("vec2 up = (vUv - 0.5) * 2.0;")&&(r=r.replace("vec2 up = (vUv - 0.5) * 2.0;",`vec2 up = (vUv - 0.5) * 2.0;
            up -= uMouse * uMouseSync * 0.5;`)));const o=`
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
                float safe_smoothstep(float edge0, float edge1, float x) {
                    if (edge0 > edge1) {
                        return 1.0 - smoothstep(edge1, edge0, x);
                    }
                    return smoothstep(edge0, edge1, x);
                }
                #define atan safe_atan
                #define normalize safe_normalize
                #define smoothstep safe_smoothstep
                
                ${r}
            `;this.materials[n]=new ft({vertexShader:w0,fragmentShader:o,defines:{VARIATION:0},uniforms:{uTime:{value:0},uAspect:{value:1},uColor1:{value:new he(6334975)},uColor2:{value:new he(11032055)},uIntensity:{value:1},uSpeed:{value:1},uHarmonics:{value:0},uVariation:{value:0},uLayer2Type:{value:0},uAudioLow:{value:0},uAudioMid:{value:0},uAudioHigh:{value:0},uMouse:{value:new ne(0,0)},uAlpha:{value:1},uSpawnTime:{value:0},uTexture:{value:this.dummyTexture},uTexture2:{value:this.dummyTexture},uTexture3:{value:this.dummyTexture},uShowLines:{value:1},uMouseSync:{value:0},uObserver:{value:0}},transparent:!0,depthWrite:!1,depthTest:!1,blending:Ye});const l=new We(i,this.materials[n]);l.visible=!1,l.frustumCulled=!1,l.position.z=-1,this.meshes.push(l),this.group.add(l)}this._boundCymaticsToggleMouseSync=n=>{for(let a=1;a<=25;a++)this.materials[a]&&this.materials[a].uniforms.uMouseSync&&(this.materials[a].uniforms.uMouseSync.value=n.detail.sync)},window.addEventListener("cymaticsToggleMouseSync",this._boundCymaticsToggleMouseSync),setTimeout(()=>{this.setPattern(this.activeClassId,this.activeVariationId)},50)}setPattern(e,t,i=!1){if(this.activeClassId!==e&&this.textureCache){for(const n in this.textureCache)this.textureCache[n]&&this.textureCache[n].dispose();if(this.textureCache={},this.dummyTexture)for(let n=1;n<=25;n++)this.materials[n]&&(this.materials[n].uniforms.uTexture&&(this.materials[n].uniforms.uTexture.value=this.dummyTexture),this.materials[n].uniforms.uTexture2&&(this.materials[n].uniforms.uTexture2.value=this.dummyTexture),this.materials[n].uniforms.uTexture3&&(this.materials[n].uniforms.uTexture3.value=this.dummyTexture))}if(this.activeClassId=e,this.activeVariationId=t,this.meshes.forEach((n,a)=>{n.visible=a+1===e,a+1===25?(n.rotation.x=-Math.PI/3,n.position.y=-2,n.position.z=-10):(n.rotation.x=0,n.position.y=0,n.position.z=-1)}),this.materials[e]){this.materials[e].uniforms.uVariation.value=t;let n=t;if(e===22&&(n=t%14),e>=17&&e<=23&&this.materials[e].defines.VARIATION!==n&&(this._shaderCompileTimeout&&clearTimeout(this._shaderCompileTimeout),this._shaderCompileTimeout=setTimeout(()=>{this.activeVariationId===t&&this.activeClassId===e&&(this.materials[e].defines.VARIATION=n,this.materials[e].needsUpdate=!0,this.materials[e].uniforms.uSpawnTime&&(this.materials[e].uniforms.uSpawnTime.value=performance.now()*.001%(2e3*Math.PI)))},300)),!i&&Wa[e]&&Wa[e][t]){const a=Wa[e][t];this.materials[e].uniforms.uColor1.value.setHex(a[0]),this.materials[e].uniforms.uColor2.value.setHex(a[1]);try{window.dispatchEvent(new CustomEvent("cymaticColorSync",{detail:{classId:e,color1:"#"+a[0].toString(16).padStart(6,"0"),color2:"#"+a[1].toString(16).padStart(6,"0")}}))}catch{}}if(e===22){const a=["binaural-assets/images/cymatics/cymatics_fractal_heart_1779756441610.png","binaural-assets/images/cymatics/cymatics_fluid_sdf_1779756501734.png","binaural-assets/images/cymatics/cymatics_particle_swarm_1779756471939.png","binaural-assets/images/cymatics/cymatics_quantum_topology_1779756531135.png","binaural-assets/images/cymatics/ai_cymatic_15_1779566362935.png","binaural-assets/images/cymatics/ai_cymatic_16_1779566377245.png","binaural-assets/images/cymatics/cymatic_sacred_gold_obsidian.png","binaural-assets/images/cymatics/cymatic_biolum_abyssal.png","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/ai_cymatic_2.png","binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/ai_cymatic_4.png","binaural-assets/images/cymatics/ai_cymatic_5.png","binaural-assets/images/cymatics/ai_cymatic_6.png","binaural-assets/images/cymatics/ai_cymatic_7.png","binaural-assets/images/cymatics/ai_cymatic_8.png","binaural-assets/images/cymatics/ai_cymatic_9.png","binaural-assets/images/cymatics/ai_cymatic_10.png","binaural-assets/images/cymatics/ai_cymatic_11.png","binaural-assets/images/cymatics/ai_cymatic_12.png","binaural-assets/images/cymatics/ai_cymatic_13.png","binaural-assets/images/cymatics/ai_cymatic_14.png","binaural-assets/images/cymatics/ai_cymatic_15.png","binaural-assets/images/cymatics/ai_cymatic_16.png","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/ai_cymatic_2.png","binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/ai_cymatic_4.png"];a[t]&&(this.textureCache||(this.textureCache={}),this.textureCache[t]?this.materials[e].uniforms.uTexture.value=this.textureCache[t]:new pn().load(a[t],o=>{o.generateMipmaps=!1,o.minFilter=St,this.textureCache[t]=o,this.activeClassId===e&&this.activeVariationId===t&&(this.materials[e].uniforms.uTexture.value=o)}))}else if(e===23){const a=["binaural-assets/images/cymatics/ai_cymatic_5.png","binaural-assets/images/cymatics/ai_cymatic_6.png","binaural-assets/images/cymatics/ai_cymatic_7.png","binaural-assets/images/cymatics/ai_cymatic_8.png"];if(a[t]){this.textureCache||(this.textureCache={});const r="c23_"+t;this.textureCache[r]?this.materials[e].uniforms.uTexture.value=this.textureCache[r]:new pn().load(a[t],l=>{l.generateMipmaps=!1,l.minFilter=St,l.wrapS=Ni,l.wrapT=Ni,this.textureCache[r]=l,this.activeClassId===e&&this.activeVariationId===t&&(this.materials[e].uniforms.uTexture.value=l)})}}else if(e===24){const a=["binaural-assets/images/cymatics/ai_cymatic_9.png","binaural-assets/images/cymatics/ai_cymatic_10.png","binaural-assets/images/cymatics/ai_cymatic_11.png","binaural-assets/images/cymatics/ai_cymatic_12.png","binaural-assets/images/cymatics/ai_cymatic_13.png","binaural-assets/images/cymatics/ai_cymatic_14.png","binaural-assets/images/cymatics/ai_cymatic_15.png","binaural-assets/images/cymatics/ai_cymatic_16.png","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/constellations/aura_shark_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_2.png","binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/ai_cymatic_4.png","binaural-assets/images/cymatics/constellations/aura_salmon_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_5.png","binaural-assets/images/cymatics/ai_cymatic_6.png","binaural-assets/images/cymatics/constellations/aura_leopard_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_7.png","binaural-assets/images/cymatics/ai_cymatic_8.png","binaural-assets/images/cymatics/ai_cymatic_9.png","binaural-assets/images/cymatics/constellations/aura_koala_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_10.png","binaural-assets/images/cymatics/ai_cymatic_11.png","binaural-assets/images/cymatics/ai_cymatic_12.png","binaural-assets/images/cymatics/constellations/aura_lizard_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_13.png","binaural-assets/images/cymatics/ai_cymatic_14.png","binaural-assets/images/cymatics/ai_cymatic_15.png","binaural-assets/images/cymatics/ai_cymatic_16.png","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/ai_cymatic_2.png"],r=["binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/ai_cymatic_4.png","binaural-assets/images/cymatics/ai_cymatic_5.png"],o=["binaural-assets/images/cymatics/ai_cymatic_6.png","binaural-assets/images/cymatics/ai_cymatic_7.png","binaural-assets/images/cymatics/ai_cymatic_8.png","binaural-assets/images/cymatics/ai_cymatic_9.png","binaural-assets/images/cymatics/ai_cymatic_10.png","binaural-assets/images/cymatics/ai_cymatic_11.png","binaural-assets/images/cymatics/constellations/horse_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_12.png","binaural-assets/images/cymatics/constellations/cat_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_13.png","binaural-assets/images/cymatics/constellations/shark_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_14.png","binaural-assets/images/cymatics/constellations/orca_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_15.png","binaural-assets/images/cymatics/constellations/salmon_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_16.png","binaural-assets/images/cymatics/constellations/alligator_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/constellations/panther_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/constellations/mongoose_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_2.png","binaural-assets/images/cymatics/constellations/panda_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/constellations/monkey_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_4.png","binaural-assets/images/cymatics/constellations/dog_constellation_dummy.webp"];let l=this.activeAuraId!==void 0?this.activeAuraId:t;if(a[l]){const h="c24_aura_"+l;this.textureCache||(this.textureCache={}),this.textureCache[h]?this.materials[e].uniforms.uTexture.value=this.textureCache[h]:new pn().load(a[l],f=>{f.generateMipmaps=!1,f.minFilter=St,this.textureCache[h]=f;let v=this.activeAuraId!==void 0?this.activeAuraId:this.activeVariationId;this.activeClassId===e&&v===l&&(this.materials[e].uniforms.uTexture.value=f)})}let c=this.activeLinesId!==void 0?this.activeLinesId:l;if(o[c]){const h="c24_lines_"+c;this.textureCache||(this.textureCache={}),this.textureCache[h]?this.materials[e].uniforms.uTexture3.value=this.textureCache[h]:new pn().load(o[c],f=>{f.generateMipmaps=!1,f.minFilter=St,this.textureCache[h]=f;let v=this.activeLinesId!==void 0?this.activeLinesId:this.activeAuraId!==void 0?this.activeAuraId:this.activeVariationId;this.activeClassId===e&&v===c&&(this.materials[e].uniforms.uTexture3.value=f)})}else this.materials[e].uniforms.uTexture3.value=this.dummyTexture;let u=this.activeBackgroundId||0;if(r[u]){const h="c24_bg_"+u;this.textureCache||(this.textureCache={}),this.textureCache[h]?this.materials[e].uniforms.uTexture2.value=this.textureCache[h]:new pn().load(r[u],f=>{f.generateMipmaps=!1,f.minFilter=St,f.wrapS=Ni,f.wrapT=Ni,this.textureCache[h]=f;let v=this.activeBackgroundId||0;this.activeClassId===e&&v===u&&(this.materials[e].uniforms.uTexture2.value=f)})}}this.materials[e]&&this.materials[e].uniforms.uMouseSync&&(this.materials[e].uniforms.uMouseSync.value=window.cymaticsMouseSync||0)}}setConstellationBackground(e){this.activeBackgroundId=e,this.activeClassId===24&&this.setPattern(24,this.activeVariationId,!0)}setConstellationLines(e){this.activeLinesId=e,this.activeClassId===24&&this.setPattern(24,this.activeVariationId,!0)}setConstellationAura(e){this.activeAuraId=e,this.activeClassId===24&&this.setPattern(24,this.activeVariationId,!0)}setConstellationLayer2Type(e){this.setConstellationLines(parseInt(e))}setColor(e,t,i){if(this.materials[e]){const n=t===1?"uColor1":"uColor2";this.materials[e].uniforms[n].value.set(i)}}setParam(e,t,i){this.materials[e]&&(t==="intensity"?this.materials[e].uniforms.uIntensity.value=i:t==="speed"&&this.materials[e].uniforms.uSpeed?this.materials[e].uniforms.uSpeed.value=i:t==="harmonics"&&this.materials[e].uniforms.uHarmonics?this.materials[e].uniforms.uHarmonics.value=i:this.materials[e].uniforms[`u${t.charAt(0).toUpperCase()+t.slice(1)}`]&&(this.materials[e].uniforms[`u${t.charAt(0).toUpperCase()+t.slice(1)}`].value=i))}update(e,t,i){if(this.materials[this.activeClassId]){if(this.materials[this.activeClassId].uniforms.uTime.value=e,this.materials[this.activeClassId].uniforms.uAspect.value=window.innerWidth/(window.innerHeight||1),t){let n=window.cymaticsAudioSync!==void 0?window.cymaticsAudioSync:1;this.materials[this.activeClassId].uniforms.uAudioLow.value=(t.bass||0)*n,this.materials[this.activeClassId].uniforms.uAudioMid.value=(t.mids||0)*n,this.materials[this.activeClassId].uniforms.uAudioHigh.value=(t.highs||0)*n}if(i&&this.materials[this.activeClassId].uniforms.uMouse.value.set(i.x||0,i.y||0),this.rainbowMode){const n=e*.1%1,a=(n+.5)%1;this.materials[this.activeClassId].uniforms.uColor1.value.setHSL(n,1,.6),this.materials[this.activeClassId].uniforms.uColor2.value.setHSL(a,1,.6)}}if(this.crossfadeData&&this.crossfadeData.active){let n=e-this.crossfadeData.startTime,a=Math.min(1,n/this.crossfadeData.duration);this.materials[this.crossfadeData.nextId]&&(this.materials[this.crossfadeData.nextId].uniforms.uAlpha.value=a),this.materials[this.crossfadeData.prevId]&&(this.materials[this.crossfadeData.prevId].uniforms.uAlpha.value=1-a),a>=1&&(this.crossfadeData.active=!1,this.activeClassId=this.crossfadeData.nextId)}}dispose(){if(this._boundCymaticsToggleMouseSync&&window.removeEventListener("cymaticsToggleMouseSync",this._boundCymaticsToggleMouseSync),this.dummyTexture&&(this.dummyTexture.dispose(),this.dummyTexture=null),this.meshes.forEach(e=>{e.geometry&&e.geometry.dispose(),this.group.remove(e)}),this.materials){for(const e in this.materials)this.materials[e]&&this.materials[e].dispose();this.materials={}}if(this.textureCache){for(const e in this.textureCache)this.textureCache[e]&&this.textureCache[e].dispose();this.textureCache={}}this.meshes=[],this.materials={}}setConstellationLinesToggle(e){this.materials[24]&&(this.materials[24].uniforms.uShowLines.value=e?1:0)}setRainbow(e){this.rainbowMode=e,e||this.setPattern(this.activeClassId,this.activeVariationId,!1)}}let le=null;class E0{static CYMATIC_PATTERNS=[{classId:22,variationId:0,name:"Heartbeat",style:"fractal"},{classId:22,variationId:1,name:"Quantum Flower",style:"sacred"},{classId:22,variationId:2,name:"Sacred Sun Resonance",style:"complex"},{classId:22,variationId:3,name:"Ethereal Nexus",style:"geometry"},{classId:22,variationId:4,name:"Golden Ratio Spiral",style:"fractal"},{classId:22,variationId:5,name:"Obsidian Bloom",style:"sacred"},{classId:22,variationId:6,name:"Prismatic Core",style:"complex"},{classId:22,variationId:7,name:"Void Resonance",style:"geometry"},{classId:22,variationId:8,name:"Nebula Plasma",style:"fractal"},{classId:22,variationId:9,name:"Sacred Gold Obsidian",style:"sacred"},{classId:22,variationId:10,name:"Biolum Abyssal",style:"complex"},{classId:22,variationId:11,name:"Emerald Cyber Matrix",style:"geometry"},{classId:22,variationId:12,name:"Liquid Mercury Crimson",style:"fractal"},{classId:22,variationId:13,name:"Quantum Crystal Lattice",style:"sacred"},{classId:22,variationId:14,name:"Solar Flare Harmonics",style:"complex"},{classId:22,variationId:15,name:"Amethyst Hyperdimensional",style:"geometry"},{classId:22,variationId:16,name:"Neon Labyrinth",style:"fractal"},{classId:22,variationId:17,name:"Celestial Mandala",style:"sacred"},{classId:22,variationId:18,name:"Astral Lotus",style:"complex"},{classId:22,variationId:19,name:"Lunar Tides",style:"geometry"},{classId:22,variationId:20,name:"Cybernetic Lotus",style:"fractal"},{classId:22,variationId:21,name:"Bioluminescent Shroom",style:"sacred"},{classId:22,variationId:22,name:"Vortex of Time",style:"complex"},{classId:22,variationId:23,name:"Diamond Lattice",style:"geometry"},{classId:22,variationId:24,name:"Seraphim Wings",style:"fractal"},{classId:22,variationId:25,name:"Fractal Heart",style:"sacred"},{classId:22,variationId:26,name:"Particle Swarm",style:"complex"},{classId:22,variationId:27,name:"Fluid SDF",style:"geometry"},{classId:22,variationId:28,name:"Quantum Topology",style:"fractal"},{classId:22,variationId:29,name:"Ai Cymatic 15",style:"sacred"}];constructor(e,t={}){this.canvas=e,this.activeModes=t.activeModes||new Set(["cyber","snowflake","waves","particles","cymatics"]),this.mode=t.mode||"none",this.mindWaveMode=t.mindWaveMode!==void 0?t.mindWaveMode:!0,this.galaxySunStyle=t.galaxySunStyle||"sun",this.cymaticClass=t.cymaticClass!==void 0?t.cymaticClass:22,this.cymaticVariation=t.cymaticVariation!==void 0?t.cymaticVariation:0,this.cymaticColors=t.cymaticColors||["#EEA0EB","#FFB1A3"],this.snowSizeOverride=t.snowSizeOverride!==void 0?t.snowSizeOverride:.5,this.currentCymaticData={name:"Fractal Heart",n:1,m:1,energy:.2},this.cymaticsHistory=[],this.cymaticsHistoryIndex=-1,this._cymaticDriftOffset=Math.random()*1e3,this.cyberConfig={logicMode:t.cyberLogicMode||"matrix",customText:t.cyberCustomText||"WELCOME",angle:t.cyberAngle||0,speed:t.cyberSpeedMultiplier||1,length:1,color:"#00FF41",rainbow:!0},this.matrixConfig={logicMode:t.matrixLogicMode||"interstellar",customText:t.matrixCustomText||"MINDWAVE",angle:0,speed:1,length:1,color:"#00FF41",rainbow:!1},this.initialized=!1,this._rainbowEnabled=t.rainbowEnabled||!1,this.isVisualizer3D=!0,this.overlayCanvas=document.getElementById("cyberCanvas"),this.overlayCtx=this.overlayCanvas?this.overlayCanvas.getContext("2d",{alpha:!0}):null,this.overlayCanvas&&(this.resizeOverlayCanvas(),window.addEventListener("resize",()=>this.resizeOverlayCanvas())),this.matrixCyberStreams=[],this.currentCyberAngle=t.cyberAngle!==void 0?t.cyberAngle:0,this.cyberColorCustomized=!1;try{const n=localStorage.getItem("cyberThemeHistory");this.themeHistory=n?JSON.parse(n):[],this.lastCyberFamily=localStorage.getItem("cyberLastFamily")||""}catch{this.themeHistory=[],this.lastCyberFamily=""}this.currentLogoOpacity=.8,this.targetLogoOpacity=.8,le=this,this.themeType=document.body.dataset.themeType||"dark";const i=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);this.batterySaver=t.batterySaver!==void 0?t.batterySaver:i,this.isLowPower=this.batterySaver||localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode"),this.isLowPower=t.isLowPower||!1,this.targetFPS=this.isLowPower?30:60,this.audioSensitivity=1,this.geoComplexity=1,this.cameraPitch=0,this.cameraYaw=0,this.cameraRoll=0,this.vibrationEnabled=typeof pe<"u"&&pe.visualVibration!==void 0?pe.visualVibration:t.visualVibration!==void 0?t.visualVibration:!1,this._fpsRingBuffer=new Float64Array(60),this._fpsRingIndex=0,this._fpsRingCount=0,this.lastLodDegradation=0,this.currentLodLevel="high",this._tempColor=new he,this._logoRenderCanvas=null,this.sphereGroup=new je,this.particleGroup=new je,this.lightspeedGroup=new je,this.lavaGroup=new je,this.fireplaceGroup=new je,this.rainforestGroup=new je,this.zenGardenGroup=new je,this.oceanGroup=new je,this.wavesGroup=new je,this.cyberGroup=new je,this.boxGroup=new je,this.dragonGroup=new je,this.galaxyGroup=new je,this.mandalaGroup=new je,this.cymaticsGroup=new je,this.snowflakeGroup=new je,this.tsunamiGroup=new je,this._snowData=null;try{this.scene=new Um,this.cymaticsCore=new C0(this.cymaticsGroup),this.cymaticsCore.setPattern(this.cymaticClass,this.cymaticVariation),this.cymaticsCore.setColor(this.cymaticClass,1,this.cymaticColors[0]),this.cymaticsCore.setColor(this.cymaticClass,2,this.cymaticColors[1]),[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup,this.tsunamiGroup].forEach(r=>this.scene.add(r)),this.camera=new Vt(75,e.width/e.height,.1,1e3),this.renderer=new Kl({canvas:e,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(0,0),this.renderer.setSize(e.clientWidth,e.clientHeight);const a=this.isLowPower?1:2;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,a)),this.textures={},this.customColors={},this.customColor=null,this._isRendering=!1,this._freqDataArray=null,this.initEnvironment(),this.camera.position.z=5,this.handleLayoutChange=this.handleLayoutChange.bind(this),window.addEventListener("resize",()=>{this.resize(),this.handleLayoutChange()}),window.addEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode=()=>{this.currentLodLevel!=="low"&&(this.degradeLOD(),this.degradeLOD())},window.addEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange=()=>{document.hidden||(this.lastTime=performance.now()*.001,this.active!==!1&&this.initialized&&this.render(pe.masterAnalyser||pe.analyserLeft,pe.analyserRight))},document.addEventListener("visibilitychange",this._boundVisibilityChange),this._boundContextLost=r=>{r.preventDefault(),this.active=!1,pe.animationId&&(cancelAnimationFrame(pe.animationId),pe.animationId=null)},e.addEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored=()=>{try{this.initialized=!1,this._freqDataArray=null,this.initEnvironment(),this.cameraPitch=0,this.cameraYaw=0,this.cameraRoll=0,this.updateCameraRotation(),typeof window.resetCameraControls=="function"&&window.resetCameraControls(),this.updateVisibility(),this.initialized=!0,this.active=!0,this.lastTime=performance.now()*.001,pe.animationId&&cancelAnimationFrame(pe.animationId),this._isRendering=!1,this.render(pe.masterAnalyser||pe.analyserLeft,pe.analyserRight)}catch{}},e.addEventListener("webglcontextrestored",this._boundContextRestored),this._boundCymaticPointer=r=>{const o=r.touches?r.touches[0].clientX:r.clientX,l=r.touches?r.touches[0].clientY:r.clientY;this.mouseX=o/window.innerWidth*2-1,this.mouseY=-(l/window.innerHeight)*2+1},window.addEventListener("mousemove",this._boundCymaticPointer),window.addEventListener("touchmove",this._boundCymaticPointer,{passive:!0}),this.resize(),setTimeout(this.handleLayoutChange,100),this._boundThemeChange=r=>{if(r.detail&&r.detail.type){const o=r.detail.type;this.themeType!==o&&(this.themeType=o,this.updateLogoTexture())}},window.addEventListener("themeChanged",this._boundThemeChange),this.speedMultiplier=1,this.brightnessMultiplier=1,this.lastTime=performance.now()*.001,this.simTime=0,this.targetFPS=60,this.lastFrameRenderTime=0,this.active=!0,this.updateVisibility(),this.initialized=!0,this.initOverlayLogo(),window.viz3D=this,setTimeout(()=>{window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}}))},100)}catch{this.initialized=!1}}setCameraRotation(e,t,i){this.cameraPitch=e,this.cameraYaw=t,this.cameraRoll=i,this.updateCameraRotation()}updateCameraRotation(){this.scene.rotation.set(this.cameraPitch,this.cameraYaw,this.cameraRoll)}setAudioSensitivity(e){this.audioSensitivity=parseFloat(e)}setGeoComplexity(e){this.geoComplexity=parseFloat(e)}resize(){if(!this.renderer||!this.canvas||!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.postProcessor&&this.postProcessor.resize(e,t),this.handleLayoutChange()}handleLayoutChange(){!this.renderer||!this.camera||this.camera.clearViewOffset()}resizeOverlayCanvas(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight)}captureSnapshot(){if(!this.canvas)return;typeof pe<"u"&&this.active!==!1&&this.initialized?this.render(pe.masterAnalyser||pe.analyserLeft,pe.analyserRight):this.renderer.render(this.scene,this.camera);const e=this.canvas.toDataURL("image/png",1),t=document.createElement("a");return t.download=`Mindwave-Snapshot-${new Date().toISOString().replace(/[:.]/g,"-")}.png`,t.href=e,document.body.appendChild(t),t.click(),document.body.removeChild(t),e}startRecording(){if(!this.canvas||this.mediaRecorder&&this.mediaRecorder.state==="recording")return!1;try{const e=this.canvas.captureStream(60),t={mimeType:"video/webm; codecs=vp9"};return MediaRecorder.isTypeSupported(t.mimeType)||(t.mimeType="video/webm; codecs=vp8",MediaRecorder.isTypeSupported(t.mimeType)||(t.mimeType="video/webm")),this.recordedChunks=[],this.mediaRecorder=new MediaRecorder(e,t),this.mediaRecorder.ondataavailable=i=>{i.data.size>0&&this.recordedChunks.push(i.data)},this.mediaRecorder.onstop=()=>{const i=new Blob(this.recordedChunks,{type:t.mimeType}),n=URL.createObjectURL(i),a=document.createElement("a");a.download=`Mindwave-Visuals-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,a.href=n,document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout(()=>URL.revokeObjectURL(n),100)},this.mediaRecorder.start(1e3),!0}catch{return!1}}stopRecording(){return this.mediaRecorder&&this.mediaRecorder.state==="recording"?(this.mediaRecorder.stop(),!0):!1}generateCyberStyle(){const e=this.overlayCanvas,t=this.overlayCtx;if(!e||!t)return;this.matrixCyberStreams=[];const i=Math.max(11,Math.min(21,Math.floor(e.width/50)));this.isLowPower=localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode");let n=Math.ceil(e.width/i);this.isLowPower||(n*=1.5);let a=window.getCurrentTheme?window.getCurrentTheme():{color:"#2dd4bf"};this.resizeOverlayCanvas(),this.cyberColorCustomized=!1;const r=[{name:"System Yellow",color:"#FFFF00",family:"yellow"},{name:"Neon Pink",color:"#FF1493",family:"pink"},{name:"Chrome Static",color:"#C0C0C0",family:"mono"},{name:"Royal Data",color:"#4169E1",family:"blue"},{name:"White Noise",color:"#FFFFFF",family:"mono"},{name:"Cyan Future",color:"#00FFFF",family:"blue"},{name:"Lime Access",color:"#32CD32",family:"green"},{name:"Purple Haze",color:"#800080",family:"purple"},{name:"Emerald Link",color:"#50C878",family:"green"},{name:"Ice Blue",color:"#A5F2F3",family:"blue"},{name:"sentAIent Blue",color:"#60A9FF",family:"blue"},{name:"Rainbow Surge",color:"rainbow",family:"rainbow"}],o=this.lastCyberFamily||"";let l=r.filter(f=>!this.themeHistory.includes(f.name));const c=l.filter(f=>f.family!==o);c.length>0&&(l=c);let u=l;if(u.length===0){const f=this.themeHistory[this.themeHistory.length-1];u=r.filter(v=>v.name!==f)}const h=u[Math.floor(Math.random()*u.length)];this.themeHistory.push(h.name),this.themeHistory.length>5&&this.themeHistory.shift(),this.lastCyberFamily=h.family;try{localStorage.setItem("cyberThemeHistory",JSON.stringify(this.themeHistory)),localStorage.setItem("cyberLastFamily",this.lastCyberFamily)}catch{}this.cyberSpeedMultiplier===void 0&&(this.cyberSpeedMultiplier=.2),this.cyberLengthMultiplier===void 0&&(this.cyberLengthMultiplier=.7);const d=document.getElementById("cyberRainbowToggle");if(d&&this.cyberRainbowMode===void 0&&(this.cyberRainbowMode=!0,this.cyberConfig.rainbow=!0,d.checked=!0),!this.cyberRainbowMode&&a.color!=="rainbow"){this.cyberColor=a.color;const f=document.getElementById("cyberColorPicker");f&&(f.value=this.cyberColor)}for(let f=0;f<n;f++){const v=Math.random(),_=Math.floor(8+v*11),m=(2+v*8+Math.random()*2)*this.cyberSpeedMultiplier;this.matrixCyberStreams.push({x:f*i,y:Math.random()*this.overlayCanvas.height*1.5-this.overlayCanvas.height*.5,baseSpeed:m,opacity:.2+v*.8,size:_,chars:[],color:a.color!=="rainbow"?a.color:"#FFFFFF"})}this.updateCyberStrings(),this.matrixCyberStreams.sort((f,v)=>f.size-v.size)}renderCyberCyber(){const e=this.activeModes.has("cyber");if(!this.overlayCtx||!this.matrixCyberStreams||!e)return;const t=this.overlayCtx,i=this.overlayCanvas;t.clearRect(0,0,i.width,i.height);const n=this.activeModes.size>1;t.fillStyle=n?"rgba(0, 0, 0, 0.4)":"rgba(0, 0, 0, 0.85)",t.fillRect(0,0,i.width,i.height),t.save(),t.textAlign="center";const a=this.cyberConfig,r=a.speed||1,o=a.length||1;a.angle!==0&&(t.translate(i.width/2,i.height/2),t.rotate(a.angle*Math.PI/180),t.translate(-i.width/2,-i.height/2));const l=20,c=Date.now()*.1;t.textBaseline="middle";let u=-1;this.matrixCyberStreams.forEach((h,d)=>{h.y+=h.baseSpeed*r;let f=Math.max(3,Math.floor(l*o));(this.isLowPower||this.currentLodLevel==="low")&&(f=Math.floor(f*.4)),h.y-f*h.size>i.height*1.5&&(h.y=0);const v="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";h.size!==u&&(t.font=`${h.size}px monospace`,u=h.size);const _=this.isLowPower&&this.currentLodLevel==="low"?2:1;for(let m=0;m<f&&m<h.chars.length;m+=_){!h.isTextMode&&Math.random()<.02&&(h.chars[m]=v.charAt(Math.floor(Math.random()*v.length)));const p=h.chars[m],y=h.y-m*h.size;if(y<-h.size*2||y>i.height*1.5)continue;const g=1-m/f,b=Math.pow(g,.4)*(h.opacity*1.2);if(t.globalAlpha=Math.min(1,b),this.cyberRainbowMode){const P=(c+d*15+m*5)%360;t.fillStyle=`hsl(${P}, 100%, 60%)`,d===0&&m===0&&Math.random()<.01}else t.fillStyle=h.color||this.cyberColor,d===0&&m===0&&Math.random()<.01;t.fillText(p,h.x,y)}}),t.shadowBlur=0,t.globalAlpha=1,t.restore()}initSphere(){const e=new _n(2,2),t=new At({color:6334975,wireframe:!0,transparent:!0,opacity:.5});this.sphere=new We(e,t);const i=new _n(1.8,1),n=new At({color:6334975,transparent:!0,opacity:.1,blending:Ye});this.core=new We(i,n),this.sphereGroup.add(this.sphere),this.sphereGroup.add(this.core),this.sphereGroup.visible=!1;const a=this.customColors?.sphere||this.customColor;a&&(this.sphere.material.color.copy(a),this.core.material.color.copy(a))}initLightspeed(){const t=new Ze,i=new Float32Array(2e3*3);for(let n=0;n<2e3*3;n++)i[n]=(Math.random()-.5)*80;t.setAttribute("position",new st(i,3)),this.lightspeedMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:1},uColor:{value:new he(3003583)},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:Ye,depthWrite:!1}),this.lightspeed=new hi(t,this.lightspeedMaterial),this.lightspeedGroup.add(this.lightspeed)}initParticles(){const e=this.batterySaver?400:1e3,t=new Ze,i=new Float32Array(e*3),n=new Float32Array(e*3);for(let a=0;a<e;a++){const r=a*3;i[r]=(Math.random()-.5)*60,i[r+1]=(Math.random()-.5)*60,i[r+2]=(Math.random()-.5)*80;const o=Math.random();o<.3?(n[r]=.4,n[r+1]=.7,n[r+2]=1):o<.6?(n[r]=.3,n[r+1]=.9,n[r+2]=.95):o<.85?(n[r]=.6,n[r+1]=.4,n[r+2]=1):(n[r]=.9,n[r+1]=.9,n[r+2]=1)}t.setAttribute("position",new st(i,3)),t.setAttribute("color",new st(n,3)),this.particleMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:1},uSize:{value:.4},uTexture:{value:this.createCircleTexture()},uIntensity:{value:1}},vertexShader:`
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
                uniform float uIntensity;
                void main() {
                    vec4 tex = texture2D(uTexture, gl_PointCoord);
                    if (tex.a < 0.1) discard;
                    gl_FragColor = vec4(vColor, tex.a * uIntensity);
                }
            `,transparent:!0,blending:Ye,depthWrite:!1}),this.particles=new hi(t,this.particleMaterial),this.particleGroup.add(this.particles),this.particleGroup.visible=!1}initBox(){this.boxOuter=new je;const e=new Va(new Ci(3,3,3)),t=new dn({color:16777215,transparent:!0,opacity:.9,blending:Ye}),i=new dn({color:3900150,transparent:!0,opacity:.5,blending:Ye});this.boxOuter.add(new Gn(e,t));for(let u=1;u<=3;u++){const h=new Gn(e,i);h.scale.setScalar(1+u*.012),this.boxOuter.add(h)}const n=new Va(new Ci(2,2,2)),a=new dn({color:14742270,transparent:!0,opacity:.8,blending:Ye}),r=new dn({color:6333946,transparent:!0,opacity:.4,blending:Ye});this.boxInner=new je,this.boxInner.add(new Gn(n,a));for(let u=1;u<=2;u++){const h=new Gn(n,r);h.scale.setScalar(1+u*.015),this.boxInner.add(h)}const o=new Va(new Ci(3.05,3.05,3.05)),l=new dn({color:9684477,transparent:!0,opacity:.8,blending:Ye});this.boxEdges=new Gn(o,l),this.boxGroup.add(this.boxOuter),this.boxGroup.add(this.boxInner),this.boxGroup.add(this.boxEdges),this.boxGroup.visible=!1;const c=this.customColors?.box||this.customColor;c&&(this.boxOuter.children.forEach(u=>u.material.color.copy(c)),this.boxInner.children.forEach(u=>u.material.color.copy(c)),this.boxEdges&&this.boxEdges.material&&this.boxEdges.material.color.copy(c))}initDragon(){this.dragonDummy=new pt,this.dragonLength=80;const e=new _n(.8,1),t=new At({color:15680580,wireframe:!0,transparent:!0,opacity:.8,blending:Ye}),i=new _n(.5,1),n=new At({color:16096779,wireframe:!1,transparent:!0,opacity:.6,blending:Ye});this.dragonBodyInstanced=new el(e,t,this.dragonLength),this.dragonGlowInstanced=new el(i,n,this.dragonLength);const a=new Yn(1.5,3.5,5);a.rotateX(Math.PI/2);const r=new At({color:16638023,wireframe:!0,transparent:!0,opacity:.9,blending:Ye});this.dragonHead=new We(a,r),this.dragonPearlGroup=new je;const o=new yn(1,16,16),l=new At({color:3718648,wireframe:!1,transparent:!0,opacity:.9,blending:Ye}),c=new yn(1.3,16,16),u=new At({color:8246268,wireframe:!0,transparent:!0,opacity:.5,blending:Ye});this.dragonPearl=new We(o,l),this.dragonPearlHalo=new We(c,u),this.dragonPearlGroup.add(this.dragonPearl),this.dragonPearlGroup.add(this.dragonPearlHalo),this.dragonGroup.add(this.dragonBodyInstanced),this.dragonGroup.add(this.dragonGlowInstanced),this.dragonGroup.add(this.dragonHead),this.dragonGroup.add(this.dragonPearlGroup),this.dragonGroup.visible=!1;const h=this.customColors?.dragon||this.customColor;h&&this.updateDragonColor(h)}updateGalaxyColor(e){if(this.galaxySunMesh&&this.galaxySunMesh.traverse(t=>{t.isMesh&&t.material&&t.material.color.copy(e)}),this.galaxyStars&&this.galaxyStars.geometry){const t={};e.getHSL(t);const i=(t.h+.5)%1,n=this.galaxyStars.geometry.getAttribute("color");if(n){const a=n.count,r=this._tempColor;for(let o=0;o<a;o++){const l=o/a,c=l<.2?.8:l<.5?.6:.4+Math.random()*.15,u=.6+Math.random()*.3;r.setHSL(i,u,c),n.setXYZ(o,r.r,r.g,r.b)}n.needsUpdate=!0}}}updateDragonColor(e){if(!this.dragonBodyInstanced)return;this.dragonBodyInstanced.material.color.copy(e),this.dragonHead.material.color.copy(e);const t={};e.getHSL(t);const i=(t.h+.5)%1,n=new he().setHSL(i,t.s,t.l);this.dragonGlowInstanced.material.color.copy(n)}initGalaxy(){const e=this.batterySaver?500:1500,t=new Ze,i=[],n=[],a=[];for(let l=0;l<e;l++){const c=l/e*Math.PI*10,u=2.5+l/e*20+Math.random()*2,h=l%4*(Math.PI*2/4),d=Math.max(.5,l/e*4),f=Math.cos(c+h)*u+(Math.random()-.5)*d,v=(Math.random()-.5)*1.5,_=Math.sin(c+h)*u+(Math.random()-.5)*d;i.push(f,v,_);const m=l/e;m<.2?n.push(1,.95,.7):m<.5?n.push(.7+Math.random()*.3,.8,1):n.push(.4+Math.random()*.2,.3+Math.random()*.3,.8+Math.random()*.2),a.push(Math.random()<.05?.4+Math.random()*.3:.08+Math.random()*.15)}t.setAttribute("position",new Ne(i,3)),t.setAttribute("color",new Ne(n,3)),t.setAttribute("size",new Ne(a,1));const r=this.createStarTexture(),o=new Vs({size:.25,vertexColors:!0,map:r,transparent:!0,opacity:.9,blending:Ye,depthWrite:!1,sizeAttenuation:!0});this.galaxyStars=new hi(t,o),this.galaxyGroup.add(this.galaxyStars),this.galaxySunStyle=this.galaxySunStyle||"sun",this.createGalaxySun(this.galaxySunStyle),this.galaxyGroup.visible=!1}createGalaxySun(e){this.galaxySunMesh&&(this.galaxyGroup.remove(this.galaxySunMesh),this.galaxySunMesh=null),this.galaxySunMesh=new je;const t=new At({color:4892415,transparent:!0,opacity:.85,blending:Ye,depthWrite:!1,side:Mt}),i=new je;if(e==="sun2"){const n=t.clone();n.side=pi;const a=new js(1.5,.25,16,64);i.add(new We(a,n));const r=8,o=new Yn(.4,2.7,4);o.translate(0,2.7/2,0);const l=new Yn(.2,1.7,4);l.translate(0,1.7/2,0);for(let c=0;c<r;c++){const u=c/r*Math.PI*2,h=new We(o,n);h.rotation.z=-u,h.position.set(Math.sin(u)*1.5,Math.cos(u)*1.5,0),i.add(h);const d=u+Math.PI/r,f=new We(l,n);f.rotation.z=-d,f.position.set(Math.sin(d)*1.5,Math.cos(d)*1.5,0),i.add(f)}}else if(e==="sun3"){const n={uTime:{value:0},uLoopTime:{value:0},uColor:{value:t.color},uBassIntt:{value:0}};this.galaxySunUniforms=n;const a=`
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
            `,r=`
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
                  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), vec4(0.0));
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
            `,o=new ft({vertexShader:a,fragmentShader:r,uniforms:n,transparent:!0,blending:Ye,depthWrite:!1,side:Mt}),l=new yn(2,64,64),c=new We(l,o);i.add(c);const u=new At({color:t.color,transparent:!0,opacity:.15,blending:Ye,depthWrite:!1,side:Nt}),h=new yn(3,32,32);i.add(new We(h,u))}else{const n=new js(1.5,.12,8,64);i.add(new We(n,t));const a=8;for(let r=0;r<a;r++){const o=r/a*Math.PI*2,l=new ir;l.moveTo(-.4,0),l.lineTo(.4,0),l.lineTo(0,2.7),l.lineTo(-.4,0);const c=new Ks(l),u=new We(c,t);u.rotation.z=-o,u.position.set(Math.sin(o)*1.5,Math.cos(o)*1.5,0),i.add(u);const h=o+Math.PI/a,d=new ir;d.moveTo(-.2,0),d.lineTo(.2,0),d.lineTo(0,1.7),d.lineTo(-.2,0);const f=new Ks(d),v=new We(f,t);v.rotation.z=-h,v.position.set(Math.sin(h)*1.5,Math.cos(h)*1.5,0),i.add(v)}}this.galaxySunMesh.add(i),this.galaxySunMesh.position.set(0,0,.1),this.galaxyGroup.add(this.galaxySunMesh)}setGalaxySunStyle(e){e!=="sun"&&e!=="sun2"&&e!=="sun3"||(this.galaxySunStyle=e,this.galaxyGroup&&this.galaxyGroup.children.length>0&&this.createGalaxySun(e))}setGalaxySunRotation(e,t){e==="x"&&(this.sunRotationSpeedX=parseFloat(t)),e==="y"&&(this.sunRotationSpeedY=parseFloat(t)),e==="z"&&(this.sunRotationSpeedZ=parseFloat(t))}createStarTexture(){if(this.textures.star)return this.textures.star;const e=64,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),n=e/2,a=e/2;i.clearRect(0,0,e,e);const r=i.createRadialGradient(n,a,0,n,a,e/2);return r.addColorStop(0,"rgba(255, 255, 255, 1.0)"),r.addColorStop(.1,"rgba(255, 255, 240, 0.8)"),r.addColorStop(.25,"rgba(255, 255, 200, 0.3)"),r.addColorStop(.5,"rgba(200, 200, 255, 0.1)"),r.addColorStop(1,"rgba(100, 100, 255, 0)"),i.fillStyle=r,i.fillRect(0,0,e,e),i.fillStyle="rgba(255, 255, 255, 0.6)",i.beginPath(),i.moveTo(0,a-1),i.lineTo(n,a-.5),i.lineTo(e,a-1),i.lineTo(e,a+1),i.lineTo(n,a+.5),i.lineTo(0,a+1),i.closePath(),i.fill(),i.beginPath(),i.moveTo(n-1,0),i.lineTo(n-.5,a),i.lineTo(n-1,e),i.lineTo(n+1,e),i.lineTo(n+.5,a),i.lineTo(n+1,0),i.closePath(),i.fill(),i.beginPath(),i.arc(n,a,2,0,Math.PI*2),i.fillStyle="rgba(255, 255, 255, 1.0)",i.fill(),this.textures.star=new Vn(t),this.textures.star}initMandala(){this.mandalaRings=[];const e=[2450411,15357964,3900150,16347926,12573694];for(let a=0;a<5;a++){const r=1.2+a*.8,o=6+a*6,l=new xr(r-.05,r+.05,o),c=new At({color:e[a],side:Mt,transparent:!0,opacity:.4-a*.05,blending:Ye}),u=new We(l,c);u.userData={speed:(.01+a*.005)*(a%2===0?1:-1),segments:o},this.mandalaRings.push(u),this.mandalaGroup.add(u)}const t=new mr(.3,32),i=new At({color:16347926,transparent:!0,opacity:.6,blending:Ye});this.mandalaCenter=new We(t,i),this.mandalaGroup.add(this.mandalaCenter),this.mandalaGroup.visible=!1;const n=this.customColors?.mandala;n&&(this.mandalaRings.forEach(a=>a.material.color.copy(n)),this.mandalaCenter.material.color.copy(n))}createSnowflakeTexture(){if(this.textures.snowflake)return this.textures.snowflake;const e=128,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),n=e/2,a=e/2;i.clearRect(0,0,e,e),i.strokeStyle="rgba(220,240,255,1.0)",i.lineCap="round";for(let r=0;r<6;r++){const o=r/6*Math.PI*2;i.save(),i.translate(n,a),i.rotate(o),i.lineWidth=2.5,i.beginPath(),i.moveTo(0,0),i.lineTo(0,-52),i.stroke();const l=[{d:18,len:14,angle:Math.PI/4},{d:32,len:20,angle:Math.PI/4},{d:46,len:10,angle:Math.PI/5}];i.lineWidth=1.5,l.forEach(({d:c,len:u,angle:h})=>{[1,-1].forEach(d=>{i.beginPath(),i.moveTo(0,-c),i.lineTo(d*u*Math.cos(Math.PI/2-h),-c-u*Math.sin(Math.PI/2-h)),i.stroke()})}),i.restore()}i.beginPath();for(let r=0;r<6;r++){const o=r/6*Math.PI*2-Math.PI/6,l=n+Math.cos(o)*4,c=a+Math.sin(o)*4;r===0?i.moveTo(l,c):i.lineTo(l,c)}return i.closePath(),i.fillStyle="rgba(255, 255, 255, 0.8)",i.fill(),this.textures.snowflake=new Vn(t),this.textures.snowflake}setTsunamiKanagawa(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uKanagawa.value=e)}setTsunamiAmplitude(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uAmplitude.value=parseFloat(e)),this.tsunamiAnimState&&this.tsunamiAnimState.active&&(this.tsunamiAnimState.startAmp=parseFloat(e),this.tsunamiAnimState.phase=0)}setTsunamiCurl(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uCurl.value=parseFloat(e)),this.tsunamiAnimState&&this.tsunamiAnimState.active&&(this.tsunamiAnimState.startCurl=parseFloat(e),this.tsunamiAnimState.phase=0)}setTsunamiMist(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uMist.value=parseFloat(e));let t=parseFloat(e),i=Math.max(Math.min(t,1),0),n=Math.max(Math.min(1-t*2,1),0);this.tsunamiSun&&this.tsunamiSun.material&&(this.tsunamiSun.material.opacity=i,this.tsunamiSun.material.uniforms&&this.tsunamiSun.material.uniforms.uMist&&(this.tsunamiSun.material.uniforms.uMist.value=t)),this.tsunamiMoon&&this.tsunamiMoon.material&&this.tsunamiMoon.material.uniforms&&(this.tsunamiMoon.material.uniforms.uOpacity.value=n)}setTsunamiMoonPhase(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&this.tsunamiMaterial.uniforms.uMoonPhase&&(this.tsunamiMaterial.uniforms.uMoonPhase.value=parseFloat(e)),this.tsunamiMoon&&this.tsunamiMoon.material&&this.tsunamiMoon.material.uniforms&&(this.tsunamiMoon.material.uniforms.uMoonPhase.value=parseFloat(e))}setTsunamiStyle(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uStyle.value=parseFloat(e))}setTsunamiReactivity(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uReactivity.value=parseFloat(e))}setTsunamiLoop(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uLoopActive.value=e?1:0),this.tsunamiAnimState||(this.tsunamiAnimState={active:!1,phase:0,startAmp:1,startCurl:1}),this.tsunamiAnimState.active=e,e&&(this.tsunamiAnimState.phase=0,this.tsunamiAnimState.startAmp=this.tsunamiMaterial?this.tsunamiMaterial.uniforms.uAmplitude.value:1,this.tsunamiAnimState.startCurl=this.tsunamiMaterial?this.tsunamiMaterial.uniforms.uCurl.value:1)}initTsunami(){if(!this.tsunamiGroup)return;this.tsunamiGroup.clear();const e=new Jt(4e3,250,1500,300);e.translate(1500,0,0);const t={uTime:{value:0},uLoopTime:{value:0},uNormBass:{value:0},uColor:{value:new he(775123)},uHasCustomColor:{value:0},uSecondaryColor:{value:new he(27028)},uDeepColor:{value:new he(23477)},uFoamColor:{value:new he(16777215)},uSunColor:{value:new he(16770457)},uAmplitude:{value:2.2},uCurl:{value:2.4},uMist:{value:1},uMoonPhase:{value:0},uStyle:{value:1},uReactivity:{value:2},uLoopActive:{value:0},uKanagawa:{value:0},uWaveOffset:{value:0}},i=`
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vViewPosition;
            varying vec3 vWorldPosition;
            varying float vFoamFactor;
            varying float vStyle;
            varying float vPhaseWashout;
            varying float vWaveX;
            
            uniform float uTime;
            uniform float uNormBass;
            uniform float uAmplitude;
            uniform float uCurl;
            uniform float uReactivity;
            uniform float uLoopActive;
            uniform float uLoopTime;
            uniform float uStyle;
            uniform float uWaveOffset;
            uniform float uKanagawa;
            
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ; m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vUv = uv;
                vStyle = uStyle;
                vec3 pos = position;
                float time = uTime * 1.5;
                vPhaseWashout = 0.0;
                
                float react = max(uNormBass * 10.0 * uReactivity, snoise(vec2(time * 0.5)) * uReactivity * 0.2); 
                
                // --- LIFECYCLE LOGIC ---
                float activeAmp = uAmplitude;
                float targetCurl = pow(uCurl / 4.0, 4.0) * 4.0; 
                float activeCurl = targetCurl;
                float phase = 0.0;
                
                // Base coordinate for the wave sweeping across.
                // We add uWaveOffset so the JS can physically pan the wave from left to right!
                // Reduced pos.y slant to 0.1 so the pipeline stays centered on the camera in the distance!
                float waveX = pos.x + (pos.y * 0.1) + 20.0 - uWaveOffset;
                vWaveX = waveX; 
                
                // --- WAVE ENVELOPE (Shape & Height) ---
                // Massive base height
                float baseHeight = 60.0 * activeAmp * (1.0 + react * 0.3);
                
                // Asymmetric bell curve to give the wave a thick back and steep front
                float envelope = 0.0;
                if (waveX < 0.0) {
                    envelope = exp(-pow(waveX * 0.012, 2.0)); // Back of wave slope
                } else {
                    envelope = exp(-pow(waveX * 0.04, 2.0)); // Front cliff
                }
                
                // Apply base height
                pos.z += baseHeight * envelope; 
                
                // Chaos (subtle surface variation)
                // RUSHING NOISE to simulate high speed surfing!
                float noiseDisp = 0.0;
                if (envelope > 0.01) {
                    float noiseSpeed1 = mix(0.5, 3.0, uLoopActive);
                    float noiseSpeed2 = mix(0.5, 4.0, uLoopActive);
                    float chaos = snoise(pos.xy * 0.1 + vec2(time * noiseSpeed1, time * noiseSpeed2));
                    noiseDisp = (chaos * 20.0 * react * envelope); 
                }
                
                // Save the original, uncurled, un-noised Z height for coloring and foam
                float originalZ = pos.z + noiseDisp;
                
                // --- TRUE SURFING BARREL CURL ---
                // Start the curl higher up so the wave has a solid, heavy base wall
                float curlStartHeight = 25.0; 
                if (pos.z > curlStartHeight) {
                    float h = pos.z - curlStartHeight; 
                    // Dynamic max height prevents the wave from breaking into a straight line at high amplitudes
                    float currentMaxH = max(10.0, baseHeight - curlStartHeight);
                    float normH = clamp(h / currentMaxH, 0.0, 1.0); 
                    
                    float normalizedCurl = clamp(activeCurl / 4.0, 0.0, 1.0);
                    
                    // The curl envelope is shifted FORWARD (positive waveX) so the front cliff curls heavily to form the lip,
                    // but the back of the wave remains a solid, mostly uncurled slope.
                    // This prevents the mesh from self-intersecting and trapping the camera in the unfilled geometry!
                    float curlEnvelope = exp(-pow((waveX - 12.0) * 0.04, 2.0)); 
                    
                    // Wrap the curl to exactly 190 degrees (1.05 PI) so the lip completes the barrel and touches the water
                    float bendAngle = pow(normH, 1.2) * 3.14159 * 1.05 * normalizedCurl * curlEnvelope; 
                    
                    // Massive forward throw, scaled to the dynamic height to prevent the huge lip from intersecting itself
                    float heightScale = currentMaxH / 35.0;
                    float forwardThrow = pow(normH, 2.0) * 40.0 * heightScale * normalizedCurl * curlEnvelope;
                    
                    // Constant radius to maintain a clean C-shape overhang and preserve wave height
                    float radius = h;
                    
                    float originalX = pos.x;
                    
                    // x shift = forward throw + circular arc
                    // z shift = circular arc
                    pos.x = originalX + forwardThrow + sin(bendAngle) * radius * 1.5;
                    pos.z = curlStartHeight + cos(bendAngle) * radius;
                }
                
                // Add the rippling noise AFTER the physics calculation so it doesn't cause vertices to slide horizontally and tear!
                pos.z += noiseDisp;
                
                // Pass the original, uncurled Z height so color and foam track the physical lip of the wave!
                vElevation = originalZ;
                
                float foamNoise = snoise(pos.xy * 0.2 - vec2(time));
                vFoamFactor = smoothstep(baseHeight * 0.5, baseHeight, originalZ) + foamNoise * 0.3;
                
                vec4 worldPos = modelMatrix * vec4(pos, 1.0);
                vWorldPosition = worldPos.xyz;
                
                vec4 mvPosition = viewMatrix * worldPos;
                vViewPosition = -mvPosition.xyz;
                
                gl_Position = projectionMatrix * mvPosition;
            }
        `,n=`
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vViewPosition;
            varying vec3 vWorldPosition;
            varying float vFoamFactor;
            varying float vStyle;
            varying float vPhaseWashout;
            varying float vWaveX;
            
            uniform vec3 uColor;
            uniform vec3 uSecondaryColor;
            uniform vec3 uDeepColor;
            uniform vec3 uFoamColor;
            uniform vec3 uSunColor;
            uniform float uNormBass;
            uniform float uTime;
            uniform float uMist;
            uniform float uReactivity;
            uniform float uLoopActive;
            uniform float uLoopTime;
            uniform float uKanagawa;
            uniform float uHasCustomColor;
            uniform float uWaveOffset;

            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            float mod289(float x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            float permute(float x) { return mod289(((x*34.0)+1.0)*x); }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            
            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m; m = m*m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                // Base colors
                vec3 baseColor = uColor;
                vec3 secColor = uSecondaryColor;
                vec3 deepColor = uDeepColor;
                vec3 foamColor = uFoamColor;
                
                if (uKanagawa > 0.5) {
                    if (uHasCustomColor > 0.5) {
                        // Inherit custom color directly but build depth for the Kanagawa aesthetic
                        baseColor = uColor;
                        secColor = uColor * 0.5;
                        deepColor = uColor * 0.15;
                        foamColor = mix(vec3(0.96, 0.96, 0.92), uColor, 0.2); // Mostly bone white, slightly tinted
                    } else {
                        // Default classic Kanagawa blues
                        deepColor = vec3(0.0, 0.08, 0.35); // Pure deep Navy/Prussian Blue
                        secColor = vec3(0.17, 0.42, 0.77); // Indigo/teal
                        baseColor = vec3(0.65, 0.8, 0.95); // Light blue
                        foamColor = vec3(0.96, 0.96, 0.92); // Bone white foam
                    }
                } else {
                    if (uHasCustomColor > 0.5) {
                        baseColor = uColor;
                        secColor = uColor * 0.6;
                        deepColor = uColor * 0.25;
                    }
                }

                // Color Mapping - PERMANENT Buttery Smooth Gradients
                float midWeight = smoothstep(2.0, 15.0, vElevation);
                float highWeight = smoothstep(12.0, 35.0, vElevation);
                
                vec3 waterColor = mix(deepColor, secColor, midWeight);
                waterColor = mix(waterColor, baseColor, highWeight);
                
                if (uKanagawa > 0.5) {
                    // Woodblock Striations (Hard-edged, hand-drawn contour lines)
                    float striationNoise = sin(vElevation * 1.2 + vWorldPosition.x * 0.2);
                    float breakups = snoise(vWorldPosition.xy * 0.08) * 0.8;
                    
                    // Tight step for the hard-edged woodblock print style
                    float striationMask = step(0.85, striationNoise + breakups);
                    
                    // Iconic Kanagawa light blue contour lines
                    vec3 stripeColor = vec3(0.65, 0.8, 0.95); 
                    
                    // Only apply striations on the raised wave, leave flat ocean smooth
                    float elevationMask = smoothstep(5.0, 15.0, vElevation);
                    striationMask *= elevationMask;
                    
                    waterColor = mix(waterColor, stripeColor, striationMask);
                }
                
                // Graphic Foam Claws - isolated strictly to elevation > 10.0
                float foamThr = 0.5 - (max(uNormBass, 0.05) * uReactivity * 0.5);
                float foamFac = vFoamFactor;
                
                if (uKanagawa > 0.5) {
                    // NUMBER OF FINGERS scales with reactivity
                    float numFingers = 8.0 + (uReactivity * max(0.1, uNormBass) * 45.0);
                    
                    // Elevation mapped from 25 (bottom of claws) to 50 (top crest)
                    float elevationFactor = clamp((vElevation - 25.0) / 25.0, 0.0, 1.0);
                    
                    // Curve the fingers strongly forward to mimic the Kanagawa hook
                    // As elevation goes down, the distortion increases, bending the finger into a 'C' shape
                    float hookDistortion = (50.0 - vElevation) * 0.6 + sin(vElevation * 0.4) * 2.0;
                    
                    // Base repeating wave for the distinct fingers
                    float baseFingers = sin((vWorldPosition.y + hookDistortion) * numFingers * 0.06);
                    
                    // High-frequency noise to give it the jagged, hand-drawn woodblock edge
                    float jaggedNoise = snoise(vWorldPosition.xy * 0.5 - vec2(uTime * 1.5)) * 0.6 + snoise(vWorldPosition.xy * 1.5) * 0.3;
                    
                    // Combine the shape
                    float clawShape = baseFingers + jaggedNoise;
                    
                    // The threshold dictates thickness.
                    // At the crest (elevationFactor = 1.0), threshold is low (-0.5), making it a solid block of white foam.
                    // As it reaches down (elevationFactor = 0.0), threshold is high (1.3), tapering the foam into sharp, thin claws.
                    float threshold = mix(1.3, -0.5, elevationFactor);
                    
                    // Hard step for the woodblock print aesthetic
                    float clawIntensity = step(threshold, clawShape);
                    
                    // Add the iconic Kanagawa floating foam droplets breaking off the claws
                    float dropletNoise = snoise(vWorldPosition.xy * 0.8 - vec2(uTime * 2.0));
                    float dropletMask = step(0.85, dropletNoise);
                    
                    // Combine claws and droplets, isolating them to the top half of the wave
                    float finalKanagawaFoam = clamp(clawIntensity + dropletMask, 0.0, 1.0) * step(25.0, vElevation);
                    
                    foamFac += finalKanagawaFoam * 5.0; // Force to pure foam
                }
                
                float isFoam = step(foamThr, foamFac);
                float floorMask = smoothstep(10.0, 15.0, vElevation);
                isFoam *= floorMask;
                vec3 finalColor = mix(waterColor, foamColor, isFoam);
                
                // STYLIZATION: Synthwave / Holographic Grid (Applies to ALL waves!)
                if (vStyle > 0.01) {
                    // Create a sharp geometric grid on the water surface
                    vec2 gridUV = vWorldPosition.xy * 0.3;
                    
                    // Warp the grid slightly along the elevation to make it curve with the barrel!
                    gridUV.x += sin(vElevation * 0.15) * 1.5;
                    
                    float gridX = abs(fract(gridUV.x) - 0.5) * 2.0;
                    float gridY = abs(fract(gridUV.y) - 0.5) * 2.0;
                    
                    // Grid lines become sharper and brighter as stylization increases
                    float lineThickness = mix(0.9, 0.96, vStyle);
                    float gridMask = step(lineThickness, max(gridX, gridY));
                    
                    // Fade the grid out ONLY on the thick foam, let it wrap the entire water body (barrel included!)
                    gridMask *= (1.0 - isFoam);
                    
                    // Vibrant glowing grid lines matching the secondary theme color
                    vec3 gridColor = uSecondaryColor * 1.5;
                    finalColor = mix(finalColor, gridColor, gridMask * vStyle);
                    
                    // Darken the entire water base slightly to make the grid pop!
                    finalColor = mix(finalColor, finalColor * 0.5, vStyle * 0.5 * (1.0 - isFoam));
                }
                
                // Loop Washout
                if (vPhaseWashout > 0.01) {
                    finalColor = mix(finalColor, uFoamColor, vPhaseWashout * 0.8);
                }
                
                // Sun & Glare (uMist slider repurposed as Sun Reflection)
                float alpha = 1.0;
                // GLOSS AND GLARE (SUN OR MOON)
                vec3 lightSourcePos = vec3(-50.0, 200.0, 40.0);
                vec3 lightDir = normalize(lightSourcePos - vWorldPosition);
                vec3 viewDir = normalize(vViewPosition);
                
                vec3 normal = vec3(0.0, 0.0, 1.0);
                
                float ripSpeed1 = mix(0.0, 4.0, uLoopActive);
                float ripSpeed2 = mix(2.0, 6.0, uLoopActive);
                float rippleX = (vWorldPosition.x * 0.1) - (uTime * ripSpeed1);
                float rippleY = (vWorldPosition.y * 0.1) - (uTime * ripSpeed2);
                float ripple = sin(rippleX) * cos(rippleY);
                
                normal.x += ripple * 0.2;
                normal.y += ripple * 0.2;
                normal = normalize(normal);
                
                vec3 halfVector = normalize(lightDir + viewDir);
                float spec = pow(max(dot(normal, halfVector), 0.0), 64.0); // Shininess
                
                // --- SUN GLARE ---
                vec3 visibleSunPos = vec3(100.0, 30.0, -180.0);
                float sunDist = length(vWorldPosition - visibleSunPos);
                float sunCore = 1.0 - smoothstep(32.0, 40.0, sunDist);
                float sunGlow = 1.0 - smoothstep(40.0, 160.0, sunDist);
                vec3 sunColor = uSunColor; // Dynamically colored sun
                
                float sunMixIntensity = max(sunCore, sunGlow * 0.5) * 0.33;
                float sunSpec = spec * 0.66 * smoothstep(-20.0, 10.0, vElevation);
                
                // --- MOONLIGHT SPARKLES ---
                float moonSpecAmount = pow(max(dot(normal, halfVector), 0.0), 64.0);
                float broadCone = pow(max(dot(normal, halfVector), 0.0), 4.0); // Broad illumination
                
                // Gentle, smooth noise for subtle water glints instead of chaotic white noise
                // IMPORTANT: We use .xz here so the noise maps to the flat ocean surface without stretching into "lasers"
                vec2 sparkleUV = vWorldPosition.xz * 1.5 - vec2(0.0, uTime * 0.2);
                float sparkleNoise = snoise(sparkleUV);
                
                // Only keep the absolute highest peaks for a soft, sparse glint (smaller number and size)
                float sparkles = smoothstep(0.96, 1.0, sparkleNoise);
                vec3 moonColor = vec3(0.8, 0.95, 1.0); // Bright silver/blue moon
                
                // Less intense, softer sparkles
                float moonSpec = (moonSpecAmount * 0.4 + sparkles * broadCone * 2.0) * smoothstep(-20.0, 10.0, vElevation);
                
                // Use uMist directly as a multiplier for Sun Reflection (scales 0.0 to 3.0)
                float sunWeight = uMist;
                float moonWeight = max(0.0, 1.0 - uMist * 1.5); // Fades completely as sun gets stronger
                
                // Apply ONLY sun ambient to water (leave wave base color alone for the moon per user request!)
                finalColor = mix(finalColor, sunColor, sunMixIntensity * sunWeight);
                
                float glareMix = (sunSpec * sunWeight) + (moonSpec * moonWeight);
                vec3 glareColor = mix(moonColor, sunColor, sunWeight);
                
                // Don't add glare on the foam
                glareMix *= (1.0 - isFoam);
                finalColor += glareColor * glareMix;
                
                gl_FragColor = vec4(finalColor, alpha);
            }
        `,a=new ft({vertexShader:i,fragmentShader:n,uniforms:t,transparent:!0,side:Mt,wireframe:!1});this.tsunamiMaterial=a;const r=new We(e,a);r.rotation.x=-Math.PI/2,r.position.y=-40,r.position.z=-50,r.position.x=0,r.frustumCulled=!1,this.tsunamiGroup.add(r);const l="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
            <g>
                <polygon points="46,35 54,35 50,8"  fill="#ffffff" transform="rotate(0,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ffffff" transform="rotate(45,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ffffff" transform="rotate(90,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ffffff" transform="rotate(135,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ffffff" transform="rotate(180,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ffffff" transform="rotate(225,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ffffff" transform="rotate(270,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ffffff" transform="rotate(315,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ffffff" transform="rotate(22.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ffffff" transform="rotate(67.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ffffff" transform="rotate(112.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ffffff" transform="rotate(157.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ffffff" transform="rotate(202.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ffffff" transform="rotate(247.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ffffff" transform="rotate(292.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ffffff" transform="rotate(337.5,50,50)"/>
                <circle cx="50" cy="50" r="15" fill="none" stroke="#ffffff" stroke-width="5"/>
            </g>
        </svg>`),c=new pn().load(l),u=new jl({map:c,color:16777215,transparent:!0,depthWrite:!1,fog:!1});this.tsunamiSun=new Nm(u),this.tsunamiSun.scale.set(60,60,1),this.tsunamiSun.position.set(70,50,-120),this.tsunamiSun.material.uniforms={uMist:{value:1}},this.tsunamiGroup.add(this.tsunamiSun);const h=`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,d=`
            varying vec2 vUv;
            uniform float uMoonPhase;
            uniform float uOpacity;
            
            float circleSDF(vec2 p, float r) {
                return length(p) - r;
            }
            
            void main() {
                if (uOpacity <= 0.0) discard;
                
                vec2 uv = vUv * 2.0 - 1.0;
                float d = circleSDF(uv, 0.5);
                
                // 3D Sphere lighting for realistic phases
                float z = sqrt(max(0.0, 0.5*0.5 - dot(uv, uv)));
                vec3 normal = normalize(vec3(uv, z));
                
                float moonAlpha = smoothstep(0.02, -0.02, d);
                
                // Light direction based on phase
                float anglePhase = uMoonPhase * 3.14159; 
                vec3 lightDir = normalize(vec3(sin(anglePhase), 0.0, -cos(anglePhase)));
                float diff = max(dot(normal, lightDir), 0.0);
                
                // Simple crater noise
                float n = fract(sin(dot(uv * 15.0, vec2(12.9898, 78.233))) * 43758.5453) * 0.15;
                vec3 moonBase = vec3(0.8, 0.85, 0.9);
                vec3 litMoon = moonBase * (diff - n) * 1.2;
                
                // Eclipse aura
                float eclipseAura = 0.0;
                if (uMoonPhase < 0.1) {
                    eclipseAura = exp(-max(0.0, d) * 8.0) * (1.0 - (uMoonPhase * 10.0));
                }
                
                vec3 finalMoon = litMoon * moonAlpha;
                finalMoon += vec3(0.8, 0.9, 1.0) * eclipseAura;
                
                gl_FragColor = vec4(finalMoon, max(moonAlpha, eclipseAura) * uOpacity);
            }
        `,f=new ft({vertexShader:h,fragmentShader:d,uniforms:{uMoonPhase:{value:1},uOpacity:{value:0}},transparent:!0,depthWrite:!1}),v=new Jt(100,100);this.tsunamiMoon=new We(v,f),this.tsunamiMoon.position.set(70,50,-120),this.tsunamiGroup.add(this.tsunamiMoon)}initSnowflake(){for(;this.snowflakeGroup.children.length>0;){const f=this.snowflakeGroup.children[0];this.snowflakeGroup.remove(f),f.geometry&&f.geometry.dispose(),f.material&&f.material.dispose()}this._snowData=null;const e=this.snowCount||200,t=new Float32Array(e*3),i=new Float32Array(e),n=new Float32Array(e),a=new Float32Array(e),r=new Float32Array(e),o=new Float32Array(e),l=new Float32Array(e);for(let f=0;f<e;f++){const v=f*3;t[v]=(Math.random()-.5)*80,t[v+1]=(Math.random()-.5)*60,t[v+2]=-40+Math.random()*35;const _=(t[v+2]+40)/35;i[f]=1.5+_*8,n[f]=.2+_*.6,a[f]=Math.random()*Math.PI*2,r[f]=.015+Math.random()*.04+_*.03,o[f]=.01+Math.random()*.02,l[f]=.4+Math.random()*.8}const c=new Ze;c.setAttribute("position",new st(t,3)),c.setAttribute("aSize",new st(i,1)),c.setAttribute("aOpacity",new st(n,1));const u=this.createSnowflakeTexture(),h=new ft({uniforms:{uTexture:{value:u},uColor:{value:this.customColor?this.customColor.clone():new he(10875883)},uIntensity:{value:0},uSizeMultiplier:{value:this.snowSizeOverride},uGlowAmount:{value:.5}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:Ye}),d=new hi(c,h);this.snowflakeGroup.add(d),this._snowData={count:e,positions:t,phases:a,speeds:r,drifts:o,driftFreqs:l,points:d,material:h,spinMeshes:[],spinSpeeds:[]}}setSnowSize(e){this._snowData?.material&&(this._snowData.material.uniforms.uSizeMultiplier.value=Math.max(.2,Math.min(4,e)))}setSnowCount(e){this.snowCount=parseInt(e)||200,this.snowflakeGroup&&this.snowflakeGroup.visible&&this.initSnowflake()}setSnowDrift(e){this.snowDriftMultiplier=parseFloat(e)||1}setSnowGlow(e){this._snowData?.material&&(this._snowData.material.uniforms.uGlowAmount.value=Math.max(0,Math.min(1,e)))}initLava(){this.lavaBlobs=[];const e=16;this.lavaUniforms={uBlobs:{value:[]},uColor:{value:new he(pe.visualColors?.lava||16737792)},uSecondaryColor:{value:new he(16755200)},uTime:{value:0},uLoopTime:{value:0},uIntensity:{value:0},uResolution:{value:new ne(window.innerWidth,window.innerHeight)}};for(let r=0;r<e;r++)this.lavaUniforms.uBlobs.value.push(new at(0,-100,0,0));const t=new ft({uniforms:this.lavaUniforms,vertexShader:`
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
            `,transparent:!0,blending:Ye,depthWrite:!1,side:Mt}),i=new Jt(100,100),n=new We(i,t);n.position.z=-5,[{count:5,minSize:1,maxSize:1.5},{count:7,minSize:1.5,maxSize:2.2},{count:4,minSize:2.2,maxSize:3.5}].forEach(r=>{for(let o=0;o<r.count;o++){const l=r.minSize+Math.random()*(r.maxSize-r.minSize),c=["heating","rising","cooling","falling"],u=c[Math.floor(Math.random()*c.length)],h=-18+Math.random()*4,d=18+Math.random()*4;let f=0,v=.5;u==="heating"?(f=h,v=Math.random()*.5):u==="rising"?(f=h+Math.random()*(d-h),v=.8+Math.random()*.2):u==="cooling"?(f=d,v=1-Math.random()*.3):u==="falling"&&(f=d-Math.random()*(d-h),v=.2+Math.random()*.3),this.lavaBlobs.push({position:new A((Math.random()-.5)*12,f,(Math.random()-.5)*6),material:{uniforms:{uTemp:{value:0},uIntensity:{value:0},uTime:{value:0}}},userData:{baseSize:l,state:u,temperature:v,floatMin:h,floatMax:d,heatRate:.15+Math.random()*.3,coolRate:.15+Math.random()*.3,riseSpeed:(.04+Math.random()*.05)/(l*.5),fallSpeed:(.05+Math.random()*.05)/(l*.5),driftPhase:Math.random()*Math.PI*2,driftSpeed:.01+Math.random()*.02}})}}),this.lavaGroup.add(n),this.lavaGroup.visible=!1}initFireplace(){const i=new Jt(100,80);this.fireMaterial=this.createFireShader(),this.fireMesh=new We(i,this.fireMaterial),this.fireMesh.position.set(0,0,-15),this.fireMesh.renderOrder=10,this.fireplaceGroup.add(this.fireMesh),this.fireLight=new y0(16737792,5,200),this.fireLight.position.set(0,0,30),this.fireplaceGroup.add(this.fireLight);const n=650,a=new Ze,r=[];for(let o=0;o<n;o++)r.push((Math.random()-.5)*100,-20+Math.random()*40,-15+(Math.random()-.5)*20);a.setAttribute("position",new Ne(r,3)),this.emberMat=new Vs({color:16763904,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.8,blending:Ye,depthWrite:!1}),this.embers=new hi(a,this.emberMat),this.fireplaceGroup.add(this.embers),this.emberVelocities=new Float32Array(n);for(let o=0;o<n;o++)this.emberVelocities[o]=.02+Math.random()*.05;this.fireplaceGroup.position.set(0,0,0),this.fireplaceGroup.visible=!1}createFireShader(){return new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uColor:{value:new he(16729088)},uSpeed:{value:1},uIntensity:{value:1}},vertexShader:`
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
            `,transparent:!0,side:Mt,blending:Ye,depthWrite:!1})}initRainforest(){const e=this.batterySaver?400:1e3,t=new Ze,i=new Float32Array(e*3),n=new Float32Array(e*3);for(let a=0;a<e;a++){const r=a*3;i[r]=(Math.random()-.5)*60,i[r+1]=(Math.random()-.5)*40,i[r+2]=(Math.random()-.5)*40,n[r]=Math.random(),n[r+1]=Math.random(),n[r+2]=.08+Math.random()*.12}t.setAttribute("position",new st(i,3)),t.setAttribute("aRandom",new st(n,3)),this.rainMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:1},uColor:{value:new he(8965375)},uIntensity:{value:.6}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:Ye}),this.raindrops=new hi(t,this.rainMaterial),this.rainforestGroup.add(this.raindrops),this.rainforestGroup.visible=!1}initZenGarden(){const e=this.batterySaver?200:500,t=new Ze,i=new Float32Array(e*3),n=new Float32Array(e*3);for(let r=0;r<e;r++){const o=r*3;i[o]=(Math.random()-.5)*40,i[o+1]=(Math.random()-.5)*20,i[o+2]=(Math.random()-.5)*40,n[o]=Math.random(),n[o+1]=Math.random(),n[o+2]=Math.random()*Math.PI*2}t.setAttribute("position",new st(i,3)),t.setAttribute("aRandom",new st(n,3)),this.petalMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:1},uColor:{value:new he(16758725)},uIntensity:{value:.8}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1}),this.petals=new hi(t,this.petalMaterial),this.zenGardenGroup.add(this.petals);const a=new Jt(40,40,32,32);this.zenWaterMaterial=new At({color:2245734,transparent:!0,opacity:.3,side:Mt}),this.zenWater=new We(a,this.zenWaterMaterial),this.zenWater.rotation.x=-Math.PI/2,this.zenWater.position.y=-5,this.zenGardenGroup.add(this.zenWater),this.zenGardenGroup.visible=!1}initOcean(){const e=new Jt(300,100,128,64);this.oceanWave=new We(e,new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uColor:{value:this.customColor?this.customColor.clone():new he(43775)},uNormBass:{value:0},uBeatPulse:{value:0}},vertexShader:`
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
            `,wireframe:!0,transparent:!0,side:Mt})),this.oceanWave.rotation.x=-Math.PI/3,this.oceanWave.position.y=-2,this.oceanGroup.add(this.oceanWave);const t=300,i=new Ze,n=[];for(let o=0;o<t;o++)n.push((Math.random()-.5)*50),n.push(-2.5+Math.random()*.5),n.push((Math.random()-.5)*40);i.setAttribute("position",new Ne(n,3));const a=new Vs({color:16777215,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.5,blending:Ye,depthWrite:!1});this.oceanFoam=new hi(i,a),this.oceanGroup.add(this.oceanFoam),this.oceanGroup.visible=!1;const r=this.customColors?.ocean||this.customColor;r&&(this.oceanWave&&this.oceanWave.material.color.copy(r),this.oceanFoam&&this.oceanFoam.material.color.copy(r))}createCyberTexture(e=this.matrixConfig){const i=document.createElement("canvas");i.width=1024,i.height=1024;const n=i.getContext("2d");n.fillStyle="rgba(0,0,0,0)",n.fillRect(0,0,1024,1024),n.shadowBlur=12,n.shadowColor="rgba(255, 255, 255, 0.4)",n.font='bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace',n.fillStyle="#ffffff",n.textAlign="center",n.textBaseline="middle";const a=8,r=8,o=1024/a,l=1024/r;let c="🪷MINDWAVE";const u=e.logicMode,h=e.customText;u==="custom"||u==="txt"?c="🪷"+(h&&h.length>0?h:"WELCOME TO MINDWAVE"):(u==="random"||u==="rnd"||u==="matrix"||u==="int"||u==="interstellar")&&(c="");const d=u==="matrix"||u==="int"||u==="interstellar"?[]:["LOGO",...c],f=d.length;for(let _=0;_<64;_++){const m=_%8,p=Math.floor(_/8);n.fillStyle="rgba(0,0,0,0)",n.fillRect(m*o,p*l,o,l),n.save(),n.translate(m*o+o/2,p*l+l/2);let y="",g=!1;if(_<f){const b=d[_];b==="LOGO"?g=!0:y=b}else{const P="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";y=P.charAt(Math.floor(Math.random()*P.length)),Math.random()>.5&&(n.save(),n.scale(-1,1),n.fillStyle="#ffffff",n.font="bold 80px monospace",n.fillText(y,0,0),n.restore(),y="")}if(y||g)if(n.fillStyle="#ffffff",n.font="bold 80px monospace",n.textAlign="center",n.textBaseline="middle",n.shadowBlur=16,n.shadowColor="rgba(255, 255, 255, 0.6)",g)if(this.logoImage){const C=document.createElement("canvas");C.width=100,C.height=100;const E=C.getContext("2d");E.imageSmoothingEnabled=!0,E.imageSmoothingQuality="high",E.drawImage(this.logoImage,0,0,100,100);const N=E.getImageData(0,0,100,100),x=N.data;for(let M=0;M<x.length;M+=4){const D=180+(x[M]+x[M+1]+x[M+2])/3/255*75;x[M]=D,x[M+1]=D,x[M+2]=D}E.putImageData(N,0,0),n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",n.drawImage(C,-50,-50,100,100)}else!this.logoLoading&&!this.logoFailed&&(this.logoLoading=!0,new ac().load("./mindwave-logo-icon.png",P=>{if(this.logoImage=P,this.logoLoading=!1,this.cyberMaterial){const C=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=C}},void 0,P=>{this.logoFailed=!0,this.logoLoading=!1})),n.font="bold 80px monospace",n.fillStyle="#2dd4bf",n.fillText("🪷",0,0);else n.fillText(y,0,0);n.restore()}const v=new Vn(i);return v.magFilter=mt,v.minFilter=mt,v}createCyberShader(e,t=this.matrixConfig){return new ft({uniforms:{uTexture:{value:e},uColor:{value:new he(t.color||65345)},uHeadColor:{value:new he(15794160)},uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:t.speed||1},uTailLength:{value:t.length||1},uRainbow:{value:t.rainbow?1:0},uBrightness:{value:this.brightnessMultiplier||1}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:Ye})}initEnvironment(){this.sunLight=new S0(16774625,1.2),this.sunLight.position.set(50,100,50),this.scene.add(this.sunLight),this.ambientLight=new b0(4210752,.6),this.scene.add(this.ambientLight)}ensureInitialized(e){const t=`[VizInit] ${e}`;e==="sphere"&&(!this.sphereGroup||this.sphereGroup.children.length===0)&&this.initSphere(),e==="particles"&&(!this.particleGroup||this.particleGroup.children.length===0)&&this.initParticles(),e==="lightspeed"&&(!this.lightspeedGroup||this.lightspeedGroup.children.length===0)&&this.initLightspeed(),e==="waves"&&(!this.wavesGroup||this.wavesGroup.children.length===0)&&this.initWaves(),e==="lava"&&(!this.lavaGroup||this.lavaGroup.children.length===0)&&this.initLava(),e==="fireplace"&&(!this.fireplaceGroup||this.fireplaceGroup.children.length===0)&&this.initFireplace(),e==="rainforest"&&(!this.rainforestGroup||this.rainforestGroup.children.length===0)&&this.initRainforest(),e==="zengarden"&&(!this.zenGardenGroup||this.zenGardenGroup.children.length===0)&&this.initZenGarden(),e==="ocean"&&(!this.oceanGroup||this.oceanGroup.children.length===0)&&this.initOcean(),e==="tsunami"&&(!this.tsunamiGroup||this.tsunamiGroup.children.length===0)&&this.initTsunami(),(e==="cyber"||e==="matrix")&&(!this.cyberGroup||this.cyberGroup.children.length===0)&&this.initCyber(),e==="box"&&(!this.boxGroup||this.boxGroup.children.length===0)&&this.initBox(),e==="dragon"&&(!this.dragonGroup||this.dragonGroup.children.length===0)&&this.initDragon(),e==="galaxy"&&(!this.galaxyGroup||this.galaxyGroup.children.length===0)&&this.initGalaxy(),e==="mandala"&&(!this.mandalaGroup||this.mandalaGroup.children.length===0)&&this.initMandala(),e==="snowflake"&&(!this.snowflakeGroup||this.snowflakeGroup.children.length===0)&&this.initSnowflake()}initCyber(){for(;this.cyberGroup.children.length>0;){const f=this.cyberGroup.children[0];this.cyberGroup.remove(f),f.material&&(f.material.map&&f.material.map.dispose(),f.material.dispose()),f.children&&f.traverse(v=>{v.geometry&&v.geometry.dispose(),v.material&&(v.material.map&&v.material.map.dispose(),v.material.dispose())})}this.cyberRotationGroup=null,this.cyberPoints=null;const e=80,t=120,i=new Ze,n=[],a=[],r=[],o=[],l=240,c=160,u=l/e,h=c/t;for(let f=0;f<e;f++){const v=f*u-l/2+Math.random()*.8*u,_=-20-Math.random()*2,m=.5+Math.random()*.5,p=this.matrixConfig,y=p.logicMode==="mindwave"||p.logicMode==="mw"||p.logicMode==="custom"||p.logicMode==="txt",g=p.logicMode==="matrix"||p.logicMode==="int"||p.logicMode==="interstellar",P=((p.logicMode==="custom"||p.logicMode==="txt")&&p.customText?"🪷"+p.customText:"MINDWAVE").length,C=g?Math.random()*100:0,E=g?.5+Math.random()*1.5:1,N=Math.random()*100+C;for(let x=0;x<t;x++){const M=c/2-x*h;n.push(v,M,_),y?a.push(x%(P+1)):g?a.push(Math.floor(Math.random()*64)):a.push(9+Math.floor(Math.random()*55)),r.push(N),o.push(m*E)}}i.setAttribute("position",new Ne(n,3)),i.setAttribute("aCharIndex",new Ne(a,1)),i.setAttribute("aSpawnTime",new Ne(r,1)),i.setAttribute("aSpeed",new Ne(o,1)),this.cyberGeometry=i;const d=this.createCyberTexture(this.matrixConfig);this.cyberMaterial=this.createCyberShader(d,this.matrixConfig),this.cyberRain=new hi(i,this.cyberMaterial),this.cyberRain.frustumCulled=!1,this.cyberRain.renderOrder=-1,this.cyberRotationGroup=new je,this.cyberRotationGroup.add(this.cyberRain),this.cyberGroup.add(this.cyberRotationGroup),this.currentCyberAngle!==void 0&&(this.cyberRotationGroup.rotation.z=co.degToRad(-this.currentCyberAngle))}setCyberMode(e){if(this.mindWaveMode!==e)if(this.mindWaveMode=e,this.cyberLogicMode=e?"mindwave":"classic",e&&this.cyberMaterial){const t=this.cyberMaterial.uniforms.uTexture.value,i=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=i,this.cyberMaterial.needsUpdate=!0,t&&t.dispose()}else this.initCyber()}setMode(e){const t=this.mapMode(e);this.activeModes.clear(),this.activeModes.add(t),this.cameraPitch=0,this.cameraYaw=0,this.cameraRoll=0,this.updateCameraRotation(),typeof window.resetCameraControls=="function"&&window.resetCameraControls(),this.mode=t,this.updateVisibility(),this.updateLabel(t)}mapMode(e){return{cube:"box",flow:"particles",zen:"zengarden",rain:"rainforest",interstellar:"matrix",ocean:"waves"}[e]||e}toggleMode(e){const t=this.mapMode(e);t==="matrix"&&!this.activeModes.has("matrix")&&(this.matrixConfig.logicMode||(this.matrixConfig.logicMode="interstellar")),t==="cyber"&&!this.activeModes.has("cyber")&&(this.cyberConfig.logicMode||(this.cyberConfig.logicMode="matrix"));const i=this.activeModes.has("cyber");this.activeModes.has(t)?this.activeModes.delete(t):this.activeModes.add(t),this.active=this.activeModes.size>0,this.updateVisibility(),this.updateLabel(t),this.activeModes.forEach(n=>this.ensureInitialized(n)),this.initialized&&this.active&&!this._isRendering&&(pe.animationId&&(cancelAnimationFrame(pe.animationId),pe.animationId=null),this.render()),this.mode=t,this.updateVisibility(),this.activeModes.size===0&&!i&&(this.active=!1,this.renderer&&(this.renderer.autoClearColor=!0,this.renderer.clear(),this.renderer.render(this.scene,this.camera))),this.activeModes.size===1?this.updateLabel(Array.from(this.activeModes)[0]):this.activeModes.size>1?this.updateLabel("multi"):this.updateLabel("none"),window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}})),this.updateCyberStrings&&this.updateCyberStrings()}toggleGalaxySunStyle(){const e=this.galaxySunStyle==="sun"?"sun2":this.galaxySunStyle==="sun2"?"sun3":"sun";return this.setGalaxySunStyle(e),e}updateVisibility(){if(this.activeModes.forEach(e=>this.ensureInitialized(e)),this.sphereGroup&&(this.sphereGroup.visible=this.activeModes.has("sphere")),this.particleGroup&&(this.particleGroup.visible=this.activeModes.has("particles")),this.lightspeedGroup&&(this.lightspeedGroup.visible=this.activeModes.has("lightspeed")),this.wavesGroup&&(this.wavesGroup.visible=this.activeModes.has("waves")),this.oceanGroup&&(this.oceanGroup.visible=this.activeModes.has("ocean")),this.lavaGroup&&(this.lavaGroup.visible=this.activeModes.has("lava")),this.fireplaceGroup&&(this.fireplaceGroup.visible=this.activeModes.has("fireplace")),this.rainforestGroup&&(this.rainforestGroup.visible=this.activeModes.has("rainforest")),this.zenGardenGroup&&(this.zenGardenGroup.visible=this.activeModes.has("zengarden")),this.boxGroup&&(this.boxGroup.visible=this.activeModes.has("box")),this.dragonGroup&&(this.dragonGroup.visible=this.activeModes.has("dragon")),this.galaxyGroup&&(this.galaxyGroup.visible=this.activeModes.has("galaxy")),this.mandalaGroup&&(this.mandalaGroup.visible=this.activeModes.has("mandala")),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics")),this.tsunamiGroup&&(this.tsunamiGroup.visible=this.activeModes.has("tsunami")),this.snowflakeGroup){const e=this.cymaticMaterial&&Math.abs(this.cymaticMaterial.uniforms.uMedium.value-3)<.1;this.snowflakeGroup.visible=this.activeModes.has("snowflake")||this.activeModes.has("cymatics")&&e}this.cyberGroup&&(this.cyberGroup.visible=this.activeModes.has("matrix")),this.overlayCanvas&&(this.activeModes.has("cyber")?(this.overlayCanvas.classList.remove("hidden"),this.activeModes.has("matrix")?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1):this.activeModes.size>1?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:.7}})),this.wasAutoDimmed=!0):(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1),(!this.matrixCyberStreams||this.matrixCyberStreams.length===0)&&this.generateCyberStyle()):(this.overlayCanvas.classList.add("hidden"),this.wasAutoDimmed&&(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1))),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics"),this.cymaticsGroup.position.z=2),this.updateUIPanels()}updateUIPanels(){typeof window.updateConfigPanel=="function"&&window.updateConfigPanel(),this.renderer&&this.scene&&this.camera&&this.renderer.compile(this.scene,this.camera)}updateLabel(e){const t=document.getElementById("visualLabel");t&&(e==="sphere"?t.textContent="BIO-RESONANCE":e==="particles"?t.textContent="NEURAL FLOW":e==="lightspeed"?t.textContent="WARP":e==="waves"||e==="ocean"?t.textContent="OCEAN":e==="lava"?t.textContent="LAVA LAMP":e==="fireplace"?t.textContent="FIREPLACE":e==="rainforest"?t.textContent="RAINFOREST":e==="zengarden"?t.textContent="ZEN GARDEN":e==="cymatics"?t.textContent="CYMATICS":e==="cyber"?t.textContent="CYBER":e==="matrix"?t.textContent="MATRIX":e==="snowflake"?t.textContent="SNOWFALL":e==="multi"?t.textContent="MULTI-SENSORY":t.textContent="")}initWaves(){for(this.wavesGroup||(this.wavesGroup=new je,this.scene.add(this.wavesGroup));this.wavesGroup.children.length>0;){const t=this.wavesGroup.children[0];this.wavesGroup.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}const e=new Jt(80,80,160,160);this.wavesMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uColor:{value:this.customColor?new he(this.customColor):new he(26367)},uSecondaryColor:{value:new he(62207)},uIntensity:{value:1},uNormBass:{value:0},uResolution:{value:new ne(window.innerWidth,window.innerHeight)}},vertexShader:`
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
            `,transparent:!0,wireframe:!1,side:Mt,extensions:{derivatives:!0}}),this.wavesMesh=new We(e,this.wavesMaterial),this.wavesMesh.rotation.x=-Math.PI/2.2,this.wavesMesh.position.y=-5,this.wavesMesh.position.z=-10,this.wavesGroup.add(this.wavesMesh)}setSpeed(e){this.speedMultiplier=e}setIntent(e){this.currentIntent=e,e==="delta"||e==="theta"?this.particles&&this.particles.material&&(this.particles.material.size=.3,this.particles.material.opacity=.5):e==="gamma"||e==="hyper-gamma"?(this.particles&&this.particles.material&&(this.particles.material.size=.08,this.particles.material.opacity=.9),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(16777215),this.cyberMaterial.uniforms.uTailLength.value=.4)):(this.particles&&this.particles.material&&(this.particles.material.size=.15,this.particles.material.opacity=.8),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(15794160),this.cyberMaterial.uniforms.uTailLength.value=1)),this.renderSingleFrame()}setColor(e,t=null){this.customColors||(this.customColors={}),!t||t==="all"?(this.customColors={},this.customColor=new he(e)):this.customColors[t]=new he(e);try{const i=new he(e),n={};i.getHSL(n);const a=new he().setHSL(n.h,n.s,Math.max(.1,n.l*.5)),r=new he().setHSL(n.h,n.s,Math.max(.02,n.l*.15)),o=new he().setHSL(n.h,Math.min(1,n.s*.8),.9),l=c=>{c&&(c.color&&typeof c.color.set=="function"?c.color.set(e):c.uniforms&&c.uniforms.uColor&&c.uniforms.uColor.value.set(e),c.uniforms&&c.uniforms.uSecondaryColor&&c.uniforms.uSecondaryColor.value.copy(a),c.uniforms&&c.uniforms.uDeepColor&&c.uniforms.uDeepColor.value.copy(r),c.uniforms&&c.uniforms.uSunColor&&c.uniforms.uSunColor.value.copy(o))};this.particles&&this.particles.material&&l(this.particles.material),this.lightspeed&&this.lightspeed.material&&l(this.lightspeed.material),this.sphere&&this.sphere.material&&(l(this.sphere.material),this.core&&this.core.material&&l(this.core.material)),(t==="box"||!t||t==="all")&&(this.boxOuter&&this.boxOuter.children.forEach(c=>l(c.material)),this.boxInner&&this.boxInner.children.forEach(c=>l(c.material)),this.boxEdges&&this.boxEdges.material&&l(this.boxEdges.material)),t==="mandala"&&(this.mandalaRings&&this.mandalaRings.forEach(c=>l(c.material)),this.mandalaCenter&&this.mandalaCenter.material&&l(this.mandalaCenter.material)),this.wavesMesh&&this.wavesMesh.material&&l(this.wavesMesh.material),this.lavaBlobs&&this.lavaBlobs.forEach(c=>l(c.material)),this.lavaGlow&&this.lavaGlow.material&&l(this.lavaGlow.material),this.flames&&this.flames.material&&l(this.flames.material),this.raindrops&&this.raindrops.material&&l(this.raindrops.material),this.petals&&this.petals.material&&l(this.petals.material),this.zenWater&&this.zenWater.material&&l(this.zenWater.material),this.oceanWave&&this.oceanWave.material&&l(this.oceanWave.material),this.oceanFoam&&this.oceanFoam.material&&l(this.oceanFoam.material),this.cyberRain&&this.cyberRain.material&&this.cyberRain.material.uniforms&&this.cyberRain.material.uniforms.uColor&&this.cyberRain.material.uniforms.uColor.value.set(e),this.logoMesh&&this.originalLogoImg&&this.updateLogoTexture(),this.dragonGroup&&this.updateDragonColor&&this.updateDragonColor(new he(e)),(this.galaxyStars||this.galaxySunMesh)&&this.updateGalaxyColor(new he(e)),this.cymaticMaterial&&this.cymaticMaterial.uniforms?.uColor&&this.cymaticMaterial.uniforms.uColor.value.set(e),(t==="snowflake"||!t||t==="all")&&typeof this.setSnowColor=="function"&&this.setSnowColor(e),this._snowData?.material?.uniforms?.uColor&&this._snowData.material.uniforms.uColor.value.set(e)}catch{}this.renderSingleFrame()}renderSingleFrame(){!this.renderer||!this.scene||!this.camera||(this.renderer.clear(),this.renderer.render(this.scene,this.camera))}createCircleTexture(){if(this.textures.circle)return this.textures.circle;const e=32,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d");return i.beginPath(),i.arc(e/2,e/2,e/2,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),this.textures.circle=new Vn(t),this.textures.circle}render(e,t){if(!this.initialized||!this.renderer||document.hidden||!this.active){this._isRendering=!1;return}if(!(this._isRendering&&typeof e=="number")){this._isRendering=!0;try{(typeof e=="number"||!e&&(pe.masterAnalyser||pe.analyserLeft))&&(e=pe.masterAnalyser||pe.analyserLeft,t=pe.analyserRight);let i=0,n=0,a=0;if(e){const x=e.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==x)&&(this._freqDataArray=new Uint8Array(x)),e.getByteFrequencyData(this._freqDataArray);const M=typeof this.audioSensitivity=="number"?this.audioSensitivity:1;let I=0;for(let R=0;R<15;R++)I+=this._freqDataArray[R];i=Math.pow(I/15/255,.8)*M;let D=0;for(let R=10;R<100;R++)D+=this._freqDataArray[R];n=D/90/255*M;let W=0;for(let R=100;R<300;R++)W+=this._freqDataArray[R];a=W/200/255*M}const r=Math.max(.001,this.speedMultiplier||1),o=performance.now()*.001;if(this.activeModes.has("cymatics")&&this.cymaticsCore){const x=window.visualsBeatSync!==!1&&window.cymaticsAudioSync!==!1?{bass:i||0,mids:n||0,highs:a||0}:{bass:0,mids:0,highs:0},M=window.cymaticsMouseSync!==!1?{x:this.mouseX||0,y:this.mouseY||0}:null;this.cymaticsCore.update(o*r,x,M)}this.lastTime||(this.lastTime=o);const l=Math.min(.1,o-this.lastTime);this.lastTime=o;const c=pe.visualSpeedAuto?pe.beatFrequency||10:r*10,u=Math.sin(o*Math.PI*2*c)*.5+.5,h=window.visualsBeatSync!==!1,d=this.vibrationEnabled&&h?1:0,f=(u||0)*d,v=(i||0)*d,_=(n||0)*d,m=(a||0)*d,p=d*(.02+v*.15+f*.08),y=Math.sin(o*47.3)*Math.cos(o*31.7)*p,g=Math.cos(o*53.1)*Math.sin(o*29.3)*p,b=Math.sin(o*37.9)*Math.cos(o*43.1)*p,P=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup,this.tsunamiGroup];for(const x of P)x&&x.position.set(y,g,b);if(this.activeModes.has("galaxy")&&this.galaxyGroup){const x=this.sunRotationSpeedY||.002,M=this.sunRotationSpeedZ||5e-4;if(this.galaxyStars&&(this.galaxyStars.rotation.y+=x*r*.5,this.galaxyStars.rotation.z+=M*r*.5),this.galaxySunMesh){this.galaxySunMesh.rotation.z-=M*r*1.5,this.galaxySunMesh.rotation.y+=x*r*2;const I=1+v*.15*(this.galaxySunStyle==="sun3"?2.5:1);this.galaxySunMesh.scale.setScalar(I)}this.galaxySunUniforms&&(this.galaxySunUniforms.uTime.value=o*r,this.galaxySunUniforms.uBassIntt.value=v)}if(this.activeModes.has("sphere")&&this.sphere&&(this.sphere.scale.setScalar(1+v*.15),this.sphere.rotation.y+=.005*r),this.activeModes.has("particles")&&this.particleMaterial){const x=window.MindWaveState?.envIntensities?.flow??1,M=(.015*r+v*.08+f*.05)*x;this.particleMaterial.uniforms.uTime.value=o,this.particleMaterial.uniforms.uSpeed.value=M*10,this.particleGroup.rotation.z+=(.001*r+v*.005)*x}if(this.activeModes.has("lightspeed")&&this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uTime.value=o,this.lightspeedMaterial.uniforms.uSpeed.value=r),this.activeModes.has("matrix")&&this.cyberMaterial&&(this.cyberMaterial.uniforms.uTime.value=o*r),this.activeModes.has("waves")&&this.wavesMaterial){const x=window.MindWaveState?.envIntensities?.ocean??1;this.wavesMaterial.uniforms.uTime.value=o*r*.5,this.wavesMaterial.uniforms.uNormBass.value=v*x,this.wavesMaterial.uniforms.uIntensity&&(this.wavesMaterial.uniforms.uIntensity.value=x)}if(this.activeModes.has("ocean")&&this.oceanWave&&this.oceanWave.material.uniforms){const x=window.MindWaveState?.envIntensities?.ocean??1;this.oceanWave.material.uniforms.uTime.value=o*r,this.oceanWave.material.uniforms.uNormBass.value=v*x,this.oceanWave.material.uniforms.uBeatPulse.value=f*x,this.oceanFoam&&(this.oceanFoam.material.opacity=(.4+v*.3+f*.2)*(this.brightnessMultiplier||1)*x)}if(this.activeModes.has("box")&&this.boxOuter&&(this.boxOuter.rotation.x+=.008*r+v*.02,this.boxOuter.rotation.y+=.012*r,this.boxInner&&(this.boxInner.rotation.x-=.015*r,this.boxInner.rotation.y-=.01*r,this.boxInner.scale.setScalar(.95+v*.2)),this.boxOuter.scale.setScalar(1+v*.2),this.boxEdges&&this.boxEdges.rotation.copy(this.boxOuter.rotation)),this.activeModes.has("dragon")&&this.dragonBodyInstanced&&this.dragonDummy){this.dragonGroup.rotation.y+=.005*r;const x=o*r*2,M=1+v*.2;for(let I=0;I<this.dragonLength;I++){const D=x-I*.12,W=Math.sin(D)*8,R=Math.cos(D*1.5)*4+Math.sin(D*.5)*3,F=Math.cos(D*.8)*8;this.dragonDummy.position.set(W,R,F);const H=D+.1,Y=Math.sin(H)*8,q=Math.cos(H*1.5)*4+Math.sin(H*.5)*3,X=Math.cos(H*.8)*8;this.dragonDummy.lookAt(Y,q,X);const K=1-I/this.dragonLength*.8,Q=1+Math.sin(D*4)*.15*(.5+v);this.dragonDummy.scale.setScalar(K*Q*M),this.dragonDummy.updateMatrix(),this.dragonBodyInstanced.setMatrixAt(I,this.dragonDummy.matrix),this.dragonGlowInstanced&&this.dragonGlowInstanced.setMatrixAt(I,this.dragonDummy.matrix),I===0&&this.dragonHead&&(this.dragonHead.position.copy(this.dragonDummy.position),this.dragonHead.quaternion.copy(this.dragonDummy.quaternion),this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4))}if(this.dragonBodyInstanced.instanceMatrix.needsUpdate=!0,this.dragonGlowInstanced&&(this.dragonGlowInstanced.instanceMatrix.needsUpdate=!0),this.dragonPearlGroup){const I=x+.5;this.dragonPearlGroup.position.set(Math.sin(I)*9,Math.cos(I*1.5)*5+Math.sin(I*.5)*4,Math.cos(I*.8)*9),this.dragonPearlGroup.rotation.x+=.08*r,this.dragonPearlGroup.rotation.y+=.12*r}}if(this.activeModes.has("mandala")&&this.mandalaRings&&(this.mandalaRings.forEach((x,M)=>{x.userData&&x.userData.speed&&(x.rotation.z+=x.userData.speed*r+v*.005);const I=1+f*.1*(M+1)*.3;x.scale.setScalar(I)}),this.mandalaCenter&&(this.mandalaCenter.rotation.z-=.01*r,this.mandalaCenter.scale.setScalar(1+v*.3))),this.activeModes.has("tsunami")&&this.tsunamiMaterial){const x=r*.5*(1+f*.2),M=this.tsunamiMaterial.uniforms.uLoopActive.value,I=this.tsunamiMaterial.uniforms.uAmplitude.value;if(this.tsunamiMaterial.uniforms.uTime.value+=l*x,this.tsunamiAnimState&&this.tsunamiAnimState.active){this.tsunamiAnimState.phase+=l,this.tsunamiAnimState.phase>10&&(this.tsunamiAnimState.phase=0);let W=this.tsunamiAnimState.phase,R=this.tsunamiAnimState.startAmp,F=this.tsunamiAnimState.startCurl,H=0;if(W<2){let Y=W/2;H=-300+300*(1-Math.pow(1-Y,3))}else if(W<4){H=0;let Y=(W-2)/2,q=1-Math.pow(1-Y,3);F=this.tsunamiAnimState.startCurl+(4-this.tsunamiAnimState.startCurl)*q}else if(W<9)H=0,F=4;else{H=0,F=4;let Y=(W-9)/1,q=Y*Y;R=this.tsunamiAnimState.startAmp*(1-q)}if(this.tsunamiMaterial.uniforms.uAmplitude.value=R,this.tsunamiMaterial.uniforms.uCurl.value=F,this.tsunamiMaterial.uniforms.uWaveOffset&&(this.tsunamiMaterial.uniforms.uWaveOffset.value=H),typeof window<"u"&&window.document){const Y=document.getElementById("tsunamiCurlSlider"),q=document.getElementById("tsunamiCurlVal");Y&&q&&(Y.value=F,q.textContent=F.toFixed(1))}}else this.tsunamiMaterial.uniforms.uWaveOffset&&(this.tsunamiMaterial.uniforms.uWaveOffset.value=0);const D=this.tsunamiMaterial.uniforms.uTime.value;if(this.customColor?(this.tsunamiMaterial.uniforms.uColor.value.copy(this.customColor),this.tsunamiMaterial.uniforms.uHasCustomColor.value=1,this.tsunamiSun&&this.tsunamiSun.material&&this.tsunamiSun.material.color.copy(this.customColor)):this.rainbowMode&&this.currentColorHsl?(this.tsunamiMaterial.uniforms.uColor.value.setHSL(this.currentColorHsl.h,this.currentColorHsl.s,this.currentColorHsl.l),this.tsunamiMaterial.uniforms.uHasCustomColor.value=1,this.tsunamiSun&&this.tsunamiSun.material&&this.tsunamiSun.material.color.setHSL(this.currentColorHsl.h,this.currentColorHsl.s,this.currentColorHsl.l)):(this.tsunamiMaterial.uniforms.uHasCustomColor.value=0,this.tsunamiSun&&this.tsunamiSun.material&&this.tsunamiSun.material.color.setHex(16763904)),this.tsunamiGroup&&this.tsunamiGroup.children.length>0){const W=this.tsunamiGroup.children[0],R=this.tsunamiMaterial.uniforms.uTime.value,H=-30-(this.tsunamiMaterial.uniforms.uAmplitude.value-1)*15,Y=-20;if(M>.5){const q=Math.min(R/12,1),X=1-Math.pow(1-q,3);W.position.x=-110+(110+H)*X,W.position.y=Y+Math.sin(R*3)*1.5}else W.position.x=H,W.position.y=Y+Math.sin(R*3)*1.5}}if(this.dimmerPlane){const x=pe&&pe.screenDimmer!==void 0?pe.screenDimmer:0;this.dimmerPlane.material.opacity=x}if(this.logoMesh){const x=pe.lotusState||"auto";let M=u;if(x==="heartbeat")if(pe.lotusHeartbeatSync)M=Math.min(1,u*.7+v*.8);else{const D=(pe.lotusHeartbeatBpm||11)/60;M=Math.sin(o*Math.PI*2*D)*.5+.5}let I=.8;x==="faded"?I=.15:x==="full"?I=1:x==="heartbeat"?I=.2+.8*M:x==="manual"?I=pe.lotusOpacity!==void 0?pe.lotusOpacity:.8:I=.4+v*.6,this._lotusCurrentOpacity===void 0&&(this._lotusCurrentOpacity=.8),this._lotusCurrentOpacity+=(I-this._lotusCurrentOpacity)*.1,this.logoMesh.material.opacity=this._lotusCurrentOpacity,x==="heartbeat"?this.logoMesh.scale.setScalar(1+M*.15):this.logoMesh.scale.setScalar(1+v*.05+f*.02)}if(this.activeModes.has("lava")&&this.lavaBlobs&&this.lavaUniforms){const x=window.MindWaveState?.envIntensities?.lava??1;this.lavaUniforms.uTime.value=o*r,this.lavaUniforms.uIntensity.value=v*x,this.lavaBlobs.forEach((M,I)=>{const D=M.userData,W=r*(1+v*.8);if(D.state==="heating"?(D.temperature+=D.heatRate*l*W,D.temperature>=1&&(D.temperature=1,D.state="rising")):D.state==="rising"?(M.position.y+=D.riseSpeed*W,M.position.y>=D.floatMax&&(D.state="cooling")):D.state==="cooling"?(D.temperature-=D.coolRate*l*W,D.temperature<=0&&(D.temperature=0,D.state="falling")):D.state==="falling"&&(M.position.y-=D.fallSpeed*W,M.position.y<=D.floatMin&&(D.state="heating")),M.position.x+=Math.sin(o*D.driftSpeed+D.driftPhase)*.02*W,this.lavaUniforms.uBlobs.value[I]){const R=D.baseSize*(.8+.5*D.temperature);this.lavaUniforms.uBlobs.value[I].set(M.position.x,M.position.y,M.position.z,R)}})}if(this.snowflakeGroup&&this.snowflakeGroup.visible&&this._snowData){const x=this._snowData,M=x.points.geometry.attributes.position.array,I=r*2;for(let D=0;D<x.count;D++){const W=D*3;M[W+1]-=x.speeds[D]*I;let R=Math.sin(o*x.driftFreqs[D]+x.phases[D])*x.drifts[D]*I*(this.snowDriftMultiplier!==void 0?this.snowDriftMultiplier:1);M[W]+=R,M[W+1]<-22&&(M[W+1]=22),M[W]>35&&(M[W]=-35),M[W]<-35&&(M[W]=35)}if(x.points.geometry.attributes.position.needsUpdate=!0,x.spinMeshes){const D=1+(v||0)*.15;x.spinMeshes.forEach((W,R)=>{W.rotation.z+=x.spinSpeeds[R]*I,W.position.y-=x.spinSpeeds[R]*.1*I,W.scale.setScalar(D),W.position.y<-25&&(W.position.y=25)})}x.material&&x.material.uniforms&&x.material.uniforms.uIntensity&&(x.material.uniforms.uIntensity.value=.2+v*.8)}if(this.activeModes.has("rainforest")&&this.rainMaterial){const x=r*.8*(1+f*.3);this.rainMaterial.uniforms.uTime.value=o,this.rainMaterial.uniforms.uSpeed.value=x,this.rainMaterial.uniforms.uIntensity.value=(.5+v*.2+f*.2)*(this.brightnessMultiplier||1)}if(this.activeModes.has("zengarden")&&this.petalMaterial){const x=r*.3*(1+f*.5);this.petalMaterial.uniforms.uTime.value=o,this.petalMaterial.uniforms.uSpeed.value=x,this.zenWater&&(this.zenWater.material.opacity=(.3+f*.2)*(this.brightnessMultiplier||1))}if(this.activeModes.has("fireplace")&&this.fireMesh&&this.fireMesh.material&&this.fireMesh.material.uniforms){const x=.8+.2*Math.sin(o*15)*Math.sin(o*7),M=this.fireMesh.material.uniforms;M.uTime&&(M.uTime.value=o*1.5*r),M.uIntensity&&(M.uIntensity.value=x+v*.5),this.fireLight&&(this.fireLight.intensity=(2+v*5)*x)}const C=performance.now(),E=C-(this._lastFrameStartTime||C);if(this._lastFrameStartTime=C,this._fpsRingBuffer&&(this._fpsRingBuffer[this._fpsRingIndex]=E,this._fpsRingIndex=(this._fpsRingIndex+1)%60,this._fpsRingCount=Math.min(60,this._fpsRingCount+1),this._fpsRingCount===60)){let x=0;for(let I=0;I<60;I++)x+=this._fpsRingBuffer[I];x/=60;const M=1e3/x;this._appStartTime||(this._appStartTime=performance.now()),M<35&&C-(this._lastLodDegradation||0)>3e3&&C-this._appStartTime>8e3&&(this.degradeLOD(),this._lastLodDegradation=C,this._fpsRingCount=0)}const N=1e3/(this.targetFPS||60);if(C-this.lastFrameRenderTime>=N){this.renderer.autoClear=!this.activeModes.has("lightspeed"),this.renderer.autoClear&&this.renderer.clear();const x=(v+(n||0)*d+m)/3,M=C-this.lastFrameRenderTime;this.particleSwarm&&this.activeModes.has("cymatics")&&this.particleSwarm.update(Math.min(M*.001,.1),x),this.postProcessor&&this.currentLodLevel!=="low"?this.postProcessor.render(this.scene,this.camera,Math.min(M*.001,.1),x):this.renderer.render(this.scene,this.camera),this.activeModes.has("cyber")&&this.renderCyberCyber(),this.lastFrameRenderTime=C}}catch(i){i.name==="TypeError"&&i.message.includes("uniforms")}finally{this._isRendering=!1}this.active&&!document.hidden?pe.animationId=requestAnimationFrame(()=>this.render(pe.masterAnalyser||pe.analyserLeft,pe.analyserRight)):pe.animationId=null}}setCyberColor(e){this.cyberConfig.color=e,this.cyberConfig.rainbow=!1,this.cyberColorCustomized=!0,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.matrixConfig.rainbow=!1,this.cyberMaterial&&this.cyberMaterial.uniforms.uColor&&(this.cyberMaterial.uniforms.uColor.value.set(e),this._tempColor.set(e),this._tempColor.r+=(1-this._tempColor.r)*.8,this._tempColor.g+=(1-this._tempColor.g)*.8,this._tempColor.b+=(1-this._tempColor.b)*.8,this.cyberMaterial.uniforms.uHeadColor&&this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor),this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=0)),this.cyberColor=e,this.cyberRainbowMode=!1,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}getAverageFrequency(e,t){let i=pe.masterAnalyser||pe.analyserLeft||pe.analyserRight;if(!i)return 0;const n=i.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==n)&&(this._freqDataArray=new Uint8Array(n));const a=this._freqDataArray;i.getByteFrequencyData(a),e===void 0&&(e=0),t===void 0&&(t=a.length);let r=0,o=0;for(let l=e;l<t&&l<a.length;l++)r+=a[l],o++;return o>0?r/o:0}setMouseInfluence(e){this.mouseInfluence=e}setGlobalSpeed(e){this.speedMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=1+(e-1)*.5)}setGlobalBrightness(e){this.brightnessMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e),this.particleMaterial&&this.particleMaterial.uniforms&&this.particleMaterial.uniforms.uIntensity&&(this.particleMaterial.uniforms.uIntensity.value=e),this.petalMaterial&&this.petalMaterial.uniforms&&this.petalMaterial.uniforms.uIntensity&&(this.petalMaterial.uniforms.uIntensity.value=e*.8)}setCyberBrightness(e){this.cyberConfig.brightness=e}setMatrixBrightness(e){this.matrixConfig.brightness=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberSpeed(e){this.cyberConfig.speed=e}setCyberLength(e){this.cyberConfig.length=e}setMatrixSpeed(e){this.matrixConfig.speed=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=e)}setMatrixLength(e){this.matrixConfig.length=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uTailLength.value=e)}setCyberRainbow(e){if(this.cyberConfig.rainbow=e,this.cyberRainbowMode=e,!e){const t=this.cyberConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(i=>{i.color=t})}}setMatrixRainbow(e){if(this.matrixConfig.rainbow=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=e?1:0),this.cyberRainbowMode=e,!e){const t=this.matrixConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(i=>{i.color=t})}}setCymaticsRainbow(e){this.cymaticsCore&&this.cymaticsCore.setRainbow(e)}setCameraRotation(e,t,i){this.cameraPitch=e*Math.PI/180,this.cameraYaw=t*Math.PI/180,this.cameraRoll=i*Math.PI/180,this.updateCameraRotation()}updateCameraRotation(){this.scene&&this.scene.rotation.set(this.cameraPitch,this.cameraYaw,this.cameraRoll)}setAudioSensitivity(e){this.audioSensitivity=e}setGeoComplexity(e){this.geoComplexity=e}setBatterySaver(e){this.batterySaver=e,this.targetFPS=e?30:60;const t=e?1:2;this.renderer&&(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t)),this.resize())}degradeLOD(){this.renderer&&(this.currentLodLevel==="high"?(this.renderer.setPixelRatio(1),this.currentLodLevel="medium",this.resize()):this.currentLodLevel==="medium"&&(this.renderer.setPixelRatio(.75),this.currentLodLevel="low",this.resize()))}updateCyberStrings(){if(!this.matrixCyberStreams)return;let e=!1,t="MINDWAVE🪷";const i=this.cyberConfig;i.logicMode==="custom"||i.logicMode==="txt"?(e=!0,t="🪷"+(i.customText||"WELCOME TO MINDWAVE")):(i.logicMode==="mindwave"||i.logicMode==="mw")&&(e=!0,t="MINDWAVE🪷");const n="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",a="0123456789·:.-+x[]<>/\\∆ΣΩ∞",r=100;this.matrixCyberStreams.forEach(o=>{if(o.chars=[],o.isTextMode=e,e&&t.length>0){const l=[...t].reverse();for(let c=0;c<r;c++)o.chars.push(l[c%l.length])}else if(i.logicMode==="matrix"||i.logicMode==="interstellar"||i.logicMode==="int")for(let l=0;l<r;l++)o.chars.push(a.charAt(Math.floor(Math.random()*a.length)));else for(let l=0;l<r;l++)o.chars.push(n.charAt(Math.floor(Math.random()*n.length)))})}setCyberLogicMode(e,t){this.cyberConfig.logicMode=e,t!==void 0&&(this.cyberConfig.customText=t),this.updateCyberStrings()}setMatrixLogicMode(e,t){if(this.matrixConfig.logicMode=e,t!==void 0&&(this.matrixConfig.customText=t),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTexture){const i=this.cyberMaterial.uniforms.uTexture.value,n=this.createCyberTexture(this.matrixConfig);this.cyberMaterial.uniforms.uTexture.value=n,this.cyberMaterial.needsUpdate=!0,i&&i.dispose()}this.initCyber()}setCyberColor(e){this.cyberConfig.color=e,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setCyberAngle(e){this.cyberConfig.angle=e}setMatrixAngle(e){this.matrixConfig.angle=e,this.currentCyberAngle=e,this.cyberRotationGroup&&(this.cyberRotationGroup.rotation.z=co.degToRad(-e))}setVibrationEnabled(e){this.vibrationEnabled=e}updateLogoTexture(){if(!this.originalLogoImg)return;const e=512;this._logoRenderCanvas||(this._logoRenderCanvas=document.createElement("canvas"),this._logoRenderCanvas.width=e,this._logoRenderCanvas.height=e);const t=this._logoRenderCanvas,i=t.getContext("2d",{willReadFrequently:!0});i.clearRect(0,0,e,e),i.drawImage(this.originalLogoImg,0,0,e,e);const n=i.getImageData(0,0,t.width,t.height),a=n.data,r=document.body.dataset.theme||"default",o=Ar[r]||Ar.default,l=o.secondary||o.accent||"#ffffff",c=this.customColors&&this.customColors.mandala?this.customColors.mandala:this.customColor,u=c?c.getHex():parseInt(o.accent.replace("#",""),16),h=parseInt(l.replace("#",""),16),d=u>>16&255,f=u>>8&255,v=u&255,_=h>>16&255,m=h>>8&255,p=h&255;this.themeType=document.body.dataset.themeType||"dark",this.themeType;for(let g=0;g<a.length;g+=4){const b=a[g],P=a[g+1],C=a[g+2],E=a[g+3];if(E<60){a[g+3]=0;continue}else a[g+3]=(E-60)*1.307;b>200&&P>200&&C>200?(a[g]=d,a[g+1]=f,a[g+2]=v):(a[g]=_,a[g+1]=m,a[g+2]=p)}i.putImageData(n,0,0);const y=new Vn(t);if(y.minFilter=Yc,y.magFilter=St,y.generateMipmaps=!0,y.wrapS=Ht,y.wrapT=Ht,this.renderer&&(y.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),this.logoMesh){const g=this.logoMesh.material.map;this.logoMesh.material.map=y,this.logoMesh.material.needsUpdate=!0,g&&g.dispose()}else{const g=new Ze,b=5.625,P=4.78,C=new Float32Array([-b/2,-P/2,0,b*1.5,-P/2,0,-b/2,P*1.5,0]),E=new Float32Array([0,0,2,0,0,2]);g.setAttribute("position",new st(C,3)),g.setAttribute("uv",new st(E,2));const N=new At({map:y,transparent:!0,opacity:.8,color:16777215,depthTest:!1,depthWrite:!1});if(this.logoMesh=new We(g,N),this.logoMesh.position.set(0,0,-10),this.logoMesh.renderOrder=999,this.scene.add(this.logoMesh),this.camera&&!this.dimmerPlane){const x=new Ze,M=2e3,I=2e3,D=new Float32Array([-M/2,-I/2,0,M*1.5,-I/2,0,-M/2,I*1.5,0]);x.setAttribute("position",new st(D,3)),this.dimmerPlane=new We(x,new At({color:0,transparent:!0,opacity:0,depthTest:!1})),this.dimmerPlane.renderOrder=998,this.dimmerPlane.position.z=-5,this.camera.add(this.dimmerPlane),this.scene.add(this.camera)}}}initOverlayLogo(){if(this.logoMesh)return;const e=new Image;e.crossOrigin="anonymous",e.src="./mindwave-logo-icon.png",e.onload=()=>{this.originalLogoImg=e,this.updateLogoTexture(),this.targetLogoOpacity!==void 0?this.setLogoOpacity(this.targetLogoOpacity):this.setLogoOpacity(.8)},e.onerror=t=>{}}setLogoOpacity(e){this.targetLogoOpacity=e,this.logoMesh&&this.logoMesh.material?this.logoMesh.material.opacity=e*this.brightnessMultiplier:!this.logoMesh&&e>0&&this.initOverlayLogo()}applyCymaticClassAndVariation(e,t){this.cymaticsCore&&(this.cymaticsCore.setPattern(e,t),this.activeModes.has("cymatics")||this.toggleMode("cymatics"))}setCymaticColor(e,t,i){if(this.cymaticsCore){if(i!==void 0)this.cymaticsCore.setColor(e,t,i);else if(e!==void 0){const n=e,a=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(a,1,n)}}}setCymaticColor2(e){if(!this.cymaticsCore)return;const t=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(t,2,new he(e))}setCymaticColor3(e){if(!this.cymaticsCore)return;const t=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(t,3,new he(e))}setCymaticParam(e,t,i){this.cymaticsCore&&this.cymaticsCore.setParam(e,t,i)}dispose(){this.active=!1,pe.animationId&&(cancelAnimationFrame(pe.animationId),pe.animationId=null),window.removeEventListener("resize",this.resize),window.removeEventListener("resize",this.resizeOverlayCanvas),window.removeEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode&&window.removeEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange&&document.removeEventListener("visibilitychange",this._boundVisibilityChange),this._boundThemeChange&&window.removeEventListener("themeChanged",this._boundThemeChange),this.canvas&&(this._boundContextLost&&this.canvas.removeEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored&&this.canvas.removeEventListener("webglcontextrestored",this._boundContextRestored)),this._boundCymaticPointer&&(window.removeEventListener("mousemove",this._boundCymaticPointer),window.removeEventListener("touchmove",this._boundCymaticPointer),this._boundCymaticPointer=null);const e=i=>{if(i)for(;i.children.length>0;){const n=i.children[0];if(i.remove(n),n.geometry&&n.geometry.dispose(),n.material){if(n.material.map&&n.material.map.dispose(),n.material.uniforms)for(const a in n.material.uniforms){const r=n.material.uniforms[a];r&&r.value&&r.value.dispose&&r.value.dispose()}n.material.dispose()}n.children&&n.children.length&&n.traverse(a=>{a.geometry&&a.geometry.dispose(),a.material&&(a.material.map&&a.material.map.dispose(),a.material.dispose())})}},t=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];this._fpsRingBuffer=null,this._tempColor=null,this._logoRenderCanvas=null,t.forEach(e),this.cyberMaterial&&(this.cyberMaterial.dispose(),this.cyberMaterial=null),this.fireMaterial&&(this.fireMaterial.dispose(),this.fireMaterial=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.lightspeedMaterial&&(this.lightspeedMaterial.dispose(),this.lightspeedMaterial=null),this.rainMaterial&&(this.rainMaterial.dispose(),this.rainMaterial=null),this.petalMaterial&&(this.petalMaterial.dispose(),this.petalMaterial=null),this.logoMesh&&(this.logoMesh.material&&(this.logoMesh.material.map&&this.logoMesh.material.map.dispose(),this.logoMesh.material.dispose()),this.logoMesh.geometry&&this.logoMesh.geometry.dispose(),this.scene&&this.scene.remove(this.logoMesh),this.logoMesh=null);for(const i in this.textures)this.textures[i]&&this.textures[i].dispose&&this.textures[i].dispose();if(this.textures={},this._freqDataArray=null,this.renderer){try{this.renderer.forceContextLoss()}catch{}this.renderer.dispose(),this.renderer=null}this.scene=null,this.camera=null}setWarpSpeed(e){this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uSpeed.value=e)}setWarpFov(e){this.camera&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setWarpChromatic(e){this.lightspeedMaterial}}function F0(){return le?Promise.resolve(le):new Promise(s=>{A0(),setTimeout(()=>s(le),10)})}function A0(){if(!le&&Qt.canvas&&Qt.canvas.activeVisualizer&&Qt.canvas.activeVisualizer.isVisualizer3D&&(le=Qt.canvas.activeVisualizer),Qt.canvas&&Qt.canvas.activeVisualizer){if(le&&Qt.canvas.activeVisualizer===le)return le;Qt.canvas.activeVisualizer.dispose(),Qt.canvas.activeVisualizer=null,le=null}pe.animationId&&(cancelAnimationFrame(pe.animationId),pe.animationId=null);const s=Qt.canvas||document.getElementById("visualizer");if(!le&&s){const e=s&&s.activeVisualizer&&s.activeVisualizer.isVisualizer3D?{activeModes:s.activeVisualizer.activeModes,mode:s.activeVisualizer.mode,mindWaveMode:s.activeVisualizer.mindWaveMode,cyberLogicMode:s.activeVisualizer.cyberLogicMode,cyberCustomText:s.activeVisualizer.cyberCustomText,currentCyberAngle:s.activeVisualizer.currentCyberAngle,cyberSpeedMultiplier:s.activeVisualizer.cyberSpeedMultiplier,rainbowEnabled:s.activeVisualizer._rainbowEnabled}:{};le=new E0(s,e),s.activeVisualizer=le,setTimeout(()=>{le&&(le.updateVisibility(),R0())},0)}return le}function N0(){return le}let Mr=!1;function O0(){Mr=!0,le&&pe.animationId&&(cancelAnimationFrame(pe.animationId),pe.animationId=null,le.renderer&&le.scene&&le.camera&&le.renderer.render(le.scene,le.camera))}function R0(){le&&!pe.animationId&&(le.active=!0,le.render(pe.masterAnalyser||pe.analyserLeft,pe.analyserRight),Mr=!1)}function z0(){return Mr}function B0(s){le&&le.toggleMode(s)}function G0(s){le&&(le.setGlobalSpeed(s),le.setCyberSpeed&&le.setCyberSpeed(s))}function V0(s,e=null){le&&(le.setVisualColor(s,e),le.setCyberColor&&(!e||e=="cyber")&&le.setCyberColor(s))}function H0(s){le&&le.setGlobalBrightness&&le.setGlobalBrightness(s)}function k0(s){le&&le.setLogoOpacity(s)}function W0(s){le&&le.setMouseInfluence(s)}window.toggleGalaxySun=function(){return le?le.toggleGalaxySunStyle():null};window.setCymaticPattern=function(s,e){s===0&&(s=22,e=8),le&&le.cymaticsCore?(le.cymaticsCore.setPattern(s,e),le.activeModes.has("cymatics")||(window.switchRightTab&&window.switchRightTab("cymatics",document.querySelector('.tab-pill[title="Cymatics"]')),le.activeModes.add("cymatics"),le.cymaticsGroup.visible=!0)):(window.setVisualMode&&window.setVisualMode("cymatics"),setTimeout(()=>{le&&le.cymaticsCore&&le.cymaticsCore.setPattern(s,e)},500))};window.setCymaticColor=function(s,e,t){le&&le.cymaticsCore&&le.cymaticsCore.setColor(s,e,t)};window.setCymaticParam=function(s,e,t){le&&le.cymaticsCore&&le.cymaticsCore.setParam(s,e,t)};window.setConstellationLayer2Type=function(s){le&&le.cymaticsCore&&le.cymaticsCore.setConstellationLayer2Type(s)};let qa=null,ei=null,jt=null,Ft=null,ar=!0;window.toggleQuantumHum=function(s){if(ar=s,Ft&&ei){const e=ei.currentTime;if(Ft.gain.cancelScheduledValues(e),Ft.gain.setValueAtTime(Ft.gain.value,e),!s)Ft.gain.linearRampToValueAtTime(0,e+.5);else{const i=(document.getElementById("observerToggle")?document.getElementById("observerToggle").checked:!1)?.3:.15;Ft.gain.linearRampToValueAtTime(i,e+.5)}}};window.toggleObserverEffect=function(s){if(!le||!le.cymaticsCore)return;le.cymaticsCore.activeClassId!==25&&window.setCymaticPattern(25,0);const e=s?1:0,t=le.cymaticsCore.materials[25];if(!t)return;try{if(!ei){const a=window.AudioContext||window.webkitAudioContext;ei=new a}ei.state==="suspended"&&ei.resume(),jt||(jt=ei.createOscillator(),Ft=ei.createGain(),jt.type="triangle",jt.frequency.value=108,Ft.gain.value=0,jt.connect(Ft),Ft.connect(ei.destination),jt.start());const n=ei.currentTime;Ft.gain.cancelScheduledValues(n),jt.frequency.cancelScheduledValues(n),Ft.gain.setValueAtTime(Ft.gain.value,n),jt.frequency.setValueAtTime(jt.frequency.value,n),s?(ar&&Ft.gain.linearRampToValueAtTime(.3,n+1),jt.frequency.exponentialRampToValueAtTime(216,n+1)):(ar&&Ft.gain.linearRampToValueAtTime(.15,n+1),jt.frequency.exponentialRampToValueAtTime(108,n+1))}catch{}qa&&cancelAnimationFrame(qa);const i=()=>{let n=t.uniforms.uObserver.value;const a=e-n;if(Math.abs(a)<.01){t.uniforms.uObserver.value=e;return}t.uniforms.uObserver.value=n+a*.05,qa=requestAnimationFrame(i)};i()};export{E0 as Visualizer3D,N0 as getVisualizer,A0 as initVisualizer,z0 as isVisualsPaused,O0 as pauseVisuals,F0 as preloadVisualizer,R0 as resumeVisuals,W0 as setMouseInfluence,H0 as setVisualBrightness,V0 as setVisualColor,k0 as setVisualLogoOpacity,G0 as setVisualSpeed,B0 as toggleVisual};
