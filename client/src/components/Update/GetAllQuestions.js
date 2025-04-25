import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import instance from '../../axiosInstance';

const customStyle = makeStyles({
    root: {
        width: 'fillParent',
        height: 200,
        backgroundColor: '#ffffff',
        position: 'relative', // Added to enable absolute positioning
    },
    internalCardLayout: {
        width: 'fillParent',
        height: 150,
        backgroundColor: '#ffffff',
    },
    bottomCardLayout: {
        width: 'fillParent',
        height: 40,
        backgroundColor: '#ffffff',
    },
    deleteIcon: {
        position: 'absolute',
        top: 30,
        right: 110,
        cursor: 'pointer',
        color: '#6563ff ',
    },
});

function GetAllQuestions(props) {
    const classes = customStyle();
    var token = localStorage.getItem("token");
    var storedUserObjectString = localStorage.getItem("user");
    var storedUserObject = JSON.parse(storedUserObjectString);

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const deleteQuestion = async () => {
        try {
            // Replace 'YOUR_API_ENDPOINT' with the actual endpoint where your deleteQuestion API is hosted.
            const response = await instance.delete(`/api/v1/questions/${props.id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the authorization header if needed
                }
            });

            if (response.status === 202) {
                // The question was deleted successfully
                console.log('Question deleted successfully');
                setOpenDialog(false)
                props.setisAllQues(false)
            } else {
                console.log(response)
                console.error('Failed to delete question');

                // Handle the error or update the UI accordingly
            }
        } catch (error) {
            console.error('Error deleting question:', error);
            // Handle the error or update the UI accordingly
        }
    };


    return (
        <div style={{ width: '80%' }}>
            <Box
                sx={{
                    p: 2.5,
                    borderRadius: 5,
                    boxShadow: 5,
                    mb: 3,
                }}
                className={classes.root}
            >
                {/* Delete Icon */}
                <DeleteIcon onClick={handleOpenDialog} fontSize="large" className={classes.deleteIcon} />

                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={2}
                >
                    {/*The upvotes, downvotes, question, description*/}
                    <Grid item>
                        <Box
                            sx={{
                                borderRadius: 5,
                            }}
                            className={classes.internalCardLayout}
                        >
                            <Grid container>
                                <Grid item xs={1.5} sx={{ mr: 2 }}>
                                    <Stack
                                        direction="column"
                                        alignItems="center"
                                        spacing={2}
                                        sx={{
                                            m: 2,
                                        }}
                                    >
                                        <ArrowUpwardIcon size="large" sx={{ color: '#6563ff' }} />
                                        <Typography style={{ fontWeight: 600 }} sx={{ color: '#6563ff' }}>
                                            {props.upv}
                                        </Typography>
                                        <ArrowDownwardIcon size="large" />
                                    </Stack>
                                </Grid>

                                <Grid item xs textAlign="left" pt={4}>
                                    <Stack spacing={3}>
                                        <Typography variant="h5" component="h5">
                                            {props.title}
                                        </Typography>
                                        <Typography sx={{ color: '#9e9e9e' }}>{props.desc}</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/*The Avatar, name, chat icon, number of comments*/}
                    <Grid item>
                        <Box sx={{ pl: 4.5 }} className={classes.bottomCardLayout}>
                            <Grid container>
                                <Grid item xs sx={{ mr: 2 }}>
                                    <Stack direction="row" alignItems="center">
                                        <Avatar alt="User Profile" src={props.prof} />
                                        <Typography ml={2} mr={1} color="#9e9e9e">
                                            Published by
                                        </Typography>
                                        <Typography sx={{ color: '#6563ff' }}>{props.usr}</Typography>
                                    </Stack>
                                </Grid>

                                <Grid item xs={2}>
                                    <Button direction="row" alignItems="center" spacing={2} p={1}>
                                        <ChatBubbleOutlineIcon sx={{ color: '#9e9e9e', marginRight: '5px' }} />
                                        <Typography sx={{ color: '#9e9e9e' }}>{props.ans.length}</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this question?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={deleteQuestion} color="primary">
                            Yes, Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

        </div>

    );
}

export default GetAllQuestions;
