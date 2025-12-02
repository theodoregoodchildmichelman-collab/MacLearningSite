/**
 * Calculates the new interval and easiness factor using the SuperMemo-2 algorithm.
 *
 * @param currentInterval - The current interval in days.
 * @param repetitionNumber - The number of times the item has been successfully recalled.
 * @param easinessFactor - The current easiness factor (minimum 1.3).
 * @param grade - The quality of the response (0-5).
 *                5 - perfect response
 *                4 - correct response after a hesitation
 *                3 - correct response recalled with serious difficulty
 *                2 - incorrect response; where the correct one seemed easy to recall
 *                1 - incorrect response; the correct one remembered
 *                0 - complete blackout.
 * @returns An object containing the new interval, repetition number, and easiness factor.
 */
export interface SM2Result {
    interval: number;
    repetition: number;
    ef: number;
}

export function calculateSM2(
    currentInterval: number,
    repetitionNumber: number,
    easinessFactor: number,
    grade: number
): SM2Result {
    let newInterval: number;
    let newRepetition: number;
    let newEf: number;

    if (grade >= 3) {
        if (repetitionNumber === 0) {
            newInterval = 1;
            newRepetition = 1;
        } else if (repetitionNumber === 1) {
            newInterval = 6;
            newRepetition = 2;
        } else {
            newInterval = Math.round(currentInterval * easinessFactor);
            newRepetition = repetitionNumber + 1;
        }
    } else {
        newInterval = 1;
        newRepetition = 0;
    }

    newEf = easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (newEf < 1.3) {
        newEf = 1.3;
    }

    return {
        interval: newInterval,
        repetition: newRepetition,
        ef: parseFloat(newEf.toFixed(2)), // Round to 2 decimal places for consistency
    };
}
