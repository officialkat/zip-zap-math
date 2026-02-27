import { shuffle } from "@helpers";
import { AdditionQuestion } from "@types";

const MAX_ATTEMPTS = 100;

/**
 * Generates wrong answer options for an addition problem
 * @param answer - The correct answer
 * @param numOfOptions - Number of total options to generate
 * @returns Array of all options (including correct answer)
 */
const makeAdditionAnswers = (
    answer: number,
    numOfOptions: number = 4
): number[] => {
    const answers = new Set<number>([answer]);
    let attempts = 0;

    while (answers.size < numOfOptions && attempts < MAX_ATTEMPTS) {
        const offset = Math.floor(Math.random() * 5) + 1;
        const wrong = Math.random() < 0.5 ? answer + offset : answer - offset;
        if (wrong > 0) answers.add(wrong);
        attempts++;
    }

    return Array.from(answers);
};

/**
 * Generates an addition question
 * @param addends - Array of addends to choose from (e.g., [1, 2, 5])
 * @param maxAddend - Maximum addend value (default: 12)
 * @returns Question object with problem numbers, answer, and shuffled options
 */
export const makeAdditionQuestion = (
    addends: number[],
    maxAddend: number = 12
): AdditionQuestion => {
    const addend1 = addends[Math.floor(Math.random() * addends.length)];
    const addend2 = Math.floor(Math.random() * (maxAddend + 1));

    const answer = addend1 + addend2;
    const allAnswers = makeAdditionAnswers(answer, 4);

    return {
        additionQuestion: shuffle<number>([addend1, addend2]),
        answer,
        options: shuffle<number>(allAnswers)
    };
};