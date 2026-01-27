import {StyleSheet} from "react-native";
import ScreenWrapper from "@components/screen-wrapper";
import {useLocalSearchParams} from "expo-router";
import {WakoTableGameRouteConfig} from "@types";
import WakoTableGame from "@components/games/wako-table-game";


const styles =  StyleSheet.create({
    wrapper: {
        flex: 1
    }
});


export default function WakoTableGameRoot() {
    const {tableNumber,problemType,clockMode} = useLocalSearchParams<WakoTableGameRouteConfig>();

    if (!tableNumber || !problemType || !clockMode) return null;

    return (
        <ScreenWrapper title="Wako Table Game" style={styles.wrapper}>
            <WakoTableGame tableNumber={Number(tableNumber)} problemType={problemType} clockMode={clockMode}/>
        </ScreenWrapper>
    )
}
