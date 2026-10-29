const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/bootloader-DzvcgUdl.js","assets/preload-helper-CS1eXPs2.js","assets/bootloader-CqfXA-ev.css"])))=>i.map(i=>d[i]);
import{_ as w}from"./preload-helper-CS1eXPs2.js";import{s as _,a as V,b as U,h as y,l as I,c as $,d as O,e as B}from"./bootloader-DzvcgUdl.js";const m={1:{name:"Type I (Very Fair)",desc:"Always burns, never tans",medMinutesUVI10:8,optimalMedRatio:.5},2:{name:"Type II (Fair)",desc:"Burns easily, tans minimally",medMinutesUVI10:12,optimalMedRatio:.6},3:{name:"Type III (Medium / Olive)",desc:"Burns moderately, tans gradually",medMinutesUVI10:18,optimalMedRatio:.7},4:{name:"Type IV (Olive / Brown)",desc:"Burns rarely, tans easily",medMinutesUVI10:25,optimalMedRatio:.75},5:{name:"Type V (Dark Brown)",desc:"Very rarely burns, tans profusely",medMinutesUVI10:35,optimalMedRatio:.8},6:{name:"Type VI (Deeply Pigmented)",desc:"Never burns, deeply pigmented",medMinutesUVI10:50,optimalMedRatio:.85}};class R{constructor(){this.storageKeyCoords="mindwave_solar_coords",this.storageKeySkin="mindwave_solar_skin_type",this.storageKeyNotify="mindwave_solar_notifications_enabled"}getUserCoordinates(){try{if(typeof window<"u"&&window.localStorage){const e=localStorage.getItem(this.storageKeyCoords);if(e)return JSON.parse(e)}}catch{}return{lat:37.7749,lon:-122.4194,city:"Local Horizon"}}setUserCoordinates(e,o,i="Detected Location"){typeof window<"u"&&window.localStorage&&localStorage.setItem(this.storageKeyCoords,JSON.stringify({lat:e,lon:o,city:i}))}getUserSkinType(){return typeof window<"u"&&window.localStorage?parseInt(localStorage.getItem(this.storageKeySkin)||"3",10):3}setUserSkinType(e){typeof window<"u"&&window.localStorage&&localStorage.setItem(this.storageKeySkin,String(e))}areNotificationsEnabled(){return typeof window<"u"&&window.localStorage?localStorage.getItem(this.storageKeyNotify)==="true":!1}setNotificationsEnabled(e){typeof window<"u"&&window.localStorage&&localStorage.setItem(this.storageKeyNotify,e?"true":"false")}calculateSolarPosition(e,o,i=new Date){const t=Math.PI/180,a=180/Math.PI,s=new Date(i.getFullYear(),0,0),l=i.getTime()-s.getTime(),p=Math.floor(l/(1e3*60*60*24)),u=23.45*Math.sin(t*(360/365*(284+p))),c=360/365*(p-81)*t,r=9.87*Math.sin(2*c)-7.53*Math.cos(c)-1.5*Math.sin(c),b=((i.getUTCHours()+i.getUTCMinutes()/60+i.getUTCSeconds()/3600+o/15+r/60+24)%24-12)*15,f=Math.sin(e*t),M=Math.cos(e*t),T=Math.sin(u*t),E=Math.cos(u*t),P=Math.cos(b*t),A=f*T+M*E*P,v=Math.acos(Math.max(-1,Math.min(1,A)))*a,h=90-v,x=h>0?1/(Math.sin(h*t)+.50572*Math.pow(h+6.07995,-1.6364)):1/0,C=h>0,k=h>10,N=h>15,L=h>35,D=h>5?Math.max(0,Math.sin(h*t)*11-.5):0;return{zenith:v,elevation:h,airMass:isFinite(x)?x:0,nirActive:C,blueCircadianActive:k,uvaActive:N,uvbActive:L,estimatedUVI:parseFloat(D.toFixed(1))}}computeDailySchedule(e,o,i=new Date){const t={dawn:null,sunrise:null,circadianBlueStart:null,uvaStart:null,uvbStart:null,solarZenith:null,uvbEnd:null,uvaEnd:null,circadianBlueEnd:null,sunset:null,peakElevation:-90,currentPhase:null},a=i.getFullYear(),s=i.getMonth(),l=i.getDate();for(let c=0;c<1440;c+=2){const r=new Date(a,s,l,Math.floor(c/60),c%60),d=this.calculateSolarPosition(e,o,r);d.elevation>t.peakElevation&&(t.peakElevation=d.elevation,t.solarZenith=r),d.elevation>=0&&!t.sunrise&&(t.sunrise=r),d.elevation>=10&&!t.circadianBlueStart&&(t.circadianBlueStart=r),d.elevation>=15&&!t.uvaStart&&(t.uvaStart=r),d.elevation>=35&&!t.uvbStart&&(t.uvbStart=r),t.solarZenith&&d.elevation<35&&t.uvbStart&&!t.uvbEnd&&(t.uvbEnd=r),t.solarZenith&&d.elevation<15&&t.uvaStart&&!t.uvaEnd&&(t.uvaEnd=r),t.solarZenith&&d.elevation<10&&t.circadianBlueStart&&!t.circadianBlueEnd&&(t.circadianBlueEnd=r),t.solarZenith&&d.elevation<0&&t.sunrise&&!t.sunset&&(t.sunset=r)}const p=i,u=this.calculateSolarPosition(e,o,p);if(u.elevation<0)t.currentPhase={name:"Nocturnal Restoration",badge:"PINEAL MELATONIN SURGE",desc:"Zero blue light recommended. Pineal gland actively secreting restorative systemic melatonin into CSF & serum.",action:"Shield eyes from blue/green photons (>550nm cutoff). Restorative sleep & cellular autophagy active."};else if(u.elevation<15){const c=!t.solarZenith||p<t.solarZenith;t.currentPhase=c?{name:"Solar Dawn / NIR Priming",badge:"CYTOCHROME C OXIDASE (CCO)",desc:"Spectrum dominated by Near-Infrared (700-1400 nm) & deep red. Deep tissue penetrance stimulates mitochondrial melatonin.",action:"15-30 min outside without sunglasses. Pre-conditions cellular membranes and DNA against subsequent UV exposure."}:{name:"Golden Hour / Evening NIR Recovery",badge:"MITOCHONDRIAL REPAIR & SCN DOWNSHIFT",desc:"Vanishing blue light disinhibits pineal AANAT enzyme. Red/NIR activates DNA repair enzymes in skin cells.",action:"20-30 min low-angle sunset exposure. Signals pineal melatonin priming for deep restorative sleep."}}else if(u.elevation<35)t.currentPhase={name:"Mid-Day Circadian & Vascular Wave",badge:"UVA & NITRIC OXIDE (NO) RELEASE",desc:"Strong 480nm blue activates ipRGC melanopsin, anchoring cortisol awakening response. UVA releases photolabile Nitric Oxide.",action:"15-20 min ambient light exposure. Promotes systemic vasodilation, healthy arterial blood pressure, and mental alertness."};else{const c=this.getUserSkinType(),r=m[c]||m[3],d=Math.max(1,u.estimatedUVI),g=Math.round(r.medMinutesUVI10*(10/d)*r.optimalMedRatio);t.currentPhase={name:"Active UVB Synthesis Window",badge:"PRE-VITAMIN D3 & POMC / EUMELANIN",desc:"Solar elevation > 35°. UVB converts 7-DHC to Pre-Vitamin D3. Basal keratinocytes trigger POMC -> alpha-MSH & beta-endorphins.",action:`Optimal sub-erythemal exposure for ${r.name}: ~${Math.max(5,Math.min(60,g))} min. Stop well short of pinkness/erythema.`}}return{currentPos:u,schedule:t}}getOptimalExposureAdvice(e,o){const{currentPos:i,schedule:t}=this.computeDailySchedule(e,o),a=this.getUserSkinType(),s=m[a]||m[3];return{skinType:a,profile:s,currentPos:i,schedule:t,isUvbWinter:t.peakElevation<35}}}const F=new R;class j{constructor(){this.engine=F,this.modalId="solarPhotobiologyModal",this.updateInterval=null,this.lastNotifiedPhase=localStorage.getItem("mindwave_last_notified_solar_phase")||"",this.init()}init(){window.solarService=this,window.openSolarModal=()=>this.openModal(),window.closeSolarModal=()=>this.closeModal(),this.schedulePhaseMonitoring()}formatTime(e){return e?e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--:--"}async requestNotificationPermission(){if(!("Notification"in window))return window.showToast&&window.showToast("Browser notifications not supported","warning"),!1;if(Notification.permission==="granted")return this.engine.setNotificationsEnabled(!0),window.showToast&&window.showToast("Solar notifications active! ☀️","success"),this.updateModalContent(),!0;const e=await Notification.requestPermission();return e==="granted"?(this.engine.setNotificationsEnabled(!0),window.showToast&&window.showToast("Solar notifications enabled! ☀️","success"),new Notification("MindWave Solar Photobiology",{body:"You will receive MindWave alerts for healthy NIR priming, Nitric Oxide, & UVB windows.",icon:"./mindwave-logo.png"})):(this.engine.setNotificationsEnabled(!1),window.showToast&&window.showToast("Notification permission denied","warning")),this.updateModalContent(),e==="granted"}notifyUser(e,o,i="solar-phase"){if(window.showToast&&window.showToast(`${e}: ${o}`,"info"),this.engine.areNotificationsEnabled()&&"Notification"in window&&Notification.permission==="granted")try{new Notification(e,{body:o,tag:i,icon:"./mindwave-logo.png"})}catch{}}schedulePhaseMonitoring(){setInterval(()=>{const e=this.engine.getUserCoordinates(),{currentPos:o,schedule:i}=this.engine.computeDailySchedule(e.lat,e.lon,new Date),t=i.currentPhase?i.currentPhase.name:"";if(t&&t!==this.lastNotifiedPhase&&(this.lastNotifiedPhase=t,localStorage.setItem("mindwave_last_notified_solar_phase",t),this.engine.areNotificationsEnabled())){const a=i.currentPhase.badge,s=i.currentPhase.action;this.notifyUser(`☀️ MindWave Solar Alert: ${t}`,`${a} — ${s}`)}},12e4)}detectLocation(){if(!navigator.geolocation){window.showToast&&window.showToast("Geolocation not supported by browser","warning");return}window.showToast&&window.showToast("Detecting local horizon coordinates...","info"),navigator.geolocation.getCurrentPosition(e=>{const o=parseFloat(e.coords.latitude.toFixed(4)),i=parseFloat(e.coords.longitude.toFixed(4));this.engine.setUserCoordinates(o,i,`Lat ${o}°, Lon ${i}°`),window.showToast&&window.showToast(`Location synced (${o}°, ${i}°)`,"success"),this.updateModalContent()},e=>{window.showToast&&window.showToast("Could not fetch GPS. Using default location.","warning")},{enableHighAccuracy:!1,timeout:8e3})}openModal(){let e=document.getElementById(this.modalId);e||(this.createModalDOM(),e=document.getElementById(this.modalId)),e&&(e.classList.remove("hidden"),this.updateModalContent(),this.updateInterval&&clearInterval(this.updateInterval),this.updateInterval=setInterval(()=>this.updateModalContent(),1e4))}closeModal(){const e=document.getElementById(this.modalId);e&&e.classList.add("hidden"),this.updateInterval&&(clearInterval(this.updateInterval),this.updateInterval=null)}createModalDOM(){const e=document.createElement("div");e.id=this.modalId,e.className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto",e.innerHTML=`
            <div class="relative w-full max-w-2xl bg-[#0f172a]/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] flex flex-col gap-6 text-white my-auto max-h-[92vh] overflow-y-auto custom-scrollbar">
                
                <!-- Header -->
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <svg class="w-6 h-6 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="5" stroke-width="2"></circle>
                                <path stroke-linecap="round" stroke-width="2" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500 bg-clip-text text-transparent">
                                MindWave Photobiology
                            </h2>
                            <p class="text-xs text-white/50">Circadian Light, Subcellular Melatonin & Healthy Solar Timing</p>
                        </div>
                    </div>
                    <button onclick="window.closeSolarModal()" class="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <!-- Dynamic Content Container -->
                <div id="solarModalBody" class="space-y-6">
                    <div class="flex justify-center py-12 text-white/40 text-sm">Calculating solar spectrum coordinates...</div>
                </div>

            </div>
        `,document.body.appendChild(e),e.addEventListener("click",o=>{o.target===e&&this.closeModal()})}updateModalContent(){const e=document.getElementById("solarModalBody");if(!e)return;const o=this.engine.getUserCoordinates(),i=this.engine.getOptimalExposureAdvice(o.lat,o.lon),{currentPos:t,schedule:a,profile:s,skinType:l,isUvbWinter:p}=i,u=this.engine.areNotificationsEnabled(),c=t.nirActive?'<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">ACTIVE (700-1400nm)</span>':'<span class="px-2 py-0.5 rounded text-[10px] text-white/30 bg-white/5">INACTIVE</span>',r=t.blueCircadianActive?'<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">ACTIVE (480nm)</span>':'<span class="px-2 py-0.5 rounded text-[10px] text-white/30 bg-white/5">INACTIVE</span>',d=t.uvaActive?'<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">ACTIVE (315-400nm)</span>':'<span class="px-2 py-0.5 rounded text-[10px] text-white/30 bg-white/5">INACTIVE</span>',g=t.uvbActive?'<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">ACTIVE (290-315nm)</span>':p?'<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">UVB WINTER (Peak <35°)</span>':'<span class="px-2 py-0.5 rounded text-[10px] text-white/30 bg-white/5">INACTIVE</span>';e.innerHTML=`
            <!-- Current Real-Time Phase Card -->
            <div class="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white/5 to-transparent border border-amber-500/30 flex flex-col gap-3 relative overflow-hidden">
                <div class="flex items-center justify-between flex-wrap gap-2">
                    <span class="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                        CURRENT SOLAR PHASE
                    </span>
                    <span class="text-xs font-mono text-white/60">Solar Elevation: <b class="text-white">${t.elevation.toFixed(1)}°</b> | Air Mass: <b class="text-white">${t.airMass.toFixed(2)}m</b></span>
                </div>
                
                <div>
                    <h3 class="text-lg font-bold text-white flex items-center gap-2">
                        ${a.currentPhase.name}
                        <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            ${a.currentPhase.badge}
                        </span>
                    </h3>
                    <p class="text-xs text-white/70 mt-1 leading-relaxed">${a.currentPhase.desc}</p>
                </div>

                <div class="mt-1 p-3 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3 text-xs text-amber-200/90 leading-snug">
                    <span class="text-base">💡</span>
                    <div>
                        <strong class="text-amber-300 block mb-0.5">Optimal Action Protocol:</strong>
                        ${a.currentPhase.action}
                    </div>
                </div>
            </div>

            <!-- Spectral Frequency Status Grid -->
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Live Atmospheric Frequencies Reaching Ground</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div class="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between gap-2">
                        <div>
                            <span class="text-[10px] font-bold uppercase text-red-400 block">Near-Infrared (NIR)</span>
                            <span class="text-[11px] text-white/60">Subcellular Melatonin / CCO</span>
                        </div>
                        <div>${c}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between gap-2">
                        <div>
                            <span class="text-[10px] font-bold uppercase text-blue-400 block">Circadian Blue (480nm)</span>
                            <span class="text-[11px] text-white/60">ipRGCs / Pineal Cutoff</span>
                        </div>
                        <div>${r}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between gap-2">
                        <div>
                            <span class="text-[10px] font-bold uppercase text-purple-400 block">UVA Band</span>
                            <span class="text-[11px] text-white/60">Nitric Oxide / Blood Flow</span>
                        </div>
                        <div>${d}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between gap-2">
                        <div>
                            <span class="text-[10px] font-bold uppercase text-emerald-400 block">UVB Band</span>
                            <span class="text-[11px] text-white/60">Pre-Vit D3 / Eumelanin</span>
                        </div>
                        <div>${g}</div>
                    </div>
                </div>
            </div>

            <!-- Today's Photobiology Timeline -->
            <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-white/70">Today's Solar Exposure Windows</h4>
                    <span class="text-[11px] font-mono text-white/40">Peak Sun: ${this.formatTime(a.solarZenith)} (${a.peakElevation.toFixed(1)}°)</span>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div class="p-2.5 rounded-lg bg-black/20 border border-white/5">
                        <span class="text-red-400 font-semibold block text-[11px]">🌅 Dawn NIR Priming</span>
                        <span class="text-white font-mono">${this.formatTime(a.sunrise)} - ${this.formatTime(a.uvaStart)}</span>
                        <p class="text-[10px] text-white/50 mt-0.5">Mitochondrial conditioning before UV</p>
                    </div>
                    <div class="p-2.5 rounded-lg bg-black/20 border border-white/5">
                        <span class="text-blue-400 font-semibold block text-[11px]">☀️ Circadian & Nitric Oxide</span>
                        <span class="text-white font-mono">${this.formatTime(a.circadianBlueStart)} - ${this.formatTime(a.circadianBlueEnd)}</span>
                        <p class="text-[10px] text-white/50 mt-0.5">SCN reset & arterial vasodilation</p>
                    </div>
                    <div class="p-2.5 rounded-lg bg-black/20 border border-white/5">
                        <span class="text-emerald-400 font-semibold block text-[11px]">☀️ Active UVB Synthesis</span>
                        <span class="text-white font-mono">${a.uvbStart?`${this.formatTime(a.uvbStart)} - ${this.formatTime(a.uvbEnd)}`:"None (UVB Winter)"}</span>
                        <p class="text-[10px] text-white/50 mt-0.5">Pre-vitamin D3 & POMC activation</p>
                    </div>
                </div>
            </div>

            <!-- Fitzpatrick Calibration & Controls -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Skin Type Selector -->
                <div class="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col justify-between gap-3">
                    <div>
                        <label class="text-xs font-bold text-white/70 uppercase tracking-wider block mb-1">
                            Fitzpatrick Skin Calibration
                        </label>
                        <select id="solarSkinSelect" class="w-full bg-[#1e293b] text-white text-xs rounded-xl p-2.5 border border-white/20 focus:outline-none focus:border-amber-400" onchange="window.solarService.onSkinTypeChange(this.value)">
                            ${Object.entries(m).map(([b,f])=>`
                                <option value="${b}" ${parseInt(b,10)===l?"selected":""}>
                                    ${f.name} — ${f.desc}
                                </option>
                            `).join("")}
                        </select>
                    </div>
                    <p class="text-[11px] text-white/50 leading-relaxed">
                        Adjusts sub-erythemal window to safely maximize cellular benefit without DNA over-saturation.
                    </p>
                </div>

                <!-- Notifications & Location Sync -->
                <div class="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col justify-between gap-3">
                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-xs font-bold text-white/70 uppercase tracking-wider block">Location Horizon</span>
                            <span class="text-xs text-white/60 font-mono">${o.city} (${o.lat}°, ${o.lon}°)</span>
                        </div>
                        <button onclick="window.solarService.detectLocation()" class="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1">
                            <span>📍</span> Auto-GPS
                        </button>
                    </div>

                    <div class="flex items-center justify-between pt-2 border-t border-white/10">
                        <span class="text-xs text-white/80 font-medium">Daily MindWave Alerts</span>
                        <button onclick="window.solarService.toggleNotifications()" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${u?"bg-amber-400 text-black hover:bg-amber-300":"bg-white/10 text-white/70 hover:bg-white/20"}">
                            ${u?"✓ Enabled":"Enable Notifications"}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Footer Disclaimer -->
            <p class="text-[10px] text-white/30 text-center leading-relaxed">
                MindWave Photobiology computes solar geometry & atmospheric air mass models for circadian wellness. Always practice sub-erythemal exposure and listen to your body.
            </p>
        `}onSkinTypeChange(e){this.engine.setUserSkinType(e),window.showToast&&window.showToast("Fitzpatrick skin profile updated","success"),this.updateModalContent()}async toggleNotifications(){this.engine.areNotificationsEnabled()?(this.engine.setNotificationsEnabled(!1),window.showToast&&window.showToast("Solar notifications muted","info"),this.updateModalContent()):await this.requestNotificationPermission()}}new j;window.NUCLEAR_MAIN_LOADED=!0;window.setMasterVolume=_;window.setBeatsVolume=V;window.setAtmosVolume=U;window.onerror=(n,e,o,i,t)=>{y(t||new Error(n),"Uncaught"),I(t||new Error(n),`${e}:${o}:${i}`)};window.onunhandledrejection=n=>{y(n.reason||new Error("Unhandled rejection"),"Promise"),I(n.reason||new Error("Unhandled rejection"),"UnhandledPromise")};window.playMeditationStory=async(n,e)=>{try{const o=await w(()=>import("./bootloader-DzvcgUdl.js").then(i=>i.aU),__vite__mapDeps([0,1,2]));o.playStory&&o.playStory(n,!1)}catch{}};const S={0:"pad",1:"drone",2:"crystal",3:"choir",4:"shimmer",5:"subbass",6:"heartbeat",7:"tibetan"};window.triggerDjSound=async n=>{try{const e=S[n]||n,o=await w(()=>import("./bootloader-DzvcgUdl.js").then(i=>i.aV),__vite__mapDeps([0,1,2]));o.triggerOneShot&&o.triggerOneShot(e)}catch{}};window.clearAllDjPads=async()=>{try{const n=await w(()=>import("./bootloader-DzvcgUdl.js").then(e=>e.aV),__vite__mapDeps([0,1,2]));n.stopAllLoops&&n.stopAllLoops()}catch{}};window.toggleDjHold=async n=>{try{const e=S[n]||n,o=await w(()=>import("./bootloader-DzvcgUdl.js").then(i=>i.aV),__vite__mapDeps([0,1,2]));o.isLoopActive&&o.isLoopActive(e)?o.stopLoop(e):o.startLoop&&o.startLoop(e)}catch{}};window.seekClassicalAudio=n=>{const e=document.getElementById("classicalAudioPlayer")||document.querySelector("audio.classical");e&&(e.currentTime=n)};window.updateVisualIntensity=(n,e)=>{const o=document.getElementById(e);o&&(o.textContent=n+"%"),window.controls&&window.controls.setIntensity?window.controls.setIntensity(n):window.setVisualIntensity&&window.setVisualIntensity(n)};window.toggleObserverEffect=function(n){if(!window.viz3D||!window.viz3D.cymaticsCore)return;window.viz3D.cymaticsCore.activeClassId!==25&&window.setCymaticPattern&&window.setCymaticPattern(25,0);const e=n?1:0,o=window.viz3D.cymaticsCore.materials[25];if(o&&o.uniforms&&o.uniforms.uObserver){let s=function(){const l=Date.now(),p=Math.min((l-t)/a,1),u=1-Math.pow(1-p,3);o.uniforms.uObserver.value=i+(e-i)*u,p<1&&requestAnimationFrame(s)};const i=o.uniforms.uObserver.value,t=Date.now(),a=1e3;s()}};$();O.init();document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("deleteAccountBtn");n&&n.addEventListener("click",async()=>{if(confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")&&confirm("FINAL WARNING: All your data, presets, and purchases will be lost forever. Proceed?"))try{await B(),alert("Account deleted successfully."),window.location.reload()}catch(t){alert("Failed to delete account. You may need to log out and log back in to verify your identity before deleting. Error: "+t.message)}});const e=document.getElementById("shareSoundscapeBtn");e&&e.addEventListener("click",()=>{w(async()=>{const{state:t}=await import("./bootloader-DzvcgUdl.js").then(a=>a.aO);return{state:t}},__vite__mapDeps([0,1,2])).then(({state:t})=>{const a=`${t.baseFrequency}_${t.beatFrequency}_${t.activePresetType||"custom"}`,s=new URL(window.location.href);s.searchParams.set("share",a),navigator.clipboard.writeText(s.toString()).then(()=>{const l=e.innerHTML;e.innerHTML='<span class="flex-1 text-left text-[var(--accent)]">Link Copied!</span>',setTimeout(()=>{e.innerHTML=l},2e3)})})});const i=new URLSearchParams(window.location.search).get("share");if(i){const[t,a,s]=i.split("_");w(async()=>{const{state:l}=await import("./bootloader-DzvcgUdl.js").then(p=>p.aO);return{state:l}},__vite__mapDeps([0,1,2])).then(({state:l})=>{t&&(l.baseFrequency=parseFloat(t)),a&&(l.beatFrequency=parseFloat(a)),s&&s!=="custom"&&(l.activePresetType=s),setTimeout(()=>{window.updateFrequencies&&window.updateFrequencies(l.baseFrequency,l.beatFrequency)},1e3)})}});
