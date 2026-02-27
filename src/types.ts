import {ClockMode, Game, ProblemType} from "@enums";

export type SelectOption = {
    key: string;
    label: string;
    value: any;
};

export type RadioGroupOption = {
    label: string;
    value: any;
};

export type GameStats = {
    highestStreak: number;            // no clock
    highestStreakCountdown: number;   // countdown
    highestStreakStopwatch: number;   // stopwatch
    highestStopwatchTimeSeconds: number;
};

export type TableNumber = `${number}`;

export type Stats<P extends string = ProblemType> = Record<
    Game,
    Record<TableNumber, Record<P, GameStats>>
>;

export type GameConfig = {
    clockMode: ClockMode;
    problemType: ProblemType;
}

export type AdditionRouteConfig = GameConfig & {
    addends: string;
    maxAddend: string;
}

export type AdditionConfig = GameConfig & {
    addends: number[];
    maxAddend: number;
}

export type FlashMultiplyRouteConfig = GameConfig & {
    timetables: string;
    maxMultiplier: string;
}

export type FlashMultiplyConfig = GameConfig & {
    timetables: number[];
    maxMultiplier: number;
}

export type WakoTableGameConfig = GameConfig & {
    tableNumber: number;
}

export type WakoTableGameRouteConfig = GameConfig & {
    tableNumber: string;
}

export type StreakMode = "timed" | "untimed";

export type FlashMultiplyGameStats = Record<ProblemType, GameStats>;
export type FlashMultiplyQuestion = {
    answer: number
    options: number[]
    timetableQuestion: number[]
}

export type AdditionQuestion = {
    answer: number;
    options: number[];
    additionQuestion: number[];
}

export type ScoreStats = {
    points: number;
    highestStreak: number;
    isNewHighScore: boolean;
}
export type GameOverReason = 'wrong_answer' | 'time_up';

export type GameOverSummary = {
    reason: GameOverReason;
    problem: string | undefined;
    correctAnswer: number;
    userAnswer: number | null;
}