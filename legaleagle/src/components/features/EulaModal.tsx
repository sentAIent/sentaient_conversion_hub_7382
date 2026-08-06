import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useUIStore } from '@/store';

export const EulaModal: React.FC = () => {
    const { user } = useAuth();
    const currentTheme = useUIStore(s => s.currentTheme);
    const [isVisible, setIsVisible] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);

    useEffect(() => {
        const checkEulaStatus = async () => {
            if (!user) {
                setIsVisible(false);
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('eula_accepted')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error fetching EULA status', error);
                return;
            }

            if (!data?.eula_accepted) {
                setIsVisible(true);
            }
        };

        checkEulaStatus();
    }, [user]);

    const handleAccept = async () => {
        if (!user) return;
        setIsAccepting(true);

        const { error } = await supabase.rpc('update_profile', {
            new_eula_accepted: true
        });

        setIsAccepting(false);

        if (error) {
            console.error('Error accepting EULA:', error);
            alert('There was a problem accepting the EULA. Please try again.');
        } else {
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            
            <div 
                className="relative w-full max-w-2xl rounded-2xl p-8 shadow-2xl border max-h-[85vh] flex flex-col"
                style={{ 
                    backgroundColor: currentTheme.background,
                    borderColor: currentTheme.border,
                    color: currentTheme.text
                }}
            >
                <div className="flex items-center gap-3 mb-6 shrink-0">
                    <Shield className="w-8 h-8 text-blue-500" />
                    <h2 className="text-2xl font-bold font-serif">End User License Agreement</h2>
                </div>

                <div 
                    className="flex-1 overflow-y-auto p-4 rounded-xl border text-sm space-y-4"
                    style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}
                >
                    <p className="font-semibold text-lg">LegalEagle Standard EULA</p>
                    <p>
                        By using the LegalEagle application ("App"), you agree to the following terms and conditions.
                    </p>
                    <p className="font-semibold">1. Scope of License</p>
                    <p>
                        We grant you a non-transferable, non-exclusive license to use the App on your devices in accordance with the Usage Rules set forth by the respective App Store.
                    </p>
                    <p className="font-semibold">2. Privacy and Data Collection</p>
                    <p>
                        You acknowledge that your use of the App requires the processing of documents and text. We process this data in accordance with our Privacy Policy.
                    </p>
                    <p className="font-semibold">3. No Legal Advice</p>
                    <p>
                        The App provides AI-assisted document analysis and generation. This is not a substitute for professional legal advice from a qualified attorney. We disclaim all liability for any decisions made based on the outputs of the App.
                    </p>
                    <p className="font-semibold">4. Objectionable Content and Abusive Behavior</p>
                    <p>
                        There is zero tolerance for objectionable content or abusive users. Any violation will result in immediate termination of your account.
                    </p>
                    <p className="font-semibold">5. Account Deletion</p>
                    <p>
                        You may request the deletion of your account and all associated data at any time via the Settings menu.
                    </p>
                </div>

                <div className="mt-6 flex justify-end shrink-0 pt-4 border-t" style={{ borderColor: currentTheme.border }}>
                    <button
                        onClick={handleAccept}
                        disabled={isAccepting}
                        className="px-8 py-3 rounded-xl font-medium transition-all text-white disabled:opacity-50"
                        style={{ backgroundColor: currentTheme.accent }}
                    >
                        {isAccepting ? 'Accepting...' : 'I Agree and Accept'}
                    </button>
                </div>
            </div>
        </div>
    );
};
