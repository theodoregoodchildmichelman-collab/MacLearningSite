import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const cardStyles = [
    { bg: '#f43f5e', border: '#e11d48', text: '#ffffff' }, // Rose
    { bg: '#3b82f6', border: '#2563eb', text: '#ffffff' }, // Blue
    { bg: '#22c55e', border: '#16a34a', text: '#ffffff' }, // Green
    { bg: '#eab308', border: '#ca8a04', text: '#ffffff' }, // Yellow
    { bg: '#a855f7', border: '#9333ea', text: '#ffffff' }, // Purple
    { bg: '#ec4899', border: '#db2777', text: '#ffffff' }, // Pink
    { bg: '#6366f1', border: '#4f46e5', text: '#ffffff' }, // Indigo
    { bg: '#f97316', border: '#ea580c', text: '#ffffff' }, // Orange
    { bg: '#14b8a6', border: '#0d9488', text: '#ffffff' }, // Teal
    { bg: '#06b6d4', border: '#0891b2', text: '#ffffff' }  // Cyan
];

const SlangCards = ({ data, onNext }) => {
    return (
        <div className="w-full space-y-8 pb-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.cards.map((card, index) => {
                    const style = cardStyles[index % cardStyles.length];

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            style={{
                                backgroundColor: style.bg,
                                borderColor: style.border,
                                color: style.text
                            }}
                            className="relative p-10 pl-[15%] rounded-[2.5rem] border-4 shadow-xl flex flex-col space-y-6"
                        >
                            <div>
                                <h3 className="font-black mb-4 tracking-tight" style={{ fontSize: '5rem', lineHeight: '1' }}>{card.term}</h3>
                                <div className="h-2 w-32 bg-white/40 rounded-full"></div>
                            </div>

                            <div className="space-y-4">
                                <span className="text-lg font-bold uppercase tracking-widest opacity-80">Definition</span>
                                <p className="font-bold leading-tight" style={{ fontSize: '2.5rem' }}>
                                    {card.definition}
                                </p>
                            </div>

                            <div className="bg-white/20 rounded-[2rem] p-8 backdrop-blur-md mt-auto border border-white/10">
                                <span className="text-lg font-bold uppercase tracking-widest opacity-80 mb-4 block">Example</span>
                                <div className="space-y-4">
                                    <p className="italic font-medium leading-relaxed" style={{ fontSize: '2rem' }}>
                                        "{card.example}"
                                    </p>
                                    <div className="h-px w-full bg-white/20"></div>
                                    <p className="font-medium opacity-90" style={{ fontSize: '1.5rem' }}>
                                        {card.english}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onNext}
                    className="px-12 py-4 bg-slate-900 text-white rounded-full font-bold text-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                >
                    Continue to Scenario
                </button>
            </div>
        </div>
    );
};

export default SlangCards;
