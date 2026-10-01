import json
import re

with open('/Users/ute/.gemini/antigravity/brain/c537b53d-0120-4c75-b74c-06f69078f03b/.system_generated/steps/17724/content.md', 'r') as f:
    content = f.read()

# Extract the JSON block
match = re.search(r'window\.FP\.reportConfig\s*=\s*(\{.*?\});', content, re.DOTALL)
if match:
    data = json.loads(match.group(1))
    rows = data['table']['rows']
    
    def_ranks = {'QB': {}, 'RB': {}, 'WR': {}, 'TE': {}}
    for row in rows:
        team_abbr = row['team']['id']
        def_ranks['QB'][team_abbr] = row['qb_rk']
        def_ranks['RB'][team_abbr] = row['rb_rk']
        def_ranks['WR'][team_abbr] = row['wr_rk']
        def_ranks['TE'][team_abbr] = row['te_rk']

    print(f"Parsed {len(def_ranks['QB'])} teams from FantasyPros.")
    
    with open('scratch/fp_ranks.json', 'w') as f:
        json.dump(def_ranks, f)
else:
    print("Could not find JSON data.")
