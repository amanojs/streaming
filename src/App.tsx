import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './config/theme';
import { Routes } from './config/route';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
