import React, { useEffect } from 'react';
// import Cal, { getCalApi } from "@calcom/embed-react";

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AttorneyConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        // (async function () {
        //   const cal = await getCalApi();
        //   cal("ui", {"styles":{"branding":{"brandColor":"#3b82f6"}},"hideEventTypeDetails":false,"layout":"month_view"});
        // })();
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-blue-500">⚖️</span> Schedule Attorney Review
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="flex-1 overflow-auto bg-slate-50 relative">
                    {/* <Cal 
                        calLink="sentaient/attorney-review"
                        style={{width:"100%",height:"100%",overflow:"scroll"}}
                        config={{layout: 'month_view'}}
                    /> */}
                    <div className="p-10 text-center text-slate-500">Cal.com integration ready (npm install pending)</div>
                </div>
            </div>
        </div>
    );
};
