import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

// A placeholder knowledge graph to represent what GitNexus would return via MCP
const generateMockGitNexusGraph = () => {
    const nodes = [];
    const links = [];
    const categories = ['frontend', 'backend', 'database', 'ai-agent'];
    const colors = {
        'frontend': '#00d2ff',
        'backend': '#ff0055',
        'database': '#00ff66',
        'ai-agent': '#ffaa00'
    };

    // Generate 50 nodes
    for (let i = 0; i < 50; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        nodes.push({
            id: `node-${i}`,
            group: category,
            color: colors[category],
            name: `module_${i}.ts`,
            pos: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            ]
        });
    }

    // Generate 40 random links
    for (let i = 0; i < 40; i++) {
        links.push({
            source: `node-${Math.floor(Math.random() * 50)}`,
            target: `node-${Math.floor(Math.random() * 50)}`
        });
    }

    return { nodes, links };
};

const NodeSphere = ({ position, color, name, isHovered, onHover }) => {
    const mesh = useRef();
    
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x += 0.01;
            mesh.current.rotation.y += 0.01;
            // Add a slight floating effect
            mesh.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.005;
        }
    });

    return (
        <group position={position}>
            <mesh 
                ref={mesh} 
                onPointerOver={() => onHover(true, name)} 
                onPointerOut={() => onHover(false, null)}
            >
                <sphereGeometry args={[isHovered ? 0.6 : 0.4, 32, 32]} />
                <meshStandardMaterial 
                    color={color} 
                    emissive={color}
                    emissiveIntensity={isHovered ? 1.5 : 0.5}
                    wireframe={isHovered}
                />
            </mesh>
            {isHovered && (
                <Text
                    position={[0, 1, 0]}
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
            )}
        </group>
    );
};

const GraphLines = ({ links, nodes }) => {
    const lineGeometry = useMemo(() => {
        const points = [];
        links.forEach(link => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            if (sourceNode && targetNode) {
                points.push(new THREE.Vector3(...sourceNode.pos));
                points.push(new THREE.Vector3(...targetNode.pos));
            }
        });
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [links, nodes]);

    return (
        <lineSegments geometry={lineGeometry}>
            <lineBasicMaterial color="#ffffff" opacity={0.15} transparent depthWrite={false} />
        </lineSegments>
    );
};

export default function CodeGraphViewer3D() {
    const [hoveredNode, setHoveredNode] = useState(null);
    const graphData = useMemo(() => generateMockGitNexusGraph(), []);

    return (
        <div style={{ width: '100%', height: '600px', background: '#050505', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            
            {/* Overlay UI */}
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: 'white', fontFamily: 'monospace' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#00d2ff' }}>GitNexus Architecture Map</h3>
                <p style={{ margin: '5px 0', fontSize: '12px', opacity: 0.7 }}>Powered by GitNexus Local MCP Server</p>
                
                <div style={{ marginTop: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}><span style={{width: 10, height: 10, background: '#00d2ff', borderRadius: '50%'}}></span> Frontend</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginTop: 4 }}><span style={{width: 10, height: 10, background: '#ff0055', borderRadius: '50%'}}></span> Backend</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginTop: 4 }}><span style={{width: 10, height: 10, background: '#00ff66', borderRadius: '50%'}}></span> Database</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginTop: 4 }}><span style={{width: 10, height: 10, background: '#ffaa00', borderRadius: '50%'}}></span> AI Agents</div>
                </div>
            </div>

            {/* Selected Node Panel */}
            {hoveredNode && (
                <div style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 10, background: 'rgba(0,0,0,0.8)', padding: '15px', borderRadius: '8px', border: '1px solid #333', color: 'white', minWidth: '200px' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>{hoveredNode}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Dependencies: {Math.floor(Math.random() * 5) + 1}</p>
                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#aaa' }}>Complexity Score: {(Math.random() * 10).toFixed(1)}</p>
                </div>
            )}

            <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d2ff" />
                
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                
                <GraphLines links={graphData.links} nodes={graphData.nodes} />
                
                {graphData.nodes.map(node => (
                    <NodeSphere 
                        key={node.id}
                        position={node.pos}
                        color={node.color}
                        name={node.name}
                        isHovered={hoveredNode === node.name}
                        onHover={(isHovered, name) => setHoveredNode(isHovered ? name : null)}
                    />
                ))}
                
                <OrbitControls 
                    enableDamping 
                    dampingFactor={0.05} 
                    autoRotate 
                    autoRotateSpeed={0.5} 
                    maxDistance={50}
                    minDistance={5}
                />
            </Canvas>
        </div>
    );
}
