import re

with open('src/app/odds/page.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r"onClick=\{\(\) => openBetSlip\(\{\s*market: 'superbowl_winner',\s*targetName: future\.team,\s*selection: future\.team,\s*line: null,\s*odds: future\.odds\s*\}\)\}",
    "onClick={() => openBetSlip({ targetId: 'f_'+future.team.replace(' ', ''), betType: 'future', market: 'superbowl_winner', targetName: future.team, selection: future.team, line: null, odds: future.odds })}",
    content
)

with open('src/app/odds/page.tsx', 'w') as f:
    f.write(content)
