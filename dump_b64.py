import base64
import os

input_path = 'public/mindwave-logo.png'
output_path = 'public/b64_output.txt'

try:
    with open(input_path, 'rb') as f:
        img_data = f.read()
        b64_str = base64.b64encode(img_data).decode('utf-8')
        
        with open(output_path, 'w') as out:
            out.write(b64_str)
            
    print(f"Successfully wrote {len(b64_str)} chars to {output_path}")
except Exception as e:
    print(f"Error: {e}")
