/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xr="160",Ri={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Bi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qu=0,_c=1,ju=2,gp=3,_p=0,cl=1,$u=2,bn=3,Cn=0,Xt=1,fn=2,Ap=2,Vn=0,Oi=1,Ac=2,xc=3,yc=4,ed=5,si=100,td=101,nd=102,vc=103,Mc=104,id=200,sd=201,rd=202,od=203,Go=204,Ho=205,ad=206,cd=207,ld=208,hd=209,ud=210,dd=211,fd=212,pd=213,md=214,gd=0,_d=1,Ad=2,sr=3,xd=4,yd=5,vd=6,Md=7,yr=0,Sd=1,bd=2,Wn=0,Ed=1,Td=2,Cd=3,wd=4,Rd=5,Bd=6,Sc="attached",Id="detached",Yo=300,Kn=301,hi=302,rr=303,or=304,Fs=306,ui=1e3,Ft=1001,ws=1002,mt=1003,ar=1004,xp=1004,Es=1005,yp=1005,ht=1006,qo=1007,vp=1007,wn=1008,Mp=1008,Xn=1009,Ld=1010,Pd=1011,Zo=1012,ll=1013,Hn=1014,pn=1015,Rs=1016,hl=1017,ul=1018,ri=1020,Dd=1021,Yt=1023,Fd=1024,Ud=1025,oi=1026,Vi=1027,Nd=1028,dl=1029,Od=1030,fl=1031,pl=1033,Lo=33776,Po=33777,Do=33778,Fo=33779,bc=35840,Ec=35841,Tc=35842,Cc=35843,ml=36196,wc=37492,Rc=37496,Bc=37808,Ic=37809,Lc=37810,Pc=37811,Dc=37812,Fc=37813,Uc=37814,Nc=37815,Oc=37816,Gc=37817,Hc=37818,zc=37819,kc=37820,Vc=37821,Uo=36492,Wc=36494,Xc=36495,Gd=36283,Jc=36284,Kc=36285,Yc=36286,Hd=2200,zd=2201,kd=2202,Bs=2300,Wi=2301,No=2302,Pi=2400,Di=2401,cr=2402,Qo=2500,gl=2501,Vd=0,_l=1,zo=2,Al=3e3,ai=3001,Wd=3200,Xd=3201,fi=0,Jd=1,en="",St="srgb",Rn="srgb-linear",jo="display-p3",vr="display-p3-linear",lr="linear",at="srgb",hr="rec709",ur="p3",Sp=0,Ii=7680,bp=7681,Ep=7682,Tp=7683,Cp=34055,wp=34056,Rp=5386,Bp=512,Ip=513,Lp=514,Pp=515,Dp=516,Fp=517,Up=518,qc=519,Kd=512,Yd=513,qd=514,xl=515,Zd=516,Qd=517,jd=518,$d=519,dr=35044,Np=35048,Op=35040,Gp=35045,Hp=35049,zp=35041,kp=35046,Vp=35050,Wp=35042,Xp="100",Zc="300 es",ko=1035,mn=2e3,Is=2001;let qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}};const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ch=1234567;const Gi=Math.PI/180,Ls=180/Math.PI;function nn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Nt[r&255]+Nt[r>>8&255]+Nt[r>>16&255]+Nt[r>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]).toLowerCase()}function gt(r,e,t){return Math.max(e,Math.min(t,r))}function yl(r,e){return(r%e+e)%e}function Jp(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Kp(r,e,t){return r!==e?(t-r)/(e-r):0}function er(r,e,t){return(1-t)*r+t*e}function Yp(r,e,t,n){return er(r,e,1-Math.exp(-t*n))}function qp(r,e=1){return e-Math.abs(yl(r,e*2)-e)}function Zp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Qp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function jp(r,e){return r+Math.floor(Math.random()*(e-r+1))}function $p(r,e){return r+Math.random()*(e-r)}function em(r){return r*(.5-Math.random())}function tm(r){r!==void 0&&(ch=r);let e=ch+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function nm(r){return r*Gi}function im(r){return r*Ls}function Qc(r){return(r&r-1)===0&&r!==0}function sm(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Vo(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function rm(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":r.set(a*h,c*u,c*d,a*l);break;case"YZY":r.set(c*d,a*h,c*u,a*l);break;case"ZXZ":r.set(c*u,c*d,a*h,a*l);break;case"XZX":r.set(a*h,c*p,c*f,a*l);break;case"YXY":r.set(c*f,a*h,c*p,a*l);break;case"ZYZ":r.set(c*p,c*f,a*h,a*l);break;default:}}function qt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Je(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const vl={DEG2RAD:Gi,RAD2DEG:Ls,generateUUID:nn,clamp:gt,euclideanModulo:yl,mapLinear:Jp,inverseLerp:Kp,lerp:er,damp:Yp,pingpong:qp,smoothstep:Zp,smootherstep:Qp,randInt:jp,randFloat:$p,randFloatSpread:em,seededRandom:tm,degToRad:nm,radToDeg:im,isPowerOfTwo:Qc,ceilPowerOfTwo:sm,floorPowerOfTwo:Vo,setQuaternionFromProperEuler:rm,normalize:Je,denormalize:qt};class X{constructor(e=0,t=0){X.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,n,i,s,o,a,c,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l)}set(e,t,n,i,s,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],x=i[1],A=i[4],y=i[7],R=i[2],b=i[5],w=i[8];return s[0]=o*_+a*x+c*R,s[3]=o*g+a*A+c*b,s[6]=o*m+a*y+c*w,s[1]=l*_+h*x+u*R,s[4]=l*g+h*A+u*b,s[7]=l*m+h*y+u*w,s[2]=d*_+f*x+p*R,s[5]=d*g+f*A+p*b,s[8]=d*m+f*y+p*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*s,f=l*s-o*c,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*s-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ca.makeScale(e,t)),this}rotate(e){return this.premultiply(Ca.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ca.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ca=new Ke;function ef(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}const om={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function ys(r,e){return new om[r](e)}function fr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function tf(){const r=fr("canvas");return r.style.display="block",r}const lh={};function tr(r){r in lh||(lh[r]=!0)}const hh=new Ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),uh=new Ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Dr={[Rn]:{transfer:lr,primaries:hr,toReference:r=>r,fromReference:r=>r},[St]:{transfer:at,primaries:hr,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[vr]:{transfer:lr,primaries:ur,toReference:r=>r.applyMatrix3(uh),fromReference:r=>r.applyMatrix3(hh)},[jo]:{transfer:at,primaries:ur,toReference:r=>r.convertSRGBToLinear().applyMatrix3(uh),fromReference:r=>r.applyMatrix3(hh).convertLinearToSRGB()}},am=new Set([Rn,vr]),ot={enabled:!0,_workingColorSpace:Rn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!am.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=Dr[e].toReference,i=Dr[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return Dr[r].primaries},getTransfer:function(r){return r===en?lr:Dr[r].transfer}};function Ts(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function wa(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let $i;class Ml{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{$i===void 0&&($i=fr("canvas")),$i.width=e.width,$i.height=e.height;const n=$i.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=$i}return t.width>2048||t.height>2048?t.toDataURL("image/jpeg",.6):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Ts(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ts(t[n]/255)*255):t[n]=Ts(t[n]);return{data:t,width:e.width,height:e.height}}else return e}}let cm=0;class Fi{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=nn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Ra(i[o].image)):s.push(Ra(i[o]))}else s=Ra(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ra(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ml.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:{}}let lm=0;class dt extends qn{constructor(e=dt.DEFAULT_IMAGE,t=dt.DEFAULT_MAPPING,n=Ft,i=Ft,s=ht,o=wn,a=Yt,c=Xn,l=dt.DEFAULT_ANISOTROPY,h=en){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lm++}),this.uuid=nn(),this.name="",this.source=new Fi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new X(0,0),this.repeat=new X(1,1),this.center=new X(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(tr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ai?St:en),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ui:e.x=e.x-Math.floor(e.x);break;case Ft:e.x=e.x<0?0:1;break;case ws:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ui:e.y=e.y-Math.floor(e.y);break;case Ft:e.y=e.y<0?0:1;break;case ws:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return tr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===St?ai:Al}set encoding(e){tr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ai?St:en}}dt.DEFAULT_IMAGE=null;dt.DEFAULT_MAPPING=Yo;dt.DEFAULT_ANISOTROPY=1;class nt{constructor(e=0,t=0,n=0,i=1){nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],p=c[9],_=c[2],g=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(l+1)/2,y=(f+1)/2,R=(m+1)/2,b=(h+d)/4,w=(u+_)/4,L=(p+g)/4;return A>y&&A>R?A<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(A),i=b/n,s=w/n):y>R?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=b/i,s=L/i):R<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(R),n=w/s,i=L/s),this.set(n,i,s,t),this}let x=Math.sqrt((g-p)*(g-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nf extends qn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(tr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ai?St:en),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ht,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new dt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Fi(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gn extends nf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class $o extends dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=mt,this.minFilter=mt,this.wrapR=Ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hm extends gn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new $o(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class Sl extends dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=mt,this.minFilter=mt,this.wrapR=Ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class um extends gn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Sl(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class dm extends gn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLMultipleRenderTargets=!0;const s=this.texture;this.texture=[];for(let o=0;o<n;o++)this.texture[o]=s.clone(),this.texture[o].isRenderTargetTexture=!0}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.texture.length;i<s;i++)this.texture[i].image.width=e,this.texture[i].image.height=t,this.texture[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}copy(e){this.dispose(),this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.texture.length=0;for(let t=0,n=e.texture.length;t<n;t++)this.texture[t]=e.texture[t].clone(),this.texture[t].isRenderTargetTexture=!0;return this}}class It{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],p=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==p){let g=1-a;const m=c*d+l*f+h*p+u*_,x=m>=0?1:-1,A=1-m*m;if(A>Number.EPSILON){const R=Math.sqrt(A),b=Math.atan2(R,m*x);g=Math.sin(g*b)/R,a=Math.sin(a*b)/R}const y=a*x;if(c=c*g+d*y,l=l*g+f*y,h=h*g+p*y,u=u*g+_*y,g===1-a){const R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],p=s[o+3];return e[t]=a*p+h*u+c*f-l*d,e[t+1]=c*p+h*d+l*u-a*f,e[t+2]=l*p+h*f+a*d-c*u,e[t+3]=h*p-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),f=c(i/2),p=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"YZX":this._x=d*h*u+l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u-d*f*p;break;case"XZY":this._x=d*h*u-l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u+d*f*p;break;default:}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,n=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-s*i),u=2*(s*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ba.copy(this).projectOnVector(e),this.sub(Ba)}reflect(e){return this.sub(Ba.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ba=new T,dh=new It;class bt{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ln):ln.fromBufferAttribute(s,o),ln.applyMatrix4(e.matrixWorld),this.expandByPoint(ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Fr.copy(n.boundingBox)),Fr.applyMatrix4(e.matrixWorld),this.union(Fr)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ln),ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hs),Ur.subVectors(this.max,Hs),es.subVectors(e.a,Hs),ts.subVectors(e.b,Hs),ns.subVectors(e.c,Hs),Zn.subVectors(ts,es),Qn.subVectors(ns,ts),Ai.subVectors(es,ns);let t=[0,-Zn.z,Zn.y,0,-Qn.z,Qn.y,0,-Ai.z,Ai.y,Zn.z,0,-Zn.x,Qn.z,0,-Qn.x,Ai.z,0,-Ai.x,-Zn.y,Zn.x,0,-Qn.y,Qn.x,0,-Ai.y,Ai.x,0];return!Ia(t,es,ts,ns,Ur)||(t=[1,0,0,0,1,0,0,0,1],!Ia(t,es,ts,ns,Ur))?!1:(Nr.crossVectors(Zn,Qn),t=[Nr.x,Nr.y,Nr.z],Ia(t,es,ts,ns,Ur))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(In),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const In=[new T,new T,new T,new T,new T,new T,new T,new T],ln=new T,Fr=new bt,es=new T,ts=new T,ns=new T,Zn=new T,Qn=new T,Ai=new T,Hs=new T,Ur=new T,Nr=new T,xi=new T;function Ia(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){xi.fromArray(r,s);const a=i.x*Math.abs(xi.x)+i.y*Math.abs(xi.y)+i.z*Math.abs(xi.z),c=e.dot(xi),l=t.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const fm=new bt,zs=new T,La=new T;class Et{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):fm.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zs.subVectors(e,this.center);const t=zs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(zs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(La.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zs.copy(e.center).add(La)),this.expandByPoint(zs.copy(e.center).sub(La))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ln=new T,Pa=new T,Or=new T,jn=new T,Da=new T,Gr=new T,Fa=new T;class qi{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ln.copy(this.origin).addScaledVector(this.direction,t),Ln.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Pa.copy(e).add(t).multiplyScalar(.5),Or.copy(t).sub(e).normalize(),jn.copy(this.origin).sub(Pa);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Or),a=jn.dot(this.direction),c=-jn.dot(Or),l=jn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,p;if(h>0)if(u=o*c-a,d=o*a-c,p=s*h,u>=0)if(d>=-p)if(d<=p){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Pa).addScaledVector(Or,d),f}intersectSphere(e,t){Ln.subVectors(e.center,this.origin);const n=Ln.dot(this.direction),i=Ln.dot(Ln)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ln)!==null}intersectTriangle(e,t,n,i,s){Da.subVectors(t,e),Gr.subVectors(n,e),Fa.crossVectors(Da,Gr);let o=this.direction.dot(Fa),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;jn.subVectors(this.origin,e);const c=a*this.direction.dot(Gr.crossVectors(jn,Gr));if(c<0)return null;const l=a*this.direction.dot(Da.cross(jn));if(l<0||c+l>o)return null;const h=-a*jn.dot(Fa);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(e,t,n,i,s,o,a,c,l,h,u,d,f,p,_,g){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l,h,u,d,f,p,_,g)}set(e,t,n,i,s,o,a,c,l,h,u,d,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/is.setFromMatrixColumn(e,0).length(),s=1/is.setFromMatrixColumn(e,1).length(),o=1/is.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,f=o*u,p=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+p*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=p+f*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,p=l*h,_=l*u;t[0]=d+_*a,t[4]=p*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,p=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,f=o*u,p=a*h,_=a*u;t[0]=c*h,t[4]=p*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-p,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,f=o*l,p=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=p*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+p,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,f=o*l,p=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pm,e,mm)}lookAt(e,t,n){const i=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),$n.crossVectors(n,jt),$n.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),$n.crossVectors(n,jt)),$n.normalize(),Hr.crossVectors(jt,$n),i[0]=$n.x,i[4]=Hr.x,i[8]=jt.x,i[1]=$n.y,i[5]=Hr.y,i[9]=jt.y,i[2]=$n.z,i[6]=Hr.z,i[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],x=n[3],A=n[7],y=n[11],R=n[15],b=i[0],w=i[4],L=i[8],v=i[12],S=i[1],F=i[5],W=i[9],oe=i[13],P=i[2],O=i[6],k=i[10],Q=i[14],q=i[3],J=i[7],$=i[11],te=i[15];return s[0]=o*b+a*S+c*P+l*q,s[4]=o*w+a*F+c*O+l*J,s[8]=o*L+a*W+c*k+l*$,s[12]=o*v+a*oe+c*Q+l*te,s[1]=h*b+u*S+d*P+f*q,s[5]=h*w+u*F+d*O+f*J,s[9]=h*L+u*W+d*k+f*$,s[13]=h*v+u*oe+d*Q+f*te,s[2]=p*b+_*S+g*P+m*q,s[6]=p*w+_*F+g*O+m*J,s[10]=p*L+_*W+g*k+m*$,s[14]=p*v+_*oe+g*Q+m*te,s[3]=x*b+A*S+y*P+R*q,s[7]=x*w+A*F+y*O+R*J,s[11]=x*L+A*W+y*k+R*$,s[15]=x*v+A*oe+y*Q+R*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15];return p*(+s*c*u-i*l*u-s*a*d+n*l*d+i*a*f-n*c*f)+_*(+t*c*f-t*l*d+s*o*d-i*o*f+i*l*h-s*c*h)+g*(+t*l*u-t*a*f-s*o*u+n*o*f+s*a*h-n*l*h)+m*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],x=u*g*l-_*d*l+_*c*f-a*g*f-u*c*m+a*d*m,A=p*d*l-h*g*l-p*c*f+o*g*f+h*c*m-o*d*m,y=h*_*l-p*u*l+p*a*f-o*_*f-h*a*m+o*u*m,R=p*u*c-h*_*c-p*a*d+o*_*d+h*a*g-o*u*g,b=t*x+n*A+i*y+s*R;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return e[0]=x*w,e[1]=(_*d*s-u*g*s-_*i*f+n*g*f+u*i*m-n*d*m)*w,e[2]=(a*g*s-_*c*s+_*i*l-n*g*l-a*i*m+n*c*m)*w,e[3]=(u*c*s-a*d*s-u*i*l+n*d*l+a*i*f-n*c*f)*w,e[4]=A*w,e[5]=(h*g*s-p*d*s+p*i*f-t*g*f-h*i*m+t*d*m)*w,e[6]=(p*c*s-o*g*s-p*i*l+t*g*l+o*i*m-t*c*m)*w,e[7]=(o*d*s-h*c*s+h*i*l-t*d*l-o*i*f+t*c*f)*w,e[8]=y*w,e[9]=(p*u*s-h*_*s-p*n*f+t*_*f+h*n*m-t*u*m)*w,e[10]=(o*_*s-p*a*s+p*n*l-t*_*l-o*n*m+t*a*m)*w,e[11]=(h*a*s-o*u*s-h*n*l+t*u*l+o*n*f-t*a*f)*w,e[12]=R*w,e[13]=(h*_*i-p*u*i+p*n*d-t*_*d-h*n*g+t*u*g)*w,e[14]=(p*a*i-o*_*i-p*n*c+t*_*c+o*n*g-t*a*g)*w,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,u=a+a,d=s*l,f=s*h,p=s*u,_=o*h,g=o*u,m=a*u,x=c*l,A=c*h,y=c*u,R=n.x,b=n.y,w=n.z;return i[0]=(1-(_+m))*R,i[1]=(f+y)*R,i[2]=(p-A)*R,i[3]=0,i[4]=(f-y)*b,i[5]=(1-(d+m))*b,i[6]=(g+x)*b,i[7]=0,i[8]=(p+A)*w,i[9]=(g-x)*w,i[10]=(1-(d+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=is.set(i[0],i[1],i[2]).length();const o=is.set(i[4],i[5],i[6]).length(),a=is.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],hn.copy(this);const l=1/s,h=1/o,u=1/a;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,t.setFromRotationMatrix(hn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=mn){const c=this.elements,l=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,p;if(a===mn)f=-(o+s)/(o-s),p=-2*o*s/(o-s);else if(a===Is)f=-o/(o-s),p=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=mn){const c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-s),d=(t+e)*l,f=(n+i)*h;let p,_;if(a===mn)p=(o+s)*u,_=-2*u;else if(a===Is)p=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const is=new T,hn=new Pe,pm=new T(0,0,0),mm=new T(1,1,1),$n=new T,Hr=new T,jt=new T,fh=new Pe,ph=new It;class Mr{constructor(e=0,t=0,n=0,i=Mr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ph.setFromEuler(this),this.setFromQuaternion(ph,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mr.DEFAULT_ORDER="XYZ";class ea{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gm=0;const mh=new T,ss=new It,Pn=new Pe,zr=new T,ks=new T,_m=new T,Am=new It,gh=new T(1,0,0),_h=new T(0,1,0),Ah=new T(0,0,1),xm={type:"added"},ym={type:"removed"};class it extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=it.DEFAULT_UP.clone();const e=new T,t=new Mr,n=new It,i=new T(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new Ke}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=it.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ea,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(gh,e)}rotateY(e){return this.rotateOnAxis(_h,e)}rotateZ(e){return this.rotateOnAxis(Ah,e)}translateOnAxis(e,t){return mh.copy(e).applyQuaternion(this.quaternion),this.position.add(mh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gh,e)}translateY(e){return this.translateOnAxis(_h,e)}translateZ(e){return this.translateOnAxis(Ah,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zr.copy(e):zr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(ks,zr,this.up):Pn.lookAt(zr,ks,this.up),this.quaternion.setFromRotationMatrix(Pn),i&&(Pn.extractRotation(i.matrixWorld),ss.setFromRotationMatrix(Pn),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?this:(e&&e.isObject3D&&(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(xm)),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ym)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,e,_m),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,Am,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}it.DEFAULT_UP=new T(0,1,0);it.DEFAULT_MATRIX_AUTO_UPDATE=!0;it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new T,Dn=new T,Ua=new T,Fn=new T,rs=new T,os=new T,xh=new T,Na=new T,Oa=new T,Ga=new T;let kr=!1;class Kt{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),un.subVectors(e,t),i.cross(un);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){un.subVectors(i,t),Dn.subVectors(n,t),Ua.subVectors(e,t);const o=un.dot(un),a=un.dot(Dn),c=un.dot(Ua),l=Dn.dot(Dn),h=Dn.dot(Ua),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,p=(o*h-a*c)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getUV(e,t,n,i,s,o,a,c){return kr===!1&&(kr=!0),this.getInterpolation(e,t,n,i,s,o,a,c)}static getInterpolation(e,t,n,i,s,o,a,c){return this.getBarycoord(e,t,n,i,Fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Fn.x),c.addScaledVector(o,Fn.y),c.addScaledVector(a,Fn.z),c)}static isFrontFacing(e,t,n,i){return un.subVectors(n,t),Dn.subVectors(e,t),un.cross(Dn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return un.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),un.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return kr===!1&&(kr=!0),Kt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return Kt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;rs.subVectors(i,n),os.subVectors(s,n),Na.subVectors(e,n);const c=rs.dot(Na),l=os.dot(Na);if(c<=0&&l<=0)return t.copy(n);Oa.subVectors(e,i);const h=rs.dot(Oa),u=os.dot(Oa);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(rs,o);Ga.subVectors(e,s);const f=rs.dot(Ga),p=os.dot(Ga);if(p>=0&&f<=p)return t.copy(s);const _=f*l-c*p;if(_<=0&&l>=0&&p<=0)return a=l/(l-p),t.copy(n).addScaledVector(os,a);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return xh.subVectors(s,i),a=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(xh,a);const m=1/(g+_+d);return o=_*m,a=d*m,t.copy(n).addScaledVector(rs,o).addScaledVector(os,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const sf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},Vr={h:0,s:0,l:0};function Ha(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class de{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ot.workingColorSpace){if(e=yl(e,1),t=gt(t,0,1),n=gt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Ha(o,s,e+1/3),this.g=Ha(o,s,e),this.b=Ha(o,s,e-1/3)}return ot.toWorkingColorSpace(this,i),this}setStyle(e,t=St){function n(s){s!==void 0&&parseFloat(s)<1}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){const n=sf[e.toLowerCase()];return n!==void 0&&this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ts(e.r),this.g=Ts(e.g),this.b=Ts(e.b),this}copyLinearToSRGB(e){return this.r=wa(e.r),this.g=wa(e.g),this.b=wa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return ot.fromWorkingColorSpace(Ot.copy(this),e),Math.round(gt(Ot.r*255,0,255))*65536+Math.round(gt(Ot.g*255,0,255))*256+Math.round(gt(Ot.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.fromWorkingColorSpace(Ot.copy(this),t);const n=Ot.r,i=Ot.g,s=Ot.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ot.workingColorSpace){return ot.fromWorkingColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=St){ot.fromWorkingColorSpace(Ot.copy(this),e);const t=Ot.r,n=Ot.g,i=Ot.b;return e!==St?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ei),this.setHSL(ei.h+e,ei.s+t,ei.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ei),e.getHSL(Vr);const n=er(ei.h,Vr.h,t),i=er(ei.s,Vr.s,t),s=er(ei.l,Vr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new de;de.NAMES=sf;let vm=0;class Tt extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vm++}),this.uuid=nn(),this.name="",this.type="Material",this.blending=Oi,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Go,this.blendDst=Ho,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new de(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0)continue;const i=this[t];i!==void 0&&(i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==Cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Go&&(n.blendSrc=this.blendSrc),this.blendDst!==Ho&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==sr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class tn extends Tt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=yr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Gn=Mm();function Mm(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(l&8388608);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function Jt(r){Math.abs(r)>65504,r=gt(r,-65504,65504),Gn.floatView[0]=r;const e=Gn.uint32View[0],t=e>>23&511;return Gn.baseTable[t]+((e&8388607)>>Gn.shiftTable[t])}function $s(r){const e=r>>10;return Gn.uint32View[0]=Gn.mantissaTable[Gn.offsetTable[e]+(r&1023)]+Gn.exponentTable[e],Gn.floatView[0]}const Sm={toHalfFloat:Jt,fromHalfFloat:$s},Mt=new T,Wr=new X;class $e{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=dr,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wr.fromBufferAttribute(this,t),Wr.applyMatrix3(e),this.setXY(t,Wr.x,Wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=qt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==dr&&(e.usage=this.usage),e}}class bm extends $e{constructor(e,t,n){super(new Int8Array(e),t,n)}}class Em extends $e{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class Tm extends $e{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class Cm extends $e{constructor(e,t,n){super(new Int16Array(e),t,n)}}class bl extends $e{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class wm extends $e{constructor(e,t,n){super(new Int32Array(e),t,n)}}class El extends $e{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Rm extends $e{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=$s(this.array[e*this.itemSize]);return this.normalized&&(t=qt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=Jt(t),this}getY(e){let t=$s(this.array[e*this.itemSize+1]);return this.normalized&&(t=qt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=Jt(t),this}getZ(e){let t=$s(this.array[e*this.itemSize+2]);return this.normalized&&(t=qt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=Jt(t),this}getW(e){let t=$s(this.array[e*this.itemSize+3]);return this.normalized&&(t=qt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=Jt(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=Jt(t),this.array[e+1]=Jt(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.array[e+0]=Jt(t),this.array[e+1]=Jt(n),this.array[e+2]=Jt(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.array[e+0]=Jt(t),this.array[e+1]=Jt(n),this.array[e+2]=Jt(i),this.array[e+3]=Jt(s),this}}class Se extends $e{constructor(e,t,n){super(new Float32Array(e),t,n)}}class Bm extends $e{constructor(e,t,n){super(new Float64Array(e),t,n)}}let Im=0;const on=new Pe,za=new it,as=new T,$t=new bt,Vs=new bt,Bt=new T;class ke extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Im++}),this.uuid=nn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ef(e)?El:bl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,n){return on.makeTranslation(e,t,n),this.applyMatrix4(on),this}scale(e,t,n){return on.makeScale(e,t,n),this.applyMatrix4(on),this}lookAt(e){return za.lookAt(e),za.updateMatrix(),this.applyMatrix4(za.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Se(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];$t.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Et);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingSphere.set(new T,1/0);return}if(e){const n=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Vs.setFromBufferAttribute(a),this.morphTargetsRelative?(Bt.addVectors($t.min,Vs.min),$t.expandByPoint(Bt),Bt.addVectors($t.max,Vs.max),$t.expandByPoint(Bt)):($t.expandByPoint(Vs.min),$t.expandByPoint(Vs.max))}$t.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Bt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Bt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Bt.fromBufferAttribute(a,l),c&&(as.fromBufferAttribute(e,l),Bt.add(as)),i=Math.max(i,n.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return;const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let S=0;S<a;S++)l[S]=new T,h[S]=new T;const u=new T,d=new T,f=new T,p=new X,_=new X,g=new X,m=new T,x=new T;function A(S,F,W){u.fromArray(i,S*3),d.fromArray(i,F*3),f.fromArray(i,W*3),p.fromArray(o,S*2),_.fromArray(o,F*2),g.fromArray(o,W*2),d.sub(u),f.sub(u),_.sub(p),g.sub(p);const oe=1/(_.x*g.y-g.x*_.y);isFinite(oe)&&(m.copy(d).multiplyScalar(g.y).addScaledVector(f,-_.y).multiplyScalar(oe),x.copy(f).multiplyScalar(_.x).addScaledVector(d,-g.x).multiplyScalar(oe),l[S].add(m),l[F].add(m),l[W].add(m),h[S].add(x),h[F].add(x),h[W].add(x))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let S=0,F=y.length;S<F;++S){const W=y[S],oe=W.start,P=W.count;for(let O=oe,k=oe+P;O<k;O+=3)A(n[O+0],n[O+1],n[O+2])}const R=new T,b=new T,w=new T,L=new T;function v(S){w.fromArray(s,S*3),L.copy(w);const F=l[S];R.copy(F),R.sub(w.multiplyScalar(w.dot(F))).normalize(),b.crossVectors(L,F);const oe=b.dot(h[S])<0?-1:1;c[S*4]=R.x,c[S*4+1]=R.y,c[S*4+2]=R.z,c[S*4+3]=oe}for(let S=0,F=y.length;S<F;++S){const W=y[S],oe=W.start,P=W.count;for(let O=oe,k=oe+P;O<k;O+=3)v(n[O+0]),v(n[O+1]),v(n[O+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new T,s=new T,o=new T,a=new T,c=new T,l=new T,h=new T,u=new T;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,p=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let m=0;m<h;m++)d[p++]=l[f++]}return new $e(d,h,u)}if(this.index===null)return this;const t=new ke,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yh=new Pe,yi=new qi,Xr=new Et,vh=new T,cs=new T,ls=new T,hs=new T,ka=new T,Jr=new T,Kr=new X,Yr=new X,qr=new X,Mh=new T,Sh=new T,bh=new T,Zr=new T,Qr=new T;class vt extends it{constructor(e=new ke,t=new tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Jr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(ka.fromBufferAttribute(u,e),o?Jr.addScaledVector(ka,h):Jr.addScaledVector(ka.sub(t),h))}t.add(Jr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(s),yi.copy(e.ray).recast(e.near),!(Xr.containsPoint(yi.origin)===!1&&(yi.intersectSphere(Xr,vh)===null||yi.origin.distanceToSquared(vh)>(e.far-e.near)**2))&&(yh.copy(s).invert(),yi.copy(e.ray).applyMatrix4(yh),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,yi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=o[g.materialIndex],x=Math.max(g.start,f.start),A=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,R=A;y<R;y+=3){const b=a.getX(y),w=a.getX(y+1),L=a.getX(y+2);i=jr(this,m,e,n,l,h,u,b,w,L),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const x=a.getX(g),A=a.getX(g+1),y=a.getX(g+2);i=jr(this,o,e,n,l,h,u,x,A,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=o[g.materialIndex],x=Math.max(g.start,f.start),A=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,R=A;y<R;y+=3){const b=y,w=y+1,L=y+2;i=jr(this,m,e,n,l,h,u,b,w,L),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const x=g,A=g+1,y=g+2;i=jr(this,o,e,n,l,h,u,x,A,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Lm(r,e,t,n,i,s,o,a){let c;if(e.side===Xt?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,e.side===Cn,a),c===null)return null;Qr.copy(a),Qr.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(Qr);return l<t.near||l>t.far?null:{distance:l,point:Qr.clone(),object:r}}function jr(r,e,t,n,i,s,o,a,c,l){r.getVertexPosition(a,cs),r.getVertexPosition(c,ls),r.getVertexPosition(l,hs);const h=Lm(r,e,t,n,cs,ls,hs,Zr);if(h){i&&(Kr.fromBufferAttribute(i,a),Yr.fromBufferAttribute(i,c),qr.fromBufferAttribute(i,l),h.uv=Kt.getInterpolation(Zr,cs,ls,hs,Kr,Yr,qr,new X)),s&&(Kr.fromBufferAttribute(s,a),Yr.fromBufferAttribute(s,c),qr.fromBufferAttribute(s,l),h.uv1=Kt.getInterpolation(Zr,cs,ls,hs,Kr,Yr,qr,new X),h.uv2=h.uv1),o&&(Mh.fromBufferAttribute(o,a),Sh.fromBufferAttribute(o,c),bh.fromBufferAttribute(o,l),h.normal=Kt.getInterpolation(Zr,cs,ls,hs,Mh,Sh,bh,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new T,materialIndex:0};Kt.getNormal(cs,ls,hs,u.normal),h.face=u}return h}class Zi extends ke{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,s,0),p("z","y","x",1,-1,n,t,-e,o,s,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(h,3)),this.setAttribute("uv",new Se(u,2));function p(_,g,m,x,A,y,R,b,w,L,v){const S=y/w,F=R/L,W=y/2,oe=R/2,P=b/2,O=w+1,k=L+1;let Q=0,q=0;const J=new T;for(let $=0;$<k;$++){const te=$*F-oe;for(let fe=0;fe<O;fe++){const V=fe*S-W;J[_]=V*x,J[g]=te*A,J[m]=P,l.push(J.x,J.y,J.z),J[_]=0,J[g]=0,J[m]=b>0?1:-1,h.push(J.x,J.y,J.z),u.push(fe/w),u.push(1-$/L),Q+=1}}for(let $=0;$<L;$++)for(let te=0;te<w;te++){const fe=d+te+O*$,V=d+te+O*($+1),ne=d+(te+1)+O*($+1),me=d+(te+1)+O*$;c.push(fe,V,me),c.push(V,ne,me),q+=6}a.addGroup(f,q,v),f+=q,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ps(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?e[t][n]=null:e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Wt(r){const e={};for(let t=0;t<r.length;t++){const n=Ps(r[t]);for(const i in n)e[i]=n[i]}return e}function Pm(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function rf(r){return r.getRenderTarget()===null?r.outputColorSpace:ot.workingColorSpace}const Wo={clone:Ps,merge:Wt};var Dm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Tt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dm,this.fragmentShader=Fm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ps(e.uniforms),this.uniformsGroups=Pm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ta extends it{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=mn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class yt extends ta{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ls*2*Math.atan(Math.tan(Gi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const us=-90,ds=1;class of extends it{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new yt(us,ds,e,t);i.layers=this.layers,this.add(i);const s=new yt(us,ds,e,t);s.layers=this.layers,this.add(s);const o=new yt(us,ds,e,t);o.layers=this.layers,this.add(o);const a=new yt(us,ds,e,t);a.layers=this.layers,this.add(a);const c=new yt(us,ds,e,t);c.layers=this.layers,this.add(c);const l=new yt(us,ds,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===mn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Is)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Sr extends dt{constructor(e,t,n,i,s,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Kn,super(e,t,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class af extends gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(tr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ai?St:en),this.texture=new Sr(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ht}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Zi(5,5,5),s=new _n({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:Vn});s.uniforms.tEquirect.value=t;const o=new vt(i,s),a=t.minFilter;return t.minFilter===wn&&(t.minFilter=ht),new of(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const Va=new T,Um=new T,Nm=new Ke;class On{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Va.subVectors(n,t).cross(Um.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Va),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Nm.getNormalMatrix(e),i=this.coplanarPoint(Va).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vi=new Et,$r=new T;class br{constructor(e=new On,t=new On,n=new On,i=new On,s=new On,o=new On){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=mn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],_=i[10],g=i[11],m=i[12],x=i[13],A=i[14],y=i[15];if(n[0].setComponents(c-s,d-l,g-f,y-m).normalize(),n[1].setComponents(c+s,d+l,g+f,y+m).normalize(),n[2].setComponents(c+o,d+h,g+p,y+x).normalize(),n[3].setComponents(c-o,d-h,g-p,y-x).normalize(),n[4].setComponents(c-a,d-u,g-_,y-A).normalize(),t===mn)n[5].setComponents(c+a,d+u,g+_,y+A).normalize();else if(t===Is)n[5].setComponents(a,u,_,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(e){return vi.center.set(0,0,0),vi.radius=.7071067811865476,vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if($r.x=i.normal.x>0?e.max.x:e.min.x,$r.y=i.normal.y>0?e.max.y:e.min.y,$r.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint($r)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cf(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Om(r,e){const t=e.isWebGL2,n=new WeakMap;function i(l,h){const u=l.array,d=l.usage,f=u.byteLength,p=r.createBuffer();r.bindBuffer(h,p),r.bufferData(h,u,d),l.onUploadCallback();let _;if(u instanceof Float32Array)_=r.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=r.SHORT;else if(u instanceof Uint32Array)_=r.UNSIGNED_INT;else if(u instanceof Int32Array)_=r.INT;else if(u instanceof Int8Array)_=r.BYTE;else if(u instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function s(l,h,u){const d=h.array,f=h._updateRange,p=h.updateRanges;if(r.bindBuffer(u,l),f.count===-1&&p.length===0&&r.bufferSubData(u,0,d),p.length!==0){for(let _=0,g=p.length;_<g;_++){const m=p[_];t?r.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count):r.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(t?r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(r.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}class Er extends ke{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const x=m*d-o;for(let A=0;A<l;A++){const y=A*u-s;p.push(y,-x,0),_.push(0,0,1),g.push(A/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const A=x+l*m,y=x+l*(m+1),R=x+1+l*(m+1),b=x+1+l*m;f.push(A,y,b),f.push(y,R,b)}this.setIndex(f),this.setAttribute("position",new Se(p,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Er(e.width,e.height,e.widthSegments,e.heightSegments)}}var Gm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hm=`#ifdef USE_ALPHAHASH
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
#endif`,zm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,km=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Wm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xm=`#ifdef USE_AOMAP
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
#endif`,Jm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Km=`#ifdef USE_BATCHING
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
#endif`,Ym=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,qm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jm=`#ifdef USE_IRIDESCENCE
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
#endif`,$m=`#ifdef USE_BUMPMAP
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
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,og=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ag=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,cg=`#define PI 3.141592653589793
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
} // validated`,lg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hg=`vec3 transformedNormal = objectNormal;
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
#endif`,ug=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mg="gl_FragColor = linearToOutputTexel( gl_FragColor );",gg=`
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
}`,_g=`#ifdef USE_ENVMAP
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
#endif`,Ag=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xg=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vg=`#ifdef USE_ENVMAP
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
#endif`,Mg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Eg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tg=`#ifdef USE_GRADIENTMAP
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
}`,Cg=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,wg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ig=`uniform bool receiveShadow;
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
#endif`,Lg=`#ifdef USE_ENVMAP
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
#endif`,Pg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ng=`PhysicalMaterial material;
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
#endif`,Og=`struct PhysicalMaterial {
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
}`,Gg=`
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
#endif`,Hg=`#if defined( RE_IndirectDiffuse )
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
#endif`,zg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Xg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Jg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qg=`#if defined( USE_POINTS_UV )
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
#endif`,Zg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$g=`#ifdef USE_MORPHNORMALS
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
#endif`,e_=`#ifdef USE_MORPHTARGETS
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
#endif`,t_=`#ifdef USE_MORPHTARGETS
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
#endif`,n_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,i_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,s_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,a_=`#ifdef USE_NORMALMAP
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
#endif`,c_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,l_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,h_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,u_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,d_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,f_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,p_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,m_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,g_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,__=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,x_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,y_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,v_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,M_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,S_=`float getShadowMask() {
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
}`,b_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,E_=`#ifdef USE_SKINNING
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
#endif`,T_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,C_=`#ifdef USE_SKINNING
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
#endif`,w_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,R_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,B_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,I_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,L_=`#ifdef USE_TRANSMISSION
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
#endif`,P_=`#ifdef USE_TRANSMISSION
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
#endif`,D_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,N_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const O_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,G_=`uniform sampler2D t2D;
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
}`,H_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,k_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,V_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W_=`#include <common>
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
}`,X_=`#if DEPTH_PACKING == 3200
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
}`,J_=`#define DISTANCE
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
}`,K_=`#define DISTANCE
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
}`,Y_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,q_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z_=`uniform float scale;
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
}`,Q_=`uniform vec3 diffuse;
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
}`,j_=`#include <common>
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
}`,$_=`uniform vec3 diffuse;
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
}`,eA=`#define LAMBERT
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
}`,tA=`#define LAMBERT
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
}`,nA=`#define MATCAP
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
}`,iA=`#define MATCAP
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
}`,sA=`#define NORMAL
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
}`,rA=`#define NORMAL
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
}`,oA=`#define PHONG
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
}`,aA=`#define PHONG
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
}`,cA=`#define STANDARD
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
}`,lA=`#define STANDARD
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
}`,hA=`#define TOON
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
}`,uA=`#define TOON
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
}`,dA=`uniform float size;
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
}`,fA=`uniform vec3 diffuse;
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
}`,pA=`#include <common>
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
}`,mA=`uniform vec3 color;
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
}`,gA=`uniform float rotation;
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
}`,_A=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Gm,alphahash_pars_fragment:Hm,alphamap_fragment:zm,alphamap_pars_fragment:km,alphatest_fragment:Vm,alphatest_pars_fragment:Wm,aomap_fragment:Xm,aomap_pars_fragment:Jm,batching_pars_vertex:Km,batching_vertex:Ym,begin_vertex:qm,beginnormal_vertex:Zm,bsdfs:Qm,iridescence_fragment:jm,bumpmap_pars_fragment:$m,clipping_planes_fragment:eg,clipping_planes_pars_fragment:tg,clipping_planes_pars_vertex:ng,clipping_planes_vertex:ig,color_fragment:sg,color_pars_fragment:rg,color_pars_vertex:og,color_vertex:ag,common:cg,cube_uv_reflection_fragment:lg,defaultnormal_vertex:hg,displacementmap_pars_vertex:ug,displacementmap_vertex:dg,emissivemap_fragment:fg,emissivemap_pars_fragment:pg,colorspace_fragment:mg,colorspace_pars_fragment:gg,envmap_fragment:_g,envmap_common_pars_fragment:Ag,envmap_pars_fragment:xg,envmap_pars_vertex:yg,envmap_physical_pars_fragment:Lg,envmap_vertex:vg,fog_vertex:Mg,fog_pars_vertex:Sg,fog_fragment:bg,fog_pars_fragment:Eg,gradientmap_pars_fragment:Tg,lightmap_fragment:Cg,lightmap_pars_fragment:wg,lights_lambert_fragment:Rg,lights_lambert_pars_fragment:Bg,lights_pars_begin:Ig,lights_toon_fragment:Pg,lights_toon_pars_fragment:Dg,lights_phong_fragment:Fg,lights_phong_pars_fragment:Ug,lights_physical_fragment:Ng,lights_physical_pars_fragment:Og,lights_fragment_begin:Gg,lights_fragment_maps:Hg,lights_fragment_end:zg,logdepthbuf_fragment:kg,logdepthbuf_pars_fragment:Vg,logdepthbuf_pars_vertex:Wg,logdepthbuf_vertex:Xg,map_fragment:Jg,map_pars_fragment:Kg,map_particle_fragment:Yg,map_particle_pars_fragment:qg,metalnessmap_fragment:Zg,metalnessmap_pars_fragment:Qg,morphcolor_vertex:jg,morphnormal_vertex:$g,morphtarget_pars_vertex:e_,morphtarget_vertex:t_,normal_fragment_begin:n_,normal_fragment_maps:i_,normal_pars_fragment:s_,normal_pars_vertex:r_,normal_vertex:o_,normalmap_pars_fragment:a_,clearcoat_normal_fragment_begin:c_,clearcoat_normal_fragment_maps:l_,clearcoat_pars_fragment:h_,iridescence_pars_fragment:u_,opaque_fragment:d_,packing:f_,premultiplied_alpha_fragment:p_,project_vertex:m_,dithering_fragment:g_,dithering_pars_fragment:__,roughnessmap_fragment:A_,roughnessmap_pars_fragment:x_,shadowmap_pars_fragment:y_,shadowmap_pars_vertex:v_,shadowmap_vertex:M_,shadowmask_pars_fragment:S_,skinbase_vertex:b_,skinning_pars_vertex:E_,skinning_vertex:T_,skinnormal_vertex:C_,specularmap_fragment:w_,specularmap_pars_fragment:R_,tonemapping_fragment:B_,tonemapping_pars_fragment:I_,transmission_fragment:L_,transmission_pars_fragment:P_,uv_pars_fragment:D_,uv_pars_vertex:F_,uv_vertex:U_,worldpos_vertex:N_,background_vert:O_,background_frag:G_,backgroundCube_vert:H_,backgroundCube_frag:z_,cube_vert:k_,cube_frag:V_,depth_vert:W_,depth_frag:X_,distanceRGBA_vert:J_,distanceRGBA_frag:K_,equirect_vert:Y_,equirect_frag:q_,linedashed_vert:Z_,linedashed_frag:Q_,meshbasic_vert:j_,meshbasic_frag:$_,meshlambert_vert:eA,meshlambert_frag:tA,meshmatcap_vert:nA,meshmatcap_frag:iA,meshnormal_vert:sA,meshnormal_frag:rA,meshphong_vert:oA,meshphong_frag:aA,meshphysical_vert:cA,meshphysical_frag:lA,meshtoon_vert:hA,meshtoon_frag:uA,points_vert:dA,points_frag:fA,shadow_vert:pA,shadow_frag:mA,sprite_vert:gA,sprite_frag:_A},he={common:{diffuse:{value:new de(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new X(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new de(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new de(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new de(16777215)},opacity:{value:1},center:{value:new X(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},dn={basic:{uniforms:Wt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Wt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new de(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Wt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new de(0)},specular:{value:new de(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Wt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new de(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Wt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new de(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Wt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Wt([he.points,he.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Wt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Wt([he.common,he.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Wt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Wt([he.sprite,he.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Wt([he.common,he.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Wt([he.lights,he.fog,{color:{value:new de(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};dn.physical={uniforms:Wt([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new X(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new de(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new X},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new de(0)},specularColor:{value:new de(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new X},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const eo={r:0,b:0,g:0};function AA(r,e,t,n,i,s,o){const a=new de(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function p(g,m){let x=!1,A=m.isScene===!0?m.background:null;A&&A.isTexture&&(A=(m.backgroundBlurriness>0?t:e).get(A)),A===null?_(a,c):A&&A.isColor&&(_(A,1),x=!0);const y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),A&&(A.isCubeTexture||A.mapping===Fs)?(h===void 0&&(h=new vt(new Zi(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Ps(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=ot.getTransfer(A.colorSpace)!==at,(u!==A||d!==A.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=A,d=A.version,f=r.toneMapping),h.layers.enableAll(),g.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new vt(new Er(2,2),new _n({name:"BackgroundMaterial",uniforms:Ps(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=ot.getTransfer(A.colorSpace)!==at,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=A,d=A.version,f=r.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))}function _(g,m){g.getRGB(eo,rf(r)),n.buffers.color.setClear(eo.r,eo.g,eo.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(g,m=1){a.set(g),c=m,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(g){c=g,_(a,c)},render:p}}function xA(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},c=g(null);let l=c,h=!1;function u(P,O,k,Q,q){let J=!1;if(o){const $=_(Q,k,O);l!==$&&(l=$,f(l.object)),J=m(P,Q,k,q),J&&x(P,Q,k,q)}else{const $=O.wireframe===!0;(l.geometry!==Q.id||l.program!==k.id||l.wireframe!==$)&&(l.geometry=Q.id,l.program=k.id,l.wireframe=$,J=!0)}q!==null&&t.update(q,r.ELEMENT_ARRAY_BUFFER),(J||h)&&(h=!1,L(P,O,k,Q),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(P){return n.isWebGL2?r.bindVertexArray(P):s.bindVertexArrayOES(P)}function p(P){return n.isWebGL2?r.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function _(P,O,k){const Q=k.wireframe===!0;let q=a[P.id];q===void 0&&(q={},a[P.id]=q);let J=q[O.id];J===void 0&&(J={},q[O.id]=J);let $=J[Q];return $===void 0&&($=g(d()),J[Q]=$),$}function g(P){const O=[],k=[],Q=[];for(let q=0;q<i;q++)O[q]=0,k[q]=0,Q[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:k,attributeDivisors:Q,object:P,attributes:{},index:null}}function m(P,O,k,Q){const q=l.attributes,J=O.attributes;let $=0;const te=k.getAttributes();for(const fe in te)if(te[fe].location>=0){const ne=q[fe];let me=J[fe];if(me===void 0&&(fe==="instanceMatrix"&&P.instanceMatrix&&(me=P.instanceMatrix),fe==="instanceColor"&&P.instanceColor&&(me=P.instanceColor)),ne===void 0||ne.attribute!==me||me&&ne.data!==me.data)return!0;$++}return l.attributesNum!==$||l.index!==Q}function x(P,O,k,Q){const q={},J=O.attributes;let $=0;const te=k.getAttributes();for(const fe in te)if(te[fe].location>=0){let ne=J[fe];ne===void 0&&(fe==="instanceMatrix"&&P.instanceMatrix&&(ne=P.instanceMatrix),fe==="instanceColor"&&P.instanceColor&&(ne=P.instanceColor));const me={};me.attribute=ne,ne&&ne.data&&(me.data=ne.data),q[fe]=me,$++}l.attributes=q,l.attributesNum=$,l.index=Q}function A(){const P=l.newAttributes;for(let O=0,k=P.length;O<k;O++)P[O]=0}function y(P){R(P,0)}function R(P,O){const k=l.newAttributes,Q=l.enabledAttributes,q=l.attributeDivisors;k[P]=1,Q[P]===0&&(r.enableVertexAttribArray(P),Q[P]=1),q[P]!==O&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,O),q[P]=O)}function b(){const P=l.newAttributes,O=l.enabledAttributes;for(let k=0,Q=O.length;k<Q;k++)O[k]!==P[k]&&(r.disableVertexAttribArray(k),O[k]=0)}function w(P,O,k,Q,q,J,$){$===!0?r.vertexAttribIPointer(P,O,k,q,J):r.vertexAttribPointer(P,O,k,Q,q,J)}function L(P,O,k,Q){if(n.isWebGL2===!1&&(P.isInstancedMesh||Q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;A();const q=Q.attributes,J=k.getAttributes(),$=O.defaultAttributeValues;for(const te in J){const fe=J[te];if(fe.location>=0){let V=q[te];if(V===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(V=P.instanceColor)),V!==void 0){const ne=V.normalized,me=V.itemSize,be=t.get(V);if(be===void 0)continue;const ve=be.buffer,Fe=be.type,He=be.bytesPerElement,Ce=n.isWebGL2===!0&&(Fe===r.INT||Fe===r.UNSIGNED_INT||V.gpuType===ll);if(V.isInterleavedBufferAttribute){const Ne=V.data,B=Ne.stride,ce=V.offset;if(Ne.isInstancedInterleavedBuffer){for(let K=0;K<fe.locationSize;K++)R(fe.location+K,Ne.meshPerAttribute);P.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=Ne.meshPerAttribute*Ne.count)}else for(let K=0;K<fe.locationSize;K++)y(fe.location+K);r.bindBuffer(r.ARRAY_BUFFER,ve);for(let K=0;K<fe.locationSize;K++)w(fe.location+K,me/fe.locationSize,Fe,ne,B*He,(ce+me/fe.locationSize*K)*He,Ce)}else{if(V.isInstancedBufferAttribute){for(let Ne=0;Ne<fe.locationSize;Ne++)R(fe.location+Ne,V.meshPerAttribute);P.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let Ne=0;Ne<fe.locationSize;Ne++)y(fe.location+Ne);r.bindBuffer(r.ARRAY_BUFFER,ve);for(let Ne=0;Ne<fe.locationSize;Ne++)w(fe.location+Ne,me/fe.locationSize,Fe,ne,me*He,me/fe.locationSize*Ne*He,Ce)}}else if($!==void 0){const ne=$[te];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(fe.location,ne);break;case 3:r.vertexAttrib3fv(fe.location,ne);break;case 4:r.vertexAttrib4fv(fe.location,ne);break;default:r.vertexAttrib1fv(fe.location,ne)}}}}b()}function v(){W();for(const P in a){const O=a[P];for(const k in O){const Q=O[k];for(const q in Q)p(Q[q].object),delete Q[q];delete O[k]}delete a[P]}}function S(P){if(a[P.id]===void 0)return;const O=a[P.id];for(const k in O){const Q=O[k];for(const q in Q)p(Q[q].object),delete Q[q];delete O[k]}delete a[P.id]}function F(P){for(const O in a){const k=a[O];if(k[P.id]===void 0)continue;const Q=k[P.id];for(const q in Q)p(Q[q].object),delete Q[q];delete k[P.id]}}function W(){oe(),h=!0,l!==c&&(l=c,f(l.object))}function oe(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:W,resetDefaultState:oe,dispose:v,releaseStatesOfGeometry:S,releaseStatesOfProgram:F,initAttributes:A,enableAttribute:y,disableUnusedAttributes:b}}function yA(r,e,t,n){const i=n.isWebGL2;let s;function o(h){s=h}function a(h,u){r.drawArrays(s,h,u),t.update(u,s,1)}function c(h,u,d){if(d===0)return;let f,p;if(i)f=r,p="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",f===null)return;f[p](s,h,u,d),t.update(u,s,d)}function l(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<d;p++)this.render(h[p],u[p]);else{f.multiDrawArraysWEBGL(s,h,0,u,0,d);let p=0;for(let _=0;_<d;_++)p+=u[_];t.update(p,s,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function vA(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=s(a);c!==a&&(a=c);const l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),g=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=d>0,y=o||e.has("OES_texture_float"),R=A&&y,b=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:p,maxAttributes:_,maxVertexUniforms:g,maxVaryings:m,maxFragmentUniforms:x,vertexTextures:A,floatFragmentTextures:y,floatVertexTextures:R,maxSamples:b}}function MA(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new On,a=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=r.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):l();else{const x=s?0:n,A=x*4;let y=m.clippingState||null;c.value=y,y=h(p,d,A,f);for(let R=0;R!==A;++R)y[R]=t[R];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=c.value,p!==!0||g===null){const m=f+_*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let A=0,y=f;A!==_;++A,y+=4)o.copy(u[A]).applyMatrix4(x,a),o.normal.toArray(g,y),g[y+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function SA(r){let e=new WeakMap;function t(o,a){return a===rr?o.mapping=Kn:a===or&&(o.mapping=hi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===rr||a===or)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new af(c.height/2);return l.fromEquirectangularTexture(r,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ci extends ta{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const vs=4,Eh=[.125,.215,.35,.446,.526,.582],Ms=20,Wa=new ci,Th=new de;let Xa=null,Ja=0,Ka=0;const Li=(1+Math.sqrt(5))/2,fs=1/Li,Ch=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,Li,fs),new T(0,Li,-fs),new T(fs,0,Li),new T(-fs,0,Li),new T(Li,fs,0),new T(-Li,fs,0)];class jc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Xa=this._renderer.getRenderTarget(),Ja=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Xa,Ja,Ka),e.scissorTest=!1,to(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Kn||e.mapping===hi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xa=this._renderer.getRenderTarget(),Ja=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ht,minFilter:ht,generateMipmaps:!1,type:Rs,format:Yt,colorSpace:Rn,depthBuffer:!1},i=wh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wh(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bA(s)),this._blurMaterial=EA(s,e,t)}return i}_compileMaterial(e){const t=new vt(this._lodPlanes[0],e);this._renderer.compile(t,Wa)}_sceneToCubeUV(e,t,n,i){const a=new yt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Th),h.toneMapping=Wn,h.autoClear=!1;const f=new tn({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),p=new vt(new Zi,f);let _=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,_=!0):(f.color.copy(Th),_=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):x===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const A=this._cubeSize;to(i,x*A,m>2?A:0,A,A),h.setRenderTarget(i),_&&h.render(p,a),h.render(e,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Kn||e.mapping===hi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rh());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new vt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;to(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Wa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Ch[(i-1)%Ch.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial,h=3,u=new vt(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ms-1),_=s/p,g=isFinite(s)?1+Math.floor(h*_):Ms;g>Ms;const m=[];let x=0;for(let w=0;w<Ms;++w){const L=w/_,v=Math.exp(-L*L/2);m.push(v),w===0?x+=v:w<g&&(x+=2*v)}for(let w=0;w<m.length;w++)m[w]=m[w]/x;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:A}=this;d.dTheta.value=p,d.mipInt.value=A-n;const y=this._sizeLods[i],R=3*y*(i>A-vs?i-A+vs:0),b=4*(this._cubeSize-y);to(t,R,b,3*y,2*y),c.setRenderTarget(t),c.render(u,Wa)}}function bA(r){const e=[],t=[],n=[];let i=r;const s=r-vs+1+Eh.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let c=1/a;o>r-vs?c=Eh[o-r+vs-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,_=3,g=2,m=1,x=new Float32Array(_*p*f),A=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let b=0;b<f;b++){const w=b%3*2/3-1,L=b>2?0:-1,v=[w,L,0,w+2/3,L,0,w+2/3,L+1,0,w,L,0,w+2/3,L+1,0,w,L+1,0];x.set(v,_*p*b),A.set(d,g*p*b);const S=[b,b,b,b,b,b];y.set(S,m*p*b)}const R=new ke;R.setAttribute("position",new $e(x,_)),R.setAttribute("uv",new $e(A,g)),R.setAttribute("faceIndex",new $e(y,m)),e.push(R),i>vs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function wh(r,e,t){const n=new gn(r,e,t);return n.texture.mapping=Fs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function to(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function EA(r,e,t){const n=new Float32Array(Ms),i=new T(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:Ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Rh(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Bh(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Tl(){return`

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
	`}function TA(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===rr||c===or,h=c===Kn||c===hi;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new jc(r)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new jc(r));const d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function CA(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i}}}function wA(r,e,t,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);for(const p in d.morphAttributes){const _=d.morphAttributes[p];for(let g=0,m=_.length;g<m;g++)e.remove(_[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const p in d)e.update(d[p],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const p in f){const _=f[p];for(let g=0,m=_.length;g<m;g++)e.update(_[g],r.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,p=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let A=0,y=x.length;A<y;A+=3){const R=x[A+0],b=x[A+1],w=x[A+2];d.push(R,b,b,w,w,R)}}else if(p!==void 0){const x=p.array;_=p.version;for(let A=0,y=x.length/3-1;A<y;A+=3){const R=A+0,b=A+1,w=A+2;d.push(R,b,b,w,w,R)}}else return;const g=new(ef(d)?El:bl)(d,1);g.version=_;const m=s.get(u);m&&e.remove(m),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function RA(r,e,t,n){const i=n.isWebGL2;let s;function o(f){s=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function h(f,p){r.drawElements(s,p,a,f*c),t.update(p,s,1)}function u(f,p,_){if(_===0)return;let g,m;if(i)g=r,m="drawElementsInstanced";else if(g=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",g===null)return;g[m](s,p,a,f*c,_),t.update(p,s,_)}function d(f,p,_){if(_===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<_;m++)this.render(f[m]/c,p[m]);else{g.multiDrawElementsWEBGL(s,p,0,a,f,0,_);let m=0;for(let x=0;x<_;x++)m+=p[x];t.update(m,s,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function BA(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function IA(r,e){return r[0]-e[0]}function LA(r,e){return Math.abs(e[1])-Math.abs(r[1])}function PA(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new nt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,p=f!==void 0?f.length:0;let _=s.get(h);if(_===void 0||_.count!==p){let P=function(){W.dispose(),s.delete(h),h.removeEventListener("dispose",P)};_!==void 0&&_.texture.dispose();const x=h.morphAttributes.position!==void 0,A=h.morphAttributes.normal!==void 0,y=h.morphAttributes.color!==void 0,R=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],w=h.morphAttributes.color||[];let L=0;x===!0&&(L=1),A===!0&&(L=2),y===!0&&(L=3);let v=h.attributes.position.count*L,S=1;v>e.maxTextureSize&&(S=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const F=new Float32Array(v*S*4*p),W=new $o(F,v,S,p);W.type=pn,W.needsUpdate=!0;const oe=L*4;for(let O=0;O<p;O++){const k=R[O],Q=b[O],q=w[O],J=v*S*4*O;for(let $=0;$<k.count;$++){const te=$*oe;x===!0&&(o.fromBufferAttribute(k,$),F[J+te+0]=o.x,F[J+te+1]=o.y,F[J+te+2]=o.z,F[J+te+3]=0),A===!0&&(o.fromBufferAttribute(Q,$),F[J+te+4]=o.x,F[J+te+5]=o.y,F[J+te+6]=o.z,F[J+te+7]=0),y===!0&&(o.fromBufferAttribute(q,$),F[J+te+8]=o.x,F[J+te+9]=o.y,F[J+te+10]=o.z,F[J+te+11]=q.itemSize===4?o.w:1)}}_={count:p,texture:W,size:new X(v,S)},s.set(h,_),h.addEventListener("dispose",P)}let g=0;for(let x=0;x<d.length;x++)g+=d[x];const m=h.morphTargetsRelative?1:1-g;u.getUniforms().setValue(r,"morphTargetBaseInfluence",m),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",_.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}else{const f=d===void 0?0:d.length;let p=n[h.id];if(p===void 0||p.length!==f){p=[];for(let A=0;A<f;A++)p[A]=[A,0];n[h.id]=p}for(let A=0;A<f;A++){const y=p[A];y[0]=A,y[1]=d[A]}p.sort(LA);for(let A=0;A<8;A++)A<f&&p[A][1]?(a[A][0]=p[A][0],a[A][1]=p[A][1]):(a[A][0]=Number.MAX_SAFE_INTEGER,a[A][1]=0);a.sort(IA);const _=h.morphAttributes.position,g=h.morphAttributes.normal;let m=0;for(let A=0;A<8;A++){const y=a[A],R=y[0],b=y[1];R!==Number.MAX_SAFE_INTEGER&&b?(_&&h.getAttribute("morphTarget"+A)!==_[R]&&h.setAttribute("morphTarget"+A,_[R]),g&&h.getAttribute("morphNormal"+A)!==g[R]&&h.setAttribute("morphNormal"+A,g[R]),i[A]=b,m+=b):(_&&h.hasAttribute("morphTarget"+A)===!0&&h.deleteAttribute("morphTarget"+A),g&&h.hasAttribute("morphNormal"+A)===!0&&h.deleteAttribute("morphNormal"+A),i[A]=0)}const x=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:c}}function DA(r,e,t,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class Cl extends dt{constructor(e,t,n,i,s,o,a,c,l,h){if(h=h!==void 0?h:oi,h!==oi&&h!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===oi&&(n=Hn),n===void 0&&h===Vi&&(n=ri),super(null,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:mt,this.minFilter=c!==void 0?c:mt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const lf=new dt,hf=new Cl(1,1);hf.compareFunction=xl;const uf=new $o,df=new Sl,ff=new Sr,Ih=[],Lh=[],Ph=new Float32Array(16),Dh=new Float32Array(9),Fh=new Float32Array(4);function Us(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Ih[i];if(s===void 0&&(s=new Float32Array(i),Ih[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Ct(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function wt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function na(r,e){let t=Lh[e];t===void 0&&(t=new Int32Array(e),Lh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function FA(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function UA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2fv(this.addr,e),wt(t,e)}}function NA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;r.uniform3fv(this.addr,e),wt(t,e)}}function OA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4fv(this.addr,e),wt(t,e)}}function GA(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(Ct(t,n))return;Fh.set(n),r.uniformMatrix2fv(this.addr,!1,Fh),wt(t,n)}}function HA(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(Ct(t,n))return;Dh.set(n),r.uniformMatrix3fv(this.addr,!1,Dh),wt(t,n)}}function zA(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(Ct(t,n))return;Ph.set(n),r.uniformMatrix4fv(this.addr,!1,Ph),wt(t,n)}}function kA(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function VA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2iv(this.addr,e),wt(t,e)}}function WA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;r.uniform3iv(this.addr,e),wt(t,e)}}function XA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4iv(this.addr,e),wt(t,e)}}function JA(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function KA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2uiv(this.addr,e),wt(t,e)}}function YA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;r.uniform3uiv(this.addr,e),wt(t,e)}}function qA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4uiv(this.addr,e),wt(t,e)}}function ZA(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?hf:lf;t.setTexture2D(e||s,i)}function QA(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||df,i)}function jA(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ff,i)}function $A(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||uf,i)}function e0(r){switch(r){case 5126:return FA;case 35664:return UA;case 35665:return NA;case 35666:return OA;case 35674:return GA;case 35675:return HA;case 35676:return zA;case 5124:case 35670:return kA;case 35667:case 35671:return VA;case 35668:case 35672:return WA;case 35669:case 35673:return XA;case 5125:return JA;case 36294:return KA;case 36295:return YA;case 36296:return qA;case 35678:case 36198:case 36298:case 36306:case 35682:return ZA;case 35679:case 36299:case 36307:return QA;case 35680:case 36300:case 36308:case 36293:return jA;case 36289:case 36303:case 36311:case 36292:return $A}}function t0(r,e){r.uniform1fv(this.addr,e)}function n0(r,e){const t=Us(e,this.size,2);r.uniform2fv(this.addr,t)}function i0(r,e){const t=Us(e,this.size,3);r.uniform3fv(this.addr,t)}function s0(r,e){const t=Us(e,this.size,4);r.uniform4fv(this.addr,t)}function r0(r,e){const t=Us(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function o0(r,e){const t=Us(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function a0(r,e){const t=Us(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function c0(r,e){r.uniform1iv(this.addr,e)}function l0(r,e){r.uniform2iv(this.addr,e)}function h0(r,e){r.uniform3iv(this.addr,e)}function u0(r,e){r.uniform4iv(this.addr,e)}function d0(r,e){r.uniform1uiv(this.addr,e)}function f0(r,e){r.uniform2uiv(this.addr,e)}function p0(r,e){r.uniform3uiv(this.addr,e)}function m0(r,e){r.uniform4uiv(this.addr,e)}function g0(r,e,t){const n=this.cache,i=e.length,s=na(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),wt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||lf,s[o])}function _0(r,e,t){const n=this.cache,i=e.length,s=na(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),wt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||df,s[o])}function A0(r,e,t){const n=this.cache,i=e.length,s=na(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),wt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||ff,s[o])}function x0(r,e,t){const n=this.cache,i=e.length,s=na(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),wt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||uf,s[o])}function y0(r){switch(r){case 5126:return t0;case 35664:return n0;case 35665:return i0;case 35666:return s0;case 35674:return r0;case 35675:return o0;case 35676:return a0;case 5124:case 35670:return c0;case 35667:case 35671:return l0;case 35668:case 35672:return h0;case 35669:case 35673:return u0;case 5125:return d0;case 36294:return f0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return _0;case 35680:case 36300:case 36308:case 36293:return A0;case 36289:case 36303:case 36311:case 36292:return x0}}class v0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=e0(t.type)}}class M0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=y0(t.type)}}class S0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Ya=/(\w+)(\])?(\[|\.)?/g;function Uh(r,e){r.seq.push(e),r.map[e.id]=e}function b0(r,e,t){const n=r.name,i=n.length;for(Ya.lastIndex=0;;){const s=Ya.exec(n),o=Ya.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Uh(t,l===void 0?new v0(a,r,e):new M0(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new S0(a),Uh(t,u)),t=u}}}class Oo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);b0(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Nh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const E0=37297;let T0=0;function C0(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function w0(r){const e=ot.getPrimaries(ot.workingColorSpace),t=ot.getPrimaries(r);let n;switch(e===t?n="":e===ur&&t===hr?n="LinearDisplayP3ToLinearSRGB":e===hr&&t===ur&&(n="LinearSRGBToLinearDisplayP3"),r){case Rn:case vr:return[n,"LinearTransferOETF"];case St:case jo:return[n,"sRGBTransferOETF"];default:return[n,"LinearTransferOETF"]}}function Oh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+C0(r.getShaderSource(e),o)}else return i}function R0(r,e){const t=w0(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function B0(r,e){let t;switch(e){case Ed:t="Linear";break;case Td:t="Reinhard";break;case Cd:t="OptimizedCineon";break;case wd:t="ACESFilmic";break;case Bd:t="AgX";break;case Rd:t="Custom";break;default:t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function I0(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ss).join(`
`)}function L0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ss).join(`
`)}function P0(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function D0(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Ss(r){return r!==""}function Gh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const F0=/^[ \t]*#include +<([\w\d./]+)>/gm;function $c(r){return r.replace(F0,N0)}const U0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function N0(r,e){let t=Xe[e];if(t===void 0){const n=U0.get(e);if(n!==void 0)t=Xe[n];else throw new Error("Can not resolve #include <"+e+">")}return $c(t)}const O0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zh(r){return r.replace(O0,G0)}function G0(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function kh(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function H0(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===cl?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===$u?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===bn&&(e="SHADOWMAP_TYPE_VSM"),e}function z0(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Kn:case hi:e="ENVMAP_TYPE_CUBE";break;case Fs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function k0(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case hi:e="ENVMAP_MODE_REFRACTION";break}return e}function V0(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case yr:e="ENVMAP_BLENDING_MULTIPLY";break;case Sd:e="ENVMAP_BLENDING_MIX";break;case bd:e="ENVMAP_BLENDING_ADD";break}return e}function W0(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function X0(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=H0(t),l=z0(t),h=k0(t),u=V0(t),d=W0(t),f=t.isWebGL2?"":I0(t),p=L0(t),_=P0(s),g=i.createProgram();let m,x,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ss).join(`
`),m.length>0&&(m+=`
`),x=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ss).join(`
`),x.length>0&&(x+=`
`)):(m=[kh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ss).join(`
`),x=[f,kh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Wn?B0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,R0("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ss).join(`
`)),o=$c(o),o=Gh(o,t),o=Hh(o,t),a=$c(a),a=Gh(a,t),a=Hh(a,t),o=zh(o),a=zh(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Zc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const y=A+m+o,R=A+x+a,b=Nh(i,i.VERTEX_SHADER,y),w=Nh(i,i.FRAGMENT_SHADER,R);i.attachShader(g,b),i.attachShader(g,w),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function L(W){if(r.debug.checkShaderErrors){const oe=i.getProgramInfoLog(g).trim(),P=i.getShaderInfoLog(b).trim(),O=i.getShaderInfoLog(w).trim();let k=!0,Q=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(k=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,b,w);else{const q=Oh(i,b,"vertex"),J=Oh(i,w,"fragment")}else oe!==""||(P===""||O==="")&&(Q=!1);Q&&(W.diagnostics={runnable:k,programLog:oe,vertexShader:{log:P,prefix:m},fragmentShader:{log:O,prefix:x}})}i.deleteShader(b),i.deleteShader(w),v=new Oo(i,g),S=D0(i,g)}let v;this.getUniforms=function(){return v===void 0&&L(this),v};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=i.getProgramParameter(g,E0)),F},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=T0++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=w,this}let J0=0;class K0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Y0(e),t.set(e,n)),n}}class Y0{constructor(e){this.id=J0++,this.code=e,this.usedTimes=0}}function q0(r,e,t,n,i,s,o){const a=new ea,c=new K0,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return v===0?"uv":`uv${v}`}function g(v,S,F,W,oe){const P=W.fog,O=oe.geometry,k=v.isMeshStandardMaterial?W.environment:null,Q=(v.isMeshStandardMaterial?t:e).get(v.envMap||k),q=Q&&Q.mapping===Fs?Q.image.height:null,J=p[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),v.precision);const $=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,te=$!==void 0?$.length:0;let fe=0;O.morphAttributes.position!==void 0&&(fe=1),O.morphAttributes.normal!==void 0&&(fe=2),O.morphAttributes.color!==void 0&&(fe=3);let V,ne,me,be;if(J){const _t=dn[J];V=_t.vertexShader,ne=_t.fragmentShader}else V=v.vertexShader,ne=v.fragmentShader,c.update(v),me=c.getVertexShaderID(v),be=c.getFragmentShaderID(v);const ve=r.getRenderTarget(),Fe=oe.isInstancedMesh===!0,He=oe.isBatchedMesh===!0,Ce=!!v.map,Ne=!!v.matcap,B=!!Q,ce=!!v.aoMap,K=!!v.lightMap,ae=!!v.bumpMap,Y=!!v.normalMap,we=!!v.displacementMap,ge=!!v.emissiveMap,E=!!v.metalnessMap,M=!!v.roughnessMap,N=v.anisotropy>0,ie=v.clearcoat>0,ee=v.iridescence>0,j=v.sheen>0,Ee=v.transmission>0,ue=N&&!!v.anisotropyMap,xe=ie&&!!v.clearcoatMap,Ie=ie&&!!v.clearcoatNormalMap,ze=ie&&!!v.clearcoatRoughnessMap,se=ee&&!!v.iridescenceMap,et=ee&&!!v.iridescenceThicknessMap,Ye=j&&!!v.sheenColorMap,Oe=j&&!!v.sheenRoughnessMap,Be=!!v.specularMap,Me=!!v.specularColorMap,I=!!v.specularIntensityMap,Z=Ee&&!!v.transmissionMap,Ae=Ee&&!!v.thicknessMap,_e=!!v.gradientMap,re=!!v.alphaMap,D=v.alphaTest>0,le=!!v.alphaHash,pe=!!v.extensions,De=!!O.attributes.uv1,Te=!!O.attributes.uv2,je=!!O.attributes.uv3;let st=Wn;return v.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(st=r.toneMapping),{isWebGL2:h,shaderID:J,shaderType:v.type,shaderName:v.name,vertexShader:V,fragmentShader:ne,defines:v.defines,customVertexShaderID:me,customFragmentShaderID:be,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:He,instancing:Fe,instancingColor:Fe&&oe.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:ve===null?r.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:Rn,map:Ce,matcap:Ne,envMap:B,envMapMode:B&&Q.mapping,envMapCubeUVHeight:q,aoMap:ce,lightMap:K,bumpMap:ae,normalMap:Y,displacementMap:d&&we,emissiveMap:ge,normalMapObjectSpace:Y&&v.normalMapType===Jd,normalMapTangentSpace:Y&&v.normalMapType===fi,metalnessMap:E,roughnessMap:M,anisotropy:N,anisotropyMap:ue,clearcoat:ie,clearcoatMap:xe,clearcoatNormalMap:Ie,clearcoatRoughnessMap:ze,iridescence:ee,iridescenceMap:se,iridescenceThicknessMap:et,sheen:j,sheenColorMap:Ye,sheenRoughnessMap:Oe,specularMap:Be,specularColorMap:Me,specularIntensityMap:I,transmission:Ee,transmissionMap:Z,thicknessMap:Ae,gradientMap:_e,opaque:v.transparent===!1&&v.blending===Oi,alphaMap:re,alphaTest:D,alphaHash:le,combine:v.combine,mapUv:Ce&&_(v.map.channel),aoMapUv:ce&&_(v.aoMap.channel),lightMapUv:K&&_(v.lightMap.channel),bumpMapUv:ae&&_(v.bumpMap.channel),normalMapUv:Y&&_(v.normalMap.channel),displacementMapUv:we&&_(v.displacementMap.channel),emissiveMapUv:ge&&_(v.emissiveMap.channel),metalnessMapUv:E&&_(v.metalnessMap.channel),roughnessMapUv:M&&_(v.roughnessMap.channel),anisotropyMapUv:ue&&_(v.anisotropyMap.channel),clearcoatMapUv:xe&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:et&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ye&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&_(v.sheenRoughnessMap.channel),specularMapUv:Be&&_(v.specularMap.channel),specularColorMapUv:Me&&_(v.specularColorMap.channel),specularIntensityMapUv:I&&_(v.specularIntensityMap.channel),transmissionMapUv:Z&&_(v.transmissionMap.channel),thicknessMapUv:Ae&&_(v.thicknessMap.channel),alphaMapUv:re&&_(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Y||N),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:De,vertexUv2s:Te,vertexUv3s:je,pointsUvs:oe.isPoints===!0&&!!O.attributes.uv&&(Ce||re),fog:!!P,useFog:v.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:oe.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:fe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:st,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Ce&&v.map.isVideoTexture===!0&&ot.getTransfer(v.map.colorSpace)===at,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===fn,flipSided:v.side===Xt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:pe&&v.extensions.derivatives===!0,extensionFragDepth:pe&&v.extensions.fragDepth===!0,extensionDrawBuffers:pe&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:pe&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:pe&&v.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function m(v){const S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(const F in v.defines)S.push(F),S.push(v.defines[F]);return v.isRawShaderMaterial===!1&&(x(S,v),A(S,v),S.push(r.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function x(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function A(v,S){a.disableAll(),S.isWebGL2&&a.enable(0),S.supportsVertexTextures&&a.enable(1),S.instancing&&a.enable(2),S.instancingColor&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),v.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.skinning&&a.enable(4),S.morphTargets&&a.enable(5),S.morphNormals&&a.enable(6),S.morphColors&&a.enable(7),S.premultipliedAlpha&&a.enable(8),S.shadowMapEnabled&&a.enable(9),S.useLegacyLights&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),v.push(a.mask)}function y(v){const S=p[v.type];let F;if(S){const W=dn[S];F=Wo.clone(W.uniforms)}else F=v.uniforms;return F}function R(v,S){let F;for(let W=0,oe=l.length;W<oe;W++){const P=l[W];if(P.cacheKey===S){F=P,++F.usedTimes;break}}return F===void 0&&(F=new X0(r,S,v,s),l.push(F)),F}function b(v){if(--v.usedTimes===0){const S=l.indexOf(v);l[S]=l[l.length-1],l.pop(),v.destroy()}}function w(v){c.remove(v)}function L(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:R,releaseProgram:b,releaseShaderCache:w,programs:l,dispose:L}}function Z0(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Q0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Vh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Wh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,p,_,g){let m=r[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:_,group:g},r[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=_,m.group=g),e++,m}function a(u,d,f,p,_,g){const m=o(u,d,f,p,_,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function c(u,d,f,p,_,g){const m=o(u,d,f,p,_,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function l(u,d){t.length>1&&t.sort(u||Q0),n.length>1&&n.sort(d||Vh),i.length>1&&i.sort(d||Vh)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function j0(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Wh,r.set(n,[o])):i>=s.length?(o=new Wh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function $0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new de};break;case"SpotLight":t={position:new T,direction:new T,color:new de,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new de,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new de,groundColor:new de};break;case"RectAreaLight":t={color:new de,position:new T,halfWidth:new T,halfHeight:new T};break}return r[e.id]=t,t}}}function ex(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new X};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new X};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new X,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let tx=0;function nx(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function ix(r,e){const t=new $0,n=ex(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new T);const s=new T,o=new Pe,a=new Pe;function c(h,u){let d=0,f=0,p=0;for(let W=0;W<9;W++)i.probe[W].set(0,0,0);let _=0,g=0,m=0,x=0,A=0,y=0,R=0,b=0,w=0,L=0,v=0;h.sort(nx);const S=u===!0?Math.PI:1;for(let W=0,oe=h.length;W<oe;W++){const P=h[W],O=P.color,k=P.intensity,Q=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=O.r*k*S,f+=O.g*k*S,p+=O.b*k*S;else if(P.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(P.sh.coefficients[J],k);v++}else if(P.isDirectionalLight){const J=t.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity*S),P.castShadow){const $=P.shadow,te=n.get(P);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.directionalShadow[_]=te,i.directionalShadowMap[_]=q,i.directionalShadowMatrix[_]=P.shadow.matrix,y++}i.directional[_]=J,_++}else if(P.isSpotLight){const J=t.get(P);J.position.setFromMatrixPosition(P.matrixWorld),J.color.copy(O).multiplyScalar(k*S),J.distance=Q,J.coneCos=Math.cos(P.angle),J.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),J.decay=P.decay,i.spot[m]=J;const $=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,$.updateMatrices(P),P.castShadow&&L++),i.spotLightMatrix[m]=$.matrix,P.castShadow){const te=n.get(P);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.spotShadow[m]=te,i.spotShadowMap[m]=q,b++}m++}else if(P.isRectAreaLight){const J=t.get(P);J.color.copy(O).multiplyScalar(k),J.halfWidth.set(P.width*.5,0,0),J.halfHeight.set(0,P.height*.5,0),i.rectArea[x]=J,x++}else if(P.isPointLight){const J=t.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity*S),J.distance=P.distance,J.decay=P.decay,P.castShadow){const $=P.shadow,te=n.get(P);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,te.shadowCameraNear=$.camera.near,te.shadowCameraFar=$.camera.far,i.pointShadow[g]=te,i.pointShadowMap[g]=q,i.pointShadowMatrix[g]=P.shadow.matrix,R++}i.point[g]=J,g++}else if(P.isHemisphereLight){const J=t.get(P);J.skyColor.copy(P.color).multiplyScalar(k*S),J.groundColor.copy(P.groundColor).multiplyScalar(k*S),i.hemi[A]=J,A++}}x>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0&&(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=p;const F=i.hash;(F.directionalLength!==_||F.pointLength!==g||F.spotLength!==m||F.rectAreaLength!==x||F.hemiLength!==A||F.numDirectionalShadows!==y||F.numPointShadows!==R||F.numSpotShadows!==b||F.numSpotMaps!==w||F.numLightProbes!==v)&&(i.directional.length=_,i.spot.length=m,i.rectArea.length=x,i.point.length=g,i.hemi.length=A,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=b+w-L,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=v,F.directionalLength=_,F.pointLength=g,F.spotLength=m,F.rectAreaLength=x,F.hemiLength=A,F.numDirectionalShadows=y,F.numPointShadows=R,F.numSpotShadows=b,F.numSpotMaps=w,F.numLightProbes=v,i.version=tx++)}function l(h,u){let d=0,f=0,p=0,_=0,g=0;const m=u.matrixWorldInverse;for(let x=0,A=h.length;x<A;x++){const y=h[x];if(y.isDirectionalLight){const R=i.directional[d];R.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(m),d++}else if(y.isSpotLight){const R=i.spot[p];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const R=i.rectArea[_];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(m),a.identity(),o.copy(y.matrixWorld),o.premultiply(m),a.extractRotation(o),R.halfWidth.set(y.width*.5,0,0),R.halfHeight.set(0,y.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const R=i.point[f];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const R=i.hemi[g];R.direction.setFromMatrixPosition(y.matrixWorld),R.direction.transformDirection(m),g++}}}return{setup:c,setupView:l,state:i}}function Xh(r,e){const t=new ix(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function sx(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let c;return a===void 0?(c=new Xh(r,e),t.set(s,[c])):o>=a.length?(c=new Xh(r,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}class wl extends Tt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rl extends Tt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const rx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ox=`uniform sampler2D shadow_pass;
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
}`;function ax(r,e,t){let n=new br;const i=new X,s=new X,o=new nt,a=new wl({depthPacking:Xd}),c=new Rl,l={},h=t.maxTextureSize,u={[Cn]:Xt,[Xt]:Cn,[fn]:fn},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new X},radius:{value:4}},vertexShader:rx,fragmentShader:ox}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new ke;p.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new vt(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cl;let m=this.type;this.render=function(b,w,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const v=r.getRenderTarget(),S=r.getActiveCubeFace(),F=r.getActiveMipmapLevel(),W=r.state;W.setBlending(Vn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const oe=m!==bn&&this.type===bn,P=m===bn&&this.type!==bn;for(let O=0,k=b.length;O<k;O++){const Q=b[O],q=Q.shadow;if(q===void 0||q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const J=q.getFrameExtents();if(i.multiply(J),s.copy(q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/J.x),i.x=s.x*J.x,q.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/J.y),i.y=s.y*J.y,q.mapSize.y=s.y)),q.map===null||oe===!0||P===!0){const te=this.type!==bn?{minFilter:mt,magFilter:mt}:{};q.map!==null&&q.map.dispose(),q.map=new gn(i.x,i.y,te),q.map.texture.name=Q.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const $=q.getViewportCount();for(let te=0;te<$;te++){const fe=q.getViewport(te);o.set(s.x*fe.x,s.y*fe.y,s.x*fe.z,s.y*fe.w),W.viewport(o),q.updateMatrices(Q,te),n=q.getFrustum(),y(w,L,q.camera,Q,this.type)}q.isPointLightShadow!==!0&&this.type===bn&&x(q,L),q.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(v,S,F)};function x(b,w){const L=e.update(_);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new gn(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(w,null,L,d,_,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(w,null,L,f,_,null)}function A(b,w,L,v){let S=null;const F=L.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(F!==void 0)S=F;else if(S=L.isPointLight===!0?c:a,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const W=S.uuid,oe=w.uuid;let P=l[W];P===void 0&&(P={},l[W]=P);let O=P[oe];O===void 0&&(O=S.clone(),P[oe]=O,w.addEventListener("dispose",R)),S=O}if(S.visible=w.visible,S.wireframe=w.wireframe,v===bn?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:u[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const W=r.properties.get(S);W.light=L}return S}function y(b,w,L,v,S){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===bn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,b.matrixWorld);const oe=e.update(b),P=b.material;if(Array.isArray(P)){const O=oe.groups;for(let k=0,Q=O.length;k<Q;k++){const q=O[k],J=P[q.materialIndex];if(J&&J.visible){const $=A(b,J,v,S);b.onBeforeShadow(r,b,w,L,oe,$,q),r.renderBufferDirect(L,null,oe,$,b,q),b.onAfterShadow(r,b,w,L,oe,$,q)}}}else if(P.visible){const O=A(b,P,v,S);b.onBeforeShadow(r,b,w,L,oe,O,null),r.renderBufferDirect(L,null,oe,O,b,null),b.onAfterShadow(r,b,w,L,oe,O,null)}}const W=b.children;for(let oe=0,P=W.length;oe<P;oe++)y(W[oe],w,L,v,S)}function R(b){b.target.removeEventListener("dispose",R);for(const L in l){const v=l[L],S=b.target.uuid;S in v&&(v[S].dispose(),delete v[S])}}}function cx(r,e,t){const n=t.isWebGL2;function i(){let D=!1;const le=new nt;let pe=null;const De=new nt(0,0,0,0);return{setMask:function(Te){pe!==Te&&!D&&(r.colorMask(Te,Te,Te,Te),pe=Te)},setLocked:function(Te){D=Te},setClear:function(Te,je,st,ct,_t){_t===!0&&(Te*=ct,je*=ct,st*=ct),le.set(Te,je,st,ct),De.equals(le)===!1&&(r.clearColor(Te,je,st,ct),De.copy(le))},reset:function(){D=!1,pe=null,De.set(-1,0,0,0)}}}function s(){let D=!1,le=null,pe=null,De=null;return{setTest:function(Te){Te?He(r.DEPTH_TEST):Ce(r.DEPTH_TEST)},setMask:function(Te){le!==Te&&!D&&(r.depthMask(Te),le=Te)},setFunc:function(Te){if(pe!==Te){switch(Te){case gd:r.depthFunc(r.NEVER);break;case _d:r.depthFunc(r.ALWAYS);break;case Ad:r.depthFunc(r.LESS);break;case sr:r.depthFunc(r.LEQUAL);break;case xd:r.depthFunc(r.EQUAL);break;case yd:r.depthFunc(r.GEQUAL);break;case vd:r.depthFunc(r.GREATER);break;case Md:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}pe=Te}},setLocked:function(Te){D=Te},setClear:function(Te){De!==Te&&(r.clearDepth(Te),De=Te)},reset:function(){D=!1,le=null,pe=null,De=null}}}function o(){let D=!1,le=null,pe=null,De=null,Te=null,je=null,st=null,ct=null,_t=null;return{setTest:function(rt){D||(rt?He(r.STENCIL_TEST):Ce(r.STENCIL_TEST))},setMask:function(rt){le!==rt&&!D&&(r.stencilMask(rt),le=rt)},setFunc:function(rt,kt,vn){(pe!==rt||De!==kt||Te!==vn)&&(r.stencilFunc(rt,kt,vn),pe=rt,De=kt,Te=vn)},setOp:function(rt,kt,vn){(je!==rt||st!==kt||ct!==vn)&&(r.stencilOp(rt,kt,vn),je=rt,st=kt,ct=vn)},setLocked:function(rt){D=rt},setClear:function(rt){_t!==rt&&(r.clearStencil(rt),_t=rt)},reset:function(){D=!1,le=null,pe=null,De=null,Te=null,je=null,st=null,ct=null,_t=null}}}const a=new i,c=new s,l=new o,h=new WeakMap,u=new WeakMap;let d={},f={},p=new WeakMap,_=[],g=null,m=!1,x=null,A=null,y=null,R=null,b=null,w=null,L=null,v=new de(0,0,0),S=0,F=!1,W=null,oe=null,P=null,O=null,k=null;const Q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,J=0;const $=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec($)[1]),q=J>=1):$.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),q=J>=2);let te=null,fe={};const V=r.getParameter(r.SCISSOR_BOX),ne=r.getParameter(r.VIEWPORT),me=new nt().fromArray(V),be=new nt().fromArray(ne);function ve(D,le,pe,De){const Te=new Uint8Array(4),je=r.createTexture();r.bindTexture(D,je),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let st=0;st<pe;st++)n&&(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)?r.texImage3D(le,0,r.RGBA,1,1,De,0,r.RGBA,r.UNSIGNED_BYTE,Te):r.texImage2D(le+st,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Te);return je}const Fe={};Fe[r.TEXTURE_2D]=ve(r.TEXTURE_2D,r.TEXTURE_2D,1),Fe[r.TEXTURE_CUBE_MAP]=ve(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Fe[r.TEXTURE_2D_ARRAY]=ve(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Fe[r.TEXTURE_3D]=ve(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),He(r.DEPTH_TEST),c.setFunc(sr),ge(!1),E(_c),He(r.CULL_FACE),Y(Vn);function He(D){d[D]!==!0&&(r.enable(D),d[D]=!0)}function Ce(D){d[D]!==!1&&(r.disable(D),d[D]=!1)}function Ne(D,le){return f[D]!==le?(r.bindFramebuffer(D,le),f[D]=le,n&&(D===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=le),D===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=le)),!0):!1}function B(D,le){let pe=_,De=!1;if(D)if(pe=p.get(le),pe===void 0&&(pe=[],p.set(le,pe)),D.isWebGLMultipleRenderTargets){const Te=D.texture;if(pe.length!==Te.length||pe[0]!==r.COLOR_ATTACHMENT0){for(let je=0,st=Te.length;je<st;je++)pe[je]=r.COLOR_ATTACHMENT0+je;pe.length=Te.length,De=!0}}else pe[0]!==r.COLOR_ATTACHMENT0&&(pe[0]=r.COLOR_ATTACHMENT0,De=!0);else pe[0]!==r.BACK&&(pe[0]=r.BACK,De=!0);De&&(t.isWebGL2?r.drawBuffers(pe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(pe))}function ce(D){return g!==D?(r.useProgram(D),g=D,!0):!1}const K={[si]:r.FUNC_ADD,[td]:r.FUNC_SUBTRACT,[nd]:r.FUNC_REVERSE_SUBTRACT};if(n)K[vc]=r.MIN,K[Mc]=r.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(K[vc]=D.MIN_EXT,K[Mc]=D.MAX_EXT)}const ae={[id]:r.ZERO,[sd]:r.ONE,[rd]:r.SRC_COLOR,[Go]:r.SRC_ALPHA,[ud]:r.SRC_ALPHA_SATURATE,[ld]:r.DST_COLOR,[ad]:r.DST_ALPHA,[od]:r.ONE_MINUS_SRC_COLOR,[Ho]:r.ONE_MINUS_SRC_ALPHA,[hd]:r.ONE_MINUS_DST_COLOR,[cd]:r.ONE_MINUS_DST_ALPHA,[dd]:r.CONSTANT_COLOR,[fd]:r.ONE_MINUS_CONSTANT_COLOR,[pd]:r.CONSTANT_ALPHA,[md]:r.ONE_MINUS_CONSTANT_ALPHA};function Y(D,le,pe,De,Te,je,st,ct,_t,rt){if(D===Vn){m===!0&&(Ce(r.BLEND),m=!1);return}if(m===!1&&(He(r.BLEND),m=!0),D!==ed){if(D!==x||rt!==F){if((A!==si||b!==si)&&(r.blendEquation(r.FUNC_ADD),A=si,b=si),rt)switch(D){case Oi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ac:r.blendFunc(r.ONE,r.ONE);break;case xc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yc:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:break}else switch(D){case Oi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ac:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case xc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yc:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:break}y=null,R=null,w=null,L=null,v.set(0,0,0),S=0,x=D,F=rt}return}Te=Te||le,je=je||pe,st=st||De,(le!==A||Te!==b)&&(r.blendEquationSeparate(K[le],K[Te]),A=le,b=Te),(pe!==y||De!==R||je!==w||st!==L)&&(r.blendFuncSeparate(ae[pe],ae[De],ae[je],ae[st]),y=pe,R=De,w=je,L=st),(ct.equals(v)===!1||_t!==S)&&(r.blendColor(ct.r,ct.g,ct.b,_t),v.copy(ct),S=_t),x=D,F=!1}function we(D,le){D.side===fn?Ce(r.CULL_FACE):He(r.CULL_FACE);let pe=D.side===Xt;le&&(pe=!pe),ge(pe),D.blending===Oi&&D.transparent===!1?Y(Vn):Y(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),a.setMask(D.colorWrite);const De=D.stencilWrite;l.setTest(De),De&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),N(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?He(r.SAMPLE_ALPHA_TO_COVERAGE):Ce(r.SAMPLE_ALPHA_TO_COVERAGE)}function ge(D){W!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),W=D)}function E(D){D!==Qu?(He(r.CULL_FACE),D!==oe&&(D===_c?r.cullFace(r.BACK):D===ju?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ce(r.CULL_FACE),oe=D}function M(D){D!==P&&(q&&r.lineWidth(D),P=D)}function N(D,le,pe){D?(He(r.POLYGON_OFFSET_FILL),(O!==le||k!==pe)&&(r.polygonOffset(le,pe),O=le,k=pe)):Ce(r.POLYGON_OFFSET_FILL)}function ie(D){D?He(r.SCISSOR_TEST):Ce(r.SCISSOR_TEST)}function ee(D){D===void 0&&(D=r.TEXTURE0+Q-1),te!==D&&(r.activeTexture(D),te=D)}function j(D,le,pe){pe===void 0&&(te===null?pe=r.TEXTURE0+Q-1:pe=te);let De=fe[pe];De===void 0&&(De={type:void 0,texture:void 0},fe[pe]=De),(De.type!==D||De.texture!==le)&&(te!==pe&&(r.activeTexture(pe),te=pe),r.bindTexture(D,le||Fe[D]),De.type=D,De.texture=le)}function Ee(){const D=fe[te];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ue(){try{r.compressedTexImage2D.apply(r,arguments)}catch{}}function xe(){try{r.compressedTexImage3D.apply(r,arguments)}catch{}}function Ie(){try{r.texSubImage2D.apply(r,arguments)}catch{}}function ze(){try{r.texSubImage3D.apply(r,arguments)}catch{}}function se(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch{}}function et(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch{}}function Ye(){try{r.texStorage2D.apply(r,arguments)}catch{}}function Oe(){try{r.texStorage3D.apply(r,arguments)}catch{}}function Be(){try{r.texImage2D.apply(r,arguments)}catch{}}function Me(){try{r.texImage3D.apply(r,arguments)}catch{}}function I(D){me.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),me.copy(D))}function Z(D){be.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),be.copy(D))}function Ae(D,le){let pe=u.get(le);pe===void 0&&(pe=new WeakMap,u.set(le,pe));let De=pe.get(D);De===void 0&&(De=r.getUniformBlockIndex(le,D.name),pe.set(D,De))}function _e(D,le){const De=u.get(le).get(D);h.get(le)!==De&&(r.uniformBlockBinding(le,De,D.__bindingPointIndex),h.set(le,De))}function re(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},te=null,fe={},f={},p=new WeakMap,_=[],g=null,m=!1,x=null,A=null,y=null,R=null,b=null,w=null,L=null,v=new de(0,0,0),S=0,F=!1,W=null,oe=null,P=null,O=null,k=null,me.set(0,0,r.canvas.width,r.canvas.height),be.set(0,0,r.canvas.width,r.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:He,disable:Ce,bindFramebuffer:Ne,drawBuffers:B,useProgram:ce,setBlending:Y,setMaterial:we,setFlipSided:ge,setCullFace:E,setLineWidth:M,setPolygonOffset:N,setScissorTest:ie,activeTexture:ee,bindTexture:j,unbindTexture:Ee,compressedTexImage2D:ue,compressedTexImage3D:xe,texImage2D:Be,texImage3D:Me,updateUBOMapping:Ae,uniformBlockBinding:_e,texStorage2D:Ye,texStorage3D:Oe,texSubImage2D:Ie,texSubImage3D:ze,compressedTexSubImage2D:se,compressedTexSubImage3D:et,scissor:I,viewport:Z,reset:re}}function lx(r,e,t,n,i,s,o){const a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(E,M){return f?new OffscreenCanvas(E,M):fr("canvas")}function _(E,M,N,ie){let ee=1;if((E.width>ie||E.height>ie)&&(ee=ie/Math.max(E.width,E.height)),ee<1||M===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const j=M?Vo:Math.floor,Ee=j(ee*E.width),ue=j(ee*E.height);u===void 0&&(u=p(Ee,ue));const xe=N?p(Ee,ue):u;return xe.width=Ee,xe.height=ue,xe.getContext("2d").drawImage(E,0,0,Ee,ue),xe}else return"data"in E,E;return E}function g(E){return Qc(E.width)&&Qc(E.height)}function m(E){return a?!1:E.wrapS!==Ft||E.wrapT!==Ft||E.minFilter!==mt&&E.minFilter!==ht}function x(E,M){return E.generateMipmaps&&M&&E.minFilter!==mt&&E.minFilter!==ht}function A(E){r.generateMipmap(E)}function y(E,M,N,ie,ee=!1){if(a===!1)return M;if(E!==null&&r[E]!==void 0)return r[E];let j=M;if(M===r.RED&&(N===r.FLOAT&&(j=r.R32F),N===r.HALF_FLOAT&&(j=r.R16F),N===r.UNSIGNED_BYTE&&(j=r.R8)),M===r.RED_INTEGER&&(N===r.UNSIGNED_BYTE&&(j=r.R8UI),N===r.UNSIGNED_SHORT&&(j=r.R16UI),N===r.UNSIGNED_INT&&(j=r.R32UI),N===r.BYTE&&(j=r.R8I),N===r.SHORT&&(j=r.R16I),N===r.INT&&(j=r.R32I)),M===r.RG&&(N===r.FLOAT&&(j=r.RG32F),N===r.HALF_FLOAT&&(j=r.RG16F),N===r.UNSIGNED_BYTE&&(j=r.RG8)),M===r.RGBA){const Ee=ee?lr:ot.getTransfer(ie);N===r.FLOAT&&(j=r.RGBA32F),N===r.HALF_FLOAT&&(j=r.RGBA16F),N===r.UNSIGNED_BYTE&&(j=Ee===at?r.SRGB8_ALPHA8:r.RGBA8),N===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),N===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function R(E,M,N){return x(E,N)===!0||E.isFramebufferTexture&&E.minFilter!==mt&&E.minFilter!==ht?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function b(E){return E===mt||E===ar||E===Es?r.NEAREST:r.LINEAR}function w(E){const M=E.target;M.removeEventListener("dispose",w),v(M),M.isVideoTexture&&h.delete(M)}function L(E){const M=E.target;M.removeEventListener("dispose",L),F(M)}function v(E){const M=n.get(E);if(M.__webglInit===void 0)return;const N=E.source,ie=d.get(N);if(ie){const ee=ie[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&S(E),Object.keys(ie).length===0&&d.delete(N)}n.remove(E)}function S(E){const M=n.get(E);r.deleteTexture(M.__webglTexture);const N=E.source,ie=d.get(N);delete ie[M.__cacheKey],o.memory.textures--}function F(E){const M=E.texture,N=n.get(E),ie=n.get(M);if(ie.__webglTexture!==void 0&&(r.deleteTexture(ie.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(N.__webglFramebuffer[ee]))for(let j=0;j<N.__webglFramebuffer[ee].length;j++)r.deleteFramebuffer(N.__webglFramebuffer[ee][j]);else r.deleteFramebuffer(N.__webglFramebuffer[ee]);N.__webglDepthbuffer&&r.deleteRenderbuffer(N.__webglDepthbuffer[ee])}else{if(Array.isArray(N.__webglFramebuffer))for(let ee=0;ee<N.__webglFramebuffer.length;ee++)r.deleteFramebuffer(N.__webglFramebuffer[ee]);else r.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&r.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&r.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let ee=0;ee<N.__webglColorRenderbuffer.length;ee++)N.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(N.__webglColorRenderbuffer[ee]);N.__webglDepthRenderbuffer&&r.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let ee=0,j=M.length;ee<j;ee++){const Ee=n.get(M[ee]);Ee.__webglTexture&&(r.deleteTexture(Ee.__webglTexture),o.memory.textures--),n.remove(M[ee])}n.remove(M),n.remove(E)}let W=0;function oe(){W=0}function P(){const E=W;return E>=i.maxTextures,W+=1,E}function O(E){const M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.wrapR||0),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.colorSpace),M.join()}function k(E,M){const N=n.get(E);if(E.isVideoTexture&&we(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){const ie=E.image;if(ie!==null){if(ie.complete!==!1){me(N,E,M);return}}}t.bindTexture(r.TEXTURE_2D,N.__webglTexture,r.TEXTURE0+M)}function Q(E,M){const N=n.get(E);if(E.version>0&&N.__version!==E.version){me(N,E,M);return}t.bindTexture(r.TEXTURE_2D_ARRAY,N.__webglTexture,r.TEXTURE0+M)}function q(E,M){const N=n.get(E);if(E.version>0&&N.__version!==E.version){me(N,E,M);return}t.bindTexture(r.TEXTURE_3D,N.__webglTexture,r.TEXTURE0+M)}function J(E,M){const N=n.get(E);if(E.version>0&&N.__version!==E.version){be(N,E,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+M)}const $={[ui]:r.REPEAT,[Ft]:r.CLAMP_TO_EDGE,[ws]:r.MIRRORED_REPEAT},te={[mt]:r.NEAREST,[ar]:r.NEAREST_MIPMAP_NEAREST,[Es]:r.NEAREST_MIPMAP_LINEAR,[ht]:r.LINEAR,[qo]:r.LINEAR_MIPMAP_NEAREST,[wn]:r.LINEAR_MIPMAP_LINEAR},fe={[Kd]:r.NEVER,[$d]:r.ALWAYS,[Yd]:r.LESS,[xl]:r.LEQUAL,[qd]:r.EQUAL,[jd]:r.GEQUAL,[Zd]:r.GREATER,[Qd]:r.NOTEQUAL};function V(E,M,N){if(N?(r.texParameteri(E,r.TEXTURE_WRAP_S,$[M.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,$[M.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,$[M.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,te[M.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,te[M.minFilter])):(r.texParameteri(E,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(E,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),M.wrapS!==Ft||M.wrapT,r.texParameteri(E,r.TEXTURE_MAG_FILTER,b(M.magFilter)),r.texParameteri(E,r.TEXTURE_MIN_FILTER,b(M.minFilter)),M.minFilter!==mt&&M.minFilter),M.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,fe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ie=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===mt||M.minFilter!==Es&&M.minFilter!==wn||M.type===pn&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===Rs&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(r.texParameterf(E,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function ne(E,M){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",w));const ie=M.source;let ee=d.get(ie);ee===void 0&&(ee={},d.set(ie,ee));const j=O(M);if(j!==E.__cacheKey){ee[j]===void 0&&(ee[j]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,N=!0),ee[j].usedTimes++;const Ee=ee[E.__cacheKey];Ee!==void 0&&(ee[E.__cacheKey].usedTimes--,Ee.usedTimes===0&&S(M)),E.__cacheKey=j,E.__webglTexture=ee[j].texture}return N}function me(E,M,N){let ie=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ie=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ie=r.TEXTURE_3D);const ee=ne(E,M),j=M.source;t.bindTexture(ie,E.__webglTexture,r.TEXTURE0+N);const Ee=n.get(j);if(j.version!==Ee.__version||ee===!0){t.activeTexture(r.TEXTURE0+N);const ue=ot.getPrimaries(ot.workingColorSpace),xe=M.colorSpace===en?null:ot.getPrimaries(M.colorSpace),Ie=M.colorSpace===en||ue===xe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const ze=m(M)&&g(M.image)===!1;let se=_(M.image,ze,!1,i.maxTextureSize);se=ge(M,se);const et=g(se)||a,Ye=s.convert(M.format,M.colorSpace);let Oe=s.convert(M.type),Be=y(M.internalFormat,Ye,Oe,M.colorSpace,M.isVideoTexture);V(ie,M,et);let Me;const I=M.mipmaps,Z=a&&M.isVideoTexture!==!0&&Be!==ml,Ae=Ee.__version===void 0||ee===!0,_e=R(M,se,et);if(M.isDepthTexture)Be=r.DEPTH_COMPONENT,a?M.type===pn?Be=r.DEPTH_COMPONENT32F:M.type===Hn?Be=r.DEPTH_COMPONENT24:M.type===ri?Be=r.DEPTH24_STENCIL8:Be=r.DEPTH_COMPONENT16:M.type,M.format===oi&&Be===r.DEPTH_COMPONENT&&M.type!==Zo&&M.type!==Hn&&(M.type=Hn,Oe=s.convert(M.type)),M.format===Vi&&Be===r.DEPTH_COMPONENT&&(Be=r.DEPTH_STENCIL,M.type!==ri&&(M.type=ri,Oe=s.convert(M.type))),Ae&&(Z?t.texStorage2D(r.TEXTURE_2D,1,Be,se.width,se.height):t.texImage2D(r.TEXTURE_2D,0,Be,se.width,se.height,0,Ye,Oe,null));else if(M.isDataTexture)if(I.length>0&&et){Z&&Ae&&t.texStorage2D(r.TEXTURE_2D,_e,Be,I[0].width,I[0].height);for(let re=0,D=I.length;re<D;re++)Me=I[re],Z?t.texSubImage2D(r.TEXTURE_2D,re,0,0,Me.width,Me.height,Ye,Oe,Me.data):t.texImage2D(r.TEXTURE_2D,re,Be,Me.width,Me.height,0,Ye,Oe,Me.data);M.generateMipmaps=!1}else Z?(Ae&&t.texStorage2D(r.TEXTURE_2D,_e,Be,se.width,se.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,se.width,se.height,Ye,Oe,se.data)):t.texImage2D(r.TEXTURE_2D,0,Be,se.width,se.height,0,Ye,Oe,se.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Z&&Ae&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Be,I[0].width,I[0].height,se.depth);for(let re=0,D=I.length;re<D;re++)Me=I[re],M.format!==Yt?Ye!==null&&(Z?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,Me.width,Me.height,se.depth,Ye,Me.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,re,Be,Me.width,Me.height,se.depth,0,Me.data,0,0)):Z?t.texSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,Me.width,Me.height,se.depth,Ye,Oe,Me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,re,Be,Me.width,Me.height,se.depth,0,Ye,Oe,Me.data)}else{Z&&Ae&&t.texStorage2D(r.TEXTURE_2D,_e,Be,I[0].width,I[0].height);for(let re=0,D=I.length;re<D;re++)Me=I[re],M.format!==Yt?Ye!==null&&(Z?t.compressedTexSubImage2D(r.TEXTURE_2D,re,0,0,Me.width,Me.height,Ye,Me.data):t.compressedTexImage2D(r.TEXTURE_2D,re,Be,Me.width,Me.height,0,Me.data)):Z?t.texSubImage2D(r.TEXTURE_2D,re,0,0,Me.width,Me.height,Ye,Oe,Me.data):t.texImage2D(r.TEXTURE_2D,re,Be,Me.width,Me.height,0,Ye,Oe,Me.data)}else if(M.isDataArrayTexture)Z?(Ae&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Be,se.width,se.height,se.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,Ye,Oe,se.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Be,se.width,se.height,se.depth,0,Ye,Oe,se.data);else if(M.isData3DTexture)Z?(Ae&&t.texStorage3D(r.TEXTURE_3D,_e,Be,se.width,se.height,se.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,Ye,Oe,se.data)):t.texImage3D(r.TEXTURE_3D,0,Be,se.width,se.height,se.depth,0,Ye,Oe,se.data);else if(M.isFramebufferTexture){if(Ae)if(Z)t.texStorage2D(r.TEXTURE_2D,_e,Be,se.width,se.height);else{let re=se.width,D=se.height;for(let le=0;le<_e;le++)t.texImage2D(r.TEXTURE_2D,le,Be,re,D,0,Ye,Oe,null),re>>=1,D>>=1}}else if(I.length>0&&et){Z&&Ae&&t.texStorage2D(r.TEXTURE_2D,_e,Be,I[0].width,I[0].height);for(let re=0,D=I.length;re<D;re++)Me=I[re],Z?t.texSubImage2D(r.TEXTURE_2D,re,0,0,Ye,Oe,Me):t.texImage2D(r.TEXTURE_2D,re,Be,Ye,Oe,Me);M.generateMipmaps=!1}else Z?(Ae&&t.texStorage2D(r.TEXTURE_2D,_e,Be,se.width,se.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ye,Oe,se)):t.texImage2D(r.TEXTURE_2D,0,Be,Ye,Oe,se);x(M,et)&&A(ie),Ee.__version=j.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function be(E,M,N){if(M.image.length!==6)return;const ie=ne(E,M),ee=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+N);const j=n.get(ee);if(ee.version!==j.__version||ie===!0){t.activeTexture(r.TEXTURE0+N);const Ee=ot.getPrimaries(ot.workingColorSpace),ue=M.colorSpace===en?null:ot.getPrimaries(M.colorSpace),xe=M.colorSpace===en||Ee===ue?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Ie=M.isCompressedTexture||M.image[0].isCompressedTexture,ze=M.image[0]&&M.image[0].isDataTexture,se=[];for(let re=0;re<6;re++)!Ie&&!ze?se[re]=_(M.image[re],!1,!0,i.maxCubemapSize):se[re]=ze?M.image[re].image:M.image[re],se[re]=ge(M,se[re]);const et=se[0],Ye=g(et)||a,Oe=s.convert(M.format,M.colorSpace),Be=s.convert(M.type),Me=y(M.internalFormat,Oe,Be,M.colorSpace),I=a&&M.isVideoTexture!==!0,Z=j.__version===void 0||ie===!0;let Ae=R(M,et,Ye);V(r.TEXTURE_CUBE_MAP,M,Ye);let _e;if(Ie){I&&Z&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ae,Me,et.width,et.height);for(let re=0;re<6;re++){_e=se[re].mipmaps;for(let D=0;D<_e.length;D++){const le=_e[D];M.format!==Yt?Oe!==null&&(I?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,D,0,0,le.width,le.height,Oe,le.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,D,Me,le.width,le.height,0,le.data)):I?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,D,0,0,le.width,le.height,Oe,Be,le.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,D,Me,le.width,le.height,0,Oe,Be,le.data)}}}else{_e=M.mipmaps,I&&Z&&(_e.length>0&&Ae++,t.texStorage2D(r.TEXTURE_CUBE_MAP,Ae,Me,se[0].width,se[0].height));for(let re=0;re<6;re++)if(ze){I?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,se[re].width,se[re].height,Oe,Be,se[re].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Me,se[re].width,se[re].height,0,Oe,Be,se[re].data);for(let D=0;D<_e.length;D++){const pe=_e[D].image[re].image;I?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,D+1,0,0,pe.width,pe.height,Oe,Be,pe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,D+1,Me,pe.width,pe.height,0,Oe,Be,pe.data)}}else{I?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Oe,Be,se[re]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Me,Oe,Be,se[re]);for(let D=0;D<_e.length;D++){const le=_e[D];I?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,D+1,0,0,Oe,Be,le.image[re]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,D+1,Me,Oe,Be,le.image[re])}}}x(M,Ye)&&A(r.TEXTURE_CUBE_MAP),j.__version=ee.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function ve(E,M,N,ie,ee,j){const Ee=s.convert(N.format,N.colorSpace),ue=s.convert(N.type),xe=y(N.internalFormat,Ee,ue,N.colorSpace);if(!n.get(M).__hasExternalTextures){const ze=Math.max(1,M.width>>j),se=Math.max(1,M.height>>j);ee===r.TEXTURE_3D||ee===r.TEXTURE_2D_ARRAY?t.texImage3D(ee,j,xe,ze,se,M.depth,0,Ee,ue,null):t.texImage2D(ee,j,xe,ze,se,0,Ee,ue,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),Y(M)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ie,ee,n.get(N).__webglTexture,0,ae(M)):(ee===r.TEXTURE_2D||ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ie,ee,n.get(N).__webglTexture,j),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Fe(E,M,N){if(r.bindRenderbuffer(r.RENDERBUFFER,E),M.depthBuffer&&!M.stencilBuffer){let ie=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(N||Y(M)){const ee=M.depthTexture;ee&&ee.isDepthTexture&&(ee.type===pn?ie=r.DEPTH_COMPONENT32F:ee.type===Hn&&(ie=r.DEPTH_COMPONENT24));const j=ae(M);Y(M)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,j,ie,M.width,M.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,j,ie,M.width,M.height)}else r.renderbufferStorage(r.RENDERBUFFER,ie,M.width,M.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,E)}else if(M.depthBuffer&&M.stencilBuffer){const ie=ae(M);N&&Y(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,r.DEPTH24_STENCIL8,M.width,M.height):Y(M)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,r.DEPTH24_STENCIL8,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,E)}else{const ie=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let ee=0;ee<ie.length;ee++){const j=ie[ee],Ee=s.convert(j.format,j.colorSpace),ue=s.convert(j.type),xe=y(j.internalFormat,Ee,ue,j.colorSpace),Ie=ae(M);N&&Y(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,xe,M.width,M.height):Y(M)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ie,xe,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,xe,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function He(E,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),k(M.depthTexture,0);const ie=n.get(M.depthTexture).__webglTexture,ee=ae(M);if(M.depthTexture.format===oi)Y(M)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0);else if(M.depthTexture.format===Vi)Y(M)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ce(E){const M=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!M.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");He(M.__webglFramebuffer,E)}else if(N){M.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[ie]),M.__webglDepthbuffer[ie]=r.createRenderbuffer(),Fe(M.__webglDepthbuffer[ie],E,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=r.createRenderbuffer(),Fe(M.__webglDepthbuffer,E,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ne(E,M,N){const ie=n.get(E);M!==void 0&&ve(ie.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),N!==void 0&&Ce(E)}function B(E){const M=E.texture,N=n.get(E),ie=n.get(M);E.addEventListener("dispose",L),E.isWebGLMultipleRenderTargets!==!0&&(ie.__webglTexture===void 0&&(ie.__webglTexture=r.createTexture()),ie.__version=M.version,o.memory.textures++);const ee=E.isWebGLCubeRenderTarget===!0,j=E.isWebGLMultipleRenderTargets===!0,Ee=g(E)||a;if(ee){N.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(a&&M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer[ue]=[];for(let xe=0;xe<M.mipmaps.length;xe++)N.__webglFramebuffer[ue][xe]=r.createFramebuffer()}else N.__webglFramebuffer[ue]=r.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer=[];for(let ue=0;ue<M.mipmaps.length;ue++)N.__webglFramebuffer[ue]=r.createFramebuffer()}else N.__webglFramebuffer=r.createFramebuffer();if(j&&i.drawBuffers){const ue=E.texture;for(let xe=0,Ie=ue.length;xe<Ie;xe++){const ze=n.get(ue[xe]);ze.__webglTexture===void 0&&(ze.__webglTexture=r.createTexture(),o.memory.textures++)}}if(a&&E.samples>0&&Y(E)===!1){const ue=j?M:[M];N.__webglMultisampledFramebuffer=r.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let xe=0;xe<ue.length;xe++){const Ie=ue[xe];N.__webglColorRenderbuffer[xe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,N.__webglColorRenderbuffer[xe]);const ze=s.convert(Ie.format,Ie.colorSpace),se=s.convert(Ie.type),et=y(Ie.internalFormat,ze,se,Ie.colorSpace,E.isXRRenderTarget===!0),Ye=ae(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ye,et,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,N.__webglColorRenderbuffer[xe])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=r.createRenderbuffer(),Fe(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ee){t.bindTexture(r.TEXTURE_CUBE_MAP,ie.__webglTexture),V(r.TEXTURE_CUBE_MAP,M,Ee);for(let ue=0;ue<6;ue++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let xe=0;xe<M.mipmaps.length;xe++)ve(N.__webglFramebuffer[ue][xe],E,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,xe);else ve(N.__webglFramebuffer[ue],E,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);x(M,Ee)&&A(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(j){const ue=E.texture;for(let xe=0,Ie=ue.length;xe<Ie;xe++){const ze=ue[xe],se=n.get(ze);t.bindTexture(r.TEXTURE_2D,se.__webglTexture),V(r.TEXTURE_2D,ze,Ee),ve(N.__webglFramebuffer,E,ze,r.COLOR_ATTACHMENT0+xe,r.TEXTURE_2D,0),x(ze,Ee)&&A(r.TEXTURE_2D)}t.unbindTexture()}else{let ue=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&a&&(ue=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ue,ie.__webglTexture),V(ue,M,Ee),a&&M.mipmaps&&M.mipmaps.length>0)for(let xe=0;xe<M.mipmaps.length;xe++)ve(N.__webglFramebuffer[xe],E,M,r.COLOR_ATTACHMENT0,ue,xe);else ve(N.__webglFramebuffer,E,M,r.COLOR_ATTACHMENT0,ue,0);x(M,Ee)&&A(ue),t.unbindTexture()}E.depthBuffer&&Ce(E)}function ce(E){const M=g(E)||a,N=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ie=0,ee=N.length;ie<ee;ie++){const j=N[ie];if(x(j,M)){const Ee=E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ue=n.get(j).__webglTexture;t.bindTexture(Ee,ue),A(Ee),t.unbindTexture()}}}function K(E){if(a&&E.samples>0&&Y(E)===!1){const M=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],N=E.width,ie=E.height;let ee=r.COLOR_BUFFER_BIT;const j=[],Ee=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ue=n.get(E),xe=E.isWebGLMultipleRenderTargets===!0;if(xe)for(let Ie=0;Ie<M.length;Ie++)t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let Ie=0;Ie<M.length;Ie++){j.push(r.COLOR_ATTACHMENT0+Ie),E.depthBuffer&&j.push(Ee);const ze=ue.__ignoreDepthValues!==void 0?ue.__ignoreDepthValues:!1;if(ze===!1&&(E.depthBuffer&&(ee|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&(ee|=r.STENCIL_BUFFER_BIT)),xe&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ue.__webglColorRenderbuffer[Ie]),ze===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Ee]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Ee])),xe){const se=n.get(M[Ie]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,se,0)}r.blitFramebuffer(0,0,N,ie,0,0,N,ie,ee,r.NEAREST),l&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,j)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),xe)for(let Ie=0;Ie<M.length;Ie++){t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,ue.__webglColorRenderbuffer[Ie]);const ze=n.get(M[Ie]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,ze,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}}function ae(E){return Math.min(i.maxSamples,E.samples)}function Y(E){const M=n.get(E);return a&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function we(E){const M=o.render.frame;h.get(E)!==M&&(h.set(E,M),E.update())}function ge(E,M){const N=E.colorSpace,ie=E.format,ee=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===ko||N!==Rn&&N!==en&&ot.getTransfer(N)===at&&a===!1&&(e.has("EXT_sRGB")===!0&&ie===Yt?(E.format=ko,E.minFilter=ht,E.generateMipmaps=!1):M=Ml.sRGBToLinear(M)),M}this.allocateTextureUnit=P,this.resetTextureUnits=oe,this.setTexture2D=k,this.setTexture2DArray=Q,this.setTexture3D=q,this.setTextureCube=J,this.rebindTextures=Ne,this.setupRenderTarget=B,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=K,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Y}function pf(r,e,t){const n=t.isWebGL2;function i(s,o=en){let a;const c=ot.getTransfer(o);if(s===Xn)return r.UNSIGNED_BYTE;if(s===hl)return r.UNSIGNED_SHORT_4_4_4_4;if(s===ul)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Ld)return r.BYTE;if(s===Pd)return r.SHORT;if(s===Zo)return r.UNSIGNED_SHORT;if(s===ll)return r.INT;if(s===Hn)return r.UNSIGNED_INT;if(s===pn)return r.FLOAT;if(s===Rs)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Dd)return r.ALPHA;if(s===Yt)return r.RGBA;if(s===Fd)return r.LUMINANCE;if(s===Ud)return r.LUMINANCE_ALPHA;if(s===oi)return r.DEPTH_COMPONENT;if(s===Vi)return r.DEPTH_STENCIL;if(s===ko)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Nd)return r.RED;if(s===dl)return r.RED_INTEGER;if(s===Od)return r.RG;if(s===fl)return r.RG_INTEGER;if(s===pl)return r.RGBA_INTEGER;if(s===Lo||s===Po||s===Do||s===Fo)if(c===at)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Lo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Po)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Do)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Fo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Lo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Po)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Do)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Fo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===bc||s===Ec||s===Tc||s===Cc)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===bc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ec)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Tc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Cc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===ml)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===wc||s===Rc)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===wc)return c===at?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Rc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Bc||s===Ic||s===Lc||s===Pc||s===Dc||s===Fc||s===Uc||s===Nc||s===Oc||s===Gc||s===Hc||s===zc||s===kc||s===Vc)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Bc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ic)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Lc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Pc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Dc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Fc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Uc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Nc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Oc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Gc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Hc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===zc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===kc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Vc)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Uo||s===Wc||s===Xc)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Uo)return c===at?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Wc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Xc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Gd||s===Jc||s===Kc||s===Yc)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Uo)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Jc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Kc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Yc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ri?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class mf extends yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class zn extends it{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hx={type:"move"};class qa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(l,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;l.inputState.pinching&&d>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(hx)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new zn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ux extends qn{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,p=null;const _=t.getContextAttributes();let g=null,m=null;const x=[],A=[],y=new X;let R=null;const b=new yt;b.layers.enable(1),b.viewport=new nt;const w=new yt;w.layers.enable(2),w.viewport=new nt;const L=[b,w],v=new mf;v.layers.enable(1),v.layers.enable(2);let S=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let ne=x[V];return ne===void 0&&(ne=new qa,x[V]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(V){let ne=x[V];return ne===void 0&&(ne=new qa,x[V]=ne),ne.getGripSpace()},this.getHand=function(V){let ne=x[V];return ne===void 0&&(ne=new qa,x[V]=ne),ne.getHandSpace()};function W(V){const ne=A.indexOf(V.inputSource);if(ne===-1)return;const me=x[ne];me!==void 0&&(me.update(V.inputSource,V.frame,l||o),me.dispatchEvent({type:V.type,data:V.inputSource}))}function oe(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",oe),i.removeEventListener("inputsourceschange",P);for(let V=0;V<x.length;V++){const ne=A[V];ne!==null&&(A[V]=null,x[V].disconnect(ne))}S=null,F=null,e.setRenderTarget(g),f=null,d=null,u=null,i=null,m=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(y.width,y.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,n.isPresenting},this.setReferenceSpaceType=function(V){a=V,n.isPresenting},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(V){if(i=V,i!==null){if(g=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",oe),i.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(y),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ne={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,ne),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new gn(f.framebufferWidth,f.framebufferHeight,{format:Yt,type:Xn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let ne=null,me=null,be=null;_.depth&&(be=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=_.stencil?Vi:oi,me=_.stencil?ri:Hn);const ve={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(ve),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),m=new gn(d.textureWidth,d.textureHeight,{format:Yt,type:Xn,depthTexture:new Cl(d.textureWidth,d.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Fe=e.properties.get(m);Fe.__ignoreDepthValues=d.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),fe.setContext(i),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(V){for(let ne=0;ne<V.removed.length;ne++){const me=V.removed[ne],be=A.indexOf(me);be>=0&&(A[be]=null,x[be].disconnect(me))}for(let ne=0;ne<V.added.length;ne++){const me=V.added[ne];let be=A.indexOf(me);if(be===-1){for(let Fe=0;Fe<x.length;Fe++)if(Fe>=A.length){A.push(me),be=Fe;break}else if(A[Fe]===null){A[Fe]=me,be=Fe;break}if(be===-1)break}const ve=x[be];ve&&ve.connect(me)}}const O=new T,k=new T;function Q(V,ne,me){O.setFromMatrixPosition(ne.matrixWorld),k.setFromMatrixPosition(me.matrixWorld);const be=O.distanceTo(k),ve=ne.projectionMatrix.elements,Fe=me.projectionMatrix.elements,He=ve[14]/(ve[10]-1),Ce=ve[14]/(ve[10]+1),Ne=(ve[9]+1)/ve[5],B=(ve[9]-1)/ve[5],ce=(ve[8]-1)/ve[0],K=(Fe[8]+1)/Fe[0],ae=He*ce,Y=He*K,we=be/(-ce+K),ge=we*-ce;ne.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(ge),V.translateZ(we),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const E=He+we,M=Ce+we,N=ae-ge,ie=Y+(be-ge),ee=Ne*Ce/M*E,j=B*Ce/M*E;V.projectionMatrix.makePerspective(N,ie,ee,j,E,M),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function q(V,ne){ne===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(ne.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(i===null)return;v.near=w.near=b.near=V.near,v.far=w.far=b.far=V.far,(S!==v.near||F!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),S=v.near,F=v.far);const ne=V.parent,me=v.cameras;q(v,ne);for(let be=0;be<me.length;be++)q(me[be],ne);me.length===2?Q(v,b,w):v.projectionMatrix.copy(b.projectionMatrix),J(V,v,ne)};function J(V,ne,me){me===null?V.matrix.copy(ne.matrixWorld):(V.matrix.copy(me.matrixWorld),V.matrix.invert(),V.matrix.multiply(ne.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(ne.projectionMatrix),V.projectionMatrixInverse.copy(ne.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Ls*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(V){c=V,d!==null&&(d.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)};let $=null;function te(V,ne){if(h=ne.getViewerPose(l||o),p=ne,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(m,f.framebuffer),e.setRenderTarget(m));let be=!1;me.length!==v.cameras.length&&(v.cameras.length=0,be=!0);for(let ve=0;ve<me.length;ve++){const Fe=me[ve];let He=null;if(f!==null)He=f.getViewport(Fe);else{const Ne=u.getViewSubImage(d,Fe);He=Ne.viewport,ve===0&&(e.setRenderTargetTextures(m,Ne.colorTexture,d.ignoreDepthValues?void 0:Ne.depthStencilTexture),e.setRenderTarget(m))}let Ce=L[ve];Ce===void 0&&(Ce=new yt,Ce.layers.enable(ve),Ce.viewport=new nt,L[ve]=Ce),Ce.matrix.fromArray(Fe.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(Fe.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(He.x,He.y,He.width,He.height),ve===0&&(v.matrix.copy(Ce.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),be===!0&&v.cameras.push(Ce)}}for(let me=0;me<x.length;me++){const be=A[me],ve=x[me];be!==null&&ve!==void 0&&ve.update(be,ne,l||o)}$&&$(V,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),p=null}const fe=new cf;fe.setAnimationLoop(te),this.setAnimationLoop=function(V){$=V},this.dispose=function(){}}}function dx(r,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,rf(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,x,A,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,x,A):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Xt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Xt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=e.get(m).envMap;if(x&&(g.envMap.value=x,g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap){g.lightMap.value=m.lightMap;const A=r._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=m.lightMapIntensity*A,t(m.lightMap,g.lightMapTransform)}m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,x,A){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=A*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),e.get(m).envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Xt&&g.clearcoatNormalScale.value.negate())),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const x=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function fx(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,A){const y=A.program;n.uniformBlockBinding(x,y)}function l(x,A){let y=i[x.id];y===void 0&&(p(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",g));const R=A.program;n.updateUBOMapping(x,R);const b=e.render.frame;s[x.id]!==b&&(d(x),s[x.id]=b)}function h(x){const A=u();x.__bindingPointIndex=A;const y=r.createBuffer(),R=x.__size,b=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,R,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,A,y),y}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return 0}function d(x){const A=i[x.id],y=x.uniforms,R=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,A);for(let b=0,w=y.length;b<w;b++){const L=Array.isArray(y[b])?y[b]:[y[b]];for(let v=0,S=L.length;v<S;v++){const F=L[v];if(f(F,b,v,R)===!0){const W=F.__offset,oe=Array.isArray(F.value)?F.value:[F.value];let P=0;for(let O=0;O<oe.length;O++){const k=oe[O],Q=_(k);typeof k=="number"||typeof k=="boolean"?(F.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,W+P,F.__data)):k.isMatrix3?(F.__data[0]=k.elements[0],F.__data[1]=k.elements[1],F.__data[2]=k.elements[2],F.__data[3]=0,F.__data[4]=k.elements[3],F.__data[5]=k.elements[4],F.__data[6]=k.elements[5],F.__data[7]=0,F.__data[8]=k.elements[6],F.__data[9]=k.elements[7],F.__data[10]=k.elements[8],F.__data[11]=0):(k.toArray(F.__data,P),P+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,W,F.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,A,y,R){const b=x.value,w=A+"_"+y;if(R[w]===void 0)return typeof b=="number"||typeof b=="boolean"?R[w]=b:R[w]=b.clone(),!0;{const L=R[w];if(typeof b=="number"||typeof b=="boolean"){if(L!==b)return R[w]=b,!0}else if(L.equals(b)===!1)return L.copy(b),!0}return!1}function p(x){const A=x.uniforms;let y=0;const R=16;for(let w=0,L=A.length;w<L;w++){const v=Array.isArray(A[w])?A[w]:[A[w]];for(let S=0,F=v.length;S<F;S++){const W=v[S],oe=Array.isArray(W.value)?W.value:[W.value];for(let P=0,O=oe.length;P<O;P++){const k=oe[P],Q=_(k),q=y%R;q!==0&&R-q<Q.boundary&&(y+=R-q),W.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=y,y+=Q.storage}}}const b=y%R;return b>0&&(y+=R-b),x.__size=y,x.__cache={},this}function _(x){const A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture,A}function g(x){const A=x.target;A.removeEventListener("dispose",g);const y=o.indexOf(A.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[A.id]),delete i[A.id],delete s[A.id]}function m(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:c,update:l,dispose:m}}class gf{constructor(e={}){const{canvas:t=tf(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),p=new Int32Array(4);let _=null,g=null;const m=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=St,this._useLegacyLights=!1,this.toneMapping=Wn,this.toneMappingExposure=1;const A=this;let y=!1,R=0,b=0,w=null,L=-1,v=null;const S=new nt,F=new nt;let W=null;const oe=new de(0);let P=0,O=t.width,k=t.height,Q=1,q=null,J=null;const $=new nt(0,0,O,k),te=new nt(0,0,O,k);let fe=!1;const V=new br;let ne=!1,me=!1,be=null;const ve=new Pe,Fe=new X,He=new T,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ne(){return w===null?Q:1}let B=n;function ce(C,U){for(let H=0;H<C.length;H++){const z=C[H],G=t.getContext(z,U);if(G!==null)return G}return null}try{const C={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xr}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",le,!1),B===null){const U=["webgl2","webgl","experimental-webgl"];if(A.isWebGL1Renderer===!0&&U.shift(),B=ce(U,C),B===null)throw ce(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext,B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw C}let K,ae,Y,we,ge,E,M,N,ie,ee,j,Ee,ue,xe,Ie,ze,se,et,Ye,Oe,Be,Me,I,Z;function Ae(){K=new CA(B),ae=new vA(B,K,e),K.init(ae),Me=new pf(B,K,ae),Y=new cx(B,K,ae),we=new BA(B),ge=new Z0,E=new lx(B,K,Y,ge,ae,Me,we),M=new SA(A),N=new TA(A),ie=new Om(B,ae),I=new xA(B,K,ie,ae),ee=new wA(B,ie,we,I),j=new DA(B,ee,ie,we),Ye=new PA(B,ae,E),ze=new MA(ge),Ee=new q0(A,M,N,K,ae,I,ze),ue=new dx(A,ge),xe=new j0,Ie=new sx(K,ae),et=new AA(A,M,N,Y,j,d,c),se=new ax(A,j,ae),Z=new fx(B,we,ae,Y),Oe=new yA(B,K,we,ae),Be=new RA(B,K,we,ae),we.programs=Ee.programs,A.capabilities=ae,A.extensions=K,A.properties=ge,A.renderLists=xe,A.shadowMap=se,A.state=Y,A.info=we}Ae();const _e=new ux(A,B);this.xr=_e,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const C=K.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=K.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(C){C!==void 0&&(Q=C,this.setSize(O,k,!1))},this.getSize=function(C){return C.set(O,k)},this.setSize=function(C,U,H=!0){_e.isPresenting||(O=C,k=U,t.width=Math.floor(C*Q),t.height=Math.floor(U*Q),H===!0&&(t.style.width=C+"px",t.style.height=U+"px"),this.setViewport(0,0,C,U))},this.getDrawingBufferSize=function(C){return C.set(O*Q,k*Q).floor()},this.setDrawingBufferSize=function(C,U,H){O=C,k=U,Q=H,t.width=Math.floor(C*H),t.height=Math.floor(U*H),this.setViewport(0,0,C,U)},this.getCurrentViewport=function(C){return C.copy(S)},this.getViewport=function(C){return C.copy($)},this.setViewport=function(C,U,H,z){C.isVector4?$.set(C.x,C.y,C.z,C.w):$.set(C,U,H,z),Y.viewport(S.copy($).multiplyScalar(Q).floor())},this.getScissor=function(C){return C.copy(te)},this.setScissor=function(C,U,H,z){C.isVector4?te.set(C.x,C.y,C.z,C.w):te.set(C,U,H,z),Y.scissor(F.copy(te).multiplyScalar(Q).floor())},this.getScissorTest=function(){return fe},this.setScissorTest=function(C){Y.setScissorTest(fe=C)},this.setOpaqueSort=function(C){q=C},this.setTransparentSort=function(C){J=C},this.getClearColor=function(C){return C.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor.apply(et,arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha.apply(et,arguments)},this.clear=function(C=!0,U=!0,H=!0){let z=0;if(C){let G=!1;if(w!==null){const ye=w.texture.format;G=ye===pl||ye===fl||ye===dl}if(G){const ye=w.texture.type,Re=ye===Xn||ye===Hn||ye===Zo||ye===ri||ye===hl||ye===ul,Ue=et.getClearColor(),Ge=et.getClearAlpha(),qe=Ue.r,Ve=Ue.g,We=Ue.b;Re?(f[0]=qe,f[1]=Ve,f[2]=We,f[3]=Ge,B.clearBufferuiv(B.COLOR,0,f)):(p[0]=qe,p[1]=Ve,p[2]=We,p[3]=Ge,B.clearBufferiv(B.COLOR,0,p))}else z|=B.COLOR_BUFFER_BIT}U&&(z|=B.DEPTH_BUFFER_BIT),H&&(z|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",le,!1),xe.dispose(),Ie.dispose(),ge.dispose(),M.dispose(),N.dispose(),j.dispose(),I.dispose(),Z.dispose(),Ee.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",_t),_e.removeEventListener("sessionend",rt),be&&(be.dispose(),be=null),kt.stop()};function re(C){C.preventDefault(),y=!0}function D(){y=!1;const C=we.autoReset,U=se.enabled,H=se.autoUpdate,z=se.needsUpdate,G=se.type;Ae(),we.autoReset=C,se.enabled=U,se.autoUpdate=H,se.needsUpdate=z,se.type=G}function le(C){}function pe(C){const U=C.target;U.removeEventListener("dispose",pe),De(U)}function De(C){Te(C),ge.remove(C)}function Te(C){const U=ge.get(C).programs;U!==void 0&&(U.forEach(function(H){Ee.releaseProgram(H)}),C.isShaderMaterial&&Ee.releaseShaderCache(C))}this.renderBufferDirect=function(C,U,H,z,G,ye){U===null&&(U=Ce);const Re=G.isMesh&&G.matrixWorld.determinant()<0,Ue=dp(C,U,H,z,G);Y.setMaterial(z,Re);let Ge=H.index,qe=1;if(z.wireframe===!0){if(Ge=ee.getWireframeAttribute(H),Ge===void 0)return;qe=2}const Ve=H.drawRange,We=H.attributes.position;let At=Ve.start*qe,Qt=(Ve.start+Ve.count)*qe;ye!==null&&(At=Math.max(At,ye.start*qe),Qt=Math.min(Qt,(ye.start+ye.count)*qe)),Ge!==null?(At=Math.max(At,0),Qt=Math.min(Qt,Ge.count)):We!=null&&(At=Math.max(At,0),Qt=Math.min(Qt,We.count));const Rt=Qt-At;if(Rt<0||Rt===1/0)return;I.setup(G,z,Ue,H,Ge);let Bn,lt=Oe;if(Ge!==null&&(Bn=ie.get(Ge),lt=Be,lt.setIndex(Bn)),G.isMesh)z.wireframe===!0?(Y.setLineWidth(z.wireframeLinewidth*Ne()),lt.setMode(B.LINES)):lt.setMode(B.TRIANGLES);else if(G.isLine){let Ze=z.linewidth;Ze===void 0&&(Ze=1),Y.setLineWidth(Ze*Ne()),G.isLineSegments?lt.setMode(B.LINES):G.isLineLoop?lt.setMode(B.LINE_LOOP):lt.setMode(B.LINE_STRIP)}else G.isPoints?lt.setMode(B.POINTS):G.isSprite&&lt.setMode(B.TRIANGLES);if(G.isBatchedMesh)lt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)lt.renderInstances(At,Rt,G.count);else if(H.isInstancedBufferGeometry){const Ze=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Sa=Math.min(H.instanceCount,Ze);lt.renderInstances(At,Rt,Sa)}else lt.render(At,Rt)};function je(C,U,H){C.transparent===!0&&C.side===fn&&C.forceSinglePass===!1?(C.side=Xt,C.needsUpdate=!0,Pr(C,U,H),C.side=Cn,C.needsUpdate=!0,Pr(C,U,H),C.side=fn):Pr(C,U,H)}this.compile=function(C,U,H=null){H===null&&(H=C),g=Ie.get(H),g.init(),x.push(g),H.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(g.pushLight(G),G.castShadow&&g.pushShadow(G))}),C!==H&&C.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(g.pushLight(G),G.castShadow&&g.pushShadow(G))}),g.setupLights(A._useLegacyLights);const z=new Set;return C.traverse(function(G){const ye=G.material;if(ye)if(Array.isArray(ye))for(let Re=0;Re<ye.length;Re++){const Ue=ye[Re];je(Ue,H,G),z.add(Ue)}else je(ye,H,G),z.add(ye)}),x.pop(),g=null,z},this.compileAsync=function(C,U,H=null){const z=this.compile(C,U,H);return new Promise(G=>{function ye(){if(z.forEach(function(Re){ge.get(Re).currentProgram.isReady()&&z.delete(Re)}),z.size===0){G(C);return}setTimeout(ye,10)}K.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let st=null;function ct(C){st&&st(C)}function _t(){kt.stop()}function rt(){kt.start()}const kt=new cf;kt.setAnimationLoop(ct),typeof self<"u"&&kt.setContext(self),this.setAnimationLoop=function(C){st=C,_e.setAnimationLoop(C),C===null?kt.stop():kt.start()},_e.addEventListener("sessionstart",_t),_e.addEventListener("sessionend",rt),this.render=function(C,U){if(U!==void 0&&U.isCamera!==!0||y===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(U),U=_e.getCamera()),C.isScene===!0&&C.onBeforeRender(A,C,U,w),g=Ie.get(C,x.length),g.init(),x.push(g),ve.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),V.setFromProjectionMatrix(ve),me=this.localClippingEnabled,ne=ze.init(this.clippingPlanes,me),_=xe.get(C,m.length),_.init(),m.push(_),vn(C,U,0,A.sortObjects),_.finish(),A.sortObjects===!0&&_.sort(q,J),this.info.render.frame++,ne===!0&&ze.beginShadows();const H=g.state.shadowsArray;if(se.render(H,C,U),ne===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),et.render(_,C),g.setupLights(A._useLegacyLights),U.isArrayCamera){const z=U.cameras;for(let G=0,ye=z.length;G<ye;G++){const Re=z[G];nh(_,C,Re,Re.viewport)}}else nh(_,C,U);w!==null&&(E.updateMultisampleRenderTarget(w),E.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(A,C,U),I.resetDefaultState(),L=-1,v=null,x.pop(),x.length>0?g=x[x.length-1]:g=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function vn(C,U,H,z){if(C.visible===!1)return;if(C.layers.test(U.layers)){if(C.isGroup)H=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(U);else if(C.isLight)g.pushLight(C),C.castShadow&&g.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||V.intersectsSprite(C)){z&&He.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ve);const Re=j.update(C),Ue=C.material;Ue.visible&&_.push(C,Re,Ue,H,He.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||V.intersectsObject(C))){const Re=j.update(C),Ue=C.material;if(z&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),He.copy(C.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),He.copy(Re.boundingSphere.center)),He.applyMatrix4(C.matrixWorld).applyMatrix4(ve)),Array.isArray(Ue)){const Ge=Re.groups;for(let qe=0,Ve=Ge.length;qe<Ve;qe++){const We=Ge[qe],At=Ue[We.materialIndex];At&&At.visible&&_.push(C,Re,At,H,He.z,We)}}else Ue.visible&&_.push(C,Re,Ue,H,He.z,null)}}const ye=C.children;for(let Re=0,Ue=ye.length;Re<Ue;Re++)vn(ye[Re],U,H,z)}function nh(C,U,H,z){const G=C.opaque,ye=C.transmissive,Re=C.transparent;g.setupLightsView(H),ne===!0&&ze.setGlobalState(A.clippingPlanes,H),ye.length>0&&up(G,ye,U,H),z&&Y.viewport(S.copy(z)),G.length>0&&Lr(G,U,H),ye.length>0&&Lr(ye,U,H),Re.length>0&&Lr(Re,U,H),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function up(C,U,H,z){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const ye=ae.isWebGL2;be===null&&(be=new gn(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")?Rs:Xn,minFilter:wn,samples:ye?4:0})),A.getDrawingBufferSize(Fe),ye?be.setSize(Fe.x,Fe.y):be.setSize(Vo(Fe.x),Vo(Fe.y));const Re=A.getRenderTarget();A.setRenderTarget(be),A.getClearColor(oe),P=A.getClearAlpha(),P<1&&A.setClearColor(16777215,.5),A.clear();const Ue=A.toneMapping;A.toneMapping=Wn,Lr(C,H,z),E.updateMultisampleRenderTarget(be),E.updateRenderTargetMipmap(be);let Ge=!1;for(let qe=0,Ve=U.length;qe<Ve;qe++){const We=U[qe],At=We.object,Qt=We.geometry,Rt=We.material,Bn=We.group;if(Rt.side===fn&&At.layers.test(z.layers)){const lt=Rt.side;Rt.side=Xt,Rt.needsUpdate=!0,ih(At,H,z,Qt,Rt,Bn),Rt.side=lt,Rt.needsUpdate=!0,Ge=!0}}Ge===!0&&(E.updateMultisampleRenderTarget(be),E.updateRenderTargetMipmap(be)),A.setRenderTarget(Re),A.setClearColor(oe,P),A.toneMapping=Ue}function Lr(C,U,H){const z=U.isScene===!0?U.overrideMaterial:null;for(let G=0,ye=C.length;G<ye;G++){const Re=C[G],Ue=Re.object,Ge=Re.geometry,qe=z===null?Re.material:z,Ve=Re.group;Ue.layers.test(H.layers)&&ih(Ue,U,H,Ge,qe,Ve)}}function ih(C,U,H,z,G,ye){C.onBeforeRender(A,U,H,z,G,ye),C.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),G.onBeforeRender(A,U,H,z,C,ye),G.transparent===!0&&G.side===fn&&G.forceSinglePass===!1?(G.side=Xt,G.needsUpdate=!0,A.renderBufferDirect(H,U,z,G,C,ye),G.side=Cn,G.needsUpdate=!0,A.renderBufferDirect(H,U,z,G,C,ye),G.side=fn):A.renderBufferDirect(H,U,z,G,C,ye),C.onAfterRender(A,U,H,z,G,ye)}function Pr(C,U,H){U.isScene!==!0&&(U=Ce);const z=ge.get(C),G=g.state.lights,ye=g.state.shadowsArray,Re=G.state.version,Ue=Ee.getParameters(C,G.state,ye,U,H),Ge=Ee.getProgramCacheKey(Ue);let qe=z.programs;z.environment=C.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(C.isMeshStandardMaterial?N:M).get(C.envMap||z.environment),qe===void 0&&(C.addEventListener("dispose",pe),qe=new Map,z.programs=qe);let Ve=qe.get(Ge);if(Ve!==void 0){if(z.currentProgram===Ve&&z.lightsStateVersion===Re)return rh(C,Ue),Ve}else Ue.uniforms=Ee.getUniforms(C),C.onBuild(H,Ue,A),C.onBeforeCompile(Ue,A),Ve=Ee.acquireProgram(Ue,Ge),qe.set(Ge,Ve),z.uniforms=Ue.uniforms;const We=z.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(We.clippingPlanes=ze.uniform),rh(C,Ue),z.needsLights=pp(C),z.lightsStateVersion=Re,z.needsLights&&(We.ambientLightColor.value=G.state.ambient,We.lightProbe.value=G.state.probe,We.directionalLights.value=G.state.directional,We.directionalLightShadows.value=G.state.directionalShadow,We.spotLights.value=G.state.spot,We.spotLightShadows.value=G.state.spotShadow,We.rectAreaLights.value=G.state.rectArea,We.ltc_1.value=G.state.rectAreaLTC1,We.ltc_2.value=G.state.rectAreaLTC2,We.pointLights.value=G.state.point,We.pointLightShadows.value=G.state.pointShadow,We.hemisphereLights.value=G.state.hemi,We.directionalShadowMap.value=G.state.directionalShadowMap,We.directionalShadowMatrix.value=G.state.directionalShadowMatrix,We.spotShadowMap.value=G.state.spotShadowMap,We.spotLightMatrix.value=G.state.spotLightMatrix,We.spotLightMap.value=G.state.spotLightMap,We.pointShadowMap.value=G.state.pointShadowMap,We.pointShadowMatrix.value=G.state.pointShadowMatrix),z.currentProgram=Ve,z.uniformsList=null,Ve}function sh(C){if(C.uniformsList===null){const U=C.currentProgram.getUniforms();C.uniformsList=Oo.seqWithValue(U.seq,C.uniforms)}return C.uniformsList}function rh(C,U){const H=ge.get(C);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function dp(C,U,H,z,G){U.isScene!==!0&&(U=Ce),E.resetTextureUnits();const ye=U.fog,Re=z.isMeshStandardMaterial?U.environment:null,Ue=w===null?A.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Rn,Ge=(z.isMeshStandardMaterial?N:M).get(z.envMap||Re),qe=z.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ve=!!H.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),We=!!H.morphAttributes.position,At=!!H.morphAttributes.normal,Qt=!!H.morphAttributes.color;let Rt=Wn;z.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Rt=A.toneMapping);const Bn=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,lt=Bn!==void 0?Bn.length:0,Ze=ge.get(z),Sa=g.state.lights;if(ne===!0&&(me===!0||C!==v)){const rn=C===v&&z.id===L;ze.setState(z,C,rn)}let ft=!1;z.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==Sa.state.version||Ze.outputColorSpace!==Ue||G.isBatchedMesh&&Ze.batching===!1||!G.isBatchedMesh&&Ze.batching===!0||G.isInstancedMesh&&Ze.instancing===!1||!G.isInstancedMesh&&Ze.instancing===!0||G.isSkinnedMesh&&Ze.skinning===!1||!G.isSkinnedMesh&&Ze.skinning===!0||G.isInstancedMesh&&Ze.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ze.instancingColor===!1&&G.instanceColor!==null||Ze.envMap!==Ge||z.fog===!0&&Ze.fog!==ye||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==ze.numPlanes||Ze.numIntersection!==ze.numIntersection)||Ze.vertexAlphas!==qe||Ze.vertexTangents!==Ve||Ze.morphTargets!==We||Ze.morphNormals!==At||Ze.morphColors!==Qt||Ze.toneMapping!==Rt||ae.isWebGL2===!0&&Ze.morphTargetsCount!==lt)&&(ft=!0):(ft=!0,Ze.__version=z.version);let gi=Ze.currentProgram;ft===!0&&(gi=Pr(z,U,G));let oh=!1,Gs=!1,ba=!1;const Ut=gi.getUniforms(),_i=Ze.uniforms;if(Y.useProgram(gi.program)&&(oh=!0,Gs=!0,ba=!0),z.id!==L&&(L=z.id,Gs=!0),oh||v!==C){Ut.setValue(B,"projectionMatrix",C.projectionMatrix),Ut.setValue(B,"viewMatrix",C.matrixWorldInverse);const rn=Ut.map.cameraPosition;rn!==void 0&&rn.setValue(B,He.setFromMatrixPosition(C.matrixWorld)),ae.logarithmicDepthBuffer&&Ut.setValue(B,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Ut.setValue(B,"isOrthographic",C.isOrthographicCamera===!0),v!==C&&(v=C,Gs=!0,ba=!0)}if(G.isSkinnedMesh){Ut.setOptional(B,G,"bindMatrix"),Ut.setOptional(B,G,"bindMatrixInverse");const rn=G.skeleton;rn&&ae.floatVertexTextures&&(rn.boneTexture===null&&rn.computeBoneTexture(),Ut.setValue(B,"boneTexture",rn.boneTexture,E))}G.isBatchedMesh&&(Ut.setOptional(B,G,"batchingTexture"),Ut.setValue(B,"batchingTexture",G._matricesTexture,E));const Ea=H.morphAttributes;if((Ea.position!==void 0||Ea.normal!==void 0||Ea.color!==void 0&&ae.isWebGL2===!0)&&Ye.update(G,H,gi),(Gs||Ze.receiveShadow!==G.receiveShadow)&&(Ze.receiveShadow=G.receiveShadow,Ut.setValue(B,"receiveShadow",G.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(_i.envMap.value=Ge,_i.flipEnvMap.value=Ge.isCubeTexture&&Ge.isRenderTargetTexture===!1?-1:1),Gs&&(Ut.setValue(B,"toneMappingExposure",A.toneMappingExposure),Ze.needsLights&&fp(_i,ba),ye&&z.fog===!0&&ue.refreshFogUniforms(_i,ye),ue.refreshMaterialUniforms(_i,z,Q,k,be),Oo.upload(B,sh(Ze),_i,E)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Oo.upload(B,sh(Ze),_i,E),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Ut.setValue(B,"center",G.center),Ut.setValue(B,"modelViewMatrix",G.modelViewMatrix),Ut.setValue(B,"normalMatrix",G.normalMatrix),Ut.setValue(B,"modelMatrix",G.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const rn=z.uniformsGroups;for(let Ta=0,mp=rn.length;Ta<mp;Ta++)if(ae.isWebGL2){const ah=rn[Ta];Z.update(ah,gi),Z.bind(ah,gi)}}return gi}function fp(C,U){C.ambientLightColor.needsUpdate=U,C.lightProbe.needsUpdate=U,C.directionalLights.needsUpdate=U,C.directionalLightShadows.needsUpdate=U,C.pointLights.needsUpdate=U,C.pointLightShadows.needsUpdate=U,C.spotLights.needsUpdate=U,C.spotLightShadows.needsUpdate=U,C.rectAreaLights.needsUpdate=U,C.hemisphereLights.needsUpdate=U}function pp(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,U,H){ge.get(C.texture).__webglTexture=U,ge.get(C.depthTexture).__webglTexture=H;const z=ge.get(C);z.__hasExternalTextures=!0,z.__hasExternalTextures&&(z.__autoAllocateDepthBuffer=H===void 0,z.__autoAllocateDepthBuffer||K.has("WEBGL_multisampled_render_to_texture")===!0&&(z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,U){const H=ge.get(C);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(C,U=0,H=0){w=C,R=U,b=H;let z=!0,G=null,ye=!1,Re=!1;if(C){const Ge=ge.get(C);Ge.__useDefaultFramebuffer!==void 0?(Y.bindFramebuffer(B.FRAMEBUFFER,null),z=!1):Ge.__webglFramebuffer===void 0?E.setupRenderTarget(C):Ge.__hasExternalTextures&&E.rebindTextures(C,ge.get(C.texture).__webglTexture,ge.get(C.depthTexture).__webglTexture);const qe=C.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Re=!0);const Ve=ge.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ve[U])?G=Ve[U][H]:G=Ve[U],ye=!0):ae.isWebGL2&&C.samples>0&&E.useMultisampledRTT(C)===!1?G=ge.get(C).__webglMultisampledFramebuffer:Array.isArray(Ve)?G=Ve[H]:G=Ve,S.copy(C.viewport),F.copy(C.scissor),W=C.scissorTest}else S.copy($).multiplyScalar(Q).floor(),F.copy(te).multiplyScalar(Q).floor(),W=fe;if(Y.bindFramebuffer(B.FRAMEBUFFER,G)&&ae.drawBuffers&&z&&Y.drawBuffers(C,G),Y.viewport(S),Y.scissor(F),Y.setScissorTest(W),ye){const Ge=ge.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ge.__webglTexture,H)}else if(Re){const Ge=ge.get(C.texture),qe=U||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ge.__webglTexture,H||0,qe)}L=-1},this.readRenderTargetPixels=function(C,U,H,z,G,ye,Re){if(!(C&&C.isWebGLRenderTarget))return;let Ue=ge.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Re!==void 0&&(Ue=Ue[Re]),Ue){Y.bindFramebuffer(B.FRAMEBUFFER,Ue);try{const Ge=C.texture,qe=Ge.format,Ve=Ge.type;if(qe!==Yt&&Me.convert(qe)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT))return;const We=Ve===Rs&&(K.has("EXT_color_buffer_half_float")||ae.isWebGL2&&K.has("EXT_color_buffer_float"));if(Ve!==Xn&&Me.convert(Ve)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===pn&&(ae.isWebGL2||K.has("OES_texture_float")||K.has("WEBGL_color_buffer_float")))&&!We)return;U>=0&&U<=C.width-z&&H>=0&&H<=C.height-G&&B.readPixels(U,H,z,G,Me.convert(qe),Me.convert(Ve),ye)}finally{const Ge=w!==null?ge.get(w).__webglFramebuffer:null;Y.bindFramebuffer(B.FRAMEBUFFER,Ge)}}},this.copyFramebufferToTexture=function(C,U,H=0){const z=Math.pow(2,-H),G=Math.floor(U.image.width*z),ye=Math.floor(U.image.height*z);E.setTexture2D(U,0),B.copyTexSubImage2D(B.TEXTURE_2D,H,0,0,C.x,C.y,G,ye),Y.unbindTexture()},this.copyTextureToTexture=function(C,U,H,z=0){const G=U.image.width,ye=U.image.height,Re=Me.convert(H.format),Ue=Me.convert(H.type);E.setTexture2D(H,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment),U.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,z,C.x,C.y,G,ye,Re,Ue,U.image.data):U.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,z,C.x,C.y,U.mipmaps[0].width,U.mipmaps[0].height,Re,U.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,z,C.x,C.y,Re,Ue,U.image),z===0&&H.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),Y.unbindTexture()},this.copyTextureToTexture3D=function(C,U,H,z,G=0){if(A.isWebGL1Renderer)return;const ye=C.max.x-C.min.x+1,Re=C.max.y-C.min.y+1,Ue=C.max.z-C.min.z+1,Ge=Me.convert(z.format),qe=Me.convert(z.type);let Ve;if(z.isData3DTexture)E.setTexture3D(z,0),Ve=B.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)E.setTexture2DArray(z,0),Ve=B.TEXTURE_2D_ARRAY;else return;B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,z.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,z.unpackAlignment);const We=B.getParameter(B.UNPACK_ROW_LENGTH),At=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Qt=B.getParameter(B.UNPACK_SKIP_PIXELS),Rt=B.getParameter(B.UNPACK_SKIP_ROWS),Bn=B.getParameter(B.UNPACK_SKIP_IMAGES),lt=H.isCompressedTexture?H.mipmaps[G]:H.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,lt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,lt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,C.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,C.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,C.min.z),H.isDataTexture||H.isData3DTexture?B.texSubImage3D(Ve,G,U.x,U.y,U.z,ye,Re,Ue,Ge,qe,lt.data):H.isCompressedArrayTexture?B.compressedTexSubImage3D(Ve,G,U.x,U.y,U.z,ye,Re,Ue,Ge,lt.data):B.texSubImage3D(Ve,G,U.x,U.y,U.z,ye,Re,Ue,Ge,qe,lt),B.pixelStorei(B.UNPACK_ROW_LENGTH,We),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,At),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Qt),B.pixelStorei(B.UNPACK_SKIP_ROWS,Rt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Bn),G===0&&z.generateMipmaps&&B.generateMipmap(Ve),Y.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?E.setTextureCube(C,0):C.isData3DTexture?E.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?E.setTexture2DArray(C,0):E.setTexture2D(C,0),Y.unbindTexture()},this.resetState=function(){R=0,b=0,w=null,Y.reset(),I.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===jo?"display-p3":"srgb",t.unpackColorSpace=ot.workingColorSpace===vr?"display-p3":"srgb"}get outputEncoding(){return this.outputColorSpace===St?ai:Al}set outputEncoding(e){this.outputColorSpace=e===ai?St:Rn}get useLegacyLights(){return this._useLegacyLights}set useLegacyLights(e){this._useLegacyLights=e}}class _f extends gf{}_f.prototype.isWebGL1Renderer=!0;class ia{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new de(e),this.density=t}clone(){return new ia(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class sa{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new de(e),this.near=t,this.far=n}clone(){return new sa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Af extends it{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Tr{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=dr,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=nn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new T;class Zt{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=qt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=qt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=qt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=qt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new $e(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zt(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Bl extends Tt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ps;const Ws=new T,ms=new T,gs=new T,_s=new X,Xs=new X,xf=new Pe,no=new T,Js=new T,io=new T,Jh=new X,Za=new X,Kh=new X;class yf extends it{constructor(e=new Bl){if(super(),this.isSprite=!0,this.type="Sprite",ps===void 0){ps=new ke;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Tr(t,5);ps.setIndex([0,1,2,0,2,3]),ps.setAttribute("position",new Zt(n,3,0,!1)),ps.setAttribute("uv",new Zt(n,2,3,!1))}this.geometry=ps,this.material=e,this.center=new X(.5,.5)}raycast(e,t){e.camera,ms.setFromMatrixScale(this.matrixWorld),xf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),gs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ms.multiplyScalar(-gs.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;so(no.set(-.5,-.5,0),gs,o,ms,i,s),so(Js.set(.5,-.5,0),gs,o,ms,i,s),so(io.set(.5,.5,0),gs,o,ms,i,s),Jh.set(0,0),Za.set(1,0),Kh.set(1,1);let a=e.ray.intersectTriangle(no,Js,io,!1,Ws);if(a===null&&(so(Js.set(-.5,.5,0),gs,o,ms,i,s),Za.set(0,1),a=e.ray.intersectTriangle(no,io,Js,!1,Ws),a===null))return;const c=e.ray.origin.distanceTo(Ws);c<e.near||c>e.far||t.push({distance:c,point:Ws.clone(),uv:Kt.getInterpolation(Ws,no,Js,io,Jh,Za,Kh,new X),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function so(r,e,t,n,i,s){_s.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Xs.x=s*_s.x-i*_s.y,Xs.y=i*_s.x+s*_s.y):Xs.copy(_s),r.copy(e),r.x+=Xs.x,r.y+=Xs.y,r.applyMatrix4(xf)}const ro=new T,Yh=new T;class vf extends it{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){ro.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(ro);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){ro.setFromMatrixPosition(e.matrixWorld),Yh.setFromMatrixPosition(this.matrixWorld);const n=ro.distanceTo(Yh)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}}const qh=new T,Zh=new nt,Qh=new nt,px=new T,jh=new Pe,oo=new T,Qa=new Et,$h=new Pe,ja=new qi;class Il extends vt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Sc,this.bindMatrix=new Pe,this.bindMatrixInverse=new Pe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new bt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,oo),this.boundingBox.expandByPoint(oo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Et),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,oo),this.boundingSphere.expandByPoint(oo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qa.copy(this.boundingSphere),Qa.applyMatrix4(i),e.ray.intersectsSphere(Qa)!==!1&&($h.copy(i).invert(),ja.copy(e.ray).applyMatrix4($h),!(this.boundingBox!==null&&ja.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ja)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new nt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Sc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Id&&this.bindMatrixInverse.copy(this.bindMatrix).invert()}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Zh.fromBufferAttribute(i.attributes.skinIndex,e),Qh.fromBufferAttribute(i.attributes.skinWeight,e),qh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Qh.getComponent(s);if(o!==0){const a=Zh.getComponent(s);jh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(px.copy(qh).applyMatrix4(jh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return this.applyBoneTransform(e,t)}}class ra extends it{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Hi extends dt{constructor(e=null,t=1,n=1,i,s,o,a,c,l=mt,h=mt,u,d){super(null,o,a,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const eu=new Pe,mx=new Pe;class Cr{constructor(e=[],t=[]){this.uuid=nn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Pe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Pe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:mx;eu.multiplyMatrices(a,t[s]),eu.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Cr(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Hi(t,e,e,Yt,pn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(o=new ra),this.bones.push(o),this.boneInverses.push(new Pe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Xi extends $e{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const As=new Pe,tu=new Pe,ao=[],nu=new bt,gx=new Pe,Ks=new vt,Ys=new Et;class Ll extends vt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xi(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,gx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new bt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),nu.copy(e.boundingBox).applyMatrix4(As),this.boundingBox.union(nu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Et),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),Ys.copy(e.boundingSphere).applyMatrix4(As),this.boundingSphere.union(Ys)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ks.geometry=this.geometry,Ks.material=this.material,Ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ys.copy(this.boundingSphere),Ys.applyMatrix4(n),e.ray.intersectsSphere(Ys)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,As),tu.multiplyMatrices(n,As),Ks.matrixWorld=tu,Ks.raycast(e,ao);for(let o=0,a=ao.length;o<a;o++){const c=ao[o];c.instanceId=s,c.object=this,t.push(c)}ao.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xi(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}function _x(r,e){return r.z-e.z}function Ax(r,e){return e.z-r.z}class xx{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t){const n=this.pool,i=this.list;this.index>=n.length&&n.push({start:-1,count:-1,z:-1});const s=n[this.index];i.push(s),this.index++,s.start=e.start,s.count=e.count,s.z=t}reset(){this.list.length=0,this.index=0}}const xs="batchId",ti=new Pe,iu=new Pe,yx=new Pe,su=new Pe,$a=new br,co=new bt,Mi=new Et,qs=new T,ec=new xx,Gt=new vt,lo=[];function vx(r,e,t=0){const n=e.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==e.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let o=0;o<n;o++)e.setComponent(s+t,o,r.getComponent(s,o))}else e.array.set(r.array,t*n);e.needsUpdate=!0}class Mf extends vt{get maxGeometryCount(){return this._maxGeometryCount}constructor(e,t,n=t*2,i){super(new ke,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._drawRanges=[],this._reservedRanges=[],this._visibility=[],this._active=[],this._bounds=[],this._maxGeometryCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._geometryInitialized=!1,this._geometryCount=0,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._visibilityChanged=!0,this._matricesTexture=null,this._initMatricesTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxGeometryCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new Hi(t,e,e,Yt,pn);this._matricesTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxGeometryCount,s=this._maxIndexCount;if(this._geometryInitialized===!1){for(const a in e.attributes){const c=e.getAttribute(a),{array:l,itemSize:h,normalized:u}=c,d=new l.constructor(n*h),f=new c.constructor(d,h,u);f.setUsage(c.usage),t.setAttribute(a,f)}if(e.getIndex()!==null){const a=n>65536?new Uint32Array(s):new Uint16Array(s);t.setIndex(new $e(a,1))}const o=i>65536?new Uint32Array(n):new Uint16Array(n);t.setAttribute(xs,new $e(o,1)),this._geometryInitialized=!0}}_validateGeometry(e){if(e.getAttribute(xs))throw new Error(`BatchedMesh: Geometry cannot use attribute "${xs}"`);const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(n===xs)continue;if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bt);const e=this._geometryCount,t=this.boundingBox,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,ti),this.getBoundingBoxAt(i,co).applyMatrix4(ti),t.union(co))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Et);const e=this._geometryCount,t=this.boundingSphere,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,ti),this.getBoundingSphereAt(i,Mi).applyMatrix4(ti),t.union(Mi))}addGeometry(e,t=-1,n=-1){if(this._initializeGeometry(e),this._validateGeometry(e),this._geometryCount>=this._maxGeometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");const i={vertexStart:-1,vertexCount:-1,indexStart:-1,indexCount:-1};let s=null;const o=this._reservedRanges,a=this._drawRanges,c=this._bounds;this._geometryCount!==0&&(s=o[o.length-1]),t===-1?i.vertexCount=e.getAttribute("position").count:i.vertexCount=t,s===null?i.vertexStart=0:i.vertexStart=s.vertexStart+s.vertexCount;const l=e.getIndex(),h=l!==null;if(h&&(n===-1?i.indexCount=l.count:i.indexCount=n,s===null?i.indexStart=0:i.indexStart=s.indexStart+s.indexCount),i.indexStart!==-1&&i.indexStart+i.indexCount>this._maxIndexCount||i.vertexStart+i.vertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");const u=this._visibility,d=this._active,f=this._matricesTexture,p=this._matricesTexture.image.data;u.push(!0),d.push(!0);const _=this._geometryCount;this._geometryCount++,yx.toArray(p,_*16),f.needsUpdate=!0,o.push(i),a.push({start:h?i.indexStart:i.vertexStart,count:-1}),c.push({boxInitialized:!1,box:new bt,sphereInitialized:!1,sphere:new Et});const g=this.geometry.getAttribute(xs);for(let m=0;m<i.vertexCount;m++)g.setX(i.vertexStart+m,_);return g.needsUpdate=!0,this.setGeometryAt(_,e),_}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),o=t.getIndex(),a=this._reservedRanges[e];if(i&&o.count>a.indexCount||t.attributes.position.count>a.vertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const c=a.vertexStart,l=a.vertexCount;for(const f in n.attributes){if(f===xs)continue;const p=t.getAttribute(f),_=n.getAttribute(f);vx(p,_,c);const g=p.itemSize;for(let m=p.count,x=l;m<x;m++){const A=c+m;for(let y=0;y<g;y++)_.setComponent(A,y,0)}_.needsUpdate=!0}if(i){const f=a.indexStart;for(let p=0;p<o.count;p++)s.setX(f+p,c+o.getX(p));for(let p=o.count,_=a.indexCount;p<_;p++)s.setX(f+p,c);s.needsUpdate=!0}const h=this._bounds[e];t.boundingBox!==null?(h.box.copy(t.boundingBox),h.boxInitialized=!0):h.boxInitialized=!1,t.boundingSphere!==null?(h.sphere.copy(t.boundingSphere),h.sphereInitialized=!0):h.sphereInitialized=!1;const u=this._drawRanges[e],d=t.getAttribute("position");return u.count=i?o.count:d.count,this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._active;return e>=t.length||t[e]===!1?this:(t[e]=!1,this._visibilityChanged=!0,this)}getBoundingBoxAt(e,t){if(this._active[e]===!1)return this;const i=this._bounds[e],s=i.box,o=this.geometry;if(i.boxInitialized===!1){s.makeEmpty();const a=o.index,c=o.attributes.position,l=this._drawRanges[e];for(let h=l.start,u=l.start+l.count;h<u;h++){let d=h;a&&(d=a.getX(d)),s.expandByPoint(qs.fromBufferAttribute(c,d))}i.boxInitialized=!0}return t.copy(s),t}getBoundingSphereAt(e,t){if(this._active[e]===!1)return this;const i=this._bounds[e],s=i.sphere,o=this.geometry;if(i.sphereInitialized===!1){s.makeEmpty(),this.getBoundingBoxAt(e,co),co.getCenter(s.center);const a=o.index,c=o.attributes.position,l=this._drawRanges[e];let h=0;for(let u=l.start,d=l.start+l.count;u<d;u++){let f=u;a&&(f=a.getX(f)),qs.fromBufferAttribute(c,f),h=Math.max(h,s.center.distanceToSquared(qs))}s.radius=Math.sqrt(h),i.sphereInitialized=!0}return t.copy(s),t}setMatrixAt(e,t){const n=this._active,i=this._matricesTexture,s=this._matricesTexture.image.data,o=this._geometryCount;return e>=o||n[e]===!1?this:(t.toArray(s,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){const n=this._active,i=this._matricesTexture.image.data,s=this._geometryCount;return e>=s||n[e]===!1?null:t.fromArray(i,e*16)}setVisibleAt(e,t){const n=this._visibility,i=this._active,s=this._geometryCount;return e>=s||i[e]===!1||n[e]===t?this:(n[e]=t,this._visibilityChanged=!0,this)}getVisibleAt(e){const t=this._visibility,n=this._active,i=this._geometryCount;return e>=i||n[e]===!1?!1:t[e]}raycast(e,t){const n=this._visibility,i=this._active,s=this._drawRanges,o=this._geometryCount,a=this.matrixWorld,c=this.geometry;Gt.material=this.material,Gt.geometry.index=c.index,Gt.geometry.attributes=c.attributes,Gt.geometry.boundingBox===null&&(Gt.geometry.boundingBox=new bt),Gt.geometry.boundingSphere===null&&(Gt.geometry.boundingSphere=new Et);for(let l=0;l<o;l++){if(!n[l]||!i[l])continue;const h=s[l];Gt.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(l,Gt.matrixWorld).premultiply(a),this.getBoundingBoxAt(l,Gt.geometry.boundingBox),this.getBoundingSphereAt(l,Gt.geometry.boundingSphere),Gt.raycast(e,lo);for(let u=0,d=lo.length;u<d;u++){const f=lo[u];f.object=this,f.batchId=l,t.push(f)}lo.length=0}Gt.material=null,Gt.geometry.index=null,Gt.geometry.attributes={},Gt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._drawRanges=e._drawRanges.map(t=>({...t})),this._reservedRanges=e._reservedRanges.map(t=>({...t})),this._visibility=e._visibility.slice(),this._active=e._active.slice(),this._bounds=e._bounds.map(t=>({boxInitialized:t.boxInitialized,box:t.box.clone(),sphereInitialized:t.sphereInitialized,sphere:t.sphere.clone()})),this._maxGeometryCount=e._maxGeometryCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.slice(),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,c=this._visibility,l=this._multiDrawStarts,h=this._multiDrawCounts,u=this._drawRanges,d=this.perObjectFrustumCulled;d&&(su.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),$a.setFromProjectionMatrix(su,e.isWebGPURenderer?Is:mn));let f=0;if(this.sortObjects){iu.copy(this.matrixWorld).invert(),qs.setFromMatrixPosition(n.matrixWorld).applyMatrix4(iu);for(let g=0,m=c.length;g<m;g++)if(c[g]){this.getMatrixAt(g,ti),this.getBoundingSphereAt(g,Mi).applyMatrix4(ti);let x=!1;if(d&&(x=!$a.intersectsSphere(Mi)),!x){const A=qs.distanceTo(Mi.center);ec.push(u[g],A)}}const p=ec.list,_=this.customSort;_===null?p.sort(s.transparent?Ax:_x):_.call(this,p,n);for(let g=0,m=p.length;g<m;g++){const x=p[g];l[f]=x.start*a,h[f]=x.count,f++}ec.reset()}else for(let p=0,_=c.length;p<_;p++)if(c[p]){let g=!1;if(d&&(this.getMatrixAt(p,ti),this.getBoundingSphereAt(p,Mi).applyMatrix4(ti),g=!$a.intersectsSphere(Mi)),!g){const m=u[p];l[f]=m.start*a,h[f]=m.count,f++}}this._multiDrawCount=f,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,o){this.onBeforeRender(e,null,i,s,o)}}class Ht extends Tt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new de(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ru=new T,ou=new T,au=new Pe,tc=new qi,ho=new Et;class Yn extends it{constructor(e=new ke,t=new Ht){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ru.fromBufferAttribute(t,i-1),ou.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ru.distanceTo(ou);e.setAttribute("lineDistance",new Se(n,1))}return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(i),ho.radius+=s,e.ray.intersectsSphere(ho)===!1)return;au.copy(i).invert(),tc.copy(e.ray).applyMatrix4(au);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new T,h=new T,u=new T,d=new T,f=this.isLineSegments?2:1,p=n.index,g=n.attributes.position;if(p!==null){const m=Math.max(0,o.start),x=Math.min(p.count,o.start+o.count);for(let A=m,y=x-1;A<y;A+=f){const R=p.getX(A),b=p.getX(A+1);if(l.fromBufferAttribute(g,R),h.fromBufferAttribute(g,b),tc.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const L=e.ray.origin.distanceTo(d);L<e.near||L>e.far||t.push({distance:L,point:u.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,o.start),x=Math.min(g.count,o.start+o.count);for(let A=m,y=x-1;A<y;A+=f){if(l.fromBufferAttribute(g,A),h.fromBufferAttribute(g,A+1),tc.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const b=e.ray.origin.distanceTo(d);b<e.near||b>e.far||t.push({distance:b,point:u.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const cu=new T,lu=new T;class An extends Yn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)cu.fromBufferAttribute(t,i),lu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+cu.distanceTo(lu);e.setAttribute("lineDistance",new Se(n,1))}return this}}class Pl extends Yn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class oa extends Tt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hu=new Pe,el=new qi,uo=new Et,fo=new T;class Dl extends it{constructor(e=new ke,t=new oa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(i),uo.radius+=s,e.ray.intersectsSphere(uo)===!1)return;hu.copy(i).invert(),el.copy(e.ray).applyMatrix4(hu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let p=d,_=f;p<_;p++){const g=l.getX(p);fo.fromBufferAttribute(u,g),uu(fo,g,c,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,_=f;p<_;p++)fo.fromBufferAttribute(u,p),uu(fo,p,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function uu(r,e,t,n,i,s,o){const a=el.distanceSqToPoint(r);if(a<t){const c=new T;el.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}class Mx extends dt{constructor(e,t,n,i,s,o,a,c,l){super(e,t,n,i,s,o,a,c,l),this.isVideoTexture=!0,this.minFilter=o!==void 0?o:ht,this.magFilter=s!==void 0?s:ht,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class Sx extends dt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=mt,this.minFilter=mt,this.generateMipmaps=!1,this.needsUpdate=!0}}class aa extends dt{constructor(e,t,n,i,s,o,a,c,l,h,u,d){super(null,o,a,c,l,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class bx extends aa{constructor(e,t,n,i,s,o){super(e,t,n,s,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Ft}}class Ex extends aa{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Kn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class Tx extends dt{constructor(e,t,n,i,s,o,a,c,l){super(e,t,n,i,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=t||(o.isVector2?new X:new T);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new T,i=[],s=[],o=[],a=new T,c=new Pe;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new T)}s[0]=new T,o[0]=new T;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(gt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,p))}o[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(gt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ca extends xn{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){const n=t||new X,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Sf extends ca{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Fl(){let r=0,e=0,t=0,n=0;function i(s,o,a,c){r=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,u){let d=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const po=new T,nc=new Fl,ic=new Fl,sc=new Fl;class bf extends xn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%s]:(po.subVectors(i[0],i[1]).add(i[0]),l=po);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(po.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=po),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),nc.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,p,_,g),ic.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,p,_,g),sc.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(nc.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),ic.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),sc.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(nc.calc(c),ic.calc(c),sc.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function du(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,a=r*r,c=r*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*r+t}function Cx(r,e){const t=1-r;return t*t*e}function wx(r,e){return 2*(1-r)*r*e}function Rx(r,e){return r*r*e}function nr(r,e,t,n){return Cx(r,e)+wx(r,t)+Rx(r,n)}function Bx(r,e){const t=1-r;return t*t*t*e}function Ix(r,e){const t=1-r;return 3*t*t*r*e}function Lx(r,e){return 3*(1-r)*r*r*e}function Px(r,e){return r*r*r*e}function ir(r,e,t,n,i){return Bx(r,e)+Ix(r,t)+Lx(r,n)+Px(r,i)}class Ul extends xn{constructor(e=new X,t=new X,n=new X,i=new X){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new X){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(ir(e,i.x,s.x,o.x,a.x),ir(e,i.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ef extends xn{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(ir(e,i.x,s.x,o.x,a.x),ir(e,i.y,s.y,o.y,a.y),ir(e,i.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Nl extends xn{constructor(e=new X,t=new X){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new X){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new X){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tf extends xn{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ol extends xn{constructor(e=new X,t=new X,n=new X){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new X){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(nr(e,i.x,s.x,o.x),nr(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gl extends xn{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(nr(e,i.x,s.x,o.x),nr(e,i.y,s.y,o.y),nr(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hl extends xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new X){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(du(a,c.x,l.x,h.x,u.x),du(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new X().fromArray(i))}return this}}var Xo=Object.freeze({__proto__:null,ArcCurve:Sf,CatmullRomCurve3:bf,CubicBezierCurve:Ul,CubicBezierCurve3:Ef,EllipseCurve:ca,LineCurve:Nl,LineCurve3:Tf,QuadraticBezierCurve:Ol,QuadraticBezierCurve3:Gl,SplineCurve:Hl});class Cf extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Xo[i.type]().fromJSON(i))}return this}}class pr extends Cf{constructor(e){super(),this.type="Path",this.currentPoint=new X,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Nl(this.currentPoint.clone(),new X(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Ol(this.currentPoint.clone(),new X(e,t),new X(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const a=new Ul(this.currentPoint.clone(),new X(e,t),new X(n,i),new X(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Hl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,o,a,c),this}absellipse(e,t,n,i,s,o,a,c){const l=new ca(e,t,n,i,s,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class wr extends ke{constructor(e=[new X(0,-.5),new X(.5,0),new X(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=gt(i,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],h=1/t,u=new T,d=new X,f=new T,p=new T,_=new T;let g=0,m=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(p)}for(let x=0;x<=t;x++){const A=n+x*h*i,y=Math.sin(A),R=Math.cos(A);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*y,u.y=e[b].y,u.z=e[b].x*R,o.push(u.x,u.y,u.z),d.x=x/t,d.y=b/(e.length-1),a.push(d.x,d.y);const w=c[3*b+0]*y,L=c[3*b+1],v=c[3*b+0]*R;l.push(w,L,v)}}for(let x=0;x<t;x++)for(let A=0;A<e.length-1;A++){const y=A+x*e.length,R=y,b=y+e.length,w=y+e.length+1,L=y+1;s.push(R,b,L),s.push(w,L,b)}this.setIndex(s),this.setAttribute("position",new Se(o,3)),this.setAttribute("uv",new Se(a,2)),this.setAttribute("normal",new Se(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wr(e.points,e.segments,e.phiStart,e.phiLength)}}class la extends wr{constructor(e=1,t=1,n=4,i=8){const s=new pr;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new la(e.radius,e.length,e.capSegments,e.radialSegments)}}class ha extends ke{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],a=[],c=[],l=new T,h=new X;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Se(o,3)),this.setAttribute("normal",new Se(a,3)),this.setAttribute("uv",new Se(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ha(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ns extends ke{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const _=[],g=n/2;let m=0;x(),o===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new Se(u,3)),this.setAttribute("normal",new Se(d,3)),this.setAttribute("uv",new Se(f,2));function x(){const y=new T,R=new T;let b=0;const w=(t-e)/n;for(let L=0;L<=s;L++){const v=[],S=L/s,F=S*(t-e)+e;for(let W=0;W<=i;W++){const oe=W/i,P=oe*c+a,O=Math.sin(P),k=Math.cos(P);R.x=F*O,R.y=-S*n+g,R.z=F*k,u.push(R.x,R.y,R.z),y.set(O,w,k).normalize(),d.push(y.x,y.y,y.z),f.push(oe,1-S),v.push(p++)}_.push(v)}for(let L=0;L<i;L++)for(let v=0;v<s;v++){const S=_[v][L],F=_[v+1][L],W=_[v+1][L+1],oe=_[v][L+1];h.push(S,F,oe),h.push(F,W,oe),b+=6}l.addGroup(m,b,0),m+=b}function A(y){const R=p,b=new X,w=new T;let L=0;const v=y===!0?e:t,S=y===!0?1:-1;for(let W=1;W<=i;W++)u.push(0,g*S,0),d.push(0,S,0),f.push(.5,.5),p++;const F=p;for(let W=0;W<=i;W++){const P=W/i*c+a,O=Math.cos(P),k=Math.sin(P);w.x=v*k,w.y=g*S,w.z=v*O,u.push(w.x,w.y,w.z),d.push(0,S,0),b.x=O*.5+.5,b.y=k*.5*S+.5,f.push(b.x,b.y),p++}for(let W=0;W<i;W++){const oe=R+W,P=F+W;y===!0?h.push(P,P+1,oe):h.push(P+1,P,oe),L+=3}l.addGroup(m,L,y===!0?1:2),m+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ns(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ua extends Ns{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new ua(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class pi extends ke{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),l(n),h(),this.setAttribute("position",new Se(s,3)),this.setAttribute("normal",new Se(s.slice(),3)),this.setAttribute("uv",new Se(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const A=new T,y=new T,R=new T;for(let b=0;b<t.length;b+=3)f(t[b+0],A),f(t[b+1],y),f(t[b+2],R),c(A,y,R,x)}function c(x,A,y,R){const b=R+1,w=[];for(let L=0;L<=b;L++){w[L]=[];const v=x.clone().lerp(y,L/b),S=A.clone().lerp(y,L/b),F=b-L;for(let W=0;W<=F;W++)W===0&&L===b?w[L][W]=v:w[L][W]=v.clone().lerp(S,W/F)}for(let L=0;L<b;L++)for(let v=0;v<2*(b-L)-1;v++){const S=Math.floor(v/2);v%2===0?(d(w[L][S+1]),d(w[L+1][S]),d(w[L][S])):(d(w[L][S+1]),d(w[L+1][S+1]),d(w[L+1][S]))}}function l(x){const A=new T;for(let y=0;y<s.length;y+=3)A.x=s[y+0],A.y=s[y+1],A.z=s[y+2],A.normalize().multiplyScalar(x),s[y+0]=A.x,s[y+1]=A.y,s[y+2]=A.z}function h(){const x=new T;for(let A=0;A<s.length;A+=3){x.x=s[A+0],x.y=s[A+1],x.z=s[A+2];const y=g(x)/2/Math.PI+.5,R=m(x)/Math.PI+.5;o.push(y,1-R)}p(),u()}function u(){for(let x=0;x<o.length;x+=6){const A=o[x+0],y=o[x+2],R=o[x+4],b=Math.max(A,y,R),w=Math.min(A,y,R);b>.9&&w<.1&&(A<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),R<.2&&(o[x+4]+=1))}}function d(x){s.push(x.x,x.y,x.z)}function f(x,A){const y=x*3;A.x=e[y+0],A.y=e[y+1],A.z=e[y+2]}function p(){const x=new T,A=new T,y=new T,R=new T,b=new X,w=new X,L=new X;for(let v=0,S=0;v<s.length;v+=9,S+=6){x.set(s[v+0],s[v+1],s[v+2]),A.set(s[v+3],s[v+4],s[v+5]),y.set(s[v+6],s[v+7],s[v+8]),b.set(o[S+0],o[S+1]),w.set(o[S+2],o[S+3]),L.set(o[S+4],o[S+5]),R.copy(x).add(A).add(y).divideScalar(3);const F=g(R);_(b,S+0,x,F),_(w,S+2,A,F),_(L,S+4,y,F)}}function _(x,A,y,R){R<0&&x.x===1&&(o[A]=x.x-1),y.x===0&&y.z===0&&(o[A]=R/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pi(e.vertices,e.indices,e.radius,e.details)}}class da extends pi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new da(e.radius,e.detail)}}const mo=new T,go=new T,rc=new T,_o=new Kt;class wf extends ke{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Gi*t),o=e.getIndex(),a=e.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<c;p+=3){o?(l[0]=o.getX(p),l[1]=o.getX(p+1),l[2]=o.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);const{a:_,b:g,c:m}=_o;if(_.fromBufferAttribute(a,l[0]),g.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),_o.getNormal(rc),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const A=(x+1)%3,y=u[x],R=u[A],b=_o[h[x]],w=_o[h[A]],L=`${y}_${R}`,v=`${R}_${y}`;v in d&&d[v]?(rc.dot(d[v].normal)<=s&&(f.push(b.x,b.y,b.z),f.push(w.x,w.y,w.z)),d[v]=null):L in d||(d[L]={index0:l[x],index1:l[A],normal:rc.clone()})}}for(const p in d)if(d[p]){const{index0:_,index1:g}=d[p];mo.fromBufferAttribute(a,_),go.fromBufferAttribute(a,g),f.push(mo.x,mo.y,mo.z),f.push(go.x,go.y,go.z)}this.setAttribute("position",new Se(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class zi extends pr{constructor(e){super(e),this.uuid=nn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new pr().fromJSON(i))}return this}}const Dx={triangulate:function(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Rf(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l,h,u,d,f;if(n&&(s=Gx(r,e,s,t)),r.length>80*t){a=l=r[0],c=h=r[1];for(let p=t;p<i;p+=t)u=r[p],d=r[p+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return mr(s,o,t,a,c,f,0),o}};function Rf(r,e,t,n,i){let s,o;if(i===Zx(r,e,t,n)>0)for(s=e;s<t;s+=n)o=fu(s,r[s],r[s+1],o);else for(s=t-n;s>=e;s-=n)o=fu(s,r[s],r[s+1],o);return o&&fa(o,o.next)&&(_r(o),o=o.next),o}function Ji(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(fa(t,t.next)||ut(t.prev,t,t.next)===0)){if(_r(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function mr(r,e,t,n,i,s,o){if(!r)return;!o&&s&&Wx(r,n,i,s);let a=r,c,l;for(;r.prev!==r.next;){if(c=r.prev,l=r.next,s?Ux(r,n,i,s):Fx(r)){e.push(c.i/t|0),e.push(r.i/t|0),e.push(l.i/t|0),_r(r),r=l.next,a=l.next;continue}if(r=l,r===a){o?o===1?(r=Nx(Ji(r),e,t),mr(r,e,t,n,i,s,2)):o===2&&Ox(r,e,t,n,i,s):mr(Ji(r),e,t,n,i,s,1);break}}}function Fx(r){const e=r.prev,t=r,n=r.next;if(ut(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=i<s?i<o?i:o:s<o?s:o,u=a<c?a<l?a:l:c<l?c:l,d=i>s?i>o?i:o:s>o?s:o,f=a>c?a>l?a:l:c>l?c:l;let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&bs(i,a,s,c,o,l,p.x,p.y)&&ut(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Ux(r,e,t,n){const i=r.prev,s=r,o=r.next;if(ut(i,s,o)>=0)return!1;const a=i.x,c=s.x,l=o.x,h=i.y,u=s.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,p=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,g=h>u?h>d?h:d:u>d?u:d,m=tl(f,p,e,t,n),x=tl(_,g,e,t,n);let A=r.prevZ,y=r.nextZ;for(;A&&A.z>=m&&y&&y.z<=x;){if(A.x>=f&&A.x<=_&&A.y>=p&&A.y<=g&&A!==i&&A!==o&&bs(a,h,c,u,l,d,A.x,A.y)&&ut(A.prev,A,A.next)>=0||(A=A.prevZ,y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&bs(a,h,c,u,l,d,y.x,y.y)&&ut(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;A&&A.z>=m;){if(A.x>=f&&A.x<=_&&A.y>=p&&A.y<=g&&A!==i&&A!==o&&bs(a,h,c,u,l,d,A.x,A.y)&&ut(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&bs(a,h,c,u,l,d,y.x,y.y)&&ut(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Nx(r,e,t){let n=r;do{const i=n.prev,s=n.next.next;!fa(i,s)&&Bf(i,n,n.next,s)&&gr(i,s)&&gr(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),_r(n),_r(n.next),n=r=s),n=n.next}while(n!==r);return Ji(n)}function Ox(r,e,t,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Kx(o,a)){let c=If(o,a);o=Ji(o,o.next),c=Ji(c,c.next),mr(o,e,t,n,i,s,0),mr(c,e,t,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function Gx(r,e,t,n){const i=[];let s,o,a,c,l;for(s=0,o=e.length;s<o;s++)a=e[s]*n,c=s<o-1?e[s+1]*n:r.length,l=Rf(r,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(Jx(l));for(i.sort(Hx),s=0;s<i.length;s++)t=zx(i[s],t);return t}function Hx(r,e){return r.x-e.x}function zx(r,e){const t=kx(r,e);if(!t)return e;const n=If(t,r);return Ji(n,n.next),Ji(t,t.next)}function kx(r,e){let t=e,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===s))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,c=i.x,l=i.y;let h=1/0,u;t=i;do s>=t.x&&t.x>=c&&s!==t.x&&bs(o<l?s:n,o,c,l,o<l?n:s,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(s-t.x),gr(t,r)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&Vx(i,t)))&&(i=t,h=u)),t=t.next;while(t!==a);return i}function Vx(r,e){return ut(r.prev,r,e.prev)<0&&ut(e.next,r,r.next)<0}function Wx(r,e,t,n){let i=r;do i.z===0&&(i.z=tl(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Xx(i)}function Xx(r){let e,t,n,i,s,o,a,c,l=1;do{for(t=r,r=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,c--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,l*=2}while(o>1);return r}function tl(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Jx(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function bs(r,e,t,n,i,s,o,a){return(i-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(i-o)*(n-a)}function Kx(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Yx(r,e)&&(gr(r,e)&&gr(e,r)&&qx(r,e)&&(ut(r.prev,r,e.prev)||ut(r,e.prev,e))||fa(r,e)&&ut(r.prev,r,r.next)>0&&ut(e.prev,e,e.next)>0)}function ut(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function fa(r,e){return r.x===e.x&&r.y===e.y}function Bf(r,e,t,n){const i=xo(ut(r,e,t)),s=xo(ut(r,e,n)),o=xo(ut(t,n,r)),a=xo(ut(t,n,e));return!!(i!==s&&o!==a||i===0&&Ao(r,t,e)||s===0&&Ao(r,n,e)||o===0&&Ao(t,r,n)||a===0&&Ao(t,e,n))}function Ao(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function xo(r){return r>0?1:r<0?-1:0}function Yx(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Bf(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function gr(r,e){return ut(r.prev,r,r.next)<0?ut(r,e,r.next)>=0&&ut(r,r.prev,e)>=0:ut(r,e,r.prev)<0||ut(r,r.next,e)<0}function qx(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function If(r,e){const t=new nl(r.i,r.x,r.y),n=new nl(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function fu(r,e,t,n){const i=new nl(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function _r(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function nl(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Zx(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Tn{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return Tn.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];pu(e),mu(n,e);let o=e.length;t.forEach(pu);for(let c=0;c<t.length;c++)i.push(o),o+=t[c].length,mu(n,t[c]);const a=Dx.triangulate(n,i);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function pu(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function mu(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class pa extends ke{constructor(e=new zi([new X(.5,.5),new X(-.5,.5),new X(-.5,-.5),new X(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new Se(i,3)),this.setAttribute("uv",new Se(s,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Qx;let A,y=!1,R,b,w,L;m&&(A=m.getSpacedPoints(h),y=!0,d=!1,R=m.computeFrenetFrames(h,!1),b=new T,w=new T,L=new T),d||(g=0,f=0,p=0,_=0);const v=a.extractPoints(l);let S=v.shape;const F=v.holes;if(!Tn.isClockWise(S)){S=S.reverse();for(let B=0,ce=F.length;B<ce;B++){const K=F[B];Tn.isClockWise(K)&&(F[B]=K.reverse())}}const oe=Tn.triangulateShape(S,F),P=S;for(let B=0,ce=F.length;B<ce;B++){const K=F[B];S=S.concat(K)}function O(B,ce,K){return B.clone().addScaledVector(ce,K)}const k=S.length,Q=oe.length;function q(B,ce,K){let ae,Y,we;const ge=B.x-ce.x,E=B.y-ce.y,M=K.x-B.x,N=K.y-B.y,ie=ge*ge+E*E,ee=ge*N-E*M;if(Math.abs(ee)>Number.EPSILON){const j=Math.sqrt(ie),Ee=Math.sqrt(M*M+N*N),ue=ce.x-E/j,xe=ce.y+ge/j,Ie=K.x-N/Ee,ze=K.y+M/Ee,se=((Ie-ue)*N-(ze-xe)*M)/(ge*N-E*M);ae=ue+ge*se-B.x,Y=xe+E*se-B.y;const et=ae*ae+Y*Y;if(et<=2)return new X(ae,Y);we=Math.sqrt(et/2)}else{let j=!1;ge>Number.EPSILON?M>Number.EPSILON&&(j=!0):ge<-Number.EPSILON?M<-Number.EPSILON&&(j=!0):Math.sign(E)===Math.sign(N)&&(j=!0),j?(ae=-E,Y=ge,we=Math.sqrt(ie)):(ae=ge,Y=E,we=Math.sqrt(ie/2))}return new X(ae/we,Y/we)}const J=[];for(let B=0,ce=P.length,K=ce-1,ae=B+1;B<ce;B++,K++,ae++)K===ce&&(K=0),ae===ce&&(ae=0),J[B]=q(P[B],P[K],P[ae]);const $=[];let te,fe=J.concat();for(let B=0,ce=F.length;B<ce;B++){const K=F[B];te=[];for(let ae=0,Y=K.length,we=Y-1,ge=ae+1;ae<Y;ae++,we++,ge++)we===Y&&(we=0),ge===Y&&(ge=0),te[ae]=q(K[ae],K[we],K[ge]);$.push(te),fe=fe.concat(te)}for(let B=0;B<g;B++){const ce=B/g,K=f*Math.cos(ce*Math.PI/2),ae=p*Math.sin(ce*Math.PI/2)+_;for(let Y=0,we=P.length;Y<we;Y++){const ge=O(P[Y],J[Y],ae);ve(ge.x,ge.y,-K)}for(let Y=0,we=F.length;Y<we;Y++){const ge=F[Y];te=$[Y];for(let E=0,M=ge.length;E<M;E++){const N=O(ge[E],te[E],ae);ve(N.x,N.y,-K)}}}const V=p+_;for(let B=0;B<k;B++){const ce=d?O(S[B],fe[B],V):S[B];y?(w.copy(R.normals[0]).multiplyScalar(ce.x),b.copy(R.binormals[0]).multiplyScalar(ce.y),L.copy(A[0]).add(w).add(b),ve(L.x,L.y,L.z)):ve(ce.x,ce.y,0)}for(let B=1;B<=h;B++)for(let ce=0;ce<k;ce++){const K=d?O(S[ce],fe[ce],V):S[ce];y?(w.copy(R.normals[B]).multiplyScalar(K.x),b.copy(R.binormals[B]).multiplyScalar(K.y),L.copy(A[B]).add(w).add(b),ve(L.x,L.y,L.z)):ve(K.x,K.y,u/h*B)}for(let B=g-1;B>=0;B--){const ce=B/g,K=f*Math.cos(ce*Math.PI/2),ae=p*Math.sin(ce*Math.PI/2)+_;for(let Y=0,we=P.length;Y<we;Y++){const ge=O(P[Y],J[Y],ae);ve(ge.x,ge.y,u+K)}for(let Y=0,we=F.length;Y<we;Y++){const ge=F[Y];te=$[Y];for(let E=0,M=ge.length;E<M;E++){const N=O(ge[E],te[E],ae);y?ve(N.x,N.y+A[h-1].y,A[h-1].x+K):ve(N.x,N.y,u+K)}}}ne(),me();function ne(){const B=i.length/3;if(d){let ce=0,K=k*ce;for(let ae=0;ae<Q;ae++){const Y=oe[ae];Fe(Y[2]+K,Y[1]+K,Y[0]+K)}ce=h+g*2,K=k*ce;for(let ae=0;ae<Q;ae++){const Y=oe[ae];Fe(Y[0]+K,Y[1]+K,Y[2]+K)}}else{for(let ce=0;ce<Q;ce++){const K=oe[ce];Fe(K[2],K[1],K[0])}for(let ce=0;ce<Q;ce++){const K=oe[ce];Fe(K[0]+k*h,K[1]+k*h,K[2]+k*h)}}n.addGroup(B,i.length/3-B,0)}function me(){const B=i.length/3;let ce=0;be(P,ce),ce+=P.length;for(let K=0,ae=F.length;K<ae;K++){const Y=F[K];be(Y,ce),ce+=Y.length}n.addGroup(B,i.length/3-B,1)}function be(B,ce){let K=B.length;for(;--K>=0;){const ae=K;let Y=K-1;Y<0&&(Y=B.length-1);for(let we=0,ge=h+g*2;we<ge;we++){const E=k*we,M=k*(we+1),N=ce+ae+E,ie=ce+Y+E,ee=ce+Y+M,j=ce+ae+M;He(N,ie,ee,j)}}}function ve(B,ce,K){c.push(B),c.push(ce),c.push(K)}function Fe(B,ce,K){Ce(B),Ce(ce),Ce(K);const ae=i.length/3,Y=x.generateTopUV(n,i,ae-3,ae-2,ae-1);Ne(Y[0]),Ne(Y[1]),Ne(Y[2])}function He(B,ce,K,ae){Ce(B),Ce(ce),Ce(ae),Ce(ce),Ce(K),Ce(ae);const Y=i.length/3,we=x.generateSideWallUV(n,i,Y-6,Y-3,Y-2,Y-1);Ne(we[0]),Ne(we[1]),Ne(we[3]),Ne(we[1]),Ne(we[2]),Ne(we[3])}function Ce(B){i.push(c[B*3+0]),i.push(c[B*3+1]),i.push(c[B*3+2])}function Ne(B){s.push(B.x),s.push(B.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return jx(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Xo[i.type]().fromJSON(i)),new pa(n,e.options)}}const Qx={generateTopUV:function(r,e,t,n,i){const s=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[i*3],h=e[i*3+1];return[new X(s,o),new X(a,c),new X(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],p=e[i*3+2],_=e[s*3],g=e[s*3+1],m=e[s*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new X(o,1-c),new X(l,1-u),new X(d,1-p),new X(_,1-m)]:[new X(a,1-c),new X(h,1-u),new X(f,1-p),new X(g,1-m)]}};function jx(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ma extends pi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ma(e.radius,e.detail)}}class Rr extends pi{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Rr(e.radius,e.detail)}}class ga extends ke{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let u=e;const d=(t-e)/i,f=new T,p=new X;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const m=s+g/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let _=0;_<i;_++){const g=_*(n+1);for(let m=0;m<n;m++){const x=m+g,A=x,y=x+n+1,R=x+n+2,b=x+1;a.push(A,y,b),a.push(y,R,b)}}this.setIndex(a),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(l,3)),this.setAttribute("uv",new Se(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class _a extends ke{constructor(e=new zi([new X(0,.5),new X(-.5,-.5),new X(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Se(i,3)),this.setAttribute("normal",new Se(s,3)),this.setAttribute("uv",new Se(o,2));function l(h){const u=i.length/3,d=h.extractPoints(t);let f=d.shape;const p=d.holes;Tn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const x=p[g];Tn.isClockWise(x)===!0&&(p[g]=x.reverse())}const _=Tn.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const x=p[g];f=f.concat(x)}for(let g=0,m=f.length;g<m;g++){const x=f[g];i.push(x.x,x.y,0),s.push(0,0,1),o.push(x.x,x.y)}for(let g=0,m=_.length;g<m;g++){const x=_[g],A=x[0]+u,y=x[1]+u,R=x[2]+u;n.push(A,y,R),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return $x(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const o=t[e.shapes[i]];n.push(o)}return new _a(n,e.curveSegments)}}function $x(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class Br extends ke{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new T,d=new T,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const x=[],A=m/n;let y=0;m===0&&o===0?y=.5/t:m===n&&c===Math.PI&&(y=-.5/t);for(let R=0;R<=t;R++){const b=R/t;u.x=-e*Math.cos(i+b*s)*Math.sin(o+A*a),u.y=e*Math.cos(o+A*a),u.z=e*Math.sin(i+b*s)*Math.sin(o+A*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(b+y,1-A),x.push(l++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const A=h[m][x+1],y=h[m][x],R=h[m+1][x],b=h[m+1][x+1];(m!==0||o>0)&&f.push(A,y,b),(m!==n-1||c<Math.PI)&&f.push(y,R,b)}this.setIndex(f),this.setAttribute("position",new Se(p,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Br(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Aa extends pi{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Aa(e.radius,e.detail)}}class xa extends ke{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new T,u=new T,d=new T;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const _=p/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(_),u.y=(e+t*Math.cos(g))*Math.sin(_),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const _=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,x=(i+1)*f+p;o.push(_,g,x),o.push(g,m,x)}this.setIndex(o),this.setAttribute("position",new Se(a,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ya extends ke{constructor(e=1,t=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],c=[],l=[],h=[],u=new T,d=new T,f=new T,p=new T,_=new T,g=new T,m=new T;for(let A=0;A<=n;++A){const y=A/n*s*Math.PI*2;x(y,s,o,e,f),x(y+.01,s,o,e,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let R=0;R<=i;++R){const b=R/i*Math.PI*2,w=-t*Math.cos(b),L=t*Math.sin(b);u.x=f.x+(w*m.x+L*_.x),u.y=f.y+(w*m.y+L*_.y),u.z=f.z+(w*m.z+L*_.z),c.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),l.push(d.x,d.y,d.z),h.push(A/n),h.push(R/i)}}for(let A=1;A<=n;A++)for(let y=1;y<=i;y++){const R=(i+1)*(A-1)+(y-1),b=(i+1)*A+(y-1),w=(i+1)*A+y,L=(i+1)*(A-1)+y;a.push(R,b,L),a.push(b,w,L)}this.setIndex(a),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(l,3)),this.setAttribute("uv",new Se(h,2));function x(A,y,R,b,w){const L=Math.cos(A),v=Math.sin(A),S=R/y*A,F=Math.cos(S);w.x=b*(2+F)*.5*L,w.y=b*(2+F)*v*.5,w.z=b*Math.sin(S)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ya(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class va extends ke{constructor(e=new Gl(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new T,c=new T,l=new X;let h=new T;const u=[],d=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Se(u,3)),this.setAttribute("normal",new Se(d,3)),this.setAttribute("uv",new Se(f,2));function _(){for(let A=0;A<t;A++)g(A);g(s===!1?t:0),x(),m()}function g(A){h=e.getPointAt(A/t,h);const y=o.normals[A],R=o.binormals[A];for(let b=0;b<=i;b++){const w=b/i*Math.PI*2,L=Math.sin(w),v=-Math.cos(w);c.x=v*y.x+L*R.x,c.y=v*y.y+L*R.y,c.z=v*y.z+L*R.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function m(){for(let A=1;A<=t;A++)for(let y=1;y<=i;y++){const R=(i+1)*(A-1)+(y-1),b=(i+1)*A+(y-1),w=(i+1)*A+y,L=(i+1)*(A-1)+y;p.push(R,b,L),p.push(b,w,L)}}function x(){for(let A=0;A<=t;A++)for(let y=0;y<=i;y++)l.x=A/t,l.y=y/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new va(new Xo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class zl extends ke{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new T,s=new T;if(e.index!==null){const o=e.attributes.position,a=e.index;let c=e.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){const u=c[l],d=u.start,f=u.count;for(let p=d,_=d+f;p<_;p+=3)for(let g=0;g<3;g++){const m=a.getX(p+g),x=a.getX(p+(g+1)%3);i.fromBufferAttribute(o,m),s.fromBufferAttribute(o,x),gu(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const o=e.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){const h=3*a+l,u=3*a+(l+1)%3;i.fromBufferAttribute(o,h),s.fromBufferAttribute(o,u),gu(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Se(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function gu(r,e,t){const n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var _u=Object.freeze({__proto__:null,BoxGeometry:Zi,CapsuleGeometry:la,CircleGeometry:ha,ConeGeometry:ua,CylinderGeometry:Ns,DodecahedronGeometry:da,EdgesGeometry:wf,ExtrudeGeometry:pa,IcosahedronGeometry:ma,LatheGeometry:wr,OctahedronGeometry:Rr,PlaneGeometry:Er,PolyhedronGeometry:pi,RingGeometry:ga,ShapeGeometry:_a,SphereGeometry:Br,TetrahedronGeometry:Aa,TorusGeometry:xa,TorusKnotGeometry:ya,TubeGeometry:va,WireframeGeometry:zl});class Lf extends Tt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new de(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Pf extends _n{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ir extends Tt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new de(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cn extends Ir{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new X(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new de(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new de(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new de(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Df extends Tt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new de(16777215),this.specular=new de(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=yr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ff extends Tt{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new de(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Uf extends Tt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Nf extends Tt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=yr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Of extends Tt{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new de(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Gf extends Ht{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Ui(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Hf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function zf(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function il(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)i[o++]=r[a+c]}return i}function kl(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}function ey(r,e,t,n,i=30){const s=r.clone();s.name=e;const o=[];for(let c=0;c<s.tracks.length;++c){const l=s.tracks[c],h=l.getValueSize(),u=[],d=[];for(let f=0;f<l.times.length;++f){const p=l.times[f]*i;if(!(p<t||p>=n)){u.push(l.times[f]);for(let _=0;_<h;++_)d.push(l.values[f*h+_])}}u.length!==0&&(l.times=Ui(u,l.times.constructor),l.values=Ui(d,l.values.constructor),o.push(l))}s.tracks=o;let a=1/0;for(let c=0;c<s.tracks.length;++c)a>s.tracks[c].times[0]&&(a=s.tracks[c].times[0]);for(let c=0;c<s.tracks.length;++c)s.tracks[c].shift(-1*a);return s.resetDuration(),s}function ty(r,e=0,t=r,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let o=0;o<i;++o){const a=t.tracks[o],c=a.ValueTypeName;if(c==="bool"||c==="string")continue;const l=r.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===c});if(l===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=l.getValueSize();l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=a.times.length-1;let _;if(s<=a.times[0]){const m=h,x=u-h;_=a.values.slice(m,x)}else if(s>=a.times[p]){const m=p*u+h,x=m+u-h;_=a.values.slice(m,x)}else{const m=a.createInterpolant(),x=h,A=u-h;m.evaluate(s),_=m.resultBuffer.slice(x,A)}c==="quaternion"&&new It().fromArray(_).normalize().conjugate().toArray(_);const g=l.times.length;for(let m=0;m<g;++m){const x=m*f+d;if(c==="quaternion")It.multiplyQuaternionsFlat(l.values,x,_,0,l.values,x);else{const A=f-d*2;for(let y=0;y<A;++y)l.values[x+y]-=_[y]}}}return r.blendMode=gl,r}const ny={convertArray:Ui,isTypedArray:Hf,getKeyframeOrder:zf,sortedArray:il,flattenJSON:kl,subclip:ey,makeClipAdditive:ty};class Os{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class kf extends Os{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pi,endingEnd:Pi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Di:s=e,a=2*t-n;break;case cr:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Di:o=e,c=2*n-t;break;case cr:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,x=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,A=(-1-f)*g+(1.5+f)*_+.5*p,y=f*g-f*_;for(let R=0;R!==a;++R)s[R]=m*o[h+R]+x*o[l+R]+A*o[c+R]+y*o[u+R];return s}}class Vl extends Os{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[l+d]*u+o[c+d]*h;return s}}class Vf extends Os{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class yn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ui(t,this.TimeBufferType),this.values=Ui(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ui(e.times,Array),values:Ui(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Vf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Vl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new kf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Bs:t=this.InterpolantFactoryMethodDiscrete;break;case Wi:t=this.InterpolantFactoryMethodLinear;break;case No:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bs;case this.InterpolantFactoryMethodLinear:return Wi;case this.InterpolantFactoryMethodSmooth:return No}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){e=!1;break}if(o!==null&&o>c){e=!1;break}o=c}if(i!==void 0&&Hf(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===No,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{const u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const _=t[u+p];if(_!==t[d+p]||_!==t[f+p]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=Wi;class Qi extends yn{}Qi.prototype.ValueTypeName="bool";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=Bs;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;class Wl extends yn{}Wl.prototype.ValueTypeName="color";class Ki extends yn{}Ki.prototype.ValueTypeName="number";class Wf extends Os{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t);let l=e*a;for(let h=l+a;l!==h;l+=4)It.slerpFlat(s,0,o,l-a,o,l,c);return s}}class di extends yn{InterpolantFactoryMethodLinear(e){return new Wf(this.times,this.values,this.getValueSize(),e)}}di.prototype.ValueTypeName="quaternion";di.prototype.DefaultInterpolation=Wi;di.prototype.InterpolantFactoryMethodSmooth=void 0;class ji extends yn{}ji.prototype.ValueTypeName="string";ji.prototype.ValueBufferType=Array;ji.prototype.DefaultInterpolation=Bs;ji.prototype.InterpolantFactoryMethodLinear=void 0;ji.prototype.InterpolantFactoryMethodSmooth=void 0;class Yi extends yn{}Yi.prototype.ValueTypeName="vector";class Ds{constructor(e,t=-1,n,i=Qo){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=nn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(sy(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(yn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const h=zf(c);c=il(c,1,h),l=il(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new Ki(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return null;const n=function(u,d,f,p,_){if(f.length!==0){const g=[],m=[];kl(f,g,m,p),g.length!==0&&_.push(new u(d,g,m))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let x=0;x!==d[p].morphTargets.length;++x){const A=d[p];g.push(A.time),m.push(A.morphTarget===_?1:0)}i.push(new Ki(".morphTargetInfluence["+_+"]",g,m))}c=f.length*o}else{const f=".bones["+t[u].name+"]";n(Yi,f+".position",d,"pos",i),n(di,f+".quaternion",d,"rot",i),n(Yi,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function iy(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ki;case"vector":case"vector2":case"vector3":case"vector4":return Yi;case"color":return Wl;case"quaternion":return di;case"bool":case"boolean":return Qi;case"string":return ji}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function sy(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=iy(r.type);if(r.times===void 0){const t=[],n=[];kl(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const kn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Xl{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],p=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const Xf=new Xl;class zt{constructor(e){this.manager=e!==void 0?e:Xf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}zt.DEFAULT_MATERIAL_NAME="__DEFAULT";const Un={};class ry extends Error{constructor(e,t){super(e),this.response=t}}class sn extends zt{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=kn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Un[e]!==void 0){Un[e].push({onLoad:t,onProgress:n,onError:i});return}Un[e]=[],Un[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status,typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Un[e],u=l.body.getReader(),d=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),f=d?parseInt(d):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){x();function x(){u.read().then(({done:A,value:y})=>{if(A)m.close();else{_+=y.byteLength;const R=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let b=0,w=h.length;b<w;b++){const L=h[b];L.onProgress&&L.onProgress(R)}m.enqueue(y),x()}})}}});return new Response(g)}else throw new ry(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(p=>f.decode(p))}}}).then(l=>{kn.add(e,l);const h=Un[e];delete Un[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Un[e];if(h===void 0)throw this.manager.itemError(e),l;delete Un[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class oy extends zt{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new sn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(s.parse(JSON.parse(a)))}catch(c){i&&i(c),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=Ds.parse(e[n]);t.push(i)}return t}}class ay extends zt{constructor(e){super(e)}load(e,t,n,i){const s=this,o=[],a=new aa,c=new sn(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(s.withCredentials);let l=0;function h(u){c.load(e[u],function(d){const f=s.parse(d,!0);o[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},l+=1,l===6&&(f.mipmapCount===1&&(a.minFilter=ht),a.image=o,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let u=0,d=e.length;u<d;++u)h(u);else c.load(e,function(u){const d=s.parse(u,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let p=0;p<f;p++){o[p]={mipmaps:[]};for(let _=0;_<d.mipmapCount;_++)o[p].mipmaps.push(d.mipmaps[p*d.mipmapCount+_]),o[p].format=d.format,o[p].width=d.width,o[p].height=d.height}a.image=o}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=ht),a.format=d.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}}class Ar extends zt{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=kn.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=fr("img");function c(){h(),kn.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class cy extends zt{constructor(e){super(e)}load(e,t,n,i){const s=new Sr;s.colorSpace=St;const o=new Ar(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function c(l){o.load(e[l],function(h){s.images[l]=h,a++,a===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let l=0;l<e.length;++l)c(l);return s}}class ly extends zt{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Hi,a=new sn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(c){let l;try{l=s.parse(c)}catch(h){if(i!==void 0)i(h);else return}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:Ft,o.wrapT=l.wrapT!==void 0?l.wrapT:Ft,o.magFilter=l.magFilter!==void 0?l.magFilter:ht,o.minFilter=l.minFilter!==void 0?l.minFilter:ht,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0?o.colorSpace=l.colorSpace:l.encoding!==void 0&&(o.encoding=l.encoding),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=wn),l.mipmapCount===1&&(o.minFilter=ht),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,i),o}}class Jf extends zt{constructor(e){super(e)}load(e,t,n,i){const s=new dt,o=new Ar(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class mi extends it{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new de(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Kf extends mi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.groundColor=new de(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const oc=new Pe,Au=new T,xu=new T;class Jl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new X(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new br,this._frameExtents=new X(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Au.setFromMatrixPosition(e.matrixWorld),t.position.copy(Au),xu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xu),t.updateMatrixWorld(),oc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(oc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class hy extends Jl{constructor(){super(new yt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ls*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Kl extends mi{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new hy}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const yu=new Pe,Zs=new T,ac=new T;class uy extends Jl{constructor(){super(new yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new X(4,2),this._viewportCount=6,this._viewports=[new nt(2,1,1,1),new nt(0,1,1,1),new nt(3,1,1,1),new nt(1,1,1,1),new nt(3,0,1,1),new nt(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Zs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Zs),ac.copy(n.position),ac.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ac),n.updateMatrixWorld(),i.makeTranslation(-Zs.x,-Zs.y,-Zs.z),yu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yu)}}class Yl extends mi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new uy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class dy extends Jl{constructor(){super(new ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ql extends mi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.shadow=new dy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Yf extends mi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class qf extends mi{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class Zf{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new T)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*s),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*s)),t.addScaledVector(o[6],.315392*(3*s*s-1)),t.addScaledVector(o[7],1.092548*(n*s)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*s),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*s),t.addScaledVector(o[6],.743125*s*s-.247708),t.addScaledVector(o[7],2*.429043*n*s),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Qf extends mi{constructor(e=new Zf,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class Ma extends zt{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,o=new sn(s.manager);o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(a){try{t(s.parse(JSON.parse(a)))}catch(c){i&&i(c),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s],t[s]}const i=Ma.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new de().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const o=e.uniforms[s];switch(i.uniforms[s]={},o.type){case"t":i.uniforms[s].value=n(o.value);break;case"c":i.uniforms[s].value=new de().setHex(o.value);break;case"v2":i.uniforms[s].value=new X().fromArray(o.value);break;case"v3":i.uniforms[s].value=new T().fromArray(o.value);break;case"v4":i.uniforms[s].value=new nt().fromArray(o.value);break;case"m3":i.uniforms[s].value=new Ke().fromArray(o.value);break;case"m4":i.uniforms[s].value=new Pe().fromArray(o.value);break;default:i.uniforms[s].value=o.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new X().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new X().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}static createMaterialFromType(e){const t={ShadowMaterial:Lf,SpriteMaterial:Bl,RawShaderMaterial:Pf,ShaderMaterial:_n,PointsMaterial:oa,MeshPhysicalMaterial:cn,MeshStandardMaterial:Ir,MeshPhongMaterial:Df,MeshToonMaterial:Ff,MeshNormalMaterial:Uf,MeshLambertMaterial:Nf,MeshDepthMaterial:wl,MeshDistanceMaterial:Rl,MeshBasicMaterial:tn,MeshMatcapMaterial:Of,LineDashedMaterial:Gf,LineBasicMaterial:Ht,Material:Tt};return new t[e]}}class li{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Zl extends ke{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class jf extends zt{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new sn(s.manager);o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(a){try{t(s.parse(JSON.parse(a)))}catch(c){i&&i(c),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];const g=f.interleavedBuffers[p],m=s(f,g.buffer),x=ys(g.type,m),A=new Tr(x,g.stride);return A.uuid=g.uuid,t[p]=A,A}function s(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const o=e.isInstancedBufferGeometry?new Zl:new ke,a=e.data.index;if(a!==void 0){const f=ys(a.type,a.array);o.setIndex(new $e(f,1))}const c=e.data.attributes;for(const f in c){const p=c[f];let _;if(p.isInterleavedBufferAttribute){const g=i(e.data,p.data);_=new Zt(g,p.itemSize,p.offset,p.normalized)}else{const g=ys(p.type,p.array),m=p.isInstancedBufferAttribute?Xi:$e;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),o.setAttribute(f,_)}const l=e.data.morphAttributes;if(l)for(const f in l){const p=l[f],_=[];for(let g=0,m=p.length;g<m;g++){const x=p[g];let A;if(x.isInterleavedBufferAttribute){const y=i(e.data,x.data);A=new Zt(y,x.itemSize,x.offset,x.normalized)}else{const y=ys(x.type,x.array);A=new $e(y,x.itemSize,x.normalized)}x.name!==void 0&&(A.name=x.name),_.push(A)}o.morphAttributes[f]=_}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const u=e.data.groups||e.data.drawcalls||e.data.offsets;if(u!==void 0)for(let f=0,p=u.length;f!==p;++f){const _=u[f];o.addGroup(_.start,_.count,_.materialIndex)}const d=e.data.boundingSphere;if(d!==void 0){const f=new T;d.center!==void 0&&f.fromArray(d.center),o.boundingSphere=new Et(f,d.radius)}return e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}}class fy extends zt{constructor(e){super(e)}load(e,t,n,i){const s=this,o=this.path===""?li.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;const a=new sn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(c){let l=null;try{l=JSON.parse(c)}catch(u){i!==void 0&&i(u);return}const h=l.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e));return}s.parse(l,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?li.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new sn(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const o=await s.loadAsync(e,t),a=JSON.parse(o),c=a.metadata;if(c===void 0||c.type===void 0||c.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(l)}),a=this.parseTextures(e.textures,o),c=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,s,c,a,n),h=this.parseSkeletons(e.skeletons,l);if(this.bindSkeletons(l,h),t!==void 0){let u=!1;for(const d in o)if(o[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&t(l)}return l}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,s),a=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,i,a,o,t),l=this.parseSkeletons(e.skeletons,c);return this.bindSkeletons(c,l),c}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new zi().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,o=e.length;s<o;s++){const a=new Cr().fromJSON(e[s],i);n[a.uuid]=a}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new jf;for(let s=0,o=e.length;s<o;s++){let a;const c=e[s];switch(c.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(c);break;default:c.type in _u&&(a=_u[c.type].fromJSON(c,t))}a.uuid=c.uuid,c.name!==void 0&&(a.name=c.name),c.userData!==void 0&&(a.userData=c.userData),n[c.uuid]=a}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new Ma;s.setTextures(t);for(let o=0,a=e.length;o<a;o++){const c=e[o];n[c.uuid]===void 0&&(n[c.uuid]=s.parse(c)),i[c.uuid]=n[c.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=Ds.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function o(c){return n.manager.itemStart(c),s.load(c,function(){n.manager.itemEnd(c)},void 0,function(){n.manager.itemError(c),n.manager.itemEnd(c)})}function a(c){if(typeof c=="string"){const l=c,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(l)?l:n.resourcePath+l;return o(h)}else return c.data?{data:ys(c.type,c.data),width:c.width,height:c.height}:null}if(e!==void 0&&e.length>0){const c=new Xl(t);s=new Ar(c),s.setCrossOrigin(this.crossOrigin);for(let l=0,h=e.length;l<h;l++){const u=e[l],d=u.url;if(Array.isArray(d)){const f=[];for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new Hi(m.data,m.width,m.height)))}i[u.uuid]=new Fi(f)}else{const f=a(u.url);i[u.uuid]=new Fi(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(o){if(typeof o=="string"){const a=o,c=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(c)}else return o.data?{data:ys(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new Ar(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){const c=e[o],l=c.url;if(Array.isArray(l)){const h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u],p=await s(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new Hi(p.data,p.width,p.height)))}n[c.uuid]=new Fi(h)}else{const h=await s(c.url);n[c.uuid]=new Fi(h)}}}return n}parseTextures(e,t){function n(s,o){return typeof s=="number"?s:o[s]}const i={};if(e!==void 0)for(let s=0,o=e.length;s<o;s++){const a=e[s];a.image,t[a.image];const c=t[a.image],l=c.data;let h;Array.isArray(l)?(h=new Sr,l.length===6&&(h.needsUpdate=!0)):(l&&l.data?h=new Hi:h=new dt,l&&(h.needsUpdate=!0)),h.source=c,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,py)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],vu),h.wrapT=n(a.wrap[1],vu)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.encoding!==void 0&&(h.encoding=a.encoding),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,Mu)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,Mu)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(e,t,n,i,s){let o;function a(d){return t[d],t[d]}function c(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let p=0,_=d.length;p<_;p++){const g=d[p];n[g],f.push(n[g])}return f}return n[d],n[d]}}function l(d){return i[d],i[d]}let h,u;switch(e.type){case"Scene":o=new Af,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new de(e.background):o.background=l(e.background)),e.environment!==void 0&&(o.environment=l(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new sa(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new ia(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity);break;case"PerspectiveCamera":o=new yt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new ci(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new Yf(e.color,e.intensity);break;case"DirectionalLight":o=new ql(e.color,e.intensity);break;case"PointLight":o=new Yl(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new qf(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new Kl(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay);break;case"HemisphereLight":o=new Kf(e.color,e.groundColor,e.intensity);break;case"LightProbe":o=new Qf().fromJSON(e);break;case"SkinnedMesh":h=a(e.geometry),u=c(e.material),o=new Il(h,u),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":h=a(e.geometry),u=c(e.material),o=new vt(h,u);break;case"InstancedMesh":h=a(e.geometry),u=c(e.material);const d=e.count,f=e.instanceMatrix,p=e.instanceColor;o=new Ll(h,u,d),o.instanceMatrix=new Xi(new Float32Array(f.array),16),p!==void 0&&(o.instanceColor=new Xi(new Float32Array(p.array),p.itemSize));break;case"BatchedMesh":h=a(e.geometry),u=c(e.material),o=new Mf(e.maxGeometryCount,e.maxVertexCount,e.maxIndexCount,u),o.geometry=h,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._visibility=e.visibility,o._active=e.active,o._bounds=e.bounds.map(_=>{const g=new bt;g.min.fromArray(_.boxMin),g.max.fromArray(_.boxMax);const m=new Et;return m.radius=_.sphereRadius,m.center.fromArray(_.sphereCenter),{boxInitialized:_.boxInitialized,box:g,sphereInitialized:_.sphereInitialized,sphere:m}}),o._maxGeometryCount=e.maxGeometryCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._geometryCount=e.geometryCount,o._matricesTexture=l(e.matricesTexture.uuid);break;case"LOD":o=new vf;break;case"Line":o=new Yn(a(e.geometry),c(e.material));break;case"LineLoop":o=new Pl(a(e.geometry),c(e.material));break;case"LineSegments":o=new An(a(e.geometry),c(e.material));break;case"PointCloud":case"Points":o=new Dl(a(e.geometry),c(e.material));break;case"Sprite":o=new yf(c(e.material));break;case"Group":o=new zn;break;case"Bone":o=new ra;break;default:o=new it}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)o.add(this.parseObject(d[f],t,n,i,s))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const p=d[f];o.animations.push(s[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const p=d[f],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0||n.bind(i,n.bindMatrix)}})}}const py={UVMapping:Yo,CubeReflectionMapping:Kn,CubeRefractionMapping:hi,EquirectangularReflectionMapping:rr,EquirectangularRefractionMapping:or,CubeUVReflectionMapping:Fs},vu={RepeatWrapping:ui,ClampToEdgeWrapping:Ft,MirroredRepeatWrapping:ws},Mu={NearestFilter:mt,NearestMipmapNearestFilter:ar,NearestMipmapLinearFilter:Es,LinearFilter:ht,LinearMipmapNearestFilter:qo,LinearMipmapLinearFilter:wn};class $f extends zt{constructor(e){super(e),this.isImageBitmapLoader=!0,this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=kn.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),s.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return kn.add(e,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),kn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});kn.add(e,c),s.manager.itemStart(e)}}let yo;class Ql{static getContext(){return yo===void 0&&(yo=new(window.AudioContext||window.webkitAudioContext)),yo}static setContext(e){yo=e}}class my extends zt{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new sn(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{const l=c.slice(0);Ql.getContext().decodeAudioData(l,function(u){t(u)}).catch(a)}catch(l){a(l)}},n,i);function a(c){i&&i(c),s.manager.itemError(e)}}}const Su=new Pe,bu=new Pe,Si=new Pe;class gy{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new yt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new yt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,Si.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,o=t.near*Math.tan(Gi*t.fov*.5)/t.zoom;let a,c;bu.elements[12]=-i,Su.elements[12]=i,a=-o*t.aspect+s,c=o*t.aspect+s,Si.elements[0]=2*t.near/(c-a),Si.elements[8]=(c+a)/(c-a),this.cameraL.projectionMatrix.copy(Si),a=-o*t.aspect-s,c=o*t.aspect-s,Si.elements[0]=2*t.near/(c-a),Si.elements[8]=(c+a)/(c-a),this.cameraR.projectionMatrix.copy(Si)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(bu),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(Su)}}class ep{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Eu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Eu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Eu(){return(typeof performance>"u"?Date:performance).now()}const bi=new T,Tu=new It,_y=new T,Ei=new T;class Ay extends it{constructor(){super(),this.type="AudioListener",this.context=Ql.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new ep}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(bi,Tu,_y),Ei.set(0,0,-1).applyQuaternion(Tu),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(bi.x,i),t.positionY.linearRampToValueAtTime(bi.y,i),t.positionZ.linearRampToValueAtTime(bi.z,i),t.forwardX.linearRampToValueAtTime(Ei.x,i),t.forwardY.linearRampToValueAtTime(Ei.y,i),t.forwardZ.linearRampToValueAtTime(Ei.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(bi.x,bi.y,bi.z),t.setOrientation(Ei.x,Ei.y,Ei.z,n.x,n.y,n.z)}}class tp extends it{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0||this.hasPlaybackControl===!1)return;this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl!==!1)return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl!==!1)return this._progress=0,this.source!==null&&(this.source.stop(),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){if(this.detune=e,this.source.detune!==void 0)return this.isPlaying===!0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl!==!1)return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?!1:this.loop}setLoop(e){if(this.hasPlaybackControl!==!1)return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}const Ti=new T,Cu=new It,xy=new T,Ci=new T;class yy extends tp{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ti,Cu,xy),Ci.set(0,0,1).applyQuaternion(Cu);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Ti.x,n),t.positionY.linearRampToValueAtTime(Ti.y,n),t.positionZ.linearRampToValueAtTime(Ti.z,n),t.orientationX.linearRampToValueAtTime(Ci.x,n),t.orientationY.linearRampToValueAtTime(Ci.y,n),t.orientationZ.linearRampToValueAtTime(Ci.z,n)}else t.setPosition(Ti.x,Ti.y,Ti.z),t.setOrientation(Ci.x,Ci.y,Ci.z)}}class vy{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class np{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){It.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;It.multiplyQuaternionsFlat(e,o,e,t,e,n),It.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const c=t+a;e[c]=e[c]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const jl="\\[\\]\\.:\\/",My=new RegExp("["+jl+"]","g"),$l="[^"+jl+"]",Sy="[^"+jl.replace("\\.","")+"]",by=/((?:WC+[\/:])*)/.source.replace("WC",$l),Ey=/(WCOD+)?/.source.replace("WCOD",Sy),Ty=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$l),Cy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$l),wy=new RegExp("^"+by+Ey+Ty+Cy+"$"),Ry=["material","materials","bones","map"];class By{constructor(e,t,n){const i=n||tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class tt{constructor(e,t,n){this.path=t,this.parsedPath=n||tt.parseTrackName(t),this.node=tt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new tt.Composite(e,t,n):new tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(My,"")}static parseTrackName(e){const t=wy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Ry.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=tt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return;if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material||!e.material.materials)return;e=e.material.materials;break;case"bones":if(!e.skeleton)return;e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material||!e.material.map)return;e=e.material.map;break;default:if(e[n]===void 0)return;e=e[n]}if(l!==void 0){if(e[l]===void 0)return;e=e[l]}}const o=e[i];if(o===void 0){const l=t.nodeName;return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry||!e.geometry.morphAttributes)return;e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}tt.Composite=By;tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};tt.prototype.GetterByBindingType=[tt.prototype._getValue_direct,tt.prototype._getValue_array,tt.prototype._getValue_arrayElement,tt.prototype._getValue_toArray];tt.prototype.SetterByBindingTypeAndVersioning=[[tt.prototype._setValue_direct,tt.prototype._setValue_direct_setNeedsUpdate,tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_array,tt.prototype._setValue_array_setNeedsUpdate,tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_arrayElement,tt.prototype._setValue_arrayElement_setNeedsUpdate,tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_fromArray,tt.prototype._setValue_fromArray_setNeedsUpdate,tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Iy{constructor(){this.isAnimationObjectGroup=!0,this.uuid=nn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,o=s.length;let a,c=e.length,l=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){const d=arguments[h],f=d.uuid;let p=t[f];if(p===void 0){p=c++,t[f]=p,e.push(d);for(let _=0,g=o;_!==g;++_)s[_].push(new tt(d,n[_],i[_]))}else if(p<l){a=e[p];const _=--l,g=e[_];t[g.uuid]=p,e[p]=g,t[f]=_,e[_]=d;for(let m=0,x=o;m!==x;++m){const A=s[m],y=A[_];let R=A[p];A[p]=y,R===void 0&&(R=new tt(d,n[m],i[m])),A[_]=R}}else e[p]}this.nCachedObjects_=l}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){const c=arguments[o],l=c.uuid,h=t[l];if(h!==void 0&&h>=s){const u=s++,d=e[u];t[d.uuid]=h,e[h]=d,t[l]=u,e[u]=c;for(let f=0,p=i;f!==p;++f){const _=n[f],g=_[u],m=_[h];_[h]=g,_[u]=m}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,o=e.length;for(let a=0,c=arguments.length;a!==c;++a){const l=arguments[a],h=l.uuid,u=t[h];if(u!==void 0)if(delete t[h],u<s){const d=--s,f=e[d],p=--o,_=e[p];t[f.uuid]=u,e[u]=f,t[_.uuid]=d,e[d]=_,e.pop();for(let g=0,m=i;g!==m;++g){const x=n[g],A=x[d],y=x[p];x[u]=A,x[d]=y,x.pop()}}else{const d=--o,f=e[d];d>0&&(t[f.uuid]=u),e[u]=f,e.pop();for(let p=0,_=i;p!==_;++p){const g=n[p];g[u]=g[d],g.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const o=this._paths,a=this._parsedPaths,c=this._objects,l=c.length,h=this.nCachedObjects_,u=new Array(l);i=s.length,n[e]=i,o.push(e),a.push(t),s.push(u);for(let d=h,f=c.length;d!==f;++d){const p=c[d];u[d]=new tt(p,e,t)}return u}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,o=this._bindings,a=o.length-1,c=o[a],l=e[a];t[l]=n,o[n]=c,o.pop(),s[n]=s[a],s.pop(),i[n]=i[a],i.pop()}}}class ip{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,a=new Array(o),c={endingStart:Pi,endingEnd:Pi};for(let l=0;l!==o;++l){const h=s[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=zd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case gl:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case Qo:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===kd;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===Hd){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Di,i.endingEnd=Di):(e?i.endingStart=this.zeroSlopeAtStart?Di:Pi:i.endingStart=cr,t?i.endingEnd=this.zeroSlopeAtEnd?Di:Pi:i.endingEnd=cr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=n,this}}const Ly=new Float32Array(1);class Py extends qn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let p=h[f];if(p!==void 0)++p.referenceCount,o[u]=p;else{if(p=o[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,c,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;p=new np(tt.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,c,f),o[u]=p}a[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Vl(new Float32Array(2),new Float32Array(2),1,Ly),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?Ds.findByName(i,e):e;const a=o!==null?o.uuid:e,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Qo),c!==void 0){const u=c.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const h=new ip(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Ds.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,s,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class eh{constructor(e){this.value=e}clone(){return new eh(this.value.clone===void 0?this.value:this.value.clone())}}let Dy=0;class Fy extends qn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:Dy++}),this.name="",this.usage=dr,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<s.length;o++)this.uniforms.push(s[o].clone())}return this}clone(){return new this.constructor().copy(this)}}class Jo extends Tr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class Uy{constructor(e,t,n,i,s){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}class Ny{constructor(e,t,n=0,i=1/0){this.ray=new qi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ea,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera&&(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t)}intersectObject(e,t=!0,n=[]){return sl(e,this,n,t),n.sort(wu),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)sl(e[i],this,n,t);return n.sort(wu),n}}function wu(r,e){return r.distance-e.distance}function sl(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,o=i.length;s<o;s++)sl(i[s],e,t,!0)}}class rl{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(gt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Oy{constructor(e=1,t=0,n=0){return this.radius=e,this.theta=t,this.y=n,this}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const Ru=new X;class Gy{constructor(e=new X(1/0,1/0),t=new X(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ru.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y)}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ru).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Bu=new T,vo=new T;class sp{constructor(e=new T,t=new T){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Bu.subVectors(e,this.start),vo.subVectors(this.end,this.start);const n=vo.dot(vo);let s=vo.dot(Bu)/n;return t&&(s=gt(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Iu=new T;class Hy extends it{constructor(e,t){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new ke,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,c=32;o<c;o++,a++){const l=o/c*Math.PI*2,h=a/c*Math.PI*2;i.push(Math.cos(l),Math.sin(l),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Se(i,3));const s=new Ht({fog:!1,toneMapped:!1});this.cone=new An(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Iu.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Iu),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const ni=new T,Mo=new Pe,cc=new Pe;class zy extends An{constructor(e){const t=rp(e),n=new ke,i=[],s=[],o=new de(0,0,1),a=new de(0,1,0);for(let l=0;l<t.length;l++){const h=t[l];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(o.r,o.g,o.b),s.push(a.r,a.g,a.b))}n.setAttribute("position",new Se(i,3)),n.setAttribute("color",new Se(s,3));const c=new Ht({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,c),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");cc.copy(this.root.matrixWorld).invert();for(let s=0,o=0;s<t.length;s++){const a=t[s];a.parent&&a.parent.isBone&&(Mo.multiplyMatrices(cc,a.matrixWorld),ni.setFromMatrixPosition(Mo),i.setXYZ(o,ni.x,ni.y,ni.z),Mo.multiplyMatrices(cc,a.parent.matrixWorld),ni.setFromMatrixPosition(Mo),i.setXYZ(o+1,ni.x,ni.y,ni.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose()}}function rp(r){const e=[];r.isBone===!0&&e.push(r);for(let t=0;t<r.children.length;t++)e.push.apply(e,rp(r.children[t]));return e}class ky extends vt{constructor(e,t,n){const i=new Br(t,4,2),s=new tn({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const Vy=new T,Lu=new de,Pu=new de;class Wy extends it{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Rr(t);i.rotateY(Math.PI*.5),this.material=new tn({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),o=new Float32Array(s.count*3);i.setAttribute("color",new $e(o,3)),this.add(new vt(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Lu.copy(this.light.color),Pu.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?Lu:Pu;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(Vy.setFromMatrixPosition(this.light.matrixWorld).negate())}}class Xy extends An{constructor(e=10,t=10,n=4473924,i=8947848){n=new de(n),i=new de(i);const s=t/2,o=e/t,a=e/2,c=[],l=[];for(let d=0,f=0,p=-a;d<=t;d++,p+=o){c.push(-a,0,p,a,0,p),c.push(p,0,-a,p,0,a);const _=d===s?n:i;_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3}const h=new ke;h.setAttribute("position",new Se(c,3)),h.setAttribute("color",new Se(l,3));const u=new Ht({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Jy extends An{constructor(e=10,t=16,n=8,i=64,s=4473924,o=8947848){s=new de(s),o=new de(o);const a=[],c=[];if(t>1)for(let u=0;u<t;u++){const d=u/t*(Math.PI*2),f=Math.sin(d)*e,p=Math.cos(d)*e;a.push(0,0,0),a.push(f,0,p);const _=u&1?s:o;c.push(_.r,_.g,_.b),c.push(_.r,_.g,_.b)}for(let u=0;u<n;u++){const d=u&1?s:o,f=e-e/n*u;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;a.push(g,0,m),c.push(d.r,d.g,d.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,a.push(g,0,m),c.push(d.r,d.g,d.b)}}const l=new ke;l.setAttribute("position",new Se(a,3)),l.setAttribute("color",new Se(c,3));const h=new Ht({vertexColors:!0,toneMapped:!1});super(l,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Du=new T,So=new T,Fu=new T;class Ky extends it{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new ke;i.setAttribute("position",new Se([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new Ht({fog:!1,toneMapped:!1});this.lightPlane=new Yn(i,s),this.add(this.lightPlane),i=new ke,i.setAttribute("position",new Se([0,0,0,0,0,1],3)),this.targetLine=new Yn(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Du.setFromMatrixPosition(this.light.matrixWorld),So.setFromMatrixPosition(this.light.target.matrixWorld),Fu.subVectors(So,Du),this.lightPlane.lookAt(So),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(So),this.targetLine.scale.z=Fu.length()}}const bo=new T,pt=new ta;class Yy extends An{constructor(e){const t=new ke,n=new Ht({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){c(p),c(_)}function c(p){i.push(0,0,0),s.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(i.length/3-1)}t.setAttribute("position",new Se(i,3)),t.setAttribute("color",new Se(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const l=new de(16755200),h=new de(16711680),u=new de(43775),d=new de(16777215),f=new de(3355443);this.setColors(l,h,u,d,f)}setColors(e,t,n,i,s){const a=this.geometry.getAttribute("color");a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,s.r,s.g,s.b),a.setXYZ(41,s.r,s.g,s.b),a.setXYZ(42,s.r,s.g,s.b),a.setXYZ(43,s.r,s.g,s.b),a.setXYZ(44,s.r,s.g,s.b),a.setXYZ(45,s.r,s.g,s.b),a.setXYZ(46,s.r,s.g,s.b),a.setXYZ(47,s.r,s.g,s.b),a.setXYZ(48,s.r,s.g,s.b),a.setXYZ(49,s.r,s.g,s.b),a.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;pt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),xt("c",t,e,pt,0,0,-1),xt("t",t,e,pt,0,0,1),xt("n1",t,e,pt,-n,-i,-1),xt("n2",t,e,pt,n,-i,-1),xt("n3",t,e,pt,-n,i,-1),xt("n4",t,e,pt,n,i,-1),xt("f1",t,e,pt,-n,-i,1),xt("f2",t,e,pt,n,-i,1),xt("f3",t,e,pt,-n,i,1),xt("f4",t,e,pt,n,i,1),xt("u1",t,e,pt,n*.7,i*1.1,-1),xt("u2",t,e,pt,-n*.7,i*1.1,-1),xt("u3",t,e,pt,0,i*2,-1),xt("cf1",t,e,pt,-n,0,1),xt("cf2",t,e,pt,n,0,1),xt("cf3",t,e,pt,0,-i,1),xt("cf4",t,e,pt,0,i,1),xt("cn1",t,e,pt,-n,0,-1),xt("cn2",t,e,pt,n,0,-1),xt("cn3",t,e,pt,0,-i,-1),xt("cn4",t,e,pt,0,i,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function xt(r,e,t,n,i,s,o){bo.set(i,s,o).unproject(n);const a=e[r];if(a!==void 0){const c=t.getAttribute("position");for(let l=0,h=a.length;l<h;l++)c.setXYZ(a[l],bo.x,bo.y,bo.z)}}const Eo=new bt;class qy extends An{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),s=new ke;s.setIndex(new $e(n,1)),s.setAttribute("position",new $e(i,3)),super(s,new Ht({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(e){if(this.object!==void 0&&Eo.setFromObject(this.object),Eo.isEmpty())return;const t=Eo.min,n=Eo.max,i=this.geometry.attributes.position,s=i.array;s[0]=n.x,s[1]=n.y,s[2]=n.z,s[3]=t.x,s[4]=n.y,s[5]=n.z,s[6]=t.x,s[7]=t.y,s[8]=n.z,s[9]=n.x,s[10]=t.y,s[11]=n.z,s[12]=n.x,s[13]=n.y,s[14]=t.z,s[15]=t.x,s[16]=n.y,s[17]=t.z,s[18]=t.x,s[19]=t.y,s[20]=t.z,s[21]=n.x,s[22]=t.y,s[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Zy extends An{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new ke;s.setIndex(new $e(n,1)),s.setAttribute("position",new Se(i,3)),super(s,new Ht({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class Qy extends Yn{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new ke;o.setAttribute("position",new Se(s,3)),o.computeBoundingSphere(),super(o,new Ht({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],c=new ke;c.setAttribute("position",new Se(a,3)),c.computeBoundingSphere(),this.add(new vt(c,new tn({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Uu=new T;let To,lc;class jy extends it{constructor(e=new T(0,0,1),t=new T(0,0,0),n=1,i=16776960,s=n*.2,o=s*.2){super(),this.type="ArrowHelper",To===void 0&&(To=new ke,To.setAttribute("position",new Se([0,0,0,0,1,0],3)),lc=new Ns(0,.5,1,5,1),lc.translate(0,-.5,0)),this.position.copy(t),this.line=new Yn(To,new Ht({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new vt(lc,new tn({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Uu.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Uu,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class $y extends An{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new ke;i.setAttribute("position",new Se(t,3)),i.setAttribute("color",new Se(n,3));const s=new Ht({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new de,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class ev{constructor(){this.type="ShapePath",this.color=new de,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new pr,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,o){return this.currentPath.bezierCurveTo(e,t,n,i,s,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(m){const x=[];for(let A=0,y=m.length;A<y;A++){const R=m[A],b=new zi;b.curves=R.curves,x.push(b)}return x}function n(m,x){const A=x.length;let y=!1;for(let R=A-1,b=0;b<A;R=b++){let w=x[R],L=x[b],v=L.x-w.x,S=L.y-w.y;if(Math.abs(S)>Number.EPSILON){if(S<0&&(w=x[b],v=-v,L=x[R],S=-S),m.y<w.y||m.y>L.y)continue;if(m.y===w.y){if(m.x===w.x)return!0}else{const F=S*(m.x-w.x)-v*(m.y-w.y);if(F===0)return!0;if(F<0)continue;y=!y}}else{if(m.y!==w.y)continue;if(L.x<=m.x&&m.x<=w.x||w.x<=m.x&&m.x<=L.x)return!0}}return y}const i=Tn.isClockWise,s=this.subPaths;if(s.length===0)return[];let o,a,c;const l=[];if(s.length===1)return a=s[0],c=new zi,c.curves=a.curves,l.push(c),l;let h=!i(s[0].getPoints());h=e?!h:h;const u=[],d=[];let f=[],p=0,_;d[p]=void 0,f[p]=[];for(let m=0,x=s.length;m<x;m++)a=s[m],_=a.getPoints(),o=i(_),o=e?!o:o,o?(!h&&d[p]&&p++,d[p]={s:new zi,p:_},d[p].s.curves=a.curves,h&&p++,f[p]=[]):f[p].push({h:a,p:_[0]});if(!d[0])return t(s);if(d.length>1){let m=!1,x=0;for(let A=0,y=d.length;A<y;A++)u[A]=[];for(let A=0,y=d.length;A<y;A++){const R=f[A];for(let b=0;b<R.length;b++){const w=R[b];let L=!0;for(let v=0;v<d.length;v++)n(w.p,d[v].p)&&(A!==v&&x++,L?(L=!1,u[v].push(w)):m=!0);L&&u[A].push(w)}}x>0&&m===!1&&(f=u)}let g;for(let m=0,x=d.length;m<x;m++){c=d[m].s,l.push(c),g=f[m];for(let A=0,y=g.length;A<y;A++)c.holes.push(g[A].h)}return l}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xr}}));typeof window<"u"&&(window.__THREE__||(window.__THREE__=xr));const qv=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:wd,AddEquation:si,AddOperation:bd,AdditiveAnimationBlendMode:gl,AdditiveBlending:Ac,AgXToneMapping:Bd,AlphaFormat:Dd,AlwaysCompare:$d,AlwaysDepth:_d,AlwaysStencilFunc:qc,AmbientLight:Yf,AnimationAction:ip,AnimationClip:Ds,AnimationLoader:oy,AnimationMixer:Py,AnimationObjectGroup:Iy,AnimationUtils:ny,ArcCurve:Sf,ArrayCamera:mf,ArrowHelper:jy,AttachedBindMode:Sc,Audio:tp,AudioAnalyser:vy,AudioContext:Ql,AudioListener:Ay,AudioLoader:my,AxesHelper:$y,BackSide:Xt,BasicDepthPacking:Wd,BasicShadowMap:_p,BatchedMesh:Mf,Bone:ra,BooleanKeyframeTrack:Qi,Box2:Gy,Box3:bt,Box3Helper:Zy,BoxGeometry:Zi,BoxHelper:qy,BufferAttribute:$e,BufferGeometry:ke,BufferGeometryLoader:jf,ByteType:Ld,Cache:kn,Camera:ta,CameraHelper:Yy,CanvasTexture:Tx,CapsuleGeometry:la,CatmullRomCurve3:bf,CineonToneMapping:Cd,CircleGeometry:ha,ClampToEdgeWrapping:Ft,Clock:ep,Color:de,ColorKeyframeTrack:Wl,ColorManagement:ot,CompressedArrayTexture:bx,CompressedCubeTexture:Ex,CompressedTexture:aa,CompressedTextureLoader:ay,ConeGeometry:ua,ConstantAlphaFactor:pd,ConstantColorFactor:dd,CubeCamera:of,CubeReflectionMapping:Kn,CubeRefractionMapping:hi,CubeTexture:Sr,CubeTextureLoader:cy,CubeUVReflectionMapping:Fs,CubicBezierCurve:Ul,CubicBezierCurve3:Ef,CubicInterpolant:kf,CullFaceBack:_c,CullFaceFront:ju,CullFaceFrontBack:gp,CullFaceNone:Qu,Curve:xn,CurvePath:Cf,CustomBlending:ed,CustomToneMapping:Rd,CylinderGeometry:Ns,Cylindrical:Oy,Data3DTexture:Sl,DataArrayTexture:$o,DataTexture:Hi,DataTextureLoader:ly,DataUtils:Sm,DecrementStencilOp:Tp,DecrementWrapStencilOp:wp,DefaultLoadingManager:Xf,DepthFormat:oi,DepthStencilFormat:Vi,DepthTexture:Cl,DetachedBindMode:Id,DirectionalLight:ql,DirectionalLightHelper:Ky,DiscreteInterpolant:Vf,DisplayP3ColorSpace:jo,DodecahedronGeometry:da,DoubleSide:fn,DstAlphaFactor:ad,DstColorFactor:ld,DynamicCopyUsage:Vp,DynamicDrawUsage:Np,DynamicReadUsage:Hp,EdgesGeometry:wf,EllipseCurve:ca,EqualCompare:qd,EqualDepth:xd,EqualStencilFunc:Lp,EquirectangularReflectionMapping:rr,EquirectangularRefractionMapping:or,Euler:Mr,EventDispatcher:qn,ExtrudeGeometry:pa,FileLoader:sn,Float16BufferAttribute:Rm,Float32BufferAttribute:Se,Float64BufferAttribute:Bm,FloatType:pn,Fog:sa,FogExp2:ia,FramebufferTexture:Sx,FrontSide:Cn,Frustum:br,GLBufferAttribute:Uy,GLSL1:Xp,GLSL3:Zc,GreaterCompare:Zd,GreaterDepth:vd,GreaterEqualCompare:jd,GreaterEqualDepth:yd,GreaterEqualStencilFunc:Up,GreaterStencilFunc:Dp,GridHelper:Xy,Group:zn,HalfFloatType:Rs,HemisphereLight:Kf,HemisphereLightHelper:Wy,IcosahedronGeometry:ma,ImageBitmapLoader:$f,ImageLoader:Ar,ImageUtils:Ml,IncrementStencilOp:Ep,IncrementWrapStencilOp:Cp,InstancedBufferAttribute:Xi,InstancedBufferGeometry:Zl,InstancedInterleavedBuffer:Jo,InstancedMesh:Ll,Int16BufferAttribute:Cm,Int32BufferAttribute:wm,Int8BufferAttribute:bm,IntType:ll,InterleavedBuffer:Tr,InterleavedBufferAttribute:Zt,Interpolant:Os,InterpolateDiscrete:Bs,InterpolateLinear:Wi,InterpolateSmooth:No,InvertStencilOp:Rp,KeepStencilOp:Ii,KeyframeTrack:yn,LOD:vf,LatheGeometry:wr,Layers:ea,LessCompare:Yd,LessDepth:Ad,LessEqualCompare:xl,LessEqualDepth:sr,LessEqualStencilFunc:Pp,LessStencilFunc:Ip,Light:mi,LightProbe:Qf,Line:Yn,Line3:sp,LineBasicMaterial:Ht,LineCurve:Nl,LineCurve3:Tf,LineDashedMaterial:Gf,LineLoop:Pl,LineSegments:An,LinearDisplayP3ColorSpace:vr,LinearEncoding:Al,LinearFilter:ht,LinearInterpolant:Vl,LinearMipMapLinearFilter:Mp,LinearMipMapNearestFilter:vp,LinearMipmapLinearFilter:wn,LinearMipmapNearestFilter:qo,LinearSRGBColorSpace:Rn,LinearToneMapping:Ed,LinearTransfer:lr,Loader:zt,LoaderUtils:li,LoadingManager:Xl,LoopOnce:Hd,LoopPingPong:kd,LoopRepeat:zd,LuminanceAlphaFormat:Ud,LuminanceFormat:Fd,MOUSE:Ri,Material:Tt,MaterialLoader:Ma,MathUtils:vl,Matrix3:Ke,Matrix4:Pe,MaxEquation:Mc,Mesh:vt,MeshBasicMaterial:tn,MeshDepthMaterial:wl,MeshDistanceMaterial:Rl,MeshLambertMaterial:Nf,MeshMatcapMaterial:Of,MeshNormalMaterial:Uf,MeshPhongMaterial:Df,MeshPhysicalMaterial:cn,MeshStandardMaterial:Ir,MeshToonMaterial:Ff,MinEquation:vc,MirroredRepeatWrapping:ws,MixOperation:Sd,MultiplyBlending:yc,MultiplyOperation:yr,NearestFilter:mt,NearestMipMapLinearFilter:yp,NearestMipMapNearestFilter:xp,NearestMipmapLinearFilter:Es,NearestMipmapNearestFilter:ar,NeverCompare:Kd,NeverDepth:gd,NeverStencilFunc:Bp,NoBlending:Vn,NoColorSpace:en,NoToneMapping:Wn,NormalAnimationBlendMode:Qo,NormalBlending:Oi,NotEqualCompare:Qd,NotEqualDepth:Md,NotEqualStencilFunc:Fp,NumberKeyframeTrack:Ki,Object3D:it,ObjectLoader:fy,ObjectSpaceNormalMap:Jd,OctahedronGeometry:Rr,OneFactor:sd,OneMinusConstantAlphaFactor:md,OneMinusConstantColorFactor:fd,OneMinusDstAlphaFactor:cd,OneMinusDstColorFactor:hd,OneMinusSrcAlphaFactor:Ho,OneMinusSrcColorFactor:od,OrthographicCamera:ci,P3Primaries:ur,PCFShadowMap:cl,PCFSoftShadowMap:$u,PMREMGenerator:jc,Path:pr,PerspectiveCamera:yt,Plane:On,PlaneGeometry:Er,PlaneHelper:Qy,PointLight:Yl,PointLightHelper:ky,Points:Dl,PointsMaterial:oa,PolarGridHelper:Jy,PolyhedronGeometry:pi,PositionalAudio:yy,PropertyBinding:tt,PropertyMixer:np,QuadraticBezierCurve:Ol,QuadraticBezierCurve3:Gl,Quaternion:It,QuaternionKeyframeTrack:di,QuaternionLinearInterpolant:Wf,RED_GREEN_RGTC2_Format:Kc,RED_RGTC1_Format:Gd,REVISION:xr,RGBADepthPacking:Xd,RGBAFormat:Yt,RGBAIntegerFormat:pl,RGBA_ASTC_10x10_Format:zc,RGBA_ASTC_10x5_Format:Oc,RGBA_ASTC_10x6_Format:Gc,RGBA_ASTC_10x8_Format:Hc,RGBA_ASTC_12x10_Format:kc,RGBA_ASTC_12x12_Format:Vc,RGBA_ASTC_4x4_Format:Bc,RGBA_ASTC_5x4_Format:Ic,RGBA_ASTC_5x5_Format:Lc,RGBA_ASTC_6x5_Format:Pc,RGBA_ASTC_6x6_Format:Dc,RGBA_ASTC_8x5_Format:Fc,RGBA_ASTC_8x6_Format:Uc,RGBA_ASTC_8x8_Format:Nc,RGBA_BPTC_Format:Uo,RGBA_ETC2_EAC_Format:Rc,RGBA_PVRTC_2BPPV1_Format:Cc,RGBA_PVRTC_4BPPV1_Format:Tc,RGBA_S3TC_DXT1_Format:Po,RGBA_S3TC_DXT3_Format:Do,RGBA_S3TC_DXT5_Format:Fo,RGB_BPTC_SIGNED_Format:Wc,RGB_BPTC_UNSIGNED_Format:Xc,RGB_ETC1_Format:ml,RGB_ETC2_Format:wc,RGB_PVRTC_2BPPV1_Format:Ec,RGB_PVRTC_4BPPV1_Format:bc,RGB_S3TC_DXT1_Format:Lo,RGFormat:Od,RGIntegerFormat:fl,RawShaderMaterial:Pf,Ray:qi,Raycaster:Ny,Rec709Primaries:hr,RectAreaLight:qf,RedFormat:Nd,RedIntegerFormat:dl,ReinhardToneMapping:Td,RenderTarget:nf,RepeatWrapping:ui,ReplaceStencilOp:bp,ReverseSubtractEquation:nd,RingGeometry:ga,SIGNED_RED_GREEN_RGTC2_Format:Yc,SIGNED_RED_RGTC1_Format:Jc,SRGBColorSpace:St,SRGBTransfer:at,Scene:Af,ShaderChunk:Xe,ShaderLib:dn,ShaderMaterial:_n,ShadowMaterial:Lf,Shape:zi,ShapeGeometry:_a,ShapePath:ev,ShapeUtils:Tn,ShortType:Pd,Skeleton:Cr,SkeletonHelper:zy,SkinnedMesh:Il,Source:Fi,Sphere:Et,SphereGeometry:Br,Spherical:rl,SphericalHarmonics3:Zf,SplineCurve:Hl,SpotLight:Kl,SpotLightHelper:Hy,Sprite:yf,SpriteMaterial:Bl,SrcAlphaFactor:Go,SrcAlphaSaturateFactor:ud,SrcColorFactor:rd,StaticCopyUsage:kp,StaticDrawUsage:dr,StaticReadUsage:Gp,StereoCamera:gy,StreamCopyUsage:Wp,StreamDrawUsage:Op,StreamReadUsage:zp,StringKeyframeTrack:ji,SubtractEquation:td,SubtractiveBlending:xc,TOUCH:Bi,TangentSpaceNormalMap:fi,TetrahedronGeometry:Aa,Texture:dt,TextureLoader:Jf,TorusGeometry:xa,TorusKnotGeometry:ya,Triangle:Kt,TriangleFanDrawMode:zo,TriangleStripDrawMode:_l,TrianglesDrawMode:Vd,TubeGeometry:va,TwoPassDoubleSide:Ap,UVMapping:Yo,Uint16BufferAttribute:bl,Uint32BufferAttribute:El,Uint8BufferAttribute:Em,Uint8ClampedBufferAttribute:Tm,Uniform:eh,UniformsGroup:Fy,UniformsLib:he,UniformsUtils:Wo,UnsignedByteType:Xn,UnsignedInt248Type:ri,UnsignedIntType:Hn,UnsignedShort4444Type:hl,UnsignedShort5551Type:ul,UnsignedShortType:Zo,VSMShadowMap:bn,Vector2:X,Vector3:T,Vector4:nt,VectorKeyframeTrack:Yi,VideoTexture:Mx,WebGL1Renderer:_f,WebGL3DRenderTarget:um,WebGLArrayRenderTarget:hm,WebGLCoordinateSystem:mn,WebGLCubeRenderTarget:af,WebGLMultipleRenderTargets:dm,WebGLRenderTarget:gn,WebGLRenderer:gf,WebGLUtils:pf,WebGPUCoordinateSystem:Is,WireframeGeometry:zl,WrapAroundEnding:cr,ZeroCurvatureEnding:Pi,ZeroFactor:id,ZeroSlopeEnding:Di,ZeroStencilOp:Sp,_SRGBAFormat:ko,createCanvasElement:tf,sRGBEncoding:ai},Symbol.toStringTag,{value:"Module"}));let Qs;function Zv(){var r;if(Qs!==void 0)return Qs;try{let e;const t=document.createElement("canvas");return Qs=!!(window.WebGL2RenderingContext&&(e=t.getContext("webgl2"))),e&&((r=e.getExtension("WEBGL_lose_context"))==null||r.loseContext()),Qs}catch{return Qs=!1}}const th=parseInt(xr.replace(/\D+/g,"")),op=th>=125?"uv1":"uv2";function Nu(r,e){if(e===Vd)return r;if(e===zo||e===_l){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);r.setIndex(o),t=r.getIndex()}else return r}const n=t.count-2,i=[];if(t)if(e===zo)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3;const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return r}var tv=Object.defineProperty,nv=(r,e,t)=>e in r?tv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,iv=(r,e,t)=>(nv(r,e+"",t),t);class sv{constructor(){iv(this,"_listeners")}addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}var rv=Object.defineProperty,ov=(r,e,t)=>e in r?rv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Le=(r,e,t)=>(ov(r,typeof e!="symbol"?e+"":e,t),t);const Co=new qi,Ou=new On,av=Math.cos(70*(Math.PI/180)),Gu=(r,e)=>(r%e+e)%e;class Qv extends sv{constructor(e,t){super(),Le(this,"object"),Le(this,"domElement"),Le(this,"enabled",!0),Le(this,"target",new T),Le(this,"minDistance",0),Le(this,"maxDistance",1/0),Le(this,"minZoom",0),Le(this,"maxZoom",1/0),Le(this,"minPolarAngle",0),Le(this,"maxPolarAngle",Math.PI),Le(this,"minAzimuthAngle",-1/0),Le(this,"maxAzimuthAngle",1/0),Le(this,"enableDamping",!1),Le(this,"dampingFactor",.05),Le(this,"enableZoom",!0),Le(this,"zoomSpeed",1),Le(this,"enableRotate",!0),Le(this,"rotateSpeed",1),Le(this,"enablePan",!0),Le(this,"panSpeed",1),Le(this,"screenSpacePanning",!0),Le(this,"keyPanSpeed",7),Le(this,"zoomToCursor",!1),Le(this,"autoRotate",!1),Le(this,"autoRotateSpeed",2),Le(this,"reverseOrbit",!1),Le(this,"reverseHorizontalOrbit",!1),Le(this,"reverseVerticalOrbit",!1),Le(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),Le(this,"mouseButtons",{LEFT:Ri.ROTATE,MIDDLE:Ri.DOLLY,RIGHT:Ri.PAN}),Le(this,"touches",{ONE:Bi.ROTATE,TWO:Bi.DOLLY_PAN}),Le(this,"target0"),Le(this,"position0"),Le(this,"zoom0"),Le(this,"_domElementKeyEvents",null),Le(this,"getPolarAngle"),Le(this,"getAzimuthalAngle"),Le(this,"setPolarAngle"),Le(this,"setAzimuthalAngle"),Le(this,"getDistance"),Le(this,"getZoomScale"),Le(this,"listenToKeyEvents"),Le(this,"stopListenToKeyEvents"),Le(this,"saveState"),Le(this,"reset"),Le(this,"update"),Le(this,"connect"),Le(this,"dispose"),Le(this,"dollyIn"),Le(this,"dollyOut"),Le(this,"getScale"),Le(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>h.phi,this.getAzimuthalAngle=()=>h.theta,this.setPolarAngle=I=>{let Z=Gu(I,2*Math.PI),Ae=h.phi;Ae<0&&(Ae+=2*Math.PI),Z<0&&(Z+=2*Math.PI);let _e=Math.abs(Z-Ae);2*Math.PI-_e<_e&&(Z<Ae?Z+=2*Math.PI:Ae+=2*Math.PI),u.phi=Z-Ae,n.update()},this.setAzimuthalAngle=I=>{let Z=Gu(I,2*Math.PI),Ae=h.theta;Ae<0&&(Ae+=2*Math.PI),Z<0&&(Z+=2*Math.PI);let _e=Math.abs(Z-Ae);2*Math.PI-_e<_e&&(Z<Ae?Z+=2*Math.PI:Ae+=2*Math.PI),u.theta=Z-Ae,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=I=>{I.addEventListener("keydown",Ie),this._domElementKeyEvents=I},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",Ie),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),c=a.NONE},this.update=(()=>{const I=new T,Z=new T(0,1,0),Ae=new It().setFromUnitVectors(e.up,Z),_e=Ae.clone().invert(),re=new T,D=new It,le=2*Math.PI;return function(){const De=n.object.position;Ae.setFromUnitVectors(e.up,Z),_e.copy(Ae).invert(),I.copy(De).sub(n.target),I.applyQuaternion(Ae),h.setFromVector3(I),n.autoRotate&&c===a.NONE&&P(W()),n.enableDamping?(h.theta+=u.theta*n.dampingFactor,h.phi+=u.phi*n.dampingFactor):(h.theta+=u.theta,h.phi+=u.phi);let Te=n.minAzimuthAngle,je=n.maxAzimuthAngle;isFinite(Te)&&isFinite(je)&&(Te<-Math.PI?Te+=le:Te>Math.PI&&(Te-=le),je<-Math.PI?je+=le:je>Math.PI&&(je-=le),Te<=je?h.theta=Math.max(Te,Math.min(je,h.theta)):h.theta=h.theta>(Te+je)/2?Math.max(Te,h.theta):Math.min(je,h.theta)),h.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,h.phi)),h.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.zoomToCursor&&v||n.object.isOrthographicCamera?h.radius=V(h.radius):h.radius=V(h.radius*d),I.setFromSpherical(h),I.applyQuaternion(_e),De.copy(n.target).add(I),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),n.enableDamping===!0?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),f.set(0,0,0));let st=!1;if(n.zoomToCursor&&v){let ct=null;if(n.object instanceof yt&&n.object.isPerspectiveCamera){const _t=I.length();ct=V(_t*d);const rt=_t-ct;n.object.position.addScaledVector(w,rt),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const _t=new T(L.x,L.y,0);_t.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),st=!0;const rt=new T(L.x,L.y,0);rt.unproject(n.object),n.object.position.sub(rt).add(_t),n.object.updateMatrixWorld(),ct=I.length()}else n.zoomToCursor=!1;ct!==null&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(ct).add(n.object.position):(Co.origin.copy(n.object.position),Co.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Co.direction))<av?e.lookAt(n.target):(Ou.setFromNormalAndCoplanarPoint(n.object.up,n.target),Co.intersectPlane(Ou,n.target))))}else n.object instanceof ci&&n.object.isOrthographicCamera&&(st=d!==1,st&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix()));return d=1,v=!1,st||re.distanceToSquared(n.object.position)>l||8*(1-D.dot(n.object.quaternion))>l?(n.dispatchEvent(i),re.copy(n.object.position),D.copy(n.object.quaternion),st=!1,!0):!1}})(),this.connect=I=>{n.domElement=I,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",et),n.domElement.addEventListener("pointerdown",ie),n.domElement.addEventListener("pointercancel",j),n.domElement.addEventListener("wheel",xe)},this.dispose=()=>{var I,Z,Ae,_e,re,D;n.domElement&&(n.domElement.style.touchAction="auto"),(I=n.domElement)==null||I.removeEventListener("contextmenu",et),(Z=n.domElement)==null||Z.removeEventListener("pointerdown",ie),(Ae=n.domElement)==null||Ae.removeEventListener("pointercancel",j),(_e=n.domElement)==null||_e.removeEventListener("wheel",xe),(re=n.domElement)==null||re.ownerDocument.removeEventListener("pointermove",ee),(D=n.domElement)==null||D.ownerDocument.removeEventListener("pointerup",j),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",Ie)};const n=this,i={type:"change"},s={type:"start"},o={type:"end"},a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let c=a.NONE;const l=1e-6,h=new rl,u=new rl;let d=1;const f=new T,p=new X,_=new X,g=new X,m=new X,x=new X,A=new X,y=new X,R=new X,b=new X,w=new T,L=new X;let v=!1;const S=[],F={};function W(){return 2*Math.PI/60/60*n.autoRotateSpeed}function oe(){return Math.pow(.95,n.zoomSpeed)}function P(I){n.reverseOrbit||n.reverseHorizontalOrbit?u.theta+=I:u.theta-=I}function O(I){n.reverseOrbit||n.reverseVerticalOrbit?u.phi+=I:u.phi-=I}const k=(()=>{const I=new T;return function(Ae,_e){I.setFromMatrixColumn(_e,0),I.multiplyScalar(-Ae),f.add(I)}})(),Q=(()=>{const I=new T;return function(Ae,_e){n.screenSpacePanning===!0?I.setFromMatrixColumn(_e,1):(I.setFromMatrixColumn(_e,0),I.crossVectors(n.object.up,I)),I.multiplyScalar(Ae),f.add(I)}})(),q=(()=>{const I=new T;return function(Ae,_e){const re=n.domElement;if(re&&n.object instanceof yt&&n.object.isPerspectiveCamera){const D=n.object.position;I.copy(D).sub(n.target);let le=I.length();le*=Math.tan(n.object.fov/2*Math.PI/180),k(2*Ae*le/re.clientHeight,n.object.matrix),Q(2*_e*le/re.clientHeight,n.object.matrix)}else re&&n.object instanceof ci&&n.object.isOrthographicCamera?(k(Ae*(n.object.right-n.object.left)/n.object.zoom/re.clientWidth,n.object.matrix),Q(_e*(n.object.top-n.object.bottom)/n.object.zoom/re.clientHeight,n.object.matrix)):n.enablePan=!1}})();function J(I){n.object instanceof yt&&n.object.isPerspectiveCamera||n.object instanceof ci&&n.object.isOrthographicCamera?d=I:n.enableZoom=!1}function $(I){J(d/I)}function te(I){J(d*I)}function fe(I){if(!n.zoomToCursor||!n.domElement)return;v=!0;const Z=n.domElement.getBoundingClientRect(),Ae=I.clientX-Z.left,_e=I.clientY-Z.top,re=Z.width,D=Z.height;L.x=Ae/re*2-1,L.y=-(_e/D)*2+1,w.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function V(I){return Math.max(n.minDistance,Math.min(n.maxDistance,I))}function ne(I){p.set(I.clientX,I.clientY)}function me(I){fe(I),y.set(I.clientX,I.clientY)}function be(I){m.set(I.clientX,I.clientY)}function ve(I){_.set(I.clientX,I.clientY),g.subVectors(_,p).multiplyScalar(n.rotateSpeed);const Z=n.domElement;Z&&(P(2*Math.PI*g.x/Z.clientHeight),O(2*Math.PI*g.y/Z.clientHeight)),p.copy(_),n.update()}function Fe(I){R.set(I.clientX,I.clientY),b.subVectors(R,y),b.y>0?$(oe()):b.y<0&&te(oe()),y.copy(R),n.update()}function He(I){x.set(I.clientX,I.clientY),A.subVectors(x,m).multiplyScalar(n.panSpeed),q(A.x,A.y),m.copy(x),n.update()}function Ce(I){fe(I),I.deltaY<0?te(oe()):I.deltaY>0&&$(oe()),n.update()}function Ne(I){let Z=!1;switch(I.code){case n.keys.UP:q(0,n.keyPanSpeed),Z=!0;break;case n.keys.BOTTOM:q(0,-n.keyPanSpeed),Z=!0;break;case n.keys.LEFT:q(n.keyPanSpeed,0),Z=!0;break;case n.keys.RIGHT:q(-n.keyPanSpeed,0),Z=!0;break}Z&&(I.preventDefault(),n.update())}function B(){if(S.length==1)p.set(S[0].pageX,S[0].pageY);else{const I=.5*(S[0].pageX+S[1].pageX),Z=.5*(S[0].pageY+S[1].pageY);p.set(I,Z)}}function ce(){if(S.length==1)m.set(S[0].pageX,S[0].pageY);else{const I=.5*(S[0].pageX+S[1].pageX),Z=.5*(S[0].pageY+S[1].pageY);m.set(I,Z)}}function K(){const I=S[0].pageX-S[1].pageX,Z=S[0].pageY-S[1].pageY,Ae=Math.sqrt(I*I+Z*Z);y.set(0,Ae)}function ae(){n.enableZoom&&K(),n.enablePan&&ce()}function Y(){n.enableZoom&&K(),n.enableRotate&&B()}function we(I){if(S.length==1)_.set(I.pageX,I.pageY);else{const Ae=Me(I),_e=.5*(I.pageX+Ae.x),re=.5*(I.pageY+Ae.y);_.set(_e,re)}g.subVectors(_,p).multiplyScalar(n.rotateSpeed);const Z=n.domElement;Z&&(P(2*Math.PI*g.x/Z.clientHeight),O(2*Math.PI*g.y/Z.clientHeight)),p.copy(_)}function ge(I){if(S.length==1)x.set(I.pageX,I.pageY);else{const Z=Me(I),Ae=.5*(I.pageX+Z.x),_e=.5*(I.pageY+Z.y);x.set(Ae,_e)}A.subVectors(x,m).multiplyScalar(n.panSpeed),q(A.x,A.y),m.copy(x)}function E(I){const Z=Me(I),Ae=I.pageX-Z.x,_e=I.pageY-Z.y,re=Math.sqrt(Ae*Ae+_e*_e);R.set(0,re),b.set(0,Math.pow(R.y/y.y,n.zoomSpeed)),$(b.y),y.copy(R)}function M(I){n.enableZoom&&E(I),n.enablePan&&ge(I)}function N(I){n.enableZoom&&E(I),n.enableRotate&&we(I)}function ie(I){var Z,Ae;n.enabled!==!1&&(S.length===0&&((Z=n.domElement)==null||Z.ownerDocument.addEventListener("pointermove",ee),(Ae=n.domElement)==null||Ae.ownerDocument.addEventListener("pointerup",j)),Ye(I),I.pointerType==="touch"?ze(I):Ee(I))}function ee(I){n.enabled!==!1&&(I.pointerType==="touch"?se(I):ue(I))}function j(I){var Z,Ae,_e;Oe(I),S.length===0&&((Z=n.domElement)==null||Z.releasePointerCapture(I.pointerId),(Ae=n.domElement)==null||Ae.ownerDocument.removeEventListener("pointermove",ee),(_e=n.domElement)==null||_e.ownerDocument.removeEventListener("pointerup",j)),n.dispatchEvent(o),c=a.NONE}function Ee(I){let Z;switch(I.button){case 0:Z=n.mouseButtons.LEFT;break;case 1:Z=n.mouseButtons.MIDDLE;break;case 2:Z=n.mouseButtons.RIGHT;break;default:Z=-1}switch(Z){case Ri.DOLLY:if(n.enableZoom===!1)return;me(I),c=a.DOLLY;break;case Ri.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(n.enablePan===!1)return;be(I),c=a.PAN}else{if(n.enableRotate===!1)return;ne(I),c=a.ROTATE}break;case Ri.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(n.enableRotate===!1)return;ne(I),c=a.ROTATE}else{if(n.enablePan===!1)return;be(I),c=a.PAN}break;default:c=a.NONE}c!==a.NONE&&n.dispatchEvent(s)}function ue(I){if(n.enabled!==!1)switch(c){case a.ROTATE:if(n.enableRotate===!1)return;ve(I);break;case a.DOLLY:if(n.enableZoom===!1)return;Fe(I);break;case a.PAN:if(n.enablePan===!1)return;He(I);break}}function xe(I){n.enabled===!1||n.enableZoom===!1||c!==a.NONE&&c!==a.ROTATE||(I.preventDefault(),n.dispatchEvent(s),Ce(I),n.dispatchEvent(o))}function Ie(I){n.enabled===!1||n.enablePan===!1||Ne(I)}function ze(I){switch(Be(I),S.length){case 1:switch(n.touches.ONE){case Bi.ROTATE:if(n.enableRotate===!1)return;B(),c=a.TOUCH_ROTATE;break;case Bi.PAN:if(n.enablePan===!1)return;ce(),c=a.TOUCH_PAN;break;default:c=a.NONE}break;case 2:switch(n.touches.TWO){case Bi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ae(),c=a.TOUCH_DOLLY_PAN;break;case Bi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Y(),c=a.TOUCH_DOLLY_ROTATE;break;default:c=a.NONE}break;default:c=a.NONE}c!==a.NONE&&n.dispatchEvent(s)}function se(I){switch(Be(I),c){case a.TOUCH_ROTATE:if(n.enableRotate===!1)return;we(I),n.update();break;case a.TOUCH_PAN:if(n.enablePan===!1)return;ge(I),n.update();break;case a.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;M(I),n.update();break;case a.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;N(I),n.update();break;default:c=a.NONE}}function et(I){n.enabled!==!1&&I.preventDefault()}function Ye(I){S.push(I)}function Oe(I){delete F[I.pointerId];for(let Z=0;Z<S.length;Z++)if(S[Z].pointerId==I.pointerId){S.splice(Z,1);return}}function Be(I){let Z=F[I.pointerId];Z===void 0&&(Z=new X,F[I.pointerId]=Z),Z.set(I.pageX,I.pageY)}function Me(I){const Z=I.pointerId===S[0].pointerId?S[1]:S[0];return F[Z.pointerId]}this.dollyIn=(I=oe())=>{te(I),n.update()},this.dollyOut=(I=oe())=>{$(I),n.update()},this.getScale=()=>d,this.setScale=I=>{J(I),n.update()},this.getZoomScale=()=>oe(),t!==void 0&&this.connect(t),this.update()}}function Ko(r){if(typeof TextDecoder<"u")return new TextDecoder().decode(r);let e="";for(let t=0,n=r.length;t<n;t++)e+=String.fromCharCode(r[t]);try{return decodeURIComponent(escape(e))}catch{return e}}const Ni="srgb",Jn="srgb-linear",Hu=3001,cv=3e3;class jv extends zt{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new fv(t)}),this.register(function(t){return new pv(t)}),this.register(function(t){return new Sv(t)}),this.register(function(t){return new bv(t)}),this.register(function(t){return new Ev(t)}),this.register(function(t){return new gv(t)}),this.register(function(t){return new _v(t)}),this.register(function(t){return new Av(t)}),this.register(function(t){return new xv(t)}),this.register(function(t){return new dv(t)}),this.register(function(t){return new yv(t)}),this.register(function(t){return new mv(t)}),this.register(function(t){return new Mv(t)}),this.register(function(t){return new vv(t)}),this.register(function(t){return new hv(t)}),this.register(function(t){return new Tv(t)}),this.register(function(t){return new Cv(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=li.extractUrlBase(e);o=li.resolveURL(l,this.path)}else o=li.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){i&&i(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new sn(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={};if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(Ko(new Uint8Array(e.slice(0,4)))===ap){try{o[Qe.KHR_BINARY_GLTF]=new wv(e)}catch(h){i&&i(h);return}s=JSON.parse(o[Qe.KHR_BINARY_GLTF].content)}else s=JSON.parse(Ko(new Uint8Array(e)));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new zv(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let l=0;l<this.pluginCallbacks.length;l++){const h=this.pluginCallbacks[l](c);h.name,a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let l=0;l<s.extensionsUsed.length;++l){const h=s.extensionsUsed[l],u=s.extensionsRequired||[];switch(h){case Qe.KHR_MATERIALS_UNLIT:o[h]=new uv;break;case Qe.KHR_DRACO_MESH_COMPRESSION:o[h]=new Rv(s,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:o[h]=new Bv;break;case Qe.KHR_MESH_QUANTIZATION:o[h]=new Iv;break;default:u.indexOf(h)>=0&&a[h]}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function lv(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class hv{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const h=new de(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Jn);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ql(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Yl(h),l.distance=u;break;case"spot":l=new Kl(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Nn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class uv{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return tn}extendParams(e,t,n){const i=[];e.color=new de(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Jn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Ni))}return Promise.all(i)}}class dv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class fv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new X(a,a)}return Promise.all(s)}}class pv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class mv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class gv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new de(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Jn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ni)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class _v{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Av{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new de().setRGB(a[0],a[1],a[2],Jn),Promise.all(s)}}class xv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class yv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new de().setRGB(a[0],a[1],a[2],Jn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ni)),Promise.all(s)}}class vv{constructor(e){this.parser=e,this.name=Qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class Mv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class Sv{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class bv{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ev{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Tv{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class Cv{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==an.TRIANGLES&&l.mode!==an.TRIANGLE_STRIP&&l.mode!==an.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const p of u){const _=new Pe,g=new T,m=new It,x=new T(1,1,1),A=new Ll(p.geometry,p.material,d);for(let y=0;y<d;y++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,y),c.SCALE&&x.fromBufferAttribute(c.SCALE,y),A.setMatrixAt(y,_.compose(g,m,x));for(const y in c)if(y==="_COLOR_0"){const R=c[y];A.instanceColor=new Xi(R.array,R.itemSize,R.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&p.geometry.setAttribute(y,c[y]);it.prototype.copy.call(A,p),this.parser.assignFinalMaterial(A),f.push(A)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const ap="glTF",js=12,zu={JSON:1313821514,BIN:5130562};class wv{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,js);if(this.header={magic:Ko(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ap)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-js,i=new DataView(e,js);let s=0;for(;s<n;){const o=i.getUint32(s,!0);s+=4;const a=i.getUint32(s,!0);if(s+=4,a===zu.JSON){const c=new Uint8Array(e,js+s,o);this.content=Ko(c)}else if(a===zu.BIN){const c=js+s;this.body=e.slice(c,c+o)}s+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Rv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=ol[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=ol[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Cs[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const p in f.attributes){const _=f.attributes[p],g=c[p];g!==void 0&&(_.normalized=g)}u(f)},a,l,Jn,d)})})}}class Bv{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Iv{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}}class cp extends Os{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*l,_=p-l,g=-2*f+3*d,m=f-d,x=1-g,A=m-d+u;for(let y=0;y!==a;y++){const R=o[_+y+a],b=o[_+y+c]*h,w=o[p+y+a],L=o[p+y]*h;s[y]=x*R+A*b+g*w+m*L}return s}}const Lv=new It;class Pv extends cp{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return Lv.fromArray(s).normalize().toArray(s),s}}const an={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Cs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ku={9728:mt,9729:ht,9984:ar,9985:qo,9986:Es,9987:wn},Vu={33071:Ft,33648:ws,10497:ui},hc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ol={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",...th>=152?{TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3"}:{TEXCOORD_0:"uv",TEXCOORD_1:"uv2"},COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ii={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Dv={CUBICSPLINE:void 0,LINEAR:Wi,STEP:Bs},uc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Fv(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Ir({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Cn})),r.DefaultMaterial}function wi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Nn(r,e){e.extras!==void 0&&typeof e.extras=="object"&&Object.assign(r.userData,e.extras)}function Uv(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function Nv(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}}}function Ov(r){let e;const t=r.extensions&&r.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+dc(t.attributes):e=r.indices+":"+dc(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+dc(r.targets[n]);return e}function dc(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function al(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Gv(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Hv=new Pe;class zv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new lv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&typeof navigator.userAgent<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new Jf(this.options.manager):this.textureLoader=new $f(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new sn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return wi(s,a,i),Nn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())s(h,a.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(li.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=hc[i.type],a=Cs[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new $e(l,o,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=hc[i.type],l=Cs[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let _,g;if(f&&f!==u){const m=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let A=t.cache.get(x);A||(_=new l(a,m*f,i.count*f/h),A=new Tr(_,f/h),t.cache.add(x,A)),g=new Zt(A,c,d%f/h,p)}else a===null?_=new l(i.count*c):_=new l(a,d,i.count*c),g=new $e(_,c,p);if(i.sparse!==void 0){const m=hc.SCALAR,x=Cs[i.sparse.indices.componentType],A=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,R=new x(o[1],A,i.sparse.count*m),b=new l(o[2],y,i.sparse.count*c);a!==null&&(g=new $e(g.array.slice(),g.itemSize,g.normalized));for(let w=0,L=R.length;w<L;w++){const v=R[w];if(g.setX(v,b[w*c]),c>=2&&g.setY(v,b[w*c+1]),c>=3&&g.setZ(v,b[w*c+2]),c>=4&&g.setW(v,b[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=ku[d.magFilter]||ht,h.minFilter=ku[d.minFilter]||wn,h.wrapS=Vu[d.wrapS]||ui,h.wrapT=Vu[d.wrapT]||ui,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(_){const g=new dt(_);g.needsUpdate=!0,d(g)}),t.load(li.resolveURL(u,s.path),p,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Nn(u,o),u.userData.mimeType=o.mimeType||Gv(o.uri),u}).catch(function(u){throw u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return i!==void 0&&(typeof i=="number"&&(i=i===Hu?Ni:Jn),"colorSpace"in o?o.colorSpace=i:o.encoding=i===Ni?Hu:cv),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new oa,Tt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Ht,Tt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Ir}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[Qe.KHR_MATERIALS_UNLIT]){const u=i[Qe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new de(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Jn),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Ni)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=fn);const h=s.alphaMode||uc.OPAQUE;if(h===uc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===uc.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==tn&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new X(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==tn&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==tn){const u=s.emissiveFactor;a.emissive=new de().setRGB(u[0],u[1],u[2],Jn)}return s.emissiveTexture!==void 0&&o!==tn&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Ni)),Promise.all(l).then(function(){const u=new o(a);return s.name&&(u.name=s.name),Nn(u,s),t.associations.set(u,{materials:e}),s.extensions&&wi(i,u,s),u})}createUniqueName(e){const t=tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Wu(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=Ov(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=Wu(new ke,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?Fv(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const _=h[f],g=o[f];let m;const x=l[f];if(g.mode===an.TRIANGLES||g.mode===an.TRIANGLE_STRIP||g.mode===an.TRIANGLE_FAN||g.mode===void 0)m=s.isSkinnedMesh===!0?new Il(_,x):new vt(_,x),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===an.TRIANGLE_STRIP?m.geometry=Nu(m.geometry,_l):g.mode===an.TRIANGLE_FAN&&(m.geometry=Nu(m.geometry,zo));else if(g.mode===an.LINES)m=new An(_,x);else if(g.mode===an.LINE_STRIP)m=new Yn(_,x);else if(g.mode===an.LINE_LOOP)m=new Pl(_,x);else if(g.mode===an.POINTS)m=new Dl(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&Nv(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),Nn(m,s),g.extensions&&wi(i,m,g),t.assignFinalMaterial(m),u.push(m)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&wi(i,u[0],s),u[0];const d=new zn;s.extensions&&wi(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(i)return n.type==="perspective"?t=new yt(vl.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ci(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Nn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new Pe;s!==null&&d.fromArray(s.array,l*16),c.push(d)}}return new Cr(a,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],p=i.samplers[f.sampler],_=f.target,g=_.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,x=i.parameters!==void 0?i.parameters[p.output]:p.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",x)),l.push(p),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],_=u[3],g=u[4],m=[];for(let x=0,A=d.length;x<A;x++){const y=d[x],R=f[x],b=p[x],w=_[x],L=g[x];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const v=n._createAnimationTracks(y,R,b,w,L);if(v)for(let S=0;S<v.length;S++)m.push(v[S])}return new Ds(s,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Hv)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(s.isBone===!0?h=new ra:l.length>1?h=new zn:l.length===1?h=l[0]:h=new it,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Nn(h,s),s.extensions&&wi(n,h,s),s.matrix!==void 0){const u=new Pe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new zn;n.name&&(s.name=i.createUniqueName(n.name)),Nn(s,n),n.extensions&&wi(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Tt||d instanceof dt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,c=[];ii[s.path]===ii.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(ii[s.path]){case ii.weights:l=Ki;break;case ii.rotation:l=di;break;case ii.position:case ii.scale:l=Yi;break;default:switch(n.itemSize){case 1:l=Ki;break;case 2:case 3:default:l=Yi;break}break}const h=i.interpolation!==void 0?Dv[i.interpolation]:Wi,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const p=new l(c[d]+"."+ii[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=al(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof di?Pv:cp;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function kv(r,e,t){const n=e.attributes,i=new bt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new T(c[0],c[1],c[2]),new T(l[0],l[1],l[2])),a.normalized){const h=al(Cs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else return}else return;const s=e.targets;if(s!==void 0){const a=new T,c=new T;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const _=al(Cs[d.componentType]);c.multiplyScalar(_)}a.max(c)}}}i.expandByVector(a)}r.boundingBox=i;const o=new Et;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Wu(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){r.setAttribute(a,c)})}for(const o in n){const a=ol[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Nn(r,e),kv(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Uv(r,e.targets,t):r})}const fc=new WeakMap;class $v extends zt{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new sn(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,o=>{const a={attributeIDs:this.defaultAttributeIDs,attributeTypes:this.defaultAttributeTypes,useUniqueIDs:!1};this.decodeGeometry(o,a).then(t).catch(i)},n,i)}decodeDracoFile(e,t,n,i){const s={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n};this.decodeGeometry(e,s).then(t)}decodeGeometry(e,t){for(const c in t.attributeTypes){const l=t.attributeTypes[c];l.BYTES_PER_ELEMENT!==void 0&&(t.attributeTypes[c]=l.name)}const n=JSON.stringify(t);if(fc.has(e)){const c=fc.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(s,o).then(c=>(i=c,new Promise((l,h)=>{i._callbacks[s]={resolve:l,reject:h},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),fc.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new ke;e.index&&t.setIndex(new $e(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],s=i.name,o=i.array,a=i.itemSize;t.setAttribute(s,new $e(o,a))}return t}_loadLibrary(e,t){const n=new sn(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=Vv.toString(),o=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const o=s.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this}}function Vv(){let r,e;onmessage=function(o){const a=o.data;switch(a.type){case"init":r=a.decoderConfig,e=new Promise(function(h){r.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(r)});break;case"decode":const c=a.buffer,l=a.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder,f=new u.DecoderBuffer;f.Init(new Int8Array(c),c.byteLength);try{const p=t(u,d,f,l),_=p.attributes.map(g=>g.array.buffer);p.index&&_.push(p.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:p},_)}catch(p){self.postMessage({type:"error",id:a.id,error:p.message})}finally{u.destroy(f),u.destroy(d)}});break}};function t(o,a,c,l){const h=l.attributeIDs,u=l.attributeTypes;let d,f;const p=a.GetEncodedGeometryType(c);if(p===o.TRIANGULAR_MESH)d=new o.Mesh,f=a.DecodeBufferToMesh(c,d);else if(p===o.POINT_CLOUD)d=new o.PointCloud,f=a.DecodeBufferToPointCloud(c,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const _={index:null,attributes:[]};for(const g in h){const m=self[u[g]];let x,A;if(l.useUniqueIDs)A=h[g],x=a.GetAttributeByUniqueId(d,A);else{if(A=a.GetAttributeId(d,o[h[g]]),A===-1)continue;x=a.GetAttribute(d,A)}_.attributes.push(i(o,a,d,g,m,x))}return p===o.TRIANGULAR_MESH&&(_.index=n(o,a,d)),o.destroy(d),_}function n(o,a,c){const h=c.num_faces()*3,u=h*4,d=o._malloc(u);a.GetTrianglesUInt32Array(c,u,d);const f=new Uint32Array(o.HEAPF32.buffer,d,h).slice();return o._free(d),{array:f,itemSize:1}}function i(o,a,c,l,h,u){const d=u.num_components(),p=c.num_points()*d,_=p*h.BYTES_PER_ELEMENT,g=s(o,h),m=o._malloc(_);a.GetAttributeDataArrayForAllPoints(c,u,g,_,m);const x=new h(o.HEAPF32.buffer,m,p).slice();return o._free(m),{name:l,array:x,itemSize:d}}function s(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}const Xu=new bt,wo=new T;class lp extends Zl{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Se(e,3)),this.setAttribute("uv",new Se(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new Jo(t,6,1);return this.setAttribute("instanceStart",new Zt(n,3,0)),this.setAttribute("instanceEnd",new Zt(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const i=new Jo(n,t*2,1);return this.setAttribute("instanceColorStart",new Zt(i,t,0)),this.setAttribute("instanceColorEnd",new Zt(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new zl(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bt);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Xu.setFromBufferAttribute(t),this.boundingBox.union(Xu))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Et),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)wo.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(wo)),wo.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(wo));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)}}toJSON(){}applyMatrix(e){return this.applyMatrix4(e)}}class Wv extends lp{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){const n=e.length-t,i=new Float32Array(2*n);if(t===3)for(let s=0;s<n;s+=t)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5];else for(let s=0;s<n;s+=t)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5],i[2*s+6]=e[s+6],i[2*s+7]=e[s+7];return super.setColors(i,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class hp extends _n{constructor(e){super({type:"LineMaterial",uniforms:Wo.clone(Wo.merge([he.common,he.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new X(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${th>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const pc=new nt,Ju=new T,Ku=new T,Lt=new nt,Pt=new nt,Mn=new nt,mc=new T,gc=new Pe,Dt=new sp,Yu=new T,Ro=new bt,Bo=new Et,Sn=new nt;let En,ki;function qu(r,e,t){return Sn.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),Sn.multiplyScalar(1/Sn.w),Sn.x=ki/t.width,Sn.y=ki/t.height,Sn.applyMatrix4(r.projectionMatrixInverse),Sn.multiplyScalar(1/Sn.w),Math.abs(Math.max(Sn.x,Sn.y))}function Xv(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,o=Math.min(n.instanceCount,i.count);for(let a=0,c=o;a<c;a++){Dt.start.fromBufferAttribute(i,a),Dt.end.fromBufferAttribute(s,a),Dt.applyMatrix4(t);const l=new T,h=new T;En.distanceSqToSegment(Dt.start,Dt.end,h,l),h.distanceTo(l)<ki*.5&&e.push({point:h,pointOnLine:l,distance:En.origin.distanceTo(h),object:r,face:null,faceIndex:a,uv:null,[op]:null})}}function Jv(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,o=r.matrixWorld,a=r.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,h=Math.min(a.instanceCount,c.count),u=-e.near;En.at(1,Mn),Mn.w=1,Mn.applyMatrix4(e.matrixWorldInverse),Mn.applyMatrix4(n),Mn.multiplyScalar(1/Mn.w),Mn.x*=s.x/2,Mn.y*=s.y/2,Mn.z=0,mc.copy(Mn),gc.multiplyMatrices(e.matrixWorldInverse,o);for(let d=0,f=h;d<f;d++){if(Lt.fromBufferAttribute(c,d),Pt.fromBufferAttribute(l,d),Lt.w=1,Pt.w=1,Lt.applyMatrix4(gc),Pt.applyMatrix4(gc),Lt.z>u&&Pt.z>u)continue;if(Lt.z>u){const A=Lt.z-Pt.z,y=(Lt.z-u)/A;Lt.lerp(Pt,y)}else if(Pt.z>u){const A=Pt.z-Lt.z,y=(Pt.z-u)/A;Pt.lerp(Lt,y)}Lt.applyMatrix4(n),Pt.applyMatrix4(n),Lt.multiplyScalar(1/Lt.w),Pt.multiplyScalar(1/Pt.w),Lt.x*=s.x/2,Lt.y*=s.y/2,Pt.x*=s.x/2,Pt.y*=s.y/2,Dt.start.copy(Lt),Dt.start.z=0,Dt.end.copy(Pt),Dt.end.z=0;const _=Dt.closestPointToPointParameter(mc,!0);Dt.at(_,Yu);const g=vl.lerp(Lt.z,Pt.z,_),m=g>=-1&&g<=1,x=mc.distanceTo(Yu)<ki*.5;if(m&&x){Dt.start.fromBufferAttribute(c,d),Dt.end.fromBufferAttribute(l,d),Dt.start.applyMatrix4(o),Dt.end.applyMatrix4(o);const A=new T,y=new T;En.distanceSqToSegment(Dt.start,Dt.end,y,A),t.push({point:y,pointOnLine:A,distance:En.origin.distanceTo(y),object:r,face:null,faceIndex:d,uv:null,[op]:null})}}}class Kv extends vt{constructor(e=new lp,t=new hp({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let o=0,a=0,c=t.count;o<c;o++,a+=2)Ju.fromBufferAttribute(t,o),Ku.fromBufferAttribute(n,o),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+Ju.distanceTo(Ku);const s=new Jo(i,2,1);return e.setAttribute("instanceDistanceStart",new Zt(s,1,0)),e.setAttribute("instanceDistanceEnd",new Zt(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera,s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;En=e.ray;const o=this.matrixWorld,a=this.geometry,c=this.material;ki=c.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),Bo.copy(a.boundingSphere).applyMatrix4(o);let l;if(n)l=ki*.5;else{const u=Math.max(i.near,Bo.distanceToPoint(En.origin));l=qu(i,u,c.resolution)}if(Bo.radius+=l,En.intersectsSphere(Bo)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Ro.copy(a.boundingBox).applyMatrix4(o);let h;if(n)h=ki*.5;else{const u=Math.max(i.near,Ro.distanceToPoint(En.origin));h=qu(i,u,c.resolution)}Ro.expandByScalar(h),En.intersectsBox(Ro)!==!1&&(n?Xv(this,t):Jv(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(pc),this.material.uniforms.resolution.value.set(pc.z,pc.w))}}class eM extends Kv{constructor(e=new Wv,t=new hp({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}let Io;const tM=()=>{if(Io)return Io;const r="B9h9z9tFBBBF8fL9gBB9gLaaaaaFa9gEaaaB9gFaFa9gEaaaFaEMcBFFFGGGEIIILF9wFFFLEFBFKNFaFCx/IFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBF8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBGy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBEn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBIi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBKI9z9iqlBOc+x8ycGBM/qQFTa8jUUUUBCU/EBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAGTkUUUBRNCUoBAG9uC/wgBZHKCUGAKCUG9JyRVAECFJRICBRcGXEXAcAF9PQFAVAFAclAcAVJAF9JyRMGXGXAG9FQBAMCbJHKC9wZRSAKCIrCEJCGrRQANCUGJRfCBRbAIRTEXGXAOATlAQ9PQBCBRISEMATAQJRIGXAS9FQBCBRtCBREEXGXAOAIlCi9PQBCBRISLMANCU/CBJAEJRKGXGXGXGXGXATAECKrJ2BBAtCKZrCEZfIBFGEBMAKhB83EBAKCNJhB83EBSEMAKAI2BIAI2BBHmCKrHYAYCE6HYy86BBAKCFJAICIJAYJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCGJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCEJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCIJAYAmJHY2BBAI2BFHmCKrHPAPCE6HPy86BBAKCLJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCKJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCOJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCNJAYAmJHY2BBAI2BGHmCKrHPAPCE6HPy86BBAKCVJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCcJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCMJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCSJAYAmJHm2BBAI2BEHICKrHYAYCE6HYy86BBAKCQJAmAYJHm2BBAICIrCEZHYAYCE6HYy86BBAKCfJAmAYJHm2BBAICGrCEZHYAYCE6HYy86BBAKCbJAmAYJHK2BBAICEZHIAICE6HIy86BBAKAIJRISGMAKAI2BNAI2BBHmCIrHYAYCb6HYy86BBAKCFJAICNJAYJHY2BBAmCbZHmAmCb6Hmy86BBAKCGJAYAmJHm2BBAI2BFHYCIrHPAPCb6HPy86BBAKCEJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCIJAmAYJHm2BBAI2BGHYCIrHPAPCb6HPy86BBAKCLJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCKJAmAYJHm2BBAI2BEHYCIrHPAPCb6HPy86BBAKCOJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCNJAmAYJHm2BBAI2BIHYCIrHPAPCb6HPy86BBAKCVJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCcJAmAYJHm2BBAI2BLHYCIrHPAPCb6HPy86BBAKCMJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCSJAmAYJHm2BBAI2BKHYCIrHPAPCb6HPy86BBAKCQJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCfJAmAYJHm2BBAI2BOHICIrHYAYCb6HYy86BBAKCbJAmAYJHK2BBAICbZHIAICb6HIy86BBAKAIJRISFMAKAI8pBB83BBAKCNJAICNJ8pBB83BBAICTJRIMAtCGJRtAECTJHEAS9JQBMMGXAIQBCBRISEMGXAM9FQBANAbJ2BBRtCBRKAfREEXAEANCU/CBJAKJ2BBHTCFrCBATCFZl9zAtJHt86BBAEAGJREAKCFJHKAM9HQBMMAfCFJRfAIRTAbCFJHbAG9HQBMMABAcAG9sJANCUGJAMAG9sTkUUUBpANANCUGJAMCaJAG9sJAGTkUUUBpMAMCBAIyAcJRcAIQBMC9+RKSFMCBC99AOAIlAGCAAGCA9Ly6yRKMALCU/EBJ8kUUUUBAKM+OmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUFT+JUUUBpALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM+lLKFaF99GaG99FaG99GXGXAGCI9HQBAF9FQFEXGXGX9DBBB8/9DBBB+/ABCGJHG1BB+yAB1BBHE+yHI+L+TABCFJHL1BBHK+yHO+L+THN9DBBBB9gHVyAN9DBB/+hANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE86BBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG86BBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG86BBABCIJRBAFCaJHFQBSGMMAF9FQBEXGXGX9DBBB8/9DBBB+/ABCIJHG8uFB+yAB8uFBHE+yHI+L+TABCGJHL8uFBHK+yHO+L+THN9DBBBB9gHVyAN9DB/+g6ANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE87FBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG87FBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG87FBABCNJRBAFCaJHFQBMMM/SEIEaE99EaF99GXAF9FQBCBREABRIEXGXGX9D/zI818/AICKJ8uFBHLCEq+y+VHKAI8uFB+y+UHO9DB/+g6+U9DBBB8/9DBBB+/AO9DBBBB9gy+SHN+L9DBBB9P9d9FQBAN+oRVSFMCUUUU94RVMAICIJ8uFBRcAICGJ8uFBRMABALCFJCEZAEqCFWJAV87FBGXGXAKAM+y+UHN9DB/+g6+U9DBBB8/9DBBB+/AN9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRMSFMCUUUU94RMMABALCGJCEZAEqCFWJAM87FBGXGXAKAc+y+UHK9DB/+g6+U9DBBB8/9DBBB+/AK9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRcSFMCUUUU94RcMABALCaJCEZAEqCFWJAc87FBGXGX9DBBU8/AOAO+U+TANAN+U+TAKAK+U+THO9DBBBBAO9DBBBB9gy+R9DB/+g6+U9DBBB8/+SHO+L9DBBB9P9d9FQBAO+oRcSFMCUUUU94RcMABALCEZAEqCFWJAc87FBAICNJRIAECIJREAFCaJHFQBMMM9JBGXAGCGrAF9sHF9FQBEXABAB8oGBHGCNWCN91+yAGCi91CnWCUUU/8EJ+++U84GBABCIJRBAFCaJHFQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEM/lFFFaGXGXAFABqCEZ9FQBABRESFMGXGXAGCT9PQBABRESFMABREEXAEAF8oGBjGBAECIJAFCIJ8oGBjGBAECNJAFCNJ8oGBjGBAECSJAFCSJ8oGBjGBAECTJREAFCTJRFAGC9wJHGCb9LQBMMAGCI9JQBEXAEAF8oGBjGBAFCIJRFAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF2BB86BBAECFJREAFCFJRFAGCaJHGQBMMABMoFFGaGXGXABCEZ9FQBABRESFMAFCgFZC+BwsN9sRIGXGXAGCT9PQBABRESFMABREEXAEAIjGBAECSJAIjGBAECNJAIjGBAECIJAIjGBAECTJREAGC9wJHGCb9LQBMMAGCI9JQBEXAEAIjGBAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF86BBAECFJREAGCaJHGQBMMABMMMFBCUNMIT9kBB",e="B9h9z9tFBBBFiI9gBB9gLaaaaaFa9gEaaaB9gFaFaEMcBBFBFFGGGEILF9wFFFLEFBFKNFaFCx/aFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBG8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBIy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBKi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBOn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBNI9z9iqlBVc+N9IcIBTEM9+FLa8jUUUUBCTlRBCBRFEXCBRGCBREEXABCNJAGJAECUaAFAGrCFZHIy86BBAEAIJREAGCFJHGCN9HQBMAFCx+YUUBJAE86BBAFCEWCxkUUBJAB8pEN83EBAFCFJHFCUG9HQBMMk8lLbaE97F9+FaL978jUUUUBCU/KBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAG/8cBBCUoBAG9uC/wgBZHKCUGAKCUG9JyRNAECFJRKCBRVGXEXAVAF9PQFANAFAVlAVANJAF9JyRcGXGXAG9FQBAcCbJHIC9wZHMCE9sRSAMCFWRQAICIrCEJCGrRfCBRbEXAKRTCBRtGXEXGXAOATlAf9PQBCBRKSLMALCU/CBJAtAM9sJRmATAfJRKCBREGXAMCoB9JQBAOAKlC/gB9JQBCBRIEXAmAIJREGXGXGXGXGXATAICKrJ2BBHYCEZfIBFGEBMAECBDtDMIBSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMIBAKCTJRKMGXGXGXGXGXAYCGrCEZfIBFGEBMAECBDtDMITSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMITAKCTJRKMGXGXGXGXGXAYCIrCEZfIBFGEBMAECBDtDMIASEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMIAAKCTJRKMGXGXGXGXGXAYCKrfIBFGEBMAECBDtDMI8wSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCIJAeDeBJAYCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCNJAeDeBJAYCx+YUUBJ2BBJRKSFMAEAKDBBBDMI8wAKCTJRKMAICoBJREAICUFJAM9LQFAERIAOAKlC/fB9LQBMMGXAEAM9PQBAECErRIEXGXAOAKlCi9PQBCBRKSOMAmAEJRYGXGXGXGXGXATAECKrJ2BBAICKZrCEZfIBFGEBMAYCBDtDMIBSEMAYAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAYAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAYAKDBBBDMIBAKCTJRKMAICGJRIAECTJHEAM9JQBMMGXAK9FQBAKRTAtCFJHtCI6QGSFMMCBRKSEMGXAM9FQBALCUGJAbJREALAbJDBGBReCBRYEXAEALCU/CBJAYJHIDBIBHdCFD9tAdCFDbHPD9OD9hD9RHdAIAMJDBIBH8ZCFD9tA8ZAPD9OD9hD9RH8ZDQBTFtGmEYIPLdKeOnHpAIAQJDBIBHyCFD9tAyAPD9OD9hD9RHyAIASJDBIBH8cCFD9tA8cAPD9OD9hD9RH8cDQBTFtGmEYIPLdKeOnH8dDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGEAeD9uHeDyBjGBAEAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeApA8dDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeAdA8ZDQNiV8ZcpMyS8cQ8df8eb8fHdAyA8cDQNiV8ZcpMyS8cQ8df8eb8fH8ZDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeAdA8ZDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJREAYCTJHYAM9JQBMMAbCIJHbAG9JQBMMABAVAG9sJALCUGJAcAG9s/8cBBALALCUGJAcCaJAG9sJAG/8cBBMAcCBAKyAVJRVAKQBMC9+RKSFMCBC99AOAKlAGCAAGCA9Ly6yRKMALCU/KBJ8kUUUUBAKMNBT+BUUUBM+KmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUF/8MBALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM/dLEK97FaF97GXGXAGCI9HQBAF9FQFCBRGEXABABDBBBHECiD+rFCiD+sFD/6FHIAECND+rFCiD+sFD/6FAID/gFAECTD+rFCiD+sFD/6FHLD/gFD/kFD/lFHKCBDtD+2FHOAICUUUU94DtHND9OD9RD/kFHI9DBB/+hDYAIAID/mFAKAKD/mFALAOALAND9OD9RD/kFHIAID/mFD/kFD/kFD/jFD/nFHLD/mF9DBBX9LDYHOD/kFCgFDtD9OAECUUU94DtD9OD9QAIALD/mFAOD/kFCND+rFCU/+EDtD9OD9QAKALD/mFAOD/kFCTD+rFCUU/8ODtD9OD9QDMBBABCTJRBAGCIJHGAF9JQBSGMMAF9FQBCBRGEXABCTJHVAVDBBBHECBDtHOCUU98D8cFCUU98D8cEHND9OABDBBBHKAEDQILKOSQfbPden8c8d8e8fCggFDtD9OD/6FAKAEDQBFGENVcMTtmYi8ZpyHECTD+sFD/6FHID/gFAECTD+rFCTD+sFD/6FHLD/gFD/kFD/lFHE9DB/+g6DYALAEAOD+2FHOALCUUUU94DtHcD9OD9RD/kFHLALD/mFAEAED/mFAIAOAIAcD9OD9RD/kFHEAED/mFD/kFD/kFD/jFD/nFHID/mF9DBBX9LDYHOD/kFCTD+rFALAID/mFAOD/kFCggEDtD9OD9QHLAEAID/mFAOD/kFCaDbCBDnGCBDnECBDnKCBDnOCBDncCBDnMCBDnfCBDnbD9OHEDQNVi8ZcMpySQ8c8dfb8e8fD9QDMBBABAKAND9OALAEDQBFTtGEmYILPdKOenD9QDMBBABCAJRBAGCIJHGAF9JQBMMM/hEIGaF97FaL978jUUUUBCTlREGXAF9FQBCBRIEXAEABDBBBHLABCTJHKDBBBHODQILKOSQfbPden8c8d8e8fHNCTD+sFHVCID+rFDMIBAB9DBBU8/DY9D/zI818/DYAVCEDtD9QD/6FD/nFHVALAODQBFGENVcMTtmYi8ZpyHLCTD+rFCTD+sFD/6FD/mFHOAOD/mFAVALCTD+sFD/6FD/mFHcAcD/mFAVANCTD+rFCTD+sFD/6FD/mFHNAND/mFD/kFD/kFD/lFCBDtD+4FD/jF9DB/+g6DYHVD/mF9DBBX9LDYHLD/kFCggEDtHMD9OAcAVD/mFALD/kFCTD+rFD9QHcANAVD/mFALD/kFCTD+rFAOAVD/mFALD/kFAMD9OD9QHVDQBFTtGEmYILPdKOenHLD8dBAEDBIBDyB+t+J83EBABCNJALD8dFAEDBIBDyF+t+J83EBAKAcAVDQNVi8ZcMpySQ8c8dfb8e8fHVD8dBAEDBIBDyG+t+J83EBABCiJAVD8dFAEDBIBDyE+t+J83EBABCAJRBAICIJHIAF9JQBMMM9jFF97GXAGCGrAF9sHG9FQBCBRFEXABABDBBBHECND+rFCND+sFD/6FAECiD+sFCnD+rFCUUU/8EDtD+uFD/mFDMBBABCTJRBAFCIJHFAG9JQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEMMMFBCUNMIT9tBB",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,253,3,1,2,34,4,106,6,5,11,8,7,20,13,33,12,16,128,9,116,64,19,113,127,15,10,21,22,14,255,66,24,54,136,107,18,23,192,26,114,118,132,17,77,101,130,144,27,87,131,44,45,74,156,154,70,167]);if(typeof WebAssembly!="object")return{supported:!1};let i=r;WebAssembly.validate(t)&&(i=e);let s;const o=WebAssembly.instantiate(a(i),{}).then(u=>{s=u.instance,s.exports.__wasm_call_ctors()});function a(u){const d=new Uint8Array(u.length);for(let p=0;p<u.length;++p){const _=u.charCodeAt(p);d[p]=_>96?_-71:_>64?_-65:_>47?_+4:_>46?63:62}let f=0;for(let p=0;p<u.length;++p)d[f++]=d[p]<60?n[d[p]]:(d[p]-60)*64+d[++p];return d.buffer.slice(0,f)}function c(u,d,f,p,_,g){const m=s.exports.sbrk,x=f+3&-4,A=m(x*p),y=m(_.length),R=new Uint8Array(s.exports.memory.buffer);R.set(_,y);const b=u(A,f,p,y,_.length);if(b===0&&g&&g(A,x,p),d.set(R.subarray(A,A+f*p)),m(A-m(0)),b!==0)throw new Error(`Malformed buffer data: ${b}`)}const l={0:"",1:"meshopt_decodeFilterOct",2:"meshopt_decodeFilterQuat",3:"meshopt_decodeFilterExp",NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={0:"meshopt_decodeVertexBuffer",1:"meshopt_decodeIndexBuffer",2:"meshopt_decodeIndexSequence",ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"};return Io={ready:o,supported:!0,decodeVertexBuffer(u,d,f,p,_){c(s.exports.meshopt_decodeVertexBuffer,u,d,f,p,s.exports[l[_]])},decodeIndexBuffer(u,d,f,p){c(s.exports.meshopt_decodeIndexBuffer,u,d,f,p)},decodeIndexSequence(u,d,f,p){c(s.exports.meshopt_decodeIndexSequence,u,d,f,p)},decodeGltfBuffer(u,d,f,p,_,g){c(s.exports[h[_]],u,d,f,p,s.exports[l[g]])}},Io};function nM(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},o={},a=r[0].morphTargetsRelative,c=new ke;let l=0;for(let h=0;h<r.length;++h){const u=r[h];let d=0;if(t!==(u.index!==null))return null;for(const f in u.attributes){if(!n.has(f))return null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size||a!==u.morphTargetsRelative)return null;for(const f in u.morphAttributes){if(!i.has(f))return null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return null;c.addGroup(l,f,h),l+=f}}if(t){let h=0;const u=[];for(let d=0;d<r.length;++d){const f=r[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=r[d].attributes.position.count}c.setIndex(u)}for(const h in s){const u=Zu(s[h]);if(!u)return null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);const p=Zu(f);if(!p)return null;c.morphAttributes[h].push(p)}}return c}function Zu(r){let e,t,n,i=-1,s=0;for(let l=0;l<r.length;++l){const h=r[l];if(h.isInterleavedBufferAttribute||(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)||(t===void 0&&(t=h.itemSize),t!==h.itemSize)||(n===void 0&&(n=h.normalized),n!==h.normalized)||(i===-1&&(i=h.gpuType),i!==h.gpuType))return null;s+=h.array.length}const o=new e(s);let a=0;for(let l=0;l<r.length;++l)o.set(r[l].array,a),a+=r[l].array.length;const c=new $e(o,t,n);return i!==void 0&&(c.gpuType=i),c}export{tM as $,wd as A,Xt as B,ta as C,$v as D,Mr as E,Se as F,jv as G,Rs as H,Xi as I,eM as J,Wv as K,ea as L,hp as M,Kv as N,lp as O,ht as P,Rn as Q,Tt as R,vl as S,Ke as T,Pe as U,vt as V,tn as W,wl as X,Rl as Y,Uf as Z,Ir as _,Ac as a,mt as a0,Vn as a1,en as a2,Wn as a3,it as a4,Qv as a5,ci as a6,cl as a7,$u as a8,yt as a9,nt as aA,af as aB,gn as aC,gf as aD,Zv as aE,nM as aF,Er as aa,It as ab,xr as ac,Xd as ad,Yt as ae,Ny as af,ui as ag,St as ah,Af as ai,Xe as aj,_n as ak,zi as al,Et as am,Br as an,rl as ao,qv as ap,dt as aq,Jf as ar,va as as,eh as at,Wo as au,Xn as av,ri as aw,bn as ax,X as ay,T as az,_d as b,Wd as c,_p as d,bt as e,Zi as f,$e as g,ke as h,Tx as i,bf as j,ep as k,de as l,ua as m,of as n,Ns as o,Vi as p,Cl as q,fn as r,Np as s,qn as t,pa as u,pn as v,ia as w,Cn as x,zn as y,Zl as z};
