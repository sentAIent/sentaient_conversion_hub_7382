import os
import glob
import json

brain_dir = "/Users/infinitealpha/.gemini/antigravity/brain"
log_files = glob.glob(os.path.join(brain_dir, "*/.system_generated/logs/overview.txt"))

print(f"Found {len(log_files)} log files. Searching for user demands...")

for path in log_files:
    conv_id = path.split('/')[-4]
    try:
        with open(path, 'r', errors='ignore') as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    data = json.loads(line)
                    # Check if it's a user message
                    if data.get('source') == 'USER' or 'USER_REQUEST' in str(data):
                        # print the user text
                        content = data.get('content', '')
                        if not content and 'args' in data:
                            content = str(data['args'])
                        
                        # Look for keywords like "cymatics", "chladni", "sand", "friday", "sidebar", "perfect"
                        keywords = ["cymatics", "chladni", "sand", "friday", "sidebar", "perfect", "teh", "chindli"]
                        if any(kw in content.lower() for kw in keywords):
                            print(f"\n[{conv_id}] USER: {content.strip()}")
                except Exception as e:
                    pass
    except Exception as e:
        print(f"Error reading {path}: {e}")
