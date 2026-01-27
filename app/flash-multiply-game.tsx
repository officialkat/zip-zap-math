import {StyleSheet} from "react-native";
import ScreenWrapper from "@components/screen-wrapper";
import {useLocalSearchParams} from "expo-router";
import { FlashMultiplyRouteConfig} from "@types";
import FlashMultiplyGame from "@components/games/flash-multiply-game";


const styles =  StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});


export default function FlashMultiplyGameRoot() {
    const {timetables, maxMultiplier, problemType, clockMode} = useLocalSearchParams<FlashMultiplyRouteConfig>();

    return (
        <ScreenWrapper title="Flash Mutliply Game" style={styles.wrapper} >
            <FlashMultiplyGame timetables={timetables.split(',').map(Number)} maxMultiplier={Number(maxMultiplier)} problemType={problemType} clockMode={clockMode}/>
        </ScreenWrapper>
    )
}
