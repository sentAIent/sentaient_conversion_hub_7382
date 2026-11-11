import React, { useState } from 'react';
import { MessageSquare, Phone, Send, CheckCircle2, ShoppingBag, ExternalLink, Sparkles, User, Bot, ArrowRight, ShieldCheck } from 'lucide-react';

export default function OmnichannelBridge() {
    const [selectedThread, setSelectedThread] = useState('wa_1');
    const [replyText, setReplyText] = useState('');
    const [isGeneratingLink, setIsGeneratingLink] = useState(false);

    const [threads, setThreads] = useState([
        {
            id: 'wa_1',
            channel: 'WhatsApp',
            channelColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            customer: 'Camille Dupont',
            phone: '+33 6 42 19 88 02',
            avatar: 'CD',
            lastMsg: 'Can you confirm if the leather is Tuscan vegetable-tanned?',
            time: '2m ago',
            cartValue: '$1,450.00',
            messages: [
                { sender: 'customer', text: 'Hello, I was looking at the Sienna Weekender Duffle on your site. Can you confirm if the leather is Tuscan vegetable-tanned?', time: '14:20' },
                { sender: 'bot', text: 'Bonjour Camille! Yes, absolutely. According to our Master Craftsman Specifications (indexed in our RAG Knowledge Base), the Sienna Weekender is handcrafted in Florence using 100% full-grain Tuscan vegetable-tanned leather with hand-burnished edges.', time: '14:21' },
                { sender: 'customer', text: 'Wonderful! Is there any complimentary monogramming available before holiday shipping?', time: '14:22' },
                { sender: 'bot', text: 'Yes! We have complimentary blind-embossing or gold foil stamping available for orders placed today. I have prepared your checkout link with free monogramming pre-applied:', time: '14:23', hasCheckout: true, checkoutAmount: '$1,450.00' }
            ]
        },
        {
            id: 'sms_2',
            channel: 'iMessage / SMS',
            channelColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
            customer: 'Jameson Thorne',
            phone: '+1 (415) 890-2114',
            avatar: 'JT',
            lastMsg: 'Does the Cashmere Overcoat run slim?',
            time: '12m ago',
            cartValue: '$890.00',
            messages: [
                { sender: 'customer', text: 'Hey there, does the Loro Piana Cashmere Overcoat run slim or tailored? I normally wear a 40R.', time: '14:10' },
                { sender: 'bot', text: 'Hi Jameson! It features a classic tailored European cut. For a 40R with layering over a knit sweater, Size 50 (US 40) fits true to size with an unconstrained chest drape.', time: '14:11' }
            ]
        },
        {
            id: 'tg_3',
            channel: 'Telegram VIP',
            channelColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
            customer: 'Victoria Sterling',
            phone: '@victoria_sterling',
            avatar: 'VS',
            lastMsg: 'Where is my order #LUX-8921?',
            time: '28m ago',
            cartValue: '$3,400.00',
            messages: [
                { sender: 'customer', text: 'Hi concierge, could you check the courier dispatch for my bespoke trunk order #LUX-8921?', time: '13:50' },
                { sender: 'bot', text: 'Good afternoon Lady Victoria! Your bespoke trunk was cleared through customs in Geneva today and is scheduled for priority white-glove courier delivery tomorrow by 11:30 AM via FedEx Priority First.', time: '13:51' }
            ]
        }
    ]);

    const activeThreadData = threads.find(t => t.id === selectedThread) || threads[0];

    const handleSendCustomCheckout = () => {
        setIsGeneratingLink(true);
        setTimeout(() => {
            setIsGeneratingLink(false);
            const newMsg = {
                sender: 'bot',
                text: 'Here is your custom expedited checkout link with priority overnight courier dispatch included:',
                time: 'Just now',
                hasCheckout: true,
                checkoutAmount: activeThreadData.cartValue
            };
            setThreads(prev => prev.map(t => t.id === selectedThread ? { ...t, messages: [...t.messages, newMsg] } : t));
        }, 1200);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <MessageSquare size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Omnichannel Conversational Concierge
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                WhatsApp • SMS • Telegram
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">RAG-Powered Conversational Checkout • Meta & Twilio API Native</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSendCustomCheckout}
                        disabled={isGeneratingLink}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        <ShoppingBag size={13} />
                        {isGeneratingLink ? 'Generating...' : 'Drop 1-Click Checkout Link'}
                    </button>
                </div>
            </div>

            {/* Split View */}
            <div className="flex flex-1 overflow-hidden">
                {/* Thread Sidebar */}
                <div className="w-1/3 border-r border-slate-800 bg-slate-900/40 p-3 flex flex-col gap-2 overflow-y-auto">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">Active Conversations</span>
                    {threads.map(t => (
                        <div
                            key={t.id}
                            onClick={() => setSelectedThread(t.id)}
                            className={`p-3 rounded-xl cursor-pointer transition-all border ${
                                selectedThread === t.id 
                                    ? 'bg-slate-800/80 border-indigo-500/50 shadow-sm' 
                                    : 'bg-slate-900/30 border-slate-800/60 hover:bg-slate-800/40'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-1.5">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${t.channelColor}`}>
                                    {t.channel}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">{t.time}</span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-200">{t.customer}</h4>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.lastMsg}</p>
                            <div className="mt-2 pt-2 border-t border-slate-800/60 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                                <span>Cart: <strong className="text-emerald-400">{t.cartValue}</strong></span>
                                <span className="text-indigo-400">RAG Ready</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Panel */}
                <div className="flex-1 p-4 flex flex-col bg-[#0a0d14] overflow-hidden">
                    <div className="pb-3 mb-3 border-b border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
                                {activeThreadData.avatar}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200">{activeThreadData.customer}</h4>
                                <p className="text-[10px] text-slate-500 font-mono">{activeThreadData.phone} • {activeThreadData.channel}</p>
                            </div>
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            High Conversion Intent
                        </span>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                        {activeThreadData.messages.map((m, idx) => (
                            <div key={idx} className={`flex flex-col ${m.sender === 'customer' ? 'items-start' : 'items-end'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                                    m.sender === 'customer' 
                                        ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm' 
                                        : 'bg-indigo-950/40 border border-indigo-500/30 text-indigo-100 rounded-tr-sm'
                                }`}>
                                    <p>{m.text}</p>

                                    {m.hasCheckout && (
                                        <div className="mt-3 p-3 bg-slate-950/80 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-3">
                                            <div className="space-y-0.5">
                                                <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">1-Click Apple Pay / Stripe</span>
                                                <p className="text-xs font-bold text-slate-100">Total: {m.checkoutAmount}</p>
                                            </div>
                                            <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20">
                                                Complete Order <ArrowRight size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{m.time}</span>
                            </div>
                        ))}
                    </div>

                    {/* Policy Banner */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <Sparkles size={13} className="text-emerald-400" />
                            RAG Grounding: Responses grounded in <strong>Open-Glean verified product specs</strong>.
                        </span>
                        <span className="font-mono text-slate-500">Auto-Responder: Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
