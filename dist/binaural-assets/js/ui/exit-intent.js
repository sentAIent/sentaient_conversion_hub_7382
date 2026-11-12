/**
 * Exit Intent Popup
 * Shows a special offer when user tries to leave the page
 * Integrates with A/B testing for variant offers
 */

import { getVariant, trackConversion } from '../utils/ab-testing.js';

const EXIT_INTENT_KEY = 'mindwave_exit_intent_shown';
const SESSION_KEY = 'mindwave_session_id';

let exitIntentShown = false;
let activeModal = null;
let countdownTimer = null;
let escHandlerRef = null;
let resizeHandlerRef = null;

export function initExitIntent() {
    try {
        if (typeof window === 'undefined') return;
        if (typeof sessionStorage === 'undefined') return;

        // Don't show if already shown this session
        const sessionId = sessionStorage.getItem(SESSION_KEY) || Date.now().toString();
        sessionStorage.setItem(SESSION_KEY, sessionId);

        if (sessionStorage.getItem(`${EXIT_INTENT_KEY}_${sessionId}`)) {
            return;
        }

        // Wait a bit before enabling (don't trigger immediately)
        setTimeout(() => {
            document.addEventListener('mouseout', handleMouseOut);
            document.addEventListener('visibilitychange', handleVisibilityChange);
        }, 10000); // Wait 10 seconds before enabling
    } catch (e) {
        console.warn('[ExitIntent] sessionStorage unavailable or restricted:', e);
    }
}

function handleMouseOut(e) {
    // Only trigger when mouse leaves near the top
    if (e.clientY > 35 || exitIntentShown) return;

    // Don't show if premium user
    if (localStorage.getItem('mindwave_premium') === 'true' || localStorage.getItem('mindwave_lifetime') === 'true') return;

    triggerModal();
}

function handleVisibilityChange() {
    if (document.visibilityState === 'hidden' && !exitIntentShown) {
        if (localStorage.getItem('mindwave_premium') === 'true' || localStorage.getItem('mindwave_lifetime') === 'true') return;
    }
}

function triggerModal() {
    if (exitIntentShown || document.getElementById('exitIntentModal')) return;
    exitIntentShown = true;

    try {
        const sessionId = sessionStorage.getItem(SESSION_KEY);
        if (sessionId) sessionStorage.setItem(`${EXIT_INTENT_KEY}_${sessionId}`, 'true');
    } catch (e) {}

    // Remove trigger listeners
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('visibilitychange', handleVisibilityChange);

    showExitIntentModal();
}

