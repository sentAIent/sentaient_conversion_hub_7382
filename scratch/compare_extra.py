with open('public_html_backup/mindwave-head.html', 'r', errors='ignore') as f:
    content = f.read()

import re
uploads = re.search(r'<section[^>]*?data-section=["\']uploads["\'][^>]*?>([\s\S]*?)</section>', content)
classical = re.search(r'<section[^>]*?data-section=["\']classical["\'][^>]*?>([\s\S]*?)</section>', content)

if uploads:
    with open('scratch/uploads_section.html', 'w') as f:
        f.write(uploads.group(0))
    print("Saved scratch/uploads_section.html")
    
if classical:
    with open('scratch/classical_section.html', 'w') as f:
        f.write(classical.group(0))
    print("Saved scratch/classical_section.html")
