import re

with open('public/interstellar-game/script.js', 'r') as f:
    content = f.read()

# Make sure we add initEditableSliders() to script.js
editable_script = """
    initEditableSliders() {
        // Find all span elements with the editable class
        const spans = document.querySelectorAll('.editable-value-span');
        
        spans.forEach(span => {
            span.addEventListener('click', () => {
                // Determine the corresponding slider by replacing 'Value' with 'Slider' in the ID
                const sliderId = span.id.replace('Value', 'Slider');
                const slider = document.getElementById(sliderId);
                
                if (!slider) return;

                // Extract the current numerical value from the span text (ignoring symbols like 'x' or '°')
                const currentText = span.textContent;
                const currentValue = parseFloat(currentText.replace(/[^0-9.-]/g, ''));

                // Create the input element
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'editable-value-input';
                input.value = isNaN(currentValue) ? slider.value : currentValue;
                input.min = slider.min;
                input.max = slider.max;
                if (slider.step) input.step = slider.step;

                // Function to finalize edit
                const finalizeEdit = () => {
                    let newVal = parseFloat(input.value);
                    if (isNaN(newVal)) newVal = parseFloat(slider.value);
                    
                    // Clamp to min/max
                    if (slider.min !== '') newVal = Math.max(parseFloat(slider.min), newVal);
                    if (slider.max !== '') newVal = Math.min(parseFloat(slider.max), newVal);
                    
                    // Update slider value
                    slider.value = newVal;
                    
                    // Manually trigger the 'input' and 'change' events on the slider so the app updates
                    slider.dispatchEvent(new Event('input', { bubbles: true }));
                    slider.dispatchEvent(new Event('change', { bubbles: true }));

                    // Swap back to span (the span content will naturally be overwritten by the app's existing event listeners)
                    input.replaceWith(span);
                    
                    // Fallback to update span immediately just in case the app listener misses it
                    const suffix = currentText.replace(/[0-9.-]/g, ''); // Extract the unit (like 'x' or '°')
                    span.textContent = newVal + suffix;
                };

                input.addEventListener('blur', finalizeEdit);
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        input.blur();
                    } else if (e.key === 'Escape') {
                        input.replaceWith(span); // Cancel edit
                    }
                });

                // Swap in the DOM
                span.replaceWith(input);
                input.focus();
                input.select();
            });
        });
    }
"""

# Insert inside the InterstellarEngine class, before the resize method or right after setupAudio
content = content.replace("    setupAudio() {", editable_script + "\n    setupAudio() {")

# Call this.initEditableSliders() at the end of constructor
content = content.replace("this.setupAudio();", "this.setupAudio();\n        this.initEditableSliders();")

# Also, warpSpeedSlider wasn't updating its span since we just added it. Let's fix app.setWarpSpeedMultiplier
content = content.replace(
    "setWarpSpeedMultiplier(val) {\n        this.warpSpeedMultiplier = parseFloat(val);",
    "setWarpSpeedMultiplier(val) {\n        this.warpSpeedMultiplier = parseFloat(val);\n        const span = document.getElementById('warpSpeedValue');\n        if (span) span.textContent = val + 'x';"
)

with open('public/interstellar-game/script.js', 'w') as f:
    f.write(content)

print("Updated script.js")
