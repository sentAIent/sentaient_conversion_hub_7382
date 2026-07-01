import json
with open("/Users/ute/.gemini/antigravity/brain/8d8befa4-97c2-4911-ae35-ef3ba46c3d20/.system_generated/logs/transcript.jsonl", "r") as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "USER_INPUT":
            print("--- " + str(data.get("step_index")) + " ---")
            print(data.get("content"))
