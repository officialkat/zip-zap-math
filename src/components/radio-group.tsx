import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import RadioButton from "@components/ui/radio-button";
import {RadioGroupOption} from "@types";
import Text from "@components/ui/Text";


const styles = StyleSheet.create({
    radioGroupItem: {
        alignItems: "center",
        flexDirection: "row",
        gap: 5,
        marginBottom: 5
    }
});

interface RadioGroupProps {
    defaultValue?: RadioGroupOption;
    options: RadioGroupOption[];
    onChange: (selection: RadioGroupOption) => void;
}

const RadioGroup = ({defaultValue, options,onChange}: RadioGroupProps) => {
    const [selected, setSelected] = useState(defaultValue);

    const renderItem = ({item}: {item: RadioGroupOption}) => {
        return (
            <View style={styles.radioGroupItem}>
                <RadioButton active={selected?.value === item.value} onPress={()=>{
                    onChange(item);
                    setSelected(item);
                }}/>
                <Text>{item.label}</Text>
            </View>
        )
    }
    return (
        <FlatList
            keyExtractor={(item)=> item.label}
            data={options}
            renderItem={renderItem}
            scrollEnabled={false}
        />
    );
};

export default RadioGroup;