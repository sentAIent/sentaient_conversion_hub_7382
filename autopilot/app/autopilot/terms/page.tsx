import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 text-gray-200">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#60a9ff] drop-shadow-sm mb-8">
          Terms of Service
        </h1>
        
        <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-300">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using SentAIent AutoPilot ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. Description of Service</h2>
            <p>
              SentAIent AutoPilot provides AI-powered marketing and content generation tools. You understand that the Service uses artificial intelligence to generate content and that the outputs may not always be accurate, appropriate, or free of errors. You are solely responsible for reviewing any generated content before publishing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. User Accounts and Security</h2>
            <p>
              You must provide accurate information when connecting third-party accounts (e.g., TikTok, Instagram, YouTube) via our OAuth integrations. You are responsible for safeguarding the passwords and API keys you use to access the Service and for any activities or actions under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">4. User Content and License</h2>
            <p>
              You retain all rights to any data, text, or media you submit to the Service. By using the Service, you grant SentAIent a worldwide, non-exclusive, royalty-free license to use, reproduce, and process your content solely for the purpose of providing the Service to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">5. Acceptable Use</h2>
            <p>
              You agree not to use the Service to generate or publish content that is illegal, defamatory, harassing, abusive, fraudulent, or infringes on the intellectual property rights of others. We reserve the right to suspend or terminate accounts that violate these guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SentAIent shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes. Your continued use of the Service following the posting of any changes constitutes acceptance of those changes.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p>If you have any questions about these Terms, please contact support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
