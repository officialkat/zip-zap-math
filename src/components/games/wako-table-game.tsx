import React, {useState, useCallback, useRef} from 'react';
import { StyleSheet, View } from "react-native";
import Text from "@components/ui/Text";
import GameOverDisplay from "@components/game-over-display";
import Button from "@components/ui/Button";
import { ClockMode, Game, ProblemType } from "@enums";
import PointsDisplay from "@components/points-display";
import TimerDisplay from "@components/timer-display";
import { useGameLogic } from "@hooks/use-game-logic";
import GameTypedInput from "@components/game-typed-input";
import GameMultipleChoice from "@components/game-multiple-choice";
import {makeTimesTableOptions} from "@utils/wako-table-game-utils";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

    },
    header: {
        marginBottom: 30
    },
    tableProgression:{
        marginBottom: 30
    },
    problemContainer: {
        flex: 1,
        marginTop: 30
    }
});

interface WakoTablesGameProps {
    problemType: ProblemType;
    tableNumber: number;
    clockMode: ClockMode;
}

const WakoTableGame = ({ tableNumber, problemType, clockMode }: WakoTablesGameProps) => {
    const [tableProgression, setTableProgression] = useState<number[]>([]);

    const generateQuestion = useCallback((index: number) => {
        return makeTimesTableOptions(tableNumber, index, 4);
    }, [tableNumber]);
    const instructionText = ProblemType.MULTIPLE_CHOICE ? 'Tap the first multiple.' : 'Type the first multiple.'

    const {
        points,
        gameOver,
        highestStreak,
        question,
        minutes,
        seconds,
        isTimed,
        handleMultipleChoiceAnswer,
        typedAnswer,
        handleTypedAnswerChange,
        resetGame: baseResetGame,
        isNewHighScore,
    } = useGameLogic({
        game: Game.WAKO_TABLE,
        problemType,
        clockMode,
        tableNumber,
        generateQuestion,
        onCorrectAnswer: (answer) => {
            setTableProgression(prev => [...prev, answer]);
        },
        onReset: () => {
            setTableProgression([]);
        },
    });


    if (gameOver) {
        return (
            <GameOverDisplay isNewHighScore={isNewHighScore} points={points} highestStreak={highestStreak}>
                <Button label="Play Again" onPress={baseResetGame} />
            </GameOverDisplay>
        );
    }

    if (!question) return null;

    return (
        <View style={styles.wrapper}>
           <View style={styles.header}>
               <PointsDisplay points={points} />
               {isTimed && <TimerDisplay minutes={minutes} seconds={seconds} />}
           </View>
            <View style={styles.problemContainer}>
                <Text style={styles.tableProgression}>
                    {tableProgression.length ? tableProgression.join(' ') : instructionText}
                </Text>

                {problemType === ProblemType.TYPED && (
                    <GameTypedInput
                        value={typedAnswer}
                        onChangeText={handleTypedAnswerChange}
                    />
                )}

                {problemType === ProblemType.MULTIPLE_CHOICE && (
                    <GameMultipleChoice
                        options={question.options}
                        onSelect={handleMultipleChoiceAnswer}
                    />
                )}
            </View>

        </View>
    );
};

export default WakoTableGame;