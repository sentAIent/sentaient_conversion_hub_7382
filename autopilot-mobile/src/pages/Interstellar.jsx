import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/ui/Header';

const Interstellar = () => {
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-secondary">Loading Interstellar Game...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Interstellar - Aether Map | sentAIent.com</title>
                <meta
                    name="description"
                    content="Aether Map - Pre-Placement Cartographer. An interactive space exploration and mapping game."
                />
                <meta name="keywords" content="interstellar, space game, cartography, interactive map, constellation builder" />
                <meta property="og:title" content="Interstellar - Aether Map | sentAIent" />
                <meta property="og:description" content="Explore the cosmos with Aether Map - an interactive space cartography experience." />
                <meta property="og:type" content="website" />
            </Helmet>

            <Header />

            {/* Fullscreen Game Iframe */}
            <div className="fixed top-0 left-0 w-full h-full" style={{ paddingTop: '60px' }}>
                <iframe
                    src="/interstellar-game/index.html"
                    title="Interstellar Game - Aether Map"
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

export default Interstellar;
