import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';
import { useAuth } from '../contexts/AuthContext';
import { GDPRParser } from '../services/gdprParser';
import { MindmapGenerator } from '../services/mindmapGenerator';
import { GDPRZipParser } from '../services/gdprZipParser.js';
import WorkflowEditor from '../components/WorkflowEditor';
import GitHubRepoScanner from '../components/GitHubRepoScanner';
import AssetOptimizer3D from '../components/AssetOptimizer3D';
import AppInfraOrchestrator from '../components/AppInfraOrchestrator';
import RAGDocumentHub from '../components/RAGDocumentHub';
import RepolyzeBlogAutomator from '../components/RepolyzeBlogAutomator';
import EnterpriseIntegrationSuite from '../components/EnterpriseIntegrationSuite';
import CodeGraphViewer3D from '../components/CodeGraphViewer3D';
import LocalWebLLM from '../components/LocalWebLLM';
import QuantDataGrid from '../components/QuantDataGrid';
import VoiceAgent from '../components/VoiceAgent';

export default function AgentStudio() {
    const { currentUser } = useAuth();
    
    // Deployment & Config states
    const [deploymentMode, setDeploymentMode] = useState('tauri');
    const [creditBalance, setCreditBalance] = useState(84.20);
    const [localVram, setLocalVram] = useState(72);
    
    // Simulation & Upload states
    const [runningTask, setRunningTask] = useState(false);
    const [taskStep, setTaskStep] = useState(0); 
    const [showFailoverPrompt, setShowFailoverPrompt] = useState(false);
    const [promptInput, setPromptInput] = useState('Build a dynamic port selection system with local SQLite vector caching and a visual canvas dashboard.');
    
    // Parser & Generator instances
    const parser = new GDPRParser();
    const generator = new MindmapGenerator();

    // Data states
    const [logs, setLogs] = useState([]);
    const [codeOutput, setCodeOutput] = useState('');
    const [cacheSavings, setCacheSavings] = useState({ hits: 24, creditsSaved: 18.40, compression: 67 });
    const [mindmapNodes, setMindmapNodes] = useState([]);
    const [mindmapConnections, setMindmapConnections] = useState([]);
    
    const fileInputRef = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    // Infinite Canvas states
    const [zoom, setZoom] = useState(0.85);
    const [panOffset, setPanOffset] = useState({ x: 50, y: 50 });
    const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    // Card Positions (including generated mind map nodes)
    const [cardPositions, setCardPositions] = useState({
        controls: { x: 50, y: 50 },
        router: { x: 50, y: 430 },
        swarm: { x: 500, y: 50 },
        terminal: { x: 500, y: 350 },
        editor: { x: 980, y: 50 },
        preview: { x: 980, y: 470 },
        caching: { x: 50, y: 730 },
        instatic: { x: 1450, y: 50 },
        node_center: { x: 1500, y: 400 },
        node_coding: { x: 1850, y: 200 },
        node_strategy: { x: 1850, y: 600 },
        node_research: { x: 1200, y: 200 },
        node_daily: { x: 1200, y: 600 },
        node_gen_coding_0: { x: 2200, y: 100 },
        node_gen_coding_1: { x: 2200, y: 300 },
        node_gen_strategy_0: { x: 2200, y: 600 },
        node_gen_research_0: { x: 900, y: 150 },
        node_gen_daily_0: { x: 900, y: 650 },
        auditor: { x: 50, y: 920 },
        workflow: { x: 980, y: 730 },
        gitnexus: { x: 50, y: 1450 },
        webllm: { x: 500, y: 620 },
        quantGrid: { x: 1600, y: 50 },
        voiceAgent: { x: 980, y: 50 },
        gitnexusScanner: { x: 50, y: 1450 },
        optimizer3d: { x: 700, y: 1450 },
        infra: { x: 50, y: 1950 },
        ragHub: { x: 900, y: 1950 },
        blogAutomator: { x: 50, y: 2550 },
        enterpriseSuite: { x: 900, y: 2550 }
    });

    const [activeDragCard, setActiveDragCard] = useState(null);
    const [cardDragStart, setCardDragStart] = useState({ x: 0, y: 0 });

    // Handle Card Dragging
    const handleCardMouseDown = (e, cardKey) => {
        e.stopPropagation();
        setActiveDragCard(cardKey);
        setCardDragStart({
            x: e.clientX - cardPositions[cardKey].x,
            y: e.clientY - cardPositions[cardKey].y
        });
    };

    const handleCanvasMouseDown = (e) => {
        if (e.button === 0) { // Left click
            setIsDraggingCanvas(true);
            setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - dragStart.y });
            setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
        }
    };

    const handleMouseMove = (e) => {
        if (activeDragCard) {
            const newX = Math.round(e.clientX - cardDragStart.x);
            const newY = Math.round(e.clientY - cardDragStart.y);
            setCardPositions(prev => ({
                ...prev,
                [activeDragCard]: { x: newX, y: newY }
            }));
        } else if (isDraggingCanvas) {
            setPanOffset({
                x: Math.round(e.clientX - dragStart.x),
                y: Math.round(e.clientY - dragStart.y)
            });
        }
    };

    const handleMouseUp = () => {
        setIsDraggingCanvas(false);
        setActiveDragCard(null);
    };

    const handleZoom = (factor) => {
        setZoom(prev => Math.min(1.5, Math.max(0.4, prev + factor)));
    };

    const resetCanvas = () => {
        setZoom(0.85);
        setPanOffset({ x: 50, y: 50 });
        setCardPositions({
            controls: { x: 50, y: 50 },
            router: { x: 50, y: 430 },
            swarm: { x: 500, y: 50 },
            terminal: { x: 500, y: 350 },
            editor: { x: 980, y: 50 },
            preview: { x: 980, y: 470 },
            caching: { x: 50, y: 730 },
            instatic: { x: 1450, y: 50 },
            node_center: { x: 1500, y: 400 },
            node_coding: { x: 1850, y: 200 },
            node_strategy: { x: 1850, y: 600 },
            node_research: { x: 1200, y: 200 },
            node_daily: { x: 1200, y: 600 },
            node_gen_coding_0: { x: 2200, y: 100 },
            node_gen_coding_1: { x: 2200, y: 300 },
            node_gen_strategy_0: { x: 2200, y: 600 },
            node_gen_research_0: { x: 900, y: 150 },
            node_gen_daily_0: { x: 900, y: 650 },
            auditor: { x: 50, y: 920 },
            workflow: { x: 980, y: 730 },
            gitnexus: { x: 50, y: 1450 },
            webllm: { x: 500, y: 620 },
            quantGrid: { x: 1600, y: 50 },
            voiceAgent: { x: 980, y: 50 },
            gitnexusScanner: { x: 50, y: 1450 },
            optimizer3d: { x: 700, y: 1450 },
            infra: { x: 50, y: 1950 },
            ragHub: { x: 900, y: 1950 },
            blogAutomator: { x: 50, y: 2550 },
            enterpriseSuite: { x: 900, y: 2550 }
        });
    };

    // Process Real GDPR Zip File
    const processRealGDPRArchive = async (file) => {
        if (!file) return;
        setUploadedFile({ name: file.name, size: (file.size / (1024 * 1024)).toFixed(2) + ' MB' });
        
        // Well-designed URR Warning for large files
        if (file.size > 2000 * 1024 * 1024) {
            setLogs([{ 
                type: 'error', 
                text: '⚠️ Warning: This archive is over 2GB. Unzipping it entirely in the browser RAM might cause performance hiccups or freeze the tab. For massive archives, it is highly recommended to upload segmented exports (e.g. download your data in 1GB chunks from Facebook/Instagram).'
            }]);
            // Give user a moment to read warning before proceeding
            await new Promise(r => setTimeout(r, 4000));
        }

        setLogs([
            { type: 'system', text: `📥 Uploaded GDPR data archive: ${file.name}` },
            { type: 'system', text: '📦 Initializing local JSZip extraction engine...' }
        ]);

        try {
            const rawNodes = await GDPRZipParser.parseGDPRArchive(file, (msg) => {
                setLogs(prev => [...prev, { type: 'research', text: msg }]);
            });

            if (rawNodes.length > 0) {
                setLogs(prev => [
                    ...prev,
                    { type: 'system', text: '🧬 [MindmapGenerator] Categorizing and clustering extracted items by semantic themes...' }
                ]);

                // Small timeout to allow UI to render logs
                setTimeout(() => {
                    const map = generator.generateMindMap(rawNodes);
                    setMindmapNodes(map.nodes);
                    setMindmapConnections(map.connections);
                    setLogs(prev => [
                        ...prev,
                        { type: 'coding', text: `✅ [MindmapGenerator] Ingested ${rawNodes.length} nodes. Drawing cognitive mind map links.` }
                    ]);
                }, 1000);
            } else {
                setLogs(prev => [...prev, { type: 'system', text: '⚠️ No recognized Facebook or Instagram data found in this zip.' }]);
            }
        } catch (err) {
            setLogs(prev => [...prev, { type: 'error', text: `❌ Failed to parse archive: ${err.message}` }]);
        }
    };

    // Run TDD self-healing loop
    const handleRunAgent = () => {
        if (runningTask) return;
        setRunningTask(true);
        setTaskStep(1);
        setCodeOutput('');
        setLogs([
            { type: 'system', text: '🚀 Ephemeral Docker Sandbox initiated. Volume mounting workspace directories...' },
            { type: 'research', text: '🔎 [Feynman Researcher] Dispatched parallel crawlers to arXiv and Google Scholar...' },
        ]);

        setTimeout(() => {
            setLogs(prev => [
                ...prev,
                { type: 'verifier', text: '🛡️ [Feynman Verifier] Verifying citation sources... Grounding complete.' },
                { type: 'router', text: '🔀 [Model Router] Subtask routed to Gemini 1.5 Pro (Cloud).' }
            ]);
            setTaskStep(2);
        }, 1200);

        setTimeout(() => {
            setLogs(prev => [
                ...prev,
                { type: 'coding', text: '💻 [OpenHands Sandbox] Generating TDD coding files. Running initial unit tests...' },
                { type: 'error', text: '❌ [TDD Fail - RED] FAIL: PortFinder.spec.js > checks connection' },
                { type: 'error', text: '   TypeError: Cannot read properties of undefined (reading "port")' }
            ]);
            setCodeOutput(`// Buggy Port Prober code
export function probePort(server) {
    // BUG: Missing check if server is initialized
    return server.address().port;
}`);
            setTaskStep(3);
        }, 2500);

        setTimeout(() => {
            setLogs(prev => [
                ...prev,
                { type: 'system', text: '🔧 [Self-Healing Controller] TDD Test Failure caught. Diagnosis: Null server evaluation error.' },
                { type: 'coding', text: '💻 [Self-Healing Controller] Patching file with guard clauses...' }
            ]);
            setTaskStep(4);
        }, 4500);

        setTimeout(() => {
            setLogs(prev => [
                ...prev,
                { type: 'coding', text: '✅ [TDD Pass - GREEN] PASS: PortFinder.spec.js > checks connection' },
                { type: 'system', text: '🚀 Code compiled successfully.' }
            ]);
            setCodeOutput(`// Fixed Port Prober code
export function probePort(server) {
    if (!server || !server.address()) {
        return 3333; // Default fallback port
    }
    return server.address().port;
}`);
            setTaskStep(5);
            setRunningTask(false);
        }, 6500);
    };

    // ML Pipeline Training SSE connection
    const handleTrainLoRA = () => {
        if (runningTask) return;
        setRunningTask(true);
        setLogs([
            { type: 'system', text: '🧠 Connecting to local ML Bridge (port 3335)...' }
        ]);
        
        const eventSource = new EventSource('http://localhost:3335/api/train');
        
        eventSource.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.type === 'done') {
                setRunningTask(false);
                eventSource.close();
                setLogs(prev => [...prev, { type: 'system', text: `✅ Pipeline finished with code ${data.code}` }]);
            } else {
                // Split multi-line messages for nicer terminal rendering
                const lines = data.message.split('\n').filter(l => l.trim() !== '');
                setLogs(prev => [
                    ...prev, 
                    ...lines.map(line => ({ 
                        type: data.type === 'error' ? 'error' : 'coding', 
                        text: line 
                    }))
                ]);
            }
        };

        eventSource.onerror = (err) => {
            setLogs(prev => [...prev, { type: 'error', text: '❌ Connection to ML Bridge failed or was lost.' }]);
            setRunningTask(false);
            eventSource.close();
        };
    };

    // Drag-and-drop file upload handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processRealGDPRArchive(files[0]);
        }
    };

    return (
        <>
            <Helmet>
                <title>Cognitive Agent Studio | sentAIent.com</title>
            </Helmet>

            <div className="relative z-50">
                <Header />
            </div>

            <main 
                ref={canvasRef}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#0B0C10] via-[#12141A] to-[#1A1C24] select-none cursor-grab active:cursor-grabbing pt-20"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px)',
                    backgroundSize: '32px 32px'
                }}
            >
                {/* Background Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-conversion/10 rounded-full blur-[150px] pointer-events-none"></div>

                {/* Visual Draggable Canvas Wrapper */}
                <div
                    className="absolute inset-0 origin-top-left transition-transform duration-75 z-10"
                    style={{
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`
                    }}
                >
                    {/* Background SVG connections map */}
                    <svg className="absolute inset-0 pointer-events-none w-[5000px] h-[5000px] z-0">
                        {mindmapConnections.map((conn, idx) => {
                            const from = cardPositions[conn.from];
                            const to = cardPositions[conn.to];
                            if (!from || !to) return null;
                            return (
                                <line
                                    key={idx}
                                    x1={from.x + 160}
                                    y1={from.y + 40}
                                    x2={to.x + 160}
                                    y2={to.y + 40}
                                    stroke="#3b82f6"
                                    strokeWidth={1.5}
                                    strokeDasharray="4 4"
                                    opacity={0.4}
                                />
                            );
                        })}
                    </svg>

                    {/* Draggable Card 1: Controls & Uploader */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'controls')}
                        style={{ left: cardPositions.controls.x, top: cardPositions.controls.y }}
                        className="absolute w-[380px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default space-y-4 z-10"
                    >
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-900">
                            <span className="text-lg">📦</span>
                            <div>
                                <h3 className="text-sm font-bold text-slate-100">Swarm Input & Controls</h3>
                                <p className="text-[10px] text-slate-400">Ingest GDPR archives or set prompts</p>
                            </div>
                        </div>

                        {/* File Uploader */}
                        <input 
                            type="file" 
                            className="hidden" 
                            ref={fileInputRef} 
                            accept=".zip"
                            onChange={(e) => {
                                if (e.target.files.length > 0) processRealGDPRArchive(e.target.files[0]);
                            }} 
                        />
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border border-dashed p-4 rounded-xl text-center cursor-pointer transition-colors ${
                                isDragOver ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 hover:border-slate-700/60 bg-slate-900/10'
                            }`}
                        >
                            <Icon name="UploadCloud" size={24} className="text-slate-400 mx-auto mb-2" />
                            <div className="text-xs font-semibold text-slate-300">
                                {uploadedFile ? uploadedFile.name : 'Upload GDPR ZIP Archive'}
                            </div>
                            <p className="text-[9px] text-slate-500 mt-1">
                                {uploadedFile ? `${uploadedFile.size} - Ready` : 'Drag folders or click to upload your Meta export'}
                            </p>
                        </div>

                        <textarea
                            value={promptInput}
                            onChange={(e) => setPromptInput(e.target.value)}
                            rows={2}
                            className="w-full bg-slate-900/60 border border-slate-850 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50 resize-none font-sans"
                        />

                        <div className="flex justify-between items-center bg-slate-900/40 p-2 rounded-xl border border-slate-900">
                            <span className="text-xs text-slate-450">Tauri Client</span>
                            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                                <button onClick={() => setDeploymentMode('tauri')} className={`px-2 py-0.5 rounded text-[9px] font-semibold ${deploymentMode === 'tauri' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Tauri</button>
                                <button onClick={() => setDeploymentMode('web')} className={`px-2 py-0.5 rounded text-[9px] font-semibold ${deploymentMode === 'web' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Web</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-1">
                            <Button onClick={handleRunAgent} loading={runningTask} variant="default" size="sm" iconName="Play" className="bg-gradient-to-r from-blue-500 to-indigo-650 text-white text-xs">
                                Launch Swarm
                            </Button>
                            <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm" iconName="Database" className="border-slate-800 hover:bg-slate-800/40 text-slate-350 text-xs">
                                Parse Zip Archive
                            </Button>
                        </div>
                        <Button onClick={handleTrainLoRA} disabled={runningTask} variant="outline" size="sm" iconName="Cpu" className="w-full mt-2 border-purple-500/50 hover:bg-purple-500/10 text-purple-400 text-xs">
                            Train LoRA ML Model
                        </Button>
                    </div>

                    {/* Draggable Card 2: Router */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'router')}
                        style={{ left: cardPositions.router.x, top: cardPositions.router.y }}
                        className="absolute w-[380px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900">
                            <Icon name="Shuffle" size={16} className="text-amber-400" />
                            Model Router
                        </h3>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span>Ollama Local VRAM</span>
                                    <span>{localVram}%</span>
                                </div>
                                <div className="w-full bg-slate-900 rounded-full h-1 border border-slate-850">
                                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${localVram}%` }} />
                                </div>
                            </div>
                            <div className="text-[10px] space-y-1 text-slate-400">
                                <div className="flex justify-between p-1.5 bg-slate-900/30 rounded border border-slate-900">
                                    <span>Scraper Indexing</span>
                                    <span className="text-emerald-400 font-mono">qwen2.5-coder:7b</span>
                                </div>
                                <div className="flex justify-between p-1.5 bg-slate-900/30 rounded border border-slate-900">
                                    <span>Cognitive Synthesis</span>
                                    <span className="text-blue-450 font-mono">gemini-1.5-pro</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Draggable Card 3: Agent Nodes */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'swarm')}
                        style={{ left: cardPositions.swarm.x, top: cardPositions.swarm.y }}
                        className="absolute w-[450px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900">
                            <Icon name="Network" size={16} className="text-blue-400" />
                            Agent Swarm Monitor
                        </h3>
                        <div className="grid grid-cols-2 gap-3 text-center text-xs">
                            <div className={`p-2.5 rounded-xl border ${taskStep === 1 ? 'border-amber-500 bg-amber-500/5 text-amber-400' : 'border-slate-850'}`}>
                                <div className="font-semibold">Researcher Node</div>
                                <span className="text-[8px] opacity-75">Feynman Scholar</span>
                            </div>
                            <div className={`p-2.5 rounded-xl border ${taskStep === 2 ? 'border-blue-500 bg-blue-500/5 text-blue-400' : 'border-slate-850'}`}>
                                <div className="font-semibold">Verifier Node</div>
                                <span className="text-[8px] opacity-75">Grounded Audit</span>
                            </div>
                            <div className={`p-2.5 rounded-xl border ${(taskStep === 3 || taskStep === 4) ? 'border-purple-500 bg-purple-500/5 text-purple-400' : 'border-slate-850'}`}>
                                <div className="font-semibold">Coder Sandbox</div>
                                <span className="text-[8px] opacity-75">Docker Exec</span>
                            </div>
                            <div className={`p-2.5 rounded-xl border taskStep === 5 ? 'border-emerald-500 bg-emerald-500/5 text-emerald-400' : 'border-slate-850'}`}>
                                <div className="font-semibold">Reviewer Node</div>
                                <span className="text-[8px] opacity-75">TDD Checker</span>
                            </div>
                        </div>
                    </div>

                    {/* Draggable Card 4: Terminal Logs */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'terminal')}
                        style={{ left: cardPositions.terminal.x, top: cardPositions.terminal.y }}
                        className="absolute w-[450px] p-6 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl cursor-default space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900">
                            <Icon name="Terminal" size={16} className="text-slate-400" />
                            Docker Execution Sandbox
                        </h3>
                        <div className="h-[210px] overflow-y-auto bg-slate-900/20 p-3 rounded-xl border border-slate-850 font-mono text-[9px] space-y-1.5 text-slate-350">
                            {logs.length === 0 ? (
                                <div className="text-slate-600 italic">Terminal waiting for input triggers...</div>
                            ) : (
                                logs.map((log, i) => (
                                    <div key={i} className={
                                        log.type === 'error' ? 'text-rose-400' :
                                        log.type === 'system' ? 'text-slate-450' :
                                        log.type === 'coding' ? 'text-emerald-400' :
                                        'text-blue-400'
                                    }>
                                        {log.text}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Draggable Card 5: Sandbox Editor */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'editor')}
                        style={{ left: cardPositions.editor.x, top: cardPositions.editor.y }}
                        className="absolute w-[450px] p-6 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl cursor-default space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900">
                            <Icon name="Code" size={16} className="text-emerald-450" />
                            Sandbox File Editor
                        </h3>
                        <div className="h-[320px] overflow-auto bg-slate-900/20 p-3 rounded-xl border border-slate-850 font-mono text-[9px] text-emerald-400 whitespace-pre">
                            {codeOutput ? <code>{codeOutput}</code> : <span className="text-slate-600 italic">No files loaded.</span>}
                        </div>
                    </div>

                    {/* Draggable Card 6: Preview */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'preview')}
                        style={{ left: cardPositions.preview.x, top: cardPositions.preview.y }}
                        className="absolute w-[450px] p-6 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl cursor-default space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900">
                            <Icon name="Eye" size={16} className="text-purple-400" />
                            Visual Component Preview
                        </h3>
                        <div className="h-[180px] bg-slate-900/20 border border-slate-850 rounded-xl flex items-center justify-center p-4">
                            {taskStep === 5 ? (
                                <div className="w-full text-center p-3 border border-emerald-500/20 bg-emerald-500/5 rounded-xl">
                                    <span className="text-xs font-semibold text-emerald-400">FixedPortFinder Module Compiled successfully</span>
                                    <p className="text-[9px] text-slate-500 mt-1">Successfully probed dynamic ports on client daemon.</p>
                                </div>
                            ) : (
                                <span className="text-slate-650 italic text-xs text-center px-4">Component rendering active upon successful compilation.</span>
                            )}
                        </div>
                    </div>

                    {/* Draggable Card 7: Caching */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'caching')}
                        style={{ left: cardPositions.caching.x, top: cardPositions.caching.y }}
                        className="absolute w-[380px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900">
                            <Icon name="Coins" size={16} className="text-emerald-450" />
                            Credit Logs & Caching
                        </h3>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-slate-900/30 p-2.5 rounded-xl border border-slate-850 text-center">
                                <span className="text-[9px] text-slate-500">CREDIT BALANCE</span>
                                <div className="text-lg font-bold mt-0.5 text-slate-200">${creditBalance.toFixed(2)}</div>
                            </div>
                            <div className="bg-slate-900/30 p-2.5 rounded-xl border border-slate-850 text-center">
                                <span className="text-[9px] text-slate-500">CACHE HITS</span>
                                <div className="text-lg font-bold mt-0.5 text-emerald-400">{cacheSavings.hits}</div>
                            </div>
                        </div>
                    </div>

                    {/* Draggable Card 8: Instatic Visual CMS Integration */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'instatic')}
                        style={{ left: cardPositions.instatic.x, top: cardPositions.instatic.y }}
                        className="absolute w-[420px] p-6 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default space-y-4 z-10 font-sans"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center justify-between pb-2 border-b border-slate-900">
                            <div className="flex items-center gap-2">
                                <Icon name="Database" size={16} className="text-cyan-400" />
                                <span>Instatic CMS Engine</span>
                            </div>
                            <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded uppercase tracking-wider">Bun + SQLite Active</span>
                        </h3>

                        <div className="space-y-3.5">
                            <div className="text-[10px] space-y-1.5 text-slate-400">
                                <div className="flex justify-between p-2 bg-slate-900/30 rounded-xl border border-slate-900">
                                    <span>Visual Pages Generated</span>
                                    <span className="text-slate-200 font-mono">3 Pages (index, pricing, dashboard)</span>
                                </div>
                                <div className="flex justify-between p-2 bg-slate-900/30 rounded-xl border border-slate-900">
                                    <span>QuickJS-WASM Sandbox</span>
                                    <span className="text-cyan-400 font-mono">Isolated Worker active</span>
                                </div>
                                <div className="flex justify-between p-2 bg-slate-900/30 rounded-xl border border-slate-900">
                                    <span>Local DB file</span>
                                    <span className="text-slate-350 font-mono">/data/instatic.db (4.2 MB)</span>
                                </div>
                            </div>

                            {/* visual CMS editor preview block */}
                            <div className="bg-[#0b0c10] border border-slate-800 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 blur-xl rounded-full" />
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-slate-500 uppercase tracking-wider font-semibold font-mono">Live Static Build Output</span>
                                    <span className="text-cyan-300 font-mono text-[9px] flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                        Serving on port 3001
                                    </span>
                                </div>
                                <div className="font-mono text-[9px] text-slate-400 bg-black/40 p-2.5 rounded-lg border border-slate-900 space-y-1 mt-1">
                                    <div className="text-emerald-400">✓ [SQLite] Schema synchronized successfully.</div>
                                    <div className="text-slate-450">✓ [QuickJS] Registered 12 custom design system hooks.</div>
                                    <div className="text-cyan-400">✓ [Bun] Rendered static output in 4.2ms (zero runtime JS).</div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button 
                                    onClick={() => {
                                        setLogs(prev => [
                                            ...prev,
                                            { type: 'system', text: '⚡ Instatic: Initiating SQLite visual page synchronization...' },
                                            { type: 'coding', text: '✓ Instatic: Exported static HTML/CSS to visual editor database successfully.' }
                                        ]);
                                    }}
                                    variant="default" 
                                    size="sm" 
                                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg"
                                >
                                    Visual Page Sync
                                </Button>
                                <Button 
                                    onClick={() => {
                                        setLogs(prev => [
                                            ...prev,
                                            { type: 'system', text: '⚙️ Instatic: Mounting QuickJS-WASM sandbox plugins...' },
                                            { type: 'research', text: '🔎 Instatic: Scanned instatic-plugin.config.ts. Found 2 layout engines.' }
                                        ]);
                                    }}
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1 border-slate-800 text-slate-300 hover:bg-slate-900 rounded-lg text-xs"
                                >
                                    Mount SDK Sandbox
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Draggable Card 9: Store Launch Auditor */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'auditor')}
                        style={{ left: cardPositions.auditor?.x || 50, top: cardPositions.auditor?.y || 920 }}
                        className="absolute w-[450px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900">
                            <Icon name="CheckCircle" size={16} className="text-rose-450" />
                            Store Launch Auditor
                        </h3>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                            Run a programmatic compliance scan against Web, Google Play, and iOS configurations. Ensure target API levels, Privacy Manifests, and build scripts meet platform guidelines.
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-850">
                            <div className="bg-slate-900/50 p-2 text-center rounded border border-slate-850">
                                <div className="text-[9px] text-slate-500 uppercase font-mono">Web</div>
                                <div className="text-sm font-bold text-emerald-400">85%</div>
                            </div>
                            <div className="bg-slate-900/50 p-2 text-center rounded border border-slate-850">
                                <div className="text-[9px] text-slate-500 uppercase font-mono">Android</div>
                                <div className="text-sm font-bold text-amber-400">30%</div>
                            </div>
                            <div className="bg-slate-900/50 p-2 text-center rounded border border-slate-850">
                                <div className="text-[9px] text-slate-500 uppercase font-mono">iOS</div>
                                <div className="text-sm font-bold text-rose-400">25%</div>
                            </div>
                        </div>
                        
                        <div className="h-[120px] overflow-y-auto font-mono text-[9px] space-y-2 bg-slate-900/30 p-2 rounded-lg border border-slate-850">
                            <div className="text-slate-400">Last scan: Waiting for scan trigger...</div>
                            <div className="text-rose-400">❌ [iOS] Missing PrivacyInfo.xcprivacy manifest.</div>
                            <div className="text-amber-400">⚠️ [Android] Target API SDK is not set to 36.</div>
                        </div>

                        <Button 
                            onClick={() => {
                                setLogs(prev => [
                                    ...prev,
                                    { type: 'system', text: '🔎 Initiating Publishing Verification Scan across Web, iOS, Android configurations...' },
                                    { type: 'research', text: '✓ [PublishingValidator] Audit complete. Displaying scores in auditor panel.' }
                                ]);
                            }}
                            variant="default" 
                            size="sm" 
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700"
                        >
                            Run Compliance Audit
                        </Button>
                    </div>

                    {/* Draggable Card 10: Workflow Editor */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'workflow')}
                        style={{ left: cardPositions.workflow?.x || 980, top: cardPositions.workflow?.y || 730 }}
                        className="absolute w-[600px] h-[500px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900 shrink-0">
                            <Icon name="GitBranch" size={16} className="text-pink-450" />
                            Agent Orchestration (LangGraph + Mem0)
                        </h3>
                        <div className="flex-1 w-full bg-slate-900/30 rounded-xl overflow-hidden border border-slate-850">
                            <WorkflowEditor />
                        </div>
                    </div>

                    {/* Draggable Card 11: GitNexus 3D Architecture Map */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'gitnexus')}
                        style={{ left: cardPositions.gitnexus?.x || 1600, top: cardPositions.gitnexus?.y || 730 }}
                        className="absolute w-[800px] h-[700px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900 shrink-0">
                            <Icon name="Box" size={16} className="text-[#00d2ff]" />
                            GitNexus 3D Architecture Map
                        </h3>
                        <div className="flex-1 w-full bg-slate-900/30 rounded-xl overflow-hidden border border-slate-850 relative">
                            <CodeGraphViewer3D />
                        </div>
                    </div>

                    {/* Draggable Card 12: Local WebLLM WebGPU */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'webllm')}
                        style={{ left: cardPositions.webllm?.x || 500, top: cardPositions.webllm?.y || 620 }}
                        className="absolute w-[450px] h-[550px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-900 shrink-0">
                            <Icon name="Cpu" size={16} className="text-indigo-400" />
                            Local WebGPU LLM (Zero Server)
                        </h3>
                        <div className="flex-1 w-full bg-slate-900/30 rounded-xl overflow-hidden border border-slate-850 relative">
                            <LocalWebLLM />
                        </div>
                    </div>

                    {/* Draggable Card 13: Fantasy Quant / RxDB Data Grid */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'quantGrid')}
                        style={{ left: cardPositions.quantGrid?.x || 1600, top: cardPositions.quantGrid?.y || 50 }}
                        className="absolute w-[650px] h-[550px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col space-y-4 z-10"
                    >
                        <h3 className="text-sm font-bold text-slate-100 flex items-center justify-between pb-2 border-b border-slate-900 shrink-0">
                            <div className="flex items-center gap-2">
                                <Icon name="Activity" size={16} className="text-emerald-400" />
                                Enterprise Quant Grid
                            </div>
                            <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded uppercase tracking-wider">RxDB Offline-First Sync</span>
                        </h3>
                        <div className="flex-1 w-full bg-slate-900/30 rounded-xl overflow-hidden border border-slate-850 relative">
                            <QuantDataGrid />
                        </div>
                    </div>

                    {/* Draggable Card 14: LiveKit Voice AI */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'voiceAgent')}
                        style={{ left: cardPositions.voiceAgent?.x || 980, top: cardPositions.voiceAgent?.y || 50 }}
                        className="absolute w-[400px] h-[550px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col z-10"
                    >
                        <VoiceAgent />
                    </div>

                    {/* Draggable Card 15: GitNexus Repo Scanner */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'gitnexusScanner')}
                        style={{ left: cardPositions.gitnexusScanner?.x || 50, top: cardPositions.gitnexusScanner?.y || 1450 }}
                        className="absolute w-[600px] h-[450px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col space-y-4 z-10"
                    >
                        <GitHubRepoScanner />
                    </div>

                    {/* Draggable Card 16: 3D Asset Optimizer */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'optimizer3d')}
                        style={{ left: cardPositions.optimizer3d?.x || 900, top: cardPositions.optimizer3d?.y || 1450 }}
                        className="absolute w-[450px] h-[500px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col space-y-4 z-10"
                    >
                        <AssetOptimizer3D />
                    </div>

                    {/* Draggable Card 17: Infra Orchestrator */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'infra')}
                        style={{ left: cardPositions.infra?.x || 50, top: cardPositions.infra?.y || 1950 }}
                        className="absolute w-[800px] h-[550px] p-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col space-y-4 z-10"
                    >
                        <AppInfraOrchestrator />
                    </div>

                    {/* Draggable Card 18: RAG Document Hub */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'ragHub')}
                        style={{ left: cardPositions.ragHub?.x || 900, top: cardPositions.ragHub?.y || 1950 }}
                        className="absolute w-[600px] h-[450px] bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col z-10"
                    >
                        <RAGDocumentHub />
                    </div>

                    {/* Draggable Card 19: Repolyze Blog Automator */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'blogAutomator')}
                        style={{ left: cardPositions.blogAutomator?.x || 50, top: cardPositions.blogAutomator?.y || 2550 }}
                        className="absolute w-[800px] h-[500px] bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col z-10"
                    >
                        <RepolyzeBlogAutomator />
                    </div>

                    {/* Draggable Card 20: Enterprise Integration Suite */}
                    <div
                        onMouseDown={(e) => handleCardMouseDown(e, 'enterpriseSuite')}
                        style={{ left: cardPositions.enterpriseSuite?.x || 900, top: cardPositions.enterpriseSuite?.y || 2550 }}
                        className="absolute w-[600px] h-[450px] bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl cursor-default flex flex-col z-10"
                    >
                        <EnterpriseIntegrationSuite />
                    </div>

                    {/* DYNAMIC MIND MAP CARDS */}
                    {mindmapNodes.map((node) => (
                        <div
                            key={node.id}
                            onMouseDown={(e) => handleCardMouseDown(e, node.id)}
                            style={{ 
                                left: cardPositions[node.id]?.x || 1000, 
                                top: cardPositions[node.id]?.y || 1000 
                            }}
                            onClick={() => setSelectedNode(node)}
                            className={`absolute w-[300px] p-5 rounded-2xl border shadow-xl cursor-pointer transition-colors z-20 ${
                                node.type === 'hub' ? 'bg-blue-950/80 border-blue-750 hover:border-blue-500' :
                                node.type === 'category' ? 'bg-slate-950/80 border-slate-800 hover:border-slate-650' :
                                'bg-slate-900/80 border-emerald-900/80 hover:border-emerald-600'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[9px] uppercase tracking-wide px-2 py-0.5 rounded font-mono bg-slate-900 text-slate-400 border border-slate-850">
                                    {node.type}
                                </span>
                                {node.count && (
                                    <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-2 rounded-full">
                                        {node.count} sources
                                    </span>
                                )}
                            </div>
                            <h4 className="text-xs font-bold text-slate-100">{node.label}</h4>
                            <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{node.summary}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Zoom & Pan Controller Navigation */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur border border-slate-800 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 z-40 text-xs">
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleZoom(-0.1)} className="p-1.5 hover:bg-slate-900 rounded text-slate-450">
                            <Icon name="Minus" size={14} />
                        </button>
                        <span className="text-slate-350 font-semibold font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
                        <button onClick={() => handleZoom(0.1)} className="p-1.5 hover:bg-slate-900 rounded text-slate-450">
                            <Icon name="Plus" size={14} />
                        </button>
                    </div>
                    <div className="w-[1px] h-5 bg-slate-850" />
                    <button onClick={resetCanvas} className="flex items-center gap-1.5 hover:bg-slate-900 px-3 py-1.5 rounded-lg text-slate-300">
                        <Icon name="Maximize" size={12} />
                        Reset Canvas
                    </button>
                </div>

                {/* Selected Mind Map Node details modal */}
                <AnimatePresence>
                    {selectedNode && (
                        <div className="fixed inset-0 z-50 flex items-center justify-end">
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedNode(null)}
                                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                            />

                            {/* Sidebar Panel */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                className="relative w-full max-w-md h-full bg-slate-950 border-l border-slate-850 p-6 shadow-2xl z-10 flex flex-col justify-between"
                            >
                                <div className="space-y-6 overflow-y-auto">
                                    <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                                        <h3 className="text-sm font-bold text-slate-100">{selectedNode.label}</h3>
                                        <button onClick={() => setSelectedNode(null)} className="p-1 text-slate-500 hover:text-slate-300">
                                            <Icon name="X" size={16} />
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Summary</h4>
                                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-900">
                                            {selectedNode.summary}
                                        </p>
                                    </div>

                                    {selectedNode.details && (
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Generated Strategic Steps</h4>
                                            <div className="text-xs text-emerald-400 font-mono bg-slate-900/40 p-3 rounded-xl border border-slate-900 whitespace-pre-wrap">
                                                {selectedNode.details}
                                            </div>
                                        </div>
                                    )}

                                    {selectedNode.sources && (
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Originating Data Sources</h4>
                                            <ul className="space-y-1.5">
                                                {selectedNode.sources.map((src, i) => (
                                                    <li key={i} className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-850 flex items-center gap-2">
                                                        <span className="text-blue-400">🔗</span>
                                                        {src}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-slate-900 flex justify-end">
                                    <Button onClick={() => setSelectedNode(null)} variant="default" size="sm" className="bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800">
                                        Close Panel
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </>
    );
}
