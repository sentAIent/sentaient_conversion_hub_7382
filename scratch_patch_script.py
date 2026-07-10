import re
import os

SCRIPT_PATH = 'public/interstellar-game/script.js'

def main():
    with open(SCRIPT_PATH, 'r', encoding='utf-8') as f:
        text = f.read()
        
    # 1. Add import statement to the top
    import_statement = "import { equipmentDB, baseModules, mineralTypes, galaxyZones, hangarShips } from './js/core/constants.js';\n"
    if "from './js/core/constants.js'" not in text:
        # insert after import * as Utils
        utils_import = "import * as Utils from './utils.js';"
        text = text.replace(utils_import, utils_import + "\n" + import_statement)
        
    # 2. Add 'this' mappings where we extracted them
    # I'll just replace the comments left by the previous script
    mappings = {
        r'// \[EXTRACTED to constants\.js\]': [
            "this.equipmentDB = equipmentDB;",
            "this.baseModules = baseModules;",
            "this.mineralTypes = mineralTypes;",
            "this.galaxyZones = galaxyZones;",
            "this.hangarShips = hangarShips;"
        ]
    }
    
    # We extracted 5 times, so there are 5 comments. We only need to insert the assignments once, and remove the other 4 comments.
    count = 0
    def repl(match):
        nonlocal count
        count += 1
        if count == 1:
            return "\n        ".join(mappings[r'// \[EXTRACTED to constants\.js\]'])
        else:
            return ""
            
    text = re.sub(r'// \[EXTRACTED to constants\.js\]', repl, text)
    
    with open(SCRIPT_PATH, 'w', encoding='utf-8') as f:
        f.write(text)
        
    print(f"Patched script.js with imports and {count} assignments.")

if __name__ == '__main__':
    main()
