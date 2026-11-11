import React, { useState, useEffect } from 'react';
import { Cpu, Server, Activity, Play, RefreshCw, Zap, Shield, CheckCircle2, AlertTriangle, Layers, Database } from 'lucide-react';

export default function DistributedComputeRouter() {
    const [workers, setWorkers] = useState([
        { id: 'worker-node-01', type: 'Bare-Metal vLLM (H100)', ip: '10.0.4.12', status: 'ready', load: 38, vram: '68/80 GB', model: 'Llama-3.3-70B-Instruct' },
        { id: 'worker-node-02', type: 'Asynq Queue Daemon (Go)', ip: '10.0.4.18', status: 'processing', load: 74, vram: 'N/A (CPU)', model: 'Batch Task Runner' },
        { id: 'worker-node-03', type: 'Ray Distributed Node', ip: '10.0.4.25', status: 'ready', load: 19, vram: '42/80 GB', model: 'Multi-Agent Simulator' },
        { id: 'worker-edge-04', type: 'Browser Web-LLM (Local)', ip: '127.0.0.1 (Client)', status: 'ready', load: 8, vram: '3.2/8 GB (Shared)', model: 'Llama-3.2-3B-WebGPU' },
    ]);

    const [tasks, setTasks] = useState([
        { id: 'task-8921', name: 'Bulk Product Image glTF WebAssembly Compression (142 files)', queue: 'high_priority', status: 'completed', worker: 'worker-node-02', elapsed: '4.2s' },
        { id: 'task-8922', name: 'Open-Glean RAG Vectorization (Whitepaper PDF 180 pgs)', queue: 'default', status: 'running', worker: 'worker-node-03', elapsed: '1.8s' },
        { id: 'task-8923', name: 'vLLM Deep Conversion Reasoning (70B Synthesizer)', queue: 'realtime', status: 'completed', worker: 'worker-node-01', elapsed: '820ms' },
    ]);

    const [selectedModelTier, setSelectedModelTier] = useState('auto');
    const [isDispatching, setIsDispatching] = useState(false);
    const [activeTab, setActiveTab] = useState('queues'); // 'queues' | 'workers' | 'router'

    const dispatchTestJob = () => {
        setIsDispatching(true);
        const newTaskId = `task-${Math.floor(1000 + Math.random() * 9000)}`;
        const newTask = {
            id: newTaskId,
            name: 'Autonomous Cart Checkout Friction Scan (Ray Cluster)',
            queue: 'high_priority',
            status: 'queued',
            worker: 'worker-node-03',
            elapsed: '0.1s'
        };

        setTasks(prev => [newTask, ...prev]);

        setTimeout(() => {
            setTasks(prev => prev.map(t => t.id === newTaskId ? { ...t, status: 'running', elapsed: '1.2s' } : t));
        }, 1200);

        setTimeout(() => {
            setTasks(prev => prev.map(t => t.id === newTaskId ? { ...t, status: 'completed', elapsed: '2.7s' } : t));
            setIsDispatching(false);
        }, 3200);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <Cpu size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Distributed Compute & Queue Router
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Zero-Docker Bare-Metal
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Powered by Asynq (Go Redis) • vLLM • Ray Distributed Workers</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-xs">
                        <button
                            onClick={() => setActiveTab('queues')}
                            className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'queues' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Asynq Queues
                        </button>
                        <button
                            onClick={() => setActiveTab('workers')}
                            className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'workers' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Node Fleet (4)
                        </button>
                        <button
                            onClick={() => setActiveTab('router')}
                            className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'router' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            vLLM Routing
                        </button>
                    </div>

                    <button
                        onClick={dispatchTestJob}
                        disabled={isDispatching}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${isDispatching ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'}`}
                    >
                        {isDispatching ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} />}
                        Dispatch Job
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {activeTab === 'queues' && (
                    <div className="space-y-4">
                        {/* Queue Stats Bar */}
                        <div className="grid grid-cols-4 gap-3">
                            <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Active Tasks</p>
                                <p className="text-xl font-bold text-slate-100 mt-1">12 <span className="text-xs font-normal text-emerald-400">+4/m</span></p>
                            </div>
                            <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Processed (24h)</p>
                                <p className="text-xl font-bold text-slate-100 mt-1">14,289</p>
                            </div>
                            <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Queue Latency</p>
                                <p className="text-xl font-bold text-emerald-400 mt-1">14ms</p>
                            </div>
                            <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Retry / Failed</p>
                                <p className="text-xl font-bold text-slate-300 mt-1">0 <span className="text-[10px] text-slate-500">(100% SLA)</span></p>
                            </div>
                        </div>

                        {/* Recent Asynq Tasks Table */}
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300">
                                <span>Recent Asynq Task Stream</span>
                                <span className="font-mono text-[10px] text-slate-500">Redis Stream: asynq:sentaient:main</span>
                            </div>
                            <div className="divide-y divide-slate-800/60">
                                {tasks.map((task) => (
                                    <div key={task.id} className="p-3.5 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-1.5 rounded-lg text-xs ${
                                                task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                                task.status === 'running' ? 'bg-amber-500/10 text-amber-400 animate-pulse' :
                                                'bg-slate-800 text-slate-400'
                                            }`}>
                                                {task.status === 'completed' ? <CheckCircle2 size={14} /> :
                                                 task.status === 'running' ? <Activity size={14} /> :
                                                 <Layers size={14} />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-slate-200">{task.name}</p>
                                                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-mono">
                                                    <span>{task.id}</span>
                                                    <span>•</span>
                                                    <span className="text-indigo-400">{task.queue}</span>
                                                    <span>•</span>
                                                    <span>{task.worker}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                                                task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                task.status === 'running' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                'bg-slate-800 text-slate-400'
                                            }`}>
                                                {task.status} ({task.elapsed})
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'workers' && (
                    <div className="grid grid-cols-2 gap-3.5">
                        {workers.map((worker) => (
                            <div key={worker.id} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-lg bg-slate-800 text-indigo-400 border border-slate-700">
                                            <Server size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-200">{worker.type}</h4>
                                            <p className="text-[10px] font-mono text-slate-500">{worker.id} • {worker.ip}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        {worker.status}
                                    </span>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-[11px]">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Active Model / Purpose:</span>
                                        <span className="font-mono text-slate-200">{worker.model}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Hardware Utilization:</span>
                                        <span className="font-mono text-emerald-400 font-semibold">{worker.load}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${worker.load}%` }} />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                                        <span>VRAM: {worker.vram}</span>
                                        <span>Daemon: Foreman Native</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'router' && (
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
                        <div>
                            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                                <Zap size={16} className="text-amber-400" />
                                Dynamic Model Fallback & Routing Matrix
                            </h4>
                            <p className="text-xs text-slate-400 mt-1">
                                Intelligently distributes reasoning between Zero-Cost In-Browser WebGPU models and Dedicated Bare-Metal vLLM clusters.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 pt-2">
                            <div 
                                onClick={() => setSelectedModelTier('browser')}
                                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedModelTier === 'browser' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                            >
                                <div className="text-xs font-bold text-emerald-400">Tier 1: Browser Web-LLM</div>
                                <div className="text-[11px] text-slate-300 font-medium mt-1">Llama-3.2-3B WebGPU</div>
                                <p className="text-[10px] text-slate-500 mt-2">Zero cloud inference cost. Real-time UI micro-interactions and input validation.</p>
                            </div>

                            <div 
                                onClick={() => setSelectedModelTier('auto')}
                                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedModelTier === 'auto' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                            >
                                <div className="text-xs font-bold text-indigo-400">Tier 2: Auto-Routing (Default)</div>
                                <div className="text-[11px] text-slate-300 font-medium mt-1">Adaptive Cost/Latency Engine</div>
                                <p className="text-[10px] text-slate-500 mt-2">Runs light queries on browser, seamlessly upgrades complex analysis to vLLM 70B.</p>
                            </div>

                            <div 
                                onClick={() => setSelectedModelTier('vllm')}
                                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedModelTier === 'vllm' ? 'border-purple-500 bg-purple-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                            >
                                <div className="text-xs font-bold text-purple-400">Tier 3: Dedicated vLLM</div>
                                <div className="text-[11px] text-slate-300 font-medium mt-1">Llama-3.3-70B-Instruct</div>
                                <p className="text-[10px] text-slate-500 mt-2">Bare-metal GPU instance managed via Foreman. Deep code synthesis and complex RAG.</p>
                            </div>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Shield size={14} className="text-emerald-400" />
                                Active Policy: <strong>Hybrid Zero-Docker Fallback</strong>
                            </span>
                            <span className="font-mono text-slate-500">Target Latency: &lt;150ms TTFT</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
