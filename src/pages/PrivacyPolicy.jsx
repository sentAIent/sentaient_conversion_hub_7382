import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans p-8 md:p-16 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto bg-black/40 border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Privacy Policy</h1>
        
        <p className="mb-6 text-sm text-gray-400">Last Updated: August 2026</p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">1. Introduction</h2>
          <p className="leading-relaxed mb-4">
            Welcome to Sentaient ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our AI Avatar Studio mobile application and website (the "Service").
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">2. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Device & Usage Data:</strong> We may collect anonymized telemetry data, including error logs, token usage, and interaction frequency to improve the stability and performance of our services.</li>
            <li><strong>Audio & Visual Data:</strong> The application may request access to your device's microphone and camera. <strong>This data is processed locally on your device in real-time</strong> to drive avatar lip-syncing, emotional responsiveness, and voice recognition. We do not store or transmit raw audio/video recordings to our servers unless explicitly requested by you for a specific feature (e.g., cloud-based transcription).</li>
            <li><strong>Conversation Data:</strong> To provide intelligent responses, your text inputs or transcribed speech are processed by AI models. Depending on your configuration, this may be processed locally (e.g., via Ollama) or sent securely to cloud providers (e.g., OpenAI, Google).</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">3. Local vs. Cloud Processing</h2>
          <p className="leading-relaxed mb-4">
            We prioritize your privacy by offering robust local-processing modes. When using local models, your conversational data never leaves your device. If you opt to use cloud-based models for enhanced intelligence, your prompts and responses are transmitted via encrypted connections. We do not use your personal conversations to train our foundational models.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">4. Data Security</h2>
          <p className="leading-relaxed mb-4">
            We implement industry-standard security measures to protect your data. All cloud communications are encrypted using HTTPS/TLS. User-specific settings and imported 3D models (VRM files) are stored securely in your device's local sandbox (IndexedDB or Native Storage) and are not accessible by third parties.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">5. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions or concerns about this Privacy Policy, please contact us at privacy@sentaient.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
