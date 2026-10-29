import json

file_content = ""

with open('/Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/.system_generated/logs/transcript_full.jsonl') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'PLANNER_RESPONSE':
            for call in data.get('tool_calls', []):
                args = call.get('args', {})
                name = call.get('name', '')
                if name == 'write_to_file' and 'SphinxMap.tsx' in args.get('TargetFile', ''):
                    file_content = args.get('CodeContent', '')
                elif name == 'replace_file_content' and 'SphinxMap.tsx' in args.get('TargetFile', ''):
                    target = args.get('TargetContent', '')
                    replacement = args.get('ReplacementContent', '')
                    allow_multi = args.get('AllowMultiple', False)
                    start_line = args.get('StartLine', 1)
                    end_line = args.get('EndLine', len(file_content.split('\n')))
                    
                    lines = file_content.split('\n')
                    # search space
                    search_space = '\n'.join(lines[start_line-1:end_line])
                    
                    if target in search_space:
                        if allow_multi:
                            new_space = search_space.replace(target, replacement)
                        else:
                            new_space = search_space.replace(target, replacement, 1)
                        
                        # reconstruct
                        prefix = '\n'.join(lines[:start_line-1])
                        suffix = '\n'.join(lines[end_line:])
                        
                        # need to be careful with newlines when joining
                        new_content = []
                        if prefix: new_content.append(prefix)
                        new_content.append(new_space)
                        if suffix: new_content.append(suffix)
                        file_content = '\n'.join(new_content)
                    else:
                        print(f"Failed to find target at step {data.get('step_index')}")

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx', 'w') as f:
    f.write(file_content)

print(f"Reconstructed file with {len(file_content.split('\n'))} lines.")
