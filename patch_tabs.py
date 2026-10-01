import re

with open('lim_clone/frontend/src/components/StrategyStudio.jsx', 'r') as f:
    content = f.read()

imports = 'import { LightningIcon } from "./icons/LightningIcon";\nimport { ChartIcon } from "./icons/ChartIcon";\nimport { TargetIcon } from "./icons/TargetIcon";\n'
if 'LightningIcon' not in content:
    content = re.sub(r'(import React.*?;\n)', r'\1' + imports, content)

content = content.replace('📈 5-Stage Backtester', '<div style={{ display: "flex", alignItems: "center", gap: "6px" }}><ChartIcon size={16} /> 5-Stage Backtester</div>')
content = content.replace('🎯 Options Greeks Lab', '<div style={{ display: "flex", alignItems: "center", gap: "6px" }}><TargetIcon size={16} /> Options Greeks Lab</div>')
content = content.replace('📡 Copy-Trading Alpha Streams', '<div style={{ display: "flex", alignItems: "center", gap: "6px" }}><LightningIcon size={16} /> Copy-Trading Alpha Streams</div>')
content = content.replace('⚡ Run Institutional Simulation', '<div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><LightningIcon size={18} /> Run Institutional Simulation</div>')

with open('lim_clone/frontend/src/components/StrategyStudio.jsx', 'w') as f:
    f.write(content)
