import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { ThemeOptions } from '@mui/material'
// import RobotoSlabTTF from './RobotoSlab-VariableFont_wght.ttf'

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#b5926d',
    },
    secondary: {
      main: '#4a6741',
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
    info: {
      main: '#218df3',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}

export const theme = createTheme(themeOptions)
