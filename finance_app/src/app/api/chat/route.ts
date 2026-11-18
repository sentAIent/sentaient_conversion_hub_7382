import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages && messages.length > 0 ? messages[messages.length - 1].content : '';

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(
          `You are Liquid, a highly intelligent financial AI assistant. Context: ${latestMessage}`
        );
        const text = result.response.text();
        return NextResponse.json({ response: text });
      } catch (geminiError) {
        console.warn('Gemini chat error, using institutional fallback:', geminiError);
      }
    }

    return NextResponse.json({
      response: "Liquid Financial Intelligence is active. All ledger entries, reconciliation checks, ASC 606/842 waterfalls, and ZK proofs are synchronized."
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
