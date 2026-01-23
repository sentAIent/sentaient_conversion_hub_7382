import base64
try:
    with open('source_logo.png', 'rb') as f:
        data = f.read()
    b64 = base64.b64encode(data).decode()
    with open('logo_b64.txt', 'w') as f:
        f.write(b64)
    print(f"Success: Wrote {len(b64)} chars")
except Exception as e:
    print(f"Error: {e}")
