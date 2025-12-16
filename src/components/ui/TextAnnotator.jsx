import React, { useState, useEffect, useRef, useCallback } from 'react';
import { annotationService } from '../../services/AnnotationService';
import { Highlighter, StickyNote, X, Check } from 'lucide-react';

/**
 * TextAnnotator Component
 * Wraps text content to provide highlighting and note-taking functionality.
 * 
 * @param {Object} props
 * @param {string} props.contentId - Unique ID for this text block for persistence
 * @param {string} props.text - The plain text content to render
 * @param {string} [props.className] - Optional container classes
 */
const TextAnnotator = ({ contentId, text, className = "" }) => {
    const [annotations, setAnnotations] = useState([]);
    const [selectionMenu, setSelectionMenu] = useState(null); // { x, y, selectionRange }
    const [activeNote, setActiveNote] = useState(null); // { id, x, y, text }
    const containerRef = useRef(null);

    // Load annotations on mount
    useEffect(() => {
        const load = () => {
            const data = annotationService.getAnnotations(contentId);
            // Sort by start index to make rendering easier
            setAnnotations(data.sort((a, b) => a.start - b.start));
        };
        load();

        // Listen for storage changes in other tabs/components if needed
        // For now, simple re-fetch or manual update is fine.
    }, [contentId]);

    // Handle text selection
    const handleMouseUp = useCallback(() => {
        const selection = window.getSelection();
        if (!selection.rangeCount || selection.isCollapsed) {
            setSelectionMenu(null);
            return;
        }

        const range = selection.getRangeAt(0);

        // Check if selection is inside our container
        if (!containerRef.current.contains(range.commonAncestorContainer)) {
            setSelectionMenu(null);
            return;
        }

        // Calculate start/end indices relative to the full text
        // This is tricky with rendered spans. We need a robust way to map DOM nodes back to text indices.
        // A simpler approach for V1:
        // Assume the container usually has one text node if unannotated, or multiple if annotated.
        // We'll traverse the container's text nodes to find the offset.

        const start = getGlobalOffset(containerRef.current, range.startContainer, range.startOffset);
        const end = getGlobalOffset(containerRef.current, range.endContainer, range.endOffset);

        if (start === -1 || end === -1) return;

        // Calculate menu position
        const rect = range.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        setSelectionMenu({
            x: rect.left + (rect.width / 2) - containerRect.left,
            y: rect.top - containerRect.top - 40, // position above
            start,
            end,
            rawText: text.substring(start, end)
        });

    }, [text]);

    const addHighlight = () => {
        if (!selectionMenu) return;
        const newAnn = annotationService.addAnnotation(contentId, {
            start: selectionMenu.start,
            end: selectionMenu.end,
            type: 'highlight',
            color: 'yellow',
            text: selectionMenu.rawText
        });

        // Update local state
        setAnnotations(prev => [...prev, newAnn].sort((a, b) => a.start - b.start));
        setSelectionMenu(null);
        window.getSelection().removeAllRanges();
    };

    const promptNote = () => {
        if (!selectionMenu) return;
        // Optimization: Create a temporary "pending" note or just show modal
        // For now, let's create the annotation immediately as a placeholder, then edit it?
        // Better: Open input UI first.
        setActiveNote({
            isNew: true,
            start: selectionMenu.start,
            end: selectionMenu.end,
            noteText: '',
            x: selectionMenu.x,
            y: selectionMenu.y + 50 // below
        });
        setSelectionMenu(null);
    };

    const saveNote = (noteText) => {
        if (!activeNote) return;

        const newAnn = annotationService.addAnnotation(contentId, {
            start: activeNote.start,
            end: activeNote.end,
            type: 'note',
            text: noteText
        });

        setAnnotations(prev => [...prev, newAnn].sort((a, b) => a.start - b.start));
        setActiveNote(null);
        window.getSelection().removeAllRanges();
    };

    const deleteAnnotation = (id) => {
        annotationService.removeAnnotation(contentId, id);
        setAnnotations(prev => prev.filter(a => a.id !== id));
        setActiveNote(null);
    }

    // Render logic: Split text into segments based on annotations
    const renderSegments = () => {
        let lastIndex = 0;
        const segments = [];

        // Flatten overlapping annotations for display?
        // Simple approach: Render assuming no complex overlaps for V1.
        // If an annotation starts before the last one ends, we might have issues.
        // Let's just handle non-overlapping for MVP reliability, or simple layering.

        annotations.forEach((ann) => {
            // Push unhighlighted text before this annotation
            if (ann.start > lastIndex) {
                segments.push(
                    <span key={`text-${lastIndex}`}>{text.substring(lastIndex, ann.start)}</span>
                );
            }

            // Push annotated text
            // Check bounds
            const effectiveEnd = Math.min(ann.end, text.length);
            if (ann.start < effectiveEnd) {
                segments.push(
                    <AnnotationSegment
                        key={ann.id}
                        annotation={ann}
                        content={text.substring(ann.start, effectiveEnd)}
                        onDelete={() => deleteAnnotation(ann.id)}
                        onViewNote={() => setActiveNote({ ...ann, x: 0, y: 0, viewOnly: true })}
                    />
                );
            }

            lastIndex = Math.max(lastIndex, effectiveEnd);
        });

        // Remaining text
        if (lastIndex < text.length) {
            segments.push(
                <span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>
            );
        }

        return segments;
    };

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            onMouseUp={handleMouseUp}
        >
            {renderSegments()}

            {/* Selection Popup */}
            {selectionMenu && (
                <div
                    className="absolute z-50 flex items-center gap-1 bg-slate-900 text-white p-1 rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-200"
                    style={{ left: selectionMenu.x, top: selectionMenu.y, transform: 'translateX(-50%)' }}
                >
                    <button
                        onClick={addHighlight}
                        className="p-2 hover:bg-slate-700 rounded transition-colors flex flex-col items-center gap-1 min-w-[60px]"
                    >
                        <Highlighter size={16} className="text-yellow-400" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Highlight</span>
                    </button>
                    <div className="w-px h-8 bg-slate-700 mx-1"></div>
                    <button
                        onClick={promptNote}
                        className="p-2 hover:bg-slate-700 rounded transition-colors flex flex-col items-center gap-1 min-w-[60px]"
                    >
                        <StickyNote size={16} className="text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Note</span>
                    </button>
                </div>
            )}

            {/* Note Input / View Dialog */}
            {activeNote && (
                <NoteDialog
                    note={activeNote}
                    onSave={saveNote}
                    onClose={() => setActiveNote(null)}
                    containerRef={containerRef}
                />
            )}
        </div>
    );
};

