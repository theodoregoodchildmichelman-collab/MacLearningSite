import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import logo from '../assets/logo.png';

const Layout = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans text-gray-900">
            {/* Unified Top Header */}
            <header className="glass-header sticky top-0 z-50 w-full px-6 py-2 flex justify-center items-center">
                <Link to="/" className="block hover:opacity-80 transition-opacity">
                    <img src={logo} alt="MacLang" className="w-4 h-auto" />
                </Link>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 p-6 md:p-20 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
