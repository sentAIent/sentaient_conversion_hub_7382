import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const MindWave = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-secondary">Loading MindWave...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>MindWave - Binaural Beats Studio | sentAIent.com</title>
                <meta
                    name="description"
                    content="MindWave Binaural Beats Studio - Advanced brainwave entrainment with binaural beats, isochronic tones, and healing frequencies for meditation, focus, and relaxation."
                />
                <meta name="keywords" content="binaural beats, isochronic tones, meditation, focus, brainwave entrainment, healing frequencies, relaxation" />
                <meta property="og:title" content="MindWave - Binaural Beats Studio | sentAIent" />
                <meta property="og:description" content="Advanced brainwave entrainment studio with binaural beats, healing frequencies, and immersive visualizations." />
                <meta property="og:type" content="website" />
            </Helmet>

            {/* Fullscreen MindWave App Iframe */}
            <div className="fixed top-0 left-0 w-full h-full">
                <iframe
                    src="/mindwave.html"
                    title="MindWave Binaural Beats Studio"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="w-full h-full"
                    style={{ border: 'none', display: 'block' }}
                ></iframe>
            </div>
        </>
    );
};

export default MindWave;
