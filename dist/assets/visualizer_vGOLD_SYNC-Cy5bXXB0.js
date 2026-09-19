import{h as d,T as de,e as k}from"./controls_v3-D3vlDeQj.js";import{C as R,G as z,S as Ie,P as Te,W as Ge,I as ae,M as V,a as A,A as T,B as q,b as H,c as B,d as j,E as re,e as ne,L as J,f as ee,O as ze,g as me,h as le,i as se,F as Y,j as ce,D as Z,k as Pe,T as fe,l as Le,m as pe,n as ve,o as te,R as Re,p as Ae,q as X,V as $,r as _e,s as Fe,t as Ee,u as De,N as ye,v as Ve,w as Be,x as ge,y as Ne,z as Me}from"./three-Bm1OY7ZQ.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";let M=null;class Q{constructor(e,t={}){this.canvas=e,this.activeModes=t.activeModes||new Set,this.mode=t.mode||"none",this.mindWaveMode=t.mindWaveMode!==void 0?t.mindWaveMode:!0,this.galaxySunStyle=t.galaxySunStyle||"sun",this.currentCymaticData={name:"Fundamental Zenith",n:1,m:1,energy:.2},this.cymaticsHistory=[],this.cymaticsHistoryIndex=-1,this._cymaticDriftOffset=Math.random()*1e3,this.cyberConfig={logicMode:t.cyberLogicMode||"matrix",customText:t.cyberCustomText||"WELCOME",angle:t.cyberAngle||0,speed:t.cyberSpeedMultiplier||1,length:1,color:"#00FF41",rainbow:!0},this.matrixConfig={logicMode:t.matrixLogicMode||"interstellar",customText:t.matrixCustomText||"MINDWAVE",angle:0,speed:1,length:1,color:"#00FF41",rainbow:!1},this.initialized=!1,this._rainbowEnabled=t.rainbowEnabled||!1,this.isVisualizer3D=!0,this.overlayCanvas=document.getElementById("cyberCanvas"),this.overlayCtx=this.overlayCanvas?this.overlayCanvas.getContext("2d",{alpha:!0}):null,this.overlayCanvas&&(this.resizeOverlayCanvas(),window.addEventListener("resize",()=>this.resizeOverlayCanvas())),this.matrixCyberStreams=[],this.currentCyberAngle=t.cyberAngle!==void 0?t.cyberAngle:0,this.cyberColorCustomized=!1;try{const a=localStorage.getItem("cyberThemeHistory");this.themeHistory=a?JSON.parse(a):[],this.lastCyberFamily=localStorage.getItem("cyberLastFamily")||""}catch{this.themeHistory=[],this.lastCyberFamily=""}this.currentLogoOpacity=.8,this.targetLogoOpacity=.8,M=this,this.themeType=document.body.dataset.themeType||"dark";const i=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);this.batterySaver=t.batterySaver!==void 0?t.batterySaver:i,this.isLowPower=this.batterySaver||localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode"),this.lastFrameRenderTime=0,this.targetFPS=this.isLowPower?30:60,this.vibrationEnabled=typeof d<"u"&&d.visualVibration!==void 0?d.visualVibration:t.visualVibration!==void 0?t.visualVibration:!1,this._fpsRingBuffer=new Float64Array(60),this._fpsRingIndex=0,this._fpsRingCount=0,this.lastLodDegradation=0,this.currentLodLevel="high",this._tempColor=new R,this._logoRenderCanvas=null,this.sphereGroup=new z,this.particleGroup=new z,this.lightspeedGroup=new z,this.lavaGroup=new z,this.fireplaceGroup=new z,this.rainforestGroup=new z,this.zenGardenGroup=new z,this.oceanGroup=new z,this.wavesGroup=new z,this.cyberGroup=new z,this.boxGroup=new z,this.dragonGroup=new z,this.galaxyGroup=new z,this.mandalaGroup=new z,this.cymaticsGroup=new z,this.snowflakeGroup=new z,this._snowData=null;try{this.scene=new Ie,[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup].forEach(s=>this.scene.add(s)),this.camera=new Te(75,e.width/e.height,.1,1e3),this.renderer=new Ge({canvas:e,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(0,0),this.renderer.setSize(e.clientWidth,e.clientHeight);const o=this.isLowPower?1:2;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,o)),this.textures={},this.customColors={},this.customColor=null,this._isRendering=!1,this._freqDataArray=null,this.initEnvironment(),this.camera.position.z=5,this.handleLayoutChange=this.handleLayoutChange.bind(this),window.addEventListener("resize",()=>{this.resize(),this.handleLayoutChange()}),window.addEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode=()=>{this.currentLodLevel!=="low"&&(this.degradeLOD(),this.degradeLOD())},window.addEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange=()=>{document.hidden||(this.lastTime=performance.now()*.001,this.active!==!1&&this.initialized&&this.render(d.analyserLeft,d.analyserRight))},document.addEventListener("visibilitychange",this._boundVisibilityChange),this._boundContextLost=s=>{s.preventDefault(),this.active=!1,d.animationId&&(cancelAnimationFrame(d.animationId),d.animationId=null)},e.addEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored=()=>{try{this.initialized=!1,this._freqDataArray=null,this.initEnvironment(),this.updateVisibility(),this.initialized=!0,this.active=!0,this.lastTime=performance.now()*.001,d.animationId&&cancelAnimationFrame(d.animationId),this._isRendering=!1,this.render(d.analyserLeft,d.analyserRight)}catch{}},e.addEventListener("webglcontextrestored",this._boundContextRestored),this.resize(),setTimeout(this.handleLayoutChange,100),this._boundThemeChange=s=>{if(s.detail&&s.detail.type){const r=s.detail.type;this.themeType!==r&&(this.themeType=r,this.updateLogoTexture())}},window.addEventListener("themeChanged",this._boundThemeChange),this.speedMultiplier=1,this.brightnessMultiplier=1,this.lastTime=performance.now()*.001,this.simTime=0,this.targetFPS=60,this.lastFrameRenderTime=0,this.active=!0,this.updateVisibility(),this.initialized=!0,this.initOverlayLogo(),window.viz3D=this}catch{this.initialized=!1}}resize(){if(!this.renderer||!this.canvas||!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.handleLayoutChange()}handleLayoutChange(){!this.renderer||!this.camera||this.camera.clearViewOffset()}resizeOverlayCanvas(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight)}generateCyberStyle(){const e=this.overlayCanvas,t=this.overlayCtx;if(!e||!t)return;this.matrixCyberStreams=[];const i=Math.max(11,Math.min(21,Math.floor(e.width/50)));this.isLowPower=localStorage.getItem("mindwave_battery_saver")==="true"||document.body.classList.contains("system-stability-mode");let a=Math.ceil(e.width/i);this.isLowPower||(a*=1.5);let o=window.getCurrentTheme?window.getCurrentTheme():{color:"#2dd4bf"};this.resizeOverlayCanvas(),this.cyberColorCustomized=!1;const s=[{name:"System Yellow",color:"#FFFF00",family:"yellow"},{name:"Neon Pink",color:"#FF1493",family:"pink"},{name:"Chrome Static",color:"#C0C0C0",family:"mono"},{name:"Royal Data",color:"#4169E1",family:"blue"},{name:"White Noise",color:"#FFFFFF",family:"mono"},{name:"Cyan Future",color:"#00FFFF",family:"blue"},{name:"Lime Access",color:"#32CD32",family:"green"},{name:"Purple Haze",color:"#800080",family:"purple"},{name:"Emerald Link",color:"#50C878",family:"green"},{name:"Ice Blue",color:"#A5F2F3",family:"blue"},{name:"sentAIent Blue",color:"#60A9FF",family:"blue"},{name:"Rainbow Surge",color:"rainbow",family:"rainbow"}],r=this.lastCyberFamily||"";let n=s.filter(c=>!this.themeHistory.includes(c.name));const m=n.filter(c=>c.family!==r);m.length>0&&(n=m);let u=n;if(u.length===0){const c=this.themeHistory[this.themeHistory.length-1];u=s.filter(v=>v.name!==c)}const l=u[Math.floor(Math.random()*u.length)];this.themeHistory.push(l.name),this.themeHistory.length>5&&this.themeHistory.shift(),this.lastCyberFamily=l.family;try{localStorage.setItem("cyberThemeHistory",JSON.stringify(this.themeHistory)),localStorage.setItem("cyberLastFamily",this.lastCyberFamily)}catch{}this.cyberSpeedMultiplier===void 0&&(this.cyberSpeedMultiplier=.2),this.cyberLengthMultiplier===void 0&&(this.cyberLengthMultiplier=.7);const p=document.getElementById("cyberRainbowToggle");if(p&&this.cyberRainbowMode===void 0&&(this.cyberRainbowMode=!0,this.cyberConfig.rainbow=!0,p.checked=!0),!this.cyberRainbowMode&&o.color!=="rainbow"){this.cyberColor=o.color;const c=document.getElementById("cyberColorPicker");c&&(c.value=this.cyberColor)}for(let c=0;c<a;c++){const v=Math.random(),f=Math.floor(8+v*11),y=(2+v*8+Math.random()*2)*this.cyberSpeedMultiplier;this.matrixCyberStreams.push({x:c*i,y:Math.random()*this.overlayCanvas.height*1.5-this.overlayCanvas.height*.5,baseSpeed:y,opacity:.2+v*.8,size:f,chars:[],color:o.color!=="rainbow"?o.color:"#FFFFFF"})}this.updateCyberStrings(),this.matrixCyberStreams.sort((c,v)=>c.size-v.size)}renderCyberCyber(){const e=this.activeModes.has("cyber");if(!this.overlayCtx||!this.matrixCyberStreams||!e)return;const t=this.overlayCtx,i=this.overlayCanvas;t.clearRect(0,0,i.width,i.height);const a=this.activeModes.size>1;t.fillStyle=a?"rgba(0, 0, 0, 0.4)":"rgba(0, 0, 0, 0.85)",t.fillRect(0,0,i.width,i.height),t.save(),t.textAlign="center";const o=this.cyberConfig,s=o.speed||1,r=o.length||1;o.angle!==0&&(t.translate(i.width/2,i.height/2),t.rotate(o.angle*Math.PI/180),t.translate(-i.width/2,-i.height/2));const n=20,m=Date.now()*.1;t.textBaseline="middle";let u=-1;this.matrixCyberStreams.forEach((l,p)=>{l.y+=l.baseSpeed*s;let c=Math.max(3,Math.floor(n*r));(this.isLowPower||this.currentLodLevel==="low")&&(c=Math.floor(c*.4)),l.y-c*l.size>i.height*1.5&&(l.y=0);const v="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";l.size!==u&&(t.font=`${l.size}px monospace`,u=l.size);const f=this.isLowPower&&this.currentLodLevel==="low"?2:1;for(let y=0;y<c&&y<l.chars.length;y+=f){!l.isTextMode&&Math.random()<.02&&(l.chars[y]=v.charAt(Math.floor(Math.random()*v.length)));const P=l.chars[y],L=l.y-y*l.size;if(L<-l.size*2||L>i.height*1.5)continue;const S=1-y/c,F=Math.pow(S,.4)*(l.opacity*1.2);if(t.globalAlpha=Math.min(1,F),this.cyberRainbowMode){const G=(m+p*15+y*5)%360;t.fillStyle=`hsl(${G}, 100%, 60%)`}else t.fillStyle=l.color||this.cyberColor;t.fillText(P,l.x,L)}}),t.shadowBlur=0,t.globalAlpha=1,t.restore()}initSphere(){var s;const e=new ae(2,2),t=new V({color:6334975,wireframe:!0,transparent:!0,opacity:.5});this.sphere=new A(e,t);const i=new ae(1.8,1),a=new V({color:6334975,transparent:!0,opacity:.1,blending:T});this.core=new A(i,a),this.sphereGroup.add(this.sphere),this.sphereGroup.add(this.core),this.sphereGroup.visible=!1;const o=((s=this.customColors)==null?void 0:s.sphere)||this.customColor;o&&(this.sphere.material.color.copy(o),this.core.material.color.copy(o))}initLightspeed(){const t=new q,i=new Float32Array(2e3*3);for(let a=0;a<2e3*3;a++)i[a]=(Math.random()-.5)*80;t.setAttribute("position",new H(i,3)),this.lightspeedMaterial=new B({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new R(3003583)},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:T,depthWrite:!1}),this.lightspeed=new j(t,this.lightspeedMaterial),this.lightspeedGroup.add(this.lightspeed)}initParticles(){const e=this.batterySaver?400:1e3,t=new q,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let o=0;o<e;o++){const s=o*3;i[s]=(Math.random()-.5)*60,i[s+1]=(Math.random()-.5)*60,i[s+2]=(Math.random()-.5)*80;const r=Math.random();r<.3?(a[s]=.4,a[s+1]=.7,a[s+2]=1):r<.6?(a[s]=.3,a[s+1]=.9,a[s+2]=.95):r<.85?(a[s]=.6,a[s+1]=.4,a[s+2]=1):(a[s]=.9,a[s+1]=.9,a[s+2]=1)}t.setAttribute("position",new H(i,3)),t.setAttribute("color",new H(a,3)),this.particleMaterial=new B({uniforms:{uTime:{value:0},uSpeed:{value:1},uSize:{value:.4},uTexture:{value:this.createCircleTexture()}},vertexShader:`
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
            `,transparent:!0,blending:T,depthWrite:!1}),this.particles=new j(t,this.particleMaterial),this.particleGroup.add(this.particles),this.particleGroup.visible=!1}initBox(){var u;this.boxOuter=new z;const e=new re(new ne(3,3,3)),t=new J({color:16777215,transparent:!0,opacity:.9,blending:T}),i=new J({color:3900150,transparent:!0,opacity:.5,blending:T});this.boxOuter.add(new ee(e,t));for(let l=1;l<=3;l++){const p=new ee(e,i);p.scale.setScalar(1+l*.012),this.boxOuter.add(p)}const a=new re(new ne(2,2,2)),o=new J({color:14742270,transparent:!0,opacity:.8,blending:T}),s=new J({color:6333946,transparent:!0,opacity:.4,blending:T});this.boxInner=new z,this.boxInner.add(new ee(a,o));for(let l=1;l<=2;l++){const p=new ee(a,s);p.scale.setScalar(1+l*.015),this.boxInner.add(p)}const r=new re(new ne(3.05,3.05,3.05)),n=new J({color:9684477,transparent:!0,opacity:.8,blending:T});this.boxEdges=new ee(r,n),this.boxGroup.add(this.boxOuter),this.boxGroup.add(this.boxInner),this.boxGroup.add(this.boxEdges),this.boxGroup.visible=!1;const m=((u=this.customColors)==null?void 0:u.box)||this.customColor;m&&(this.boxOuter.children.forEach(l=>l.material.color.copy(m)),this.boxInner.children.forEach(l=>l.material.color.copy(m)),this.boxEdges&&this.boxEdges.material&&this.boxEdges.material.color.copy(m))}initDragon(){var p;this.dragonDummy=new ze,this.dragonLength=80;const e=new ae(.8,1),t=new V({color:15680580,wireframe:!0,transparent:!0,opacity:.8,blending:T}),i=new ae(.5,1),a=new V({color:16096779,wireframe:!1,transparent:!0,opacity:.6,blending:T});this.dragonBodyInstanced=new me(e,t,this.dragonLength),this.dragonGlowInstanced=new me(i,a,this.dragonLength);const o=new le(1.5,3.5,5);o.rotateX(Math.PI/2);const s=new V({color:16638023,wireframe:!0,transparent:!0,opacity:.9,blending:T});this.dragonHead=new A(o,s),this.dragonPearlGroup=new z;const r=new se(1,16,16),n=new V({color:3718648,wireframe:!1,transparent:!0,opacity:.9,blending:T}),m=new se(1.3,16,16),u=new V({color:8246268,wireframe:!0,transparent:!0,opacity:.5,blending:T});this.dragonPearl=new A(r,n),this.dragonPearlHalo=new A(m,u),this.dragonPearlGroup.add(this.dragonPearl),this.dragonPearlGroup.add(this.dragonPearlHalo),this.dragonGroup.add(this.dragonBodyInstanced),this.dragonGroup.add(this.dragonGlowInstanced),this.dragonGroup.add(this.dragonHead),this.dragonGroup.add(this.dragonPearlGroup),this.dragonGroup.visible=!1;const l=((p=this.customColors)==null?void 0:p.dragon)||this.customColor;l&&this.updateDragonColor(l)}updateGalaxyColor(e){if(this.galaxySunMesh&&this.galaxySunMesh.traverse(t=>{t.isMesh&&t.material&&t.material.color.copy(e)}),this.galaxyStars&&this.galaxyStars.geometry){const t={};e.getHSL(t);const i=(t.h+.5)%1,a=this.galaxyStars.geometry.getAttribute("color");if(a){const o=a.count,s=this._tempColor;for(let r=0;r<o;r++){const n=r/o,m=n<.2?.8:n<.5?.6:.4+Math.random()*.15,u=.6+Math.random()*.3;s.setHSL(i,u,m),a.setXYZ(r,s.r,s.g,s.b)}a.needsUpdate=!0}}}updateDragonColor(e){if(!this.dragonBodyInstanced)return;this.dragonBodyInstanced.material.color.copy(e),this.dragonHead.material.color.copy(e);const t={};e.getHSL(t);const i=(t.h+.5)%1,a=new R().setHSL(i,t.s,t.l);this.dragonGlowInstanced.material.color.copy(a)}initGalaxy(){const e=this.batterySaver?500:1500,t=new q,i=[],a=[],o=[];for(let n=0;n<e;n++){const m=n/e*Math.PI*10,u=2.5+n/e*20+Math.random()*2,l=n%4*(Math.PI*2/4),p=Math.max(.5,n/e*4),c=Math.cos(m+l)*u+(Math.random()-.5)*p,v=(Math.random()-.5)*1.5,f=Math.sin(m+l)*u+(Math.random()-.5)*p;i.push(c,v,f);const y=n/e;y<.2?a.push(1,.95,.7):y<.5?a.push(.7+Math.random()*.3,.8,1):a.push(.4+Math.random()*.2,.3+Math.random()*.3,.8+Math.random()*.2),o.push(Math.random()<.05?.4+Math.random()*.3:.08+Math.random()*.15)}t.setAttribute("position",new Y(i,3)),t.setAttribute("color",new Y(a,3)),t.setAttribute("size",new Y(o,1));const s=this.createStarTexture(),r=new ce({size:.25,vertexColors:!0,map:s,transparent:!0,opacity:.9,blending:T,depthWrite:!1,sizeAttenuation:!0});this.galaxyStars=new j(t,r),this.galaxyGroup.add(this.galaxyStars),this.galaxySunStyle=this.galaxySunStyle||"sun",this.createGalaxySun(this.galaxySunStyle),this.galaxyGroup.visible=!1}createGalaxySun(e){this.galaxySunMesh&&(this.galaxyGroup.remove(this.galaxySunMesh),this.galaxySunMesh=null),this.galaxySunMesh=new z;const t=new V({color:4892415,transparent:!0,opacity:.85,blending:T,depthWrite:!1,side:Z}),i=new z;if(e==="sun2"){const a=t.clone();a.side=Pe;const o=new fe(1.5,.25,16,64);i.add(new A(o,a));const s=8,r=new le(.4,2.7,4);r.translate(0,2.7/2,0);const n=new le(.2,1.7,4);n.translate(0,1.7/2,0);for(let m=0;m<s;m++){const u=m/s*Math.PI*2,l=new A(r,a);l.rotation.z=-u,l.position.set(Math.sin(u)*1.5,Math.cos(u)*1.5,0),i.add(l);const p=u+Math.PI/s,c=new A(n,a);c.rotation.z=-p,c.position.set(Math.sin(p)*1.5,Math.cos(p)*1.5,0),i.add(c)}}else if(e==="sun3"){const a={uTime:{value:0},uColor:{value:t.color},uBassIntt:{value:0}};this.galaxySunUniforms=a;const o=`
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
            `,r=new B({vertexShader:o,fragmentShader:s,uniforms:a,transparent:!0,blending:T,depthWrite:!1,side:Z}),n=new se(2,64,64),m=new A(n,r);i.add(m);const u=new V({color:t.color,transparent:!0,opacity:.15,blending:T,depthWrite:!1,side:Le}),l=new se(3,32,32);i.add(new A(l,u))}else{const a=new fe(1.5,.12,8,64);i.add(new A(a,t));const o=8;for(let s=0;s<o;s++){const r=s/o*Math.PI*2,n=new pe;n.moveTo(-.4,0),n.lineTo(.4,0),n.lineTo(0,2.7),n.lineTo(-.4,0);const m=new ve(n),u=new A(m,t);u.rotation.z=-r,u.position.set(Math.sin(r)*1.5,Math.cos(r)*1.5,0),i.add(u);const l=r+Math.PI/o,p=new pe;p.moveTo(-.2,0),p.lineTo(.2,0),p.lineTo(0,1.7),p.lineTo(-.2,0);const c=new ve(p),v=new A(c,t);v.rotation.z=-l,v.position.set(Math.sin(l)*1.5,Math.cos(l)*1.5,0),i.add(v)}}this.galaxySunMesh.add(i),this.galaxySunMesh.position.set(0,0,.1),this.galaxyGroup.add(this.galaxySunMesh)}setGalaxySunStyle(e){e!=="sun"&&e!=="sun2"&&e!=="sun3"||(this.galaxySunStyle=e,this.galaxyGroup&&this.galaxyGroup.children.length>0&&this.createGalaxySun(e))}setGalaxySunRotation(e,t){e==="x"&&(this.sunRotationSpeedX=parseFloat(t)),e==="y"&&(this.sunRotationSpeedY=parseFloat(t)),e==="z"&&(this.sunRotationSpeedZ=parseFloat(t))}createStarTexture(){if(this.textures.star)return this.textures.star;const e=64,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),a=e/2,o=e/2;i.clearRect(0,0,e,e);const s=i.createRadialGradient(a,o,0,a,o,e/2);return s.addColorStop(0,"rgba(255, 255, 255, 1.0)"),s.addColorStop(.1,"rgba(255, 255, 240, 0.8)"),s.addColorStop(.25,"rgba(255, 255, 200, 0.3)"),s.addColorStop(.5,"rgba(200, 200, 255, 0.1)"),s.addColorStop(1,"rgba(100, 100, 255, 0)"),i.fillStyle=s,i.fillRect(0,0,e,e),i.fillStyle="rgba(255, 255, 255, 0.6)",i.beginPath(),i.moveTo(0,o-1),i.lineTo(a,o-.5),i.lineTo(e,o-1),i.lineTo(e,o+1),i.lineTo(a,o+.5),i.lineTo(0,o+1),i.closePath(),i.fill(),i.beginPath(),i.moveTo(a-1,0),i.lineTo(a-.5,o),i.lineTo(a-1,e),i.lineTo(a+1,e),i.lineTo(a+.5,o),i.lineTo(a+1,0),i.closePath(),i.fill(),i.beginPath(),i.arc(a,o,2,0,Math.PI*2),i.fillStyle="rgba(255, 255, 255, 1.0)",i.fill(),this.textures.star=new te(t),this.textures.star}initMandala(){var o;this.mandalaRings=[];const e=[2450411,15357964,3900150,16347926,12573694];for(let s=0;s<5;s++){const r=1.2+s*.8,n=6+s*6,m=new Re(r-.05,r+.05,n),u=new V({color:e[s],side:Z,transparent:!0,opacity:.4-s*.05,blending:T}),l=new A(m,u);l.userData={speed:(.01+s*.005)*(s%2===0?1:-1),segments:n},this.mandalaRings.push(l),this.mandalaGroup.add(l)}const t=new Ae(.3,32),i=new V({color:16347926,transparent:!0,opacity:.6,blending:T});this.mandalaCenter=new A(t,i),this.mandalaGroup.add(this.mandalaCenter),this.mandalaGroup.visible=!1;const a=(o=this.customColors)==null?void 0:o.mandala;a&&(this.mandalaRings.forEach(s=>s.material.color.copy(a)),this.mandalaCenter.material.color.copy(a))}createSnowflakeTexture(){if(this.textures.snowflake)return this.textures.snowflake;const e=128,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),a=e/2,o=e/2;i.clearRect(0,0,e,e);const s=i.createRadialGradient(a,o,0,a,o,e*.5);s.addColorStop(0,"rgba(200,230,255,0.5)"),s.addColorStop(.4,"rgba(180,220,255,0.15)"),s.addColorStop(1,"rgba(150,200,255,0)"),i.fillStyle=s,i.fillRect(0,0,e,e),i.strokeStyle="rgba(220,240,255,1.0)",i.lineCap="round";for(let r=0;r<6;r++){const n=r/6*Math.PI*2;i.save(),i.translate(a,o),i.rotate(n),i.lineWidth=2.5,i.beginPath(),i.moveTo(0,0),i.lineTo(0,-52),i.stroke();const m=[{d:18,len:14,angle:Math.PI/4},{d:32,len:20,angle:Math.PI/4},{d:46,len:10,angle:Math.PI/5}];i.lineWidth=1.5,m.forEach(({d:u,len:l,angle:p})=>{[1,-1].forEach(c=>{i.beginPath(),i.moveTo(0,-u),i.lineTo(c*l*Math.cos(Math.PI/2-p),-u-l*Math.sin(Math.PI/2-p)),i.stroke()})}),i.restore()}i.beginPath();for(let r=0;r<6;r++){const n=r/6*Math.PI*2-Math.PI/6,m=a+Math.cos(n)*4,u=o+Math.sin(n)*4;r===0?i.moveTo(m,u):i.lineTo(m,u)}return i.closePath(),i.fillStyle="rgba(255, 255, 255, 0.8)",i.fill(),this.textures.snowflake=new te(t),this.textures.snowflake}initSnowflake(){for(;this.snowflakeGroup.children.length>0;){const c=this.snowflakeGroup.children[0];this.snowflakeGroup.remove(c),c.geometry&&c.geometry.dispose(),c.material&&c.material.dispose()}this._snowData=null;const e=700,t=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e),o=new Float32Array(e),s=new Float32Array(e),r=new Float32Array(e),n=new Float32Array(e);for(let c=0;c<e;c++){const v=c*3;t[v]=(Math.random()-.5)*80,t[v+1]=(Math.random()-.5)*60,t[v+2]=-40+Math.random()*35;const f=(t[v+2]+40)/35;i[c]=1.5+f*8,a[c]=.2+f*.6,o[c]=Math.random()*Math.PI*2,s[c]=.015+Math.random()*.04+f*.03,r[c]=.01+Math.random()*.02,n[c]=.4+Math.random()*.8}const m=new q;m.setAttribute("position",new H(t,3)),m.setAttribute("aSize",new H(i,1)),m.setAttribute("aOpacity",new H(a,1));const u=this.createSnowflakeTexture(),l=new B({uniforms:{uTexture:{value:u},uColor:{value:this.customColor?this.customColor.clone():new R(10875883)},uIntensity:{value:0},uSizeMultiplier:{value:1},uGlowAmount:{value:.5}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:T}),p=new j(m,l);this.snowflakeGroup.add(p),this._snowData={count:e,positions:t,phases:o,speeds:s,drifts:r,driftFreqs:n,points:p,material:l,spinMeshes:[],spinSpeeds:[]}}setSnowSize(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uSizeMultiplier.value=Math.max(.2,Math.min(4,e)))}setSnowGlow(e){var t;(t=this._snowData)!=null&&t.material&&(this._snowData.material.uniforms.uGlowAmount.value=Math.max(0,Math.min(1,e)))}setCymaticIntensity(e){this._cymaticIntensityOverride=e,this.cymaticMaterial&&this.cymaticMaterial.uniforms.uIntensity&&(this.cymaticMaterial.uniforms.uIntensity.value=e)}setCymaticHarmonics(e){d.harmonicsLevel=e,this.cymaticMaterial&&this.cymaticMaterial.uniforms.uHarmonics&&(this.cymaticMaterial.uniforms.uHarmonics.value=e)}setSnowColor(e){var t,i;(t=this._snowData)!=null&&t.material&&this._snowData.material.uniforms.uColor.value.set(e),(i=this._snowData)!=null&&i.spinMeshes&&this._snowData.spinMeshes.forEach(a=>{a.material&&a.material.color.set(e)})}static get CYMATIC_PATTERNS(){return[{name:"3D Fractal Heart",classId:19,variationId:0,cat:"advanced"},{name:"Fluid SDF Core",classId:19,variationId:1,cat:"advanced"},{name:"Particle Swarm",classId:19,variationId:2,cat:"advanced"},{name:"Quantum Topology",classId:19,variationId:3,cat:"advanced"},{name:"Prime Prime",classId:19,variationId:4,cat:"advanced"},{name:"Metatron's Grid",classId:19,variationId:5,cat:"advanced"},{name:"Sacred Resonance",classId:1,variationId:0,cat:"sacred"},{name:"Plasma Bloom",classId:2,variationId:1,cat:"fractal"},{name:"Neural Web",classId:3,variationId:2,cat:"complex"},{name:"Void Geometry",classId:4,variationId:3,cat:"geometry"},{name:"Mandelbrot Fold",classId:5,variationId:4,cat:"fractal"},{name:"Celestial",classId:6,variationId:5,cat:"radial"},{name:"Cosmic Knot",classId:7,variationId:6,cat:"complex"},{name:"Synchronicity",classId:8,variationId:7,cat:"sacred"},{name:"Aetheric Weaver",classId:9,variationId:8,cat:"advanced"},{name:"Fractal Heart",classId:22,variationId:0,cat:"advanced"},{name:"Fluid Sdf",classId:22,variationId:1,cat:"advanced"},{name:"Particle Swarm",classId:22,variationId:2,cat:"advanced"},{name:"Topology",classId:22,variationId:3,cat:"advanced"},{name:"Prime Prime",classId:22,variationId:4,cat:"advanced"},{name:"Metatron",classId:22,variationId:5,cat:"advanced"},{name:"Sacred Gold Obsidian",classId:22,variationId:6,cat:"sacred"},{name:"Biolum Abyssal",classId:22,variationId:7,cat:"complex"},{name:"Nebula Plasma",classId:22,variationId:8,cat:"radial"},{name:"Emerald Cyber Matrix",classId:22,variationId:9,cat:"geometry"},{name:"Mercury Crimson",classId:22,variationId:10,cat:"complex"},{name:"Quantum Crystal Lattice",classId:22,variationId:11,cat:"fractal"},{name:"Solar Flare Harmonics",classId:22,variationId:12,cat:"radial"},{name:"Amethyst Hyperdimensional",classId:22,variationId:13,cat:"fractal"},{name:"Astral Lotus",classId:22,variationId:14,cat:"sacred"},{name:"Celestial Mandala",classId:22,variationId:15,cat:"geometry"},{name:"Quantum Flower",classId:22,variationId:16,cat:"fractal"},{name:"Ethereal Nexus",classId:22,variationId:17,cat:"complex"},{name:"Neon Labyrinth",classId:22,variationId:18,cat:"advanced"},{name:"Prismatic Core",classId:22,variationId:19,cat:"geometry"},{name:"Obsidian Bloom",classId:22,variationId:20,cat:"fractal"},{name:"Void Resonance",classId:22,variationId:21,cat:"radial"},{name:"Golden Ratio Spiral",classId:22,variationId:22,cat:"sacred"},{name:"Sacred Sun Resonance",classId:22,variationId:23,cat:"sacred"},{name:"Lunar Tides",classId:22,variationId:24,cat:"sacred"},{name:"Cybernetic Lotus",classId:22,variationId:25,cat:"advanced"},{name:"Biolum Shroom",classId:22,variationId:26,cat:"fractal"},{name:"Vortex Of Time",classId:22,variationId:27,cat:"complex"},{name:"Diamond Lattice",classId:22,variationId:28,cat:"geometry"},{name:"Seraphim Wings",classId:22,variationId:29,cat:"sacred"}]}initCymatics(){try{if(!this.cymaticsGroup)return;for(;this.cymaticsGroup.children.length>0;){const n=this.cymaticsGroup.children[0];this.cymaticsGroup.remove(n),n.geometry&&n.geometry.dispose(),n.material&&(n.material.map&&n.material.map.dispose(),n.material.dispose())}const e=new X(45,45,128,128);this.cymaticMaterial=new B({uniforms:{uN:{value:this.currentCymaticData?this.currentCymaticData.n:1},uM:{value:this.currentCymaticData?this.currentCymaticData.m:3},uBassN:{value:1},uBassM:{value:1},uHighN:{value:5},uHighM:{value:5},uType:{value:this.currentCymaticData&&this.currentCymaticData.type||0},uEnergy:{value:.5},uTime:{value:0},uIntensity:{value:.5},uHarmonics:{value:0},uBeatFreq:{value:0},uColor:{value:new R(d.visualColors.sphere||"#60a9ff")},uSecondaryColor:{value:new R(16777215)},uResolution:{value:new $(window.innerWidth,window.innerHeight)},uNormMids:{value:0},uNormHighs:{value:0},uMedium:{value:d.cymaticMedium||0},uShiver:{value:0},uMouse:{value:new $(.5,.5)},uMouseActive:{value:0},uResonance:{value:d.cymaticResonance??1},uEntropy:{value:d.cymaticEntropy??1},uFlow:{value:d.cymaticFlow??1}},vertexShader:`
                    varying vec2 vUv;
                    varying float vDisplace;
                    uniform float uTime, uN, uM, uIntensity, uEnergy, uShiver;
                    
                    #define PI 3.14159265359

                    float chladniBase(vec2 p, float n, float m) {
                        return cos(n * PI * p.x) * cos(m * PI * p.y) - cos(m * PI * p.x) * cos(n * PI * p.y);
                    }

                    void main() {
                        vUv = uv;
                        vec2 p = (uv - 0.5) * 2.0;
                        
                        // Calculate basic displacement for vertex shading
                        float f = chladniBase(p, uN, uM);
                        f = abs(f) * (uIntensity + uShiver);
                        
                        vDisplace = f;
                        
                        vec3 pos = position;
                        // Physical displacement: create 3D peaks and valleys
                        pos.z += f * 5.0 * (1.0 + 0.3 * sin(uTime * 3.0)); 
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `,fragmentShader:`
                    varying vec2 vUv;
                    varying float vDisplace;
                    uniform float uN, uM, uBassN, uBassM, uHighN, uHighM;
                    uniform float uBeatFreq, uTime, uIntensity, uType, uEnergy, uHarmonics, uShiver;
                    uniform float uNormMids, uNormHighs, uMedium; 
                    uniform vec3 uColor, uSecondaryColor;
                    uniform vec2 uResolution;
                    uniform vec2 uMouse;
                    uniform float uMouseActive, uResonance, uEntropy, uFlow;

                    #define PI 3.14159265359

                    float hash(vec2 p) {
                        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
                    }

                    float noise(vec2 p) {
                        vec2 i = floor(p);
                        vec2 f = fract(p);
                        f = f * f * (3.0 - 2.0 * f);
                        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
                    }

                    // --- ADVANCED FRACTAL ORGANICS ---
                    // Fractional Brownian Motion for tree bark / neural web textures
                    float fbm(vec2 p) {
                        float f = 0.0;
                        f += 0.5 * noise(p);
                        p *= 2.02;
                        f += 0.25 * noise(p);
                        return f;
                    }

                    float chladniBase(vec2 p, float n, float m) {
                        return cos(n * PI * p.x) * cos(m * PI * p.y) - cos(m * PI * p.x) * cos(n * PI * p.y);
                    }

                    // Layered multi-harmonic Chladni resonance (The "Soul" of v5)
                    float fractalResonance(vec2 uv, float n, float m, float beat, float t) {
                        float pi = 3.14159265;
                        float total = 0.0;
                        vec2 p = uv;
                        float currN = n;
                        float currM = m;
                        for(int i = 0; i < 2; i++) {
                            float t_val = t * 0.4 + float(i) * 2.0;
                            p.x += 0.22 * sin(p.y * 2.5 + t_val + beat * 0.015);
                            p.y += 0.22 * cos(p.x * 2.5 - t_val * 0.6 + beat * 0.015);
                            float ang = t_val * 0.1;
                            mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
                            p = rot * p;
                            float val = cos(currN * pi * p.x) * cos(currM * pi * p.y) - 
                                        cos(currM * pi * p.x) * cos(currN * pi * p.y);
                            total += abs(val);
                            currN *= 1.45; currM *= 1.45;
                        }
                        return total * 0.5;
                    }

                    // Kaleidoscopic Apollonian Gasket Folds
                    vec2 apollonianFold(vec2 p, float s) {
                        for(int i=0; i<3; i++) {
                            p = -1.0 + 2.0 * fract(p * 0.5 + 0.5);
                            float r2 = dot(p,p);
                            p = p / max(r2, s); // Inversion
                        }
                        return p;
                    }

                    // DOMAIN WARPING: Constant Ambient Fluid Flow
                    vec2 flowWarp(vec2 p, float t) {
                        float n1 = noise(p + t * 0.2);
                        float n2 = noise(p * 2.1 - t * 0.15);
                        float n3 = fbm(p * 3.0 + t * 0.1);
                        return p + (0.1 + uShiver * 0.1) * vec2(cos(n1 * PI + n3), sin(n2 * PI - n1));
                    }

                    void main() {
                        vec2 uv = (vUv - 0.5) * 2.0;
                        float aspect = uResolution.x / uResolution.y;
                        uv.x *= aspect;

                        float t = uTime * uFlow;
                        // Ambient Flow Field mapping (Constant organic motion even when silent)
                        vec2 p = flowWarp(uv, t * 0.5 * uEntropy);

                        // Audio Transient Shiver
                        vec2 distort = vec2(noise(vUv * 15.0 + t), noise(vUv * 15.0 - t)) * uShiver * 0.04;
                        p += distort;

                        float f = 0.0;
                        vec2 q = p; // Declare q globally for folded/warped coordinates
                        float n_eff = uN * uResonance;
                        float m_eff = uM * uResonance;
                        
                        // Interactive Ripple Disruption (The Cursors)
                        float distToMouse = distance(vUv, uMouse);
                        float ripple = sin(distToMouse * 30.0 - t * 15.0) * exp(-distToMouse * 4.0) * uMouseActive * 0.5;
                        f += ripple;
                        
                        // [ TOPOLOGICAL CATEGORIES (Radical Mathematical Divergence) ]
                        if (uType < 0.5) { 
                            // 0.0: SACRED (Standard & Classic layered Chladni Resonance - The "Soul" of v5)
                            f = fractalResonance(p, n_eff, m_eff, uBeatFreq, t);
                            if (uHarmonics > 0.01) f += uHarmonics * chladniBase(p * 1.5, n_eff * 0.5, m_eff * 0.5);
                        } 
                        else if (uType < 1.5) { 
                            // 1.0: SPIROGRAPH & TORUS VORTEX (3D Toroidal Projection - Image 3)
                            float a = atan(p.y, p.x);
                            float r = length(p);
                            // Toroidal twist math
                            float twist = sin(r * 10.0 - a * n_eff + t);
                            float s1 = sin(a * n_eff + t);
                            float s2 = sin(a * m_eff - t * 0.5);
                            f = sin(r * 50.0 + twist * 15.0 * uEntropy) * (s1 * s2);
                        }
                        else if (uType < 2.5) { 
                            // 2.0: PLANETARY / PHYLLOTAXIS (Seed-Mapping & Dense Orbital Clusters - Image 1)
                            float r = length(p) * (15.0 + n_eff * 0.5);
                            float a = atan(p.y, p.x);
                            // Golden angle approximation for orbital clustering
                            float phyll = sin(r - a * m_eff) * cos(r * 0.1 + a * 2.0);
                            f = phyll * (1.0 - smoothstep(1.5, 2.0, length(p)));
                        }
                        else if (uType < 3.5) { 
                            // 3.0: COMPLEX / DOMAIN WARP (Deep Fluid Organic Convection - Image 4)
                            q = p + vec2(cos(t * 0.1), sin(t * 0.15)) * 0.5;
                            float n1 = noise(q * (n_eff * 0.1) + t * 0.2);
                            float n2 = noise(q * (m_eff * 0.1) - t * 0.1);
                            vec2 warp = p + vec2(cos(n1 * PI * uEntropy), sin(n2 * PI * uEntropy)) * 0.8;
                            f = sin(length(warp) * 15.0 + n1 * 8.0);
                        }
                        else if (uType < 4.5) {
                            // 4.0: ADVANCED / HYPER-RESONANCE (Dimensional Folding & Cross-Feedback)
                            q = apollonianFold(p * 0.5, 0.4 + uEntropy * 0.2);
                            float n1 = chladniBase(q, n_eff, m_eff);
                            float n2 = chladniBase(q.yx, m_eff * 0.5, n_eff * 1.5);
                            f = n1 * n2 * 2.0;
                            // Add recursive detail
                            f += 0.3 * sin(length(q) * 20.0 - t * 4.0);
                        }
                        else {
                            // 5.0: FRACTAL / DEEP FRACTAL FOLD (The majestic 8-iteration v4 fold)
                            float zoom = 1.0 + (uIntensity * 0.5);
                            vec2 fUv = uv * zoom;
                            float jitter = sin(uTime * 120.0) * 0.005 + cos(uTime * 60.0) * 0.002;
                            float time = uTime * 2.5 + jitter;
                            for (int i = 0; i < 8; i++) {
                                fUv = abs(fUv) - 0.45;
                                float a = time * 0.3 + float(i) * 0.45;
                                float s = sin(a), c = cos(a);
                                fUv = vec2(fUv.x * c - fUv.y * s, fUv.x * s + fUv.y * c);
                                fUv.x -= 0.2 * sin(time * 0.6 + float(i));
                            }
                            float d = length(fUv);
                            float ripple = sin(d * 22.0 - time * 6.0);
                            f = ripple * cos(fUv.x * 8.0 + time * 2.0);
                        }

                        // TRUE RESONANCE PRESERVATION (Audio Transients & Reactivity)
                        // Physics deformation is layered on top, physically shivering the geometry
                        float bassDistort = chladniBase(p, uBassN * 0.2, uBassM * 0.2) * 0.3 * uIntensity;
                        f += bassDistort;
                        
                        // Micro-ripples added on extreme high transient crashes
                        float highRipples = sin(length(p) * uHighN * 3.0 - t * 8.0) * 0.08 * uNormHighs;
                        f += highRipples;
                        
                        // Interactive Ripple Disruption (Phase 3)
                        float d2m = distance(uv, uMouse);
                        float rip = sin(d2m * 30.0 - t * 15.0) * exp(-d2m * 6.0) * uMouseActive * 0.4;
                        f += rip;
                        
                        float rawF = f;
                        
                        // SAND MEDIUM CRITICAL OVERRIDE (For "teh chindli" legacy sand-plate look)
                        if (uMedium < 1.5 && uMedium >= 0.5) {
                            float thr = 0.05 + uIntensity * 0.3;
                            float sandP = smoothstep(thr + 0.45, thr - 0.05, rawF);
                            
                            // High-frequency sand grain step hash
                            vec2 sandUv = vUv;
                            vec2 fractP = fract(sandUv * 1000.0 * vec2(123.34, 456.21));
                            fractP += dot(fractP, fractP + 45.32);
                            float grainHash = fract(fractP.x * fractP.y);
                            float finalSand = step(grainHash, sandP);
                            
                            vec3 sandCol = mix(uColor, vec3(1.0, 0.9, 0.7), uIntensity);
                            vec3 plateCol = vec3(0.01, 0.01, 0.03);
                            
                            vec3 col = mix(plateCol, sandCol * 2.5, finalSand);
                            col += sandCol * smoothstep(0.3, 0.0, rawF) * 0.5;
                            col += uShiver * vec3(1.0, 0.3, 0.4) * 0.4;
                            
                            float vig = smoothstep(2.5, 0.7, length(uv));
                            gl_FragColor = vec4(col * vig, 1.0);
                            return;
                        }

                        f = abs(f);

                        float threshold = 0.07 + uIntensity * 0.09;
                        
                        // MEDIUM LOGIC (Edge Mask)
                        float edge;
                        if (uMedium < 0.5) { // WATER
                             edge = smoothstep(threshold + 0.2, threshold - 0.03, f);
                        } else if (uMedium < 1.5) { // SAND
                             float grain = noise(vUv * 950.0 + t * 2.0) * 0.14;
                             edge = step(threshold + grain, f);
                        } else if (uMedium < 2.5) { // ETHER
                             edge = pow(smoothstep(threshold + 0.4, threshold - 0.1, f), 2.5);
                        } else { // ICE
                             edge = smoothstep(threshold + 0.05, threshold + 0.01, f);
                             edge *= (0.8 + 0.2 * noise(vUv * 1200.0));
                        }

                        // CINEMATIC LIGHTING (Matcap Approximation)
                        vec3 dx = dFdx(vec3(p, rawF));
                        vec3 dy = dFdy(vec3(p, rawF));
                        vec3 norm = normalize(cross(dx, dy));
                        norm.z = mix(0.6, 0.2, uIntensity); // Prevent flattening into a literal mirror at 100% intensity 
                        norm = normalize(norm);

                        vec3 lightDir = normalize(vec3(sin(t * 0.4), cos(t * 0.2), 1.2));
                        vec3 viewDir = vec3(0, 0, 1);
                        vec3 reflectDir = reflect(-lightDir, norm);
                        
                        float diff = max(dot(norm, lightDir), 0.0);
                        float spec = pow(max(dot(reflectDir, viewDir), 0.0), 128.0); 

                        // Environment Reflection Layer
                        float env = noise(reflectDir.xy * 2.5 + t * 0.15) * 0.4;
                        
                        vec3 baseCol = mix(uColor, uSecondaryColor, f);

                        // [ ADVANCED CYMATICS: MULTI-COLOR RADICAL SPECTRUM ]
                        if (uType > 3.5) {
                            // Fold-based coordinate color shift (the "tons of colors" feedback loop)
                            vec3 c1 = vec3(0.5 + 0.5 * cos(t * 0.5 + length(q) * 2.0 + vec3(0.0, 2.0, 4.0)));
                            vec3 c2 = vec3(0.5 + 0.5 * sin(t * 0.3 - q.y * 3.0 + vec3(1.5, 3.5, 5.5)));
                            vec3 c3 = vec3(0.5 + 0.5 * cos(t * 0.7 + q.x * 4.0 + vec3(4.0, 1.0, 2.0)));
                            
                            // Blend between three distinct color phases based on folding characteristics
                            float blendVal = 0.5 + 0.5 * sin(length(q) * 5.0 - t);
                            vec3 foldCol = mix(c1, mix(c2, c3, 0.5 + 0.5 * cos(q.x * q.y * 10.0)), blendVal);
                            
                            // Composite foldCol onto the main baseCol
                            baseCol = mix(baseCol, foldCol * 1.5, 0.8);
                        }
                        
                        // Medium Specific Refinement
                        if (uMedium < 0.5) { // WATER
                             baseCol = mix(baseCol, vec3(0.01, 0.05, 0.15), 0.5);
                             baseCol += 0.35 * vec3(0.1, 0.7, 1.0) * vDisplace;
                        } else if (uMedium < 1.5) { // SAND
                             baseCol = mix(baseCol, vec3(1.0, 0.9, 0.5), 0.7);
                        } else if (uMedium < 2.5) { // ETHER
                             baseCol += 0.6 * vec3(0.8, 0.4, 1.0) * (0.5 + 0.5 * cos(t * 1.8 + f * 12.0));
                        } else { // ICE
                             baseCol = mix(vec3(0.8, 0.95, 1.0), uColor, 0.3);
                             baseCol += spec * 0.5 + env * 0.4;
                        }

                        vec3 col = baseCol * (0.3 + 0.7 * diff);
                        col += spec * vec3(1.0, 0.99, 0.95) * (0.15 + uNormHighs * 0.15); // SEVERE REDUCTION to prevent screen flooding
                        col += uShiver * vec3(1.0, 0.3, 0.4) * 0.4;

                        float vig = smoothstep(2.5, 0.7, length(uv));
                        gl_FragColor = vec4(col * edge * vig, edge * (0.8 + 0.2 * uEnergy));
                    }
                `,transparent:!0,side:Z,extensions:{derivatives:!0}});const t=new A(e,this.cymaticMaterial);t.position.z=-5,this.cymaticsGroup.add(t),this.setupCymaticsInteractions();const i=this.batterySaver?15e3:4e4,a=new q,o=new Float32Array(i*3),s=new Float32Array(i);for(let n=0;n<i;n++)o[n*3]=(Math.random()-.5)*45,o[n*3+1]=(Math.random()-.5)*45,o[n*3+2]=0,s[n]=Math.random()*Math.PI*2;a.setAttribute("position",new H(o,3)),a.setAttribute("aPhase",new H(s,1)),this.cymaticParticlesMaterial=new B({uniforms:this.cymaticMaterial.uniforms,vertexShader:`
                    uniform float uTime, uN, uM, uIntensity, uShiver, uEnergy, uMouseActive;
                    uniform float uBassN, uBassM, uHighN, uHighM;
                    uniform float uBeatFreq, uType, uHarmonics, uNormHighs, uEntropy, uFlow, uResonance;
                    uniform vec2 uMouse;
                    attribute float aPhase;
                    varying float vVal;
                    
                    #define PI 3.14159265359

                    float hash(vec2 p) {
                        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
                    }

                    float noise(vec2 p) {
                        vec2 i = floor(p);
                        vec2 f = fract(p);
                        f = f * f * (3.0 - 2.0 * f);
                        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
                    }

                    float fbm(vec2 p) {
                        float f = 0.0;
                        f += 0.5 * noise(p);
                        p *= 2.02;
                        f += 0.25 * noise(p);
                        return f;
                    }

                    float chladniBase(vec2 p, float n, float m) {
                        return cos(n * PI * p.x) * cos(m * PI * p.y) - cos(m * PI * p.x) * cos(n * PI * p.y);
                    }

                    float fractalResonance(vec2 uv, float n, float m, float beat, float t) {
                        float pi = 3.14159265;
                        float total = 0.0;
                        vec2 p = uv;
                        float currN = n;
                        float currM = m;
                        for(int i = 0; i < 2; i++) {
                            float t_val = t * 0.4 + float(i) * 2.0;
                            p.x += 0.22 * sin(p.y * 2.5 + t_val + beat * 0.015);
                            p.y += 0.22 * cos(p.x * 2.5 - t_val * 0.6 + beat * 0.015);
                            float ang = t_val * 0.1;
                            mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
                            p = rot * p;
                            float val = cos(currN * pi * p.x) * cos(currM * pi * p.y) - 
                                        cos(currM * pi * p.x) * cos(currN * pi * p.y);
                            total += abs(val);
                            currN *= 1.45; currM *= 1.45;
                        }
                        return total * 0.5;
                    }

                    vec2 apollonianFold(vec2 p, float s) {
                        for(int i=0; i<3; i++) {
                            p = -1.0 + 2.0 * fract(p * 0.5 + 0.5);
                            float r2 = dot(p,p);
                            p = p / max(r2, s);
                        }
                        return p;
                    }

                    vec2 flowWarp(vec2 p, float t) {
                        float n1 = noise(p + t * 0.2);
                        float n2 = noise(p * 2.1 - t * 0.15);
                        float n3 = fbm(p * 3.0 + t * 0.1);
                        return p + (0.1 + uShiver * 0.1) * vec2(cos(n1 * PI + n3), sin(n2 * PI - n1));
                    }

                    float getDisplacement(vec2 uv) {
                        float t = uTime * uFlow;
                        vec2 p = flowWarp(uv, t * 0.5 * uEntropy);
                        
                        // Audio shiver
                        vec2 distort = vec2(noise(uv * 15.0 + t), noise(uv * 15.0 - t)) * uShiver * 0.04;
                        p += distort;

                        float f = 0.0;
                        vec2 q = p;
                        float n_eff = uN * uResonance;
                        float m_eff = uM * uResonance;

                        if (uType < 0.5) {
                            f = fractalResonance(p, n_eff, m_eff, uBeatFreq, t);
                            if (uHarmonics > 0.01) f += uHarmonics * chladniBase(p * 1.5, n_eff * 0.5, m_eff * 0.5);
                        } else if (uType < 1.5) {
                            float a = atan(p.y, p.x);
                            float r = length(p);
                            float twist = sin(r * 10.0 - a * n_eff + t);
                            float s1 = sin(a * n_eff + t);
                            float s2 = sin(a * m_eff - t * 0.5);
                            f = sin(r * 50.0 + twist * 15.0 * uEntropy) * (s1 * s2);
                        } else if (uType < 2.5) {
                            float r = length(p) * (15.0 + n_eff * 0.5);
                            float a = atan(p.y, p.x);
                            float phyll = sin(r - a * m_eff) * cos(r * 0.1 + a * 2.0);
                            f = phyll * (1.0 - smoothstep(1.5, 2.0, length(p)));
                        } else if (uType < 3.5) {
                            q = p + vec2(cos(t * 0.1), sin(t * 0.15)) * 0.5;
                            float n1 = noise(q * (n_eff * 0.1) + t * 0.2);
                            float n2 = noise(q * (m_eff * 0.1) - t * 0.1);
                            vec2 warp = p + vec2(cos(n1 * PI * uEntropy), sin(n2 * PI * uEntropy)) * 0.8;
                            f = sin(length(warp) * 15.0 + n1 * 8.0);
                        } else if (uType < 4.5) {
                            q = apollonianFold(p * 0.5, 0.4 + uEntropy * 0.2);
                            float n1 = chladniBase(q, n_eff, m_eff);
                            float n2 = chladniBase(q.yx, m_eff * 0.5, n_eff * 1.5);
                            f = n1 * n2 * 2.0;
                            f += 0.3 * sin(length(q) * 20.0 - t * 4.0);
                        } else {
                            float zoom = 1.0 + (uIntensity * 0.5);
                            vec2 fUv = uv * zoom;
                            float jitter = sin(uTime * 120.0) * 0.005 + cos(uTime * 60.0) * 0.002;
                            float time = uTime * 2.5 + jitter;
                            for (int i = 0; i < 8; i++) {
                                fUv = abs(fUv) - 0.45;
                                float a = time * 0.3 + float(i) * 0.45;
                                float s = sin(a), c = cos(a);
                                fUv = vec2(fUv.x * c - fUv.y * s, fUv.x * s + fUv.y * c);
                                fUv.x -= 0.2 * sin(time * 0.6 + float(i));
                            }
                            float d = length(fUv);
                            float ripple = sin(d * 22.0 - time * 6.0);
                            f = ripple * cos(fUv.x * 8.0 + time * 2.0);
                        }

                        float bassDistort = chladniBase(p, uBassN * 0.2, uBassM * 0.2) * 0.3 * uIntensity;
                        f += bassDistort;

                        float highRipples = sin(length(p) * uHighN * 3.0 - t * 8.0) * 0.08 * uNormHighs;
                        f += highRipples;

                        return f;
                    }

                    void main() {
                        vec2 p = position.xy / 22.5; 
                        float val = getDisplacement(p);
                        
                        // Particle Physical Displacement Disruption
                        vec2 normalizedP = (p * 0.5) + 0.5; 
                        float distToMouse = distance(normalizedP, uMouse);
                        float ripple = sin(distToMouse * 30.0 - uTime * 15.0) * exp(-distToMouse * 6.0) * uMouseActive * 0.4;
                        val += ripple * 2.0;

                        vVal = abs(val);
                        
                        // Gradient for entrainment (push toward zero)
                        vec2 eps = vec2(0.01, 0.0);
                        float dx = getDisplacement(p + eps.xy) - getDisplacement(p - eps.xy);
                        float dy = getDisplacement(p + eps.yx) - getDisplacement(p - eps.yx);
                        
                        // Force vector: pushes away from high vibration |val|
                        vec2 grad = vec2(dx, dy);
                        float force = clamp(1.0 - vVal, 0.0, 1.0); // Stronger pull near nodes
                        vec2 push = -grad * val * (0.5 + uIntensity * 1.5) * force;
                        
                        // Jitter bouncing at anti-nodes (high displacement)
                        float jitterZ = vVal * sin(uTime * 30.0 + aPhase * 2.0) * (0.5 + uShiver * 5.0 + uIntensity);
                        
                        vec3 finalPos = position;
                        finalPos.xy += push * 15.0; // Gather effect
                        finalPos.z += jitterZ * 2.0;

                        vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
                        gl_Position = projectionMatrix * mvPosition;
                        
                        // Size based on Z bounce
                        gl_PointSize = (1.5 + max(0.0, jitterZ)) * (100.0 / -mvPosition.z) * (0.5 + uEnergy * 0.5);
                    }
                `,fragmentShader:`
                    uniform vec3 uColor;
                    uniform vec3 uSecondaryColor;
                    uniform float uMedium;
                    uniform float uEnergy;
                    varying float vVal;
                    void main() {
                        vec2 coord = gl_PointCoord - vec2(0.5);
                        if(length(coord) > 0.5) discard;
                        
                        // Node particles gracefully inherit primary colors rather than blasting pure white
                        vec3 sandColor = mix(vec3(0.9, 0.7, 0.4), mix(vec3(0.7, 0.8, 1.0), uColor, 0.5), uMedium / 3.0); 
                        vec3 color = mix(sandColor, uColor, vVal * 1.5);
                        
                        // Extreme opacity reduction to survive AdditiveBlending of 80,000 tight particles
                        float baseAlpha = mix(0.04, 0.08, uEnergy);
                        float alpha = baseAlpha * (1.0 - clamp(vVal * 1.5, 0.0, 1.0)); 
                        
                        // Dim emission directly
                        color *= 0.4;
                        
                        gl_FragColor = vec4(color, alpha);
                    }
                `,transparent:!0,blending:T,depthWrite:!1});const r=new j(a,this.cymaticParticlesMaterial);r.position.z=-4.95,this.cymaticsGroup.add(r),this.cymaticParticles=r,this.cymaticsHistory.length===0&&this.nextCymatic()}catch{}}nextCymatic(){if(window.state&&window.state.aiVisualsLocked){window.state.aiVisualsLocked=!1;const a=document.getElementById("cymaticAiBtn");a&&(a.style.borderColor="rgba(34, 211, 238, 0.2)")}const e=Q.CYMATIC_PATTERNS;let t=0;this.currentCymaticData&&(t=e.findIndex(a=>a.name===this.currentCymaticData.name),t===-1&&(t=0));let i=(t+1)%e.length;this.cymaticsHistory.push(e[i]),this.cymaticsHistory.length>50&&this.cymaticsHistory.shift(),this.cymaticsHistoryIndex=this.cymaticsHistory.length-1,this.applyCymatic(e[i]),this.lastCymaticRotation=performance.now()}prevCymatic(){if(window.state&&window.state.aiVisualsLocked){window.state.aiVisualsLocked=!1;const a=document.getElementById("cymaticAiBtn");a&&(a.style.borderColor="rgba(34, 211, 238, 0.2)")}const e=Q.CYMATIC_PATTERNS;let t=0;this.currentCymaticData&&(t=e.findIndex(a=>a.name===this.currentCymaticData.name),t===-1&&(t=0));let i=(t-1+e.length)%e.length;this.cymaticsHistory.push(e[i]),this.cymaticsHistory.length>50&&this.cymaticsHistory.shift(),this.cymaticsHistoryIndex=this.cymaticsHistory.length-1,this.applyCymatic(e[i]),this.lastCymaticRotation=performance.now()}setCymaticByName(e){const t=Q.CYMATIC_PATTERNS.find(i=>i.name===e);t&&(this.applyCymatic(t),this.lastCymaticRotation=performance.now())}setupCymaticsInteractions(){if(!this.renderer||!this.renderer.domElement)return;const e=this.renderer.domElement,t=a=>{const o=e.getBoundingClientRect(),s=(a.clientX-o.left)/o.width,r=1-(a.clientY-o.top)/o.height;this.cymaticMaterial&&this.cymaticMaterial.uniforms.uMouse.value.set(s,r)};e.addEventListener("pointerdown",a=>{this.cymaticMaterial&&(this.cymaticMaterial.uniforms.uMouseActive.value=1),t(a)}),e.addEventListener("pointermove",a=>{t(a)});const i=()=>{this.cymaticMaterial&&(this.cymaticMaterial.uniforms.uMouseActive.value=0)};e.addEventListener("pointerup",i),e.addEventListener("pointerleave",i)}applyCymatic(e){if(!e||!this.cymaticMaterial)return;this.currentCymaticData=e,window.renderCymaticProPatterns&&window.renderCymaticProPatterns();const t=this.cymaticMaterial.uniforms;t.uN.value=e.n,t.uM.value=e.m,e.cat==="sacred"?t.uType.value=0:e.cat==="radial"?t.uType.value=1:e.cat==="geometry"?t.uType.value=2:e.cat==="complex"?t.uType.value=3:e.cat==="advanced"?t.uType.value=4:e.cat==="fractal"?t.uType.value=5:e.cat==="classic"&&(t.uType.value=0),e.type!==void 0&&(t.uType.value=e.type),t.uEnergy.value=e.energy||.5;const i=document.getElementById("cymaticPatternLabel");i&&e.name&&(i.textContent=e.name,i.style.textShadow="0 0 15px rgba(180, 120, 255, 1)",setTimeout(()=>{i.style.textShadow="0 0 5px rgba(255, 255, 255, 0.3)"},300)),document.querySelectorAll(".cymatics-pattern-btn").forEach(a=>{a.classList.remove("cymatics-pattern-active"),a.style.backgroundColor="",a.style.borderColor="";const o=a.getAttribute("onclick");if(o){const s=o.match(/\d+/);if(s){const r=parseInt(s[0]),n=Q.CYMATIC_PATTERNS[r];n&&e&&n.name===e.name&&(a.classList.add("cymatics-pattern-active"),a.style.backgroundColor="rgba(168, 85, 247, 0.35)",a.style.borderColor="rgba(168, 85, 247, 0.9)")}}})}setVisualColor(e,t=null){var a,o,s,r;const i=new R(e);if(!t||t==="all"){this.customColor=i,this.cymaticMaterial&&this.cymaticMaterial.uniforms.uColor.value.copy(i),(a=this._snowData)!=null&&a.material&&this._snowData.material.uniforms.uColor.value.copy(i),(o=this.oceanWave)!=null&&o.material&&this.oceanWave.material.uniforms.uColor.value.copy(i),this.wavesMaterial&&this.wavesMaterial.uniforms.uColor.value.copy(i);return}this.customColors[t]=i,t==="cymatics"&&this.cymaticMaterial&&this.cymaticMaterial.uniforms.uColor.value.copy(i),t==="snowflake"&&((s=this._snowData)!=null&&s.material)&&this._snowData.material.uniforms.uColor.value.copy(i),(t==="ocean"||t==="waves")&&((r=this.oceanWave)!=null&&r.material&&this.oceanWave.material.uniforms.uColor.value.copy(i),this.wavesMaterial&&this.wavesMaterial.uniforms.uColor.value.copy(i))}setCymaticPatternByIndex(e){if(window.state&&window.state.aiVisualsLocked){window.state.aiVisualsLocked=!1;const i=document.getElementById("cymaticAiBtn");i&&(i.style.borderColor="rgba(34, 211, 238, 0.2)")}const t=Q.CYMATIC_PATTERNS[e];t&&(this.cymaticsHistory.push(t),this.cymaticsHistoryIndex=this.cymaticsHistory.length-1,this.applyCymatic(t),this.lastCymaticRotation=performance.now())}setCymaticColor(e){this.currentCymaticColor=e,window.renderCymaticProPatterns&&window.renderCymaticProPatterns(),this.cymaticMaterial&&this.cymaticMaterial.uniforms.uColor.value.set(e)}setCymaticFreq(e){this.cymaticMaterial&&this.cymaticMaterial.uniforms.uBeatFreq&&(this.cymaticMaterial.uniforms.uBeatFreq.value=Math.max(0,Math.min(80,e)))}setCymaticTimer(e){this.cymaticsTimer=e;const t=document.getElementById("cymaticTimerLabel");t&&(e>300?t.textContent="INFINITE":e===0?t.textContent="OFF":t.textContent=e+"s")}initLava(){var s;this.lavaBlobs=[];const e=16;this.lavaUniforms={uBlobs:{value:[]},uColor:{value:new R(((s=d.visualColors)==null?void 0:s.lava)||16737792)},uSecondaryColor:{value:new R(16755200)},uTime:{value:0},uIntensity:{value:0},uResolution:{value:new $(window.innerWidth,window.innerHeight)}};for(let r=0;r<e;r++)this.lavaUniforms.uBlobs.value.push(new _e(0,-100,0,0));const t=new B({uniforms:this.lavaUniforms,vertexShader:`
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
            `,transparent:!0,blending:T,depthWrite:!1,side:Z}),i=new X(100,100),a=new A(i,t);a.position.z=-5,[{count:5,minSize:1,maxSize:1.5},{count:7,minSize:1.5,maxSize:2.2},{count:4,minSize:2.2,maxSize:3.5}].forEach(r=>{for(let n=0;n<r.count;n++){const m=r.minSize+Math.random()*(r.maxSize-r.minSize),u=["heating","rising","cooling","falling"],l=u[Math.floor(Math.random()*u.length)],p=-18+Math.random()*4,c=18+Math.random()*4;let v=0,f=.5;l==="heating"?(v=p,f=Math.random()*.5):l==="rising"?(v=p+Math.random()*(c-p),f=.8+Math.random()*.2):l==="cooling"?(v=c,f=1-Math.random()*.3):l==="falling"&&(v=c-Math.random()*(c-p),f=.2+Math.random()*.3),this.lavaBlobs.push({position:new Fe((Math.random()-.5)*12,v,(Math.random()-.5)*6),material:{uniforms:{uTemp:{value:0},uIntensity:{value:0},uTime:{value:0}}},userData:{baseSize:m,state:l,temperature:f,floatMin:p,floatMax:c,heatRate:.15+Math.random()*.3,coolRate:.15+Math.random()*.3,riseSpeed:(.04+Math.random()*.05)/(m*.5),fallSpeed:(.05+Math.random()*.05)/(m*.5),driftPhase:Math.random()*Math.PI*2,driftSpeed:.01+Math.random()*.02}})}}),this.lavaGroup.add(a),this.lavaGroup.visible=!1}initFireplace(){const i=new X(100,80);this.fireMaterial=this.createFireShader(),this.fireMesh=new A(i,this.fireMaterial),this.fireMesh.position.set(0,0,-15),this.fireMesh.renderOrder=10,this.fireplaceGroup.add(this.fireMesh),this.fireLight=new Ee(16737792,5,200),this.fireLight.position.set(0,0,30),this.fireplaceGroup.add(this.fireLight);const a=650,o=new q,s=[];for(let r=0;r<a;r++)s.push((Math.random()-.5)*100,-20+Math.random()*40,-15+(Math.random()-.5)*20);o.setAttribute("position",new Y(s,3)),this.emberMat=new ce({color:16763904,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.8,blending:T,depthWrite:!1}),this.embers=new j(o,this.emberMat),this.fireplaceGroup.add(this.embers),this.emberVelocities=new Float32Array(a);for(let r=0;r<a;r++)this.emberVelocities[r]=.02+Math.random()*.05;this.fireplaceGroup.position.set(0,0,0),this.fireplaceGroup.visible=!1}createFireShader(){return new B({uniforms:{uTime:{value:0},uColor:{value:new R(16729088)},uSpeed:{value:1},uIntensity:{value:1}},vertexShader:`
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
            `,transparent:!0,side:Z,blending:T,depthWrite:!1})}initRainforest(){const e=this.batterySaver?400:1e3,t=new q,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let o=0;o<e;o++){const s=o*3;i[s]=(Math.random()-.5)*60,i[s+1]=(Math.random()-.5)*40,i[s+2]=(Math.random()-.5)*40,a[s]=Math.random(),a[s+1]=Math.random(),a[s+2]=.08+Math.random()*.12}t.setAttribute("position",new H(i,3)),t.setAttribute("aRandom",new H(a,3)),this.rainMaterial=new B({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new R(8965375)},uIntensity:{value:.6}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:T}),this.raindrops=new j(t,this.rainMaterial),this.rainforestGroup.add(this.raindrops),this.rainforestGroup.visible=!1}initZenGarden(){const e=this.batterySaver?200:500,t=new q,i=new Float32Array(e*3),a=new Float32Array(e*3);for(let s=0;s<e;s++){const r=s*3;i[r]=(Math.random()-.5)*40,i[r+1]=(Math.random()-.5)*20,i[r+2]=(Math.random()-.5)*40,a[r]=Math.random(),a[r+1]=Math.random(),a[r+2]=Math.random()*Math.PI*2}t.setAttribute("position",new H(i,3)),t.setAttribute("aRandom",new H(a,3)),this.petalMaterial=new B({uniforms:{uTime:{value:0},uSpeed:{value:1},uColor:{value:new R(16758725)},uIntensity:{value:.8}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1}),this.petals=new j(t,this.petalMaterial),this.zenGardenGroup.add(this.petals);const o=new X(40,40,32,32);this.zenWaterMaterial=new V({color:2245734,transparent:!0,opacity:.3,side:Z}),this.zenWater=new A(o,this.zenWaterMaterial),this.zenWater.rotation.x=-Math.PI/2,this.zenWater.position.y=-5,this.zenGardenGroup.add(this.zenWater),this.zenGardenGroup.visible=!1}initOcean(){var r;const e=new X(300,100,128,64);this.oceanWave=new A(e,new B({uniforms:{uTime:{value:0},uColor:{value:this.customColor?this.customColor.clone():new R(43775)},uNormBass:{value:0},uBeatPulse:{value:0}},vertexShader:`
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
            `,wireframe:!0,transparent:!0,side:Z})),this.oceanWave.rotation.x=-Math.PI/3,this.oceanWave.position.y=-2,this.oceanGroup.add(this.oceanWave);const t=300,i=new q,a=[];for(let n=0;n<t;n++)a.push((Math.random()-.5)*50),a.push(-2.5+Math.random()*.5),a.push((Math.random()-.5)*40);i.setAttribute("position",new Y(a,3));const o=new ce({color:16777215,size:.15,map:this.createCircleTexture(),transparent:!0,opacity:.5,blending:T,depthWrite:!1});this.oceanFoam=new j(i,o),this.oceanGroup.add(this.oceanFoam),this.oceanGroup.visible=!1;const s=((r=this.customColors)==null?void 0:r.ocean)||this.customColor;s&&(this.oceanWave&&this.oceanWave.material.color.copy(s),this.oceanFoam&&this.oceanFoam.material.color.copy(s))}createCyberTexture(e=this.matrixConfig){const i=document.createElement("canvas");i.width=1024,i.height=1024;const a=i.getContext("2d");a.fillStyle="rgba(0,0,0,0)",a.fillRect(0,0,1024,1024),a.shadowBlur=12,a.shadowColor="rgba(255, 255, 255, 0.4)",a.font='bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace',a.fillStyle="#ffffff",a.textAlign="center",a.textBaseline="middle";const o=8,s=8,r=1024/o,n=1024/s;let m="🪷MINDWAVE";const u=e.logicMode,l=e.customText;u==="custom"||u==="txt"?m="🪷"+(l&&l.length>0?l:"WELCOME TO MINDWAVE"):(u==="random"||u==="rnd"||u==="matrix"||u==="int"||u==="interstellar")&&(m="");const p=u==="matrix"||u==="int"||u==="interstellar"?[]:["LOGO",...m],c=p.length;for(let f=0;f<64;f++){const y=f%8,P=Math.floor(f/8);a.fillStyle="rgba(0,0,0,0)",a.fillRect(y*r,P*n,r,n),a.save(),a.translate(y*r+r/2,P*n+n/2);let L="",S=!1;if(f<c){const F=p[f];F==="LOGO"?S=!0:L=F}else{const G="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";L=G.charAt(Math.floor(Math.random()*G.length)),Math.random()>.5&&(a.save(),a.scale(-1,1),a.fillStyle="#ffffff",a.font="bold 80px monospace",a.fillText(L,0,0),a.restore(),L="")}if(L||S)if(a.fillStyle="#ffffff",a.font="bold 80px monospace",a.textAlign="center",a.textBaseline="middle",a.shadowBlur=16,a.shadowColor="rgba(255, 255, 255, 0.6)",S)if(this.logoImage){const x=document.createElement("canvas");x.width=100,x.height=100;const E=x.getContext("2d");E.imageSmoothingEnabled=!0,E.imageSmoothingQuality="high",E.drawImage(this.logoImage,0,0,100,100);const K=E.getImageData(0,0,100,100),D=K.data;for(let N=0;N<D.length;N+=4){const O=180+(D[N]+D[N+1]+D[N+2])/3/255*75;D[N]=O,D[N+1]=O,D[N+2]=O}E.putImageData(K,0,0),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(x,-50,-50,100,100)}else!this.logoLoading&&!this.logoFailed&&(this.logoLoading=!0,new De().load("./mindwave-logo-icon.png",G=>{if(this.logoImage=G,this.logoLoading=!1,this.cyberMaterial){const x=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=x}},void 0,G=>{this.logoFailed=!0,this.logoLoading=!1})),a.font="bold 80px monospace",a.fillStyle="#2dd4bf",a.fillText("🪷",0,0);else a.fillText(L,0,0);a.restore()}const v=new te(i);return v.magFilter=ye,v.minFilter=ye,v}createCyberShader(e,t=this.matrixConfig){return new B({uniforms:{uTexture:{value:e},uColor:{value:new R(t.color||65345)},uHeadColor:{value:new R(15794160)},uTime:{value:0},uSpeed:{value:t.speed||1},uTailLength:{value:t.length||1},uRainbow:{value:t.rainbow?1:0},uBrightness:{value:this.brightnessMultiplier||1}},vertexShader:`
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
            `,transparent:!0,depthWrite:!1,blending:T})}initEnvironment(){this.sunLight=new Ve(16774625,1.2),this.sunLight.position.set(50,100,50),this.scene.add(this.sunLight),this.ambientLight=new Be(4210752,.6),this.scene.add(this.ambientLight)}ensureInitialized(e){const t=`[VizInit] ${e}`;e==="sphere"&&(!this.sphereGroup||this.sphereGroup.children.length===0)&&this.initSphere(),e==="particles"&&(!this.particleGroup||this.particleGroup.children.length===0)&&this.initParticles(),e==="lightspeed"&&(!this.lightspeedGroup||this.lightspeedGroup.children.length===0)&&this.initLightspeed(),e==="waves"&&(!this.wavesGroup||this.wavesGroup.children.length===0)&&this.initWaves(),e==="lava"&&(!this.lavaGroup||this.lavaGroup.children.length===0)&&this.initLava(),e==="fireplace"&&(!this.fireplaceGroup||this.fireplaceGroup.children.length===0)&&this.initFireplace(),e==="rainforest"&&(!this.rainforestGroup||this.rainforestGroup.children.length===0)&&this.initRainforest(),e==="zengarden"&&(!this.zenGardenGroup||this.zenGardenGroup.children.length===0)&&this.initZenGarden(),e==="ocean"&&(!this.oceanGroup||this.oceanGroup.children.length===0)&&this.initOcean(),(e==="cyber"||e==="matrix")&&(!this.cyberGroup||this.cyberGroup.children.length===0)&&this.initCyber(),e==="box"&&(!this.boxGroup||this.boxGroup.children.length===0)&&this.initBox(),e==="dragon"&&(!this.dragonGroup||this.dragonGroup.children.length===0)&&this.initDragon(),e==="galaxy"&&(!this.galaxyGroup||this.galaxyGroup.children.length===0)&&this.initGalaxy(),e==="mandala"&&(!this.mandalaGroup||this.mandalaGroup.children.length===0)&&this.initMandala(),e==="snowflake"&&(!this.snowflakeGroup||this.snowflakeGroup.children.length===0)&&this.initSnowflake(),e==="cymatics"&&(!this.cymaticsGroup||this.cymaticsGroup.children.length===0)&&this.initCymatics()}initCyber(){for(;this.cyberGroup.children.length>0;){const c=this.cyberGroup.children[0];this.cyberGroup.remove(c),c.material&&(c.material.map&&c.material.map.dispose(),c.material.dispose()),c.children&&c.traverse(v=>{v.geometry&&v.geometry.dispose(),v.material&&(v.material.map&&v.material.map.dispose(),v.material.dispose())})}this.cyberRotationGroup=null,this.cyberPoints=null;const e=80,t=120,i=new q,a=[],o=[],s=[],r=[],n=240,m=160,u=n/e,l=m/t;for(let c=0;c<e;c++){const v=c*u-n/2+Math.random()*.8*u,f=-20-Math.random()*2,y=.5+Math.random()*.5,P=this.matrixConfig,L=P.logicMode==="mindwave"||P.logicMode==="mw"||P.logicMode==="custom"||P.logicMode==="txt",S=P.logicMode==="matrix"||P.logicMode==="int"||P.logicMode==="interstellar",G=((P.logicMode==="custom"||P.logicMode==="txt")&&P.customText?"🪷"+P.customText:"MINDWAVE").length,x=S?Math.random()*100:0,E=S?.5+Math.random()*1.5:1,K=Math.random()*100+x;for(let D=0;D<t;D++){const N=m/2-D*l;a.push(v,N,f),L?o.push(D%(G+1)):S?o.push(Math.floor(Math.random()*64)):o.push(9+Math.floor(Math.random()*55)),s.push(K),r.push(y*E)}}i.setAttribute("position",new Y(a,3)),i.setAttribute("aCharIndex",new Y(o,1)),i.setAttribute("aSpawnTime",new Y(s,1)),i.setAttribute("aSpeed",new Y(r,1)),this.cyberGeometry=i;const p=this.createCyberTexture(this.matrixConfig);this.cyberMaterial=this.createCyberShader(p,this.matrixConfig),this.cyberRain=new j(i,this.cyberMaterial),this.cyberRain.frustumCulled=!1,this.cyberRain.renderOrder=-1,this.cyberRotationGroup=new z,this.cyberRotationGroup.add(this.cyberRain),this.cyberGroup.add(this.cyberRotationGroup),this.currentCyberAngle!==void 0&&(this.cyberRotationGroup.rotation.z=ge.degToRad(-this.currentCyberAngle))}setCyberMode(e){if(this.mindWaveMode!==e)if(this.mindWaveMode=e,this.cyberLogicMode=e?"mindwave":"classic",e&&this.cyberMaterial){const t=this.cyberMaterial.uniforms.uTexture.value,i=this.createCyberTexture();this.cyberMaterial.uniforms.uTexture.value=i,this.cyberMaterial.needsUpdate=!0,t&&t.dispose()}else this.initCyber()}setMode(e){const t=this.mapMode(e);this.activeModes.clear(),this.activeModes.add(t),this.mode=t,this.updateVisibility(),this.updateLabel(t)}mapMode(e){return{cube:"box",flow:"particles",zen:"zengarden",rain:"rainforest",interstellar:"matrix",ocean:"waves"}[e]||e}toggleMode(e){const t=this.mapMode(e);t==="matrix"&&!this.activeModes.has("matrix")&&(this.matrixConfig.logicMode||(this.matrixConfig.logicMode="interstellar")),t==="cyber"&&!this.activeModes.has("cyber")&&(this.cyberConfig.logicMode||(this.cyberConfig.logicMode="matrix"));const i=this.activeModes.has("cyber");this.activeModes.has(t)?this.activeModes.delete(t):(t==="cymatics"?this.activeModes.clear():this.activeModes.has("cymatics")&&this.activeModes.delete("cymatics"),this.activeModes.add(t)),this.active=this.activeModes.size>0,this.updateVisibility(),this.updateLabel(t),this.activeModes.forEach(a=>this.ensureInitialized(a)),this.initialized&&this.active&&!this._isRendering&&(d.animationId&&(cancelAnimationFrame(d.animationId),d.animationId=null),this.render()),this.mode=t,this.updateVisibility(),this.activeModes.size===0&&!i&&(this.active=!1,this.renderer&&(this.renderer.autoClearColor=!0,this.renderer.clear(),this.renderer.render(this.scene,this.camera))),this.activeModes.size===1?this.updateLabel(Array.from(this.activeModes)[0]):this.activeModes.size>1?this.updateLabel("multi"):this.updateLabel("none"),window.dispatchEvent(new CustomEvent("mindwave:visual-mode-sync",{detail:{activeModes:Array.from(this.activeModes)}})),this.updateCyberStrings&&this.updateCyberStrings()}toggleGalaxySunStyle(){const e=this.galaxySunStyle==="sun"?"sun2":this.galaxySunStyle==="sun2"?"sun3":"sun";return this.setGalaxySunStyle(e),e}updateVisibility(){if(this.activeModes.forEach(e=>this.ensureInitialized(e)),this.sphereGroup&&(this.sphereGroup.visible=this.activeModes.has("sphere")),this.particleGroup&&(this.particleGroup.visible=this.activeModes.has("particles")),this.lightspeedGroup&&(this.lightspeedGroup.visible=this.activeModes.has("lightspeed")),this.wavesGroup&&(this.wavesGroup.visible=this.activeModes.has("waves")),this.oceanGroup&&(this.oceanGroup.visible=this.activeModes.has("ocean")),this.lavaGroup&&(this.lavaGroup.visible=this.activeModes.has("lava")),this.fireplaceGroup&&(this.fireplaceGroup.visible=this.activeModes.has("fireplace")),this.rainforestGroup&&(this.rainforestGroup.visible=this.activeModes.has("rainforest")),this.zenGardenGroup&&(this.zenGardenGroup.visible=this.activeModes.has("zengarden")),this.boxGroup&&(this.boxGroup.visible=this.activeModes.has("box")),this.dragonGroup&&(this.dragonGroup.visible=this.activeModes.has("dragon")),this.galaxyGroup&&(this.galaxyGroup.visible=this.activeModes.has("galaxy")),this.mandalaGroup&&(this.mandalaGroup.visible=this.activeModes.has("mandala")),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics")),this.snowflakeGroup){const e=this.cymaticMaterial&&Math.abs(this.cymaticMaterial.uniforms.uMedium.value-3)<.1;this.snowflakeGroup.visible=this.activeModes.has("snowflake")||this.activeModes.has("cymatics")&&e}this.cyberGroup&&(this.cyberGroup.visible=this.activeModes.has("matrix")),this.overlayCanvas&&(this.activeModes.has("cyber")?(this.overlayCanvas.classList.remove("hidden"),this.activeModes.has("matrix")?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1):this.activeModes.size>1?(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:.7}})),this.wasAutoDimmed=!0):(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1),(!this.matrixCyberStreams||this.matrixCyberStreams.length===0)&&this.generateCyberStyle()):(this.overlayCanvas.classList.add("hidden"),this.wasAutoDimmed&&(window.dispatchEvent(new CustomEvent("mindwave:set-dimmer",{detail:{value:0}})),this.wasAutoDimmed=!1))),this.cymaticsGroup&&(this.cymaticsGroup.visible=this.activeModes.has("cymatics"),this.cymaticsGroup.position.z=2),this.updateUIPanels()}updateUIPanels(){typeof window.updateConfigPanel=="function"&&window.updateConfigPanel()}updateLabel(e){const t=document.getElementById("visualLabel");t&&(e==="sphere"?t.textContent="BIO-RESONANCE":e==="particles"?t.textContent="NEURAL FLOW":e==="lightspeed"?t.textContent="WARP":e==="waves"||e==="ocean"?t.textContent="OCEAN":e==="lava"?t.textContent="LAVA LAMP":e==="fireplace"?t.textContent="FIREPLACE":e==="rainforest"?t.textContent="RAINFOREST":e==="zengarden"?t.textContent="ZEN GARDEN":e==="cymatics"?t.textContent="CYMATICS":e==="cyber"?t.textContent="CYBER":e==="matrix"?t.textContent="MATRIX":e==="snowflake"?t.textContent="SNOWFALL":e==="multi"?t.textContent="MULTI-SENSORY":t.textContent="")}initWaves(){for(this.wavesGroup||(this.wavesGroup=new z,this.scene.add(this.wavesGroup));this.wavesGroup.children.length>0;){const t=this.wavesGroup.children[0];this.wavesGroup.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}const e=new X(80,80,160,160);this.wavesMaterial=new B({uniforms:{uTime:{value:0},uColor:{value:this.customColor?new R(this.customColor):new R(26367)},uSecondaryColor:{value:new R(62207)},uIntensity:{value:1},uNormBass:{value:0},uResolution:{value:new $(window.innerWidth,window.innerHeight)}},vertexShader:`
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
            `,transparent:!0,wireframe:!1,side:Z,extensions:{derivatives:!0}}),this.wavesMesh=new A(e,this.wavesMaterial),this.wavesMesh.rotation.x=-Math.PI/2.2,this.wavesMesh.position.y=-5,this.wavesMesh.position.z=-10,this.wavesGroup.add(this.wavesMesh)}setSpeed(e){this.speedMultiplier=e}setIntent(e){this.currentIntent=e,e==="delta"||e==="theta"?this.particles&&this.particles.material&&(this.particles.material.size=.3,this.particles.material.opacity=.5):e==="gamma"||e==="hyper-gamma"?(this.particles&&this.particles.material&&(this.particles.material.size=.08,this.particles.material.opacity=.9),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(16777215),this.cyberMaterial.uniforms.uTailLength.value=.4)):(this.particles&&this.particles.material&&(this.particles.material.size=.15,this.particles.material.opacity=.8),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uHeadColor.value.setHex(15794160),this.cyberMaterial.uniforms.uTailLength.value=1)),this.renderSingleFrame()}setColor(e,t=null){var i,a,o,s;this.customColors||(this.customColors={}),!t||t==="all"?(this.customColors={},this.customColor=new R(e)):this.customColors[t]=new R(e);try{const r=n=>{n&&(n.color&&typeof n.color.set=="function"?n.color.set(e):n.uniforms&&n.uniforms.uColor&&n.uniforms.uColor.value.set(e))};this.particles&&this.particles.material&&r(this.particles.material),this.lightspeed&&this.lightspeed.material&&r(this.lightspeed.material),this.sphere&&this.sphere.material&&(r(this.sphere.material),this.core&&this.core.material&&r(this.core.material)),(t==="box"||!t||t==="all")&&(this.boxOuter&&this.boxOuter.children.forEach(n=>r(n.material)),this.boxInner&&this.boxInner.children.forEach(n=>r(n.material)),this.boxEdges&&this.boxEdges.material&&r(this.boxEdges.material)),t==="mandala"&&(this.mandalaRings&&this.mandalaRings.forEach(n=>r(n.material)),this.mandalaCenter&&this.mandalaCenter.material&&r(this.mandalaCenter.material)),this.wavesMesh&&this.wavesMesh.material&&r(this.wavesMesh.material),this.lavaBlobs&&this.lavaBlobs.forEach(n=>r(n.material)),this.lavaGlow&&this.lavaGlow.material&&r(this.lavaGlow.material),this.flames&&this.flames.material&&r(this.flames.material),this.raindrops&&this.raindrops.material&&r(this.raindrops.material),this.petals&&this.petals.material&&r(this.petals.material),this.zenWater&&this.zenWater.material&&r(this.zenWater.material),this.oceanWave&&this.oceanWave.material&&r(this.oceanWave.material),this.oceanFoam&&this.oceanFoam.material&&r(this.oceanFoam.material),this.cyberRain&&this.cyberRain.material&&this.cyberRain.material.uniforms&&this.cyberRain.material.uniforms.uColor&&this.cyberRain.material.uniforms.uColor.value.set(e),this.logoMesh&&this.originalLogoImg&&this.updateLogoTexture(),this.dragonGroup&&this.updateDragonColor&&this.updateDragonColor(new R(e)),(this.galaxyStars||this.galaxySunMesh)&&this.updateGalaxyColor(new R(e)),this.cymaticMaterial&&((i=this.cymaticMaterial.uniforms)!=null&&i.uColor)&&this.cymaticMaterial.uniforms.uColor.value.set(e),(t==="snowflake"||!t||t==="all")&&this.setSnowColor(e),(s=(o=(a=this._snowData)==null?void 0:a.material)==null?void 0:o.uniforms)!=null&&s.uColor&&this._snowData.material.uniforms.uColor.value.set(e)}catch{}this.renderSingleFrame()}renderSingleFrame(){!this.renderer||!this.scene||!this.camera||(this.renderer.clear(),this.renderer.render(this.scene,this.camera))}createCircleTexture(){if(this.textures.circle)return this.textures.circle;const e=32,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d");return i.beginPath(),i.arc(e/2,e/2,e/2,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),this.textures.circle=new te(t),this.textures.circle}render(e,t){var i,a,o,s,r,n,m,u,l;if(!this.initialized||!this.renderer||document.hidden||!this.active){this._isRendering=!1;return}if(!(this._isRendering&&typeof e=="number")){this._isRendering=!0;try{(typeof e=="number"||!e&&d.analyserLeft)&&(e=d.analyserLeft,t=d.analyserRight);let p=0,c=0,v=0;if(e){const h=e.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==h)&&(this._freqDataArray=new Uint8Array(h)),e.getByteFrequencyData(this._freqDataArray);let w=0;for(let b=0;b<15;b++)w+=this._freqDataArray[b];p=Math.pow(w/15/255,.8);let C=0;for(let b=10;b<100;b++)C+=this._freqDataArray[b];c=C/90/255;let g=0;for(let b=100;b<300;b++)g+=this._freqDataArray[b];v=g/200/255}const f=Math.max(.001,this.speedMultiplier||1),y=performance.now()*.001;this.lastTime||(this.lastTime=y);const P=Math.min(.1,y-this.lastTime);this.lastTime=y;const L=d.visualSpeedAuto?d.beatFrequency||10:f*10,S=Math.sin(y*Math.PI*2*L)*.5+.5,F=this.vibrationEnabled?1:0,G=(S||0)*F,x=(p||0)*F,E=F*(.02+x*.15+G*.08),K=Math.sin(y*47.3)*Math.cos(y*31.7)*E,D=Math.cos(y*53.1)*Math.sin(y*29.3)*E,N=Math.sin(y*37.9)*Math.cos(y*43.1)*E,ue=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];for(const h of ue)h&&h.position.set(K,D,N);if(this.activeModes.has("galaxy")&&this.galaxyGroup){const h=this.sunRotationSpeedY||.002,w=this.sunRotationSpeedZ||5e-4;if(this.galaxyStars&&(this.galaxyStars.rotation.y+=h*f*.5,this.galaxyStars.rotation.z+=w*f*.5),this.galaxySunMesh){this.galaxySunMesh.rotation.z-=w*f*1.5,this.galaxySunMesh.rotation.y+=h*f*2;const C=1+x*.15*(this.galaxySunStyle==="sun3"?2.5:1);this.galaxySunMesh.scale.setScalar(C)}this.galaxySunUniforms&&(this.galaxySunUniforms.uTime.value=y*f,this.galaxySunUniforms.uBassIntt.value=x,this._cymaticV2&&this._cymaticV2.shiver>.5&&(this.galaxySunUniforms.uTime.value+=this._cymaticV2.shiver*.05))}if(this.activeModes.has("sphere")&&this.sphere&&(this.sphere.scale.setScalar(1+x*.15),this.sphere.rotation.y+=.005*f),this.activeModes.has("particles")&&this.particleMaterial){const h=((a=(i=window.MindWaveState)==null?void 0:i.envIntensities)==null?void 0:a.flow)??1,w=(.015*f+x*.08+G*.05)*h;this.particleMaterial.uniforms.uTime.value=y,this.particleMaterial.uniforms.uSpeed.value=w*10,this.particleGroup.rotation.z+=(.001*f+x*.005)*h}if(this.activeModes.has("lightspeed")&&this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uTime.value=y,this.lightspeedMaterial.uniforms.uSpeed.value=f),this.activeModes.has("matrix")&&this.cyberMaterial&&(this.cyberMaterial.uniforms.uTime.value=y*f),this.activeModes.has("waves")&&this.wavesMaterial){const h=((s=(o=window.MindWaveState)==null?void 0:o.envIntensities)==null?void 0:s.ocean)??1;this.wavesMaterial.uniforms.uTime.value=y*f*.5,this.wavesMaterial.uniforms.uNormBass.value=x*h,this.wavesMaterial.uniforms.uIntensity&&(this.wavesMaterial.uniforms.uIntensity.value=h)}if(this.activeModes.has("cymatics")&&this.cymaticMaterial){if(this.cymaticRaycaster||(this.cymaticRaycaster=new Ne,this.cymaticPointer=new $(-1,-1),this.targetMouseUV=new $(.5,.5),this.smoothedMouseUV=new $(.5,.5),this.mouseActiveTimer=0,this._boundCymaticPointer=_=>{let U=_.clientX,ie=_.clientY;_.touches&&_.touches.length>0&&(U=_.touches[0].clientX,ie=_.touches[0].clientY),this.cymaticPointer.x=U/window.innerWidth*2-1,this.cymaticPointer.y=-(ie/window.innerHeight)*2+1,this.mouseActiveTimer=1},window.addEventListener("mousemove",this._boundCymaticPointer),window.addEventListener("touchmove",this._boundCymaticPointer,{passive:!0})),this._cymaticLive||(this._cymaticLive={n:this.currentCymaticData.n,m:this.currentCymaticData.m,energy:this.currentCymaticData.energy||.5}),this.cymaticPointer&&this.cymaticsGroup){const _=this.cymaticsGroup.children.find(U=>U.geometry&&U.geometry.type==="PlaneGeometry");if(_&&this.mouseActiveTimer>0){this.cymaticRaycaster.setFromCamera(this.cymaticPointer,this.camera);const U=this.cymaticRaycaster.intersectObject(_);U.length>0&&this.targetMouseUV.copy(U[0].uv)}this.mouseActiveTimer=Math.max(0,this.mouseActiveTimer-P*2.5),this.smoothedMouseUV.lerp(this.targetMouseUV,.15),this.cymaticMaterial.uniforms.uMouse.value.copy(this.smoothedMouseUV),this.cymaticMaterial.uniforms.uMouseActive.value=this.mouseActiveTimer>.05?1:this.mouseActiveTimer*20}if(d.aiVisualsLocked&&d.baseFrequency)this.currentCymaticData.n=Math.max(1,Math.floor(d.baseFrequency/80)),this.currentCymaticData.m=Math.max(1,Math.floor(d.baseFrequency%100/6)+3);else{const _=this.cymaticsTimer!==void 0?this.cymaticsTimer:30;_>0&&(this.lastCymaticRotation||(this.lastCymaticRotation=performance.now()),performance.now()-this.lastCymaticRotation>_*1e3&&(this.nextCymatic(),this._cymaticV2&&(this._cymaticV2.shiver=1)))}const h=.015;this._cymaticLive.n+=(this.currentCymaticData.n-this._cymaticLive.n)*h,this._cymaticLive.m+=(this.currentCymaticData.m-this._cymaticLive.m)*h;const w=(this.currentCymaticData.energy||.4)+v*.6;this._cymaticLive.energy+=(w-this._cymaticLive.energy)*(h*2),this._cymaticV2||(this._cymaticV2={bassN:1,bassM:1,highN:5,highM:5,shiver:0});const C=1+Math.pow(x,1.5)*3,g=1+Math.pow(x,1.5)*5,b=5+Math.pow(v,2)*10,W=5+Math.pow(v,2)*15;this._cymaticV2.bassN+=(C-this._cymaticV2.bassN)*.05,this._cymaticV2.bassM+=(g-this._cymaticV2.bassM)*.05,this._cymaticV2.highN+=(b-this._cymaticV2.highN)*.12,this._cymaticV2.highM+=(W-this._cymaticV2.highM)*.12;const oe=Math.max(0,x-.85)*5;this._cymaticV2.shiver+=(oe-this._cymaticV2.shiver)*.2,this._cymaticV2.shiver<.01&&(this._cymaticV2.shiver=0),this._cymaticV2.shiver>.8&&performance.now()%100>90&&(this._cymaticLive.energy+=.05),this.cymaticMaterial.uniforms.uTime.value=y*f,this.cymaticMaterial.uniforms.uIntensity.value=d.cymaticIntensity>0?d.cymaticIntensity:.5+x*.5,this.cymaticMaterial.uniforms.uHarmonics.value=d.harmonicsLevel||0,this.cymaticMaterial.uniforms.uResonance.value=(d.cymaticResonance??1)*(1+x*.15),this.cymaticMaterial.uniforms.uEntropy.value=(d.cymaticEntropy??1)*(1.1-v*.2),this.cymaticMaterial.uniforms.uFlow.value=(d.cymaticFlow??1)*(1+x*.5),this.cymaticMaterial.uniforms.uBeatFreq.value=L,this.cymaticMaterial.uniforms.uNormMids.value=c,this.cymaticMaterial.uniforms.uNormHighs.value=v,this.cymaticMaterial.uniforms.uMedium.value=d.cymaticMedium||0,this.cymaticMaterial.uniforms.uShiver.value=d.cymaticShiver||0,this.cymaticMaterial.uniforms.uN.value=this._cymaticLive.n,this.cymaticMaterial.uniforms.uM.value=this._cymaticLive.m,this.cymaticMaterial.uniforms.uEnergy.value=this._cymaticLive.energy,this.cymaticMaterial.uniforms.uBassN.value=this._cymaticV2.bassN,this.cymaticMaterial.uniforms.uBassM.value=this._cymaticV2.bassM,this.cymaticMaterial.uniforms.uHighN.value=this._cymaticV2.highN,this.cymaticMaterial.uniforms.uHighM.value=this._cymaticV2.highM}if(this.activeModes.has("ocean")&&this.oceanWave&&this.oceanWave.material.uniforms){const h=((n=(r=window.MindWaveState)==null?void 0:r.envIntensities)==null?void 0:n.ocean)??1;this.oceanWave.material.uniforms.uTime.value=y*f,this.oceanWave.material.uniforms.uNormBass.value=x*h,this.oceanWave.material.uniforms.uBeatPulse.value=G*h,this.oceanFoam&&(this.oceanFoam.material.opacity=(.4+x*.3+G*.2)*(this.brightnessMultiplier||1)*h)}if(this.activeModes.has("box")&&this.boxOuter&&(this.boxOuter.rotation.x+=.008*f+x*.02,this.boxOuter.rotation.y+=.012*f,this.boxInner&&(this.boxInner.rotation.x-=.015*f,this.boxInner.rotation.y-=.01*f,this.boxInner.scale.setScalar(.95+x*.2)),this.boxOuter.scale.setScalar(1+x*.2),this.boxEdges&&this.boxEdges.rotation.copy(this.boxOuter.rotation)),this.activeModes.has("dragon")&&this.dragonBodyInstanced&&this.dragonDummy){this.dragonGroup.rotation.y+=.005*f;const h=y*f*2,w=1+x*.2;for(let C=0;C<this.dragonLength;C++){const g=h-C*.12,b=Math.sin(g)*8,W=Math.cos(g*1.5)*4+Math.sin(g*.5)*3,oe=Math.cos(g*.8)*8;this.dragonDummy.position.set(b,W,oe);const _=g+.1,U=Math.sin(_)*8,ie=Math.cos(_*1.5)*4+Math.sin(_*.5)*3,be=Math.cos(_*.8)*8;this.dragonDummy.lookAt(U,ie,be);const Ce=1-C/this.dragonLength*.8,Se=1+Math.sin(g*4)*.15*(.5+x);this.dragonDummy.scale.setScalar(Ce*Se*w),this.dragonDummy.updateMatrix(),this.dragonBodyInstanced.setMatrixAt(C,this.dragonDummy.matrix),this.dragonGlowInstanced&&this.dragonGlowInstanced.setMatrixAt(C,this.dragonDummy.matrix),C===0&&this.dragonHead&&(this.dragonHead.position.copy(this.dragonDummy.position),this.dragonHead.quaternion.copy(this.dragonDummy.quaternion),this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4))}if(this.dragonBodyInstanced.instanceMatrix.needsUpdate=!0,this.dragonGlowInstanced&&(this.dragonGlowInstanced.instanceMatrix.needsUpdate=!0),this.dragonPearlGroup){const C=h+.5;this.dragonPearlGroup.position.set(Math.sin(C)*9,Math.cos(C*1.5)*5+Math.sin(C*.5)*4,Math.cos(C*.8)*9),this.dragonPearlGroup.rotation.x+=.08*f,this.dragonPearlGroup.rotation.y+=.12*f}}if(this.activeModes.has("mandala")&&this.mandalaRings&&(this.mandalaRings.forEach((h,w)=>{h.userData&&h.userData.speed&&(h.rotation.z+=h.userData.speed*f+x*.005);const C=1+G*.1*(w+1)*.3;h.scale.setScalar(C)}),this.mandalaCenter&&(this.mandalaCenter.rotation.z-=.01*f,this.mandalaCenter.scale.setScalar(1+x*.3))),this.logoMesh){const h=d.lotusState||"auto";let w=.8;h==="faded"||h==="full"&&(w=1),this._lotusCurrentOpacity===void 0&&(this._lotusCurrentOpacity=.8),this._lotusCurrentOpacity+=(w-this._lotusCurrentOpacity)*.1,this.logoMesh.material.opacity=this._lotusCurrentOpacity,this.logoMesh.scale.setScalar(1+x*(.05+((m=this._cymaticV2)==null?void 0:m.shiver)*.1)+G*.02)}if(this.activeModes.has("lava")&&this.lavaBlobs&&this.lavaUniforms){const h=((l=(u=window.MindWaveState)==null?void 0:u.envIntensities)==null?void 0:l.lava)??1;this.lavaUniforms.uTime.value=y*f,this.lavaUniforms.uIntensity.value=x*h,this.lavaBlobs.forEach((w,C)=>{const g=w.userData,b=f*(1+x*.8);if(g.state==="heating"?(g.temperature+=g.heatRate*P*b,g.temperature>=1&&(g.temperature=1,g.state="rising")):g.state==="rising"?(w.position.y+=g.riseSpeed*b,w.position.y>=g.floatMax&&(g.state="cooling")):g.state==="cooling"?(g.temperature-=g.coolRate*P*b,g.temperature<=0&&(g.temperature=0,g.state="falling")):g.state==="falling"&&(w.position.y-=g.fallSpeed*b,w.position.y<=g.floatMin&&(g.state="heating")),w.position.x+=Math.sin(y*g.driftSpeed+g.driftPhase)*.02*b,this.lavaUniforms.uBlobs.value[C]){const W=g.baseSize*(.8+.5*g.temperature);this.lavaUniforms.uBlobs.value[C].set(w.position.x,w.position.y,w.position.z,W)}})}if(this.snowflakeGroup&&this.snowflakeGroup.visible&&this._snowData){const h=this._snowData,w=h.points.geometry.attributes.position.array,C=f*2;for(let g=0;g<h.count;g++){const b=g*3;w[b+1]-=h.speeds[g]*C;let W=Math.sin(y*h.driftFreqs[g]+h.phases[g])*h.drifts[g]*C;w[b]+=W,w[b+1]<-22&&(w[b+1]=22),w[b]>35&&(w[b]=-35),w[b]<-35&&(w[b]=35)}if(h.points.geometry.attributes.position.needsUpdate=!0,h.spinMeshes){const g=1+(x||0)*.15;h.spinMeshes.forEach((b,W)=>{b.rotation.z+=h.spinSpeeds[W]*C,b.position.y-=h.spinSpeeds[W]*.1*C,b.scale.setScalar(g),b.position.y<-25&&(b.position.y=25)})}h.material&&h.material.uniforms&&h.material.uniforms.uIntensity&&(h.material.uniforms.uIntensity.value=.2+x*.8)}if(this.activeModes.has("rainforest")&&this.rainMaterial){const h=f*.8*(1+G*.3);this.rainMaterial.uniforms.uTime.value=y,this.rainMaterial.uniforms.uSpeed.value=h,this.rainMaterial.uniforms.uIntensity.value=(.5+x*.2+G*.2)*(this.brightnessMultiplier||1)}if(this.activeModes.has("zengarden")&&this.petalMaterial){const h=f*.3*(1+G*.5);this.petalMaterial.uniforms.uTime.value=y,this.petalMaterial.uniforms.uSpeed.value=h,this.zenWater&&(this.zenWater.material.opacity=(.3+G*.2)*(this.brightnessMultiplier||1))}if(this.activeModes.has("fireplace")&&this.fireMesh&&this.fireMesh.material&&this.fireMesh.material.uniforms){const h=.8+.2*Math.sin(y*15)*Math.sin(y*7),w=this.fireMesh.material.uniforms;w.uTime&&(w.uTime.value=y*1.5*f),w.uIntensity&&(w.uIntensity.value=h+x*.5),this.fireLight&&(this.fireLight.intensity=(2+x*5)*h)}const O=performance.now(),xe=O-(this._lastFrameStartTime||O);if(this._lastFrameStartTime=O,this._fpsRingBuffer&&(this._fpsRingBuffer[this._fpsRingIndex]=xe,this._fpsRingIndex=(this._fpsRingIndex+1)%60,this._fpsRingCount=Math.min(60,this._fpsRingCount+1),this._fpsRingCount===60)){let h=0;for(let C=0;C<60;C++)h+=this._fpsRingBuffer[C];h/=60,1e3/h<35&&O-(this._lastLodDegradation||0)>3e3&&(this.degradeLOD(),this._lastLodDegradation=O,this._fpsRingCount=0)}const we=1e3/(this.targetFPS||60);O-this.lastFrameRenderTime>=we&&(this.renderer.autoClear=!this.activeModes.has("lightspeed"),this.renderer.autoClear&&this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.activeModes.has("cyber")&&this.renderCyberCyber(),this.lastFrameRenderTime=O)}catch(p){p.name==="TypeError"&&p.message.includes("uniforms")}finally{this._isRendering=!1}this.active&&!document.hidden?d.animationId=requestAnimationFrame(()=>this.render(d.analyserLeft,d.analyserRight)):d.animationId=null}}setCyberColor(e){this.cyberConfig.color=e,this.cyberConfig.rainbow=!1,this.cyberColorCustomized=!0,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.matrixConfig.rainbow=!1,this.cyberMaterial&&this.cyberMaterial.uniforms.uColor&&(this.cyberMaterial.uniforms.uColor.value.set(e),this._tempColor.set(e),this._tempColor.r+=(1-this._tempColor.r)*.8,this._tempColor.g+=(1-this._tempColor.g)*.8,this._tempColor.b+=(1-this._tempColor.b)*.8,this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor),this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=0))}getAverageFrequency(e,t){let i=d.analyserLeft||d.analyserRight;if(!i)return 0;const a=i.frequencyBinCount;(!this._freqDataArray||this._freqDataArray.length!==a)&&(this._freqDataArray=new Uint8Array(a));const o=this._freqDataArray;i.getByteFrequencyData(o),e===void 0&&(e=0),t===void 0&&(t=o.length);let s=0,r=0;for(let n=e;n<t&&n<o.length;n++)s+=o[n],r++;return r>0?s/r:0}setMouseInfluence(e){this.mouseInfluence=e}setGlobalSpeed(e){this.speedMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=1+(e-1)*.5)}setGlobalBrightness(e){this.brightnessMultiplier=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberBrightness(e){this.cyberConfig.brightness=e}setMatrixBrightness(e){this.matrixConfig.brightness=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uBrightness&&(this.cyberMaterial.uniforms.uBrightness.value=e)}setCyberSpeed(e){this.cyberConfig.speed=e}setCyberLength(e){this.cyberConfig.length=e}setMatrixSpeed(e){this.matrixConfig.speed=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uSpeed&&(this.cyberMaterial.uniforms.uSpeed.value=e)}setMatrixLength(e){this.matrixConfig.length=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uTailLength&&(this.cyberMaterial.uniforms.uTailLength.value=e)}setCyberRainbow(e){if(this.cyberConfig.rainbow=e,this.cyberRainbowMode=e,!e){const t=this.cyberConfig.color||this.cyberColor||"#00FF41";this.matrixCyberStreams&&this.matrixCyberStreams.forEach(i=>{i.color=t})}}setMatrixRainbow(e){this.matrixConfig.rainbow=e,this.cyberMaterial&&this.cyberMaterial.uniforms.uRainbow&&(this.cyberMaterial.uniforms.uRainbow.value=e?1:0)}setBatterySaver(e){this.batterySaver=e,this.targetFPS=e?30:60;const t=e?1:2;this.renderer&&(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t)),this.resize())}degradeLOD(){this.renderer&&(this.currentLodLevel==="high"?(this.renderer.setPixelRatio(1),this.currentLodLevel="medium",this.resize()):this.currentLodLevel==="medium"&&(this.renderer.setPixelRatio(.75),this.currentLodLevel="low",this.resize()))}updateCyberStrings(){if(!this.matrixCyberStreams)return;let e=!1,t="MINDWAVE🪷";const i=this.cyberConfig;i.logicMode==="custom"||i.logicMode==="txt"?(e=!0,t="🪷"+(i.customText||"WELCOME TO MINDWAVE")):(i.logicMode==="mindwave"||i.logicMode==="mw")&&(e=!0,t="MINDWAVE🪷");const a="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",o="0123456789·:.-+x[]<>/\\∆ΣΩ∞",s=100;this.matrixCyberStreams.forEach(r=>{if(r.chars=[],r.isTextMode=e,e&&t.length>0){const n=[...t].reverse();for(let m=0;m<s;m++)r.chars.push(n[m%n.length])}else if(i.logicMode==="matrix"||i.logicMode==="interstellar"||i.logicMode==="int")for(let n=0;n<s;n++)r.chars.push(o.charAt(Math.floor(Math.random()*o.length)));else for(let n=0;n<s;n++)r.chars.push(a.charAt(Math.floor(Math.random()*a.length)))})}setCyberLogicMode(e,t){this.cyberConfig.logicMode=e,t!==void 0&&(this.cyberConfig.customText=t),this.updateCyberStrings()}setMatrixLogicMode(e,t){if(this.matrixConfig.logicMode=e,t!==void 0&&(this.matrixConfig.customText=t),this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uTexture){const i=this.cyberMaterial.uniforms.uTexture.value,a=this.createCyberTexture(this.matrixConfig);this.cyberMaterial.uniforms.uTexture.value=a,this.cyberMaterial.needsUpdate=!0,i&&i.dispose()}this.initCyber()}setCyberColor(e){this.cyberConfig.color=e,this.matrixCyberStreams&&this.matrixCyberStreams.forEach(t=>{t.color=e})}setMatrixColor(e){this.matrixConfig.color=e,this.cyberMaterial&&this.cyberMaterial.uniforms&&this.cyberMaterial.uniforms.uColor&&this.cyberMaterial.uniforms.uColor.value.set(e)}setCyberAngle(e){this.cyberConfig.angle=e}setMatrixAngle(e){this.matrixConfig.angle=e,this.currentCyberAngle=e,this.cyberRotationGroup&&(this.cyberRotationGroup.rotation.z=ge.degToRad(-e))}setVibrationEnabled(e){this.vibrationEnabled=e}updateLogoTexture(){if(!this.originalLogoImg)return;const e=512;this._logoRenderCanvas||(this._logoRenderCanvas=document.createElement("canvas"),this._logoRenderCanvas.width=e,this._logoRenderCanvas.height=e);const t=this._logoRenderCanvas,i=t.getContext("2d",{willReadFrequently:!0});i.clearRect(0,0,e,e),i.drawImage(this.originalLogoImg,0,0,e,e);const a=i.getImageData(0,0,t.width,t.height),o=a.data,s=document.body.dataset.theme||"default",r=de[s]||de.default,n=r.secondary||r.accent||"#ffffff",m=this.customColors&&this.customColors.mandala?this.customColors.mandala:this.customColor,u=m?m.getHex():parseInt(r.accent.replace("#",""),16),l=parseInt(n.replace("#",""),16),p=u>>16&255,c=u>>8&255,v=u&255,f=l>>16&255,y=l>>8&255,P=l&255;this.themeType=document.body.dataset.themeType||"dark",this.themeType;for(let S=0;S<o.length;S+=4){const F=o[S],G=o[S+1],x=o[S+2],E=o[S+3];E<10||(F>200&&G>200&&x>200?(o[S]=p,o[S+1]=c,o[S+2]=v,o[S+3]=255):(o[S]=f,o[S+1]=y,o[S+2]=P,o[S+3]=Math.min(255,E*1.5)))}i.putImageData(a,0,0);const L=new te(t);if(L.minFilter=Me,L.magFilter=Me,L.generateMipmaps=!0,this.renderer&&(L.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),this.logoMesh){const S=this.logoMesh.material.map;this.logoMesh.material.map=L,this.logoMesh.material.needsUpdate=!0,S&&S.dispose()}else{const S=new X(5.625,4.78),F=new V({map:L,transparent:!0,opacity:.8,color:16777215,depthTest:!1,depthWrite:!1});this.logoMesh=new A(S,F),this.logoMesh.position.set(0,0,-10),this.logoMesh.renderOrder=-1,this.scene.add(this.logoMesh)}}initOverlayLogo(){if(this.logoMesh)return;const e=new Image;e.crossOrigin="anonymous",e.src="./mindwave-logo-icon.png",e.onload=()=>{this.originalLogoImg=e,this.updateLogoTexture(),this.targetLogoOpacity!==void 0?this.setLogoOpacity(this.targetLogoOpacity):this.setLogoOpacity(.8)},e.onerror=t=>{}}setLogoOpacity(e){this.targetLogoOpacity=e,this.logoMesh&&this.logoMesh.material?this.logoMesh.material.opacity=e*this.brightnessMultiplier:!this.logoMesh&&e>0&&this.initOverlayLogo()}dispose(){this.active=!1,d.animationId&&(cancelAnimationFrame(d.animationId),d.animationId=null),window.removeEventListener("resize",this.resize),window.removeEventListener("resize",this.resizeOverlayCanvas),window.removeEventListener("mindwave:layout-change",this.handleLayoutChange),this._boundSafeMode&&window.removeEventListener("mindwave:safe-mode-start",this._boundSafeMode),this._boundVisibilityChange&&document.removeEventListener("visibilitychange",this._boundVisibilityChange),this._boundThemeChange&&window.removeEventListener("themeChanged",this._boundThemeChange),this.canvas&&(this._boundContextLost&&this.canvas.removeEventListener("webglcontextlost",this._boundContextLost),this._boundContextRestored&&this.canvas.removeEventListener("webglcontextrestored",this._boundContextRestored)),this._boundCymaticPointer&&(window.removeEventListener("mousemove",this._boundCymaticPointer),window.removeEventListener("touchmove",this._boundCymaticPointer));const e=i=>{if(i)for(;i.children.length>0;){const a=i.children[0];if(i.remove(a),a.geometry&&a.geometry.dispose(),a.material){if(a.material.map&&a.material.map.dispose(),a.material.uniforms)for(const o in a.material.uniforms){const s=a.material.uniforms[o];s&&s.value&&s.value.dispose&&s.value.dispose()}a.material.dispose()}a.children&&a.children.length&&a.traverse(o=>{o.geometry&&o.geometry.dispose(),o.material&&(o.material.map&&o.material.map.dispose(),o.material.dispose())})}},t=[this.sphereGroup,this.particleGroup,this.lightspeedGroup,this.lavaGroup,this.fireplaceGroup,this.rainforestGroup,this.zenGardenGroup,this.oceanGroup,this.wavesGroup,this.cyberGroup,this.boxGroup,this.dragonGroup,this.galaxyGroup,this.mandalaGroup,this.cymaticsGroup,this.snowflakeGroup];this._fpsRingBuffer=null,this._tempColor=null,this._logoRenderCanvas=null,t.forEach(e),this.cyberMaterial&&(this.cyberMaterial.dispose(),this.cyberMaterial=null),this.fireMaterial&&(this.fireMaterial.dispose(),this.fireMaterial=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.lightspeedMaterial&&(this.lightspeedMaterial.dispose(),this.lightspeedMaterial=null),this.rainMaterial&&(this.rainMaterial.dispose(),this.rainMaterial=null),this.petalMaterial&&(this.petalMaterial.dispose(),this.petalMaterial=null),this.logoMesh&&(this.logoMesh.material&&(this.logoMesh.material.map&&this.logoMesh.material.map.dispose(),this.logoMesh.material.dispose()),this.logoMesh.geometry&&this.logoMesh.geometry.dispose(),this.scene&&this.scene.remove(this.logoMesh),this.logoMesh=null);for(const i in this.textures)this.textures[i]&&this.textures[i].dispose&&this.textures[i].dispose();if(this.textures={},this._freqDataArray=null,this.renderer){try{this.renderer.forceContextLoss()}catch{}this.renderer.dispose(),this.renderer=null}this.scene=null,this.camera=null}setWarpSpeed(e){this.lightspeedMaterial&&(this.lightspeedMaterial.uniforms.uSpeed.value=e)}setWarpFov(e){this.camera&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setWarpChromatic(e){this.lightspeedMaterial}}function Ye(){return M?Promise.resolve(M):new Promise(I=>{He(),setTimeout(()=>I(M),10)})}function He(){if(!M&&k.canvas&&k.canvas.activeVisualizer&&k.canvas.activeVisualizer.isVisualizer3D&&(M=k.canvas.activeVisualizer),k.canvas&&k.canvas.activeVisualizer){if(M&&k.canvas.activeVisualizer===M)return M;k.canvas.activeVisualizer.dispose(),k.canvas.activeVisualizer=null,M=null}d.animationId&&(cancelAnimationFrame(d.animationId),d.animationId=null);const I=k.canvas||document.getElementById("visualizer");if(!M&&I){const e=I&&I.activeVisualizer&&I.activeVisualizer.isVisualizer3D?{activeModes:I.activeVisualizer.activeModes,mode:I.activeVisualizer.mode,mindWaveMode:I.activeVisualizer.mindWaveMode,cyberLogicMode:I.activeVisualizer.cyberLogicMode,cyberCustomText:I.activeVisualizer.cyberCustomText,currentCyberAngle:I.activeVisualizer.currentCyberAngle,cyberSpeedMultiplier:I.activeVisualizer.cyberSpeedMultiplier,rainbowEnabled:I.activeVisualizer._rainbowEnabled}:{};M=new Q(I,e),I.activeVisualizer=M,setTimeout(()=>{M&&(M.updateVisibility(),Oe())},0)}return M}function Ze(){return M}let he=!1;function Xe(){he=!0,M&&d.animationId&&(cancelAnimationFrame(d.animationId),d.animationId=null,M.renderer&&M.scene&&M.camera&&M.renderer.render(M.scene,M.camera))}function Oe(){M&&!d.animationId&&(M.active=!0,M.render(d.analyserLeft,d.analyserRight),he=!1)}function $e(){return he}function Qe(I){M&&M.toggleMode(I)}function Ke(I){M&&(M.setGlobalSpeed(I),M.setCyberSpeed&&M.setCyberSpeed(I))}function Je(I,e=null){M&&(M.setVisualColor(I,e),M.setCyberColor&&(!e||e=="cyber")&&M.setCyberColor(I))}function et(I){M&&M.setGlobalBrightness&&M.setGlobalBrightness(I)}function tt(I){M&&M.setLogoOpacity(I)}function it(I){M&&M.setMouseInfluence(I)}window.toggleGalaxySun=function(){return M?M.toggleGalaxySunStyle():null};export{Q as Visualizer3D,Ze as getVisualizer,He as initVisualizer,$e as isVisualsPaused,Xe as pauseVisuals,Ye as preloadVisualizer,Oe as resumeVisuals,it as setMouseInfluence,et as setVisualBrightness,Je as setVisualColor,tt as setVisualLogoOpacity,Ke as setVisualSpeed,Qe as toggleVisual};
//# sourceMappingURL=visualizer_vGOLD_SYNC-Cy5bXXB0.js.map
