import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Play, ClipboardList } from 'lucide-react';
import chapters from '../data/chapters.json';


const Dashboard = ({ onStartLesson }) => {
    const navigate = useNavigate();

    const handleChapterClick = (chapter) => {
        if (!chapter.locked) {
            navigate(`/chapter/${chapter.id}`);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">


            <main className="pb-20 max-w-xl mx-auto px-4">

                <div className="text-center pt-12 pb-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95] mb-6 text-gray-900">
                        The Clearest Path to Fluency.
                    </h1>

                    <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                        Minimalistic lessons designed to make your Macedonian <span className="text-gray-900 font-medium italic">бистро</span>.
                    </p>
                </div>

                <div className="space-y-3">
                    {chapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            onClick={() => handleChapterClick(chapter)}
                            className={`
                                relative group transition-all duration-300 ease-out w-[90%] mx-auto
                                ${chapter.locked
                                    ? 'opacity-50 cursor-not-allowed grayscale'
                                    : 'cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]'
                                }
                            `}
                        >
                            {chapter.locked ? (
                                // Locked State
                                <div className="flex items-center justify-between p-6 md:p-8 rounded-full bg-white/40 border border-gray-200/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl font-medium text-gray-400 pl-4">
                                            {chapter.title}
                                        </span>
                                    </div>
                                    <Lock className="w-7 h-7 text-gray-300 mr-2" />
                                </div>
                            ) : (
                                // Active State (Chapter 26)
                                <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10 rounded-[2rem] md:rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:bg-blue-700 transition-all gap-6 md:gap-0">
                                    <div className="flex items-center gap-4 pl-0 md:pl-4 w-full md:w-auto">
                                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                                            <Play className="w-7 h-7 ml-0.5 fill-current" />
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm font-bold text-blue-200 uppercase tracking-wider">Demo Chapter</span>
                                            <span className="font-bold text-3xl leading-none">
                                                {chapter.title}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pr-0 md:pr-2 w-full md:w-auto">
                                        <button className="bg-[#FCD34D] hover:bg-[#FBBF24] text-[#DC2626] px-6 py-4 md:px-10 md:py-5 rounded-full text-lg font-extrabold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 w-full md:w-auto">
                                            <ClipboardList className="w-7 h-7" />
                                            Start Lesson
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>



            </main>
        </div>
    );
};

export default Dashboard;
