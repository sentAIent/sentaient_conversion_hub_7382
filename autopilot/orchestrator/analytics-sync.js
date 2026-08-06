import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';
import fetch from 'node-fetch';

const redis = createClient({ 
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD
});

redis.on('error', (err) => console.error('[Analytics] Client Error', err));

async function startAnalyticsSync() {
    await redis.connect();
    console.log("[Analytics] Sync worker started. Pulling analytics every 4 hours...");

    // Run every 4 hours
    setInterval(syncAnalytics, 4 * 60 * 60 * 1000);
    // Initial sync
    syncAnalytics();
}

async function syncAnalytics() {
    try {
        console.log(`[Analytics] Syncing at ${new Date().toISOString()}...`);
        const keys = await redis.keys("queue:*");
        let totalViews = 0;
        let totalLikes = 0;
        let topPerformer = null;
        
        for (const key of keys) {
            const dataStr = await redis.get(key);
            if (!dataStr) continue;
            
            const item = JSON.parse(dataStr);
            
            if (item.status === 'published' && item.publish_result?.publish_id) {
                // In a production app, we would query the actual TikTok/Meta APIs using the publish_id.
                // For demonstration, we will simulate receiving view data based on the campaign brand.
                
                // MOCK FETCH ANALYTICS:
                const simulatedViews = Math.floor(Math.random() * 15000);
                const simulatedLikes = Math.floor(simulatedViews * 0.12); // 12% engagement

                item.analytics = {
                    views: simulatedViews,
                    likes: simulatedLikes,
                    last_updated: new Date().toISOString()
                };

                await redis.set(key, JSON.stringify(item));

                totalViews += simulatedViews;
                totalLikes += simulatedLikes;

                if (!topPerformer || simulatedViews > topPerformer.views) {
                    topPerformer = {
                        campaign_id: item.campaign_id,
                        brand: item.brand,
                        type: item.type,
                        views: simulatedViews,
                        viral_angle: item.viral_angle || "Unknown"
                    };
                }
            }
        }

        // Store aggregate performance data so the Gemini proxy can inject it into future prompts
        if (topPerformer) {
            const performanceSnapshot = {
                total_views_across_platform: totalViews,
                top_performing_campaign: topPerformer,
                updated_at: new Date().toISOString()
            };
            await redis.set("system:analytics_snapshot", JSON.stringify(performanceSnapshot));
            console.log("[Analytics] System performance snapshot updated.");
        }

    } catch (err) {
        console.error("[Analytics] Error syncing:", err);
    }
}

startAnalyticsSync();
