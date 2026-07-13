import sys
import subprocess

try:
    import cv2
    import numpy as np
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "opencv-python-headless", "numpy"])
    import cv2
    import numpy as np

def process():
    in_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
    out_path = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v6.png"
    
    img = cv2.imread(in_path, cv2.IMREAD_UNCHANGED)
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
        
    h, w = img.shape[:2]
    mask = np.zeros((h+2, w+2), np.uint8)
    
    # Floodfill from top-left
    loDiff = (20, 20, 20, 20)
    upDiff = (20, 20, 20, 20)
    
    cv2.floodFill(img, mask, (0,0), (0,0,0,0), loDiff, upDiff, cv2.FLOODFILL_FIXED_RANGE)
    # Floodfill from top-right
    cv2.floodFill(img, mask, (w-1,0), (0,0,0,0), loDiff, upDiff, cv2.FLOODFILL_FIXED_RANGE)
    # Floodfill from bottom-left
    cv2.floodFill(img, mask, (0,h-1), (0,0,0,0), loDiff, upDiff, cv2.FLOODFILL_FIXED_RANGE)
    # Floodfill from bottom-right
    cv2.floodFill(img, mask, (w-1,h-1), (0,0,0,0), loDiff, upDiff, cv2.FLOODFILL_FIXED_RANGE)

    # Convert all exactly 0,0,0,0 pixels to transparent
    img[mask[1:-1, 1:-1] == 1] = [0, 0, 0, 0]
    
    cv2.imwrite(out_path, img)

process()
