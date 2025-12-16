import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * BlurReveal Component
 * 
 * Implements an "Active Recall" mechanic. Content is initially blurred.
 * User must click to reveal the content.
 * 
 * @param {React.ReactNode} children - The content to be blurred (text, or simple elements)
 * @param {string} className - Optional utility classes
 * @param {boolean} blurDefault - Whether it starts in blurred state (default: true)
 */
const BlurReveal = ({ children, className = "", blurDefault = true }) => {
    const [isRevealed, setIsRevealed] = useState(!blurDefault);

    const toggleReveal = () => {
        setIsRevealed(!isRevealed);
    };

    return (
        <span
            onClick={toggleReveal}
            className={`
                relative inline-block cursor-pointer transition-all duration-300 ease-in-out select-none
                ${isRevealed ? 'filter-none' : 'blur-md hover:blur-sm bg-slate-200/50 rounded px-1'}
                ${className}
            `}
            title={isRevealed ? "Click to hide" : "Click to reveal answer"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    toggleReveal();
                }
            }}
        >
            <span className={`transition-opacity duration-300 ${isRevealed ? 'opacity-100' : 'opacity-40 text-transparent'}`}>
                {children}
            </span>

            {/* Optional Icon Overlay when blurred for better affordance */}
            {!isRevealed && (
                <span className="absolute inset-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                    <Eye size={14} className="text-slate-500" />
                </span>
            )}
        </span>
    );
};

export default BlurReveal;
