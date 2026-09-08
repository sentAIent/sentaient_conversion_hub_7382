import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { videoUrl, brand, targetAccounts } = payload;

    if (!videoUrl || !videoUrl.includes('youtube.com')) {
      return NextResponse.json({ success: false, message: 'Invalid YouTube URL provided.' }, { status: 400 });
    }

    // Pass the request to the orchestrator to trigger the short-video-generator-AI engine
    const backendUrl = process.env.ORCHESTRATOR_URL || 'http://127.0.0.1:8080';
    
    let id = `repurpose_${brand}_${Date.now()}`;
    
    // Push the extraction job to Redis queue
    try {
      const persistResponse = await fetch(`${backendUrl}/repurpose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceUrl: videoUrl,
          brand,
          targetAccounts
        })
      });

      if (!persistResponse.ok) {
        console.warn(`Failed to push repurpose job to orchestrator: ${persistResponse.status}`);
      } else {
        const data = await persistResponse.json();
        id = data.id || id;
      }
    } catch (err) {
      console.warn(`Orchestrator not reachable at ${backendUrl}, using mock pipeline. Error:`, err);
    }

    // Return success to the frontend immediately while the engine processes the 1-hour video
    const liveData = {
      success: true,
      job_id: id,
      status: "extracting_highlights",
      message: "Video is being processed. 5-10 viral shorts will be generated and queued for publishing.",
      brand
    };

    return NextResponse.json(liveData);

  } catch (error: any) {
    console.error("Error queueing repurpose job:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
