import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, StyleSheet} from "react-native";

import {useThemeColor} from "@hooks/use-theme-color";
import Text from "@components/ui/Text";

const useStyles = () => {
    const borderColor = useThemeColor({},'border');
    return StyleSheet.create({
        button: {
            padding: 14,
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 2,
            borderColor,
        }
    });
}

interface ButtonProps extends TouchableOpacityProps {
    label: string;
}

const Button = ({label, style, ...rest}: ButtonProps) => {
    const styles = useStyles();
    return (
        <TouchableOpacity style={[styles.button, style]} {...rest} >
            <Text>{label}</Text>
        </TouchableOpacity>
    );
};

export default Button;