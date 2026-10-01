import { pipeline, env } from '@xenova/transformers';
import LocalDB from './LocalDB.js';
import * as maxunClient from './maxunClient.js';
import screenpipeClient from './screenpipeClient.js';
import { Langfuse } from 'langfuse';

const langfuse = new Langfuse({
  publicKey: import.meta.env.VITE_LANGFUSE_PUBLIC_KEY,
  secretKey: import.meta.env.VITE_LANGFUSE_SECRET_KEY,
  baseUrl: "https://cloud.langfuse.com",
  flushAt: 1
});


// Configure transformers.js to use WebAssembly / WebGPU
env.backends.onnx.wasm.numThreads = 1;

/**
 * ModelRouter.js
 * Intelligent routing system to dispatch agent subtasks between local Ollama resources
 * and metered cloud APIs (Gemini/Claude) based on credit constraints and hardware profiles.
 */
export class ModelRouter {
    constructor(config = {}) {
        this.localOllamaUrl = config.localOllamaUrl || 'http://localhost:11434';
        this.cacheEndpoint = config.cacheEndpoint || null;
        this.stripeClient = config.stripeClient || null;
        this.browserGenerator = null;
        this.embedder = null;
        this.moderator = null;
        this.discoverActiveOllamaPort();
    }

    /**
     * Initializes the in-browser Transformer model
     */
    async initBrowserModel() {
        if (!this.browserGenerator) {
            console.log("[ModelRouter] Initializing in-browser Transformer (Qwen1.5-0.5B-Chat)...");
            try {
                this.browserGenerator = await pipeline('text-generation', 'Xenova/Qwen1.5-0.5B-Chat');
            } catch (err) {
                console.error("[ModelRouter] Failed to load browser model:", err);
            }
        }
    }

    /**
     * Executes the prompt entirely inside the browser using WebGPU/WASM
     */
    async executeBrowserModel(prompt) {
        await this.initBrowserModel();
        if (!this.browserGenerator) throw new Error("Browser model failed to initialize.");
        
        console.log("[ModelRouter] Executing in-browser inference...");
        const result = await this.browserGenerator(prompt, { max_new_tokens: 128 });
        return result[0]?.generated_text || "Failed to generate text in-browser.";
    }

    async initSemanticSearch() {
        if (!this.embedder) {
            console.log("[ModelRouter] Initializing in-browser Embedder (all-MiniLM-L6-v2)...");
            try {
                this.embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
            } catch (err) {
                console.error("[ModelRouter] Failed to load browser embedder:", err);
            }
        }
    }

    async initModeration() {
        if (!this.moderator) {
            console.log("[ModelRouter] Initializing in-browser Moderator (toxic-bert)...");
            try {
                this.moderator = await pipeline('text-classification', 'Xenova/toxic-bert');
            } catch (err) {
                console.error("[ModelRouter] Failed to load browser moderator:", err);
            }
        }
    }

    async getBrowserEmbeddings(text) {
        await this.initSemanticSearch();
        if (!this.embedder) throw new Error("Browser embedder failed to initialize.");
        const result = await this.embedder(text, { pooling: 'mean', normalize: true });
        return Array.from(result.data);
    }

    /**
     * Ingest a document, embed it, and store in IndexedDB
     */
    async ingestDocument(id, metadata) {
        const text = metadata.content;
        if (!text) return;
        const embedding = await this.getBrowserEmbeddings(text);
        await LocalDB.storeDocument(id, metadata, embedding);
    }

    /**
     * Ingest a URL via Maxun, scrape its markdown, embed it, and store it.
     */
    async ingestFromUrl(id, url) {
        console.log(`[ModelRouter] Ingesting URL via Maxun: ${url}`);
        const markdown = await maxunClient.scrapeUrlToMarkdown(url);
        const metadata = {
            content: markdown,
            source: url,
            type: 'web_scrape',
            timestamp: Date.now()
        };
        await this.ingestDocument(id, metadata);
        return metadata;
    }

