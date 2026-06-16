import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    content = f.read()

# Replace Audio Sync Toggle
old_audio_sync = '''            <label class="flex items-center cursor-pointer gap-2 group">
                <span class="text-[10px] text-emerald-400/80 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">SYNC TO AUDIO</span>
                <div class="relative flex items-center">
                    <input type="checkbox" id="audioSyncToggle" class="sr-only peer" checked onchange="window.toggleAudioSync(this.checked)">
                    <div class="w-8 h-4 bg-black/50 rounded-full shadow-inner border border-emerald-500/30 peer-checked:bg-emerald-900/50 peer-checked:border-emerald-500/50 transition-colors"></div>
                    <div class="absolute left-1 w-2.5 h-2.5 bg-gray-500 rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-3.5 peer-checked:bg-emerald-400"></div>
                </div>
            </label>'''

new_audio_sync = '''            <label class="flex items-center cursor-pointer gap-2 group">
                <span class="text-[10px] text-emerald-400/80 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">SYNC TO AUDIO</span>
                <div class="relative">
                    <input type="checkbox" id="audioSyncToggle" class="sr-only custom-sync-toggle" checked onchange="window.toggleAudioSync(this.checked)">
                    <div class="block bg-black/50 border border-emerald-500/30 w-8 h-4 rounded-full transition-colors toggle-bg"></div>
                    <div class="dot absolute left-1 top-1 bg-gray-500 w-2 h-2 rounded-full transition-transform duration-300"></div>
                </div>
            </label>'''

content = content.replace(old_audio_sync, new_audio_sync)

# Replace Mouse Sync Toggle
old_mouse_sync = '''                <label class="flex items-center cursor-pointer gap-2 group">
                    <span class="text-[10px] text-emerald-400/80 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">SYNC TO MOUSE</span>
                    <div class="relative flex items-center">
                        <input type="checkbox" id="mouseSyncToggle" class="sr-only peer" onchange="window.toggleMouseSync(this.checked)">
                        <div class="w-8 h-4 bg-black/50 rounded-full shadow-inner border border-emerald-500/30 peer-checked:bg-emerald-900/50 peer-checked:border-emerald-500/50 transition-colors"></div>
                        <div class="absolute left-1 w-2.5 h-2.5 bg-gray-500 rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-3.5 peer-checked:bg-emerald-400"></div>
                    </div>
                </label>'''

new_mouse_sync = '''                <label class="flex items-center cursor-pointer gap-2 group">
                    <span class="text-[10px] text-emerald-400/80 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">SYNC TO MOUSE</span>
                    <div class="relative">
                        <input type="checkbox" id="mouseSyncToggle" class="sr-only custom-sync-toggle" onchange="window.toggleMouseSync(this.checked)">
                        <div class="block bg-black/50 border border-emerald-500/30 w-8 h-4 rounded-full transition-colors toggle-bg"></div>
                        <div class="dot absolute left-1 top-1 bg-gray-500 w-2 h-2 rounded-full transition-transform duration-300"></div>
                    </div>
                </label>'''

content = content.replace(old_mouse_sync, new_mouse_sync)

# Inject custom CSS style back in if missing
style_block = '''
        <style>
            input.custom-sync-toggle:checked ~ .toggle-bg { background-color: rgba(6, 78, 59, 0.5); border-color: rgba(16, 185, 129, 0.5); }
            input.custom-sync-toggle:checked ~ .dot { transform: translateX(100%); background-color: #34d399; }
        </style>
'''

if 'input.custom-sync-toggle:checked' not in content:
    content = content.replace('<div class="cymatics-class-container mb-6">', style_block + '        <div class="cymatics-class-container mb-6">')

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(content)

