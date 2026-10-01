import re

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'r') as f:
    content = f.read()

# Replace the texture path
content = content.replace("'/assets/images/contango_logo.png'", "'/assets/images/contango_quant_logo_new.png'")

# Replace the HUD
old_hud = """
      {/* Hovering Hologram HUD */}
      <group position={[0, 5, -50]}>


        {/* The Logo */}
        <mesh position={[0, 10, 0]}>
          <planeGeometry args={[40, 20]} />
          <meshBasicMaterial map={texture} transparent opacity={0.9} depthWrite={false} />
        </mesh>

        {/* Analytics UI Elements */}
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[-30, 20, 0]} fontSize={4} color="#00ff00" anchorX="left">BTC/USD  +5.42%</Text>
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[-30, 14, 0]} fontSize={3} color="#ffffff" anchorX="left">VOL: 1.2M</Text>
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[-30, 9, 0]} fontSize={3} color="#00ff00" anchorX="left">SIGNAL: STRONG BUY</Text>
        
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[30, 20, 0]} fontSize={4} color="#ff0044" anchorX="right">ETH/USD  -1.12%</Text>
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[30, 14, 0]} fontSize={3} color="#ffffff" anchorX="right">VOL: 840K</Text>
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[30, 9, 0]} fontSize={3} color="#ff0044" anchorX="right">SIGNAL: SELL</Text>

        {/* Dynamic Data Stream */}
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -5, 0]} fontSize={2} color="#00ffff" anchorX="center" opacity={0.7} transparent>
          {"ALGO > EXECUTING ORDER BATCH > LATENCY 1.2ms"}
        </Text>
      </group>
"""

new_hud = """
      {/* Hovering Hologram HUD */}
      <group position={[0, 5, -50]}>

        {/* The Logo */}
        <mesh position={[0, 15, 0]}>
          <planeGeometry args={[40, 20]} />
          <meshBasicMaterial map={texture} transparent opacity={0.9} depthWrite={false} />
        </mesh>

        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -2, 0]} fontSize={6} color="#ffffff" anchorX="center" outlineWidth={0.05} outlineColor="#000000">
          CONTANGO QUANT
        </Text>
        
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -9, 0]} fontSize={2.5} color="#00ffff" anchorX="center" maxWidth={60} textAlign="center" lineHeight={1.5} opacity={0.9} transparent>
          Next-generation algorithmic trading. Leverage predictive AI models and real-time sentiment analysis to automate complex financial strategies with ultra-low latency execution.
        </Text>

        {/* Dynamic Data Stream */}
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -18, 0]} fontSize={2} color="#00ff00" anchorX="center" opacity={0.7} transparent>
          {"ALGO > EXECUTING ORDER BATCH > LATENCY 1.2ms"}
        </Text>
      </group>
"""

content = content.replace(old_hud.strip('\n'), new_hud.strip('\n'))

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'w') as f:
    f.write(content)

print("HUD Patched.")
