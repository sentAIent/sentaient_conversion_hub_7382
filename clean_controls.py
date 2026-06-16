import re

with open('binaural-assets/js/ui/controls_v3.js', 'r') as f:
    content = f.read()

# Remove the import for inject_ui.js
content = re.sub(r'import { injectCymaticsUI } from \'./inject_ui\.js\';\n?', '', content)

# Remove the injectCymaticsUI() call
content = re.sub(r'\s*injectCymaticsUI\(\);\n?', '\n', content)

# Remove toggleCymaticsSettings function entirely
content = re.sub(r'\s*toggleCymaticsSettings: function\(btn\) \{[^\}]+\},', '', content, flags=re.DOTALL)

# Remove window.toggleCymaticsSettings assignment
content = re.sub(r'window\.toggleCymaticsSettings = window\.controls\.toggleCymaticsSettings;\n?', '', content)

# Remove snowflakeBtn mode: 'cymatics' switch to visual
content = re.sub(r'if \(els\.snowflakeBtn\) els\.snowflakeBtn\.addEventListener\(\'click\', \(\) => setVisualMode\(\'cymatics\', null, true\)\);\n?', '', content)

# Remove the UI mappings that set mode: 'cymatics'
content = re.sub(r'\{ id: \'cymaticsBtn\', mode: \'cymatics\' \},?\n?', '', content)
content = re.sub(r'\{ el: els\.snowflakeBtn, mode: \'cymatics\' \},?\s*//.*?\n', '', content)

# Remove Cymatics / Galaxy / Matrix Controls section where they get element by id
cym_els_pattern = r'els\.cymaticsBtn = document\.getElementById\(\'cymaticsBtn\'\);.*?els\.cymaticsAutoRotate = document\.getElementById\(\'cymaticsAutoRotate\'\);'
content = re.sub(cym_els_pattern, '', content, flags=re.DOTALL)

with open('binaural-assets/js/ui/controls_v3.js', 'w') as f:
    f.write(content)

print("Cleaned controls_v3.js")
