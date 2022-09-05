import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { ThemeOptions } from '@mui/material'

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#6735a0',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
    info: {
      main: '#218df3',
    },
  },
}

export const theme = createTheme(themeOptions)
