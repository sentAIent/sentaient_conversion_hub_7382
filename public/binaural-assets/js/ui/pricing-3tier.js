/**
 * 3-Tier Pricing Modal with Feature Comparison
 * Free (Seeker) → Yogi → Buddha
 */

import { goToCheckout, PRICING_TIERS, getUserTier } from '../services/stripe-simple.js';
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
    // document.body.style.overflow = 'hidden';
}

export function hidePricingModal() {
    const modal = document.getElementById('pricingModal');
    if (modal) {
        modal.classList.add('hidden');
        // document.body.style.overflow = '';
    }
}

function createPricingModal(currentTier) {
    const modal = document.createElement('div');
    modal.id = 'pricingModal';
    modal.className = 'fixed inset-0 z-[300] flex items-center justify-center p-4 hidden';
    modal.style.background = 'rgba(0, 0, 0, 0.95)';
    modal.style.backdropFilter = 'blur(20px)';

    const yogiMonthly = PRICING_TIERS.yogi.monthlyPrice;
    const yogiAnnual = PRICING_TIERS.yogi.annualPrice;
    const yogiMonthlySavings = Math.round((1 - (yogiAnnual / 12) / yogiMonthly) * 100);

    const buddhaMonthly = PRICING_TIERS.buddha.monthlyPrice;
    const buddhaAnnual = PRICING_TIERS.buddha.annualPrice;
    const buddhaMonthlySavings = Math.round((1 - (buddhaAnnual / 12) / buddhaMonthly) * 100);

    modal.innerHTML = `
        <div style="max-width: 1200px; width: 100%; background: linear-gradient(180deg, rgba(25, 25, 40, 0.98) 0%, rgba(15, 15, 26, 0.98) 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 48px 32px; padding-bottom: 140px; position: relative; max-height: 90vh; overflow-y: auto;">
            
            <!-- Close Button -->
            <button onclick="document.getElementById('pricingModal').classList.add('hidden'); document.body.style.overflow = '';" style="position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-muted); font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                ×
            </button>

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 48px;">
                <h2 style="font-size: 42px; font-weight: 700; color: var(--accent); margin-bottom: 12px;">Choose Your Path</h2>
                <p style="font-size: 18px; color: var(--text-muted);">From beginner to enlightened mastery</p>
            </div>

            <!-- Billing Toggle -->
            <div style="display: flex; justify-content: center; margin-bottom: 32px;">
                <div style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 4px; display: inline-flex; gap: 4px;">
                    <button id="monthlyToggle" class="billing-toggle active" data-period="monthly" style="padding: 12px 24px; border-radius: 10px; background: var(--accent); border: none; color: var(--bg-main); font-weight: 600; cursor: pointer; transition: all 0.3s;">
                        Monthly
                    </button>
                    <button id="annualToggle" class="billing-toggle" data-period="annual" style="padding: 12px 24px; border-radius: 10px; background: transparent; border: none; color: var(--text-muted); font-weight: 600; cursor: pointer; transition: all 0.3s;">
                        Annual <span style="color: var(--accent); font-size: 12px; margin-left: 8px;">Save up to ${buddhaMonthlySavings}%</span>
                    </button>
                </div>
            </div>

            <!-- Pricing Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 48px;">
                
                <!-- Free Tier -->
                <div class="pricing-tier" data-tier="free" style="background: rgba(255, 255, 255, 0.03); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 32px; transition: all 0.3s;">
                    <div style="text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 24px; margin-bottom: 24px;">
                        <div style="font-size: 32px; margin-bottom: 12px;">🌱</div>
                        <h3 style="font-size: 24px; font-weight: 600; color: var(--accent); margin-bottom: 8px;">Seeker</h3>
                        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 24px;">Start your journey</p>
                        <div style="font-size: 48px; font-weight: 700; color: var(--text-main);">Free</div>
                        <div style="font-size: 14px; color: var(--text-muted); margin-top: 8px;">Forever</div>
                    </div>
                    <ul style="list-style: none; padding: 0; margin-bottom: 24px;">
                        <li style="padding: 10px 0; color: var(--text-muted); display: flex; align-items: start; gap: 12px;">
                            <span style="color: var(--accent); flex-shrink: 0;">✓</span>
                            <span>3 basic presets</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>15-minute sessions</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>1 session per day</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Journey Lessons 1-2</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Basic visualizer</span>
                        </li>
                    </ul>
                    ${currentTier === 'free' ? '<div style="padding: 14px; text-align: center; background: rgba(96, 169, 255, 0.1); border-radius: 12px; color: #60a9ff; font-weight: 600;">Current Plan</div>' : '<button disabled style="width: 100%; padding: 14px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; color: rgba(255, 255, 255, 0.4); font-weight: 600; cursor: not-allowed;">Current Plan</button>'}
                </div>

                <!-- Yogi Tier -->
                <div class="pricing-tier" data-tier="yogi" style="background: linear-gradient(135deg, rgba(96, 169, 255, 0.15) 0%, rgba(96, 169, 255, 0.05) 100%); border: 2px solid #60a9ff; border-radius: 16px; padding: 32px; transition: all 0.3s; position: relative; transform: scale(1.05);">
                    <div style="position: absolute; top: -12px; right: 24px; background: linear-gradient(135deg, #60a9ff 0%, #4c94ff 100%); padding: 6px 16px; border-radius: 12px; font-size: 12px; font-weight: 700; color: white;">
                        MOST POPULAR
                    </div>
                    <div style="text-align: center; border-bottom: 1px solid rgba(96, 169, 255, 0.3); padding-bottom: 24px; margin-bottom: 24px;">
                        <div style="font-size: 32px; margin-bottom: 12px;">🧘</div>
                        <h3 style="font-size: 24px; font-weight: 600; color: white; margin-bottom: 8px;">Yogi</h3>
                        <p style="font-size: 14px; color: rgba(255, 255, 255, 0.5); margin-bottom: 24px;">Committed practitioner</p>
                        <div class="price-display" data-tier="yogi">
                            <div class="monthly-price">
                                <div style="font-size: 48px; font-weight: 700; color: white;">$${yogiMonthly}</div>
                                <div style="font-size: 14px; color: rgba(255, 255, 255, 0.4); margin-top: 8px;">per month</div>
                            </div>
                            <div class="annual-price" style="display: none;">
                                <div style="font-size: 48px; font-weight: 700; color: white;">$${yogiAnnual}</div>
                                <div style="font-size: 14px; color: rgba(255, 255, 255, 0.4); margin-top: 8px;">per year ($${(yogiAnnual / 12).toFixed(2)}/mo)</div>
                            </div>
                        </div>
                    </div>
                    <ul style="list-style: none; padding: 0; margin-bottom: 24px;">
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; align-items: start; gap: 12px; font-weight: 600;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Everything in Seeker, plus:</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>15 premium presets</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Unlimited session time</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Journey Lessons 1-15</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>10 sleep stories</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Advanced visualizer</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Create custom mixes</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>No ads</span>
                        </li>
                    </ul>
                    <button class="checkout-btn" data-tier="yogi" style="width: 100%; padding: 16px; background: var(--accent); border: none; border-radius: 12px; color: var(--bg-main); font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s;">
                        ${currentTier === 'yogi' ? 'Current Plan' : 'Start Your Practice'}
                    </button>
                </div>

                <!-- Buddha Tier -->
                <div class="pricing-tier" data-tier="buddha" style="background: rgba(255, 255, 255, 0.03); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 32px; transition: all 0.3s;">
                    <div style="text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 24px; margin-bottom: 24px;">
                        <div style="font-size: 32px; margin-bottom: 12px;">☸️</div>
                        <h3 style="font-size: 24px; font-weight: 600; color: white; margin-bottom: 8px;">Buddha</h3>
                        <p style="font-size: 14px; color: rgba(255, 255, 255, 0.5); margin-bottom: 24px;">Enlightened mastery</p>
                        <div class="price-display" data-tier="buddha">
                            <div class="monthly-price">
                                <div style="font-size: 48px; font-weight: 700; color: white;">$${buddhaMonthly}</div>
                                <div style="font-size: 14px; color: rgba(255, 255, 255, 0.4); margin-top: 8px;">per month</div>
                            </div>
                            <div class="annual-price" style="display: none;">
                                <div style="font-size: 48px; font-weight: 700; color: white;">$${buddhaAnnual}</div>
                                <div style="font-size: 14px; color: rgba(255, 255, 255, 0.4); margin-top: 8px;">per year ($${(buddhaAnnual / 12).toFixed(2)}/mo)</div>
                            </div>
                        </div>
                    </div>
                    <ul style="list-style: none; padding: 0; margin-bottom: 24px;">
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.9); display: flex; align-items: start; gap: 12px; font-weight: 600;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Everything in Yogi, plus:</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>ALL presets (40+)</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>50+ sleep stories (weekly updates)</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>AI-powered recommendations</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Advanced Journey (30 lessons)</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Breathing exercises</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Video backgrounds</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Priority support</span>
                        </li>
                        <li style="padding: 10px 0; color: rgba(255, 255, 255, 0.7); display: flex; align-items: start; gap: 12px;">
                            <span style="color: #60a9ff; flex-shrink: 0;">✓</span>
                            <span>Community access</span>
                        </li>
                    </ul>
                    <button class="checkout-btn" data-tier="buddha" style="width: 100%; padding: 16px; background: var(--accent); border: none; border-radius: 12px; color: var(--bg-main); font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s;">
                        ${currentTier === 'buddha' ? 'Current Plan' : 'Achieve Mastery'}
                    </button>
                </div>

            </div>

            <!-- Discount Code Section -->
            <div id="discountSection" style="text-align: center; padding: 24px; margin-bottom: 24px;">
                <button id="showDiscountInput" style="color: #60a9ff; background: none; border: none; font-size: 14px; cursor: pointer; text-decoration: underline;">
                    Have a discount code?
                </button>
                
                <div id="discountInputContainer" style="display: none; margin-top: 16px;">
                    <div style="display: flex; gap: 12px; justify-content: center; max-width: 400px; margin: 0 auto;">
                        <input 
                            type="text" 
                            id="discountCodeInput" 
                            placeholder="Enter code (e.g., BETA10)" 
                            style="flex: 1; padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 12px; color: white; font-size: 14px; text-transform: uppercase;"
                        />
                        <button 
                            id="applyDiscountBtn" 
                            style="padding: 12px 24px; background: linear-gradient(135deg, #60a9ff 0%, #4c94ff 100%); border: none; border-radius: 12px; color: white; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap;"
                        >
                            Apply
                        </button>
                    </div>
                    
                    <div id="discountMessage" style="margin-top: 12px; font-size: 13px; min-height: 20px;"></div>
                    
                    <div id="discountBadge" style="display: none; margin-top: 16px; padding: 12px 20px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; display: inline-flex; align-items: center; gap: 8px;">
                        <span style="font-size: 20px;">🎉</span>
                        <div style="text-align: left;">
                            <div id="discountBadgeText" style="font-weight: 600; color: #10b981;"></div>
                            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.6); margin-top: 2px;">Code applied successfully</div>
                        </div>
                        <button id="removeDiscountBtn" style="margin-left: 8px; background: none; border: none; color: rgba(255, 255, 255, 0.4); cursor: pointer; font-size: 18px; line-height: 1;">×</button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="font-size: 13px; color: rgba(255, 255, 255, 0.4);">Secure payment via Stripe • Cancel anytime • 7-day satisfaction guarantee</p>
            </div>

        </div>
    `;

    setupPricingHandlers(modal);
    return modal;
}

