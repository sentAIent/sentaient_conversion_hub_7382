'use client';
import React, { useState } from 'react';

interface FolderModalProps {
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
}

export function FolderModal({ onClose, onSubmit }: FolderModalProps) {
  const [folderName, setFolderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(folderName.trim());
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-white">New Folder</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder name"
            autoFocus
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#60a9ff] text-white"
            required
          />
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#60a9ff] hover:bg-[#4a85cc] text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
