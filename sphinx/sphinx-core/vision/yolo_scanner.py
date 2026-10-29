import cv2
import time
import requests
import json

def run_vision_scanner():
    print("[Sphinx Vision] Initializing YOLOv10 on local camera feed...")
    # Placeholder for ultralytics YOLO model loading:
    # from ultralytics import YOLO
    # model = YOLO("yolov10n.pt")
    
    # Placeholder for cv2 VideoCapture(0)
    print("[Sphinx Vision] Camera active. Scanning for threats (weapons, aggressive postures)...")
    
    try:
        while True:
            time.sleep(10) # process frames periodically
            
            # Simulated detection event
            detected_objects = ["person", "knife"]
            print(f"[Sphinx Vision] Detected: {detected_objects}")
            
            if "knife" in detected_objects or "gun" in detected_objects:
                payload = {
                    "source": "Local Camera",
                    "objects": detected_objects,
                    "confidence": 0.92,
                    "timestamp": time.time()
                }
                try:
                    requests.post("http://localhost:3117/api/vision/detect", json=payload)
                except Exception as e:
                    print(f"[Error] Could not reach Sphinx Core: {e}")
                    
    except KeyboardInterrupt:
        print("\n[Sphinx Vision] Scanner offline.")

if __name__ == "__main__":
    run_vision_scanner()
