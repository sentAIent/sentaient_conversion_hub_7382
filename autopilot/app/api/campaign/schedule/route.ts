import { NextResponse } from 'next/server';
import { db } from '@/config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Save the metadata and the public video URL to Firestore scheduled_posts
    const postData = {
      brandId: body.brand || "sentaient",
      campaignId: body.campaign_id,
      script: body.script,
      caption: body.caption || "",
      videoUrl: body.video_url || "/mock.mp4",
      status: "scheduled",
      scheduledFor: body.scheduleMode === 'custom' 
        ? new Date(body.customScheduleTime).toISOString() 
        : new Date(Date.now() + (body.scheduleDelay || 120) * 60000).toISOString(),
      platformAccounts: body.platformAccounts || {},
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "scheduled_posts"), postData);

    return NextResponse.json({
      success: true,
      message: "Campaign scheduled successfully!",
      firestoreId: docRef.id
    });

  } catch (error: any) {
    console.error("Schedule Video Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
