import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import lessonData from '../data/lesson26.json';
import VocabularyGrid from './VocabularyGrid';
import TechVerbs from './TechVerbs';
import SlangCards from './SlangCards';
import InteractiveScenario from './InteractiveScenario';
import FinalReview from './FinalReview';

const LessonView = ({ onBack }) => {
    const { lessonModule } = lessonData;
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const sections = lessonModule.sections;
    const currentSection = sections[currentSectionIndex];

    const progress = ((currentSectionIndex + 1) / sections.length) * 100;

    const handleNext = () => {
        if (currentSectionIndex < sections.length - 1) {
            setCurrentSectionIndex(prev => prev + 1);
        } else {
            // Lesson complete logic could go here
            // The final_review section or the last section will handle the final completion.
        }
    };

    const renderSection = () => {
        switch (currentSection.type) {
            case 'vocabulary_grid':
                return <VocabularyGrid data={currentSection} onNext={handleNext} lessonIntro={lessonModule.intro} />;
            case 'verb_conjugation':
                return <TechVerbs data={currentSection} onNext={handleNext} />;
            case 'slang_cards':
                return <SlangCards data={currentSection} onNext={handleNext} />;
            case 'interactive_scenario':
                return <InteractiveScenario data={currentSection} onComplete={handleNext} />;
            case 'final_review':
                return <FinalReview data={currentSection} onComplete={onBack} />;
            default:
                return <div>Unknown section type</div>;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between z-10 shadow-sm">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                    <X className="w-6 h-6 text-slate-400" />
                </button>
                <div className="flex-1 mx-4">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
                <div className="text-sm font-bold text-blue-500">
                    {Math.round(progress)}%
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSectionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 pb-32 max-w-lg mx-auto"
                    >
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentSection.title}</h2>
                            <p className="text-slate-500">{currentSection.instruction}</p>
                        </div>

                        {renderSection()}

                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LessonView;
