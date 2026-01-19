import React from 'react';
import {StyleSheet, View, Pressable, PressableProps} from "react-native";

import {useThemeColor} from "@hooks/use-theme-color";
import Text from "@components/ui/Text";

const useStyles = () => {
    const borderColor = useThemeColor({},'border');
    const accentColor = useThemeColor({},'accent');
    return StyleSheet.create({
        active: {
            backgroundColor: accentColor,
        },
        innerWrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            flex: 1

        },
        button: {
            height: 70,
            width: 70,
            padding: 4,
            borderRadius: 8,
            borderWidth: 2,
            borderColor,
        }
    });
}

interface SquareButtonProps extends PressableProps {
    label: string;
    active?: boolean;
}

const SquareButton = ({label, active, ...rest}: SquareButtonProps) => {
    const styles = useStyles();
    return (
        <Pressable style={[styles.button]} {...rest}
        >
            {({ pressed }) => (
                <View style={[styles.innerWrapper, (pressed || active) && styles.active]}>
                    <Text>{label}</Text>
                </View>
            )}
        </Pressable>
    );
};

export default SquareButton;