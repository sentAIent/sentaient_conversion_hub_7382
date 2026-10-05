import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Redis } from "https://esm.sh/@upstash/redis"
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts"

const payloadSchema = z.object({
  model: z.string().min(1, 'Model is required'),
  prompt: z.string().min(1, 'Prompt is required')
});
// Setup Upstash Redis for Rate Limiting (Item 4)
const redis = new Redis({
  url: Deno.env.get('UPSTASH_REDIS_REST_URL') || '',
  token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN') || '',
})

const allowedOrigins = [
  'http://localhost:5173',
  'capacitor://localhost',
  'http://localhost',
  'https://app.sentaient.com'
]

const corsHeaders = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  const origin = req.headers.get('Origin') || ''
  const isAllowedOrigin = allowedOrigins.includes(origin) || origin.endsWith('.netlify.app')
  
  const headers = {
    ...corsHeaders,
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0]
  }

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers })
    }

    // Rate Limiting (Item 4) & Spend Cap (Item 24)
    // 1. IP-based Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous'
    const limitKey = `rate_limit:${ip}`
    const requests = await redis.incr(limitKey)
    if (requests === 1) {
      await redis.expire(limitKey, 60) // 60 seconds
    }
    if (requests > 20) { // Limit to 20 requests per minute
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429, headers })
    }

    // 2. Global Daily Spend Cap / Request Limit
    const today = new Date().toISOString().split('T')[0]
    const globalLimitKey = `global_limit:${today}`
    const globalRequests = await redis.incr(globalLimitKey)
    if (globalRequests === 1) {
      await redis.expire(globalLimitKey, 86400) // 24 hours
    }
    // Hard cap of 1000 requests per day across all users
    const MAX_DAILY_REQUESTS = parseInt(Deno.env.get('MAX_DAILY_LLM_REQUESTS') || '1000', 10)
    if (globalRequests > MAX_DAILY_REQUESTS) {
      return new Response(JSON.stringify({ error: 'Daily API spend cap reached. Please try again tomorrow.' }), { status: 429, headers })
    }

    const body = await req.json()
    const parsed = payloadSchema.safeParse(body)
    
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid payload', details: parsed.error.format() }), { status: 400, headers })
    }

    const { model, prompt } = parsed.data

    // Item 18: PII Redaction Pipeline (DLP)
    // Redact emails and basic SSN/Phone patterns before sending to LLM
    const redactedPrompt = prompt
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
      .replace(/\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g, '[REDACTED_ID]')
      .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[REDACTED_PHONE]')

    // Item 1: Proxy API Keys securely from backend environment
    let apiUrl = ''
    let apiKey = ''

    if (model.includes('gemini')) {
      apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
      apiKey = Deno.env.get('GEMINI_API_KEY') || ''
    } else if (model.includes('claude')) {
      apiUrl = 'https://api.anthropic.com/v1/messages'
      apiKey = Deno.env.get('ANTHROPIC_API_KEY') || ''
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported model' }), { status: 400, headers })
    }

    const apiResponse = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(model.includes('claude') && { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' })
      },
      body: JSON.stringify(model.includes('gemini') 
        ? { 
            contents: [{ parts: [{ text: redactedPrompt }] }],
            // Item 16: Content Moderation API - strict Gemini Safety Settings
            safetySettings: [
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_LOW_AND_ABOVE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_LOW_AND_ABOVE' }
            ]
          }
        : { model, messages: [{ role: 'user', content: redactedPrompt }], max_tokens: 1024 }
      )
    })

    const data = await apiResponse.json()
    return new Response(JSON.stringify(data), {
      headers: { ...headers, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers })
  }
})
