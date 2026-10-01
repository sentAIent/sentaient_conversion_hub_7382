import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';
import ModelRouter from '../services/ModelRouter';
const DataIngestionDropzone = lazy(() => import('../components/AIDashboard/DataIngestionDropzone'));
import NukeDataButton from '../components/NukeDataButton';
import { mattermostClient } from '../services/MattermostClient';
import { visionModerator } from '../services/VisionModerator';

const MOCK_MESSAGES = [
    { id: 1, sender: "System", content: "End-to-End Encryption established. All AI processing will run locally on your device.", timestamp: new Date(Date.now() - 4000000).toISOString(), type: 'system' },
    { id: 2, sender: "Alice", content: "Hey! Did you check out the database migration plan?", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, sender: "Bob", content: "Yes, I think we need to update the staging environment first.", timestamp: new Date(Date.now() - 3500000).toISOString() },
    { id: 4, sender: "Alice", content: "I agree. Can you handle the backup?", timestamp: new Date(Date.now() - 3400000).toISOString() },
    { id: 5, sender: "Bob", content: "I'll run the pg_dump this afternoon.", timestamp: new Date(Date.now() - 3300000).toISOString() }
];

export default function MatrixChatDemo() {
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState("");
    const [isToxic, setIsToxic] = useState(false);
    const [toxicityScore, setToxicityScore] = useState(0);
    const [summary, setSummary] = useState(null);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [smartReplies, setSmartReplies] = useState([]);
    const [isGeneratingReplies, setIsGeneratingReplies] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState({ mockIds: [], archives: [] });
    
    // Engine states
    const [engineStatus, setEngineStatus] = useState("Loading...");
    const routerRef = useRef(null);

    // Embeddings cache for RAG
    const [embeddingsStore, setEmbeddingsStore] = useState([]);
    
    // Mattermost Backend State
    const [backendStatus, setBackendStatus] = useState("Connecting to Mattermost...");
    const [channelId, setChannelId] = useState("demo-channel-id"); // Hardcoded for demo

    // Vision States
    const [visionStatus, setVisionStatus] = useState("Offline");
    const [pendingImage, setPendingImage] = useState(null);
    const [isProcessingImage, setIsProcessingImage] = useState(false);

    useEffect(() => {
        let isMounted = true;
        
        async function loadBackendAndEngines() {
            // 1. Try to connect to Mattermost Backend
            let useMock = false;
            try {
                // In a real app, this would be an actual user login flow
                await mattermostClient.login('sysadmin', 'sysadmin'); // Default MM credentials
                setBackendStatus("Connected to Mattermost");
                
                // Fetch initial posts
                const postData = await mattermostClient.getPosts(channelId);
                if (postData && postData.posts) {
                    const loadedMessages = postData.order.map(id => {
                        const p = postData.posts[id];
                        return {
                            id: p.id,
                            sender: p.user_id === mattermostClient.userId ? "Me" : "Colleague",
                            content: p.message,
                            timestamp: new Date(p.create_at).toISOString()
                        };
                    }).reverse();
                    
                    if (isMounted) setMessages(loadedMessages);
                }
            } catch (err) {
                console.warn("Mattermost backend not reachable, falling back to offline mode.");
                if (isMounted) {
                    setBackendStatus("Offline Mode (Local Only)");
                    useMock = true;
                }
            }

            // 2. Load Edge AI Engines
            setEngineStatus("Initializing Transformers.js (Downloading WebAssembly & Models)...");
            setVisionStatus("Initializing YOLOS Vision Model...");
            try {
                const router = new ModelRouter();
                routerRef.current = router;
                
                await router.initBrowserModel();
                await router.initSemanticSearch();
                await router.initModeration();
                
                // Initialize Vision Model asynchronously
                visionModerator.init().then(() => {
                    if (isMounted) setVisionStatus("Online (Zero Data Leak)");
                }).catch(err => {
                    console.error("Vision model failed", err);
                    if (isMounted) setVisionStatus("Failed");
                });
                
                if (isMounted) {
                    setEngineStatus("Online (Zero Latency)");
                    
                    // Pre-compute embeddings for current messages (either from MM or Mock)
                    const store = [];
                    const msgsToEmbed = useMock ? MOCK_MESSAGES : messages;
                    for (const msg of msgsToEmbed) {
                        if (msg.type !== 'system') {
                            const vec = await router.getBrowserEmbeddings(msg.content);
                            store.push({ id: msg.id, vector: vec });
                        }
                    }
                    setEmbeddingsStore(store);
                    
                    // Generate initial smart replies based on last message
                    generateSmartReplies(msgsToEmbed);
                }
            } catch (err) {
                console.error("Failed to init engines:", err);
                if (isMounted) setEngineStatus("Failed to load local models.");
            }
        }
        
        loadBackendAndEngines();

        // Subscribe to live Mattermost WebSocket events
        const unsubscribe = mattermostClient.onMessage((post) => {
            if (post.channel_id !== channelId) return;
            const newMsg = {
                id: post.id,
                sender: post.user_id === mattermostClient.userId ? "Me" : "Colleague",
                content: post.message,
                imageUrl: post.props?.imageUrl,
                timestamp: new Date(post.create_at).toISOString()
            };
            setMessages(prev => {
                const isDuplicate = prev.some(m => m.id === newMsg.id);
                return isDuplicate ? prev : [...prev, newMsg];
            });
        });
        
        return () => { 
            isMounted = false; 
            unsubscribe();
        };
    }, []);

    // Cosine similarity for RAG
    const cosineSimilarity = (vecA, vecB) => {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        if (normA === 0 || normB === 0) return 0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    };

    // 1. RAG Search
    useEffect(() => {
        if (!searchQuery.trim() || !routerRef.current || embeddingsStore.length === 0) {
            setSearchResults({ mockIds: [], archives: [] });
            return;
        }

        const runSearch = async () => {
            try {
                const queryVec = await routerRef.current.getBrowserEmbeddings(searchQuery);
                const mockResults = embeddingsStore.map(item => {
                    return {
                        id: item.id,
                        score: cosineSimilarity(queryVec, item.vector)
                    };
                })
                .filter(res => res.score > 0.3) // threshold
                .sort((a, b) => b.score - a.score)
                .map(r => r.id);

                const archiveResults = await routerRef.current.searchLocalDB(searchQuery, 0.3);

                setSearchResults({ mockIds: mockResults, archives: archiveResults });
            } catch (err) {
                console.error("Search error:", err);
            }
        };
        
        const debounce = setTimeout(runSearch, 400);
        return () => clearTimeout(debounce);
    }, [searchQuery, embeddingsStore]);

    // 2. On-Device Content Moderation
    useEffect(() => {
        if (!inputText.trim() || !routerRef.current) {
            setIsToxic(false);
            return;
        }
        
        const runModeration = async () => {
            try {
                const results = await routerRef.current.moderateTextBrowser(inputText);
                const toxicResult = results.find(r => r.label === 'toxic' || r.label === 'LABEL_1');
                
                if (toxicResult && toxicResult.score > 0.8) {
                    setIsToxic(true);
                    setToxicityScore(toxicResult.score);
                } else {
                    setIsToxic(false);
                }
            } catch (err) {
                console.error("Moderation error:", err);
            }
        };

        const debounce = setTimeout(runModeration, 300);
        return () => clearTimeout(debounce);
    }, [inputText]);

    // 3. Chat Summarization
    const handleSummarize = async () => {
        if (!routerRef.current) return;
        setIsSummarizing(true);
        try {
            const chatLog = messages.filter(m => m.type !== 'system').map(m => `${m.sender}: ${m.content}`).join('\\n');
            const prompt = `<|im_start|>system\\nYou are a helpful AI that summarizes encrypted chats.<|im_end|>\\n<|im_start|>user\\nSummarize this chat concisely:\\n${chatLog}<|im_end|>\\n<|im_start|>assistant\\n`;
            
            const result = await routerRef.current.executeBrowserModel(prompt);
            const finalSummary = result.split('<|im_start|>assistant\\n')[1] || result;
            setSummary(finalSummary.trim());
        } catch (err) {
            console.error("Summary error:", err);
            setSummary("Failed to generate summary.");
        }
        setIsSummarizing(false);
    };

    // 4. Smart Replies
    const generateSmartReplies = async (currentMessages) => {
        if (!routerRef.current) return;
        setIsGeneratingReplies(true);
        try {
            const lastMsg = currentMessages[currentMessages.length - 1];
            if (lastMsg.sender === 'Me' || lastMsg.type === 'system') {
                setSmartReplies([]);
                setIsGeneratingReplies(false);
                return;
            }
            
            const prompt = `<|im_start|>system\\nYou provide short, natural replies to messages.<|im_end|>\\n<|im_start|>user\\nSuggest 3 short responses to: "${lastMsg.content}". Output as a comma separated list.<|im_end|>\\n<|im_start|>assistant\\n`;
            const result = await routerRef.current.executeBrowserModel(prompt);
            const rawReplies = result.split('<|im_start|>assistant\\n')[1] || result;
            
            const replies = rawReplies.split(',').map(s => s.trim().replace(/^"|"$/g, '')).filter(s => s.length > 0 && s.length < 50).slice(0, 3);
            setSmartReplies(replies.length > 0 ? replies : ["Yes", "No", "I agree."]);
        } catch (err) {
            console.error("Smart reply error:", err);
            setSmartReplies([]);
        }
        setIsGeneratingReplies(false);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsProcessingImage(true);
        try {
            // Process the image on the edge
            const result = await visionModerator.processAndBlur(file, ['person', 'cell phone', 'car']);
            setPendingImage(result);
        } catch (err) {
            console.error("Vision processing failed:", err);
        } finally {
            setIsProcessingImage(false);
        }
    };

    const handleSendMessage = async () => {
        if ((!inputText.trim() && !pendingImage) || isToxic) return;
        
        const tempId = `temp-${Date.now()}`;
        const newMsg = {
            id: tempId,
            sender: "Me",
            content: inputText,
            imageUrl: pendingImage ? pendingImage.url : null,
            blurred: pendingImage ? pendingImage.blurred : false,
            timestamp: new Date().toISOString()
        };
        
        // Optimistic UI update
        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        setInputText("");
        setPendingImage(null);
        setSmartReplies([]);
        
        if (routerRef.current && newMsg.content) {
            const vec = await routerRef.current.getBrowserEmbeddings(newMsg.content);
            setEmbeddingsStore(prev => [...prev, { id: newMsg.id, vector: vec }]);
        }

        // Send to Mattermost Backend if online
        try {
            if (mattermostClient.token) {
                // In a real app we'd upload the file to Mattermost first, then attach file_ids.
                // For this demo, we can simulate attachment via props if it's a blob url.
                const serverPost = await mattermostClient.request('/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        channel_id: channelId,
                        message: newMsg.content,
                        props: { imageUrl: newMsg.imageUrl }
                    })
                });
                
                setMessages(prev => prev.map(m => m.id === tempId ? { ...m, id: serverPost.id } : m));
            }
        } catch (err) {
            console.error("Failed to send message to Mattermost:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans pt-20">
            <Helmet>
                <title>Matrix Edge AI Demo | Sentaient</title>
            </Helmet>
            <Header />

            <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Panel: Chat Interface */}
                <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col h-[80vh] overflow-hidden shadow-2xl backdrop-blur-md relative">
                    
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold">
                                E2E
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-slate-100">Project Alpha Protocol</h2>
                                <div className="text-xs text-emerald-400 flex items-center gap-1">
                                    <Icon name="Lock" size={10} /> Encrypted & Local
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono bg-black/40 px-2 py-1 rounded">
                                Backend: {backendStatus} | Text AI: {engineStatus} | Vision: {visionStatus}
                            </span>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                        {messages.map(msg => {
                            const isHighlighted = searchResults.mockIds.includes(msg.id);
                            
                            if (msg.type === 'system') {
                                return (
                                    <div key={msg.id} className="self-center bg-emerald-500/10 text-emerald-400/80 text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                                        <Icon name="ShieldCheck" size={12} />
                                        {msg.content}
                                    </div>
                                );
                            }
                            
                            const isMe = msg.sender === 'Me';
                            return (
                                <div key={msg.id} className={`flex flex-col max-w-[80%] ${isMe ? 'self-end items-end' : 'self-start'}`}>
                                    <span className="text-[10px] text-slate-500 mb-1 ml-1">{msg.sender}</span>
                                    <div className={`p-3 rounded-2xl ${
                                        isHighlighted 
                                            ? 'bg-amber-500/20 border border-amber-500/50 text-amber-100' 
                                            : isMe 
                                                ? 'bg-blue-600 text-white rounded-br-sm' 
                                                : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                                    }`}>
                                        {msg.imageUrl && (
                                            <div className="mb-2">
                                                <img src={msg.imageUrl} alt="Upload" className="rounded max-w-full h-auto max-h-48 object-contain" />
                                                {msg.blurred && (
                                                    <div className="text-[9px] mt-1 text-emerald-300 font-mono flex items-center gap-1">
                                                        <Icon name="Shield" size={10} /> PII Automatically Blurred on Edge
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {msg.content}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Smart Replies */}
                    {smartReplies.length > 0 && (
                        <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-slate-800/50 bg-slate-900/30">
                            <Icon name="Sparkles" size={14} className="text-purple-400 shrink-0 mt-1" />
                            {smartReplies.map((reply, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInputText(reply)}
                                    className="whitespace-nowrap px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 text-xs rounded-full transition-colors"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Chat Input */}
                    <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex flex-col gap-2">
                        {isToxic && (
                            <div className="mb-1 text-xs text-rose-400 bg-rose-500/10 px-3 py-2 rounded-lg flex items-center gap-2 border border-rose-500/20">
                                <Icon name="AlertTriangle" size={14} />
                                <span>Message flagged for toxicity ({(toxicityScore * 100).toFixed(0)}%). Cannot send.</span>
                            </div>
                        )}
                        
                        {pendingImage && (
                            <div className="flex items-center gap-3 bg-black/40 p-2 rounded-xl border border-slate-700 w-fit">
                                <img src={pendingImage.url} alt="Preview" className="h-12 w-12 object-cover rounded" />
                                <div className="text-xs text-slate-300">
                                    {pendingImage.blurred ? (
                                        <span className="text-emerald-400 font-mono flex items-center gap-1">
                                            <Icon name="ShieldCheck" size={12} /> {pendingImage.detections.length} objects blurred securely
                                        </span>
                                    ) : (
                                        <span>Image clear (No PII detected)</span>
                                    )}
                                </div>
                                <button onClick={() => setPendingImage(null)} className="ml-2 text-slate-500 hover:text-white">
                                    <Icon name="X" size={14} />
                                </button>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <label className={`flex items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-4 cursor-pointer transition-colors ${isProcessingImage ? 'opacity-50' : ''}`}>
                                {isProcessingImage ? <Icon name="Loader" size={18} className="animate-spin text-slate-400" /> : <Icon name="Image" size={18} className="text-slate-300" />}
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isProcessingImage} />
                            </label>
                            
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !isToxic && handleSendMessage()}
                                placeholder="Type an encrypted message..."
                                className={`flex-1 bg-black/40 border ${isToxic ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-700 focus:border-blue-500'} rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors`}
                            />
                            <Button 
                                onClick={handleSendMessage} 
                                disabled={isToxic || (!inputText.trim() && !pendingImage)}
                                className={`${isToxic ? 'bg-slate-700 opacity-50' : 'bg-blue-600 hover:bg-blue-500'} text-white rounded-xl px-6`}
                            >
                                <Icon name="Send" size={18} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Intelligence Tools */}
                <div className="flex flex-col gap-6">
                    
                    {/* 1. Local Semantic Search (RAG) */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="Search" size={18} className="text-amber-400" />
                            <h3 className="font-bold text-slate-100">Local Semantic Search</h3>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">Search encrypted history using vector embeddings locally in your browser.</p>
                        
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="e.g. 'Database stuff'"
                            className="w-full bg-black/40 border border-slate-700 focus:border-amber-500 rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors"
                        />
                        {searchQuery && (
                            <div className="mt-2 text-[10px] text-slate-500 text-right">
                                Found {searchResults.mockIds.length} relevant messages.
                            </div>
                        )}

                        {/* Display Archive Results */}
                        {searchResults.archives && searchResults.archives.length > 0 && (
                            <div className="mt-4 flex flex-col gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                <h4 className="text-[10px] uppercase font-bold text-amber-500">Archive Matches ({searchResults.archives.length})</h4>
                                {searchResults.archives.slice(0, 5).map((res, i) => (
                                    <div key={i} className="bg-black/50 rounded p-3 border border-slate-800">
                                        <div className="flex justify-between text-[10px] text-slate-500 mb-2">
                                            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{res.metadata.source}</span>
                                            <span className="text-amber-500/70">{(res.score * 100).toFixed(0)}% Match</span>
                                        </div>
                                        <div className="text-xs text-slate-300">
                                            {res.metadata.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Data Ingestion */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="Database" size={18} className="text-blue-400" />
                            <h3 className="font-bold text-slate-100">Archive Ingestion</h3>
                        </div>
                        <Suspense fallback={<div className="text-sm text-slate-400 p-4 text-center">Loading extraction engine...</div>}>
                            <DataIngestionDropzone />
                        </Suspense>
                    </div>
                    
                    {/* GDPR Compliance */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="Shield" size={18} className="text-red-400" />
                            <h3 className="font-bold text-slate-100">GDPR Compliance</h3>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">Wipe all local records, embeddings, and keys permanently.</p>
                        <NukeDataButton />
                    </div>

                    {/* 2. Chat Summarization */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="FileText" size={18} className="text-emerald-400" />
                            <h3 className="font-bold text-slate-100">E2EE Chat Summarization</h3>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">Summarize this room without decrypting messages on the server.</p>
                        
                        <Button 
                            onClick={handleSummarize} 
                            loading={isSummarizing}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700"
                        >
                            Generate Local Summary
                        </Button>

                        {summary && (
                            <div className="mt-4 p-3 bg-black/40 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 leading-relaxed">
                                {summary}
                            </div>
                        )}
                    </div>

                    {/* 3. Local Autonomous Agent */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="Bot" size={18} className="text-cyan-400" />
                            <h3 className="font-bold text-slate-100">Local Copilot</h3>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">I monitor your encrypted DMs and can perform automated local tasks based on context.</p>
                        
                        <div className="border border-slate-800 bg-black/40 rounded-lg p-3">
                            <div className="text-[10px] text-cyan-500 mb-1 font-mono uppercase">Agent Status</div>
                            <div className="text-xs text-slate-300">
                                {engineStatus.includes('Online') ? 'Monitoring incoming DMs for tasks...' : 'Offline'}
                            </div>
                        </div>
                    </div>
                </div>
                
            </main>
        </div>
    );
}
