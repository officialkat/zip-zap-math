import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from "react-native";
import {useThemeColor} from "@hooks/use-theme-color";


const useStyles = () => {
    const textColor = useThemeColor({},'text');
    return StyleSheet.create({
        input: {
            padding: 14,
            borderRadius: 8,
            borderWidth: 2,
            color: textColor,
        }
    });
};

interface InputProps extends TextInputProps {
}

const Input = ({style, ...rest}: InputProps) => {
    const styles = useStyles();
    return (
        <TextInput style={[styles.input, style]} {...rest}/>
    );
};

export default Input;