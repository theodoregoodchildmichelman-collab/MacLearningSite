import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

const Quiz = ({ data, onComplete }) => {
    const { title, instruction, vocabulary } = data;
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null); // null, true, false

    useEffect(() => {
        if (vocabulary && vocabulary.length > 0) {
            generateQuestions();
        }
    }, [vocabulary]);

    const generateQuestions = () => {
        const generatedQuestions = [];

        // Helper to get random distractors
        const getDistractors = (correctItem, type, count = 3) => {
            const otherItems = vocabulary.filter(item => item.mk !== correctItem.mk);
            const shuffled = [...otherItems].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count).map(item => type === 'en' ? item.en : item.mk);
        };

        vocabulary.forEach(item => {
            // 1. Multiple Choice (Translate MK -> EN)
            const mcDistractors = getDistractors(item, 'en');
            const mcOptions = [...mcDistractors, item.en].sort(() => 0.5 - Math.random());
            generatedQuestions.push({
                type: 'multiple_choice',
                question: `What does "${item.mk}" mean?`,
                correctAnswer: item.en,
                options: mcOptions,
                originalItem: item
            });

            // 2. Audio Match (Listen -> Select MK)
            // Assuming we simulate audio or have a placeholder
            const amDistractors = getDistractors(item, 'mk');
            const amOptions = [...amDistractors, item.mk].sort(() => 0.5 - Math.random());
            generatedQuestions.push({
                type: 'audio_match',
                question: "Listen and select the correct word",
                correctAnswer: item.mk,
                options: amOptions,
                originalItem: item
            });

            // 3. Fill-in-the-blank (Context)
            if (item.example) {
                // Simple regex to replace the word in the sentence (case insensitive)
                // This is a basic implementation; might need refinement for complex sentences
                const regex = new RegExp(item.mk, 'gi');
                const sentenceWithBlank = item.example.replace(regex, '_____');

                // Only add if the replacement actually happened (word found in example)
                if (sentenceWithBlank.includes('_____')) {
                    const fitbDistractors = getDistractors(item, 'mk');
                    const fitbOptions = [...fitbDistractors, item.mk].sort(() => 0.5 - Math.random());
                    generatedQuestions.push({
                        type: 'fill_in_blank',
                        question: "Complete the sentence:",
                        context: sentenceWithBlank,
                        correctAnswer: item.mk,
                        options: fitbOptions,
                        originalItem: item
                    });
                }
            }
        });

        // Shuffle all questions
        setQuestions(generatedQuestions.sort(() => 0.5 - Math.random()));
    };

    const handleOptionClick = (option) => {
        if (selectedOption) return; // Prevent changing answer
        setSelectedOption(option);

        const currentQuestion = questions[currentQuestionIndex];
        const correct = option === currentQuestion.correctAnswer;
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        setSelectedOption(null);
        setIsCorrect(null);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowSummary(true);
        }
    };

    const handleRetry = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setShowSummary(false);
        setSelectedOption(null);
        setIsCorrect(null);
        generateQuestions(); // Regenerate/reshuffle
    };

    const playAudio = (text) => {
        // Simple browser TTS for demo purposes
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            // utterance.lang = 'mk-MK'; // Macedonian might not be supported in all browsers, falling back to default or approximate
            window.speechSynthesis.speak(utterance);
        } else {
            console.log("TTS not supported");
        }
    };

    if (questions.length === 0) {
        return <div className="p-8 text-center">Loading quiz...</div>;
    }

    if (showSummary) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-slate-800">Quiz Complete!</h2>
                <div className="mb-6">
                    <div className="text-6xl font-black text-blue-500 mb-2">{percentage}%</div>
                    <p className="text-slate-500">You got {score} out of {questions.length} correct</p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleRetry}
                        className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </button>
                    <button
                        onClick={onComplete}
                        className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                        Continue Lesson
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>Score: {score}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100"
                >
                    {/* Question Header */}
                    <div className="mb-6 text-center">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                            {currentQuestion.type.replace(/_/g, ' ')}
                        </span>

                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                            {currentQuestion.question}
                        </h3>

                        {currentQuestion.type === 'audio_match' && (
                            <button
                                onClick={() => playAudio(currentQuestion.originalItem.mk)}
                                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors mb-2"
                            >
                                <Volume2 className="w-8 h-8" />
                            </button>
                        )}

                        {currentQuestion.type === 'fill_in_blank' && (
                            <p className="text-lg text-slate-600 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                                {currentQuestion.context}
                            </p>
                        )}
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => {
                            let optionClass = "w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 flex items-center justify-between ";

                            if (selectedOption) {
                                if (option === currentQuestion.correctAnswer) {
                                    optionClass += "border-green-500 bg-green-50 text-green-700";
                                } else if (option === selectedOption) {
                                    optionClass += "border-red-500 bg-red-50 text-red-700";
                                } else {
                                    optionClass += "border-slate-100 text-slate-400 opacity-50";
                                }
                            } else {
                                optionClass += "border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-700";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(option)}
                                    disabled={selectedOption !== null}
                                    className={optionClass}
                                >
                                    <span>{option}</span>
                                    {selectedOption && option === currentQuestion.correctAnswer && (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    )}
                                    {selectedOption && option === selectedOption && option !== currentQuestion.correctAnswer && (
                                        <XCircle className="w-5 h-5 text-red-600" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Feedback / Next Button */}
                    {selectedOption && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 pt-6 border-t border-slate-100"
                        >
                            <div className={`mb-4 text-center font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                {isCorrect ? 'Correct! 🎉' : `Incorrect. The answer is "${currentQuestion.correctAnswer}"`}
                            </div>
                            <button
                                onClick={handleNext}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
                            >
                                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Quiz;
