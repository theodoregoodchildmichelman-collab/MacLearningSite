import React, { useEffect, useState } from 'react';
import { LessonService } from '../services/LessonService';
import LessonVocabulary from './LessonVocabulary';

import LessonDialogue from './LessonDialogue';
import Quiz from './Quiz';
import { ClipboardList, ArrowRight } from 'lucide-react';
import InteractiveVocabularyScript from './InteractiveVocabularyScript'; // Keep for fallback if needed, but we are replacing usage
import InteractiveScenario from './InteractiveScenario';
import SlangCards from './SlangCards';

const LessonView = ({ lessonId = 'lesson_26', onBack }) => {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const data = await LessonService.fetchLessonById(lessonId);
                setLesson(data);

                // Prepare quiz data from sections
                const allVocabulary = [];

                data.sections.forEach(section => {
                    if (section.type === 'verb_conjugation' && section.verbs) {
                        section.verbs.forEach(v => {
                            allVocabulary.push({
                                mk: v.mk,
                                en: v.en,
                                example: v.example
                            });
                        });
                    }
                    if (section.type === 'slang_cards' && section.cards) {
                        section.cards.forEach(c => {
                            allVocabulary.push({
                                mk: c.term,
                                en: c.meaning,
                                example: c.example
                            });
                        });
                    }
                });

                setQuizData({
                    title: "Chapter Quiz",
                    instruction: "Test your mastery of the vocabulary and slang!",
                    vocabulary: allVocabulary
                });

            } catch (error) {
                console.error("Failed to fetch lesson", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [lessonId]);

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
    );

    if (!lesson) return <div className="p-8 text-center text-red-500">Lesson not found.</div>;

    if (isQuizActive && quizData) {
        return (
            <div className="min-h-screen bg-slate-50 py-8 px-4">
                <div className="max-w-md mx-auto mb-6">
                    <button
                        onClick={() => setIsQuizActive(false)}
                        className="text-slate-500 hover:text-slate-700 font-medium flex items-center gap-2"
                    >
                        ← Back to Lesson
                    </button>
                </div>
                <Quiz data={quizData} onComplete={() => setIsQuizActive(false)} />
            </div>
        );
    }

    // Helper to find sections by type
    const findSection = (type) => lesson.sections.find(s => s.type === type);

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <LessonDialogue onNext={handleNext} />;
            case 1:
                return <LessonVocabulary onNext={handleNext} />;
            case 2:
                // Slang + Scenario
                const slangSection = findSection('slang_cards');
                const scenarioSection = findSection('interactive_scenario');
                return (
                    <div className="max-w-4xl mx-auto space-y-12 pb-12">
                        <header className="text-center space-y-2 pt-8">
                            <h1 className="text-3xl font-bold text-slate-900">Street Slang & Scenario</h1>
                        </header>

                        {slangSection && (
                            <section>
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                                    <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-lg shadow-sm">🔥</span>
                                    {slangSection.title}
                                </h2>
                                <SlangCards data={slangSection} onNext={() => { }} />
                            </section>
                        )}

                        {scenarioSection && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
                                <h2 className="text-2xl font-bold mb-4">{scenarioSection.title}</h2>
                                <p className="text-slate-600 mb-6">{scenarioSection.instruction}</p>
                                <InteractiveScenario data={scenarioSection} onComplete={() => { }} />
                            </div>
                        )}

                        <div className="pt-8 flex justify-center">
                            {/* Quiz CTA removed */}
                        </div>
                    </div>
                );

            case 3:
                // Tech Verbs
                const verbsSection = findSection('verb_conjugation');
                return (
                    <div className="max-w-4xl mx-auto space-y-12 pb-32">
                        <header className="text-center space-y-2 pt-8">
                            <h1 className="text-3xl font-bold text-slate-900">Tech Verbs</h1>
                        </header>

                        {verbsSection && (
                            <section>
                                <div className="grid grid-cols-2 gap-6">
                                    {verbsSection.verbs.map((verb, vIdx) => (
                                        <div key={vIdx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:opacity-90 active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer group">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{verb.mk}</h3>
                                                <span className="text-base text-blue-600 font-bold bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">{verb.en}</span>
                                            </div>
                                            <p className="text-slate-600 text-xl leading-relaxed border-t border-slate-50 pt-4 mt-2">
                                                "{verb.example.split(new RegExp(`(${verb.mk}|${verb.mk.toLowerCase()}|${verb.mk.slice(0, -1)})`, 'gi')).map((part, i) =>
                                                    (part.toLowerCase().includes(verb.mk.toLowerCase().slice(0, 4))) ? (
                                                        <span key={i} className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-lg mx-0.5">{part}</span>
                                                    ) : (
                                                        part
                                                    )
                                                )}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Quiz CTA removed */}
                    </div>
                );
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {renderStepContent()}
        </div>
    );
};

export default LessonView;
