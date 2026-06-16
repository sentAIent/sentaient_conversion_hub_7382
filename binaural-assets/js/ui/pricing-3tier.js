/**
 * Founders Club Pricing Modal (Updated for Professional Tier)
 * Free (Seeker) vs Founders Club ($9.99/mo) vs Professional ($25/mo)
 */

import { goToCheckout, getUserTier, getActiveTierPricing } from '../services/stripe-simple.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { shareReferral } from '../services/referral.js';
import { getVariant, trackConversion } from '../utils/ab-testing.js';
import { trackGlobalEvent } from '../services/analytics-service.js';
import { showInquiryForm } from './inquiry-form.js';

// PRICING CONFIGURATION
// Easily toggle future price increases here
const PRICING_CONFIG = {
    free: {
        limitText: "15 mins / day",
        limitSubtext: "Daily limit",
        price: "$0",
        period: "/forever",
        active: true
    },
    zen: {
        name: "Zen",
        price: "$39.99",
        period: "/month",
        productId: "zen",
        description: "For deep focus and inner peace",
        limitText: "Unlimited Play",
        active: true,
        warning: "🔥 20% off for the first 500"
    },
    thrive: {
        name: "Thrive",
        price: "$88.00",
        period: "/month",
        productId: "thrive",
        description: "Commercial license included",
        limitText: "Unlimited Play",
        active: true,
        warning: "🔥 For Creators & Professionals"
    },
    lifetime: {
        name: "Eternity",
        price: "$488.88",
        period: "/once",
        productId: "lifetime",
        description: "Pay once, own it forever",
        limitText: "Unlimited Forever",
        active: true,
        warning: "🔥 Best Value"
    }
};

const TESTIMONIALS = [
    {
        quote: "MindWave completely cured my insomnia. The delta waves are magic.",
        author: "Sarah J.",
        role: "Verified Member"
    },
    {
        quote: "I use the Gamma/Focus mode for deep work. Productivity is through the roof.",
        author: "David K.",
        role: "Software Engineer"
    },
    {
        quote: "Better than Calm or Headspace. The visualizers make it immersive.",
        author: "Michelle R.",
        role: "Creative Director"
    }
];

// CACHE for pricing data to avoid repeated slow Firestore calls
let cachedPricingData = null;

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

    // 1. Instantly show the modal with default/cached data
    let currentTier = 'free';
    let dynamicPricing = cachedPricingData;

    let modal = document.getElementById('pricingModal');
    if (modal) {
        modal.remove(); // Re-create to ensure fresh data/state
    }

    modal = createPricingModal(currentTier, dynamicPricing);
    document.body.appendChild(modal);
    modal.classList.remove('hidden');

    trackGlobalEvent('pricing_modal_opened');

    // 2. Fetch fresh data in the background
    try {
        currentTier = await getUserTier();

        const pricingPromise = getActiveTierPricing();
        const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 3000));
        const freshDynamicPricing = await Promise.race([pricingPromise, timeoutPromise]);

        if (freshDynamicPricing) {
            cachedPricingData = freshDynamicPricing;
            dynamicPricing = freshDynamicPricing;
        }

        // 3. Re-render the modal content silently to update spots/prices
        if (document.getElementById('pricingModal')) {
            const tempModal = createPricingModal(currentTier, dynamicPricing);
            const container = document.getElementById('pricingModal');
            container.innerHTML = tempModal.innerHTML;

            // Re-attach event listeners by running the same logic that createPricingModal uses internally
            // Since createPricingModal returns a node with listeners attached, we'll just replace the node entirely
            // but keep the hidden state correct
            tempModal.classList.remove('hidden');
            document.body.replaceChild(tempModal, container);
        }

    } catch (err) {
        console.warn('[Pricing] Background fetch failed:', err.message);
    }
}

export function hidePricingModal() {
    const modal = document.getElementById('pricingModal');
    if (modal) {
        modal.classList.add('hidden');
        trackGlobalEvent('pricing_modal_closed');
    }
}

