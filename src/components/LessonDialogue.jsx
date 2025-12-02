import React from 'react';
import { ArrowRight } from 'lucide-react';

import img1 from '../assets/CARTOONTECH/1cartoon.png';
import img2 from '../assets/CARTOONTECH/2cartoon.png';
import img3 from '../assets/CARTOONTECH/3cartoon.png';
import img4 from '../assets/CARTOONTECH/4cartoon.png';
import img5 from '../assets/CARTOONTECH/5cartoon.png';
import img6 from '../assets/CARTOONTECH/6cartoon.png';
import img7 from '../assets/CARTOONTECH/7cartoon.png';
import img8 from '../assets/CARTOONTECH/8cartoon.png';
import img9 from '../assets/CARTOONTECH/9cartoon.png';
import img10 from '../assets/CARTOONTECH/10cartoon.png';
import img11 from '../assets/CARTOONTECH/11cartoon.png';

const storyImages = [
    img1, img2, img3, img5, img4, img6,
    img7, img8, img9, img10, img11
];

export default function LessonDialogue({ onNext }) {
    return (
        <div className="max-w-2xl mx-auto space-y-8 md:space-y-12 pb-12 font-sans antialiased">

            {/* Header */}
            <header className="text-left py-6">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 inline-block">Lesson 26</span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Во светот на интернетот</h1>
                <p className="text-xl text-gray-500">In the world of the internet</p>
            </header>

            {/* Dialogue Section */}
            <section className="bg-white rounded-[2rem] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-slate-100 h-[75vh] flex flex-col">
                <div className="mb-6 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center">
                        Find a partner and read this story.
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {storyImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Story part ${index + 1}`}
                            className="w-[85%] h-auto mx-auto mb-6 rounded-xl shadow-sm last:mb-0"
                        />
                    ))}
                </div>
            </section>

            {/* Navigation Button */}
            <div className="pt-8 flex justify-center">
                <button
                    onClick={onNext}
                    className="group relative inline-flex items-center justify-center px-16 py-6 text-2xl font-bold text-white transition-all duration-300 bg-blue-600 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                    Continue to Vocabulary
                    <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </div>
    );
}
