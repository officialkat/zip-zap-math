import {StyleSheet, View} from "react-native";

import ScreenWrapper from "@components/screen-wrapper";
import Button from "@components/ui/Button";
import useNavigationManager from "@hooks/useNavigationManager";
import Text from "@components/ui/Text";
import {ChartBarBig} from "lucide-react-native";
import ThemedIcon from "@components/ui/themed-icon";


const styles =  StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent: "space-between"
    },
    gamesButtons: {
        gap: 14
    }
});


export default function Index() {
    const {goToFlashMultiplySettings, goToWakoTableSettings, goToStats} = useNavigationManager()
    return (
        <ScreenWrapper title="Games" showBackButton={false} >
            <View style={styles.wrapper}>
                <View style={styles.gamesButtons}>
                    <Button label="Flash Multiply" onPress={goToFlashMultiplySettings}/>
                    <Button label="Wako Tables" onPress={goToWakoTableSettings}/>
                </View>
                <View>
                    <Button type="minimal"  label="Stats" onPress={goToStats} style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <ThemedIcon
                            icon={ChartBarBig}
                            strokeWidth={1.5}
                            style={{marginRight: 10}}
                        />
                        <Text>Stats</Text>
                    </Button>
                </View>
            </View>
        </ScreenWrapper>
    )
}
