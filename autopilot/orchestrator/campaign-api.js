import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';

const app = express();
const PORT = process.env.PORT || 8080;
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

// ==========================================
// Middleware & Configuration
// ==========================================
app.use(cors());
app.use(express.json());

// ==========================================
// Redis Persistence Layer
// ==========================================
const redis = createClient({ 
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD
});

redis.on('error', (err) => console.error('[Redis] Client Error', err));

redis.connect()
    .then(() => console.log("[Redis] Successfully connected to Redis instance"))
    .catch((err) => console.error("[Redis] Connection failed:", err));

// ==========================================
// 1. Health Check Endpoint
// ==========================================
/**
 * Simple uptime check for monitoring systems
 */
app.get('/health', (req, res) => {
    console.log("DEBUG: Health check ping received");
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        port: PORT 
    });
});

// ==========================================
// 2. Campaign Persistence Endpoint
// ==========================================
/**
 * Persists complex campaign configurations to Redis.
 * Expected body: { brand: string, campaign_type: string, input_value: string }
 */
app.post("/campaign", async (req, res) => {
    console.log("DEBUG: --- CAMPAIGN PERSISTENCE REQUEST ---");
    console.log("DEBUG: Payload:", JSON.stringify(req.body, null, 2));

    try {
        const id = Date.now().toString();
        const data = JSON.stringify(req.body);
        
        console.log(`DEBUG: Saving campaign with ID: ${id}`);
        await redis.set(`campaign:${id}`, data);
        
        console.log("DEBUG: Persistence successful.");
        res.json({ success: true, id });
        
    } catch (e) {
        console.error("DEBUG: CRITICAL Persistence Error:", e);
        res.status(500).json({ error: "Failed to persist campaign: " + e.message });
    }
});

// ==========================================
// 3. Gemini Proxy (The Orchestrator)
// ==========================================
/**
 * The primary interface for AI generation.
 * Handles system prompt injection and error reporting.
 */
