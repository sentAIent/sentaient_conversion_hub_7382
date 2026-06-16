import filecmp

same = filecmp.cmp('public/index.html', 'public/mindwave.html')
print(f"Are public/index.html and public/mindwave.html identical? {same}")
