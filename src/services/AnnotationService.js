const STORAGE_KEY = 'maclang_annotations';

/**
 * @typedef {Object} Annotation
 * @property {string} id - Unique ID for the annotation
 * @property {number} start - Start index in the text
 * @property {number} end - End index in the text
 * @property {'highlight' | 'note'} type - Type of annotation
 * @property {string} [text] - Content for notes
 * @property {string} [color] - Color for highlights (default: yellow)
 * @property {number} timestamp - Creation timestamp
 */

class AnnotationService {
    constructor() {
        this.cache = null;
    }

    _load() {
        if (this.cache) return this.cache;
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            this.cache = data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('Failed to load annotations:', e);
            this.cache = {};
        }
        return this.cache;
    }

    _save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
        } catch (e) {
            console.error('Failed to save annotations:', e);
        }
    }

    /**
     * Get annotations for a specific content block
     * @param {string} contentId 
     * @returns {Annotation[]}
     */
    getAnnotations(contentId) {
        const all = this._load();
        return all[contentId] || [];
    }

    /**
     * Add a new annotation
     * @param {string} contentId 
     * @param {Omit<Annotation, 'id' | 'timestamp'>} annotation 
     * @returns {Annotation} The created annotation
     */
    addAnnotation(contentId, annotation) {
        const all = this._load();
        if (!all[contentId]) {
            all[contentId] = [];
        }

        const newAnnotation = {
            ...annotation,
            id: crypto.randomUUID(),
            timestamp: Date.now()
        };

        // Merge overlapping highlights if same type/color? 
        // For simplicity, we'll just allow overlaps or handle rendering logic to merge them.
        // Actually, preventing complex overlaps at save time is better, but harder.
        // Let's just save for now.

        all[contentId].push(newAnnotation);
        this.cache = all;
        this._save();
        return newAnnotation;
    }

    /**
     * Remove an annotation
     * @param {string} contentId 
     * @param {string} annotationId 
     */
    removeAnnotation(contentId, annotationId) {
        const all = this._load();
        if (all[contentId]) {
            all[contentId] = all[contentId].filter(a => a.id !== annotationId);
            if (all[contentId].length === 0) {
                delete all[contentId];
            }
            this.cache = all;
            this._save();
        }
    }

    /**
     * Clear all annotations (debug/reset)
     */
    clearAll() {
        this.cache = {};
        localStorage.removeItem(STORAGE_KEY);
    }
}

export const annotationService = new AnnotationService();
