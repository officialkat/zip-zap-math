import React from 'react';
import {StyleSheet, View} from "react-native";
import Text from "@components/ui/Text";

const styles = StyleSheet.create({
    wrapper: {

    }
});

interface PointsDisplayProps {
    points: number
    highScore?: number | null

}

const PointsDisplay = ({points, highScore = null}: PointsDisplayProps) => {
    return (
        <View style={styles.wrapper}>
            {highScore !== null && <Text>HighScore: {highScore}</Text>}
            <Text>Points: {points}</Text>
        </View>
    );
};

export default PointsDisplay;