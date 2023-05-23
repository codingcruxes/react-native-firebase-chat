/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useColorScheme, View as DefaultView } from 'react-native';
import {
  Text as PaperText,
  TextProps as PaperTextProps,
  useTheme,
  ButtonProps,
  Button as DefaultButton,
  IconButton as IconButtonDefault,
} from 'react-native-paper';

import Colors from '../constants/Colors';
import { AppTheme } from '../constants/theme';

export const useAppTheme = () => useTheme<AppTheme>();

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export type TextProps = PaperTextProps<string>;
export type ViewProps = DefaultView['props'];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const { colors } = useAppTheme();

  return <PaperText style={[{ color: colors.text }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const { colors } = useAppTheme();

  return <DefaultView style={[{ backgroundColor: colors.background }, style]} {...otherProps} />;
}

export function Button(props: ButtonProps) {
  const { style, ...otherProps } = props;
  const { colors } = useAppTheme();

  return (
    <DefaultButton
      textColor={colors.background}
      style={[{ backgroundColor: colors.primary, borderRadius: 6 }, style]}
      {...otherProps}
    />
  );
}

export function IconButton({
  icon,
  bgColor,
  iconColor = '#303030',
  onPress,
}: {
  icon: string;
  bgColor: string;
  iconColor?: string;
  onPress?: () => void;
}) {
  return (
    <IconButtonDefault
      icon={icon}
      iconColor={iconColor}
      onPress={onPress}
      style={{
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
      }}
    />
  );
}
