// color1 is darkest of set, progresses lighter and lighter

export const colors: Colors = {
  purple1: "#5D5FEF",
  purple2: "#7879F1",
  purple3: "#A5A6F6",
  pink: "#FCDDEC",
  orange: "#F9C78D",
  lime: "#EFFFCE",
  gray: "#333",
  lightGray: "#EEE",
  white: "#fff",
  black: "#000",
  red: "#ff7875",
  green: "#52c41a"
}

export const darkColors = {
  dark1: "#181818",
  dark2: "#212121",
  dark3: "#3D3D3D",
  white: "#fff",
}

export interface Colors {
  purple1: string
  purple2: string
  purple3: string
  pink: string
  orange: string
  lime: string
  gray: string
  lightGray: string
  white: string
  black: string
  red: string
  green: string
}

export interface ThemeColors extends Colors {
  primary: string
  // secondary: string
  bg1: string
  bg2: string
  bg3: string
  font: string
  iconBg: string
}