import React from 'react';
import { Play, BookOpen, MessageCircle, Lock, Check } from 'lucide-react';

const Dashboard = ({ onStartLesson }) => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="ambient-light"></div>
            <div className="ambient-light-2"></div>

            <header className="fixed w-full top-0 z-50 glass-header">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg group-hover:bg-yellow-400 group-hover:text-black transition-colors">B</div>
                        <span className="font-bold text-xl tracking-tight">Bistro.</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-full transition-all">Chapters</a>
                        <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-full transition-all">Practice</a>
                        <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-full transition-all">Resources</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden lg:block">
                                <p className="text-xs font-bold text-gray-900">Alex V.</p>
                                <p className="text-[10px] text-gray-500 font-medium">Lvl 4 • Skopje</p>
                            </div>
                            <button className="relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden ring-2 ring-white shadow-sm hover:ring-yellow-400 transition-all">
                                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="Profile" className="w-full h-full object-cover" />
                            </button>
                        </div>
                        <button className="md:hidden text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100/50 border border-yellow-200 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider">Beta 2.0</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95] mb-6 text-gray-900">
                            Really <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600">Good.</span>
                        </h1>

                        <p className="text-lg text-gray-500 mb-8 max-w-md leading-relaxed">
                            The clearest path to fluency. Minimalistic lessons designed to make your Macedonian <span className="text-gray-900 font-medium italic">bistro</span> (sharp) and confident.
                        </p>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={onStartLesson}
                                className="bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Start Chapter 1
                            </button>
                            <button className="px-8 py-4 rounded-2xl font-semibold text-gray-600 hover:bg-gray-100 transition-all">
                                View Roadmap
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200 to-red-100 rounded-[3rem] transform rotate-3 opacity-40 blur-3xl"></div>

                        <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] p-6 shadow-2xl grid grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-2xl shadow-sm col-span-2">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Current Streak</span>
                                    <span className="text-red-500">🔥</span>
                                </div>
                                <div className="text-3xl font-bold">12 Days</div>
                                <div className="w-full bg-gray-100 h-1.5 mt-3 rounded-full overflow-hidden">
                                    <div className="bg-red-500 w-[40%] h-full rounded-full"></div>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between group cursor-pointer hover:bg-yellow-50 transition-colors">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-3 text-xl group-hover:scale-110 transition-transform">
                                    <BookOpen className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <span className="block text-sm font-bold text-gray-900">Grammar</span>
                                    <span className="text-xs text-gray-500">Noun cases</span>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between group cursor-pointer hover:bg-blue-50 transition-colors">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-xl group-hover:scale-110 transition-transform">
                                    <MessageCircle className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <span className="block text-sm font-bold text-gray-900">Practice</span>
                                    <span className="text-xs text-gray-500">Daily conversation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-16"></div>

                <div className="mb-10 flex items-end justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Your Path</h2>
                    <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">View all chapters &rarr;</a>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bento-card bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Play className="w-24 h-24 text-yellow-500" />
                        </div>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4">In Progress</span>
                        <h3 className="text-xl font-bold mb-2">Introduction</h3>
                        <p className="text-sm text-gray-500 mb-6">Basics of Cyrillic and greetings.</p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-bold text-gray-400">85% Complete</span>
                            <button
                                onClick={onStartLesson}
                                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors"
                            >
                                <Play className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
                            <div className="h-full bg-black w-[85%]"></div>
                        </div>
                    </div>

                    <div className="bento-card bg-white/60 rounded-3xl p-8 border border-gray-100 shadow-sm relative">
                        <div className="absolute top-6 right-6 text-gray-300">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-400">Ordering Food</h3>
                        <p className="text-sm text-gray-400 mb-6">Restaurant vocabulary and etiquette.</p>
                        <div className="mt-8 border-t border-gray-100 pt-4">
                            <span className="text-xs font-bold text-gray-400">Locked</span>
                        </div>
                    </div>

                    <div className="bento-card bg-gray-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">Daily Practice</h3>
                            <p className="text-sm text-gray-400 mb-6">Review your weak words.</p>
                            <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-sm font-semibold transition-all">
                                Start Review Session
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Dashboard;
