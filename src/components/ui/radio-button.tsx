import React from 'react';
import {StyleSheet, View, Pressable, PressableProps} from "react-native";

import {useThemeColor} from "@hooks/use-theme-color";

const useStyles = () => {
    const borderColor = useThemeColor({},'border');
    const accentColor = useThemeColor({},'accent');
    return StyleSheet.create({
        active: {
            backgroundColor: accentColor,
        },
        innerWrapper: {
            borderRadius: 100,
            flex: 1

        },
        button: {
            height: 25,
            width: 25,
            padding: 3,
            borderRadius: 100,
            borderWidth: 2,
            borderColor,
        }
    });
}

interface RadioButtonProps extends PressableProps {
    active?: boolean;
}

const RadioButton = ({ active, ...rest}: RadioButtonProps) => {
    const styles = useStyles();
    return (
        <Pressable style={[styles.button]} {...rest}
        >
            {({ pressed }) => (
                <View style={[styles.innerWrapper, (pressed || active) && styles.active]}/>
            )}
        </Pressable>
    );
};

export default RadioButton;