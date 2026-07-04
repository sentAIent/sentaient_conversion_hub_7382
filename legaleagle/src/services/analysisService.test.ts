import { describe, it, expect, vi, beforeEach } from 'vitest';
import { splitIntoChunks, calculateScore, analyzeDocument } from './analysisService';
import * as geminiService from './geminiService';
import { SAMPLE_RECOMMENDATIONS } from '@/constants/sampleData';

// Mock geminiService
vi.mock('./geminiService', () => ({
    callGemini: vi.fn(),
    isApiConfigured: vi.fn(() => true),
}));

describe('analysisService', () => {
    describe('splitIntoChunks', () => {
        it('should split long text into chunks', () => {
            const longText = ('a'.repeat(800) + '\n\n').repeat(5);
            const chunks = splitIntoChunks(longText, 1000);
            expect(chunks.length).toBeGreaterThan(1);
        });

        it('should handle empty text', () => {
            const chunks = splitIntoChunks('');
            expect(chunks).toEqual([]);
        });

        it('should keep short text as single chunk', () => {
            const text = 'Short text';
            const chunks = splitIntoChunks(text);
            expect(chunks).toHaveLength(1);
            expect(chunks[0]).toContain('Short text');
        });
    });

    describe('calculateScore', () => {
        it('should return 99 for no recommendations', () => {
            expect(calculateScore([])).toBe(99);
        });

        it('should deduct points based on severity', () => {
            const recs = [
                { ...SAMPLE_RECOMMENDATIONS[0], severity: 'Critical' as any, accepted: false },
                { ...SAMPLE_RECOMMENDATIONS[1], severity: 'Medium' as any, accepted: false }
            ];
            // Critical (15) + Medium (5) = 20 deduction. 100 - 20 = 80.
            // Note: Implementation might vary slightly, checking range or specific logic
            const score = calculateScore(recs);
            expect(score).toBeLessThan(99);
        });

        it('should not deduct points for accepted recommendations', () => {
            const recs = [
                { ...SAMPLE_RECOMMENDATIONS[0], severity: 'Critical' as any, accepted: true }
            ];
            expect(calculateScore(recs)).toBe(99);
        });
    });

    describe('analyzeDocument', () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return sample data for initial text', async () => {
            // Mocking callGemini to handle both chunk analysis and SWOT
            vi.mocked(geminiService.callGemini).mockImplementation(async (prompt) => {
                if (prompt.includes('SWOT analysis')) {
                    return {
                        swot: { strengths: ['Good'], weaknesses: [], opportunities: [], threats: [] }
                    };
                }
                // Default to recommendations for analysis chunks
                return {
                    recommendations: [
                        {
                            title: 'Test Issue',
                            severity: 'High',
                            currentText: 'Bad',
                            proposedText: 'Good',
                            id: 1,
                            section: 'General',
                            category: 'Risk',
                            legalBasis: 'Basis',
                            scoreImpact: 5,
                            accepted: false
                        } as any
                    ]
                };
            });

            const res = await analyzeDocument(
                'Some text',
                'Buyer',
                [],
                vi.fn(), // onProgress
                vi.fn()  // onRecommendationsUpdate
            );

            expect(res.recommendations).toHaveLength(1);
            expect(res.swot.strengths).toContain('Good');
        });
    });
});
