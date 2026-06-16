def check_term(filepath, term):
    with open(filepath, 'r', errors='ignore') as f:
        content = f.read()
    return term in content

for path in [
    "public_html_backup/mindwave-head.html",
    "public_html_backup/mindwave.html",
    "public_html_backup/mindwave-beta.html",
    "public_html_backup/mindwave-RESTORATION.html",
    "public_html_backup/mindwave-RESTORED-V1.html",
    "mindwave-friday.html",
    "public/mindwave.html"
]:
    has_global = check_term(path, "global-tab-btn")
    has_pill = check_term(path, "tab-pill")
    has_head = "head" in path.lower()
    print(f"{path}: global={has_global}, pill={has_pill}, head={has_head}")
