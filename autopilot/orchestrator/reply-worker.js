import { createClient } from 'redis';
import { OdysseusConnector } from './OdysseusConnector.js';

/**
 * SentAIent AutoPilot - Auto-Engagement Engine
 * 
 * Implements concepts from `diwenne/openreply` to act as an automated
 * "Chief of Staff" for creators. It listens to a Redis queue for incoming 
 * comments on published content and uses AI to generate personalized replies.
 */
class ReplyWorker {
    constructor() {
        this.redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
        this.client = createClient({ url: this.redisUrl });
        this.llmEngine = new OdysseusConnector();
    }

    async start() {
        await this.client.connect();
        console.log('[ReplyWorker] Listening for incoming social engagements (OpenReply Logic)...');
        
        while (true) {
            try {
                // Wait for an incoming comment payload from the webhook gateway
                const payload = await this.client.blPop('queue:social_comments', 0);
                if (payload) {
                    const commentData = JSON.parse(payload.element);
                    await this.processComment(commentData);
                }
            } catch (error) {
                console.error('[ReplyWorker] Polling error:', error);
                await new Promise(res => setTimeout(res, 5000));
            }
        }
    }

    async processComment(commentData) {
        console.log(`[ReplyWorker] Processing incoming comment from @${commentData.username}: "${commentData.text}"`);

        const systemPrompt = `You are an auto-reply agent (OpenReply) acting on behalf of a content creator. 
        Analyze the incoming comment. If it's a simple compliment, generate a short, gracious thank you. 
        If it's a question, answer it based on typical creator context. 
        If it's toxic or spam, respond with exactly "[IGNORE]".
        Keep replies under 150 characters and use emojis naturally.`;

        try {
            const reply = await this.llmEngine.generateCompletion(systemPrompt, `Comment: ${commentData.text}`);
            
            if (reply.trim() === '[IGNORE]') {
                console.log(`[ReplyWorker] Comment flagged as spam/toxic. Ignoring.`);
                return;
            }

            console.log(`[ReplyWorker] Generated Reply: "${reply}"`);
            
            // Here we would push the reply back to the specific social platform's API (TikTok/Meta)
            // await this.publishReply(commentData.platform, commentData.commentId, reply);

        } catch (error) {
            console.error('[ReplyWorker] Failed to generate reply:', error.message);
        }
    }
}

// Start the worker if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const worker = new ReplyWorker();
    worker.start();
}
