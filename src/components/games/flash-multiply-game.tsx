import React, {useCallback} from "react";
import { StyleSheet, View } from "react-native";
import { ClockMode, Game, ProblemType } from "@enums";
import PointsDisplay from "@components/points-display";
import TimerDisplay from "@components/timer-display";
import ProblemDisplay from "@components/problem-display";
import GameOverDisplay from "@components/game-over-display";
import Button from "@components/ui/Button";
import { useGameLogic } from "@hooks/use-game-logic";
import GameMultipleChoice from "@components/game-multiple-choice";
import GameTypedInput from "@components/game-typed-input";
import {makeFlashMultiplyQuestion} from "@utils/flash-multiply-utils";
import {FlashMultiplyQuestion} from "@types";

const styles = StyleSheet.create({
    wrapper: {
        // backgroundColor:'pink',
        flex: 1,

    },
    header: {
        marginBottom: 30
    },
    problemContainer: {
        flex: 1,
        marginTop: 30
    }
});

interface FlashMultiplyGameProps {
    problemType: ProblemType;
    clockMode: ClockMode;
    timetables: number[];
    maxMultiplier: number;
}



const FlashMultiplyGame = ({
                               problemType,
                               clockMode,
                               timetables,
                               maxMultiplier
                           }: FlashMultiplyGameProps) => {
    // Generate question callback
    const generateQuestion = useCallback((): FlashMultiplyQuestion => {
        return makeFlashMultiplyQuestion(timetables, maxMultiplier);
    }, [timetables, maxMultiplier]);

    const tableNumber = timetables.join(',');

    const {
        scoreStats,
        gameOverSummary,
        gameOver,
        question,
        minutes,
        seconds,
        isTimed,
        handleMultipleChoiceAnswer,
        typedAnswer,
        handleTypedAnswerChange,
        resetGame,
        questionIndex,
    } = useGameLogic<FlashMultiplyQuestion>({
        game: Game.FLASH_MULTIPLY,
        formatProblem: (q) => `${q.timetableQuestion[0]} × ${q.timetableQuestion[1]}`,
        problemType,
        clockMode,
        generateQuestion,
        tableNumber
    });


    if (gameOver && gameOverSummary) {
        return (
            <GameOverDisplay scoreStats={scoreStats} gameOverSummary={gameOverSummary}>
                <Button label="Play Again" onPress={resetGame} />
            </GameOverDisplay>
        );
    }

    if (!question) return null;


    const problem = `${question.timetableQuestion[0]} × ${question.timetableQuestion[1]}`
    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <PointsDisplay points={scoreStats.points} highScore={scoreStats.highestStreak} />
                {isTimed && <TimerDisplay minutes={minutes} seconds={seconds} />}
            </View>

            <View style={styles.problemContainer}>
                <ProblemDisplay
                    problem={problem}
                />

                {problemType === ProblemType.TYPED && (
                    <GameTypedInput
                        value={typedAnswer}
                        onChangeText={handleTypedAnswerChange}
                    />
                )}

                {problemType === ProblemType.MULTIPLE_CHOICE && (
                    <GameMultipleChoice
                        key={`question-${questionIndex}`}
                        options={question.options}
                        onSelect={handleMultipleChoiceAnswer}
                    />
                )}
            </View>
        </View>
    );
};

export default FlashMultiplyGame;