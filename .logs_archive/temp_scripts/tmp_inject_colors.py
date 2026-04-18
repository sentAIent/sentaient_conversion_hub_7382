import sys

path = 'public/mindwave.html'
with open(path, 'r') as f:
    html = f.read()

mapping = {
    'sphereBtn': 'sphere',
    'cubeBtn': 'cube',
    'dragonBtn': 'dragon',
    'galaxyBtn': 'galaxy',
    'flowBtn': 'particles',
    'lightspeedBtn': 'lightspeed',
    'lavaBtn': 'lava',
    'fireplaceBtn': 'fireplace',
    'rainBtn': 'rainforest',
    'zenBtn': 'zengarden',
    'oceanBtn': 'ocean',
    'cyberBtn': 'cyber',
    'matrixBtn': 'matrix',
    'mandalaBtn': 'mandala'
}

for btnId, mode in mapping.items():
    defColor = '#00FF41' if mode in ('cyber', 'matrix') else '#60a9ff'
    tag = f'id="{btnId}"'
    
    btnStart = html.find(tag)
    if btnStart == -1:
        continue
    
    bracketEnd = html.find('>', btnStart)
    
    injectStr = f'\n                    <input type="color" data-visual-color="{mode}" class="absolute -top-1 -left-1 w-4 h-4 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" value="{defColor}">'
    
    if 'data-visual-color' not in html[bracketEnd:bracketEnd+200]:
        html = html[:bracketEnd+1] + injectStr + html[bracketEnd+1:]
        print(f'Injected color picker into {btnId}')

if 'id="cyberColorPicker"' not in html:
    cyberColorStr = '''
                <!-- Color -->
                <div class="flex flex-col gap-0.5 items-center">
                    <label class="text-[8px] text-[var(--text-muted)] uppercase">Color</label>
                    <input type="color" id="cyberColorPicker" value="#00FF41"
                        class="w-8 h-4 rounded cursor-pointer bg-transparent border-none">
                </div>
                <div class="w-px h-6 bg-white/10 mx-0.5"></div>'''
    
    target = '<!-- Mode Selector (4 buttons) -->'
    targetIdx = html.find('id="cyberSettingsPanel"')
    if targetIdx != -1:
        insertPoint = html.find(target, targetIdx)
        if insertPoint != -1:
            html = html[:insertPoint] + cyberColorStr + '\n                ' + html[insertPoint:]
            print('Injected cyberColorPicker')

with open(path, 'w') as f:
    f.write(html)
