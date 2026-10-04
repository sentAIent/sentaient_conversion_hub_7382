const { onCall, HttpsError } = require("firebase-functions/v2/https");

// Simple in-memory rate limiter for demo purposes. 
// For production, use Redis or Firestore to track counts across instances.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

exports.geminiProxy = onCall({ 
    cors: ["https://sentaient.com", "https://www.sentaient.com", "http://localhost:5173", "capacitor://localhost", "http://localhost"],
    enforceAppCheck: true // Requires valid App Check token (reCAPTCHA/DeviceCheck)
}, async (request) => {
    // 1. Rate Limiting (Item 8)
    const ip = request.rawRequest.ip || "unknown-ip";
    const now = Date.now();
    const userRecord = rateLimitMap.get(ip) || { count: 0, firstRequest: now };

    if (now - userRecord.firstRequest > RATE_LIMIT_WINDOW) {
        userRecord.count = 1;
        userRecord.firstRequest = now;
    } else {
        userRecord.count += 1;
        if (userRecord.count > MAX_REQUESTS_PER_WINDOW) {
            throw new HttpsError("resource-exhausted", "Rate limit exceeded. Try again later.");
        }
    }
    rateLimitMap.set(ip, userRecord);

    // 2. Payload Validation (Item 40)
    const prompt = request.data.prompt;
    const model = request.data.model || "gemini-1.5-flash";

    if (!prompt || typeof prompt !== 'string') {
        throw new HttpsError("invalid-argument", "A valid 'prompt' string is required.");
    }
    
    if (prompt.length > 10000) { 
         throw new HttpsError("invalid-argument", "Prompt is too long.");
    }

    // 3. Proxy to Google Gemini API
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "dummy_key"; 
    
    if (!apiKey) {
        console.error("GEMINI_API_KEY is missing from environment.");
        throw new HttpsError("internal", "Server misconfiguration. API keys missing.");
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7 }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            throw new HttpsError("internal", data.error?.message || "Error calling Gemini API");
        }

        return data;

    } catch (error) {
        console.error("Proxy execution error:", error);
        throw new HttpsError("internal", "An error occurred while communicating with the AI service.");
    }
});
