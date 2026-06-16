import re

def get_elements(filepath):
    with open(filepath, 'r', errors='ignore') as f:
        content = f.read()
    # Let's count button classes
    buttons = re.findall(r'class="([^"]*btn[^"]*)"', content)
    lux_btns = re.findall(r'class="([^"]*lux[^"]*)"', content)
    # Let's check sections
    studio = "studio" in content.lower()
    cymatics = "cymatics" in content.lower()
    return len(buttons), len(lux_btns), studio, cymatics, len(content)

for path in [
    "public_html_backup/mindwave.html",
    "public_html_backup/mindwave-head.html",
    "public_html_backup/mindwave-beta.html",
    "public_html_backup/mindwave-official.html",
    "public_html_backup/mindwave-RECOVERY.html",
    "public_html_backup/mindwave-RECOVERY-PERFECT.html",
    "public/mindwave.html",
    "mindwave-friday.html"
]:
    try:
        btns, lux, studio, cymatics, size = get_elements(path)
        print(f"{path}: buttons={btns}, lux={lux}, studio={studio}, cymatics={cymatics}, size={size}")
    except Exception as e:
        print(f"{path}: Error {e}")
