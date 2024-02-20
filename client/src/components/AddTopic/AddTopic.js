import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../../axiosInstance';
const defaultTheme = createTheme();

export default function AddTopic({ isDialogOpen, setDialogOpen }) {
    const [userQuestioner, setUserQuestioner] = useState({
        name: '',
        questionTitle: '',
        questionDescription: '',
        questionTag: 'Courses',
    });


    const [token, setToken] = useState(null);
    var storedUserObjectString = localStorage.getItem("user");
    var storedUserObject = JSON.parse(storedUserObjectString);

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        setToken(jwtToken);
        if (jwtToken) {
            console.log(`JWT Token: ${jwtToken}`);
        } else {
            console.log('JWT Token not found');
        }
    }, []);

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

        instance.post('/api/v1/questions/', {
          
            userQuestioner: storedUserObject.name,
            questionTitle: userQuestioner.questionTitle,
            questionDescription: userQuestioner.questionDescription,
            questionTag: userQuestioner.questionTag,
            profileImage: storedUserObject.profileImage
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log("🚀 ~ handleSubmit ~ response:", response.data.status)
            if (response.data.status === "Success") {
                setDialogOpen(!isDialogOpen)
                window.alert("Successfully posted question");
            } else {
                window.alert("Question not posted");
            }
        }).catch(error => {
            console.log("🚀 ~ handleSubmit ~ error:", error.response.data.message)
            console.error('failed:', error);
            window.alert(error.response.data.message);
        });
    };

    return (
        <ThemeProvider  theme={defaultTheme}>
            <Container sx={{
                marginTop:'-40px'
            }} component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        position: 'relative',
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
                            Post as a {storedUserObject.name}
                        </Button>
                        <IconButton
                            sx={{ position: 'absolute', top: 0, right: 0 }}
                            onClick={() => setDialogOpen(false).navigate('/')}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
