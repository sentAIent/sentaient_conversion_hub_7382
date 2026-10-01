import React, { useState, useCallback } from 'react';
import { ReactFlow, Controls, Background, addEdge, applyNodeChanges, applyEdgeChanges, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Initial nodes for the visual RAG/Agent conversion funnel
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Mem0: Context Retrieval' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'LangGraph: Lead Analysis Agent' },
    position: { x: 250, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Twenty CRM: Create Contact' },
    position: { x: 100, y: 250 },
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Cal.com: Schedule Meeting' },
    position: { x: 400, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'score > 50' },
  { id: 'e2-4', source: '2', target: '4', animated: true, label: 'score > 80' },
];

export default function WorkflowEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [],
  );

  return (
    <div style={{ width: '100%', height: '80vh', border: '1px solid #ccc', borderRadius: '8px', background: '#111827' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
