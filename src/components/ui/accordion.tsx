import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, TouchableOpacity, ViewProps} from "react-native";
import Text from "@components/ui/Text";
import {ChevronDownIcon, ChevronUpIcon, MoveLeft} from "lucide-react-native";
import ThemedIcon from "@components/ui/themed-icon";

const styles = StyleSheet.create({
    titleWrapper: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingVertical: 12,
    },
    title: {
        marginBottom: 0, // Override the default title marginBottom
    },
    bodyWrapper:{
        paddingTop: 8,
    }
});

interface AccordionProps extends PropsWithChildren<ViewProps>{
    title: string;
    header?: React.ReactNode;
}

const Accordion = ({title, header, style, children}: AccordionProps) => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <TouchableOpacity onPress={()=>{setOpen(!open)}} style={styles.titleWrapper}>
                {header ? header : <Text type="title" style={styles.title}>{title}</Text>}
                {open ? <ThemedIcon icon={ChevronUpIcon}/>  : <ThemedIcon icon={ChevronDownIcon}/>}
            </TouchableOpacity>
            {open && (
                <View style={[styles.bodyWrapper, style]}>
                    {children}
                </View>
            )}
        </>
    );
};

export default Accordion;