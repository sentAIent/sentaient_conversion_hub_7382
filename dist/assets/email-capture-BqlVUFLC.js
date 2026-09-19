import{_ as s}from"./controls_v3-DDKXfd35.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";const n="mindwave_email_captured",y=12e4;let l=!1;function _(){localStorage.getItem(n)||setTimeout(async()=>{try{const{getAuth:e}=await s(async()=>{const{getAuth:t}=await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js");return{getAuth:t}},[]);if(e().currentUser||l)return;x()}catch(e){console.warn("[Email Capture] Firebase not ready:",e.message)}},y)}function x(){if(document.getElementById("emailCaptureModal"))return;l=!0;const e=document.createElement("div");e.id="emailCaptureModal",e.className="fixed inset-0 z-[9999] flex items-center justify-center p-4",e.style.cssText=`
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease;
    `,e.innerHTML=`
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        </style>
        <div style="
            max-width: 420px;
            width: 100%;
            background: linear-gradient(180deg, rgba(25, 25, 40, 0.98), rgba(15, 15, 25, 0.98));
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px 32px;
            text-align: center;
            animation: slideUp 0.4s ease;
            position: relative;
        ">
            <!-- Close Button -->
            <button id="emailCaptureClose" style="
                position: absolute;
                top: 16px;
                right: 16px;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
            ">×</button>
            
            <!-- Icon -->
            <div style="
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 36px;
            ">🧘</div>
            
            <!-- Title -->
            <h2 style="
                font-size: 24px;
                font-weight: 700;
                color: white;
                margin-bottom: 12px;
            ">Get 7 Days Free</h2>
            
            <!-- Subtitle -->
            <p style="
                font-size: 15px;
                color: #94a3b8;
                margin-bottom: 24px;
                line-height: 1.5;
            ">Join 10,000+ meditators. We'll send you tips, new features, and exclusive offers.</p>
            
            <!-- Form -->
            <form id="emailCaptureForm">
                <input 
                    type="email" 
                    id="emailCaptureInput"
                    placeholder="Enter your email"
                    required
                    style="
                        width: 100%;
                        padding: 14px 16px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 12px;
                        color: white;
                        font-size: 15px;
                        margin-bottom: 12px;
                        outline: none;
                        transition: border-color 0.2s;
                    "
                    onfocus="this.style.borderColor='#8b5cf6'"
                    onblur="this.style.borderColor='rgba(255,255,255,0.2)'"
                >
                <button 
                    type="submit"
                    id="emailCaptureSubmit"
                    style="
                        width: 100%;
                        padding: 14px;
                        background: linear-gradient(135deg, #8b5cf6, #6366f1);
                        border: none;
                        border-radius: 12px;
                        color: white;
                        font-size: 15px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s, opacity 0.2s;
                    "
                >Get Free Access</button>
            </form>
            
            <!-- Privacy Note -->
            <p style="
                font-size: 11px;
                color: #64748b;
                margin-top: 16px;
            ">We respect your privacy. Unsubscribe anytime.</p>
        </div>
    `,document.body.appendChild(e),e.querySelector("#emailCaptureClose").addEventListener("click",i),e.querySelector("#emailCaptureForm").addEventListener("submit",h),e.addEventListener("click",r=>{r.target===e&&i()}),document.addEventListener("keydown",function r(t){t.key==="Escape"&&(i(),document.removeEventListener("keydown",r))})}async function h(e){e.preventDefault();const r=document.getElementById("emailCaptureInput"),t=document.getElementById("emailCaptureSubmit"),o=r.value.trim();if(o){t.textContent="Saving...",t.disabled=!0;try{const{getFirestore:a,doc:d,setDoc:c,serverTimestamp:u}=await s(async()=>{const{getFirestore:p,doc:b,setDoc:g,serverTimestamp:f}=await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js");return{getFirestore:p,doc:b,setDoc:g,serverTimestamp:f}},[]),m=a();await c(d(m,"email_subscribers",o.toLowerCase().replace(/[^a-z0-9]/g,"_")),{email:o.toLowerCase(),source:"email_capture_modal",createdAt:u(),userAgent:navigator.userAgent,url:window.location.href}),console.log("[Email Capture] Email saved:",o),localStorage.setItem(n,o),t.textContent="✓ You're in!",t.style.background="#10b981",setTimeout(()=>{i(),window.showToast&&window.showToast("Welcome! Check your email for your free trial.","success")},1500)}catch(a){console.error("[Email Capture] Error:",a),localStorage.setItem(n,"failed_"+o),t.textContent="Error - Try Again",t.style.background="#ef4444",t.disabled=!1,setTimeout(()=>{t.textContent="Get Free Access",t.style.background="linear-gradient(135deg, #8b5cf6, #6366f1)"},2e3)}}}function i(){const e=document.getElementById("emailCaptureModal");e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}export{_ as initEmailCapture};
//# sourceMappingURL=email-capture-BqlVUFLC.js.map
