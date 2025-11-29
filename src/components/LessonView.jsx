import React, { useEffect, useState } from 'react';
import { getLesson } from '../services/LessonService';
import ReactMarkdown from 'react-markdown';
import { Volume2 } from 'lucide-react';

const LessonView = ({ lessonId = 1 }) => {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const data = await getLesson(lessonId);
                setLesson(data);
            } catch (error) {
                console.error("Failed to fetch lesson", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [lessonId]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
        </div>
    );

    if (!lesson) return <div className="p-8 text-center text-red-500">Lesson not found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-12 pb-20">
            <header className="text-center space-y-2">
                <span className="text-indigo-500 font-semibold tracking-wider text-sm uppercase">Lesson {lesson.id}</span>
                <h1 className="text-4xl font-bold text-gray-900">{lesson.title}</h1>
            </header>

            {/* Dialogue Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">💬</span>
                    Dialogue
                </h2>
                <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    {lesson.dialogue.map((line) => (
                        <div key={line.id} className={`flex items-end gap-3 ${line.speaker === 'Alex' ? 'flex-row' : 'flex-row-reverse'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${line.speaker === 'Alex' ? 'bg-blue-500' : 'bg-green-500'}`}>
                                {line.speaker[0]}
                            </div>
                            <div className={`max-w-[80%] p-4 rounded-2xl ${line.color} ${line.speaker === 'Alex' ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <p className="font-bold text-sm mb-1 text-gray-700">{line.speaker}</p>
                                        <p className="text-lg font-medium text-gray-900 leading-snug">{line.text}</p>
                                        <p className="text-sm text-gray-500 mt-1 italic">{line.translation}</p>
                                    </div>
                                    <button className="p-2 bg-white/50 hover:bg-white rounded-full transition-colors shrink-0" aria-label="Play Audio">
                                        <Volume2 className="w-4 h-4 text-indigo-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vocabulary Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm">🔤</span>
                    Vocabulary
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {lesson.vocabulary.map((word, index) => (
                        <FlipCard key={index} word={word} />
                    ))}
                </div>
            </section>

            {/* Grammar Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">📚</span>
                    Grammar
                </h2>
                <div className="prose prose-indigo max-w-none bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <ReactMarkdown>{lesson.grammar}</ReactMarkdown>
                </div>
            </section>
        </div>
    );
};

const FlipCard = ({ word }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="h-56 perspective-1000 cursor-pointer group"
            onClick={() => setFlipped(!flipped)}
        >
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center backface-hidden shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <span className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{word.emoji}</span>
                    <h3 className="text-xl font-bold text-gray-800 text-center">{word.mk}</h3>
                    <p className="text-xs text-gray-400 mt-2 uppercase tracking-wider font-semibold">Tap to flip</p>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full bg-slate-800 text-white rounded-2xl p-4 flex flex-col items-center justify-center backface-hidden rotate-y-180 shadow-xl">
                    <h3 className="text-xl font-bold mb-2 text-center text-yellow-400">{word.transliteration}</h3>
                    <p className="text-lg font-medium text-center">{word.en}</p>
                    <p className="text-xs text-slate-400 mt-4 italic text-center px-2">"{word.exampleEn}"</p>
                </div>
            </div>
        </div>
    );
};

export default LessonView;
