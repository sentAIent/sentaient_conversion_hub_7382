import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contentType = request.headers.get('content-type') || ''
    let records: any[] = []

    if (contentType.includes('application/json')) {
      const body = await request.json()
      records = Array.isArray(body) ? body : [body]
    } else if (contentType.includes('text/csv')) {
      const text = await request.text()
      const lines = text.split('\n').filter(l => l.trim().length > 0)
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim())
          const record: any = {}
          headers.forEach((h, idx) => {
            record[h] = values[idx]
          })
          records.push(record)
        }
      }
    } else {
      return NextResponse.json({ error: 'Unsupported Content-Type. Use application/json or text/csv' }, { status: 400 })
    }

    if (records.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 400 })
    }

    // Records should map to { player_id, source_id, slate_id, projected_pts }
    const upserts = records.map(r => ({
      player_id: r.player_id,
      source_id: r.source_id,
      slate_id: r.slate_id || null,
      projected_pts: parseFloat(r.projected_pts)
    })).filter(r => r.player_id && r.source_id && !isNaN(r.projected_pts))

    if (upserts.length === 0) {
      return NextResponse.json({ error: 'Invalid data format. Ensure player_id, source_id, and projected_pts are provided.' }, { status: 400 })
    }

    const { error } = await supabase
      .from('player_projections')
      .upsert(upserts, { onConflict: 'player_id, source_id, slate_id' })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, count: upserts.length })

  } catch (err: any) {
    console.error("Ingestion Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
