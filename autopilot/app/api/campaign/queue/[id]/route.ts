import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const orchestratorUrl = process.env.ORCHESTRATOR_URL || "http://localhost:8080";
    const response = await fetch(`${orchestratorUrl}/queue/${params.id}`, { cache: 'no-store' });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ success: false, message: "Queue item not found" }, { status: 404 });
      }
      throw new Error(`Orchestrator returned ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json({ success: true, item: data });
  } catch (error: any) {
    console.error("Error fetching queue item:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const payload = await req.json();
    const orchestratorUrl = process.env.ORCHESTRATOR_URL || "http://localhost:8080";
    
    // If user selected "Post Now" (scheduleDelay === 0), approve it for immediate publishing
    if (payload.scheduleDelay === 0) {
      payload.status = 'approved_for_publishing';
    } else {
      payload.status = 'scheduled';
      payload.scheduled_time = payload.scheduleMode === 'custom' 
        ? new Date(payload.customScheduleTime).toISOString() 
        : new Date(Date.now() + (payload.scheduleDelay || 0) * 60000).toISOString();
    }

    const response = await fetch(`${orchestratorUrl}/queue/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Orchestrator returned ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json({ success: true, item: data.item });
  } catch (error: any) {
    console.error("Error updating queue item:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
