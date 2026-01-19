import React from 'react';
import {View, StyleSheet} from "react-native";


import Text from "@components/ui/Text";

const styles = StyleSheet.create({
    header: {
        paddingBottom: 20,
    }
});

interface GameOverDisplayProps {
    points: number;
    highestStreak: number;
    children: React.ReactElement
}

const GameOverDisplay = ({points, highestStreak, children}: GameOverDisplayProps) => {
    return (
        <View>
            <View style={styles.header}>
                <Text type="subtitle">Game Over!</Text>
                <Text>Highest Streak: {highestStreak}</Text>
                <Text>Points: {points}</Text>
            </View>
            {children}
        </View>
    );
};

export default GameOverDisplay;