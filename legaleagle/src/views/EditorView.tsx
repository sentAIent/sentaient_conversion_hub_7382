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
    ChevronDown
} from 'lucide-react';
import { findFuzzyMatch } from '@/utils/textMatching';
import type { Theme, Recommendation, ScanProgress, Severity } from '@/types';

interface EditorViewProps {
    documentName: string;
    documentText: string;
    setDocumentText: (text: string) => void;
    heatmapEnabled: boolean;
    setHeatmapEnabled: (enabled: boolean) => void;
    isAnalyzing: boolean;
    handleAnalyze: () => void;
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
}

export const EditorView: React.FC<EditorViewProps> = ({
    documentName,
    documentText,
    setDocumentText,
    heatmapEnabled,
    setHeatmapEnabled,
    isAnalyzing,
    handleAnalyze,
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
    onAddAnnotation
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    // Build sorted highlights from recommendations
    const sortedHighlights = useMemo(() => {
        const highlights: Array<{
            start: number;
            end: number;
            severity: string;
            id: number;
            title: string;
        }> = [];

        recommendations.forEach(rec => {
            if (rec.accepted || !rec.currentText) return;
            const match = findFuzzyMatch(documentText, rec.currentText);
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
    }, [documentText, recommendations, isRoastMode]);

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
                    <span key={`safe-${i}`}>{documentText.slice(lastIndex, h.start)}</span>
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
                    {documentText.slice(h.start, h.end)}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs font-sans px-2 py-1 rounded shadow-xl whitespace-nowrap z-50 pointer-events-none">
                        {h.title}
                    </span>
                </span>
            );

            lastIndex = h.end;
        });

        if (lastIndex < documentText.length) {
            segments.push(<span key="safe-end">{documentText.slice(lastIndex)}</span>);
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
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h2 className={`text-xl font-bold truncate max-w-md ${currentTheme.panelText}`}>
                            {documentName}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        {isAnalyzing && (
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-500 animate-pulse">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Scanning Part {scanProgress.current} of {scanProgress.total}...
                            </div>
                        )}
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className={`flex items-center gap-2 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm shadow-blue-200 ${currentTheme.accent} disabled:opacity-50`}
                        >
                            {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Gavel className="w-4 h-4" />}
                            {isAnalyzing ? 'Scanning...' : 'Run Legal Audit'}
                        </button>
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
                        <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-slate-800">
                            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
                            <h3 className="text-xl font-bold">Analyzing Document...</h3>
                            <p className="text-slate-500 mt-2">Consulting Federal & State Case Law</p>
                        </div>
                    )}
                    {heatmapEnabled ? (
                        <div className="w-full h-full outline-none font-serif">{renderHeatmap()}</div>
                    ) : (
                        <textarea
                            ref={(el) => {
                                if (el) {
                                    el.style.height = 'auto';
                                    el.style.height = el.scrollHeight + 'px';
                                }
                            }}
                            value={documentText}
                            onChange={(e) => {
                                setDocumentText(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            className="w-full h-full resize-none outline-none font-serif text-lg leading-loose bg-transparent overflow-hidden"
                            spellCheck="false"
                            onMouseUp={handleTextareaSelect}
                        />
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
