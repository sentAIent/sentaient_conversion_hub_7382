export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="mb-4">Last Updated: August 2026</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us, such as when you create or modify your account, use our services, or communicate with us. This includes your name, email address, and interactions with our AI agents and analytics dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information we collect to provide, maintain, and improve our fantasy sports analytics services. Your chat interactions with J.A.R.V.I.S. may be used to improve our AI models and the accuracy of our quantitative recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Data Security</h2>
            <p className="leading-relaxed">
              We implement state-of-the-art security measures including Row Level Security (RLS) on our databases, strict Content Security Policies (CSP), and encrypted connections to protect your personal information and API keys from unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at support@sentaient.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
