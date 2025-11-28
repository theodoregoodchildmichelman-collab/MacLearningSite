import React from 'react';

const LessonHeader = ({ progress }) => {
    return (
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white py-12 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-3 border border-white/30">
                    LEVEL 1: NOVICE HIGH
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    Lesson: Modern Vibes 📱
                </h1>
                <p className="text-red-100 text-lg max-w-xl mx-auto">
                    Learn how to text your friends in Skopje and use the slang everyone is actually saying.
                </p>

                {/* Progress Bar */}
                <div className="mt-8 bg-black/20 rounded-full h-2 w-full max-w-xs mx-auto overflow-hidden backdrop-blur-sm">
                    <div
                        className="bg-yellow-400 h-2 transition-all duration-500 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-xs text-red-100/80 mt-2">
                    {Math.round(progress)}% Complete
                </p>
            </div>
        </div>
    );
};

export default LessonHeader;
