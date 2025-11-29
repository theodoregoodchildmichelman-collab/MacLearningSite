import React from 'react';
import { BookOpen, Dumbbell, Star } from 'lucide-react';

const Dashboard = ({ onStartLesson }) => {
    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* Welcome Banner */}
            <div className="bg-blue-700 rounded-3xl p-8 md:p-12 text-white shadow-lg shadow-blue-900/20 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome!</h1>
                    <p className="text-xl md:text-2xl text-blue-100 font-light">Start learning.</p>
                </div>
                {/* Decorative circle */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600 rounded-full opacity-50 blur-3xl"></div>
            </div>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1: Your Progress */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Your Progress: 35%</h3>
                        <div className="w-full bg-blue-50 h-4 rounded-full overflow-hidden mb-6">
                            <div className="bg-yellow-400 h-full w-[35%] rounded-full"></div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Your progress:</p>
                        <p className="font-semibold text-gray-900">Grammar Milestones</p>
                    </div>
                    <a href="#" className="text-sm text-gray-400 mt-4 hover:text-blue-600">view price</a>
                </div>

                {/* Card 2: Current Lesson */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2">Current Lesson:</p>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Grammar Basics</h3>
                    </div>
                    <button
                        onClick={onStartLesson}
                        className="w-full py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors shadow-md shadow-blue-200"
                    >
                        Continue
                    </button>
                </div>

                {/* Card 3: New Words */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-sm font-semibold text-gray-500 mb-2">New Words:</p>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Family</h3>
                    </div>

                    {/* Visual representation of flashcards */}
                    <div className="mt-auto flex justify-center relative h-24">
                        <div className="absolute bottom-0 right-8 w-16 h-20 bg-blue-100 border-2 border-blue-200 rounded-lg transform rotate-12 flex items-center justify-center shadow-sm">
                            <Star className="text-blue-400 fill-blue-400" size={20} />
                        </div>
                        <div className="absolute bottom-0 right-16 w-16 h-20 bg-yellow-50 border-2 border-yellow-200 rounded-lg transform -rotate-6 flex items-center justify-center shadow-sm z-10">
                            <Star className="text-yellow-400 fill-yellow-400" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Lessons Lesson Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lessons Lesson</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lesson Item 1 */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Lessons 1</h4>
                            <p className="text-sm text-gray-500">Basics</p>
                        </div>
                    </div>

                    {/* Lesson Item 2 */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Dumbbell size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Exercises 2</h4>
                            <p className="text-sm text-gray-500">Practice</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
