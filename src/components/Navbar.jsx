import React from 'react';
import { Settings } from 'lucide-react';

const Navbar = ({ onOpenSettings }) => {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🇲🇰</span>
                        <span className="font-bold text-xl tracking-tight text-red-600">Zboruvaj!</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            <span>🔥 Streak:</span>
                            <span className="font-bold text-orange-500">3 Days</span>
                        </div>

                        <button
                            onClick={onOpenSettings}
                            className="p-2 text-gray-400 hover:text-red-600 transition"
                            title="Settings / API Key"
                        >
                            <Settings className="w-5 h-5" />
                        </button>

                        <div id="auth-placeholder">
                            <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition shadow-md">
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
