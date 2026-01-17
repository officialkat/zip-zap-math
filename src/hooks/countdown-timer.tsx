import { useEffect, useState, useCallback } from "react";

export function useCountdown(minutes: number, seconds: number) {
    const totalSeconds = Math.max(0, minutes * 60 + seconds);
    const [timeLeft, setTimeLeft] = useState(totalSeconds);
    const [isRunning, setIsRunning] = useState(false);

    // Reset when inputs change
    useEffect(() => {
        setTimeLeft(totalSeconds);
    }, [totalSeconds]);

    // Countdown
    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const id = setInterval(() => {
            setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(id);
    }, [timeLeft, isRunning]);

    const start = useCallback(() => {
        setIsRunning(true);
    }, []);

    const reset = useCallback(() => {
        setTimeLeft(totalSeconds);
        setIsRunning(false);
    }, [totalSeconds]);

    const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const ss = String(timeLeft % 60).padStart(2, "0");

    return { timeLeft, minutes: mm, seconds: ss, isRunning, start, reset };
}