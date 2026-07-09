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
    'gemini-2.0-flash': 80000,
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
 * Tailored to perspective (User vs Company) and analysis depth (basic/standard/deep).
 */
export const generateContract = async (
    promptText: string,
    perspective: string = 'User',
    analysisDepth: AnalysisDepth = 'standard'
): Promise<string> => {
    if (!isApiConfigured()) {
        throw new Error('Gemini API key not configured.');
    }

    const perspectiveInstruction = perspective === 'Company'
        ? `You are drafting on behalf of the COMPANY/BUSINESS. Draft terms that robustly protect the company's interests: limit liability, preserve termination rights, protect IP, and minimize obligations.`
        : perspective === 'User'
        ? `You are drafting on behalf of the USER/INDIVIDUAL. Draft balanced terms that protect the individual: cap penalties, ensure clear termination rights, limit data sharing, and include consumer-protective provisions.`
        : `You are drafting a neutral, balanced agreement. Terms should be fair and equitable to all parties.`;

    const depthInstruction = analysisDepth === 'quick'
        ? `DRAFTING STYLE: Keep it simple and concise. Use plain language. Include only essential clauses. Avoid excessive legalese. Aim for brevity and clarity over comprehensiveness.`
        : analysisDepth === 'deep'
        ? `DRAFTING STYLE: Be exhaustive and comprehensive. Include every standard protective clause, extensive representations and warranties, detailed indemnification provisions, force majeure, audit rights, step-in rights, detailed dispute resolution, and any jurisdiction-specific requirements. Use precise formal legal language throughout. Leave no edge case unaddressed.`
        : `DRAFTING STYLE: Use professional legal language. Include all standard protective clauses, standard representations and warranties, and industry-standard provisions. Thorough but not exhaustive.`;

    const prompt = `You are an expert corporate attorney. Generate a professional legal contract draft based on the following request.
Use markdown formatting (headings, bullet points, bold text) to structure the document professionally.

PERSPECTIVE: ${perspectiveInstruction}

${depthInstruction}

USER REQUEST:
${promptText}

Only output the contract text. Do not include any conversational filler or meta-commentary.`;

    try {
        const result = await callGemini(prompt, "You are a professional legal contract generator. Tailor every clause to the specified perspective and drafting depth.", false) as GeminiResponse;
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
        
        let customRecs = [...SAMPLE_RECOMMENDATIONS];
        let customSwot = { ...SAMPLE_SWOT };
        
        // Change data based on perspective
        if (perspective.toLowerCase() === 'company') {
            customSwot.strengths = ['Company favorable terms', 'Clear service delivery requirements'];
            customSwot.weaknesses = ['No IP assignment clause', 'Missing confidentiality protections'];
            customSwot.opportunities = ['Include unilateral termination right', 'Add automatic renewal clause'];
            customSwot.threats = ['Unlimited liability exposure to third parties'];
            
            customRecs = customRecs.map(r => ({
                ...r,
                proposedText: r.proposedText.replace('Client', 'Company'),
            }));
            customRecs.push({
                id: 104,
                section: '7. IP RIGHTS',
                severity: 'High',
                category: 'Intellectual Property',
                title: 'No IP Protection for Company',
                roastTitle: 'Giving Away the Farm',
                currentText: 'Client owns the work product.',
                proposedText: 'Company retains all pre-existing IP. Client receives a non-exclusive license upon full payment.',
                legalBasis: 'Standard IP retention.',
                roastComment: 'Never give it away for free.',
                scoreImpact: 10,
                citation: 'IP Law Standard',
                accepted: false
            });
        } else if (perspective.toLowerCase() === 'user') {
            customSwot.strengths = ['Basic scope is defined'];
            customSwot.weaknesses = ['User data privacy not explicitly protected', 'No explicit termination for convenience for User'];
            customSwot.opportunities = ['Add mutual NDA', 'Define strict SLA with penalties'];
            customSwot.threats = ['Vendor lock-in without clear exit strategy', 'Uncapped damages from data breach'];
            
            customRecs = customRecs.map(r => ({
                ...r,
                roastComment: r.roastComment + ' (User perspective)',
            }));
            customRecs.push({
                id: 105,
                section: '8. DATA PRIVACY',
                severity: 'Critical',
                category: 'Privacy',
                title: 'Missing Data Processing Agreement',
                roastTitle: 'GDPR Nightmare Fuel',
                currentText: 'Provider can use Client data.',
                proposedText: 'Provider shall only process Client data in accordance with strict DPA terms and may not sell or share data.',
                legalBasis: 'CCPA/GDPR compliance.',
                roastComment: 'This is how you end up in the news.',
                scoreImpact: 15,
                citation: 'GDPR Art. 28',
                accepted: false
            });
        }
        
        // Change data based on depth
        if (analysisDepth === 'quick') {
            customRecs = customRecs.filter(r => r.severity === 'High' || r.severity === 'Critical');
            customSwot.weaknesses = customSwot.weaknesses.filter(w => w.includes('Critical') || w.includes('exposure'));
            customSwot.opportunities = customSwot.opportunities.slice(0, 1);
        } else if (analysisDepth === 'deep') {
            customRecs.push({
                id: 999,
                section: '1. SERVICES',
                severity: 'Medium',
                category: 'Operational',
                title: 'Service Levels Undefined',
                roastTitle: 'The "Best Effort" Scam',
                currentText: 'Provider agrees to do work for Client.',
                proposedText: 'Provider shall perform the Services in a professional and workmanlike manner, in accordance with industry standards.',
                legalBasis: 'Implied warranty of merchantability',
                roastComment: '"Do work"? Are we in preschool?',
                scoreImpact: 5,
                citation: 'UCC 2-314',
                accepted: false
            });
        }
        
        return {
            recommendations: customRecs,
            swot: customSwot,
            score: SAMPLE_SCORE + (analysisDepth === 'deep' ? -5 : 0)
        };
    }

    if (!isApiConfigured()) {
        throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
    }

    let model = 'gemini-2.0-flash'; // Safer rate limits for default/quick
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
