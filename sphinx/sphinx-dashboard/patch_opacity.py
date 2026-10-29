import re

with open('src/components/SphinxMap.tsx', 'r') as f:
    content = f.read()

# 1. Add state for hover
state_addition = "const [hoveredLegendLayer, setHoveredLegendLayer] = useState<string | null>(null);\n\n  const getOpacity = (layerName: string, defaultOpacity = 1) => {\n    if (hoveredLegendLayer && hoveredLegendLayer !== layerName) return 0.1;\n    return defaultOpacity;\n  };\n"

if 'const [hoveredLegendLayer' not in content:
    content = content.replace('const [isDrawing, setIsDrawing] = useState(false);', 'const [isDrawing, setIsDrawing] = useState(false);\n  ' + state_addition)

# 2. Add onMouseEnter / onMouseLeave to legend items
# The legend items look like: <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1 rounded transition-colors ${!settings.layers.aircraft ? 'opacity-50' : ''}`} onClick={() => toggleLayer('aircraft')}>
def replace_legend(m):
    layer = m.group(1)
    # inject onMouseEnter and onMouseLeave
    return f"onClick={{() => toggleLayer('{layer}')}} onMouseEnter={{() => setHoveredLegendLayer('{layer}')}} onMouseLeave={{() => setHoveredLegendLayer(null)}}"

content = re.sub(r"onClick=\{\(\) => toggleLayer\('([^']+)'\)\}", replace_legend, content)

# 3. Add opacity to paint props
# For circle layers
def replace_circle_paint(m):
    id_str = m.group(1)
    layer_name = m.group(2)
    radius = m.group(3)
    color = m.group(4)
    extra = m.group(5) or ""
    # if it already has opacity, we need to respect the default
    if 'circle-opacity' in extra:
        # don't mess with it if it's already there or complex, or parse it
        pass
    
    # We can just replace the paint string with a dynamic object
    if layer_name == 'disasters':
        return f'<Layer id="{id_str}" source="{layer_name}" type="circle" paint={{{{ \'circle-radius\': 8, \'circle-color\': \'#ef4444\', \'circle-opacity\': getOpacity(\'{layer_name}\', 0.7) }}}} />'
    
    return f'<Layer id="{id_str}" source="{layer_name}" type="circle" paint={{{{ \'circle-radius\': {radius}, \'circle-color\': \'{color}\', \'circle-opacity\': getOpacity(\'{layer_name}\') {extra} }}}} />'

content = re.sub(r'<Layer id="([^"]+)" source="([^"]+)" type="circle" paint=\{\{ \'circle-radius\': ([0-9]+), \'circle-color\': \'([^\']+)\'(, \'circle-opacity\': [0-9.]+)?(.*?)\}\} />', replace_circle_paint, content)

# Also fix the multi-line aircraft and cell-towers and springs
# Wait, let's see how they are structured.
with open('src/components/SphinxMap.tsx', 'w') as f:
    f.write(content)

