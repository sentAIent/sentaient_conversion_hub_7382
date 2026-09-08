import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 text-gray-200">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#60a9ff] drop-shadow-sm mb-8">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-300">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. Introduction</h2>
            <p>
              At SentAIent AutoPilot, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI content generation and publishing services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, and authentication credentials (e.g., Supabase Auth).</li>
              <li><strong>Connected Platforms:</strong> OAuth tokens, profile data, and analytics from third-party services you authorize, such as TikTok, Instagram, X (Twitter), and YouTube.</li>
              <li><strong>User Content:</strong> Prompts, brand assets, generated scripts, media files, and campaigns created within the platform.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our application, diagnostics, and performance metrics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, operate, and maintain our Service.</li>
              <li>Generate AI content based on your brand context and inputs.</li>
              <li>Publish approved content directly to your authorized social media accounts.</li>
              <li>Improve, personalize, and expand our platform.</li>
              <li>Communicate with you regarding updates, security alerts, and support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">4. Third-Party AI Models</h2>
            <p>
              To provide our core service, your text prompts and selected brand assets may be processed by third-party AI providers (such as OpenAI, Google Gemini, or Anthropic). We do not permit these providers to use your personal data to train their foundational models.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">5. Data Security</h2>
            <p>
              We implement industry-standard administrative, technical, and physical security measures to protect your personal information. OAuth tokens and database records are secured using Supabase Row Level Security (RLS) and encrypted at rest.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">6. Your Data Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. You can also revoke OAuth access to connected social media accounts directly from your platform settings or from the respective platform's security page.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p>If you have any questions about this Privacy Policy, please contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
