import { NextResponse } from 'next/server';
import { db } from '@/config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Send the data to our Python ML Engine
    const pythonEngineUrl = "http://localhost:8000/produce";
    
    console.log("Triggering Python ML Engine...");
    const pythonResponse = await fetch(pythonEngineUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        script: body.script,
        visual_direction: body.visual_direction,
        visual_style: body.visual_style || body.visualStyle || 'ai_image',
        campaign_type: body.campaign_type || body.campaignType || 'short_form_video',
        audio_beats: body.audio_beats || 'none',
        audio_atmos: body.audio_atmos || 'none',
        audio_music: body.audio_music || 'none',
        audio_voiceover: body.audio_voiceover !== undefined ? body.audio_voiceover : true,
        campaign_id: body.campaign_id || `camp_${Date.now()}`
      }),
    });

    if (!pythonResponse.ok) {
      const errText = await pythonResponse.text();
      throw new Error(`Python Engine failed: ${errText}`);
    }

    const pythonData = await pythonResponse.json();
    
    return NextResponse.json({
      success: true,
      message: "Assets compiled successfully!",
      assets: pythonData.assets,
      // Fallback for older UI code
      videoUrl: pythonData.assets?.final_video
    });

  } catch (error: any) {
    console.error("Produce Video Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
