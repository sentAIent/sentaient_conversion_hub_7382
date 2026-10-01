import { create, insert, search } from '@orama/orama';

/**
 * OramaSearchService
 * An ultra-fast, in-browser, edge-native vector and full-text search engine.
 */
export class OramaSearchService {
    constructor() {
        this.db = null;
    }

    /**
     * Initializes the Orama in-memory database
     */
    async initialize() {
        console.log("[Orama] Initializing in-browser search engine...");
        this.db = await create({
            schema: {
                id: 'string',
                content: 'string',
                type: 'string',
                timestamp: 'number'
            }
        });
        console.log("[Orama] Engine initialized.");
    }

    /**
     * Indexes a document (e.g., a parsed GDPR message or post)
     */
    async indexDocument(id, content, type) {
        if (!this.db) await this.initialize();
        
        await insert(this.db, {
            id,
            content,
            type,
            timestamp: Date.now()
        });
    }

    /**
     * Searches the local index instantly
     */
    async performSearch(term) {
        if (!this.db) return [];
        
        const results = await search(this.db, {
            term: term,
            properties: ['content', 'type'],
            limit: 10,
        });

        return results.hits.map(hit => hit.document);
    }
}

export const oramaSearch = new OramaSearchService();
