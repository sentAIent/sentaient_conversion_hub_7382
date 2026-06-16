import re

def parse_sections(filepath):
    try:
        with open(filepath, 'r', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        return str(e), 0
    
    features = {
        "resilient_bootloader": "Resilient Bootloader" in content,
        "visual_error_reporter": "_dbg" in content or "window.addEventListener('error'" in content,
        "cymatics_mediums": "setCymaticMedium" in content,
        "solfeggio_frequencies": "heal-174" in content,
        "neural_journeys": "startSweepPreset" in content,
        "dj_pads": "triggerDjSound" in content,
        "theme_gallery": "Theme Gallery" in content,
        "ask_mindwave": "ASK MINDWAVE" in content,
        "double_sidebar": "leftToggle" in content and "rightToggle" in content,
        "pioneer_mixer": "djHoldBtn" in content or "djClearBtn" in content,
        "advanced_cymatics": "Hyper-Resonance Series" in content or "Aetheric Weaver" in content,
    }
    
    buttons = re.findall(r'<button\s+[^>]*>', content)
    
    return features, len(buttons)

for path in [
    "public_html_backup/mindwave-head.html",
    "public/mindwave.html",
    "public/mindwave-beta.html"
]:
    feats, num_btns = parse_sections(path)
    print(f"\n=== {path} ===")
    print(f"Total buttons: {num_btns}")
    if isinstance(feats, str):
        print(feats)
    else:
        for k, v in feats.items():
            print(f"  {k}: {v}")
