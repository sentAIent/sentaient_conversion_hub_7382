import base64
import os
import sys

# Absolute paths
cwd = os.getcwd()
input_path = os.path.join(cwd, 'public', 'mindwave-logo.png')
output_path = os.path.join(cwd, 'logo_dump.txt')

print(f"Reading from: {input_path}")
print(f"Writing to: {output_path}")

try:
    if not os.path.exists(input_path):
        print("Input file does not exist!")
        # Create a dummy file to prove write works
        with open(output_path, 'w') as f:
            f.write("ERROR: Input file missing")
    else:
        with open(input_path, 'rb') as f:
            img_data = f.read()
            b64_str = base64.b64encode(img_data).decode('utf-8')
            
            with open(output_path, 'w') as out:
                out.write(b64_str)
                
        print(f"Success! Wrote {len(b64_str)} bytes.")
except Exception as e:
    print(f"Exception: {e}")
    with open(output_path, 'w') as f:
        f.write(f"ERROR: {e}")
