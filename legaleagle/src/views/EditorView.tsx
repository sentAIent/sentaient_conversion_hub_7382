import React, { useRef, useMemo, useEffect, useState } from 'react';
import { findFuzzyMatch, tokenize } from '@/utils/textMatching';
import type { Recommendation } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { TextHighlighter } from '@/components/editor/TextHighlighter';
import { useUIStore, useDocumentStore, useAnalysisStore } from '@/store';

interface EditorViewProps {
    handleAnalyze: (useDemoPlaybook?: boolean) => void;
    handleCancelAnalysis?: () => void;
    onTriggerUpload: () => void;
    handleSave: () => void;
    handlePlayBriefing?: () => void;
    handleExportPdf?: () => void;
    handleExportWord?: () => void;
    handleExportMemo?: () => void;
    onAddAnnotation: (rec: Recommendation) => void;
    onClearDocument?: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
    handleAnalyze,
    handleCancelAnalysis,
    onTriggerUpload,
    handleSave,
    handlePlayBriefing,
    handleExportPdf,
    handleExportWord,
    handleExportMemo,
    onAddAnnotation,
    onClearDocument,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { profile } = useAuth();
    const { isRoastMode } = useUIStore();
    const { documentText } = useDocumentStore();
    const { recommendations, selectedRecId, heatmapEnabled, setHeatmapEnabled, setSelectedRecId } = useAnalysisStore();

    const [cases, setCases] = useState<any[]>([]);
    useEffect(() => {
        if (profile?.current_team_id) {
            supabase.from('cases').select('*').eq('team_id', profile.current_team_id).order('created_at', { ascending: false })
                .then(({ data }) => setCases(data || []));
        }
    }, [profile?.current_team_id]);

    // Check if user has exceeded their limits (demo/free users get 1 review by default)
    const isLimitExceeded = Boolean(profile && profile.reviews_used >= profile.reviews_limit);

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

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <EditorToolbar 
                handleAnalyze={handleAnalyze}
                handleCancelAnalysis={handleCancelAnalysis}
                onTriggerUpload={onTriggerUpload}
                handleSave={handleSave}
                handlePlayBriefing={handlePlayBriefing}
                handleExportPdf={handleExportPdf}
                handleExportWord={handleExportWord}
                handleExportMemo={handleExportMemo}
                onClearDocument={onClearDocument}
                cases={cases}
                isLimitExceeded={isLimitExceeded}
                sortedHighlightsCount={sortedHighlights.length}
                currentHighlightIndex={currentHighlightIndex}
                handleNavigate={handleNavigate}
            />

            <div
                className="flex-1 p-8 overflow-auto flex justify-center min-h-0"
                ref={scrollContainerRef}
            >
                <TextHighlighter 
                    onAddAnnotation={onAddAnnotation}
                    sortedHighlights={sortedHighlights}
                />
            </div>
        </div>
    );
};

export default EditorView;
