import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import { ThemeOptions } from '@mui/material'

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
    fontSize: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { minWidth: 0 },
      },
    },
  },
}

export const theme = createTheme(themeOptions)
