import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Login from '../SignUp/Login';
import AddTopic from '../AddTopic/AddTopic';
import Navbar from '../Navbar/Navbar';

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
        >     <Navbar   />
          {/* Define your routes using Switch and Route */}
          <Routes>
       
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addTopic" element={<AddTopic />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;



