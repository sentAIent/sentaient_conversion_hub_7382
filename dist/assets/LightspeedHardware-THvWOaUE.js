import{a as ce,l as W,k as c}from"./vendor-DUpYkZk-.js";var w="-ms-",we="-moz-",y="-webkit-",$t="comm",Me="rule",lt="decl",rr="@import",nr="@namespace",Rt="@keyframes",sr="@layer",Ot=Math.abs,dt=String.fromCharCode,rt=Object.assign;function or(e,t){return A(e,0)^45?(((t<<2^A(e,0))<<2^A(e,1))<<2^A(e,2))<<2^A(e,3):0}function Et(e){return e.trim()}function H(e,t){return(e=t.exec(e))?e[0]:e}function u(e,t,r){return e.replace(t,r)}function $e(e,t,r){return e.indexOf(t,r)}function A(e,t){return e.charCodeAt(t)|0}function ne(e,t,r){return e.slice(t,r)}function F(e){return e.length}function Nt(e){return e.length}function ye(e,t){return t.push(e),e}function ir(e,t){return e.map(t).join("")}function pt(e,t){return e.filter(function(r){return!H(r,t)})}var Ge=1,de=1,Tt=0,M=0,k=0,pe="";function Be(e,t,r,n,s,o,l,i){return{value:e,root:t,parent:r,type:n,props:s,children:o,line:Ge,column:de,length:l,return:"",siblings:i}}function K(e,t){return rt(Be("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function ie(e){for(;e.root;)e=K(e.root,{children:[e]});ye(e,e.siblings)}function ar(){return k}function cr(){return k=M>0?A(pe,--M):0,de--,k===10&&(de=1,Ge--),k}function U(){return k=M<Tt?A(pe,M++):0,de++,k===10&&(de=1,Ge++),k}function V(){return A(pe,M)}function Re(){return M}function De(e,t){return ne(pe,e,t)}function je(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function lr(e){return Ge=de=1,Tt=F(pe=e),M=0,[]}function dr(e){return pe="",e}function Ke(e){return Et(De(M-1,nt(e===91?e+2:e===40?e+1:e)))}function fr(e){for(;(k=V())&&k<33;)U();return je(e)>2||je(k)>3?"":" "}function ur(e,t){for(;--t&&U()&&!(k<48||k>102||k>57&&k<65||k>70&&k<97););return De(e,Re()+(t<6&&V()==32&&U()==32))}function nt(e){for(;U();)switch(k){case e:return M;case 34:case 39:e!==34&&e!==39&&nt(k);break;case 40:e===41&&nt(e);break;case 92:U();break}return M}function pr(e,t){for(;U()&&e+k!==57;)if(e+k===84&&V()===47)break;return"/*"+De(t,M-1)+"*"+dt(e===47?e:U())}function hr(e){for(;!je(V());)U();return De(e,M)}function gr(e){return dr(Oe("",null,null,null,[""],e=lr(e),0,[0],e))}function Oe(e,t,r,n,s,o,l,i,a){for(var d=0,p=0,g=l,x=0,_=0,m=0,S=1,O=1,j=1,f=0,E="",G=s,C=o,I=n,h=E;O;)switch(m=f,f=U()){case 40:if(m!=108&&A(h,g-1)==58){$e(h+=u(Ke(f),"&","&\f"),"&\f",Ot(d?i[d-1]:0))!=-1&&(j=-1);break}case 34:case 39:case 91:h+=Ke(f);break;case 9:case 10:case 13:case 32:h+=fr(m);break;case 92:h+=ur(Re()-1,7);continue;case 47:switch(V()){case 42:case 47:ye(mr(pr(U(),Re()),t,r,a),a),(je(m||1)==5||je(V()||1)==5)&&F(h)&&ne(h,-1,void 0)!==" "&&(h+=" ");break;default:h+="/"}break;case 123*S:i[d++]=F(h)*j;case 125*S:case 59:case 0:switch(f){case 0:case 125:O=0;case 59+p:j==-1&&(h=u(h,/\f/g,"")),_>0&&(F(h)-g||S===0&&m===47)&&ye(_>32?gt(h+";",n,r,g-1,a):gt(u(h," ","")+";",n,r,g-2,a),a);break;case 59:h+=";";default:if(ye(I=ht(h,t,r,d,p,s,i,E,G=[],C=[],g,o),o),f===123)if(p===0)Oe(h,t,I,I,G,o,g,i,C);else{switch(x){case 99:if(A(h,3)===110)break;case 108:if(A(h,2)===97)break;default:p=0;case 100:case 109:case 115:}p?Oe(e,I,I,n&&ye(ht(e,I,I,0,0,s,i,E,s,G=[],g,C),C),s,C,g,i,n?G:C):Oe(h,I,I,I,[""],C,0,i,C)}}d=p=_=0,S=j=1,E=h="",g=l;break;case 58:g=1+F(h),_=m;default:if(S<1){if(f==123)--S;else if(f==125&&S++==0&&cr()==125)continue}switch(h+=dt(f),f*S){case 38:j=p>0?1:(h+="\f",-1);break;case 44:i[d++]=(F(h)-1)*j,j=1;break;case 64:V()===45&&(h+=Ke(U())),x=V(),p=g=F(E=h+=hr(Re())),f++;break;case 45:m===45&&F(h)==2&&(S=0)}}return o}function ht(e,t,r,n,s,o,l,i,a,d,p,g){for(var x=s-1,_=s===0?o:[""],m=Nt(_),S=0,O=0,j=0;S<n;++S)for(var f=0,E=ne(e,x+1,x=Ot(O=l[S])),G=e;f<m;++f)(G=Et(O>0?_[f]+" "+E:u(E,/&\f/g,_[f])))&&(a[j++]=G);return Be(e,t,r,s===0?Me:i,a,d,p,g)}function mr(e,t,r,n){return Be(e,t,r,$t,dt(ar()),ne(e,2,-2),0,n)}function gt(e,t,r,n,s){return Be(e,t,r,lt,ne(e,0,n),ne(e,n+1,-1),n,s)}function Pt(e,t,r){switch(or(e,t)){case 5103:return y+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return y+e+e;case 4855:return y+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return we+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return y+e+we+e+w+e+e;case 5936:switch(A(e,t+11)){case 114:return y+e+w+u(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return y+e+w+u(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return y+e+w+u(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return y+e+w+e+e;case 6165:return y+e+w+"flex-"+e+e;case 5187:return y+e+u(e,/(\w+).+(:[^]+)/,y+"box-$1$2"+w+"flex-$1$2")+e;case 5443:return y+e+w+"flex-item-"+u(e,/flex-|-self/g,"")+(H(e,/flex-|baseline/)?"":w+"grid-row-"+u(e,/flex-|-self/g,""))+e;case 4675:return y+e+w+"flex-line-pack"+u(e,/align-content|flex-|-self/g,"")+e;case 5548:return y+e+w+u(e,"shrink","negative")+e;case 5292:return y+e+w+u(e,"basis","preferred-size")+e;case 6060:return y+"box-"+u(e,"-grow","")+y+e+w+u(e,"grow","positive")+e;case 4554:return y+u(e,/([^-])(transform)/g,"$1"+y+"$2")+e;case 6187:return u(u(u(e,/(zoom-|grab)/,y+"$1"),/(image-set)/,y+"$1"),e,"")+e;case 5495:case 3959:return u(e,/(image-set\([^]*)/,y+"$1$`$1");case 4968:return u(u(e,/(.+:)(flex-)?(.*)/,y+"box-pack:$3"+w+"flex-pack:$3"),/space-between/,"justify")+y+e+e;case 4200:if(!H(e,/flex-|baseline/))return w+"grid-column-align"+ne(e,t)+e;break;case 2592:case 3360:return w+u(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,s){return t=s,H(n.props,/grid-\w+-end/)})?~$e(e+(r=r[t].value),"span",0)?e:w+u(e,"-start","")+e+w+"grid-row-span:"+(~$e(r,"span",0)?H(r,/\d+/):+H(r,/\d+/)-+H(e,/\d+/))+";":w+u(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return H(n.props,/grid-\w+-start/)})?e:w+u(u(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return u(e,/(.+)-inline(.+)/,y+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(F(e)-1-t>6)switch(A(e,t+1)){case 109:if(A(e,t+4)!==45)break;case 102:return u(e,/(.+:)(.+)-([^]+)/,"$1"+y+"$2-$3$1"+we+(A(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~$e(e,"stretch",0)?Pt(u(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return u(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,s,o,l,i,a,d){return w+s+":"+o+d+(l?w+s+"-span:"+(i?a:+a-+o)+d:"")+e});case 4949:if(A(e,t+6)===121)return u(e,":",":"+y)+e;break;case 6444:switch(A(e,A(e,14)===45?18:11)){case 120:return u(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+y+(A(e,14)===45?"inline-":"")+"box$3$1"+y+"$2$3$1"+w+"$2box$3")+e;case 100:return u(e,":",":"+w)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return u(e,"scroll-","scroll-snap-")+e}return e}function Te(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function br(e,t,r,n){switch(e.type){case sr:if(e.children.length)break;case rr:case nr:case lt:return e.return=e.return||e.value;case $t:return"";case Rt:return e.return=e.value+"{"+Te(e.children,n)+"}";case Me:if(!F(e.value=e.props.join(",")))return""}return F(r=Te(e.children,n))?e.return=e.value+"{"+r+"}":""}function yr(e){var t=Nt(e);return function(r,n,s,o){for(var l="",i=0;i<t;i++)l+=e[i](r,n,s,o)||"";return l}}function xr(e){return function(t){t.root||(t=t.return)&&e(t)}}function wr(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case lt:e.return=Pt(e.value,e.length,r);return;case Rt:return Te([K(e,{value:u(e.value,"@","@"+y)})],n);case Me:if(e.length)return ir(r=e.props,function(s){switch(H(s,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":ie(K(e,{props:[u(s,/:(read-\w+)/,":"+we+"$1")]})),ie(K(e,{props:[s]})),rt(e,{props:pt(r,n)});break;case"::placeholder":ie(K(e,{props:[u(s,/:(plac\w+)/,":"+y+"input-$1")]})),ie(K(e,{props:[u(s,/:(plac\w+)/,":"+we+"$1")]})),ie(K(e,{props:[u(s,/:(plac\w+)/,w+"input-$1")]})),ie(K(e,{props:[s]})),rt(e,{props:pt(r,n)});break}return""})}}var le={},Ve,Ze;const fe=typeof process<"u"&&le!==void 0&&(le.REACT_APP_SC_ATTR||le.SC_ATTR)||"data-styled",zt="active",Lt="data-styled-version",Fe="6.5.1",ft=`/*!sc*/
`,Se=typeof window<"u"&&typeof document<"u";function mt(e){if(typeof process<"u"&&le!==void 0){const t=le[e];if(t!==void 0&&t!=="")return t!=="false"}}const Sr=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:(Ze=(Ve=mt("REACT_APP_SC_DISABLE_SPEEDY"))!==null&&Ve!==void 0?Ve:mt("SC_DISABLE_SPEEDY"))!==null&&Ze!==void 0?Ze:typeof process<"u"&&le!==void 0&&!1),jr="sc-keyframes-";function We(e,...t){return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(", ")}`:""}`)}let Ee=new Map,Pe=new Map,Ne=1;const Ie=e=>{if(Ee.has(e))return Ee.get(e);for(;Pe.has(Ne);)Ne++;const t=Ne++;return Ee.set(e,t),Pe.set(t,e),t},Cr=e=>Pe.get(e),kr=(e,t)=>{Ne=t+1,Ee.set(e,t),Pe.set(t,e)},ut=Object.freeze([]),ue=Object.freeze({});function _r(e,t,r=ue){return e.theme!==r.theme&&e.theme||t||r.theme}const Ar=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ir=/(^-|-$)/g;function Mt(e){return e.replace(Ar,"-").replace(Ir,"")}const vr=/(a)(d)/gi,bt=e=>String.fromCharCode(e+(e>25?39:97));function Gt(e){let t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=bt(t%52)+r;return(bt(t%52)+r).replace(vr,"$1-$2")}const st=5381,te=(e,t)=>{let r=t.length;for(;r;)e=33*e^t.charCodeAt(--r);return e},Bt=e=>te(st,e);function $r(e){return Gt(Bt(e)>>>0)}function Rr(e){return e.displayName||e.name||"Component"}function ot(e){return typeof e=="string"&&!0}function Or(e){return ot(e)?`styled.${e}`:`Styled(${Rr(e)})`}const Dt=Symbol.for("react.memo"),Er=Symbol.for("react.forward_ref"),Nr={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},Tr={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ft={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Pr={[Er]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Dt]:Ft};function yt(e){return("type"in(t=e)&&t.type.$$typeof)===Dt?Ft:"$$typeof"in e?Pr[e.$$typeof]:Nr;var t}const zr=Object.defineProperty,Lr=Object.getOwnPropertyNames,Mr=Object.getOwnPropertySymbols,Gr=Object.getOwnPropertyDescriptor,Br=Object.getPrototypeOf,Dr=Object.prototype;function Wt(e,t,r){if(typeof t!="string"){const n=Br(t);n&&n!==Dr&&Wt(e,n,r);const s=Lr(t).concat(Mr(t)),o=yt(e),l=yt(t);for(let i=0;i<s.length;++i){const a=s[i];if(!(a in Tr||r&&r[a]||l&&a in l||o&&a in o)){const d=Gr(t,a);try{zr(e,a,d)}catch{}}}}return e}function Ue(e){return typeof e=="function"}const Fr=Symbol.for("react.forward_ref");function Ut(e){return e!=null&&(typeof e=="object"||typeof e=="function")&&e.$$typeof===Fr&&"styledComponentId"in e}function xe(e,t){return e&&t?e+" "+t:e||t||""}function xt(e,t){return e.join("")}function Ce(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function it(e,t,r=!1){if(!r&&!Ce(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=it(e[n],t[n]);else if(Ce(t))for(const n in t)e[n]=it(e[n],t[n]);return e}function Ht(e,t){Object.defineProperty(e,"toString",{value:t})}const Wr=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let r=this._cGroup;r<e;r++)t+=this.groupSizes[r];else for(let r=this._cGroup-1;r>=e;r--)t-=this.groupSizes[r];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){const s=this.groupSizes,o=s.length;let l=o;for(;e>=l;)if(l<<=1,l<0)throw We(16,`${e}`);this.groupSizes=new Uint32Array(l),this.groupSizes.set(s),this.length=l;for(let i=o;i<l;i++)this.groupSizes[i]=0}let r=this.indexOfGroup(e+1),n=0;for(let s=0,o=t.length;s<o;s++)this.tag.insertRule(r,t[s])&&(this.groupSizes[e]++,r++,n++);n>0&&this._cGroup>e&&(this._cIndex+=n)}clearGroup(e){if(e<this.length){const t=this.groupSizes[e],r=this.indexOfGroup(e),n=r+t;this.groupSizes[e]=0;for(let s=r;s<n;s++)this.tag.deleteRule(r);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t="";if(e>=this.length||this.groupSizes[e]===0)return t;const r=this.groupSizes[e],n=this.indexOfGroup(e),s=n+r;for(let o=n;o<s;o++)t+=this.tag.getRule(o)+ft;return t}},Ur=`style[${fe}][${Lt}="${Fe}"]`,Hr=new RegExp(`^${fe}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),wt=e=>typeof ShadowRoot<"u"&&e instanceof ShadowRoot||"host"in e&&e.nodeType===11,at=e=>{if(!e)return document;if(wt(e))return e;if("getRootNode"in e){const t=e.getRootNode();if(wt(t))return t}return document},Yr=(e,t,r)=>{const n=r.split(",");let s;for(let o=0,l=n.length;o<l;o++)(s=n[o])&&e.registerName(t,s)},qr=(e,t)=>{var r;const n=((r=t.textContent)!==null&&r!==void 0?r:"").split(ft),s=[];for(let o=0,l=n.length;o<l;o++){const i=n[o].trim();if(!i)continue;const a=i.match(Hr);if(a){const d=0|parseInt(a[1],10),p=a[2];d!==0&&(kr(p,d),Yr(e,p,a[3]),e.getTag().insertRules(d,s)),s.length=0}else s.push(i)}},Qe=e=>{const t=at(e.options.target).querySelectorAll(Ur);for(let r=0,n=t.length;r<n;r++){const s=t[r];s&&s.getAttribute(fe)!==zt&&(qr(e,s),s.parentNode&&s.parentNode.removeChild(s))}};let me=!1;function Jr(){if(me!==!1)return me;if(typeof document<"u"){const e=document.head.querySelector('meta[property="csp-nonce"]');if(e)return me=e.nonce||e.getAttribute("content")||void 0;const t=document.head.querySelector('meta[name="sc-nonce"]');if(t)return me=t.getAttribute("content")||void 0}return me=typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0}const Yt=(e,t)=>{const r=document.head,n=e||r,s=document.createElement("style"),o=(a=>{const d=Array.from(a.querySelectorAll(`style[${fe}]`));return d[d.length-1]})(n),l=o!==void 0?o.nextSibling:null;s.setAttribute(fe,zt),s.setAttribute(Lt,Fe);const i=t||Jr();return i&&s.setAttribute("nonce",i),n.insertBefore(s,l),s},Kr=class{constructor(e,t){this.element=Yt(e,t),this.element.appendChild(document.createTextNode("")),this.sheet=(r=>{var n;if(r.sheet)return r.sheet;const s=(n=r.getRootNode().styleSheets)!==null&&n!==void 0?n:document.styleSheets;for(let o=0,l=s.length;o<l;o++){const i=s[o];if(i.ownerNode===r)return i}throw We(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){const t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""}},Vr=class{constructor(e,t){this.element=Yt(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){const r=document.createTextNode(t);return this.element.insertBefore(r,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:""}};let St=Se;const Zr={isServer:!Se,useCSSOMInjection:!Sr};class He{static registerId(t){return Ie(t)}constructor(t=ue,r={},n){this.options=Object.assign(Object.assign({},Zr),t),this.gs=r,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Se&&St&&(St=!1,Qe(this)),Ht(this,()=>(s=>{const o=s.getTag(),{length:l}=o;let i="";for(let a=0;a<l;a++){const d=Cr(a);if(d===void 0)continue;const p=s.names.get(d);if(p===void 0||!p.size)continue;const g=o.getGroup(a);if(g.length===0)continue;const x=fe+".g"+a+'[id="'+d+'"]';let _="";for(const m of p)m.length>0&&(_+=m+",");i+=g+x+'{content:"'+_+'"}'+ft}return i})(this))}rehydrate(){!this.server&&Se&&Qe(this)}reconstructWithOptions(t,r=!0){const n=new He(Object.assign(Object.assign({},this.options),t),this.gs,r&&this.names||void 0);return n.keyframeIds=new Set(this.keyframeIds),!this.server&&Se&&t.target!==this.options.target&&at(this.options.target)!==at(t.target)&&Qe(n),n}allocateGSInstance(t){return this.gs[t]=(this.gs[t]||0)+1}getTag(){return this.tag||(this.tag=(t=(({useCSSOMInjection:r,target:n,nonce:s})=>r?new Kr(n,s):new Vr(n,s))(this.options),new Wr(t)));var t}hasNameForId(t,r){var n,s;return(s=(n=this.names.get(t))===null||n===void 0?void 0:n.has(r))!==null&&s!==void 0&&s}registerName(t,r){Ie(t),t.startsWith(jr)&&this.keyframeIds.add(t);const n=this.names.get(t);n?n.add(r):this.names.set(t,new Set([r]))}insertRules(t,r,n){this.registerName(t,r),this.getTag().insertRules(Ie(t),n)}clearNames(t){this.names.has(t)&&this.names.get(t).clear()}clearRules(t){this.getTag().clearGroup(Ie(t)),this.clearNames(t)}clearTag(){this.tag=void 0}}const qt=new WeakSet,Qr={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Xr(e,t){return t==null||typeof t=="boolean"||t===""?"":typeof t!="number"||t===0||e in Qr||e.startsWith("--")?String(t).trim():t+"px"}const ee=47;function jt(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t="";for(let r=0;r<e.length;r++){const n=e.charCodeAt(r);t+=n>=65&&n<=90?"-"+String.fromCharCode(n+32):e[r]}return t.startsWith("ms-")?"-"+t:t}const en=Symbol.for("sc-keyframes");function tn(e){return typeof e=="object"&&e!==null&&en in e}function Jt(e){return Ue(e)&&!(e.prototype&&e.prototype.isReactComponent)}const Kt=e=>e==null||e===!1||e==="",rn=Symbol.for("react.client.reference");function Ct(e){return e.$$typeof===rn}function Vt(e,t){for(const r in e){const n=e[r];e.hasOwnProperty(r)&&!Kt(n)&&(Array.isArray(n)&&qt.has(n)||Ue(n)?t.push(jt(r)+":",n,";"):Ce(n)?(t.push(r+" {"),Vt(n,t),t.push("}")):t.push(jt(r)+": "+Xr(r,n)+";"))}}function re(e,t,r,n,s=[]){if(Kt(e))return s;const o=typeof e;if(o==="string")return s.push(e),s;if(o==="function"){if(Ct(e))return s;if(Jt(e)&&t){const l=e(t);return re(l,t,r,n,s)}return s.push(e),s}if(Array.isArray(e)){for(let l=0;l<e.length;l++)re(e[l],t,r,n,s);return s}return Ut(e)?(s.push(`.${e.styledComponentId}`),s):tn(e)?(r?(e.inject(r,n),s.push(e.getName(n))):s.push(e),s):Ct(e)?s:Ce(e)?e.toString!==Object.prototype.toString?(s.push(e.toString()),s):(Vt(e,s),s):(s.push(e.toString()),s)}const nn=Bt(Fe);class sn{constructor(t,r,n){this.rules=t,this.componentId=r,this.baseHash=te(nn,r),this.baseStyle=n,He.registerId(r)}generateAndInjectStyles(t,r,n){let s=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";{let o="";for(let l=0;l<this.rules.length;l++){const i=this.rules[l];if(typeof i=="string")o+=i;else if(i)if(Jt(i)){const a=i(t);typeof a=="string"?o+=a:a!=null&&a!==!1&&(o+=xt(re(a,t,r,n)))}else o+=xt(re(i,t,r,n))}if(o){this.dynamicNameCache||(this.dynamicNameCache=new Map);const l=n.hash?n.hash+o:o;let i=this.dynamicNameCache.get(l);if(!i){if(i=Gt(te(te(this.baseHash,n.hash),o)>>>0),this.dynamicNameCache.size>=200){const a=this.dynamicNameCache.keys().next().value;a!==void 0&&this.dynamicNameCache.delete(a)}this.dynamicNameCache.set(l,i)}if(!r.hasNameForId(this.componentId,i)){const a=n(o,"."+i,void 0,this.componentId);r.insertRules(this.componentId,i,a)}s=xe(s,i)}}return s}}const on=/&/g;function Zt(e,t){let r=0;for(;--t>=0&&e.charCodeAt(t)===92;)r++;return!(1&~r)}function Xe(e){const t=e.length;let r="",n=0,s=0,o=0,l=!1,i=!1;for(let a=0;a<t;a++){const d=e.charCodeAt(a);if(o!==0||l||d!==ee||e.charCodeAt(a+1)!==42)if(l)d===42&&e.charCodeAt(a+1)===ee&&(l=!1,a++);else if(d!==34&&d!==39||Zt(e,a)){if(o===0)if(d===123)s++;else if(d===125){if(s--,s<0){i=!0;let p=a+1;for(;p<t;){const g=e.charCodeAt(p);if(g===59||g===10)break;p++}p<t&&e.charCodeAt(p)===59&&p++,s=0,a=p-1,n=p;continue}s===0&&(r+=e.substring(n,a+1),n=a+1)}else d===59&&s===0&&(r+=e.substring(n,a+1),n=a+1)}else o===0?o=d:o===d&&(o=0);else l=!0,a++}return i||s!==0||o!==0?(n<t&&s===0&&o===0&&(r+=e.substring(n)),r):e}function Qt(e,t){const r=t+" ",n=","+r;for(let s=0;s<e.length;s++){const o=e[s];if(o.type==="rule"){o.value=(r+o.value).replaceAll(",",n);const l=o.props,i=[];for(let a=0;a<l.length;a++)i[a]=r+l[a];o.props=i}Array.isArray(o.children)&&o.type!=="@keyframes"&&Qt(o.children,t)}return e}function an({options:e=ue,plugins:t=ut}=ue){let r,n,s;const o=(x,_,m)=>m.startsWith(n)&&m.endsWith(n)&&m.replaceAll(n,"").length>0?`.${r}`:x,l=t.slice();l.push(x=>{x.type===Me&&x.value.includes("&")&&(s||(s=new RegExp(`\\${n}\\b`,"g")),x.props[0]=x.props[0].replace(on,n).replace(s,o))}),e.prefix&&l.push(wr),l.push(br);let i=[];const a=yr(l.concat(xr(x=>i.push(x)))),d=(x,_="",m="",S="&")=>{r=S,n=_,s=void 0;const O=function(f){const E=f.indexOf("//")!==-1,G=f.indexOf("}")!==-1;if(!E&&!G)return f;if(!E)return Xe(f);const C=f.length;let I="",h=0,b=0,Z=0,se=0,T=0,he=!1;for(;b<C;){const v=f.charCodeAt(b);if(v!==34&&v!==39||Zt(f,b))if(Z===0)if(v===ee&&b+1<C&&f.charCodeAt(b+1)===42){for(b+=2;b+1<C&&(f.charCodeAt(b)!==42||f.charCodeAt(b+1)!==ee);)b++;b+=2}else if(v!==40)if(v!==41)if(se>0)b++;else if(v===42&&b+1<C&&f.charCodeAt(b+1)===ee)I+=f.substring(h,b),b+=2,h=b,he=!0;else if(v===ee&&b+1<C&&f.charCodeAt(b+1)===ee){for(I+=f.substring(h,b);b<C&&f.charCodeAt(b)!==10;)b++;h=b,he=!0}else v===123?T++:v===125&&T--,b++;else se>0&&se--,b++;else se++,b++;else b++;else Z===0?Z=v:Z===v&&(Z=0),b++}return he?(h<C&&(I+=f.substring(h)),T===0?I:Xe(I)):T===0?f:Xe(f)}(x);let j=gr(m||_?m+" "+_+" { "+O+" }":O);return e.namespace&&(j=Qt(j,e.namespace)),i=[],Te(j,a),i},p=e;let g=st;for(let x=0;x<t.length;x++)t[x].name||We(15),g=te(g,t[x].name);return p?.namespace&&(g=te(g,p.namespace)),p?.prefix&&(g=te(g,"p")),d.hash=g!==st?g.toString():"",d}const cn=new He,ln=an(),Xt=ce.createContext({shouldForwardProp:void 0,styleSheet:cn,stylis:ln,stylisPlugins:void 0});Xt.Consumer;function dn(){return ce.useContext(Xt)}const er=ce.createContext(void 0);er.Consumer;const kt=Object.prototype.hasOwnProperty,et={};function fn(e,t){const r=typeof e!="string"?"sc":Mt(e);et[r]=(et[r]||0)+1;const n=r+"-"+$r(Fe+r+et[r]);return t?t+"-"+n:n}function un(e,t,r){const n=Ut(e),s=e,o=!ot(e),{attrs:l=ut,componentId:i=fn(t.displayName,t.parentComponentId),displayName:a=Or(e)}=t,d=t.displayName&&t.componentId?Mt(t.displayName)+"-"+t.componentId:t.componentId||i,p=n&&s.attrs?s.attrs.concat(l).filter(Boolean):l;let{shouldForwardProp:g}=t;if(n&&s.shouldForwardProp){const S=s.shouldForwardProp;if(t.shouldForwardProp){const O=t.shouldForwardProp;g=(j,f)=>S(j,f)&&O(j,f)}else g=S}const x=new sn(r,d,n?s.componentStyle:void 0);function _(S,O){return function(j,f,E){const{attrs:G,componentStyle:C,defaultProps:I,foldedComponentIds:h,styledComponentId:b,target:Z}=j,se=ce.useContext(er),T=dn(),he=j.shouldForwardProp||T.shouldForwardProp,v=_r(f,se,I)||ue;let Y,ge;{const q=ce.useRef(null),B=q.current;if(B!==null&&B[1]===v&&B[2]===T.styleSheet&&B[3]===T.stylis&&B[7]===C&&function(oe,D,P){const z=oe,N=D;let _e=0;for(const Q in N)if(kt.call(N,Q)&&(_e++,z[Q]!==N[Q]))return!1;return _e===P}(B[0],f,B[4]))Y=B[5],ge=B[6];else{Y=function(D,P,z){const N=Object.assign(Object.assign({},P),{className:void 0,theme:z}),_e=D.length>1;for(let Q=0;Q<D.length;Q++){const Je=D[Q],Ae=Ue(Je)?Je(_e?Object.assign({},N):N):Je;for(const J in Ae)J==="className"?N.className=xe(N.className,Ae[J]):J==="style"?N.style=Object.assign(Object.assign({},N.style),Ae[J]):J in P&&P[J]===void 0||(N[J]=Ae[J])}return"className"in P&&typeof P.className=="string"&&(N.className=xe(N.className,P.className)),N}(G,f,v),ge=C.generateAndInjectStyles(Y,T.styleSheet,T.stylis);let oe=0;for(const D in f)kt.call(f,D)&&oe++;q.current=[f,v,T.styleSheet,T.stylis,oe,Y,ge,C]}}const ke=Y.as||Z,Ye=function(q,B,oe,D){const P={};for(const z in q)q[z]===void 0||z[0]==="$"||z==="as"||z==="theme"&&q.theme===oe||(z==="forwardedAs"?P.as=q.forwardedAs:D&&!D(z,B)||(P[z]=q[z]));return P}(Y,ke,v,he);let qe=xe(h,b);return ge&&(qe+=" "+ge),Y.className&&(qe+=" "+Y.className),Ye[ot(ke)&&ke.includes("-")?"class":"className"]=qe,E&&(Ye.ref=E),W.createElement(ke,Ye)}(m,S,O)}_.displayName=a;let m=ce.forwardRef(_);return m.attrs=p,m.componentStyle=x,m.displayName=a,m.shouldForwardProp=g,m.foldedComponentIds=n?xe(s.foldedComponentIds,s.styledComponentId):"",m.styledComponentId=d,m.target=n?s.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(S){this._foldedDefaultProps=n?function(O,...j){for(const f of j)it(O,f,!0);return O}({},s.defaultProps,S):S}}),Ht(m,()=>`.${m.styledComponentId}`),o&&Wt(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var pn=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]);function _t(e,t){const r=[e[0]];for(let n=0,s=t.length;n<s;n+=1)r.push(t[n],e[n+1]);return r}const At=e=>(qt.add(e),e);function hn(e,...t){if(Ue(e)||Ce(e))return At(re(_t(ut,[e,...t])));const r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?re(r):At(re(_t(r,t)))}function ct(e,t,r=ue){if(!t)throw We(1,t);const n=(s,...o)=>e(t,r,hn(s,...o));return n.attrs=s=>ct(e,t,Object.assign(Object.assign({},r),{attrs:Array.prototype.concat(r.attrs,s).filter(Boolean)})),n.withConfig=s=>ct(e,t,Object.assign(Object.assign({},r),s)),n}const tr=e=>ct(un,e),R=tr;pn.forEach(e=>{R[e]=tr(e)});const gn=R.div`
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  max-width: 600px;
  margin: 0 auto;
`,mn=R.h2`
  margin-top: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #00ffcc, #00b3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,It=R.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  
  label {
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #ccc;
  }
  
  select, input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-family: inherit;
    &:focus {
      outline: none;
      border-color: #00ffcc;
    }
  }
`,bn=R.button`
  background: linear-gradient(135deg, #00ffcc, #00b3ff);
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 204, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,yn=R.div`
  margin-top: 24px;
  background: rgba(0, 0, 0, 0.4);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`,xn=R.div`
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:last-child {
    border-bottom: none;
  }
  
  .name {
    font-weight: 600;
    font-size: 1.1rem;
    color: #00ffcc;
  }
  
  .stats {
    font-size: 0.85rem;
    color: #aaa;
    margin-top: 4px;
    display: flex;
    gap: 16px;
  }
`;function wn(){const[e,t]=W.useState({ram:16,vram:8,cores:8}),[r,n]=W.useState(!1),[s,o]=W.useState(null),[l,i]=W.useState(null),a=async()=>{n(!0),i(null);try{const p=window.location.hostname==="localhost"?"http://127.0.0.1:5001/sentaient-conversion-hub/us-central1/llmfitRecommend":"https://us-central1-sentaient-conversion-hub.cloudfunctions.net/llmfitRecommend",g=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!g.ok)throw new Error("Failed to fetch recommendations");const x=await g.json();o(x)}catch{i("Could not reach the cloud estimator. Please try again later.")}finally{n(!1)}};return c.jsxs(gn,{children:[c.jsx(mn,{children:"Hardware-Aware AI (Cloud Estimator)"}),c.jsx("p",{style:{color:"#aaa",fontSize:"0.9rem",marginBottom:"24px"},children:"Don't want to install the desktop app? Select your device specs below and we'll estimate the best local AI models for you."}),c.jsxs(It,{children:[c.jsx("label",{children:"System RAM (GB)"}),c.jsxs("select",{value:e.ram,onChange:d=>t({...e,ram:parseInt(d.target.value)}),children:[c.jsx("option",{value:"8",children:"8 GB"}),c.jsx("option",{value:"16",children:"16 GB"}),c.jsx("option",{value:"32",children:"32 GB"}),c.jsx("option",{value:"64",children:"64+ GB"})]})]}),c.jsxs(It,{children:[c.jsx("label",{children:"GPU VRAM (GB)"}),c.jsxs("select",{value:e.vram,onChange:d=>t({...e,vram:parseInt(d.target.value)}),children:[c.jsx("option",{value:"0",children:"None / Integrated"}),c.jsx("option",{value:"4",children:"4 GB"}),c.jsx("option",{value:"8",children:"8 GB"}),c.jsx("option",{value:"12",children:"12 GB"}),c.jsx("option",{value:"16",children:"16 GB"}),c.jsx("option",{value:"24",children:"24+ GB"})]}),c.jsx("small",{style:{color:"#888",marginTop:"4px"},children:"If you are on an Apple Silicon Mac (M1/M2/M3), select the same value as your System RAM."})]}),c.jsx(bn,{onClick:a,disabled:r,children:r?"Analyzing...":"Get Recommendations"}),l&&c.jsx("div",{style:{color:"#ff4444",marginTop:"16px",fontSize:"0.9rem",textAlign:"center"},children:l}),s&&s.models&&c.jsxs(yn,{children:[c.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"1.1rem"},children:"Top Recommended Models"}),s.models.map((d,p)=>c.jsxs(xn,{children:[c.jsx("div",{className:"name",children:d.name}),c.jsxs("div",{className:"stats",children:[c.jsxs("span",{children:["Fit: ",c.jsx("strong",{children:d.fit_level})]}),c.jsxs("span",{children:["Est. Speed: ",c.jsxs("strong",{children:[d.estimated_tps," tps"]})]}),c.jsxs("span",{children:["Context: ",d.effective_context_length]})]})]},p))]})]})}function $(e,t,r,n){if(typeof t=="function"?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?n:r==="a"?n.call(e):n?n.value:t.get(e)}function be(e,t,r,n,s){if(typeof t=="function"?e!==t||!0:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t.set(e,r),r}var X,L,ae,ve;const vt="__TAURI_TO_IPC_KEY__";function Sn(e,t=!1){return window.__TAURI_INTERNALS__.transformCallback(e,t)}class jn{constructor(t){X.set(this,void 0),L.set(this,0),ae.set(this,[]),ve.set(this,void 0),be(this,X,t||(()=>{})),this.id=Sn(r=>{const n=r.index;if("end"in r){n==$(this,L,"f")?this.cleanupCallback():be(this,ve,n);return}const s=r.message;if(n==$(this,L,"f")){for($(this,X,"f").call(this,s),be(this,L,$(this,L,"f")+1);$(this,L,"f")in $(this,ae,"f");){const o=$(this,ae,"f")[$(this,L,"f")];$(this,X,"f").call(this,o),delete $(this,ae,"f")[$(this,L,"f")],be(this,L,$(this,L,"f")+1)}$(this,L,"f")===$(this,ve,"f")&&this.cleanupCallback()}else $(this,ae,"f")[n]=s})}cleanupCallback(){window.__TAURI_INTERNALS__.unregisterCallback(this.id)}set onmessage(t){be(this,X,t)}get onmessage(){return $(this,X,"f")}[(X=new WeakMap,L=new WeakMap,ae=new WeakMap,ve=new WeakMap,vt)](){return`__CHANNEL__:${this.id}`}toJSON(){return this[vt]()}}async function ze(e,t={},r){return window.__TAURI_INTERNALS__.invoke(e,t,r)}class tt{constructor(){this.eventListeners=Object.create(null)}addListener(t,r){return this.on(t,r)}removeListener(t,r){return this.off(t,r)}on(t,r){return t in this.eventListeners?this.eventListeners[t].push(r):this.eventListeners[t]=[r],this}once(t,r){const n=s=>{this.removeListener(t,n),r(s)};return this.addListener(t,n)}off(t,r){return t in this.eventListeners&&(this.eventListeners[t]=this.eventListeners[t].filter(n=>n!==r)),this}removeAllListeners(t){return t?delete this.eventListeners[t]:this.eventListeners=Object.create(null),this}emit(t,r){if(t in this.eventListeners){const n=this.eventListeners[t];for(const s of n)s(r);return!0}return!1}listenerCount(t){return t in this.eventListeners?this.eventListeners[t].length:0}prependListener(t,r){return t in this.eventListeners?this.eventListeners[t].unshift(r):this.eventListeners[t]=[r],this}prependOnceListener(t,r){const n=s=>{this.removeListener(t,n),r(s)};return this.prependListener(t,n)}}class Cn{constructor(t){this.pid=t}async write(t){await ze("plugin:shell|stdin_write",{pid:this.pid,buffer:t})}async kill(){await ze("plugin:shell|kill",{cmd:"killChild",pid:this.pid})}}class Le extends tt{constructor(t,r=[],n){super(),this.stdout=new tt,this.stderr=new tt,this.program=t,this.args=typeof r=="string"?[r]:r,this.options=n??{}}static create(t,r=[],n){return new Le(t,r,n)}static sidecar(t,r=[],n){const s=new Le(t,r,n);return s.options.sidecar=!0,s}async spawn(){const t=this.program,r=this.args,n=this.options;typeof r=="object"&&Object.freeze(r);const s=new jn;return s.onmessage=o=>{switch(o.event){case"Error":this.emit("error",o.payload);break;case"Terminated":this.emit("close",o.payload);break;case"Stdout":this.stdout.emit("data",o.payload);break;case"Stderr":this.stderr.emit("data",o.payload);break}},await ze("plugin:shell|spawn",{program:t,args:r,options:n,onEvent:s}).then(o=>new Cn(o))}async execute(){const t=this.program,r=this.args,n=this.options;return typeof r=="object"&&Object.freeze(r),await ze("plugin:shell|execute",{program:t,args:r,options:n})}}const kn=R.div`
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0, 255, 204, 0.3);
  color: white;
  max-width: 600px;
  margin: 0 auto;
`,_n=R.h2`
  margin-top: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #00ffcc, #00b3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
`,An=R.button`
  background: linear-gradient(135deg, #00ffcc, #00b3ff);
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 16px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 204, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,In=R.div`
  margin-top: 24px;
  background: rgba(0, 0, 0, 0.4);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`,vn=R.div`
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:last-child {
    border-bottom: none;
  }
  
  .name {
    font-weight: 600;
    font-size: 1.1rem;
    color: #00ffcc;
  }
  
  .stats {
    font-size: 0.85rem;
    color: #aaa;
    margin-top: 4px;
    display: flex;
    gap: 16px;
  }
`,$n=R.div`
  background: rgba(0, 255, 204, 0.05);
  border: 1px solid rgba(0, 255, 204, 0.1);
  padding: 12px;
  border-radius: 8px;
  margin-top: 16px;
  font-size: 0.9rem;
  
  div {
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;function Rn(){const[e,t]=W.useState(!1),[r,n]=W.useState(null),[s,o]=W.useState(null);W.useEffect(()=>{l()},[]);const l=async()=>{t(!0),o(null);try{const a=await Le.sidecar("bin/llmfit",["recommend","--json"]).execute();if(a.code!==0&&!a.stdout.trim().startsWith("{"))throw new Error(a.stderr||"Failed to analyze hardware natively.");const d=JSON.parse(a.stdout);n(d)}catch(i){o("Could not run native hardware scan. "+i.message)}finally{t(!1)}};return c.jsxs(kn,{children:[c.jsxs(_n,{children:[c.jsx("span",{style:{fontSize:"1.8rem"},children:"⚡️"}),"Native Hardware Detection"]}),c.jsx("p",{style:{color:"#aaa",fontSize:"0.9rem",marginBottom:"16px"},children:"Running locally on your machine. We securely analyze your physical CPU, RAM, and GPU to find the perfect models."}),r&&r.system&&c.jsxs($n,{children:[c.jsxs("div",{children:[c.jsx("strong",{children:"CPU:"})," ",r.system.cpu?.model||"Unknown"]}),c.jsxs("div",{children:[c.jsx("strong",{children:"RAM:"})," ",Math.round(r.system.ram_total_gb)," GB"]}),c.jsxs("div",{children:[c.jsx("strong",{children:"GPU:"})," ",r.system.gpu?.model||"None"]})]}),c.jsx(An,{onClick:l,disabled:e,children:e?"Scanning Hardware...":"Rescan Hardware"}),s&&c.jsx("div",{style:{color:"#ff4444",marginTop:"16px",fontSize:"0.9rem",textAlign:"center"},children:s}),r&&r.models&&c.jsxs(In,{children:[c.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"1.1rem"},children:"Top Recommended Models"}),r.models.map((i,a)=>c.jsxs(vn,{children:[c.jsx("div",{className:"name",children:i.name}),c.jsxs("div",{className:"stats",children:[c.jsxs("span",{children:["Fit: ",c.jsx("strong",{style:{color:i.fit_level==="perfect"?"#00ffcc":"white"},children:i.fit_level})]}),c.jsxs("span",{children:["Est. Speed: ",c.jsxs("strong",{children:[i.estimated_tps," tps"]})]}),c.jsxs("span",{children:["Context: ",i.effective_context_length]})]})]},a))]})]})}const On=R.div`
  padding: 40px 20px;
  background: #0f0f13;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`,En=R.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #00ffcc, #00b3ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    color: #aaa;
    font-size: 1.1rem;
    max-width: 600px;
    line-height: 1.6;
  }
`,Nn=R.div`
  background: rgba(0, 255, 204, 0.1);
  border: 1px solid rgba(0, 255, 204, 0.3);
  color: #00ffcc;
  padding: 16px;
  border-radius: 12px;
  max-width: 600px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .text {
    font-size: 0.95rem;
  }
  
  a {
    color: black;
    background: #00ffcc;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
    font-size: 0.9rem;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;function Tn(){const[e,t]=W.useState(!1);return W.useEffect(()=>{window.__TAURI__&&t(!0)},[]),c.jsxs(On,{children:[c.jsxs(En,{children:[c.jsx("h1",{children:"Lightspeed AI Hub"}),c.jsx("p",{children:"Right-size your local LLMs for maximum privacy and performance. We analyze your hardware to recommend the perfect models."})]}),!e&&c.jsxs(Nn,{children:[c.jsxs("div",{className:"text",children:[c.jsx("strong",{children:"For maximum privacy:"})," Download the Lightspeed Desktop App. It automatically detects your hardware securely without sending data to the cloud."]}),c.jsx("a",{href:"#download",children:"Download"})]}),e?c.jsx(Rn,{}):c.jsx(wn,{})]})}function zn(){return c.jsx("div",{style:{minHeight:"100vh",background:"#050505"},children:c.jsx(Tn,{})})}export{zn as default};
//# sourceMappingURL=LightspeedHardware-THvWOaUE.js.map
