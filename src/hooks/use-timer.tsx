import {useCallback, useEffect, useRef, useState} from "react";
import {TimerMode} from "@enums";

export const useTimer = (mode: TimerMode, minutes: number, seconds: number) => {
    const initial = mode === TimerMode.STOPWATCH ? 0 : minutes * 60 + seconds;

    const [timeSeconds, setTimeSeconds] = useState(initial);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = useCallback(() => setIsRunning(true), []);

    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setTimeSeconds(initial);
    }, [initial]);

    useEffect(() => {
        if (!isRunning) return;

        // safety: clear before creating a new one
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setTimeSeconds((prev) => {
                if (mode === TimerMode.STOPWATCH) return prev + 1;
                return Math.max(0, prev - 1);
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, [isRunning, mode]);

    const mm = Math.floor(timeSeconds / 60);
    const ss = timeSeconds % 60;

    return { timeSeconds, minutes: mm, seconds: ss, isRunning, startTimer, resetTimer };
};
