import {FlashMultiplyProblemType} from "@enums";

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
    highest_streak: number;
    highest_streak_timed: number;
}

export type FlashMultiplyConfig = {
    timetables: number[];
    maxMultiplier: number;
    problemType: FlashMultiplyProblemType;
    isTimed: boolean;
}

export type FlashMultiplyGameStats = Record<FlashMultiplyProblemType, GameStats>;
