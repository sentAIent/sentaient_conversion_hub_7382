with open("public/binaural-assets/js/ui/controls_v3.js", 'r') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "switchRightTab" in line:
        print(f"Lines around {idx+1}:")
        for i in range(max(0, idx-5), min(len(lines), idx+25)):
            print(f"{i+1}: {lines[i]}", end='')
