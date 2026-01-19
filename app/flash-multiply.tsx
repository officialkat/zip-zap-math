import {StyleSheet} from "react-native";
import ScreenWrapper from "@components/screen-wrapper";
import Text from "@components/ui/Text";
import Select from "@components/select";
import {FlashMultiplyConfig, RadioGroupOption, SelectOption} from "@types";
import RadioGroup from "@components/radio-group";
import Button from "@components/ui/Button";
import Spacer from "@components/ui/spacer";
import {useState} from "react";
import {FlashMultiplyProblemType} from "@enums";

const styles =  StyleSheet.create({
        wrapper: {
            flexDirection: "column",
            gap: 14
        },
});

const ops: SelectOption[] = [
    { key: "1", label: "1", value: 1 },
    { key: "2", label: "2", value: 2 },
    { key: "3", label: "3", value: 3 },
    { key: "4", label: "4", value: 4 },
    { key: "5", label: "5", value: 5 },
    { key: "6", label: "6", value: 6 },
    { key: "7", label: "7", value: 7 },
    { key: "8", label: "8", value: 8 },
    { key: "9", label: "9", value: 9 },
    { key: "10", label: "10", value: 10 },
    { key: "11", label: "11", value: 11 },
    { key: "12", label: "12", value: 12 },
];

const tackProgressOptions = [
    {
        label: 'Streaks',
        value: 1,
    },
    {
        label: 'Streaks Timed',
        value: 2,
    },
];

const problemTypeOptions = [
    {
        label: 'Multiple Choice',
        value: FlashMultiplyProblemType.MULTIPLE_CHOICE,
    },
    {
        label: 'Write Answer',
        value: FlashMultiplyProblemType.TYPING,
    },
];


export default function FlashMultiplyGameRoot() {
    const [config, setConfig] = useState<FlashMultiplyConfig>({
        timetables: [1,2,3],
        maxMultiplier: 12,
        problemType: FlashMultiplyProblemType.MULTIPLE_CHOICE,
        isTimed: false
    });

    const handleTimetablesSelection = (selectedOptions: SelectOption[]) => {
        setConfig((prev)=>({
            ...prev,
            timetables: selectedOptions.map((option) => option.value),
        }))
    }
    const handleProgressSelection = (selection: RadioGroupOption) => {
        setConfig((prev)=>({
            ...prev,
            isTimed: selection.value === 2,
        }))
    }
    const handleProblemTypeSelection = (selection: RadioGroupOption) => {
        setConfig((prev)=>({
            ...prev,
            problemType: selection.value,
        }))
    }
console.log(config)
    return (
        <ScreenWrapper title="Flash Multiply" style={styles.wrapper}>
            <Text type="subtitle">Settings</Text>
            <Text>Select timetables to play with.</Text>
            <Select
                multiselect
                options={ops}
                onChange={handleTimetablesSelection}
            />
            <Spacer/>
            <Text type="defaultSemiBold">Track Progress With:</Text>
            <RadioGroup options={tackProgressOptions} onChange={handleProgressSelection}/>
            <Text type="defaultSemiBold">Problem Type:</Text>
            <RadioGroup options={problemTypeOptions} onChange={handleProblemTypeSelection}/>
            <Spacer/>
            <Button label="Play"/>
        </ScreenWrapper>
    )
}
