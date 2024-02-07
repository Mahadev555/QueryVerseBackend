import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useState } from 'react';
import axios from 'axios';

function renderCourseYears() {
    const courseYears = ['FE', 'SE', 'TE', 'BE', 'Prof'];
    return courseYears.map((year) => (
        <MenuItem key={year} value={year}>
            {year}
        </MenuItem>
    ));
}

function renderRoles() {
    const roles = ['Student', 'Professor', 'Admin'];
    return roles.map((role) => (
        <MenuItem key={role} value={role}>
            {role}
        </MenuItem>
    ));
}

function renderStatuses() {
    const statuses = ['Student', 'Passout', 'Dropout', 'Professor'];
    return statuses.map((status) => (
        <MenuItem key={status} value={status}>
            {status}
        </MenuItem>
    ));
}

const defaultTheme = createTheme();

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [yearOfAdmission, setYearOfAdmission] = useState('');
    const [courseYear, setCourseYear] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [role, setRole] = useState('');

    const handleConfirmPass = (e) => {
        let inputValue = e.target.value;
        setPasswordConfirm(inputValue);
    };

    const handleNameChange = (e) => {
        let inputValue = e.target.value;
        setName(inputValue);
    };

    const handleEmailChange = (e) => {
        let inputValue = e.target.value;
        setEmail(inputValue);
    };

    const handlePasswordChange = (e) => {
        let inputValue = e.target.value;
        setPassword(inputValue);
    };

    const handleYearOfAdmissionChange = (e) => {
        let inputValue = e.target.value;
        setYearOfAdmission(inputValue);
    };

    const handleCourseYearChange = (e) => {
        let inputValue = e.target.value;
        setCourseYear(inputValue);
    };

    const handleCurrentStatusChange = (e) => {
        let inputValue = e.target.value;
        setCurrentStatus(inputValue);
    };

    const handleRoleChange = (e) => {
        let inputValue = e.target.value;
        setRole(inputValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("🚀 ~ SignUp ~ currentStatus:", currentStatus);
        console.log("🚀 ~ SignUp ~ name:", name);
        console.log("🚀 ~ SignUp ~ courseYear:", courseYear);
        console.log("🚀 ~ SignUp ~ yearOfAdmission:", yearOfAdmission);
        console.log("🚀 ~ SignUp ~ password:", password);
        console.log("🚀 ~ SignUp ~ email:", email);

        try {
            // Make an Axios POST request to your backend API
            const response = await axios.post('api/v1/users/signup', {
                
                name:name,
                email:email,
                password:password,
                passwordConfirm:passwordConfirm,
                yearOfAdmission:yearOfAdmission,
                courseYear:courseYear,
                currentStatus:currentStatus,
                role:role, 
            });
            console.log("🚀 ~ handleSubmit ~ response:", response)
         
          

            // Handle the response as needed
            console.log(response.data);

            // Reset the form data after successful submission
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirm('');
            setYearOfAdmission('');
            setCourseYear('');
            setCurrentStatus('');
            setRole('');
            
            window.alert("Submitted");
        } catch (error) {
            // Handle errors
            window.alert(error.response.data.message );
            console.error('Error submitting form:', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="Name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Name"
                                    autoFocus
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Confirm Password"
                                    type="password"
                                    id="passwordConfirm"
                                    autoComplete="new-password"
                                    value={passwordConfirm}
                                    onChange={handleConfirmPass}
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="yearOfAdmission"
                                    label="Year of Admission"
                                    type="number"
                                    id="yearOfAdmission"
                                    value={yearOfAdmission}
                                    onChange={handleYearOfAdmissionChange}
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
                                        onChange={handleCourseYearChange}
                                    >
                                        {renderCourseYears()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="statusLabel">Current Status</InputLabel>
                                    <Select
                                        labelId="statusLabel"
                                        id="currentStatus"
                                        name="currentStatus"
                                        label="Current Status"
                                        value={currentStatus}
                                        onChange={handleCurrentStatusChange}
                                    >
                                        {renderStatuses()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="roleLabel">Role</InputLabel>
                                    <Select
                                        labelId="roleLabel"
                                        id="role"
                                        name="role"
                                        label="Role"
                                        value={role}
                                        onChange={handleRoleChange}
                                    >
                                        {renderRoles()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
