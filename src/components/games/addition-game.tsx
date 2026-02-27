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
import {AdditionQuestion} from "@types";
import {makeAdditionQuestion} from "@utils/addition.tsx-utils";

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

interface AdditionGameProps {
    problemType: ProblemType;
    clockMode: ClockMode;
    addends: number[];
    maxAddend: number;
}



const AdditionGame = ({
                               problemType,
                               clockMode,
                               addends,
                               maxAddend
                           }: AdditionGameProps) => {
    // Generate question callback
    const generateQuestion = useCallback((): AdditionQuestion => {
        return makeAdditionQuestion(addends, maxAddend);
    }, [addends, maxAddend]);

    const addendsNumber = addends.join(',');

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
    } = useGameLogic<AdditionQuestion>({
        game: Game.ADDITION,
        formatProblem: (q) => `${q.additionQuestion[0]} × ${q.additionQuestion[1]}`,
        problemType,
        clockMode,
        generateQuestion,
        tableNumber: addendsNumber
    });


    if (gameOver && gameOverSummary) {
        return (
            <GameOverDisplay scoreStats={scoreStats} gameOverSummary={gameOverSummary}>
                <Button label="Play Again" onPress={resetGame} />
            </GameOverDisplay>
        );
    }

    if (!question) return null;


    const problem = `${question.additionQuestion[0]} + ${question.additionQuestion[1]}`
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

export default AdditionGame;