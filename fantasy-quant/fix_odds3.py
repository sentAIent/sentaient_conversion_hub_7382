import re

with open('src/app/odds/page.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r"onClick=\{\(\) => openBetSlip\(\{\s*market: prop\.market,\s*targetName: prop\.player,\s*selection: 'OVER',\s*line: prop\.over,\s*odds: prop\.overOdds\s*\}\)\}",
    "onClick={() => openBetSlip({ targetId: prop.id, betType: 'player_prop', market: prop.market, targetName: prop.player, selection: 'OVER', line: prop.over, odds: prop.overOdds })}",
    content
)

content = re.sub(
    r"onClick=\{\(\) => openBetSlip\(\{\s*market: prop\.market,\s*targetName: prop\.player,\s*selection: 'UNDER',\s*line: prop\.under,\s*odds: prop\.underOdds\s*\}\)\}",
    "onClick={() => openBetSlip({ targetId: prop.id, betType: 'player_prop', market: prop.market, targetName: prop.player, selection: 'UNDER', line: prop.under, odds: prop.underOdds })}",
    content
)

with open('src/app/odds/page.tsx', 'w') as f:
    f.write(content)
