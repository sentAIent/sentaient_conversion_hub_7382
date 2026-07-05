import React from 'react';
import { Theme } from '@/types/theme.types';

interface PrivacyPolicyViewProps {
    currentTheme: Theme;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ currentTheme }) => {
    return (
        <div className={`flex-1 p-8 overflow-auto ${currentTheme.main}`}>
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className={`text-4xl font-bold mb-8 ${currentTheme.panelText}`}>Privacy Policy</h1>
                <p className={`text-lg ${currentTheme.panelText} opacity-80`}>Effective Date: July 5, 2026</p>
                
                <div className={`p-8 rounded-2xl ${currentTheme.card} ${currentTheme.docBorder} border space-y-6`}>
                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>1. Information We Collect</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed`}>
                            We collect information you provide directly to us when using LegalEagle, including account details, payment information (processed securely through our partners), and the documents you upload for analysis.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>2. How We Use Your Information</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed`}>
                            Your uploaded documents are processed securely using our AI infrastructure to provide legal analysis, summaries, and recommendations. We do not use your confidential documents to train our public models without explicit consent.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>3. Data Security and Storage</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed`}>
                            We implement enterprise-grade security measures. Your data is encrypted at rest and in transit. You maintain ownership of your documents and can request deletion at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>4. Subscriptions and Billing</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed`}>
                            Subscription data is handled via RevenueCat and our payment providers. We do not store full credit card numbers on our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>5. Contact Us</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed`}>
                            If you have questions about this policy or your data, please contact our Data Protection Officer at privacy@legaleagle.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};
