import React, { useRef, useMemo, useEffect, useState } from 'react';
import {
    FileText,
    RefreshCw,
    Gavel,
    Edit3,
    Eye,
    Upload,
    Save,
    MessageSquare,
    Loader2,
    ChevronsUp,
    ChevronsDown,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    Trash2
} from 'lucide-react';
import { findFuzzyMatch, tokenize } from '@/utils/textMatching';
import type { Theme, Recommendation, ScanProgress, Severity, ContractType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

interface EditorViewProps {
    documentName: string;
    documentText: string;
    setDocumentText: (text: string) => void;
    heatmapEnabled: boolean;
    setHeatmapEnabled: (enabled: boolean) => void;
    isAnalyzing: boolean;
    handleAnalyze: (useDemoPlaybook?: boolean) => void;
    handleCancelAnalysis?: () => void;
    recommendations: Recommendation[];
    isRoastMode: boolean;
    selectedRecId: number | null;
    setSelectedRecId: (id: number | null) => void;
    setActiveTab: (tab: string) => void;
    onTriggerUpload: () => void;
    handleSave: () => void;
    handleExportPdf?: () => void;
    handleExportWord?: () => void;
    currentTheme: Theme;
    scanProgress: ScanProgress;
    onAddAnnotation: (rec: Recommendation) => void;
    contractType?: ContractType;
    setContractType?: (type: ContractType) => void;
    perspective?: string;
    setPerspective?: (perspective: string) => void;
    prevTab?: string | null;
    analysisComplete?: boolean;
    activeCaseId?: string | null;
    setActiveCaseId?: (id: string | null) => void;
    onClearDocument?: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
    documentName,
    documentText,
    setDocumentText,
    heatmapEnabled,
    setHeatmapEnabled,
    isAnalyzing,
    handleAnalyze,
    handleCancelAnalysis,
    recommendations,
    isRoastMode,
    selectedRecId,
    setSelectedRecId,
    setActiveTab,
    onTriggerUpload,
    handleSave,
    handleExportPdf,
    handleExportWord,
    currentTheme,
    scanProgress,
    onAddAnnotation,
    contractType = 'General',
    setContractType,
    perspective = 'Neutral',
    setPerspective,
    prevTab = null,
    analysisComplete = false,
    activeCaseId = null,
    setActiveCaseId,
    onClearDocument,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { profile } = useAuth();

    const [cases, setCases] = useState<any[]>([]);
    useEffect(() => {
        if (profile?.current_team_id) {
            supabase.from('cases').select('*').eq('team_id', profile.current_team_id).order('created_at', { ascending: false })
                .then(({ data }) => setCases(data || []));
        }
    }, [profile?.current_team_id]);

    // Check if user has exceeded their limits (demo/free users get 1 review by default)
    const isLimitExceeded = profile && profile.reviews_used >= profile.reviews_limit;

    const handleRunAudit = () => {
        if (isLimitExceeded) {
            setActiveTab('pricing');
            return;
        }
        handleAnalyze();
    };

    // Annotation State
    const [selectedTextData, setSelectedTextData] = useState<{ text: string, x: number, y: number } | null>(null);
    const [showAnnotationModal, setShowAnnotationModal] = useState(false);
    const [annotationComment, setAnnotationComment] = useState('');
    const [annotationSeverity, setAnnotationSeverity] = useState<Severity>('Medium');

    const handleTextareaSelect = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget;
        if (textarea.selectionStart !== textarea.selectionEnd) {
            const text = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
            setSelectedTextData({
                text,
                x: e.clientX,
                y: e.clientY
            });
        } else {
            setSelectedTextData(null);
            setShowAnnotationModal(false);
        }
    };

    const submitAnnotation = () => {
        if (!selectedTextData || !annotationComment.trim()) return;
        
        onAddAnnotation({
            id: Date.now(),
            section: 'User Annotation',
            severity: annotationSeverity,
            category: 'Manual',
            title: annotationComment,
            currentText: selectedTextData.text,
            proposedText: selectedTextData.text,
            legalBasis: 'Added manually by user',
            scoreImpact: 0,
            accepted: false,
            isUserAnnotation: true
        });
        
        setShowAnnotationModal(false);
        setSelectedTextData(null);
        setAnnotationComment('');
        setAnnotationSeverity('Medium');
    };

    // Debounce the document text for heavy processing to prevent typing lag
    const [debouncedDocumentText, setDebouncedDocumentText] = useState(documentText);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedDocumentText(documentText);
        }, 300);
        return () => clearTimeout(timer);
    }, [documentText]);

    // Build sorted highlights from recommendations
    const sortedHighlights = useMemo(() => {
        const highlights: Array<{
            start: number;
            end: number;
            severity: string;
            id: number;
            title: string;
        }> = [];

        const docTokens = tokenize(debouncedDocumentText);

        recommendations.forEach(rec => {
            if (rec.accepted || !rec.currentText) return;
            const match = findFuzzyMatch(docTokens, rec.currentText);
            if (match) {
                highlights.push({
                    start: match.start,
                    end: match.end,
                    severity: rec.severity,
                    id: rec.id,
                    title: isRoastMode && rec.roastTitle ? rec.roastTitle : rec.title
                });
            }
        });

        return highlights.sort((a, b) => a.start - b.start);
    }, [debouncedDocumentText, recommendations, isRoastMode]);

    const currentHighlightIndex = sortedHighlights.findIndex(h => h.id === selectedRecId);

    const handleNavigate = (direction: 'first' | 'last' | 'next' | 'prev') => {
        if (!heatmapEnabled) setHeatmapEnabled(true);
        if (sortedHighlights.length === 0) return;

        let nextIndex = 0;
        if (direction === 'first') nextIndex = 0;
        else if (direction === 'last') nextIndex = sortedHighlights.length - 1;
        else if (direction === 'next') nextIndex = currentHighlightIndex + 1;
        else if (direction === 'prev') nextIndex = currentHighlightIndex - 1;

        if (nextIndex >= sortedHighlights.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = sortedHighlights.length - 1;

        if (currentHighlightIndex === -1) {
            nextIndex = direction === 'prev' ? sortedHighlights.length - 1 : 0;
        }

        const nextId = sortedHighlights[nextIndex].id;
        setSelectedRecId(nextId);

        setTimeout(() => {
            const el = document.getElementById(`highlight-${nextId}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 10);
    };

    useEffect(() => {
        if (selectedRecId && heatmapEnabled) {
            setTimeout(() => {
                const el = document.getElementById(`highlight-${selectedRecId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }, [selectedRecId, heatmapEnabled]);

    const renderHeatmap = () => {
        const segments: React.ReactNode[] = [];
        let lastIndex = 0;

        sortedHighlights.forEach((h, i) => {
            if (h.start < lastIndex) return;

            if (h.start > lastIndex) {
                segments.push(
                    <span key={`safe-${i}`}>{debouncedDocumentText.slice(lastIndex, h.start)}</span>
                );
            }

            const bgClass = h.severity === 'Critical'
                ? currentTheme.heatmapCritical
                : currentTheme.heatmapHigh;

            const isSelected = selectedRecId === h.id;
            const ringClass = isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : '';

            segments.push(
                <span
                    key={`risk-${i}`}
                    id={`highlight-${h.id}`}
                    className={`${bgClass} ${ringClass} cursor-pointer relative group px-0.5 rounded-sm transition-all hover:bg-opacity-80`}
                    onClick={() => setSelectedRecId(h.id)}
                >
                    {debouncedDocumentText.slice(h.start, h.end)}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs font-sans px-2 py-1 rounded shadow-xl whitespace-nowrap z-50 pointer-events-none">
                        {h.title}
                    </span>
                </span>
            );

            lastIndex = h.end;
        });

        if (lastIndex < debouncedDocumentText.length) {
            segments.push(<span key="safe-end">{debouncedDocumentText.slice(lastIndex)}</span>);
        }

        return (
            <div className="font-serif text-lg leading-loose whitespace-pre-wrap p-2">
                {segments}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Toolbar */}
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
                            {setActiveCaseId && (
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
                            )}
                            {setContractType && (
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
                            )}
                            {setPerspective && (
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
                            )}
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
                                <button
                                    onClick={handleCancelAnalysis}
                                    className="flex items-center gap-2 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm bg-red-500 hover:bg-red-600"
                                >
                                    Stop
                                </button>
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
                        <div className={`flex items-center gap-1 rounded-lg p-1 border ${currentTheme.id === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                            }`}>
                            <button
                                onClick={() => setHeatmapEnabled(false)}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${!heatmapEnabled ? currentTheme.toggleActive : currentTheme.toggleInactive
                                    }`}
                            >
                                <Edit3 className="w-3 h-3" /> Edit
                            </button>
                            <button
                                onClick={() => setHeatmapEnabled(true)}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${heatmapEnabled ? currentTheme.toggleActive : currentTheme.toggleInactive
                                    }`}
                            >
                                <Eye className="w-3 h-3" /> Heatmap
                            </button>
                        </div>

                        <div className="w-px h-6 bg-slate-300" />

                        {/* Issue Navigation */}
                        <div className={`flex items-center gap-1 rounded-lg p-1 border ${currentTheme.id === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                            }`}>
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
                            <span className={`text-[10px] font-mono font-bold w-16 text-center ${currentTheme.id === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                }`}>
                                {sortedHighlights.length > 0
                                    ? `${currentHighlightIndex + 1} / ${sortedHighlights.length}`
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
                        </div>
                    </div>
                </div>
            </div>

            {/* Document Area */}
            <div
                className={`flex-1 p-8 overflow-auto flex justify-center min-h-0 ${currentTheme.main || currentTheme.appBg}`}
                ref={scrollContainerRef}
            >
                <div className={`w-full max-w-4xl shadow-lg border min-h-[800px] p-12 relative ${currentTheme.docBg} ${currentTheme.docText} ${currentTheme.docBorder}`}>
                    {isAnalyzing && (
                        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm ${currentTheme.id === 'dark' || currentTheme.id === 'dracula' || currentTheme.id === 'hacker' ? 'bg-slate-900/90 text-white' : 'bg-white/90 text-slate-800'}`}>
                            <div className={`w-16 h-16 border-4 rounded-full animate-spin mb-4 ${currentTheme.id === 'dark' || currentTheme.id === 'dracula' || currentTheme.id === 'hacker' ? 'border-blue-500/30 border-t-blue-400' : 'border-blue-100 border-t-blue-600'}`} />
                            <h3 className="text-xl font-bold drop-shadow-sm">Analyzing Document...</h3>
                            <p className={`mt-2 font-medium ${currentTheme.id === 'dark' || currentTheme.id === 'dracula' || currentTheme.id === 'hacker' ? 'text-slate-300' : 'text-slate-500'}`}>Consulting Federal & State Case Law</p>
                        </div>
                    )}
                    {heatmapEnabled ? (
                        <div className="w-full h-full outline-none font-serif">{renderHeatmap()}</div>
                    ) : (
                        <div className="grid w-full h-full font-serif text-lg leading-loose">
                            <div 
                                className="whitespace-pre-wrap invisible [grid-area:1/1/2/2]"
                                aria-hidden="true"
                            >
                                {documentText + ' '}
                            </div>
                            <textarea
                                value={documentText}
                                onChange={(e) => setDocumentText(e.target.value)}
                                className="w-full h-full resize-none outline-none bg-transparent overflow-hidden [grid-area:1/1/2/2]"
                                spellCheck="false"
                                onMouseUp={handleTextareaSelect}
                            />
                        </div>
                    )}
                    
                    {/* Floating Annotation UI */}
                    {selectedTextData && !heatmapEnabled && (
                        <div 
                            className="fixed z-50 bg-white border shadow-2xl rounded-xl p-4 w-80 transform -translate-x-1/2 -translate-y-[120%]"
                            style={{ left: selectedTextData.x, top: selectedTextData.y }}
                        >
                            {!showAnnotationModal ? (
                                <button 
                                    onClick={() => setShowAnnotationModal(true)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow flex items-center justify-center gap-2"
                                >
                                    <MessageSquare className="w-4 h-4" /> Add Comment
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <h4 className="font-bold text-slate-800 text-sm border-b pb-2">New Annotation</h4>
                                    
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Severity</label>
                                        <select 
                                            value={annotationSeverity}
                                            onChange={(e) => setAnnotationSeverity(e.target.value as Severity)}
                                            className="w-full text-sm border rounded p-1.5 bg-slate-50"
                                        >
                                            <option value="Critical">Critical</option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Comment</label>
                                        <textarea 
                                            value={annotationComment}
                                            onChange={(e) => setAnnotationComment(e.target.value)}
                                            placeholder="What's the issue here?"
                                            className="w-full h-20 text-sm border rounded p-2 bg-slate-50 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-end gap-2 pt-2">
                                        <button 
                                            onClick={() => {
                                                setShowAnnotationModal(false);
                                                setSelectedTextData(null);
                                            }}
                                            className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={submitAnnotation}
                                            disabled={!annotationComment.trim()}
                                            className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 rounded disabled:opacity-50"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditorView;
