import subprocess
import re

# Get all commit hashes and dates
git_log = subprocess.check_output(
    ["git", "log", "--all", "--pretty=format:%h|%cd|%s"],
    text=True, errors="ignore"
)

commits = []
for line in git_log.split("\n"):
    if not line:
        continue
    parts = line.split("|", 2)
    if len(parts) == 3:
        commits.append((parts[0], parts[1], parts[2]))

print(f"Total commits: {len(commits)}")

# Find unique versions of mindwave.html or public/mindwave.html in these commits
for commit, date, msg in commits[:35]: # Check the most recent 35 commits
    for path in ["public/mindwave.html", "mindwave.html"]:
        try:
            content = subprocess.check_output(
                ["git", "show", f"{commit}:{path}"],
                text=True, errors="ignore"
            )
            # Analyze content
            buttons = re.findall(r'class="([^"]*btn[^"]*)"', content)
            lux_btns = re.findall(r'class="([^"]*lux[^"]*)"', content)
            studio = "studio" in content.lower()
            cymatics = "cymatics" in content.lower()
            print(f"{commit} ({date}) [{path}]: buttons={len(buttons)}, lux={len(lux_btns)}, studio={studio}, cymatics={cymatics}, size={len(content)} -- {msg[:40]}")
            break # Found the file in this commit
        except Exception:
            continue
