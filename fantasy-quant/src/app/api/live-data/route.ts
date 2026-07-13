import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

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
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {}
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const playerIds: string[] = body.playerIds || []
  let provider = body.provider || 'sleeper'

  // Fetch user settings to see if they overrode the provider
  const { data: settings } = await supabase
    .from('user_settings')
    .select('live_data_provider, api_sports_key, sportsdataio_key')
    .eq('id', user.id)
    .single()

  if (settings && settings.live_data_provider) {
    provider = settings.live_data_provider
  }

  const liveStats: Record<string, { pts: number, source: string }> = {}

  try {
    switch (provider) {
      case 'sleeper':
        // Sleeper API (Free, no key required)
        // In offseason, we will just mock points for demonstration
        playerIds.forEach(id => {
          liveStats[id] = { pts: parseFloat((Math.random() * 20).toFixed(1)), source: 'SLP' }
        });
        break;

      case 'api-sports':
        if (!settings?.api_sports_key) {
           return NextResponse.json({ error: 'Missing API-Sports Key' }, { status: 400 })
        }
        // Would fetch from api-football/NFL endpoint here
        playerIds.forEach(id => {
          liveStats[id] = { pts: parseFloat((Math.random() * 20).toFixed(1)), source: 'API-S' }
        });
        break;

      case 'sportsdataio':
        if (!settings?.sportsdataio_key) {
           return NextResponse.json({ error: 'Missing SportsDataIO Key' }, { status: 400 })
        }
        // Would fetch from sportsdata.io here
        playerIds.forEach(id => {
          liveStats[id] = { pts: parseFloat((Math.random() * 20).toFixed(1)), source: 'SDIO' }
        });
        break;

      case 'nfl-scraper':
        // Custom Scraper using Cheerio (e.g. ESPN gamecasts)
        // For demonstration, we'll try to fetch a public page just to use cheerio
        const response = await fetch('https://www.nfl.com/scores')
        const html = await response.text()
        const $ = cheerio.load(html)
        // const games = $('.score').text() // Example logic
        playerIds.forEach(id => {
          liveStats[id] = { pts: parseFloat((Math.random() * 20).toFixed(1)), source: 'NFL.com' }
        });
        break;

      default:
        playerIds.forEach(id => {
          liveStats[id] = { pts: 0, source: 'UNK' }
        });
    }

    return NextResponse.json({ data: liveStats })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
