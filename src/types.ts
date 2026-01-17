import {FlashMultiplyGameType} from "@enums";


export type GameStats = {
    highest_streak: number;
    highest_streak_timed: number;
}

export type FlashMultiplyGameStats = Record<FlashMultiplyGameType, GameStats>;
