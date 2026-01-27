import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@components/ui/Text';
import ProblemTypeStats from "@components/stats/problem-type-stats";
import Accordion from "@components/ui/accordion";

interface GameModeStats {
    highestStreak: number;
    highestStreakCountdown: number;
    highestStreakStopwatch: number;
    highestStopwatchTimeSeconds?: number;
}

interface TableData {
    [problemType: string]: GameModeStats;
}

interface TableStatsSectionProps {
    tableNumber: string;
    tableData: TableData;
}

const formatProblemType = (type: string) => {
    if (type === 'multipleChoice') return 'Multiple Choice';
    if (type === 'typed') return 'Typed';
    return type;
};

const getMaxValue = (tableData: TableData): number => {
    let max = 0;
    Object.values(tableData).forEach((stats) => {
        max = Math.max(
            max,
            stats.highestStreak || 0,
            stats.highestStreakCountdown || 0,
            stats.highestStreakStopwatch || 0
        );
    });
    return max || 1;
};

const TableStatsSection = ({ tableNumber, tableData }: TableStatsSectionProps) => {
    const maxValue = getMaxValue(tableData);

    return (
        <Accordion title={""} header={<Text type="subtitle">Table {tableNumber}</Text>}>
            {Object.entries(tableData).map(([problemType, stats]) => (
                <ProblemTypeStats
                    key={problemType}
                    title={formatProblemType(problemType)}
                    stats={stats}
                    maxValue={maxValue}
                />
            ))}
        </Accordion>
    );
};

const styles = StyleSheet.create({

});

export default TableStatsSection;