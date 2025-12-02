import { describe, it, expect } from 'vitest';
import { calculateSM2 } from './srs';

describe('calculateSM2', () => {
    it('should return interval 1 and repetition 1 for the first successful recall', () => {
        const result = calculateSM2(0, 0, 2.5, 5);
        expect(result).toEqual({
            interval: 1,
            repetition: 1,
            ef: 2.6,
        });
    });

    it('should return interval 6 and repetition 2 for the second successful recall', () => {
        const result = calculateSM2(1, 1, 2.6, 5);
        expect(result).toEqual({
            interval: 6,
            repetition: 2,
            ef: 2.7,
        });
    });

    it('should calculate interval based on EF for subsequent successful recalls', () => {
        const result = calculateSM2(6, 2, 2.7, 5);
        // Interval = 6 * 2.7 = 16.2 -> 16
        expect(result).toEqual({
            interval: 16,
            repetition: 3,
            ef: 2.8,
        });
    });

    it('should reset interval and repetition on failure (grade < 3)', () => {
        const result = calculateSM2(16, 3, 2.8, 2);
        expect(result.interval).toBe(1);
        expect(result.repetition).toBe(0);
        // EF calculation: 2.8 + (0.1 - (5-2)*(0.08 + (5-2)*0.02))
        // 2.8 + (0.1 - 3 * (0.08 + 0.06))
        // 2.8 + (0.1 - 3 * 0.14)
        // 2.8 + (0.1 - 0.42)
        // 2.8 - 0.32 = 2.48
        expect(result.ef).toBe(2.48);
    });

    it('should not let EF drop below 1.3', () => {
        // Start with low EF and fail
        const result = calculateSM2(10, 5, 1.3, 0);
        expect(result.ef).toBe(1.3);
    });

    it('should handle grade 3 (pass with difficulty)', () => {
        // EF change: 0.1 - (5-3)*(0.08 + (5-3)*0.02)
        // 0.1 - 2 * (0.08 + 0.04)
        // 0.1 - 2 * 0.12 = 0.1 - 0.24 = -0.14
        // New EF = 2.5 - 0.14 = 2.36
        const result = calculateSM2(10, 2, 2.5, 3);
        expect(result.ef).toBe(2.36);
        expect(result.interval).toBe(Math.round(10 * 2.5));
    });

    it('should handle grade 4 (pass with hesitation)', () => {
        // EF change: 0.1 - (5-4)*(0.08 + (5-4)*0.02)
        // 0.1 - 1 * (0.08 + 0.02)
        // 0.1 - 0.1 = 0
        // New EF should remain same
        const result = calculateSM2(10, 2, 2.5, 4);
        expect(result.ef).toBe(2.5);
    });
});
