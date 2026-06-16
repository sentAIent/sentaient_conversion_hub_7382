import re

html_file = 'mindwave.html'
with open(html_file, 'r') as f:
    html = f.read()

# 1. Add the new tab navigation pill
nav_pattern = r'(<div class="tab-pill active flex-1"[^>]*>Cymatics</div>)'
new_nav = r'\1\n            <div class="tab-pill flex-1" onclick="switchRightTab(\'newcymatics\', this)" title="Advanced & New Cymatics">Cymatics II</div>'
html = re.sub(nav_pattern, new_nav, html)

# Find the index of data-idx="59"
idx_59 = html.find('data-idx="59"')
if idx_59 != -1:
    # Find the nearest <button backwards
    btn_idx = html.rfind('<button', 0, idx_59)
    if btn_idx != -1:
        # The end of the grid is marked by `</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n            <!-- TAB: VISUALS -->`
        end_idx = html.find('</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>', btn_idx)
        
        if end_idx != -1:
            extracted_buttons = html[btn_idx:end_idx]
            
            # Remove buttons above 68 since they don't exist in CYMATIC_PATTERNS
            lines = extracted_buttons.split('\n')
            filtered_lines = []
            skip = False
            for line in lines:
                if 'onclick="selectCymaticPattern(69)"' in line or 'onclick="selectCymaticPattern(70)"' in line or 'onclick="selectCymaticPattern(71)"' in line:
                    skip = True
                if skip and '</button>' in line:
                    skip = False
                    continue
                if not skip:
                    filtered_lines.append(line)
            
            filtered_buttons = '\n'.join(filtered_lines)
            
            # Create the new tab panel
            new_tab_panel = f"""
            <!-- TAB: NEW CYMATICS -->
            <div id="tab-newcymatics" class="tab-panel hidden space-y-6">
                <div class="sidebar-section" data-section="newcymatics">
                    <div class="sidebar-section-header cursor-pointer" onclick="toggleMixerSection('newcymatics')">
                        <div class="flex items-center gap-4">
                            <h3 class="section-label m-0">Advanced & New Cymatics</h3>
                            <div class="h-px bg-white/10 flex-1"></div>
                        </div>
                    </div>
                    <div class="sidebar-section-content mt-4" id="section-newcymatics">
                        <div class="mt-2">
                            <h4 class="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
                                Pixel Stardust & Harmonic Gradients
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
{filtered_buttons}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
"""
            
            # Remove the extracted buttons from their original location
            html = html[:btn_idx] + html[end_idx:]
            
            # Insert the new tab panel right before the VISUALS tab
            visuals_tab_idx = html.find('<!-- TAB: VISUALS -->')
            if visuals_tab_idx != -1:
                html = html[:visuals_tab_idx] + new_tab_panel + '\n' + html[visuals_tab_idx:]
                
                with open(html_file, 'w') as f:
                    f.write(html)
                print("Successfully extracted new cymatics to a new tab!")
            else:
                print("Error: Could not find VISUALS tab.")
        else:
            print("Error: Could not find the end of the grid.")
    else:
        print("Error: Could not find the button preceding 59.")
else:
    print("Error: Could not find data-idx=59.")
