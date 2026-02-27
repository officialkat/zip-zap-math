import {ClockMode} from "@enums";
import {GameStats} from "@types";

export const shuffle = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const getHighestStreakKey = (clockMode: ClockMode): keyof GameStats => {
    if (clockMode === ClockMode.COUNTDOWN) return "highestStreakCountdown";
    if (clockMode === ClockMode.STOPWATCH) return "highestStreakStopwatch";
    return "highestStreak";
};

export const clampNumber = (max: number, onChange: (text: string) => void) => (text: string) => {
    const num = Number(text);
    if (isNaN(num)) return;
    if (num > max) return;
    onChange(text);
};