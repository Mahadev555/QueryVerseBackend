import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

// Creating custom styles
const customStyle = makeStyles({
    root: {
        width: "fillParent",
        height: 150,
        backgroundColor: '#ffffff',
    },
    internalCardLayout: {
        width: "fillParent",
        height: 100,
        backgroundColor: '#ffffff',
    },
    bottomCardLayout: {
        width: "fillParent",
        height: 0,
        backgroundColor: '#ffffff',
    },
    textarea: {
        width: "90%",
        height:"100%",
        resize: "none",
        border: "1px solid #9e9e9e",
        borderRadius: 5,
        padding: "10px",
        marginTop: "10px",
        fontSize: "14px",
        marginRight:'20px', 
        fontFamily: 'Segoe UI', 
    },
    addButton: {
        marginTop: "10px",
        float: "right",
        marginRight:'30px',
        backgroundColor:"#6c22ba",color:"#ffffff",

    }
});

// Main QACard function
export default function AddAnswer(id) {
    console.log("🚀 ~ AddAnswer ~ id:", id.id)
    const classes = customStyle();
    const [answerText, setAnswerText] = useState('');
    const [token, setToken] = useState(null);
    // Retrieve the JSON string from local storage
    var storedUserObjectString = localStorage.getItem("user");

    // Convert the JSON string back to a JavaScript object
    var storedUserObject = JSON.parse(storedUserObjectString);
    useEffect(() => {
        // Check if the token is present in localStorage
        const jwtToken = localStorage.getItem('token');
        setToken(jwtToken)
         
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

    const handleSubmit = (event) => {

        event.preventDefault();

        axios.post(`https://query-z4fe.onrender.com/api/v1/answers/${id.id}`, {
            profileImage: storedUserObject.profileImage,
            userAnswerer: storedUserObject.name,
            answer:answerText
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then(response => {


                console.log("🚀 ~ handleSubmit ~ response:", response.data.status)

                if (response.data.status === "Success"
                ) {

                    setAnswerText('');
                    window.location.reload();
                    window.alert("Successfully posted Answer");


                } else {
                    window.alert("Answer not posted");
                }


            })
            .catch(error => {
                console.log("🚀 ~ handleSubmit ~ error:", error.response.data.message)
                console.error('failed:', error);
                window.alert(error.response.data.message);
            });

    };

     

    return (
        <div>
            <Box
                sx={{
                    mt: -2,
                    p: 2.5,
                    pb: 0,
                    ml: 28,
                    mb: 3,
                    borderRadius: 5,
                    width: '600px',
                    height: 'auto',
                    boxShadow: 5
                }}
                className={classes.root}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={2}
                >
                    {/* The textarea input field */}
                    <Grid item>
                        <Box
                            sx={{
                                borderRadius: 5
                            }}
                            className={classes.internalCardLayout}
                        >
                            <TextareaAutosize
                                aria-label="answer"
                                placeholder="Your answer here..."
                                minRows={3}
                                className={classes.textarea}
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                            />
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.addButton}
                                onClick={handleSubmit}
                            >
                                Add
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
