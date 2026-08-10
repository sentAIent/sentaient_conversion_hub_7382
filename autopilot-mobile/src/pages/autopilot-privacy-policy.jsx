import React from 'react';
import { Helmet } from 'react-helmet';

const AutopilotPrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1C] py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-hidden">
      <Helmet>
        <title>Autopilot - Privacy Policy | SentAIent</title>
      </Helmet>
      
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl w-full relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-emerald-500/80 font-medium tracking-wide uppercase text-sm">Autopilot by SentAIent</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/50">
          <div className="prose prose-invert prose-emerald max-w-none text-gray-300">
            <p className="text-sm text-gray-500 font-mono mb-8">Last updated: August 3, 2026</p>
            
            <section className="mb-10 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">01.</span> Information We Collect
              </h2>
              <p className="leading-relaxed">When you use Autopilot, we may collect information regarding your usage, the content you create, and the endpoints you connect to, including OAuth tokens for integrations like TikTok Shop. This ensures we can provide automated services efficiently.</p>
            </section>
            
            <section className="mb-10 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">02.</span> How We Use Your Information
              </h2>
              <p className="leading-relaxed">We use the collected information to operate, maintain, and improve the Autopilot platform. We prioritize your privacy and do not sell your personal data to third parties under any circumstances.</p>
            </section>

            <section className="mb-10 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">03.</span> Data Security
              </h2>
              <p className="leading-relaxed">We implement industry-standard encryption and security measures to protect your data. However, please be aware that no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
            </section>

            <section className="mb-10 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">04.</span> Third-Party Integrations
              </h2>
              <p className="leading-relaxed">Autopilot interacts with third-party platforms such as TikTok. When linking your accounts and utilizing these integrations, you are also subject to the privacy policies and terms of those respective platforms.</p>
            </section>

            <section className="mb-6 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">05.</span> Contact Us
              </h2>
              <p className="leading-relaxed">If you have questions or concerns about this Privacy Policy, our data practices, or would like to request data deletion, please contact our privacy team at <a href="mailto:privacy@sentaient.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">privacy@sentaient.com</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutopilotPrivacyPolicy;
