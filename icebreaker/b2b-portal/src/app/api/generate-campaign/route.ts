import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key missing');
      return NextResponse.json({ error: 'OpenAI API key missing' }, { status: 500 });
    }

    const systemPrompt = `You are an expert Gen-Z marketing copywriter specializing in FOMO-driven, viral B2B campaigns for physical venues. 
Given a short prompt or idea, generate a catchy, viral campaign title and a compelling description. 
Return ONLY a JSON object with this structure:
{
  "title": "string",
  "description": "string"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt || 'Make up a cool campaign for our new venue' }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI API Error:', errText);
      return NextResponse.json({ error: 'Failed to generate campaign' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error in /api/generate-campaign:', error);
    return NextResponse.json({ error: (error as Error).message || 'Internal server error' }, { status: 500 });
  }
}
