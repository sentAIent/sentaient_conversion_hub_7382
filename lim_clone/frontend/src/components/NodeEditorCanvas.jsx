import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node: Data Ingestion
const DataNode = ({ data, selected }) => {
  return (
    <div style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', border: selected ? '2px solid #fff' : '1px solid #3b82f6', color: '#f8fafc', minWidth: '150px' }}>
      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }}>Ingestion</div>
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      {data.ticker && <div style={{ fontSize: '0.8rem', marginTop: '4px', color: '#3b82f6' }}>Ticker: {data.ticker}</div>}
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};

// Custom Node: Analytics
const AnalyticsNode = ({ data, selected }) => {
  return (
    <div style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', border: selected ? '2px solid #fff' : '1px solid #10b981', color: '#f8fafc', minWidth: '150px' }}>
      <Handle type="target" position={Position.Left} id="b" />
      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }}>Analytics Engine</div>
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};

// Custom Node: AI Agent
const AgentNode = ({ data, selected }) => {
  return (
    <div style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', border: selected ? '2px solid #fff' : '1px solid #a855f7', color: '#f8fafc', minWidth: '150px' }}>
      <Handle type="target" position={Position.Left} id="b" />
      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }}>AI Agent</div>
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      {data.prompt && <div style={{ fontSize: '0.7rem', marginTop: '4px', color: '#a855f7', fontStyle: 'italic' }}>{data.prompt}</div>}
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};

// Custom Node: Kronos Predictor
const KronosNode = ({ data, selected }) => {
  return (
    <div style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', border: selected ? '2px solid #fff' : '1px solid #f97316', color: '#f8fafc', minWidth: '150px' }}>
      <Handle type="target" position={Position.Left} id="b" />
      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }}>Kronos Model</div>
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      {data.taskType && <div style={{ fontSize: '0.7rem', marginTop: '4px', color: '#f97316' }}>{data.taskType} ({data.horizon})</div>}
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};

const nodeTypes = {
  dataNode: DataNode,
  analyticsNode: AnalyticsNode,
  agentNode: AgentNode,
  kronosNode: KronosNode
};

const initialNodes = [
  { id: '1', type: 'dataNode', position: { x: 50, y: 150 }, data: { label: 'DBnomics API', ticker: 'SPY' } },
  { id: '2', type: 'analyticsNode', position: { x: 300, y: 50 }, data: { label: 'Calculate VaR' } },
  { id: 'k1', type: 'kronosNode', position: { x: 300, y: 250 }, data: { label: 'Predict Price', taskType: 'Forecasting', horizon: '7' } },
  { id: '3', type: 'agentNode', position: { x: 550, y: 150 }, data: { label: 'OpenAlice Analysis', prompt: 'Summarize risk' } }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-k1', source: '1', target: 'k1', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'ek1-3', source: 'k1', target: '3', animated: true }
];

import { useEffect } from 'react';