    /**
     * Search IndexedDB using cosine similarity
     */
    async searchLocalDB(query, threshold = 0.3) {
        const queryVec = await this.getBrowserEmbeddings(query);
        const allDocs = await LocalDB.getAllDocuments();
        
        const cosineSimilarity = (vecA, vecB) => {
            let dotProduct = 0;
            let normA = 0;
            let normB = 0;
            for (let i = 0; i < vecA.length; i++) {
                dotProduct += vecA[i] * vecB[i];
                normA += vecA[i] * vecA[i];
                normB += vecB[i] * vecB[i];
            }
            if (normA === 0 || normB === 0) return 0;
            return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
        };

        const results = allDocs.map(doc => {
            return {
                ...doc,
                score: cosineSimilarity(queryVec, doc.embedding)
            };
        })
        .filter(doc => doc.score > threshold)
        .sort((a, b) => b.score - a.score);

        return results;
    }

    async moderateTextBrowser(text) {
        await this.initModeration();
        if (!this.moderator) throw new Error("Browser moderator failed to initialize.");
        const result = await this.moderator(text);
        return result;
    }

    /**
     * Probes common local ports to locate a running Ollama container/process.
     */
    async discoverActiveOllamaPort() {
        const candidatePorts = [11434, 11435, 12434, 8000];
        for (const port of candidatePorts) {
            try {
                const response = await fetch(`http://localhost:${port}/api/tags`);
                if (response.ok) {
                    this.localOllamaUrl = `http://localhost:${port}`;
                    console.log(`[ModelRouter] Discovered active local Ollama on port: ${port}`);
                    return port;
                }
            } catch (err) {
                // Keep searching candidate ports
            }
        }
        return null;
    }


