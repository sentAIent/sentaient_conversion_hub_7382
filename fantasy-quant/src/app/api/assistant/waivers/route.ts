import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { message, leagueId, platform = 'sleeper' } = await request.json();
    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: false,
        error: "GEMINI_API_KEY is not set."
      }, { status: 500 });
    }

    // Connect to Supabase
    const supabaseService = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch some top available players (for simplicity, we grab the top 20 by projected_pts)
    // In a real scenario, we'd filter out players already rostered in 'leagueId'
    const { data: availablePlayers, error } = await supabaseService
      .from('player_dfs_salaries')
      .select('*, players(name, position, team)')
      .order('projected_pts', { ascending: false })
      .limit(20);

    const dataContext = JSON.stringify(availablePlayers || [], null, 2);

    const systemPrompt = `You are J.A.R.V.I.S., a Quant-as-a-Service AI Assistant specialized in Fantasy Football Waiver Wire pickups.
Here are the top available players in the database right now (based on projections and value):
${dataContext}

Respond to the user's waiver wire question.
IMPORTANT: You must maintain the highest professional standards.
CRITICAL RULE: When answering open-ended questions or offering advice, you must probe the user for their underlying priorities (e.g., risk tolerance, lineup quality, current record) if not provided. Furthermore, your analysis must be balanced to cater to various situations. You must explicitly delineate these perspectives in your response (e.g., "If your objective is a safe floor..." vs. "If your objective is pure upside...").`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Request: ${message}` }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const resJson = await response.json();
    const aiText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    return NextResponse.json({
      success: true,
      text: aiText
    });
  } catch (err: any) {
    console.error("Waiver Assistant endpoint failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
