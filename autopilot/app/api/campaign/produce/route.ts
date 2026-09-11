import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Call the Video Farm to generate B-roll
    const videoFarmUrl = "http://autopilot_video_farm:8006/generate/video";
    
    console.log("Triggering Video Farm for B-Roll...");
    const videoFarmResponse = await fetch(videoFarmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: body.visual_direction || "Cinematic marketing b-roll",
        model: "open-sora", // Defaulting to open-sora for testing
        duration_seconds: 5,
        resolution: "1080x1920"
      }),
    });

    if (!videoFarmResponse.ok) {
      const errText = await videoFarmResponse.text();
      throw new Error(`Video Farm failed: ${errText}`);
    }

    const videoFarmData = await videoFarmResponse.json();
    const rawBrollUrl = videoFarmData.video_url;

    // 2. Call the Remotion Engine to compile the video
    const remotionEngineUrl = "http://autopilot_remotion_engine:8007/render";
    
    console.log("Triggering Remotion Engine for compilation...");
    const remotionResponse = await fetch(remotionEngineUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clips: [rawBrollUrl],
        captions: [body.script || ""],
        audio_url: null, // TTS can be injected here later
        brand_color: "#60a9ff"
      }),
    });

    if (!remotionResponse.ok) {
      const errText = await remotionResponse.text();
      throw new Error(`Remotion Engine failed: ${errText}`);
    }

    const remotionData = await remotionResponse.json();

    return NextResponse.json({
      success: true,
      message: "Assets compiled successfully via Remotion & Video Farm!",
      assets: {
        final_video: remotionData.url,
        broll_clips: [rawBrollUrl]
      },
      videoUrl: remotionData.url
    });

  } catch (error: any) {
    console.error("Produce Video Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
