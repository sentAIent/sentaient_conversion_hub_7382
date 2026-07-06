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
    return isSupabaseConfigured;
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
    if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured. Cannot call the AI backend.');
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

            const { data, error } = await supabase.functions.invoke('analyze-document', {
                body: payload,
            });

            if (abortSignal?.aborted) {
                throw new Error('AbortError');
            }

            if (error) {
                // If it's an Auth error, don't retry
                if (error.message?.includes('Unauthorized') || error.message?.includes('JWT')) {
                     throw new Error('You must be signed in to analyze documents.');
                }
                throw error;
            }
            
            if (data.error) {
                throw new Error(`Edge Function Error: ${data.error}`);
            }

            if (isJson) {
                const cleanText = data.text.replace(/```json|```/g, '').trim();
                return JSON.parse(cleanText);
            }

            return {
                text: data.text,
                sources: data.sources || []
            };

        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';

            if (errorMessage.includes('signed in')) {
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
