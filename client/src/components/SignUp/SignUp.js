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

import { useNavigate } from 'react-router-dom';
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

const defaultTheme = createTheme();

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [yearOfAdmission, setYearOfAdmission] = useState('');
    const [courseYear, setCourseYear] = useState('');
    const [isTap, setIsTap] = useState(false);
    const [otp, setOTP] = useState('');
    const navigate = useNavigate();

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

    const handleForm = async () => {
        if (!name || !email || !password || !passwordConfirm || !courseYear || !yearOfAdmission) {
            window.alert("fill all details")
        }
    };


    const handleOtp = async (event) => {
        event.preventDefault();
        if (!name || !email || !password || !passwordConfirm || !courseYear || !yearOfAdmission) {
            window.alert("fill all details")
        } else if (password.length <= 8) {
            window.alert("password length should be more than 8 ")
        } else if (password != passwordConfirm) {

            window.alert("Password & Confirm password not matching");

        }
        else {
            try {
                const response = await axios.post('api/otp/sendOtp', {

                    email: email,

                });
                console.log("🚀 ~ handleOtp ~ response:", response)
                if (response.data.userExist === true) {

                    window.alert("user already exists");

                } else if (response.data.error === true) {

                    window.alert("OTP already sent");

                } else if (response.data.send === true) {

                    window.alert("OTP snet to email : " + email);
                    setIsTap(true)
                } else {
                    window.alert("OTP not sent");
                }
            } catch (error) {
                window.alert("enter all details carefully || internal server error");
                console.error('Error submitting form:', error);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('api/otp/verifyOtp', {
                email: email,
                EnteredOtp: otp
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response.data.otpMatch === true) {
                    submit()

                }
                else {
                    window.alert("Incorrect OTP , Please go back")
                }




            })
            console.log("🚀 ~ verifyOtp ~ EnteredOtp:", otp)

            // Additional actions after the API call if needed
        } catch (error) {
            console.error("Error adding name and email:", error);
        }



    };

    const submit = async () => {
        try {
            const response = await axios.post('api/v1/users/signup', {
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm,
                yearOfAdmission: yearOfAdmission,
                courseYear: courseYear,
            });

            if (response.status === 201) {
                setName('');
                setEmail('');
                setPassword('');
                setPasswordConfirm('');
                setYearOfAdmission('');
                setCourseYear('');
                window.alert("Submitted");
                navigate('/')

            } else {
                window.alert("exists");
            }
        } catch (error) {
            window.alert(error.response.data.message);
            console.error('Error submitting form:', error);
        }
    }

    const signUpForm = (
        <ThemeProvider theme={defaultTheme}>
            <Container  component="main" maxWidth="xs">
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleOtp}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

    const verificationForm = (
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
                        Verification
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        {/* Add your verification form elements here */}
                        <TextField
                            required
                            fullWidth
                            name="otp"
                            label="Enter OTP"
                            type="text"
                            id="otp"
                            autoComplete="off"
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Verify OTP
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

    return isTap ? verificationForm : signUpForm;
}
