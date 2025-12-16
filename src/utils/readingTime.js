/**
 * Calculates the reading time for a given text based on 200 words per minute.
 * @param {string|string[]} text - The text to calculate time for. Can be a string or an array of strings.
 * @returns {string|null} - Formatted string (e.g., "1 min read") or null if negligible.
 */
export function calculateReadingTime(text) {
    if (!text) return null;

    let contentString = "";

    if (Array.isArray(text)) {
        contentString = text.join(" ");
    } else if (typeof text === 'string') {
        contentString = text;
    } else {
        return null;
    }

    // Remove extra whitespace and split
    const wordCount = contentString.trim().split(/\s+/).length;

    if (wordCount < 10) return null; // Don't show for very short texts like titles alone

    const minutes = Math.ceil(wordCount / 200);

    // For very short content that is still meaningful (10-200 words), show "1 min read"
    // The requirement says "X min read" badge.

    return `${minutes} min read`;
}
