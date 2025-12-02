import React, { useState } from 'react';
import { Monitor, Keyboard, Mouse, Battery, Plug, Headphones, Wifi, Lock, Smartphone, Volume2, Hash, Users, AtSign, Bell, BookOpen, ArrowRight } from 'lucide-react';

// ==========================================
// DATA STRUCTURES
// ==========================================

const techHardwareVocab = [
    { mk: "Екран", phonetic: "Ek-ran", en: "Screen", icon: Monitor, color: "blue" },
    { mk: "Тастатура", phonetic: "Tas-ta-too-ra", en: "Keyboard", icon: Keyboard, color: "indigo" },
    { mk: "Глувче", phonetic: "Gloov-che", en: "Mouse", icon: Mouse, color: "purple" },
    { mk: "Звучник", phonetic: "Zvooch-neek", en: "Speaker", icon: Volume2, color: "pink" },
    { mk: "Батерија", phonetic: "Ba-te-ree-ya", en: "Battery", icon: Battery, color: "green" },
    { mk: "Полнач", phonetic: "Pol-nach", en: "Charger", icon: Plug, color: "yellow" },
    { mk: "Слушалки", phonetic: "Sloo-shal-kee", en: "Headphones", icon: Headphones, color: "red" },
    { mk: "Мрежа", phonetic: "Mre-zha", en: "Network / Signal", icon: Wifi, color: "cyan" },
    { mk: "Лозинка", phonetic: "Lo-zeen-ka", en: "Password", icon: Lock, color: "orange" },
    { mk: "Вај-фај", phonetic: "Wi-Fi", en: "Wi-Fi", icon: Wifi, color: "teal" },
];

const socialMediaVocab = [
    { mk: "Стори (Story)", meaning: "An Instagram/Facebook story.", example: "„Види го сторито на Елен.“", icon: Smartphone, color: "pink" },
    { mk: "Пост / Објава", meaning: "A post. (Објава is formal, Пост is casual).", example: null, icon: Hash, color: "blue" },
    { mk: "Нотификација", meaning: "Notification.", example: null, icon: Bell, color: "red" },
    { mk: "Фоловер", meaning: "Follower.", example: null, icon: Users, color: "green" },
    { mk: "Инфлуенсер", meaning: "Influencer.", example: null, icon: AtSign, color: "purple" },
    { mk: "Профилна", meaning: "Profile picture.", example: "„Убава ти е новата профилна.“", icon: Users, color: "indigo" },
    { mk: "Таг", meaning: "A tag (in a photo).", example: null, icon: AtSign, color: "orange" },
    { mk: "Група", meaning: "Group chat.", example: "„Пиши во групата.“", icon: Users, color: "teal" },
];

// The Story Data (Broken into segments for readability)
const storyData = {
    title: "Сабота во Неготино (Saturday in Negotino)",
    segments: [
        {
            text: "Во сончево Неготино, Али работи на новиот лаптоп. Таа гледа во светлиот екран, а Тојен клика со глувчето.",
            highlight: ["екран", "глувчето", "лаптоп"]
        },
        {
            text: "Одеднаш, паника! „Телефонот ми е крш!“ вика Даниел. Елизабет прашува: „Батеријата?“ Даниел кимнува. Елен веднаш му фрла полнач.",
            highlight: ["Батеријата", "полнач", "Телефонот"]
        },
        {
            text: "На другата маса, Кејти и Сара ставаат слушалки. Но, Лора е нервозна: „Тука нема добра мрежа!“",
            highlight: ["слушалки", "мрежа"]
        },
        {
            text: "Стефани ја бара лозинката од келнерот. Џозеф се смее: „Супер! Имаме брз вај-фај!“ Тео и Кристијан наздравуваат. Сите се онлајн.",
            highlight: ["лозинката", "вај-фај", "онлајн"]
        }
    ]
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

const HardwareCard = ({ item }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlayAudio = () => {
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 1000);
    };
    const IconTag = item.icon;
    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        indigo: "bg-indigo-100 text-indigo-600",
        purple: "bg-purple-100 text-purple-600",
        pink: "bg-pink-100 text-pink-600",
        green: "bg-green-100 text-green-600",
        yellow: "bg-yellow-100 text-yellow-600",
        red: "bg-red-100 text-red-600",
        cyan: "bg-cyan-100 text-cyan-600",
        orange: "bg-orange-100 text-orange-600",
        teal: "bg-teal-100 text-teal-600",
    };

    return (
        <div className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center relative overflow-hidden">
            <button
                onClick={handlePlayAudio}
                className={`absolute top-2 right-2 p-2 rounded-full ${isPlaying ? 'bg-blue-100 text-blue-600' : 'text-gray-300 hover:bg-gray-100 hover:text-gray-500'} transition-colors`}
            >
                <Volume2 size={18} className={isPlaying ? 'animate-pulse' : ''} />
            </button>
            <div className={`p-3 rounded-xl mb-3 ${colorClasses[item.color] || 'bg-gray-100 text-gray-600'}`}>
                <IconTag size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{item.mk}</h3>
            <p className="text-sm text-gray-500 italic mb-2">/{item.phonetic}/</p>
            <p className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-full">{item.en}</p>
        </div>
    );
};

