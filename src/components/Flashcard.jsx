import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { callGemini } from '../services/GeminiService';

const Flashcard = ({ vocabData, onOpenSettings }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoadingExample, setIsLoadingExample] = useState(false);
    // We'll store dynamic examples in a local state map or modify the data if we want persistence during session
    // For simplicity, we'll just use a local state to override the current card's example if generated
    const [generatedExamples, setGeneratedExamples] = useState({});

    const currentCard = vocabData[currentIndex];
    const currentExample = generatedExamples[currentIndex] || {
        mk: currentCard.example,
        en: currentCard.exampleEn
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev < vocabData.length - 1 ? prev + 1 : 0));
        }, 300);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev > 0 ? prev - 1 : vocabData.length - 1));
        }, 300);
    };

    const generateNewExample = async (e) => {
        e.stopPropagation();
        setIsLoadingExample(true);

        try {
            const prompt = `Generate a short, simple Macedonian sentence using the word "${currentCard.mk}" (meaning: ${currentCard.en}). It should be casual slang if appropriate. Format: [Macedonian Sentence] | [English Translation]`;
            const result = await callGemini(prompt);

            const parts = result.split('|');
            if (parts.length >= 2) {
                setGeneratedExamples(prev => ({
                    ...prev,
                    [currentIndex]: {
                        mk: parts[0].trim(),
                        en: `(${parts[1].trim()})`
                    }
                }));
            } else {
                // Fallback if format isn't perfect
                setGeneratedExamples(prev => ({
                    ...prev,
                    [currentIndex]: {
                        mk: result,
                        en: ''
                    }
                }));
            }
        } catch (error) {
            if (error.message === "No API Key") {
                onOpenSettings();
            } else {
                console.error("Failed to generate example", error);
            }
        } finally {
            setIsLoadingExample(false);
        }
    };

    return (
        <section id="flashcard-section" className="text-center">
            <h2 className="text-xl font-bold mb-6 text-gray-700 flex items-center justify-center gap-2">
                Vocabulary Deck
            </h2>

            <div className="relative w-full h-96 perspective-1000 group cursor-pointer" onClick={handleFlip}>
                <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d shadow-2xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>

                    {/* FRONT */}
                    <div className="absolute w-full h-full bg-white rounded-3xl flex flex-col justify-center items-center backface-hidden border-2 border-gray-100">
                        <span className="text-7xl mb-6 transform transition group-hover:scale-110 duration-300">{currentCard.emoji}</span>
                        <h3 className="text-5xl font-bold text-gray-800 cyrillic mb-2">{currentCard.mk}</h3>
                        <p className="text-gray-400 mt-6 text-xs font-bold uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Tap to flip</p>
                    </div>

                    {/* BACK */}
                    <div className="absolute w-full h-full bg-slate-800 text-white rounded-3xl flex flex-col justify-between p-6 backface-hidden rotate-y-180">
                        {/* Top Content */}
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold mb-1 text-yellow-400">{currentCard.transliteration}</h3>
                            <p className="text-xl text-slate-300 font-medium">{currentCard.en}</p>
                        </div>

                        {/* Example Box */}
                        <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600 relative overflow-hidden group/example">
                            <div className="text-[10px] text-slate-400 uppercase font-bold mb-2 tracking-wider flex justify-between items-center">
                                <span>Example</span>
                                {/* AI Feature Button */}
                                <button
                                    onClick={generateNewExample}
                                    className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded flex items-center gap-1 transition-all z-20"
                                >
                                    <Sparkles className="w-3 h-3" /> New
                                </button>
                            </div>

                            {isLoadingExample && (
                                <div className="absolute inset-0 bg-slate-700 z-10 flex items-center justify-center">
                                    <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                                </div>
                            )}

                            <p className="cyrillic italic text-lg leading-relaxed text-slate-100">{currentExample.mk}</p>
                            <p className="text-xs text-slate-400 mt-1">{currentExample.en}</p>
                        </div>

                        {/* Bottom Spacer */}
                        <div className="h-2"></div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-6 mt-8 items-center">
                <button
                    onClick={handlePrev}
                    className="p-4 rounded-full bg-white shadow-lg border border-gray-100 hover:bg-gray-50 hover:scale-105 transition text-gray-600"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <span className="text-sm font-medium text-gray-400">
                    {currentIndex + 1} / {vocabData.length}
                </span>
                <button
                    onClick={handleNext}
                    className="p-4 rounded-full bg-white shadow-lg border border-gray-100 hover:bg-gray-50 hover:scale-105 transition text-gray-600"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
};

export default Flashcard;
