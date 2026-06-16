def search_in_file(filepath, terms):
    try:
        with open(filepath, 'r', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        return str(e)
    results = {}
    for term in terms:
        count = content.count(term)
        results[term] = count
    return results

for path in [
    "binaural-assets/js/main_vGOLD_SYNC.js",
    "public/binaural-assets/js/main_vGOLD_SYNC.js",
    "binaural-assets/js/main_vFINAL.js",
    "public/binaural-assets/js/main_vFINAL.js",
    "public/binaural-assets/js/main_vFINAL_backup_mar16_today.js",
    "public/binaural-assets/js/main_vFINAL_webapp.js"
]:
    res = search_in_file(path, ["nuclear_v", "visualizer", "vGOLD_SYNC", "vFINAL", "v5", "v4"])
    print(f"\n=== {path} ===")
    if isinstance(res, str):
        print(res)
    else:
        for k, v in res.items():
            print(f"  {k}: {v}")
