const API_KEY_STORAGE_KEY = 'gemini_api_key';

export const getApiKey = () => {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
};

export const saveApiKey = (key) => {
    if (key) {
        localStorage.setItem(API_KEY_STORAGE_KEY, key);
        return true;
    }
    return false;
};

export const callGemini = async (prompt) => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("No API Key");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini API Call Failed:", error);
        throw error;
    }
};
