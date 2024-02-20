import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFFFFF',
        borderRadius: theme.spacing(2),
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    companyLogo: {
        marginRight: theme.spacing(2),
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    companyDetails: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        '& > *': {
            fontWeight: 'bold',
            marginRight: theme.spacing(1),
        },
    },
    skillBox: {
        backgroundColor: '#F0F0F0',
        padding: theme.spacing(0.5, 1),
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    applyButton: {
        marginLeft: 'auto',
        
    },
    mainGridContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const defaultTheme = createTheme();

export default function JobCard(props) {
    const classes = useStyles();

    const handleClick = () => {
        window.open(props.applicationLink, '_blank');
    };

    const skillsArray = Array.isArray(props.skills) ? props.skills : [props.skills];

    return (
        <ThemeProvider theme={defaultTheme} >
        <Box className={classes.root}>
            <Grid container spacing={2}>

                <Grid item xs={13} >
                <Grid marginTop={1.5} display={'flex'} item xs={11}>
                    <Grid marginLeft={2} item xs={1.6}>
                        <Avatar
                            className={classes.companyLogo}
                            alt="Company Logo"
                            src={props.logo}
                        />
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                        <Grid  display={'flex'}  flexDirection={'column'} alignItems={'flex-start'}>
                            <Typography variant="subtitle1"  style={{ fontSize: '1.2rem' }}>{props.company}</Typography>
                            <Typography variant="subtitle2" style={{ fontSize: '1rem' }}>{props.position}</Typography>
                        </Grid>
                        <Grid display={'flex'}  flexDirection={'column'} alignItems={'flex-end'}>
                            <Typography style={{margin:"3px 0px"}} variant="body2">Salary: {props.salary}</Typography>
                            <Typography style={{margin:"3px 0px"}} variant="body2">Type: {props.jobType}</Typography>
                            <Typography style={{margin:"3px 0px"}} variant="body2">Experience: {props.experience}</Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid xs={11} margin={'20px 0px 10px 0px '} display={'flex'}>
                        <Grid marginLeft={2} >
                            {skillsArray.map((skill, index) => (
                                <Box key={index} className={classes.skillBox}>
                                    <Typography variant="body2">{skill}</Typography>
                                </Box>
                            ))}
                        </Grid>
                        <Button 
                        
                            className={classes.applyButton}
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        </ThemeProvider>
    );
}
