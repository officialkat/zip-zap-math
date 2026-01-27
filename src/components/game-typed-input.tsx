import React from 'react';
import Input from '@components/ui/input';

interface GameTypedInputProps {
    value: string;
    onChangeText: (text: string) => void;
    autoFocus?: boolean;
}

const GameTypedInput = ({
                            value,
                            onChangeText,
                            autoFocus = true,
                        }: GameTypedInputProps) => {
    return (
        <Input
            autoFocus={autoFocus}
            onChangeText={onChangeText}
            value={value}
            keyboardType="number-pad"
        />
    );
};

export default GameTypedInput;