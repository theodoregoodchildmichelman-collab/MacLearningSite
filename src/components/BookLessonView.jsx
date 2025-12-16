
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Volume2, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateReadingTime } from '../utils/readingTime';
import ReadingTimeBadge from './ui/ReadingTimeBadge';
import BlurReveal from './BlurReveal';
import TextAnnotator from './ui/TextAnnotator';
import Quiz from './Quiz';
import DragAndDropMatching from './DragAndDropMatching';
import Flashcard from './Flashcard';

const BookLessonView = ({ lesson }) => {
    const navigate = useNavigate();
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const pages = lesson.pages || [];
    const currentPage = pages[currentPageIndex];

    const hasPrevious = currentPageIndex > 0;
    const hasNext = currentPageIndex < pages.length - 1;

    const handlePrevious = () => {
        if (hasPrevious) setCurrentPageIndex(prev => prev - 1);
    };

    const handleNext = () => {
        if (hasNext) setCurrentPageIndex(prev => prev + 1);
    };

    const handleBackToDashboard = () => {
        navigate('/');
    };

    if (!currentPage) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-teal-100">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-sm">
                <button
                    onClick={handleBackToDashboard}
                    className="flex items-center gap-2 text-stone-500 hover:text-teal-700 transition-colors font-medium text-sm"
                >
                    <ChevronLeft size={18} />
                    Library
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold tracking-wider text-teal-600 uppercase">Chapter 1</span>
                    <span className="text-sm font-serif font-bold text-slate-900 line-clamp-1">{lesson.subtitle}</span>
                </div>
                <div className="w-16"></div> {/* Spacer for alignment */}
            </nav>

            {/* Main Book Content */}
            <main className="max-w-3xl mx-auto px-6 py-10 pb-32">
                <div className="mb-8 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-stone-100 text-stone-500 text-xs font-bold tracking-widest uppercase mb-2">
                        Page {currentPage.pageNumber}
                    </span>
                    <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">{currentPage.title}</h1>
                </div>

                <div className="space-y-12">
                    {currentPage.content.map((block, index) => (
                        <div key={index}>
                            {renderBlock(block, index)}
                        </div>
                    ))}
                </div>
            </main>

            {/* Pagination Controls */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 safe-area-pb">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={!hasPrevious}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${hasPrevious
                            ? 'text-slate-700 hover:bg-stone-100 active:scale-95'
                            : 'text-stone-300 cursor-not-allowed'
                            }`}
                    >
                        <ChevronLeft size={20} />
                        Previous
                    </button>

                    <span className="text-sm font-medium text-stone-400">
                        {currentPageIndex + 1} / {pages.length}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={!hasNext}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all shadow-sm ${hasNext
                            ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md active:scale-95'
                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            }`}
                    >
                        Next
                        <ChevronRight size={20} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

// ==========================================
// RENDER HELPERS
// ==========================================

