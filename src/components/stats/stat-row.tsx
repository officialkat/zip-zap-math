import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@components/ui/Text';
import ProgressBar from "@components/ui/progress-bar";

interface StatRowProps {
    label: string;
    value: number;
    maxValue: number;
}

const StatRow = ({ label, value, maxValue }: StatRowProps) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.barContainer}>
                <View style={styles.barWrapper}>
                    <ProgressBar percent={percentage} />
                </View>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: '#474747',
        marginBottom: 6,
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    barWrapper: {
        flex: 1,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        minWidth: 30,
        textAlign: 'right',
    },
});

export default StatRow;