import React, { useState } from 'react';

const Input = ({ className = '', status = 'default', ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    const statusStyles = {
        default: 'border-slate-200 focus:border-blue-500',
        success: 'border-green-500 text-green-600',
        error: 'border-red-500 text-red-600'
    };

    const activeColor = status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-blue-500';

    return (
        <div className={`relative w-full ${className}`}>
            <input
                className={`w-full py-3 px-1 bg-transparent border-b-2 outline-none placeholder-slate-400 transition-colors duration-300 ${statusStyles[status]}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            <div
                className={`absolute bottom-0 left-0 h-[2px] w-full ${activeColor} transform transition-transform duration-300 origin-center ${isFocused || status !== 'default' ? 'scale-x-100' : 'scale-x-0'}`}
            />
        </div>
    );
};

export default Input;