const renderBlock = (block, index) => {
    switch (block.type) {
        case 'dialogue':
            return <DialogueBlock data={block} />;
        case 'grammar_box':
        case 'grammar_table':
            return <GrammarBlock data={block} />;
        case 'exercise':
        case 'questions':
            return <ExerciseBlock data={block} />;
        case 'fill_in_blank':
        case 'fill_in_blank_text':
            return <FillInBlankBlock data={block} />;
        case 'grammar_note':
            return <NoteBlock data={block} blockIndex={index} />;
        case 'vocabulary':
            return <VocabularyBlock data={block} />;
        case 'quiz':
            return <Quiz data={block} onComplete={() => console.log('Quiz completed')} />;
        case 'match_pairs':
            // DragAndDropMatching expects just 'items' array
            return <DragAndDropMatching items={block.items} />;
        case 'flashcards':
            // Flashcard expects 'vocabData'
            return <Flashcard vocabData={block.items} />;
        default:
            return <div className="text-red-500 text-xs">Unknown block type: {block.type}</div>;
    }
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

const DialogueBlock = ({ data }) => {
    const lines = data.lines || (data.content && data.content.lines) || [];
    const textContent = lines.map(l => (l.mk || l.text) + ' ' + (l.en || '')).join(' ');
    const title = data.title || "Dialogue";
    const time = calculateReadingTime(textContent);

    return (
        <section className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100">
            <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2 flex items-center gap-2">
                <Volume2 size={16} />
                {data.title}
                <ReadingTimeBadge time={time} />
            </h3>
            <div className="space-y-4">
                {data.lines.map((line, idx) => (
                    <div key={idx} className="flex gap-4 group">
                        <div className="w-12 flex-shrink-0 pt-1">
                            <span className="text-xs font-bold text-slate-400 uppercase">{line.speaker}</span>
                        </div>
                        <div className="flex-1">
                            <TextAnnotator
                                contentId={`dialogue-${data.title.replace(/\s+/g, '-').toLowerCase()}-${idx}-mk`}
                                text={line.mk || line.text}
                                className="text-lg text-slate-800 font-medium leading-relaxed group-hover:text-teal-900 transition-colors block"
                            />
                            {(line.en) && (
                                <TextAnnotator
                                    contentId={`dialogue-${data.title.replace(/\s+/g, '-').toLowerCase()}-${idx}-en`}
                                    text={line.en}
                                    className="text-sm text-slate-400 mt-1 block"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const GrammarBlock = ({ data }) => {
    // Collect text for estimation
    let textContent = "";
    // Lesson 2 Support: data.content
    const items = data.items || (data.content && data.content.items) || [];
    const example = data.example || (data.content && data.content.example);
    const rows = data.rows || (data.content && data.content.table) || (data.content && data.content.rows) || [];
    const headers = data.headers || (data.content && data.content.headers);

    if (items) textContent += items.map(i => i.mk + ' ' + i.en).join(' ');
    if (example) textContent += ' ' + (example.mk || example);
    if (rows) textContent += ' ' + rows.map(r => (r.mk || r.verb || '') + ' ' + (r.us || r.pronoun || '')).join(' ');

    const time = calculateReadingTime(textContent);

    return (
        <section className="bg-stone-50 rounded-xl p-6 border border-stone-200/60">
            <h3 className="text-sm font-bold text-stone-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen size={16} />
                {data.title}
                <ReadingTimeBadge time={time} />
            </h3>

            {items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="bg-white px-4 py-3 rounded-lg border border-stone-100 shadow-sm flex flex-col">
                            <span className="text-lg font-bold text-slate-800">{item.mk || item.word_mk}</span>
                            <span className="text-sm text-stone-500">{item.en || item.word_en}</span>
                        </div>
                    ))}
                </div>
            )}

            {headers && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-stone-200">
                                {headers.map((h, i) => (
                                    <th key={i} className="py-2 px-2 text-stone-500 font-semibold">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className="border-b border-stone-100 last:border-0 hover:bg-stone-100/50">
                                    <td className="py-3 px-2 font-bold text-teal-600">{row.suffix}</td>
                                    <td className="py-3 px-2">{row.mk}</td>
                                    <td className="py-3 px-2 text-stone-600">{row.us}</td>
                                    <td className="py-3 px-2 text-stone-600">{row.al}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Lesson 2 Grammar Table Support (Specific to To Be) */}
            {(!headers && rows.length > 0) && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-stone-200">
                                <th className="py-2 px-2 text-stone-500 font-semibold">Pronoun</th>
                                <th className="py-2 px-2 text-stone-500 font-semibold">Verb</th>
                                <th className="py-2 px-2 text-stone-500 font-semibold">Question</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className="border-b border-stone-100 last:border-0 hover:bg-stone-100/50">
                                    <td className="py-3 px-2 font-bold text-teal-600">{row.pronoun}</td>
                                    <td className="py-3 px-2">{row.verb}</td>
                                    <td className="py-3 px-2 text-stone-600">{row.question}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {example && (
                <div className="mt-4 pt-4 border-t border-stone-200">
                    <p className="text-stone-600 italic text-sm">
                        <span className="font-bold not-italic text-stone-800 mr-2">Example:</span>
                        {example.mk || example}
                    </p>
                </div>
            )}
        </section>
    );
};

const ExerciseBlock = ({ data }) => {
    // Fallback for Lesson 2
    const instruction = data.instruction || (data.content && data.content.instruction) || "";
    const questions = data.questions || (data.content && data.content.questions); // Lesson 2 might not have questions array here
    const examples = data.examples || (data.content && data.content.examples);
    const items = data.items || (data.content && data.content.items);

    let textContent = instruction;
    if (questions) textContent += ' ' + questions.join(' ');
    if (examples) textContent += ' ' + examples.map(e => e.mk + ' ' + e.en).join(' ');

    const time = calculateReadingTime(textContent);

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                    ?
                </div>
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    {data.title}
                    <ReadingTimeBadge time={time} />
                </h3>
            </div>

            <div className="pl-11">
                <p className="text-slate-600 mb-4">{instruction}</p>

                {questions && (
                    <ul className="space-y-3">
                        {questions.map((q, i) => (
                            <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-stone-100 shadow-sm hover:border-orange-200 transition-colors cursor-pointer group">
                                <Mic size={18} className="text-stone-300 mt-0.5 group-hover:text-orange-500" />
                                <span className="text-slate-800 font-medium">{q}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {examples && (
                    <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                        {examples.map((ex, i) => (
                            <div key={i} className="mb-2 last:mb-0">
                                <span className="font-bold text-slate-800">{ex.mk}</span>
                                <BlurReveal className="ml-2 text-slate-500 text-sm">{ex.en}</BlurReveal>
                            </div>
                        ))}
                    </div>
                )}

                {items && (
                    <div className="flex flex-wrap gap-2">
                        {items.map((item, i) => (
                            <span key={i} className="px-3 py-1 bg-white border border-stone-200 rounded-full text-sm text-slate-700 shadow-sm">{item}</span>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const FillInBlankBlock = ({ data }) => {
    // Basic implementation for viewing
    // Estimate text
    let textContent = "";

    // Lesson 2 Support
    const lines = data.lines || (data.content && data.content.lines);
    const text = data.text || (data.content && data.content.text); // Not standard in lesson 2 but safe fallback

    if (lines) {
        textContent = lines.map(l => l.text).join(' ');
    } else if (text) {
        textContent = text;
    }
    const time = calculateReadingTime(textContent);

    return (
        <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-xs">✎</span>
                {data.title || "Fill in the blanks"}
                <ReadingTimeBadge time={time} />
            </h3>

            {lines ? (
                <div className="space-y-3 font-medium text-slate-800">
                    {lines.map((line, i) => (
                        <div key={i} className="flex gap-4">
                            <span className="w-8 font-bold text-blue-400 text-right">{line.speaker}</span>
                            <p>
                                {line.blank
                                    ? <span className="border-b-2 border-blue-300 px-4 text-blue-600">__________</span>
                                    : line.text
                                }
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="whitespace-pre-wrap leading-relaxed text-slate-800 font-medium">
                    {text && text.split(/(\[.*?\])/).map((part, i) =>
                        part.startsWith('[') ? (
                            <span key={i} className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded mx-1 font-bold">{part.slice(1, -1)}</span>
                        ) : part
                    )}
                </p>
            )}
        </section>
    );
};

const NoteBlock = ({ data, blockIndex }) => {
    const time = calculateReadingTime(data.markdown);
    return (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-yellow-900 text-sm">
            <h4 className="font-bold mb-1 flex items-center gap-2">
                {data.title}
                <ReadingTimeBadge time={time} />
            </h4>
            <div className="opacity-90 w-full">
                <TextAnnotator
                    contentId={`note-${blockIndex}-${(data.title || 'note').replace(/\s+/g, '-').toLowerCase()}`}
                    text={data.markdown}
                    className="whitespace-pre-line block"
                />
            </div>
        </div>
    );
};

const VocabularyBlock = ({ data }) => {
    const items = data.items || (data.content && data.content.items) || [];
    return (
        <div className="grid grid-cols-2 gap-3">
            {items.map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-stone-200 text-center shadow-sm">
                    <div className="font-bold text-slate-900">{item.mk || item.word_mk}</div>
                    <div className="text-xs text-stone-500 uppercase tracking-wide mt-1">{item.en || item.word_en}</div>
                </div>
            ))}
        </div>
    );
};

export default BookLessonView;

