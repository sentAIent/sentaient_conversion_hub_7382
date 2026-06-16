def find_lines(filepath, term):
    with open(filepath, 'r', errors='ignore') as f:
        lines = f.readlines()
    results = []
    for idx, line in enumerate(lines):
        if term in line:
            results.append((idx + 1, line.strip()))
    return results

for path in ["public_html_backup/mindwave-head.html", "public_html_backup/mindwave.html"]:
    print(f"\n=== {path} ===")
    for term in ["H2O", "Sri Yantra", "Flower Life"]:
        lines = find_lines(path, term)
        print(f"Term '{term}': {len(lines)} matches")
        for line_num, line in lines[:3]:
            print(f"  Line {line_num}: {line[:120]}")
