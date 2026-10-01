import re

with open('src/pages/demo3d/worlds/WorldFantasyQuant.jsx', 'r') as f:
    content = f.read()

if 'fantasy_quant_stadium.jpg' not in content:
    # We need to import useLoader and THREE.TextureLoader
    # It already imports THREE and useLoader probably
    
    # Insert the loader into WorldFantasyQuant
    loader_code = """
  const stadiumTex = useLoader(THREE.TextureLoader, '/fantasy_quant_stadium.jpg');
  stadiumTex.colorSpace = THREE.SRGBColorSpace;
  stadiumTex.wrapS = THREE.RepeatWrapping;
  stadiumTex.repeat.set(-1, 1);
"""
    content = content.replace('const WorldFantasyQuant = ({ position, rotation, visible }) => {', 
                              'const WorldFantasyQuant = ({ position, rotation, visible }) => {\n' + loader_code)
                              
    # Replace the dark sphere material
    content = content.replace('<meshBasicMaterial color="#000205" side={THREE.BackSide} />', 
                              '<meshBasicMaterial map={stadiumTex} side={THREE.BackSide} />')
                              
    with open('src/pages/demo3d/worlds/WorldFantasyQuant.jsx', 'w') as f:
        f.write(content)
    print("Added stadium texture back.")
else:
    print("Texture already there.")
