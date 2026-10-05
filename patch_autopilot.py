import re

with open('src/pages/demo3d/worlds/WorldAutopilot.jsx', 'r') as f:
    content = f.read()

# Fix CSP fonts
content = content.replace('<Text', '<Text font="/fonts/Roboto.woff" fallbackFonts={[]}')

# Add useScroll if not imported
if 'useScroll' not in content:
    content = content.replace("import { Text }", "import { Text, useScroll }")

# Add lock logic to WorldAutopilot
lock_logic = """
  const scroll = useScroll();
  const [hasLocked, setHasLocked] = useState(false);

  useFrame(() => {
    if (!visible) return;
    if (scroll.offset > 0.575 && scroll.offset < 0.595 && !hasLocked && !window.autopilotLocked) {
      window.autopilotLocked = true;
      setHasLocked(true);
      setTimeout(() => {
        window.autopilotLocked = false;
      }, 1500);
    }
    if ((scroll.offset < 0.55 || scroll.offset > 0.62) && hasLocked) {
      setHasLocked(false);
      window.autopilotLocked = false;
    }
  });
"""

if 'setHasLocked' not in content:
    content = content.replace('  const [logoTexture, setLogoTexture] = useState(null);', '  const [logoTexture, setLogoTexture] = useState(null);\n' + lock_logic)

with open('src/pages/demo3d/worlds/WorldAutopilot.jsx', 'w') as f:
    f.write(content)

print("Autopilot patched.")
