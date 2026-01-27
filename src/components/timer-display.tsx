import React from 'react';
import {View} from "react-native";

import {StyleSheet} from "react-native";
import Text from "@components/ui/Text";

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 4,
    }
});
interface TimerDisplayProps {
    minutes: number;
    seconds: number;
}

const TimerDisplay = ({minutes, seconds}: TimerDisplayProps) => {
    return (
        <View style={styles.wrapper}>
            <Text>{minutes}m : {seconds}s</Text>
        </View>
    );
};

export default TimerDisplay;