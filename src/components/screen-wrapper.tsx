import React, {PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity, ViewProps, ScrollView} from "react-native";
import Text from "@components/ui/Text";
import {SafeAreaView} from "react-native-safe-area-context";
import {MoveLeft} from "lucide-react-native";
import useNavigationManager from "@hooks/useNavigationManager";
import {useThemeColor} from "@hooks/use-theme-color";
import ThemedIcon from "@components/ui/themed-icon";

const useStyles = () => {
    const backgroundColor = useThemeColor({}, 'background');
    return StyleSheet.create({
        wrapper: {
            flex: 1,
            padding: 30,
            backgroundColor
        },
        backButton: {
            height: 40,
            width: 40,
            justifyContent: 'center',
            marginRight: "auto"
        },
        scrollContent: {
            flexGrow: 1,
        }
    });
}

interface ScreenWrapperProps extends PropsWithChildren<ViewProps> {
    title?: string,
    showBackButton?: boolean,
    scrollable?: boolean
}

const ScreenWrapper = ({title, children, style, showBackButton = true, scrollable = false, ...rest}: ScreenWrapperProps) => {
    const styles = useStyles();
    const {goBack} = useNavigationManager();

    return (
        <SafeAreaView style={[styles.wrapper, style]} {...rest}>
            {showBackButton && (
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <ThemedIcon icon={MoveLeft} />
                </TouchableOpacity>
            )}
            {title && <Text type="title">{title}</Text>}
            {scrollable ? (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            ) : children}
        </SafeAreaView>
    );
};

export default ScreenWrapper;