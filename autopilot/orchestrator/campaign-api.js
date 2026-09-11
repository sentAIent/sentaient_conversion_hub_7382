import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { createClient } from 'redis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { publishToTikTok, publishToMeta, publishToX, publishToLinkedIn } from './social-publishers.js';
import { issueAuthCookie, requireRole } from './auth.js';
import { generateMedia } from './media-generator.js';
import { scrapeTarget } from './crawlee-worker.js';

// ==========================================
// Environment Variable Validation
// ==========================================
const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  PORT: z.string().optional(),
  REDIS_URL: z.string().optional(),
  REDIS_PASSWORD: z.string().optional()
});

try {
  envSchema.parse(process.env);
  console.log("[Security] Environment variables successfully validated.");
} catch (error) {
  console.error("[Security] FATAL: Missing or invalid environment variables.", error.errors);
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8080;
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

// ==========================================
// Middleware & Configuration
// ==========================================
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      reportUri: '/api/csp-report',
    },
  },
}));
app.use(cors({ origin: true, credentials: true })); // Allow cookies across origins if needed
app.use(express.json({ type: ['application/json', 'application/csp-report'] }));
app.use(cookieParser());

// ==========================================
// Rate Limiting
// ==========================================
const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: "Too many requests from this IP, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Increased to allow background worker to ping multiple brands
  message: { error: "Strict rate limit exceeded." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(standardLimiter); // Apply broadly, override on specific routes

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
// Process Telemetry & SRE Crash Reporting
// ==========================================
// 1. OOM Prevention & Telemetry
setInterval(() => {
  const memoryUsage = process.memoryUsage();
  console.log(`[Telemetry] Memory: RSS=${Math.round(memoryUsage.rss / 1024 / 1024)}MB, HeapTotal=${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB, HeapUsed=${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`);
}, 60000); // Log every minute

// 2. AI-Powered Root Cause Analysis & PII Redaction
const redactPII = (text) => {
  if (!text) return text;
  // Redact emails
  text = text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '[REDACTED_EMAIL]');
  // Redact simple phone numbers
  text = text.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[REDACTED_PHONE]');
  return text;
};

process.on('uncaughtException', (err) => {
  const redactedError = redactPII(err.stack || err.message);
  console.error('[SRE AutoPilot] CRASH DETECTED. Redacted Trace:', redactedError);
  // In production, save to a crash log or reporting service here
  process.exit(1);
});

// ==========================================
// 1. CSP Violation Reporting Endpoint
// ==========================================
app.post('/api/csp-report', (req, res) => {
  console.warn('[Security] CSP Violation Detected:', req.body);
  res.status(204).end();
});

// ==========================================
// 1.5 Authentication & Identity
// ==========================================
app.post('/api/auth/login', (req, res) => {
    // Basic static credential check for the admin role for Phase 4.
    // In production, this should check a database and verify hashed passwords (bcrypt).
    const { username, password } = req.body;
    
    if (username === 'admin' && password === (process.env.ADMIN_PASSWORD || 'sentaient2026')) {
        const payload = { id: 1, username: 'admin', role: 'admin' };
        issueAuthCookie(res, payload);
        return res.json({ success: true, message: 'Logged in successfully', role: 'admin' });
    }
    
    return res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('auth_token', { httpOnly: true, sameSite: 'strict' });
    res.json({ success: true, message: 'Logged out successfully' });
});

// ==========================================
// 2. LLM Proxy (Gemini) with Spend Caps
// ==========================================
/**
 * The primary interface for AI generation.
 * Handles system prompt injection and error reporting.
 */
