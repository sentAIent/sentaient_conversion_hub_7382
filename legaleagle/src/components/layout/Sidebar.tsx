import React from 'react';
import { 
    FileText, History, Settings, 
    MessageSquare, Users, BookOpen, Crown,
    Activity, Shield, Network, Globe, Plus, FileText as FileTextIcon,
    ShieldAlert, PenTool, BookMarked, Briefcase, Building, CreditCard, Database
} from 'lucide-react';
import { useDocumentStore } from '@/store';
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
    onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    activeTab,
    setActiveTab,
    analysisComplete,
    currentTheme,
    analysisDepth,
    setAnalysisDepth,
    onAnalyze,
    isRoastMode,
    onOpenSettings
}) => {
    const { documents, activeDocumentId, setActiveDocumentId, addDocument, removeDocument } = useDocumentStore();

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
        { id: 'cases', label: 'Dashboard', icon: Briefcase, showScore: false },
        { id: 'due-diligence', label: 'Due Diligence', icon: ShieldAlert, showScore: false, path: '/due-diligence' },
        { id: 'scraper', label: 'Web Scraper', icon: Globe, showScore: false, path: '/scraper' },
        { id: 'contract-team', label: 'Agent Team', icon: Users, showScore: false, path: '/contract-team' },
        { id: 'history', label: 'History', icon: History, showScore: false },
        { id: 'context', label: 'Business Context', icon: Building, showScore: false },
        { id: 'workspace', label: 'Team', icon: Users, showScore: false },
        { id: 'audit', label: 'Activity Logs', icon: Activity, showScore: false },
        { id: 'playbook', label: 'Knowledge Base', icon: BookOpen, showScore: false },
        { id: 'search', label: 'AI Search', icon: Globe, showScore: false, path: '/research' },
        { id: 'knowledge-base', label: 'Knowledge Base', icon: Database, showScore: false, path: '/knowledge-base' },
        { id: 'graph', label: 'Knowledge Graph', icon: Network, showScore: false, path: '/graph' },
        { id: 'admin', label: 'Admin', icon: Shield, showScore: false, path: '/admin' },
        { id: 'billing', label: 'Billing & Tiers', icon: CreditCard, showScore: false, path: '/billing' },
        { id: 'pricing', label: 'Pricing', icon: Crown, showScore: false },
        { id: 'settings', label: 'Settings', icon: Settings, showScore: false },
        { id: 'privacy', label: 'Privacy Policy', icon: Shield, showScore: false, path: '/privacy' },
        { id: 'tos', label: 'Terms of Service', icon: FileText, showScore: false, path: '/tos' }
    ];

    const isLightSidebar = currentTheme.id === 'light' || currentTheme.id === 'corporate';

    return (
        <div className="relative w-20 h-full shrink-0 z-50">
            <div className={`absolute top-0 left-0 group/sidebar w-20 hover:w-64 flex flex-col h-full border-r transition-all duration-300 ease-in-out z-50 overflow-x-hidden shadow-xl ${currentTheme.sidebar}`}>
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
                                    if (item.path) {
                                        window.location.href = item.path;
                                    } else if (item.id === 'settings') {
                                        onOpenSettings();
                                    } else if (item.id !== 'analysis' || analysisComplete) {
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

                            {/* Nest Documents under Editor */}
                            {item.id === 'editor' && activeTab === 'editor' && (
                                <div className="flex flex-col gap-1 my-2 mx-2">
                                    <div className="flex items-center justify-between px-2 py-1">
                                        <span className="hidden group-hover/sidebar:block text-xs font-bold uppercase tracking-wider opacity-70">
                                            Deal Room
                                        </span>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const name = prompt('Document Name:');
                                                if (name) addDocument(name, '');
                                            }}
                                            className="p-1 hover:bg-black/10 rounded transition-colors hidden group-hover/sidebar:block"
                                            title="Add Document"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    {documents.map(doc => (
                                        <div key={doc.id} className="flex items-center gap-1 w-full group/doc">
                                            <button
                                                title={doc.name}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveDocumentId(doc.id);
                                                    setActiveTab('editor');
                                                }}
                                                className={`flex-1 h-8 flex items-center justify-center group-hover/sidebar:justify-start group-hover/sidebar:px-2 rounded-lg transition-all border ${activeDocumentId === doc.id
                                                    ? `${currentTheme.accent} text-white border-transparent shadow-sm`
                                                    : `border-transparent hover:bg-black/5 ${currentTheme.sidebarText}`
                                                    }`}
                                            >
                                                <span className="text-[10px] font-bold text-center leading-tight group-hover/sidebar:hidden">
                                                    {doc.name.substring(0, 2)}
                                                </span>
                                                <FileTextIcon className="w-3 h-3 shrink-0 hidden group-hover/sidebar:block mr-2" />
                                                <span className="hidden group-hover/sidebar:block text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis text-left flex-1">
                                                    {doc.name}
                                                </span>
                                            </button>
                                            {documents.length > 1 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeDocument(doc.id);
                                                    }}
                                                    className="hidden group-hover/sidebar:group-hover/doc:block p-1 text-red-400 hover:bg-red-500/10 rounded"
                                                    title="Remove"
                                                >
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
