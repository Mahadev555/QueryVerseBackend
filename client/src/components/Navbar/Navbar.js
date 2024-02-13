// Importing necessary modules
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import user_image from '../../data/images/default_user.png';


//import for react 
import { useNavigate } from 'react-router-dom';

// Create styles
const customStyle = makeStyles({
    navbar: {
        borderRadius: 15,
    },
    icons: {
        '& svg': {
            fontSize: 32,
        },
    },
});

export default function Navbar() {
    const classes = customStyle();
    const navigate = useNavigate();

    var name = localStorage.getItem("name").split(' ')
    var Fname = name[0]
    console.log("🚀 ~ Navbar ~ Fname:", Fname)
    console.log("🚀 ~ Navbar ~ name:", name)
    const [isLoggedin, setIsLoggedIn] = useState(false)

    useEffect(() => {

        const jwtToken = localStorage.getItem('token')
        console.log("🚀 ~ useEffect ~ jwtToken:", jwtToken)

        if (jwtToken) {
            // Token is present, you can use it in your application
            console.log(`JWT Token: ${jwtToken}`);
            setIsLoggedIn(true);  // Set the state to true if the token is present
            ;
        } else {
            // Token is not present
            console.log('JWT Token not found');
        }
    }, []);


    const logout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    };
    return (
        <div>
            <AppBar position="fixed" style={{ marginTop: "0px", borderRadius: '0px' }} color="primary" className={classes.navbar}>
                <Toolbar>
                    <Grid container spacing={2} sx={{ flexGrow: 1 }}>

                        <Grid item xs={9}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    mr: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 120,
                                        height: 50,
                                        mr: 1.5,
                                        mt: 0.3,
                                        backgroundColor: 'secondary.main',
                                        borderRadius: 10,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        sx={{
                                            mt: 1.17,
                                            mr: 5,
                                            ml: 3,
                                        }}
                                        color="#ffffff"
                                    >
                                        QVerse
                                    </Typography>
                                </Box>
                                <IconButton
                                    color="secondary"
                                    size="large"
                                    edge="start"
                                    aria-label="home"
                                    component="span"
                                    onClick={() => navigate('/')}
                                    sx={{
                                        mr: 2,
                                    }}
                                    className={classes.icons}
                                >
                                    <HomeOutlinedIcon />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    size="large"
                                    edge="start"
                                    aria-label="list"
                                    component="span"
                                    sx={{
                                        mr: 2,
                                    }}
                                    className={classes.icons}
                                >
                                    <FormatListBulletedOutlinedIcon />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    size="large"
                                    edge="start"
                                    aria-label="chat"
                                    component="span"
                                    sx={{
                                        mr: 2,
                                    }}
                                    className={classes.icons}
                                >
                                    <ChatBubbleOutlineIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                        {/* Empty space */}
                        <Grid item xs={1.5} direction="column" />
                        {/* Right side of navbar */}
                        <Grid item xs={1.5} direction="column">
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'left',
                                    mr: 2,
                                }}
                            >

                                {isLoggedin ? (
                                    <><IconButton
                                        color="secondary"
                                        size="large"
                                        edge="start"
                                        aria-label="notification"
                                        component="span"
                                        sx={{
                                            mr: 1,
                                            ml: -28,
                                        }}
                                        className={classes.icons}
                                    >
                                        <Badge color="error" variant="dot">
                                            <NotificationsNoneOutlinedIcon />
                                        </Badge>
                                    </IconButton>
                                        <Avatar
                                            alt="Default User"
                                            src={user_image}
                                            sx={{
                                                mt: 1,
                                                ml: 0.5,
                                            }}
                                        /> <Box
                                        sx={{
                                            width: 150,
                                            height: 40,
                                            mr: 0,
                                            ml: 5.5,
                                            mt: 2.1,

                                            borderRadius: 10,
                                        }}
                                    >
                                        <Typography
                                            variant="h7"
                                            component="h7"
                                            sx={{
                                                mt: 1.6,
                                                mr: 2,
                                                ml: -3,
                                                cursor: 'pointer',
                                                fontWeight:'400'
                                            }}
                                            color="black "

                                        >
                                            {`Hi, ${Fname} `}
                                        </Typography>
                                    </Box> 
                                        <Box
                                            sx={{
                                                width: 120,
                                                height: 40,
                                                mr: 1.5,
                                                ml: 3.5,
                                                mt: 1.1,
                                                backgroundColor: 'secondary.main',
                                                borderRadius: 10,
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                component="h6"
                                                sx={{
                                                    mt: 0.6,
                                                    mr: 5,
                                                    ml: 3,
                                                    cursor: 'pointer',
                                                }}
                                                color="#ffffff"
                                                onClick={logout}
                                            >
                                                Logout
                                            </Typography>
                                        </Box>
                                    </>
                                ) : (
                                    <><IconButton
                                        color="secondary"
                                        size="large"
                                        edge="start"
                                        aria-label="notification"
                                        component="span"
                                        sx={{
                                            mr: 1,
                                            ml: -18,
                                        }}
                                        className={classes.icons}
                                    >
                                        <Badge color="error" variant="dot">
                                            <NotificationsNoneOutlinedIcon />
                                        </Badge>
                                    </IconButton>
                                        {/* Your login and register components */}
                                        <Box
                                            sx={{
                                                width: 100,
                                                height: 50,
                                                mr: 1.5,
                                                mt: 0.3,
                                                backgroundColor: 'secondary.main',
                                                borderRadius: 10,
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                component="h6"
                                                sx={{
                                                    mt: 1.17,
                                                    mr: 5,
                                                    ml: 3,
                                                    cursor: 'pointer',
                                                }}
                                                color="#ffffff"
                                                onClick={() => navigate('/login')}
                                            >
                                                Login
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: 120,
                                                height: 50,
                                                mr: 1.5,
                                                mt: 0.3,
                                                backgroundColor: 'secondary.main',
                                                borderRadius: 10,
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                component="h6"
                                                sx={{
                                                    mt: 1.17,
                                                    mr: 5,
                                                    ml: 3,
                                                    cursor: 'pointer',
                                                }}
                                                color="#ffffff"
                                                onClick={() => navigate('/signup')}
                                            >
                                                Register
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* Add some padding to the content to avoid being overlapped by the fixed Navbar */}
            <div style={{ paddingTop: '64px' }}>
                {/* Your main content goes here */}
                {/* ... */}
            </div>
        </div>
    );
}
