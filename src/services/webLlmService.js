import { CreateMLCEngine } from '@mlc-ai/web-llm';

/**
 * WebLlmService
 * Handles downloading and running LLMs directly inside the user's browser via WebGPU.
 * Zero server costs. Maximum privacy.
 */
export class WebLlmService {
    constructor() {
        this.engine = null;
        this.isLoaded = false;
        // Default model: Llama-3 8B optimized for WebGPU
        this.selectedModel = 'Llama-3-8B-Instruct-q4f32_1-MLC'; 
    }

    /**
     * Initializes the WebGPU engine and downloads the model to browser cache.
     * @param {function} onProgress - Callback for download progress UI (0.0 to 1.0)
     */
    async initialize(onProgress) {
        if (this.isLoaded) return;
        
        console.log("[WebLLM] Initializing WebGPU Engine...");
        
        const initProgressCallback = (initProgress) => {
            console.log(`[WebLLM] Loading: ${Math.round(initProgress.progress * 100)}%`);
            if (onProgress) onProgress(initProgress.progress);
        };

        try {
            this.engine = await CreateMLCEngine(
                this.selectedModel, 
                { initProgressCallback }
            );
            this.isLoaded = true;
            console.log("[WebLLM] Engine fully loaded and ready!");
        } catch (error) {
            console.error("[WebLLM] Failed to initialize WebGPU:", error);
            throw error;
        }
    }

    /**
     * Generate text using the local GPU.
     */
    async generate(prompt) {
        if (!this.isLoaded) throw new Error("WebLLM Engine not initialized yet.");
        
        const messages = [
            { role: "system", content: "You are an expert AI conversion analyst." },
            { role: "user", content: prompt }
        ];

        console.log("[WebLLM] Generating response via WebGPU...");
        const reply = await this.engine.chat.completions.create({
            messages,
        });

        return reply.choices[0].message.content;
    }

    /**
     * Stream text using the local GPU.
     */
    async *streamGenerate(prompt) {
        if (!this.isLoaded) throw new Error("WebLLM Engine not initialized yet.");

        const messages = [
            { role: "system", content: "You are an expert AI conversion analyst." },
            { role: "user", content: prompt }
        ];

        const asyncChunkGenerator = await this.engine.chat.completions.create({
            messages,
            stream: true,
        });

        for await (const chunk of asyncChunkGenerator) {
            yield chunk.choices[0]?.delta?.content || "";
        }
    }
}

export const webLlm = new WebLlmService();
