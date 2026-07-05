import React from 'react';
import { Theme } from '@/types/theme.types';

interface TOSViewProps {
    currentTheme: Theme;
}

export const TOSView: React.FC<TOSViewProps> = ({ currentTheme }) => {
    return (
        <div className={`flex-1 p-8 overflow-auto ${currentTheme.main}`}>
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className={`text-4xl font-bold mb-8 ${currentTheme.panelText}`}>Terms of Service</h1>
                <p className={`text-lg ${currentTheme.panelText} opacity-80`}>Effective Date: July 5, 2026</p>
                
                <div className={`p-8 rounded-2xl ${currentTheme.card} ${currentTheme.docBorder} border space-y-6`}>
                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>1. Acceptance of Terms</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed`}>
                            By accessing or using LegalEagle, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access the service.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>2. Disclaimer of Legal Advice</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed font-semibold`}>
                            LegalEagle is an AI-powered document analysis tool, NOT a law firm. The output provided by our service does not constitute legal advice, nor does it create an attorney-client relationship. You should consult with a qualified attorney for specific legal guidance.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>3. Service Usage and Quotas</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed`}>
                            Usage of our service is subject to subscription tiers and quotas. We reserve the right to limit or suspend access if usage significantly exceeds typical limits or violates our fair use policy.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>4. Intellectual Property</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed`}>
                            The LegalEagle platform, branding, and proprietary algorithms are owned by us. You retain full ownership of the documents you upload and the specific analytical outputs generated from them for your internal use.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.panelText}`}>5. Limitation of Liability</h2>
                        <p className={`${currentTheme.panelText} opacity-80 leading-relaxed`}>
                            To the maximum extent permitted by law, LegalEagle shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};
