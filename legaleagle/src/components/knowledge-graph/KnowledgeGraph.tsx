import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';

interface GraphNode {
  id: string;
  type: string;
  name: string;
  summary: string;
}

interface GraphEdge {
  source: string;
  target: string;
  type: string;
}

interface KnowledgeGraphProps {
  graphData: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ graphData }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    if (!graphData.nodes || !graphData.nodes.length) return;

    // Convert raw data to React Flow format
    const initialNodes: Node[] = graphData.nodes.map((n) => ({
      id: n.id,
      data: { label: n.name, ...n },
      position: { x: Math.random() * 800, y: Math.random() * 600 },
      style: {
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '12px',
        minWidth: '150px'
      }
    }));

    const initialEdges: Edge[] = graphData.edges.map((e, i) => ({
      id: `e${i}-${e.source}-${e.target}`,
      source: e.source,
      target: e.target,
      label: e.type,
      style: { stroke: '#999' }
    }));

    // Run a basic force simulation to layout the nodes
    const simulation = forceSimulation(initialNodes as any)
      .force(
        'link',
        forceLink(initialEdges).id((d: any) => d.id).distance(150)
      )
      .force('charge', forceManyBody().strength(-300))
      .force('center', forceCenter(400, 300));

    // Run simulation synchronously for a few ticks to get initial layout
    for (let i = 0; i < 300; i++) {
      simulation.tick();
    }

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [graphData, setNodes, setEdges]);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node.data as unknown as GraphNode);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>

      {selectedNode && (
        <div style={{
          width: '300px',
          padding: '20px',
          borderLeft: '1px solid #eee',
          background: '#fafafa',
          overflowY: 'auto',
          color: '#000'
        }}>
          <h3 style={{ marginTop: 0 }}>{selectedNode.name}</h3>
          <p><strong>Type:</strong> {selectedNode.type}</p>
          <div style={{ marginTop: '20px' }}>
            <strong>Summary:</strong>
            <p style={{ whiteSpace: 'pre-wrap', fontSize: '14px', color: '#555' }}>
              {selectedNode.summary}
            </p>
          </div>
          <button 
            onClick={() => setSelectedNode(null)}
            style={{
              marginTop: '20px',
              padding: '8px 16px',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
