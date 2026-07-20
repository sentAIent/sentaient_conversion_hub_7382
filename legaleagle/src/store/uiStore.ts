import { create } from 'zustand';
import { THEMES } from '@/constants';
import type { Theme } from '@/types';

interface UIState {
    currentTheme: Theme;
    activeTab: string;
    prevTab: string | null;
    isRoastMode: boolean;
    isPricingModalOpen: boolean;
    isMobileMenuOpen: boolean;
    isAuthModalOpen: boolean;
    showEmailModal: boolean;
    hasAcceptedDisclaimer: boolean;
    
    // Actions
    setCurrentTheme: (theme: Theme) => void;
    setActiveTab: (tab: string) => void;
    setIsRoastMode: (isRoast: boolean) => void;
    setIsPricingModalOpen: (isOpen: boolean) => void;
    setIsMobileMenuOpen: (isOpen: boolean) => void;
    setIsAuthModalOpen: (isOpen: boolean) => void;
    setShowEmailModal: (show: boolean) => void;
    setHasAcceptedDisclaimer: (hasAccepted: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    currentTheme: THEMES.navy,
    activeTab: 'editor',
    prevTab: null,
    isRoastMode: false,
    isPricingModalOpen: false,
    isMobileMenuOpen: false,
    isAuthModalOpen: false,
    showEmailModal: false,
    hasAcceptedDisclaimer: false,

    setCurrentTheme: (theme) => set({ currentTheme: theme }),
    setActiveTab: (tab) => set((state) => ({ prevTab: state.activeTab, activeTab: tab })),
    setIsRoastMode: (isRoast) => set({ isRoastMode: isRoast }),
    setIsPricingModalOpen: (isOpen) => set({ isPricingModalOpen: isOpen }),
    setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
    setIsAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
    setShowEmailModal: (show) => set({ showEmailModal: show }),
    setHasAcceptedDisclaimer: (hasAccepted) => set({ hasAcceptedDisclaimer: hasAccepted })
}));
