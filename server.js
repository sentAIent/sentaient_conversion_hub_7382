import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Strict Content Security Policy (CSP) and Security Headers via Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://*.posthog.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "http://localhost:*", "ws://localhost:*", "https://*.supabase.co", "wss://*.supabase.co", "https://*.google-analytics.com", "https://*.analytics.google.com", "https://*.googletagmanager.com", "https://*.posthog.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      fontSrc: ["'self'", "data:", "https:"],
      frameAncestors: ["'none'"]
    },
  },
}));

app.use(cors({
  origin: ['https://sentaient.com', 'http://localhost:3000']
}));
app.use(express.json());

// 2. Rate Limiting for AI Inference Endpoints
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests to AI endpoints, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all API routes (or specifically the AI ones)
app.use('/api', aiLimiter);

// 1. Mock Generative UI / Agentic Frontends Endpoint
app.post('/api/generative-ui', (req, res) => {
  const { query } = req.body;
  console.log(`[Generative UI] Received query: ${query}`);
  // Mock response that the frontend will interpret to render a component
  res.json({
    type: 'dashboard',
    data: {
      charts: [
        { title: 'User Engagement', value: 85, trend: '+5%' },
        { title: 'Agent Efficiency', value: 92, trend: '+12%' }
      ]
    }
  });
});

// 2. Mock Voicebox Interop Endpoint
app.post('/api/voice', (req, res) => {
  // In a real scenario, this would proxy audio streams to the local voicebox server
  console.log('[Voicebox] Received audio stream chunk');
  res.json({ status: 'speaking', text: 'I am processing your voice input now.' });
});

// 3. Mock RAG & Knowledge Graph (Understand-Anything) Endpoint
app.post('/api/knowledge-graph', (req, res) => {
  const { node } = req.body;
  console.log(`[Knowledge Graph] Querying node: ${node}`);
  res.json({
    node: node || 'root',
    citations: [
      { source: 'LegalEagle.jsx', snippet: 'Compliance logic initialized.', confidence: 0.95 },
      { source: 'WorldAutopilot.jsx', snippet: 'Autopilot HUD active.', confidence: 0.88 }
    ]
  });
});

// 4. Mock MCP Router Endpoint
app.post('/api/mcp', (req, res) => {
  const { tool, params } = req.body;
  console.log(`[MCP Router] Executing tool: ${tool} with params:`, params);
  res.json({ status: 'success', result: `Mock execution of ${tool} complete.` });
});

// 5. Always-On / Internal Development Feeds
app.get('/api/internal-feeds', (req, res) => {
  res.json({
    releaseRadar: [
      { package: 'three', oldVersion: '0.150.0', newVersion: '0.160.0', risk: 'high', type: 'breaking' },
      { package: 'react-three-fiber', oldVersion: '8.15.0', newVersion: '8.17.10', risk: 'low', type: 'minor' }
    ],
    hnBriefing: [
      { title: 'New Multi-Agent Framework Released', upvotes: 450 },
      { title: 'DeepSeek R1 Open Sourced', upvotes: 1200 }
    ],
    skillOptimization: {
      currentConfidence: 94.5,
      scopeCreepAlerts: 0,
      recentCommitsAnalyzed: 12
    }
  });
});

// 6. OOM Prevention & Process Telemetry (Task 30)
setInterval(() => {
  const memory = process.memoryUsage();
  console.log(`[Telemetry] RSS: ${(memory.rss / 1024 / 1024).toFixed(2)} MB | HeapTotal: ${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB | HeapUsed: ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`);
}, 60000);

app.listen(PORT, () => {
  console.log(`[SentAIent Backend] Server running on http://localhost:${PORT}`);
});
