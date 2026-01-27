import {RadioGroupOption, SelectOption} from "@types";
import {ClockMode, ProblemType} from "@enums";

export const CLOCK_MODE_OPTIONS: RadioGroupOption[] = [
    { label: "No timer", value: ClockMode.NONE },
    { label: "Countdown", value: ClockMode.COUNTDOWN },
    { label: "Stopwatch", value: ClockMode.STOPWATCH },
];

export const PROBLEM_TYPE_OPTIONS: RadioGroupOption[] = [
    { label: "Typed", value: ProblemType.TYPED },
    { label: "Multiple choice", value: ProblemType.MULTIPLE_CHOICE },
];

export const TABLE_NUMBER_OPTIONS: SelectOption[] = Array.from(
    { length: 12 },
    (_, i) => {
        const n = i + 1;
        return { key: String(n), label: String(n), value: n };
    }
);