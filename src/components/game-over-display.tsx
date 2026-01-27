import React from 'react';
import {View, StyleSheet} from "react-native";


import Text from "@components/ui/Text";
import Spacer from "@components/ui/spacer";
import {useThemeColor} from "@hooks/use-theme-color";

const getGameOverMessage = (isVictory: boolean, highestStreak: number, points: number): string => {
    if (isVictory) {
        const victories = [
            "Amazing! New high score!",
            "Incredible work!",
            "Fantastic! You're on fire!",
            "Outstanding achievement!",
            "Wow! New record!",
            "Spectacular performance!",
            "Brilliant! You nailed it!",
            "Phenomenal! New best!",
            "Excellent! Way to go!",
            "Superb! You crushed it!",
            "Magnificent! Top score!",
            "New high score!",
            "Perfect! You did it!",
            "Unbelievable! New record!",
            "Awesome! Best yet!",
            "Sensational work!",
            "Remarkable! Top performance!",
            "Stupendous! New milestone!",
            "Marvelous achievement!",
            "Extraordinary! You're amazing!"
        ];
        return victories[Math.floor(Math.random() * victories.length)];
    }

    // Zero points
    if (points === 0) {
        const zeroMessages = [
            "Take your time!",
            "Practice makes perfect!",
            "You can do this!",
            "Don't give up!",
            "Keep trying!",
            "Every expert was once a beginner!"
        ];
        return zeroMessages[Math.floor(Math.random() * zeroMessages.length)];
    }

    // Close to high score (within 20%)
    if (highestStreak > 0 && points >= highestStreak * 0.8) {
        return "So close! Try again!";
    }

    // Regular defeat messages
    const defeats = [
        "Keep practicing!",
        "You'll get it next time!",
        "Try again!",
        "Don't give up!",
        "Keep going!",
        "Nice try!",
        "Almost there!",
        "Good effort!",
        "Try once more!",
        "You can do this!",
        "Keep at it!",
        "Stay determined!",
        "Keep pushing!",
        "Next time!",
        "Stay focused!",
        "You've got this!"
    ];
    return defeats[Math.floor(Math.random() * defeats.length)];
};


const useStyles = ()=>{
    const successColor = useThemeColor({}, 'success');
    const errorColor = useThemeColor({}, 'error');
    return StyleSheet.create({
        header: {
            paddingBottom: 20,
        },
        defeat: {
            color: errorColor
        },
        victory: {
            color: successColor
        }
    });
}

interface GameOverDisplayProps {
    points: number;
    highestStreak: number;
    isNewHighScore: boolean
    children?: React.ReactElement
}

const GameOverDisplay = ({ points, highestStreak,isNewHighScore, children}: GameOverDisplayProps) => {
    const styles = useStyles()
    const gameOverMessage = getGameOverMessage(isNewHighScore,highestStreak,points)
    return (
        <View>
            <View style={styles.header}>
                <Text type="subtitle">Game Over!</Text>
                <Text>Highest Streak: {highestStreak}</Text>
                <Text>Points: {points}</Text>
                <Spacer/>
                {<Text style={isNewHighScore ? styles.victory : styles.defeat}>{gameOverMessage}</Text>}
            </View>
            {children && children}
        </View>
    );
};

export default GameOverDisplay;