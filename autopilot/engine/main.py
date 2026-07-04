from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from pipeline import produce_campaign_asset

app = FastAPI(title="SentAIent Video Engine")

class CampaignRequest(BaseModel):
    script: str
    visual_direction: str
    campaign_id: str
    campaign_type: str = "short_form_video"
    visual_style: str = "ai_image"
    audio_beats: str = "none"
    audio_atmos: str = "none"
    audio_music: str = "none"
    audio_voiceover: bool = True

@app.post("/produce")
def produce_video(req: CampaignRequest):
    try:
        # Generate video using our pipeline
        output_filename = f"video_{req.campaign_id}.mp4"
        assets = produce_campaign_asset(
            script=req.script, 
            visual_direction=req.visual_direction,
            campaign_type=req.campaign_type,
            visual_style=req.visual_style,
            audio_beats=req.audio_beats,
            audio_atmos=req.audio_atmos,
            audio_music=req.audio_music,
            audio_voiceover=req.audio_voiceover,
            output_filename=output_filename
        )
        # Save to metadata store
        import metadata_store
        metadata_store.add_video(
            video_id=req.campaign_id,
            filename=output_filename,
            visual_style=req.visual_style,
            audio_beats=req.audio_beats,
            audio_atmos=req.audio_atmos,
            audio_music=req.audio_music
        )
        
        # Return the URLs of the generated assets
        return {
            "success": True, 
            "assets": assets,
            "message": "Assets generated successfully"
        }
    except Exception as e:
        print(f"Error producing video: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/library")
def get_library():
    import metadata_store
    return metadata_store.get_all_videos()

class UpdateVideoRequest(BaseModel):
    views: int = None
    engagement_score: float = None
    notes: str = None
    status: str = None

@app.patch("/library/{video_id}")
def update_library_video(video_id: str, updates: UpdateVideoRequest):
    import metadata_store
    update_data = {k: v for k, v in updates.model_dump().items() if v is not None}
    updated = metadata_store.update_video(video_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Video not found")
    return updated

@app.delete("/library/{video_id}")
def delete_library_video(video_id: str):
    import metadata_store
    import os
    
    # First get filename to delete physical file
    data = metadata_store.get_all_videos()
    if video_id in data:
        filename = data[video_id].get("filename")
        if filename:
            file_path = os.path.join(os.path.dirname(__file__), "..", "public", "videos", filename)
            if os.path.exists(file_path):
                os.remove(file_path)
                
    success = metadata_store.delete_video(video_id)
    if not success:
        raise HTTPException(status_code=404, detail="Video not found")
    return {"success": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
