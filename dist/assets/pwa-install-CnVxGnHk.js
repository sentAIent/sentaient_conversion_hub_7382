const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/bootloader-C4M82EBM.js","assets/preload-helper-CS1eXPs2.js","assets/bootloader-CqfXA-ev.css"])))=>i.map(i=>d[i]);
import{_ as m}from"./preload-helper-CS1eXPs2.js";import{o as u}from"./bootloader-C4M82EBM.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";let n=null,d=!1;const c="mindwave_install_declined",l="mindwave_installed";async function v(){const{registerAuthCallback:e}=await m(async()=>{const{registerAuthCallback:i}=await import("./bootloader-C4M82EBM.js").then(s=>s.aQ);return{registerAuthCallback:i}},__vite__mapDeps([0,1,2]));if(e(async i=>{const s=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone;let r=!1;try{navigator.onLine?i&&(r=await u()):localStorage.getItem("mindwave_premium")==="true"&&(r=!0)}catch(t){t.message&&t.message.includes("offline")}if(s)if(r){const t=document.getElementById("pwaLockScreen");t&&t.remove()}else{w();return}if(r&&!s&&!document.querySelector('link[rel="manifest"]')){const t=document.createElement("link");t.rel="manifest",t.href="manifest.json",document.head.appendChild(t)}}),localStorage.getItem(l))return;const a=document.getElementById("installBtn");a&&(a.classList.remove("hidden"),a.addEventListener("click",async()=>{if(n){n.prompt();const{outcome:i}=await n.userChoice;n=null,i==="accepted"&&(localStorage.setItem(l,"true"),a.classList.add("hidden"))}}));const o=localStorage.getItem(c);o&&(Date.now()-parseInt(o))/864e5<7||(window.addEventListener("beforeinstallprompt",i=>{i.preventDefault(),n=i,setTimeout(f,3e4)}),window.addEventListener("appinstalled",()=>{localStorage.setItem(l,"true"),p(),g("✅ MindWave installed! Find it on your home screen.","success")}))}function f(){if(!n||d)return;d=!0;const e=document.createElement("div");e.id="pwaInstallBanner",e.style.cssText=`
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        background: linear-gradient(135deg, #1e293b, #0f172a);
        border: 1px solid #10b981;
        border-radius: 16px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        max-width: 400px;
        width: calc(100% - 32px);
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        animation: slideUp 0.3s ease;
    `,e.innerHTML=`
        <style>
            @keyframes slideUp { from { transform: translateX(-50%) translateY(100px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
        </style>
        <div style="
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            flex-shrink: 0;
        ">🧘</div>
        <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 600; color: white; font-size: 14px;">Install MindWave</div>
            <div style="color: #94a3b8; font-size: 12px; margin-top: 2px;">Quick access from your home screen</div>
        </div>
        <button id="pwaInstallBtn" style="
            background: #10b981;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
            flex-shrink: 0;
        ">Install</button>
        <button id="pwaCloseBtn" style="
            background: transparent;
            border: none;
            color: #64748b;
            font-size: 20px;
            cursor: pointer;
            padding: 4px;
        ">×</button>
    `,document.body.appendChild(e),document.getElementById("pwaInstallBtn").addEventListener("click",async()=>{if(!n)return;n.prompt();const{outcome:a}=await n.userChoice;a==="accepted"?localStorage.setItem(l,"true"):localStorage.setItem(c,Date.now().toString()),n=null,e.remove()}),document.getElementById("pwaCloseBtn").addEventListener("click",()=>{localStorage.setItem(c,Date.now().toString()),p()})}function p(){const e=document.getElementById("pwaInstallBanner");e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}function g(e,a){if(window.showToast){window.showToast(e,a);return}const o=document.createElement("div");o.style.cssText=`
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 100px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    `,o.textContent=e,document.body.appendChild(o),setTimeout(()=>{o.style.opacity="0",o.style.transition="opacity 0.3s",setTimeout(()=>o.remove(),300)},3e3)}function w(){if(document.getElementById("pwaLockScreen"))return;const e=document.createElement("div");e.id="pwaLockScreen",e.style.cssText=`
        position: fixed; inset: 0; z-index: 999999; 
        background: #0f172a; display: flex; flex-direction: column; 
        align-items: center; justify-content: center; padding: 24px; text-align: center;
    `,e.innerHTML=`
        <div style="font-size: 64px; margin-bottom: 24px;">🔒</div>
        <h2 style="color: white; font-size: 28px; margin-bottom: 16px; font-weight: 700;">App Lock Enabled</h2>
        <p style="color: #94a3b8; font-size: 16px; margin-bottom: 32px; max-width: 400px; line-height: 1.6;">
            The MindWave Downloadable App is exclusive to <b>Lifetime Members</b>.<br><br>
            Your current subscription does not include app access. Please return to the web version or upgrade to unlock.
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
            <button onclick="window.location.href='https://mindwave.com'" style="background: rgba(255,255,255,0.1); color: white; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 600; cursor: pointer;">Open Web Version</button>
            <button onclick="
                const lock = document.getElementById('pwaLockScreen');
                if (lock) lock.style.display = 'none'; // Temporarily hide to show modal
                if(window.showPricingModal) window.showPricingModal();
            " style="background: #10b981; color: white; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">Upgrade to Unlock</button>
        </div>
        <div style="margin-top: 24px;">
            <button onclick="
                const lock = document.getElementById('pwaLockScreen');
                if (lock) lock.style.display = 'none'; // Temporarily hide lock
                if (window.openAuthModal) {
                    window.openAuthModal();
                } else {
                    alert('Login module initializing...');
                    if (lock) lock.style.display = 'flex';
                }
            " style="background: none; border: none; color: #38bdf8; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: underline;">Already upgraded? Log In</button>
        </div>
    `,document.body.appendChild(e)}export{v as initPWAInstall};
