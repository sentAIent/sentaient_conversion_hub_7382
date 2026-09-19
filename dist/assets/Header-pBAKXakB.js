import{r as Ut,u as nc,h as ic,j as R,L as ci}from"./vendor-DFh9rsBu.js";import{I as xt}from"./main-BNoCNCId.js";const sc=()=>{};var er={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let r=n.charCodeAt(s);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},rc=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const r=n[t++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const c=n[t++];e[s++]=String.fromCharCode((r&31)<<6|c&63)}else if(r>239&&r<365){const c=n[t++],h=n[t++],g=n[t++],w=((r&7)<<18|(c&63)<<12|(h&63)<<6|g&63)-65536;e[s++]=String.fromCharCode(55296+(w>>10)),e[s++]=String.fromCharCode(56320+(w&1023))}else{const c=n[t++],h=n[t++];e[s++]=String.fromCharCode((r&15)<<12|(c&63)<<6|h&63)}}return e.join("")},eo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<n.length;r+=3){const c=n[r],h=r+1<n.length,g=h?n[r+1]:0,w=r+2<n.length,T=w?n[r+2]:0,b=c>>2,A=(c&3)<<4|g>>4;let P=(g&15)<<2|T>>6,H=T&63;w||(H=64,h||(P=64)),s.push(t[b],t[A],t[P],t[H])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Zr(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):rc(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<n.length;){const c=t[n.charAt(r++)],g=r<n.length?t[n.charAt(r)]:0;++r;const T=r<n.length?t[n.charAt(r)]:64;++r;const A=r<n.length?t[n.charAt(r)]:64;if(++r,c==null||g==null||T==null||A==null)throw new oc;const P=c<<2|g>>4;if(s.push(P),T!==64){const H=g<<4&240|T>>2;if(s.push(H),A!==64){const j=T<<6&192|A;s.push(j)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class oc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ac=function(n){const e=Zr(n);return eo.encodeByteArray(e,!0)},wn=function(n){return ac(n).replace(/\./g,"")},to=function(n){try{return eo.decodeString(n,!0)}catch{}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc=()=>cc().__FIREBASE_DEFAULTS__,lc=()=>{if(typeof process>"u"||typeof er>"u")return;const n=er.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},uc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&to(n[1]);return e&&JSON.parse(e)},Oi=()=>{try{return sc()||hc()||lc()||uc()}catch{return}},no=n=>{var e,t;return(t=(e=Oi())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},dc=n=>{const e=no(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},io=()=>{var n;return(n=Oi())==null?void 0:n.config},so=n=>{var e;return(e=Oi())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",r=n.iat||0,c=n.sub||n.user_id;if(!c)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:c,user_id:c,firebase:{sign_in_provider:"custom",identities:{}},...n};return[wn(JSON.stringify(t)),wn(JSON.stringify(h)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(J())}function mc(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ro(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function yc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function _c(){const n=J();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function oo(){try{return typeof indexedDB=="object"}catch{return!1}}function ao(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var c;e(((c=r.error)==null?void 0:c.message)||"")}}catch(t){e(t)}})}function wc(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic="FirebaseError";class re extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Ic,Object.setPrototypeOf(this,re.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,it.prototype.create)}}class it{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},r=`${this.service}/${e}`,c=this.errors[e],h=c?vc(c,s):"Error",g=`${this.serviceName}: ${h} (${r}).`;return new re(r,g,s)}}function vc(n,e){return n.replace(Tc,(t,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Tc=/\{\$([^}]+)}/g;function Ec(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Fe(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const r of t){if(!s.includes(r))return!1;const c=n[r],h=e[r];if(tr(c)&&tr(h)){if(!Fe(c,h))return!1}else if(c!==h)return!1}for(const r of s)if(!t.includes(r))return!1;return!0}function tr(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Ac(n,e){const t=new bc(n,e);return t.subscribe.bind(t)}class bc{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let r;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");Sc(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:s},r.next===void 0&&(r.next=hi),r.error===void 0&&(r.error=hi),r.complete===void 0&&(r.complete=hi);const c=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),c}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch{}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Sc(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function hi(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc=1e3,Rc=2,Pc=4*60*60*1e3,kc=.5;function nr(n,e=Cc,t=Rc){const s=e*Math.pow(t,n),r=Math.round(kc*s*(Math.random()-.5)*2);return Math.min(Pc,s+r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function co(n){return(await fetch(n,{credentials:"include"})).ok}class se{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new fc;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dc(e))try{this.getOrInitializeService({instanceIdentifier:Ge})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const c=this.getOrInitializeService({instanceIdentifier:r});s.resolve(c)}catch{}}}}clearInstance(e=Ge){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ge){return this.instances.has(e)}getOptions(e=Ge){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[c,h]of this.instancesDeferred.entries()){const g=this.normalizeInstanceIdentifier(c);s===g&&h.resolve(r)}return r}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const c=this.instances.get(s);return c&&e(c,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const r of s)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Oc(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Ge){return this.component?this.component.multipleInstances?e:Ge:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Oc(n){return n===Ge?void 0:n}function Dc(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Nc(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var D;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(D||(D={}));const Mc={debug:D.DEBUG,verbose:D.VERBOSE,info:D.INFO,warn:D.WARN,error:D.ERROR,silent:D.SILENT},xc=D.INFO,Uc={[D.DEBUG]:"log",[D.VERBOSE]:"log",[D.INFO]:"info",[D.WARN]:"warn",[D.ERROR]:"error"},jc=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),r=Uc[e];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Nn{constructor(e){this.name=e,this._logLevel=xc,this._logHandler=jc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in D))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,D.DEBUG,...e),this._logHandler(this,D.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,D.VERBOSE,...e),this._logHandler(this,D.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,D.INFO,...e),this._logHandler(this,D.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,D.WARN,...e),this._logHandler(this,D.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,D.ERROR,...e),this._logHandler(this,D.ERROR,...e)}}const Fc=(n,e)=>e.some(t=>n instanceof t);let ir,sr;function Vc(){return ir||(ir=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bc(){return sr||(sr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ho=new WeakMap,vi=new WeakMap,lo=new WeakMap,li=new WeakMap,Di=new WeakMap;function $c(n){const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("success",c),n.removeEventListener("error",h)},c=()=>{t(Ue(n.result)),r()},h=()=>{s(n.error),r()};n.addEventListener("success",c),n.addEventListener("error",h)});return e.then(t=>{t instanceof IDBCursor&&ho.set(t,n)}).catch(()=>{}),Di.set(e,n),e}function Hc(n){if(vi.has(n))return;const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("complete",c),n.removeEventListener("error",h),n.removeEventListener("abort",h)},c=()=>{t(),r()},h=()=>{s(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",c),n.addEventListener("error",h),n.addEventListener("abort",h)});vi.set(n,e)}let Ti={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return vi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||lo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ue(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function zc(n){Ti=n(Ti)}function Wc(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(ui(this),e,...t);return lo.set(s,e.sort?e.sort():[e]),Ue(s)}:Bc().includes(n)?function(...e){return n.apply(ui(this),e),Ue(ho.get(this))}:function(...e){return Ue(n.apply(ui(this),e))}}function Gc(n){return typeof n=="function"?Wc(n):(n instanceof IDBTransaction&&Hc(n),Fc(n,Vc())?new Proxy(n,Ti):n)}function Ue(n){if(n instanceof IDBRequest)return $c(n);if(li.has(n))return li.get(n);const e=Gc(n);return e!==n&&(li.set(n,e),Di.set(e,n)),e}const ui=n=>Di.get(n);function uo(n,e,{blocked:t,upgrade:s,blocking:r,terminated:c}={}){const h=indexedDB.open(n,e),g=Ue(h);return s&&h.addEventListener("upgradeneeded",w=>{s(Ue(h.result),w.oldVersion,w.newVersion,Ue(h.transaction),w)}),t&&h.addEventListener("blocked",w=>t(w.oldVersion,w.newVersion,w)),g.then(w=>{c&&w.addEventListener("close",()=>c()),r&&w.addEventListener("versionchange",T=>r(T.oldVersion,T.newVersion,T))}).catch(()=>{}),g}const qc=["get","getKey","getAll","getAllKeys","count"],Kc=["put","add","delete","clear"],di=new Map;function rr(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(di.get(e))return di.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,r=Kc.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(r||qc.includes(t)))return;const c=async function(h,...g){const w=this.transaction(h,r?"readwrite":"readonly");let T=w.store;return s&&(T=T.index(g.shift())),(await Promise.all([T[t](...g),r&&w.done]))[0]};return di.set(e,c),c}zc(n=>({...n,get:(e,t,s)=>rr(e,t)||n.get(e,t,s),has:(e,t)=>!!rr(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Xc(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Xc(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ei="@firebase/app",or="0.14.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ie=new Nn("@firebase/app"),Yc="@firebase/app-compat",Qc="@firebase/analytics-compat",Zc="@firebase/analytics",eh="@firebase/app-check-compat",th="@firebase/app-check",nh="@firebase/auth",ih="@firebase/auth-compat",sh="@firebase/database",rh="@firebase/data-connect",oh="@firebase/database-compat",ah="@firebase/functions",ch="@firebase/functions-compat",hh="@firebase/installations",lh="@firebase/installations-compat",uh="@firebase/messaging",dh="@firebase/messaging-compat",fh="@firebase/performance",ph="@firebase/performance-compat",gh="@firebase/remote-config",mh="@firebase/remote-config-compat",yh="@firebase/storage",_h="@firebase/storage-compat",wh="@firebase/firestore",Ih="@firebase/ai",vh="@firebase/firestore-compat",Th="firebase",Eh="12.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai="[DEFAULT]",Ah={[Ei]:"fire-core",[Yc]:"fire-core-compat",[Zc]:"fire-analytics",[Qc]:"fire-analytics-compat",[th]:"fire-app-check",[eh]:"fire-app-check-compat",[nh]:"fire-auth",[ih]:"fire-auth-compat",[sh]:"fire-rtdb",[rh]:"fire-data-connect",[oh]:"fire-rtdb-compat",[ah]:"fire-fn",[ch]:"fire-fn-compat",[hh]:"fire-iid",[lh]:"fire-iid-compat",[uh]:"fire-fcm",[dh]:"fire-fcm-compat",[fh]:"fire-perf",[ph]:"fire-perf-compat",[gh]:"fire-rc",[mh]:"fire-rc-compat",[yh]:"fire-gcs",[_h]:"fire-gcs-compat",[wh]:"fire-fst",[vh]:"fire-fst-compat",[Ih]:"fire-vertex","fire-js":"fire-js",[Th]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In=new Map,bh=new Map,bi=new Map;function ar(n,e){try{n.container.addComponent(e)}catch(t){Ie.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ge(n){const e=n.name;if(bi.has(e))return Ie.debug(`There were multiple attempts to register component ${e}.`),!1;bi.set(e,n);for(const t of In.values())ar(t,n);for(const t of bh.values())ar(t,n);return!0}function st(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ue(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},je=new it("app","Firebase",Sh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new se("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw je.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=Eh;function fo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:Ai,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw je.create("bad-app-name",{appName:String(r)});if(t||(t=io()),!t)throw je.create("no-options");const c=In.get(r);if(c){if(Fe(t,c.options)&&Fe(s,c.config))return c;throw je.create("duplicate-app",{appName:r})}const h=new Lc(r);for(const w of bi.values())h.addComponent(w);const g=new Ch(t,s,h);return In.set(r,g),g}function Li(n=Ai){const e=In.get(n);if(!e&&n===Ai&&io())return fo();if(!e)throw je.create("no-app",{appName:n});return e}function ee(n,e,t){let s=Ah[n]??n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),c=e.match(/\s|\//);if(r||c){const h=[`Unable to register library "${s}" with version "${e}":`];r&&h.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&c&&h.push("and"),c&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ie.warn(h.join(" "));return}ge(new se(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh="firebase-heartbeat-database",Ph=1,$t="firebase-heartbeat-store";let fi=null;function po(){return fi||(fi=uo(Rh,Ph,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore($t)}catch{}}}}).catch(n=>{throw je.create("idb-open",{originalErrorMessage:n.message})})),fi}async function kh(n){try{const t=(await po()).transaction($t),s=await t.objectStore($t).get(go(n));return await t.done,s}catch(e){if(e instanceof re)Ie.warn(e.message);else{const t=je.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ie.warn(t.message)}}}async function cr(n,e){try{const s=(await po()).transaction($t,"readwrite");await s.objectStore($t).put(e,go(n)),await s.done}catch(t){if(t instanceof re)Ie.warn(t.message);else{const s=je.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ie.warn(s.message)}}}function go(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=1024,Oh=30;class Dh{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Mh(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),c=hr();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===c||this._heartbeatsCache.heartbeats.some(h=>h.date===c))return;if(this._heartbeatsCache.heartbeats.push({date:c,agent:r}),this._heartbeatsCache.heartbeats.length>Oh){const h=xh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(h,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Ie.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=hr(),{heartbeatsToSend:s,unsentEntries:r}=Lh(this._heartbeatsCache.heartbeats),c=wn(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),c}catch(t){return Ie.warn(t),""}}}function hr(){return new Date().toISOString().substring(0,10)}function Lh(n,e=Nh){const t=[];let s=n.slice();for(const r of n){const c=t.find(h=>h.agent===r.agent);if(c){if(c.dates.push(r.date),lr(t)>e){c.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),lr(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Mh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return oo()?ao().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await kh(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return cr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return cr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function lr(n){return wn(JSON.stringify({version:2,heartbeats:n})).length}function xh(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(n){ge(new se("platform-logger",e=>new Jc(e),"PRIVATE")),ge(new se("heartbeat",e=>new Dh(e),"PRIVATE")),ee(Ei,or,n),ee(Ei,or,"esm2020"),ee("fire-js","")}Uh("");function mo(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const jh=mo,yo=new it("auth","Firebase",mo());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn=new Nn("@firebase/auth");function Fh(n,...e){vn.logLevel<=D.WARN&&vn.warn(`Auth (${_t}): ${n}`,...e)}function pn(n,...e){vn.logLevel<=D.ERROR&&vn.error(`Auth (${_t}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(n,...e){throw Mi(n,...e)}function fe(n,...e){return Mi(n,...e)}function _o(n,e,t){const s={...jh(),[e]:t};return new it("auth","Firebase",s).create(e,{appName:n.name})}function Xe(n){return _o(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Mi(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return yo.create(n,...e)}function S(n,e,...t){if(!n)throw Mi(e,...t)}function _e(n){const e="INTERNAL ASSERTION FAILED: "+n;throw pn(e),new Error(e)}function Te(n,e){n||_e(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Vh(){return ur()==="http:"||ur()==="https:"}function ur(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bh(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Vh()||ro()||"connection"in navigator)?navigator.onLine:!0}function $h(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,t){this.shortDelay=e,this.longDelay=t,Te(t>e,"Short delay should be less than long delay!"),this.isMobile=gc()||yc()}get(){return Bh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(n,e){Te(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;_e("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;_e("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;_e("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Wh=new Gt(3e4,6e4);function Ui(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function wt(n,e,t,s,r={}){return Io(n,r,async()=>{let c={},h={};s&&(e==="GET"?h=s:c={body:JSON.stringify(s)});const g=Wt({key:n.config.apiKey,...h}).slice(1),w=await n._getAdditionalHeaders();w["Content-Type"]="application/json",n.languageCode&&(w["X-Firebase-Locale"]=n.languageCode);const T={method:e,headers:w,...c};return mc()||(T.referrerPolicy="no-referrer"),n.emulatorConfig&&kn(n.emulatorConfig.host)&&(T.credentials="include"),wo.fetch()(await vo(n,n.config.apiHost,t,g),T)})}async function Io(n,e,t){n._canInitEmulator=!1;const s={...Hh,...e};try{const r=new qh(n),c=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const h=await c.json();if("needConfirmation"in h)throw ln(n,"account-exists-with-different-credential",h);if(c.ok&&!("errorMessage"in h))return h;{const g=c.ok?h.errorMessage:h.error.message,[w,T]=g.split(" : ");if(w==="FEDERATED_USER_ID_ALREADY_LINKED")throw ln(n,"credential-already-in-use",h);if(w==="EMAIL_EXISTS")throw ln(n,"email-already-in-use",h);if(w==="USER_DISABLED")throw ln(n,"user-disabled",h);const b=s[w]||w.toLowerCase().replace(/[_\s]+/g,"-");if(T)throw _o(n,b,T);ve(n,b)}}catch(r){if(r instanceof re)throw r;ve(n,"network-request-failed",{message:String(r)})}}async function Gh(n,e,t,s,r={}){const c=await wt(n,e,t,s,r);return"mfaPendingCredential"in c&&ve(n,"multi-factor-auth-required",{_serverResponse:c}),c}async function vo(n,e,t,s){const r=`${e}${t}?${s}`,c=n,h=c.config.emulator?xi(n.config,r):`${n.config.apiScheme}://${r}`;return zh.includes(t)&&(await c._persistenceManagerAvailable,c._getPersistenceType()==="COOKIE")?c._getPersistence()._getFinalTarget(h).toString():h}class qh{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(fe(this.auth,"network-request-failed")),Wh.get())})}}function ln(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const r=fe(n,e,s);return r.customData._tokenResponse=t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kh(n,e){return wt(n,"POST","/v1/accounts:delete",e)}async function Tn(n,e){return wt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Jh(n,e=!1){const t=me(n),s=await t.getIdToken(e),r=ji(s);S(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const c=typeof r.firebase=="object"?r.firebase:void 0,h=c==null?void 0:c.sign_in_provider;return{claims:r,token:s,authTime:jt(pi(r.auth_time)),issuedAtTime:jt(pi(r.iat)),expirationTime:jt(pi(r.exp)),signInProvider:h||null,signInSecondFactor:(c==null?void 0:c.sign_in_second_factor)||null}}function pi(n){return Number(n)*1e3}function ji(n){const[e,t,s]=n.split(".");if(e===void 0||t===void 0||s===void 0)return pn("JWT malformed, contained fewer than 3 sections"),null;try{const r=to(t);return r?JSON.parse(r):(pn("Failed to decode base64 JWT payload"),null)}catch(r){return pn("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function dr(n){const e=ji(n);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ht(n,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof re&&Xh(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function Xh({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=jt(this.lastLoginAt),this.creationTime=jt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function En(n){var A;const e=n.auth,t=await n.getIdToken(),s=await Ht(n,Tn(e,{idToken:t}));S(s==null?void 0:s.users.length,e,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const c=(A=r.providerUserInfo)!=null&&A.length?To(r.providerUserInfo):[],h=Zh(n.providerData,c),g=n.isAnonymous,w=!(n.email&&r.passwordHash)&&!(h!=null&&h.length),T=g?w:!1,b={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:h,metadata:new Ci(r.createdAt,r.lastLoginAt),isAnonymous:T};Object.assign(n,b)}async function Qh(n){const e=me(n);await En(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Zh(n,e){return[...n.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function To(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function el(n,e){const t=await Io(n,{},async()=>{const s=Wt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:c}=n.config,h=await vo(n,r,"/v1/token",`key=${c}`),g=await n._getAdditionalHeaders();g["Content-Type"]="application/x-www-form-urlencoded";const w={method:"POST",headers:g,body:s};return n.emulatorConfig&&kn(n.emulatorConfig.host)&&(w.credentials="include"),wo.fetch()(h,w)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function tl(n,e){return wt(n,"POST","/v2/accounts:revokeToken",Ui(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):dr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){S(e.length!==0,"internal-error");const t=dr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:r,expiresIn:c}=await el(e,t);this.updateTokensAndExpiration(s,r,Number(c))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:r,expirationTime:c}=t,h=new ut;return s&&(S(typeof s=="string","internal-error",{appName:e}),h.refreshToken=s),r&&(S(typeof r=="string","internal-error",{appName:e}),h.accessToken=r),c&&(S(typeof c=="number","internal-error",{appName:e}),h.expirationTime=c),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ut,this.toJSON())}_performRefresh(){return _e("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(n,e){S(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ne{constructor({uid:e,auth:t,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new Yh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Ci(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Ht(this,this.stsTokenManager.getToken(this.auth,e));return S(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Jh(this,e)}reload(){return Qh(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ne({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await En(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ue(this.auth.app))return Promise.reject(Xe(this.auth));const e=await this.getIdToken();return await Ht(this,Kh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,r=t.email??void 0,c=t.phoneNumber??void 0,h=t.photoURL??void 0,g=t.tenantId??void 0,w=t._redirectEventId??void 0,T=t.createdAt??void 0,b=t.lastLoginAt??void 0,{uid:A,emailVerified:P,isAnonymous:H,providerData:j,stsTokenManager:$}=t;S(A&&$,e,"internal-error");const x=ut.fromJSON(this.name,$);S(typeof A=="string",e,"internal-error"),Oe(s,e.name),Oe(r,e.name),S(typeof P=="boolean",e,"internal-error"),S(typeof H=="boolean",e,"internal-error"),Oe(c,e.name),Oe(h,e.name),Oe(g,e.name),Oe(w,e.name),Oe(T,e.name),Oe(b,e.name);const oe=new ne({uid:A,auth:e,email:r,emailVerified:P,displayName:s,isAnonymous:H,photoURL:h,phoneNumber:c,tenantId:g,stsTokenManager:x,createdAt:T,lastLoginAt:b});return j&&Array.isArray(j)&&(oe.providerData=j.map(Ee=>({...Ee}))),w&&(oe._redirectEventId=w),oe}static async _fromIdTokenResponse(e,t,s=!1){const r=new ut;r.updateFromServerResponse(t);const c=new ne({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await En(c),c}static async _fromGetAccountInfoResponse(e,t,s){const r=t.users[0];S(r.localId!==void 0,"internal-error");const c=r.providerUserInfo!==void 0?To(r.providerUserInfo):[],h=!(r.email&&r.passwordHash)&&!(c!=null&&c.length),g=new ut;g.updateFromIdToken(s);const w=new ne({uid:r.localId,auth:e,stsTokenManager:g,isAnonymous:h}),T={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:c,metadata:new Ci(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(c!=null&&c.length)};return Object.assign(w,T),w}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=new Map;function we(n){Te(n instanceof Function,"Expected a class definition");let e=fr.get(n);return e?(Te(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,fr.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Eo.type="NONE";const pr=Eo;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(n,e,t){return`firebase:${n}:${e}:${t}`}class dt{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:r,name:c}=this.auth;this.fullUserKey=gn(this.userKey,r.apiKey,c),this.fullPersistenceKey=gn("persistence",r.apiKey,c),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Tn(this.auth,{idToken:e}).catch(()=>{});return t?ne._fromGetAccountInfoResponse(this.auth,t,e):null}return ne._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new dt(we(pr),e,s);const r=(await Promise.all(t.map(async T=>{if(await T._isAvailable())return T}))).filter(T=>T);let c=r[0]||we(pr);const h=gn(s,e.config.apiKey,e.name);let g=null;for(const T of t)try{const b=await T._get(h);if(b){let A;if(typeof b=="string"){const P=await Tn(e,{idToken:b}).catch(()=>{});if(!P)break;A=await ne._fromGetAccountInfoResponse(e,P,b)}else A=ne._fromJSON(e,b);T!==c&&(g=A),c=T;break}}catch{}const w=r.filter(T=>T._shouldAllowMigration);return!c._shouldAllowMigration||!w.length?new dt(c,e,s):(c=w[0],g&&await c._set(h,g.toJSON()),await Promise.all(t.map(async T=>{if(T!==c)try{await T._remove(h)}catch{}})),new dt(c,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Co(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ao(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Po(e))return"Blackberry";if(ko(e))return"Webos";if(bo(e))return"Safari";if((e.includes("chrome/")||So(e))&&!e.includes("edge/"))return"Chrome";if(Ro(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Ao(n=J()){return/firefox\//i.test(n)}function bo(n=J()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function So(n=J()){return/crios\//i.test(n)}function Co(n=J()){return/iemobile/i.test(n)}function Ro(n=J()){return/android/i.test(n)}function Po(n=J()){return/blackberry/i.test(n)}function ko(n=J()){return/webos/i.test(n)}function Fi(n=J()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function nl(n=J()){var e;return Fi(n)&&!!((e=window.navigator)!=null&&e.standalone)}function il(){return _c()&&document.documentMode===10}function No(n=J()){return Fi(n)||Ro(n)||ko(n)||Po(n)||/windows phone/i.test(n)||Co(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oo(n,e=[]){let t;switch(n){case"Browser":t=gr(J());break;case"Worker":t=`${gr(J())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${_t}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=c=>new Promise((h,g)=>{try{const w=e(c);h(w)}catch(w){g(w)}});s.onAbort=t,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rl(n,e={}){return wt(n,"GET","/v2/passwordPolicy",Ui(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol=6;class al{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??ol,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,r,c){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(e,t,s,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new mr(this),this.idTokenSubscription=new mr(this),this.beforeStateQueue=new sl(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=yo,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(c=>this._resolvePersistenceManagerAvailable=c)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=we(t)),this._initializationPromise=this.queue(async()=>{var s,r,c;if(!this._deleted&&(this.persistenceManager=await dt.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((c=this.currentUser)==null?void 0:c.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Tn(this,{idToken:e}),s=await ne._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch{await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var c;if(ue(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(g=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(g,g))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(c=this.redirectUser)==null?void 0:c._redirectEventId,g=s==null?void 0:s._redirectEventId,w=await this.tryRedirectSignIn(e);(!h||h===g)&&(w!=null&&w.user)&&(s=w.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(h){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await En(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=$h()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ue(this.app))return Promise.reject(Xe(this));const t=e?me(e):null;return t&&S(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ue(this.app)?Promise.reject(Xe(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ue(this.app)?Promise.reject(Xe(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(we(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await rl(this),t=new al(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new it("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await tl(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&we(e)||this._popupRedirectResolver;S(t,this,"argument-error"),this.redirectPersistenceManager=await dt.create(this,[we(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,r){if(this._deleted)return()=>{};const c=typeof t=="function"?t:t.next.bind(t);let h=!1;const g=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(g,this,"internal-error"),g.then(()=>{h||c(this.currentUser)}),typeof t=="function"){const w=e.addObserver(t,s,r);return()=>{h=!0,w()}}else{const w=e.addObserver(t);return()=>{h=!0,w()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Oo(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(ue(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Fh(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Vi(n){return me(n)}class mr{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ac(t=>this.observer=t)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function hl(n){Bi=n}function ll(n){return Bi.loadJS(n)}function ul(){return Bi.gapiScript}function dl(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fl(n,e){const t=st(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),c=t.getOptions();if(Fe(c,e??{}))return r;ve(r,"already-initialized")}return t.initialize({options:e})}function pl(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(we);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function gl(n,e,t){const s=Vi(n);S(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,c=Do(e),{host:h,port:g}=ml(e),w=g===null?"":`:${g}`,T={url:`${c}//${h}${w}/`},b=Object.freeze({host:h,port:g,protocol:c.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){S(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),S(Fe(T,s.config.emulator)&&Fe(b,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=T,s.emulatorConfig=b,s.settings.appVerificationDisabledForTesting=!0,kn(h)?co(`${c}//${h}${w}`):yl()}function Do(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ml(n){const e=Do(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const c=r[1];return{host:c,port:yr(s.substr(c.length+1))}}else{const[c,h]=s.split(":");return{host:c,port:yr(h)}}}function yr(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function yl(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return _e("not implemented")}_getIdTokenResponse(e){return _e("not implemented")}_linkToIdToken(e,t){return _e("not implemented")}_getReauthenticationResolver(e){return _e("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ft(n,e){return Gh(n,"POST","/v1/accounts:signInWithIdp",Ui(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _l="http://localhost";class Ze extends Lo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ze(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ve("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...c}=t;if(!s||!r)return null;const h=new Ze(s,r);return h.idToken=c.idToken||void 0,h.accessToken=c.accessToken||void 0,h.secret=c.secret,h.nonce=c.nonce,h.pendingToken=c.pendingToken||null,h}_getIdTokenResponse(e){const t=this.buildRequest();return ft(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,ft(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ft(e,t)}buildRequest(){const e={requestUri:_l,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Wt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends Mo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De extends qt{constructor(){super("facebook.com")}static credential(e){return Ze._fromParams({providerId:De.PROVIDER_ID,signInMethod:De.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return De.credentialFromTaggedObject(e)}static credentialFromError(e){return De.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return De.credential(e.oauthAccessToken)}catch{return null}}}De.FACEBOOK_SIGN_IN_METHOD="facebook.com";De.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le extends qt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ze._fromParams({providerId:Le.PROVIDER_ID,signInMethod:Le.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Le.credentialFromTaggedObject(e)}static credentialFromError(e){return Le.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Le.credential(t,s)}catch{return null}}}Le.GOOGLE_SIGN_IN_METHOD="google.com";Le.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me extends qt{constructor(){super("github.com")}static credential(e){return Ze._fromParams({providerId:Me.PROVIDER_ID,signInMethod:Me.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Me.credentialFromTaggedObject(e)}static credentialFromError(e){return Me.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Me.credential(e.oauthAccessToken)}catch{return null}}}Me.GITHUB_SIGN_IN_METHOD="github.com";Me.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe extends qt{constructor(){super("twitter.com")}static credential(e,t){return Ze._fromParams({providerId:xe.PROVIDER_ID,signInMethod:xe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return xe.credentialFromTaggedObject(e)}static credentialFromError(e){return xe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return xe.credential(t,s)}catch{return null}}}xe.TWITTER_SIGN_IN_METHOD="twitter.com";xe.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,r=!1){const c=await ne._fromIdTokenResponse(e,s,r),h=_r(s);return new mt({user:c,providerId:h,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const r=_r(s);return new mt({user:e,providerId:r,_tokenResponse:s,operationType:t})}}function _r(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An extends re{constructor(e,t,s,r){super(t.code,t.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,An.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,r){return new An(e,t,s,r)}}function xo(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(c=>{throw c.code==="auth/multi-factor-auth-required"?An._fromErrorAndOperation(n,c,e,s):c})}async function wl(n,e,t=!1){const s=await Ht(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return mt._forOperation(n,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Il(n,e,t=!1){const{auth:s}=n;if(ue(s.app))return Promise.reject(Xe(s));const r="reauthenticate";try{const c=await Ht(n,xo(s,r,e,n),t);S(c.idToken,s,"internal-error");const h=ji(c.idToken);S(h,s,"internal-error");const{sub:g}=h;return S(n.uid===g,s,"user-mismatch"),mt._forOperation(n,r,c)}catch(c){throw(c==null?void 0:c.code)==="auth/user-not-found"&&ve(s,"user-mismatch"),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vl(n,e,t=!1){if(ue(n.app))return Promise.reject(Xe(n));const s="signIn",r=await xo(n,s,e),c=await mt._fromIdTokenResponse(n,s,r);return t||await n._updateCurrentUser(c.user),c}function Tl(n,e,t,s){return me(n).onIdTokenChanged(e,t,s)}function El(n,e,t){return me(n).beforeAuthStateChanged(e,t)}const bn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(bn,"1"),this.storage.removeItem(bn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al=1e3,bl=10;class jo extends Uo{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=No(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),r=this.localCache[t];s!==r&&e(t,r,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((h,g,w)=>{this.notifyListeners(h,w)});return}const s=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const h=this.storage.getItem(s);!t&&this.localCache[s]===h||this.notifyListeners(s,h)},c=this.storage.getItem(s);il()&&c!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,bl):r()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},Al)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}jo.type="LOCAL";const Sl=jo;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo extends Uo{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Fo.type="SESSION";const Vo=Fo;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const s=new On(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:r,data:c}=t.data,h=this.handlersMap[r];if(!(h!=null&&h.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const g=Array.from(h).map(async T=>T(t.origin,c)),w=await Cl(g);t.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:w})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}On.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $i(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let c,h;return new Promise((g,w)=>{const T=$i("",20);r.port1.start();const b=setTimeout(()=>{w(new Error("unsupported_event"))},s);h={messageChannel:r,onMessage(A){const P=A;if(P.data.eventId===T)switch(P.data.status){case"ack":clearTimeout(b),c=setTimeout(()=>{w(new Error("timeout"))},3e3);break;case"done":clearTimeout(c),g(P.data.response);break;default:clearTimeout(b),clearTimeout(c),w(new Error("invalid_response"));break}}},this.handlers.add(h),r.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:T,data:t},[r.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(){return window}function Pl(n){pe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(){return typeof pe().WorkerGlobalScope<"u"&&typeof pe().importScripts=="function"}async function kl(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Nl(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Ol(){return Bo()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $o="firebaseLocalStorageDb",Dl=1,Sn="firebaseLocalStorage",Ho="fbase_key";class Kt{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Dn(n,e){return n.transaction([Sn],e?"readwrite":"readonly").objectStore(Sn)}function Ll(){const n=indexedDB.deleteDatabase($o);return new Kt(n).toPromise()}function Ri(){const n=indexedDB.open($o,Dl);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(Sn,{keyPath:Ho})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(Sn)?e(s):(s.close(),await Ll(),e(await Ri()))})})}async function wr(n,e,t){const s=Dn(n,!0).put({[Ho]:e,value:t});return new Kt(s).toPromise()}async function Ml(n,e){const t=Dn(n,!1).get(e),s=await new Kt(t).toPromise();return s===void 0?null:s.value}function Ir(n,e){const t=Dn(n,!0).delete(e);return new Kt(t).toPromise()}const xl=800,Ul=3;class zo{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ri(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>Ul)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Bo()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=On._getInstance(Ol()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await kl(),!this.activeServiceWorker)return;this.sender=new Rl(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Nl()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ri();return await wr(e,bn,"1"),await Ir(e,bn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>wr(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>Ml(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ir(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const c=Dn(r,!1).getAll();return new Kt(c).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:c}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(c)&&(this.notifyListeners(r,c),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),xl)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}zo.type="LOCAL";const jl=zo;new Gt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fl(n,e){return e?we(e):(S(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi extends Lo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ft(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ft(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ft(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Vl(n){return vl(n.auth,new Hi(n),n.bypassAuthState)}function Bl(n){const{auth:e,user:t}=n;return S(t,e,"internal-error"),Il(t,new Hi(n),n.bypassAuthState)}async function $l(n){const{auth:e,user:t}=n;return S(t,e,"internal-error"),wl(t,new Hi(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(e,t,s,r,c=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=c,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:r,tenantId:c,error:h,type:g}=e;if(h){this.reject(h);return}const w={auth:this.auth,requestUri:t,sessionId:s,tenantId:c||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(g)(w))}catch(T){this.reject(T)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Vl;case"linkViaPopup":case"linkViaRedirect":return $l;case"reauthViaPopup":case"reauthViaRedirect":return Bl;default:ve(this.auth,"internal-error")}}resolve(e){Te(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Te(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl=new Gt(2e3,1e4);class lt extends Wo{constructor(e,t,s,r,c){super(e,t,r,c),this.provider=s,this.authWindow=null,this.pollId=null,lt.currentPopupAction&&lt.currentPopupAction.cancel(),lt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){Te(this.filter.length===1,"Popup operations only handle one event");const e=$i();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(fe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(fe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,lt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(fe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Hl.get())};e()}}lt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zl="pendingRedirect",mn=new Map;class Wl extends Wo{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=mn.get(this.auth._key());if(!e){try{const s=await Gl(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}mn.set(this.auth._key(),e)}return this.bypassAuthState||mn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Gl(n,e){const t=Jl(e),s=Kl(n);if(!await s._isAvailable())return!1;const r=await s._get(t)==="true";return await s._remove(t),r}function ql(n,e){mn.set(n._key(),e)}function Kl(n){return we(n._redirectPersistence)}function Jl(n){return gn(zl,n.config.apiKey,n.name)}async function Xl(n,e,t=!1){if(ue(n.app))return Promise.reject(Xe(n));const s=Vi(n),r=Fl(s,e),h=await new Wl(s,r,t).execute();return h&&!t&&(delete h.user._redirectEventId,await s._persistUserIfCurrent(h.user),await s._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl=10*60*1e3;class Ql{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Zl(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!Go(e)){const r=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(fe(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Yl&&this.cachedEventUids.clear(),this.cachedEventUids.has(vr(e))}saveEventToCache(e){this.cachedEventUids.add(vr(e)),this.lastProcessedEventTime=Date.now()}}function vr(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Go({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Zl(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Go(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eu(n,e={}){return wt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,nu=/^https?/;async function iu(n){if(n.config.emulator)return;const{authorizedDomains:e}=await eu(n);for(const t of e)try{if(su(t))return}catch{}ve(n,"unauthorized-domain")}function su(n){const e=Si(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const h=new URL(n);return h.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&h.hostname===s}if(!nu.test(t))return!1;if(tu.test(n))return s===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru=new Gt(3e4,6e4);function Tr(){const n=pe().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ou(n){return new Promise((e,t)=>{var r,c,h;function s(){Tr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Tr(),t(fe(n,"network-request-failed"))},timeout:ru.get()})}if((c=(r=pe().gapi)==null?void 0:r.iframes)!=null&&c.Iframe)e(gapi.iframes.getContext());else if((h=pe().gapi)!=null&&h.load)s();else{const g=dl("iframefcb");return pe()[g]=()=>{gapi.load?s():t(fe(n,"network-request-failed"))},ll(`${ul()}?onload=${g}`).catch(w=>t(w))}}).catch(e=>{throw yn=null,e})}let yn=null;function au(n){return yn=yn||ou(n),yn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu=new Gt(5e3,15e3),hu="__/auth/iframe",lu="emulator/auth/iframe",uu={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},du=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function fu(n){const e=n.config;S(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?xi(e,lu):`https://${n.config.authDomain}/${hu}`,s={apiKey:e.apiKey,appName:n.name,v:_t},r=du.get(n.config.apiHost);r&&(s.eid=r);const c=n._getFrameworks();return c.length&&(s.fw=c.join(",")),`${t}?${Wt(s).slice(1)}`}async function pu(n){const e=await au(n),t=pe().gapi;return S(t,n,"internal-error"),e.open({where:document.body,url:fu(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:uu,dontclear:!0},s=>new Promise(async(r,c)=>{await s.restyle({setHideOnLeave:!1});const h=fe(n,"network-request-failed"),g=pe().setTimeout(()=>{c(h)},cu.get());function w(){pe().clearTimeout(g),r(s)}s.ping(w).then(w,()=>{c(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},mu=500,yu=600,_u="_blank",wu="http://localhost";class Er{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Iu(n,e,t,s=mu,r=yu){const c=Math.max((window.screen.availHeight-r)/2,0).toString(),h=Math.max((window.screen.availWidth-s)/2,0).toString();let g="";const w={...gu,width:s.toString(),height:r.toString(),top:c,left:h},T=J().toLowerCase();t&&(g=So(T)?_u:t),Ao(T)&&(e=e||wu,w.scrollbars="yes");const b=Object.entries(w).reduce((P,[H,j])=>`${P}${H}=${j},`,"");if(nl(T)&&g!=="_self")return vu(e||"",g),new Er(null);const A=window.open(e||"",g,b);S(A,n,"popup-blocked");try{A.focus()}catch{}return new Er(A)}function vu(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tu="__/auth/handler",Eu="emulator/auth/handler",Au=encodeURIComponent("fac");async function Ar(n,e,t,s,r,c){S(n.config.authDomain,n,"auth-domain-config-required"),S(n.config.apiKey,n,"invalid-api-key");const h={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:_t,eventId:r};if(e instanceof Mo){e.setDefaultLanguage(n.languageCode),h.providerId=e.providerId||"",Ec(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[b,A]of Object.entries({}))h[b]=A}if(e instanceof qt){const b=e.getScopes().filter(A=>A!=="");b.length>0&&(h.scopes=b.join(","))}n.tenantId&&(h.tid=n.tenantId);const g=h;for(const b of Object.keys(g))g[b]===void 0&&delete g[b];const w=await n._getAppCheckToken(),T=w?`#${Au}=${encodeURIComponent(w)}`:"";return`${bu(n)}?${Wt(g).slice(1)}${T}`}function bu({config:n}){return n.emulator?xi(n,Eu):`https://${n.authDomain}/${Tu}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi="webStorageSupport";class Su{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Vo,this._completeRedirectFn=Xl,this._overrideRedirectResult=ql}async _openPopup(e,t,s,r){var h;Te((h=this.eventManagers[e._key()])==null?void 0:h.manager,"_initialize() not called before _openPopup()");const c=await Ar(e,t,s,Si(),r);return Iu(e,c,$i())}async _openRedirect(e,t,s,r){await this._originValidation(e);const c=await Ar(e,t,s,Si(),r);return Pl(c),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:c}=this.eventManagers[t];return r?Promise.resolve(r):(Te(c,"If manager is not set, promise should be"),c)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await pu(e),s=new Ql(e);return t.register("authEvent",r=>(S(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(gi,{type:gi},r=>{var h;const c=(h=r==null?void 0:r[0])==null?void 0:h[gi];c!==void 0&&t(!!c),ve(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=iu(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return No()||bo()||Fi()}}const Cu=Su;var br="@firebase/auth",Sr="1.13.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pu(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ku(n){ge(new se("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),c=e.getProvider("app-check-internal"),{apiKey:h,authDomain:g}=s.options;S(h&&!h.includes(":"),"invalid-api-key",{appName:s.name});const w={apiKey:h,authDomain:g,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Oo(n)},T=new cl(s,r,c,w);return pl(T,t),T},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),ge(new se("auth-internal",e=>{const t=Vi(e.getProvider("auth").getImmediate());return(s=>new Ru(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ee(br,Sr,Pu(n)),ee(br,Sr,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nu=5*60,Ou=so("authIdTokenMaxAge")||Nu;let Cr=null;const Du=n=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>Ou)return;const r=t==null?void 0:t.token;Cr!==r&&(Cr=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Lu(n=Li()){const e=st(n,"auth");if(e.isInitialized())return e.getImmediate();const t=fl(n,{popupRedirectResolver:Cu,persistence:[jl,Sl,Vo]}),s=so("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const c=new URL(s,location.origin);if(location.origin===c.origin){const h=Du(c.toString());El(t,h,()=>h(t.currentUser)),Tl(t,g=>h(g))}}const r=no("auth");return r&&gl(t,`http://${r}`),t}function Mu(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}hl({loadJS(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=r=>{const c=fe("internal-error");c.customData=r,t(c)},s.type="text/javascript",s.charset="UTF-8",Mu().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ku("Browser");var xu="firebase",Uu="12.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ee(xu,Uu,"app");var Rr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zi;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(m,u){function f(){}f.prototype=u.prototype,m.F=u.prototype,m.prototype=new f,m.prototype.constructor=m,m.D=function(y,p,I){for(var d=Array(arguments.length-2),X=2;X<arguments.length;X++)d[X-2]=arguments[X];return u.prototype[p].apply(y,d)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,t),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(m,u,f){f||(f=0);const y=Array(16);if(typeof u=="string")for(var p=0;p<16;++p)y[p]=u.charCodeAt(f++)|u.charCodeAt(f++)<<8|u.charCodeAt(f++)<<16|u.charCodeAt(f++)<<24;else for(p=0;p<16;++p)y[p]=u[f++]|u[f++]<<8|u[f++]<<16|u[f++]<<24;u=m.g[0],f=m.g[1],p=m.g[2];let I=m.g[3],d;d=u+(I^f&(p^I))+y[0]+3614090360&4294967295,u=f+(d<<7&4294967295|d>>>25),d=I+(p^u&(f^p))+y[1]+3905402710&4294967295,I=u+(d<<12&4294967295|d>>>20),d=p+(f^I&(u^f))+y[2]+606105819&4294967295,p=I+(d<<17&4294967295|d>>>15),d=f+(u^p&(I^u))+y[3]+3250441966&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(I^f&(p^I))+y[4]+4118548399&4294967295,u=f+(d<<7&4294967295|d>>>25),d=I+(p^u&(f^p))+y[5]+1200080426&4294967295,I=u+(d<<12&4294967295|d>>>20),d=p+(f^I&(u^f))+y[6]+2821735955&4294967295,p=I+(d<<17&4294967295|d>>>15),d=f+(u^p&(I^u))+y[7]+4249261313&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(I^f&(p^I))+y[8]+1770035416&4294967295,u=f+(d<<7&4294967295|d>>>25),d=I+(p^u&(f^p))+y[9]+2336552879&4294967295,I=u+(d<<12&4294967295|d>>>20),d=p+(f^I&(u^f))+y[10]+4294925233&4294967295,p=I+(d<<17&4294967295|d>>>15),d=f+(u^p&(I^u))+y[11]+2304563134&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(I^f&(p^I))+y[12]+1804603682&4294967295,u=f+(d<<7&4294967295|d>>>25),d=I+(p^u&(f^p))+y[13]+4254626195&4294967295,I=u+(d<<12&4294967295|d>>>20),d=p+(f^I&(u^f))+y[14]+2792965006&4294967295,p=I+(d<<17&4294967295|d>>>15),d=f+(u^p&(I^u))+y[15]+1236535329&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(p^I&(f^p))+y[1]+4129170786&4294967295,u=f+(d<<5&4294967295|d>>>27),d=I+(f^p&(u^f))+y[6]+3225465664&4294967295,I=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(I^u))+y[11]+643717713&4294967295,p=I+(d<<14&4294967295|d>>>18),d=f+(I^u&(p^I))+y[0]+3921069994&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(p^I&(f^p))+y[5]+3593408605&4294967295,u=f+(d<<5&4294967295|d>>>27),d=I+(f^p&(u^f))+y[10]+38016083&4294967295,I=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(I^u))+y[15]+3634488961&4294967295,p=I+(d<<14&4294967295|d>>>18),d=f+(I^u&(p^I))+y[4]+3889429448&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(p^I&(f^p))+y[9]+568446438&4294967295,u=f+(d<<5&4294967295|d>>>27),d=I+(f^p&(u^f))+y[14]+3275163606&4294967295,I=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(I^u))+y[3]+4107603335&4294967295,p=I+(d<<14&4294967295|d>>>18),d=f+(I^u&(p^I))+y[8]+1163531501&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(p^I&(f^p))+y[13]+2850285829&4294967295,u=f+(d<<5&4294967295|d>>>27),d=I+(f^p&(u^f))+y[2]+4243563512&4294967295,I=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(I^u))+y[7]+1735328473&4294967295,p=I+(d<<14&4294967295|d>>>18),d=f+(I^u&(p^I))+y[12]+2368359562&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(f^p^I)+y[5]+4294588738&4294967295,u=f+(d<<4&4294967295|d>>>28),d=I+(u^f^p)+y[8]+2272392833&4294967295,I=u+(d<<11&4294967295|d>>>21),d=p+(I^u^f)+y[11]+1839030562&4294967295,p=I+(d<<16&4294967295|d>>>16),d=f+(p^I^u)+y[14]+4259657740&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(f^p^I)+y[1]+2763975236&4294967295,u=f+(d<<4&4294967295|d>>>28),d=I+(u^f^p)+y[4]+1272893353&4294967295,I=u+(d<<11&4294967295|d>>>21),d=p+(I^u^f)+y[7]+4139469664&4294967295,p=I+(d<<16&4294967295|d>>>16),d=f+(p^I^u)+y[10]+3200236656&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(f^p^I)+y[13]+681279174&4294967295,u=f+(d<<4&4294967295|d>>>28),d=I+(u^f^p)+y[0]+3936430074&4294967295,I=u+(d<<11&4294967295|d>>>21),d=p+(I^u^f)+y[3]+3572445317&4294967295,p=I+(d<<16&4294967295|d>>>16),d=f+(p^I^u)+y[6]+76029189&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(f^p^I)+y[9]+3654602809&4294967295,u=f+(d<<4&4294967295|d>>>28),d=I+(u^f^p)+y[12]+3873151461&4294967295,I=u+(d<<11&4294967295|d>>>21),d=p+(I^u^f)+y[15]+530742520&4294967295,p=I+(d<<16&4294967295|d>>>16),d=f+(p^I^u)+y[2]+3299628645&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(p^(f|~I))+y[0]+4096336452&4294967295,u=f+(d<<6&4294967295|d>>>26),d=I+(f^(u|~p))+y[7]+1126891415&4294967295,I=u+(d<<10&4294967295|d>>>22),d=p+(u^(I|~f))+y[14]+2878612391&4294967295,p=I+(d<<15&4294967295|d>>>17),d=f+(I^(p|~u))+y[5]+4237533241&4294967295,f=p+(d<<21&4294967295|d>>>11),d=u+(p^(f|~I))+y[12]+1700485571&4294967295,u=f+(d<<6&4294967295|d>>>26),d=I+(f^(u|~p))+y[3]+2399980690&4294967295,I=u+(d<<10&4294967295|d>>>22),d=p+(u^(I|~f))+y[10]+4293915773&4294967295,p=I+(d<<15&4294967295|d>>>17),d=f+(I^(p|~u))+y[1]+2240044497&4294967295,f=p+(d<<21&4294967295|d>>>11),d=u+(p^(f|~I))+y[8]+1873313359&4294967295,u=f+(d<<6&4294967295|d>>>26),d=I+(f^(u|~p))+y[15]+4264355552&4294967295,I=u+(d<<10&4294967295|d>>>22),d=p+(u^(I|~f))+y[6]+2734768916&4294967295,p=I+(d<<15&4294967295|d>>>17),d=f+(I^(p|~u))+y[13]+1309151649&4294967295,f=p+(d<<21&4294967295|d>>>11),d=u+(p^(f|~I))+y[4]+4149444226&4294967295,u=f+(d<<6&4294967295|d>>>26),d=I+(f^(u|~p))+y[11]+3174756917&4294967295,I=u+(d<<10&4294967295|d>>>22),d=p+(u^(I|~f))+y[2]+718787259&4294967295,p=I+(d<<15&4294967295|d>>>17),d=f+(I^(p|~u))+y[9]+3951481745&4294967295,m.g[0]=m.g[0]+u&4294967295,m.g[1]=m.g[1]+(p+(d<<21&4294967295|d>>>11))&4294967295,m.g[2]=m.g[2]+p&4294967295,m.g[3]=m.g[3]+I&4294967295}s.prototype.v=function(m,u){u===void 0&&(u=m.length);const f=u-this.blockSize,y=this.C;let p=this.h,I=0;for(;I<u;){if(p==0)for(;I<=f;)r(this,m,I),I+=this.blockSize;if(typeof m=="string"){for(;I<u;)if(y[p++]=m.charCodeAt(I++),p==this.blockSize){r(this,y),p=0;break}}else for(;I<u;)if(y[p++]=m[I++],p==this.blockSize){r(this,y),p=0;break}}this.h=p,this.o+=u},s.prototype.A=function(){var m=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);m[0]=128;for(var u=1;u<m.length-8;++u)m[u]=0;u=this.o*8;for(var f=m.length-8;f<m.length;++f)m[f]=u&255,u/=256;for(this.v(m),m=Array(16),u=0,f=0;f<4;++f)for(let y=0;y<32;y+=8)m[u++]=this.g[f]>>>y&255;return m};function c(m,u){var f=g;return Object.prototype.hasOwnProperty.call(f,m)?f[m]:f[m]=u(m)}function h(m,u){this.h=u;const f=[];let y=!0;for(let p=m.length-1;p>=0;p--){const I=m[p]|0;y&&I==u||(f[p]=I,y=!1)}this.g=f}var g={};function w(m){return-128<=m&&m<128?c(m,function(u){return new h([u|0],u<0?-1:0)}):new h([m|0],m<0?-1:0)}function T(m){if(isNaN(m)||!isFinite(m))return A;if(m<0)return x(T(-m));const u=[];let f=1;for(let y=0;m>=f;y++)u[y]=m/f|0,f*=4294967296;return new h(u,0)}function b(m,u){if(m.length==0)throw Error("number format error: empty string");if(u=u||10,u<2||36<u)throw Error("radix out of range: "+u);if(m.charAt(0)=="-")return x(b(m.substring(1),u));if(m.indexOf("-")>=0)throw Error('number format error: interior "-" character');const f=T(Math.pow(u,8));let y=A;for(let I=0;I<m.length;I+=8){var p=Math.min(8,m.length-I);const d=parseInt(m.substring(I,I+p),u);p<8?(p=T(Math.pow(u,p)),y=y.j(p).add(T(d))):(y=y.j(f),y=y.add(T(d)))}return y}var A=w(0),P=w(1),H=w(16777216);n=h.prototype,n.m=function(){if($(this))return-x(this).m();let m=0,u=1;for(let f=0;f<this.g.length;f++){const y=this.i(f);m+=(y>=0?y:4294967296+y)*u,u*=4294967296}return m},n.toString=function(m){if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(j(this))return"0";if($(this))return"-"+x(this).toString(m);const u=T(Math.pow(m,6));var f=this;let y="";for(;;){const p=rt(f,u).g;f=oe(f,p.j(u));let I=((f.g.length>0?f.g[0]:f.h)>>>0).toString(m);if(f=p,j(f))return I+y;for(;I.length<6;)I="0"+I;y=I+y}},n.i=function(m){return m<0?0:m<this.g.length?this.g[m]:this.h};function j(m){if(m.h!=0)return!1;for(let u=0;u<m.g.length;u++)if(m.g[u]!=0)return!1;return!0}function $(m){return m.h==-1}n.l=function(m){return m=oe(this,m),$(m)?-1:j(m)?0:1};function x(m){const u=m.g.length,f=[];for(let y=0;y<u;y++)f[y]=~m.g[y];return new h(f,~m.h).add(P)}n.abs=function(){return $(this)?x(this):this},n.add=function(m){const u=Math.max(this.g.length,m.g.length),f=[];let y=0;for(let p=0;p<=u;p++){let I=y+(this.i(p)&65535)+(m.i(p)&65535),d=(I>>>16)+(this.i(p)>>>16)+(m.i(p)>>>16);y=d>>>16,I&=65535,d&=65535,f[p]=d<<16|I}return new h(f,f[f.length-1]&-2147483648?-1:0)};function oe(m,u){return m.add(x(u))}n.j=function(m){if(j(this)||j(m))return A;if($(this))return $(m)?x(this).j(x(m)):x(x(this).j(m));if($(m))return x(this.j(x(m)));if(this.l(H)<0&&m.l(H)<0)return T(this.m()*m.m());const u=this.g.length+m.g.length,f=[];for(var y=0;y<2*u;y++)f[y]=0;for(y=0;y<this.g.length;y++)for(let p=0;p<m.g.length;p++){const I=this.i(y)>>>16,d=this.i(y)&65535,X=m.i(p)>>>16,Be=m.i(p)&65535;f[2*y+2*p]+=d*Be,Ee(f,2*y+2*p),f[2*y+2*p+1]+=I*Be,Ee(f,2*y+2*p+1),f[2*y+2*p+1]+=d*X,Ee(f,2*y+2*p+1),f[2*y+2*p+2]+=I*X,Ee(f,2*y+2*p+2)}for(m=0;m<u;m++)f[m]=f[2*m+1]<<16|f[2*m];for(m=u;m<2*u;m++)f[m]=0;return new h(f,0)};function Ee(m,u){for(;(m[u]&65535)!=m[u];)m[u+1]+=m[u]>>>16,m[u]&=65535,u++}function Ae(m,u){this.g=m,this.h=u}function rt(m,u){if(j(u))throw Error("division by zero");if(j(m))return new Ae(A,A);if($(m))return u=rt(x(m),u),new Ae(x(u.g),x(u.h));if($(u))return u=rt(m,x(u)),new Ae(x(u.g),u.h);if(m.g.length>30){if($(m)||$(u))throw Error("slowDivide_ only works with positive integers.");for(var f=P,y=u;y.l(m)<=0;)f=be(f),y=be(y);var p=Q(f,1),I=Q(y,1);for(y=Q(y,2),f=Q(f,2);!j(y);){var d=I.add(y);d.l(m)<=0&&(p=p.add(f),I=d),y=Q(y,1),f=Q(f,1)}return u=oe(m,p.j(u)),new Ae(p,u)}for(p=A;m.l(u)>=0;){for(f=Math.max(1,Math.floor(m.m()/u.m())),y=Math.ceil(Math.log(f)/Math.LN2),y=y<=48?1:Math.pow(2,y-48),I=T(f),d=I.j(u);$(d)||d.l(m)>0;)f-=y,I=T(f),d=I.j(u);j(I)&&(I=P),p=p.add(I),m=oe(m,d)}return new Ae(p,m)}n.B=function(m){return rt(this,m).h},n.and=function(m){const u=Math.max(this.g.length,m.g.length),f=[];for(let y=0;y<u;y++)f[y]=this.i(y)&m.i(y);return new h(f,this.h&m.h)},n.or=function(m){const u=Math.max(this.g.length,m.g.length),f=[];for(let y=0;y<u;y++)f[y]=this.i(y)|m.i(y);return new h(f,this.h|m.h)},n.xor=function(m){const u=Math.max(this.g.length,m.g.length),f=[];for(let y=0;y<u;y++)f[y]=this.i(y)^m.i(y);return new h(f,this.h^m.h)};function be(m){const u=m.g.length+1,f=[];for(let y=0;y<u;y++)f[y]=m.i(y)<<1|m.i(y-1)>>>31;return new h(f,m.h)}function Q(m,u){const f=u>>5;u%=32;const y=m.g.length-f,p=[];for(let I=0;I<y;I++)p[I]=u>0?m.i(I+f)>>>u|m.i(I+f+1)<<32-u:m.i(I+f);return new h(p,m.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.B,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=T,h.fromString=b,zi=h}).apply(typeof Rr<"u"?Rr:typeof self<"u"?self:typeof window<"u"?window:{});var un=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var n,e=Object.defineProperty;function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof un=="object"&&un];for(var o=0;o<i.length;++o){var a=i[o];if(a&&a.Math==Math)return a}throw Error("Cannot find global object")}var s=t(this);function r(i,o){if(o)e:{var a=s;i=i.split(".");for(var l=0;l<i.length-1;l++){var _=i[l];if(!(_ in a))break e;a=a[_]}i=i[i.length-1],l=a[i],o=o(l),o!=l&&o!=null&&e(a,i,{configurable:!0,writable:!0,value:o})}}r("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(i){return i||function(o){var a=[],l;for(l in o)Object.prototype.hasOwnProperty.call(o,l)&&a.push([l,o[l]]);return a}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var c=c||{},h=this||self;function g(i){var o=typeof i;return o=="object"&&i!=null||o=="function"}function w(i,o,a){return i.call.apply(i.bind,arguments)}function T(i,o,a){return T=w,T.apply(null,arguments)}function b(i,o){var a=Array.prototype.slice.call(arguments,1);return function(){var l=a.slice();return l.push.apply(l,arguments),i.apply(this,l)}}function A(i,o){function a(){}a.prototype=o.prototype,i.Z=o.prototype,i.prototype=new a,i.prototype.constructor=i,i.Ob=function(l,_,v){for(var E=Array(arguments.length-2),C=2;C<arguments.length;C++)E[C-2]=arguments[C];return o.prototype[_].apply(l,E)}}var P=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function H(i){const o=i.length;if(o>0){const a=Array(o);for(let l=0;l<o;l++)a[l]=i[l];return a}return[]}function j(i,o){for(let l=1;l<arguments.length;l++){const _=arguments[l];var a=typeof _;if(a=a!="object"?a:_?Array.isArray(_)?"array":a:"null",a=="array"||a=="object"&&typeof _.length=="number"){a=i.length||0;const v=_.length||0;i.length=a+v;for(let E=0;E<v;E++)i[a+E]=_[E]}else i.push(_)}}class ${constructor(o,a){this.i=o,this.j=a,this.h=0,this.g=null}get(){let o;return this.h>0?(this.h--,o=this.g,this.g=o.next,o.next=null):o=this.i(),o}}function x(i){h.setTimeout(()=>{throw i},0)}function oe(){var i=m;let o=null;return i.g&&(o=i.g,i.g=i.g.next,i.g||(i.h=null),o.next=null),o}class Ee{constructor(){this.h=this.g=null}add(o,a){const l=Ae.get();l.set(o,a),this.h?this.h.next=l:this.g=l,this.h=l}}var Ae=new $(()=>new rt,i=>i.reset());class rt{constructor(){this.next=this.g=this.h=null}set(o,a){this.h=o,this.g=a,this.next=null}reset(){this.next=this.g=this.h=null}}let be,Q=!1,m=new Ee,u=()=>{const i=Promise.resolve(void 0);be=()=>{i.then(f)}};function f(){for(var i;i=oe();){try{i.h.call(i.g)}catch(a){x(a)}var o=Ae;o.j(i),o.h<100&&(o.h++,i.next=o.g,o.g=i)}Q=!1}function y(){this.u=this.u,this.C=this.C}y.prototype.u=!1,y.prototype.dispose=function(){this.u||(this.u=!0,this.N())},y.prototype[Symbol.dispose]=function(){this.dispose()},y.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function p(i,o){this.type=i,this.g=this.target=o,this.defaultPrevented=!1}p.prototype.h=function(){this.defaultPrevented=!0};var I=function(){if(!h.addEventListener||!Object.defineProperty)return!1;var i=!1,o=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const a=()=>{};h.addEventListener("test",a,o),h.removeEventListener("test",a,o)}catch{}return i}();function d(i){return/^[\s\xa0]*$/.test(i)}function X(i,o){p.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,o)}A(X,p),X.prototype.init=function(i,o){const a=this.type=i.type,l=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=o,o=i.relatedTarget,o||(a=="mouseover"?o=i.fromElement:a=="mouseout"&&(o=i.toElement)),this.relatedTarget=o,l?(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&X.Z.h.call(this)},X.prototype.h=function(){X.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Be="closure_listenable_"+(Math.random()*1e6|0),Ta=0;function Ea(i,o,a,l,_){this.listener=i,this.proxy=null,this.src=o,this.type=a,this.capture=!!l,this.ha=_,this.key=++Ta,this.da=this.fa=!1}function Yt(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Qt(i,o,a){for(const l in i)o.call(a,i[l],l,i)}function Aa(i,o){for(const a in i)o.call(void 0,i[a],a,i)}function ts(i){const o={};for(const a in i)o[a]=i[a];return o}const ns="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function is(i,o){let a,l;for(let _=1;_<arguments.length;_++){l=arguments[_];for(a in l)i[a]=l[a];for(let v=0;v<ns.length;v++)a=ns[v],Object.prototype.hasOwnProperty.call(l,a)&&(i[a]=l[a])}}function Zt(i){this.src=i,this.g={},this.h=0}Zt.prototype.add=function(i,o,a,l,_){const v=i.toString();i=this.g[v],i||(i=this.g[v]=[],this.h++);const E=Un(i,o,l,_);return E>-1?(o=i[E],a||(o.fa=!1)):(o=new Ea(o,this.src,v,!!l,_),o.fa=a,i.push(o)),o};function xn(i,o){const a=o.type;if(a in i.g){var l=i.g[a],_=Array.prototype.indexOf.call(l,o,void 0),v;(v=_>=0)&&Array.prototype.splice.call(l,_,1),v&&(Yt(o),i.g[a].length==0&&(delete i.g[a],i.h--))}}function Un(i,o,a,l){for(let _=0;_<i.length;++_){const v=i[_];if(!v.da&&v.listener==o&&v.capture==!!a&&v.ha==l)return _}return-1}var jn="closure_lm_"+(Math.random()*1e6|0),Fn={};function ss(i,o,a,l,_){if(Array.isArray(o)){for(let v=0;v<o.length;v++)ss(i,o[v],a,l,_);return null}return a=as(a),i&&i[Be]?i.J(o,a,g(l)?!!l.capture:!1,_):ba(i,o,a,!1,l,_)}function ba(i,o,a,l,_,v){if(!o)throw Error("Invalid event type");const E=g(_)?!!_.capture:!!_;let C=Bn(i);if(C||(i[jn]=C=new Zt(i)),a=C.add(o,a,l,E,v),a.proxy)return a;if(l=Sa(),a.proxy=l,l.src=i,l.listener=a,i.addEventListener)I||(_=E),_===void 0&&(_=!1),i.addEventListener(o.toString(),l,_);else if(i.attachEvent)i.attachEvent(os(o.toString()),l);else if(i.addListener&&i.removeListener)i.addListener(l);else throw Error("addEventListener and attachEvent are unavailable.");return a}function Sa(){function i(a){return o.call(i.src,i.listener,a)}const o=Ca;return i}function rs(i,o,a,l,_){if(Array.isArray(o))for(var v=0;v<o.length;v++)rs(i,o[v],a,l,_);else l=g(l)?!!l.capture:!!l,a=as(a),i&&i[Be]?(i=i.i,v=String(o).toString(),v in i.g&&(o=i.g[v],a=Un(o,a,l,_),a>-1&&(Yt(o[a]),Array.prototype.splice.call(o,a,1),o.length==0&&(delete i.g[v],i.h--)))):i&&(i=Bn(i))&&(o=i.g[o.toString()],i=-1,o&&(i=Un(o,a,l,_)),(a=i>-1?o[i]:null)&&Vn(a))}function Vn(i){if(typeof i!="number"&&i&&!i.da){var o=i.src;if(o&&o[Be])xn(o.i,i);else{var a=i.type,l=i.proxy;o.removeEventListener?o.removeEventListener(a,l,i.capture):o.detachEvent?o.detachEvent(os(a),l):o.addListener&&o.removeListener&&o.removeListener(l),(a=Bn(o))?(xn(a,i),a.h==0&&(a.src=null,o[jn]=null)):Yt(i)}}}function os(i){return i in Fn?Fn[i]:Fn[i]="on"+i}function Ca(i,o){if(i.da)i=!0;else{o=new X(o,this);const a=i.listener,l=i.ha||i.src;i.fa&&Vn(i),i=a.call(l,o)}return i}function Bn(i){return i=i[jn],i instanceof Zt?i:null}var $n="__closure_events_fn_"+(Math.random()*1e9>>>0);function as(i){return typeof i=="function"?i:(i[$n]||(i[$n]=function(o){return i.handleEvent(o)}),i[$n])}function z(){y.call(this),this.i=new Zt(this),this.M=this,this.G=null}A(z,y),z.prototype[Be]=!0,z.prototype.removeEventListener=function(i,o,a,l){rs(this,i,o,a,l)};function W(i,o){var a,l=i.G;if(l)for(a=[];l;l=l.G)a.push(l);if(i=i.M,l=o.type||o,typeof o=="string")o=new p(o,i);else if(o instanceof p)o.target=o.target||i;else{var _=o;o=new p(l,i),is(o,_)}_=!0;let v,E;if(a)for(E=a.length-1;E>=0;E--)v=o.g=a[E],_=en(v,l,!0,o)&&_;if(v=o.g=i,_=en(v,l,!0,o)&&_,_=en(v,l,!1,o)&&_,a)for(E=0;E<a.length;E++)v=o.g=a[E],_=en(v,l,!1,o)&&_}z.prototype.N=function(){if(z.Z.N.call(this),this.i){var i=this.i;for(const o in i.g){const a=i.g[o];for(let l=0;l<a.length;l++)Yt(a[l]);delete i.g[o],i.h--}}this.G=null},z.prototype.J=function(i,o,a,l){return this.i.add(String(i),o,!1,a,l)},z.prototype.K=function(i,o,a,l){return this.i.add(String(i),o,!0,a,l)};function en(i,o,a,l){if(o=i.i.g[String(o)],!o)return!0;o=o.concat();let _=!0;for(let v=0;v<o.length;++v){const E=o[v];if(E&&!E.da&&E.capture==a){const C=E.listener,V=E.ha||E.src;E.fa&&xn(i.i,E),_=C.call(V,l)!==!1&&_}}return _&&!l.defaultPrevented}function Ra(i,o){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=T(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(o)>2147483647?-1:h.setTimeout(i,o||0)}function cs(i){i.g=Ra(()=>{i.g=null,i.i&&(i.i=!1,cs(i))},i.l);const o=i.h;i.h=null,i.m.apply(null,o)}class Pa extends y{constructor(o,a){super(),this.m=o,this.l=a,this.h=null,this.i=!1,this.g=null}j(o){this.h=arguments,this.g?this.i=!0:cs(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function It(i){y.call(this),this.h=i,this.g={}}A(It,y);var hs=[];function ls(i){Qt(i.g,function(o,a){this.g.hasOwnProperty(a)&&Vn(o)},i),i.g={}}It.prototype.N=function(){It.Z.N.call(this),ls(this)},It.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Hn=h.JSON.stringify,ka=h.JSON.parse,Na=class{stringify(i){return h.JSON.stringify(i,void 0)}parse(i){return h.JSON.parse(i,void 0)}};function us(){}function Oa(){}var vt={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function zn(){p.call(this,"d")}A(zn,p);function Wn(){p.call(this,"c")}A(Wn,p);var ot={},ds=null;function Gn(){return ds=ds||new z}ot.Ia="serverreachability";function fs(i){p.call(this,ot.Ia,i)}A(fs,p);function Tt(i){const o=Gn();W(o,new fs(o))}ot.STAT_EVENT="statevent";function ps(i,o){p.call(this,ot.STAT_EVENT,i),this.stat=o}A(ps,p);function G(i){const o=Gn();W(o,new ps(o,i))}ot.Ja="timingevent";function gs(i,o){p.call(this,ot.Ja,i),this.size=o}A(gs,p);function Et(i,o){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){i()},o)}function At(){this.g=!0}At.prototype.ua=function(){this.g=!1};function Da(i,o,a,l,_,v){i.info(function(){if(i.g)if(v){var E="",C=v.split("&");for(let L=0;L<C.length;L++){var V=C[L].split("=");if(V.length>1){const B=V[0];V=V[1];const ce=B.split("_");E=ce.length>=2&&ce[1]=="type"?E+(B+"="+V+"&"):E+(B+"=redacted&")}}}else E=null;else E=v;return"XMLHTTP REQ ("+l+") [attempt "+_+"]: "+o+`
`+a+`
`+E})}function La(i,o,a,l,_,v,E){i.info(function(){return"XMLHTTP RESP ("+l+") [ attempt "+_+"]: "+o+`
`+a+`
`+v+" "+E})}function at(i,o,a,l){i.info(function(){return"XMLHTTP TEXT ("+o+"): "+xa(i,a)+(l?" "+l:"")})}function Ma(i,o){i.info(function(){return"TIMEOUT: "+o})}At.prototype.info=function(){};function xa(i,o){if(!i.g)return o;if(!o)return null;try{const v=JSON.parse(o);if(v){for(i=0;i<v.length;i++)if(Array.isArray(v[i])){var a=v[i];if(!(a.length<2)){var l=a[1];if(Array.isArray(l)&&!(l.length<1)){var _=l[0];if(_!="noop"&&_!="stop"&&_!="close")for(let E=1;E<l.length;E++)l[E]=""}}}}return Hn(v)}catch{return o}}var qn={NO_ERROR:0,TIMEOUT:8},Ua={},ms;function Kn(){}A(Kn,us),Kn.prototype.g=function(){return new XMLHttpRequest},ms=new Kn;function bt(i){return encodeURIComponent(String(i))}function ja(i){var o=1;i=i.split(":");const a=[];for(;o>0&&i.length;)a.push(i.shift()),o--;return i.length&&a.push(i.join(":")),a}function Se(i,o,a,l){this.j=i,this.i=o,this.l=a,this.S=l||1,this.V=new It(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ys}function ys(){this.i=null,this.g="",this.h=!1}var _s={},Jn={};function Xn(i,o,a){i.M=1,i.A=nn(ae(o)),i.u=a,i.R=!0,ws(i,null)}function ws(i,o){i.F=Date.now(),tn(i),i.B=ae(i.A);var a=i.B,l=i.S;Array.isArray(l)||(l=[String(l)]),Os(a.i,"t",l),i.C=0,a=i.j.L,i.h=new ys,i.g=Xs(i.j,a?o:null,!i.u),i.P>0&&(i.O=new Pa(T(i.Y,i,i.g),i.P)),o=i.V,a=i.g,l=i.ba;var _="readystatechange";Array.isArray(_)||(_&&(hs[0]=_.toString()),_=hs);for(let v=0;v<_.length;v++){const E=ss(a,_[v],l||o.handleEvent,!1,o.h||o);if(!E)break;o.g[E.key]=E}o=i.J?ts(i.J):{},i.u?(i.v||(i.v="POST"),o["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,o)):(i.v="GET",i.g.ea(i.B,i.v,null,o)),Tt(),Da(i.i,i.v,i.B,i.l,i.S,i.u)}Se.prototype.ba=function(i){i=i.target;const o=this.O;o&&Pe(i)==3?o.j():this.Y(i)},Se.prototype.Y=function(i){try{if(i==this.g)e:{const C=Pe(this.g),V=this.g.ya(),L=this.g.ca();if(!(C<3)&&(C!=3||this.g&&(this.h.h||this.g.la()||Fs(this.g)))){this.K||C!=4||V==7||(V==8||L<=0?Tt(3):Tt(2)),Yn(this);var o=this.g.ca();this.X=o;var a=Fa(this);if(this.o=o==200,La(this.i,this.v,this.B,this.l,this.S,C,o),this.o){if(this.U&&!this.L){t:{if(this.g){var l,_=this.g;if((l=_.g?_.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!d(l)){var v=l;break t}}v=null}if(i=v)at(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Qn(this,i);else{this.o=!1,this.m=3,G(12),$e(this),St(this);break e}}if(this.R){i=!0;let B;for(;!this.K&&this.C<a.length;)if(B=Va(this,a),B==Jn){C==4&&(this.m=4,G(14),i=!1),at(this.i,this.l,null,"[Incomplete Response]");break}else if(B==_s){this.m=4,G(15),at(this.i,this.l,a,"[Invalid Chunk]"),i=!1;break}else at(this.i,this.l,B,null),Qn(this,B);if(Is(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),C!=4||a.length!=0||this.h.h||(this.m=1,G(16),i=!1),this.o=this.o&&i,!i)at(this.i,this.l,a,"[Invalid Chunked Response]"),$e(this),St(this);else if(a.length>0&&!this.W){this.W=!0;var E=this.j;E.g==this&&E.aa&&!E.P&&(E.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),oi(E),E.P=!0,G(11))}}else at(this.i,this.l,a,null),Qn(this,a);C==4&&$e(this),this.o&&!this.K&&(C==4?Gs(this.j,this):(this.o=!1,tn(this)))}else ec(this.g),o==400&&a.indexOf("Unknown SID")>0?(this.m=3,G(12)):(this.m=0,G(13)),$e(this),St(this)}}}catch{}finally{}};function Fa(i){if(!Is(i))return i.g.la();const o=Fs(i.g);if(o==="")return"";let a="";const l=o.length,_=Pe(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return $e(i),St(i),"";i.h.i=new h.TextDecoder}for(let v=0;v<l;v++)i.h.h=!0,a+=i.h.i.decode(o[v],{stream:!(_&&v==l-1)});return o.length=0,i.h.g+=a,i.C=0,i.h.g}function Is(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Va(i,o){var a=i.C,l=o.indexOf(`
`,a);return l==-1?Jn:(a=Number(o.substring(a,l)),isNaN(a)?_s:(l+=1,l+a>o.length?Jn:(o=o.slice(l,l+a),i.C=l+a,o)))}Se.prototype.cancel=function(){this.K=!0,$e(this)};function tn(i){i.T=Date.now()+i.H,vs(i,i.H)}function vs(i,o){if(i.D!=null)throw Error("WatchDog timer not null");i.D=Et(T(i.aa,i),o)}function Yn(i){i.D&&(h.clearTimeout(i.D),i.D=null)}Se.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Ma(this.i,this.B),this.M!=2&&(Tt(),G(17)),$e(this),this.m=2,St(this)):vs(this,this.T-i)};function St(i){i.j.I==0||i.K||Gs(i.j,i)}function $e(i){Yn(i);var o=i.O;o&&typeof o.dispose=="function"&&o.dispose(),i.O=null,ls(i.V),i.g&&(o=i.g,i.g=null,o.abort(),o.dispose())}function Qn(i,o){try{var a=i.j;if(a.I!=0&&(a.g==i||Zn(a.h,i))){if(!i.L&&Zn(a.h,i)&&a.I==3){try{var l=a.Ba.g.parse(o)}catch{l=null}if(Array.isArray(l)&&l.length==3){var _=l;if(_[0]==0){e:if(!a.v){if(a.g)if(a.g.F+3e3<i.F)cn(a),on(a);else break e;ri(a),G(18)}}else a.xa=_[1],0<a.xa-a.K&&_[2]<37500&&a.F&&a.A==0&&!a.C&&(a.C=Et(T(a.Va,a),6e3));As(a.h)<=1&&a.ta&&(a.ta=void 0)}else ze(a,11)}else if((i.L||a.g==i)&&cn(a),!d(o))for(_=a.Ba.g.parse(o),o=0;o<_.length;o++){let L=_[o];const B=L[0];if(!(B<=a.K))if(a.K=B,L=L[1],a.I==2)if(L[0]=="c"){a.M=L[1],a.ba=L[2];const ce=L[3];ce!=null&&(a.ka=ce,a.j.info("VER="+a.ka));const We=L[4];We!=null&&(a.za=We,a.j.info("SVER="+a.za));const ke=L[5];ke!=null&&typeof ke=="number"&&ke>0&&(l=1.5*ke,a.O=l,a.j.info("backChannelRequestTimeoutMs_="+l)),l=a;const Ne=i.g;if(Ne){const hn=Ne.g?Ne.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(hn){var v=l.h;v.g||hn.indexOf("spdy")==-1&&hn.indexOf("quic")==-1&&hn.indexOf("h2")==-1||(v.j=v.l,v.g=new Set,v.h&&(ei(v,v.h),v.h=null))}if(l.G){const ai=Ne.g?Ne.g.getResponseHeader("X-HTTP-Session-Id"):null;ai&&(l.wa=ai,M(l.J,l.G,ai))}}a.I=3,a.l&&a.l.ra(),a.aa&&(a.T=Date.now()-i.F,a.j.info("Handshake RTT: "+a.T+"ms")),l=a;var E=i;if(l.na=Js(l,l.L?l.ba:null,l.W),E.L){bs(l.h,E);var C=E,V=l.O;V&&(C.H=V),C.D&&(Yn(C),tn(C)),l.g=E}else zs(l);a.i.length>0&&an(a)}else L[0]!="stop"&&L[0]!="close"||ze(a,7);else a.I==3&&(L[0]=="stop"||L[0]=="close"?L[0]=="stop"?ze(a,7):si(a):L[0]!="noop"&&a.l&&a.l.qa(L),a.A=0)}}Tt(4)}catch{}}var Ba=class{constructor(i,o){this.g=i,this.map=o}};function Ts(i){this.l=i||10,h.PerformanceNavigationTiming?(i=h.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Es(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function As(i){return i.h?1:i.g?i.g.size:0}function Zn(i,o){return i.h?i.h==o:i.g?i.g.has(o):!1}function ei(i,o){i.g?i.g.add(o):i.h=o}function bs(i,o){i.h&&i.h==o?i.h=null:i.g&&i.g.has(o)&&i.g.delete(o)}Ts.prototype.cancel=function(){if(this.i=Ss(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Ss(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let o=i.i;for(const a of i.g.values())o=o.concat(a.G);return o}return H(i.i)}var Cs=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function $a(i,o){if(i){i=i.split("&");for(let a=0;a<i.length;a++){const l=i[a].indexOf("=");let _,v=null;l>=0?(_=i[a].substring(0,l),v=i[a].substring(l+1)):_=i[a],o(_,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function Ce(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let o;i instanceof Ce?(this.l=i.l,Ct(this,i.j),this.o=i.o,this.g=i.g,Rt(this,i.u),this.h=i.h,ti(this,Ds(i.i)),this.m=i.m):i&&(o=String(i).match(Cs))?(this.l=!1,Ct(this,o[1]||"",!0),this.o=Pt(o[2]||""),this.g=Pt(o[3]||"",!0),Rt(this,o[4]),this.h=Pt(o[5]||"",!0),ti(this,o[6]||"",!0),this.m=Pt(o[7]||"")):(this.l=!1,this.i=new Nt(null,this.l))}Ce.prototype.toString=function(){const i=[];var o=this.j;o&&i.push(kt(o,Rs,!0),":");var a=this.g;return(a||o=="file")&&(i.push("//"),(o=this.o)&&i.push(kt(o,Rs,!0),"@"),i.push(bt(a).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a=this.u,a!=null&&i.push(":",String(a))),(a=this.h)&&(this.g&&a.charAt(0)!="/"&&i.push("/"),i.push(kt(a,a.charAt(0)=="/"?Wa:za,!0))),(a=this.i.toString())&&i.push("?",a),(a=this.m)&&i.push("#",kt(a,qa)),i.join("")},Ce.prototype.resolve=function(i){const o=ae(this);let a=!!i.j;a?Ct(o,i.j):a=!!i.o,a?o.o=i.o:a=!!i.g,a?o.g=i.g:a=i.u!=null;var l=i.h;if(a)Rt(o,i.u);else if(a=!!i.h){if(l.charAt(0)!="/")if(this.g&&!this.h)l="/"+l;else{var _=o.h.lastIndexOf("/");_!=-1&&(l=o.h.slice(0,_+1)+l)}if(_=l,_==".."||_==".")l="";else if(_.indexOf("./")!=-1||_.indexOf("/.")!=-1){l=_.lastIndexOf("/",0)==0,_=_.split("/");const v=[];for(let E=0;E<_.length;){const C=_[E++];C=="."?l&&E==_.length&&v.push(""):C==".."?((v.length>1||v.length==1&&v[0]!="")&&v.pop(),l&&E==_.length&&v.push("")):(v.push(C),l=!0)}l=v.join("/")}else l=_}return a?o.h=l:a=i.i.toString()!=="",a?ti(o,Ds(i.i)):a=!!i.m,a&&(o.m=i.m),o};function ae(i){return new Ce(i)}function Ct(i,o,a){i.j=a?Pt(o,!0):o,i.j&&(i.j=i.j.replace(/:$/,""))}function Rt(i,o){if(o){if(o=Number(o),isNaN(o)||o<0)throw Error("Bad port number "+o);i.u=o}else i.u=null}function ti(i,o,a){o instanceof Nt?(i.i=o,Ka(i.i,i.l)):(a||(o=kt(o,Ga)),i.i=new Nt(o,i.l))}function M(i,o,a){i.i.set(o,a)}function nn(i){return M(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function Pt(i,o){return i?o?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function kt(i,o,a){return typeof i=="string"?(i=encodeURI(i).replace(o,Ha),a&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Ha(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Rs=/[#\/\?@]/g,za=/[#\?:]/g,Wa=/[#\?]/g,Ga=/[#\?@]/g,qa=/#/g;function Nt(i,o){this.h=this.g=null,this.i=i||null,this.j=!!o}function He(i){i.g||(i.g=new Map,i.h=0,i.i&&$a(i.i,function(o,a){i.add(decodeURIComponent(o.replace(/\+/g," ")),a)}))}n=Nt.prototype,n.add=function(i,o){He(this),this.i=null,i=ct(this,i);let a=this.g.get(i);return a||this.g.set(i,a=[]),a.push(o),this.h+=1,this};function Ps(i,o){He(i),o=ct(i,o),i.g.has(o)&&(i.i=null,i.h-=i.g.get(o).length,i.g.delete(o))}function ks(i,o){return He(i),o=ct(i,o),i.g.has(o)}n.forEach=function(i,o){He(this),this.g.forEach(function(a,l){a.forEach(function(_){i.call(o,_,l,this)},this)},this)};function Ns(i,o){He(i);let a=[];if(typeof o=="string")ks(i,o)&&(a=a.concat(i.g.get(ct(i,o))));else for(i=Array.from(i.g.values()),o=0;o<i.length;o++)a=a.concat(i[o]);return a}n.set=function(i,o){return He(this),this.i=null,i=ct(this,i),ks(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[o]),this.h+=1,this},n.get=function(i,o){return i?(i=Ns(this,i),i.length>0?String(i[0]):o):o};function Os(i,o,a){Ps(i,o),a.length>0&&(i.i=null,i.g.set(ct(i,o),H(a)),i.h+=a.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],o=Array.from(this.g.keys());for(let l=0;l<o.length;l++){var a=o[l];const _=bt(a);a=Ns(this,a);for(let v=0;v<a.length;v++){let E=_;a[v]!==""&&(E+="="+bt(a[v])),i.push(E)}}return this.i=i.join("&")};function Ds(i){const o=new Nt;return o.i=i.i,i.g&&(o.g=new Map(i.g),o.h=i.h),o}function ct(i,o){return o=String(o),i.j&&(o=o.toLowerCase()),o}function Ka(i,o){o&&!i.j&&(He(i),i.i=null,i.g.forEach(function(a,l){const _=l.toLowerCase();l!=_&&(Ps(this,l),Os(this,_,a))},i)),i.j=o}function Ja(i,o){const a=new At;if(h.Image){const l=new Image;l.onload=b(Re,a,"TestLoadImage: loaded",!0,o,l),l.onerror=b(Re,a,"TestLoadImage: error",!1,o,l),l.onabort=b(Re,a,"TestLoadImage: abort",!1,o,l),l.ontimeout=b(Re,a,"TestLoadImage: timeout",!1,o,l),h.setTimeout(function(){l.ontimeout&&l.ontimeout()},1e4),l.src=i}else o(!1)}function Xa(i,o){const a=new At,l=new AbortController,_=setTimeout(()=>{l.abort(),Re(a,"TestPingServer: timeout",!1,o)},1e4);fetch(i,{signal:l.signal}).then(v=>{clearTimeout(_),v.ok?Re(a,"TestPingServer: ok",!0,o):Re(a,"TestPingServer: server error",!1,o)}).catch(()=>{clearTimeout(_),Re(a,"TestPingServer: error",!1,o)})}function Re(i,o,a,l,_){try{_&&(_.onload=null,_.onerror=null,_.onabort=null,_.ontimeout=null),l(a)}catch{}}function Ya(){this.g=new Na}function ni(i){this.i=i.Sb||null,this.h=i.ab||!1}A(ni,us),ni.prototype.g=function(){return new sn(this.i,this.h)};function sn(i,o){z.call(this),this.H=i,this.o=o,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}A(sn,z),n=sn.prototype,n.open=function(i,o){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=o,this.readyState=1,Dt(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const o={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(o.body=i),(this.H||h).fetch(new Request(this.D,o)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ot(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Dt(this)),this.g&&(this.readyState=3,Dt(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ls(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ls(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var o=i.value?i.value:new Uint8Array(0);(o=this.B.decode(o,{stream:!i.done}))&&(this.response=this.responseText+=o)}i.done?Ot(this):Dt(this),this.readyState==3&&Ls(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,Ot(this))},n.Na=function(i){this.g&&(this.response=i,Ot(this))},n.ga=function(){this.g&&Ot(this)};function Ot(i){i.readyState=4,i.l=null,i.j=null,i.B=null,Dt(i)}n.setRequestHeader=function(i,o){this.A.append(i,o)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],o=this.h.entries();for(var a=o.next();!a.done;)a=a.value,i.push(a[0]+": "+a[1]),a=o.next();return i.join(`\r
`)};function Dt(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(sn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Ms(i){let o="";return Qt(i,function(a,l){o+=l,o+=":",o+=a,o+=`\r
`}),o}function ii(i,o,a){e:{for(l in a){var l=!1;break e}l=!0}l||(a=Ms(a),typeof i=="string"?a!=null&&bt(a):M(i,o,a))}function U(i){z.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}A(U,z);var Qa=/^https?$/i,Za=["POST","PUT"];n=U.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,o,a,l){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);o=o?o.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ms.g(),this.g.onreadystatechange=P(T(this.Ca,this));try{this.B=!0,this.g.open(o,String(i),!0),this.B=!1}catch(v){xs(this,v);return}if(i=a||"",a=new Map(this.headers),l)if(Object.getPrototypeOf(l)===Object.prototype)for(var _ in l)a.set(_,l[_]);else if(typeof l.keys=="function"&&typeof l.get=="function")for(const v of l.keys())a.set(v,l.get(v));else throw Error("Unknown input type for opt_headers: "+String(l));l=Array.from(a.keys()).find(v=>v.toLowerCase()=="content-type"),_=h.FormData&&i instanceof h.FormData,!(Array.prototype.indexOf.call(Za,o,void 0)>=0)||l||_||a.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[v,E]of a)this.g.setRequestHeader(v,E);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(v){xs(this,v)}};function xs(i,o){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=o,i.o=5,Us(i),rn(i)}function Us(i){i.A||(i.A=!0,W(i,"complete"),W(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,W(this,"complete"),W(this,"abort"),rn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),rn(this,!0)),U.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?js(this):this.Xa())},n.Xa=function(){js(this)};function js(i){if(i.h&&typeof c<"u"){if(i.v&&Pe(i)==4)setTimeout(i.Ca.bind(i),0);else if(W(i,"readystatechange"),Pe(i)==4){i.h=!1;try{const v=i.ca();e:switch(v){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var o=!0;break e;default:o=!1}var a;if(!(a=o)){var l;if(l=v===0){let E=String(i.D).match(Cs)[1]||null;!E&&h.self&&h.self.location&&(E=h.self.location.protocol.slice(0,-1)),l=!Qa.test(E?E.toLowerCase():"")}a=l}if(a)W(i,"complete"),W(i,"success");else{i.o=6;try{var _=Pe(i)>2?i.g.statusText:""}catch{_=""}i.l=_+" ["+i.ca()+"]",Us(i)}}finally{rn(i)}}}}function rn(i,o){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const a=i.g;i.g=null,o||W(i,"ready");try{a.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Pe(i){return i.g?i.g.readyState:0}n.ca=function(){try{return Pe(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var o=this.g.responseText;return i&&o.indexOf(i)==0&&(o=o.substring(i.length)),ka(o)}};function Fs(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function ec(i){const o={};i=(i.g&&Pe(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let l=0;l<i.length;l++){if(d(i[l]))continue;var a=ja(i[l]);const _=a[0];if(a=a[1],typeof a!="string")continue;a=a.trim();const v=o[_]||[];o[_]=v,v.push(a)}Aa(o,function(l){return l.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Lt(i,o,a){return a&&a.internalChannelParams&&a.internalChannelParams[i]||o}function Vs(i){this.za=0,this.i=[],this.j=new At,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Lt("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Lt("baseRetryDelayMs",5e3,i),this.Za=Lt("retryDelaySeedMs",1e4,i),this.Ta=Lt("forwardChannelMaxRetries",2,i),this.va=Lt("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new Ts(i&&i.concurrentRequestLimit),this.Ba=new Ya,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Vs.prototype,n.ka=8,n.I=1,n.connect=function(i,o,a,l){G(0),this.W=i,this.H=o||{},a&&l!==void 0&&(this.H.OSID=a,this.H.OAID=l),this.F=this.X,this.J=Js(this,null,this.W),an(this)};function si(i){if(Bs(i),i.I==3){var o=i.V++,a=ae(i.J);if(M(a,"SID",i.M),M(a,"RID",o),M(a,"TYPE","terminate"),Mt(i,a),o=new Se(i,i.j,o),o.M=2,o.A=nn(ae(a)),a=!1,h.navigator&&h.navigator.sendBeacon)try{a=h.navigator.sendBeacon(o.A.toString(),"")}catch{}!a&&h.Image&&(new Image().src=o.A,a=!0),a||(o.g=Xs(o.j,null),o.g.ea(o.A)),o.F=Date.now(),tn(o)}Ks(i)}function on(i){i.g&&(oi(i),i.g.cancel(),i.g=null)}function Bs(i){on(i),i.v&&(h.clearTimeout(i.v),i.v=null),cn(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&h.clearTimeout(i.m),i.m=null)}function an(i){if(!Es(i.h)&&!i.m){i.m=!0;var o=i.Ea;be||u(),Q||(be(),Q=!0),m.add(o,i),i.D=0}}function tc(i,o){return As(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=o.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=Et(T(i.Ea,i,o),qs(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const _=new Se(this,this.j,i);let v=this.o;if(this.U&&(v?(v=ts(v),is(v,this.U)):v=this.U),this.u!==null||this.R||(_.J=v,v=null),this.S)e:{for(var o=0,a=0;a<this.i.length;a++){t:{var l=this.i[a];if("__data__"in l.map&&(l=l.map.__data__,typeof l=="string")){l=l.length;break t}l=void 0}if(l===void 0)break;if(o+=l,o>4096){o=a;break e}if(o===4096||a===this.i.length-1){o=a+1;break e}}o=1e3}else o=1e3;o=Hs(this,_,o),a=ae(this.J),M(a,"RID",i),M(a,"CVER",22),this.G&&M(a,"X-HTTP-Session-Id",this.G),Mt(this,a),v&&(this.R?o="headers="+bt(Ms(v))+"&"+o:this.u&&ii(a,this.u,v)),ei(this.h,_),this.Ra&&M(a,"TYPE","init"),this.S?(M(a,"$req",o),M(a,"SID","null"),_.U=!0,Xn(_,a,null)):Xn(_,a,o),this.I=2}}else this.I==3&&(i?$s(this,i):this.i.length==0||Es(this.h)||$s(this))};function $s(i,o){var a;o?a=o.l:a=i.V++;const l=ae(i.J);M(l,"SID",i.M),M(l,"RID",a),M(l,"AID",i.K),Mt(i,l),i.u&&i.o&&ii(l,i.u,i.o),a=new Se(i,i.j,a,i.D+1),i.u===null&&(a.J=i.o),o&&(i.i=o.G.concat(i.i)),o=Hs(i,a,1e3),a.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),ei(i.h,a),Xn(a,l,o)}function Mt(i,o){i.H&&Qt(i.H,function(a,l){M(o,l,a)}),i.l&&Qt({},function(a,l){M(o,l,a)})}function Hs(i,o,a){a=Math.min(i.i.length,a);const l=i.l?T(i.l.Ka,i.l,i):null;e:{var _=i.i;let C=-1;for(;;){const V=["count="+a];C==-1?a>0?(C=_[0].g,V.push("ofs="+C)):C=0:V.push("ofs="+C);let L=!0;for(let B=0;B<a;B++){var v=_[B].g;const ce=_[B].map;if(v-=C,v<0)C=Math.max(0,_[B].g-100),L=!1;else try{v="req"+v+"_"||"";try{var E=ce instanceof Map?ce:Object.entries(ce);for(const[We,ke]of E){let Ne=ke;g(ke)&&(Ne=Hn(ke)),V.push(v+We+"="+encodeURIComponent(Ne))}}catch(We){throw V.push(v+"type="+encodeURIComponent("_badmap")),We}}catch{l&&l(ce)}}if(L){E=V.join("&");break e}}E=void 0}return i=i.i.splice(0,a),o.G=i,E}function zs(i){if(!i.g&&!i.v){i.Y=1;var o=i.Da;be||u(),Q||(be(),Q=!0),m.add(o,i),i.A=0}}function ri(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=Et(T(i.Da,i),qs(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,Ws(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=Et(T(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,G(10),on(this),Ws(this))};function oi(i){i.B!=null&&(h.clearTimeout(i.B),i.B=null)}function Ws(i){i.g=new Se(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var o=ae(i.na);M(o,"RID","rpc"),M(o,"SID",i.M),M(o,"AID",i.K),M(o,"CI",i.F?"0":"1"),!i.F&&i.ia&&M(o,"TO",i.ia),M(o,"TYPE","xmlhttp"),Mt(i,o),i.u&&i.o&&ii(o,i.u,i.o),i.O&&(i.g.H=i.O);var a=i.g;i=i.ba,a.M=1,a.A=nn(ae(o)),a.u=null,a.R=!0,ws(a,i)}n.Va=function(){this.C!=null&&(this.C=null,on(this),ri(this),G(19))};function cn(i){i.C!=null&&(h.clearTimeout(i.C),i.C=null)}function Gs(i,o){var a=null;if(i.g==o){cn(i),oi(i),i.g=null;var l=2}else if(Zn(i.h,o))a=o.G,bs(i.h,o),l=1;else return;if(i.I!=0){if(o.o)if(l==1){a=o.u?o.u.length:0,o=Date.now()-o.F;var _=i.D;l=Gn(),W(l,new gs(l,a)),an(i)}else zs(i);else if(_=o.m,_==3||_==0&&o.X>0||!(l==1&&tc(i,o)||l==2&&ri(i)))switch(a&&a.length>0&&(o=i.h,o.i=o.i.concat(a)),_){case 1:ze(i,5);break;case 4:ze(i,10);break;case 3:ze(i,6);break;default:ze(i,2)}}}function qs(i,o){let a=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(a*=2),a*o}function ze(i,o){if(i.j.info("Error code "+o),o==2){var a=T(i.bb,i),l=i.Ua;const _=!l;l=new Ce(l||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||Ct(l,"https"),nn(l),_?Ja(l.toString(),a):Xa(l.toString(),a)}else G(2);i.I=0,i.l&&i.l.pa(o),Ks(i),Bs(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),G(2)):(this.j.info("Failed to ping google.com"),G(1))};function Ks(i){if(i.I=0,i.ja=[],i.l){const o=Ss(i.h);(o.length!=0||i.i.length!=0)&&(j(i.ja,o),j(i.ja,i.i),i.h.i.length=0,H(i.i),i.i.length=0),i.l.oa()}}function Js(i,o,a){var l=a instanceof Ce?ae(a):new Ce(a);if(l.g!="")o&&(l.g=o+"."+l.g),Rt(l,l.u);else{var _=h.location;l=_.protocol,o=o?o+"."+_.hostname:_.hostname,_=+_.port;const v=new Ce(null);l&&Ct(v,l),o&&(v.g=o),_&&Rt(v,_),a&&(v.h=a),l=v}return a=i.G,o=i.wa,a&&o&&M(l,a,o),M(l,"VER",i.ka),Mt(i,l),l}function Xs(i,o,a){if(o&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return o=i.Aa&&!i.ma?new U(new ni({ab:a})):new U(i.ma),o.Fa(i.L),o}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ys(){}n=Ys.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Z(i,o){z.call(this),this.g=new Vs(o),this.l=i,this.h=o&&o.messageUrlParams||null,i=o&&o.messageHeaders||null,o&&o.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=o&&o.initMessageHeaders||null,o&&o.messageContentType&&(i?i["X-WebChannel-Content-Type"]=o.messageContentType:i={"X-WebChannel-Content-Type":o.messageContentType}),o&&o.sa&&(i?i["X-WebChannel-Client-Profile"]=o.sa:i={"X-WebChannel-Client-Profile":o.sa}),this.g.U=i,(i=o&&o.Qb)&&!d(i)&&(this.g.u=i),this.A=o&&o.supportsCrossDomainXhr||!1,this.v=o&&o.sendRawJson||!1,(o=o&&o.httpSessionIdParam)&&!d(o)&&(this.g.G=o,i=this.h,i!==null&&o in i&&(i=this.h,o in i&&delete i[o])),this.j=new ht(this)}A(Z,z),Z.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Z.prototype.close=function(){si(this.g)},Z.prototype.o=function(i){var o=this.g;if(typeof i=="string"){var a={};a.__data__=i,i=a}else this.v&&(a={},a.__data__=Hn(i),i=a);o.i.push(new Ba(o.Ya++,i)),o.I==3&&an(o)},Z.prototype.N=function(){this.g.l=null,delete this.j,si(this.g),delete this.g,Z.Z.N.call(this)};function Qs(i){zn.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var o=i.__sm__;if(o){e:{for(const a in o){i=a;break e}i=void 0}(this.i=i)&&(i=this.i,o=o!==null&&i in o?o[i]:void 0),this.data=o}else this.data=i}A(Qs,zn);function Zs(){Wn.call(this),this.status=1}A(Zs,Wn);function ht(i){this.g=i}A(ht,Ys),ht.prototype.ra=function(){W(this.g,"a")},ht.prototype.qa=function(i){W(this.g,new Qs(i))},ht.prototype.pa=function(i){W(this.g,new Zs)},ht.prototype.oa=function(){W(this.g,"b")},Z.prototype.send=Z.prototype.o,Z.prototype.open=Z.prototype.m,Z.prototype.close=Z.prototype.close,qn.NO_ERROR=0,qn.TIMEOUT=8,qn.HTTP_ERROR=6,Ua.COMPLETE="complete",Oa.EventType=vt,vt.OPEN="a",vt.CLOSE="b",vt.ERROR="c",vt.MESSAGE="d",z.prototype.listen=z.prototype.J,U.prototype.listenOnce=U.prototype.K,U.prototype.getLastError=U.prototype.Ha,U.prototype.getLastErrorCode=U.prototype.ya,U.prototype.getStatus=U.prototype.ca,U.prototype.getResponseJson=U.prototype.La,U.prototype.getResponseText=U.prototype.la,U.prototype.send=U.prototype.ea,U.prototype.setWithCredentials=U.prototype.Fa}).apply(typeof un<"u"?un:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}q.UNAUTHENTICATED=new q(null),q.GOOGLE_CREDENTIALS=new q("google-credentials-uid"),q.FIRST_PARTY=new q("first-party-uid"),q.MOCK_USER=new q("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jt="12.13.0";function ju(n){Jt=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=new Nn("@firebase/firestore");function ie(n,...e){if(yt.logLevel<=D.DEBUG){const t=e.map(Wi);yt.debug(`Firestore (${Jt}): ${n}`,...t)}}function qo(n,...e){if(yt.logLevel<=D.ERROR){const t=e.map(Wi);yt.error(`Firestore (${Jt}): ${n}`,...t)}}function Fu(n,...e){if(yt.logLevel<=D.WARN){const t=e.map(Wi);yt.warn(`Firestore (${Jt}): ${n}`,...t)}}function Wi(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,Ko(n,s,t)}function Ko(n,e,t){let s=`FIRESTORE (${Jt}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw qo(s),new Error(s)}function Ft(n,e,t,s){let r="Unexpected state";typeof t=="string"?r=t:s=t,n||Ko(e,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class O extends re{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Vu{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(q.UNAUTHENTICATED))}shutdown(){}}class Bu{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class $u{constructor(e){this.t=e,this.currentUser=q.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Ft(this.o===void 0,42304);let s=this.i;const r=w=>this.i!==s?(s=this.i,t(w)):Promise.resolve();let c=new Vt;this.o=()=>{this.i++,this.currentUser=this.u(),c.resolve(),c=new Vt,e.enqueueRetryable(()=>r(this.currentUser))};const h=()=>{const w=c;e.enqueueRetryable(async()=>{await w.promise,await r(this.currentUser)})},g=w=>{ie("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=w,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit(w=>g(w)),setTimeout(()=>{if(!this.auth){const w=this.t.getImmediate({optional:!0});w?g(w):(ie("FirebaseAuthCredentialsProvider","Auth not yet detected"),c.resolve(),c=new Vt)}},0),h()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?(ie("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Ft(typeof s.accessToken=="string",31837,{l:s}),new Jo(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ft(e===null||typeof e=="string",2055,{h:e}),new q(e)}}class Hu{constructor(e,t,s){this.P=e,this.T=t,this.I=s,this.type="FirstParty",this.user=q.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class zu{constructor(e,t,s){this.P=e,this.T=t,this.I=s}getToken(){return Promise.resolve(new Hu(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(q.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Pr{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Wu{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ue(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Ft(this.o===void 0,3512);const s=c=>{c.error!=null&&ie("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${c.error.message}`);const h=c.token!==this.m;return this.m=c.token,ie("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?t(c.token):Promise.resolve()};this.o=c=>{e.enqueueRetryable(()=>s(c))};const r=c=>{ie("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=c,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(c=>r(c)),setTimeout(()=>{if(!this.appCheck){const c=this.V.getImmediate({optional:!0});c?r(c):ie("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Pr(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Ft(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Pr(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gu(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=Gu(40);for(let c=0;c<r.length;++c)s.length<20&&r[c]<t&&(s+=e.charAt(r[c]%62))}return s}}function Ve(n,e){return n<e?-1:n>e?1:0}function Ku(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const r=n.charAt(s),c=e.charAt(s);if(r!==c)return mi(r)===mi(c)?Ve(r,c):mi(r)?1:-1}return Ve(n.length,e.length)}const Ju=55296,Xu=57343;function mi(n){const e=n.charCodeAt(0);return e>=Ju&&e<=Xu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr="__name__";class he{constructor(e,t,s){t===void 0?t=0:t>e.length&&zt(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&zt(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return he.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof he?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let r=0;r<s;r++){const c=he.compareSegments(e.get(r),t.get(r));if(c!==0)return c}return Ve(e.length,t.length)}static compareSegments(e,t){const s=he.isNumericId(e),r=he.isNumericId(t);return s&&!r?-1:!s&&r?1:s&&r?he.extractNumericId(e).compare(he.extractNumericId(t)):Ku(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return zi.fromString(e.substring(4,e.length-2))}}class te extends he{construct(e,t,s){return new te(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new O(N.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(r=>r.length>0))}return new te(t)}static emptyPath(){return new te([])}}const Yu=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class qe extends he{construct(e,t,s){return new qe(e,t,s)}static isValidIdentifier(e){return Yu.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),qe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===kr}static keyField(){return new qe([kr])}static fromServerFormat(e){const t=[];let s="",r=0;const c=()=>{if(s.length===0)throw new O(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let h=!1;for(;r<e.length;){const g=e[r];if(g==="\\"){if(r+1===e.length)throw new O(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const w=e[r+1];if(w!=="\\"&&w!=="."&&w!=="`")throw new O(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=w,r+=2}else g==="`"?(h=!h,r++):g!=="."||h?(s+=g,r++):(c(),r++)}if(c(),h)throw new O(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new qe(t)}static emptyPath(){return new qe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.path=e}static fromPath(e){return new Ke(te.fromString(e))}static fromName(e){return new Ke(te.fromString(e).popFirst(5))}static empty(){return new Ke(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Ke(new te(e.slice()))}}function Qu(n,e,t,s){if(e===!0&&s===!0)throw new O(N.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Zu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ed(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":zt(12329,{type:typeof n})}function td(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new O(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ed(n);throw new O(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n,e){const t={typeString:n};return e&&(t.value=e),t}function Xt(n,e){if(!Zu(n))throw new O(N.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const r=e[s].typeString,c="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const h=n[s];if(r&&typeof h!==r){t=`JSON field '${s}' must be a ${r}.`;break}if(c!==void 0&&h!==c.value){t=`Expected '${s}' field to equal '${c.value}'`;break}}if(t)throw new O(N.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nr=-62135596800,Or=1e6;class le{static now(){return le.fromMillis(Date.now())}static fromDate(e){return le.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*Or);return new le(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new O(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new O(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Nr)throw new O(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new O(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Or}_compareTo(e){return this.seconds===e.seconds?Ve(this.nanoseconds,e.nanoseconds):Ve(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:le._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Xt(e,le._jsonSchema))return new le(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Nr;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}le._jsonSchemaVersion="firestore/timestamp/1.0",le._jsonSchema={type:F("string",le._jsonSchemaVersion),seconds:F("number"),nanoseconds:F("number")};function nd(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(c){throw typeof DOMException<"u"&&c instanceof DOMException?new id("Invalid base64 string: "+c):c}}(e);return new et(t)}static fromUint8Array(e){const t=function(r){let c="";for(let h=0;h<r.length;++h)c+=String.fromCharCode(r[h]);return c}(e);return new et(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let r=0;r<t.length;r++)s[r]=t.charCodeAt(r);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ve(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}et.EMPTY_BYTE_STRING=new et("");const Pi="(default)";class Cn{constructor(e,t){this.projectId=e,this.database=t||Pi}static empty(){return new Cn("","")}get isDefaultDatabase(){return this.database===Pi}isEqual(e){return e instanceof Cn&&e.projectId===this.projectId&&e.database===this.database}}function sd(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new O(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Cn(n.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e,t=null,s=[],r=[],c=null,h="F",g=null,w=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=r,this.limit=c,this.limitType=h,this.startAt=g,this.endAt=w,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function od(n){return new rd(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dr,k;(k=Dr||(Dr={}))[k.OK=0]="OK",k[k.CANCELLED=1]="CANCELLED",k[k.UNKNOWN=2]="UNKNOWN",k[k.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",k[k.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",k[k.NOT_FOUND=5]="NOT_FOUND",k[k.ALREADY_EXISTS=6]="ALREADY_EXISTS",k[k.PERMISSION_DENIED=7]="PERMISSION_DENIED",k[k.UNAUTHENTICATED=16]="UNAUTHENTICATED",k[k.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",k[k.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",k[k.ABORTED=10]="ABORTED",k[k.OUT_OF_RANGE=11]="OUT_OF_RANGE",k[k.UNIMPLEMENTED=12]="UNIMPLEMENTED",k[k.INTERNAL=13]="INTERNAL",k[k.UNAVAILABLE=14]="UNAVAILABLE",k[k.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new zi([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cd=1048576;function yi(){return typeof document<"u"?document:null}class hd{constructor(e,t,s=1e3,r=1.5,c=6e4){this.Ci=e,this.timerId=t,this.R_=s,this.A_=r,this.V_=c,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),s=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-s);r>0&&ie("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t,s,r,c){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=r,this.removalCallback=c,this.deferred=new Vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(h=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,r,c){const h=Date.now()+s,g=new Gi(e,t,h,r,c);return g.start(s),g}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Lr,Mr;(Mr=Lr||(Lr={})).Ba="default",Mr.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ld(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud="ComponentProvider",xr=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo="firestore.googleapis.com",Ur=!0;class jr{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new O(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Xo,this.ssl=Ur}else this.host=e.host,this.ssl=e.ssl??Ur;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ad;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<cd)throw new O(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Qu("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ld(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new O(N.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new O(N.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new O(N.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Yo{constructor(e,t,s,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new jr({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new O(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new jr(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new Vu;switch(s.type){case"firstParty":return new zu(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new O(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=xr.get(t);s&&(ie(ud,"Removing Datastore"),xr.delete(t),s.terminate())}(this),Promise.resolve()}}function dd(n,e,t,s={}){var T;n=td(n,Yo);const r=kn(e),c=n._getSettings(),h={...c,emulatorOptions:n._getEmulatorOptions()},g=`${e}:${t}`;r&&co(`https://${g}`),c.host!==Xo&&c.host!==g&&Fu("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const w={...c,host:g,ssl:r,emulatorOptions:s};if(!Fe(w,h)&&(n._setSettings(w),s.mockUserToken)){let b,A;if(typeof s.mockUserToken=="string")b=s.mockUserToken,A=q.MOCK_USER;else{b=pc(s.mockUserToken,(T=n._app)==null?void 0:T.options.projectId);const P=s.mockUserToken.sub||s.mockUserToken.user_id;if(!P)throw new O(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");A=new q(P)}n._authCredentials=new Bu(new Jo(b,A))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new qi(this.firestore,e,this._query)}}class de{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ki(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new de(this.firestore,e,this._key)}toJSON(){return{type:de._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(Xt(t,de._jsonSchema))return new de(e,s||null,new Ke(te.fromString(t.referencePath)))}}de._jsonSchemaVersion="firestore/documentReference/1.0",de._jsonSchema={type:F("string",de._jsonSchemaVersion),referencePath:F("string")};class Ki extends qi{constructor(e,t,s){super(e,t,od(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new de(this.firestore,null,new Ke(e))}withConverter(e){return new Ki(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr="AsyncQueue";class Vr{constructor(e=Promise.resolve()){this.rc=[],this.sc=!1,this.oc=[],this._c=null,this.ac=!1,this.uc=!1,this.cc=[],this.M_=new hd(this,"async_queue_retry"),this.lc=()=>{const s=yi();s&&ie(Fr,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.hc=e;const t=yi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.lc)}get isShuttingDown(){return this.sc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pc(),this.Tc(e)}enterRestrictedMode(e){if(!this.sc){this.sc=!0,this.uc=e||!1;const t=yi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.lc)}}enqueue(e){if(this.Pc(),this.sc)return new Promise(()=>{});const t=new Vt;return this.Tc(()=>this.sc&&this.uc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.rc.push(e),this.Ic()))}async Ic(){if(this.rc.length!==0){try{await this.rc[0](),this.rc.shift(),this.M_.reset()}catch(e){if(!nd(e))throw e;ie(Fr,"Operation failed with retryable error: "+e)}this.rc.length>0&&this.M_.p_(()=>this.Ic())}}Tc(e){const t=this.hc.then(()=>(this.ac=!0,e().catch(s=>{throw this._c=s,this.ac=!1,qo("INTERNAL UNHANDLED ERROR: ",Br(s)),s}).then(s=>(this.ac=!1,s))));return this.hc=t,t}enqueueAfterDelay(e,t,s){this.Pc(),this.cc.indexOf(e)>-1&&(t=0);const r=Gi.createAndSchedule(this,e,t,s,c=>this.Ec(c));return this.oc.push(r),r}Pc(){this._c&&zt(47125,{Rc:Br(this._c)})}verifyOperationInProgress(){}async Ac(){let e;do e=this.hc,await e;while(e!==this.hc)}Vc(e){for(const t of this.oc)if(t.timerId===e)return!0;return!1}dc(e){return this.Ac().then(()=>{this.oc.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.oc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Ac()})}mc(e){this.cc.push(e)}Ec(e){const t=this.oc.indexOf(e);this.oc.splice(t,1)}}function Br(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class fd extends Yo{constructor(e,t,s,r){super(e,t,s,r),this.type="firestore",this._queue=new Vr,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Vr(e),this._firestoreClient=void 0,await e}}}function pd(n,e){const t=typeof n=="object"?n:Li(),s=typeof n=="string"?n:Pi,r=st(t,"firestore").getImmediate({identifier:s});if(!r._initialized){const c=dc("firestore");c&&dd(r,...c)}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ye(et.fromBase64String(e))}catch(t){throw new O(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ye(et.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ye._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Xt(e,ye._jsonSchema))return ye.fromBase64String(e.bytes)}}ye._jsonSchemaVersion="firestore/bytes/1.0",ye._jsonSchema={type:F("string",ye._jsonSchemaVersion),bytes:F("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new O(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new qe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new O(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new O(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Ve(this._lat,e._lat)||Ve(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ye._jsonSchemaVersion}}static fromJSON(e){if(Xt(e,Ye._jsonSchema))return new Ye(e.latitude,e.longitude)}}Ye._jsonSchemaVersion="firestore/geoPoint/1.0",Ye._jsonSchema={type:F("string",Ye._jsonSchemaVersion),latitude:F("number"),longitude:F("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,r){if(s.length!==r.length)return!1;for(let c=0;c<s.length;++c)if(s[c]!==r[c])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Qe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Xt(e,Qe._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Qe(e.vectorValues);throw new O(N.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Qe._jsonSchemaVersion="firestore/vectorValue/1.0",Qe._jsonSchema={type:F("string",Qe._jsonSchemaVersion),vectorValues:F("object")};function Zo(n,e,t){if((e=me(e))instanceof Qo)return e._internalPath;if(typeof e=="string")return md(n,e);throw ki("Field path arguments must be of type string or ",n)}const gd=new RegExp("[~\\*/\\[\\]]");function md(n,e,t){if(e.search(gd)>=0)throw ki(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new Qo(...e.split("."))._internalPath}catch{throw ki(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function ki(n,e,t,s,r){let c=`Function ${e}() called with invalid data`;c+=". ";let h="";return new O(N.INVALID_ARGUMENT,c+n+h)}const $r="@firebase/firestore",Hr="4.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e,t,s,r,c){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=r,this._converter=c}get id(){return this._key.path.lastSegment()}get ref(){return new de(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new yd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Zo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class yd extends ea{data(){return super.data()}}class dn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class pt extends ea{constructor(e,t,s,r,c,h){super(e,t,s,r,h),this._firestore=e,this._firestoreImpl=e,this.metadata=c}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new _n(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(Zo("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(N.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=pt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}pt._jsonSchemaVersion="firestore/documentSnapshot/1.0",pt._jsonSchema={type:F("string",pt._jsonSchemaVersion),bundleSource:F("string","DocumentSnapshot"),bundleName:F("string"),bundle:F("string")};class _n extends pt{data(e={}){return super.data(e)}}class Bt{constructor(e,t,s,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new dn(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new _n(this._firestore,this._userDataWriter,s.key,s,new dn(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new O(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,c){if(r._snapshot.oldDocs.isEmpty()){let h=0;return r._snapshot.docChanges.map(g=>{const w=new _n(r._firestore,r._userDataWriter,g.doc.key,g.doc,new dn(r._snapshot.mutatedKeys.has(g.doc.key),r._snapshot.fromCache),r.query.converter);return g.doc,{type:"added",doc:w,oldIndex:-1,newIndex:h++}})}{let h=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(g=>c||g.type!==3).map(g=>{const w=new _n(r._firestore,r._userDataWriter,g.doc.key,g.doc,new dn(r._snapshot.mutatedKeys.has(g.doc.key),r._snapshot.fromCache),r.query.converter);let T=-1,b=-1;return g.type!==0&&(T=h.indexOf(g.doc.key),h=h.delete(g.doc.key)),g.type!==1&&(h=h.add(g.doc),b=h.indexOf(g.doc.key)),{type:_d(g.type),doc:w,oldIndex:T,newIndex:b}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(N.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Bt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=qu.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],r=[];return this.docs.forEach(c=>{c._document!==null&&(t.push(c._document),s.push(this._userDataWriter.convertObjectMap(c._document.data.value.mapValue.fields,"previous")),r.push(c.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function _d(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return zt(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Bt._jsonSchemaVersion="firestore/querySnapshot/1.0",Bt._jsonSchema={type:F("string",Bt._jsonSchemaVersion),bundleSource:F("string","QuerySnapshot"),bundleName:F("string"),bundle:F("string")};(function(e,t=!0){ju(_t),ge(new se("firestore",(s,{instanceIdentifier:r,options:c})=>{const h=s.getProvider("app").getImmediate(),g=new fd(new $u(s.getProvider("auth-internal")),new Wu(h,s.getProvider("app-check-internal")),sd(h,r),h);return c={useFetchStreams:t,...c},g._setSettings(c),g},"PUBLIC").setMultipleInstances(!0)),ee($r,Hr,e),ee($r,Hr,"esm2020")})();const ta="@firebase/installations",Ji="0.6.22";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na=1e4,ia=`w:${Ji}`,sa="FIS_v2",wd="https://firebaseinstallations.googleapis.com/v1",Id=60*60*1e3,vd="installations",Td="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ed={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},tt=new it(vd,Td,Ed);function ra(n){return n instanceof re&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa({projectId:n}){return`${wd}/projects/${n}/installations`}function aa(n){return{token:n.token,requestStatus:2,expiresIn:bd(n.expiresIn),creationTime:Date.now()}}async function ca(n,e){const s=(await e.json()).error;return tt.create("request-failed",{requestName:n,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function ha({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function Ad(n,{refreshToken:e}){const t=ha(n);return t.append("Authorization",Sd(e)),t}async function la(n){const e=await n();return e.status>=500&&e.status<600?n():e}function bd(n){return Number(n.replace("s","000"))}function Sd(n){return`${sa} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cd({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const s=oa(n),r=ha(n),c=e.getImmediate({optional:!0});if(c){const T=await c.getHeartbeatsHeader();T&&r.append("x-firebase-client",T)}const h={fid:t,authVersion:sa,appId:n.appId,sdkVersion:ia},g={method:"POST",headers:r,body:JSON.stringify(h)},w=await la(()=>fetch(s,g));if(w.ok){const T=await w.json();return{fid:T.fid||t,registrationStatus:2,refreshToken:T.refreshToken,authToken:aa(T.authToken)}}else throw await ca("Create Installation",w)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ua(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rd(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd=/^[cdef][\w-]{21}$/,Ni="";function kd(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=Nd(n);return Pd.test(t)?t:Ni}catch{return Ni}}function Nd(n){return Rd(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=new Map;function fa(n,e){const t=Ln(n);pa(t,e),Od(t,e)}function pa(n,e){const t=da.get(n);if(t)for(const s of t)s(e)}function Od(n,e){const t=Dd();t&&t.postMessage({key:n,fid:e}),Ld()}let Je=null;function Dd(){return!Je&&"BroadcastChannel"in self&&(Je=new BroadcastChannel("[Firebase] FID Change"),Je.onmessage=n=>{pa(n.data.key,n.data.fid)}),Je}function Ld(){da.size===0&&Je&&(Je.close(),Je=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md="firebase-installations-database",xd=1,nt="firebase-installations-store";let _i=null;function Xi(){return _i||(_i=uo(Md,xd,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(nt)}}})),_i}async function Rn(n,e){const t=Ln(n),r=(await Xi()).transaction(nt,"readwrite"),c=r.objectStore(nt),h=await c.get(t);return await c.put(e,t),await r.done,(!h||h.fid!==e.fid)&&fa(n,e.fid),e}async function ga(n){const e=Ln(n),s=(await Xi()).transaction(nt,"readwrite");await s.objectStore(nt).delete(e),await s.done}async function Mn(n,e){const t=Ln(n),r=(await Xi()).transaction(nt,"readwrite"),c=r.objectStore(nt),h=await c.get(t),g=e(h);return g===void 0?await c.delete(t):await c.put(g,t),await r.done,g&&(!h||h.fid!==g.fid)&&fa(n,g.fid),g}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yi(n){let e;const t=await Mn(n.appConfig,s=>{const r=Ud(s),c=jd(n,r);return e=c.registrationPromise,c.installationEntry});return t.fid===Ni?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Ud(n){const e=n||{fid:kd(),registrationStatus:0};return ma(e)}function jd(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(tt.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=Fd(n,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Vd(n)}:{installationEntry:e}}async function Fd(n,e){try{const t=await Cd(n,e);return Rn(n.appConfig,t)}catch(t){throw ra(t)&&t.customData.serverCode===409?await ga(n.appConfig):await Rn(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function Vd(n){let e=await zr(n.appConfig);for(;e.registrationStatus===1;)await ua(100),e=await zr(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await Yi(n);return s||t}return e}function zr(n){return Mn(n,e=>{if(!e)throw tt.create("installation-not-found");return ma(e)})}function ma(n){return Bd(n)?{fid:n.fid,registrationStatus:0}:n}function Bd(n){return n.registrationStatus===1&&n.registrationTime+na<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $d({appConfig:n,heartbeatServiceProvider:e},t){const s=Hd(n,t),r=Ad(n,t),c=e.getImmediate({optional:!0});if(c){const T=await c.getHeartbeatsHeader();T&&r.append("x-firebase-client",T)}const h={installation:{sdkVersion:ia,appId:n.appId}},g={method:"POST",headers:r,body:JSON.stringify(h)},w=await la(()=>fetch(s,g));if(w.ok){const T=await w.json();return aa(T)}else throw await ca("Generate Auth Token",w)}function Hd(n,{fid:e}){return`${oa(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qi(n,e=!1){let t;const s=await Mn(n.appConfig,c=>{if(!ya(c))throw tt.create("not-registered");const h=c.authToken;if(!e&&Gd(h))return c;if(h.requestStatus===1)return t=zd(n,e),c;{if(!navigator.onLine)throw tt.create("app-offline");const g=Kd(c);return t=Wd(n,g),g}});return t?await t:s.authToken}async function zd(n,e){let t=await Wr(n.appConfig);for(;t.authToken.requestStatus===1;)await ua(100),t=await Wr(n.appConfig);const s=t.authToken;return s.requestStatus===0?Qi(n,e):s}function Wr(n){return Mn(n,e=>{if(!ya(e))throw tt.create("not-registered");const t=e.authToken;return Jd(t)?{...e,authToken:{requestStatus:0}}:e})}async function Wd(n,e){try{const t=await $d(n,e),s={...e,authToken:t};return await Rn(n.appConfig,s),t}catch(t){if(ra(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await ga(n.appConfig);else{const s={...e,authToken:{requestStatus:0}};await Rn(n.appConfig,s)}throw t}}function ya(n){return n!==void 0&&n.registrationStatus===2}function Gd(n){return n.requestStatus===2&&!qd(n)}function qd(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+Id}function Kd(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function Jd(n){return n.requestStatus===1&&n.requestTime+na<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xd(n){const e=n,{installationEntry:t,registrationPromise:s}=await Yi(e);return s?s.catch(console.error):Qi(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yd(n,e=!1){const t=n;return await Qd(t),(await Qi(t,e)).token}async function Qd(n){const{registrationPromise:e}=await Yi(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zd(n){if(!n||!n.options)throw wi("App Configuration");if(!n.name)throw wi("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw wi(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function wi(n){return tt.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a="installations",ef="installations-internal",tf=n=>{const e=n.getProvider("app").getImmediate(),t=Zd(e),s=st(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},nf=n=>{const e=n.getProvider("app").getImmediate(),t=st(e,_a).getImmediate();return{getId:()=>Xd(t),getToken:r=>Yd(t,r)}};function sf(){ge(new se(_a,tf,"PUBLIC")),ge(new se(ef,nf,"PRIVATE"))}sf();ee(ta,Ji);ee(ta,Ji,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn="analytics",rf="firebase_id",of="origin",af=60*1e3,cf="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Zi="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K=new Nn("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hf={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Y=new it("analytics","Analytics",hf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lf(n){if(!n.startsWith(Zi)){const e=Y.create("invalid-gtag-resource",{gtagURL:n});return K.warn(e.message),""}return n}function wa(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function uf(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function df(n,e){const t=uf("firebase-js-sdk-policy",{createScriptURL:lf}),s=document.createElement("script"),r=`${Zi}?l=${n}&id=${e}`;s.src=t?t==null?void 0:t.createScriptURL(r):r,s.async=!0,document.head.appendChild(s)}function ff(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function pf(n,e,t,s,r,c){const h=s[r];try{if(h)await e[h];else{const w=(await wa(t)).find(T=>T.measurementId===r);w&&await e[w.appId]}}catch(g){K.error(g)}n("config",r,c)}async function gf(n,e,t,s,r){try{let c=[];if(r&&r.send_to){let h=r.send_to;Array.isArray(h)||(h=[h]);const g=await wa(t);for(const w of h){const T=g.find(A=>A.measurementId===w),b=T&&e[T.appId];if(b)c.push(b);else{c=[];break}}}c.length===0&&(c=Object.values(e)),await Promise.all(c),n("event",s,r||{})}catch(c){K.error(c)}}function mf(n,e,t,s){async function r(c,...h){try{if(c==="event"){const[g,w]=h;await gf(n,e,t,g,w)}else if(c==="config"){const[g,w]=h;await pf(n,e,t,s,g,w)}else if(c==="consent"){const[g,w]=h;n("consent",g,w)}else if(c==="get"){const[g,w,T]=h;n("get",g,w,T)}else if(c==="set"){const[g]=h;n("set",g)}else n(c,...h)}catch(g){K.error(g)}}return r}function yf(n,e,t,s,r){let c=function(...h){window[s].push(arguments)};return window[r]&&typeof window[r]=="function"&&(c=window[r]),window[r]=mf(c,n,e,t),{gtagCore:c,wrappedGtag:window[r]}}function _f(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(Zi)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wf=30,If=1e3;class vf{constructor(e={},t=If){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ia=new vf;function Tf(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function Ef(n){var h;const{appId:e,apiKey:t}=n,s={method:"GET",headers:Tf(t)},r=cf.replace("{app-id}",e),c=await fetch(r,s);if(c.status!==200&&c.status!==304){let g="";try{const w=await c.json();(h=w.error)!=null&&h.message&&(g=w.error.message)}catch{}throw Y.create("config-fetch-failed",{httpStatus:c.status,responseMessage:g})}return c.json()}async function Af(n,e=Ia,t){const{appId:s,apiKey:r,measurementId:c}=n.options;if(!s)throw Y.create("no-app-id");if(!r){if(c)return{measurementId:c,appId:s};throw Y.create("no-api-key")}const h=e.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},g=new Cf;return setTimeout(async()=>{g.abort()},af),va({appId:s,apiKey:r,measurementId:c},h,g,e)}async function va(n,{throttleEndTimeMillis:e,backoffCount:t},s,r=Ia){var g;const{appId:c,measurementId:h}=n;try{await bf(s,e)}catch(w){if(h)return K.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${w==null?void 0:w.message}]`),{appId:c,measurementId:h};throw w}try{const w=await Ef(n);return r.deleteThrottleMetadata(c),w}catch(w){const T=w;if(!Sf(T)){if(r.deleteThrottleMetadata(c),h)return K.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${T==null?void 0:T.message}]`),{appId:c,measurementId:h};throw w}const b=Number((g=T==null?void 0:T.customData)==null?void 0:g.httpStatus)===503?nr(t,r.intervalMillis,wf):nr(t,r.intervalMillis),A={throttleEndTimeMillis:Date.now()+b,backoffCount:t+1};return r.setThrottleMetadata(c,A),K.debug(`Calling attemptFetch again in ${b} millis`),va(n,A,s,r)}}function bf(n,e){return new Promise((t,s)=>{const r=Math.max(e-Date.now(),0),c=setTimeout(t,r);n.addEventListener(()=>{clearTimeout(c),s(Y.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Sf(n){if(!(n instanceof re)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class Cf{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Rf(n,e,t,s,r){if(r&&r.global){n("event",t,s);return}else{const c=await e,h={...s,send_to:c};n("event",t,h)}}async function Pf(n,e,t,s){if(s&&s.global){const r={};for(const c of Object.keys(t))r[`user_properties.${c}`]=t[c];return n("set",r),Promise.resolve()}else{const r=await e;n("config",r,{update:!0,user_properties:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kf(){if(oo())try{await ao()}catch(n){return K.warn(Y.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return K.warn(Y.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Nf(n,e,t,s,r,c,h){const g=Af(n);g.then(P=>{t[P.measurementId]=P.appId,n.options.measurementId&&P.measurementId!==n.options.measurementId&&K.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${P.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(P=>K.error(P)),e.push(g);const w=kf().then(P=>{if(P)return s.getId()}),[T,b]=await Promise.all([g,w]);_f(c)||df(c,T.measurementId),r("js",new Date);const A=(h==null?void 0:h.config)??{};return A[of]="firebase",A.update=!0,b!=null&&(A[rf]=b),r("config",T.measurementId,A),T.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{constructor(e){this.app=e}_delete(){return delete gt[this.app.options.appId],Promise.resolve()}}let gt={},Gr=[];const qr={};let Ii="dataLayer",Df="gtag",Kr,es,Jr=!1;function Lf(){const n=[];if(ro()&&n.push("This is a browser extension environment."),wc()||n.push("Cookies are not available."),n.length>0){const e=n.map((s,r)=>`(${r+1}) ${s}`).join(" "),t=Y.create("invalid-analytics-context",{errorInfo:e});K.warn(t.message)}}function Mf(n,e,t){Lf();const s=n.options.appId;if(!s)throw Y.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)K.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Y.create("no-api-key");if(gt[s]!=null)throw Y.create("already-exists",{id:s});if(!Jr){ff(Ii);const{wrappedGtag:c,gtagCore:h}=yf(gt,Gr,qr,Ii,Df);es=c,Kr=h,Jr=!0}return gt[s]=Nf(n,Gr,qr,e,Kr,Ii,t),new Of(n)}function xf(n=Li()){n=me(n);const e=st(n,Pn);return e.isInitialized()?e.getImmediate():Uf(n)}function Uf(n,e={}){const t=st(n,Pn);if(t.isInitialized()){const r=t.getImmediate();if(Fe(e,t.getOptions()))return r;throw Y.create("already-initialized")}return t.initialize({options:e})}function jf(n,e,t){n=me(n),Pf(es,gt[n.app.options.appId],e,t).catch(s=>K.error(s))}function Ff(n,e,t,s){n=me(n),Rf(es,gt[n.app.options.appId],e,t,s).catch(r=>K.error(r))}const Xr="@firebase/analytics",Yr="0.10.22";function Vf(){ge(new se(Pn,(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return Mf(s,r,t)},"PUBLIC")),ge(new se("analytics-internal",n,"PRIVATE")),ee(Xr,Yr),ee(Xr,Yr,"esm2020");function n(e){try{const t=e.getProvider(Pn).getImmediate();return{logEvent:(s,r,c)=>Ff(t,s,r,c),setUserProperties:(s,r)=>jf(t,s,r)}}catch(t){throw Y.create("interop-component-reg-failed",{reason:t})}}}Vf();const Qr={apiKey:"AIzaSyBTZveJffu2Ed33hhU_G025FVMedIKyg28",authDomain:"mindwave-binaural-beats.firebaseapp.com",projectId:"mindwave-binaural-beats",storageBucket:"mindwave-binaural-beats.firebasestorage.app",messagingSenderId:"281133643186",appId:"1:281133643186:web:f61fb74e2fcf4cc4e660ab",measurementId:"G-TENPZ98XDX"};let fn,Bf,$f,Hf=null;try{fn=fo(Qr),Bf=Lu(fn),$f=pd(fn),typeof window<"u"&&Qr.measurementId&&(Hf=xf(fn))}catch{}const zf=Ut.createContext();function Wf(){return Ut.useContext(zf)}const Gf="/assets/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990-CjqVR0iz.png",Jf=()=>{const[n,e]=Ut.useState(!1),[t,s]=Ut.useState(!1);nc();const r=ic(),c=Wf(),h=c==null?void 0:c.currentUser,g=c==null?void 0:c.logout;Ut.useEffect(()=>{const T=()=>{s(window.scrollY>10)};return window.addEventListener("scroll",T),()=>window.removeEventListener("scroll",T)},[]);const w=()=>{e(!n)};return R.jsx("header",{className:`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${t?"bg-[#050505]/95 backdrop-blur-md shadow-lg border-b border-white/5":"bg-transparent"}`,children:R.jsxs("div",{className:"w-full",children:[R.jsxs("div",{className:"flex items-center justify-between h-16 px-6 lg:px-8",children:[R.jsx(ci,{to:"/",className:"flex items-center space-x-3 transition-transform duration-300",children:R.jsx("div",{className:"relative",children:R.jsxs("div",{className:"flex items-center justify-center",children:[R.jsx("div",{className:"flex items-center justify-center",children:R.jsx("img",{src:Gf,alt:"sentAIent",className:"h-24 md:h-32 w-auto object-contain opacity-90"})}),R.jsx("div",{className:"absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"})]})})}),R.jsxs("nav",{className:"hidden lg:flex items-center space-x-2",children:[R.jsxs("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-400 hover:text-white hover:bg-white/5",children:[R.jsx(xt,{name:"Home",size:16}),R.jsx("span",{children:"Home"})]}),R.jsxs("button",{onClick:()=>{var T;return(T=document.getElementById("platforms"))==null?void 0:T.scrollIntoView({behavior:"smooth"})},className:"flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-400 hover:text-white hover:bg-white/5",children:[R.jsx(xt,{name:"Layout",size:16}),R.jsx("span",{children:"Our Platforms"})]}),R.jsx("button",{onClick:()=>window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),className:"flex items-center space-x-2 px-6 py-2 ml-2 rounded-full text-sm font-medium transition-colors duration-200 bg-white/10 text-white hover:bg-white/20 border border-white/10",children:R.jsx("span",{children:"Contact Us"})}),h?R.jsx("button",{onClick:async()=>{try{await g(),r("/")}catch{}},className:"flex items-center space-x-2 px-6 py-2 ml-2 rounded-full text-sm font-medium transition-colors duration-200 bg-red-600/10 text-red-500 hover:bg-red-600/20 border border-red-500/20",children:R.jsx("span",{children:"Log Out"})}):R.jsx(ci,{to:"/login",className:"flex items-center space-x-2 px-6 py-2 ml-2 rounded-full text-sm font-medium transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20",children:R.jsx("span",{children:"Login"})})]}),R.jsx("button",{onClick:w,className:"lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-300","aria-label":"Toggle mobile menu",children:R.jsx(xt,{name:n?"X":"Menu",size:24,className:"transition-transform duration-300"})})]}),R.jsx("div",{className:`lg:hidden transition-all duration-300 overflow-hidden ${n?"max-h-screen opacity-100":"max-h-0 opacity-0"}`,children:R.jsx("div",{className:"px-6 py-4 bg-[#0A0A0B] border-t border-white/5",children:R.jsxs("nav",{className:"space-y-2",children:[R.jsxs("button",{onClick:()=>{e(!1),window.scrollTo({top:0,behavior:"smooth"})},className:"w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-400 hover:text-white hover:bg-white/5",children:[R.jsx(xt,{name:"Home",size:18}),R.jsx("span",{children:"Home"})]}),R.jsxs("button",{onClick:()=>{var T;e(!1),(T=document.getElementById("platforms"))==null||T.scrollIntoView({behavior:"smooth"})},className:"w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-400 hover:text-white hover:bg-white/5",children:[R.jsx(xt,{name:"Layout",size:18}),R.jsx("span",{children:"Our Platforms"})]}),R.jsx("button",{onClick:()=>{e(!1),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})},className:"w-full flex items-center justify-center space-x-2 px-4 py-3 mt-4 rounded-lg text-sm font-medium transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-500",children:R.jsx("span",{children:"Contact Us"})}),h?R.jsx("button",{onClick:async()=>{e(!1);try{await g(),r("/")}catch{}},className:"w-full flex items-center justify-center space-x-2 px-4 py-3 mt-4 rounded-lg text-sm font-medium transition-colors duration-200 bg-red-600/10 text-red-500 hover:bg-red-600/20 border border-red-500/20",children:R.jsx("span",{children:"Log Out"})}):R.jsx(ci,{to:"/login",onClick:()=>e(!1),className:"w-full flex items-center justify-center space-x-2 px-4 py-3 mt-4 rounded-lg text-sm font-medium transition-colors duration-200 bg-white/10 text-white hover:bg-white/20 border border-white/10",children:R.jsx("span",{children:"Login"})})]})})})]})})};export{Jf as H,Gf as l,Wf as u};
//# sourceMappingURL=Header-pBAKXakB.js.map
