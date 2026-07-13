import json

with open('/Users/ute/.gemini/antigravity/brain/7e3c9dc7-680f-46b9-a3b1-cc84f97ac5a0/.system_generated/logs/transcript.jsonl', 'r') as f:
    for i, line in enumerate(f):
        try:
            data = json.loads(line.strip())
            if data.get('type') == 'USER_INPUT' and data.get('source') == 'USER_EXPLICIT':
                content = data.get('content', '')
                if '<USER_REQUEST>' in content and '</USER_REQUEST>' in content:
                    req = content.split('<USER_REQUEST>')[1].split('</USER_REQUEST>')[0].strip()
                    print(f"--- Step {data.get('step_index')} ---")
                    print(req)
        except json.JSONDecodeError:
            pass
