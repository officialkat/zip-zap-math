import { useState, useEffect, useCallback } from 'react';
import { ClockMode, Game, ProblemType, TimerMode } from '@enums';
import { useTimer } from '@hooks/use-timer';
import { useGameStats } from '@hooks/use-game-stats';
import {GameOverReason, GameOverSummary, ScoreStats} from "@types";

interface Question {
    answer: number;
    [key: string]: any; // Allow additional game-specific data
}

interface UseGameLogicConfig<T extends Question> {
    game: Game;
    problemType: ProblemType;
    clockMode: ClockMode;
    tableNumber: number | string;
    generateQuestion: (index: number) => T;
    onCorrectAnswer?: (answer: number) => void;
    onIncorrectAnswer?: () => void;
    onReset?: () => void;
}

interface UseGameLogicReturn<T extends Question> {
    // Game state
    scoreStats: ScoreStats;
    gameOverSummary: GameOverSummary | null;
    gameOver: boolean;
    question: T | null;

    // Timer state
    minutes: number;
    seconds: number;
    timeSeconds: number;
    isRunning: boolean;
    isTimed: boolean;

    // Answer handling for multiple choice
    handleMultipleChoiceAnswer: (chosenAnswer: number) => void;

    // Answer handling for typing
    typedAnswer: string;
    handleTypedAnswerChange: (text: string) => void;

    // Game controls
    resetGame: () => void;

    questionIndex: number;
}

export const useGameLogic = <T extends Question>({
                                                     game,
                                                     problemType,
                                                     clockMode,
                                                     tableNumber,
                                                     generateQuestion,
                                                     onCorrectAnswer,
                                                     onIncorrectAnswer,
                                                     onReset,
                                                 }: UseGameLogicConfig<T>): UseGameLogicReturn<T> => {
    const timerMode = clockMode === ClockMode.COUNTDOWN ? TimerMode.COUNTDOWN : TimerMode.STOPWATCH;
    const isTimed = clockMode !== ClockMode.NONE;

    const { startTimer, resetTimer, minutes, seconds, timeSeconds, isRunning } = useTimer(
        timerMode,
        0,
        30
    );

    const { getHighestStreak, saveHighestStreak, saveHighestStopwatchTime } = useGameStats(
        game,
        tableNumber,
        problemType
    );

    const [points, setPoints] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [question, setQuestion] = useState<T | null>(null);
    const [typedAnswer, setTypedAnswer] = useState<string>("");
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);
    const [gameOverSummary, setGameOverSummary] = useState<GameOverSummary | null>(null);

    const highestStreak = getHighestStreak(clockMode);

    // Check if answer is correct
    const checkAnswer = useCallback(
        (correctAnswer: number, chosenAnswer: number): boolean => {
            return correctAnswer === chosenAnswer;
        },
        []
    );

    // Check if typed answer is correct so far (for progressive validation)
    const isCorrectSoFar = useCallback(
        (correctAnswer: number, inputText: string): boolean => {
            const typed = String(inputText).trim();
            const ans = String(correctAnswer);
            return ans.startsWith(typed);
        },
        []
    );

    // Generate new question
    const loadNextQuestion = useCallback(() => {
        setQuestionIndex((currentIndex) => {
            const newQuestion = generateQuestion(currentIndex);
            setQuestion(newQuestion);
            setTypedAnswer("");
            return currentIndex + 1;
        });
    }, [generateQuestion]);

    // Handle game over logic
    const handleGameOver = useCallback((reason: GameOverReason, userAnswer?: number) => {
        const isNewRecord = highestStreak < points;
        setIsNewHighScore(isNewRecord); // Store the flag
        setGameOver(true);
        resetTimer();
        setQuestionIndex(0);
        if (question) {
            setGameOverSummary({
                reason,
                problem: `${question.timetableQuestion[0]} × ${question.timetableQuestion[1]}`,
                correctAnswer: question.answer,
                userAnswer: userAnswer ?? null,
            });
        }
        if (isNewRecord) {
            void saveHighestStreak(clockMode, points);
        }
        if (clockMode === ClockMode.STOPWATCH) {
            void saveHighestStopwatchTime(timeSeconds);
        }

        onIncorrectAnswer?.();
    }, [clockMode, points, highestStreak, resetTimer, saveHighestStreak, saveHighestStopwatchTime, timeSeconds, onIncorrectAnswer,question]);


    // Handle correct/incorrect answer
    const handleAnswerResult = useCallback(
        (isCorrect: boolean, chosenAnswer: number) => {
            if (isCorrect) {
                setPoints((prev) => prev + 1);
                onCorrectAnswer?.(chosenAnswer);
                loadNextQuestion();
            } else {
                handleGameOver('wrong_answer', chosenAnswer);
            }
        },
        [handleGameOver, loadNextQuestion, onCorrectAnswer]
    );

    // Handle multiple choice answer
    const handleMultipleChoiceAnswer = useCallback(
        (chosenAnswer: number) => {
            if (!question) return;
            const isCorrect = checkAnswer(question.answer, chosenAnswer);
            handleAnswerResult(isCorrect, chosenAnswer);
        },
        [question, checkAnswer, handleAnswerResult]
    );

    // Handle typed answer change
    const handleTypedAnswerChange = useCallback(
        (text: string) => {
            if (!question) return;

            setTypedAnswer(text);

            const answerStr = String(question.answer);

            // Check if wrong so far - end game immediately
            if (!isCorrectSoFar(question.answer, text)) {
                handleAnswerResult(false, Number(text));
                return;
            }

            // Check if complete answer
            if (text.length === answerStr.length) {
                const isCorrect = checkAnswer(question.answer, Number(text));
                handleAnswerResult(isCorrect, Number(text));
            }
        },
        [question, isCorrectSoFar, checkAnswer, handleAnswerResult]
    );

    // Reset game to initial state
    const resetGame = useCallback(() => {
        setGameOver(false);
        setPoints(0);
        setTypedAnswer("");
        setQuestionIndex(0);
        onReset?.();
        loadNextQuestion();
        if (isTimed) {
            startTimer();
        }
    }, [isTimed, loadNextQuestion, startTimer, onReset]);

    // Initialize game on mount
    useEffect(() => {
        loadNextQuestion();
        if (isTimed) {
            startTimer();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle countdown timer expiration
    useEffect(() => {
        if (timerMode === TimerMode.COUNTDOWN && isRunning && timeSeconds === 0) {
            handleGameOver('time_up');
        }
    }, [timerMode, isRunning, timeSeconds, handleGameOver]);

    return {
        // Game state
        scoreStats: { points, highestStreak, isNewHighScore },
        gameOverSummary,
        gameOver,
        question,

        // Timer state
        minutes,
        seconds,
        timeSeconds,
        isRunning,
        isTimed,

        // Answer handling
        handleMultipleChoiceAnswer,
        typedAnswer,
        handleTypedAnswerChange,

        // Game controls
        resetGame,
        questionIndex
    };
};