import React from 'react';
import { motion } from 'framer-motion';

const TechVerbs = ({ data, onNext }) => {
    return (
        <div className="space-y-6 pb-12">
            {/* Social Media Feed Container */}
            <div className="bg-slate-100 p-4 rounded-[30px] shadow-inner min-h-[400px]">
                <div className="text-center border-b-2 border-slate-200 pb-4 mb-4">
                    <h2 className="text-xl font-bold text-[#002f6c]">Tech Verbs 📱</h2>
                    <p className="text-sm text-slate-500">Practice in Negotino</p>
                </div>

                <div className="space-y-4">
                    {/* Card 1: Daniel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#d20000] text-white flex items-center justify-center font-bold mr-3">D</div>
                            <div className="font-bold text-slate-800">Daniel</div>
                        </div>
                        <p className="text-slate-700 mb-3">
                            Кафето е ладно. Зошто? Затоа што Даниел само <b><u>скрола</u></b> на Инстаграм.
                        </p>
                        <div className="flex justify-between text-sm text-slate-400 border-t border-slate-100 pt-2">
                            <span>❤️ 12 likes</span>
                            <span>💬 Comment</span>
                        </div>
                    </motion.div>

                    {/* Card 2: Elizabeth & Ellen */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#d20000] text-white flex items-center justify-center font-bold mr-3">E</div>
                            <div className="font-bold text-slate-800">Elizabeth & Ellen</div>
                        </div>
                        <p className="text-slate-700 mb-3">
                            Елизабет става слика. Елен е добра пријателка и веднаш ја <b><u>лајкува</u></b> сликата.
                        </p>
                        <div className="flex justify-between text-sm text-slate-400 border-t border-slate-100 pt-2">
                            <span>❤️ You liked this</span>
                            <span>💬 Comment</span>
                        </div>
                    </motion.div>

                    {/* Card 3: Katie */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#d20000] text-white flex items-center justify-center font-bold mr-3">K</div>
                            <div className="font-bold text-slate-800">Katie</div>
                        </div>
                        <p className="text-slate-700 mb-3">
                            Кејти гледа смешно видео. Таа ја <b><u>тагира</u></b> Сара. „Сара, види го ова!“
                        </p>
                        <div className="flex justify-between text-sm text-slate-400 border-t border-slate-100 pt-2">
                            <span>@Sara_PCV was tagged</span>
                        </div>
                    </motion.div>

                    {/* Card 4: Laura */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#d20000] text-white flex items-center justify-center font-bold mr-3">L</div>
                            <div className="font-bold text-slate-800">Laura</div>
                        </div>
                        <p className="text-slate-700 mb-3">
                            Овој човек е досаден. Лаура не сака проблеми. Лаура клика „опции“ и го <b><u>блокира</u></b>.
                        </p>
                        <div className="flex justify-between text-sm text-slate-400 border-t border-slate-100 pt-2">
                            <span>🚫 User Blocked</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95 transition-all"
            >
                Continue
            </button>
        </div>
    );
};

export default TechVerbs;
