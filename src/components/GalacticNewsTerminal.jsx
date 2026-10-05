import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import Icon from './AppIcon';

const GalacticNewsTerminal = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data, error: fetchError } = await supabase
                    .from('galactic_news_feed')
                    .select('*')
                    .order('published_at', { ascending: false })
                    .limit(10);

                if (fetchError) throw fetchError;
                setNews(data || []);
            } catch (err) {
                console.error('Failed to fetch galactic news:', err);
                setError('Neural link to Galactic News Network disrupted.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

        // Optional: Set up real-time subscription
        const channel = supabase
            .channel('news_updates')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'galactic_news_feed'
                },
                (payload) => {
                    setNews((current) => [payload.new, ...current].slice(0, 10));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    if (loading) {
        return (
            <div className="w-full max-w-2xl mx-auto p-6 bg-card border border-border rounded-xl shadow-lg flex justify-center items-center h-64">
                <div className="flex flex-col items-center gap-4 text-primary">
                    <Icon name="Activity" size={32} className="animate-pulse" />
                    <span className="text-sm font-mono uppercase tracking-widest">Establishing secure link...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-2xl mx-auto p-6 bg-destructive/10 border border-destructive rounded-xl text-center text-destructive">
                <Icon name="AlertTriangle" size={24} className="mx-auto mb-2" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            <div className="bg-primary/10 border-b border-border p-4 flex items-center gap-3">
                <Icon name="Globe" size={24} className="text-primary" />
                <h2 className="text-xl font-bold font-mono text-foreground uppercase tracking-wider">
                    Galactic News Network
                </h2>
                <div className="ml-auto text-xs text-muted-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    LIVE FEED
                </div>
            </div>

            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {news.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground italic">
                        No recent broadcasts detected in this sector.
                    </div>
                ) : (
                    news.map((item) => (
                        <article key={item.id} className="p-6 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-bold text-foreground leading-tight">
                                    {item.headline}
                                </h3>
                                <time className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                                    {new Date(item.published_at).toLocaleDateString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </time>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.content}
                            </p>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
};

export default GalacticNewsTerminal;
