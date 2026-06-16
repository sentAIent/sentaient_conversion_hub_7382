import re

with open('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/js/main_vFINAL.js', 'r') as f:
    content = f.read()

# Add a function setupCymaticListeners
listener_code = """
function setupCymaticListeners() {
    console.log('[Main] Setting up Cymatic UI Listeners');
    
    // Color Pickers
    document.querySelectorAll('.cymatic-color-picker').forEach(picker => {
        picker.addEventListener('input', (e) => {
            const classId = parseInt(e.target.dataset.class);
            const colorIdx = parseInt(e.target.dataset.color);
            const hex = parseInt(e.target.value.replace('#', '0x'), 16);
            if (window.setCymaticColor) {
                window.setCymaticColor(classId, colorIdx, hex);
            }
        });
    });

    // Intensity Sliders (they don't have data-param, they are specifically for intensity)
    document.querySelectorAll('.cymatic-intensity-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const classId = parseInt(e.target.dataset.class);
            // Convert 0-100 to 0.0-1.0
            const val = parseFloat(e.target.value) / 100.0;
            
            // Update UI text display
            const display = e.target.parentElement.querySelector('.value-display');
            if (display) display.textContent = e.target.value + '%';
            
            if (window.setCymaticParam) {
                window.setCymaticParam(classId, 'intensity', val);
            }
        });
    });

    // Advanced Param Sliders
    document.querySelectorAll('.cymatic-param-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const classId = parseInt(e.target.dataset.class);
            const param = e.target.dataset.param;
            const val = parseFloat(e.target.value);
            
            // Update UI text display
            const display = e.target.parentElement.querySelector('.value-display');
            if (display) display.textContent = val.toFixed(1);
            
            if (window.setCymaticParam) {
                window.setCymaticParam(classId, param, val);
            }
        });
    });

    // Toggles
    document.querySelectorAll('.cymatic-param-toggle').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const classId = parseInt(e.target.dataset.class);
            const param = e.target.dataset.param;
            const val = e.target.checked ? 1.0 : 0.0;
            
            if (window.setCymaticParam) {
                window.setCymaticParam(classId, param, val);
            }
        });
    });
}
"""

if "setupCymaticListeners" not in content:
    # insert before initResizablePanels();
    content = content.replace("initResizablePanels();", listener_code + "\n    setupCymaticListeners();\n\n    initResizablePanels();")

    with open('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/js/main_vFINAL.js', 'w') as f:
        f.write(content)
    print("Added setupCymaticListeners to main_vFINAL.js")
else:
    print("Already exists")
