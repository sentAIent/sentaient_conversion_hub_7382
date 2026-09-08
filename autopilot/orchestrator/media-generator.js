import dotenv from 'dotenv';
dotenv.config();

const MODELS = {
    "qwen-image-3": "/alibaba/qwen-image-3/text-to-image",
    "nano-banana-2-lite": "/nano-banana-2/lite/text-to-image",
    "gpt-image-2": "/openai/gpt-image-2",
    "minimax-h3": "/minimax/h3/text-to-video",
    "ltx-2.5-pro": "/lightricks/ltx-2.5/text-to-video/pro",
    "kling-3.0": "/kling-video/v3.0/std/text-to-video",
    "veo-3.1-fast": "/veo3.1/fast/text-to-video",
};

const TERMINAL = new Set(["completed", "failed", "nsfw", "canceled"]);

/**
 * Generates media using the Higgsfield platform API.
 * @param {string} model - The model to use (e.g., 'kling-3.0')
 * @param {string} prompt - The generation prompt
 * @returns {Promise<string>} - The URL of the generated image or video
 */
export async function generateMedia(model, prompt) {
    if (!MODELS[model]) {
        throw new Error(`Unsupported model: ${model}. Available models: ${Object.keys(MODELS).join(", ")}`);
    }

    const keyId = process.env.HIGGSFIELD_API_KEY_ID;
    const keySecret = process.env.HIGGSFIELD_API_KEY_SECRET;

    if (!keyId || !keySecret) {
        throw new Error("HIGGSFIELD_API_KEY_ID and HIGGSFIELD_API_KEY_SECRET must be set in .env");
    }

    const authHeader = `Key ${keyId}:${keySecret}`;
    const headers = {
        "Authorization": authHeader,
        "Content-Type": "application/json"
    };

    const generateUrl = `https://platform.higgsfield.ai${MODELS[model]}`;
    console.log(`[Media Generator] Starting job for model: ${model}`);

    // Initial Request
    const response = await fetch(generateUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error (${response.status}): ${errText}`);
    }

    const job = await response.json();
    console.log(`[Media Generator] Job queued. Request ID: ${job.request_id}`);

    // Polling Logic
    let delayMs = 2000;
    let result = null;

    while (true) {
        // Wait delay + random jitter
        const jitter = Math.random() * 500;
        await new Promise(resolve => setTimeout(resolve, delayMs + jitter));

        const statusResponse = await fetch(job.status_url, { headers });
        if (!statusResponse.ok) {
            const errText = await statusResponse.text();
            throw new Error(`Status API Error (${statusResponse.status}): ${errText}`);
        }

        result = await statusResponse.json();
        console.log(`[Media Generator] Status: ${result.status}`);

        if (TERMINAL.has(result.status)) {
            break;
        }

        delayMs = Math.min(delayMs * 1.5, 10000); // Max delay of 10s
    }

    if (result.status !== "completed") {
        throw new Error(result.error || `Job finished with status: ${result.status}`);
    }

    // Extract the final media URL
    if (result.images && result.images.length > 0) {
        console.log(`[Media Generator] Image successfully generated!`);
        return result.images[0].url;
    } else if (result.video && result.video.url) {
        console.log(`[Media Generator] Video successfully generated!`);
        return result.video.url;
    }

    throw new Error("Job completed but no media URL was found in the response.");
}
