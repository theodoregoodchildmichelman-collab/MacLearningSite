import React, { useState } from 'react';
import { BookOpen, Dumbbell, Book, User, Users, LogOut, Sun, Menu, X } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
    >
        <Icon size={20} />
        <span>{label}</span>
    </div>
);

const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col md:flex-row">

            {/* Mobile Header */}
            <div className="md:hidden bg-white p-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="text-blue-600 font-bold text-xl flex items-center gap-1">
                        <span className="text-2xl font-black">M</span>
                        <Sun className="text-yellow-400 fill-yellow-400" size={24} />
                        <span>MacedonianLearn</span>
                    </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-40 transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-6 border-b border-gray-100 hidden md:block">
                    <div className="flex items-center gap-1 text-blue-900 font-bold text-xl">
                        <span className="text-blue-600 text-2xl font-black">M</span>
                        <Sun className="text-yellow-400 fill-yellow-400" size={24} />
                        <span>MacedonianLearn</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <SidebarItem icon={BookOpen} label="Lessons" active />
                    <SidebarItem icon={Dumbbell} label="Exercises" />
                    <SidebarItem icon={Book} label="Dictionary" />
                    <SidebarItem icon={User} label="Profile" />
                    <SidebarItem icon={Users} label="Community" />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <SidebarItem icon={LogOut} label="Log Out" />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Desktop Header */}
                <header className="bg-white h-20 border-b border-gray-100 hidden md:flex items-center justify-end px-8 gap-4 sticky top-0 z-30">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                        <User size={18} />
                        <span>Profile</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                        <BookOpen size={18} />
                        <span>Chapters</span>
                        <span className="text-lg">📚</span>
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;
