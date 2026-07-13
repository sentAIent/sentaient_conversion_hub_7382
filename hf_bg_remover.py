import sys
import subprocess

try:
    from transformers import pipeline
    from PIL import Image
    import torch
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "transformers", "torch", "torchvision", "pillow"])
    from transformers import pipeline
    from PIL import Image

def process():
    in_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
    out_path = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v8.png"
    
    # Initialize pipeline
    pipe = pipeline("image-segmentation", model="briaai/RMBG-1.4", trust_remote_code=True)
    
    img = Image.open(in_path)
    pillow_mask = pipe(img, return_mask=True)
    
    # put alpha
    img = img.convert("RGBA")
    img.putalpha(pillow_mask)
    
    img.save(out_path)
    print("Done!")

process()
