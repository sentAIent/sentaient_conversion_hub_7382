import re

with open('mindwave.html', 'r') as f:
    html = f.read()

bad_script_regex = r'<script>\s*document\.addEventListener\("DOMContentLoaded", \(\) => \{\s*const updateCymaticCustomColor =.*?\}\);\s*</script>'

good_script = '''<script>
document.addEventListener("DOMContentLoaded", () => {
    const updateCymaticCustomColor = (idx, hex) => {
        let viz = null;
        if(typeof window.getVisualizer === 'function') {
            viz = window.getVisualizer();
        } else if(window.gameEngine && window.gameEngine.visualizer) {
            viz = window.gameEngine.visualizer;
        }
        
        if(viz && viz.cymaticMaterial) {
            const m = viz.cymaticMaterial;
            if(m.uniforms[`uCymaticCol${idx}`]) {
                m.uniforms[`uCymaticCol${idx}`].value.set(hex);
            }
        }
    };
    
    // Attach listeners and also update on 'change' and 'input'
    const attachPicker = (id, idx) => {
        const el = document.getElementById(id);
        if(el) {
            el.addEventListener('input', e => updateCymaticCustomColor(idx, e.target.value));
            el.addEventListener('change', e => updateCymaticCustomColor(idx, e.target.value));
        }
    };
    
    attachPicker('cymCol1', 1);
    attachPicker('cymCol2', 2);
    attachPicker('cymCol3', 3);
    attachPicker('cymCol4', 4);
});
</script>'''

if re.search(bad_script_regex, html, re.DOTALL):
    html = re.sub(bad_script_regex, good_script, html, flags=re.DOTALL)
else:
    # If not found, inject before </body>
    html = html.replace('</body>', good_script + '\n</body>')

with open('mindwave.html', 'w') as f:
    f.write(html)
print("mindwave.html color picker script fixed.")
