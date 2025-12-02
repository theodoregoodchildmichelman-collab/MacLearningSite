import React from 'react';
import { Tablet, Keyboard, Mouse, BatteryFull, Plug, Headphones, Wifi, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
    'device-tablet': Tablet,
    'keyboard': Keyboard,
    'mouse': Mouse,
    'battery-full': BatteryFull,
    'plug': Plug,
    'headphones': Headphones,
    'wifi': Wifi,
    'lock': Lock
};

// Map vocab words to their highlight colors (matching the story)
const colorMap = {
    'Екран': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Тастатура': 'bg-green-100 text-green-800 border-green-200',
    'Глувче': 'bg-purple-100 text-purple-800 border-purple-200',
    'Батерија': 'bg-red-100 text-red-800 border-red-200',
    'Полнач': 'bg-orange-100 text-orange-800 border-orange-200',
    'Слушалки': 'bg-pink-100 text-pink-800 border-pink-200',
    'Мрежа': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Лозинка': 'bg-teal-100 text-teal-800 border-teal-200',
    'Вај-фај': 'bg-cyan-100 text-cyan-800 border-cyan-200'
};

const VocabularyGrid = ({ data, onNext, lessonIntro }) => {
    return (
        <div className="space-y-12 pb-12">
            {/* Intro Section */}
            <div className="text-center space-y-6">
                <p className="text-xl text-slate-600 font-medium leading-relaxed">{lessonIntro}</p>
                <div className="bg-white p-8 rounded-[2rem] text-left border-2 border-slate-100 shadow-xl shadow-slate-200/50">
                    <h3 className="font-extrabold text-2xl text-slate-800 mb-4 text-center">Story Time 📖</h3>
                    <p className="text-slate-700 leading-loose text-xl font-medium" dangerouslySetInnerHTML={{ __html: data.story }} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.items.map((item, index) => {
                    const Icon = iconMap[item.icon] || Wifi;
                    const colorClass = colorMap[item.mk] || 'bg-blue-50 text-blue-600 border-blue-100';

                    return (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`group relative p-6 rounded-[2rem] border-2 shadow-lg flex items-center space-x-6 cursor-pointer transition-all ${colorClass.replace('text-', 'border-').split(' ')[2]} bg-white hover:shadow-xl`}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorClass.split(' border')[0]} shadow-inner`}>
                                <Icon size={32} strokeWidth={2.5} />
                            </div>

                            <div className="flex-1 text-left">
                                <h3 className="text-2xl font-bold text-slate-800 mb-1">{item.mk}</h3>
                                <p className="text-base text-slate-500 font-medium">{item.en}</p>
                            </div>

                            {/* Intelligent Tooltip - Centered and constrained */}
                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20 shadow-xl translate-y-2 group-hover:translate-y-0">
                                {item.phonetic}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <button
                onClick={onNext}
                className="w-full group relative inline-flex items-center justify-center px-16 py-6 text-2xl font-bold text-white transition-all duration-300 bg-blue-600 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
                Continue
                <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default VocabularyGrid;
