import re

JS_FILE = 'binaural-assets/js/ui/controls_v3.js'

with open(JS_FILE, 'r') as f:
    content = f.read()

replacement = """export function updatePresetButtons(activeType) {
    if (!els.presetButtons) return;

    els.presetButtons.forEach(b => {
        // Remove active styling classes
        b.classList.remove('preset-active', 'border-[var(--accent)]', 'text-[var(--accent)]', 'bg-white/10', 'border-white/20');
        b.style.boxShadow = '';
        b.style.background = '';
        b.style.borderColor = '';

        // Add inactive styling
        b.classList.add('bg-white/5', 'border-white/10');

        // Check if this button matches the active type
        if (activeType && b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${activeType}'`)) {
            // Remove inactive styling
            b.classList.remove('bg-white/5', 'border-white/10');
            
            // Add prominent active styling
            b.classList.add('preset-active');
            b.style.borderColor = 'var(--accent)';
            b.style.background = 'color-mix(in srgb, var(--accent) 15%, transparent)';
            b.style.boxShadow = '0 0 20px var(--accent-glow), inset 0 0 10px color-mix(in srgb, var(--accent) 10%, transparent)';
        }
    });
}"""

pattern = r'export function updatePresetButtons\(activeType\) \{.*?\n\}'
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(JS_FILE, 'w') as f:
    f.write(new_content)
print("Updated updatePresetButtons in controls_v3.js!")
