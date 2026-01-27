import React, {useState} from 'react';
import {FlatList, FlatListProps, StyleProp, StyleSheet, TextStyle, ViewStyle} from "react-native";

import SquareButton from "@components/ui/square-button";
import {SelectOption} from "@types";
import Text from "@components/ui/Text";

const styles = StyleSheet.create({
    gap: {
        gap: 10,
    }
});

type SelectListProps = Omit<FlatListProps<SelectOption>, 'data' | 'renderItem'>

interface SelectProps {
    options: SelectOption[];
    onChange: (selectedOptions: SelectOption[]) => void;
    defaultOptions?: SelectOption[];
    multiselect?: boolean;
    listProps?: SelectListProps;
    style?: {
        button?: StyleProp<ViewStyle>;
        text?: StyleProp<TextStyle>;
        contentContainerStyle?: StyleProp<ViewStyle>;
    };
}

const Select = ({options, multiselect, defaultOptions = [], listProps, style, onChange}: SelectProps) => {
    const [selected, setSelected] = useState<SelectOption[]>(defaultOptions);

    const defaultListProps: SelectListProps = {
        scrollEnabled: false,
        numColumns: 4,
        ...listProps
    }

    const isSelected = (option: SelectOption) =>
        selected.some(s => s.key === option.key);

    const toggleOption = (option: SelectOption) => {
        let newSelected: SelectOption[];

        if (multiselect) {
            if (isSelected(option)) {
                newSelected = selected.filter(s => s.key !== option.key);
            } else {
                newSelected = [...selected, option];
            }
        } else {
            newSelected = [option];
        }

        setSelected(newSelected);
        onChange(newSelected);
    };

    const renderItem = ({item}: {item: SelectOption}) => (
        <SquareButton
            style={style?.button}
            active={isSelected(item)}
            onPress={() => toggleOption(item)}
        >
            <Text style={style?.text}>{item.label}</Text>
        </SquareButton>
    );

    return (
        <FlatList
            contentContainerStyle={[styles.gap,style?.contentContainerStyle]}
            columnWrapperStyle={styles.gap}
            data={options}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.key)}
            {...defaultListProps}
        />
    );
};

export default Select;