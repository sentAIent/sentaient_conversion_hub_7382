import { els } from '../state.js';
import { getInviteLink, checkUnlockStatus } from '../services/referral-engine.js';
import { stopSession } from '../audio/session-timer.js';

export async function initPaywallModal() {
    if (document.getElementById('paywall-modal')) return;

    const modalHTML = `
        <div id="paywall-modal" class="fixed inset-0 bg-black/80 backdrop-blur-xl z-[9999] hidden flex items-center justify-center p-4 transition-opacity duration-500 opacity-0">
            <div class="bg-black/40 border border-white/10 rounded-3xl p-8 max-w-md w-full relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
                <!-- Decorative background elements -->
                <div class="absolute -top-32 -left-32 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-[80px]"></div>
                <div class="absolute -bottom-32 -right-32 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-[80px]"></div>
                
                <h2 class="text-3xl font-light text-white mb-2 relative z-10 tracking-wide">You're in the Zone.</h2>
                <p class="text-white/60 mb-8 relative z-10 text-sm">You've reached deep focus. Stay in the zone endlessly with Premium, or unlock it for free by inviting 3 friends.</p>
                
                <div class="w-full space-y-4 relative z-10">
                    <!-- Option 1: Subscribe -->
                    <button id="pw-subscribe-btn" class="w-full py-4 rounded-xl bg-[var(--accent)] text-white font-medium hover:brightness-110 transition-all">
                        Unlock Premium ($50/yr)
                    </button>
                    
                    <div class="flex items-center gap-4 text-white/30 text-xs uppercase tracking-widest my-2">
                        <div class="h-px bg-white/10 flex-1"></div>
                        or
                        <div class="h-px bg-white/10 flex-1"></div>
                    </div>
                    
                    <!-- Option 2: Referrals -->
                    <div class="w-full bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center">
                        <h3 class="text-white/80 text-sm font-medium mb-1">Invite 3 Friends (Free Unlock)</h3>
                        <p class="text-white/50 text-xs mb-3 text-center" id="pw-invite-status">Loading invites...</p>
                        
                        <button id="pw-copy-link-btn" class="px-6 py-2 rounded-lg border border-[var(--accent)]/50 text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all text-sm flex items-center gap-2">
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
    const copyLinkBtn = document.getElementById('pw-copy-link-btn');
    const inviteStatus = document.getElementById('pw-invite-status');

    // Load referral data
    const status = await checkUnlockStatus();
    inviteStatus.innerText = `You have ${status.invites}/3 invites.`;

    subscribeBtn.addEventListener('click', () => {
        // Mock Stripe Checkout for now
        window.location.href = "https://buy.stripe.com/test";
    });

    copyLinkBtn.addEventListener('click', async () => {
        const link = await getInviteLink();
        navigator.clipboard.writeText(link);
        const origText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = `Copied!`;
        setTimeout(() => copyLinkBtn.innerHTML = origText, 2000);
    });
}

export function showPaywall() {
    const modal = document.getElementById('paywall-modal');
    if (!modal) return;
    
    // Smooth fade out of audio
    if (window.Tone && Tone.Destination) {
        Tone.Destination.volume.rampTo(-60, 5); // Fade to silence over 5s
    }

    // Stop timers
    stopSession();

    modal.classList.remove('hidden');
    // Trigger reflow for transition
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');
}
