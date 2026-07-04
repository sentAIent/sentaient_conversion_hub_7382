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
    AnalysisDepth
} from '@/types';

/**
 * Split document into chunks for analysis
 */
export const splitIntoChunks = (text: string, maxChars = 3000): string[] => {
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
 * Analyze a single chunk of the document with retry logic
 */
const analyzeChunk = async (
    chunk: string,
    chunkIndex: number,
    perspective: string,
    parties: Party[],
    depth: AnalysisDepth = 'standard',
    retries = 3
): Promise<AnalysisChunkResult | null> => {
    const partiesStr = parties.map(p => `${p.name} (${p.role}, ${p.domicile})`).join(', ');

    const prompt = `
Document Context:
Entities: ${partiesStr}.
My Perspective: Representing the ${perspective}.
Analysis Depth: ${depth.toUpperCase()}

TEXT TO ANALYZE:
"""
${chunk}
"""

Analyze this section thoroughly and return your findings.
`;

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

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const result = await callGemini(prompt, systemPrompt, true) as AnalysisChunkResult;

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
            // If result is null/invalid but no error thrown, retry
            throw new Error("Invalid response from AI");

        } catch (error) {
            console.warn(`Chunk ${chunkIndex} analysis failed (attempt ${attempt + 1}/${retries + 1}):`, error);
            if (attempt === retries) {
                console.error(`Chunk ${chunkIndex} failed after all retries.`);
                return null;
            }
            // Exponential backoff: 1s, 2s, 4s
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
    }
    return null;
};

/**
 * Generate SWOT analysis from recommendations
 */
const generateSWOT = async (recommendations: Recommendation[]): Promise<SwotAnalysis> => {
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
        const result = await callGemini(prompt, getSWOTAnalysisPrompt(), true) as { swot: SwotAnalysis };
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
    analysisDepth: AnalysisDepth = 'standard'
): Promise<{
    recommendations: Recommendation[];
    swot: SwotAnalysis;
    score: number;
    partialSuccess?: boolean;
}> => {
    // Check API configuration
    if (!isApiConfigured()) {
        // If API is not configured, fallback to sample data for the sample text
        if (documentText.trim() === INITIAL_TEXT.trim()) {
            // Simulate brief processing delay
            await new Promise(r => setTimeout(r, 1500));
            return {
                recommendations: SAMPLE_RECOMMENDATIONS,
                swot: SAMPLE_SWOT,
                score: SAMPLE_SCORE
            };
        }
        throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
    }

    // If API is configured, we ALWAYS analyze for real, even the sample text.
    // This ensures the different analysis depths (Quick vs Deep) actually work.

    const chunks = splitIntoChunks(documentText);
    const allRecommendations: Recommendation[] = [];
    let failedChunks = 0;

    onProgress?.({ current: 0, total: chunks.length });

    // Analyze each chunk
    for (let i = 0; i < chunks.length; i++) {
        onProgress?.({ current: i + 1, total: chunks.length });

        const result = await analyzeChunk(chunks[i], i, perspective, parties, analysisDepth);

        if (result && result.recommendations && result.recommendations.length > 0) {
            allRecommendations.push(...result.recommendations);
            onRecommendationsUpdate?.(allRecommendations);
        } else if (result === null) {
            failedChunks++;
        }
    }

    // Generate SWOT analysis
    const swot = await generateSWOT(allRecommendations);

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
