import React, {useState} from 'react';
import {FlatList, StyleSheet} from "react-native";

import SquareButton from "@components/ui/square-button";
import {SelectOption} from "@types";

const useStyles = () => {
    return StyleSheet.create({});
};
interface SelectProps {
    options: SelectOption[];
    onChange: (selectedOptions: SelectOption[]) => void;
    defaultOptions?: SelectOption[];
    multiselect?: boolean;
}

const Select = ({options, multiselect, defaultOptions = [], onChange}: SelectProps) => {
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
            active={isSelected(item)}
            label={item.label}
            onPress={() => toggleOption(item)}
        />
    );

    return (
        <FlatList
            contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                columnGap: 10,
                rowGap: 10
            }}
            data={options}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.key)}
        />
    );
};

export default Select;