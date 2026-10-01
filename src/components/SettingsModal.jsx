import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NukeDataButton from './NukeDataButton';

const SettingsModal = ({ isOpen, onClose }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    if (!isOpen) return null;

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            if (currentUser) {
                // Delete the profile data first
                await supabase.from('profiles').delete().eq('id', currentUser.id);
                
                // Call a Supabase Edge Function or RPC to delete the auth user
                // Note: The client cannot delete its own auth.users row directly without an RPC/Function
                const { error } = await supabase.rpc('delete_user');
                if (error) console.error("Error deleting auth user:", error);
                
                await logout();
                alert("Account deleted successfully.");
                navigate('/');
            }
        } catch (e) {
            console.error("Failed to delete account:", e);
            alert("Failed to delete account. Please contact support.");
        }
        setIsDeleting(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
            <div className="bg-[#10141e] border border-[#5c7a8a]/30 rounded-xl max-w-md w-full p-6 text-white relative overflow-hidden">
                <h2 className="text-3xl font-cinzel text-center text-[#00f3ff] mb-6">Settings</h2>
                
                <div className="space-y-6">
                    {/* Privacy & Data Section */}
                    <div className="p-4 bg-gray-900/40 border border-gray-500/30 rounded-lg">
                        <h3 className="text-gray-300 font-bold mb-2">Privacy & Data (GDPR)</h3>
                        <p className="text-sm text-gray-400 mb-4">Manage your local data footprint and semantic embeddings.</p>
                        <NukeDataButton />
                    </div>

                    <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                        <h3 className="text-red-400 font-bold mb-2">Danger Zone</h3>
                        {!showConfirm ? (
                            <button 
                                onClick={() => setShowConfirm(true)}
                                className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded text-red-400 font-bold transition-all"
                            >
                                Delete Account
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-sm text-red-200">Are you sure? This will permanently delete your account, ships, gems, and all data. This action cannot be undone.</p>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setShowConfirm(false)}
                                        className="flex-1 py-2 bg-gray-500/10 border border-gray-500/50 rounded text-gray-300"
                                        disabled={isDeleting}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleDeleteAccount}
                                        className="flex-1 py-2 bg-red-600 hover:bg-red-500 rounded text-white font-bold"
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="mt-6 w-full py-3 bg-transparent border border-white/20 hover:bg-white/5 rounded text-white transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SettingsModal;
