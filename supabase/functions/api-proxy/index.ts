import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Simple in-memory store for rate limiting (for demonstration/PoC). 
// In production, use Redis or Supabase DB for distributed rate limiting.
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 requests per minute per IP/User

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized', details: authError?.message }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Rate Limiting
    const userId = user.id;
    const now = Date.now();
    let limitData = rateLimitMap.get(userId);

    if (!limitData || limitData.resetTime < now) {
      limitData = { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
    } else {
      limitData.count++;
    }
    
    rateLimitMap.set(userId, limitData);

    if (limitData.count > MAX_REQUESTS_PER_WINDOW) {
      return new Response(JSON.stringify({ error: 'Too Many Requests', retryAfter: (limitData.resetTime - now) / 1000 }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Parse requested API target and payload
    const body = await req.json()
    const { targetUrl, method, payload } = body

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: 'Missing targetUrl in request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // WARNING: In a real environment, you MUST sanitize and validate the targetUrl 
    // to prevent SSRF (Server-Side Request Forgery) attacks. 
    // e.g. Ensure it matches an allowed list of external APIs (OpenAI, Stripe, etc.)

    // Call the external API, injecting server-side secrets as needed
    const externalResponse = await fetch(targetUrl, {
      method: method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Inject secret API key from edge function environment
        'Authorization': `Bearer ${Deno.env.get('EXTERNAL_API_SECRET_KEY')}` 
      },
      body: payload ? JSON.stringify(payload) : undefined
    })

    const externalData = await externalResponse.json()

    return new Response(JSON.stringify(externalData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: externalResponse.status
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    })
  }
})
