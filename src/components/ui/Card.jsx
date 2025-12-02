import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white rounded-card shadow-sm border border-gray-100 p-6 ${props.onClick || props.interactive ? 'cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-in-out' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
