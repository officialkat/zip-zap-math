import {StyleSheet, View} from "react-native";
import ScreenWrapper from "@components/screen-wrapper";
import Text from "@components/ui/Text";
import useNavigationManager from "@hooks/useNavigationManager";
import Button from "@components/ui/Button";
import Select from "@components/select";
import {RadioGroupOption, SelectOption, WakoTableGameConfig} from "@types";
import {useState} from "react";
import Spacer from "@components/ui/spacer";
import RadioGroup from "@components/radio-group";
import {ClockMode, ProblemType} from "@enums";
import {CLOCK_MODE_OPTIONS, PROBLEM_TYPE_OPTIONS, TABLE_NUMBER_OPTIONS} from "../src/constants";


const DEFAULT_CONFIG: WakoTableGameConfig = {
    tableNumber: 1,
    clockMode: ClockMode.NONE,
    problemType: ProblemType.MULTIPLE_CHOICE,
};

const DEFAULT_VALUES = {
    tableNumber: [{ key: String(DEFAULT_CONFIG.tableNumber), label: String(DEFAULT_CONFIG.tableNumber), value: DEFAULT_CONFIG.tableNumber }],
    clockMode: { label: "No timer", value: DEFAULT_CONFIG.clockMode },
    problemType: { label: "Multiple choice", value: DEFAULT_CONFIG.problemType },
};


const styles =  StyleSheet.create({
    body: {
        flexDirection: "column",
        gap: 14
    }
});


export default function WakoTableSettingsRoot() {
    const [config, setConfig] = useState<WakoTableGameConfig>(DEFAULT_CONFIG);
    const {goToWakoTableGame} = useNavigationManager()


    const handleTimetableSelection = (selectedOptions: SelectOption[]) => {
        setConfig((prev)=>({
            ...prev,
            tableNumber: selectedOptions[0].value,
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
        <ScreenWrapper title="Wako Table" >
            <View style={styles.body}>
                <Text type="subtitle">Settings</Text>
                <Text type="defaultSemiBold">Choose timetable:</Text>
                <Select
                    defaultOptions={DEFAULT_VALUES.tableNumber}
                    options={TABLE_NUMBER_OPTIONS}
                    onChange={handleTimetableSelection}
                    style={{listStyle: {maxHeight: 230}}}
                    listProps={{scrollEnabled: true}}
                />
                <Text type="defaultSemiBold">Choose timer mode:</Text>
                <RadioGroup defaultValue={DEFAULT_VALUES.clockMode} options={CLOCK_MODE_OPTIONS} onChange={handleClockModeSelection}/>
                <Text type="defaultSemiBold">Choose question type:</Text>
                <RadioGroup defaultValue={DEFAULT_VALUES.problemType} options={PROBLEM_TYPE_OPTIONS} onChange={handleProblemTypeSelection}/>
                <Spacer/>
                <Button disabled={config === null} label="Play" onPress={()=>{goToWakoTableGame(config)}}/>
            </View>
        </ScreenWrapper>
    )
}
