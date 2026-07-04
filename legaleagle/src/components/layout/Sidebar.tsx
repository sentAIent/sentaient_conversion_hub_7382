import React, { useState, useCallback } from 'react';
import {
    FileText,
    ShieldCheck,
    MessageSquare,
    History,
    Users,
    Flame,
    Palette,
    Settings,
    LogIn,
    User as UserIcon,
    LogOut
} from 'lucide-react';
import { ThemeGalleryModal } from '@/components/features/ThemeGalleryModal';
import type { Theme, AnalysisDepth } from '@/types';
import { useAuth } from '@/context/AuthContext';

// ...

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    analysisComplete: boolean;
    score: number;
    isRoastMode: boolean;
    setIsRoastMode: (value: boolean) => void;
    perspective: string;
    setPerspective: (value: string) => void;
    currentTheme: Theme;
    setCurrentTheme: (theme: Theme) => void;
    onOpenAuth: () => void;
    analysisDepth: AnalysisDepth;
    setAnalysisDepth: (depth: AnalysisDepth) => void;
    onAnalyze: () => void;
}

// ...



export const Sidebar: React.FC<SidebarProps> = ({
    activeTab,
    setActiveTab,
    analysisComplete,
    score,
    isRoastMode,
    setIsRoastMode,
    perspective,
    setPerspective,
    currentTheme,
    setCurrentTheme,
    onOpenAuth,
    analysisDepth,
    setAnalysisDepth,
    onAnalyze
}) => {
    const { user, signOut } = useAuth();
    const [showThemeGallery, setShowThemeGallery] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    const depthOptions: { id: AnalysisDepth; label: string; desc: string }[] = [
        { id: 'quick', label: 'Quick Scan', desc: 'Fast check for major risks' },
        { id: 'standard', label: 'Standard', desc: 'Balanced review' },
        { id: 'deep', label: 'Deep Clean', desc: 'Exhaustive, bulletproof analysis' }
    ];

    // Debounced roast mode toggle to prevent rapid clicking glitches
    const handleRoastToggle = useCallback(() => {
        if (isToggling) return;
        setIsToggling(true);
        setIsRoastMode(!isRoastMode);
        // Debounce: prevent toggling again for 300ms
        setTimeout(() => setIsToggling(false), 300);
    }, [isRoastMode, setIsRoastMode, isToggling]);

    const isLightSidebar = ['eggshell', 'sand'].includes(currentTheme.id);

    const navItems = [
        { id: 'editor', icon: FileText, label: 'Document Editor' },
        { id: 'context', icon: Users, label: 'Case Context' },
        { id: 'chat', icon: MessageSquare, label: 'Assistant' },
        { id: 'analysis', icon: ShieldCheck, label: 'Analysis', showScore: true },
        { id: 'history', icon: History, label: 'History' },
    ];

    return (
        <>
            <div className={`w-64 flex flex-col h-screen border-r shrink-0 transition-colors duration-300 ${currentTheme.sidebar}`}>
                {/* Logo */}
                <div className={`p-6 flex items-center gap-3 border-b ${isLightSidebar ? 'border-slate-300' : 'border-white/10'}`}>
                    <div
                        className={`p-1 rounded-lg transition-all duration-300 ${isRoastMode ? 'bg-red-600' : 'bg-black'}`}
                    >
                        {isRoastMode
                            ? <Flame className="text-white w-8 h-8 animate-pulse" />
                            : <img src="/legal_eagle_logo.png" alt="Legal Eagle Logo" className="w-8 h-8 rounded object-cover" />
                        }
                    </div>
                    <div>
                        <h1 className={`font-bold tracking-tight transition-colors duration-300 ${isLightSidebar ? 'text-slate-900' : 'text-white'}`}>
                            {isRoastMode ? 'RoastAI' : 'Legal Eagle'}
                        </h1>
                        <p className={`text-xs transition-colors duration-300 ${currentTheme.sidebarText}`}>
                            {isRoastMode ? 'Brutal Contract Review' : 'Legal Precision Engine'}
                        </p>
                    </div>
                </div>

                {/* Perspective Selector */}
                {/* Perspective Selector */}
                <div className="px-4 pt-4 space-y-4">
                    {/* Perspective */}
                    <div>
                        <div className={`${isLightSidebar ? 'bg-black/5' : 'bg-black/20'} rounded-lg p-1 flex`}>
                            {['Buyer', 'Seller'].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setPerspective(role)}
                                    className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-all ${perspective === role
                                        ? `${currentTheme.accent} text-white shadow-sm`
                                        : `${currentTheme.sidebarText} hover:bg-white/5`
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                        <div className={`text-[10px] text-center mt-1 uppercase tracking-wide ${currentTheme.sidebarText}`}>
                            Negotiation Stance
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <React.Fragment key={item.id}>
                            <button
                                onClick={() => {
                                    if (item.id !== 'analysis' || analysisComplete) {
                                        setActiveTab(item.id);
                                    }
                                }}
                                disabled={item.id === 'analysis' && !analysisComplete}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                    ? currentTheme.activeNav
                                    : `${currentTheme.sidebarText} hover:bg-black/10`
                                    } ${item.id === 'analysis' && !analysisComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <div className="flex-1 text-left">
                                    <span className="font-medium block">{item.label}</span>
                                    {item.showScore && analysisComplete && (
                                        <span className="text-xs opacity-80">Score: {score}/100</span>
                                    )}
                                </div>
                            </button>

                            {/* Nest Analysis Options under Editor */}
                            {item.id === 'editor' && (
                                <div className="ml-9 space-y-1 mb-4">
                                    {depthOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveTab('editor'); // Ensure editor is active
                                                setAnalysisDepth(option.id);
                                                setTimeout(onAnalyze, 50);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-all border ${analysisDepth === option.id
                                                ? `${currentTheme.accent} text-white border-transparent shadow-sm`
                                                : `border-transparent hover:bg-black/5 ${currentTheme.sidebarText}`
                                                }`}
                                        >
                                            <div className="text-xs font-bold">{option.label}</div>
                                            <div className={`text-[10px] ${analysisDepth === option.id ? 'text-white/80' : 'opacity-60'}`}>
                                                {option.desc}
                                            </div>
                                        </button>
                                    ))}
                                    <div className={`my-2 border-b ${isLightSidebar ? 'border-slate-300' : 'border-white/10'}`} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </nav>

                {/* Footer Controls */}
                <div
                    className={`p-4 border-t space-y-2 relative ${isLightSidebar ? 'border-slate-300' : 'border-white/10'}`}
                >
                    {/* Auth Button */}
                    {user ? (
                        <div className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-xs font-bold transition-all border ${isLightSidebar
                            ? 'border-slate-300 bg-slate-200/50'
                            : 'border-white/10 bg-white/5'
                            } ${currentTheme.sidebarText}`}>
                            <span className="flex items-center gap-2 truncate max-w-[120px]">
                                <UserIcon className="w-4 h-4" /> {user.email?.split('@')[0]}
                            </span>
                            <button onClick={signOut} title="Sign Out">
                                <LogOut className="w-3 h-3 opacity-70 hover:opacity-100" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onOpenAuth}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20`}
                        >
                            <LogIn className="w-4 h-4" /> Sign In / Sign Up
                        </button>
                    )}

                    {/* Theme Button */}
                    <button
                        onClick={() => setShowThemeGallery(true)}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-xs font-bold transition-all border ${isLightSidebar
                            ? 'border-slate-300 hover:bg-slate-200/50'
                            : 'border-white/10 hover:bg-white/5'
                            } ${currentTheme.sidebarText}`}
                    >
                        <span className="flex items-center gap-2">
                            <Palette className="w-4 h-4" /> Theme: {currentTheme.name}
                        </span>
                        <Settings className="w-3 h-3 opacity-70" />
                    </button>

                    {/* Roast Mode Toggle - with debounce */}
                    <button
                        onClick={handleRoastToggle}
                        disabled={isToggling}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 border transform ${isToggling ? 'scale-[0.98]' : ''} ${isRoastMode
                            ? (isLightSidebar ? 'bg-red-600 border-red-800 text-white shadow-lg shadow-red-500/30' : 'bg-red-900/30 border-red-500/50 text-red-400')
                            : `${isLightSidebar ? 'bg-slate-200/50' : 'bg-black/20'} border-transparent ${currentTheme.sidebarText} hover:bg-black/10`
                            }`}
                    >
                        <span className="font-bold flex items-center gap-2">
                            <Flame className={`w-4 h-4 transition-all duration-200 ${isRoastMode ? 'fill-current scale-110' : ''}`} />
                            Roast Mode
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
                </div>
            </div>

            {/* Theme Gallery Modal */}
            <ThemeGalleryModal
                isOpen={showThemeGallery}
                onClose={() => setShowThemeGallery(false)}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
            />
        </>
    );
};

export default Sidebar;

