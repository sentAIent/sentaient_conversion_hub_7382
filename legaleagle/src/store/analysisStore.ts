import { create } from 'zustand';
import type { Recommendation, SwotAnalysis, ChangeLogEntry, ScanProgress, AnalysisDepth } from '@/types';
import { formatDate } from '@/utils';

interface AnalysisState {
    score: number;
    isAnalyzing: boolean;
    isRateLimited: boolean;
    rateLimitCountdown: number;
    analysisComplete: boolean;
    recommendations: Recommendation[];
    swotData: SwotAnalysis | null;
    selectedRecId: number | null;
    changeLog: ChangeLogEntry[];
    scanProgress: ScanProgress;
    undoHistory: Array<{ documentText: string; recommendations: Recommendation[] }>;
    heatmapEnabled: boolean;
    analysisDepth: AnalysisDepth;
    
    // Actions
    setScore: (score: number) => void;
    setIsAnalyzing: (isAnalyzing: boolean) => void;
    setIsRateLimited: (isLimited: boolean) => void;
    setRateLimitCountdown: (countdown: number) => void;
    setAnalysisComplete: (complete: boolean) => void;
    setRecommendations: (recs: Recommendation[] | ((prev: Recommendation[]) => Recommendation[])) => void;
    setSwotData: (data: SwotAnalysis | null) => void;
    setSelectedRecId: (id: number | null) => void;
    setChangeLog: (log: ChangeLogEntry[] | ((prev: ChangeLogEntry[]) => ChangeLogEntry[])) => void;
    setScanProgress: (progress: ScanProgress) => void;
    setUndoHistory: (history: Array<{ documentText: string; recommendations: Recommendation[] }> | ((prev: Array<{ documentText: string; recommendations: Recommendation[] }>) => Array<{ documentText: string; recommendations: Recommendation[] }>)) => void;
    setHeatmapEnabled: (enabled: boolean) => void;
    setAnalysisDepth: (depth: AnalysisDepth) => void;
    
    // Complex Actions
    addToChangeLog: (rec: Recommendation) => void;
    clearAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
    score: 0,
    isAnalyzing: false,
    isRateLimited: false,
    rateLimitCountdown: 0,
    analysisComplete: false,
    recommendations: [],
    swotData: null,
    selectedRecId: null,
    changeLog: [],
    scanProgress: { current: 0, total: 0 },
    undoHistory: [],
    heatmapEnabled: false,
    analysisDepth: 'standard',

    setScore: (score) => set({ score }),
    setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
    setIsRateLimited: (isRateLimited) => set({ isRateLimited }),
    setRateLimitCountdown: (rateLimitCountdown) => set({ rateLimitCountdown }),
    setAnalysisComplete: (analysisComplete) => set({ analysisComplete }),
    setRecommendations: (recs) => set((state) => ({ 
        recommendations: typeof recs === 'function' ? recs(state.recommendations) : recs 
    })),
    setSwotData: (swotData) => set({ swotData }),
    setSelectedRecId: (selectedRecId) => set({ selectedRecId }),
    setChangeLog: (log) => set((state) => ({ 
        changeLog: typeof log === 'function' ? log(state.changeLog) : log 
    })),
    setScanProgress: (scanProgress) => set({ scanProgress }),
    setUndoHistory: (history) => set((state) => ({ 
        undoHistory: typeof history === 'function' ? history(state.undoHistory) : history 
    })),
    setHeatmapEnabled: (heatmapEnabled) => set({ heatmapEnabled }),
    setAnalysisDepth: (analysisDepth) => set({ analysisDepth }),

    addToChangeLog: (rec) => set((state) => {
        const entry: ChangeLogEntry = {
            id: Date.now(),
            title: rec.title,
            original: rec.currentText,
            new: rec.proposedText,
            user: "Current User",
            timestamp: formatDate(new Date())
        };
        return { changeLog: [entry, ...state.changeLog] };
    }),
    
    clearAnalysis: () => set({
        score: 0,
        analysisComplete: false,
        recommendations: [],
        swotData: null,
        heatmapEnabled: false
    })
}));
