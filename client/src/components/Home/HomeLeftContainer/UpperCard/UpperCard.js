import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Skeleton from 'react-loading-skeleton'; // Import the shimmer component
import React, { useState, useEffect } from 'react';
import instance from '../../../../axiosInstance';
import { Typography } from '@mui/material';

const customStyle = makeStyles({
  root: {
    width: 270,
    height: 'auto',
    backgroundColor: '#ffffff',
  },
  icons: {
    '& svg': {
      fontSize: 32,
    },
  },
});

export default function UpperCard() {
  const classes = customStyle();

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await instance.get('/api/v1/users/getall');
        setAllUsers(response.data.data.users);
      } catch (error) {
        console.error('Error fetching top users:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched (success or failure)
      }
    };

    fetchTopUsers();
  }, []);

  const displayedUsers = showAll ? allUsers : allUsers.slice(0, 4);

  return (
    <Box
      sx={{
        borderRadius: 5,
        boxShadow: 5,
      }}
      className={classes.root}
    >
      <Box sx={{ mb: 1 }}>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 5,
            color: 'secondary',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Top Student"
            textColor="secondary"
            inputProps={{ 'aria-label': 'search top students' }}
          />
          <IconButton
            color="secondary"
            type="submit"
            sx={{ p: '10px' }}
            aria-label="search"
            className={classes.icons}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Box>
        <div>
          <List sx={{ width: '100%', maxWidth: 350, bgcolor: '', borderRadius: 5 }}>
            {loading ? (
              // Show skeleton placeholders while data is loading
              Array.from({ length: 4 }).map((_, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Skeleton circle={true} width={40} height={40} />
                  </ListItemAvatar>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItem>
              ))
            ) : (
              // Show user data
              displayedUsers.map((user, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.profileImage} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </ListItem>
              ))
            )}
          </List>
        </div>
        {!showAll && allUsers.length > 3 && !loading && (
          <Typography
            variant="body2"
            color="secondary"
            paddingBottom={'8px'}
            onClick={() => setShowAll(true)}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            Show more
          </Typography>
        )}

        {showAll && allUsers.length > 4 && (
          <Typography
            variant="body2"
            color="secondary"
            paddingBottom={'8px'}
            onClick={() => setShowAll(false)}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            Show less
          </Typography>
        )}
      </Box>
    </Box>
  );
}
