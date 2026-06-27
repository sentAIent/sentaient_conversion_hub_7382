class NativeIntegration {
    constructor() {
        this.isNative = !!(window.Capacitor && window.Capacitor.isNative);
        console.log("NativeIntegration init, isNative:", this.isNative);
        this.revenueCatApiKey = 'YOUR_REVENUECAT_API_KEY'; // Placeholder
        this.initMonetization();
        this.requestNotificationPermission();
    }

    async requestNotificationPermission() {
        if (!this.isNative) return;
        try {
            const { LocalNotifications } = capacitorExports;
            if (LocalNotifications) {
                await LocalNotifications.requestPermissions();
            }
        } catch (e) {
            console.warn("LocalNotifications permission error:", e);
        }
    }

    async triggerHaptic(style = 'LIGHT') {
        if (!this.isNative) return; // Fallback to navigator.vibrate is handled separately if needed, or we just rely on Capacitor
        try {
            const { Haptics, ImpactStyle } = capacitorExports;
            if (Haptics && ImpactStyle) {
                const impactStyle = ImpactStyle[style] || ImpactStyle.Light;
                await Haptics.impact({ style: impactStyle });
            }
        } catch (e) {
            console.warn("Haptics error:", e);
        }
    }

    async scheduleBackgroundNotification() {
        if (!this.isNative) return;
        try {
            const { LocalNotifications } = capacitorExports;
            if (LocalNotifications) {
                // Cancel pending
                const pending = await LocalNotifications.getPending();
                if (pending.notifications.length > 0) {
                    await LocalNotifications.cancel(pending);
                }
                
                // Schedule new one for 24 hours from now
                await LocalNotifications.schedule({
                    notifications: [
                        {
                            title: "Storage Full!",
                            body: "Your Space Base has reached maximum capacity. Collect your earnings!",
                            id: 1,
                            schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 24) },
                            sound: null,
                            attachments: null,
                            actionTypeId: "",
                            extra: null
                        }
                    ]
                });
                console.log("Scheduled offline push notification.");
            }
        } catch (e) {
            console.warn("LocalNotifications error:", e);
        }
    }

    async initMonetization() {
        if (!this.isNative) return;
        try {
            const { Purchases } = capacitorExports;
            if (Purchases) {
                await Purchases.configure({ apiKey: this.revenueCatApiKey });
                console.log("RevenueCat configured.");
            }
        } catch (e) {
            console.warn("RevenueCat init error:", e);
        }
    }

    async purchaseProduct(productId) {
        if (!this.isNative) {
            console.log("Mock purchase in browser for product:", productId);
            return true; // Mock success
        }
        try {
            const { Purchases } = capacitorExports;
            if (Purchases) {
                const result = await Purchases.purchaseStoreProduct({ productIdentifier: productId });
                console.log("Purchase result:", result);
                return true;
            }
        } catch (e) {
            if (e.code === 'PURCHASE_CANCELLED') {
                console.log("User cancelled purchase");
            } else {
                console.error("Purchase error:", e);
            }
            return false;
        }
        return false;
    }
}

// Since we are using standard script tags and not a bundler for the main game, 
// Capacitor plugins are generally available globally on window if compiled, or we can import them if we use modules.
// For now, we mock the capacitorExports object. In a real Capacitor setup, plugins are registered globally.
const capacitorExports = window.Capacitor ? window.Capacitor.Plugins : {};

window.nativeIntegration = new NativeIntegration();
