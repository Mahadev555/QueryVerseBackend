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

const defaultTheme = createTheme();

const AllUserProfile = (props) => {
   
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});
    console.log("🚀 ~ AllUserProfile ~ userProfile:", userProfile)
    //get userID from that url
    const { userId } = useParams();

    

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await instance.get(`/api/v1/users/getuser/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUserProfile(response.data.data.user);
          } catch (error) {
            console.error('Error fetching user profile:', error);
          } 
        //   finally {
        //     setLoading(false);
        //   }
        };
    
        fetchUserProfile();
      }, [userId]);

      
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
                                    src={userProfile.profileImage}
                                    alt="Profile Image"
                                    sx={{ width: 160, height: 160, borderRadius: '50%' }}
                                />
                                 
                                <Typography color="primary" variant="h5" sx={{ marginTop: 4 }}>{userProfile.name}</Typography>
                                <Typography variant="subtitle1" sx={{ color: '#757575' }}>{userProfile.email}</Typography>
                             
                                        <Typography color="primary" variant="subtitle1" sx={{  marginTop: 4,  fontWeight: 'bold' }}>About</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            
                                        >
                                            {userProfile.about}
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
                                            {userProfile.name}
                                        </Typography>
                                    </Grid>
                                   
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Year of Admission</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{  borderRadius: '5px',  display: 'block', width: '100%' }}
                                        >
                                            {userProfile.yearOfAdmission}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Course Year</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{   borderRadius: '5px',   display: 'block', width: '100%' }}
                                        >
                                            {userProfile.courseYear}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Current Status</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{   borderRadius: '5px',  display: 'block', width: '100%' }}
                                        >
                                            {userProfile.currentStatus}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Role</Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{   borderRadius: '5px',   display: 'block', width: '100%' }}
                                        >
                                            {userProfile.role}
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
