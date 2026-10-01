import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check Premium Status
    const { data: profile } = await supabase
      .from('users')
      .select('tier')
      .eq('id', user.id)
      .single();

    if (!profile || profile.tier === 'free') {
      return NextResponse.json({ error: 'AI Parsing requires a Premium subscription.' }, { status: 403 });
    }

    const { rawText, platform } = await request.json();

    if (!rawText) {
      return NextResponse.json({ error: 'Raw text is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Mock for development if no key
      return NextResponse.json({
        data: {
          draft_id: "mock_uuid",
          picks: [
            { manager_name: "Manager 1", raw_player_name: "Christian McCaffrey", pick_round: 1, pick_number: 1 },
            { manager_name: "Manager 2", raw_player_name: "Ceedee Lamb", pick_round: 1, pick_number: 2 }
          ]
        }
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
    You are a fantasy football draft parser. I will provide you with raw text copy-pasted from a fantasy football draft board (platform: ${platform || 'unknown'}). 
    Parse this text and extract all draft picks.
    
    Return a JSON object with this exact structure:
    {
      "picks": [
        { "manager_name": "string", "raw_player_name": "string", "pick_round": number, "pick_number": number }
      ]
    }
    
    Here is the raw text:
    ${rawText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response if it's wrapped in markdown
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    const parsedJson = jsonMatch ? JSON.parse(jsonMatch[1]) : JSON.parse(text);

    return NextResponse.json({ data: parsedJson });
  } catch (error: any) {
    console.error('Error parsing draft:', error);
    return NextResponse.json({ error: error.message || 'Failed to parse draft' }, { status: 500 });
  }
}
