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
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../Profile/ProfileModal';

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

const Navbar = ({ setModalOpen,setisLoginOpen,setisSignUpopen, isModalOpen }) => {
  const classes = customStyle();
  const navigate = useNavigate();



  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [Fname, setFname] = useState('');
  useEffect(() => {
    const jwtToken = localStorage.getItem('token');

    if (jwtToken) {
      var name = localStorage.getItem('name').split(' ');
      setFname(name[0]);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleProfileClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const profile = localStorage.getItem('profile')

  return (
    <div>
      <AppBar position="fixed" style={{ marginTop: '0px', borderRadius: '0px' }} color="primary" className={classes.navbar}>
        <Toolbar>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid item xs={9}>
              <Box sx={{ display: 'flex', flexDirection: 'row', mr: 2 }}>
                <Box
                  sx={{
                    width: 175,
                    height: 40,
                    mr: 1.5,
                    mt: 1.1,
                    backgroundColor: 'secondary.main',
                    borderRadius: 2,
                    ml:3
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      mt: 0.6,
                      mr: 5,
                      ml: 3,
                    }}
                    color="#ffffff"
                  >
                    Query Verse
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
                {/* <IconButton
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
                </IconButton> */}
                {/* <IconButton
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
                </IconButton> */}
              </Box>
            </Grid>
            {/* Empty space */}
            <Grid item xs={1.5} direction="column" />
            {/* Right side of navbar */}
            <Grid item xs={1.5} direction="column">
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', mr: 2 }}>
                {isLoggedin ? (
                  <>
                    <IconButton
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
                    <div style={{ display: 'flex', cursor: 'pointer' }} onClick={handleProfileClick}>
                      <Avatar
                        alt="Default User"
                        src={profile}
                        sx={{
                          mt: 1,
                          ml: 0.5,
                        }}
                      />{' '}
                      <Box
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
                            fontWeight: '400',
                          }}
                          color="black "
                        >
                          {`Hi, ${Fname} `}
                        </Typography>
                      </Box>
                    </div>
                    <Box
                      sx={{
                        width: 120,
                        height: 40,
                        mr: 1.5,
                        ml: -4.5,
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
                  <>
                    <IconButton
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
                    <Box
                      sx={{
                        width: 120,
                        height: 40,
                        mr: 1.5,
                        mt: 1.1,cursor: 'pointer',
                        backgroundColor: 'secondary.main',
                        borderRadius: 10,
                      }}
                      onClick={() =>setisLoginOpen(true)}
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
                       
                      >
                        Login
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 120,
                        height: 40,
                        mr: 1.5,
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
                        onClick={() => setisSignUpopen(true)}
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
      <div style={{ paddingTop: '64px' }}>
        <div>{isModalOpen && <ProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />}</div>
        {/* <div>{isModalOpen && <AddTopicDiolog onClose={handleCloseModal} />}</div> */}
      </div>
    </div>
  );
};

export default Navbar;
