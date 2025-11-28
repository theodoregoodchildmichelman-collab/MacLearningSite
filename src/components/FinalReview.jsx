import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Check, Star } from 'lucide-react';

const FinalReview = ({ data, onComplete }) => {
    return (
        <div className="space-y-8 pb-12 text-center">
            <div className="mb-8">
                <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
                    <Star className="w-8 h-8 text-yellow-600 fill-current" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Final Review 🎓</h2>
                <p className="text-slate-500 text-lg">Tap to reveal & master the words!</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {data.items.map((item, index) => (
                    <FlipCard key={index} item={item} index={index} />
                ))}
            </div>

            <button
                onClick={onComplete}
                className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold text-xl shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] active:scale-95 transition-all mt-8"
            >
                Finish Lesson 🎉
            </button>
        </div>
    );
};

const FlipCard = ({ item, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative h-48 perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-lg border-2 border-slate-100 flex flex-col items-center justify-center p-4 group-hover:border-blue-300 group-hover:shadow-xl transition-all">
                    <h3 className="font-extrabold text-slate-800 text-xl text-center">{item.mk}</h3>
                    <div className="mt-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wide">Macedonian</div>
                    <RotateCw className="w-5 h-5 text-slate-300 absolute bottom-4 right-4" />
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg flex flex-col items-center justify-center p-4 rotate-y-180 border-2 border-blue-400">
                    <h3 className="font-extrabold text-white text-xl text-center">{item.en}</h3>
                    <div className="mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white/90 uppercase tracking-wide">English</div>
                    <Check className="w-6 h-6 text-white absolute bottom-4 right-4" />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FinalReview;