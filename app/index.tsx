import {Button, FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import {FlashMultiplyGameType, Game} from "@enums";
import {shuffle} from "@helpers";
import {FlashMultiplyGameStats} from "@types";
import {getGameStats, saveFlashMultiplyGameStats} from "@database";
import {useCountdown} from "@hooks/countdown-timer";

const SETTINGS = {
    game: Game.FLASH_MULTIPLY,
    gameType: FlashMultiplyGameType.TYPING,
    isTimed: true
}


const makeAnswers = (answer: number, timetable: number, maxTimetable: number) => {
    const answers = new Set<number>([answer]);
    let attempts = 0;

    while (answers.size < 4 && attempts < 100) {
        const timesByNumber = Math.floor(Math.random() * (maxTimetable + 1));
        answers.add(timetable * timesByNumber);
        attempts++;
    }

    return Array.from(answers);
}

const makeQuestion = (timetables: number[], maxTimetable: number = 12) => {
    const multiplier = Math.floor(Math.random() * (maxTimetable + 1) );
    const timetable: number = timetables[Math.floor(Math.random() * timetables.length)]

    const answer = multiplier * timetable
    const wrongAnswers = makeAnswers(answer, timetable, maxTimetable)
    return {
        timetableNumbers: shuffle<number>([multiplier, timetable]),
        answer,
        wrongAnswers: shuffle<number>(wrongAnswers)

    }
}


const styles =  StyleSheet.create({
        screen:{
            backgroundColor: "pink",
            flex: 1,
            padding: 15
        },
        questionDisplay: {
            backgroundColor: "red",
            padding:15
        },
        answersDisplay:{
            backgroundColor: "orange",
        },
        text: {
            fontSize: 18,
        },
        textInput: {
            fontSize: 18,
            padding: 15
        }

    });

type Question = {
    timetableNumbers: number[]
    answer: number
    wrongAnswers: number[]
}

export default function Index() {
    const { timeLeft, minutes, seconds, isRunning, start, reset } = useCountdown(0, 30);
    const [gameStats, setGameStats] = useState<FlashMultiplyGameStats>({
        typing: {
            highest_streak: 0,
            highest_streak_timed: 0
        },
        multipleChoice: {
            highest_streak: 0,
            highest_streak_timed: 0
        },
    });
    const [points, setPoints] = useState<number>(0);
    const [question,setQuestion] = useState<Question | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);



    const [textAnswer, setTextAnswer] = useState<string>("");

    const highestStreak = SETTINGS.isTimed ? gameStats[SETTINGS.gameType].highest_streak_timed : gameStats[SETTINGS.gameType].highest_streak

    useEffect(() => {
        SETTINGS.isTimed && (
            start()
        )

        setQuestion(makeQuestion([1,2,5], 12));
    }, [])

    useEffect(() => {
        if (SETTINGS.isTimed && timeLeft === 0) {
            void stopGame(); // End game when timer hits 0
        }
    }, [timeLeft]);
    console.log("gameStats", gameStats)
console.log('gameStats[SETTINGS.gameType].highest_streak_timed', gameStats[SETTINGS.gameType].highest_streak_timed)
    const stopGame = async () => {
        if ( highestStreak <= points) {
            await saveFlashMultiplyGameStats({
                ...gameStats,
                [SETTINGS.gameType]: {
                    ...gameStats[SETTINGS.gameType],
                    ...(SETTINGS.isTimed
                        ? { highest_streak_timed: points }
                        : { highest_streak: points })
                },
            })
            const stats = await getGameStats(Game.FLASH_MULTIPLY);
            if (stats) {
                setGameStats(stats); // Only update if data exists
            }
        }
        SETTINGS.isTimed && (
            reset()
        )
        setGameOver(true);
    }

    const checkAnswer = (correctAnswer: number, chosenAnswer:number) => correctAnswer === chosenAnswer
     const isCorrectSoFar = (correctAnswer: number, inputText: string) => {
        const typed = String(inputText).trim();
        const ans = String(correctAnswer);
        return ans.startsWith(typed);
    }


        const handleAnswer = (correct: boolean) =>{
        if(correct){
            setPoints(prevState => prevState + 1)
            setQuestion(makeQuestion([1,2,5], 12))
        } else {
            void stopGame()
        }
        setTextAnswer("")
    }

    const resetGame = () => {
        SETTINGS.isTimed && (
            start()
        )
        setPoints(0)
        setQuestion(makeQuestion([1,2,5], 12))
        setGameOver(false);
    }

    const handleTextAnswer = (text: string)=>{
        if (!question) return;

        setTextAnswer(text);

        const answerStr = String(question.answer);


        if (!isCorrectSoFar(question.answer, text )) {
            handleAnswer(false);
            return;
        }

        if (text.length === answerStr.length) {
            handleAnswer(checkAnswer(question.answer, Number(text)));
        }
    }




    if (!question) return null

    if (gameOver) {
        return (
            <>
                <Text>Points: {points}</Text>
                <Text>Highest Streak: {highestStreak}</Text>
                <Text>Game Over!</Text>
                <Button title="Play Again" onPress={resetGame}/>
            </>
        )
    }

    return (
    <View
      style={styles.screen}
    >
        <View>
            <Text>Points: {points}</Text>
            {SETTINGS.isTimed && (
                <Text>{minutes}:{seconds}</Text>
            )}
            <Text>{minutes}:{seconds}</Text>
        </View>
        <View style={styles.questionDisplay}>
            <Text style={styles.text}>{question.timetableNumbers[0]} X {question.timetableNumbers[1]}</Text>
        </View>
        {SETTINGS.gameType === FlashMultiplyGameType.MULTIPLE_CHOICE && (
            <View style={styles.answersDisplay}>
                <FlatList keyExtractor={(item, index) => index.toString()} data={question.wrongAnswers} renderItem={({item: answer})=>{
                    return <Button onPress={()=>{handleAnswer(checkAnswer(question.answer, answer))}} title={answer.toString()}/>
                }}/>
            </View>
        )}
        {SETTINGS.gameType === FlashMultiplyGameType.TYPING && (
            <View style={styles.answersDisplay}>
                <TextInput
                    style={styles.textInput}
                    autoFocus
                    onChangeText={handleTextAnswer}
                    value={textAnswer}
                    keyboardType="number-pad"
                />
            </View>
        )}

    </View>
  );
}
