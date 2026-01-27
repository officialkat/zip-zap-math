import { shuffle } from "@helpers";
import {FlashMultiplyQuestion} from "@types";

const MAX_ATTEMPTS = 100;

/**
 * Generates wrong answer options for a multiplication problem
 * @param answer - The correct answer
 * @param timetable - The times table being used
 * @param maxTimetable - Maximum multiplier value
 * @param numOfOptions - Number of total options to generate
 * @returns Array of all options (including correct answer)
 */
const makeAnswers = (
    answer: number,
    timetable: number,
    maxTimetable: number,
    numOfOptions: number = 4
): number[] => {
    const answers = new Set<number>([answer]);
    let attempts = 0;

    while (answers.size < numOfOptions && attempts < MAX_ATTEMPTS) {
        const timesByNumber = Math.floor(Math.random() * (maxTimetable + 1));
        answers.add(timetable * timesByNumber);
        attempts++;
    }

    return Array.from(answers);
};

/**
 * Generates a flash multiplication question
 * @param timetables - Array of times tables to choose from (e.g., [1, 2, 5])
 * @param maxMultiplier - Maximum multiplier value (default: 12)
 * @returns Question object with problem numbers, answer, and shuffled options
 */
export const makeFlashMultiplyQuestion = (
    timetables: number[],
    maxMultiplier: number = 12
): FlashMultiplyQuestion => {
    const multiplier = Math.floor(Math.random() * (maxMultiplier + 1));
    const timetable = timetables[Math.floor(Math.random() * timetables.length)];

    const answer = multiplier * timetable;
    const allAnswers = makeAnswers(answer, timetable, maxMultiplier, 4);

    return {
        timetableQuestion: shuffle<number>([multiplier, timetable]),
        answer,
        options: shuffle<number>(allAnswers)
    };
};