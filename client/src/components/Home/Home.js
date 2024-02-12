//Importing external files/modules
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
//Importing Internal 

import Navbar from "../Navbar/Navbar";
import LeftHome from './HomeLeftContainer/HomeLeftContainer';
import CenterHome from './HomeCenterContainer/HomeCenterContainer';
import RightHome from './HomeRightContainer/HomeRightContainer';
import { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet

import React from 'react';;

const customStyle = makeStyles({
  section: {
    textAlign: 'center',
  },
  fixedLeft: {
    position: 'fixed',
    left: 0,
    zIndex: 1,  // Set a higher z-index for the fixed element
  },
  fixedRight: {
    position: 'fixed',
    right: 0,
    zIndex: 1,  // Set a higher z-index for the fixed element
  },
  moveableCenter: {
    marginLeft: '330px',  // Adjust the width of the left column
    marginRight: '170px', // Adjust the width of the right column
  },
});

export default function Body() {
  const classes = customStyle();

  return (
    <div>
      <Grid container spacing={5}>
        {/* Fixed Left Column */}
        <Grid item className={`${classes.section} ${classes.fixedLeft}`}>
          <LeftHome />
        </Grid>
        {/* Moveable Center Column */}
        <Grid item xs={7}  className={`${classes.section} ${classes.moveableCenter}`}>
          <CenterHome  />
        </Grid>
        {/* Fixed Right Column */}
        <Grid item xs={2.5} className={`${classes.section} ${classes.fixedRight}`}>
          <RightHome />
        </Grid>
      </Grid>
    </div>
  );
}
