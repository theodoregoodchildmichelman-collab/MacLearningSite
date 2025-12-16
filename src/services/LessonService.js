
// Map of lesson IDs to their dynamic import functions
// This allows us to load the heavy JSON data only when requested
const lessonImports = {
    'lesson_01': () => import('../data/lesson_01.json'),
    'lesson_02': () => import('../data/lesson_02.json'),
    'lesson_03': () => import('../data/lesson_03.json'),
    'lesson_04': () => import('../data/lesson_04.json'),
    'lesson_05': () => import('../data/lesson_05.json'),
    'lesson_06': () => import('../data/lesson_06.json'),
    'lesson_07': () => import('../data/lesson_07.json'),
    'lesson_08': () => import('../data/lesson_08.json'),
    'lesson_09': () => import('../data/lesson_09.json'),
    'lesson_10': () => import('../data/lesson_10.json'),
    'lesson_11': () => import('../data/lesson_11.json'),
    'lesson_12': () => import('../data/lesson_12.json'),
    'lesson_13': () => import('../data/lesson_13.json'),
    'lesson_14': () => import('../data/lesson_14.json'),
    'lesson_15': () => import('../data/lesson_15.json'),
    'lesson_16': () => import('../data/lesson_16.json'),
    'lesson_17': () => import('../data/lesson_17.json'),
    'lesson_18': () => import('../data/lesson_18.json'),
    'lesson_19': () => import('../data/lesson_19.json'),
    'lesson_20': () => import('../data/lesson_20.json'),
    'lesson_21': () => import('../data/lesson_21.json'),
    'lesson_22': () => import('../data/lesson_22.json'),
    'lesson_23': () => import('../data/lesson_23.json'),
    'lesson_24': () => import('../data/lesson_24.json'),
    'lesson_25': () => import('../data/lesson_25.json'),
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
            return data.lessonModule || data;
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
