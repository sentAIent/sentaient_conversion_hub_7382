/**
 * Email Capture Modal
 * Shows a newsletter signup for non-logged-in users
 */

const EMAIL_CAPTURE_KEY = 'mindwave_email_captured';
const DELAY_MS = 120000; // 2 minutes

let emailModalShown = false;

export function initEmailCapture() {
    // Don't show if already captured email
    if (localStorage.getItem(EMAIL_CAPTURE_KEY)) return;

    // Wait before showing (also gives Firebase time to initialize)
    setTimeout(async () => {
        try {
            // Dynamically import Firebase auth to avoid race condition
            const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js');
            const auth = getAuth();

            // Don't show if user is logged in
            if (auth.currentUser) return;
            if (emailModalShown) return;

            showEmailCaptureModal();
        } catch (err) {
            console.warn('[Email Capture] Firebase not ready:', err.message);
        }
    }, DELAY_MS);
}


function showEmailCaptureModal() {
    if (document.getElementById('emailCaptureModal')) return;
    emailModalShown = true;

    const modal = document.createElement('div');
    modal.id = 'emailCaptureModal';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4';
    modal.style.cssText = `
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <style>
            @keyframes slideUpFade { 
                0% { transform: translateY(40px) scale(0.95); opacity: 0; } 
                100% { transform: translateY(0) scale(1); opacity: 1; } 
            }
            @keyframes pulseGlow {
                0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
                100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
            }
            .email-input-wrapper {
                position: relative;
                margin-bottom: 24px;
            }
            .email-input-wrapper input {
                width: 100%;
                padding: 16px 20px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                color: white;
                font-size: 16px;
                outline: none;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .email-input-wrapper input:focus {
                background: rgba(255, 255, 255, 0.05);
                border-color: #8b5cf6;
                box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 10px rgba(139, 92, 246, 0.1);
            }
            .email-input-wrapper input:focus + label,
            .email-input-wrapper input:not(:placeholder-shown) + label {
                transform: translateY(-24px) scale(0.85);
                color: #8b5cf6;
                background: linear-gradient(180deg, rgba(20,25,40,1) 0%, rgba(20,25,40,0) 100%);
                padding: 0 8px;
            }
            .email-input-wrapper label {
                position: absolute;
                left: 16px;
                top: 16px;
                color: #64748b;
                font-size: 16px;
                pointer-events: none;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                transform-origin: left top;
            }
            .premium-submit-btn {
                width: 100%;
                padding: 16px;
                background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                border: none;
                border-radius: 16px;
                color: white;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.4);
                position: relative;
                overflow: hidden;
            }
            .premium-submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 35px -5px rgba(139, 92, 246, 0.5);
            }
            .premium-submit-btn:active {
                transform: translateY(1px);
            }
        </style>
        <div style="
            max-width: 440px;
            width: 100%;
            background: linear-gradient(180deg, rgba(30, 35, 50, 0.8), rgba(15, 20, 30, 0.95));
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 32px;
            padding: 48px 40px;
            text-align: center;
            animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.02);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        ">
            <!-- Close Button -->
            <button id="emailCaptureClose" style="
                position: absolute;
                top: 20px;
                right: 20px;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.05);
                color: rgba(255,255,255,0.6);
                font-size: 20px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
            " onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'" onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.color='rgba(255,255,255,0.6)'">×</button>
            
            <!-- Icon with Glow -->
            <div style="
                width: 88px;
                height: 88px;
                margin: 0 auto 24px;
                background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                box-shadow: 0 0 40px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(255,255,255,0.2);
                animation: pulseGlow 3s infinite;
            ">✨</div>
            
            <!-- Title -->
            <h2 style="
                font-size: 28px;
                font-weight: 800;
                color: white;
                margin-bottom: 12px;
                letter-spacing: -0.5px;
            ">Unlock Your Mind</h2>
            
            <!-- Subtitle -->
            <p style="
                font-size: 16px;
                color: #94a3b8;
                margin-bottom: 32px;
                line-height: 1.6;
            ">Join 10,000+ elite performers. We'll send you a <strong style="color: #c084fc">Free 7-Day Eternity Pass</strong> instantly.</p>
            
            <!-- Form -->
            <form id="emailCaptureForm">
                <div class="email-input-wrapper">
                    <input 
                        type="email" 
                        id="emailCaptureInput"
                        placeholder=" "
                        required
                    >
                    <label for="emailCaptureInput">Your best email address</label>
                </div>
                <button 
                    type="submit"
                    id="emailCaptureSubmit"
                    class="premium-submit-btn"
                >Get Instant Access</button>
            </form>
            
            <!-- Privacy Note -->
            <div style="
                font-size: 12px;
                color: #475569;
                margin-top: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            ">
                <span style="color: #10b981">🔒</span> 100% secure. Unsubscribe anytime.
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('#emailCaptureClose').addEventListener('click', hideEmailCapture);
    modal.querySelector('#emailCaptureForm').addEventListener('submit', handleEmailSubmit);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideEmailCapture();
    });

    // Close on Escape
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            hideEmailCapture();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

async function handleEmailSubmit(e) {
    e.preventDefault();

    const input = document.getElementById('emailCaptureInput');
    const button = document.getElementById('emailCaptureSubmit');
    const email = input.value.trim();

    if (!email) return;

    // Show loading state
    button.textContent = 'Saving...';
    button.disabled = true;

    try {
        // Dynamically import Firestore
        const { getFirestore, doc, setDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');

        // Save to Firestore
        const db = getFirestore();
        await setDoc(doc(db, 'email_subscribers', email.toLowerCase().replace(/[^a-z0-9]/g, '_')), {
            email: email.toLowerCase(),
            source: 'email_capture_modal',
            createdAt: serverTimestamp(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });

        console.log('[Email Capture] Email saved:', email);

        // Mark as captured
        localStorage.setItem(EMAIL_CAPTURE_KEY, email);

        // Show success
        button.textContent = '✓ You\'re in!';
        button.style.background = '#10b981';

        setTimeout(() => {
            hideEmailCapture();

            // Show toast
            if (window.showToast) {
                window.showToast('Welcome! Check your email for your free trial.', 'success');
            }
        }, 1500);

    } catch (err) {
        console.error('[Email Capture] Error:', err);

        // Still mark as captured to avoid annoying user
        localStorage.setItem(EMAIL_CAPTURE_KEY, 'failed_' + email);

        button.textContent = 'Error - Try Again';
        button.style.background = '#ef4444';
        button.disabled = false;

        setTimeout(() => {
            button.textContent = 'Get Free Access';
            button.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
        }, 2000);
    }
}

function hideEmailCapture() {
    const modal = document.getElementById('emailCaptureModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}
