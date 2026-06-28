import re

with open('public/interstellar-game/index.html', 'r') as f:
    content = f.read()

script_to_add = """
    <!-- Slider Edit Script -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const initEditableSpans = () => {
                const spans = document.querySelectorAll('.editable-value-span');
                spans.forEach(span => {
                    span.addEventListener('click', (e) => {
                        // Prevent triggering multiple times if already editing
                        if (span.querySelector('input')) return;
                        
                        // Extract numeric value
                        const currentText = span.textContent;
                        const suffix = currentText.replace(/[0-9.-]/g, '');
                        const currentValue = parseFloat(currentText.replace(/[^0-9.-]/g, ''));
                        
                        // Find matching slider. Assume id ends with 'Value', replace with 'Slider'
                        let sliderId = span.id.replace('Value', 'Slider');
                        let slider = document.getElementById(sliderId);
                        
                        // If standard mapping fails, check nearest input[type=range]
                        if (!slider) {
                            slider = span.parentElement.parentElement.querySelector('input[type=range]');
                        }

                        if (!slider) return;

                        const input = document.createElement('input');
                        input.type = 'number';
                        input.className = 'editable-value-input';
                        input.value = isNaN(currentValue) ? slider.value : currentValue;
                        if (slider.min !== '') input.min = slider.min;
                        if (slider.max !== '') input.max = slider.max;
                        if (slider.step) input.step = slider.step;

                        const finalize = () => {
                            let newVal = parseFloat(input.value);
                            if (isNaN(newVal)) newVal = parseFloat(slider.value);
                            
                            // Clamp
                            if (slider.min !== '') newVal = Math.max(parseFloat(slider.min), newVal);
                            if (slider.max !== '') newVal = Math.min(parseFloat(slider.max), newVal);
                            
                            // Update slider and trigger event
                            slider.value = newVal;
                            
                            // Update span text immediately to give fast feedback
                            span.textContent = newVal + suffix;
                            
                            // Trigger 'input' and 'change' so the app registers it
                            slider.dispatchEvent(new Event('input', { bubbles: true }));
                            slider.dispatchEvent(new Event('change', { bubbles: true }));
                            
                            // Replace input back with the updated span text
                            if (input.parentNode === span) {
                                span.innerHTML = '';
                                span.textContent = newVal + suffix;
                            }
                        };

                        input.addEventListener('blur', finalize);
                        input.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter') {
                                input.blur();
                            } else if (e.key === 'Escape') {
                                span.innerHTML = '';
                                span.textContent = currentText; // Cancel edit
                            }
                        });

                        span.innerHTML = '';
                        span.appendChild(input);
                        input.focus();
                        input.select();
                    });
                });
            };
            
            // Allow time for all UI to build
            setTimeout(initEditableSpans, 1000);
        });
    </script>
"""

# Only add if it doesn't exist
if "<!-- Slider Edit Script -->" not in content:
    content = content.replace('</body>', script_to_add + '\n</body>')

# Ensure cache bust updates to v2
content = re.sub(r'script\.js\?v=[a-zA-Z0-9_]+', 'script.js?v=ray_fix_v2', content)

with open('public/interstellar-game/index.html', 'w') as f:
    f.write(content)
print("Added editable sliders script and cache-busted to v2")
