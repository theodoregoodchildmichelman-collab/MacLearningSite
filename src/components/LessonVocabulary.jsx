
import React, { useState } from 'react';
import { Monitor, Keyboard, Mouse, Battery, Plug, Headphones, Wifi, Lock, Smartphone, Volume2, Hash, Users, AtSign, Bell, ArrowRight, Book, Gamepad2, List, PlayCircle } from 'lucide-react';
import FlashcardModal from './FlashcardModal';
import BlurReveal from './BlurReveal';
import DragAndDropMatching from './DragAndDropMatching';

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

export default function LessonVocabulary({ onNext, data }) {
    const [viewMode, setViewMode] = useState('study'); // 'study' or 'practice'
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    // Prepare data for flashcards
    const vocabToReview = (data || techHardwareVocab).map(item => ({
        mk: item.mk || item.mk_word,
        en: item.en || item.en_definition,
        phonetic: item.phonetic,
        transliteration: item.phonetic, // Flashcard expects transliteration
        icon: item.icon || Book,
        example: null, // Will use default or AI generated
        exampleEn: null
    }));

    return (
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 pb-12 font-sans antialiased px-4 relative">
            <FlashcardModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                vocabData={vocabToReview}
            />

            {/* Header */}
            <header className="text-left py-6 flex justify-between items-start">
                <div>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 inline-block">Lesson 26</span>
                    <h1 className="font-extrabold text-gray-900 tracking-tight mb-2" style={{ fontSize: 'var(--font-h1)' }}>Во светот на интернетот</h1>
                    <p className="text-gray-500 max-w-prose-custom" style={{ fontSize: 'var(--font-h3)' }}>In the world of the internet</p>
                </div>

                <button
                    onClick={() => setIsReviewOpen(true)}
                    className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
                >
                    <PlayCircle size={20} />
                    Review This Chapter
                </button>
            </header>

            {/* Mobile Review Button (Fab) */}
            <button
                onClick={() => setIsReviewOpen(true)}
                className="md:hidden fixed bottom-6 right-6 z-40 bg-indigo-600 text-white p-4 rounded-full shadow-2xl shadow-indigo-300 hover:scale-110 active:scale-90 transition-all"
                aria-label="Review Chapter"
            >
                <PlayCircle size={28} />
            </button>

            {/* Game Instruction Text Box */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-lg transform hover:scale-[1.01] transition-all duration-300 mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <Users className="text-white w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-2" style={{ fontSize: 'var(--font-h2)' }}>
                            Сега играме игра! 🎮
                        </h3>
                        <p className="text-white/90 font-medium leading-relaxed max-w-prose-custom" style={{ fontSize: 'var(--font-body)' }}>
                            Stand up and get ready to make a sentence with a new vocab word!
                        </p>
                    </div>
                </div>
            </div>

            {/* 1. Hardware Grid / Dynamic Vocabulary */}
            <section>
                <h2 className="font-bold text-slate-900 mb-8 flex items-center" style={{ fontSize: 'var(--font-h2)' }}>
                    <span className="bg-blue-100 text-blue-600 p-3 rounded-2xl mr-4 shadow-sm">
                        {data ? <Book size={24} /> : <Monitor size={24} />}
                    </span>
                    {data ? "Vocabulary" : "Хардвер (Hardware)"}
                </h2>

                <div className="flex justify-end mb-6">
                    <div className="bg-slate-100 p-1 rounded-lg inline-flex">
                        <button
                            onClick={() => setViewMode('study')}
                            className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'study' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <List size={16} />
                            Study List
                        </button>
                        <button
                            onClick={() => setViewMode('practice')}
                            className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'practice' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Gamepad2 size={16} />
                            Practice Game
                        </button>
                    </div>
                </div>

                {viewMode === 'practice' ? (
                    <DragAndDropMatching
                        items={(data || techHardwareVocab).map((item, idx) => ({
                            id: idx,
                            term: item.mk || item.mk_word,
                            definition: item.en || item.en_definition
                        }))}
                    />
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {(data || techHardwareVocab).map((item, index) => {
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

                            // Normalize item data
                            const mk = item.mk || item.mk_word;
                            const en = item.en || item.en_definition;
                            const phonetic = item.phonetic || "";
                            const Icon = item.icon || Book;

                            return (
                                <div
                                    key={index}
                                    className={`group relative overflow-hidden rounded-2xl border-2 ${colorTheme.border} ${colorTheme.bg} p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${colorTheme.hover}`}
                                    style={{ backgroundColor: colorTheme.hex, borderColor: colorTheme.borderHex }}
                                >
                                    <div className="flex flex-col h-full justify-between relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className={`p-2 rounded-xl bg-white/60 backdrop-blur-sm ${colorTheme.text}`}>
                                                <Icon size={24} strokeWidth={2} />
                                            </div>
                                            <button className="p-1.5 rounded-full text-slate-400 hover:bg-white/50 hover:text-blue-600 transition-colors">
                                                <Volume2 size={18} />
                                            </button>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-white mb-1 leading-tight" style={{ fontSize: 'var(--font-h1)' }}>{mk}</h3>
                                            <div className="flex items-baseline gap-3 flex-wrap">
                                                <BlurReveal blurDefault={true} className="font-medium text-white/90" style={{ fontSize: 'var(--font-h3)' }}>
                                                    {en}
                                                </BlurReveal>
                                                {phonetic && <span className="text-lg text-white/70 italic">/{phonetic}/</span>}
                                                {item.gender && <span className="text-sm text-white/60 uppercase border border-white/30 px-1 rounded">{item.gender}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative background element */}
                                    <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/20 blur-2xl group-hover:bg-white/30 transition-colors`} />
                                </div>
                            );
                        })}
                    </div>
                )}
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
