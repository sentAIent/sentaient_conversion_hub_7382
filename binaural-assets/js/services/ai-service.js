/**
 * ai-service.js
 * Mindwave Premium AI Features
 * Integrates both with our custom FastAPI microservice and Hugging Face Serverless API.
 */

const HF_INFERENCE_URL = "https://api-inference.huggingface.co/models/";
const CUSTOM_API_URL = "http://localhost:8000/api/";

// Helper to check if the current user is premium (Mocked for now)
function isPremiumUser() {
    // In production, this checks the decoded Firebase token claims
    const token = localStorage.getItem("mindwave_auth_token");
    return token === "mock_premium_token";
}

/**
 * Option 1: Hugging Face Serverless Inference API (AudioLDM)
 * Premium Users Only.
 */
export async function generateSoundscapeServerless(prompt, hfApiKey) {
    if (!isPremiumUser()) {
        throw new Error("Premium subscription required for AI features.");
    }
    
    if (!hfApiKey) throw new Error("Missing HF API Key");

    const response = await fetch(`${HF_INFERENCE_URL}cvssp/audioldm-s-full-v2`, {
        headers: { Authorization: `Bearer ${hfApiKey}` },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
        throw new Error(`HF Serverless Error: ${response.statusText}`);
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
}

/**
 * Option 2: Custom FastAPI Microservice Integration
 * Premium Users Only.
 */
export async function generateSoundscapeCustomAPI(prompt) {
    if (!isPremiumUser()) {
        throw new Error("Premium subscription required for AI features.");
    }

    const token = localStorage.getItem("mindwave_auth_token");

    const response = await fetch(`${CUSTOM_API_URL}generate-soundscape`, {
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error(`Custom API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.audio_base64; 
}

/**
 * Custom API for Generating AI Guided Meditations (Bark TTS)
 * Premium Users Only.
 */
export async function generateGuidedMeditation(scriptText) {
    if (!isPremiumUser()) {
        throw new Error("Premium subscription required for AI features.");
    }

    const token = localStorage.getItem("mindwave_auth_token");

    const response = await fetch(`${CUSTOM_API_URL}generate-meditation`, {
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ script_text: scriptText }),
    });

    if (!response.ok) {
        throw new Error(`Custom API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.audio_base64;
}
