import {StyleSheet} from "react-native";
import ScreenWrapper from "@components/screen-wrapper";
import {useLocalSearchParams} from "expo-router";
import {AdditionRouteConfig} from "@types";
import AdditionGame from "@components/games/addition-game";


const styles =  StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});


export default function AdditionGameRoot() {
    const {addends, maxAddend, problemType, clockMode} = useLocalSearchParams<AdditionRouteConfig>();

    return (
        <ScreenWrapper title="Addition Game" style={styles.wrapper} >
            <AdditionGame addends={addends.split(',').map(Number)} maxAddend={Number(maxAddend)} problemType={problemType} clockMode={clockMode}/>
        </ScreenWrapper>
    )
}
