import sys

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r', encoding='utf-8') as f:
    js = f.read()

target_next = '''        let nextIdx = (idx + 1) % patterns.length;
        this.cymaticsHistory.push(patterns[nextIdx]);
        if (this.cymaticsHistory.length > 50) this.cymaticsHistory.shift();
        this.cymaticsHistoryIndex = this.cymaticsHistory.length - 1;
        this.applyCymatic(patterns[nextIdx]);
        this.lastCymaticRotation = performance.now();
    }'''

replacement_next = '''        let nextIdx = (idx + 1) % patterns.length;
        if (window.selectCymaticPattern) {
            window.selectCymaticPattern(nextIdx);
        } else {
            this.cymaticsHistory.push(patterns[nextIdx]);
            if (this.cymaticsHistory.length > 50) this.cymaticsHistory.shift();
            this.cymaticsHistoryIndex = this.cymaticsHistory.length - 1;
            this.applyCymatic(patterns[nextIdx]);
        }
        this.lastCymaticRotation = performance.now();
    }'''

target_prev = '''        let prevIdx = (idx - 1 + patterns.length) % patterns.length;
        this.cymaticsHistory.push(patterns[prevIdx]);
        if (this.cymaticsHistory.length > 50) this.cymaticsHistory.shift();
        this.cymaticsHistoryIndex = this.cymaticsHistory.length - 1;
        this.applyCymatic(patterns[prevIdx]);
        this.lastCymaticRotation = performance.now();
    }'''

replacement_prev = '''        let prevIdx = (idx - 1 + patterns.length) % patterns.length;
        if (window.selectCymaticPattern) {
            window.selectCymaticPattern(prevIdx);
        } else {
            this.cymaticsHistory.push(patterns[prevIdx]);
            if (this.cymaticsHistory.length > 50) this.cymaticsHistory.shift();
            this.cymaticsHistoryIndex = this.cymaticsHistory.length - 1;
            this.applyCymatic(patterns[prevIdx]);
        }
        this.lastCymaticRotation = performance.now();
    }'''

if target_next in js and target_prev in js:
    js = js.replace(target_next, replacement_next)
    js = js.replace(target_prev, replacement_prev)
    with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("SUCCESS: Fixed nextCymatic and prevCymatic")
else:
    print("FAILED TO FIND TARGET BLOCKS")
