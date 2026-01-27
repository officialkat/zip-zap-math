import { shuffle } from "@helpers";

const EXTRA_MULTIPLE_RANGE = 6;      // how much extra range to pick other multiples from
const CLOSE_OFFSET_MAX = 9;          // wrong answers can be +/- 1..9 away from the real answer
const MULTIPLE_CHANCE = 0.5;         // 50% chance a wrong option is another multiple
const SUBTRACT_CHANCE = 0.5;         // 50% chance we try subtracting (if it won't go negative)

/**
 * Generates a times table question with multiple choice options
 * @param tableNumber - The times table number (e.g., 5 for the 5 times table)
 * @param index - The current index/position in the table (0-based)
 * @param numOfOptions - Number of answer options to generate
 * @returns Object with answer and shuffled options array
 */
export const makeTimesTableOptions = (
    tableNumber: number,
    index: number,
    numOfOptions: number,
) => {
    const multiplier = index + 1; // start at 1, not 0
    const answer = tableNumber * multiplier;
    const set = new Set<number>([answer]);

    while (set.size < numOfOptions) {
        const makeMultiple = Math.random() < MULTIPLE_CHANCE;
        let candidate: number;

        if (makeMultiple) {
            // Generate another multiple from the same table
            const maxRandomIndex = numOfOptions + EXTRA_MULTIPLE_RANGE;
            let randomMultiplier = Math.floor(Math.random() * maxRandomIndex);

            if (randomMultiplier === multiplier) randomMultiplier += 1; // avoid the real answer
            candidate = tableNumber * randomMultiplier;
        } else {
            // Generate a close wrong answer (off by a few)
            const offset = Math.floor(Math.random() * CLOSE_OFFSET_MAX) + 1; // 1..CLOSE_OFFSET_MAX
            const subtract = Math.random() < SUBTRACT_CHANCE && answer >= offset; // no negatives
            candidate = answer + (subtract ? -offset : offset);
        }

        if (candidate !== answer) set.add(candidate);
    }

    return { answer, options: shuffle([...set]) };
};