import axios from 'axios';

/**
 * SentAIent AutoPilot <-> Odysseus AI Bridge
 * 
 * This connector allows AutoPilot to use the internal Odysseus AI workspace
 * for Deep Research (SearXNG) and Agentic web scraping before generating
 * marketing content. 
 */

export class OdysseusConnector {
    private baseUrl: string;
    private apiKey: string;

    constructor() {
        // Points to the internal Docker instance of Odysseus AI
        this.baseUrl = process.env.ODYSSEUS_BASE_URL || 'http://localhost:7000/api/v1';
        this.apiKey = process.env.ODYSSEUS_API_KEY || 'sentaient_internal_key';
    }

    /**
     * Triggers Odysseus's Deep Research agent to scan competitors,
     * trending topics, or brand mentions.
     * @param query The research topic (e.g. "Trending AI marketing strategies 2026")
     * @returns A synthesized research report to feed into AutoPilot's LLM prompt
     */
    async performDeepResearch(query: string): Promise<string> {
        try {
            console.log(`[AutoPilot] Dispatching Deep Research to Odysseus AI: "${query}"`);
            
            // In a real scenario, we'd hit Odysseus's /chat/completions or /research endpoint
            // Since Odysseus is OpenAI-API compatible, we use the standard format.
            const response = await axios.post(
                `${this.baseUrl}/chat/completions`,
                {
                    model: 'research-agent',
                    messages: [
                        { role: 'system', content: 'You are an Odysseus Deep Research agent. Use SearXNG to deeply research the topic and return a dense, factual summary for a marketing AI to use as context.' },
                        { role: 'user', content: query }
                    ],
                    stream: false
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('[AutoPilot] Failed to connect to Odysseus AI:', error);
            throw new Error('Odysseus AI deep research failed. Ensure the local workspace is running.');
        }
    }
}
