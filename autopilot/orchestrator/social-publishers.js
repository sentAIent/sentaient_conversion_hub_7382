import fetch from 'node-fetch';

/**
 * Publishes a video to TikTok using the Direct Post API.
 * @param {string} videoUrl - The URL of the video to upload
 * @param {string} caption - The caption for the video
 * @returns {Promise<object>} The publish response
 */
export async function publishToTikTok(videoUrl, caption) {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
    const openId = process.env.TIKTOK_OPEN_ID;

    if (!accessToken || !openId) {
        throw new Error("Missing TIKTOK_ACCESS_TOKEN or TIKTOK_OPEN_ID in .env");
    }

    try {
        // Step 1: Initialize the video upload
        const initResponse = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_info: {
                    title: caption,
                    privacy_level: "MUTUAL_FOLLOW_FRIENDS", // Usually you'd want EVERYONE for marketing, using MUTUAL for safety in staging
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
export async function publishToMeta(imageUrl, caption) {
    // To be implemented once Meta keys are added to .env
    console.log("Publishing to Meta... [STUB]");
    return { success: true, platform: 'meta', status: 'stubbed' };
}

/**
 * Publishes content to X (Twitter)
 */
export async function publishToX(text, mediaUrl) {
    // To be implemented once X keys are added to .env
    console.log("Publishing to X... [STUB]");
    return { success: true, platform: 'x', status: 'stubbed' };
}
