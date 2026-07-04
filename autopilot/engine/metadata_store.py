import json
import os
from datetime import datetime

METADATA_FILE = os.path.join(os.path.dirname(__file__), "library_metadata.json")

def load_metadata():
    if not os.path.exists(METADATA_FILE):
        return {}
    try:
        with open(METADATA_FILE, "r") as f:
            return json.load(f)
    except:
        return {}

def save_metadata(data):
    with open(METADATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

def add_video(video_id, filename, visual_style, audio_beats, audio_atmos, audio_music):
    data = load_metadata()
    data[video_id] = {
        "id": video_id,
        "filename": filename,
        "visual_style": visual_style,
        "audio_beats": audio_beats,
        "audio_atmos": audio_atmos,
        "audio_music": audio_music,
        "created_at": datetime.now().isoformat(),
        "views": 0,
        "engagement_score": 0.0,
        "notes": "",
        "status": "draft" # draft, published, archived
    }
    save_metadata(data)
    return data[video_id]

def get_all_videos():
    return load_metadata()

def update_video(video_id, updates):
    data = load_metadata()
    if video_id in data:
        data[video_id].update(updates)
        save_metadata(data)
        return data[video_id]
    return None

def delete_video(video_id):
    data = load_metadata()
    if video_id in data:
        del data[video_id]
        save_metadata(data)
        return True
    return False
