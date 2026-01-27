import React from 'react';
import {StyleSheet, View, Pressable, PressableProps, PressableStateCallbackType} from "react-native";

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

type BaseProps = PressableProps & {
    active?: boolean;
};

type LabelOnly = {
    label: string;
    children?: never;
};

type ChildrenOnly = {
    label?: never;
    children: React.ReactElement;
};

export type SquareButtonProps = BaseProps & (LabelOnly | ChildrenOnly);

const SquareButton = ({label, active, children, style, ...rest}: SquareButtonProps) => {
    const styles = useStyles();
    return (
        <Pressable
            style={(state: PressableStateCallbackType) => [
                styles.button,
                typeof style === "function" ? style(state) : style,
            ]}
            {...rest}
        >
            {({ pressed }) => (
                <View style={[styles.innerWrapper, (pressed || active) && styles.active]}>
                    {children ? children : <Text>{label}</Text>}
                </View>
            )}
        </Pressable>
    );
};

export default SquareButton;