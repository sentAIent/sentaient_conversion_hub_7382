#!/usr/bin/env python3
import os
import sys
import time
import requests

# Try to import required ML libraries
try:
    import cv2
    from ultralytics import YOLO
    HAS_ML_LIBS = True
except ImportError:
    HAS_ML_LIBS = False
    print("[Sphinx Vision] WARNING: ultralytics or cv2 not installed. Running in mock/simulation mode.")
    print("To run properly: pip install ultralytics opencv-python")

SPHINX_CORE_URL = os.environ.get("SPHINX_CORE_URL", "http://localhost:3117")

def main():
    print("[Sphinx Vision] Booting YOLO Threat Detection Pipeline...")
    
    if not HAS_ML_LIBS:
        # Simulation mode for testing endpoints
        print("[Sphinx Vision] Waiting for simulated threat...")
        time.sleep(10)
        print("[Sphinx Vision] Simulated threat detected!")
        payload = {
            "objects": ["person", "vehicle", "firearm"],
            "confidence": 0.89
        }
        try:
            requests.post(f"{SPHINX_CORE_URL}/api/vision/detect", json=payload)
        except Exception as e:
            print(f"[Sphinx Vision] Failed to report threat: {e}")
        return

    # Real implementation
    model = YOLO("yolov8n.pt")  # Load lightweight YOLOv8
    rtsp_url = os.environ.get("RTSP_URL", "0") # Default to webcam
    
    print(f"[Sphinx Vision] Connecting to stream: {rtsp_url}")
    cap = cv2.VideoCapture(rtsp_url if rtsp_url != "0" else int(rtsp_url))

    if not cap.isOpened():
        print("[Sphinx Vision] Failed to open stream.")
        sys.exit(1)

    cooldown = 0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("[Sphinx Vision] Stream ended or dropped.")
            break
            
        # Run inference
        results = model(frame, stream=True, conf=0.5, verbose=False)
        detected_threats = []
        
        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                cls_name = model.names[cls_id]
                conf = float(box.conf[0])
                
                # Filter for threat-like objects (COCO dataset)
                # 0: person, 2: car, 3: motorcycle, 5: bus, 7: truck
                if cls_id in [0, 2, 3, 5, 7]:
                    detected_threats.append(cls_name)
                    
        if detected_threats and time.time() > cooldown:
            print(f"[Sphinx Vision] Threat detected: {detected_threats}")
            try:
                requests.post(f"{SPHINX_CORE_URL}/api/vision/detect", json={
                    "objects": detected_threats,
                    "confidence": 0.85 # Simplified for demo
                })
                cooldown = time.time() + 10 # 10s cooldown between alerts
            except Exception as e:
                pass

        time.sleep(0.1) # Max 10fps processing
        
    cap.release()

if __name__ == "__main__":
    main()