app.post("/proxy/gemini", strictLimiter, requireRole('admin'), async (req, res) => {
  // SPEND CAP PROTECTION
  const today = new Date().toISOString().split('T')[0];
  const spendKey = `spend_cap:gemini:${today}`;
  const currentUsage = await redis.incr(spendKey);
  if (currentUsage === 1) {
    await redis.expire(spendKey, 86400); // Expire after 24h
  }

  if (currentUsage > 500) {
    console.error(`[Security] SPEND CAP EXCEEDED. Rejected request #${currentUsage}`);
    return res.status(429).json({ error: "Daily spend cap exceeded for paid APIs." });
  }
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
    
    // Legacy support for screenshots
    if (screenshotBase64) {
        console.log("DEBUG: Injecting legacy screenshot into Gemini payload for Vision analysis.");
        parts.push({
            inlineData: {
                mimeType: "image/png",
                data: screenshotBase64
            }
        });
    }

    // New support for dynamic mediaFiles (audio, video, images)
    if (req.body.mediaFiles && Array.isArray(req.body.mediaFiles)) {
        console.log(`DEBUG: Injecting ${req.body.mediaFiles.length} media file(s) into Gemini payload.`);
        req.body.mediaFiles.forEach((file) => {
            if (file.base64 && file.mimeType) {
                parts.push({
                    inlineData: {
                        mimeType: file.mimeType,
                        data: file.base64
                    }
                });
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
let campaignQueue = null;
(async () => {
    try {
        const { Queue } = await import('bullmq');
        campaignQueue = new Queue('campaigns', { 
            connection: { 
                url: process.env.REDIS_URL || 'redis://localhost:6379',
                password: process.env.REDIS_PASSWORD
            } 
        });
    } catch (e) {
        console.warn("DEBUG: BullMQ not installed or failed to initialize, falling back to basic queueing.");
    }
})();

const queuePayloadSchema = z.object({
    campaign_id: z.string().min(1),
    brand: z.string().optional(),
    brand_id: z.string().optional(),
    status: z.string().optional(),
    generated_copy: z.string().optional(),
    inputValue: z.string().optional(),
    targetAccounts: z.array(z.string()).optional(),
    platforms: z.array(z.string()).optional(),
    created_at: z.string().optional(),
    source: z.string().optional()
}).passthrough();

app.post("/queue/add", strictLimiter, requireRole('admin'), async (req, res) => {
    try {
        const payload = queuePayloadSchema.parse(req.body);
        await redis.set(`queue:${payload.campaign_id}`, JSON.stringify(payload));
        
        if (campaignQueue) {
            await campaignQueue.add('processCampaign', payload, { jobId: payload.campaign_id });
        }
        
        res.json({ success: true });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: "Invalid payload", details: err.errors });
        }
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
app.post("/queue/:id/approve", requireRole('admin'), async (req, res) => {
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

// 8. Queue Retry Endpoint
app.post("/queue/retry", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ error: "Missing id" });

        const data = await redis.get(`queue:${id}`);
        if (!data) return res.status(404).json({ error: "Queue item not found" });
        
        const existing = JSON.parse(data);
        const updated = { 
            ...existing, 
            status: 'staged', // Reset to staged so it can be re-crawled/processed
            error: null
        };
        
        await redis.set(`queue:${id}`, JSON.stringify(updated));
        res.json({ success: true, status: 'staged' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 9. Admin Authorization Middleware (Deprecated in favor of JWT RBAC)
// ==========================================
// Replaced by requireRole('admin') via HttpOnly Cookies
// app.use('/admin', adminAuth);

// ==========================================
// 9. Master Schedule Admin Endpoints
// ==========================================
app.get("/admin/schedules", requireRole('admin'), (req, res) => {
    try {
        const configPath = path.join(__dirname, 'marketing_schedules.json');
        if (fs.existsSync(configPath)) {
            const data = fs.readFileSync(configPath, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.json([]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/admin/schedules", requireRole('admin'), (req, res) => {
    try {
        const configPath = path.join(__dirname, 'marketing_schedules.json');
        fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 10. Account Management Endpoints
// ==========================================
app.get("/admin/accounts", requireRole('admin'), (req, res) => {
    try {
        const configPath = path.join(__dirname, 'marketing_accounts.json');
        if (fs.existsSync(configPath)) {
            const data = fs.readFileSync(configPath, 'utf8');
            res.json(JSON.parse(data));
        } else {
            // Default template if no accounts exist
            const defaultAccounts = {
                "TikTok": [],
                "Instagram": [],
                "X": [],
                "LinkedIn": []
            };
            res.json(defaultAccounts);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/admin/accounts", requireRole('admin'), (req, res) => {
    try {
        const configPath = path.join(__dirname, 'marketing_accounts.json');
        fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 10b. Credential Management Endpoints
// ==========================================
app.get("/admin/credentials", requireRole('admin'), (req, res) => {
    try {
        const configPath = path.join(__dirname, 'marketing_credentials.json');
        if (fs.existsSync(configPath)) {
            const data = fs.readFileSync(configPath, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.json({});
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/admin/credentials", requireRole('admin'), (req, res) => {
    try {
        const configPath = path.join(__dirname, 'marketing_credentials.json');
        fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 10c. OAuth Connection Endpoints
// ==========================================
app.get("/admin/credentials/status", (req, res) => {
    try {
        const configPath = path.join(__dirname, 'marketing_credentials.json');
        let status = { tiktok: false, meta: false, linkedin: false, x: false };
        if (fs.existsSync(configPath)) {
            const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (data['TikTok:@auto']?.accessToken || process.env.TIKTOK_ACCESS_TOKEN) status.tiktok = true;
            if (data['Meta:@auto']?.accessToken || process.env.META_ACCESS_TOKEN) status.meta = true;
            if (data['LinkedIn:@auto']?.accessToken || process.env.LINKEDIN_ACCESS_TOKEN) status.linkedin = true;
            if (data['X:@auto']?.bearerToken || process.env.X_BEARER_TOKEN) status.x = true;
        } else {
             if (process.env.TIKTOK_ACCESS_TOKEN) status.tiktok = true;
             if (process.env.META_ACCESS_TOKEN) status.meta = true;
             if (process.env.LINKEDIN_ACCESS_TOKEN) status.linkedin = true;
             if (process.env.X_BEARER_TOKEN) status.x = true;
        }
        res.json(status);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// TikTok OAuth Init
app.get("/api/auth/tiktok/init", (req, res) => {
    const clientKey = process.env.TIKTOK_CLIENT_ID;
    if (!clientKey) {
        return res.status(500).send("TIKTOK_CLIENT_ID not configured in .env");
    }
    const redirectUri = encodeURIComponent("http://localhost:8080/api/auth/tiktok/callback");
    // scope video.publish is required for Direct Post API
    const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&response_type=code&scope=user.info.basic,video.publish&redirect_uri=${redirectUri}&state=tiktok_connect`;
    res.redirect(authUrl);
});

// TikTok OAuth Callback
app.get("/api/auth/tiktok/callback", async (req, res) => {
    const { code, state, error, error_description } = req.query;

    if (error) {
        return res.status(400).send(`OAuth Error: ${error_description}`);
    }

    if (!code) {
        return res.status(400).send("No authorization code provided");
    }

    const clientKey = process.env.TIKTOK_CLIENT_ID;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
    const redirectUri = "http://localhost:8080/api/auth/tiktok/callback";

    try {
        const tokenRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache"
            },
            body: new URLSearchParams({
                client_key: clientKey,
                client_secret: clientSecret,
                code: code,
                grant_type: "authorization_code",
                redirect_uri: redirectUri
            })
        });

        const tokenData = await tokenRes.json();

        if (tokenData.error) {
            throw new Error(tokenData.error_description || tokenData.error);
        }

        const accessToken = tokenData.access_token;
        const openId = tokenData.open_id;

        // Save to marketing_credentials.json under the generic "@auto" handle
        const configPath = path.join(__dirname, 'marketing_credentials.json');
        let credentials = {};
        if (fs.existsSync(configPath)) {
            credentials = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }

        credentials['TikTok:@auto'] = {
            accessToken: accessToken,
            openId: openId,
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(configPath, JSON.stringify(credentials, null, 2));

        // Redirect back to the connections dashboard
        res.redirect("http://localhost:3000/admin/connections?success=tiktok");

    } catch (err) {
        console.error("TikTok OAuth Token Exchange Error:", err);
        res.status(500).send("Failed to exchange authorization code for access token.");
    }
});

// Meta (Instagram) OAuth Init
app.get("/api/auth/meta/init", (req, res) => {
    const clientId = process.env.META_CLIENT_ID;
    if (!clientId) return res.status(500).send("META_CLIENT_ID not configured in .env");
    const redirectUri = encodeURIComponent("http://localhost:8080/api/auth/meta/callback");
    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement&state=meta_connect`;
    res.redirect(authUrl);
});

// Meta (Instagram) OAuth Callback
app.get("/api/auth/meta/callback", async (req, res) => {
    const { code, error, error_description } = req.query;
    if (error) return res.status(400).send(`OAuth Error: ${error_description}`);
    if (!code) return res.status(400).send("No authorization code provided");

    const clientId = process.env.META_CLIENT_ID;
    const clientSecret = process.env.META_CLIENT_SECRET;
    const redirectUri = "http://localhost:8080/api/auth/meta/callback";

    try {
        const tokenRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`);
        const tokenData = await tokenRes.json();
        if (tokenData.error) throw new Error(tokenData.error.message);

        // Normally you'd exchange for a long-lived token here and fetch the page/IG account IDs.
        // For brevity, we just save the token.
        const configPath = path.join(__dirname, 'marketing_credentials.json');
        let credentials = {};
        if (fs.existsSync(configPath)) credentials = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        credentials['Meta:@auto'] = {
            accessToken: tokenData.access_token,
            updatedAt: new Date().toISOString()
        };
        fs.writeFileSync(configPath, JSON.stringify(credentials, null, 2));
        res.redirect("http://localhost:3000/admin/connections?success=meta");
    } catch (err) {
        console.error("Meta OAuth Error:", err);
        res.status(500).send("Failed to complete Meta OAuth.");
    }
});

// LinkedIn OAuth Init
app.get("/api/auth/linkedin/init", (req, res) => {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    if (!clientId) return res.status(500).send("LINKEDIN_CLIENT_ID not configured");
    const redirectUri = encodeURIComponent("http://localhost:8080/api/auth/linkedin/callback");
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=w_member_social,r_liteprofile&state=linkedin_connect`;
    res.redirect(authUrl);
});

// LinkedIn OAuth Callback
app.get("/api/auth/linkedin/callback", async (req, res) => {
    const { code, error, error_description } = req.query;
    if (error) return res.status(400).send(`OAuth Error: ${error_description}`);
    if (!code) return res.status(400).send("No authorization code provided");

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirectUri = "http://localhost:8080/api/auth/linkedin/callback";

    try {
        const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret
            })
        });
        const tokenData = await tokenRes.json();
        if (tokenData.error) throw new Error(tokenData.error_description);

        const configPath = path.join(__dirname, 'marketing_credentials.json');
        let credentials = {};
        if (fs.existsSync(configPath)) credentials = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        credentials['LinkedIn:@auto'] = {
            accessToken: tokenData.access_token,
            updatedAt: new Date().toISOString()
        };
        fs.writeFileSync(configPath, JSON.stringify(credentials, null, 2));
        res.redirect("http://localhost:3000/admin/connections?success=linkedin");
    } catch (err) {
        console.error("LinkedIn OAuth Error:", err);
        res.status(500).send("Failed to complete LinkedIn OAuth.");
    }
});

// X (Twitter) OAuth Init (OAuth 2.0 PKCE)
app.get("/api/auth/x/init", (req, res) => {
    const clientId = process.env.X_CLIENT_ID;
    if (!clientId) return res.status(500).send("X_CLIENT_ID not configured");
    const redirectUri = encodeURIComponent("http://localhost:8080/api/auth/x/callback");
    // Twitter requires PKCE code_challenge, simplifying for demonstration by hardcoding challenge/method if strictly necessary,
    // though real implementation needs dynamic PKCE generation. We'll simulate standard code flow.
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=tweet.read,tweet.write,users.read,offline.access&state=x_connect&code_challenge=challenge&code_challenge_method=plain`;
    res.redirect(authUrl);
});

// X (Twitter) OAuth Callback
app.get("/api/auth/x/callback", async (req, res) => {
    const { code, error, error_description } = req.query;
    if (error) return res.status(400).send(`OAuth Error: ${error_description}`);
    if (!code) return res.status(400).send("No authorization code provided");

    const clientId = process.env.X_CLIENT_ID;
    const clientSecret = process.env.X_CLIENT_SECRET;
    const redirectUri = "http://localhost:8080/api/auth/x/callback";

    try {
        const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            body: new URLSearchParams({
                code: code,
                grant_type: "authorization_code",
                redirect_uri: redirectUri,
                code_verifier: "challenge" // Match the code_challenge above
            })
        });
        const tokenData = await tokenRes.json();
        if (tokenData.error) throw new Error(tokenData.error_description);

        const configPath = path.join(__dirname, 'marketing_credentials.json');
        let credentials = {};
        if (fs.existsSync(configPath)) credentials = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        credentials['X:@auto'] = {
            bearerToken: tokenData.access_token, // X uses access token as bearer for API
            refreshToken: tokenData.refresh_token,
            updatedAt: new Date().toISOString()
        };
        fs.writeFileSync(configPath, JSON.stringify(credentials, null, 2));
        res.redirect("http://localhost:3000/admin/connections?success=x");
    } catch (err) {
        console.error("X OAuth Error:", err);
        res.status(500).send("Failed to complete X OAuth.");
    }
});

// ==========================================
// 12. SOCIALYZE Research Portal
// ==========================================

app.post("/api/socialyze/analyze", strictLimiter, requireRole('admin'), async (req, res) => {
    try {
        const { mode, target, content } = req.body;
        let dataToAnalyze = content;

        if (mode === 'search') {
            console.log(`[SOCIALYZE] Firing up Crawlee stealth scraper for target: ${target}`);
            try {
                // Determine URL (e.g. converting @handle to twitter or instagram)
                let urlToScrape = target;
                if (!target.startsWith('http')) {
                    // Default to X/Twitter if it's just a handle and platform wasn't provided, 
                    // otherwise we would ideally construct based on req.body.platform.
                    const platformDomain = (req.body.platform || 'x').toLowerCase();
                    if (platformDomain === 'x' || platformDomain === 'twitter') {
                        urlToScrape = `https://twitter.com/${target.replace('@', '')}`;
                    } else if (platformDomain === 'instagram') {
                        urlToScrape = `https://instagram.com/${target.replace('@', '')}`;
                    } else if (platformDomain === 'tiktok') {
                        urlToScrape = `https://tiktok.com/@${target.replace('@', '')}`;
                    } else {
                        urlToScrape = `https://twitter.com/${target.replace('@', '')}`;
                    }
                }
                
                dataToAnalyze = await scrapeTarget(urlToScrape);
                console.log(`[SOCIALYZE] Crawlee extracted ${dataToAnalyze.length} characters of intelligence.`);
                
            } catch (e) {
                console.error("[SOCIALYZE] Crawlee failed, falling back to simulated data.", e);
                dataToAnalyze = `(Simulated scraped content for ${target}) 
                Post 1: "We just launched our new AI product, it's 100x faster than competitors."
                Post 2: "Our accuracy is mathematically proven to be 99.9% without hallucinations."
                Post 3: "Buy our crypto token for guaranteed 1000x returns!"`;
            }
        }

        if (!dataToAnalyze || dataToAnalyze.length < 50) {
            return res.status(400).json({ error: "No content available to analyze." });
        }

        console.log("[SOCIALYZE] Requesting Gemini analysis...");
        
        // Use Gemini to analyze the content
        const systemPrompt = `You are SOCIALYZE, an elite social media intelligence analyst.
Your task is to analyze the following content/posts and return a strictly formatted JSON response.
Do NOT use markdown code blocks (\`\`\`json) in the response, just the raw JSON object.
Evaluate the content across 4 key vectors:

JSON Format:
{
  "engagement": {
    "viralityPotential": 85, // 0-100
    "audienceResonance": 70, // 0-100
    "brandSafetyRisk": "Low" // Low, Medium, High
  },
  "brandIdentity": {
    "toneAndVoice": "Authoritative and Sarcastic",
    "coreDemographics": "Tech founders and enthusiasts",
    "contentPillars": ["AI Products", "Benchmarks", "Crypto"] // Array of 3 strings
  },
  "conversion": {
    "conversionProbability": 60, // 0-100
    "ctaStrength": 80, // 0-100
    "monetizationAngle": "Direct sales and B2B SaaS"
  },
  "radar": {
    "aesthetics": 5, // 0-10
    "originality": 8, // 0-10
    "engagement": 9, // 0-10
    "consistency": 7, // 0-10
    "trust": 4 // 0-10
  },
  "summary": "A 2-3 paragraph executive summary synthesizing all 4 vectors."
}`;

        const apiUrl = `${GEMINI_BASE}/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        
        const aiRes = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nCONTENT TO ANALYZE:\n${dataToAnalyze}` }] }]
            })
        });

        const aiData = await aiRes.json();
        
        if (!aiRes.ok) {
            throw new Error(aiData.error?.message || "AI Analysis Failed");
        }

        let generatedText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        // Clean up markdown if the model ignored instructions
        generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        let analysis;
        try {
            analysis = JSON.parse(generatedText);
        } catch (e) {
            console.error("[SOCIALYZE] Failed to parse AI JSON response:", generatedText);
            throw new Error("AI returned an invalid analysis format.");
        }

        const record = {
            id: `soc_${Date.now()}`,
            target: target,
            mode: mode,
            engagement: analysis.engagement || { viralityPotential: 0, audienceResonance: 0, brandSafetyRisk: 'Unknown' },
            brandIdentity: analysis.brandIdentity || { toneAndVoice: 'Unknown', coreDemographics: 'Unknown', contentPillars: [] },
            conversion: analysis.conversion || { conversionProbability: 0, ctaStrength: 0, monetizationAngle: 'Unknown' },
            radar: analysis.radar || { aesthetics: 0, originality: 0, engagement: 0, consistency: 0, trust: 0 },
            summary: analysis.summary || "No summary provided.",
            createdAt: new Date().toISOString()
        };

        // Save to Redis Historical Ledger
        await redis.set(`socialyze:history:${record.id}`, JSON.stringify(record));

        res.json(record);
    } catch (err) {
        console.error("[SOCIALYZE] Error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/socialyze/history", requireRole('admin'), async (req, res) => {
    try {
        const keys = await redis.keys("socialyze:history:*");
        const history = [];
        for (const key of keys) {
            const data = await redis.get(key);
            if (data) history.push(JSON.parse(data));
        }
        
        // Sort descending by date
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        res.json(history);
    } catch (err) {
        console.error("[SOCIALYZE] History Error:", err);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// ==========================================
// 13. Testing & Publishing
// ==========================================
app.post("/admin/test-publish", requireRole('admin'), async (req, res) => {
    try {
        const { platform, handle, text, mediaUrl } = req.body;
        
        let result = null;
        switch (platform.toLowerCase()) {
            case 'tiktok':
                result = await publishToTikTok(mediaUrl, text);
                break;
            case 'instagram':
            case 'meta':
                result = await publishToMeta(mediaUrl, text);
                break;
            case 'x':
            case 'twitter':
                result = await publishToX(text, mediaUrl);
                break;
            case 'linkedin':
                result = await publishToLinkedIn(text, handle);
                break;
            default:
                throw new Error(`Unsupported platform: ${platform}`);
        }
        
        res.json(result);
    } catch (err) {
        console.error(`[Test Publish Error] ${req.body.platform}:`, err);
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 13. Media Generation (Higgsfield Integration)
// ==========================================

app.post("/api/media/generate", strictLimiter, requireRole('admin'), async (req, res) => {
    try {
        const { model = 'kling-3.0', prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Missing 'prompt' in request body." });
        }

        console.log(`[Media API] Generation requested for model: ${model}`);
        const mediaUrl = await generateMedia(model, prompt);
        
        res.json({ success: true, url: mediaUrl });
    } catch (err) {
        console.error("[Media API] Generation Error:", err);
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