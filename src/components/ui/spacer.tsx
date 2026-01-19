import React from 'react';
import {View} from "react-native";


interface SpacerProps {
    size?: number
}
const Spacer = ({size = 14}: SpacerProps) => (
    <View style={{height: size}} />
);

export default Spacer;