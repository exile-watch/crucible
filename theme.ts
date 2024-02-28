import {createTheme, MantineColorsTuple} from "@mantine/core";

const sand: MantineColorsTuple = [
  "#fff9e6",
  "#fdf2d2",
  "#f9e4a4",
  "#f6d571",
  "#f4c848",
  "#f2c02e",
  "#f2bc21",
  "#d7a515",
  "#bf930a",
  "#a67e00"
]

export const theme = createTheme({
  primaryColor: 'sand',
  colors: {
    sand
  },
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
    xxl: '120em', // 1920px
    xxxl: '160em', // 2560px
  }
});
