import { env } from '../config/env.js';

class ScreenpipeClient {
    constructor() {
        this.apiUrl = env.VITE_SCREENPIPE_API_URL || 'http://localhost:3030';
    }

    /**
     * Search the local Screenpipe OS context via OCR and Audio transcripts
     * @param {string} query 
     * @param {string} timeRange - e.g., '1h', '24h'
     */
    async searchLocalContext(query, timeRange = '24h') {
        try {
            // Normally hits the local Screenpipe daemon endpoint
            const response = await fetch(`${this.apiUrl}/search?q=${encodeURIComponent(query)}&time_range=${timeRange}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Screenpipe daemon returned ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            // We do not want to crash the app if the daemon is offline. 
            // It should gracefully fallback to standard AI logic.
            console.log('Screenpipe daemon not reachable or query failed. Gracefully falling back to zero-context mode.');
            return null;
        }
    }
}

export default new ScreenpipeClient();
