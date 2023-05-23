import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5eada6',
    secondary: '#ea568c',
    text: '#eee',
    background: '#303030',
    paper: '#424242',
  },
};

// primary: string;
// primaryContainer: string;
// secondary: string;
// secondaryContainer: string;
// tertiary: string;
// tertiaryContainer: string;
// surface: string;
// surfaceVariant: string;
// surfaceDisabled: string;
// background: string;
// error: string;
// errorContainer: string;
// onPrimary: string;
// onPrimaryContainer: string;
// onSecondary: string;
// onSecondaryContainer: string;
// onTertiary: string;
// onTertiaryContainer: string;
// onSurface: string;
// onSurfaceVariant: string;
// onSurfaceDisabled: string;
// onError: string;
// onErrorContainer: string;
// onBackground: string;
// outline: string;
// outlineVariant: string;
// inverseSurface: string;
// inverseOnSurface: string;
// inversePrimary: string;
// shadow: string;
// scrim: string;
// backdrop: string;
// elevation: MD3ElevationColors;

export type AppTheme = typeof theme;
