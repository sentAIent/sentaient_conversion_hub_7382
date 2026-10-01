import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const InterstellarPrivacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Helmet>
                <title>Privacy Policy - Interstellar | sentAIent</title>
                <meta name="description" content="Privacy Policy for Interstellar" />
            </Helmet>

            <Header />

            <main className="container mx-auto px-4 py-24 max-w-4xl pt-32">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 font-cinzel text-blue-400">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none font-exo text-gray-300">
                    <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-white">1. Information We Collect</h2>
                    <p className="mb-4">
                        When you play Interstellar, we collect standard gameplay data, including your fleet composition, 
                        inventory, and progress. If you create an account, we store your authenticated details securely 
                        via Supabase.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. How We Use Your Data</h2>
                    <p className="mb-4">
                        Your data is exclusively used to provide cloud saves, synchronize your multiplayer experience, 
                        and improve the game engine. We do not sell your personal data to third parties.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. Third-Party Services</h2>
                    <p className="mb-4">
                        We utilize secure third-party services such as Supabase for database hosting and RevenueCat 
                        for processing in-app purchases. These providers adhere to strict data security standards.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InterstellarPrivacy;
