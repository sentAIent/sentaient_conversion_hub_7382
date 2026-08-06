import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // We use gemini-1.5-flash which is fast and supports vision
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze this receipt and extract the following information in JSON format:
    {
      "merchant_name": "Name of the store or merchant",
      "date": "YYYY-MM-DD format",
      "amount": number (total amount),
      "currency": "Currency code like USD, EUR, etc.",
      "category": "One of: Meals, Travel, Software, Office Supplies, Advertising, Other",
      "confidence": number between 0 and 1
    }
    Only output the raw JSON object, nothing else. No markdown blocks.
    `;

    const imageParts = [
      {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType: file.type
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting if the model didn't listen
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('OCR Error:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
