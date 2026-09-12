/**
 * Interstellar Game - Monetization Module
 * Integrates RevenueCat Capacitor SDK for In-App Purchases on iOS and Android.
 */

class MonetizationManager {
    constructor() {
        this.isInitialized = false;
        this.products = [];
        this.apiKey = "test_DScnuIzcQIpisSYmPbAGoOnUpPp"; // Provided by User
        this.googleApiKey = "test_DScnuIzcQIpisSYmPbAGoOnUpPp"; // Provided by User
    }

    async init() {
        if (!window.Capacitor || !window.Capacitor.Plugins.Purchases) {
            console.warn("Monetization: Not running in a Capacitor environment. Using mock products.");
            this.setupMockStore();
            return;
        }

        try {
            // Setup RevenueCat based on platform
            const isIOS = window.Capacitor.getPlatform() === 'ios';
            const key = isIOS ? this.apiKey : this.googleApiKey;
            
            await window.Capacitor.Plugins.Purchases.configure({ apiKey: key });
            this.isInitialized = true;
            console.log("Monetization: RevenueCat Initialized");

            await this.fetchOfferings();
        } catch (error) {
            console.error("Monetization: Failed to initialize RevenueCat", error);
            this.setupMockStore();
        }
    }

    async fetchOfferings() {
        try {
            const offerings = await window.Capacitor.Plugins.Purchases.getOfferings();
            if (offerings.current && offerings.current.availablePackages.length !== 0) {
                this.products = offerings.current.availablePackages;
                this.renderStoreUI();
            } else {
                console.log("Monetization: No offerings found.");
                this.setupMockStore();
            }
        } catch (error) {
            console.error("Monetization: Failed to fetch offerings", error);
            this.setupMockStore();
        }
    }

    setupMockStore() {
        // Fallback for web / development
        this.products = [
            { identifier: 'gem_pack_small', packageType: 'CUSTOM', product: { title: '1,000 Gems', priceString: '$0.99', description: 'A small boost for beginners.' }, gemValue: 1000 },
            { identifier: 'gem_pack_medium', packageType: 'CUSTOM', product: { title: '5,000 Gems', priceString: '$3.99', description: 'The most popular choice.' }, gemValue: 5000 },
            { identifier: 'gem_pack_large', packageType: 'CUSTOM', product: { title: '20,000 Gems', priceString: '$9.99', description: 'Unlock the biggest ships instantly.' }, gemValue: 20000 }
        ];
        this.renderStoreUI();
    }

    renderStoreUI() {
        const container = document.getElementById('storeProductsContainer');
        if (!container) return;

        container.innerHTML = '';
        
        this.products.forEach(pkg => {
            const product = pkg.product || pkg;
            const price = product.priceString;
            const title = product.title.replace('(Interstellar)', '');
            const gemValue = pkg.gemValue || parseInt(title.replace(/[^0-9]/g, '')) || 1000;
            
            const card = document.createElement('div');
            card.className = 'store-card';
            card.style.cssText = `
                background: rgba(0, 0, 0, 0.6);
                border: 1px solid #00f3ff;
                border-radius: 8px;
                padding: 15px;
                width: 150px;
                text-align: center;
                transition: transform 0.2s, box-shadow 0.2s;
                cursor: pointer;
            `;
            
            card.onmouseover = () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 5px 15px rgba(0,243,255,0.4)';
            };
            card.onmouseout = () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            };
            
            card.onclick = () => this.purchasePackage(pkg, gemValue);
            
            card.innerHTML = `
                <div style="font-size: 30px; margin-bottom: 10px;">💎</div>
                <div style="color: #fff; font-weight: bold; font-size: 14px; margin-bottom: 5px;">${title}</div>
                <div style="color: #00ff00; font-weight: bold; font-size: 18px; margin-top: 10px;">${price}</div>
            `;
            
            container.appendChild(card);
        });
    }

    async purchasePackage(pkg, gemValue) {
        if (window.Capacitor && window.Capacitor.Plugins.Haptics) {
            window.Capacitor.Plugins.Haptics.impact({ style: 'medium' });
        }
        
        try {
            console.log(`Monetization: Attempting to purchase ${pkg.identifier || pkg.product.title}`);
            
            let purchaseSuccessful = false;
            
            if (this.isInitialized) {
                // Native RevenueCat Purchase
                const { customerInfo } = await window.Capacitor.Plugins.Purchases.purchasePackage({ aPackage: pkg });
                purchaseSuccessful = true;
            } else {
                // Web Mock Purchase
                alert(`[DEVELOPMENT MODE]\nSimulating purchase of ${pkg.product.title} for ${pkg.product.priceString}.`);
                purchaseSuccessful = true;
            }

            if (purchaseSuccessful) {
                this.grantGems(gemValue);
                if (window.game) window.game.hideStoreModal();
                this.logAnalytics('purchase_completed', { value: gemValue, item: pkg.identifier });
            }
        } catch (error) {
            console.error("Monetization: Purchase failed or cancelled", error);
            if (!error.userCancelled) {
                alert("Purchase failed. Please try again.");
            }
        }
    }

    grantGems(amount) {
        // Find current gems
        const currentGemsStr = localStorage.getItem('playerGems') || "0";
        let currentGems = parseInt(currentGemsStr);
        if (isNaN(currentGems)) currentGems = 0;
        
        // Add new gems
        currentGems += amount;
        
        // Save back
        localStorage.setItem('playerGems', currentGems.toString());
        
        // Update UI if in Hangar
        if (window.game && window.game.updateHangarUI) {
            window.game.updateHangarUI();
        } else {
            // Force update UI element if open
            const el = document.getElementById('hangarGemBalance');
            if (el) el.innerText = currentGems;
        }
        
        // Notify player
        if (window.app && window.app.showToast) {
            window.app.showToast(`+${amount} Gems Added!`, '#00ff00');
        } else {
            alert(`Purchase successful! Added ${amount} Gems.`);
        }
    }
    
    logAnalytics(eventName, params) {
        // Firebase Analytics integration (mock implementation, real integration via plugin if available)
        console.log(`[ANALYTICS] Event: ${eventName}`, params);
        if (window.Capacitor && window.Capacitor.Plugins.FirebaseAnalytics) {
            window.Capacitor.Plugins.FirebaseAnalytics.logEvent({
                name: eventName,
                params: params
            }).catch(e => console.log('Analytics Error:', e));
        }
    }
}

// Initialize on load
window.monetization = new MonetizationManager();
document.addEventListener('DOMContentLoaded', () => {
    window.monetization.init();
});
