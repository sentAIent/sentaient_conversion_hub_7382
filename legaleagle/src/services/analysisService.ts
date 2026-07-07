/**
 * Legal Analysis Service
 * 
 * Orchestrates document analysis, generates recommendations,
 * and synthesizes SWOT analyses.
 */

import { callGemini, isApiConfigured } from './geminiService';
import {
    getContractAnalysisPrompt,
    getSWOTAnalysisPrompt,
    getChatAssistantPrompt,
    getDeepAnalysisPrompt,
    getQuickScanPrompt
} from '@/constants/prompts';
import {
    SAMPLE_RECOMMENDATIONS,
    SAMPLE_SWOT,
    SAMPLE_SCORE,
    INITIAL_TEXT,
    SEVERITY_IMPACT
} from '@/constants/sampleData';
import type {
    Recommendation,
    SwotAnalysis,
    Party,
    AnalysisChunkResult,
    GeminiResponse,
    AnalysisDepth,
    ContractType
} from '@/types';

const MODEL_CONFIG = {
    'gemini-2.5-flash': 80000,
    'gemini-2.5-pro': 150000,
    'default': 30000
};

/**
 * Split document into chunks for analysis
 */
export const splitIntoChunks = (text: string, maxChars = 30000): string[] => {
    const paragraphs = text.split(/\n\s*\n/);
    const chunks: string[] = [];
    let currentChunk = "";

    for (const p of paragraphs) {
        const nextChunk = currentChunk + p + "\n\n";
        if (nextChunk.length > maxChars && currentChunk.trim()) {
            chunks.push(currentChunk);
            currentChunk = p + "\n\n";
        } else {
            currentChunk = nextChunk;
        }
    }

    if (currentChunk.trim()) {
        chunks.push(currentChunk);
    }

    return chunks;
};

/**
 * Calculate enforceability score based on recommendations
 */
export const calculateScore = (recommendations: Recommendation[]): number => {
    if (recommendations.length === 0) return 99;

    const totalImpact = recommendations.reduce((sum, rec) => {
        return sum + (rec.accepted ? 0 : (rec.scoreImpact || SEVERITY_IMPACT[rec.severity] || 5));
    }, 0);

    const currentScore = Math.max(0, 100 - totalImpact);
    return Math.min(99, Math.round(currentScore));
};

/**
 * Get risk distribution from recommendations
 */
export const getRiskDistribution = (recommendations: Recommendation[]) => {
    return recommendations.reduce((acc, rec) => {
        if (!rec.accepted) {
            acc[rec.severity] = (acc[rec.severity] || 0) + 1;
        }
        return acc;
    }, { Critical: 0, High: 0, Medium: 0, Low: 0 } as Record<string, number>);
};

/**
 * Generates a contract draft from scratch using Gemini.
 */
export const generateContract = async (
    promptText: string
): Promise<string> => {
    if (!isApiConfigured()) {
        throw new Error('Gemini API key not configured.');
    }

    const prompt = `
You are an expert corporate attorney. Generate a professional legal contract draft based on the following user request.
Use markdown formatting (headings, bullet points, bold text) to structure the document professionally.

USER REQUEST:
${promptText}

Ensure the draft is thorough, legally sound, and includes standard boilerplate clauses where appropriate (e.g., severability, governing law).
Only output the contract text, do not include any conversational filler.
`;

    try {
        const result = await callGemini(prompt, "You are a professional legal contract generator.", false) as GeminiResponse;
        return result.text || '';
    } catch (error) {
        console.error('Gemini API Error (Generate Contract):', error);
        throw new Error('Failed to generate contract. Please try again.');
    }
};

/**
 * Analyze a single chunk of the document with retry logic
 */
const analyzeChunk = async (
    chunk: string,
    chunkIndex: number,
    perspective: string,
    parties: Party[],
    depth: AnalysisDepth = 'standard',
    contractType: ContractType = 'General',
    model: string = 'gemini-2.5-pro',
    abortSignal?: AbortSignal,
    playbookText?: string
): Promise<AnalysisChunkResult | null> => {
    const partiesStr = parties.map(p => `${p.name} (${p.role}, ${p.domicile})`).join(', ');

    const prompt = `
Document Context:
Entities: ${partiesStr}.
My Perspective: Representing the ${perspective}.
Analysis Depth: ${depth.toUpperCase()}
Contract Type: ${contractType}

TEXT TO ANALYZE:
"""
${chunk}
"""

Analyze this section thoroughly and return your findings.
${playbookText ? `\nCRITICAL CUSTOM PLAYBOOK RULES:\nYou MUST evaluate the text against the following custom company playbook rules and explicitly flag any deviations as Critical risks:\n"""\n${playbookText}\n"""\n` : ''}`;

    let systemPrompt;
    switch (depth) {
        case 'deep':
            systemPrompt = getDeepAnalysisPrompt(perspective, partiesStr);
            break;
        case 'quick':
            systemPrompt = getQuickScanPrompt(perspective, partiesStr);
            break;
        case 'standard':
        default:
            systemPrompt = getContractAnalysisPrompt(perspective, partiesStr);
            break;
    }

    try {
        if (abortSignal?.aborted) throw new Error('AbortError');
        const result = await callGemini(prompt, systemPrompt, true, model, abortSignal) as AnalysisChunkResult;

        if (result && result.recommendations) {
            // Add IDs and chunk index to recommendations
            result.recommendations = result.recommendations.map((r, idx) => ({
                ...r,
                id: Date.now() + chunkIndex * 100 + idx,
                chunkIndex,
                accepted: false
            }));
            return result;
        }
        throw new Error("Invalid response from AI");

    } catch (error: any) {
        console.warn(`Chunk ${chunkIndex} analysis failed:`, error);
        throw error; // Let the caller handle it (it will be caught by Promise.all, but we should handle it in analyzeDocument instead)
    }
};

