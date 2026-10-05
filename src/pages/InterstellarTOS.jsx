import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const InterstellarTOS = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Helmet>
                <title>Terms of Service - Interstellar | sentAIent</title>
                <meta name="description" content="Terms of Service for Interstellar" />
            </Helmet>

            <Header />

            <main className="container mx-auto px-4 py-24 max-w-4xl pt-32">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 font-cinzel text-blue-400">Terms of Service</h1>
                <div className="prose prose-invert max-w-none font-exo text-gray-300">
                    <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-white">1. Acceptance of Terms</h2>
                    <p className="mb-4">
                        By accessing and playing Interstellar, you agree to be bound by these Terms of Service. 
                        If you do not agree to these terms, please do not use the application.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. Virtual Goods & Purchases</h2>
                    <p className="mb-4">
                        Any in-game currencies (such as Gems) or virtual items purchased are non-refundable. 
                        They have no real-world monetary value and cannot be exchanged for cash. We reserve the 
                        right to modify the pricing or availability of virtual goods at any time.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. Fair Play</h2>
                    <p className="mb-4">
                        Exploiting bugs, modifying the client, or using unauthorized third-party software to 
                        gain an unfair advantage is strictly prohibited and will result in an immediate account ban.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InterstellarTOS;
