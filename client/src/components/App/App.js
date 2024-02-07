import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#fffff',
    },
    secondary: {
      main: '#9900cc',
    },
    success: {
      main: '#9900cc',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Define your routes using Switch and Route */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Add more routes as needed */}
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
