import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "rounded-full font-medium transform active:scale-95 hover:-translate-y-0.5 hover:opacity-90 transition-all duration-200 ease-in-out px-6 py-3 flex items-center justify-center relative overflow-hidden";

    const variants = {
        primary: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 border-none",
        secondary: "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
