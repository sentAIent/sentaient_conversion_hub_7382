import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, systemPrompt, isJson, customModel } = await req.json()
    
    // 1. Verify Authentication
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Unauthorized')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    // 2. Call Gemini
    const geminiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiKey) {
        throw new Error('Gemini API key is not configured on the server')
    }

    const model = customModel || 'gemini-2.5-pro'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`

    const combinedPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt

    const requestBody: any = {
      contents: [{
        parts: [{ text: combinedPrompt }]
      }],
      generationConfig: {
          temperature: 0.2
      }
    }

    if (isJson) {
        requestBody.generationConfig.responseMimeType = "application/json"
    }

    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    if (!geminiResponse.ok) {
        const errText = await geminiResponse.text()
        console.error('Gemini error:', errText)
        throw new Error(`Gemini API error: ${geminiResponse.statusText}`)
    }

    const data = await geminiResponse.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return new Response(
      JSON.stringify({ text, sources: [] }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 400,
    })
  }
})
