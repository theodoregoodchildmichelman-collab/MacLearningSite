import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Check, X } from 'lucide-react';

const SlangCards = ({ data, onNext }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentCard = data.cards[currentIndex];
    const isLastCard = currentIndex === data.cards.length - 1;

    const handleNextCard = () => {
        setIsFlipped(false);
        if (isLastCard) {
            onNext();
        } else {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
        }
    };

    return (
        <div className="flex flex-col h-[60vh]">
            <div className="flex-1 relative perspective-1000">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full relative preserve-3d cursor-pointer"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <motion.div
                            className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center p-8 backface-hidden"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <span className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-4">Term</span>
                            <h2 className="text-5xl font-bold text-slate-800 text-center mb-8">{currentCard.term}</h2>
                            <div className="flex items-center text-slate-400 text-sm">
                                <RotateCw className="w-4 h-4 mr-2" />
                                Tap to flip
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute inset-0 w-full h-full bg-blue-500 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 backface-hidden"
                            initial={{ rotateY: 180 }}
                            animate={{ rotateY: isFlipped ? 0 : 180 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <span className="text-sm font-bold text-white/70 uppercase tracking-wider mb-4">Meaning</span>
                            <h2 className="text-3xl font-bold text-white text-center mb-2">{currentCard.meaning}</h2>
                            <p className="text-white/80 text-center italic mb-6">"{currentCard.example}"</p>
                            <div className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold">
                                {currentCard.context}
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                    onClick={handleNextCard}
                    className="py-4 bg-red-100 text-red-600 rounded-xl font-bold flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                    <X className="w-5 h-5 mr-2" />
                    Study again
                </button>
                <button
                    onClick={handleNextCard}
                    className="py-4 bg-green-100 text-green-600 rounded-xl font-bold flex items-center justify-center hover:bg-green-200 transition-colors"
                >
                    <Check className="w-5 h-5 mr-2" />
                    I know this
                </button>
            </div>
        </div>
    );
};

export default SlangCards;
