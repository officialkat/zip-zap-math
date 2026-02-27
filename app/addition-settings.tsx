import {StyleSheet, View} from "react-native";
import ScreenWrapper from "@components/screen-wrapper";
import Text from "@components/ui/Text";
import Select from "@components/select";
import {AdditionConfig, RadioGroupOption, SelectOption} from "@types";
import RadioGroup from "@components/radio-group";
import Button from "@components/ui/Button";
import Spacer from "@components/ui/spacer";
import {useState} from "react";
import {ClockMode, ProblemType} from "@enums";
import useNavigationManager from "@hooks/useNavigationManager";
import {CLOCK_MODE_OPTIONS, PROBLEM_TYPE_OPTIONS, NUMBER_OPTIONS} from "../src/constants";


const DEFAULT_CONFIG: AdditionConfig = {
    addends: [1,3,4,5],
    maxAddend: 9,
    clockMode: ClockMode.NONE,
    problemType: ProblemType.MULTIPLE_CHOICE,
};

const DEFAULT_VALUES = {
    addends: DEFAULT_CONFIG.addends.map(num => ({
        key: String(num),
        label: String(num),
        value: num
    })),
    clockMode: { label: "No timer", value: DEFAULT_CONFIG.clockMode },
    problemType: { label: "Multiple choice", value: DEFAULT_CONFIG.problemType },
};

const styles =  StyleSheet.create({
    body: {
        flexDirection: "column",
        gap: 14
    }
});

export default function AdditionGameRoot() {
    const [config, setConfig] = useState<AdditionConfig>(DEFAULT_CONFIG);
    const {goToAdditionGame} = useNavigationManager()

    const handleAddendsSelection = (selectedOptions: SelectOption[]) => {
        setConfig((prev)=>({
            ...prev,
            addends: selectedOptions.map((option) => option.value),
        }))
    }

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
        <ScreenWrapper title="Addition" >
            <View style={styles.body}>
                <Text type="subtitle">Settings</Text>
                <Text type="defaultSemiBold">Choose Addends:</Text>
                <Select
                    multiselect
                    defaultOptions={DEFAULT_VALUES.addends}
                    options={NUMBER_OPTIONS}
                    onChange={handleAddendsSelection}
                    style={{listStyle: {maxHeight: 230}}}
                    listProps={{scrollEnabled: true}}
                />
                <Text type="defaultSemiBold">Choose timer mode:</Text>
                <RadioGroup defaultValue={DEFAULT_VALUES.clockMode} options={CLOCK_MODE_OPTIONS} onChange={handleClockModeSelection}/>
                <Text type="defaultSemiBold">Choose question type:</Text>
                <RadioGroup defaultValue={DEFAULT_VALUES.problemType} options={PROBLEM_TYPE_OPTIONS} onChange={handleProblemTypeSelection}/>
                <Spacer/>
                <Button disabled={config === null} label="Play" onPress={()=>{goToAdditionGame(config)}}/>
            </View>
        </ScreenWrapper>
    )
}
