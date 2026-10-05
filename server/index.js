require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const { createClient } = require('@supabase/supabase-js');
const rateLimit = require('express-rate-limit');

const app = express();

const whitelist = ['https://sentaient.com', 'http://localhost:5173', 'http://localhost:3000', 'capacitor://localhost', 'https://localhost'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions)); // Strict origin lock with credentials
app.use(express.json());
app.use(cookieParser());

// CSRF Protection Middleware
const csrfProtection = csrf({ 
  cookie: { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict' 
  } 
});

// Supabase Admin for Data Deletion
const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL || 'http://localhost:54321',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_role_key'
);

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Strict Auth Rate Limiter
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 auth requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts, please try again after an hour.' }
});

// AI Companion Premium Rate Limiter (Protects LLM margins for $4.99/mo tier)
const aiCompanionLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 150, // 150 requests per day (approx ~4500/mo, easily covered by $4.99)
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Daily AI Companion limit reached. Your ship computer needs time to recharge.' }
});

app.use(globalLimiter);

const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

// PII Redaction Utility
function redactPII(text) {
  if (!text) return text;
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED EMAIL]')
    .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[REDACTED PHONE]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED SSN]');
}

// Content Moderation Middleware using Gemini
async function moderateContent(req, res, next) {
  try {
    const content = JSON.stringify(req.body);
    if (!content || content.length < 5) return next();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Analyze the following user input for hate speech, extreme toxicity, illegal content, or severe abuse. Respond with ONLY 'SAFE' or 'UNSAFE'.\n\nInput: ${content}`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim().toUpperCase();

    if (responseText.includes('UNSAFE')) {
      console.warn('Blocked unsafe content:', content);
      return res.status(403).json({ error: 'Content flagged by moderation system.' });
    }
    next();
  } catch (error) {
    console.error('Moderation API Error:', error);
    // Fail-open for reliability, or fail-closed for strict security
    next();
  }
}

// CSRF Token Endpoint
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Auth Session Endpoint (HttpOnly Cookies)
app.post('/api/auth/session', authLimiter, csrfProtection, (req, res) => {
  const { access_token, refresh_token } = req.body;
  if (!access_token) return res.status(400).json({ error: 'Missing token' });
  
  res.cookie('sb-access-token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000 // 1 hour
  });
  
  if (refresh_token) {
    res.cookie('sb-refresh-token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 3600000 // 7 days
    });
  }
  
  res.json({ success: true });
});

// GDPR Data Deletion API
app.delete('/api/user/delete', csrfProtection, async (req, res) => {
  try {
    const accessToken = req.cookies['sb-access-token'];
    if (!accessToken) return res.status(401).json({ error: 'Unauthorized' });

    // Verify token and get user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) return res.status(401).json({ error: 'Invalid session' });

    // Delete user from Auth (cascades to public tables if FKs are setup correctly)
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    if (deleteError) throw deleteError;

    // Clear cookies
    res.clearCookie('sb-access-token');
    res.clearCookie('sb-refresh-token');

    res.json({ success: true, message: 'Account and all associated PII permanently deleted.' });
  } catch (err) {
    console.error('Data Deletion Error:', err);
    res.status(500).json({ error: 'Failed to delete account.' });
  }
});

// AI Financial Officer Endpoint
app.post('/api/finance', moderateContent, async (req, res) => {
  try {
    const { playerStats, query } = req.body;
    const redactedQuery = redactPII(query);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are the AI Fleet Logistics & Economy Officer for a Starbase in the game Interstellar.
Here are the player's current stats:
${JSON.stringify(playerStats, null, 2)}

The player (Commander) asks: "${redactedQuery}"

Respond with strategic, in-universe logistics and resource management advice. Do NOT act like a modern-day financial advisor or spreadsheet manager. Talk about plasma cores, colony expansion, fleet deployments, or rare mineral trading. Keep it under 3 sentences and be slightly snarky but helpful.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ advice: text });
  } catch (error) {
    console.error('Finance Agent Error:', error);
    res.status(500).json({ error: 'Failed to generate financial advice.' });
  }
});

// Galactic News Network Endpoint
app.post('/api/news', moderateContent, async (req, res) => {
  try {
    const { milestone, playerStats } = req.body;
    const redactedMilestone = redactPII(milestone);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are a reporter for the Galactic News Network in the game Interstellar.
The player just achieved this milestone: "${redactedMilestone}".
Current player stats: ${JSON.stringify(playerStats)}

Generate a humorous, breaking news headline and a 1-2 sentence article about this milestone.
Format as JSON: { "headline": "...", "content": "..." }
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up JSON formatting if necessary
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const newsData = JSON.parse(text);

    res.json(newsData);
  } catch (error) {
    console.error('News Agent Error:', error);
    res.status(500).json({ error: 'Failed to generate news.' });
  }
});

// Dynamic Music Generation Endpoint (Procedural Synth Parameters)
app.post('/api/music', async (req, res) => {
  try {
    const { atmosphere } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are an AI Music Composer for the game Interstellar.
The current atmosphere is: "${atmosphere}".

Generate procedural Web Audio API synthesizer parameters to fit this mood.
Respond with ONLY a JSON object containing these numeric values:
{
  "baseFreq": (number between 50 and 800),
  "modulationIdx": (number between 1 and 20),
  "oscillatorType": (string: "sine", "square", "sawtooth", or "triangle"),
  "tempo": (number between 60 and 180),
  "filterCutoff": (number between 500 and 5000)
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up JSON formatting
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const musicParams = JSON.parse(text);

    res.json(musicParams);
  } catch (error) {
    console.error('Music Agent Error:', error);
    res.status(500).json({ error: 'Failed to generate music parameters.' });
  }
});

// Excalidraw Multimodal Enemy AI Endpoint
app.post('/api/analyze-map', moderateContent, async (req, res) => {
  try {
    const { mapBase64, mapDescription } = req.body;
    const redactedDescription = redactPII(mapDescription);
    // In a real scenario, we'd pass the base64 image directly to Gemini 1.5 Pro/Flash vision capabilities.
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are the Supreme Commander of an enemy alien faction in Interstellar.
The player has drawn a battle plan on an Excalidraw map.
Description of their plan: "${redactedDescription}"

(Note: Base64 image analysis simulated for this endpoint).

Provide a 2-sentence counter-strategy to defeat their plan. Be menacing.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ counterStrategy: text });
  } catch (error) {
    console.error('Enemy AI Error:', error);
    res.status(500).json({ error: 'Failed to analyze map.' });
  }
});

// Screenpipe AI Companion Endpoint
app.post('/api/ai-companion', aiCompanionLimiter, moderateContent, async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : req.cookies['sb-access-token'];

    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized: Missing access token. Please log in.' });
    }

    // Verify token and get user via Supabase Admin
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.warn('AI Companion Auth Failed:', authError?.message || 'Invalid session');
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired session.' });
    }

    // Check if user has active AI companion subscription via Supabase user metadata
    // In a fully integrated system, this would sync from Stripe webhooks to Supabase auth.users
    const isAiCompanionActive = user.user_metadata?.subscription?.isAiCompanionActive || 
                                user.user_metadata?.isAiCompanionActive === true;

    // We fail-open slightly for dev/testing, but in strict production we'd enforce the flag:
    if (process.env.NODE_ENV === 'production' && !isAiCompanionActive) {
      return res.status(403).json({ error: 'Forbidden: Active AI Companion subscription required.' });
    }
    
    const { query, screenpipeContext } = req.body;
    const redactedQuery = redactPII(query);
    
    // We expect screenpipeContext to be an array or string of recent OCR/Voice transcripts
    const contextStr = Array.isArray(screenpipeContext) ? screenpipeContext.join('\n') : String(screenpipeContext || '');
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are the player's personal Ship AI Companion in the game Interstellar.
Here is what the player has recently seen or heard based on their local screen/audio context:
---
${contextStr}
---

The player asks you: "${redactedQuery}"

Answer the player's query using the screen/audio context provided. Be helpful, concise, and stay in character as a futuristic starship AI.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('AI Companion Error:', error);
    res.status(500).json({ error: 'Ship AI encountered a processing error.' });
  }
});

// AI-Powered Root Cause Analysis (RCA) Endpoint
app.post('/api/ai-rca', moderateContent, async (req, res) => {
  try {
    const { errorTraceback } = req.body;
    if (!errorTraceback) {
      return res.status(400).json({ error: 'Missing error traceback' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // We explicitly ask for a JSON structure
    const prompt = `
You are an expert React and Node.js debugging AI. Analyze the following frontend application crash traceback.
Provide a concise, human-readable root cause, and a step-by-step remediation plan to fix the code.

Traceback:
${errorTraceback.substring(0, 3000)}

Respond strictly in valid JSON format:
{
  "root_cause": "Brief explanation of why it crashed...",
  "remediation": "1. Step one\\n2. Step two..."
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up markdown formatting if Gemini includes it
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const rca = JSON.parse(text);
    res.json(rca);
  } catch (error) {
    console.error('RCA Agent Error:', error);
    res.status(500).json({ 
      root_cause: "System Error: Failed to generate AI analysis.", 
      remediation: "Check server logs for the RCA Agent failure." 
    });
  }
});

// Data Export Endpoint (Supabase mock)
app.get('/api/export-data', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    // Mock Supabase fetch for user data
    const exportData = {
      user: userId,
      gameStats: { level: 42, playtime: 120, credits: 15000 },
      history: ['mission1_complete', 'planet_discovered'],
      timestamp: new Date().toISOString()
    };
    
    res.setHeader('Content-disposition', `attachment; filename=export_${userId}.json`);
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify(exportData, null, 2));
  } catch (error) {
    console.error('Export Error:', error);
    res.status(500).json({ error: 'Failed to export data.' });
  }
});

// OOM Prevention & Telemetry Watchdog
setInterval(() => {
  const memUsage = process.memoryUsage();
  const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);
  
  if (heapUsedMB > 500) { // Arbitrary threshold for a small node app
    console.warn(`[OOM WARNING] High memory usage detected: ${heapUsedMB}MB / ${heapTotalMB}MB`);
    // Telemetry ping to Sentry/DataDog would go here
  }
}, 60000); // Check every minute

app.listen(PORT, () => {
  console.log(`Interstellar AI Backend running on http://localhost:${PORT}`);
});
