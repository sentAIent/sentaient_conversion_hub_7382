import { els } from '../state.js';
import { getInviteLink, checkUnlockStatus } from '../services/referral-engine.js';
import { stopSession } from '../audio/session-timer.js';

export async function initPaywallModal() {
    if (document.getElementById('paywall-modal')) return;

    const modalHTML = `
        <div id="paywall-modal" class="fixed inset-0 bg-black/85 backdrop-blur-xl z-[9999] hidden flex items-center justify-center p-3 sm:p-4 transition-opacity duration-300 opacity-0">
            <div class="bg-black/75 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[92vh] max-h-[92dvh] overflow-y-auto custom-scrollbar relative flex flex-col items-center text-center shadow-2xl">
                <!-- Close Button -->
                <button id="pw-close-btn" class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-all text-lg cursor-pointer" title="Close" aria-label="Close">
                    &times;
                </button>

                <!-- Decorative background elements -->
                <div class="absolute -top-32 -left-32 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-[80px] pointer-events-none"></div>
                <div class="absolute -bottom-32 -right-32 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-[80px] pointer-events-none"></div>
                
                <h2 class="text-3xl font-light text-white mb-2 relative z-10 tracking-wide">You're in the Zone.</h2>
                <p class="text-white/60 mb-6 relative z-10 text-sm">You've reached today's free focus session limit. Unlock unlimited listening and all frequencies with Premium, sign in to your existing account, or unlock access by inviting friends.</p>
                
                <div class="w-full space-y-4 relative z-10">
                    <!-- Option 1: Explore Premium Plans (Consistent Pricing) -->
                    <button id="pw-subscribe-btn" class="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--accent)] to-blue-500 text-white font-medium hover:brightness-110 shadow-lg shadow-[var(--accent)]/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Unlock Unlimited Access</span>
                    </button>

                    <!-- Option 2: Already Subscribed / Log In -->
                    <div class="w-full flex items-center justify-center pt-1">
                        <button id="pw-login-btn" class="text-white/70 hover:text-white text-xs underline underline-offset-4 transition-colors flex items-center gap-1.5 py-1 cursor-pointer">
                            <svg class="w-3.5 h-3.5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span id="pw-login-text">Already subscribed? <strong class="text-[var(--accent)] font-semibold">Log in to restore access</strong></span>
                        </button>
                    </div>
                    
                    <div class="flex items-center gap-4 text-white/30 text-xs uppercase tracking-widest my-2">
                        <div class="h-px bg-white/10 flex-1"></div>
                        or
                        <div class="h-px bg-white/10 flex-1"></div>
                    </div>
                    
                    <!-- Option 3: Referrals -->
                    <div class="w-full bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center">
                        <h3 class="text-white/80 text-sm font-medium mb-1">Invite 3 Friends (Free Unlock)</h3>
                        <p class="text-white/50 text-xs mb-3 text-center" id="pw-invite-status">Loading invites...</p>
                        
                        <button id="pw-copy-link-btn" class="px-6 py-2 rounded-lg border border-[var(--accent)]/50 text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all text-sm flex items-center gap-2 cursor-pointer">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                            Copy My Invite Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('paywall-modal');
    const subscribeBtn = document.getElementById('pw-subscribe-btn');
    const loginBtn = document.getElementById('pw-login-btn');
    const closeBtn = document.getElementById('pw-close-btn');
    const copyLinkBtn = document.getElementById('pw-copy-link-btn');
    const inviteStatus = document.getElementById('pw-invite-status');

    // Load referral data
    try {
        const status = await checkUnlockStatus();
        if (inviteStatus && status) {
            inviteStatus.innerText = `You have ${status.invites || 0}/3 invites.`;
        }
    } catch (e) {
        if (inviteStatus) inviteStatus.innerText = 'Invite 3 friends to unlock full access.';
    }

    // Subscribe / Pricing button -> Opens standard pricing modal with real, consistent plans & Stripe checkout
    subscribeBtn.addEventListener('click', async () => {
        hidePaywall();
        if (window.showPricingModal) {
            window.showPricingModal();
        } else {
            try {
                const pricingModule = await import('./pricing-3tier.js');
                if (pricingModule.showPricingModal) {
                    pricingModule.showPricingModal();
                }
            } catch (err) {
                console.error('[Paywall] Failed to load pricing modal:', err);
            }
        }
    });

    // Log In button -> Opens auth modal to sign in and restore purchases
    loginBtn.addEventListener('click', async () => {
        hidePaywall();
        if (window.openAuthModal) {
            window.openAuthModal();
        } else {
            try {
                const authModule = await import('./auth-controller.js');
                if (authModule.openAuthModal) {
                    authModule.openAuthModal();
                }
            } catch (err) {
                console.error('[Paywall] Failed to open auth modal:', err);
            }
        }
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => hidePaywall());
    }

    // Backdrop click to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hidePaywall();
        }
    });

    // Escape key listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            hidePaywall();
        }
    });

    // Copy Referral Link
    copyLinkBtn.addEventListener('click', async () => {
        try {
            const link = await getInviteLink();
            navigator.clipboard.writeText(link);
            const origText = copyLinkBtn.innerHTML;
            copyLinkBtn.innerHTML = `Copied!`;
            setTimeout(() => copyLinkBtn.innerHTML = origText, 2000);
        } catch (e) {
            console.error('[Paywall] Failed to copy invite link:', e);
        }
    });
}

export function hidePaywall() {
    const modal = document.getElementById('paywall-modal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

export async function showPaywall() {
    const modal = document.getElementById('paywall-modal');
    if (!modal) return;

    // Check if user is already unlocked locally or has active subscription
    if (localStorage.getItem('mindwave_premium') === 'true' || localStorage.getItem('mindwave_premium_unlocked') === 'true') {
        console.log('[Paywall] User is premium, bypassing paywall.');
        return;
    }

    try {
        const { getAuth } = await import('../services/firebase.js');
        const auth = getAuth();
        if (auth && auth.currentUser) {
            const loginText = document.getElementById('pw-login-text');
            if (loginText) {
                const email = auth.currentUser.email || 'Current Account';
                loginText.innerHTML = `Signed in as <strong class="text-white">${email}</strong> &bull; <span class="text-[var(--accent)] font-semibold">Switch Account</span>`;
            }
        }
    } catch (e) {
        // Ignore auth check error on display
    }
    
    // Smooth fade out of audio
    if (window.Tone && Tone.Destination) {
        try {
            Tone.Destination.volume.rampTo(-60, 5); // Fade to silence over 5s
        } catch (e) { }
    }

    // Stop timers
    try {
        stopSession();
    } catch (e) { }

    modal.classList.remove('hidden');
    // Trigger reflow for transition
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');
}
