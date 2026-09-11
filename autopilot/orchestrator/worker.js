import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';
import { publishToTikTok, publishToMeta, publishToX, publishToLinkedIn } from './social-publishers.js';

const makePublishTask = async (platform, publishFn, ...args) => {
    try {
        const res = await publishFn(...args);
        return { platform, success: true, ...res };
    } catch (error) {
        return { platform, success: false, error: error.message };
    }
};

async function processItem(key, item) {
    try {
        // Mark as processing to avoid duplicate runs
        item.status = 'publishing';
        await redis.set(key, JSON.stringify(item));

        const platformsToPublish = item.platformAccounts || {};
        const platformKeys = Object.keys(platformsToPublish).filter(k => platformsToPublish[k] && platformsToPublish[k].length > 0);

        if (platformKeys.length === 0) {
            throw new Error("No target platforms selected for publishing.");
        }

        // Initialize publish_results tracking if not present
        if (!item.publish_results) {
            item.publish_results = {};
        }

        const promises = [];
        
        for (const platform of platformKeys) {
            // Skip if already successfully published on a previous try
            if (item.publish_results[platform] && item.publish_results[platform].success) {
                console.log(`[Worker] Skipping ${platform} for ${key} - already published.`);
                continue;
            }
            
            // Queue platform tasks concurrently
            if (platform === 'TikTok') {
                promises.push(makePublishTask(platform, publishToTikTok, item.video_url || item.media_url, item.caption || ''));
            } else if (platform === 'Instagram' || platform === 'Meta') {
                promises.push(makePublishTask(platform, publishToMeta, item.image_url || item.media_url, item.caption || ''));
            } else if (platform === 'X') {
                promises.push(makePublishTask(platform, publishToX, item.script || item.caption, item.media_url));
            } else if (platform === 'LinkedIn') {
                // In production, authorUrn might need to be resolved. For demo, we parse from handle.
                const authorUrn = platformsToPublish['LinkedIn'][0].replace('@', '');
                promises.push(makePublishTask(platform, publishToLinkedIn, item.script || item.caption, authorUrn));
            }
        }
        
        if (promises.length === 0) {
             // Everything already published
             item.status = 'published';
             await redis.set(key, JSON.stringify(item));
             return;
        }

        const results = await Promise.all(promises);
        
        let allSuccess = true;
        let anySuccess = false;

        for (const result of results) {
            const platform = result.platform;
            item.publish_results[platform] = result;
            
            if (result.success) {
                anySuccess = true;
                console.log(`[Worker] Successfully published ${key} to ${platform}`);
            } else {
                allSuccess = false;
                console.error(`[Worker] Failed to publish ${key} to ${platform}:`, result.error);
            }
        }

        if (allSuccess) {
            item.status = 'published';
            item.published_at = new Date().toISOString();
        } else if (anySuccess) {
            item.status = 'partially_published';
            throw new Error("Partial failure during multi-platform publishing.");
        } else {
            throw new Error("Failed to publish to any selected platforms.");
        }

        await redis.set(key, JSON.stringify(item));

    } catch (err) {
        console.error(`[Worker] Publish Error for ${key}:`, err.message);
        
        item.retry_count = (item.retry_count || 0) + 1;
        if (item.retry_count > 3) {
            item.status = item.status === 'partially_published' ? 'partial_failure' : 'failed';
            item.error = err.message;
        } else {
            // Re-queue for platforms that failed
            item.status = 'approved_for_publishing'; 
        }
        await redis.set(key, JSON.stringify(item));
    }
}

startWorker();
