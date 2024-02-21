import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SkeletonQACard from '../QACard/SkeletonQACard';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import instance from '../../axiosInstance';
import WebDevelopmentImage from "./web-development.svg";

const defaultTheme = createTheme();

const AllUserProfile = (props) => {
   
    const navigate = useNavigate();
    

     
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container sx={{ backgroundColor: '#ffffff', borderRadius: '10px', margin: '80px', marginLeft: '160px', padding: '80px', paddingBottom: '20px', paddingTop: '10px' }}>
                <Box sx={{display:'flex', flexDirection:'column' , alignItems:'center', justifyContent:'center',  padding: 4 }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight:'500' ,justifyContent:'center', marginBottom: 4 }}>Coming Soon</Typography>
                    <img style={{height:'40vh'}} src={WebDevelopmentImage}></img>
                     
    
                        <Button variant="outlined" sx={{ marginTop: 8 }} onClick={() => { navigate('/'); }}>Go Back</Button>
                     
                </Box> 
            </Container>
        </ThemeProvider>
    );
};

export default AllUserProfile;
