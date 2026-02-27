import React from 'react';
import {Text as RNText, TextProps as RNTextProps, StyleSheet} from "react-native";
import {useThemeColor} from "@hooks/use-theme-color";


const styles = StyleSheet.create({
    default: {
        fontSize: 18,
    },
    defaultSemiBold: {
        fontSize: 18,
        fontWeight: '500',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    link: {},
});

interface TextProps extends  RNTextProps{
    type?: 'default' | "defaultSemiBold" | 'title' | 'subtitle' | 'link';
}

const Text = ({type="default",style,...rest}: TextProps) => {
    const color = useThemeColor({},'text');
    return (
        <RNText
            style={[
                {color},
                styles[type],
                style
            ]}
            {...rest}
        />
    );
};

export default Text;