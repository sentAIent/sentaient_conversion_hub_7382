import os
import shutil

mappings = {
    'cymatic_sacred_gold_obsidian.png': 'cymatic_sacred_gold_obsidian_1780074972708.png',
    'cymatic_biolum_abyssal.png': 'cymatic_biolum_abyssal_1780074986121.png',
    'cymatic_nebula_plasma.png': 'cymatic_nebula_plasma_1780075000651.png',
    'cymatic_emerald_cyber_matrix.png': 'cymatic_emerald_cyber_matrix_1780075014463.png',
    'cymatic_liquid_mercury_crimson.png': 'cymatic_liquid_mercury_crimson_1780075027538.png',
    'cymatic_quantum_crystal_lattice.png': 'cymatic_quantum_crystal_lattice_1780075041436.png',
    'cymatic_solar_flare_harmonics.png': 'cymatic_solar_flare_harmonics_1780075056210.png',
    'cymatic_amethyst_hyperdimensional.png': 'cymatic_amethyst_hyperdimensional_1780075070248.png',
    'cymatic_astral_lotus.png': 'cymatic_astral_lotus_1780087995392.png',
    'cymatic_celestial_mandala.png': 'cymatic_celestial_mandala_1780088009195.png',
    'cymatic_quantum_flower.png': 'cymatic_quantum_flower_1780088022941.png',
    'cymatic_ethereal_nexus.png': 'cymatic_ethereal_nexus_1780088049823.png',
    'cymatic_neon_labyrinth.png': 'cymatic_neon_labyrinth_1780088066902.png',
    'cymatic_prismatic_core.png': 'cymatic_prismatic_core_1780088082249.png',
    'cymatic_obsidian_bloom.png': 'cymatic_obsidian_bloom_1780088109607.png',
    'cymatic_void_resonance.png': 'cymatic_void_resonance_1780088122410.png',
    'cymatic_golden_ratio_spiral.png': 'cymatic_golden_ratio_spiral_1780088135082.png',
    'cymatic_sacred_sun_resonance.png': 'cymatic_sacred_sun_resonance_1780093027393.png',
    'cymatic_lunar_tides.png': 'cymatic_lunar_tides_1780093038300.png',
    'cymatic_cybernetic_lotus.png': 'cymatic_cybernetic_lotus_1780093051788.png',
    'cymatic_bioluminescent_shroom.png': 'cymatic_bioluminescent_shroom_1780093078972.png',
    'cymatic_vortex_of_time.png': 'cymatic_vortex_of_time_1780093096305.png',
    'cymatic_diamond_lattice.png': 'cymatic_diamond_lattice_1780093113277.png',
    'cymatic_seraphim_wings.png': 'cymatic_seraphim_wings_1780093139601.png'
}

src_dir = '/Users/infinitealpha/.gemini/antigravity/brain/189289ec-e102-4d2c-8d8b-4524d67c5db2/'
dest_dir = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/images/cymatics/'

os.makedirs(dest_dir, exist_ok=True)

success = 0
failed = []

for final_name, artifact_name in mappings.items():
    src_path = os.path.join(src_dir, artifact_name)
    dest_path = os.path.join(dest_dir, final_name)
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        success += 1
    else:
        failed.append(artifact_name)

print(f"Successfully copied {success} files.")
if failed:
    print("Failed to find:")
    for f in failed:
        print(f)
