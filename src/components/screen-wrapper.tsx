import React, {PropsWithChildren} from 'react';
import {StyleSheet, ViewProps} from "react-native";
import Text from "@components/ui/Text";
import {SafeAreaView} from "react-native-safe-area-context";

const styles =  StyleSheet.create({
    wrapper:{
        // flex: 1,
        padding: 30
    }
});

interface ScreenWrapperProps extends PropsWithChildren<ViewProps>{
    title?: string,
}

const ScreenWrapper = ({title, children, style, ...rest}: ScreenWrapperProps) => {
    return (
        <SafeAreaView style={[styles.wrapper, style]} {...rest}>
            {title && <Text type="title">{title}</Text>}
            {children}
        </SafeAreaView>
    );
};

export default ScreenWrapper;