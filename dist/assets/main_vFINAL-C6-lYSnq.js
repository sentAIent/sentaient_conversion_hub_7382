const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pwa-install-BB-DURYK.js","assets/controls_v3-DnInW25W.js","assets/cursor-pIy7q_O4.js","assets/email-capture-C8FpYIZi.js","assets/journey-DJS0BsZx.js"])))=>i.map(i=>d[i]);
import{e as P,u as h,g as Q,t as ee,_ as u,i as te,d as M,a as oe,b as L,c as ne,f as ie,h as ae,j as se,k as re,l as le,m as ce,n as de,o as ue,q as pe,r as me,v as ge,w as fe,x as we,y as be,z as he,A as ye,B as xe,C as ve,D as Se,E as _e,F as Ie,G as ke,s as S,H as Ee,I as Pe,J as Me,K as Le,L as Te,M as Ce}from"./controls_v3-DnInW25W.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";let x=0,O=0,q=0,j=0;const Ae=50,T=30;function Fe(){const e=document.getElementById("appOverlay");e&&(e.addEventListener("touchstart",Be,{passive:!0}),e.addEventListener("touchend",ze,{passive:!0}),console.log("[Mobile] Swipe gestures initialized"))}function Be(e){const t=e.touches[0];x=t.clientX,O=t.clientY}function ze(e){const t=e.changedTouches[0];q=t.clientX,j=t.clientY,Ue()}function Ue(){const e=q-x,t=j-O,o=window.innerWidth;if(Math.abs(e)<Math.abs(t)||Math.abs(e)<Ae)return;const i=P.leftPanel||document.getElementById("leftPanel"),n=P.rightPanel||document.getElementById("rightPanel");e>0?x<T?i&&(i.classList.remove("-translate-x-full"),h(),console.log("[Swipe] Opening presets panel")):n&&!n.classList.contains("translate-x-full")&&(n.classList.add("translate-x-full"),document.body.classList.remove("right-panel-open"),h(),console.log("[Swipe] Closing mixer panel")):e<0&&(x>o-T?n&&(n.classList.remove("translate-x-full"),document.body.classList.add("right-panel-open"),h(),console.log("[Swipe] Opening mixer panel")):i&&!i.classList.contains("-translate-x-full")&&(i.classList.add("-translate-x-full"),h(),console.log("[Swipe] Closing presets panel")))}class $e{constructor(){this.queue=[],this.isProcessing=!1,this.currentFlow=null}enqueue(t,o,i=10){this.queue.some(n=>n.id===t)||(this.queue.push({id:t,fn:o,priority:i}),this.queue.sort((n,a)=>a.priority-n.priority),console.log(`[ModalManager] Enqueued flow: ${t} (priority: ${i})`),this.process())}async process(){if(this.isProcessing||this.queue.length===0)return;this.isProcessing=!0;const t=this.queue.shift();this.currentFlow=t.id,console.log(`[ModalManager] Processing flow: ${t.id}`);try{await t.fn()}catch(o){console.error(`[ModalManager] Error in flow ${t.id}:`,o)}this.isProcessing=!1,this.currentFlow=null,setTimeout(()=>this.process(),500)}}const I=new $e;window.modalFlowManager=I;const V="mindwave_exit_intent_shown",k="mindwave_session_id";let C=!1;function Re(){if("ontouchstart"in window)return;const e=sessionStorage.getItem(k)||Date.now().toString();sessionStorage.setItem(k,e),!sessionStorage.getItem(`${V}_${e}`)&&setTimeout(()=>{document.addEventListener("mouseout",H)},1e4)}function H(e){if(e.clientY>50||C||localStorage.getItem("mindwave_premium")==="true")return;Ne(),C=!0;const t=sessionStorage.getItem(k);sessionStorage.setItem(`${V}_${t}`,"true"),document.removeEventListener("mouseout",H)}function Ne(){if(document.getElementById("exitIntentModal"))return;const e=Q("exit_intent_offer");console.log("[ExitIntent] Showing variant:",e);const t={"50_percent":{emoji:"🎁",title:"Wait! Don't Leave Empty-Handed",subtitle:'Get <span style="color: #10b981; font-weight: 700;">50% off</span> your first month of MindWave Premium',badge:'<div style="font-size: 32px; font-weight: 800; color: white;">$4.99</div><div style="font-size: 12px; color: rgba(255,255,255,0.8);"><s>$9.99</s> First Month</div>',cta:"Claim 50% Off Now",dismiss:"No thanks, I'll pay full price later"},"7_day_trial":{emoji:"🚀",title:"Try MindWave PRO Free",subtitle:'Get <span style="color: #8b5cf6; font-weight: 700;">7 days free</span> to unlock all brainwave frequencies',badge:'<div style="font-size: 32px; font-weight: 800; color: white;">7 Days</div><div style="font-size: 12px; color: rgba(255,255,255,0.8);">Completely Free</div>',cta:"Start Free Trial",dismiss:"Maybe later"},countdown:{emoji:"⏰",title:"Special Offer Expiring Soon",subtitle:"This deal disappears when the timer hits zero",badge:'<div id="exitCountdown" style="font-size: 32px; font-weight: 800; color: white; font-family: monospace;">14:59</div><div style="font-size: 12px; color: rgba(255,255,255,0.8);">Time Remaining</div>',cta:"Claim Before It Expires",dismiss:"I don't mind paying more"}},o=t[e]||t["50_percent"],i=e==="7_day_trial"?"#8b5cf6":"#10b981",n=e==="7_day_trial"?"linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(15, 23, 42, 0.98))":"linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.98))",a=e==="7_day_trial"?"#8b5cf6":"#10b981",s=document.createElement("div");if(s.id="exitIntentModal",s.className="fixed inset-0 z-[9999] flex items-center justify-center p-4",s.style.cssText=`
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease;
    `,s.innerHTML=`
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideIn { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
            @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
        </style>
        <div style="
            max-width: 480px;
            width: 100%;
            background: ${n};
            border: 2px solid ${i};
            border-radius: 24px;
            padding: 40px 32px;
            text-align: center;
            animation: slideIn 0.4s ease;
            position: relative;
        ">
            <button id="exitIntentClose" style="
                position: absolute; top: 16px; right: 16px; width: 32px; height: 32px;
                border-radius: 50%; background: rgba(255, 255, 255, 0.1); border: none;
                color: white; font-size: 18px; cursor: pointer; display: flex;
                align-items: center; justify-content: center;
            ">×</button>
            
            <div style="font-size: 64px; margin-bottom: 16px;">${o.emoji}</div>
            <h2 style="font-size: 28px; font-weight: 700; color: white; margin-bottom: 12px;">${o.title}</h2>
            <p style="font-size: 16px; color: #94a3b8; margin-bottom: 24px; line-height: 1.5;">${o.subtitle}</p>
            
            <div style="display: inline-block; background: linear-gradient(135deg, ${a}, ${a}cc); padding: 12px 24px; border-radius: 12px; margin-bottom: 24px;">
                ${o.badge}
            </div>
            
            <div style="text-align: left; background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: white; font-size: 14px;">
                    <span style="color: ${a};">✓</span> Unlimited access to all brainwaves
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: white; font-size: 14px;">
                    <span style="color: ${a};">✓</span> All 8 premium visualizers
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: white; font-size: 14px;">
                    <span style="color: ${a};">✓</span> Cancel anytime, no questions asked
                </div>
            </div>
            
            <button id="exitIntentCta" style="
                width: 100%; padding: 16px; background: ${a}; border: none;
                border-radius: 12px; color: white; font-size: 16px; font-weight: 700;
                cursor: pointer; transition: transform 0.2s; animation: pulse 2s infinite;
            ">${o.cta}</button>
            
            <button id="exitIntentDismiss" style="
                background: none; border: none; color: #64748b; font-size: 13px;
                margin-top: 16px; cursor: pointer;
            ">${o.dismiss}</button>
        </div>
    `,document.body.appendChild(s),e==="countdown"){let r=899;const l=s.querySelector("#exitCountdown"),d=setInterval(()=>{if(r--,r<=0){clearInterval(d);return}const g=Math.floor(r/60),m=r%60;l&&(l.textContent=`${g}:${m.toString().padStart(2,"0")}`)},1e3)}document.body.appendChild(s),s.querySelector("#exitIntentClose").addEventListener("click",f),s.querySelector("#exitIntentDismiss").addEventListener("click",f),s.querySelector("#exitIntentCta").addEventListener("click",()=>{ee("exit_intent_offer","cta_click",{variant:e}),localStorage.setItem("mindwave_discount_code","EXIT50"),f(),window.showPricingModal&&window.showPricingModal()}),s.addEventListener("click",r=>{r.target===s&&f()}),document.addEventListener("keydown",function r(l){l.key==="Escape"&&(f(),document.removeEventListener("keydown",r))})}function f(){const e=document.getElementById("exitIntentModal");e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}const E="mindwave_user_intent";function De(e){if(localStorage.getItem(E)){e&&e(localStorage.getItem(E));return}Oe(e)}function Oe(e){const t=document.createElement("div");t.id="intentSurveyModal",t.className="fixed inset-0 z-[2000000] flex items-center justify-center animate-[fade-in_0.3s_ease] bg-black/60 backdrop-blur-sm pointer-events-auto",t.style.zIndex="2000000",t.innerHTML=`
        <style>
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scale-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .intent-card:hover { border-color: var(--accent) !important; background: rgba(255,255,255,0.1) !important; transform: translateY(-2px); }
            .survey-popup {
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(40px) saturate(160%);
                -webkit-backdrop-filter: blur(40px) saturate(160%);
                border: 2px solid rgba(255,255,255,0.15);
                box-shadow: 0 60px 120px -30px rgba(0,0,0,0.9), 0 0 50px rgba(45, 212, 191, 0.1);
                overflow-y: auto;
                pointer-events: auto !important;
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                margin: 20px;
                max-width: 90vw;
                max-height: 90vh;
            }
            .intent-card { cursor: pointer !important; pointer-events: auto !important; }
            .survey-popup::-webkit-scrollbar { width: 4px; }
            .survey-popup::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
            @media (max-height: 600px) {
                .survey-popup { py-8; }
                .survey-popup h2 { font-size: 1.5rem; margin-bottom: 1rem; }
                .survey-popup p { margin-bottom: 1rem; }
                .intent-card { p-4; }
            }
        </style>
        
        <div class="survey-popup max-w-2xl w-full text-center py-16 px-8 md:px-14 rounded-[2.5rem] animate-[scale-up_0.5s_cubic-bezier(0.16, 1, 0.3, 1)]">
            <h2 class="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">What is your focus?</h2>
            <p class="text-slate-400 mb-8 text-base md:text-lg font-medium">Personalize your sessions</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full">
                <button class="intent-card group glass-card p-6 md:p-8 rounded-2xl border-2 border-white/10 transition-all text-center flex flex-col items-center justify-center bg-white/5" data-intent="focus">
                    <div class="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                    <div class="text-lg font-bold text-white mb-1">Focus</div>
                    <div class="text-[10px] uppercase font-black text-teal-400 tracking-widest">Productivity</div>
                </button>
                
                <button class="intent-card group glass-card p-6 md:p-8 rounded-2xl border-2 border-white/10 transition-all text-center flex flex-col items-center justify-center bg-white/5" data-intent="sleep">
                    <div class="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">🌙</div>
                    <div class="text-lg font-bold text-white mb-1">Sleep</div>
                    <div class="text-[10px] uppercase font-black text-indigo-400 tracking-widest">Recovery</div>
                </button>
                
                <button class="intent-card group glass-card p-6 md:p-8 rounded-2xl border-2 border-white/10 transition-all text-center flex flex-col items-center justify-center bg-white/5" data-intent="relax">
                    <div class="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
                    <div class="text-lg font-bold text-white mb-1">Relax</div>
                    <div class="text-[10px] uppercase font-black text-emerald-400 tracking-widest">Anxiety</div>
                </button>
            </div>
            
            <button id="skipIntent" class="mt-8 text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-[0.4em] pointer-events-auto cursor-pointer">I just want to explore</button>
        </div>
    `,document.body.appendChild(t);const o=t.querySelector(".survey-popup");F(o);const i=()=>F(o);window.addEventListener("resize",i),window.addEventListener("mindwave:layout-change",i),t.querySelectorAll(".intent-card").forEach(a=>{a.onclick=s=>{s.preventDefault(),s.stopPropagation(),console.log("[Intent Survey] Clicked Intent:",a.dataset.intent),A(i),B(a.dataset.intent,e)}});const n=document.getElementById("skipIntent");n&&(n.onclick=a=>{a.preventDefault(),a.stopPropagation(),console.log("[Intent Survey] Clicked Skip"),A(i),B("explore",e)})}function A(e){window.removeEventListener("resize",e),window.removeEventListener("mindwave:layout-change",e)}function F(e){if(!e)return;e.style.maxWidth="min(90vw, 700px)",e.style.maxHeight="min(90vh, 800px)",e.style.transform="none";const t=window.innerWidth,o=window.innerHeight,i=Math.min(1,o/700,t/600);i<.9?e.style.fontSize=`${Math.max(.7,i)*100}%`:e.style.fontSize=""}function B(e,t){localStorage.setItem(E,e);const o=document.getElementById("intentSurveyModal");o&&(o.style.opacity="0",setTimeout(()=>{o.remove(),t&&t(e)},300))}const z=["Sarah J.","David K.","Michelle R.","Jessica M.","Alex T.","Emily W.","Chris B.","Amanda L.","Daniel H.","Rachel P.","Julian S.","Hiroshi M.","Elena G.","Marcus V.","Sasha L.","Kevin D.","Sofia Z.","Liam O.","Maya C.","Noah W."],U=["New York","London","San Francisco","Austin","Berlin","Tokyo","Sydney","Toronto","Paris","Singapore"],$=[{text:"joined Zen",premium:!0,icon:"⚡"},{text:"unlocked Eternity Access",premium:!0,icon:"🔥"},{text:"is in Deep Focus mode",premium:!1,icon:"🧠"},{text:"is meditating with Theta waves",premium:!1,icon:"🧘"},{text:"is manifestating in Alpha state",premium:!1,icon:"🍃"},{text:"unlocked Nirvana",premium:!0,icon:"💎"},{text:"started a 30-Day Journey",premium:!1,icon:"🚀"}];function qe(){setTimeout(W,5e3)}function W(){const e=Math.random()*3e4+15e3;setTimeout(()=>{je(),W()},e)}function je(){if([document.getElementById("pricingModal"),document.getElementById("authModal"),document.getElementById("profileModal"),document.getElementById("journeyModal"),document.getElementById("upgradePromptModal"),document.querySelector(".modal:not(.hidden)")].filter(l=>l&&!l.classList.contains("hidden")).length>0)return;const t=z[Math.floor(Math.random()*z.length)],o=U[Math.floor(Math.random()*U.length)],i=$[Math.floor(Math.random()*$.length)],n=Math.floor(Math.random()*10)+1,a=document.createElement("div");a.className="social-proof-toast";const s=i.premium?"rgba(250, 204, 21, 0.4)":"rgba(255, 255, 255, 0.1)",r=i.premium?"0 10px 30px -5px rgba(250, 204, 21, 0.2)":"0 10px 25px -5px rgba(0, 0, 0, 0.5)";a.style.cssText=`
        position: fixed;
        bottom: 24px;
        left: 24px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(12px);
        border: 1px solid ${s};
        padding: 12px 16px;
        border-radius: 16px;
        color: white;
        font-family: 'Inter', system-ui, sans-serif;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: ${r};
        transform: translateX(-120%);
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: auto;
        min-width: 260px;
    `,a.innerHTML=`
        <div style="width: 40px; height: 40px; background: ${i.premium?"linear-gradient(135deg, #facc15, #eab308)":"linear-gradient(135deg, #2dd4bf, #3b82f6)"}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
            ${i.icon}
        </div>
        <div>
            <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">${t} from ${o}</div>
            <div style="font-size: 11px; color: ${i.premium?"#fde047":"#94a3b8"}; line-height: 1.4;">${i.text}</div>
            <div style="font-size: 9px; color: #64748b; margin-top: 2px;">${n} min ago</div>
        </div>
    `,document.body.appendChild(a),requestAnimationFrame(()=>{a.style.transform="translateX(0)"}),setTimeout(()=>{a.style.transform="translateX(-120%)",setTimeout(()=>a.remove(),800)},6e3)}const y={"auth/invalid-email":"Please enter a valid email address.","auth/user-disabled":"This account has been disabled. Please contact support.","auth/user-not-found":"No account found with this email. Please sign up first.","auth/wrong-password":"Incorrect password. Please try again or reset your password.","auth/email-already-in-use":"An account with this email already exists. Please sign in instead.","auth/weak-password":"Password should be at least 6 characters long.","auth/too-many-requests":"Too many attempts. Please wait a few minutes and try again.","auth/network-request-failed":"Network error. Please check your connection and try again.","auth/requires-recent-login":"For security, please sign out and sign in again to make this change.","permission-denied":"You don't have permission to perform this action.","not-found":"The requested item was not found.","already-exists":"This item already exists.","resource-exhausted":"You have exceeded the free tier limit. Please upgrade.","storage/unauthorized":"You don't have permission to upload files.","storage/object-not-found":"File not found.","storage/quota-exceeded":"Storage quota exceeded. Please upgrade or delete some files.",default:"Something went wrong. Please try again."};function Y(e,t="Action",o=null){console.error(`[${t}] Error:`,e);let i=y.default;if(e.code){const n=e.code.replace("Firebase: ","").replace("Error (","").replace(")","");i=y[n]||y.default}else if(e.message){const n=e.message.toLowerCase();for(const[a,s]of Object.entries(y))if(n.includes(a.toLowerCase())){i=s;break}}return o&&typeof o=="function"&&o(`${t} failed: ${i}`,"error"),i}const _={};function J(e,t){const o=`${t}:${(e==null?void 0:e.code)||(e==null?void 0:e.message)||"unknown"}`;_[o]=(_[o]||0)+1,!(_[o]>3)&&(window.gtag&&window.gtag("event","exception",{description:`[${t}] ${(e==null?void 0:e.code)||(e==null?void 0:e.message)||"Unknown error"}`,fatal:!1}),console.warn(`[ErrorHandler] ${t}:`,(e==null?void 0:e.code)||(e==null?void 0:e.message)))}const R={freePresets:["delta","beta"],maxJourneyLessons:1};async function Ve(e,t){let o;try{if(o=(await u(()=>import("./controls_v3-DnInW25W.js").then(a=>a.S),[])).auth,!o)return console.warn("[Paywall] Firebase not initialized yet, allowing access temporarily"),{allowed:!0}}catch(n){return console.warn("[Paywall] Could not load Firebase, allowing access:",n),{allowed:!0}}if(!o.currentUser)return{allowed:!1,reason:"not_logged_in"};if(await te())return{allowed:!0};switch(e){case"preset":return R.freePresets.includes(t)?{allowed:!0}:{allowed:!1,reason:"premium_preset"};case"journey_lesson":return parseInt(t)<=R.maxJourneyLessons?{allowed:!0}:{allowed:!1,reason:"premium_lesson"};case"export":return{allowed:!1,reason:"premium_feature"};case"advanced":return{allowed:!1,reason:"premium_feature"};default:return{allowed:!0}}}function He(e,t=null){var m;window.trackPaywallShown&&window.trackPaywallShown(e,e);const o={premium_preset:{title:"🔒 Unlock Zen",description:"This wave is reserved for Zen members. Join the first 500 to lock in $19.99/mo forever.",cta:"Join & Unlock"},premium_lesson:{title:"🧘 Continue Your Journey",description:"Unlock the full 30-day program with Zen.",cta:"Join & Unlock"},premium_feature:{title:"✨ Premium Feature",description:"Upgrade to Zen to access advanced tools.",cta:"Go Premium"},not_logged_in:{title:"🔐 Sign In Required",description:"Create a free account to get started.",cta:"Sign In"}},i=o[e]||o.premium_feature;let n=document.getElementById("upgradePromptModal");n||(n=document.createElement("div"),n.id="upgradePromptModal",n.className="fixed inset-0 flex items-center justify-center p-4 hidden",n.style.background="rgba(0, 0, 0, 0.9)",n.style.backdropFilter="blur(20px)",n.style.zIndex="1000",n.innerHTML=`
      <div style="max-width: 500px; width: 100%; background: linear-gradient(180deg, rgba(25, 25, 40, 0.98) 0%, rgba(15, 15, 26, 0.98) 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 48px 32px; text-align: center;">
        <div style="font-size: 64px; margin-bottom: 24px;" id="upgradeIcon">🔒</div>
        <h2 id="upgradeTitle" style="font-size: 32px; font-weight: 700; color: var(--accent); margin-bottom: 16px;">Premium Feature</h2>
        <p id="upgradeDescription" style="font-size: 16px; color: var(--text-muted); margin-bottom: 32px; line-height: 1.6;">Upgrade to unlock this feature.</p>
        
        <div style="display: flex; gap: 12px;">
          <button id="upgradeBtn" style="flex: 1; padding: 16px; background: var(--accent); border: none; border-radius: 12px; color: var(--bg-main); font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s;">
            Upgrade Now
          </button>
          <button id="closeUpgradeBtn" style="flex: 0.5; padding: 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; color: var(--text-muted); font-size: 16px; font-weight: 600; cursor: pointer;">
            Later
          </button>
        </div>
      </div>
    `,document.body.appendChild(n)),n.dataset.currentReason=e;const a=n.querySelector("#upgradeIcon"),s=n.querySelector("#upgradeTitle"),r=n.querySelector("#upgradeDescription"),l=n.querySelector("#upgradeBtn");a.textContent=((m=i.title.match(/[\u{1F300}-\u{1F9FF}]/u))==null?void 0:m[0])||"✨",s.textContent=i.title.replace(/[\u{1F300}-\u{1F9FF}]/gu,"").trim(),r.textContent=i.description,l.textContent=i.cta;const d=n.querySelector("#upgradeBtn"),g=n.querySelector("#closeUpgradeBtn");d.onclick=c=>{console.log("[Paywall] Upgrade button clicked, reason:",n.dataset.currentReason),c.stopPropagation();try{n.classList.remove("flex"),n.classList.add("hidden"),n.dataset.currentReason==="not_logged_in"?(console.log("[Paywall] Opening auth modal..."),window.openAuthModal?window.openAuthModal():(console.error("[Paywall] window.openAuthModal not found!"),alert("Please sign in to continue"))):(console.log("[Paywall] Opening pricing modal..."),window.showPricingModal?window.showPricingModal():(console.error("[Paywall] window.showPricingModal not found!"),alert("Premium feature - please upgrade")))}catch(p){console.error("[Paywall] Error in upgrade button handler:",p)}},g.onclick=c=>{console.log("[Paywall] Later button clicked"),c.stopPropagation();try{n.classList.remove("flex"),n.classList.add("hidden")}catch(p){console.error("[Paywall] Error closing upgrade modal:",p)}},n.onclick=c=>{if(c.target===n){console.log("[Paywall] Background clicked, closing modal"),c.stopPropagation();try{n.classList.remove("flex"),n.classList.add("hidden")}catch(p){console.error("[Paywall] Error closing modal on background click:",p)}}},n.classList.remove("hidden"),n.classList.add("flex")}function We(){console.log("[Paywall] Initialized"),window.canAccessFeature=Ve,window.showUpgradePrompt=He}const b={AFTER_FIRST_SESSION:"after_first_session",AFTER_THIRD_SESSION:"after_third_session",AFTER_WEEK:"after_week",MANUAL:"manual"};function v(e=b.MANUAL){const t=localStorage.getItem("mindwave_last_survey"),o=t?(Date.now()-parseInt(t))/(1e3*60*60*24):999;if(e!==b.MANUAL&&o<7){console.log("[Survey] Skipping - surveyed recently");return}const i=Ye(e);document.body.appendChild(i),window.trackFeatureUse&&window.trackFeatureUse("survey_shown",e)}function Ye(e){const t=document.createElement("div");return t.id="feedbackSurveyModal",t.className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md opacity-0 transition-opacity duration-300 survey-contrast-fix",setTimeout(()=>t.classList.remove("opacity-0"),10),t.innerHTML=`
        <div class="glass-card w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6 md:p-10 rounded-3xl relative flex flex-col gap-6 shadow-2xl border border-white/10">
            
            <!-- Close Button -->
            <button id="closeSurveyBtn" class="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <!-- Header -->
            <div class="text-center space-y-2 mt-2">
                <div class="text-5xl mb-4 animate-bounce-subtle">💫</div>
                <h2 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    Help Us Improve
                </h2>
                <p class="text-sm text-[var(--text-muted)]">
                    Your feedback shapes the future of MindWave
                </p>
            </div>

            <!-- Survey Form -->
            <form id="feedbackSurveyForm" class="flex flex-col gap-8">
                
                <!-- Question 1: NPS Score -->
                <div class="space-y-3">
                    <label class="block text-sm font-bold text-white">
                        How likely are you to recommend MindWave? *
                    </label>
                    <div class="flex flex-wrap gap-2 justify-center">
                        ${[0,1,2,3,4,5,6,7,8,9,10].map(o=>`
                            <button type="button" class="nps-btn w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[var(--text-muted)] font-bold hover:bg-white/10 hover:border-[var(--accent)] hover:text-white transition-all focus:outline-none" data-score="${o}">
                                ${o}
                            </button>
                        `).join("")}
                    </div>
                    <div class="flex justify-between text-[10px] uppercase tracking-wider text-[var(--text-muted)] px-2">
                        <span>Not likely</span>
                        <span>Extremely likely</span>
                    </div>
                    <input type="hidden" name="nps_score" id="nps_score" required>
                </div>

                <!-- Question 2: Experience -->
                <div class="space-y-3">
                    <label class="block text-sm font-bold text-white">
                        How would you describe your experience? *
                    </label>
                    <div class="relative">
                        <select name="experience" required class="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[var(--accent)] outline-none appearance-none cursor-pointer hover:bg-black/30 transition-all">
                            <option value="">Select an option...</option>
                            <option value="life_changing">🌟 Life-changing</option>
                            <option value="very_helpful">😊 Very helpful</option>
                            <option value="somewhat_helpful">👍 Somewhat helpful</option>
                            <option value="neutral">😐 Neutral</option>
                            <option value="disappointing">😞 Disappointing</option>
                        </select>
                        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
                    </div>
                </div>

                <!-- Question 3: Features -->
                <div class="space-y-3">
                    <label class="block text-sm font-bold text-white">
                        What feature creates the most value? *
                    </label>
                    <div class="relative">
                        <select name="best_feature" required class="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[var(--accent)] outline-none appearance-none cursor-pointer hover:bg-black/30 transition-all">
                            <option value="">Select a feature...</option>
                            <option value="binaural_beats">🎵 Binaural Beats</option>
                            <option value="visualizer">✨ Visual Meditations</option>
                            <option value="sleep_stories">😴 Sleep Stories</option>
                            <option value="journey_program">🧘 Journey Program</option>
                            <option value="custom_mixes">🎛️ Custom Mixes</option>
                            <option value="ambient_sounds">🌊 Ambient Soundscapes</option>
                        </select>
                        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
                    </div>
                </div>

                <!-- Visual Styles -->
                <div class="space-y-3">
                    <label class="block text-sm font-bold text-white">
                        What are your favorite visual styles and combinations?
                    </label>
                    <input type="text" name="favorite_visuals" placeholder="e.g. Interstellar with Gamma waves..." class="w-[100%] bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[var(--accent)] outline-none placeholder:text-white/20">
                </div>

                <!-- Improvements -->
                <div class="space-y-3">
                    <label class="block text-sm font-bold text-white">
                        What would make MindWave better?
                    </label>
                    <textarea name="improvements" rows="3" placeholder="Share your ideas..." class="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[var(--accent)] outline-none resize-none placeholder:text-white/20"></textarea>
                </div>

                <!-- Submit Button -->
                <button type="submit" id="submitSurveyBtn" class="w-full py-4 rounded-xl font-bold text-base uppercase tracking-wide bg-[var(--accent)] text-[var(--bg-main)] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[var(--accent-glow)]">
                    ✨ Submit Feedback
                </button>
                
                <p class="text-center text-xs text-[var(--text-muted)] opacity-60">
                    Thank you for your support! 🙏
                </p>
            </form>
        </div>

        <style>
            .nps-btn.selected {
                background: var(--accent) !important;
                border-color: var(--accent) !important;
                color: var(--bg-main) !important;
                box-shadow: 0 0 15px var(--accent-glow);
                transform: scale(1.05);
            }
        </style>
    `,Je(t,e),t}function Je(e,t){e.querySelector("#closeSurveyBtn").addEventListener("click",()=>{e.remove(),window.trackFeatureUse&&window.trackFeatureUse("survey_closed","dismissed")});const i=e.querySelectorAll(".nps-btn"),n=e.querySelector("#nps_score");i.forEach(r=>{r.addEventListener("click",()=>{i.forEach(l=>l.classList.remove("selected")),r.classList.add("selected"),n.value=r.dataset.score})});const a=e.querySelector("#feedbackSurveyForm"),s=e.querySelector("#submitSurveyBtn");a.addEventListener("submit",async r=>{r.preventDefault(),s.disabled=!0,s.textContent="Submitting...";try{const l=new FormData(a),d={nps_score:parseInt(l.get("nps_score")),experience:l.get("experience"),best_feature:l.get("best_feature"),use_case:l.get("use_case"),feelings:l.getAll("feelings"),favorite_visuals:l.get("favorite_visuals")||"",improvements:l.get("improvements")||"",competitors_used:l.get("competitors_used")||"",trigger_type:t,timestamp:new Date().toISOString()},g=Xe(d),m=new Promise((c,p)=>setTimeout(()=>p(new Error("Request timed out")),1e4));await Promise.race([g,m]),localStorage.setItem("mindwave_last_survey",Date.now().toString()),Ge(e),window.trackFeatureUse&&window.trackFeatureUse("survey_completed",t)}catch(l){console.error("[Survey] Submission error:",l),s.disabled=!1,s.textContent="❌ Error - Try Again",setTimeout(()=>{s.textContent="✨ Submit Feedback"},2e3)}})}async function Xe(e){var o,i,n,a;if(!M){console.warn("[Survey] Firebase not initialized, cannot submit");return}const t={...e,userId:((i=(o=L)==null?void 0:o.currentUser)==null?void 0:i.uid)||"anonymous",userEmail:((a=(n=L)==null?void 0:n.currentUser)==null?void 0:a.email)||null,createdAt:oe(),userAgent:navigator.userAgent,screenSize:`${window.innerWidth}x${window.innerHeight}`};await ne(ie(M,"feedback"),t),console.log("[Survey] Feedback submitted successfully")}function Ge(e){const t=e.querySelector("form").parentElement;t.innerHTML=`
        <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 80px; margin-bottom: 24px; animation: bounce 0.6s ease-out;">
                🙏
            </div>
            <h3 style="font-size: 28px; font-weight: 700; color: white; margin-bottom: 16px;">
                Thank You!
            </h3>
            <p style="font-size: 16px; color: rgba(255, 255, 255, 0.7); margin-bottom: 32px; line-height: 1.6;">
                Your feedback helps us create better meditation experiences for everyone.
            </p>
            <button id="closeFinalBtn" style="padding: 14px 32px; background: linear-gradient(135deg, #60a9ff 0%, #4c94ff 100%); border: none; border-radius: 12px; color: white; font-size: 15px; font-weight: 600; cursor: pointer;">
                Continue Meditation
            </button>
        </div>

        <style>
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
        </style>
    `,t.querySelector("#closeFinalBtn").addEventListener("click",()=>{e.remove()}),setTimeout(()=>{e.parentNode&&e.remove()},3e3)}function Ze(){const e=parseInt(localStorage.getItem("mindwave_session_count")||"0"),t=localStorage.getItem("mindwave_account_created");if(!t)return;const o=(Date.now()-parseInt(t))/(1e3*60*60*24);e===1&&setTimeout(()=>v(b.AFTER_FIRST_SESSION),5e3),e===3&&setTimeout(()=>v(b.AFTER_THIRD_SESSION),5e3),o>=7&&o<8&&setTimeout(()=>v(b.AFTER_WEEK),1e4)}function X(){const e=new URLSearchParams,t=document.getElementById("baseSlider"),o=document.getElementById("beatSlider"),i=document.getElementById("visualColorPicker");e.set("base",(t==null?void 0:t.value)||200),e.set("beat",(o==null?void 0:o.value)||10),e.set("mode",ae.audioMode||"binaural"),i!=null&&i.value&&e.set("color",i.value.replace("#",""));const n=parseFloat((o==null?void 0:o.value)||10);let a="custom";n<4?a="delta":n<8?a="theta":n<14?a="alpha":n<30?a="beta":n<50?a="gamma":a="hypergamma",e.set("preset",a);const s=new URL(window.location.origin+window.location.pathname);return s.search=e.toString(),s.toString()}function G(){const e=new URLSearchParams(window.location.search);if(!e.has("base")&&!e.has("beat")&&!e.has("preset"))return null;const t={base:parseInt(e.get("base"))||200,beat:parseFloat(e.get("beat"))||10,mode:e.get("mode")||"binaural",color:e.get("color")?"#"+e.get("color"):null,presetName:e.get("preset")||"custom"};return console.log("[Share] Loaded shared preset:",t),t}function Z(e){if(!e)return;const t=document.getElementById("baseSlider"),o=document.getElementById("beatSlider"),i=document.getElementById("baseValue"),n=document.getElementById("beatValue"),a=document.getElementById("visualColorPicker"),s=document.getElementById("colorPreview");t&&(t.value=e.base,i&&(i.textContent=e.base+" Hz")),o&&(o.value=e.beat,n&&(n.textContent=e.beat+" Hz")),e.color&&a&&(a.value=e.color,s&&(s.style.backgroundColor=e.color));const r=document.createElement("div");r.style.cssText=`
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 12px 24px;
        border-radius: 12px;
        color: var(--text-main);
        font-size: 14px;
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `,r.textContent=`🎵 Shared preset loaded: ${e.presetName}`,document.body.appendChild(r),setTimeout(()=>r.remove(),3e3),window.history.replaceState({},"",window.location.pathname)}async function K(){const e=X();try{return await navigator.clipboard.writeText(e),{success:!0,url:e}}catch{const o=document.createElement("textarea");return o.value=e,o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),{success:!0,url:e}}}function Ke(e){return console.log("[Share] QR code generation would use:",e),null}function Qe(){try{const e=G();e&&setTimeout(()=>Z(e),500)}catch(e){console.warn("[Share] Initialization error:",e)}}const et=Object.freeze(Object.defineProperty({__proto__:null,applySharedPreset:Z,copyShareLink:K,generateQRCode:Ke,generateShareableURL:X,initShareFeature:Qe,parseSharedPreset:G},Symbol.toStringTag,{value:"Module"}));window.NUCLEAR_MAIN_LOADED=!0;const w={onboarding:()=>u(()=>import("./onboarding-BE1OTPs_.js"),[]),pwa:()=>u(()=>import("./pwa-install-BB-DURYK.js"),__vite__mapDeps([0,1])),presence:()=>u(()=>import("./controls_v3-DnInW25W.js").then(e=>e.$),[]),cursor:()=>u(()=>import("./cursor-pIy7q_O4.js"),__vite__mapDeps([2,1])),share:()=>u(()=>Promise.resolve().then(()=>et),void 0),email:()=>u(()=>import("./email-capture-C8FpYIZi.js"),__vite__mapDeps([3,1])),haptics:()=>u(()=>import("./controls_v3-DnInW25W.js").then(e=>e.U),[])};window.showFeedbackSurvey=v;window.trackSignup=se;window.trackLogin=re;window.trackBeginCheckout=le;window.trackPurchase=ce;window.trackFeatureUse=de;window.startOnboarding=async(e=!1)=>{const{initializeOnboarding:t}=await w.onboarding();t(e)};window.startTutorial=()=>window.startOnboarding(!0);window.trackSessionStart=ue;window.trackSessionEnd=pe;window.trackPaywallShown=me;window.trackUpgradeClick=ge;window.setUserProperties=fe;window.setMasterVolume=we;window.setBeatsVolume=be;window.setAtmosVolume=he;window.onerror=(e,t,o,i,n)=>{Y(n||new Error(e),"Uncaught"),J(n||new Error(e),`${t}:${o}:${i}`)};window.onunhandledrejection=e=>{Y(e.reason||new Error("Unhandled rejection"),"Promise"),J(e.reason||new Error("Unhandled rejection"),"UnhandledPromise")};const N=()=>{if(console.time("InitApp"),console.log("[Main] InitApp Calling - Initializing UI..."),window.APP_INITIALIZED)return;window.APP_INITIALIZED=!0,ye(),Re(),localStorage.getItem("mindwave_onboarding_complete_v5")||I.enqueue("intent_survey",()=>new Promise(o=>{const i=()=>{localStorage.getItem("mindwave_disclaimer_accepted")==="true"?setTimeout(()=>{De(n=>{console.log("[Main] User intent captured:",n),n&&n!=="explore"&&Ce(n),startOnboarding(!0,n),o()})},1e3):(Me(),setTimeout(i,1e3))};i()}),20),ot(),console.log("[Main] Mindwave Core v101 Initialized.");try{xe(),ve(),nt(),tt(),We(),Se(),_e(),Ie(),localStorage.getItem("mindwave_premium")!=="true"&&qe(),ke().then(o=>{console.log(`[Main] ${o.length} cloud presets loaded.`)})}catch(o){console.warn("[Main] Firebase/Auth/Analytics Init Failed:",o)}console.log("[Main] Attempting setupUI()..."),typeof S=="function"?(console.log("[Main] setupUI is a function, calling now."),console.time("setupUI_Total"),S(),console.timeEnd("setupUI_Total")):typeof window.setupUI=="function"?(console.warn("[Main] setupUI not in scope but found on window. Calling fallback."),window.setupUI()):console.error("[Main] setupUI is NOT A FUNCTION! Type:",typeof S),w.haptics().then(o=>o.initHaptics()),Fe(),console.timeEnd("InitApp"),Ee(),w.cursor().then(o=>o.initCursor()),I.enqueue("email_capture",()=>new Promise(o=>{setTimeout(()=>{w.email().then(i=>i.initEmailCapture()),o()},6e4)}),10),w.pwa().then(o=>o.initPWAInstall());const t=document.getElementById("loadingScreen");t&&(console.log("[Main] Removing loading screen immediately (Time: "+performance.now().toFixed(0)+"ms)"),t.style.opacity="0",t.style.pointerEvents="none",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},500)),console.log("[Main] Core UI Ready - Loading content modules..."),requestIdleCallback?requestIdleCallback(D):setTimeout(D,100),Pe(),setTimeout(()=>Ze(),15e3),window.shareCurrentPreset=async()=>{if((await K()).success){const i=document.createElement("div");i.style.cssText="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--accent);color:#0f172a;padding:12px 24px;border-radius:12px;font-size:12px;font-weight:bold;z-index:9999;box-shadow:0 0 20px rgba(96,169,255,0.4);",i.textContent="🔗 Share link copied!",document.body.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transition="opacity 0.3s ease",setTimeout(()=>i.remove(),300)},3e3)}}};function tt(){const e=()=>{const t=!navigator.onLine;document.body.classList.toggle("is-offline",t);const o=document.getElementById("offlineIndicator");o&&(o.classList.toggle("hidden",!t),o.classList.toggle("flex",t)),console.log(t?"[Connectivity] App is OFFLINE - Switching to Cache Mode":"[Connectivity] App is ONLINE")};window.addEventListener("online",e),window.addEventListener("offline",e),e()}const ot=()=>{let e=parseInt(localStorage.getItem("mindwave_session_count")||"0");e++,localStorage.setItem("mindwave_session_count",e),localStorage.setItem("mindwave_last_session",Date.now()),console.log(`[Intelligence] Session #${e} starting.`),setTimeout(()=>{if((e===5||e===10)&&console.log("[Intelligence] Milestone hit: Prompting referral."),e>=3&&localStorage.getItem("mindwave_premium")!=="true"){const t=parseInt(localStorage.getItem("mindwave_last_nag")||"0"),o=24*60*60*1e3;Date.now()-t>o&&(console.log("[Intelligence] Retention trigger: Soft-prompting upgrade."),localStorage.setItem("mindwave_last_nag",Date.now()))}},3e4)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",N):N();async function D(){try{const[e,t,o,i]=await Promise.all([u(()=>import("./controls_v3-DnInW25W.js").then(c=>c.X),[]),u(()=>import("./controls_v3-DnInW25W.js").then(c=>c.Y),[]),u(()=>import("./journey-DJS0BsZx.js"),__vite__mapDeps([4,1])),u(()=>import("./controls_v3-DnInW25W.js").then(c=>c.Z),[])]);e.initStoryPlayer();const n=document.getElementById("storyContainer");n&&e.renderStoryCards(n);const a=document.getElementById("storyVolumeSlider"),s=document.getElementById("storyVolumeValue");a&&a.addEventListener("input",c=>{const p=parseFloat(c.target.value);e.setStoryVolume(p),s&&(s.textContent=Math.round(p*100)+"%")});const r=document.getElementById("stopStoryBtn");r&&r.addEventListener("click",e.stopStory),console.log("[Main] Initializing Classical..."),i.initClassical(),console.log("[Main] Classical initialized successfully"),await t.initAudioLibrary(),t.setupUploadHandler(),o.initJourney();const l=document.getElementById("journeyBtn"),d=document.getElementById("journeyModal"),g=document.getElementById("closeJourneyBtn"),m=document.getElementById("journeyContainer");l&&d&&l.addEventListener("click",()=>{d.classList.remove("hidden"),m&&o.renderJourneyUI(m)}),g&&d&&(g.addEventListener("click",()=>{d.classList.add("hidden")}),d.addEventListener("click",c=>{c.target===d&&d.classList.add("hidden")})),console.log("[Main] Content modules loaded successfully")}catch(e){console.warn("[Main] Content module loading failed:",e)}}function nt(){const e=document.getElementById("presenceText");e&&(Le(),Te(t=>{const o=t.total||0,i=o===1?"1 Mind Active":`${o} Minds Active`;e.textContent=i,e.classList.add("text-white/80"),e.classList.remove("text-white/50");const n=document.getElementById("presenceCounter");if(n){const a=Object.entries(t.byPreset).map(([s,r])=>`${s}: ${r}`).join(" | ");a&&(n.title=`Pulse: ${a}`)}}),console.log("[Presence] Pulse initialized"))}
