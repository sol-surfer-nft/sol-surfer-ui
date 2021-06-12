import { colors, darkColors, ThemeColors } from './colors'
import { breakpoints, Breakpoints } from './breakpoints'

export const theme: Theme = {
  colors: {
    primary: colors.purple2,
    // secondary: colors.purple1
    bg1: colors.white,
    bg2: colors.white,
    bg3: colors.white,
    font: colors.black,
    iconBg: colors.lightGray,
    ...colors
  },
  breakpoints: breakpoints
}

export const darkTheme: Theme = {
  colors: {
    primary: colors.purple2,
    // secondary: colors.purple1
    bg1: darkColors.dark1,
    bg2: darkColors.dark2,
    bg3: darkColors.dark3,
    font: colors.white,
    iconBg: colors.gray,
    ...colors
  },
  breakpoints: breakpoints
}

export interface Theme {
  colors: ThemeColors
  breakpoints: Breakpoints
}

// All default antd style variables:
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
