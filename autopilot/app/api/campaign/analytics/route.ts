import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const orchestratorUrl = process.env.ORCHESTRATOR_URL || "http://localhost:8080";
    const response = await fetch(`${orchestratorUrl}/analytics`, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error("Failed to fetch analytics from orchestrator");
    }
    
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ success: false, data: null, message: error.message }, { status: 500 });
  }
}
