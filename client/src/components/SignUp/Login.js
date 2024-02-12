import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import { jwtDecode } from "jwt-decode";

const defaultTheme = createTheme();


function Login() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [logged, setlogged] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = (event) => {
         
        event.preventDefault();
    
        axios.post('/api/v1/users/login', { email, password })
            
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
                        localStorage.setItem("token",token);
                        localStorage.setItem("name",response.data.data.user.name)

                        navigate('/', {
                            state: {
                                
                            }
                                
                        });
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
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
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
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}




export default Login
