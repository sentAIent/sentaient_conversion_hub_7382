import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';
import { publishToTikTok, publishToMeta, publishToX } from './social-publishers.js';

const redis = createClient({ 
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD
});

redis.on('error', (err) => console.error('[Worker Redis] Client Error', err));

async function startWorker() {
    await redis.connect();
    console.log("[Worker] Autonomous Queue Worker started. Polling every 60 seconds...");

    // Poll every 60 seconds
    setInterval(pollQueue, 60000);
    // Initial poll
    pollQueue();
}

async function pollQueue() {
    try {
        console.log(`[Worker] Polling queue at ${new Date().toISOString()}...`);
        const keys = await redis.keys("queue:*");
        
        for (const key of keys) {
            const dataStr = await redis.get(key);
            if (!dataStr) continue;
            
            const item = JSON.parse(dataStr);
            
            if (item.status === 'approved_for_publishing') {
                console.log(`[Worker] Found approved item: ${key}. Processing...`);
                await processItem(key, item);
            }
        }
    } catch (err) {
        console.error("[Worker] Error polling queue:", err);
    }
}

async function processItem(key, item) {
    try {
        // Mark as processing to avoid duplicate runs
        item.status = 'publishing';
        await redis.set(key, JSON.stringify(item));

        // Determine platform (mock logic - in a real app, platform would be specified in the item)
        const platform = item.target_platform || 'tiktok'; // Default to TikTok for now
        let result;

        if (platform === 'tiktok') {
            // Need a valid video URL. If none exists, we throw.
            if (!item.video_url || item.video_url.includes('mock.mp4')) {
                throw new Error("Cannot publish mock.mp4 to TikTok. A real video URL is required.");
            }
            result = await publishToTikTok(item.video_url, item.caption || '');
        } else if (platform === 'meta') {
            result = await publishToMeta(item.image_url, item.caption || '');
        } else if (platform === 'x') {
            result = await publishToX(item.script || item.caption, item.media_url);
        } else {
            throw new Error(`Unsupported platform: ${platform}`);
        }

        // Mark as published
        item.status = 'published';
        item.publish_result = result;
        item.published_at = new Date().toISOString();
        await redis.set(key, JSON.stringify(item));
        
        console.log(`[Worker] Successfully published ${key} to ${platform}`);

    } catch (err) {
        console.error(`[Worker] Failed to publish ${key}:`, err.message);
        
        // Exponential backoff logic would go here in a production system. 
        // For now, we move it back to approved_for_publishing or set it to failed based on retry count.
        item.retry_count = (item.retry_count || 0) + 1;
        if (item.retry_count > 3) {
            item.status = 'failed';
            item.error = err.message;
        } else {
            item.status = 'approved_for_publishing'; // Re-queue
        }
        await redis.set(key, JSON.stringify(item));
    }
}

startWorker();
