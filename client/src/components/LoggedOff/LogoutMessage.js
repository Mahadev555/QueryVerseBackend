import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import WebDevelopmentImage from "./web-development.svg";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Red color for the button
    },
  },
});

const LogoutMessage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ backgroundColor: '#ffcfcf', borderRadius: '10px', margin: '80px', marginLeft: '160px', padding: '80px', paddingBottom: '20px', paddingTop: '10px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
          <Typography variant="h4" color="primary" sx={{ fontWeight: '500', justifyContent: 'center', marginBottom: 4 }}>You are logged off, please go back and login</Typography>
          <img style={{ height: '40vh' }} src={WebDevelopmentImage} alt="Web Development" />
          <Button variant="outlined" sx={{ marginTop: 8, backgroundColor: '#ffdddd', color: '#ff0000' }} onClick={() => { navigate('/'); }}>Go Back</Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LogoutMessage;
