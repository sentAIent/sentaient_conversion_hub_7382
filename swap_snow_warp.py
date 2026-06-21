import re

with open("mindwave.html", "r") as f:
    content = f.read()

# Define Snow's new generic style
snow_new = """<!-- SNOWFLAKE ❌️ - Real particle snow system -->
<button class="visual-btn p-2 rounded-xl glass-pill border-[var(--accent)]/30 hover:bg-white/10 hover:border-[var(--accent)] transition-all group relative flex flex-col items-center justify-center gap-1 h-16 min-w-[4rem]" id="snowflakeBtn">
<input class="absolute -top-1 -left-1 w-4 h-4 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="snowflake" type="color" value="#b0d8ff"/>
<span class="text-2xl filter drop-shadow-lg">❄️</span>
<span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">Snow</span>
<!-- Settings Gear -->
<div class="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/10 hover:bg-sky-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 shadow-lg" id="snowflakeSettingsToggle" onclick="event.stopPropagation(); toggleSnowflakeSettings(this);" title="Snow Settings">
<span class="text-[10px] leading-none text-white">⚙️</span>
</div>
</button>"""

# Define Warp's new custom style
warp_new = """<!-- WARP -->
<button class="visual-btn p-2 rounded-xl transition-all group relative flex flex-col items-center justify-center gap-1 h-16 min-w-[4rem]" id="lightspeedBtn" style="background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent) 0%, color-mix(in srgb, var(--accent) 5%, transparent) 100%); border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent); box-shadow: 0 0 18px color-mix(in srgb, var(--accent) 12%, transparent); filter: hue-rotate(180deg);">
<input class="absolute -top-1 -left-1 w-4 h-4 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="lightspeed" type="color" value="#60a9ff"/>
<span class="text-2xl" style="filter: drop-shadow(0 0 10px var(--accent));">☄️</span>
<span class="text-[10px] font-bold uppercase tracking-wider transition-colors" style="color: var(--accent);">Warp</span>
</button>"""

# Find current Snow and replace
snow_pattern = r'<!-- SNOWFLAKE ❌️ - Real particle snow system -->\s*<button.*?id="snowflakeBtn".*?</button>'
content = re.sub(snow_pattern, snow_new, content, flags=re.DOTALL)

# Find current Warp and replace
warp_pattern = r'<!-- WARP -->\s*<button.*?id="lightspeedBtn".*?</button>'
content = re.sub(warp_pattern, warp_new, content, flags=re.DOTALL)

with open("mindwave.html", "w") as f:
    f.write(content)

print("Snow and Warp replaced successfully.")
