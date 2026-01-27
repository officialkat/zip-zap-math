import { useEffect, useState } from "react";
import type { GameStats, TableNumber } from "@types";
import { Game, ProblemType, ClockMode } from "@enums";
import { DEFAULT_GAME_STATS, getOneGameStat, saveGameStat } from "@database";

const keyForClockMode = (clockMode: ClockMode): keyof GameStats => {
    if (clockMode === ClockMode.COUNTDOWN) return "highestStreakCountdown";
    if (clockMode === ClockMode.STOPWATCH) return "highestStreakStopwatch";
    return "highestStreak";
};

export const useGameStats = (
    game: Game,
    tableNumber: number|string,
    problemType: ProblemType
) => {
    const [stats, setStats] = useState<GameStats>(DEFAULT_GAME_STATS);
    const tableKey = `${tableNumber}` as TableNumber;

    useEffect(() => {
        getOneGameStat(game, tableKey, problemType).then(setStats);
    }, [game, tableKey, problemType]);


    const saveStats = async (next: Partial<GameStats> | GameStats) => {
        setStats((prev) => ({ ...prev, ...next }));
        await saveGameStat(game, tableKey, problemType, next);
    };

    const saveHighestStreak = async (clockMode: ClockMode, nextValue: number) => {
        const key = keyForClockMode(clockMode);
        const currentBest = stats[key];

        if (nextValue <= currentBest) return;

        await saveStats({ [key]: nextValue } as Partial<GameStats>);
    };

    const getHighestStreak = (clockMode: ClockMode) => {
        const key = keyForClockMode(clockMode);
        return stats[key];
    };

    const saveHeighestStopwatchTime = async (timeSeconds: number) => {
        const current = stats.highestStopwatchTimeSeconds;
        const isHighest = current > 0;

        if (timeSeconds <= 0) return;
        if (isHighest && timeSeconds >= current) return;

        await saveStats({ highestStopwatchTimeSeconds: timeSeconds });
    };

    return { stats, saveStats, getHighestStreak, saveHighestStreak, saveHighestStopwatchTime: saveHeighestStopwatchTime };
};
