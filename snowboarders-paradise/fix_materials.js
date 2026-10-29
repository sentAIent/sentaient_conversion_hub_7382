const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

// We need to import THREE
if (!code.includes("import * as THREE from 'three';")) {
  code = "import * as THREE from 'three';\n" + code;
}

code = code.replace(/import React, \{ useRef \} from 'react';/, "import React, { useRef, useMemo } from 'react';");

const oldMats = `  const paintMat = <meshPhysicalMaterial color="#080808" metalness={0.8} roughness={0.15} clearcoat={1.0} />;
  const accentMat = <meshPhysicalMaterial color="#ff2200" metalness={0.5} roughness={0.2} clearcoat={1.0} />;
  const glassMat = <meshPhysicalMaterial color="#000000" metalness={0.9} roughness={0.0} transmission={0.5} transparent opacity={0.7} />;
  const metalMat = <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.4} />;`;

const newMats = `  const paintMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#080808", metalness: 0.8, roughness: 0.15, clearcoat: 1.0 }), []);
  const accentMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#ff2200", metalness: 0.5, roughness: 0.2, clearcoat: 1.0 }), []);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#000000", metalness: 0.9, roughness: 0.0, transmission: 0.5, transparent: true, opacity: 0.7 }), []);
  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#444444", metalness: 0.9, roughness: 0.4 }), []);`;

code = code.replace(oldMats, newMats);

// Now replace all {paintMat} with nothing, and add material={paintMat} to the <mesh> above it.
// This is easily done via regex.
code = code.replace(/<mesh(.*?)>\s*<capsuleGeometry(.*?)\/>\s*\{paintMat\}\s*<\/mesh>/g, '<mesh$1 material={paintMat}>\n        <capsuleGeometry$2/>\n      </mesh>');
code = code.replace(/<mesh(.*?)>\s*<capsuleGeometry(.*?)\/>\s*\{glassMat\}\s*<\/mesh>/g, '<mesh$1 material={glassMat}>\n        <capsuleGeometry$2/>\n      </mesh>');
code = code.replace(/<mesh(.*?)>\s*<cylinderGeometry(.*?)\/>\s*\{accentMat\}\s*<\/mesh>/g, '<mesh$1 material={accentMat}>\n        <cylinderGeometry$2/>\n      </mesh>');
code = code.replace(/<mesh(.*?)>\s*<cylinderGeometry(.*?)\/>\s*\{paintMat\}\s*<\/mesh>/g, '<mesh$1 material={paintMat}>\n        <cylinderGeometry$2/>\n      </mesh>');
code = code.replace(/<mesh(.*?)>\s*<boxGeometry(.*?)\/>\s*\{accentMat\}\s*<\/mesh>/g, '<mesh$1 material={accentMat}>\n        <boxGeometry$2/>\n      </mesh>');
code = code.replace(/<mesh(.*?)>\s*<boxGeometry(.*?)\/>\s*\{paintMat\}\s*<\/mesh>/g, '<mesh$1 material={paintMat}>\n        <boxGeometry$2/>\n      </mesh>');
code = code.replace(/<mesh(.*?)>\s*<cylinderGeometry(.*?)\/>\s*\{metalMat\}\s*<\/mesh>/g, '<mesh$1 material={metalMat}>\n        <cylinderGeometry$2/>\n      </mesh>');


fs.writeFileSync('components/DetailedModels.js', code);