export default function NodeEditorCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Strategy Save states
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [stratName, setStratName] = useState('');
  const [stratDesc, setStratDesc] = useState('');
  const [stratTags, setStratTags] = useState('');
  const [stratPrice, setStratPrice] = useState('0');

  // Alice Copilot states
  const [isCopilotOpen, setIsCopilotOpen] = useState(true);
  const [promptInput, setPromptInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I am Alice, your canvas copilot. Tell me what strategy pipeline you want to build (e.g. 'Ingest TSLA data, run a 14-day Kronos forecast, and analyze with an AI agent'), and I will design it for you!"
    }
  ]);

  const handleGeneratePipeline = async (e) => {
    if (e) e.preventDefault();
    if (!promptInput.trim() || chatLoading) return;

    const userMessage = promptInput;
    setChatMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setPromptInput('');
    setChatLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/fincept/pipeline/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate pipeline');
      }

      const result = await response.json();
      if (result.nodes && result.edges) {
        setNodes(result.nodes);
        setEdges(result.edges);
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `I've successfully generated the pipeline for you! You can now review it on the canvas and run it.` }
        ]);
        setLogs((prev) => [...prev, { type: 'success', msg: `Alice Copilot generated a new pipeline structure.` }]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `The response from the model did not contain a valid pipeline structure. Please try a different query.` }
        ]);
      }
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error generating pipeline: ${err.message}` }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Load strategy listener
  useEffect(() => {
    const checkLoadedStrategy = () => {
      const loaded = localStorage.getItem('active_canvas_strategy');
      if (loaded) {
        try {
          const parsed = JSON.parse(loaded);
          if (parsed.nodes && parsed.edges) {
            setNodes(parsed.nodes);
            setEdges(parsed.edges);
            localStorage.removeItem('active_canvas_strategy');
            setLogs([{ type: 'success', msg: `Successfully loaded strategy: ${parsed.name}` }]);
          }
        } catch (e) {
          console.error('Failed to parse loaded strategy', e);
        }
      }
    };

    checkLoadedStrategy();
    window.addEventListener('load_strategy_to_editor', checkLoadedStrategy);
    return () => window.removeEventListener('load_strategy_to_editor', checkLoadedStrategy);
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  const updateNodeData = (key, value) => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNode.id) {
          n.data = { ...n.data, [key]: value };
          setSelectedNode(n); // Update local state for panel
        }
        return n;
      })
    );
  };

  const addNode = (type) => {
    const id = `${type}_${Date.now()}`;
    let newNode = {
      id,
      type,
      position: { x: 150 + Math.random() * 100, y: 150 + Math.random() * 100 },
      data: { label: `New ${type.replace('Node', '')}` }
    };
    
    if (type === 'dataNode') {
      newNode.data.ticker = 'AAPL';
      newNode.data.label = 'AAPL Data Ingest';
    } else if (type === 'kronosNode') {
      newNode.data.taskType = 'Forecasting';
      newNode.data.horizon = '7';
      newNode.data.label = 'Kronos Predict';
    } else if (type === 'agentNode') {
      newNode.data.prompt = 'Summarize risks';
      newNode.data.label = 'Alice Advisor';
    } else if (type === 'analyticsNode') {
      newNode.data.label = 'Technical Analysis';
    }
    
    setNodes((nds) => nds.concat(newNode));
    setLogs((prev) => [...prev, { type: 'info', msg: `Added node: ${newNode.data.label}` }]);
  };

  const handleSaveStrategy = async () => {
    if (!stratName.trim()) {
      alert('Strategy name is required.');
      return;
    }
    try {
      const authorName = localStorage.getItem('sentaient_user') || 'AnonymousUser';
      const response = await fetch('http://127.0.0.1:8000/api/fincept/strategies/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: stratName,
          description: stratDesc,
          author: authorName,
          price: parseFloat(stratPrice) || 0.0,
          tags: stratTags.split(',').map(t => t.trim()).filter(Boolean),
          nodes: nodes,
          edges: edges
        })
      });
      const result = await response.json();
      if (result.status === 'success') {
        setLogs((prev) => [...prev, { type: 'success', msg: `Strategy "${stratName}" successfully saved!` }]);
        setIsSaveModalOpen(false);
        // Clear modal inputs
        setStratName('');
        setStratDesc('');
        setStratTags('');
        setStratPrice('0');
      } else {
        alert('Failed to save strategy: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error saving strategy: ' + err.message);
    }
  };

  const runPipeline = async () => {
    setIsRunning(true);
    setLogs([{ type: 'info', msg: 'Initiating pipeline execution...' }]);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/fincept/pipeline/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges })
      });
      const result = await response.json();
      if (result.logs) {
        setLogs((prev) => [...prev, ...result.logs]);
      } else if (result.error) {
        setLogs((prev) => [...prev, { type: 'error', msg: result.error }]);
      }
    } catch (err) {
      setLogs((prev) => [...prev, { type: 'error', msg: `Connection failed: ${err.message}` }]);
    }
    setIsRunning(false);
  };

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#f8fafc' }}>Fincept Terminal: Visual Pipeline Editor</h2>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>Build analytics and AI agent workflows visually.</p>
          </div>
          <button 
            onClick={() => setIsCopilotOpen(!isCopilotOpen)}
            style={{ marginLeft: '16px', background: isCopilotOpen ? 'rgba(59, 130, 246, 0.2)' : 'transparent', border: '1px solid #3b82f6', color: '#60a5fa', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
            {isCopilotOpen ? '🤖 Hide Copilot' : '🤖 Show Copilot'}
          </button>
        </div>
        
        {/* Node Insertion Actions */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginRight: '4px' }}>Add:</span>
          <button onClick={() => addNode('dataNode')} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>+ Ingestion</button>
          <button onClick={() => addNode('analyticsNode')} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>+ Analytics</button>
          <button onClick={() => addNode('kronosNode')} style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#fb923c', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>+ Kronos</button>
          <button onClick={() => addNode('agentNode')} style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>+ AI Agent</button>
        </div>

        {/* Strategy Execution & Saving */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setIsSaveModalOpen(true)}
            style={{ padding: '10px 20px', background: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            💾 Save Strategy
          </button>
          <button 
            onClick={runPipeline}
            disabled={isRunning}
            style={{ padding: '10px 20px', background: isRunning ? '#64748b' : '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: isRunning ? 'wait' : 'pointer', fontWeight: 'bold' }}>
            {isRunning ? 'Executing...' : 'Run Pipeline'}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        
        {/* Alice Copilot Chat Drawer */}
        {isCopilotOpen && (
          <div style={{ width: '320px', borderRight: '1px solid #334155', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <span>🤖</span> Alice Canvas Copilot
              </h3>
              <button 
                onClick={() => setIsCopilotOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1rem' }}>
                ✕
              </button>
            </div>

            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.role === 'user' ? '#3b82f6' : 'rgba(255, 255, 255, 0.05)',
                    color: msg.role === 'user' ? '#fff' : '#cbd5e1',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    maxWidth: '85%',
                    fontSize: '0.85rem',
                    lineHeight: 1.4,
                    border: msg.role === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {msg.content}
                </div>
              ))}
              {chatLoading && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  Thinking & designing canvas...
                </div>
              )}
            </div>

            <form onSubmit={handleGeneratePipeline} style={{ padding: '16px', borderTop: '1px solid #334155', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Ask Alice to design..." 
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                disabled={chatLoading}
                style={{ flex: 1, padding: '8px 12px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
              />
              <button 
                type="submit"
                disabled={chatLoading || !promptInput.trim()}
                style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                Build
              </button>
            </form>
          </div>
        )}

        {/* React Flow Canvas */}
        <div style={{ flex: 1, position: 'relative' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            colorMode="dark"
          >
            <Controls />
            <MiniMap nodeStrokeColor={(n) => {
                if (n.type === 'dataNode') return '#3b82f6';
                if (n.type === 'analyticsNode') return '#10b981';
                if (n.type === 'agentNode') return '#a855f7';
                if (n.type === 'kronosNode') return '#f97316';
                return '#eee';
              }} nodeColor={() => '#1e293b'} />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Configuration & Logs Panel */}
        <div style={{ width: '350px', borderLeft: '1px solid #334155', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
          <div style={{ flex: 1, padding: '16px', borderBottom: '1px solid #334155', overflowY: 'auto' }}>
            <h3 style={{ color: '#f8fafc', marginTop: 0, borderBottom: '1px solid #334155', paddingBottom: '8px' }}>Properties</h3>
            {selectedNode ? (
              <div style={{ color: '#cbd5e1' }}>
                <p><strong>Type:</strong> {selectedNode.type}</p>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: '#94a3b8' }}>Label</label>
                  <input 
                    type="text" 
                    value={selectedNode.data.label || ''} 
                    onChange={(e) => updateNodeData('label', e.target.value)}
                    style={{ width: '100%', padding: '8px', background: '#1e293b', border: '1px solid #334155', color: '#f8fafc', borderRadius: '4px' }}
                  />
                </div>
                {selectedNode.type === 'dataNode' && (
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: '#3b82f6' }}>Ticker Symbol</label>
                    <input 
                      type="text" 
                      value={selectedNode.data.ticker || ''} 
                      onChange={(e) => updateNodeData('ticker', e.target.value)}
                      style={{ width: '100%', padding: '8px', background: '#1e293b', border: '1px solid #334155', color: '#f8fafc', borderRadius: '4px' }}
                    />
                  </div>
                )}
                {selectedNode.type === 'agentNode' && (
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: '#a855f7' }}>LLM Prompt</label>
                    <textarea 
                      rows={4}
                      value={selectedNode.data.prompt || ''} 
                      onChange={(e) => updateNodeData('prompt', e.target.value)}
                      style={{ width: '100%', padding: '8px', background: '#1e293b', border: '1px solid #334155', color: '#f8fafc', borderRadius: '4px' }}
                    />
                  </div>
                )}
                {selectedNode.type === 'kronosNode' && (
                  <>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: '#f97316' }}>Task Type</label>
                      <select 
                        value={selectedNode.data.taskType || 'Forecasting'} 
                        onChange={(e) => updateNodeData('taskType', e.target.value)}
                        style={{ width: '100%', padding: '8px', background: '#1e293b', border: '1px solid #334155', color: '#f8fafc', borderRadius: '4px' }}
                      >
                        <option value="Forecasting">Forecasting</option>
                        <option value="Synthetic Data Generation">Synthetic Data Generation</option>
                        <option value="Trade Signal Generation">Trade Signal Generation</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: '#f97316' }}>Prediction Horizon</label>
                      <input 
                        type="number" 
                        value={selectedNode.data.horizon || '7'} 
                        onChange={(e) => updateNodeData('horizon', e.target.value)}
                        style={{ width: '100%', padding: '8px', background: '#1e293b', border: '1px solid #334155', color: '#f8fafc', borderRadius: '4px' }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Select a node to edit its properties.</p>
            )}
          </div>

          <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
            <h3 style={{ color: '#f8fafc', marginTop: 0, borderBottom: '1px solid #334155', paddingBottom: '8px' }}>Execution Logs</h3>
            {logs.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Run pipeline to see logs.</p>
            ) : (
              <div style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>
                {logs.map((log, i) => (
                  <div key={i} style={{ marginBottom: '6px', color: log.type === 'error' ? '#ef4444' : log.type === 'success' ? '#10b981' : '#cbd5e1' }}>
                    <span style={{ opacity: 0.5 }}>[{new Date().toLocaleTimeString()}]</span> {log.msg}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Strategy Modal */}
      {isSaveModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#1e293b', padding: '24px', borderRadius: '8px', border: '1px solid #334155', width: '450px', color: '#f8fafc' }}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#fff', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>Save Custom Strategy</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Strategy Name</label>
              <input 
                type="text" 
                placeholder="e.g. Alpha Scalper SPY" 
                value={stratName} 
                onChange={(e) => setStratName(e.target.value)}
                style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Description</label>
              <textarea 
                rows={3}
                placeholder="Describe how your strategy works and its target conditions..." 
                value={stratDesc} 
                onChange={(e) => setStratDesc(e.target.value)}
                style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Pricing (USD)</label>
                <input 
                  type="number" 
                  placeholder="0.00 (Free)" 
                  value={stratPrice} 
                  onChange={(e) => setStratPrice(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Tags (comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="Kronos, Options, SPY" 
                  value={stratTags} 
                  onChange={(e) => setStratTags(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button 
                onClick={() => setIsSaveModalOpen(false)} 
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button 
                onClick={handleSaveStrategy} 
                style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
