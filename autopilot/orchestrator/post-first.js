import * as dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';
import { publishToTikTok, publishToMeta, publishToX, publishToLinkedIn } from './social-publishers.js';

const redis = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });

async function run() {
    await redis.connect();
    const keys = await redis.keys("queue:*");
    let oldest = null;
    let oldestKey = null;

    for (const key of keys) {
        const dataStr = await redis.get(key);
        if (dataStr) {
            const data = JSON.parse(dataStr);
            if (data.status === 'approved_for_publishing') {
                const timeA = new Date(data.approved_at || data.created_at || 0);
                const timeB = oldest ? new Date(oldest.approved_at || oldest.created_at || 0) : null;
                if (!oldest || timeA < timeB) {
                    oldest = data;
                    oldestKey = key;
                }
            }
        }
    }

    if (!oldest) {
        console.log("No approved campaigns found.");
        process.exit(0);
    }

    console.log(`Found oldest campaign: ${oldest.campaign_id} for ${oldest.brand || oldest.brand_id}`);
    
    const targetAccounts = oldest.targetAccounts || []; 
    const text = oldest.generated_copy || oldest.inputValue || "Automated post from AutoPilot";
    const mediaUrl = oldest.media?.url || null;
    const results = [];

    for (const target of targetAccounts) {
        try {
            const [platform, handle] = target.split(':');
            let res = null;
            console.log(`Publishing to ${platform} (${handle})...`);

            switch (platform.toLowerCase()) {
                case 'tiktok': res = await publishToTikTok(mediaUrl, text); break;
                case 'instagram':
                case 'meta': res = await publishToMeta(mediaUrl, text); break;
                case 'x':
                case 'twitter': res = await publishToX(text, mediaUrl); break;
                case 'linkedin': res = await publishToLinkedIn(text, handle); break;
            }
            results.push({ platform, handle, success: true, result: res });
        } catch (err) {
            console.log(`Failed to publish to ${target}: ${err.message}`);
            results.push({ target, success: false, error: err.message });
        }
    }

    const anySuccess = results.some(r => r.success);
    
    const updated = {
        ...oldest,
        status: anySuccess ? 'published' : 'failed',
        published_at: anySuccess ? new Date().toISOString() : null,
        error: anySuccess ? null : 'All target platforms failed to publish.',
        publish_results: results
    };

    await redis.set(oldestKey, JSON.stringify(updated));
    console.log(`Campaign ${oldest.campaign_id} marked as ${updated.status}.`);
    process.exit(0);
}
run();
