import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    h5: {
      fontSize: 30,
      fontWeight: 700,
      color: '#472D68',
      fontFamily: 'Roboto Condensed',
    },
    h3: {
      fontSize: 70,
      fontWeight: 700,
      color: '#472D68',
      fontFamily: 'Roboto Condensed',
    },
    h6: {
      fontSize: 20,
      color: '#472D68',
      fontFamily: 'Roboto Condensed',
    },
  },
  palette: {
    primary: {
      main: '#6750A4',
    },
  },
});

const Theme: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
