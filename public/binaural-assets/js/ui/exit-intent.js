/**
 * Exit Intent Popup
 * Shows a special offer when user tries to leave the page
 */

const EXIT_INTENT_KEY = 'mindwave_exit_intent_shown';
const SESSION_KEY = 'mindwave_session_id';

let exitIntentShown = false;

export function initExitIntent() {
    // Only on desktop (mouseout doesn't work well on mobile)
    if ('ontouchstart' in window) return;

    // Don't show if already shown this session
    const sessionId = sessionStorage.getItem(SESSION_KEY) || Date.now().toString();
    sessionStorage.setItem(SESSION_KEY, sessionId);

    if (sessionStorage.getItem(`${EXIT_INTENT_KEY}_${sessionId}`)) {
        return;
    }

    // Wait a bit before enabling (don't trigger immediately)
    setTimeout(() => {
        document.addEventListener('mouseout', handleMouseOut);
    }, 10000); // Wait 10 seconds before enabling
}

function handleMouseOut(e) {
    // Only trigger when mouse leaves at the top
    if (e.clientY > 50 || exitIntentShown) return;

    // Don't show if premium user
    if (localStorage.getItem('mindwave_premium') === 'true') return;

    // Don't show if user is logged in and already subscribed
    // (We'll check this client-side for simplicity)

    showExitIntentModal();
    exitIntentShown = true;

    const sessionId = sessionStorage.getItem(SESSION_KEY);
    sessionStorage.setItem(`${EXIT_INTENT_KEY}_${sessionId}`, 'true');

    // Remove listener after showing
    document.removeEventListener('mouseout', handleMouseOut);
}

function showExitIntentModal() {
    // Check if modal already exists
    if (document.getElementById('exitIntentModal')) return;

    const modal = document.createElement('div');
    modal.id = 'exitIntentModal';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4';
    modal.style.cssText = `
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideIn { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
            @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
        </style>
        <div style="
            max-width: 480px;
            width: 100%;
            background: linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.98));
            border: 2px solid #10b981;
            border-radius: 24px;
            padding: 40px 32px;
            text-align: center;
            animation: slideIn 0.4s ease;
            position: relative;
        ">
            <!-- Close Button -->
            <button id="exitIntentClose" style="
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
                display: flex;
                align-items: center;
                justify-content: center;
            ">×</button>
            
            <!-- Emoji -->
            <div style="font-size: 64px; margin-bottom: 16px;">🎁</div>
            
            <!-- Title -->
            <h2 style="
                font-size: 28px;
                font-weight: 700;
                color: white;
                margin-bottom: 12px;
            ">Wait! Don't Leave Empty-Handed</h2>
            
            <!-- Subtitle -->
            <p style="
                font-size: 16px;
                color: #94a3b8;
                margin-bottom: 24px;
                line-height: 1.5;
            ">Get <span style="color: #10b981; font-weight: 700;">50% off</span> your first month of MindWave Premium</p>
            
            <!-- Discount Badge -->
            <div style="
                display: inline-block;
                background: linear-gradient(135deg, #10b981, #059669);
                padding: 12px 24px;
                border-radius: 12px;
                margin-bottom: 24px;
            ">
                <div style="font-size: 32px; font-weight: 800; color: white;">$4.99</div>
                <div style="font-size: 12px; color: rgba(255,255,255,0.8);">
                    <s>$9.99</s> First Month
                </div>
            </div>
            
            <!-- Features -->
            <div style="
                text-align: left;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 24px;
            ">
                <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: white; font-size: 14px;">
                    <span style="color: #10b981;">✓</span> Unlimited access to all brainwaves
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: white; font-size: 14px;">
                    <span style="color: #10b981;">✓</span> All 8 premium visualizers
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: white; font-size: 14px;">
                    <span style="color: #10b981;">✓</span> Cancel anytime, no questions asked
                </div>
            </div>
            
            <!-- CTA Button -->
            <button id="exitIntentCta" style="
                width: 100%;
                padding: 16px;
                background: #10b981;
                border: none;
                border-radius: 12px;
                color: white;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: transform 0.2s;
                animation: pulse 2s infinite;
            ">Claim 50% Off Now</button>
            
            <!-- No Thanks -->
            <button id="exitIntentDismiss" style="
                background: none;
                border: none;
                color: #64748b;
                font-size: 13px;
                margin-top: 16px;
                cursor: pointer;
            ">No thanks, I'll pay full price later</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Event Listeners
    modal.querySelector('#exitIntentClose').addEventListener('click', hideExitIntent);
    modal.querySelector('#exitIntentDismiss').addEventListener('click', hideExitIntent);
    modal.querySelector('#exitIntentCta').addEventListener('click', () => {
        // Store discount code
        localStorage.setItem('mindwave_discount_code', 'EXIT50');

        // Redirect to pricing modal with discount
        hideExitIntent();

        if (window.showPricingModal) {
            window.showPricingModal();
        }
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideExitIntent();
    });

    // Close on Escape
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            hideExitIntent();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function hideExitIntent() {
    const modal = document.getElementById('exitIntentModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}
