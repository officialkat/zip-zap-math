import React from 'react';
import {View, StyleSheet} from "react-native";
import {useThemeColor} from "@hooks/use-theme-color";

const useStyles = () => {
    const borderColor = useThemeColor({},'border');
    const backgroundColor = useThemeColor({},'background');
    return StyleSheet.create({
        BarWrapper:{
            backgroundColor: backgroundColor,
            height: 36,
            width: '100%',
            borderRadius: 8,
            borderWidth: 2,
            borderColor,
            padding: 4,
        },
        Bar:{
            backgroundColor: '#FF9999',
            height: '100%',
            borderRadius: 4,
        }
    });
}

interface ProgressBarProps {
    percent: number
}

const ProgressBar = ({percent}: ProgressBarProps) => {
    const  styles = useStyles()
    return (
        <View style={styles.BarWrapper}>
            <View style={[styles.Bar, {width: `${percent}%`}]} />
        </View>
    );
};

export default ProgressBar;