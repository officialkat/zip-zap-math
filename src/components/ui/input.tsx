import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from "react-native";
import {useThemeColor} from "@hooks/use-theme-color";


const useStyles = () => {
    const borderColor = useThemeColor({},'border');
    const textColor = useThemeColor({},'text');
    return StyleSheet.create({
        input: {
            padding: 14,
            borderRadius: 8,
            borderWidth: 2,
            color: textColor,
            borderColor,
        }
    });
};

interface InputProps extends TextInputProps {
}

const Input = ({style, ...restProps}: InputProps) => {
    const styles = useStyles();
    return (
        <TextInput style={[styles.input, style]} {...restProps}/>
    );
};

export default Input;