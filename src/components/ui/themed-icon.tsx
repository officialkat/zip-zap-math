import React from 'react';
import { LucideIcon, LucideProps } from 'lucide-react-native';
import { useThemeColor } from '@hooks/use-theme-color';

interface ThemedIconProps extends Omit<LucideProps, 'color'> {
    icon: LucideIcon;
    color?: string;
}

const ThemedIcon = ({ icon: Icon, color, ...props }: ThemedIconProps) => {
    const themeColor = useThemeColor({}, 'text');
    const iconColor = color || themeColor;

    return <Icon color={iconColor} {...props} />;
};

export default ThemedIcon;