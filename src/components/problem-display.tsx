import React from 'react';
import {View} from "react-native";

import {StyleSheet} from "react-native";
import Text from "@components/ui/Text";

const styles = StyleSheet.create({
    problemText: {
        fontSize: 94,
        fontWeight: "bold",
        textAlign: "center",
    }
});

interface QuestionDisplayProps {
    problem: string;
}

const ProblemDisplay = ({problem}: QuestionDisplayProps) => {
    return (
        <View>
            <Text style={styles.problemText}>{problem}</Text>
        </View>
    );
};

export default ProblemDisplay;