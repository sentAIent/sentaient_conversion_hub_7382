import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyTerms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 md:px-16 font-sans">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="text-blue-400 hover:text-blue-300 mb-8 flex items-center transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Legal, Privacy & Terms</h1>
        <p className="text-gray-400 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400 border-b border-gray-800 pb-2">1. Privacy Policy</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <h3 className="text-xl font-medium text-white">Data Collection and Usage</h3>
            <p>
              At Sentaient, we respect your privacy. When using our AI Coach and Cognitive Agent services, we collect basic account information (email, name) and usage analytics to improve model inference.
            </p>
            <h3 className="text-xl font-medium text-white">Data Sovereignty & Security</h3>
            <p>
              Your data is stored securely using industry-standard encryption. Financial transactions are handled entirely through our payment partners (Stripe, Apple, Google) and we never store your full credit card information.
            </p>
            <h3 className="text-xl font-medium text-white">Third-Party Sharing</h3>
            <p>
              We do not sell your personal data. We may share anonymous telemetry with our AI partners for the sole purpose of improving edge model performance.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400 border-b border-gray-800 pb-2">2. Terms of Service</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <h3 className="text-xl font-medium text-white">Account Terms</h3>
            <p>
              You must be 18 years or older to use this Service. You are responsible for maintaining the security of your account and password.
            </p>
            <h3 className="text-xl font-medium text-white">Subscriptions and In-App Purchases</h3>
            <p>
              Certain features, such as the Solvent AI Coach, require one-time payments or subscriptions. These are billed via Apple RevenueCat or Stripe. All payments are non-refundable unless required by local law.
            </p>
            <h3 className="text-xl font-medium text-white">Acceptable Use</h3>
            <p>
              You agree not to use the AI agents for illegal activities, harassment, or to generate malicious code. We reserve the right to terminate accounts that violate these terms.
            </p>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>For legal inquiries, please contact legal@sentaient.com</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Sentaient. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyTerms;
