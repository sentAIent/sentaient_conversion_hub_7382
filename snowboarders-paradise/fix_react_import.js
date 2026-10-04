const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

// The file has two sets of imports at the top:
// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useGLTF, useAnimations } from '@react-three/drei';
// 
// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';

const duplicated = `import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

`;

code = code.replace(duplicated, "");

fs.writeFileSync('components/DetailedModels.js', code);
