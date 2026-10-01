import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const systemPrompt = `You are J.A.R.V.I.S., a Quant-as-a-Service AI Assistant for Fantasy NFL.
You have read-only access to a Supabase database containing actual stats.
Here is the database schema:
- "players" (id, name, position, team)
- "player_dfs_salaries" (player_id, salary, projected_pts, projected_ownership, week, season, platform)
- "player_advanced_stats" (player_id, snap_pct, target_share, wopr, adot, racr, week, season)
- "player_vegas_props" (player_id, prop_type, line, over_odds, under_odds, week, season)
- "coaches" (id, name, role, team, offensive_style, defensive_style)
- "player_combine_stats" (player_id, forty_yard, vertical_jump, broad_jump, three_cone, bench_press)
- "offensive_tendencies" (team, season, week, run_percent, pass_percent, pace_seconds_per_play, neutral_pass_rate, shotgun_percent, wr1_target_share, wr2_target_share, wr3_target_share, wr4_target_share, rb1_target_share, rb2_target_share, te1_target_share)
- "player_usage_splits" (player_id, season, week, slot_rate, wide_rate, inline_rate, backfield_rate, target_share, air_yards_share, first_read_share)
- "historical_stats" (player_id, level_of_play, season, team_name, pass_yards, pass_tds, rush_yards, rush_tds, rec_yards, rec_tds)

Relationships:
- "players" has a 1-to-many relationship with "player_dfs_salaries" (fk: player_id)
- "players" has a 1-to-many relationship with "player_advanced_stats" (fk: player_id)
- "players" has a 1-to-many relationship with "player_vegas_props" (fk: player_id)
- "players" has a 1-to-1 relationship with "player_combine_stats" (fk: player_id)
- "players" has a 1-to-many relationship with "player_usage_splits" (fk: player_id)
- "players" has a 1-to-many relationship with "historical_stats" (fk: player_id)

You must translate the user's natural language request into a structured Supabase query JSON object.
Your response MUST be a JSON object with this exact structure:
{
  "explanation": "Brief explanation of what data you are fetching",
  "query": {
    "table": "players" | "coaches" | "player_dfs_salaries" | "player_advanced_stats" | "player_vegas_props" | "player_combine_stats" | "offensive_tendencies" | "player_usage_splits" | "historical_stats",
    "select": "comma-separated columns to select (e.g. 'name, position, team, player_dfs_salaries(salary, projected_pts)')",
    "filters": [
      { "column": "column_name", "operator": "eq" | "neq" | "gt" | "lt" | "in", "value": any_value }
    ],
    "limit": number_limit,
    "order": { "column": "column_name", "ascending": true | false }
  },
  "conversationalResponse": "Optional greeting or direct response if no query is needed"
}

Output ONLY the raw JSON object. Do not include markdown formatting or backticks around the JSON.`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response if AI is not configured
      return NextResponse.json({
        success: true,
        text: "Hello! I am J.A.R.V.I.S., your Quant-as-a-Service AI Assistant. I can help automate lineup optimization and scan coaching systems. To enable full AI intelligence, please set your GEMINI_API_KEY environment variable.",
        tool: null,
        widget: null
      });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Pass 1: Parse user query into a Supabase Query config
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
    const aiText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const cleanJson = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let queryConfig: any = {};
    try {
      queryConfig = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Failed to parse Gemini JSON output:", aiText);
      queryConfig = { conversationalResponse: aiText };
    }

    let dbData: any[] | null = null;
    let dbError: any = null;

    // Execute safe dynamic query if AI determined it is needed
    if (queryConfig.query) {
      try {
        let q: any = supabase.from(queryConfig.query.table).select(queryConfig.query.select);
        if (queryConfig.query.filters) {
          for (const f of queryConfig.query.filters) {
            if (f.operator === 'eq') q = q.eq(f.column, f.value);
            else if (f.operator === 'neq') q = q.neq(f.column, f.value);
            else if (f.operator === 'gt') q = q.gt(f.column, f.value);
            else if (f.operator === 'lt') q = q.lt(f.column, f.value);
            else if (f.operator === 'in') q = q.in(f.column, f.value);
          }
        }
        if (queryConfig.query.order) {
          q = q.order(queryConfig.query.order.column, { ascending: queryConfig.query.order.ascending });
        }
        if (queryConfig.query.limit) {
          q = q.limit(queryConfig.query.limit);
        }
        const { data, error } = await q;
        dbData = data;
        dbError = error;
      } catch (err: any) {
        dbError = err;
      }
    }

    let finalResponse = queryConfig.conversationalResponse || "Here is the data I found in the database:";

    // Pass 2: Summarize retrieved data if query succeeded
    if (dbData && dbData.length > 0) {
      const summaryPrompt = `You are J.A.R.V.I.S., a Quant-as-a-Service AI Assistant for Fantasy NFL.
Here is the data retrieved from the database for the user request: "${message}":
${JSON.stringify(dbData, null, 2)}

Provide a professional, concise summary of this data for the user, highlighting key insights for their fantasy lineup decision.
IMPORTANT: You must maintain the highest professional standards. When evaluating decisions, explicitly acknowledge optimal choices (e.g., 'No changes, this pick is perfect') rather than skipping them.
CRITICAL RULE: When answering open-ended questions or offering advice, you must probe the user for their underlying priorities (e.g., risk tolerance, lineup quality, current record) if not provided. Furthermore, your analysis must be balanced to cater to various situations. You must explicitly delineate these perspectives in your response (e.g., "If your objective is a safe floor..." vs. "If your objective is pure upside...").`;

      try {
        const summaryRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: summaryPrompt }] }]
          })
        });
        if (summaryRes.ok) {
          const summaryJson = await summaryRes.json();
          finalResponse = summaryJson.candidates?.[0]?.content?.parts?.[0]?.text || finalResponse;
        }
      } catch (summaryErr) {
        console.error("Gemini summary generation failed:", summaryErr);
      }
    } else if (dbError) {
      finalResponse = `I encountered an error querying the database: ${dbError.message || dbError}`;
    } else if (queryConfig.query && (!dbData || dbData.length === 0)) {
      finalResponse = "I queried the database, but no matching player records or stats were found. Please check your data ingestion pipeline.";
    }

    return NextResponse.json({
      success: true,
      text: finalResponse,
      tool: queryConfig.query ? `fetch_${queryConfig.query.table}` : null,
      widget: dbData ? { type: queryConfig.query.table, data: dbData } : null
    });
  } catch (err: any) {
    console.error("J.A.R.V.I.S. Chat endpoint failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