// Helper: Get offset relative to container
function getGlobalOffset(container, node, offset) {
    let globalOffset = 0;

    // Create a tree walker to traverse text nodes
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    let currentNode = walker.nextNode();

    while (currentNode) {
        if (currentNode === node) {
            return globalOffset + offset;
        }
        globalOffset += currentNode.length;
        currentNode = walker.nextNode();
    }

    return -1; // Not found
}

const AnnotationSegment = ({ annotation, content, onDelete, onViewNote }) => {
    const isNote = annotation.type === 'note';

    if (isNote) {
        return (
            <span
                className="border-b-2 border-blue-400 border-dashed bg-blue-50 cursor-pointer relative group"
                onClick={(e) => { e.stopPropagation(); onViewNote(); }}
            >
                {content}
                <StickyNote size={12} className="absolute -top-3 -right-2 text-blue-500 fill-blue-100" />
            </span>
        );
    }

    return (
        <span
            className="bg-yellow-200 cursor-pointer hover:bg-yellow-300 transition-colors relative group rounded-sm px-0.5 box-decoration-clone"
            onClick={(e) => {
                e.stopPropagation();
                // Optional: show menu to delete
                if (confirm('Remove highlight?')) onDelete();
            }}
        >
            {content}
        </span>
    );
};

const NoteDialog = ({ note, onSave, onClose, containerRef }) => {
    const [text, setText] = useState(note.noteText || (note.text || '')); // Handle unified prop

    // If view only
    if (note.viewOnly) return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <StickyNote className="text-blue-500" />
                        My Note
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap mb-6">{note.text}</p>
                <div className="text-xs text-slate-400">
                    {new Date(note.timestamp).toLocaleString()}
                </div>
            </div>
        </div>
    )

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
                <h3 className="font-bold text-slate-900 mb-4">Add Note</h3>
                <textarea
                    autoFocus
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-32 text-slate-800"
                    placeholder="Type your note here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                    <button
                        onClick={() => onSave(text)}
                        disabled={!text.trim()}
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Save Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextAnnotator;
