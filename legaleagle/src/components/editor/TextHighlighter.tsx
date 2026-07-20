import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useUIStore, useDocumentStore, useAnalysisStore } from '@/store';
import type { Recommendation, Severity } from '@/types';

interface TextHighlighterProps {
    onAddAnnotation: (rec: Recommendation) => void;
    sortedHighlights: Array<{
        start: number;
        end: number;
        severity: string;
        id: number;
        title: string;
    }>;
}

export const TextHighlighter: React.FC<TextHighlighterProps> = ({ 
    onAddAnnotation,
    sortedHighlights
}) => {
    // UI Store
    const { currentTheme } = useUIStore();
    
    // Document Store
    const { documentText, setDocumentText } = useDocumentStore();
    
    // Analysis Store
    const { isAnalyzing, heatmapEnabled, selectedRecId, setSelectedRecId } = useAnalysisStore();

    // Debounce the document text for heavy processing to prevent typing lag
    const [debouncedDocumentText, setDebouncedDocumentText] = useState(documentText);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedDocumentText(documentText);
        }, 300);
        return () => clearTimeout(timer);
    }, [documentText]);

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

    // Auto-scroll logic for heatmap
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
                        autoFocus
                        placeholder="Paste your document here (Ctrl+V)..."
                        value={documentText}
                        onChange={(e) => setDocumentText(e.target.value)}
                        className="w-full h-full min-h-[600px] resize-none outline-none bg-transparent overflow-hidden [grid-area:1/1/2/2]"
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
    );
};
