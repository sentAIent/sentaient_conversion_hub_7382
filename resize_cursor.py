from PIL import Image
import base64
import os
import io

input_path = 'public/mindwave-logo.png'
output_path = 'public/cursor_b64.txt'

try:
    # Open and resize
    with Image.open(input_path) as img:
        img = img.resize((32, 32), Image.Resampling.LANCZOS)
        
        # Save to bytes
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        img.save('public/mindwave-cursor.png') # verification
        
        # Encode
        b64_str = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        # Write
        with open(output_path, 'w') as f:
            f.write(b64_str)
            
    print(f"Success. 32x32 base64 written to {output_path}")

except Exception as e:
    print(f"Error: {e}")
