with open("public/mindwave.html", 'r') as f:
    current = f.read()

with open("public_html_backup/mindwave-head.html", 'r') as f:
    backup = f.read()

# Let's check the number of occurrences of "cymatics-pattern-btn" and "selectCymaticPattern"
print("Current pattern buttons count:", current.count("selectCymaticPattern"))
print("Backup pattern buttons count:", backup.count("selectCymaticPattern"))

# Check for medium buttons count
print("Current medium buttons count:", current.count("setCymaticMedium"))
print("Backup medium buttons count:", backup.count("setCymaticMedium"))

# Check for sliders in the right panel
import re
current_sliders = re.findall(r'id="([^"]*Slider)"', current)
backup_sliders = re.findall(r'id="([^"]*Slider)"', backup)

print("Current right panel sliders:", set(current_sliders) - set(backup_sliders))
print("Backup right panel sliders:", set(backup_sliders) - set(current_sliders))
