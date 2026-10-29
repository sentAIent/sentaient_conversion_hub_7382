import json

with open("/Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/.system_generated/logs/transcript_full.jsonl", "r") as f:
    lines = f.readlines()

latest_full = ""
for line in lines:
    try:
        data = json.loads(line)
        if "tool_calls" in data:
            for call in data["tool_calls"]:
                if call["name"] == "run_command":
                    cmd = call["args"].get("CommandLine", "")
                    if "cat << 'EOF' > src/components/SphinxMap.tsx" in cmd or "cat << 'EOF' > /Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx" in cmd:
                        parts = cmd.split("EOF'")
                        if len(parts) > 1:
                            content = cmd.split("EOF'")[1].split("EOF")[0].strip()
                            if content.startswith("> src/components/SphinxMap.tsx\\n"):
                                content = content[31:]
                            if len(content) > len(latest_full) and len(content) > 1000:
                                latest_full = content
                                print(f"Found version with {len(content)} chars")
    except Exception as e:
        pass

with open("recovered_map.txt", "w") as f:
    f.write(latest_full.replace("\\n", "\n"))

print(f"Recovered to recovered_map.txt, size: {len(latest_full)}")
