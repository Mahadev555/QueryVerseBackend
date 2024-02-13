//Importing external files/modules
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Defining Styles
const customStyle = makeStyles({
    root: {
        width: "17.8vw", 
        height: 320,
        backgroundColor: '#ffffff'
    },
    secondCard: {
        width: "17.8vw", 
        height: 250,
        backgroundColor: '#ffffff'
        
    },
    list: {
        mr: 2
    }
})

export default function HomeRightContainer () {
    const navigate = useNavigate();

    const classes = customStyle();

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


    const alert = () => {
        window.alert(" Please Login")
    }

    const handleAdd = () => {
        // Use the 'navigate' function to navigate to '/addTopic'
        navigate('/addTopic');
    };

    return (
        <div>
            {isLoggedin ? (
  <Button 
    variant="contained" 
    startIcon={<AddIcon size="large" style={{ fontSize: 40 }} />}
    sx={{
      backgroundColor: 'secondary.main',
      width: "17.4vw",
      height: 50,
      borderRadius: 3,
      fontWeight: 600
    }}
    style={{color:"#ffffff"}}
    onClick={handleAdd}
  >
    <Typography
      variant="h6" 
      component="h6"
    >
      Ask New Topic
    </Typography>
  </Button>
) : (
    <Button 
    variant="contained" 
    startIcon={<LockOutlinedIcon />}
    sx={{
      backgroundColor: 'secondary.main',
      width: "17.4vw",
      height: 50,
      borderRadius: 3,
      fontWeight: 600
    }}
    style={{color:"#ffffff"}}
     onClick={alert}
  >
    <Typography
      variant="h6" 
      component="h6"
    >
     Add New Topic
    </Typography>
  </Button>
)}


            <Box
                sx={{
                    mt: 3,
                    borderRadius: 5,
                    boxShadow: 5
                }}
                className={classes.root}
            >

                <Stack 
                    direction="row" 
                    spacing={2}
                    sx={{
                        backgroundColor: "secondary.main",
                        color: "#ffffff",
                        fontWeight: 600,
                        height: 40,
                        pt: 2,
                        pl: 3,
                        borderRadius: 5
                    }}
                >
                    
                    <OutlinedFlagIcon />
                
                    <Typography>
                        Topics
                    </Typography>
                    
                </Stack>
                
                <List sx={{ width: '93%', maxWidth: 350, bgcolor: 'background.paper', borderRadius: 5, color: "secondary.main", pl:2,fontWeight: 600 }}>
                    <ListItem>
                        <MenuBookOutlinedIcon sx={{mr: 2}} />
                        <ListItemText primary="E-Books"/>
                    </ListItem>
                    <ListItem>
                        <BusinessCenterOutlinedIcon sx={{mr: 2}} />
                        <ListItemText primary="Jobs & Placements" />
                    </ListItem>
                    <ListItem>
                        <SportsBasketballOutlinedIcon sx={{mr: 2}} />
                        <ListItemText primary="Sports" />
                    </ListItem>
                    <ListItem>
                        <PeopleAltOutlinedIcon sx={{mr: 2}} />
                        <ListItemText primary="Events"/>
                    </ListItem>
                    <ListItem>
                        <ArchiveOutlinedIcon sx={{mr: 2}} />
                        <ListItemText primary="Documentation Guidance"/>
                    </ListItem>
                    
                </List>
            </Box>
            <Box
                sx={{
                    mt: 3,
                    borderRadius: 5,
                    boxShadow: 5
                }}
                className={classes.secondCard}
            >
                <Grid 
                    container 
                    sx={{
                        mr: 2,
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <List sx={{ width: '93%', width: "auto" }}>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography 
                                        type="body2" 
                                        style={{ color: '#9E9E9E' }}
                                    >
                                        Help
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography 
                                        type="body2" 
                                        style={{ color: '#9E9E9E' }}
                                    >
                                        About
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography 
                                        type="body2" 
                                        style={{ color: '#9E9E9E' }}
                                    >
                                        Contact
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography 
                                        type="body2" 
                                        style={{ color: '#9E9E9E' }}
                                    >
                                        Terms
                                    </Typography>
                                }
                            />
                        </ListItem>

                    </List>

                    <List sx={{ width: '93%', width: "auto" }}>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography 
                                        type="body2" 
                                        style={{ color: '#9E9E9E' }}
                                    >
                                        Careers
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography 
                                        type="body2" 
                                        style={{ color: '#9E9E9E' }}
                                    >
                                        Updates
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography 
                                        type="body2" 
                                        style={{ color: '#9E9E9E' }}
                                    >
                                        Advertise
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography 
                                        type="body2" 
                                        style={{ color: '#9E9E9E' }}
                                    >
                                        Sponsor
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Stack 
                    direction="row" 
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <GitHubIcon style={{ color: '#9e9e9e' }}/>
                    <InstagramIcon style={{ color: '#9e9e9e' }}/>
                    <LinkedInIcon style={{ color: '#9e9e9e' }}/>
                    <TwitterIcon style={{ color: '#9e9e9e' }}/>
                </Stack>
            </Box>
        </div>
    )
}