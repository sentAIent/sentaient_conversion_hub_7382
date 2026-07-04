import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size]} overflow-hidden flex flex-col max-h-[90vh]`}
                onClick={(e) => e.stopPropagation()}
            >
                {(title || showCloseButton) && (
                    <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                        {title && <h3 className="font-bold text-slate-800">{title}</h3>}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
