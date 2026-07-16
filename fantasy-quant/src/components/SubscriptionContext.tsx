'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type SubscriptionTier = 'Free' | 'Pro' | 'Max';

interface SubscriptionContextType {
  tier: SubscriptionTier;
  setTier: (tier: SubscriptionTier) => void;
  isLoading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [tier, setTierState] = useState<SubscriptionTier>('Free');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved tier from local storage on mount
    const savedTier = localStorage.getItem('fq_subscription_tier');
    if (savedTier && ['Free', 'Pro', 'Max'].includes(savedTier)) {
      setTierState(savedTier as SubscriptionTier);
    }
    setIsLoading(false);
  }, []);

  const setTier = (newTier: SubscriptionTier) => {
    setTierState(newTier);
    localStorage.setItem('fq_subscription_tier', newTier);
  };

  return (
    <SubscriptionContext.Provider value={{ tier, setTier, isLoading }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
