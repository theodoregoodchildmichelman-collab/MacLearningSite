import React from 'react';
import { motion } from 'framer-motion';

/**
 * BookPage Component
 * A container for rendering book content with a paper-like feel.
 * Supports different sections: Dialogues, Vocabulary, Grammar, Exercises.
 */
const BookPage = ({ children, title, pageNumber, onNext, onPrev }) => {
    return (
        <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-serif leading-relaxed p-8 md:p-12 lg:p-20 flex flex-col items-center">
            {/* Page Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full bg-white shadow-lg rounded-sm min-h-[80vh] relative border border-gray-100"
            >
                {/* Header / Top Margin */}
                <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 text-sm text-gray-400 font-sans tracking-widest uppercase">
                    <span>MacLang Textbook</span>
                    <span>Chapter 2</span>
                </div>

                {/* Content Area */}
                <div className="p-10 md:p-16 space-y-12">
                    {/* Chapter Title */}
                    {title && (
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
                            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full opacity-80"></div>
                        </div>
                    )}

                    {children}
                </div>

                {/* Footer / Page Number */}
                <div className="h-16 mt-auto border-t border-gray-100 flex items-center justify-between px-8 text-gray-400 font-sans">
                    <button
                        onClick={onPrev}
                        disabled={!onPrev}
                        className={`hover:text-gray-600 transition-colors uppercase text-xs tracking-wider flex items-center gap-2 ${!onPrev ? 'opacity-0 cursor-default' : ''}`}
                    >
                        ← Previous
                    </button>

                    <span className="font-medium text-gray-300">Page {pageNumber}</span>

                    <button
                        onClick={onNext}
                        disabled={!onNext}
                        className={`hover:text-gray-600 transition-colors uppercase text-xs tracking-wider flex items-center gap-2 ${!onNext ? 'opacity-0 cursor-default' : ''}`}
                    >
                        Next →
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default BookPage;
