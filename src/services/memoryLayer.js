import { MemoryClient } from 'mem0ai';

// Initialize Mem0 client
// In a real production scenario, this API key should be securely handled via a backend proxy
// rather than exposed to the client. We are placing it here for rapid iteration of the memory layer.
const mem0 = new MemoryClient({
    apiKey: import.meta.env.VITE_MEM0_API_KEY || 'development_mock_key',
});

/**
 * MemoryLayer
 * Handles semantic memory retention across agent sessions.
 */
export class MemoryLayer {
    
    /**
     * Store an interaction or extracted entity into Mem0
     * @param {string} userId - The unique ID of the user
     * @param {string} content - The conversation text or extracted entity
     * @param {object} metadata - Additional context (e.g., { source: 'meta_zip', type: 'preference' })
     */
    static async addMemory(userId, content, metadata = {}) {
        console.log(`[MemoryLayer] Storing memory for ${userId}...`);
        try {
            // Note: In development/mock mode without a real API key, this will log but bypass the network request
            if (import.meta.env.VITE_MEM0_API_KEY) {
                const response = await mem0.add({
                    messages: [{ role: 'user', content }],
                    user_id: userId,
                    metadata
                });
                return response;
            } else {
                console.warn("[MemoryLayer] No Mem0 API key found. Mocking memory storage.");
                return { success: true, mock: true };
            }
        } catch (error) {
            console.error("[MemoryLayer] Error storing memory:", error);
            throw error;
        }
    }

    /**
     * Retrieve relevant memory context based on a query
     * @param {string} userId - The unique ID of the user
     * @param {string} query - The search query to find relevant past interactions
     * @returns {Promise<Array>} - List of memory objects
     */
    static async searchMemory(userId, query) {
        console.log(`[MemoryLayer] Searching memory for ${userId} with query: "${query}"`);
        try {
            if (import.meta.env.VITE_MEM0_API_KEY) {
                const results = await mem0.search({
                    query,
                    user_id: userId
                });
                return results;
            } else {
                console.warn("[MemoryLayer] No Mem0 API key found. Returning mock memory context.");
                return [
                    { memory: "User prefers async communication.", score: 0.95 },
                    { memory: "User previously asked about pricing plans.", score: 0.88 }
                ];
            }
        } catch (error) {
            console.error("[MemoryLayer] Error searching memory:", error);
            return [];
        }
    }

    /**
     * Retrieve all memories for a user
     */
    static async getAllMemories(userId) {
        try {
            if (import.meta.env.VITE_MEM0_API_KEY) {
                return await mem0.getAll({ user_id: userId });
            }
            return [];
        } catch (error) {
            console.error("[MemoryLayer] Error retrieving all memories:", error);
            return [];
        }
    }
}
