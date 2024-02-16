import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const customStyle = makeStyles({
    root: {
        width: "100%",
        backgroundColor: '#ffffff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
    },
    infoLeft: {
        display: 'flex',
        alignItems: 'center'
    },
    infoRight: {
        display: 'flex',
        alignItems: 'center'
    },
    skills: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '8px'
    },
    applyButton: {
        marginLeft: 'auto'
    }
});

export default function JobCard(props) {
    const classes = customStyle();
  
    
    const handleClick = () => {
        // Replace 'https://example.com' with your desired external link
        window.location.href = props.applicationLink;
      };

    return (
        <Box
            sx={{
                p: 2.5,
                borderRadius: 5,
                boxShadow: 5,
                mb: 3
            }}
            className={classes.root}
        >
            <Grid container spacing={2}>

                <Grid item xs={8}>
                    <Box className={classes.infoLeft}>
                        <Avatar alt="Company Logo" src={props.logo} />
                        <div className="OtherJobsCard_companyDetails__3GcwQ">
                            <Typography variant="subtitle1" className="OtherJobsCard_lightText__12EQI OtherJobsCard_darkText__356ok">{props.company}</Typography>
                            <Typography variant="body1" className="OtherJobsCard_darkText__356ok">{props.position}</Typography>
                            <Typography variant="body2" className="OtherJobsCard_lightText__12EQI">{props.location}</Typography>
                        </div>
                    </Box>
                    {/* <div className={classes.skills}>
                        {props.skills.map((skill, index) => (
                            <Typography key={index} variant="body2" className="OtherJobsCard_label__26HcA">{skill}</Typography>
                        ))}
                    </div> */}
                </Grid>

                {/* Job Information and Apply Button */}
                <Grid item xs={4}>
                    <div className={classes.infoRight}>
                        <div>
                            <Typography variant="body2" className="OtherJobsCard_lightText__12EQI OtherJobsCard_blueText__1RSuY">{props.jobType}</Typography>
                            <Typography variant="body2" className="OtherJobsCard_lightText__12EQI">Salary: {props.salary}</Typography>
                            <Typography variant="body2" className="OtherJobsCard_lightText__12EQI">Experience: {props.experience}</Typography>
                        </div>
                        <Button className={classes.applyButton} variant="contained" onClick={handleClick} color="primary" >Apply</Button>
                    </div>
                </Grid>
            </Grid>

            
        </Box>
    );
}
