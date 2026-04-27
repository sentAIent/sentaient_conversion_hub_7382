from PIL import Image
import sys
import os

def crop_bottom(image_path, output_path=None, crop_percent=0.15):
    try:
        if not output_path:
            output_path = image_path

        img = Image.open(image_path)
        width, height = img.size
        
        # Calculate new height (removing bottom 15%)
        new_height = int(height * (1 - crop_percent))
        
        # Crop: (left, top, right, bottom)
        cropped_img = img.crop((0, 0, width, new_height))
        
        # Save
        cropped_img.save(output_path, "PNG")
        print(f"Successfully cropped {image_path}. New size: {width}x{new_height}")
        
    except Exception as e:
        print(f"Error cropping {image_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python crop_cursor.py <image_path>")
        sys.exit(1)
        
    image_file = sys.argv[1]
    if not os.path.exists(image_file):
        print(f"File not found: {image_file}")
        sys.exit(1)
        
    crop_bottom(image_file)
