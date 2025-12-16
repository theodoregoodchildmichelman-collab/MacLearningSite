import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Dialogue Component ---
export const DialogueBlock = ({ lines }) => {
    return (
        <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500 shadow-sm my-8">
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Dialogue</h3>
            <div className="space-y-4">
                {lines.map((line, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-4 group">
                        <div className="w-16 font-bold text-gray-400 text-sm pt-1 shrink-0">{line.speaker}</div>
                        <div className="flex-1">
                            <p className="text-lg text-gray-800 leading-snug font-medium whitespace-pre-line">{line.mk}</p>
                            <p className="text-sm text-gray-500 mt-1 italic group-hover:block transition-all">{line.en}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Vocabulary List ---
export const VocabList = ({ items }) => {
    return (
        <div className="my-8">
            <h3 className="text-center text-xl font-serif font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">Vocabulary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                        <div>
                            <div className="text-lg font-bold text-indigo-700">{item.word_mk}</div>
                            <div className="text-sm text-gray-500">{item.word_en}</div>
                        </div>
                        <div className="text-xs font-mono text-gray-400 bg-gray-200 px-2 py-1 rounded">{item.gender}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Grammar Table ---
export const GrammarTable = ({ data }) => {
    return (
        <div className="my-10 bg-yellow-50/50 p-6 rounded-xl border border-yellow-100">
            <h3 className="text-lg font-bold text-amber-800 mb-2">{data.topic}</h3>
            <p className="text-amber-700/80 mb-6 text-sm">{data.explanation}</p>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-amber-200 text-amber-900/60 text-xs uppercase tracking-wider">
                            <th className="py-2 px-4">Pronoun</th>
                            <th className="py-2 px-4">Verb</th>
                            <th className="py-2 px-4">Question Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.table.map((row, idx) => (
                            <tr key={idx} className="border-b border-amber-100 last:border-0 hover:bg-yellow-50">
                                <td className="py-3 px-4 font-medium text-gray-800">{row.pronoun}</td>
                                <td className="py-3 px-4 text-gray-600">{row.verb}</td>
                                <td className="py-3 px-4 font-bold text-amber-700">{row.question}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Matching Exercise ---
export const MatchingExercise = ({ data }) => {
    // Simplified static view for now, could be made interactive later
    return (
        <div className="my-8 p-6 border border-dashed border-gray-300 rounded-lg">
            <h3 className="text-center font-bold text-gray-700 mb-6 uppercase text-sm tracking-wide">Exercise: {data.instruction}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm md:text-base">
                <div className="space-y-4">
                    <div className="font-bold text-gray-400 text-xs uppercase mb-2">Name</div>
                    {data.columns.names.map(x => <div key={x} className="p-2 bg-white shadow-sm rounded border border-gray-100 cursor-help hover:border-blue-300 transition-colors">{x}</div>)}
                </div>
                <div className="space-y-4">
                    <div className="font-bold text-gray-400 text-xs uppercase mb-2">Location</div>
                    {data.columns.locations.map(x => <div key={x} className="p-2 bg-white shadow-sm rounded border border-gray-100 cursor-help hover:border-blue-300 transition-colors">{x}</div>)}
                </div>
                <div className="space-y-4">
                    <div className="font-bold text-gray-400 text-xs uppercase mb-2">Profession</div>
                    {data.columns.professions.map(x => <div key={x} className="p-2 bg-white shadow-sm rounded border border-gray-100 cursor-help hover:border-blue-300 transition-colors">{x}</div>)}
                </div>
            </div>
            <div className="text-center mt-6 text-xs text-gray-400 italic">
                Tip: Mentally connect the items or discuss with a partner.
            </div>
        </div>
    );
};

// --- Fill Blank Exercise ---
export const FillBlankExercise = ({ data }) => {
    return (
        <div className="my-8 space-y-4 font-mono text-sm md:text-base bg-gray-50 p-6 rounded-lg">
            <div className="font-sans font-bold text-gray-600 mb-4">{data.instruction}</div>
            {data.lines.map((line, idx) => (
                <div key={idx} className="flex gap-4">
                    <span className="font-bold text-blue-400 w-4 block text-right shrink-0">{line.speaker}:</span>
                    <span className="text-gray-800">{line.text}</span>
                </div>
            ))}
        </div>
    );
};

// --- Basic List Exercise ---
export const ExerciseList = ({ data }) => {
    return (
        <div className="my-8 p-6 bg-green-50/50 rounded-lg border border-green-100">
            <div className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs">?</span>
                {data.instruction}
            </div>
            <ul className="space-y-2 list-disc pl-5 text-gray-700">
                {data.questions.map((q, idx) => (
                    <li key={idx} className="pl-2">{q}</li>
                ))}
            </ul>
        </div>
    )
}
