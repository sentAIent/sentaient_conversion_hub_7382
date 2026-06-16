import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    content = f.read()

# Pass audioData and mouseData to cymaticsCore.update
if 'this.cymaticsCore.update(now * multiplier);' in content:
    content = content.replace(
        'this.cymaticsCore.update(now * multiplier);',
        '''const audioData = { bass: normBass, mids: normMids, highs: normHighs };
                const mouseData = this.cymaticsMouseData || { x: 0, y: 0 };
                this.cymaticsCore.update(now * multiplier, audioData, mouseData);'''
    )

# Track mouse globally if not already tracked
if 'this._boundCymaticPointer = ' not in content:
    init_str = """        this._boundContextRestored = this._handleContextRestored.bind(this);"""
    new_init_str = """        this._boundContextRestored = this._handleContextRestored.bind(this);
        
        this.cymaticsMouseData = { x: 0, y: 0 };
        this._boundCymaticPointer = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            this.cymaticsMouseData.x = (clientX / window.innerWidth) * 2 - 1;
            this.cymaticsMouseData.y = -(clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', this._boundCymaticPointer);
        window.addEventListener('touchmove', this._boundCymaticPointer, { passive: true });"""
    content = content.replace(init_str, new_init_str)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w') as f:
    f.write(content)
