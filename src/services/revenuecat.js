import { Purchases } from '@revenuecat/purchases-capacitor';

export const initRevenueCat = async () => {
    try {
        if (!window.Capacitor || !window.Capacitor.isNativePlatform()) {
            console.log('Skipping RevenueCat initialization on web platform.');
            return false;
        }

        const isIOS = window.Capacitor.getPlatform() === 'ios';
        const apiKey = isIOS 
            ? import.meta.env.VITE_REVENUECAT_APPLE_KEY 
            : import.meta.env.VITE_REVENUECAT_GOOGLE_KEY;

        if (!apiKey) {
            console.error('RevenueCat API key is missing from environment variables.');
            return false;
        }

        await Purchases.configure({ apiKey });
        console.log('RevenueCat initialized successfully.');
        return true;
    } catch (e) {
        console.error('Failed to initialize RevenueCat:', e);
        return false;
    }
};

export const getOfferings = async () => {
    try {
        const offerings = await Purchases.getOfferings();
        return offerings.current !== null ? offerings.current.availablePackages : [];
    } catch (e) {
        console.error('Error fetching offerings:', e);
        return [];
    }
};

export const makePurchase = async (packageToBuy) => {
    try {
        const purchaseResult = await Purchases.purchasePackage({ aPackage: packageToBuy });
        if (typeof purchaseResult.customerInfo !== "undefined") {
            return purchaseResult.customerInfo;
        }
    } catch (e) {
        if (!e.userCancelled) {
            console.error('Purchase failed:', e);
        }
    }
    return null;
};