function setupPricingHandlers(modal) {
    let currentPeriod = 'monthly';

    // Billing toggle
    const monthlyToggle = modal.querySelector('#monthlyToggle');
    const annualToggle = modal.querySelector('#annualToggle');

    function updateBillingPeriod(period) {
        currentPeriod = period;

        // Update toggle styles
        [monthlyToggle, annualToggle].forEach(btn => {
            if (btn.dataset.period === period) {
                btn.style.background = 'linear-gradient(135deg, #60a9ff 0%, #4c94ff 100%)';
                btn.style.color = 'white';
                btn.classList.add('active');
            } else {
                btn.style.background = 'transparent';
                btn.style.color = 'rgba(255, 255, 255, 0.6)';
                btn.classList.remove('active');
            }
        });

        // Update price displays
        modal.querySelectorAll('.price-display').forEach(display => {
            const monthlyPrice = display.querySelector('.monthly-price');
            const annualPrice = display.querySelector('.annual-price');

            if (period === 'monthly') {
                monthlyPrice.style.display = 'block';
                annualPrice.style.display = 'none';
            } else {
                monthlyPrice.style.display = 'none';
                annualPrice.style.display = 'block';
            }
        });
    }

    monthlyToggle.addEventListener('click', () => updateBillingPeriod('monthly'));
    annualToggle.addEventListener('click', () => updateBillingPeriod('annual'));

    // Discount Code Handling
    let appliedDiscount = null;
    const showDiscountBtn = modal.querySelector('#showDiscountInput');
    const discountContainer = modal.querySelector('#discountInputContainer');
    const discountInput = modal.querySelector('#discountCodeInput');
    const applyDiscountBtn = modal.querySelector('#applyDiscountBtn');
    const discountMessage = modal.querySelector('#discountMessage');
    const discountBadge = modal.querySelector('#discountBadge');
    const discountBadgeText = modal.querySelector('#discountBadgeText');
    const removeDiscountBtn = modal.querySelector('#removeDiscountBtn');

    // Import discount functions dynamically
    let validateDiscountCode, calculateDiscountedPrice, formatDiscount;
    import('../utils/discount-codes.js').then(module => {
        validateDiscountCode = module.validateDiscountCode;
        calculateDiscountedPrice = module.calculateDiscountedPrice;
        formatDiscount = module.formatDiscount;

        // Check for stored discount code
        const storedCode = module.getStoredDiscountCode();
        if (storedCode) {
            discountInput.value = storedCode;
            applyDiscount();
        }
    });

    showDiscountBtn.addEventListener('click', () => {
        discountContainer.style.display = 'block';
        showDiscountBtn.style.display = 'none';
        discountInput.focus();
    });

    function applyDiscount() {
        const code = discountInput.value.trim();

        if (!code) {
            showDiscountError('Please enter a discount code');
            return;
        }

        const discount = validateDiscountCode(code);

        if (!discount) {
            showDiscountError('Invalid discount code');
            return;
        }

        appliedDiscount = discount;

        // Show success message and badge
        discountMessage.textContent = '';
        discountBadgeText.textContent = `${formatDiscount(discount.discount)} ${discount.description}`;
        discountBadge.style.display = 'inline-flex';
        discountInput.disabled = true;
        applyDiscountBtn.disabled = true;
        applyDiscountBtn.textContent = 'Applied';

        // Update all price displays
        updatePricesWithDiscount(discount.discount);

        // Store discount code
        import('../utils/discount-codes.js').then(module => {
            module.storeDiscountCode(code);
            module.trackDiscountUsage(code, 'modal_view');
        });
    }

    function showDiscountError(message) {
        discountMessage.textContent = message;
        discountMessage.style.color = '#ef4444';
    }

    function updatePricesWithDiscount(discountPercent) {
        modal.querySelectorAll('.price-display').forEach(display => {
            const tier = display.dataset.tier;
            // Assuming PRICING_TIERS is defined globally or imported
            const PRICING_TIERS = {
                seeker: { monthlyPrice: 9.99, annualPrice: 99.99 },
                yogi: { monthlyPrice: 19.99, annualPrice: 199.99 },
                buddha: { monthlyPrice: 29.99, annualPrice: 299.99 }
            };
            const tierConfig = PRICING_TIERS[tier];

            const monthlyPriceDiv = display.querySelector('.monthly-price div:first-child');
            const annualPriceDiv = display.querySelector('.annual-price div:first-child');

            if (monthlyPriceDiv && tierConfig) {
                const originalMonthly = tierConfig.monthlyPrice;
                const discountedMonthly = calculateDiscountedPrice(originalMonthly, discountPercent);

                if (discountedMonthly === 0) {
                    monthlyPriceDiv.innerHTML = 'FREE';
                } else if (discountPercent > 0) {
                    monthlyPriceDiv.innerHTML = `
                        <span style="font-size: 32px; text-decoration: line-through; opacity: 0.4;">$${originalMonthly.toFixed(2)}</span>
                        <span style="font-size: 48px; font-weight: 700; color: #10b981;">$${discountedMonthly.toFixed(2)}</span>
                    `;
                } else {
                    monthlyPriceDiv.innerHTML = `$${originalMonthly.toFixed(2)}`;
                }
            }

            if (annualPriceDiv && tierConfig) {
                const originalAnnual = tierConfig.annualPrice;
                const discountedAnnual = calculateDiscountedPrice(originalAnnual, discountPercent);

                if (discountedAnnual === 0) {
                    annualPriceDiv.innerHTML = 'FREE';
                } else if (discountPercent > 0) {
                    annualPriceDiv.innerHTML = `
                        <span style="font-size: 32px; text-decoration: line-through; opacity: 0.4;">$${originalAnnual.toFixed(2)}</span>
                        <span style="font-size: 48px; font-weight: 700; color: #10b981;">$${discountedAnnual.toFixed(2)}</span>
                    `;
                } else {
                    annualPriceDiv.innerHTML = `$${originalAnnual.toFixed(2)}`;
                }
            }
        });
    }

    function removeDiscount() {
        appliedDiscount = null;
        discountBadge.style.display = 'none';
        discountInput.value = '';
        discountInput.disabled = false;
        applyDiscountBtn.disabled = false;
        applyDiscountBtn.textContent = 'Apply';
        discountMessage.textContent = ''; // Clear any error messages

        // Reset prices
        modal.querySelectorAll('.price-display').forEach(display => {
            const tier = display.dataset.tier;
            // Assuming PRICING_TIERS is defined globally or imported
            const PRICING_TIERS = {
                seeker: { monthlyPrice: 9.99, annualPrice: 99.99 },
                yogi: { monthlyPrice: 19.99, annualPrice: 199.99 },
                buddha: { monthlyPrice: 29.99, annualPrice: 299.99 }
            };
            const tierConfig = PRICING_TIERS[tier];

            if (tierConfig) {
                const monthlyPriceDiv = display.querySelector('.monthly-price div:first-child');
                const annualPriceDiv = display.querySelector('.annual-price div:first-child');

                if (monthlyPriceDiv) {
                    monthlyPriceDiv.innerHTML = `$${tierConfig.monthlyPrice.toFixed(2)}`;
                }

                if (annualPriceDiv) {
                    annualPriceDiv.innerHTML = `$${tierConfig.annualPrice.toFixed(2)}`;
                }
            }
        });

        // Clear stored discount
        import('../utils/discount-codes.js').then(module => {
            module.clearDiscountCode();
        });
    }

    applyDiscountBtn.addEventListener('click', applyDiscount);
    removeDiscountBtn.addEventListener('click', removeDiscount);

    // Allow Enter key to apply discount
    discountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyDiscount();
        }
    });

    // Checkout buttons
    modal.querySelectorAll('.checkout-btn').forEach(btn => {
        const tier = btn.dataset.tier;

        btn.addEventListener('click', () => {
            if (window.trackUpgradeClick) {
                window.trackUpgradeClick('pricing_modal', `${tier}_${currentPeriod}`);
            }

            try {
                const discountCode = appliedDiscount ? appliedDiscount.code : null;
                goToCheckout(tier, currentPeriod, discountCode);
            } catch (error) {
                console.error('[Pricing] Checkout error:', error);
                alert(error.message);
            }
        });

        // Hover effects
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // Card hover effects
    modal.querySelectorAll('.pricing-tier').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#60a9ff';
            if (!card.style.transform.includes('scale')) {
                card.style.transform = 'translateY(-4px)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.dataset.tier !== 'yogi') {
                card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
            if (!card.style.transform.includes('scale')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hidePricingModal();
        }
    });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricingUI);
} else {
    initPricingUI();
}

function initPricingUI() {
    // Expose global functions
    window.showPricingModal = showPricingModal;
    window.hidePricingModal = hidePricingModal;
}
