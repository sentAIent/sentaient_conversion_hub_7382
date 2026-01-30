/**
 * Founders Club Pricing Modal
 * Free (Seeker) vs Founders Club ($9.99/mo)
 */

import { goToCheckout, getUserTier } from '../services/stripe-simple.js';
import { getAuth } from 'firebase/auth';

export async function showPricingModal() {
    // Check if user is logged in
    const auth = getAuth();
    if (!auth.currentUser) {
        // Show auth modal first
        if (window.openAuthModal) {
            window.openAuthModal();
        }
        return;
    }

    // Get user's current tier
    const currentTier = await getUserTier();

    // Create or show pricing modal
    let modal = document.getElementById('pricingModal');

    if (!modal) {
        modal = createPricingModal(currentTier);
        document.body.appendChild(modal);
    }

    modal.classList.remove('hidden');
}

export function hidePricingModal() {
    const modal = document.getElementById('pricingModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function createPricingModal(currentTier) {
    const modal = document.createElement('div');
    modal.id = 'pricingModal';
    modal.className = 'fixed inset-0 z-[300] flex items-center justify-center p-4 hidden';
    modal.style.background = 'rgba(0, 0, 0, 0.95)';
    modal.style.backdropFilter = 'blur(20px)';

    modal.innerHTML = `
        <div style="max-width: 900px; width: 100%; background: linear-gradient(180deg, rgba(25, 25, 40, 0.98) 0%, rgba(15, 15, 26, 0.98) 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 48px 32px; position: relative; max-height: 90vh; overflow-y: auto;">
            
            <!-- Close Button -->
            <button onclick="document.getElementById('pricingModal').classList.add('hidden');" style="position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-muted); font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                ×
            </button>

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 48px;">
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #facc15; letter-spacing: 2px; margin-bottom: 12px; border: 1px solid rgba(250, 204, 21, 0.3); display: inline-block; padding: 6px 12px; border-radius: 20px; background: rgba(250, 204, 21, 0.1);">Limited Time Offer</div>
                <h2 style="font-size: 42px; font-weight: 700; color: white; margin-bottom: 12px;">Join the Founders Club</h2>
                <p style="font-size: 18px; color: var(--text-muted);">Lock in early-bird pricing forever. Only for the first 500 members.</p>
            </div>

            <!-- Pricing Cards Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; margin-bottom: 48px;">
                
                <!-- Free Tier -->
                <div class="pricing-tier" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 32px; display: flex; flex-direction: column;">
                    <div style="padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                        <h3 style="font-size: 24px; font-weight: 600; color: white; margin-bottom: 8px;">Free</h3>
                        <p style="font-size: 14px; color: var(--text-muted);">Essentials for beginners</p>
                        <div style="margin-top: 16px;">
                            <span style="font-size: 32px; font-weight: 700; color: white;">$0</span>
                            <span style="color: var(--text-muted);">/forever</span>
                        </div>
                    </div>
                    <ul style="list-style: none; padding: 0; margin-bottom: 32px; flex-grow: 1;">
                        <li style="padding: 8px 0; color: rgba(255, 255, 255, 0.8); display: flex; gap: 12px;">
                            <span style="color: var(--text-muted);">✓</span> Delta Waves (Sleep)
                        </li>
                        <li style="padding: 8px 0; color: rgba(255, 255, 255, 0.8); display: flex; gap: 12px;">
                            <span style="color: var(--text-muted);">✓</span> Beta Waves (Focus)
                        </li>
                        <li style="padding: 8px 0; color: rgba(255, 255, 255, 0.8); display: flex; gap: 12px;">
                            <span style="color: var(--text-muted);">✓</span> Day 1 of Journey
                        </li>
                    </ul>
                    <button disabled style="width: 100%; padding: 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; color: rgba(255, 255, 255, 0.4); font-weight: 600;">Currently Active</button>
                </div>

                <!-- Founders Club Tier -->
                <div class="pricing-tier" style="background: linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(6, 78, 59, 0.2)); border: 2px solid #10b981; border-radius: 20px; padding: 32px; position: relative; display: flex; flex-direction: column; transform: scale(1.02); box-shadow: 0 0 30px rgba(16, 185, 129, 0.15);">
                    <div style="position: absolute; top: -12px; right: 24px; background: #10b981; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 800; color: white; text-transform: uppercase;">Founders Only</div>
                    
                    <div style="padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid rgba(16, 185, 129, 0.3);">
                        <h3 style="font-size: 24px; font-weight: 600; color: white; margin-bottom: 8px;">Founders Club</h3>
                        <p style="font-size: 14px; color: #6ee7b7;">Everything unlocked. Forever.</p>
                        <div style="margin-top: 16px;">
                            <span style="font-size: 42px; font-weight: 700; color: white;">$9.99</span>
                            <span style="color: var(--text-muted);">/month</span>
                        </div>
                        <div style="font-size: 12px; color: #fbbf24; margin-top: 8px;">⚠️ Price increases after 500 members</div>
                    </div>

                    <ul style="list-style: none; padding: 0; margin-bottom: 32px; flex-grow: 1;">
                        <li style="padding: 8px 0; color: white; display: flex; gap: 12px; font-weight: 500;">
                            <span style="color: #10b981;">✓</span> ACCESS TO EVERYTHING
                        </li>
                        <li style="padding: 8px 0; color: rgba(255, 255, 255, 0.8); display: flex; gap: 12px;">
                            <span style="color: #10b981;">✓</span> All Brainwaves (Theta, Alpha, Gamma)
                        </li>
                        <li style="padding: 8px 0; color: rgba(255, 255, 255, 0.8); display: flex; gap: 12px;">
                            <span style="color: #10b981;">✓</span> Full 30-Day Journey Program
                        </li>
                        <li style="padding: 8px 0; color: rgba(255, 255, 255, 0.8); display: flex; gap: 12px;">
                            <span style="color: #10b981;">✓</span> Advanced Visualizers
                        </li>
                        <li style="padding: 8px 0; color: rgba(255, 255, 255, 0.8); display: flex; gap: 12px;">
                            <span style="color: #10b981;">✓</span> Offline Mode & Downloads
                        </li>
                    </ul>

                    <button id="upgradeBtn" style="width: 100%; padding: 16px; background: #10b981; border: none; border-radius: 12px; color: white; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.2s; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                        Join Founders Club
                    </button>
                    <p style="text-align: center; font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 12px;">Cancel anytime. Secure checkout.</p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 24px;">
                <p style="font-size: 13px; color: rgba(255, 255, 255, 0.4);">Questions? Contact founders@mindwave.com</p>
            </div>

        </div>
    `;

    // Handle Upgrade Click
    const upgradeBtn = modal.querySelector('#upgradeBtn');
    upgradeBtn.addEventListener('click', () => {
        if (window.trackUpgradeClick) {
            window.trackUpgradeClick('pricing_modal', 'founders_club_monthly');
        }

        try {
            // Hardcode 'yogi' tier for now as it maps to the $9.99 logic in backend/stripe if consistent, 
            // OR use 'founders' if we created that product. 
            // For this implementation, I'll pass 'founders_club_monthly' and let the Stripe service handle mapping.
            goToCheckout('founders_club_monthly', 'monthly');
        } catch (error) {
            console.error('[Pricing] Checkout error:', error);
            alert(error.message);
        }
    });

    // Hover effects
    const btn = upgradeBtn;
    btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-2px)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hidePricingModal();
        }
    });

    return modal;
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.showPricingModal = showPricingModal;
        window.hidePricingModal = hidePricingModal;
    });
} else {
    window.showPricingModal = showPricingModal;
    window.hidePricingModal = hidePricingModal;
}
