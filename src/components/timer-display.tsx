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
    minutes: string;
    seconds: string;
}

const TimerDisplay = ({minutes, seconds}: TimerDisplayProps) => {
    return (
        <View style={styles.wrapper}>
            <Text>{minutes} : {seconds}</Text>
        </View>
    );
};

export default TimerDisplay;