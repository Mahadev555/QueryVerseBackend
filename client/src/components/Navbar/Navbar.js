// Importing necessary modules
import React from 'react';
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
    return (
        <div>
            <AppBar position="fixed" style={{ marginTop:"10px"}} color="primary" className={classes.navbar}>
                <Toolbar>
                    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                        {/* Left side of navbar */}
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
                                <IconButton
                                    color="secondary"
                                    size="large"
                                    edge="start"
                                    aria-label="notification"
                                    component="span"
                                    sx={{
                                        mr: 1,
                                        ml: -6,
                                    }}
                                    className={classes.icons}
                                >
                                    <Badge color="error" variant="dot">
                                        <NotificationsNoneOutlinedIcon />
                                    </Badge>
                                </IconButton>
                                {/* <Avatar
                                    alt="Default User"
                                    src={user_image}
                                    sx={{
                                        mt: 1,
                                        ml: 1.5,
                                    }}
                                /> */}
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
