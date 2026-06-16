import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    html = f.read()

images = [
    'binaural-assets/images/cymatics/cymatics_fractal_heart_1779756441610.png',
    'binaural-assets/images/cymatics/cymatics_fluid_sdf_1779756501734.png',
    'binaural-assets/images/cymatics/cymatics_particle_swarm_1779756471939.png',
    'binaural-assets/images/cymatics/cymatics_quantum_topology_1779756531135.png',
    'binaural-assets/images/prime_prime.png',
    'binaural-assets/images/metatrons_grid.png',
    'binaural-assets/images/cymatics/cymatics_obsidian_gold_1780027096419.png',
    'binaural-assets/images/cymatics/cymatics_bioluminescent_1780027112830.png',
    'binaural-assets/images/cymatics/cymatics_nebula_plasma_1780027130267.png',
    'binaural-assets/images/cymatics/cymatics_emerald_matrix_1780027144663.png',
    'binaural-assets/images/cymatics/cymatics_mercury_crimson_1780027165618.png',
    'binaural-assets/images/cymatics/cymatics_quantum_crystal_1780027180388.png'
]

for i in range(12):
    # Find the button that calls setCymaticPattern(22, i) and replace its child img src
    pattern = r'(onclick="window\.setCymaticPattern\(22,\s*' + str(i) + r'\)".*?<img src=")([^"]+)(")'
    def replacer(match):
        return match.group(1) + images[i] + match.group(3)
    
    html = re.sub(pattern, replacer, html, flags=re.DOTALL)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(html)
print("Restored Class XXII images.")