function showExitIntentModal() {
    // Check if modal already exists
    if (document.getElementById('exitIntentModal')) return;

    // Get A/B variant
    const variant = getVariant('exit_intent_offer');
    console.log('[ExitIntent] Showing variant:', variant);

    // Variant-specific content
    const variantContent = {
        '50_percent': {
            emoji: '🎁',
            title: "Wait! Don't Leave Empty-Handed",
            subtitle: 'Get <span style="color: #10b981; font-weight: 700;">50% off</span> your first month of MindWave Premium',
            badge: '<div style="font-size: 32px; font-weight: 800; color: white;">$4.99</div><div style="font-size: 12px; color: rgba(255,255,255,0.8);"><s>$9.99</s> First Month</div>',
            cta: 'Claim 50% Off Now',
            dismiss: "No thanks, I'll pay full price later"
        },
        '7_day_trial': {
            emoji: '🚀',
            title: 'Try MindWave PRO Free',
            subtitle: 'Get <span style="color: #8b5cf6; font-weight: 700;">7 days free</span> to unlock all brainwave frequencies',
            badge: '<div style="font-size: 32px; font-weight: 800; color: white;">7 Days</div><div style="font-size: 12px; color: rgba(255,255,255,0.8);">Completely Free</div>',
            cta: 'Start Free Trial',
            dismiss: 'Maybe later'
        },
        'countdown': {
            emoji: '⏰',
            title: 'Special Offer Expiring Soon',
            subtitle: 'This deal disappears when the timer hits zero',
            badge: '<div id="exitCountdown" style="font-size: 32px; font-weight: 800; color: white; font-family: monospace;">14:59</div><div style="font-size: 12px; color: rgba(255,255,255,0.8);">Time Remaining</div>',
            cta: 'Claim Before It Expires',
            dismiss: "I don't mind paying more"
        }
    };

    const content = variantContent[variant] || variantContent['50_percent'];
    const borderColor = variant === '7_day_trial' ? '#8b5cf6' : '#10b981';
    const bgGradient = variant === '7_day_trial'
        ? 'linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(15, 23, 42, 0.98))'
        : 'linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.98))';
    const btnColor = variant === '7_day_trial' ? '#8b5cf6' : '#10b981';

    const modal = document.createElement('div');
    modal.id = 'exitIntentModal';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4';
    modal.style.cssText = `
        background: rgba(0, 0, 0, 0.88);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        opacity: 0;
    `;

    modal.innerHTML = `
        <style>
            @keyframes exitFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes exitSlideIn { from { transform: scale(0.95) translateY(16px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
            @keyframes exitPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }

            .exit-intent-card {
                max-width: 460px;
                width: 100%;
                background: ${bgGradient};
                border: 1.5px solid ${borderColor};
                border-radius: 28px;
                padding: clamp(20px, 4vw, 32px) clamp(16px, 4vw, 28px);
                text-align: center;
                animation: exitSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                position: relative;
                max-height: min(90vh, 90dvh);
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px ${borderColor}22;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
            }

            .exit-intent-card::-webkit-scrollbar {
                width: 4px;
            }
            .exit-intent-card::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.03);
            }
            .exit-intent-card::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
            }

            .exit-sheet-handle {
                display: none;
                width: 40px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                margin: 0 auto 12px auto;
                cursor: grab;
            }

            /* Mobile Adaptation (Bottom-sheet mode on narrow screens) */
            @media (max-width: 640px) {
                #exitIntentModal {
                    padding: 0;
                    align-items: flex-end;
                }
                .exit-intent-card {
                    max-width: 100%;
                    border-radius: 24px 24px 0 0;
                    border-bottom: none;
                    max-height: min(88vh, 88dvh);
                    padding: 16px 20px 28px 20px;
                    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.8);
                }
                .exit-sheet-handle {
                    display: block;
                }
            }

            /* Short Screen Heights / Landscape View */
            @media (max-height: 650px) {
                #exitIntentModal {
                    padding: 8px;
                    align-items: center;
                }
                .exit-intent-card {
                    padding: 14px 18px;
                    max-height: min(94vh, 94dvh);
                    border-radius: 18px;
                }
                .exit-emoji {
                    font-size: 30px !important;
                    margin-bottom: 6px !important;
                }
                .exit-title {
                    font-size: 20px !important;
                    margin-bottom: 4px !important;
                }
                .exit-subtitle {
                    font-size: 13px !important;
                    margin-bottom: 10px !important;
                }
                .exit-badge {
                    padding: 6px 16px !important;
                    margin-bottom: 10px !important;
                }
                .exit-benefits {
                    padding: 8px 12px !important;
                    margin-bottom: 12px !important;
                    gap: 4px !important;
                }
                .exit-benefits-item {
                    padding: 4px 0 !important;
                    font-size: 12px !important;
                }
                .exit-cta-btn {
                    padding: 12px !important;
                    font-size: 14px !important;
                }
                .exit-links {
                    margin-top: 8px !important;
                    gap: 6px !important;
                }
            }
        </style>
        
        <div class="exit-intent-card" id="exitIntentCard">
            <div class="exit-sheet-handle" id="exitSheetHandle" aria-hidden="true"></div>
            
            <!-- Accessible Close Button -->
            <button id="exitIntentClose" aria-label="Close special offer" style="
                position: absolute; top: 14px; right: 14px; width: 36px; height: 36px; min-width: 40px; min-height: 40px;
                border-radius: 50%; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.8); font-size: 20px; cursor: pointer; display: flex;
                align-items: center; justify-content: center; transition: all 0.2s; z-index: 10;
                touch-action: manipulation;
            " onmouseover="this.style.background='rgba(255,255,255,0.18)'; this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='rgba(255,255,255,0.8)'">&times;</button>
            
            <div class="exit-emoji" style="font-size: clamp(38px, 8vw, 54px); margin-bottom: 12px; transition: font-size 0.2s;">${content.emoji}</div>
            <h2 class="exit-title" style="font-size: clamp(20px, 4vw, 26px); font-weight: 800; color: white; margin-bottom: 8px; line-height: 1.25; letter-spacing: -0.5px;">${content.title}</h2>
            <p class="exit-subtitle" style="font-size: clamp(13px, 3vw, 15px); color: #94a3b8; margin-bottom: 18px; line-height: 1.45;">${content.subtitle}</p>
            
            <!-- Price / Benefit Badge -->
            <div class="exit-badge" style="display: inline-block; align-self: center; background: linear-gradient(135deg, ${btnColor}, ${btnColor}bb); padding: 10px 22px; border-radius: 14px; margin-bottom: 18px; box-shadow: 0 8px 20px ${btnColor}33;">
                ${content.badge}
            </div>
            
            <!-- Value Checklist -->
            <div class="exit-benefits" style="text-align: left; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 14px; padding: 12px 16px; margin-bottom: 20px; display: flex; flex-direction: column;">
                <div class="exit-benefits-item" style="display: flex; align-items: center; gap: 10px; padding: 6px 0; color: rgba(255, 255, 255, 0.95); font-size: 13.5px; font-weight: 500;">
                    <span style="color: ${btnColor}; font-weight: 800; font-size: 15px;">✓</span> Unlimited access to all brainwaves & frequencies
                </div>
                <div class="exit-benefits-item" style="display: flex; align-items: center; gap: 10px; padding: 6px 0; color: rgba(255, 255, 255, 0.95); font-size: 13.5px; font-weight: 500;">
                    <span style="color: ${btnColor}; font-weight: 800; font-size: 15px;">✓</span> All 8 premium interactive visualizers
                </div>
                <div class="exit-benefits-item" style="display: flex; align-items: center; gap: 10px; padding: 6px 0; color: rgba(255, 255, 255, 0.95); font-size: 13.5px; font-weight: 500;">
                    <span style="color: ${btnColor}; font-weight: 800; font-size: 15px;">✓</span> Cancel anytime with 1 click, no questions asked
                </div>
            </div>
            
            <!-- CTA Claim Button -->
            <button id="exitIntentCta" class="exit-cta-btn" style="
                width: 100%; padding: 16px; background: ${btnColor}; border: none;
                border-radius: 14px; color: white; font-size: 15.5px; font-weight: 800;
                cursor: pointer; transition: transform 0.2s, filter 0.2s; animation: exitPulse 2.5s infinite;
                box-shadow: 0 8px 24px ${btnColor}40; letter-spacing: 0.2px; touch-action: manipulation;
            ">${content.cta}</button>
            
            <!-- Secondary Navigation & Login Options -->
            <div class="exit-links" style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 14px;">
                <!-- Log In Option to Restore Access -->
                <button id="exitIntentLogin" style="
                    background: none; border: none; color: rgba(255, 255, 255, 0.7); font-size: 12.5px;
                    text-decoration: underline; text-underline-offset: 3px; cursor: pointer; transition: color 0.2s;
                    padding: 4px 8px; touch-action: manipulation;
                " onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">
                    Already subscribed? <strong style="color: ${btnColor};">Log in to restore access</strong>
                </button>

                <!-- Dismiss Link -->
                <button id="exitIntentDismiss" style="
                    background: none; border: none; color: #64748b; font-size: 12px;
                    cursor: pointer; transition: color 0.2s; padding: 2px 8px;
                " onmouseover="this.style.color='#94a3b8'" onmouseout="this.style.color='#64748b'">${content.dismiss}</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    activeModal = modal;

    // Trigger smooth fade-in
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });

    const card = modal.querySelector('#exitIntentCard');
    const sheetHandle = modal.querySelector('#exitSheetHandle');

    // Dynamic Window Resize & Orientation Adaptation (Just like the guide)
    const adaptLayout = () => {
        if (!card) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width <= 640;
        const isShortHeight = height < 650;

        card.classList.toggle('is-mobile', isMobile);
        card.classList.toggle('is-short-height', isShortHeight);
    };

    adaptLayout();
    resizeHandlerRef = adaptLayout;
    window.addEventListener('resize', adaptLayout, { passive: true });
    window.addEventListener('orientationchange', () => {
        setTimeout(adaptLayout, 100);
    }, { passive: true });

    // Mobile Swipe-Down to Dismiss Gesture
    let startY = 0;
    let currentY = 0;
    const touchElements = [sheetHandle, modal.querySelector('.exit-title'), modal.querySelector('.exit-emoji')].filter(Boolean);

    touchElements.forEach(el => {
        el.addEventListener('touchstart', (e) => {
            if (window.innerWidth <= 640 && e.touches.length === 1) {
                startY = e.touches[0].clientY;
                currentY = startY;
            }
        }, { passive: true });

        el.addEventListener('touchmove', (e) => {
            if (window.innerWidth <= 640 && startY > 0) {
                currentY = e.touches[0].clientY;
                const diff = currentY - startY;
                if (diff > 0 && card) {
                    card.style.transform = `translateY(${diff}px)`;
                }
            }
        }, { passive: true });

        el.addEventListener('touchend', () => {
            if (window.innerWidth <= 640 && startY > 0) {
                const diff = currentY - startY;
                if (card) card.style.transform = '';
                if (diff > 75) {
                    hideExitIntent();
                }
                startY = 0;
                currentY = 0;
            }
        }, { passive: true });
    });

    // Start countdown timer for countdown variant
    if (variant === 'countdown') {
        let seconds = 899; // 14:59
        const countdownEl = modal.querySelector('#exitCountdown');
        countdownTimer = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(countdownTimer);
                return;
            }
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            if (countdownEl) countdownEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // Event Listeners
    modal.querySelector('#exitIntentClose').addEventListener('click', hideExitIntent);
    modal.querySelector('#exitIntentDismiss').addEventListener('click', hideExitIntent);

    // Login Button Listener
    const loginBtn = modal.querySelector('#exitIntentLogin');
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            hideExitIntent();
            if (window.openAuthModal) {
                window.openAuthModal();
            } else {
                try {
                    const authModule = await import('./auth-controller.js');
                    if (authModule.openAuthModal) {
                        authModule.openAuthModal();
                    }
                } catch (e) {
                    console.error('[ExitIntent] Failed to open auth modal:', e);
                }
            }
        });
    }

    // CTA Button Listener
    modal.querySelector('#exitIntentCta').addEventListener('click', async () => {
        // Track conversion for A/B test
        trackConversion('exit_intent_offer', 'cta_click', { variant });

        // Store discount code in localStorage so pricing modal automatically applies it
        try {
            localStorage.setItem('mindwave_discount_code', 'EXIT50');
            localStorage.setItem('mindwave_discount_applied_at', Date.now().toString());
        } catch (e) {}

        hideExitIntent();

        // Open pricing modal
        if (window.showPricingModal) {
            window.showPricingModal();
        } else {
            try {
                const pricingModule = await import('./pricing-3tier.js');
                if (pricingModule.showPricingModal) {
                    pricingModule.showPricingModal();
                }
            } catch (err) {
                console.error('[ExitIntent] Failed to open pricing modal:', err);
            }
        }
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideExitIntent();
    });

    // Close on Escape key
    escHandlerRef = (e) => {
        if (e.key === 'Escape') {
            hideExitIntent();
        }
    };
    document.addEventListener('keydown', escHandlerRef);
}

export function hideExitIntent() {
    const modal = activeModal || document.getElementById('exitIntentModal');
    if (modal) {
        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }

        if (escHandlerRef) {
            document.removeEventListener('keydown', escHandlerRef);
            escHandlerRef = null;
        }

        if (resizeHandlerRef) {
            window.removeEventListener('resize', resizeHandlerRef);
            resizeHandlerRef = null;
        }

        modal.style.opacity = '0';
        const card = modal.querySelector('#exitIntentCard');
        if (card) {
            card.style.transform = 'scale(0.95) translateY(20px)';
            card.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
        }

        setTimeout(() => {
            modal.remove();
            activeModal = null;
        }, 280);
    }
}
