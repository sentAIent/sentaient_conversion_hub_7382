import re

def fix_duplicates(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The floating panels that break getElementById for the right sidebar:
    content = content.replace('id="cymaticsPanel"', 'id="cymaticsFloatingPanel"', 1)
    content = content.replace("document.getElementById('cymaticsPanel').classList.add('hidden')", "document.getElementById('cymaticsFloatingPanel').classList.add('hidden')", 1)
    
    content = content.replace('id="snowflakeSettingsPanel"', 'id="snowflakeFloatingSettingsPanel"', 1)
    
    # Also stat duplicates:
    content = content.replace('id="statAvgSession"', 'id="statAvgSessionMobile"', 1)
    content = content.replace('id="statStreak"', 'id="statStreakMobile"', 1)
    content = content.replace('id="statTopPreset"', 'id="statTopPresetMobile"', 1)
    content = content.replace('id="weeklyChart"', 'id="weeklyChartMobile"', 1)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Removed duplicate IDs.")

fix_duplicates('mindwave-friday.html')
