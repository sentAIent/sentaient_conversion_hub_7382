import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const DB_SCHEMA = `
Table: players
- id (UUID)
- name (TEXT)
- position (TEXT)
- team (TEXT)

Table: games
- id (UUID)
- season (INT)
- week (INT)
- home_team (TEXT)
- away_team (TEXT)

Table: player_weekly_stats
- id (UUID)
- player_id (UUID)
- game_id (UUID)
- season (INT)
- week (INT)
- ppr_pts (NUMERIC)
- half_ppr_pts (NUMERIC)
- standard_pts (NUMERIC)
- pass_yds (INT), pass_tds (INT), rush_yds (INT), rush_tds (INT), receptions (INT), rec_yds (INT), rec_tds (INT)

Table: player_projections
- player_id (UUID)
- projected_pts (NUMERIC)

Table: player_opportunities_challenges
- player_id (UUID)
- season (INT), week (INT)
- schedule_strength_score (NUMERIC)
`;

export async function POST(req: NextRequest) {
  try {
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
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('subscription_tier')
      .eq('id', session.user.id)
      .single();

    const tier = userData?.subscription_tier?.toLowerCase() || 'free';
    if (tier === 'free') {
      return NextResponse.json({ 
        role: 'assistant', 
        content: 'This advanced data assistant feature requires a Pro or Max subscription. Please upgrade your account to query deep analytics.'
      });
    }

    const body = await req.json();
    const messages = body.messages || [];
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();

    if (!lastUserMessage) {
      return NextResponse.json({ error: 'No query provided' }, { status: 400 });
    }

    const classificationPrompt = `You are an intent classifier for Fantasy Quant.
    Classify the user's query into one of two categories:
    1. "DATABASE" - The query is about player stats, fantasy points, roster locations, or projections.
    2. "SEARCH" - The query is about unstructured news, injuries, coaching changes, play-callers, or recent events.
    
    User Query: ${lastUserMessage.content}
    
    Return ONLY the word DATABASE or SEARCH.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const classificationResult = await model.generateContent(classificationPrompt);
    const intent = classificationResult.response.text().trim();

    let finalAnswer = "";
    let sqlData = null;

    if (intent === "DATABASE") {
      const sqlPrompt = `You are a Fantasy Football Data Engineer. 
      Return ONLY a raw SQL query enclosed in \`\`\`sql blocks that fetches the data necessary to answer the user's question. 
      
      Database Schema:
      ${DB_SCHEMA}
      
      User Query: ${lastUserMessage.content}`;

      const sqlResult = await model.generateContent(sqlPrompt);
      const sqlText = sqlResult.response.text();
      const sqlMatch = sqlText.match(/```sql\n([\s\S]*?)\n```/);

      if (sqlMatch && sqlMatch[1]) {
        const sqlQuery = sqlMatch[1];
        const { data, error } = await supabase.rpc('exec_sql_readonly', { query_text: sqlQuery });

        if (error) {
          finalAnswer = "I tried to query the database, but encountered an error.";
        } else {
          sqlData = data;
          const fs = require('fs');
          const path = require('path');
          let auditContext = "Audit Data: Unknown";
          try {
            const auditPath = path.join(process.cwd(), 'public', 'audit_log.json');
            if (fs.existsSync(auditPath)) {
              const auditData = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
              if (auditData.status !== "PASS") {
                auditContext = `WARNING: The underlying data recently FAILED an audit with these warnings: ${auditData.warnings.join(', ')}. Proactively inform the user about this in your response so they don't blindly trust the numbers.`;
              } else {
                auditContext = `Data Audit Status: PASSED (Last checked: ${auditData.timestamp})`;
              }
            }
          } catch (e) {
            console.error("Failed to read audit log in API route");
          }

          const synthesisPrompt = `You are a Fantasy Football Analyst.
          Answer the user's question using ONLY the provided database results.
          If the data is empty, state that the information could not be found.
          
          IMPORTANT: You must maintain the highest professional standards. When evaluating user decisions or rosters, explicitly acknowledge optimal choices (e.g., 'No changes, this pick is perfect') rather than skipping them.
          
          ${auditContext}
          
          User Query: ${lastUserMessage.content}
          Database Results: ${JSON.stringify(sqlData, null, 2)}`;
          
          const synthesisResult = await model.generateContent(synthesisPrompt);
          finalAnswer = synthesisResult.response.text();
        }
      } else {
        finalAnswer = "I couldn't generate a valid database query for that request.";
      }
    } else {
      // SEARCH Mode using Google Search Grounding (Requires Gemini 1.5 Pro with tools)
      // Since GoogleSearch tool is experimental in some SDK versions, we simulate it via a strict grounding prompt.
      // Alternatively, we use the GoogleSearch tool object if available.
      const searchModel = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-pro',
        // Fallback if googleSearch is natively supported by their SDK version
        tools: [{ googleSearch: {} } as any] 
      });

      const searchPrompt = `You are a Fantasy Football Analyst. 
      The user is asking about unstructured news, injuries, or coaching changes.
      Answer the question accurately. You MUST ground your answer in 2026 reality.
      
      User Query: ${lastUserMessage.content}`;

      try {
        const searchResult = await searchModel.generateContent(searchPrompt);
        finalAnswer = searchResult.response.text();
      } catch (e) {
        // Fallback without tools if googleSearch fails
        const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
        const fallbackResult = await fallbackModel.generateContent(searchPrompt);
        finalAnswer = fallbackResult.response.text();
      }
    }

    return NextResponse.json({
      role: 'assistant',
      content: finalAnswer,
      data: sqlData
    });

  } catch (error: any) {
    console.error('Assistant API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
