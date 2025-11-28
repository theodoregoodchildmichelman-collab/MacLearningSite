import React from 'react';
import { Lock, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const chapters = Array.from({ length: 26 }, (_, i) => i + 1);

const Dashboard = ({ onStartLesson }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-6">
            <header className="text-center mb-12 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 leading-tight tracking-tight">
                    Learn Macedonian Anywhere, Anytime with <span className="text-[#D20000]">Mac</span> <span className="text-[#FFD700]">Online</span>
                </h1>
                <p className="text-lg text-slate-500 font-medium">Select a chapter to begin your journey</p>
            </header>

            <div className="w-full max-w-md space-y-8">
                {chapters.map((num) => {
                    const isLocked = num < 26;
                    const isCurrent = num === 26;

                    return (
                        <motion.div
                            key={num}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: isCurrent ? 0.1 : 0 }}
                            whileHover={isCurrent ? { scale: 1.05, y: -5 } : {}}
                            onClick={() => isCurrent && onStartLesson()}
                            className={`
                relative p-8 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center text-center group
                ${isLocked
                                    ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                                    : 'bg-white border-blue-100 shadow-2xl shadow-blue-500/20 cursor-pointer hover:border-blue-400 hover:shadow-blue-500/40'
                                }
              `}
                        >
                            <div className={`
                w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-lg
                ${isLocked ? 'bg-slate-200 text-slate-400' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/40 group-hover:scale-110 transition-transform duration-300'}
              `}>
                                {num}
                            </div>

                            <h3 className={`text-2xl font-bold mb-2 ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>
                                {isCurrent ? 'Chapter 26: Technology' : `Chapter ${num}`}
                            </h3>
                            <p className="text-base text-slate-400 mb-6 font-medium">
                                {isCurrent ? 'Svetot na Internetot' : 'Coming Soon'}
                            </p>

                            {isLocked ? (
                                <Lock className="w-8 h-8 text-slate-300" />
                            ) : (
                                <div className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold text-lg flex items-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
                                    <Play className="w-5 h-5 mr-2 fill-current" />
                                    Start Lesson
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
