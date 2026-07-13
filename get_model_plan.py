import json

with open('/Users/ute/.gemini/antigravity/brain/7e3c9dc7-680f-46b9-a3b1-cc84f97ac5a0/.system_generated/logs/transcript.jsonl', 'r') as f:
    last_model_msg = ""
    for line in f:
        try:
            data = json.loads(line.strip())
            if data.get('type') == 'PLANNER_RESPONSE' or data.get('source') == 'MODEL':
                content = data.get('content', '')
                if content:
                    last_model_msg = content
            elif data.get('step_index') == 4221:
                print(last_model_msg)
                break
        except json.JSONDecodeError:
            pass