const ContextCard = ({ item }) => {
    const IconTag = item.icon;
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-start space-x-4 hover:bg-gray-50 transition-colors duration-200">
            <div className="p-2 bg-gray-100 text-gray-500 rounded-lg shrink-0">
                <IconTag size={24} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
                <h3 className="text-md font-bold text-gray-900">{item.mk}</h3>
                <p className="text-sm text-gray-700 mt-1">{item.meaning}</p>
                {item.example && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 border-l-2 border-blue-300">
                        <span className="font-semibold mr-1">Ex:</span> {item.example}
                    </div>
                )}
            </div>
        </div>
    );
};

const StorySegment = ({ segment, index }) => {
    // Highlight vocabulary words in the text
    const parts = segment.text.split(new RegExp(`(${segment.highlight.join('|')})`, 'gi'));

    return (
        <div className="flex gap-4 mb-6 last:mb-0">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                {index + 1}
            </div>
            <div className="bg-white p-4 rounded-xl rounded-tl-none border border-gray-100 shadow-sm flex-1">
                <p className="text-gray-800 leading-relaxed text-lg">
                    {parts.map((part, i) =>
                        segment.highlight.some(h => h.toLowerCase() === part.toLowerCase()) ? (
                            <span key={i} className="font-bold text-blue-600 bg-blue-50 px-1 rounded mx-0.5 border-b-2 border-blue-200">{part}</span>
                        ) : (
                            part
                        )
                    )}
                </p>
            </div>
        </div>
    );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function InteractiveVocabularyScript({ onNext }) {
    return (
        <div className="max-w-2xl mx-auto p-4 space-y-12 pb-12 font-sans antialiased bg-gray-50/30 min-h-screen">

            {/* Header */}
            <header className="text-left py-6">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 inline-block">Lesson 26</span>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Во светот на интернетот</h1>
                <p className="text-xl text-gray-500">In the world of the internet</p>
            </header>

            {/* 1. Hardware Grid */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-3 rounded-2xl mr-4 shadow-sm">
                        <Monitor size={24} />
                    </span>
                    Хардвер (Hardware)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {techHardwareVocab.map((item, index) => (
                        <div key={index} className={`group bg-${item.color}-50 rounded-3xl p-4 border-2 border-${item.color}-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden cursor-pointer`}>
                            <button
                                onClick={() => { }}
                                className={`absolute top-2 right-2 p-1.5 rounded-full text-${item.color}-400 hover:bg-white hover:text-${item.color}-600 transition-colors`}
                            >
                                <Volume2 size={18} />
                            </button>
                            <div className={`p-3 rounded-2xl mb-3 bg-white text-${item.color}-500 shadow-sm`}>
                                <item.icon size={28} strokeWidth={2} />
                            </div>
                            <h3 className={`text-2xl font-extrabold text-${item.color}-900 mb-1`}>{item.mk}</h3>
                            <p className={`text-xs font-bold uppercase tracking-wider text-${item.color}-400 mb-2`}>{item.phonetic}</p>
                            <p className={`text-sm font-bold text-${item.color}-700 bg-white/60 px-3 py-1 rounded-full`}>{item.en}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="h-px bg-slate-100 my-12" />

            {/* 2. Social Media List */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                    <span className="bg-purple-100 text-purple-600 p-3 rounded-2xl mr-4 shadow-sm">
                        <Smartphone size={24} />
                    </span>
                    Социјални Мрежи (Social Media)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {socialMediaVocab.map((item, index) => (
                        <div key={index} className={`group bg-${item.color}-50 rounded-3xl p-4 border-2 border-${item.color}-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center cursor-pointer`}>
                            <div className={`p-3 rounded-2xl mb-3 bg-white text-${item.color}-500 shadow-sm`}>
                                <item.icon size={28} strokeWidth={2} />
                            </div>
                            <h3 className={`text-2xl font-extrabold text-${item.color}-900 mb-1`}>{item.mk}</h3>
                            <p className={`text-sm font-medium text-${item.color}-700 leading-snug`}>{item.meaning}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="h-px bg-slate-100 my-12" />

            {/* 3. Story Section */}
            <section className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center">
                        <span className="bg-orange-100 text-orange-600 p-3 rounded-2xl mr-4 shadow-sm">
                            <BookOpen size={24} />
                        </span>
                        Приказна: Сабота во Неготино
                    </h2>
                    <p className="text-slate-500 pl-[4.5rem]">Read along. Tech words are highlighted.</p>
                </div>

                <div className="space-y-8">
                    {storyData.segments.map((segment, index) => (
                        <div key={index} className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-100">
                                {index + 1}
                            </div>
                            <div className="flex-1 pt-1">
                                <p className="text-slate-800 leading-loose text-2xl md:text-3xl font-medium tracking-wide">
                                    {segment.text.split(new RegExp(`(${segment.highlight.join('|')})`, 'gi')).map((part, i) =>
                                        segment.highlight.some(h => h.toLowerCase() === part.toLowerCase()) ? (
                                            <span key={i} className="font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-xl mx-1 shadow-sm inline-block transform hover:scale-105 transition-transform cursor-default">{part}</span>
                                        ) : (
                                            part
                                        )
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Navigation Button */}
            <div className="pt-8 flex justify-center">
                <button
                    onClick={onNext}
                    className="group relative inline-flex items-center justify-center px-16 py-6 text-2xl font-bold text-white transition-all duration-300 bg-blue-600 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                    Continue to Next Section
                    <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </div>
    );
}
