with open("mindwave.html", 'r') as f:
    content = f.read()

import re
match = re.search(r'<!-- Cymatics Header/Controls -->.*?</div>\s*<!-- Master Tuning Grid -->', content, re.DOTALL)
if match:
    print("Found match:")
    print(repr(match.group(0)))
else:
    print("No match found!")
