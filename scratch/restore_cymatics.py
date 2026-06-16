import re

with open('mindwave-CYMATICS-RESTORED-GOLD.html', 'r') as f:
    gold_content = f.read()

with open('mindwave.html', 'r') as f:
    target_content = f.read()

# Extract cymatics block from GOLD
gold_start_marker = "<!-- TAB: CYMATICS (ACTIVE BY DEFAULT) -->"
gold_end_marker = "<!-- TAB: VISUALS -->"

gold_start_idx = gold_content.find(gold_start_marker)
gold_end_idx = gold_content.find(gold_end_marker)

if gold_start_idx != -1 and gold_end_idx != -1:
    cymatics_block = gold_content[gold_start_idx + len(gold_start_marker):gold_end_idx].strip()
    
    # In the target file, TAB: CYMATICS is between 1664 and 2790 (TAB: STUDIO)
    target_start_marker = "<!-- TAB: CYMATICS -->"
    target_end_marker = "<!-- TAB: STUDIO -->"
    
    target_start_idx = target_content.find(target_start_marker)
    target_end_idx = target_content.find(target_end_marker)
    
    if target_start_idx != -1 and target_end_idx != -1:
        # Wrap the gold cymatics block in `<div id="tab-cymatics" class="tab-panel hidden space-y-8">`
        # Wait, does the gold cymatics block already have a wrapper?
        # Let's just output it and see.
        
        # Actually, in mindwave.html, the tab-panel has an ID.
        # The GOLD file didn't use `id="tab-cymatics"` for the main panel, it used `id="cymaticsPanel"`.
        # But `mindwave.html`'s tabs rely on `id="tab-cymatics"`.
        new_cymatics_html = f"""<!-- TAB: CYMATICS -->
            <div id="tab-cymatics" class="tab-panel hidden space-y-8">
{cymatics_block}
            </div>
            
            """
        
        final_content = target_content[:target_start_idx] + new_cymatics_html + target_content[target_end_idx:]
        
        with open('mindwave.html', 'w') as f:
            f.write(final_content)
        print("Restored cymatics tab successfully.")
    else:
        print("Target markers not found.")
else:
    print("Gold markers not found.")

