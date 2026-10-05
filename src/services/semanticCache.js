/**
 * SemanticCache.js
 * Implements a lightweight local vector cache in JavaScript.
 * Uses cosine similarity to match prompt embeddings against cached responses.
 */
export class SemanticCache {
    constructor(config = {}) {
        this.cacheRegistryPath = config.cacheRegistryPath || 'semantic_cache_registry.json';
        this.threshold = config.threshold || 0.88;
        this.memoryStore = [];
        this.loadCacheRegistry();
    }

    /**
     * Load cached entries from local storage/JSON registry.
     */
    async loadCacheRegistry() {
        try {
            const { readFileSync, existsSync } = await import('fs');
            if (existsSync(this.cacheRegistryPath)) {
                const data = readFileSync(this.cacheRegistryPath, 'utf8');
                this.memoryStore = JSON.parse(data);
            }
        } catch (err) {
            // Fallback for browser client context
            this.memoryStore = [];
        }
    }

    /**
     * Save current cache state to JSON registry.
     */
    async saveCacheRegistry() {
        try {
            const { writeFileSync } = await import('fs');
            writeFileSync(this.cacheRegistryPath, JSON.stringify(this.memoryStore, null, 2), 'utf8');
        } catch (err) {
            // LocalStorage fallback for browser client context
            try {
                localStorage.setItem('semantic_cache_registry', JSON.stringify(this.memoryStore));
            } catch (lsErr) {
                console.warn('Persist semantic cache failed:', err.message);
            }
        }
    }

    /**
     * Calculate cosine similarity between two vector arrays.
     */
    cosineSimilarity(vecA, vecB) {
        if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
        
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
    }

    /**
     * Search semantic cache for a query embedding.
     * @param {Array<number>} queryEmbedding 
     * @returns {Object|null} Matching cached entry
     */
    search(queryEmbedding) {
        if (!queryEmbedding || this.memoryStore.length === 0) return null;
        
        let bestMatch = null;
        let highestSim = -1;

        for (const entry of this.memoryStore) {
            const similarity = this.cosineSimilarity(queryEmbedding, entry.embedding);
            if (similarity > highestSim) {
                highestSim = similarity;
                bestMatch = entry;
            }
        }

        if (highestSim >= this.threshold) {
            return {
                hit: true,
                similarity: highestSim,
                response: bestMatch.response,
                modelName: bestMatch.modelName
            };
        }
        
        return null;
    }

    /**
     * Insert a new entry into the semantic vector cache.
     */
    async insert(prompt, embedding, response, modelName) {
        this.memoryStore.push({
            prompt,
            embedding,
            response,
            modelName,
            timestamp: new Date().toISOString()
        });
        await this.saveCacheRegistry();
    }
}
export default SemanticCache;
