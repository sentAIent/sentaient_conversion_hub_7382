import re

with open('mindwave.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add loading="lazy" to cymatics images to fix menu freeze
content = content.replace('<img src="binaural-assets/images/cymatics/', '<img loading="lazy" src="binaural-assets/images/cymatics/')

# 2. Add .toggle-gold CSS and improve premium-toggle size
css_to_replace = """        /* Premium Toggle Switch */
        .premium-toggle {
            position: relative;
            display: inline-block;
            width: 26px;
            height: 14px;
            cursor: pointer;
        }

        .premium-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.1);
            transition: .3s;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 10px;
            width: 10px;
            left: 1px;
            bottom: 1px;
            background-color: #94a3b8;
            transition: .3s;
            border-radius: 50%;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        }

        input:checked+.toggle-slider {
            background-color: rgba(45, 212, 191, 0.2);
            border-color: rgba(45, 212, 191, 0.3);
        }

        input:checked+.toggle-slider:before {
            transform: translateX(12px);
            background-color: #2dd4bf;
            box-shadow: 0 0 8px rgba(45, 212, 191, 0.5);
        }"""

new_css = """        /* Premium Toggle Switch */
        .premium-toggle {
            position: relative;
            display: inline-block;
            width: 34px;
            height: 18px;
            cursor: pointer;
        }

        .premium-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.1);
            transition: .3s cubic-bezier(0.4, 0.0, 0.2, 1);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 14px;
            width: 14px;
            left: 1px;
            bottom: 1px;
            background-color: #94a3b8;
            transition: .3s cubic-bezier(0.4, 0.0, 0.2, 1);
            border-radius: 50%;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }

        input:checked+.toggle-slider {
            background-color: rgba(45, 212, 191, 0.2);
            border-color: rgba(45, 212, 191, 0.4);
        }

        input:checked+.toggle-slider:before {
            transform: translateX(16px);
            background-color: #2dd4bf;
            box-shadow: 0 0 10px rgba(45, 212, 191, 0.6);
        }

        .toggle-gold input:checked+.toggle-slider {
            background-color: rgba(234, 179, 8, 0.2);
            border-color: rgba(234, 179, 8, 0.4);
        }
        .toggle-gold input:checked+.toggle-slider:before {
            background-color: #eab308;
            box-shadow: 0 0 10px rgba(234, 179, 8, 0.6);
        }"""

if css_to_replace in content:
    content = content.replace(css_to_replace, new_css)
else:
    print("Could not find CSS to replace!")

# 3. Add toggle-gold to audioSyncToggle label
old_html = """<label class="premium-toggle" onclick="event.stopPropagation()">
                        <input type="checkbox" id="audioSyncToggle" checked>"""
new_html = """<label class="premium-toggle toggle-gold" onclick="event.stopPropagation()">
                        <input type="checkbox" id="audioSyncToggle" checked>"""
content = content.replace(old_html, new_html)

with open('mindwave.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch successful!")
