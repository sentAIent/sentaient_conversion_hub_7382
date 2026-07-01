import re

with open('public/interstellar-game/index.html', 'r') as f:
    content = f.read()

# Add CSS for editable spans
css = """
        .editable-value-span {
            cursor: text;
            padding: 2px 4px;
            border-radius: 3px;
            transition: background 0.2s, box-shadow 0.2s;
        }
        .editable-value-span:hover {
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
        }
        .editable-value-input {
            background: rgba(0, 0, 0, 0.6);
            color: inherit;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 3px;
            font-family: inherit;
            font-size: inherit;
            width: 50px;
            text-align: center;
            outline: none;
            padding: 1px;
            box-shadow: 0 0 8px rgba(0, 150, 255, 0.5);
        }
        /* Hide spin buttons */
        .editable-value-input::-webkit-outer-spin-button,
        .editable-value-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        .editable-value-input[type=number] {
            -moz-appearance: textfield;
        }
"""
content = content.replace('</style>', css + '</style>')

# Add editable class to existing value spans
content = re.sub(r'(id="[a-zA-Z]+Value")', r'\1 class="editable-value-span"', content)

# Special case for warpSpeedSlider which lacks a span
warp_html = """                <button class="btn-small" id="bgWarpBtn" onclick="app.toggleBgWarp()">Lightspeed</button>
                <span id="warpSpeedValue" class="editable-value-span" style="font-size:10px; margin-left:5px;">10x</span>
                <input type="range" id="warpSpeedSlider" min="0" max="100" step="1" value="10" style="width: 50px;"
                    title="Warp Speed" oninput="app.setWarpSpeedMultiplier(this.value)">"""
content = re.sub(
    r'<button class="btn-small" id="bgWarpBtn".*?</button>\s*<input type="range" id="warpSpeedSlider".*?>',
    warp_html,
    content,
    flags=re.DOTALL
)

with open('public/interstellar-game/index.html', 'w') as f:
    f.write(content)

print("Updated index.html")
