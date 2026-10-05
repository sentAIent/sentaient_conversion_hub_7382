import React, { useState } from 'react';

const NukeDataButton = () => {
    const [isNuking, setIsNuking] = useState(false);

    const handleNukeData = async () => {
        if (!window.confirm("WARNING: This will completely wipe all local data, including imported GDPR archives, semantic embeddings, and local settings. This action cannot be undone. Are you sure you want to proceed?")) {
            return;
        }

        setIsNuking(true);

        try {
            // 1. Clear LocalStorage
            window.localStorage.clear();

            // 2. Clear SessionStorage
            window.sessionStorage.clear();

            // 3. Clear IndexedDB
            if (window.indexedDB && window.indexedDB.databases) {
                const databases = await window.indexedDB.databases();
                for (const db of databases) {
                    if (db.name) {
                        window.indexedDB.deleteDatabase(db.name);
                        console.log(`Deleted IndexedDB: ${db.name}`);
                    }
                }
            } else {
                // Fallback for older browsers (specifically deleting the known DBs)
                window.indexedDB.deleteDatabase('LocalRAGDB');
            }

            // 4. Force Reload to clear memory and React states
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete all data", error);
            alert("An error occurred while wiping data. Please clear your browser cache manually.");
            setIsNuking(false);
        }
    };

    return (
        <button
            onClick={handleNukeData}
            disabled={isNuking}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm border border-red-500/50 text-sm font-semibold transition-all disabled:opacity-50"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            {isNuking ? 'Nuking Data...' : 'Nuke My Data'}
        </button>
    );
};

export default NukeDataButton;
