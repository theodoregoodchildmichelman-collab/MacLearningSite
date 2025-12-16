import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Shuffle, RefreshCcw } from 'lucide-react';

export default function DragAndDropMatching({ items = [] }) {
    // items expected to be array of { id, term, definition }
    // We'll prepare the game state on mount or when items change

    const [terms, setTerms] = useState([]);
    const [definitions, setDefinitions] = useState([]);
    const [matches, setMatches] = useState({}); // definitionId -> termId
    const [feedback, setFeedback] = useState({}); // definitionId -> 'correct' | 'incorrect'
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        initializeGame();
    }, [items]);

    const initializeGame = () => {
        // Create internal IDs if not present and shuffle terms
        const gameItems = items.map((item, idx) => ({
            id: item.id || `item-${idx}`,
            term: item.term,
            definition: item.definition
        }));

        const shuffled = [...gameItems].sort(() => Math.random() - 0.5);

        setTerms(shuffled);
        setDefinitions(gameItems); // Definitions stay in order or could be shuffled too
        setMatches({});
        setFeedback({});
        setIsComplete(false);
    };

    const handleDragEnd = (termId, info) => {
        // We'll use a simple proximity check or hit testing if possible.
        // However, in React with Framer Motion, we often check if the point 
        // is within the bounds of a drop zone.

        // Since we don't have easy access to drop zone refs here centrally without context or refs,
        // we'll rely on the visual snap logic.
        // ACTUALLY, simpler approach:
        // We can't easily detect "drop" on another element without refs.
        // Let's assume the user drags "Term" to "Definition".

        // This is a basic implementation. For a robust one, we'd check coordinates.
        // But for this demo, let's try a different UI pattern or accept that we need to hit-test.

        // Alternative: Use a "Click to Select, Click to Place" model if Drag is too complex without dnd-kit.
        // BUT the prompt explicitly asked for Drag and Drop.

        // Let's use simple coordinate checking.
        // We will query the DOM for drop zones on drag end.
    };

    // To make this work robustly without a heavyweight DND library, we'll use hit-testing logic
    // on drag end.
    const checkDrop = (event, info, term) => {
        const dropZones = document.querySelectorAll('[data-drop-zone]');
        const { point } = info;

        let droppedZoneId = null;

        dropZones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            if (
                point.x >= rect.left &&
                point.x <= rect.right &&
                point.y >= rect.top &&
                point.y <= rect.bottom
            ) {
                droppedZoneId = zone.getAttribute('data-id');
            }
        });

        if (droppedZoneId) {
            handleMatch(term.id, droppedZoneId);
        }
    };

    const handleMatch = (termId, definitionId) => {
        // Check if correct
        const term = terms.find(t => t.id === termId);

        // Logic: Is this term the correct pair for this definition?
        // In our data structure, term.id matches definition.id if they come from same source item
        const isCorrect = term.id === definitionId;

        setMatches(prev => ({
            ...prev,
            [definitionId]: term
        }));

        setFeedback(prev => ({
            ...prev,
            [definitionId]: isCorrect ? 'correct' : 'incorrect'
        }));

        // Use a timeout to reset incorrect matches if we want them to snap back
        if (!isCorrect) {
            setTimeout(() => {
                setMatches(prev => {
                    const next = { ...prev };
                    if (next[definitionId] && next[definitionId].id === termId) {
                        delete next[definitionId];
                    }
                    return next;
                });
                setFeedback(prev => {
                    const next = { ...prev };
                    delete next[definitionId];
                    return next;
                });
            }, 1000);
        } else {
            // Check completion
            checkCompletion();
        }
    };

    const checkCompletion = () => {
        // We verify in next render usually, but can check here
        // If all definitions have a correct match
        // Note: state updates are async, so this might be one step behind if called directly.
        // Better to use useEffect.
    };

    useEffect(() => {
        if (items.length > 0 && Object.keys(matches).length === items.length) {
            const allCorrect = Object.entries(feedback).every(([_, status]) => status === 'correct');
            if (allCorrect) setIsComplete(true);
        }
    }, [matches, feedback, items.length]);

    return (
        <div className="bg-slate-50 rounded-3xl p-6 md:p-8 shadow-inner border border-slate-100 my-12">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Vocabulary Match</h3>
                <p className="text-slate-500">Drag the Macedonian words to their English meanings</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative">

                {/* Left Column: Terms */}
                <div className="space-y-3">
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs mb-4">Terms</h4>
                    <div className="min-h-[300px]">
                        {terms.map((item) => {
                            // If this term is already matched successfully, hide it from the list
                            const isMatched = Object.values(matches).some(m => m.id === item.id && feedback[item.id] === 'correct'); // wait, feedback is keyed by defId=itemId
                            // Actually matches is keyed by definitionId.
                            // We need to find if this item.id is present in matches values.
                            const matchedDefId = Object.keys(matches).find(key => matches[key].id === item.id);

                            if (matchedDefId) return null; // Don't render draggable if matched

                            return (
                                <DraggableItem
                                    key={item.id}
                                    item={item}
                                    onDragEnd={(e, info) => checkDrop(e, info, item)}
                                />
                            );
                        })}
                        {terms.every(t => Object.values(matches).find(m => m.id === t.id)) && (
                            <div className="text-center p-8 text-slate-400 italic">
                                All terms placed!
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Definitions (Drop Zones) */}
                <div className="space-y-3">
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs mb-4">Definitions</h4>
                    {definitions.map((def) => (
                        <DropZone
                            key={def.id}
                            def={def}
                            match={matches[def.id]}
                            status={feedback[def.id]}
                        />
                    ))}
                </div>

            </div>

            {/* Completion Celebration Overlay */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl"
                    >
                        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl border-4 border-green-100 transform rotate-2">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check size={40} strokeWidth={3} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 mb-2">Excellent!</h2>
                            <p className="text-slate-600 mb-6">You matched all the words correctly.</p>
                            <button
                                onClick={initializeGame}
                                className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors mx-auto"
                            >
                                <RefreshCcw size={18} />
                                Play Again
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

function DraggableItem({ item, onDragEnd }) {
    return (
        <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // We want it to snap back if not dropped
            dragElastic={0.2} // Little bit of elastic movement
            dragMomentum={false}
            dragSnapToOrigin={true} // Always snap back
            onDragEnd={onDragEnd}
            whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
            whileHover={{ scale: 1.02, cursor: 'grab' }}
            className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-800 font-bold mb-3 touch-none select-none relative z-10"
        >
            {item.term}
        </motion.div>
    );
}

function DropZone({ def, match, status }) {
    // status can be 'correct', 'incorrect'

    let borderClass = 'border-slate-200 border-dashed';
    let bgClass = 'bg-slate-50/50';

    if (status === 'correct') {
        borderClass = 'border-green-500 border-2 bg-green-50';
    } else if (status === 'incorrect') {
        borderClass = 'border-red-500 border-2 bg-red-50';
    } else if (match) {
        borderClass = 'border-blue-300';
    }

    return (
        <div
            data-drop-zone="true"
            data-id={def.id}
            className={`relative min-h-[64px] rounded-xl border-2 transition-colors duration-300 flex items-center justify-between p-4 ${borderClass} ${bgClass}`}
        >
            <span className="text-slate-600 font-medium z-0">{def.definition}</span>

            {/* Render matched item in the slot if present */}
            <AnimatePresence>
                {match && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`absolute inset-0 m-0.5 rounded-lg flex items-center justify-center font-bold shadow-sm z-10
                            ${status === 'correct' ? 'bg-green-100 text-green-800' :
                                status === 'incorrect' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}
                        `}
                    >
                        {match.term}
                        {status === 'correct' && <Check size={16} className="ml-2" />}
                        {status === 'incorrect' && <X size={16} className="ml-2" />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
