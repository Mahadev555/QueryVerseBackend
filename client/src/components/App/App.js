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
import JobCenter from '../Job/JobCenter';
import AllUserProfile from '../Profile/AllUserProfile';
import ComingSoonComponent from '../CommingSoon/ComingSoonComponent';
import LogoutMessage from '../LoggedOff/LogoutMessage';
import Gpt from '../Gpt/Gpt';

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

  const [isLoginOpen, setisLoginOpen] = useState(false);
  const [isSignUpopen, setisSignUpopen] = useState(false);


  return (
    <ThemeProvider theme={customTheme}>
      
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Navbar
            isLoginOpen={isLoginOpen}
            setisLoginOpen={setisLoginOpen}
            isSignUpopen={isSignUpopen}
            setisSignUpopen={setisSignUpopen}
            setModalOpen={setModalOpen}
            isModalOpen={isModalOpen} />
          <Routes>
            <Route path="/" element={<Home
              isModalOpen={isModalOpen}
              isLoginOpen={isLoginOpen}
              setisLoginOpen={setisLoginOpen}
              isSignUpopen={isSignUpopen}
              setisSignUpopen={setisSignUpopen}
            />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addTopic" element={<AddTopic />} />
            <Route path="/update" element={<UpdateProfile />} />
            <Route path="/job" element={<JobCenter />} />
            <Route path="/Gpt" element={<Gpt />} />
            <Route path="/s/:userId" element={<AllUserProfile />} />
            <Route path="/cs" element={<ComingSoonComponent />} />
            <Route path="/logout" element={<LogoutMessage />} />

          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
