import re

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'r') as f:
    content = f.read()

# Add useState to React import if not there (it's not)
content = content.replace("import React, { useRef, useMemo } from 'react';", "import React, { useRef, useMemo, useState } from 'react';")
# Add useScroll to drei import
content = content.replace("import { Text } from '@react-three/drei';", "import { Text, useScroll } from '@react-three/drei';")

new_hook_logic = """
const WorldContango = ({ position, rotation, visible }) => {
  const scroll = useScroll();
  const [hasLocked, setHasLocked] = useState(false);

  useFrame(() => {
    if (!visible) return;
    if (scroll.offset > 0.925 && scroll.offset < 0.935 && !hasLocked && !window.contangoLocked) {
      window.contangoLocked = true;
      setHasLocked(true);
      setTimeout(() => {
        window.contangoLocked = false;
      }, 4000);
    }
    if ((scroll.offset < 0.90 || scroll.offset > 0.96) && hasLocked) {
      setHasLocked(false);
      window.contangoLocked = false;
    }
  });

  return (
"""

content = content.replace("const WorldContango = ({ position, rotation, visible }) => {\n  return (", new_hook_logic.strip('\n'))

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'w') as f:
    f.write(content)

print("Contango patched v3.")
