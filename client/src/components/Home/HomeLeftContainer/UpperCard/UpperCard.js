// Inside the UpperCard component
import React, { useState, useEffect } from 'react';
import instance from '../../../../axiosInstance';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Skeleton from 'react-loading-skeleton';
import { makeStyles } from '@mui/styles';

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

const UpperCard = () => {
  const classes = customStyle();

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await instance.get('/api/v1/users/getall');
        setAllUsers(response.data.data.users);
        setFilteredUsers(response.data.data.users);
      } catch (error) {
        console.error('Error fetching top users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const filtered = allUsers.filter(user => user.name.toLowerCase().includes(query));
    setFilteredUsers(filtered);
  };

  const displayedUsers = showAll ? filteredUsers : filteredUsers;

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton
            color="secondary"
            type="submit"
            sx={{ p: '10px' }}
            aria-label="search"
            className={classes.icons}
            onClick={(e) => handleSearch(e)} 
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Box>
        <div>
          <List sx={{ width: '100%',overflowY:'auto', maxWidth: 350, height:'230px', bgcolor: '', borderRadius: 5 }}>
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Skeleton circle={true} width={40} height={40} />
                  </ListItemAvatar>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItem>
              ))
            ) : (
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
        
       
      </Box>
    </Box>
  );
};

export default UpperCard;
