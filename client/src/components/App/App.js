import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Login from '../SignUp/Login';
import AddTopic from '../AddTopic/AddTopic';
import Navbar from '../Navbar/Navbar';
import UpdateProfile from '../Update/UpdateProfile';

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
  const [isModalOpen, setModalOpen] = useState(false);
  console.log("🚀 ~ App ~ isModalOpen:", isModalOpen)

  
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Navbar setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
          <Routes>
            <Route path="/" element={<Home isModalOpen={isModalOpen} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addTopic" element={<AddTopic />} />
            <Route path="/update" element={<UpdateProfile />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
