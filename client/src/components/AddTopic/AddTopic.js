import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { atom, useRecoilValue } from 'jotai';


const defaultTheme = createTheme();

export default function AddTopic() {
    const [userQuestioner, setUserQuestioner] = useState({
        name: '',
        questionTitle: '',
        questionDescription: '',
        questionTag: 'Courses',
    });
    const [name, setName] = useState('');


    const navigate = useNavigate();

    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check if the token is present in localStorage
        const jwtToken = localStorage.getItem('token');
        setToken(jwtToken)
        const name = localStorage.getItem('name');
        setName(name)
        if (jwtToken) {
            // Token is present, decode it
            // const decoded = jwtDecode(jwtToken);
            // console.log("🚀 ~ useEffect ~ decoded:", decoded)
            console.log(`JWT Token: ${jwtToken}`);
            // Set the decoded token in state
            // setDecodedToken(decoded);
        } else {
            // Token is not present
            console.log('JWT Token not found');
        }
    }, []);

    // useEffect(() => {
    //     // // Check if the token is present in localStorage or cookies
    //     const getCookie = (name) => {
    //         const cookies = document.cookie.split('; ');

    //         for (const cookie of cookies) {
    //             const [cookieName, cookieValue] = cookie.split('=');

    //             if (cookieName === name) {
    //                 return decodeURIComponent(cookieValue);
    //             }
    //         }

    //         return null; // Return null if the cookie is not found
    //     };

    //     // Example usage
    //     const jwtToken = getCookie('jwt_cookie');
    //     console.log("🚀 ~ useEffect ~ jwtToken:", jwtToken)

    //     if (jwtToken) {
    //         // Token is present, you can use it in your application
    //         console.log(`JWT Token: ${jwtToken}`);
    //         setToken(jwtToken);  // Set the state to true if the token is present
    //     } else {
    //         // Token is not present
    //         console.log('JWT Token not found');
    //     }
    // }, []);


    const handleTitleChange = (e) => {
        let inputValue = e.target.value;
        setUserQuestioner({ ...userQuestioner, questionTitle: inputValue });
    };

    const handleDescriptionChange = (e) => {
        let inputValue = e.target.value;
        setUserQuestioner({ ...userQuestioner, questionDescription: inputValue });
    };

    const handleTagChange = (e) => {
        let inputValue = e.target.value;
        setUserQuestioner({ ...userQuestioner, questionTag: inputValue });
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        axios.post('/api/v1/questions/', {
            userQuestioner: name,
            questionTitle: userQuestioner.questionTitle,
            questionDescription: userQuestioner.questionDescription,
            questionTag: userQuestioner.questionTag
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then(response => {


                console.log("🚀 ~ handleSubmit ~ response:", response.data.status)

                if (response.data.status === "Success"
                ) {


                    navigate('/');
                    window.alert("Successfully posted question");
                    window.location.reload();

                } else {
                    window.alert("Question not posted");
                }


            })
            .catch(error => {
                console.log("🚀 ~ handleSubmit ~ error:", error.response.data.message)
                console.error('failed:', error);
                window.alert(error.response.data.message);
            });

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
                    <Typography sx={{ mt: 1 }} component="h1" variant="h5">
                        Add new Question
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <TextField
                            autoComplete="name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            value={name}

                            sx={{ margin: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            id="questionTitle"
                            label="Question Title"
                            name="questionTitle"
                            value={userQuestioner.questionTitle}
                            onChange={handleTitleChange}
                            sx={{ margin: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            id="questionDescription"
                            label="Question Description"
                            name="questionDescription"
                            value={userQuestioner.questionDescription}
                            onChange={handleDescriptionChange}
                            sx={{ margin: 2 }}
                        />
                        <FormControl fullWidth sx={{ margin: 2 }}>
                            <InputLabel id="questionTagLabel">Question Tag</InputLabel>
                            <Select
                                labelId="questionTagLabel"
                                id="questionTag"
                                name="questionTag"
                                label="Question Tag"
                                value={userQuestioner.questionTag}
                                onChange={handleTagChange}
                            >
                                <MenuItem value="Courses">Courses</MenuItem>
                                <MenuItem value="Jobs">Jobs</MenuItem>
                                <MenuItem value="Events">Events</MenuItem>
                                <MenuItem value="Sports">Sports</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 2 }}
                            onClick={handleSubmit}
                        >
                            Post
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
