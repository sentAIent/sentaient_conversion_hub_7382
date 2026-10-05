import re

with open('src/pages/demo3d/worlds/LegalEagle.jsx', 'r') as f:
    current_legal = f.read()

# Extract HighSpeedDocumentStream
doc_stream_match = re.search(r'const HighSpeedDocumentStream = \(\) => \{.*?(?=const CourtroomBackground|const BrutalistOverlord)', current_legal, re.DOTALL)
high_speed_stream = doc_stream_match.group(0) if doc_stream_match else ""

with open('old_legal.jsx', 'r') as f:
    old_legal = f.read()

# Make sure we import useMemo, Instances, Instance from react-three/fiber and drei
# wait, old_legal has:
# import React, { useRef, useState, useEffect } from 'react';
# import { useFrame } from '@react-three/fiber';
# import { Text } from '@react-three/drei';
# import * as THREE from 'three';

# HighSpeedDocumentStream needs Instances, Instance, useMemo, etc.
imports = """
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
"""

old_legal = re.sub(r'import React.*?import \* as THREE from \'three\';', imports.strip(), old_legal, flags=re.DOTALL)

# Insert HighSpeedDocumentStream before WorldLegalEagle
old_legal = old_legal.replace('const WorldLegalEagle =', high_speed_stream + '\nconst WorldLegalEagle =')

# Add HighSpeedDocumentStream to the WorldLegalEagle group
old_legal = old_legal.replace('<CourtroomBackground />', '<CourtroomBackground />\n      <HighSpeedDocumentStream />')

# Ensure all <Text> have font props
old_legal = old_legal.replace('<Text', '<Text font="/fonts/Roboto.woff" fallbackFonts={[]}')

with open('src/pages/demo3d/worlds/LegalEagle.jsx', 'w') as f:
    f.write(old_legal)

print("Legal Eagle patched.")
