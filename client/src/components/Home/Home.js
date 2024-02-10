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

//Creating styles
const customStyle = makeStyles({
    section: {
        mr: 2,
        textAlign: 'center'
    }
})

export default function Body () {

    // const [ss,setSs] = useState(false)
    const classes = customStyle();
    // const  location = useLocation(); 


    // // // const prop = location.state.logged
    // console.log("🚀 ~ Body ~ location:", location.state.decoded.id)
   

    return (
        <div>
            <Navbar   />
            <Box 
                sx={{ 
                    flexGrow: 1,
                    mt:2
                }}
            >
                <Grid container spacing={5}>
                    <Grid item xs={2.5} className={classes.section}>
                        <LeftHome />
                    </Grid>
                    <Grid item xs={7} className={classes.section}>
                        <CenterHome />
                    </Grid>
                    <Grid item xs={2.5} className={classes.section}>
                        <RightHome />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}