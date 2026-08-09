import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing campaign id' }, { status: 400 });
    }

    const orchestratorUrl = process.env.ORCHESTRATOR_URL || "http://localhost:8080";
    const response = await fetch(`${orchestratorUrl}/queue/retry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    
    if (!response.ok) {
      throw new Error("Failed to retry campaign in orchestrator");
    }
    
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error retrying campaign:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
