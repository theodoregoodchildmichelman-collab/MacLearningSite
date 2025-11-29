
// Map of lesson IDs to their dynamic import functions
// This allows us to load the heavy JSON data only when requested
const lessonImports = {
    'lesson_26': () => import('../data/lesson26.json')
};

// Static list of lessons metadata
// This avoids loading all JSON files just to display the list of available lessons
const lessonsList = [
    {
        id: 'lesson_26',
        title: 'Chapter 26: Technology',
        subtitle: 'Во светот на интернетот',
        proficiencyLevel: 'Intermediate',
        theme: 'Modern Technology & Youth Slang'
    }
];

export const LessonService = {
    /**
     * Fetch the list of all lessons.
     * Currently returns a static list, but could fetch from an API or manifest in the future.
     * @returns {Promise<Array>} List of lesson summary objects
     */
    fetchAllLessons: async () => {
        // Simulate async fetch
        return Promise.resolve(lessonsList);
    },

    /**
     * Fetch a specific lesson by ID.
     * Uses dynamic import to load the JSON data on demand.
     * @param {string} id - The lesson ID
     * @returns {Promise<Object>} The full lesson object
     */
    fetchLessonById: async (id) => {
        const importFn = lessonImports[id];
        if (!importFn) {
            throw new Error(`Lesson with ID ${id} not found`);
        }

        try {
            const module = await importFn();
            // In Vite/ESM, the JSON content is usually the default export
            // The JSON file structure has a root "lessonModule" property
            const data = module.default || module;
            return data.lessonModule;
        } catch (error) {
            console.error(`Error loading lesson ${id}:`, error);
            throw error;
        }
    },

    /**
     * (Future) Sync user progress to Supabase.
     * For now, this is a placeholder.
     * @param {string} userId
     * @param {string} lessonId
     * @param {Object} progressData
     */
    syncProgress: async (userId, lessonId, progressData) => {
        console.warn('Sync to Supabase not implemented yet');
        // TODO: Implement Supabase sync
        return Promise.resolve();
    }
};
