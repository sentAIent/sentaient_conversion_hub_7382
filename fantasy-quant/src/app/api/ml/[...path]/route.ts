import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// In a real app, this would be a singleton pattern or lazy loaded 
// to prevent loading the model multiple times.
let pipeline: any = null;

// Use docker-compose service name if running in docker, otherwise localhost
const ML_ENGINE_URL = process.env.ML_ENGINE_URL || 'http://localhost:8000'
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path: pathArray } = await params;
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
          },
        },
      }
    )
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check user tier
    const { data: userRow } = await supabase
      .from('users')
      .select('subscription_tier')
      .eq('id', session.user.id)
      .single()

    const tier = userRow?.subscription_tier?.toLowerCase() || 'free'
    if (tier === 'free') {
      return NextResponse.json({ error: 'Deep Learning features require a Premium (Pro/Max) subscription.' }, { status: 403 })
    }

    const path = pathArray.join('/')
    const body = await req.json()
    
    // Check which engine the client wants to use (default to option 1)
    const engineType = req.headers.get('x-ml-engine') || 'transformers-js' // 'transformers-js', 'fastapi', 'hf-api'

    // Option 1: Transformers.js (Local Node.js execution)
    if (engineType === 'transformers-js') {
      if (path === 'sentiment') {
         if (!pipeline) {
             const transformers = await import('@xenova/transformers')
             // Use a tiny sentiment model for speed
             pipeline = await transformers.pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english')
         }
         
         const text = body.text || ""
         const result = await pipeline(text)
         
         if (result && result.length > 0) {
            return NextResponse.json({ label: result[0].label.toLowerCase(), score: result[0].score })
         }
         return NextResponse.json({ label: 'neutral', score: 0.5 })
      } 
      else if (path === 'project') {
         // Transformers.js doesn't have great time-series models yet, so we use a statistical heuristic here
         // and rely on FastAPI for real deep learning.
         const pts = body.historical_points || []
         if (pts.length === 0) return NextResponse.json({ projected_points: 0.0, confidence: 0.0 })
         const avg = pts.reduce((a: number,b: number) => a+b, 0) / pts.length
         return NextResponse.json({ projected_points: avg * 1.05, confidence: 0.75 })
      }
    }
    // Option 2: Local Python FastAPI Microservice (Docker)
    else if (engineType === 'fastapi') {
      const response = await fetch(`${ML_ENGINE_URL}/api/ml/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        return NextResponse.json({ error: `ML Engine returned status ${response.status}` }, { status: response.status })
      }

      const data = await response.json()
      return NextResponse.json(data)
    }
    // Option 3: Hugging Face Serverless Inference API
    else if (engineType === 'hf-api') {
      if (!HUGGING_FACE_API_KEY) {
        return NextResponse.json({ error: 'HUGGING_FACE_API_KEY is not configured.' }, { status: 500 })
      }
      
      let hfUrl = ""
      if (path === 'sentiment') hfUrl = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
      // HF API doesn't support custom time-series easily without deploying a custom endpoint, so we fallback
      else return NextResponse.json({ error: 'Endpoint not supported via HF Serverless API' }, { status: 400 })

      const response = await fetch(hfUrl, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ inputs: body.text }),
      })

      if (!response.ok) {
        return NextResponse.json({ error: `HF API returned status ${response.status}` }, { status: response.status })
      }

      const data = await response.json()
      // HF API often returns an array of arrays [[{label, score}, ...]]
      if (Array.isArray(data) && Array.isArray(data[0]) && data[0].length > 0) {
          // Find the highest score
          const top = data[0].sort((a: any, b: any) => b.score - a.score)[0]
          return NextResponse.json({ label: top.label, score: top.score })
      }
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'Invalid engine type specified.' }, { status: 400 })

  } catch (error: any) {
    console.error('ML API Proxy Error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to ML Engine', details: error.message },
      { status: 500 }
    )
  }
}
