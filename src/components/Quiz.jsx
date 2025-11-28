import React, { useState } from 'react';
import { BrainCircuit } from 'lucide-react';

const Quiz = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleCheck = (isAnswerCorrect, index) => {
        setSelectedAnswer(index);
        setIsCorrect(isAnswerCorrect);
    };

    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-lg font-bold">Pop Quiz</h2>
                    <p className="text-sm text-gray-500">Test your slang knowledge</p>
                </div>
            </div>

            <div>
                <p className="text-lg mb-4 font-medium text-gray-800">How do you say "Bro" in informal Macedonian?</p>
                <div className="grid gap-3">
                    {[
                        { text: "Татко (Tatko)", correct: false },
                        { text: "Брат (Brat)", correct: true },
                        { text: "Чичко (Chichko)", correct: false }
                    ].map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleCheck(option.correct, idx)}
                            disabled={selectedAnswer !== null}
                            className={`w-full text-left p-4 rounded-xl border transition cyrillic font-medium 
                ${selectedAnswer === null
                                    ? 'border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600'
                                    : selectedAnswer === idx
                                        ? option.correct
                                            ? 'border-green-500 bg-green-50 text-green-700'
                                            : 'border-red-500 bg-red-50 text-red-700'
                                        : 'border-gray-200 text-gray-400'
                                }`}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>

                {selectedAnswer !== null && (
                    <div className={`mt-4 text-center font-bold p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isCorrect ? "Точно! (Correct!) 🎉" : "Грешка (Mistake). Try again!"}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Quiz;
