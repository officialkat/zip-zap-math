import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@components/ui/Text';
import StatRow from "@components/stats/stat-row";

interface GameModeStats {
    highestStreak: number;
    highestStreakCountdown: number;
    highestStreakStopwatch: number;
    highestStopwatchTimeSeconds?: number;
}

interface ProblemTypeStatsProps {
    title: string;
    stats: GameModeStats;
    maxValue: number;
}

const ProblemTypeStats = ({ title, stats, maxValue }: ProblemTypeStatsProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <StatRow label="No timer" value={stats.highestStreak} maxValue={maxValue} />
            <StatRow label="Countdown" value={stats.highestStreakCountdown} maxValue={maxValue} />
            <StatRow label="Stopwatch" value={stats.highestStreakStopwatch} maxValue={maxValue} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        color: '#757575',
        marginBottom: 12,
    },
});

export default ProblemTypeStats;