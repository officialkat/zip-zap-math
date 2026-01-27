import {StyleSheet, ScrollView, View, Alert} from "react-native";
import ScreenWrapper from "@components/screen-wrapper";
import {getAllGameStats, resetAllStats} from "@components/database";
import { Stats } from "@types";
import { useEffect, useState } from "react";
import Accordion from "@components/ui/accordion";
import Spacer from "@components/ui/spacer";
import TableStatsSection from "@components/stats/table-stats-section";
import Text from "@components/ui/Text";
import Button from "@components/ui/Button";
import ThemedIcon from "@components/ui/themed-icon";
import {Trash2} from "lucide-react-native";
import {useThemeColor} from "@hooks/use-theme-color";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "space-between",
    }
});

const formatGameName = (name: string) => {
    return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

export default function StatsRoot() {
    const [stats, setStats] = useState<Stats | null>(null);
    const errorColor = useThemeColor({},'error');

    const handleResetStats = () => {
        Alert.alert(
            'Reset All Stats',
            'Are you sure? This cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        await resetAllStats();
                        setStats(null);
                    }
                }
            ]
        );
    };

    useEffect(() => {
        getAllGameStats().then(setStats);
    }, []);

    console.log(stats);

    return (
        <ScreenWrapper title="Stats">
            <View style={styles.wrapper}>
                <View>
                    {!stats ?  <Text>No stats yet... Play some games!</Text> : (
                        <ScrollView>
                            <Spacer />
                            {Object.entries(stats).map(([gameName, gameData]) => (
                                <Accordion key={gameName} title={formatGameName(gameName)}>
                                    {Object.entries(gameData).map(([tableNumber, tableData]) => (
                                        <TableStatsSection
                                            key={tableNumber}
                                            tableNumber={tableNumber}
                                            tableData={tableData}
                                        />
                                    ))}
                                </Accordion>
                            ))}
                        </ScrollView>
                    )}
                </View>
                <Button
                    type="minimal"
                    label="Reset Stats"
                    onPress={handleResetStats}
                    style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 14}}
                >
                    <ThemedIcon
                        color={errorColor}
                        icon={Trash2}
                        strokeWidth={1.5}
                        style={{marginRight: 10}}
                    />
                    <Text style={{color: errorColor}}>Reset Stats</Text>
                </Button>
            </View>


        </ScreenWrapper>
    );
}