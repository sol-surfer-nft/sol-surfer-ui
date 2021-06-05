import { colors, darkColors, ThemeColors } from './colors'

export const theme: Theme = {
  colors: {
    primary: colors.purple2,
    // secondary: colors.purple1
    bg1: colors.white,
    bg2: colors.white,
    bg3: colors.white,
    ...colors
  }
}

export const darkTheme: Theme = {
  colors: {
    primary: colors.purple2,
    // secondary: colors.purple1
    bg1: darkColors.dark1,
    bg2: darkColors.dark2,
    bg3: darkColors.dark3,
    ...colors
  }
}

export interface Theme {
  colors: ThemeColors
  // ...
}

// All default variables
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less