function createPricingModal(currentTier, dynamicPricing = null) {
    // Scarcity Logic (Real or Fallback)
    const spots = dynamicPricing ? dynamicPricing.spotsLeft : 432;
    const isFull = dynamicPricing ? dynamicPricing.isFull : false;

    const currentZenPrice = dynamicPricing ? dynamicPricing.zen.monthlyPrice : PRICING_CONFIG.zen.price;
    const currentThrivePrice = PRICING_CONFIG.thrive.price; // Thrive doesn't have dynamic pricing yet

    trackGlobalEvent('viewed_pricing_modal', {
        currentTier,
        zenAvailable: !isFull
    });

    const modal = document.createElement('div');
    modal.id = 'pricingModal';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 hidden';
    modal.style.background = 'rgba(0, 0, 0, 0.95)';
    modal.style.backdropFilter = 'blur(20px)';

    // Testimonials HTML generator
    const renderTestimonials = () => {
        return TESTIMONIALS.map(t => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 16px; margin-bottom: 0; backdrop-filter: blur(10px); transition: transform 0.2s; cursor: default;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                <p style="font-size: 14px; color: rgba(255,255,255,0.9); font-style: italic; margin-bottom: 12px; line-height: 1.5;">"${t.quote}"</p>
                <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">— ${t.author}, <span style="font-weight: 400; opacity: 0.7;">${t.role}</span></div>
            </div>
        `).join('');
    };

    modal.innerHTML = `
        <style>
            .pricing-tier { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            .pricing-tier:hover { transform: translateY(-8px); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); border-color: rgba(255,255,255,0.2) !important; }
            .zen-tier { transform: scale(1.02); z-index: 10; border-color: rgba(16, 185, 129, 0.5) !important; box-shadow: 0 0 30px rgba(16, 185, 129, 0.15); }
            .zen-tier:hover { box-shadow: 0 25px 50px -10px rgba(16, 185, 129, 0.3); border-color: #10b981 !important; transform: scale(1.04) translateY(-8px) !important; }
            .lifetime-offer { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 0 50px rgba(251, 191, 36, 0.15); border-color: rgba(251, 191, 36, 0.5) !important; }
            .lifetime-offer:hover { transform: translateY(-4px); box-shadow: 0 25px 60px -10px rgba(251, 191, 36, 0.3) !important; border-color: #fbbf24 !important; }
            .coupon-input-wrapper { position: relative; transition: all 0.3s ease; }
            .coupon-input-wrapper input:focus { border-color: #38bdf8 !important; box-shadow: 0 0 15px rgba(56, 189, 248, 0.3) !important; }
            @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes glowPulse { 0% { box-shadow: 0 0 10px rgba(16,185,129,0.2); } 50% { box-shadow: 0 0 20px rgba(16,185,129,0.5); } 100% { box-shadow: 0 0 10px rgba(16,185,129,0.2); } }
            .success-pulse { animation: glowPulse 2s infinite !important; border-color: #10b981 !important; }
        </style>
        <div style="max-width: 1100px; width: 100%; background: linear-gradient(180deg, rgba(30, 35, 50, 0.8) 0%, rgba(15, 20, 30, 0.95) 100%); border: 1px solid rgba(255, 255, 255, 0.08); border-top: 1px solid rgba(255, 255, 255, 0.15); border-radius: 32px; padding: 48px 40px; position: relative; max-height: 90vh; overflow-y: auto; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
            
            <!-- Close Button -->
            <button onclick="document.getElementById('pricingModal').classList.add('hidden');" style="position: absolute; top: 24px; right: 24px; width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.05); color: rgba(255,255,255,0.6); font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.color='white'" onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.color='rgba(255,255,255,0.6)'">
                ×
            </button>

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 48px;">
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #facc15; letter-spacing: 2px; margin-bottom: 16px; border: 1px solid rgba(250, 204, 21, 0.3); display: inline-block; padding: 6px 16px; border-radius: 20px; background: rgba(250, 204, 21, 0.1);">
                    ${isFull ? 'Zen Full' : 'Limited Time Offer'}
                </div>
                <h2 style="font-size: 42px; font-weight: 800; color: white; margin-bottom: 16px; letter-spacing: -1px;">Upgrade Your Frequency</h2>
                <p style="font-size: 18px; color: #94a3b8;">Choose the plan that fits your journey.</p>
            </div>

            <!-- Pricing Cards Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 32px; align-items: stretch;">
                
                <!-- Free Tier -->
                <div class="pricing-tier" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; padding: 32px; display: flex; flex-direction: column;">
                    <div style="padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                        <h3 style="font-size: 24px; font-weight: 700; color: white; margin-bottom: 8px;">Free</h3>
                        <p style="font-size: 14px; color: #94a3b8;">Essentials for beginners</p>
                        <div style="margin-top: 20px;">
                            <span style="font-size: 36px; font-weight: 800; color: white;">${PRICING_CONFIG.free.price}</span>
                            <span style="color: #64748b; font-weight: 500;">${PRICING_CONFIG.free.period}</span>
                        </div>
                        <div style="margin-top: 12px; font-size: 13px; color: #ef4444; font-weight: 600; display: inline-block; background: rgba(239,68,68,0.1); padding: 4px 12px; border-radius: 8px;">⚠️ ${PRICING_CONFIG.free.limitText}</div>
                    </div>
                    <ul style="list-style: none; padding: 0; margin-bottom: 32px; flex-grow: 1;">
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.8); display: flex; gap: 12px;">
                            <span style="color: #64748b;">✓</span> Delta Waves Only
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.8); display: flex; gap: 12px;">
                            <span style="color: #64748b;">✓</span> 15 Minutes / Day
                        </li>
                    </ul>
                    <button disabled style="width: 100%; padding: 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; color: rgba(255, 255, 255, 0.4); font-weight: 700; margin-bottom: 12px;">Currently Active</button>
                    <button id="referralBtn" style="width: 100%; padding: 16px; background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 16px; color: #38bdf8; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; transition: all 0.2s;" onmouseover="this.style.background='rgba(56,189,248,0.1)'" onmouseout="this.style.background='rgba(56,189,248,0.05)'">
                        <span>🎁</span> Give 1 Month, Get 1 Month
                    </button>
                </div>

                <!-- Zen Tier (Previously Nirvana) -->
                <div class="pricing-tier zen-tier" style="background: linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(6, 78, 59, 0.2)); border: 2px solid #10b981; border-radius: 24px; padding: 32px; position: relative; display: flex; flex-direction: column;">
                    <div style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #10b981; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; color: white; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 10px rgba(16,185,129,0.3);">Most Popular</div>
                    
                    <div style="padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid rgba(16, 185, 129, 0.2);">
                        <h3 style="font-size: 24px; font-weight: 700; color: white; margin-bottom: 8px;">${PRICING_CONFIG.zen.name}</h3>
                        <p style="font-size: 14px; color: #6ee7b7;">${PRICING_CONFIG.zen.description}</p>
                        <div style="margin-top: 20px;">
                            <span style="font-size: 48px; font-weight: 800; color: white; letter-spacing: -1px;">${currentZenPrice}</span>
                            <span style="color: #6ee7b7; font-weight: 500;">${PRICING_CONFIG.zen.period}</span>
                        </div>
                        <div style="font-size: 12px; color: #fbbf24; margin-top: 12px; font-weight: 600; background: rgba(251,191,36,0.1); display: inline-block; padding: 4px 12px; border-radius: 8px;">${isFull ? '⚠️ Standard Rate ACTIVE' : PRICING_CONFIG.zen.warning}</div>
                    </div>

                    <ul style="list-style: none; padding: 0; margin-bottom: 32px; flex-grow: 1;">
                        <li style="padding: 10px 0; color: white; display: flex; gap: 12px; font-weight: 600;">
                            <span style="color: #10b981; text-shadow: 0 0 10px rgba(16,185,129,0.5);">✓</span> <strong>${PRICING_CONFIG.zen.limitText}</strong>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; gap: 12px;">
                            <span style="color: #10b981;">✓</span> Advanced Matrix Visualizers
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; gap: 12px;">
                            <span style="color: #10b981;">✓</span> Full 30-Day Journey & Stories
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; gap: 12px; opacity: 0.7;">
                            <span style="color: #ef4444;">✗</span> Personal Use Only (No Commercial)
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; gap: 12px;">
                            <span style="color: #10b981;">✓</span> Offline MP3 Export
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; gap: 12px;">
                            <span style="color: #10b981;">✓</span> AI Custom Frequencies <span style="font-size: 10px; background: rgba(16,185,129,0.3); padding: 2px 6px; border-radius: 4px;">BETA</span>
                        </li>
                    </ul>

                    <button id="upgradeBtnFounders" style="width: 100%; padding: 18px; background: linear-gradient(135deg, #10b981, #059669); border: none; border-radius: 16px; color: white; font-size: 16px; font-weight: 800; cursor: pointer; transition: all 0.2s; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);">
                        Join Zen
                    </button>
                </div>

                <!-- Thrive Tier -->
                <div class="pricing-tier" style="background: rgba(236, 72, 153, 0.05); border: 1px solid rgba(236, 72, 153, 0.2); border-radius: 24px; padding: 32px; display: flex; flex-direction: column;">
                    <div style="padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid rgba(236, 72, 153, 0.2);">
                        <h3 style="font-size: 24px; font-weight: 700; color: white; margin-bottom: 8px;">${PRICING_CONFIG.thrive.name}</h3>
                        <p style="font-size: 14px; color: #fbcfe8;">${PRICING_CONFIG.thrive.description}</p>
                        <div style="margin-top: 20px;">
                            <span style="font-size: 36px; font-weight: 800; color: white; letter-spacing: -1px;">${currentThrivePrice}</span>
                            <span style="color: #fbcfe8; font-weight: 500;">${PRICING_CONFIG.thrive.period}</span>
                        </div>
                        <div style="font-size: 12px; color: #fbbf24; margin-top: 12px; font-weight: 600; background: rgba(251,191,36,0.1); display: inline-block; padding: 4px 12px; border-radius: 8px;">${PRICING_CONFIG.thrive.warning}</div>
                    </div>
                    <ul style="list-style: none; padding: 0; margin-bottom: 32px; flex-grow: 1;">
                        <li style="padding: 10px 0; color: white; display: flex; gap: 12px; font-weight: 600;">
                            <span style="color: #f472b6;">✓</span> Everything in Zen
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; gap: 12px;">
                            <span style="color: #f472b6;">✓</span> <strong>${PRICING_CONFIG.thrive.limitText}</strong>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; gap: 12px;">
                            <span style="color: #f472b6;">✓</span> Advanced Matrix Visualizers
                        </li>
                        <li style="padding: 10px 0; color: #f472b6; display: flex; gap: 12px; font-weight: 700;">
                            <span style="color: #f472b6;">✓</span> Full Commercial Use License
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; gap: 12px;">
                            <span style="color: #f472b6;">✓</span> Offline MP3 Export
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; gap: 12px;">
                            <span style="color: #f472b6;">✓</span> AI Custom Frequencies <span style="font-size: 10px; background: rgba(236,72,153,0.3); padding: 2px 6px; border-radius: 4px;">BETA</span>
                        </li>
                    </ul>
                    <button id="upgradeBtnThrive" style="width: 100%; padding: 18px; background: rgba(236, 72, 153, 0.15); border: 1px solid rgba(236, 72, 153, 0.5); border-radius: 16px; color: white; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(236,72,153,0.25)'" onmouseout="this.style.background='rgba(236,72,153,0.15)'">
                        Go Thrive
                    </button>
                </div>
            </div>

            <!-- Special Lifetime Offer Section -->
            <div id="lifetimeOfferSec" class="lifetime-offer" style="width: 100%; clear: both; background: linear-gradient(145deg, rgba(251, 191, 36, 0.1), rgba(180, 83, 9, 0.2)); border: 2px solid rgba(251, 191, 36, 0.3); border-radius: 32px; padding: 48px; position: relative; margin-bottom: 40px; overflow: hidden;">
                <div style="position: absolute; top: -50%; right: -20%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%); pointer-events: none;"></div>
                
                <div style="display: flex; flex-wrap: wrap; gap: 48px; align-items: center; position: relative; z-index: 1;">
                    <div style="flex: 1; min-width: 320px;">
                        <div style="background: linear-gradient(90deg, #f59e0b, #d97706); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 800; color: white; text-transform: uppercase; display: inline-block; margin-bottom: 20px; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(245,158,11,0.3);">Special Limited Offer</div>
                        <h3 style="font-size: 42px; font-weight: 800; color: white; margin-bottom: 12px; letter-spacing: -1px;">${PRICING_CONFIG.lifetime.name}</h3>
                        <p style="font-size: 20px; color: #fcd34d; margin-bottom: 32px; font-weight: 500;">One-time payment. Every feature. Forever.</p>
                        
                        <div style="margin-bottom: 36px; display: flex; align-items: baseline; gap: 16px;">
                            <span style="font-size: 64px; font-weight: 800; color: white; letter-spacing: -2px;">${PRICING_CONFIG.lifetime.price}</span>
                            <span style="font-size: 24px; color: rgba(255,255,255,0.4); text-decoration: line-through; font-weight: 600;">$999</span>
                        </div>
                        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; font-size: 14px; font-weight: 700; padding: 10px 20px; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 32px; animation: glowPulse 2.5s infinite;">
                            <span>🔥</span> Only ${isFull ? 'a few' : spots} Zen Member spots left
                        </div>

                        <button id="upgradeBtnLifetime" style="width: 100%; max-width: 400px; padding: 22px 40px; background: linear-gradient(135deg, #fbbf24, #f59e0b); border: none; border-radius: 20px; color: black; font-size: 20px; font-weight: 800; cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4);" onmouseover="this.style.transform='scale(1.02) translateY(-2px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
                            Get Eternity Access
                        </button>
                    </div>

                    <div style="flex: 1.2; min-width: 320px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 40px; backdrop-filter: blur(10px);">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                            <div style="display: flex; align-items: center; gap: 16px; color: white; font-weight: 600; font-size: 15px;">
                                <span style="font-size: 24px; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.5);">★</span> Unlimited Cloud Saves
                            </div>
                            <div style="display: flex; align-items: center; gap: 16px; color: white; font-weight: 600; font-size: 15px;">
                                <span style="font-size: 24px; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.5);">★</span> All Premium Visuals
                            </div>
                            <div style="display: flex; align-items: center; gap: 16px; color: white; font-weight: 600; font-size: 15px;">
                                <span style="font-size: 24px; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.5);">★</span> Commercial License
                            </div>
                            <div style="display: flex; align-items: center; gap: 16px; color: white; font-weight: 600; font-size: 15px;">
                                <span style="font-size: 24px; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.5);">★</span> Future Beta Access
                            </div>
                            <div style="display: flex; align-items: center; gap: 16px; color: white; font-weight: 600; font-size: 15px;">
                                <span style="font-size: 24px; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.5);">★</span> VIP Support
                            </div>
                            <div style="display: flex; align-items: center; gap: 16px; color: white; font-weight: 600; font-size: 15px;">
                                <span style="font-size: 24px; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.5);">★</span> Ad-Free Forever
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Testimonials -->
                <div style="margin-top: 48px; border-top: 1px solid rgba(251, 191, 36, 0.15); padding-top: 48px;">
                    <h4 style="text-align: center; color: rgba(251,191,36,0.8); font-size: 13px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 32px; font-weight: 800;">Real Results from Eternity Members</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                        ${renderTestimonials()}
                    </div>
                </div>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 24px; max-width: 1000px; margin: 0 auto; margin-top: 32px;">
                <!-- Group Discounts Section -->
                <div style="flex: 1; min-width: 300px; padding: 32px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; text-align: center;">
                    <div style="font-size: 32px; margin-bottom: 12px;">🤝</div>
                    <h4 style="color: white; font-size: 18px; font-weight: 700; margin-bottom: 12px;">Group Discounts</h4>
                    <p style="color: #94a3b8; font-size: 14px; margin-bottom: 24px; line-height: 1.6;">Special rates for corporations, organizations, and families to help everyone access their best mental state.</p>
                    <button id="inquiryBtn" style="padding: 12px 24px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
                       Inquire About Groups
                    </button>
                </div>

                <!-- Coupon Code Section -->
                <div style="flex: 1; min-width: 300px; padding: 32px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                    <div style="font-size: 32px; margin-bottom: 12px;">🎟️</div>
                    <button id="toggleCouponBtn" style="background: none; border: none; color: #38bdf8; font-size: 16px; font-weight: 700; cursor: pointer; margin-bottom: 0; transition: color 0.2s;" onmouseover="this.style.color='#7dd3fc'" onmouseout="this.style.color='#38bdf8'">I have a promo code</button>
                    
                    <div id="couponInputCont" class="hidden coupon-input-wrapper" style="margin-top: 16px; display: flex; gap: 12px;">
                        <input type="text" id="couponCodeInput" placeholder="Enter VIP code" style="flex: 1; min-width: 0; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 12px 16px; color: white; font-size: 15px; outline: none; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
                        <button id="applyCouponBtn" style="padding: 12px 24px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; color: #38bdf8; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(56,189,248,0.2)'" onmouseout="this.style.background='rgba(56,189,248,0.1)'">Apply</button>
                    </div>
                    <div id="couponStatus" style="font-size: 13px; font-weight: 600; margin-top: 16px; display: none;"></div>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 32px; margin-top: 48px;">
                <p style="font-size: 14px; color: rgba(255, 255, 255, 0.4); font-weight: 500;">Questions? Contact founders@mindwave.com</p>
            </div>

        </div>
    `;

    // Handle Zen Upgrade Click
    const upgradeBtnFounders = modal.querySelector('#upgradeBtnFounders');

    // Handle Thrive Upgrade Click
    const btnThrive = modal.querySelector('#upgradeBtnThrive');
    if (btnThrive) {
        btnThrive.addEventListener('click', () => {
            btnThrive.textContent = 'Processing...';
            handleUpgrade(PRICING_CONFIG.thrive.productId, 'monthly');
        });
    }

    // Handle Lifetime Upgrade Click
    const upgradeBtnLifetime = modal.querySelector('#upgradeBtnLifetime');
    if (upgradeBtnLifetime) {
        upgradeBtnLifetime.addEventListener('click', () => {
            const coupon = modal.querySelector('#couponCodeInput')?.value.trim();
            handleUpgrade(PRICING_CONFIG.lifetime.productId, 'oneTime', coupon);
        });
    }

    // Handle Subscription Upgrade Clicks (passing coupon)
    if (upgradeBtnFounders) {
        upgradeBtnFounders.onclick = () => {
            trackConversion('pricing_cta', 'upgrade_click', { tier: 'zen' });
            let coupon = modal.querySelector('#couponCodeInput')?.value.trim();
            if (!coupon && dynamicPricing && !dynamicPricing.isFull) {
                coupon = dynamicPricing.zen.coupon;
            }
            handleUpgrade(PRICING_CONFIG.zen.productId, 'monthly', coupon);
        };
    }

    // Handle Coupon UI
    const toggleBtn = modal.querySelector('#toggleCouponBtn');
    const inputCont = modal.querySelector('#couponInputCont');
    const applyBtn = modal.querySelector('#applyCouponBtn');
    const couponInput = modal.querySelector('#couponCodeInput');
    const statusDiv = modal.querySelector('#couponStatus');

    if (toggleBtn && inputCont) {
        toggleBtn.onclick = () => {
            inputCont.classList.toggle('hidden');
            if (!inputCont.classList.contains('hidden')) {
                couponInput.focus();
                toggleBtn.style.display = 'none';
            }
        };
    }

    if (applyBtn && couponInput) {
        applyBtn.onclick = async () => {
            const code = couponInput.value.trim().toUpperCase();
            if (code) {
                // Admin Mode Bypass
                if (code === 'NIRVANAPEACE') {
                    console.log(`[Admin] Admin Mode Unlocked via code.`);
                    window.__MOCK_PREMIUM = true;
                    localStorage.setItem('mindwave_admin', 'true');
                    localStorage.setItem('mindwave_premium', 'true');
                    localStorage.setItem('mindwave_lifetime', 'true');
                    localStorage.setItem('mindwave_special_tier', 'NirvanaPeace');
                    
                    statusDiv.textContent = `Admin Access Granted. Unlocking Studio...`;
                    statusDiv.style.color = '#f59e0b'; // Amber
                    statusDiv.style.display = 'block';
                    applyBtn.textContent = 'Unlocked';
                    applyBtn.style.background = 'rgba(245, 158, 11, 0.2)';
                    applyBtn.style.borderColor = '#f59e0b';
                    applyBtn.style.color = '#f59e0b';
                    couponInput.classList.add('success-pulse');
                    
                    if (window.showToast) window.showToast('Admin Mode Active. Welcome.', 'success');
                    
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                    return;
                }

                // Yogananda Nirvana Bypass
                if (code === 'YOGANANDA') {
                    console.log(`[Bypass] Nirvana Access Unlocked via YOGANANDA.`);
                    window.__MOCK_PREMIUM = true;
                    localStorage.setItem('mindwave_premium', 'true');
                    localStorage.removeItem('mindwave_lifetime'); // Specifically not lifetime
                    localStorage.setItem('mindwave_tier', 'nirvana');
                    localStorage.setItem('mindwave_special_tier', 'Yogananda');
                    
                    statusDiv.textContent = `Nirvana Access Granted. Welcome to Bliss.`;
                    statusDiv.style.color = '#10b981'; // Green
                    statusDiv.style.display = 'block';
                    applyBtn.textContent = 'Unlocked';
                    applyBtn.style.background = 'rgba(16, 185, 129, 0.2)';
                    applyBtn.style.borderColor = '#10b981';
                    applyBtn.style.color = '#10b981';
                    couponInput.classList.add('success-pulse');
                    
                    if (window.showToast) window.showToast('Nirvana Access Active.', 'success');
                    
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                    return;
                }

                // Check if it's a 100% bypass code immediately
                try {
                    const { validateDiscountCode } = await import('../utils/discount-codes.js');
                    const discountInfo = validateDiscountCode(code);
                    if (discountInfo && discountInfo.discount === 100) {
                        applyBtn.textContent = 'Verifying...';
                        handleUpgrade(PRICING_CONFIG.lifetime.productId, 'oneTime', code);
                        return;
                    }
                } catch (e) {
                    console.warn('[Pricing] Discount validation error:', e);
                }

                statusDiv.textContent = `Discount code "${code}" recognized!`;
                statusDiv.style.color = '#10b981';
                statusDiv.style.display = 'block';
                applyBtn.textContent = 'Applied';
                applyBtn.style.background = 'rgba(16, 185, 129, 0.2)';
                applyBtn.style.borderColor = '#10b981';
                applyBtn.style.color = '#10b981';
                couponInput.classList.add('success-pulse');
            }
        };
    }

    // Handle Referral Button
    const referralBtn = modal.querySelector('#referralBtn');
    if (referralBtn) {
        referralBtn.addEventListener('click', async () => {
            const result = await shareReferral();
            if (result.success) {
                const text = result.copied ? 'Link Copied!' : 'Shared!';
                referralBtn.innerHTML = `<span>✅</span> ${text}`;
                setTimeout(() => {
                    referralBtn.innerHTML = `<span>🎁</span> Give 1 Month, Get 1 Month`;
                }, 2000);
            } else if (result.error === 'not_logged_in') {
                alert("Please sign in to invite friends!");
            }
        });
    }

    // Handle Inquiry Button
    const inquiryBtn = modal.querySelector('#inquiryBtn');
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', () => {
            // Optional: hide the pricing modal if you prefer
            // hidePricingModal(); 
            showInquiryForm();
        });
    }

    // Hover effects
    [upgradeBtnFounders, btnThrive, upgradeBtnLifetime].forEach(btn => {
        if (btn) {
            btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-2px)');
            btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');
        }
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hidePricingModal();
        }
    });

    return modal;
}

// Separate function to update HTML to avoid undefined errors during refactor
// (Use multi_replace in next step if needed)

async function handleUpgrade(productId, billingPeriod = 'monthly', couponCode = null) {
    if (window.trackUpgradeClick) {
        window.trackUpgradeClick('pricing_modal', productId);
    }

    try {
        // --- 100% Promo Code Bypass ---
        // If the user has a 100% off code, completely bypass Stripe checkout 
        // and instantly unlock premium locally for friends & family testing.
        if (couponCode && couponCode.trim().toUpperCase() === 'YOGANANDA') {
            console.log(`[Pricing] 100% Promo Code (${couponCode}) applied. Bypassing Stripe checkout.`);

            // Activate local app overrides directly
            window.__MOCK_PREMIUM = true;
            localStorage.setItem('mindwave_premium', 'true');
            localStorage.setItem('mindwave_lifetime', 'true');
            localStorage.setItem('mindwave_tier', 'lifetime');

            if (window.showToast) {
                window.showToast('Premium Unlocked! 🚀 Welcome to MindWave.', 'success');
            } else {
                alert('Premium Unlocked! 🚀 Welcome to MindWave.');
            }

            // Sync with Firestore in the background without blocking the UI
            setTimeout(async () => {
                try {
                    const { trackDiscountUsage } = await import('../utils/discount-codes.js');
                    if (trackDiscountUsage) trackDiscountUsage(couponCode, productId);
                    
                    const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js');
                    const authInstance = getAuth();
                    if (authInstance && authInstance.currentUser) {
                        const { updateUserProfile } = await import('../services/firebase.js');
                        await updateUserProfile(authInstance.currentUser.uid, {
                            isPremium: true,
                            isLifetime: true,
                            tier: 'lifetime',
                            usedPromoCodes: [couponCode],
                            unlockedAt: Date.now()
                        });
                    }
                } catch (e) {
                    console.warn('[Pricing] Non-critical error syncing promo code to profile', e);
                }
            }, 100);

            if (window.hidePricingModal) {
                window.hidePricingModal();
            }

            // Reload to ensure all components recognize premium status
            setTimeout(() => window.location.reload(), 1500);
            return; // Short-circuit, don't run Stripe checkout
        }
        // ------------------------------

        // Map products to existing stripe logic
        goToCheckout(productId, billingPeriod, couponCode);
    } catch (error) {
        console.error('[Pricing] Checkout error:', error);
        if (error.message.includes('logged in')) {
            if (window.openAuthModal) {
                window.openAuthModal();
            } else {
                alert('Please sign in to continue with your upgrade.');
            }
        } else {
            alert(error.message);
        }
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.showPricingModal = showPricingModal;
        window.hidePricingModal = hidePricingModal;

        // Defer attaching listeners until modal is created
    });
} else {
    window.showPricingModal = showPricingModal;
    window.hidePricingModal = hidePricingModal;
}
