import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { draftId, picks } = await request.json();

    if (!picks || !Array.isArray(picks)) {
      return NextResponse.json({ error: 'Invalid draft picks data' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        data: {
          manager_name: "Demo Manager",
          tendency_summary: "This manager typically targets running backs early and waits on quarterbacks.",
          positional_bias: { RB: "heavy", WR: "moderate", QB: "light", TE: "light" }
        }
      });
    }

    // We can group picks by manager and send them to the LLM to get a tendency analysis
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
    You are a fantasy football draft analyst. Analyze the following draft picks made by managers.
    For each manager, identify their drafting tendencies (e.g., positional biases, reaching for players, zero-RB strategies).
    
    Return a JSON array where each object has:
    - "manager_name": string
    - "tendency_summary": a 2-3 sentence qualitative summary of their draft style.
    - "positional_bias": A JSON object mapping positions (QB, RB, WR, TE) to their bias level ("heavy", "moderate", "light", "avoid").

    IMPORTANT: You must maintain the highest professional standards. When evaluating decisions, explicitly acknowledge optimal choices (e.g., 'No changes, this pick is perfect') rather than skipping them.

    Here are the picks:
    ${JSON.stringify(picks, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    const parsedJson = jsonMatch ? JSON.parse(jsonMatch[1]) : JSON.parse(text);

    // If draftId is provided, save to DB
    if (draftId) {
       for (const analysis of parsedJson) {
           await supabase.from('draft_tendencies').insert({
               draft_id: draftId,
               manager_name: analysis.manager_name,
               tendency_summary: analysis.tendency_summary,
               positional_bias: analysis.positional_bias
           });
       }
    }

    return NextResponse.json({ data: parsedJson });
  } catch (error: any) {
    console.error('Error analyzing tendencies:', error);
    return NextResponse.json({ error: error.message || 'Failed to analyze tendencies' }, { status: 500 });
  }
}
