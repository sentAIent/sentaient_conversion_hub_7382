import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    html = f.read()

# Define the master styling dictionary for all 22 classes
class_data = {
    'Class I': { 'theme': 'cyan', 'names': ['QUANTUM SEED', 'VOID RESONANCE', 'HARMONIC LATTICE', 'NEURAL ECHO', 'PHASE SHIFT', 'CRYSTALLINE GRID', 'TEMPORAL FRACTAL', 'CHRONO WAKE', 'SINGULARITY', 'ASTRAL THREAD', 'ENTANGLEMENT', 'TACHYON PULSE', 'NULL SPACE', 'EVENT HORIZON'] },
    'Class II': { 'theme': 'amber', 'names': ['KINETIC SWARM', 'BROWNIAN MOTION', 'SOLAR WIND', 'PLASMA BURST', 'DUST NEBULA', 'ACCRETION DISK', 'FLUX CAPACITANCE', 'ION STORM', 'PHOTON SCATTER', 'ATOMIC SHIVER', 'QUANTUM FOAM', 'GRAVITON WELL'] },
    'Class III': { 'theme': 'teal', 'names': ['LIQUID METAL', 'NON-NEWTONIAN', 'HYDRO DYNAMIC', 'MERCURY DROP', 'ABYSSAL CURRENT', 'DEEP PRESSURE', 'SURFACE TENSION', 'LAMINAR FLOW', 'CAPILLARY', 'VISCOUS DRAG'] },
    'Class IV': { 'theme': 'indigo', 'names': ['KLEIN BOTTLE', 'MOBIUS STRIP', 'HYPERCUBE', 'TESSERACT', 'CALABI-YAU', 'NON-EUCLIDEAN', 'TOROIDAL FIELD', 'FIBRATION'] },
    'Class V': { 'theme': 'yellow', 'names': ['METATRON CUBE', 'FLOWER OF LIFE', 'SEED OF LIFE', 'GOLDEN SPIRAL', 'VESICA PISCIS', 'MERKABA', 'PLATONIC SOLID', 'FIBONACCI', 'SHRI YANTRA', 'STAR TETRAHEDRON'] },
    'Class VI': { 'theme': 'lime', 'names': ['SYNAPSE FIRE', 'AXON PATHWAY', 'DENDRITIC WEB', 'MYELIN SHEATH', 'NEUROTRANSMITTER', 'CORTICAL COLUMN', 'GLIAL MATRIX', 'PURKINJE CELL', 'ACTION POTENTIAL', 'NEURAL PLASTICITY'] },
    'Class VII': { 'theme': 'orange', 'names': ['STELLAR IGNITION', 'NEBULA EXPANSION', 'GAMMA RAY', 'PULSAR BEAM', 'QUASAR JET', 'CORONAL MASS', 'RED GIANT', 'WHITE DWARF', 'NEUTRON STAR', 'EVENT HORIZON'] },
    'Class VIII': { 'theme': 'sky', 'names': ['CHAOTIC ATTRACTOR', 'LORENZ BUTTERFLY', 'TURBULENCE', 'EDDY CURRENT', 'VORTEX STREET', 'CYCLONIC', 'BIFURCATION', 'NONLINEAR', 'FRACTAL BASIN', 'STRANGE ATTRACTOR'] },
    'Class IX': { 'theme': 'slate', 'names': ['MONOLITH', 'CONCRETE GRID', 'REBAR', 'TECTONIC', 'BASALT COLUMN', 'OBSIDIAN SHARD', 'IRON CLAD', 'TITANIUM ALLOY', 'CARBON FIBER', 'TUNGSTEN CORE'] },
    'Class X': { 'theme': 'fuchsia', 'names': ['GLITCH MATRIX', 'VOXEL GRID', 'BIT FLIP', 'SCANLINE', 'CRT PHOSPHOR', 'ARTIFACT', 'HEX DUMP', 'BAUD RATE', 'RASTERIZE', 'DITHER'] },
    'Class XI': { 'theme': 'rose', 'names': ['ELDER FUTHARK', 'OGHAM', 'CUNEIFORM', 'HIEROGLYPH', 'SANSKRIT', 'PETROGLYPH', 'SIGIL', 'TALISMAN', 'GLYPH', 'CIPHER'] },
    'Class XII': { 'theme': 'violet', 'names': ['POLYGON MESH', 'VERTEX SHADER', 'EDGE LOOP', 'NURBS SURFACE', 'SUBDIVISION', 'BEZIER CURVE', 'DELAUNAY', 'VORONOI', 'BARYCENTRIC', 'NORMAL MAP'] },
    'Class XIII': { 'theme': 'purple', 'names': ['AURORA BOREALIS', 'IONOSPHERE', 'SOLAR WIND', 'MAGNETOSPHERE', 'CHERENKOV', 'ST. ELMO', 'BALL LIGHTNING', 'CORONA DISCHARGE', 'GLOW DISCHARGE', 'ARC FLASH'] },
    'Class XIV': { 'theme': 'pink', 'names': ['KALEIDOSCOPE', 'SYMMETRY', 'REFLECTION', 'TESSELLATION', 'FRACTAL CANOPY', 'JULIA SET', 'MANDELBROT', 'SIERPINSKI', 'KOCH SNOWFLAKE', 'DRAGON CURVE'] },
    'Class XV': { 'theme': 'emerald', 'names': ['MOIRE FRINGE', 'DIFFRACTION', 'CONSTRUCTIVE', 'DESTRUCTIVE', 'STANDING WAVE', 'BEAT FREQUENCY', 'RESONANCE', 'HARMONIC', 'OVERTONE', 'MULTIPATH'] },
    'Class XVI': { 'theme': 'red', 'names': ['CHLADNI PLATE', 'FARADAY WAVE', 'STANDING WAVE', 'RESONANT MODE', 'NODAL LINE', 'ANTI-NODE', 'VIBRATION', 'OSCILLATION', 'HARMONIC OSCILLATOR', 'DAMPING'] },
    'Class XVII': { 'theme': 'orange', 'names': ['TETRAHEDRON', 'HEXAHEDRON', 'OCTAHEDRON', 'DODECAHEDRON', 'ICOSAHEDRON', 'SPHERE', 'TORUS', 'CYLINDER', 'CONE', 'PYRAMID'] },
    'Class XVIII': { 'theme': 'blue', 'names': ['HYPERSPHERE', 'GLOME', 'PENTACHORON', 'TESSERACT', 'HEXADECATORON', 'ICOSITETRACHORON', 'HECCATONICOSACHORON', 'HEXACOSIFHORON', 'DUOCYLINDER', 'CLIFFORD TORUS'] },
    'Class XX': { 'theme': 'blue', 'names': ['EULER IDENTITY', 'RIEMANN ZETA', 'FIBONACCI SEQ', 'PRIME SPIRAL', 'GOLDEN RATIO', 'PI TRANSCENDENCE'] },
    'Class XXI': { 'theme': 'fuchsia', 'names': ['MANDELBULB', 'JULIA 3D', 'MENGER SPONGE', 'SIERPINSKI TET', 'GYROID', 'SCHWARZ P'] },
    'Class XXII': { 'theme': 'emerald', 'names': ['FRACTAL HEART', 'FLUID SDF', 'PARTICLE SWARM', 'TOPOLOGY', 'PRIME PRIME', 'METATRON', 'OBSIDIAN GOLD', 'BIOLUMINESCENT', 'NEBULA PLASMA', 'EMERALD MATRIX', 'MERCURY CRIMSON', 'QUANTUM CRYSTAL', 'SOLAR FLARE', 'AMETHYST FRACTAL'] }
}

