import re

with open('src/pages/demo3d/worlds/WorldIcebreaker.jsx', 'r') as f:
    content = f.read()

# Add a connecting sphere to AbstractCavern
sphere_code = """
      <cylinderGeometry args={[120, 120, length, 128, 128, true]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={meltVertexShader}
        fragmentShader={meltFragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.BackSide}
      />
    </mesh>
    <mesh position={[0, 120, 1300]} rotation={[0, 0, 0]}>
       <sphereGeometry args={[120, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
       <shaderMaterial
          vertexShader={meltVertexShader}
          fragmentShader={meltFragmentShader}
          uniforms={uniforms}
          transparent={true}
          side={THREE.BackSide}
       />
    </mesh>
"""

# Wait, if center is z=0 (which is world z=-2550), the intersection is at world z=-1250.
# Local z for world z=-1250 is 1300.
# So position={[0, 0, 1300]}

sphere_code = """
      <cylinderGeometry args={[120, 120, length, 128, 128, true]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={meltVertexShader}
        fragmentShader={meltFragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.BackSide}
      />
    </mesh>
    <mesh position={[0, 0, 1300]}>
       <sphereGeometry args={[120, 64, 64]} />
       <shaderMaterial
          vertexShader={meltVertexShader}
          fragmentShader={meltFragmentShader}
          uniforms={uniforms}
          transparent={true}
          side={THREE.BackSide}
       />
    </mesh>
"""

content = content.replace("""      <cylinderGeometry args={[120, 120, length, 128, 128, true]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={meltVertexShader}
        fragmentShader={meltFragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.BackSide}
      />
    </mesh>""", sphere_code.strip('\n'))

with open('src/pages/demo3d/worlds/WorldIcebreaker.jsx', 'w') as f:
    f.write(content)

print("Icebreaker sphere patched.")
