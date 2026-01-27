import AsyncStorage from "@react-native-async-storage/async-storage";

import {Game, ProblemType} from "@enums";
import {GameStats, Stats, TableNumber} from "@types";

const STATS_KEY = "game_stats";

export const DEFAULT_GAME_STATS: GameStats = {
    highestStreak: 0,
    highestStreakCountdown: 0,
    highestStreakStopwatch: 0,
    highestStopwatchTimeSeconds: 0
};

export const getAllGameStats = async (): Promise<Stats | null> => {
    try {
        const json = await AsyncStorage.getItem(STATS_KEY);
        return json ? (JSON.parse(json) as Stats) : null;
    } catch (e) {
        console.error("Error getting all stats:", e);
        return null
    }
};

export const getOneGameStat = async (
    game: Game,
    tableNumber: TableNumber,
    problemType: ProblemType
): Promise<GameStats> => {
    try {
        const all = await getAllGameStats() || {} as Stats;
        return all?.[game]?.[tableNumber]?.[problemType] ?? DEFAULT_GAME_STATS;
    } catch (e) {
        console.error("Error getting one stat:", e);
        return DEFAULT_GAME_STATS;
    }
};

export const saveGameStat = async (
    game: Game,
    tableNumber: TableNumber,
    problemType: ProblemType,
    next: Partial<GameStats> | GameStats
): Promise<void> => {
    try {
        const all = await getAllGameStats() || {} as Stats;

        const current: GameStats =
            all?.[game]?.[tableNumber]?.[problemType] ?? DEFAULT_GAME_STATS;

        const merged: GameStats = { ...current, ...next };

        const updated: Stats = {
            ...all,
            [game]: {
                ...(all[game] ?? ({} as Stats[Game])),
                [tableNumber]: {
                    ...(all[game]?.[tableNumber] ?? ({} as Stats[Game][TableNumber])),
                    [problemType]: merged,
                },
            },
        };

        await AsyncStorage.setItem(STATS_KEY, JSON.stringify(updated));
    } catch (e) {
        console.error("Error saving stat:", e);
    }
};

export const resetAllStats = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(STATS_KEY);
    } catch (e) {
        console.error("Error resetting all stats:", e);
    }
};
