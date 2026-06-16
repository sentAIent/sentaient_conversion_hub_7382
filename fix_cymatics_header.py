import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    html = f.read()

old_header = '''    <div class="sidebar-section">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-xs font-bold text-gray-300 uppercase tracking-wider"><i class="fas fa-wave-square mr-2" style="color: #60a9ff;"></i>Cymatics Engine</h3>
            

        <style>
            input.custom-sync-toggle:checked ~ .toggle-bg { background-color: rgba(6, 78, 59, 0.5); border-color: rgba(16, 185, 129, 0.5); }
            input.custom-sync-toggle:checked ~ .dot { transform: translateX(100%); background-color: #34d399; }
        </style>
            <label class="flex items-center cursor-pointer gap-2 group">
                <span class="text-[10px] text-emerald-400/80 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">SYNC TO AUDIO</span>
                <div class="relative">
                    <input type="checkbox" id="audioSyncToggle" class="sr-only custom-sync-toggle" checked onchange="window.toggleAudioSync(this.checked)">
                    <div class="block bg-black/50 border border-emerald-500/30 w-8 h-4 rounded-full transition-colors toggle-bg"></div>
                    <div class="dot absolute left-1 top-0.5 bg-gray-400 w-3 h-3 rounded-full transition-transform duration-300 shadow-md"></div>
                </div>
            </label>
        </div>'''

new_header = '''    <div class="sidebar-section">
        <div class="flex items-center justify-between mb-4 border-b border-sky-500/30 pb-2">
            <h3 class="text-[12px] text-sky-400 uppercase tracking-[0.2em] font-extrabold flex items-center">
                <i class="fas fa-wave-square mr-3 text-sky-400/80"></i>CYMATICS ENGINE
            </h3>
            
            <style>
                input.global-sync-toggle:checked ~ .toggle-bg { background-color: rgba(14, 165, 233, 0.2); border-color: rgba(14, 165, 233, 0.5); }
                input.global-sync-toggle:checked ~ .dot { transform: translateX(100%); background-color: #38bdf8; }
            </style>
            <label class="flex items-center cursor-pointer gap-2 group">
                <span class="text-[10px] text-sky-400/80 uppercase tracking-widest font-bold group-hover:text-sky-400 transition-colors">SYNC TO AUDIO</span>
                <div class="relative">
                    <input type="checkbox" id="audioSyncToggle" class="sr-only global-sync-toggle" checked onchange="window.toggleAudioSync(this.checked)">
                    <div class="block bg-black/50 border border-sky-500/30 w-8 h-4 rounded-full transition-colors toggle-bg"></div>
                    <div class="dot absolute left-1 top-0.5 bg-gray-400 w-3 h-3 rounded-full transition-transform duration-300 shadow-md"></div>
                </div>
            </label>
        </div>'''

if old_header in html:
    html = html.replace(old_header, new_header)
    with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
        f.write(html)
    print("Fixed cymatics tab header.")
else:
    print("Could not find the old header exactly as written.")
