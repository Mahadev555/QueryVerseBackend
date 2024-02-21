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

const defaultTheme = createTheme();

const AllUserProfile = (props) => {
    const [fullName, setFullName] = useState('');
    const [about, setAbout] = useState('');
    const [yearOfAdmission, setYearOfAdmission] = useState(2020);
    const [courseYear, setCourseYear] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState('');

    //stored object
    var storedUserObjectString = localStorage.getItem("user");
    var storedUserObject = JSON.parse(storedUserObjectString);

    useEffect(() => {
        // Set initial state values based on storedUserObject
        setFullName(props.name || '');
        setAbout(props.about || '');
        setYearOfAdmission(props.yearOfAdmission || '');
        setCourseYear(props.courseYear || '');
        setCurrentStatus(props.currentStatus || '');
        setRole(props.role || '');
        setProfileImage(props.profileImage);
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container sx={{ backgroundColor: '#ffffff', borderRadius: '10px', margin: '80px', marginLeft: '160px', padding: '80px', paddingBottom: '50px', paddingTop: '10px' }}>
                <Box sx={{ padding: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 2,
                                    marginBottom: 2,
                                    position: 'relative',
                                }}
                            >
                                <Avatar
                                    src={profileImage}
                                    alt="Profile Image"
                                    sx={{ width: 160, height: 160, borderRadius: '50%' }}
                                />
                                 
                                <Typography color="primary" variant="h5" sx={{ marginTop: 4 }}>{storedUserObject.name}</Typography>
                                <Typography variant="subtitle1" sx={{ color: '#757575' }}>{storedUserObject.email}</Typography>
                             
                                        <Typography color="primary" variant="subtitle1" sx={{  marginTop: 4,  fontWeight: 'bold' }}>About</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            
                                        >
                                            {about}
                                        </Typography>
                                   
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ padding: 2 }}>
                                <Typography variant="h6" color="primary" sx={{ marginBottom: 2 }}>Personal Details</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Full Name</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{  borderRadius: '5px',  display: 'block', width: '100%' }}
                                        >
                                            {fullName}
                                        </Typography>
                                    </Grid>
                                   
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Year of Admission</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{  borderRadius: '5px',  display: 'block', width: '100%' }}
                                        >
                                            {yearOfAdmission}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Course Year</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{   borderRadius: '5px',   display: 'block', width: '100%' }}
                                        >
                                            {courseYear}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Current Status</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{   borderRadius: '5px',  display: 'block', width: '100%' }}
                                        >
                                            {currentStatus}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Role</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{   borderRadius: '5px',   display: 'block', width: '100%' }}
                                        >
                                            {role}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{  display: 'flex', justifyContent: 'flex-end' }}>
    
                        <Button variant="outlined" sx={{ marginRight: 2 }} onClick={() => { navigate('/'); }}>Go Back</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default AllUserProfile;
