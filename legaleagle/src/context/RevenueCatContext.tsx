import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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
        // Mock initialization
        setIsInitialized(true);
        if (user) {
            // Suppose user has some property or we fetch their entitlement
            // For now, mock it false.
            setIsSubscribed(false);
        } else {
            setIsSubscribed(false);
        }
    }, [user]);

    const purchasePackage = async (pkg: any) => {
        console.log('Mock purchasing package', pkg);
        // Mock success
        setIsSubscribed(true);
        return true;
    };

    const restorePurchases = async () => {
        console.log('Mock restoring purchases');
        // Mock success if we had previous ones
        return true;
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
