import os
import cv2
import numpy as np
import requests
from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import supervision as sv
from ultralytics import YOLO

app = FastAPI(title="Matrix Vision Microservice")

# Load YOLO model
model = YOLO('yolov8n.pt')

# Mattermost Webhook URL (Replace with actual Mattermost incoming webhook)
MATTERMOST_WEBHOOK_URL = os.environ.get("MATTERMOST_WEBHOOK_URL", "http://localhost:8065/hooks/mock-webhook-id")

def send_mattermost_alert(message: str, detection_count: int):
    """Sends a notification to a Mattermost channel via webhook."""
    payload = {
        "text": f"🚨 **Security Alert**: {message}\n- **Detected Objects**: {detection_count}",
        "username": "Matrix Vision Bot",
        "icon_url": "https://cdn-icons-png.flaticon.com/512/2103/2103132.png"
    }
    try:
        requests.post(MATTERMOST_WEBHOOK_URL, json=payload)
    except Exception as e:
        print(f"Failed to send Mattermost webhook: {e}")

@app.post("/analyze-frame")
async def analyze_frame(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """
    Analyzes a single frame/image for anomalies.
    Used for IoT camera integration or heavy server-side processing fallback.
    """
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if image is None:
        return JSONResponse(status_code=400, content={"error": "Invalid image"})

    # Perform inference
    results = model(image)[0]
    
    # Wrap results in Roboflow Supervision's Detections API
    detections = sv.Detections.from_ultralytics(results)
    
    # Example Logic: Detect "person" (class_id 0 in COCO)
    person_detections = detections[detections.class_id == 0]
    person_count = len(person_detections)

    # If anomaly detected (e.g., people in frame), trigger Mattermost alert
    if person_count > 0:
        background_tasks.add_task(
            send_mattermost_alert, 
            "Unauthorized presence detected in secure zone.", 
            person_count
        )

    return {
        "status": "success",
        "total_detections": len(detections),
        "person_count": person_count,
        "classes": detections.class_id.tolist(),
        "confidence": detections.confidence.tolist()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