app.post("/proxy/gemini", async (req, res) => {
  console.log("DEBUG: --- PROXY REQUEST RECEIVED ---");
  console.log("DEBUG: Request Body:", JSON.stringify(req.body, null, 2));
  
  const { 
    model = "gemini-2.5-flash", 
    prompt = "", 
    systemPrompt = "You are a helpful AI assistant.",
    screenshotBase64 = null
  } = req.body;

  // Environment Check
  if (!process.env.GEMINI_API_KEY) {
      console.error("DEBUG: ERROR - GEMINI_API_KEY is missing! Check your environment variables.");
      return res.status(500).json({ error: "API Key not configured on server" });
  }

  try {
    let finalSystemPrompt = systemPrompt;
    
    // Inject analytics loop intelligence
    try {
        const analyticsData = await redis.get("system:analytics_snapshot");
        if (analyticsData) {
            const parsedAnalytics = JSON.parse(analyticsData);
            finalSystemPrompt += `\n\n[CRITICAL MARKETING INTELLIGENCE]: Past performance data indicates our top campaign generated ${parsedAnalytics.top_performing_campaign.views} views using the viral angle: "${parsedAnalytics.top_performing_campaign.viral_angle}". Incorporate learnings from this success into the new strategy.`;
        }
    } catch (e) {
        console.error("DEBUG: Failed to fetch analytics snapshot, proceeding without it.", e);
    }

    const modelName = model.startsWith("models/") ? model : `models/${model}`;
    const apiUrl = `${GEMINI_BASE}/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    console.log("DEBUG: Attempting Gemini API request...");
    console.log("DEBUG: Model:", modelName);
    console.log("DEBUG: URL (hidden key):", apiUrl.replace(process.env.GEMINI_API_KEY, "HIDDEN"));

    // Prepare Multimodal Payload
    const parts = [{ text: `${finalSystemPrompt}\n\n${prompt}` }];
    
    if (screenshotBase64) {
        console.log("DEBUG: Injecting screenshot into Gemini payload for Vision analysis.");
        parts.push({
            inlineData: {
                mimeType: "image/png",
                data: screenshotBase64
            }
        });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
            role: "user", 
            parts: parts 
        }],
      }),
    });

    const responseText = await response.text();
    let data;
    try {
        data = JSON.parse(responseText);
    } catch (parseError) {
        console.error("DEBUG: Failed to parse Gemini response as JSON. Raw text:", responseText);
        throw new Error("Invalid JSON response from Gemini API");
    }
    
    // Log response status for internal inspection
    console.log("DEBUG: Gemini Response Status:", response.status);
    console.log("DEBUG: Gemini Raw Response Body:", JSON.stringify(data, null, 2));
    
    // Check if the response itself indicates an error
    if (!response.ok) {
        console.error("DEBUG: Gemini API responded with error status:", response.status);
        return res.status(500).json({ 
            error: "Gemini API Error: " + (data.error?.message || "Unknown error"),
            details: data 
        });
    }

    // Extract text safely
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";
    
    console.log("DEBUG: Generation successful, returning text to client.");
    res.json({ text: generatedText });
    
  } catch (err) {
    console.error("DEBUG: CRITICAL BACKEND ERROR in Proxy Route:", err);
    res.status(500).json({ 
        error: "Connection error: " + err.message,
        stack: err.stack 
    });
  }
});

// Dashboard Stats
async function loadDashboardStats() {
  const apiBase = (typeof localStorage !== 'undefined' && typeof window !== 'undefined') ? (localStorage.getItem('apiBase') || 'http://localhost:8082') : 'http://localhost:8082'; // Ensure port is 8082
  console.log("DEBUG: Attempting to fetch stats from:", `${apiBase}/staged`);
  
  try {
    const res = await fetch(`${apiBase}/staged`);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    
    const data = await res.json();
    console.log("DEBUG: Stats received:", data);
    
    if (document.getElementById('statCount')) {
        document.getElementById('statCount').innerText = data.count || 0;
    }
  } catch (err) {
    console.error("DEBUG: Failed to load dashboard stats:", err);
    // Visual feedback for the user in the UI
    if (document.getElementById('statCount')) {
        document.getElementById('statCount').innerText = "ERR";
    }
  }
}

// 4. Key Status Check (Adding missing route)
app.get('/proxy/key-status', (req, res) => {
    const hasKey = !!process.env.GEMINI_API_KEY;
    res.json({ configured: hasKey });
});

// 5. Staging Count Endpoint
app.get("/staged", async (req, res) => {
    try {
        // Fetch all campaign keys from Redis
        const keys = await redis.keys("campaign:*");
        res.json({ count: keys.length });
    } catch (err) {
        console.error("DEBUG: Failed to fetch staged count:", err);
        res.status(500).json({ error: "Could not retrieve count" });
    }
});

// Analytics Snapshot Endpoint
app.get("/analytics", async (req, res) => {
    try {
        const data = await redis.get("system:analytics_snapshot");
        if (data) {
            res.json(JSON.parse(data));
        } else {
            res.json({ error: "No analytics data available yet." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Queue Management
app.post("/queue/add", async (req, res) => {
    try {
        const payload = req.body;
        await redis.set(`queue:${payload.campaign_id}`, JSON.stringify(payload));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/queue/list", async (req, res) => {
    try {
        const keys = await redis.keys("queue:*");
        const items = [];
        for (const key of keys) {
            const data = await redis.get(key);
            if (data) items.push(JSON.parse(data));
        }
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/queue/:id", async (req, res) => {
    try {
        const data = await redis.get(`queue:${req.params.id}`);
        if (!data) return res.status(404).json({ error: "Queue item not found" });
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/queue/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await redis.get(`queue:${id}`);
        if (!data) return res.status(404).json({ error: "Queue item not found" });
        
        const existing = JSON.parse(data);
        const updated = { ...existing, ...req.body };
        
        await redis.set(`queue:${id}`, JSON.stringify(updated));
        res.json({ success: true, item: updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Queue Approval Endpoint
app.post("/queue/:id/approve", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await redis.get(`queue:${id}`);
        if (!data) return res.status(404).json({ error: "Queue item not found" });
        
        const existing = JSON.parse(data);
        const updated = { 
            ...existing, 
            status: 'approved_for_publishing',
            approved_at: new Date().toISOString()
        };
        
        await redis.set(`queue:${id}`, JSON.stringify(updated));
        res.json({ success: true, status: 'approved_for_publishing' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Final Server Listener
// ==========================================
app.listen(PORT, '0.0.0.0', () => {
  console.log("=========================================");
  console.log(`Campaign API running on port ${PORT}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log("=========================================");
});