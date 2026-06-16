import re

def count_and_show_buttons(filepath):
    with open(filepath, 'r', errors='ignore') as f:
        content = f.read()
    # Let's see if H2O is a button in the HTML
    h2o_buttons = re.findall(r'<button[^>]*>.*?H2O.*?</button>', content, re.DOTALL)
    sri_buttons = re.findall(r'<button[^>]*>.*?Sri Yantra.*?</button>', content, re.DOTALL)
    flower_buttons = re.findall(r'<button[^>]*>.*?Flower Life.*?</button>', content, re.DOTALL)
    return len(h2o_buttons), len(sri_buttons), len(flower_buttons)

for path in [
    "public_html_backup/mindwave-head.html",
    "public_html_backup/mindwave.html",
    "mindwave-friday.html",
    "public/mindwave.html"
]:
    h2o, sri, flower = count_and_show_buttons(path)
    print(f"{path}: h2o={h2o}, sri={sri}, flower={flower}")
