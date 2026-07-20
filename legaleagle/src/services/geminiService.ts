/**
 * Gemini API Service (via Supabase Edge Functions)
 * 
 * Securely calls the Gemini API via our Supabase Edge Function
 * so the API key remains hidden from the frontend.
 */

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useSettingsStore } from '@/store';
import type { GeminiResponse } from '@/types';

/**
 * Check if the API is configured
 */
export const isApiConfigured = (): boolean => {
    return !!import.meta.env.VITE_GEMINI_API_KEY || isSupabaseConfigured;
};

/**
 * Delay utility for retry backoff
 */
const delay = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

/**
 * Ordered list of models to try — cheapest/most quota first
 */
const MODEL_FALLBACK_CHAIN = [
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.5-pro',
];

/**
 * Call Gemini API securely via Edge Function with automatic retry and model fallback
 */
export const callGemini = async (
    prompt: string,
    systemPrompt: string,
    isJson = false,
    customModel?: string,
    abortSignal?: AbortSignal
): Promise<GeminiResponse | Record<string, unknown>> => {
    const { useLocalAI, localAiEndpoint } = useSettingsStore.getState();

    if (useLocalAI && localAiEndpoint) {
        if (abortSignal?.aborted) throw new Error('AbortError');
        
        const combinedPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
        try {
            const response = await fetch(localAiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama3',
                    prompt: combinedPrompt,
                    stream: false,
                    format: isJson ? 'json' : undefined
                }),
                signal: abortSignal
            });

            if (!response.ok) {
                throw new Error(`Local API error (${response.status})`);
            }

            const data = await response.json();
            const textResult = data.response || '';
            
            if (isJson) {
                try {
                    const cleanText = textResult.replace(/```json|```/g, '').trim();
                    return JSON.parse(cleanText);
                } catch (e) {
                    // Fallback if parsing fails
                    return { text: textResult };
                }
            }
            return { text: textResult, sources: [] };
        } catch (error) {
            console.error('Local AI Error:', error);
            throw new Error('Failed to connect to Local AI endpoint. Ensure Ollama is running and CORS is configured.');
        }
    }

    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!geminiKey && !isSupabaseConfigured) {
        throw new Error('Neither Gemini API key nor Supabase is configured. Cannot call the AI backend.');
    }

    if (abortSignal?.aborted) {
        throw new Error('AbortError');
    }

    // If a specific model was requested, only try that one + its fallback
    // Otherwise start from the cheapest model in the chain
    const modelsToTry = customModel
        ? [customModel, ...MODEL_FALLBACK_CHAIN.filter(m => m !== customModel)]
        : [...MODEL_FALLBACK_CHAIN];

    let lastError: any = null;

    for (const model of modelsToTry) {
        if (abortSignal?.aborted) throw new Error('AbortError');

        // Per-model retry with exponential backoff (only for transient errors)
        const retryDelays = [1000, 3000];

        for (let attempt = 0; attempt <= retryDelays.length; attempt++) {
            try {
                if (abortSignal?.aborted) throw new Error('AbortError');

                let textResult = '';
                let sourcesResult: any[] = [];

                if (geminiKey) {
                    // Direct API call for local development/testing
                    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
                    const combinedPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;

                    const requestBody: any = {
                        contents: [{ parts: [{ text: combinedPrompt }] }],
                        generationConfig: { temperature: 0.2 }
                    };
                    if (isJson) requestBody.generationConfig.responseMimeType = "application/json";

                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody),
                        signal: abortSignal
                    });

                    if (!response.ok) {
                        const errText = await response.text();
                        const error = new Error(`Gemini API error (${response.status}): ${errText}`);
                        (error as any).status = response.status;
                        throw error;
                    }

                    const responseData = await response.json();
                    textResult = responseData.candidates?.[0]?.content?.parts?.[0]?.text || '';
                } else {
                    // Supabase Edge Function fallback
                    const abortPromise = new Promise<{data: any, error: any}>((_, reject) => {
                        if (abortSignal) {
                            abortSignal.addEventListener('abort', () => reject(new Error('AbortError')));
                        }
                    });

                    const invokePromise = supabase.functions.invoke('analyze-document', {
                        body: { prompt, systemPrompt, isJson, customModel: model },
                    });

                    const { data, error } = await Promise.race([invokePromise, abortPromise]);

                    if (abortSignal?.aborted) throw new Error('AbortError');

                    if (error) {
                        const isAuthError =
                            error.message?.includes('Unauthorized') ||
                            error.message?.includes('JWT') ||
                            (error as any).status === 401 ||
                            error.message?.includes('401');

                        if (isAuthError) {
                            throw new Error('Authentication required. Please sign out and sign back in.');
                        }
                        throw error;
                    }

                    if (data.error) throw new Error(`Edge Function Error: ${data.error}`);

                    textResult = data.text;
                    sourcesResult = data.sources || [];
                }

                if (isJson) {
                    const cleanText = textResult.replace(/```json|```/g, '').trim();
                    return JSON.parse(cleanText);
                }

                return { text: textResult, sources: sourcesResult };

            } catch (error: any) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                lastError = error;

                if (errorMessage.includes('AbortError')) throw error;
                if (errorMessage.includes('signed in')) throw error;

                // On quota exhaustion (429), break out of per-model retries and try next model
                if (error.status === 429 || errorMessage.includes('429')) {
                    console.warn(`[Gemini] Model ${model} quota exhausted, trying next model...`);
                    break; // break inner retry loop, move to next model
                }

                // Handle model deprecation/not found (404 or 400)
                if (error.status === 404 || error.status === 400 || errorMessage.includes('404') || errorMessage.includes('400')) {
                    const isModelError = errorMessage.toLowerCase().includes('model') && 
                                       (errorMessage.toLowerCase().includes('not found') || 
                                        errorMessage.toLowerCase().includes('no longer available') ||
                                        errorMessage.toLowerCase().includes('not exist'));
                    if (isModelError || error.status === 404) {
                        console.warn(`[Gemini] Model ${model} is deprecated or not found. Falling back to next model...`);
                        break; // break inner retry loop, move to next model
                    }
                }

                // Non-retryable client errors (except 429 and deprecation handled above)
                if (error.status && error.status >= 400 && error.status < 500) {
                    throw error;
                }

                // Transient server error — retry with backoff
                if (attempt < retryDelays.length) {
                    await delay(retryDelays[attempt]);
                } else {
                    break; // exhausted retries for this model, try next
                }
            }
        }
    }

    console.error('[Gemini Backend] All models exhausted:', lastError);
    throw lastError || new Error('All Gemini models are unavailable. Please try again later.');
};


/**
 * Test API connection
 */
export const testConnection = async (): Promise<boolean> => {
    try {
        const result = await callGemini(
            'Respond with exactly: "Connection successful"',
            'You are a test assistant. Follow instructions exactly.',
            false
        ) as GeminiResponse;
        return result.text?.includes('successful') || false;
    } catch {
        return false;
    }
};
