import React from 'react';
import { Helmet } from 'react-helmet';

const AutopilotTOS = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1C] py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-hidden">
      <Helmet>
        <title>Autopilot - Terms of Service | SentAIent</title>
      </Helmet>
      
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl w-full relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-emerald-500/80 font-medium tracking-wide uppercase text-sm">Autopilot by SentAIent</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/50">
          <div className="prose prose-invert prose-emerald max-w-none text-gray-300">
            <p className="text-sm text-gray-500 font-mono mb-8">Last updated: August 3, 2026</p>
            
            <section className="mb-10 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">01.</span> Introduction
              </h2>
              <p className="leading-relaxed">Welcome to SentAIent Autopilot. By accessing or using our automated marketing platform and tools, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.</p>
            </section>
            
            <section className="mb-10 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">02.</span> Use of Services
              </h2>
              <p className="leading-relaxed">Autopilot provides automated tools to build, manage, and scale your social media presence, including automated TikTok Shop creation. You are solely responsible for the content you distribute through Autopilot and must ensure it complies with all applicable laws and third-party guidelines.</p>
            </section>

            <section className="mb-10 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">03.</span> API Usage and Limitations
              </h2>
              <p className="leading-relaxed">You agree not to abuse the provided API integrations. Reverse engineering, scraping, or attempting to circumvent rate limits is strictly prohibited and will result in immediate termination of your account.</p>
            </section>

            <section className="mb-10 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">04.</span> Termination
              </h2>
              <p className="leading-relaxed">We reserve the right to suspend or terminate your access to Autopilot at any time, for any reason, without notice or liability. Upon termination, your right to use the services will immediately cease.</p>
            </section>

            <section className="mb-6 group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 transition-colors group-hover:text-emerald-400">
                <span className="text-emerald-500">05.</span> Contact
              </h2>
              <p className="leading-relaxed">If you have any questions regarding these Terms, please contact our legal team at <a href="mailto:support@sentaient.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">support@sentaient.com</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutopilotTOS;
