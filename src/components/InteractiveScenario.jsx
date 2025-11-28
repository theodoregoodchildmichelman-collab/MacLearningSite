import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, XCircle } from 'lucide-react';

const InteractiveScenario = ({ data, onComplete }) => {
    const [visibleLines, setVisibleLines] = useState(0);
    const [currentInput, setCurrentInput] = useState('');
    const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
    const messagesEndRef = useRef(null);

    const lines = data.dialogueLines;
    const currentLine = lines[visibleLines];
    const isUserTurn = currentLine && currentLine.text.includes('{blank}');

    useEffect(() => {
        // Auto-advance non-interactive lines
        if (currentLine && !isUserTurn) {
            const timer = setTimeout(() => {
                setVisibleLines(prev => prev + 1);
            }, 1500); // Read time
            return () => clearTimeout(timer);
        } else if (!currentLine) {
            // End of dialogue
            setTimeout(onComplete, 2000);
        }
    }, [visibleLines, isUserTurn, currentLine, onComplete]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [visibleLines, feedback]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentInput.trim()) return;

        const answers = Array.isArray(currentLine.answer) ? currentLine.answer : [currentLine.answer];
        // Simple normalization: lowercase and trim
        const isCorrect = answers.some(ans =>
            ans.toLowerCase() === currentInput.toLowerCase().trim()
        );

        if (isCorrect) {
            setFeedback('correct');
            setTimeout(() => {
                setFeedback(null);
                setCurrentInput('');
                setVisibleLines(prev => prev + 1);
            }, 1000);
        } else {
            setFeedback('incorrect');
            setTimeout(() => setFeedback(null), 1500);
        }
    };

    const renderMessage = (line, index) => {
        const isMe = line.speaker === 'Toyen' || line.speaker === 'Me'; // Assuming Toyen/Me is right-aligned for variety, or stick to left/right based on speaker
        // Actually, let's make Allie left (friend) and Toyen right (user/friend) or just alternate.
        // The JSON says "Allie and Toyen are chatting". Let's assume Allie is Left, Toyen is Right.
        const isRight = line.speaker === 'Toyen';

        // Replace {blank} with the answer if the line is passed
        const text = line.text.replace('{blank}', (match) => {
            if (index < visibleLines) {
                // Show the answer for past lines
                const ans = Array.isArray(line.answer) ? line.answer[0] : line.answer;
                return `<span class="font-bold text-blue-600">${ans}</span>`;
            }
            return '___';
        });

        return (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex w-full mb-4 ${isRight ? 'justify-end' : 'justify-start'}`}
            >
                <div className={`max-w-[80%] p-4 rounded-2xl ${isRight
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm'
                    }`}>
                    <p className="text-xs opacity-70 mb-1">{line.speaker}</p>
                    <p dangerouslySetInnerHTML={{ __html: text }} />
                </div>
            </motion.div>
        );
    };

    if (!currentLine && visibleLines >= lines.length) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4"
                >
                    <CheckCircle size={40} />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Lesson Complete!</h2>
                <p className="text-slate-500">You've mastered the internet slang.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[60vh]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {lines.slice(0, visibleLines + (isUserTurn ? 1 : 0)).map((line, i) => {
                    // Don't render the current line if it's the user's turn (we render the input area instead? No, render bubble with blank)
                    // Actually, let's render the bubble with the blank, and the input fills it?
                    // Or render previous lines, and the current line is "typing..." or the input box is at the bottom.
                    // Let's render previous lines. The current line (if interactive) is handled by the input bar.
                    if (i === visibleLines && isUserTurn) return null;
                    return renderMessage(line, i);
                })}

                {/* Current interactive bubble preview? */}
                {isUserTurn && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`flex w-full mb-4 ${currentLine.speaker === 'Toyen' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] p-4 rounded-2xl ${currentLine.speaker === 'Toyen'
                                ? 'bg-blue-500 text-white rounded-tr-none'
                                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm'
                            }`}>
                            <p className="text-xs opacity-70 mb-1">{currentLine.speaker}</p>
                            <p>
                                {currentLine.text.split('{blank}')[0]}
                                <span className="inline-block w-16 border-b-2 border-current animate-pulse"></span>
                                {currentLine.text.split('{blank}')[1]}
                            </p>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {isUserTurn && (
                <div className="mt-4">
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            placeholder="Type the missing word..."
                            className={`
                w-full p-4 pr-12 rounded-xl border-2 outline-none transition-all
                ${feedback === 'correct' ? 'border-green-500 bg-green-50' :
                                    feedback === 'incorrect' ? 'border-red-500 bg-red-50' :
                                        'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
              `}
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                    {feedback === 'incorrect' && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 text-center"
                        >
                            Try again! Hint: {Array.isArray(currentLine.answers) ? currentLine.answers[0] : currentLine.answer}
                        </motion.p>
                    )}
                </div>
            )}
        </div>
    );
};

export default InteractiveScenario;
