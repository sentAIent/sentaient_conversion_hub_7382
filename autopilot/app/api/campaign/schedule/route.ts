import { NextResponse } from 'next/server';
import { db } from '@/config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orchestratorUrl = process.env.ORCHESTRATOR_URL || "http://localhost:8080";
    
    // Construct the payload for the Redis queue
    const scheduleDelay = body.scheduleDelay || 0;
    const postData = {
      campaign_id: body.campaign_id || Date.now().toString(),
      brand: body.brand || "sentaient",
      script: body.script,
      caption: body.caption || "",
      video_url: body.video_url || "/mock.mp4",
      status: scheduleDelay === 0 ? "approved_for_publishing" : "scheduled",
      scheduled_time: body.scheduleMode === 'custom' 
        ? new Date(body.customScheduleTime).toISOString() 
        : new Date(Date.now() + scheduleDelay * 60000).toISOString(),
      platformAccounts: body.platformAccounts || {},
      created_at: new Date().toISOString()
    };
    
    // Push to the Orchestrator's Queue
    const res = await fetch(`${orchestratorUrl}/queue/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });

    if (!res.ok) {
        throw new Error("Failed to add to Orchestrator queue");
    }

    return NextResponse.json({
      success: true,
      message: "Campaign scheduled successfully in Orchestrator!"
    });

  } catch (error: any) {
    console.error("Schedule Video Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
