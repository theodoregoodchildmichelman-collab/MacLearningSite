import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import { callGemini } from '../services/GeminiService';

const AIChat = ({ onOpenSettings }) => {
    const [messages, setMessages] = useState([
        { text: "Здраво! Како си? (Hi! How are you?)", isUser: false }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userText = input.trim();
        setMessages(prev => [...prev, { text: userText, isUser: true }]);
        setInput('');
        setIsLoading(true);

        try {
            const prompt = `You are a cool teenager from Skopje, Macedonia. 
      Roleplay a text conversation with a learner. 
      Keep responses short (1 sentence). 
      Use Macedonian slang where appropriate but keep it simple. 
      The user said: "${userText}". 
      Reply in Macedonian, followed by the English translation in parentheses.`;

            const reply = await callGemini(prompt);
            setMessages(prev => [...prev, { text: reply, isUser: false }]);
        } catch (error) {
            if (error.message === "No API Key") {
                onOpenSettings();
                setMessages(prev => [...prev, { text: "Please set your API Key in settings to use the chat.", isUser: false, isError: true }]);
            } else {
                setMessages(prev => [...prev, { text: "Error connecting to AI. Please try again.", isUser: false, isError: true }]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-sm md:text-base">Text with a Local</h2>
                        <p className="text-xs text-indigo-100 opacity-80">Powered by Gemini ✨</p>
                    </div>
                </div>
                <button
                    onClick={() => setMessages([{ text: "Здраво! Како си? (Hi! How are you?)", isUser: false }])}
                    className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition"
                >
                    Reset
                </button>
            </div>

            {/* Chat Area */}
            <div ref={chatBoxRef} className="h-64 overflow-y-auto p-4 bg-gray-50 space-y-3 flex flex-col">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={msg.isUser
                            ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none py-2 px-4 max-w-[80%] shadow-sm text-sm'
                            : `bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none py-2 px-4 max-w-[80%] shadow-sm text-sm cyrillic ${msg.isError ? 'text-red-500' : ''}`
                        }>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-400 rounded-2xl rounded-tl-none py-2 px-4 text-xs italic">
                            Typing...
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type in MK or EN..."
                    className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition shadow-md disabled:opacity-50"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </section>
    );
};

export default AIChat;
