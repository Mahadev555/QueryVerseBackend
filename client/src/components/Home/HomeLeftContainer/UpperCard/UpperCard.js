//Importing external modules/files
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

//Importing internal files
import user_1 from '../../../../data/images/Mahadev.jpg'
import user_2 from '../../../../data/images/Kishor.jpg'
import user_3 from '../../../../data/images/Yash.jpeg'
import user_4 from '../../../../data/images/Omkar.jpeg'

//Defining Styles
const customStyle = makeStyles({
    root: {
        width: 270,
        height: 300,
        backgroundColor: '#ffffff',
    },
    icons: {
        '& svg': {
            fontSize: 32
        }
    }
})

export default function UpperCard () {

    const classes = customStyle();

    return (
        <Box
            sx={{
                borderRadius: 5,
                boxShadow: 5
            }}
            className={classes.root}
        >
            <Box sx={{mb: 1}}>
                <Paper
                    component="form"
                    sx={{ 
                        p: '2px 4px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        borderRadius: 5, 
                        color: 'secondary'
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
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Mahadev Manerikar" src={user_1} />
                        </ListItemAvatar>
                        <ListItemText primary="Mahadev Manerikar"/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Kishor Maski" src={user_2} />
                        </ListItemAvatar>
                        <ListItemText primary="Kishor Maski" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Yash Sasane" src={user_3} />
                        </ListItemAvatar>
                        <ListItemText primary="Yash Sasane" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Omkar Pawar" src={user_4} />
                        </ListItemAvatar>
                        <ListItemText primary="Omkar Pawar"/>
                    </ListItem>
                </List>

                </div>
            </Box>

        </Box>
    )
}

//  npm install material-ui-search-bar --force