import { NextResponse } from 'next/server';
import { sendForSignature } from '@/lib/documenso';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const signers = formData.getAll('signers') as string[];

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!signers || signers.length === 0) {
      return NextResponse.json({ error: 'No signers provided' }, { status: 400 });
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');

    const result = await sendForSignature(base64, file.name, signers);

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error('[Documenso API] Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send for signature' }, { status: 500 });
  }
}
