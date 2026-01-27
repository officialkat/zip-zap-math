import React from 'react';
import { StyleSheet } from 'react-native';
import Select from '@components/select';
import { SelectOption } from '@types';

interface GameMultipleChoiceProps {
    options: number[];
    onSelect: (value: number) => void;
    numOfColumns?: number;
    buttonSize?: number;
}

const GameMultipleChoice = ({
                                options,
                                onSelect,
                                numOfColumns = 2,
                                buttonSize = 150,
                            }: GameMultipleChoiceProps) => {
    const formattedOptions: SelectOption[] = options.map((val) => ({
        key: String(val),
        label: String(val),
        value: val,
    }));

    const handleChange = (selected: SelectOption[]) => {
        onSelect(selected[0].value);
    };

    const styles = StyleSheet.create({
        button: {
            width: buttonSize,
            height: buttonSize,
        },
        contentContainer: {
            marginTop: "auto",
            alignSelf: "center"
        }
    });

    return (
        <Select
            style={{
                button: styles.button,
                contentContainerStyle: styles.contentContainer
            }}
            options={formattedOptions}
            numOfColumns={numOfColumns}
            onChange={handleChange}
        />
    );
};

export default GameMultipleChoice;