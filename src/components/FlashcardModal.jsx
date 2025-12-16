import React from 'react';
import { X } from 'lucide-react';
import Flashcard from './Flashcard';

const FlashcardModal = ({ isOpen, onClose, vocabData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg z-10 animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-white/80 transition-colors p-2"
                >
                    <X size={24} />
                </button>

                <Flashcard vocabData={vocabData} />
            </div>
        </div>
    );
};

export default FlashcardModal;
