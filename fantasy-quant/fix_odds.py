import re

with open('src/app/odds/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("betType: 'game_prop', market: 'spread'", "betType: 'game_spread', market: 'spread'")
content = content.replace("betType: 'game_prop', market: 'moneyline'", "betType: 'game_moneyline', market: 'moneyline'")
content = re.sub(
    r"onClick=\{\(\) => openBetSlip\(\{\s*market: 'total',\s*targetName: `\$\{game\.away\} @ \$\{game\.home\}`,\s*selection: 'OVER',\s*line: game\.total,\s*odds: -110\s*\}\)\}",
    "onClick={() => openBetSlip({ targetId: game.id, betType: 'game_total', market: 'total', targetName: `${game.away} @ ${game.home}`, selection: 'OVER', line: game.total, odds: -110 })}",
    content
)
content = re.sub(
    r"onClick=\{\(\) => openBetSlip\(\{\s*market: 'total',\s*targetName: `\$\{game\.away\} @ \$\{game\.home\}`,\s*selection: 'UNDER',\s*line: game\.total,\s*odds: -110\s*\}\)\}",
    "onClick={() => openBetSlip({ targetId: game.id, betType: 'game_total', market: 'total', targetName: `${game.away} @ ${game.home}`, selection: 'UNDER', line: game.total, odds: -110 })}",
    content
)

with open('src/app/odds/page.tsx', 'w') as f:
    f.write(content)
