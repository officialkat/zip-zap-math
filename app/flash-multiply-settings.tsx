import {ScrollView, StyleSheet, View} from "react-native";
import ScreenWrapper from "@components/screen-wrapper";
import Text from "@components/ui/Text";
import Select from "@components/select";
import {FlashMultiplyConfig, RadioGroupOption, SelectOption} from "@types";
import RadioGroup from "@components/radio-group";
import Button from "@components/ui/Button";
import Spacer from "@components/ui/spacer";
import React, {useCallback, useState} from "react";
import {ClockMode, ProblemType} from "@enums";
import useNavigationManager from "@hooks/useNavigationManager";
import {CLOCK_MODE_OPTIONS, PROBLEM_TYPE_OPTIONS, NUMBER_OPTIONS} from "../src/constants";
import Input from "@components/ui/input";


const DEFAULT_CONFIG: FlashMultiplyConfig = {
    timetables: [3,4,5],
    maxMultiplier: 12,
    lowestMultiplier: 0,
    clockMode: ClockMode.NONE,
    problemType: ProblemType.MULTIPLE_CHOICE,
};

const DEFAULT_VALUES = {
    timetables: DEFAULT_CONFIG.timetables.map(num => ({
        key: String(num),
        label: String(num),
        value: num
    })),
    clockMode: { label: "No timer", value: DEFAULT_CONFIG.clockMode },
    problemType: { label: "Multiple choice", value: DEFAULT_CONFIG.problemType },
};

const styles =  StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: "column",
        gap: 14
    },
    gameSettings: {
        flex: 1
    }
});

export default function FlashMultiplyGameRoot() {
    const [config, setConfig] = useState<FlashMultiplyConfig>(DEFAULT_CONFIG);
    const {goToFlashMultiplyGame} = useNavigationManager()

    const handleTimetableSelection = (selectedOptions: SelectOption[]) => {
        setConfig((prev)=>({
            ...prev,
            timetables: selectedOptions.map((option) => option.value),
        }))
    }

    const handleMaxMultiplierChange = useCallback((value: string) => {
        const num = Number(value);
        if (isNaN(num) || num > 999) return;
        setConfig((prev) => ({
            ...prev,
            maxMultiplier: num,
        }));
    }, []);
    const handleLowestMultiplierChange = useCallback((value: string) => {
        const num = Number(value);
        if (isNaN(num) || num > 999) return;
        setConfig((prev) => ({
            ...prev,
            lowestMultiplier: num,
        }));
    }, []);

    const handleClockModeSelection = (selection: RadioGroupOption) => {
        setConfig((prev)=>({
            ...prev,
            clockMode: selection.value,
        }))
    }
    const handleProblemTypeSelection = (selection: RadioGroupOption) => {
        setConfig((prev)=>({
            ...prev,
            problemType: selection.value,
        }))
    }
    return (
        <ScreenWrapper title="Flash Multiply" >
            <View style={styles.body}>
                <Text type="subtitle">Settings</Text>
                <Text type="defaultSemiBold">Choose timetable:</Text>
                <Select
                    multiselect
                    defaultOptions={DEFAULT_VALUES.timetables}
                    options={NUMBER_OPTIONS}
                    onChange={handleTimetableSelection}
                    style={{listStyle: {maxHeight: 230}}}
                    listProps={{scrollEnabled: true}}
                />
                <ScrollView style={styles.gameSettings}>
                    <Text type="defaultSemiBold">Highest multiplier:</Text>
                    <Spacer/>
                    <Input
                        style={{ alignSelf: "flex-start", minWidth: 152, maxWidth: "100%" }}
                        autoFocus={false}
                        value={String(config.maxMultiplier)}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        onChangeText={handleMaxMultiplierChange}
                    />
                    <Spacer/>
                    <Text type="defaultSemiBold">Lowest multiplier:</Text>
                    <Spacer/>
                    <Input
                        style={{ alignSelf: "flex-start", minWidth: 152, maxWidth: "100%" }}
                        autoFocus={false}
                        value={String(config.lowestMultiplier)}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        onChangeText={handleLowestMultiplierChange}
                    />
                    <Spacer/>
                    <Text type="defaultSemiBold">Choose timer mode:</Text>
                    <Spacer/>
                    <RadioGroup defaultValue={DEFAULT_VALUES.clockMode} options={CLOCK_MODE_OPTIONS} onChange={handleClockModeSelection}/>
                    <Spacer/>
                    <Text type="defaultSemiBold">Choose question type:</Text>
                    <Spacer/>
                    <RadioGroup defaultValue={DEFAULT_VALUES.problemType} options={PROBLEM_TYPE_OPTIONS} onChange={handleProblemTypeSelection}/>
                    <Spacer/>
                </ScrollView>
                <Button style={{}} label="Play" onPress={()=>{goToFlashMultiplyGame(config)}}/>
            </View>
        </ScreenWrapper>
    )
}
