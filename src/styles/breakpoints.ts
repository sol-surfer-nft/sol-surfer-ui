export interface Breakpoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export const breakpoints: Breakpoints = {
  xs: 576, // < 576
  sm: 576, // >= 576
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
}