def get_tailwind_rgb(color):
    # Mapping for shadow RGB values
    mapping = {
        'cyan': '6,182,212', 'amber': '245,158,11', 'teal': '20,184,166',
        'indigo': '99,102,241', 'yellow': '234,179,8', 'lime': '132,204,22',
        'orange': '249,115,22', 'sky': '14,165,233', 'slate': '100,116,139',
        'fuchsia': '217,70,239', 'rose': '244,63,94', 'violet': '139,92,246',
        'purple': '168,85,247', 'pink': '236,72,153', 'emerald': '16,185,129',
        'red': '239,68,68', 'blue': '59,130,246'
    }
    return mapping.get(color, '255,255,255')

def replace_class_container(match):
    block = match.group(0)
    
    # Identify the class
    class_match = re.search(r'Class ([IVX]+):', block)
    if not class_match:
        return block
    class_numeral = f"Class {class_match.group(1)}"
    
    data = class_data.get(class_numeral)
    if not data:
        return block
        
    theme = data['theme']
    rgb = get_tailwind_rgb(theme)
    
    # 1. Update Header Style
    # Find the h4 tag and replace its classes to match the theme
    header_pattern = re.compile(r'<h4 class="[^"]*">')
    new_header_classes = f'<h4 class="text-[12px] text-{theme}-400 uppercase tracking-[0.2em] mb-3 border-b border-{theme}-500/30 pb-1 font-extrabold">'
    block = header_pattern.sub(new_header_classes, block, count=1)
    
    # 2. Update Button Styles and Labels
    # Iterate through each button and sequentially assign names
    buttons = re.findall(r'<button class="cymatics-pattern-btn[^>]*>.*?</button>', block, re.DOTALL)
    for i, btn in enumerate(buttons):
        # Upgrade button border/hover/shadow
        new_btn = re.sub(
            r'class="cymatics-pattern-btn[^"]*"',
            f'class="cymatics-pattern-btn aspect-square rounded-lg overflow-hidden border border-{theme}-500/40 hover:border-{theme}-400 transition-all group relative shadow-[0_0_15px_rgba({rgb},0.2)] hover:shadow-[0_0_20px_rgba({rgb},0.6)]"',
            btn
        )
        
        # Upgrade internal gradient
        new_btn = re.sub(
            r'<div class="absolute inset-0 bg-[^"]*"></div>',
            f'<div class="absolute inset-0 bg-gradient-to-t from-{theme}-900/80 to-transparent"></div>',
            new_btn
        )
        
        # Ensure label exists and replace its text & styling
        name = data['names'][i] if i < len(data['names']) else f"PATTERN {i+1}"
        new_btn = re.sub(
            r'<div class="absolute bottom-[^>]*>.*?</div>',
            f'<div class="absolute bottom-2 left-2 text-[9px] text-white font-black tracking-widest uppercase">{name}</div>',
            new_btn
        )
        
        block = block.replace(btn, new_btn)

    # 3. Upgrade the Controls Container
    block = block.replace('<div class="mt-3 flex gap-2">', f'<div class="mt-3 flex gap-3 p-3 bg-black/40 backdrop-blur-md rounded-xl border border-{theme}-500/20 shadow-inner items-center">')
    
    # 4. Make labels on the sliders look cleaner
    block = re.sub(r'<span class="text-\[8px\][^>]*>Intensity</span>', r'<span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-2">Intensity</span>', block)
    block = re.sub(r'<span class="text-\[8px\][^>]*>Speed</span>', r'<span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-2">Speed</span>', block)

    return block

# Apply the regex substitution to each cymatics-class-container
new_html = re.sub(r'<div class="cymatics-class-container.*?(?=<div class="cymatics-class-container|<div id="tab-controls)', replace_class_container, html, flags=re.DOTALL)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(new_html)

print("Overhaul complete.")
