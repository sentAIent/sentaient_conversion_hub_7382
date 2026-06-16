def patch_cymatics(filepath):
    print(f"Patching Cymatics in {filepath}...")
    with open(filepath, 'r') as f:
        content = f.read()

    target_str = """                            <div class="flex flex-col gap-0.5 w-full mb-2">
                                <div class="flex justify-between px-0.5">
                                    <label class="text-[10px] text-purple-300/50 uppercase font-mono">RESONANCE INTENSITY</label>
                                    <span id="cymaticsIntensityVal" class="text-[10px] text-purple-300 font-mono">Auto</span>
                                </div>
                                <input type="range" id="cymaticsIntensitySlider" min="0" max="1" step="0.05" value="0" class="mw-slider">
                            </div>"""

    if target_str not in content:
        # Try a slightly looser match in case indentation/newlines vary slightly
        target_str_loose = 'id="cymaticsIntensitySlider" min="0" max="1" step="0.05" value="0" class="mw-slider">\n                            </div>'
        pos = content.find(target_str_loose)
        if pos == -1:
            print("Could not find targets!")
            return False
        # Calculate replacement point
        replace_pos = pos + len(target_str_loose)
    else:
        replace_pos = content.find(target_str) + len(target_str)

    new_controls = """

                            <!-- Color Picker & Harmonics Grid -->
                            <div class="grid grid-cols-2 gap-4 w-full mb-2">
                                <!-- Color Picker -->
                                <div class="flex flex-col gap-1">
                                    <label class="text-[10px] text-purple-300/50 uppercase font-mono">COLOR RESONANCE</label>
                                    <div class="flex items-center gap-2 mt-0.5">
                                        <input type="color" id="cymaticsColorPicker" value="#2dd4bf"
                                            class="w-10 h-6 rounded cursor-pointer bg-transparent border border-purple-400/25">
                                        <span class="text-[10px] text-purple-300/70 font-mono">Palette</span>
                                    </div>
                                </div>

                                <!-- Harmonics Slider -->
                                <div class="flex flex-col gap-0.5">
                                    <div class="flex justify-between px-0.5">
                                        <label class="text-[10px] text-purple-300/50 uppercase font-mono">HARMONICS</label>
                                        <span id="cymaticsHarmonicsVal" class="text-[10px] text-purple-300 font-mono">0%</span>
                                    </div>
                                    <input type="range" id="cymaticsHarmonicsSlider" min="0" max="1" step="0.01" value="0"
                                        class="mw-slider" style="accent-color: #60a9ff;">
                                </div>
                            </div>

                            <!-- Medium Selection Buttons -->
                            <div class="flex flex-col gap-1.5 w-full mb-4">
                                <label class="text-[10px] text-purple-300/50 uppercase font-mono px-0.5">MEDIUM DENSITY</label>
                                <div class="grid grid-cols-4 gap-2">
                                    <button onclick="setCymaticMedium(0)" class="cym-medium-btn active px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-blue-300 hover:bg-blue-500/10 transition-all uppercase leading-none text-center">H2O</button>
                                    <button onclick="setCymaticMedium(1)" class="cym-medium-btn px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-yellow-300 hover:bg-yellow-500/10 transition-all uppercase leading-none text-center">SiO2</button>
                                    <button onclick="setCymaticMedium(2)" class="cym-medium-btn px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-purple-300 hover:bg-purple-500/10 transition-all uppercase leading-none text-center">Ether</button>
                                    <button onclick="setCymaticMedium(3)" class="cym-medium-btn px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-sky-200 hover:bg-sky-500/10 transition-all uppercase leading-none text-center">Ice</button>
                                </div>
                            </div>"""

    new_content = content[:replace_pos] + new_controls + content[replace_pos:]
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print(f"Successfully patched Cymatics in {filepath}!")
    return True

patch_cymatics('public/mindwave.html')
patch_cymatics('public/index.html')
