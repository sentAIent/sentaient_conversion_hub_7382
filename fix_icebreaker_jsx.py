with open('src/pages/demo3d/worlds/WorldIcebreaker.jsx', 'r') as f:
    content = f.read()

# We need to wrap the return of AbstractCavern in <group>
old_code = """
  return (
    <mesh ref={meshRef} position={[0, 0, centerZ]} rotation={[Math.PI / 2, 0, 0]}>
      {/* High segments for smooth vertex displacement */}
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
  );
"""

new_code = """
  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, centerZ]} rotation={[Math.PI / 2, 0, 0]}>
        {/* High segments for smooth vertex displacement */}
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
    </group>
  );
"""

content = content.replace(old_code.strip('\n'), new_code.strip('\n'))

with open('src/pages/demo3d/worlds/WorldIcebreaker.jsx', 'w') as f:
    f.write(content)

print("Icebreaker JSX fixed.")
