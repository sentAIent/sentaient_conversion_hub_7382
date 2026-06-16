import re

visualizer_files = [
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js',
    'binaural-assets/js/visuals/visualizer_vGOLD_SYNC_RESTORED_GOLD.js'
]

new_registry = """    static get CYMATIC_PATTERNS() {
        return [
            // The 6 Newly Authorized Core UI Patterns
            { name: "3D Fractal Heart", classId: 19, variationId: 0, cat: 'advanced' },
            { name: "Fluid SDF Core", classId: 19, variationId: 1, cat: 'advanced' },
            { name: "Particle Swarm", classId: 19, variationId: 2, cat: 'advanced' },
            { name: "Quantum Topology", classId: 19, variationId: 3, cat: 'advanced' },
            { name: "Prime Prime", classId: 19, variationId: 4, cat: 'advanced' },
            { name: "Metatron's Grid", classId: 19, variationId: 5, cat: 'advanced' },

            // Additional Legacy Math Equivalents (mapped to CymaticsCore Classes)
            { name: "Sacred Resonance", classId: 1, variationId: 0, cat: 'sacred' },
            { name: "Plasma Bloom", classId: 2, variationId: 1, cat: 'fractal' },
            { name: "Neural Web", classId: 3, variationId: 2, cat: 'complex' },
            { name: "Void Geometry", classId: 4, variationId: 3, cat: 'geometry' },
            { name: "Mandelbrot Fold", classId: 5, variationId: 4, cat: 'fractal' },
            { name: "Celestial", classId: 6, variationId: 5, cat: 'radial' },
            { name: "Cosmic Knot", classId: 7, variationId: 6, cat: 'complex' },
            { name: "Synchronicity", classId: 8, variationId: 7, cat: 'sacred' },
            { name: "Aetheric Weaver", classId: 9, variationId: 8, cat: 'advanced' },
            
            // Full 30 Image-Based High-End Patterns (Class 22)
            { name: "Fractal Heart", classId: 22, variationId: 0, cat: "advanced" },
            { name: "Fluid Sdf", classId: 22, variationId: 1, cat: "advanced" },
            { name: "Particle Swarm", classId: 22, variationId: 2, cat: "advanced" },
            { name: "Topology", classId: 22, variationId: 3, cat: "advanced" },
            { name: "Prime Prime", classId: 22, variationId: 4, cat: "advanced" },
            { name: "Metatron", classId: 22, variationId: 5, cat: "advanced" },
            { name: "Sacred Gold Obsidian", classId: 22, variationId: 6, cat: "sacred" },
            { name: "Biolum Abyssal", classId: 22, variationId: 7, cat: "complex" },
            { name: "Nebula Plasma", classId: 22, variationId: 8, cat: "radial" },
            { name: "Emerald Cyber Matrix", classId: 22, variationId: 9, cat: "geometry" },
            { name: "Mercury Crimson", classId: 22, variationId: 10, cat: "complex" },
            { name: "Quantum Crystal Lattice", classId: 22, variationId: 11, cat: "fractal" },
            { name: "Solar Flare Harmonics", classId: 22, variationId: 12, cat: "radial" },
            { name: "Amethyst Hyperdimensional", classId: 22, variationId: 13, cat: "fractal" },
            { name: "Astral Lotus", classId: 22, variationId: 14, cat: "sacred" },
            { name: "Celestial Mandala", classId: 22, variationId: 15, cat: "geometry" },
            { name: "Quantum Flower", classId: 22, variationId: 16, cat: "fractal" },
            { name: "Ethereal Nexus", classId: 22, variationId: 17, cat: "complex" },
            { name: "Neon Labyrinth", classId: 22, variationId: 18, cat: "advanced" },
            { name: "Prismatic Core", classId: 22, variationId: 19, cat: "geometry" },
            { name: "Obsidian Bloom", classId: 22, variationId: 20, cat: "fractal" },
            { name: "Void Resonance", classId: 22, variationId: 21, cat: "radial" },
            { name: "Golden Ratio Spiral", classId: 22, variationId: 22, cat: "sacred" },
            { name: "Sacred Sun Resonance", classId: 22, variationId: 23, cat: "sacred" },
            { name: "Lunar Tides", classId: 22, variationId: 24, cat: "sacred" },
            { name: "Cybernetic Lotus", classId: 22, variationId: 25, cat: "advanced" },
            { name: "Biolum Shroom", classId: 22, variationId: 26, cat: "fractal" },
            { name: "Vortex Of Time", classId: 22, variationId: 27, cat: "complex" },
            { name: "Diamond Lattice", classId: 22, variationId: 28, cat: "geometry" },
            { name: "Seraphim Wings", classId: 22, variationId: 29, cat: "sacred" }
        ];
    }"""

for f in visualizer_files:
    try:
        with open(f, 'r') as file:
            content = file.read()
        
        # Safe string replacement by finding exactly the chunk to replace
        start_idx = content.find("static get CYMATIC_PATTERNS() {")
        if start_idx != -1:
            end_idx = content.find("    }", start_idx) + 5
            old_chunk = content[start_idx:end_idx]
            
            content = content.replace(old_chunk, new_registry)
            
            with open(f, 'w') as file:
                file.write(content)
            print(f"Patched {f} safely.")
        else:
            print(f"Could not find CYMATIC_PATTERNS in {f}")
            
    except Exception as e:
        print(f"Failed {f}: {e}")
