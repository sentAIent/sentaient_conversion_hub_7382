export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-gray-300 py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p>By downloading, accessing, or using the Icebreaker mobile application and web portals (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Services.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Description of Services</h2>
          <p>Icebreaker provides a platform for users to discover local venues, participate in "Geo-Swarm" campaigns, and complete User-Generated Content (UGC) bounties in exchange for monetary rewards or discounts. Venues use our B2B portal to manage these campaigns.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. User Conduct and UGC</h2>
          <p>You agree not to upload content that is illegal, offensive, discriminatory, or violates the intellectual property rights of others. Icebreaker reserves the right to reject bounty claims, remove content, or ban accounts that violate these terms.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Payments and Fees</h2>
          <p>Bounty payouts and campaign purchases are processed securely via Stripe. Icebreaker charges a platform service fee (typically 15%) on merchant transactions to cover processing and operational costs. Payouts to users are subject to merchant approval of the submitted content.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Termination</h2>
          <p>We may suspend or terminate your access to the Services at any time, without notice, for conduct that violates these Terms or is otherwise harmful to other users or the platform.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">6. Disclaimer of Warranties</h2>
          <p>The Services are provided "AS IS" without warranties of any kind. Icebreaker is not responsible for the actions of individual users or physical venues during Geo-Swarms.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">7. Contact</h2>
          <p>For support or legal inquiries, contact us at support@sentaient.com.</p>
        </section>
      </div>
    </div>
  );
}
