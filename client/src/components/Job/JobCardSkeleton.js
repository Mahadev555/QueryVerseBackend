import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from '@mui/styles';

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
    alignItems: 'flex-start', // Align to left
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
}));

export default function JobCardSkeleton(props) {
  const classes = useStyles();

  // Simulating loading state
  const loading = true;

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Skeleton variant="circular" width={80} height={80} />
        </Grid>
        <Grid item xs={10}>
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={150} height={20} />
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={150} height={20} />
          <Skeleton variant="text" width={100} height={20} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Box key={index} marginRight={1}>
                    <Skeleton variant="rectangular" width={100} height={30} />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Skeleton variant="rectangular" width={100} height={40} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
