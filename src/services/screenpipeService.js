/**
 * Screenpipe Service
 * Interfaces with the local Screenpipe daemon running on the user's desktop.
 */
class ScreenpipeService {
    constructor() {
        this.baseUrl = 'http://localhost:3030';
    }

    /**
     * Checks if the local Screenpipe daemon is running.
     * @returns {Promise<boolean>}
     */
    async isRunning() {
        try {
            const response = await fetch(`${this.baseUrl}/health`, {
                method: 'GET',
                signal: AbortSignal.timeout(2000), // Quick timeout
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    /**
     * Fetches the recent context (OCR and Audio transcriptions) from Screenpipe.
     * @param {number} minutes How many minutes of history to fetch
     * @returns {Promise<string[]>} Array of context strings
     */
    async getRecentContext(minutes = 5) {
        try {
            const startTime = new Date(Date.now() - minutes * 60 * 1000).toISOString();
            
            const response = await fetch(`${this.baseUrl}/search?start_time=${startTime}&limit=50`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Screenpipe API error: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Map the search results into a readable context string format
            const context = data.data.map(item => {
                if (item.type === 'OCR') {
                    return `[SCREEN] ${item.content.text}`;
                } else if (item.type === 'AUDIO') {
                    return `[VOICE] ${item.content.transcription}`;
                }
                return null;
            }).filter(Boolean);

            return context;
        } catch (error) {
            console.error('Failed to fetch Screenpipe context:', error);
            throw error;
        }
    }
}

export default new ScreenpipeService();
