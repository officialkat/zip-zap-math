import {FlashMultiplyGameType} from "@/enum";

export type GameStats = {
    highest_streak: number
}

export type FlashMultiplyGameStats = Record<FlashMultiplyGameType, GameStats>;
