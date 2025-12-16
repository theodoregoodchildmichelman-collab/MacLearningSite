import React, { useState } from 'react';
import BookPage from '../components/BookPage';
import {
    DialogueBlock,
    VocabList,
    GrammarTable,
    MatchingExercise,
    FillBlankExercise,
    ExerciseList
} from '../components/BookComponents';
import lessonData from '../data/lesson_02.json';
import { useNavigate } from 'react-router-dom';

const Chapter2View = () => {
    const navigate = useNavigate();
    const { lesson_meta, pages } = lessonData;
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const currentPage = pages[currentPageIndex];
    const isFirstPage = currentPageIndex === 0;
    const isLastPage = currentPageIndex === pages.length - 1;

    const handleNext = () => {
        if (!isLastPage) {
            setCurrentPageIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Option: Navigate to Chapter 3 if available
            console.log("End of chapter");
        }
    };

    const handlePrev = () => {
        if (!isFirstPage) {
            setCurrentPageIndex(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/chapter/1'); // Go back to Ch 1 or Dashboard
        }
    };

    // Render Section Helper
    const renderSection = (section) => {
        switch (section.type) {
            case 'dialogue':
                return <DialogueBlock key={section.id} lines={section.content.lines} />;
            case 'vocabulary_list':
                return <VocabList key={section.id} items={section.content.items} />;
            case 'grammar_table':
                return <GrammarTable key={section.id} data={section.content} />;
            case 'matching_triple':
                return <MatchingExercise key={section.id} data={section.content} />;
            case 'exercise_fill_blank':
                return <FillBlankExercise key={section.id} data={section.content} />;
            case 'exercise_list':
                return <ExerciseList key={section.id} data={section.content} />;
            case 'exercise_text':
                return (
                    <div key={section.id} className="my-8 p-6 bg-blue-50/50 rounded-lg border border-blue-100 flex items-start gap-3">
                        <div className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 mt-0.5">!</div>
                        <div className="font-medium text-blue-900">{section.content.instruction}</div>
                    </div>
                );
            case 'culture_card':
                return (
                    <div key={section.id} className="my-10 p-8 bg-orange-50 rounded-xl border-l-4 border-orange-400 shadow-sm">
                        <h3 className="text-xl font-bold text-orange-800 mb-4 uppercase tracking-widest">Culture Corner</h3>
                        <p className="text-orange-900/80 italic leading-relaxed text-lg">
                            "{section.content.text}"
                        </p>
                    </div>
                );
            default:
                return (
                    <div key={section.id} className="text-red-500 border border-red-200 p-4 rounded">
                        Unknown section type: {section.type}
                    </div>
                );
        }
    };

    return (
        <BookPage
            title={isFirstPage ? lesson_meta.title_en : null} // Show title only on first page
            pageNumber={currentPage.page_number}
            onPrev={handlePrev}
            onNext={!isLastPage ? handleNext : null}
        >
            <div className="space-y-12">
                {currentPage.content.map(section => (
                    <section key={section.id}>
                        {/* Optional Section Title for major sections */}
                        {/* {section.title && <h2 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">{section.title}</h2>} */}

                        {renderSection(section)}
                    </section>
                ))}
            </div>
        </BookPage>
    );
};

export default Chapter2View;
