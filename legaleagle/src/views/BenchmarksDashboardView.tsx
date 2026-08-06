import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart3, Activity, Brain, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

interface BenchmarkData {
    agent_type: string;
    avg_rating: number;
    total_feedback: number;
}

interface FeedbackEntry {
    id: string;
    created_at: string;
    agent_generations: {
        agent_type: string;
        user_tier: string;
    };
    rating: number;
    comments: string;
}

export const BenchmarksDashboardView = () => {
    const [benchmarks, setBenchmarks] = useState<BenchmarkData[]>([]);
    const [recentFeedback, setRecentFeedback] = useState<FeedbackEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [learningStatus, setLearningStatus] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch raw feedback data to calculate benchmarks
            // In a real prod environment, you'd use a Supabase RPC or view for agg
            const { data: feedbackData, error: feedbackError } = await supabase
                .from('user_feedback')
                .select(`
                    id,
                    rating,
                    comments,
                    created_at,
                    agent_generations ( agent_type, user_tier )
                `)
                .order('created_at', { ascending: false })
                .limit(50);

            if (feedbackError) throw feedbackError;

            if (feedbackData) {
                setRecentFeedback(feedbackData as any[]);

                // Calculate averages
                const agentStats: Record<string, { totalScore: number; count: number }> = {};
                
                feedbackData.forEach((fb: any) => {
                    const type = fb.agent_generations?.agent_type || 'unknown';
                    if (!agentStats[type]) {
                        agentStats[type] = { totalScore: 0, count: 0 };
                    }
                    agentStats[type].totalScore += fb.rating;
                    agentStats[type].count += 1;
                });

                const benchmarkArray = Object.keys(agentStats).map(type => ({
                    agent_type: type,
                    avg_rating: agentStats[type].totalScore / agentStats[type].count,
                    total_feedback: agentStats[type].count
                }));
                
                setBenchmarks(benchmarkArray);
            }
        } catch (error) {
            console.error('Error fetching benchmark data:', error);
        } finally {
            setLoading(false);
        }
    };

    const triggerLearning = async () => {
        setLearningStatus('Triggering learning pipeline...');
        try {
            // Call our local docker-manager trigger endpoint
            const res = await fetch('http://localhost:11236/api/trigger-learning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'super-secret-local-key'
                }
            });
            const data = await res.json();
            if (data.success) {
                setLearningStatus('Learning pipeline triggered successfully!');
            } else {
                setLearningStatus('Error triggering pipeline.');
            }
        } catch (error) {
            setLearningStatus('Failed to connect to local docker-manager.');
        }
        setTimeout(() => setLearningStatus(null), 3000);
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading benchmark data...</div>;
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                        <Activity className="w-6 h-6 mr-2 text-indigo-400" />
                        Prompt Benchmarks & Learning
                    </h1>
                    <p className="text-gray-400">Monitor agent performance and trigger self-improvement loops.</p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex flex-col items-end">
                    <button
                        onClick={triggerLearning}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    >
                        <Brain className="w-4 h-4 mr-2" />
                        Trigger Learning Loop
                    </button>
                    {learningStatus && (
                        <span className="text-sm text-indigo-400 mt-2">{learningStatus}</span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Benchmarks Overview */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                            Agent Performance
                        </h2>
                        
                        {benchmarks.length === 0 ? (
                            <p className="text-gray-400 text-sm">No benchmark data available yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {benchmarks.map(b => (
                                    <div key={b.agent_type} className="flex justify-between items-center p-3 bg-gray-900 rounded-lg">
                                        <div>
                                            <div className="text-white font-medium capitalize">{b.agent_type.replace('_', ' ')}</div>
                                            <div className="text-xs text-gray-400">{b.total_feedback} reviews</div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {b.avg_rating >= 4 ? (
                                                <ThumbsUp className="w-4 h-4 text-green-400" />
                                            ) : b.avg_rating <= 2 ? (
                                                <ThumbsDown className="w-4 h-4 text-red-400" />
                                            ) : (
                                                <Activity className="w-4 h-4 text-yellow-400" />
                                            )}
                                            <span className="text-white font-bold">{b.avg_rating.toFixed(1)}/5</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Feedback */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
                            Recent User Feedback
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-400">
                                <thead className="text-xs text-gray-400 uppercase bg-gray-900">
                                    <tr>
                                        <th className="px-4 py-3 rounded-tl-lg">Agent</th>
                                        <th className="px-4 py-3">Rating</th>
                                        <th className="px-4 py-3">Tier</th>
                                        <th className="px-4 py-3 rounded-tr-lg">Comments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentFeedback.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-8 text-center">
                                                No feedback submitted yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentFeedback.map((fb) => (
                                            <tr key={fb.id} className="border-b border-gray-700 last:border-0 hover:bg-gray-750 transition-colors">
                                                <td className="px-4 py-3 font-medium text-white capitalize">
                                                    {fb.agent_generations?.agent_type?.replace('_', ' ') || 'Unknown'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                        fb.rating >= 4 ? 'bg-green-500/20 text-green-400' :
                                                        fb.rating <= 2 ? 'bg-red-500/20 text-red-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                        {fb.rating}/5
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 capitalize">{fb.agent_generations?.user_tier || 'standard'}</td>
                                                <td className="px-4 py-3 text-gray-300 max-w-xs truncate" title={fb.comments}>
                                                    {fb.comments || <span className="text-gray-500 italic">No comment</span>}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