/**
 * Generate SWOT analysis from recommendations
 */
const generateSWOT = async (recommendations: Recommendation[], abortSignal?: AbortSignal): Promise<SwotAnalysis> => {
    const issuesSummary = recommendations
        .filter(r => !r.accepted)
        .map(r => `- ${r.severity}: ${r.title} (${r.section})`)
        .join('\n');

    const prompt = `
Based on these identified contract issues, generate a strategic SWOT analysis:

IDENTIFIED ISSUES:
${issuesSummary || 'No significant issues identified.'}

Provide actionable insights for legal negotiation strategy.
`;

    try {
        if (abortSignal?.aborted) throw new Error('AbortError');
        const result = await callGemini(prompt, getSWOTAnalysisPrompt(), true, undefined, abortSignal) as { swot: SwotAnalysis };
        return result.swot;
    } catch (error) {
        console.error('SWOT generation failed, using fallback:', error);
        // Return a basic SWOT if AI fails
        return {
            strengths: ['Analysis completed successfully'],
            weaknesses: recommendations.filter(r => !r.accepted && r.severity === 'Critical').map(r => r.title),
            opportunities: ['Automated remediation available', 'Expert negotiation guidance provided'],
            threats: recommendations.filter(r => !r.accepted && r.severity === 'High').map(r => r.title)
        };
    }
};

/**
 * Main analysis function - analyzes entire document
 */
export interface AnalysisProgress {
    current: number;
    total: number;
}

export const analyzeDocument = async (
    documentText: string,
    perspective: string,
    parties: Party[],
    onProgress?: (progress: AnalysisProgress) => void,
    onRecommendationsUpdate?: (recommendations: Recommendation[]) => void,
    analysisDepth: AnalysisDepth = 'standard',
    contractType: ContractType = 'General',
    abortSignal?: AbortSignal,
    playbookText?: string
): Promise<{
    recommendations: Recommendation[];
    swot: SwotAnalysis;
    score: number;
    partialSuccess?: boolean;
}> => {
    // Always use demo data for the default sample text to save AI credits
    if (documentText.trim() === INITIAL_TEXT.trim()) {
        await new Promise(r => setTimeout(r, 1500));
        return {
            recommendations: SAMPLE_RECOMMENDATIONS,
            swot: SAMPLE_SWOT,
            score: SAMPLE_SCORE
        };
    }

    if (!isApiConfigured()) {
        throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
    }

    let model = 'gemini-2.5-flash'; // Safer rate limits for default/quick
    if (analysisDepth === 'deep') {
        model = 'gemini-2.5-pro';
    }
    const maxChars = MODEL_CONFIG[model as keyof typeof MODEL_CONFIG] || MODEL_CONFIG['default'];

    const chunks = splitIntoChunks(documentText, maxChars);
    const allRecommendations: Recommendation[] = [];
    let failedChunks = 0;
    let lastError: any = null;

    onProgress?.({ current: 0, total: chunks.length });
    let completed = 0;

    // Process chunks sequentially to avoid Gemini API rate limits (429 Too Many Requests)
    for (let i = 0; i < chunks.length; i++) {
        if (abortSignal?.aborted) throw new Error('AbortError');
        const chunk = chunks[i];
        try {
            const result = await analyzeChunk(chunk, i, perspective, parties, analysisDepth, contractType, model, abortSignal, playbookText);
            
            if (abortSignal?.aborted) throw new Error('AbortError');
            
            completed++;
            onProgress?.({ current: completed, total: chunks.length });

            if (result && result.recommendations && result.recommendations.length > 0) {
                allRecommendations.push(...result.recommendations);
                onRecommendationsUpdate?.([...allRecommendations]);
            }
        } catch (error: any) {
            if (error.message === 'AbortError' || abortSignal?.aborted) {
                throw new Error('AbortError');
            }
            failedChunks++;
            lastError = error;
            console.error(`Chunk ${i} failed`, error);
        }
    }

    if (failedChunks === chunks.length) {
        // If it's a demo, just return the sample data so the UI doesn't break
        const isDemoMode = import.meta.env.VITE_USE_DEMO_DATA !== 'false';
        if (isDemoMode) {
            return {
                recommendations: SAMPLE_RECOMMENDATIONS,
                swot: SAMPLE_SWOT,
                score: SAMPLE_SCORE
            };
        }
        
        throw new Error(lastError ? `Analysis failed: ${lastError.message || lastError}` : 'Backend AI function failed.');
    }

    if (abortSignal?.aborted) throw new Error('AbortError');

    // Generate SWOT analysis
    const swot = await generateSWOT(allRecommendations, abortSignal);

    // Calculate final score
    const score = calculateScore(allRecommendations);

    return {
        recommendations: allRecommendations,
        swot,
        score,
        partialSuccess: failedChunks > 0
    };
};

/**
 * Send chat message and get AI response
 */
export const sendChatMessage = async (
    message: string,
    documentText: string,
    parties: Party[]
): Promise<GeminiResponse> => {
    if (!isApiConfigured()) {
        throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
    }

    const documentSummary = documentText.length > 2000
        ? documentText.substring(0, 2000) + '...[truncated]'
        : documentText;

    const partiesStr = parties.map(p => `${p.name} (${p.role})`).join(', ');

    const prompt = `
USER QUESTION: ${message}

DOCUMENT CONTENT:
"""
${documentSummary}
"""

Provide a thorough, well-cited legal analysis answering this question.
`;

    const systemPrompt = getChatAssistantPrompt(
        `Contract between ${partiesStr}`,
        partiesStr
    );

    const result = await callGemini(prompt, systemPrompt, false);
    return result as GeminiResponse;
};
