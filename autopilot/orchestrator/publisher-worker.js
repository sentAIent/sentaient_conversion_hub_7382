import * as dotenv from 'dotenv';
dotenv.config();

import cron from 'node-cron';
import { createClient } from 'redis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { publishToTikTok, publishToMeta, publishToX, publishToLinkedIn } from './social-publishers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Redis
const redis = createClient({ 
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD
});

redis.on('error', (err) => console.error('[Worker Redis Error]', err));

async function getNextApprovedCampaign(brandId) {
    const keys = await redis.keys("queue:*");
    let oldest = null;
    let oldestKey = null;

    for (const key of keys) {
        const dataStr = await redis.get(key);
        if (dataStr) {
            try {
                const data = JSON.parse(dataStr);
                // Check if it belongs to this brand and is approved
                // Note: The frontend sends `brand` (activeWorkspace) inside the payload, which goes to queue.
                const campaignBrand = data.brand || data.brand_id;
                
                if (campaignBrand === brandId && data.status === 'approved_for_publishing') {
                    const timeA = new Date(data.approved_at || data.created_at || 0);
                    const timeB = oldest ? new Date(oldest.approved_at || oldest.created_at || 0) : null;
                    if (!oldest || timeA < timeB) {
                        oldest = data;
                        oldestKey = key;
                    }
                }
            } catch (e) {
                console.error(`[Worker] Error parsing queue item ${key}`);
            }
        }
    }
    
    return { campaign: oldest, key: oldestKey };
}

async function publishCampaign(campaign, key) {
    console.log(`[Worker] Executing campaign ${campaign.campaign_id} for ${campaign.brand}`);
    
    // Default to the handles in the campaign payload if available, else look up accounts
    const targetAccounts = campaign.targetAccounts || []; 
    
    if (targetAccounts.length === 0) {
        console.warn(`[Worker] Campaign ${campaign.campaign_id} has no target accounts. Skipping.`);
        return;
    }

    const text = campaign.generated_copy || campaign.inputValue || "Automated post from AutoPilot";
    const mediaUrl = campaign.media?.url || null;

    const results = [];

    // Iterate through targets (e.g. "TikTok:@sentaient")
    for (const target of targetAccounts) {
        try {
            const [platform, handle] = target.split(':');
            let res = null;

            console.log(`[Worker] Publishing to ${platform} (${handle})...`);

            switch (platform.toLowerCase()) {
                case 'tiktok':
                    res = await publishToTikTok(mediaUrl, text, handle);
                    break;
                case 'instagram':
                case 'meta':
                    res = await publishToMeta(mediaUrl, text, handle);
                    break;
                case 'x':
                case 'twitter':
                    res = await publishToX(text, mediaUrl, handle);
                    break;
                case 'linkedin':
                    res = await publishToLinkedIn(text, handle);
                    break;
                default:
                    console.error(`[Worker] Unknown platform: ${platform}`);
                    res = { error: 'Unknown platform' };
            }
            results.push({ platform, handle, success: true, result: res });
        } catch (err) {
            console.error(`[Worker] Failed to publish to ${target}:`, err);
            results.push({ target, success: false, error: err.message });
        }
    }

    // Check if at least one platform succeeded
    const anySuccess = results.some(r => r.success);

    if (anySuccess) {
        try {
            console.log(`[Worker] Attempting to capture screenshots of live posts...`);
            // Dynamic import to avoid breaking publisher if crawlee fails
            const { screenshotPost } = await import('./crawlee-worker.js');
            for (const r of results) {
                if (r.success && r.result?.post_url) {
                    const screenPath = path.join(__dirname, '..', 'public', 'screenshots', `${campaign.campaign_id}_${r.platform}.png`);
                    await screenshotPost(r.result.post_url, screenPath);
                    r.screenshot_url = `/screenshots/${campaign.campaign_id}_${r.platform}.png`;
                }
            }
        } catch (e) {
            console.error(`[Worker] Failed to capture live screenshots:`, e);
        }
    }

    // Update the queue status
    const updated = {
        ...campaign,
        status: anySuccess ? 'published' : 'failed',
        published_at: anySuccess ? new Date().toISOString() : null,
        error: anySuccess ? null : 'All target platforms failed to publish.',
        publish_results: results
    };

    await redis.set(key, JSON.stringify(updated));
    console.log(`[Worker] Campaign ${campaign.campaign_id} marked as ${updated.status}.`);
}

async function startWorker() {
    await redis.connect();
    console.log("[Worker] Connected to Redis. Starting Continuous Publishing Engine...");

    const schedulesPath = path.join(__dirname, 'marketing_schedules.json');
    if (!fs.existsSync(schedulesPath)) {
        console.error("[Worker] No marketing_schedules.json found. Exiting.");
        process.exit(1);
    }

    const schedules = JSON.parse(fs.readFileSync(schedulesPath, 'utf8'));
    let activeJobs = 0;

    for (const schedule of schedules) {
        const { brand_id, publish_cron: cronExp } = schedule;
        
        if (cron.validate(cronExp)) {
            console.log(`[Worker] Scheduling tasks for brand '${brand_id}' on cron '${cronExp}'`);
            
            cron.schedule(cronExp, async () => {
                console.log(`[Worker][CRON-TRIGGER] Looking for approved campaigns for ${brand_id}...`);
                const { campaign, key } = await getNextApprovedCampaign(brand_id);
                
                if (campaign) {
                    await publishCampaign(campaign, key);
                } else {
                    console.log(`[Worker] No approved campaigns waiting for ${brand_id}.`);
                }
            });
            activeJobs++;
        } else {
            console.error(`[Worker] Invalid cron expression for ${brand_id}: ${cronExp}`);
        }
    }

    console.log(`[Worker] Initialization complete. ${activeJobs} schedules actively monitoring.`);
}

startWorker().catch(err => {
    console.error("[Worker] Fatal startup error:", err);
    process.exit(1);
});
