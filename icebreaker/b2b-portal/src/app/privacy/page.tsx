export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-gray-300 py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Information We Collect</h2>
          <p>Icebreaker ("we", "our", or "us") collects information when you use our mobile application and web services. This includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Data:</strong> Name, email address, phone number, and payment information.</li>
            <li><strong>Location Data:</strong> Precise GPS location (with your consent) to enable Geo-Swarm features and localized bounties.</li>
            <li><strong>Media and Content:</strong> Photos, videos, and audio recorded or uploaded to claim bounties.</li>
            <li><strong>Device Information:</strong> IP address, device type, operating system, and App interactions.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Facilitate Geo-Swarm check-ins and verify physical presence at venues.</li>
            <li>Process payments and bounty payouts via our third-party payment processor (Stripe).</li>
            <li>Review and approve user-generated content (UGC) for bounty claims.</li>
            <li>Improve app performance, security, and prevent fraud.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Data Sharing and Security</h2>
          <p>We do not sell your personal data. We may share information with trusted third-party service providers (e.g., Stripe for payments, AWS for hosting) strictly to operate our services. We employ industry-standard encryption to protect your data.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Your Rights</h2>
          <p>You have the right to access, modify, or delete your personal data. You can permanently delete your account and associated data directly within the Icebreaker mobile app under Profile settings.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@sentaient.com.</p>
        </section>
      </div>
    </div>
  );
}
