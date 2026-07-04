import { describe, it, expect, vi, beforeEach } from 'vitest';
import { callGemini } from './geminiService';

// Mock fetch
global.fetch = vi.fn();

describe('geminiService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock env vars
        vi.stubEnv('VITE_GEMINI_API_KEY', 'test-key');
    });

    it('should make a successful API call', async () => {
        const mockResponse = {
            candidates: [{
                content: {
                    parts: [{ text: '{"result": "success"}' }]
                }
            }]
        };

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => mockResponse
        } as Response);

        const result = await callGemini('prompt', 'system', true);
        expect(result).toEqual({ result: 'success' });
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should retry on 500 error', async () => {
        const mockResponse = {
            candidates: [{
                content: {
                    parts: [{ text: 'success' }]
                }
            }]
        };

        // First call fails
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            status: 500,
            text: async () => 'Server Error'
        } as Response);

        // Second call succeeds
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => mockResponse
        } as Response);

        const result = await callGemini('prompt', 'system', false);
        expect(result.text).toBe('success');
        expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should throw immediately on 401 error', async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            status: 401,
            text: async () => 'Unauthorized'
        } as Response);

        await expect(callGemini('prompt', 'system')).rejects.toThrow('API Key is invalid');
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
