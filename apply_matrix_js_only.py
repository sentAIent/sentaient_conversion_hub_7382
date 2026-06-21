import re

JS_FILE = 'binaural-assets/js/ui/controls_v3.js'

with open(JS_FILE, 'r') as f:
    js_content = f.read()

# Inject the massive switch logic
new_cases = """
        // --- CUSTOM DEEP DIVE FREQUENCIES ---
        case 'freq-0.5': base = 100; beat = 0.5; color = '#8b0000'; window.setCymaticState?.(9, 0); break;
        case 'freq-1.5': base = 105; beat = 1.5; color = '#0000cd'; window.setCymaticState?.(3, 1); break;
        case 'freq-2.5': base = 110; beat = 2.5; color = '#2e8b57'; window.setCymaticState?.(20, 1); break;
        case 'freq-3.0': base = 111; beat = 3.0; color = '#8b0000'; window.setCymaticState?.(22, 10); break;
        case 'freq-4.5': base = 120; beat = 4.5; color = '#191970'; window.setCymaticState?.(13, 6); break;
        case 'freq-5.5': base = 130; beat = 5.5; color = '#ff4500'; window.setCymaticState?.(5, 4); break;
        case 'freq-6.5': base = 140; beat = 6.5; color = '#006400'; window.setCymaticState?.(11, 3); break;
        case 'freq-7.83': base = 144; beat = 7.83; color = '#00ff7f'; window.setCymaticState?.(22, 9); break;
        case 'freq-8.5': base = 150; beat = 8.5; color = '#00ced1'; window.setCymaticState?.(8, 7); break;
        case 'freq-10.0': base = 160; beat = 10.0; color = '#ffb6c1'; window.setCymaticState?.(19, 4); break;
        case 'freq-11.5': base = 170; beat = 11.5; color = '#39ff14'; window.setCymaticState?.(6, 8); break;
        case 'freq-12.0': base = 180; beat = 12.0; color = '#8b4513'; window.setCymaticState?.(14, 9); break;
        case 'freq-14.0': base = 190; beat = 14.0; color = '#ffffff'; window.setCymaticState?.(1, 0); break;
        case 'freq-16.0': base = 200; beat = 16.0; color = '#ffd700'; window.setCymaticState?.(10, 2); break;
        case 'freq-18.0': base = 210; beat = 18.0; color = '#ffff00'; window.setCymaticState?.(15, 4); break;
        case 'freq-20.0': base = 220; beat = 20.0; color = '#1e90ff'; window.setCymaticState?.(12, 7); break;
        case 'freq-30.0': base = 250; beat = 30.0; color = '#172554'; window.setCymaticState?.(4, 5); break;
        case 'freq-40.0': base = 300; beat = 40.0; color = '#ff00ff'; window.setCymaticState?.(17, 0); break;
        case 'freq-50.0': base = 400; beat = 50.0; color = '#60a9ff'; window.setCymaticState?.(25, 0); break;
        case 'freq-200.0': base = 800; beat = 200.0; color = '#adff2f'; window.setCymaticState?.(18, 9); break;
"""

if "case 'freq-0.5'" not in js_content:
    js_content = js_content.replace("case 'delta': base = 100; beat = 2.5; color = '#6366f1'; break;", "case 'delta': base = 100; beat = 2.5; color = '#6366f1'; window.setCymaticState?.(3, 1); break;")
    js_content = js_content.replace("case 'theta': base = 144; beat = 5.5; color = '#a855f7'; break;", "case 'theta': base = 144; beat = 5.5; color = '#a855f7'; window.setCymaticState?.(5, 4); break;")
    js_content = js_content.replace("case 'alpha': base = 120; beat = 10; color = '#60a5fa'; break;", "case 'alpha': base = 120; beat = 10; color = '#60a5fa'; window.setCymaticState?.(19, 4); break;")
    js_content = js_content.replace("case 'beta': base = 200; beat = 20; color = '#facc15'; break;", "case 'beta': base = 200; beat = 20; color = '#facc15'; window.setCymaticState?.(1, 0); break;")
    js_content = js_content.replace("case 'gamma': base = 200; beat = 40; color = '#f472b6'; break;", "case 'gamma': base = 200; beat = 40; color = '#f472b6'; window.setCymaticState?.(17, 0); break;")

    healing_overrides = {
        'heal-174': 'window.setCymaticState?.(22, 14);',
        'heal-285': 'window.setCymaticState?.(21, 2);',
        'heal-396': 'window.setCymaticState?.(22, 20);',
        'heal-417': 'window.setCymaticState?.(22, 12);',
        'heal-432': 'window.setCymaticState?.(22, 22);',
        'heal-528': 'window.setCymaticState?.(22, 16);',
        'heal-639': 'window.setCymaticState?.(21, 0);',
        'heal-741': 'window.setCymaticState?.(22, 13);',
        'heal-852': 'window.setCymaticState?.(21, 5);',
        'heal-963': 'window.setCymaticState?.(22, 29);'
    }
    for key, cmd in healing_overrides.items():
        js_content = re.sub(rf"(case '{key}': .*? break;)", rf"\1 {cmd}", js_content)

    js_content = js_content.replace("case 'delta':", new_cases + "\n        case 'delta':")

    with open(JS_FILE, 'w') as f:
        f.write(js_content)
    print("JS Update complete!")
else:
    print("JS already updated!")
