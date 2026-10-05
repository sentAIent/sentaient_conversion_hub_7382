import { generateText, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

// Initialize the providers. 
// Note: In production, these should be handled securely on the backend / edge function,
// but for the sake of the client-side hub orchestration, we stub them here.
const openai = createOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'mock_openai_key'
});

const anthropic = createAnthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || 'mock_anthropic_key'
});

export class AISdkClient {
    /**
     * Standard text generation wrapper
     */
    static async generate(prompt, model = 'gpt-4o') {
        const providerModel = model.includes('claude') ? anthropic(model) : openai(model);
        
        const { text } = await generateText({
            model: providerModel,
            prompt: prompt,
        });
        
        return text;
    }

    /**
     * Streaming wrapper for real-time UI updates
     */
    static async stream(prompt, onChunk, model = 'gpt-4o') {
        const providerModel = model.includes('claude') ? anthropic(model) : openai(model);

        const { textStream } = await streamText({
            model: providerModel,
            prompt: prompt,
        });

        for await (const textPart of textStream) {
            onChunk(textPart);
        }
    }
}
