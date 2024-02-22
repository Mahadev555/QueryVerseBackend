import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Button } from '@mui/material';
import instance from '../../axiosInstance';
// Creating custom styles
const customStyle = makeStyles({
    root: {
        width: "fillParent",
        height: 'auto',
        backgroundColor: '#ffffff',
    },
    internalCardLayout: {
        width: "fillParent",
        height: 'auto',
        backgroundColor: '#ffffff',
    },
    bottomCardLayout: {
        width: "fillParent",
        height: 'auto',
        backgroundColor: '#ffffff',
    }
})

// Main QACard function
export default function AnswerCard(props) {
    const classes = customStyle();
    const [userVote, setUserVote] = useState(null);
    const [upvotes, setUpvotes] = useState(props.upv);
    const token = localStorage.getItem('token');
    useEffect(() => {

    }, [upvotes]);

    const handleVoteClick = async () => {


        try {
            if (!token) {

                window.alert(" please login for giving likes")
            }
            else {
                let newVote = null;

                if (userVote === 'upvote') {
                    // User already upvoted, toggle to downvote
                    newVote = 'downvote';
                    setUpvotes(upvotes - 1);
                } else {
                    // User either downvoted or never voted, toggle to upvote
                    newVote = 'upvote';
                    setUpvotes(upvotes + 1);
                }

                setUserVote(newVote);

                // Send the request to update the answer
                const response = await instance.patch(`/api/v1/answers/${props.answerId}`, {
                    upvotes: newVote === 'upvote' ? true : false,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status !== 203) {
                    console.error('Failed to update answer');
                }
            }
            } catch (error) {
                // Handle errors
                console.error('Error updating answer:', error);
            }
        
    };


    return (
        <div>
            <Box
                sx={{
                    mt: -2,
                    p: 2.5,
                    pb: 0,
                    ml: 36,
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
                    {/* The upvotes, downvotes, answer */}
                    <Grid item>
                        <Box
                            sx={{
                                borderRadius: 5
                            }}
                            className={classes.internalCardLayout}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs={1.5}
                                    sx={{

                                    }}
                                >
                                    <Stack
                                        direction="column"
                                        alignItems="center"
                                        spacing={2}
                                        sx={{
                                            mx: 1
                                        }}
                                    >


                                    </Stack>
                                </Grid>

                                <Grid
                                    item
                                    xs
                                    textAlign="left"
                                    pt={2}
                                    sx={{ mb: 1.2 }}

                                >
                                    <Stack spacing={3}>
                                        <Typography
                                            variant="h7"
                                            component="h7"
                                        >
                                            {props.ans}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* The Avatar, name, chat icon, number of comments */}
                    <Grid item>
                        <Box
                            sx={{
                                pl: 4.5,
                                mt: -2,
                                mb: 2
                            }}
                            className={classes.bottomCardLayout}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs
                                    sx={{
                                        ml: -2
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Avatar alt='user' src={props.prof} />
                                            <Typography
                                                sx={{
                                                    ml: 2,
                                                    mr: 1,
                                                    color: "#9e9e9e"
                                                }}
                                            >
                                                Answered by
                                            </Typography>
                                            <Typography sx={{
                                                color: "#6563ff"
                                            }}>
                                                {props.usr}
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <Button
                                                direction="row"
                                                alignItems="center"
                                                onClick={handleVoteClick}
                                                sx={{ marginRight: '4vh' }}
                                                spacing={2}
                                                p={1}
                                            >
                                                <ThumbUpAltIcon sx={{ color: userVote === 'upvote' ? "#1565c0" : "#9e9e9e", marginRight: "5px" }} />
                                                <Typography
                                                    sx={{
                                                        color: userVote === 'upvote' ? "#1565c0" : "#9e9e9e",
                                                    }}
                                                >
                                                    {upvotes}
                                                </Typography>
                                            </Button>
                                        </Stack>
                                    </div>

                                </Grid>

                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
