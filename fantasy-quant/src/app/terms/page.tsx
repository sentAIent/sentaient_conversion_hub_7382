export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="mb-4">Last Updated: August 2026</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using our fantasy sports analytics platform, including the J.A.R.V.I.S. AI agent, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Service Description</h2>
            <p className="leading-relaxed">
              We provide quantitative analytics, lineup optimizers, and AI-driven insights for fantasy sports. The insights provided are for informational and entertainment purposes only. We do not guarantee the accuracy, completeness, or usefulness of this information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. User Conduct and Abuse</h2>
            <p className="leading-relaxed">
              You agree not to misuse our services. This includes bypassing rate limits, sharing paid accounts, scraping data, or attempting to exploit vulnerabilities in our APIs or systems. We reserve the right to terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Limitation of Liability</h2>
            <p className="leading-relaxed">
              In no event shall we be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, financial losses from daily fantasy sports contests or betting, resulting from the use or inability to use the service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
