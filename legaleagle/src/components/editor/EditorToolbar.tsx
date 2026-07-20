import React from 'react';
import {
    FileText, RefreshCw, Gavel, Edit3, Eye, Upload, Save, MessageSquare,
    Loader2, ChevronsUp, ChevronsDown, ChevronUp, ChevronDown, ChevronLeft, Trash2
} from 'lucide-react';
import { useUIStore, useDocumentStore, useAnalysisStore } from '@/store';
import type { ContractType } from '@/types';

interface EditorToolbarProps {
    handleAnalyze: (useDemoPlaybook?: boolean) => void;
    handleCancelAnalysis?: () => void;
    onTriggerUpload: () => void;
    handleSave: () => void;
    handlePlayBriefing?: () => void;
    handleExportPdf?: () => void;
    handleExportWord?: () => void;
    handleExportMemo?: () => void;
    onClearDocument?: () => void;
    cases: any[];
    isLimitExceeded: boolean;
    sortedHighlightsCount: number;
    currentHighlightIndex: number;
    handleNavigate: (direction: 'first' | 'last' | 'next' | 'prev') => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
    handleAnalyze,
    handleCancelAnalysis,
    onTriggerUpload,
    handleSave,
    handlePlayBriefing,
    handleExportPdf,
    handleExportWord,
    handleExportMemo,
    onClearDocument,
    cases,
    isLimitExceeded,
    sortedHighlightsCount,
    currentHighlightIndex,
    handleNavigate
}) => {
    // UI Store
    const { currentTheme, prevTab, setActiveTab } = useUIStore();
    
    // Document Store
    const { documentName, activeCaseId, setActiveCaseId, contractType, setContractType, perspective, setPerspective } = useDocumentStore();
    
    // Analysis Store
    const { isAnalyzing, scanProgress, analysisComplete, heatmapEnabled, setHeatmapEnabled } = useAnalysisStore();

    const handleRunAudit = () => {
        if (isLimitExceeded) {
            setActiveTab('pricing');
            return;
        }
        handleAnalyze();
    };

    return (
        <div className={`border-b p-4 shadow-sm flex flex-col gap-4 ${currentTheme.panelBg}`}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    {prevTab === 'analysis' || (analysisComplete && prevTab !== 'cases') ? (
                        <button
                            onClick={() => setActiveTab('analysis')}
                            className="flex w-fit items-center gap-1 text-sm font-bold transition-opacity text-blue-500 hover:text-blue-400"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </button>
                    ) : null}
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h2 className={`text-xl font-bold truncate max-w-md ${currentTheme.panelText}`}>
                            {documentName}
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={activeCaseId || ''}
                            onChange={(e) => setActiveCaseId(e.target.value || null)}
                            className={`text-xs font-bold py-1.5 px-3 rounded-lg appearance-none transition-all outline-none border cursor-pointer ${
                                currentTheme.id === 'light' || currentTheme.id === 'corporate'
                                    ? 'bg-slate-200/50 border-slate-300 text-slate-900' 
                                    : 'bg-black/20 border-white/10 text-white hover:bg-black/40'
                            }`}
                        >
                            <option value="">No Matter Assigned</option>
                            {cases.filter(c => !c.isDemo).map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <select
                            value={contractType}
                            onChange={(e) => setContractType(e.target.value as ContractType)}
                            className={`text-xs font-bold py-1.5 px-3 rounded-lg appearance-none transition-all outline-none border cursor-pointer ${
                                currentTheme.id === 'light' || currentTheme.id === 'corporate'
                                    ? 'bg-slate-200/50 border-slate-300 text-slate-900' 
                                    : 'bg-black/20 border-white/10 text-white hover:bg-black/40'
                            }`}
                        >
                            <option value="General">General Review</option>
                            <option value="NDA">NDA (Non-Disclosure)</option>
                            <option value="Employment Agreement">Employment Agreement</option>
                            <option value="Terms of Service">Terms of Service</option>
                            <option value="Real Estate Lease">Real Estate Lease</option>
                        </select>
                        <div className="flex bg-black/10 rounded-lg p-0.5 border border-white/10">
                            {['Neutral', 'User', 'Company'].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setPerspective(role)}
                                    className={`text-xs font-bold px-3 py-1 rounded-md transition-all ${perspective === role
                                        ? `${currentTheme.accent} text-white shadow-sm`
                                        : `${currentTheme.sidebarText} hover:bg-white/5`
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {isAnalyzing && (
                        <div className="flex items-center gap-2 text-xs font-mono text-blue-500 animate-pulse">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Scanning Part {scanProgress.current} of {scanProgress.total}...
                        </div>
                    )}
                    {isAnalyzing ? (
                        <div className="flex gap-2">
                            <button
                                disabled
                                className={`flex items-center gap-2 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm opacity-50 ${currentTheme.accent}`}
                            >
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Scanning...
                            </button>
                            {handleCancelAnalysis && (
                                <button
                                    onClick={handleCancelAnalysis}
                                    className="flex items-center gap-2 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm bg-red-500 hover:bg-red-600"
                                >
                                    Stop
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {documentName === 'Draft_Agreement.txt' ? (
                                <button
                                    onClick={() => handleAnalyze(true)}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all bg-emerald-600 text-white hover:bg-emerald-700`}
                                >
                                    <FileText className="w-4 h-4" />
                                    Apply ACME Playbook
                                </button>
                            ) : (
                                <button
                                    onClick={() => setActiveTab('playbook')}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all bg-emerald-600 text-white hover:bg-emerald-700`}
                                >
                                    <FileText className="w-4 h-4" />
                                    Add Playbook
                                </button>
                            )}
                            <button
                                onClick={handleRunAudit}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${isLimitExceeded ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            >
                                <Gavel className="w-4 h-4" />
                                {isLimitExceeded ? 'Upgrade to Analyze' : 'Run Legal Audit'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {/* Edit/Heatmap Toggle */}
                    <div className={`flex items-center gap-1 rounded-lg p-1 border ${currentTheme.id === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                        <button
                            onClick={() => setHeatmapEnabled(false)}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${!heatmapEnabled ? currentTheme.toggleActive : currentTheme.toggleInactive}`}
                        >
                            <Edit3 className="w-3 h-3" /> Edit
                        </button>
                        <button
                            onClick={() => setHeatmapEnabled(true)}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${heatmapEnabled ? currentTheme.toggleActive : currentTheme.toggleInactive}`}
                        >
                            <Eye className="w-3 h-3" /> Heatmap
                        </button>
                    </div>

                    <div className="w-px h-6 bg-slate-300" />

                    {/* Issue Navigation */}
                    <div className={`flex items-center gap-1 rounded-lg p-1 border ${currentTheme.id === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                        <button
                            onClick={() => handleNavigate('first')}
                            className={`p-1.5 rounded-md transition-all ${currentTheme.toggleInactive}`}
                            title="First Issue"
                        >
                            <ChevronsUp className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleNavigate('prev')}
                            className={`p-1.5 rounded-md transition-all ${currentTheme.toggleInactive}`}
                            title="Previous Issue"
                        >
                            <ChevronUp className="w-4 h-4" />
                        </button>
                        <span className={`text-[10px] font-mono font-bold w-16 text-center ${currentTheme.id === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                            {sortedHighlightsCount > 0
                                ? `${currentHighlightIndex + 1} / ${sortedHighlightsCount}`
                                : '0 / 0'
                            }
                        </span>
                        <button
                            onClick={() => handleNavigate('next')}
                            className={`p-1.5 rounded-md transition-all ${currentTheme.toggleInactive}`}
                            title="Next Issue"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleNavigate('last')}
                            className={`p-1.5 rounded-md transition-all ${currentTheme.toggleInactive}`}
                            title="Last Issue"
                        >
                            <ChevronsDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium border border-transparent ${currentTheme.buttonSecondary}`}
                    >
                        <MessageSquare className="w-4 h-4" /> Ask Assistant
                    </button>
                    {handlePlayBriefing && (
                        <button
                            onClick={handlePlayBriefing}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium border border-indigo-500/20 text-indigo-600 hover:bg-indigo-50`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Briefing
                        </button>
                    )}
                    <div className="h-6 w-px bg-slate-300" />
                    <button
                        onClick={onTriggerUpload}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${currentTheme.buttonSecondary}`}
                    >
                        <Upload className="w-4 h-4" /> Upload
                    </button>
                    {onClearDocument && (
                        <button
                            onClick={onClearDocument}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium border border-transparent text-red-600 hover:bg-red-50`}
                            title="Clear Document"
                        >
                            <Trash2 className="w-4 h-4" /> Clear
                        </button>
                    )}
                    
                    <div className="flex items-center rounded-lg border bg-slate-100 overflow-hidden text-sm font-medium">
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-3 py-2 transition-colors ${currentTheme.buttonSecondary} border-none rounded-none`}
                            title="Save as TXT"
                        >
                            <Save className="w-4 h-4" /> Save
                        </button>
                        <div className="w-px h-full bg-slate-300" />
                        <button
                            onClick={handleExportPdf}
                            className={`px-3 py-2 transition-colors font-bold text-red-600 hover:bg-red-50`}
                            title="Export to PDF"
                        >
                            PDF
                        </button>
                        <div className="w-px h-full bg-slate-300" />
                        <button
                            onClick={handleExportWord}
                            className={`px-3 py-2 transition-colors font-bold text-blue-600 hover:bg-blue-50`}
                            title="Export to Word"
                        >
                            DOCX
                        </button>
                        <div className="w-px h-full bg-slate-300" />
                        <button
                            onClick={handleExportMemo}
                            className={`px-3 py-2 transition-colors font-bold text-purple-600 hover:bg-purple-50`}
                            title="Export as Legal Memo"
                        >
                            MEMO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
