import re

with open('public/mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update main panel classes
# cyberSettingsPanel and matrixSettingsPanel main div
html = html.replace(
    'hidden flex flex-wrap justify-center items-center gap-3 px-4 py-2 bg-[#0a0a0f]/80 backdrop-blur-md border border-[var(--accent)]/30 rounded-xl shadow-[0_0_30px_rgba(45,212,191,0.1)] transition-all animate-fade-in-up w-auto max-w-4xl',
    'hidden flex flex-wrap justify-center items-center gap-x-2 gap-y-1.5 px-3 py-1.5 bg-[#0a0a0f]/80 backdrop-blur-md border border-[var(--accent)]/30 rounded-xl shadow-[0_0_30px_rgba(45,212,191,0.1)] transition-all animate-fade-in-up w-[95%] sm:w-auto max-w-full'
)

# 2. Update all w-24 sliders within settings panels to be w-16 sm:w-20
html = html.replace('class="flex flex-col gap-0.5 w-24"', 'class="flex flex-col gap-0.5 w-16 sm:w-20"')

# 3. Update the text input width: w-24 -> w-16 sm:w-20
html = html.replace(
    'class="w-24 bg-white/5 border border-white/10 rounded', 
    'class="w-16 sm:w-20 bg-white/5 border border-white/10 rounded'
)

# 4. Remove mt-2 from color controls groups to fix vertical alignment
html = html.replace('class="flex items-center gap-1 mt-2"', 'class="flex items-center gap-1"')

# 5. Make the "Sliders Group" wrapper flexible instead of fixed to gap-3
html = html.replace(
    '<!-- Sliders Group -->\n                <div class="flex items-center gap-3">',
    '<!-- Sliders Group -->\n                <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">'
)
html = html.replace(
    '<!-- Sliders Group -->\n                    <div class="flex items-center gap-3">',
    '<!-- Sliders Group -->\n                    <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">'
)

# 6. Shrink Back Button text on very small screens
html = html.replace(
    '</svg>\n                        Back\n                    </button>',
    '</svg>\n                        <span class="hidden sm:inline">Back</span>\n                    </button>'
)

html = html.replace(
    '</svg>\n                            Back\n                        </button>',
    '</svg>\n                            <span class="hidden sm:inline">Back</span>\n                        </button>'
)

with open('public/mindwave.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Panels optimized for responsiveness and minimal space.")
