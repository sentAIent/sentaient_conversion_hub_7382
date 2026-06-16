var Ge=Object.defineProperty;var ze=(y,e,t)=>e in y?Ge(y,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):y[e]=t;var ne=(y,e,t)=>ze(y,typeof e!="symbol"?e+"":e,t);import{c as g,a6 as le,e as O}from"./controls_v3-B3G4FKpb.js";import{C as F,G as L,S as Ie,P as Te,W as Le,I as ee,M as _,a as P,A as G,B as H,b as W,c as B,d as k,E as ie,e as ae,L as $,f as Q,O as Pe,g as he,h as se,i as te,F as N,j as oe,D as Y,k as Fe,T as ce,l as Re,m as de,n as ue,o as J,R as Ae,p as De,V as me,q as _e,r as j,s as Ee,t as Ve,u as Be,N as fe,v as Oe,w as We,x as pe,y as ve}from"./three-BCNwNaIT.js";import{C as He}from"./CymaticsCore-CxwyESa-.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";let u=null;class ge{constructor(e,t={}){this.canvas=e,this.activeModes=t.activeModes||new Set,this.mode=t.mode||"none",this.mindWaveMode=t.mindWaveMode!==void 0?t.mindWaveMode:!0,this.galaxySunStyle=t.galaxySunStyle||"sun",this.currentCymaticData={name:"Fundamental Zenith",n:1,m:1,energy:.2},this.cymaticsHistory=[],this.cymaticsHistoryIndex=-1,this._cymaticDriftOffset=Math.random()*1e3,this.cyberConfig={logicMode:t.cyberLogicMode||"matrix",customText:t.cyberCustomText||"WELCOME",angle:t.cyberAngle||0,speed:t.cyberSpeedMultiplier||1,length:1,color:"#00FF41",rainbow:!0},this.matrixConfig={logicMode:t.matrixLogicMode||"interstellar",customText:t.matrixCustomText||"MINDWAVE",angle:0,speed:1,length:1,color:"#00FF41",rainbow:!1},this.initialized=!1,this._rainbowEnabled=t.rainbowEnabled||!1,this.isVisualizer3D=!0,this.overlayCanvas=document.getElementById("cyberCanvas"),this.overlayCtx=this.overlayCanvas?this.overlayCanvas.getContext("2d",{alpha:!0}):null,this.overlayCanvas&&(this.resizeOverlayCanvas(),window.addEventListener("resize",()=>this.resizeOverlayCanvas())),this.matrixCyberStreams=[],this.currentCyberAngle=t.cyberAngle!==void 0?t.cyberAngle:0,this.cyberColorCustomized=!1;try{const a=localStorage.getItem("cyberThemeHistory");this.themeHistory=a?JSON.parse(a):[],this.lastCyberFamily=localStorage.getItem("cyberLastFamily")||""}catch{this.themeHistory=[],this.lastCyberFamily=""}this.currentLogoOpacity=.8,this.targetLogoOpacity=.8,u=this,this.themeType=document.body.dataset.themeType||"dark";const i=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);this.batterySaver=t.batterySaver!==void 0?t.batterySaver:i,this.isLowPower=this.batterySaver||localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode"),this.lastFrameRenderTime=0,this.targetFPS=this.isLowPower?30:60,this.vibrationEnabled=typeof g<"u"&&g.visualVibration!==void 0?g.visualVibration:t.visualVibration!==void 0?t.visualVibration:!1,this._fpsRingBuffer=new Float64Array(60),this._fpsRingIndex=0,this._fpsRingCount=0,this.lastLodDegradation=0,this.currentLodLevel="high",this._tempColor=new F,this._logoRenderCanvas=null,this.sphereGroup=new L,this.particleGroup=new L,this.lightspeedGroup=new L,this.lavaGroup=new L,this.fireplaceGroup=new L,this.rainforestGroup=new L,this.zenGardenGroup=new L,this.oceanGroup=new L,this.wavesGroup=new L,this.cyberGroup=new L,this.boxGroup=new L,this.dragonGroup=new L,this.galaxyGroup=new L,this.mandalaGroup=new L,this.cymaticsGroup=new L,this.snowflakeGroup=new L,this._snowData=null;try{this.scene=new Ie,this.cymaticsCore=new He(this.cymaticsGroup),[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup].forEach(s=>this.scene.add(s)),this.camera=new Te(75,e.width/e.height,.1,1e3),this.renderer=new Le({canvas:e,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(0,0),this.renderer.setSize(e.clientWidth,e.clientHeight);const o=this.isLowPower?1:2;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,o)),this.textures={},this.customColors={},this.customColor=null,this._isRendering=!1,this._freqDataArray=null,this.initEnvironment(),this.camera.position.z=5,this.handleLayoutChange=this.handleLayoutChange.bind(this),window.addEventListener("resize",()=>{this.resize(),this.handleLayoutChange()}),window.addEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode=()=>{this.currentLodLevel!=="low"&&(this.degradeLOD(),this.degradeLOD())},window.addEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange=()=>{document.hidden||(this.lastTime=performance.now()*.001,this.active!==!1&&this.initialized&&this.render(g.analyserLeft,g.analyserRight))},document.addEventListener("visibilitychange",this._boundVisibilityChange),this._boundContextLost=s=>{s.preventDefault(),this.active=!1,g.animationId&&(cancelAnimationFrame(g.animationId),g.animationId=null)},e.addEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored=()=>{try{this.initialized=!1,this._freqDataArray=null,this.initEnvironment(),this.updateVisibility(),this.initialized=!0,this.active=!0,this.lastTime=performance.now()*.001,g.animationId&&cancelAnimationFrame(g.animationId),this._isRendering=!1,this.render(g.analyserLeft,g.analyserRight)}catch{}},e.addEventListener("webglcontextrestored",this._boundContextRestored),this._boundCymaticPointer=s=>{const r=s.touches?s.touches[0].clientX:s.clientX,n=s.touches?s.touches[0].clientY:s.clientY;this.mouseX=r/window.innerWidth*2-1,this.mouseY=-(n/window.innerHeight)*2+1},window.addEventListener("mousemove",this._boundCymaticPointer),window.addEventListener("touchmove",this._boundCymaticPointer,{passive:!0}),this.resize(),setTimeout(this.handleLayoutChange,100),this._boundThemeChange=s=>{if(s.detail&&s.detail.type){const r=s.detail.type;this.themeType!==r&&(this.themeType=r,this.updateLogoTexture())}},window.addEventListener("themeChanged",this._boundThemeChange),this.speedMultiplier=1,this.brightnessMultiplier=1,this.lastTime=performance.now()*.001,this.simTime=0,this.targetFPS=60,this.lastFrameRenderTime=0,this.active=!0,this.updateVisibility(),this.initialized=!0,this.initOverlayLogo(),window.viz3D=this}catch{this.initialized=!1}}resize(){if(!this.renderer||!this.canvas||!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.handleLayoutChange()}handleLayoutChange(){!this.renderer||!this.camera||this.camera.clearViewOffset()}resizeOverlayCanvas(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight)}generateCyberStyle(){const e=this.overlayCanvas,t=this.overlayCtx;if(!e||!t)return;this.matrixCyberStreams=[];const i=Math.max(11,Math.min(21,Math.floor(e.width/50)));this.isLowPower=localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode");let a=Math.ceil(e.width/i);this.isLowPower||(a*=1.5);let o=window.getCurrentTheme?window.getCurrentTheme():{color:"#2dd4bf"};this.resizeOverlayCanvas(),this.cyberColorCustomized=!1;const s=[{name:"System Yellow",color:"#FFFF00",family:"yellow"},{name:"Neon Pink",color:"#FF1493",family:"pink"},{name:"Chrome Static",color:"#C0C0C0",family:"mono"},{name:"Royal Data",color:"#4169E1",family:"blue"},{name:"White Noise",color:"#FFFFFF",family:"mono"},{name:"Cyan Future",color:"#00FFFF",family:"blue"},{name:"Lime Access",color:"#32CD32",family:"green"},{name:"Purple Haze",color:"#800080",family:"purple"},{name:"Emerald Link",color:"#50C878",family:"green"},{name:"Ice Blue",color:"#A5F2F3",family:"blue"},{name:"sentAIent Blue",color:"#60A9FF",family:"blue"},{name:"Rainbow Surge",color:"rainbow",family:"rainbow"}],r=this.lastCyberFamily||"";let n=s.filter(c=>!this.themeHistory.includes(c.name));const f=n.filter(c=>c.family!==r);f.length>0&&(n=f);let m=n;if(m.length===0){const c=this.themeHistory[this.themeHistory.length-1];m=s.filter(h=>h.name!==c)}const l=m[Math.floor(Math.random()*m.length)];this.themeHistory.push(l.name),this.themeHistory.length>5&&this.themeHistory.shift(),this.lastCyberFamily=l.family;try{localStorage.setItem("cyberThemeHistory",JSON.stringify(this.themeHistory)),localStorage.setItem("cyberLastFamily",this.lastCyberFamily)}catch{}this.cyberSpeedMultiplier===void 0&&(this.cyberSpeedMultiplier=.2),this.cyberLengthMultiplier===void 0&&(this.cyberLengthMultiplier=.7);const v=document.getElementById("cyberRainbowToggle");if(v&&this.cyberRainbowMode===void 0&&(this.cyberRainbowMode=!0,this.cyberConfig.rainbow=!0,v.checked=!0),!this.cyberRainbowMode&&o.color!=="rainbow"){this.cyberColor=o.color;const c=document.getElementById("cyberColorPicker");c&&(c.value=this.cyberColor)}for(let c=0;c<a;c++){const h=Math.random(),p=Math.floor(8+h*11),z=(2+h*8+Math.random()*2)*this.cyberSpeedMultiplier;this.matrixCyberStreams.push({x:c*i,y:Math.random()*this.overlayCanvas.height*1.5-this.overlayCanvas.height*.5,baseSpeed:z,opacity:.2+h*.8,size:p,chars:[],color:o.color!=="rainbow"?o.color:"#FFFFFF"})}this.updateCyberStrings(),this.matrixCyberStreams.sort((c,h)=>c.size-h.size)}renderCyberCyber(){const e=this.activeModes.has("cyber");if(!this.overlayCtx||!this.matrixCyberStreams||!e)return;const t=this.overlayCtx,i=this.overlayCanvas;t.clearRect(0,0,i.width,i.height);const a=this.activeModes.size>1;t.fillStyle=a?"rgba(0, 0, 0, 0.4)":"rgba(0, 0, 0, 0.85)",t.fillRect(0,0,i.width,i.height),t.save(),t.textAlign="center";const o=this.cyberConfig,s=o.speed||1,r=o.length||1;o.angle!==0&&(t.translate(i.width/2,i.height/2),t.rotate(o.angle*Math.PI/180),t.translate(-i.width/2,-i.height/2));const n=20,f=Date.now()*.1;t.textBaseline="middle";let m=-1;this.matrixCyberStreams.forEach((l,v)=>{l.y+=l.baseSpeed*s;let c=Math.max(3,Math.floor(n*r));(this.isLowPower||this.currentLodLevel==="low")&&(c=Math.floor(c*.4)),l.y-c*l.size>i.height*1.5&&(l.y=0);const h="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";l.size!==m&&(t.font=`${l.size}px monospace`,m=l.size);const p=this.isLowPower&&this.currentLodLevel==="low"?2:1;for(let z=0;z<c&&z<l.chars.length;z+=p){!l.isTextMode&&Math.random()<.02&&(l.chars[z]=h.charAt(Math.floor(Math.random()*h.length)));const R=l.chars[z],I=l.y-z*l.size;if(I<-l.size*2||I>i.height*1.5)continue;const S=1-z/c,T=Math.pow(S,.4)*(l.opacity*1.2);if(t.globalAlpha=Math.min(1,T),this.cyberRainbowMode){const b=(f+v*15+z*5)%360;t.fillStyle=`hsl(${b}, 100%, 60%)`}else t.fillStyle=l.color||this.cyberColor;t.fillText(R,l.x,I)}}),t.shadowBlur=0,t.globalAlpha=1,t.restore()}initSphere(){var s;const e=new ee(2,2),t=new _({color:6334975,wireframe:!0,transparent:!0,opacity:.5});this.sphere=new P(e,t);const i=new ee(1.8,1),a=new _({color:6334975,transparent:!0,opacity:.1,blending:G});this.core=new P(i,a),this.sphereGroup.add(this.sphere),this.sphereGroup.add(this.core),this.sphereGroup.visible=!1;const o=((s=this.customColors)==null?void 0:s.sphere)||this.customColor;o&&(this.sphere.material.color.copy(o),this.core.material.color.copy(o))}initLightspeed(){const t=new H,i=new Float32Array(2e3*3);for(let a=0;a<2e3*3;a++)i[a]=(Math.random()-.5)*80;t.setAttribute("position",new W(i,3)),this.lightspeedMaterial=new B({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new F(3003583)},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:G,depthWrite:!1}),this.lightspeed=new k(t,this.lightspeedMaterial),this.lightspeedGroup.add(this.lightspeed)}initParticles(){const e=this.batterySaver?400:1e3,t=new H,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let o=0;o<e;o++){const s=o*3;i[s]=(Math.random()-.5)*60,i[s+1]=(Math.random()-.5)*60,i[s+2]=(Math.random()-.5)*80;const r=Math.random();r<.3?(a[s]=.4,a[s+1]=.7,a[s+2]=1):r<.6?(a[s]=.3,a[s+1]=.9,a[s+2]=.95):r<.85?(a[s]=.6,a[s+1]=.4,a[s+2]=1):(a[s]=.9,a[s+1]=.9,a[s+2]=1)}t.setAttribute("position",new W(i,3)),t.setAttribute("color",new W(a,3)),this.particleMaterial=new B({uniforms:{uTime:{value:0},uSpeed:{value:1},uSize:{value:.4},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:G,depthWrite:!1}),this.particles=new k(t,this.particleMaterial),this.particleGroup.add(this.particles),this.particleGroup.visible=!1}initBox(){var m;this.boxOuter=new L;const e=new ie(new ae(3,3,3)),t=new $({color:16777215,transparent:!0,opacity:.9,blending:G}),i=new $({color:3900150,transparent:!0,opacity:.5,blending:G});this.boxOuter.add(new Q(e,t));for(let l=1;l<=3;l++){const v=new Q(e,i);v.scale.setScalar(1+l*.012),this.boxOuter.add(v)}const a=new ie(new ae(2,2,2)),o=new $({color:14742270,transparent:!0,opacity:.8,blending:G}),s=new $({color:6333946,transparent:!0,opacity:.4,blending:G});this.boxInner=new L,this.boxInner.add(new Q(a,o));for(let l=1;l<=2;l++){const v=new Q(a,s);v.scale.setScalar(1+l*.015),this.boxInner.add(v)}const r=new ie(new ae(3.05,3.05,3.05)),n=new $({color:9684477,transparent:!0,opacity:.8,blending:G});this.boxEdges=new Q(r,n),this.boxGroup.add(this.boxOuter),this.boxGroup.add(this.boxInner),this.boxGroup.add(this.boxEdges),this.boxGroup.visible=!1;const f=((m=this.customColors)==null?void 0:m.box)||this.customColor;f&&(this.boxOuter.children.forEach(l=>l.material.color.copy(f)),this.boxInner.children.forEach(l=>l.material.color.copy(f)),this.boxEdges&&this.boxEdges.material&&this.boxEdges.material.color.copy(f))}initDragon(){var v;this.dragonDummy=new Pe,this.dragonLength=80;const e=new ee(.8,1),t=new _({color:15680580,wireframe:!0,transparent:!0,opacity:.8,blending:G}),i=new ee(.5,1),a=new _({color:16096779,wireframe:!1,transparent:!0,opacity:.6,blending:G});this.dragonBodyInstanced=new he(e,t,this.dragonLength),this.dragonGlowInstanced=new he(i,a,this.dragonLength);const o=new se(1.5,3.5,5);o.rotateX(Math.PI/2);const s=new _({color:16638023,wireframe:!0,transparent:!0,opacity:.9,blending:G});this.dragonHead=new P(o,s),this.dragonPearlGroup=new L;const r=new te(1,16,16),n=new _({color:3718648,wireframe:!1,transparent:!0,opacity:.9,blending:G}),f=new te(1.3,16,16),m=new _({color:8246268,wireframe:!0,transparent:!0,opacity:.5,blending:G});this.dragonPearl=new P(r,n),this.dragonPearlHalo=new P(f,m),this.dragonPearlGroup.add(this.dragonPearl),this.dragonPearlGroup.add(this.dragonPearlHalo),this.dragonGroup.add(this.dragonBodyInstanced),this.dragonGroup.add(this.dragonGlowInstanced),this.dragonGroup.add(this.dragonHead),this.dragonGroup.add(this.dragonPearlGroup),this.dragonGroup.visible=!1;const l=((v=this.customColors)==null?void 0:v.dragon)||this.customColor;l&&this.updateDragonColor(l)}updateGalaxyColor(e){if(this.galaxySunMesh&&this.galaxySunMesh.traverse(t=>{t.isMesh&&t.material&&t.material.color.copy(e)}),this.galaxyStars&&this.galaxyStars.geometry){const t={};e.getHSL(t);const i=(t.h+.5)%1,a=this.galaxyStars.geometry.getAttribute("color");if(a){const o=a.count,s=this._tempColor;for(let r=0;r<o;r++){const n=r/o,f=n<.2?.8:n<.5?.6:.4+Math.random()*.15,m=.6+Math.random()*.3;s.setHSL(i,m,f),a.setXYZ(r,s.r,s.g,s.b)}a.needsUpdate=!0}}}updateDragonColor(e){if(!this.dragonBodyInstanced)return;this.dragonBodyInstanced.material.color.copy(e),this.dragonHead.material.color.copy(e);const t={};e.getHSL(t);const i=(t.h+.5)%1,a=new F().setHSL(i,t.s,t.l);this.dragonGlowInstanced.material.color.copy(a)}initGalaxy(){const e=this.batterySaver?500:1500,t=new H,i=[],a=[],o=[];for(let n=0;n<e;n++){const f=n/e*Math.PI*10,m=2.5+n/e*20+Math.random()*2,l=n%4*(Math.PI*2/4),v=Math.max(.5,n/e*4),c=Math.cos(f+l)*m+(Math.random()-.5)*v,h=(Math.random()-.5)*1.5,p=Math.sin(f+l)*m+(Math.random()-.5)*v;i.push(c,h,p);const z=n/e;z<.2?a.push(1,.95,.7):z<.5?a.push(.7+Math.random()*.3,.8,1):a.push(.4+Math.random()*.2,.3+Math.random()*.3,.8+Math.random()*.2),o.push(Math.random()<.05?.4+Math.random()*.3:.08+Math.random()*.15)}t.setAttribute("position",new N(i,3)),t.setAttribute("color",new N(a,3)),t.setAttribute("size",new N(o,1));const s=this.createStarTexture(),r=new oe({size:.25,vertexColors:!0,map:s,transparent:!0,opacity:.9,blending:G,depthWrite:!1,sizeAttenuation:!0});this.galaxyStars=new k(t,r),this.galaxyGroup.add(this.galaxyStars),this.galaxySunStyle=this.galaxySunStyle||"sun",this.createGalaxySun(this.galaxySunStyle),this.galaxyGroup.visible=!1}createGalaxySun(e){this.galaxySunMesh&&(this.galaxyGroup.remove(this.galaxySunMesh),this.galaxySunMesh=null),this.galaxySunMesh=new L;const t=new _({color:4892415,transparent:!0,opacity:.85,blending:G,depthWrite:!1,side:Y}),i=new L;if(e==="sun2"){const a=t.clone();a.side=Fe;const o=new ce(1.5,.25,16,64);i.add(new P(o,a));const s=8,r=new se(.4,2.7,4);r.translate(0,2.7/2,0);const n=new se(.2,1.7,4);n.translate(0,1.7/2,0);for(let f=0;f<s;f++){const m=f/s*Math.PI*2,l=new P(r,a);l.rotation.z=-m,l.position.set(Math.sin(m)*1.5,Math.cos(m)*1.5,0),i.add(l);const v=m+Math.PI/s,c=new P(n,a);c.rotation.z=-v,c.position.set(Math.sin(v)*1.5,Math.cos(v)*1.5,0),i.add(c)}}else if(e==="sun3"){const a={uTime:{value:0},uColor:{value:t.color},uBassIntt:{value:0}};this.galaxySunUniforms=a;const o=`
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
            `,s=`
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
            `,r=new B({vertexShader:o,fragmentShader:s,uniforms:a,transparent:!0,blending:G,depthWrite:!1,side:Y}),n=new te(2,64,64),f=new P(n,r);i.add(f);const m=new _({color:t.color,transparent:!0,opacity:.15,blending:G,depthWrite:!1,side:Re}),l=new te(3,32,32);i.add(new P(l,m))}else{const a=new ce(1.5,.12,8,64);i.add(new P(a,t));const o=8;for(let s=0;s<o;s++){const r=s/o*Math.PI*2,n=new de;n.moveTo(-.4,0),n.lineTo(.4,0),n.lineTo(0,2.7),n.lineTo(-.4,0);const f=new ue(n),m=new P(f,t);m.rotation.z=-r,m.position.set(Math.sin(r)*1.5,Math.cos(r)*1.5,0),i.add(m);const l=r+Math.PI/o,v=new de;v.moveTo(-.2,0),v.lineTo(.2,0),v.lineTo(0,1.7),v.lineTo(-.2,0);const c=new ue(v),h=new P(c,t);h.rotation.z=-l,h.position.set(Math.sin(l)*1.5,Math.cos(l)*1.5,0),i.add(h)}}this.galaxySunMesh.add(i),this.galaxySunMesh.position.set(0,0,.1),this.galaxyGroup.add(this.galaxySunMesh)}setGalaxySunStyle(e){e!=="sun"&&e!=="sun2"&&e!=="sun3"||(this.galaxySunStyle=e,this.galaxyGroup&&this.galaxyGroup.children.length>0&&this.createGalaxySun(e))}setGalaxySunRotation(e,t){e==="x"&&(this.sunRotationSpeedX=parseFloat(t)),e==="y"&&(this.sunRotationSpeedY=parseFloat(t)),e==="z"&&(this.sunRotationSpeedZ=parseFloat(t))}createStarTexture(){if(this.textures.star)return this.textures.star;const e=64,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),a=e/2,o=e/2;i.clearRect(0,0,e,e);const s=i.createRadialGradient(a,o,0,a,o,e/2);return s.addColorStop(0,"rgba(255, 255, 255, 1.0)"),s.addColorStop(.1,"rgba(255, 255, 240, 0.8)"),s.addColorStop(.25,"rgba(255, 255, 200, 0.3)"),s.addColorStop(.5,"rgba(200, 200, 255, 0.1)"),s.addColorStop(1,"rgba(100, 100, 255, 0)"),i.fillStyle=s,i.fillRect(0,0,e,e),i.fillStyle="rgba(255, 255, 255, 0.6)",i.beginPath(),i.moveTo(0,o-1),i.lineTo(a,o-.5),i.lineTo(e,o-1),i.lineTo(e,o+1),i.lineTo(a,o+.5),i.lineTo(0,o+1),i.closePath(),i.fill(),i.beginPath(),i.moveTo(a-1,0),i.lineTo(a-.5,o),i.lineTo(a-1,e),i.lineTo(a+1,e),i.lineTo(a+.5,o),i.lineTo(a+1,0),i.closePath(),i.fill(),i.beginPath(),i.arc(a,o,2,0,Math.PI*2),i.fillStyle="rgba(255, 255, 255, 1.0)",i.fill(),this.textures.star=new J(t),this.textures.star}initMandala(){var o;this.mandalaRings=[];const e=[2450411,15357964,3900150,16347926,12573694];for(let s=0;s<5;s++){const r=1.2+s*.8,n=6+s*6,f=new Ae(r-.05,r+.05,n),m=new _({color:e[s],side:Y,transparent:!0,opacity:.4-s*.05,blending:G}),l=new P(f,m);l.userData={speed:(.01+s*.005)*(s%2===0?1:-1),segments:n},this.mandalaRings.push(l),this.mandalaGroup.add(l)}const t=new De(.3,32),i=new _({color:16347926,transparent:!0,opacity:.6,blending:G});this.mandalaCenter=new P(t,i),this.mandalaGroup.add(this.mandalaCenter),this.mandalaGroup.visible=!1;const a=(o=this.customColors)==null?void 0:o.mandala;a&&(this.mandalaRings.forEach(s=>s.material.color.copy(a)),this.mandalaCenter.material.color.copy(a))}createSnowflakeTexture(){if(this.textures.snowflake)return this.textures.snowflake;const e=128,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),a=e/2,o=e/2;i.clearRect(0,0,e,e);const s=i.createRadialGradient(a,o,0,a,o,e*.5);s.addColorStop(0,"rgba(200,230,255,0.5)"),s.addColorStop(.4,"rgba(180,220,255,0.15)"),s.addColorStop(1,"rgba(150,200,255,0)"),i.fillStyle=s,i.fillRect(0,0,e,e),i.strokeStyle="rgba(220,240,255,1.0)",i.lineCap="round";for(let r=0;r<6;r++){const n=r/6*Math.PI*2;i.save(),i.translate(a,o),i.rotate(n),i.lineWidth=2.5,i.beginPath(),i.moveTo(0,0),i.lineTo(0,-52),i.stroke();const f=[{d:18,len:14,angle:Math.PI/4},{d:32,len:20,angle:Math.PI/4},{d:46,len:10,angle:Math.PI/5}];i.lineWidth=1.5,f.forEach(({d:m,len:l,angle:v})=>{[1,-1].forEach(c=>{i.beginPath(),i.moveTo(0,-m),i.lineTo(c*l*Math.cos(Math.PI/2-v),-m-l*Math.sin(Math.PI/2-v)),i.stroke()})}),i.restore()}i.beginPath();for(let r=0;r<6;r++){const n=r/6*Math.PI*2-Math.PI/6,f=a+Math.cos(n)*4,m=o+Math.sin(n)*4;r===0?i.moveTo(f,m):i.lineTo(f,m)}return i.closePath(),i.fillStyle="rgba(255, 255, 255, 0.8)",i.fill(),this.textures.snowflake=new J(t),this.textures.snowflake}initSnowflake(){for(;this.snowflakeGroup.children.length>0;){const c=this.snowflakeGroup.children[0];this.snowflakeGroup.remove(c),c.geometry&&c.geometry.dispose(),c.material&&c.material.dispose()}this._snowData=null;const e=700,t=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e),o=new Float32Array(e),s=new Float32Array(e),r=new Float32Array(e),n=new Float32Array(e);for(let c=0;c<e;c++){const h=c*3;t[h]=(Math.random()-.5)*80,t[h+1]=(Math.random()-.5)*60,t[h+2]=-40+Math.random()*35;const p=(t[h+2]+40)/35;i[c]=1.5+p*8,a[c]=.2+p*.6,o[c]=Math.random()*Math.PI*2,s[c]=.015+Math.random()*.04+p*.03,r[c]=.01+Math.random()*.02,n[c]=.4+Math.random()*.8}const f=new H;f.setAttribute("position",new W(t,3)),f.setAttribute("aSize",new W(i,1)),f.setAttribute("aOpacity",new W(a,1));const m=this.createSnowflakeTexture(),l=new B({uniforms:{uTexture:{value:m},uColor:{value:this.customColor?this.customColor.clone():new F(10875883)},uIntensity:{value:0},uSizeMultiplier:{value:1},uGlowAmount:{value:.5}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:G}),v=new k(f,l);this.snowflakeGroup.add(v),this._snowData={count:e,positions:t,phases:o,speeds:s,drifts:r,driftFreqs:n,points:v,material:l,spinMeshes:[],spinSpeeds:[]}}setSnowSize(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uSizeMultiplier.value=Math.max(.2,Math.min(4,e)))}setSnowGlow(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uGlowAmount.value=Math.max(0,Math.min(1,e)))}initLava(){var s;this.lavaBlobs=[];const e=16;this.lavaUniforms={uBlobs:{value:[]},uColor:{value:new F(((s=g.visualColors)==null?void 0:s.lava)||16737792)},uSecondaryColor:{value:new F(16755200)},uTime:{value:0},uIntensity:{value:0},uResolution:{value:new me(window.innerWidth,window.innerHeight)}};for(let r=0;r<e;r++)this.lavaUniforms.uBlobs.value.push(new _e(0,-100,0,0));const t=new B({uniforms:this.lavaUniforms,vertexShader:`
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
            `,transparent:!0,blending:G,depthWrite:!1,side:Y}),i=new j(100,100),a=new P(i,t);a.position.z=-5,[{count:5,minSize:1,maxSize:1.5},{count:7,minSize:1.5,maxSize:2.2},{count:4,minSize:2.2,maxSize:3.5}].forEach(r=>{for(let n=0;n<r.count;n++){const f=r.minSize+Math.random()*(r.maxSize-r.minSize),m=["heating","rising","cooling","falling"],l=m[Math.floor(Math.random()*m.length)],v=-18+Math.random()*4,c=18+Math.random()*4;let h=0,p=.5;l==="heating"?(h=v,p=Math.random()*.5):l==="rising"?(h=v+Math.random()*(c-v),p=.8+Math.random()*.2):l==="cooling"?(h=c,p=1-Math.random()*.3):l==="falling"&&(h=c-Math.random()*(c-v),p=.2+Math.random()*.3),this.lavaBlobs.push({position:new Ee((Math.random()-.5)*12,h,(Math.random()-.5)*6),material:{uniforms:{uTemp:{value:0},uIntensity:{value:0},uTime:{value:0}}},userData:{baseSize:f,state:l,temperature:p,floatMin:v,floatMax:c,heatRate:.15+Math.random()*.3,coolRate:.15+Math.random()*.3,riseSpeed:(.04+Math.random()*.05)/(f*.5),fallSpeed:(.05+Math.random()*.05)/(f*.5),driftPhase:Math.random()*Math.PI*2,driftSpeed:.01+Math.random()*.02}})}}),this.lavaGroup.add(a),this.lavaGroup.visible=!1}initFireplace(){const i=new j(100,80);this.fireMaterial=this.createFireShader(),this.fireMesh=new P(i,this.fireMaterial),this.fireMesh.position.set(0,0,-15),this.fireMesh.renderOrder=10,this.fireplaceGroup.add(this.fireMesh),this.fireLight=new Ve(16737792,5,200),this.fireLight.position.set(0,0,30),this.fireplaceGroup.add(this.fireLight);const a=650,o=new H,s=[];for(let r=0;r<a;r++)s.push((Math.random()-.5)*100,-20+Math.random()*40,-15+(Math.random()-.5)*20);o.setAttribute("position",new N(s,3)),this.emberMat=new oe({color:16763904,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.8,blending:G,depthWrite:!1}),this.embers=new k(o,this.emberMat),this.fireplaceGroup.add(this.embers),this.emberVelocities=new Float32Array(a);for(let r=0;r<a;r++)this.emberVelocities[r]=.02+Math.random()*.05;this.fireplaceGroup.position.set(0,0,0),this.fireplaceGroup.visible=!1}createFireShader(){return new B({uniforms:{uTime:{value:0},uColor:{value:new F(16729088)},uSpeed:{value:1},uIntensity:{value:1}},vertexShader:`
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
            `,transparent:!0,side:Y,blending:G,depthWrite:!1})}initRainforest(){const e=this.batterySaver?400:1e3,t=new H,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let o=0;o<e;o++){const s=o*3;i[s]=(Math.random()-.5)*60,i[s+1]=(Math.random()-.5)*40,i[s+2]=(Math.random()-.5)*40,a[s]=Math.random(),a[s+1]=Math.random(),a[s+2]=.08+Math.random()*.12}t.setAttribute("position",new W(i,3)),t.setAttribute("aRandom",new W(a,3)),this.rainMaterial=new B({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new F(8965375)},uIntensity:{value:.6}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:G}),this.raindrops=new k(t,this.rainMaterial),this.rainforestGroup.add(this.raindrops),this.rainforestGroup.visible=!1}initZenGarden(){const e=this.batterySaver?200:500,t=new H,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let s=0;s<e;s++){const r=s*3;i[r]=(Math.random()-.5)*40,i[r+1]=(Math.random()-.5)*20,i[r+2]=(Math.random()-.5)*40,a[r]=Math.random(),a[r+1]=Math.random(),a[r+2]=Math.random()*Math.PI*2}t.setAttribute("position",new W(i,3)),t.setAttribute("aRandom",new W(a,3)),this.petalMaterial=new B({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new F(16758725)},uIntensity:{value:.8}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1}),this.petals=new k(t,this.petalMaterial),this.zenGardenGroup.add(this.petals);const o=new j(40,40,32,32);this.zenWaterMaterial=new _({color:2245734,transparent:!0,opacity:.3,side:Y}),this.zenWater=new P(o,this.zenWaterMaterial),this.zenWater.rotation.x=-Math.PI/2,this.zenWater.position.y=-5,this.zenGardenGroup.add(this.zenWater),this.zenGardenGroup.visible=!1}initOcean(){var r;const e=new j(300,100,128,64);this.oceanWave=new P(e,new B({uniforms:{uTime:{value:0},uColor:{value:this.customColor?this.customColor.clone():new F(43775)},uNormBass:{value:0},uBeatPulse:{value:0}},vertexShader:`
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
            `,wireframe:!0,transparent:!0,side:Y})),this.oceanWave.rotation.x=-Math.PI/3,this.oceanWave.position.y=-2,this.oceanGroup.add(this.oceanWave);const t=300,i=new H,a=[];for(let n=0;n<t;n++)a.push((Math.random()-.5)*50),a.push(-2.5+Math.random()*.5),a.push((Math.random()-.5)*40);i.setAttribute("position",new N(a,3));const o=new oe({color:16777215,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.5,blending:G,depthWrite:!1});this.oceanFoam=new k(i,o),this.oceanGroup.add(this.oceanFoam),this.oceanGroup.visible=!1;const s=((r=this.customColors)==null?void 0:r.ocean)||this.customColor;s&&(this.oceanWave&&this.oceanWave.material.color.copy(s),this.oceanFoam&&this.oceanFoam.material.color.copy(s))}createCyberTexture(e=this.matrixConfig){const i=document.createElement("canvas");i.width=1024,i.height=1024;const a=i.getContext("2d");a.fillStyle="rgba(0,0,0,0)",a.fillRect(0,0,1024,1024),a.shadowBlur=12,a.shadowColor="rgba(255, 255, 255, 0.4)",a.font='bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace',a.fillStyle="#ffffff",a.textAlign="center",a.textBaseline="middle";const o=8,s=8,r=1024/o,n=1024/s;let f="🪷MINDWAVE";const m=e.logicMode,l=e.customText;m==="custom"||m==="txt"?f="🪷"+(l&&l.length>0?l:"WELCOME TO MINDWAVE"):(m==="random"||m==="rnd"||m==="matrix"||m==="int"||m==="interstellar")&&(f="");const v=m==="matrix"||m==="int"||m==="interstellar"?[]:["LOGO",...f],c=v.length;for(let p=0;p<64;p++){const z=p%8,R=Math.floor(p/8);a.fillStyle="rgba(0,0,0,0)",a.fillRect(z*r,R*n,r,n),a.save(),a.translate(z*r+r/2,R*n+n/2);let I="",S=!1;if(p<c){const T=v[p];T==="LOGO"?S=!0:I=T}else{const b="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";I=b.charAt(Math.floor(Math.random()*b.length)),Math.random()>.5&&(a.save(),a.scale(-1,1),a.fillStyle="#ffffff",a.font="bold 80px monospace",a.fillText(I,0,0),a.restore(),I="")}if(I||S)if(a.fillStyle="#ffffff",a.font="bold 80px monospace",a.textAlign="center",a.textBaseline="middle",a.shadowBlur=16,a.shadowColor="rgba(255, 255, 255, 0.6)",S)if(this.logoImage){const A=document.createElement("canvas");A.width=100,A.height=100;const E=A.getContext("2d");E.imageSmoothingEnabled=!0,E.imageSmoothingQuality="high",E.drawImage(this.logoImage,0,0,100,100);const X=E.getImageData(0,0,100,100),D=X.data;for(let V=0;V<D.length;V+=4){const Z=180+(D[V]+D[V+1]+D[V+2])/3/255*75;D[V]=Z,D[V+1]=Z,D[V+2]=Z}E.putImageData(X,0,0),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(A,-50,-50,100,100)}else!this.logoLoading&&!this.logoFailed&&(this.logoLoading=!0,new Be().load("./mindwave-logo-icon.png",b=>{if(this.logoImage=b,this.logoLoading=!1,this.cyberMaterial){const A=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=A}},void 0,b=>{this.logoFailed=!0,this.logoLoading=!1})),a.font="bold 80px monospace",a.fillStyle="#2dd4bf",a.fillText("🪷",0,0);else a.fillText(I,0,0);a.restore()}const h=new J(i);return h.magFilter=fe,h.minFilter=fe,h}createCyberShader(e,t=this.matrixConfig){return new B({uniforms:{uTexture:{value:e},uColor:{value:new F(t.color||65345)},uHeadColor:{value:new F(15794160)},uTime:{value:0},uSpeed:{value:t.speed||1},uTailLength:{value:t.length||1},uRainbow:{value:t.rainbow?1:0},uBrightness:{value:this.brightnessMultiplier||1}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:G})}initEnvironment(){this.sunLight=new Oe(16774625,1.2),this.sunLight.position.set(50,100,50),this.scene.add(this.sunLight),this.ambientLight=new We(4210752,.6),this.scene.add(this.ambientLight)}ensureInitialized(e){const t=`[VizInit] ${e}`;e==="sphere"&&(!this.sphereGroup||this.sphereGroup.children.length===0)&&this.initSphere(),e==="particles"&&(!this.particleGroup||this.particleGroup.children.length===0)&&this.initParticles(),e==="lightspeed"&&(!this.lightspeedGroup||this.lightspeedGroup.children.length===0)&&this.initLightspeed(),e==="waves"&&(!this.wavesGroup||this.wavesGroup.children.length===0)&&this.initWaves(),e==="lava"&&(!this.lavaGroup||this.lavaGroup.children.length===0)&&this.initLava(),e==="fireplace"&&(!this.fireplaceGroup||this.fireplaceGroup.children.length===0)&&this.initFireplace(),e==="rainforest"&&(!this.rainforestGroup||this.rainforestGroup.children.length===0)&&this.initRainforest(),e==="zengarden"&&(!this.zenGardenGroup||this.zenGardenGroup.children.length===0)&&this.initZenGarden(),e==="ocean"&&(!this.oceanGroup||this.oceanGroup.children.length===0)&&this.initOcean(),(e==="cyber"||e==="matrix")&&(!this.cyberGroup||this.cyberGroup.children.length===0)&&this.initCyber(),e==="box"&&(!this.boxGroup||this.boxGroup.children.length===0)&&this.initBox(),e==="dragon"&&(!this.dragonGroup||this.dragonGroup.children.length===0)&&this.initDragon(),e==="galaxy"&&(!this.galaxyGroup||this.galaxyGroup.children.length===0)&&this.initGalaxy(),e==="mandala"&&(!this.mandalaGroup||this.mandalaGroup.children.length===0)&&this.initMandala(),e==="snowflake"&&(!this.snowflakeGroup||this.snowflakeGroup.children.length===0)&&this.initSnowflake()}initCyber(){for(;this.cyberGroup.children.length>0;){const c=this.cyberGroup.children[0];this.cyberGroup.remove(c),c.material&&(c.material.map&&c.material.map.dispose(),c.material.dispose()),c.children&&c.traverse(h=>{h.geometry&&h.geometry.dispose(),h.material&&(h.material.map&&h.material.map.dispose(),h.material.dispose())})}this.cyberRotationGroup=null,this.cyberPoints=null;const e=80,t=120,i=new H,a=[],o=[],s=[],r=[],n=240,f=160,m=n/e,l=f/t;for(let c=0;c<e;c++){const h=c*m-n/2+Math.random()*.8*m,p=-20-Math.random()*2,z=.5+Math.random()*.5,R=this.matrixConfig,I=R.logicMode==="mindwave"||R.logicMode==="mw"||R.logicMode==="custom"||R.logicMode==="txt",S=R.logicMode==="matrix"||R.logicMode==="int"||R.logicMode==="interstellar",b=((R.logicMode==="custom"||R.logicMode==="txt")&&R.customText?"🪷"+R.customText:"MINDWAVE").length,A=S?Math.random()*100:0,E=S?.5+Math.random()*1.5:1,X=Math.random()*100+A;for(let D=0;D<t;D++){const V=f/2-D*l;a.push(h,V,p),I?o.push(D%(b+1)):S?o.push(Math.floor(Math.random()*64)):o.push(9+Math.floor(Math.random()*55)),s.push(X),r.push(z*E)}}i.setAttribute("position",new N(a,3)),i.setAttribute("aCharIndex",new N(o,1)),i.setAttribute("aSpawnTime",new N(s,1)),i.setAttribute("aSpeed",new N(r,1)),this.cyberGeometry=i;const v=this.createCyberTexture(this.matrixConfig);this.cyberMaterial=this.createCyberShader(v,this.matrixConfig),this.cyberRain=new k(i,this.cyberMaterial),this.cyberRain.frustumCulled=!1,this.cyberRain.renderOrder=-1,this.cyberRotationGroup=new L,this.cyberRotationGroup.add(this.cyberRain),this.cyberGroup.add(this.cyberRotationGroup),this.currentCyberAngle!==void 0&&(this.cyberRotationGroup.rotation.z=pe.degToRad(-this.currentCyberAngle))}setCyberMode(e){if(this.mindWaveMode!==e)if(this.mindWaveMode=e,this.cyberLogicMode=e?"mindwave":"classic",e&&this.cyberMaterial){const t=this.cyberMaterial.uniforms.uTexture.value,i=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=i,this.cyberMaterial.needsUpdate=!0,t&&t.dispose()}else this.initCyber()}setMode(e){const t=this.mapMode(e);this.activeModes.clear(),this.activeModes.add(t),this.mode=t,this.updateVisibility(),this.updateLabel(t)}mapMode(e){return{cube:"box",flow:"particles",zen:"zengarden",rain:"rainforest",interstellar:"matrix",ocean:"waves"}[e]||e}toggleMode(e){const t=this.mapMode(e);t==="matrix"&&!this.activeModes.has("matrix")&&(this.matrixConfig.logicMode||(this.matrixConfig.logicMode="interstellar")),t==="cyber"&&!this.activeModes.has("cyber")&&(this.cyberConfig.logicMode||(this.cyberConfig.logicMode="matrix"));const i=this.activeModes.has("cyber");this.activeModes.has(t)?this.activeModes.delete(t):this.activeModes.add(t),this.active=this.activeModes.size>0,this.updateVisibility(),this.updateLabel(t),this.activeModes.forEach(a=>this.ensureInitialized(a)),this.initialized&&this.active&&!this._isRendering&&(g.animationId&&(cancelAnimationFrame(g.animationId),g.animationId=null),this.render()),this.mode=t,this.updateVisibility(),this.activeModes.size===0&&!i&&(this.active=!1,this.renderer&&(this.renderer.autoClearColor=!0,this.renderer.clear(),this.renderer.render(this.scene,this.camera))),this.activeModes.size===1?this.updateLabel(Array.from(this.activeModes)[0]):this.activeModes.size>1?this.updateLabel("multi"):this.updateLabel("none"),window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}})),this.updateCyberStrings&&this.updateCyberStrings()}toggleGalaxySunStyle(){const e=this.galaxySunStyle==="sun"?"sun2":this.galaxySunStyle==="sun2"?"sun3":"sun";return this.setGalaxySunStyle(e),e}updateVisibility(){if(this.activeModes.forEach(e=>this.ensureInitialized(e)),this.sphereGroup&&(this.sphereGroup.visible=this.activeModes.has("sphere")),this.particleGroup&&(this.particleGroup.visible=this.activeModes.has("particles")),this.lightspeedGroup&&(this.lightspeedGroup.visible=this.activeModes.has("lightspeed")),this.wavesGroup&&(this.wavesGroup.visible=this.activeModes.has("waves")),this.oceanGroup&&(this.oceanGroup.visible=this.activeModes.has("ocean")),this.lavaGroup&&(this.lavaGroup.visible=this.activeModes.has("lava")),this.fireplaceGroup&&(this.fireplaceGroup.visible=this.activeModes.has("fireplace")),this.rainforestGroup&&(this.rainforestGroup.visible=this.activeModes.has("rainforest")),this.zenGardenGroup&&(this.zenGardenGroup.visible=this.activeModes.has("zengarden")),this.boxGroup&&(this.boxGroup.visible=this.activeModes.has("box")),this.dragonGroup&&(this.dragonGroup.visible=this.activeModes.has("dragon")),this.galaxyGroup&&(this.galaxyGroup.visible=this.activeModes.has("galaxy")),this.mandalaGroup&&(this.mandalaGroup.visible=this.activeModes.has("mandala")),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics")),this.snowflakeGroup){const e=this.cymaticMaterial&&Math.abs(this.cymaticMaterial.uniforms.uMedium.value-3)<.1;this.snowflakeGroup.visible=this.activeModes.has("snowflake")||this.activeModes.has("cymatics")&&e}this.cyberGroup&&(this.cyberGroup.visible=this.activeModes.has("matrix")),this.overlayCanvas&&(this.activeModes.has("cyber")?(this.overlayCanvas.classList.remove("hidden"),this.activeModes.has("matrix")?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1):this.activeModes.size>1?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:.7}})),this.wasAutoDimmed=!0):(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1),(!this.matrixCyberStreams||this.matrixCyberStreams.length===0)&&this.generateCyberStyle()):(this.overlayCanvas.classList.add("hidden"),this.wasAutoDimmed&&(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1))),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics"),this.cymaticsGroup.position.z=2),this.updateUIPanels()}updateUIPanels(){typeof window.updateConfigPanel=="function"&&window.updateConfigPanel()}updateLabel(e){const t=document.getElementById("visualLabel");t&&(e==="sphere"?t.textContent="BIO-RESONANCE":e==="particles"?t.textContent="NEURAL FLOW":e==="lightspeed"?t.textContent="WARP":e==="waves"||e==="ocean"?t.textContent="OCEAN":e==="lava"?t.textContent="LAVA LAMP":e==="fireplace"?t.textContent="FIREPLACE":e==="rainforest"?t.textContent="RAINFOREST":e==="zengarden"?t.textContent="ZEN GARDEN":e==="cymatics"?t.textContent="CYMATICS":e==="cyber"?t.textContent="CYBER":e==="matrix"?t.textContent="MATRIX":e==="snowflake"?t.textContent="SNOWFALL":e==="multi"?t.textContent="MULTI-SENSORY":t.textContent="")}initWaves(){for(this.wavesGroup||(this.wavesGroup=new L,this.scene.add(this.wavesGroup));this.wavesGroup.children.length>0;){const t=this.wavesGroup.children[0];this.wavesGroup.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}const e=new j(80,80,160,160);this.wavesMaterial=new B({uniforms:{uTime:{value:0},uColor:{value:this.customColor?new F(this.customColor):new F(26367)},uSecondaryColor:{value:new F(62207)},uIntensity:{value:1},uNormBass:{value:0},uResolution:{value:new me(window.innerWidth,window.innerHeight)}},vertexShader:`
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
            `,transparent:!0,wireframe:!1,side:Y,extensions:{derivatives:!0}}),this.wavesMesh=new P(e,this.wavesMaterial),this.wavesMesh.rotation.x=-Math.PI/2.2,this.wavesMesh.position.y=-5,this.wavesMesh.position.z=-10,this.wavesGroup.add(this.wavesMesh)}setSpeed(e){this.speedMultiplier=e}setIntent(e){this.currentIntent=e,e==="delta"||e==="theta"?this.particles&&this.particles.material&&(this.particles.material.size=.3,this.particles.material.opacity=.5):e==="gamma"||e==="hyper-gamma"?(this.particles&&this.particles.material&&(this.particles.material.size=.08,this.particles.material.opacity=.9),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(16777215),this.cyberMaterial.uniforms.uTailLength.value=.4)):(this.particles&&this.particles.material&&(this.particles.material.size=.15,this.particles.material.opacity=.8),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(15794160),this.cyberMaterial.uniforms.uTailLength.value=1)),this.renderSingleFrame()}setColor(e,t=null){var i,a,o,s;this.customColors||(this.customColors={}),!t||t==="all"?(this.customColors={},this.customColor=new F(e)):this.customColors[t]=new F(e);try{const r=n=>{n&&(n.color&&typeof n.color.set=="function"?n.color.set(e):n.uniforms&&n.uniforms.uColor&&n.uniforms.uColor.value.set(e))};this.particles&&this.particles.material&&r(this.particles.material),this.lightspeed&&this.lightspeed.material&&r(this.lightspeed.material),this.sphere&&this.sphere.material&&(r(this.sphere.material),this.core&&this.core.material&&r(this.core.material)),(t==="box"||!t||t==="all")&&(this.boxOuter&&this.boxOuter.children.forEach(n=>r(n.material)),this.boxInner&&this.boxInner.children.forEach(n=>r(n.material)),this.boxEdges&&this.boxEdges.material&&r(this.boxEdges.material)),t==="mandala"&&(this.mandalaRings&&this.mandalaRings.forEach(n=>r(n.material)),this.mandalaCenter&&this.mandalaCenter.material&&r(this.mandalaCenter.material)),this.wavesMesh&&this.wavesMesh.material&&r(this.wavesMesh.material),this.lavaBlobs&&this.lavaBlobs.forEach(n=>r(n.material)),this.lavaGlow&&this.lavaGlow.material&&r(this.lavaGlow.material),this.flames&&this.flames.material&&r(this.flames.material),this.raindrops&&this.raindrops.material&&r(this.raindrops.material),this.petals&&this.petals.material&&r(this.petals.material),this.zenWater&&this.zenWater.material&&r(this.zenWater.material),this.oceanWave&&this.oceanWave.material&&r(this.oceanWave.material),this.oceanFoam&&this.oceanFoam.material&&r(this.oceanFoam.material),this.cyberRain&&this.cyberRain.material&&this.cyberRain.material.uniforms&&this.cyberRain.material.uniforms.uColor&&this.cyberRain.material.uniforms.uColor.value.set(e),this.logoMesh&&this.originalLogoImg&&this.updateLogoTexture(),this.dragonGroup&&this.updateDragonColor&&this.updateDragonColor(new F(e)),(this.galaxyStars||this.galaxySunMesh)&&this.updateGalaxyColor(new F(e)),this.cymaticMaterial&&((i=this.cymaticMaterial.uniforms)!=null&&i.uColor)&&this.cymaticMaterial.uniforms.uColor.value.set(e),(t==="snowflake"||!t||t==="all")&&typeof this.setSnowColor=="function"&&this.setSnowColor(e),(s=(o=(a=this._snowData)==null?void 0:a.material)==null?void 0:o.uniforms)!=null&&s.uColor&&this._snowData.material.uniforms.uColor.value.set(e)}catch{}this.renderSingleFrame()}renderSingleFrame(){!this.renderer||!this.scene||!this.camera||(this.renderer.clear(),this.renderer.render(this.scene,this.camera))}createCircleTexture(){if(this.textures.circle)return this.textures.circle;const e=32,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d");return i.beginPath(),i.arc(e/2,e/2,e/2,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),this.textures.circle=new J(t),this.textures.circle}render(e,t){var i,a,o,s,r,n,f,m;if(!this.initialized||!this.renderer||document.hidden||!this.active){this._isRendering=!1;return}if(!(this._isRendering&&typeof e=="number")){this._isRendering=!0;try{(typeof e=="number"||!e&&g.analyserLeft)&&(e=g.analyserLeft,t=g.analyserRight);let l=0,v=0,c=0;if(e){const d=e.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==d)&&(this._freqDataArray=new Uint8Array(d)),e.getByteFrequencyData(this._freqDataArray);let w=0;for(let C=0;C<15;C++)w+=this._freqDataArray[C];l=Math.pow(w/15/255,.8);let M=0;for(let C=10;C<100;C++)M+=this._freqDataArray[C];v=M/90/255;let x=0;for(let C=100;C<300;C++)x+=this._freqDataArray[C];c=x/200/255}const h=Math.max(.001,this.speedMultiplier||1),p=performance.now()*.001;if(this.activeModes.has("cymatics")&&this.cymaticsCore){const d=window.cymaticsAudioSync!==!1?{bass:l||0,mids:v||0,highs:c||0}:{bass:0,mids:0,highs:0},w=window.cymaticsMouseSync!==!1?{x:this.mouseX||0,y:this.mouseY||0}:null;this.cymaticsCore.update(p*h,d,w)}this.lastTime||(this.lastTime=p);const z=Math.min(.1,p-this.lastTime);this.lastTime=p;const R=g.visualSpeedAuto?g.beatFrequency||10:h*10,I=Math.sin(p*Math.PI*2*R)*.5+.5,S=this.vibrationEnabled?1:0,T=(I||0)*S,b=(l||0)*S,A=S*(.02+b*.15+T*.08),E=Math.sin(p*47.3)*Math.cos(p*31.7)*A,X=Math.cos(p*53.1)*Math.sin(p*29.3)*A,D=Math.sin(p*37.9)*Math.cos(p*43.1)*A,V=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];for(const d of V)d&&d.position.set(E,X,D);if(this.activeModes.has("galaxy")&&this.galaxyGroup){const d=this.sunRotationSpeedY||.002,w=this.sunRotationSpeedZ||5e-4;if(this.galaxyStars&&(this.galaxyStars.rotation.y+=d*h*.5,this.galaxyStars.rotation.z+=w*h*.5),this.galaxySunMesh){this.galaxySunMesh.rotation.z-=w*h*1.5,this.galaxySunMesh.rotation.y+=d*h*2;const M=1+b*.15*(this.galaxySunStyle==="sun3"?2.5:1);this.galaxySunMesh.scale.setScalar(M)}this.galaxySunUniforms&&(this.galaxySunUniforms.uTime.value=p*h,this.galaxySunUniforms.uBassIntt.value=b)}if(this.activeModes.has("sphere")&&this.sphere&&(this.sphere.scale.setScalar(1+b*.15),this.sphere.rotation.y+=.005*h),this.activeModes.has("particles")&&this.particleMaterial){const d=((a=(i=window.MindWaveState)==null?void 0:i.envIntensities)==null?void 0:a.flow)??1,w=(.015*h+b*.08+T*.05)*d;this.particleMaterial.uniforms.uTime.value=p,this.particleMaterial.uniforms.uSpeed.value=w*10,this.particleGroup.rotation.z+=(.001*h+b*.005)*d}if(this.activeModes.has("lightspeed")&&this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uTime.value=p,this.lightspeedMaterial.uniforms.uSpeed.value=h),this.activeModes.has("matrix")&&this.cyberMaterial&&(this.cyberMaterial.uniforms.uTime.value=p*h),this.activeModes.has("waves")&&this.wavesMaterial){const d=((s=(o=window.MindWaveState)==null?void 0:o.envIntensities)==null?void 0:s.ocean)??1;this.wavesMaterial.uniforms.uTime.value=p*h*.5,this.wavesMaterial.uniforms.uNormBass.value=b*d,this.wavesMaterial.uniforms.uIntensity&&(this.wavesMaterial.uniforms.uIntensity.value=d)}if(this.activeModes.has("ocean")&&this.oceanWave&&this.oceanWave.material.uniforms){const d=((n=(r=window.MindWaveState)==null?void 0:r.envIntensities)==null?void 0:n.ocean)??1;this.oceanWave.material.uniforms.uTime.value=p*h,this.oceanWave.material.uniforms.uNormBass.value=b*d,this.oceanWave.material.uniforms.uBeatPulse.value=T*d,this.oceanFoam&&(this.oceanFoam.material.opacity=(.4+b*.3+T*.2)*(this.brightnessMultiplier||1)*d)}if(this.activeModes.has("box")&&this.boxOuter&&(this.boxOuter.rotation.x+=.008*h+b*.02,this.boxOuter.rotation.y+=.012*h,this.boxInner&&(this.boxInner.rotation.x-=.015*h,this.boxInner.rotation.y-=.01*h,this.boxInner.scale.setScalar(.95+b*.2)),this.boxOuter.scale.setScalar(1+b*.2),this.boxEdges&&this.boxEdges.rotation.copy(this.boxOuter.rotation)),this.activeModes.has("dragon")&&this.dragonBodyInstanced&&this.dragonDummy){this.dragonGroup.rotation.y+=.005*h;const d=p*h*2,w=1+b*.2;for(let M=0;M<this.dragonLength;M++){const x=d-M*.12,C=Math.sin(x)*8,q=Math.cos(x*1.5)*4+Math.sin(x*.5)*3,xe=Math.cos(x*.8)*8;this.dragonDummy.position.set(C,q,xe);const K=x+.1,we=Math.sin(K)*8,be=Math.cos(K*1.5)*4+Math.sin(K*.5)*3,Me=Math.cos(K*.8)*8;this.dragonDummy.lookAt(we,be,Me);const Ce=1-M/this.dragonLength*.8,Se=1+Math.sin(x*4)*.15*(.5+b);this.dragonDummy.scale.setScalar(Ce*Se*w),this.dragonDummy.updateMatrix(),this.dragonBodyInstanced.setMatrixAt(M,this.dragonDummy.matrix),this.dragonGlowInstanced&&this.dragonGlowInstanced.setMatrixAt(M,this.dragonDummy.matrix),M===0&&this.dragonHead&&(this.dragonHead.position.copy(this.dragonDummy.position),this.dragonHead.quaternion.copy(this.dragonDummy.quaternion),this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4))}if(this.dragonBodyInstanced.instanceMatrix.needsUpdate=!0,this.dragonGlowInstanced&&(this.dragonGlowInstanced.instanceMatrix.needsUpdate=!0),this.dragonPearlGroup){const M=d+.5;this.dragonPearlGroup.position.set(Math.sin(M)*9,Math.cos(M*1.5)*5+Math.sin(M*.5)*4,Math.cos(M*.8)*9),this.dragonPearlGroup.rotation.x+=.08*h,this.dragonPearlGroup.rotation.y+=.12*h}}if(this.activeModes.has("mandala")&&this.mandalaRings&&(this.mandalaRings.forEach((d,w)=>{d.userData&&d.userData.speed&&(d.rotation.z+=d.userData.speed*h+b*.005);const M=1+T*.1*(w+1)*.3;d.scale.setScalar(M)}),this.mandalaCenter&&(this.mandalaCenter.rotation.z-=.01*h,this.mandalaCenter.scale.setScalar(1+b*.3))),this.dimmerPlane){const d=g&&g.screenDimmer!==void 0?g.screenDimmer:0;this.dimmerPlane.material.opacity=d}if(this.logoMesh){const d=g.lotusState||"auto";let w=I;if(d==="heartbeat")if(g.lotusHeartbeatSync)w=Math.min(1,I*.7+b*.8);else{const x=(g.lotusHeartbeatBpm||11)/60;w=Math.sin(p*Math.PI*2*x)*.5+.5}let M=.8;d==="faded"?M=.15:d==="full"?M=1:d==="heartbeat"?M=.2+.8*w:d==="manual"?M=g.lotusOpacity!==void 0?g.lotusOpacity:.8:M=.4+b*.6,this._lotusCurrentOpacity===void 0&&(this._lotusCurrentOpacity=.8),this._lotusCurrentOpacity+=(M-this._lotusCurrentOpacity)*.1,this.logoMesh.material.opacity=this._lotusCurrentOpacity,d==="heartbeat"?this.logoMesh.scale.setScalar(1+w*.15):this.logoMesh.scale.setScalar(1+b*.05+T*.02)}if(this.activeModes.has("lava")&&this.lavaBlobs&&this.lavaUniforms){const d=((m=(f=window.MindWaveState)==null?void 0:f.envIntensities)==null?void 0:m.lava)??1;this.lavaUniforms.uTime.value=p*h,this.lavaUniforms.uIntensity.value=b*d,this.lavaBlobs.forEach((w,M)=>{const x=w.userData,C=h*(1+b*.8);if(x.state==="heating"?(x.temperature+=x.heatRate*z*C,x.temperature>=1&&(x.temperature=1,x.state="rising")):x.state==="rising"?(w.position.y+=x.riseSpeed*C,w.position.y>=x.floatMax&&(x.state="cooling")):x.state==="cooling"?(x.temperature-=x.coolRate*z*C,x.temperature<=0&&(x.temperature=0,x.state="falling")):x.state==="falling"&&(w.position.y-=x.fallSpeed*C,w.position.y<=x.floatMin&&(x.state="heating")),w.position.x+=Math.sin(p*x.driftSpeed+x.driftPhase)*.02*C,this.lavaUniforms.uBlobs.value[M]){const q=x.baseSize*(.8+.5*x.temperature);this.lavaUniforms.uBlobs.value[M].set(w.position.x,w.position.y,w.position.z,q)}})}if(this.snowflakeGroup&&this.snowflakeGroup.visible&&this._snowData){const d=this._snowData,w=d.points.geometry.attributes.position.array,M=h*2;for(let x=0;x<d.count;x++){const C=x*3;w[C+1]-=d.speeds[x]*M;let q=Math.sin(p*d.driftFreqs[x]+d.phases[x])*d.drifts[x]*M;w[C]+=q,w[C+1]<-22&&(w[C+1]=22),w[C]>35&&(w[C]=-35),w[C]<-35&&(w[C]=35)}if(d.points.geometry.attributes.position.needsUpdate=!0,d.spinMeshes){const x=1+(b||0)*.15;d.spinMeshes.forEach((C,q)=>{C.rotation.z+=d.spinSpeeds[q]*M,C.position.y-=d.spinSpeeds[q]*.1*M,C.scale.setScalar(x),C.position.y<-25&&(C.position.y=25)})}d.material&&d.material.uniforms&&d.material.uniforms.uIntensity&&(d.material.uniforms.uIntensity.value=.2+b*.8)}if(this.activeModes.has("rainforest")&&this.rainMaterial){const d=h*.8*(1+T*.3);this.rainMaterial.uniforms.uTime.value=p,this.rainMaterial.uniforms.uSpeed.value=d,this.rainMaterial.uniforms.uIntensity.value=(.5+b*.2+T*.2)*(this.brightnessMultiplier||1)}if(this.activeModes.has("zengarden")&&this.petalMaterial){const d=h*.3*(1+T*.5);this.petalMaterial.uniforms.uTime.value=p,this.petalMaterial.uniforms.uSpeed.value=d,this.zenWater&&(this.zenWater.material.opacity=(.3+T*.2)*(this.brightnessMultiplier||1))}if(this.activeModes.has("fireplace")&&this.fireMesh&&this.fireMesh.material&&this.fireMesh.material.uniforms){const d=.8+.2*Math.sin(p*15)*Math.sin(p*7),w=this.fireMesh.material.uniforms;w.uTime&&(w.uTime.value=p*1.5*h),w.uIntensity&&(w.uIntensity.value=d+b*.5),this.fireLight&&(this.fireLight.intensity=(2+b*5)*d)}const U=performance.now(),Z=U-(this._lastFrameStartTime||U);if(this._lastFrameStartTime=U,this._fpsRingBuffer&&(this._fpsRingBuffer[this._fpsRingIndex]=Z,this._fpsRingIndex=(this._fpsRingIndex+1)%60,this._fpsRingCount=Math.min(60,this._fpsRingCount+1),this._fpsRingCount===60)){let d=0;for(let M=0;M<60;M++)d+=this._fpsRingBuffer[M];d/=60,1e3/d<35&&U-(this._lastLodDegradation||0)>3e3&&(this.degradeLOD(),this._lastLodDegradation=U,this._fpsRingCount=0)}const ye=1e3/(this.targetFPS||60);U-this.lastFrameRenderTime>=ye&&(this.renderer.autoClear=!this.activeModes.has("lightspeed"),this.renderer.autoClear&&this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.activeModes.has("cyber")&&this.renderCyberCyber(),this.lastFrameRenderTime=U)}catch(l){l.name==="TypeError"&&l.message.includes("uniforms")}finally{this._isRendering=!1}this.active&&!document.hidden?g.animationId=requestAnimationFrame(()=>this.render(g.analyserLeft,g.analyserRight)):g.animationId=null}}setCyberColor(e){this.cyberConfig.color=e,this.cyberConfig.rainbow=!1,this.cyberColorCustomized=!0,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.matrixConfig.rainbow=!1,this.cyberMaterial&&this.cyberMaterial.uniforms.uColor&&(this.cyberMaterial.uniforms.uColor.value.set(e),this._tempColor.set(e),this._tempColor.r+=(1-this._tempColor.r)*.8,this._tempColor.g+=(1-this._tempColor.g)*.8,this._tempColor.b+=(1-this._tempColor.b)*.8,this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor),this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=0))}getAverageFrequency(e,t){let i=g.analyserLeft||g.analyserRight;if(!i)return 0;const a=i.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==a)&&(this._freqDataArray=new Uint8Array(a));const o=this._freqDataArray;i.getByteFrequencyData(o),e===void 0&&(e=0),t===void 0&&(t=o.length);let s=0,r=0;for(let n=e;n<t&&n<o.length;n++)s+=o[n],r++;return r>0?s/r:0}setMouseInfluence(e){this.mouseInfluence=e}setGlobalSpeed(e){this.speedMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=1+(e-1)*.5)}setGlobalBrightness(e){this.brightnessMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberBrightness(e){this.cyberConfig.brightness=e}setMatrixBrightness(e){this.matrixConfig.brightness=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberSpeed(e){this.cyberConfig.speed=e}setCyberLength(e){this.cyberConfig.length=e}setMatrixSpeed(e){this.matrixConfig.speed=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=e)}setMatrixLength(e){this.matrixConfig.length=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uTailLength.value=e)}setCyberRainbow(e){if(this.cyberConfig.rainbow=e,this.cyberRainbowMode=e,!e){const t=this.cyberConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(i=>{i.color=t})}}setMatrixRainbow(e){this.matrixConfig.rainbow=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=e?1:0)}setBatterySaver(e){this.batterySaver=e,this.targetFPS=e?30:60;const t=e?1:2;this.renderer&&(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t)),this.resize())}degradeLOD(){this.renderer&&(this.currentLodLevel==="high"?(this.renderer.setPixelRatio(1),this.currentLodLevel="medium",this.resize()):this.currentLodLevel==="medium"&&(this.renderer.setPixelRatio(.75),this.currentLodLevel="low",this.resize()))}updateCyberStrings(){if(!this.matrixCyberStreams)return;let e=!1,t="MINDWAVE🪷";const i=this.cyberConfig;i.logicMode==="custom"||i.logicMode==="txt"?(e=!0,t="🪷"+(i.customText||"WELCOME TO MINDWAVE")):(i.logicMode==="mindwave"||i.logicMode==="mw")&&(e=!0,t="MINDWAVE🪷");const a="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",o="0123456789·:.-+x[]<>/\\∆ΣΩ∞",s=100;this.matrixCyberStreams.forEach(r=>{if(r.chars=[],r.isTextMode=e,e&&t.length>0){const n=[...t].reverse();for(let f=0;f<s;f++)r.chars.push(n[f%n.length])}else if(i.logicMode==="matrix"||i.logicMode==="interstellar"||i.logicMode==="int")for(let n=0;n<s;n++)r.chars.push(o.charAt(Math.floor(Math.random()*o.length)));else for(let n=0;n<s;n++)r.chars.push(a.charAt(Math.floor(Math.random()*a.length)))})}setCyberLogicMode(e,t){this.cyberConfig.logicMode=e,t!==void 0&&(this.cyberConfig.customText=t),this.updateCyberStrings()}setMatrixLogicMode(e,t){if(this.matrixConfig.logicMode=e,t!==void 0&&(this.matrixConfig.customText=t),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTexture){const i=this.cyberMaterial.uniforms.uTexture.value,a=this.createCyberTexture(this.matrixConfig);this.cyberMaterial.uniforms.uTexture.value=a,this.cyberMaterial.needsUpdate=!0,i&&i.dispose()}this.initCyber()}setCyberColor(e){this.cyberConfig.color=e,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uColor&&this.cyberMaterial.uniforms.uColor.value.set(e)}setCyberAngle(e){this.cyberConfig.angle=e}setMatrixAngle(e){this.matrixConfig.angle=e,this.currentCyberAngle=e,this.cyberRotationGroup&&(this.cyberRotationGroup.rotation.z=pe.degToRad(-e))}setVibrationEnabled(e){this.vibrationEnabled=e}updateLogoTexture(){if(!this.originalLogoImg)return;const e=512;this._logoRenderCanvas||(this._logoRenderCanvas=document.createElement("canvas"),this._logoRenderCanvas.width=e,this._logoRenderCanvas.height=e);const t=this._logoRenderCanvas,i=t.getContext("2d",{willReadFrequently:!0});i.clearRect(0,0,e,e),i.drawImage(this.originalLogoImg,0,0,e,e);const a=i.getImageData(0,0,t.width,t.height),o=a.data,s=document.body.dataset.theme||"default",r=le[s]||le.default,n=r.secondary||r.accent||"#ffffff",f=this.customColors&&this.customColors.mandala?this.customColors.mandala:this.customColor,m=f?f.getHex():parseInt(r.accent.replace("#",""),16),l=parseInt(n.replace("#",""),16),v=m>>16&255,c=m>>8&255,h=m&255,p=l>>16&255,z=l>>8&255,R=l&255;this.themeType=document.body.dataset.themeType||"dark",this.themeType;for(let S=0;S<o.length;S+=4){const T=o[S],b=o[S+1],A=o[S+2],E=o[S+3];E<10||(T>200&&b>200&&A>200?(o[S]=v,o[S+1]=c,o[S+2]=h,o[S+3]=255):(o[S]=p,o[S+1]=z,o[S+2]=R,o[S+3]=Math.min(255,E*1.5)))}i.putImageData(a,0,0);const I=new J(t);if(I.minFilter=ve,I.magFilter=ve,I.generateMipmaps=!0,this.renderer&&(I.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),this.logoMesh){const S=this.logoMesh.material.map;this.logoMesh.material.map=I,this.logoMesh.material.needsUpdate=!0,S&&S.dispose()}else{const S=new j(5.625,4.78),T=new _({map:I,transparent:!0,opacity:.8,color:16777215,depthTest:!1,depthWrite:!1});if(this.logoMesh=new P(S,T),this.logoMesh.position.set(0,0,-10),this.logoMesh.renderOrder=999,this.scene.add(this.logoMesh),this.camera&&!this.dimmerPlane){const b=new j(1e3,1e3);this.dimmerPlane=new P(b,new _({color:0,transparent:!0,opacity:0,depthTest:!1})),this.dimmerPlane.renderOrder=998,this.dimmerPlane.position.z=-5,this.camera.add(this.dimmerPlane),this.scene.add(this.camera)}}}initOverlayLogo(){if(this.logoMesh)return;const e=new Image;e.crossOrigin="anonymous",e.src="./mindwave-logo-icon.png",e.onload=()=>{this.originalLogoImg=e,this.updateLogoTexture(),this.targetLogoOpacity!==void 0?this.setLogoOpacity(this.targetLogoOpacity):this.setLogoOpacity(.8)},e.onerror=t=>{}}setLogoOpacity(e){this.targetLogoOpacity=e,this.logoMesh&&this.logoMesh.material?this.logoMesh.material.opacity=e*this.brightnessMultiplier:!this.logoMesh&&e>0&&this.initOverlayLogo()}applyCymaticClassAndVariation(e,t){this.cymaticsCore&&(this.cymaticsCore.setPattern(e,t),this.activeModes.has("cymatics")||this.toggleMode("cymatics"))}setCymaticColor(e,t,i){if(this.cymaticsCore){if(i!==void 0)this.cymaticsCore.setColor(e,t,i);else if(e!==void 0){const a=e,o=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(o,1,a)}}}setCymaticColor2(e){if(!this.cymaticsCore)return;const t=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(t,2,new F(e))}setCymaticColor3(e){if(!this.cymaticsCore)return;const t=this.cymaticsCore.activeClassId||22;this.cymaticsCore.setColor(t,3,new F(e))}setCymaticParam(e,t,i){this.cymaticsCore&&this.cymaticsCore.setParam(e,t,i)}dispose(){this.active=!1,g.animationId&&(cancelAnimationFrame(g.animationId),g.animationId=null),window.removeEventListener("resize",this.resize),window.removeEventListener("resize",this.resizeOverlayCanvas),window.removeEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode&&window.removeEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange&&document.removeEventListener("visibilitychange",this._boundVisibilityChange),this._boundThemeChange&&window.removeEventListener("themeChanged",this._boundThemeChange),this.canvas&&(this._boundContextLost&&this.canvas.removeEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored&&this.canvas.removeEventListener("webglcontextrestored",this._boundContextRestored)),this._boundCymaticPointer&&(window.removeEventListener("mousemove",this._boundCymaticPointer),window.removeEventListener("touchmove",this._boundCymaticPointer),this._boundCymaticPointer=null);const e=i=>{if(i)for(;i.children.length>0;){const a=i.children[0];if(i.remove(a),a.geometry&&a.geometry.dispose(),a.material){if(a.material.map&&a.material.map.dispose(),a.material.uniforms)for(const o in a.material.uniforms){const s=a.material.uniforms[o];s&&s.value&&s.value.dispose&&s.value.dispose()}a.material.dispose()}a.children&&a.children.length&&a.traverse(o=>{o.geometry&&o.geometry.dispose(),o.material&&(o.material.map&&o.material.map.dispose(),o.material.dispose())})}},t=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];this._fpsRingBuffer=null,this._tempColor=null,this._logoRenderCanvas=null,t.forEach(e),this.cyberMaterial&&(this.cyberMaterial.dispose(),this.cyberMaterial=null),this.fireMaterial&&(this.fireMaterial.dispose(),this.fireMaterial=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.lightspeedMaterial&&(this.lightspeedMaterial.dispose(),this.lightspeedMaterial=null),this.rainMaterial&&(this.rainMaterial.dispose(),this.rainMaterial=null),this.petalMaterial&&(this.petalMaterial.dispose(),this.petalMaterial=null),this.logoMesh&&(this.logoMesh.material&&(this.logoMesh.material.map&&this.logoMesh.material.map.dispose(),this.logoMesh.material.dispose()),this.logoMesh.geometry&&this.logoMesh.geometry.dispose(),this.scene&&this.scene.remove(this.logoMesh),this.logoMesh=null);for(const i in this.textures)this.textures[i]&&this.textures[i].dispose&&this.textures[i].dispose();if(this.textures={},this._freqDataArray=null,this.renderer){try{this.renderer.forceContextLoss()}catch{}this.renderer.dispose(),this.renderer=null}this.scene=null,this.camera=null}setWarpSpeed(e){this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uSpeed.value=e)}setWarpFov(e){this.camera&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setWarpChromatic(e){this.lightspeedMaterial}}ne(ge,"CYMATIC_PATTERNS",[{classId:22,variationId:0,name:"Fundamental Zenith",style:"fractal"},{classId:22,variationId:1,name:"Quantum Flower",style:"sacred"},{classId:22,variationId:2,name:"Sacred Sun Resonance",style:"complex"},{classId:22,variationId:3,name:"Ethereal Nexus",style:"geometry"},{classId:22,variationId:4,name:"Golden Ratio Spiral",style:"fractal"},{classId:22,variationId:5,name:"Obsidian Bloom",style:"sacred"},{classId:22,variationId:6,name:"Prismatic Core",style:"complex"},{classId:22,variationId:7,name:"Void Resonance",style:"geometry"},{classId:22,variationId:8,name:"Nebula Plasma",style:"fractal"},{classId:22,variationId:9,name:"Sacred Gold Obsidian",style:"sacred"},{classId:22,variationId:10,name:"Biolum Abyssal",style:"complex"},{classId:22,variationId:11,name:"Emerald Cyber Matrix",style:"geometry"},{classId:22,variationId:12,name:"Liquid Mercury Crimson",style:"fractal"},{classId:22,variationId:13,name:"Quantum Crystal Lattice",style:"sacred"},{classId:22,variationId:14,name:"Solar Flare Harmonics",style:"complex"},{classId:22,variationId:15,name:"Amethyst Hyperdimensional",style:"geometry"},{classId:22,variationId:16,name:"Neon Labyrinth",style:"fractal"},{classId:22,variationId:17,name:"Celestial Mandala",style:"sacred"},{classId:22,variationId:18,name:"Astral Lotus",style:"complex"},{classId:22,variationId:19,name:"Lunar Tides",style:"geometry"},{classId:22,variationId:20,name:"Cybernetic Lotus",style:"fractal"},{classId:22,variationId:21,name:"Bioluminescent Shroom",style:"sacred"},{classId:22,variationId:22,name:"Vortex of Time",style:"complex"},{classId:22,variationId:23,name:"Diamond Lattice",style:"geometry"},{classId:22,variationId:24,name:"Seraphim Wings",style:"fractal"},{classId:22,variationId:25,name:"Fractal Heart",style:"sacred"},{classId:22,variationId:26,name:"Particle Swarm",style:"complex"},{classId:22,variationId:27,name:"Fluid SDF",style:"geometry"},{classId:22,variationId:28,name:"Quantum Topology",style:"fractal"},{classId:22,variationId:29,name:"Ai Cymatic 15",style:"sacred"}]);function Qe(){return u?Promise.resolve(u):new Promise(y=>{ke(),setTimeout(()=>y(u),10)})}function ke(){if(!u&&O.canvas&&O.canvas.activeVisualizer&&O.canvas.activeVisualizer.isVisualizer3D&&(u=O.canvas.activeVisualizer),O.canvas&&O.canvas.activeVisualizer){if(u&&O.canvas.activeVisualizer===u)return u;O.canvas.activeVisualizer.dispose(),O.canvas.activeVisualizer=null,u=null}g.animationId&&(cancelAnimationFrame(g.animationId),g.animationId=null);const y=O.canvas||document.getElementById("visualizer");if(!u&&y){const e=y&&y.activeVisualizer&&y.activeVisualizer.isVisualizer3D?{activeModes:y.activeVisualizer.activeModes,mode:y.activeVisualizer.mode,mindWaveMode:y.activeVisualizer.mindWaveMode,cyberLogicMode:y.activeVisualizer.cyberLogicMode,cyberCustomText:y.activeVisualizer.cyberCustomText,currentCyberAngle:y.activeVisualizer.currentCyberAngle,cyberSpeedMultiplier:y.activeVisualizer.cyberSpeedMultiplier,rainbowEnabled:y.activeVisualizer._rainbowEnabled}:{};u=new ge(y,e),y.activeVisualizer=u,setTimeout(()=>{u&&(u.updateVisibility(),Ne())},0)}return u}function Je(){return u}let re=!1;function Ke(){re=!0,u&&g.animationId&&(cancelAnimationFrame(g.animationId),g.animationId=null,u.renderer&&u.scene&&u.camera&&u.renderer.render(u.scene,u.camera))}function Ne(){u&&!g.animationId&&(u.active=!0,u.render(g.analyserLeft,g.analyserRight),re=!1)}function et(){return re}function tt(y){u&&u.toggleMode(y)}function it(y){u&&(u.setGlobalSpeed(y),u.setCyberSpeed&&u.setCyberSpeed(y))}function at(y,e=null){u&&(u.setVisualColor(y,e),u.setCyberColor&&(!e||e=="cyber")&&u.setCyberColor(y))}function st(y){u&&u.setGlobalBrightness&&u.setGlobalBrightness(y)}function ot(y){u&&u.setLogoOpacity(y)}function rt(y){u&&u.setMouseInfluence(y)}window.toggleGalaxySun=function(){return u?u.toggleGalaxySunStyle():null};window.setCymaticPattern=function(y,e){u&&u.cymaticsCore?(u.cymaticsCore.setPattern(y,e),u.activeModes.has("cymatics")||(window.switchRightTab&&window.switchRightTab("active",document.querySelector('.tab-pill[title="Cymatics"]')),u.activeModes.add("cymatics"),u.cymaticsGroup.visible=!0)):(window.setVisualMode&&window.setVisualMode("cymatics"),setTimeout(()=>{u&&u.cymaticsCore&&u.cymaticsCore.setPattern(y,e)},500))};window.setCymaticColor=function(y,e,t){u&&u.cymaticsCore&&u.cymaticsCore.setColor(y,e,t)};window.setCymaticParam=function(y,e,t){u&&u.cymaticsCore&&u.cymaticsCore.setParam(y,e,t)};window.setConstellationLayer2Type=function(y){u&&u.cymaticsCore&&u.cymaticsCore.setConstellationLayer2Type(y)};export{ge as Visualizer3D,Je as getVisualizer,ke as initVisualizer,et as isVisualsPaused,Ke as pauseVisuals,Qe as preloadVisualizer,Ne as resumeVisuals,rt as setMouseInfluence,st as setVisualBrightness,at as setVisualColor,ot as setVisualLogoOpacity,it as setVisualSpeed,tt as toggleVisual};
//# sourceMappingURL=visualizer_vGOLD_SYNC-C022YUuY.js.map
