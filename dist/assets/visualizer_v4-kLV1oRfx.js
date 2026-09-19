var pc=Object.defineProperty;var mc=(n,e,t)=>e in n?pc(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Ar=(n,e,t)=>mc(n,typeof e!="symbol"?e+"":e,t);import{aT as ve,T as Rr,p as Qt}from"./share-Cm8m-ra_.js";import"./preload-helper-BxaVoaJg.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rr="160",vc=0,Pr=1,gc=2,_l=1,xc=2,fi=3,pi=0,Nt=1,Mt=2,bi=0,Mn=1,Ye=2,Lr=3,Ir=4,_c=5,Fi=100,yc=101,Mc=102,Dr=103,Ur=104,Sc=200,bc=201,wc=202,Tc=203,Xa=204,Ya=205,Cc=206,Ec=207,Ac=208,Rc=209,Pc=210,Lc=211,Ic=212,Dc=213,Uc=214,Fc=0,Nc=1,Oc=2,Hs=3,zc=4,Bc=5,Gc=6,Vc=7,yl=0,Hc=1,kc=2,wi=0,Wc=1,qc=2,Xc=3,Yc=4,Zc=5,Kc=6,Ml=300,wn=301,Tn=302,Za=303,Ka=304,Js=306,Ni=1e3,Ht=1001,ja=1002,mt=1003,Fr=1004,ra=1005,St=1006,jc=1007,Kn=1008,Jc=1008,Ti=1009,$c=1010,Qc=1011,or=1012,Sl=1013,Mi=1014,Si=1015,jn=1016,bl=1017,wl=1018,Oi=1020,eu=1021,qt=1023,tu=1024,iu=1025,zi=1026,Cn=1027,nu=1028,Tl=1029,su=1030,Cl=1031,El=1033,oa=33776,la=33777,ca=33778,ua=33779,Nr=35840,Or=35841,zr=35842,Br=35843,Al=36196,Gr=37492,Vr=37496,Hr=37808,kr=37809,Wr=37810,qr=37811,Xr=37812,Yr=37813,Zr=37814,Kr=37815,jr=37816,Jr=37817,$r=37818,Qr=37819,eo=37820,to=37821,ha=36492,io=36494,no=36495,au=36283,so=36284,ao=36285,ro=36286,Rl=3e3,Bi=3001,ru=3200,ou=3201,lu=0,cu=1,Xt="",bt="srgb",mi="srgb-linear",lr="display-p3",$s="display-p3-linear",ks="linear",nt="srgb",Ws="rec709",qs="p3",qi=7680,oo=519,uu=512,hu=513,fu=514,Pl=515,du=516,pu=517,mu=518,vu=519,Ja=35044,lo="300 es",$a=1035,di=2e3,Xs=2001;class An{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let co=1234567;const Sn=Math.PI/180,Jn=180/Math.PI;function ni(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[i&255]+Ct[i>>8&255]+Ct[i>>16&255]+Ct[i>>24&255]).toLowerCase()}function wt(n,e,t){return Math.max(e,Math.min(t,n))}function cr(n,e){return(n%e+e)%e}function gu(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function xu(n,e,t){return n!==e?(t-n)/(e-n):0}function kn(n,e,t){return(1-t)*n+t*e}function _u(n,e,t,i){return kn(n,e,1-Math.exp(-t*i))}function yu(n,e=1){return e-Math.abs(cr(n,e*2)-e)}function Mu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Su(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function bu(n,e){return n+Math.floor(Math.random()*(e-n+1))}function wu(n,e){return n+Math.random()*(e-n)}function Tu(n){return n*(.5-Math.random())}function Cu(n){n!==void 0&&(co=n);let e=co+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Eu(n){return n*Sn}function Au(n){return n*Jn}function Qa(n){return(n&n-1)===0&&n!==0}function Ru(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ys(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Pu(n,e,t,i,s){const a=Math.cos,r=Math.sin,o=a(t/2),l=r(t/2),c=a((e+i)/2),u=r((e+i)/2),h=a((e-i)/2),d=r((e-i)/2),f=a((i-e)/2),v=r((i-e)/2);switch(s){case"XYX":n.set(o*u,l*h,l*d,o*c);break;case"YZY":n.set(l*d,o*u,l*h,o*c);break;case"ZXZ":n.set(l*h,l*d,o*u,o*c);break;case"XZX":n.set(o*u,l*v,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*v,o*c);break;case"ZYZ":n.set(l*v,l*f,o*u,o*c);break;default:}}function ii(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Je(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const uo={DEG2RAD:Sn,RAD2DEG:Jn,generateUUID:ni,clamp:wt,euclideanModulo:cr,mapLinear:gu,inverseLerp:xu,lerp:kn,damp:_u,pingpong:yu,smoothstep:Mu,smootherstep:Su,randInt:bu,randFloat:wu,randFloatSpread:Tu,seededRandom:Cu,degToRad:Eu,radToDeg:Au,isPowerOfTwo:Qa,ceilPowerOfTwo:Ru,floorPowerOfTwo:Ys,setQuaternionFromProperEuler:Pu,normalize:Je,denormalize:ii};class ae{constructor(e=0,t=0){ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*i-r*s+e.x,this.y=a*s+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,i,s,a,r,o,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c)}set(e,t,i,s,a,r,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=a,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],v=i[8],x=s[0],m=s[3],p=s[6],_=s[1],g=s[4],S=s[7],A=s[2],T=s[5],E=s[8];return a[0]=r*x+o*_+l*A,a[3]=r*m+o*g+l*T,a[6]=r*p+o*S+l*E,a[1]=c*x+u*_+h*A,a[4]=c*m+u*g+h*T,a[7]=c*p+u*S+h*E,a[2]=d*x+f*_+v*A,a[5]=d*m+f*g+v*T,a[8]=d*p+f*S+v*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*r*u-t*o*c-i*a*u+i*o*l+s*a*c-s*r*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*r-o*c,d=o*l-u*a,f=c*a-r*l,v=t*h+i*d+s*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=h*x,e[1]=(s*c-u*i)*x,e[2]=(o*i-s*r)*x,e[3]=d*x,e[4]=(u*t-s*l)*x,e[5]=(s*a-o*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(r*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-s*c,s*l,-s*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(fa.makeScale(e,t)),this}rotate(e){return this.premultiply(fa.makeRotation(-e)),this}translate(e,t){return this.premultiply(fa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fa=new He;function Ll(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function $n(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Lu(){const n=$n("canvas");return n.style.display="block",n}const ho={};function Wn(n){n in ho||(ho[n]=!0)}const fo=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),po=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),as={[mi]:{transfer:ks,primaries:Ws,toReference:n=>n,fromReference:n=>n},[bt]:{transfer:nt,primaries:Ws,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[$s]:{transfer:ks,primaries:qs,toReference:n=>n.applyMatrix3(po),fromReference:n=>n.applyMatrix3(fo)},[lr]:{transfer:nt,primaries:qs,toReference:n=>n.convertSRGBToLinear().applyMatrix3(po),fromReference:n=>n.applyMatrix3(fo).convertLinearToSRGB()}},Iu=new Set([mi,$s]),$e={enabled:!0,_workingColorSpace:mi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Iu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=as[e].toReference,s=as[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return as[n].primaries},getTransfer:function(n){return n===Xt?ks:as[n].transfer}};function bn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function da(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Xi;class Il{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Xi===void 0&&(Xi=$n("canvas")),Xi.width=e.width,Xi.height=e.height;const i=Xi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Xi}return t.width>2048||t.height>2048?t.toDataURL("image/jpeg",.6):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=$n("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=bn(a[r]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(bn(t[i]/255)*255):t[i]=bn(t[i]);return{data:t,width:e.width,height:e.height}}else return e}}let Du=0;class Dl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=ni(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(pa(s[r].image)):a.push(pa(s[r]))}else a=pa(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function pa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Il.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:{}}let Uu=0;class Rt extends An{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,i=Ht,s=Ht,a=St,r=Kn,o=qt,l=Ti,c=Rt.DEFAULT_ANISOTROPY,u=Xt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=ni(),this.name="",this.source=new Dl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Wn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Bi?bt:Xt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ml)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ni:e.x=e.x-Math.floor(e.x);break;case Ht:e.x=e.x<0?0:1;break;case ja:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ni:e.y=e.y-Math.floor(e.y);break;case Ht:e.y=e.y<0?0:1;break;case ja:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Wn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===bt?Bi:Rl}set encoding(e){Wn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Bi?bt:Xt}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=Ml;Rt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,i=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*i+r[11]*s+r[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],v=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(v+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const g=(c+1)/2,S=(f+1)/2,A=(p+1)/2,T=(u+d)/4,E=(h+x)/4,N=(v+m)/4;return g>S&&g>A?g<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(g),s=T/i,a=E/i):S>A?S<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(S),i=T/s,a=N/s):A<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(A),i=E/a,s=N/a),this.set(i,s,a,t),this}let _=Math.sqrt((m-v)*(m-v)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(_)<.001&&(_=1),this.x=(m-v)/_,this.y=(h-x)/_,this.z=(d-u)/_,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fu extends An{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(Wn("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Bi?bt:Xt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:St,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Rt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Dl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends Fu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ul extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=mt,this.minFilter=mt,this.wrapR=Ht,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nu extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=mt,this.minFilter=mt,this.wrapR=Ht,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class is{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,r,o){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const d=a[r+0],f=a[r+1],v=a[r+2],x=a[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=v,e[t+3]=x;return}if(h!==x||l!==d||c!==f||u!==v){let m=1-o;const p=l*d+c*f+u*v+h*x,_=p>=0?1:-1,g=1-p*p;if(g>Number.EPSILON){const A=Math.sqrt(g),T=Math.atan2(A,p*_);m=Math.sin(m*T)/A,o=Math.sin(o*T)/A}const S=o*_;if(l=l*m+d*S,c=c*m+f*S,u=u*m+v*S,h=h*m+x*S,m===1-o){const A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,a,r){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=a[r],d=a[r+1],f=a[r+2],v=a[r+3];return e[t]=o*v+u*h+l*f-c*d,e[t+1]=l*v+u*d+c*h-o*f,e[t+2]=c*v+u*f+o*d-l*h,e[t+3]=u*v-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),h=o(a/2),d=l(i/2),f=l(s/2),v=l(a/2);switch(r){case"XYZ":this._x=d*u*h+c*f*v,this._y=c*f*h-d*u*v,this._z=c*u*v+d*f*h,this._w=c*u*h-d*f*v;break;case"YXZ":this._x=d*u*h+c*f*v,this._y=c*f*h-d*u*v,this._z=c*u*v-d*f*h,this._w=c*u*h+d*f*v;break;case"ZXY":this._x=d*u*h-c*f*v,this._y=c*f*h+d*u*v,this._z=c*u*v+d*f*h,this._w=c*u*h-d*f*v;break;case"ZYX":this._x=d*u*h-c*f*v,this._y=c*f*h+d*u*v,this._z=c*u*v-d*f*h,this._w=c*u*h+d*f*v;break;case"YZX":this._x=d*u*h+c*f*v,this._y=c*f*h+d*u*v,this._z=c*u*v-d*f*h,this._w=c*u*h-d*f*v;break;case"XZY":this._x=d*u*h-c*f*v,this._y=c*f*h-d*u*v,this._z=c*u*v+d*f*h,this._w=c*u*h+d*f*v;break;default:}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(a-c)*f,this._z=(r-s)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(a-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(r-s)/f,this._x=(a+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+r*o+s*c-a*l,this._y=s*u+r*l+a*o-i*c,this._z=a*u+r*c+i*l-s*o,this._w=r*u-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,r=this._w;let o=r*e._w+i*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=s,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=r*h+this._w*d,this._x=i*h+this._x*d,this._y=s*h+this._y*d,this._z=a*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),a=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(a),i*Math.cos(a),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,i=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*s-o*i),u=2*(o*t-a*s),h=2*(a*i-r*t);return this.x=t+l*c+r*h-o*u,this.y=i+l*u+o*c-a*h,this.z=s+l*h+a*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ma.copy(this).projectOnVector(e),this.sub(ma)}reflect(e){return this.sub(ma.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ma=new R,mo=new is;class Hi{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Yt):Yt.fromBufferAttribute(a,r),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),rs.copy(i.boundingBox)),rs.applyMatrix4(e.matrixWorld),this.union(rs)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ln),os.subVectors(this.max,Ln),Yi.subVectors(e.a,Ln),Zi.subVectors(e.b,Ln),Ki.subVectors(e.c,Ln),vi.subVectors(Zi,Yi),gi.subVectors(Ki,Zi),Ri.subVectors(Yi,Ki);let t=[0,-vi.z,vi.y,0,-gi.z,gi.y,0,-Ri.z,Ri.y,vi.z,0,-vi.x,gi.z,0,-gi.x,Ri.z,0,-Ri.x,-vi.y,vi.x,0,-gi.y,gi.x,0,-Ri.y,Ri.x,0];return!va(t,Yi,Zi,Ki,os)||(t=[1,0,0,0,1,0,0,0,1],!va(t,Yi,Zi,Ki,os))?!1:(ls.crossVectors(vi,gi),t=[ls.x,ls.y,ls.z],va(t,Yi,Zi,Ki,os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ri=[new R,new R,new R,new R,new R,new R,new R,new R],Yt=new R,rs=new Hi,Yi=new R,Zi=new R,Ki=new R,vi=new R,gi=new R,Ri=new R,Ln=new R,os=new R,ls=new R,Pi=new R;function va(n,e,t,i,s){for(let a=0,r=n.length-3;a<=r;a+=3){Pi.fromArray(n,a);const o=s.x*Math.abs(Pi.x)+s.y*Math.abs(Pi.y)+s.z*Math.abs(Pi.z),l=e.dot(Pi),c=t.dot(Pi),u=i.dot(Pi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ou=new Hi,In=new R,ga=new R;class ki{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Ou.setFromPoints(e).getCenter(i);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;In.subVectors(e,this.center);const t=In.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(In,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(In.copy(e.center).add(ga)),this.expandByPoint(In.copy(e.center).sub(ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const oi=new R,xa=new R,cs=new R,xi=new R,_a=new R,us=new R,ya=new R;class ur{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,t),oi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){xa.copy(e).add(t).multiplyScalar(.5),cs.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(xa);const a=e.distanceTo(t)*.5,r=-this.direction.dot(cs),o=xi.dot(this.direction),l=-xi.dot(cs),c=xi.lengthSq(),u=Math.abs(1-r*r);let h,d,f,v;if(u>0)if(h=r*l-o,d=r*o-l,v=a*u,h>=0)if(d>=-v)if(d<=v){const x=1/u;h*=x,d*=x,f=h*(h+r*d+2*o)+d*(r*h+d+2*l)+c}else d=a,h=Math.max(0,-(r*d+o)),f=-h*h+d*(d+2*l)+c;else d=-a,h=Math.max(0,-(r*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-r*a+o)),d=h>0?-a:Math.min(Math.max(-a,-l),a),f=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-a,-l),a),f=d*(d+2*l)+c):(h=Math.max(0,-(r*a+o)),d=h>0?a:Math.min(Math.max(-a,-l),a),f=-h*h+d*(d+2*l)+c);else d=r>0?-a:a,h=Math.max(0,-(r*d+o)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(xa).addScaledVector(cs,d),f}intersectSphere(e,t){oi.subVectors(e.center,this.origin);const i=oi.dot(this.direction),s=oi.dot(oi)-i*i,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,r,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(a=(e.min.y-d.y)*u,r=(e.max.y-d.y)*u):(a=(e.max.y-d.y)*u,r=(e.min.y-d.y)*u),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,t,i,s,a){_a.subVectors(t,e),us.subVectors(i,e),ya.crossVectors(_a,us);let r=this.direction.dot(ya),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;xi.subVectors(this.origin,e);const l=o*this.direction.dot(us.crossVectors(xi,us));if(l<0)return null;const c=o*this.direction.dot(_a.cross(xi));if(c<0||l+c>r)return null;const u=-o*xi.dot(ya);return u<0?null:this.at(u/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(e,t,i,s,a,r,o,l,c,u,h,d,f,v,x,m){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c,u,h,d,f,v,x,m)}set(e,t,i,s,a,r,o,l,c,u,h,d,f,v,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=a,p[5]=r,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=v,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/ji.setFromMatrixColumn(e,0).length(),a=1/ji.setFromMatrixColumn(e,1).length(),r=1/ji.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const d=r*u,f=r*h,v=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+v*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=v+f*c,t[10]=r*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,v=c*u,x=c*h;t[0]=d+x*o,t[4]=v*o-f,t[8]=r*c,t[1]=r*h,t[5]=r*u,t[9]=-o,t[2]=f*o-v,t[6]=x+d*o,t[10]=r*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,v=c*u,x=c*h;t[0]=d-x*o,t[4]=-r*h,t[8]=v+f*o,t[1]=f+v*o,t[5]=r*u,t[9]=x-d*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const d=r*u,f=r*h,v=o*u,x=o*h;t[0]=l*u,t[4]=v*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-v,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const d=r*l,f=r*c,v=o*l,x=o*c;t[0]=l*u,t[4]=x-d*h,t[8]=v*h+f,t[1]=h,t[5]=r*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+v,t[10]=d-x*h}else if(e.order==="XZY"){const d=r*l,f=r*c,v=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=r*u,t[9]=f*h-v,t[2]=v*h-f,t[6]=o*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zu,e,Bu)}lookAt(e,t,i){const s=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),_i.crossVectors(i,zt),_i.lengthSq()===0&&(Math.abs(i.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),_i.crossVectors(i,zt)),_i.normalize(),hs.crossVectors(zt,_i),s[0]=_i.x,s[4]=hs.x,s[8]=zt.x,s[1]=_i.y,s[5]=hs.y,s[9]=zt.y,s[2]=_i.z,s[6]=hs.z,s[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],v=i[2],x=i[6],m=i[10],p=i[14],_=i[3],g=i[7],S=i[11],A=i[15],T=s[0],E=s[4],N=s[8],y=s[12],w=s[1],O=s[5],X=s[9],te=s[13],P=s[2],z=s[6],Z=s[10],I=s[14],U=s[3],F=s[7],V=s[11],Y=s[15];return a[0]=r*T+o*w+l*P+c*U,a[4]=r*E+o*O+l*z+c*F,a[8]=r*N+o*X+l*Z+c*V,a[12]=r*y+o*te+l*I+c*Y,a[1]=u*T+h*w+d*P+f*U,a[5]=u*E+h*O+d*z+f*F,a[9]=u*N+h*X+d*Z+f*V,a[13]=u*y+h*te+d*I+f*Y,a[2]=v*T+x*w+m*P+p*U,a[6]=v*E+x*O+m*z+p*F,a[10]=v*N+x*X+m*Z+p*V,a[14]=v*y+x*te+m*I+p*Y,a[3]=_*T+g*w+S*P+A*U,a[7]=_*E+g*O+S*z+A*F,a[11]=_*N+g*X+S*Z+A*V,a[15]=_*y+g*te+S*I+A*Y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],v=e[3],x=e[7],m=e[11],p=e[15];return v*(+a*l*h-s*c*h-a*o*d+i*c*d+s*o*f-i*l*f)+x*(+t*l*f-t*c*d+a*r*d-s*r*f+s*c*u-a*l*u)+m*(+t*c*h-t*o*f-a*r*h+i*r*f+a*o*u-i*c*u)+p*(-s*o*u-t*l*h+t*o*d+s*r*h-i*r*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],v=e[12],x=e[13],m=e[14],p=e[15],_=h*m*c-x*d*c+x*l*f-o*m*f-h*l*p+o*d*p,g=v*d*c-u*m*c-v*l*f+r*m*f+u*l*p-r*d*p,S=u*x*c-v*h*c+v*o*f-r*x*f-u*o*p+r*h*p,A=v*h*l-u*x*l-v*o*d+r*x*d+u*o*m-r*h*m,T=t*_+i*g+s*S+a*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return e[0]=_*E,e[1]=(x*d*a-h*m*a-x*s*f+i*m*f+h*s*p-i*d*p)*E,e[2]=(o*m*a-x*l*a+x*s*c-i*m*c-o*s*p+i*l*p)*E,e[3]=(h*l*a-o*d*a-h*s*c+i*d*c+o*s*f-i*l*f)*E,e[4]=g*E,e[5]=(u*m*a-v*d*a+v*s*f-t*m*f-u*s*p+t*d*p)*E,e[6]=(v*l*a-r*m*a-v*s*c+t*m*c+r*s*p-t*l*p)*E,e[7]=(r*d*a-u*l*a+u*s*c-t*d*c-r*s*f+t*l*f)*E,e[8]=S*E,e[9]=(v*h*a-u*x*a-v*i*f+t*x*f+u*i*p-t*h*p)*E,e[10]=(r*x*a-v*o*a+v*i*c-t*x*c-r*i*p+t*o*p)*E,e[11]=(u*o*a-r*h*a-u*i*c+t*h*c+r*i*f-t*o*f)*E,e[12]=A*E,e[13]=(u*x*s-v*h*s+v*i*d-t*x*d-u*i*m+t*h*m)*E,e[14]=(v*o*s-r*x*s-v*i*l+t*x*l+r*i*m-t*o*m)*E,e[15]=(r*h*s-u*o*s+u*i*l-t*h*l-r*i*d+t*o*d)*E,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,r=e.x,o=e.y,l=e.z,c=a*r,u=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*r,0,c*l-s*o,u*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,r){return this.set(1,i,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,u=r+r,h=o+o,d=a*c,f=a*u,v=a*h,x=r*u,m=r*h,p=o*h,_=l*c,g=l*u,S=l*h,A=i.x,T=i.y,E=i.z;return s[0]=(1-(x+p))*A,s[1]=(f+S)*A,s[2]=(v-g)*A,s[3]=0,s[4]=(f-S)*T,s[5]=(1-(d+p))*T,s[6]=(m+_)*T,s[7]=0,s[8]=(v+g)*E,s[9]=(m-_)*E,s[10]=(1-(d+x))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=ji.set(s[0],s[1],s[2]).length();const r=ji.set(s[4],s[5],s[6]).length(),o=ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Zt.copy(this);const c=1/a,u=1/r,h=1/o;return Zt.elements[0]*=c,Zt.elements[1]*=c,Zt.elements[2]*=c,Zt.elements[4]*=u,Zt.elements[5]*=u,Zt.elements[6]*=u,Zt.elements[8]*=h,Zt.elements[9]*=h,Zt.elements[10]*=h,t.setFromRotationMatrix(Zt),i.x=a,i.y=r,i.z=o,this}makePerspective(e,t,i,s,a,r,o=di){const l=this.elements,c=2*a/(t-e),u=2*a/(i-s),h=(t+e)/(t-e),d=(i+s)/(i-s);let f,v;if(o===di)f=-(r+a)/(r-a),v=-2*r*a/(r-a);else if(o===Xs)f=-r/(r-a),v=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,a,r,o=di){const l=this.elements,c=1/(t-e),u=1/(i-s),h=1/(r-a),d=(t+e)*c,f=(i+s)*u;let v,x;if(o===di)v=(r+a)*h,x=-2*h;else if(o===Xs)v=a*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ji=new R,Zt=new Qe,zu=new R(0,0,0),Bu=new R(1,1,1),_i=new R,hs=new R,zt=new R,vo=new Qe,go=new is;class Qs{constructor(e=0,t=0,i=0,s=Qs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-wt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,f),this._y=0);break;default:}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return vo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return go.setFromEuler(this),this.setFromQuaternion(go,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qs.DEFAULT_ORDER="XYZ";class Fl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gu=0;const xo=new R,Ji=new is,li=new Qe,fs=new R,Dn=new R,Vu=new R,Hu=new is,_o=new R(1,0,0),yo=new R(0,1,0),Mo=new R(0,0,1),ku={type:"added"},Wu={type:"removed"};class pt extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new R,t=new Qs,i=new is,s=new R(1,1,1);function a(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qe},normalMatrix:{value:new He}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(_o,e)}rotateY(e){return this.rotateOnAxis(yo,e)}rotateZ(e){return this.rotateOnAxis(Mo,e)}translateOnAxis(e,t){return xo.copy(e).applyQuaternion(this.quaternion),this.position.add(xo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_o,e)}translateY(e){return this.translateOnAxis(yo,e)}translateZ(e){return this.translateOnAxis(Mo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fs.copy(e):fs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Dn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(Dn,fs,this.up):li.lookAt(fs,Dn,this.up),this.quaternion.setFromRotationMatrix(li),s&&(li.extractRotation(s.matrixWorld),Ji.setFromRotationMatrix(li),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?this:(e&&e.isObject3D&&(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ku)),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dn,e,Vu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dn,Hu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const a=t[i];(a.matrixWorldAutoUpdate===!0||e===!0)&&a.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++){const o=s[a];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];a(e.shapes,h)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),h=r(e.shapes),d=r(e.skeletons),f=r(e.animations),v=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),v.length>0&&(i.nodes=v)}return i.object=s,i;function r(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}pt.DEFAULT_UP=new R(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kt=new R,ci=new R,Ma=new R,ui=new R,$i=new R,Qi=new R,So=new R,Sa=new R,ba=new R,wa=new R;let ds=!1;class Gt{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Kt.subVectors(e,t),s.cross(Kt);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){Kt.subVectors(s,t),ci.subVectors(i,t),Ma.subVectors(e,t);const r=Kt.dot(Kt),o=Kt.dot(ci),l=Kt.dot(Ma),c=ci.dot(ci),u=ci.dot(Ma),h=r*c-o*o;if(h===0)return a.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,v=(r*u-o*l)*d;return a.set(1-f-v,v,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getUV(e,t,i,s,a,r,o,l){return ds===!1&&(ds=!0),this.getInterpolation(e,t,i,s,a,r,o,l)}static getInterpolation(e,t,i,s,a,r,o,l){return this.getBarycoord(e,t,i,s,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,ui.x),l.addScaledVector(r,ui.y),l.addScaledVector(o,ui.z),l)}static isFrontFacing(e,t,i,s){return Kt.subVectors(i,t),ci.subVectors(e,t),Kt.cross(ci).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),Kt.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,a){return ds===!1&&(ds=!0),Gt.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}getInterpolation(e,t,i,s,a){return Gt.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return Gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let r,o;$i.subVectors(s,i),Qi.subVectors(a,i),Sa.subVectors(e,i);const l=$i.dot(Sa),c=Qi.dot(Sa);if(l<=0&&c<=0)return t.copy(i);ba.subVectors(e,s);const u=$i.dot(ba),h=Qi.dot(ba);if(u>=0&&h<=u)return t.copy(s);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return r=l/(l-u),t.copy(i).addScaledVector($i,r);wa.subVectors(e,a);const f=$i.dot(wa),v=Qi.dot(wa);if(v>=0&&f<=v)return t.copy(a);const x=f*c-l*v;if(x<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(Qi,o);const m=u*v-f*h;if(m<=0&&h-u>=0&&f-v>=0)return So.subVectors(a,s),o=(h-u)/(h-u+(f-v)),t.copy(s).addScaledVector(So,o);const p=1/(m+x+d);return r=x*p,o=d*p,t.copy(i).addScaledVector($i,r).addScaledVector(Qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Nl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},ps={h:0,s:0,l:0};function Ta(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class fe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=$e.workingColorSpace){if(e=cr(e,1),t=wt(t,0,1),i=wt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,r=2*i-a;this.r=Ta(r,a,e+1/3),this.g=Ta(r,a,e),this.b=Ta(r,a,e-1/3)}return $e.toWorkingColorSpace(this,s),this}setStyle(e,t=bt){function i(a){a!==void 0&&parseFloat(a)<1}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){const i=Nl[e.toLowerCase()];return i!==void 0&&this.setHex(i,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bn(e.r),this.g=bn(e.g),this.b=bn(e.b),this}copyLinearToSRGB(e){return this.r=da(e.r),this.g=da(e.g),this.b=da(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return $e.fromWorkingColorSpace(Et.copy(this),e),Math.round(wt(Et.r*255,0,255))*65536+Math.round(wt(Et.g*255,0,255))*256+Math.round(wt(Et.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(Et.copy(this),t);const i=Et.r,s=Et.g,a=Et.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let l,c;const u=(o+r)/2;if(o===r)l=0,c=0;else{const h=r-o;switch(c=u<=.5?h/(r+o):h/(2-r-o),r){case i:l=(s-a)/h+(s<a?6:0);break;case s:l=(a-i)/h+2;break;case a:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=bt){$e.fromWorkingColorSpace(Et.copy(this),e);const t=Et.r,i=Et.g,s=Et.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(yi),this.setHSL(yi.h+e,yi.s+t,yi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(yi),e.getHSL(ps);const i=kn(yi.h,ps.h,t),s=kn(yi.s,ps.s,t),a=kn(yi.l,ps.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new fe;fe.NAMES=Nl;let qu=0;class Wi extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=Mn,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xa,this.blendDst=Ya,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=oo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0)continue;const s=this[t];s!==void 0&&(s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Mn&&(i.blending=this.blending),this.side!==pi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xa&&(i.blendSrc=this.blendSrc),this.blendDst!==Ya&&(i.blendDst=this.blendDst),this.blendEquation!==Fi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Hs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==oo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class At extends Wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new R,ms=new ae;class st{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ms.fromBufferAttribute(this,t),ms.applyMatrix3(e),this.setXY(t,ms.x,ms.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ii(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Je(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),s=Je(s,this.array),a=Je(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ja&&(e.usage=this.usage),e}}class Ol extends st{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class zl extends st{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ne extends st{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Xu=0;const Wt=new Qe,Ca=new pt,en=new R,Bt=new Hi,Un=new Hi,yt=new R;class Ze extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ll(e)?zl:Ol)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new He().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,i){return Wt.makeTranslation(e,t,i),this.applyMatrix4(Wt),this}scale(e,t,i){return Wt.makeScale(e,t,i),this.applyMatrix4(Wt),this}lookAt(e){return Ca.lookAt(e),Ca.updateMatrix(),this.applyMatrix4(Ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(en).negate(),this.translate(en.x,en.y,en.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new Ne(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];Bt.setFromBufferAttribute(a),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingSphere.set(new R,1/0);return}if(e){const i=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];Un.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(Bt.min,Un.min),Bt.expandByPoint(yt),yt.addVectors(Bt.max,Un.max),Bt.expandByPoint(yt)):(Bt.expandByPoint(Un.min),Bt.expandByPoint(Un.max))}Bt.getCenter(i);let s=0;for(let a=0,r=e.count;a<r;a++)yt.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(yt));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)yt.fromBufferAttribute(o,c),l&&(en.fromBufferAttribute(e,c),yt.add(en)),s=Math.max(s,i.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return;const i=e.array,s=t.position.array,a=t.normal.array,r=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new st(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<o;w++)c[w]=new R,u[w]=new R;const h=new R,d=new R,f=new R,v=new ae,x=new ae,m=new ae,p=new R,_=new R;function g(w,O,X){h.fromArray(s,w*3),d.fromArray(s,O*3),f.fromArray(s,X*3),v.fromArray(r,w*2),x.fromArray(r,O*2),m.fromArray(r,X*2),d.sub(h),f.sub(h),x.sub(v),m.sub(v);const te=1/(x.x*m.y-m.x*x.y);isFinite(te)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-x.y).multiplyScalar(te),_.copy(f).multiplyScalar(x.x).addScaledVector(d,-m.x).multiplyScalar(te),c[w].add(p),c[O].add(p),c[X].add(p),u[w].add(_),u[O].add(_),u[X].add(_))}let S=this.groups;S.length===0&&(S=[{start:0,count:i.length}]);for(let w=0,O=S.length;w<O;++w){const X=S[w],te=X.start,P=X.count;for(let z=te,Z=te+P;z<Z;z+=3)g(i[z+0],i[z+1],i[z+2])}const A=new R,T=new R,E=new R,N=new R;function y(w){E.fromArray(a,w*3),N.copy(E);const O=c[w];A.copy(O),A.sub(E.multiplyScalar(E.dot(O))).normalize(),T.crossVectors(N,O);const te=T.dot(u[w])<0?-1:1;l[w*4]=A.x,l[w*4+1]=A.y,l[w*4+2]=A.z,l[w*4+3]=te}for(let w=0,O=S.length;w<O;++w){const X=S[w],te=X.start,P=X.count;for(let z=te,Z=te+P;z<Z;z+=3)y(i[z+0]),y(i[z+1]),y(i[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new st(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new R,a=new R,r=new R,o=new R,l=new R,c=new R,u=new R,h=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){const v=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,x),r.fromBufferAttribute(t,m),u.subVectors(r,a),h.subVectors(s,a),u.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),u.subVectors(r,a),h.subVectors(s,a),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,v=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let p=0;p<u;p++)d[v++]=c[f++]}return new st(d,u,h)}if(this.index===null)return this;const t=new Ze,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],h=a[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,u=r.length;c<u;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bo=new Qe,Li=new ur,vs=new ki,wo=new R,tn=new R,nn=new R,sn=new R,Ea=new R,gs=new R,xs=new ae,_s=new ae,ys=new ae,To=new R,Co=new R,Eo=new R,Ms=new R,Ss=new R;class We extends pt{constructor(e=new Ze,t=new At){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){gs.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=o[l],h=a[l];u!==0&&(Ea.fromBufferAttribute(h,e),r?gs.addScaledVector(Ea,u):gs.addScaledVector(Ea.sub(t),u))}t.add(gs)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),vs.copy(i.boundingSphere),vs.applyMatrix4(a),Li.copy(e.ray).recast(e.near),!(vs.containsPoint(Li.origin)===!1&&(Li.intersectSphere(vs,wo)===null||Li.origin.distanceToSquared(wo)>(e.far-e.near)**2))&&(bo.copy(a).invert(),Li.copy(e.ray).applyMatrix4(bo),!(i.boundingBox!==null&&Li.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Li)))}_computeIntersections(e,t,i){let s;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,h=a.attributes.normal,d=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let v=0,x=d.length;v<x;v++){const m=d[v],p=r[m.materialIndex],_=Math.max(m.start,f.start),g=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=_,A=g;S<A;S+=3){const T=o.getX(S),E=o.getX(S+1),N=o.getX(S+2);s=bs(this,p,e,i,c,u,h,T,E,N),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=v,p=x;m<p;m+=3){const _=o.getX(m),g=o.getX(m+1),S=o.getX(m+2);s=bs(this,r,e,i,c,u,h,_,g,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let v=0,x=d.length;v<x;v++){const m=d[v],p=r[m.materialIndex],_=Math.max(m.start,f.start),g=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=_,A=g;S<A;S+=3){const T=S,E=S+1,N=S+2;s=bs(this,p,e,i,c,u,h,T,E,N),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=v,p=x;m<p;m+=3){const _=m,g=m+1,S=m+2;s=bs(this,r,e,i,c,u,h,_,g,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Yu(n,e,t,i,s,a,r,o){let l;if(e.side===Nt?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,e.side===pi,o),l===null)return null;Ss.copy(o),Ss.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ss);return c<t.near||c>t.far?null:{distance:c,point:Ss.clone(),object:n}}function bs(n,e,t,i,s,a,r,o,l,c){n.getVertexPosition(o,tn),n.getVertexPosition(l,nn),n.getVertexPosition(c,sn);const u=Yu(n,e,t,i,tn,nn,sn,Ms);if(u){s&&(xs.fromBufferAttribute(s,o),_s.fromBufferAttribute(s,l),ys.fromBufferAttribute(s,c),u.uv=Gt.getInterpolation(Ms,tn,nn,sn,xs,_s,ys,new ae)),a&&(xs.fromBufferAttribute(a,o),_s.fromBufferAttribute(a,l),ys.fromBufferAttribute(a,c),u.uv1=Gt.getInterpolation(Ms,tn,nn,sn,xs,_s,ys,new ae),u.uv2=u.uv1),r&&(To.fromBufferAttribute(r,o),Co.fromBufferAttribute(r,l),Eo.fromBufferAttribute(r,c),u.normal=Gt.getInterpolation(Ms,tn,nn,sn,To,Co,Eo,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new R,materialIndex:0};Gt.getNormal(tn,nn,sn,h.normal),u.face=h}return u}class Ci extends Ze{constructor(e=1,t=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],u=[],h=[];let d=0,f=0;v("z","y","x",-1,-1,i,t,e,r,a,0),v("z","y","x",1,-1,i,t,-e,r,a,1),v("x","z","y",1,1,e,i,t,s,r,2),v("x","z","y",1,-1,e,i,-t,s,r,3),v("x","y","z",1,-1,e,t,i,s,a,4),v("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(u,3)),this.setAttribute("uv",new Ne(h,2));function v(x,m,p,_,g,S,A,T,E,N,y){const w=S/E,O=A/N,X=S/2,te=A/2,P=T/2,z=E+1,Z=N+1;let I=0,U=0;const F=new R;for(let V=0;V<Z;V++){const Y=V*O-te;for(let j=0;j<z;j++){const q=j*w-X;F[x]=q*_,F[m]=Y*g,F[p]=P,c.push(F.x,F.y,F.z),F[x]=0,F[m]=0,F[p]=T>0?1:-1,u.push(F.x,F.y,F.z),h.push(j/E),h.push(1-V/N),I+=1}}for(let V=0;V<N;V++)for(let Y=0;Y<E;Y++){const j=d+Y+z*V,q=d+Y+z*(V+1),K=d+(Y+1)+z*(V+1),ie=d+(Y+1)+z*V;l.push(j,q,ie),l.push(q,K,ie),U+=6}o.addGroup(f,U,y),f+=U,d+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function En(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?e[t][i]=null:e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Ut(n){const e={};for(let t=0;t<n.length;t++){const i=En(n[t]);for(const s in i)e[s]=i[s]}return e}function Zu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Bl(n){return n.getRenderTarget()===null?n.outputColorSpace:$e.workingColorSpace}const Ku={clone:En,merge:Ut};var ju=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ju=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ft extends Wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ju,this.fragmentShader=Ju,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=En(e.uniforms),this.uniformsGroups=Zu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Gl extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=di}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Vt extends Gl{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Jn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jn*2*Math.atan(Math.tan(Sn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Sn*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,t-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const an=-90,rn=1;class $u extends pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Vt(an,rn,e,t);s.layers=this.layers,this.add(s);const a=new Vt(an,rn,e,t);a.layers=this.layers,this.add(a);const r=new Vt(an,rn,e,t);r.layers=this.layers,this.add(r);const o=new Vt(an,rn,e,t);o.layers=this.layers,this.add(o);const l=new Vt(an,rn,e,t);l.layers=this.layers,this.add(l);const c=new Vt(an,rn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===di)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,r),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Vl extends Rt{constructor(e,t,i,s,a,r,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:wn,super(e,t,i,s,a,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qu extends Gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(Wn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Bi?bt:Xt),this.texture=new Vl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:St}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ci(5,5,5),a=new ft({name:"CubemapFromEquirect",uniforms:En(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Nt,blending:bi});a.uniforms.tEquirect.value=t;const r=new We(s,a),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=St),new $u(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,i,s){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,s);e.setRenderTarget(a)}}const Aa=new R,eh=new R,th=new He;class Di{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Aa.subVectors(i,t).cross(eh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Aa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||th.getNormalMatrix(e),s=this.coplanarPoint(Aa).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ii=new ki,ws=new R;class hr{constructor(e=new Di,t=new Di,i=new Di,s=new Di,a=new Di,r=new Di){this.planes=[e,t,i,s,a,r]}set(e,t,i,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=di){const i=this.planes,s=e.elements,a=s[0],r=s[1],o=s[2],l=s[3],c=s[4],u=s[5],h=s[6],d=s[7],f=s[8],v=s[9],x=s[10],m=s[11],p=s[12],_=s[13],g=s[14],S=s[15];if(i[0].setComponents(l-a,d-c,m-f,S-p).normalize(),i[1].setComponents(l+a,d+c,m+f,S+p).normalize(),i[2].setComponents(l+r,d+u,m+v,S+_).normalize(),i[3].setComponents(l-r,d-u,m-v,S-_).normalize(),i[4].setComponents(l-o,d-h,m-x,S-g).normalize(),t===di)i[5].setComponents(l+o,d+h,m+x,S+g).normalize();else if(t===Xs)i[5].setComponents(o,h,x,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(e){return Ii.center.set(0,0,0),Ii.radius=.7071067811865476,Ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ws.x=s.normal.x>0?e.max.x:e.min.x,ws.y=s.normal.y>0?e.max.y:e.min.y,ws.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Hl(){let n=null,e=!1,t=null,i=null;function s(a,r){t(a,r),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function ih(n,e){const t=e.isWebGL2,i=new WeakMap;function s(c,u){const h=c.array,d=c.usage,f=h.byteLength,v=n.createBuffer();n.bindBuffer(u,v),n.bufferData(u,h,d),c.onUploadCallback();let x;if(h instanceof Float32Array)x=n.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)x=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)x=n.SHORT;else if(h instanceof Uint32Array)x=n.UNSIGNED_INT;else if(h instanceof Int32Array)x=n.INT;else if(h instanceof Int8Array)x=n.BYTE;else if(h instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:x,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:f}}function a(c,u,h){const d=u.array,f=u._updateRange,v=u.updateRanges;if(n.bindBuffer(h,c),f.count===-1&&v.length===0&&n.bufferSubData(h,0,d),v.length!==0){for(let x=0,m=v.length;x<m;x++){const p=v[x];t?n.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):n.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(t?n.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):n.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);if(h===void 0)i.set(c,s(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(h.buffer,c,u),h.version=c.version}}return{get:r,remove:o,update:l}}class Jt extends Ze{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,h=e/o,d=t/l,f=[],v=[],x=[],m=[];for(let p=0;p<u;p++){const _=p*d-r;for(let g=0;g<c;g++){const S=g*h-a;v.push(S,-_,0),x.push(0,0,1),m.push(g/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<o;_++){const g=_+c*p,S=_+c*(p+1),A=_+1+c*(p+1),T=_+1+c*p;f.push(g,S,T),f.push(S,A,T)}this.setIndex(f),this.setAttribute("position",new Ne(v,3)),this.setAttribute("normal",new Ne(x,3)),this.setAttribute("uv",new Ne(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.width,e.height,e.widthSegments,e.heightSegments)}}var nh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sh=`#ifdef USE_ALPHAHASH
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
#endif`,ah=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,lh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ch=`#ifdef USE_AOMAP
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
#endif`,uh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hh=`#ifdef USE_BATCHING
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
#endif`,fh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,dh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ph=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vh=`#ifdef USE_IRIDESCENCE
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
#endif`,gh=`#ifdef USE_BUMPMAP
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
#endif`,xh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Th=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ch=`#define PI 3.141592653589793
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
} // validated`,Eh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ah=`vec3 transformedNormal = objectNormal;
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
#endif`,Rh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ph=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ih=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uh=`
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
}`,Fh=`#ifdef USE_ENVMAP
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
#endif`,Nh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Oh=`#ifdef USE_ENVMAP
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
#endif`,zh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bh=`#ifdef USE_ENVMAP
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
#endif`,Gh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wh=`#ifdef USE_GRADIENTMAP
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
}`,qh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Xh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kh=`uniform bool receiveShadow;
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
#endif`,jh=`#ifdef USE_ENVMAP
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
#endif`,Jh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$h=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ef=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tf=`PhysicalMaterial material;
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
#endif`,nf=`struct PhysicalMaterial {
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
}`,sf=`
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
#endif`,af=`#if defined( RE_IndirectDiffuse )
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
#endif`,rf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,of=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,uf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,hf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ff=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,df=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pf=`#if defined( USE_POINTS_UV )
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
#endif`,mf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xf=`#ifdef USE_MORPHNORMALS
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
#endif`,_f=`#ifdef USE_MORPHTARGETS
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
#endif`,yf=`#ifdef USE_MORPHTARGETS
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
#endif`,Mf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cf=`#ifdef USE_NORMALMAP
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
#endif`,Ef=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Af=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,If=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Df=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ff=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Of=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hf=`float getShadowMask() {
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
}`,kf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wf=`#ifdef USE_SKINNING
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
#endif`,qf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xf=`#ifdef USE_SKINNING
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
#endif`,Yf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jf=`#ifdef USE_TRANSMISSION
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
#endif`,$f=`#ifdef USE_TRANSMISSION
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
#endif`,Qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ed=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,td=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,id=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const nd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sd=`uniform sampler2D t2D;
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
}`,ad=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,od=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ld=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cd=`#include <common>
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
}`,ud=`#if DEPTH_PACKING == 3200
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
}`,hd=`#define DISTANCE
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
}`,fd=`#define DISTANCE
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
}`,dd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,md=`uniform float scale;
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
}`,vd=`uniform vec3 diffuse;
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
}`,gd=`#include <common>
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
}`,xd=`uniform vec3 diffuse;
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
}`,_d=`#define LAMBERT
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
}`,yd=`#define LAMBERT
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
}`,Md=`#define MATCAP
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
}`,Sd=`#define MATCAP
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
}`,bd=`#define NORMAL
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
}`,wd=`#define NORMAL
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
}`,Td=`#define PHONG
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
}`,Cd=`#define PHONG
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
}`,Ed=`#define STANDARD
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
}`,Ad=`#define STANDARD
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
}`,Rd=`#define TOON
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
}`,Pd=`#define TOON
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
}`,Ld=`uniform float size;
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
}`,Id=`uniform vec3 diffuse;
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
}`,Dd=`#include <common>
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
}`,Ud=`uniform vec3 color;
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
}`,Fd=`uniform float rotation;
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
}`,Nd=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:nh,alphahash_pars_fragment:sh,alphamap_fragment:ah,alphamap_pars_fragment:rh,alphatest_fragment:oh,alphatest_pars_fragment:lh,aomap_fragment:ch,aomap_pars_fragment:uh,batching_pars_vertex:hh,batching_vertex:fh,begin_vertex:dh,beginnormal_vertex:ph,bsdfs:mh,iridescence_fragment:vh,bumpmap_pars_fragment:gh,clipping_planes_fragment:xh,clipping_planes_pars_fragment:_h,clipping_planes_pars_vertex:yh,clipping_planes_vertex:Mh,color_fragment:Sh,color_pars_fragment:bh,color_pars_vertex:wh,color_vertex:Th,common:Ch,cube_uv_reflection_fragment:Eh,defaultnormal_vertex:Ah,displacementmap_pars_vertex:Rh,displacementmap_vertex:Ph,emissivemap_fragment:Lh,emissivemap_pars_fragment:Ih,colorspace_fragment:Dh,colorspace_pars_fragment:Uh,envmap_fragment:Fh,envmap_common_pars_fragment:Nh,envmap_pars_fragment:Oh,envmap_pars_vertex:zh,envmap_physical_pars_fragment:jh,envmap_vertex:Bh,fog_vertex:Gh,fog_pars_vertex:Vh,fog_fragment:Hh,fog_pars_fragment:kh,gradientmap_pars_fragment:Wh,lightmap_fragment:qh,lightmap_pars_fragment:Xh,lights_lambert_fragment:Yh,lights_lambert_pars_fragment:Zh,lights_pars_begin:Kh,lights_toon_fragment:Jh,lights_toon_pars_fragment:$h,lights_phong_fragment:Qh,lights_phong_pars_fragment:ef,lights_physical_fragment:tf,lights_physical_pars_fragment:nf,lights_fragment_begin:sf,lights_fragment_maps:af,lights_fragment_end:rf,logdepthbuf_fragment:of,logdepthbuf_pars_fragment:lf,logdepthbuf_pars_vertex:cf,logdepthbuf_vertex:uf,map_fragment:hf,map_pars_fragment:ff,map_particle_fragment:df,map_particle_pars_fragment:pf,metalnessmap_fragment:mf,metalnessmap_pars_fragment:vf,morphcolor_vertex:gf,morphnormal_vertex:xf,morphtarget_pars_vertex:_f,morphtarget_vertex:yf,normal_fragment_begin:Mf,normal_fragment_maps:Sf,normal_pars_fragment:bf,normal_pars_vertex:wf,normal_vertex:Tf,normalmap_pars_fragment:Cf,clearcoat_normal_fragment_begin:Ef,clearcoat_normal_fragment_maps:Af,clearcoat_pars_fragment:Rf,iridescence_pars_fragment:Pf,opaque_fragment:Lf,packing:If,premultiplied_alpha_fragment:Df,project_vertex:Uf,dithering_fragment:Ff,dithering_pars_fragment:Nf,roughnessmap_fragment:Of,roughnessmap_pars_fragment:zf,shadowmap_pars_fragment:Bf,shadowmap_pars_vertex:Gf,shadowmap_vertex:Vf,shadowmask_pars_fragment:Hf,skinbase_vertex:kf,skinning_pars_vertex:Wf,skinning_vertex:qf,skinnormal_vertex:Xf,specularmap_fragment:Yf,specularmap_pars_fragment:Zf,tonemapping_fragment:Kf,tonemapping_pars_fragment:jf,transmission_fragment:Jf,transmission_pars_fragment:$f,uv_pars_fragment:Qf,uv_pars_vertex:ed,uv_vertex:td,worldpos_vertex:id,background_vert:nd,background_frag:sd,backgroundCube_vert:ad,backgroundCube_frag:rd,cube_vert:od,cube_frag:ld,depth_vert:cd,depth_frag:ud,distanceRGBA_vert:hd,distanceRGBA_frag:fd,equirect_vert:dd,equirect_frag:pd,linedashed_vert:md,linedashed_frag:vd,meshbasic_vert:gd,meshbasic_frag:xd,meshlambert_vert:_d,meshlambert_frag:yd,meshmatcap_vert:Md,meshmatcap_frag:Sd,meshnormal_vert:bd,meshnormal_frag:wd,meshphong_vert:Td,meshphong_frag:Cd,meshphysical_vert:Ed,meshphysical_frag:Ad,meshtoon_vert:Rd,meshtoon_frag:Pd,points_vert:Ld,points_frag:Id,shadow_vert:Dd,shadow_frag:Ud,sprite_vert:Fd,sprite_frag:Nd},se={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},ti={basic:{uniforms:Ut([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Ut([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new fe(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Ut([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Ut([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Ut([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new fe(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Ut([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Ut([se.points,se.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Ut([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Ut([se.common,se.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Ut([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Ut([se.sprite,se.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Ut([se.common,se.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Ut([se.lights,se.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};ti.physical={uniforms:Ut([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const Ts={r:0,b:0,g:0};function Od(n,e,t,i,s,a,r){const o=new fe(0);let l=a===!0?0:1,c,u,h=null,d=0,f=null;function v(m,p){let _=!1,g=p.isScene===!0?p.background:null;g&&g.isTexture&&(g=(p.backgroundBlurriness>0?t:e).get(g)),g===null?x(o,l):g&&g.isColor&&(x(g,1),_=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||_)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),g&&(g.isCubeTexture||g.mapping===Js)?(u===void 0&&(u=new We(new Ci(1,1,1),new ft({name:"BackgroundCubeMaterial",uniforms:En(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=$e.getTransfer(g.colorSpace)!==nt,(h!==g||d!==g.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,h=g,d=g.version,f=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(c===void 0&&(c=new We(new Jt(2,2),new ft({name:"BackgroundMaterial",uniforms:En(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=g,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=$e.getTransfer(g.colorSpace)!==nt,g.matrixAutoUpdate===!0&&g.updateMatrix(),c.material.uniforms.uvTransform.value.copy(g.matrix),(h!==g||d!==g.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=g,d=g.version,f=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function x(m,p){m.getRGB(Ts,Bl(n)),i.buffers.color.setClear(Ts.r,Ts.g,Ts.b,p,r)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,x(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,x(o,l)},render:v}}function zd(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),a=i.isWebGL2?null:e.get("OES_vertex_array_object"),r=i.isWebGL2||a!==null,o={},l=m(null);let c=l,u=!1;function h(P,z,Z,I,U){let F=!1;if(r){const V=x(I,Z,z);c!==V&&(c=V,f(c.object)),F=p(P,I,Z,U),F&&_(P,I,Z,U)}else{const V=z.wireframe===!0;(c.geometry!==I.id||c.program!==Z.id||c.wireframe!==V)&&(c.geometry=I.id,c.program=Z.id,c.wireframe=V,F=!0)}U!==null&&t.update(U,n.ELEMENT_ARRAY_BUFFER),(F||u)&&(u=!1,N(P,z,Z,I),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function d(){return i.isWebGL2?n.createVertexArray():a.createVertexArrayOES()}function f(P){return i.isWebGL2?n.bindVertexArray(P):a.bindVertexArrayOES(P)}function v(P){return i.isWebGL2?n.deleteVertexArray(P):a.deleteVertexArrayOES(P)}function x(P,z,Z){const I=Z.wireframe===!0;let U=o[P.id];U===void 0&&(U={},o[P.id]=U);let F=U[z.id];F===void 0&&(F={},U[z.id]=F);let V=F[I];return V===void 0&&(V=m(d()),F[I]=V),V}function m(P){const z=[],Z=[],I=[];for(let U=0;U<s;U++)z[U]=0,Z[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:Z,attributeDivisors:I,object:P,attributes:{},index:null}}function p(P,z,Z,I){const U=c.attributes,F=z.attributes;let V=0;const Y=Z.getAttributes();for(const j in Y)if(Y[j].location>=0){const K=U[j];let ie=F[j];if(ie===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(ie=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(ie=P.instanceColor)),K===void 0||K.attribute!==ie||ie&&K.data!==ie.data)return!0;V++}return c.attributesNum!==V||c.index!==I}function _(P,z,Z,I){const U={},F=z.attributes;let V=0;const Y=Z.getAttributes();for(const j in Y)if(Y[j].location>=0){let K=F[j];K===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));const ie={};ie.attribute=K,K&&K.data&&(ie.data=K.data),U[j]=ie,V++}c.attributes=U,c.attributesNum=V,c.index=I}function g(){const P=c.newAttributes;for(let z=0,Z=P.length;z<Z;z++)P[z]=0}function S(P){A(P,0)}function A(P,z){const Z=c.newAttributes,I=c.enabledAttributes,U=c.attributeDivisors;Z[P]=1,I[P]===0&&(n.enableVertexAttribArray(P),I[P]=1),U[P]!==z&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,z),U[P]=z)}function T(){const P=c.newAttributes,z=c.enabledAttributes;for(let Z=0,I=z.length;Z<I;Z++)z[Z]!==P[Z]&&(n.disableVertexAttribArray(Z),z[Z]=0)}function E(P,z,Z,I,U,F,V){V===!0?n.vertexAttribIPointer(P,z,Z,U,F):n.vertexAttribPointer(P,z,Z,I,U,F)}function N(P,z,Z,I){if(i.isWebGL2===!1&&(P.isInstancedMesh||I.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const U=I.attributes,F=Z.getAttributes(),V=z.defaultAttributeValues;for(const Y in F){const j=F[Y];if(j.location>=0){let q=U[Y];if(q===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(q=P.instanceColor)),q!==void 0){const K=q.normalized,ie=q.itemSize,he=t.get(q);if(he===void 0)continue;const me=he.buffer,Ae=he.type,Pe=he.bytesPerElement,Te=i.isWebGL2===!0&&(Ae===n.INT||Ae===n.UNSIGNED_INT||q.gpuType===Sl);if(q.isInterleavedBufferAttribute){const qe=q.data,B=qe.stride,Pt=q.offset;if(qe.isInstancedInterleavedBuffer){for(let Me=0;Me<j.locationSize;Me++)A(j.location+Me,qe.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=qe.meshPerAttribute*qe.count)}else for(let Me=0;Me<j.locationSize;Me++)S(j.location+Me);n.bindBuffer(n.ARRAY_BUFFER,me);for(let Me=0;Me<j.locationSize;Me++)E(j.location+Me,ie/j.locationSize,Ae,K,B*Pe,(Pt+ie/j.locationSize*Me)*Pe,Te)}else{if(q.isInstancedBufferAttribute){for(let qe=0;qe<j.locationSize;qe++)A(j.location+qe,q.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let qe=0;qe<j.locationSize;qe++)S(j.location+qe);n.bindBuffer(n.ARRAY_BUFFER,me);for(let qe=0;qe<j.locationSize;qe++)E(j.location+qe,ie/j.locationSize,Ae,K,ie*Pe,ie/j.locationSize*qe*Pe,Te)}}else if(V!==void 0){const K=V[Y];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(j.location,K);break;case 3:n.vertexAttrib3fv(j.location,K);break;case 4:n.vertexAttrib4fv(j.location,K);break;default:n.vertexAttrib1fv(j.location,K)}}}}T()}function y(){X();for(const P in o){const z=o[P];for(const Z in z){const I=z[Z];for(const U in I)v(I[U].object),delete I[U];delete z[Z]}delete o[P]}}function w(P){if(o[P.id]===void 0)return;const z=o[P.id];for(const Z in z){const I=z[Z];for(const U in I)v(I[U].object),delete I[U];delete z[Z]}delete o[P.id]}function O(P){for(const z in o){const Z=o[z];if(Z[P.id]===void 0)continue;const I=Z[P.id];for(const U in I)v(I[U].object),delete I[U];delete Z[P.id]}}function X(){te(),u=!0,c!==l&&(c=l,f(c.object))}function te(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:X,resetDefaultState:te,dispose:y,releaseStatesOfGeometry:w,releaseStatesOfProgram:O,initAttributes:g,enableAttribute:S,disableUnusedAttributes:T}}function Bd(n,e,t,i){const s=i.isWebGL2;let a;function r(u){a=u}function o(u,h){n.drawArrays(a,u,h),t.update(h,a,1)}function l(u,h,d){if(d===0)return;let f,v;if(s)f=n,v="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",f===null)return;f[v](a,u,h,d),t.update(h,a,d)}function c(u,h,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<d;v++)this.render(u[v],h[v]);else{f.multiDrawArraysWEBGL(a,u,0,h,0,d);let v=0;for(let x=0;x<d;x++)v+=h[x];t.update(v,a,1)}}this.setMode=r,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Gd(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const r=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=a(o);l!==o&&(o=l);const c=r||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),g=d>0,S=r||e.has("OES_texture_float"),A=g&&S,T=r?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:r,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:a,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:_,vertexTextures:g,floatFragmentTextures:S,floatVertexTextures:A,maxSamples:T}}function Vd(n){const e=this;let t=null,i=0,s=!1,a=!1;const r=new Di,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||s;return s=d,i=h.length,f},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const v=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!s||v===null||v.length===0||a&&!m)a?u(null):c();else{const _=a?0:i,g=_*4;let S=p.clippingState||null;l.value=S,S=u(v,d,g,f);for(let A=0;A!==g;++A)S[A]=t[A];p.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,v){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,v!==!0||m===null){const p=f+x*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let g=0,S=f;g!==x;++g,S+=4)r.copy(h[g]).applyMatrix4(_,o),r.normal.toArray(m,S),m[S+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Hd(n){let e=new WeakMap;function t(r,o){return o===Za?r.mapping=wn:o===Ka&&(r.mapping=Tn),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===Za||o===Ka)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Qu(l.height/2);return c.fromEquirectangularTexture(n,r),e.set(r,c),r.addEventListener("dispose",s),t(c.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}class kl extends Gl{constructor(e=-1,t=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,r=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const mn=4,Ao=[.125,.215,.35,.446,.526,.582],vn=20,Ra=new kl,Ro=new fe;let Pa=null,La=0,Ia=0;const Ui=(1+Math.sqrt(5))/2,on=1/Ui,Po=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,Ui,on),new R(0,Ui,-on),new R(on,0,Ui),new R(-on,0,Ui),new R(Ui,on,0),new R(-Ui,on,0)];class Lo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Do(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pa,La,Ia),e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wn||e.mapping===Tn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:St,minFilter:St,generateMipmaps:!1,type:jn,format:qt,colorSpace:mi,depthBuffer:!1},s=Io(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Io(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kd(a)),this._blurMaterial=Wd(a,e,t)}return s}_compileMaterial(e){const t=new We(this._lodPlanes[0],e);this._renderer.compile(t,Ra)}_sceneToCubeUV(e,t,i,s){const o=new Vt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Ro),u.toneMapping=wi,u.autoClear=!1;const f=new At({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1}),v=new We(new Ci,f);let x=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(Ro),x=!0);for(let p=0;p<6;p++){const _=p%3;_===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):_===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const g=this._cubeSize;Cs(s,_*g,p>2?g:0,g,g),u.setRenderTarget(s),x&&u.render(v,o),u.render(e,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===wn||e.mapping===Tn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Do());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new We(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;Cs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,Ra)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),r=Po[(s-1)%Po.length];this._blur(e,s-1,s,a,r)}t.autoClear=i}_blur(e,t,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,s,"latitudinal",a),this._halfBlur(r,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,r,o){const l=this._renderer,c=this._blurMaterial,u=3,h=new We(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[i]-1,v=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*vn-1),x=a/v,m=isFinite(a)?1+Math.floor(u*x):vn;m>vn;const p=[];let _=0;for(let E=0;E<vn;++E){const N=E/x,y=Math.exp(-N*N/2);p.push(y),E===0?_+=y:E<m&&(_+=2*y)}for(let E=0;E<p.length;E++)p[E]=p[E]/_;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=r==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:g}=this;d.dTheta.value=v,d.mipInt.value=g-i;const S=this._sizeLods[s],A=3*S*(s>g-mn?s-g+mn:0),T=4*(this._cubeSize-S);Cs(t,A,T,3*S,2*S),l.setRenderTarget(t),l.render(h,Ra)}}function kd(n){const e=[],t=[],i=[];let s=n;const a=n-mn+1+Ao.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let l=1/o;r>n-mn?l=Ao[r-n+mn-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,v=6,x=3,m=2,p=1,_=new Float32Array(x*v*f),g=new Float32Array(m*v*f),S=new Float32Array(p*v*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,N=T>2?0:-1,y=[E,N,0,E+2/3,N,0,E+2/3,N+1,0,E,N,0,E+2/3,N+1,0,E,N+1,0];_.set(y,x*v*T),g.set(d,m*v*T);const w=[T,T,T,T,T,T];S.set(w,p*v*T)}const A=new Ze;A.setAttribute("position",new st(_,x)),A.setAttribute("uv",new st(g,m)),A.setAttribute("faceIndex",new st(S,p)),e.push(A),s>mn&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Io(n,e,t){const i=new Gi(n,e,t);return i.texture.mapping=Js,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Cs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Wd(n,e,t){const i=new Float32Array(vn),s=new R(0,1,0);return new ft({name:"SphericalGaussianBlur",defines:{n:vn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fr(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Do(){return new ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fr(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Uo(){return new ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fr(),fragmentShader:`

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
	`}function qd(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Za||l===Ka,u=l===wn||l===Tn;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Lo(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new Lo(n));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",a),d.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function Xd(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s}}}function Yd(n,e,t,i){const s={},a=new WeakMap;function r(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);for(const v in d.morphAttributes){const x=d.morphAttributes[v];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}d.removeEventListener("dispose",r),delete s[d.id];const f=a.get(d);f&&(e.remove(f),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",r),s[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const v in d)e.update(d[v],n.ARRAY_BUFFER);const f=h.morphAttributes;for(const v in f){const x=f[v];for(let m=0,p=x.length;m<p;m++)e.update(x[m],n.ARRAY_BUFFER)}}function c(h){const d=[],f=h.index,v=h.attributes.position;let x=0;if(f!==null){const _=f.array;x=f.version;for(let g=0,S=_.length;g<S;g+=3){const A=_[g+0],T=_[g+1],E=_[g+2];d.push(A,T,T,E,E,A)}}else if(v!==void 0){const _=v.array;x=v.version;for(let g=0,S=_.length/3-1;g<S;g+=3){const A=g+0,T=g+1,E=g+2;d.push(A,T,T,E,E,A)}}else return;const m=new(Ll(d)?zl:Ol)(d,1);m.version=x;const p=a.get(h);p&&e.remove(p),a.set(h,m)}function u(h){const d=a.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return a.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Zd(n,e,t,i){const s=i.isWebGL2;let a;function r(f){a=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,v){n.drawElements(a,v,o,f*l),t.update(v,a,1)}function h(f,v,x){if(x===0)return;let m,p;if(s)m=n,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null)return;m[p](a,v,o,f*l,x),t.update(v,a,x)}function d(f,v,x){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<x;p++)this.render(f[p]/l,v[p]);else{m.multiDrawElementsWEBGL(a,v,0,o,f,0,x);let p=0;for(let _=0;_<x;_++)p+=v[_];t.update(p,a,1)}}this.setMode=r,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function Kd(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function jd(n,e){return n[0]-e[0]}function Jd(n,e){return Math.abs(e[1])-Math.abs(n[1])}function $d(n,e,t){const i={},s=new Float32Array(8),a=new WeakMap,r=new at,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=f!==void 0?f.length:0;let x=a.get(u);if(x===void 0||x.count!==v){let P=function(){X.dispose(),a.delete(u),u.removeEventListener("dispose",P)};x!==void 0&&x.texture.dispose();const _=u.morphAttributes.position!==void 0,g=u.morphAttributes.normal!==void 0,S=u.morphAttributes.color!==void 0,A=u.morphAttributes.position||[],T=u.morphAttributes.normal||[],E=u.morphAttributes.color||[];let N=0;_===!0&&(N=1),g===!0&&(N=2),S===!0&&(N=3);let y=u.attributes.position.count*N,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const O=new Float32Array(y*w*4*v),X=new Ul(O,y,w,v);X.type=Si,X.needsUpdate=!0;const te=N*4;for(let z=0;z<v;z++){const Z=A[z],I=T[z],U=E[z],F=y*w*4*z;for(let V=0;V<Z.count;V++){const Y=V*te;_===!0&&(r.fromBufferAttribute(Z,V),O[F+Y+0]=r.x,O[F+Y+1]=r.y,O[F+Y+2]=r.z,O[F+Y+3]=0),g===!0&&(r.fromBufferAttribute(I,V),O[F+Y+4]=r.x,O[F+Y+5]=r.y,O[F+Y+6]=r.z,O[F+Y+7]=0),S===!0&&(r.fromBufferAttribute(U,V),O[F+Y+8]=r.x,O[F+Y+9]=r.y,O[F+Y+10]=r.z,O[F+Y+11]=U.itemSize===4?r.w:1)}}x={count:v,texture:X,size:new ae(y,w)},a.set(u,x),u.addEventListener("dispose",P)}let m=0;for(let _=0;_<d.length;_++)m+=d[_];const p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(n,"morphTargetBaseInfluence",p),h.getUniforms().setValue(n,"morphTargetInfluences",d),h.getUniforms().setValue(n,"morphTargetsTexture",x.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",x.size)}else{const f=d===void 0?0:d.length;let v=i[u.id];if(v===void 0||v.length!==f){v=[];for(let g=0;g<f;g++)v[g]=[g,0];i[u.id]=v}for(let g=0;g<f;g++){const S=v[g];S[0]=g,S[1]=d[g]}v.sort(Jd);for(let g=0;g<8;g++)g<f&&v[g][1]?(o[g][0]=v[g][0],o[g][1]=v[g][1]):(o[g][0]=Number.MAX_SAFE_INTEGER,o[g][1]=0);o.sort(jd);const x=u.morphAttributes.position,m=u.morphAttributes.normal;let p=0;for(let g=0;g<8;g++){const S=o[g],A=S[0],T=S[1];A!==Number.MAX_SAFE_INTEGER&&T?(x&&u.getAttribute("morphTarget"+g)!==x[A]&&u.setAttribute("morphTarget"+g,x[A]),m&&u.getAttribute("morphNormal"+g)!==m[A]&&u.setAttribute("morphNormal"+g,m[A]),s[g]=T,p+=T):(x&&u.hasAttribute("morphTarget"+g)===!0&&u.deleteAttribute("morphTarget"+g),m&&u.hasAttribute("morphNormal"+g)===!0&&u.deleteAttribute("morphNormal"+g),s[g]=0)}const _=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",_),h.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function Qd(n,e,t,i){let s=new WeakMap;function a(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return h}function r(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:r}}class Wl extends Rt{constructor(e,t,i,s,a,r,o,l,c,u){if(u=u!==void 0?u:zi,u!==zi&&u!==Cn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===zi&&(i=Mi),i===void 0&&u===Cn&&(i=Oi),super(null,s,a,r,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:mt,this.minFilter=l!==void 0?l:mt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ql=new Rt,Xl=new Wl(1,1);Xl.compareFunction=Pl;const Yl=new Ul,Zl=new Nu,Kl=new Vl,Fo=[],No=[],Oo=new Float32Array(16),zo=new Float32Array(9),Bo=new Float32Array(4);function Rn(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=Fo[s];if(a===void 0&&(a=new Float32Array(s),Fo[s]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(a,o)}return a}function vt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function gt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ea(n,e){let t=No[e];t===void 0&&(t=new Int32Array(e),No[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ep(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function tp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;n.uniform2fv(this.addr,e),gt(t,e)}}function ip(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(vt(t,e))return;n.uniform3fv(this.addr,e),gt(t,e)}}function np(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;n.uniform4fv(this.addr,e),gt(t,e)}}function sp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(vt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(vt(t,i))return;Bo.set(i),n.uniformMatrix2fv(this.addr,!1,Bo),gt(t,i)}}function ap(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(vt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(vt(t,i))return;zo.set(i),n.uniformMatrix3fv(this.addr,!1,zo),gt(t,i)}}function rp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(vt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(vt(t,i))return;Oo.set(i),n.uniformMatrix4fv(this.addr,!1,Oo),gt(t,i)}}function op(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function lp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;n.uniform2iv(this.addr,e),gt(t,e)}}function cp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;n.uniform3iv(this.addr,e),gt(t,e)}}function up(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;n.uniform4iv(this.addr,e),gt(t,e)}}function hp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function fp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;n.uniform2uiv(this.addr,e),gt(t,e)}}function dp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;n.uniform3uiv(this.addr,e),gt(t,e)}}function pp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;n.uniform4uiv(this.addr,e),gt(t,e)}}function mp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const a=this.type===n.SAMPLER_2D_SHADOW?Xl:ql;t.setTexture2D(e||a,s)}function vp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Zl,s)}function gp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Kl,s)}function xp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Yl,s)}function _p(n){switch(n){case 5126:return ep;case 35664:return tp;case 35665:return ip;case 35666:return np;case 35674:return sp;case 35675:return ap;case 35676:return rp;case 5124:case 35670:return op;case 35667:case 35671:return lp;case 35668:case 35672:return cp;case 35669:case 35673:return up;case 5125:return hp;case 36294:return fp;case 36295:return dp;case 36296:return pp;case 35678:case 36198:case 36298:case 36306:case 35682:return mp;case 35679:case 36299:case 36307:return vp;case 35680:case 36300:case 36308:case 36293:return gp;case 36289:case 36303:case 36311:case 36292:return xp}}function yp(n,e){n.uniform1fv(this.addr,e)}function Mp(n,e){const t=Rn(e,this.size,2);n.uniform2fv(this.addr,t)}function Sp(n,e){const t=Rn(e,this.size,3);n.uniform3fv(this.addr,t)}function bp(n,e){const t=Rn(e,this.size,4);n.uniform4fv(this.addr,t)}function wp(n,e){const t=Rn(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Tp(n,e){const t=Rn(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Cp(n,e){const t=Rn(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Ep(n,e){n.uniform1iv(this.addr,e)}function Ap(n,e){n.uniform2iv(this.addr,e)}function Rp(n,e){n.uniform3iv(this.addr,e)}function Pp(n,e){n.uniform4iv(this.addr,e)}function Lp(n,e){n.uniform1uiv(this.addr,e)}function Ip(n,e){n.uniform2uiv(this.addr,e)}function Dp(n,e){n.uniform3uiv(this.addr,e)}function Up(n,e){n.uniform4uiv(this.addr,e)}function Fp(n,e,t){const i=this.cache,s=e.length,a=ea(t,s);vt(i,a)||(n.uniform1iv(this.addr,a),gt(i,a));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||ql,a[r])}function Np(n,e,t){const i=this.cache,s=e.length,a=ea(t,s);vt(i,a)||(n.uniform1iv(this.addr,a),gt(i,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||Zl,a[r])}function Op(n,e,t){const i=this.cache,s=e.length,a=ea(t,s);vt(i,a)||(n.uniform1iv(this.addr,a),gt(i,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||Kl,a[r])}function zp(n,e,t){const i=this.cache,s=e.length,a=ea(t,s);vt(i,a)||(n.uniform1iv(this.addr,a),gt(i,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||Yl,a[r])}function Bp(n){switch(n){case 5126:return yp;case 35664:return Mp;case 35665:return Sp;case 35666:return bp;case 35674:return wp;case 35675:return Tp;case 35676:return Cp;case 5124:case 35670:return Ep;case 35667:case 35671:return Ap;case 35668:case 35672:return Rp;case 35669:case 35673:return Pp;case 5125:return Lp;case 36294:return Ip;case 36295:return Dp;case 36296:return Up;case 35678:case 36198:case 36298:case 36306:case 35682:return Fp;case 35679:case 36299:case 36307:return Np;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return zp}}class Gp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=_p(t.type)}}class Vp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Bp(t.type)}}class Hp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const Da=/(\w+)(\])?(\[|\.)?/g;function Go(n,e){n.seq.push(e),n.map[e.id]=e}function kp(n,e,t){const i=n.name,s=i.length;for(Da.lastIndex=0;;){const a=Da.exec(i),r=Da.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){Go(t,c===void 0?new Gp(o,n,e):new Vp(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new Hp(o),Go(t,h)),t=h}}}class Gs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),r=e.getUniformLocation(t,a.name);kp(a,r,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&i.push(r)}return i}}function Vo(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Wp=37297;let qp=0;function Xp(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}function Yp(n){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(n);let i;switch(e===t?i="":e===qs&&t===Ws?i="LinearDisplayP3ToLinearSRGB":e===Ws&&t===qs&&(i="LinearSRGBToLinearDisplayP3"),n){case mi:case $s:return[i,"LinearTransferOETF"];case bt:case lr:return[i,"sRGBTransferOETF"];default:return[i,"LinearTransferOETF"]}}function Ho(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const r=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Xp(n.getShaderSource(e),r)}else return s}function Zp(n,e){const t=Yp(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Kp(n,e){let t;switch(e){case Wc:t="Linear";break;case qc:t="Reinhard";break;case Xc:t="OptimizedCineon";break;case Yc:t="ACESFilmic";break;case Kc:t="AgX";break;case Zc:t="Custom";break;default:t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function jp(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(gn).join(`
`)}function Jp(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(gn).join(`
`)}function $p(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Qp(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function gn(n){return n!==""}function ko(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wo(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const em=/^[ \t]*#include +<([\w\d./]+)>/gm;function er(n){return n.replace(em,im)}const tm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function im(n,e){let t=Fe[e];if(t===void 0){const i=tm.get(e);if(i!==void 0)t=Fe[i];else throw new Error("Can not resolve #include <"+e+">")}return er(t)}const nm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qo(n){return n.replace(nm,sm)}function sm(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Xo(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function am(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===_l?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===xc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===fi&&(e="SHADOWMAP_TYPE_VSM"),e}function rm(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case wn:case Tn:e="ENVMAP_TYPE_CUBE";break;case Js:e="ENVMAP_TYPE_CUBE_UV";break}return e}function om(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Tn:e="ENVMAP_MODE_REFRACTION";break}return e}function lm(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case yl:e="ENVMAP_BLENDING_MULTIPLY";break;case Hc:e="ENVMAP_BLENDING_MIX";break;case kc:e="ENVMAP_BLENDING_ADD";break}return e}function cm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function um(n,e,t,i){const s=n.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=am(t),c=rm(t),u=om(t),h=lm(t),d=cm(t),f=t.isWebGL2?"":jp(t),v=Jp(t),x=$p(a),m=s.createProgram();let p,_,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(gn).join(`
`),p.length>0&&(p+=`
`),_=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(gn).join(`
`),_.length>0&&(_+=`
`)):(p=[Xo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gn).join(`
`),_=[f,Xo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wi?"#define TONE_MAPPING":"",t.toneMapping!==wi?Fe.tonemapping_pars_fragment:"",t.toneMapping!==wi?Kp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,Zp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(gn).join(`
`)),r=er(r),r=ko(r,t),r=Wo(r,t),o=er(o),o=ko(o,t),o=Wo(o,t),r=qo(r),o=qo(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,p=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,_=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===lo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===lo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const S=g+p+r,A=g+_+o,T=Vo(s,s.VERTEX_SHADER,S),E=Vo(s,s.FRAGMENT_SHADER,A);s.attachShader(m,T),s.attachShader(m,E),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function N(X){if(n.debug.checkShaderErrors){const te=s.getProgramInfoLog(m).trim(),P=s.getShaderInfoLog(T).trim(),z=s.getShaderInfoLog(E).trim();let Z=!0,I=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,T,E);else{const U=Ho(s,T,"vertex"),F=Ho(s,E,"fragment")}else te!==""||(P===""||z==="")&&(I=!1);I&&(X.diagnostics={runnable:Z,programLog:te,vertexShader:{log:P,prefix:p},fragmentShader:{log:z,prefix:_}})}s.deleteShader(T),s.deleteShader(E),y=new Gs(s,m),w=Qp(s,m)}let y;this.getUniforms=function(){return y===void 0&&N(this),y};let w;this.getAttributes=function(){return w===void 0&&N(this),w};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(m,Wp)),O},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qp++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=E,this}let hm=0;class fm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new dm(e),t.set(e,i)),i}}class dm{constructor(e){this.id=hm++,this.code=e,this.usedTimes=0}}function pm(n,e,t,i,s,a,r){const o=new Fl,l=new fm,c=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return y===0?"uv":`uv${y}`}function m(y,w,O,X,te){const P=X.fog,z=te.geometry,Z=y.isMeshStandardMaterial?X.environment:null,I=(y.isMeshStandardMaterial?t:e).get(y.envMap||Z),U=I&&I.mapping===Js?I.image.height:null,F=v[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),y.precision);const V=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Y=V!==void 0?V.length:0;let j=0;z.morphAttributes.position!==void 0&&(j=1),z.morphAttributes.normal!==void 0&&(j=2),z.morphAttributes.color!==void 0&&(j=3);let q,K,ie,he;if(F){const Lt=ti[F];q=Lt.vertexShader,K=Lt.fragmentShader}else q=y.vertexShader,K=y.fragmentShader,l.update(y),ie=l.getVertexShaderID(y),he=l.getFragmentShaderID(y);const me=n.getRenderTarget(),Ae=te.isInstancedMesh===!0,Pe=te.isBatchedMesh===!0,Te=!!y.map,qe=!!y.matcap,B=!!I,Pt=!!y.aoMap,Me=!!y.lightMap,Le=!!y.bumpMap,ge=!!y.normalMap,rt=!!y.displacementMap,Oe=!!y.emissiveMap,C=!!y.metalnessMap,M=!!y.roughnessMap,H=y.anisotropy>0,Q=y.clearcoat>0,$=y.iridescence>0,ee=y.sheen>0,_e=y.transmission>0,le=H&&!!y.anisotropyMap,de=Q&&!!y.clearcoatMap,we=Q&&!!y.clearcoatNormalMap,ze=Q&&!!y.clearcoatRoughnessMap,J=$&&!!y.iridescenceMap,Ke=$&&!!y.iridescenceThicknessMap,ke=ee&&!!y.sheenColorMap,Re=ee&&!!y.sheenRoughnessMap,ye=!!y.specularMap,pe=!!y.specularColorMap,Ue=!!y.specularIntensityMap,Xe=_e&&!!y.transmissionMap,ct=_e&&!!y.thicknessMap,Ge=!!y.gradientMap,ne=!!y.alphaMap,L=y.alphaTest>0,re=!!y.alphaHash,oe=!!y.extensions,Ce=!!z.attributes.uv1,Se=!!z.attributes.uv2,et=!!z.attributes.uv3;let tt=wi;return y.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(tt=n.toneMapping),{isWebGL2:u,shaderID:F,shaderType:y.type,shaderName:y.name,vertexShader:q,fragmentShader:K,defines:y.defines,customVertexShaderID:ie,customFragmentShaderID:he,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Pe,instancing:Ae,instancingColor:Ae&&te.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:me===null?n.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:mi,map:Te,matcap:qe,envMap:B,envMapMode:B&&I.mapping,envMapCubeUVHeight:U,aoMap:Pt,lightMap:Me,bumpMap:Le,normalMap:ge,displacementMap:d&&rt,emissiveMap:Oe,normalMapObjectSpace:ge&&y.normalMapType===cu,normalMapTangentSpace:ge&&y.normalMapType===lu,metalnessMap:C,roughnessMap:M,anisotropy:H,anisotropyMap:le,clearcoat:Q,clearcoatMap:de,clearcoatNormalMap:we,clearcoatRoughnessMap:ze,iridescence:$,iridescenceMap:J,iridescenceThicknessMap:Ke,sheen:ee,sheenColorMap:ke,sheenRoughnessMap:Re,specularMap:ye,specularColorMap:pe,specularIntensityMap:Ue,transmission:_e,transmissionMap:Xe,thicknessMap:ct,gradientMap:Ge,opaque:y.transparent===!1&&y.blending===Mn,alphaMap:ne,alphaTest:L,alphaHash:re,combine:y.combine,mapUv:Te&&x(y.map.channel),aoMapUv:Pt&&x(y.aoMap.channel),lightMapUv:Me&&x(y.lightMap.channel),bumpMapUv:Le&&x(y.bumpMap.channel),normalMapUv:ge&&x(y.normalMap.channel),displacementMapUv:rt&&x(y.displacementMap.channel),emissiveMapUv:Oe&&x(y.emissiveMap.channel),metalnessMapUv:C&&x(y.metalnessMap.channel),roughnessMapUv:M&&x(y.roughnessMap.channel),anisotropyMapUv:le&&x(y.anisotropyMap.channel),clearcoatMapUv:de&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:we&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:Re&&x(y.sheenRoughnessMap.channel),specularMapUv:ye&&x(y.specularMap.channel),specularColorMapUv:pe&&x(y.specularColorMap.channel),specularIntensityMapUv:Ue&&x(y.specularIntensityMap.channel),transmissionMapUv:Xe&&x(y.transmissionMap.channel),thicknessMapUv:ct&&x(y.thicknessMap.channel),alphaMapUv:ne&&x(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ge||H),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:Ce,vertexUv2s:Se,vertexUv3s:et,pointsUvs:te.isPoints===!0&&!!z.attributes.uv&&(Te||ne),fog:!!P,useFog:y.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:te.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:j,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:tt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Te&&y.map.isVideoTexture===!0&&$e.getTransfer(y.map.colorSpace)===nt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Mt,flipSided:y.side===Nt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:oe&&y.extensions.derivatives===!0,extensionFragDepth:oe&&y.extensions.fragDepth===!0,extensionDrawBuffers:oe&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:oe&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:oe&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(const O in y.defines)w.push(O),w.push(y.defines[O]);return y.isRawShaderMaterial===!1&&(_(w,y),g(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function _(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function g(y,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),y.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function S(y){const w=v[y.type];let O;if(w){const X=ti[w];O=Ku.clone(X.uniforms)}else O=y.uniforms;return O}function A(y,w){let O;for(let X=0,te=c.length;X<te;X++){const P=c[X];if(P.cacheKey===w){O=P,++O.usedTimes;break}}return O===void 0&&(O=new um(n,w,y,a),c.push(O)),O}function T(y){if(--y.usedTimes===0){const w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),y.destroy()}}function E(y){l.remove(y)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:A,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:N}}function mm(){let n=new WeakMap;function e(a){let r=n.get(a);return r===void 0&&(r={},n.set(a,r)),r}function t(a){n.delete(a)}function i(a,r,o){n.get(a)[r]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function vm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Yo(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Zo(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function r(h,d,f,v,x,m){let p=n[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:v,renderOrder:h.renderOrder,z:x,group:m},n[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=v,p.renderOrder=h.renderOrder,p.z=x,p.group=m),e++,p}function o(h,d,f,v,x,m){const p=r(h,d,f,v,x,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(h,d,f,v,x,m){const p=r(h,d,f,v,x,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||vm),i.length>1&&i.sort(d||Yo),s.length>1&&s.sort(d||Yo)}function u(){for(let h=e,d=n.length;h<d;h++){const f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:o,unshift:l,finish:u,sort:c}}function gm(){let n=new WeakMap;function e(i,s){const a=n.get(i);let r;return a===void 0?(r=new Zo,n.set(i,[r])):s>=a.length?(r=new Zo,a.push(r)):r=a[s],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function xm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new fe};break;case"SpotLight":t={position:new R,direction:new R,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function _m(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ym=0;function Mm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Sm(n,e){const t=new xm,i=_m(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new R);const a=new R,r=new Qe,o=new Qe;function l(u,h){let d=0,f=0,v=0;for(let X=0;X<9;X++)s.probe[X].set(0,0,0);let x=0,m=0,p=0,_=0,g=0,S=0,A=0,T=0,E=0,N=0,y=0;u.sort(Mm);const w=h===!0?Math.PI:1;for(let X=0,te=u.length;X<te;X++){const P=u[X],z=P.color,Z=P.intensity,I=P.distance,U=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=z.r*Z*w,f+=z.g*Z*w,v+=z.b*Z*w;else if(P.isLightProbe){for(let F=0;F<9;F++)s.probe[F].addScaledVector(P.sh.coefficients[F],Z);y++}else if(P.isDirectionalLight){const F=t.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity*w),P.castShadow){const V=P.shadow,Y=i.get(P);Y.shadowBias=V.bias,Y.shadowNormalBias=V.normalBias,Y.shadowRadius=V.radius,Y.shadowMapSize=V.mapSize,s.directionalShadow[x]=Y,s.directionalShadowMap[x]=U,s.directionalShadowMatrix[x]=P.shadow.matrix,S++}s.directional[x]=F,x++}else if(P.isSpotLight){const F=t.get(P);F.position.setFromMatrixPosition(P.matrixWorld),F.color.copy(z).multiplyScalar(Z*w),F.distance=I,F.coneCos=Math.cos(P.angle),F.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),F.decay=P.decay,s.spot[p]=F;const V=P.shadow;if(P.map&&(s.spotLightMap[E]=P.map,E++,V.updateMatrices(P),P.castShadow&&N++),s.spotLightMatrix[p]=V.matrix,P.castShadow){const Y=i.get(P);Y.shadowBias=V.bias,Y.shadowNormalBias=V.normalBias,Y.shadowRadius=V.radius,Y.shadowMapSize=V.mapSize,s.spotShadow[p]=Y,s.spotShadowMap[p]=U,T++}p++}else if(P.isRectAreaLight){const F=t.get(P);F.color.copy(z).multiplyScalar(Z),F.halfWidth.set(P.width*.5,0,0),F.halfHeight.set(0,P.height*.5,0),s.rectArea[_]=F,_++}else if(P.isPointLight){const F=t.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity*w),F.distance=P.distance,F.decay=P.decay,P.castShadow){const V=P.shadow,Y=i.get(P);Y.shadowBias=V.bias,Y.shadowNormalBias=V.normalBias,Y.shadowRadius=V.radius,Y.shadowMapSize=V.mapSize,Y.shadowCameraNear=V.camera.near,Y.shadowCameraFar=V.camera.far,s.pointShadow[m]=Y,s.pointShadowMap[m]=U,s.pointShadowMatrix[m]=P.shadow.matrix,A++}s.point[m]=F,m++}else if(P.isHemisphereLight){const F=t.get(P);F.skyColor.copy(P.color).multiplyScalar(Z*w),F.groundColor.copy(P.groundColor).multiplyScalar(Z*w),s.hemi[g]=F,g++}}_>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=se.LTC_FLOAT_1,s.rectAreaLTC2=se.LTC_FLOAT_2):(s.rectAreaLTC1=se.LTC_HALF_1,s.rectAreaLTC2=se.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=se.LTC_FLOAT_1,s.rectAreaLTC2=se.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0&&(s.rectAreaLTC1=se.LTC_HALF_1,s.rectAreaLTC2=se.LTC_HALF_2)),s.ambient[0]=d,s.ambient[1]=f,s.ambient[2]=v;const O=s.hash;(O.directionalLength!==x||O.pointLength!==m||O.spotLength!==p||O.rectAreaLength!==_||O.hemiLength!==g||O.numDirectionalShadows!==S||O.numPointShadows!==A||O.numSpotShadows!==T||O.numSpotMaps!==E||O.numLightProbes!==y)&&(s.directional.length=x,s.spot.length=p,s.rectArea.length=_,s.point.length=m,s.hemi.length=g,s.directionalShadow.length=S,s.directionalShadowMap.length=S,s.pointShadow.length=A,s.pointShadowMap.length=A,s.spotShadow.length=T,s.spotShadowMap.length=T,s.directionalShadowMatrix.length=S,s.pointShadowMatrix.length=A,s.spotLightMatrix.length=T+E-N,s.spotLightMap.length=E,s.numSpotLightShadowsWithMaps=N,s.numLightProbes=y,O.directionalLength=x,O.pointLength=m,O.spotLength=p,O.rectAreaLength=_,O.hemiLength=g,O.numDirectionalShadows=S,O.numPointShadows=A,O.numSpotShadows=T,O.numSpotMaps=E,O.numLightProbes=y,s.version=ym++)}function c(u,h){let d=0,f=0,v=0,x=0,m=0;const p=h.matrixWorldInverse;for(let _=0,g=u.length;_<g;_++){const S=u[_];if(S.isDirectionalLight){const A=s.directional[d];A.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(a),A.direction.transformDirection(p),d++}else if(S.isSpotLight){const A=s.spot[v];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(a),A.direction.transformDirection(p),v++}else if(S.isRectAreaLight){const A=s.rectArea[x];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),o.identity(),r.copy(S.matrixWorld),r.premultiply(p),o.extractRotation(r),A.halfWidth.set(S.width*.5,0,0),A.halfHeight.set(0,S.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),x++}else if(S.isPointLight){const A=s.point[f];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){const A=s.hemi[m];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:s}}function Ko(n,e){const t=new Sm(n,e),i=[],s=[];function a(){i.length=0,s.length=0}function r(h){i.push(h)}function o(h){s.push(h)}function l(h){t.setup(i,h)}function c(h){t.setupView(i,h)}return{init:a,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:r,pushShadow:o}}function bm(n,e){let t=new WeakMap;function i(a,r=0){const o=t.get(a);let l;return o===void 0?(l=new Ko(n,e),t.set(a,[l])):r>=o.length?(l=new Ko(n,e),o.push(l)):l=o[r],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class wm extends Wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ru,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tm extends Wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Cm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Em=`uniform sampler2D shadow_pass;
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
}`;function Am(n,e,t){let i=new hr;const s=new ae,a=new ae,r=new at,o=new wm({depthPacking:ou}),l=new Tm,c={},u=t.maxTextureSize,h={[pi]:Nt,[Nt]:pi,[Mt]:Mt},d=new ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:Cm,fragmentShader:Em}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const v=new Ze;v.setAttribute("position",new st(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new We(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_l;let p=this.type;this.render=function(T,E,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const y=n.getRenderTarget(),w=n.getActiveCubeFace(),O=n.getActiveMipmapLevel(),X=n.state;X.setBlending(bi),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const te=p!==fi&&this.type===fi,P=p===fi&&this.type!==fi;for(let z=0,Z=T.length;z<Z;z++){const I=T[z],U=I.shadow;if(U===void 0||U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const F=U.getFrameExtents();if(s.multiply(F),a.copy(U.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(a.x=Math.floor(u/F.x),s.x=a.x*F.x,U.mapSize.x=a.x),s.y>u&&(a.y=Math.floor(u/F.y),s.y=a.y*F.y,U.mapSize.y=a.y)),U.map===null||te===!0||P===!0){const Y=this.type!==fi?{minFilter:mt,magFilter:mt}:{};U.map!==null&&U.map.dispose(),U.map=new Gi(s.x,s.y,Y),U.map.texture.name=I.name+".shadowMap",U.camera.updateProjectionMatrix()}n.setRenderTarget(U.map),n.clear();const V=U.getViewportCount();for(let Y=0;Y<V;Y++){const j=U.getViewport(Y);r.set(a.x*j.x,a.y*j.y,a.x*j.z,a.y*j.w),X.viewport(r),U.updateMatrices(I,Y),i=U.getFrustum(),S(E,N,U.camera,I,this.type)}U.isPointLightShadow!==!0&&this.type===fi&&_(U,N),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(y,w,O)};function _(T,E){const N=e.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Gi(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(E,null,N,d,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(E,null,N,f,x,null)}function g(T,E,N,y){let w=null;const O=N.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(O!==void 0)w=O;else if(w=N.isPointLight===!0?l:o,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const X=w.uuid,te=E.uuid;let P=c[X];P===void 0&&(P={},c[X]=P);let z=P[te];z===void 0&&(z=w.clone(),P[te]=z,E.addEventListener("dispose",A)),w=z}if(w.visible=E.visible,w.wireframe=E.wireframe,y===fi?w.side=E.shadowSide!==null?E.shadowSide:E.side:w.side=E.shadowSide!==null?E.shadowSide:h[E.side],w.alphaMap=E.alphaMap,w.alphaTest=E.alphaTest,w.map=E.map,w.clipShadows=E.clipShadows,w.clippingPlanes=E.clippingPlanes,w.clipIntersection=E.clipIntersection,w.displacementMap=E.displacementMap,w.displacementScale=E.displacementScale,w.displacementBias=E.displacementBias,w.wireframeLinewidth=E.wireframeLinewidth,w.linewidth=E.linewidth,N.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const X=n.properties.get(w);X.light=N}return w}function S(T,E,N,y,w){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===fi)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,T.matrixWorld);const te=e.update(T),P=T.material;if(Array.isArray(P)){const z=te.groups;for(let Z=0,I=z.length;Z<I;Z++){const U=z[Z],F=P[U.materialIndex];if(F&&F.visible){const V=g(T,F,y,w);T.onBeforeShadow(n,T,E,N,te,V,U),n.renderBufferDirect(N,null,te,V,T,U),T.onAfterShadow(n,T,E,N,te,V,U)}}}else if(P.visible){const z=g(T,P,y,w);T.onBeforeShadow(n,T,E,N,te,z,null),n.renderBufferDirect(N,null,te,z,T,null),T.onAfterShadow(n,T,E,N,te,z,null)}}const X=T.children;for(let te=0,P=X.length;te<P;te++)S(X[te],E,N,y,w)}function A(T){T.target.removeEventListener("dispose",A);for(const N in c){const y=c[N],w=T.target.uuid;w in y&&(y[w].dispose(),delete y[w])}}}function Rm(n,e,t){const i=t.isWebGL2;function s(){let L=!1;const re=new at;let oe=null;const Ce=new at(0,0,0,0);return{setMask:function(Se){oe!==Se&&!L&&(n.colorMask(Se,Se,Se,Se),oe=Se)},setLocked:function(Se){L=Se},setClear:function(Se,et,tt,xt,Lt){Lt===!0&&(Se*=xt,et*=xt,tt*=xt),re.set(Se,et,tt,xt),Ce.equals(re)===!1&&(n.clearColor(Se,et,tt,xt),Ce.copy(re))},reset:function(){L=!1,oe=null,Ce.set(-1,0,0,0)}}}function a(){let L=!1,re=null,oe=null,Ce=null;return{setTest:function(Se){Se?Pe(n.DEPTH_TEST):Te(n.DEPTH_TEST)},setMask:function(Se){re!==Se&&!L&&(n.depthMask(Se),re=Se)},setFunc:function(Se){if(oe!==Se){switch(Se){case Fc:n.depthFunc(n.NEVER);break;case Nc:n.depthFunc(n.ALWAYS);break;case Oc:n.depthFunc(n.LESS);break;case Hs:n.depthFunc(n.LEQUAL);break;case zc:n.depthFunc(n.EQUAL);break;case Bc:n.depthFunc(n.GEQUAL);break;case Gc:n.depthFunc(n.GREATER);break;case Vc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}oe=Se}},setLocked:function(Se){L=Se},setClear:function(Se){Ce!==Se&&(n.clearDepth(Se),Ce=Se)},reset:function(){L=!1,re=null,oe=null,Ce=null}}}function r(){let L=!1,re=null,oe=null,Ce=null,Se=null,et=null,tt=null,xt=null,Lt=null;return{setTest:function(it){L||(it?Pe(n.STENCIL_TEST):Te(n.STENCIL_TEST))},setMask:function(it){re!==it&&!L&&(n.stencilMask(it),re=it)},setFunc:function(it,It,$t){(oe!==it||Ce!==It||Se!==$t)&&(n.stencilFunc(it,It,$t),oe=it,Ce=It,Se=$t)},setOp:function(it,It,$t){(et!==it||tt!==It||xt!==$t)&&(n.stencilOp(it,It,$t),et=it,tt=It,xt=$t)},setLocked:function(it){L=it},setClear:function(it){Lt!==it&&(n.clearStencil(it),Lt=it)},reset:function(){L=!1,re=null,oe=null,Ce=null,Se=null,et=null,tt=null,xt=null,Lt=null}}}const o=new s,l=new a,c=new r,u=new WeakMap,h=new WeakMap;let d={},f={},v=new WeakMap,x=[],m=null,p=!1,_=null,g=null,S=null,A=null,T=null,E=null,N=null,y=new fe(0,0,0),w=0,O=!1,X=null,te=null,P=null,z=null,Z=null;const I=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,F=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(V)[1]),U=F>=1):V.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),U=F>=2);let Y=null,j={};const q=n.getParameter(n.SCISSOR_BOX),K=n.getParameter(n.VIEWPORT),ie=new at().fromArray(q),he=new at().fromArray(K);function me(L,re,oe,Ce){const Se=new Uint8Array(4),et=n.createTexture();n.bindTexture(L,et),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let tt=0;tt<oe;tt++)i&&(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)?n.texImage3D(re,0,n.RGBA,1,1,Ce,0,n.RGBA,n.UNSIGNED_BYTE,Se):n.texImage2D(re+tt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Se);return et}const Ae={};Ae[n.TEXTURE_2D]=me(n.TEXTURE_2D,n.TEXTURE_2D,1),Ae[n.TEXTURE_CUBE_MAP]=me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ae[n.TEXTURE_2D_ARRAY]=me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ae[n.TEXTURE_3D]=me(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Pe(n.DEPTH_TEST),l.setFunc(Hs),Oe(!1),C(Pr),Pe(n.CULL_FACE),ge(bi);function Pe(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function Te(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function qe(L,re){return f[L]!==re?(n.bindFramebuffer(L,re),f[L]=re,i&&(L===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=re),L===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=re)),!0):!1}function B(L,re){let oe=x,Ce=!1;if(L)if(oe=v.get(re),oe===void 0&&(oe=[],v.set(re,oe)),L.isWebGLMultipleRenderTargets){const Se=L.texture;if(oe.length!==Se.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let et=0,tt=Se.length;et<tt;et++)oe[et]=n.COLOR_ATTACHMENT0+et;oe.length=Se.length,Ce=!0}}else oe[0]!==n.COLOR_ATTACHMENT0&&(oe[0]=n.COLOR_ATTACHMENT0,Ce=!0);else oe[0]!==n.BACK&&(oe[0]=n.BACK,Ce=!0);Ce&&(t.isWebGL2?n.drawBuffers(oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe))}function Pt(L){return m!==L?(n.useProgram(L),m=L,!0):!1}const Me={[Fi]:n.FUNC_ADD,[yc]:n.FUNC_SUBTRACT,[Mc]:n.FUNC_REVERSE_SUBTRACT};if(i)Me[Dr]=n.MIN,Me[Ur]=n.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(Me[Dr]=L.MIN_EXT,Me[Ur]=L.MAX_EXT)}const Le={[Sc]:n.ZERO,[bc]:n.ONE,[wc]:n.SRC_COLOR,[Xa]:n.SRC_ALPHA,[Pc]:n.SRC_ALPHA_SATURATE,[Ac]:n.DST_COLOR,[Cc]:n.DST_ALPHA,[Tc]:n.ONE_MINUS_SRC_COLOR,[Ya]:n.ONE_MINUS_SRC_ALPHA,[Rc]:n.ONE_MINUS_DST_COLOR,[Ec]:n.ONE_MINUS_DST_ALPHA,[Lc]:n.CONSTANT_COLOR,[Ic]:n.ONE_MINUS_CONSTANT_COLOR,[Dc]:n.CONSTANT_ALPHA,[Uc]:n.ONE_MINUS_CONSTANT_ALPHA};function ge(L,re,oe,Ce,Se,et,tt,xt,Lt,it){if(L===bi){p===!0&&(Te(n.BLEND),p=!1);return}if(p===!1&&(Pe(n.BLEND),p=!0),L!==_c){if(L!==_||it!==O){if((g!==Fi||T!==Fi)&&(n.blendEquation(n.FUNC_ADD),g=Fi,T=Fi),it)switch(L){case Mn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ye:n.blendFunc(n.ONE,n.ONE);break;case Lr:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ir:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:break}else switch(L){case Mn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ye:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Lr:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ir:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:break}S=null,A=null,E=null,N=null,y.set(0,0,0),w=0,_=L,O=it}return}Se=Se||re,et=et||oe,tt=tt||Ce,(re!==g||Se!==T)&&(n.blendEquationSeparate(Me[re],Me[Se]),g=re,T=Se),(oe!==S||Ce!==A||et!==E||tt!==N)&&(n.blendFuncSeparate(Le[oe],Le[Ce],Le[et],Le[tt]),S=oe,A=Ce,E=et,N=tt),(xt.equals(y)===!1||Lt!==w)&&(n.blendColor(xt.r,xt.g,xt.b,Lt),y.copy(xt),w=Lt),_=L,O=!1}function rt(L,re){L.side===Mt?Te(n.CULL_FACE):Pe(n.CULL_FACE);let oe=L.side===Nt;re&&(oe=!oe),Oe(oe),L.blending===Mn&&L.transparent===!1?ge(bi):ge(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const Ce=L.stencilWrite;c.setTest(Ce),Ce&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),H(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Pe(n.SAMPLE_ALPHA_TO_COVERAGE):Te(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(L){X!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),X=L)}function C(L){L!==vc?(Pe(n.CULL_FACE),L!==te&&(L===Pr?n.cullFace(n.BACK):L===gc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Te(n.CULL_FACE),te=L}function M(L){L!==P&&(U&&n.lineWidth(L),P=L)}function H(L,re,oe){L?(Pe(n.POLYGON_OFFSET_FILL),(z!==re||Z!==oe)&&(n.polygonOffset(re,oe),z=re,Z=oe)):Te(n.POLYGON_OFFSET_FILL)}function Q(L){L?Pe(n.SCISSOR_TEST):Te(n.SCISSOR_TEST)}function $(L){L===void 0&&(L=n.TEXTURE0+I-1),Y!==L&&(n.activeTexture(L),Y=L)}function ee(L,re,oe){oe===void 0&&(Y===null?oe=n.TEXTURE0+I-1:oe=Y);let Ce=j[oe];Ce===void 0&&(Ce={type:void 0,texture:void 0},j[oe]=Ce),(Ce.type!==L||Ce.texture!==re)&&(Y!==oe&&(n.activeTexture(oe),Y=oe),n.bindTexture(L,re||Ae[L]),Ce.type=L,Ce.texture=re)}function _e(){const L=j[Y];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function le(){try{n.compressedTexImage2D.apply(n,arguments)}catch{}}function de(){try{n.compressedTexImage3D.apply(n,arguments)}catch{}}function we(){try{n.texSubImage2D.apply(n,arguments)}catch{}}function ze(){try{n.texSubImage3D.apply(n,arguments)}catch{}}function J(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch{}}function Ke(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch{}}function ke(){try{n.texStorage2D.apply(n,arguments)}catch{}}function Re(){try{n.texStorage3D.apply(n,arguments)}catch{}}function ye(){try{n.texImage2D.apply(n,arguments)}catch{}}function pe(){try{n.texImage3D.apply(n,arguments)}catch{}}function Ue(L){ie.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),ie.copy(L))}function Xe(L){he.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),he.copy(L))}function ct(L,re){let oe=h.get(re);oe===void 0&&(oe=new WeakMap,h.set(re,oe));let Ce=oe.get(L);Ce===void 0&&(Ce=n.getUniformBlockIndex(re,L.name),oe.set(L,Ce))}function Ge(L,re){const Ce=h.get(re).get(L);u.get(re)!==Ce&&(n.uniformBlockBinding(re,Ce,L.__bindingPointIndex),u.set(re,Ce))}function ne(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},Y=null,j={},f={},v=new WeakMap,x=[],m=null,p=!1,_=null,g=null,S=null,A=null,T=null,E=null,N=null,y=new fe(0,0,0),w=0,O=!1,X=null,te=null,P=null,z=null,Z=null,ie.set(0,0,n.canvas.width,n.canvas.height),he.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Pe,disable:Te,bindFramebuffer:qe,drawBuffers:B,useProgram:Pt,setBlending:ge,setMaterial:rt,setFlipSided:Oe,setCullFace:C,setLineWidth:M,setPolygonOffset:H,setScissorTest:Q,activeTexture:$,bindTexture:ee,unbindTexture:_e,compressedTexImage2D:le,compressedTexImage3D:de,texImage2D:ye,texImage3D:pe,updateUBOMapping:ct,uniformBlockBinding:Ge,texStorage2D:ke,texStorage3D:Re,texSubImage2D:we,texSubImage3D:ze,compressedTexSubImage2D:J,compressedTexSubImage3D:Ke,scissor:Ue,viewport:Xe,reset:ne}}function Pm(n,e,t,i,s,a,r){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,M){return f?new OffscreenCanvas(C,M):$n("canvas")}function x(C,M,H,Q){let $=1;if((C.width>Q||C.height>Q)&&($=Q/Math.max(C.width,C.height)),$<1||M===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const ee=M?Ys:Math.floor,_e=ee($*C.width),le=ee($*C.height);h===void 0&&(h=v(_e,le));const de=H?v(_e,le):h;return de.width=_e,de.height=le,de.getContext("2d").drawImage(C,0,0,_e,le),de}else return"data"in C,C;return C}function m(C){return Qa(C.width)&&Qa(C.height)}function p(C){return o?!1:C.wrapS!==Ht||C.wrapT!==Ht||C.minFilter!==mt&&C.minFilter!==St}function _(C,M){return C.generateMipmaps&&M&&C.minFilter!==mt&&C.minFilter!==St}function g(C){n.generateMipmap(C)}function S(C,M,H,Q,$=!1){if(o===!1)return M;if(C!==null&&n[C]!==void 0)return n[C];let ee=M;if(M===n.RED&&(H===n.FLOAT&&(ee=n.R32F),H===n.HALF_FLOAT&&(ee=n.R16F),H===n.UNSIGNED_BYTE&&(ee=n.R8)),M===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(ee=n.R8UI),H===n.UNSIGNED_SHORT&&(ee=n.R16UI),H===n.UNSIGNED_INT&&(ee=n.R32UI),H===n.BYTE&&(ee=n.R8I),H===n.SHORT&&(ee=n.R16I),H===n.INT&&(ee=n.R32I)),M===n.RG&&(H===n.FLOAT&&(ee=n.RG32F),H===n.HALF_FLOAT&&(ee=n.RG16F),H===n.UNSIGNED_BYTE&&(ee=n.RG8)),M===n.RGBA){const _e=$?ks:$e.getTransfer(Q);H===n.FLOAT&&(ee=n.RGBA32F),H===n.HALF_FLOAT&&(ee=n.RGBA16F),H===n.UNSIGNED_BYTE&&(ee=_e===nt?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function A(C,M,H){return _(C,H)===!0||C.isFramebufferTexture&&C.minFilter!==mt&&C.minFilter!==St?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function T(C){return C===mt||C===Fr||C===ra?n.NEAREST:n.LINEAR}function E(C){const M=C.target;M.removeEventListener("dispose",E),y(M),M.isVideoTexture&&u.delete(M)}function N(C){const M=C.target;M.removeEventListener("dispose",N),O(M)}function y(C){const M=i.get(C);if(M.__webglInit===void 0)return;const H=C.source,Q=d.get(H);if(Q){const $=Q[M.__cacheKey];$.usedTimes--,$.usedTimes===0&&w(C),Object.keys(Q).length===0&&d.delete(H)}i.remove(C)}function w(C){const M=i.get(C);n.deleteTexture(M.__webglTexture);const H=C.source,Q=d.get(H);delete Q[M.__cacheKey],r.memory.textures--}function O(C){const M=C.texture,H=i.get(C),Q=i.get(M);if(Q.__webglTexture!==void 0&&(n.deleteTexture(Q.__webglTexture),r.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(H.__webglFramebuffer[$]))for(let ee=0;ee<H.__webglFramebuffer[$].length;ee++)n.deleteFramebuffer(H.__webglFramebuffer[$][ee]);else n.deleteFramebuffer(H.__webglFramebuffer[$]);H.__webglDepthbuffer&&n.deleteRenderbuffer(H.__webglDepthbuffer[$])}else{if(Array.isArray(H.__webglFramebuffer))for(let $=0;$<H.__webglFramebuffer.length;$++)n.deleteFramebuffer(H.__webglFramebuffer[$]);else n.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&n.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&n.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let $=0;$<H.__webglColorRenderbuffer.length;$++)H.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(H.__webglColorRenderbuffer[$]);H.__webglDepthRenderbuffer&&n.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let $=0,ee=M.length;$<ee;$++){const _e=i.get(M[$]);_e.__webglTexture&&(n.deleteTexture(_e.__webglTexture),r.memory.textures--),i.remove(M[$])}i.remove(M),i.remove(C)}let X=0;function te(){X=0}function P(){const C=X;return C>=s.maxTextures,X+=1,C}function z(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function Z(C,M){const H=i.get(C);if(C.isVideoTexture&&rt(C),C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){const Q=C.image;if(Q!==null){if(Q.complete!==!1){ie(H,C,M);return}}}t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+M)}function I(C,M){const H=i.get(C);if(C.version>0&&H.__version!==C.version){ie(H,C,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+M)}function U(C,M){const H=i.get(C);if(C.version>0&&H.__version!==C.version){ie(H,C,M);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+M)}function F(C,M){const H=i.get(C);if(C.version>0&&H.__version!==C.version){he(H,C,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+M)}const V={[Ni]:n.REPEAT,[Ht]:n.CLAMP_TO_EDGE,[ja]:n.MIRRORED_REPEAT},Y={[mt]:n.NEAREST,[Fr]:n.NEAREST_MIPMAP_NEAREST,[ra]:n.NEAREST_MIPMAP_LINEAR,[St]:n.LINEAR,[jc]:n.LINEAR_MIPMAP_NEAREST,[Kn]:n.LINEAR_MIPMAP_LINEAR},j={[uu]:n.NEVER,[vu]:n.ALWAYS,[hu]:n.LESS,[Pl]:n.LEQUAL,[fu]:n.EQUAL,[mu]:n.GEQUAL,[du]:n.GREATER,[pu]:n.NOTEQUAL};function q(C,M,H){if(H?(n.texParameteri(C,n.TEXTURE_WRAP_S,V[M.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,V[M.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,V[M.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Y[M.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Y[M.minFilter])):(n.texParameteri(C,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(C,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),M.wrapS!==Ht||M.wrapT,n.texParameteri(C,n.TEXTURE_MAG_FILTER,T(M.magFilter)),n.texParameteri(C,n.TEXTURE_MIN_FILTER,T(M.minFilter)),M.minFilter!==mt&&M.minFilter),M.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,j[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===mt||M.minFilter!==ra&&M.minFilter!==Kn||M.type===Si&&e.has("OES_texture_float_linear")===!1||o===!1&&M.type===jn&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||i.get(M).__currentAnisotropy)&&(n.texParameterf(C,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy)}}function K(C,M){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",E));const Q=M.source;let $=d.get(Q);$===void 0&&($={},d.set(Q,$));const ee=z(M);if(ee!==C.__cacheKey){$[ee]===void 0&&($[ee]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,H=!0),$[ee].usedTimes++;const _e=$[C.__cacheKey];_e!==void 0&&($[C.__cacheKey].usedTimes--,_e.usedTimes===0&&w(M)),C.__cacheKey=ee,C.__webglTexture=$[ee].texture}return H}function ie(C,M,H){let Q=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Q=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Q=n.TEXTURE_3D);const $=K(C,M),ee=M.source;t.bindTexture(Q,C.__webglTexture,n.TEXTURE0+H);const _e=i.get(ee);if(ee.version!==_e.__version||$===!0){t.activeTexture(n.TEXTURE0+H);const le=$e.getPrimaries($e.workingColorSpace),de=M.colorSpace===Xt?null:$e.getPrimaries(M.colorSpace),we=M.colorSpace===Xt||le===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const ze=p(M)&&m(M.image)===!1;let J=x(M.image,ze,!1,s.maxTextureSize);J=Oe(M,J);const Ke=m(J)||o,ke=a.convert(M.format,M.colorSpace);let Re=a.convert(M.type),ye=S(M.internalFormat,ke,Re,M.colorSpace,M.isVideoTexture);q(Q,M,Ke);let pe;const Ue=M.mipmaps,Xe=o&&M.isVideoTexture!==!0&&ye!==Al,ct=_e.__version===void 0||$===!0,Ge=A(M,J,Ke);if(M.isDepthTexture)ye=n.DEPTH_COMPONENT,o?M.type===Si?ye=n.DEPTH_COMPONENT32F:M.type===Mi?ye=n.DEPTH_COMPONENT24:M.type===Oi?ye=n.DEPTH24_STENCIL8:ye=n.DEPTH_COMPONENT16:M.type,M.format===zi&&ye===n.DEPTH_COMPONENT&&M.type!==or&&M.type!==Mi&&(M.type=Mi,Re=a.convert(M.type)),M.format===Cn&&ye===n.DEPTH_COMPONENT&&(ye=n.DEPTH_STENCIL,M.type!==Oi&&(M.type=Oi,Re=a.convert(M.type))),ct&&(Xe?t.texStorage2D(n.TEXTURE_2D,1,ye,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,ye,J.width,J.height,0,ke,Re,null));else if(M.isDataTexture)if(Ue.length>0&&Ke){Xe&&ct&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let ne=0,L=Ue.length;ne<L;ne++)pe=Ue[ne],Xe?t.texSubImage2D(n.TEXTURE_2D,ne,0,0,pe.width,pe.height,ke,Re,pe.data):t.texImage2D(n.TEXTURE_2D,ne,ye,pe.width,pe.height,0,ke,Re,pe.data);M.generateMipmaps=!1}else Xe?(ct&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,ke,Re,J.data)):t.texImage2D(n.TEXTURE_2D,0,ye,J.width,J.height,0,ke,Re,J.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Xe&&ct&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ge,ye,Ue[0].width,Ue[0].height,J.depth);for(let ne=0,L=Ue.length;ne<L;ne++)pe=Ue[ne],M.format!==qt?ke!==null&&(Xe?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,J.depth,ke,pe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,ye,pe.width,pe.height,J.depth,0,pe.data,0,0)):Xe?t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,J.depth,ke,Re,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,ye,pe.width,pe.height,J.depth,0,ke,Re,pe.data)}else{Xe&&ct&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let ne=0,L=Ue.length;ne<L;ne++)pe=Ue[ne],M.format!==qt?ke!==null&&(Xe?t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,pe.width,pe.height,ke,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,ye,pe.width,pe.height,0,pe.data)):Xe?t.texSubImage2D(n.TEXTURE_2D,ne,0,0,pe.width,pe.height,ke,Re,pe.data):t.texImage2D(n.TEXTURE_2D,ne,ye,pe.width,pe.height,0,ke,Re,pe.data)}else if(M.isDataArrayTexture)Xe?(ct&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ge,ye,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ke,Re,J.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,ye,J.width,J.height,J.depth,0,ke,Re,J.data);else if(M.isData3DTexture)Xe?(ct&&t.texStorage3D(n.TEXTURE_3D,Ge,ye,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ke,Re,J.data)):t.texImage3D(n.TEXTURE_3D,0,ye,J.width,J.height,J.depth,0,ke,Re,J.data);else if(M.isFramebufferTexture){if(ct)if(Xe)t.texStorage2D(n.TEXTURE_2D,Ge,ye,J.width,J.height);else{let ne=J.width,L=J.height;for(let re=0;re<Ge;re++)t.texImage2D(n.TEXTURE_2D,re,ye,ne,L,0,ke,Re,null),ne>>=1,L>>=1}}else if(Ue.length>0&&Ke){Xe&&ct&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let ne=0,L=Ue.length;ne<L;ne++)pe=Ue[ne],Xe?t.texSubImage2D(n.TEXTURE_2D,ne,0,0,ke,Re,pe):t.texImage2D(n.TEXTURE_2D,ne,ye,ke,Re,pe);M.generateMipmaps=!1}else Xe?(ct&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ke,Re,J)):t.texImage2D(n.TEXTURE_2D,0,ye,ke,Re,J);_(M,Ke)&&g(Q),_e.__version=ee.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function he(C,M,H){if(M.image.length!==6)return;const Q=K(C,M),$=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+H);const ee=i.get($);if($.version!==ee.__version||Q===!0){t.activeTexture(n.TEXTURE0+H);const _e=$e.getPrimaries($e.workingColorSpace),le=M.colorSpace===Xt?null:$e.getPrimaries(M.colorSpace),de=M.colorSpace===Xt||_e===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const we=M.isCompressedTexture||M.image[0].isCompressedTexture,ze=M.image[0]&&M.image[0].isDataTexture,J=[];for(let ne=0;ne<6;ne++)!we&&!ze?J[ne]=x(M.image[ne],!1,!0,s.maxCubemapSize):J[ne]=ze?M.image[ne].image:M.image[ne],J[ne]=Oe(M,J[ne]);const Ke=J[0],ke=m(Ke)||o,Re=a.convert(M.format,M.colorSpace),ye=a.convert(M.type),pe=S(M.internalFormat,Re,ye,M.colorSpace),Ue=o&&M.isVideoTexture!==!0,Xe=ee.__version===void 0||Q===!0;let ct=A(M,Ke,ke);q(n.TEXTURE_CUBE_MAP,M,ke);let Ge;if(we){Ue&&Xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ct,pe,Ke.width,Ke.height);for(let ne=0;ne<6;ne++){Ge=J[ne].mipmaps;for(let L=0;L<Ge.length;L++){const re=Ge[L];M.format!==qt?Re!==null&&(Ue?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,L,0,0,re.width,re.height,Re,re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,L,pe,re.width,re.height,0,re.data)):Ue?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,L,0,0,re.width,re.height,Re,ye,re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,L,pe,re.width,re.height,0,Re,ye,re.data)}}}else{Ge=M.mipmaps,Ue&&Xe&&(Ge.length>0&&ct++,t.texStorage2D(n.TEXTURE_CUBE_MAP,ct,pe,J[0].width,J[0].height));for(let ne=0;ne<6;ne++)if(ze){Ue?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,J[ne].width,J[ne].height,Re,ye,J[ne].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,pe,J[ne].width,J[ne].height,0,Re,ye,J[ne].data);for(let L=0;L<Ge.length;L++){const oe=Ge[L].image[ne].image;Ue?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,L+1,0,0,oe.width,oe.height,Re,ye,oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,L+1,pe,oe.width,oe.height,0,Re,ye,oe.data)}}else{Ue?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Re,ye,J[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,pe,Re,ye,J[ne]);for(let L=0;L<Ge.length;L++){const re=Ge[L];Ue?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,L+1,0,0,Re,ye,re.image[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,L+1,pe,Re,ye,re.image[ne])}}}_(M,ke)&&g(n.TEXTURE_CUBE_MAP),ee.__version=$.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function me(C,M,H,Q,$,ee){const _e=a.convert(H.format,H.colorSpace),le=a.convert(H.type),de=S(H.internalFormat,_e,le,H.colorSpace);if(!i.get(M).__hasExternalTextures){const ze=Math.max(1,M.width>>ee),J=Math.max(1,M.height>>ee);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?t.texImage3D($,ee,de,ze,J,M.depth,0,_e,le,null):t.texImage2D($,ee,de,ze,J,0,_e,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),ge(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,$,i.get(H).__webglTexture,0,Le(M)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Q,$,i.get(H).__webglTexture,ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(C,M,H){if(n.bindRenderbuffer(n.RENDERBUFFER,C),M.depthBuffer&&!M.stencilBuffer){let Q=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(H||ge(M)){const $=M.depthTexture;$&&$.isDepthTexture&&($.type===Si?Q=n.DEPTH_COMPONENT32F:$.type===Mi&&(Q=n.DEPTH_COMPONENT24));const ee=Le(M);ge(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ee,Q,M.width,M.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ee,Q,M.width,M.height)}else n.renderbufferStorage(n.RENDERBUFFER,Q,M.width,M.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,C)}else if(M.depthBuffer&&M.stencilBuffer){const Q=Le(M);H&&ge(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,M.width,M.height):ge(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,C)}else{const Q=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let $=0;$<Q.length;$++){const ee=Q[$],_e=a.convert(ee.format,ee.colorSpace),le=a.convert(ee.type),de=S(ee.internalFormat,_e,le,ee.colorSpace),we=Le(M);H&&ge(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,we,de,M.width,M.height):ge(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,we,de,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,de,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Pe(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Z(M.depthTexture,0);const Q=i.get(M.depthTexture).__webglTexture,$=Le(M);if(M.depthTexture.format===zi)ge(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(M.depthTexture.format===Cn)ge(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Te(C){const M=i.get(C),H=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Pe(M.__webglFramebuffer,C)}else if(H){M.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Q]),M.__webglDepthbuffer[Q]=n.createRenderbuffer(),Ae(M.__webglDepthbuffer[Q],C,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=n.createRenderbuffer(),Ae(M.__webglDepthbuffer,C,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function qe(C,M,H){const Q=i.get(C);M!==void 0&&me(Q.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&Te(C)}function B(C){const M=C.texture,H=i.get(C),Q=i.get(M);C.addEventListener("dispose",N),C.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=n.createTexture()),Q.__version=M.version,r.memory.textures++);const $=C.isWebGLCubeRenderTarget===!0,ee=C.isWebGLMultipleRenderTargets===!0,_e=m(C)||o;if($){H.__webglFramebuffer=[];for(let le=0;le<6;le++)if(o&&M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[le]=[];for(let de=0;de<M.mipmaps.length;de++)H.__webglFramebuffer[le][de]=n.createFramebuffer()}else H.__webglFramebuffer[le]=n.createFramebuffer()}else{if(o&&M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let le=0;le<M.mipmaps.length;le++)H.__webglFramebuffer[le]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(ee&&s.drawBuffers){const le=C.texture;for(let de=0,we=le.length;de<we;de++){const ze=i.get(le[de]);ze.__webglTexture===void 0&&(ze.__webglTexture=n.createTexture(),r.memory.textures++)}}if(o&&C.samples>0&&ge(C)===!1){const le=ee?M:[M];H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let de=0;de<le.length;de++){const we=le[de];H.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[de]);const ze=a.convert(we.format,we.colorSpace),J=a.convert(we.type),Ke=S(we.internalFormat,ze,J,we.colorSpace,C.isXRRenderTarget===!0),ke=Le(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,Ke,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,H.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(H.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),q(n.TEXTURE_CUBE_MAP,M,_e);for(let le=0;le<6;le++)if(o&&M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)me(H.__webglFramebuffer[le][de],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,de);else me(H.__webglFramebuffer[le],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);_(M,_e)&&g(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const le=C.texture;for(let de=0,we=le.length;de<we;de++){const ze=le[de],J=i.get(ze);t.bindTexture(n.TEXTURE_2D,J.__webglTexture),q(n.TEXTURE_2D,ze,_e),me(H.__webglFramebuffer,C,ze,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,0),_(ze,_e)&&g(n.TEXTURE_2D)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&o&&(le=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,Q.__webglTexture),q(le,M,_e),o&&M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)me(H.__webglFramebuffer[de],C,M,n.COLOR_ATTACHMENT0,le,de);else me(H.__webglFramebuffer,C,M,n.COLOR_ATTACHMENT0,le,0);_(M,_e)&&g(le),t.unbindTexture()}C.depthBuffer&&Te(C)}function Pt(C){const M=m(C)||o,H=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let Q=0,$=H.length;Q<$;Q++){const ee=H[Q];if(_(ee,M)){const _e=C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,le=i.get(ee).__webglTexture;t.bindTexture(_e,le),g(_e),t.unbindTexture()}}}function Me(C){if(o&&C.samples>0&&ge(C)===!1){const M=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],H=C.width,Q=C.height;let $=n.COLOR_BUFFER_BIT;const ee=[],_e=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=i.get(C),de=C.isWebGLMultipleRenderTargets===!0;if(de)for(let we=0;we<M.length;we++)t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let we=0;we<M.length;we++){ee.push(n.COLOR_ATTACHMENT0+we),C.depthBuffer&&ee.push(_e);const ze=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(ze===!1&&(C.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),de&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,le.__webglColorRenderbuffer[we]),ze===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[_e]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_e])),de){const J=i.get(M[we]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,H,Q,0,0,H,Q,$,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let we=0;we<M.length;we++){t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,le.__webglColorRenderbuffer[we]);const ze=i.get(M[we]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function Le(C){return Math.min(s.maxSamples,C.samples)}function ge(C){const M=i.get(C);return o&&C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function rt(C){const M=r.render.frame;u.get(C)!==M&&(u.set(C,M),C.update())}function Oe(C,M){const H=C.colorSpace,Q=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===$a||H!==mi&&H!==Xt&&$e.getTransfer(H)===nt&&o===!1&&(e.has("EXT_sRGB")===!0&&Q===qt?(C.format=$a,C.minFilter=St,C.generateMipmaps=!1):M=Il.sRGBToLinear(M)),M}this.allocateTextureUnit=P,this.resetTextureUnits=te,this.setTexture2D=Z,this.setTexture2DArray=I,this.setTexture3D=U,this.setTextureCube=F,this.rebindTextures=qe,this.setupRenderTarget=B,this.updateRenderTargetMipmap=Pt,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=me,this.useMultisampledRTT=ge}function Lm(n,e,t){const i=t.isWebGL2;function s(a,r=Xt){let o;const l=$e.getTransfer(r);if(a===Ti)return n.UNSIGNED_BYTE;if(a===bl)return n.UNSIGNED_SHORT_4_4_4_4;if(a===wl)return n.UNSIGNED_SHORT_5_5_5_1;if(a===$c)return n.BYTE;if(a===Qc)return n.SHORT;if(a===or)return n.UNSIGNED_SHORT;if(a===Sl)return n.INT;if(a===Mi)return n.UNSIGNED_INT;if(a===Si)return n.FLOAT;if(a===jn)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(a===eu)return n.ALPHA;if(a===qt)return n.RGBA;if(a===tu)return n.LUMINANCE;if(a===iu)return n.LUMINANCE_ALPHA;if(a===zi)return n.DEPTH_COMPONENT;if(a===Cn)return n.DEPTH_STENCIL;if(a===$a)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(a===nu)return n.RED;if(a===Tl)return n.RED_INTEGER;if(a===su)return n.RG;if(a===Cl)return n.RG_INTEGER;if(a===El)return n.RGBA_INTEGER;if(a===oa||a===la||a===ca||a===ua)if(l===nt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(a===oa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===la)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===ca)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===ua)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(a===oa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===la)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===ca)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===ua)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Nr||a===Or||a===zr||a===Br)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(a===Nr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Or)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===zr)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Br)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Al)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(a===Gr||a===Vr)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(a===Gr)return l===nt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(a===Vr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Hr||a===kr||a===Wr||a===qr||a===Xr||a===Yr||a===Zr||a===Kr||a===jr||a===Jr||a===$r||a===Qr||a===eo||a===to)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(a===Hr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===kr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Wr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===qr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Xr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Yr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Zr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Kr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===jr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===Jr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===$r)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===Qr)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===eo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===to)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===ha||a===io||a===no)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(a===ha)return l===nt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===io)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===no)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===au||a===so||a===ao||a===ro)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(a===ha)return o.COMPRESSED_RED_RGTC1_EXT;if(a===so)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===ao)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===ro)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Oi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[a]!==void 0?n[a]:null}return{convert:s}}class Im extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class je extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dm={type:"move"};class Ua{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,v=.005;c.inputState.pinching&&d>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new je;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Um extends An{constructor(e,t){super();const i=this;let s=null,a=1,r=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,v=null;const x=t.getContextAttributes();let m=null,p=null;const _=[],g=[],S=new ae;let A=null;const T=new Vt;T.layers.enable(1),T.viewport=new at;const E=new Vt;E.layers.enable(2),E.viewport=new at;const N=[T,E],y=new Im;y.layers.enable(1),y.layers.enable(2);let w=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let K=_[q];return K===void 0&&(K=new Ua,_[q]=K),K.getTargetRaySpace()},this.getControllerGrip=function(q){let K=_[q];return K===void 0&&(K=new Ua,_[q]=K),K.getGripSpace()},this.getHand=function(q){let K=_[q];return K===void 0&&(K=new Ua,_[q]=K),K.getHandSpace()};function X(q){const K=g.indexOf(q.inputSource);if(K===-1)return;const ie=_[K];ie!==void 0&&(ie.update(q.inputSource,q.frame,c||r),ie.dispatchEvent({type:q.type,data:q.inputSource}))}function te(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",te),s.removeEventListener("inputsourceschange",P);for(let q=0;q<_.length;q++){const K=g[q];K!==null&&(g[q]=null,_[q].disconnect(K))}w=null,O=null,e.setRenderTarget(m),f=null,d=null,h=null,s=null,p=null,j.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(S.width,S.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,i.isPresenting},this.setReferenceSpaceType=function(q){o=q,i.isPresenting},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",te),s.addEventListener("inputsourceschange",P),x.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(S),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,t,K),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Gi(f.framebufferWidth,f.framebufferHeight,{format:qt,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let K=null,ie=null,he=null;x.depth&&(he=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=x.stencil?Cn:zi,ie=x.stencil?Oi:Mi);const me={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:a};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(me),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Gi(d.textureWidth,d.textureHeight,{format:qt,type:Ti,depthTexture:new Wl(d.textureWidth,d.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const Ae=e.properties.get(p);Ae.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),j.setContext(s),j.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(q){for(let K=0;K<q.removed.length;K++){const ie=q.removed[K],he=g.indexOf(ie);he>=0&&(g[he]=null,_[he].disconnect(ie))}for(let K=0;K<q.added.length;K++){const ie=q.added[K];let he=g.indexOf(ie);if(he===-1){for(let Ae=0;Ae<_.length;Ae++)if(Ae>=g.length){g.push(ie),he=Ae;break}else if(g[Ae]===null){g[Ae]=ie,he=Ae;break}if(he===-1)break}const me=_[he];me&&me.connect(ie)}}const z=new R,Z=new R;function I(q,K,ie){z.setFromMatrixPosition(K.matrixWorld),Z.setFromMatrixPosition(ie.matrixWorld);const he=z.distanceTo(Z),me=K.projectionMatrix.elements,Ae=ie.projectionMatrix.elements,Pe=me[14]/(me[10]-1),Te=me[14]/(me[10]+1),qe=(me[9]+1)/me[5],B=(me[9]-1)/me[5],Pt=(me[8]-1)/me[0],Me=(Ae[8]+1)/Ae[0],Le=Pe*Pt,ge=Pe*Me,rt=he/(-Pt+Me),Oe=rt*-Pt;K.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Oe),q.translateZ(rt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const C=Pe+rt,M=Te+rt,H=Le-Oe,Q=ge+(he-Oe),$=qe*Te/M*C,ee=B*Te/M*C;q.projectionMatrix.makePerspective(H,Q,$,ee,C,M),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function U(q,K){K===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(K.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;y.near=E.near=T.near=q.near,y.far=E.far=T.far=q.far,(w!==y.near||O!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),w=y.near,O=y.far);const K=q.parent,ie=y.cameras;U(y,K);for(let he=0;he<ie.length;he++)U(ie[he],K);ie.length===2?I(y,T,E):y.projectionMatrix.copy(T.projectionMatrix),F(q,y,K)};function F(q,K,ie){ie===null?q.matrix.copy(K.matrixWorld):(q.matrix.copy(ie.matrixWorld),q.matrix.invert(),q.matrix.multiply(K.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(K.projectionMatrix),q.projectionMatrixInverse.copy(K.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Jn*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)};let V=null;function Y(q,K){if(u=K.getViewerPose(c||r),v=K,u!==null){const ie=u.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let he=!1;ie.length!==y.cameras.length&&(y.cameras.length=0,he=!0);for(let me=0;me<ie.length;me++){const Ae=ie[me];let Pe=null;if(f!==null)Pe=f.getViewport(Ae);else{const qe=h.getViewSubImage(d,Ae);Pe=qe.viewport,me===0&&(e.setRenderTargetTextures(p,qe.colorTexture,d.ignoreDepthValues?void 0:qe.depthStencilTexture),e.setRenderTarget(p))}let Te=N[me];Te===void 0&&(Te=new Vt,Te.layers.enable(me),Te.viewport=new at,N[me]=Te),Te.matrix.fromArray(Ae.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Ae.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),me===0&&(y.matrix.copy(Te.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),he===!0&&y.cameras.push(Te)}}for(let ie=0;ie<_.length;ie++){const he=g[ie],me=_[ie];he!==null&&me!==void 0&&me.update(he,K,c||r)}V&&V(q,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),v=null}const j=new Hl;j.setAnimationLoop(Y),this.setAnimationLoop=function(q){V=q},this.dispose=function(){}}}function Fm(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Bl(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,_,g,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),h(m,p)):p.isMeshPhongMaterial?(a(m,p),u(m,p)):p.isMeshStandardMaterial?(a(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(a(m,p),v(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),x(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,_,g):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Nt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Nt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p).envMap;if(_&&(m.envMap.value=_,m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const g=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*g,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,_,g){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=g*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Nt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Nm(n,e,t,i){let s={},a={},r=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(_,g){const S=g.program;i.uniformBlockBinding(_,S)}function c(_,g){let S=s[_.id];S===void 0&&(v(_),S=u(_),s[_.id]=S,_.addEventListener("dispose",m));const A=g.program;i.updateUBOMapping(_,A);const T=e.render.frame;a[_.id]!==T&&(d(_),a[_.id]=T)}function u(_){const g=h();_.__bindingPointIndex=g;const S=n.createBuffer(),A=_.__size,T=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,A,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,g,S),S}function h(){for(let _=0;_<o;_++)if(r.indexOf(_)===-1)return r.push(_),_;return 0}function d(_){const g=s[_.id],S=_.uniforms,A=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,g);for(let T=0,E=S.length;T<E;T++){const N=Array.isArray(S[T])?S[T]:[S[T]];for(let y=0,w=N.length;y<w;y++){const O=N[y];if(f(O,T,y,A)===!0){const X=O.__offset,te=Array.isArray(O.value)?O.value:[O.value];let P=0;for(let z=0;z<te.length;z++){const Z=te[z],I=x(Z);typeof Z=="number"||typeof Z=="boolean"?(O.__data[0]=Z,n.bufferSubData(n.UNIFORM_BUFFER,X+P,O.__data)):Z.isMatrix3?(O.__data[0]=Z.elements[0],O.__data[1]=Z.elements[1],O.__data[2]=Z.elements[2],O.__data[3]=0,O.__data[4]=Z.elements[3],O.__data[5]=Z.elements[4],O.__data[6]=Z.elements[5],O.__data[7]=0,O.__data[8]=Z.elements[6],O.__data[9]=Z.elements[7],O.__data[10]=Z.elements[8],O.__data[11]=0):(Z.toArray(O.__data,P),P+=I.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,X,O.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(_,g,S,A){const T=_.value,E=g+"_"+S;if(A[E]===void 0)return typeof T=="number"||typeof T=="boolean"?A[E]=T:A[E]=T.clone(),!0;{const N=A[E];if(typeof T=="number"||typeof T=="boolean"){if(N!==T)return A[E]=T,!0}else if(N.equals(T)===!1)return N.copy(T),!0}return!1}function v(_){const g=_.uniforms;let S=0;const A=16;for(let E=0,N=g.length;E<N;E++){const y=Array.isArray(g[E])?g[E]:[g[E]];for(let w=0,O=y.length;w<O;w++){const X=y[w],te=Array.isArray(X.value)?X.value:[X.value];for(let P=0,z=te.length;P<z;P++){const Z=te[P],I=x(Z),U=S%A;U!==0&&A-U<I.boundary&&(S+=A-U),X.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=S,S+=I.storage}}}const T=S%A;return T>0&&(S+=A-T),_.__size=S,_.__cache={},this}function x(_){const g={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(g.boundary=4,g.storage=4):_.isVector2?(g.boundary=8,g.storage=8):_.isVector3||_.isColor?(g.boundary=16,g.storage=12):_.isVector4?(g.boundary=16,g.storage=16):_.isMatrix3?(g.boundary=48,g.storage=48):_.isMatrix4?(g.boundary=64,g.storage=64):_.isTexture,g}function m(_){const g=_.target;g.removeEventListener("dispose",m);const S=r.indexOf(g.__bindingPointIndex);r.splice(S,1),n.deleteBuffer(s[g.id]),delete s[g.id],delete a[g.id]}function p(){for(const _ in s)n.deleteBuffer(s[_]);r=[],s={},a={}}return{bind:l,update:c,dispose:p}}class jl{constructor(e={}){const{canvas:t=Lu(),context:i=null,depth:s=!0,stencil:a=!0,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=r;const f=new Uint32Array(4),v=new Int32Array(4);let x=null,m=null;const p=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bt,this._useLegacyLights=!1,this.toneMapping=wi,this.toneMappingExposure=1;const g=this;let S=!1,A=0,T=0,E=null,N=-1,y=null;const w=new at,O=new at;let X=null;const te=new fe(0);let P=0,z=t.width,Z=t.height,I=1,U=null,F=null;const V=new at(0,0,z,Z),Y=new at(0,0,z,Z);let j=!1;const q=new hr;let K=!1,ie=!1,he=null;const me=new Qe,Ae=new ae,Pe=new R,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function qe(){return E===null?I:1}let B=i;function Pt(b,D){for(let k=0;k<b.length;k++){const W=b[k],G=t.getContext(W,D);if(G!==null)return G}return null}try{const b={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rr}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",re,!1),B===null){const D=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&D.shift(),B=Pt(D,b),B===null)throw Pt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext,B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw b}let Me,Le,ge,rt,Oe,C,M,H,Q,$,ee,_e,le,de,we,ze,J,Ke,ke,Re,ye,pe,Ue,Xe;function ct(){Me=new Xd(B),Le=new Gd(B,Me,e),Me.init(Le),pe=new Lm(B,Me,Le),ge=new Rm(B,Me,Le),rt=new Kd(B),Oe=new mm,C=new Pm(B,Me,ge,Oe,Le,pe,rt),M=new Hd(g),H=new qd(g),Q=new ih(B,Le),Ue=new zd(B,Me,Q,Le),$=new Yd(B,Q,rt,Ue),ee=new Qd(B,$,Q,rt),ke=new $d(B,Le,C),ze=new Vd(Oe),_e=new pm(g,M,H,Me,Le,Ue,ze),le=new Fm(g,Oe),de=new gm,we=new bm(Me,Le),Ke=new Od(g,M,H,ge,ee,d,l),J=new Am(g,ee,Le),Xe=new Nm(B,rt,Le,ge),Re=new Bd(B,Me,rt,Le),ye=new Zd(B,Me,rt,Le),rt.programs=_e.programs,g.capabilities=Le,g.extensions=Me,g.properties=Oe,g.renderLists=de,g.shadowMap=J,g.state=ge,g.info=rt}ct();const Ge=new Um(g,B);this.xr=Ge,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const b=Me.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Me.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(b){b!==void 0&&(I=b,this.setSize(z,Z,!1))},this.getSize=function(b){return b.set(z,Z)},this.setSize=function(b,D,k=!0){Ge.isPresenting||(z=b,Z=D,t.width=Math.floor(b*I),t.height=Math.floor(D*I),k===!0&&(t.style.width=b+"px",t.style.height=D+"px"),this.setViewport(0,0,b,D))},this.getDrawingBufferSize=function(b){return b.set(z*I,Z*I).floor()},this.setDrawingBufferSize=function(b,D,k){z=b,Z=D,I=k,t.width=Math.floor(b*k),t.height=Math.floor(D*k),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(w)},this.getViewport=function(b){return b.copy(V)},this.setViewport=function(b,D,k,W){b.isVector4?V.set(b.x,b.y,b.z,b.w):V.set(b,D,k,W),ge.viewport(w.copy(V).multiplyScalar(I).floor())},this.getScissor=function(b){return b.copy(Y)},this.setScissor=function(b,D,k,W){b.isVector4?Y.set(b.x,b.y,b.z,b.w):Y.set(b,D,k,W),ge.scissor(O.copy(Y).multiplyScalar(I).floor())},this.getScissorTest=function(){return j},this.setScissorTest=function(b){ge.setScissorTest(j=b)},this.setOpaqueSort=function(b){U=b},this.setTransparentSort=function(b){F=b},this.getClearColor=function(b){return b.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor.apply(Ke,arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha.apply(Ke,arguments)},this.clear=function(b=!0,D=!0,k=!0){let W=0;if(b){let G=!1;if(E!==null){const ue=E.texture.format;G=ue===El||ue===Cl||ue===Tl}if(G){const ue=E.texture.type,xe=ue===Ti||ue===Mi||ue===or||ue===Oi||ue===bl||ue===wl,be=Ke.getClearColor(),Ee=Ke.getClearAlpha(),Be=be.r,Ie=be.g,De=be.b;xe?(f[0]=Be,f[1]=Ie,f[2]=De,f[3]=Ee,B.clearBufferuiv(B.COLOR,0,f)):(v[0]=Be,v[1]=Ie,v[2]=De,v[3]=Ee,B.clearBufferiv(B.COLOR,0,v))}else W|=B.COLOR_BUFFER_BIT}D&&(W|=B.DEPTH_BUFFER_BIT),k&&(W|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",re,!1),de.dispose(),we.dispose(),Oe.dispose(),M.dispose(),H.dispose(),ee.dispose(),Ue.dispose(),Xe.dispose(),_e.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Lt),Ge.removeEventListener("sessionend",it),he&&(he.dispose(),he=null),It.stop()};function ne(b){b.preventDefault(),S=!0}function L(){S=!1;const b=rt.autoReset,D=J.enabled,k=J.autoUpdate,W=J.needsUpdate,G=J.type;ct(),rt.autoReset=b,J.enabled=D,J.autoUpdate=k,J.needsUpdate=W,J.type=G}function re(b){}function oe(b){const D=b.target;D.removeEventListener("dispose",oe),Ce(D)}function Ce(b){Se(b),Oe.remove(b)}function Se(b){const D=Oe.get(b).programs;D!==void 0&&(D.forEach(function(k){_e.releaseProgram(k)}),b.isShaderMaterial&&_e.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,k,W,G,ue){D===null&&(D=Te);const xe=G.isMesh&&G.matrixWorld.determinant()<0,be=uc(b,D,k,W,G);ge.setMaterial(W,xe);let Ee=k.index,Be=1;if(W.wireframe===!0){if(Ee=$.getWireframeAttribute(k),Ee===void 0)return;Be=2}const Ie=k.drawRange,De=k.attributes.position;let ht=Ie.start*Be,Ot=(Ie.start+Ie.count)*Be;ue!==null&&(ht=Math.max(ht,ue.start*Be),Ot=Math.min(Ot,(ue.start+ue.count)*Be)),Ee!==null?(ht=Math.max(ht,0),Ot=Math.min(Ot,Ee.count)):De!=null&&(ht=Math.max(ht,0),Ot=Math.min(Ot,De.count));const _t=Ot-ht;if(_t<0||_t===1/0)return;Ue.setup(G,W,be,k,Ee);let ai,ot=Re;if(Ee!==null&&(ai=Q.get(Ee),ot=ye,ot.setIndex(ai)),G.isMesh)W.wireframe===!0?(ge.setLineWidth(W.wireframeLinewidth*qe()),ot.setMode(B.LINES)):ot.setMode(B.TRIANGLES);else if(G.isLine){let Ve=W.linewidth;Ve===void 0&&(Ve=1),ge.setLineWidth(Ve*qe()),G.isLineSegments?ot.setMode(B.LINES):G.isLineLoop?ot.setMode(B.LINE_LOOP):ot.setMode(B.LINE_STRIP)}else G.isPoints?ot.setMode(B.POINTS):G.isSprite&&ot.setMode(B.TRIANGLES);if(G.isBatchedMesh)ot.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)ot.renderInstances(ht,_t,G.count);else if(k.isInstancedBufferGeometry){const Ve=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,ia=Math.min(k.instanceCount,Ve);ot.renderInstances(ht,_t,ia)}else ot.render(ht,_t)};function et(b,D,k){b.transparent===!0&&b.side===Mt&&b.forceSinglePass===!1?(b.side=Nt,b.needsUpdate=!0,ss(b,D,k),b.side=pi,b.needsUpdate=!0,ss(b,D,k),b.side=Mt):ss(b,D,k)}this.compile=function(b,D,k=null){k===null&&(k=b),m=we.get(k),m.init(),_.push(m),k.traverseVisible(function(G){G.isLight&&G.layers.test(D.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),b!==k&&b.traverseVisible(function(G){G.isLight&&G.layers.test(D.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(g._useLegacyLights);const W=new Set;return b.traverse(function(G){const ue=G.material;if(ue)if(Array.isArray(ue))for(let xe=0;xe<ue.length;xe++){const be=ue[xe];et(be,k,G),W.add(be)}else et(ue,k,G),W.add(ue)}),_.pop(),m=null,W},this.compileAsync=function(b,D,k=null){const W=this.compile(b,D,k);return new Promise(G=>{function ue(){if(W.forEach(function(xe){Oe.get(xe).currentProgram.isReady()&&W.delete(xe)}),W.size===0){G(b);return}setTimeout(ue,10)}Me.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let tt=null;function xt(b){tt&&tt(b)}function Lt(){It.stop()}function it(){It.start()}const It=new Hl;It.setAnimationLoop(xt),typeof self<"u"&&It.setContext(self),this.setAnimationLoop=function(b){tt=b,Ge.setAnimationLoop(b),b===null?It.stop():It.start()},Ge.addEventListener("sessionstart",Lt),Ge.addEventListener("sessionend",it),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0||S===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(D),D=Ge.getCamera()),b.isScene===!0&&b.onBeforeRender(g,b,D,E),m=we.get(b,_.length),m.init(),_.push(m),me.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),q.setFromProjectionMatrix(me),ie=this.localClippingEnabled,K=ze.init(this.clippingPlanes,ie),x=de.get(b,p.length),x.init(),p.push(x),$t(b,D,0,g.sortObjects),x.finish(),g.sortObjects===!0&&x.sort(U,F),this.info.render.frame++,K===!0&&ze.beginShadows();const k=m.state.shadowsArray;if(J.render(k,b,D),K===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ke.render(x,b),m.setupLights(g._useLegacyLights),D.isArrayCamera){const W=D.cameras;for(let G=0,ue=W.length;G<ue;G++){const xe=W[G];Sr(x,b,xe,xe.viewport)}}else Sr(x,b,D);E!==null&&(C.updateMultisampleRenderTarget(E),C.updateRenderTargetMipmap(E)),b.isScene===!0&&b.onAfterRender(g,b,D),Ue.resetDefaultState(),N=-1,y=null,_.pop(),_.length>0?m=_[_.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function $t(b,D,k,W){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)k=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||q.intersectsSprite(b)){W&&Pe.setFromMatrixPosition(b.matrixWorld).applyMatrix4(me);const xe=ee.update(b),be=b.material;be.visible&&x.push(b,xe,be,k,Pe.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||q.intersectsObject(b))){const xe=ee.update(b),be=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Pe.copy(b.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Pe.copy(xe.boundingSphere.center)),Pe.applyMatrix4(b.matrixWorld).applyMatrix4(me)),Array.isArray(be)){const Ee=xe.groups;for(let Be=0,Ie=Ee.length;Be<Ie;Be++){const De=Ee[Be],ht=be[De.materialIndex];ht&&ht.visible&&x.push(b,xe,ht,k,Pe.z,De)}}else be.visible&&x.push(b,xe,be,k,Pe.z,null)}}const ue=b.children;for(let xe=0,be=ue.length;xe<be;xe++)$t(ue[xe],D,k,W)}function Sr(b,D,k,W){const G=b.opaque,ue=b.transmissive,xe=b.transparent;m.setupLightsView(k),K===!0&&ze.setGlobalState(g.clippingPlanes,k),ue.length>0&&cc(G,ue,D,k),W&&ge.viewport(w.copy(W)),G.length>0&&ns(G,D,k),ue.length>0&&ns(ue,D,k),xe.length>0&&ns(xe,D,k),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function cc(b,D,k,W){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;const ue=Le.isWebGL2;he===null&&(he=new Gi(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?jn:Ti,minFilter:Kn,samples:ue?4:0})),g.getDrawingBufferSize(Ae),ue?he.setSize(Ae.x,Ae.y):he.setSize(Ys(Ae.x),Ys(Ae.y));const xe=g.getRenderTarget();g.setRenderTarget(he),g.getClearColor(te),P=g.getClearAlpha(),P<1&&g.setClearColor(16777215,.5),g.clear();const be=g.toneMapping;g.toneMapping=wi,ns(b,k,W),C.updateMultisampleRenderTarget(he),C.updateRenderTargetMipmap(he);let Ee=!1;for(let Be=0,Ie=D.length;Be<Ie;Be++){const De=D[Be],ht=De.object,Ot=De.geometry,_t=De.material,ai=De.group;if(_t.side===Mt&&ht.layers.test(W.layers)){const ot=_t.side;_t.side=Nt,_t.needsUpdate=!0,br(ht,k,W,Ot,_t,ai),_t.side=ot,_t.needsUpdate=!0,Ee=!0}}Ee===!0&&(C.updateMultisampleRenderTarget(he),C.updateRenderTargetMipmap(he)),g.setRenderTarget(xe),g.setClearColor(te,P),g.toneMapping=be}function ns(b,D,k){const W=D.isScene===!0?D.overrideMaterial:null;for(let G=0,ue=b.length;G<ue;G++){const xe=b[G],be=xe.object,Ee=xe.geometry,Be=W===null?xe.material:W,Ie=xe.group;be.layers.test(k.layers)&&br(be,D,k,Ee,Be,Ie)}}function br(b,D,k,W,G,ue){b.onBeforeRender(g,D,k,W,G,ue),b.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(g,D,k,W,b,ue),G.transparent===!0&&G.side===Mt&&G.forceSinglePass===!1?(G.side=Nt,G.needsUpdate=!0,g.renderBufferDirect(k,D,W,G,b,ue),G.side=pi,G.needsUpdate=!0,g.renderBufferDirect(k,D,W,G,b,ue),G.side=Mt):g.renderBufferDirect(k,D,W,G,b,ue),b.onAfterRender(g,D,k,W,G,ue)}function ss(b,D,k){D.isScene!==!0&&(D=Te);const W=Oe.get(b),G=m.state.lights,ue=m.state.shadowsArray,xe=G.state.version,be=_e.getParameters(b,G.state,ue,D,k),Ee=_e.getProgramCacheKey(be);let Be=W.programs;W.environment=b.isMeshStandardMaterial?D.environment:null,W.fog=D.fog,W.envMap=(b.isMeshStandardMaterial?H:M).get(b.envMap||W.environment),Be===void 0&&(b.addEventListener("dispose",oe),Be=new Map,W.programs=Be);let Ie=Be.get(Ee);if(Ie!==void 0){if(W.currentProgram===Ie&&W.lightsStateVersion===xe)return Tr(b,be),Ie}else be.uniforms=_e.getUniforms(b),b.onBuild(k,be,g),b.onBeforeCompile(be,g),Ie=_e.acquireProgram(be,Ee),Be.set(Ee,Ie),W.uniforms=be.uniforms;const De=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(De.clippingPlanes=ze.uniform),Tr(b,be),W.needsLights=fc(b),W.lightsStateVersion=xe,W.needsLights&&(De.ambientLightColor.value=G.state.ambient,De.lightProbe.value=G.state.probe,De.directionalLights.value=G.state.directional,De.directionalLightShadows.value=G.state.directionalShadow,De.spotLights.value=G.state.spot,De.spotLightShadows.value=G.state.spotShadow,De.rectAreaLights.value=G.state.rectArea,De.ltc_1.value=G.state.rectAreaLTC1,De.ltc_2.value=G.state.rectAreaLTC2,De.pointLights.value=G.state.point,De.pointLightShadows.value=G.state.pointShadow,De.hemisphereLights.value=G.state.hemi,De.directionalShadowMap.value=G.state.directionalShadowMap,De.directionalShadowMatrix.value=G.state.directionalShadowMatrix,De.spotShadowMap.value=G.state.spotShadowMap,De.spotLightMatrix.value=G.state.spotLightMatrix,De.spotLightMap.value=G.state.spotLightMap,De.pointShadowMap.value=G.state.pointShadowMap,De.pointShadowMatrix.value=G.state.pointShadowMatrix),W.currentProgram=Ie,W.uniformsList=null,Ie}function wr(b){if(b.uniformsList===null){const D=b.currentProgram.getUniforms();b.uniformsList=Gs.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function Tr(b,D){const k=Oe.get(b);k.outputColorSpace=D.outputColorSpace,k.batching=D.batching,k.instancing=D.instancing,k.instancingColor=D.instancingColor,k.skinning=D.skinning,k.morphTargets=D.morphTargets,k.morphNormals=D.morphNormals,k.morphColors=D.morphColors,k.morphTargetsCount=D.morphTargetsCount,k.numClippingPlanes=D.numClippingPlanes,k.numIntersection=D.numClipIntersection,k.vertexAlphas=D.vertexAlphas,k.vertexTangents=D.vertexTangents,k.toneMapping=D.toneMapping}function uc(b,D,k,W,G){D.isScene!==!0&&(D=Te),C.resetTextureUnits();const ue=D.fog,xe=W.isMeshStandardMaterial?D.environment:null,be=E===null?g.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:mi,Ee=(W.isMeshStandardMaterial?H:M).get(W.envMap||xe),Be=W.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ie=!!k.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),De=!!k.morphAttributes.position,ht=!!k.morphAttributes.normal,Ot=!!k.morphAttributes.color;let _t=wi;W.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(_t=g.toneMapping);const ai=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ot=ai!==void 0?ai.length:0,Ve=Oe.get(W),ia=m.state.lights;if(K===!0&&(ie===!0||b!==y)){const kt=b===y&&W.id===N;ze.setState(W,b,kt)}let ut=!1;W.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==ia.state.version||Ve.outputColorSpace!==be||G.isBatchedMesh&&Ve.batching===!1||!G.isBatchedMesh&&Ve.batching===!0||G.isInstancedMesh&&Ve.instancing===!1||!G.isInstancedMesh&&Ve.instancing===!0||G.isSkinnedMesh&&Ve.skinning===!1||!G.isSkinnedMesh&&Ve.skinning===!0||G.isInstancedMesh&&Ve.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ve.instancingColor===!1&&G.instanceColor!==null||Ve.envMap!==Ee||W.fog===!0&&Ve.fog!==ue||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ze.numPlanes||Ve.numIntersection!==ze.numIntersection)||Ve.vertexAlphas!==Be||Ve.vertexTangents!==Ie||Ve.morphTargets!==De||Ve.morphNormals!==ht||Ve.morphColors!==Ot||Ve.toneMapping!==_t||Le.isWebGL2===!0&&Ve.morphTargetsCount!==ot)&&(ut=!0):(ut=!0,Ve.__version=W.version);let Ei=Ve.currentProgram;ut===!0&&(Ei=ss(W,D,G));let Cr=!1,Pn=!1,na=!1;const Tt=Ei.getUniforms(),Ai=Ve.uniforms;if(ge.useProgram(Ei.program)&&(Cr=!0,Pn=!0,na=!0),W.id!==N&&(N=W.id,Pn=!0),Cr||y!==b){Tt.setValue(B,"projectionMatrix",b.projectionMatrix),Tt.setValue(B,"viewMatrix",b.matrixWorldInverse);const kt=Tt.map.cameraPosition;kt!==void 0&&kt.setValue(B,Pe.setFromMatrixPosition(b.matrixWorld)),Le.logarithmicDepthBuffer&&Tt.setValue(B,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Tt.setValue(B,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Pn=!0,na=!0)}if(G.isSkinnedMesh){Tt.setOptional(B,G,"bindMatrix"),Tt.setOptional(B,G,"bindMatrixInverse");const kt=G.skeleton;kt&&Le.floatVertexTextures&&(kt.boneTexture===null&&kt.computeBoneTexture(),Tt.setValue(B,"boneTexture",kt.boneTexture,C))}G.isBatchedMesh&&(Tt.setOptional(B,G,"batchingTexture"),Tt.setValue(B,"batchingTexture",G._matricesTexture,C));const sa=k.morphAttributes;if((sa.position!==void 0||sa.normal!==void 0||sa.color!==void 0&&Le.isWebGL2===!0)&&ke.update(G,k,Ei),(Pn||Ve.receiveShadow!==G.receiveShadow)&&(Ve.receiveShadow=G.receiveShadow,Tt.setValue(B,"receiveShadow",G.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ai.envMap.value=Ee,Ai.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),Pn&&(Tt.setValue(B,"toneMappingExposure",g.toneMappingExposure),Ve.needsLights&&hc(Ai,na),ue&&W.fog===!0&&le.refreshFogUniforms(Ai,ue),le.refreshMaterialUniforms(Ai,W,I,Z,he),Gs.upload(B,wr(Ve),Ai,C)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Gs.upload(B,wr(Ve),Ai,C),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Tt.setValue(B,"center",G.center),Tt.setValue(B,"modelViewMatrix",G.modelViewMatrix),Tt.setValue(B,"normalMatrix",G.normalMatrix),Tt.setValue(B,"modelMatrix",G.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const kt=W.uniformsGroups;for(let aa=0,dc=kt.length;aa<dc;aa++)if(Le.isWebGL2){const Er=kt[aa];Xe.update(Er,Ei),Xe.bind(Er,Ei)}}return Ei}function hc(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function fc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(b,D,k){Oe.get(b.texture).__webglTexture=D,Oe.get(b.depthTexture).__webglTexture=k;const W=Oe.get(b);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=k===void 0,W.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,D){const k=Oe.get(b);k.__webglFramebuffer=D,k.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,k=0){E=b,A=D,T=k;let W=!0,G=null,ue=!1,xe=!1;if(b){const Ee=Oe.get(b);Ee.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(B.FRAMEBUFFER,null),W=!1):Ee.__webglFramebuffer===void 0?C.setupRenderTarget(b):Ee.__hasExternalTextures&&C.rebindTextures(b,Oe.get(b.texture).__webglTexture,Oe.get(b.depthTexture).__webglTexture);const Be=b.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(xe=!0);const Ie=Oe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ie[D])?G=Ie[D][k]:G=Ie[D],ue=!0):Le.isWebGL2&&b.samples>0&&C.useMultisampledRTT(b)===!1?G=Oe.get(b).__webglMultisampledFramebuffer:Array.isArray(Ie)?G=Ie[k]:G=Ie,w.copy(b.viewport),O.copy(b.scissor),X=b.scissorTest}else w.copy(V).multiplyScalar(I).floor(),O.copy(Y).multiplyScalar(I).floor(),X=j;if(ge.bindFramebuffer(B.FRAMEBUFFER,G)&&Le.drawBuffers&&W&&ge.drawBuffers(b,G),ge.viewport(w),ge.scissor(O),ge.setScissorTest(X),ue){const Ee=Oe.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+D,Ee.__webglTexture,k)}else if(xe){const Ee=Oe.get(b.texture),Be=D||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ee.__webglTexture,k||0,Be)}N=-1},this.readRenderTargetPixels=function(b,D,k,W,G,ue,xe){if(!(b&&b.isWebGLRenderTarget))return;let be=Oe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xe!==void 0&&(be=be[xe]),be){ge.bindFramebuffer(B.FRAMEBUFFER,be);try{const Ee=b.texture,Be=Ee.format,Ie=Ee.type;if(Be!==qt&&pe.convert(Be)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT))return;const De=Ie===jn&&(Me.has("EXT_color_buffer_half_float")||Le.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Ie!==Ti&&pe.convert(Ie)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ie===Si&&(Le.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!De)return;D>=0&&D<=b.width-W&&k>=0&&k<=b.height-G&&B.readPixels(D,k,W,G,pe.convert(Be),pe.convert(Ie),ue)}finally{const Ee=E!==null?Oe.get(E).__webglFramebuffer:null;ge.bindFramebuffer(B.FRAMEBUFFER,Ee)}}},this.copyFramebufferToTexture=function(b,D,k=0){const W=Math.pow(2,-k),G=Math.floor(D.image.width*W),ue=Math.floor(D.image.height*W);C.setTexture2D(D,0),B.copyTexSubImage2D(B.TEXTURE_2D,k,0,0,b.x,b.y,G,ue),ge.unbindTexture()},this.copyTextureToTexture=function(b,D,k,W=0){const G=D.image.width,ue=D.image.height,xe=pe.convert(k.format),be=pe.convert(k.type);C.setTexture2D(k,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,k.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,k.unpackAlignment),D.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,W,b.x,b.y,G,ue,xe,be,D.image.data):D.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,W,b.x,b.y,D.mipmaps[0].width,D.mipmaps[0].height,xe,D.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,W,b.x,b.y,xe,be,D.image),W===0&&k.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(b,D,k,W,G=0){if(g.isWebGL1Renderer)return;const ue=b.max.x-b.min.x+1,xe=b.max.y-b.min.y+1,be=b.max.z-b.min.z+1,Ee=pe.convert(W.format),Be=pe.convert(W.type);let Ie;if(W.isData3DTexture)C.setTexture3D(W,0),Ie=B.TEXTURE_3D;else if(W.isDataArrayTexture||W.isCompressedArrayTexture)C.setTexture2DArray(W,0),Ie=B.TEXTURE_2D_ARRAY;else return;B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,W.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,W.unpackAlignment);const De=B.getParameter(B.UNPACK_ROW_LENGTH),ht=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ot=B.getParameter(B.UNPACK_SKIP_PIXELS),_t=B.getParameter(B.UNPACK_SKIP_ROWS),ai=B.getParameter(B.UNPACK_SKIP_IMAGES),ot=k.isCompressedTexture?k.mipmaps[G]:k.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,ot.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ot.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,b.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,b.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,b.min.z),k.isDataTexture||k.isData3DTexture?B.texSubImage3D(Ie,G,D.x,D.y,D.z,ue,xe,be,Ee,Be,ot.data):k.isCompressedArrayTexture?B.compressedTexSubImage3D(Ie,G,D.x,D.y,D.z,ue,xe,be,Ee,ot.data):B.texSubImage3D(Ie,G,D.x,D.y,D.z,ue,xe,be,Ee,Be,ot),B.pixelStorei(B.UNPACK_ROW_LENGTH,De),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ht),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ot),B.pixelStorei(B.UNPACK_SKIP_ROWS,_t),B.pixelStorei(B.UNPACK_SKIP_IMAGES,ai),G===0&&W.generateMipmaps&&B.generateMipmap(Ie),ge.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),ge.unbindTexture()},this.resetState=function(){A=0,T=0,E=null,ge.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===lr?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===$s?"display-p3":"srgb"}get outputEncoding(){return this.outputColorSpace===bt?Bi:Rl}set outputEncoding(e){this.outputColorSpace=e===Bi?bt:mi}get useLegacyLights(){return this._useLegacyLights}set useLegacyLights(e){this._useLegacyLights=e}}class Om extends jl{}Om.prototype.isWebGL1Renderer=!0;class zm extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Bm{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,a=this.stride;s<a;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new R;class Zs{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ii(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ii(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ii(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ii(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),s=Je(s,this.array),a=Je(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=a,this}clone(e){if(e===void 0){const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return new st(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Jl extends Wi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ln;const Fn=new R,cn=new R,un=new R,hn=new ae,Nn=new ae,$l=new Qe,Es=new R,On=new R,As=new R,jo=new ae,Fa=new ae,Jo=new ae;class Gm extends pt{constructor(e=new Jl){if(super(),this.isSprite=!0,this.type="Sprite",ln===void 0){ln=new Ze;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Bm(t,5);ln.setIndex([0,1,2,0,2,3]),ln.setAttribute("position",new Zs(i,3,0,!1)),ln.setAttribute("uv",new Zs(i,2,3,!1))}this.geometry=ln,this.material=e,this.center=new ae(.5,.5)}raycast(e,t){e.camera,cn.setFromMatrixScale(this.matrixWorld),$l.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),un.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cn.multiplyScalar(-un.z);const i=this.material.rotation;let s,a;i!==0&&(a=Math.cos(i),s=Math.sin(i));const r=this.center;Rs(Es.set(-.5,-.5,0),un,r,cn,s,a),Rs(On.set(.5,-.5,0),un,r,cn,s,a),Rs(As.set(.5,.5,0),un,r,cn,s,a),jo.set(0,0),Fa.set(1,0),Jo.set(1,1);let o=e.ray.intersectTriangle(Es,On,As,!1,Fn);if(o===null&&(Rs(On.set(-.5,.5,0),un,r,cn,s,a),Fa.set(0,1),o=e.ray.intersectTriangle(Es,As,On,!1,Fn),o===null))return;const l=e.ray.origin.distanceTo(Fn);l<e.near||l>e.far||t.push({distance:l,point:Fn.clone(),uv:Gt.getInterpolation(Fn,Es,On,As,jo,Fa,Jo,new ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Rs(n,e,t,i,s,a){hn.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Nn.x=a*hn.x-s*hn.y,Nn.y=s*hn.x+a*hn.y):Nn.copy(hn),n.copy(e),n.x+=Nn.x,n.y+=Nn.y,n.applyMatrix4($l)}class Vm extends Rt{constructor(e=null,t=1,i=1,s,a,r,o,l,c=mt,u=mt,h,d){super(null,r,o,l,c,u,s,a,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $o extends st{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const fn=new Qe,Qo=new Qe,Ps=[],el=new Hi,Hm=new Qe,zn=new We,Bn=new ki;class tl extends We{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $o(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Hm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,fn),el.copy(e.boundingBox).applyMatrix4(fn),this.boundingBox.union(el)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,fn),Bn.copy(e.boundingSphere).applyMatrix4(fn),this.boundingSphere.union(Bn)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(zn.geometry=this.geometry,zn.material=this.material,zn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bn.copy(this.boundingSphere),Bn.applyMatrix4(i),e.ray.intersectsSphere(Bn)!==!1))for(let a=0;a<s;a++){this.getMatrixAt(a,fn),Qo.multiplyMatrices(i,fn),zn.matrixWorld=Qo,zn.raycast(e,Ps);for(let r=0,o=Ps.length;r<o;r++){const l=Ps[r];l.instanceId=a,l.object=this,t.push(l)}Ps.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new $o(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class dn extends Wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const il=new R,nl=new R,sl=new Qe,Na=new ur,Ls=new ki;class km extends pt{constructor(e=new Ze,t=new dn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,a=t.count;s<a;s++)il.fromBufferAttribute(t,s-1),nl.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=il.distanceTo(nl);e.setAttribute("lineDistance",new Ne(i,1))}return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ls.copy(i.boundingSphere),Ls.applyMatrix4(s),Ls.radius+=a,e.ray.intersectsSphere(Ls)===!1)return;sl.copy(s).invert(),Na.copy(e.ray).applyMatrix4(sl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new R,u=new R,h=new R,d=new R,f=this.isLineSegments?2:1,v=i.index,m=i.attributes.position;if(v!==null){const p=Math.max(0,r.start),_=Math.min(v.count,r.start+r.count);for(let g=p,S=_-1;g<S;g+=f){const A=v.getX(g),T=v.getX(g+1);if(c.fromBufferAttribute(m,A),u.fromBufferAttribute(m,T),Na.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const N=e.ray.origin.distanceTo(d);N<e.near||N>e.far||t.push({distance:N,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,r.start),_=Math.min(m.count,r.start+r.count);for(let g=p,S=_-1;g<S;g+=f){if(c.fromBufferAttribute(m,g),u.fromBufferAttribute(m,g+1),Na.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(d);T<e.near||T>e.far||t.push({distance:T,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}const al=new R,rl=new R;class Gn extends km{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,a=t.count;s<a;s+=2)al.fromBufferAttribute(t,s),rl.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+al.distanceTo(rl);e.setAttribute("lineDistance",new Ne(i,1))}return this}}class Vs extends Wi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ol=new Qe,tr=new ur,Is=new ki,Ds=new R;class hi extends pt{constructor(e=new Ze,t=new Vs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere),Is.applyMatrix4(s),Is.radius+=a,e.ray.intersectsSphere(Is)===!1)return;ol.copy(s).invert(),tr.copy(e.ray).applyMatrix4(ol);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let v=d,x=f;v<x;v++){const m=c.getX(v);Ds.fromBufferAttribute(h,m),ll(Ds,m,l,s,e,t,this)}}else{const d=Math.max(0,r.start),f=Math.min(h.count,r.start+r.count);for(let v=d,x=f;v<x;v++)Ds.fromBufferAttribute(h,v),ll(Ds,v,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function ll(n,e,t,i,s,a,r){const o=tr.distanceSqToPoint(n);if(o<t){const l=new R;tr.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:r})}}class Vn extends Rt{constructor(e,t,i,s,a,r,o,l,c){super(e,t,i,s,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class si{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),a=0;t.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),a+=i.distanceTo(s),t.push(a),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const a=i.length;let r;t?r=t:r=e*i[a-1];let o=0,l=a-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-r,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(a-1);const u=i[s],d=i[s+1]-u,f=(r-u)/d;return(s+f)/(a-1)}getTangent(e,t){let s=e-1e-4,a=e+1e-4;s<0&&(s=0),a>1&&(a=1);const r=this.getPoint(s),o=this.getPoint(a),l=t||(r.isVector2?new ae:new R);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new R,s=[],a=[],r=[],o=new R,l=new Qe;for(let f=0;f<=e;f++){const v=f/e;s[f]=this.getTangentAt(v,new R)}a[0]=new R,r[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),a[0].crossVectors(s[0],o),r[0].crossVectors(s[0],a[0]);for(let f=1;f<=e;f++){if(a[f]=a[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const v=Math.acos(wt(s[f-1].dot(s[f]),-1,1));a[f].applyMatrix4(l.makeRotationAxis(o,v))}r[f].crossVectors(s[f],a[f])}if(t===!0){let f=Math.acos(wt(a[0].dot(a[e]),-1,1));f/=e,s[0].dot(o.crossVectors(a[0],a[e]))>0&&(f=-f);for(let v=1;v<=e;v++)a[v].applyMatrix4(l.makeRotationAxis(s[v],f*v)),r[v].crossVectors(s[v],a[v])}return{tangents:s,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class dr extends si{constructor(e=0,t=0,i=1,s=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const i=t||new ae,s=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(r?a=0:a=s),this.aClockwise===!0&&!r&&(a===s?a=-s:a=a-s);const o=this.aStartAngle+e*a;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Wm extends dr{constructor(e,t,i,s,a,r){super(e,t,i,i,s,a,r),this.isArcCurve=!0,this.type="ArcCurve"}}function pr(){let n=0,e=0,t=0,i=0;function s(a,r,o,l){n=a,e=o,t=-3*a+3*r-2*o-l,i=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){s(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,u,h){let d=(r-a)/c-(o-a)/(c+u)+(o-r)/u,f=(o-r)/u-(l-r)/(u+h)+(l-o)/h;d*=u,f*=u,s(r,o,d,f)},calc:function(a){const r=a*a,o=r*a;return n+e*a+t*r+i*o}}}const Us=new R,Oa=new pr,za=new pr,Ba=new pr;class qm extends si{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new R){const i=t,s=this.points,a=s.length,r=(a-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%a]:(Us.subVectors(s[0],s[1]).add(s[0]),c=Us);const h=s[o%a],d=s[(o+1)%a];if(this.closed||o+2<a?u=s[(o+2)%a]:(Us.subVectors(s[a-1],s[a-2]).add(s[a-1]),u=Us),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),v<1e-4&&(v=x),m<1e-4&&(m=x),Oa.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,v,x,m),za.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,v,x,m),Ba.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,v,x,m)}else this.curveType==="catmullrom"&&(Oa.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),za.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Ba.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return i.set(Oa.calc(l),za.calc(l),Ba.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new R().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function cl(n,e,t,i,s){const a=(i-e)*.5,r=(s-t)*.5,o=n*n,l=n*o;return(2*t-2*i+a+r)*l+(-3*t+3*i-2*a-r)*o+a*n+t}function Xm(n,e){const t=1-n;return t*t*e}function Ym(n,e){return 2*(1-n)*n*e}function Zm(n,e){return n*n*e}function qn(n,e,t,i){return Xm(n,e)+Ym(n,t)+Zm(n,i)}function Km(n,e){const t=1-n;return t*t*t*e}function jm(n,e){const t=1-n;return 3*t*t*n*e}function Jm(n,e){return 3*(1-n)*n*n*e}function $m(n,e){return n*n*n*e}function Xn(n,e,t,i,s){return Km(n,e)+jm(n,t)+Jm(n,i)+$m(n,s)}class Ql extends si{constructor(e=new ae,t=new ae,i=new ae,s=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ae){const i=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Xn(e,s.x,a.x,r.x,o.x),Xn(e,s.y,a.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Qm extends si{constructor(e=new R,t=new R,i=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new R){const i=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Xn(e,s.x,a.x,r.x,o.x),Xn(e,s.y,a.y,r.y,o.y),Xn(e,s.z,a.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ec extends si{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class e0 extends si{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tc extends si{constructor(e=new ae,t=new ae,i=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ae){const i=t,s=this.v0,a=this.v1,r=this.v2;return i.set(qn(e,s.x,a.x,r.x),qn(e,s.y,a.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class t0 extends si{constructor(e=new R,t=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new R){const i=t,s=this.v0,a=this.v1,r=this.v2;return i.set(qn(e,s.x,a.x,r.x),qn(e,s.y,a.y,r.y),qn(e,s.z,a.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ic extends si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){const i=t,s=this.points,a=(s.length-1)*e,r=Math.floor(a),o=a-r,l=s[r===0?r:r-1],c=s[r],u=s[r>s.length-2?s.length-1:r+1],h=s[r>s.length-3?s.length-1:r+2];return i.set(cl(o,l.x,c.x,u.x,h.x),cl(o,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new ae().fromArray(s))}return this}}var ul=Object.freeze({__proto__:null,ArcCurve:Wm,CatmullRomCurve3:qm,CubicBezierCurve:Ql,CubicBezierCurve3:Qm,EllipseCurve:dr,LineCurve:ec,LineCurve3:e0,QuadraticBezierCurve:tc,QuadraticBezierCurve3:t0,SplineCurve:ic});class i0 extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ul[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let a=0;for(;a<s.length;){if(s[a]>=i){const r=s[a]-i,o=this.curves[a],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,a=this.curves;s<a.length;s++){const r=a[s],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new ul[s.type]().fromJSON(s))}return this}}class hl extends i0{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new ec(this.currentPoint.clone(),new ae(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const a=new tc(this.currentPoint.clone(),new ae(e,t),new ae(i,s));return this.curves.push(a),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,a,r){const o=new Ql(this.currentPoint.clone(),new ae(e,t),new ae(i,s),new ae(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new ic(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,a,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,s,a,r),this}absarc(e,t,i,s,a,r){return this.absellipse(e,t,i,i,s,a,r),this}ellipse(e,t,i,s,a,r,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,s,a,r,o,l),this}absellipse(e,t,i,s,a,r,o,l){const c=new dr(e,t,i,s,a,r,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class mr extends Ze{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const a=[],r=[],o=[],l=[],c=new R,u=new ae;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=i+h/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(r[d]/e+1)/2,u.y=(r[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)a.push(h,h+1,0);this.setIndex(a),this.setAttribute("position",new Ne(r,3)),this.setAttribute("normal",new Ne(o,3)),this.setAttribute("uv",new Ne(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class vr extends Ze{constructor(e=1,t=1,i=1,s=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),a=Math.floor(a);const u=[],h=[],d=[],f=[];let v=0;const x=[],m=i/2;let p=0;_(),r===!1&&(e>0&&g(!0),t>0&&g(!1)),this.setIndex(u),this.setAttribute("position",new Ne(h,3)),this.setAttribute("normal",new Ne(d,3)),this.setAttribute("uv",new Ne(f,2));function _(){const S=new R,A=new R;let T=0;const E=(t-e)/i;for(let N=0;N<=a;N++){const y=[],w=N/a,O=w*(t-e)+e;for(let X=0;X<=s;X++){const te=X/s,P=te*l+o,z=Math.sin(P),Z=Math.cos(P);A.x=O*z,A.y=-w*i+m,A.z=O*Z,h.push(A.x,A.y,A.z),S.set(z,E,Z).normalize(),d.push(S.x,S.y,S.z),f.push(te,1-w),y.push(v++)}x.push(y)}for(let N=0;N<s;N++)for(let y=0;y<a;y++){const w=x[y][N],O=x[y+1][N],X=x[y+1][N+1],te=x[y][N+1];u.push(w,O,te),u.push(O,X,te),T+=6}c.addGroup(p,T,0),p+=T}function g(S){const A=v,T=new ae,E=new R;let N=0;const y=S===!0?e:t,w=S===!0?1:-1;for(let X=1;X<=s;X++)h.push(0,m*w,0),d.push(0,w,0),f.push(.5,.5),v++;const O=v;for(let X=0;X<=s;X++){const P=X/s*l+o,z=Math.cos(P),Z=Math.sin(P);E.x=y*Z,E.y=m*w,E.z=y*z,h.push(E.x,E.y,E.z),d.push(0,w,0),T.x=z*.5+.5,T.y=Z*.5*w+.5,f.push(T.x,T.y),v++}for(let X=0;X<s;X++){const te=A+X,P=O+X;S===!0?u.push(P,P+1,te):u.push(P+1,P,te),N+=3}c.addGroup(p,N,S===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yn extends vr{constructor(e=1,t=1,i=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,e,t,i,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Yn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class gr extends Ze{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const a=[],r=[];o(s),c(i),u(),this.setAttribute("position",new Ne(a,3)),this.setAttribute("normal",new Ne(a.slice(),3)),this.setAttribute("uv",new Ne(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const g=new R,S=new R,A=new R;for(let T=0;T<t.length;T+=3)f(t[T+0],g),f(t[T+1],S),f(t[T+2],A),l(g,S,A,_)}function l(_,g,S,A){const T=A+1,E=[];for(let N=0;N<=T;N++){E[N]=[];const y=_.clone().lerp(S,N/T),w=g.clone().lerp(S,N/T),O=T-N;for(let X=0;X<=O;X++)X===0&&N===T?E[N][X]=y:E[N][X]=y.clone().lerp(w,X/O)}for(let N=0;N<T;N++)for(let y=0;y<2*(T-N)-1;y++){const w=Math.floor(y/2);y%2===0?(d(E[N][w+1]),d(E[N+1][w]),d(E[N][w])):(d(E[N][w+1]),d(E[N+1][w+1]),d(E[N+1][w]))}}function c(_){const g=new R;for(let S=0;S<a.length;S+=3)g.x=a[S+0],g.y=a[S+1],g.z=a[S+2],g.normalize().multiplyScalar(_),a[S+0]=g.x,a[S+1]=g.y,a[S+2]=g.z}function u(){const _=new R;for(let g=0;g<a.length;g+=3){_.x=a[g+0],_.y=a[g+1],_.z=a[g+2];const S=m(_)/2/Math.PI+.5,A=p(_)/Math.PI+.5;r.push(S,1-A)}v(),h()}function h(){for(let _=0;_<r.length;_+=6){const g=r[_+0],S=r[_+2],A=r[_+4],T=Math.max(g,S,A),E=Math.min(g,S,A);T>.9&&E<.1&&(g<.2&&(r[_+0]+=1),S<.2&&(r[_+2]+=1),A<.2&&(r[_+4]+=1))}}function d(_){a.push(_.x,_.y,_.z)}function f(_,g){const S=_*3;g.x=e[S+0],g.y=e[S+1],g.z=e[S+2]}function v(){const _=new R,g=new R,S=new R,A=new R,T=new ae,E=new ae,N=new ae;for(let y=0,w=0;y<a.length;y+=9,w+=6){_.set(a[y+0],a[y+1],a[y+2]),g.set(a[y+3],a[y+4],a[y+5]),S.set(a[y+6],a[y+7],a[y+8]),T.set(r[w+0],r[w+1]),E.set(r[w+2],r[w+3]),N.set(r[w+4],r[w+5]),A.copy(_).add(g).add(S).divideScalar(3);const O=m(A);x(T,w+0,_,O),x(E,w+2,g,O),x(N,w+4,S,O)}}function x(_,g,S,A){A<0&&_.x===1&&(r[g]=_.x-1),S.x===0&&S.z===0&&(r[g]=A/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.vertices,e.indices,e.radius,e.details)}}const Fs=new R,Ns=new R,Ga=new R,Os=new Gt;class Va extends Ze{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),a=Math.cos(Sn*t),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let v=0;v<l;v+=3){r?(c[0]=r.getX(v),c[1]=r.getX(v+1),c[2]=r.getX(v+2)):(c[0]=v,c[1]=v+1,c[2]=v+2);const{a:x,b:m,c:p}=Os;if(x.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Os.getNormal(Ga),h[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let _=0;_<3;_++){const g=(_+1)%3,S=h[_],A=h[g],T=Os[u[_]],E=Os[u[g]],N=`${S}_${A}`,y=`${A}_${S}`;y in d&&d[y]?(Ga.dot(d[y].normal)<=a&&(f.push(T.x,T.y,T.z),f.push(E.x,E.y,E.z)),d[y]=null):N in d||(d[N]={index0:c[_],index1:c[g],normal:Ga.clone()})}}for(const v in d)if(d[v]){const{index0:x,index1:m}=d[v];Fs.fromBufferAttribute(o,x),Ns.fromBufferAttribute(o,m),f.push(Fs.x,Fs.y,Fs.z),f.push(Ns.x,Ns.y,Ns.z)}this.setAttribute("position",new Ne(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ir extends hl{constructor(e){super(e),this.uuid=ni(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new hl().fromJSON(s))}return this}}const n0={triangulate:function(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let a=nc(n,0,s,t,!0);const r=[];if(!a||a.next===a.prev)return r;let o,l,c,u,h,d,f;if(i&&(a=l0(n,e,a,t)),n.length>80*t){o=c=n[0],l=u=n[1];for(let v=t;v<s;v+=t)h=n[v],d=n[v+1],h<o&&(o=h),d<l&&(l=d),h>c&&(c=h),d>u&&(u=d);f=Math.max(c-o,u-l),f=f!==0?32767/f:0}return Qn(a,r,t,o,l,f,0),r}};function nc(n,e,t,i,s){let a,r;if(s===_0(n,e,t,i)>0)for(a=e;a<t;a+=i)r=fl(a,n[a],n[a+1],r);else for(a=t-i;a>=e;a-=i)r=fl(a,n[a],n[a+1],r);return r&&ta(r,r.next)&&(ts(r),r=r.next),r}function Vi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(ta(t,t.next)||lt(t.prev,t,t.next)===0)){if(ts(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Qn(n,e,t,i,s,a,r){if(!n)return;!r&&a&&d0(n,i,s,a);let o=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,a?a0(n,i,s,a):s0(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(c.i/t|0),ts(n),n=c.next,o=c.next;continue}if(n=c,n===o){r?r===1?(n=r0(Vi(n),e,t),Qn(n,e,t,i,s,a,2)):r===2&&o0(n,e,t,i,s,a):Qn(Vi(n),e,t,i,s,a,1);break}}}function s0(n){const e=n.prev,t=n,i=n.next;if(lt(e,t,i)>=0)return!1;const s=e.x,a=t.x,r=i.x,o=e.y,l=t.y,c=i.y,u=s<a?s<r?s:r:a<r?a:r,h=o<l?o<c?o:c:l<c?l:c,d=s>a?s>r?s:r:a>r?a:r,f=o>l?o>c?o:c:l>c?l:c;let v=i.next;for(;v!==e;){if(v.x>=u&&v.x<=d&&v.y>=h&&v.y<=f&&xn(s,o,a,l,r,c,v.x,v.y)&&lt(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function a0(n,e,t,i){const s=n.prev,a=n,r=n.next;if(lt(s,a,r)>=0)return!1;const o=s.x,l=a.x,c=r.x,u=s.y,h=a.y,d=r.y,f=o<l?o<c?o:c:l<c?l:c,v=u<h?u<d?u:d:h<d?h:d,x=o>l?o>c?o:c:l>c?l:c,m=u>h?u>d?u:d:h>d?h:d,p=nr(f,v,e,t,i),_=nr(x,m,e,t,i);let g=n.prevZ,S=n.nextZ;for(;g&&g.z>=p&&S&&S.z<=_;){if(g.x>=f&&g.x<=x&&g.y>=v&&g.y<=m&&g!==s&&g!==r&&xn(o,u,l,h,c,d,g.x,g.y)&&lt(g.prev,g,g.next)>=0||(g=g.prevZ,S.x>=f&&S.x<=x&&S.y>=v&&S.y<=m&&S!==s&&S!==r&&xn(o,u,l,h,c,d,S.x,S.y)&&lt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;g&&g.z>=p;){if(g.x>=f&&g.x<=x&&g.y>=v&&g.y<=m&&g!==s&&g!==r&&xn(o,u,l,h,c,d,g.x,g.y)&&lt(g.prev,g,g.next)>=0)return!1;g=g.prevZ}for(;S&&S.z<=_;){if(S.x>=f&&S.x<=x&&S.y>=v&&S.y<=m&&S!==s&&S!==r&&xn(o,u,l,h,c,d,S.x,S.y)&&lt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function r0(n,e,t){let i=n;do{const s=i.prev,a=i.next.next;!ta(s,a)&&sc(s,i,i.next,a)&&es(s,a)&&es(a,s)&&(e.push(s.i/t|0),e.push(i.i/t|0),e.push(a.i/t|0),ts(i),ts(i.next),i=n=a),i=i.next}while(i!==n);return Vi(i)}function o0(n,e,t,i,s,a){let r=n;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&v0(r,o)){let l=ac(r,o);r=Vi(r,r.next),l=Vi(l,l.next),Qn(r,e,t,i,s,a,0),Qn(l,e,t,i,s,a,0);return}o=o.next}r=r.next}while(r!==n)}function l0(n,e,t,i){const s=[];let a,r,o,l,c;for(a=0,r=e.length;a<r;a++)o=e[a]*i,l=a<r-1?e[a+1]*i:n.length,c=nc(n,o,l,i,!1),c===c.next&&(c.steiner=!0),s.push(m0(c));for(s.sort(c0),a=0;a<s.length;a++)t=u0(s[a],t);return t}function c0(n,e){return n.x-e.x}function u0(n,e){const t=h0(n,e);if(!t)return e;const i=ac(t,n);return Vi(i,i.next),Vi(t,t.next)}function h0(n,e){let t=e,i=-1/0,s;const a=n.x,r=n.y;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=a&&d>i&&(i=d,s=t.x<t.next.x?t:t.next,d===a))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,l=s.x,c=s.y;let u=1/0,h;t=s;do a>=t.x&&t.x>=l&&a!==t.x&&xn(r<c?a:i,r,l,c,r<c?i:a,r,t.x,t.y)&&(h=Math.abs(r-t.y)/(a-t.x),es(t,n)&&(h<u||h===u&&(t.x>s.x||t.x===s.x&&f0(s,t)))&&(s=t,u=h)),t=t.next;while(t!==o);return s}function f0(n,e){return lt(n.prev,n,e.prev)<0&&lt(e.next,n,n.next)<0}function d0(n,e,t,i){let s=n;do s.z===0&&(s.z=nr(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,p0(s)}function p0(n){let e,t,i,s,a,r,o,l,c=1;do{for(t=n,n=null,a=null,r=0;t;){for(r++,i=t,o=0,e=0;e<c&&(o++,i=i.nextZ,!!i);e++);for(l=c;o>0||l>0&&i;)o!==0&&(l===0||!i||t.z<=i.z)?(s=t,t=t.nextZ,o--):(s=i,i=i.nextZ,l--),a?a.nextZ=s:n=s,s.prevZ=a,a=s;t=i}a.nextZ=null,c*=2}while(r>1);return n}function nr(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function m0(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function xn(n,e,t,i,s,a,r,o){return(s-r)*(e-o)>=(n-r)*(a-o)&&(n-r)*(i-o)>=(t-r)*(e-o)&&(t-r)*(a-o)>=(s-r)*(i-o)}function v0(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!g0(n,e)&&(es(n,e)&&es(e,n)&&x0(n,e)&&(lt(n.prev,n,e.prev)||lt(n,e.prev,e))||ta(n,e)&&lt(n.prev,n,n.next)>0&&lt(e.prev,e,e.next)>0)}function lt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function ta(n,e){return n.x===e.x&&n.y===e.y}function sc(n,e,t,i){const s=Bs(lt(n,e,t)),a=Bs(lt(n,e,i)),r=Bs(lt(t,i,n)),o=Bs(lt(t,i,e));return!!(s!==a&&r!==o||s===0&&zs(n,t,e)||a===0&&zs(n,i,e)||r===0&&zs(t,n,i)||o===0&&zs(t,e,i))}function zs(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Bs(n){return n>0?1:n<0?-1:0}function g0(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&sc(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function es(n,e){return lt(n.prev,n,n.next)<0?lt(n,e,n.next)>=0&&lt(n,n.prev,e)>=0:lt(n,e,n.prev)<0||lt(n,n.next,e)<0}function x0(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,a=(n.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&s<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function ac(n,e){const t=new sr(n.i,n.x,n.y),i=new sr(e.i,e.x,e.y),s=n.next,a=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function fl(n,e,t,i){const s=new sr(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ts(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function sr(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function _0(n,e,t,i){let s=0;for(let a=e,r=t-i;a<t;a+=i)s+=(n[r]-n[a])*(n[a+1]+n[r+1]),r=a;return s}class Zn{static area(e){const t=e.length;let i=0;for(let s=t-1,a=0;a<t;s=a++)i+=e[s].x*e[a].y-e[a].x*e[s].y;return i*.5}static isClockWise(e){return Zn.area(e)<0}static triangulateShape(e,t){const i=[],s=[],a=[];dl(e),pl(i,e);let r=e.length;t.forEach(dl);for(let l=0;l<t.length;l++)s.push(r),r+=t[l].length,pl(i,t[l]);const o=n0.triangulate(i,s);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}}function dl(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function pl(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class _n extends gr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,a,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new _n(e.radius,e.detail)}}class xr extends Ze{constructor(e=.5,t=1,i=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:a,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let h=e;const d=(t-e)/s,f=new R,v=new ae;for(let x=0;x<=s;x++){for(let m=0;m<=i;m++){const p=a+m/i*r;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),v.x=(f.x/t+1)/2,v.y=(f.y/t+1)/2,u.push(v.x,v.y)}h+=d}for(let x=0;x<s;x++){const m=x*(i+1);for(let p=0;p<i;p++){const _=p+m,g=_,S=_+i+1,A=_+i+2,T=_+1;o.push(g,S,T),o.push(S,A,T)}}this.setIndex(o),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(c,3)),this.setAttribute("uv",new Ne(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ks extends Ze{constructor(e=new ir([new ae(0,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],a=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new Ne(s,3)),this.setAttribute("normal",new Ne(a,3)),this.setAttribute("uv",new Ne(r,2));function c(u){const h=s.length/3,d=u.extractPoints(t);let f=d.shape;const v=d.holes;Zn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=v.length;m<p;m++){const _=v[m];Zn.isClockWise(_)===!0&&(v[m]=_.reverse())}const x=Zn.triangulateShape(f,v);for(let m=0,p=v.length;m<p;m++){const _=v[m];f=f.concat(_)}for(let m=0,p=f.length;m<p;m++){const _=f[m];s.push(_.x,_.y,0),a.push(0,0,1),r.push(_.x,_.y)}for(let m=0,p=x.length;m<p;m++){const _=x[m],g=_[0]+h,S=_[1]+h,A=_[2]+h;i.push(g,S,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return y0(t,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const r=t[e.shapes[s]];i.push(r)}return new Ks(i,e.curveSegments)}}function y0(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}class yn extends Ze{constructor(e=1,t=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const u=[],h=new R,d=new R,f=[],v=[],x=[],m=[];for(let p=0;p<=i;p++){const _=[],g=p/i;let S=0;p===0&&r===0?S=.5/t:p===i&&l===Math.PI&&(S=-.5/t);for(let A=0;A<=t;A++){const T=A/t;h.x=-e*Math.cos(s+T*a)*Math.sin(r+g*o),h.y=e*Math.cos(r+g*o),h.z=e*Math.sin(s+T*a)*Math.sin(r+g*o),v.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(T+S,1-g),_.push(c++)}u.push(_)}for(let p=0;p<i;p++)for(let _=0;_<t;_++){const g=u[p][_+1],S=u[p][_],A=u[p+1][_],T=u[p+1][_+1];(p!==0||r>0)&&f.push(g,S,T),(p!==i-1||l<Math.PI)&&f.push(S,A,T)}this.setIndex(f),this.setAttribute("position",new Ne(v,3)),this.setAttribute("normal",new Ne(x,3)),this.setAttribute("uv",new Ne(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class js extends Ze{constructor(e=1,t=.4,i=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:a},i=Math.floor(i),s=Math.floor(s);const r=[],o=[],l=[],c=[],u=new R,h=new R,d=new R;for(let f=0;f<=i;f++)for(let v=0;v<=s;v++){const x=v/s*a,m=f/i*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(x),h.y=(e+t*Math.cos(m))*Math.sin(x),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(v/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let v=1;v<=s;v++){const x=(s+1)*f+v-1,m=(s+1)*(f-1)+v-1,p=(s+1)*(f-1)+v,_=(s+1)*f+v;r.push(x,m,_),r.push(m,p,_)}this.setIndex(r),this.setAttribute("position",new Ne(o,3)),this.setAttribute("normal",new Ne(l,3)),this.setAttribute("uv",new Ne(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}const ml={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class M0{constructor(e,t,i){const s=this;let a=!1,r=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){o++,a===!1&&s.onStart!==void 0&&s.onStart(u,r,o),a=!0},this.itemEnd=function(u){r++,s.onProgress!==void 0&&s.onProgress(u,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],v=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return v}return null}}}const S0=new M0;class _r{constructor(e){this.manager=e!==void 0?e:S0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,a){i.load(e,s,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}_r.DEFAULT_MATERIAL_NAME="__DEFAULT";class rc extends _r{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,r=ml.get(e);if(r!==void 0)return a.manager.itemStart(e),setTimeout(function(){t&&t(r),a.manager.itemEnd(e)},0),r;const o=$n("img");function l(){u(),ml.add(e,this),t&&t(this),a.manager.itemEnd(e)}function c(h){u(),s&&s(h),a.manager.itemError(e),a.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),a.manager.itemStart(e),o.src=e,o}}class pn extends _r{constructor(e){super(e)}load(e,t,i,s){const a=new Rt,r=new rc(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},i,s),a}}class yr extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Ha=new Qe,vl=new R,gl=new R;class oc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hr,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;vl.setFromMatrixPosition(e.matrixWorld),t.position.copy(vl),gl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gl),t.updateMatrixWorld(),Ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ha),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const xl=new Qe,Hn=new R,ka=new R;class b0 extends oc{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ae(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,a=e.distance||i.far;a!==i.far&&(i.far=a,i.updateProjectionMatrix()),Hn.setFromMatrixPosition(e.matrixWorld),i.position.copy(Hn),ka.copy(i.position),ka.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ka),i.updateMatrixWorld(),s.makeTranslation(-Hn.x,-Hn.y,-Hn.z),xl.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xl)}}class w0 extends yr{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new b0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class T0 extends oc{constructor(){super(new kl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class C0 extends yr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new T0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class E0 extends yr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rr}}));typeof window<"u"&&(window.__THREE__||(window.__THREE__=rr));const Wa={1:[[2282478,8490232],[3462041,366185],[16494871,14753096],[16020150,9133302],[6334975,11032055],[16436245,15381256],[4906624,959977],[9741240,4674921],[16281969,10033947],[12616956,4988309],[3718648,223649],[16486972,12730636],[10741301,5078031],[15235577,8788367]],2:[[1357990,1013358],[6514417,4405450],[16007006,12456508],[11032055,8266446],[8702998,5078031],[959977,223649],[16096779,11817737],[1096065,292951],[15485081,12458077],[9133302,7153881],[15381256,10576391],[440020,561586]],3:[[3900150,1981066],[1096065,413243],[9133302,4988309],[16347926,8138002],[440020,1461859],[14239471,7346805],[15381256,7421714],[1357990,1265226],[16007006,8917815],[6514417,3223169]],4:[[16777215,0],[2282478,1973067],[16020150,4850766],[16569165,4528643],[7268279,142370],[9684477,1516884],[16557477,4524554],[12891645,3018853]],5:[[16766720,12092939],[16738740,13047173],[65535,35723],[8190976,2263842],[16753920,16729344],[12211667,4915330],[64154,3050327],[16716947,9109504],[2003199,139],[16775885,9142272]],6:[[65280,13056],[65535,51],[16711935,3342387],[13434624,3355392],[65484,13107],[16724838,3342336],[3394815,4403],[13369599,1114163],[6750003,1127168],[16763904,3346688]],7:[[16777215,16766720],[16729344,9109504],[65535,255],[16716947,4915330],[8388352,25600],[16711935,9055202],[2003199,1644912],[16737095,8388608],[64154,32896],[16775885,16747520]],8:[[16737095,4620980],[16766720,9055202],[64154,16716947],[16729344,3050327],[65535,13458524],[16711935,8087790],[3329330,16747520],[52945,9109504],[16758465,205],[11403055,4915330]],9:[[9109504,0],[3100495,16747520],[1644912,16777215],[4915330,3329330],[5597999,16711935],[8388608,65535],[128,16766720],[3050327,16716947],[4734347,16729344],[9127187,64154]],10:[[65280,16711935],[65535,16729344],[16766720,255],[16716947,3329330],[8388352,9055202],[16747520,52945],[64154,16711680],[2003199,16758465],[16711935,65280],[16776960,9109504]],11:[[16753920,9109504],[65535,139],[16716947,4915330],[3329330,25600],[16766720,3100495],[16711935,1644912],[64154,32896],[16729344,9127187],[2003199,0],[16776960,12092939]],12:[[65280,0],[16711935,0],[65535,0],[16776960,0],[16711680,0],[255,0],[16753920,0],[2003199,0],[3329330,0],[16716947,0]],13:[[15132410,4915330],[16758465,9109504],[14745599,32896],[16775885,9127187],[14524637,4734347],[10025880,3050327],[8900346,1644912],[16767673,13789470],[15761536,8388608],[2142890,139]],14:[[16766720,0],[65535,128],[16711935,4915330],[65280,25600],[16729344,9109504],[2003199,1644912],[16716947,8388736],[8388352,3050327],[64154,32896],[16753920,9127187]],15:[[16711935,65535],[16716947,2003199],[16753920,8388736],[65280,16711935],[16776960,16729344],[65535,4915330],[16738740,52945],[8388352,16716947],[64154,16747520],[2003199,16711680]],16:[[12632256,0],[8421504,65280],[11119017,65535],[6908265,16711935],[7833753,16753920],[7372944,16716947],[3100495,3329330],[0,16711680],[14474460,255],[13882323,9109504]],17:[[16711935,65535],[16716947,1644912],[65280,25600],[16753920,9109504],[65535,128],[16711680,9127187],[3329330,3050327],[2003199,4915330],[16776960,13789470],[16738740,8388736]],18:[[16711935,65535],[16716947,16766720],[16711680,9109504],[64154,205],[9699539,3329330],[49151,16711935],[16777215,8900346],[4915330,16738740],[16729344,16776960],[1644912,11403055]],19:[[11032055,3900150],[15485081,6514417],[1357990,959977],[16007006,9133302],[15381256,1096065],[440020,3900150]],20:[[16007006,12456508],[3900150,1981066],[1096065,413243],[9133302,4988309],[16347926,8138002],[15381256,7421714]],21:[[65535,16711935],[3900150,1981066],[16766720,12092939],[16729344,9109504],[15485081,9133302],[440020,1920728]],22:[[65535,16711935],[3900150,1981066],[16766720,12092939],[16729344,9109504],[15485081,9133302],[440020,1920728],[16766720,1710618],[58879,51],[16711935,16747520],[65407,8704],[12632256,9109504],[14745599,205],[16776960,16729344],[9699539,16716947],[16738740,9055202],[16766720,65535],[4286945,16777215],[2142890,12632256],[3800852,16711935],[16777215,16716947],[0,14423100],[4915330,657930],[16753920,16766720],[16729344,16766720],[49151,1644912],[16716947,65280],[11403055,8388736],[9055202,0],[16777215,14745599],[16766720,16777215]],23:[[16711935,65535],[16766720,12092939],[16729344,9109504],[15485081,9133302]],24:[[65535,1981066],[16766720,12092939],[3800852,25600],[16729344,9109504],[16777215,12632256]],25:[[6334975,11032055]]},A0=`
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    // Bypass camera matrices to draw a perfect full-screen quad behind other elements
    gl_Position = vec4(position.xy, 0.9, 1.0);
}
`,R0=n=>n===1?`
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
        `:n===2?`
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
        `:n===3?`
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
        `:n===4?`
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
        `:n===5?`
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
        `:n===6?`
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
        `:n===7?`
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
        `:n===8?`
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
        `:n===9?`
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
        `:n===10?`
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
        `:n===11?`
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
        `:n===12?`
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
        `:n===13?`
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
        `:n===14?`
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
        `:n===15?`
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
        `:n===16?`
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
        `:n===17?`
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
        `:n===18?`
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
        `:n===0?`
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
        `:n===19?`
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
        `:n===20?`
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
        `:n===21?`
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
        `:n===22?`
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
        `:n===23?`
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
        `:n===24?`
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
        `:n===25?`
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
        `:"void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }";class P0{constructor(e){this.group=e,this.meshes=[],this.activeClassId=22,this.activeVariationId=0,this.materials={},this.rainbowMode=!1;const t=new Vm(new Uint8Array([0,0,0,0]),1,1,qt);t.needsUpdate=!0,this.dummyTexture=t;const i=new Jt(2,2);for(let s=1;s<=25;s++){let r=R0(s);if(s<=16&&(r=r.replace("uniform float uIntensity;",`uniform float uIntensity;
        uniform float uAudioLow;
        uniform float uAudioMid;
        uniform float uAudioHigh;`),r=r.replace("float intMod = max(0.1, uIntensity);","float intMod = max(0.1, uIntensity * (1.0 + uAudioLow * 3.0 + uAudioMid * 1.5));")),!r.includes("uniform float uMouseSync;")){let c="";/uniform\s+vec2\s+uMouse\s*;/.test(r)||(c+=`uniform vec2 uMouse;
        `),c+=`uniform float uMouseSync;
        void main() {`,r=r.replace("void main() {",c)}s<=21&&(r.includes("vec2 p = (vUv - 0.5) * 2.0;")?r=r.replace("vec2 p = (vUv - 0.5) * 2.0;",`vec2 p = (vUv - 0.5) * 2.0;
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
            `;this.materials[s]=new ft({vertexShader:A0,fragmentShader:o,defines:{VARIATION:0},uniforms:{uTime:{value:0},uAspect:{value:1},uColor1:{value:new fe(6334975)},uColor2:{value:new fe(11032055)},uIntensity:{value:1},uSpeed:{value:1},uHarmonics:{value:0},uVariation:{value:0},uLayer2Type:{value:0},uAudioLow:{value:0},uAudioMid:{value:0},uAudioHigh:{value:0},uMouse:{value:new ae(0,0)},uAlpha:{value:1},uSpawnTime:{value:0},uTexture:{value:this.dummyTexture},uTexture2:{value:this.dummyTexture},uTexture3:{value:this.dummyTexture},uShowLines:{value:1},uMouseSync:{value:0},uObserver:{value:0}},transparent:!0,depthWrite:!1,depthTest:!1,blending:Ye});const l=new We(i,this.materials[s]);l.visible=!1,l.frustumCulled=!1,l.position.z=-1,this.meshes.push(l),this.group.add(l)}this._boundCymaticsToggleMouseSync=s=>{for(let a=1;a<=25;a++)this.materials[a]&&this.materials[a].uniforms.uMouseSync&&(this.materials[a].uniforms.uMouseSync.value=s.detail.sync)},window.addEventListener("cymaticsToggleMouseSync",this._boundCymaticsToggleMouseSync),setTimeout(()=>{this.setPattern(this.activeClassId,this.activeVariationId)},50)}setPattern(e,t,i=!1){if(this.activeClassId!==e&&this.textureCache){for(const s in this.textureCache)this.textureCache[s]&&this.textureCache[s].dispose();if(this.textureCache={},this.dummyTexture)for(let s=1;s<=25;s++)this.materials[s]&&(this.materials[s].uniforms.uTexture&&(this.materials[s].uniforms.uTexture.value=this.dummyTexture),this.materials[s].uniforms.uTexture2&&(this.materials[s].uniforms.uTexture2.value=this.dummyTexture),this.materials[s].uniforms.uTexture3&&(this.materials[s].uniforms.uTexture3.value=this.dummyTexture))}if(this.activeClassId=e,this.activeVariationId=t,this.meshes.forEach((s,a)=>{s.visible=a+1===e,a+1===25?(s.rotation.x=-Math.PI/3,s.position.y=-2,s.position.z=-10):(s.rotation.x=0,s.position.y=0,s.position.z=-1)}),this.materials[e]){this.materials[e].uniforms.uVariation.value=t;let s=t;if(e===22&&(s=t%14),e>=17&&e<=23&&this.materials[e].defines.VARIATION!==s&&(this._shaderCompileTimeout&&clearTimeout(this._shaderCompileTimeout),this._shaderCompileTimeout=setTimeout(()=>{this.activeVariationId===t&&this.activeClassId===e&&(this.materials[e].defines.VARIATION=s,this.materials[e].needsUpdate=!0,this.materials[e].uniforms.uSpawnTime&&(this.materials[e].uniforms.uSpawnTime.value=performance.now()*.001%(2e3*Math.PI)))},300)),!i&&Wa[e]&&Wa[e][t]){const a=Wa[e][t];this.materials[e].uniforms.uColor1.value.setHex(a[0]),this.materials[e].uniforms.uColor2.value.setHex(a[1]);try{window.dispatchEvent(new CustomEvent("cymaticColorSync",{detail:{classId:e,color1:"#"+a[0].toString(16).padStart(6,"0"),color2:"#"+a[1].toString(16).padStart(6,"0")}}))}catch{}}if(e===22){const a=["binaural-assets/images/cymatics/cymatics_fractal_heart_1779756441610.png","binaural-assets/images/cymatics/cymatics_fluid_sdf_1779756501734.png","binaural-assets/images/cymatics/cymatics_particle_swarm_1779756471939.png","binaural-assets/images/cymatics/cymatics_quantum_topology_1779756531135.png","binaural-assets/images/cymatics/ai_cymatic_15_1779566362935.png","binaural-assets/images/cymatics/ai_cymatic_16_1779566377245.png","binaural-assets/images/cymatics/cymatic_sacred_gold_obsidian.png","binaural-assets/images/cymatics/cymatic_biolum_abyssal.png","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/ai_cymatic_2.png","binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/ai_cymatic_4.png","binaural-assets/images/cymatics/ai_cymatic_5.png","binaural-assets/images/cymatics/ai_cymatic_6.png","binaural-assets/images/cymatics/ai_cymatic_7.png","binaural-assets/images/cymatics/ai_cymatic_8.png","binaural-assets/images/cymatics/ai_cymatic_9.png","binaural-assets/images/cymatics/ai_cymatic_10.png","binaural-assets/images/cymatics/ai_cymatic_11.png","binaural-assets/images/cymatics/ai_cymatic_12.png","binaural-assets/images/cymatics/ai_cymatic_13.png","binaural-assets/images/cymatics/ai_cymatic_14.png","binaural-assets/images/cymatics/ai_cymatic_15.png","binaural-assets/images/cymatics/ai_cymatic_16.png","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/ai_cymatic_2.png","binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/ai_cymatic_4.png"];a[t]&&(this.textureCache||(this.textureCache={}),this.textureCache[t]?this.materials[e].uniforms.uTexture.value=this.textureCache[t]:new pn().load(a[t],o=>{o.generateMipmaps=!1,o.minFilter=St,this.textureCache[t]=o,this.activeClassId===e&&this.activeVariationId===t&&(this.materials[e].uniforms.uTexture.value=o)}))}else if(e===23){const a=["binaural-assets/images/cymatics/ai_cymatic_5.png","binaural-assets/images/cymatics/ai_cymatic_6.png","binaural-assets/images/cymatics/ai_cymatic_7.png","binaural-assets/images/cymatics/ai_cymatic_8.png"];if(a[t]){this.textureCache||(this.textureCache={});const r="c23_"+t;this.textureCache[r]?this.materials[e].uniforms.uTexture.value=this.textureCache[r]:new pn().load(a[t],l=>{l.generateMipmaps=!1,l.minFilter=St,l.wrapS=Ni,l.wrapT=Ni,this.textureCache[r]=l,this.activeClassId===e&&this.activeVariationId===t&&(this.materials[e].uniforms.uTexture.value=l)})}}else if(e===24){const a=["binaural-assets/images/cymatics/ai_cymatic_9.png","binaural-assets/images/cymatics/ai_cymatic_10.png","binaural-assets/images/cymatics/ai_cymatic_11.png","binaural-assets/images/cymatics/ai_cymatic_12.png","binaural-assets/images/cymatics/ai_cymatic_13.png","binaural-assets/images/cymatics/ai_cymatic_14.png","binaural-assets/images/cymatics/ai_cymatic_15.png","binaural-assets/images/cymatics/ai_cymatic_16.png","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/constellations/aura_shark_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_2.png","binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/ai_cymatic_4.png","binaural-assets/images/cymatics/constellations/aura_salmon_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_5.png","binaural-assets/images/cymatics/ai_cymatic_6.png","binaural-assets/images/cymatics/constellations/aura_leopard_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_7.png","binaural-assets/images/cymatics/ai_cymatic_8.png","binaural-assets/images/cymatics/ai_cymatic_9.png","binaural-assets/images/cymatics/constellations/aura_koala_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_10.png","binaural-assets/images/cymatics/ai_cymatic_11.png","binaural-assets/images/cymatics/ai_cymatic_12.png","binaural-assets/images/cymatics/constellations/aura_lizard_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_13.png","binaural-assets/images/cymatics/ai_cymatic_14.png","binaural-assets/images/cymatics/ai_cymatic_15.png","binaural-assets/images/cymatics/ai_cymatic_16.png","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/ai_cymatic_2.png"],r=["binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/ai_cymatic_4.png","binaural-assets/images/cymatics/ai_cymatic_5.png"],o=["binaural-assets/images/cymatics/ai_cymatic_6.png","binaural-assets/images/cymatics/ai_cymatic_7.png","binaural-assets/images/cymatics/ai_cymatic_8.png","binaural-assets/images/cymatics/ai_cymatic_9.png","binaural-assets/images/cymatics/ai_cymatic_10.png","binaural-assets/images/cymatics/ai_cymatic_11.png","binaural-assets/images/cymatics/constellations/horse_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_12.png","binaural-assets/images/cymatics/constellations/cat_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_13.png","binaural-assets/images/cymatics/constellations/shark_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_14.png","binaural-assets/images/cymatics/constellations/orca_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_15.png","binaural-assets/images/cymatics/constellations/salmon_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_16.png","binaural-assets/images/cymatics/constellations/alligator_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_0.png","binaural-assets/images/cymatics/constellations/panther_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_1.png","binaural-assets/images/cymatics/constellations/mongoose_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_2.png","binaural-assets/images/cymatics/constellations/panda_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_3.png","binaural-assets/images/cymatics/constellations/monkey_constellation_dummy.webp","binaural-assets/images/cymatics/ai_cymatic_4.png","binaural-assets/images/cymatics/constellations/dog_constellation_dummy.webp"];let l=this.activeAuraId!==void 0?this.activeAuraId:t;if(a[l]){const h="c24_aura_"+l;this.textureCache||(this.textureCache={}),this.textureCache[h]?this.materials[e].uniforms.uTexture.value=this.textureCache[h]:new pn().load(a[l],f=>{f.generateMipmaps=!1,f.minFilter=St,this.textureCache[h]=f;let v=this.activeAuraId!==void 0?this.activeAuraId:this.activeVariationId;this.activeClassId===e&&v===l&&(this.materials[e].uniforms.uTexture.value=f)})}let c=this.activeLinesId!==void 0?this.activeLinesId:l;if(o[c]){const h="c24_lines_"+c;this.textureCache||(this.textureCache={}),this.textureCache[h]?this.materials[e].uniforms.uTexture3.value=this.textureCache[h]:new pn().load(o[c],f=>{f.generateMipmaps=!1,f.minFilter=St,this.textureCache[h]=f;let v=this.activeLinesId!==void 0?this.activeLinesId:this.activeAuraId!==void 0?this.activeAuraId:this.activeVariationId;this.activeClassId===e&&v===c&&(this.materials[e].uniforms.uTexture3.value=f)})}else this.materials[e].uniforms.uTexture3.value=this.dummyTexture;let u=this.activeBackgroundId||0;if(r[u]){const h="c24_bg_"+u;this.textureCache||(this.textureCache={}),this.textureCache[h]?this.materials[e].uniforms.uTexture2.value=this.textureCache[h]:new pn().load(r[u],f=>{f.generateMipmaps=!1,f.minFilter=St,f.wrapS=Ni,f.wrapT=Ni,this.textureCache[h]=f;let v=this.activeBackgroundId||0;this.activeClassId===e&&v===u&&(this.materials[e].uniforms.uTexture2.value=f)})}}this.materials[e]&&this.materials[e].uniforms.uMouseSync&&(this.materials[e].uniforms.uMouseSync.value=window.cymaticsMouseSync||0)}}setConstellationBackground(e){this.activeBackgroundId=e,this.activeClassId===24&&this.setPattern(24,this.activeVariationId,!0)}setConstellationLines(e){this.activeLinesId=e,this.activeClassId===24&&this.setPattern(24,this.activeVariationId,!0)}setConstellationAura(e){this.activeAuraId=e,this.activeClassId===24&&this.setPattern(24,this.activeVariationId,!0)}setConstellationLayer2Type(e){this.setConstellationLines(parseInt(e))}setColor(e,t,i){if(this.materials[e]){const s=t===1?"uColor1":"uColor2";this.materials[e].uniforms[s].value.set(i)}}setParam(e,t,i){this.materials[e]&&(t==="intensity"?this.materials[e].uniforms.uIntensity.value=i:t==="speed"&&this.materials[e].uniforms.uSpeed?this.materials[e].uniforms.uSpeed.value=i:t==="harmonics"&&this.materials[e].uniforms.uHarmonics?this.materials[e].uniforms.uHarmonics.value=i:this.materials[e].uniforms[`u${t.charAt(0).toUpperCase()+t.slice(1)}`]&&(this.materials[e].uniforms[`u${t.charAt(0).toUpperCase()+t.slice(1)}`].value=i))}update(e,t,i){if(this.materials[this.activeClassId]){if(this.materials[this.activeClassId].uniforms.uTime.value=e,this.materials[this.activeClassId].uniforms.uAspect.value=window.innerWidth/(window.innerHeight||1),t){let s=window.cymaticsAudioSync!==void 0?window.cymaticsAudioSync:1;this.materials[this.activeClassId].uniforms.uAudioLow.value=(t.bass||0)*s,this.materials[this.activeClassId].uniforms.uAudioMid.value=(t.mids||0)*s,this.materials[this.activeClassId].uniforms.uAudioHigh.value=(t.highs||0)*s}if(i&&this.materials[this.activeClassId].uniforms.uMouse.value.set(i.x||0,i.y||0),this.rainbowMode){const s=e*.1%1,a=(s+.5)%1;this.materials[this.activeClassId].uniforms.uColor1.value.setHSL(s,1,.6),this.materials[this.activeClassId].uniforms.uColor2.value.setHSL(a,1,.6)}}if(this.crossfadeData&&this.crossfadeData.active){let s=e-this.crossfadeData.startTime,a=Math.min(1,s/this.crossfadeData.duration);this.materials[this.crossfadeData.nextId]&&(this.materials[this.crossfadeData.nextId].uniforms.uAlpha.value=a),this.materials[this.crossfadeData.prevId]&&(this.materials[this.crossfadeData.prevId].uniforms.uAlpha.value=1-a),a>=1&&(this.crossfadeData.active=!1,this.activeClassId=this.crossfadeData.nextId)}}dispose(){if(this._boundCymaticsToggleMouseSync&&window.removeEventListener("cymaticsToggleMouseSync",this._boundCymaticsToggleMouseSync),this.dummyTexture&&(this.dummyTexture.dispose(),this.dummyTexture=null),this.meshes.forEach(e=>{e.geometry&&e.geometry.dispose(),this.group.remove(e)}),this.materials){for(const e in this.materials)this.materials[e]&&this.materials[e].dispose();this.materials={}}if(this.textureCache){for(const e in this.textureCache)this.textureCache[e]&&this.textureCache[e].dispose();this.textureCache={}}this.meshes=[],this.materials={}}setConstellationLinesToggle(e){this.materials[24]&&(this.materials[24].uniforms.uShowLines.value=e?1:0)}setRainbow(e){this.rainbowMode=e,e||this.setPattern(this.activeClassId,this.activeVariationId,!1)}}let ce=null;class lc{constructor(e,t={}){this.canvas=e,this.activeModes=t.activeModes||new Set(["cyber","snowflake","waves","particles","cymatics"]),this.mode=t.mode||"none",this.mindWaveMode=t.mindWaveMode!==void 0?t.mindWaveMode:!0,this.galaxySunStyle=t.galaxySunStyle||"sun",this.cymaticClass=t.cymaticClass!==void 0?t.cymaticClass:22,this.cymaticVariation=t.cymaticVariation!==void 0?t.cymaticVariation:0,this.cymaticColors=t.cymaticColors||["#EEA0EB","#FFB1A3"],this.snowSizeOverride=t.snowSizeOverride!==void 0?t.snowSizeOverride:.5,this.currentCymaticData={name:"Fractal Heart",n:1,m:1,energy:.2},this.cymaticsHistory=[],this.cymaticsHistoryIndex=-1,this._cymaticDriftOffset=Math.random()*1e3,this.cyberConfig={logicMode:t.cyberLogicMode||"matrix",customText:t.cyberCustomText||"WELCOME",angle:t.cyberAngle||0,speed:t.cyberSpeedMultiplier||1,length:1,color:"#00FF41",rainbow:!0},this.matrixConfig={logicMode:t.matrixLogicMode||"interstellar",customText:t.matrixCustomText||"MINDWAVE",angle:0,speed:1,length:1,color:"#00FF41",rainbow:!1},this.initialized=!1,this._rainbowEnabled=t.rainbowEnabled||!1,this.isVisualizer3D=!0,this.overlayCanvas=document.getElementById("cyberCanvas"),this.overlayCtx=this.overlayCanvas?this.overlayCanvas.getContext("2d",{alpha:!0}):null,this.overlayCanvas&&(this.resizeOverlayCanvas(),window.addEventListener("resize",()=>this.resizeOverlayCanvas())),this.matrixCyberStreams=[],this.currentCyberAngle=t.cyberAngle!==void 0?t.cyberAngle:0,this.cyberColorCustomized=!1;try{const s=localStorage.getItem("cyberThemeHistory");this.themeHistory=s?JSON.parse(s):[],this.lastCyberFamily=localStorage.getItem("cyberLastFamily")||""}catch{this.themeHistory=[],this.lastCyberFamily=""}this.currentLogoOpacity=.8,this.targetLogoOpacity=.8,ce=this,this.themeType=document.body.dataset.themeType||"dark";const i=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);this.batterySaver=t.batterySaver!==void 0?t.batterySaver:i,this.isLowPower=this.batterySaver||localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode"),this.isLowPower=t.isLowPower||!1,this.targetFPS=this.isLowPower?30:60,this.audioSensitivity=1,this.geoComplexity=1,this.cameraPitch=0,this.cameraYaw=0,this.cameraRoll=0,this.vibrationEnabled=typeof ve<"u"&&ve.visualVibration!==void 0?ve.visualVibration:t.visualVibration!==void 0?t.visualVibration:!1,this._fpsRingBuffer=new Float64Array(60),this._fpsRingIndex=0,this._fpsRingCount=0,this.lastLodDegradation=0,this.currentLodLevel="high",this._tempColor=new fe,this._logoRenderCanvas=null,this.sphereGroup=new je,this.particleGroup=new je,this.lightspeedGroup=new je,this.lavaGroup=new je,this.fireplaceGroup=new je,this.rainforestGroup=new je,this.zenGardenGroup=new je,this.oceanGroup=new je,this.wavesGroup=new je,this.cyberGroup=new je,this.boxGroup=new je,this.dragonGroup=new je,this.galaxyGroup=new je,this.mandalaGroup=new je,this.cymaticsGroup=new je,this.snowflakeGroup=new je,this.tsunamiGroup=new je,this._snowData=null;try{this.scene=new zm,this.cymaticsCore=new P0(this.cymaticsGroup),this.cymaticsCore.setPattern(this.cymaticClass,this.cymaticVariation),this.cymaticsCore.setColor(this.cymaticClass,1,this.cymaticColors[0]),this.cymaticsCore.setColor(this.cymaticClass,2,this.cymaticColors[1]),[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup,this.tsunamiGroup].forEach(r=>this.scene.add(r)),this.camera=new Vt(75,e.width/e.height,.1,1e3),this.renderer=new jl({canvas:e,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(0,0),this.renderer.setSize(e.clientWidth,e.clientHeight);const a=this.isLowPower?1:2;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,a)),this.textures={},this.customColors={},this.customColor=null,this._isRendering=!1,this._freqDataArray=null,this.initEnvironment(),this.camera.position.z=5,this.handleLayoutChange=this.handleLayoutChange.bind(this),window.addEventListener("resize",()=>{this.resize(),this.handleLayoutChange()}),window.addEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode=()=>{this.currentLodLevel!=="low"&&(this.degradeLOD(),this.degradeLOD())},window.addEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange=()=>{document.hidden||(this.lastTime=performance.now()*.001,this.active!==!1&&this.initialized&&this.render(ve.masterAnalyser||ve.analyserLeft,ve.analyserRight))},document.addEventListener("visibilitychange",this._boundVisibilityChange),this._boundContextLost=r=>{r.preventDefault(),this.active=!1,ve.animationId&&(cancelAnimationFrame(ve.animationId),ve.animationId=null)},e.addEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored=()=>{try{this.initialized=!1,this._freqDataArray=null,this.initEnvironment(),this.cameraPitch=0,this.cameraYaw=0,this.cameraRoll=0,this.updateCameraRotation(),typeof window.resetCameraControls=="function"&&window.resetCameraControls(),this.updateVisibility(),this.initialized=!0,this.active=!0,this.lastTime=performance.now()*.001,ve.animationId&&cancelAnimationFrame(ve.animationId),this._isRendering=!1,this.render(ve.masterAnalyser||ve.analyserLeft,ve.analyserRight)}catch{}},e.addEventListener("webglcontextrestored",this._boundContextRestored),this._boundCymaticPointer=r=>{const o=r.touches?r.touches[0].clientX:r.clientX,l=r.touches?r.touches[0].clientY:r.clientY;this.mouseX=o/window.innerWidth*2-1,this.mouseY=-(l/window.innerHeight)*2+1},window.addEventListener("mousemove",this._boundCymaticPointer),window.addEventListener("touchmove",this._boundCymaticPointer,{passive:!0}),this.resize(),setTimeout(this.handleLayoutChange,100),this._boundThemeChange=r=>{if(r.detail&&r.detail.type){const o=r.detail.type;this.themeType!==o&&(this.themeType=o,this.updateLogoTexture())}},window.addEventListener("themeChanged",this._boundThemeChange),this.speedMultiplier=1,this.brightnessMultiplier=1,this.lastTime=performance.now()*.001,this.simTime=0,this.targetFPS=60,this.lastFrameRenderTime=0,this.active=!0,this.updateVisibility(),this.initialized=!0,this.initOverlayLogo(),window.viz3D=this,setTimeout(()=>{window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}}))},100)}catch{this.initialized=!1}}setCameraRotation(e,t,i){this.cameraPitch=e,this.cameraYaw=t,this.cameraRoll=i,this.updateCameraRotation()}updateCameraRotation(){this.scene.rotation.set(this.cameraPitch,this.cameraYaw,this.cameraRoll)}setAudioSensitivity(e){this.audioSensitivity=parseFloat(e)}setGeoComplexity(e){this.geoComplexity=parseFloat(e)}resize(){if(!this.renderer||!this.canvas||!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.postProcessor&&this.postProcessor.resize(e,t),this.handleLayoutChange()}handleLayoutChange(){!this.renderer||!this.camera||this.camera.clearViewOffset()}resizeOverlayCanvas(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight)}captureSnapshot(){if(!this.canvas)return;typeof ve<"u"&&this.active!==!1&&this.initialized?this.render(ve.masterAnalyser||ve.analyserLeft,ve.analyserRight):this.renderer.render(this.scene,this.camera);const e=this.canvas.toDataURL("image/png",1),t=document.createElement("a");return t.download=`Mindwave-Snapshot-${new Date().toISOString().replace(/[:.]/g,"-")}.png`,t.href=e,document.body.appendChild(t),t.click(),document.body.removeChild(t),e}startRecording(){if(!this.canvas||this.mediaRecorder&&this.mediaRecorder.state==="recording")return!1;try{const e=this.canvas.captureStream(60),t={mimeType:"video/webm; codecs=vp9"};return MediaRecorder.isTypeSupported(t.mimeType)||(t.mimeType="video/webm; codecs=vp8",MediaRecorder.isTypeSupported(t.mimeType)||(t.mimeType="video/webm")),this.recordedChunks=[],this.mediaRecorder=new MediaRecorder(e,t),this.mediaRecorder.ondataavailable=i=>{i.data.size>0&&this.recordedChunks.push(i.data)},this.mediaRecorder.onstop=()=>{const i=new Blob(this.recordedChunks,{type:t.mimeType}),s=URL.createObjectURL(i),a=document.createElement("a");a.download=`Mindwave-Visuals-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,a.href=s,document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout(()=>URL.revokeObjectURL(s),100)},this.mediaRecorder.start(1e3),!0}catch{return!1}}stopRecording(){return this.mediaRecorder&&this.mediaRecorder.state==="recording"?(this.mediaRecorder.stop(),!0):!1}generateCyberStyle(){const e=this.overlayCanvas,t=this.overlayCtx;if(!e||!t)return;this.matrixCyberStreams=[];const i=Math.max(11,Math.min(21,Math.floor(e.width/50)));this.isLowPower=localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode");let s=Math.ceil(e.width/i);this.isLowPower||(s*=1.5);let a=window.getCurrentTheme?window.getCurrentTheme():{color:"#2dd4bf"};this.resizeOverlayCanvas(),this.cyberColorCustomized=!1;const r=[{name:"System Yellow",color:"#FFFF00",family:"yellow"},{name:"Neon Pink",color:"#FF1493",family:"pink"},{name:"Chrome Static",color:"#C0C0C0",family:"mono"},{name:"Royal Data",color:"#4169E1",family:"blue"},{name:"White Noise",color:"#FFFFFF",family:"mono"},{name:"Cyan Future",color:"#00FFFF",family:"blue"},{name:"Lime Access",color:"#32CD32",family:"green"},{name:"Purple Haze",color:"#800080",family:"purple"},{name:"Emerald Link",color:"#50C878",family:"green"},{name:"Ice Blue",color:"#A5F2F3",family:"blue"},{name:"sentAIent Blue",color:"#60A9FF",family:"blue"},{name:"Rainbow Surge",color:"rainbow",family:"rainbow"}],o=this.lastCyberFamily||"";let l=r.filter(f=>!this.themeHistory.includes(f.name));const c=l.filter(f=>f.family!==o);c.length>0&&(l=c);let u=l;if(u.length===0){const f=this.themeHistory[this.themeHistory.length-1];u=r.filter(v=>v.name!==f)}const h=u[Math.floor(Math.random()*u.length)];this.themeHistory.push(h.name),this.themeHistory.length>5&&this.themeHistory.shift(),this.lastCyberFamily=h.family;try{localStorage.setItem("cyberThemeHistory",JSON.stringify(this.themeHistory)),localStorage.setItem("cyberLastFamily",this.lastCyberFamily)}catch{}this.cyberSpeedMultiplier===void 0&&(this.cyberSpeedMultiplier=.2),this.cyberLengthMultiplier===void 0&&(this.cyberLengthMultiplier=.7);const d=document.getElementById("cyberRainbowToggle");if(d&&this.cyberRainbowMode===void 0&&(this.cyberRainbowMode=!0,this.cyberConfig.rainbow=!0,d.checked=!0),!this.cyberRainbowMode&&a.color!=="rainbow"){this.cyberColor=a.color;const f=document.getElementById("cyberColorPicker");f&&(f.value=this.cyberColor)}for(let f=0;f<s;f++){const v=Math.random(),x=Math.floor(8+v*11),m=(2+v*8+Math.random()*2)*this.cyberSpeedMultiplier;this.matrixCyberStreams.push({x:f*i,y:Math.random()*this.overlayCanvas.height*1.5-this.overlayCanvas.height*.5,baseSpeed:m,opacity:.2+v*.8,size:x,chars:[],color:a.color!=="rainbow"?a.color:"#FFFFFF"})}this.updateCyberStrings(),this.matrixCyberStreams.sort((f,v)=>f.size-v.size)}renderCyberCyber(){const e=this.activeModes.has("cyber");if(!this.overlayCtx||!this.matrixCyberStreams||!e)return;const t=this.overlayCtx,i=this.overlayCanvas;t.clearRect(0,0,i.width,i.height);const s=this.activeModes.size>1;t.fillStyle=s?"rgba(0, 0, 0, 0.4)":"rgba(0, 0, 0, 0.85)",t.fillRect(0,0,i.width,i.height),t.save(),t.textAlign="center";const a=this.cyberConfig,r=a.speed||1,o=a.length||1;a.angle!==0&&(t.translate(i.width/2,i.height/2),t.rotate(a.angle*Math.PI/180),t.translate(-i.width/2,-i.height/2));const l=20,c=Date.now()*.1;t.textBaseline="middle";let u=-1;this.matrixCyberStreams.forEach((h,d)=>{h.y+=h.baseSpeed*r;let f=Math.max(3,Math.floor(l*o));(this.isLowPower||this.currentLodLevel==="low")&&(f=Math.floor(f*.4)),h.y-f*h.size>i.height*1.5&&(h.y=0);const v="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";h.size!==u&&(t.font=`${h.size}px monospace`,u=h.size);const x=this.isLowPower&&this.currentLodLevel==="low"?2:1;for(let m=0;m<f&&m<h.chars.length;m+=x){!h.isTextMode&&Math.random()<.02&&(h.chars[m]=v.charAt(Math.floor(Math.random()*v.length)));const p=h.chars[m],_=h.y-m*h.size;if(_<-h.size*2||_>i.height*1.5)continue;const g=1-m/f,S=Math.pow(g,.4)*(h.opacity*1.2);if(t.globalAlpha=Math.min(1,S),this.cyberRainbowMode){const A=(c+d*15+m*5)%360;t.fillStyle=`hsl(${A}, 100%, 60%)`,d===0&&m===0&&Math.random()<.01}else t.fillStyle=h.color||this.cyberColor,d===0&&m===0&&Math.random()<.01;t.fillText(p,h.x,_)}}),t.shadowBlur=0,t.globalAlpha=1,t.restore()}initSphere(){var r;const e=new _n(2,2),t=new At({color:6334975,wireframe:!0,transparent:!0,opacity:.5});this.sphere=new We(e,t);const i=new _n(1.8,1),s=new At({color:6334975,transparent:!0,opacity:.1,blending:Ye});this.core=new We(i,s),this.sphereGroup.add(this.sphere),this.sphereGroup.add(this.core),this.sphereGroup.visible=!1;const a=((r=this.customColors)==null?void 0:r.sphere)||this.customColor;a&&(this.sphere.material.color.copy(a),this.core.material.color.copy(a))}initLightspeed(){const t=new Ze,i=new Float32Array(2e3*3);for(let s=0;s<2e3*3;s++)i[s]=(Math.random()-.5)*80;t.setAttribute("position",new st(i,3)),this.lightspeedMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:1},uColor:{value:new fe(3003583)},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:Ye,depthWrite:!1}),this.lightspeed=new hi(t,this.lightspeedMaterial),this.lightspeedGroup.add(this.lightspeed)}initParticles(){const e=this.batterySaver?400:1e3,t=new Ze,i=new Float32Array(e*3),s=new Float32Array(e*3);for(let a=0;a<e;a++){const r=a*3;i[r]=(Math.random()-.5)*60,i[r+1]=(Math.random()-.5)*60,i[r+2]=(Math.random()-.5)*80;const o=Math.random();o<.3?(s[r]=.4,s[r+1]=.7,s[r+2]=1):o<.6?(s[r]=.3,s[r+1]=.9,s[r+2]=.95):o<.85?(s[r]=.6,s[r+1]=.4,s[r+2]=1):(s[r]=.9,s[r+1]=.9,s[r+2]=1)}t.setAttribute("position",new st(i,3)),t.setAttribute("color",new st(s,3)),this.particleMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:1},uSize:{value:.4},uTexture:{value:this.createCircleTexture()},uIntensity:{value:1}},vertexShader:`
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
            `,transparent:!0,blending:Ye,depthWrite:!1}),this.particles=new hi(t,this.particleMaterial),this.particleGroup.add(this.particles),this.particleGroup.visible=!1}initBox(){var u;this.boxOuter=new je;const e=new Va(new Ci(3,3,3)),t=new dn({color:16777215,transparent:!0,opacity:.9,blending:Ye}),i=new dn({color:3900150,transparent:!0,opacity:.5,blending:Ye});this.boxOuter.add(new Gn(e,t));for(let h=1;h<=3;h++){const d=new Gn(e,i);d.scale.setScalar(1+h*.012),this.boxOuter.add(d)}const s=new Va(new Ci(2,2,2)),a=new dn({color:14742270,transparent:!0,opacity:.8,blending:Ye}),r=new dn({color:6333946,transparent:!0,opacity:.4,blending:Ye});this.boxInner=new je,this.boxInner.add(new Gn(s,a));for(let h=1;h<=2;h++){const d=new Gn(s,r);d.scale.setScalar(1+h*.015),this.boxInner.add(d)}const o=new Va(new Ci(3.05,3.05,3.05)),l=new dn({color:9684477,transparent:!0,opacity:.8,blending:Ye});this.boxEdges=new Gn(o,l),this.boxGroup.add(this.boxOuter),this.boxGroup.add(this.boxInner),this.boxGroup.add(this.boxEdges),this.boxGroup.visible=!1;const c=((u=this.customColors)==null?void 0:u.box)||this.customColor;c&&(this.boxOuter.children.forEach(h=>h.material.color.copy(c)),this.boxInner.children.forEach(h=>h.material.color.copy(c)),this.boxEdges&&this.boxEdges.material&&this.boxEdges.material.color.copy(c))}initDragon(){var d;this.dragonDummy=new pt,this.dragonLength=80;const e=new _n(.8,1),t=new At({color:15680580,wireframe:!0,transparent:!0,opacity:.8,blending:Ye}),i=new _n(.5,1),s=new At({color:16096779,wireframe:!1,transparent:!0,opacity:.6,blending:Ye});this.dragonBodyInstanced=new tl(e,t,this.dragonLength),this.dragonGlowInstanced=new tl(i,s,this.dragonLength);const a=new Yn(1.5,3.5,5);a.rotateX(Math.PI/2);const r=new At({color:16638023,wireframe:!0,transparent:!0,opacity:.9,blending:Ye});this.dragonHead=new We(a,r),this.dragonPearlGroup=new je;const o=new yn(1,16,16),l=new At({color:3718648,wireframe:!1,transparent:!0,opacity:.9,blending:Ye}),c=new yn(1.3,16,16),u=new At({color:8246268,wireframe:!0,transparent:!0,opacity:.5,blending:Ye});this.dragonPearl=new We(o,l),this.dragonPearlHalo=new We(c,u),this.dragonPearlGroup.add(this.dragonPearl),this.dragonPearlGroup.add(this.dragonPearlHalo),this.dragonGroup.add(this.dragonBodyInstanced),this.dragonGroup.add(this.dragonGlowInstanced),this.dragonGroup.add(this.dragonHead),this.dragonGroup.add(this.dragonPearlGroup),this.dragonGroup.visible=!1;const h=((d=this.customColors)==null?void 0:d.dragon)||this.customColor;h&&this.updateDragonColor(h)}updateGalaxyColor(e){if(this.galaxySunMesh&&this.galaxySunMesh.traverse(t=>{t.isMesh&&t.material&&t.material.color.copy(e)}),this.galaxyStars&&this.galaxyStars.geometry){const t={};e.getHSL(t);const i=(t.h+.5)%1,s=this.galaxyStars.geometry.getAttribute("color");if(s){const a=s.count,r=this._tempColor;for(let o=0;o<a;o++){const l=o/a,c=l<.2?.8:l<.5?.6:.4+Math.random()*.15,u=.6+Math.random()*.3;r.setHSL(i,u,c),s.setXYZ(o,r.r,r.g,r.b)}s.needsUpdate=!0}}}updateDragonColor(e){if(!this.dragonBodyInstanced)return;this.dragonBodyInstanced.material.color.copy(e),this.dragonHead.material.color.copy(e);const t={};e.getHSL(t);const i=(t.h+.5)%1,s=new fe().setHSL(i,t.s,t.l);this.dragonGlowInstanced.material.color.copy(s)}initGalaxy(){const e=this.batterySaver?500:1500,t=new Ze,i=[],s=[],a=[];for(let l=0;l<e;l++){const c=l/e*Math.PI*10,u=2.5+l/e*20+Math.random()*2,h=l%4*(Math.PI*2/4),d=Math.max(.5,l/e*4),f=Math.cos(c+h)*u+(Math.random()-.5)*d,v=(Math.random()-.5)*1.5,x=Math.sin(c+h)*u+(Math.random()-.5)*d;i.push(f,v,x);const m=l/e;m<.2?s.push(1,.95,.7):m<.5?s.push(.7+Math.random()*.3,.8,1):s.push(.4+Math.random()*.2,.3+Math.random()*.3,.8+Math.random()*.2),a.push(Math.random()<.05?.4+Math.random()*.3:.08+Math.random()*.15)}t.setAttribute("position",new Ne(i,3)),t.setAttribute("color",new Ne(s,3)),t.setAttribute("size",new Ne(a,1));const r=this.createStarTexture(),o=new Vs({size:.25,vertexColors:!0,map:r,transparent:!0,opacity:.9,blending:Ye,depthWrite:!1,sizeAttenuation:!0});this.galaxyStars=new hi(t,o),this.galaxyGroup.add(this.galaxyStars),this.galaxySunStyle=this.galaxySunStyle||"sun",this.createGalaxySun(this.galaxySunStyle),this.galaxyGroup.visible=!1}createGalaxySun(e){this.galaxySunMesh&&(this.galaxyGroup.remove(this.galaxySunMesh),this.galaxySunMesh=null),this.galaxySunMesh=new je;const t=new At({color:4892415,transparent:!0,opacity:.85,blending:Ye,depthWrite:!1,side:Mt}),i=new je;if(e==="sun2"){const s=t.clone();s.side=pi;const a=new js(1.5,.25,16,64);i.add(new We(a,s));const r=8,o=new Yn(.4,2.7,4);o.translate(0,2.7/2,0);const l=new Yn(.2,1.7,4);l.translate(0,1.7/2,0);for(let c=0;c<r;c++){const u=c/r*Math.PI*2,h=new We(o,s);h.rotation.z=-u,h.position.set(Math.sin(u)*1.5,Math.cos(u)*1.5,0),i.add(h);const d=u+Math.PI/r,f=new We(l,s);f.rotation.z=-d,f.position.set(Math.sin(d)*1.5,Math.cos(d)*1.5,0),i.add(f)}}else if(e==="sun3"){const s={uTime:{value:0},uLoopTime:{value:0},uColor:{value:t.color},uBassIntt:{value:0}};this.galaxySunUniforms=s;const a=`
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
            `,o=new ft({vertexShader:a,fragmentShader:r,uniforms:s,transparent:!0,blending:Ye,depthWrite:!1,side:Mt}),l=new yn(2,64,64),c=new We(l,o);i.add(c);const u=new At({color:t.color,transparent:!0,opacity:.15,blending:Ye,depthWrite:!1,side:Nt}),h=new yn(3,32,32);i.add(new We(h,u))}else{const s=new js(1.5,.12,8,64);i.add(new We(s,t));const a=8;for(let r=0;r<a;r++){const o=r/a*Math.PI*2,l=new ir;l.moveTo(-.4,0),l.lineTo(.4,0),l.lineTo(0,2.7),l.lineTo(-.4,0);const c=new Ks(l),u=new We(c,t);u.rotation.z=-o,u.position.set(Math.sin(o)*1.5,Math.cos(o)*1.5,0),i.add(u);const h=o+Math.PI/a,d=new ir;d.moveTo(-.2,0),d.lineTo(.2,0),d.lineTo(0,1.7),d.lineTo(-.2,0);const f=new Ks(d),v=new We(f,t);v.rotation.z=-h,v.position.set(Math.sin(h)*1.5,Math.cos(h)*1.5,0),i.add(v)}}this.galaxySunMesh.add(i),this.galaxySunMesh.position.set(0,0,.1),this.galaxyGroup.add(this.galaxySunMesh)}setGalaxySunStyle(e){e!=="sun"&&e!=="sun2"&&e!=="sun3"||(this.galaxySunStyle=e,this.galaxyGroup&&this.galaxyGroup.children.length>0&&this.createGalaxySun(e))}setGalaxySunRotation(e,t){e==="x"&&(this.sunRotationSpeedX=parseFloat(t)),e==="y"&&(this.sunRotationSpeedY=parseFloat(t)),e==="z"&&(this.sunRotationSpeedZ=parseFloat(t))}createStarTexture(){if(this.textures.star)return this.textures.star;const e=64,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),s=e/2,a=e/2;i.clearRect(0,0,e,e);const r=i.createRadialGradient(s,a,0,s,a,e/2);return r.addColorStop(0,"rgba(255, 255, 255, 1.0)"),r.addColorStop(.1,"rgba(255, 255, 240, 0.8)"),r.addColorStop(.25,"rgba(255, 255, 200, 0.3)"),r.addColorStop(.5,"rgba(200, 200, 255, 0.1)"),r.addColorStop(1,"rgba(100, 100, 255, 0)"),i.fillStyle=r,i.fillRect(0,0,e,e),i.fillStyle="rgba(255, 255, 255, 0.6)",i.beginPath(),i.moveTo(0,a-1),i.lineTo(s,a-.5),i.lineTo(e,a-1),i.lineTo(e,a+1),i.lineTo(s,a+.5),i.lineTo(0,a+1),i.closePath(),i.fill(),i.beginPath(),i.moveTo(s-1,0),i.lineTo(s-.5,a),i.lineTo(s-1,e),i.lineTo(s+1,e),i.lineTo(s+.5,a),i.lineTo(s+1,0),i.closePath(),i.fill(),i.beginPath(),i.arc(s,a,2,0,Math.PI*2),i.fillStyle="rgba(255, 255, 255, 1.0)",i.fill(),this.textures.star=new Vn(t),this.textures.star}initMandala(){var a;this.mandalaRings=[];const e=[2450411,15357964,3900150,16347926,12573694];for(let r=0;r<5;r++){const o=1.2+r*.8,l=6+r*6,c=new xr(o-.05,o+.05,l),u=new At({color:e[r],side:Mt,transparent:!0,opacity:.4-r*.05,blending:Ye}),h=new We(c,u);h.userData={speed:(.01+r*.005)*(r%2===0?1:-1),segments:l},this.mandalaRings.push(h),this.mandalaGroup.add(h)}const t=new mr(.3,32),i=new At({color:16347926,transparent:!0,opacity:.6,blending:Ye});this.mandalaCenter=new We(t,i),this.mandalaGroup.add(this.mandalaCenter),this.mandalaGroup.visible=!1;const s=(a=this.customColors)==null?void 0:a.mandala;s&&(this.mandalaRings.forEach(r=>r.material.color.copy(s)),this.mandalaCenter.material.color.copy(s))}createSnowflakeTexture(){if(this.textures.snowflake)return this.textures.snowflake;const e=128,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),s=e/2,a=e/2;i.clearRect(0,0,e,e),i.strokeStyle="rgba(220,240,255,1.0)",i.lineCap="round";for(let r=0;r<6;r++){const o=r/6*Math.PI*2;i.save(),i.translate(s,a),i.rotate(o),i.lineWidth=2.5,i.beginPath(),i.moveTo(0,0),i.lineTo(0,-52),i.stroke();const l=[{d:18,len:14,angle:Math.PI/4},{d:32,len:20,angle:Math.PI/4},{d:46,len:10,angle:Math.PI/5}];i.lineWidth=1.5,l.forEach(({d:c,len:u,angle:h})=>{[1,-1].forEach(d=>{i.beginPath(),i.moveTo(0,-c),i.lineTo(d*u*Math.cos(Math.PI/2-h),-c-u*Math.sin(Math.PI/2-h)),i.stroke()})}),i.restore()}i.beginPath();for(let r=0;r<6;r++){const o=r/6*Math.PI*2-Math.PI/6,l=s+Math.cos(o)*4,c=a+Math.sin(o)*4;r===0?i.moveTo(l,c):i.lineTo(l,c)}return i.closePath(),i.fillStyle="rgba(255, 255, 255, 0.8)",i.fill(),this.textures.snowflake=new Vn(t),this.textures.snowflake}setTsunamiKanagawa(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uKanagawa.value=e)}setTsunamiAmplitude(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uAmplitude.value=parseFloat(e)),this.tsunamiAnimState&&this.tsunamiAnimState.active&&(this.tsunamiAnimState.startAmp=parseFloat(e),this.tsunamiAnimState.phase=0)}setTsunamiCurl(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uCurl.value=parseFloat(e)),this.tsunamiAnimState&&this.tsunamiAnimState.active&&(this.tsunamiAnimState.startCurl=parseFloat(e),this.tsunamiAnimState.phase=0)}setTsunamiMist(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uMist.value=parseFloat(e));let t=parseFloat(e),i=Math.max(Math.min(t,1),0),s=Math.max(Math.min(1-t*2,1),0);this.tsunamiSun&&this.tsunamiSun.material&&(this.tsunamiSun.material.opacity=i,this.tsunamiSun.material.uniforms&&this.tsunamiSun.material.uniforms.uMist&&(this.tsunamiSun.material.uniforms.uMist.value=t)),this.tsunamiMoon&&this.tsunamiMoon.material&&this.tsunamiMoon.material.uniforms&&(this.tsunamiMoon.material.uniforms.uOpacity.value=s)}setTsunamiMoonPhase(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&this.tsunamiMaterial.uniforms.uMoonPhase&&(this.tsunamiMaterial.uniforms.uMoonPhase.value=parseFloat(e)),this.tsunamiMoon&&this.tsunamiMoon.material&&this.tsunamiMoon.material.uniforms&&(this.tsunamiMoon.material.uniforms.uMoonPhase.value=parseFloat(e))}setTsunamiStyle(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uStyle.value=parseFloat(e))}setTsunamiReactivity(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uReactivity.value=parseFloat(e))}setTsunamiLoop(e){this.tsunamiMaterial&&this.tsunamiMaterial.uniforms&&(this.tsunamiMaterial.uniforms.uLoopActive.value=e?1:0),this.tsunamiAnimState||(this.tsunamiAnimState={active:!1,phase:0,startAmp:1,startCurl:1}),this.tsunamiAnimState.active=e,e&&(this.tsunamiAnimState.phase=0,this.tsunamiAnimState.startAmp=this.tsunamiMaterial?this.tsunamiMaterial.uniforms.uAmplitude.value:1,this.tsunamiAnimState.startCurl=this.tsunamiMaterial?this.tsunamiMaterial.uniforms.uCurl.value:1)}initTsunami(){if(!this.tsunamiGroup)return;this.tsunamiGroup.clear();const e=new Jt(4e3,250,1500,300);e.translate(1500,0,0);const t={uTime:{value:0},uLoopTime:{value:0},uNormBass:{value:0},uColor:{value:new fe(775123)},uHasCustomColor:{value:0},uSecondaryColor:{value:new fe(27028)},uDeepColor:{value:new fe(23477)},uFoamColor:{value:new fe(16777215)},uSunColor:{value:new fe(16770457)},uAmplitude:{value:2.2},uCurl:{value:2.4},uMist:{value:1},uMoonPhase:{value:0},uStyle:{value:1},uReactivity:{value:2},uLoopActive:{value:0},uKanagawa:{value:0},uWaveOffset:{value:0}},i=`
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
        `,s=`
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
        `,a=new ft({vertexShader:i,fragmentShader:s,uniforms:t,transparent:!0,side:Mt,wireframe:!1});this.tsunamiMaterial=a;const r=new We(e,a);r.rotation.x=-Math.PI/2,r.position.y=-40,r.position.z=-50,r.position.x=0,r.frustumCulled=!1,this.tsunamiGroup.add(r);const l="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
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
        </svg>`),c=new pn().load(l),u=new Jl({map:c,color:16777215,transparent:!0,depthWrite:!1,fog:!1});this.tsunamiSun=new Gm(u),this.tsunamiSun.scale.set(60,60,1),this.tsunamiSun.position.set(70,50,-120),this.tsunamiSun.material.uniforms={uMist:{value:1}},this.tsunamiGroup.add(this.tsunamiSun);const h=`
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
        `,f=new ft({vertexShader:h,fragmentShader:d,uniforms:{uMoonPhase:{value:1},uOpacity:{value:0}},transparent:!0,depthWrite:!1}),v=new Jt(100,100);this.tsunamiMoon=new We(v,f),this.tsunamiMoon.position.set(70,50,-120),this.tsunamiGroup.add(this.tsunamiMoon)}initSnowflake(){for(;this.snowflakeGroup.children.length>0;){const f=this.snowflakeGroup.children[0];this.snowflakeGroup.remove(f),f.geometry&&f.geometry.dispose(),f.material&&f.material.dispose()}this._snowData=null;const e=this.snowCount||200,t=new Float32Array(e*3),i=new Float32Array(e),s=new Float32Array(e),a=new Float32Array(e),r=new Float32Array(e),o=new Float32Array(e),l=new Float32Array(e);for(let f=0;f<e;f++){const v=f*3;t[v]=(Math.random()-.5)*80,t[v+1]=(Math.random()-.5)*60,t[v+2]=-40+Math.random()*35;const x=(t[v+2]+40)/35;i[f]=1.5+x*8,s[f]=.2+x*.6,a[f]=Math.random()*Math.PI*2,r[f]=.015+Math.random()*.04+x*.03,o[f]=.01+Math.random()*.02,l[f]=.4+Math.random()*.8}const c=new Ze;c.setAttribute("position",new st(t,3)),c.setAttribute("aSize",new st(i,1)),c.setAttribute("aOpacity",new st(s,1));const u=this.createSnowflakeTexture(),h=new ft({uniforms:{uTexture:{value:u},uColor:{value:this.customColor?this.customColor.clone():new fe(10875883)},uIntensity:{value:0},uSizeMultiplier:{value:this.snowSizeOverride},uGlowAmount:{value:.5}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:Ye}),d=new hi(c,h);this.snowflakeGroup.add(d),this._snowData={count:e,positions:t,phases:a,speeds:r,drifts:o,driftFreqs:l,points:d,material:h,spinMeshes:[],spinSpeeds:[]}}setSnowSize(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uSizeMultiplier.value=Math.max(.2,Math.min(4,e)))}setSnowCount(e){this.snowCount=parseInt(e)||200,this.snowflakeGroup&&this.snowflakeGroup.visible&&this.initSnowflake()}setSnowDrift(e){this.snowDriftMultiplier=parseFloat(e)||1}setSnowGlow(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uGlowAmount.value=Math.max(0,Math.min(1,e)))}initLava(){var r;this.lavaBlobs=[];const e=16;this.lavaUniforms={uBlobs:{value:[]},uColor:{value:new fe(((r=ve.visualColors)==null?void 0:r.lava)||16737792)},uSecondaryColor:{value:new fe(16755200)},uTime:{value:0},uLoopTime:{value:0},uIntensity:{value:0},uResolution:{value:new ae(window.innerWidth,window.innerHeight)}};for(let o=0;o<e;o++)this.lavaUniforms.uBlobs.value.push(new at(0,-100,0,0));const t=new ft({uniforms:this.lavaUniforms,vertexShader:`
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
            `,transparent:!0,blending:Ye,depthWrite:!1,side:Mt}),i=new Jt(100,100),s=new We(i,t);s.position.z=-5,[{count:5,minSize:1,maxSize:1.5},{count:7,minSize:1.5,maxSize:2.2},{count:4,minSize:2.2,maxSize:3.5}].forEach(o=>{for(let l=0;l<o.count;l++){const c=o.minSize+Math.random()*(o.maxSize-o.minSize),u=["heating","rising","cooling","falling"],h=u[Math.floor(Math.random()*u.length)],d=-18+Math.random()*4,f=18+Math.random()*4;let v=0,x=.5;h==="heating"?(v=d,x=Math.random()*.5):h==="rising"?(v=d+Math.random()*(f-d),x=.8+Math.random()*.2):h==="cooling"?(v=f,x=1-Math.random()*.3):h==="falling"&&(v=f-Math.random()*(f-d),x=.2+Math.random()*.3),this.lavaBlobs.push({position:new R((Math.random()-.5)*12,v,(Math.random()-.5)*6),material:{uniforms:{uTemp:{value:0},uIntensity:{value:0},uTime:{value:0}}},userData:{baseSize:c,state:h,temperature:x,floatMin:d,floatMax:f,heatRate:.15+Math.random()*.3,coolRate:.15+Math.random()*.3,riseSpeed:(.04+Math.random()*.05)/(c*.5),fallSpeed:(.05+Math.random()*.05)/(c*.5),driftPhase:Math.random()*Math.PI*2,driftSpeed:.01+Math.random()*.02}})}}),this.lavaGroup.add(s),this.lavaGroup.visible=!1}initFireplace(){const i=new Jt(100,80);this.fireMaterial=this.createFireShader(),this.fireMesh=new We(i,this.fireMaterial),this.fireMesh.position.set(0,0,-15),this.fireMesh.renderOrder=10,this.fireplaceGroup.add(this.fireMesh),this.fireLight=new w0(16737792,5,200),this.fireLight.position.set(0,0,30),this.fireplaceGroup.add(this.fireLight);const s=650,a=new Ze,r=[];for(let o=0;o<s;o++)r.push((Math.random()-.5)*100,-20+Math.random()*40,-15+(Math.random()-.5)*20);a.setAttribute("position",new Ne(r,3)),this.emberMat=new Vs({color:16763904,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.8,blending:Ye,depthWrite:!1}),this.embers=new hi(a,this.emberMat),this.fireplaceGroup.add(this.embers),this.emberVelocities=new Float32Array(s);for(let o=0;o<s;o++)this.emberVelocities[o]=.02+Math.random()*.05;this.fireplaceGroup.position.set(0,0,0),this.fireplaceGroup.visible=!1}createFireShader(){return new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uColor:{value:new fe(16729088)},uSpeed:{value:1},uIntensity:{value:1}},vertexShader:`
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
            `,transparent:!0,side:Mt,blending:Ye,depthWrite:!1})}initRainforest(){const e=this.batterySaver?400:1e3,t=new Ze,i=new Float32Array(e*3),s=new Float32Array(e*3);for(let a=0;a<e;a++){const r=a*3;i[r]=(Math.random()-.5)*60,i[r+1]=(Math.random()-.5)*40,i[r+2]=(Math.random()-.5)*40,s[r]=Math.random(),s[r+1]=Math.random(),s[r+2]=.08+Math.random()*.12}t.setAttribute("position",new st(i,3)),t.setAttribute("aRandom",new st(s,3)),this.rainMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:1},uColor:{value:new fe(8965375)},uIntensity:{value:.6}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:Ye}),this.raindrops=new hi(t,this.rainMaterial),this.rainforestGroup.add(this.raindrops),this.rainforestGroup.visible=!1}initZenGarden(){const e=this.batterySaver?200:500,t=new Ze,i=new Float32Array(e*3),s=new Float32Array(e*3);for(let r=0;r<e;r++){const o=r*3;i[o]=(Math.random()-.5)*40,i[o+1]=(Math.random()-.5)*20,i[o+2]=(Math.random()-.5)*40,s[o]=Math.random(),s[o+1]=Math.random(),s[o+2]=Math.random()*Math.PI*2}t.setAttribute("position",new st(i,3)),t.setAttribute("aRandom",new st(s,3)),this.petalMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:1},uColor:{value:new fe(16758725)},uIntensity:{value:.8}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1}),this.petals=new hi(t,this.petalMaterial),this.zenGardenGroup.add(this.petals);const a=new Jt(40,40,32,32);this.zenWaterMaterial=new At({color:2245734,transparent:!0,opacity:.3,side:Mt}),this.zenWater=new We(a,this.zenWaterMaterial),this.zenWater.rotation.x=-Math.PI/2,this.zenWater.position.y=-5,this.zenGardenGroup.add(this.zenWater),this.zenGardenGroup.visible=!1}initOcean(){var o;const e=new Jt(300,100,128,64);this.oceanWave=new We(e,new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uColor:{value:this.customColor?this.customColor.clone():new fe(43775)},uNormBass:{value:0},uBeatPulse:{value:0}},vertexShader:`
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
            `,wireframe:!0,transparent:!0,side:Mt})),this.oceanWave.rotation.x=-Math.PI/3,this.oceanWave.position.y=-2,this.oceanGroup.add(this.oceanWave);const t=300,i=new Ze,s=[];for(let l=0;l<t;l++)s.push((Math.random()-.5)*50),s.push(-2.5+Math.random()*.5),s.push((Math.random()-.5)*40);i.setAttribute("position",new Ne(s,3));const a=new Vs({color:16777215,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.5,blending:Ye,depthWrite:!1});this.oceanFoam=new hi(i,a),this.oceanGroup.add(this.oceanFoam),this.oceanGroup.visible=!1;const r=((o=this.customColors)==null?void 0:o.ocean)||this.customColor;r&&(this.oceanWave&&this.oceanWave.material.color.copy(r),this.oceanFoam&&this.oceanFoam.material.color.copy(r))}createCyberTexture(e=this.matrixConfig){const i=document.createElement("canvas");i.width=1024,i.height=1024;const s=i.getContext("2d");s.fillStyle="rgba(0,0,0,0)",s.fillRect(0,0,1024,1024),s.shadowBlur=12,s.shadowColor="rgba(255, 255, 255, 0.4)",s.font='bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace',s.fillStyle="#ffffff",s.textAlign="center",s.textBaseline="middle";const a=8,r=8,o=1024/a,l=1024/r;let c="🪷MINDWAVE";const u=e.logicMode,h=e.customText;u==="custom"||u==="txt"?c="🪷"+(h&&h.length>0?h:"WELCOME TO MINDWAVE"):(u==="random"||u==="rnd"||u==="matrix"||u==="int"||u==="interstellar")&&(c="");const d=u==="matrix"||u==="int"||u==="interstellar"?[]:["LOGO",...c],f=d.length;for(let x=0;x<64;x++){const m=x%8,p=Math.floor(x/8);s.fillStyle="rgba(0,0,0,0)",s.fillRect(m*o,p*l,o,l),s.save(),s.translate(m*o+o/2,p*l+l/2);let _="",g=!1;if(x<f){const S=d[x];S==="LOGO"?g=!0:_=S}else{const A="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";_=A.charAt(Math.floor(Math.random()*A.length)),Math.random()>.5&&(s.save(),s.scale(-1,1),s.fillStyle="#ffffff",s.font="bold 80px monospace",s.fillText(_,0,0),s.restore(),_="")}if(_||g)if(s.fillStyle="#ffffff",s.font="bold 80px monospace",s.textAlign="center",s.textBaseline="middle",s.shadowBlur=16,s.shadowColor="rgba(255, 255, 255, 0.6)",g)if(this.logoImage){const T=document.createElement("canvas");T.width=100,T.height=100;const E=T.getContext("2d");E.imageSmoothingEnabled=!0,E.imageSmoothingQuality="high",E.drawImage(this.logoImage,0,0,100,100);const N=E.getImageData(0,0,100,100),y=N.data;for(let w=0;w<y.length;w+=4){const X=180+(y[w]+y[w+1]+y[w+2])/3/255*75;y[w]=X,y[w+1]=X,y[w+2]=X}E.putImageData(N,0,0),s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(T,-50,-50,100,100)}else!this.logoLoading&&!this.logoFailed&&(this.logoLoading=!0,new rc().load("./mindwave-logo-icon.png",A=>{if(this.logoImage=A,this.logoLoading=!1,this.cyberMaterial){const T=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=T}},void 0,A=>{this.logoFailed=!0,this.logoLoading=!1})),s.font="bold 80px monospace",s.fillStyle="#2dd4bf",s.fillText("🪷",0,0);else s.fillText(_,0,0);s.restore()}const v=new Vn(i);return v.magFilter=mt,v.minFilter=mt,v}createCyberShader(e,t=this.matrixConfig){return new ft({uniforms:{uTexture:{value:e},uColor:{value:new fe(t.color||65345)},uHeadColor:{value:new fe(15794160)},uTime:{value:0},uLoopTime:{value:0},uSpeed:{value:t.speed||1},uTailLength:{value:t.length||1},uRainbow:{value:t.rainbow?1:0},uBrightness:{value:this.brightnessMultiplier||1}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:Ye})}initEnvironment(){this.sunLight=new C0(16774625,1.2),this.sunLight.position.set(50,100,50),this.scene.add(this.sunLight),this.ambientLight=new E0(4210752,.6),this.scene.add(this.ambientLight)}ensureInitialized(e){const t=`[VizInit] ${e}`;e==="sphere"&&(!this.sphereGroup||this.sphereGroup.children.length===0)&&this.initSphere(),e==="particles"&&(!this.particleGroup||this.particleGroup.children.length===0)&&this.initParticles(),e==="lightspeed"&&(!this.lightspeedGroup||this.lightspeedGroup.children.length===0)&&this.initLightspeed(),e==="waves"&&(!this.wavesGroup||this.wavesGroup.children.length===0)&&this.initWaves(),e==="lava"&&(!this.lavaGroup||this.lavaGroup.children.length===0)&&this.initLava(),e==="fireplace"&&(!this.fireplaceGroup||this.fireplaceGroup.children.length===0)&&this.initFireplace(),e==="rainforest"&&(!this.rainforestGroup||this.rainforestGroup.children.length===0)&&this.initRainforest(),e==="zengarden"&&(!this.zenGardenGroup||this.zenGardenGroup.children.length===0)&&this.initZenGarden(),e==="ocean"&&(!this.oceanGroup||this.oceanGroup.children.length===0)&&this.initOcean(),e==="tsunami"&&(!this.tsunamiGroup||this.tsunamiGroup.children.length===0)&&this.initTsunami(),(e==="cyber"||e==="matrix")&&(!this.cyberGroup||this.cyberGroup.children.length===0)&&this.initCyber(),e==="box"&&(!this.boxGroup||this.boxGroup.children.length===0)&&this.initBox(),e==="dragon"&&(!this.dragonGroup||this.dragonGroup.children.length===0)&&this.initDragon(),e==="galaxy"&&(!this.galaxyGroup||this.galaxyGroup.children.length===0)&&this.initGalaxy(),e==="mandala"&&(!this.mandalaGroup||this.mandalaGroup.children.length===0)&&this.initMandala(),e==="snowflake"&&(!this.snowflakeGroup||this.snowflakeGroup.children.length===0)&&this.initSnowflake()}initCyber(){for(;this.cyberGroup.children.length>0;){const f=this.cyberGroup.children[0];this.cyberGroup.remove(f),f.material&&(f.material.map&&f.material.map.dispose(),f.material.dispose()),f.children&&f.traverse(v=>{v.geometry&&v.geometry.dispose(),v.material&&(v.material.map&&v.material.map.dispose(),v.material.dispose())})}this.cyberRotationGroup=null,this.cyberPoints=null;const e=80,t=120,i=new Ze,s=[],a=[],r=[],o=[],l=240,c=160,u=l/e,h=c/t;for(let f=0;f<e;f++){const v=f*u-l/2+Math.random()*.8*u,x=-20-Math.random()*2,m=.5+Math.random()*.5,p=this.matrixConfig,_=p.logicMode==="mindwave"||p.logicMode==="mw"||p.logicMode==="custom"||p.logicMode==="txt",g=p.logicMode==="matrix"||p.logicMode==="int"||p.logicMode==="interstellar",A=((p.logicMode==="custom"||p.logicMode==="txt")&&p.customText?"🪷"+p.customText:"MINDWAVE").length,T=g?Math.random()*100:0,E=g?.5+Math.random()*1.5:1,N=Math.random()*100+T;for(let y=0;y<t;y++){const w=c/2-y*h;s.push(v,w,x),_?a.push(y%(A+1)):g?a.push(Math.floor(Math.random()*64)):a.push(9+Math.floor(Math.random()*55)),r.push(N),o.push(m*E)}}i.setAttribute("position",new Ne(s,3)),i.setAttribute("aCharIndex",new Ne(a,1)),i.setAttribute("aSpawnTime",new Ne(r,1)),i.setAttribute("aSpeed",new Ne(o,1)),this.cyberGeometry=i;const d=this.createCyberTexture(this.matrixConfig);this.cyberMaterial=this.createCyberShader(d,this.matrixConfig),this.cyberRain=new hi(i,this.cyberMaterial),this.cyberRain.frustumCulled=!1,this.cyberRain.renderOrder=-1,this.cyberRotationGroup=new je,this.cyberRotationGroup.add(this.cyberRain),this.cyberGroup.add(this.cyberRotationGroup),this.currentCyberAngle!==void 0&&(this.cyberRotationGroup.rotation.z=uo.degToRad(-this.currentCyberAngle))}setCyberMode(e){if(this.mindWaveMode!==e)if(this.mindWaveMode=e,this.cyberLogicMode=e?"mindwave":"classic",e&&this.cyberMaterial){const t=this.cyberMaterial.uniforms.uTexture.value,i=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=i,this.cyberMaterial.needsUpdate=!0,t&&t.dispose()}else this.initCyber()}setMode(e){const t=this.mapMode(e);this.activeModes.clear(),this.activeModes.add(t),this.cameraPitch=0,this.cameraYaw=0,this.cameraRoll=0,this.updateCameraRotation(),typeof window.resetCameraControls=="function"&&window.resetCameraControls(),this.mode=t,this.updateVisibility(),this.updateLabel(t)}mapMode(e){return{cube:"box",flow:"particles",zen:"zengarden",rain:"rainforest",interstellar:"matrix",ocean:"waves"}[e]||e}toggleMode(e){const t=this.mapMode(e);t==="matrix"&&!this.activeModes.has("matrix")&&(this.matrixConfig.logicMode||(this.matrixConfig.logicMode="interstellar")),t==="cyber"&&!this.activeModes.has("cyber")&&(this.cyberConfig.logicMode||(this.cyberConfig.logicMode="matrix"));const i=this.activeModes.has("cyber");this.activeModes.has(t)?this.activeModes.delete(t):this.activeModes.add(t),this.active=this.activeModes.size>0,this.updateVisibility(),this.updateLabel(t),this.activeModes.forEach(s=>this.ensureInitialized(s)),this.initialized&&this.active&&!this._isRendering&&(ve.animationId&&(cancelAnimationFrame(ve.animationId),ve.animationId=null),this.render()),this.mode=t,this.updateVisibility(),this.activeModes.size===0&&!i&&(this.active=!1,this.renderer&&(this.renderer.autoClearColor=!0,this.renderer.clear(),this.renderer.render(this.scene,this.camera))),this.activeModes.size===1?this.updateLabel(Array.from(this.activeModes)[0]):this.activeModes.size>1?this.updateLabel("multi"):this.updateLabel("none"),window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}})),this.updateCyberStrings&&this.updateCyberStrings()}toggleGalaxySunStyle(){const e=this.galaxySunStyle==="sun"?"sun2":this.galaxySunStyle==="sun2"?"sun3":"sun";return this.setGalaxySunStyle(e),e}updateVisibility(){if(this.activeModes.forEach(e=>this.ensureInitialized(e)),this.sphereGroup&&(this.sphereGroup.visible=this.activeModes.has("sphere")),this.particleGroup&&(this.particleGroup.visible=this.activeModes.has("particles")),this.lightspeedGroup&&(this.lightspeedGroup.visible=this.activeModes.has("lightspeed")),this.wavesGroup&&(this.wavesGroup.visible=this.activeModes.has("waves")),this.oceanGroup&&(this.oceanGroup.visible=this.activeModes.has("ocean")),this.lavaGroup&&(this.lavaGroup.visible=this.activeModes.has("lava")),this.fireplaceGroup&&(this.fireplaceGroup.visible=this.activeModes.has("fireplace")),this.rainforestGroup&&(this.rainforestGroup.visible=this.activeModes.has("rainforest")),this.zenGardenGroup&&(this.zenGardenGroup.visible=this.activeModes.has("zengarden")),this.boxGroup&&(this.boxGroup.visible=this.activeModes.has("box")),this.dragonGroup&&(this.dragonGroup.visible=this.activeModes.has("dragon")),this.galaxyGroup&&(this.galaxyGroup.visible=this.activeModes.has("galaxy")),this.mandalaGroup&&(this.mandalaGroup.visible=this.activeModes.has("mandala")),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics")),this.tsunamiGroup&&(this.tsunamiGroup.visible=this.activeModes.has("tsunami")),this.snowflakeGroup){const e=this.cymaticMaterial&&Math.abs(this.cymaticMaterial.uniforms.uMedium.value-3)<.1;this.snowflakeGroup.visible=this.activeModes.has("snowflake")||this.activeModes.has("cymatics")&&e}this.cyberGroup&&(this.cyberGroup.visible=this.activeModes.has("matrix")),this.overlayCanvas&&(this.activeModes.has("cyber")?(this.overlayCanvas.classList.remove("hidden"),this.activeModes.has("matrix")?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1):this.activeModes.size>1?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:.7}})),this.wasAutoDimmed=!0):(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1),(!this.matrixCyberStreams||this.matrixCyberStreams.length===0)&&this.generateCyberStyle()):(this.overlayCanvas.classList.add("hidden"),this.wasAutoDimmed&&(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1))),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics"),this.cymaticsGroup.position.z=2),this.updateUIPanels()}updateUIPanels(){typeof window.updateConfigPanel=="function"&&window.updateConfigPanel(),this.renderer&&this.scene&&this.camera&&this.renderer.compile(this.scene,this.camera)}updateLabel(e){const t=document.getElementById("visualLabel");t&&(e==="sphere"?t.textContent="BIO-RESONANCE":e==="particles"?t.textContent="NEURAL FLOW":e==="lightspeed"?t.textContent="WARP":e==="waves"||e==="ocean"?t.textContent="OCEAN":e==="lava"?t.textContent="LAVA LAMP":e==="fireplace"?t.textContent="FIREPLACE":e==="rainforest"?t.textContent="RAINFOREST":e==="zengarden"?t.textContent="ZEN GARDEN":e==="cymatics"?t.textContent="CYMATICS":e==="cyber"?t.textContent="CYBER":e==="matrix"?t.textContent="MATRIX":e==="snowflake"?t.textContent="SNOWFALL":e==="multi"?t.textContent="MULTI-SENSORY":t.textContent="")}initWaves(){for(this.wavesGroup||(this.wavesGroup=new je,this.scene.add(this.wavesGroup));this.wavesGroup.children.length>0;){const t=this.wavesGroup.children[0];this.wavesGroup.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}const e=new Jt(80,80,160,160);this.wavesMaterial=new ft({uniforms:{uTime:{value:0},uLoopTime:{value:0},uColor:{value:this.customColor?new fe(this.customColor):new fe(26367)},uSecondaryColor:{value:new fe(62207)},uIntensity:{value:1},uNormBass:{value:0},uResolution:{value:new ae(window.innerWidth,window.innerHeight)}},vertexShader:`
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
            `,transparent:!0,wireframe:!1,side:Mt,extensions:{derivatives:!0}}),this.wavesMesh=new We(e,this.wavesMaterial),this.wavesMesh.rotation.x=-Math.PI/2.2,this.wavesMesh.position.y=-5,this.wavesMesh.position.z=-10,this.wavesGroup.add(this.wavesMesh)}setSpeed(e){this.speedMultiplier=e}setIntent(e){this.currentIntent=e,e==="delta"||e==="theta"?this.particles&&this.particles.material&&(this.particles.material.size=.3,this.particles.material.opacity=.5):e==="gamma"||e==="hyper-gamma"?(this.particles&&this.particles.material&&(this.particles.material.size=.08,this.particles.material.opacity=.9),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(16777215),this.cyberMaterial.uniforms.uTailLength.value=.4)):(this.particles&&this.particles.material&&(this.particles.material.size=.15,this.particles.material.opacity=.8),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(15794160),this.cyberMaterial.uniforms.uTailLength.value=1)),this.renderSingleFrame()}setColor(e,t=null){var i,s,a,r;this.customColors||(this.customColors={}),!t||t==="all"?(this.customColors={},this.customColor=new fe(e)):this.customColors[t]=new fe(e);try{const o=new fe(e),l={};o.getHSL(l);const c=new fe().setHSL(l.h,l.s,Math.max(.1,l.l*.5)),u=new fe().setHSL(l.h,l.s,Math.max(.02,l.l*.15)),h=new fe().setHSL(l.h,Math.min(1,l.s*.8),.9),d=f=>{f&&(f.color&&typeof f.color.set=="function"?f.color.set(e):f.uniforms&&f.uniforms.uColor&&f.uniforms.uColor.value.set(e),f.uniforms&&f.uniforms.uSecondaryColor&&f.uniforms.uSecondaryColor.value.copy(c),f.uniforms&&f.uniforms.uDeepColor&&f.uniforms.uDeepColor.value.copy(u),f.uniforms&&f.uniforms.uSunColor&&f.uniforms.uSunColor.value.copy(h))};this.particles&&this.particles.material&&d(this.particles.material),this.lightspeed&&this.lightspeed.material&&d(this.lightspeed.material),this.sphere&&this.sphere.material&&(d(this.sphere.material),this.core&&this.core.material&&d(this.core.material)),(t==="box"||!t||t==="all")&&(this.boxOuter&&this.boxOuter.children.forEach(f=>d(f.material)),this.boxInner&&this.boxInner.children.forEach(f=>d(f.material)),this.boxEdges&&this.boxEdges.material&&d(this.boxEdges.material)),t==="mandala"&&(this.mandalaRings&&this.mandalaRings.forEach(f=>d(f.material)),this.mandalaCenter&&this.mandalaCenter.material&&d(this.mandalaCenter.material)),this.wavesMesh&&this.wavesMesh.material&&d(this.wavesMesh.material),this.lavaBlobs&&this.lavaBlobs.forEach(f=>d(f.material)),this.lavaGlow&&this.lavaGlow.material&&d(this.lavaGlow.material),this.flames&&this.flames.material&&d(this.flames.material),this.raindrops&&this.raindrops.material&&d(this.raindrops.material),this.petals&&this.petals.material&&d(this.petals.material),this.zenWater&&this.zenWater.material&&d(this.zenWater.material),this.oceanWave&&this.oceanWave.material&&d(this.oceanWave.material),this.oceanFoam&&this.oceanFoam.material&&d(this.oceanFoam.material),this.cyberRain&&this.cyberRain.material&&this.cyberRain.material.uniforms&&this.cyberRain.material.uniforms.uColor&&this.cyberRain.material.uniforms.uColor.value.set(e),this.logoMesh&&this.originalLogoImg&&this.updateLogoTexture(),this.dragonGroup&&this.updateDragonColor&&this.updateDragonColor(new fe(e)),(this.galaxyStars||this.galaxySunMesh)&&this.updateGalaxyColor(new fe(e)),this.cymaticMaterial&&((i=this.cymaticMaterial.uniforms)!=null&&i.uColor)&&this.cymaticMaterial.uniforms.uColor.value.set(e),(t==="snowflake"||!t||t==="all")&&typeof this.setSnowColor=="function"&&this.setSnowColor(e),(r=(a=(s=this._snowData)==null?void 0:s.material)==null?void 0:a.uniforms)!=null&&r.uColor&&this._snowData.material.uniforms.uColor.value.set(e)}catch{}this.renderSingleFrame()}renderSingleFrame(){!this.renderer||!this.scene||!this.camera||(this.renderer.clear(),this.renderer.render(this.scene,this.camera))}createCircleTexture(){if(this.textures.circle)return this.textures.circle;const e=32,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d");return i.beginPath(),i.arc(e/2,e/2,e/2,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),this.textures.circle=new Vn(t),this.textures.circle}render(e,t){var i,s,a,r,o,l,c,u;if(!this.initialized||!this.renderer||document.hidden||!this.active){this._isRendering=!1;return}if(!(this._isRendering&&typeof e=="number")){this._isRendering=!0;try{(typeof e=="number"||!e&&(ve.masterAnalyser||ve.analyserLeft))&&(e=ve.masterAnalyser||ve.analyserLeft,t=ve.analyserRight);let h=0,d=0,f=0;if(e){const I=e.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==I)&&(this._freqDataArray=new Uint8Array(I)),e.getByteFrequencyData(this._freqDataArray);const U=typeof this.audioSensitivity=="number"?this.audioSensitivity:1;let F=0;for(let j=0;j<15;j++)F+=this._freqDataArray[j];h=Math.pow(F/15/255,.8)*U;let V=0;for(let j=10;j<100;j++)V+=this._freqDataArray[j];d=V/90/255*U;let Y=0;for(let j=100;j<300;j++)Y+=this._freqDataArray[j];f=Y/200/255*U}const v=Math.max(.001,this.speedMultiplier||1),x=performance.now()*.001;if(this.activeModes.has("cymatics")&&this.cymaticsCore){const I=window.visualsBeatSync!==!1&&window.cymaticsAudioSync!==!1?{bass:h||0,mids:d||0,highs:f||0}:{bass:0,mids:0,highs:0},U=window.cymaticsMouseSync!==!1?{x:this.mouseX||0,y:this.mouseY||0}:null;this.cymaticsCore.update(x*v,I,U)}this.lastTime||(this.lastTime=x);const m=Math.min(.1,x-this.lastTime);this.lastTime=x;const p=ve.visualSpeedAuto?ve.beatFrequency||10:v*10,_=Math.sin(x*Math.PI*2*p)*.5+.5,g=window.visualsBeatSync!==!1,S=this.vibrationEnabled&&g?1:0,A=(_||0)*S,T=(h||0)*S,E=(d||0)*S,N=(f||0)*S,y=S*(.02+T*.15+A*.08),w=Math.sin(x*47.3)*Math.cos(x*31.7)*y,O=Math.cos(x*53.1)*Math.sin(x*29.3)*y,X=Math.sin(x*37.9)*Math.cos(x*43.1)*y,te=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup,this.tsunamiGroup];for(const I of te)I&&I.position.set(w,O,X);if(this.activeModes.has("galaxy")&&this.galaxyGroup){const I=this.sunRotationSpeedY||.002,U=this.sunRotationSpeedZ||5e-4;if(this.galaxyStars&&(this.galaxyStars.rotation.y+=I*v*.5,this.galaxyStars.rotation.z+=U*v*.5),this.galaxySunMesh){this.galaxySunMesh.rotation.z-=U*v*1.5,this.galaxySunMesh.rotation.y+=I*v*2;const F=1+T*.15*(this.galaxySunStyle==="sun3"?2.5:1);this.galaxySunMesh.scale.setScalar(F)}this.galaxySunUniforms&&(this.galaxySunUniforms.uTime.value=x*v,this.galaxySunUniforms.uBassIntt.value=T)}if(this.activeModes.has("sphere")&&this.sphere&&(this.sphere.scale.setScalar(1+T*.15),this.sphere.rotation.y+=.005*v),this.activeModes.has("particles")&&this.particleMaterial){const I=((s=(i=window.MindWaveState)==null?void 0:i.envIntensities)==null?void 0:s.flow)??1,U=(.015*v+T*.08+A*.05)*I;this.particleMaterial.uniforms.uTime.value=x,this.particleMaterial.uniforms.uSpeed.value=U*10,this.particleGroup.rotation.z+=(.001*v+T*.005)*I}if(this.activeModes.has("lightspeed")&&this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uTime.value=x,this.lightspeedMaterial.uniforms.uSpeed.value=v),this.activeModes.has("matrix")&&this.cyberMaterial&&(this.cyberMaterial.uniforms.uTime.value=x*v),this.activeModes.has("waves")&&this.wavesMaterial){const I=((r=(a=window.MindWaveState)==null?void 0:a.envIntensities)==null?void 0:r.ocean)??1;this.wavesMaterial.uniforms.uTime.value=x*v*.5,this.wavesMaterial.uniforms.uNormBass.value=T*I,this.wavesMaterial.uniforms.uIntensity&&(this.wavesMaterial.uniforms.uIntensity.value=I)}if(this.activeModes.has("ocean")&&this.oceanWave&&this.oceanWave.material.uniforms){const I=((l=(o=window.MindWaveState)==null?void 0:o.envIntensities)==null?void 0:l.ocean)??1;this.oceanWave.material.uniforms.uTime.value=x*v,this.oceanWave.material.uniforms.uNormBass.value=T*I,this.oceanWave.material.uniforms.uBeatPulse.value=A*I,this.oceanFoam&&(this.oceanFoam.material.opacity=(.4+T*.3+A*.2)*(this.brightnessMultiplier||1)*I)}if(this.activeModes.has("box")&&this.boxOuter&&(this.boxOuter.rotation.x+=.008*v+T*.02,this.boxOuter.rotation.y+=.012*v,this.boxInner&&(this.boxInner.rotation.x-=.015*v,this.boxInner.rotation.y-=.01*v,this.boxInner.scale.setScalar(.95+T*.2)),this.boxOuter.scale.setScalar(1+T*.2),this.boxEdges&&this.boxEdges.rotation.copy(this.boxOuter.rotation)),this.activeModes.has("dragon")&&this.dragonBodyInstanced&&this.dragonDummy){this.dragonGroup.rotation.y+=.005*v;const I=x*v*2,U=1+T*.2;for(let F=0;F<this.dragonLength;F++){const V=I-F*.12,Y=Math.sin(V)*8,j=Math.cos(V*1.5)*4+Math.sin(V*.5)*3,q=Math.cos(V*.8)*8;this.dragonDummy.position.set(Y,j,q);const K=V+.1,ie=Math.sin(K)*8,he=Math.cos(K*1.5)*4+Math.sin(K*.5)*3,me=Math.cos(K*.8)*8;this.dragonDummy.lookAt(ie,he,me);const Ae=1-F/this.dragonLength*.8,Pe=1+Math.sin(V*4)*.15*(.5+T);this.dragonDummy.scale.setScalar(Ae*Pe*U),this.dragonDummy.updateMatrix(),this.dragonBodyInstanced.setMatrixAt(F,this.dragonDummy.matrix),this.dragonGlowInstanced&&this.dragonGlowInstanced.setMatrixAt(F,this.dragonDummy.matrix),F===0&&this.dragonHead&&(this.dragonHead.position.copy(this.dragonDummy.position),this.dragonHead.quaternion.copy(this.dragonDummy.quaternion),this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4))}if(this.dragonBodyInstanced.instanceMatrix.needsUpdate=!0,this.dragonGlowInstanced&&(this.dragonGlowInstanced.instanceMatrix.needsUpdate=!0),this.dragonPearlGroup){const F=I+.5;this.dragonPearlGroup.position.set(Math.sin(F)*9,Math.cos(F*1.5)*5+Math.sin(F*.5)*4,Math.cos(F*.8)*9),this.dragonPearlGroup.rotation.x+=.08*v,this.dragonPearlGroup.rotation.y+=.12*v}}if(this.activeModes.has("mandala")&&this.mandalaRings&&(this.mandalaRings.forEach((I,U)=>{I.userData&&I.userData.speed&&(I.rotation.z+=I.userData.speed*v+T*.005);const F=1+A*.1*(U+1)*.3;I.scale.setScalar(F)}),this.mandalaCenter&&(this.mandalaCenter.rotation.z-=.01*v,this.mandalaCenter.scale.setScalar(1+T*.3))),this.activeModes.has("tsunami")&&this.tsunamiMaterial){const I=v*.5*(1+A*.2),U=this.tsunamiMaterial.uniforms.uLoopActive.value,F=this.tsunamiMaterial.uniforms.uAmplitude.value;if(this.tsunamiMaterial.uniforms.uTime.value+=m*I,this.tsunamiAnimState&&this.tsunamiAnimState.active){this.tsunamiAnimState.phase+=m,this.tsunamiAnimState.phase>10&&(this.tsunamiAnimState.phase=0);let Y=this.tsunamiAnimState.phase,j=this.tsunamiAnimState.startAmp,q=this.tsunamiAnimState.startCurl,K=0;if(Y<2){let ie=Y/2;K=-300+300*(1-Math.pow(1-ie,3))}else if(Y<4){K=0;let ie=(Y-2)/2,he=1-Math.pow(1-ie,3);q=this.tsunamiAnimState.startCurl+(4-this.tsunamiAnimState.startCurl)*he}else if(Y<9)K=0,q=4;else{K=0,q=4;let ie=(Y-9)/1,he=ie*ie;j=this.tsunamiAnimState.startAmp*(1-he)}if(this.tsunamiMaterial.uniforms.uAmplitude.value=j,this.tsunamiMaterial.uniforms.uCurl.value=q,this.tsunamiMaterial.uniforms.uWaveOffset&&(this.tsunamiMaterial.uniforms.uWaveOffset.value=K),typeof window<"u"&&window.document){const ie=document.getElementById("tsunamiCurlSlider"),he=document.getElementById("tsunamiCurlVal");ie&&he&&(ie.value=q,he.textContent=q.toFixed(1))}}else this.tsunamiMaterial.uniforms.uWaveOffset&&(this.tsunamiMaterial.uniforms.uWaveOffset.value=0);const V=this.tsunamiMaterial.uniforms.uTime.value;if(this.customColor?(this.tsunamiMaterial.uniforms.uColor.value.copy(this.customColor),this.tsunamiMaterial.uniforms.uHasCustomColor.value=1,this.tsunamiSun&&this.tsunamiSun.material&&this.tsunamiSun.material.color.copy(this.customColor)):this.rainbowMode&&this.currentColorHsl?(this.tsunamiMaterial.uniforms.uColor.value.setHSL(this.currentColorHsl.h,this.currentColorHsl.s,this.currentColorHsl.l),this.tsunamiMaterial.uniforms.uHasCustomColor.value=1,this.tsunamiSun&&this.tsunamiSun.material&&this.tsunamiSun.material.color.setHSL(this.currentColorHsl.h,this.currentColorHsl.s,this.currentColorHsl.l)):(this.tsunamiMaterial.uniforms.uHasCustomColor.value=0,this.tsunamiSun&&this.tsunamiSun.material&&this.tsunamiSun.material.color.setHex(16763904)),this.tsunamiGroup&&this.tsunamiGroup.children.length>0){const Y=this.tsunamiGroup.children[0],j=this.tsunamiMaterial.uniforms.uTime.value,K=-30-(this.tsunamiMaterial.uniforms.uAmplitude.value-1)*15,ie=-20;if(U>.5){const he=Math.min(j/12,1),me=1-Math.pow(1-he,3);Y.position.x=-110+(110+K)*me,Y.position.y=ie+Math.sin(j*3)*1.5}else Y.position.x=K,Y.position.y=ie+Math.sin(j*3)*1.5}}if(this.dimmerPlane){const I=ve&&ve.screenDimmer!==void 0?ve.screenDimmer:0;this.dimmerPlane.material.opacity=I}if(this.logoMesh){const I=ve.lotusState||"auto";let U=_;if(I==="heartbeat")if(ve.lotusHeartbeatSync)U=Math.min(1,_*.7+T*.8);else{const V=(ve.lotusHeartbeatBpm||11)/60;U=Math.sin(x*Math.PI*2*V)*.5+.5}let F=.8;I==="faded"?F=.15:I==="full"?F=1:I==="heartbeat"?F=.2+.8*U:I==="manual"?F=ve.lotusOpacity!==void 0?ve.lotusOpacity:.8:F=.4+T*.6,this._lotusCurrentOpacity===void 0&&(this._lotusCurrentOpacity=.8),this._lotusCurrentOpacity+=(F-this._lotusCurrentOpacity)*.1,this.logoMesh.material.opacity=this._lotusCurrentOpacity,I==="heartbeat"?this.logoMesh.scale.setScalar(1+U*.15):this.logoMesh.scale.setScalar(1+T*.05+A*.02)}if(this.activeModes.has("lava")&&this.lavaBlobs&&this.lavaUniforms){const I=((u=(c=window.MindWaveState)==null?void 0:c.envIntensities)==null?void 0:u.lava)??1;this.lavaUniforms.uTime.value=x*v,this.lavaUniforms.uIntensity.value=T*I,this.lavaBlobs.forEach((U,F)=>{const V=U.userData,Y=v*(1+T*.8);if(V.state==="heating"?(V.temperature+=V.heatRate*m*Y,V.temperature>=1&&(V.temperature=1,V.state="rising")):V.state==="rising"?(U.position.y+=V.riseSpeed*Y,U.position.y>=V.floatMax&&(V.state="cooling")):V.state==="cooling"?(V.temperature-=V.coolRate*m*Y,V.temperature<=0&&(V.temperature=0,V.state="falling")):V.state==="falling"&&(U.position.y-=V.fallSpeed*Y,U.position.y<=V.floatMin&&(V.state="heating")),U.position.x+=Math.sin(x*V.driftSpeed+V.driftPhase)*.02*Y,this.lavaUniforms.uBlobs.value[F]){const j=V.baseSize*(.8+.5*V.temperature);this.lavaUniforms.uBlobs.value[F].set(U.position.x,U.position.y,U.position.z,j)}})}if(this.snowflakeGroup&&this.snowflakeGroup.visible&&this._snowData){const I=this._snowData,U=I.points.geometry.attributes.position.array,F=v*2;for(let V=0;V<I.count;V++){const Y=V*3;U[Y+1]-=I.speeds[V]*F;let j=Math.sin(x*I.driftFreqs[V]+I.phases[V])*I.drifts[V]*F*(this.snowDriftMultiplier!==void 0?this.snowDriftMultiplier:1);U[Y]+=j,U[Y+1]<-22&&(U[Y+1]=22),U[Y]>35&&(U[Y]=-35),U[Y]<-35&&(U[Y]=35)}if(I.points.geometry.attributes.position.needsUpdate=!0,I.spinMeshes){const V=1+(T||0)*.15;I.spinMeshes.forEach((Y,j)=>{Y.rotation.z+=I.spinSpeeds[j]*F,Y.position.y-=I.spinSpeeds[j]*.1*F,Y.scale.setScalar(V),Y.position.y<-25&&(Y.position.y=25)})}I.material&&I.material.uniforms&&I.material.uniforms.uIntensity&&(I.material.uniforms.uIntensity.value=.2+T*.8)}if(this.activeModes.has("rainforest")&&this.rainMaterial){const I=v*.8*(1+A*.3);this.rainMaterial.uniforms.uTime.value=x,this.rainMaterial.uniforms.uSpeed.value=I,this.rainMaterial.uniforms.uIntensity.value=(.5+T*.2+A*.2)*(this.brightnessMultiplier||1)}if(this.activeModes.has("zengarden")&&this.petalMaterial){const I=v*.3*(1+A*.5);this.petalMaterial.uniforms.uTime.value=x,this.petalMaterial.uniforms.uSpeed.value=I,this.zenWater&&(this.zenWater.material.opacity=(.3+A*.2)*(this.brightnessMultiplier||1))}if(this.activeModes.has("fireplace")&&this.fireMesh&&this.fireMesh.material&&this.fireMesh.material.uniforms){const I=.8+.2*Math.sin(x*15)*Math.sin(x*7),U=this.fireMesh.material.uniforms;U.uTime&&(U.uTime.value=x*1.5*v),U.uIntensity&&(U.uIntensity.value=I+T*.5),this.fireLight&&(this.fireLight.intensity=(2+T*5)*I)}const P=performance.now(),z=P-(this._lastFrameStartTime||P);if(this._lastFrameStartTime=P,this._fpsRingBuffer&&(this._fpsRingBuffer[this._fpsRingIndex]=z,this._fpsRingIndex=(this._fpsRingIndex+1)%60,this._fpsRingCount=Math.min(60,this._fpsRingCount+1),this._fpsRingCount===60)){let I=0;for(let F=0;F<60;F++)I+=this._fpsRingBuffer[F];I/=60;const U=1e3/I;this._appStartTime||(this._appStartTime=performance.now()),U<35&&P-(this._lastLodDegradation||0)>3e3&&P-this._appStartTime>8e3&&(this.degradeLOD(),this._lastLodDegradation=P,this._fpsRingCount=0)}const Z=1e3/(this.targetFPS||60);if(P-this.lastFrameRenderTime>=Z){this.renderer.autoClear=!this.activeModes.has("lightspeed"),this.renderer.autoClear&&this.renderer.clear();const I=(T+(d||0)*S+N)/3,U=P-this.lastFrameRenderTime;this.particleSwarm&&this.activeModes.has("cymatics")&&this.particleSwarm.update(Math.min(U*.001,.1),I),this.postProcessor&&this.currentLodLevel!=="low"?this.postProcessor.render(this.scene,this.camera,Math.min(U*.001,.1),I):this.renderer.render(this.scene,this.camera),this.activeModes.has("cyber")&&this.renderCyberCyber(),this.lastFrameRenderTime=P}}catch(h){h.name==="TypeError"&&h.message.includes("uniforms")}finally{this._isRendering=!1}this.active&&!document.hidden?ve.animationId=requestAnimationFrame(()=>this.render(ve.masterAnalyser||ve.analyserLeft,ve.analyserRight)):ve.animationId=null}}setCyberColor(e){this.cyberConfig.color=e,this.cyberConfig.rainbow=!1,this.cyberColorCustomized=!0,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.matrixConfig.rainbow=!1,this.cyberMaterial&&this.cyberMaterial.uniforms.uColor&&(this.cyberMaterial.uniforms.uColor.value.set(e),this._tempColor.set(e),this._tempColor.r+=(1-this._tempColor.r)*.8,this._tempColor.g+=(1-this._tempColor.g)*.8,this._tempColor.b+=(1-this._tempColor.b)*.8,this.cyberMaterial.uniforms.uHeadColor&&this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor),this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=0)),this.cyberColor=e,this.cyberRainbowMode=!1,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}getAverageFrequency(e,t){let i=ve.masterAnalyser||ve.analyserLeft||ve.analyserRight;if(!i)return 0;const s=i.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==s)&&(this._freqDataArray=new Uint8Array(s));const a=this._freqDataArray;i.getByteFrequencyData(a),e===void 0&&(e=0),t===void 0&&(t=a.length);let r=0,o=0;for(let l=e;l<t&&l<a.length;l++)r+=a[l],o++;return o>0?r/o:0}setMouseInfluence(e){this.mouseInfluence=e}setGlobalSpeed(e){this.speedMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=1+(e-1)*.5)}setGlobalBrightness(e){this.brightnessMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e),this.particleMaterial&&this.particleMaterial.uniforms&&this.particleMaterial.uniforms.uIntensity&&(this.particleMaterial.uniforms.uIntensity.value=e),this.petalMaterial&&this.petalMaterial.uniforms&&this.petalMaterial.uniforms.uIntensity&&(this.petalMaterial.uniforms.uIntensity.value=e*.8)}setCyberBrightness(e){this.cyberConfig.brightness=e}setMatrixBrightness(e){this.matrixConfig.brightness=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberSpeed(e){this.cyberConfig.speed=e}setCyberLength(e){this.cyberConfig.length=e}setMatrixSpeed(e){this.matrixConfig.speed=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=e)}setMatrixLength(e){this.matrixConfig.length=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uTailLength.value=e)}setCyberRainbow(e){if(this.cyberConfig.rainbow=e,this.cyberRainbowMode=e,!e){const t=this.cyberConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(i=>{i.color=t})}}setMatrixRainbow(e){if(this.matrixConfig.rainbow=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=e?1:0),this.cyberRainbowMode=e,!e){const t=this.matrixConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(i=>{i.color=t})}}setCymaticsRainbow(e){this.cymaticsCore&&this.cymaticsCore.setRainbow(e)}setCameraRotation(e,t,i){this.cameraPitch=e*Math.PI/180,this.cameraYaw=t*Math.PI/180,this.cameraRoll=i*Math.PI/180,this.updateCameraRotation()}updateCameraRotation(){this.scene&&this.scene.rotation.set(this.cameraPitch,this.cameraYaw,this.cameraRoll)}setAudioSensitivity(e){this.audioSensitivity=e}setGeoComplexity(e){this.geoComplexity=e}setBatterySaver(e){this.batterySaver=e,this.targetFPS=e?30:60;const t=e?1:2;this.renderer&&(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t)),this.resize())}degradeLOD(){this.renderer&&(this.currentLodLevel==="high"?(this.renderer.setPixelRatio(1),this.currentLodLevel="medium",this.resize()):this.currentLodLevel==="medium"&&(this.renderer.setPixelRatio(.75),this.currentLodLevel="low",this.resize()))}updateCyberStrings(){if(!this.matrixCyberStreams)return;let e=!1,t="MINDWAVE🪷";const i=this.cyberConfig;i.logicMode==="custom"||i.logicMode==="txt"?(e=!0,t="🪷"+(i.customText||"WELCOME TO MINDWAVE")):(i.logicMode==="mindwave"||i.logicMode==="mw")&&(e=!0,t="MINDWAVE🪷");const s="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",a="0123456789·:.-+x[]<>/\\∆ΣΩ∞",r=100;this.matrixCyberStreams.forEach(o=>{if(o.chars=[],o.isTextMode=e,e&&t.length>0){const l=[...t].reverse();for(let c=0;c<r;c++)o.chars.push(l[c%l.length])}else if(i.logicMode==="matrix"||i.logicMode==="interstellar"||i.logicMode==="int")for(let l=0;l<r;l++)o.chars.push(a.charAt(Math.floor(Math.random()*a.length)));else for(let l=0;l<r;l++)o.chars.push(s.charAt(Math.floor(Math.random()*s.length)))})}setCyberLogicMode(e,t){this.cyberConfig.logicMode=e,t!==void 0&&(this.cyberConfig.customText=t),this.updateCyberStrings()}setMatrixLogicMode(e,t){if(this.matrixConfig.logicMode=e,t!==void 0&&(this.matrixConfig.customText=t),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTexture){const i=this.cyberMaterial.uniforms.uTexture.value,s=this.createCyberTexture(this.matrixConfig);this.cyberMaterial.uniforms.uTexture.value=s,this.cyberMaterial.needsUpdate=!0,i&&i.dispose()}this.initCyber()}setCyberColor(e){this.cyberConfig.color=e,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setCyberAngle(e){this.cyberConfig.angle=e}setMatrixAngle(e){this.matrixConfig.angle=e,this.currentCyberAngle=e,this.cyberRotationGroup&&(this.cyberRotationGroup.rotation.z=uo.degToRad(-e))}setVibrationEnabled(e){this.vibrationEnabled=e}updateLogoTexture(){if(!this.originalLogoImg)return;const e=512;this._logoRenderCanvas||(this._logoRenderCanvas=document.createElement("canvas"),this._logoRenderCanvas.width=e,this._logoRenderCanvas.height=e);const t=this._logoRenderCanvas,i=t.getContext("2d",{willReadFrequently:!0});i.clearRect(0,0,e,e),i.drawImage(this.originalLogoImg,0,0,e,e);const s=i.getImageData(0,0,t.width,t.height),a=s.data,r=document.body.dataset.theme||"default",o=Rr[r]||Rr.default,l=o.secondary||o.accent||"#ffffff",c=this.customColors&&this.customColors.mandala?this.customColors.mandala:this.customColor,u=c?c.getHex():parseInt(o.accent.replace("#",""),16),h=parseInt(l.replace("#",""),16),d=u>>16&255,f=u>>8&255,v=u&255,x=h>>16&255,m=h>>8&255,p=h&255;this.themeType=document.body.dataset.themeType||"dark",this.themeType;for(let g=0;g<a.length;g+=4){const S=a[g],A=a[g+1],T=a[g+2],E=a[g+3];if(E<60){a[g+3]=0;continue}else a[g+3]=(E-60)*1.307;S>200&&A>200&&T>200?(a[g]=d,a[g+1]=f,a[g+2]=v):(a[g]=x,a[g+1]=m,a[g+2]=p)}i.putImageData(s,0,0);const _=new Vn(t);if(_.minFilter=Jc,_.magFilter=St,_.generateMipmaps=!0,_.wrapS=Ht,_.wrapT=Ht,this.renderer&&(_.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),this.logoMesh){const g=this.logoMesh.material.map;this.logoMesh.material.map=_,this.logoMesh.material.needsUpdate=!0,g&&g.dispose()}else{const g=new Ze,S=5.625,A=4.78,T=new Float32Array([-S/2,-A/2,0,S*1.5,-A/2,0,-S/2,A*1.5,0]),E=new Float32Array([0,0,2,0,0,2]);g.setAttribute("position",new st(T,3)),g.setAttribute("uv",new st(E,2));const N=new At({map:_,transparent:!0,opacity:.8,color:16777215,depthTest:!1,depthWrite:!1});if(this.logoMesh=new We(g,N),this.logoMesh.position.set(0,0,-10),this.logoMesh.renderOrder=999,this.scene.add(this.logoMesh),this.camera&&!this.dimmerPlane){const y=new Ze,w=2e3,O=2e3,X=new Float32Array([-w/2,-O/2,0,w*1.5,-O/2,0,-w/2,O*1.5,0]);y.setAttribute("position",new st(X,3)),this.dimmerPlane=new We(y,new At({color:0,transparent:!0,opacity:0,depthTest:!1})),this.dimmerPlane.renderOrder=998,this.dimmerPlane.position.z=-5,this.camera.add(this.dimmerPlane),this.scene.add(this.camera)}}}initOverlayLogo(){if(this.logoMesh)return;const e=new Image;e.crossOrigin="anonymous",e.src="./mindwave-logo-icon.png",e.onload=()=>{this.originalLogoImg=e,this.updateLogoTexture(),this.targetLogoOpacity!==void 0?this.setLogoOpacity(this.targetLogoOpacity):this.setLogoOpacity(.8)},e.onerror=t=>{}}setLogoOpacity(e){this.targetLogoOpacity=e,this.logoMesh&&this.logoMesh.material?this.logoMesh.material.opacity=e*this.brightnessMultiplier:!this.logoMesh&&e>0&&this.initOverlayLogo()}applyCymaticClassAndVariation(e,t){this.cymaticsCore&&(this.cymaticsCore.setPattern(e,t),this.activeModes.has("cymatics")||this.toggleMode("cymatics"))}setCymaticColor(e,t,i){if(this.cymaticsCore){if(i!==void 0)this.cymaticsCore.setColor(e,t,i);else if(e!==void 0){const s=e,a=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(a,1,s)}}}setCymaticColor2(e){if(!this.cymaticsCore)return;const t=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(t,2,new fe(e))}setCymaticColor3(e){if(!this.cymaticsCore)return;const t=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(t,3,new fe(e))}setCymaticParam(e,t,i){this.cymaticsCore&&this.cymaticsCore.setParam(e,t,i)}dispose(){this.active=!1,ve.animationId&&(cancelAnimationFrame(ve.animationId),ve.animationId=null),window.removeEventListener("resize",this.resize),window.removeEventListener("resize",this.resizeOverlayCanvas),window.removeEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode&&window.removeEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange&&document.removeEventListener("visibilitychange",this._boundVisibilityChange),this._boundThemeChange&&window.removeEventListener("themeChanged",this._boundThemeChange),this.canvas&&(this._boundContextLost&&this.canvas.removeEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored&&this.canvas.removeEventListener("webglcontextrestored",this._boundContextRestored)),this._boundCymaticPointer&&(window.removeEventListener("mousemove",this._boundCymaticPointer),window.removeEventListener("touchmove",this._boundCymaticPointer),this._boundCymaticPointer=null);const e=i=>{if(i)for(;i.children.length>0;){const s=i.children[0];if(i.remove(s),s.geometry&&s.geometry.dispose(),s.material){if(s.material.map&&s.material.map.dispose(),s.material.uniforms)for(const a in s.material.uniforms){const r=s.material.uniforms[a];r&&r.value&&r.value.dispose&&r.value.dispose()}s.material.dispose()}s.children&&s.children.length&&s.traverse(a=>{a.geometry&&a.geometry.dispose(),a.material&&(a.material.map&&a.material.map.dispose(),a.material.dispose())})}},t=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];this._fpsRingBuffer=null,this._tempColor=null,this._logoRenderCanvas=null,t.forEach(e),this.cyberMaterial&&(this.cyberMaterial.dispose(),this.cyberMaterial=null),this.fireMaterial&&(this.fireMaterial.dispose(),this.fireMaterial=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.lightspeedMaterial&&(this.lightspeedMaterial.dispose(),this.lightspeedMaterial=null),this.rainMaterial&&(this.rainMaterial.dispose(),this.rainMaterial=null),this.petalMaterial&&(this.petalMaterial.dispose(),this.petalMaterial=null),this.logoMesh&&(this.logoMesh.material&&(this.logoMesh.material.map&&this.logoMesh.material.map.dispose(),this.logoMesh.material.dispose()),this.logoMesh.geometry&&this.logoMesh.geometry.dispose(),this.scene&&this.scene.remove(this.logoMesh),this.logoMesh=null);for(const i in this.textures)this.textures[i]&&this.textures[i].dispose&&this.textures[i].dispose();if(this.textures={},this._freqDataArray=null,this.renderer){try{this.renderer.forceContextLoss()}catch{}this.renderer.dispose(),this.renderer=null}this.scene=null,this.camera=null}setWarpSpeed(e){this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uSpeed.value=e)}setWarpFov(e){this.camera&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setWarpChromatic(e){this.lightspeedMaterial}}Ar(lc,"CYMATIC_PATTERNS",[{classId:22,variationId:0,name:"Heartbeat",style:"fractal"},{classId:22,variationId:1,name:"Quantum Flower",style:"sacred"},{classId:22,variationId:2,name:"Sacred Sun Resonance",style:"complex"},{classId:22,variationId:3,name:"Ethereal Nexus",style:"geometry"},{classId:22,variationId:4,name:"Golden Ratio Spiral",style:"fractal"},{classId:22,variationId:5,name:"Obsidian Bloom",style:"sacred"},{classId:22,variationId:6,name:"Prismatic Core",style:"complex"},{classId:22,variationId:7,name:"Void Resonance",style:"geometry"},{classId:22,variationId:8,name:"Nebula Plasma",style:"fractal"},{classId:22,variationId:9,name:"Sacred Gold Obsidian",style:"sacred"},{classId:22,variationId:10,name:"Biolum Abyssal",style:"complex"},{classId:22,variationId:11,name:"Emerald Cyber Matrix",style:"geometry"},{classId:22,variationId:12,name:"Liquid Mercury Crimson",style:"fractal"},{classId:22,variationId:13,name:"Quantum Crystal Lattice",style:"sacred"},{classId:22,variationId:14,name:"Solar Flare Harmonics",style:"complex"},{classId:22,variationId:15,name:"Amethyst Hyperdimensional",style:"geometry"},{classId:22,variationId:16,name:"Neon Labyrinth",style:"fractal"},{classId:22,variationId:17,name:"Celestial Mandala",style:"sacred"},{classId:22,variationId:18,name:"Astral Lotus",style:"complex"},{classId:22,variationId:19,name:"Lunar Tides",style:"geometry"},{classId:22,variationId:20,name:"Cybernetic Lotus",style:"fractal"},{classId:22,variationId:21,name:"Bioluminescent Shroom",style:"sacred"},{classId:22,variationId:22,name:"Vortex of Time",style:"complex"},{classId:22,variationId:23,name:"Diamond Lattice",style:"geometry"},{classId:22,variationId:24,name:"Seraphim Wings",style:"fractal"},{classId:22,variationId:25,name:"Fractal Heart",style:"sacred"},{classId:22,variationId:26,name:"Particle Swarm",style:"complex"},{classId:22,variationId:27,name:"Fluid SDF",style:"geometry"},{classId:22,variationId:28,name:"Quantum Topology",style:"fractal"},{classId:22,variationId:29,name:"Ai Cymatic 15",style:"sacred"}]);function B0(){return ce?Promise.resolve(ce):new Promise(n=>{L0(),setTimeout(()=>n(ce),10)})}function L0(){if(!ce&&Qt.canvas&&Qt.canvas.activeVisualizer&&Qt.canvas.activeVisualizer.isVisualizer3D&&(ce=Qt.canvas.activeVisualizer),Qt.canvas&&Qt.canvas.activeVisualizer){if(ce&&Qt.canvas.activeVisualizer===ce)return ce;Qt.canvas.activeVisualizer.dispose(),Qt.canvas.activeVisualizer=null,ce=null}ve.animationId&&(cancelAnimationFrame(ve.animationId),ve.animationId=null);const n=Qt.canvas||document.getElementById("visualizer");if(!ce&&n){const e=n&&n.activeVisualizer&&n.activeVisualizer.isVisualizer3D?{activeModes:n.activeVisualizer.activeModes,mode:n.activeVisualizer.mode,mindWaveMode:n.activeVisualizer.mindWaveMode,cyberLogicMode:n.activeVisualizer.cyberLogicMode,cyberCustomText:n.activeVisualizer.cyberCustomText,currentCyberAngle:n.activeVisualizer.currentCyberAngle,cyberSpeedMultiplier:n.activeVisualizer.cyberSpeedMultiplier,rainbowEnabled:n.activeVisualizer._rainbowEnabled}:{};ce=new lc(n,e),n.activeVisualizer=ce,setTimeout(()=>{ce&&(ce.updateVisibility(),I0())},0)}return ce}function G0(){return ce}let Mr=!1;function V0(){Mr=!0,ce&&ve.animationId&&(cancelAnimationFrame(ve.animationId),ve.animationId=null,ce.renderer&&ce.scene&&ce.camera&&ce.renderer.render(ce.scene,ce.camera))}function I0(){ce&&!ve.animationId&&(ce.active=!0,ce.render(ve.masterAnalyser||ve.analyserLeft,ve.analyserRight),Mr=!1)}function H0(){return Mr}function k0(n){ce&&ce.toggleMode(n)}function W0(n){ce&&(ce.setGlobalSpeed(n),ce.setCyberSpeed&&ce.setCyberSpeed(n))}function q0(n,e=null){ce&&(ce.setVisualColor(n,e),ce.setCyberColor&&(!e||e=="cyber")&&ce.setCyberColor(n))}function X0(n){ce&&ce.setGlobalBrightness&&ce.setGlobalBrightness(n)}function Y0(n){ce&&ce.setLogoOpacity(n)}function Z0(n){ce&&ce.setMouseInfluence(n)}window.toggleGalaxySun=function(){return ce?ce.toggleGalaxySunStyle():null};window.setCymaticPattern=function(n,e){n===0&&(n=22,e=8),ce&&ce.cymaticsCore?(ce.cymaticsCore.setPattern(n,e),ce.activeModes.has("cymatics")||(window.switchRightTab&&window.switchRightTab("cymatics",document.querySelector('.tab-pill[title="Cymatics"]')),ce.activeModes.add("cymatics"),ce.cymaticsGroup.visible=!0)):(window.setVisualMode&&window.setVisualMode("cymatics"),setTimeout(()=>{ce&&ce.cymaticsCore&&ce.cymaticsCore.setPattern(n,e)},500))};window.setCymaticColor=function(n,e,t){ce&&ce.cymaticsCore&&ce.cymaticsCore.setColor(n,e,t)};window.setCymaticParam=function(n,e,t){ce&&ce.cymaticsCore&&ce.cymaticsCore.setParam(n,e,t)};window.setConstellationLayer2Type=function(n){ce&&ce.cymaticsCore&&ce.cymaticsCore.setConstellationLayer2Type(n)};let qa=null,ei=null,jt=null,Ft=null,ar=!0;window.toggleQuantumHum=function(n){if(ar=n,Ft&&ei){const e=ei.currentTime;if(Ft.gain.cancelScheduledValues(e),Ft.gain.setValueAtTime(Ft.gain.value,e),!n)Ft.gain.linearRampToValueAtTime(0,e+.5);else{const i=(document.getElementById("observerToggle")?document.getElementById("observerToggle").checked:!1)?.3:.15;Ft.gain.linearRampToValueAtTime(i,e+.5)}}};window.toggleObserverEffect=function(n){if(!ce||!ce.cymaticsCore)return;ce.cymaticsCore.activeClassId!==25&&window.setCymaticPattern(25,0);const e=n?1:0,t=ce.cymaticsCore.materials[25];if(!t)return;try{if(!ei){const a=window.AudioContext||window.webkitAudioContext;ei=new a}ei.state==="suspended"&&ei.resume(),jt||(jt=ei.createOscillator(),Ft=ei.createGain(),jt.type="triangle",jt.frequency.value=108,Ft.gain.value=0,jt.connect(Ft),Ft.connect(ei.destination),jt.start());const s=ei.currentTime;Ft.gain.cancelScheduledValues(s),jt.frequency.cancelScheduledValues(s),Ft.gain.setValueAtTime(Ft.gain.value,s),jt.frequency.setValueAtTime(jt.frequency.value,s),n?(ar&&Ft.gain.linearRampToValueAtTime(.3,s+1),jt.frequency.exponentialRampToValueAtTime(216,s+1)):(ar&&Ft.gain.linearRampToValueAtTime(.15,s+1),jt.frequency.exponentialRampToValueAtTime(108,s+1))}catch{}qa&&cancelAnimationFrame(qa);const i=()=>{let s=t.uniforms.uObserver.value;const a=e-s;if(Math.abs(a)<.01){t.uniforms.uObserver.value=e;return}t.uniforms.uObserver.value=s+a*.05,qa=requestAnimationFrame(i)};i()};export{lc as Visualizer3D,G0 as getVisualizer,L0 as initVisualizer,H0 as isVisualsPaused,V0 as pauseVisuals,B0 as preloadVisualizer,I0 as resumeVisuals,Z0 as setMouseInfluence,X0 as setVisualBrightness,q0 as setVisualColor,Y0 as setVisualLogoOpacity,W0 as setVisualSpeed,k0 as toggleVisual};
//# sourceMappingURL=visualizer_v4-kLV1oRfx.js.map
