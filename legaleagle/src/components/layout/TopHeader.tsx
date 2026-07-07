import React, { useState, useCallback } from 'react';
import { LogIn, LogOut, User as UserIcon, Palette, ShieldCheck, Flame } from 'lucide-react';
import type { Theme } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { ThemeGalleryModal } from '@/components/features/ThemeGalleryModal';

interface TopHeaderProps {
    currentTheme: Theme;
    setCurrentTheme: (theme: Theme) => void;
    isRoastMode: boolean;
    setIsRoastMode: (value: boolean) => void;
    onOpenAuth: () => void;
    onOpenPricing: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
    currentTheme,
    setCurrentTheme,
    isRoastMode,
    setIsRoastMode,
    onOpenAuth,
    onOpenPricing
}) => {
    const { user, signOut } = useAuth();
    const [showThemeGallery, setShowThemeGallery] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    // Debounced roast mode toggle to prevent rapid clicking glitches
    const handleRoastToggle = useCallback(() => {
        if (isToggling) return;
        setIsToggling(true);
        setIsRoastMode(!isRoastMode);
        // Debounce: prevent toggling again for 300ms
        setTimeout(() => setIsToggling(false), 300);
    }, [isRoastMode, setIsRoastMode, isToggling]);

    return (
        <>
            <div className={`w-full flex items-center justify-between px-6 py-3 border-b shrink-0 ${currentTheme.panelBg}`}>
                
                {/* Roast Mode Toggle - with debounce */}
                <button
                    onClick={handleRoastToggle}
                    disabled={isToggling}
                    title="Toggle Roast Mode"
                    className={`flex items-center gap-3 px-4 py-1.5 rounded-xl transition-all duration-200 border transform ${isToggling ? 'scale-[0.98]' : ''} ${isRoastMode
                        ? 'bg-red-500/10 border-red-500/20 text-red-500 shadow-lg shadow-red-500/10'
                        : `border-transparent ${currentTheme.buttonSecondary}`
                        }`}
                >
                    <span className="font-bold flex items-center gap-2">
                        <Flame className={`w-4 h-4 transition-all duration-200 ${isRoastMode ? 'fill-current scale-110' : ''}`} />
                        <span className="hidden sm:inline">Roast Mode</span>
                    </span>
                    <div
                        className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${isRoastMode ? 'bg-red-500' : 'bg-slate-400'}`}
                    >
                        <div
                            className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-200"
                            style={{
                                left: isRoastMode ? '1.1rem' : '0.1rem'
                            }}
                        />
                    </div>
                </button>

                <div className="flex items-center space-x-4">
                    {/* Upgrade Button */}
                    <button
                        onClick={onOpenPricing}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-blue-500 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span className="hidden sm:inline">Upgrade</span>
                    </button>

                    {/* Theme Button */}
                    <button
                        onClick={() => setShowThemeGallery(true)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-transparent ${currentTheme.buttonSecondary} ${currentTheme.sidebarText}`}
                        title="Change Theme"
                    >
                        <Palette className="w-4 h-4" /> 
                        <span className="hidden sm:inline">Theme: {currentTheme.name}</span>
                    </button>

                    {/* Vertical Divider */}
                    <div className={`h-6 w-px mx-2 bg-current opacity-20 ${currentTheme.sidebarText}`} />

                    {/* Auth Button */}
                    {user ? (
                        <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-transparent ${currentTheme.buttonSecondary} ${currentTheme.sidebarText}`}>
                            <span className="flex items-center gap-2 truncate max-w-[120px]">
                                <UserIcon className="w-4 h-4" /> <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                            </span>
                            <button onClick={signOut} title="Sign Out">
                                <LogOut className="w-4 h-4 opacity-70 hover:opacity-100 text-red-400" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onOpenAuth}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20`}
                        >
                            <LogIn className="w-4 h-4" /> <span className="hidden sm:inline">Sign In</span>
                        </button>
                    )}
                </div>
            </div>

            <ThemeGalleryModal
                isOpen={showThemeGallery}
                onClose={() => setShowThemeGallery(false)}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
            />
        </>
    );
};
