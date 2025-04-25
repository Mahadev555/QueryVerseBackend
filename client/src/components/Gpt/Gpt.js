import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    main: {
        margin: 0,
        padding: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '88vh',
        marginLeft:8
    },
    chatContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '95%',
    },
    chatArea: {
        flexGrow: 1,
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
        height: '67vh',
        width: '25%',
        overflowY: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
    },
    chatTitle: {
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
        marginTop: 0,
        fontSize: '3vh',
        position:'fixed',
        width:'50%'
        
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(1),
        width: '50%',
        marginBottom: theme.spacing(2),
        justifyContent: 'center',
    },
    userInput: {
        flexGrow: 1,
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid #eee`,
        height: '40px',
        paddingLeft: theme.spacing(2),
        boxShadow: theme.shadows[2],
        marginTop: 5,
    },
    sendButton: {
        marginTop: 5,
        padding: theme.spacing(1, 2),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        border: 'none',
        cursor: 'pointer',
        height: '50px',
        width: 100,
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: theme.spacing(1),
        marginTop:"60px"
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        maxWidth: '80%',
        textAlign: 'right',
    },
    chatbotMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        maxWidth: '80%',
        textAlign: 'left',
    },
}));

const defaultTheme = createTheme();

function Gpt() {
    const classes = useStyles();
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!userInput.trim()) {
            return;
        }

        const newUserMessage = {
            id: new Date().getTime(),
            content: userInput.trim(),
            isUser: true,
        };

        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setUserInput('');

        try {
            const chatGPTResponse = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo-0125',
                    messages: [{ role: 'user', content: userInput }],
                    max_tokens: 100,
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.API_KEY}`,
                    },
                }
            );
            const chatResponse = chatGPTResponse.data.choices[0].message.content;
            addChatGPTMessage(chatResponse);
        } catch (error) {
            console.error(error);
            addChatGPTMessage('Error: Unable to process your request.');
        }
    };

    const addChatGPTMessage = (message) => {
        const newChatMessage = {
            id: new Date().getTime(),
            content: message,
            isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, newChatMessage]);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box className={classes.main}>
                <Box className={classes.chatContainer}>
                    <Box className={classes.chatArea}>
                        <h3 className={classes.chatTitle}>Query-Verse GPT</h3>
                        <div className={classes.messageContainer}>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={
                                        message.isUser ? classes.userMessage : classes.chatbotMessage
                                    }
                                >
                                    {message.content}
                                </div>
                            ))}
                        </div>
                    </Box>
                </Box>
                <div className={classes.inputContainer}>
                    <input
                        type="text"
                        id="userInput"
                        placeholder="Type your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className={classes.userInput}
                    />
                    <button id="sendButton" onClick={sendMessage} className={classes.sendButton}>
                        Send
                    </button>
                </div>
            </Box>
        </ThemeProvider>
    );
}

export default Gpt;
