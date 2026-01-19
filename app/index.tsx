import {StyleSheet, View} from "react-native";

import ScreenWrapper from "@components/screen-wrapper";
import Button from "@components/ui/Button";
import useNavigationManager from "@hooks/useNavigationManager";


const styles =  StyleSheet.create({

});


export default function Index() {
    const {goToFlashMultiplyGame} = useNavigationManager()
    return (
        <ScreenWrapper title="Games" >
            <View style={{gap: 14}}>
                <Button label="Flash Multiply" onPress={goToFlashMultiplyGame}/>
                <Button label="Wako Tables"/>
            </View>
        </ScreenWrapper>
    )
}
