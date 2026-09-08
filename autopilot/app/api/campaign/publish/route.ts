import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { campaign_id, script, caption, visual_direction, brand, type, scheduleMode, scheduleDelay, customScheduleTime, platformAccounts } = payload;

    if (!campaign_id) {
      return NextResponse.json({ success: false, message: "Missing campaign_id" }, { status: 400 });
    }

    let scheduledDate = new Date();
    
    if (scheduleMode === 'custom' && customScheduleTime) {
      // Use the explicitly provided datetime string
      scheduledDate = new Date(customScheduleTime);
    } else {
      // Use the scheduleDelay (in minutes) or default to 120 minutes (2 hours)
      const delayMinutes = typeof scheduleDelay === 'number' ? scheduleDelay : 120;
      scheduledDate.setMinutes(scheduledDate.getMinutes() + delayMinutes);
    }

    const postPayload = {
      campaign_id,
      brand: brand || "sentaient",
      content_type: type || "short_form_video",
      text: caption,
      script: script,
      visual_direction: visual_direction,
      platformAccounts: platformAccounts || { 'Instagram': ['@CloveH2O_Main'] },
      video_url: payload.video_url || "/mock.mp4",
      media_url: payload.video_url || "https://mock-s3-bucket.sentaient.com/video/" + campaign_id + ".mp4", // Legacy
      scheduled_time: scheduledDate.toISOString(),
      status: "pending",
      created_at: new Date().toISOString()
    };

    console.log(`[Publish API] Preparing to write to Orchestrator: queue/${campaign_id}`);
    
    try {
      const orchestratorUrl = process.env.ORCHESTRATOR_URL || "http://127.0.0.1:8080";
      const orchestratorResponse = await fetch(`${orchestratorUrl}/queue/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload)
      });
      
      if (!orchestratorResponse.ok) {
        throw new Error("Orchestrator failed to save queue item");
      }
      
      console.log(`[Publish API] Successfully wrote to Orchestrator.`);
    } catch (apiError: any) {
      console.warn("[Publish API] Orchestrator write failed", apiError);
      return NextResponse.json({ success: false, message: "Failed to persist to orchestrator" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Successfully pushed to publishing queue.",
      data: postPayload
    });

  } catch (error: any) {
    console.error("Error publishing campaign:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
