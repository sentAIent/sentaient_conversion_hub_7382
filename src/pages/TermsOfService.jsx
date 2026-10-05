import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans p-8 md:p-16 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto bg-black/40 border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Terms of Service</h1>
        
        <p className="mb-6 text-sm text-gray-400">Last Updated: August 2026</p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">1. Acceptance of Terms</h2>
          <p className="leading-relaxed mb-4">
            By downloading, installing, or using the Sentaient AI Avatar Studio and related web services (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">2. Description of Service</h2>
          <p className="leading-relaxed mb-4">
            Sentaient provides an AI-driven conversational avatar platform. The Service allows users to interact with customizable 3D avatars via voice and text, utilizing advanced language models and local rendering technologies.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">3. User Conduct and Responsibilities</h2>
          <p className="leading-relaxed mb-4">
            You agree to use the Service only for lawful purposes. You are solely responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Any content, audio, or text you input into the Service.</li>
            <li>Ensuring you have the right to upload or use any custom 3D avatar models (VRM files) within the app.</li>
            <li>Maintaining the confidentiality of your account credentials (if applicable).</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">4. Intellectual Property</h2>
          <p className="leading-relaxed mb-4">
            The Service and its original content, features, and functionality (excluding user-provided VRM models and user inputs) are and will remain the exclusive property of Sentaient and its licensors. You may not reproduce, modify, or distribute any part of the Service without our express written permission.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">5. "Blind Spot" Psychological Mode</h2>
          <p className="leading-relaxed mb-4">
            The Service includes experimental AI personas, such as a "Blind Spot" psychological growth mode. <strong>Disclaimer:</strong> This feature is powered by artificial intelligence and is designed for entertainment and personal reflection only. It does not constitute professional psychological advice, diagnosis, or treatment. Always seek the advice of a qualified mental health provider with any questions regarding your well-being.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">6. Limitation of Liability</h2>
          <p className="leading-relaxed mb-4">
            In no event shall Sentaient, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to, use of, or inability to use the Service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">7. Contact Us</h2>
          <p className="leading-relaxed">
            For any questions regarding these Terms, please contact us at legal@sentaient.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
