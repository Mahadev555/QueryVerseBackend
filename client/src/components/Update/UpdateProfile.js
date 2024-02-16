import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
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
import axios from 'axios'; 

const defaultTheme = createTheme();
 
const UpdateProfile = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [yearOfAdmission, setYearOfAdmission] = useState(2020);
    const [courseYear, setCourseYear] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState('');
    console.log("🚀 ~ UpdateProfile ~ profileImage:", profileImage)
    // Function to render course years
    function renderCourseYears() {
        const courseYears = ['FE', 'SE', 'TE', 'BE', 'Prof'];
        return courseYears.map((year) => (
            <MenuItem key={year} value={year}>
                {year}
            </MenuItem>
        ));
    }

    //stored object
    var token = localStorage.getItem("token");
    var storedUserObjectString = localStorage.getItem("user");
    var storedUserObject = JSON.parse(storedUserObjectString);
    useEffect(() => {
        // Set initial state values based on storedUserObject
        setFullName(storedUserObject.name || '');
        setEmail(storedUserObject.email || '');
        setAbout(storedUserObject.about || '');
        setYearOfAdmission(storedUserObject.yearOfAdmission || 2020);
        setCourseYear(storedUserObject.courseYear || '');
        setCurrentStatus(storedUserObject.currentStatus || '');
        setRole(storedUserObject.role || '');
        setProfileImage(storedUserObject.profileImage);
    }, []);


   // Frontend (React)
   const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'kfvd0fey'); // Replace with your actual unsigned upload preset

            const response = await axios.post('https://api.cloudinary.com/v1_1/detjwtn7c/image/upload', formData);

            // Assuming Cloudinary returns the image URL in the 'secure_url' field
            setProfileImage(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    }
};

    
    const submit = async () => {
        try {
            const response = await axios.patch(`/api/v1/users/updateMe`, {
                name: fullName,
                email: email,
                about: about,
                courseYear: courseYear,
                currentStatus: currentStatus,
                profileImage:profileImage
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                window.alert("Profile Updated Successfully");

            } else {
                window.alert("Failed to update profile");
            }
        } catch (error) {
            window.alert(error.response.data.message);
            console.error('Error updating profile:', error);
        }
    }




    return (
        <ThemeProvider theme={defaultTheme}>
            <Container sx={{ backgroundColor: '#ffffff', borderRadius: '10px', margin: '80px', marginLeft: '160px', padding: '80px', paddingTop: '10px' }}>
                <Box sx={{ marginTop: 8 }}>
                    <Grid container spacing={3}>
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
                                <label htmlFor="profileImage">
                                    <input
                                        type="file"
                                        id="profileImage"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <Avatar
                                        src={profileImage}
                                        alt="Profile Image"
                                        sx={{ width: 160, height: 160, borderRadius: '50%' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 108,
                                            right: 102,
                                            cursor: 'pointer',
                                            borderRadius: '50%',
                                            backgroundColor: '#f5f6fa',
                                            padding: '8px',
                                        }}
                                    >
                                        <AddAPhotoIcon color="primary" />
                                    </Box>
                                </label>
                                <Typography color="primary" variant="h5" sx={{ marginTop: 4 }}>{storedUserObject.name}</Typography>
                                <Typography variant="subtitle1" sx={{ color: '#757575' }}>{storedUserObject.email}</Typography>
                            </Box>
                            <Box md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography color="primary" variant="h5">About</Typography>
                                <Typography variant="body1" sx={{ color: '#656566', fontSize: '0.825rem', padding: '0 50px ', marginTop: 1 }}>
                                    {storedUserObject?.about}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ padding: 2 }}>
                                <Typography variant="h6" color="primary" sx={{ marginBottom: 2 }}>Personal Details</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Full Name"
                                            variant="outlined"
                                            fullWidth
                                            value={fullName}

                                            onChange={(e) => setFullName(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <Button sx={{ marginRight: '-15px' }} onClick={() => setFullName('')}>
                                                        <EditIcon color="primary" />
                                                    </Button>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            fullWidth
                                            value={email}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            label="About"
                                            variant="outlined"
                                            fullWidth
                                            value={about}
                                            onChange={(e) => setAbout(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <Button sx={{ marginRight: '-15px' }} onClick={() => setAbout('')}>
                                                        <EditIcon color="primary" />
                                                    </Button>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Year of Admission"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            value={yearOfAdmission}
                                            onChange={(e) => setYearOfAdmission(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <Button sx={{ marginRight: '-15px' }} onClick={() => setYearOfAdmission('')}>
                                                        <EditIcon color="primary" />
                                                    </Button>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="courseYearLabel">Course Year</InputLabel>
                                            <Select
                                                labelId="courseYearLabel"
                                                id="courseYear"
                                                name="courseYear"
                                                label="Course Year"
                                                value={courseYear}
                                                onChange={(e) => setCourseYear(e.target.value)}
                                            >
                                                {renderCourseYears()}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="currentStatusLabel">Current Status</InputLabel>
                                            <Select
                                                labelId="currentStatusLabel"
                                                id="currentStatus"
                                                name="currentStatus"
                                                label="Current Status"
                                                value={currentStatus}
                                                onChange={(e) => setCurrentStatus(e.target.value)}
                                            >
                                                <MenuItem value="Student">Student</MenuItem>
                                                <MenuItem value="Passout">Passout</MenuItem>
                                                <MenuItem value="Dropout">Dropout</MenuItem>
                                                <MenuItem value="Professor">Professor</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="roleLabel">Role</InputLabel>
                                            <Select
                                                labelId="roleLabel"
                                                id="role"
                                                name="role"
                                                label="Role"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <MenuItem value="Student">Student</MenuItem>
                                                <MenuItem value="Professor">Professor</MenuItem>
                                                <MenuItem value="Admin">Admin</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="outlined" sx={{ marginRight: 2 }} onClick={() => { navigate('/'); }}>Cancel</Button>
                                    <Button variant="contained" onClick={submit} color="primary">Update</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default UpdateProfile;
