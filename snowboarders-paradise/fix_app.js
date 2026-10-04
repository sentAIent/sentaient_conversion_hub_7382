const fs = require('fs');
let app = fs.readFileSync('App.js', 'utf8');
app = app.replace("import { Sky, Environment, OrbitControls, KeyboardControls } from '@react-three/drei';", "import { Sky, Environment, OrbitControls, KeyboardControls } from '@react-three/drei';\nimport { Suspense } from 'react';");
app = app.replace("<Physics gravity={[0, -20, 0]}>", "<Suspense fallback={null}>\n          <Physics gravity={[0, -20, 0]}>");
app = app.replace("</Physics>", "</Physics>\n        </Suspense>");
fs.writeFileSync('App.js', app);
