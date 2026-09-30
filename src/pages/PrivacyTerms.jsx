import React from 'react';

export default function PrivacyTerms() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 py-20 px-8">
      <div className="max-w-3xl mx-auto bg-white p-10 shadow-lg rounded-2xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy & Terms of Service</h1>
        
        <p className="mb-4 text-sm text-neutral-500">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Privacy & Data Collection</h2>
          <p className="mb-4 leading-relaxed">
            Sentaient (including MindWave and Scenery Simulator) respects your privacy. We collect minimal telemetry to improve the AI generation process. 
            When using native iOS and Android apps, your local device permissions (like Background Audio and Network) are strictly used for delivering immersive experiences and are never sold to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Native Subscriptions (IAP)</h2>
          <p className="mb-4 leading-relaxed">
            Digital goods purchased within the mobile application are processed through Apple App Store and Google Play Store Native In-App Purchases. 
            Stripe is only used for physical goods or professional AI consulting services booked directly on our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Generative AI Services</h2>
          <p className="mb-4 leading-relaxed">
            Prompts submitted to the Scenery Simulator and MindWave are processed by our backend AI providers (MiniMax, Google Gemini). Do not submit sensitive personal information in your prompts.
          </p>
        </section>
        
        <p className="text-center text-neutral-500 mt-12 pt-8 border-t border-neutral-100">
          Contact support@sentaient.com for compliance and data deletion requests.
        </p>
      </div>
    </div>
  );
}