    /**
     * Run inference locally on the user's hardware via Ollama.
     * @param {string} modelName Name of local Ollama model (e.g. qwen2.5-coder:32b)
     * @param {string} prompt Prompt content
     * @returns {Promise<string>} Generated text response
     */
    async executeLocalOllama(modelName, prompt) {
        try {
            const response = await fetch(`${this.localOllamaUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: modelName,
                    prompt: prompt,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`Ollama returned status ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (err) {
            console.error('Failed local Ollama inference:', err.message);
            throw err;
        }
    }

    /**
     * Get embeddings locally from Ollama.
     * @param {string} prompt Prompt content
     * @param {string} modelName Name of local embedding model
     * @returns {Promise<Array<number>>} Vector embedding array
     */
    async getLocalEmbeddings(prompt, modelName = 'all-minilm') {
        try {
            const response = await fetch(`${this.localOllamaUrl}/api/embeddings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: modelName,
                    prompt: prompt
                })
            });

            if (!response.ok) {
                throw new Error(`Ollama embeddings returned status ${response.status}`);
            }

            const data = await response.json();
            return data.embedding;
        } catch (err) {
            console.error('Failed local Ollama embeddings:', err.message);
            throw err;
        }
    }


    /**
     * Execute cloud models via the secure backend proxy (Supabase Edge Function)
     * @param {string} modelName 
     * @param {string} prompt 
     * @param {string} supabaseAuthToken 
     */
    async executeCloudAPI(modelName, prompt, supabaseAuthToken) {
        // Langfuse Observability Trace
        const trace = langfuse.trace({
            name: "CloudAPI_Request",
            metadata: { modelName }
        });
        const generation = trace.generation({
            name: "LLM_Generation",
            model: modelName,
            prompt: prompt
        });
        
        // Item 1: API keys are behind the proxy
        const functionUrl = import.meta.env.VITE_SUPABASE_URL + '/functions/v1/llm-proxy';
        
        try {
            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${supabaseAuthToken}`
                },
                body: JSON.stringify({ model: modelName, prompt })
            });

            if (response.status === 429) {
                throw new Error('Rate limit exceeded (Item 4). Please slow down or upgrade your plan.');
            }

            if (!response.ok) {
                throw new Error(`Cloud API returned status ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Failed cloud API inference via proxy:', err.message);
            throw err;
        }
    }

    /**
     * Triage a subtask and return the optimal model configuration.
     * @param {Object} subtask { prompt, complexity, type }
     * @param {Object} userProfile { userId, creditsBalance, localHardware }
     * @returns {Promise<Object>} Model allocation details
     */
    async getOptimalModel(subtask, userProfile) {
        // Query Screenpipe context if prompt asks about recent activity
        const needsOsContext = subtask.prompt.toLowerCase().includes("what was i just looking at") || 
                               subtask.prompt.toLowerCase().includes("screen");
        
        let contextPrefix = "";
        if (needsOsContext) {
            const osData = await screenpipeClient.searchLocalContext(subtask.prompt);
            if (osData) {
                contextPrefix = `[System OS Context: ${JSON.stringify(osData)}]\n`;
            }
        }
        subtask.prompt = contextPrefix + subtask.prompt;

        // 1. Check offline mode
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            console.log("[ModelRouter] Offline mode detected. Routing to true in-browser transformer.");
            return {
                modelName: 'Xenova/Qwen1.5-0.5B-Chat',
                provider: 'browser-transformers',
                costCredits: 0,
                warning: 'Offline mode active. Using true in-browser inference.'
            };
        }

        // 2. Check semantic cache first
        const cacheHit = await this.checkSemanticCache(subtask.prompt);
        if (cacheHit) {
            return {
                modelName: cacheHit.modelName,
                provider: 'cache',
                costCredits: 0,
                isCached: true,
                cachedResponse: cacheHit.response
            };
        }

        // 3. Evaluate complexity vs hardware
        const sophistication = subtask.complexity || 3; // 1-5
        const userVram = userProfile.localHardware?.vramGB || 8;
        const remainingCredits = userProfile.creditsBalance || 0;

        // Triage routing logic
        if (sophistication >= 4) {
            // High-complexity tasks require cloud capabilities (Gemini 1.5 Pro / Claude 3.5)
            const costEstimate = sophistication === 5 ? 15 : 8; // Credit units
            
            if (remainingCredits < costEstimate) {
                // If credits are depleted, attempt local fallback or raise error
                if (userVram >= 16) {
                    return {
                        modelName: 'qwen2.5-coder:32b',
                        provider: 'local-ollama',
                        costCredits: 0,
                        warning: 'Low credits. Downgraded to local model.'
                    };
                }
                throw new Error('Insufficient credits for cloud task execution, and local VRAM insufficient for model fallback.');
            }

            return {
                modelName: sophistication === 5 ? 'gemini-1.5-pro' : 'claude-3.5-sonnet',
                provider: 'cloud-api',
                costCredits: costEstimate
            };
        }

        // Medium-to-low complexity tasks
        if (userVram >= 16) {
            // Use local Qwen Coder for standard coding tasks
            return {
                modelName: 'qwen2.5-coder:32b',
                provider: 'local-ollama',
                costCredits: 0
            };
        } else if (userVram >= 8) {
            return {
                modelName: 'qwen2.5-coder:7b',
                provider: 'local-ollama',
                costCredits: 0
            };
        }

        // Fallback to highly cost-efficient cloud models if local hardware is insufficient
        return {
            modelName: 'gemini-1.5-flash',
            provider: 'cloud-api',
            costCredits: 2
        };
    }

    /**
     * Check if a semantically equivalent query has already been run.
     */
    async checkSemanticCache(prompt) {
        if (!this.cacheEndpoint) return null;
        try {
            const response = await fetch(`${this.cacheEndpoint}/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, threshold: 0.88 })
            });
            if (response.ok) {
                const data = await response.json();
                return data.hit ? data : null;
            }
        } catch (err) {
            console.warn('Semantic cache offline:', err.message);
        }
        return null;
    }

    /**
     * Update semantic cache after a successful run.
     */
    async updateSemanticCache(prompt, responseText, modelName) {
        if (!this.cacheEndpoint) return;
        try {
            await fetch(`${this.cacheEndpoint}/store`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, response: responseText, modelName })
            });
        } catch (err) {
            console.warn('Failed to update semantic cache:', err.message);
        }
    }
}
export default ModelRouter;
