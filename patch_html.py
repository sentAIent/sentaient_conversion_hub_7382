import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    content = f.read()

# Replace Audio Sync Toggle
old_audio_sync = '''            <label class="flex items-center cursor-pointer gap-2 group">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-400 group-hover:text-blue-400 transition-colors">Audio Sync</span>
                <div class="relative">
                    <input type="checkbox" id="audioSyncToggle" class="sr-only" checked>
                    <div class="block bg-gray-800 w-8 h-4 rounded-full shadow-inner border border-white/10 group-hover:border-blue-500/50 transition-colors"></div>
                    <div class="dot absolute left-1 top-0.5 bg-gray-400 w-3 h-3 rounded-full transition-transform duration-300 shadow-md"></div>
                </div>
            </label>'''

new_audio_sync = '''            <label class="flex items-center cursor-pointer gap-2 group">
                <span class="text-[10px] text-emerald-400/80 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">SYNC TO AUDIO</span>
                <div class="relative flex items-center">
                    <input type="checkbox" id="audioSyncToggle" class="sr-only peer" checked onchange="window.toggleAudioSync(this.checked)">
                    <div class="w-8 h-4 bg-black/50 rounded-full shadow-inner border border-emerald-500/30 peer-checked:bg-emerald-900/50 peer-checked:border-emerald-500/50 transition-colors"></div>
                    <div class="absolute left-1 w-2.5 h-2.5 bg-gray-500 rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-3.5 peer-checked:bg-emerald-400"></div>
                </div>
            </label>'''

content = content.replace(old_audio_sync, new_audio_sync)

# Replace the stray style tag associated with the old Audio Sync Toggle
content = re.sub(r'<style>\s*input:checked ~ \.dot \{ transform: translateX\(100\%\); background-color: #60a9ff; \}\s*</style>', '', content)

# Replace Mouse Sync Toggle
old_mouse_sync = '''                <label class="flex items-center cursor-pointer">
                    <span class="text-[10px] text-emerald-400/80 mr-2 uppercase tracking-wider font-bold">Sync to Mouse</span>
                    <div class="relative">
                        <input type="checkbox" id="mouseSyncToggle" class="sr-only" onchange="window.toggleMouseSync(this.checked)">
                        <div class="block bg-black/50 border border-emerald-500/30 w-8 h-4 rounded-full"></div>
                        <div class="dot absolute left-1 top-1 bg-emerald-500 w-2 h-2 rounded-full transition transform"></div>
                    </div>
                </label>'''

new_mouse_sync = '''                <label class="flex items-center cursor-pointer gap-2 group">
                    <span class="text-[10px] text-emerald-400/80 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">SYNC TO MOUSE</span>
                    <div class="relative flex items-center">
                        <input type="checkbox" id="mouseSyncToggle" class="sr-only peer" onchange="window.toggleMouseSync(this.checked)">
                        <div class="w-8 h-4 bg-black/50 rounded-full shadow-inner border border-emerald-500/30 peer-checked:bg-emerald-900/50 peer-checked:border-emerald-500/50 transition-colors"></div>
                        <div class="absolute left-1 w-2.5 h-2.5 bg-gray-500 rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-3.5 peer-checked:bg-emerald-400"></div>
                    </div>
                </label>'''

content = content.replace(old_mouse_sync, new_mouse_sync)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(content)

