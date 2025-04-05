// AppTheme.jsx
import { createTheme } from '@mui/material/styles';

const AppTheme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' if you want dark mode
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default AppTheme;
