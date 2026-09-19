const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/share-DBFJkio0.js","assets/share-BppMSQte.css"])))=>i.map(i=>d[i]);
import{_ as m,M as d,N as u}from"./share-DBFJkio0.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";let i=null,l=!1;const p="mindwave_install_declined",c="mindwave_installed";async function k(){const{registerAuthCallback:e}=await m(async()=>{const{registerAuthCallback:t}=await import("./share-DBFJkio0.js").then(a=>a.bh);return{registerAuthCallback:t}},__vite__mapDeps([0,1]));if(e(async t=>{const a=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone;let r=!1;try{navigator.onLine?t&&(r=await d()):localStorage.getItem("mindwave_premium")==="true"&&(r=!0)}catch(n){n.message&&n.message.includes("offline")}if(a)if(r){const n=document.getElementById("pwaLockScreen");n&&n.remove()}else{w();return}if(r&&!a&&!document.querySelector('link[rel="manifest"]')){const n=document.createElement("link");n.rel="manifest",n.href="manifest.json",document.head.appendChild(n)}}),localStorage.getItem(c))return;const o=localStorage.getItem(p);o&&(Date.now()-parseInt(o))/864e5<7||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),i=t,setTimeout(f,3e4)}),window.addEventListener("appinstalled",()=>{localStorage.setItem(c,"true"),s(),g("✅ MindWave installed! Find it on your home screen.","success")}))}function f(){if(!u.isLifetime||!i||l)return;l=!0;const e=document.createElement("div");e.id="pwaInstallBanner",e.style.cssText=`
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
    `,document.body.appendChild(e),document.getElementById("pwaInstallBtn").addEventListener("click",async()=>{try{if(!await d()){confirm(`The Downloadable App is exclusive to Eternity Members ($488.88 Zen Gear). 

Click OK to upgrade and unlock.`)&&window.showPricingModal&&window.showPricingModal();return}}catch{}if(!i)return;i.prompt();const{outcome:o}=await i.userChoice;i=null,s()}),document.getElementById("pwaCloseBtn").addEventListener("click",()=>{localStorage.setItem(p,Date.now().toString()),s()})}function s(){const e=document.getElementById("pwaInstallBanner");e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}function g(e,o){if(window.showToast){window.showToast(e,o);return}const t=document.createElement("div");t.style.cssText=`
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
    `,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}function w(){if(document.getElementById("pwaLockScreen"))return;const e=document.createElement("div");e.id="pwaLockScreen",e.style.cssText=`
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
    `,document.body.appendChild(e)}export{k as initPWAInstall};
//# sourceMappingURL=pwa-install-CSFOFTeA.js.map
