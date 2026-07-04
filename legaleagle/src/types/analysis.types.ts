// Analysis Types
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Recommendation {
    id: number;
    section: string;
    severity: Severity;
    category: string;
    title: string;
    roastTitle?: string;
    currentText: string;
    proposedText: string;
    legalBasis: string;
    roastComment?: string;
    scoreImpact: number;
    citation?: string;
    accepted: boolean;
    chunkIndex?: number;
}

export interface SwotAnalysis {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
}

export interface AnalysisResult {
    recommendations: Recommendation[];
    swot: SwotAnalysis | null;
    score: number;
}

export interface Party {
    id: number;
    name: string;
    role: string;
    domicile: string;
}

export interface ResearchItem {
    id: number;
    type: 'url' | 'text' | 'pdf';
    name: string;
    content: string;
}

export interface ChangeLogEntry {
    id: number;
    title: string;
    original: string;
    new: string;
    user: string;
    timestamp: string;
}

export interface ChatMessage {
    id: number | string;
    role: 'user' | 'ai';
    content: string;
    sources?: ChatSource[];
}

export interface ChatSource {
    uri?: string;
    title?: string;
}

export interface ScanProgress {
    current: number;
    total: number;
}

// Jurisdiction Types
export type Jurisdiction =
    | 'federal'
    | 'delaware'
    | 'new_york'
    | 'california'
    | 'texas'
    | 'florida'
    | 'illinois'
    | 'other';

export interface JurisdictionContext {
    primary: Jurisdiction;
    secondary?: Jurisdiction;
    governingLaw?: string;
}

// API Types
export interface GeminiResponse {
    text?: string;
    sources?: ChatSource[];
}

export interface AnalysisChunkResult {
    recommendations: Recommendation[];
    sectionScore?: number;
}

export type AnalysisDepth = 'quick' | 'standard' | 'deep';
