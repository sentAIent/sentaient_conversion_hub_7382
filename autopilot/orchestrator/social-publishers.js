import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getCredentials(platform, handle) {
    try {
        const configPath = path.join(__dirname, 'marketing_credentials.json');
        if (fs.existsSync(configPath)) {
            const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            const key = `${platform}:${handle}`;
            return data[key] || {};
        }
    } catch (e) {
        console.error("Failed to load credentials:", e);
    }
    return {};
}

/**
 * Publishes a video to TikTok using the Direct Post API.
 */
export async function publishToTikTok(videoUrl, caption, handle) {
    const creds = getCredentials('TikTok', handle);
    const accessToken = creds.accessToken || process.env.TIKTOK_ACCESS_TOKEN;
    const openId = creds.openId || process.env.TIKTOK_OPEN_ID;

    if (!accessToken || !openId) {
        console.warn(`[TikTok API] Missing TikTok credentials for ${handle}. Simulating success.`);
        return { success: true, platform: 'tiktok', status: 'simulated_success' };
    }

    try {
        const initResponse = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_info: {
                    title: caption,
                    privacy_level: "MUTUAL_FOLLOW_FRIENDS",
                    disable_duet: false,
                    disable_comment: false,
                    disable_stitch: false,
                    video_cover_timestamp_ms: 1000
                },
                source_info: {
                    source: "PULL_FROM_URL",
                    video_url: videoUrl
                }
            })
        });

        const initData = await initResponse.json();

        if (initData.error && initData.error.code !== 'ok') {
            throw new Error(`TikTok Init Error: ${initData.error.message}`);
        }

        return {
            success: true,
            platform: 'tiktok',
            publish_id: initData.data?.publish_id,
            status: 'processing'
        };

    } catch (error) {
        console.error("TikTok Publish Error:", error);
        throw error;
    }
}

/**
 * Publishes content to Meta (Instagram/Facebook)
 */
export async function publishToMeta(imageUrl, caption, handle) {
    const creds = getCredentials('Instagram', handle) || getCredentials('Meta', handle);
    const accessToken = creds.accessToken || process.env.META_ACCESS_TOKEN;
    const igAccountId = creds.accountId || process.env.IG_ACCOUNT_ID;

    if (!accessToken || !igAccountId) {
        console.warn(`[Meta API] Missing Meta credentials for ${handle}. Simulating success.`);
        return { success: true, platform: 'meta', status: 'simulated_success' };
    }

    try {
        const containerRes = await fetch(`https://graph.facebook.com/v19.0/${igAccountId}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image_url: imageUrl,
                caption: caption,
                access_token: accessToken
            })
        });
        const containerData = await containerRes.json();
        
        if (containerData.error) {
            throw new Error(`Meta Init Error: ${containerData.error.message}`);
        }

        const publishRes = await fetch(`https://graph.facebook.com/v19.0/${igAccountId}/media_publish`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                creation_id: containerData.id,
                access_token: accessToken
            })
        });
        const publishData = await publishRes.json();

        if (publishData.error) {
             throw new Error(`Meta Publish Error: ${publishData.error.message}`);
        }

        return { success: true, platform: 'meta', publish_id: publishData.id, status: 'published' };
    } catch (error) {
        console.error("Meta Publish Error:", error);
        throw error;
    }
}

/**
 * Publishes content to X (Twitter)
 */
export async function publishToX(text, mediaUrl, handle) {
    const creds = getCredentials('X', handle);
    const bearerToken = creds.bearerToken || process.env.X_BEARER_TOKEN;

    if (!bearerToken) {
        console.warn(`[X API] Missing Twitter Bearer Token for ${handle}. Simulating success.`);
        return { success: true, platform: 'x', status: 'simulated_success' };
    }

    try {
        const response = await fetch('https://api.twitter.com/2/tweets', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });
        
        const data = await response.json();
        
        if (data.errors) {
            throw new Error(`X Publish Error: ${data.errors[0].message}`);
        }

        return { success: true, platform: 'x', publish_id: data.data?.id, status: 'published' };
    } catch (error) {
        console.error("X Publish Error:", error);
        throw error;
    }
}

/**
 * Publishes content to LinkedIn
 */
export async function publishToLinkedIn(text, authorUrn) {
    // authorUrn acts as the handle here, but typically we might map 'LinkedIn:@name' -> urn & token
    const creds = getCredentials('LinkedIn', authorUrn);
    const accessToken = creds.accessToken || process.env.LINKEDIN_ACCESS_TOKEN;
    const resolvedUrn = creds.authorUrn || authorUrn;
    
    if (!accessToken || !resolvedUrn) {
        console.warn(`[LinkedIn API] Missing LinkedIn credentials for ${authorUrn}. Simulating success.`);
        return { success: true, platform: 'linkedin', status: 'simulated_success' };
    }

    try {
        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0'
            },
            body: JSON.stringify({
                author: `urn:li:person:${resolvedUrn}`,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: { text: text },
                        shareMediaCategory: "NONE"
                    }
                },
                visibility: {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
                }
            })
        });

        const data = await response.json();
        if (data.message) {
            throw new Error(`LinkedIn Publish Error: ${data.message}`);
        }

        return { success: true, platform: 'linkedin', publish_id: data.id, status: 'published' };
    } catch (error) {
        console.error("LinkedIn Publish Error:", error);
        throw error;
    }
}
