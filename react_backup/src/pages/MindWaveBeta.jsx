import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const MindWaveBeta = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050510] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                    <p className="text-teal-400 font-mono text-sm tracking-widest">INITIALIZING BETA HUB...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>MindWave Beta | sentAIent.com</title>
            </Helmet>

            <div className="fixed top-0 left-0 w-full h-full">
                <iframe
                    src="/mindwave-beta.html"
                    title="MindWave Beta Studio"
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

export default MindWaveBeta;
