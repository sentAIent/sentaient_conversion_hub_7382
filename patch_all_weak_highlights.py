import re

JS_FILE = 'binaural-assets/js/ui/controls_v3.js'

with open(JS_FILE, 'r') as f:
    content = f.read()

# Replace weak highlight toggling in applyPreset (around line 4088)
pattern1 = r'''        if \(targetBtn\) \{
            targetBtn\.classList\.remove\('bg-white/5', 'border-white/10'\);
            targetBtn\.classList\.add\('bg-white/10', 'border-white/20'\);
        \}'''

replacement1 = '''        if (targetBtn) {
            targetBtn.classList.remove('bg-white/5', 'border-white/10');
            targetBtn.classList.add('preset-active');
            targetBtn.style.borderColor = 'var(--accent)';
            targetBtn.style.background = 'color-mix(in srgb, var(--accent) 15%, transparent)';
            targetBtn.style.boxShadow = '0 0 20px var(--accent-glow), inset 0 0 10px color-mix(in srgb, var(--accent) 10%, transparent)';
        }'''

content = re.sub(pattern1, replacement1, content)

# Replace weak highlight toggling in applyComboPreset (around line 4382)
pattern2 = r'''    if \(btnElement\) \{
        btnElement\.classList\.remove\('bg-white/5', 'border-white/10'\);
        btnElement\.classList\.add\('bg-white/10', 'border-white/20'\);
    \}'''

replacement2 = '''    if (btnElement) {
        btnElement.classList.remove('bg-white/5', 'border-white/10');
        btnElement.classList.add('preset-active');
        btnElement.style.borderColor = 'var(--accent)';
        btnElement.style.background = 'color-mix(in srgb, var(--accent) 15%, transparent)';
        btnElement.style.boxShadow = '0 0 20px var(--accent-glow), inset 0 0 10px color-mix(in srgb, var(--accent) 10%, transparent)';
    }'''

content = re.sub(pattern2, replacement2, content)


# Also make sure inactive state removes these inline styles correctly 
# We need to find where els.presetButtons.forEach(b => { b.classList.remove... }) occurs outside of updatePresetButtons

pattern3 = r'''        els\.presetButtons\.forEach\(b => \{
            b\.classList\.remove\('bg-white/10', 'border-white/20'\);
            b\.classList\.add\('bg-white/5', 'border-white/10'\);
        \}\);'''

replacement3 = '''        els.presetButtons.forEach(b => {
            b.classList.remove('preset-active', 'bg-white/10', 'border-white/20');
            b.style.boxShadow = '';
            b.style.background = '';
            b.style.borderColor = '';
            b.classList.add('bg-white/5', 'border-white/10');
        });'''

content = re.sub(pattern3, replacement3, content)

with open(JS_FILE, 'w') as f:
    f.write(content)
print("Updated all weak highlights in controls_v3.js!")
