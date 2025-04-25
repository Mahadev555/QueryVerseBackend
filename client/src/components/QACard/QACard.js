//Importing external files/modules
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import AnsContainer from './AnsContainer';
import AddIcon from '@mui/icons-material/Add';
import AddAnswer from './AddAnswer';
import LockOutlined from '@mui/icons-material/LockOutlined';

//Creating custom styles
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

//Main QACard function
export default function QACard(props) {
    const classes = customStyle();
    const upv = props.upv
    const downv = props.downv
    const id = props.id 

    const [isClick, setIsClick] = useState(false) 
    const [isAnsClick, setIsAnsClick] = useState(false)
    const [isLoggedin, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
         
        // const jwtToken = getCookie('jwt_cookie');
        const jwtToken = localStorage.getItem('token')
         

        if (jwtToken) {
            // Token is present, you can use it in your application
           
            setIsLoggedIn(true);  // Set the state to true if the token is present
         ;
        } else {
            // Token is not present
            console.log('JWT Token not found');
        }
    }, [ ]);

    const handleClick = () => {
        setIsClick(!isClick);
    }

    const handleAnsClick = () => {
        setIsAnsClick(!isAnsClick);
    }



    const alert = () => {
        window.alert(" Please Login")
    }

    return (
        <div>

            <Box
                sx={{
                    p: 2.5,
                    borderRadius: 5,
                    boxShadow: 5,
                    mb: 3,
                    height:'auto'
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
                    {/*The upvotes, downvotes, question, description*/}
                    <Grid
                        item
                    >
                        <Box
                            sx={{
                                borderRadius: 5,
                                height:'auto'
                            }}
                            className={classes.internalCardLayout}
                        >
                            <Grid
                                container
                            >
                                <Grid
                                    item
                                    xs={1.5}
                                    sx={{
                                        mr: 2
                                    }}
                                >
                                    <Stack
                                        direction="column"
                                        alignItems="center"
                                        spacing={2}
                                        sx={{
                                            m: 2
                                        }}
                                    >
                                        <ArrowUpwardIcon size="large" sx={{
                                            color: "#6563ff"
                                        }} />
                                        <Typography
                                            style={{ fontWeight: 600 }}
                                            sx={{
                                                color: "#6563ff"
                                            }}
                                        >
                                            {props.upv}
                                        </Typography>
                                        <ArrowDownwardIcon size="large" />
                                    </Stack>
                                </Grid>

                                <Grid
                                    item
                                    xs
                                    textAlign="left"
                                    pt={4}
                                >
                                    <Stack
                                        spacing={3}
                                    >
                                        <Typography
                                            variant="h5"
                                            component="h5"
                                        >
                                            {props.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#9e9e9e",
                                                height:'auto'
                                            }}
                                        >
                                            {props.desc}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/*The Avatar, name, chat icon, number of comments*/}
                    <Grid
                        item
                    >
                        <Box
                            sx={{
                                pl: 4.5
                            }}
                            className={classes.bottomCardLayout}
                        >
                            <Grid
                                container
                            >
                                <Grid
                                    item
                                    xs
                                    sx={{
                                        mr: 2
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Avatar alt="User Profile" src={props.prof}   />
                                     
                                        <Typography
                                            sx={{
                                                ml: 2,
                                                mr: 1,
                                                color: "#9e9e9e"
                                            }}
                                        >
                                            Published by
                                        </Typography>
                                        <Typography sx={{
                                            color: "#6563ff"
                                        }}>
                                            {props.usr}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                {isLoggedin ? ( <Button
                                    startIcon={<AddIcon size="mediam" style={{ fontSize: 30, marginLeft: '5px', color: 'white' }} />}
                                    sx={{
                                        width: 170,
                                        height: 40,
                                        mr: 1.5,

                                        backgroundColor: 'secondary.main',
                                        borderRadius: 2
                                    }}
                                    onClick={handleAnsClick}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        sx={{
                                            mt: 0.5,
                                            mr: 2,
                                            ml: 1,
                                            fontSize: '15px'
                                        }}
                                        color="#ffffff"
                                    >
                                        Add Answer
                                    </Typography>
                                </Button>):(<Button
                                    startIcon={<LockOutlined size="mediam" style={{ fontSize: 20, marginLeft: '5px', color: 'white' }} />}
                                    sx={{
                                        width: 170,
                                        height: 40,
                                        mr: 1.5,

                                        backgroundColor: 'secondary.main',
                                        borderRadius: 2
                                    }}
                                    onClick={alert}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        sx={{
                                            mt: 0.5,
                                            mr: 2,
                                            ml: 1,
                                            fontSize: '15px'
                                        }}
                                        color="#ffffff"
                                    >
                                        Add Answer
                                    </Typography>
                                </Button>)}
                                <Grid
                                    item
                                    xs={2}
                                >
                                    <Button
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                        p={1}
                                        onClick={handleClick}

                                    >
                                        <ChatBubbleOutlineIcon sx={{ color: "#9e9e9e", marginRight: "5px" }} />
                                        <Typography
                                            sx={{
                                                color: "#9e9e9e"
                                            }}
                                        >
                                            {props.ans.length}
                                        </Typography>
                                    </Button>
                                </Grid>

                            </Grid>

                        </Box>
                    </Grid>

                </Grid>

            </Box>
            {isAnsClick && <AddAnswer id={id} />}
            {isClick && <AnsContainer id={id} />}
        </div>
    )
}