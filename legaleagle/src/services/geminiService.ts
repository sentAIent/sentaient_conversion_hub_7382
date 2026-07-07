/**
 * Gemini API Service (via Supabase Edge Functions)
 * 
 * Securely calls the Gemini API via our Supabase Edge Function
 * so the API key remains hidden from the frontend.
 */

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
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
 * Call Gemini API securely via Edge Function with automatic retry logic
 */
export const callGemini = async (
    prompt: string,
    systemPrompt: string,
    isJson = false,
    customModel?: string,
    abortSignal?: AbortSignal
): Promise<GeminiResponse | Record<string, unknown>> => {
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!geminiKey && !isSupabaseConfigured) {
        throw new Error('Neither Gemini API key nor Supabase is configured. Cannot call the AI backend.');
    }

    if (abortSignal?.aborted) {
        throw new Error('AbortError');
    }

    const payload = {
        prompt,
        systemPrompt,
        isJson,
        customModel
    };

    // Exponential backoff delays for retries
    const retryDelays = [1000, 2000, 4000, 8000];

    for (let attempt = 0; attempt <= retryDelays.length; attempt++) {
        try {
            if (abortSignal?.aborted) {
                throw new Error('AbortError');
            }

            let textResult = '';
            let sourcesResult: any[] = [];
            
            if (geminiKey) {
                // Direct API call for local development/testing
                const model = customModel || 'gemini-2.5-pro';
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
                    body: payload,
                });

                const { data, error } = await Promise.race([invokePromise, abortPromise]);

                if (abortSignal?.aborted) {
                    throw new Error('AbortError');
                }

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
                
                if (data.error) {
                    throw new Error(`Edge Function Error: ${data.error}`);
                }
                
                textResult = data.text;
                sourcesResult = data.sources || [];
            }

            if (isJson) {
                const cleanText = textResult.replace(/```json|```/g, '').trim();
                return JSON.parse(cleanText);
            }

            return {
                text: textResult,
                sources: sourcesResult
            };

        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';

            if (errorMessage.includes('AbortError')) {
                throw error;
            }

            if (errorMessage.includes('signed in')) {
                throw error;
            }

            // Don't retry client errors except 429
            if (error.status && error.status >= 400 && error.status < 500 && error.status !== 429) {
                throw error;
            }

            if (attempt < retryDelays.length) {
                await delay(retryDelays[attempt]);
            } else {
                console.error('[Gemini Backend] All retries exhausted:', errorMessage);
                throw error;
            }
        }
    }

    throw new Error('Unexpected error in API call');
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
