import re

with open('lim_clone/frontend/src/components/PortfolioDashboard.jsx', 'r') as f:
    content = f.read()

# Replace Tailwind slate backgrounds with richer dark backgrounds
content = content.replace("rgba(30, 41, 59, 0.7)", "rgba(20, 20, 20, 0.7)")
content = content.replace("backgroundColor: '#0f172a'", "backgroundColor: '#0a0a0a'")

with open('lim_clone/frontend/src/components/PortfolioDashboard.jsx', 'w') as f:
    f.write(content)
