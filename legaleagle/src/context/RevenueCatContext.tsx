import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import { Capacitor } from '@capacitor/core';
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';

interface RevenueCatContextType {
    isSubscribed: boolean;
    customerInfo: any | null;
    packages: any[];
    isInitialized: boolean;
    purchasePackage: (pkg: any) => Promise<boolean>;
    restorePurchases: () => Promise<boolean>;
}

const RevenueCatContext = createContext<RevenueCatContextType>({
    isSubscribed: false,
    customerInfo: null,
    packages: [],
    isInitialized: false,
    purchasePackage: async () => false,
    restorePurchases: async () => false,
});

export const useRevenueCat = () => useContext(RevenueCatContext);

export const RevenueCatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    
    // MOCK packages
    const [packages] = useState([
        {
            identifier: 'monthly',
            packageType: 'MONTHLY',
            product: {
                identifier: 'premium_monthly',
                title: 'Premium (Monthly)',
                description: 'Full access billed monthly',
                priceString: '$15.00'
            }
        },
        {
            identifier: 'annual',
            packageType: 'ANNUAL',
            product: {
                identifier: 'premium_annual',
                title: 'Premium (Annual)',
                description: 'Full access billed annually',
                priceString: '$120.00'
            }
        }
    ]);

    useEffect(() => {
        const initRevenueCat = async () => {
            if (Capacitor.isNativePlatform()) {
                try {
                    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
                    
                    if (Capacitor.getPlatform() === 'ios') {
                        await Purchases.configure({ apiKey: import.meta.env.VITE_REVENUECAT_IOS_KEY || 'api_key_ios' });
                    } else if (Capacitor.getPlatform() === 'android') {
                        await Purchases.configure({ apiKey: import.meta.env.VITE_REVENUECAT_ANDROID_KEY || 'api_key_android' });
                    }

                    if (user) {
                        await Purchases.logIn({ appUserID: user.id });
                        const { customerInfo } = await Purchases.getCustomerInfo();
                        setIsSubscribed(typeof customerInfo.entitlements.active['premium'] !== "undefined");
                    } else {
                        await Purchases.logOut();
                        setIsSubscribed(false);
                    }
                    setIsInitialized(true);
                } catch (error) {
                    console.error('Failed to initialize RevenueCat:', error);
                    setIsInitialized(true);
                }
            } else {
                // Mock initialization for web
                setIsInitialized(true);
                if (user) {
                    setIsSubscribed(false);
                } else {
                    setIsSubscribed(false);
                }
            }
        };

        initRevenueCat();
    }, [user]);

    const purchasePackage = async (pkg: any) => {
        if (Capacitor.isNativePlatform()) {
            try {
                // Attempt native purchase
                const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
                if (typeof customerInfo.entitlements.active['premium'] !== "undefined") {
                    setIsSubscribed(true);
                    return true;
                }
                return false;
            } catch (e: any) {
                if (!e.userCancelled) {
                    console.error('Error purchasing native package', e);
                }
                return false;
            }
        } else {
            try {
                console.log('Initiating checkout session for:', pkg.identifier);
                const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                    body: { packageId: pkg.identifier, priceId: pkg.product.identifier },
                });
                
                if (error) {
                    console.error('Error invoking checkout edge function', error);
                    return false;
                }
                
                if (data?.url) {
                    window.location.href = data.url;
                    return true;
                }
                return false;
            } catch (err) {
                console.error('Error in purchasePackage', err);
                return false;
            }
        }
    };

    const restorePurchases = async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                const { customerInfo } = await Purchases.restorePurchases();
                if (typeof customerInfo.entitlements.active['premium'] !== "undefined") {
                    setIsSubscribed(true);
                    return true;
                }
                return false;
            } catch (e) {
                console.error('Error restoring purchases', e);
                return false;
            }
        } else {
            console.log('Mock restoring purchases');
            // Mock success if we had previous ones
            return true;
        }
    };

    return (
        <RevenueCatContext.Provider value={{
            isSubscribed,
            customerInfo: null,
            packages,
            isInitialized,
            purchasePackage,
            restorePurchases
        }}>
            {children}
        </RevenueCatContext.Provider>
    );
};
