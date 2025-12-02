import React, { useState } from 'react';
import { Monitor, Keyboard, Mouse, Battery, Plug, Headphones, Wifi, Lock, Smartphone, Volume2, Hash, Users, AtSign, Bell, ArrowRight } from 'lucide-react';

// ==========================================
// DATA STRUCTURES
// ==========================================

const techHardwareVocab = [
    { mk: "Екран", phonetic: "Ek-ran", en: "Screen", icon: Monitor },
    { mk: "Тастатура", phonetic: "Tas-ta-too-ra", en: "Keyboard", icon: Keyboard },
    { mk: "Глувче", phonetic: "Gloov-che", en: "Mouse", icon: Mouse },
    { mk: "Звучник", phonetic: "Zvooch-neek", en: "Speaker", icon: Volume2 },
    { mk: "Батерија", phonetic: "Ba-te-ree-ya", en: "Battery", icon: Battery },
    { mk: "Полнач", phonetic: "Pol-nach", en: "Charger", icon: Plug },
    { mk: "Слушалки", phonetic: "Sloo-shal-kee", en: "Headphones", icon: Headphones },
    { mk: "Мрежа", phonetic: "Mre-zha", en: "Network / Signal", icon: Wifi },
    { mk: "Лозинка", phonetic: "Lo-zeen-ka", en: "Password", icon: Lock },
    { mk: "Вај-фај", phonetic: "Wi-Fi", en: "Wi-Fi", icon: Wifi },
];



// ==========================================
// MAIN COMPONENT
// ==========================================

export default function LessonVocabulary({ onNext }) {
    return (
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 pb-12 font-sans antialiased px-4">

            {/* Header */}
            <header className="text-left py-6">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 inline-block">Lesson 26</span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Во светот на интернетот</h1>
                <p className="text-xl text-gray-500">In the world of the internet</p>
            </header>

            {/* Game Instruction Text Box */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-lg transform hover:scale-[1.01] transition-all duration-300 mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <Users className="text-white w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                            Сега играме игра! 🎮
                        </h3>
                        <p className="text-white/90 text-lg font-medium leading-relaxed">
                            Stand up and get ready to make a sentence with a new vocab word!
                        </p>
                    </div>
                </div>
            </div>

            {/* 1. Hardware Grid */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-3 rounded-2xl mr-4 shadow-sm">
                        <Monitor size={24} />
                    </span>
                    Хардвер (Hardware)
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {techHardwareVocab.map((item, index) => {
                        // Rainbow palette: Red, Orange, Amber, Green, Blue, Indigo, Violet
                        const rainbowPalette = [
                            { bg: 'bg-red-500', hex: '#ef4444', text: 'text-white', border: 'border-red-600', borderHex: '#dc2626', hover: 'group-hover:border-red-400' },
                            { bg: 'bg-orange-500', hex: '#f97316', text: 'text-white', border: 'border-orange-600', borderHex: '#ea580c', hover: 'group-hover:border-orange-400' },
                            { bg: 'bg-amber-500', hex: '#f59e0b', text: 'text-white', border: 'border-amber-600', borderHex: '#d97706', hover: 'group-hover:border-amber-400' },
                            { bg: 'bg-green-500', hex: '#22c55e', text: 'text-white', border: 'border-green-600', borderHex: '#16a34a', hover: 'group-hover:border-green-400' },
                            { bg: 'bg-blue-500', hex: '#3b82f6', text: 'text-white', border: 'border-blue-600', borderHex: '#2563eb', hover: 'group-hover:border-blue-400' },
                            { bg: 'bg-indigo-500', hex: '#6366f1', text: 'text-white', border: 'border-indigo-600', borderHex: '#4f46e5', hover: 'group-hover:border-indigo-400' },
                            { bg: 'bg-violet-500', hex: '#8b5cf6', text: 'text-white', border: 'border-violet-600', borderHex: '#7c3aed', hover: 'group-hover:border-violet-400' },
                        ];

                        // Calculate row index (2 items per row)
                        const rowIndex = Math.floor(index / 2);
                        const colorTheme = rainbowPalette[rowIndex % rainbowPalette.length];

                        return (
                            <div
                                key={index}
                                className={`group relative overflow-hidden rounded-2xl border-2 ${colorTheme.border} ${colorTheme.bg} p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${colorTheme.hover}`}
                                style={{ backgroundColor: colorTheme.hex, borderColor: colorTheme.borderHex }}
                            >
                                <div className="flex flex-col h-full justify-between relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className={`p-2 rounded-xl bg-white/60 backdrop-blur-sm ${colorTheme.text}`}>
                                            <item.icon size={24} strokeWidth={2} />
                                        </div>
                                        <button className="p-1.5 rounded-full text-slate-400 hover:bg-white/50 hover:text-blue-600 transition-colors">
                                            <Volume2 size={18} />
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="text-4xl font-bold text-white mb-1 leading-tight">{item.mk}</h3>
                                        <div className="flex items-baseline gap-3 flex-wrap">
                                            <span className="text-xl font-medium text-white/90">{item.en}</span>
                                            <span className="text-lg text-white/70 italic">/{item.phonetic}/</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative background element */}
                                <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/20 blur-2xl group-hover:bg-white/30 transition-colors`} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Navigation Button */}
            <div className="pt-8 flex justify-center">
                <button
                    onClick={onNext}
                    className="group relative inline-flex items-center justify-center px-16 py-6 text-2xl font-bold text-white transition-all duration-300 bg-blue-600 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                    Continue to Story
                    <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </div>
    );
}
