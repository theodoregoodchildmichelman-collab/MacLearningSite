import React from 'react';
import { clsx } from 'clsx';

const Layout = ({ children, className }) => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex justify-center">
            <div className={clsx("w-full max-w-md bg-white min-h-screen shadow-xl overflow-hidden relative", className)}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
