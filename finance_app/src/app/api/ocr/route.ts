import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('receipt') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Simulate OCR processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock OCR extraction result
    const mockExtractedData = {
      merchantName: 'AWS Hosting',
      totalAmount: 120.00,
      date: new Date().toISOString(),
      confidence: 0.95,
      // In a real app, we'd extract line items, taxes, etc.
    };

    return NextResponse.json({ success: true, data: mockExtractedData });
  } catch (error) {
    console.error('Error in OCR API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
