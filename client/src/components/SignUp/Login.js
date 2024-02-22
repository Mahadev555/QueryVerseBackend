import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import instance from '../../axiosInstance';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import google from './google.png'
const defaultTheme = createTheme();


function Login({ setisLoginOpen }) {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = (event) => {

        event.preventDefault();

        instance.post('/api/v1/users/login', { email, password })

            .then(response => {
                console.log("🚀 ~ handleSubmit ~ email:", email)
                console.log("🚀 ~ handleSubmit ~ password:", password)

                console.log("🚀 ~ handleSubmit ~ response:", response)
                if (response.data.userNotFound === true) {
                    window.alert("User not exists");
                } else {
                    if (response.data.status === "success"
                    ) {
                        const token = response.data.token;
                        console.log("🚀 ~ handleSubmit ~ token:", token)
                        localStorage.setItem("token", token);
                        // Assuming response.data.data.user is your user object
                        var userObject = response.data.data.user;
                        console.log("🚀 ~ handleSubmit ~ userObject:", userObject)
                        localStorage.setItem("name", response.data.data.user.name);
                        localStorage.setItem("profile", response.data.data.user.profileImage);
                        // Convert the user object to a JSON string
                        var userObjectString = JSON.stringify(userObject);
                        console.log("🚀 ~ handleSubmit ~ userObjectString:", userObjectString)

                        // Save the JSON string in local storage with a specific key (e.g., "user")
                        localStorage.setItem("user", userObjectString);

                        // window.location.reload()
                        navigate('/', {
                            state: {

                            }

                        });
                        window.location.reload()
                    } else {
                        window.alert("Entered wrong Password");
                    }
                }

            })
            .catch(error => {
                console.log("🚀 ~ handleSubmit ~ error:", error.response.data.message)
                console.error('Login failed:', error);
                window.alert(error.response.data.message);
            });

    };


    const handlePass = (e) => {
        let inputValue = e.target.value;
        setPassword(inputValue)
    }

    const handleEmail = (e) => {
        let inputValue = e.target.value;
        setEmail(inputValue)
    }

    return (
        <div>
            <ThemeProvider theme={defaultTheme} >
               

          

                        <Box
                            sx={{
                                my: 2,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={handleEmail}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={handlePass}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 1 }}>
                                   OR
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mb: 1, bgcolor: 'white' }}
                                >
                                    {/* <GoogleIcon sx={{ mx:2}} /> */}
                                  <img style={{width:'25px',margin:'2px 10px'}} src={google} />   Sign in with Google
                                </Button>
                                <IconButton
                                    sx={{ position: 'relative', top: -450, left: 460 }}
                                    onClick={() => setisLoginOpen(false).navigate('/')}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Box>
                    
    
            </ThemeProvider>
        </div>
    )
}




export default Login
