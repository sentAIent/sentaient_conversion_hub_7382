import os

texUrls = [
    'binaural-assets/images/cymatics/cymatics_fractal_heart_1779756441610.png',
    'binaural-assets/images/cymatics/cymatics_fluid_sdf_1779756501734.png',
    'binaural-assets/images/cymatics/cymatics_particle_swarm_1779756471939.png',
    'binaural-assets/images/cymatics/cymatics_quantum_topology_1779756531135.png',
    'binaural-assets/images/cymatics/ai_cymatic_15_1779566362935.png',
    'binaural-assets/images/cymatics/ai_cymatic_16_1779566377245.png',
    'binaural-assets/images/cymatics/cymatic_sacred_gold_obsidian.png',
    'binaural-assets/images/cymatics/cymatic_biolum_abyssal.png',
    'binaural-assets/images/cymatics/cymatic_nebula_plasma.png',
    'binaural-assets/images/cymatics/cymatic_emerald_cyber_matrix.png',
    'binaural-assets/images/cymatics/cymatic_liquid_mercury_crimson.png',
    'binaural-assets/images/cymatics/cymatic_quantum_crystal_lattice.png',
    'binaural-assets/images/cymatics/cymatic_solar_flare_harmonics.png',
    'binaural-assets/images/cymatics/cymatic_amethyst_hyperdimensional.png',
    'binaural-assets/images/cymatics/cymatic_astral_lotus.png',
    'binaural-assets/images/cymatics/cymatic_celestial_mandala.png',
    'binaural-assets/images/cymatics/cymatic_quantum_flower.png',
    'binaural-assets/images/cymatics/cymatic_ethereal_nexus.png',
    'binaural-assets/images/cymatics/cymatic_neon_labyrinth.png',
    'binaural-assets/images/cymatics/cymatic_prismatic_core.png',
    'binaural-assets/images/cymatics/cymatic_obsidian_bloom.png',
    'binaural-assets/images/cymatics/cymatic_void_resonance.png',
    'binaural-assets/images/cymatics/cymatic_golden_ratio_spiral.png',
    'binaural-assets/images/cymatics/cymatic_sacred_sun_resonance.png',
    'binaural-assets/images/cymatics/cymatic_lunar_tides.png',
    'binaural-assets/images/cymatics/cymatic_cybernetic_lotus.png',
    'binaural-assets/images/cymatics/cymatic_bioluminescent_shroom.png',
    'binaural-assets/images/cymatics/cymatic_vortex_of_time.png',
    'binaural-assets/images/cymatics/cymatic_diamond_lattice.png',
    'binaural-assets/images/cymatics/cymatic_seraphim_wings.png'
]

base_dir = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/'

missing = []
for url in texUrls:
    full_path = os.path.join(base_dir, url)
    if not os.path.exists(full_path):
        missing.append(url)

if missing:
    print("MISSING FILES:")
    for m in missing:
        print(m)
else:
    print("All files exist.")
