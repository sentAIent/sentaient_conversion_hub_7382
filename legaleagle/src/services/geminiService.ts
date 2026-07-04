/**
 * Gemini API Service
 * 
 * Handles all communication with Google's Gemini API including
 * retry logic, error handling, and response parsing.
 */

import type { GeminiResponse } from '@/types';

const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Get API configuration from environment
 */
const getConfig = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-001';
    const debug = import.meta.env.VITE_DEBUG === 'true';

    return { apiKey, model, debug };
};

/**
 * Check if API key is configured
 */
export const isApiConfigured = (): boolean => {
    const { apiKey } = getConfig();
    return Boolean(apiKey && apiKey.length > 0);
};

/**
 * Delay utility for retry backoff
 */
const delay = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

/**
 * Call Gemini API with automatic retry logic
 */
export const callGemini = async (
    prompt: string,
    systemPrompt: string,
    isJson = false,
    customModel?: string
): Promise<GeminiResponse | Record<string, unknown>> => {
    const { apiKey, model, debug } = getConfig();

    if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY is not configured. Please add it to your .env file.');
    }

    const selectedModel = customModel || model;
    const url = `${API_BASE_URL}/${selectedModel}:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        ...(isJson && {
            generationConfig: { responseMimeType: "application/json" }
        })
    };

    // Exponential backoff delays for retries
    const retryDelays = [1000, 2000, 4000, 8000];

    for (let attempt = 0; attempt <= retryDelays.length; attempt++) {
        try {
            if (debug) {
                console.log(`[Gemini] Attempt ${attempt + 1} to ${selectedModel}`);
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Client errors (4xx) - don't retry
            if (response.status === 401) {
                throw new Error('API Key is invalid. Please check your VITE_GEMINI_API_KEY.');
            }

            if (response.status === 403) {
                throw new Error('API access forbidden. Please check your API key permissions.');
            }

            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please wait a moment and try again.');
            }

            if (response.status >= 400 && response.status < 500) {
                const errorText = await response.text();
                throw new Error(`API Error (${response.status}): ${errorText}`);
            }

            // Server errors (5xx) - retry with backoff
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }

            const data = await response.json();

            if (debug) {
                console.log('[Gemini] Response received:', data);
            }

            const candidate = data.candidates?.[0];

            if (!candidate) {
                throw new Error('No response candidates returned from API');
            }

            const text = candidate?.content?.parts?.[0]?.text;

            if (isJson) {
                // Clean up markdown wrapping before parsing
                const cleanText = text?.replace(/```json|```/g, '').trim();
                if (!cleanText) {
                    throw new Error('Empty JSON response from API');
                }
                return JSON.parse(cleanText);
            }

            // Extract sources for chat responses
            let sources: GeminiResponse['sources'] = [];
            const groundingMetadata = candidate?.groundingMetadata;

            if (groundingMetadata?.groundingChunks) {
                sources = groundingMetadata.groundingChunks
                    .filter((chunk: { web?: { uri?: string; title?: string } }) => chunk.web)
                    .map((chunk: { web: { uri?: string; title?: string } }) => ({
                        uri: chunk.web.uri,
                        title: chunk.web.title,
                    }));
            } else if (groundingMetadata?.groundingAttributions) {
                sources = groundingMetadata.groundingAttributions
                    .map((attribution: { web?: { uri?: string; title?: string } }) => ({
                        uri: attribution.web?.uri,
                        title: attribution.web?.title,
                    }))
                    .filter((source: { uri?: string; title?: string }) => source.uri && source.title);
            }

            return { text: text || '', sources };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';

            // Don't retry client errors
            if (errorMessage.includes('API Key') ||
                errorMessage.includes('forbidden') ||
                errorMessage.includes('Rate limit') ||
                errorMessage.includes('API Error')) {
                console.error('[Gemini] Client error, not retrying:', errorMessage);
                throw error;
            }

            // Retry server errors
            if (attempt < retryDelays.length) {
                if (debug) {
                    console.log(`[Gemini] Retrying in ${retryDelays[attempt]}ms...`);
                }
                await delay(retryDelays[attempt]);
            } else {
                console.error('[Gemini] All retries exhausted:', errorMessage);
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
