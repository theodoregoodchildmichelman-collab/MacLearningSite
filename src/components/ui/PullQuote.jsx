import React from 'react';
import { Quote } from 'lucide-react';

const PullQuote = ({ text, author, className = '' }) => {
    return (
        <div className={`relative my-8 px-8 py-6 max-w-2xl mx-auto rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-sm ${className}`}>
            <Quote className="absolute top-4 left-4 text-blue-200 w-8 h-8 -z-0" />
            <blockquote className="relative z-10">
                <p className="text-xl md:text-2xl font-serif text-slate-800 italic leading-relaxed text-center">
                    "{text}"
                </p>
                {author && (
                    <footer className="mt-4 text-center">
                        <cite className="text-sm font-bold text-blue-600 uppercase tracking-wider not-italic">
                            — {author}
                        </cite>
                    </footer>
                )}
            </blockquote>
        </div>
    );
};

export default PullQuote;
