import React from 'react';
import {
    FileText,
    MessageSquare,
    History,
    Users,
    PenTool,
    BookMarked,
    Crown,
    Activity,
    Building,
    BookOpen,
    Briefcase
} from 'lucide-react';
import type { Theme, AnalysisDepth } from '@/types';
import logoUrl from '/legal_eagle_logo.png';
import roastLogoUrl from '/roast_eagle_logo.jpg';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    analysisComplete: boolean;
    score: number;
    currentTheme: Theme;
    analysisDepth: AnalysisDepth;
    setAnalysisDepth: (depth: AnalysisDepth) => void;
    onAnalyze: () => void;
    isRoastMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
    activeTab,
    setActiveTab,
    analysisComplete,
    currentTheme,
    analysisDepth,
    setAnalysisDepth,
    onAnalyze,
    isRoastMode
}) => {
    const depthOptions: { id: AnalysisDepth; label: string; desc: string }[] = [
        { id: 'quick', label: 'Quick Scan', desc: 'Fast check for major risks' },
        { id: 'standard', label: 'Standard', desc: 'Balanced review' },
        { id: 'deep', label: 'Deep Clean', desc: 'Exhaustive, bulletproof analysis' }
    ];

    const navItems = [
        { id: 'draft', label: 'Draft', icon: PenTool, showScore: false },
        { id: 'editor', label: 'Editor', icon: FileText, showScore: true },
        { id: 'clauses', label: 'Clause Library', icon: BookMarked, showScore: false },
        { id: 'chat', label: 'Chat', icon: MessageSquare, showScore: false },
        { id: 'cases', label: 'Matters', icon: Briefcase, showScore: false },
        { id: 'history', label: 'History', icon: History, showScore: false },
        { id: 'context', label: 'Business Context', icon: Building, showScore: false },
        { id: 'team', label: 'Team', icon: Users, showScore: false },
        { id: 'activity', label: 'Activity Logs', icon: Activity, showScore: false },
        { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, showScore: false },
        { id: 'pricing', label: 'Pricing', icon: Crown, showScore: false }
    ];

    const isLightSidebar = currentTheme.id === 'light' || currentTheme.id === 'corporate';

    return (
        <div className={`group/sidebar w-20 hover:w-64 flex flex-col h-full border-r transition-all duration-300 ease-in-out z-50 overflow-hidden ${currentTheme.sidebar}`}>
            {/* Logo Area */}
            <div className={`p-4 border-b flex items-center justify-start h-[73px] ${isLightSidebar ? 'border-slate-300' : 'border-white/10'}`}>
                <div className="relative group w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/10 flex items-center justify-center shrink-0 mx-auto group-hover/sidebar:mx-0 transition-all duration-300">
                    <img 
                        src={isRoastMode ? roastLogoUrl : logoUrl}
                        alt="Legal Eagle"
                        className="w-full h-full object-cover"
                    />
                    {isRoastMode && (
                        <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay" />
                    )}
                </div>
                <span className={`ml-3 font-bold text-[1.1rem] whitespace-nowrap overflow-hidden opacity-0 w-0 group-hover/sidebar:w-auto group-hover/sidebar:opacity-100 transition-all duration-300 ${currentTheme.sidebarText}`}>
                    {isRoastMode ? 'Roast Eagle' : 'Legal Eagle'}
                </span>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {navItems.map((item) => (
                    <React.Fragment key={item.id}>
                        <button
                            onClick={() => {
                                if (item.id !== 'analysis' || analysisComplete) {
                                    setActiveTab(item.id);
                                }
                            }}
                            disabled={item.id === 'analysis' && !analysisComplete}
                            title={item.label}
                            className={`w-full flex items-center p-3 rounded-lg transition-all relative group ${activeTab === item.id
                                ? currentTheme.activeNav
                                : `${currentTheme.sidebarText} hover:bg-black/10`
                                } ${item.id === 'analysis' && !analysisComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <item.icon className="w-6 h-6 shrink-0 mx-auto group-hover/sidebar:mx-0 transition-all duration-300" />
                            <span className="ml-3 font-medium whitespace-nowrap overflow-hidden opacity-0 w-0 group-hover/sidebar:w-auto group-hover/sidebar:opacity-100 transition-all duration-300 text-left">
                                {item.label}
                            </span>
                        </button>

                        {/* Nest Analysis Options under Editor */}
                        {item.id === 'editor' && activeTab === 'editor' && (
                            <div className="flex flex-col gap-2 my-2 items-center">
                                {depthOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        title={`${option.label} - ${option.desc}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveTab('editor');
                                            setAnalysisDepth(option.id);
                                            setTimeout(onAnalyze, 50);
                                        }}
                                        className={`w-10 h-10 group-hover/sidebar:w-full flex items-center justify-center group-hover/sidebar:justify-start group-hover/sidebar:px-3 rounded-lg transition-all border ${analysisDepth === option.id
                                            ? `${currentTheme.accent} text-white border-transparent shadow-sm`
                                            : `border-transparent hover:bg-black/5 ${currentTheme.sidebarText}`
                                            }`}
                                    >
                                        <span className="text-[10px] font-bold text-center leading-tight group-hover/sidebar:hidden">
                                            {option.label.split(' ').map(w => w[0]).join('')}
                                        </span>
                                        <span className="hidden group-hover/sidebar:block text-sm font-medium whitespace-nowrap overflow-hidden">
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
