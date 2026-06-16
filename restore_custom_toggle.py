import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    html = f.read()

target = '''<style>
                input.global-sync-toggle:checked ~ .toggle-bg { background-color: rgba(14, 165, 233, 0.2); border-color: rgba(14, 165, 233, 0.5); }
                input.global-sync-toggle:checked ~ .dot { transform: translateX(100%); background-color: #38bdf8; }
            </style>'''

replacement = '''<style>
                input.global-sync-toggle:checked ~ .toggle-bg { background-color: rgba(14, 165, 233, 0.2); border-color: rgba(14, 165, 233, 0.5); }
                input.global-sync-toggle:checked ~ .dot { transform: translateX(100%); background-color: #38bdf8; }
                input.custom-sync-toggle:checked ~ .toggle-bg { background-color: rgba(6, 78, 59, 0.5); border-color: rgba(16, 185, 129, 0.5); }
                input.custom-sync-toggle:checked ~ .dot { transform: translateX(100%); background-color: #34d399; }
            </style>'''

if target in html:
    html = html.replace(target, replacement)
    with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
        f.write(html)
    print("Restored custom-sync-toggle CSS.")
else:
    print("Could not find target block.")

