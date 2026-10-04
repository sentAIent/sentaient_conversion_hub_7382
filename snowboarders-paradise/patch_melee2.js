const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// 4. Render the weapon (a glowing neon branch) attached to the player
const weaponJSX = `
        {/* Melee Weapon */}
        <group position={[0.8, 1, 0.5]} rotation={weaponRotation.current}>
           <mesh visible={meleeTimer.current > 0 || controls.current.melee}>
              <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
              <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2.0} />
           </mesh>
        </group>
`;

code = code.replace(/<IncredibleSnowboarder animState=\{animState\} colors=\{colors\} \/>/, "<IncredibleSnowboarder animState={animState} colors={colors} />\n" + weaponJSX);

fs.writeFileSync('components/Player.js', code);
