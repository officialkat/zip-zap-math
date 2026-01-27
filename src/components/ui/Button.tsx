import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, StyleSheet} from "react-native";

import {useThemeColor} from "@hooks/use-theme-color";
import Text from "@components/ui/Text";

const useStyles = () => {
    const borderColor = useThemeColor({},'border');
    return StyleSheet.create({
        default: {
            padding: 14,
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 2,
            borderColor,
        },
        minimal:{

        },

    });
}

interface ButtonProps extends TouchableOpacityProps {
    label: string;
    type?: "default" | "minimal";
}

const Button = ({type = "default",label, style, children, ...rest}: ButtonProps) => {
    const styles = useStyles();
    return (
        <TouchableOpacity style={[styles[type], style]} {...rest} >
            {children ? children : <Text>{label}</Text>}
        </TouchableOpacity>
    );
};

export default Button;