with open("mindwave.html", 'r') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "cymaticsPanel" in line:
        print(f"Lines around {idx+1} in root mindwave.html:")
        for i in range(max(0, idx-5), min(len(lines), idx+30)):
            print(f"{i+1}: {lines[i]}", end='')
        break
