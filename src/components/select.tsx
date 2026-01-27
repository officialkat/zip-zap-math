import React, {useState} from 'react';
import {FlatList, StyleProp, StyleSheet, TextStyle, ViewStyle} from "react-native";

import SquareButton from "@components/ui/square-button";
import {SelectOption} from "@types";
import Text from "@components/ui/Text";

const styles = StyleSheet.create({
    gap: {
        gap: 10,
    }
});
interface SelectProps {
    options: SelectOption[];
    onChange: (selectedOptions: SelectOption[]) => void;
    defaultOptions?: SelectOption[];
    multiselect?: boolean;
    numOfColumns?: number;
    style?: {
        button?: StyleProp<ViewStyle>;
        text?: StyleProp<TextStyle>;
        contentContainerStyle?: StyleProp<ViewStyle>;
    };
}

const Select = ({options, multiselect, defaultOptions = [],  numOfColumns = 4, style, onChange}: SelectProps) => {
    const [selected, setSelected] = useState<SelectOption[]>(defaultOptions);

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
            numColumns={numOfColumns}
            data={options}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.key)}
        />
    );
};

export default Select;